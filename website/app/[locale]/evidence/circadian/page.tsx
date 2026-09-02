import type { Metadata } from "next";
import Link from "next/link";
import { Moon } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { BermIcon } from "@/components/BermIcon";
import { BehavioralSuppression } from "@/components/BehavioralSuppression";
import { CitationLink } from "@/components/CitationLink";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { ClaimRef } from "@/components/ClaimRef";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Circadian Disruption, Sleep & Recovery",
    subtitle: "Melatonin-fertility bridge, sleep deprivation as mediating mechanism, recovery window elimination, and behavioral suppression pathways",
    backLink: "← Back to Evidence",
    narrativeTitle: "Thematic evidence narratives",
    narrativeLead: "Cross-cutting themes that connect individual studies into mechanistic arguments. Each narrative synthesizes published findings; none establishes a population-level causal coefficient.",
    narratives: [
      {
        id: "recovery",
        title: "Recovery window elimination",
        paragraphs: [
          "The REFLEX project ([[ref:diem2005|Diem et al. 2005]]) demonstrated that intermittent RF exposure produces greater genotoxic effects than continuous exposure at the same SAR, suggesting that cellular repair mechanisms are activated during exposure-free intervals. The recovery window hypothesis proposes that biological repair of RF-induced damage (ROS neutralization, DNA repair, protein refolding) requires sufficient EMF-free time.",
          "A modern urban adult experiences approximately 2 hours per day of near-zero RF exposure (sleep in a connected bedroom), yielding ~20.6% potential recovery time. A 1950s adult experienced approximately 20 hours per day in RF-free environments, yielding ~90.1% recovery time. If repair mechanisms require a minimum duty-free fraction to maintain homeostasis, the 4.4× reduction in recovery time could produce cumulative damage even at sub-thermal exposure levels.",
          "The first 5G-frequency-specific testicular data ([[ref:bektas2026|Bektas et al. 2026]], Bioelectromagnetics) supports the recovery window concept from a different angle: CoQ10 supplementation ameliorated 3.5 GHz RF-induced testicular and oxidative damage in rats. The CoQ10 rescue demonstrates mechanism reversibility — the oxidative pathway is pharmacologically blockable, consistent with the model net_daily = damage_rate × t_emf × (1 − exp(−t_free / τ_repair)). CoQ10 increases antioxidant capacity, effectively shortening τ_repair and reducing net daily damage. This is a pharmacological analogue of the recovery window: instead of reducing exposure time, the intervention enhances repair rate.",
        ],
        studies: [
          { citation: "REFLEX / Diem et al.", year: 2005, referenceId: "diem2005", note: "Intermittent > continuous genotoxicity" },
          { citation: "Recovery window model (BERM)", year: 2026, referenceId: "berm_recovery_window_2026", note: "20.6% vs 90.1% EMF-free time" },
          { citation: "Bektas et al. (Bioelectromagnetics)", year: 2026, referenceId: "bektas2026", note: "3.5 GHz → testicular ROS damage; CoQ10 ameliorates — mechanism reversibility, consistent with recovery window." },
        ],
      },
      {
        id: "qbs",
        title: "Quadruple behavioral suppression",
        paragraphs: [
          "Conception probability can be decomposed as P(child) = P(approach) × P(attraction) × P(intercourse) × P(fertilization). EMF-sensitive pathways exist at each stage: testosterone governs approach motivation ([[ref:puts2008|Puts 2008]]), attraction requires intact olfactory-hormonal signaling, sexual frequency depends on libido and opportunity, and fertilization requires sperm quality. Each multiplicative factor below 1.0 compounds the reduction.",
          "[[ref:goetz2024|Goetz et al. 2024]] (RCT) demonstrated that exogenous testosterone modulates approach behavior. [[ref:dreher2016|Dreher et al. 2016]] (PNAS) showed testosterone-dependent reward valuation in mating contexts. The dual-hormone meta-analysis (2018, N = 8,538) confirmed that testosterone and cortisol jointly predict dominance and mating effort. If EMF exposure suppresses testosterone at the population level (as suggested by the −1%/year secular trend), all four stages are affected simultaneously.",
        ],
        studies: [
          { citation: "Puts 2008", year: 2008, referenceId: "puts2008", note: "Testosterone and approach motivation" },
          { citation: "Goetz et al. RCT", year: 2024, referenceId: "goetz2024", note: "Exogenous T modulates approach behavior" },
          { citation: "Dreher et al. PNAS", year: 2016, referenceId: "dreher2016", note: "T-dependent reward valuation" },
          { citation: "Dual-hormone meta-analysis", year: 2018, referenceId: "dualhormone_meta2018", note: "T + cortisol predict mating effort (N = 8,538)" },
        ],
      },
      {
        id: "oxytocin",
        title: "Dual oxytocin pathway",
        paragraphs: [
          "Two independent biological routes converge on oxytocin suppression. The Porges polyvagal pathway: chronic sympathetic activation (consistent with EMF-induced autonomic stress) downregulates the ventral vagal complex, reducing parasympathetic-mediated OT release. This affects pair bonding, sexual receptivity and uterine contractility.",
          "The Poutahidis/Erdman (MIT) microbiome pathway: Lactobacillus reuteri stimulates OT secretion via the vagus nerve. EMF exposure has been shown to alter gut microbiome composition in animal models. If L. reuteri populations decline under chronic RF exposure, the vagal OT signaling pathway is independently suppressed. Both routes — autonomic and microbial — converge on reduced circulating OT, affecting reproductive behavior and physiology from different directions.",
          "Direct experimental evidence: a 2024 study in Scientific Reports showed that 4.9 GHz RF exposure caused gut microbiome dysbiosis in mice, including decreased microbial diversity and altered Bacteroidetes/Firmicutes ratio. This links RF exposure directly to the gut-brain axis disruption that BERM's pathway E describes: RF → microbiome disruption → L. reuteri decline → vagal oxytocin suppression → reproductive motivation decline.",
        ],
        studies: [
          { citation: "Porges polyvagal theory", year: 2011, referenceId: "porges2011", note: "Vagal tone → OT release pathway" },
          { citation: "Poutahidis & Erdman (MIT)", year: 2014, referenceId: "poutahidis2014", note: "L. reuteri → vagus → OT" },
          { citation: "Microbiome-EMF animal studies", year: "2019–24", referenceId: "microbiome_emf_collection_2019_2024", note: "RF alters gut flora composition" },
          { citation: "Scientific Reports (4.9 GHz RF)", year: 2024, referenceId: "rf49_scientific_reports_2024", note: "RF → gut dysbiosis: decreased diversity, altered Bacteroidetes/Firmicutes ratio" },
        ],
      },
      {
        id: "melatonin-systematic",
        title: "Melatonin suppression: PRISMA systematic review ([[ref:tbahriti2026|Tbahriti 2026]])",
        paragraphs: [
          "[[ref:tbahriti2026|Tbahriti et al. (2026,]] Sleep Biol Rhythms 24(2):195–214) present a PRISMA 2020 systematic review of 55 studies from 892 screened, examining EMF effects on circadian rhythms. 88% of high-quality animal studies report EMF-induced melatonin suppression of 20–50% from baseline. Clock gene expression altered. Sleep architecture changes documented. EMF-induced melatonin suppression is smaller than light-induced (>90%).",
          "This directly supports BERM pathway B (EMF → pineal melatonin suppression → GnRH pulsatility disruption → HPG → gonadal function). The 20–50% suppression magnitude is biologically significant and consistent with BERM's v17_night_fraction() function, where EMF is one component of the nocturnal triple hit (melanopsin + CRY + melatonin suppression). The suppression magnitude being smaller than light-induced (>90%) is consistent with BERM modeling EMF as one of multiple nocturnal disruption pathways, not the sole driver. Methodological note: only 27% of reviewed studies met high methodological standards; 48% of animal studies lacked adequate sham controls. The transition from cellular effects to systemic circadian disruption is not fully established clinically.",
          "BERM interpretation: WHO and ICNIRP evidence classifications are subject to the same systematic biases BERM identifies: attenuation bias from proxy exposure measures, control group contamination (lab baseline bias), and funder bias ([[ref:huss2007|Huss 2007]]: industry-funded studies less likely to find harmful effects). If these biases are real, 'moderate certainty' in the standard framework may correspond to higher certainty in a bias-corrected framework. BERM treats institutional evidence hierarchies as CONTEXT_ONLY because they are external to BERM's own epistemology, not because the underlying evidence is weak.",
        ],
        studies: [
          { citation: "Tbahriti et al. (Sleep Biol Rhythms)", year: 2026, referenceId: "tbahriti2026", note: "PRISMA 55 studies: 88% of high-quality animal studies report melatonin suppression 20–50%. Only 27% met high standards." },
          { citation: "Huss et al. (Environ Health Perspect)", year: 2007, referenceId: "huss2007", note: "Industry-funded EMF studies less likely to report harmful effects. Systematic funder bias." },
        ],
      },
      {
        id: "sousouri-neuroimaging",
        title: "Human magnetoreception neuroimaging ([[ref:sousouri2025|Sousouri 2025]])",
        paragraphs: [
          "[[ref:sousouri2025|Sousouri et al. (2025,]] NeuroImage) provide the first fMRI evidence that static magnetic field changes produce measurable neural responses in humans. Subjects exposed to controlled geomagnetic field manipulations showed reproducible alpha-wave (8–13 Hz) desynchronization — the same neural signature produced by known sensory stimuli. The effect was strongest in individuals with higher baseline alpha power and showed lateralization consistent with right-hemispheric processing.",
          "This study directly supports BERM pathway B's radical pair mechanism: if human neurons detectably respond to static magnetic field changes at Earth-strength levels (~50 μT), the CRY/RPM transduction pathway is empirically confirmed as neurologically active in humans — not just in migratory birds. The alpha desynchronization pattern suggests that magnetic field detection occurs at the cortical level, not just at the retinal level where CRY1 is localized in blue cone outer segments ([[ref:bartolke2025|Bartölke 2025]]).",
          "BERM interpretation: if Earth-strength static fields produce measurable neural responses, time-varying anthropogenic fields (which are orders of magnitude more effective at driving radical pair dynamics than static fields) would be expected to produce stronger, chronic neural perturbation. The [[ref:sousouri2025|Sousouri 2025]] result closes the gap between animal magnetoreception studies and human relevance — the sensory apparatus is present and neurally active.",
        ],
        studies: [
          { citation: "Sousouri et al. (NeuroImage)", year: 2025, referenceId: "sousouri2025", note: "fMRI: geomagnetic field manipulation → alpha desynchronization in humans. First neuroimaging confirmation of human magnetoreception." },
          { citation: "Bartölke et al. (FASEB J)", year: 2025, referenceId: "bartolke2025", note: "CRY1 in human blue cone outer segments — sensory magnetoreceptor localization." },
          { citation: "Wang et al. (eNeuro)", year: 2019, referenceId: "wang2019_eneuro", note: "Earlier EEG evidence: alpha-ERD following magnetic field rotation in shielded chamber." },
        ],
      },
    ],
    tableHeaders: { citation: "Citation", year: "Year", note: "Note", finding: "Finding" },
    melatoninBridge: {
      title: "The Melatonin Bridge: Cascade 1 → Cascade 6",
      paragraphs: [
        "BERM's six cascades are not parallel — they are serial. Melatonin is the critical bridge between cascade 1 (sleep/circadian) and cascade 6 (fertility). EMF → pineal gland → melatonin suppression → HPG axis disruption + follicular antioxidant defense decline → fertility decline. This pathway is separate from EMF's direct gonadal effects (VGCC → sperm), and both must be active simultaneously to produce the full effect.",
        "The pineal gland 'sees' electromagnetic fields as light. [[ref:battelle1980_emf_melatonin|Battelle's study (1980)]] demonstrated EMF suppression of nocturnal melatonin peak in experimental animals. Mechanism: magnetite (Fe₃O₄) on pineal membranes and/or cryptochrome (CRY1/CRY2) radical pair mechanism sense the field, NAT activity (serotonin → melatonin conversion) slows, nocturnal melatonin peak amplitude drops and timing delays. Human studies are INCONSISTENT: some show suppression, others don't — but animal data is consistent and the mechanism is biologically plausible.",
        "Melatonin in follicular fluid is the oocyte's critical protector. [[ref:tamura2012_follicular_melatonin|Tamura et al. (2012)]] showed that follicular fluid melatonin concentration directly correlates with oocyte quality. Melatonin neutralizes reactive oxygen species (ROS), protects mitochondrial DNA, and regulates Gdf9 and Bmp15 gene expression in oocytes. IVF meta-analyses ([[ref:tong2017_melatonin_ivf|Tong 2017]], [[ref:pmc12500685|PMC12500685]], [[ref:pmc11265587|PMC11265587]]) consistently show: melatonin supplementation improves fertilization rate, embryo quality, and clinical pregnancy rate. But meta-analysis sample sizes are small, blinding is difficult, and publication bias is possible.",
        "In male fertility, melatonin protects Leydig cells from oxidative stress (testosterone production), regulates the HPG axis (GnRH → LH/FSH), and maintains sperm mitochondrial function. [[ref:nishihara2014_melatonin_sperm|Nishihara et al. (2014)]] showed melatonin improves sperm motility in vitro. CAUTION: melatonin's HPG effect is NOT unidirectional — at high concentrations, melatonin can SUPPRESS GnRH in some contexts. Melatonin supplementation is not risk-free in reproductive age.",
        "Shift work is the strongest natural experiment for the melatonin bridge: it suppresses melatonin through circadian disruption, workplace lighting, AND possible occupational EMF simultaneously. Shift workers have documented lower fertility, more pregnancy complications, and more irregular menstrual cycles. But shift work fertility effects are MULTIFACTORIAL — stress, eating patterns, social isolation, and other factors contribute. Melatonin is one factor, not the only one.",
      ],
      pathwaysTitle: "Five melatonin–fertility pathways",
      pathwayHeaders: { pathway: "Pathway", mechanism: "Mechanism" },
      pathways: [
        { name: "HPG", mechanism: "Melatonin → hypothalamus → GnRH → LH/FSH → gonads" },
        { name: "Antioxidant", mechanism: "Melatonin in follicular fluid → ROS neutralization → oocyte protection" },
        { name: "Anti-inflammatory", mechanism: "Melatonin → NF-κB ↓ → chronic inflammation ↓ → endometriosis/PCOS ↓" },
        { name: "Mitochondrial", mechanism: "Melatonin → AMPK/SIRT1 ↑ → reproductive cell energy ↑" },
        { name: "Epigenetic", mechanism: "Melatonin regulates Gdf9 and Bmp15 gene expression in oocytes" },
      ],
      referencesTitle: "References",
      references: [
        { citation: "Battelle / Wilson et al.", year: 1980, referenceId: "battelle1980_emf_melatonin", finding: "EMF suppresses nocturnal melatonin in experimental animals (60 Hz, ELF)" },
        { citation: "Tamura et al.", year: 2012, referenceId: "tamura2012_follicular_melatonin", finding: "Follicular fluid melatonin correlates with oocyte quality; antioxidant role in oocyte" },
        { citation: "Tong et al.", year: 2017, referenceId: "tong2017_melatonin_ivf", finding: "Meta-analysis: melatonin supplementation improves IVF outcomes (fertilization, embryo quality, pregnancy)" },
        { citation: "PMC12500685", year: 2025, referenceId: "pmc12500685", finding: "Systematic review: melatonin improves oocyte and embryo quality in IVF" },
        { citation: "PMC11265587", year: 2024, referenceId: "pmc11265587", finding: "Meta-analysis: melatonin improves clinical pregnancy rate in IVF" },
        { citation: "PMC10354453", year: 2023, referenceId: "pmc10354453", finding: "Review: melatonin's five pathways to female fertility (HPG, antioxidant, anti-inflammatory, mitochondrial, epigenetic)" },
        { citation: "Reiter et al.", year: 2007, referenceId: "reiter2007_melatonin_male", finding: "Melatonin protects sperm from oxidative damage; regulates HPG axis" },
        { citation: "Unfer et al.", year: 2011, referenceId: "unfer2011_melatonin_ivf", finding: "Melatonin in IVF: oocyte quality improves, but small sample sizes and blinding challenges" },
        { citation: "Nishihara et al.", year: 2014, referenceId: "nishihara2014_melatonin_sperm", finding: "Melatonin improves sperm motility in vitro" },
        { citation: "Rad. Prot. Dosimetry", year: 2013, referenceId: "rad_prot_dosimetry2013_emf_melatonin", finding: "RF-EMF and melatonin suppression: epidemiological review (inconsistent results in humans)" },
      ],
      epistemicNote: "Epistemic level: Melatonin in follicular fluid → oocyte quality [E] ([[ref:tamura2012_follicular_melatonin|Tamura 2012]], replicated). Melatonin supplementation in IVF [E] (meta-analyses, but small sample sizes). EMF → melatonin suppression [M|C] (strong animal data, inconsistent human data). Melatonin-fertility bridge as a whole [C] (theoretical unification). IVF meta-analyses are small — publication bias possible. Melatonin HPG effect is BIDIRECTIONAL. Shift work fertility deficit is multifactorial — melatonin is one pathway.",
    },
    sleep: {
      title: "Sleep deprivation as the central mediating mechanism",
      paragraphs: [
        "Sleep deprivation produces every biological outcome that BERM's six retrodictions describe: testosterone decline (Leproult & Van Cauter: −10–15% in young men), sperm decline (−29% with more deformities), NK cell collapse (Irwin: −70% in one night), metabolic syndrome (Spiegel et al.: pre-diabetic in one week), sympathetic overdrive (chronic inflammation), and depression (Walker: 'a cause, not a symptom'). If EMF disrupts sleep — which the circadian pathway (CRY/RPM, melatonin suppression) predicts — then ALL six retrodictions follow as downstream consequences of a single upstream cause.",
        "The order in which these conditions appear matches the modulome's prediction: sleep disruption first (shortest latency, months), depression second (1–3 years), metabolic syndrome third (3–8 years), autoimmune disease fourth (5–10 years), fertility decline fifth (5–15 years), cancer sixth (10–25 years). This order is not arbitrary — it reflects each tissue's regeneration rate and cumulative damage threshold. Walker documents this same cascade empirically without an EMF framework, providing independent validation of the modulome's predicted ordering.",
        "If the sleep epidemic were caused solely by blue light from screens, blue-light filtering (Night Shift, f.lux, amber glasses) should resolve it. It does not: [[ref:duraccio2021_blue_light_filter|Duraccio et al. (2021)]] showed that Night Shift mode did not significantly improve objective sleep quality. BERM proposes that the electromagnetic field component (RF from the device, IF from LED lighting) is an independent sleep disruptor that operates through the CRY/RPM mechanism, not through retinal melanopsin. This explains why filtering light is insufficient — the EMF pathway bypasses the eye entirely.",
      ],
      references: [
        { citation: "Walker MP", year: 2017, referenceId: "walker2017_why_we_sleep", finding: "Sleep → testosterone −10–15%, sperm −29%, NK cells −70%, metabolic syndrome, depression (causal)" },
        { citation: "Leproult & Van Cauter (JAMA)", year: 2011, referenceId: "leproult2011_testosterone_sleep", finding: "5h sleep for 1 week → testosterone −10–15% in young men" },
        { citation: "Irwin MR (Annu Rev Psychol)", year: 2015, referenceId: "irwin2015_sleep_immunity", finding: "4h sleep 1 night → NK cells −70%. WHO 2A: night-shift work" },
        { citation: "Spiegel, Leproult & Van Cauter (Lancet)", year: 1999, referenceId: "spiegel1999_sleep_metabolic", finding: "4h sleep for 6 nights → pre-diabetic glucose tolerance" },
        { citation: "Chang et al. (PNAS)", year: 2015, referenceId: "chang2015_ipad_melatonin", finding: "iPad reading: melatonin −50%, delay +3h, LED 2× vs incandescent" },
        { citation: "Duraccio et al. (Sleep Health)", year: 2021, referenceId: "duraccio2021_blue_light_filter", finding: "Night Shift did NOT improve objective sleep quality" },
      ],
      epistemicNote: "Epistemic level: mechanism [E] ([[ref:walker2017_why_we_sleep|Walker]]/[[ref:leproult2011_testosterone_sleep|Leproult]]/[[ref:irwin2015_sleep_immunity|Irwin]]/[[ref:spiegel1999_sleep_metabolic|Spiegel]] data). EMF linkage: [M|C] (CRY/RPM + [[ref:lindecke2026|Lindecke 2026]]).",
    },
    proxyMasking: {
      title: "Proxy masking: the blind spot in sleep science",
      content: "A paradigmatic example: [[ref:walker2017_why_we_sleep|Matthew Walker's 'Why We Sleep' (2017)]] is perhaps the most influential sleep science book ever written. Walker devotes extensive analysis to how LED screens suppress melatonin through blue light. He documents that LED blue light has twice the melatonin-suppressing effect of incandescent light at matched intensity. Yet he never asks whether LED devices produce anything other than light — specifically, whether the switch-mode power supplies in every LED device emit intermediate-frequency electromagnetic fields (20–200 kHz) that might independently disrupt the circadian system through the CRY/RPM mechanism. The electromagnetic field is not in his conceptual vocabulary. This is not a criticism of Walker — it is a demonstration of how completely the EMF hypothesis is absent from mainstream sleep science.",
    },
    shiftWork: {
      title: "Shift Work as Natural Experiment",
      lead: "Shift workers experience all three BERM mechanisms simultaneously: (1) recovery window eliminated — night work and daytime sleep in an EMF environment means CaMKII never dephosphorylates; (2) IF exposure at the critical moment — night work under LED/fluorescent lighting precisely when melatonin should peak; (3) maximal CRY sensitivity — in darkness CRY is most sensitive, and transitioning to artificial light scrambles the CRY signal with an EMF + light combination.",
      tableTitle: "Shift work health profile matches BERM cascades",
      tableHeaders: { cascade: "BERM cascade", effect: "Shift work effect" },
      tableRows: [
        { cascade: "Sleep/melatonin", effect: "Melatonin↓, sleep↓", or: "—" },
        { cascade: "Depression", effect: "Depression↑, anxiety↑", or: "OR ~1.4" },
        { cascade: "Metabolic syndrome", effect: "MetS 2.17×", or: "OR 2.17" },
        { cascade: "T2D", effect: "T2D risk↑", or: "HR ~1.1–1.4" },
        { cascade: "Cardiovascular", effect: "CVD, MI↑", or: "HR ~1.2" },
        { cascade: "Fertility", effect: "Miscarriage↑, T↓", or: "OR ~1.3" },
        { cascade: "Cancer", effect: "Breast cancer (IARC 2A)", or: "OR ~1.2" },
        { cascade: "Endocrine", effect: "Cortisol↑, thyroid", or: "—" },
      ],
      predictionLabel: "BERM's differentiating prediction: ",
      predictionContent: "Sleep deprivation alone does NOT explain everything. The EMF component (LED IF at night + WiFi environment during daytime sleep + CRY disruption in darkness) produces an additional effect beyond sleep deprivation. Testable: shift worker sleeping in a Faraday-shielded bedroom (EMF-free night) vs. conventional bedroom — with the same sleep time. If the Faraday group shows better melatonin recovery and less metabolic syndrome, the difference is the EMF component.",
      epistemicNote: "Epistemic level: shift work health effects [E] (meta-analyses). BERM interpretation (three simultaneous mechanisms) [M|C]. Faraday intervention [C] (proposed, not yet tested).",
    },
    seeAlso: {
      title: "See also",
      links: [
        { title: "Evidence Register", description: "All evidence records and narratives" },
        { title: "Eye Color & Magnetoreception", description: "CRY sensitivity, iris pigmentation, and nutrition" },
        { title: "Nutritional CRY Modulation", description: "B2, omega fatty acids, and fasting dynamics" },
      ],
    },
  },
  fi: {
    title: "Sirkadiaaninen häiriö, uni ja palautuminen",
    subtitle: "Melatoniini-hedelmällisyyssilta, unideprivaatio välittävänä mekanismina, palautumisikkunan häviäminen ja käyttäytymisen tukahduttamisen polut",
    backLink: "← Takaisin näyttöön",
    narrativeTitle: "Temaattiset näytönarratiivit",
    narrativeLead: "Poikkileikkaavia teemoja, jotka yhdistävät yksittäiset tutkimukset mekanistisiksi argumenteiksi. Kukin narratiivi syntetisoi julkaistuja löydöksiä; mikään ei osoita väestötason kausaalikerrointa.",
    narratives: [
      {
        id: "recovery",
        title: "Palautumisikkunan häviäminen",
        paragraphs: [
          "REFLEX-projekti ([[ref:diem2005|Diem ym. 2005]]) osoitti, että katkonainen RF-altistus tuottaa suurempia genotoksisia vaikutuksia kuin jatkuva altistus samalla SAR-tasolla, viitaten siihen että solujen korjausmekanismit aktivoituvat altistusvapaina jaksoina. Palautumisikkunahypoteesi esittää, että RF:n aiheuttaman vaurion biologinen korjaus (ROS-neutralointi, DNA-korjaus, proteiinien uudelleenlaskostuminen) vaatii riittävästi EMF-vapaata aikaa.",
          "Moderni kaupunkiaikuinen kokee noin 2 tuntia päivässä lähes nolla-RF-altistusta (uni verkotetussa makuuhuoneessa), jolloin potentiaalinen palautumisaika on noin 20,6 %. 1950-luvun aikuinen koki noin 20 tuntia päivässä RF-vapaissa ympäristöissä, jolloin palautumisaika oli noin 90,1 %. Jos korjausmekanismit vaativat vähimmäismäärän altistusvapaata aikaa homeostaasin ylläpitämiseksi, 4,4-kertainen palautumisajan väheneminen voi tuottaa kumulatiivista vauriota myös subtermisillä altistustasoilla.",
          "Ensimmäinen 5G-taajuustarkka testisdata ([[ref:bektas2026|Bektas ym. 2026]], Bioelectromagnetics) tukee palautumisikkunakonseptia eri kulmasta: CoQ10-lisäravinto lievitti 3,5 GHz RF:n aiheuttamaa testis- ja oksidatiivista vauriota rotilla. CoQ10-interventio osoittaa mekanismin reversiibeliuden — oksidatiivinen polku on farmakologisesti estettävissä, yhdenmukainen mallin net_daily = damage_rate × t_emf × (1 − exp(−t_free / τ_repair)) kanssa. CoQ10 lisää antioksidanttikapasiteettia, lyhentäen efektiivisesti τ_repair-arvoa ja vähentäen nettovauriota. Tämä on palautumisikkunan farmakologinen analogi: altistusajan vähentämisen sijaan interventio tehostaa korjausnopeutta.",
        ],
        studies: [
          { citation: "REFLEX / Diem ym.", year: 2005, referenceId: "diem2005", note: "Katkonainen > jatkuva genotoksisuus" },
          { citation: "Palautumisikkunamalli (BERM)", year: 2026, referenceId: "berm_recovery_window_2026", note: "20,6 % vs 90,1 % EMF-vapaata aikaa" },
          { citation: "Bektas ym. (Bioelectromagnetics)", year: 2026, referenceId: "bektas2026", note: "3,5 GHz → testis-ROS-vaurio; CoQ10 lievittää — mekanismin palautuvuus, yhdenmukainen palautumisikkunan kanssa." },
        ],
      },
      {
        id: "qbs",
        title: "Nelinkertainen käyttäytymisen tukahduttaminen",
        paragraphs: [
          "Hedelmöittymistodennäköisyys voidaan hajottaa muotoon P(lapsi) = P(lähestyminen) × P(attraktio) × P(yhdyntä) × P(hedelmöitys). EMF-herkkiä reittejä on jokaisessa vaiheessa: testosteroni ohjaa lähestymismotivaatiota ([[ref:puts2008|Puts 2008]]), attraktio vaatii ehjää hajuaisti-hormonaalista signalointia, seksuaalinen frekvenssi riippuu libidosta ja mahdollisuudesta, ja hedelmöitys vaatii siittiölaatua. Jokainen alle 1,0:n kerroin kumuloi vähennyksen.",
          "[[ref:goetz2024|Goetz ym. 2024]] (RCT) osoittivat, että eksogeeninen testosteroni säätelee lähestymiskäyttäytymistä. [[ref:dreher2016|Dreher ym. 2016]] (PNAS) osoittivat testosteroniriippuvaisen palkintoarvostuksen parittelukonteksteissa. Kaksoishormonimeta-analyysi (2018, N = 8 538) vahvisti, että testosteroni ja kortisoli ennustavat yhdessä dominanssia ja paritteluponnistelua. Jos EMF-altistus vaimentaa testosteronia väestötasolla (kuten −1 %/vuosi pitkäaikaistrendi viittaa), kaikki neljä vaihetta vaikuttuvat samanaikaisesti.",
        ],
        studies: [
          { citation: "Puts 2008", year: 2008, referenceId: "puts2008", note: "Testosteroni ja lähestymismotivaatio" },
          { citation: "Goetz ym. RCT", year: 2024, referenceId: "goetz2024", note: "Eksogeeninen T säätelee lähestymistä" },
          { citation: "Dreher ym. PNAS", year: 2016, referenceId: "dreher2016", note: "T-riippuvainen palkintoarvostus" },
          { citation: "Kaksoishormonimeta-analyysi", year: 2018, referenceId: "dualhormone_meta2018", note: "T + kortisoli ennustavat parittelua (N = 8 538)" },
        ],
      },
      {
        id: "oxytocin",
        title: "Kaksoisoksitosiinireitti",
        paragraphs: [
          "Kaksi itsenäistä biologista reittiä konvergoi oksitosiinin vaimentumiseen. Porgesin polyvagaalireitti: krooninen sympaattinen aktivaatio (yhteensopiva EMF:n aiheuttaman autonomisen stressin kanssa) alassäätelee ventraalista vagaali-kompleksia, vähentäen parasympaattista OT-vapautumista. Tämä vaikuttaa parisiteeseen, seksuaaliseen vastaanottavuuteen ja kohdun supistuvuuteen.",
          "Poutahidiksen/Erdmanin (MIT) mikrobiomireitti: Lactobacillus reuteri stimuloi OT-eritystä vagushermon kautta. EMF-altistuksen on osoitettu muuttavan suoliston mikrobiomikoostumusta eläinmalleissa. Jos L. reuteri -populaatiot vähenevät kroonisen RF-altistuksen alla, vagaalinen OT-signalointireitti suppressoituu itsenäisesti. Molemmat reitit — autonominen ja mikrobinen — yhtyvät vähäisempään kiertävään OT:iin, vaikuttaen lisääntymiskäyttäytymiseen ja -fysiologiaan eri suunnista.",
          "Suora kokeellinen näyttö: vuoden 2024 Scientific Reports -tutkimus osoitti, että 4,9 GHz RF-altistus aiheutti suoliston mikrobiomidysbioosin hiirillä, mukaan lukien mikrobiston monimuotoisuuden laskun ja muuttuneen Bacteroidetes/Firmicutes-suhteen. Tämä yhdistää RF-altistuksen suoraan suoli-aivo-akselin häiriöön, jota BERM:n polku E kuvaa: RF → mikrobiomin häiriö → L. reuterin väheneminen → vagaalisen oksitosiinin suppressio → lisääntymismotivaation lasku.",
        ],
        studies: [
          { citation: "Porges polyvagaaliteoria", year: 2011, referenceId: "porges2011", note: "Vagaalinen tonus → OT-vapautumisreitti" },
          { citation: "Poutahidis & Erdman (MIT)", year: 2014, referenceId: "poutahidis2014", note: "L. reuteri → vagus → OT" },
          { citation: "Mikrobiomi-EMF-eläintutkimukset", year: "2019–24", referenceId: "microbiome_emf_collection_2019_2024", note: "RF muuttaa suolistoflooraa" },
          { citation: "Scientific Reports (4,9 GHz RF)", year: 2024, referenceId: "rf49_scientific_reports_2024", note: "RF → suolistodysbioosia: vähentynyt diversiteetti, muuttunut Bacteroidetes/Firmicutes-suhde" },
        ],
      },
      {
        id: "melatonin-systematic",
        title: "Melatoniinisuppressio: PRISMA-katsaus ([[ref:tbahriti2026|Tbahriti 2026]])",
        paragraphs: [
          "[[ref:tbahriti2026|Tbahriti ym. (2026,]] Sleep Biol Rhythms 24(2):195–214) esittävät PRISMA 2020 -systemaattisen katsauksen: 55 tutkimusta 892 seulotusta, tarkastellen EMF:n vaikutuksia sirkadiaanirytmeihin. 88 % korkealaatuisista eläintutkimuksista raportoi EMF-aiheutettua melatoniinivaimennusta (20–50 % basaalitasosta). Kellogenien ekspressio muuttuu. Uniarkkitehtuurin muutokset dokumentoitu. EMF:n melatoniinivaimennus on pienempi kuin valon aiheuttama (>90 %).",
          "Tukee suoraan BERM:n polkua C (EMF → pineaalinen melatoniinivaimennus → GnRH-pulsaatiohäiriö → HPG → gonadifunktio). 20–50 %:n suppressio on biologisesti merkittävä ja yhdenmukainen BERM:n v17_night_fraction()-funktion kanssa, jossa EMF on yksi komponentti yöllisessä kolminkertaisessa osumassa (melanopsiini + CRY + melatoniinivaimennus). Suppression suuruus on pienempi kuin valon aiheuttama (>90 %) — yhdenmukainen sen kanssa, että BERM mallintaa EMF:n yhtenä useista yöllisistä häiriöreiteistä, ei ainoana ajurina. Metodologinen huomio: vain 27 % tutkimuksista täytti korkeat metodologiset standardit; 48 % eläintutkimuksista ilman riittävää sham-kontrollia. Siirtymä soluvaikutuksista systeemiseen sirkadiaaniseen häiriöön ei ole täysin osoitettu kliinisesti.",
          "BERM-tulkinta: WHO:n ja ICNIRP:n näyttöluokitukset ovat alttiina samoille systemaattisille vinoumille jotka BERM tunnistaa: proxy-altistusmittauksen vaimennusvinouma, kontrolliryhmän kontaminaatio (laboratorion lähtötasovinouma) ja rahoittajan vinouma ([[ref:huss2007|Huss 2007]]: teollisuusrahoitteiset tutkimukset löytävät harvemmin haittoja). Jos nämä vinoumat ovat todellisia, 'kohtalainen varmuus' standardikehyksessä voi vastata korkeampaa varmuutta vinoumakorjatussa kehyksessä. BERM käsittelee institutionaalisia näyttöhierarkioita CONTEXT_ONLY-roolissa koska ne ovat BERM:n epistemologian ulkopuolisia, ei siksi että alla oleva näyttö olisi heikkoa.",
        ],
        studies: [
          { citation: "Tbahriti ym. (Sleep Biol Rhythms)", year: 2026, referenceId: "tbahriti2026", note: "PRISMA, 55 tutkimusta: 88 % korkealaatuisista eläintutkimuksista raportoi melatoniinivaimennusta 20–50 %. Vain 27 % täytti korkeat standardit." },
          { citation: "Huss ym. (Environ Health Perspect)", year: 2007, referenceId: "huss2007", note: "Teollisuusrahoitteiset EMF-tutkimukset raportoivat harvemmin haittoja. Systemaattinen rahoittajan vinouma." },
        ],
      },
      {
        id: "sousouri-neuroimaging",
        title: "Ihmisen magnetoreseption aivokuvantaminen ([[ref:sousouri2025|Sousouri 2025]])",
        paragraphs: [
          "[[ref:sousouri2025|Sousouri ym. (2025,]] NeuroImage) tarjoavat ensimmäisen fMRI-näytön siitä, että staattisen magneettikentän muutokset tuottavat mitattavia hermovasteitä ihmisillä. Kontrolloiduille geomagneettisen kentän manipulaatioille altistetut koehenkilöt osoittivat toistettavaa alfa-aallon (8–13 Hz) desynkronisaatiota — sama hermosignaali jonka tunnetut aistiärsykkeet tuottavat. Vaikutus oli voimakkain henkilöillä joilla oli korkeampi lähtötason alfateho ja osoitti lateralisaatiota joka viittaa oikean aivopuoliskon prosessointiin.",
          "Tämä tutkimus tukee suoraan BERM:n reitin B radikaalipari-mekanismia: jos ihmisen neuronit reagoivat havaittavasti staattisen magneettikentän muutoksiin maanmagneettikentän voimakkuuksilla (~50 μT), CRY/RPM-transduuktioreitti on empiirisesti vahvistettu neurologisesti aktiiviseksi ihmisillä — ei vain muuttolinnuilla.",
          "BERM-tulkinta: jos maanmagneettikentän voimakkuiset staattiset kentät tuottavat mitattavia hermovasteitä, aikariippuvaiset antropogeeniset kentät (jotka ovat kertaluokkaa tehokkaampia radikaaliparin dynamiikan ajamisessa kuin staattiset kentät) tuottaisivat odotetusti vahvemman, kroonisen hermoperturbaation. [[ref:sousouri2025|Sousouri 2025]] -tulos sulkee aukon eläinmagnetoreseptiotutkimusten ja ihmisrelevanssin välillä.",
        ],
        studies: [
          { citation: "Sousouri ym. (NeuroImage)", year: 2025, referenceId: "sousouri2025", note: "fMRI: geomagneettisen kentän manipulaatio → alfadesynkronisaatio ihmisissä. Ensimmäinen aivokuvantamisvahvistus ihmisen magnetoreseptiolle." },
          { citation: "Bartölke ym. (FASEB J)", year: 2025, referenceId: "bartolke2025", note: "CRY1 ihmisen sinisten tappisolujen ulkosegmenteissä — sensorinen magnetoreseptorilokalisaatio." },
          { citation: "Wang ym. (eNeuro)", year: 2019, referenceId: "wang2019_eneuro", note: "Aikaisempi EEG-näyttö: alfa-ERD magneettikentän rotaation jälkeen suojatussa kammiossa." },
        ],
      },
    ],
    tableHeaders: { citation: "Viite", year: "Vuosi", note: "Huomio", finding: "Löydös" },
    melatoninBridge: {
      title: "Melatoniinisilta: kaskadi 1 → kaskadi 6",
      paragraphs: [
        "BERM:n kuusi kaskadia eivät ole rinnakkaisia — ne ovat sarjassa. Melatoniini on kriittinen silta kaskadin 1 (uni/sirkadiaaninen) ja kaskadin 6 (hedelmällisyys) välillä. EMF → pinealirauhanen → melatoniinivaimennus → HPG-akselin häiriö + follikulaarisen antioksidanttipuolustuksen heikkeneminen → hedelmällisyyden lasku. Tämä reitti on erillinen EMF:n suorasta gonadivasteesta (VGCC → siittiöt), ja molempien täytyy olla aktiivisia samanaikaisesti kokonaisvaikutuksen tuottamiseksi.",
        "Pinealirauhanen 'näkee' sähkömagneettisen kentän valona. [[ref:battelle1980_emf_melatonin|Battellen tutkimus (1980)]] osoitti EMF:n suppressoivan yöllistä melatoniinihuippua koe-eläimillä. Mekanismi: magnetiitti (Fe₃O₄) pinealirauhan kalvoilla ja/tai kryptokromien (CRY1/CRY2) radikaalipari­mekanismi havaitsevat kentän, NAT-aktiivisuus (serotoniini → melatoniini -konversio) hidastuu, yöllisen melatoniinihuipun amplitudi laskee ja ajoitus viivästyy. Ihmistutkimukset ovat RISTIRIITAISIA: jotkin osoittavat suppressiota, toiset eivät — mutta eläindata on johdonmukaista ja mekanismi on biologisesti uskottava.",
        "Melatoniini follikkuli­nesteessä on munasolun kriittinen suojaaja. [[ref:tamura2012_follicular_melatonin|Tamura ym. (2012)]] osoittivat, että follikkelinesteen melatoniinikonsentraatio korreloi suoraan munasolun laadun kanssa. Melatoniini neutraloi happiradikaaleja (ROS), suojaa mitokondriaalista DNA:ta ja säätelee Gdf9- ja Bmp15-geenien ilmentymistä munasoluissa. IVF meta-analyysit ([[ref:tong2017_melatonin_ivf|Tong 2017]], [[ref:pmc12500685|PMC12500685]], [[ref:pmc11265587|PMC11265587]]) osoittavat johdonmukaisesti: melatoniinilisä parantaa fertilisaatioastetta, alkionlaatua ja kliinistä raskausastetta. Mutta meta-analyysien otoskoot ovat pieniä, sokkoutus vaikeaa ja julkaisuvinouma mahdollinen.",
        "Miesten hedelmällisyydessä melatoniini suojaa Leydigin soluja oksidatiiviselta stressiltä (testosteronituotanto), säätelee HPG-akselia (GnRH → LH/FSH) ja ylläpitää siittiöiden mitokondriaalista toimintaa. [[ref:nishihara2014_melatonin_sperm|Nishihara ym. (2014)]] osoittivat melatoniinin parantavan siittiöiden liikkuvuutta in vitro. VAROITUS: melatoniinin HPG-vaikutus EI ole yksisuuntainen — korkeina pitoisuuksina melatoniini voi SUPPRESSOIDA GnRH:ta joissain konteksteissa. Melatoniinilisä ei ole riskitöntä lisääntymisiässä.",
        "Vuorotyö on vahvin luonnollinen koe melatoniinisillalle: se vaimentaa melatoniinia sirkadiaanisen häiriön, työpaikan valaistuksen JA mahdollisen ammatillisen EMF:n kautta samanaikaisesti. Vuorotyöntekijöillä on dokumentoitu matalampi hedelmällisyys, enemmän raskauskomplikaatioita ja epäsäännöllisemmät kuukautiskierrot. Mutta vuorotyön hedelmällisyysvaikutukset ovat MONITEKIJÄISIÄ — stressi, ruokailutottumukset, sosiaalinen eristäytyminen ja muut tekijät vaikuttavat. Melatoniini on yksi tekijä, ei ainoa.",
      ],
      pathwaysTitle: "Viisi melatoniini–hedelmällisyys -polkua",
      pathwayHeaders: { pathway: "Polku", mechanism: "Mekanismi" },
      pathways: [
        { name: "HPG", mechanism: "Melatoniini → hypotalamus → GnRH → LH/FSH → gonadit" },
        { name: "Antioksidantti", mechanism: "Melatoniini follikkuli­nesteessä → ROS-neutralointi → munasolun suoja" },
        { name: "Anti-inflammatorinen", mechanism: "Melatoniini → NF-κB ↓ → krooninen tulehdus ↓ → endometrioosi/PCOS ↓" },
        { name: "Mitokondriaalinen", mechanism: "Melatoniini → AMPK/SIRT1 ↑ → lisääntymissolujen energia ↑" },
        { name: "Epigeneettinen", mechanism: "Melatoniini säätelee Gdf9- ja Bmp15-geenien ilmentymistä munasoluissa" },
      ],
      referencesTitle: "Viitteet",
      references: [
        { citation: "Battelle / Wilson ym.", year: 1980, referenceId: "battelle1980_emf_melatonin", finding: "EMF vaimentaa yöllistä melatoniinia koe-eläimissä (60 Hz, ELF)" },
        { citation: "Tamura ym.", year: 2012, referenceId: "tamura2012_follicular_melatonin", finding: "Follikkuli­nesteen melatoniini korreloi munasolun laadun kanssa; antioksidanttirooli munasolussa" },
        { citation: "Tong ym.", year: 2017, referenceId: "tong2017_melatonin_ivf", finding: "Meta-analyysi: melatoniinilisä parantaa IVF-tuloksia (fertilisaatio, alkion laatu, raskaus)" },
        { citation: "PMC12500685", year: 2025, referenceId: "pmc12500685", finding: "Systemaattinen katsaus: melatoniini parantaa munasolun ja alkion laatua IVF:ssä" },
        { citation: "PMC11265587", year: 2024, referenceId: "pmc11265587", finding: "Meta-analyysi: melatoniini parantaa kliinistä raskausastetta IVF:ssä" },
        { citation: "PMC10354453", year: 2023, referenceId: "pmc10354453", finding: "Katsaus: melatoniinin viisi reittiä naisen hedelmällisyyteen (HPG, antioksidantti, anti-inflammatorinen, mitokondriaalinen, epigeneettinen)" },
        { citation: "Reiter ym.", year: 2007, referenceId: "reiter2007_melatonin_male", finding: "Melatoniini suojaa siittiöitä oksidatiiviselta vauriolta; säätelee HPG-akselia" },
        { citation: "Unfer ym.", year: 2011, referenceId: "unfer2011_melatonin_ivf", finding: "Melatoniini IVF:ssä: munasolun laatu paranee, mutta pienet otoskoot ja sokkoutuksen haasteet" },
        { citation: "Nishihara ym.", year: 2014, referenceId: "nishihara2014_melatonin_sperm", finding: "Melatoniini parantaa siittiöiden liikkuvuutta in vitro" },
        { citation: "Rad. Prot. Dosimetry", year: 2013, referenceId: "rad_prot_dosimetry2013_emf_melatonin", finding: "RF-EMF ja melatoniinivaimennus: epidemiologinen katsaus (tulokset epäjohdonmukaisia ihmisillä)" },
      ],
      epistemicNote: "Episteeminen taso: Melatoniini follikkuli­nesteessä → munasolun laatu [E] ([[ref:tamura2012_follicular_melatonin|Tamura 2012]], replikoitu). Melatoniinilisä IVF:ssä [E] (meta-analyysit, mutta pienet otoskoot). EMF → melatoniinivaimennus [M|C] (vahva eläindata, epäjohdonmukainen ihmisdata). Melatoniini-hedelmällisyyssilta kokonaisuutena [C] (teoreettinen yhdistäminen). IVF meta-analyysit ovat pieniä — julkaisuvinouma mahdollinen. Melatoniini HPG-vaikutus on KAKSISUUNTAINEN. Vuorotyön hedelmällisyysvaje on monitekijäinen — melatoniini on yksi polku.",
    },
    sleep: {
      title: "Unideprivaatio keskeisenä välittävänä mekanismina",
      paragraphs: [
        "Unideprivaatio tuottaa jokaisen biologisen lopputuloksen jonka BERM:n kuusi retrodiktiota kuvaavat: testosteronilasku (Leproult & Van Cauter: −10–15 % nuorilla miehillä), siittiölasku (−29 %, enemmän epämuodostumia), NK-solujen romahdus (Irwin: −70 % yhdessä yössä), metabolinen oireyhtymä (Spiegel ym.: pre-diabeettinen tila viikossa), sympaattinen yliaktivaatio (krooninen tulehdus) ja masennus (Walker: 'syy, ei oire'). Jos EMF häiritsee unta — kuten sirkadiaaninen polku (CRY/RPM, melatoniinivaimennus) ennustaa — kaikki kuusi retrodiktiota seuraavat yhden ylävirran syyn alavirtavaikutuksina.",
        "Järjestys jossa nämä tilat ilmaantuvat vastaa modulooman ennustetta: unihäiriö ensin (lyhin latenssi, kuukausia), masennus toisena (1–3 vuotta), metabolinen oireyhtymä kolmantena (3–8 vuotta), autoimmuunisairaus neljäntenä (5–10 vuotta), hedelmällisyyslasku viidentenä (5–15 vuotta), syöpä kuudentena (10–25 vuotta). Tämä järjestys ei ole mielivaltainen — se heijastaa kunkin kudoksen uusiutumisnopeutta ja kumulatiivisen vaurion kynnystä. Walker dokumentoi saman kaskadin empiirisesti ilman EMF-kehystä, tarjoten riippumattoman validoinnin modulooman ennustamalle järjestykselle.",
        "Jos uniepidemia johtuisi yksinomaan sinisestä valosta, sinisen valon suodatus (Night Shift, f.lux, keltaiset lasit) korjaisi sen. Se ei korjaa: [[ref:duraccio2021_blue_light_filter|Duraccio ym. (2021)]] osoitti, ettei Night Shift-tila parantanut merkittävästi objektiivista unenlaatua. BERM ehdottaa, että sähkömagneettisen kentän komponentti (laitteen RF, LED-valaistuksen IF) on itsenäinen unihäiritsijä, joka toimii CRY/RPM-mekanismin kautta, ei retinaalisen melanopsiinin. Tämä selittää, miksi valon suodatus ei riitä — EMF-polku ohittaa silmän kokonaan.",
      ],
      references: [
        { citation: "Walker MP", year: 2017, referenceId: "walker2017_why_we_sleep", finding: "Uni → testosteroni −10–15 %, siittiöt −29 %, NK-solut −70 %, metabolinen oireyhtymä, masennus (kausaalinen)" },
        { citation: "Leproult & Van Cauter (JAMA)", year: 2011, referenceId: "leproult2011_testosterone_sleep", finding: "5h uni 1 viikko → testosteroni −10–15 % nuorilla miehillä" },
        { citation: "Irwin MR (Annu Rev Psychol)", year: 2015, referenceId: "irwin2015_sleep_immunity", finding: "4h uni 1 yö → NK-solut −70 %. WHO 2A: yötyö" },
        { citation: "Spiegel, Leproult & Van Cauter (Lancet)", year: 1999, referenceId: "spiegel1999_sleep_metabolic", finding: "4h uni 6 yötä → pre-diabeettinen glukoositoleranssi" },
        { citation: "Chang et al. (PNAS)", year: 2015, referenceId: "chang2015_ipad_melatonin", finding: "iPad-lukeminen: melatoniini −50 %, viive +3h, LED 2× vs hehku" },
        { citation: "Duraccio et al. (Sleep Health)", year: 2021, referenceId: "duraccio2021_blue_light_filter", finding: "Night Shift EI parantanut objektiivista unenlaatua" },
      ],
      epistemicNote: "Episteeminen taso: mekanismi [E] ([[ref:walker2017_why_we_sleep|Walker]]/[[ref:leproult2011_testosterone_sleep|Leproult]]/[[ref:irwin2015_sleep_immunity|Irwin]]/[[ref:spiegel1999_sleep_metabolic|Spiegel]] data). EMF-kytkentä: [M|C] (CRY/RPM + [[ref:lindecke2026|Lindecke 2026]]).",
    },
    proxyMasking: {
      title: "Proksimasking: unitutkimuksen sokea piste",
      content: "Paradigmaattinen esimerkki: [[ref:walker2017_why_we_sleep|Matthew Walkerin 'Why We Sleep' (2017)]] on kenties vaikutusvaltaisin unitutkimuksen kirja koskaan. Walker analysoi laajasti miten LED-näytöt tukahduttavat melatoniinia sinisen valon kautta. Hän dokumentoi LED-sinisen valon aiheuttavan kaksinkertaisen melatoniinivaimennuksen hehkulamppuun verrattuna samalla intensiteetillä. Silti hän ei koskaan kysy tuottavatko LED-laitteet muuta kuin valoa — erityisesti, emittoivatko jokaisen LED-laitteen hakkuriteholähteet keskitaajuisia sähkömagneettisia kenttiä (20–200 kHz) jotka voisivat itsenäisesti häiritä sirkadiaanista järjestelmää CRY/RPM-mekanismin kautta. Sähkömagneettinen kenttä ei ole hänen käsitteellisessä sanastossaan. Tämä ei ole kritiikki Walkeria kohtaan — se on osoitus siitä, miten täydellisesti EMF-hypoteesi puuttuu valtavirran unitieteestä.",
    },
    shiftWork: {
      title: "Vuorotyö BERM:n luonnollisena kokeena",
      lead: "Vuorotyöntekijä altistuu kolmelle BERM-mekanismille samanaikaisesti: (1) palautumisikkuna poistettu — yötyö ja päiväuni EMF-ympäristössä tarkoittavat, että CaMKII ei defosforyloidu koskaan; (2) IF-altistus kriittisellä hetkellä — yötyö LED/loisteputkivalossa juuri kun melatoniinin pitäisi olla huipussa; (3) CRY-herkkyyden maksimi — pimeässä CRY on herkimmillään, ja keinovalolle siirryttäessä CRY-signaali sekoittuu EMF + valo -yhdistelmään.",
      tableTitle: "Vuorotyön terveysprofiilin vastaavuus BERM-kaskadeihin",
      tableHeaders: { cascade: "BERM-kaskadi", effect: "Vuorotyön vaikutus" },
      tableRows: [
        { cascade: "Uni/melatoniini", effect: "Melatoniini↓, uni↓", or: "—" },
        { cascade: "Masennus", effect: "Masennus↑, ahdistus↑", or: "OR ~1.4" },
        { cascade: "Metabolinen syndr.", effect: "MetS 2.17×", or: "OR 2.17" },
        { cascade: "T2D", effect: "T2D-riski↑", or: "HR ~1.1–1.4" },
        { cascade: "Kardiovaskulaari", effect: "CVD, MI↑", or: "HR ~1.2" },
        { cascade: "Fertiliteetti", effect: "Keskenmenot↑, T↓", or: "OR ~1.3" },
        { cascade: "Syöpä", effect: "Rintasyöpä (IARC 2A)", or: "OR ~1.2" },
        { cascade: "Endokriininen", effect: "Kortisoli↑, kilpirauhanen", or: "—" },
      ],
      predictionLabel: "BERM:n erotteleva ennuste: ",
      predictionContent: "Unenpuute yksin EI selitä kaikkea. EMF-komponentti (LED IF yöllä + WiFi-ympäristö päiväunella + CRY-häiriö pimeässä) tuottaa lisävaikutuksen unenpuutteen päälle. Testattavissa: vuorotyöntekijä joka nukkuu Faraday-suojatussa makuuhuoneessa (EMF-vapaa yö) vs. tavanomainen makuuhuone — samalla uniajalla. Jos Faraday-ryhmä osoittaa parempaa melatoniinipalautumista ja vähemmän metabolista oireyhtymää, ero on EMF-komponentti.",
      epistemicNote: "Episteeminen taso: vuorotyön terveysvaikutukset [E] (meta-analyysit). BERM-tulkinta (kolme samanaikaista mekanismia) [M|C]. Faraday-interventio [C] (ehdotettu, ei vielä testattu).",
    },
    seeAlso: {
      title: "Katso myös",
      links: [
        { title: "Näyttörekisteri", description: "Kaikki näyttötietueet ja -narratiivit" },
        { title: "Silmien väri ja magnetoreseptio", description: "CRY-herkkyys, iiriksen pigmentaatio ja ravitsemus" },
        { title: "Ravitsemuksellinen CRY-modulaatio", description: "B2, omega-rasvahapot ja paastodynamiikka" },
      ],
    },
  },
  ja: {
    title: "概日リズム障害、睡眠と回復",
    subtitle: "メラトニン-生殖能力ブリッジ、媒介メカニズムとしての睡眠不足、回復ウィンドウの排除、および行動抑制経路",
    backLink: "← 証拠に戻る",
    narrativeTitle: "テーマ別証拠ナラティブ",
    narrativeLead: "個別の研究をメカニズム的議論に結びつける横断的テーマ。各ナラティブは公表された知見を統合する；いずれも集団レベルの因果係数を確立するものではない。",
    narratives: [
      {
        id: "recovery",
        title: "回復ウィンドウの排除",
        paragraphs: [
          "REFLEXプロジェクト（[[ref:diem2005|Diemら2005]]）は、断続的RF曝露が同じSARでの連続曝露よりも大きな遺伝毒性効果を生じることを実証し、曝露のない間隔中に細胞修復メカニズムが活性化されることを示唆した。回復ウィンドウ仮説は、RF誘発性損傷の生物学的修復（ROS中和、DNA修復、タンパク質リフォールディング）には十分なEMFフリー時間が必要であると提案する。",
          "現代の都市居住成人は1日約2時間のほぼゼロRF曝露（接続された寝室での睡眠）を経験し、潜在的回復時間は約20.6%となる。1950年代の成人は1日約20時間をRFフリー環境で過ごし、回復時間は約90.1%であった。修復メカニズムがホメオスタシスを維持するために最低限の無曝露率を必要とするなら、回復時間の4.4倍の減少はサブサーマル曝露レベルでも累積的損傷を生じる可能性がある。",
          "最初の5G周波数特異的精巣データ（[[ref:bektas2026|Bektasら2026]], Bioelectromagnetics）は異なる角度から回復ウィンドウ概念を支持する：CoQ10補給がラットにおける3.5 GHz RF誘発性の精巣および酸化的損傷を改善した。CoQ10レスキューはメカニズムの可逆性を実証する——酸化経路は薬理学的にブロック可能であり、モデルnet_daily = damage_rate × t_emf × (1 − exp(−t_free / τ_repair))と一致する。CoQ10は抗酸化能力を増加させ、効果的にτ_repairを短縮し、1日あたりの正味損傷を減少させる。これは回復ウィンドウの薬理学的アナログである：曝露時間を減少させる代わりに、介入が修復速度を向上させる。",
        ],
        studies: [
          { citation: "REFLEX / Diem et al.", year: 2005, referenceId: "diem2005", note: "断続的 > 連続的遺伝毒性" },
          { citation: "Recovery window model (BERM)", year: 2026, referenceId: "berm_recovery_window_2026", note: "20.6% vs 90.1% EMFフリー時間" },
          { citation: "Bektas et al. (Bioelectromagnetics)", year: 2026, referenceId: "bektas2026", note: "3.5 GHz → 精巣ROS損傷；CoQ10が改善——メカニズムの可逆性、回復ウィンドウと一致。" },
        ],
      },
      {
        id: "qbs",
        title: "四重行動抑制",
        paragraphs: [
          "受胎確率はP(子供) = P(接近) × P(魅力) × P(性交) × P(受精)として分解できる。各段階にEMF感受性経路が存在する：テストステロンが接近動機を制御し（[[ref:puts2008|Puts 2008]]）、魅力は無傷の嗅覚-ホルモンシグナリングを必要とし、性的頻度はリビドーと機会に依存し、受精は精子の質を必要とする。1.0未満の各乗法因子が減少を複合する。",
          "[[ref:goetz2024|Goetzら2024]]（RCT）は外因性テストステロンが接近行動を調節することを実証した。[[ref:dreher2016|Dreherら2016]]（PNAS）は交配文脈におけるテストステロン依存的報酬評価を示した。二重ホルモンメタ分析（2018, N = 8,538）はテストステロンとコルチゾールが共同で支配性と交配努力を予測することを確認した。EMF曝露が集団レベルでテストステロンを抑制するなら（年−1%の長期トレンドが示唆するように）、4つの段階すべてが同時に影響を受ける。",
        ],
        studies: [
          { citation: "Puts 2008", year: 2008, referenceId: "puts2008", note: "テストステロンと接近動機" },
          { citation: "Goetz et al. RCT", year: 2024, referenceId: "goetz2024", note: "外因性Tが接近行動を調節" },
          { citation: "Dreher et al. PNAS", year: 2016, referenceId: "dreher2016", note: "T依存的報酬評価" },
          { citation: "Dual-hormone meta-analysis", year: 2018, referenceId: "dualhormone_meta2018", note: "T + コルチゾールが交配努力を予測（N = 8,538）" },
        ],
      },
      {
        id: "oxytocin",
        title: "二重オキシトシン経路",
        paragraphs: [
          "2つの独立した生物学的経路がオキシトシン抑制に収束する。Porgesのポリヴェーガル経路：慢性的な交感神経活性化（EMF誘発性自律神経ストレスと一致）が腹側迷走神経複合体をダウンレギュレートし、副交感神経を介したOT放出を減少させる。これはペアボンディング、性的受容性、子宮収縮性に影響する。",
          "Poutahidis/Erdman（MIT）のマイクロバイオーム経路：Lactobacillus reuteriが迷走神経を介してOT分泌を刺激する。EMF曝露は動物モデルで腸内マイクロバイオーム組成を変化させることが示されている。L. reuteri集団が慢性的RF曝露下で減少すれば、迷走神経OTシグナリング経路は独立して抑制される。両方の経路——自律神経性と微生物性——は循環OTの減少に収束し、異なる方向から生殖行動と生理学に影響する。",
          "直接的実験的証拠：2024年のScientific Reportsの研究は、4.9 GHz RF曝露がマウスで腸内マイクロバイオームのディスバイオーシスを引き起こし、微生物多様性の減少とBacteroidetes/Firmicutes比の変化を含むことを示した。これはRF曝露をBERMの経路Eが記述する腸脳軸の撹乱に直接結びつける：RF → マイクロバイオーム撹乱 → L. reuteri減少 → 迷走神経オキシトシン抑制 → 生殖動機の低下。",
        ],
        studies: [
          { citation: "Porges polyvagal theory", year: 2011, referenceId: "porges2011", note: "迷走神経トーン → OT放出経路" },
          { citation: "Poutahidis & Erdman (MIT)", year: 2014, referenceId: "poutahidis2014", note: "L. reuteri → 迷走神経 → OT" },
          { citation: "Microbiome-EMF animal studies", year: "2019–24", referenceId: "microbiome_emf_collection_2019_2024", note: "RFが腸内フローラ組成を変化させる" },
          { citation: "Scientific Reports (4.9 GHz RF)", year: 2024, referenceId: "rf49_scientific_reports_2024", note: "RF → 腸内ディスバイオーシス：多様性減少、Bacteroidetes/Firmicutes比変化" },
        ],
      },
      {
        id: "melatonin-systematic",
        title: "メラトニン抑制：PRISMAシステマティックレビュー（[[ref:tbahriti2026|Tbahriti 2026]]）",
        paragraphs: [
          "[[ref:tbahriti2026|Tbahritiら（2026,]] Sleep Biol Rhythms 24(2):195–214）は892本からスクリーニングされた55の研究のPRISMA 2020システマティックレビューを提示し、EMFの概日リズムへの影響を検討している。高品質の動物研究の88%がベースラインから20–50%のEMF誘発性メラトニン抑制を報告している。時計遺伝子発現が変化。睡眠構造の変化が文書化された。EMF誘発性メラトニン抑制は光誘発性（>90%）より小さい。",
          "これはBERM経路B（EMF → 松果体メラトニン抑制 → GnRHパルス性障害 → HPG → 性腺機能）を直接支持する。20–50%の抑制規模は生物学的に有意であり、EMFが夜間の三重打撃（メラノプシン + CRY + メラトニン抑制）の一成分であるBERMのv17_night_fraction()関数と一致する。抑制規模が光誘発性（>90%）より小さいことは、BERMがEMFを複数の夜間撹乱経路の一つとしてモデル化し、唯一の駆動因子としていないことと一致する。方法論的注記：レビューされた研究の27%のみが高い方法論的基準を満たした；動物研究の48%が適切なシャムコントロールを欠いていた。細胞効果から全身性概日撹乱への移行は臨床的に完全には確立されていない。",
          "BERM解釈：WHOとICNIRPの証拠分類は、BERMが識別するのと同じシステマティックバイアスの対象である：プロキシ曝露測定からの減衰バイアス、対照群の汚染（実験室ベースラインバイアス）、資金提供者バイアス（[[ref:huss2007|Huss 2007]]：産業資金提供の研究は有害な効果を発見しにくい）。これらのバイアスが実在するなら、標準フレームワークでの「中程度の確実性」はバイアス補正フレームワークでのより高い確実性に対応する可能性がある。BERMは制度的証拠階層をCONTEXT_ONLYとして扱う——それらがBERM自体の認識論の外部にあるためであり、基礎となる証拠が弱いためではない。",
        ],
        studies: [
          { citation: "Tbahriti et al. (Sleep Biol Rhythms)", year: 2026, referenceId: "tbahriti2026", note: "PRISMA 55研究：高品質動物研究の88%がメラトニン抑制20–50%を報告。27%のみが高い基準を満たした。" },
          { citation: "Huss et al. (Environ Health Perspect)", year: 2007, referenceId: "huss2007", note: "産業資金提供のEMF研究は有害な効果を報告しにくい。システマティックな資金提供者バイアス。" },
        ],
      },
      {
        id: "sousouri-neuroimaging",
        title: "ヒト磁気受容の神経画像（[[ref:sousouri2025|Sousouri 2025]]）",
        paragraphs: [
          "[[ref:sousouri2025|Sousouriら（2025,]] NeuroImage）は、静的磁場の変化がヒトで測定可能な神経応答を生じるという最初のfMRI証拠を提供する。制御された地磁気操作に曝露された被験者は、既知の感覚刺激が生じるのと同じ神経署名である再現可能なアルファ波（8–13 Hz）脱同期を示した。効果はベースラインアルファパワーが高い個人で最も強く、右半球処理と一致するラテラリゼーションを示した。",
          "この研究はBERM経路Bのラジカルペアメカニズムを直接支持する：ヒトのニューロンが地球強度レベル（~50 μT）の静的磁場変化に検出可能に反応するなら、CRY/RPMトランスダクション経路はヒトで神経学的に活性であることが実証的に確認される——渡り鳥だけでなく。アルファ脱同期パターンは、磁場検出がCRY1が青錐体外節に局在する網膜レベル（[[ref:bartolke2025|Bartölke 2025]]）だけでなく、皮質レベルで生じることを示唆する。",
          "BERM解釈：地球強度の静的磁場が測定可能な神経応答を生じるなら、時間変動する人為的磁場（ラジカルペアダイナミクスの駆動において静的磁場よりもオーダーで効果的）はより強い慢性的な神経撹乱を生じると予想される。[[ref:sousouri2025|Sousouri 2025]]の結果は動物磁気受容研究とヒトの関連性のギャップを閉じる——感覚装置は存在し、神経学的に活性である。",
        ],
        studies: [
          { citation: "Sousouri et al. (NeuroImage)", year: 2025, referenceId: "sousouri2025", note: "fMRI：地磁気操作 → ヒトでのアルファ脱同期。ヒト磁気受容の最初の神経画像確認。" },
          { citation: "Bartölke et al. (FASEB J)", year: 2025, referenceId: "bartolke2025", note: "ヒト青錐体外節のCRY1——感覚磁気受容体の局在化。" },
          { citation: "Wang et al. (eNeuro)", year: 2019, referenceId: "wang2019_eneuro", note: "以前のEEG証拠：遮蔽チャンバーでの磁場回転後のアルファERD。" },
        ],
      },
    ],
    tableHeaders: { citation: "引用", year: "年", note: "注記", finding: "知見" },
    melatoninBridge: {
      title: "メラトニンブリッジ：カスケード1 → カスケード6",
      paragraphs: [
        "BERMの6つのカスケードは並列ではない——直列である。メラトニンはカスケード1（睡眠/概日リズム）とカスケード6（生殖能力）をつなぐ重要な橋である。EMF → 松果体 → メラトニン抑制 → HPG軸障害 + 卵胞抗酸化防御の低下 → 生殖能力低下。この経路はEMFの直接的な性腺効果（VGCC → 精子）とは別であり、完全な効果を生むには両方が同時に活性化されなければならない。",
        "松果体は電磁場を光として「見る」。[[ref:battelle1980_emf_melatonin|Battelleの研究（1980）]]は実験動物においてEMFが夜間メラトニンピークを抑制することを実証した。メカニズム：松果体膜上のマグネタイト（Fe₃O₄）および/またはクリプトクロム（CRY1/CRY2）ラジカルペアメカニズムが磁場を感知し、NAT活性（セロトニン → メラトニン変換）が減速し、夜間メラトニンピークの振幅が低下し、タイミングが遅延する。ヒト研究は不一致：抑制を示すものもあれば示さないものもある——しかし動物データは一貫しており、メカニズムは生物学的に妥当である。",
        "卵胞液中のメラトニンは卵母細胞の重要な保護者である。[[ref:tamura2012_follicular_melatonin|Tamuraら（2012）]]は卵胞液メラトニン濃度が卵母細胞の質と直接相関することを示した。メラトニンは活性酸素種（ROS）を中和し、ミトコンドリアDNAを保護し、卵母細胞のGdf9およびBmp15遺伝子発現を調節する。IVFメタ分析（[[ref:tong2017_melatonin_ivf|Tong 2017]], [[ref:pmc12500685|PMC12500685]], [[ref:pmc11265587|PMC11265587]]）は一貫して示す：メラトニン補給は受精率、胚の質、臨床妊娠率を改善する。しかしメタ分析のサンプルサイズは小さく、盲検化は困難で、出版バイアスの可能性がある。",
        "男性の生殖能力において、メラトニンはライディッヒ細胞を酸化ストレスから保護し（テストステロン産生）、HPG軸（GnRH → LH/FSH）を調節し、精子のミトコンドリア機能を維持する。[[ref:nishihara2014_melatonin_sperm|Nishiharaら（2014）]]はメラトニンがin vitroで精子運動性を改善することを示した。注意：メラトニンのHPG効果は一方向ではない——高濃度ではメラトニンはGnRHを抑制する場合がある。メラトニン補給は生殖年齢においてリスクフリーではない。",
        "交代勤務はメラトニンブリッジの最も強い自然実験である：概日リズム障害、職場照明、および可能な職業的EMFを通じて同時にメラトニンを抑制する。交代勤務者は低い生殖能力、より多くの妊娠合併症、より不規則な月経周期が文書化されている。しかし交代勤務の生殖能力効果は多因子的——ストレス、食事パターン、社会的孤立、その他の要因が寄与する。メラトニンは一つの要因であり、唯一のものではない。",
      ],
      pathwaysTitle: "メラトニン-生殖能力の5経路",
      pathwayHeaders: { pathway: "経路", mechanism: "メカニズム" },
      pathways: [
        { name: "HPG", mechanism: "メラトニン → 視床下部 → GnRH → LH/FSH → 性腺" },
        { name: "抗酸化", mechanism: "卵胞液中メラトニン → ROS中和 → 卵母細胞保護" },
        { name: "抗炎症", mechanism: "メラトニン → NF-κB ↓ → 慢性炎症 ↓ → 子宮内膜症/PCOS ↓" },
        { name: "ミトコンドリア", mechanism: "メラトニン → AMPK/SIRT1 ↑ → 生殖細胞エネルギー ↑" },
        { name: "エピジェネティック", mechanism: "メラトニンが卵母細胞のGdf9およびBmp15遺伝子発現を調節" },
      ],
      referencesTitle: "参考文献",
      references: [
        { citation: "Battelle / Wilson et al.", year: 1980, referenceId: "battelle1980_emf_melatonin", finding: "EMFが実験動物の夜間メラトニンを抑制（60 Hz, ELF）" },
        { citation: "Tamura et al.", year: 2012, referenceId: "tamura2012_follicular_melatonin", finding: "卵胞液メラトニンは卵母細胞の質と相関；卵母細胞における抗酸化作用" },
        { citation: "Tong et al.", year: 2017, referenceId: "tong2017_melatonin_ivf", finding: "メタ分析：メラトニン補給がIVF結果を改善（受精、胚の質、妊娠）" },
        { citation: "PMC12500685", year: 2025, referenceId: "pmc12500685", finding: "系統的レビュー：メラトニンがIVFにおける卵母細胞と胚の質を改善" },
        { citation: "PMC11265587", year: 2024, referenceId: "pmc11265587", finding: "メタ分析：メラトニンがIVFにおける臨床妊娠率を改善" },
        { citation: "PMC10354453", year: 2023, referenceId: "pmc10354453", finding: "レビュー：女性の生殖能力へのメラトニンの5経路（HPG、抗酸化、抗炎症、ミトコンドリア、エピジェネティック）" },
        { citation: "Reiter et al.", year: 2007, referenceId: "reiter2007_melatonin_male", finding: "メラトニンは精子を酸化損傷から保護；HPG軸を調節" },
        { citation: "Unfer et al.", year: 2011, referenceId: "unfer2011_melatonin_ivf", finding: "IVFにおけるメラトニン：卵母細胞の質は改善するが、サンプルサイズが小さく盲検化に課題" },
        { citation: "Nishihara et al.", year: 2014, referenceId: "nishihara2014_melatonin_sperm", finding: "メラトニンがin vitroで精子運動性を改善" },
        { citation: "Rad. Prot. Dosimetry", year: 2013, referenceId: "rad_prot_dosimetry2013_emf_melatonin", finding: "RF-EMFとメラトニン抑制：疫学レビュー（ヒトでは結果が不一致）" },
      ],
      epistemicNote: "認識論的レベル：卵胞液メラトニン → 卵母細胞の質 [E]（[[ref:tamura2012_follicular_melatonin|Tamura 2012]]、再現済み）。IVFにおけるメラトニン補給 [E]（メタ分析、しかし小サンプル）。EMF → メラトニン抑制 [M|C]（強い動物データ、不一致なヒトデータ）。メラトニン-生殖能力ブリッジ全体 [C]（理論的統合）。IVFメタ分析は小規模——出版バイアスの可能性。メラトニンHPG効果は双方向。交代勤務の生殖能力低下は多因子的——メラトニンは一経路。",
    },
    sleep: {
      title: "中心的媒介メカニズムとしての睡眠不足",
      paragraphs: [
        "睡眠不足はBERMの6つの逆予測が記述するすべての生物学的結果を生じる：テストステロン低下（Leproult & Van Cauter：若年男性で−10–15%）、精子減少（−29%、奇形増加）、NK細胞崩壊（Irwin：一晩で−70%）、メタボリックシンドローム（Spiegelら：1週間で前糖尿病状態）、交感神経過活動（慢性炎症）、うつ病（Walker：「症状ではなく原因」）。EMFが睡眠を妨害するなら——概日リズム経路（CRY/RPM、メラトニン抑制）が予測するように——6つの逆予測すべてが単一の上流原因の下流結果として続く。",
        "これらの状態が出現する順序はモジュロームの予測と一致する：睡眠障害が最初（最短潜伏期、数ヶ月）、うつ病が2番目（1–3年）、メタボリックシンドロームが3番目（3–8年）、自己免疫疾患が4番目（5–10年）、生殖能力低下が5番目（5–15年）、がんが6番目（10–25年）。この順序は恣意的ではない——各組織の再生速度と累積損傷閾値を反映する。WalkerはEMFフレームワークなしにこの同じカスケードを経験的に文書化し、モジュロームの予測順序の独立した検証を提供した。",
        "睡眠流行が画面のブルーライトのみに起因するなら、ブルーライトフィルタリング（Night Shift、f.lux、アンバーグラス）が解決するはずである。しかしそうではない：[[ref:duraccio2021_blue_light_filter|Duraccioら（2021）]]はNight Shiftモードが客観的な睡眠の質を有意に改善しなかったことを示した。BERMは電磁場成分（デバイスのRF、LED照明のIF）がCRY/RPMメカニズムを通じて動作する独立した睡眠妨害因子であり、網膜メラノプシンを通じてではないと提案する。これはなぜ光のフィルタリングが不十分かを説明する——EMF経路は目を完全にバイパスする。",
      ],
      references: [
        { citation: "Walker MP", year: 2017, referenceId: "walker2017_why_we_sleep", finding: "睡眠 → テストステロン −10–15%、精子 −29%、NK細胞 −70%、メタボリックシンドローム、うつ病（因果的）" },
        { citation: "Leproult & Van Cauter (JAMA)", year: 2011, referenceId: "leproult2011_testosterone_sleep", finding: "5h睡眠1週間 → 若年男性でテストステロン −10–15%" },
        { citation: "Irwin MR (Annu Rev Psychol)", year: 2015, referenceId: "irwin2015_sleep_immunity", finding: "4h睡眠1晩 → NK細胞 −70%。WHO 2A：夜勤" },
        { citation: "Spiegel, Leproult & Van Cauter (Lancet)", year: 1999, referenceId: "spiegel1999_sleep_metabolic", finding: "4h睡眠6晩 → 前糖尿病性耐糖能" },
        { citation: "Chang et al. (PNAS)", year: 2015, referenceId: "chang2015_ipad_melatonin", finding: "iPad読書：メラトニン −50%、遅延 +3h、LED 2× vs白熱灯" },
        { citation: "Duraccio et al. (Sleep Health)", year: 2021, referenceId: "duraccio2021_blue_light_filter", finding: "Night Shiftは客観的睡眠の質を改善しなかった" },
      ],
      epistemicNote: "認識論的レベル：メカニズム [E]（[[ref:walker2017_why_we_sleep|Walker]]/[[ref:leproult2011_testosterone_sleep|Leproult]]/[[ref:irwin2015_sleep_immunity|Irwin]]/[[ref:spiegel1999_sleep_metabolic|Spiegel]]データ）。EMFリンケージ：[M|C]（CRY/RPM + [[ref:lindecke2026|Lindecke 2026]]）。",
    },
    proxyMasking: {
      title: "プロキシマスキング：睡眠科学の盲点",
      content: "典型的な例：[[ref:walker2017_why_we_sleep|Matthew Walkerの「Why We Sleep」（2017）]]はおそらく史上最も影響力のある睡眠科学書である。WalkerはLED画面がブルーライトを通じてメラトニンを抑制する仕組みを広範に分析している。LED青色光が同じ強度の白熱灯と比較して2倍のメラトニン抑制効果を持つことを文書化している。しかし彼はLEDデバイスが光以外の何かを生み出すかどうかを決して問わない——具体的には、すべてのLEDデバイスのスイッチモード電源が中間周波数の電磁場（20–200 kHz）を放射し、CRY/RPMメカニズムを通じて概日システムを独立して妨害する可能性があるかどうかを。電磁場は彼の概念的語彙にない。これはWalkerへの批判ではない——EMF仮説が主流の睡眠科学からいかに完全に欠如しているかの実証である。",
    },
    shiftWork: {
      title: "自然実験としての交代勤務",
      lead: "交代勤務者は3つのBERMメカニズムすべてを同時に経験する：（1）回復ウィンドウの排除——EMF環境での夜勤と日中の睡眠はCaMKIIが脱リン酸化されないことを意味する；（2）重要な瞬間でのIF曝露——メラトニンがピークに達するべき正にその時にLED/蛍光灯下での夜勤；（3）CRY感度の最大化——暗闇ではCRYが最も感度が高く、人工光への移行がEMF + 光の組み合わせでCRYシグナルを撹乱する。",
      tableTitle: "交代勤務の健康プロファイルとBERMカスケードの対応",
      tableHeaders: { cascade: "BERMカスケード", effect: "交代勤務の影響" },
      tableRows: [
        { cascade: "睡眠/メラトニン", effect: "メラトニン↓、睡眠↓", or: "—" },
        { cascade: "うつ病", effect: "うつ病↑、不安↑", or: "OR ~1.4" },
        { cascade: "メタボリックシンドローム", effect: "MetS 2.17×", or: "OR 2.17" },
        { cascade: "T2D", effect: "T2Dリスク↑", or: "HR ~1.1–1.4" },
        { cascade: "心血管", effect: "CVD, MI↑", or: "HR ~1.2" },
        { cascade: "生殖能力", effect: "流産↑、T↓", or: "OR ~1.3" },
        { cascade: "がん", effect: "乳がん（IARC 2A）", or: "OR ~1.2" },
        { cascade: "内分泌", effect: "コルチゾール↑、甲状腺", or: "—" },
      ],
      predictionLabel: "BERMの差別化予測：",
      predictionContent: "睡眠不足だけではすべてを説明できない。EMF成分（夜間のLED IF + 日中睡眠時のWiFi環境 + 暗闇でのCRY撹乱）は睡眠不足を超えた追加効果を生む。検証可能：ファラデー遮蔽寝室（EMFフリーの夜）で眠る交代勤務者 vs 通常の寝室——同じ睡眠時間で。ファラデー群がより良いメラトニン回復とより少ないメタボリックシンドロームを示せば、差はEMF成分である。",
      epistemicNote: "認識論的レベル：交代勤務の健康影響 [E]（メタ分析）。BERM解釈（3つの同時メカニズム）[M|C]。ファラデー介入 [C]（提案済み、未検証）。",
    },
    seeAlso: {
      title: "関連項目",
      links: [
        { title: "エビデンスレジスター", description: "すべてのエビデンス記録とナラティブ" },
        { title: "目の色と磁気受容", description: "CRY感度、虹彩色素沈着、栄養" },
        { title: "栄養によるCRY調節", description: "B2、オメガ脂肪酸、断食ダイナミクス" },
      ],
    },
  },
  fr: {
    title: "Perturbation circadienne, sommeil et récupération",
    subtitle: "Pont mélatonine-fertilité, privation de sommeil comme mécanisme médiateur, élimination de la fenêtre de récupération et voies de suppression comportementale",
    backLink: "← Retour aux preuves",
    narrativeTitle: "Narratifs thématiques de preuves",
    narrativeLead: "Des thèmes transversaux qui relient les études individuelles en arguments mécanistiques. Chaque narratif synthétise des résultats publiés ; aucun n'établit de coefficient causal au niveau populationnel.",
    narratives: [
      {
        id: "recovery",
        title: "Élimination de la fenêtre de récupération",
        paragraphs: [
          "Le projet REFLEX ([[ref:diem2005|Diem et al. 2005]]) a démontré que l'exposition RF intermittente produit des effets génotoxiques plus importants que l'exposition continue au même DAS, suggérant que les mécanismes de réparation cellulaire s'activent pendant les intervalles sans exposition. L'hypothèse de la fenêtre de récupération propose que la réparation biologique des dommages induits par les RF (neutralisation des ROS, réparation de l'ADN, repliement des protéines) nécessite un temps suffisant sans EMF.",
          "Un adulte urbain moderne connaît environ 2 heures par jour d'exposition RF quasi nulle (sommeil dans une chambre connectée), soit environ 20,6 % de temps de récupération potentiel. Un adulte des années 1950 passait environ 20 heures par jour dans des environnements sans RF, soit environ 90,1 % de temps de récupération. Si les mécanismes de réparation nécessitent une fraction minimale sans exposition pour maintenir l'homéostasie, la réduction de 4,4× du temps de récupération pourrait produire des dommages cumulatifs même à des niveaux d'exposition sous-thermiques.",
          "Les premières données testiculaires spécifiques à la fréquence 5G ([[ref:bektas2026|Bektas et al. 2026]], Bioelectromagnetics) soutiennent le concept de fenêtre de récupération sous un angle différent : la supplémentation en CoQ10 a amélioré les dommages testiculaires et oxydatifs induits par le RF 3,5 GHz chez les rats. Le sauvetage par CoQ10 démontre la réversibilité du mécanisme — la voie oxydative est pharmacologiquement bloquable, conformément au modèle net_daily = damage_rate × t_emf × (1 − exp(−t_free / τ_repair)). Le CoQ10 augmente la capacité antioxydante, raccourcissant effectivement τ_repair et réduisant les dommages quotidiens nets. C'est un analogue pharmacologique de la fenêtre de récupération : au lieu de réduire le temps d'exposition, l'intervention augmente le taux de réparation.",
        ],
        studies: [
          { citation: "REFLEX / Diem et al.", year: 2005, referenceId: "diem2005", note: "Génotoxicité intermittente > continue" },
          { citation: "Recovery window model (BERM)", year: 2026, referenceId: "berm_recovery_window_2026", note: "20,6 % vs 90,1 % de temps sans EMF" },
          { citation: "Bektas et al. (Bioelectromagnetics)", year: 2026, referenceId: "bektas2026", note: "3,5 GHz → dommages testiculaires ROS ; CoQ10 améliore — réversibilité du mécanisme, cohérent avec la fenêtre de récupération." },
        ],
      },
      {
        id: "qbs",
        title: "Suppression comportementale quadruple",
        paragraphs: [
          "La probabilité de conception peut être décomposée en P(enfant) = P(approche) × P(attraction) × P(rapport) × P(fécondation). Des voies sensibles aux EMF existent à chaque étape : la testostérone gouverne la motivation d'approche ([[ref:puts2008|Puts 2008]]), l'attraction nécessite une signalisation olfactivo-hormonale intacte, la fréquence sexuelle dépend de la libido et des opportunités, et la fécondation nécessite la qualité du sperme. Chaque facteur multiplicatif inférieur à 1,0 compose la réduction.",
          "[[ref:goetz2024|Goetz et al. 2024]] (ECR) ont démontré que la testostérone exogène module le comportement d'approche. [[ref:dreher2016|Dreher et al. 2016]] (PNAS) ont montré l'évaluation de la récompense dépendante de la testostérone dans des contextes d'accouplement. La méta-analyse bi-hormonale (2018, N = 8 538) a confirmé que la testostérone et le cortisol prédisent conjointement la dominance et l'effort d'accouplement. Si l'exposition aux EMF supprime la testostérone au niveau populationnel (comme le suggère la tendance séculaire de −1 %/an), les quatre étapes sont affectées simultanément.",
        ],
        studies: [
          { citation: "Puts 2008", year: 2008, referenceId: "puts2008", note: "Testostérone et motivation d'approche" },
          { citation: "Goetz et al. RCT", year: 2024, referenceId: "goetz2024", note: "La T exogène module le comportement d'approche" },
          { citation: "Dreher et al. PNAS", year: 2016, referenceId: "dreher2016", note: "Évaluation de la récompense dépendante de T" },
          { citation: "Dual-hormone meta-analysis", year: 2018, referenceId: "dualhormone_meta2018", note: "T + cortisol prédisent l'effort d'accouplement (N = 8 538)" },
        ],
      },
      {
        id: "oxytocin",
        title: "Double voie de l'ocytocine",
        paragraphs: [
          "Deux voies biologiques indépendantes convergent vers la suppression de l'ocytocine. La voie polyvagale de Porges : l'activation sympathique chronique (cohérente avec le stress autonome induit par les EMF) régule à la baisse le complexe vagal ventral, réduisant la libération d'OT médiée par le parasympathique. Cela affecte les liens de couple, la réceptivité sexuelle et la contractilité utérine.",
          "La voie du microbiome de Poutahidis/Erdman (MIT) : Lactobacillus reuteri stimule la sécrétion d'OT via le nerf vague. L'exposition aux EMF a montré qu'elle altère la composition du microbiome intestinal dans des modèles animaux. Si les populations de L. reuteri déclinent sous une exposition RF chronique, la voie de signalisation vagale de l'OT est supprimée indépendamment. Les deux voies — autonome et microbienne — convergent vers une réduction de l'OT circulant, affectant le comportement reproducteur et la physiologie de directions différentes.",
          "Preuve expérimentale directe : une étude de 2024 dans Scientific Reports a montré que l'exposition RF à 4,9 GHz provoquait une dysbiose du microbiome intestinal chez les souris, incluant une diminution de la diversité microbienne et un ratio Bacteroidetes/Firmicutes altéré. Cela relie l'exposition RF directement à la perturbation de l'axe intestin-cerveau que décrit la voie E de BERM : RF → perturbation du microbiome → déclin de L. reuteri → suppression de l'ocytocine vagale → déclin de la motivation reproductive.",
        ],
        studies: [
          { citation: "Porges polyvagal theory", year: 2011, referenceId: "porges2011", note: "Tonus vagal → voie de libération d'OT" },
          { citation: "Poutahidis & Erdman (MIT)", year: 2014, referenceId: "poutahidis2014", note: "L. reuteri → nerf vague → OT" },
          { citation: "Microbiome-EMF animal studies", year: "2019–24", referenceId: "microbiome_emf_collection_2019_2024", note: "Les RF altèrent la composition de la flore intestinale" },
          { citation: "Scientific Reports (4.9 GHz RF)", year: 2024, referenceId: "rf49_scientific_reports_2024", note: "RF → dysbiose intestinale : diversité diminuée, ratio Bacteroidetes/Firmicutes altéré" },
        ],
      },
      {
        id: "melatonin-systematic",
        title: "Suppression de la mélatonine : revue systématique PRISMA ([[ref:tbahriti2026|Tbahriti 2026]])",
        paragraphs: [
          "[[ref:tbahriti2026|Tbahriti et al. (2026,]] Sleep Biol Rhythms 24(2):195–214) présentent une revue systématique PRISMA 2020 de 55 études sur 892 examinées, étudiant les effets des EMF sur les rythmes circadiens. 88 % des études animales de haute qualité rapportent une suppression de la mélatonine induite par les EMF de 20–50 % par rapport à la ligne de base. L'expression des gènes horloge est altérée. Les modifications de l'architecture du sommeil sont documentées. La suppression de la mélatonine induite par les EMF est inférieure à celle induite par la lumière (>90 %).",
          "Cela soutient directement la voie B de BERM (EMF → suppression pinéale de la mélatonine → perturbation de la pulsatilité de la GnRH → HPG → fonction gonadique). La magnitude de suppression de 20–50 % est biologiquement significative et cohérente avec la fonction v17_night_fraction() de BERM, où les EMF sont une composante du triple coup nocturne (mélanopsine + CRY + suppression de la mélatonine). Le fait que la magnitude de suppression soit inférieure à celle induite par la lumière (>90 %) est cohérent avec la modélisation par BERM des EMF comme une voie de perturbation nocturne parmi plusieurs, et non comme le seul facteur. Note méthodologique : seulement 27 % des études examinées ont satisfait à des normes méthodologiques élevées ; 48 % des études animales manquaient de contrôles sham adéquats. La transition des effets cellulaires à la perturbation circadienne systémique n'est pas entièrement établie cliniquement.",
          "Interprétation BERM : les classifications de preuves de l'OMS et de l'ICNIRP sont soumises aux mêmes biais systématiques que BERM identifie : biais d'atténuation des mesures d'exposition par proxy, contamination du groupe contrôle (biais de ligne de base du laboratoire), et biais du financeur ([[ref:huss2007|Huss 2007]] : les études financées par l'industrie sont moins susceptibles de trouver des effets nocifs). Si ces biais sont réels, une « certitude modérée » dans le cadre standard peut correspondre à une certitude plus élevée dans un cadre corrigé des biais. BERM traite les hiérarchies de preuves institutionnelles comme CONTEXT_ONLY parce qu'elles sont externes à l'épistémologie propre de BERM, non parce que les preuves sous-jacentes sont faibles.",
        ],
        studies: [
          { citation: "Tbahriti et al. (Sleep Biol Rhythms)", year: 2026, referenceId: "tbahriti2026", note: "PRISMA 55 études : 88 % des études animales de haute qualité rapportent une suppression de la mélatonine de 20–50 %. Seulement 27 % ont satisfait aux normes élevées." },
          { citation: "Huss et al. (Environ Health Perspect)", year: 2007, referenceId: "huss2007", note: "Les études EMF financées par l'industrie sont moins susceptibles de rapporter des effets nocifs. Biais systématique du financeur." },
        ],
      },
      {
        id: "sousouri-neuroimaging",
        title: "Neuroimagerie de la magnétoréception humaine ([[ref:sousouri2025|Sousouri 2025]])",
        paragraphs: [
          "[[ref:sousouri2025|Sousouri et al. (2025,]] NeuroImage) fournissent la première preuve par fMRI que les changements de champ magnétique statique produisent des réponses neurales mesurables chez les humains. Les sujets exposés à des manipulations contrôlées du champ géomagnétique ont montré une désynchronisation reproductible des ondes alpha (8–13 Hz) — la même signature neurale produite par des stimuli sensoriels connus. L'effet était le plus fort chez les individus avec une puissance alpha de base plus élevée et montrait une latéralisation cohérente avec un traitement hémisphérique droit.",
          "Cette étude soutient directement le mécanisme de paire de radicaux de la voie B de BERM : si les neurones humains répondent de manière détectable aux changements de champ magnétique statique aux niveaux de la force terrestre (~50 μT), la voie de transduction CRY/RPM est empiriquement confirmée comme neurologiquement active chez les humains — pas seulement chez les oiseaux migrateurs. Le schéma de désynchronisation alpha suggère que la détection du champ magnétique se produit au niveau cortical, pas seulement au niveau rétinien où CRY1 est localisé dans les segments externes des cônes bleus ([[ref:bartolke2025|Bartölke 2025]]).",
          "Interprétation BERM : si les champs statiques de force terrestre produisent des réponses neurales mesurables, les champs anthropiques variant dans le temps (qui sont d'ordres de grandeur plus efficaces pour entraîner la dynamique des paires de radicaux que les champs statiques) devraient produire une perturbation neurale chronique plus forte. Le résultat de [[ref:sousouri2025|Sousouri 2025]] comble le fossé entre les études de magnétoréception animale et la pertinence humaine — l'appareil sensoriel est présent et neurologiquement actif.",
        ],
        studies: [
          { citation: "Sousouri et al. (NeuroImage)", year: 2025, referenceId: "sousouri2025", note: "fMRI : manipulation du champ géomagnétique → désynchronisation alpha chez les humains. Première confirmation par neuroimagerie de la magnétoréception humaine." },
          { citation: "Bartölke et al. (FASEB J)", year: 2025, referenceId: "bartolke2025", note: "CRY1 dans les segments externes des cônes bleus humains — localisation du magnétorécepteur sensoriel." },
          { citation: "Wang et al. (eNeuro)", year: 2019, referenceId: "wang2019_eneuro", note: "Preuve EEG antérieure : alpha-ERD après rotation du champ magnétique en chambre blindée." },
        ],
      },
    ],
    tableHeaders: { citation: "Référence", year: "Année", note: "Note", finding: "Résultat" },
    melatoninBridge: {
      title: "Le pont mélatonine : cascade 1 → cascade 6",
      paragraphs: [
        "Les six cascades de BERM ne sont pas parallèles — elles sont en série. La mélatonine est le pont critique entre la cascade 1 (sommeil/circadien) et la cascade 6 (fertilité). CEM → glande pinéale → suppression de la mélatonine → perturbation de l'axe HPG + déclin de la défense antioxydante folliculaire → déclin de la fertilité. Cette voie est distincte des effets gonadiques directs des CEM (VGCC → spermatozoïdes), et les deux doivent être actives simultanément pour produire l'effet complet.",
        "La glande pinéale « voit » les champs électromagnétiques comme de la lumière. [[ref:battelle1980_emf_melatonin|L'étude de Battelle (1980)]] a démontré la suppression par les CEM du pic nocturne de mélatonine chez les animaux expérimentaux. Mécanisme : la magnétite (Fe₃O₄) sur les membranes pinéales et/ou le mécanisme de paire radicalaire des cryptochromes (CRY1/CRY2) détectent le champ, l'activité NAT (conversion sérotonine → mélatonine) ralentit, l'amplitude du pic nocturne de mélatonine diminue et le timing se décale. Les études humaines sont INCONSISTANTES : certaines montrent une suppression, d'autres non — mais les données animales sont cohérentes et le mécanisme est biologiquement plausible.",
        "La mélatonine dans le liquide folliculaire est le protecteur critique de l'ovocyte. [[ref:tamura2012_follicular_melatonin|Tamura et al. (2012)]] ont montré que la concentration de mélatonine dans le liquide folliculaire est directement corrélée à la qualité ovocytaire. La mélatonine neutralise les espèces réactives de l'oxygène (ROS), protège l'ADN mitochondrial et régule l'expression des gènes Gdf9 et Bmp15 dans les ovocytes. Les méta-analyses IVF ([[ref:tong2017_melatonin_ivf|Tong 2017]], [[ref:pmc12500685|PMC12500685]], [[ref:pmc11265587|PMC11265587]]) montrent systématiquement : la supplémentation en mélatonine améliore le taux de fécondation, la qualité embryonnaire et le taux de grossesse clinique. Mais les tailles d'échantillon sont petites, l'insu est difficile et un biais de publication est possible.",
        "Pour la fertilité masculine, la mélatonine protège les cellules de Leydig du stress oxydatif (production de testostérone), régule l'axe HPG (GnRH → LH/FSH) et maintient la fonction mitochondriale des spermatozoïdes. [[ref:nishihara2014_melatonin_sperm|Nishihara et al. (2014)]] ont montré que la mélatonine améliore la motilité des spermatozoïdes in vitro. ATTENTION : l'effet HPG de la mélatonine N'EST PAS unidirectionnel — à haute concentration, la mélatonine peut SUPPRIMER la GnRH dans certains contextes. La supplémentation en mélatonine n'est pas sans risque en âge de reproduction.",
        "Le travail posté est l'expérience naturelle la plus forte pour le pont mélatonine : il supprime la mélatonine par la perturbation circadienne, l'éclairage du lieu de travail ET une possible exposition professionnelle aux CEM simultanément. Les travailleurs postés ont une fertilité documentée plus basse, plus de complications de grossesse et des cycles menstruels plus irréguliers. Mais les effets du travail posté sur la fertilité sont MULTIFACTORIELS — le stress, les habitudes alimentaires, l'isolement social et d'autres facteurs contribuent. La mélatonine est un facteur, pas le seul.",
      ],
      pathwaysTitle: "Cinq voies mélatonine–fertilité",
      pathwayHeaders: { pathway: "Voie", mechanism: "Mécanisme" },
      pathways: [
        { name: "HPG", mechanism: "Mélatonine → hypothalamus → GnRH → LH/FSH → gonades" },
        { name: "Antioxydant", mechanism: "Mélatonine dans le liquide folliculaire → neutralisation ROS → protection ovocytaire" },
        { name: "Anti-inflammatoire", mechanism: "Mélatonine → NF-κB ↓ → inflammation chronique ↓ → endométriose/SOPK ↓" },
        { name: "Mitochondrial", mechanism: "Mélatonine → AMPK/SIRT1 ↑ → énergie des cellules reproductrices ↑" },
        { name: "Épigénétique", mechanism: "La mélatonine régule l'expression des gènes Gdf9 et Bmp15 dans les ovocytes" },
      ],
      referencesTitle: "Références",
      references: [
        { citation: "Battelle / Wilson et al.", year: 1980, referenceId: "battelle1980_emf_melatonin", finding: "Les CEM suppriment la mélatonine nocturne chez les animaux expérimentaux (60 Hz, ELF)" },
        { citation: "Tamura et al.", year: 2012, referenceId: "tamura2012_follicular_melatonin", finding: "La mélatonine folliculaire corrèle avec la qualité ovocytaire ; rôle antioxydant dans l'ovocyte" },
        { citation: "Tong et al.", year: 2017, referenceId: "tong2017_melatonin_ivf", finding: "Méta-analyse : la supplémentation en mélatonine améliore les résultats IVF (fécondation, qualité embryonnaire, grossesse)" },
        { citation: "PMC12500685", year: 2025, referenceId: "pmc12500685", finding: "Revue systématique : la mélatonine améliore la qualité ovocytaire et embryonnaire en IVF" },
        { citation: "PMC11265587", year: 2024, referenceId: "pmc11265587", finding: "Méta-analyse : la mélatonine améliore le taux de grossesse clinique en IVF" },
        { citation: "PMC10354453", year: 2023, referenceId: "pmc10354453", finding: "Revue : les cinq voies de la mélatonine vers la fertilité féminine (HPG, antioxydant, anti-inflammatoire, mitochondrial, épigénétique)" },
        { citation: "Reiter et al.", year: 2007, referenceId: "reiter2007_melatonin_male", finding: "La mélatonine protège les spermatozoïdes des dommages oxydatifs ; régule l'axe HPG" },
        { citation: "Unfer et al.", year: 2011, referenceId: "unfer2011_melatonin_ivf", finding: "Mélatonine en IVF : la qualité ovocytaire s'améliore, mais échantillons petits et défis d'insu" },
        { citation: "Nishihara et al.", year: 2014, referenceId: "nishihara2014_melatonin_sperm", finding: "La mélatonine améliore la motilité des spermatozoïdes in vitro" },
        { citation: "Rad. Prot. Dosimetry", year: 2013, referenceId: "rad_prot_dosimetry2013_emf_melatonin", finding: "RF-CEM et suppression de la mélatonine : revue épidémiologique (résultats inconsistants chez l'homme)" },
      ],
      epistemicNote: "Niveau épistémique : mélatonine dans le liquide folliculaire → qualité ovocytaire [E] ([[ref:tamura2012_follicular_melatonin|Tamura 2012]], répliqué). Supplémentation en mélatonine en IVF [E] (méta-analyses, mais petits échantillons). CEM → suppression de la mélatonine [M|C] (données animales solides, données humaines inconsistantes). Pont mélatonine-fertilité dans son ensemble [C] (unification théorique). Les méta-analyses IVF sont petites — biais de publication possible. L'effet HPG de la mélatonine est BIDIRECTIONNEL. Le déficit de fertilité du travail posté est multifactoriel — la mélatonine est une voie.",
    },
    sleep: {
      title: "La privation de sommeil comme mécanisme médiateur central",
      paragraphs: [
        "La privation de sommeil produit chaque résultat biologique que les six rétrodictions de BERM décrivent : déclin de la testostérone (Leproult & Van Cauter : −10–15 % chez les jeunes hommes), déclin des spermatozoïdes (−29 % avec plus de malformations), effondrement des cellules NK (Irwin : −70 % en une nuit), syndrome métabolique (Spiegel et al. : pré-diabétique en une semaine), hyperactivité sympathique (inflammation chronique) et dépression (Walker : « une cause, pas un symptôme »). Si les CEM perturbent le sommeil — ce que la voie circadienne (CRY/RPM, suppression de la mélatonine) prédit — alors les SIX rétrodictions suivent comme conséquences en aval d'une cause unique en amont.",
        "L'ordre d'apparition de ces pathologies correspond à la prédiction du modulome : perturbation du sommeil en premier (latence la plus courte, mois), dépression en deuxième (1–3 ans), syndrome métabolique en troisième (3–8 ans), maladie auto-immune en quatrième (5–10 ans), déclin de la fertilité en cinquième (5–15 ans), cancer en sixième (10–25 ans). Cet ordre n'est pas arbitraire — il reflète la vitesse de régénération de chaque tissu et le seuil de dommages cumulatifs. Walker documente empiriquement cette même cascade sans cadre CEM, fournissant une validation indépendante de l'ordre prédit par le modulome.",
        "Si l'épidémie de sommeil était causée uniquement par la lumière bleue des écrans, le filtrage de la lumière bleue (Night Shift, f.lux, lunettes ambrées) devrait la résoudre. Ce n'est pas le cas : [[ref:duraccio2021_blue_light_filter|Duraccio et al. (2021)]] ont montré que le mode Night Shift n'améliorait pas significativement la qualité objective du sommeil. BERM propose que la composante du champ électromagnétique (RF de l'appareil, IF de l'éclairage LED) est un perturbateur du sommeil indépendant qui opère via le mécanisme CRY/RPM, et non via la mélanopsine rétinienne. Cela explique pourquoi filtrer la lumière est insuffisant — la voie CEM contourne entièrement l'œil.",
      ],
      references: [
        { citation: "Walker MP", year: 2017, referenceId: "walker2017_why_we_sleep", finding: "Sommeil → testostérone −10–15 %, spermatozoïdes −29 %, cellules NK −70 %, syndrome métabolique, dépression (causal)" },
        { citation: "Leproult & Van Cauter (JAMA)", year: 2011, referenceId: "leproult2011_testosterone_sleep", finding: "5h de sommeil pendant 1 semaine → testostérone −10–15 % chez les jeunes hommes" },
        { citation: "Irwin MR (Annu Rev Psychol)", year: 2015, referenceId: "irwin2015_sleep_immunity", finding: "4h de sommeil 1 nuit → cellules NK −70 %. OMS 2A : travail de nuit" },
        { citation: "Spiegel, Leproult & Van Cauter (Lancet)", year: 1999, referenceId: "spiegel1999_sleep_metabolic", finding: "4h de sommeil pendant 6 nuits → tolérance au glucose pré-diabétique" },
        { citation: "Chang et al. (PNAS)", year: 2015, referenceId: "chang2015_ipad_melatonin", finding: "Lecture sur iPad : mélatonine −50 %, décalage +3h, LED 2× vs incandescent" },
        { citation: "Duraccio et al. (Sleep Health)", year: 2021, referenceId: "duraccio2021_blue_light_filter", finding: "Night Shift N'A PAS amélioré la qualité objective du sommeil" },
      ],
      epistemicNote: "Niveau épistémique : mécanisme [E] (données [[ref:walker2017_why_we_sleep|Walker]]/[[ref:leproult2011_testosterone_sleep|Leproult]]/[[ref:irwin2015_sleep_immunity|Irwin]]/[[ref:spiegel1999_sleep_metabolic|Spiegel]]). Lien CEM : [M|C] (CRY/RPM + [[ref:lindecke2026|Lindecke 2026]]).",
    },
    proxyMasking: {
      title: "Masquage par proxy : l'angle mort de la science du sommeil",
      content: "Un exemple paradigmatique : [[ref:walker2017_why_we_sleep|« Why We Sleep » de Matthew Walker (2017)]] est peut-être le livre le plus influent jamais écrit sur la science du sommeil. Walker consacre une analyse approfondie à la façon dont les écrans LED suppriment la mélatonine par la lumière bleue. Il documente que la lumière bleue LED a deux fois l'effet suppresseur de mélatonine de la lumière incandescente à intensité égale. Pourtant, il ne demande jamais si les appareils LED produisent autre chose que de la lumière — spécifiquement, si les alimentations à découpage de chaque appareil LED émettent des champs électromagnétiques de fréquence intermédiaire (20–200 kHz) qui pourraient perturber indépendamment le système circadien via le mécanisme CRY/RPM. Le champ électromagnétique n'est pas dans son vocabulaire conceptuel. Ce n'est pas une critique de Walker — c'est une démonstration de l'absence totale de l'hypothèse CEM dans la science du sommeil grand public.",
    },
    shiftWork: {
      title: "Le travail posté comme expérience naturelle",
      lead: "Les travailleurs postés subissent les trois mécanismes BERM simultanément : (1) fenêtre de récupération éliminée — le travail de nuit et le sommeil diurne dans un environnement CEM signifient que CaMKII ne se déphosphoryle jamais ; (2) exposition IF au moment critique — travail de nuit sous éclairage LED/fluorescent précisément quand la mélatonine devrait atteindre son pic ; (3) sensibilité CRY maximale — dans l'obscurité CRY est le plus sensible, et la transition vers la lumière artificielle brouille le signal CRY avec une combinaison CEM + lumière.",
      tableTitle: "Le profil de santé du travail posté correspond aux cascades BERM",
      tableHeaders: { cascade: "Cascade BERM", effect: "Effet du travail posté" },
      tableRows: [
        { cascade: "Sommeil/mélatonine", effect: "Mélatonine↓, sommeil↓", or: "—" },
        { cascade: "Dépression", effect: "Dépression↑, anxiété↑", or: "OR ~1,4" },
        { cascade: "Syndrome métabolique", effect: "MetS 2,17×", or: "OR 2,17" },
        { cascade: "T2D", effect: "Risque T2D↑", or: "HR ~1,1–1,4" },
        { cascade: "Cardiovasculaire", effect: "MCV, IM↑", or: "HR ~1,2" },
        { cascade: "Fertilité", effect: "Fausses couches↑, T↓", or: "OR ~1,3" },
        { cascade: "Cancer", effect: "Cancer du sein (CIRC 2A)", or: "OR ~1,2" },
        { cascade: "Endocrinien", effect: "Cortisol↑, thyroïde", or: "—" },
      ],
      predictionLabel: "Prédiction différenciante de BERM : ",
      predictionContent: "La privation de sommeil seule N'explique PAS tout. La composante CEM (IF LED la nuit + environnement WiFi pendant le sommeil diurne + perturbation CRY dans l'obscurité) produit un effet additionnel au-delà de la privation de sommeil. Testable : travailleur posté dormant dans une chambre blindée Faraday (nuit sans CEM) vs chambre conventionnelle — avec le même temps de sommeil. Si le groupe Faraday montre une meilleure récupération de mélatonine et moins de syndrome métabolique, la différence est la composante CEM.",
      epistemicNote: "Niveau épistémique : effets de santé du travail posté [E] (méta-analyses). Interprétation BERM (trois mécanismes simultanés) [M|C]. Intervention Faraday [C] (proposée, pas encore testée).",
    },
    seeAlso: {
      title: "Voir aussi",
      links: [
        { title: "Registre des preuves", description: "Tous les enregistrements de preuves et narratifs" },
        { title: "Couleur des yeux et magnétoréception", description: "Sensibilité CRY, pigmentation de l'iris et nutrition" },
        { title: "Modulation nutritionnelle de CRY", description: "B2, acides gras oméga et dynamiques de jeûne" },
      ],
    },
  },
  ko: {
    title: "개일 리듬 교란, 수면 및 회복",
    subtitle: "멜라토닌-생식능력 브릿지, 매개 메커니즘으로서의 수면 부족, 회복 윈도우 제거, 및 행동 억제 경로",
    backLink: "← 증거로 돌아가기",
    narrativeTitle: "주제별 증거 내러티브",
    narrativeLead: "개별 연구를 메커니즘적 논증으로 연결하는 횡단적 주제. 각 내러티브는 출판된 발견을 종합한다; 어느 것도 인구 수준의 인과 계수를 확립하지 않는다.",
    narratives: [
      {
        id: "recovery",
        title: "회복 윈도우의 제거",
        paragraphs: [
          "REFLEX 프로젝트([[ref:diem2005|Diem 등 2005]])는 간헐적 RF 노출이 동일한 SAR에서의 연속 노출보다 더 큰 유전독성 효과를 생성함을 실증하여, 노출이 없는 간격 동안 세포 수리 메커니즘이 활성화됨을 시사했다. 회복 윈도우 가설은 RF 유발 손상의 생물학적 수리(ROS 중화, DNA 수리, 단백질 재접힘)에 충분한 EMF 프리 시간이 필요하다고 제안한다.",
          "현대 도시 거주 성인은 하루 약 2시간의 거의 제로 RF 노출(연결된 침실에서의 수면)을 경험하여 잠재적 회복 시간이 약 20.6%이다. 1950년대 성인은 하루 약 20시간을 RF 프리 환경에서 보내 회복 시간이 약 90.1%였다. 수리 메커니즘이 항상성을 유지하기 위해 최소한의 무노출 비율을 필요로 한다면, 회복 시간의 4.4배 감소는 서브서멀 노출 수준에서도 누적 손상을 생성할 수 있다.",
          "최초의 5G 주파수 특이적 고환 데이터([[ref:bektas2026|Bektas 등 2026]], Bioelectromagnetics)는 다른 각도에서 회복 윈도우 개념을 지지한다: CoQ10 보충이 쥐에서 3.5 GHz RF 유발 고환 및 산화 손상을 개선했다. CoQ10 구제는 메커니즘의 가역성을 실증한다 — 산화 경로는 약리학적으로 차단 가능하며, 모델 net_daily = damage_rate × t_emf × (1 − exp(−t_free / τ_repair))과 일치한다. CoQ10은 항산화 능력을 증가시켜 효과적으로 τ_repair를 단축하고 일일 순 손상을 감소시킨다. 이것은 회복 윈도우의 약리학적 유사체이다: 노출 시간을 줄이는 대신 개입이 수리 속도를 향상시킨다.",
        ],
        studies: [
          { citation: "REFLEX / Diem et al.", year: 2005, referenceId: "diem2005", note: "간헐적 > 연속적 유전독성" },
          { citation: "Recovery window model (BERM)", year: 2026, referenceId: "berm_recovery_window_2026", note: "20.6% vs 90.1% EMF 프리 시간" },
          { citation: "Bektas et al. (Bioelectromagnetics)", year: 2026, referenceId: "bektas2026", note: "3.5 GHz → 고환 ROS 손상; CoQ10이 개선 — 메커니즘 가역성, 회복 윈도우와 일치." },
        ],
      },
      {
        id: "qbs",
        title: "사중 행동 억제",
        paragraphs: [
          "수태 확률은 P(자녀) = P(접근) × P(매력) × P(성교) × P(수정)으로 분해할 수 있다. 각 단계에 EMF 감수성 경로가 존재한다: 테스토스테론이 접근 동기를 지배하고([[ref:puts2008|Puts 2008]]), 매력은 온전한 후각-호르몬 신호 전달을 필요로 하며, 성적 빈도는 성욕과 기회에 의존하고, 수정은 정자 품질을 필요로 한다. 1.0 미만의 각 곱셈 인자가 감소를 복합한다.",
          "[[ref:goetz2024|Goetz 등 2024]](RCT)는 외인성 테스토스테론이 접근 행동을 조절함을 실증했다. [[ref:dreher2016|Dreher 등 2016]](PNAS)은 교배 맥락에서 테스토스테론 의존적 보상 평가를 보여주었다. 이중 호르몬 메타분석(2018, N = 8,538)은 테스토스테론과 코르티솔이 공동으로 지배성과 교배 노력을 예측함을 확인했다. EMF 노출이 인구 수준에서 테스토스테론을 억제한다면(연 −1%의 장기 추세가 시사하는 바와 같이), 네 단계 모두가 동시에 영향을 받는다.",
        ],
        studies: [
          { citation: "Puts 2008", year: 2008, referenceId: "puts2008", note: "테스토스테론과 접근 동기" },
          { citation: "Goetz et al. RCT", year: 2024, referenceId: "goetz2024", note: "외인성 T가 접근 행동을 조절" },
          { citation: "Dreher et al. PNAS", year: 2016, referenceId: "dreher2016", note: "T 의존적 보상 평가" },
          { citation: "Dual-hormone meta-analysis", year: 2018, referenceId: "dualhormone_meta2018", note: "T + 코르티솔이 교배 노력을 예측 (N = 8,538)" },
        ],
      },
      {
        id: "oxytocin",
        title: "이중 옥시토신 경로",
        paragraphs: [
          "두 가지 독립적인 생물학적 경로가 옥시토신 억제로 수렴한다. Porges의 다미주 경로: 만성적 교감신경 활성화(EMF 유발 자율신경 스트레스와 일치)가 복측 미주신경 복합체를 하향 조절하여 부교감신경 매개 OT 방출을 감소시킨다. 이는 쌍 결합, 성적 수용성 및 자궁 수축성에 영향을 미친다.",
          "Poutahidis/Erdman(MIT) 미생물체 경로: Lactobacillus reuteri가 미주신경을 통해 OT 분비를 자극한다. EMF 노출은 동물 모델에서 장내 미생물체 구성을 변화시키는 것으로 나타났다. L. reuteri 개체군이 만성적 RF 노출 하에서 감소하면, 미주신경 OT 신호 전달 경로가 독립적으로 억제된다. 두 경로 모두 — 자율신경성과 미생물성 — 순환 OT의 감소로 수렴하여 다른 방향에서 생식 행동과 생리학에 영향을 미친다.",
          "직접적 실험 증거: 2024년 Scientific Reports 연구는 4.9 GHz RF 노출이 마우스에서 장내 미생물체 이상을 야기함을 보여주었으며, 미생물 다양성 감소와 변경된 Bacteroidetes/Firmicutes 비율을 포함한다. 이는 RF 노출을 BERM의 경로 E가 기술하는 장-뇌 축 교란에 직접 연결한다: RF → 미생물체 교란 → L. reuteri 감소 → 미주신경 옥시토신 억제 → 생식 동기 감소.",
        ],
        studies: [
          { citation: "Porges polyvagal theory", year: 2011, referenceId: "porges2011", note: "미주신경 톤 → OT 방출 경로" },
          { citation: "Poutahidis & Erdman (MIT)", year: 2014, referenceId: "poutahidis2014", note: "L. reuteri → 미주신경 → OT" },
          { citation: "Microbiome-EMF animal studies", year: "2019–24", referenceId: "microbiome_emf_collection_2019_2024", note: "RF가 장내 세균총 구성을 변화시킴" },
          { citation: "Scientific Reports (4.9 GHz RF)", year: 2024, referenceId: "rf49_scientific_reports_2024", note: "RF → 장내 이상: 다양성 감소, Bacteroidetes/Firmicutes 비율 변경" },
        ],
      },
      {
        id: "melatonin-systematic",
        title: "멜라토닌 억제: PRISMA 체계적 검토 ([[ref:tbahriti2026|Tbahriti 2026]])",
        paragraphs: [
          "[[ref:tbahriti2026|Tbahriti 등(2026,]] Sleep Biol Rhythms 24(2):195–214)은 892편에서 스크리닝된 55개 연구의 PRISMA 2020 체계적 검토를 제시하며, EMF의 개일 리듬에 대한 영향을 검토한다. 고품질 동물 연구의 88%가 기저선에서 20–50%의 EMF 유발 멜라토닌 억제를 보고한다. 시계 유전자 발현이 변화됨. 수면 구조 변화가 문서화됨. EMF 유발 멜라토닌 억제는 광 유발(>90%)보다 작다.",
          "이는 BERM 경로 B(EMF → 송과체 멜라토닌 억제 → GnRH 박동성 장애 → HPG → 생식선 기능)를 직접 지지한다. 20–50%의 억제 규모는 생물학적으로 유의하며, EMF가 야간 삼중 타격(멜라놉신 + CRY + 멜라토닌 억제)의 한 구성 요소인 BERM의 v17_night_fraction() 함수와 일치한다. 억제 규모가 광 유발(>90%)보다 작다는 것은 BERM이 EMF를 복수의 야간 교란 경로 중 하나로 모델링하고 유일한 구동 요인으로 삼지 않는 것과 일치한다. 방법론적 주기: 검토된 연구의 27%만이 높은 방법론적 기준을 충족했다; 동물 연구의 48%가 적절한 거짓 대조를 결여했다. 세포 효과에서 전신성 개일 교란으로의 전환은 임상적으로 완전히 확립되지 않았다.",
          "BERM 해석: WHO와 ICNIRP의 증거 분류는 BERM이 식별하는 것과 동일한 체계적 편향의 대상이다: 대리 노출 측정에서의 감쇠 편향, 대조군 오염(실험실 기저선 편향), 자금 제공자 편향([[ref:huss2007|Huss 2007]]: 산업 자금 연구가 유해 효과를 발견할 가능성이 낮음). 이러한 편향이 실재한다면, 표준 프레임워크에서의 '중간 확실성'은 편향 교정 프레임워크에서의 더 높은 확실성에 대응할 수 있다. BERM은 제도적 증거 계층을 CONTEXT_ONLY로 취급한다 — 이들이 BERM 자체의 인식론 외부에 있기 때문이지, 기저 증거가 약하기 때문이 아니다.",
        ],
        studies: [
          { citation: "Tbahriti et al. (Sleep Biol Rhythms)", year: 2026, referenceId: "tbahriti2026", note: "PRISMA 55개 연구: 고품질 동물 연구의 88%가 멜라토닌 억제 20–50% 보고. 27%만이 높은 기준을 충족." },
          { citation: "Huss et al. (Environ Health Perspect)", year: 2007, referenceId: "huss2007", note: "산업 자금 EMF 연구가 유해 효과를 보고할 가능성이 낮음. 체계적 자금 제공자 편향." },
        ],
      },
      {
        id: "sousouri-neuroimaging",
        title: "인간 자기수용 신경영상 ([[ref:sousouri2025|Sousouri 2025]])",
        paragraphs: [
          "[[ref:sousouri2025|Sousouri 등(2025,]] NeuroImage)은 정적 자기장 변화가 인간에서 측정 가능한 신경 반응을 생성한다는 최초의 fMRI 증거를 제공한다. 통제된 지자기장 조작에 노출된 피험자들은 알려진 감각 자극이 생성하는 것과 동일한 신경 서명인 재현 가능한 알파파(8–13 Hz) 비동기화를 보였다. 효과는 기저선 알파 파워가 높은 개인에서 가장 강했으며, 우반구 처리와 일치하는 측면화를 보였다.",
          "이 연구는 BERM 경로 B의 래디컬 쌍 메커니즘을 직접 지지한다: 인간 뉴런이 지구 강도 수준(~50 μT)의 정적 자기장 변화에 감지 가능하게 반응한다면, CRY/RPM 전달 경로는 인간에서 신경학적으로 활성임이 실증적으로 확인된다 — 철새에서만이 아니다. 알파 비동기화 패턴은 자기장 감지가 CRY1이 청색 원뿔 외절에 국재화된 망막 수준([[ref:bartolke2025|Bartölke 2025]])에서뿐만 아니라 피질 수준에서 발생함을 시사한다.",
          "BERM 해석: 지구 강도의 정적 자기장이 측정 가능한 신경 반응을 생성한다면, 시간 변동하는 인위적 자기장(래디컬 쌍 역학을 구동하는 데 정적 자기장보다 크기 차수로 더 효과적)은 더 강한 만성 신경 교란을 생성할 것으로 예상된다. [[ref:sousouri2025|Sousouri 2025]] 결과는 동물 자기수용 연구와 인간 관련성 사이의 격차를 메운다 — 감각 장치가 존재하고 신경학적으로 활성이다.",
        ],
        studies: [
          { citation: "Sousouri et al. (NeuroImage)", year: 2025, referenceId: "sousouri2025", note: "fMRI: 지자기장 조작 → 인간에서 알파 비동기화. 인간 자기수용의 최초 신경영상 확인." },
          { citation: "Bartölke et al. (FASEB J)", year: 2025, referenceId: "bartolke2025", note: "인간 청색 원뿔 외절의 CRY1 — 감각 자기수용체 국재화." },
          { citation: "Wang et al. (eNeuro)", year: 2019, referenceId: "wang2019_eneuro", note: "이전 EEG 증거: 차폐실에서 자기장 회전 후 알파 ERD." },
        ],
      },
    ],
    tableHeaders: { citation: "인용", year: "연도", note: "비고", finding: "발견" },
    melatoninBridge: {
      title: "멜라토닌 브릿지: 캐스케이드 1 → 캐스케이드 6",
      paragraphs: [
        "BERM의 6개 캐스케이드는 병렬이 아니다 -- 직렬이다. 멜라토닌은 캐스케이드 1(수면/일주기)과 캐스케이드 6(생식능력) 사이의 핵심 다리이다. EMF → 송과체 → 멜라토닌 억제 → HPG 축 교란 + 난포 항산화 방어 감소 → 생식능력 감소. 이 경로는 EMF의 직접적 생식선 효과(VGCC → 정자)와 별개이며, 완전한 효과를 내려면 둘 다 동시에 활성화되어야 한다.",
        "송과체는 전자기장을 빛으로 '본다'. [[ref:battelle1980_emf_melatonin|Battelle의 연구(1980)]]는 실험 동물에서 EMF가 야간 멜라토닌 피크를 억제함을 실증했다. 메커니즘: 송과체 막의 마그네타이트(Fe₃O₄) 및/또는 크립토크롬(CRY1/CRY2) 라디칼 쌍 메커니즘이 자기장을 감지하고, NAT 활성(세로토닌 → 멜라토닌 전환)이 둔화되며, 야간 멜라토닌 피크 진폭이 감소하고 타이밍이 지연된다. 인간 연구는 불일치한다: 일부는 억제를 보이고 일부는 아니다 -- 그러나 동물 데이터는 일관되며 메커니즘은 생물학적으로 타당하다.",
        "난포액의 멜라토닌은 난모세포의 핵심 보호자이다. [[ref:tamura2012_follicular_melatonin|Tamura 등(2012)]]은 난포액 멜라토닌 농도가 난모세포 품질과 직접 상관됨을 보였다. 멜라토닌은 활성산소종(ROS)을 중화하고, 미토콘드리아 DNA를 보호하며, 난모세포에서 Gdf9 및 Bmp15 유전자 발현을 조절한다. IVF 메타분석([[ref:tong2017_melatonin_ivf|Tong 2017]], [[ref:pmc12500685|PMC12500685]], [[ref:pmc11265587|PMC11265587]])은 일관되게 보여준다: 멜라토닌 보충이 수정률, 배아 품질, 임상 임신율을 개선한다. 그러나 메타분석 표본 크기가 작고, 맹검이 어려우며, 출판 편향이 가능하다.",
        "남성 생식능력에서 멜라토닌은 라이디히 세포를 산화 스트레스로부터 보호하고(테스토스테론 생산), HPG 축(GnRH → LH/FSH)을 조절하며, 정자 미토콘드리아 기능을 유지한다. [[ref:nishihara2014_melatonin_sperm|Nishihara 등(2014)]]은 멜라토닌이 in vitro에서 정자 운동성을 개선함을 보였다. 주의: 멜라토닌의 HPG 효과는 단방향이 아니다 -- 고농도에서 멜라토닌은 일부 상황에서 GnRH를 억제할 수 있다. 멜라토닌 보충은 생식 연령에서 위험이 없지 않다.",
        "교대근무는 멜라토닌 브릿지의 가장 강력한 자연 실험이다: 일주기 리듬 교란, 직장 조명, 그리고 가능한 직업적 EMF를 통해 동시에 멜라토닌을 억제한다. 교대근무자는 낮은 생식능력, 더 많은 임신 합병증, 더 불규칙한 월경 주기가 기록되어 있다. 그러나 교대근무의 생식능력 효과는 다인자적이다 -- 스트레스, 식습관, 사회적 고립 및 기타 요인이 기여한다. 멜라토닌은 하나의 요인이지 유일한 것은 아니다.",
      ],
      pathwaysTitle: "다섯 가지 멜라토닌-생식능력 경로",
      pathwayHeaders: { pathway: "경로", mechanism: "메커니즘" },
      pathways: [
        { name: "HPG", mechanism: "멜라토닌 → 시상하부 → GnRH → LH/FSH → 생식선" },
        { name: "항산화", mechanism: "난포액 멜라토닌 → ROS 중화 → 난모세포 보호" },
        { name: "항염증", mechanism: "멜라토닌 → NF-κB ↓ → 만성 염증 ↓ → 자궁내막증/PCOS ↓" },
        { name: "미토콘드리아", mechanism: "멜라토닌 → AMPK/SIRT1 ↑ → 생식 세포 에너지 ↑" },
        { name: "후성유전", mechanism: "멜라토닌이 난모세포의 Gdf9 및 Bmp15 유전자 발현을 조절" },
      ],
      referencesTitle: "참고문헌",
      references: [
        { citation: "Battelle / Wilson et al.", year: 1980, referenceId: "battelle1980_emf_melatonin", finding: "EMF가 실험 동물의 야간 멜라토닌을 억제(60 Hz, ELF)" },
        { citation: "Tamura et al.", year: 2012, referenceId: "tamura2012_follicular_melatonin", finding: "난포액 멜라토닌이 난모세포 품질과 상관; 난모세포에서 항산화 역할" },
        { citation: "Tong et al.", year: 2017, referenceId: "tong2017_melatonin_ivf", finding: "메타분석: 멜라토닌 보충이 IVF 결과를 개선(수정, 배아 품질, 임신)" },
        { citation: "PMC12500685", year: 2025, referenceId: "pmc12500685", finding: "체계적 리뷰: 멜라토닌이 IVF에서 난모세포 및 배아 품질을 개선" },
        { citation: "PMC11265587", year: 2024, referenceId: "pmc11265587", finding: "메타분석: 멜라토닌이 IVF에서 임상 임신율을 개선" },
        { citation: "PMC10354453", year: 2023, referenceId: "pmc10354453", finding: "리뷰: 여성 생식능력에 대한 멜라토닌의 5경로(HPG, 항산화, 항염증, 미토콘드리아, 후성유전)" },
        { citation: "Reiter et al.", year: 2007, referenceId: "reiter2007_melatonin_male", finding: "멜라토닌이 정자를 산화 손상으로부터 보호; HPG 축을 조절" },
        { citation: "Unfer et al.", year: 2011, referenceId: "unfer2011_melatonin_ivf", finding: "IVF에서 멜라토닌: 난모세포 품질 개선, 그러나 작은 표본 및 맹검 과제" },
        { citation: "Nishihara et al.", year: 2014, referenceId: "nishihara2014_melatonin_sperm", finding: "멜라토닌이 in vitro에서 정자 운동성을 개선" },
        { citation: "Rad. Prot. Dosimetry", year: 2013, referenceId: "rad_prot_dosimetry2013_emf_melatonin", finding: "RF-EMF와 멜라토닌 억제: 역학 리뷰(인간에서 불일치 결과)" },
      ],
      epistemicNote: "인식론적 수준: 난포액 멜라토닌 → 난모세포 품질 [E]([[ref:tamura2012_follicular_melatonin|Tamura 2012]], 재현). IVF에서 멜라토닌 보충 [E](메타분석, 그러나 작은 표본). EMF → 멜라토닌 억제 [M|C](강한 동물 데이터, 불일치한 인간 데이터). 멜라토닌-생식능력 브릿지 전체 [C](이론적 통합). IVF 메타분석은 소규모 -- 출판 편향 가능. 멜라토닌 HPG 효과는 양방향. 교대근무 생식능력 결핍은 다인자적 -- 멜라토닌은 하나의 경로.",
    },
    sleep: {
      title: "중심 매개 메커니즘으로서의 수면 부족",
      paragraphs: [
        "수면 부족은 BERM의 6가지 역예측이 기술하는 모든 생물학적 결과를 생산한다: 테스토스테론 감소(Leproult & Van Cauter: 젊은 남성에서 -10-15%), 정자 감소(-29%, 기형 증가), NK 세포 붕괴(Irwin: 하룻밤에 -70%), 대사증후군(Spiegel 등: 1주 만에 당뇨 전단계), 교감신경 과활성화(만성 염증), 우울증(Walker: '증상이 아닌 원인'). EMF가 수면을 교란한다면 -- 일주기 경로(CRY/RPM, 멜라토닌 억제)가 예측하듯이 -- 모든 6가지 역예측이 단일 상류 원인의 하류 결과로 따라온다.",
        "이러한 상태가 나타나는 순서는 모듈로옴의 예측과 일치한다: 수면 장애가 첫 번째(최단 잠복기, 수개월), 우울증이 두 번째(1-3년), 대사증후군이 세 번째(3-8년), 자가면역 질환이 네 번째(5-10년), 생식능력 감소가 다섯 번째(5-15년), 암이 여섯 번째(10-25년). 이 순서는 자의적이지 않다 -- 각 조직의 재생 속도와 누적 손상 역치를 반영한다. Walker는 EMF 프레임워크 없이 이 동일한 캐스케이드를 경험적으로 문서화하여 모듈로옴이 예측한 순서의 독립적 검증을 제공했다.",
        "수면 유행이 화면의 블루라이트만으로 유발된다면, 블루라이트 필터링(Night Shift, f.lux, 앰버 안경)이 해결해야 한다. 그렇지 않다: [[ref:duraccio2021_blue_light_filter|Duraccio 등(2021)]]은 Night Shift 모드가 객관적 수면 품질을 유의하게 개선하지 않았음을 보였다. BERM은 전자기장 성분(장치의 RF, LED 조명의 IF)이 CRY/RPM 메커니즘을 통해 작동하는 독립적 수면 방해 요인이며, 망막 멜라노프신을 통하지 않는다고 제안한다. 이것은 빛 필터링이 왜 불충분한지를 설명한다 -- EMF 경로는 눈을 완전히 우회한다.",
      ],
      references: [
        { citation: "Walker MP", year: 2017, referenceId: "walker2017_why_we_sleep", finding: "수면 → 테스토스테론 -10-15%, 정자 -29%, NK 세포 -70%, 대사증후군, 우울증(인과적)" },
        { citation: "Leproult & Van Cauter (JAMA)", year: 2011, referenceId: "leproult2011_testosterone_sleep", finding: "5시간 수면 1주일 → 젊은 남성에서 테스토스테론 -10-15%" },
        { citation: "Irwin MR (Annu Rev Psychol)", year: 2015, referenceId: "irwin2015_sleep_immunity", finding: "4시간 수면 1밤 → NK 세포 -70%. WHO 2A: 야간근무" },
        { citation: "Spiegel, Leproult & Van Cauter (Lancet)", year: 1999, referenceId: "spiegel1999_sleep_metabolic", finding: "4시간 수면 6밤 → 당뇨 전단계 내당능" },
        { citation: "Chang et al. (PNAS)", year: 2015, referenceId: "chang2015_ipad_melatonin", finding: "iPad 읽기: 멜라토닌 -50%, 지연 +3h, LED 2× vs 백열등" },
        { citation: "Duraccio et al. (Sleep Health)", year: 2021, referenceId: "duraccio2021_blue_light_filter", finding: "Night Shift는 객관적 수면 품질을 개선하지 않았다" },
      ],
      epistemicNote: "인식론적 수준: 메커니즘 [E]([[ref:walker2017_why_we_sleep|Walker]]/[[ref:leproult2011_testosterone_sleep|Leproult]]/[[ref:irwin2015_sleep_immunity|Irwin]]/[[ref:spiegel1999_sleep_metabolic|Spiegel]] 데이터). EMF 연결: [M|C](CRY/RPM + [[ref:lindecke2026|Lindecke 2026]]).",
    },
    proxyMasking: {
      title: "프록시 마스킹: 수면 과학의 사각지대",
      content: "전형적인 예: [[ref:walker2017_why_we_sleep|Matthew Walker의 'Why We Sleep'(2017)]]는 아마도 역대 가장 영향력 있는 수면 과학 책이다. Walker는 LED 화면이 블루라이트를 통해 멜라토닌을 억제하는 방법을 광범위하게 분석한다. LED 블루라이트가 동일 강도에서 백열등의 2배 멜라토닌 억제 효과를 갖는다고 문서화한다. 그러나 그는 LED 장치가 빛 이외의 무언가를 생산하는지 -- 구체적으로, 모든 LED 장치의 스위치 모드 전원 공급 장치가 CRY/RPM 메커니즘을 통해 일주기 시스템을 독립적으로 교란할 수 있는 중간 주파수 전자기장(20-200 kHz)을 방출하는지를 결코 묻지 않는다. 전자기장은 그의 개념적 어휘에 없다. 이것은 Walker에 대한 비판이 아니다 -- EMF 가설이 주류 수면 과학에서 얼마나 완전히 부재한지에 대한 시연이다.",
    },
    shiftWork: {
      title: "자연 실험으로서의 교대근무",
      lead: "교대근무자는 세 가지 BERM 메커니즘을 모두 동시에 경험한다: (1) 회복 윈도우 제거 -- EMF 환경에서의 야간 근무와 주간 수면은 CaMKII가 탈인산화되지 않음을 의미; (2) 중요한 순간의 IF 노출 -- 멜라토닌이 피크에 도달해야 할 정확한 시점에 LED/형광등 아래 야간 근무; (3) CRY 감도 최대화 -- 어둠에서 CRY가 가장 민감하며, 인공 조명으로의 전환이 EMF + 빛 조합으로 CRY 신호를 교란.",
      tableTitle: "교대근무 건강 프로필과 BERM 캐스케이드의 대응",
      tableHeaders: { cascade: "BERM 캐스케이드", effect: "교대근무 효과" },
      tableRows: [
        { cascade: "수면/멜라토닌", effect: "멜라토닌↓, 수면↓", or: "—" },
        { cascade: "우울증", effect: "우울증↑, 불안↑", or: "OR ~1.4" },
        { cascade: "대사증후군", effect: "MetS 2.17×", or: "OR 2.17" },
        { cascade: "T2D", effect: "T2D 위험↑", or: "HR ~1.1–1.4" },
        { cascade: "심혈관", effect: "CVD, MI↑", or: "HR ~1.2" },
        { cascade: "생식능력", effect: "유산↑, T↓", or: "OR ~1.3" },
        { cascade: "암", effect: "유방암(IARC 2A)", or: "OR ~1.2" },
        { cascade: "내분비", effect: "코르티솔↑, 갑상선", or: "—" },
      ],
      predictionLabel: "BERM의 차별화 예측: ",
      predictionContent: "수면 부족만으로는 모든 것을 설명하지 못한다. EMF 성분(야간 LED IF + 주간 수면 시 WiFi 환경 + 어둠에서의 CRY 교란)은 수면 부족을 넘어서는 추가 효과를 생산한다. 검증 가능: 패러데이 차폐 침실(EMF 없는 밤)에서 잠자는 교대근무자 vs 일반 침실 -- 같은 수면 시간. 패러데이 그룹이 더 나은 멜라토닌 회복과 더 적은 대사증후군을 보이면 그 차이가 EMF 성분이다.",
      epistemicNote: "인식론적 수준: 교대근무 건강 효과 [E](메타분석). BERM 해석(세 가지 동시 메커니즘) [M|C]. 패러데이 개입 [C](제안, 아직 미검증).",
    },
    seeAlso: {
      title: "관련 항목",
      links: [
        { title: "증거 레지스터", description: "모든 증거 기록과 내러티브" },
        { title: "눈 색깔과 자기수용", description: "CRY 감도, 홍채 색소침착, 영양" },
        { title: "영양적 CRY 조절", description: "B2, 오메가 지방산, 단식 역학" },
      ],
    },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function CircadianPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href={`/${locale}/evidence`} className="text-sm text-accent hover:underline mb-6 inline-block">
        {d.backLink}
      </Link>

      <PageHeader icon={Moon} title={d.title} subtitle={d.subtitle} lensIcon={<BermIcon name="neurobiology" size={28} className="text-accent" />} />

      {/* Thematic evidence narratives */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.narrativeTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-8 max-w-4xl">{d.narrativeLead}</p>

        <div className="space-y-12 max-w-4xl">
          {d.narratives.map((narrative, ni) => (
            <article key={narrative.id} id={`narrative-${narrative.id}`} className="scroll-mt-24">
              {narrative.id === "qbs" && <span id="qbs" />}
              {narrative.id === "oxytocin" && <><span id="pathway-E" /><span id="gut" /><span id="vagal-tone" /></>}
              <h3 className="text-lg font-semibold mb-4">
                <span className="font-mono-num text-xs text-accent mr-2">0{ni + 1}</span>
                <InlineReferenceText text={narrative.title} locale={locale} />
              </h3>
              {narrative.paragraphs.length > 0 && (
                <p className="editorial-rail mb-4 text-[0.95rem] leading-relaxed text-foreground">
                  <InlineReferenceText text={narrative.paragraphs[0]} locale={locale} />
                </p>
              )}
              <div className="space-y-3 text-sm text-foreground-muted leading-relaxed mb-5">
                {narrative.paragraphs.slice(1).map((p, pi) => (
                  <p key={pi}><InlineReferenceText text={p} locale={locale} /></p>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                      <th className="py-2 pr-3">{d.tableHeaders.citation}</th>
                      <th className="py-2 pr-3 w-16">{d.tableHeaders.year}</th>
                      <th className="py-2">{d.tableHeaders.note}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {narrative.studies.map((s) => (
                      <tr key={`${s.citation}-${s.year}`} className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-medium text-foreground"><CitationLink referenceId={s.referenceId} locale={locale} citation={s.citation} year={s.year} /></td>
                        <td className="py-2 pr-3 font-mono-num text-foreground-muted">{s.year}</td>
                        <td className="py-2 text-foreground-muted">{s.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {narrative.id === "qbs" && (
                <div className="mt-8">
                  <BehavioralSuppression locale={locale} />
                </div>
              )}

            </article>
          ))}
        </div>
      </section>

      {/* Melatonin-fertility bridge: cascade 1 → cascade 6 */}
      <section id="melatonin-bridge" className="mb-16 border-t editorial-rule pt-6">
        <span id="melatonin" /><span id="ovarian" /><span id="fertility" />
        <h2 className="editorial-section-heading mb-3">{d.melatoninBridge.title}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground"><ClaimRef claimId="claim.melatonin.circadian-redox-mediator"><InlineReferenceText text={d.melatoninBridge.paragraphs[0]} locale={locale} /></ClaimRef></p>
          {d.melatoninBridge.paragraphs.slice(1).map((p, i) => <p key={i}><InlineReferenceText text={p} locale={locale} /></p>)}
        </div>

        <div className="mt-6 overflow-x-auto">
          <h3 className="text-xs uppercase tracking-[0.16em] text-foreground-muted/60 mb-2">{d.melatoninBridge.pathwaysTitle}</h3>
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.melatoninBridge.pathwayHeaders.pathway}</th>
                <th className="py-2">{d.melatoninBridge.pathwayHeaders.mechanism}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              {d.melatoninBridge.pathways.map((pw) => (
                <tr key={pw.name} className="border-b border-card-border/40">
                  <td className="py-2 pr-3 font-medium text-foreground">{pw.name}</td>
                  <td className="py-2">{pw.mechanism}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 overflow-x-auto">
          <h3 className="text-xs uppercase tracking-[0.16em] text-foreground-muted/60 mb-2">{d.melatoninBridge.referencesTitle}</h3>
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.tableHeaders.citation}</th>
                <th className="py-2 pr-3 w-16">{d.tableHeaders.year}</th>
                <th className="py-2">{d.tableHeaders.finding}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              {d.melatoninBridge.references.map((ref) => (
                <tr key={`${ref.citation}-${ref.year}`} className="border-b border-card-border/40">
                  <td className="py-2 pr-3 font-medium text-foreground">
                    <CitationLink citation={ref.citation} year={ref.year} referenceId={ref.referenceId} locale={locale} />
                  </td>
                  <td className="py-2 pr-3 font-mono-num">{ref.year}</td>
                  <td className="py-2">{ref.finding}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl"><InlineReferenceText text={d.melatoninBridge.epistemicNote} locale={locale} /></p>
      </section>

      {/* Sleep as mediating mechanism */}
      <section id="sleep" className="mb-16 border-t editorial-rule pt-6">
        <span id="testosterone" /><span id="nk-cells" /><span id="cortisol" />
        <h2 className="editorial-section-heading mb-3">{d.sleep.title}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground"><InlineReferenceText text={d.sleep.paragraphs[0]} locale={locale} /></p>
          {d.sleep.paragraphs.slice(1).map((p, i) => <p key={i}><InlineReferenceText text={p} locale={locale} /></p>)}
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{d.tableHeaders.citation}</th>
                <th className="py-2 pr-3 w-16">{d.tableHeaders.year}</th>
                <th className="py-2">{d.tableHeaders.finding}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              {d.sleep.references.map((ref) => (
                <tr key={`${ref.citation}-${ref.year}`} className="border-b border-card-border/40">
                  <td className="py-2 pr-3 font-medium text-foreground">
                    <CitationLink citation={ref.citation} year={ref.year} referenceId={ref.referenceId} locale={locale} />
                  </td>
                  <td className="py-2 pr-3 font-mono-num">{ref.year}</td>
                  <td className="py-2">{ref.finding}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl"><InlineReferenceText text={d.sleep.epistemicNote} locale={locale} /></p>
      </section>

      {/* Proxy masking: Walker example */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.proxyMasking.title}</h2>
        <div className="max-w-4xl rounded-lg border border-card-border bg-card-bg p-5">
          <p className="text-sm text-foreground-muted leading-relaxed"><InlineReferenceText text={d.proxyMasking.content} locale={locale} /></p>
        </div>
      </section>

      {/* Shift work as natural experiment */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.shiftWork.title}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-4xl">{d.shiftWork.lead}</p>
        <div className="max-w-4xl rounded-lg border border-card-border bg-card-bg p-5 mb-4">
          <h3 className="font-semibold text-sm mb-3">{d.shiftWork.tableTitle}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 font-semibold">{d.shiftWork.tableHeaders.cascade}</th>
                  <th className="text-left py-2 px-2 font-semibold">{d.shiftWork.tableHeaders.effect}</th>
                  <th className="text-left py-2 px-2 font-semibold">OR/HR</th>
                </tr>
              </thead>
              <tbody className="text-foreground-muted">
                {d.shiftWork.tableRows.map((row) => (
                  <tr key={row.cascade} className="border-b border-border/50">
                    <td className="py-1.5 px-2 font-medium">{row.cascade}</td>
                    <td className="py-1.5 px-2">{row.effect}</td>
                    <td className="py-1.5 px-2 font-mono-num">{row.or}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="max-w-4xl rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 mb-4">
          <p className="text-sm text-foreground-muted leading-relaxed">
            <span className="font-semibold">{d.shiftWork.predictionLabel}</span>
            {d.shiftWork.predictionContent}
          </p>
        </div>
        <p className="text-xs text-foreground-muted/70 max-w-4xl">{d.shiftWork.epistemicNote}</p>
      </section>

      {/* See also navigation */}
      <section className="border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-4">{d.seeAlso.title}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href={`/${locale}/evidence`}
            className="rounded-lg border border-card-border bg-card-bg p-4 hover:border-accent transition-colors"
          >
            <h3 className="font-semibold text-sm">{d.seeAlso.links[0].title}</h3>
            <p className="text-xs text-foreground-muted mt-1">{d.seeAlso.links[0].description}</p>
          </Link>
          <Link
            href={`/${locale}/evidence/eyes`}
            className="rounded-lg border border-card-border bg-card-bg p-4 hover:border-accent transition-colors"
          >
            <h3 className="font-semibold text-sm">{d.seeAlso.links[1].title}</h3>
            <p className="text-xs text-foreground-muted mt-1">{d.seeAlso.links[1].description}</p>
          </Link>
          <Link
            href={`/${locale}/evidence/nutrition`}
            className="rounded-lg border border-card-border bg-card-bg p-4 hover:border-accent transition-colors"
          >
            <h3 className="font-semibold text-sm">{d.seeAlso.links[2].title}</h3>
            <p className="text-xs text-foreground-muted mt-1">{d.seeAlso.links[2].description}</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
