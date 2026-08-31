import type { Metadata } from "next";
import Link from "next/link";
import { Target, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { NextPageLink } from "@/components/NextPageLink";
import { LOCKED_PREDICTIONS, metricLabel, countryLabel } from "@/lib/predictions";
import { PredictionStatusBadge } from "@/components/PredictionStatusBadge";
import { PredictionTrack } from "@/components/PredictionTrack";
import { FeedbackLoop } from "@/components/FeedbackLoop";
import { EVOLUTION_PREDICTIONS } from "@/lib/evolutionData";
import { CHAIN_EPISTEMIC_COLORS } from "@/lib/epistemicConstants";
import type { EpistemicLevel } from "@/lib/types";
import { pickCopy } from "@/lib/i18n";
import { InlineReferenceText } from "@/components/InlineReferenceText";

const COPY = {
  en: {
    title: "Locked predictions",
    subtitle: "These predictions were locked under the BERM v17 scalar-exposure architecture. They are falsifiable: each will be compared against observed data at the stated year.",
    tfrTitle: "TFR predictions",
    tfrLead: "Country and global total-fertility-rate predictions with one-at-a-time parameter sensitivity envelopes (not confidence intervals).",
    bioTitle: "Biomarker predictions",
    bioLead: "Sperm concentration and sex-ratio predictions derived from the same model architecture.",
    v2Title: "BERM v17 forecast status",
    v2Status: "No country-level FieldState-calibrated forecasts are published. The current route requires matched local FieldState, registered organ and couple endpoints, ASFR modelling and external temporal validation before a forecast can be locked.",
    v2Note: "When FieldState-calibrated predictions are ready, they will be published alongside these scalar-proxy predictions for comparison.",
    histTitle: "Historical / evolutionary predictions",
    histLead: "Predictions derived from the nested χ model and the Northern Package hypothesis. These test whether population-specific biological χ profiles modulate the EMF-fertility relationship.",
    r43Title: "R43: Protocol-envelope resonance",
    r43Text: "[[ref:zandieh2025|Zandieh et al. (2025)]] reports frequency-dependent mitochondrial/ROS observations in ELF cancer-cell experiments (0.01–5 Hz; up to 100 mT). This supports an exploratory measured-PSD protocol for testing whether network-layer envelope modulation produces a cellular response. It does not establish RF network-envelope effects, eDRX causality or a reproductive/TFR parameter.",
    country: "Country",
    year: "Year",
    metric: "Metric",
    prediction: "Prediction",
    sensitivity: "Sensitivity",
    version: "Version",
    locked: "Locked",
    statusLabel: "Status",
    history: "Version history",
    sentinelTitle: "Sentinel cascade predictions",
    sentinelLead: "Cross-species lag predictions derived from the CSLI 31-country bee–TFR panel. These test whether sentinel species decline precedes human fertility decline at a locked lag.",
    architectureNote: "Architecture note",
    architectureText: "These predictions use the scalar cumulative-exposure architecture (v17). Mobile penetration enters as a technology-adoption timing proxy. The sensitivity envelope varies one parameter at a time; it is not a probabilistic confidence interval.",
    ciExceededTitle: "Three-branch falsification analysis",
    finlandFalsification: "Status: CI EXCEEDED (observed ~1.30, upper bound 1.24). Three possible explanations within BERM’s framework: (a) Model overestimates biological effect in Finland — the exponential EMF-TFR relationship may saturate earlier than modeled. (b) Exogenous compensation: immigration TFR contribution larger than estimated — Finland’s immigrant TFR (~1.8–2.2) may lift national TFR above the native-population prediction. (c) CI too narrow: the model’s uncertainty bands underestimate stochastic variation in small-population TFR. Discriminating test: compare native-born TFR (if available from Statistics Finland) against the prediction. If native TFR ≤ 1.24, explanation (b) is confirmed and the model is not falsified.",
    southKoreaFalsification: "Status: CI RISK ZONE (observed ~0.80, upper bound 0.72). Three possible explanations: (a) Model overestimates EMF suppression in Korea — cultural/policy factors may have independent negative effects on TFR that partially offset EMF. (b) Measurement lag: Korea’s pronatalist policies (cash transfers, housing subsidies) may have temporarily elevated TFR above the biological trajectory. (c) The model’s recovery estimate for Korea may be too optimistic. Discriminating test: track whether Korea’s TFR continues declining toward the predicted value or stabilizes at current levels.",
    modulomeTitle: "Modulome predictions",
    modulomeLead: "Mechanistic predictions derived from the eight-layer EMF modulome and therapeutic device evidence. These are qualitative, falsifiable predictions — each specifies a concrete experimental outcome.",
    modulomePredictions: [
      {
        id: "M-1",
        title: "Faraday-shielded IVF laboratory",
        description: "An IVF laboratory with Faraday-cage EMF shielding will show significantly higher fertilization, blastocyst, and pregnancy rates compared to standard laboratories.",
        timeline: "Testable within 1–2 years",
        falsification: "No difference in any IVF outcome metric",
      },
      {
        id: "M-2",
        title: "Earbud users: lower vagal tone",
        description: "Long-term earbud users (>4h/day for >2 years) will show significantly lower heart rate variability (HRV) compared to matched non-users, indicating reduced vagal tone.",
        timeline: "Testable immediately (wearable HRV data)",
        falsification: "No HRV difference or higher HRV in earbud users",
      },
      {
        id: "M-3",
        title: "LED vs incandescent: sperm quality in rats",
        description: "Male rats raised under LED lighting will show significantly lower sperm motility and concentration compared to rats raised under incandescent lighting, in a four-arm design separating light spectrum from EMF emission.",
        timeline: "Testable in 3–6 months",
        falsification: "No difference, or EMF-shielded LED = unshielded LED",
      },
      {
        id: "LED-1",
        title: "EU LED ban and TFR acceleration",
        description: "EU countries (mandatory LED transition 2009–2012 via [[ref:eu_regulation_244_2009|Directive 244/2009]]) show faster TFR decline in 2015–2022 compared to countries with later or no incandescent ban, controlling for mobile density, GDP, and urbanization. Central estimate: TFR decline acceleration ≥0.02/year faster in EU vs non-EU controls.",
        timeline: "Testable immediately (existing demographic data)",
        falsification: "No acceleration difference, or non-EU countries show faster decline",
      },
      {
        id: "SLEEP-1",
        title: "Faraday-shielded LED sleep test",
        description: "A Faraday-shielded bedroom (< 0.001 V/m IF) with identical LED lighting produces better sleep quality than an unshielded bedroom, even when blue light spectrum is identical. This isolates the IF emission channel from the optical channel. If true: IF emissions (not blue light) are the primary sleep disruptor from LED lighting. If false: blue light or other factors dominate. Cost estimate: < EUR 5,000.",
        timeline: "Testable within 1–3 months (N=20 crossover)",
        falsification: "No sleep quality difference between shielded and unshielded conditions with identical light spectrum",
      },
      {
        id: "M-5",
        title: "LLLT improves spermatogenesis via CCO activation",
        description: "Low-level laser therapy (620–1100 nm) applied to testes in a controlled animal study will improve spermatogenesis markers (motility, concentration, morphology) via mitochondrial cytochrome c oxidase activation — the same chromophore mechanism as FDA-approved photobiomodulation devices. If LLLT (optical EM) improves fertility via CCO, and RF (lower EM) disrupts fertility via CRY, the chromophore generalization predicts that both optical and RF frequencies modulate reproductive biology through frequency-specific chromophore targets.",
        timeline: "Testable in 3–6 months (animal study)",
        falsification: "No improvement in any spermatogenesis marker, or improvement is thermal in nature",
      },
      {
        id: "NEURO-1",
        title: "CACNA1C carriers show stronger EMF-ASD association",
        description: "In a genotyped birth cohort with documented prenatal EMF exposure: stratify ASD/ADHD diagnosis rates by CACNA1C rs1006737 genotype AND maternal EMF exposure level. Prediction: significant GxE interaction where risk allele + high EMF produces synergistic elevation in ASD/ADHD rates beyond additive effects.",
        timeline: "Requires large genotyped cohort (thousands)",
        falsification: "No GxE interaction at CACNA1C locus",
      },
      {
        id: "NEURO-2",
        title: "Lithium attenuates EMF-induced neuronal oscillation disruption",
        description: "Expose hiPSC-derived neuronal cultures to EMF and measure network oscillation patterns (MEA). Then add lithium. Prediction: lithium restores oscillation regularity because it dampens Ca²⁺ oscillations via IMPA1/inositol pathway — the same mechanism that makes it effective in bipolar disorder.",
        timeline: "Testable in 3–6 months (in vitro)",
        falsification: "Lithium does not restore oscillation regularity after EMF exposure",
      },
      {
        id: "EPI-1",
        title: "EMF-exposed fathers: offspring sperm methylation changes",
        description: "Expose male mice to chronic RF-EMF. Mate with unexposed females. Analyze F1 male offspring sperm for DNA methylation patterns. Prediction: specific DMRs overlap with those in human radar study ([[ref:res-square-2025-radar-methylation|Research Square 2025]]). If DMRs include CACNA1C or other VGCC genes, this closes the epigenetic feedback loop.",
        timeline: "Testable in 6–12 months (animal study)",
        falsification: "No DMR overlap with radar study, or no VGCC-gene DMRs in F1",
      },
      {
        id: "EPI-2",
        title: "Non-monotonic methylation response to EMF",
        description: "Replicate the GC-2 study across a wider intensity range (0.1, 0.5, 1, 2, 3, 5 mT). Prediction: methylation changes show non-monotonic dose-response with at least one sign reversal, paralleling Blackman’s Ca²⁺ window. If confirmed, Lindgren’s window dynamics operate at the epigenetic level.",
        timeline: "Testable in 3–6 months (in vitro)",
        falsification: "Monotonic dose-response with no sign reversal",
      },
      {
        id: "SCHWAN-1",
        title: "GSM produces larger sperm effects than LTE at equivalent SAR",
        description: "Expose matched sperm samples to: (1) GSM-modulated 900 MHz (217 Hz TDMA), (2) LTE-modulated 900 MHz (OFDM), (3) CW 900 MHz, all at identical time-averaged SAR. Measure motility, ROS, DNA fragmentation. Prediction: GSM > LTE > CW because GSM’s hard pulse produces the strongest ELF membrane component. Directly tests Schwan + T-type bifurcation mechanism.",
        timeline: "Testable in 1–3 months (in vitro)",
        falsification: "No difference between modulation types at equal SAR, or CW > modulated",
      },
    ],
    modulomeTimeline: "Timeline",
    modulomeFalsification: "Falsification criterion",
    modulomeLocked: "Locked: 2026-08-21",
    modulomeStatus: "LOCKED — awaiting test",
    cascadeTitle: "Disease cascade predictions",
    cascadeLead: "Predictions derived from the four-channel chronic disease cascade model. Each tests whether the seven-disease cascade follows the modulome's biological latency hierarchy and channel-specific exposure patterns.",
    cascadePredictions: [
      {
        id: "P11",
        title: "COVID IF-channel retrodiction",
        description: "During lockdown, IF-sensitive diseases (infertility → improvement) and RF-sensitive diseases (depression → worsening) behave in opposite directions. The COVID lockdown acts as a natural experiment: workplace IF exposure dropped ~70% (offices with LED lighting closed) while home RF exposure rose ~40% (more phone/Wi-Fi usage). This predicts channel-specific, opposite-sign health effects.",
        validation: "GBD 2024 + national health registers",
        falsification: "No differential direction between IF-sensitive and RF-sensitive diseases during lockdown",
      },
      {
        id: "P12",
        title: "LED rollout × sperm quality",
        description: "In countries where the EU LED transition happened earlier, sperm quality decline should accelerate earlier than in countries where it happened later. EU vs non-EU difference-in-differences design, controlling for mobile density, GDP, and urbanization.",
        validation: "[[ref:levine2023_sperm|Levine meta-analysis]] country-specific estimates + EU [[ref:eu_regulation_244_2009|Directive 244/2009]] implementation dates (2009–2016)",
        falsification: "No acceleration difference, or non-EU countries show faster decline",
      },
      {
        id: "P13",
        title: "Cascade order test",
        description: "Seven chronic diseases' acceleration points follow the modulome's biological latency hierarchy: sleep < depression < ADHD < metabolic < autoimmune < infertility < cancer. Each acceleration point should fall 0–10 years after mass adoption of its specific technology generation.",
        validation: "GBD 2024 acceleration point statistical analysis (structural breakpoint detection)",
        falsification: "Acceleration order does not match modulome hierarchy, or acceleration points are not temporally linked to technology rollouts",
      },
      {
        id: "P14",
        title: "EMF × psychedelic response interaction",
        description: "Patients with higher baseline EMF exposure (measured by personal RF dosimetry) will show stronger acute response to psilocybin-assisted therapy, because chronic EMF-driven Ca²⁺ dysregulation creates a larger homeostatic deficit for the psychedelic Ca²⁺ reset to correct. High-EMF patients should show greater pre/post MADRS delta.",
        validation: "Psilocybin clinical trial with RF dosimetry covariate",
        falsification: "No correlation between EMF exposure and treatment response magnitude, or inverse correlation",
      },
      {
        id: "P15",
        title: "CACNA1C genotype × psychedelic response",
        description: "Patients carrying CACNA1C risk variants (associated with bipolar disorder and schizophrenia in GWAS) will show altered psilocybin response, because the psychedelic signal chain terminates at Cav1.2 (CACNA1C). Specifically, rs1006737 A-allele carriers should show either enhanced or paradoxical response to psilocybin, distinct from wild-type responders.",
        validation: "Pharmacogenomic analysis of existing psilocybin trial data with CACNA1C genotyping",
        falsification: "No genotype-response association at CACNA1C locus",
      },
      {
        id: "P16",
        title: "Lithium protects against EMF mood effects",
        description: "Lithium users will show attenuated mood deterioration in response to EMF exposure compared to non-lithium controls, because Li⁺ directly occupies VGSC and normalizes Na⁺/Ca²⁺ balance that EMF perturbs. Ecological test: lithium-treated bipolar patients should show no seasonal RF-correlated mood variation, while unmedicated patients should.",
        validation: "Mood-tracking app data (e.g. Daylio) × personal RF dosimetry, stratified by lithium use",
        falsification: "Lithium users show equal or greater EMF-mood sensitivity compared to controls",
      },
      {
        id: "P17",
        title: "EMF exposure reduces transepithelial potential (TEP)",
        description: "Controlled EMF exposure will measurably reduce skin TEP (baseline 10–60 mV) via Na⁺/K⁺-ATPase disruption. EHS-reporting individuals will show a larger TEP drop than matched controls under the same exposure, because their ion channel sensitivity threshold is lower. Double-blind measurement with Ag/AgCl electrodes on forearm skin.",
        validation: "Double-blind TEP measurement before/during/after controlled RF exposure (1 V/m, 30 min), EHS vs. control cohort",
        falsification: "No TEP change under EMF, or EHS patients show equal or smaller change than controls",
      },
      {
        id: "P18",
        title: "EMF slows wound healing via electrotactic interference",
        description: "Standardized skin wounds (e.g. suction blister) will heal significantly slower in high-EMF environments compared to Faraday-shielded controls, because exogenous EMF superimposes noise on the endogenous wound electric field (100–200 mV/mm) that guides keratinocyte electrotaxis. Effect size should correlate with EMF field strength.",
        validation: "Suction blister wound healing RCT: Faraday-shielded vs. standard room, time to re-epithelialization",
        falsification: "No wound healing difference, or faster healing in high-EMF environment",
      },
      {
        id: "P19",
        title: "LED blue light retinal damage is IF-EMF mediated",
        description: "Retinal damage attributed to LED blue light is partially caused by IF-EMF (65 kHz – 2 MHz) from the LED switching power supply, not blue light alone. An incandescent lamp filtered to identical blue spectrum (no IF-EMF) will produce significantly less retinal oxidative stress than LED blue light at the same intensity and spectrum.",
        validation: "LED vs. incandescent (same blue spectrum) retinal cell viability assay; LED vs. incandescent + IF-EMF source",
        falsification: "Incandescent blue light produces equal retinal damage to LED blue light at matched spectrum and intensity",
      },
      {
        id: "P20",
        title: "IF-EMF alone causes retinal oxidative stress",
        description: "IF-EMF exposure (65 kHz – 2 MHz, levels matching LED driver output) without any light stimulus will produce measurable oxidative stress in retinal cells via Cav1.4 VGCC activation. This would confirm that the IF-EMF component of LED light is independently biologically active on retinal tissue.",
        validation: "Retinal cell culture exposed to IF-EMF only (no light): ROS measurement, Cav1.4 channel activity",
        falsification: "No retinal oxidative stress from IF-EMF alone, or no Cav1.4 involvement",
      },
      {
        id: "P21",
        title: "Night mode does not eliminate IF-EMF melatonin suppression",
        description: "Phone/tablet 'night mode' (warm color filter) removes blue light but not IF-EMF from the display backlight. Melatonin suppression measured with night mode ON will be significantly greater than in a no-screen control, because IF-EMF continues to suppress melatonin via CRY pathway independent of light spectrum. Mechanistic basis: [[ref:chae2019|Chae et al. (2019)]] demonstrated that human magnetoreception requires blue light (400–500 nm), identifying cryptochrome as the transducer. This implies two independent intervention points: (1) blue-light filtering removes CRY activation entirely (no radical pairs to disrupt), and (2) Faraday shielding removes RF disruption while preserving natural CRY function. BERM predicts Faraday shielding is more effective because it corrects the interference while leaving the natural system intact, whereas blue-light filtering removes the disruption by shutting down the entire CRY system.",
        validation: "Salivary melatonin: night-mode screen vs. no screen vs. incandescent reading light, evening exposure protocol",
        falsification: "Night mode restores melatonin to no-screen baseline levels",
      },
      {
        id: "P22",
        title: "Myopia correlates with IF-EMF, not blue light alone",
        description: "The childhood myopia epidemic correlates with cumulative IF-EMF exposure (screen time + LED lighting hours) more strongly than with blue light dose alone. The EU incandescent ban (2009) provides a natural experiment: countries with faster LED adoption should show steeper myopia acceleration, controlling for education hours and outdoor time.",
        validation: "Cross-country DID analysis: LED adoption rate × myopia prevalence, controlling for near-work hours and outdoor time",
        falsification: "Myopia rates correlate equally with blue light and IF-EMF, or LED adoption timing shows no association",
      },
      {
        id: "P23",
        title: "Hospital EMF levels correlate with post-hospital syndrome",
        description: "Hospitals with higher measured EMF levels (especially IF from LED lighting and RF from Wi-Fi density) will have higher post-hospital syndrome (PHS) incidence, controlling for patient acuity, length of stay, and standard care quality metrics. The correlation should be strongest in elderly patients (>75 years) who spend the most time bed-bound.",
        validation: "Multi-hospital EMF survey × 30-day readmission/complication rates, stratified by age and mobility",
        falsification: "No correlation between hospital EMF levels and PHS incidence after controlling for confounders",
      },
      {
        id: "P24",
        title: "Low-EMF patient rooms improve recovery",
        description: "Patients in Faraday-shielded or low-EMF rooms (reduced Wi-Fi, incandescent/DC lighting, minimal monitors) will show faster recovery, shorter stays, lower delirium incidence, and better sleep quality compared to standard rooms, controlling for patient acuity and treatment protocols.",
        validation: "RCT or quasi-experimental: low-EMF ward vs. standard ward, primary endpoints: LOS, delirium, sleep quality (actigraphy)",
        falsification: "No difference in any recovery metric, or worse outcomes in low-EMF rooms",
      },
      {
        id: "P25",
        title: "Home care advantage is partially EMF-mediated",
        description: "The observed advantage of home care over hospitalization for certain elderly patients is partially mediated by lower EMF exposure at home. Patients discharged to high-EMF home environments (multiple Wi-Fi networks, LED-heavy) will show outcomes closer to hospital patients than those in low-EMF homes.",
        validation: "Home EMF survey at discharge × 30-day outcomes, comparing high-EMF vs. low-EMF home environments",
        falsification: "Home EMF levels do not predict post-discharge outcomes after controlling for socioeconomic factors",
      },
      {
        id: "P29",
        title: "AD incidence correlates with cumulative lifetime EMF",
        description: "Alzheimer's disease incidence correlates with cumulative lifetime EMF exposure (urban > suburban > rural), after controlling for education, cardiovascular risk, and ApoE4 status. The mechanism chain: EMF → VGCC → Ca²⁺ ↑ → BACE1 → Aβ oligomers → positive feedback loop. The calcium hypothesis (LaFerla, O'Day) identifies Ca²⁺ dysregulation as the proximal cause; BERM provides the upstream environmental driver.",
        validation: "Longitudinal cohort with RF/IF dosimetry × AD diagnosis, controlling for ApoE4, education, CVD risk",
        falsification: "No dose-response between cumulative EMF and AD incidence after confounders controlled",
      },
      {
        id: "P30",
        title: "CACNA1C rs7304986 modulates AD risk",
        description: "CACNA1C rs7304986 T/C carriers (who show greater EMF sleep sensitivity per [[ref:sousouri2025|Sousouri 2025]]) will have higher AD risk than T/T homozygotes in high-EMF environments but equivalent risk in low-EMF environments. This is the same gene × environment interaction as for EHS: genetically heightened VGCC sensitivity amplifies environmental Ca²⁺ dysregulation.",
        validation: "GWAS × EMF exposure interaction analysis in existing AD biobank cohorts",
        falsification: "No CACNA1C × EMF interaction on AD risk, or T/C carriers show lower AD risk",
      },
      {
        id: "P31",
        title: "AD incidence accelerates 2025–2035 (30-year lag)",
        description: "AD incidence in the 60–70 age group will accelerate beyond demographic aging predictions during 2025–2035, reflecting a ~30-year lag from mass 2G/Wi-Fi adoption (1995–2005). CAUTION: this acceleration could result from other causes (diabetes epidemic, sedentary lifestyle, diagnostic changes). The prediction is confirmable only if EMF-specific biomarkers (Ca²⁺ levels, VGCC expression) co-correlate.",
        validation: "Age-specific AD incidence trends vs. demographic projection, supplemented by Ca²⁺/VGCC biomarker panel",
        falsification: "No above-demographic acceleration, or acceleration without Ca²⁺/VGCC biomarker correlation",
      },
      {
        id: "P32",
        title: "Low-EMF care homes slow AD progression",
        description: "AD patients in low-EMF care environments (Faraday-shielded or reduced Wi-Fi/LED) will show slower cognitive decline (MMSE/MoCA trajectory) than matched controls in standard care facilities. The Arendash paradox (controlled 918 MHz protects in mice) suggests dose/frequency/context matter — chaotic multi-frequency environmental EMF drives damage, while removal allows homeostatic recovery.",
        validation: "Quasi-experimental: low-EMF care unit vs. standard unit, MMSE trajectory over 12 months, controlling for medication and baseline severity",
        falsification: "No difference in cognitive decline rate, or faster decline in low-EMF environment",
      },
      {
        id: "P33",
        title: "CACNA1C genotype × prenatal EMF → ADHD risk",
        description: "CACNA1C rs7304986 T/C-carrying mothers' prenatal EMF exposure will produce higher ADHD risk in offspring than T/T carriers'. This is a gene × environment interaction: genetically heightened VGCC sensitivity amplifies the developmental ion channel calibration error from prenatal EMF. The same CACNA1C variant associates with ADHD, ASD, bipolar, and EMF sleep sensitivity ([[ref:sousouri2025|Sousouri 2025]]).",
        validation: "Kaiser-type cohort with prenatal MF dosimetry + maternal CACNA1C genotyping × offspring ADHD diagnosis",
        falsification: "No CACNA1C × prenatal EMF interaction on offspring ADHD risk",
      },
      {
        id: "P34",
        title: "Guanfacine protects against EMF-worsened ADHD",
        description: "If ADHD is an ion channel calibration error, guanfacine (HCN channel modulator) should protect against EMF's ADHD-symptom-worsening effect better than stimulants (which only compensate by raising signal). In controlled EMF exposure, guanfacine-treated ADHD patients should show less symptom worsening than methylphenidate-treated patients, because guanfacine corrects the threshold while stimulants raise the signal.",
        validation: "Guanfacine vs. methylphenidate during controlled EMF exposure → ADHD symptom change (CPT, Conners)",
        falsification: "Guanfacine shows equal or less protection than methylphenidate against EMF symptom worsening",
      },
      {
        id: "P35",
        title: "ADHD prevalence acceleration follows prenatal EMF with 3–10y lag",
        description: "ADHD prevalence acceleration follows prenatal EMF exposure growth with a 3–10 year lag (exposure → diagnosis age). 2G mass adoption 1991–95 → ADHD acceleration ~1995–2005. Smartphone mass adoption 2007–12 → ADHD acceleration ~2012–2020. 5G mass adoption 2019–24 → ADHD acceleration ~2025–2035 (prediction). CAUTION: ADHD diagnostic practices have changed significantly — prevalence data requires careful correction for diagnostic trends.",
        validation: "Age-specific ADHD incidence trends vs. prenatal EMF proxy (mobile penetration at birth year), controlling for diagnostic practice changes",
        falsification: "No temporal correlation between prenatal EMF proxy and ADHD incidence after diagnostic correction",
      },
      {
        id: "P36",
        title: "EMF exposure × bipolar cycle frequency",
        description: "Bipolar patients in higher-EMF environments should have more frequent mood cycles, because stronger ionic perturbation destabilizes the neural oscillator — amplitude increases and period shortens. Computational models ([[ref:pubmed32278494_bipolar_ionic|PubMed 32278494]]) show bipolar neurons oscillate between hyperexcitability and hypoexcitability due to ion conductance changes; EMF adds external perturbation to this unstable system.",
        validation: "EMF dosimetry + mood diary + cycle length in longitudinal bipolar cohort",
        falsification: "No correlation between environmental EMF and bipolar cycle frequency",
      },
      {
        id: "P37",
        title: "Lithium + EMF shielding synergy in bipolar",
        description: "Lithium-treated bipolar patients will benefit from EMF shielding (Faraday) because Li⁺ dampens the oscillation AND EMF removal eliminates the perturbation — combined effect exceeds either alone. Li⁺ traverses VGSC and accumulates in hyperactive neurons; removing the EMF perturbation source reduces the oscillation that lithium must dampen.",
        validation: "Li⁺ + Faraday-shielded bedroom vs. Li⁺ alone → cycle frequency and amplitude over 6 months",
        falsification: "No additional benefit from EMF shielding beyond lithium alone",
      },
      {
        id: "P38",
        title: "IVF success rates lower in high-EMF clinics",
        description: "IVF laboratories with higher ambient EMF will have lower fertilization rates, blastocyst development, and clinical pregnancy rates. Melatonin in follicular fluid is a critical oocyte protectant ([[ref:tamura2012_follicular_melatonin|Tamura 2012]]); EMF suppresses endogenous melatonin ([[ref:battelle1980_emf_melatonin|Battelle 1980]], circadian pathway), reducing follicular antioxidant defense during the most vulnerable phase. [[ref:tong2017_melatonin_ivf|Tong 2017]] meta-analysis already shows melatonin supplementation improves IVF outcomes — the prediction is that EMF environment is a confound in existing IVF data.",
        validation: "EMF dosimetry of IVF labs (incubator + patient treatment rooms) vs. clinic-level outcomes, controlling for patient demographics",
        falsification: "No correlation between clinic EMF levels and IVF outcomes after standard confound adjustment",
      },
      {
        id: "P39",
        title: "Melatonin supplement × EMF interaction in IVF",
        description: "Melatonin supplementation benefit in IVF will be LARGER for patients in high-EMF environments, because high EMF creates a deeper melatonin deficit that supplementation partially corrects. In low-EMF environments, endogenous melatonin is already near-optimal, so exogenous supplementation adds less. This predicts an interaction term (melatonin × EMF) in IVF outcome regression, not just a melatonin main effect.",
        validation: "IVF RCT with melatonin supplementation, stratified by patient residential/occupational EMF exposure (wearable dosimetry)",
        falsification: "Melatonin benefit is uniform across EMF exposure levels (no interaction)",
      },
      {
        id: "P40",
        title: "Shift workers: lower fertility AND greater melatonin supplement benefit",
        description: "Shift workers have suppressed nocturnal melatonin (circadian disruption + workplace lighting + occupational EMF), predicting lower natural fertility AND a larger absolute benefit from melatonin supplementation compared to day workers. The melatonin bridge connects cascade 1 (sleep/circadian) to cascade 6 (fertility) — shift work is the strongest natural experiment for this connection because it disrupts melatonin through multiple converging pathways simultaneously.",
        validation: "Fertility outcomes (time-to-pregnancy, IVF success) in shift vs. day workers, with and without melatonin supplementation",
        falsification: "Shift workers show equal melatonin supplement benefit as day workers, or shift work fertility deficit not mediated by melatonin levels",
      },
      {
        id: "IF-1",
        title: "LED driver 20–100 kHz disrupts normal cell mitosis",
        description: "LED driver switching frequencies (20–100 kHz) overlap the normal-cell mitotic disruption range identified by TTFields research (Neuhaus et al., Nature 2020: normal cells most affected at ~50 kHz, vs. cancer cells at 150–200 kHz). Prediction: in vitro exposure of normal dividing cells (e.g. spermatogonia, intestinal crypt cells) to 20–100 kHz pulsed fields at LED-driver-representative intensities will produce measurable increases in aneuploidy, mitotic spindle misalignment, or reduced proliferation rate. The Kaiser Permanente series (Li 2002–2020) provides epidemiological support: EMDEX-measured MF exposure associates with miscarriage, sperm quality decline, and childhood conditions across 6 cohorts.",
        validation: "In vitro: normal cell lines exposed to 20–100 kHz pulsed waveform (LED-driver-representative) vs. sham → aneuploidy rate, spindle orientation, proliferation",
        falsification: "No effect on normal cell mitosis at LED-driver-representative frequencies and intensities, or effect only at TTFields-level intensities (>100 V/m)",
      },
    ],
    cascadeValidation: "Validation",
    cascadeFalsification: "Falsification criterion",
    cascadeLocked: "Locked: 2026-08-22",
    cascadeStatus: "LOCKED — awaiting test",
    cascadeLink: "See the cascade visualization",
    nutritionalTitle: "Nutritional CRY modulation predictions",
    nutritionalLead: "Predictions derived from the CRY dual-system model and its nutritional modulators (FAD/B2, omega fatty acids, AMPK fasting dynamics). These test whether pathway C effectiveness is modifiable by nutritional intervention.",
    nutritionalPredictions: [
      {
        id: "NUT-1",
        title: "B2 supplementation improves circadian resilience to nighttime EMF",
        description: "RCT: B2 supplementation (25mg/day x 8 weeks) vs placebo in subjects with poor sleep quality and high nighttime phone use. Primary endpoint: melatonin onset latency. Secondary: sleep efficiency, cortisol awakening response. B2 group should show less circadian disruption because FAD-replete CRY is more stable against EMF perturbation. Mechanistic basis: [[ref:hirano2017|Hirano 2017]] (FAD -> CRY stability), [[ref:yap2025|Yap 2025]] (FAD -> magnetic sensitivity).",
        timeline: "Testable within 3-6 months (RCT, N=60)",
        falsification: "No difference in melatonin onset latency or sleep metrics between B2 and placebo groups",
      },
      {
        id: "NUT-2",
        title: "B2 deficiency x EMF interaction in 54-country regression",
        description: "Add population-level B2 adequacy as a control variable to the 54-country EMF-TFR regression model. Prediction: the interaction term (EMF x B2_deficiency) is significant and negative — countries with BOTH high EMF AND high B2 deficiency show steeper TFR decline than countries with high EMF alone. China (>90% B2 deficiency, highest EMF, lowest TFR) vs. Finland (~15% B2 deficiency, high EMF, higher TFR) is the key contrast. CAUTION: This is ecological evidence — correlation, not causation.",
        timeline: "Testable immediately (existing data + B2 surveys from ~30 countries)",
        falsification: "No significant EMF x B2 interaction term, or interaction is positive",
      },
      {
        id: "NUT-3",
        title: "Fasting duration predicts magnetoreceptive sensitivity (inverted U)",
        description: "Replicate [[ref:chae2019|Chae 2019]] food orientation paradigm with graded fasting durations (4h, 8h, 12h, 16h, 24h). Prediction: inverted U-shaped dose-response — sensitivity peaks at 12-16h (optimal CRY turnover with adequate FAD) and declines at 24h+ (FAD pool depletion begins). Additional arm: B2-supplemented (25mg pre-fast) vs. unsupplemented subjects. B2 supplementation should right-shift the peak (allowing longer fasting before decline). The fasting paradox resolution ([[ref:lamia2009|Lamia 2009]] AMPK-CRY + beta-oxidation FAD) predicts this specific shape.",
        timeline: "Testable within 2-4 months (behavioral, N=40 per duration)",
        falsification: "Monotonic increase (no decline at 24h), or no fasting effect, or B2 does not shift the peak",
      },
    ],
    nutritionalTimeline: "Timeline",
    nutritionalFalsification: "Falsification criterion",
    nutritionalLocked: "Locked: 2026-08-24",
    nutritionalStatus: "LOCKED — awaiting test",
    metabTitle: "Metabolic syndrome predictions",
    metabLead: "Predictions derived from the six-pathway EMF → metabolic syndrome model. CaMKII convergence predicts that obesity, diabetes, and energy metabolism disruption share a common upstream cause testable through shielding, pharmacology, and epidemiology. Obesity is multifactorial — these predictions test whether EMF is a contributing factor, not whether it is the sole cause.",
    metabPredictions: [
      {
        id: "METAB-1",
        title: "Faraday-shielded laboratory animals weigh less than unshielded controls",
        description: "Identical diet, identical genetics, identical temperature — only difference is EMF environment. Predicted: shielded animals weigh 5-15% less after 6 months. Based on [[ref:klimentidis2010|Klimentidis paradox]] (24 populations, 8 species ALL gaining weight, p = 1.2×10⁻⁷) and BAT thermogenesis mechanism ([[ref:maalouf2023|Maalouf 2023]], [[ref:5g_bat2025|5G BAT 2025]]). This is the single most discriminating test for the EMF-metabolic hypothesis.",
        timeline: "1-3 years (experimental, requires shielded facility)",
        falsification: "No weight difference after 12 months under identical conditions",
        critical: true,
      },
      {
        id: "METAB-2",
        title: "CaMKII inhibition attenuates EMF-induced weight gain in rodents",
        description: "KN-93 or AIP (CaMKII inhibitors) administered to EMF-exposed rodents should reduce weight gain, BAT dysfunction, and insulin resistance compared to EMF-exposed untreated controls. CaMKII is the convergence molecule connecting EMF sensitivity (Cav3.2 threshold shift), BAT thermogenesis (UCP1 transcription), testosterone (StAR expression), and insulin secretion (β-cell Ca²⁺ dynamics). If CaMKII convergence is real, its inhibition should attenuate multiple metabolic endpoints simultaneously.",
        timeline: "1-2 years (experimental, rodent model)",
        falsification: "CaMKII inhibition has no effect on EMF-induced metabolic changes",
      },
      {
        id: "METAB-3",
        title: "Semaglutide efficacy correlates with ambient EMF level",
        description: "If EMF disrupts the L-type VGCC → Ca²⁺ → ERK pathway that GLP-1/semaglutide amplifies ([[ref:bhatt2012_glp1|Bhatt 2012, PMC3556522]]), then semaglutide should be MORE effective in high-EMF populations (more pathway disruption to correct) but show diminishing returns as EMF increases beyond a threshold (overwhelms correction capacity). This is a SPECULATIVE prediction — mechanistically derived but no clinical data yet. Evidence level: L*.",
        timeline: "3-5 years (clinical data mining from existing RCTs)",
        falsification: "No correlation between EMF environment and semaglutide efficacy",
      },
      {
        id: "METAB-4",
        title: "Obesity prevalence in low-EMF communities remains <10% through 2035",
        description: "Old Order Amish, Tsimane, Hadza, and comparable low-EMF communities will maintain obesity rates below 10% regardless of dietary modernization, as long as EMF exposure remains low. The Tsimane currently show <5% obesity; Kitava ~0%. If EMF is a contributing factor, these populations should remain lean even as processed food access increases — provided their EMF environment doesn't change.",
        timeline: "9 years (longitudinal observation)",
        falsification: "Low-EMF community obesity rises above 15% without significant EMF adoption",
      },
    ],
    metabTimeline: "Timeline",
    metabFalsification: "Falsification criterion",
    metabLocked: "Locked: 2026-08-25",
    metabStatus: "LOCKED — awaiting test",

    trpc1Title: "Pharmacological pathway separation predictions",
    trpc1Lead: "Predictions testing the independence of pathway A (VGCC) and pathway C's TRPC1 calcium branch. The CRY2-TRPC1 complex ([[ref:yap2025|Yap et al. 2025]]) predicts that EMF reproductive effects can be pharmacologically decomposed into VGCC-dependent and TRPC1-dependent components.",
    trpc1Predictions: [
      {
        id: "TRPC1-1",
        title: "CRY2-TRPC1 calcium entry contributes to EMF reproductive effects independently of VGCCs",
        description: "Expose reproductive cells (e.g. granulosa cells, Sertoli cells) to EMF under four conditions: (1) Control (no blockers); (2) + Nifedipine (blocks VGCCs, pathway A) — isolates C's contribution; (3) + Anti-TRPC1 antibody (blocks TRPC1) — isolates A's contribution; (4) + Both blockers — residual effect = non-Ca²⁺ pathways (B, D). Prediction: nifedipine reduces but does NOT eliminate EMF response. The remaining response is CRY2-TRPC1-mediated (pathway C's calcium branch). Anti-TRPC1 also reduces but does not eliminate the response. Both blockers together produce near-complete abolition of the Ca²⁺ response. This experiment directly quantifies the relative contributions of pathways A (VGCC) and C-calcium (TRPC1) to EMF reproductive effects.",
        timeline: "Testable within 6-12 months (in vitro, cell lines available)",
        falsification: "Nifedipine alone abolishes all EMF-induced calcium effects (no TRPC1-independent component), or anti-TRPC1 has no effect (TRPC1 not involved in reproductive cells)",
      },
    ],
    trpc1Timeline: "Timeline",
    trpc1Falsification: "Falsification criterion",
    trpc1Locked: "Locked: 2026-08-24",
    trpc1Status: "LOCKED — awaiting test",
    pharmTitle: "Pharmacological predictions",
    pharmLead: "Predictions derived from the pharmacological convergence argument. If VGCC activation is the primary EMF transduction mechanism, specific drug classes should produce measurable differences in EMF-associated endpoints. These predictions leverage existing prescription databases — no new drug exposure required.",
    pharmPredictions: [
      {
        id: "PHARM-1",
        title: "CCB users show attenuated sperm quality decline compared to ARB/ACE inhibitor users",
        description: "Compare sperm parameters (concentration, motility, morphology, DNA fragmentation) between men taking calcium channel blockers vs. men taking ARB or ACE inhibitors for hypertension. Both groups have the same underlying condition; only the drug mechanism differs. CCBs block the same VGCC that BERM identifies as the EMF transduction node. If EMF-induced VGCC activation contributes to sperm decline, CCB users should show relative protection. Data source: existing fertility clinic databases cross-referenced with prescription records.",
        timeline: "1-2 years (retrospective database study)",
        falsification: "No difference in sperm parameters between CCB and ARB/ACE inhibitor users after controlling for age, BMI, and comorbidities",
        critical: true,
      },
      {
        id: "PHARM-2",
        title: "Verapamil shows stronger EMF-protective effect than amlodipine due to use-dependent blockade",
        description: "Among CCB users, verapamil (frequency-dependent VGCC blocker) should show greater attenuation of EMF biomarkers than amlodipine (voltage-dependent blocker). The IFO mechanism predicts high-frequency channel cycling during EMF exposure — verapamil's use-dependent kinetics should provide disproportionate blockade during these bursts. Compare oxidative stress markers, sperm parameters, or melatonin levels between verapamil and amlodipine users.",
        timeline: "2-3 years (retrospective, requires sufficient verapamil sample size)",
        falsification: "No difference between verapamil and amlodipine users on any EMF-relevant biomarker",
      },
      {
        id: "PHARM-3",
        title: "Lithium-treated bipolar patients show less circadian disruption in high-EMF environments",
        description: "Compare circadian markers (melatonin secretion timing, sleep onset latency, dim-light melatonin onset) between bipolar patients on lithium vs. bipolar patients on valproate or lamotrigine in matched EMF environments. Lithium stabilizes CRY proteins via GSK-3β inhibition, directly opposing BERM pathway C. If CRY-mediated melatonin suppression contributes to EMF-associated circadian disruption, lithium users should be partially protected.",
        timeline: "1-3 years (prospective or retrospective with wearable data)",
        falsification: "Lithium users show equal or greater circadian disruption than valproate users in high-EMF environments",
      },
      {
        id: "PHARM-4",
        title: "Nimodipine attenuates EMF-induced cognitive effects while peripheral CCBs do not",
        description: "Nimodipine (BBB-penetrant dihydropyridine CCB) should attenuate EMF-associated cognitive effects, while amlodipine (non-BBB-penetrant) should not. Three moderators differentiate BERM from a simple Ca²⁺-blockade hypothesis: (a) the effect should be LARGER in winter than summer (CRY more sensitive), (b) LARGER in AA-genotype carriers (more Cav1.2), and (c) LARGER in subjects with home Wi-Fi (more primed baseline). ETH Zürich 5G-sleep study is the first opportunity to test these moderators directly.",
        timeline: "2-4 years (prospective cohort or RCT extension study)",
        falsification: "No difference between nimodipine and amlodipine on cognitive endpoints, OR no moderator-dependent variation (season, genotype, home EMF)",
      },
      {
        id: "PHARM-5",
        title: "CoQ10 supplementation reduces EMF-associated oxidative damage in a dose-dependent manner",
        description: "Building on [[ref:bektas2026|Bektas 2026]] (3.5 GHz → testicular ROS; CoQ10 ameliorates): CoQ10 supplementation (100-400 mg/day) should reduce urinary 8-OHdG (oxidative DNA damage marker) in men with high smartphone usage (>4h/day, phone in pocket) in a dose-dependent manner. The dose-response relationship tests whether the antioxidant mechanism scales linearly (simple ROS scavenging) or saturates (enzyme-limited repair).",
        timeline: "6-12 months (RCT feasible with existing supplement)",
        falsification: "No reduction in 8-OHdG at any CoQ10 dose compared to placebo in high-smartphone-usage men",
        critical: true,
      },
    ],
    pharmTimeline: "Timeline",
    pharmFalsification: "Falsification criterion",
    pharmLocked: "Locked: 2026-08-26",
    pharmStatus: "LOCKED — awaiting test",
    modIntTitle: "Modulome integration predictions",
    modIntLead: "Predictions derived from the modulome integration — pituitary hub, mitochondrial ROS amplification, redox buffering, autonomic HRV, placental barriers, and thyroid-EMF interactions. These test whether newly identified EMF target tissues and mechanisms produce the predicted downstream effects.",
    modIntPredictions: [
      {
        id: "MOD-1",
        title: "Pituitary gonadotroph T-type channels mediate EMF-induced FSH/LH disruption",
        description: "Pituitary gonadotrophs express Cav3 T-type channels for hormone secretion. EMF perturbation of these channels reduces FSH/LH pulsatility independently of hypothalamic GnRH. Test: expose pituitary cell cultures to standardized EMF with and without T-type channel blocker (ethosuximide). Prediction: EMF reduces FSH/LH secretion; ethosuximide abolishes the effect.",
        type: "experimental",
        discriminating: true,
        timeline: "Testable within 6 months (pituitary cell culture)",
        falsification: "No EMF effect on pituitary FSH/LH secretion, or ethosuximide does not block the effect",
      },
      {
        id: "MOD-2",
        title: "Mitochondrial age amplifies EMF-induced ROS in reproductive tissue",
        description: "Aged mitochondria produce more ROS per unit Ca2+ influx than young mitochondria. Test: expose testicular tissue from young (3-month) and old (18-month) rats to identical EMF. Measure mitochondrial ROS production. Prediction: old tissue produces disproportionately more ROS per unit EMF exposure, following the v18_mitochondrial_ros_amplifier() function.",
        type: "experimental",
        discriminating: true,
        timeline: "Testable within 6 months (animal tissue, standard ROS assay)",
        falsification: "Old and young tissue produce equal ROS per unit EMF, or young tissue produces more",
      },
      {
        id: "MOD-3",
        title: "B2 supplementation restores glutathione defense AND reduces CRY sensitivity",
        description: "Riboflavin (B2) is the precursor for FAD, which is required by both glutathione reductase (GR, redox defense) and cryptochrome (CRY, EMF sensor). B2 supplementation should simultaneously: (a) increase effective glutathione buffering capacity (via GR), and (b) stabilize CRY against EMF perturbation (via FAD loading). Test: B2-supplemented vs. unsupplemented cell cultures under EMF. Measure both GSH/GSSG ratio and CRY-dependent circadian gene expression.",
        type: "experimental",
        discriminating: true,
        timeline: "Testable within 3-6 months (cell culture, dual endpoint)",
        falsification: "B2 affects only one endpoint (GR or CRY) but not both, or no effect on either",
      },
      {
        id: "MOD-4",
        title: "HRV is a sensitive early biomarker of chronic EMF exposure",
        description: "Heart rate variability (HRV), specifically the high-frequency (HF) component reflecting vagal tone, decreases with chronic EMF exposure before clinical symptoms appear. The SA node's Cav3.1 T-type channels are the transducer. Test: correlate personal RF dosimetry with 24-hour HRV monitoring in a cohort (N=200). Prediction: inverse dose-response between cumulative EMF and HF-HRV, independent of age, fitness, and stress.",
        type: "observational",
        discriminating: true,
        timeline: "Testable immediately (wearable HRV + RF dosimetry)",
        falsification: "No correlation between personal EMF exposure and HRV after controlling for confounders",
      },
      {
        id: "MOD-5",
        title: "Placental TJ proteins decrease with gestational EMF exposure",
        description: "The placental barrier uses the same tight junction (TJ) proteins as BBB and BTB (occludin, ZO-1, claudins). EMF exposure during pregnancy should decrease placental TJ protein expression in a dose-dependent manner. Test: measure placental TJ protein levels in women with high vs. low EMF exposure during pregnancy (personal dosimetry). Prediction: higher EMF exposure correlates with lower occludin and ZO-1 expression.",
        type: "experimental",
        discriminating: true,
        timeline: "Testable within 12 months (birth cohort with dosimetry)",
        falsification: "No correlation between gestational EMF and placental TJ protein expression",
      },
      {
        id: "MOD-6",
        title: "Thyroid dysfunction prevalence correlates with mobile phone adoption rate nationally",
        description: "Thyroid cells express VGCCs and are sensitive to EMF-induced Ca2+ disruption. National thyroid dysfunction prevalence (hypothyroidism, elevated TSH) should correlate with mobile phone adoption rate, controlling for iodine status, age structure, and diagnostic practices. This is an ecological prediction — correlation, not causation.",
        type: "ecological",
        discriminating: false,
        timeline: "Testable immediately (existing health registry + ITU data)",
        falsification: "No correlation between mobile adoption rate and thyroid dysfunction prevalence after controlling for iodine status and demographics",
      },
    ],
    modIntTimeline: "Timeline",
    modIntFalsification: "Falsification criterion",
    modIntType: "Type",
    modIntDiscriminating: "Discriminating",
    modIntLocked: "Locked: 2026-08-24",
    modIntStatus: "LOCKED — awaiting test",
    sidsTitle: "Infant vulnerability & SIDS predictions",
    sidsLead: "Predictions derived from BERM's calcium framework applied to infant cardiorespiratory vulnerability. These test whether ion channel genetics, nighttime EMF exposure, and circadian Ca²⁺ dynamics contribute to SIDS risk through the same pathways identified in adult populations.",
    sidsNote: "These predictions address a sensitive topic. BERM offers a mechanistic hypothesis — not a proven explanation. Known protective measures (supine sleeping, avoiding tobacco, breastfeeding) remain the most important interventions.",
    sidsPredictions: [
      {
        id: "SIDS-1",
        title: "Baby monitor proximity correlates with SIDS risk",
        description: "Retrospective case-control study: compare baby monitor type (DECT vs. WiFi vs. wired vs. none) and placement distance (< 0.5 m, 0.5–1 m, > 1 m) between SIDS cases and age-matched controls. DECT monitors at < 0.5 m produce 2.5–3.5 V/m continuous RF through a 2 mm infant skull. Prediction: DECT or WiFi monitor placement within 0.5 m of the crib is more common in SIDS cases than controls, after controlling for known risk factors.",
        timeline: "Testable retrospectively (parent questionnaire in existing SIDS registries)",
        falsification: "No association between monitor type/distance and SIDS incidence after controlling for prone sleeping, tobacco, overheating, and breastfeeding status",
      },
      {
        id: "SIDS-2",
        title: "CACNA1C rs1006737 AA genotype is overrepresented in SIDS victims",
        description: "Post-mortem genotyping of SIDS victims for CACNA1C rs1006737 (the BERM risk allele). The AA genotype increases Cav1.2 expression and is associated with psychiatric and cardiac risk in adults. In infants with immature Ca²⁺ homeostasis, this gain-of-function variant should increase vulnerability to any Ca²⁺-disrupting stressor. Prediction: AA genotype frequency in SIDS victims exceeds population baseline.",
        timeline: "Testable with existing biobanked SIDS tissue (retrospective genotyping)",
        falsification: "AA genotype frequency in SIDS victims equals or is lower than population frequency",
      },
      {
        id: "SIDS-3",
        title: "Maternal EMF exposure correlates with lower breast milk melatonin",
        description: "Measure melatonin concentration in night breast milk samples from mothers with high vs. low personal EMF exposure (smartphone use, WiFi proximity, LED lighting assessed by questionnaire and dosimetry). Melatonin in night milk is the infant's exogenous Ca²⁺ antagonist. If maternal CRY pathway is disrupted by EMF, milk melatonin should be reduced. Prediction: mothers with higher EMF exposure produce night milk with lower melatonin concentration.",
        timeline: "Testable within 6–12 months (lactation cohort with dosimetry)",
        falsification: "No correlation between maternal EMF exposure metrics and night milk melatonin concentration",
      },
      {
        id: "SIDS-4",
        title: "Night-pumped breast milk offered at night has lower SIDS risk than day-pumped milk offered at night",
        description: "Retrospective cohort: among mothers who pump and bottle-feed, compare SIDS incidence between those who offer time-matched milk (night-pumped at night, day-pumped during day) vs. those who do not label by time. Night milk contains melatonin (Ca²⁺ antagonist) and tryptophan absent from day milk. Prediction: chronomatched milk feeding is associated with lower SIDS risk.",
        timeline: "Testable retrospectively (feeding practice questionnaire in existing cohorts)",
        falsification: "No difference in SIDS incidence between chronomatched and non-matched pumped milk feeding practices",
      },
      {
        id: "SIDS-5",
        title: "EMF-free nursery environment reduces apnea/bradycardia episodes in NICU",
        description: "Interventional study in NICU: compare apnea and bradycardia episode frequency in preterm infants in standard NICU environment vs. EMF-minimized environment (wired monitors, no WiFi, RF-shielded incubator, amber lighting). Prediction: EMF-minimized NICU environment reduces apnea/bradycardia episodes, with larger effect in infants with known ion channel variants.",
        timeline: "Testable within 12–18 months (NICU intervention study)",
        falsification: "No reduction in apnea/bradycardia episodes in EMF-minimized NICU environment compared to standard environment",
      },
      {
        id: "SIDS-6",
        title: "ADORA1/ADORA2A polymorphisms predict both SIDS risk and caffeine response",
        description: "Pharmacogenetic analysis: genotype ADORA1 and ADORA2A receptor polymorphisms in SIDS victims (post-mortem) and in preterm infants receiving caffeine therapy. The same adenosine receptor variants that modulate caffeine response in apnea of prematurity should predict SIDS susceptibility, because both conditions involve adenosine-Ca²⁺ pathway disruption in the respiratory center. Prediction: ADORA variants that predict poor caffeine response are overrepresented in SIDS victims.",
        timeline: "Testable with existing SIDS biobanks and NICU pharmacogenetic databases",
        falsification: "No association between ADORA genotype and SIDS incidence, or ADORA genotypes associated with SIDS do not predict caffeine response",
      },
    ],
    sidsTimeline: "Timeline",
    sidsFalsification: "Falsification criterion",
    sidsLocked: "Locked: 2026-08-26",
    sidsStatus: "LOCKED — awaiting test",
    sidsResTitle: "SIDS resonance model predictions",
    sidsResLead: "Predictions derived from the Q-factor resonance model: the neonatal brain as undamped oscillator (GABA excitatory via NKCC1>KCC2), with SIDS as the fatal endpoint of a neurodevelopmental impact spectrum.",
    sidsResNote: "These predictions address a sensitive topic. BERM offers a mechanistic hypothesis — not a proven explanation. Known protective measures (supine sleeping, avoiding tobacco, breastfeeding) remain the most important interventions.",
    sidsResPredictions: [
      {
        id: "SIDS-RESONANCE-1",
        title: "Q-factor predicts SIDS risk better than age alone",
        description: "If the resonance model is correct, SIDS risk should correlate with Q_neonatal(age) = Q₀/(1+(age/τ_KCC2)²) better than with age alone. The Q-factor declines as KCC2 matures and GABA transitions from excitatory to inhibitory. Test: fit SIDS incidence-by-age curves to Q_neonatal(age) vs. linear/quadratic age models. Prediction: Q-factor model fits SIDS age distribution better (lower AIC) than purely age-based models.",
        timeline: "Testable immediately (existing SIDS age-distribution datasets)",
        falsification: "Q-factor model fits no better than simple age-based models for SIDS incidence distribution",
      },
      {
        id: "SIDS-RESONANCE-2",
        title: "Bumetanide prophylaxis reduces apnea in high-risk neonates",
        description: "Bumetanide blocks NKCC1, restoring inhibitory GABA and introducing damping (reducing Q). If SIDS results from resonance failure in an undamped system, bumetanide should reduce apnea and bradycardia episodes in high-risk neonates (those with ion channel variants or prior apparent life-threatening events). Test: randomized trial of low-dose bumetanide in NICU infants with recurrent apnea. Prediction: bumetanide reduces apnea/bradycardia episode frequency.",
        timeline: "Testable within 12–18 months (NICU pharmacological trial)",
        falsification: "No reduction in apnea/bradycardia episodes with bumetanide in high-risk neonates",
      },
      {
        id: "SIDS-RESONANCE-3",
        title: "Neonatal EEG shows higher coherence at resonant frequencies in SIDS-risk infants",
        description: "An undamped resonator (Q→∞) concentrates energy at its natural frequency. Neonatal EEG in high-risk infants should show narrower spectral peaks and higher inter-channel coherence in delta/theta bands compared to low-risk controls. This spectral signature should diminish as KCC2 matures (3–6 months). Test: serial EEG in SIDS-risk vs. control infants from birth to 6 months. Prediction: high-risk infants show elevated spectral coherence that normalizes on the KCC2 maturation timeline.",
        timeline: "Testable within 12 months (neonatal EEG longitudinal study)",
        falsification: "No difference in EEG spectral coherence between high-risk and control neonates, or coherence does not change on the predicted KCC2 timeline",
      },
      {
        id: "SIDS-RESONANCE-4",
        title: "Co-sleeping cultures have low SIDS despite high ambient EMF",
        description: "The three-protections model predicts that cultures practicing co-sleeping (no monitor), breastfeeding (>90%), and continuous skin contact should maintain low SIDS rates regardless of ambient EMF level. Test: compare SIDS rates across cultures stratified by (1) ambient EMF density and (2) co-sleeping/breastfeeding/skin-contact practices. Prediction: SIDS rate correlates with monitor use and formula feeding, not with ambient EMF density, after controlling for the three protections.",
        timeline: "Testable immediately (ecological analysis of existing cross-national SIDS data)",
        falsification: "SIDS rate correlates with ambient EMF density regardless of co-sleeping/breastfeeding/skin-contact practices",
      },
      {
        id: "SIDS-RESONANCE-5",
        title: "NKCC1/KCC2 ratio at time of death predicts SIDS vs. non-SIDS infant death",
        description: "If the resonance model is correct, SIDS victims should have higher NKCC1/KCC2 ratios (less mature chloride transporter switch → higher Q → more excitatory GABA) compared to age-matched infants who died of non-SIDS causes. Test: immunohistochemistry for NKCC1 and KCC2 in brainstem tissue from SIDS vs. non-SIDS infant post-mortem samples. Prediction: SIDS victims show elevated NKCC1/KCC2 ratio compared to age-matched controls.",
        timeline: "Testable with existing biobanked tissue (retrospective immunohistochemistry)",
        falsification: "NKCC1/KCC2 ratio in SIDS victims equals that in age-matched non-SIDS infant deaths",
      },
      {
        id: "SIDS-SPECTRUM-1",
        title: "Prenatal EMF exposure predicts neurodevelopmental outcomes on a dose-response curve",
        description: "The resonance spectrum model predicts a continuous dose-response relationship between prenatal/neonatal EMF exposure and neurodevelopmental outcomes: highest exposure → SIDS risk, moderate → developmental delay, low → subtle motor/cognitive differences. Test: prospective birth cohort with personal EMF dosimetry (phone use, WiFi proximity, monitor use) followed to 36 months with standardized developmental assessment. Prediction: EMF exposure shows graded dose-response with developmental outcomes, with fine motor (OR ≥ 2.5) and problem-solving (OR ≥ 3.0) most affected, consistent with the prospective cohort finding (OR 2.74 fine motor, OR 3.67 problem-solving).",
        timeline: "Testable within 3 years (prospective birth cohort with dosimetry)",
        falsification: "No dose-response relationship between prenatal/neonatal EMF exposure and developmental outcomes at 36 months",
      },
    ],
    sidsResTimeline: "Timeline",
    sidsResFalsification: "Falsification criterion",
    sidsResLocked: "Locked: 2026-08-26",
    sidsResStatus: "LOCKED — awaiting test",
    neuroTitle: "Neurological spectrum predictions",
    neuroLead: "Predictions derived from the Q-factor spectrum model unifying SIDS, epilepsy, SUDEP, migraine, and cluster headache through a common Ca²⁺-dependent oscillation mechanism with varying damping.",
    neuroPredictions: [
      {
        id: "NEURO-EMF-1",
        title: "Chronic migraine prevalence correlates with cumulative EMF layer exposure",
        description: "The Q-factor model predicts that chronic migraine prevalence should increase with cumulative EMF exposure (ELF-priming → α2δ-1↑ → CSD threshold↓). Test: correlate chronic migraine prevalence trends (1990→2025) with cumulative EMF technology adoption (mobile, WiFi, LED) across countries. Prediction: countries with earlier and denser EMF adoption show steeper migraine prevalence increase.",
        timeline: "Testable immediately (existing migraine prevalence data + ITU technology adoption data)",
        falsification: "No temporal correlation between EMF technology adoption and chronic migraine prevalence trends across countries",
      },
      {
        id: "NEURO-EMF-2",
        title: "ELF-priming lowers CSD threshold; gabapentin reverses this",
        description: "ELF exposure upregulates α2δ-1 (CACNA2D1), increasing VGCC density at synapses and lowering CSD threshold. Gabapentin blocks α2δ-1 trafficking. Test: expose cortical slices to chronic ELF (50 Hz, 7 days), then measure CSD threshold (KCl concentration needed to trigger CSD). Repeat with gabapentin co-treatment. Prediction: ELF lowers CSD threshold; gabapentin co-treatment normalizes it.",
        timeline: "Testable within 6–12 months (cortical slice electrophysiology)",
        falsification: "ELF exposure does not alter CSD threshold, or gabapentin does not reverse the ELF effect",
      },
      {
        id: "NEURO-EMF-3",
        title: "Cluster headache patients have higher EMF exposure history",
        description: "The cluster headache patient profile (male 3:1, smoker 60–90%, onset ~30 years, attacks 00–03) maps onto a cumulative Ca²⁺-loading profile. EMF exposure history (occupational, residential) should be higher in cluster headache patients than matched controls. Test: case-control study with detailed EMF exposure assessment (occupation, residential proximity to infrastructure, device use). Prediction: cluster headache patients have statistically higher lifetime EMF exposure.",
        timeline: "Testable within 12 months (case-control with EMF questionnaire)",
        falsification: "No difference in EMF exposure history between cluster headache patients and matched controls",
      },
      {
        id: "NEURO-EMF-4",
        title: "SUDEP risk is higher in higher-EMF environments",
        description: "SUDEP shares the same spreading depolarization → brainstem mechanism as SIDS. If EMF contributes to CSD propagation, SUDEP incidence should be higher in high-EMF environments (urban) compared to low-EMF environments (rural), after controlling for seizure frequency and medication compliance. Test: registry study comparing SUDEP incidence in urban vs. rural epilepsy patients. Prediction: urban epilepsy patients have higher SUDEP rate after controlling for seizure frequency.",
        timeline: "Testable immediately (epilepsy registry with residential data)",
        falsification: "No difference in SUDEP incidence between urban and rural epilepsy patients after controlling for seizure frequency and medication compliance",
      },
      {
        id: "NEURO-EMF-5",
        title: "Psilocybin efficacy in cluster headache improves with concurrent EMF reduction",
        description: "Psilocybin resets the tryptamine pathway (5-HT2A → thalamo-cortical reset → SCN circadian reset). If ongoing EMF exposure re-primes α2δ-1 and disrupts the SCN after reset, psilocybin efficacy should be greater when combined with EMF reduction. Test: RCT of psilocybin + EMF reduction protocol vs. psilocybin alone in episodic cluster headache. Prediction: combined intervention produces longer remission than psilocybin alone.",
        timeline: "Testable within 24 months (RCT with EMF reduction protocol)",
        falsification: "No difference in remission duration between psilocybin + EMF reduction and psilocybin alone",
      },
      {
        id: "NEURO-EMF-6",
        title: "EMF triggers seizures in neonatal animal models without pharmacological GABAergic reduction",
        description: "López-Martín showed GSM + picrotoxin (GABA antagonist) = seizures, while neither alone sufficed. The neonatal brain has endogenously excitatory GABA (NKCC1>KCC2), equivalent to pharmacological GABAergic reduction. Test: expose neonatal rodents (P3–P7, before KCC2 switch) to pulsed GSM 900 MHz at mobile-phone intensity without picrotoxin. Prediction: neonatal animals show seizure activity or epileptiform EEG changes without pharmacological pre-treatment, while adult animals do not.",
        timeline: "Testable within 6–12 months (neonatal rodent EMF exposure model)",
        falsification: "No seizure activity or epileptiform EEG changes in neonatal animals exposed to GSM without pharmacological GABAergic reduction",
      },
    ],
    neuroTimeline: "Timeline",
    neuroFalsification: "Falsification criterion",
    neuroLocked: "Locked: 2026-08-26",
    neuroStatus: "LOCKED — awaiting test",
    metalTitle: "Heavy metal synergy & convergence predictions",
    metalLead: "Predictions derived from the convergence verification process, covering heavy metal × EMF synergy, pineal calcification, the photon→population chain, and intervention studies.",
    metalPredictions: [
      {
        id: "METAL-EMF-1",
        title: "Chelation therapy + EMF reduction produces superadditive health improvement in EHS patients",
        description: "Heavy metals (Cd²⁺, Pb²⁺) enter cells through EMF-opened VGCCs and mimic Ca²⁺ at calmodulin/CaMKII binding sites. Chelation removes metals; EMF reduction closes the entry pathway. Combined intervention should be superadditive. Test: RCT of chelation + EMF reduction vs. chelation alone vs. EMF reduction alone in EHS patients with elevated heavy metal levels. Prediction: combined group shows >50% improvement vs. <25% for either alone.",
        timeline: "Testable within 18 months (RCT with heavy metal panel + EHS symptom scores)",
        falsification: "No superadditive effect — chelation + EMF reduction equals sum of individual effects",
      },
      {
        id: "METAL-EMF-2",
        title: "PGC grade correlates with cumulative lifetime EMF exposure",
        description: "Pineal gland calcification (PGC) reduces melatonin production (r=0.569 for uncalcified tissue↔melatonin). EMF accelerates PGC via oxidative stress and Ca²⁺ deposition. Test: cross-sectional study correlating PGC volume (CT/MRI) with occupational EMF exposure history. Prediction: high-EMF occupations (electricians, telecom workers) have significantly higher PGC volume than matched low-EMF controls.",
        timeline: "Testable immediately (CT/MRI + occupational exposure questionnaire)",
        falsification: "No correlation between occupational EMF exposure history and PGC grade",
      },
      {
        id: "METAL-EMF-3",
        title: "Cadmium tissue levels are higher in high-EMF environments via Cav3.1 window current",
        description: "Cd²⁺ permeates through Cav3.1 T-type calcium channels (confirmed with radiolabeled ¹⁰⁹Cd²⁺). Cav3.1 has a window current near resting potential — EMF increases open probability → more Cd entry. Test: compare tissue Cd levels in workers with equal dietary/occupational Cd exposure but different EMF exposure. Prediction: high-EMF group has higher tissue Cd accumulation at equivalent external Cd levels.",
        timeline: "Testable within 12 months (occupational cohort with Cd biomonitoring + EMF dosimetry)",
        falsification: "No difference in tissue Cd levels between EMF-matched groups at equivalent external Cd exposure",
      },
      {
        id: "METAL-EMF-4",
        title: "MeHg neurotoxicity threshold is lower in high-EMF environments",
        description: "Methylmercury increases T-type Ca²⁺ currents; EMF independently opens VGCCs. Combined effect: double Ca²⁺ loading. Populations with both high MeHg (fish diet) and high EMF (urban) should show neurotoxicity at lower MeHg levels than high-MeHg + low-EMF populations. Test: compare neurodevelopmental outcomes in Faroe Islands (high MeHg, low EMF) vs. urban Japan (high MeHg, high EMF) at equivalent MeHg exposure. Prediction: urban Japan shows effects at lower MeHg thresholds.",
        timeline: "Testable immediately (existing Faroe Islands and Japanese cohort data)",
        falsification: "No difference in MeHg neurotoxicity threshold between high-EMF and low-EMF populations",
      },
      {
        id: "CHAIN-1",
        title: "Ca²⁺ channel blocker prevents EMF-induced sleep effects (ETH nimodipine-5G)",
        description: "The VGCC hypothesis predicts that blocking the Ca²⁺ channel should prevent ALL downstream EMF effects. [[ref:sousouri2025|Sousouri 2025]] showed CACNA1C genotype determines 5G sleep response. Test: ETH Zürich nimodipine-5G follow-up — administer nimodipine (L-type Ca²⁺ blocker) before 5G exposure and measure sleep EEG. Prediction: nimodipine abolishes the genotype-dependent sleep EEG changes seen in the original study.",
        timeline: "Testable within 12 months (RCT extension of [[ref:sousouri2025|Sousouri 2025]] protocol)",
        falsification: "Nimodipine does NOT prevent EMF-induced sleep EEG changes → VGCC is not the primary target → entire BERM cascade must be reconsidered",
      },
      {
        id: "CHAIN-2",
        title: "Amish communities show different chronic disease trends than mainstream population",
        description: "Amish communities have minimal EMF exposure (no grid electricity, no wireless devices), high co-sleeping, high breastfeeding. If EMF is a significant driver of chronic disease trends, Amish should show divergent trajectories for BERM-predicted conditions. Test: compare age-adjusted incidence trends (1990→2025) for T2D, obesity, autism, ADHD, depression, myopia, SIDS in Amish vs. general US population. Prediction: Amish show stable or declining rates where the general population shows increase.",
        timeline: "Testable immediately (Amish health registries + CDC NHANES comparison)",
        falsification: "Amish communities show the same chronic disease trend increases as the general US population",
      },
      {
        id: "CHAIN-3",
        title: "EMF reduction intervention produces measurable health improvement in a controlled study",
        description: "This is BERM's critical missing piece: interventional verification. All current evidence is observational or mechanistic. Test: RCT of comprehensive EMF reduction (shielded sleeping environment, wired devices, no LED at night) in symptomatic individuals for 3 months. Measure: CaMKII Thr286 phosphorylation in lymphocytes, sleep quality (actigraphy), melatonin (urine 6-sulfatoxymelatonin), blood pressure. Prediction: EMF reduction group shows significant improvement in all four biomarkers.",
        timeline: "Testable within 12 months (RCT with biomarker panel)",
        falsification: "No improvement in any biomarker after comprehensive EMF reduction → EMF exposure has no measurable health impact → model lacks clinical relevance",
      },
      {
        id: "CHAIN-4",
        title: "Walker sleep chain: EMF→melatonin↓→sleep↓→GABA↓→Q↑ measured as complete cascade",
        description: "Feedback loop 4 predicts a cascading cycle: EMF suppresses melatonin → sleep deteriorates → GABA tonic inhibition decreases → Q-factor increases → brain becomes MORE sensitive to EMF → further melatonin suppression. Test: longitudinal study measuring evening EMF exposure, overnight melatonin (saliva), sleep quality (PSG), morning GABA (MRS spectroscopy), and EEG coherence (Q proxy) over 4 weeks. Prediction: initial EMF exposure produces self-amplifying deterioration across all measures.",
        timeline: "Testable within 6 months (longitudinal PSG + MRS + EEG protocol)",
        falsification: "No self-amplifying cascade — EMF effects on sleep/melatonin/GABA remain constant rather than progressively worsening",
      },
    ],
    metalTimeline: "Timeline",
    metalFalsification: "Falsification criterion",
    metalLocked: "Locked: 2026-08-26",
    metalStatus: "LOCKED — awaiting test",
    mechTitle: "Mechanistic chain predictions",
    mechLead: "Predictions from newly verified intermediate layers: blood-brain barrier, brown adipose tissue, HPA axis, β-cell insulin dynamics, hypothalamic nexus, cortisol-hippocampus, Leydig cell, and mast cell degranulation.",
    mechPredictions: [
      {
        id: "BBB-EMF-1",
        title: "EMF increases BBB permeability; melatonin supplementation prevents it",
        description: "RF-EMF (27.12 MHz) increases BBB permeability via eNOS↑ and occludin↓. Melatonin protects tight junction proteins (occludin, claudin-5, ZO-1). Test: measure BBB permeability (gadolinium-enhanced MRI) during RF exposure with and without melatonin pre-treatment. Prediction: melatonin pre-treatment prevents EMF-induced BBB opening.",
        timeline: "Testable within 12 months (MRI + melatonin RCT)",
        falsification: "Melatonin does NOT prevent EMF-induced BBB permeability changes",
      },
      {
        id: "BBB-EMF-2",
        title: "Heavy metal brain accumulation higher in high-EMF populations via BBB opening",
        description: "EMF opens BBB → heavy metals (Pb, Cd, MeHg) enter brain more easily. EMF also suppresses melatonin → BBB protection↓ → DOUBLE vulnerability. Test: compare brain heavy metal accumulation (post-mortem or CSF) between high-EMF occupations and matched low-EMF controls with equivalent peripheral heavy metal levels. Prediction: high-EMF group has higher brain metal levels at equivalent blood levels.",
        timeline: "Testable within 18 months (occupational cohort with CSF/autopsy samples)",
        falsification: "No difference in brain heavy metal accumulation between EMF-exposure groups at equivalent blood levels",
      },
      {
        id: "BAT-EMF-1",
        title: "5G reduces BAT PRDM16 expression and thermogenesis in rodents",
        description: "5G (3.5 GHz) → PRDM16 mRNA↓ + C/EBPβ mRNA↓ in brown adipose tissue. BAT uses Ca²⁺ cycling (SERCA) for energy expenditure. Test: expose rodents to 5G and measure BAT PRDM16 protein, thermogenic capacity (cold challenge), and energy expenditure. Prediction: 5G-exposed animals show reduced cold-induced thermogenesis and weight gain on identical caloric intake.",
        timeline: "Testable within 6 months (rodent model with metabolic cages)",
        falsification: "No change in BAT thermogenesis or weight in 5G-exposed vs control animals on identical diet",
      },
      {
        id: "HPA-EMF-1",
        title: "Chronic EMF elevates hair cortisol in exposed workers",
        description: "EMF sets a new HPA axis setpoint with sensitization rather than adaptation. Chronic exposure → sustained cortisol elevation + adrenal hypertrophy. Test: measure hair cortisol (3-month integrated cortisol) in telecom workers vs matched office workers. Prediction: telecom workers show significantly higher hair cortisol after controlling for perceived stress and lifestyle factors.",
        timeline: "Testable immediately (hair cortisol + occupational exposure questionnaire)",
        falsification: "No difference in hair cortisol between high-EMF and low-EMF occupation groups",
      },
      {
        id: "HPA-EMF-2",
        title: "EMF produces adrenal hypertrophy measurable by imaging",
        description: "Animal studies show EMF → ACTH↑ + corticosterone↑ + adrenal hypertrophy. This anatomical change should be detectable in chronically exposed humans. Test: compare adrenal gland volume (CT/MRI) in workers with >10 years high-EMF exposure vs matched controls. Prediction: high-EMF group has significantly larger adrenal glands.",
        timeline: "Testable immediately (retrospective imaging study)",
        falsification: "No adrenal volume difference between chronic high-EMF and low-EMF occupation groups",
      },
      {
        id: "BETA-EMF-1",
        title: "EMF disrupts glucose-stimulated insulin secretion via Ca²⁺ channel activation",
        description: "Electric fields can induce insulin secretion WITHOUT glucose. ELF-EMF alters glucose-stimulated insulin dynamics. CaVγ4→CaMKII→MafA pathway: CaMKII dysregulation → β-cell maturity loss. Test: measure insulin secretion dynamics (first-phase insulin response) in EMF-exposed vs control subjects during OGTT. Prediction: EMF-exposed group shows blunted first-phase insulin with elevated basal insulin.",
        timeline: "Testable within 12 months (OGTT study with EMF exposure history)",
        falsification: "No difference in insulin secretion dynamics between EMF-exposure groups",
      },
      {
        id: "BETA-EMF-2",
        title: "Verapamil protects β-cells from EMF-induced dysfunction",
        description: "Verapamil (L-type Ca²⁺ blocker) protects β-cells and improves T1D outcomes ([[ref:verap_t1d_jama|JAMA 2023]]). If EMF damages β-cells via Ca²⁺ channels, verapamil should also prevent EMF-induced β-cell dysfunction. Test: expose β-cell cultures to EMF with/without verapamil; measure insulin secretion and MafA expression. Prediction: verapamil prevents EMF-induced insulin secretion changes and MafA↓.",
        timeline: "Testable within 6 months (in vitro β-cell culture)",
        falsification: "Verapamil does NOT prevent EMF-induced β-cell dysfunction → Ca²⁺ channel is not the primary mechanism",
      },
      {
        id: "HYPO-EMF-1",
        title: "Chronic EMF reduces hypothalamic synaptic vesicle density",
        description: "835 MHz (12 weeks) reduces synaptic vesicle number, size, and docking in hypothalamus, plus synapsin I/II↓ and synaptotagmin 1↓. Synaptotagmin 1 is the Ca²⁺ sensor for vesicle release. Its loss means ALL hypothalamic hormone release is impaired. Test: replicate [[ref:kim2019_hypothalamus|Kim 2019]] with additional hormone panel (GnRH, CRH, TRH, GHRH, dopamine). Prediction: multi-hormone deficit pattern matching BERM predictions.",
        timeline: "Testable within 12 months (rodent model with hypothalamic dissection + hormone panel)",
        falsification: "No synaptic vesicle changes and no multi-hormone deficit after chronic RF exposure",
      },
      {
        id: "HYPO-EMF-2",
        title: "EMF produces simultaneous T↓ + cortisol↑ + GH↓ via hypothalamic disruption",
        description: "If EMF disrupts hypothalamic synaptic transmission broadly (VK13), ALL hormone axes should be affected simultaneously. The triple lock (T↓ × cortisol↑ × DA↓) should be accompanied by GH↓ and thyroid changes. Test: measure full hormone panel (T, LH, cortisol, ACTH, GH, IGF-1, TSH, fT4, dopamine) in chronic EMF-exposed vs controls. Prediction: coherent multi-axis disruption pattern.",
        timeline: "Testable immediately (occupational cohort with comprehensive hormone panel)",
        falsification: "EMF-exposed group shows changes in only one hormonal axis rather than coordinated multi-axis disruption",
      },
      {
        id: "MAST-EMF-1",
        title: "EMF triggers mast cell degranulation measurable by serum tryptase",
        description: "Ca²⁺ is the primary trigger for mast cell degranulation. EMF → VGCC → Ca²⁺ → mast cell releases histamine + IL-1β + tryptase. [[ref:johansson2000_mast|Johansson 2000]] showed mast cell changes in skin biopsies after display terminal exposure. Test: measure serum tryptase (specific mast cell degranulation marker) before and after standardized EMF exposure. Prediction: acute EMF exposure produces measurable tryptase elevation.",
        timeline: "Testable within 3 months (blood draw + EMF exposure, simple protocol)",
        falsification: "No tryptase elevation after EMF exposure",
      },
      {
        id: "MAST-EMF-2",
        title: "Mast cell stabilizers prevent EMF-induced skin and systemic reactions",
        description: "If EMF symptoms are partly mediated by mast cell degranulation, mast cell stabilizers (cromolyn sodium, ketotifen) should prevent them. Test: RCT of cromolyn + EMF exposure vs placebo + EMF exposure in EHS patients. Measure: skin reactions, systemic symptoms, serum histamine/tryptase. Prediction: cromolyn group shows significantly fewer symptoms and lower histamine/tryptase.",
        timeline: "Testable within 6 months (RCT with existing approved drugs)",
        falsification: "Mast cell stabilizers do NOT reduce EMF-induced symptoms",
      },
      {
        id: "KCC2-EMF-1",
        title: "Prenatal EMF exposure delays GABA excitatory→inhibitory switch in offspring",
        description: "Environmental disruptions (stress, inflammation) delay KCC2 maturation → GABA stays excitatory longer → Q-factor elevated longer → wider vulnerability window. IL-1β (from mast cells or glia) → KCC2↓. ROS → KCC2↓. EMF → both ROS and IL-1β. Test: expose pregnant rodents to EMF; measure KCC2/NKCC1 ratio in offspring hippocampus at P7, P14, P21. Prediction: EMF-exposed offspring show delayed KCC2 switch.",
        timeline: "Testable within 9 months (rodent prenatal exposure model)",
        falsification: "No difference in KCC2 maturation timeline between EMF-exposed and control offspring",
      },
      {
        id: "TRIPLE-1",
        title: "T↓ × cortisol↑ × DA↓ triple deficit measurable in high-EMF populations",
        description: "The triple lock theory predicts that EMF simultaneously reduces testosterone (HPG), elevates cortisol (HPA), and reduces dopamine (mesolimbic). Each has been verified independently; the prediction is that they co-occur in the SAME individuals proportional to EMF exposure. Test: measure T, cortisol, and urinary HVA (dopamine metabolite) in high vs low EMF occupations. Prediction: triple deficit pattern (T↓ + cortisol↑ + HVA↓) correlates with cumulative EMF exposure.",
        timeline: "Testable immediately (occupational cohort with hormone + neurotransmitter panel)",
        falsification: "The three deficits do not co-occur — they are independent of each other and of EMF exposure",
      },
      {
        id: "HIPPO-1",
        title: "Chronic EMF exposure correlates with hippocampal volume loss",
        description: "EMF → cortisol↑ → hippocampal dendritic retraction + neurogenesis↓ → volume loss. Hippocampus is also the HPA negative feedback center — its damage removes cortisol braking → cortisol↑↑ (feedback loop S9). Test: compare hippocampal volume (MRI volumetry) in workers with >10 years high-EMF exposure vs matched controls, controlling for age, stress, depression. Prediction: high-EMF group shows reduced hippocampal volume.",
        timeline: "Testable immediately (retrospective MRI volumetry study)",
        falsification: "No hippocampal volume difference between chronic high-EMF and low-EMF occupation groups after controlling for confounders",
      },
      {
        id: "KLIM-1",
        title: "EMF reduction reverses BAT suppression measurable by thermal imaging",
        description: "If EMF → PRDM16↓ → BAT↓ → thermogenesis↓ → weight gain, then EMF reduction should restore BAT function. Test: measure supraclavicular BAT activity (infrared thermography after cold challenge) before and after 3-month EMF reduction protocol. Prediction: EMF reduction group shows increased BAT thermogenesis and modest weight loss without dietary change.",
        timeline: "Testable within 6 months (thermal imaging + EMF reduction protocol)",
        falsification: "No change in BAT thermogenesis after EMF reduction",
      },
    ],
    mechTimeline: "Timeline",
    mechFalsification: "Falsification criterion",
    mechLocked: "Locked: 2026-08-26",
    mechStatus: "LOCKED — awaiting test",
    suppTitle: "Supplementary layer predictions (VK17–25)",
    suppLead: "Predictions from newly verified layers: sperm Ca²⁺/CatSper, circadian clock, dopamine motivation, OPC myelination, NK cell immunity, HPA-HPG cross-suppression, BDNF hormesis, gut-brain axis, and the Walker sleep-testosterone link.",
    suppPredictions: [
      {
        id: "E-NEW-1",
        title: "Sperm CatSper Ca²⁺ response is EMF-exposure dependent",
        description: "CatSper channels in sperm activate prematurely under RF-EMF, causing energy depletion before reaching the egg (‘premature energy expenditure’). Test: dose-response study of CatSper activation vs SAR level in human sperm samples. Prediction: CatSper activation increases with SAR; sperm exposed to mobile-phone-level RF show premature hyperactivation and reduced fertilization capacity.",
        timeline: "Testable within 6 months (in vitro sperm + RF exposure)",
        falsification: "No dose-dependent relationship between SAR and CatSper activation",
      },
      {
        id: "E-NEW-2",
        title: "GnIH antagonist protects testosterone during EMF exposure",
        description: "Cortisol↑ → GnIH↑ → GnRH↓ → T↓ is a verified cross-suppression pathway. RF9 (GnIH antagonist) restored T in cortisol-treated primates. Test: expose rodents to chronic EMF with/without RF9-type GnIH antagonist. Prediction: GnIH antagonist prevents EMF-induced T decline, confirming HPA-HPG cross-suppression as the mechanism.",
        timeline: "Testable within 12 months (rodent model with pharmacological intervention)",
        falsification: "GnIH antagonist does NOT prevent EMF-induced testosterone decline",
      },
      {
        id: "E-NEW-3",
        title: "Chronic RF alters OPC Cav1.2 expression and myelination timing",
        description: "Cav1.2 is essential for OPC differentiation and myelination. SMF increases Cav1.2 in OPCs. Chronic RF may dysregulate Cav1.2 in developing brain → myelination timing disruption → white matter integrity↓. Test: expose developing rodent brains to chronic RF; measure Cav1.2 expression in OPCs and myelination markers (MBP, PLP) at developmental timepoints. Prediction: RF-exposed animals show altered myelination timing.",
        timeline: "Testable within 12 months (developmental rodent model)",
        falsification: "No change in OPC Cav1.2 expression or myelination timing after chronic RF",
      },
      {
        id: "E-NEW-4",
        title: "200 kHz intermediate frequency INCREASES NK cell activity",
        description: "TTFields (200 kHz) increase NK cytotoxicity while 50 Hz ELF suppresses it — direct validation of BERM’s frequency-dependent pathway hierarchy. Test: compare NK cell cytotoxicity across ELF (50 Hz), RF (900 MHz, 2.4 GHz), and IF (200 kHz) exposures. Prediction: IF range shows NK activation while ELF and RF show suppression — different frequencies, different biological outcomes via the same VGCC mechanism.",
        timeline: "Testable within 6 months (in vitro NK cell assay across frequencies)",
        falsification: "All frequencies produce the same NK cell response direction",
      },
      {
        id: "E-NEW-5",
        title: "Gut Per2 expression correlates with EMF exposure",
        description: "Per2 knockout disrupts gut barrier → LPS enters bloodstream → neuroinflammation → depression. EMF disrupts circadian rhythm → Per2↓. Test: measure Per2 expression in gut epithelial biopsies of shift workers (circadian disruption proxy) vs day workers, correlated with EMF exposure history and serum LPS levels. Prediction: EMF/circadian disruption → Per2↓ → elevated serum LPS.",
        timeline: "Testable within 12 months (occupational cohort with gut biopsies)",
        falsification: "No correlation between EMF exposure and gut Per2 expression or serum LPS",
      },
      {
        id: "E-NEW-6",
        title: "Sleep restriction + EMF produces superadditive testosterone decline",
        description: "5h sleep → T -10-15% ([[ref:leproult2011_testosterone_sleep|JAMA 2011]]). EMF → T↓ via three routes (VK13, VK15, VK22). Combined sleep restriction + EMF should produce GREATER T decline than either alone (superadditive). Test: 2×2 factorial RCT: normal sleep/restricted sleep × low EMF/high EMF. Measure T at baseline and after 1 week. Prediction: interaction term is significant — combined group shows >25% T decline vs ~15% for sleep alone.",
        timeline: "Testable within 3 months (controlled sleep + EMF study)",
        falsification: "No interaction effect — sleep and EMF effects on T are purely additive",
      },
      {
        id: "E-NEW-7",
        title: "RF-exposed children have lower BDNF and dendritic spine density",
        description: "RF 835 MHz (postnatal) reduces BDNF in CA1 and dentate gyrus with dendritic spine loss and memory impairment ([[ref:bdnf_rf_dev_2021|PMC8159076]]). Meanwhile ELF increases BDNF (hormesis). Test: measure serum BDNF in children stratified by personal RF exposure (phone use, WiFi proximity). Prediction: higher RF exposure correlates with lower BDNF and poorer spatial memory scores.",
        timeline: "Testable within 12 months (pediatric cohort with EMF dosimetry)",
        falsification: "No correlation between RF exposure and BDNF levels in children",
      },
      {
        id: "E-NEW-8",
        title: "Gut barrier permeability (LPS marker) correlates with EMF exposure",
        description: "EMF → melatonin↓ → Per2↓ in gut → barrier disruption → LPS enters bloodstream → systemic inflammation. Gut barrier uses the SAME tight junction proteins as BBB (ZO-1, occludin, claudins), and melatonin protects both. Test: measure serum LPS-binding protein and zonulin (gut permeability markers) in high-EMF vs low-EMF occupation workers. Prediction: high-EMF group has elevated gut permeability markers.",
        timeline: "Testable immediately (occupational cohort with blood draw)",
        falsification: "No difference in gut permeability markers between EMF exposure groups",
      },
    ],
    suppTimeline: "Timeline",
    suppFalsification: "Falsification criterion",
    suppLocked: "Locked: 2026-08-26",
    suppStatus: "LOCKED — awaiting test",
    finalTitle: "Final layer predictions (VK26–31)",
    finalLead: "Predictions from the final convergence layers: thyroid Dio2/Dio3, epigenetic transgenerational inheritance, telomere aging spiral, oxytocin Ca²⁺ disruption, ELF-priming chronic pain, and ASD as BERM prototype.",
    finalPredictions: [
      {
        id: "E-NEW-9",
        title: "Hidden hypothyroid: FT3/FT4 ratio is lower in high-EMF workers",
        description: "EMF reduces hypothalamic Dio2/Dio3 → T4→T3 conversion is inhibited → blood T4 appears 'normal' but tissues don't receive T3. Test: measure FT3/FT4 ratio in high-EMF occupations (telecom, electricians) vs matched low-EMF controls. Prediction: high-EMF group has significantly lower FT3/FT4 ratio despite normal TSH and T4.",
        timeline: "Testable immediately (occupational cohort with blood draw)",
        falsification: "No difference in FT3/FT4 ratio between EMF exposure groups",
      },
      {
        id: "E-NEW-10",
        title: "Transgenerational sperm methylation persists to F3",
        description: "EMF alters sperm epigenome dose-dependently (1 mT: methylation↓, 3 mT: methylation↑). If EMF effects follow the DDT transgenerational model, methylation changes should persist to F3. Test: expose F0 rodents to chronic EMF; analyze sperm methylation profiles in F1, F2, F3. Prediction: F3 sperm methylation retains EMF-signature from F0 exposure. BERM's HIGHEST PRIORITY research proposal.",
        timeline: "Testable within 18-24 months (multigenerational rodent study)",
        falsification: "F3 sperm methylation is indistinguishable from controls",
      },
      {
        id: "E-NEW-11",
        title: "EMF exposure duration correlates with telomere shortening",
        description: "EMF→ROS↑ + melatonin↓→telomerase↓ + SIRT1↓ should accelerate telomere shortening. Test: measure leukocyte telomere length in occupational EMF cohort stratified by exposure years. Control for age, smoking, BMI. Prediction: cumulative EMF exposure correlates with shorter telomeres after controlling for confounders.",
        timeline: "Testable immediately (occupational cohort with blood draw)",
        falsification: "No correlation between EMF exposure duration and telomere length",
      },
      {
        id: "E-NEW-12",
        title: "Melatonin supplementation slows telomere shortening in high-EMF population",
        description: "Melatonin activates telomerase + SIRT1 (anti-aging). EMF→melatonin↓ removes this protection. Test: RCT of melatonin supplementation (3-5 mg/night, 12 months) in high-EMF workers. Measure telomere length at baseline and 12 months. Prediction: melatonin group shows significantly less telomere shortening than placebo.",
        timeline: "Testable within 12 months (supplementation RCT)",
        falsification: "Melatonin supplementation does not affect telomere attrition rate",
      },
      {
        id: "E-NEW-13",
        title: "Oxytocin levels inversely correlate with EMF exposure",
        description: "Oxytocin release is directly VGCC-dependent (N-type + L-type Ca²⁺ channels). EMF disrupts VGCC → OXT release disrupted. Test: measure salivary or plasma oxytocin in controlled EMF exposure study (pre/post acute exposure). Prediction: acute EMF exposure reduces oxytocin response to social stimuli.",
        timeline: "Testable within 6 months (controlled lab study)",
        falsification: "No change in oxytocin levels after EMF exposure",
      },
      {
        id: "E-NEW-14",
        title: "ELF-exposed animals show α2δ-1↑ WITHOUT nerve injury",
        description: "ELF-priming (VK4) upregulates VGCC expression including α2δ-1 subunits. α2δ-1 overexpression alone produces neuropathic pain behavior WITHOUT nerve injury. Test: expose rodents to chronic ELF (50 Hz, 8-10 days); measure α2δ-1 expression in DRG and spinal dorsal horn. Prediction: ELF produces α2δ-1 upregulation and pain-like behavior without nerve damage.",
        timeline: "Testable within 6 months (rodent ELF exposure model)",
        falsification: "No change in α2δ-1 expression after chronic ELF exposure",
      },
      {
        id: "E-NEW-15",
        title: "ASD children's NKCC1/KCC2 ratio correlates with prenatal EMF",
        description: "NKCC1/KCC2 ratio is elevated in ASD (GABA stays excitatory). EMF disrupts KCC2 maturation via IL-1β (S9) and ROS. Test: measure plasma NKCC1/KCC2 ratio in ASD children; correlate with maternal prenatal EMF exposure history (occupation, device use, residential proximity to base stations). Prediction: higher prenatal EMF correlates with higher NKCC1/KCC2 ratio in ASD cases.",
        timeline: "Testable within 12 months (case-control with maternal history)",
        falsification: "No correlation between prenatal EMF exposure and NKCC1/KCC2 ratio",
      },
      {
        id: "E-NEW-16",
        title: "Bumetanide + EMF reduction outperforms either alone for ASD",
        description: "Bumetanide blocks NKCC1 → restores inhibitory GABA. EMF reduction removes the upstream driver of KCC2↓. Together they should be superadditive. Test: 2×2 RCT in ASD children: bumetanide/placebo × EMF reduction/standard. Measure CARS score, SRS, sensory sensitivity. Prediction: combined group shows significantly better improvement than either intervention alone.",
        timeline: "Testable within 12 months (pediatric 2×2 RCT)",
        falsification: "No interaction effect — bumetanide and EMF reduction are purely additive",
      },
    ],
    finalTimeline: "Timeline",
    finalFalsification: "Falsification criterion",
    finalLocked: "Locked: 2026-08-26",
    finalStatus: "LOCKED — awaiting test",
    extTitle: "Extended layer predictions (VK41–50)",
    extLead: "Predictions from the extended convergence layers: ADHD as second prototype, ALS calcium vulnerability, gut-brain serotonin, allergy epidemic, vitamin D as natural channel blocker, PEMF hormesis paradox, and reproductive arc completion.",
    extPredictions: [
      {
        id: "E-NEW-24",
        title: "ADHD children's PFC myelination correlates with prenatal EMF",
        description: "ADHD shows 5-year PFC maturation delay ([[ref:adhd_pfc_delay|Shaw 2007 PNAS]]). EMF disrupts OPC myelination via Cav1.2 (VK20) and reduces DA in PFC. Test: DTI white matter integrity in PFC of ADHD children correlated with prenatal/neonatal EMF exposure history. Prediction: higher prenatal EMF correlates with delayed PFC myelination markers.",
        timeline: "Testable within 12 months (pediatric cohort with DTI + maternal history)",
        falsification: "No correlation between prenatal EMF exposure and PFC myelination timing",
      },
      {
        id: "E-NEW-25",
        title: "EMF occupational exposure correlates with ALS risk",
        description: "Motor neurons have low Ca²⁺ buffering + Ca²⁺-permeable AMPA receptors making them selectively vulnerable to Ca²⁺ overload. Multiple meta-analyses show OR 1.3-1.7 for electrical workers. Test: pooled analysis of existing occupational cohorts controlling for confounders. Prediction: EMF exposure is an independent ALS risk factor (OR > 1.2).",
        timeline: "Testable immediately (existing meta-analyses support, need pooled re-analysis)",
        falsification: "Pooled analysis controlling for all confounders shows OR < 1.1",
      },
      {
        id: "E-NEW-26",
        title: "Gut microbiome composition changes with EMF exposure",
        description: "90%+ of serotonin is produced in gut enterochromaffin cells. EMF→circadian disruption→Per2↓→gut barrier↓ (S14) should alter microbiome. Test: 16S rRNA sequencing of gut microbiome in EMF-exposed vs controls. Prediction: EMF exposure shifts microbiome composition, specifically reducing 5-HT-producing species (Lactobacillus, Bifidobacterium).",
        timeline: "Testable within 6 months (occupational cohort with stool samples)",
        falsification: "No significant microbiome composition difference between groups",
      },
      {
        id: "E-NEW-27",
        title: "Mast cell degranulation threshold is lower in EMF-exposed individuals",
        description: "Mast cell degranulation is Ca²⁺-dependent. EMF→VGCC→Ca²⁺ should lower the activation threshold. Test: in vitro mast cell degranulation assay comparing cells from EMF-exposed vs control subjects, measuring histamine release threshold. Prediction: mast cells from EMF-exposed individuals degranulate at lower stimulation thresholds.",
        timeline: "Testable within 6 months (in vitro assay with patient-derived mast cells)",
        falsification: "No difference in degranulation threshold between groups",
      },
      {
        id: "E-NEW-28",
        title: "Vitamin D supplementation reduces EMF-induced VGCC upregulation",
        description: "Vitamin D (1,25(OH)₂D₃) downregulates CACNA1C/1D mRNA ([[ref:vdh_lvscc|J Neurosci 2001]]). Vitamin D deficiency → VGCC over-expression = same state as ELF-priming (VK4). Test: measure VGCC expression in PBMCs before/after vitamin D supplementation in deficient individuals. Prediction: vitamin D repletion reduces VGCC protein expression.",
        timeline: "Testable within 6 months (supplementation study with PBMC analysis)",
        falsification: "Vitamin D repletion does not change VGCC expression levels",
      },
      {
        id: "E-NEW-29",
        title: "Vitamin D status modulates individual EMF sensitivity",
        description: "Low vitamin D → VGCC over-expressed → more Ca²⁺ per EMF photon = higher EMF sensitivity. Test: correlate vitamin D status with EMF-induced biomarker changes (CaMKII Thr286, sleep EEG) in controlled exposure study. Prediction: vitamin D-deficient individuals show larger EMF-induced biomarker changes.",
        timeline: "Testable within 12 months (controlled EMF exposure stratified by vitamin D status)",
        falsification: "No correlation between vitamin D status and magnitude of EMF biomarker response",
      },
      {
        id: "E-NEW-30",
        title: "PEMF therapy parameters map to Ca²⁺ hormesis curve",
        description: "PEMF promotes bone growth at specific parameters while chronic EMF causes harm. Both operate through Ca²⁺ channels. Test: measure Ca²⁺ signaling in osteoblasts across PEMF parameter space (frequency, intensity, duration). Prediction: optimal PEMF parameters correspond to the Lindgren χ-parameter hormesis peak; deviation in either direction reduces benefit.",
        timeline: "Testable within 12 months (in vitro osteoblast Ca²⁺ dose-response)",
        falsification: "PEMF effects do not follow a hormesis curve through Ca²⁺ channels",
      },
      {
        id: "E-NEW-31",
        title: "Schizophrenia risk highest with CACNA1C variant + low vitamin D + high EMF",
        description: "Triple hit: CACNA1C risk variant (genetic) + vitamin D deficiency (→VGCC↑) + EMF exposure (→Ca²⁺↑) should produce highest schizophrenia risk. Test: genotype CACNA1C + measure vitamin D + estimate EMF exposure in schizophrenia case-control study. Prediction: three-way interaction is significant — triple-hit individuals have highest odds ratio.",
        timeline: "Testable within 12 months (case-control with genotyping + biomarkers)",
        falsification: "No significant three-way interaction between CACNA1C genotype, vitamin D, and EMF",
      },
    ],
    extTimeline: "Timeline",
    extFalsification: "Falsification criterion",
    extLocked: "Locked: 2026-08-26",
    extStatus: "LOCKED — awaiting test",
    ultTitle: "Final integration predictions (VK51–56)",
    ultLead: "Predictions from the final convergence integration: CatSper temperature gating, psilocybin Ca²⁺ reset, caffeine-Parkinson's dose-response, lithium water neuroprotection, amygdala-anxiety feedback loop, and Amish control group validation.",
    ultPredictions: [
      {
        id: "E-NEW-32",
        title: "CatSper premature activation threshold correlates with EMF exposure",
        description: "CatSper is temperature-gated (threshold 33.5°C, Q₁₀=5.1). EMF→Ca²⁺ could lower the thermal activation threshold. Test: measure CatSper activation temperature in sperm from men with different occupational EMF exposure levels. Prediction: higher EMF exposure correlates with lower CatSper activation threshold.",
        timeline: "Testable within 6 months (in vitro CatSper electrophysiology)",
        falsification: "No correlation between EMF history and CatSper activation temperature",
      },
      {
        id: "E-NEW-33",
        title: "Psilocybin reverses EMF-induced dendritic atrophy in hippocampus",
        description: "Psilocybin promotes dendritic spine growth via 5-HT2A→Ca²⁺→BDNF→mTOR (VK52). EMF→cortisol→hippocampal dendritic atrophy (VK14). Test: chronic EMF exposure → dendritic loss, then single psilocybin dose → measure dendritic recovery. Prediction: psilocybin reverses EMF-induced hippocampal dendritic loss.",
        timeline: "Testable within 12 months (rodent model: EMF exposure + psilocybin rescue)",
        falsification: "Psilocybin does not restore dendritic density after EMF-induced loss",
      },
      {
        id: "E-NEW-34",
        title: "Caffeine consumption inversely correlates with EMF biomarker response",
        description: "Caffeine blocks A2A receptors → reduces neuroinflammation → Ca²⁺ modulation. Regular caffeine consumers should show attenuated EMF biomarker responses. Test: controlled EMF exposure, stratify by caffeine consumption. Prediction: habitual caffeine consumers show smaller CaMKII Thr286 and sleep EEG changes from EMF.",
        timeline: "Testable within 6 months (add caffeine stratification to existing protocols)",
        falsification: "No difference in EMF biomarkers between caffeine consumers and non-consumers",
      },
      {
        id: "E-NEW-35",
        title: "Drinking water lithium inversely correlates with EMF-associated health outcomes",
        description: "Lithium modulates GSK-3β and CaMKII — key nodes in the BERM Ca²⁺ cascade. Areas with higher natural lithium in drinking water should show attenuated EMF health effects. Test: correlate drinking water lithium with EMF-associated disease incidence (dementia, suicide, depression) at county level. Prediction: interaction term (lithium × EMF) is significant and protective.",
        timeline: "Testable immediately (existing county-level data for lithium, EMF infrastructure, disease rates)",
        falsification: "No interaction between water lithium levels and EMF-associated health outcomes",
      },
      {
        id: "E-NEW-36",
        title: "Amygdala volume increases with chronic EMF exposure",
        description: "EMF→cortisol↑ (VK11) → amygdala BLA hypertrophy (VK55). Chronically elevated cortisol from EMF should produce measurable amygdala enlargement. Test: MRI volumetric analysis in high-EMF occupational workers vs matched controls. Prediction: amygdala volume is significantly larger in high-EMF group.",
        timeline: "Testable within 12 months (occupational cohort with MRI)",
        falsification: "No amygdala volume difference between high-EMF and low-EMF workers",
      },
      {
        id: "E-NEW-37",
        title: "Amish chronic disease gradient follows EMF exposure gradient",
        description: "Old Order Amish (no electricity) → Conservative Amish (some electricity) → Mennonite (modern electricity) → general population. Test: compare chronic disease rates across this cultural gradient. Prediction: disease rates increase monotonically with EMF exposure level, even after controlling for diet, exercise, and lifestyle factors.",
        timeline: "Testable within 12 months (cross-sectional comparison of existing health registries)",
        falsification: "Disease gradient does not follow EMF exposure after controlling for lifestyle confounders",
      },
      {
        id: "E-NEW-38",
        title: "Amish dairy cows have better fertility than modern dairy cows",
        description: "Amish dairy farms have minimal EMF. If EMF affects bovine reproduction through the same Ca²⁺ mechanisms, Amish-farm cows should show better fertility. Test: compare conception rates, services per conception, hormone profiles in Amish vs modern dairy. Prediction: Amish-farm cows have significantly better fertility despite same breeds.",
        timeline: "Testable within 6 months (existing agricultural data + hormone sampling)",
        falsification: "No fertility difference between Amish and modern dairy cows of same breed",
      },
      {
        id: "E-NEW-39",
        title: "Modern water filtration reduces lithium → increased neuropsychiatric disease",
        description: "Modern water treatment removes trace lithium. Areas that switched to advanced filtration should show increased dementia/suicide rates after the switch. Test: before-after analysis of water treatment upgrades and neuropsychiatric outcomes. Prediction: advanced filtration introduction correlates with subsequent increase in dementia and suicide rates.",
        timeline: "Testable immediately (municipal water treatment records + health data)",
        falsification: "No change in neuropsychiatric outcomes after water treatment upgrades that remove lithium",
      },
    ],
    ultTimeline: "Timeline",
    ultFalsification: "Falsification criterion",
    ultLocked: "Locked: 2026-08-26",
    ultStatus: "LOCKED — awaiting test",
    ttypeTitle: "T-Type Channel Predictions",
    ttypeLead: "Testable predictions from the T-type calcium channel bifurcation mechanism.",
    ttypePredictions: [
      {
        id: "TTYPE-1",
        title: "EMF effects on testosterone are mediated primarily by T-type, not L-type channels",
        description: "Expose Leydig cell cultures to standardized EMF (ELF-modulated RF). Measure testosterone under three conditions: (1) Control, (2) + nifedipine (L-type blocker) isolates T-type contribution, (3) + ethosuximide (T-type blocker) isolates L-type contribution. Prediction: ethosuximide abolishes MORE of the EMF effect than nifedipine.",
        timeline: "Testable within 3–6 months (in vitro, Leydig cell culture)",
        falsification: "Nifedipine alone abolishes all EMF-induced testosterone change (no T-type contribution), or ethosuximide blocks less of the EMF effect than nifedipine",
      },
      {
        id: "TTYPE-2",
        title: "Modulated signals produce larger T-type effects than continuous wave at same SAR",
        description: "Expose Leydig cells to: (1) CW at 900 MHz, (2) same carrier amplitude-modulated at 16 Hz (Adey frequency), (3) same carrier modulated at 217 Hz (GSM). Same time-averaged SAR. Prediction: modulated signals produce LARGER effects because the ELF modulation envelope passes through membrane capacitance while the carrier does not.",
        timeline: "Testable within 3–6 months (in vitro, Leydig cell culture)",
        falsification: "CW and modulated signals produce equal testosterone effects at the same time-averaged SAR, or CW produces larger effects",
      },
    ],
    ttypeTimeline: "Timeline",
    ttypeFalsification: "Falsification criterion",
    ttypeLocked: "Locked: 2026-08-24",
    ttypeStatus: "LOCKED — awaiting test",
    repTitle: "Replication Crisis Resolution Predictions",
    repLead: "Testable predictions derived from the Five Confound Framework.",
    repPredictions: [
      {
        id: "REP-1",
        title: "Controlling all five parameters yields consistent EMF calcium efflux results",
        description: "Replicate Blackman's calcium efflux experiment with ALL five parameters controlled: (1) temperature 36.5±0.3°C stable, (2) blue-rich lighting documented, (3) DC field measured and oriented, (4) Faraday-shielded controls, (5) tissue developmental history documented. Prediction: results are consistent across laboratories when all five parameters match.",
        timeline: "Testable within 6–12 months (cell culture, standard equipment)",
        falsification: "Results remain inconsistent even when all five parameters are controlled and matched across laboratories",
      },
      {
        id: "REP-2",
        title: "EMF effects on insulin secretion are glucose-dependent",
        description: "Expose pancreatic β-cell lines to standardized EMF at three glucose concentrations (2.8 mM basal, 11 mM stimulatory, 25 mM supramaximal). Prediction: EMF effect is LARGEST at 11 mM (VGCCs maximally primed) and SMALLEST at 2.8 mM (VGCCs mostly closed). Tests the glucose-dependent χ prediction.",
        timeline: "Testable within 3–6 months (β-cell lines, standard glucose assay)",
        falsification: "EMF effect is equal across glucose concentrations, or largest at 2.8 mM basal",
      },
      {
        id: "REP-3",
        title: "BTB opening correlates with sperm quality decline in same animals",
        description: "RF-EMF exposure in rats with simultaneous measurement of: (1) BTB permeability (FITC-dextran tracer), (2) sperm concentration and motility, (3) tight junction protein expression (occludin, ZO-1). Time-series: 1, 4, 8, 12 weeks. Prediction: BTB permeability increases BEFORE sperm parameters decline (barrier damage precedes toxicity) and decline ACCELERATES over time (positive feedback).",
        timeline: "Testable within 3–6 months (standard rat model, FITC-dextran protocol)",
        falsification: "BTB permeability and sperm decline are simultaneous, or sperm decline precedes BTB opening",
      },
      {
        id: "REP-4",
        title: "Sentinel species sensitivity scales with metabolic rate",
        description: "Meta-analysis: compile EMF exposure thresholds across species (insects, birds, rodents, primates) and test whether threshold ∝ body_mass^(0.25). If the metabolic χ scaling is correct, smaller species show effects at lower exposure levels following Kleiber’s law.",
        timeline: "Testable immediately (meta-analysis of existing literature)",
        falsification: "No correlation between body mass and EMF effect threshold, or inverse correlation",
      },
    ],
    repTimeline: "Timeline",
    repFalsification: "Falsification criterion",
    repLocked: "Locked: 2026-08-24",
    repStatus: "LOCKED — awaiting test",
    diffTitle: "Neurodevelopment & Differentiation (Derived)",
    diffLead: "Predictions derived from the BERM framework addressing neurodevelopmental and differentiation pathways. These parallel established endocrine disrupting chemical (EDC) research.",
    diffNote: "These predictions are L*-level — derived from the BERM framework but not yet directly tested. They parallel established endocrine disrupting chemical (EDC) research.",
    diffPredictions: [
      {
        id: "DIFF-1",
        title: "Prenatal EMF correlates with shorter AGD in newborn boys",
        description: "Prenatal EMF exposure correlates with shorter anogenital distance (AGD) in newborn boys. Test: measure AGD in birth cohorts with documented maternal EMF exposure. Control for phthalates, BMI, smoking. If negative, prenatal channels 1-3 are weak.",
        discriminating: true,
        critical: true,
        level: "L*",
        verified: false,
      },
      {
        id: "DIFF-2",
        title: "CACNA1C × prenatal EMF → ASD + gender-atypical development",
        description: "CACNA1C risk variant carriers with high prenatal EMF show higher rates of ASD+gender-atypical development than non-carriers with same exposure. GxE interaction test.",
        discriminating: true,
        critical: false,
        level: "L*",
        verified: false,
      },
      {
        id: "DIFF-3",
        title: "Puberty onset inversely correlates with EMF/screen time",
        description: "Puberty onset age inversely correlates with childhood EMF/screen time exposure. VERIFIED: CPP increased 3× in girls, 2× in boys ([[ref:denmark-cpp-3x-increase|Denmark 1998-2017]]). COVID screen time increase → CPP surge.",
        discriminating: false,
        critical: false,
        level: "M|C",
        verified: true,
      },
      {
        id: "DIFF-4",
        title: "Salivary oxytocin inversely correlates with EMF exposure",
        description: "Salivary oxytocin levels in adolescents inversely correlate with personal EMF exposure (phone use hours). Test: biomarker study with dosimetry.",
        discriminating: false,
        critical: false,
        level: "L*",
        verified: false,
      },
      {
        id: "DIFF-5",
        title: "Insular cortex activation differs by EMF exposure level",
        description: "Insular cortex activation patterns during interoceptive tasks differ between high-EMF and low-EMF adolescents. Test: fMRI with heartbeat detection task.",
        discriminating: false,
        critical: false,
        level: "L*",
        verified: false,
      },
      {
        id: "DIFF-6",
        title: "Gender clinic referrals correlate with technology adoption",
        description: "Gender clinic referral rates correlate with technology adoption timeline across countries. VERIFIED: Sweden +19,700%, Australia +12,650%, UK +2,457%. AFAB majority. Temporal correlation with smartphone adoption ~2010.",
        discriminating: false,
        critical: false,
        level: "L*",
        verified: true,
      },
      {
        id: "DIFF-7",
        title: "BDD prevalence increases with screen time",
        description: "Body dysmorphic disorder (BDD) prevalence increases with screen time/device use. VERIFIED: BDD prevalence rising, 'Snapchat dysmorphia' documented.",
        discriminating: false,
        critical: false,
        level: "L*",
        verified: true,
      },
    ],
    diffLevel: "Level",
    diffDiscriminating: "Discriminating",
    diffCritical: "Critical discriminating",
    diffLocked: "Locked: 2026-08-24",
    diffStatus: "LOCKED — awaiting test",
    diffVerifiedStatus: "VERIFIED",
    vgccTitle: "VGCC Gene Family Predictions",
    vgccLead: "Predictions derived from the six-gene VGCC family analysis. Each targets a specific calcium channel subtype and its associated disease mechanism.",
    vgccNote: "Evidence levels vary by prediction: E (experimental support), M|C (mechanistic/correlational), L* (derived/theoretical).",
    vgccPredictions: [
      {
        id: "MYOP-1",
        title: "Outdoor time protection against myopia is partially EMF-reduction mediated",
        description: "Compare myopia progression in children with identical outdoor time but different EMF exposure (Faraday-shielded vs standard outdoor areas). If EMF reduction adds to light's protective effect, it confirms the VGCC/DA channel.",
        level: "L*",
        discriminating: true,
        verified: false,
      },
      {
        id: "IMMUNE-1",
        title: "Chronic EMF exposure elevates baseline NFAT activation in T-cells",
        description: "Measure NFAT nuclear translocation in T-cells from high-EMF vs low-EMF populations matched for other factors.",
        level: "M|C",
        discriminating: false,
        verified: false,
      },
      {
        id: "HEAR-1",
        title: "Bluetooth earphone use duration correlates with subclinical hearing loss in young adults",
        description: "Control for volume level. Prediction: EMF component (Bluetooth RF) adds to acoustic damage via Cav1.3 excitotoxicity.",
        level: "M|C",
        discriminating: false,
        verified: false,
      },
      {
        id: "MIGR-1",
        title: "CACNA1I T-type variant carriers have higher EMF-triggered migraine frequency",
        description: "GxE interaction: T-type variant × EMF exposure → more cortical spreading depression events → more migraines.",
        level: "E",
        discriminating: true,
        verified: false,
      },
      {
        id: "SLEEP-2",
        title: "Sleep spindle density inversely correlates with evening EMF exposure",
        description: "Measure EEG sleep spindles in subjects with/without evening screen use. Prediction: spindle density ↓ in high-EMF group due to Cav3.3 nRt perturbation.",
        level: "M|C",
        discriminating: false,
        verified: false,
      },
      {
        id: "PCOS-1",
        title: "PCOS prevalence correlates with national EMF density controlling for BMI and diet",
        description: "Cross-national analysis. Prediction: positive correlation because 4 Modulome organs (pancreas, theca, granulosa, pituitary) converge on PCOS pathophysiology.",
        level: "M",
        discriminating: false,
        verified: false,
      },
      {
        id: "PAIN-1",
        title: "Cav3.2 blocker attenuates EMF-induced pain sensitization in animal model",
        description: "Expose rats to chronic EMF, measure pain thresholds, then administer selective Cav3.2 blocker. Prediction: blocker reverses EMF-induced hyperalgesia.",
        level: "M|C",
        discriminating: true,
        verified: false,
      },
      {
        id: "QT-1",
        title: "QTc interval positively correlates with cumulative EMF exposure in young adults",
        description: "EKG screening study with EMF dosimetry. Prediction: chronic EMF → Cav1.2 window current ↑ → action potential prolongation → measurable QTc increase.",
        level: "M|C",
        discriminating: false,
        verified: false,
      },
      {
        id: "TDP-1",
        title: "TheraBionic efficacy is abolished by co-administration of T-type Ca²⁺ channel blocker",
        description: "Already confirmed by FDA label (contraindication with CCBs). Further test: specific T-type blocker (ethosuximide) should abolish TheraBionic's anti-HCC effect while L-type blocker (nifedipine) should have less effect.",
        level: "E",
        discriminating: true,
        verified: true,
      },
      {
        id: "UNIFIED-1",
        title: "Same individual shows correlated VGCC-dependent biomarkers across systems",
        description: "In a single cohort, measure: HRV (cardiac Cav3), sleep spindle density (Cav3.3), pain threshold (Cav3.2 DRG), melatonin (CRY/Cav), sperm quality (Cav3 Leydig). Prediction: all should correlate within individuals because all share VGCC/Ca²⁺ as upstream cause.",
        level: "M",
        discriminating: true,
        verified: false,
      },
    ],
    vgccLevel: "Level",
    vgccDiscriminating: "Discriminating",
    vgccLocked: "Locked: 2026-08-24",
    vgccStatus: "LOCKED — awaiting test",
    vgccVerifiedStatus: "VERIFIED",
    tTfrTitle: "Testosterone → TFR threshold predictions",
    tTfrLead: "Country-level predictions from the testosterone threshold model. Each is locked with a falsification criterion. The model is calibrated against Finnish and Korean data; USA and Israel projections are extrapolations.",
    tTfrNote: "These predictions test the core claim that cumulative testosterone decline (~1%/year, age-independent) creates a biological fertility constraint that manifests ~35 years after onset.",
    tTfrLocked: "Locked: 2026-08-25",
    tTfrStatus: "LOCKED — awaiting test",
    tTfrDiscriminating: "Discriminating",
    tTfrCritical: "Critical",
    tTfrPredictions: [
      {
        id: "T-TFR-1",
        title: "USA TFR will drop below 1.30 by 2035",
        description: "Based on testosterone threshold model: USA cumulative T loss reaches ~40% around 2030. Prediction: TFR will begin accelerating decline after 2028, dropping below 1.30 by 2035. Falsification: USA TFR remains above 1.40 in 2035.",
        discriminating: true,
        critical: true,
        level: "M|C",
        verified: false,
      },
      {
        id: "T-TFR-2",
        title: "Finland TFR will drop below 1.00 by 2032",
        description: "Finland is already past the biological threshold. Current trajectory: 1.87 (2010) → 1.26 (2024), −4.5%/year. Projection: 1.26 × 0.955^8 ≈ 0.87 by 2032. Falsification: Finland TFR stabilizes above 1.10.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "T-TFR-3",
        title: "Israel TFR will begin declining measurably by 2035",
        description: "Israel's cultural buffer has maintained TFR ~3.0 despite T decline comparable to USA. Prediction: biological threshold (~40% cumulative loss) reached ~2035, at which point even religiously motivated couples will experience subfertility. Falsification: Israel TFR remains above 2.8 in 2040.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "T-TFR-4",
        title: "Korea's $200B pronatalist spending will not raise TFR above 1.0",
        description: "Korea is past the biological threshold (~49% cumulative T loss). Social incentives cannot compensate for biological incapacity. Prediction: TFR stays below 1.0 through 2035 regardless of policy spending. Falsification: Korea TFR rises above 1.0 sustained for 3+ years.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "T-TFR-5",
        title: "T decline rate predicts TFR change better than GDP or education",
        description: "Cross-national regression: T decline rate (age-independent secular trend) predicts TFR change better than GDP, education, or urbanization alone. Testable with existing data from USA, Denmark, Finland, Israel and pending Asian studies. Falsification: GDP or education explain >80% of TFR variance after controlling for T decline.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
    ],

    causalTitle: "Causal structure predictions",
    causalLead: "Predictions derived from the BMI-as-mediator causal analysis and HPG resetting evidence. These test the specific causal pathways BERM proposes.",
    causalNote: "These predictions test the causal STRUCTURE of the model — not its magnitude. They are falsifiable by formal mediation analysis and cross-country endocrine data.",
    causalLocked: "Locked: 2026-08-25",
    causalStatus: "LOCKED — awaiting test",
    causalPredictions: [
      {
        id: "CAUS-1",
        title: "BMI mediation accounts for 25–40% of total T decline",
        description: "Formal mediation analysis (Baron & Kenny or SEM) on longitudinal T data with concurrent BMI: indirect effect via BMI = 25–40% of total effect. Based on [[ref:mazur2013|Mazur 2013]] quantification (117/175 ng/dL = 67% direct). Falsification: mediation analysis shows <10% or >60% indirect effect via BMI.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "CAUS-2",
        title: "Faraday-shielded men show neither T decline nor BMI increase",
        description: "If EMF drives both T decline and BMI increase, then men in EMF-shielded environments should show attenuation of BOTH trends. Testable in occupational cohorts (submarine crews, shielded facilities). Falsification: shielded cohort shows same T decline rate as unshielded.",
        discriminating: true,
        critical: true,
        level: "M|C",
        verified: false,
      },
      {
        id: "CAUS-3",
        title: "LH decline rate correlates with EMF-proxy across countries",
        description: "[[ref:santi2025|Santi 2025]] found global LH decline. BERM predicts this is Route C/D mediated. Countries with higher EMF-proxy (residential electricity, broadband penetration) should show steeper LH decline. Testable with country-level LH data + EMF-proxy. Falsification: no correlation between EMF-proxy and LH decline rate.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
    ],

    popTitle: "Population comparison predictions",
    popLead: "Predictions derived from the systematic comparison of 9 low-EMF populations against modern populations. These test whether the observed health gradient tracks EMF exposure as BERM predicts.",
    popPredictions: [
      {
        id: "POP-1",
        title: "Amish TFR correlates inversely with distance to nearest urban area",
        description: "Within CAPED database: Amish communities closer to cities (higher ambient EMF) should have lower TFR than remote Amish communities, controlling for sect strictness and community size.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "POP-2",
        title: "Tsimane newborn AGD is longer than Trinidad (nearest city) newborn AGD",
        description: "AGD measurement in Tsimane Health and Life History Project cohort vs. urban Trinidadian comparison group. Same geographic region, different EMF exposure. If Tsimane AGD > Trinidad AGD, supports prenatal EMF → masculinization↓.",
        discriminating: true,
        critical: true,
        level: "L*",
        verified: false,
      },
      {
        id: "POP-3",
        title: "Mosetén health metrics fall between Tsimane and Western on EVERY measured variable",
        description: "Already partially confirmed (dementia, brain atrophy). Predict the same gradient for: fertility, metabolic syndrome, autoimmune markers, myopia, sleep quality. This gradient within a genetically matched population is the strongest available natural experiment.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "POP-4",
        title: "Indigenous communities adopting mobile technology show health deterioration within 5-10 years",
        description: "Longitudinal tracking of communities transitioning from no-phone to smartphone use. Predict: sleep quality↓, myopia↑, metabolic markers↑, fertility intention unchanged but biological fertility markers (hormones, sperm) ↓.",
        discriminating: true,
        critical: false,
        level: "L*",
        verified: false,
      },
    ],
    popLevel: "Level",
    popDiscriminating: "Discriminating",
    popCritical: "Critical discriminating",
    popLocked: "Locked: 2026-08-24",
    popStatus: "LOCKED — awaiting test",
    tPredTitle: "Testosterone predictions",
    tPredLead: "Predictions derived from the two-level model: testosterone secular decline as a temporal predictor of TFR. These test whether the T→TFR lag relationship generalises beyond the USA calibration window.",
    tPredPredictions: [
      {
        id: "T-1",
        title: "Countries with earlier/steeper electrification show earlier T decline onset",
        description: "Cross-country comparison of testosterone secular decline onset timing. The two-level model predicts that countries with earlier electrification saturation (Japan, Nordics) will show T decline onset earlier than later-electrifying countries. Requires harmonised longitudinal T data from at least 5 countries. The T→TFR lag of ~8 years should be consistent across populations.",
        falsification: "No correlation between electrification timing and T decline onset across ≥5 countries with harmonised T data, or the T→TFR lag varies by more than ±3 years across populations",
      },
      {
        id: "T-2",
        title: "LH+T pattern is hypothalamic (both declining) in all high-EMF populations",
        description: "The Santi 2025 diagnostic predicts T↓+LH↓ (hypothalamic suppression) rather than T↓+LH↑ (testicular damage) in populations with high cumulative EMF exposure. Test: compare LH and T secular trends in at least 3 independent longitudinal cohorts. If the pattern is testicular (EDC-driven) rather than hypothalamic, the BERM pathway is weakened.",
        falsification: "LH is stable or rising in ≥2 of 3 tested populations while T declines — indicating testicular (EDC) rather than hypothalamic (EMF) pattern",
      },
      {
        id: "T-3",
        title: "Dog sperm decline rate matches human T decline rate (both ~1%/yr)",
        description: "Dogs share domestic EMF exposure with humans. [[ref:lea2016|Lea et al. 2016]] documented −1.0%/yr sperm decline in UK stud dogs over 26 years — the same rate as human testosterone secular decline. This cross-species rate matching is predicted by the EMF gradient (r = 0.909): species sharing the same EMF environment should show the same decline rate. Test: compare dog sperm decline onset timing with local electrification history across 3+ countries.",
        falsification: "Dog sperm decline rates vary by >0.5%/yr across countries with similar EMF environments, or dog sperm decline predates electrification in any country",
      },
      {
        id: "T-4",
        title: "CatSper function declines proportionally to cumulative EMF exposure in semen samples",
        description: "CatSper-dependent capacitation and progesterone-induced hyperactivation should show measurable decline with increasing cumulative EMF exposure (phone-in-pocket hours × years). Testable using existing IVF clinic semen samples with EMF exposure questionnaires. The decline should correlate with intracellular Ca²⁺ dysregulation measured by fluorescent indicators.",
        falsification: "No correlation between self-reported phone-in-pocket exposure and CatSper-dependent functional parameters in ≥200 semen samples",
      },
      {
        id: "T-5",
        title: "CatSper blocker NNC55-0396 produces the same sperm phenotype as RF exposure at matched Ca²⁺ shift",
        description: "If EMF acts on sperm primarily through CatSper, then pharmacological CatSper blockade (NNC55-0396) should reproduce the full phenotype of RF-exposed sperm: reduced motility, impaired capacitation, and abolished progesterone-induced hyperactivation — at the same magnitude when Ca²⁺ shifts are matched. [[ref:pmc6104424_nnc|Rennhack et al. 2018]] already showed partial phenocopying.",
        falsification: "RF exposure produces sperm defects not reproducible by CatSper blockade — indicating a non-CatSper EMF mechanism dominates in sperm",
      },
    ],
    tPredLocked: "Locked: 2026-08-31",
    tPredStatus: "LOCKED — awaiting test",
    societalTitle: "Societal predictions",
    societalLead: "Predictions derived from the dual-lock theory: population-wide testosterone decline combined with cortisol rise produces multiplicative behavioral suppression. These test whether societal behavioral trends track the hormonal shifts BERM predicts from EMF exposure.",
    societalPredictions: [
      {
        id: "SOC-1",
        title: "Male labor force participation continues declining in all high-EMF countries",
        description: "Male labor force participation rate will continue declining in every G20 country through 2030, absent a major policy intervention (e.g. universal basic income, mandatory employment programs). The dual lock predicts that population-wide testosterone decline reduces status motivation while cortisol elevation makes workplace competition aversive — producing progressive 'opting out' behavior.",
        falsification: "Male LFP increases >2 percentage points in any G20 country without major policy change by 2030",
      },
      {
        id: "SOC-2",
        title: "Sexlessness rates correlate with smartphone adoption timing across countries",
        description: "Cross-country analysis will show a significant correlation between smartphone adoption timing (year when penetration exceeded 50%) and the onset of rising sexlessness rates among 18–30 year old males. Countries with earlier smartphone adoption (e.g. South Korea, Japan) should show earlier onset of sexlessness trends than later-adopting countries.",
        falsification: "No correlation between smartphone adoption year and sexlessness trend onset across ≥10 countries",
      },
      {
        id: "SOC-3",
        title: "Low-EMF communities show stable or rising marriage rates",
        description: "Amish and Mennonite communities — which maintain low personal EMF exposure due to restricted technology use — will show stable or rising marriage rates during 2020–2030, while US national marriage rates continue declining. This tests the dual lock's prediction that the behavioral effects (reduced approach behavior, increased avoidance) are biologically mediated, not purely cultural.",
        falsification: "Amish/Mennonite marriage rates decline at a rate comparable to the US national average during 2020–2030",
      },
    ],
    societalTimeline: "Timeline",
    societalFalsification: "Falsification criterion",
    societalLocked: "Locked: 2026-08-25",
    societalStatus: "LOCKED — awaiting test",

    techTitle: "Technology-specific predictions",
    techLead: "Predictions derived from the ELF priming hypothesis, superadditivity model, and technology-specific exposure analysis. These test whether multi-frequency interactions produce non-additive biological effects and whether specific technology transitions caused observed health inflections.",
    techPredictions: [
      {
        id: "PRIME-1",
        title: "ELF-primed cells show amplified RF calcium response",
        description: "Pre-expose neuronal cultures to 50 Hz ELF for 10 days (priming). Then expose to standardized RF (e.g. 2.4 GHz WiFi). Prediction: primed cells show 2–3× larger Ca²⁺ response to identical RF stimulus compared to unprimed controls. The mechanism: ELF upregulates VGCC expression ([[ref:sun2016_elf_vgcc|PMC4757866]]), making each cell more sensitive to subsequent RF activation. This is the core ELF priming prediction.",
        timeline: "Testable within 3–6 months (in vitro, standard Ca²⁺ imaging)",
        falsification: "No difference in Ca²⁺ response between ELF-primed and unprimed cells under identical RF exposure",
      },
      {
        id: "PRIME-2",
        title: "Amish (no grid priming) show minimal RF bioresponse",
        description: "Compare RF-induced biomarkers (salivary cortisol, melatonin, HRV) between Old Order Amish (no residential ELF priming) and matched modern controls after identical acute RF exposure. Prediction: Amish show significantly attenuated response because their VGCC expression is at baseline (not upregulated by 50 Hz). This explains why Amish maintain TFR ~6.1 despite occasional RF exposure from neighboring infrastructure.",
        timeline: "Testable within 1–2 years (requires Amish community cooperation)",
        falsification: "Amish show equal or greater RF bioresponse than modern controls",
      },
      {
        id: "PRIME-3",
        title: "Residential electricity consumption predicts EMF biomarkers better than mobile phone use",
        description: "In a cohort study with personal EMF dosimetry, residential electricity consumption (kWh/month) will predict chronic EMF biomarkers (melatonin suppression, sperm quality, HRV) more strongly than mobile phone usage hours. The mechanism: electricity measures the ELF priming state, which amplifies ALL subsequent exposures. Mobile phone measures only one RF source. This explains the cross-sectional finding (full-model RMSE 0.522 vs 1.053).",
        timeline: "Testable within 1–2 years (cohort study with dosimetry)",
        falsification: "Mobile phone usage is a stronger predictor of biomarkers than electricity consumption",
      },
      {
        id: "MULTI-1",
        title: "Multi-frequency exposure produces superadditive CaMKII activation",
        description: "Expose cells to: (1) 50 Hz alone, (2) 2.4 GHz alone, (3) 50 kHz IF alone, (4) all three simultaneously. Measure CaMKII autophosphorylation. Prediction: combined exposure produces CaMKII activation greater than the sum of individual exposures, because different frequencies activate different VGCC subtypes but CaMKII integrates total Ca²⁺ regardless of source.",
        timeline: "Testable within 3–6 months (in vitro, standard Western blot)",
        falsification: "Combined exposure produces additive or sub-additive CaMKII activation",
      },
      {
        id: "MULTI-2",
        title: "Recovery window elimination accelerates cumulative damage",
        description: "Expose matched cell groups to identical total EMF dose: (A) continuous multi-band (simulating modern home: 50 Hz + WiFi + LED), (B) same dose but with 8-hour nightly gap (Faraday-shielded sleep period). Prediction: group B shows significantly less cumulative CaMKII activation and less oxidative damage after 30 days, because the recovery window allows Ca²⁺ homeostasis restoration. This tests whether the 24/7 nature of modern exposure — not just the dose — drives the cumulative effect.",
        timeline: "Testable within 2–4 months (in vitro, longitudinal)",
        falsification: "No difference between continuous and gapped exposure at equal total dose",
      },
      {
        id: "MULTI-5",
        title: "WiFi beacon 10 Hz pulse produces ELF-like biological effects independent of carrier",
        description: "WiFi routers emit a 10 Hz beacon pulse even when no data is transmitted (Schmid 2012). The beacon's crest factor is 100:1 — peak power is 100× higher than average (Schmid 2020). Prediction: an isolated 10 Hz pulsed signal at WiFi beacon intensity produces ELF-type biological effects (melatonin suppression, EEG alpha changes) comparable to a continuous 10 Hz sinusoidal field, despite SAR being negligible. This tests whether SAR systematically underestimates WiFi exposure by measuring average instead of peak.",
        timeline: "Testable within 3–6 months (EEG/melatonin study)",
        falsification: "WiFi beacon pulse produces no ELF-type biological effects, or effects scale with SAR not peak",
      },
      {
        id: "TECH-LED",
        title: "EU LED transition countries show steeper sperm decline than late-adopting countries",
        description: "The EU [[ref:eu_regulation_244_2009|Directive 244/2009]] forced incandescent ban between 2009–2012, mandatory LED adoption. Prediction: EU countries show a statistically significant acceleration in sperm quality decline starting 2012–2015 compared to countries that adopted LED lighting later (e.g. some Asian, African countries). This tests whether the IF channel (20–300 kHz LED driver frequencies) contributes independently to reproductive decline beyond the RF channel.",
        timeline: "Testable immediately (existing meta-analysis data)",
        falsification: "No acceleration difference between early and late LED-adopting countries",
      },
      {
        id: "TECH-EV",
        title: "EV drivers show higher IF-band biomarkers than ICE vehicle drivers",
        description: "Electric vehicle inverters produce 5–50 kHz IF fields in the cabin. Compare IF-relevant biomarkers (testicular function, HRV during driving) between matched EV and internal combustion engine (ICE) vehicle drivers with equivalent daily commute times. The Israeli patent US12379429 (active field cancellation for EV cabins) demonstrates that industry recognizes in-cabin fields as problematic. Prediction: EV drivers show measurably higher oxidative stress markers and lower HRV during driving compared to ICE drivers.",
        timeline: "Testable within 1–2 years (cohort study with dosimetry)",
        falsification: "No difference in any biomarker between EV and ICE drivers, or ICE drivers show worse markers",
      },
    ],
    techTimeline: "Timeline",
    techFalsification: "Falsification criterion",
    techLocked: "Locked: 2026-08-26",
    techStatus: "LOCKED — awaiting test",

    layerTitle: "Layered exposure model predictions",
    layerLead: "Predictions derived from the layered exposure model — five technology layers stacking superadditively through CaMKII threshold integration. These test whether the layer model's historical verification extends to prospective predictions.",
    layerPredictions: [
      {
        id: "LAYER-1",
        title: "Countries adopting LED later show later health acceleration",
        description: "EU LED mandate 2009–2012 forced IF channel opening. Countries that resisted or delayed LED adoption should show later IF-specific health effects (metabolic, sleep). Testable with country-level LED market share timelines vs health data acceleration points.",
        falsification: "No temporal correlation between LED adoption timing and health trend inflection points",
      },
      {
        id: "LAYER-2",
        title: "Content restrictions do NOT reduce teen mental health crisis",
        description: "If 2012 inflection is DEVICE (EMF) not CONTENT (social media), then banning social media for teens while allowing smartphone use will not reduce depression/anxiety rates. Australia's social media ban (2024) is the direct test. Norway's age verification is a secondary test.",
        falsification: "Australian social media ban produces >20% reduction in teen depression within 3 years",
        critical: true,
      },
      {
        id: "LAYER-3",
        title: "Developing country epidemics follow electrification timeline, not GDP",
        description: "For 20+ developing countries: T2D/obesity onset year correlates more strongly with electrification date (year electricity access exceeded 50%) than with GDP crossing any threshold. China T2D: 1.3% (1980) → 8.7% (2014) parallels electrification 60%→100%, not GDP per se.",
        falsification: "GDP crossing correlates more strongly than electrification date across 20+ countries",
      },
      {
        id: "LAYER-4",
        title: "EV professional drivers show IF-specific health effects by 2035",
        description: "Taxi/delivery drivers using EVs 8+ hours/day accumulate IF exposure (inverter 5–50 kHz in cabin). Predicted effects: metabolic, reproductive, cardiac — at higher rates than ICE vehicle drivers matched for sedentary time. Israeli patent US12379429 demonstrates industry awareness.",
        falsification: "No difference between EV and ICE professional drivers after 10 years on any metabolic or reproductive metric",
      },
      {
        id: "LAYER-5",
        title: "Starlink coverage eliminates last EMF-free control populations by 2035",
        description: "Tsimane, Hadza, and comparable populations will begin showing RF background exposure from LEO satellite constellations. Their health metrics will begin converging toward industrialized patterns within 10–15 years of exposure onset. IRREVERSIBLE loss of verification capacity.",
        falsification: "Starlink-covered indigenous populations show no health metric changes within 15 years",
      },
      {
        id: "LAYER-6",
        title: "The next major epidemic is IF-specific",
        description: "LED drivers + EV inverters + induction cookers + wireless charging all operate at 20–300 kHz. This is the fastest-growing and least-regulated EMF band. IF-specific health effects (distinct from ELF or RF) will emerge as a recognized category by 2035. TTFields (FDA-approved, 200 kHz) already demonstrates IF bioactivity.",
        falsification: "No IF-specific health effects identified despite increasing IF exposure by 2035",
      },
      {
        id: "LAYER-7",
        title: "COVID lockdown T2D acceleration correlates with EMF-at-home intensity",
        description: "Workers who were remote (high home EMF: WiFi+LED 24h/day, multiple devices, no commute recovery) show greater T2D acceleration than workers who continued commuting (mixed EMF environments with outdoor recovery time). Recovery_deficit is the distinguishing variable, not just sedentary time.",
        falsification: "Remote workers show same or lower T2D acceleration than commuters after controlling for physical activity",
      },
    ],
    layerFalsification: "Falsification criterion",
    layerLocked: "Locked: 2026-08-26",
    layerStatus: "LOCKED — awaiting test",

    investigationTitle: "Investigation line predictions",
    investigationLead: "Predictions from six new investigation lines: seasonal sensitivity, genotype, water, building materials, recovery window, and prenatal exposure. Each line opens a new modulating variable in the BERM framework.",
    investigationPredictions: [
      { id: "SEASON-1", title: "SAD correlates with latitude × EMF, not latitude alone", description: "SAD/depression prevalence should correlate with latitude × EMF density interaction, not with latitude as a standalone predictor. High-latitude, low-EMF communities (Amish in northern US, rural Scandinavia pre-electrification) should show lower SAD than predicted by latitude alone.", falsification: "Latitude alone predicts SAD as well as latitude × EMF interaction term" },
      { id: "SEASON-2", title: "EMF-free bedroom benefit is larger in winter", description: "The health benefit of sleeping in an EMF-free environment (Faraday cage, airplane mode, no WiFi) should be measurably LARGER in winter months at high latitudes, because CRY magnetoreceptor sensitivity is higher when ambient light is reduced.", falsification: "No seasonal variation in EMF-free sleep benefit, or benefit is larger in summer" },
      { id: "GEN-1", title: "CACNA1C A-allele frequency predicts population EMF sensitivity", description: "Populations with higher CACNA1C rs1006737 A-allele frequency show steeper health decline per unit EMF exposure. This predicts population-level variation in EMF sensitivity that is genetic, not cultural.", falsification: "No correlation between A-allele frequency and rate of EMF-associated health changes across populations" },
      { id: "GEN-2", title: "A/A genotype shows stronger EMF response than G/G", description: "In controlled EMF exposure studies, individuals with CACNA1C rs1006737 A/A genotype show larger physiological responses (sleep EEG, HRV, calcium markers) than G/G genotype individuals. Already supported by [[ref:sousouri2025|Sousouri 2025]] (ETH) for 5G sleep response.", falsification: "No genotype-dependent difference in EMF response in multiple independent controlled studies" },
      { id: "WATER-1", title: "Island and coastal populations show higher EMF sensitivity", description: "Water's dielectric constant (~80 vs air ~1) amplifies electric field conduction. Island nations and coastal populations may show higher EMF-associated health effects per unit exposure than inland populations. Japan (island, highest ASD globally) is consistent but not proof.", falsification: "No coastal/inland difference in EMF-associated health metrics after controlling for other variables" },
      { id: "BUILD-1", title: "Wood buildings produce better health outcomes than concrete", description: "Reinforced concrete reflects RF internally, increasing indoor field strength. Wood is RF-transparent. Occupants of wood buildings should show better sleep, lower stress markers, and better cardiovascular metrics than concrete building occupants, beyond what biofiilia theory predicts.", falsification: "No difference after controlling for socioeconomic factors, or concrete outperforms wood" },
      { id: "RECOV-1", title: "EMF-free bedroom increases melatonin within 2 weeks", description: "Removing all EMF sources from the bedroom (WiFi router, phone, LED lights) and sleeping in an EMF-reduced environment should produce measurable melatonin increases within 2 weeks, even without any other lifestyle change.", falsification: "No melatonin change after 4 weeks of EMF-free sleep environment" },
      { id: "RECOV-2", title: "Minimum recovery window: 4–6 hours EMF-free", description: "CaMKII dephosphorylation kinetics predict a minimum EMF-free period of 4–6 hours for meaningful Ca²⁺ homeostasis restoration. Less than 4 hours provides negligible recovery; more than 6 hours shows diminishing returns.", falsification: "No dose-response relationship between EMF-free hours and recovery markers" },
      { id: "PRENATAL-1", title: "First trimester EMF exposure correlates with ASD risk", description: "CACNA1C is critical for synaptogenesis. Prenatal Ca²⁺ disruption during developmental windows → timing errors → ASD/ADHD phenotype. Kaiser Permanente (Li et al. 2017) already showed prenatal EMF → ASD risk. First trimester should show strongest effect.", falsification: "No trimester-specific difference in EMF-ASD association" },
      { id: "MULTI-SEAS", title: "Winter × high EMF produces worst health outcomes", description: "The interaction of winter (high CRY sensitivity) and high EMF exposure should produce the worst health outcomes — worse than either factor alone. Nordic countries in winter should show peak EMF sensitivity.", falsification: "No interaction effect between season and EMF level on health outcomes" },
    ],
    investigationFalsification: "Falsification criterion",
    investigationLocked: "Locked: 2026-08-26",
    investigationStatus: "LOCKED — awaiting test",

    sentinelPredTitle: "Sentinel species predictions",
    sentinelPredLead: "Predictions from sentinel species layer analysis. Animals with higher EMF sensitivity (frogs > bees > insects > birds > mammals) should decline in order corresponding to technology layer stacking, not random environmental factors.",
    sentinelPredPredictions: [
      { id: "SENT-1", title: "EMF × pesticide interaction is superadditive", description: "Combined EMF + pesticide exposure produces more severe effects than either alone. The interaction is superadditive because pesticides stress cells → Ca²⁺ dysregulation → EMF sensitivity increases. [[ref:lupi2021|Lupi 2021]] already demonstrated this in bee biochemical and behavioral markers.", falsification: "Combined effects are merely additive or sub-additive in multiple species" },
      { id: "SENT-2", title: "Bumblebee decline correlates with WiFi density", description: "Bumblebee population decline should correlate with local WiFi access point density, independent of pesticide use and habitat loss. [[ref:bumble_rf2025|New 2025 study]] already showed RF reduces bumblebee flower visitation.", falsification: "No correlation between WiFi density and bumblebee populations after controlling for pesticides" },
      { id: "SENT-3", title: "LED streetlights cause more insect decline than sodium (IF component)", description: "[[ref:boyes2021|Boyes 2021]] found LED streetlights reduced insect abundance by 52% vs sodium's 41%. The 11% difference is not explained by light spectrum alone — LED's IF emission (from SMPS drivers, 20–300 kHz) adds an EMF exposure channel that sodium lacks.", falsification: "Faraday-shielded LED shows same insect decline as unshielded LED (ruling out IF component)" },
      { id: "SENT-4", title: "Migratory birds decline faster than resident species", description: "Migratory birds depend on CRY-based magnetoreception for navigation. RF disrupts CRY. Therefore migratory species should show steeper population decline than resident species in the same habitat, independent of habitat loss.", falsification: "Resident species decline as fast or faster than migratory species in shared habitats" },
      { id: "SENT-5", title: "Faraday-shielded beehives produce more honey", description: "Bee colonies in Faraday-shielded hives (blocking ambient RF/ELF) should produce measurably more honey, show lower colony loss rates, and demonstrate better navigation (fewer lost foragers) than unshielded hives in the same location.", falsification: "No difference in honey production or colony survival between shielded and unshielded hives" },
      { id: "SENT-6", title: "Frog populations survive near EMF-free areas", description: "Frog populations should persist in areas with minimal power grid infrastructure and low RF background, while declining in electrified areas — even controlling for habitat quality, water contamination, and UV exposure. Frogs' moist skin provides direct environmental Ca²⁺ coupling.", falsification: "Frog decline is equally severe in low-EMF and high-EMF areas after controlling for habitat" },
    ],
    sentinelPredFalsification: "Falsification criterion",
    sentinelPredLocked: "Locked: 2026-08-26",
    sentinelPredStatus: "LOCKED — awaiting test",

    supplementTitle: "Supplement predictions",
    supplementLead: "Predictions from six supplementary analysis lines: shift work, indoor/outdoor occupational gradient, phone pocket transition, power frequency geography, and replication moderator analysis.",
    supplementPredictions: [
      { id: "SHIFT-1", title: "Faraday bedroom improves shift worker outcomes", description: "Shift workers who sleep in a Faraday-shielded bedroom (EMF-free) show better melatonin recovery and less metabolic syndrome than shift workers sleeping in conventional bedrooms — with the same total sleep time. The difference isolates the EMF component from the sleep deprivation component.", falsification: "No difference in metabolic or hormonal outcomes between shielded and unshielded bedrooms for shift workers" },
      { id: "SHIFT-2", title: "Shift work health effects worse in winter", description: "Shift work health effects (metabolic syndrome, depression, cardiovascular risk) should be measurably worse during winter months at high latitudes, because CRY magnetoreceptor sensitivity is higher when ambient light is reduced — amplifying EMF disruption during the critical night shift period.", falsification: "No seasonal variation in shift work health outcomes, or effects are worse in summer" },
      { id: "SHIFT-3", title: "Shift work MetS OR exceeds sleep deprivation OR", description: "The metabolic syndrome odds ratio for shift workers (OR 2.17) exceeds what pure sleep deprivation alone would predict. The excess risk is attributable to the EMF component: LED IF exposure during melatonin peak hours and eliminated recovery window.", falsification: "Sleep deprivation alone fully accounts for shift work MetS risk with no residual" },
      { id: "INDOOR-1", title: "Indoor workers have higher MetS than outdoor workers after activity matching", description: "Indoor workers (office, data center) show higher metabolic syndrome prevalence than outdoor workers (farmers, fishermen) even after matching for physical activity level. The difference is attributable to cumulative EMF exposure differential.", falsification: "No MetS difference between physically active indoor and outdoor workers" },
      { id: "INDOOR-2", title: "Indoor workers have lower melatonin than outdoor workers after light matching", description: "Indoor workers show lower nighttime melatonin levels than outdoor workers even after controlling for light exposure patterns. The residual difference reflects EMF exposure from office WiFi, LED lighting IF, and device proximity.", falsification: "No melatonin difference after controlling for light exposure" },
      { id: "POCKET-1", title: "Breast pocket users have better sperm quality than hip pocket users", description: "Men who carry their phone in a breast pocket show better sperm quality than men who carry it in a hip/front pocket — despite the same total usage time. The difference is explained by testes being in the near-field only for hip pocket users.", falsification: "No difference in sperm quality by pocket position with matched usage time" },
      { id: "POCKET-2", title: "Sperm decline acceleration correlates with data usage, not voice calls", description: "The doubling of sperm decline rate (1.16%→2.64%/yr after 2000) correlates with 3G/4G data adoption (phone stays in pocket continuously) rather than 2G voice call adoption (phone held to ear during calls only). This is a behavioral exposure change, not a technology power change.", falsification: "Sperm decline rate correlates with voice call volume rather than data usage patterns" },
      { id: "FREQ-1", title: "50 Hz countries show slightly stronger CRY-dependent effects than 60 Hz countries", description: "50 Hz (Europe) is within 2 Hz of the 8th Schumann resonance harmonic (52.0 Hz), potentially producing stronger CRY interference. European populations may show slightly stronger CRY-dependent cascade effects (melatonin suppression, depression) than American populations at matched total EMF levels.", falsification: "No difference in CRY-dependent endpoints between 50 Hz and 60 Hz countries at matched EMF" },
      { id: "REPL-1", title: "Retrospective moderator analysis predicts positive vs. null EMF studies", description: "A retrospective analysis of 50–100 published EMF bio-assay studies, coding for study month, laboratory latitude, building material, and subject background, will show that these four moderators significantly predict whether a study found a positive or null result. This is testable WITHOUT new data.", falsification: "Moderator variables do not predict study outcomes in logistic regression (p > 0.05)" },
      { id: "REPL-2", title: "Future study controlling all 7 moderators replicates consistently regardless of laboratory", description: "Winter + CACNA1C-genotyped + low lab-ELF + EMF-free sleep + chronic + pulsed + real device = positive result in EVERY lab.", falsification: "Fully controlled study still fails to replicate" },
      { id: "REPL-3", title: "CACNA1C AA-genotype individuals show measurable melatonin suppression from residential WiFi in winter at 60°N", description: "Most specific single prediction combining 3 moderators: genotype + season + exposure.", falsification: "No melatonin difference between AA and GG in winter WiFi exposure" },
      { id: "REPL-4", title: "9-hour EMF-free sleep produces measurable DNA repair vs 0-hour (WiFi on, phone in bed)", description: "Ivancsits showed 9h recovery. Subjects sleeping EMF-free show lower comet tail factor than subjects sleeping with WiFi.", falsification: "No difference in DNA damage markers between EMF-free and WiFi-exposed sleep" },
    ],
    supplementFalsification: "Falsification criterion",
    supplementLocked: "Locked: 2026-08-26",
    supplementStatus: "LOCKED — awaiting test",

    geneticTitle: "Genetic susceptibility predictions",
    geneticLead: "Predictions from the 15-gene calcium susceptibility profile. These test the hypothesis that EMF sensitivity is polygenically determined and that gene × EMF interactions are superadditive.",
    geneticPredictions: [
      { id: "GENE-MTNR1B-1", title: "MTNR1B GG carriers show larger T2D risk increase per unit EMF than AA carriers", description: "rs10830963 G-allele → more MT2 receptors → β-cells hypersensitive to melatonin changes. EMF-induced melatonin suppression differentially affects GG carriers. The gene × EMF interaction is SUPERADDITIVE: EMF 'activates' the genetic risk that would be latent in a normal melatonin environment.", falsification: "No genotype × EMF interaction on T2D incidence in biobank analysis" },
      { id: "GENE-CRY1-1", title: "CRY1Δ11 carriers show worse sleep outcomes under residential EMF than non-carriers", description: "CRY1Δ11 (rs184039278, 0.6% frequency) lengthens the circadian period. EMF disrupts CRY → the effects are ADDITIVE: genetic lengthening + EMF disruption = longer sleep latency, shorter recovery window, and worse metabolic outcomes.", falsification: "No difference in sleep or metabolic outcomes between CRY1Δ11 carriers and non-carriers under matched EMF exposure" },
      { id: "GENE-COMT-1", title: "COMT Val/Val individuals show greater EMF-associated depression risk than Met/Met", description: "Val/Val = fast dopamine clearance = low DA baseline. EMF-induced dopamine synthesis reduction hits harder (smaller buffer). Met/Met has a higher baseline DA buffer → more resilient to EMF-induced DA reduction.", falsification: "No COMT genotype × EMF interaction on depression prevalence" },
      { id: "GENE-CACNA1D-1", title: "CACNA1D GoF carriers show higher tinnitus rates with Bluetooth earphone use", description: "Cav1.3 GoF → inner ear hypersensitivity. Bluetooth earphones activate Cav1.3 in hair cells → Ca²⁺ overload. GoF carriers reach damage threshold at lower exposure levels → tinnitus earlier.", falsification: "No association between CACNA1D genotype and tinnitus in Bluetooth users" },
      { id: "GENE-COMORBID-1", title: "Depression-T2D comorbidity is higher in CACNA1C AA + MTNR1B GG compound carriers", description: "Both conditions arise from the same melatonin suppression pathway acting in different organs (brain vs. pancreas). Compound carriers of CACNA1C rs1006737 AA (more Ca²⁺ influx → more melatonin suppression) and MTNR1B rs10830963 GG (β-cells hypersensitive to melatonin) should show the highest comorbidity rate.", falsification: "Depression-T2D comorbidity does not stratify by CACNA1C × MTNR1B genotype" },
      { id: "GENE-INTERACT-1", title: "CRY1Δ11 + MTNR1B GG compound carriers show specifically elevated morning fasting glucose", description: "CRY1Δ11 delays melatonin offset → morning melatonin still elevated. MTNR1B GG → β-cells hypersensitive to this elevated morning melatonin → insulin suppression specifically in the morning → fasting glucose elevated.", falsification: "No CRY1 × MTNR1B interaction on morning fasting glucose" },
      { id: "GENE-EHS-1", title: "EHS patients have higher CACNA GoF + lower SLC8A1/ATP2B function than matched controls", description: "EHS is a polygenic calcium threshold disorder: high influx (CACNA GoF) + slow extrusion (SLC8A1/ATP2B LoF) = Ca²⁺ accumulates → CaMKII threshold crossed at lower EMF. Genotyping EHS cohorts for these 15 genes will show enrichment of high-influx/slow-extrusion combinations.", falsification: "No calcium channel gene enrichment in EHS cohorts vs. matched controls" },
      { id: "GENE-PRS-1", title: "A 15-gene polygenic risk score predicts EMF sensitivity in controlled exposure studies", description: "Combining CACNA1C, CACNA1H, CACNA1D, CACNA1A, CACNA1B, CACNA2D1, CAMK2A, CAMK2B, SLC8A1, ATP2B1, ATP2B2, CRY1, CRY2, MTNR1B, and COMT into a single PRS should predict the magnitude of biological response to standardized EMF exposure.", falsification: "PRS does not correlate with measured EMF response in controlled exposure" },
      { id: "GXEMF-1", title: "Gene × EMF interactions are superadditive across populations", description: "Genetic risk (MTNR1B GG T2D risk ~1.5×) × EMF risk (~1.3×) produces observed risk ~2.5× (> 1.5 × 1.3 = 1.95×). EMF 'activates' genetic risks that would be latent in EMF-free environments. Testable via biobank stratification by residential EMF exposure.", falsification: "Gene × EMF interaction is purely multiplicative (no superadditivity)" },
      { id: "GXEMF-2", title: "Gabapentinoid users show reduced EMF sensitivity via α2δ-1 blockade", description: "Pregabalin/gabapentin bind α2δ-1 → block VGCC trafficking to synapses → lower synaptic VGCC density → reduced ELF priming effect. Gabapentinoid users should show attenuated biological responses to EMF exposure compared to matched non-users.", falsification: "No difference in EMF response between gabapentinoid users and non-users" },
      { id: "GXEMF-3", title: "CaMKII Thr286 autophosphorylation level in lymphocytes correlates with subjective EMF sensitivity", description: "CaMKII autophosphorylation at Thr286 is measurable in peripheral lymphocytes. Higher baseline autophosphorylation = closer to threshold = more sensitive to EMF. This could be the first OBJECTIVE biomarker for EHS.", falsification: "No correlation between lymphocyte CaMKII autophosphorylation and reported EMF sensitivity" },
      { id: "GENE-A2D-1", title: "α2δ-1 expression level predicts individual ELF priming magnitude", description: "CACNA2D1 encodes α2δ-1, the bottleneck for VGCC trafficking. Individuals with higher baseline α2δ-1 expression should show faster VGCC density increase under ELF exposure (faster priming).", falsification: "No correlation between α2δ-1 expression and VGCC density change under ELF" },
      { id: "GENE-A2D-2", title: "Pregabalin pre-treatment blocks ELF-induced VGCC upregulation in cell culture", description: "If α2δ-1 is the molecular mediator of ELF priming ([[ref:sun2016_elf_vgcc|PMC4757866]]), then pregabalin (which binds α2δ-1) should prevent the VGCC density increase observed after 8-10 days of 50/60 Hz exposure.", falsification: "Pregabalin does not prevent ELF-induced VGCC upregulation" },
      { id: "GENE-CAMK2-1", title: "CAMK2A GoF mutation phenotype matches BERM population-level prediction", description: "CAMK2A GoF mutations that increase Thr286 autophosphorylation produce epilepsy, intellectual disability, and autism ([[ref:kury2017_camk2|Küry 2017]]). BERM predicts EMF increases population-level autophosphorylation → same phenotypes at population level. Genetic validation of the mechanism.", falsification: "CAMK2A GoF phenotypes do not match EMF-predicted population health trends" },
      { id: "GENE-CAMK2-2", title: "Lymphocyte CaMKII autophosphorylation is higher in high-EMF urban residents than rural controls", description: "Urban residents (higher cumulative EMF) should show higher baseline CaMKII Thr286 autophosphorylation in peripheral lymphocytes than rural controls matched for age, diet, and activity.", falsification: "No urban-rural difference in lymphocyte CaMKII autophosphorylation" },
      { id: "GENE-NETWORK-1", title: "Multi-gene calcium channel polymorphism interaction predicts neurodevelopmental outcomes", description: "[[ref:korean2025_cacna|Korean 2025 study]] showed CACNA1A + CACNA1C + CACNA1H polymorphisms interact in pediatric DD/epilepsy. BERM predicts this extends to all 5 influx genes: compound carriers of multiple CACNA risk alleles show disproportionately higher neurodevelopmental risk.", falsification: "No multi-gene interaction effect beyond individual gene effects" },
    ],
    geneticFalsification: "Falsification criterion",
    geneticLocked: "Locked: 2026-08-26",
    geneticStatus: "LOCKED — awaiting test",
    plantCryTitle: "Ecosystem & plant CRY predictions",
    plantCryLead: "Predictions derived from the universal CRY/RPM mechanism operating across trophic levels. These test whether masting synchrony, plant reproduction, and ecosystem dynamics respond to electromagnetic field parameters through cryptochrome.",
    plantCryPredictions: [
      {
        id: "MAST-SOLAR-1",
        metric: "Masting frequency vs solar sunspot number (SSN)",
        prediction: "Super-mast years (multiple species masting simultaneously) correlate with solar minimum phase when natural RF is lowest. Testable with MASTREE database + SSN records.",
        status: "pending",
        locked: "2026-08-31",
      },
      {
        id: "MAST-RF-1",
        metric: "Masting synchrony vs anthropogenic RF background",
        prediction: "Masting synchrony is weaker in forests near cell towers / urban areas than in remote forests with low RF. Already partially reported (Bogdziewicz 2021) but attributed to climate change. BERM's alternative: RF disrupts CRY2.",
        status: "pending",
        locked: "2026-08-31",
      },
      {
        id: "PLANT-CRY-RF-1",
        metric: "CRY2-knockout plants vs wild-type under RF exposure",
        prediction: "CRY2-knockout Arabidopsis shows no flowering time change under RF; wild-type does. Ahmad 2020 showed CRY1 effect; CRY2 flowering effect under RF not yet tested with knockouts. Discriminating test.",
        status: "pending",
        locked: "2026-08-31",
      },
      {
        id: "MAST-SOIL-B2-1",
        metric: "Masting synchrony vs soil microbiome B2 production",
        prediction: "Higher masting synchrony in B2-rich soils. Soil microbiome produces riboflavin (B2) supplementing plant endogenous FAD. Depleted soils → lower microbial B2 → CRY2 less stable → weaker synchrony. Speculative (L*) — plants also synthesize B2 endogenously.",
        status: "pending",
        locked: "2026-08-31",
      },
    ],
    plantCryStatus: "LOCKED — awaiting test",
    plantCryLocked: "Locked: 2026-08-31",
    criticalLabel: "Critical",
    pharmEvidenceLink: "Pharmacological evidence →",
    infantEvidenceLink: "Infant vulnerability evidence →",
    neuroEvidenceLink: "Neurological spectrum evidence →",
    // Inline UI strings (former ternaries)
    dashPredictions: "Predictions",
    dashCategories: "Categories",
    dashVerified: "Verified",
    dashAwaiting: "Awaiting test",
    dashPredictionStatus: "Prediction status",
    statusBarAria: "Status bar: 4 verified, 254 pending, 2 CI exceeded",
    statusVerified: "Verified",
    statusAwaiting: "Awaiting test",
    statusCiExceeded: "CI exceeded",
    tfrExplanation: "The grey line is the World Bank published TFR series. The blue wedge is the locked sensitivity envelope, not a confidence interval. When the prediction year is observed, it appears as a diamond: green inside the envelope, red outside.",
    finland2030Label: "Finland 2030 — TFR",
    ciExceededBadge: "exceeded",
    southKorea2030Label: "South Korea 2030 — TFR",
    ciRiskZone: "risk zone",
    speciesAria: "Species sensitivity by body mass",
    sensitivityLabel: "Sensitivity",
    insects: "Insects",
    smallBirds: "Small birds",
    amphibiansLabel: "Amphibians",
    smallMammals: "Small mammals",
    largeMammals: "Large mammals",
    humansLabel: "Humans",
    predMatrixAria: "Prediction matrix",
    animalLabel: "Animal",
    humanLabel: "Human",
    populationLabel: "Population",
    reproductiveLabel: "Reproductive",
    neuralLabel: "Neural",
    metabolicLabel: "Metabolic",
    immuneLabel: "Immune",
    circadianLabel: "Circadian",
    cascadePathAria: "Cascade path",
    nutritionalShort: "Nutritional",
    metabolicShort: "Metabolic",
    pharmacologicalShort: "Pharmacological",
    cascadePathSubtitle: "Confirming one prediction feeds evidence to the next",
    evidenceCascadePath: "Evidence cascade path",
    evidenceCascadeDesc: "Nutritional, metabolic, and pharmacological prediction lines build sequentially. Confirming one category feeds evidence to the next.",
    evidenceCascadeAria: "Evidence cascade: Nutritional, Metabolic, Pharmacological",
    nutritionalFull: "Nutritional",
    metabolicFull: "Metabolic",
    pharmacologicalFull: "Pharmacological",
    cascadeConfirmation: "Confirmation on the left strengthens predictions on the right",
    sentinelHierarchyTitle: "Sentinel species sensitivity hierarchy",
    sentinelHierarchyDesc: "EMF sensitivity scales with body mass: M^(-0.25). Smaller species are more susceptible.",
    sentinelHierarchyAria: "Sentinel species sensitivity hierarchy",
    sensitivityTop: "Sensitivity (highest at top)",
    emfSensitivity: "EMF sensitivity",
    nextLabel: "Next",
    sourcesTitle: "Sources",
  },
  fi: {
    title: "Lukitut ennusteet",
    subtitle: "Nämä ennusteet lukittiin BERM v17:n skalaarialtistusarkkitehtuurilla. Ne ovat falsifioitavissa: jokainen verrataan havaittuun dataan ilmoitettuna vuonna.",
    tfrTitle: "TFR-ennusteet",
    tfrLead: "Maa- ja globaalitason kokonaishedelmällisyysluvun ennusteet yksi-kerrallaan-parametriherkkyysalueella (ei luottamusvälejä).",
    bioTitle: "Biomarkkeriennusteet",
    bioLead: "Siittiökonsentraatio- ja sukupuolisuhde-ennusteet samasta malliarkkitehtuurista.",
    v2Title: "BERM v17 -ennusteen tila",
    v2Status: "BERM v17 ei julkaise maakohtaisia FieldState-kalibroituja ennusteita. Nykyinen reitti tarvitsee kohdistetun paikallisen FieldStaten, rekisteröidyt elin- ja paripäätepisteet, ASFR-mallinnuksen ja ulkoisen ajallisen validoinnin ennen ennusteen lukitsemista.",
    v2Note: "Kun FieldState-kalibroidut ennusteet ovat valmiita, ne julkaistaan rinnakkain näiden skalaariproxy-ennusteiden kanssa vertailua varten.",
    histTitle: "Historialliset / evoluutioennusteet",
    histLead: "Ennusteet jotka on johdettu sisäkkäisestä χ-mallista ja Pohjoinen paketti -hypoteesista. Nämä testaavat, moduloivatko populaatiokohtaiset biologiset χ-profiilit EMF-hedelmällisyyssuhdetta.",
    r43Title: "R43: Protokolla-verhokäyräresonanssi",
    r43Text: "[[ref:zandieh2025|Zandieh ym. (2025)]] raportoi taajuusriippuvaisia mitokondrio-/ROS-havaintoja ELF-syöpäsolukokeissa (0,01–5 Hz; enintään 100 mT). Se tukee alustavaa mitattua PSD-protokollaa sen testaamiseksi, tuottaako verkkokerroksen verhokäyrämodulaatio soluvasteen. Se ei osoita RF-verkon verhokäyrävaikutuksia, eDRX-kausaliteettia eikä lisääntymis-/TFR-parametria.",
    country: "Maa",
    year: "Vuosi",
    metric: "Mittari",
    prediction: "Ennuste",
    sensitivity: "Herkkyys",
    version: "Versio",
    locked: "Lukittu",
    statusLabel: "Tila",
    history: "Versiohistoria",
    sentinelTitle: "Sentinellikaskadi-ennusteet",
    sentinelLead: "Lajienväliset viive-ennusteet CSLI:n 31 maan mehiläis–TFR-paneelista. Nämä testaavat, edeltääkö sentinellilajien lasku ihmisen hedelmällisyyden laskua lukitulla viiveellä.",
    architectureNote: "Arkkitehtuurihuomautus",
    architectureText: "Nämä ennusteet käyttävät skalaarin kumulatiivisen altistuksen arkkitehtuuria (v17). Mobiilipenetraatio on teknologian käyttöönoton ajoitusproxy. Herkkyysalue varioi yhtä parametria kerrallaan; se ei ole probabilistinen luottamusväli.",
    ciExceededTitle: "Kolmihaarainen falsifikaatioanalyysi",
    finlandFalsification: "Tila: CI YLITTYNYT (havaittu ~1,30, yläraja 1,24). Kolme mahdollista selitystä BERM:n kehyksessä: (a) Malli yliarvioi biologista vaikutusta Suomessa — eksponentiaalinen EMF–TFR-suhde voi saturoitua mallinnettua aiemmin. (b) Eksogeeninen kompensaatio: maahanmuuton TFR-panos suurempi kuin arvioitu — Suomen maahanmuuttajien TFR (~1,8–2,2) voi nostaa kansallista TFR:ää yli syntyperäisväestön ennusteen. (c) CI liian kapea: mallin epävarmuusvyöhykkeet aliarvioivat stokastista vaihtelua pienen väestön TFR:ssä. Erotteleva testi: vertaa syntyperäisten TFR:ää (jos saatavissa Tilastokeskuksesta) ennusteeseen. Jos syntyperäisten TFR ≤ 1,24, selitys (b) vahvistuu eikä malli ole falsifioitu.",
    southKoreaFalsification: "Tila: CI RISKIALUE (havaittu ~0,80, yläraja 0,72). Kolme mahdollista selitystä: (a) Malli yliarvioi EMF-suppressiota Koreassa — kulttuuriset/poliittiset tekijät voivat vaikuttaa TFR:ään itsenäisesti EMF:stä riippumatta. (b) Mittausviive: Korean pronatalistiset politiikat (käteistuet, asumistuet) ovat voineet tilapäisesti nostaa TFR:ää biologisen trajektorin yläpuolelle. (c) Mallin palautumisarvio Korealle voi olla liian optimistinen. Erotteleva testi: seuraa laskeeko Korean TFR kohti ennustettua arvoa vai vakiintuuko se nykyiselle tasolle.",
    modulomeTitle: "Modulooma-ennusteet",
    modulomeLead: "Mekanistiset ennusteet jotka perustuvat kahdeksankerroksiseen EMF-moduloomiin ja terapeuttisten laitteiden evidenssiin. Nämä ovat kvalitatiivisia, falsifioitavia ennusteita — jokainen määrittää konkreettisen kokeellisen tuloksen.",
    modulomePredictions: [
      {
        id: "M-1",
        title: "Faraday-suojattu IVF-laboratorio",
        description: "Faraday-häkillä EMF-suojattu IVF-laboratorio osoittaa merkittävästi korkeampaa fertilisaatio-, blastokystti- ja raskausastetta verrattuna tavallisiin laboratorioihin.",
        timeline: "Testattavissa 1–2 vuodessa",
        falsification: "Ei eroa missään IVF-tulosmittarissa",
      },
      {
        id: "M-2",
        title: "Nappikuulokkeiden käyttäjät: matalampi vagaalinen tonus",
        description: "Nappikuulokkeiden pitkäaikaiskäyttäjillä (>4h/pv yli 2 vuotta) on merkittävästi matalampi sykevälivaihtelu (HRV) verrattuna sovitettuihin ei-käyttäjiin, mikä indikoi alentunutta vagaalista tonusta.",
        timeline: "Testattavissa heti (puettavien laitteiden HRV-data)",
        falsification: "Ei HRV-eroa tai korkeampi HRV kuulokkeiden käyttäjillä",
      },
      {
        id: "M-3",
        title: "LED vs hehkulamppu: siittiölaatu rotilla",
        description: "LED-valaistuksessa kasvatettujen urosrottien siittiöiden liikkuvuus ja konsentraatio on merkittävästi matalampia kuin hehkulamppuvalaistuksessa kasvatettujen, neljän ryhmän koeasetelmassa joka erottelee valospektrin EMF-emissiosta.",
        timeline: "Testattavissa 3–6 kuukaudessa",
        falsification: "Ei eroa, tai EMF-suojattu LED = suojaamaton LED",
      },
      {
        id: "LED-1",
        title: "EU:n LED-kielto ja TFR-kiihtyminen",
        description: "EU-maat (pakollinen LED-siirtymä 2009–2012, [[ref:eu_regulation_244_2009|direktiivi 244/2009]]) osoittavat nopeampaa TFR-laskua 2015–2022 verrattuna maihin joissa hehkulamppukielto tuli myöhemmin tai ei lainkaan, kontrolloiden matkapuhelintiheyttä, BKT:ta ja kaupungistumista. Keskiarvio: TFR-laskun kiihtyminen ≥0,02/vuosi nopeampi EU:ssa vs ei-EU-kontrollit.",
        timeline: "Testattavissa heti (olemassa oleva demografinen data)",
        falsification: "Ei kiihtymiseroa, tai ei-EU-maat osoittavat nopeampaa laskua",
      },
      {
        id: "SLEEP-1",
        title: "Faraday-suojattu LED-unitesti",
        description: "Faraday-suojattu makuuhuone (< 0,001 V/m IF) identtisellä LED-valaistuksella tuottaa paremman unenlaadun kuin suojaamaton makuuhuone, vaikka sinivalon spektri on identtinen. Tämä eristää IF-emissiokanavan optisesta kanavasta. Jos totta: IF-emissiot (eivät sinivalo) ovat ensisijainen LED-valaistuksen unihäiritsijä. Jos epätotta: sinivalo tai muut tekijät hallitsevat. Kustannusarvio: < 5 000 €.",
        timeline: "Testattavissa 1–3 kuukaudessa (N=20 ristikkäisasetelma)",
        falsification: "Ei unenlaatueroa suojatun ja suojaamattoman tilan välillä identtisellä valospektrillä",
      },
      {
        id: "M-5",
        title: "LLLT parantaa spermatogeneesiä CCO-aktivaation kautta",
        description: "Matalan tason laserterapia (620–1100 nm) kiveksiin kontrolloidussa eläinkokeessa parantaa spermatogeneesin merkkiaineita (liikkuvuus, konsentraatio, morfologia) mitokondriaalisen sytokromi c -oksidaasiaktivaation kautta — sama kromoforimekanismi kuin FDA-hyväksytyissä fotobiomodulaatiolaitteissa. Jos LLLT (optinen EM) parantaa hedelmällisyyttä CCO:n kautta ja RF (matalampi EM) heikentää hedelmällisyyttä CRY:n kautta, kromoforien yleistys ennustaa, että sekä optiset että RF-taajuudet moduloivat lisääntymisbiologiaa taajuusspesifisten kromofoorikohteiden kautta.",
        timeline: "Testattavissa 3–6 kuukaudessa (eläinkoe)",
        falsification: "Ei parannusta missään spermatogeneesin mittarissa, tai parannus on luonteeltaan terminen",
      },
      {
        id: "NEURO-1",
        title: "CACNA1C-kantajat osoittavat vahvemman EMF-ASD-yhteyden",
        description: "Genotyypitetyssä syntymäkohortissa dokumentoidulla prenataalisella EMF-altistuksella: stratifioi ASD/ADHD-diagnoosit CACNA1C rs1006737 -genotyypin JA äidin EMF-altistustason mukaan. Ennuste: merkitsevä GxE-interaktio jossa riskialleeli + korkea EMF tuottaa synergistisen ASD/ADHD-riskin nousun yli additiivisten vaikutusten.",
        timeline: "Vaatii suuren genotyypitetyn kohortin (tuhansia)",
        falsification: "Ei GxE-interaktiota CACNA1C-lokuksessa",
      },
      {
        id: "NEURO-2",
        title: "Litium vaimentaa EMF-indusoitua hermosolujen oskillaatiohäiriötä",
        description: "Altista hiPSC-johdetut hermosoluviljelmät EMF:lle ja mittaa verkko-oskillaatiomalleja (MEA). Lisää sitten litium. Ennuste: litium palauttaa oskillaatioiden säännöllisyyden koska se vaimentaa Ca²⁺-oskillaatioita IMPA1/inositolireitin kautta — sama mekanismi joka tekee siitä tehokkaan kaksisuuntaisessa mielialahäiriössä.",
        timeline: "Testattavissa 3–6 kuukaudessa (in vitro)",
        falsification: "Litium ei palauta oskillaatioiden säännöllisyyttä EMF-altistuksen jälkeen",
      },
      {
        id: "EPI-1",
        title: "EMF-altistettujen isien jälkeläisten siittiöiden metylaatiomuutokset",
        description: "Altista uroshhiiret krooniselle RF-EMF:lle. Parrita altistamattomien naaraiden kanssa. Analysoi F1-urospoikasten siittiöiden DNA-metylaatiomallit. Ennuste: spesifiset DMR:t ovat päällekkäisiä ihmisten tutka-tutkimuksen kanssa ([[ref:res-square-2025-radar-methylation|Research Square 2025]]). Jos DMR:t sisältävät CACNA1C:n tai muita VGCC-geenejä, tämä sulkee epigeneettisen takaisinkytkentäsilmukan.",
        timeline: "Testattavissa 6–12 kuukaudessa (eläinkoe)",
        falsification: "Ei DMR-päällekkäisyyttä tutkatutkimuksen kanssa tai ei VGCC-geeni-DMR:iä F1:ssä",
      },
      {
        id: "EPI-2",
        title: "Ei-monotoninen metylaatiovaste EMF:lle",
        description: "Toista GC-2-tutkimus laajemmalla intensiteettialueella (0,1, 0,5, 1, 2, 3, 5 mT). Ennuste: metylaatiomuutokset osoittavat ei-monotonisen annos-vasteen vähintään yhdellä merkinvaihdolla, Blackmanin Ca²⁺-ikkunan tavoin. Jos vahvistetaan, Lindgrenin ikkunadynamiikat toimivat epigeneettisellä tasolla.",
        timeline: "Testattavissa 3–6 kuukaudessa (in vitro)",
        falsification: "Monotoninen annos-vaste ilman merkinvaihtoa",
      },
      {
        id: "SCHWAN-1",
        title: "GSM tuottaa suurempia siittiövaikutuksia kuin LTE samalla SAR-arvolla",
        description: "Altista vastaatetut siittiönäytteet: (1) GSM-moduloitu 900 MHz (217 Hz TDMA), (2) LTE-moduloitu 900 MHz (OFDM), (3) CW 900 MHz, kaikki identtisellä aikaintegroidulla SAR-arvolla. Mittaa motiliteetti, ROS ja DNA-fragmentaatio. Ennuste: GSM > LTE > CW koska GSM:n kova pulssi tuottaa vahvimman ELF-kalvokomponentin. Testaa suoraan Schwanin + T-tyypin bifurkaatiomekanismin.",
        timeline: "Testattavissa 1–3 kuukaudessa (in vitro)",
        falsification: "Ei eroa modulaatiotyyppien välillä samalla SAR-arvolla tai CW > moduloitu",
      },
    ],
    modulomeTimeline: "Aikajana",
    modulomeFalsification: "Kumoamisehto",
    modulomeLocked: "Lukittu: 2026-08-21",
    modulomeStatus: "LUKITTU — odottaa testiä",
    cascadeTitle: "Sairauskaskadi-ennusteet",
    cascadeLead: "Ennusteet jotka perustuvat nelikanavaiseen kroonisten sairauksien kaskadimalliin. Jokainen testaa, noudattaako seitsemän sairauden kaskadi modulooman biologista viivehierarkiaa ja kanavaspesifisiä altistusmalleja.",
    cascadePredictions: [
      {
        id: "P11",
        title: "COVID IF-kanava -retrodiktio",
        description: "Lockdownin aikana IF-herkät sairaudet (hedelmättömyys → paraneminen) ja RF-herkät sairaudet (masennus → paheneminen) käyttäytyvät erisuuntaisesti. COVID-lockdown toimii luonnollisena kokeena: työpaikkojen IF-altistus laski ~70 % (LED-valaistut toimistot kiinni) samalla kun kotien RF-altistus nousi ~40 % (lisää puhelin-/Wi-Fi-käyttöä). Tämä ennustaa kanavaspesifisiä, vastakkaismerkkisiä terveysvaikutuksia.",
        validation: "GBD 2024 + kansalliset terveysrekisterit",
        falsification: "Ei erisuuntaista vaikutusta IF-herkkien ja RF-herkkien sairauksien välillä lockdownin aikana",
      },
      {
        id: "P12",
        title: "LED-rollout × siittiölaatu",
        description: "Maissa joissa EU:n LED-siirtymä tapahtui aikaisemmin, siittiölaadun laskun pitäisi kiihtyä aikaisemmin kuin maissa joissa se tapahtui myöhemmin. EU vs ei-EU difference-in-differences -asetelma, kontrolloiden matkapuhelintiheyttä, BKT:ta ja kaupungistumista.",
        validation: "[[ref:levine2023_sperm|Levine-meta-analyysin]] maakohtaiset estimaatit + [[ref:eu_regulation_244_2009|EU:n direktiivin 244/2009]] implementointiajankohdat (2009–2016)",
        falsification: "Ei kiihtymiseroa, tai ei-EU-maat osoittavat nopeampaa laskua",
      },
      {
        id: "P13",
        title: "Kaskadijärjestyksen testi",
        description: "Seitsemän kroonisen sairauden kiihtymispisteiden järjestys noudattaa modulooman biologista viivehierarkiaa: uni < masennus < ADHD < diabetes < autoimmuuni < hedelmättömyys < syöpä. Jokaisen kiihtymispisteen pitäisi osua 0–10 vuoden viiveellä spesifisen teknologiasukupolven massakäyttöönoton jälkeen.",
        validation: "GBD 2024 kiihtymispisteiden tilastollinen analyysi (rakenteellinen murroskohdan tunnistus)",
        falsification: "Kiihtymispisteiden järjestys ei vastaa modulooman hierarkiaa, tai ne eivät ole ajallisesti kytköksissä teknologian käyttöönottoon",
      },
      {
        id: "P14",
        title: "EMF × psykedeelien vaste -interaktio",
        description: "Potilaat joilla on korkeampi lähtötason EMF-altistus (mitattu henkilökohtaisella RF-dosimetrillä) osoittavat voimakkaamman akuutin vasteen psilosybiiniavusteiseen terapiaan, koska krooninen EMF-aiheutettu Ca²⁺-säätelyn häiriö luo suuremman homeostaattisen vajeen jonka psykedeelien Ca²⁺-reset korjaa. Korkean EMF:n potilailla pitäisi olla suurempi pre/post MADRS-ero.",
        validation: "Psilosybiinin kliininen koe RF-dosimetria kovariaattina",
        falsification: "Ei korrelaatiota EMF-altistuksen ja hoitovasteen suuruuden välillä, tai käänteinen korrelaatio",
      },
      {
        id: "P15",
        title: "CACNA1C-genotyyppi × psykedeelien vaste",
        description: "Potilaat joilla on CACNA1C-riskivariantteja (assosioitu kaksisuuntaiseen mielialahäiriöön ja skitsofreniaan GWAS:ssa) osoittavat muuttuneen psilosybiinivasteen, koska psykedeelien signaaliketju päättyy Cav1.2:een (CACNA1C). Erityisesti rs1006737 A-alleelin kantajilla pitäisi olla joko tehostunut tai paradoksaalinen vaste, erottuva villin tyypin vastaajista.",
        validation: "Farmakogenominen analyysi olemassa olevasta psilosybiini-koedatasta CACNA1C-genotyypityksellä",
        falsification: "Ei genotyyppi-vaste-assosiaatiota CACNA1C-lokuksessa",
      },
      {
        id: "P16",
        title: "Litium suojaa EMF:n mielialavaikutuksilta",
        description: "Litiumin käyttäjillä mielialan heikkeneminen EMF-altistuksen vasteena on vaimentunut verrattuna ei-litiumkontrolleihin, koska Li⁺ miehittää suoraan VGSC:n ja normalisoi Na⁺/Ca²⁺-tasapainon jonka EMF häiritsee. Ekologinen testi: litiumhoidetut bipolaariset potilaat eivät osoita kausittaista RF-korreloitua mielialavaihtelua, kun taas lääkitsemättömät potilaat osoittavat.",
        validation: "Mielialaseurantasovelluksen data (esim. Daylio) × henkilökohtainen RF-dosimetria, stratifioitu litiumin käytön mukaan",
        falsification: "Litiumin käyttäjillä on yhtäläinen tai suurempi EMF-mielialaherkkyys kontrolleihin verrattuna",
      },
      {
        id: "P17",
        title: "EMF-altistus vähentää ihon transepiteliaalista potentiaalia (TEP)",
        description: "Kontrolloitu EMF-altistus vähentää mitattavasti ihon TEP:ia (lähtötaso 10–60 mV) Na⁺/K⁺-ATPaasin häiriön kautta. EHS-raportoivat yksilöt osoittavat suuremman TEP-pudotuksen kuin sovitetut kontrollit samalla altistuksella, koska heidän ionikanavaherkkyyskynnykensä on matalampi. Kaksoissokkomittaus Ag/AgCl-elektrodeilla kyynärvarren iholta.",
        validation: "Kaksoissokko TEP-mittaus ennen/aikana/jälkeen kontrolloidun RF-altistuksen (1 V/m, 30 min), EHS vs. kontrollikohortti",
        falsification: "Ei TEP-muutosta EMF:n alla, tai EHS-potilaat osoittavat yhtäläisen tai pienemmän muutoksen kuin kontrollit",
      },
      {
        id: "P18",
        title: "EMF hidastaa haavan paranemista elektrotaktisen häiriön kautta",
        description: "Standardoidut ihohaavat (esim. imurakkulat) paranevat merkittävästi hitaammin korkean EMF:n ympäristöissä verrattuna Faraday-suojattuihin kontrolleihin, koska ulkoinen EMF asettaa kohinan endogeenisen haavan sähkökentän (100–200 mV/mm) päälle, joka ohjaa keratinosyyttien elektrotaksista. Vaikutuksen suuruuden tulisi korreloida EMF-kentänvoimakkuuden kanssa.",
        validation: "Imurakkulahaavan paranemisen RCT: Faraday-suojattu vs. normaalihuone, aika uudelleenepitelialisaatioon",
        falsification: "Ei haavan paranemiseroa, tai nopeampi paraneminen korkean EMF:n ympäristössä",
      },
      {
        id: "P19",
        title: "LED-sinivalon verkkokalvovaurio on IF-EMF-välitteinen",
        description: "LED-sinivalolle yhdistetty verkkokalvovaurio johtuu osittain LED:n hakkuriteholähteen IF-EMF:stä (65 kHz – 2 MHz), ei pelkästä sinivalosta. Hehkulamppu joka on suodatettu identtiseen sinispektriin (ei IF-EMF:ää) tuottaa merkittävästi vähemmän verkkokalvon oksidatiivista stressiä kuin LED-sinivalo samalla intensiteetillä ja spektrillä.",
        validation: "LED vs. hehkulamppu (sama sinispektri) verkkokalvosolujen elinkykytesti; LED vs. hehkulamppu + IF-EMF-lähde",
        falsification: "Hehkulampun sinivalo tuottaa yhtäläisen verkkokalvovaurion kuin LED-sinivalo sovitetuilla spektreillä ja intensiteetillä",
      },
      {
        id: "P20",
        title: "IF-EMF yksin aiheuttaa verkkokalvon oksidatiivista stressiä",
        description: "IF-EMF-altistus (65 kHz – 2 MHz, LED-ajurin tuottamilla tasoilla) ilman minkäänlaista valoärsykettä tuottaa mitattavaa oksidatiivista stressiä verkkokalvosoluissa Cav1.4 VGCC-aktivaation kautta. Tämä vahvistaisi, että LED-valon IF-EMF-komponentti on itsenäisesti biologisesti aktiivinen verkkokalvokudoksessa.",
        validation: "Verkkokalvosolujen viljelmä IF-EMF-altistuksessa (ei valoa): ROS-mittaus, Cav1.4-kanavan aktiivisuus",
        falsification: "Ei verkkokalvon oksidatiivista stressiä pelkästä IF-EMF:stä, tai ei Cav1.4-osallisuutta",
      },
      {
        id: "P21",
        title: "Yötila ei poista IF-EMF-melatoniinisuppressiota",
        description: "Puhelimen/tabletin 'yötila' (lämmin värisuodatin) poistaa sinivalon mutta EI IF-EMF:ää näytön taustavalosta. Melatoniinisuppressio yötilan ollessa PÄÄLLÄ on merkittävästi suurempi kuin ilman näyttöä, koska IF-EMF jatkaa melatoniinin suppressiota CRY-reitin kautta riippumatta valospektristä. Mekanistinen perusta: [[ref:chae2019|Chae ym. (2019)]] osoittivat, että ihmisen magnetoreseptio vaatii sinistä valoa (400–500 nm), mikä tunnistaa kryptokromin transduseriksi. Tämä tarkoittaa kahta riippumatonta interventiopistettä: (1) sinivalosuodatus poistaa CRY-aktivaation kokonaan (ei radikaaliparia häirittäväksi), ja (2) Faraday-suojaus poistaa RF-häiriön säilyttäen luonnollisen CRY-toiminnan. BERM ennustaa Faraday-suojauksen olevan tehokkaampi, koska se korjaa häiriön jättäen luonnollisen järjestelmän ehjäksi, kun taas sinivalosuodatus poistaa häiriön sammuttamalla koko CRY-järjestelmän.",
        validation: "Sylki-melatoniini: yötila-näyttö vs. ei näyttöä vs. hehkulamppu-lukuvalo, ilta-altistusprotokolla",
        falsification: "Yötila palauttaa melatoniinin ilman-näyttöä-lähtötasolle",
      },
      {
        id: "P22",
        title: "Myopia korreloi IF-EMF:n, ei pelkän sinivalon kanssa",
        description: "Lasten myopiaepidemia korreloi kumulatiivisen IF-EMF-altistuksen (ruutuaika + LED-valaistustunnit) kanssa voimakkaammin kuin pelkän sinivaloannoksen kanssa. EU:n hehkulamppukielto (2009) tarjoaa luonnollisen kokeen: maiden joissa LED-yleistyminen on nopeampaa pitäisi osoittaa jyrkempi myopian kasvu, kontrolloituna opiskelutunneilla ja ulkoajalla.",
        validation: "Maiden välinen DID-analyysi: LED-yleistymisaste × myopian esiintyvyys, kontrolloituna lähityötunneilla ja ulkoajalla",
        falsification: "Myopian esiintyvyys korreloi yhtäläisesti sinivalon ja IF-EMF:n kanssa, tai LED-yleistymisen ajoitus ei osoita yhteyttä",
      },
      {
        id: "P23",
        title: "Sairaaloiden EMF-tasot korreloivat post-hospital-syndroomaan",
        description: "Sairaalat joissa on korkeammat mitatut EMF-tasot (erityisesti IF LED-valaistuksesta ja RF Wi-Fi-tiheydestä) osoittavat korkeamman post-hospital-syndrooman (PHS) ilmaantuvuuden, kontrolloituna potilaiden sairastavuudella, hoitoajalla ja hoidon laatumittareilla. Korrelaation tulisi olla voimakkain ikääntyneillä potilailla (>75 v.) jotka viettävät eniten aikaa sängyssä.",
        validation: "Monisairaalamittaus EMF × 30 päivän uudelleenotto-/komplikaatioaste, stratifioituna iän ja liikkumiskyvyn mukaan",
        falsification: "Ei korrelaatiota sairaalan EMF-tasojen ja PHS:n ilmaantuvuuden välillä sekoittavien tekijöiden kontrolloinnin jälkeen",
      },
      {
        id: "P24",
        title: "Matalan EMF:n potilashuone parantaa toipumista",
        description: "Potilaat Faraday-suojatuissa tai matalan EMF:n huoneissa (vähemmän Wi-Fi:ä, hehkulamppu/DC-valaistus, minimaaliset monitorit) osoittavat nopeamman toipumisen, lyhyemmät hoitoajat, matalamman deliriumesiintyvyyden ja paremman unenlaadun verrattuna standardihuoneisiin, kontrolloituna sairastavuudella ja hoitoprotokollilla.",
        validation: "RCT tai kvasikokeellinen: matalan EMF:n osasto vs. standardiosasto, ensisijaiset päätetapahtumat: hoitoaika, delirium, unenlaatu (aktigrafia)",
        falsification: "Ei eroa missään toipumismittarissa, tai huonommat tulokset matalan EMF:n huoneissa",
      },
      {
        id: "P25",
        title: "Kotihoidon etu on osittain EMF-välitteinen",
        description: "Kotihoidon havaittu etu sairaalaan verrattuna tietyille ikääntyneille potilaille välittyy osittain matalamman EMF-altistuksen kautta kotona. Korkean EMF:n kotiympäristöön (useita Wi-Fi-verkkoja, LED-valtainen) kotiutettujen potilaiden tulokset muistuttavat sairaala-potilaiden tuloksia enemmän kuin matalan EMF:n kotien potilaiden.",
        validation: "Kodin EMF-mittaus kotiutuksessa × 30 päivän tulokset, korkean vs. matalan EMF:n kotiympäristö verrattuna",
        falsification: "Kodin EMF-tasot eivät ennusta kotiutuksen jälkeisiä tuloksia sosioekonomisten tekijöiden kontrolloinnin jälkeen",
      },
      {
        id: "P29",
        title: "AD-ilmaantuvuus korreloi kumulatiivisen elinaikais-EMF:n kanssa",
        description: "Alzheimerin taudin ilmaantuvuus korreloi kumulatiivisen elinaikais-EMF-altistuksen kanssa (kaupunki > esikaupunki > maaseutu), kontrolloituna koulutuksella, kardiovaskulaarisella riskillä ja ApoE4-statuksella. Mekanismiketju: EMF → VGCC → Ca²⁺ ↑ → BACE1 → Aβ-oligomeerit → positiivinen palautesilmukka. Kalsiumhypoteesi (LaFerla, O'Day) tunnistaa Ca²⁺-dysregulaation proksimaalisena syynä; BERM tarjoaa ylävirran ympäristötekijän.",
        validation: "Pitkittäiskohortti RF/IF-dosimetrialla × AD-diagnoosi, kontrolloituna ApoE4:llä, koulutuksella, CVD-riskillä",
        falsification: "Ei annos-vastetta kumulatiivisen EMF:n ja AD-ilmaantuvuuden välillä sekoittavien tekijöiden kontrolloinnin jälkeen",
      },
      {
        id: "P30",
        title: "CACNA1C rs7304986 moduloi AD-riskiä",
        description: "CACNA1C rs7304986 T/C-kantajilla (jotka osoittavat suurempaa EMF-uniherkkyyttä [[ref:sousouri2025|Sousouri 2025:n]] mukaan) on korkeampi AD-riski kuin T/T-homotsygooteilla korkean EMF:n ympäristöissä, mutta yhtäläinen riski matalan EMF:n ympäristöissä. Sama geeni × ympäristö -interaktio kuin EHS:ssä: geneettisesti kohonnut VGCC-herkkyys vahvistaa ympäristöllistä Ca²⁺-dysregulaatiota.",
        validation: "GWAS × EMF-altistuksen interaktioanalyysi olemassa olevissa AD-biopankkikohorteissa",
        falsification: "Ei CACNA1C × EMF -interaktiota AD-riskissä, tai T/C-kantajilla matalampi AD-riski",
      },
      {
        id: "P31",
        title: "AD-ilmaantuvuus kiihtyy 2025–2035 (30 vuoden viive)",
        description: "AD-ilmaantuvuus 60–70-vuotiaiden ryhmässä kiihtyy demografisen ikääntymisen ennusteiden yli 2025–2035, heijastaen ~30 vuoden viivettä 2G/Wi-Fi-massakäyttöönotosta (1995–2005). VAROITUS: tämä kiihtyminen voi johtua muista syistä (diabetesepidemia, istuva elämäntapa, diagnostiset muutokset). Ennuste on vahvistettavissa vain jos EMF-spesifiset biomarkkerit (Ca²⁺-tasot, VGCC-ekspressio) ko-korreloivat.",
        validation: "Ikäspesifiset AD-ilmaantuvuustrendit vs. demografinen projektio, täydennettynä Ca²⁺/VGCC-biomarkkeripaneelilla",
        falsification: "Ei yli-demografista kiihtymistä, tai kiihtyminen ilman Ca²⁺/VGCC-biomarkkerikorrelaatiota",
      },
      {
        id: "P32",
        title: "Matalan EMF:n hoitokodit hidastavat AD:n etenemistä",
        description: "AD-potilaat matalan EMF:n hoitoympäristöissä (Faraday-suojattu tai vähennetty Wi-Fi/LED) osoittavat hitaamman kognitiivisen heikkenemisen (MMSE/MoCA-trajektori) kuin sovitetut kontrollit standardihoitolaitoksissa. Arendash-paradoksi (kontrolloitu 918 MHz suojaa hiirissä) viittaa siihen, että annos/taajuus/konteksti ratkaisevat — kaoottinen monitaajuuksinen ympäristö-EMF aiheuttaa vahinkoa, kun taas poistaminen mahdollistaa homeostaattisen palautumisen.",
        validation: "Kvasikokeellinen: matalan EMF:n hoitoyksikkö vs. standardiyksikkö, MMSE-trajektori 12 kuukauden aikana, kontrolloituna lääkityksellä ja lähtötason vakavuudella",
        falsification: "Ei eroa kognitiivisen heikkenemisen nopeudessa, tai nopeampi heikkeneminen matalan EMF:n ympäristössä",
      },
      {
        id: "P33",
        title: "CACNA1C-genotyyppi × raskausaikainen EMF → ADHD-riski",
        description: "CACNA1C rs7304986 T/C-kantajien äitien raskausaikainen EMF-altistus tuottaa korkeamman ADHD-riskin lapsille kuin T/T-kantajien. Geeni × ympäristö -interaktio: geneettisesti kohonnut VGCC-herkkyys vahvistaa raskausaikaisen EMF:n ionikanavien kalibraatiovirhettä. Sama CACNA1C-variantti assosioituu ADHD:hen, ASD:hen, bipolaarihäiriöön ja EMF-uniherkkyyteen ([[ref:sousouri2025|Sousouri 2025]]).",
        validation: "Kaiser-tyyppinen kohortti raskausaikaisella MF-dosimetrialla + äidin CACNA1C-genotyypitys × jälkeläisen ADHD-diagnoosi",
        falsification: "Ei CACNA1C × raskausaikainen EMF -interaktiota jälkeläisen ADHD-riskissä",
      },
      {
        id: "P34",
        title: "Guanfasiini suojaa EMF:n ADHD-efektiltä",
        description: "Jos ADHD on ionikanavien kalibraatiovirhe, guanfasiinin (HCN-kanavamodulaattori) pitäisi suojata EMF:n ADHD-oireita pahentavalta vaikutukselta paremmin kuin stimulanttien (jotka vain kompensoivat nostamalla signaalia). Kontrolloidussa EMF-altistuksessa guanfasiinihoitoisilla ADHD-potilailla pitäisi olla vähemmän oireiden pahenemista kuin metyylif.-hoitoisilla, koska guanfasiini korjaa kynnystä kun stimulantti nostaa signaalia.",
        validation: "Guanfasiini vs. metyylif. kontrolloidussa EMF-altistuksessa → ADHD-oireiden muutos (CPT, Conners)",
        falsification: "Guanfasiini osoittaa yhtäläistä tai heikompaa suojaa kuin metyylif. EMF:n oireita pahentavalta vaikutukselta",
      },
      {
        id: "P35",
        title: "ADHD-prevalenssin kiihtyminen seuraa raskausaikaista EMF:ää 3–10v viiveellä",
        description: "ADHD-prevalenssin kiihtyminen seuraa raskausaikaisen EMF-altistuksen kasvua 3–10 vuoden viiveellä (altistus → diagnoosi-ikä). 2G massoihin 1991–95 → ADHD-kiihtymä ~1995–2005. Älypuhelin massoihin 2007–12 → ADHD-kiihtymä ~2012–2020. 5G massoihin 2019–24 → ADHD-kiihtymä ~2025–2035 (ennuste). VAROITUS: ADHD-diagnostiikkakäytännöt ovat muuttuneet merkittävästi — prevalenssidata vaatii huolellista diagnostisten trendien korjausta.",
        validation: "Ikäspesifiset ADHD-ilmaantuvuustrendit vs. raskausaikainen EMF-proksi (matkapuhelinpenetraatio syntymävuonna), kontrolloituna diagnostiikkakäytäntöjen muutoksille",
        falsification: "Ei ajallista korrelaatiota raskausaikaisen EMF-proksin ja ADHD-ilmaantuvuuden välillä diagnostiikkakorjauksen jälkeen",
      },
      {
        id: "P36",
        title: "EMF-altistus × bipolaarihäiriön syklitaajuus",
        description: "Korkeammassa EMF-ympäristössä bipolaaripotilaiden mielialasyklien tulisi olla tiheämpiä, koska voimakkaampi ioninen perturbatio destabilisoi neuraalisen oskillaattorin — amplitudi kasvaa ja jaksonaika lyhenee. Laskennalliset mallit ([[ref:pubmed32278494_bipolar_ionic|PubMed 32278494]]) osoittavat bipolaaristen neuronien heilahtelevan hyper- ja hypoeksitaabelisuuden välillä ionikanavien konduktanssimuutosten vuoksi; EMF lisää ulkoisen perturbation tähän epästabiiliin järjestelmään.",
        validation: "EMF-dosimetria + mielialapäiväkirja + syklipituus pitkittäistutkimuksessa bipolaarikohortista",
        falsification: "Ei korrelaatiota ympäristö-EMF:n ja bipolaarisyklien tiheyden välillä",
      },
      {
        id: "P37",
        title: "Litium + EMF-suojaus -synergia bipolaarihäiriössä",
        description: "Litiumhoitoa saavat bipolaaripotilaat hyötyvät EMF-suojauksesta (Faraday) koska Li⁺ vaimentaa oskillaatiota JA EMF:n poisto eliminoi perturbation — yhteisvaikutus ylittää kummankin yksinään. Li⁺ kulkee VGSC:n kautta ja kertyy hyperaktiivisiin neuroneihin; EMF-perturbation poisto vähentää oskillaatiota jonka litiumin täytyy vaimentaa.",
        validation: "Li⁺ + Faraday-suojattu makuuhuone vs. Li⁺ yksin → syklitaajuus ja -amplitudi 6 kuukauden aikana",
        falsification: "Ei lisähyötyä EMF-suojauksesta litiumhoidon lisäksi",
      },
      {
        id: "P38",
        title: "IVF-onnistumisasteet matalampia korkean EMF:n klinikoilla",
        description: "Korkeamman EMF-tason IVF-laboratorioissa on matalammat fertilisaatio-, blastokystti- ja kliiniset raskausasteet. Melatoniini follikkuli­nesteessä on kriittinen munasolun suojaaja ([[ref:tamura2012_follicular_melatonin|Tamura 2012]]); EMF suppressoi endogeenistä melatoniinia ([[ref:battelle1980_emf_melatonin|Battelle 1980]], sirkadiaaninen polku), vähentäen follikulaarista antioksidanttipuolustusta haavoittuvimmassa vaiheessa. [[ref:tong2017_melatonin_ivf|Tongin 2017]] meta-analyysi osoittaa jo melatoniinilisän parantavan IVF-tuloksia — ennuste on, että EMF-ympäristö on sekoittava tekijä nykyisessä IVF-datassa.",
        validation: "IVF-laboratorioiden EMF-dosimetria (inkubaattori + hoitohuoneet) vs. klinikkatason tulokset, kontrolloituna potilasdemografialle",
        falsification: "Ei korrelaatiota klinikan EMF-tasojen ja IVF-tulosten välillä tavanomaisen sekoittavien tekijöiden korjauksen jälkeen",
      },
      {
        id: "P39",
        title: "Melatoniinilisä × EMF -interaktio IVF:ssä",
        description: "Melatoniinilisän hyöty IVF:ssä on SUUREMPI korkean EMF:n potilailla, koska korkea EMF luo syvemmän melatoniinivajeen jonka lisä osittain korjaa. Matalan EMF:n ympäristössä endogeeninen melatoniini on jo lähellä optimia, joten eksogeeninen lisä tuo vähemmän hyötyä. Tämä ennustaa interaktiotermin (melatoniini × EMF) IVF-tulosregressiossa, ei pelkkää melatoniinin pääefektiä.",
        validation: "IVF-RCT melatoniinilisällä, stratifioituna potilaan asuin-/ammatilliselle EMF-altistukselle (puettava dosimetri)",
        falsification: "Melatoniinihyöty on tasainen EMF-altistustasojen välillä (ei interaktiota)",
      },
      {
        id: "P40",
        title: "Vuorotyöntekijät: matalampi hedelmällisyys JA suurempi melatoniinilisän hyöty",
        description: "Vuorotyöntekijöillä on supp­ressoitunut yöllinen melatoniini (sirkadiaaninen häiriö + työpaikan valaistus + ammatillinen EMF), mikä ennustaa matalamman luonnollisen hedelmällisyyden JA suuremman absoluuttisen hyödyn melatoniinilisästä verrattuna päivätyöntekijöihin. Melatoniinisilta yhdistää kaskadin 1 (uni/sirkadiaaninen) kaskadiin 6 (hedelmällisyys) — vuorotyö on vahvin luonnollinen koe tälle yhteydelle, koska se häiritsee melatoniinia usean konvergoivan polun kautta samanaikaisesti.",
        validation: "Hedelmällisyystulokset (raskaaksi tulon aika, IVF-onnistuminen) vuoro- vs. päivätyöntekijöillä, melatoniinilisällä ja ilman",
        falsification: "Vuorotyöntekijät osoittavat yhtäläistä melatoniinilisän hyötyä päivätyöntekijöihin verrattuna, tai vuorotyön hedelmällisyysvaje ei välity melatoniini­tasojen kautta",
      },
      {
        id: "IF-1",
        title: "LED-hakkuri 20–100 kHz häiritsee normaalien solujen mitoosia",
        description: "LED-hakkurien kytkentätaajuudet (20–100 kHz) osuvat normaalien solujen mitoottiseen häiriöalueeseen, jonka TTFields-tutkimus tunnisti (Neuhaus ym., Nature 2020: normaalit solut herkimmillään ~50 kHz:llä vs. syöpäsolut 150–200 kHz:llä). Ennuste: normaalien jakautuvien solujen (esim. spermatogoniat, suolen kryptasolut) in vitro -altistus 20–100 kHz:n pulssikentille LED-hakkureille tyypillisillä intensiteeteillä tuottaa mitattavan lisäyksen aneuploidiassa, mitoottisen karan virhesuuntauksessa tai alentuneessa proliferaationopeudessa. Kaiser Permanente -sarja (Li 2002–2020) tarjoaa epidemiologisen tuen: EMDEX-mitattu MF-altistus assosioituu keskenmenoon, sperman laadun laskuun ja lapsuuden sairauksiin kuudessa kohortissa.",
        validation: "In vitro: normaalit solulinjat altistetuina 20–100 kHz:n pulssiaaltomuodolle (LED-hakkuria edustavalle) vs. sham → aneuploidia-aste, karan orientaatio, proliferaatio",
        falsification: "Ei vaikutusta normaalien solujen mitoosiin LED-hakkureille tyypillisillä taajuuksilla ja intensiteeteillä, tai vaikutus vain TTFields-tason intensiteeteillä (>100 V/m)",
      },
    ],
    cascadeValidation: "Validointi",
    cascadeFalsification: "Kumoamisehto",
    cascadeLocked: "Lukittu: 2026-08-22",
    cascadeStatus: "LUKITTU — odottaa testiä",
    cascadeLink: "Katso kaskadivisualisointi",
    nutritionalTitle: "Ravitsemuksellisen CRY-modulaation ennusteet",
    nutritionalLead: "Ennusteet jotka perustuvat CRY:n kaksoissysteemimalliin ja sen ravitsemuksellisiin modulaattoreihin (FAD/B2, omega-rasvahapot, AMPK-paastodynamiikka). Nämä testaavat onko polku C:n tehokkuus muokattavissa ravitsemusinterventiolla.",
    nutritionalPredictions: [
      {
        id: "NUT-1",
        title: "B2-lisä parantaa sirkadiaanista resilienssiä yölliselle EMF:lle",
        description: "RCT: B2-lisä (25 mg/vrk x 8 viikkoa) vs. plasebo koehenkilöillä joilla on huono unenlaatu ja runsas yöllinen puhelinkäyttö. Ensisijainen päätetapahtuma: melatoniinin alkamisviive. Toissijaiset: unitehokkuus, kortisolin herätysvaste. B2-ryhmän tulisi osoittaa vähemmän sirkadiaanista häiriötä koska FAD-kylläinen CRY on stabiilimpi EMF-perturbaatiota vastaan. Mekanistinen perusta: [[ref:hirano2017|Hirano 2017]] (FAD → CRY-stabiilisuus), [[ref:yap2025|Yap 2025]] (FAD → magneettinen herkkyys).",
        timeline: "Testattavissa 3-6 kuukaudessa (RCT, N=60)",
        falsification: "Ei eroa melatoniinin alkamisviiveessä tai unimittareissa B2- ja plaseboryhmien välillä",
      },
      {
        id: "NUT-2",
        title: "B2-puutos x EMF -interaktio 54 maan regressiossa",
        description: "Lisää väestötason B2-riittävyys kontrollimuuttujaksi 54 maan EMF-TFR-regressiomalliin. Ennuste: interaktiotermi (EMF x B2_puutos) on merkitsevä ja negatiivinen — maat joissa SEKÄ korkea EMF ETTÄ korkea B2-puutos osoittavat jyrkempää TFR-laskua kuin maat joissa vain korkea EMF. Kiina (>90 % B2-puutos, korkein EMF, alhaisin TFR) vs. Suomi (~15 % B2-puutos, korkea EMF, korkeampi TFR) on avainkontrasti. VAROITUS: Tämä on ekologista evidenssiä — korrelaatio, ei kausaatio.",
        timeline: "Testattavissa heti (olemassa oleva data + B2-tutkimukset ~30 maasta)",
        falsification: "Ei merkitsevää EMF x B2 -interaktiotermiä, tai interaktio on positiivinen",
      },
      {
        id: "NUT-3",
        title: "Paaston kesto ennustaa magnetoreseptiivistä herkkyyttä (käänteinen U)",
        description: "Toista [[ref:chae2019|Chae 2019:n]] ruokasuuntautumisparadigma asteitetuilla paaston kestoilla (4h, 8h, 12h, 16h, 24h). Ennuste: käänteinen U-muotoinen annosvaste — herkkyys huipentuu 12-16h kohdalla (optimaalinen CRY-vaihtuvuus riittävällä FAD:lla) ja laskee 24h+ (FAD-poolin ehtyminen alkaa). Lisähaara: B2-lisätty (25 mg ennen paastoa) vs. lisäämätön. B2-lisän tulisi siirtää huippua oikealle (sallien pidemmän paaston ennen laskua). Paastoparadoksin ratkaisu ([[ref:lamia2009|Lamia 2009]] AMPK-CRY + beta-oksidaatio-FAD) ennustaa tämän spesifisen muodon.",
        timeline: "Testattavissa 2-4 kuukaudessa (käyttäytymiskoe, N=40 per kesto)",
        falsification: "Monotoninen kasvu (ei laskua 24h), tai ei paastovaikutusta, tai B2 ei siirrä huippua",
      },
    ],
    nutritionalTimeline: "Aikataulu",
    nutritionalFalsification: "Falsifikaatiokriteeri",
    nutritionalLocked: "Lukittu: 2026-08-24",
    nutritionalStatus: "LUKITTU — odottaa testiä",
    metabTitle: "Metabolisen syndrooman ennusteet",
    metabLead: "Kuuden reitin EMF → metabolinen syndrooma -mallista johdetut ennusteet. CaMKII-konvergenssi ennustaa, että lihavuus, diabetes ja energiametabolian häiriö jakavat yhteisen ylävirran syyn, joka on testattavissa suojauksen, farmakologian ja epidemiologian avulla. Lihavuus on multifaktoriaalinen — nämä ennusteet testaavat onko EMF myötävaikuttava tekijä, ei onko se ainoa syy.",
    metabPredictions: [
      {
        id: "METAB-1",
        title: "Faraday-suojatut laboratoriorotat painavat vähemmän kuin suojaamattomat kontrollit",
        description: "Identtinen dieetti, identtinen genetiikka, identtinen lämpötila — ainoa ero on EMF-ympäristö. Ennuste: suojatut eläimet painavat 5-15 % vähemmän 6 kuukauden jälkeen. Perustuu [[ref:klimentidis2010|Klimentidisin paradoksi]]in (24 populaatiota, 8 lajia KAIKKI lihovat, p = 1,2×10⁻⁷) ja BAT-termogeneesimekanismiin ([[ref:maalouf2023|Maalouf 2023]], [[ref:5g_bat2025|5G BAT 2025]]). Tämä on yksittäisesti erottelevin koe EMF-metaboliahypoteesille.",
        timeline: "1-3 vuotta (kokeellinen, vaatii suojatun tilan)",
        falsification: "Ei painoeroa 12 kuukauden jälkeen identtisissä olosuhteissa",
        critical: true,
      },
      {
        id: "METAB-2",
        title: "CaMKII-inhibitio vaimentaa EMF-indusoitua painonnousua jyrsijöillä",
        description: "KN-93 tai AIP (CaMKII-inhibiittorit) EMF-altistetuille jyrsijöille tulisi vähentää painonnousua, BAT-dysfunktiota ja insuliiniresistenssiä verrattuna EMF-altistettuihin hoitamattomiin kontrolleihin. CaMKII on konvergenssimolekyyli joka yhdistää EMF-herkkyyden (Cav3.2-kynnyksen siirtymä), BAT-termogeneesin (UCP1-transkriptio), testosteronin (StAR-ekspressio) ja insuliinierityksen (β-solun Ca²⁺-dynamiikka). Jos CaMKII-konvergenssi on todellinen, sen inhibitio vaimentaa useita metabolisia päätetapahtumia samanaikaisesti.",
        timeline: "1-2 vuotta (kokeellinen, jyrsijämalli)",
        falsification: "CaMKII-inhibitio ei vaikuta EMF-indusoituihin metabolisiin muutoksiin",
      },
      {
        id: "METAB-3",
        title: "Semaglutidin teho korreloi ympäristön EMF-tason kanssa",
        description: "Jos EMF häiritsee L-tyypin VGCC → Ca²⁺ → ERK -reittiä jota GLP-1/semaglutidi vahvistaa ([[ref:bhatt2012_glp1|Bhatt 2012, PMC3556522]]), semaglutidin tulisi olla TEHOKKAAMPI korkean EMF:n populaatioissa (enemmän reittihaäiriötä korjattavaksi) mutta näyttää laskevia tuottoja EMF:n ylittäessä kynnyksen. Tämä on SPEKULATIIVINEN ennuste — mekanistisesti johdettu mutta kliinistä dataa ei vielä ole. Evidenssitaso: L*.",
        timeline: "3-5 vuotta (olemassa olevien RCT:iden data-analyysi)",
        falsification: "Ei korrelaatiota EMF-ympäristön ja semaglutiditehon välillä",
      },
      {
        id: "METAB-4",
        title: "Matalan EMF:n yhteisöjen lihavuusprevalenssi pysyy <10 % vuoteen 2035",
        description: "Vanhan järjestyksen amissit, tsimane, hadza ja vastaavat matalan EMF:n yhteisöt ylläpitävät lihavuuslukuja alle 10 % riippumatta ruokavalion modernisoitumisesta, kunhan EMF-altistus pysyy matalana. Tsimaneilla on tällä hetkellä <5 % lihavuus; Kitavalla ~0 %. Jos EMF on myötävaikuttava tekijä, nämä populaatiot pysyvät laihoina prosessoidun ruoan saatavuuden kasvaessakin — edellyttäen ettei EMF-ympäristö muutu.",
        timeline: "9 vuotta (pitkittäisseuranta)",
        falsification: "Matalan EMF:n yhteisön lihavuus nousee yli 15 % ilman merkittävää EMF-adoptiota",
      },
    ],
    metabTimeline: "Aikataulu",
    metabFalsification: "Falsifikaatiokriteeri",
    metabLocked: "Lukittu: 2026-08-25",
    metabStatus: "LUKITTU — odottaa testiä",

    trpc1Title: "Farmakologiset polkujen erotusennusteet",
    trpc1Lead: "Ennusteet jotka testaavat polku A:n (VGCC) ja polku C:n TRPC1-kalsiumhaaran riippumattomuutta. CRY2-TRPC1-kompleksi ([[ref:yap2025|Yap ym. 2025]]) ennustaa, että EMF:n reproduktiovaikutukset voidaan farmakologisesti jakaa VGCC-riippuvaisiin ja TRPC1-riippuvaisiin komponentteihin.",
    trpc1Predictions: [
      {
        id: "TRPC1-1",
        title: "CRY2-TRPC1-kalsiumsisäänvirtaus vaikuttaa EMF:n reproduktiovaikutuksiin VGCC:stä riippumatta",
        description: "Altista reproduktiosoluja (esim. granuloosa-, Sertoli-soluja) EMF:lle neljässä olosuhteessa: (1) Kontrolli (ei salpaajia); (2) + Nifedipiini (estää VGCC:t, polku A) — eristää C:n kontribuution; (3) + Anti-TRPC1-vasta-aine (estää TRPC1:n) — eristää A:n kontribuution; (4) + Molemmat salpaajat — jäännösvaikutus = ei-Ca²⁺-polut (B, D). Ennuste: nifedipiini vähentää mutta EI poista EMF-vastetta. Jäännösvaste on CRY2-TRPC1-välitteinen (polku C:n kalsiumhaara). Anti-TRPC1 myös vähentää mutta ei poista vastetta. Molemmat salpaajat yhdessä tuottavat lähes täydellisen Ca²⁺-vasteen poistumisen. Tämä koe kvantifioi suoraan polkujen A (VGCC) ja C-kalsium (TRPC1) suhteelliset kontribuutiot EMF:n reproduktiovaikutuksiin.",
        timeline: "Testattavissa 6–12 kuukauden sisällä (in vitro, solulinjat saatavilla)",
        falsification: "Nifedipiini yksin poistaa kaikki EMF-indusoidut kalsiumvaikutukset (ei TRPC1-riippumatonta komponenttia), tai anti-TRPC1:llä ei ole vaikutusta (TRPC1 ei osallistu reproduktiosoluissa)",
      },
    ],
    trpc1Timeline: "Aikataulu",
    trpc1Falsification: "Falsifikaatiokriteeri",
    trpc1Locked: "Lukittu: 2026-08-24",
    trpc1Status: "LUKITTU — odottaa testiä",
    pharmTitle: "Farmakologiset ennusteet",
    pharmLead: "Farmakologisesta konvergenssista johdetut ennusteet. Jos VGCC-aktivaatio on EMF:n primaarinen transduutiomekanismi, tiettyjen lääkeryhmien pitäisi tuottaa mitattavia eroja EMF-assosioituihin päätepisteisiin. Nämä ennusteet hyödyntävät olemassa olevia reseptitietokantoja — uutta lääkealtistusta ei tarvita.",
    pharmPredictions: [
      {
        id: "PHARM-1",
        title: "CCB-käyttäjillä on vaimentunut siittiölaadun lasku verrattuna ARB/ACE-inhibiittori-käyttäjiin",
        description: "Vertaa siittiöparametreja (konsentraatio, motiliteetti, morfologia, DNA-fragmentaatio) kalsiumkanavan salpaajia käyttävien miesten ja ARB- tai ACE-inhibiittoreja verenpainetautiin käyttävien miesten välillä. Molemmilla ryhmillä on sama perussairaus; vain lääkemekanismi eroaa. CCB:t blokkaavat saman VGCC:n jonka BERM tunnistaa EMF-transduutiopisteeksi. Datalähde: olemassa olevat hedelmällisyysklinikkatietokannat ristiinviitattuna reseptitietojen kanssa.",
        timeline: "1–2 vuotta (retrospektiivinen tietokanta-tutkimus)",
        falsification: "Ei eroa siittiöparametreissa CCB- ja ARB/ACE-inhibiittori-käyttäjien välillä ikä-, BMI- ja liitännäissairausvakioinnin jälkeen",
        critical: true,
      },
      {
        id: "PHARM-2",
        title: "Verapamiili osoittaa vahvemman EMF-suojavaikutuksen kuin amlodipiini käyttöriippuvaisen salppauksen takia",
        description: "CCB-käyttäjien joukossa verapamiilin (taajuusriippuvainen VGCC-salpaaja) pitäisi osoittaa suurempaa EMF-biomarkkerien vaimentamista kuin amlodipiinin (jänniteriippuvainen salpaaja). IFO-mekanismi ennustaa korkeataajuista kanavasykilä EMF-altistuksen aikana — verapamiilin käyttöriippuvaisen kinetiikan pitäisi tarjota suhteettoman tehokas salppaus näiden purskahduksien aikana.",
        timeline: "2–3 vuotta (retrospektiivinen, vaatii riittävän verapamiili-otoskoon)",
        falsification: "Ei eroa verapamiili- ja amlodipiini-käyttäjien välillä missään EMF-relevantissa biomarkkerissa",
      },
      {
        id: "PHARM-3",
        title: "Litiumilla hoidetut bipolaaripotilaat osoittavat vähemmän sirkadiaanista häiriötä korkean EMF:n ympäristöissä",
        description: "Vertaa sirkadiaanisia markkereita (melatoniininerityksen ajoitus, nukahtamisviive, hämärämelatoniinialku) litium- vs. valproaatti/lamotrigiinipotilaiden välillä vastaavissa EMF-ympäristöissä. Litium stabiloi CRY-proteiineja GSK-3β-inhibition kautta, vastaten suoraan BERM:n reittiä C.",
        timeline: "1–3 vuotta (prospektiivinen tai retrospektiivinen puettavien laitteiden datalla)",
        falsification: "Litiumkäyttäjillä on yhtä suuri tai suurempi sirkadiaaninen häiriö kuin valproaattikäyttäjillä korkean EMF:n ympäristöissä",
      },
      {
        id: "PHARM-4",
        title: "Nimodipiini vaimentaa EMF:n aiheuttamia kognitiivisia vaikutuksia kun perifeeriset CCB:t eivät",
        description: "Nimodipiinin (BBB:n läpäisevä dihydropyridiini-CCB) pitäisi vaimentaa EMF-assosioituja kognitiivisia vaikutuksia, kun amlodipiinin (ei-BBB-penetrantti) ei pitäisi. Kolme moderaattoria erottavat BERM:n yksinkertaisesta Ca²⁺-blokkaus-hypoteesista: (a) vaikutuksen pitäisi olla SUUREMPI talvella kuin kesällä (CRY herkempi), (b) SUUREMPI AA-genotyypin kantajilla (enemmän Cav1.2), ja (c) SUUREMPI koehenkilöillä joilla WiFi kotona (primatumpi baseline). ETH Zürichin 5G-unitutkimus on ensimmäinen mahdollisuus testata näitä moderaattoreita suoraan.",
        timeline: "2–4 vuotta (prospektiivinen kohortti tai RCT-laajennustutkimus)",
        falsification: "Ei eroa nimodipiinin ja amlodipiinin välillä kognitiivisissa päätepisteissä, TAI ei moderaattorista riippuvaa vaihtelua (vuodenaika, genotyyppi, kodin EMF)",
      },
      {
        id: "PHARM-5",
        title: "CoQ10-supplementaatio vähentää EMF-assosioitua oksidatiivista vauriota annosriippuvaisesti",
        description: "Perustuen [[ref:bektas2026|Bektas 2026:een]] (3,5 GHz → kivesten ROS; CoQ10 lievittää): CoQ10-supplementaation (100–400 mg/pv) pitäisi vähentää virtsan 8-OHdG:tä (oksidatiivinen DNA-vauriomarkkeri) miehillä joilla on korkea älypuhelinkäyttö (>4h/pv, puhelin taskussa) annosriippuvaisesti.",
        timeline: "6–12 kuukautta (RCT toteutettavissa olemassa olevalla lisäravinteella)",
        falsification: "Ei 8-OHdG:n vähenemistä millään CoQ10-annoksella placeboon verrattuna korkean älypuhelinkäytön miehillä",
        critical: true,
      },
    ],
    pharmTimeline: "Aikataulu",
    pharmFalsification: "Falsifikaatiokriteeri",
    pharmLocked: "Lukittu: 2026-08-26",
    pharmStatus: "LUKITTU — odottaa testiä",
    modIntTitle: "Modulooma-integraation ennusteet",
    modIntLead: "Ennusteet jotka perustuvat modulooma-integraatioon — aivolisäkesolmu, mitokondriaalinen ROS-vahvistus, redox-puskurointi, autonominen HRV, istukkaesteet ja kilpirauhas-EMF-vuorovaikutukset. Nämä testaavat tuottavatko äskettäin tunnistetut EMF:n kohdekudokset ja -mekanismit ennustetut alavirtavaikutukset.",
    modIntPredictions: [
      {
        id: "MOD-1",
        title: "Aivolisäkkeen gonadotrofien T-tyypin kanavat välittävät EMF:n aiheuttaman FSH/LH-häiriön",
        description: "Aivolisäkkeen gonadotrofit ilmentävät Cav3 T-tyypin kanavia hormonieritykseen. EMF:n häiriö näihin kanaviin vähentää FSH/LH-pulsatiilisuutta riippumatta hypotalamuksen GnRH:sta. Testi: altista aivolisäkkeen soluviljelmiä standardoidulle EMF:lle T-tyypin kanavan salpaajan (etosuksimidi) kanssa ja ilman. Ennuste: EMF vähentää FSH/LH-eritystä; etosuksimidi estää vaikutuksen.",
        type: "kokeellinen",
        discriminating: true,
        timeline: "Testattavissa 6 kuukaudessa (aivolisäkkeen soluviljely)",
        falsification: "Ei EMF-vaikutusta aivolisäkkeen FSH/LH-eritykseen, tai etosuksimidi ei estä vaikutusta",
      },
      {
        id: "MOD-2",
        title: "Mitokondrioiden ikä vahvistaa EMF:n aiheuttamaa ROS:ia reproduktiivisessa kudoksessa",
        description: "Ikääntyneet mitokondriot tuottavat enemmän ROS:ia per Ca2+-yksikkö kuin nuoret. Testi: altista nuorten (3 kk) ja vanhojen (18 kk) rottien kiveskudos identtiselle EMF:lle. Mittaa mitokondriaalinen ROS-tuotanto. Ennuste: vanha kudos tuottaa suhteettoman paljon enemmän ROS:ia per EMF-yksikkö, v18_mitochondrial_ros_amplifier()-funktion mukaisesti.",
        type: "kokeellinen",
        discriminating: true,
        timeline: "Testattavissa 6 kuukaudessa (eläinkudos, vakio-ROS-analyysi)",
        falsification: "Vanha ja nuori kudos tuottavat yhtäläisen ROS:n per EMF-yksikkö, tai nuori kudos tuottaa enemmän",
      },
      {
        id: "MOD-3",
        title: "B2-lisä palauttaa glutationipuolustuksen JA vähentää CRY-herkkyyttä",
        description: "Riboflaviini (B2) on FAD:n esiaste, jota tarvitsevat sekä glutationireduktaasi (GR, redox-puolustus) että kryptokromi (CRY, EMF-sensori). B2-lisän tulisi samanaikaisesti: (a) lisätä efektiivistä glutationipuskurointikapasiteettia (GR:n kautta), ja (b) stabiloida CRY:tä EMF-perturbaatiota vastaan (FAD-latauksen kautta). Testi: B2-lisätyt vs. lisäämättömät soluviljelyt EMF:n alla. Mittaa sekä GSH/GSSG-suhde että CRY-riippuvainen sirkadiaaninen geeniekspressio.",
        type: "kokeellinen",
        discriminating: true,
        timeline: "Testattavissa 3-6 kuukaudessa (soluviljely, kaksoisendpointti)",
        falsification: "B2 vaikuttaa vain yhteen päätetapahtumaan (GR tai CRY) mutta ei molempiin, tai ei vaikutusta kumpaankaan",
      },
      {
        id: "MOD-4",
        title: "HRV on herkkä varhainen biomarkkeri krooniselle EMF-altistukselle",
        description: "Sykevälivaihtelu (HRV), erityisesti korkeataajuinen (HF) komponentti joka heijastaa vagaalista tonusta, laskee kroonisen EMF-altistuksen myötä ennen kliinisten oireiden ilmaantumista. SA-solmukkeen Cav3.1 T-tyypin kanavat ovat transduserit. Testi: korreloi henkilökohtainen RF-dosimetria 24 tunnin HRV-monitorointiin kohortissa (N=200). Ennuste: käänteinen annos-vaste kumulatiivisen EMF:n ja HF-HRV:n välillä, riippumatta iästä, kunnosta ja stressistä.",
        type: "havainnoiva",
        discriminating: true,
        timeline: "Testattavissa heti (puettava HRV + RF-dosimetria)",
        falsification: "Ei korrelaatiota henkilökohtaisen EMF-altistuksen ja HRV:n välillä sekoittavien tekijöiden kontrolloinnin jälkeen",
      },
      {
        id: "MOD-5",
        title: "Istukan TJ-proteiinit laskevat raskausaikaisen EMF-altistuksen myötä",
        description: "Istukkaeste käyttää samoja tiiviin liitoksen (TJ) proteiineja kuin BBB ja BTB (okkludiini, ZO-1, klaudiinit). EMF-altistus raskauden aikana vähentää istukan TJ-proteiiniekspressiota annosriippuvaisesti. Testi: mittaa istukan TJ-proteiinitasot naisilla joilla on korkea vs. matala EMF-altistus raskauden aikana (henkilökohtainen dosimetria). Ennuste: korkeampi EMF-altistus korreloi matalamman okkludiini- ja ZO-1-ekspression kanssa.",
        type: "kokeellinen",
        discriminating: true,
        timeline: "Testattavissa 12 kuukaudessa (syntymäkohortti dosimetrialla)",
        falsification: "Ei korrelaatiota raskausaikaisen EMF:n ja istukan TJ-proteiiniekspression välillä",
      },
      {
        id: "MOD-6",
        title: "Kilpirauhashäiriöiden prevalenssi korreloi matkapuhelimen yleistymisasteen kanssa kansallisesti",
        description: "Kilpirauhassolut ilmentävät VGCC:itä ja ovat herkkiä EMF:n aiheuttamalle Ca2+-häiriölle. Kansallisen kilpirauhashäiriöprevalenssin (hypotyreoosi, kohonnut TSH) tulisi korreloida matkapuhelimen yleistymisasteen kanssa, kontrolloituna jodistaturksen, ikärakenteen ja diagnostisten käytäntöjen suhteen. Tämä on ekologinen ennuste — korrelaatio, ei kausaatio.",
        type: "ekologinen",
        discriminating: false,
        timeline: "Testattavissa heti (olemassa olevat terveysrekisterit + ITU-data)",
        falsification: "Ei korrelaatiota matkapuhelimen yleistymisasteen ja kilpirauhashäiriöprevalenssin välillä jodistaturksen ja demografian kontrolloinnin jälkeen",
      },
    ],
    modIntTimeline: "Aikataulu",
    modIntFalsification: "Falsifikaatiokriteeri",
    modIntType: "Tyyppi",
    modIntDiscriminating: "Erotteleva",
    modIntLocked: "Lukittu: 2026-08-24",
    modIntStatus: "LUKITTU — odottaa testiä",
    sidsTitle: "Imeväisen haavoittuvuus- ja SIDS-ennusteet",
    sidsLead: "BERM:n kalsiumkehyksestä johdetut ennusteet imeväisen kardiorespiratorisesta haavoittuvuudesta. Nämä testaavat, osallistuvatko ionikanavagenetiikka, yöllinen EMF-altistus ja sirkadiaaninen Ca²⁺-dynamiikka SIDS-riskiin samojen reittien kautta kuin aikuispopulaatioissa.",
    sidsNote: "Nämä ennusteet käsittelevät herkkää aihetta. BERM tarjoaa mekanistisen hypoteesin — ei todistettua selitystä. Tunnetut suojelutoimet (selällään nukkuminen, tupakansavun välttäminen, imetys) ovat edelleen tärkeimmät interventiot.",
    sidsPredictions: [
      {
        id: "SIDS-1",
        title: "Itkuhälyttimen läheisyys korreloi SIDS-riskin kanssa",
        description: "Retrospektiivinen tapaus-kontrollitutkimus: vertaa itkuhälyttimen tyyppiä (DECT vs. WiFi vs. langallinen vs. ei hälytintä) ja sijoitusetäisyyttä (< 0,5 m, 0,5–1 m, > 1 m) SIDS-tapausten ja ikävakioitujen kontrollien välillä. DECT-hälyttimet < 0,5 m etäisyydellä tuottavat 2,5–3,5 V/m jatkuvan RF:n 2 mm imeväisen kallon läpi. Ennuste: DECT- tai WiFi-hälyttimen sijoitus alle 0,5 m etäisyydelle sängystä on yleisempää SIDS-tapauksissa kuin kontrolleissa, kun tunnetut riskitekijät on vakioitu.",
        timeline: "Testattavissa retrospektiivisesti (vanhempien kyselylomake olemassa olevissa SIDS-rekistereissä)",
        falsification: "Ei assosiaatiota hälytintyypin/etäisyyden ja SIDS-ilmaantuvuuden välillä kun vatsamakuu, tupakka, ylikuumeneminen ja imetysstatus on vakioitu",
      },
      {
        id: "SIDS-2",
        title: "CACNA1C rs1006737 AA-genotyyppi on yliedustettu SIDS-uhreissa",
        description: "SIDS-uhrien post mortem -genotyypitys CACNA1C rs1006737:lle (BERM:n riskialleeli). AA-genotyyppi lisää Cav1.2-ekspressiota ja on assosioitu psykiatriseen ja sydänriskiin aikuisilla. Imeväisillä joiden Ca²⁺-homeostaasi on kypsymätön, tämä gain-of-function-variantti lisännee haavoittuvuutta mille tahansa Ca²⁺-häiriötekijälle. Ennuste: AA-genotyyppifrekvenssi SIDS-uhreissa ylittää väestön perustaajuuden.",
        timeline: "Testattavissa olemassa olevilla biopankkien SIDS-kudosnäytteillä (retrospektiivinen genotyypitys)",
        falsification: "AA-genotyyppifrekvenssi SIDS-uhreissa on sama tai matalampi kuin väestössä",
      },
      {
        id: "SIDS-3",
        title: "Äidin EMF-altistus korreloi matalamman äidinmaidon melatoniinin kanssa",
        description: "Mittaa melatoniinipitoisuus yöllisistä äidinmaitonäytteistä äideiltä, joilla on korkea vs. matala henkilökohtainen EMF-altistus (älypuhelimen käyttö, WiFi-läheisyys, LED-valaistus arvioituna kyselylomakkeella ja dosimetrialla). Yömaidon melatoniini on imeväisen eksogeeninen Ca²⁺-antagonisti. Jos äidin CRY-reitti häiriintyy EMF:stä, maidon melatoniinin pitäisi laskea. Ennuste: korkeamman EMF-altistuksen äidit tuottavat yömaitoa jossa on matalampi melatoniinipitoisuus.",
        timeline: "Testattavissa 6–12 kuukaudessa (imetyskohortti dosimetrialla)",
        falsification: "Ei korrelaatiota äidin EMF-altistusmittarien ja yömaidon melatoniinipitoisuuden välillä",
      },
      {
        id: "SIDS-4",
        title: "Yöllä pumpattu äidinmaito yöllä annettuna on matalampi SIDS-riski kuin päivällä pumpattu yöllä",
        description: "Retrospektiivinen kohortti: äideistä jotka pumppaavat ja pulloruokkivat, vertaa SIDS-ilmaantuvuutta aikavakioidun maidon (yöllä pumpattu yöllä, päivällä pumpattu päivällä) ja ei-aikavakioidun maidon välillä. Yömaito sisältää melatoniinia (Ca²⁺-antagonisti) ja tryptofaania jotka puuttuvat päivämaidosta. Ennuste: kronovakioitu maidonanto on assosioitu matalampaan SIDS-riskiin.",
        timeline: "Testattavissa retrospektiivisesti (ruokintakäytäntökyselylomake olemassa olevissa kohorteissa)",
        falsification: "Ei eroa SIDS-ilmaantuvuudessa kronovakioidun ja ei-vakioidun pumpatun maidon ruokintakäytäntöjen välillä",
      },
      {
        id: "SIDS-5",
        title: "EMF-vapaa lastenhuoneympäristö vähentää apnea/bradykardiajaksoja NICU:ssa",
        description: "Interventiotutkimus NICU:ssa: vertaa apnea- ja bradykardiajaksojen tiheyttä keskosilla standardi-NICU-ympäristössä vs. EMF-minimoidussa ympäristössä (langalliset monitorit, ei WiFi:ä, RF-suojattu inkubaattori, keltainen valaistus). Ennuste: EMF-minimoitu NICU-ympäristö vähentää apnea/bradykardiajaksoja, suuremmalla vaikutuksella imeväisillä joilla on tunnettuja ionikanavavariantteja.",
        timeline: "Testattavissa 12–18 kuukaudessa (NICU-interventiotutkimus)",
        falsification: "Ei vähennystä apnea/bradykardiajaksoissa EMF-minimoidussa NICU-ympäristössä verrattuna standardiympäristöön",
      },
      {
        id: "SIDS-6",
        title: "ADORA1/ADORA2A-polymorfismit ennustavat sekä SIDS-riskiä että kofeiinivastetta",
        description: "Farmakogeneettinen analyysi: genotyypitä ADORA1- ja ADORA2A-reseptoripolymorfismit SIDS-uhreista (post mortem) ja kofeiinihoitoa saavista keskosista. Samat adenosiinireseptorivariantit jotka moduloivat kofeiinivastetta keskosen apneassa pitäisi ennustaa SIDS-herkkyyttä, koska molemmat tilat liittyvät adenosiini-Ca²⁺-reitin häiriöön hengityskeskuksessa. Ennuste: ADORA-variantit jotka ennustavat heikkoa kofeiinivastetta ovat yliedustettuja SIDS-uhreissa.",
        timeline: "Testattavissa olemassa olevilla SIDS-biopankeilla ja NICU:n farmakogeneettisillä tietokannoilla",
        falsification: "Ei assosiaatiota ADORA-genotyypin ja SIDS-ilmaantuvuuden välillä, tai SIDS:iin assosioituvat ADORA-genotyypit eivät ennusta kofeiinivastetta",
      },
    ],
    sidsTimeline: "Aikajana",
    sidsFalsification: "Falsifikaatiokriteeri",
    sidsLocked: "Lukittu: 2026-08-26",
    sidsStatus: "LUKITTU — odottaa testiä",
    sidsResTitle: "SIDS-resonanssimallin ennusteet",
    sidsResLead: "Q-tekijä-resonanssimallista johdetut ennusteet: vastasyntyneen aivot vaimentamattomana oskillaattorina (GABA eksitatorinen NKCC1>KCC2:n kautta), SIDS neurokehityksellisen vaikutusspektrin fataalina päätepisteenä.",
    sidsResNote: "Nämä ennusteet käsittelevät herkkää aihetta. BERM tarjoaa mekanistisen hypoteesin — ei todistettua selitystä. Tunnetut suojelutoimet (selällään nukkuminen, tupakansavun välttäminen, imetys) ovat edelleen tärkeimmät interventiot.",
    sidsResPredictions: [
      {
        id: "SIDS-RESONANCE-1",
        title: "Q-tekijä ennustaa SIDS-riskin paremmin kuin pelkkä ikä",
        description: "Jos resonanssimalli on oikea, SIDS-riskin tulisi korreloida Q_neonatal(ikä) = Q₀/(1+(ikä/τ_KCC2)²):n kanssa paremmin kuin pelkän iän. Q-tekijä laskee KCC2:n kypsyessä ja GABAn siirtyessä eksitatoorisesta inhibitoriseksi. Testi: sovita SIDS-ilmaantuvuuden ikäjakaumat Q_neonatal(ikä) vs. lineaarisiin/neliöllisiin ikämalleihin. Ennuste: Q-tekijämalli sopii SIDS:n ikäjakaumaan paremmin (matalampi AIC) kuin puhtaasti ikäperusteiset mallit.",
        timeline: "Testattavissa heti (olemassa olevat SIDS-ikäjakaumatietoaineistot)",
        falsification: "Q-tekijämalli ei sovi paremmin kuin yksinkertaiset ikäperusteiset mallit SIDS-ilmaantuvuusjakaumaan",
      },
      {
        id: "SIDS-RESONANCE-2",
        title: "Bumetanidiprofylaksia vähentää apneaa korkean riskin vastasyntyneillä",
        description: "Bumetanidi salpaaa NKCC1:n, palauttaen inhibitorisen GABAn ja tuoden vaimennuksen (vähentäen Q:ta). Jos SIDS johtuu resonanssihäiriöstä vaimentamattomassa järjestelmässä, bumetanidin tulisi vähentää apnea- ja bradykardiajaksoja korkean riskin vastasyntyneillä (ionikanavavarianttien kantajat tai aiemmat ALTE-tapahtumat). Testi: satunnaistettu tutkimus matalasta bumetanidiannoksesta NICU:n imeväisillä joilla on toistuvia apneajaksoja. Ennuste: bumetanidi vähentää apnea/bradykardiajaksojen tiheyttä.",
        timeline: "Testattavissa 12–18 kuukaudessa (NICU-farmakologinen tutkimus)",
        falsification: "Ei vähennystä apnea/bradykardiajaksoissa bumetanidilla korkean riskin vastasyntyneillä",
      },
      {
        id: "SIDS-RESONANCE-3",
        title: "Neonataalinen EEG osoittaa korkeampaa koherenssia resonanssitaajuuksilla SIDS-riskiimeväisillä",
        description: "Vaimentamaton resonaattori (Q→∞) keskittää energian ominaistaajuudelleen. Neonataalisen EEG:n korkean riskin imeväisillä tulisi osoittaa kapeampia spektrihuippuja ja korkeampaa kanavien välistä koherenssia delta/theta-kaistoilla verrattuna matalan riskin kontrolleihin. Tämän spektraalisen sormenjäljen tulisi heiketä KCC2:n kypsyessä (3–6 kk). Testi: sarjallinen EEG SIDS-riski- vs. kontrolli-imeväisillä syntymästä 6 kuukauteen. Ennuste: korkean riskin imeväiset osoittavat kohonnutta spektraalista koherenssia joka normalisoituu KCC2:n kypsymisaikataulun mukaisesti.",
        timeline: "Testattavissa 12 kuukaudessa (neonataalinen EEG-pitkittäistutkimus)",
        falsification: "Ei eroa EEG:n spektraalisessa koherenssissa korkean riskin ja kontrollien välillä, tai koherenssi ei muutu ennustetulla KCC2-aikataululla",
      },
      {
        id: "SIDS-RESONANCE-4",
        title: "Yhdessä nukkuvissa kulttuureissa matala SIDS korkeasta ympäristö-EMF:stä huolimatta",
        description: "Kolmen suojan malli ennustaa, että kulttuureissa joissa harjoitetaan yhdessä nukkumista (ei hälytintä), imetystä (>90 %) ja jatkuvaa ihokontaktia SIDS-luvut pysyvät matalina ympäristö-EMF:n tasosta riippumatta. Testi: vertaa SIDS-lukuja kulttuurien välillä jaoteltuna (1) ympäristö-EMF-tiheyden ja (2) yhdessä nukkumisen/imetyksen/ihokontaktikäytäntöjen mukaan. Ennuste: SIDS-luku korreloi hälyttimen käytön ja korvikemaidon, ei ympäristö-EMF-tiheyden kanssa, kolmen suojan kontrolloinnin jälkeen.",
        timeline: "Testattavissa heti (ekologinen analyysi olemassa olevasta kansainvälisestä SIDS-datasta)",
        falsification: "SIDS-luku korreloi ympäristö-EMF-tiheyden kanssa yhdessä nukkumisen/imetyksen/ihokontaktikäytännöistä riippumatta",
      },
      {
        id: "SIDS-RESONANCE-5",
        title: "NKCC1/KCC2-suhde kuolinhetkellä ennustaa SIDS vs. muu imeväiskuolema",
        description: "Jos resonanssimalli on oikea, SIDS-uhreilla tulisi olla korkeampi NKCC1/KCC2-suhde (kypsymättömämpi kloridikuljettajakytkin → korkeampi Q → enemmän eksitatorista GABAa) verrattuna samanikäisiin imeväisiin jotka kuolivat muihin syihin. Testi: immunohistokemia NKCC1:lle ja KCC2:lle aivorunkonäytteissä SIDS- vs. ei-SIDS-imeväisten post mortem -näytteistä. Ennuste: SIDS-uhreilla on kohonnut NKCC1/KCC2-suhde verrattuna samanikäisiin kontrolleihin.",
        timeline: "Testattavissa olemassa olevilla biopankkikudoksilla (retrospektiivinen immunohistokemia)",
        falsification: "NKCC1/KCC2-suhde SIDS-uhreissa on sama kuin samanikäisissä ei-SIDS-imeväiskuolemissa",
      },
      {
        id: "SIDS-SPECTRUM-1",
        title: "Prenataalinen EMF-altistus ennustaa neurokehitystuloksia annos-vastemaisesti",
        description: "Resonanssispektrimalli ennustaa jatkuvan annos-vastesuhteen prenataalisen/neonataalisen EMF-altistuksen ja neurokehitystulosten välille: korkein altistus → SIDS-riski, kohtalainen → kehitysviive, matala → hienovaraiset motoriset/kognitiiviset erot. Testi: prospektiivinen syntymäkohortti henkilökohtaisella EMF-dosimetrialla (puhelimen käyttö, WiFi-läheisyys, hälyttimen käyttö) seurattuna 36 kuukauteen standardoidulla kehitysarvioinnilla. Ennuste: EMF-altistus osoittaa portaittaisen annos-vasteen kehitystulosten kanssa, hienomotoriikka (OR ≥ 2,5) ja ongelmanratkaisu (OR ≥ 3,0) eniten vaikutettuna, yhdenmukainen prospektiivisen kohorttilöydöksen kanssa (OR 2,74 hienomotoriikka, OR 3,67 ongelmanratkaisu).",
        timeline: "Testattavissa 3 vuodessa (prospektiivinen syntymäkohortti dosimetrialla)",
        falsification: "Ei annos-vastesuhdetta prenataalisen/neonataalisen EMF-altistuksen ja kehitystulosten välillä 36 kuukauden iässä",
      },
    ],
    sidsResTimeline: "Aikajana",
    sidsResFalsification: "Falsifikaatiokriteeri",
    sidsResLocked: "Lukittu: 2026-08-26",
    sidsResStatus: "LUKITTU — odottaa testiä",
    neuroTitle: "Neurologisen spektrin ennusteet",
    neuroLead: "Q-tekijä-spektrimallista johdetut ennusteet, jotka yhdistävät SIDS:n, epilepsian, SUDEP:n, migreenin ja klusteripäänsäryn yhteiseksi Ca²⁺-riippuvaiseksi oskillaatiomekanismiksi vaihtelevalla vaimennuksella.",
    neuroPredictions: [
      {
        id: "NEURO-EMF-1",
        title: "Kroonisen migreenin prevalenssi korreloi kumulatiivisen EMF-kerrostuma-altistuksen kanssa",
        description: "Q-tekijämalli ennustaa, että kroonisen migreenin prevalenssin tulisi kasvaa kumulatiivisen EMF-altistuksen myötä (ELF-priming → α2δ-1↑ → CSD-kynnys↓). Testi: korreloi kroonisen migreenin prevalenssitrendit (1990→2025) kumulatiivisen EMF-teknologian käyttöönoton kanssa (mobiili, WiFi, LED) maiden välillä. Ennuste: maat joissa aikaisempi ja tiheämpi EMF-käyttöönotto osoittavat jyrkempää migreenin prevalenssin kasvua.",
        timeline: "Testattavissa heti (olemassa oleva migreeniprevalenssidata + ITU:n teknologian käyttöönottotiedot)",
        falsification: "Ei ajallista korrelaatiota EMF-teknologian käyttöönoton ja kroonisen migreenin prevalenssitrendien välillä maiden välillä",
      },
      {
        id: "NEURO-EMF-2",
        title: "ELF-priming alentaa CSD-kynnystä; gabapentiini kumoaa tämän",
        description: "ELF-altistus säätelee α2δ-1:tä (CACNA2D1) ylöspäin, lisäten VGCC-tiheyttä synapseissa ja alentaen CSD-kynnystä. Gabapentiini estää α2δ-1-kuljetuksen. Testi: altista kortikaalileikkeet krooniselle ELF:lle (50 Hz, 7 päivää) ja mittaa CSD-kynnys (KCl-pitoisuus CSD:n laukaisemiseksi). Toista gabapentiini-yhteishoidolla. Ennuste: ELF alentaa CSD-kynnystä; gabapentiini-yhteishoito normalisoi sen.",
        timeline: "Testattavissa 6–12 kuukaudessa (kortikaalileikkeen elektrofysiologia)",
        falsification: "ELF-altistus ei muuta CSD-kynnystä, tai gabapentiini ei kumoa ELF-vaikutusta",
      },
      {
        id: "NEURO-EMF-3",
        title: "Klusteripäänsärkypotilailla on korkeampi EMF-altistushistoria",
        description: "Klusteripäänsärkypotilaan profiili (mies 3:1, tupakoija 60–90 %, alkaminen ~30 v, kohtaukset 00–03) kartoittuu kumulatiiviselle Ca²⁺-kuormitusprofiilille. EMF-altistushistorian (ammatillinen, asuinpaikan) tulisi olla korkeampi klusteripotilailla kuin vakioiduilla kontrolleilla. Testi: tapaus-verrokkitutkimus yksityiskohtaisella EMF-altistusarviolla. Ennuste: klusteripotilailla on tilastollisesti korkeampi elinikäinen EMF-altistus.",
        timeline: "Testattavissa 12 kuukaudessa (tapaus-verrokki EMF-kyselylomakkeella)",
        falsification: "Ei eroa EMF-altistushistoriassa klusteripäänsärkypotilaiden ja vakioitujen kontrollien välillä",
      },
      {
        id: "NEURO-EMF-4",
        title: "SUDEP-riski on korkeampi korkeamman EMF:n ympäristöissä",
        description: "SUDEP jakaa saman spreading depolarization → aivorunko -mekanismin kuin SIDS. Jos EMF edistää CSD:n leviämistä, SUDEP-ilmaantuvuuden tulisi olla korkeampi korkean EMF:n ympäristöissä (kaupunki) verrattuna matalan EMF:n ympäristöihin (maaseutu), kohtaustiheyden ja lääkityshoitomyöntyvyyden kontrolloinnin jälkeen. Testi: rekisteritutkimus joka vertaa SUDEP-ilmaantuvuutta kaupunki- vs. maaseutuepilepsiapotilailla. Ennuste: kaupunkien epilepsiapotilailla on korkeampi SUDEP-luku kohtaustiheyden kontrolloinnin jälkeen.",
        timeline: "Testattavissa heti (epilepsiarekisteri asuinpaikkatiedoilla)",
        falsification: "Ei eroa SUDEP-ilmaantuvuudessa kaupunki- ja maaseutuepilepsiapotilaiden välillä kohtaustiheyden ja lääkityshoitomyöntyvyyden kontrolloinnin jälkeen",
      },
      {
        id: "NEURO-EMF-5",
        title: "Psilosybiinin teho klusteripäänsärkyyn paranee samanaikaisella EMF-vähennyksellä",
        description: "Psilosybiini resetoi tryptamiinireitin (5-HT2A → talamokortikaalinen resetti → SCN:n sirkadiaaninen resetti). Jos jatkuva EMF-altistus uudelleen-primaa α2δ-1:n ja häiritsee SCN:ää resetin jälkeen, psilosybiinin tehon tulisi olla parempi yhdistettynä EMF-vähennykseen. Testi: RCT psilosybiini + EMF-vähennysprotokolla vs. psilosybiini yksin episodisessa klusteripäänsäryssä. Ennuste: yhdistetty interventio tuottaa pidemmän remission kuin psilosybiini yksin.",
        timeline: "Testattavissa 24 kuukaudessa (RCT EMF-vähennysprotokollalla)",
        falsification: "Ei eroa remission kestossa psilosybiini + EMF-vähennyksen ja pelkän psilosybiinin välillä",
      },
      {
        id: "NEURO-EMF-6",
        title: "EMF laukaisee kohtauksia neonataalieläinmallissa ilman farmakologista GABAergisen toiminnan vähennystä",
        description: "López-Martín osoitti, että GSM + pikrotoksiini (GABA-antagonisti) = kohtaukset, mutta kumpikaan yksin ei riittänyt. Neonataaliaivot sisältävät endogeenisesti eksitatorista GABAa (NKCC1>KCC2), mikä vastaa farmakologista GABAergisen toiminnan vähennystä. Testi: altista neonataalirottia (P3–P7, ennen KCC2-kytkintä) pulssitetulle GSM 900 MHz:lle matkapuhelinintensiteetillä ilman pikrotoksiinia. Ennuste: neonataalieläimet osoittavat kohtausaktiivisuutta tai epileptiformisia EEG-muutoksia ilman farmakologista esikäsittelyä, kun taas aikuiset eivät.",
        timeline: "Testattavissa 6–12 kuukaudessa (neonataalirottien EMF-altistusmalli)",
        falsification: "Ei kohtausaktiivisuutta tai epileptiformisia EEG-muutoksia neonataalieläimissä jotka altistettiin GSM:lle ilman farmakologista GABAergisen toiminnan vähennystä",
      },
    ],
    neuroTimeline: "Aikajana",
    neuroFalsification: "Falsifikaatiokriteeri",
    neuroLocked: "Lukittu: 2026-08-26",
    neuroStatus: "LUKITTU — odottaa testiä",
    metalTitle: "Raskasmetallisynergian ja konvergenssin ennusteet",
    metalLead: "Konvergenssiverifokaatioprosessista johdetut ennusteet, jotka kattavat raskasmetalli × EMF -synergian, pineaalisen kalsifikaation, fotoni→populaatio-ketjun ja interventiotutkimukset.",
    metalPredictions: [
      {
        id: "METAL-EMF-1",
        title: "Kelaatioterapia + EMF-vähennys tuottaa superadditiivisen terveyshyödyn EHS-potilailla",
        description: "Raskasmetallit (Cd²⁺, Pb²⁺) kulkeutuvat soluihin EMF:n avaamien VGCC-kanavien kautta ja matkivat Ca²⁺:ia kalmoduliini/CaMKII-sitoutumispaikoissa. Kelaatio poistaa metallit; EMF-vähennys sulkee sisääntuloreitin. Yhdistetyn intervention pitäisi olla superadditiivinen. Testi: RCT kelaatiosta + EMF-vähennyksestä vs. kelaatio yksin vs. EMF-vähennys yksin EHS-potilailla joilla kohonneet raskasmetallitasot. Ennuste: yhdistetty ryhmä osoittaa >50 % parannus vs. <25 % kummallekin yksin.",
        timeline: "Testattavissa 18 kuukaudessa (RCT raskasmetallipaneelilla + EHS-oirepisteillä)",
        falsification: "Ei superadditiivista vaikutusta — kelaatio + EMF-vähennys yhtä suuri kuin yksittäisten vaikutusten summa",
      },
      {
        id: "METAL-EMF-2",
        title: "PGC-aste korreloi kumulatiivisen elinikäisen EMF-altistuksen kanssa",
        description: "Pineaalirauhasen kalsifikaatio (PGC) vähentää melatoniinin tuotantoa (r=0,569 kalsifioitumattomalle kudokselle↔melatoniini). EMF kiihdyttää PGC:tä oksidatiivisen stressin ja Ca²⁺-kertymisen kautta. Testi: poikkileikkaustutkimus joka korreloi PGC-tilavuuden (TT/MRI) ammatillisen EMF-altistushistorian kanssa. Ennuste: korkean EMF:n ammatit (sähköasentajat, televiestintätyöntekijät) omaavat merkittävästi korkeamman PGC-tilavuuden kuin vakioidut matalan EMF:n kontrollit.",
        timeline: "Testattavissa heti (TT/MRI + ammatillinen altistuskyselylomake)",
        falsification: "Ei korrelaatiota ammatillisen EMF-altistushistorian ja PGC-asteen välillä",
      },
      {
        id: "METAL-EMF-3",
        title: "Kadmiumin kudostasot ovat korkeammat korkean EMF:n ympäristöissä Cav3.1-ikkunavirran kautta",
        description: "Cd²⁺ permeoi Cav3.1 T-tyypin kalsiumkanavien läpi (vahvistettu radioleimatulla ¹⁰⁹Cd²⁺:lla). Cav3.1:llä on ikkunavirta lähellä lepokalvopotentiaalia — EMF kasvattaa avautumistodennäköisyyttä → enemmän Cd:n sisäänvirtausta. Testi: vertaa kudosten Cd-tasoja työntekijöillä joilla sama ravinnon/ammatillinen Cd-altistus mutta eri EMF-altistus. Ennuste: korkean EMF:n ryhmällä on korkeampi kudosten Cd-kertymä vastaavilla ulkoisilla Cd-tasoilla.",
        timeline: "Testattavissa 12 kuukaudessa (ammattikohortti Cd-biomonitoroinnilla + EMF-dosimetrialla)",
        falsification: "Ei eroa kudosten Cd-tasoissa EMF-vakioitujen ryhmien välillä vastaavilla ulkoisilla Cd-altistuksilla",
      },
      {
        id: "METAL-EMF-4",
        title: "MeHg:n neurotoksisuuskynnys on matalampi korkean EMF:n ympäristöissä",
        description: "Metyylielohopea kasvattaa T-tyypin Ca²⁺-virtoja; EMF avaa itsenäisesti VGCC:itä. Yhteisvaikutus: kaksinkertainen Ca²⁺-kuormitus. Populaatioissa joissa sekä korkea MeHg (kalaruokavalio) että korkea EMF (kaupunki) pitäisi neurotoksisuutta ilmetä matalammilla MeHg-tasoilla kuin korkea-MeHg + matala-EMF -populaatioissa. Testi: vertaa neurokehitystuloksia Färsaarilla (korkea MeHg, matala EMF) vs. urbaanissa Japanissa (korkea MeHg, korkea EMF) vastaavilla MeHg-altistuksilla. Ennuste: urbaani Japani osoittaa vaikutuksia matalammilla MeHg-kynnyksillä.",
        timeline: "Testattavissa heti (olemassa olevat Färsaarten ja japanilaiset kohorttitiedot)",
        falsification: "Ei eroa MeHg:n neurotoksisuuskynnyksessä korkean EMF:n ja matalan EMF:n populaatioiden välillä",
      },
      {
        id: "CHAIN-1",
        title: "Ca²⁺-kanavasalpaaja estää EMF:n aiheuttamat univaikutukset (ETH:n nimodipiini-5G)",
        description: "VGCC-hypoteesi ennustaa, että kalsiumkanavan salpauksen pitäisi estää KAIKKI alavirran EMF-vaikutukset. [[ref:sousouri2025|Sousouri 2025]] osoitti, että CACNA1C-genotyyppi määrittää 5G-univasteen. Testi: ETH Zürichin nimodipiini-5G-jatkotutkimus — anna nimodipiinia (L-tyypin Ca²⁺-salpaaja) ennen 5G-altistusta ja mittaa uni-EEG. Ennuste: nimodipiini kumoaa alkuperäisessä tutkimuksessa nähdyt genotyyppiriippuvaiset uni-EEG-muutokset.",
        timeline: "Testattavissa 12 kuukaudessa (RCT [[ref:sousouri2025|Sousouri 2025 -protokollan]] laajennus)",
        falsification: "Nimodipiini EI estä EMF:n aiheuttamia uni-EEG-muutoksia → VGCC ei ole ensisijainen kohde → koko BERM-kaskadi on arvioitava uudelleen",
      },
      {
        id: "CHAIN-2",
        title: "Amish-yhteisöt osoittavat erilaisia kroonisen sairauden trendejä kuin valtaväestö",
        description: "Amish-yhteisöillä on minimaalinen EMF-altistus (ei sähköverkkoa, ei langattomia laitteita), korkea yhteisuniminen, korkea imetysaste. Jos EMF on merkittävä kroonisten sairaustrendien ajuri, Amisheilla pitäisi olla eriävät kehityskulut BERM:n ennustamille tiloille. Testi: vertaa ikävakioituja ilmaantuvuustrendejä (1990→2025) T2D:lle, liikalihavuudelle, autismille, ADHD:lle, masennukselle, likitaitteisuudelle, SIDS:lle Amish vs. USA:n yleisväestössä. Ennuste: Amisheilla vakaat tai laskevat luvut siellä missä yleisväestöllä kasvua.",
        timeline: "Testattavissa heti (Amish-terveysrekisterit + CDC NHANES -vertailu)",
        falsification: "Amish-yhteisöt osoittavat samat kroonisten sairauksien trendien kasvut kuin USA:n yleisväestö",
      },
      {
        id: "CHAIN-3",
        title: "EMF-vähennysinterventio tuottaa mitattavan terveyshyödyn kontrolloidussa tutkimuksessa",
        description: "Tämä on BERM:n kriittinen puuttuva pala: interventionaalinen verifiointi. Kaikki nykyinen evidenssi on havainnollista tai mekanistista. Testi: RCT kattavasta EMF-vähennyksestä (suojattu nukkumisympäristö, langalliset laitteet, ei LED:iä yöllä) oireisilla henkilöillä 3 kuukauden ajan. Mittaa: CaMKII Thr286 -fosforylaatio lymfosyyteissä, unenlaatu (aktigrafia), melatoniini (virtsan 6-sulfatoksimelatoniini), verenpaine. Ennuste: EMF-vähennysryhmä osoittaa merkittävää parannusta kaikissa neljässä biomarkkerissa.",
        timeline: "Testattavissa 12 kuukaudessa (RCT biomarkkeripaneelilla)",
        falsification: "Ei parannusta missään biomarkkerissa kattavan EMF-vähennyksen jälkeen → EMF-altistuksella ei ole mitattavaa terveysvaikutusta → mallilta puuttuu kliininen merkitys",
      },
      {
        id: "CHAIN-4",
        title: "Walkerin uniketju: EMF→melatoniini↓→uni↓→GABA↓→Q↑ mitataan kokonaisena kaskadina",
        description: "Takaisinkytkentäsilmukka 4 ennustaa kaskadoivan syklin: EMF suppressoi melatoniinia → uni heikkenee → GABA:n tooninen inhibitio vähenee → Q-tekijä kasvaa → aivot tulevat HERKEMMIKSI EMF:lle → lisää melatoniinisuppressiota. Testi: pitkittäistutkimus joka mittaa ilta-EMF-altistuksen, yön melatoniinin (sylki), unenlaadun (PSG), aamu-GABA:n (MRS-spektroskopia) ja EEG-koherenssin (Q-proksi) 4 viikon ajan. Ennuste: alkuperäinen EMF-altistus tuottaa itseään vahvistavan heikkenemisen kaikissa mittareissa.",
        timeline: "Testattavissa 6 kuukaudessa (pitkittäinen PSG + MRS + EEG -protokolla)",
        falsification: "Ei itseään vahvistavaa kaskadia — EMF:n vaikutukset uneen/melatoniiniin/GABAan pysyvät vakiona eivätkä pahene asteittain",
      },
    ],
    metalTimeline: "Aikajana",
    metalFalsification: "Falsifikaatiokriteeri",
    metalLocked: "Lukittu: 2026-08-26",
    metalStatus: "LUKITTU — odottaa testiä",
    mechTitle: "Mekanistisen ketjun ennusteet",
    mechLead: "Ennusteet vasta verifioiduista välikerroksista: veri-aivoeste, ruskea rasvakudos, HPA-akseli, β-solun insuliinidynamiikka, hypotalamuksen keskuspiste, kortisoli-hippokampus, Leydig-solu ja syöttösolu-degranulaatio.",
    mechPredictions: [
      {
        id: "BBB-EMF-1",
        title: "EMF lisää veri-aivoesteen läpäisevyyttä; melatoniinilisä estää sen",
        description: "RF-EMF (27,12 MHz) lisää veri-aivoesteen läpäisevyyttä eNOS↑:n ja okkludiini↓:n kautta. Melatoniini suojaa tiiviin liitoksen proteiineja (okkludiini, klaudiini-5, ZO-1). Testi: mittaa veri-aivoesteen läpäisevyys (gadolinium-tehostettu MRI) RF-altistuksen aikana melatoniini-esilääkityksellä ja ilman. Ennuste: melatoniini-esilääkitys estää EMF:n aiheuttaman veri-aivoesteen avautumisen.",
        timeline: "Testattavissa 12 kuukaudessa (MRI + melatoniini-RCT)",
        falsification: "Melatoniini EI estä EMF:n aiheuttamia veri-aivoesteen läpäisevyysmuutoksia",
      },
      {
        id: "BBB-EMF-2",
        title: "Raskasmetallien aivokertymä korkeampi korkean EMF:n populaatioissa veri-aivoesteen avautumisen kautta",
        description: "EMF avaa veri-aivoesteen → raskasmetallit (Pb, Cd, MeHg) pääsevät aivoihin helpommin. EMF myös suppressoi melatoniinia → veri-aivoesteen suojaus↓ → KAKSINKERTAINEN haavoittuvuus. Testi: vertaa aivojen raskasmetallikertymää (post mortem tai likvor) korkean EMF:n ammateissa ja vakioiduissa matalan EMF:n kontrolleissa vastaavilla perifeerisillä raskasmetallitasoilla. Ennuste: korkean EMF:n ryhmällä on korkeammat aivojen metallitasot vastaavilla veritasoilla.",
        timeline: "Testattavissa 18 kuukaudessa (ammattikohortti likvor-/ruumiinavausnäytteillä)",
        falsification: "Ei eroa aivojen raskasmetallikertymässä EMF-altistusryhmien välillä vastaavilla veritasoilla",
      },
      {
        id: "BAT-EMF-1",
        title: "5G vähentää BAT:n PRDM16-ilmentymistä ja termogeneesiä jyrsijöissä",
        description: "5G (3,5 GHz) → PRDM16 mRNA↓ + C/EBPβ mRNA↓ ruskeassa rasvakudoksessa. BAT käyttää Ca²⁺-syklausta (SERCA) energiankulutukseen. Testi: altista jyrsijät 5G:lle ja mittaa BAT:n PRDM16-proteiini, termogeneettinen kapasiteetti (kylmäaltistus) ja energiankulutus. Ennuste: 5G-altistetut eläimet osoittavat alentunutta kylmän indusoimaa termogeneesiä ja painonnousua identtisellä kalorimäärällä.",
        timeline: "Testattavissa 6 kuukaudessa (jyrsijämalli metaboliahäkeillä)",
        falsification: "Ei muutosta BAT:n termogeneesissä tai painossa 5G-altistetuilla vs. kontrollieläimillä identtisellä ruokavaliolla",
      },
      {
        id: "HPA-EMF-1",
        title: "Krooninen EMF kohottaa hiuskortisolia altistetuilla työntekijöillä",
        description: "EMF asettaa HPA-akselille uuden asetuspisteen herkistymisellä sopeutumisen sijaan. Krooninen altistus → jatkuva kortisolinousu + lisämunuaisen hypertrofia. Testi: mittaa hiuskortisoli (3 kuukauden integroitu kortisoli) televiestintätyöntekijöiltä vs. vakioiduilta toimistotyöntekijöiltä. Ennuste: televiestintätyöntekijöillä merkittävästi korkeampi hiuskortisoli koetun stressin ja elämäntapatekijöiden vakioinnin jälkeen.",
        timeline: "Testattavissa heti (hiuskortisoli + ammatillinen altistuskyselylomake)",
        falsification: "Ei eroa hiuskortisolissa korkean EMF:n ja matalan EMF:n ammattiryhmien välillä",
      },
      {
        id: "HPA-EMF-2",
        title: "EMF tuottaa kuvantamisella mitattavan lisämunuaisen hypertrofian",
        description: "Eläinkokeet osoittavat EMF → ACTH↑ + kortikosteroni↑ + lisämunuaisen hypertrofia. Tämän anatomisen muutoksen pitäisi olla havaittavissa kroonisesti altistetuilla ihmisillä. Testi: vertaa lisämunuaisten tilavuutta (TT/MRI) työntekijöillä joilla >10 vuotta korkean EMF:n altistusta vs. vakioidut kontrollit. Ennuste: korkean EMF:n ryhmällä merkittävästi suuremmat lisämunuaiset.",
        timeline: "Testattavissa heti (retrospektiivinen kuvantamistutkimus)",
        falsification: "Ei lisämunuaisten tilavuuseroa kroonisen korkean EMF:n ja matalan EMF:n ammattiryhmien välillä",
      },
      {
        id: "BETA-EMF-1",
        title: "EMF häiritsee glukoosistimuloitua insuliinieritystä Ca²⁺-kanava-aktivaation kautta",
        description: "Sähkökentät voivat indusoida insuliinierityksen ILMAN glukoosia. ELF-EMF muuttaa glukoosistimuloitua insuliinidynamiikkaa. CaVγ4→CaMKII→MafA-reitti: CaMKII:n dysregulaatio → β-solun kypsyyden menetys. Testi: mittaa insuliinierityksen dynamiikkaa (ensimmäisen vaiheen insuliinivaste) EMF-altistetuilla vs. kontrolleilla OGTT:n aikana. Ennuste: EMF-altistetulla ryhmällä tylsistynyt ensimmäisen vaiheen insuliini ja kohonnut perusinsuliinitaso.",
        timeline: "Testattavissa 12 kuukaudessa (OGTT-tutkimus EMF-altistushistorialla)",
        falsification: "Ei eroa insuliinierityksen dynamiikassa EMF-altistusryhmien välillä",
      },
      {
        id: "BETA-EMF-2",
        title: "Verapamiili suojaa β-soluja EMF:n aiheuttamalta toimintahäiriöltä",
        description: "Verapamiili (L-tyypin Ca²⁺-salpaaja) suojaa β-soluja ja parantaa T1D-tuloksia ([[ref:verap_t1d_jama|JAMA 2023]]). Jos EMF vahingoittaa β-soluja Ca²⁺-kanavien kautta, verapamiilin pitäisi myös estää EMF:n aiheuttama β-solun toimintahäiriö. Testi: altista β-soluviljelmät EMF:lle verapamiililla/ilman; mittaa insuliinieritys ja MafA-ilmentyminen. Ennuste: verapamiili estää EMF:n aiheuttamat insuliinierityksen muutokset ja MafA↓:n.",
        timeline: "Testattavissa 6 kuukaudessa (in vitro β-soluviljely)",
        falsification: "Verapamiili EI estä EMF:n aiheuttamaa β-solun toimintahäiriötä → Ca²⁺-kanava ei ole ensisijainen mekanismi",
      },
      {
        id: "HYPO-EMF-1",
        title: "Krooninen EMF vähentää hypotalamuksen synaptisten vesikkelien tiheyttä",
        description: "835 MHz (12 viikkoa) vähentää synaptisten vesikkelien määrää, kokoa ja telakoitumista hypotalamuksessa sekä synapsiini I/II↓ ja synaptotagmiini 1↓. Synaptotagmiini 1 on Ca²⁺-sensori vesikkelin vapautumiselle. Sen menetys tarkoittaa, että KAIKKIEN hypotalamuksen hormonien vapautuminen heikkenee. Testi: toista [[ref:kim2019_hypothalamus|Kim 2019]] lisähormonipaneelilla (GnRH, CRH, TRH, GHRH, dopamiini). Ennuste: BERM-ennusteiden mukainen monihormonaalinen vajaatoimintakuvio.",
        timeline: "Testattavissa 12 kuukaudessa (jyrsijämalli hypotalamuksen dissektiolla + hormonipaneeli)",
        falsification: "Ei synaptisten vesikkelien muutoksia eikä monihormonaalista vajaatoimintaa kroonisen RF-altistuksen jälkeen",
      },
      {
        id: "HYPO-EMF-2",
        title: "EMF tuottaa samanaikaisen T↓ + kortisoli↑ + GH↓ hypotalamuksen häiriön kautta",
        description: "Jos EMF häiritsee hypotalamuksen synaptista transmissiota laaja-alaisesti (VK13), KAIKKIEN hormoniakselien pitäisi häiriintyä samanaikaisesti. Kolmoislukituksen (T↓ × kortisoli↑ × DA↓) pitäisi liittyä GH↓:n ja kilpirauhasmuutoksiin. Testi: mittaa täydellinen hormonipaneeli (T, LH, kortisoli, ACTH, GH, IGF-1, TSH, fT4, dopamiini) kroonisesti EMF-altistetuilla vs. kontrolleilla. Ennuste: koherentti moniakselinen häiriökuvio.",
        timeline: "Testattavissa heti (ammattikohortti kattavalla hormonipaneelilla)",
        falsification: "EMF-altistettu ryhmä osoittaa muutoksia vain yhdessä hormoniakselissa koordinoidun moniakselisen häiriön sijaan",
      },
      {
        id: "MAST-EMF-1",
        title: "EMF laukaisee syöttösolu-degranulaation mitattavissa seerumi-tryptaasilla",
        description: "Ca²⁺ on syöttösolun degranulaation ensisijainen laukaisin. EMF → VGCC → Ca²⁺ → syöttösolu vapauttaa histamiinia + IL-1β + tryptaasia. [[ref:johansson2000_mast|Johansson 2000]] osoitti syöttösolumuutoksia ihobiopsioissa näyttöpäätealtistuksen jälkeen. Testi: mittaa seerumi-tryptaasi (spesifinen syöttösolu-degranulaatiomarkkeri) ennen ja jälkeen standardoidun EMF-altistuksen. Ennuste: akuutti EMF-altistus tuottaa mitattavan tryptaasinousun.",
        timeline: "Testattavissa 3 kuukaudessa (verinäyte + EMF-altistus, yksinkertainen protokolla)",
        falsification: "Ei tryptaasinousua EMF-altistuksen jälkeen",
      },
      {
        id: "MAST-EMF-2",
        title: "Syöttösolustabilisaattorit estävät EMF:n aiheuttamat iho- ja systeemiset reaktiot",
        description: "Jos EMF-oireet välittyvät osittain syöttösolu-degranulaation kautta, syöttösolustabilisaattorien (kromoglykaatti, ketotifeeni) pitäisi estää ne. Testi: RCT kromoglykaatti + EMF-altistus vs. plasebo + EMF-altistus EHS-potilailla. Mittaa: ihoreaktiot, systeemiset oireet, seerumin histamiini/tryptaasi. Ennuste: kromoglykaattiryhmällä merkittävästi vähemmän oireita ja matalampi histamiini/tryptaasi.",
        timeline: "Testattavissa 6 kuukaudessa (RCT olemassa olevilla hyväksytyillä lääkkeillä)",
        falsification: "Syöttösolustabilisaattorit EIVÄT vähennä EMF:n aiheuttamia oireita",
      },
      {
        id: "KCC2-EMF-1",
        title: "Prenataalinen EMF-altistus viivästyttää GABA:n eksitatorinen→inhibitorinen -kytkintä jälkeläisissä",
        description: "Ympäristöhäiriöt (stressi, tulehdus) viivästyttävät KCC2:n kypsymistä → GABA pysyy eksitatorisena pidempään → Q-tekijä kohonneena pidempään → laajempi haavoittuvuusikkuna. IL-1β (syöttösoluista tai gliasta) → KCC2↓. ROS → KCC2↓. EMF → sekä ROS:ia että IL-1β:ta. Testi: altista tiineet jyrsijät EMF:lle; mittaa KCC2/NKCC1-suhde jälkeläisten hippokampuksessa P7, P14, P21. Ennuste: EMF-altistetut jälkeläiset osoittavat viivästyneen KCC2-kytkimen.",
        timeline: "Testattavissa 9 kuukaudessa (jyrsijöiden prenataalinen altistusmalli)",
        falsification: "Ei eroa KCC2:n kypsymisaikataulussa EMF-altistettujen ja kontrollien jälkeläisten välillä",
      },
      {
        id: "TRIPLE-1",
        title: "T↓ × kortisoli↑ × DA↓ kolmoisvaje mitattavissa korkean EMF:n populaatioissa",
        description: "Kolmoislukitusteoria ennustaa, että EMF samanaikaisesti vähentää testosteronia (HPG), kohottaa kortisolia (HPA) ja vähentää dopamiinia (mesolimbinen). Kukin on verifioitu itsenäisesti; ennuste on, että ne esiintyvät yhdessä SAMOILLA yksilöillä suhteessa EMF-altistukseen. Testi: mittaa T, kortisoli ja virtsan HVA (dopamiinimetaboliitti) korkean vs. matalan EMF:n ammateissa. Ennuste: kolmoisvajakuvio (T↓ + kortisoli↑ + HVA↓) korreloi kumulatiivisen EMF-altistuksen kanssa.",
        timeline: "Testattavissa heti (ammattikohortti hormoni- + välittäjäainepaneelilla)",
        falsification: "Kolme vajetta eivät esiinny yhdessä — ne ovat toisistaan ja EMF-altistuksesta riippumattomia",
      },
      {
        id: "HIPPO-1",
        title: "Krooninen EMF-altistus korreloi hippokampuksen tilavuuden pienenemisen kanssa",
        description: "EMF → kortisoli↑ → hippokampuksen dendriittinen vetäytyminen + neurogeneesi↓ → tilavuuden menetys. Hippokampus on myös HPA:n negatiivisen palautteen keskus — sen vaurioituminen poistaa kortisolijarrutuksen → kortisoli↑↑ (takaisinkytkentäsilmukka S9). Testi: vertaa hippokampuksen tilavuutta (MRI-volumetria) työntekijöillä joilla >10 vuotta korkean EMF:n altistusta vs. vakioidut kontrollit, vakioiden iän, stressin, masennuksen. Ennuste: korkean EMF:n ryhmällä pienempi hippokampuksen tilavuus.",
        timeline: "Testattavissa heti (retrospektiivinen MRI-volumetriatutkimus)",
        falsification: "Ei hippokampuksen tilavuuseroa kroonisen korkean EMF:n ja matalan EMF:n ammattiryhmien välillä sekoittavien tekijöiden vakioinnin jälkeen",
      },
      {
        id: "KLIM-1",
        title: "EMF-vähennys palauttaa BAT-suppression mitattavissa lämpökuvauksella",
        description: "Jos EMF → PRDM16↓ → BAT↓ → termogeneesi↓ → painonnousu, niin EMF-vähennyksen pitäisi palauttaa BAT:n toiminta. Testi: mittaa supraklavikulaarinen BAT-aktiivisuus (infrapunalämpökuvaus kylmäaltistuksen jälkeen) ennen ja jälkeen 3 kuukauden EMF-vähennysprotokolla. Ennuste: EMF-vähennysryhmä osoittaa lisääntynyttä BAT-termogeneesiä ja maltillista painonlaskua ilman ruokavaliomuutosta.",
        timeline: "Testattavissa 6 kuukaudessa (lämpökuvaus + EMF-vähennysprotokolla)",
        falsification: "Ei muutosta BAT:n termogeneesissä EMF-vähennyksen jälkeen",
      },
    ],
    mechTimeline: "Aikajana",
    mechFalsification: "Falsifikaatiokriteeri",
    mechLocked: "Lukittu: 2026-08-26",
    mechStatus: "LUKITTU — odottaa testiä",
    suppTitle: "Täydennyskerrosten ennusteet (VK17–25)",
    suppLead: "Ennusteet vasta verifioiduista kerroksista: siittiöiden Ca²⁺/CatSper, sirkadiaaninen kello, dopamiinin motivaatio, OPC-myelinaatio, NK-solujen immuniteetti, HPA-HPG-ristisuppressio, BDNF-hormeesi, suolisto-aivo-akseli ja Walkerin uni-testosteroniyhteys.",
    suppPredictions: [
      {
        id: "E-NEW-1",
        title: "Siittiöiden CatSper Ca²⁺ -vaste on EMF-altistuksesta riippuvainen",
        description: "CatSper-kanavat siittiöissä aktivoituvat ennenaikaisesti RF-EMF:n alaisena, aiheuttaen energian ehtymisen ennen munasolun saavuttamista ('ennenaikainen energiankulutus'). Testi: annosvaste-tutkimus CatSper-aktivaatiosta vs. SAR-taso ihmisen siittiönäytteissä. Ennuste: CatSper-aktivaatio kasvaa SAR:n myötä; matkapuhelintason RF:lle altistetut siittiöt osoittavat ennenaikaista hyperaktivaatiota ja heikentynyttä hedelmöityskykyä.",
        timeline: "Testattavissa 6 kuukaudessa (in vitro siittiö + RF-altistus)",
        falsification: "Ei annosriippuvaista suhdetta SAR:n ja CatSper-aktivaation välillä",
      },
      {
        id: "E-NEW-2",
        title: "GnIH-antagonisti suojaa testosteronia EMF-altistuksen aikana",
        description: "Kortisoli↑ → GnIH↑ → GnRH↓ → T↓ on verifioitu ristisuppressioreitti. RF9 (GnIH-antagonisti) palautti T:n kortisolikäsitellyissä kädellisistä. Testi: altista jyrsijät krooniselle EMF:lle RF9-tyyppisellä GnIH-antagonistilla/ilman. Ennuste: GnIH-antagonisti estää EMF:n aiheuttaman T-laskun, vahvistaen HPA-HPG-ristisuppression mekanismina.",
        timeline: "Testattavissa 12 kuukaudessa (jyrsijämalli farmakologisella interventiolla)",
        falsification: "GnIH-antagonisti EI estä EMF:n aiheuttamaa testosteronin laskua",
      },
      {
        id: "E-NEW-3",
        title: "Krooninen RF muuttaa OPC:n Cav1.2-ilmentymistä ja myelinaation ajoitusta",
        description: "Cav1.2 on välttämätön OPC:n erilaistumiselle ja myelinaatiolle. SMF lisää Cav1.2:ta OPC:issä. Krooninen RF voi dysreguloida Cav1.2:ta kehittyvissä aivoissa → myelinaation ajoitushäiriö → valkoisen aineen integriteetti↓. Testi: altista kehittyvät jyrsijäaivot krooniselle RF:lle; mittaa Cav1.2-ilmentyminen OPC:issä ja myelinaatiomarkkerit (MBP, PLP) kehityksen aikapisteissä. Ennuste: RF-altistetut eläimet osoittavat muuttunutta myelinaation ajoitusta.",
        timeline: "Testattavissa 12 kuukaudessa (kehityksellinen jyrsijämalli)",
        falsification: "Ei muutosta OPC:n Cav1.2-ilmentymisessä tai myelinaation ajoituksessa kroonisen RF:n jälkeen",
      },
      {
        id: "E-NEW-4",
        title: "200 kHz välitaajuus LISÄÄ NK-solujen aktiivisuutta",
        description: "TTFields (200 kHz) lisäävät NK-solujen sytotoksisuutta, kun taas 50 Hz ELF suppressoi sitä — suora validaatio BERM:n taajuusriippuvaiselle reittiherarkkialle. Testi: vertaa NK-solujen sytotoksisuutta ELF (50 Hz), RF (900 MHz, 2,4 GHz) ja IF (200 kHz) altistuksissa. Ennuste: IF-alue osoittaa NK-aktivaatiota kun ELF ja RF osoittavat suppressiota — eri taajuudet, eri biologiset tulokset saman VGCC-mekanismin kautta.",
        timeline: "Testattavissa 6 kuukaudessa (in vitro NK-solumääritys eri taajuuksilla)",
        falsification: "Kaikki taajuudet tuottavat saman NK-soluvasteen suunnan",
      },
      {
        id: "E-NEW-5",
        title: "Suoliston Per2-ilmentyminen korreloi EMF-altistuksen kanssa",
        description: "Per2-poisto häiritsee suolistoestettä → LPS pääsee verenkiertoon → neuroinflammaatio → masennus. EMF häiritsee sirkadiaanista rytmiä → Per2↓. Testi: mittaa Per2-ilmentyminen suoliston epiteelbiopsioissa vuorotyöntekijöiltä (sirkadiaanisen häiriön proksi) vs. päivätyöntekijöiltä, korreloituna EMF-altistushistorian ja seerumin LPS-tasojen kanssa. Ennuste: EMF/sirkadiaaninen häiriö → Per2↓ → kohonnut seerumin LPS.",
        timeline: "Testattavissa 12 kuukaudessa (ammattikohortti suolistobiopsioilla)",
        falsification: "Ei korrelaatiota EMF-altistuksen ja suoliston Per2-ilmentymisen tai seerumin LPS:n välillä",
      },
      {
        id: "E-NEW-6",
        title: "Univaje + EMF tuottaa superadditiivisen testosteronilaskun",
        description: "5 h unta → T -10-15 % ([[ref:leproult2011_testosterone_sleep|JAMA 2011]]). EMF → T↓ kolmen reitin kautta (VK13, VK15, VK22). Yhdistetyn univajeen + EMF:n pitäisi tuottaa SUUREMPI T-lasku kuin kumpikaan yksinään (superadditiivinen). Testi: 2×2 faktoriaalinen RCT: normaali uni/rajoitettu uni × matala EMF/korkea EMF. Mittaa T lähtötasolla ja 1 viikon jälkeen. Ennuste: interaktiotermi on merkitsevä — yhdistelmäryhmä osoittaa >25 % T-laskun vs. ~15 % pelkällä univajeella.",
        timeline: "Testattavissa 3 kuukaudessa (kontrolloitu uni + EMF -tutkimus)",
        falsification: "Ei interaktiovaikutusta — unen ja EMF:n vaikutukset T:hen ovat puhtaasti additiivisia",
      },
      {
        id: "E-NEW-7",
        title: "RF-altistetuilla lapsilla on matalampi BDNF ja dendriittinen tiheys",
        description: "RF 835 MHz (postnataalinen) vähentää BDNF:ää CA1:ssä ja gyrus dentatuksessa dendriittisten okaspiikkien menetyksellä ja muistihäiriöllä ([[ref:bdnf_rf_dev_2021|PMC8159076]]). Samaan aikaan ELF lisää BDNF:ää (hormeesi). Testi: mittaa seerumin BDNF lapsilla henkilökohtaisen RF-altistuksen mukaan (puhelinkäyttö, WiFi-läheisyys). Ennuste: korkeampi RF-altistus korreloi matalamman BDNF:n ja heikompien spatiaalisten muistipisteiden kanssa.",
        timeline: "Testattavissa 12 kuukaudessa (pediatrinen kohortti EMF-dosimetrialla)",
        falsification: "Ei korrelaatiota RF-altistuksen ja BDNF-tasojen välillä lapsilla",
      },
      {
        id: "E-NEW-8",
        title: "Suolistoesteen läpäisevyys (LPS-markkeri) korreloi EMF-altistuksen kanssa",
        description: "EMF → melatoniini↓ → Per2↓ suolistossa → estehäiriö → LPS pääsee verenkiertoon → systeeminen tulehdus. Suolistoeste käyttää SAMOJA tiiviin liitoksen proteiineja kuin BBB (ZO-1, okludiini, klaudiinit), ja melatoniini suojaa molempia. Testi: mittaa seerumin LPS:ää sitova proteiini ja zonuliini (suoliston läpäisevyysmarkkerit) korkean EMF:n vs. matalan EMF:n ammattien työntekijöiltä. Ennuste: korkean EMF:n ryhmällä kohonneet suoliston läpäisevyysmarkkerit.",
        timeline: "Testattavissa heti (ammattikohortti verinäytteellä)",
        falsification: "Ei eroa suoliston läpäisevyysmarkkereissa EMF-altistusryhmien välillä",
      },
    ],
    suppTimeline: "Aikajana",
    suppFalsification: "Falsifikaatiokriteeri",
    suppLocked: "Lukittu: 2026-08-26",
    suppStatus: "LUKITTU — odottaa testiä",
    finalTitle: "Viimeisten kerrosten ennusteet (VK26–31)",
    finalLead: "Ennusteet viimeisistä konvergenssikerroksista: kilpirauhasen Dio2/Dio3, epigeneettinen transgenerationaalinen periytyminen, telomeeri-ikääntymiskierre, oksitosiinin Ca²⁺-häiriö, ELF-primaami-krooninen kipu ja ASD BERM-prototyyppinä.",
    finalPredictions: [
      {
        id: "E-NEW-9",
        title: "Piilevä kilpirauhasen vajaatoiminta: FT3/FT4-suhde on matalampi korkean EMF:n työntekijöillä",
        description: "EMF vähentää hypotalaamista Dio2/Dio3:a → T4→T3-muunnos estyy → veren T4 näyttää 'normaalilta' mutta kudokset eivät saa T3:a. Testi: mittaa FT3/FT4-suhde korkean EMF:n ammateissa (telecom, sähköasentajat) vs. vastaavat matalan EMF:n kontrollit. Ennuste: korkean EMF:n ryhmällä merkittävästi matalampi FT3/FT4-suhde normaalista TSH:sta ja T4:stä huolimatta.",
        timeline: "Testattavissa heti (ammattikohortti verinäytteellä)",
        falsification: "Ei eroa FT3/FT4-suhteessa EMF-altistusryhmien välillä",
      },
      {
        id: "E-NEW-10",
        title: "Transgenerationaalinen siittiöiden metylaatio säilyy F3-sukupolveen",
        description: "EMF muuttaa siittiöiden epigenomia annosriippuvaisesti (1 mT: metylaatio↓, 3 mT: metylaatio↑). Jos EMF-vaikutukset noudattavat DDT:n transgenerationaalista mallia, metylaatiomuutosten pitäisi säilyä F3:een. Testi: altista F0-jyrsijät krooniselle EMF:lle; analysoi siittiöiden metylaatioprofilit F1:ssä, F2:ssa, F3:ssa. Ennuste: F3-siittiöiden metylaatio säilyttää EMF-sormenjäljen F0-altistuksesta. BERM:n KORKEIN PRIORITEETTI tutkimusehdotuksena.",
        timeline: "Testattavissa 18–24 kuukaudessa (monisukupolvinen jyrsijätutkimus)",
        falsification: "F3-siittiöiden metylaatio on erottamaton kontrolleista",
      },
      {
        id: "E-NEW-11",
        title: "EMF-altistuksen kesto korreloi telomeerien lyhenemisen kanssa",
        description: "EMF→ROS↑ + melatoniini↓→telomeraasi↓ + SIRT1↓ pitäisi kiihdyttää telomeerien lyhenemistä. Testi: mittaa leukosyyttien telomeeripituus ammatillisessa EMF-kohortissa altistusvuosien mukaan kerrostettuna. Kontrolloi ikä, tupakointi, BMI. Ennuste: kumulatiivinen EMF-altistus korreloi lyhyempien telomeerien kanssa sekoittavien tekijöiden vakioinnin jälkeen.",
        timeline: "Testattavissa heti (ammattikohortti verinäytteellä)",
        falsification: "Ei korrelaatiota EMF-altistuksen keston ja telomeeripituuden välillä",
      },
      {
        id: "E-NEW-12",
        title: "Melatoniinilisä hidastaa telomeerien lyhenemistä korkean EMF:n populaatiossa",
        description: "Melatoniini aktivoi telomeraasin + SIRT1:n (ikääntymistä hidastava). EMF→melatoniini↓ poistaa tämän suojan. Testi: melatoniinilisän RCT (3–5 mg/yö, 12 kuukautta) korkean EMF:n työntekijöillä. Mittaa telomeeripituus lähtötasolla ja 12 kuukauden kohdalla. Ennuste: melatoniiniryhmä osoittaa merkittävästi vähemmän telomeerien lyhenemistä kuin plasebo.",
        timeline: "Testattavissa 12 kuukaudessa (lisäravinteiden RCT)",
        falsification: "Melatoniinilisä ei vaikuta telomeerien kulumisasteeseen",
      },
      {
        id: "E-NEW-13",
        title: "Oksitosiinitasot korreloivat käänteisesti EMF-altistuksen kanssa",
        description: "Oksitosiinin vapautuminen on suoraan VGCC-riippuvaista (N-tyypin + L-tyypin Ca²⁺-kanavat). EMF häiritsee VGCC:tä → OXT:n vapautuminen häiriintyy. Testi: mittaa sylki- tai plasman oksitosiini kontrolloidussa EMF-altistustutkimuksessa (ennen/jälkeen akuutin altistuksen). Ennuste: akuutti EMF-altistus vähentää oksitosiiivastetta sosiaalisiin ärsykkeisiin.",
        timeline: "Testattavissa 6 kuukaudessa (kontrolloitu laboratoriotutkimus)",
        falsification: "Ei muutosta oksitosiinitasoissa EMF-altistuksen jälkeen",
      },
      {
        id: "E-NEW-14",
        title: "ELF-altistetut eläimet osoittavat α2δ-1↑ ILMAN hermovauriota",
        description: "ELF-primaami (VK4) ylössäätelee VGCC-ilmentymistä mukaan lukien α2δ-1-alayksiköt. α2δ-1:n yliekspressio yksinään tuottaa neuropaattista kipukäyttäytymistä ILMAN hermovauriota. Testi: altista jyrsijät krooniselle ELF:lle (50 Hz, 8–10 päivää); mittaa α2δ-1-ilmentyminen DRG:ssä ja selkäytimen takasarvessa. Ennuste: ELF tuottaa α2δ-1:n ylössäätelyn ja kipukäyttäytymistä ilman hermovauriota.",
        timeline: "Testattavissa 6 kuukaudessa (jyrsijän ELF-altistusmalli)",
        falsification: "Ei muutosta α2δ-1-ilmentymisessä kroonisen ELF-altistuksen jälkeen",
      },
      {
        id: "E-NEW-15",
        title: "ASD-lasten NKCC1/KCC2-suhde korreloi prenataali-EMF:n kanssa",
        description: "NKCC1/KCC2-suhde on kohonnut ASD:ssä (GABA pysyy eksitatorisena). EMF häiritsee KCC2:n kypsymistä IL-1β:n (S9) ja ROS:n kautta. Testi: mittaa plasman NKCC1/KCC2-suhde ASD-lapsilla; korreloi äidin prenataali-EMF-altistushistorian kanssa (ammatti, laitteiden käyttö, asuinpaikan läheisyys tukiasemiin). Ennuste: korkeampi prenataali-EMF korreloi korkeamman NKCC1/KCC2-suhteen kanssa ASD-tapauksissa.",
        timeline: "Testattavissa 12 kuukaudessa (tapaus-verrokkitutkimus äidin historialla)",
        falsification: "Ei korrelaatiota prenataali-EMF-altistuksen ja NKCC1/KCC2-suhteen välillä",
      },
      {
        id: "E-NEW-16",
        title: "Bumetanidi + EMF-vähennys ylittää kummankin yksinään ASD:ssä",
        description: "Bumetanidi estää NKCC1:n → palauttaa inhibitorisen GABA:n. EMF-vähennys poistaa KCC2↓:n ylävirran ajurin. Yhdessä niiden pitäisi olla superadditiivisia. Testi: 2×2 RCT ASD-lapsilla: bumetanidi/plasebo × EMF-vähennys/standardi. Mittaa CARS-pisteet, SRS, sensorinen herkkyys. Ennuste: yhdistelmäryhmä osoittaa merkittävästi paremman parannuksen kuin kumpikaan interventio yksinään.",
        timeline: "Testattavissa 12 kuukaudessa (pediatrinen 2×2 RCT)",
        falsification: "Ei interaktiovaikutusta — bumetanidi ja EMF-vähennys ovat puhtaasti additiivisia",
      },
    ],
    finalTimeline: "Aikajana",
    finalFalsification: "Falsifikaatiokriteeri",
    finalLocked: "Lukittu: 2026-08-26",
    finalStatus: "LUKITTU — odottaa testiä",
    extTitle: "Laajennettujen kerrosten ennusteet (VK41–50)",
    extLead: "Ennusteet laajennetuista konvergenssikerroksista: ADHD toisena prototyyppinä, ALS:n kalsiumhaavoittuvuus, suolisto-aivo-serotoniini, allergiaepidemia, D-vitamiini luonnollisena kanavasalpaajana, PEMF-hormeesiparadoksi ja reproduktiivisen kaaren täydentyminen.",
    extPredictions: [
      {
        id: "E-NEW-24",
        title: "ADHD-lasten PFC-myelinaatio korreloi prenataali-EMF:n kanssa",
        description: "ADHD osoittaa 5 vuoden PFC-kypsymisviiveen ([[ref:adhd_pfc_delay|Shaw 2007 PNAS]]). EMF häiritsee OPC-myelinaatiota Cav1.2:n kautta (VK20) ja vähentää DA:ta PFC:ssä. Testi: DTI-valkoisen aineen integriteetti ADHD-lasten PFC:ssä korreloituna prenataali/neonataalin EMF-altistushistorian kanssa. Ennuste: korkeampi prenataali-EMF korreloi viivästyneiden PFC-myelinaatiomarkkereiden kanssa.",
        timeline: "Testattavissa 12 kuukaudessa (pediatrinen kohortti DTI:llä + äidin historia)",
        falsification: "Ei korrelaatiota prenataali-EMF-altistuksen ja PFC-myelinaation ajoituksen välillä",
      },
      {
        id: "E-NEW-25",
        title: "EMF:n ammatillinen altistus korreloi ALS-riskin kanssa",
        description: "Motoneuroneilla on matala Ca²⁺-puskurointi + Ca²⁺-läpäisevät AMPA-reseptorit, mikä tekee niistä selektiivisesti haavoittuvia Ca²⁺-ylikuormitukselle. Useat meta-analyysit osoittavat OR 1,3–1,7 sähkötyöntekijöille. Testi: olemassa olevien ammattikohorttien yhdistetty analyysi sekoittavien tekijöiden vakioinnilla. Ennuste: EMF-altistus on itsenäinen ALS-riskitekijä (OR > 1,2).",
        timeline: "Testattavissa heti (olemassa olevat meta-analyysit tukevat, tarvitsee yhdistetyn uudelleenanalyysin)",
        falsification: "Yhdistetty analyysi kaikkien sekoittavien tekijöiden vakioinnilla osoittaa OR < 1,1",
      },
      {
        id: "E-NEW-26",
        title: "Suoliston mikrobiomin koostumus muuttuu EMF-altistuksella",
        description: "Yli 90 % serotoniinista tuotetaan suoliston enterokromaffiinisoluissa. EMF→sirkadiaaninen häiriö→Per2↓→suolistoeste↓ (S14) pitäisi muuttaa mikrobiomia. Testi: suoliston mikrobiomin 16S rRNA -sekvensointi EMF-altistetuilla vs. kontrolleilla. Ennuste: EMF-altistus muuttaa mikrobiomin koostumusta, erityisesti vähentäen 5-HT:tä tuottavia lajeja (Lactobacillus, Bifidobacterium).",
        timeline: "Testattavissa 6 kuukaudessa (ammattikohortti ulostenäytteillä)",
        falsification: "Ei merkittävää mikrobiomin koostumuseroa ryhmien välillä",
      },
      {
        id: "E-NEW-27",
        title: "Syöttösolujen degranulaatiokynnys on matalampi EMF-altistetuilla henkilöillä",
        description: "Syöttösolujen degranulaatio on Ca²⁺-riippuvaista. EMF→VGCC→Ca²⁺ pitäisi laskea aktivaatiokynnystä. Testi: in vitro -syöttösolujen degranulaatiomääritys vertaillen EMF-altistettujen vs. kontrollihenkilöiden soluja, mitaten histamiinin vapautumiskynnystä. Ennuste: EMF-altistettujen henkilöiden syöttösolut degranuloituvat matalammilla stimulaatiokynnyksillä.",
        timeline: "Testattavissa 6 kuukaudessa (in vitro -määritys potilasperäisillä syöttösoluilla)",
        falsification: "Ei eroa degranulaatiokynnyksessä ryhmien välillä",
      },
      {
        id: "E-NEW-28",
        title: "D-vitamiinilisä vähentää EMF:n aiheuttamaa VGCC-ylössäätelyä",
        description: "D-vitamiini (1,25(OH)₂D₃) alassäätelee CACNA1C/1D mRNA:ta ([[ref:vdh_lvscc|J Neurosci 2001]]). D-vitamiinin puutos → VGCC:n yliekspressio = sama tila kuin ELF-primaami (VK4). Testi: mittaa VGCC-ilmentyminen PBMC:issä ennen/jälkeen D-vitamiinilisän puutteellisilla henkilöillä. Ennuste: D-vitamiinitason korjaantuminen vähentää VGCC-proteiini-ilmentymistä.",
        timeline: "Testattavissa 6 kuukaudessa (lisäravinnetutkimus PBMC-analyysillä)",
        falsification: "D-vitamiinitason korjaantuminen ei muuta VGCC-ilmentymistasoja",
      },
      {
        id: "E-NEW-29",
        title: "D-vitamiinitaso moduloi yksilöllistä EMF-herkkyyttä",
        description: "Matala D-vitamiini → VGCC yliekspressoitu → enemmän Ca²⁺:ta per EMF-fotoni = korkeampi EMF-herkkyys. Testi: korreloi D-vitamiinitaso EMF:n aiheuttamiin biomarkkerien muutoksiin (CaMKII Thr286, uni-EEG) kontrolloidussa altistustutkimuksessa. Ennuste: D-vitamiinipuutteiset henkilöt osoittavat suurempia EMF:n aiheuttamia biomarkkerien muutoksia.",
        timeline: "Testattavissa 12 kuukaudessa (kontrolloitu EMF-altistus D-vitamiinitason mukaan kerrostettuna)",
        falsification: "Ei korrelaatiota D-vitamiinitason ja EMF-biomarkkerivasteiden suuruuden välillä",
      },
      {
        id: "E-NEW-30",
        title: "PEMF-terapian parametrit karttuvat Ca²⁺-hormeesikäyrälle",
        description: "PEMF edistää luunkasvua tietyillä parametreilla, kun taas krooninen EMF aiheuttaa haittaa. Molemmat toimivat Ca²⁺-kanavien kautta. Testi: mittaa Ca²⁺-signalointi osteoblasteissa PEMF-parametriavaruudessa (taajuus, intensiteetti, kesto). Ennuste: optimaaliset PEMF-parametrit vastaavat Lindgrenin χ-parametrin hormeesihuippua; poikkeama kumpaankin suuntaan vähentää hyötyä.",
        timeline: "Testattavissa 12 kuukaudessa (in vitro osteoblastien Ca²⁺-annosvaste)",
        falsification: "PEMF-vaikutukset eivät noudata hormeesikäyrää Ca²⁺-kanavien kautta",
      },
      {
        id: "E-NEW-31",
        title: "Skitsofrenian riski korkein CACNA1C-variantti + matala D-vitamiini + korkea EMF -yhdistelmällä",
        description: "Kolmoisisku: CACNA1C-riskivariantti (geneettinen) + D-vitamiinipuutos (→VGCC↑) + EMF-altistus (→Ca²⁺↑) pitäisi tuottaa korkeimman skitsofreniariskin. Testi: genotyypitä CACNA1C + mittaa D-vitamiini + arvioi EMF-altistus skitsofrenian tapaus-verrokkitutkimuksessa. Ennuste: kolmisuuntainen interaktio on merkitsevä — kolmoisiskun henkilöillä korkein vetosuhde.",
        timeline: "Testattavissa 12 kuukaudessa (tapaus-verrokkitutkimus genotyypityksellä + biomarkkereilla)",
        falsification: "Ei merkitsevää kolmisuuntaista interaktiota CACNA1C-genotyypin, D-vitamiinin ja EMF:n välillä",
      },
    ],
    extTimeline: "Aikajana",
    extFalsification: "Falsifikaatiokriteeri",
    extLocked: "Lukittu: 2026-08-26",
    extStatus: "LUKITTU — odottaa testiä",
    ultTitle: "Lopullisen integraation ennusteet (VK51–56)",
    ultLead: "Ennusteet lopullisesta konvergenssi-integraatiosta: CatSperin lämpötilakynnys, psilosybiinin Ca²⁺-resetti, kofeiini-Parkinson-annosriippuvuus, litiumveden neuroprotektio, amygdalan ahdistussilmukka ja Amish-kontrolliryhmän validaatio.",
    ultPredictions: [
      {
        id: "E-NEW-32",
        title: "CatSperin ennenaikaisen aktivaation kynnys korreloi EMF-altistuksen kanssa",
        description: "CatSper on lämpötilasäädelty (kynnys 33,5°C, Q₁₀=5,1). EMF→Ca²⁺ voisi laskea termistä aktivaatiokynnystä. Testi: mittaa CatSperin aktivaatiolämpötila siittiöissä miehiltä, joilla on eri ammatillisen EMF-altistuksen tasot. Ennuste: korkeampi EMF-altistus korreloi matalamman CatSper-aktivaatiokynnyksen kanssa.",
        timeline: "Testattavissa 6 kuukaudessa (in vitro CatSper-elektrofysiologia)",
        falsification: "Ei korrelaatiota EMF-historian ja CatSper-aktivaatiolämpötilan välillä",
      },
      {
        id: "E-NEW-33",
        title: "Psilosybiini palauttaa EMF:n aiheuttaman dendriittiatrofian hippokampuksessa",
        description: "Psilosybiini edistää dendriittisten okien kasvua 5-HT2A→Ca²⁺→BDNF→mTOR -reitin kautta (VK52). EMF→kortisoli→hippokampuksen dendriittiatrofia (VK14). Testi: krooninen EMF-altistus → dendriittikato, sitten yksittäinen psilosybiiniannos → mittaa dendriittien palautuminen. Ennuste: psilosybiini palauttaa EMF:n aiheuttaman hippokampuksen dendriittikadon.",
        timeline: "Testattavissa 12 kuukaudessa (jyrsijämalli: EMF-altistus + psilosybiinipelastus)",
        falsification: "Psilosybiini ei palauta dendriittitiheyttä EMF:n aiheuttaman kadon jälkeen",
      },
      {
        id: "E-NEW-34",
        title: "Kofeiinin kulutus korreloi käänteisesti EMF-biomarkkerivasteiden kanssa",
        description: "Kofeiini salpaa A2A-reseptoreita → vähentää neuroinflammaatiota → Ca²⁺-modulaatio. Säännöllisten kofeiininkäyttäjien pitäisi osoittaa vaimentuneita EMF-biomarkkerivastetta. Testi: kontrolloitu EMF-altistus, kerrostettuna kofeiinin kulutuksen mukaan. Ennuste: totuneet kofeiininkäyttäjät osoittavat pienempiä CaMKII Thr286- ja uni-EEG-muutoksia EMF:stä.",
        timeline: "Testattavissa 6 kuukaudessa (lisää kofeiinikerrostus olemassa oleviin protokolliin)",
        falsification: "Ei eroa EMF-biomarkkereissa kofeiininkäyttäjien ja ei-käyttäjien välillä",
      },
      {
        id: "E-NEW-35",
        title: "Juomaveden litium korreloi käänteisesti EMF:ään liittyvien terveystulosten kanssa",
        description: "Litium moduloi GSK-3β:ta ja CaMKII:ta — BERM:n Ca²⁺-kaskadin avainsolmuja. Alueiden, joilla on korkeampi luonnollinen litium juomavedessä, pitäisi osoittaa vaimentuneita EMF-terveysvaikutuksia. Testi: korreloi juomaveden litium EMF:ään liittyvään sairastavuuteen (dementia, itsemurha, masennus) piirikuntatason datalla. Ennuste: interaktiotermi (litium × EMF) on merkitsevä ja suojaava.",
        timeline: "Testattavissa heti (olemassa oleva piirikuntatason data litiumista, EMF-infrastruktuurista, sairastavuudesta)",
        falsification: "Ei interaktiota veden litiumtasojen ja EMF:ään liittyvien terveystulosten välillä",
      },
      {
        id: "E-NEW-36",
        title: "Amygdalan tilavuus kasvaa kroonisella EMF-altistuksella",
        description: "EMF→kortisoli↑ (VK11) → amygdalan BLA-hypertrofia (VK55). Kroonisesti kohonneen kortisolin EMF:stä pitäisi tuottaa mitattava amygdalan suureneminen. Testi: MRI-tilavuusanalyysi korkean EMF:n ammattilaisten ja verrokkien välillä. Ennuste: amygdalan tilavuus on merkitsevästi suurempi korkean EMF:n ryhmässä.",
        timeline: "Testattavissa 12 kuukaudessa (ammattikohortti MRI:llä)",
        falsification: "Ei amygdalan tilavuuseroa korkean ja matalan EMF:n työntekijöiden välillä",
      },
      {
        id: "E-NEW-37",
        title: "Amish-yhteisön kroonisten sairauksien gradientti seuraa EMF-altistusgradienttia",
        description: "Old Order Amish (ei sähköä) → konservatiiviset amisit (jonkin verran sähköä) → mennoniitta (moderni sähkö) → yleinen väestö. Testi: vertaa kroonisten sairauksien esiintyvyyttä tämän kulttuurisen gradientin yli. Ennuste: sairastavuus kasvaa monotonisesti EMF-altistustason mukaan, myös ruokavalion, liikunnan ja elämäntapatekijöiden vakioinnin jälkeen.",
        timeline: "Testattavissa 12 kuukaudessa (poikkileikkausvertailu olemassa olevista terveysrekistereistä)",
        falsification: "Sairausgradientti ei seuraa EMF-altistusta elämäntapasekoittajien vakioinnin jälkeen",
      },
      {
        id: "E-NEW-38",
        title: "Amish-lypsykarjalla on parempi hedelmällisyys kuin modernilla lypsykarjalla",
        description: "Amish-maitotiloilla on minimaalinen EMF. Jos EMF vaikuttaa naudan lisääntymiseen samojen Ca²⁺-mekanismien kautta, Amish-tilojen lehmien pitäisi osoittaa parempaa hedelmällisyyttä. Testi: vertaa tiinehtymisprosentteja, siemennyksiä per tiinehtyminen ja hormoniprofiileja Amish- vs. modernissa karjataloudessa. Ennuste: Amish-tilojen lehmillä merkitsevästi parempi hedelmällisyys samasta rodusta huolimatta.",
        timeline: "Testattavissa 6 kuukaudessa (olemassa oleva maatalousdata + hormoninäytteenotto)",
        falsification: "Ei hedelmällisyyseroa Amish- ja modernin lypsykarjan välillä samasta rodusta",
      },
      {
        id: "E-NEW-39",
        title: "Moderni vedenpuhdistus poistaa litiumin → lisääntyneet neuropsykiatriset sairaudet",
        description: "Moderni vedenkäsittely poistaa hivenlitiumin. Alueiden, jotka siirtyivät kehittyneeseen suodatukseen, pitäisi osoittaa kohonneita dementia-/itsemurhatasoja vaihdon jälkeen. Testi: ennen-jälkeen-analyysi vedenkäsittelyn päivityksistä ja neuropsykiatrisista tuloksista. Ennuste: kehittyneen suodatuksen käyttöönotto korreloi myöhemmän dementian ja itsemurhien lisääntymisen kanssa.",
        timeline: "Testattavissa heti (kuntien vedenkäsittelytiedot + terveysdata)",
        falsification: "Ei muutosta neuropsykiatrisissa tuloksissa litiumin poistavien vedenkäsittelypäivitysten jälkeen",
      },
    ],
    ultTimeline: "Aikajana",
    ultFalsification: "Falsifikaatiokriteeri",
    ultLocked: "Lukittu: 2026-08-26",
    ultStatus: "LUKITTU — odottaa testiä",
    ttypeTitle: "T-tyypin kanavan ennusteet",
    ttypeLead: "T-tyypin kalsiumkanavan bifurkaatiomekanismista johdetut testattavat ennusteet.",
    ttypePredictions: [
      {
        id: "TTYPE-1",
        title: "EMF:n vaikutukset testosteroniin välittyvät ensisijaisesti T-tyypin, eivät L-tyypin kanavien kautta",
        description: "Altista Leydig-soluviljelmät standardoidulle EMF:lle (ELF-moduloitu RF). Mittaa testosteroni kolmessa olosuhteessa: (1) Kontrolli, (2) + nifedipiini (L-tyypin salpaaja) eristää T-tyypin kontribuution, (3) + etosuksimidi (T-tyypin salpaaja) eristää L-tyypin kontribuution. Ennuste: etosuksimidi poistaa ENEMMÄN EMF-vaikutuksesta kuin nifedipiini.",
        timeline: "Testattavissa 3–6 kuukauden sisällä (in vitro, Leydig-soluviljely)",
        falsification: "Nifedipiini yksin poistaa kaiken EMF:n aiheuttaman testosteronimuutoksen (ei T-tyypin kontribuutiota), tai etosuksimidi estää vähemmän EMF-vaikutuksesta kuin nifedipiini",
      },
      {
        id: "TTYPE-2",
        title: "Moduloidut signaalit tuottavat suuremman T-tyypin vaikutuksen kuin jatkuva aalto samalla SAR:lla",
        description: "Altista Leydig-solut: (1) CW 900 MHz:llä, (2) sama kantoaalto amplitudimoduloitu 16 Hz:llä (Adeyn taajuus), (3) sama kantoaalto moduloitu 217 Hz:llä (GSM). Sama aikaintegroitu SAR. Ennuste: moduloidut signaalit tuottavat SUUREMMAN vaikutuksen, koska ELF-modulaatioverhokäyrä läpäisee kalvon kapasitanssin, mutta kantoaalto ei.",
        timeline: "Testattavissa 3–6 kuukauden sisällä (in vitro, Leydig-soluviljely)",
        falsification: "CW ja moduloidut signaalit tuottavat yhtäläiset testosteronivaikutukset samalla aikaintegroidulla SAR:lla, tai CW tuottaa suuremman vaikutuksen",
      },
    ],
    ttypeTimeline: "Aikataulu",
    ttypeFalsification: "Falsifikaatiokriteeri",
    ttypeLocked: "Lukittu: 2026-08-24",
    ttypeStatus: "LUKITTU — odottaa testiä",
    repTitle: "Replikaatiokriisin ratkaisun ennusteet",
    repLead: "Viiden konfoundin kehyksestä johdetut testattavat ennusteet.",
    repPredictions: [
      {
        id: "REP-1",
        title: "Kaikkien viiden parametrin kontrollointi tuottaa yhdenmukaiset EMF-kalsiumeffluksitulokset",
        description: "Toista Blackmanin kalsiumeffluksikoe KAIKKIEN viiden parametrin kontrollilla: (1) lämpötila 36,5±0,3 °C stabiili, (2) sinirikas valaistus dokumentoitu, (3) DC-kenttä mitattu ja suunnattu, (4) Faraday-suojatut kontrollit, (5) kudoksen kehityshistoria dokumentoitu. Ennuste: tulokset ovat yhdenmukaisia laboratorioiden välillä kun kaikki viisi parametria vastaavat toisiaan.",
        timeline: "Testattavissa 6–12 kuukauden sisällä (soluviljely, vakiolaitteet)",
        falsification: "Tulokset pysyvät epäyhdenmukaisina vaikka kaikki viisi parametria on kontrolloitu ja vastaavat laboratorioiden välillä",
      },
      {
        id: "REP-2",
        title: "EMF:n vaikutus insuliinieritykseen on glukoosiriippuvainen",
        description: "Altista haiman β-solulinjoja standardoidulle EMF:lle kolmella glukoosipitoisuudella (2,8 mM basaali, 11 mM stimuloiva, 25 mM supramaksimaalinen). Ennuste: EMF-vaikutus on SUURIN 11 mM:ssä (VGCC:t maksimaalisesti viritetyt) ja PIENIN 2,8 mM:ssä (VGCC:t enimmäkseen kiinni). Testaa glukoosiriippuvaisen χ-ennusteen.",
        timeline: "Testattavissa 3–6 kuukauden sisällä (β-solulinjat, vakioglukoosianalyysi)",
        falsification: "EMF-vaikutus on yhtä suuri kaikilla glukoosipitoisuuksilla tai suurin 2,8 mM basaalilla",
      },
      {
        id: "REP-3",
        title: "BTB:n avautuminen korreloi siittiölaadun laskun kanssa samoissa eläimissä",
        description: "RF-EMF-altistus rotilla samanaikaisen mittauksen kanssa: (1) BTB:n läpäisevyys (FITC-dekstraanimerkkiaine), (2) siittiökonsentraatio ja liikkuvuus, (3) tiiviin liitoksen proteiiniekspressio (okkludiini, ZO-1). Aikasarja: 1, 4, 8, 12 viikkoa. Ennuste: BTB:n läpäisevyys kasvaa ENNEN siittiöparametrien laskua (esteen vaurio edeltää toksisuutta) ja lasku KIIHTYY ajan myötä (positiivinen takaisinkytkentä).",
        timeline: "Testattavissa 3–6 kuukauden sisällä (vakiorottamalli, FITC-dekstraaniprotokolla)",
        falsification: "BTB:n läpäisevyys ja siittiölasku ovat samanaikaisia, tai siittiölasku edeltää BTB:n avautumista",
      },
      {
        id: "REP-4",
        title: "Sentinellilajien herkkyys skaalautuu aineenvaihduntanopeuden mukaan",
        description: "Meta-analyysi: kokoa EMF-altistuskynnykset lajeittain (hyönteiset, linnut, jyrsijät, kädelliset) ja testaa onko kynnys ∝ ruumiinmassa^(0,25). Jos metabolinen χ-skaalaus on oikein, pienemmät lajit osoittavat vaikutuksia matalammilla altistustasoilla Kleiberin lakia seuraten.",
        timeline: "Testattavissa välittömästi (olemassa olevan kirjallisuuden meta-analyysi)",
        falsification: "Ei korrelaatiota ruumiinmassan ja EMF-vaikutuskynnyksen välillä, tai käänteinen korrelaatio",
      },
    ],
    repTimeline: "Aikataulu",
    repFalsification: "Falsifikaatiokriteeri",
    repLocked: "Lukittu: 2026-08-24",
    repStatus: "LUKITTU — odottaa testiä",
    diffTitle: "Neurokehitys ja differentiaatio (johdettu)",
    diffLead: "BERM-kehyksestä johdetut ennusteet neurokehityksen ja differentiaation polkuihin. Ne ovat rinnakkaisia vakiintuneen EDC-tutkimuksen kanssa.",
    diffNote: "Nämä ennusteet ovat L*-tasoisia — johdettu BERM-kehyksestä mutta ei vielä suoraan testattuja. Ne ovat rinnakkaisia vakiintuneen EDC-tutkimuksen kanssa.",
    diffPredictions: [
      {
        id: "DIFF-1",
        title: "Prenataalin EMF:n korrelaatio lyhyemmän AGD:n kanssa vastasyntyneillä pojilla",
        description: "Prenataalin EMF-altistuksen ja vastasyntyneiden poikien lyhyemmän anogenitaalisen etäisyyden (AGD) välillä on korrelaatio. Testi: mittaa AGD syntymäkohorteissa joissa äidin EMF-altistus on dokumentoitu. Kontrolloi ftalaatit, BMI, tupakointi. Jos negatiivinen, prenataaliset kanavat 1-3 ovat heikkoja.",
        discriminating: true,
        critical: true,
        level: "L*",
        verified: false,
      },
      {
        id: "DIFF-2",
        title: "CACNA1C × prenataalinen EMF → ASD + sukupuoliatyyppinen kehitys",
        description: "CACNA1C-riskivariantin kantajat, joiden prenataalinen EMF-altistus oli korkea, osoittavat korkeampia ASD+sukupuoliatyyppisen kehityksen lukuja kuin ei-kantajat samalla altistuksella. GxE-interaktiotesti.",
        discriminating: true,
        critical: false,
        level: "L*",
        verified: false,
      },
      {
        id: "DIFF-3",
        title: "Puberteetin alkamisikä korreloi käänteisesti EMF-/ruutuaika-altistuksen kanssa",
        description: "Puberteetin alkamisikä korreloi käänteisesti lapsuuden EMF-/ruutuaika-altistuksen kanssa. VAHVISTETTU: CPP kasvoi 3× tytöillä, 2× pojilla ([[ref:denmark-cpp-3x-increase|Tanska 1998-2017]]). COVID-ruutuajan kasvu → CPP-piikki.",
        discriminating: false,
        critical: false,
        level: "M|C",
        verified: true,
      },
      {
        id: "DIFF-4",
        title: "Syljen oksytosiinitasot korreloivat käänteisesti EMF-altistuksen kanssa",
        description: "Nuorten syljen oksytosiinitasot korreloivat käänteisesti henkilökohtaisen EMF-altistuksen kanssa (puhelimen käyttötunnit). Testi: biomarkkeritutkimus dosimetrialla.",
        discriminating: false,
        critical: false,
        level: "L*",
        verified: false,
      },
      {
        id: "DIFF-5",
        title: "Insulaarikorteksin aktivaatio eroaa EMF-altistustason mukaan",
        description: "Insulaarikorteksin aktivaatiomallit interoseptisten tehtävien aikana eroavat korkean ja matalan EMF-altistuksen nuorten välillä. Testi: fMRI sydämenlyönnin tunnistustehtävällä.",
        discriminating: false,
        critical: false,
        level: "L*",
        verified: false,
      },
      {
        id: "DIFF-6",
        title: "Sukupuoliklinikoiden lähetteet korreloivat teknologian omaksumisen kanssa",
        description: "Sukupuoliklinikoiden lähetemäärät korreloivat teknologian omaksumisen aikajanan kanssa maittain. VAHVISTETTU: Ruotsi +19 700%, Australia +12 650%, UK +2 457%. AFAB-enemmistö. Ajallinen korrelaatio älypuhelimen omaksumisen kanssa ~2010.",
        discriminating: false,
        critical: false,
        level: "L*",
        verified: true,
      },
      {
        id: "DIFF-7",
        title: "BDD-prevalenssi kasvaa ruutuajan myötä",
        description: "Kehonkuvahäiriön (BDD) prevalenssi kasvaa ruutuajan/laitekäytön myötä. VAHVISTETTU: BDD-prevalenssi nousee, 'Snapchat-dysmorfia' dokumentoitu.",
        discriminating: false,
        critical: false,
        level: "L*",
        verified: true,
      },
    ],
    diffLevel: "Taso",
    diffDiscriminating: "Erotteleva",
    diffCritical: "Kriittinen erotteleva",
    diffLocked: "Lukittu: 2026-08-24",
    diffStatus: "LUKITTU — odottaa testiä",
    diffVerifiedStatus: "VAHVISTETTU",
    vgccTitle: "VGCC-geeniperheen ennusteet",
    vgccLead: "VGCC-geeniperheen kuuden geenin analyysistä johdetut ennusteet. Kukin kohdistuu tiettyyn kalsiumkanavan alatyyppiin ja sen sairausmekanismiin.",
    vgccNote: "Evidenssitasot vaihtelevat ennusteittain: E (kokeellinen tuki), M|C (mekanistinen/korrelaatio), L* (johdettu/teoreettinen).",
    vgccPredictions: [
      {
        id: "MYOP-1",
        title: "Ulkoilun suojavaikutus myopiaa vastaan on osittain EMF-reduktion välittämä",
        description: "Vertaa myopian etenemistä lapsilla, joilla on identtinen ulkoiluaika mutta eri EMF-altistus (Faraday-suojatut vs tavalliset ulkoalueet). Jos EMF-reduktio lisää valon suojaavaa vaikutusta, se vahvistaa VGCC/DA-kanavan.",
        level: "L*",
        discriminating: true,
        verified: false,
      },
      {
        id: "IMMUNE-1",
        title: "Krooninen EMF-altistus nostaa T-solujen NFAT-perusaktivaatiota",
        description: "Mittaa NFAT:n tumaan siirtyminen T-soluissa korkean ja matalan EMF-altistuksen populaatioista muiden tekijöiden suhteen kaltaistetuissa ryhmissä.",
        level: "M|C",
        discriminating: false,
        verified: false,
      },
      {
        id: "HEAR-1",
        title: "Bluetooth-kuulokkeiden käyttöaika korreloi subkliinisen kuulonmenetyksen kanssa nuorilla aikuisilla",
        description: "Kontrolloi äänenvoimakkuus. Ennuste: EMF-komponentti (Bluetooth RF) lisää akustista vahinkoa Cav1.3-eksitotoksisuuden kautta.",
        level: "M|C",
        discriminating: false,
        verified: false,
      },
      {
        id: "MIGR-1",
        title: "CACNA1I T-tyypin variantin kantajilla on korkeampi EMF-laukaistun migreenin esiintyvyys",
        description: "GxE-interaktio: T-tyypin variantti × EMF-altistus → enemmän kortikaalisia leviäviä depressiotapahtumia → enemmän migreenejä.",
        level: "E",
        discriminating: true,
        verified: false,
      },
      {
        id: "SLEEP-2",
        title: "Unisukkulatiheys korreloi käänteisesti ilta-EMF-altistuksen kanssa",
        description: "Mittaa EEG-unisukkulat koehenkilöillä iltanäyttökäytöllä ja ilman. Ennuste: sukkulatiheys ↓ korkean EMF:n ryhmässä Cav3.3 nRt -perturbaation vuoksi.",
        level: "M|C",
        discriminating: false,
        verified: false,
      },
      {
        id: "PCOS-1",
        title: "PCOS-prevalenssi korreloi kansallisen EMF-tiheyden kanssa BMI:n ja ruokavalion suhteen kontrolloituna",
        description: "Kansainvälinen analyysi. Ennuste: positiivinen korrelaatio koska 4 modulomin elintä (haima, theca, granulosa, aivolisäke) konvergoivat PCOS-patofysiologiaan.",
        level: "M",
        discriminating: false,
        verified: false,
      },
      {
        id: "PAIN-1",
        title: "Cav3.2-salpaaja vaimentaa EMF-indusoitua kipuherkistymistä eläinmallissa",
        description: "Altista rottia krooniselle EMF:lle, mittaa kipukynnykset, anna sitten selektiivinen Cav3.2-salpaaja. Ennuste: salpaaja kumoaa EMF-indusoidun hyperalgesian.",
        level: "M|C",
        discriminating: true,
        verified: false,
      },
      {
        id: "QT-1",
        title: "QTc-intervalli korreloi positiivisesti kumulatiivisen EMF-altistuksen kanssa nuorilla aikuisilla",
        description: "EKG-seulontatutkimus EMF-dosimetrialla. Ennuste: krooninen EMF → Cav1.2-ikkunavirta ↑ → aktiopotentiaalin pidentyminen → mitattava QTc-nousu.",
        level: "M|C",
        discriminating: false,
        verified: false,
      },
      {
        id: "TDP-1",
        title: "TheraBionic-teho kumoutuu T-tyypin Ca²⁺-kanavasalpaajan samanaikaisella annolla",
        description: "Jo vahvistettu FDA-merkinnällä (kontraindikaatio CCB:ien kanssa). Lisätesti: spesifinen T-tyypin salpaaja (etosuksimidi) kumoaa TheraBionic:n anti-HCC-vaikutuksen, kun taas L-tyypin salpaajalla (nifedipiini) pitäisi olla vähemmän vaikutusta.",
        level: "E",
        discriminating: true,
        verified: true,
      },
      {
        id: "UNIFIED-1",
        title: "Sama yksilö osoittaa korreloivia VGCC-riippuvaisia biomarkkereita eri järjestelmissä",
        description: "Yhdessä kohortissa mittaa: HRV (sydämen Cav3), unisukkulatiheys (Cav3.3), kipukynnys (Cav3.2 DRG), melatoniini (CRY/Cav), siittiöiden laatu (Cav3 Leydig). Ennuste: kaikkien tulisi korreloida yksilöiden sisällä koska kaikki jakavat VGCC/Ca²⁺:n ylävirtasyynä.",
        level: "M",
        discriminating: true,
        verified: false,
      },
    ],
    vgccLevel: "Taso",
    vgccDiscriminating: "Erotteleva",
    vgccLocked: "Lukittu: 2026-08-24",
    vgccStatus: "LUKITTU — odottaa testiä",
    vgccVerifiedStatus: "VAHVISTETTU",
    tTfrTitle: "Testosteroni → TFR -kynnysennusteet",
    tTfrLead: "Maakohtaiset ennusteet testosteronikynnysmallistä. Jokainen on lukittu kumoamisehdolla. Malli on kalibroitu Suomen ja Korean datalla; USA:n ja Israelin ennusteet ovat ekstrapolointeja.",
    tTfrNote: "Nämä ennusteet testaavat ydinväitettä, jonka mukaan kumulatiivinen testosteronilasku (~1 %/vuosi, ikäriippumaton) luo biologisen hedelmällisyysrajoitteen, joka ilmenee ~35 vuotta alkamisen jälkeen.",
    tTfrLocked: "Lukittu: 2026-08-25",
    tTfrStatus: "LUKITTU — odottaa testiä",
    tTfrDiscriminating: "Erotteleva",
    tTfrCritical: "Kriittinen",
    tTfrPredictions: [
      {
        id: "T-TFR-1",
        title: "USA:n TFR laskee alle 1,30:n vuoteen 2035 mennessä",
        description: "Testosteronikynnysmallin perusteella: USA:n kumulatiivinen T-menetys saavuttaa ~40 % noin 2030. Ennuste: TFR alkaa kiihtyvään laskuun 2028 jälkeen ja laskee alle 1,30:n vuoteen 2035 mennessä. Kumoaminen: USA:n TFR pysyy yli 1,40 vuonna 2035.",
        discriminating: true,
        critical: true,
        level: "M|C",
        verified: false,
      },
      {
        id: "T-TFR-2",
        title: "Suomen TFR laskee alle 1,00:n vuoteen 2032 mennessä",
        description: "Suomi on jo ylittänyt biologisen kynnyksen. Nykyinen kehityskulku: 1,87 (2010) → 1,26 (2024), −4,5 %/vuosi. Projisointi: 1,26 × 0,955^8 ≈ 0,87 vuoteen 2032. Kumoaminen: Suomen TFR vakautuu yli 1,10:n.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "T-TFR-3",
        title: "Israelin TFR alkaa laskea mitattavasti vuoteen 2035 mennessä",
        description: "Israelin kulttuurinen puskuri on ylläpitänyt TFR:ää ~3,0 huolimatta USA:n kaltaisesta T-laskusta. Ennuste: biologinen kynnys (~40 % kumulatiivinen menetys) saavutetaan ~2035, jolloin myös uskonnollisesti motivoituneet pariskunnat kokevat subfertiliteettiä. Kumoaminen: Israelin TFR pysyy yli 2,8 vuonna 2040.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "T-TFR-4",
        title: "Korean 200 mrd $:n pronatalistiset menot eivät nosta TFR:ää yli 1,0:n",
        description: "Korea on ylittänyt biologisen kynnyksen (~49 % kumulatiivinen T-menetys). Sosiaaliset kannustimet eivät voi kompensoida biologista kyvyttömyyttä. Ennuste: TFR pysyy alle 1,0 vuoteen 2035 riippumatta politiikkamenoista. Kumoaminen: Korean TFR nousee yli 1,0:n kestävästi 3+ vuodeksi.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "T-TFR-5",
        title: "T-laskuvauhti ennustaa TFR-muutosta paremmin kuin BKT tai koulutus",
        description: "Maiden välinen regressio: T-laskuvauhti (ikäriippumaton sekulaaritrendi) ennustaa TFR-muutosta paremmin kuin BKT, koulutus tai kaupungistuminen yksinään. Testattavissa olemassa olevalla datalla USA:sta, Tanskasta, Suomesta, Israelista ja tulevista aasialaisista tutkimuksista. Kumoaminen: BKT tai koulutus selittävät >80 % TFR-varianssista T-laskun kontrolloinnin jälkeen.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
    ],

    causalTitle: "Kausaalirakenteen ennusteet",
    causalLead: "Ennusteet jotka perustuvat BMI-mediaattori-kausaalianalyysiin ja HPG-uudelleenasetuksen evidenssiin. Nämä testaavat BERM:n ehdottamia spesifisiä kausaalireittejä.",
    causalNote: "Nämä ennusteet testaavat mallin kausaaliRAKENNETTA — eivät sen suuruusluokkaa. Ne ovat falsifioitavissa formaalilla mediaatioanalyysilla ja maiden välisellä endokriinidatalla.",
    causalLocked: "Lukittu: 2026-08-25",
    causalStatus: "LUKITTU — odottaa testiä",
    causalPredictions: [
      {
        id: "CAUS-1",
        title: "BMI-mediaatio kattaa 25–40 % T:n kokonaislaskusta",
        description: "Formaali mediaatioanalyysi (Baron & Kenny tai SEM) pitkittäis-T-datalla samanaikaisilla BMI-mittauksilla: epäsuora vaikutus BMI:n kautta = 25–40 % kokonaisvaikutuksesta. Perustuu [[ref:mazur2013|Mazur 2013]] kvantifiointiin (117/175 ng/dL = 67 % suora). Falsifikaatio: mediaatioanalyysi osoittaa <10 % tai >60 % epäsuora vaikutus BMI:n kautta.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "CAUS-2",
        title: "Faradayn häkillä suojatut miehet eivät osoita T-laskua eivätkä BMI-nousua",
        description: "Jos EMF ajaa sekä T-laskua että BMI-nousua, EMF-suojatuissa ympäristöissä olevien miesten tulisi osoittaa MOLEMPIEN trendien vaimentumista. Testattavissa ammatillisissa kohorteissa (sukellusveneen miehistöt, suojatut tilat). Falsifikaatio: suojattu kohortti osoittaa saman T-laskutahdin kuin suojaamaton.",
        discriminating: true,
        critical: true,
        level: "M|C",
        verified: false,
      },
      {
        id: "CAUS-3",
        title: "LH:n laskutahti korreloi EMF-proxyn kanssa maiden välillä",
        description: "[[ref:santi2025|Santi 2025]] löysi globaalin LH-laskun. BERM ennustaa tämän olevan reitti C/D -välitteistä. Maissa joissa korkeampi EMF-proxy (asuinrakennusten sähköistys, laajakaistapenetraatio) tulisi olla jyrkempi LH-lasku. Testattavissa maatason LH-datalla + EMF-proxylla. Falsifikaatio: ei korrelaatiota EMF-proxyn ja LH:n laskutahdin välillä.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
    ],

    popTitle: "Populaatiovertailun ennusteet",
    popLead: "Ennusteet jotka perustuvat 9 matalan EMF:n populaation systemaattiseen vertailuun moderneihin populaatioihin. Nämä testaavat seuraako havaittu terveysgradientti EMF-altistusta BERM:n ennusteiden mukaisesti.",
    popPredictions: [
      {
        id: "POP-1",
        title: "Amissien TFR korreloi käänteisesti etäisyyteen lähimmästä kaupunkialueesta",
        description: "CAPED-tietokannassa: lähempänä kaupunkeja sijaitsevilla amish-yhteisöillä (korkeampi ympäristön EMF) tulisi olla matalampi TFR kuin syrjäisillä yhteisöillä, kontrolloiden lahkon tiukkuus ja yhteisön koko.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "POP-2",
        title: "Tsimane-vastasyntyneiden AGD on pidempi kuin Trinidadin (lähin kaupunki) vastasyntyneiden AGD",
        description: "AGD-mittaus Tsimane Health and Life History Project -kohortissa vs. kaupunki-trinidadilainen vertailuryhmä. Sama maantieteellinen alue, eri EMF-altistus. Jos Tsimane AGD > Trinidad AGD, tukee prenataalista EMF → maskulinisaatio↓.",
        discriminating: true,
        critical: true,
        level: "L*",
        verified: false,
      },
      {
        id: "POP-3",
        title: "Mosetén-terveysmittarit ovat Tsimanen ja länsimaisen VÄLISSÄ jokaisessa mitatussa muuttujassa",
        description: "Osittain jo vahvistettu (dementia, aivoatrofia). Ennustetaan sama gradientti: hedelmällisyys, metabolinen oireyhtymä, autoimmuunimarkkerit, likitaitteisuus, unenlaatu. Tämä gradientti geneettisesti yhtenevässä populaatiossa on vahvin saatavilla oleva luonnollinen koe.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "POP-4",
        title: "Mobiiliteknologian omaksuvat alkuperäisyhteisöt osoittavat terveyden heikkenemistä 5–10 vuodessa",
        description: "Pitkittäisseuranta yhteisöissä, jotka siirtyvät puhelimettomasta älypuhelimen käyttöön. Ennuste: unenlaatu↓, likitaitteisuus↑, metaboliset markkerit↑, hedelmällisyysaikomus muuttumaton mutta biologiset hedelmällisyysmarkkerit (hormonit, siittiöt) ↓.",
        discriminating: true,
        critical: false,
        level: "L*",
        verified: false,
      },
    ],
    popLevel: "Taso",
    popDiscriminating: "Erotteleva",
    popCritical: "Kriittinen erotteleva",
    popLocked: "Lukittu: 2026-08-24",
    popStatus: "LUKITTU — odottaa testiä",
    tPredTitle: "Testosteroniennusteet",
    tPredLead: "Kaksitasoisesta mallista johdetut ennusteet: testosteronin sekulaarilasku TFR:n ajallisena ennustajana.",
    tPredPredictions: [
      {
        id: "T-1",
        title: "Aikaisemmin sähköistyneissä maissa T-lasku alkoi aikaisemmin",
        description: "Maiden välinen vertailu testosteronin sekulaarilaskun alkamisajankohdasta. Vaatii harmonisoitua pitkittäistä T-dataa vähintään 5 maasta. T→TFR-viiveen (~8 vuotta) tulisi olla yhdenmukainen populaatioiden välillä.",
        falsification: "Ei korrelaatiota sähköistymisajankohdan ja T-laskun alkamisen välillä ≥5 maassa harmonisoidulla T-datalla",
      },
      {
        id: "T-2",
        title: "LH+T-kaava on hypotalaaminen (molemmat laskevat) kaikissa korkean EMF:n populaatioissa",
        description: "Santi 2025 -diagnostiikka ennustaa T↓+LH↓ (hypotalaaminen suppressio) korkean EMF-altistuksen populaatioissa. Testi: vertaa LH- ja T-sekulaaritrendejä vähintään 3 riippumattomassa pitkittäiskohortissa.",
        falsification: "LH on stabiili tai nouseva ≥2/3 testatusta populaatiosta T:n laskiessa — osoittaisi testikulaarista (EDC) eikä hypotalaamista (EMF) kaavaa",
      },
      {
        id: "T-3",
        title: "Koirien siittiölaskuaste vastaa ihmisen T-laskuastetta (molemmat ~1 %/v)",
        description: "Koirat jakavat kodin EMF-altistuksen ihmisten kanssa. [[ref:lea2016|Lea ym. 2016]] dokumentoi −1,0 %/v siittiölaskun brittiläisissä siitoskoirissa 26 vuoden aikana — sama aste kuin ihmisen testosteronin sekulaarilasku. Testi: vertaa koirien siittiölaskun alkamisajankohtaa paikalliseen sähköistyshistoriaan ≥3 maassa.",
        falsification: "Koirien siittiölaskuasteet vaihtelevat >0,5 %/v maissa joissa on samankaltainen EMF-ympäristö",
      },
      {
        id: "T-4",
        title: "CatSper-toiminta laskee suhteessa kumulatiiviseen EMF-altistukseen siemennäytteissä",
        description: "CatSper-riippuvaisen kapasitaation ja progesteronin indusoiman hyperaktivaation tulisi osoittaa mitattavaa laskua kasvavan kumulatiivisen EMF-altistuksen myötä (puhelin-taskussa-tunteja × vuosia). Testattavissa olemassa olevin IVF-klinikan siemennäyttein EMF-altistuskyselylomakkeiden kanssa.",
        falsification: "Ei korrelaatiota itse raportoidun taskualtistuksen ja CatSper-riippuvaisten toiminnallisten parametrien välillä ≥200 siemennäytteessä",
      },
      {
        id: "T-5",
        title: "CatSper-salpaaja NNC55-0396 tuottaa saman siittiöfenotyypin kuin RF-altistus vastaavalla Ca²⁺-muutoksella",
        description: "Jos EMF vaikuttaa siittiöihin pääasiassa CatSperin kautta, farmakologisen CatSper-salpauksen (NNC55-0396) tulisi tuottaa RF-altistetun siittiön täysi fenotyyppi: alentunut motiliteetti, heikentynyt kapasitaatio ja kumoutunut progesteroni-indusoitu hyperaktivaatio.",
        falsification: "RF-altistus tuottaa siittiövaurioita joita ei voi toistaa CatSper-salpauksella — osoittaisi ei-CatSper-mekanismin hallitsevan",
      },
    ],
    tPredLocked: "Lukittu: 2026-08-31",
    tPredStatus: "LUKITTU — odottaa testiä",
    societalTitle: "Yhteiskunnalliset ennusteet",
    societalLead: "Ennusteet jotka perustuvat kaksoislukkoteoriaan: populaatiotason testosteronin lasku yhdistettynä kortisolin nousuun tuottaa multiplikatiivisen käyttäytymissuppression. Nämä testaavat, seuraavatko yhteiskunnalliset käyttäytymistrendit hormonaalisia muutoksia joita BERM ennustaa EMF-altistuksesta.",
    societalPredictions: [
      {
        id: "SOC-1",
        title: "Miesten työvoimaosuus jatkaa laskuaan kaikissa korkean EMF:n maissa",
        description: "Miesten työvoimaosuus jatkaa laskuaan jokaisessa G20-maassa vuoteen 2030 asti ilman merkittävää poliittista interventiota (esim. perustulo, pakolliset työllistämisohjelmat). Kaksoislukkoteoria ennustaa, että populaatiotason testosteronin lasku vähentää statusmotivaatiota samalla kun kortisolin nousu tekee työpaikkakilpailusta ahdistavaa — tuottaen asteittaista 'vetäytymiskäyttäytymistä'.",
        falsification: "Miesten työvoimaosuus nousee >2 prosenttiyksikköä missä tahansa G20-maassa ilman merkittävää politiikkamuutosta vuoteen 2030 mennessä",
      },
      {
        id: "SOC-2",
        title: "Seksittömyysluvut korreloivat älypuhelinten omaksumisajankohdan kanssa maittain",
        description: "Maiden välinen analyysi osoittaa merkitsevän korrelaation älypuhelinten omaksumisajankohdan (vuosi jolloin penetraatio ylitti 50 %) ja 18–30-vuotiaiden miesten seksittömyyslukujen nousun alkamisen välillä. Maissa joissa älypuhelimet omaksuttiin aikaisemmin (esim. Etelä-Korea, Japani) pitäisi näkyä aikaisempi seksittömyystrendin alku kuin myöhemmin omaksuneissa maissa.",
        falsification: "Ei korrelaatiota älypuhelinten omaksumisajankohdan ja seksittömyystrendin alkamisen välillä ≥10 maassa",
      },
      {
        id: "SOC-3",
        title: "Matalan EMF:n yhteisöissä avioliittoluvut pysyvät vakaina tai nousevat",
        description: "Amish- ja mennoniittiyhteisöt — joissa henkilökohtainen EMF-altistus on matala rajoitetun teknologiankäytön vuoksi — osoittavat vakaita tai nousevia avioliittolukuja 2020–2030 samalla kun Yhdysvaltain kansalliset avioliittoluvut jatkavat laskuaan. Tämä testaa kaksoislukkoteorian ennustetta, jonka mukaan käyttäytymisvaikutukset (vähentynyt lähestymiskäyttäytyminen, lisääntynyt välttäminen) ovat biologisesti välittyneitä, eivät puhtaasti kulttuurisia.",
        falsification: "Amish/mennoniittien avioliittoluvut laskevat Yhdysvaltain kansalliseen keskiarvoon verrattavalla nopeudella 2020–2030",
      },
    ],
    societalTimeline: "Aikajana",
    societalFalsification: "Kumoamisehto",
    societalLocked: "Lukittu: 2026-08-25",
    societalStatus: "LUKITTU — odottaa testiä",

    techTitle: "Teknologiakohtaiset ennusteet",
    techLead: "Ennusteet jotka perustuvat ELF-priming-hypoteesiin, superadditiivisuusmalliin ja teknologiakohtaiseen altistusanalyysiin. Nämä testaavat tuottavatko monitaajuiset vuorovaikutukset ei-additiivisia biologisia vaikutuksia ja aiheuttiko tietyt teknologiasiirtymät havaitut terveysinflektiot.",
    techPredictions: [
      {
        id: "PRIME-1",
        title: "ELF-primatut solut osoittavat vahvistuneen RF-kalsiumvasteen",
        description: "Esialtista hermosoluviljelmät 50 Hz ELF:lle 10 päivää (priming). Altista sitten standardoidulle RF:lle (esim. 2,4 GHz WiFi). Ennuste: primatut solut osoittavat 2–3× suuremman Ca²⁺-vasteen identtiseen RF-stimulukseen verrattuna primaamattomiin kontrolleihin. Mekanismi: ELF ylössäätelee VGCC-ekspressiota ([[ref:sun2016_elf_vgcc|PMC4757866]]), tehden jokaisesta solusta herkemmän myöhemmälle RF-aktivaatiolle.",
        timeline: "Testattavissa 3–6 kuukaudessa (in vitro, standardi Ca²⁺-kuvantaminen)",
        falsification: "Ei eroa Ca²⁺-vasteessa ELF-primattujen ja primaamattomien solujen välillä identtisessä RF-altistuksessa",
      },
      {
        id: "PRIME-2",
        title: "Amishit (ei verkko-primingia) osoittavat minimaalisen RF-biovasteen",
        description: "Vertaa RF-indusoituja biomarkkereita (sylkikortisoli, melatoniini, HRV) vanhojen amishien (ei asuinalueen ELF-primingia) ja sovitettujen modernien kontrollien välillä identtisen akuutin RF-altistuksen jälkeen. Ennuste: amishit osoittavat merkittävästi vaimentuneen vasteen koska heidän VGCC-ekspressioonsa on perusviivalla.",
        timeline: "Testattavissa 1–2 vuodessa (vaatii amish-yhteisön yhteistyötä)",
        falsification: "Amishit osoittavat yhtäläisen tai suuremman RF-biovasteen kuin modernit kontrollit",
      },
      {
        id: "PRIME-3",
        title: "Asuinalueen sähkönkulutus ennustaa EMF-biomarkkerit paremmin kuin matkapuhelimen käyttö",
        description: "Kohorttitutkimuksessa henkilökohtaisella EMF-dosimetrialla asuinalueen sähkönkulutus (kWh/kk) ennustaa kroonisia EMF-biomarkkereita (melatoniinisuppressio, siittiölaatu, HRV) vahvemmin kuin matkapuhelimen käyttötunnit.",
        timeline: "Testattavissa 1–2 vuodessa (kohorttitutkimus dosimetrialla)",
        falsification: "Matkapuhelimen käyttö on vahvempi biomarkkeriennustaja kuin sähkönkulutus",
      },
      {
        id: "MULTI-1",
        title: "Monitaajuusaltistus tuottaa superadditiivisen CaMKII-aktivaation",
        description: "Altista soluja: (1) 50 Hz yksin, (2) 2,4 GHz yksin, (3) 50 kHz IF yksin, (4) kaikki kolme samanaikaisesti. Mittaa CaMKII-autofosforylaatio. Ennuste: yhdistetty altistus tuottaa CaMKII-aktivaation joka on suurempi kuin yksittäisten altistusten summa.",
        timeline: "Testattavissa 3–6 kuukaudessa (in vitro, standardi Western blot)",
        falsification: "Yhdistetty altistus tuottaa additiivisen tai sub-additiivisen CaMKII-aktivaation",
      },
      {
        id: "MULTI-2",
        title: "Palautumisikkunan eliminaatio kiihdyttää kumulatiivista vahinkoa",
        description: "Altista sovitetut soluryhmät identtiselle kokonais-EMF-annokselle: (A) jatkuva monikaistainen (simuloiden modernia kotia), (B) sama annos mutta 8 tunnin yötauko (Faraday-suojattu unijakso). Ennuste: ryhmä B osoittaa merkittävästi vähemmän kumulatiivista CaMKII-aktivaatiota 30 päivän jälkeen.",
        timeline: "Testattavissa 2–4 kuukaudessa (in vitro, pitkittäinen)",
        falsification: "Ei eroa jatkuvan ja tauotetun altistuksen välillä samalla kokonaisannoksella",
      },
      {
        id: "MULTI-5",
        title: "WiFi-beacon 10 Hz -pulssi tuottaa ELF-tyyppisiä biologisia vaikutuksia kantajasta riippumatta",
        description: "WiFi-reitittimet lähettävät 10 Hz beacon-pulssin myös ilman datasiirtoa (Schmid 2012). Beaconin huippukerroin on 100:1. Ennuste: eristetty 10 Hz pulssoitu signaali WiFi-beacon-intensiteetillä tuottaa ELF-tyyppisiä biologisia vaikutuksia verrattavina jatkuvaan 10 Hz sinisignaaaliin.",
        timeline: "Testattavissa 3–6 kuukaudessa (EEG/melatoniinitutkimus)",
        falsification: "WiFi-beacon-pulssi ei tuota ELF-tyyppisiä biologisia vaikutuksia",
      },
      {
        id: "TECH-LED",
        title: "EU:n LED-siirtymämaat osoittavat jyrkemmän siittiölaskun kuin myöhään adoptoineet maat",
        description: "EU:n [[ref:eu_regulation_244_2009|direktiivi 244/2009]] pakotti hehkulamppukiellon 2009–2012 ja pakollisen LED-adoption. Ennuste: EU-maat osoittavat tilastollisesti merkittävän kiihtymisen siittiölaadun laskussa alkaen 2012–2015 verrattuna maihin jotka adoptoivat LED-valaistuksen myöhemmin.",
        timeline: "Testattavissa välittömästi (olemassa oleva meta-analyysidatat)",
        falsification: "Ei kiihtymiseroa varhaisen ja myöhäisen LED-adoption maiden välillä",
      },
      {
        id: "TECH-EV",
        title: "Sähköautoilijat osoittavat korkeampia IF-kaistan biomarkkereita kuin polttomoottoriautoilijat",
        description: "Sähköautojen invertterit tuottavat 5–50 kHz IF-kenttiä hytissä. Vertaa IF-relevantteja biomarkkereita (kivesten toiminta, HRV ajon aikana) sovitettujen sähköauto- ja polttomoottoriauton kuljettajien välillä vastaavilla päivittäisillä työmatka-ajoilla. Israelilainen patentti US12379429 osoittaa teollisuuden tunnistavan hytin kentät ongelmallisiksi.",
        timeline: "Testattavissa 1–2 vuodessa (kohorttitutkimus dosimetrialla)",
        falsification: "Ei eroa biomarkkereissa sähköauto- ja polttomoottoriauton kuljettajien välillä",
      },
    ],
    techTimeline: "Aikajana",
    techFalsification: "Kumoamisehto",
    techLocked: "Lukittu: 2026-08-26",
    techStatus: "LUKITTU — odottaa testiä",

    layerTitle: "Kerrostumamallin ennusteet",
    layerLead: "Ennusteet jotka perustuvat kerrostumamalliin — viisi teknologiakerrosta kerrostuvat superadditiivisesti CaMKII-kynnysintegraation kautta. Nämä testaavat ulottuuko kerrostumamallin historiallinen verifikaatio prospektiivisiin ennusteisiin.",
    layerPredictions: [
      {
        id: "LAYER-1",
        title: "Myöhemmin LED:n adoptoineet maat osoittavat myöhemmän terveyskiihdytyksen",
        description: "EU:n LED-mandaatti 2009–2012 pakotti IF-kanavan avaamisen. Maat jotka vastustivat tai viivyttivät LED-adoptiota osoittavat myöhemmät IF-spesifiset terveysvaikutukset (metaboliset, uneen liittyvät).",
        falsification: "Ei temporaalista korrelaatiota LED-adoptioajankohdan ja terveystrendien inflektiopisteiden välillä",
      },
      {
        id: "LAYER-2",
        title: "Sisältörajoitukset EIVÄT vähennä nuorten mielenterveyskriisiä",
        description: "Jos 2012-inflektio on LAITE (EMF) eikä SISÄLTÖ (sosiaalinen media), somen kieltäminen nuorilta älypuhelimen käytön salliessa ei vähennä masennus-/ahdistusasteita. Australian somekielto (2024) on suora testi.",
        falsification: "Australian somekielto tuottaa >20 % vähennyksen nuorten masennuksessa 3 vuodessa",
        critical: true,
      },
      {
        id: "LAYER-3",
        title: "Kehitysmaiden epidemiat seuraavat sähköistysaikataulua, eivät BKT:ta",
        description: "20+ kehitysmaalle: T2D/obesiteetin alkamisvuosi korreloi vahvemmin sähköistyspäivämäärän (vuosi jolloin sähkön saatavuus ylitti 50 %) kuin BKT:n minkään kynnyksen ylityksen kanssa.",
        falsification: "BKT:n ylitys korreloi vahvemmin kuin sähköistyspäivämäärä 20+ maassa",
      },
      {
        id: "LAYER-4",
        title: "Ammattikuljettajat sähköautoilla osoittavat IF-spesifisiä terveysvaikutuksia vuoteen 2035 mennessä",
        description: "Taksi-/jakelukuljettajat jotka käyttävät sähköautoja 8+ tuntia/päivä kumuloivat IF-altistusta (invertteri 5–50 kHz hytissä). Ennustetut vaikutukset: metaboliset, reproduktiiviset, kardiaaliset — korkeammalla asteella kuin polttomoottoriautojen kuljettajat samalla istumatyöajalla.",
        falsification: "Ei eroa sähköauto- ja polttomoottoriauton ammattikuljettajien välillä 10 vuoden jälkeen",
      },
      {
        id: "LAYER-5",
        title: "Starlink-kattavuus eliminoi viimeiset EMF-vapaat kontrollipopulaatiot vuoteen 2035",
        description: "Tsimane, hadza ja vertailupopulaatiot alkavat osoittaa RF-tausta-altistusta LEO-satelliittikonstellaatioista. Heidän terveysmetriikkansa alkavat konvergoida teollistuneita kaavoja kohti 10–15 vuodessa altistuksen alusta.",
        falsification: "Starlink-katetuissa alkuperäispopulaatioissa ei terveysmetriikkamuutoksia 15 vuodessa",
      },
      {
        id: "LAYER-6",
        title: "Seuraava suuri epidemia on IF-spesifinen",
        description: "LED-ajurit + sähköautojen invertterit + induktioliedet + langaton lataus toimivat kaikki 20–300 kHz:llä. Tämä on nopeimmin kasvava ja vähiten säännelty EMF-kaista. IF-spesifiset terveysvaikutukset tunnistetaan omaksi kategoriakseen vuoteen 2035 mennessä.",
        falsification: "Ei IF-spesifisiä terveysvaikutuksia tunnistettu IF-altistuksen kasvusta huolimatta vuoteen 2035",
      },
      {
        id: "LAYER-7",
        title: "COVID-lockdownin T2D-kiihdytys korreloi kotona-EMF-intensiteetin kanssa",
        description: "Etätyöntekijät (korkea koti-EMF: WiFi+LED 24h/pv, useita laitteita, ei työmatkapalautumista) osoittavat suurempaa T2D-kiihdytystä kuin työmatkailevat työntekijät (vaihtelevat EMF-ympäristöt ulkoilmapalautumisajalla).",
        falsification: "Etätyöntekijöillä sama tai matalampi T2D-kiihdytys kuin työmatkailevilla fyysisen aktiivisuuden kontrolloinnin jälkeen",
      },
    ],
    layerFalsification: "Kumoamisehto",
    layerLocked: "Lukittu: 2026-08-26",
    layerStatus: "LUKITTU — odottaa testiä",

    investigationTitle: "Johdoslinjojen ennusteet",
    investigationLead: "Ennusteet kuudesta uudesta johdoslinjasta: vuodenaikaherkkyys, genotyyppi, vesi, rakennusmateriaalit, palautumisikkuna ja prenataalinen altistus. Jokainen linja avaa uuden moduloivan muuttujan BERM-kehykseen.",
    investigationPredictions: [
      { id: "SEASON-1", title: "SAD korreloi leveysaste × EMF, ei pelkkä leveysaste", description: "SAD/masennusprevalenssi korreloi leveysaste × EMF-tiheys -interaktion kanssa, ei pelkän leveysasteen kanssa. Korkean leveysasteen, matalan EMF:n yhteisöt (amishit pohjoisessa USA:ssa, maaseutu-Skandinavia ennen sähköistystä) osoittavat matalampaa SAD:ia kuin pelkkä leveysaste ennustaa.", falsification: "Pelkkä leveysaste ennustaa SAD:ia yhtä hyvin kuin leveysaste × EMF -interaktiotermi" },
      { id: "SEASON-2", title: "EMF-vapaan makuuhuoneen hyöty suurempi talvella", description: "EMF-vapaassa ympäristössä nukkumisen terveyshyödyn tulisi olla mitattavasti SUUREMPI talvikuukausina korkeilla leveysasteilla, koska CRY-magnetoreseptorin herkkyys on korkeampi ympäristövalon vähentyessä.", falsification: "Ei vuodenaikavaihtelua EMF-vapaan unen hyödyssä, tai hyöty on suurempi kesällä" },
      { id: "GEN-1", title: "CACNA1C A-alleelitaajuus ennustaa populaation EMF-herkkyyttä", description: "Populaatiot, joilla on korkeampi CACNA1C rs1006737 A-alleelitaajuus, osoittavat jyrkempää terveyslaskua per EMF-altistusyksikkö. Tämä ennustaa populaatiotason vaihtelua EMF-herkkyydessä, joka on geneettistä, ei kulttuurista.", falsification: "Ei korrelaatiota A-alleelitaajuuden ja EMF-liitännäisten terveysmuutosten nopeuden välillä populaatioiden välillä" },
      { id: "GEN-2", title: "A/A-genotyyppi osoittaa voimakkaamman EMF-vasteen kuin G/G", description: "Kontrolloiduissa EMF-altistustutkimuksissa CACNA1C rs1006737 A/A -genotyypin yksilöt osoittavat suurempia fysiologisia vasteita (uni-EEG, HRV, kalsiummerkkiaineet) kuin G/G-genotyypin yksilöt. [[ref:sousouri2025|Sousouri 2025]] (ETH) jo tuki 5G-univasteessa.", falsification: "Ei genotyypistä riippuvaa eroa EMF-vasteessa useissa itsenäisissä kontrolloiduissa tutkimuksissa" },
      { id: "WATER-1", title: "Saari- ja rannikkoyhteisöt osoittavat korkeampaa EMF-herkkyyttä", description: "Veden dielektrisyysvakio (~80 vs ilma ~1) vahvistaa sähkökentän johtumista. Saarikansakunnat ja rannikkoyhteisöt voivat osoittaa korkeampia EMF-liitännäisiä terveysvaikutuksia per altistusyksikkö kuin sisämaan populaatiot.", falsification: "Ei rannikko/sisämaa-eroa EMF-liitännäisissä terveysmittareissa muiden muuttujien kontrolloinnin jälkeen" },
      { id: "BUILD-1", title: "Puutalot tuottavat parempia terveystuloksia kuin betoni", description: "Teräsbetoni heijastaa RF:ää sisäisesti, lisäten sisäistä kenttävoimakkuutta. Puu on RF-läpäisevä. Puutalojen asukkaiden tulisi osoittaa parempaa unta, matalampia stressimerkkiaineita ja parempia kardiovaskulaarisia mittareita kuin betonitalon asukkaiden.", falsification: "Ei eroa sosioekonomisten tekijöiden kontrolloinnin jälkeen, tai betoni ylittää puun" },
      { id: "RECOV-1", title: "EMF-vapaa makuuhuone nostaa melatoniinia 2 viikossa", description: "Kaikkien EMF-lähteiden poistaminen makuuhuoneesta (WiFi-reititin, puhelin, LED-valot) ja EMF-vähennetyssä ympäristössä nukkuminen tuottaa mitattavan melatoniininousun 2 viikossa ilman muita elämäntapamuutoksia.", falsification: "Ei melatoniinimuutosta 4 viikon EMF-vapaan uniympäristön jälkeen" },
      { id: "RECOV-2", title: "Minimipalautumisikkuna: 4–6 tuntia EMF-vapaata", description: "CaMKII:n defosforylaatiokinetiikka ennustaa 4–6 tunnin EMF-vapaan minimiajan merkittävälle Ca²⁺-homeostaasiin palautumiselle. Alle 4 tuntia tuottaa merkityksettömän palautumisen; yli 6 tuntia osoittaa vähenevää tuottoa.", falsification: "Ei annos-vastetta EMF-vapaiden tuntien ja palautumismerkkiaineiden välillä" },
      { id: "PRENATAL-1", title: "Ensimmäisen trimesterin EMF-altistus korreloi ASD-riskin kanssa", description: "CACNA1C on kriittinen synaptogeneesissä. Prenataalinen Ca²⁺-häiriö kehitysikkunoiden aikana → ajoitusvirheet → ASD/ADHD-fenotyyppi. Kaiser Permanente (Li et al. 2017) jo osoitti prenataalinen EMF → ASD-riski. Ensimmäisen trimesterin tulisi osoittaa voimakkain vaikutus.", falsification: "Ei trimesterispesifistä eroa EMF-ASD-assosiaatiossa" },
      { id: "MULTI-SEAS", title: "Talvi × korkea EMF tuottaa pahimmat terveystulokset", description: "Talven (korkea CRY-herkkyys) ja korkean EMF-altistuksen interaktion tulisi tuottaa pahimmat terveystulokset — pahemmat kuin kumpikaan tekijä yksin. Pohjoismaiden tulisi talvella osoittaa huippu-EMF-herkkyyttä.", falsification: "Ei interaktiovaikutusta vuodenajan ja EMF-tason välillä terveysvaikutuksissa" },
    ],
    investigationFalsification: "Kumoamisehto",
    investigationLocked: "Lukittu: 2026-08-26",
    investigationStatus: "LUKITTU — odottaa testiä",

    sentinelPredTitle: "Sentinel-lajienniusteet",
    sentinelPredLead: "Ennusteet sentinel-lajien kerrostuma-analyysistä. Eläimet, joilla on korkeampi EMF-herkkyys (sammakot > mehiläiset > hyönteiset > linnut > nisäkkäät), vähenevät teknologiakerrosten kerrostumista vastaavassa järjestyksessä.",
    sentinelPredPredictions: [
      { id: "SENT-1", title: "EMF × pestisidi -interaktio on superadditiivinen", description: "Yhdistetty EMF + pestiside -altistus tuottaa vakavampia vaikutuksia kuin kumpikaan yksin. Interaktio on superadditiivinen koska pestisidit stressaavat soluja → Ca²⁺-dysregulaatio → EMF-herkkyys kasvaa. [[ref:lupi2021|Lupi 2021]] jo osoitti tämän mehiläisten biokemiallisissa ja käyttäytymismerkkiaineissa.", falsification: "Yhdistelmävaikutukset ovat pelkästään additiivisia tai subadditiivisia useissa lajeissa" },
      { id: "SENT-2", title: "Kimalaisten lasku korreloi WiFi-tiheyden kanssa", description: "Kimalaispopulaatioiden laskun tulisi korreloida paikallisen WiFi-tukiasematiheyden kanssa, riippumatta pestisidien käytöstä ja elinympäristön menetyksestä. [[ref:bumble_rf2025|Uusi 2025 tutkimus]] jo osoitti RF:n vähentävän kimalaisten kukkavierailuja.", falsification: "Ei korrelaatiota WiFi-tiheyden ja kimalaispopulaatioiden välillä pestisidien kontrolloinnin jälkeen" },
      { id: "SENT-3", title: "LED-katuvalot aiheuttavat enemmän hyönteislaskua kuin natrium (IF-komponentti)", description: "[[ref:boyes2021|Boyes 2021]] havaitsi LED-katuvalot vähensivät hyönteismäärää 52 % vs natriumin 41 %. 11 %:n eroa ei selitä pelkkä valospektri — LEDin IF-emissio (SMPS-ohjaimista, 20–300 kHz) lisää EMF-altistuskanavan jota natriumilla ei ole.", falsification: "Faraday-suojattu LED osoittaa saman hyönteislaskun kuin suojaamaton LED (sulkien pois IF-komponentin)" },
      { id: "SENT-4", title: "Muuttolinnut vähenevät nopeammin kuin paikalliset lajit", description: "Muuttolinnut riippuvat CRY-pohjaisesta magnetoreseptiosta navigointiin. RF häiritsee CRY:tä. Siksi muuttolajien tulisi osoittaa jyrkempää populaatiolaskua kuin paikallisten lajien samassa elinympäristössä, riippumatta elinympäristön menetyksestä.", falsification: "Paikalliset lajit vähenevät yhtä nopeasti tai nopeammin kuin muuttolajit jaetuissa elinympäristöissä" },
      { id: "SENT-5", title: "Faraday-suojatut mehiläispesät tuottavat enemmän hunajaa", description: "Mehiläisyhdyskunnat Faraday-suojatuissa pesissä (estäen ympäröivän RF/ELF:n) tuottavat mitattavasti enemmän hunajaa, osoittavat matalampia yhdyskuntamenetyksiä ja parempaa navigaatiota kuin suojaamattomat pesät samassa sijainnissa.", falsification: "Ei eroa hunajantuotannossa tai yhdyskunnan selviytymisessä suojattujen ja suojaamattomien pesien välillä" },
      { id: "SENT-6", title: "Sammakoiden populaatiot säilyvät EMF-vapailla alueilla", description: "Sammakoiden populaatioiden tulisi säilyä alueilla joilla on minimaalinen sähköverkkoinfrastruktuuri ja matala RF-tausta, kun taas vähentyä sähköistetyillä alueilla — jopa elinympäristön laadun, vesisaasteiden ja UV-altistuksen kontrolloinnin jälkeen.", falsification: "Sammakoiden lasku on yhtä vakava matalan ja korkean EMF:n alueilla elinympäristön kontrolloinnin jälkeen" },
    ],
    sentinelPredFalsification: "Kumoamisehto",
    sentinelPredLocked: "Lukittu: 2026-08-26",
    sentinelPredStatus: "LUKITTU — odottaa testiä",

    supplementTitle: "Täydentävät ennusteet",
    supplementLead: "Ennusteet kuudesta täydentävästä analyysialueesta: vuorotyö, sisä-/ulkotyön ammattigradientti, puhelimen taskusiirtymä, verkkotaajuusmaantiede ja replikaatiomoderaattorianalyysi.",
    supplementPredictions: [
      { id: "SHIFT-1", title: "Faraday-makuuhuone parantaa vuorotyöntekijöiden terveyttä", description: "Vuorotyöntekijät jotka nukkuvat Faraday-suojatussa makuuhuoneessa (EMF-vapaa) osoittavat parempaa melatoniinipalautumista ja vähemmän metabolista syndroomaa kuin tavanomaisessa makuuhuoneessa nukkuvat — samalla kokonaisuniajalla. Ero eristää EMF-komponentin unenpuutekomponentista.", falsification: "Ei eroa metabolisissa tai hormonaalisissa tuloksissa suojatun ja suojaamattoman makuuhuoneen välillä" },
      { id: "SHIFT-2", title: "Vuorotyön terveysvaikutukset pahempia talvella", description: "Vuorotyön terveysvaikutusten (metabolinen syndrooma, masennus, kardiovaskulaarinen riski) tulisi olla mitattavasti pahempia talvikuukausina korkeilla leveysasteilla, koska CRY-magnetoreseptorin herkkyys on korkeampi vähentyneessä valossa.", falsification: "Ei vuodenaikavaihtelua vuorotyön terveysvaikutuksissa" },
      { id: "SHIFT-3", title: "Vuorotyön MetS OR ylittää unenpuutteen OR:n", description: "Vuorotyöntekijöiden metabolisen syndrooman vedonlyöntisuhde (OR 2,17) ylittää sen mitä pelkkä unenpuute selittäisi. Ylimääräinen riski johtuu EMF-komponentista: LED IF -altistus melatoniinihuipun aikana ja eliminoitu palautumisikkuna.", falsification: "Unenpuute yksin selittää täysin vuorotyön MetS-riskin" },
      { id: "INDOOR-1", title: "Sisätyöntekijöillä korkeampi MetS kuin ulkotyöntekijöillä aktiivisuusvakioinnin jälkeen", description: "Sisätyöntekijöillä (toimisto, datakeskus) on korkeampi metabolisen syndrooman esiintyvyys kuin ulkotyöntekijöillä (maanviljelijät, kalastajat) myös fyysisen aktiivisuustason sovittamisen jälkeen.", falsification: "Ei MetS-eroa fyysisesti aktiivisten sisä- ja ulkotyöntekijöiden välillä" },
      { id: "INDOOR-2", title: "Sisätyöntekijöillä matalampi melatoniini kuin ulkotyöntekijöillä valovakioinnin jälkeen", description: "Sisätyöntekijöillä on matalammat yölliset melatoninitasot kuin ulkotyöntekijöillä myös valoaltistuksen kontrolloinnin jälkeen. Jäännösero heijastaa EMF-altistusta toimiston WiFi:stä, LED-valaistuksen IF:stä ja laitteiden läheisyydestä.", falsification: "Ei melatoniinieroa valoaltistuksen kontrolloinnin jälkeen" },
      { id: "POCKET-1", title: "Rintataskun käyttäjillä parempi siittiölaatu kuin lonkkatasku", description: "Miehillä jotka kantavat puhelintaan rintataskussa on parempi siittiölaatu kuin lonkka-/etutaskuun kantavilla — samasta kokonaiskäyttöajasta huolimatta. Ero selittyy sillä, että kivekset ovat lähikentässä vain lonkkatasku-käyttäjillä.", falsification: "Ei eroa siittiölaadussa taskupaikan mukaan samalla käyttöajalla" },
      { id: "POCKET-2", title: "Siittiölaskun kiihtyminen korreloi datakäytön kanssa, ei puhelujen", description: "Siittiölaskun kaksinkertaistuminen (1,16→2,64 %/v vuoden 2000 jälkeen) korreloi 3G/4G-datakäytön yleistymisen (puhelin pysyy taskussa jatkuvasti) kanssa, ei 2G-puhelujen yleistymisen (puhelin korvalla puhelun ajan) kanssa.", falsification: "Siittiölaskun nopeus korreloi puheluvolyymin eikä datakäytön kanssa" },
      { id: "FREQ-1", title: "50 Hz -maissa hieman vahvempia CRY-riippuvaisia vaikutuksia kuin 60 Hz -maissa", description: "50 Hz (Eurooppa) on 2 Hz:n sisällä Schumann-resonanssin 8. harmonisesta (52,0 Hz), mikä saattaa tuottaa vahvempaa CRY-häiriötä. Eurooppalaiset populaatiot saattavat osoittaa hieman vahvempia CRY-riippuvaisia kaskadivaikutuksia kuin amerikkalaiset sovitetuilla EMF-tasoilla.", falsification: "Ei eroa CRY-riippuvaisissa päätepisteissä 50 Hz:n ja 60 Hz:n maiden välillä sovitetulla EMF:llä" },
      { id: "REPL-1", title: "Retrospektiivinen moderaattorianalyysi ennustaa positiiviset vs. nollatulokset", description: "Retrospektiivinen analyysi 50–100 julkaistusta EMF-biotestitutkimuksesta, koodaten tutkimuksen kuukausi, laboratorion leveysaste, rakennusmateriaali ja koehenkilöiden tausta, osoittaa näiden neljän moderaattorin ennustavan merkitsevästi löytääkö tutkimus positiivisen vai nollatuloksen. Testattavissa ILMAN uutta dataa.", falsification: "Moderaattorimuuttujat eivät ennusta tutkimustuloksia logistisessa regressiossa (p > 0,05)" },
      { id: "REPL-2", title: "Kaikki 7 moderaattoria kontrolloiva tulevaisuuden tutkimus replikoituu johdonmukaisesti laboratoriosta riippumatta", description: "Talvi + CACNA1C-genotyypitetty + matala laboratorio-ELF + EMF-vapaa uni + krooninen + pulsaatio + todellinen laite = positiivinen tulos JOKAISESSA laboratoriossa.", falsification: "Täysin kontrolloitu tutkimus ei silti replikoidu" },
      { id: "REPL-3", title: "CACNA1C AA-genotyypin yksilöt osoittavat mitattavaa melatoniinisuppressiota kodin WiFistä talvella 60°N leveysasteella", description: "Spesifein yksittäinen ennuste joka yhdistää 3 moderaattoria: genotyyppi + vuodenaika + altistus.", falsification: "Ei melatoniinieroa AA:n ja GG:n välillä talvisessa WiFi-altistuksessa" },
      { id: "REPL-4", title: "9 tunnin EMF-vapaa uni tuottaa mitattavan DNA-korjauksen vs. 0 tuntia (WiFi päällä, puhelin sängyssä)", description: "Ivancsits osoitti 9h palautumisen. EMF-vapaassa ympäristössä nukkuvilla on matalampi komet-häntätekijä kuin WiFi-altistuneilla.", falsification: "Ei eroa DNA-vauriomarkkereissa EMF-vapaan ja WiFi-altistuneen unen välillä" },
    ],
    supplementFalsification: "Kumoamisehto",
    supplementLocked: "Lukittu: 2026-08-26",
    supplementStatus: "LUKITTU — odottaa testiä",

    geneticTitle: "Geneettiset herkkyysennusteet",
    geneticLead: "Ennusteet 15 geenin kalsiumherkkyysprofiilin perusteella. Nämä testaavat hypoteesia, että EMF-herkkyys on polygeenisesti määräytyvä ja että geeni × EMF -interaktiot ovat superadditiivisia.",
    geneticPredictions: [
      { id: "GENE-MTNR1B-1", title: "MTNR1B GG -kantajilla suurempi T2D-riskin kasvu per EMF-yksikkö kuin AA:lla", description: "rs10830963 G-alleeli → enemmän MT2-reseptoreita → β-solut yliherkät melatoniinimuutoksille. EMF:n aiheuttama melatoniinisuppressio vaikuttaa eri tavalla GG-kantajiin. Geeni × EMF -interaktio on SUPERADDITIIVINEN.", falsification: "Ei genotyyppi × EMF -interaktiota T2D-ilmaantuvuuteen biopankkianalyysissä" },
      { id: "GENE-CRY1-1", title: "CRY1Δ11-kantajilla huonommat unitulokset kotona EMF:n alla kuin ei-kantajilla", description: "CRY1Δ11 (rs184039278, 0,6 %) pidentää sirkadiaanista jaksoa. EMF häiritsee CRY:tä → vaikutukset ADDITIIVISIA: geneettinen pidennys + EMF-häiriö = pidempi unilatenssi, lyhyempi palautumisikkuna.", falsification: "Ei eroa uni- tai metabolisissa tuloksissa CRY1Δ11-kantajien ja ei-kantajien välillä sovitetulla EMF-altistuksella" },
      { id: "GENE-COMT-1", title: "COMT Val/Val -yksilöillä suurempi EMF-assosioitu masennusriski kuin Met/Met:llä", description: "Val/Val = nopea dopamiinipuhdistuma = matala DA-perusviiva. EMF:n aiheuttama DA-synteesilasku iskee ankarammin (pienempi puskuri). Met/Met kestää pidempään.", falsification: "Ei COMT-genotyyppi × EMF -interaktiota masennuksen esiintyvyyteen" },
      { id: "GENE-CACNA1D-1", title: "CACNA1D GoF -kantajilla korkeampi tinnitusaste Bluetooth-kuulokkeiden käytössä", description: "Cav1.3 GoF → sisäkorvan yliherkkyys. Bluetooth-kuulokkeet aktivoivat Cav1.3:a karvasoluissa → Ca²⁺-ylikuorma. GoF-kantajat saavuttavat vauriokynnyksen matalammalla altistuksella.", falsification: "Ei yhteyttä CACNA1D-genotyypin ja tinnituksen välillä Bluetooth-käyttäjillä" },
      { id: "GENE-COMORBID-1", title: "Masennus-T2D-komorbiditeetti korkeampi CACNA1C AA + MTNR1B GG -yhdistelmäkantajilla", description: "Molemmat tilat syntyvät samasta melatoniinisuppressiopolusta eri elimissä (aivot vs. haima). Yhdistelmäkantajilla korkein komorbiditeetti.", falsification: "Masennus-T2D-komorbiditeetti ei stratifioidu CACNA1C × MTNR1B -genotyypin mukaan" },
      { id: "GENE-INTERACT-1", title: "CRY1Δ11 + MTNR1B GG -yhdistelmäkantajilla erityisesti kohonnut aamupaastoglukoosi", description: "CRY1Δ11 viivästyttää melatoniini-offsetia → aamumelatoniini koholla. MTNR1B GG → β-solut yliherkät tälle kohoamiselle → insuliinisuppressio erityisesti aamuisin.", falsification: "Ei CRY1 × MTNR1B -interaktiota aamupaastoglukoosiin" },
      { id: "GENE-EHS-1", title: "EHS-potilailla enemmän CACNA GoF + vähemmän SLC8A1/ATP2B-toimintaa kuin kontrolleilla", description: "EHS on polygeeninen kalsiumkynnöshäiriö: korkea influksi + hidas eritys = Ca²⁺ kasaantuu → CaMKII-kynnys ylittyy matalalla EMF:llä. 15 geenin genotyypitys osoittaa rikastumisen.", falsification: "Ei kalsiumkanavageenien rikastumista EHS-kohorteissa kontrolleihin verrattuna" },
      { id: "GENE-PRS-1", title: "15 geenin polygeeninen riskipistemäärä ennustaa EMF-herkkyyttä kontrolloiduissa altistustutkimuksissa", description: "Yhdistämällä kaikki 15 Ca²⁺-kaskadin geeniä yhdeksi PRS:ksi voidaan ennustaa biologisen vasteen suuruus standardoidussa EMF-altistuksessa.", falsification: "PRS ei korreloi mitatun EMF-vasteen kanssa kontrolloidussa altistuksessa" },
      { id: "GXEMF-1", title: "Geeni × EMF -interaktiot ovat superadditiivisia populaatioiden välillä", description: "Geneettinen riski (MTNR1B GG T2D-riski ~1,5×) × EMF-riski (~1,3×) tuottaa havaitun riskin ~2,5× (> 1,5 × 1,3 = 1,95×). EMF 'aktivoi' geneettisiä riskejä jotka olisivat piilevät EMF-vapaissa ympäristöissä.", falsification: "Geeni × EMF -interaktio on puhtaasti multiplikatiivinen (ei superadditiivisuutta)" },
      { id: "GXEMF-2", title: "Gabapentinoidien käyttäjillä alentunut EMF-herkkyys α2δ-1-eston kautta", description: "Pregabaliini/gabapentiini sitoutuvat α2δ-1:een → estävät VGCC-kuljetuksen synapseihin → matalampi VGCC-tiheys → alentunut ELF-priming-vaikutus.", falsification: "Ei eroa EMF-vasteessa gabapentinoidien käyttäjien ja ei-käyttäjien välillä" },
      { id: "GXEMF-3", title: "CaMKII Thr286 -autofosforylaatiotaso lymfosyyteissä korreloi subjektiivisen EMF-herkkyyden kanssa", description: "CaMKII-autofosforylaatio Thr286:ssa on mitattavissa perifeerisistä lymfosyyteistä. Korkeampi perusviiva = lähempänä kynnystä = herkempi EMF:lle. EHS:n ensimmäinen mahdollinen OBJEKTIIVINEN biomarkkeri.", falsification: "Ei korrelaatiota lymfosyyttien CaMKII-autofosforylaation ja raportoidun EMF-herkkyyden välillä" },
      { id: "GENE-A2D-1", title: "α2δ-1-ekspressiotaso ennustaa yksilöllisen ELF-primaamin suuruuden", description: "CACNA2D1 koodaa α2δ-1:tä, VGCC-kuljetuksen pullonkaulaa. Korkeampi perus-α2δ-1-ekspressio → nopeampi VGCC-tiheyden kasvu ELF-altistuksessa.", falsification: "Ei korrelaatiota α2δ-1-ekspression ja VGCC-tiheyden muutoksen välillä ELF:ssä" },
      { id: "GENE-A2D-2", title: "Pregabaliini-esikäsittely estää ELF:n aiheuttaman VGCC-ylössäätelyn soluviljelmässä", description: "Jos α2δ-1 välittää ELF-primaamin ([[ref:sun2016_elf_vgcc|PMC4757866]]), pregabaliini (joka sitoutuu α2δ-1:een) estää VGCC-tiheyden kasvun 8–10 päivän 50/60 Hz -altistuksessa.", falsification: "Pregabaliini ei estä ELF:n aiheuttamaa VGCC-ylössäätelyä" },
      { id: "GENE-CAMK2-1", title: "CAMK2A GoF -mutaation fenotyyppi vastaa BERM:n populaatiotason ennustetta", description: "CAMK2A GoF-mutaatiot jotka lisäävät Thr286-autofosforylaatiota tuottavat epilepsian, kehitysvamman ja autismin ([[ref:kury2017_camk2|Küry 2017]]). BERM ennustaa EMF:n lisäävän populaatiotason autofosforylaatiota → samat fenotyypit. Mekanismin geneettinen validaatio.", falsification: "CAMK2A GoF -fenotyypit eivät vastaa EMF:n ennustamia populaatioterveyden trendejä" },
      { id: "GENE-CAMK2-2", title: "Lymfosyyttien CaMKII-autofosforylaatio korkeampi korkean EMF:n kaupunkiasukkailla kuin maaseudun kontrolleilla", description: "Kaupunkiasukkailla (korkeampi kumulatiivinen EMF) tulisi olla korkeampi CaMKII Thr286 -autofosforylaation perusviiva perifeerisissa lymfosyyteissä kuin maaseudun kontrolleilla iän, ruokavalion ja aktiivisuuden sovittamisen jälkeen.", falsification: "Ei kaupunki-maaseutu-eroa lymfosyyttien CaMKII-autofosforylaatiossa" },
      { id: "GENE-NETWORK-1", title: "Usean geenin kalsiumkanavapolymorfismi-interaktio ennustaa kehitysneurologisia tuloksia", description: "[[ref:korean2025_cacna|Korean 2025 -tutkimus]] osoitti CACNA1A + CACNA1C + CACNA1H -polymorfismien interaktion lasten DD/epilepsiassa. BERM ennustaa tämän ulottuvan kaikkiin 5 influksigeeniin: usean CACNA-riskialleelin yhdistelmäkantajilla suhteettomasti korkeampi riski.", falsification: "Ei monigeenistä interaktiovaikutusta yksittäisten geenivaikutusten ylitse" },
    ],
    geneticFalsification: "Kumoamisehto",
    geneticLocked: "Lukittu: 2026-08-26",
    geneticStatus: "LUKITTU — odottaa testiä",
    plantCryTitle: "Ekosysteemi- ja kasvi-CRY-ennusteet",
    plantCryLead: "Ennusteet jotka perustuvat universaaliin CRY/RPM-mekanismiin joka operoi troofisten tasojen läpi. Nämä testaavat reagoivatko masting-synkronia, kasvien lisääntyminen ja ekosysteemidynamiikka sähkömagneettisiin kenttäparametreihin kryptokromin kautta.",
    plantCryPredictions: [
      {
        id: "MAST-SOLAR-1",
        metric: "Masting-frekvenssi vs auringonpilkkuluku (SSN)",
        prediction: "Super-mast-vuodet (useat lajit mastaten samanaikaisesti) korreloivat aurinkominimivaiheen kanssa jolloin luonnollinen RF on matalimmillaan. Testattavissa MASTREE-tietokannalla + SSN-tiedoilla.",
        status: "pending",
        locked: "2026-08-31",
      },
      {
        id: "MAST-RF-1",
        metric: "Masting-synkronia vs antropogeeninen RF-tausta",
        prediction: "Masting-synkronia on heikompaa metsissä lähellä tukiasemia / kaupunkialueita kuin syrjäisissä matalan RF:n metsissä. Jo osittain raportoitu (Bogdziewicz 2021) mutta selitetty ilmastonmuutoksella. BERM:n vaihtoehto: RF häiritsee CRY2:ta.",
        status: "pending",
        locked: "2026-08-31",
      },
      {
        id: "PLANT-CRY-RF-1",
        metric: "CRY2-knockout-kasvit vs villityyppi RF-altistuksessa",
        prediction: "CRY2-knockout Arabidopsis ei näytä kukinta-ajan muutosta RF:ssä; villityyppi näyttää. Ahmad 2020 osoitti CRY1-efektin; CRY2:n kukintavaikutusta RF:ssä ei ole testattu knockouteilla. Diskriminoiva testi.",
        status: "pending",
        locked: "2026-08-31",
      },
      {
        id: "MAST-SOIL-B2-1",
        metric: "Masting-synkronia vs maaperän mikrobiston B2-tuotanto",
        prediction: "Korkeampi masting-synkronia B2-rikkaassa maaperässä. Maaperän mikrobisto tuottaa riboflaviinia (B2) joka täydentää kasvien endogeenistä FAD:ia. Köyhtynyt maaperä → vähemmän mikrobi-B2:ta → CRY2 epästabiilimpi → heikompi synkronia. Spekulatiivinen (L*) — kasvit syntetisoivat B2:ta myös itse.",
        status: "pending",
        locked: "2026-08-31",
      },
    ],
    plantCryStatus: "LUKITTU — odottaa testiä",
    plantCryLocked: "Lukittu: 2026-08-31",
    criticalLabel: "Kriittinen",
    pharmEvidenceLink: "Farmakologinen evidenssi →",
    infantEvidenceLink: "Imeväisen haavoittuvuus -evidenssi →",
    neuroEvidenceLink: "Neurologisen spektrin evidenssi →",
    // Inline UI strings (former ternaries)
    dashPredictions: "Ennustetta",
    dashCategories: "Kategoriaa",
    dashVerified: "Vahvistettua",
    dashAwaiting: "Odottaa testiä",
    dashPredictionStatus: "Ennusteiden tila",
    statusBarAria: "Tilapalkki: 4 vahvistettua, 254 odottaa, 2 CI ylitetty",
    statusVerified: "Vahvistettu",
    statusAwaiting: "Odottaa testiä",
    statusCiExceeded: "CI ylitetty",
    tfrExplanation: "Harmaa viiva on Maailmanpankin julkaistu TFR-sarja. Sininen alue on lukittu herkkyysalue, ei luottamusväli. Kun ennustevuoden havainto julkaistaan, se piirtyy timanttina: vihreä alueen sisällä, punainen sen ulkopuolella.",
    finland2030Label: "Suomi 2030 — TFR",
    ciExceededBadge: "ylittynyt",
    southKorea2030Label: "Etelä-Korea 2030 — TFR",
    ciRiskZone: "riskialue",
    speciesAria: "Lajien herkkyys kehon massan mukaan",
    sensitivityLabel: "Herkkyys",
    insects: "Hyönteiset",
    smallBirds: "Pienet linnut",
    amphibiansLabel: "Sammakkoeläimet",
    smallMammals: "Pienet nisäkkäät",
    largeMammals: "Suuret nisäkkäät",
    humansLabel: "Ihmiset",
    predMatrixAria: "Ennustematriisi",
    animalLabel: "Eläin",
    humanLabel: "Ihminen",
    populationLabel: "Populaatio",
    reproductiveLabel: "Lisääntyminen",
    neuralLabel: "Hermosto",
    metabolicLabel: "Aineenvaihdunta",
    immuneLabel: "Immuuni",
    circadianLabel: "Vuorokausirytmi",
    cascadePathAria: "Kaskadipolku",
    nutritionalShort: "Ravitsemus",
    metabolicShort: "Metabolia",
    pharmacologicalShort: "Farmakologia",
    cascadePathSubtitle: "Yhden ennusteen vahvistaminen tukee seuraavaa",
    evidenceCascadePath: "Näyttöketjun polku",
    evidenceCascadeDesc: "Ravitsemuksellinen, metabolinen ja farmakologinen tutkimuslinja rakentuvat peräkkäin. Yhden kategorian vahvistaminen tukee seuraavan näyttöpohjaa.",
    evidenceCascadeAria: "Näyttöketjun kaskadi: Ravitsemus, Metabolia, Farmakologia",
    nutritionalFull: "Ravitsemuksellinen",
    metabolicFull: "Metabolinen",
    pharmacologicalFull: "Farmakologinen",
    cascadeConfirmation: "Vahvistaminen vasemmalla tukee oikealla olevia ennusteita",
    sentinelHierarchyTitle: "Sentinellilajien herkkyyshierarkia",
    sentinelHierarchyDesc: "EMF-herkkyys skaalautuu kehonmassan mukaan: M^(-0.25). Pienet lajit ovat alttiimpia.",
    sentinelHierarchyAria: "Sentinellilajien herkkyyshierarkia",
    sensitivityTop: "Herkkyys (korkein ylhäällä)",
    emfSensitivity: "EMF-herkkyys",
    nextLabel: "Seuraavaksi",
    sourcesTitle: "Lähteet",
  },
  ja: {
    title: "ロック済み予測",
    subtitle: "これらの予測はBERM v17スカラー曝露アーキテクチャの下でロックされました。反証可能：各予測は記載された年に観測データと比較されます。",
    tfrTitle: "TFR予測",
    tfrLead: "国別および世界全体の合計特殊出生率の予測。パラメータ感度エンベロープ（信頼区間ではない）付き。",
    bioTitle: "バイオマーカー予測",
    bioLead: "同一モデルアーキテクチャから導出された精子濃度と出生性比の予測。",
    v2Title: "BERM v17予測ステータス",
    v2Status: "国レベルのFieldState校正予測は公開されていません。現在のルートには、一致するローカルFieldState、登録された臓器・カップルエンドポイント、ASFRモデリング、外部時間的検証が必要です。",
    v2Note: "FieldState校正予測が準備できた場合、比較のためにこれらのスカラープロキシ予測と並行して公開されます。",
    histTitle: "歴史的・進化的予測",
    histLead: "ネストされたχモデルとNorthern Package仮説から導出された予測。集団特異的な生物学的χプロファイルがEMF-出生率関係を調節するかをテストします。",
    r43Title: "R43：プロトコル・エンベロープ共鳴",
    r43Text: "[[ref:zandieh2025|Zandieh et al. (2025)]]はELFがん細胞実験（0.01-5 Hz; 最大100 mT）で周波数依存性のミトコンドリア/ROS観察を報告。ネットワーク層エンベロープ変調が細胞応答を生じるかをテストする探索的measured-PSDプロトコルを支持。RFネットワークエンベロープ効果、eDRX因果性、生殖/TFRパラメータは確立されていない。",
    country: "国",
    year: "年",
    metric: "指標",
    prediction: "予測",
    sensitivity: "感度",
    version: "バージョン",
    locked: "ロック日",
    statusLabel: "ステータス",
    history: "バージョン履歴",
    sentinelTitle: "センチネルカスケード予測",
    sentinelLead: "CSLI 31カ国ミツバチ-TFRパネルから導出されたクロスス種ラグ予測。センチネル種の減少がロックされたラグでヒトの出生率低下に先行するかをテストします。",
    architectureNote: "アーキテクチャノート",
    architectureText: "これらの予測はスカラー累積曝露アーキテクチャ（v17）を使用。モバイル普及率は技術採用タイミングのプロキシとして機能。感度エンベロープはパラメータを1つずつ変動させたもので、確率的信頼区間ではありません。",
    ciExceededTitle: "三分岐反証分析",
    finlandFalsification: "ステータス：CI超過（観測値〜1.30、上限1.24）。BERMフレームワーク内で3つの説明が可能：(a) モデルがフィンランドの生物学的効果を過大評価 ― 指数関数的EMF-TFR関係が予想より早く飽和。(b) 外因性補償：移民TFRの寄与が推定より大きい ― フィンランドの移民TFR（〜1.8-2.2）が国家TFRを押し上げ。(c) CIが狭すぎる：モデルの不確実性範囲が小集団TFRの確率的変動を過小評価。判別テスト：フィンランド統計局からネイティブ生まれTFR（入手可能な場合）を予測と比較。ネイティブTFR≤1.24なら説明(b)が確認され、モデルは反証されない。",
    southKoreaFalsification: "ステータス：CIリスクゾーン（観測値〜0.80、上限0.72）。3つの説明が可能：(a) モデルが韓国のEMF抑制を過大評価 ― 文化的・政策的要因がTFRに独立した負の影響を持ちEMFを部分的に相殺。(b) 測定ラグ：韓国の出産奨励政策（現金給付、住宅補助）がTFRを一時的に生物学的軌道より押し上げ。(c) モデルの韓国回復推定が楽観的すぎる。判別テスト：韓国のTFRが予測値に向かって低下し続けるか、現在の水準で安定するかを追跡。",
    modulomeTitle: "モジュロム予測",
    modulomeLead: "8層EMFモジュロムと治療デバイスエビデンスから導出された機構的予測。定性的で反証可能 ― 各予測は具体的な実験結果を指定。",
    modulomeTimeline: "タイムライン",
    modulomeFalsification: "反証基準",
    modulomeLocked: "ロック日：2026-08-21",
    modulomeStatus: "ロック済み ― テスト待ち",
    cascadeTitle: "疾患カスケード予測",
    cascadeLead: "4チャネル慢性疾患カスケードモデルから導出された予測。7疾患カスケードがモジュロムの生物学的潜時階層とチャネル特異的曝露パターンに従うかをテスト。",
    cascadeValidation: "検証方法",
    cascadeFalsification: "反証基準",
    cascadeLocked: "ロック日：2026-08-22",
    cascadeStatus: "ロック済み ― テスト待ち",
    cascadeLink: "カスケード可視化を見る",
    nutritionalTitle: "栄養CRY調節予測",
    nutritionalLead: "CRYデュアルシステムモデルとその栄養調節因子（FAD/B2、オメガ脂肪酸、AMPKファスティングダイナミクス）から導出された予測。経路Cの有効性が栄養介入により修正可能かをテスト。",
    nutritionalTimeline: "タイムライン",
    nutritionalFalsification: "反証基準",
    nutritionalLocked: "ロック日：2026-08-24",
    nutritionalStatus: "ロック済み ― テスト待ち",
    metabTitle: "メタボリックシンドローム予測",
    metabLead: "6経路EMF→メタボリックシンドロームモデルから導出。CaMKII収束は肥満、糖尿病、エネルギー代謝障害が共通の上流原因を共有し、シールディング、薬理学、疫学でテスト可能と予測。肥満は多因子性 ― これらの予測はEMFが寄与因子かをテスト。",
    metabTimeline: "タイムライン",
    metabFalsification: "反証基準",
    metabLocked: "ロック日：2026-08-25",
    metabStatus: "ロック済み ― テスト待ち",
    trpc1Title: "薬理学的経路分離予測",
    trpc1Lead: "経路A（VGCC）と経路CのTRPC1カルシウム分岐の独立性をテストする予測。CRY2-TRPC1複合体（[[ref:yap2025|Yap et al. 2025]]）はEMF生殖効果がVGCC依存性およびTRPC1依存性成分に薬理学的に分解可能と予測。",
    trpc1Timeline: "タイムライン",
    trpc1Falsification: "反証基準",
    trpc1Locked: "ロック日：2026-08-24",
    trpc1Status: "ロック済み ― テスト待ち",
    pharmTitle: "薬理学的予測",
    pharmLead: "薬理学的収束論証から導出された予測。VGCC活性化が主要なEMFトランスダクションメカニズムであれば、特定の薬物クラスがEMF関連エンドポイントに測定可能な差を生じるはず。既存の処方データベースを活用 ― 新たな薬物曝露は不要。",
    pharmTimeline: "タイムライン",
    pharmFalsification: "反証基準",
    pharmLocked: "ロック日：2026-08-26",
    pharmStatus: "ロック済み ― テスト待ち",
    modIntTitle: "モジュロム統合予測",
    modIntLead: "モジュロム統合から導出 ― 下垂体ハブ、ミトコンドリアROS増幅、レドックス緩衝、自律神経HRV、胎盤バリア、甲状腺-EMF相互作用。新たに同定されたEMF標的組織とメカニズムが予測される下流効果を生じるかをテスト。",
    modIntTimeline: "タイムライン",
    modIntFalsification: "反証基準",
    modIntType: "タイプ",
    modIntDiscriminating: "判別的",
    modIntLocked: "ロック日：2026-08-24",
    modIntStatus: "ロック済み ― テスト待ち",
    sidsTitle: "乳児脆弱性・SIDS予測",
    sidsLead: "BERMのカルシウムフレームワークを乳児心肺脆弱性に適用した予測。イオンチャネル遺伝学、夜間EMF曝露、概日Ca²⁺ダイナミクスが成人集団で同定された経路を通じてSIDSリスクに寄与するかをテスト。",
    sidsNote: "これらの予測はデリケートなトピックを扱います。BERMはメカニズム仮説を提供しますが、証明された説明ではありません。既知の保護措置（仰臥位、喫煙回避、母乳育児）が最も重要な介入です。",
    sidsTimeline: "タイムライン",
    sidsFalsification: "反証基準",
    sidsLocked: "ロック日：2026-08-26",
    sidsStatus: "ロック済み ― テスト待ち",
    sidsResTitle: "SIDS共鳴モデル予測",
    sidsResLead: "Q因子共鳴モデルから導出：新生児脳は非減衰発振器（GABAがNKCC1>KCC2で興奮性）、SIDSは神経発達への影響スペクトルの致死的エンドポイント。",
    sidsResNote: "これらの予測はデリケートなトピックを扱います。BERMはメカニズム仮説を提供しますが、証明された説明ではありません。既知の保護措置（仰臥位、喫煙回避、母乳育児）が最も重要な介入です。",
    sidsResTimeline: "タイムライン",
    sidsResFalsification: "反証基準",
    sidsResLocked: "ロック日：2026-08-26",
    sidsResStatus: "ロック済み ― テスト待ち",
    neuroTitle: "神経学的スペクトラム予測",
    neuroLead: "Q因子スペクトラムモデルから導出。SIDS、てんかん、SUDEP、片頭痛、群発頭痛をCa²⁺依存性振動メカニズム（減衰の程度が異なる）で統合。",
    neuroTimeline: "タイムライン",
    neuroFalsification: "反証基準",
    neuroLocked: "ロック日：2026-08-26",
    neuroStatus: "ロック済み ― テスト待ち",
    metalTitle: "重金属相乗効果・収束予測",
    metalLead: "収束検証プロセスから導出。重金属×EMF相乗効果、松果体石灰化、光子→集団チェーン、介入研究を含む。",
    metalTimeline: "タイムライン",
    metalFalsification: "反証基準",
    metalLocked: "ロック日：2026-08-26",
    metalStatus: "ロック済み ― テスト待ち",
    mechTitle: "メカニズムチェーン予測",
    mechLead: "新たに検証された中間層からの予測：血液脳関門、褐色脂肪組織、HPA軸、β細胞インスリン動態、視床下部ネクサス、コルチゾール-海馬、ライディッヒ細胞、肥満細胞脱顆粒。",
    mechTimeline: "タイムライン",
    mechFalsification: "反証基準",
    mechLocked: "ロック日：2026-08-26",
    mechStatus: "ロック済み ― テスト待ち",
    suppTitle: "補足層予測（VK17-25）",
    suppLead: "新たに検証された層からの予測：精子Ca²⁺/CatSper、概日時計、ドーパミン動機、OPC髄鞘化、NK細胞免疫、HPA-HPG交差抑制、BDNFホルメシス、腸脳軸、Walker睡眠-テストステロンリンク。",
    suppTimeline: "タイムライン",
    suppFalsification: "反証基準",
    suppLocked: "ロック日：2026-08-26",
    suppStatus: "ロック済み ― テスト待ち",
    finalTitle: "最終層予測（VK26-31）",
    finalLead: "最終収束層からの予測：甲状腺Dio2/Dio3、エピジェネティック世代間遺伝、テロメア老化スパイラル、オキシトシンCa²⁺撹乱、ELFプライミング慢性疼痛、ASDはBERMプロトタイプ。",
    finalTimeline: "タイムライン",
    finalFalsification: "反証基準",
    finalLocked: "ロック日：2026-08-26",
    finalStatus: "ロック済み ― テスト待ち",
    extTitle: "拡張層予測（VK41-50）",
    extLead: "拡張収束層からの予測：ADHDは第2プロトタイプ、ALSカルシウム脆弱性、腸脳セロトニン、アレルギー流行、ビタミンDは天然チャネルブロッカー、PEMFホルメシスパラドックス、生殖アーク完成。",
    extTimeline: "タイムライン",
    extFalsification: "反証基準",
    extLocked: "ロック日：2026-08-26",
    extStatus: "ロック済み ― テスト待ち",
    ultTitle: "最終統合予測（VK51-56）",
    ultLead: "最終収束統合からの予測：CatSper温度ゲーティング、サイロシビンCa²⁺リセット、カフェイン-パーキンソン用量反応、リチウム水神経保護、扁桃体-不安フィードバックループ、アーミッシュ対照群検証。",
    ultTimeline: "タイムライン",
    ultFalsification: "反証基準",
    ultLocked: "ロック日：2026-08-26",
    ultStatus: "ロック済み ― テスト待ち",
    ttypeTitle: "T型チャネル予測",
    ttypeLead: "T型カルシウムチャネル分岐メカニズムからのテスト可能な予測。",
    ttypeTimeline: "タイムライン",
    ttypeFalsification: "反証基準",
    ttypeLocked: "ロック日：2026-08-24",
    ttypeStatus: "ロック済み ― テスト待ち",
    repTitle: "再現性危機解決予測",
    repLead: "5つの交絡因子フレームワークから導出されたテスト可能な予測。",
    repTimeline: "タイムライン",
    repFalsification: "反証基準",
    repLocked: "ロック日：2026-08-24",
    repStatus: "ロック済み ― テスト待ち",
    diffTitle: "神経発達・分化予測",
    diffLead: "BERMフレームワークから導出された神経発達・分化経路に関する予測。既知の内分泌撹乱化学物質（EDC）研究と並行。",
    diffNote: "これらの予測はL*レベル ― BERMフレームワークから導出されているが直接テストされていない。既知のEDC研究と並行。",
    diffLevel: "レベル",
    diffDiscriminating: "判別的",
    diffCritical: "重要判別項目",
    diffLocked: "ロック日：2026-08-24",
    diffStatus: "ロック済み ― テスト待ち",
    diffVerifiedStatus: "検証済み",
    vgccTitle: "VGCC遺伝子ファミリー予測",
    vgccLead: "6遺伝子VGCCファミリー分析から導出された予測。各予測は特定のカルシウムチャネルサブタイプとその関連疾患メカニズムを対象。",
    vgccNote: "エビデンスレベルは予測により異なる：E（実験的支持）、M|C（メカニズム/相関）、L*（導出/理論的）。",
    vgccLevel: "レベル",
    vgccDiscriminating: "判別的",
    vgccLocked: "ロック日：2026-08-24",
    vgccStatus: "ロック済み ― テスト待ち",
    vgccVerifiedStatus: "検証済み",
    tTfrTitle: "テストステロン→TFR閾値予測",
    tTfrLead: "テストステロン閾値モデルからの国レベル予測。各予測に反証基準を付してロック。モデルはフィンランドと韓国のデータで校正。米国とイスラエルの予測は外挿。",
    tTfrNote: "これらの予測は、累積テストステロン低下（年間〜1%、年齢非依存）が発症から約35年後に生物学的出生率制約を生じるという中核主張をテスト。",
    tTfrLocked: "ロック日：2026-08-25",
    tTfrStatus: "ロック済み ― テスト待ち",
    tTfrDiscriminating: "判別的",
    tTfrCritical: "重要",
    causalTitle: "因果構造予測",
    causalLead: "BMI媒介因果分析とHPGリセットエビデンスから導出された予測。BERMが提案する特定の因果経路をテスト。",
    causalNote: "これらの予測はモデルの因果構造をテスト ― その大きさではない。形式的媒介分析と国際的内分泌データにより反証可能。",
    causalLocked: "ロック日：2026-08-25",
    causalStatus: "ロック済み ― テスト待ち",
    popTitle: "集団比較予測",
    popLead: "9つの低EMF集団と現代集団の系統的比較から導出。観察された健康勾配がBERMが予測するEMF曝露を追跡するかをテスト。",
    popLevel: "レベル",
    popDiscriminating: "判別的",
    popCritical: "重要判別項目",
    popLocked: "ロック日：2026-08-24",
    popStatus: "ロック済み ― テスト待ち",
    tPredTitle: "テストステロン予測",
    tPredLead: "二段階モデルからの予測：テストステロンの長期的低下がTFRの時間的予測因子として。",
    tPredPredictions: [
      { id: "T-1", title: "早期/急激な電化の国はT低下の開始が早い", description: "各国のテストステロン長期的低下開始時期の比較。調和された縦断的Tデータが5か国以上必要。", falsification: "5か国以上でT低下開始と電化時期に相関なし" },
      { id: "T-2", title: "LH+TパターンがすべてのEMF高暴露集団で視床下部性", description: "Santi 2025診断はEMF高暴露集団でT↓+LH↓を予測。3つ以上の独立した縦断コホートで検証。", falsification: "T低下中にLHが安定または上昇している集団が3つ中2つ以上" },
      { id: "T-3", title: "犬の精子低下率がヒトのT低下率と一致（ともに~1%/年）", description: "犬はヒトと家庭のEMF曝露を共有する。[[ref:lea2016|Lea et al. 2016]]は英国種犬で26年間にわたり−1.0%/年の精子低下を記録 — ヒトのテストステロン長期的低下と同率。テスト：3か国以上で犬の精子低下開始時期と現地の電化歴を比較。", falsification: "類似のEMF環境を持つ国間で犬の精子低下率が>0.5%/年変動" },
      { id: "T-4", title: "CatSper機能が精液サンプルで累積EMF曝露に比例して低下", description: "CatSper依存性の受精能獲得とプロゲステロン誘導性超活性化は、累積EMF曝露の増加とともに測定可能な低下を示すはず。既存のIVFクリニック精液サンプルとEMF曝露アンケートで検証可能。", falsification: "自己報告のポケット曝露とCatSper依存機能パラメータに200サンプル以上で相関なし" },
      { id: "T-5", title: "CatSperブロッカーNNC55-0396がCa²⁺シフト一致でRF曝露と同じ精子表現型を生成", description: "EMFが主にCatSperを介して精子に作用するなら、薬理学的CatSper阻害はRF曝露精子の完全な表現型を再現するはず。[[ref:pmc6104424_nnc|Rennhack et al. 2018]]は部分的な表現模写を既に示した。", falsification: "RF曝露がCatSper阻害で再現できない精子欠陥を生じる" },
    ],
    tPredLocked: "ロック日：2026-08-31",
    tPredStatus: "ロック済み ― テスト待ち",
    societalTitle: "社会的予測",
    societalLead: "デュアルロック理論から導出：集団全体のテストステロン低下とコルチゾール上昇の組み合わせが乗法的行動抑制を生じる。社会的行動トレンドがBERMがEMF曝露から予測するホルモン変動を追跡するかをテスト。",
    societalTimeline: "タイムライン",
    societalFalsification: "反証基準",
    societalLocked: "ロック日：2026-08-25",
    societalStatus: "ロック済み ― テスト待ち",
    techTitle: "技術特異的予測",
    techLead: "ELFプライミング仮説、超加法性モデル、技術特異的曝露分析から導出。多周波相互作用が非加法的生物学的効果を生じるか、特定の技術移行が観察された健康変曲点を引き起こしたかをテスト。",
    techTimeline: "タイムライン",
    techFalsification: "反証基準",
    techLocked: "ロック日：2026-08-26",
    techStatus: "ロック済み ― テスト待ち",
    layerTitle: "層状曝露モデル予測",
    layerLead: "層状曝露モデルから導出 ― CaMKII閾値統合を通じて超加法的に積み重なる5つの技術層。層モデルの歴史的検証が前向き予測に拡張されるかをテスト。",
    layerFalsification: "反証基準",
    layerLocked: "ロック日：2026-08-26",
    layerStatus: "ロック済み ― テスト待ち",
    investigationTitle: "調査ライン予測",
    investigationLead: "6つの新しい調査ラインからの予測：季節感受性、遺伝子型、水、建材、回復ウィンドウ、出生前曝露。各ラインはBERMフレームワークに新しい調節変数を開く。",
    investigationFalsification: "反証基準",
    investigationLocked: "ロック日：2026-08-26",
    investigationStatus: "ロック済み ― テスト待ち",
    sentinelPredTitle: "センチネル種予測",
    sentinelPredLead: "センチネル種層分析からの予測。EMF感受性の高い動物（カエル>ミツバチ>昆虫>鳥類>哺乳類）は技術層の積み重ねに対応する順序で減少するはずであり、ランダムな環境要因ではない。",
    sentinelPredFalsification: "反証基準",
    sentinelPredLocked: "ロック日：2026-08-26",
    sentinelPredStatus: "ロック済み ― テスト待ち",
    supplementTitle: "補足予測",
    supplementLead: "6つの補足分析ラインからの予測：シフトワーク、屋内/屋外職業勾配、ポケット内携帯電話の移行、電力周波数地理、再現性モデレーター分析。",
    supplementFalsification: "反証基準",
    supplementLocked: "ロック日：2026-08-26",
    supplementStatus: "ロック済み ― テスト待ち",
    geneticTitle: "遺伝的感受性予測",
    geneticLead: "15遺伝子カルシウム感受性プロファイルからの予測。EMF感受性がポリジェニックに決定され、遺伝子×EMF相互作用が超加法的であるという仮説をテスト。",
    geneticFalsification: "反証基準",
    geneticLocked: "ロック日：2026-08-26",
    geneticStatus: "ロック済み ― テスト待ち",
    plantCryTitle: "生態系・植物CRY予測",
    plantCryLead: "栄養段階を横断する普遍的CRY/RPMメカニズムから導出された予測。マスティング同期性、植物の生殖、生態系動態がクリプトクロムを通じて電磁場パラメータに応答するかを検証する。",
    plantCryPredictions: [
      {
        id: "MAST-SOLAR-1",
        metric: "マスティング頻度 vs 太陽黒点数（SSN）",
        prediction: "スーパーマスト年（複数種が同時にマスティング）は自然RFが最低の太陽極小期と相関する。MASTREEデータベース＋SSN記録で検証可能。",
        status: "pending",
        locked: "2026-08-31",
      },
      {
        id: "MAST-RF-1",
        metric: "マスティング同期性 vs 人為的RFバックグラウンド",
        prediction: "基地局/都市部付近の森林ではマスティング同期性が弱い。すでに部分的に報告（Bogdziewicz 2021）だが気候変動で説明。BERMの代替：RFがCRY2を妨害。",
        status: "pending",
        locked: "2026-08-31",
      },
      {
        id: "PLANT-CRY-RF-1",
        metric: "CRY2ノックアウト植物 vs 野生型のRF曝露下",
        prediction: "CRY2ノックアウトシロイヌナズナはRF下で開花時期の変化なし；野生型は変化あり。Ahmad 2020はCRY1効果を示した；CRY2の開花効果はノックアウトで未検証。識別試験。",
        status: "pending",
        locked: "2026-08-31",
      },
      {
        id: "MAST-SOIL-B2-1",
        metric: "マスティング同期性 vs 土壌微生物叢B2産生",
        prediction: "B2豊富な土壌でマスティング同期性が高い。土壌微生物叢はリボフラビン（B2）を産生し植物の内因性FADを補充。枯渇土壌→微生物B2低下→CRY2不安定→同期性弱化。推測的（L*）。",
        status: "pending",
        locked: "2026-08-31",
      },
    ],
    plantCryStatus: "ロック済み ― テスト待ち",
    plantCryLocked: "ロック日：2026-08-31",
    criticalLabel: "重要",
    pharmEvidenceLink: "薬理学的エビデンス →",
    infantEvidenceLink: "乳児脆弱性エビデンス →",
    neuroEvidenceLink: "神経学的スペクトラムエビデンス →",

    // Inline UI strings (former ternaries)
    dashPredictions: "予測",
    dashCategories: "カテゴリー",
    dashVerified: "検証済み",
    dashAwaiting: "テスト待ち",
    dashPredictionStatus: "予測ステータス",
    statusBarAria: "ステータスバー：検証済み4件、保留254件、CI超過2件",
    statusVerified: "検証済み",
    statusAwaiting: "テスト待ち",
    statusCiExceeded: "CI超過",
    tfrExplanation: "灰色の線は世界銀行が公開しているTFRデータです。青いウェッジはロック済み感度エンベロープであり、信頼区間ではありません。予測年の観測値が公開されると、ダイヤモンドとして表示されます：緑はエンベロープ内、赤は外。",
    finland2030Label: "フィンランド 2030 — TFR",
    ciExceededBadge: "超過",
    southKorea2030Label: "韓国 2030 — TFR",
    ciRiskZone: "リスクゾーン",
    speciesAria: "体重別の種感受性",
    sensitivityLabel: "感受性",
    insects: "昆虫",
    smallBirds: "小型鳥類",
    amphibiansLabel: "両生類",
    smallMammals: "小型哺乳類",
    largeMammals: "大型哺乳類",
    humansLabel: "ヒト",
    predMatrixAria: "予測マトリックス",
    animalLabel: "動物",
    humanLabel: "ヒト",
    populationLabel: "集団",
    reproductiveLabel: "生殖",
    neuralLabel: "神経",
    metabolicLabel: "代謝",
    immuneLabel: "免疫",
    circadianLabel: "概日リズム",
    cascadePathAria: "カスケード経路",
    nutritionalShort: "栄養",
    metabolicShort: "代謝",
    pharmacologicalShort: "薬理学",
    cascadePathSubtitle: "1つの予測の確認が次の予測のエビデンスとなる",
    evidenceCascadePath: "エビデンスカスケード経路",
    evidenceCascadeDesc: "栄養、代謝、薬理学の予測ラインは順次構築される。あるカテゴリーの確認が次のエビデンス基盤となる。",
    evidenceCascadeAria: "エビデンスカスケード：栄養、代謝、薬理学",
    nutritionalFull: "栄養学的",
    metabolicFull: "代謝的",
    pharmacologicalFull: "薬理学的",
    cascadeConfirmation: "左側の確認が右側の予測を強化する",
    sentinelHierarchyTitle: "センチネル種の感受性階層",
    sentinelHierarchyDesc: "EMF感受性は体重に応じてスケーリング：M^(-0.25)。小型種はより感受性が高い。",
    sentinelHierarchyAria: "センチネル種の感受性階層",
    sensitivityTop: "感受性（最上部が最高）",
    emfSensitivity: "EMF感受性",
    nextLabel: "次へ",
    sourcesTitle: "参考文献",

    // Prediction arrays (technical content preserved from en)
    modulomePredictions: [
      {
        id: "M-1",
        title: "Faraday-shielded IVF laboratory",
        description: "An IVF laboratory with Faraday-cage EMF shielding will show significantly higher fertilization, blastocyst, and pregnancy rates compared to standard laboratories.",
        timeline: "Testable within 1–2 years",
        falsification: "No difference in any IVF outcome metric",
      },
      {
        id: "M-2",
        title: "Earbud users: lower vagal tone",
        description: "Long-term earbud users (>4h/day for >2 years) will show significantly lower heart rate variability (HRV) compared to matched non-users, indicating reduced vagal tone.",
        timeline: "Testable immediately (wearable HRV data)",
        falsification: "No HRV difference or higher HRV in earbud users",
      },
      {
        id: "M-3",
        title: "LED vs incandescent: sperm quality in rats",
        description: "Male rats raised under LED lighting will show significantly lower sperm motility and concentration compared to rats raised under incandescent lighting, in a four-arm design separating light spectrum from EMF emission.",
        timeline: "Testable in 3–6 months",
        falsification: "No difference, or EMF-shielded LED = unshielded LED",
      },
      {
        id: "LED-1",
        title: "EU LED ban and TFR acceleration",
        description: "EU countries (mandatory LED transition 2009–2012 via [[ref:eu_regulation_244_2009|Directive 244/2009]]) show faster TFR decline in 2015–2022 compared to countries with later or no incandescent ban, controlling for mobile density, GDP, and urbanization. Central estimate: TFR decline acceleration ≥0.02/year faster in EU vs non-EU controls.",
        timeline: "Testable immediately (existing demographic data)",
        falsification: "No acceleration difference, or non-EU countries show faster decline",
      },
      {
        id: "SLEEP-1",
        title: "Faraday-shielded LED sleep test",
        description: "A Faraday-shielded bedroom (< 0.001 V/m IF) with identical LED lighting produces better sleep quality than an unshielded bedroom, even when blue light spectrum is identical. This isolates the IF emission channel from the optical channel. If true: IF emissions (not blue light) are the primary sleep disruptor from LED lighting. If false: blue light or other factors dominate. Cost estimate: < EUR 5,000.",
        timeline: "Testable within 1–3 months (N=20 crossover)",
        falsification: "No sleep quality difference between shielded and unshielded conditions with identical light spectrum",
      },
      {
        id: "M-5",
        title: "LLLT improves spermatogenesis via CCO activation",
        description: "Low-level laser therapy (620–1100 nm) applied to testes in a controlled animal study will improve spermatogenesis markers (motility, concentration, morphology) via mitochondrial cytochrome c oxidase activation — the same chromophore mechanism as FDA-approved photobiomodulation devices. If LLLT (optical EM) improves fertility via CCO, and RF (lower EM) disrupts fertility via CRY, the chromophore generalization predicts that both optical and RF frequencies modulate reproductive biology through frequency-specific chromophore targets.",
        timeline: "Testable in 3–6 months (animal study)",
        falsification: "No improvement in any spermatogenesis marker, or improvement is thermal in nature",
      },
      {
        id: "NEURO-1",
        title: "CACNA1C carriers show stronger EMF-ASD association",
        description: "In a genotyped birth cohort with documented prenatal EMF exposure: stratify ASD/ADHD diagnosis rates by CACNA1C rs1006737 genotype AND maternal EMF exposure level. Prediction: significant GxE interaction where risk allele + high EMF produces synergistic elevation in ASD/ADHD rates beyond additive effects.",
        timeline: "Requires large genotyped cohort (thousands)",
        falsification: "No GxE interaction at CACNA1C locus",
      },
      {
        id: "NEURO-2",
        title: "Lithium attenuates EMF-induced neuronal oscillation disruption",
        description: "Expose hiPSC-derived neuronal cultures to EMF and measure network oscillation patterns (MEA). Then add lithium. Prediction: lithium restores oscillation regularity because it dampens Ca²⁺ oscillations via IMPA1/inositol pathway — the same mechanism that makes it effective in bipolar disorder.",
        timeline: "Testable in 3–6 months (in vitro)",
        falsification: "Lithium does not restore oscillation regularity after EMF exposure",
      },
      {
        id: "EPI-1",
        title: "EMF-exposed fathers: offspring sperm methylation changes",
        description: "Expose male mice to chronic RF-EMF. Mate with unexposed females. Analyze F1 male offspring sperm for DNA methylation patterns. Prediction: specific DMRs overlap with those in human radar study ([[ref:res-square-2025-radar-methylation|Research Square 2025]]). If DMRs include CACNA1C or other VGCC genes, this closes the epigenetic feedback loop.",
        timeline: "Testable in 6–12 months (animal study)",
        falsification: "No DMR overlap with radar study, or no VGCC-gene DMRs in F1",
      },
      {
        id: "EPI-2",
        title: "Non-monotonic methylation response to EMF",
        description: "Replicate the GC-2 study across a wider intensity range (0.1, 0.5, 1, 2, 3, 5 mT). Prediction: methylation changes show non-monotonic dose-response with at least one sign reversal, paralleling Blackman’s Ca²⁺ window. If confirmed, Lindgren’s window dynamics operate at the epigenetic level.",
        timeline: "Testable in 3–6 months (in vitro)",
        falsification: "Monotonic dose-response with no sign reversal",
      },
      {
        id: "SCHWAN-1",
        title: "GSM produces larger sperm effects than LTE at equivalent SAR",
        description: "Expose matched sperm samples to: (1) GSM-modulated 900 MHz (217 Hz TDMA), (2) LTE-modulated 900 MHz (OFDM), (3) CW 900 MHz, all at identical time-averaged SAR. Measure motility, ROS, DNA fragmentation. Prediction: GSM > LTE > CW because GSM’s hard pulse produces the strongest ELF membrane component. Directly tests Schwan + T-type bifurcation mechanism.",
        timeline: "Testable in 1–3 months (in vitro)",
        falsification: "No difference between modulation types at equal SAR, or CW > modulated",
      },
    ],
    cascadePredictions: [
      {
        id: "P11",
        title: "COVID IF-channel retrodiction",
        description: "During lockdown, IF-sensitive diseases (infertility → improvement) and RF-sensitive diseases (depression → worsening) behave in opposite directions. The COVID lockdown acts as a natural experiment: workplace IF exposure dropped ~70% (offices with LED lighting closed) while home RF exposure rose ~40% (more phone/Wi-Fi usage). This predicts channel-specific, opposite-sign health effects.",
        validation: "GBD 2024 + national health registers",
        falsification: "No differential direction between IF-sensitive and RF-sensitive diseases during lockdown",
      },
      {
        id: "P12",
        title: "LED rollout × sperm quality",
        description: "In countries where the EU LED transition happened earlier, sperm quality decline should accelerate earlier than in countries where it happened later. EU vs non-EU difference-in-differences design, controlling for mobile density, GDP, and urbanization.",
        validation: "[[ref:levine2023_sperm|Levine meta-analysis]] country-specific estimates + EU [[ref:eu_regulation_244_2009|Directive 244/2009]] implementation dates (2009–2016)",
        falsification: "No acceleration difference, or non-EU countries show faster decline",
      },
      {
        id: "P13",
        title: "Cascade order test",
        description: "Seven chronic diseases' acceleration points follow the modulome's biological latency hierarchy: sleep < depression < ADHD < metabolic < autoimmune < infertility < cancer. Each acceleration point should fall 0–10 years after mass adoption of its specific technology generation.",
        validation: "GBD 2024 acceleration point statistical analysis (structural breakpoint detection)",
        falsification: "Acceleration order does not match modulome hierarchy, or acceleration points are not temporally linked to technology rollouts",
      },
      {
        id: "P14",
        title: "EMF × psychedelic response interaction",
        description: "Patients with higher baseline EMF exposure (measured by personal RF dosimetry) will show stronger acute response to psilocybin-assisted therapy, because chronic EMF-driven Ca²⁺ dysregulation creates a larger homeostatic deficit for the psychedelic Ca²⁺ reset to correct. High-EMF patients should show greater pre/post MADRS delta.",
        validation: "Psilocybin clinical trial with RF dosimetry covariate",
        falsification: "No correlation between EMF exposure and treatment response magnitude, or inverse correlation",
      },
      {
        id: "P15",
        title: "CACNA1C genotype × psychedelic response",
        description: "Patients carrying CACNA1C risk variants (associated with bipolar disorder and schizophrenia in GWAS) will show altered psilocybin response, because the psychedelic signal chain terminates at Cav1.2 (CACNA1C). Specifically, rs1006737 A-allele carriers should show either enhanced or paradoxical response to psilocybin, distinct from wild-type responders.",
        validation: "Pharmacogenomic analysis of existing psilocybin trial data with CACNA1C genotyping",
        falsification: "No genotype-response association at CACNA1C locus",
      },
      {
        id: "P16",
        title: "Lithium protects against EMF mood effects",
        description: "Lithium users will show attenuated mood deterioration in response to EMF exposure compared to non-lithium controls, because Li⁺ directly occupies VGSC and normalizes Na⁺/Ca²⁺ balance that EMF perturbs. Ecological test: lithium-treated bipolar patients should show no seasonal RF-correlated mood variation, while unmedicated patients should.",
        validation: "Mood-tracking app data (e.g. Daylio) × personal RF dosimetry, stratified by lithium use",
        falsification: "Lithium users show equal or greater EMF-mood sensitivity compared to controls",
      },
      {
        id: "P17",
        title: "EMF exposure reduces transepithelial potential (TEP)",
        description: "Controlled EMF exposure will measurably reduce skin TEP (baseline 10–60 mV) via Na⁺/K⁺-ATPase disruption. EHS-reporting individuals will show a larger TEP drop than matched controls under the same exposure, because their ion channel sensitivity threshold is lower. Double-blind measurement with Ag/AgCl electrodes on forearm skin.",
        validation: "Double-blind TEP measurement before/during/after controlled RF exposure (1 V/m, 30 min), EHS vs. control cohort",
        falsification: "No TEP change under EMF, or EHS patients show equal or smaller change than controls",
      },
      {
        id: "P18",
        title: "EMF slows wound healing via electrotactic interference",
        description: "Standardized skin wounds (e.g. suction blister) will heal significantly slower in high-EMF environments compared to Faraday-shielded controls, because exogenous EMF superimposes noise on the endogenous wound electric field (100–200 mV/mm) that guides keratinocyte electrotaxis. Effect size should correlate with EMF field strength.",
        validation: "Suction blister wound healing RCT: Faraday-shielded vs. standard room, time to re-epithelialization",
        falsification: "No wound healing difference, or faster healing in high-EMF environment",
      },
      {
        id: "P19",
        title: "LED blue light retinal damage is IF-EMF mediated",
        description: "Retinal damage attributed to LED blue light is partially caused by IF-EMF (65 kHz – 2 MHz) from the LED switching power supply, not blue light alone. An incandescent lamp filtered to identical blue spectrum (no IF-EMF) will produce significantly less retinal oxidative stress than LED blue light at the same intensity and spectrum.",
        validation: "LED vs. incandescent (same blue spectrum) retinal cell viability assay; LED vs. incandescent + IF-EMF source",
        falsification: "Incandescent blue light produces equal retinal damage to LED blue light at matched spectrum and intensity",
      },
      {
        id: "P20",
        title: "IF-EMF alone causes retinal oxidative stress",
        description: "IF-EMF exposure (65 kHz – 2 MHz, levels matching LED driver output) without any light stimulus will produce measurable oxidative stress in retinal cells via Cav1.4 VGCC activation. This would confirm that the IF-EMF component of LED light is independently biologically active on retinal tissue.",
        validation: "Retinal cell culture exposed to IF-EMF only (no light): ROS measurement, Cav1.4 channel activity",
        falsification: "No retinal oxidative stress from IF-EMF alone, or no Cav1.4 involvement",
      },
      {
        id: "P21",
        title: "Night mode does not eliminate IF-EMF melatonin suppression",
        description: "Phone/tablet 'night mode' (warm color filter) removes blue light but not IF-EMF from the display backlight. Melatonin suppression measured with night mode ON will be significantly greater than in a no-screen control, because IF-EMF continues to suppress melatonin via CRY pathway independent of light spectrum. Mechanistic basis: [[ref:chae2019|Chae et al. (2019)]] demonstrated that human magnetoreception requires blue light (400–500 nm), identifying cryptochrome as the transducer. This implies two independent intervention points: (1) blue-light filtering removes CRY activation entirely (no radical pairs to disrupt), and (2) Faraday shielding removes RF disruption while preserving natural CRY function. BERM predicts Faraday shielding is more effective because it corrects the interference while leaving the natural system intact, whereas blue-light filtering removes the disruption by shutting down the entire CRY system.",
        validation: "Salivary melatonin: night-mode screen vs. no screen vs. incandescent reading light, evening exposure protocol",
        falsification: "Night mode restores melatonin to no-screen baseline levels",
      },
      {
        id: "P22",
        title: "Myopia correlates with IF-EMF, not blue light alone",
        description: "The childhood myopia epidemic correlates with cumulative IF-EMF exposure (screen time + LED lighting hours) more strongly than with blue light dose alone. The EU incandescent ban (2009) provides a natural experiment: countries with faster LED adoption should show steeper myopia acceleration, controlling for education hours and outdoor time.",
        validation: "Cross-country DID analysis: LED adoption rate × myopia prevalence, controlling for near-work hours and outdoor time",
        falsification: "Myopia rates correlate equally with blue light and IF-EMF, or LED adoption timing shows no association",
      },
      {
        id: "P23",
        title: "Hospital EMF levels correlate with post-hospital syndrome",
        description: "Hospitals with higher measured EMF levels (especially IF from LED lighting and RF from Wi-Fi density) will have higher post-hospital syndrome (PHS) incidence, controlling for patient acuity, length of stay, and standard care quality metrics. The correlation should be strongest in elderly patients (>75 years) who spend the most time bed-bound.",
        validation: "Multi-hospital EMF survey × 30-day readmission/complication rates, stratified by age and mobility",
        falsification: "No correlation between hospital EMF levels and PHS incidence after controlling for confounders",
      },
      {
        id: "P24",
        title: "Low-EMF patient rooms improve recovery",
        description: "Patients in Faraday-shielded or low-EMF rooms (reduced Wi-Fi, incandescent/DC lighting, minimal monitors) will show faster recovery, shorter stays, lower delirium incidence, and better sleep quality compared to standard rooms, controlling for patient acuity and treatment protocols.",
        validation: "RCT or quasi-experimental: low-EMF ward vs. standard ward, primary endpoints: LOS, delirium, sleep quality (actigraphy)",
        falsification: "No difference in any recovery metric, or worse outcomes in low-EMF rooms",
      },
      {
        id: "P25",
        title: "Home care advantage is partially EMF-mediated",
        description: "The observed advantage of home care over hospitalization for certain elderly patients is partially mediated by lower EMF exposure at home. Patients discharged to high-EMF home environments (multiple Wi-Fi networks, LED-heavy) will show outcomes closer to hospital patients than those in low-EMF homes.",
        validation: "Home EMF survey at discharge × 30-day outcomes, comparing high-EMF vs. low-EMF home environments",
        falsification: "Home EMF levels do not predict post-discharge outcomes after controlling for socioeconomic factors",
      },
      {
        id: "P29",
        title: "AD incidence correlates with cumulative lifetime EMF",
        description: "Alzheimer's disease incidence correlates with cumulative lifetime EMF exposure (urban > suburban > rural), after controlling for education, cardiovascular risk, and ApoE4 status. The mechanism chain: EMF → VGCC → Ca²⁺ ↑ → BACE1 → Aβ oligomers → positive feedback loop. The calcium hypothesis (LaFerla, O'Day) identifies Ca²⁺ dysregulation as the proximal cause; BERM provides the upstream environmental driver.",
        validation: "Longitudinal cohort with RF/IF dosimetry × AD diagnosis, controlling for ApoE4, education, CVD risk",
        falsification: "No dose-response between cumulative EMF and AD incidence after confounders controlled",
      },
      {
        id: "P30",
        title: "CACNA1C rs7304986 modulates AD risk",
        description: "CACNA1C rs7304986 T/C carriers (who show greater EMF sleep sensitivity per [[ref:sousouri2025|Sousouri 2025]]) will have higher AD risk than T/T homozygotes in high-EMF environments but equivalent risk in low-EMF environments. This is the same gene × environment interaction as for EHS: genetically heightened VGCC sensitivity amplifies environmental Ca²⁺ dysregulation.",
        validation: "GWAS × EMF exposure interaction analysis in existing AD biobank cohorts",
        falsification: "No CACNA1C × EMF interaction on AD risk, or T/C carriers show lower AD risk",
      },
      {
        id: "P31",
        title: "AD incidence accelerates 2025–2035 (30-year lag)",
        description: "AD incidence in the 60–70 age group will accelerate beyond demographic aging predictions during 2025–2035, reflecting a ~30-year lag from mass 2G/Wi-Fi adoption (1995–2005). CAUTION: this acceleration could result from other causes (diabetes epidemic, sedentary lifestyle, diagnostic changes). The prediction is confirmable only if EMF-specific biomarkers (Ca²⁺ levels, VGCC expression) co-correlate.",
        validation: "Age-specific AD incidence trends vs. demographic projection, supplemented by Ca²⁺/VGCC biomarker panel",
        falsification: "No above-demographic acceleration, or acceleration without Ca²⁺/VGCC biomarker correlation",
      },
      {
        id: "P32",
        title: "Low-EMF care homes slow AD progression",
        description: "AD patients in low-EMF care environments (Faraday-shielded or reduced Wi-Fi/LED) will show slower cognitive decline (MMSE/MoCA trajectory) than matched controls in standard care facilities. The Arendash paradox (controlled 918 MHz protects in mice) suggests dose/frequency/context matter — chaotic multi-frequency environmental EMF drives damage, while removal allows homeostatic recovery.",
        validation: "Quasi-experimental: low-EMF care unit vs. standard unit, MMSE trajectory over 12 months, controlling for medication and baseline severity",
        falsification: "No difference in cognitive decline rate, or faster decline in low-EMF environment",
      },
      {
        id: "P33",
        title: "CACNA1C genotype × prenatal EMF → ADHD risk",
        description: "CACNA1C rs7304986 T/C-carrying mothers' prenatal EMF exposure will produce higher ADHD risk in offspring than T/T carriers'. This is a gene × environment interaction: genetically heightened VGCC sensitivity amplifies the developmental ion channel calibration error from prenatal EMF. The same CACNA1C variant associates with ADHD, ASD, bipolar, and EMF sleep sensitivity ([[ref:sousouri2025|Sousouri 2025]]).",
        validation: "Kaiser-type cohort with prenatal MF dosimetry + maternal CACNA1C genotyping × offspring ADHD diagnosis",
        falsification: "No CACNA1C × prenatal EMF interaction on offspring ADHD risk",
      },
      {
        id: "P34",
        title: "Guanfacine protects against EMF-worsened ADHD",
        description: "If ADHD is an ion channel calibration error, guanfacine (HCN channel modulator) should protect against EMF's ADHD-symptom-worsening effect better than stimulants (which only compensate by raising signal). In controlled EMF exposure, guanfacine-treated ADHD patients should show less symptom worsening than methylphenidate-treated patients, because guanfacine corrects the threshold while stimulants raise the signal.",
        validation: "Guanfacine vs. methylphenidate during controlled EMF exposure → ADHD symptom change (CPT, Conners)",
        falsification: "Guanfacine shows equal or less protection than methylphenidate against EMF symptom worsening",
      },
      {
        id: "P35",
        title: "ADHD prevalence acceleration follows prenatal EMF with 3–10y lag",
        description: "ADHD prevalence acceleration follows prenatal EMF exposure growth with a 3–10 year lag (exposure → diagnosis age). 2G mass adoption 1991–95 → ADHD acceleration ~1995–2005. Smartphone mass adoption 2007–12 → ADHD acceleration ~2012–2020. 5G mass adoption 2019–24 → ADHD acceleration ~2025–2035 (prediction). CAUTION: ADHD diagnostic practices have changed significantly — prevalence data requires careful correction for diagnostic trends.",
        validation: "Age-specific ADHD incidence trends vs. prenatal EMF proxy (mobile penetration at birth year), controlling for diagnostic practice changes",
        falsification: "No temporal correlation between prenatal EMF proxy and ADHD incidence after diagnostic correction",
      },
      {
        id: "P36",
        title: "EMF exposure × bipolar cycle frequency",
        description: "Bipolar patients in higher-EMF environments should have more frequent mood cycles, because stronger ionic perturbation destabilizes the neural oscillator — amplitude increases and period shortens. Computational models ([[ref:pubmed32278494_bipolar_ionic|PubMed 32278494]]) show bipolar neurons oscillate between hyperexcitability and hypoexcitability due to ion conductance changes; EMF adds external perturbation to this unstable system.",
        validation: "EMF dosimetry + mood diary + cycle length in longitudinal bipolar cohort",
        falsification: "No correlation between environmental EMF and bipolar cycle frequency",
      },
      {
        id: "P37",
        title: "Lithium + EMF shielding synergy in bipolar",
        description: "Lithium-treated bipolar patients will benefit from EMF shielding (Faraday) because Li⁺ dampens the oscillation AND EMF removal eliminates the perturbation — combined effect exceeds either alone. Li⁺ traverses VGSC and accumulates in hyperactive neurons; removing the EMF perturbation source reduces the oscillation that lithium must dampen.",
        validation: "Li⁺ + Faraday-shielded bedroom vs. Li⁺ alone → cycle frequency and amplitude over 6 months",
        falsification: "No additional benefit from EMF shielding beyond lithium alone",
      },
      {
        id: "P38",
        title: "IVF success rates lower in high-EMF clinics",
        description: "IVF laboratories with higher ambient EMF will have lower fertilization rates, blastocyst development, and clinical pregnancy rates. Melatonin in follicular fluid is a critical oocyte protectant ([[ref:tamura2012_follicular_melatonin|Tamura 2012]]); EMF suppresses endogenous melatonin ([[ref:battelle1980_emf_melatonin|Battelle 1980]], circadian pathway), reducing follicular antioxidant defense during the most vulnerable phase. [[ref:tong2017_melatonin_ivf|Tong 2017]] meta-analysis already shows melatonin supplementation improves IVF outcomes — the prediction is that EMF environment is a confound in existing IVF data.",
        validation: "EMF dosimetry of IVF labs (incubator + patient treatment rooms) vs. clinic-level outcomes, controlling for patient demographics",
        falsification: "No correlation between clinic EMF levels and IVF outcomes after standard confound adjustment",
      },
      {
        id: "P39",
        title: "Melatonin supplement × EMF interaction in IVF",
        description: "Melatonin supplementation benefit in IVF will be LARGER for patients in high-EMF environments, because high EMF creates a deeper melatonin deficit that supplementation partially corrects. In low-EMF environments, endogenous melatonin is already near-optimal, so exogenous supplementation adds less. This predicts an interaction term (melatonin × EMF) in IVF outcome regression, not just a melatonin main effect.",
        validation: "IVF RCT with melatonin supplementation, stratified by patient residential/occupational EMF exposure (wearable dosimetry)",
        falsification: "Melatonin benefit is uniform across EMF exposure levels (no interaction)",
      },
      {
        id: "P40",
        title: "Shift workers: lower fertility AND greater melatonin supplement benefit",
        description: "Shift workers have suppressed nocturnal melatonin (circadian disruption + workplace lighting + occupational EMF), predicting lower natural fertility AND a larger absolute benefit from melatonin supplementation compared to day workers. The melatonin bridge connects cascade 1 (sleep/circadian) to cascade 6 (fertility) — shift work is the strongest natural experiment for this connection because it disrupts melatonin through multiple converging pathways simultaneously.",
        validation: "Fertility outcomes (time-to-pregnancy, IVF success) in shift vs. day workers, with and without melatonin supplementation",
        falsification: "Shift workers show equal melatonin supplement benefit as day workers, or shift work fertility deficit not mediated by melatonin levels",
      },
      {
        id: "IF-1",
        title: "LED driver 20–100 kHz disrupts normal cell mitosis",
        description: "LED driver switching frequencies (20–100 kHz) overlap the normal-cell mitotic disruption range identified by TTFields research (Neuhaus et al., Nature 2020: normal cells most affected at ~50 kHz, vs. cancer cells at 150–200 kHz). Prediction: in vitro exposure of normal dividing cells (e.g. spermatogonia, intestinal crypt cells) to 20–100 kHz pulsed fields at LED-driver-representative intensities will produce measurable increases in aneuploidy, mitotic spindle misalignment, or reduced proliferation rate. The Kaiser Permanente series (Li 2002–2020) provides epidemiological support: EMDEX-measured MF exposure associates with miscarriage, sperm quality decline, and childhood conditions across 6 cohorts.",
        validation: "In vitro: normal cell lines exposed to 20–100 kHz pulsed waveform (LED-driver-representative) vs. sham → aneuploidy rate, spindle orientation, proliferation",
        falsification: "No effect on normal cell mitosis at LED-driver-representative frequencies and intensities, or effect only at TTFields-level intensities (>100 V/m)",
      },
    ],
    nutritionalPredictions: [
      {
        id: "NUT-1",
        title: "B2 supplementation improves circadian resilience to nighttime EMF",
        description: "RCT: B2 supplementation (25mg/day x 8 weeks) vs placebo in subjects with poor sleep quality and high nighttime phone use. Primary endpoint: melatonin onset latency. Secondary: sleep efficiency, cortisol awakening response. B2 group should show less circadian disruption because FAD-replete CRY is more stable against EMF perturbation. Mechanistic basis: [[ref:hirano2017|Hirano 2017]] (FAD -> CRY stability), [[ref:yap2025|Yap 2025]] (FAD -> magnetic sensitivity).",
        timeline: "Testable within 3-6 months (RCT, N=60)",
        falsification: "No difference in melatonin onset latency or sleep metrics between B2 and placebo groups",
      },
      {
        id: "NUT-2",
        title: "B2 deficiency x EMF interaction in 54-country regression",
        description: "Add population-level B2 adequacy as a control variable to the 54-country EMF-TFR regression model. Prediction: the interaction term (EMF x B2_deficiency) is significant and negative — countries with BOTH high EMF AND high B2 deficiency show steeper TFR decline than countries with high EMF alone. China (>90% B2 deficiency, highest EMF, lowest TFR) vs. Finland (~15% B2 deficiency, high EMF, higher TFR) is the key contrast. CAUTION: This is ecological evidence — correlation, not causation.",
        timeline: "Testable immediately (existing data + B2 surveys from ~30 countries)",
        falsification: "No significant EMF x B2 interaction term, or interaction is positive",
      },
      {
        id: "NUT-3",
        title: "Fasting duration predicts magnetoreceptive sensitivity (inverted U)",
        description: "Replicate [[ref:chae2019|Chae 2019]] food orientation paradigm with graded fasting durations (4h, 8h, 12h, 16h, 24h). Prediction: inverted U-shaped dose-response — sensitivity peaks at 12-16h (optimal CRY turnover with adequate FAD) and declines at 24h+ (FAD pool depletion begins). Additional arm: B2-supplemented (25mg pre-fast) vs. unsupplemented subjects. B2 supplementation should right-shift the peak (allowing longer fasting before decline). The fasting paradox resolution ([[ref:lamia2009|Lamia 2009]] AMPK-CRY + beta-oxidation FAD) predicts this specific shape.",
        timeline: "Testable within 2-4 months (behavioral, N=40 per duration)",
        falsification: "Monotonic increase (no decline at 24h), or no fasting effect, or B2 does not shift the peak",
      },
    ],
    metabPredictions: [
      {
        id: "METAB-1",
        title: "Faraday-shielded laboratory animals weigh less than unshielded controls",
        description: "Identical diet, identical genetics, identical temperature — only difference is EMF environment. Predicted: shielded animals weigh 5-15% less after 6 months. Based on [[ref:klimentidis2010|Klimentidis paradox]] (24 populations, 8 species ALL gaining weight, p = 1.2×10⁻⁷) and BAT thermogenesis mechanism ([[ref:maalouf2023|Maalouf 2023]], [[ref:5g_bat2025|5G BAT 2025]]). This is the single most discriminating test for the EMF-metabolic hypothesis.",
        timeline: "1-3 years (experimental, requires shielded facility)",
        falsification: "No weight difference after 12 months under identical conditions",
        critical: true,
      },
      {
        id: "METAB-2",
        title: "CaMKII inhibition attenuates EMF-induced weight gain in rodents",
        description: "KN-93 or AIP (CaMKII inhibitors) administered to EMF-exposed rodents should reduce weight gain, BAT dysfunction, and insulin resistance compared to EMF-exposed untreated controls. CaMKII is the convergence molecule connecting EMF sensitivity (Cav3.2 threshold shift), BAT thermogenesis (UCP1 transcription), testosterone (StAR expression), and insulin secretion (β-cell Ca²⁺ dynamics). If CaMKII convergence is real, its inhibition should attenuate multiple metabolic endpoints simultaneously.",
        timeline: "1-2 years (experimental, rodent model)",
        falsification: "CaMKII inhibition has no effect on EMF-induced metabolic changes",
      },
      {
        id: "METAB-3",
        title: "Semaglutide efficacy correlates with ambient EMF level",
        description: "If EMF disrupts the L-type VGCC → Ca²⁺ → ERK pathway that GLP-1/semaglutide amplifies ([[ref:bhatt2012_glp1|Bhatt 2012, PMC3556522]]), then semaglutide should be MORE effective in high-EMF populations (more pathway disruption to correct) but show diminishing returns as EMF increases beyond a threshold (overwhelms correction capacity). This is a SPECULATIVE prediction — mechanistically derived but no clinical data yet. Evidence level: L*.",
        timeline: "3-5 years (clinical data mining from existing RCTs)",
        falsification: "No correlation between EMF environment and semaglutide efficacy",
      },
      {
        id: "METAB-4",
        title: "Obesity prevalence in low-EMF communities remains <10% through 2035",
        description: "Old Order Amish, Tsimane, Hadza, and comparable low-EMF communities will maintain obesity rates below 10% regardless of dietary modernization, as long as EMF exposure remains low. The Tsimane currently show <5% obesity; Kitava ~0%. If EMF is a contributing factor, these populations should remain lean even as processed food access increases — provided their EMF environment doesn't change.",
        timeline: "9 years (longitudinal observation)",
        falsification: "Low-EMF community obesity rises above 15% without significant EMF adoption",
      },
    ],
    trpc1Predictions: [
      {
        id: "TRPC1-1",
        title: "CRY2-TRPC1 calcium entry contributes to EMF reproductive effects independently of VGCCs",
        description: "Expose reproductive cells (e.g. granulosa cells, Sertoli cells) to EMF under four conditions: (1) Control (no blockers); (2) + Nifedipine (blocks VGCCs, pathway A) — isolates C's contribution; (3) + Anti-TRPC1 antibody (blocks TRPC1) — isolates A's contribution; (4) + Both blockers — residual effect = non-Ca²⁺ pathways (B, D). Prediction: nifedipine reduces but does NOT eliminate EMF response. The remaining response is CRY2-TRPC1-mediated (pathway C's calcium branch). Anti-TRPC1 also reduces but does not eliminate the response. Both blockers together produce near-complete abolition of the Ca²⁺ response. This experiment directly quantifies the relative contributions of pathways A (VGCC) and C-calcium (TRPC1) to EMF reproductive effects.",
        timeline: "Testable within 6-12 months (in vitro, cell lines available)",
        falsification: "Nifedipine alone abolishes all EMF-induced calcium effects (no TRPC1-independent component), or anti-TRPC1 has no effect (TRPC1 not involved in reproductive cells)",
      },
    ],
    pharmPredictions: [
      {
        id: "PHARM-1",
        title: "CCB users show attenuated sperm quality decline compared to ARB/ACE inhibitor users",
        description: "Compare sperm parameters (concentration, motility, morphology, DNA fragmentation) between men taking calcium channel blockers vs. men taking ARB or ACE inhibitors for hypertension. Both groups have the same underlying condition; only the drug mechanism differs. CCBs block the same VGCC that BERM identifies as the EMF transduction node. If EMF-induced VGCC activation contributes to sperm decline, CCB users should show relative protection. Data source: existing fertility clinic databases cross-referenced with prescription records.",
        timeline: "1-2 years (retrospective database study)",
        falsification: "No difference in sperm parameters between CCB and ARB/ACE inhibitor users after controlling for age, BMI, and comorbidities",
        critical: true,
      },
      {
        id: "PHARM-2",
        title: "Verapamil shows stronger EMF-protective effect than amlodipine due to use-dependent blockade",
        description: "Among CCB users, verapamil (frequency-dependent VGCC blocker) should show greater attenuation of EMF biomarkers than amlodipine (voltage-dependent blocker). The IFO mechanism predicts high-frequency channel cycling during EMF exposure — verapamil's use-dependent kinetics should provide disproportionate blockade during these bursts. Compare oxidative stress markers, sperm parameters, or melatonin levels between verapamil and amlodipine users.",
        timeline: "2-3 years (retrospective, requires sufficient verapamil sample size)",
        falsification: "No difference between verapamil and amlodipine users on any EMF-relevant biomarker",
      },
      {
        id: "PHARM-3",
        title: "Lithium-treated bipolar patients show less circadian disruption in high-EMF environments",
        description: "Compare circadian markers (melatonin secretion timing, sleep onset latency, dim-light melatonin onset) between bipolar patients on lithium vs. bipolar patients on valproate or lamotrigine in matched EMF environments. Lithium stabilizes CRY proteins via GSK-3β inhibition, directly opposing BERM pathway C. If CRY-mediated melatonin suppression contributes to EMF-associated circadian disruption, lithium users should be partially protected.",
        timeline: "1-3 years (prospective or retrospective with wearable data)",
        falsification: "Lithium users show equal or greater circadian disruption than valproate users in high-EMF environments",
      },
      {
        id: "PHARM-4",
        title: "Nimodipine attenuates EMF-induced cognitive effects while peripheral CCBs do not",
        description: "Nimodipine (BBB-penetrant dihydropyridine CCB) should attenuate EMF-associated cognitive effects, while amlodipine (non-BBB-penetrant) should not. Three moderators differentiate BERM from a simple Ca²⁺-blockade hypothesis: (a) the effect should be LARGER in winter than summer (CRY more sensitive), (b) LARGER in AA-genotype carriers (more Cav1.2), and (c) LARGER in subjects with home Wi-Fi (more primed baseline). ETH Zürich 5G-sleep study is the first opportunity to test these moderators directly.",
        timeline: "2-4 years (prospective cohort or RCT extension study)",
        falsification: "No difference between nimodipine and amlodipine on cognitive endpoints, OR no moderator-dependent variation (season, genotype, home EMF)",
      },
      {
        id: "PHARM-5",
        title: "CoQ10 supplementation reduces EMF-associated oxidative damage in a dose-dependent manner",
        description: "Building on [[ref:bektas2026|Bektas 2026]] (3.5 GHz → testicular ROS; CoQ10 ameliorates): CoQ10 supplementation (100-400 mg/day) should reduce urinary 8-OHdG (oxidative DNA damage marker) in men with high smartphone usage (>4h/day, phone in pocket) in a dose-dependent manner. The dose-response relationship tests whether the antioxidant mechanism scales linearly (simple ROS scavenging) or saturates (enzyme-limited repair).",
        timeline: "6-12 months (RCT feasible with existing supplement)",
        falsification: "No reduction in 8-OHdG at any CoQ10 dose compared to placebo in high-smartphone-usage men",
        critical: true,
      },
    ],
    modIntPredictions: [
      {
        id: "MOD-1",
        title: "Pituitary gonadotroph T-type channels mediate EMF-induced FSH/LH disruption",
        description: "Pituitary gonadotrophs express Cav3 T-type channels for hormone secretion. EMF perturbation of these channels reduces FSH/LH pulsatility independently of hypothalamic GnRH. Test: expose pituitary cell cultures to standardized EMF with and without T-type channel blocker (ethosuximide). Prediction: EMF reduces FSH/LH secretion; ethosuximide abolishes the effect.",
        type: "experimental",
        discriminating: true,
        timeline: "Testable within 6 months (pituitary cell culture)",
        falsification: "No EMF effect on pituitary FSH/LH secretion, or ethosuximide does not block the effect",
      },
      {
        id: "MOD-2",
        title: "Mitochondrial age amplifies EMF-induced ROS in reproductive tissue",
        description: "Aged mitochondria produce more ROS per unit Ca2+ influx than young mitochondria. Test: expose testicular tissue from young (3-month) and old (18-month) rats to identical EMF. Measure mitochondrial ROS production. Prediction: old tissue produces disproportionately more ROS per unit EMF exposure, following the v18_mitochondrial_ros_amplifier() function.",
        type: "experimental",
        discriminating: true,
        timeline: "Testable within 6 months (animal tissue, standard ROS assay)",
        falsification: "Old and young tissue produce equal ROS per unit EMF, or young tissue produces more",
      },
      {
        id: "MOD-3",
        title: "B2 supplementation restores glutathione defense AND reduces CRY sensitivity",
        description: "Riboflavin (B2) is the precursor for FAD, which is required by both glutathione reductase (GR, redox defense) and cryptochrome (CRY, EMF sensor). B2 supplementation should simultaneously: (a) increase effective glutathione buffering capacity (via GR), and (b) stabilize CRY against EMF perturbation (via FAD loading). Test: B2-supplemented vs. unsupplemented cell cultures under EMF. Measure both GSH/GSSG ratio and CRY-dependent circadian gene expression.",
        type: "experimental",
        discriminating: true,
        timeline: "Testable within 3-6 months (cell culture, dual endpoint)",
        falsification: "B2 affects only one endpoint (GR or CRY) but not both, or no effect on either",
      },
      {
        id: "MOD-4",
        title: "HRV is a sensitive early biomarker of chronic EMF exposure",
        description: "Heart rate variability (HRV), specifically the high-frequency (HF) component reflecting vagal tone, decreases with chronic EMF exposure before clinical symptoms appear. The SA node's Cav3.1 T-type channels are the transducer. Test: correlate personal RF dosimetry with 24-hour HRV monitoring in a cohort (N=200). Prediction: inverse dose-response between cumulative EMF and HF-HRV, independent of age, fitness, and stress.",
        type: "observational",
        discriminating: true,
        timeline: "Testable immediately (wearable HRV + RF dosimetry)",
        falsification: "No correlation between personal EMF exposure and HRV after controlling for confounders",
      },
      {
        id: "MOD-5",
        title: "Placental TJ proteins decrease with gestational EMF exposure",
        description: "The placental barrier uses the same tight junction (TJ) proteins as BBB and BTB (occludin, ZO-1, claudins). EMF exposure during pregnancy should decrease placental TJ protein expression in a dose-dependent manner. Test: measure placental TJ protein levels in women with high vs. low EMF exposure during pregnancy (personal dosimetry). Prediction: higher EMF exposure correlates with lower occludin and ZO-1 expression.",
        type: "experimental",
        discriminating: true,
        timeline: "Testable within 12 months (birth cohort with dosimetry)",
        falsification: "No correlation between gestational EMF and placental TJ protein expression",
      },
      {
        id: "MOD-6",
        title: "Thyroid dysfunction prevalence correlates with mobile phone adoption rate nationally",
        description: "Thyroid cells express VGCCs and are sensitive to EMF-induced Ca2+ disruption. National thyroid dysfunction prevalence (hypothyroidism, elevated TSH) should correlate with mobile phone adoption rate, controlling for iodine status, age structure, and diagnostic practices. This is an ecological prediction — correlation, not causation.",
        type: "ecological",
        discriminating: false,
        timeline: "Testable immediately (existing health registry + ITU data)",
        falsification: "No correlation between mobile adoption rate and thyroid dysfunction prevalence after controlling for iodine status and demographics",
      },
    ],
    sidsPredictions: [
      {
        id: "SIDS-1",
        title: "Baby monitor proximity correlates with SIDS risk",
        description: "Retrospective case-control study: compare baby monitor type (DECT vs. WiFi vs. wired vs. none) and placement distance (< 0.5 m, 0.5–1 m, > 1 m) between SIDS cases and age-matched controls. DECT monitors at < 0.5 m produce 2.5–3.5 V/m continuous RF through a 2 mm infant skull. Prediction: DECT or WiFi monitor placement within 0.5 m of the crib is more common in SIDS cases than controls, after controlling for known risk factors.",
        timeline: "Testable retrospectively (parent questionnaire in existing SIDS registries)",
        falsification: "No association between monitor type/distance and SIDS incidence after controlling for prone sleeping, tobacco, overheating, and breastfeeding status",
      },
      {
        id: "SIDS-2",
        title: "CACNA1C rs1006737 AA genotype is overrepresented in SIDS victims",
        description: "Post-mortem genotyping of SIDS victims for CACNA1C rs1006737 (the BERM risk allele). The AA genotype increases Cav1.2 expression and is associated with psychiatric and cardiac risk in adults. In infants with immature Ca²⁺ homeostasis, this gain-of-function variant should increase vulnerability to any Ca²⁺-disrupting stressor. Prediction: AA genotype frequency in SIDS victims exceeds population baseline.",
        timeline: "Testable with existing biobanked SIDS tissue (retrospective genotyping)",
        falsification: "AA genotype frequency in SIDS victims equals or is lower than population frequency",
      },
      {
        id: "SIDS-3",
        title: "Maternal EMF exposure correlates with lower breast milk melatonin",
        description: "Measure melatonin concentration in night breast milk samples from mothers with high vs. low personal EMF exposure (smartphone use, WiFi proximity, LED lighting assessed by questionnaire and dosimetry). Melatonin in night milk is the infant's exogenous Ca²⁺ antagonist. If maternal CRY pathway is disrupted by EMF, milk melatonin should be reduced. Prediction: mothers with higher EMF exposure produce night milk with lower melatonin concentration.",
        timeline: "Testable within 6–12 months (lactation cohort with dosimetry)",
        falsification: "No correlation between maternal EMF exposure metrics and night milk melatonin concentration",
      },
      {
        id: "SIDS-4",
        title: "Night-pumped breast milk offered at night has lower SIDS risk than day-pumped milk offered at night",
        description: "Retrospective cohort: among mothers who pump and bottle-feed, compare SIDS incidence between those who offer time-matched milk (night-pumped at night, day-pumped during day) vs. those who do not label by time. Night milk contains melatonin (Ca²⁺ antagonist) and tryptophan absent from day milk. Prediction: chronomatched milk feeding is associated with lower SIDS risk.",
        timeline: "Testable retrospectively (feeding practice questionnaire in existing cohorts)",
        falsification: "No difference in SIDS incidence between chronomatched and non-matched pumped milk feeding practices",
      },
      {
        id: "SIDS-5",
        title: "EMF-free nursery environment reduces apnea/bradycardia episodes in NICU",
        description: "Interventional study in NICU: compare apnea and bradycardia episode frequency in preterm infants in standard NICU environment vs. EMF-minimized environment (wired monitors, no WiFi, RF-shielded incubator, amber lighting). Prediction: EMF-minimized NICU environment reduces apnea/bradycardia episodes, with larger effect in infants with known ion channel variants.",
        timeline: "Testable within 12–18 months (NICU intervention study)",
        falsification: "No reduction in apnea/bradycardia episodes in EMF-minimized NICU environment compared to standard environment",
      },
      {
        id: "SIDS-6",
        title: "ADORA1/ADORA2A polymorphisms predict both SIDS risk and caffeine response",
        description: "Pharmacogenetic analysis: genotype ADORA1 and ADORA2A receptor polymorphisms in SIDS victims (post-mortem) and in preterm infants receiving caffeine therapy. The same adenosine receptor variants that modulate caffeine response in apnea of prematurity should predict SIDS susceptibility, because both conditions involve adenosine-Ca²⁺ pathway disruption in the respiratory center. Prediction: ADORA variants that predict poor caffeine response are overrepresented in SIDS victims.",
        timeline: "Testable with existing SIDS biobanks and NICU pharmacogenetic databases",
        falsification: "No association between ADORA genotype and SIDS incidence, or ADORA genotypes associated with SIDS do not predict caffeine response",
      },
    ],
    sidsResPredictions: [
      {
        id: "SIDS-RESONANCE-1",
        title: "Q-factor predicts SIDS risk better than age alone",
        description: "If the resonance model is correct, SIDS risk should correlate with Q_neonatal(age) = Q₀/(1+(age/τ_KCC2)²) better than with age alone. The Q-factor declines as KCC2 matures and GABA transitions from excitatory to inhibitory. Test: fit SIDS incidence-by-age curves to Q_neonatal(age) vs. linear/quadratic age models. Prediction: Q-factor model fits SIDS age distribution better (lower AIC) than purely age-based models.",
        timeline: "Testable immediately (existing SIDS age-distribution datasets)",
        falsification: "Q-factor model fits no better than simple age-based models for SIDS incidence distribution",
      },
      {
        id: "SIDS-RESONANCE-2",
        title: "Bumetanide prophylaxis reduces apnea in high-risk neonates",
        description: "Bumetanide blocks NKCC1, restoring inhibitory GABA and introducing damping (reducing Q). If SIDS results from resonance failure in an undamped system, bumetanide should reduce apnea and bradycardia episodes in high-risk neonates (those with ion channel variants or prior apparent life-threatening events). Test: randomized trial of low-dose bumetanide in NICU infants with recurrent apnea. Prediction: bumetanide reduces apnea/bradycardia episode frequency.",
        timeline: "Testable within 12–18 months (NICU pharmacological trial)",
        falsification: "No reduction in apnea/bradycardia episodes with bumetanide in high-risk neonates",
      },
      {
        id: "SIDS-RESONANCE-3",
        title: "Neonatal EEG shows higher coherence at resonant frequencies in SIDS-risk infants",
        description: "An undamped resonator (Q→∞) concentrates energy at its natural frequency. Neonatal EEG in high-risk infants should show narrower spectral peaks and higher inter-channel coherence in delta/theta bands compared to low-risk controls. This spectral signature should diminish as KCC2 matures (3–6 months). Test: serial EEG in SIDS-risk vs. control infants from birth to 6 months. Prediction: high-risk infants show elevated spectral coherence that normalizes on the KCC2 maturation timeline.",
        timeline: "Testable within 12 months (neonatal EEG longitudinal study)",
        falsification: "No difference in EEG spectral coherence between high-risk and control neonates, or coherence does not change on the predicted KCC2 timeline",
      },
      {
        id: "SIDS-RESONANCE-4",
        title: "Co-sleeping cultures have low SIDS despite high ambient EMF",
        description: "The three-protections model predicts that cultures practicing co-sleeping (no monitor), breastfeeding (>90%), and continuous skin contact should maintain low SIDS rates regardless of ambient EMF level. Test: compare SIDS rates across cultures stratified by (1) ambient EMF density and (2) co-sleeping/breastfeeding/skin-contact practices. Prediction: SIDS rate correlates with monitor use and formula feeding, not with ambient EMF density, after controlling for the three protections.",
        timeline: "Testable immediately (ecological analysis of existing cross-national SIDS data)",
        falsification: "SIDS rate correlates with ambient EMF density regardless of co-sleeping/breastfeeding/skin-contact practices",
      },
      {
        id: "SIDS-RESONANCE-5",
        title: "NKCC1/KCC2 ratio at time of death predicts SIDS vs. non-SIDS infant death",
        description: "If the resonance model is correct, SIDS victims should have higher NKCC1/KCC2 ratios (less mature chloride transporter switch → higher Q → more excitatory GABA) compared to age-matched infants who died of non-SIDS causes. Test: immunohistochemistry for NKCC1 and KCC2 in brainstem tissue from SIDS vs. non-SIDS infant post-mortem samples. Prediction: SIDS victims show elevated NKCC1/KCC2 ratio compared to age-matched controls.",
        timeline: "Testable with existing biobanked tissue (retrospective immunohistochemistry)",
        falsification: "NKCC1/KCC2 ratio in SIDS victims equals that in age-matched non-SIDS infant deaths",
      },
      {
        id: "SIDS-SPECTRUM-1",
        title: "Prenatal EMF exposure predicts neurodevelopmental outcomes on a dose-response curve",
        description: "The resonance spectrum model predicts a continuous dose-response relationship between prenatal/neonatal EMF exposure and neurodevelopmental outcomes: highest exposure → SIDS risk, moderate → developmental delay, low → subtle motor/cognitive differences. Test: prospective birth cohort with personal EMF dosimetry (phone use, WiFi proximity, monitor use) followed to 36 months with standardized developmental assessment. Prediction: EMF exposure shows graded dose-response with developmental outcomes, with fine motor (OR ≥ 2.5) and problem-solving (OR ≥ 3.0) most affected, consistent with the prospective cohort finding (OR 2.74 fine motor, OR 3.67 problem-solving).",
        timeline: "Testable within 3 years (prospective birth cohort with dosimetry)",
        falsification: "No dose-response relationship between prenatal/neonatal EMF exposure and developmental outcomes at 36 months",
      },
    ],
    neuroPredictions: [
      {
        id: "NEURO-EMF-1",
        title: "Chronic migraine prevalence correlates with cumulative EMF layer exposure",
        description: "The Q-factor model predicts that chronic migraine prevalence should increase with cumulative EMF exposure (ELF-priming → α2δ-1↑ → CSD threshold↓). Test: correlate chronic migraine prevalence trends (1990→2025) with cumulative EMF technology adoption (mobile, WiFi, LED) across countries. Prediction: countries with earlier and denser EMF adoption show steeper migraine prevalence increase.",
        timeline: "Testable immediately (existing migraine prevalence data + ITU technology adoption data)",
        falsification: "No temporal correlation between EMF technology adoption and chronic migraine prevalence trends across countries",
      },
      {
        id: "NEURO-EMF-2",
        title: "ELF-priming lowers CSD threshold; gabapentin reverses this",
        description: "ELF exposure upregulates α2δ-1 (CACNA2D1), increasing VGCC density at synapses and lowering CSD threshold. Gabapentin blocks α2δ-1 trafficking. Test: expose cortical slices to chronic ELF (50 Hz, 7 days), then measure CSD threshold (KCl concentration needed to trigger CSD). Repeat with gabapentin co-treatment. Prediction: ELF lowers CSD threshold; gabapentin co-treatment normalizes it.",
        timeline: "Testable within 6–12 months (cortical slice electrophysiology)",
        falsification: "ELF exposure does not alter CSD threshold, or gabapentin does not reverse the ELF effect",
      },
      {
        id: "NEURO-EMF-3",
        title: "Cluster headache patients have higher EMF exposure history",
        description: "The cluster headache patient profile (male 3:1, smoker 60–90%, onset ~30 years, attacks 00–03) maps onto a cumulative Ca²⁺-loading profile. EMF exposure history (occupational, residential) should be higher in cluster headache patients than matched controls. Test: case-control study with detailed EMF exposure assessment (occupation, residential proximity to infrastructure, device use). Prediction: cluster headache patients have statistically higher lifetime EMF exposure.",
        timeline: "Testable within 12 months (case-control with EMF questionnaire)",
        falsification: "No difference in EMF exposure history between cluster headache patients and matched controls",
      },
      {
        id: "NEURO-EMF-4",
        title: "SUDEP risk is higher in higher-EMF environments",
        description: "SUDEP shares the same spreading depolarization → brainstem mechanism as SIDS. If EMF contributes to CSD propagation, SUDEP incidence should be higher in high-EMF environments (urban) compared to low-EMF environments (rural), after controlling for seizure frequency and medication compliance. Test: registry study comparing SUDEP incidence in urban vs. rural epilepsy patients. Prediction: urban epilepsy patients have higher SUDEP rate after controlling for seizure frequency.",
        timeline: "Testable immediately (epilepsy registry with residential data)",
        falsification: "No difference in SUDEP incidence between urban and rural epilepsy patients after controlling for seizure frequency and medication compliance",
      },
      {
        id: "NEURO-EMF-5",
        title: "Psilocybin efficacy in cluster headache improves with concurrent EMF reduction",
        description: "Psilocybin resets the tryptamine pathway (5-HT2A → thalamo-cortical reset → SCN circadian reset). If ongoing EMF exposure re-primes α2δ-1 and disrupts the SCN after reset, psilocybin efficacy should be greater when combined with EMF reduction. Test: RCT of psilocybin + EMF reduction protocol vs. psilocybin alone in episodic cluster headache. Prediction: combined intervention produces longer remission than psilocybin alone.",
        timeline: "Testable within 24 months (RCT with EMF reduction protocol)",
        falsification: "No difference in remission duration between psilocybin + EMF reduction and psilocybin alone",
      },
      {
        id: "NEURO-EMF-6",
        title: "EMF triggers seizures in neonatal animal models without pharmacological GABAergic reduction",
        description: "López-Martín showed GSM + picrotoxin (GABA antagonist) = seizures, while neither alone sufficed. The neonatal brain has endogenously excitatory GABA (NKCC1>KCC2), equivalent to pharmacological GABAergic reduction. Test: expose neonatal rodents (P3–P7, before KCC2 switch) to pulsed GSM 900 MHz at mobile-phone intensity without picrotoxin. Prediction: neonatal animals show seizure activity or epileptiform EEG changes without pharmacological pre-treatment, while adult animals do not.",
        timeline: "Testable within 6–12 months (neonatal rodent EMF exposure model)",
        falsification: "No seizure activity or epileptiform EEG changes in neonatal animals exposed to GSM without pharmacological GABAergic reduction",
      },
    ],
    metalPredictions: [
      {
        id: "METAL-EMF-1",
        title: "Chelation therapy + EMF reduction produces superadditive health improvement in EHS patients",
        description: "Heavy metals (Cd²⁺, Pb²⁺) enter cells through EMF-opened VGCCs and mimic Ca²⁺ at calmodulin/CaMKII binding sites. Chelation removes metals; EMF reduction closes the entry pathway. Combined intervention should be superadditive. Test: RCT of chelation + EMF reduction vs. chelation alone vs. EMF reduction alone in EHS patients with elevated heavy metal levels. Prediction: combined group shows >50% improvement vs. <25% for either alone.",
        timeline: "Testable within 18 months (RCT with heavy metal panel + EHS symptom scores)",
        falsification: "No superadditive effect — chelation + EMF reduction equals sum of individual effects",
      },
      {
        id: "METAL-EMF-2",
        title: "PGC grade correlates with cumulative lifetime EMF exposure",
        description: "Pineal gland calcification (PGC) reduces melatonin production (r=0.569 for uncalcified tissue↔melatonin). EMF accelerates PGC via oxidative stress and Ca²⁺ deposition. Test: cross-sectional study correlating PGC volume (CT/MRI) with occupational EMF exposure history. Prediction: high-EMF occupations (electricians, telecom workers) have significantly higher PGC volume than matched low-EMF controls.",
        timeline: "Testable immediately (CT/MRI + occupational exposure questionnaire)",
        falsification: "No correlation between occupational EMF exposure history and PGC grade",
      },
      {
        id: "METAL-EMF-3",
        title: "Cadmium tissue levels are higher in high-EMF environments via Cav3.1 window current",
        description: "Cd²⁺ permeates through Cav3.1 T-type calcium channels (confirmed with radiolabeled ¹⁰⁹Cd²⁺). Cav3.1 has a window current near resting potential — EMF increases open probability → more Cd entry. Test: compare tissue Cd levels in workers with equal dietary/occupational Cd exposure but different EMF exposure. Prediction: high-EMF group has higher tissue Cd accumulation at equivalent external Cd levels.",
        timeline: "Testable within 12 months (occupational cohort with Cd biomonitoring + EMF dosimetry)",
        falsification: "No difference in tissue Cd levels between EMF-matched groups at equivalent external Cd exposure",
      },
      {
        id: "METAL-EMF-4",
        title: "MeHg neurotoxicity threshold is lower in high-EMF environments",
        description: "Methylmercury increases T-type Ca²⁺ currents; EMF independently opens VGCCs. Combined effect: double Ca²⁺ loading. Populations with both high MeHg (fish diet) and high EMF (urban) should show neurotoxicity at lower MeHg levels than high-MeHg + low-EMF populations. Test: compare neurodevelopmental outcomes in Faroe Islands (high MeHg, low EMF) vs. urban Japan (high MeHg, high EMF) at equivalent MeHg exposure. Prediction: urban Japan shows effects at lower MeHg thresholds.",
        timeline: "Testable immediately (existing Faroe Islands and Japanese cohort data)",
        falsification: "No difference in MeHg neurotoxicity threshold between high-EMF and low-EMF populations",
      },
      {
        id: "CHAIN-1",
        title: "Ca²⁺ channel blocker prevents EMF-induced sleep effects (ETH nimodipine-5G)",
        description: "The VGCC hypothesis predicts that blocking the Ca²⁺ channel should prevent ALL downstream EMF effects. [[ref:sousouri2025|Sousouri 2025]] showed CACNA1C genotype determines 5G sleep response. Test: ETH Zürich nimodipine-5G follow-up — administer nimodipine (L-type Ca²⁺ blocker) before 5G exposure and measure sleep EEG. Prediction: nimodipine abolishes the genotype-dependent sleep EEG changes seen in the original study.",
        timeline: "Testable within 12 months (RCT extension of [[ref:sousouri2025|Sousouri 2025]] protocol)",
        falsification: "Nimodipine does NOT prevent EMF-induced sleep EEG changes → VGCC is not the primary target → entire BERM cascade must be reconsidered",
      },
      {
        id: "CHAIN-2",
        title: "Amish communities show different chronic disease trends than mainstream population",
        description: "Amish communities have minimal EMF exposure (no grid electricity, no wireless devices), high co-sleeping, high breastfeeding. If EMF is a significant driver of chronic disease trends, Amish should show divergent trajectories for BERM-predicted conditions. Test: compare age-adjusted incidence trends (1990→2025) for T2D, obesity, autism, ADHD, depression, myopia, SIDS in Amish vs. general US population. Prediction: Amish show stable or declining rates where the general population shows increase.",
        timeline: "Testable immediately (Amish health registries + CDC NHANES comparison)",
        falsification: "Amish communities show the same chronic disease trend increases as the general US population",
      },
      {
        id: "CHAIN-3",
        title: "EMF reduction intervention produces measurable health improvement in a controlled study",
        description: "This is BERM's critical missing piece: interventional verification. All current evidence is observational or mechanistic. Test: RCT of comprehensive EMF reduction (shielded sleeping environment, wired devices, no LED at night) in symptomatic individuals for 3 months. Measure: CaMKII Thr286 phosphorylation in lymphocytes, sleep quality (actigraphy), melatonin (urine 6-sulfatoxymelatonin), blood pressure. Prediction: EMF reduction group shows significant improvement in all four biomarkers.",
        timeline: "Testable within 12 months (RCT with biomarker panel)",
        falsification: "No improvement in any biomarker after comprehensive EMF reduction → EMF exposure has no measurable health impact → model lacks clinical relevance",
      },
      {
        id: "CHAIN-4",
        title: "Walker sleep chain: EMF→melatonin↓→sleep↓→GABA↓→Q↑ measured as complete cascade",
        description: "Feedback loop 4 predicts a cascading cycle: EMF suppresses melatonin → sleep deteriorates → GABA tonic inhibition decreases → Q-factor increases → brain becomes MORE sensitive to EMF → further melatonin suppression. Test: longitudinal study measuring evening EMF exposure, overnight melatonin (saliva), sleep quality (PSG), morning GABA (MRS spectroscopy), and EEG coherence (Q proxy) over 4 weeks. Prediction: initial EMF exposure produces self-amplifying deterioration across all measures.",
        timeline: "Testable within 6 months (longitudinal PSG + MRS + EEG protocol)",
        falsification: "No self-amplifying cascade — EMF effects on sleep/melatonin/GABA remain constant rather than progressively worsening",
      },
    ],
    mechPredictions: [
      {
        id: "BBB-EMF-1",
        title: "EMF increases BBB permeability; melatonin supplementation prevents it",
        description: "RF-EMF (27.12 MHz) increases BBB permeability via eNOS↑ and occludin↓. Melatonin protects tight junction proteins (occludin, claudin-5, ZO-1). Test: measure BBB permeability (gadolinium-enhanced MRI) during RF exposure with and without melatonin pre-treatment. Prediction: melatonin pre-treatment prevents EMF-induced BBB opening.",
        timeline: "Testable within 12 months (MRI + melatonin RCT)",
        falsification: "Melatonin does NOT prevent EMF-induced BBB permeability changes",
      },
      {
        id: "BBB-EMF-2",
        title: "Heavy metal brain accumulation higher in high-EMF populations via BBB opening",
        description: "EMF opens BBB → heavy metals (Pb, Cd, MeHg) enter brain more easily. EMF also suppresses melatonin → BBB protection↓ → DOUBLE vulnerability. Test: compare brain heavy metal accumulation (post-mortem or CSF) between high-EMF occupations and matched low-EMF controls with equivalent peripheral heavy metal levels. Prediction: high-EMF group has higher brain metal levels at equivalent blood levels.",
        timeline: "Testable within 18 months (occupational cohort with CSF/autopsy samples)",
        falsification: "No difference in brain heavy metal accumulation between EMF-exposure groups at equivalent blood levels",
      },
      {
        id: "BAT-EMF-1",
        title: "5G reduces BAT PRDM16 expression and thermogenesis in rodents",
        description: "5G (3.5 GHz) → PRDM16 mRNA↓ + C/EBPβ mRNA↓ in brown adipose tissue. BAT uses Ca²⁺ cycling (SERCA) for energy expenditure. Test: expose rodents to 5G and measure BAT PRDM16 protein, thermogenic capacity (cold challenge), and energy expenditure. Prediction: 5G-exposed animals show reduced cold-induced thermogenesis and weight gain on identical caloric intake.",
        timeline: "Testable within 6 months (rodent model with metabolic cages)",
        falsification: "No change in BAT thermogenesis or weight in 5G-exposed vs control animals on identical diet",
      },
      {
        id: "HPA-EMF-1",
        title: "Chronic EMF elevates hair cortisol in exposed workers",
        description: "EMF sets a new HPA axis setpoint with sensitization rather than adaptation. Chronic exposure → sustained cortisol elevation + adrenal hypertrophy. Test: measure hair cortisol (3-month integrated cortisol) in telecom workers vs matched office workers. Prediction: telecom workers show significantly higher hair cortisol after controlling for perceived stress and lifestyle factors.",
        timeline: "Testable immediately (hair cortisol + occupational exposure questionnaire)",
        falsification: "No difference in hair cortisol between high-EMF and low-EMF occupation groups",
      },
      {
        id: "HPA-EMF-2",
        title: "EMF produces adrenal hypertrophy measurable by imaging",
        description: "Animal studies show EMF → ACTH↑ + corticosterone↑ + adrenal hypertrophy. This anatomical change should be detectable in chronically exposed humans. Test: compare adrenal gland volume (CT/MRI) in workers with >10 years high-EMF exposure vs matched controls. Prediction: high-EMF group has significantly larger adrenal glands.",
        timeline: "Testable immediately (retrospective imaging study)",
        falsification: "No adrenal volume difference between chronic high-EMF and low-EMF occupation groups",
      },
      {
        id: "BETA-EMF-1",
        title: "EMF disrupts glucose-stimulated insulin secretion via Ca²⁺ channel activation",
        description: "Electric fields can induce insulin secretion WITHOUT glucose. ELF-EMF alters glucose-stimulated insulin dynamics. CaVγ4→CaMKII→MafA pathway: CaMKII dysregulation → β-cell maturity loss. Test: measure insulin secretion dynamics (first-phase insulin response) in EMF-exposed vs control subjects during OGTT. Prediction: EMF-exposed group shows blunted first-phase insulin with elevated basal insulin.",
        timeline: "Testable within 12 months (OGTT study with EMF exposure history)",
        falsification: "No difference in insulin secretion dynamics between EMF-exposure groups",
      },
      {
        id: "BETA-EMF-2",
        title: "Verapamil protects β-cells from EMF-induced dysfunction",
        description: "Verapamil (L-type Ca²⁺ blocker) protects β-cells and improves T1D outcomes ([[ref:verap_t1d_jama|JAMA 2023]]). If EMF damages β-cells via Ca²⁺ channels, verapamil should also prevent EMF-induced β-cell dysfunction. Test: expose β-cell cultures to EMF with/without verapamil; measure insulin secretion and MafA expression. Prediction: verapamil prevents EMF-induced insulin secretion changes and MafA↓.",
        timeline: "Testable within 6 months (in vitro β-cell culture)",
        falsification: "Verapamil does NOT prevent EMF-induced β-cell dysfunction → Ca²⁺ channel is not the primary mechanism",
      },
      {
        id: "HYPO-EMF-1",
        title: "Chronic EMF reduces hypothalamic synaptic vesicle density",
        description: "835 MHz (12 weeks) reduces synaptic vesicle number, size, and docking in hypothalamus, plus synapsin I/II↓ and synaptotagmin 1↓. Synaptotagmin 1 is the Ca²⁺ sensor for vesicle release. Its loss means ALL hypothalamic hormone release is impaired. Test: replicate [[ref:kim2019_hypothalamus|Kim 2019]] with additional hormone panel (GnRH, CRH, TRH, GHRH, dopamine). Prediction: multi-hormone deficit pattern matching BERM predictions.",
        timeline: "Testable within 12 months (rodent model with hypothalamic dissection + hormone panel)",
        falsification: "No synaptic vesicle changes and no multi-hormone deficit after chronic RF exposure",
      },
      {
        id: "HYPO-EMF-2",
        title: "EMF produces simultaneous T↓ + cortisol↑ + GH↓ via hypothalamic disruption",
        description: "If EMF disrupts hypothalamic synaptic transmission broadly (VK13), ALL hormone axes should be affected simultaneously. The triple lock (T↓ × cortisol↑ × DA↓) should be accompanied by GH↓ and thyroid changes. Test: measure full hormone panel (T, LH, cortisol, ACTH, GH, IGF-1, TSH, fT4, dopamine) in chronic EMF-exposed vs controls. Prediction: coherent multi-axis disruption pattern.",
        timeline: "Testable immediately (occupational cohort with comprehensive hormone panel)",
        falsification: "EMF-exposed group shows changes in only one hormonal axis rather than coordinated multi-axis disruption",
      },
      {
        id: "MAST-EMF-1",
        title: "EMF triggers mast cell degranulation measurable by serum tryptase",
        description: "Ca²⁺ is the primary trigger for mast cell degranulation. EMF → VGCC → Ca²⁺ → mast cell releases histamine + IL-1β + tryptase. [[ref:johansson2000_mast|Johansson 2000]] showed mast cell changes in skin biopsies after display terminal exposure. Test: measure serum tryptase (specific mast cell degranulation marker) before and after standardized EMF exposure. Prediction: acute EMF exposure produces measurable tryptase elevation.",
        timeline: "Testable within 3 months (blood draw + EMF exposure, simple protocol)",
        falsification: "No tryptase elevation after EMF exposure",
      },
      {
        id: "MAST-EMF-2",
        title: "Mast cell stabilizers prevent EMF-induced skin and systemic reactions",
        description: "If EMF symptoms are partly mediated by mast cell degranulation, mast cell stabilizers (cromolyn sodium, ketotifen) should prevent them. Test: RCT of cromolyn + EMF exposure vs placebo + EMF exposure in EHS patients. Measure: skin reactions, systemic symptoms, serum histamine/tryptase. Prediction: cromolyn group shows significantly fewer symptoms and lower histamine/tryptase.",
        timeline: "Testable within 6 months (RCT with existing approved drugs)",
        falsification: "Mast cell stabilizers do NOT reduce EMF-induced symptoms",
      },
      {
        id: "KCC2-EMF-1",
        title: "Prenatal EMF exposure delays GABA excitatory→inhibitory switch in offspring",
        description: "Environmental disruptions (stress, inflammation) delay KCC2 maturation → GABA stays excitatory longer → Q-factor elevated longer → wider vulnerability window. IL-1β (from mast cells or glia) → KCC2↓. ROS → KCC2↓. EMF → both ROS and IL-1β. Test: expose pregnant rodents to EMF; measure KCC2/NKCC1 ratio in offspring hippocampus at P7, P14, P21. Prediction: EMF-exposed offspring show delayed KCC2 switch.",
        timeline: "Testable within 9 months (rodent prenatal exposure model)",
        falsification: "No difference in KCC2 maturation timeline between EMF-exposed and control offspring",
      },
      {
        id: "TRIPLE-1",
        title: "T↓ × cortisol↑ × DA↓ triple deficit measurable in high-EMF populations",
        description: "The triple lock theory predicts that EMF simultaneously reduces testosterone (HPG), elevates cortisol (HPA), and reduces dopamine (mesolimbic). Each has been verified independently; the prediction is that they co-occur in the SAME individuals proportional to EMF exposure. Test: measure T, cortisol, and urinary HVA (dopamine metabolite) in high vs low EMF occupations. Prediction: triple deficit pattern (T↓ + cortisol↑ + HVA↓) correlates with cumulative EMF exposure.",
        timeline: "Testable immediately (occupational cohort with hormone + neurotransmitter panel)",
        falsification: "The three deficits do not co-occur — they are independent of each other and of EMF exposure",
      },
      {
        id: "HIPPO-1",
        title: "Chronic EMF exposure correlates with hippocampal volume loss",
        description: "EMF → cortisol↑ → hippocampal dendritic retraction + neurogenesis↓ → volume loss. Hippocampus is also the HPA negative feedback center — its damage removes cortisol braking → cortisol↑↑ (feedback loop S9). Test: compare hippocampal volume (MRI volumetry) in workers with >10 years high-EMF exposure vs matched controls, controlling for age, stress, depression. Prediction: high-EMF group shows reduced hippocampal volume.",
        timeline: "Testable immediately (retrospective MRI volumetry study)",
        falsification: "No hippocampal volume difference between chronic high-EMF and low-EMF occupation groups after controlling for confounders",
      },
      {
        id: "KLIM-1",
        title: "EMF reduction reverses BAT suppression measurable by thermal imaging",
        description: "If EMF → PRDM16↓ → BAT↓ → thermogenesis↓ → weight gain, then EMF reduction should restore BAT function. Test: measure supraclavicular BAT activity (infrared thermography after cold challenge) before and after 3-month EMF reduction protocol. Prediction: EMF reduction group shows increased BAT thermogenesis and modest weight loss without dietary change.",
        timeline: "Testable within 6 months (thermal imaging + EMF reduction protocol)",
        falsification: "No change in BAT thermogenesis after EMF reduction",
      },
    ],
    suppPredictions: [
      {
        id: "E-NEW-1",
        title: "Sperm CatSper Ca²⁺ response is EMF-exposure dependent",
        description: "CatSper channels in sperm activate prematurely under RF-EMF, causing energy depletion before reaching the egg (‘premature energy expenditure’). Test: dose-response study of CatSper activation vs SAR level in human sperm samples. Prediction: CatSper activation increases with SAR; sperm exposed to mobile-phone-level RF show premature hyperactivation and reduced fertilization capacity.",
        timeline: "Testable within 6 months (in vitro sperm + RF exposure)",
        falsification: "No dose-dependent relationship between SAR and CatSper activation",
      },
      {
        id: "E-NEW-2",
        title: "GnIH antagonist protects testosterone during EMF exposure",
        description: "Cortisol↑ → GnIH↑ → GnRH↓ → T↓ is a verified cross-suppression pathway. RF9 (GnIH antagonist) restored T in cortisol-treated primates. Test: expose rodents to chronic EMF with/without RF9-type GnIH antagonist. Prediction: GnIH antagonist prevents EMF-induced T decline, confirming HPA-HPG cross-suppression as the mechanism.",
        timeline: "Testable within 12 months (rodent model with pharmacological intervention)",
        falsification: "GnIH antagonist does NOT prevent EMF-induced testosterone decline",
      },
      {
        id: "E-NEW-3",
        title: "Chronic RF alters OPC Cav1.2 expression and myelination timing",
        description: "Cav1.2 is essential for OPC differentiation and myelination. SMF increases Cav1.2 in OPCs. Chronic RF may dysregulate Cav1.2 in developing brain → myelination timing disruption → white matter integrity↓. Test: expose developing rodent brains to chronic RF; measure Cav1.2 expression in OPCs and myelination markers (MBP, PLP) at developmental timepoints. Prediction: RF-exposed animals show altered myelination timing.",
        timeline: "Testable within 12 months (developmental rodent model)",
        falsification: "No change in OPC Cav1.2 expression or myelination timing after chronic RF",
      },
      {
        id: "E-NEW-4",
        title: "200 kHz intermediate frequency INCREASES NK cell activity",
        description: "TTFields (200 kHz) increase NK cytotoxicity while 50 Hz ELF suppresses it — direct validation of BERM’s frequency-dependent pathway hierarchy. Test: compare NK cell cytotoxicity across ELF (50 Hz), RF (900 MHz, 2.4 GHz), and IF (200 kHz) exposures. Prediction: IF range shows NK activation while ELF and RF show suppression — different frequencies, different biological outcomes via the same VGCC mechanism.",
        timeline: "Testable within 6 months (in vitro NK cell assay across frequencies)",
        falsification: "All frequencies produce the same NK cell response direction",
      },
      {
        id: "E-NEW-5",
        title: "Gut Per2 expression correlates with EMF exposure",
        description: "Per2 knockout disrupts gut barrier → LPS enters bloodstream → neuroinflammation → depression. EMF disrupts circadian rhythm → Per2↓. Test: measure Per2 expression in gut epithelial biopsies of shift workers (circadian disruption proxy) vs day workers, correlated with EMF exposure history and serum LPS levels. Prediction: EMF/circadian disruption → Per2↓ → elevated serum LPS.",
        timeline: "Testable within 12 months (occupational cohort with gut biopsies)",
        falsification: "No correlation between EMF exposure and gut Per2 expression or serum LPS",
      },
      {
        id: "E-NEW-6",
        title: "Sleep restriction + EMF produces superadditive testosterone decline",
        description: "5h sleep → T -10-15% ([[ref:leproult2011_testosterone_sleep|JAMA 2011]]). EMF → T↓ via three routes (VK13, VK15, VK22). Combined sleep restriction + EMF should produce GREATER T decline than either alone (superadditive). Test: 2×2 factorial RCT: normal sleep/restricted sleep × low EMF/high EMF. Measure T at baseline and after 1 week. Prediction: interaction term is significant — combined group shows >25% T decline vs ~15% for sleep alone.",
        timeline: "Testable within 3 months (controlled sleep + EMF study)",
        falsification: "No interaction effect — sleep and EMF effects on T are purely additive",
      },
      {
        id: "E-NEW-7",
        title: "RF-exposed children have lower BDNF and dendritic spine density",
        description: "RF 835 MHz (postnatal) reduces BDNF in CA1 and dentate gyrus with dendritic spine loss and memory impairment ([[ref:bdnf_rf_dev_2021|PMC8159076]]). Meanwhile ELF increases BDNF (hormesis). Test: measure serum BDNF in children stratified by personal RF exposure (phone use, WiFi proximity). Prediction: higher RF exposure correlates with lower BDNF and poorer spatial memory scores.",
        timeline: "Testable within 12 months (pediatric cohort with EMF dosimetry)",
        falsification: "No correlation between RF exposure and BDNF levels in children",
      },
      {
        id: "E-NEW-8",
        title: "Gut barrier permeability (LPS marker) correlates with EMF exposure",
        description: "EMF → melatonin↓ → Per2↓ in gut → barrier disruption → LPS enters bloodstream → systemic inflammation. Gut barrier uses the SAME tight junction proteins as BBB (ZO-1, occludin, claudins), and melatonin protects both. Test: measure serum LPS-binding protein and zonulin (gut permeability markers) in high-EMF vs low-EMF occupation workers. Prediction: high-EMF group has elevated gut permeability markers.",
        timeline: "Testable immediately (occupational cohort with blood draw)",
        falsification: "No difference in gut permeability markers between EMF exposure groups",
      },
    ],
    finalPredictions: [
      {
        id: "E-NEW-9",
        title: "Hidden hypothyroid: FT3/FT4 ratio is lower in high-EMF workers",
        description: "EMF reduces hypothalamic Dio2/Dio3 → T4→T3 conversion is inhibited → blood T4 appears 'normal' but tissues don't receive T3. Test: measure FT3/FT4 ratio in high-EMF occupations (telecom, electricians) vs matched low-EMF controls. Prediction: high-EMF group has significantly lower FT3/FT4 ratio despite normal TSH and T4.",
        timeline: "Testable immediately (occupational cohort with blood draw)",
        falsification: "No difference in FT3/FT4 ratio between EMF exposure groups",
      },
      {
        id: "E-NEW-10",
        title: "Transgenerational sperm methylation persists to F3",
        description: "EMF alters sperm epigenome dose-dependently (1 mT: methylation↓, 3 mT: methylation↑). If EMF effects follow the DDT transgenerational model, methylation changes should persist to F3. Test: expose F0 rodents to chronic EMF; analyze sperm methylation profiles in F1, F2, F3. Prediction: F3 sperm methylation retains EMF-signature from F0 exposure. BERM's HIGHEST PRIORITY research proposal.",
        timeline: "Testable within 18-24 months (multigenerational rodent study)",
        falsification: "F3 sperm methylation is indistinguishable from controls",
      },
      {
        id: "E-NEW-11",
        title: "EMF exposure duration correlates with telomere shortening",
        description: "EMF→ROS↑ + melatonin↓→telomerase↓ + SIRT1↓ should accelerate telomere shortening. Test: measure leukocyte telomere length in occupational EMF cohort stratified by exposure years. Control for age, smoking, BMI. Prediction: cumulative EMF exposure correlates with shorter telomeres after controlling for confounders.",
        timeline: "Testable immediately (occupational cohort with blood draw)",
        falsification: "No correlation between EMF exposure duration and telomere length",
      },
      {
        id: "E-NEW-12",
        title: "Melatonin supplementation slows telomere shortening in high-EMF population",
        description: "Melatonin activates telomerase + SIRT1 (anti-aging). EMF→melatonin↓ removes this protection. Test: RCT of melatonin supplementation (3-5 mg/night, 12 months) in high-EMF workers. Measure telomere length at baseline and 12 months. Prediction: melatonin group shows significantly less telomere shortening than placebo.",
        timeline: "Testable within 12 months (supplementation RCT)",
        falsification: "Melatonin supplementation does not affect telomere attrition rate",
      },
      {
        id: "E-NEW-13",
        title: "Oxytocin levels inversely correlate with EMF exposure",
        description: "Oxytocin release is directly VGCC-dependent (N-type + L-type Ca²⁺ channels). EMF disrupts VGCC → OXT release disrupted. Test: measure salivary or plasma oxytocin in controlled EMF exposure study (pre/post acute exposure). Prediction: acute EMF exposure reduces oxytocin response to social stimuli.",
        timeline: "Testable within 6 months (controlled lab study)",
        falsification: "No change in oxytocin levels after EMF exposure",
      },
      {
        id: "E-NEW-14",
        title: "ELF-exposed animals show α2δ-1↑ WITHOUT nerve injury",
        description: "ELF-priming (VK4) upregulates VGCC expression including α2δ-1 subunits. α2δ-1 overexpression alone produces neuropathic pain behavior WITHOUT nerve injury. Test: expose rodents to chronic ELF (50 Hz, 8-10 days); measure α2δ-1 expression in DRG and spinal dorsal horn. Prediction: ELF produces α2δ-1 upregulation and pain-like behavior without nerve damage.",
        timeline: "Testable within 6 months (rodent ELF exposure model)",
        falsification: "No change in α2δ-1 expression after chronic ELF exposure",
      },
      {
        id: "E-NEW-15",
        title: "ASD children's NKCC1/KCC2 ratio correlates with prenatal EMF",
        description: "NKCC1/KCC2 ratio is elevated in ASD (GABA stays excitatory). EMF disrupts KCC2 maturation via IL-1β (S9) and ROS. Test: measure plasma NKCC1/KCC2 ratio in ASD children; correlate with maternal prenatal EMF exposure history (occupation, device use, residential proximity to base stations). Prediction: higher prenatal EMF correlates with higher NKCC1/KCC2 ratio in ASD cases.",
        timeline: "Testable within 12 months (case-control with maternal history)",
        falsification: "No correlation between prenatal EMF exposure and NKCC1/KCC2 ratio",
      },
      {
        id: "E-NEW-16",
        title: "Bumetanide + EMF reduction outperforms either alone for ASD",
        description: "Bumetanide blocks NKCC1 → restores inhibitory GABA. EMF reduction removes the upstream driver of KCC2↓. Together they should be superadditive. Test: 2×2 RCT in ASD children: bumetanide/placebo × EMF reduction/standard. Measure CARS score, SRS, sensory sensitivity. Prediction: combined group shows significantly better improvement than either intervention alone.",
        timeline: "Testable within 12 months (pediatric 2×2 RCT)",
        falsification: "No interaction effect — bumetanide and EMF reduction are purely additive",
      },
    ],
    extPredictions: [
      {
        id: "E-NEW-24",
        title: "ADHD children's PFC myelination correlates with prenatal EMF",
        description: "ADHD shows 5-year PFC maturation delay ([[ref:adhd_pfc_delay|Shaw 2007 PNAS]]). EMF disrupts OPC myelination via Cav1.2 (VK20) and reduces DA in PFC. Test: DTI white matter integrity in PFC of ADHD children correlated with prenatal/neonatal EMF exposure history. Prediction: higher prenatal EMF correlates with delayed PFC myelination markers.",
        timeline: "Testable within 12 months (pediatric cohort with DTI + maternal history)",
        falsification: "No correlation between prenatal EMF exposure and PFC myelination timing",
      },
      {
        id: "E-NEW-25",
        title: "EMF occupational exposure correlates with ALS risk",
        description: "Motor neurons have low Ca²⁺ buffering + Ca²⁺-permeable AMPA receptors making them selectively vulnerable to Ca²⁺ overload. Multiple meta-analyses show OR 1.3-1.7 for electrical workers. Test: pooled analysis of existing occupational cohorts controlling for confounders. Prediction: EMF exposure is an independent ALS risk factor (OR > 1.2).",
        timeline: "Testable immediately (existing meta-analyses support, need pooled re-analysis)",
        falsification: "Pooled analysis controlling for all confounders shows OR < 1.1",
      },
      {
        id: "E-NEW-26",
        title: "Gut microbiome composition changes with EMF exposure",
        description: "90%+ of serotonin is produced in gut enterochromaffin cells. EMF→circadian disruption→Per2↓→gut barrier↓ (S14) should alter microbiome. Test: 16S rRNA sequencing of gut microbiome in EMF-exposed vs controls. Prediction: EMF exposure shifts microbiome composition, specifically reducing 5-HT-producing species (Lactobacillus, Bifidobacterium).",
        timeline: "Testable within 6 months (occupational cohort with stool samples)",
        falsification: "No significant microbiome composition difference between groups",
      },
      {
        id: "E-NEW-27",
        title: "Mast cell degranulation threshold is lower in EMF-exposed individuals",
        description: "Mast cell degranulation is Ca²⁺-dependent. EMF→VGCC→Ca²⁺ should lower the activation threshold. Test: in vitro mast cell degranulation assay comparing cells from EMF-exposed vs control subjects, measuring histamine release threshold. Prediction: mast cells from EMF-exposed individuals degranulate at lower stimulation thresholds.",
        timeline: "Testable within 6 months (in vitro assay with patient-derived mast cells)",
        falsification: "No difference in degranulation threshold between groups",
      },
      {
        id: "E-NEW-28",
        title: "Vitamin D supplementation reduces EMF-induced VGCC upregulation",
        description: "Vitamin D (1,25(OH)₂D₃) downregulates CACNA1C/1D mRNA ([[ref:vdh_lvscc|J Neurosci 2001]]). Vitamin D deficiency → VGCC over-expression = same state as ELF-priming (VK4). Test: measure VGCC expression in PBMCs before/after vitamin D supplementation in deficient individuals. Prediction: vitamin D repletion reduces VGCC protein expression.",
        timeline: "Testable within 6 months (supplementation study with PBMC analysis)",
        falsification: "Vitamin D repletion does not change VGCC expression levels",
      },
      {
        id: "E-NEW-29",
        title: "Vitamin D status modulates individual EMF sensitivity",
        description: "Low vitamin D → VGCC over-expressed → more Ca²⁺ per EMF photon = higher EMF sensitivity. Test: correlate vitamin D status with EMF-induced biomarker changes (CaMKII Thr286, sleep EEG) in controlled exposure study. Prediction: vitamin D-deficient individuals show larger EMF-induced biomarker changes.",
        timeline: "Testable within 12 months (controlled EMF exposure stratified by vitamin D status)",
        falsification: "No correlation between vitamin D status and magnitude of EMF biomarker response",
      },
      {
        id: "E-NEW-30",
        title: "PEMF therapy parameters map to Ca²⁺ hormesis curve",
        description: "PEMF promotes bone growth at specific parameters while chronic EMF causes harm. Both operate through Ca²⁺ channels. Test: measure Ca²⁺ signaling in osteoblasts across PEMF parameter space (frequency, intensity, duration). Prediction: optimal PEMF parameters correspond to the Lindgren χ-parameter hormesis peak; deviation in either direction reduces benefit.",
        timeline: "Testable within 12 months (in vitro osteoblast Ca²⁺ dose-response)",
        falsification: "PEMF effects do not follow a hormesis curve through Ca²⁺ channels",
      },
      {
        id: "E-NEW-31",
        title: "Schizophrenia risk highest with CACNA1C variant + low vitamin D + high EMF",
        description: "Triple hit: CACNA1C risk variant (genetic) + vitamin D deficiency (→VGCC↑) + EMF exposure (→Ca²⁺↑) should produce highest schizophrenia risk. Test: genotype CACNA1C + measure vitamin D + estimate EMF exposure in schizophrenia case-control study. Prediction: three-way interaction is significant — triple-hit individuals have highest odds ratio.",
        timeline: "Testable within 12 months (case-control with genotyping + biomarkers)",
        falsification: "No significant three-way interaction between CACNA1C genotype, vitamin D, and EMF",
      },
    ],
    ultPredictions: [
      {
        id: "E-NEW-32",
        title: "CatSper premature activation threshold correlates with EMF exposure",
        description: "CatSper is temperature-gated (threshold 33.5°C, Q₁₀=5.1). EMF→Ca²⁺ could lower the thermal activation threshold. Test: measure CatSper activation temperature in sperm from men with different occupational EMF exposure levels. Prediction: higher EMF exposure correlates with lower CatSper activation threshold.",
        timeline: "Testable within 6 months (in vitro CatSper electrophysiology)",
        falsification: "No correlation between EMF history and CatSper activation temperature",
      },
      {
        id: "E-NEW-33",
        title: "Psilocybin reverses EMF-induced dendritic atrophy in hippocampus",
        description: "Psilocybin promotes dendritic spine growth via 5-HT2A→Ca²⁺→BDNF→mTOR (VK52). EMF→cortisol→hippocampal dendritic atrophy (VK14). Test: chronic EMF exposure → dendritic loss, then single psilocybin dose → measure dendritic recovery. Prediction: psilocybin reverses EMF-induced hippocampal dendritic loss.",
        timeline: "Testable within 12 months (rodent model: EMF exposure + psilocybin rescue)",
        falsification: "Psilocybin does not restore dendritic density after EMF-induced loss",
      },
      {
        id: "E-NEW-34",
        title: "Caffeine consumption inversely correlates with EMF biomarker response",
        description: "Caffeine blocks A2A receptors → reduces neuroinflammation → Ca²⁺ modulation. Regular caffeine consumers should show attenuated EMF biomarker responses. Test: controlled EMF exposure, stratify by caffeine consumption. Prediction: habitual caffeine consumers show smaller CaMKII Thr286 and sleep EEG changes from EMF.",
        timeline: "Testable within 6 months (add caffeine stratification to existing protocols)",
        falsification: "No difference in EMF biomarkers between caffeine consumers and non-consumers",
      },
      {
        id: "E-NEW-35",
        title: "Drinking water lithium inversely correlates with EMF-associated health outcomes",
        description: "Lithium modulates GSK-3β and CaMKII — key nodes in the BERM Ca²⁺ cascade. Areas with higher natural lithium in drinking water should show attenuated EMF health effects. Test: correlate drinking water lithium with EMF-associated disease incidence (dementia, suicide, depression) at county level. Prediction: interaction term (lithium × EMF) is significant and protective.",
        timeline: "Testable immediately (existing county-level data for lithium, EMF infrastructure, disease rates)",
        falsification: "No interaction between water lithium levels and EMF-associated health outcomes",
      },
      {
        id: "E-NEW-36",
        title: "Amygdala volume increases with chronic EMF exposure",
        description: "EMF→cortisol↑ (VK11) → amygdala BLA hypertrophy (VK55). Chronically elevated cortisol from EMF should produce measurable amygdala enlargement. Test: MRI volumetric analysis in high-EMF occupational workers vs matched controls. Prediction: amygdala volume is significantly larger in high-EMF group.",
        timeline: "Testable within 12 months (occupational cohort with MRI)",
        falsification: "No amygdala volume difference between high-EMF and low-EMF workers",
      },
      {
        id: "E-NEW-37",
        title: "Amish chronic disease gradient follows EMF exposure gradient",
        description: "Old Order Amish (no electricity) → Conservative Amish (some electricity) → Mennonite (modern electricity) → general population. Test: compare chronic disease rates across this cultural gradient. Prediction: disease rates increase monotonically with EMF exposure level, even after controlling for diet, exercise, and lifestyle factors.",
        timeline: "Testable within 12 months (cross-sectional comparison of existing health registries)",
        falsification: "Disease gradient does not follow EMF exposure after controlling for lifestyle confounders",
      },
      {
        id: "E-NEW-38",
        title: "Amish dairy cows have better fertility than modern dairy cows",
        description: "Amish dairy farms have minimal EMF. If EMF affects bovine reproduction through the same Ca²⁺ mechanisms, Amish-farm cows should show better fertility. Test: compare conception rates, services per conception, hormone profiles in Amish vs modern dairy. Prediction: Amish-farm cows have significantly better fertility despite same breeds.",
        timeline: "Testable within 6 months (existing agricultural data + hormone sampling)",
        falsification: "No fertility difference between Amish and modern dairy cows of same breed",
      },
      {
        id: "E-NEW-39",
        title: "Modern water filtration reduces lithium → increased neuropsychiatric disease",
        description: "Modern water treatment removes trace lithium. Areas that switched to advanced filtration should show increased dementia/suicide rates after the switch. Test: before-after analysis of water treatment upgrades and neuropsychiatric outcomes. Prediction: advanced filtration introduction correlates with subsequent increase in dementia and suicide rates.",
        timeline: "Testable immediately (municipal water treatment records + health data)",
        falsification: "No change in neuropsychiatric outcomes after water treatment upgrades that remove lithium",
      },
    ],
    ttypePredictions: [
      {
        id: "TTYPE-1",
        title: "EMF effects on testosterone are mediated primarily by T-type, not L-type channels",
        description: "Expose Leydig cell cultures to standardized EMF (ELF-modulated RF). Measure testosterone under three conditions: (1) Control, (2) + nifedipine (L-type blocker) isolates T-type contribution, (3) + ethosuximide (T-type blocker) isolates L-type contribution. Prediction: ethosuximide abolishes MORE of the EMF effect than nifedipine.",
        timeline: "Testable within 3–6 months (in vitro, Leydig cell culture)",
        falsification: "Nifedipine alone abolishes all EMF-induced testosterone change (no T-type contribution), or ethosuximide blocks less of the EMF effect than nifedipine",
      },
      {
        id: "TTYPE-2",
        title: "Modulated signals produce larger T-type effects than continuous wave at same SAR",
        description: "Expose Leydig cells to: (1) CW at 900 MHz, (2) same carrier amplitude-modulated at 16 Hz (Adey frequency), (3) same carrier modulated at 217 Hz (GSM). Same time-averaged SAR. Prediction: modulated signals produce LARGER effects because the ELF modulation envelope passes through membrane capacitance while the carrier does not.",
        timeline: "Testable within 3–6 months (in vitro, Leydig cell culture)",
        falsification: "CW and modulated signals produce equal testosterone effects at the same time-averaged SAR, or CW produces larger effects",
      },
    ],
    repPredictions: [
      {
        id: "REP-1",
        title: "Controlling all five parameters yields consistent EMF calcium efflux results",
        description: "Replicate Blackman's calcium efflux experiment with ALL five parameters controlled: (1) temperature 36.5±0.3°C stable, (2) blue-rich lighting documented, (3) DC field measured and oriented, (4) Faraday-shielded controls, (5) tissue developmental history documented. Prediction: results are consistent across laboratories when all five parameters match.",
        timeline: "Testable within 6–12 months (cell culture, standard equipment)",
        falsification: "Results remain inconsistent even when all five parameters are controlled and matched across laboratories",
      },
      {
        id: "REP-2",
        title: "EMF effects on insulin secretion are glucose-dependent",
        description: "Expose pancreatic β-cell lines to standardized EMF at three glucose concentrations (2.8 mM basal, 11 mM stimulatory, 25 mM supramaximal). Prediction: EMF effect is LARGEST at 11 mM (VGCCs maximally primed) and SMALLEST at 2.8 mM (VGCCs mostly closed). Tests the glucose-dependent χ prediction.",
        timeline: "Testable within 3–6 months (β-cell lines, standard glucose assay)",
        falsification: "EMF effect is equal across glucose concentrations, or largest at 2.8 mM basal",
      },
      {
        id: "REP-3",
        title: "BTB opening correlates with sperm quality decline in same animals",
        description: "RF-EMF exposure in rats with simultaneous measurement of: (1) BTB permeability (FITC-dextran tracer), (2) sperm concentration and motility, (3) tight junction protein expression (occludin, ZO-1). Time-series: 1, 4, 8, 12 weeks. Prediction: BTB permeability increases BEFORE sperm parameters decline (barrier damage precedes toxicity) and decline ACCELERATES over time (positive feedback).",
        timeline: "Testable within 3–6 months (standard rat model, FITC-dextran protocol)",
        falsification: "BTB permeability and sperm decline are simultaneous, or sperm decline precedes BTB opening",
      },
      {
        id: "REP-4",
        title: "Sentinel species sensitivity scales with metabolic rate",
        description: "Meta-analysis: compile EMF exposure thresholds across species (insects, birds, rodents, primates) and test whether threshold ∝ body_mass^(0.25). If the metabolic χ scaling is correct, smaller species show effects at lower exposure levels following Kleiber’s law.",
        timeline: "Testable immediately (meta-analysis of existing literature)",
        falsification: "No correlation between body mass and EMF effect threshold, or inverse correlation",
      },
    ],
    diffPredictions: [
      {
        id: "DIFF-1",
        title: "Prenatal EMF correlates with shorter AGD in newborn boys",
        description: "Prenatal EMF exposure correlates with shorter anogenital distance (AGD) in newborn boys. Test: measure AGD in birth cohorts with documented maternal EMF exposure. Control for phthalates, BMI, smoking. If negative, prenatal channels 1-3 are weak.",
        discriminating: true,
        critical: true,
        level: "L*",
        verified: false,
      },
      {
        id: "DIFF-2",
        title: "CACNA1C × prenatal EMF → ASD + gender-atypical development",
        description: "CACNA1C risk variant carriers with high prenatal EMF show higher rates of ASD+gender-atypical development than non-carriers with same exposure. GxE interaction test.",
        discriminating: true,
        critical: false,
        level: "L*",
        verified: false,
      },
      {
        id: "DIFF-3",
        title: "Puberty onset inversely correlates with EMF/screen time",
        description: "Puberty onset age inversely correlates with childhood EMF/screen time exposure. VERIFIED: CPP increased 3× in girls, 2× in boys ([[ref:denmark-cpp-3x-increase|Denmark 1998-2017]]). COVID screen time increase → CPP surge.",
        discriminating: false,
        critical: false,
        level: "M|C",
        verified: true,
      },
      {
        id: "DIFF-4",
        title: "Salivary oxytocin inversely correlates with EMF exposure",
        description: "Salivary oxytocin levels in adolescents inversely correlate with personal EMF exposure (phone use hours). Test: biomarker study with dosimetry.",
        discriminating: false,
        critical: false,
        level: "L*",
        verified: false,
      },
      {
        id: "DIFF-5",
        title: "Insular cortex activation differs by EMF exposure level",
        description: "Insular cortex activation patterns during interoceptive tasks differ between high-EMF and low-EMF adolescents. Test: fMRI with heartbeat detection task.",
        discriminating: false,
        critical: false,
        level: "L*",
        verified: false,
      },
      {
        id: "DIFF-6",
        title: "Gender clinic referrals correlate with technology adoption",
        description: "Gender clinic referral rates correlate with technology adoption timeline across countries. VERIFIED: Sweden +19,700%, Australia +12,650%, UK +2,457%. AFAB majority. Temporal correlation with smartphone adoption ~2010.",
        discriminating: false,
        critical: false,
        level: "L*",
        verified: true,
      },
      {
        id: "DIFF-7",
        title: "BDD prevalence increases with screen time",
        description: "Body dysmorphic disorder (BDD) prevalence increases with screen time/device use. VERIFIED: BDD prevalence rising, 'Snapchat dysmorphia' documented.",
        discriminating: false,
        critical: false,
        level: "L*",
        verified: true,
      },
    ],
    vgccPredictions: [
      {
        id: "MYOP-1",
        title: "Outdoor time protection against myopia is partially EMF-reduction mediated",
        description: "Compare myopia progression in children with identical outdoor time but different EMF exposure (Faraday-shielded vs standard outdoor areas). If EMF reduction adds to light's protective effect, it confirms the VGCC/DA channel.",
        level: "L*",
        discriminating: true,
        verified: false,
      },
      {
        id: "IMMUNE-1",
        title: "Chronic EMF exposure elevates baseline NFAT activation in T-cells",
        description: "Measure NFAT nuclear translocation in T-cells from high-EMF vs low-EMF populations matched for other factors.",
        level: "M|C",
        discriminating: false,
        verified: false,
      },
      {
        id: "HEAR-1",
        title: "Bluetooth earphone use duration correlates with subclinical hearing loss in young adults",
        description: "Control for volume level. Prediction: EMF component (Bluetooth RF) adds to acoustic damage via Cav1.3 excitotoxicity.",
        level: "M|C",
        discriminating: false,
        verified: false,
      },
      {
        id: "MIGR-1",
        title: "CACNA1I T-type variant carriers have higher EMF-triggered migraine frequency",
        description: "GxE interaction: T-type variant × EMF exposure → more cortical spreading depression events → more migraines.",
        level: "E",
        discriminating: true,
        verified: false,
      },
      {
        id: "SLEEP-2",
        title: "Sleep spindle density inversely correlates with evening EMF exposure",
        description: "Measure EEG sleep spindles in subjects with/without evening screen use. Prediction: spindle density ↓ in high-EMF group due to Cav3.3 nRt perturbation.",
        level: "M|C",
        discriminating: false,
        verified: false,
      },
      {
        id: "PCOS-1",
        title: "PCOS prevalence correlates with national EMF density controlling for BMI and diet",
        description: "Cross-national analysis. Prediction: positive correlation because 4 Modulome organs (pancreas, theca, granulosa, pituitary) converge on PCOS pathophysiology.",
        level: "M",
        discriminating: false,
        verified: false,
      },
      {
        id: "PAIN-1",
        title: "Cav3.2 blocker attenuates EMF-induced pain sensitization in animal model",
        description: "Expose rats to chronic EMF, measure pain thresholds, then administer selective Cav3.2 blocker. Prediction: blocker reverses EMF-induced hyperalgesia.",
        level: "M|C",
        discriminating: true,
        verified: false,
      },
      {
        id: "QT-1",
        title: "QTc interval positively correlates with cumulative EMF exposure in young adults",
        description: "EKG screening study with EMF dosimetry. Prediction: chronic EMF → Cav1.2 window current ↑ → action potential prolongation → measurable QTc increase.",
        level: "M|C",
        discriminating: false,
        verified: false,
      },
      {
        id: "TDP-1",
        title: "TheraBionic efficacy is abolished by co-administration of T-type Ca²⁺ channel blocker",
        description: "Already confirmed by FDA label (contraindication with CCBs). Further test: specific T-type blocker (ethosuximide) should abolish TheraBionic's anti-HCC effect while L-type blocker (nifedipine) should have less effect.",
        level: "E",
        discriminating: true,
        verified: true,
      },
      {
        id: "UNIFIED-1",
        title: "Same individual shows correlated VGCC-dependent biomarkers across systems",
        description: "In a single cohort, measure: HRV (cardiac Cav3), sleep spindle density (Cav3.3), pain threshold (Cav3.2 DRG), melatonin (CRY/Cav), sperm quality (Cav3 Leydig). Prediction: all should correlate within individuals because all share VGCC/Ca²⁺ as upstream cause.",
        level: "M",
        discriminating: true,
        verified: false,
      },
    ],
    tTfrPredictions: [
      {
        id: "T-TFR-1",
        title: "USA TFR will drop below 1.30 by 2035",
        description: "Based on testosterone threshold model: USA cumulative T loss reaches ~40% around 2030. Prediction: TFR will begin accelerating decline after 2028, dropping below 1.30 by 2035. Falsification: USA TFR remains above 1.40 in 2035.",
        discriminating: true,
        critical: true,
        level: "M|C",
        verified: false,
      },
      {
        id: "T-TFR-2",
        title: "Finland TFR will drop below 1.00 by 2032",
        description: "Finland is already past the biological threshold. Current trajectory: 1.87 (2010) → 1.26 (2024), −4.5%/year. Projection: 1.26 × 0.955^8 ≈ 0.87 by 2032. Falsification: Finland TFR stabilizes above 1.10.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "T-TFR-3",
        title: "Israel TFR will begin declining measurably by 2035",
        description: "Israel's cultural buffer has maintained TFR ~3.0 despite T decline comparable to USA. Prediction: biological threshold (~40% cumulative loss) reached ~2035, at which point even religiously motivated couples will experience subfertility. Falsification: Israel TFR remains above 2.8 in 2040.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "T-TFR-4",
        title: "Korea's $200B pronatalist spending will not raise TFR above 1.0",
        description: "Korea is past the biological threshold (~49% cumulative T loss). Social incentives cannot compensate for biological incapacity. Prediction: TFR stays below 1.0 through 2035 regardless of policy spending. Falsification: Korea TFR rises above 1.0 sustained for 3+ years.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "T-TFR-5",
        title: "T decline rate predicts TFR change better than GDP or education",
        description: "Cross-national regression: T decline rate (age-independent secular trend) predicts TFR change better than GDP, education, or urbanization alone. Testable with existing data from USA, Denmark, Finland, Israel and pending Asian studies. Falsification: GDP or education explain >80% of TFR variance after controlling for T decline.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
    ],
    causalPredictions: [
      {
        id: "CAUS-1",
        title: "BMI mediation accounts for 25–40% of total T decline",
        description: "Formal mediation analysis (Baron & Kenny or SEM) on longitudinal T data with concurrent BMI: indirect effect via BMI = 25–40% of total effect. Based on [[ref:mazur2013|Mazur 2013]] quantification (117/175 ng/dL = 67% direct). Falsification: mediation analysis shows <10% or >60% indirect effect via BMI.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "CAUS-2",
        title: "Faraday-shielded men show neither T decline nor BMI increase",
        description: "If EMF drives both T decline and BMI increase, then men in EMF-shielded environments should show attenuation of BOTH trends. Testable in occupational cohorts (submarine crews, shielded facilities). Falsification: shielded cohort shows same T decline rate as unshielded.",
        discriminating: true,
        critical: true,
        level: "M|C",
        verified: false,
      },
      {
        id: "CAUS-3",
        title: "LH decline rate correlates with EMF-proxy across countries",
        description: "[[ref:santi2025|Santi 2025]] found global LH decline. BERM predicts this is Route C/D mediated. Countries with higher EMF-proxy (residential electricity, broadband penetration) should show steeper LH decline. Testable with country-level LH data + EMF-proxy. Falsification: no correlation between EMF-proxy and LH decline rate.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
    ],
    popPredictions: [
      {
        id: "POP-1",
        title: "Amish TFR correlates inversely with distance to nearest urban area",
        description: "Within CAPED database: Amish communities closer to cities (higher ambient EMF) should have lower TFR than remote Amish communities, controlling for sect strictness and community size.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "POP-2",
        title: "Tsimane newborn AGD is longer than Trinidad (nearest city) newborn AGD",
        description: "AGD measurement in Tsimane Health and Life History Project cohort vs. urban Trinidadian comparison group. Same geographic region, different EMF exposure. If Tsimane AGD > Trinidad AGD, supports prenatal EMF → masculinization↓.",
        discriminating: true,
        critical: true,
        level: "L*",
        verified: false,
      },
      {
        id: "POP-3",
        title: "Mosetén health metrics fall between Tsimane and Western on EVERY measured variable",
        description: "Already partially confirmed (dementia, brain atrophy). Predict the same gradient for: fertility, metabolic syndrome, autoimmune markers, myopia, sleep quality. This gradient within a genetically matched population is the strongest available natural experiment.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "POP-4",
        title: "Indigenous communities adopting mobile technology show health deterioration within 5-10 years",
        description: "Longitudinal tracking of communities transitioning from no-phone to smartphone use. Predict: sleep quality↓, myopia↑, metabolic markers↑, fertility intention unchanged but biological fertility markers (hormones, sperm) ↓.",
        discriminating: true,
        critical: false,
        level: "L*",
        verified: false,
      },
    ],
    societalPredictions: [
      {
        id: "SOC-1",
        title: "Male labor force participation continues declining in all high-EMF countries",
        description: "Male labor force participation rate will continue declining in every G20 country through 2030, absent a major policy intervention (e.g. universal basic income, mandatory employment programs). The dual lock predicts that population-wide testosterone decline reduces status motivation while cortisol elevation makes workplace competition aversive — producing progressive 'opting out' behavior.",
        falsification: "Male LFP increases >2 percentage points in any G20 country without major policy change by 2030",
      },
      {
        id: "SOC-2",
        title: "Sexlessness rates correlate with smartphone adoption timing across countries",
        description: "Cross-country analysis will show a significant correlation between smartphone adoption timing (year when penetration exceeded 50%) and the onset of rising sexlessness rates among 18–30 year old males. Countries with earlier smartphone adoption (e.g. South Korea, Japan) should show earlier onset of sexlessness trends than later-adopting countries.",
        falsification: "No correlation between smartphone adoption year and sexlessness trend onset across ≥10 countries",
      },
      {
        id: "SOC-3",
        title: "Low-EMF communities show stable or rising marriage rates",
        description: "Amish and Mennonite communities — which maintain low personal EMF exposure due to restricted technology use — will show stable or rising marriage rates during 2020–2030, while US national marriage rates continue declining. This tests the dual lock's prediction that the behavioral effects (reduced approach behavior, increased avoidance) are biologically mediated, not purely cultural.",
        falsification: "Amish/Mennonite marriage rates decline at a rate comparable to the US national average during 2020–2030",
      },
    ],
    techPredictions: [
      {
        id: "PRIME-1",
        title: "ELF-primed cells show amplified RF calcium response",
        description: "Pre-expose neuronal cultures to 50 Hz ELF for 10 days (priming). Then expose to standardized RF (e.g. 2.4 GHz WiFi). Prediction: primed cells show 2–3× larger Ca²⁺ response to identical RF stimulus compared to unprimed controls. The mechanism: ELF upregulates VGCC expression ([[ref:sun2016_elf_vgcc|PMC4757866]]), making each cell more sensitive to subsequent RF activation. This is the core ELF priming prediction.",
        timeline: "Testable within 3–6 months (in vitro, standard Ca²⁺ imaging)",
        falsification: "No difference in Ca²⁺ response between ELF-primed and unprimed cells under identical RF exposure",
      },
      {
        id: "PRIME-2",
        title: "Amish (no grid priming) show minimal RF bioresponse",
        description: "Compare RF-induced biomarkers (salivary cortisol, melatonin, HRV) between Old Order Amish (no residential ELF priming) and matched modern controls after identical acute RF exposure. Prediction: Amish show significantly attenuated response because their VGCC expression is at baseline (not upregulated by 50 Hz). This explains why Amish maintain TFR ~6.1 despite occasional RF exposure from neighboring infrastructure.",
        timeline: "Testable within 1–2 years (requires Amish community cooperation)",
        falsification: "Amish show equal or greater RF bioresponse than modern controls",
      },
      {
        id: "PRIME-3",
        title: "Residential electricity consumption predicts EMF biomarkers better than mobile phone use",
        description: "In a cohort study with personal EMF dosimetry, residential electricity consumption (kWh/month) will predict chronic EMF biomarkers (melatonin suppression, sperm quality, HRV) more strongly than mobile phone usage hours. The mechanism: electricity measures the ELF priming state, which amplifies ALL subsequent exposures. Mobile phone measures only one RF source. This explains the cross-sectional finding (full-model RMSE 0.522 vs 1.053).",
        timeline: "Testable within 1–2 years (cohort study with dosimetry)",
        falsification: "Mobile phone usage is a stronger predictor of biomarkers than electricity consumption",
      },
      {
        id: "MULTI-1",
        title: "Multi-frequency exposure produces superadditive CaMKII activation",
        description: "Expose cells to: (1) 50 Hz alone, (2) 2.4 GHz alone, (3) 50 kHz IF alone, (4) all three simultaneously. Measure CaMKII autophosphorylation. Prediction: combined exposure produces CaMKII activation greater than the sum of individual exposures, because different frequencies activate different VGCC subtypes but CaMKII integrates total Ca²⁺ regardless of source.",
        timeline: "Testable within 3–6 months (in vitro, standard Western blot)",
        falsification: "Combined exposure produces additive or sub-additive CaMKII activation",
      },
      {
        id: "MULTI-2",
        title: "Recovery window elimination accelerates cumulative damage",
        description: "Expose matched cell groups to identical total EMF dose: (A) continuous multi-band (simulating modern home: 50 Hz + WiFi + LED), (B) same dose but with 8-hour nightly gap (Faraday-shielded sleep period). Prediction: group B shows significantly less cumulative CaMKII activation and less oxidative damage after 30 days, because the recovery window allows Ca²⁺ homeostasis restoration. This tests whether the 24/7 nature of modern exposure — not just the dose — drives the cumulative effect.",
        timeline: "Testable within 2–4 months (in vitro, longitudinal)",
        falsification: "No difference between continuous and gapped exposure at equal total dose",
      },
      {
        id: "MULTI-5",
        title: "WiFi beacon 10 Hz pulse produces ELF-like biological effects independent of carrier",
        description: "WiFi routers emit a 10 Hz beacon pulse even when no data is transmitted (Schmid 2012). The beacon's crest factor is 100:1 — peak power is 100× higher than average (Schmid 2020). Prediction: an isolated 10 Hz pulsed signal at WiFi beacon intensity produces ELF-type biological effects (melatonin suppression, EEG alpha changes) comparable to a continuous 10 Hz sinusoidal field, despite SAR being negligible. This tests whether SAR systematically underestimates WiFi exposure by measuring average instead of peak.",
        timeline: "Testable within 3–6 months (EEG/melatonin study)",
        falsification: "WiFi beacon pulse produces no ELF-type biological effects, or effects scale with SAR not peak",
      },
      {
        id: "TECH-LED",
        title: "EU LED transition countries show steeper sperm decline than late-adopting countries",
        description: "The EU [[ref:eu_regulation_244_2009|Directive 244/2009]] forced incandescent ban between 2009–2012, mandatory LED adoption. Prediction: EU countries show a statistically significant acceleration in sperm quality decline starting 2012–2015 compared to countries that adopted LED lighting later (e.g. some Asian, African countries). This tests whether the IF channel (20–300 kHz LED driver frequencies) contributes independently to reproductive decline beyond the RF channel.",
        timeline: "Testable immediately (existing meta-analysis data)",
        falsification: "No acceleration difference between early and late LED-adopting countries",
      },
      {
        id: "TECH-EV",
        title: "EV drivers show higher IF-band biomarkers than ICE vehicle drivers",
        description: "Electric vehicle inverters produce 5–50 kHz IF fields in the cabin. Compare IF-relevant biomarkers (testicular function, HRV during driving) between matched EV and internal combustion engine (ICE) vehicle drivers with equivalent daily commute times. The Israeli patent US12379429 (active field cancellation for EV cabins) demonstrates that industry recognizes in-cabin fields as problematic. Prediction: EV drivers show measurably higher oxidative stress markers and lower HRV during driving compared to ICE drivers.",
        timeline: "Testable within 1–2 years (cohort study with dosimetry)",
        falsification: "No difference in any biomarker between EV and ICE drivers, or ICE drivers show worse markers",
      },
    ],
    layerPredictions: [
      {
        id: "LAYER-1",
        title: "Countries adopting LED later show later health acceleration",
        description: "EU LED mandate 2009–2012 forced IF channel opening. Countries that resisted or delayed LED adoption should show later IF-specific health effects (metabolic, sleep). Testable with country-level LED market share timelines vs health data acceleration points.",
        falsification: "No temporal correlation between LED adoption timing and health trend inflection points",
      },
      {
        id: "LAYER-2",
        title: "Content restrictions do NOT reduce teen mental health crisis",
        description: "If 2012 inflection is DEVICE (EMF) not CONTENT (social media), then banning social media for teens while allowing smartphone use will not reduce depression/anxiety rates. Australia's social media ban (2024) is the direct test. Norway's age verification is a secondary test.",
        falsification: "Australian social media ban produces >20% reduction in teen depression within 3 years",
        critical: true,
      },
      {
        id: "LAYER-3",
        title: "Developing country epidemics follow electrification timeline, not GDP",
        description: "For 20+ developing countries: T2D/obesity onset year correlates more strongly with electrification date (year electricity access exceeded 50%) than with GDP crossing any threshold. China T2D: 1.3% (1980) → 8.7% (2014) parallels electrification 60%→100%, not GDP per se.",
        falsification: "GDP crossing correlates more strongly than electrification date across 20+ countries",
      },
      {
        id: "LAYER-4",
        title: "EV professional drivers show IF-specific health effects by 2035",
        description: "Taxi/delivery drivers using EVs 8+ hours/day accumulate IF exposure (inverter 5–50 kHz in cabin). Predicted effects: metabolic, reproductive, cardiac — at higher rates than ICE vehicle drivers matched for sedentary time. Israeli patent US12379429 demonstrates industry awareness.",
        falsification: "No difference between EV and ICE professional drivers after 10 years on any metabolic or reproductive metric",
      },
      {
        id: "LAYER-5",
        title: "Starlink coverage eliminates last EMF-free control populations by 2035",
        description: "Tsimane, Hadza, and comparable populations will begin showing RF background exposure from LEO satellite constellations. Their health metrics will begin converging toward industrialized patterns within 10–15 years of exposure onset. IRREVERSIBLE loss of verification capacity.",
        falsification: "Starlink-covered indigenous populations show no health metric changes within 15 years",
      },
      {
        id: "LAYER-6",
        title: "The next major epidemic is IF-specific",
        description: "LED drivers + EV inverters + induction cookers + wireless charging all operate at 20–300 kHz. This is the fastest-growing and least-regulated EMF band. IF-specific health effects (distinct from ELF or RF) will emerge as a recognized category by 2035. TTFields (FDA-approved, 200 kHz) already demonstrates IF bioactivity.",
        falsification: "No IF-specific health effects identified despite increasing IF exposure by 2035",
      },
      {
        id: "LAYER-7",
        title: "COVID lockdown T2D acceleration correlates with EMF-at-home intensity",
        description: "Workers who were remote (high home EMF: WiFi+LED 24h/day, multiple devices, no commute recovery) show greater T2D acceleration than workers who continued commuting (mixed EMF environments with outdoor recovery time). Recovery_deficit is the distinguishing variable, not just sedentary time.",
        falsification: "Remote workers show same or lower T2D acceleration than commuters after controlling for physical activity",
      },
    ],
    investigationPredictions: [
      { id: "SEASON-1", title: "SAD correlates with latitude × EMF, not latitude alone", description: "SAD/depression prevalence should correlate with latitude × EMF density interaction, not with latitude as a standalone predictor. High-latitude, low-EMF communities (Amish in northern US, rural Scandinavia pre-electrification) should show lower SAD than predicted by latitude alone.", falsification: "Latitude alone predicts SAD as well as latitude × EMF interaction term" },
      { id: "SEASON-2", title: "EMF-free bedroom benefit is larger in winter", description: "The health benefit of sleeping in an EMF-free environment (Faraday cage, airplane mode, no WiFi) should be measurably LARGER in winter months at high latitudes, because CRY magnetoreceptor sensitivity is higher when ambient light is reduced.", falsification: "No seasonal variation in EMF-free sleep benefit, or benefit is larger in summer" },
      { id: "GEN-1", title: "CACNA1C A-allele frequency predicts population EMF sensitivity", description: "Populations with higher CACNA1C rs1006737 A-allele frequency show steeper health decline per unit EMF exposure. This predicts population-level variation in EMF sensitivity that is genetic, not cultural.", falsification: "No correlation between A-allele frequency and rate of EMF-associated health changes across populations" },
      { id: "GEN-2", title: "A/A genotype shows stronger EMF response than G/G", description: "In controlled EMF exposure studies, individuals with CACNA1C rs1006737 A/A genotype show larger physiological responses (sleep EEG, HRV, calcium markers) than G/G genotype individuals. Already supported by [[ref:sousouri2025|Sousouri 2025]] (ETH) for 5G sleep response.", falsification: "No genotype-dependent difference in EMF response in multiple independent controlled studies" },
      { id: "WATER-1", title: "Island and coastal populations show higher EMF sensitivity", description: "Water's dielectric constant (~80 vs air ~1) amplifies electric field conduction. Island nations and coastal populations may show higher EMF-associated health effects per unit exposure than inland populations. Japan (island, highest ASD globally) is consistent but not proof.", falsification: "No coastal/inland difference in EMF-associated health metrics after controlling for other variables" },
      { id: "BUILD-1", title: "Wood buildings produce better health outcomes than concrete", description: "Reinforced concrete reflects RF internally, increasing indoor field strength. Wood is RF-transparent. Occupants of wood buildings should show better sleep, lower stress markers, and better cardiovascular metrics than concrete building occupants, beyond what biofiilia theory predicts.", falsification: "No difference after controlling for socioeconomic factors, or concrete outperforms wood" },
      { id: "RECOV-1", title: "EMF-free bedroom increases melatonin within 2 weeks", description: "Removing all EMF sources from the bedroom (WiFi router, phone, LED lights) and sleeping in an EMF-reduced environment should produce measurable melatonin increases within 2 weeks, even without any other lifestyle change.", falsification: "No melatonin change after 4 weeks of EMF-free sleep environment" },
      { id: "RECOV-2", title: "Minimum recovery window: 4–6 hours EMF-free", description: "CaMKII dephosphorylation kinetics predict a minimum EMF-free period of 4–6 hours for meaningful Ca²⁺ homeostasis restoration. Less than 4 hours provides negligible recovery; more than 6 hours shows diminishing returns.", falsification: "No dose-response relationship between EMF-free hours and recovery markers" },
      { id: "PRENATAL-1", title: "First trimester EMF exposure correlates with ASD risk", description: "CACNA1C is critical for synaptogenesis. Prenatal Ca²⁺ disruption during developmental windows → timing errors → ASD/ADHD phenotype. Kaiser Permanente (Li et al. 2017) already showed prenatal EMF → ASD risk. First trimester should show strongest effect.", falsification: "No trimester-specific difference in EMF-ASD association" },
      { id: "MULTI-SEAS", title: "Winter × high EMF produces worst health outcomes", description: "The interaction of winter (high CRY sensitivity) and high EMF exposure should produce the worst health outcomes — worse than either factor alone. Nordic countries in winter should show peak EMF sensitivity.", falsification: "No interaction effect between season and EMF level on health outcomes" },
    ],
    sentinelPredPredictions: [
      { id: "SENT-1", title: "EMF × pesticide interaction is superadditive", description: "Combined EMF + pesticide exposure produces more severe effects than either alone. The interaction is superadditive because pesticides stress cells → Ca²⁺ dysregulation → EMF sensitivity increases. [[ref:lupi2021|Lupi 2021]] already demonstrated this in bee biochemical and behavioral markers.", falsification: "Combined effects are merely additive or sub-additive in multiple species" },
      { id: "SENT-2", title: "Bumblebee decline correlates with WiFi density", description: "Bumblebee population decline should correlate with local WiFi access point density, independent of pesticide use and habitat loss. [[ref:bumble_rf2025|New 2025 study]] already showed RF reduces bumblebee flower visitation.", falsification: "No correlation between WiFi density and bumblebee populations after controlling for pesticides" },
      { id: "SENT-3", title: "LED streetlights cause more insect decline than sodium (IF component)", description: "[[ref:boyes2021|Boyes 2021]] found LED streetlights reduced insect abundance by 52% vs sodium's 41%. The 11% difference is not explained by light spectrum alone — LED's IF emission (from SMPS drivers, 20–300 kHz) adds an EMF exposure channel that sodium lacks.", falsification: "Faraday-shielded LED shows same insect decline as unshielded LED (ruling out IF component)" },
      { id: "SENT-4", title: "Migratory birds decline faster than resident species", description: "Migratory birds depend on CRY-based magnetoreception for navigation. RF disrupts CRY. Therefore migratory species should show steeper population decline than resident species in the same habitat, independent of habitat loss.", falsification: "Resident species decline as fast or faster than migratory species in shared habitats" },
      { id: "SENT-5", title: "Faraday-shielded beehives produce more honey", description: "Bee colonies in Faraday-shielded hives (blocking ambient RF/ELF) should produce measurably more honey, show lower colony loss rates, and demonstrate better navigation (fewer lost foragers) than unshielded hives in the same location.", falsification: "No difference in honey production or colony survival between shielded and unshielded hives" },
      { id: "SENT-6", title: "Frog populations survive near EMF-free areas", description: "Frog populations should persist in areas with minimal power grid infrastructure and low RF background, while declining in electrified areas — even controlling for habitat quality, water contamination, and UV exposure. Frogs' moist skin provides direct environmental Ca²⁺ coupling.", falsification: "Frog decline is equally severe in low-EMF and high-EMF areas after controlling for habitat" },
    ],
    supplementPredictions: [
      { id: "SHIFT-1", title: "Faraday bedroom improves shift worker outcomes", description: "Shift workers who sleep in a Faraday-shielded bedroom (EMF-free) show better melatonin recovery and less metabolic syndrome than shift workers sleeping in conventional bedrooms — with the same total sleep time. The difference isolates the EMF component from the sleep deprivation component.", falsification: "No difference in metabolic or hormonal outcomes between shielded and unshielded bedrooms for shift workers" },
      { id: "SHIFT-2", title: "Shift work health effects worse in winter", description: "Shift work health effects (metabolic syndrome, depression, cardiovascular risk) should be measurably worse during winter months at high latitudes, because CRY magnetoreceptor sensitivity is higher when ambient light is reduced — amplifying EMF disruption during the critical night shift period.", falsification: "No seasonal variation in shift work health outcomes, or effects are worse in summer" },
      { id: "SHIFT-3", title: "Shift work MetS OR exceeds sleep deprivation OR", description: "The metabolic syndrome odds ratio for shift workers (OR 2.17) exceeds what pure sleep deprivation alone would predict. The excess risk is attributable to the EMF component: LED IF exposure during melatonin peak hours and eliminated recovery window.", falsification: "Sleep deprivation alone fully accounts for shift work MetS risk with no residual" },
      { id: "INDOOR-1", title: "Indoor workers have higher MetS than outdoor workers after activity matching", description: "Indoor workers (office, data center) show higher metabolic syndrome prevalence than outdoor workers (farmers, fishermen) even after matching for physical activity level. The difference is attributable to cumulative EMF exposure differential.", falsification: "No MetS difference between physically active indoor and outdoor workers" },
      { id: "INDOOR-2", title: "Indoor workers have lower melatonin than outdoor workers after light matching", description: "Indoor workers show lower nighttime melatonin levels than outdoor workers even after controlling for light exposure patterns. The residual difference reflects EMF exposure from office WiFi, LED lighting IF, and device proximity.", falsification: "No melatonin difference after controlling for light exposure" },
      { id: "POCKET-1", title: "Breast pocket users have better sperm quality than hip pocket users", description: "Men who carry their phone in a breast pocket show better sperm quality than men who carry it in a hip/front pocket — despite the same total usage time. The difference is explained by testes being in the near-field only for hip pocket users.", falsification: "No difference in sperm quality by pocket position with matched usage time" },
      { id: "POCKET-2", title: "Sperm decline acceleration correlates with data usage, not voice calls", description: "The doubling of sperm decline rate (1.16%→2.64%/yr after 2000) correlates with 3G/4G data adoption (phone stays in pocket continuously) rather than 2G voice call adoption (phone held to ear during calls only). This is a behavioral exposure change, not a technology power change.", falsification: "Sperm decline rate correlates with voice call volume rather than data usage patterns" },
      { id: "FREQ-1", title: "50 Hz countries show slightly stronger CRY-dependent effects than 60 Hz countries", description: "50 Hz (Europe) is within 2 Hz of the 8th Schumann resonance harmonic (52.0 Hz), potentially producing stronger CRY interference. European populations may show slightly stronger CRY-dependent cascade effects (melatonin suppression, depression) than American populations at matched total EMF levels.", falsification: "No difference in CRY-dependent endpoints between 50 Hz and 60 Hz countries at matched EMF" },
      { id: "REPL-1", title: "Retrospective moderator analysis predicts positive vs. null EMF studies", description: "A retrospective analysis of 50–100 published EMF bio-assay studies, coding for study month, laboratory latitude, building material, and subject background, will show that these four moderators significantly predict whether a study found a positive or null result. This is testable WITHOUT new data.", falsification: "Moderator variables do not predict study outcomes in logistic regression (p > 0.05)" },
      { id: "REPL-2", title: "Future study controlling all 7 moderators replicates consistently regardless of laboratory", description: "Winter + CACNA1C-genotyped + low lab-ELF + EMF-free sleep + chronic + pulsed + real device = positive result in EVERY lab.", falsification: "Fully controlled study still fails to replicate" },
      { id: "REPL-3", title: "CACNA1C AA-genotype individuals show measurable melatonin suppression from residential WiFi in winter at 60°N", description: "Most specific single prediction combining 3 moderators: genotype + season + exposure.", falsification: "No melatonin difference between AA and GG in winter WiFi exposure" },
      { id: "REPL-4", title: "9-hour EMF-free sleep produces measurable DNA repair vs 0-hour (WiFi on, phone in bed)", description: "Ivancsits showed 9h recovery. Subjects sleeping EMF-free show lower comet tail factor than subjects sleeping with WiFi.", falsification: "No difference in DNA damage markers between EMF-free and WiFi-exposed sleep" },
    ],
    geneticPredictions: [
      { id: "GENE-MTNR1B-1", title: "MTNR1B GG carriers show larger T2D risk increase per unit EMF than AA carriers", description: "rs10830963 G-allele → more MT2 receptors → β-cells hypersensitive to melatonin changes. EMF-induced melatonin suppression differentially affects GG carriers. The gene × EMF interaction is SUPERADDITIVE: EMF 'activates' the genetic risk that would be latent in a normal melatonin environment.", falsification: "No genotype × EMF interaction on T2D incidence in biobank analysis" },
      { id: "GENE-CRY1-1", title: "CRY1Δ11 carriers show worse sleep outcomes under residential EMF than non-carriers", description: "CRY1Δ11 (rs184039278, 0.6% frequency) lengthens the circadian period. EMF disrupts CRY → the effects are ADDITIVE: genetic lengthening + EMF disruption = longer sleep latency, shorter recovery window, and worse metabolic outcomes.", falsification: "No difference in sleep or metabolic outcomes between CRY1Δ11 carriers and non-carriers under matched EMF exposure" },
      { id: "GENE-COMT-1", title: "COMT Val/Val individuals show greater EMF-associated depression risk than Met/Met", description: "Val/Val = fast dopamine clearance = low DA baseline. EMF-induced dopamine synthesis reduction hits harder (smaller buffer). Met/Met has a higher baseline DA buffer → more resilient to EMF-induced DA reduction.", falsification: "No COMT genotype × EMF interaction on depression prevalence" },
      { id: "GENE-CACNA1D-1", title: "CACNA1D GoF carriers show higher tinnitus rates with Bluetooth earphone use", description: "Cav1.3 GoF → inner ear hypersensitivity. Bluetooth earphones activate Cav1.3 in hair cells → Ca²⁺ overload. GoF carriers reach damage threshold at lower exposure levels → tinnitus earlier.", falsification: "No association between CACNA1D genotype and tinnitus in Bluetooth users" },
      { id: "GENE-COMORBID-1", title: "Depression-T2D comorbidity is higher in CACNA1C AA + MTNR1B GG compound carriers", description: "Both conditions arise from the same melatonin suppression pathway acting in different organs (brain vs. pancreas). Compound carriers of CACNA1C rs1006737 AA (more Ca²⁺ influx → more melatonin suppression) and MTNR1B rs10830963 GG (β-cells hypersensitive to melatonin) should show the highest comorbidity rate.", falsification: "Depression-T2D comorbidity does not stratify by CACNA1C × MTNR1B genotype" },
      { id: "GENE-INTERACT-1", title: "CRY1Δ11 + MTNR1B GG compound carriers show specifically elevated morning fasting glucose", description: "CRY1Δ11 delays melatonin offset → morning melatonin still elevated. MTNR1B GG → β-cells hypersensitive to this elevated morning melatonin → insulin suppression specifically in the morning → fasting glucose elevated.", falsification: "No CRY1 × MTNR1B interaction on morning fasting glucose" },
      { id: "GENE-EHS-1", title: "EHS patients have higher CACNA GoF + lower SLC8A1/ATP2B function than matched controls", description: "EHS is a polygenic calcium threshold disorder: high influx (CACNA GoF) + slow extrusion (SLC8A1/ATP2B LoF) = Ca²⁺ accumulates → CaMKII threshold crossed at lower EMF. Genotyping EHS cohorts for these 15 genes will show enrichment of high-influx/slow-extrusion combinations.", falsification: "No calcium channel gene enrichment in EHS cohorts vs. matched controls" },
      { id: "GENE-PRS-1", title: "A 15-gene polygenic risk score predicts EMF sensitivity in controlled exposure studies", description: "Combining CACNA1C, CACNA1H, CACNA1D, CACNA1A, CACNA1B, CACNA2D1, CAMK2A, CAMK2B, SLC8A1, ATP2B1, ATP2B2, CRY1, CRY2, MTNR1B, and COMT into a single PRS should predict the magnitude of biological response to standardized EMF exposure.", falsification: "PRS does not correlate with measured EMF response in controlled exposure" },
      { id: "GXEMF-1", title: "Gene × EMF interactions are superadditive across populations", description: "Genetic risk (MTNR1B GG T2D risk ~1.5×) × EMF risk (~1.3×) produces observed risk ~2.5× (> 1.5 × 1.3 = 1.95×). EMF 'activates' genetic risks that would be latent in EMF-free environments. Testable via biobank stratification by residential EMF exposure.", falsification: "Gene × EMF interaction is purely multiplicative (no superadditivity)" },
      { id: "GXEMF-2", title: "Gabapentinoid users show reduced EMF sensitivity via α2δ-1 blockade", description: "Pregabalin/gabapentin bind α2δ-1 → block VGCC trafficking to synapses → lower synaptic VGCC density → reduced ELF priming effect. Gabapentinoid users should show attenuated biological responses to EMF exposure compared to matched non-users.", falsification: "No difference in EMF response between gabapentinoid users and non-users" },
      { id: "GXEMF-3", title: "CaMKII Thr286 autophosphorylation level in lymphocytes correlates with subjective EMF sensitivity", description: "CaMKII autophosphorylation at Thr286 is measurable in peripheral lymphocytes. Higher baseline autophosphorylation = closer to threshold = more sensitive to EMF. This could be the first OBJECTIVE biomarker for EHS.", falsification: "No correlation between lymphocyte CaMKII autophosphorylation and reported EMF sensitivity" },
      { id: "GENE-A2D-1", title: "α2δ-1 expression level predicts individual ELF priming magnitude", description: "CACNA2D1 encodes α2δ-1, the bottleneck for VGCC trafficking. Individuals with higher baseline α2δ-1 expression should show faster VGCC density increase under ELF exposure (faster priming).", falsification: "No correlation between α2δ-1 expression and VGCC density change under ELF" },
      { id: "GENE-A2D-2", title: "Pregabalin pre-treatment blocks ELF-induced VGCC upregulation in cell culture", description: "If α2δ-1 is the molecular mediator of ELF priming ([[ref:sun2016_elf_vgcc|PMC4757866]]), then pregabalin (which binds α2δ-1) should prevent the VGCC density increase observed after 8-10 days of 50/60 Hz exposure.", falsification: "Pregabalin does not prevent ELF-induced VGCC upregulation" },
      { id: "GENE-CAMK2-1", title: "CAMK2A GoF mutation phenotype matches BERM population-level prediction", description: "CAMK2A GoF mutations that increase Thr286 autophosphorylation produce epilepsy, intellectual disability, and autism ([[ref:kury2017_camk2|Küry 2017]]). BERM predicts EMF increases population-level autophosphorylation → same phenotypes at population level. Genetic validation of the mechanism.", falsification: "CAMK2A GoF phenotypes do not match EMF-predicted population health trends" },
      { id: "GENE-CAMK2-2", title: "Lymphocyte CaMKII autophosphorylation is higher in high-EMF urban residents than rural controls", description: "Urban residents (higher cumulative EMF) should show higher baseline CaMKII Thr286 autophosphorylation in peripheral lymphocytes than rural controls matched for age, diet, and activity.", falsification: "No urban-rural difference in lymphocyte CaMKII autophosphorylation" },
      { id: "GENE-NETWORK-1", title: "Multi-gene calcium channel polymorphism interaction predicts neurodevelopmental outcomes", description: "[[ref:korean2025_cacna|Korean 2025 study]] showed CACNA1A + CACNA1C + CACNA1H polymorphisms interact in pediatric DD/epilepsy. BERM predicts this extends to all 5 influx genes: compound carriers of multiple CACNA risk alleles show disproportionately higher neurodevelopmental risk.", falsification: "No multi-gene interaction effect beyond individual gene effects" },
    ],
  },
  fr: {
    title: "Prédictions verrouillées",
    subtitle: "Ces prédictions ont été verrouillées sous l'architecture d'exposition scalaire BERM v17. Elles sont falsifiables : chacune sera comparée aux données observées à l'année indiquée.",
    tfrTitle: "Prédictions TFR",
    tfrLead: "Prédictions de l'indice synthétique de fécondité par pays et mondial, avec enveloppes de sensibilité paramétriques (et non des intervalles de confiance).",
    bioTitle: "Prédictions de biomarqueurs",
    bioLead: "Prédictions de concentration spermatique et de ratio de masculinité dérivées de la même architecture de modèle.",
    v2Title: "Statut des prévisions BERM v17",
    v2Status: "Aucune prévision calibrée par FieldState au niveau national n'est publiée. La voie actuelle nécessite un FieldState local adapté, des points de terminaison organe-couple enregistrés, une modélisation ASFR et une validation temporelle externe.",
    v2Note: "Lorsque les prédictions calibrées par FieldState seront prêtes, elles seront publiées parallèlement à ces prédictions par proxy scalaire pour comparaison.",
    histTitle: "Prédictions historiques / évolutionnaires",
    histLead: "Prédictions dérivées du modèle χ imbriqué et de l'hypothèse Northern Package. Elles testent si les profils biologiques χ spécifiques aux populations modulent la relation EMF-fécondité.",
    r43Title: "R43 : Résonance de l'enveloppe du protocole",
    r43Text: "[[ref:zandieh2025|Zandieh et al. (2025)]] rapporte des observations mitochondriales/ROS dépendantes de la fréquence dans des expériences ELF sur cellules cancéreuses (0,01-5 Hz ; jusqu'à 100 mT). Cela soutient un protocole exploratoire de PSD mesuré pour tester si la modulation de l'enveloppe de la couche réseau produit une réponse cellulaire. Cela n'établit pas les effets d'enveloppe du réseau RF, la causalité eDRX ni un paramètre reproductif/TFR.",
    country: "Pays",
    year: "Année",
    metric: "Métrique",
    prediction: "Prédiction",
    sensitivity: "Sensibilité",
    version: "Version",
    locked: "Verrouillé",
    statusLabel: "Statut",
    history: "Historique des versions",
    sentinelTitle: "Prédictions de cascade sentinelle",
    sentinelLead: "Prédictions de décalage inter-espèces dérivées du panel abeille-TFR CSLI de 31 pays. Elles testent si le déclin des espèces sentinelles précède le déclin de la fécondité humaine avec un décalage verrouillé.",
    architectureNote: "Note d'architecture",
    architectureText: "Ces prédictions utilisent l'architecture d'exposition cumulative scalaire (v17). La pénétration mobile entre comme proxy de chronologie d'adoption technologique. L'enveloppe de sensibilité fait varier un paramètre à la fois ; ce n'est pas un intervalle de confiance probabiliste.",
    ciExceededTitle: "Analyse de falsification à trois branches",
    finlandFalsification: "Statut : IC DÉPASSÉ (observé ~1,30, borne supérieure 1,24). Trois explications possibles dans le cadre BERM : (a) Le modèle surestime l'effet biologique en Finlande — la relation exponentielle EMF-TFR peut saturer plus tôt que modélisé. (b) Compensation exogène : la contribution TFR de l'immigration est plus importante qu'estimée — le TFR des immigrants finlandais (~1,8-2,2) peut élever le TFR national. (c) IC trop étroit : les bandes d'incertitude du modèle sous-estiment la variation stochastique du TFR en petite population. Test discriminant : comparer le TFR des natifs (si disponible) à la prédiction. Si le TFR natif ≤ 1,24, l'explication (b) est confirmée.",
    southKoreaFalsification: "Statut : ZONE DE RISQUE IC (observé ~0,80, borne supérieure 0,72). Trois explications possibles : (a) Le modèle surestime la suppression EMF en Corée — des facteurs culturels/politiques ont des effets négatifs indépendants sur le TFR. (b) Décalage de mesure : les politiques natalistes (transferts, subventions logement) ont temporairement élevé le TFR. (c) L'estimation de récupération du modèle pour la Corée est trop optimiste. Test discriminant : suivre si le TFR coréen continue de baisser vers la valeur prédite.",
    modulomeTitle: "Prédictions du modulome",
    modulomeLead: "Prédictions mécanistiques dérivées du modulome EMF à huit couches et des preuves de dispositifs thérapeutiques. Ce sont des prédictions qualitatives et falsifiables — chacune spécifie un résultat expérimental concret.",
    modulomeTimeline: "Chronologie",
    modulomeFalsification: "Critère de falsification",
    modulomeLocked: "Verrouillé : 2026-08-21",
    modulomeStatus: "VERROUILLÉ — en attente de test",
    cascadeTitle: "Prédictions de cascade de maladies",
    cascadeLead: "Prédictions dérivées du modèle de cascade de maladies chroniques à quatre canaux. Chacune teste si la cascade de sept maladies suit la hiérarchie de latence biologique du modulome et les schémas d'exposition spécifiques aux canaux.",
    cascadeValidation: "Validation",
    cascadeFalsification: "Critère de falsification",
    cascadeLocked: "Verrouillé : 2026-08-22",
    cascadeStatus: "VERROUILLÉ — en attente de test",
    cascadeLink: "Voir la visualisation de la cascade",
    nutritionalTitle: "Prédictions de modulation CRY nutritionnelle",
    nutritionalLead: "Prédictions dérivées du modèle CRY à double système et de ses modulateurs nutritionnels (FAD/B2, acides gras oméga, dynamiques de jeûne AMPK). Elles testent si l'efficacité de la voie C est modifiable par intervention nutritionnelle.",
    nutritionalTimeline: "Chronologie",
    nutritionalFalsification: "Critère de falsification",
    nutritionalLocked: "Verrouillé : 2026-08-24",
    nutritionalStatus: "VERROUILLÉ — en attente de test",
    metabTitle: "Prédictions du syndrome métabolique",
    metabLead: "Prédictions dérivées du modèle EMF → syndrome métabolique à six voies. La convergence CaMKII prédit que l'obésité, le diabète et les perturbations du métabolisme énergétique partagent une cause commune en amont, testable par le blindage, la pharmacologie et l'épidémiologie. L'obésité est multifactorielle — ces prédictions testent si l'EMF est un facteur contributif.",
    metabTimeline: "Chronologie",
    metabFalsification: "Critère de falsification",
    metabLocked: "Verrouillé : 2026-08-25",
    metabStatus: "VERROUILLÉ — en attente de test",
    trpc1Title: "Prédictions de séparation pharmacologique des voies",
    trpc1Lead: "Prédictions testant l'indépendance de la voie A (VGCC) et de la branche calcique TRPC1 de la voie C. Le complexe CRY2-TRPC1 ([[ref:yap2025|Yap et al. 2025]]) prédit que les effets reproductifs EMF peuvent être pharmacologiquement décomposés en composantes dépendantes du VGCC et du TRPC1.",
    trpc1Timeline: "Chronologie",
    trpc1Falsification: "Critère de falsification",
    trpc1Locked: "Verrouillé : 2026-08-24",
    trpc1Status: "VERROUILLÉ — en attente de test",
    pharmTitle: "Prédictions pharmacologiques",
    pharmLead: "Prédictions dérivées de l'argument de convergence pharmacologique. Si l'activation VGCC est le mécanisme principal de transduction EMF, des classes de médicaments spécifiques devraient produire des différences mesurables aux points de terminaison associés à l'EMF. Elles exploitent les bases de données de prescriptions existantes — aucune nouvelle exposition médicamenteuse n'est requise.",
    pharmTimeline: "Chronologie",
    pharmFalsification: "Critère de falsification",
    pharmLocked: "Verrouillé : 2026-08-26",
    pharmStatus: "VERROUILLÉ — en attente de test",
    modIntTitle: "Prédictions d'intégration du modulome",
    modIntLead: "Prédictions dérivées de l'intégration du modulome — hub hypophysaire, amplification ROS mitochondriale, tampon redox, HRV autonome, barrières placentaires et interactions thyroïde-EMF. Elles testent si les tissus cibles et mécanismes EMF identifiés produisent les effets en aval prédits.",
    modIntTimeline: "Chronologie",
    modIntFalsification: "Critère de falsification",
    modIntType: "Type",
    modIntDiscriminating: "Discriminant",
    modIntLocked: "Verrouillé : 2026-08-24",
    modIntStatus: "VERROUILLÉ — en attente de test",
    sidsTitle: "Prédictions de vulnérabilité infantile et SMIN",
    sidsLead: "Prédictions dérivées du cadre calcique BERM appliqué à la vulnérabilité cardiorespiratoire infantile. Elles testent si la génétique des canaux ioniques, l'exposition EMF nocturne et la dynamique circadienne du Ca²⁺ contribuent au risque de SMIN par les mêmes voies identifiées dans les populations adultes.",
    sidsNote: "Ces prédictions abordent un sujet sensible. BERM propose une hypothèse mécanistique — pas une explication prouvée. Les mesures protectrices connues (couchage dorsal, évitement du tabac, allaitement) restent les interventions les plus importantes.",
    sidsTimeline: "Chronologie",
    sidsFalsification: "Critère de falsification",
    sidsLocked: "Verrouillé : 2026-08-26",
    sidsStatus: "VERROUILLÉ — en attente de test",
    sidsResTitle: "Prédictions du modèle de résonance SMIN",
    sidsResLead: "Prédictions dérivées du modèle de résonance à facteur Q : le cerveau néonatal comme oscillateur non amorti (GABA excitateur via NKCC1>KCC2), avec le SMIN comme point terminal fatal d'un spectre d'impact neurodéveloppemental.",
    sidsResNote: "Ces prédictions abordent un sujet sensible. BERM propose une hypothèse mécanistique — pas une explication prouvée. Les mesures protectrices connues (couchage dorsal, évitement du tabac, allaitement) restent les interventions les plus importantes.",
    sidsResTimeline: "Chronologie",
    sidsResFalsification: "Critère de falsification",
    sidsResLocked: "Verrouillé : 2026-08-26",
    sidsResStatus: "VERROUILLÉ — en attente de test",
    neuroTitle: "Prédictions du spectre neurologique",
    neuroLead: "Prédictions dérivées du modèle de spectre à facteur Q unifiant SMIN, épilepsie, SUDEP, migraine et céphalée en grappes par un mécanisme d'oscillation dépendant du Ca²⁺ avec amortissement variable.",
    neuroTimeline: "Chronologie",
    neuroFalsification: "Critère de falsification",
    neuroLocked: "Verrouillé : 2026-08-26",
    neuroStatus: "VERROUILLÉ — en attente de test",
    metalTitle: "Prédictions de synergie métaux lourds et convergence",
    metalLead: "Prédictions dérivées du processus de vérification de convergence, couvrant la synergie métaux lourds × EMF, la calcification pinéale, la chaîne photon→population et les études d'intervention.",
    metalTimeline: "Chronologie",
    metalFalsification: "Critère de falsification",
    metalLocked: "Verrouillé : 2026-08-26",
    metalStatus: "VERROUILLÉ — en attente de test",
    mechTitle: "Prédictions de chaîne mécanistique",
    mechLead: "Prédictions des couches intermédiaires nouvellement vérifiées : barrière hémato-encéphalique, tissu adipeux brun, axe HPA, dynamiques insuliniques des cellules β, nexus hypothalamique, cortisol-hippocampe, cellules de Leydig et dégranulation des mastocytes.",
    mechTimeline: "Chronologie",
    mechFalsification: "Critère de falsification",
    mechLocked: "Verrouillé : 2026-08-26",
    mechStatus: "VERROUILLÉ — en attente de test",
    suppTitle: "Prédictions des couches supplémentaires (VK17-25)",
    suppLead: "Prédictions des couches nouvellement vérifiées : Ca²⁺ spermatique/CatSper, horloge circadienne, motivation dopaminergique, myélinisation OPC, immunité NK, suppression croisée HPA-HPG, hormèse BDNF, axe intestin-cerveau et lien Walker sommeil-testostérone.",
    suppTimeline: "Chronologie",
    suppFalsification: "Critère de falsification",
    suppLocked: "Verrouillé : 2026-08-26",
    suppStatus: "VERROUILLÉ — en attente de test",
    finalTitle: "Prédictions des couches finales (VK26-31)",
    finalLead: "Prédictions des couches de convergence finales : Dio2/Dio3 thyroïdien, héritage épigénétique transgénérationnel, spirale de vieillissement télomérique, perturbation Ca²⁺ de l'ocytocine, douleur chronique par amorçage ELF et TSA comme prototype BERM.",
    finalTimeline: "Chronologie",
    finalFalsification: "Critère de falsification",
    finalLocked: "Verrouillé : 2026-08-26",
    finalStatus: "VERROUILLÉ — en attente de test",
    extTitle: "Prédictions des couches étendues (VK41-50)",
    extLead: "Prédictions des couches de convergence étendues : TDAH comme deuxième prototype, vulnérabilité calcique SLA, sérotonine intestin-cerveau, épidémie allergique, vitamine D comme bloqueur de canal naturel, paradoxe d'hormèse PEMF et complétion de l'arc reproductif.",
    extTimeline: "Chronologie",
    extFalsification: "Critère de falsification",
    extLocked: "Verrouillé : 2026-08-26",
    extStatus: "VERROUILLÉ — en attente de test",
    ultTitle: "Prédictions d'intégration finale (VK51-56)",
    ultLead: "Prédictions de l'intégration de convergence finale : déclenchement thermique CatSper, réinitialisation Ca²⁺ par psilocybine, dose-réponse caféine-Parkinson, neuroprotection par lithium dans l'eau, boucle de rétroaction amygdale-anxiété et validation du groupe contrôle Amish.",
    ultTimeline: "Chronologie",
    ultFalsification: "Critère de falsification",
    ultLocked: "Verrouillé : 2026-08-26",
    ultStatus: "VERROUILLÉ — en attente de test",
    ttypeTitle: "Prédictions des canaux de type T",
    ttypeLead: "Prédictions testables du mécanisme de bifurcation des canaux calciques de type T.",
    ttypeTimeline: "Chronologie",
    ttypeFalsification: "Critère de falsification",
    ttypeLocked: "Verrouillé : 2026-08-24",
    ttypeStatus: "VERROUILLÉ — en attente de test",
    repTitle: "Prédictions de résolution de la crise de réplication",
    repLead: "Prédictions testables dérivées du cadre à cinq facteurs de confusion.",
    repTimeline: "Chronologie",
    repFalsification: "Critère de falsification",
    repLocked: "Verrouillé : 2026-08-24",
    repStatus: "VERROUILLÉ — en attente de test",
    diffTitle: "Prédictions de neurodéveloppement et différenciation",
    diffLead: "Prédictions dérivées du cadre BERM concernant les voies de neurodéveloppement et de différenciation. Elles sont parallèles à la recherche établie sur les perturbateurs endocriniens chimiques (PEC).",
    diffNote: "Ces prédictions sont de niveau L* — dérivées du cadre BERM mais pas encore directement testées. Elles sont parallèles à la recherche établie sur les PEC.",
    diffLevel: "Niveau",
    diffDiscriminating: "Discriminant",
    diffCritical: "Discriminant critique",
    diffLocked: "Verrouillé : 2026-08-24",
    diffStatus: "VERROUILLÉ — en attente de test",
    diffVerifiedStatus: "VÉRIFIÉ",
    vgccTitle: "Prédictions de la famille génique VGCC",
    vgccLead: "Prédictions dérivées de l'analyse de la famille VGCC à six gènes. Chacune cible un sous-type spécifique de canal calcique et son mécanisme de maladie associé.",
    vgccNote: "Les niveaux de preuve varient selon la prédiction : E (support expérimental), M|C (mécanistique/corrélationnel), L* (dérivé/théorique).",
    vgccLevel: "Niveau",
    vgccDiscriminating: "Discriminant",
    vgccLocked: "Verrouillé : 2026-08-24",
    vgccStatus: "VERROUILLÉ — en attente de test",
    vgccVerifiedStatus: "VÉRIFIÉ",
    tTfrTitle: "Prédictions de seuil testostérone → TFR",
    tTfrLead: "Prédictions au niveau national du modèle de seuil testostérone. Chacune est verrouillée avec un critère de falsification. Le modèle est calibré sur les données finlandaises et coréennes ; les projections USA et Israël sont des extrapolations.",
    tTfrNote: "Ces prédictions testent l'affirmation centrale que le déclin cumulatif de testostérone (~1%/an, indépendant de l'âge) crée une contrainte biologique de fécondité qui se manifeste ~35 ans après le début.",
    tTfrLocked: "Verrouillé : 2026-08-25",
    tTfrStatus: "VERROUILLÉ — en attente de test",
    tTfrDiscriminating: "Discriminant",
    tTfrCritical: "Critique",
    causalTitle: "Prédictions de structure causale",
    causalLead: "Prédictions dérivées de l'analyse causale BMI-comme-médiateur et des preuves de réinitialisation HPG. Elles testent les voies causales spécifiques proposées par BERM.",
    causalNote: "Ces prédictions testent la STRUCTURE causale du modèle — pas son amplitude. Elles sont falsifiables par analyse formelle de médiation et données endocriniennes internationales.",
    causalLocked: "Verrouillé : 2026-08-25",
    causalStatus: "VERROUILLÉ — en attente de test",
    popTitle: "Prédictions de comparaison de populations",
    popLead: "Prédictions dérivées de la comparaison systématique de 9 populations à faible EMF avec les populations modernes. Elles testent si le gradient de santé observé suit l'exposition EMF comme BERM le prédit.",
    popLevel: "Niveau",
    popDiscriminating: "Discriminant",
    popCritical: "Discriminant critique",
    popLocked: "Verrouillé : 2026-08-24",
    popStatus: "VERROUILLÉ — en attente de test",
    tPredTitle: "Prédictions testostérone",
    tPredLead: "Prédictions du modèle à deux niveaux : le déclin séculaire de la testostérone comme prédicteur temporel du TFR.",
    tPredPredictions: [
      { id: "T-1", title: "Les pays à électrification précoce/rapide montrent un début plus précoce du déclin de T", description: "Comparaison inter-pays de la date de début du déclin séculaire de T. Nécessite des données T longitudinales harmonisées de 5+ pays.", falsification: "Aucune corrélation entre le début du déclin de T et le calendrier d'électrification dans 5+ pays" },
      { id: "T-2", title: "Le profil LH+T est hypothalamique dans toutes les populations à forte exposition EMF", description: "Le diagnostic Santi 2025 prédit T↓+LH↓ dans les populations à forte exposition EMF. Vérification dans 3+ cohortes longitudinales indépendantes.", falsification: "LH stable ou en hausse pendant le déclin de T dans 2+ cohortes sur 3" },
      { id: "T-3", title: "Le taux de déclin spermatique canin correspond au taux de déclin de T humain (~1%/an)", description: "Les chiens partagent l'exposition EMF domestique. [[ref:lea2016|Lea et al. 2016]] : −1,0 %/an de déclin spermatique chez les chiens reproducteurs britanniques sur 26 ans — même taux que le déclin séculaire de T humain. Test : comparer le début du déclin spermatique canin avec l'historique d'électrification dans 3+ pays.", falsification: "Les taux de déclin spermatique canin varient de >0,5 %/an entre pays à environnement EMF similaire" },
      { id: "T-4", title: "La fonction CatSper décline proportionnellement à l'exposition EMF cumulative dans les échantillons de sperme", description: "La capacitation dépendante de CatSper devrait montrer un déclin mesurable avec l'augmentation de l'exposition EMF cumulative. Testable sur les échantillons existants de cliniques FIV avec questionnaires d'exposition.", falsification: "Aucune corrélation entre l'exposition auto-déclarée et les paramètres fonctionnels CatSper dans 200+ échantillons" },
      { id: "T-5", title: "Le bloqueur CatSper NNC55-0396 produit le même phénotype spermatique que l'exposition RF", description: "Si les EMF agissent sur le sperme principalement via CatSper, le blocage pharmacologique devrait reproduire le phénotype complet du sperme exposé aux RF. [[ref:pmc6104424_nnc|Rennhack et al. 2018]] ont déjà montré une phénocopie partielle.", falsification: "L'exposition RF produit des défauts spermatiques non reproductibles par le blocage CatSper" },
    ],
    tPredLocked: "Verrouillé : 2026-08-31",
    tPredStatus: "VERROUILLÉ — en attente de test",
    societalTitle: "Prédictions sociétales",
    societalLead: "Prédictions dérivées de la théorie du double verrou : le déclin de testostérone à l'échelle de la population combiné à l'élévation du cortisol produit une suppression comportementale multiplicative. Elles testent si les tendances comportementales sociétales suivent les changements hormonaux que BERM prédit à partir de l'exposition EMF.",
    societalTimeline: "Chronologie",
    societalFalsification: "Critère de falsification",
    societalLocked: "Verrouillé : 2026-08-25",
    societalStatus: "VERROUILLÉ — en attente de test",
    techTitle: "Prédictions spécifiques aux technologies",
    techLead: "Prédictions dérivées de l'hypothèse d'amorçage ELF, du modèle de superadditivité et de l'analyse d'exposition spécifique aux technologies. Elles testent si les interactions multi-fréquences produisent des effets biologiques non additifs et si des transitions technologiques spécifiques ont causé les inflexions de santé observées.",
    techTimeline: "Chronologie",
    techFalsification: "Critère de falsification",
    techLocked: "Verrouillé : 2026-08-26",
    techStatus: "VERROUILLÉ — en attente de test",
    layerTitle: "Prédictions du modèle d'exposition en couches",
    layerLead: "Prédictions dérivées du modèle d'exposition en couches — cinq couches technologiques s'empilant de manière superadditive via l'intégration du seuil CaMKII. Elles testent si la vérification historique du modèle en couches s'étend aux prédictions prospectives.",
    layerFalsification: "Critère de falsification",
    layerLocked: "Verrouillé : 2026-08-26",
    layerStatus: "VERROUILLÉ — en attente de test",
    investigationTitle: "Prédictions des lignes d'investigation",
    investigationLead: "Prédictions de six nouvelles lignes d'investigation : sensibilité saisonnière, génotype, eau, matériaux de construction, fenêtre de récupération et exposition prénatale. Chaque ligne ouvre une nouvelle variable modulatrice dans le cadre BERM.",
    investigationFalsification: "Critère de falsification",
    investigationLocked: "Verrouillé : 2026-08-26",
    investigationStatus: "VERROUILLÉ — en attente de test",
    sentinelPredTitle: "Prédictions des espèces sentinelles",
    sentinelPredLead: "Prédictions de l'analyse des couches d'espèces sentinelles. Les animaux avec une sensibilité EMF plus élevée (grenouilles > abeilles > insectes > oiseaux > mammifères) devraient décliner dans un ordre correspondant à l'empilement des couches technologiques, et non à des facteurs environnementaux aléatoires.",
    sentinelPredFalsification: "Critère de falsification",
    sentinelPredLocked: "Verrouillé : 2026-08-26",
    sentinelPredStatus: "VERROUILLÉ — en attente de test",
    supplementTitle: "Prédictions supplémentaires",
    supplementLead: "Prédictions de six lignes d'analyse supplémentaires : travail posté, gradient professionnel intérieur/extérieur, transition du téléphone en poche, géographie de la fréquence du réseau et analyse des modérateurs de réplication.",
    supplementFalsification: "Critère de falsification",
    supplementLocked: "Verrouillé : 2026-08-26",
    supplementStatus: "VERROUILLÉ — en attente de test",
    geneticTitle: "Prédictions de susceptibilité génétique",
    geneticLead: "Prédictions du profil de susceptibilité calcique à 15 gènes. Elles testent l'hypothèse que la sensibilité EMF est déterminée polygéniquement et que les interactions gène × EMF sont superadditives.",
    geneticFalsification: "Critère de falsification",
    geneticLocked: "Verrouillé : 2026-08-26",
    geneticStatus: "VERROUILLÉ — en attente de test",
    plantCryTitle: "Predictions ecosysteme & CRY vegetal",
    plantCryLead: "Predictions derivees du mecanisme universel CRY/RPM operant a travers les niveaux trophiques. Ces predictions testent si la synchronie du masting, la reproduction vegetale et la dynamique des ecosystemes repondent aux parametres du champ electromagnetique via le cryptochrome.",
    plantCryPredictions: [
      {
        id: "MAST-SOLAR-1",
        metric: "Frequence de masting vs nombre de taches solaires (SSN)",
        prediction: "Les super-annees de mast (plusieurs especes mastant simultanement) correlent avec le minimum solaire quand le RF naturel est le plus bas. Testable avec la base MASTREE + SSN.",
        status: "pending",
        locked: "2026-08-31",
      },
      {
        id: "MAST-RF-1",
        metric: "Synchronie de masting vs fond RF anthropogenique",
        prediction: "La synchronie de masting est plus faible dans les forets pres des antennes-relais que dans les forets isolees a faible RF. Deja partiellement rapporte (Bogdziewicz 2021) mais attribue au changement climatique. Alternative BERM : le RF perturbe CRY2.",
        status: "pending",
        locked: "2026-08-31",
      },
      {
        id: "PLANT-CRY-RF-1",
        metric: "Plantes CRY2-knockout vs type sauvage sous RF",
        prediction: "Arabidopsis CRY2-knockout ne montre aucun changement de floraison sous RF ; le type sauvage si. Ahmad 2020 a montre l'effet CRY1 ; l'effet de floraison CRY2 sous RF non teste avec des knockouts. Test discriminant.",
        status: "pending",
        locked: "2026-08-31",
      },
      {
        id: "MAST-SOIL-B2-1",
        metric: "Synchronie de masting vs production de B2 par le microbiome du sol",
        prediction: "Synchronie de masting plus elevee dans les sols riches en B2. Le microbiome du sol produit de la riboflavine (B2) supplementant le FAD endogene vegetal. Sols appauvris → moins de B2 microbien → CRY2 moins stable → synchronie affaiblie. Speculatif (L*).",
        status: "pending",
        locked: "2026-08-31",
      },
    ],
    plantCryStatus: "VERROUILLÉ — en attente de test",
    plantCryLocked: "Verrouillé : 2026-08-31",
    criticalLabel: "Critique",
    pharmEvidenceLink: "Évidences pharmacologiques →",
    infantEvidenceLink: "Évidences de vulnérabilité infantile →",
    neuroEvidenceLink: "Évidences du spectre neurologique →",

    // Inline UI strings (former ternaries)
    dashPredictions: "Prédictions",
    dashCategories: "Catégories",
    dashVerified: "Vérifiées",
    dashAwaiting: "En attente de test",
    dashPredictionStatus: "État des prédictions",
    statusBarAria: "Barre d'état : 4 vérifiées, 254 en attente, 2 IC dépassé",
    statusVerified: "Vérifié",
    statusAwaiting: "En attente de test",
    statusCiExceeded: "IC dépassé",
    tfrExplanation: "La ligne grise représente la série TFR publiée par la Banque mondiale. La zone bleue est l’enveloppe de sensibilité verrouillée, et non un intervalle de confiance. Lorsque l’observation de l’année prédite est publiée, elle apparaît sous forme de losange : vert à l’intérieur de l’enveloppe, rouge à l’extérieur.",
    finland2030Label: "Finlande 2030 — TFR",
    ciExceededBadge: "dépassé",
    southKorea2030Label: "Corée du Sud 2030 — TFR",
    ciRiskZone: "zone de risque",
    speciesAria: "Sensibilité des espèces par masse corporelle",
    sensitivityLabel: "Sensibilité",
    insects: "Insectes",
    smallBirds: "Petits oiseaux",
    amphibiansLabel: "Amphibiens",
    smallMammals: "Petits mammifères",
    largeMammals: "Grands mammifères",
    humansLabel: "Humains",
    predMatrixAria: "Matrice de prédiction",
    animalLabel: "Animal",
    humanLabel: "Humain",
    populationLabel: "Population",
    reproductiveLabel: "Reproductif",
    neuralLabel: "Neural",
    metabolicLabel: "Métabolique",
    immuneLabel: "Immunitaire",
    circadianLabel: "Circadien",
    cascadePathAria: "Voie de cascade",
    nutritionalShort: "Nutritionnel",
    metabolicShort: "Métabolique",
    pharmacologicalShort: "Pharmacologique",
    cascadePathSubtitle: "La confirmation d’une prédiction alimente la suivante",
    evidenceCascadePath: "Voie de cascade d’évidence",
    evidenceCascadeDesc: "Les lignes de prédiction nutritionnelle, métabolique et pharmacologique se construisent séquentiellement. La confirmation d’une catégorie alimente la base d’évidence suivante.",
    evidenceCascadeAria: "Cascade d’évidence : Nutritionnel, Métabolique, Pharmacologique",
    nutritionalFull: "Nutritionnel",
    metabolicFull: "Métabolique",
    pharmacologicalFull: "Pharmacologique",
    cascadeConfirmation: "La confirmation à gauche renforce les prédictions à droite",
    sentinelHierarchyTitle: "Hiérarchie de sensibilité des espèces sentinelles",
    sentinelHierarchyDesc: "La sensibilité EMF évolue avec la masse corporelle : M^(-0,25). Les espèces plus petites sont plus sensibles.",
    sentinelHierarchyAria: "Hiérarchie de sensibilité des espèces sentinelles",
    sensitivityTop: "Sensibilité (la plus élevée en haut)",
    emfSensitivity: "Sensibilité EMF",
    nextLabel: "Suivant",
    sourcesTitle: "Sources",

    // Prediction arrays (technical content preserved from en)
    modulomePredictions: [
      {
        id: "M-1",
        title: "Faraday-shielded IVF laboratory",
        description: "An IVF laboratory with Faraday-cage EMF shielding will show significantly higher fertilization, blastocyst, and pregnancy rates compared to standard laboratories.",
        timeline: "Testable within 1–2 years",
        falsification: "No difference in any IVF outcome metric",
      },
      {
        id: "M-2",
        title: "Earbud users: lower vagal tone",
        description: "Long-term earbud users (>4h/day for >2 years) will show significantly lower heart rate variability (HRV) compared to matched non-users, indicating reduced vagal tone.",
        timeline: "Testable immediately (wearable HRV data)",
        falsification: "No HRV difference or higher HRV in earbud users",
      },
      {
        id: "M-3",
        title: "LED vs incandescent: sperm quality in rats",
        description: "Male rats raised under LED lighting will show significantly lower sperm motility and concentration compared to rats raised under incandescent lighting, in a four-arm design separating light spectrum from EMF emission.",
        timeline: "Testable in 3–6 months",
        falsification: "No difference, or EMF-shielded LED = unshielded LED",
      },
      {
        id: "LED-1",
        title: "EU LED ban and TFR acceleration",
        description: "EU countries (mandatory LED transition 2009–2012 via [[ref:eu_regulation_244_2009|Directive 244/2009]]) show faster TFR decline in 2015–2022 compared to countries with later or no incandescent ban, controlling for mobile density, GDP, and urbanization. Central estimate: TFR decline acceleration ≥0.02/year faster in EU vs non-EU controls.",
        timeline: "Testable immediately (existing demographic data)",
        falsification: "No acceleration difference, or non-EU countries show faster decline",
      },
      {
        id: "SLEEP-1",
        title: "Faraday-shielded LED sleep test",
        description: "A Faraday-shielded bedroom (< 0.001 V/m IF) with identical LED lighting produces better sleep quality than an unshielded bedroom, even when blue light spectrum is identical. This isolates the IF emission channel from the optical channel. If true: IF emissions (not blue light) are the primary sleep disruptor from LED lighting. If false: blue light or other factors dominate. Cost estimate: < EUR 5,000.",
        timeline: "Testable within 1–3 months (N=20 crossover)",
        falsification: "No sleep quality difference between shielded and unshielded conditions with identical light spectrum",
      },
      {
        id: "M-5",
        title: "LLLT improves spermatogenesis via CCO activation",
        description: "Low-level laser therapy (620–1100 nm) applied to testes in a controlled animal study will improve spermatogenesis markers (motility, concentration, morphology) via mitochondrial cytochrome c oxidase activation — the same chromophore mechanism as FDA-approved photobiomodulation devices. If LLLT (optical EM) improves fertility via CCO, and RF (lower EM) disrupts fertility via CRY, the chromophore generalization predicts that both optical and RF frequencies modulate reproductive biology through frequency-specific chromophore targets.",
        timeline: "Testable in 3–6 months (animal study)",
        falsification: "No improvement in any spermatogenesis marker, or improvement is thermal in nature",
      },
      {
        id: "NEURO-1",
        title: "CACNA1C carriers show stronger EMF-ASD association",
        description: "In a genotyped birth cohort with documented prenatal EMF exposure: stratify ASD/ADHD diagnosis rates by CACNA1C rs1006737 genotype AND maternal EMF exposure level. Prediction: significant GxE interaction where risk allele + high EMF produces synergistic elevation in ASD/ADHD rates beyond additive effects.",
        timeline: "Requires large genotyped cohort (thousands)",
        falsification: "No GxE interaction at CACNA1C locus",
      },
      {
        id: "NEURO-2",
        title: "Lithium attenuates EMF-induced neuronal oscillation disruption",
        description: "Expose hiPSC-derived neuronal cultures to EMF and measure network oscillation patterns (MEA). Then add lithium. Prediction: lithium restores oscillation regularity because it dampens Ca²⁺ oscillations via IMPA1/inositol pathway — the same mechanism that makes it effective in bipolar disorder.",
        timeline: "Testable in 3–6 months (in vitro)",
        falsification: "Lithium does not restore oscillation regularity after EMF exposure",
      },
      {
        id: "EPI-1",
        title: "EMF-exposed fathers: offspring sperm methylation changes",
        description: "Expose male mice to chronic RF-EMF. Mate with unexposed females. Analyze F1 male offspring sperm for DNA methylation patterns. Prediction: specific DMRs overlap with those in human radar study ([[ref:res-square-2025-radar-methylation|Research Square 2025]]). If DMRs include CACNA1C or other VGCC genes, this closes the epigenetic feedback loop.",
        timeline: "Testable in 6–12 months (animal study)",
        falsification: "No DMR overlap with radar study, or no VGCC-gene DMRs in F1",
      },
      {
        id: "EPI-2",
        title: "Non-monotonic methylation response to EMF",
        description: "Replicate the GC-2 study across a wider intensity range (0.1, 0.5, 1, 2, 3, 5 mT). Prediction: methylation changes show non-monotonic dose-response with at least one sign reversal, paralleling Blackman’s Ca²⁺ window. If confirmed, Lindgren’s window dynamics operate at the epigenetic level.",
        timeline: "Testable in 3–6 months (in vitro)",
        falsification: "Monotonic dose-response with no sign reversal",
      },
      {
        id: "SCHWAN-1",
        title: "GSM produces larger sperm effects than LTE at equivalent SAR",
        description: "Expose matched sperm samples to: (1) GSM-modulated 900 MHz (217 Hz TDMA), (2) LTE-modulated 900 MHz (OFDM), (3) CW 900 MHz, all at identical time-averaged SAR. Measure motility, ROS, DNA fragmentation. Prediction: GSM > LTE > CW because GSM’s hard pulse produces the strongest ELF membrane component. Directly tests Schwan + T-type bifurcation mechanism.",
        timeline: "Testable in 1–3 months (in vitro)",
        falsification: "No difference between modulation types at equal SAR, or CW > modulated",
      },
    ],
    cascadePredictions: [
      {
        id: "P11",
        title: "COVID IF-channel retrodiction",
        description: "During lockdown, IF-sensitive diseases (infertility → improvement) and RF-sensitive diseases (depression → worsening) behave in opposite directions. The COVID lockdown acts as a natural experiment: workplace IF exposure dropped ~70% (offices with LED lighting closed) while home RF exposure rose ~40% (more phone/Wi-Fi usage). This predicts channel-specific, opposite-sign health effects.",
        validation: "GBD 2024 + national health registers",
        falsification: "No differential direction between IF-sensitive and RF-sensitive diseases during lockdown",
      },
      {
        id: "P12",
        title: "LED rollout × sperm quality",
        description: "In countries where the EU LED transition happened earlier, sperm quality decline should accelerate earlier than in countries where it happened later. EU vs non-EU difference-in-differences design, controlling for mobile density, GDP, and urbanization.",
        validation: "[[ref:levine2023_sperm|Levine meta-analysis]] country-specific estimates + EU [[ref:eu_regulation_244_2009|Directive 244/2009]] implementation dates (2009–2016)",
        falsification: "No acceleration difference, or non-EU countries show faster decline",
      },
      {
        id: "P13",
        title: "Cascade order test",
        description: "Seven chronic diseases' acceleration points follow the modulome's biological latency hierarchy: sleep < depression < ADHD < metabolic < autoimmune < infertility < cancer. Each acceleration point should fall 0–10 years after mass adoption of its specific technology generation.",
        validation: "GBD 2024 acceleration point statistical analysis (structural breakpoint detection)",
        falsification: "Acceleration order does not match modulome hierarchy, or acceleration points are not temporally linked to technology rollouts",
      },
      {
        id: "P14",
        title: "EMF × psychedelic response interaction",
        description: "Patients with higher baseline EMF exposure (measured by personal RF dosimetry) will show stronger acute response to psilocybin-assisted therapy, because chronic EMF-driven Ca²⁺ dysregulation creates a larger homeostatic deficit for the psychedelic Ca²⁺ reset to correct. High-EMF patients should show greater pre/post MADRS delta.",
        validation: "Psilocybin clinical trial with RF dosimetry covariate",
        falsification: "No correlation between EMF exposure and treatment response magnitude, or inverse correlation",
      },
      {
        id: "P15",
        title: "CACNA1C genotype × psychedelic response",
        description: "Patients carrying CACNA1C risk variants (associated with bipolar disorder and schizophrenia in GWAS) will show altered psilocybin response, because the psychedelic signal chain terminates at Cav1.2 (CACNA1C). Specifically, rs1006737 A-allele carriers should show either enhanced or paradoxical response to psilocybin, distinct from wild-type responders.",
        validation: "Pharmacogenomic analysis of existing psilocybin trial data with CACNA1C genotyping",
        falsification: "No genotype-response association at CACNA1C locus",
      },
      {
        id: "P16",
        title: "Lithium protects against EMF mood effects",
        description: "Lithium users will show attenuated mood deterioration in response to EMF exposure compared to non-lithium controls, because Li⁺ directly occupies VGSC and normalizes Na⁺/Ca²⁺ balance that EMF perturbs. Ecological test: lithium-treated bipolar patients should show no seasonal RF-correlated mood variation, while unmedicated patients should.",
        validation: "Mood-tracking app data (e.g. Daylio) × personal RF dosimetry, stratified by lithium use",
        falsification: "Lithium users show equal or greater EMF-mood sensitivity compared to controls",
      },
      {
        id: "P17",
        title: "EMF exposure reduces transepithelial potential (TEP)",
        description: "Controlled EMF exposure will measurably reduce skin TEP (baseline 10–60 mV) via Na⁺/K⁺-ATPase disruption. EHS-reporting individuals will show a larger TEP drop than matched controls under the same exposure, because their ion channel sensitivity threshold is lower. Double-blind measurement with Ag/AgCl electrodes on forearm skin.",
        validation: "Double-blind TEP measurement before/during/after controlled RF exposure (1 V/m, 30 min), EHS vs. control cohort",
        falsification: "No TEP change under EMF, or EHS patients show equal or smaller change than controls",
      },
      {
        id: "P18",
        title: "EMF slows wound healing via electrotactic interference",
        description: "Standardized skin wounds (e.g. suction blister) will heal significantly slower in high-EMF environments compared to Faraday-shielded controls, because exogenous EMF superimposes noise on the endogenous wound electric field (100–200 mV/mm) that guides keratinocyte electrotaxis. Effect size should correlate with EMF field strength.",
        validation: "Suction blister wound healing RCT: Faraday-shielded vs. standard room, time to re-epithelialization",
        falsification: "No wound healing difference, or faster healing in high-EMF environment",
      },
      {
        id: "P19",
        title: "LED blue light retinal damage is IF-EMF mediated",
        description: "Retinal damage attributed to LED blue light is partially caused by IF-EMF (65 kHz – 2 MHz) from the LED switching power supply, not blue light alone. An incandescent lamp filtered to identical blue spectrum (no IF-EMF) will produce significantly less retinal oxidative stress than LED blue light at the same intensity and spectrum.",
        validation: "LED vs. incandescent (same blue spectrum) retinal cell viability assay; LED vs. incandescent + IF-EMF source",
        falsification: "Incandescent blue light produces equal retinal damage to LED blue light at matched spectrum and intensity",
      },
      {
        id: "P20",
        title: "IF-EMF alone causes retinal oxidative stress",
        description: "IF-EMF exposure (65 kHz – 2 MHz, levels matching LED driver output) without any light stimulus will produce measurable oxidative stress in retinal cells via Cav1.4 VGCC activation. This would confirm that the IF-EMF component of LED light is independently biologically active on retinal tissue.",
        validation: "Retinal cell culture exposed to IF-EMF only (no light): ROS measurement, Cav1.4 channel activity",
        falsification: "No retinal oxidative stress from IF-EMF alone, or no Cav1.4 involvement",
      },
      {
        id: "P21",
        title: "Night mode does not eliminate IF-EMF melatonin suppression",
        description: "Phone/tablet 'night mode' (warm color filter) removes blue light but not IF-EMF from the display backlight. Melatonin suppression measured with night mode ON will be significantly greater than in a no-screen control, because IF-EMF continues to suppress melatonin via CRY pathway independent of light spectrum. Mechanistic basis: [[ref:chae2019|Chae et al. (2019)]] demonstrated that human magnetoreception requires blue light (400–500 nm), identifying cryptochrome as the transducer. This implies two independent intervention points: (1) blue-light filtering removes CRY activation entirely (no radical pairs to disrupt), and (2) Faraday shielding removes RF disruption while preserving natural CRY function. BERM predicts Faraday shielding is more effective because it corrects the interference while leaving the natural system intact, whereas blue-light filtering removes the disruption by shutting down the entire CRY system.",
        validation: "Salivary melatonin: night-mode screen vs. no screen vs. incandescent reading light, evening exposure protocol",
        falsification: "Night mode restores melatonin to no-screen baseline levels",
      },
      {
        id: "P22",
        title: "Myopia correlates with IF-EMF, not blue light alone",
        description: "The childhood myopia epidemic correlates with cumulative IF-EMF exposure (screen time + LED lighting hours) more strongly than with blue light dose alone. The EU incandescent ban (2009) provides a natural experiment: countries with faster LED adoption should show steeper myopia acceleration, controlling for education hours and outdoor time.",
        validation: "Cross-country DID analysis: LED adoption rate × myopia prevalence, controlling for near-work hours and outdoor time",
        falsification: "Myopia rates correlate equally with blue light and IF-EMF, or LED adoption timing shows no association",
      },
      {
        id: "P23",
        title: "Hospital EMF levels correlate with post-hospital syndrome",
        description: "Hospitals with higher measured EMF levels (especially IF from LED lighting and RF from Wi-Fi density) will have higher post-hospital syndrome (PHS) incidence, controlling for patient acuity, length of stay, and standard care quality metrics. The correlation should be strongest in elderly patients (>75 years) who spend the most time bed-bound.",
        validation: "Multi-hospital EMF survey × 30-day readmission/complication rates, stratified by age and mobility",
        falsification: "No correlation between hospital EMF levels and PHS incidence after controlling for confounders",
      },
      {
        id: "P24",
        title: "Low-EMF patient rooms improve recovery",
        description: "Patients in Faraday-shielded or low-EMF rooms (reduced Wi-Fi, incandescent/DC lighting, minimal monitors) will show faster recovery, shorter stays, lower delirium incidence, and better sleep quality compared to standard rooms, controlling for patient acuity and treatment protocols.",
        validation: "RCT or quasi-experimental: low-EMF ward vs. standard ward, primary endpoints: LOS, delirium, sleep quality (actigraphy)",
        falsification: "No difference in any recovery metric, or worse outcomes in low-EMF rooms",
      },
      {
        id: "P25",
        title: "Home care advantage is partially EMF-mediated",
        description: "The observed advantage of home care over hospitalization for certain elderly patients is partially mediated by lower EMF exposure at home. Patients discharged to high-EMF home environments (multiple Wi-Fi networks, LED-heavy) will show outcomes closer to hospital patients than those in low-EMF homes.",
        validation: "Home EMF survey at discharge × 30-day outcomes, comparing high-EMF vs. low-EMF home environments",
        falsification: "Home EMF levels do not predict post-discharge outcomes after controlling for socioeconomic factors",
      },
      {
        id: "P29",
        title: "AD incidence correlates with cumulative lifetime EMF",
        description: "Alzheimer's disease incidence correlates with cumulative lifetime EMF exposure (urban > suburban > rural), after controlling for education, cardiovascular risk, and ApoE4 status. The mechanism chain: EMF → VGCC → Ca²⁺ ↑ → BACE1 → Aβ oligomers → positive feedback loop. The calcium hypothesis (LaFerla, O'Day) identifies Ca²⁺ dysregulation as the proximal cause; BERM provides the upstream environmental driver.",
        validation: "Longitudinal cohort with RF/IF dosimetry × AD diagnosis, controlling for ApoE4, education, CVD risk",
        falsification: "No dose-response between cumulative EMF and AD incidence after confounders controlled",
      },
      {
        id: "P30",
        title: "CACNA1C rs7304986 modulates AD risk",
        description: "CACNA1C rs7304986 T/C carriers (who show greater EMF sleep sensitivity per [[ref:sousouri2025|Sousouri 2025]]) will have higher AD risk than T/T homozygotes in high-EMF environments but equivalent risk in low-EMF environments. This is the same gene × environment interaction as for EHS: genetically heightened VGCC sensitivity amplifies environmental Ca²⁺ dysregulation.",
        validation: "GWAS × EMF exposure interaction analysis in existing AD biobank cohorts",
        falsification: "No CACNA1C × EMF interaction on AD risk, or T/C carriers show lower AD risk",
      },
      {
        id: "P31",
        title: "AD incidence accelerates 2025–2035 (30-year lag)",
        description: "AD incidence in the 60–70 age group will accelerate beyond demographic aging predictions during 2025–2035, reflecting a ~30-year lag from mass 2G/Wi-Fi adoption (1995–2005). CAUTION: this acceleration could result from other causes (diabetes epidemic, sedentary lifestyle, diagnostic changes). The prediction is confirmable only if EMF-specific biomarkers (Ca²⁺ levels, VGCC expression) co-correlate.",
        validation: "Age-specific AD incidence trends vs. demographic projection, supplemented by Ca²⁺/VGCC biomarker panel",
        falsification: "No above-demographic acceleration, or acceleration without Ca²⁺/VGCC biomarker correlation",
      },
      {
        id: "P32",
        title: "Low-EMF care homes slow AD progression",
        description: "AD patients in low-EMF care environments (Faraday-shielded or reduced Wi-Fi/LED) will show slower cognitive decline (MMSE/MoCA trajectory) than matched controls in standard care facilities. The Arendash paradox (controlled 918 MHz protects in mice) suggests dose/frequency/context matter — chaotic multi-frequency environmental EMF drives damage, while removal allows homeostatic recovery.",
        validation: "Quasi-experimental: low-EMF care unit vs. standard unit, MMSE trajectory over 12 months, controlling for medication and baseline severity",
        falsification: "No difference in cognitive decline rate, or faster decline in low-EMF environment",
      },
      {
        id: "P33",
        title: "CACNA1C genotype × prenatal EMF → ADHD risk",
        description: "CACNA1C rs7304986 T/C-carrying mothers' prenatal EMF exposure will produce higher ADHD risk in offspring than T/T carriers'. This is a gene × environment interaction: genetically heightened VGCC sensitivity amplifies the developmental ion channel calibration error from prenatal EMF. The same CACNA1C variant associates with ADHD, ASD, bipolar, and EMF sleep sensitivity ([[ref:sousouri2025|Sousouri 2025]]).",
        validation: "Kaiser-type cohort with prenatal MF dosimetry + maternal CACNA1C genotyping × offspring ADHD diagnosis",
        falsification: "No CACNA1C × prenatal EMF interaction on offspring ADHD risk",
      },
      {
        id: "P34",
        title: "Guanfacine protects against EMF-worsened ADHD",
        description: "If ADHD is an ion channel calibration error, guanfacine (HCN channel modulator) should protect against EMF's ADHD-symptom-worsening effect better than stimulants (which only compensate by raising signal). In controlled EMF exposure, guanfacine-treated ADHD patients should show less symptom worsening than methylphenidate-treated patients, because guanfacine corrects the threshold while stimulants raise the signal.",
        validation: "Guanfacine vs. methylphenidate during controlled EMF exposure → ADHD symptom change (CPT, Conners)",
        falsification: "Guanfacine shows equal or less protection than methylphenidate against EMF symptom worsening",
      },
      {
        id: "P35",
        title: "ADHD prevalence acceleration follows prenatal EMF with 3–10y lag",
        description: "ADHD prevalence acceleration follows prenatal EMF exposure growth with a 3–10 year lag (exposure → diagnosis age). 2G mass adoption 1991–95 → ADHD acceleration ~1995–2005. Smartphone mass adoption 2007–12 → ADHD acceleration ~2012–2020. 5G mass adoption 2019–24 → ADHD acceleration ~2025–2035 (prediction). CAUTION: ADHD diagnostic practices have changed significantly — prevalence data requires careful correction for diagnostic trends.",
        validation: "Age-specific ADHD incidence trends vs. prenatal EMF proxy (mobile penetration at birth year), controlling for diagnostic practice changes",
        falsification: "No temporal correlation between prenatal EMF proxy and ADHD incidence after diagnostic correction",
      },
      {
        id: "P36",
        title: "EMF exposure × bipolar cycle frequency",
        description: "Bipolar patients in higher-EMF environments should have more frequent mood cycles, because stronger ionic perturbation destabilizes the neural oscillator — amplitude increases and period shortens. Computational models ([[ref:pubmed32278494_bipolar_ionic|PubMed 32278494]]) show bipolar neurons oscillate between hyperexcitability and hypoexcitability due to ion conductance changes; EMF adds external perturbation to this unstable system.",
        validation: "EMF dosimetry + mood diary + cycle length in longitudinal bipolar cohort",
        falsification: "No correlation between environmental EMF and bipolar cycle frequency",
      },
      {
        id: "P37",
        title: "Lithium + EMF shielding synergy in bipolar",
        description: "Lithium-treated bipolar patients will benefit from EMF shielding (Faraday) because Li⁺ dampens the oscillation AND EMF removal eliminates the perturbation — combined effect exceeds either alone. Li⁺ traverses VGSC and accumulates in hyperactive neurons; removing the EMF perturbation source reduces the oscillation that lithium must dampen.",
        validation: "Li⁺ + Faraday-shielded bedroom vs. Li⁺ alone → cycle frequency and amplitude over 6 months",
        falsification: "No additional benefit from EMF shielding beyond lithium alone",
      },
      {
        id: "P38",
        title: "IVF success rates lower in high-EMF clinics",
        description: "IVF laboratories with higher ambient EMF will have lower fertilization rates, blastocyst development, and clinical pregnancy rates. Melatonin in follicular fluid is a critical oocyte protectant ([[ref:tamura2012_follicular_melatonin|Tamura 2012]]); EMF suppresses endogenous melatonin ([[ref:battelle1980_emf_melatonin|Battelle 1980]], circadian pathway), reducing follicular antioxidant defense during the most vulnerable phase. [[ref:tong2017_melatonin_ivf|Tong 2017]] meta-analysis already shows melatonin supplementation improves IVF outcomes — the prediction is that EMF environment is a confound in existing IVF data.",
        validation: "EMF dosimetry of IVF labs (incubator + patient treatment rooms) vs. clinic-level outcomes, controlling for patient demographics",
        falsification: "No correlation between clinic EMF levels and IVF outcomes after standard confound adjustment",
      },
      {
        id: "P39",
        title: "Melatonin supplement × EMF interaction in IVF",
        description: "Melatonin supplementation benefit in IVF will be LARGER for patients in high-EMF environments, because high EMF creates a deeper melatonin deficit that supplementation partially corrects. In low-EMF environments, endogenous melatonin is already near-optimal, so exogenous supplementation adds less. This predicts an interaction term (melatonin × EMF) in IVF outcome regression, not just a melatonin main effect.",
        validation: "IVF RCT with melatonin supplementation, stratified by patient residential/occupational EMF exposure (wearable dosimetry)",
        falsification: "Melatonin benefit is uniform across EMF exposure levels (no interaction)",
      },
      {
        id: "P40",
        title: "Shift workers: lower fertility AND greater melatonin supplement benefit",
        description: "Shift workers have suppressed nocturnal melatonin (circadian disruption + workplace lighting + occupational EMF), predicting lower natural fertility AND a larger absolute benefit from melatonin supplementation compared to day workers. The melatonin bridge connects cascade 1 (sleep/circadian) to cascade 6 (fertility) — shift work is the strongest natural experiment for this connection because it disrupts melatonin through multiple converging pathways simultaneously.",
        validation: "Fertility outcomes (time-to-pregnancy, IVF success) in shift vs. day workers, with and without melatonin supplementation",
        falsification: "Shift workers show equal melatonin supplement benefit as day workers, or shift work fertility deficit not mediated by melatonin levels",
      },
      {
        id: "IF-1",
        title: "LED driver 20–100 kHz disrupts normal cell mitosis",
        description: "LED driver switching frequencies (20–100 kHz) overlap the normal-cell mitotic disruption range identified by TTFields research (Neuhaus et al., Nature 2020: normal cells most affected at ~50 kHz, vs. cancer cells at 150–200 kHz). Prediction: in vitro exposure of normal dividing cells (e.g. spermatogonia, intestinal crypt cells) to 20–100 kHz pulsed fields at LED-driver-representative intensities will produce measurable increases in aneuploidy, mitotic spindle misalignment, or reduced proliferation rate. The Kaiser Permanente series (Li 2002–2020) provides epidemiological support: EMDEX-measured MF exposure associates with miscarriage, sperm quality decline, and childhood conditions across 6 cohorts.",
        validation: "In vitro: normal cell lines exposed to 20–100 kHz pulsed waveform (LED-driver-representative) vs. sham → aneuploidy rate, spindle orientation, proliferation",
        falsification: "No effect on normal cell mitosis at LED-driver-representative frequencies and intensities, or effect only at TTFields-level intensities (>100 V/m)",
      },
    ],
    nutritionalPredictions: [
      {
        id: "NUT-1",
        title: "B2 supplementation improves circadian resilience to nighttime EMF",
        description: "RCT: B2 supplementation (25mg/day x 8 weeks) vs placebo in subjects with poor sleep quality and high nighttime phone use. Primary endpoint: melatonin onset latency. Secondary: sleep efficiency, cortisol awakening response. B2 group should show less circadian disruption because FAD-replete CRY is more stable against EMF perturbation. Mechanistic basis: [[ref:hirano2017|Hirano 2017]] (FAD -> CRY stability), [[ref:yap2025|Yap 2025]] (FAD -> magnetic sensitivity).",
        timeline: "Testable within 3-6 months (RCT, N=60)",
        falsification: "No difference in melatonin onset latency or sleep metrics between B2 and placebo groups",
      },
      {
        id: "NUT-2",
        title: "B2 deficiency x EMF interaction in 54-country regression",
        description: "Add population-level B2 adequacy as a control variable to the 54-country EMF-TFR regression model. Prediction: the interaction term (EMF x B2_deficiency) is significant and negative — countries with BOTH high EMF AND high B2 deficiency show steeper TFR decline than countries with high EMF alone. China (>90% B2 deficiency, highest EMF, lowest TFR) vs. Finland (~15% B2 deficiency, high EMF, higher TFR) is the key contrast. CAUTION: This is ecological evidence — correlation, not causation.",
        timeline: "Testable immediately (existing data + B2 surveys from ~30 countries)",
        falsification: "No significant EMF x B2 interaction term, or interaction is positive",
      },
      {
        id: "NUT-3",
        title: "Fasting duration predicts magnetoreceptive sensitivity (inverted U)",
        description: "Replicate [[ref:chae2019|Chae 2019]] food orientation paradigm with graded fasting durations (4h, 8h, 12h, 16h, 24h). Prediction: inverted U-shaped dose-response — sensitivity peaks at 12-16h (optimal CRY turnover with adequate FAD) and declines at 24h+ (FAD pool depletion begins). Additional arm: B2-supplemented (25mg pre-fast) vs. unsupplemented subjects. B2 supplementation should right-shift the peak (allowing longer fasting before decline). The fasting paradox resolution ([[ref:lamia2009|Lamia 2009]] AMPK-CRY + beta-oxidation FAD) predicts this specific shape.",
        timeline: "Testable within 2-4 months (behavioral, N=40 per duration)",
        falsification: "Monotonic increase (no decline at 24h), or no fasting effect, or B2 does not shift the peak",
      },
    ],
    metabPredictions: [
      {
        id: "METAB-1",
        title: "Faraday-shielded laboratory animals weigh less than unshielded controls",
        description: "Identical diet, identical genetics, identical temperature — only difference is EMF environment. Predicted: shielded animals weigh 5-15% less after 6 months. Based on [[ref:klimentidis2010|Klimentidis paradox]] (24 populations, 8 species ALL gaining weight, p = 1.2×10⁻⁷) and BAT thermogenesis mechanism ([[ref:maalouf2023|Maalouf 2023]], [[ref:5g_bat2025|5G BAT 2025]]). This is the single most discriminating test for the EMF-metabolic hypothesis.",
        timeline: "1-3 years (experimental, requires shielded facility)",
        falsification: "No weight difference after 12 months under identical conditions",
        critical: true,
      },
      {
        id: "METAB-2",
        title: "CaMKII inhibition attenuates EMF-induced weight gain in rodents",
        description: "KN-93 or AIP (CaMKII inhibitors) administered to EMF-exposed rodents should reduce weight gain, BAT dysfunction, and insulin resistance compared to EMF-exposed untreated controls. CaMKII is the convergence molecule connecting EMF sensitivity (Cav3.2 threshold shift), BAT thermogenesis (UCP1 transcription), testosterone (StAR expression), and insulin secretion (β-cell Ca²⁺ dynamics). If CaMKII convergence is real, its inhibition should attenuate multiple metabolic endpoints simultaneously.",
        timeline: "1-2 years (experimental, rodent model)",
        falsification: "CaMKII inhibition has no effect on EMF-induced metabolic changes",
      },
      {
        id: "METAB-3",
        title: "Semaglutide efficacy correlates with ambient EMF level",
        description: "If EMF disrupts the L-type VGCC → Ca²⁺ → ERK pathway that GLP-1/semaglutide amplifies ([[ref:bhatt2012_glp1|Bhatt 2012, PMC3556522]]), then semaglutide should be MORE effective in high-EMF populations (more pathway disruption to correct) but show diminishing returns as EMF increases beyond a threshold (overwhelms correction capacity). This is a SPECULATIVE prediction — mechanistically derived but no clinical data yet. Evidence level: L*.",
        timeline: "3-5 years (clinical data mining from existing RCTs)",
        falsification: "No correlation between EMF environment and semaglutide efficacy",
      },
      {
        id: "METAB-4",
        title: "Obesity prevalence in low-EMF communities remains <10% through 2035",
        description: "Old Order Amish, Tsimane, Hadza, and comparable low-EMF communities will maintain obesity rates below 10% regardless of dietary modernization, as long as EMF exposure remains low. The Tsimane currently show <5% obesity; Kitava ~0%. If EMF is a contributing factor, these populations should remain lean even as processed food access increases — provided their EMF environment doesn't change.",
        timeline: "9 years (longitudinal observation)",
        falsification: "Low-EMF community obesity rises above 15% without significant EMF adoption",
      },
    ],
    trpc1Predictions: [
      {
        id: "TRPC1-1",
        title: "CRY2-TRPC1 calcium entry contributes to EMF reproductive effects independently of VGCCs",
        description: "Expose reproductive cells (e.g. granulosa cells, Sertoli cells) to EMF under four conditions: (1) Control (no blockers); (2) + Nifedipine (blocks VGCCs, pathway A) — isolates C's contribution; (3) + Anti-TRPC1 antibody (blocks TRPC1) — isolates A's contribution; (4) + Both blockers — residual effect = non-Ca²⁺ pathways (B, D). Prediction: nifedipine reduces but does NOT eliminate EMF response. The remaining response is CRY2-TRPC1-mediated (pathway C's calcium branch). Anti-TRPC1 also reduces but does not eliminate the response. Both blockers together produce near-complete abolition of the Ca²⁺ response. This experiment directly quantifies the relative contributions of pathways A (VGCC) and C-calcium (TRPC1) to EMF reproductive effects.",
        timeline: "Testable within 6-12 months (in vitro, cell lines available)",
        falsification: "Nifedipine alone abolishes all EMF-induced calcium effects (no TRPC1-independent component), or anti-TRPC1 has no effect (TRPC1 not involved in reproductive cells)",
      },
    ],
    pharmPredictions: [
      {
        id: "PHARM-1",
        title: "CCB users show attenuated sperm quality decline compared to ARB/ACE inhibitor users",
        description: "Compare sperm parameters (concentration, motility, morphology, DNA fragmentation) between men taking calcium channel blockers vs. men taking ARB or ACE inhibitors for hypertension. Both groups have the same underlying condition; only the drug mechanism differs. CCBs block the same VGCC that BERM identifies as the EMF transduction node. If EMF-induced VGCC activation contributes to sperm decline, CCB users should show relative protection. Data source: existing fertility clinic databases cross-referenced with prescription records.",
        timeline: "1-2 years (retrospective database study)",
        falsification: "No difference in sperm parameters between CCB and ARB/ACE inhibitor users after controlling for age, BMI, and comorbidities",
        critical: true,
      },
      {
        id: "PHARM-2",
        title: "Verapamil shows stronger EMF-protective effect than amlodipine due to use-dependent blockade",
        description: "Among CCB users, verapamil (frequency-dependent VGCC blocker) should show greater attenuation of EMF biomarkers than amlodipine (voltage-dependent blocker). The IFO mechanism predicts high-frequency channel cycling during EMF exposure — verapamil's use-dependent kinetics should provide disproportionate blockade during these bursts. Compare oxidative stress markers, sperm parameters, or melatonin levels between verapamil and amlodipine users.",
        timeline: "2-3 years (retrospective, requires sufficient verapamil sample size)",
        falsification: "No difference between verapamil and amlodipine users on any EMF-relevant biomarker",
      },
      {
        id: "PHARM-3",
        title: "Lithium-treated bipolar patients show less circadian disruption in high-EMF environments",
        description: "Compare circadian markers (melatonin secretion timing, sleep onset latency, dim-light melatonin onset) between bipolar patients on lithium vs. bipolar patients on valproate or lamotrigine in matched EMF environments. Lithium stabilizes CRY proteins via GSK-3β inhibition, directly opposing BERM pathway C. If CRY-mediated melatonin suppression contributes to EMF-associated circadian disruption, lithium users should be partially protected.",
        timeline: "1-3 years (prospective or retrospective with wearable data)",
        falsification: "Lithium users show equal or greater circadian disruption than valproate users in high-EMF environments",
      },
      {
        id: "PHARM-4",
        title: "Nimodipine attenuates EMF-induced cognitive effects while peripheral CCBs do not",
        description: "Nimodipine (BBB-penetrant dihydropyridine CCB) should attenuate EMF-associated cognitive effects, while amlodipine (non-BBB-penetrant) should not. Three moderators differentiate BERM from a simple Ca²⁺-blockade hypothesis: (a) the effect should be LARGER in winter than summer (CRY more sensitive), (b) LARGER in AA-genotype carriers (more Cav1.2), and (c) LARGER in subjects with home Wi-Fi (more primed baseline). ETH Zürich 5G-sleep study is the first opportunity to test these moderators directly.",
        timeline: "2-4 years (prospective cohort or RCT extension study)",
        falsification: "No difference between nimodipine and amlodipine on cognitive endpoints, OR no moderator-dependent variation (season, genotype, home EMF)",
      },
      {
        id: "PHARM-5",
        title: "CoQ10 supplementation reduces EMF-associated oxidative damage in a dose-dependent manner",
        description: "Building on [[ref:bektas2026|Bektas 2026]] (3.5 GHz → testicular ROS; CoQ10 ameliorates): CoQ10 supplementation (100-400 mg/day) should reduce urinary 8-OHdG (oxidative DNA damage marker) in men with high smartphone usage (>4h/day, phone in pocket) in a dose-dependent manner. The dose-response relationship tests whether the antioxidant mechanism scales linearly (simple ROS scavenging) or saturates (enzyme-limited repair).",
        timeline: "6-12 months (RCT feasible with existing supplement)",
        falsification: "No reduction in 8-OHdG at any CoQ10 dose compared to placebo in high-smartphone-usage men",
        critical: true,
      },
    ],
    modIntPredictions: [
      {
        id: "MOD-1",
        title: "Pituitary gonadotroph T-type channels mediate EMF-induced FSH/LH disruption",
        description: "Pituitary gonadotrophs express Cav3 T-type channels for hormone secretion. EMF perturbation of these channels reduces FSH/LH pulsatility independently of hypothalamic GnRH. Test: expose pituitary cell cultures to standardized EMF with and without T-type channel blocker (ethosuximide). Prediction: EMF reduces FSH/LH secretion; ethosuximide abolishes the effect.",
        type: "experimental",
        discriminating: true,
        timeline: "Testable within 6 months (pituitary cell culture)",
        falsification: "No EMF effect on pituitary FSH/LH secretion, or ethosuximide does not block the effect",
      },
      {
        id: "MOD-2",
        title: "Mitochondrial age amplifies EMF-induced ROS in reproductive tissue",
        description: "Aged mitochondria produce more ROS per unit Ca2+ influx than young mitochondria. Test: expose testicular tissue from young (3-month) and old (18-month) rats to identical EMF. Measure mitochondrial ROS production. Prediction: old tissue produces disproportionately more ROS per unit EMF exposure, following the v18_mitochondrial_ros_amplifier() function.",
        type: "experimental",
        discriminating: true,
        timeline: "Testable within 6 months (animal tissue, standard ROS assay)",
        falsification: "Old and young tissue produce equal ROS per unit EMF, or young tissue produces more",
      },
      {
        id: "MOD-3",
        title: "B2 supplementation restores glutathione defense AND reduces CRY sensitivity",
        description: "Riboflavin (B2) is the precursor for FAD, which is required by both glutathione reductase (GR, redox defense) and cryptochrome (CRY, EMF sensor). B2 supplementation should simultaneously: (a) increase effective glutathione buffering capacity (via GR), and (b) stabilize CRY against EMF perturbation (via FAD loading). Test: B2-supplemented vs. unsupplemented cell cultures under EMF. Measure both GSH/GSSG ratio and CRY-dependent circadian gene expression.",
        type: "experimental",
        discriminating: true,
        timeline: "Testable within 3-6 months (cell culture, dual endpoint)",
        falsification: "B2 affects only one endpoint (GR or CRY) but not both, or no effect on either",
      },
      {
        id: "MOD-4",
        title: "HRV is a sensitive early biomarker of chronic EMF exposure",
        description: "Heart rate variability (HRV), specifically the high-frequency (HF) component reflecting vagal tone, decreases with chronic EMF exposure before clinical symptoms appear. The SA node's Cav3.1 T-type channels are the transducer. Test: correlate personal RF dosimetry with 24-hour HRV monitoring in a cohort (N=200). Prediction: inverse dose-response between cumulative EMF and HF-HRV, independent of age, fitness, and stress.",
        type: "observational",
        discriminating: true,
        timeline: "Testable immediately (wearable HRV + RF dosimetry)",
        falsification: "No correlation between personal EMF exposure and HRV after controlling for confounders",
      },
      {
        id: "MOD-5",
        title: "Placental TJ proteins decrease with gestational EMF exposure",
        description: "The placental barrier uses the same tight junction (TJ) proteins as BBB and BTB (occludin, ZO-1, claudins). EMF exposure during pregnancy should decrease placental TJ protein expression in a dose-dependent manner. Test: measure placental TJ protein levels in women with high vs. low EMF exposure during pregnancy (personal dosimetry). Prediction: higher EMF exposure correlates with lower occludin and ZO-1 expression.",
        type: "experimental",
        discriminating: true,
        timeline: "Testable within 12 months (birth cohort with dosimetry)",
        falsification: "No correlation between gestational EMF and placental TJ protein expression",
      },
      {
        id: "MOD-6",
        title: "Thyroid dysfunction prevalence correlates with mobile phone adoption rate nationally",
        description: "Thyroid cells express VGCCs and are sensitive to EMF-induced Ca2+ disruption. National thyroid dysfunction prevalence (hypothyroidism, elevated TSH) should correlate with mobile phone adoption rate, controlling for iodine status, age structure, and diagnostic practices. This is an ecological prediction — correlation, not causation.",
        type: "ecological",
        discriminating: false,
        timeline: "Testable immediately (existing health registry + ITU data)",
        falsification: "No correlation between mobile adoption rate and thyroid dysfunction prevalence after controlling for iodine status and demographics",
      },
    ],
    sidsPredictions: [
      {
        id: "SIDS-1",
        title: "Baby monitor proximity correlates with SIDS risk",
        description: "Retrospective case-control study: compare baby monitor type (DECT vs. WiFi vs. wired vs. none) and placement distance (< 0.5 m, 0.5–1 m, > 1 m) between SIDS cases and age-matched controls. DECT monitors at < 0.5 m produce 2.5–3.5 V/m continuous RF through a 2 mm infant skull. Prediction: DECT or WiFi monitor placement within 0.5 m of the crib is more common in SIDS cases than controls, after controlling for known risk factors.",
        timeline: "Testable retrospectively (parent questionnaire in existing SIDS registries)",
        falsification: "No association between monitor type/distance and SIDS incidence after controlling for prone sleeping, tobacco, overheating, and breastfeeding status",
      },
      {
        id: "SIDS-2",
        title: "CACNA1C rs1006737 AA genotype is overrepresented in SIDS victims",
        description: "Post-mortem genotyping of SIDS victims for CACNA1C rs1006737 (the BERM risk allele). The AA genotype increases Cav1.2 expression and is associated with psychiatric and cardiac risk in adults. In infants with immature Ca²⁺ homeostasis, this gain-of-function variant should increase vulnerability to any Ca²⁺-disrupting stressor. Prediction: AA genotype frequency in SIDS victims exceeds population baseline.",
        timeline: "Testable with existing biobanked SIDS tissue (retrospective genotyping)",
        falsification: "AA genotype frequency in SIDS victims equals or is lower than population frequency",
      },
      {
        id: "SIDS-3",
        title: "Maternal EMF exposure correlates with lower breast milk melatonin",
        description: "Measure melatonin concentration in night breast milk samples from mothers with high vs. low personal EMF exposure (smartphone use, WiFi proximity, LED lighting assessed by questionnaire and dosimetry). Melatonin in night milk is the infant's exogenous Ca²⁺ antagonist. If maternal CRY pathway is disrupted by EMF, milk melatonin should be reduced. Prediction: mothers with higher EMF exposure produce night milk with lower melatonin concentration.",
        timeline: "Testable within 6–12 months (lactation cohort with dosimetry)",
        falsification: "No correlation between maternal EMF exposure metrics and night milk melatonin concentration",
      },
      {
        id: "SIDS-4",
        title: "Night-pumped breast milk offered at night has lower SIDS risk than day-pumped milk offered at night",
        description: "Retrospective cohort: among mothers who pump and bottle-feed, compare SIDS incidence between those who offer time-matched milk (night-pumped at night, day-pumped during day) vs. those who do not label by time. Night milk contains melatonin (Ca²⁺ antagonist) and tryptophan absent from day milk. Prediction: chronomatched milk feeding is associated with lower SIDS risk.",
        timeline: "Testable retrospectively (feeding practice questionnaire in existing cohorts)",
        falsification: "No difference in SIDS incidence between chronomatched and non-matched pumped milk feeding practices",
      },
      {
        id: "SIDS-5",
        title: "EMF-free nursery environment reduces apnea/bradycardia episodes in NICU",
        description: "Interventional study in NICU: compare apnea and bradycardia episode frequency in preterm infants in standard NICU environment vs. EMF-minimized environment (wired monitors, no WiFi, RF-shielded incubator, amber lighting). Prediction: EMF-minimized NICU environment reduces apnea/bradycardia episodes, with larger effect in infants with known ion channel variants.",
        timeline: "Testable within 12–18 months (NICU intervention study)",
        falsification: "No reduction in apnea/bradycardia episodes in EMF-minimized NICU environment compared to standard environment",
      },
      {
        id: "SIDS-6",
        title: "ADORA1/ADORA2A polymorphisms predict both SIDS risk and caffeine response",
        description: "Pharmacogenetic analysis: genotype ADORA1 and ADORA2A receptor polymorphisms in SIDS victims (post-mortem) and in preterm infants receiving caffeine therapy. The same adenosine receptor variants that modulate caffeine response in apnea of prematurity should predict SIDS susceptibility, because both conditions involve adenosine-Ca²⁺ pathway disruption in the respiratory center. Prediction: ADORA variants that predict poor caffeine response are overrepresented in SIDS victims.",
        timeline: "Testable with existing SIDS biobanks and NICU pharmacogenetic databases",
        falsification: "No association between ADORA genotype and SIDS incidence, or ADORA genotypes associated with SIDS do not predict caffeine response",
      },
    ],
    sidsResPredictions: [
      {
        id: "SIDS-RESONANCE-1",
        title: "Q-factor predicts SIDS risk better than age alone",
        description: "If the resonance model is correct, SIDS risk should correlate with Q_neonatal(age) = Q₀/(1+(age/τ_KCC2)²) better than with age alone. The Q-factor declines as KCC2 matures and GABA transitions from excitatory to inhibitory. Test: fit SIDS incidence-by-age curves to Q_neonatal(age) vs. linear/quadratic age models. Prediction: Q-factor model fits SIDS age distribution better (lower AIC) than purely age-based models.",
        timeline: "Testable immediately (existing SIDS age-distribution datasets)",
        falsification: "Q-factor model fits no better than simple age-based models for SIDS incidence distribution",
      },
      {
        id: "SIDS-RESONANCE-2",
        title: "Bumetanide prophylaxis reduces apnea in high-risk neonates",
        description: "Bumetanide blocks NKCC1, restoring inhibitory GABA and introducing damping (reducing Q). If SIDS results from resonance failure in an undamped system, bumetanide should reduce apnea and bradycardia episodes in high-risk neonates (those with ion channel variants or prior apparent life-threatening events). Test: randomized trial of low-dose bumetanide in NICU infants with recurrent apnea. Prediction: bumetanide reduces apnea/bradycardia episode frequency.",
        timeline: "Testable within 12–18 months (NICU pharmacological trial)",
        falsification: "No reduction in apnea/bradycardia episodes with bumetanide in high-risk neonates",
      },
      {
        id: "SIDS-RESONANCE-3",
        title: "Neonatal EEG shows higher coherence at resonant frequencies in SIDS-risk infants",
        description: "An undamped resonator (Q→∞) concentrates energy at its natural frequency. Neonatal EEG in high-risk infants should show narrower spectral peaks and higher inter-channel coherence in delta/theta bands compared to low-risk controls. This spectral signature should diminish as KCC2 matures (3–6 months). Test: serial EEG in SIDS-risk vs. control infants from birth to 6 months. Prediction: high-risk infants show elevated spectral coherence that normalizes on the KCC2 maturation timeline.",
        timeline: "Testable within 12 months (neonatal EEG longitudinal study)",
        falsification: "No difference in EEG spectral coherence between high-risk and control neonates, or coherence does not change on the predicted KCC2 timeline",
      },
      {
        id: "SIDS-RESONANCE-4",
        title: "Co-sleeping cultures have low SIDS despite high ambient EMF",
        description: "The three-protections model predicts that cultures practicing co-sleeping (no monitor), breastfeeding (>90%), and continuous skin contact should maintain low SIDS rates regardless of ambient EMF level. Test: compare SIDS rates across cultures stratified by (1) ambient EMF density and (2) co-sleeping/breastfeeding/skin-contact practices. Prediction: SIDS rate correlates with monitor use and formula feeding, not with ambient EMF density, after controlling for the three protections.",
        timeline: "Testable immediately (ecological analysis of existing cross-national SIDS data)",
        falsification: "SIDS rate correlates with ambient EMF density regardless of co-sleeping/breastfeeding/skin-contact practices",
      },
      {
        id: "SIDS-RESONANCE-5",
        title: "NKCC1/KCC2 ratio at time of death predicts SIDS vs. non-SIDS infant death",
        description: "If the resonance model is correct, SIDS victims should have higher NKCC1/KCC2 ratios (less mature chloride transporter switch → higher Q → more excitatory GABA) compared to age-matched infants who died of non-SIDS causes. Test: immunohistochemistry for NKCC1 and KCC2 in brainstem tissue from SIDS vs. non-SIDS infant post-mortem samples. Prediction: SIDS victims show elevated NKCC1/KCC2 ratio compared to age-matched controls.",
        timeline: "Testable with existing biobanked tissue (retrospective immunohistochemistry)",
        falsification: "NKCC1/KCC2 ratio in SIDS victims equals that in age-matched non-SIDS infant deaths",
      },
      {
        id: "SIDS-SPECTRUM-1",
        title: "Prenatal EMF exposure predicts neurodevelopmental outcomes on a dose-response curve",
        description: "The resonance spectrum model predicts a continuous dose-response relationship between prenatal/neonatal EMF exposure and neurodevelopmental outcomes: highest exposure → SIDS risk, moderate → developmental delay, low → subtle motor/cognitive differences. Test: prospective birth cohort with personal EMF dosimetry (phone use, WiFi proximity, monitor use) followed to 36 months with standardized developmental assessment. Prediction: EMF exposure shows graded dose-response with developmental outcomes, with fine motor (OR ≥ 2.5) and problem-solving (OR ≥ 3.0) most affected, consistent with the prospective cohort finding (OR 2.74 fine motor, OR 3.67 problem-solving).",
        timeline: "Testable within 3 years (prospective birth cohort with dosimetry)",
        falsification: "No dose-response relationship between prenatal/neonatal EMF exposure and developmental outcomes at 36 months",
      },
    ],
    neuroPredictions: [
      {
        id: "NEURO-EMF-1",
        title: "Chronic migraine prevalence correlates with cumulative EMF layer exposure",
        description: "The Q-factor model predicts that chronic migraine prevalence should increase with cumulative EMF exposure (ELF-priming → α2δ-1↑ → CSD threshold↓). Test: correlate chronic migraine prevalence trends (1990→2025) with cumulative EMF technology adoption (mobile, WiFi, LED) across countries. Prediction: countries with earlier and denser EMF adoption show steeper migraine prevalence increase.",
        timeline: "Testable immediately (existing migraine prevalence data + ITU technology adoption data)",
        falsification: "No temporal correlation between EMF technology adoption and chronic migraine prevalence trends across countries",
      },
      {
        id: "NEURO-EMF-2",
        title: "ELF-priming lowers CSD threshold; gabapentin reverses this",
        description: "ELF exposure upregulates α2δ-1 (CACNA2D1), increasing VGCC density at synapses and lowering CSD threshold. Gabapentin blocks α2δ-1 trafficking. Test: expose cortical slices to chronic ELF (50 Hz, 7 days), then measure CSD threshold (KCl concentration needed to trigger CSD). Repeat with gabapentin co-treatment. Prediction: ELF lowers CSD threshold; gabapentin co-treatment normalizes it.",
        timeline: "Testable within 6–12 months (cortical slice electrophysiology)",
        falsification: "ELF exposure does not alter CSD threshold, or gabapentin does not reverse the ELF effect",
      },
      {
        id: "NEURO-EMF-3",
        title: "Cluster headache patients have higher EMF exposure history",
        description: "The cluster headache patient profile (male 3:1, smoker 60–90%, onset ~30 years, attacks 00–03) maps onto a cumulative Ca²⁺-loading profile. EMF exposure history (occupational, residential) should be higher in cluster headache patients than matched controls. Test: case-control study with detailed EMF exposure assessment (occupation, residential proximity to infrastructure, device use). Prediction: cluster headache patients have statistically higher lifetime EMF exposure.",
        timeline: "Testable within 12 months (case-control with EMF questionnaire)",
        falsification: "No difference in EMF exposure history between cluster headache patients and matched controls",
      },
      {
        id: "NEURO-EMF-4",
        title: "SUDEP risk is higher in higher-EMF environments",
        description: "SUDEP shares the same spreading depolarization → brainstem mechanism as SIDS. If EMF contributes to CSD propagation, SUDEP incidence should be higher in high-EMF environments (urban) compared to low-EMF environments (rural), after controlling for seizure frequency and medication compliance. Test: registry study comparing SUDEP incidence in urban vs. rural epilepsy patients. Prediction: urban epilepsy patients have higher SUDEP rate after controlling for seizure frequency.",
        timeline: "Testable immediately (epilepsy registry with residential data)",
        falsification: "No difference in SUDEP incidence between urban and rural epilepsy patients after controlling for seizure frequency and medication compliance",
      },
      {
        id: "NEURO-EMF-5",
        title: "Psilocybin efficacy in cluster headache improves with concurrent EMF reduction",
        description: "Psilocybin resets the tryptamine pathway (5-HT2A → thalamo-cortical reset → SCN circadian reset). If ongoing EMF exposure re-primes α2δ-1 and disrupts the SCN after reset, psilocybin efficacy should be greater when combined with EMF reduction. Test: RCT of psilocybin + EMF reduction protocol vs. psilocybin alone in episodic cluster headache. Prediction: combined intervention produces longer remission than psilocybin alone.",
        timeline: "Testable within 24 months (RCT with EMF reduction protocol)",
        falsification: "No difference in remission duration between psilocybin + EMF reduction and psilocybin alone",
      },
      {
        id: "NEURO-EMF-6",
        title: "EMF triggers seizures in neonatal animal models without pharmacological GABAergic reduction",
        description: "López-Martín showed GSM + picrotoxin (GABA antagonist) = seizures, while neither alone sufficed. The neonatal brain has endogenously excitatory GABA (NKCC1>KCC2), equivalent to pharmacological GABAergic reduction. Test: expose neonatal rodents (P3–P7, before KCC2 switch) to pulsed GSM 900 MHz at mobile-phone intensity without picrotoxin. Prediction: neonatal animals show seizure activity or epileptiform EEG changes without pharmacological pre-treatment, while adult animals do not.",
        timeline: "Testable within 6–12 months (neonatal rodent EMF exposure model)",
        falsification: "No seizure activity or epileptiform EEG changes in neonatal animals exposed to GSM without pharmacological GABAergic reduction",
      },
    ],
    metalPredictions: [
      {
        id: "METAL-EMF-1",
        title: "Chelation therapy + EMF reduction produces superadditive health improvement in EHS patients",
        description: "Heavy metals (Cd²⁺, Pb²⁺) enter cells through EMF-opened VGCCs and mimic Ca²⁺ at calmodulin/CaMKII binding sites. Chelation removes metals; EMF reduction closes the entry pathway. Combined intervention should be superadditive. Test: RCT of chelation + EMF reduction vs. chelation alone vs. EMF reduction alone in EHS patients with elevated heavy metal levels. Prediction: combined group shows >50% improvement vs. <25% for either alone.",
        timeline: "Testable within 18 months (RCT with heavy metal panel + EHS symptom scores)",
        falsification: "No superadditive effect — chelation + EMF reduction equals sum of individual effects",
      },
      {
        id: "METAL-EMF-2",
        title: "PGC grade correlates with cumulative lifetime EMF exposure",
        description: "Pineal gland calcification (PGC) reduces melatonin production (r=0.569 for uncalcified tissue↔melatonin). EMF accelerates PGC via oxidative stress and Ca²⁺ deposition. Test: cross-sectional study correlating PGC volume (CT/MRI) with occupational EMF exposure history. Prediction: high-EMF occupations (electricians, telecom workers) have significantly higher PGC volume than matched low-EMF controls.",
        timeline: "Testable immediately (CT/MRI + occupational exposure questionnaire)",
        falsification: "No correlation between occupational EMF exposure history and PGC grade",
      },
      {
        id: "METAL-EMF-3",
        title: "Cadmium tissue levels are higher in high-EMF environments via Cav3.1 window current",
        description: "Cd²⁺ permeates through Cav3.1 T-type calcium channels (confirmed with radiolabeled ¹⁰⁹Cd²⁺). Cav3.1 has a window current near resting potential — EMF increases open probability → more Cd entry. Test: compare tissue Cd levels in workers with equal dietary/occupational Cd exposure but different EMF exposure. Prediction: high-EMF group has higher tissue Cd accumulation at equivalent external Cd levels.",
        timeline: "Testable within 12 months (occupational cohort with Cd biomonitoring + EMF dosimetry)",
        falsification: "No difference in tissue Cd levels between EMF-matched groups at equivalent external Cd exposure",
      },
      {
        id: "METAL-EMF-4",
        title: "MeHg neurotoxicity threshold is lower in high-EMF environments",
        description: "Methylmercury increases T-type Ca²⁺ currents; EMF independently opens VGCCs. Combined effect: double Ca²⁺ loading. Populations with both high MeHg (fish diet) and high EMF (urban) should show neurotoxicity at lower MeHg levels than high-MeHg + low-EMF populations. Test: compare neurodevelopmental outcomes in Faroe Islands (high MeHg, low EMF) vs. urban Japan (high MeHg, high EMF) at equivalent MeHg exposure. Prediction: urban Japan shows effects at lower MeHg thresholds.",
        timeline: "Testable immediately (existing Faroe Islands and Japanese cohort data)",
        falsification: "No difference in MeHg neurotoxicity threshold between high-EMF and low-EMF populations",
      },
      {
        id: "CHAIN-1",
        title: "Ca²⁺ channel blocker prevents EMF-induced sleep effects (ETH nimodipine-5G)",
        description: "The VGCC hypothesis predicts that blocking the Ca²⁺ channel should prevent ALL downstream EMF effects. [[ref:sousouri2025|Sousouri 2025]] showed CACNA1C genotype determines 5G sleep response. Test: ETH Zürich nimodipine-5G follow-up — administer nimodipine (L-type Ca²⁺ blocker) before 5G exposure and measure sleep EEG. Prediction: nimodipine abolishes the genotype-dependent sleep EEG changes seen in the original study.",
        timeline: "Testable within 12 months (RCT extension of [[ref:sousouri2025|Sousouri 2025]] protocol)",
        falsification: "Nimodipine does NOT prevent EMF-induced sleep EEG changes → VGCC is not the primary target → entire BERM cascade must be reconsidered",
      },
      {
        id: "CHAIN-2",
        title: "Amish communities show different chronic disease trends than mainstream population",
        description: "Amish communities have minimal EMF exposure (no grid electricity, no wireless devices), high co-sleeping, high breastfeeding. If EMF is a significant driver of chronic disease trends, Amish should show divergent trajectories for BERM-predicted conditions. Test: compare age-adjusted incidence trends (1990→2025) for T2D, obesity, autism, ADHD, depression, myopia, SIDS in Amish vs. general US population. Prediction: Amish show stable or declining rates where the general population shows increase.",
        timeline: "Testable immediately (Amish health registries + CDC NHANES comparison)",
        falsification: "Amish communities show the same chronic disease trend increases as the general US population",
      },
      {
        id: "CHAIN-3",
        title: "EMF reduction intervention produces measurable health improvement in a controlled study",
        description: "This is BERM's critical missing piece: interventional verification. All current evidence is observational or mechanistic. Test: RCT of comprehensive EMF reduction (shielded sleeping environment, wired devices, no LED at night) in symptomatic individuals for 3 months. Measure: CaMKII Thr286 phosphorylation in lymphocytes, sleep quality (actigraphy), melatonin (urine 6-sulfatoxymelatonin), blood pressure. Prediction: EMF reduction group shows significant improvement in all four biomarkers.",
        timeline: "Testable within 12 months (RCT with biomarker panel)",
        falsification: "No improvement in any biomarker after comprehensive EMF reduction → EMF exposure has no measurable health impact → model lacks clinical relevance",
      },
      {
        id: "CHAIN-4",
        title: "Walker sleep chain: EMF→melatonin↓→sleep↓→GABA↓→Q↑ measured as complete cascade",
        description: "Feedback loop 4 predicts a cascading cycle: EMF suppresses melatonin → sleep deteriorates → GABA tonic inhibition decreases → Q-factor increases → brain becomes MORE sensitive to EMF → further melatonin suppression. Test: longitudinal study measuring evening EMF exposure, overnight melatonin (saliva), sleep quality (PSG), morning GABA (MRS spectroscopy), and EEG coherence (Q proxy) over 4 weeks. Prediction: initial EMF exposure produces self-amplifying deterioration across all measures.",
        timeline: "Testable within 6 months (longitudinal PSG + MRS + EEG protocol)",
        falsification: "No self-amplifying cascade — EMF effects on sleep/melatonin/GABA remain constant rather than progressively worsening",
      },
    ],
    mechPredictions: [
      {
        id: "BBB-EMF-1",
        title: "EMF increases BBB permeability; melatonin supplementation prevents it",
        description: "RF-EMF (27.12 MHz) increases BBB permeability via eNOS↑ and occludin↓. Melatonin protects tight junction proteins (occludin, claudin-5, ZO-1). Test: measure BBB permeability (gadolinium-enhanced MRI) during RF exposure with and without melatonin pre-treatment. Prediction: melatonin pre-treatment prevents EMF-induced BBB opening.",
        timeline: "Testable within 12 months (MRI + melatonin RCT)",
        falsification: "Melatonin does NOT prevent EMF-induced BBB permeability changes",
      },
      {
        id: "BBB-EMF-2",
        title: "Heavy metal brain accumulation higher in high-EMF populations via BBB opening",
        description: "EMF opens BBB → heavy metals (Pb, Cd, MeHg) enter brain more easily. EMF also suppresses melatonin → BBB protection↓ → DOUBLE vulnerability. Test: compare brain heavy metal accumulation (post-mortem or CSF) between high-EMF occupations and matched low-EMF controls with equivalent peripheral heavy metal levels. Prediction: high-EMF group has higher brain metal levels at equivalent blood levels.",
        timeline: "Testable within 18 months (occupational cohort with CSF/autopsy samples)",
        falsification: "No difference in brain heavy metal accumulation between EMF-exposure groups at equivalent blood levels",
      },
      {
        id: "BAT-EMF-1",
        title: "5G reduces BAT PRDM16 expression and thermogenesis in rodents",
        description: "5G (3.5 GHz) → PRDM16 mRNA↓ + C/EBPβ mRNA↓ in brown adipose tissue. BAT uses Ca²⁺ cycling (SERCA) for energy expenditure. Test: expose rodents to 5G and measure BAT PRDM16 protein, thermogenic capacity (cold challenge), and energy expenditure. Prediction: 5G-exposed animals show reduced cold-induced thermogenesis and weight gain on identical caloric intake.",
        timeline: "Testable within 6 months (rodent model with metabolic cages)",
        falsification: "No change in BAT thermogenesis or weight in 5G-exposed vs control animals on identical diet",
      },
      {
        id: "HPA-EMF-1",
        title: "Chronic EMF elevates hair cortisol in exposed workers",
        description: "EMF sets a new HPA axis setpoint with sensitization rather than adaptation. Chronic exposure → sustained cortisol elevation + adrenal hypertrophy. Test: measure hair cortisol (3-month integrated cortisol) in telecom workers vs matched office workers. Prediction: telecom workers show significantly higher hair cortisol after controlling for perceived stress and lifestyle factors.",
        timeline: "Testable immediately (hair cortisol + occupational exposure questionnaire)",
        falsification: "No difference in hair cortisol between high-EMF and low-EMF occupation groups",
      },
      {
        id: "HPA-EMF-2",
        title: "EMF produces adrenal hypertrophy measurable by imaging",
        description: "Animal studies show EMF → ACTH↑ + corticosterone↑ + adrenal hypertrophy. This anatomical change should be detectable in chronically exposed humans. Test: compare adrenal gland volume (CT/MRI) in workers with >10 years high-EMF exposure vs matched controls. Prediction: high-EMF group has significantly larger adrenal glands.",
        timeline: "Testable immediately (retrospective imaging study)",
        falsification: "No adrenal volume difference between chronic high-EMF and low-EMF occupation groups",
      },
      {
        id: "BETA-EMF-1",
        title: "EMF disrupts glucose-stimulated insulin secretion via Ca²⁺ channel activation",
        description: "Electric fields can induce insulin secretion WITHOUT glucose. ELF-EMF alters glucose-stimulated insulin dynamics. CaVγ4→CaMKII→MafA pathway: CaMKII dysregulation → β-cell maturity loss. Test: measure insulin secretion dynamics (first-phase insulin response) in EMF-exposed vs control subjects during OGTT. Prediction: EMF-exposed group shows blunted first-phase insulin with elevated basal insulin.",
        timeline: "Testable within 12 months (OGTT study with EMF exposure history)",
        falsification: "No difference in insulin secretion dynamics between EMF-exposure groups",
      },
      {
        id: "BETA-EMF-2",
        title: "Verapamil protects β-cells from EMF-induced dysfunction",
        description: "Verapamil (L-type Ca²⁺ blocker) protects β-cells and improves T1D outcomes ([[ref:verap_t1d_jama|JAMA 2023]]). If EMF damages β-cells via Ca²⁺ channels, verapamil should also prevent EMF-induced β-cell dysfunction. Test: expose β-cell cultures to EMF with/without verapamil; measure insulin secretion and MafA expression. Prediction: verapamil prevents EMF-induced insulin secretion changes and MafA↓.",
        timeline: "Testable within 6 months (in vitro β-cell culture)",
        falsification: "Verapamil does NOT prevent EMF-induced β-cell dysfunction → Ca²⁺ channel is not the primary mechanism",
      },
      {
        id: "HYPO-EMF-1",
        title: "Chronic EMF reduces hypothalamic synaptic vesicle density",
        description: "835 MHz (12 weeks) reduces synaptic vesicle number, size, and docking in hypothalamus, plus synapsin I/II↓ and synaptotagmin 1↓. Synaptotagmin 1 is the Ca²⁺ sensor for vesicle release. Its loss means ALL hypothalamic hormone release is impaired. Test: replicate [[ref:kim2019_hypothalamus|Kim 2019]] with additional hormone panel (GnRH, CRH, TRH, GHRH, dopamine). Prediction: multi-hormone deficit pattern matching BERM predictions.",
        timeline: "Testable within 12 months (rodent model with hypothalamic dissection + hormone panel)",
        falsification: "No synaptic vesicle changes and no multi-hormone deficit after chronic RF exposure",
      },
      {
        id: "HYPO-EMF-2",
        title: "EMF produces simultaneous T↓ + cortisol↑ + GH↓ via hypothalamic disruption",
        description: "If EMF disrupts hypothalamic synaptic transmission broadly (VK13), ALL hormone axes should be affected simultaneously. The triple lock (T↓ × cortisol↑ × DA↓) should be accompanied by GH↓ and thyroid changes. Test: measure full hormone panel (T, LH, cortisol, ACTH, GH, IGF-1, TSH, fT4, dopamine) in chronic EMF-exposed vs controls. Prediction: coherent multi-axis disruption pattern.",
        timeline: "Testable immediately (occupational cohort with comprehensive hormone panel)",
        falsification: "EMF-exposed group shows changes in only one hormonal axis rather than coordinated multi-axis disruption",
      },
      {
        id: "MAST-EMF-1",
        title: "EMF triggers mast cell degranulation measurable by serum tryptase",
        description: "Ca²⁺ is the primary trigger for mast cell degranulation. EMF → VGCC → Ca²⁺ → mast cell releases histamine + IL-1β + tryptase. [[ref:johansson2000_mast|Johansson 2000]] showed mast cell changes in skin biopsies after display terminal exposure. Test: measure serum tryptase (specific mast cell degranulation marker) before and after standardized EMF exposure. Prediction: acute EMF exposure produces measurable tryptase elevation.",
        timeline: "Testable within 3 months (blood draw + EMF exposure, simple protocol)",
        falsification: "No tryptase elevation after EMF exposure",
      },
      {
        id: "MAST-EMF-2",
        title: "Mast cell stabilizers prevent EMF-induced skin and systemic reactions",
        description: "If EMF symptoms are partly mediated by mast cell degranulation, mast cell stabilizers (cromolyn sodium, ketotifen) should prevent them. Test: RCT of cromolyn + EMF exposure vs placebo + EMF exposure in EHS patients. Measure: skin reactions, systemic symptoms, serum histamine/tryptase. Prediction: cromolyn group shows significantly fewer symptoms and lower histamine/tryptase.",
        timeline: "Testable within 6 months (RCT with existing approved drugs)",
        falsification: "Mast cell stabilizers do NOT reduce EMF-induced symptoms",
      },
      {
        id: "KCC2-EMF-1",
        title: "Prenatal EMF exposure delays GABA excitatory→inhibitory switch in offspring",
        description: "Environmental disruptions (stress, inflammation) delay KCC2 maturation → GABA stays excitatory longer → Q-factor elevated longer → wider vulnerability window. IL-1β (from mast cells or glia) → KCC2↓. ROS → KCC2↓. EMF → both ROS and IL-1β. Test: expose pregnant rodents to EMF; measure KCC2/NKCC1 ratio in offspring hippocampus at P7, P14, P21. Prediction: EMF-exposed offspring show delayed KCC2 switch.",
        timeline: "Testable within 9 months (rodent prenatal exposure model)",
        falsification: "No difference in KCC2 maturation timeline between EMF-exposed and control offspring",
      },
      {
        id: "TRIPLE-1",
        title: "T↓ × cortisol↑ × DA↓ triple deficit measurable in high-EMF populations",
        description: "The triple lock theory predicts that EMF simultaneously reduces testosterone (HPG), elevates cortisol (HPA), and reduces dopamine (mesolimbic). Each has been verified independently; the prediction is that they co-occur in the SAME individuals proportional to EMF exposure. Test: measure T, cortisol, and urinary HVA (dopamine metabolite) in high vs low EMF occupations. Prediction: triple deficit pattern (T↓ + cortisol↑ + HVA↓) correlates with cumulative EMF exposure.",
        timeline: "Testable immediately (occupational cohort with hormone + neurotransmitter panel)",
        falsification: "The three deficits do not co-occur — they are independent of each other and of EMF exposure",
      },
      {
        id: "HIPPO-1",
        title: "Chronic EMF exposure correlates with hippocampal volume loss",
        description: "EMF → cortisol↑ → hippocampal dendritic retraction + neurogenesis↓ → volume loss. Hippocampus is also the HPA negative feedback center — its damage removes cortisol braking → cortisol↑↑ (feedback loop S9). Test: compare hippocampal volume (MRI volumetry) in workers with >10 years high-EMF exposure vs matched controls, controlling for age, stress, depression. Prediction: high-EMF group shows reduced hippocampal volume.",
        timeline: "Testable immediately (retrospective MRI volumetry study)",
        falsification: "No hippocampal volume difference between chronic high-EMF and low-EMF occupation groups after controlling for confounders",
      },
      {
        id: "KLIM-1",
        title: "EMF reduction reverses BAT suppression measurable by thermal imaging",
        description: "If EMF → PRDM16↓ → BAT↓ → thermogenesis↓ → weight gain, then EMF reduction should restore BAT function. Test: measure supraclavicular BAT activity (infrared thermography after cold challenge) before and after 3-month EMF reduction protocol. Prediction: EMF reduction group shows increased BAT thermogenesis and modest weight loss without dietary change.",
        timeline: "Testable within 6 months (thermal imaging + EMF reduction protocol)",
        falsification: "No change in BAT thermogenesis after EMF reduction",
      },
    ],
    suppPredictions: [
      {
        id: "E-NEW-1",
        title: "Sperm CatSper Ca²⁺ response is EMF-exposure dependent",
        description: "CatSper channels in sperm activate prematurely under RF-EMF, causing energy depletion before reaching the egg (‘premature energy expenditure’). Test: dose-response study of CatSper activation vs SAR level in human sperm samples. Prediction: CatSper activation increases with SAR; sperm exposed to mobile-phone-level RF show premature hyperactivation and reduced fertilization capacity.",
        timeline: "Testable within 6 months (in vitro sperm + RF exposure)",
        falsification: "No dose-dependent relationship between SAR and CatSper activation",
      },
      {
        id: "E-NEW-2",
        title: "GnIH antagonist protects testosterone during EMF exposure",
        description: "Cortisol↑ → GnIH↑ → GnRH↓ → T↓ is a verified cross-suppression pathway. RF9 (GnIH antagonist) restored T in cortisol-treated primates. Test: expose rodents to chronic EMF with/without RF9-type GnIH antagonist. Prediction: GnIH antagonist prevents EMF-induced T decline, confirming HPA-HPG cross-suppression as the mechanism.",
        timeline: "Testable within 12 months (rodent model with pharmacological intervention)",
        falsification: "GnIH antagonist does NOT prevent EMF-induced testosterone decline",
      },
      {
        id: "E-NEW-3",
        title: "Chronic RF alters OPC Cav1.2 expression and myelination timing",
        description: "Cav1.2 is essential for OPC differentiation and myelination. SMF increases Cav1.2 in OPCs. Chronic RF may dysregulate Cav1.2 in developing brain → myelination timing disruption → white matter integrity↓. Test: expose developing rodent brains to chronic RF; measure Cav1.2 expression in OPCs and myelination markers (MBP, PLP) at developmental timepoints. Prediction: RF-exposed animals show altered myelination timing.",
        timeline: "Testable within 12 months (developmental rodent model)",
        falsification: "No change in OPC Cav1.2 expression or myelination timing after chronic RF",
      },
      {
        id: "E-NEW-4",
        title: "200 kHz intermediate frequency INCREASES NK cell activity",
        description: "TTFields (200 kHz) increase NK cytotoxicity while 50 Hz ELF suppresses it — direct validation of BERM’s frequency-dependent pathway hierarchy. Test: compare NK cell cytotoxicity across ELF (50 Hz), RF (900 MHz, 2.4 GHz), and IF (200 kHz) exposures. Prediction: IF range shows NK activation while ELF and RF show suppression — different frequencies, different biological outcomes via the same VGCC mechanism.",
        timeline: "Testable within 6 months (in vitro NK cell assay across frequencies)",
        falsification: "All frequencies produce the same NK cell response direction",
      },
      {
        id: "E-NEW-5",
        title: "Gut Per2 expression correlates with EMF exposure",
        description: "Per2 knockout disrupts gut barrier → LPS enters bloodstream → neuroinflammation → depression. EMF disrupts circadian rhythm → Per2↓. Test: measure Per2 expression in gut epithelial biopsies of shift workers (circadian disruption proxy) vs day workers, correlated with EMF exposure history and serum LPS levels. Prediction: EMF/circadian disruption → Per2↓ → elevated serum LPS.",
        timeline: "Testable within 12 months (occupational cohort with gut biopsies)",
        falsification: "No correlation between EMF exposure and gut Per2 expression or serum LPS",
      },
      {
        id: "E-NEW-6",
        title: "Sleep restriction + EMF produces superadditive testosterone decline",
        description: "5h sleep → T -10-15% ([[ref:leproult2011_testosterone_sleep|JAMA 2011]]). EMF → T↓ via three routes (VK13, VK15, VK22). Combined sleep restriction + EMF should produce GREATER T decline than either alone (superadditive). Test: 2×2 factorial RCT: normal sleep/restricted sleep × low EMF/high EMF. Measure T at baseline and after 1 week. Prediction: interaction term is significant — combined group shows >25% T decline vs ~15% for sleep alone.",
        timeline: "Testable within 3 months (controlled sleep + EMF study)",
        falsification: "No interaction effect — sleep and EMF effects on T are purely additive",
      },
      {
        id: "E-NEW-7",
        title: "RF-exposed children have lower BDNF and dendritic spine density",
        description: "RF 835 MHz (postnatal) reduces BDNF in CA1 and dentate gyrus with dendritic spine loss and memory impairment ([[ref:bdnf_rf_dev_2021|PMC8159076]]). Meanwhile ELF increases BDNF (hormesis). Test: measure serum BDNF in children stratified by personal RF exposure (phone use, WiFi proximity). Prediction: higher RF exposure correlates with lower BDNF and poorer spatial memory scores.",
        timeline: "Testable within 12 months (pediatric cohort with EMF dosimetry)",
        falsification: "No correlation between RF exposure and BDNF levels in children",
      },
      {
        id: "E-NEW-8",
        title: "Gut barrier permeability (LPS marker) correlates with EMF exposure",
        description: "EMF → melatonin↓ → Per2↓ in gut → barrier disruption → LPS enters bloodstream → systemic inflammation. Gut barrier uses the SAME tight junction proteins as BBB (ZO-1, occludin, claudins), and melatonin protects both. Test: measure serum LPS-binding protein and zonulin (gut permeability markers) in high-EMF vs low-EMF occupation workers. Prediction: high-EMF group has elevated gut permeability markers.",
        timeline: "Testable immediately (occupational cohort with blood draw)",
        falsification: "No difference in gut permeability markers between EMF exposure groups",
      },
    ],
    finalPredictions: [
      {
        id: "E-NEW-9",
        title: "Hidden hypothyroid: FT3/FT4 ratio is lower in high-EMF workers",
        description: "EMF reduces hypothalamic Dio2/Dio3 → T4→T3 conversion is inhibited → blood T4 appears 'normal' but tissues don't receive T3. Test: measure FT3/FT4 ratio in high-EMF occupations (telecom, electricians) vs matched low-EMF controls. Prediction: high-EMF group has significantly lower FT3/FT4 ratio despite normal TSH and T4.",
        timeline: "Testable immediately (occupational cohort with blood draw)",
        falsification: "No difference in FT3/FT4 ratio between EMF exposure groups",
      },
      {
        id: "E-NEW-10",
        title: "Transgenerational sperm methylation persists to F3",
        description: "EMF alters sperm epigenome dose-dependently (1 mT: methylation↓, 3 mT: methylation↑). If EMF effects follow the DDT transgenerational model, methylation changes should persist to F3. Test: expose F0 rodents to chronic EMF; analyze sperm methylation profiles in F1, F2, F3. Prediction: F3 sperm methylation retains EMF-signature from F0 exposure. BERM's HIGHEST PRIORITY research proposal.",
        timeline: "Testable within 18-24 months (multigenerational rodent study)",
        falsification: "F3 sperm methylation is indistinguishable from controls",
      },
      {
        id: "E-NEW-11",
        title: "EMF exposure duration correlates with telomere shortening",
        description: "EMF→ROS↑ + melatonin↓→telomerase↓ + SIRT1↓ should accelerate telomere shortening. Test: measure leukocyte telomere length in occupational EMF cohort stratified by exposure years. Control for age, smoking, BMI. Prediction: cumulative EMF exposure correlates with shorter telomeres after controlling for confounders.",
        timeline: "Testable immediately (occupational cohort with blood draw)",
        falsification: "No correlation between EMF exposure duration and telomere length",
      },
      {
        id: "E-NEW-12",
        title: "Melatonin supplementation slows telomere shortening in high-EMF population",
        description: "Melatonin activates telomerase + SIRT1 (anti-aging). EMF→melatonin↓ removes this protection. Test: RCT of melatonin supplementation (3-5 mg/night, 12 months) in high-EMF workers. Measure telomere length at baseline and 12 months. Prediction: melatonin group shows significantly less telomere shortening than placebo.",
        timeline: "Testable within 12 months (supplementation RCT)",
        falsification: "Melatonin supplementation does not affect telomere attrition rate",
      },
      {
        id: "E-NEW-13",
        title: "Oxytocin levels inversely correlate with EMF exposure",
        description: "Oxytocin release is directly VGCC-dependent (N-type + L-type Ca²⁺ channels). EMF disrupts VGCC → OXT release disrupted. Test: measure salivary or plasma oxytocin in controlled EMF exposure study (pre/post acute exposure). Prediction: acute EMF exposure reduces oxytocin response to social stimuli.",
        timeline: "Testable within 6 months (controlled lab study)",
        falsification: "No change in oxytocin levels after EMF exposure",
      },
      {
        id: "E-NEW-14",
        title: "ELF-exposed animals show α2δ-1↑ WITHOUT nerve injury",
        description: "ELF-priming (VK4) upregulates VGCC expression including α2δ-1 subunits. α2δ-1 overexpression alone produces neuropathic pain behavior WITHOUT nerve injury. Test: expose rodents to chronic ELF (50 Hz, 8-10 days); measure α2δ-1 expression in DRG and spinal dorsal horn. Prediction: ELF produces α2δ-1 upregulation and pain-like behavior without nerve damage.",
        timeline: "Testable within 6 months (rodent ELF exposure model)",
        falsification: "No change in α2δ-1 expression after chronic ELF exposure",
      },
      {
        id: "E-NEW-15",
        title: "ASD children's NKCC1/KCC2 ratio correlates with prenatal EMF",
        description: "NKCC1/KCC2 ratio is elevated in ASD (GABA stays excitatory). EMF disrupts KCC2 maturation via IL-1β (S9) and ROS. Test: measure plasma NKCC1/KCC2 ratio in ASD children; correlate with maternal prenatal EMF exposure history (occupation, device use, residential proximity to base stations). Prediction: higher prenatal EMF correlates with higher NKCC1/KCC2 ratio in ASD cases.",
        timeline: "Testable within 12 months (case-control with maternal history)",
        falsification: "No correlation between prenatal EMF exposure and NKCC1/KCC2 ratio",
      },
      {
        id: "E-NEW-16",
        title: "Bumetanide + EMF reduction outperforms either alone for ASD",
        description: "Bumetanide blocks NKCC1 → restores inhibitory GABA. EMF reduction removes the upstream driver of KCC2↓. Together they should be superadditive. Test: 2×2 RCT in ASD children: bumetanide/placebo × EMF reduction/standard. Measure CARS score, SRS, sensory sensitivity. Prediction: combined group shows significantly better improvement than either intervention alone.",
        timeline: "Testable within 12 months (pediatric 2×2 RCT)",
        falsification: "No interaction effect — bumetanide and EMF reduction are purely additive",
      },
    ],
    extPredictions: [
      {
        id: "E-NEW-24",
        title: "ADHD children's PFC myelination correlates with prenatal EMF",
        description: "ADHD shows 5-year PFC maturation delay ([[ref:adhd_pfc_delay|Shaw 2007 PNAS]]). EMF disrupts OPC myelination via Cav1.2 (VK20) and reduces DA in PFC. Test: DTI white matter integrity in PFC of ADHD children correlated with prenatal/neonatal EMF exposure history. Prediction: higher prenatal EMF correlates with delayed PFC myelination markers.",
        timeline: "Testable within 12 months (pediatric cohort with DTI + maternal history)",
        falsification: "No correlation between prenatal EMF exposure and PFC myelination timing",
      },
      {
        id: "E-NEW-25",
        title: "EMF occupational exposure correlates with ALS risk",
        description: "Motor neurons have low Ca²⁺ buffering + Ca²⁺-permeable AMPA receptors making them selectively vulnerable to Ca²⁺ overload. Multiple meta-analyses show OR 1.3-1.7 for electrical workers. Test: pooled analysis of existing occupational cohorts controlling for confounders. Prediction: EMF exposure is an independent ALS risk factor (OR > 1.2).",
        timeline: "Testable immediately (existing meta-analyses support, need pooled re-analysis)",
        falsification: "Pooled analysis controlling for all confounders shows OR < 1.1",
      },
      {
        id: "E-NEW-26",
        title: "Gut microbiome composition changes with EMF exposure",
        description: "90%+ of serotonin is produced in gut enterochromaffin cells. EMF→circadian disruption→Per2↓→gut barrier↓ (S14) should alter microbiome. Test: 16S rRNA sequencing of gut microbiome in EMF-exposed vs controls. Prediction: EMF exposure shifts microbiome composition, specifically reducing 5-HT-producing species (Lactobacillus, Bifidobacterium).",
        timeline: "Testable within 6 months (occupational cohort with stool samples)",
        falsification: "No significant microbiome composition difference between groups",
      },
      {
        id: "E-NEW-27",
        title: "Mast cell degranulation threshold is lower in EMF-exposed individuals",
        description: "Mast cell degranulation is Ca²⁺-dependent. EMF→VGCC→Ca²⁺ should lower the activation threshold. Test: in vitro mast cell degranulation assay comparing cells from EMF-exposed vs control subjects, measuring histamine release threshold. Prediction: mast cells from EMF-exposed individuals degranulate at lower stimulation thresholds.",
        timeline: "Testable within 6 months (in vitro assay with patient-derived mast cells)",
        falsification: "No difference in degranulation threshold between groups",
      },
      {
        id: "E-NEW-28",
        title: "Vitamin D supplementation reduces EMF-induced VGCC upregulation",
        description: "Vitamin D (1,25(OH)₂D₃) downregulates CACNA1C/1D mRNA ([[ref:vdh_lvscc|J Neurosci 2001]]). Vitamin D deficiency → VGCC over-expression = same state as ELF-priming (VK4). Test: measure VGCC expression in PBMCs before/after vitamin D supplementation in deficient individuals. Prediction: vitamin D repletion reduces VGCC protein expression.",
        timeline: "Testable within 6 months (supplementation study with PBMC analysis)",
        falsification: "Vitamin D repletion does not change VGCC expression levels",
      },
      {
        id: "E-NEW-29",
        title: "Vitamin D status modulates individual EMF sensitivity",
        description: "Low vitamin D → VGCC over-expressed → more Ca²⁺ per EMF photon = higher EMF sensitivity. Test: correlate vitamin D status with EMF-induced biomarker changes (CaMKII Thr286, sleep EEG) in controlled exposure study. Prediction: vitamin D-deficient individuals show larger EMF-induced biomarker changes.",
        timeline: "Testable within 12 months (controlled EMF exposure stratified by vitamin D status)",
        falsification: "No correlation between vitamin D status and magnitude of EMF biomarker response",
      },
      {
        id: "E-NEW-30",
        title: "PEMF therapy parameters map to Ca²⁺ hormesis curve",
        description: "PEMF promotes bone growth at specific parameters while chronic EMF causes harm. Both operate through Ca²⁺ channels. Test: measure Ca²⁺ signaling in osteoblasts across PEMF parameter space (frequency, intensity, duration). Prediction: optimal PEMF parameters correspond to the Lindgren χ-parameter hormesis peak; deviation in either direction reduces benefit.",
        timeline: "Testable within 12 months (in vitro osteoblast Ca²⁺ dose-response)",
        falsification: "PEMF effects do not follow a hormesis curve through Ca²⁺ channels",
      },
      {
        id: "E-NEW-31",
        title: "Schizophrenia risk highest with CACNA1C variant + low vitamin D + high EMF",
        description: "Triple hit: CACNA1C risk variant (genetic) + vitamin D deficiency (→VGCC↑) + EMF exposure (→Ca²⁺↑) should produce highest schizophrenia risk. Test: genotype CACNA1C + measure vitamin D + estimate EMF exposure in schizophrenia case-control study. Prediction: three-way interaction is significant — triple-hit individuals have highest odds ratio.",
        timeline: "Testable within 12 months (case-control with genotyping + biomarkers)",
        falsification: "No significant three-way interaction between CACNA1C genotype, vitamin D, and EMF",
      },
    ],
    ultPredictions: [
      {
        id: "E-NEW-32",
        title: "CatSper premature activation threshold correlates with EMF exposure",
        description: "CatSper is temperature-gated (threshold 33.5°C, Q₁₀=5.1). EMF→Ca²⁺ could lower the thermal activation threshold. Test: measure CatSper activation temperature in sperm from men with different occupational EMF exposure levels. Prediction: higher EMF exposure correlates with lower CatSper activation threshold.",
        timeline: "Testable within 6 months (in vitro CatSper electrophysiology)",
        falsification: "No correlation between EMF history and CatSper activation temperature",
      },
      {
        id: "E-NEW-33",
        title: "Psilocybin reverses EMF-induced dendritic atrophy in hippocampus",
        description: "Psilocybin promotes dendritic spine growth via 5-HT2A→Ca²⁺→BDNF→mTOR (VK52). EMF→cortisol→hippocampal dendritic atrophy (VK14). Test: chronic EMF exposure → dendritic loss, then single psilocybin dose → measure dendritic recovery. Prediction: psilocybin reverses EMF-induced hippocampal dendritic loss.",
        timeline: "Testable within 12 months (rodent model: EMF exposure + psilocybin rescue)",
        falsification: "Psilocybin does not restore dendritic density after EMF-induced loss",
      },
      {
        id: "E-NEW-34",
        title: "Caffeine consumption inversely correlates with EMF biomarker response",
        description: "Caffeine blocks A2A receptors → reduces neuroinflammation → Ca²⁺ modulation. Regular caffeine consumers should show attenuated EMF biomarker responses. Test: controlled EMF exposure, stratify by caffeine consumption. Prediction: habitual caffeine consumers show smaller CaMKII Thr286 and sleep EEG changes from EMF.",
        timeline: "Testable within 6 months (add caffeine stratification to existing protocols)",
        falsification: "No difference in EMF biomarkers between caffeine consumers and non-consumers",
      },
      {
        id: "E-NEW-35",
        title: "Drinking water lithium inversely correlates with EMF-associated health outcomes",
        description: "Lithium modulates GSK-3β and CaMKII — key nodes in the BERM Ca²⁺ cascade. Areas with higher natural lithium in drinking water should show attenuated EMF health effects. Test: correlate drinking water lithium with EMF-associated disease incidence (dementia, suicide, depression) at county level. Prediction: interaction term (lithium × EMF) is significant and protective.",
        timeline: "Testable immediately (existing county-level data for lithium, EMF infrastructure, disease rates)",
        falsification: "No interaction between water lithium levels and EMF-associated health outcomes",
      },
      {
        id: "E-NEW-36",
        title: "Amygdala volume increases with chronic EMF exposure",
        description: "EMF→cortisol↑ (VK11) → amygdala BLA hypertrophy (VK55). Chronically elevated cortisol from EMF should produce measurable amygdala enlargement. Test: MRI volumetric analysis in high-EMF occupational workers vs matched controls. Prediction: amygdala volume is significantly larger in high-EMF group.",
        timeline: "Testable within 12 months (occupational cohort with MRI)",
        falsification: "No amygdala volume difference between high-EMF and low-EMF workers",
      },
      {
        id: "E-NEW-37",
        title: "Amish chronic disease gradient follows EMF exposure gradient",
        description: "Old Order Amish (no electricity) → Conservative Amish (some electricity) → Mennonite (modern electricity) → general population. Test: compare chronic disease rates across this cultural gradient. Prediction: disease rates increase monotonically with EMF exposure level, even after controlling for diet, exercise, and lifestyle factors.",
        timeline: "Testable within 12 months (cross-sectional comparison of existing health registries)",
        falsification: "Disease gradient does not follow EMF exposure after controlling for lifestyle confounders",
      },
      {
        id: "E-NEW-38",
        title: "Amish dairy cows have better fertility than modern dairy cows",
        description: "Amish dairy farms have minimal EMF. If EMF affects bovine reproduction through the same Ca²⁺ mechanisms, Amish-farm cows should show better fertility. Test: compare conception rates, services per conception, hormone profiles in Amish vs modern dairy. Prediction: Amish-farm cows have significantly better fertility despite same breeds.",
        timeline: "Testable within 6 months (existing agricultural data + hormone sampling)",
        falsification: "No fertility difference between Amish and modern dairy cows of same breed",
      },
      {
        id: "E-NEW-39",
        title: "Modern water filtration reduces lithium → increased neuropsychiatric disease",
        description: "Modern water treatment removes trace lithium. Areas that switched to advanced filtration should show increased dementia/suicide rates after the switch. Test: before-after analysis of water treatment upgrades and neuropsychiatric outcomes. Prediction: advanced filtration introduction correlates with subsequent increase in dementia and suicide rates.",
        timeline: "Testable immediately (municipal water treatment records + health data)",
        falsification: "No change in neuropsychiatric outcomes after water treatment upgrades that remove lithium",
      },
    ],
    ttypePredictions: [
      {
        id: "TTYPE-1",
        title: "EMF effects on testosterone are mediated primarily by T-type, not L-type channels",
        description: "Expose Leydig cell cultures to standardized EMF (ELF-modulated RF). Measure testosterone under three conditions: (1) Control, (2) + nifedipine (L-type blocker) isolates T-type contribution, (3) + ethosuximide (T-type blocker) isolates L-type contribution. Prediction: ethosuximide abolishes MORE of the EMF effect than nifedipine.",
        timeline: "Testable within 3–6 months (in vitro, Leydig cell culture)",
        falsification: "Nifedipine alone abolishes all EMF-induced testosterone change (no T-type contribution), or ethosuximide blocks less of the EMF effect than nifedipine",
      },
      {
        id: "TTYPE-2",
        title: "Modulated signals produce larger T-type effects than continuous wave at same SAR",
        description: "Expose Leydig cells to: (1) CW at 900 MHz, (2) same carrier amplitude-modulated at 16 Hz (Adey frequency), (3) same carrier modulated at 217 Hz (GSM). Same time-averaged SAR. Prediction: modulated signals produce LARGER effects because the ELF modulation envelope passes through membrane capacitance while the carrier does not.",
        timeline: "Testable within 3–6 months (in vitro, Leydig cell culture)",
        falsification: "CW and modulated signals produce equal testosterone effects at the same time-averaged SAR, or CW produces larger effects",
      },
    ],
    repPredictions: [
      {
        id: "REP-1",
        title: "Controlling all five parameters yields consistent EMF calcium efflux results",
        description: "Replicate Blackman's calcium efflux experiment with ALL five parameters controlled: (1) temperature 36.5±0.3°C stable, (2) blue-rich lighting documented, (3) DC field measured and oriented, (4) Faraday-shielded controls, (5) tissue developmental history documented. Prediction: results are consistent across laboratories when all five parameters match.",
        timeline: "Testable within 6–12 months (cell culture, standard equipment)",
        falsification: "Results remain inconsistent even when all five parameters are controlled and matched across laboratories",
      },
      {
        id: "REP-2",
        title: "EMF effects on insulin secretion are glucose-dependent",
        description: "Expose pancreatic β-cell lines to standardized EMF at three glucose concentrations (2.8 mM basal, 11 mM stimulatory, 25 mM supramaximal). Prediction: EMF effect is LARGEST at 11 mM (VGCCs maximally primed) and SMALLEST at 2.8 mM (VGCCs mostly closed). Tests the glucose-dependent χ prediction.",
        timeline: "Testable within 3–6 months (β-cell lines, standard glucose assay)",
        falsification: "EMF effect is equal across glucose concentrations, or largest at 2.8 mM basal",
      },
      {
        id: "REP-3",
        title: "BTB opening correlates with sperm quality decline in same animals",
        description: "RF-EMF exposure in rats with simultaneous measurement of: (1) BTB permeability (FITC-dextran tracer), (2) sperm concentration and motility, (3) tight junction protein expression (occludin, ZO-1). Time-series: 1, 4, 8, 12 weeks. Prediction: BTB permeability increases BEFORE sperm parameters decline (barrier damage precedes toxicity) and decline ACCELERATES over time (positive feedback).",
        timeline: "Testable within 3–6 months (standard rat model, FITC-dextran protocol)",
        falsification: "BTB permeability and sperm decline are simultaneous, or sperm decline precedes BTB opening",
      },
      {
        id: "REP-4",
        title: "Sentinel species sensitivity scales with metabolic rate",
        description: "Meta-analysis: compile EMF exposure thresholds across species (insects, birds, rodents, primates) and test whether threshold ∝ body_mass^(0.25). If the metabolic χ scaling is correct, smaller species show effects at lower exposure levels following Kleiber’s law.",
        timeline: "Testable immediately (meta-analysis of existing literature)",
        falsification: "No correlation between body mass and EMF effect threshold, or inverse correlation",
      },
    ],
    diffPredictions: [
      {
        id: "DIFF-1",
        title: "Prenatal EMF correlates with shorter AGD in newborn boys",
        description: "Prenatal EMF exposure correlates with shorter anogenital distance (AGD) in newborn boys. Test: measure AGD in birth cohorts with documented maternal EMF exposure. Control for phthalates, BMI, smoking. If negative, prenatal channels 1-3 are weak.",
        discriminating: true,
        critical: true,
        level: "L*",
        verified: false,
      },
      {
        id: "DIFF-2",
        title: "CACNA1C × prenatal EMF → ASD + gender-atypical development",
        description: "CACNA1C risk variant carriers with high prenatal EMF show higher rates of ASD+gender-atypical development than non-carriers with same exposure. GxE interaction test.",
        discriminating: true,
        critical: false,
        level: "L*",
        verified: false,
      },
      {
        id: "DIFF-3",
        title: "Puberty onset inversely correlates with EMF/screen time",
        description: "Puberty onset age inversely correlates with childhood EMF/screen time exposure. VERIFIED: CPP increased 3× in girls, 2× in boys ([[ref:denmark-cpp-3x-increase|Denmark 1998-2017]]). COVID screen time increase → CPP surge.",
        discriminating: false,
        critical: false,
        level: "M|C",
        verified: true,
      },
      {
        id: "DIFF-4",
        title: "Salivary oxytocin inversely correlates with EMF exposure",
        description: "Salivary oxytocin levels in adolescents inversely correlate with personal EMF exposure (phone use hours). Test: biomarker study with dosimetry.",
        discriminating: false,
        critical: false,
        level: "L*",
        verified: false,
      },
      {
        id: "DIFF-5",
        title: "Insular cortex activation differs by EMF exposure level",
        description: "Insular cortex activation patterns during interoceptive tasks differ between high-EMF and low-EMF adolescents. Test: fMRI with heartbeat detection task.",
        discriminating: false,
        critical: false,
        level: "L*",
        verified: false,
      },
      {
        id: "DIFF-6",
        title: "Gender clinic referrals correlate with technology adoption",
        description: "Gender clinic referral rates correlate with technology adoption timeline across countries. VERIFIED: Sweden +19,700%, Australia +12,650%, UK +2,457%. AFAB majority. Temporal correlation with smartphone adoption ~2010.",
        discriminating: false,
        critical: false,
        level: "L*",
        verified: true,
      },
      {
        id: "DIFF-7",
        title: "BDD prevalence increases with screen time",
        description: "Body dysmorphic disorder (BDD) prevalence increases with screen time/device use. VERIFIED: BDD prevalence rising, 'Snapchat dysmorphia' documented.",
        discriminating: false,
        critical: false,
        level: "L*",
        verified: true,
      },
    ],
    vgccPredictions: [
      {
        id: "MYOP-1",
        title: "Outdoor time protection against myopia is partially EMF-reduction mediated",
        description: "Compare myopia progression in children with identical outdoor time but different EMF exposure (Faraday-shielded vs standard outdoor areas). If EMF reduction adds to light's protective effect, it confirms the VGCC/DA channel.",
        level: "L*",
        discriminating: true,
        verified: false,
      },
      {
        id: "IMMUNE-1",
        title: "Chronic EMF exposure elevates baseline NFAT activation in T-cells",
        description: "Measure NFAT nuclear translocation in T-cells from high-EMF vs low-EMF populations matched for other factors.",
        level: "M|C",
        discriminating: false,
        verified: false,
      },
      {
        id: "HEAR-1",
        title: "Bluetooth earphone use duration correlates with subclinical hearing loss in young adults",
        description: "Control for volume level. Prediction: EMF component (Bluetooth RF) adds to acoustic damage via Cav1.3 excitotoxicity.",
        level: "M|C",
        discriminating: false,
        verified: false,
      },
      {
        id: "MIGR-1",
        title: "CACNA1I T-type variant carriers have higher EMF-triggered migraine frequency",
        description: "GxE interaction: T-type variant × EMF exposure → more cortical spreading depression events → more migraines.",
        level: "E",
        discriminating: true,
        verified: false,
      },
      {
        id: "SLEEP-2",
        title: "Sleep spindle density inversely correlates with evening EMF exposure",
        description: "Measure EEG sleep spindles in subjects with/without evening screen use. Prediction: spindle density ↓ in high-EMF group due to Cav3.3 nRt perturbation.",
        level: "M|C",
        discriminating: false,
        verified: false,
      },
      {
        id: "PCOS-1",
        title: "PCOS prevalence correlates with national EMF density controlling for BMI and diet",
        description: "Cross-national analysis. Prediction: positive correlation because 4 Modulome organs (pancreas, theca, granulosa, pituitary) converge on PCOS pathophysiology.",
        level: "M",
        discriminating: false,
        verified: false,
      },
      {
        id: "PAIN-1",
        title: "Cav3.2 blocker attenuates EMF-induced pain sensitization in animal model",
        description: "Expose rats to chronic EMF, measure pain thresholds, then administer selective Cav3.2 blocker. Prediction: blocker reverses EMF-induced hyperalgesia.",
        level: "M|C",
        discriminating: true,
        verified: false,
      },
      {
        id: "QT-1",
        title: "QTc interval positively correlates with cumulative EMF exposure in young adults",
        description: "EKG screening study with EMF dosimetry. Prediction: chronic EMF → Cav1.2 window current ↑ → action potential prolongation → measurable QTc increase.",
        level: "M|C",
        discriminating: false,
        verified: false,
      },
      {
        id: "TDP-1",
        title: "TheraBionic efficacy is abolished by co-administration of T-type Ca²⁺ channel blocker",
        description: "Already confirmed by FDA label (contraindication with CCBs). Further test: specific T-type blocker (ethosuximide) should abolish TheraBionic's anti-HCC effect while L-type blocker (nifedipine) should have less effect.",
        level: "E",
        discriminating: true,
        verified: true,
      },
      {
        id: "UNIFIED-1",
        title: "Same individual shows correlated VGCC-dependent biomarkers across systems",
        description: "In a single cohort, measure: HRV (cardiac Cav3), sleep spindle density (Cav3.3), pain threshold (Cav3.2 DRG), melatonin (CRY/Cav), sperm quality (Cav3 Leydig). Prediction: all should correlate within individuals because all share VGCC/Ca²⁺ as upstream cause.",
        level: "M",
        discriminating: true,
        verified: false,
      },
    ],
    tTfrPredictions: [
      {
        id: "T-TFR-1",
        title: "USA TFR will drop below 1.30 by 2035",
        description: "Based on testosterone threshold model: USA cumulative T loss reaches ~40% around 2030. Prediction: TFR will begin accelerating decline after 2028, dropping below 1.30 by 2035. Falsification: USA TFR remains above 1.40 in 2035.",
        discriminating: true,
        critical: true,
        level: "M|C",
        verified: false,
      },
      {
        id: "T-TFR-2",
        title: "Finland TFR will drop below 1.00 by 2032",
        description: "Finland is already past the biological threshold. Current trajectory: 1.87 (2010) → 1.26 (2024), −4.5%/year. Projection: 1.26 × 0.955^8 ≈ 0.87 by 2032. Falsification: Finland TFR stabilizes above 1.10.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "T-TFR-3",
        title: "Israel TFR will begin declining measurably by 2035",
        description: "Israel's cultural buffer has maintained TFR ~3.0 despite T decline comparable to USA. Prediction: biological threshold (~40% cumulative loss) reached ~2035, at which point even religiously motivated couples will experience subfertility. Falsification: Israel TFR remains above 2.8 in 2040.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "T-TFR-4",
        title: "Korea's $200B pronatalist spending will not raise TFR above 1.0",
        description: "Korea is past the biological threshold (~49% cumulative T loss). Social incentives cannot compensate for biological incapacity. Prediction: TFR stays below 1.0 through 2035 regardless of policy spending. Falsification: Korea TFR rises above 1.0 sustained for 3+ years.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "T-TFR-5",
        title: "T decline rate predicts TFR change better than GDP or education",
        description: "Cross-national regression: T decline rate (age-independent secular trend) predicts TFR change better than GDP, education, or urbanization alone. Testable with existing data from USA, Denmark, Finland, Israel and pending Asian studies. Falsification: GDP or education explain >80% of TFR variance after controlling for T decline.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
    ],
    causalPredictions: [
      {
        id: "CAUS-1",
        title: "BMI mediation accounts for 25–40% of total T decline",
        description: "Formal mediation analysis (Baron & Kenny or SEM) on longitudinal T data with concurrent BMI: indirect effect via BMI = 25–40% of total effect. Based on [[ref:mazur2013|Mazur 2013]] quantification (117/175 ng/dL = 67% direct). Falsification: mediation analysis shows <10% or >60% indirect effect via BMI.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "CAUS-2",
        title: "Faraday-shielded men show neither T decline nor BMI increase",
        description: "If EMF drives both T decline and BMI increase, then men in EMF-shielded environments should show attenuation of BOTH trends. Testable in occupational cohorts (submarine crews, shielded facilities). Falsification: shielded cohort shows same T decline rate as unshielded.",
        discriminating: true,
        critical: true,
        level: "M|C",
        verified: false,
      },
      {
        id: "CAUS-3",
        title: "LH decline rate correlates with EMF-proxy across countries",
        description: "[[ref:santi2025|Santi 2025]] found global LH decline. BERM predicts this is Route C/D mediated. Countries with higher EMF-proxy (residential electricity, broadband penetration) should show steeper LH decline. Testable with country-level LH data + EMF-proxy. Falsification: no correlation between EMF-proxy and LH decline rate.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
    ],
    popPredictions: [
      {
        id: "POP-1",
        title: "Amish TFR correlates inversely with distance to nearest urban area",
        description: "Within CAPED database: Amish communities closer to cities (higher ambient EMF) should have lower TFR than remote Amish communities, controlling for sect strictness and community size.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "POP-2",
        title: "Tsimane newborn AGD is longer than Trinidad (nearest city) newborn AGD",
        description: "AGD measurement in Tsimane Health and Life History Project cohort vs. urban Trinidadian comparison group. Same geographic region, different EMF exposure. If Tsimane AGD > Trinidad AGD, supports prenatal EMF → masculinization↓.",
        discriminating: true,
        critical: true,
        level: "L*",
        verified: false,
      },
      {
        id: "POP-3",
        title: "Mosetén health metrics fall between Tsimane and Western on EVERY measured variable",
        description: "Already partially confirmed (dementia, brain atrophy). Predict the same gradient for: fertility, metabolic syndrome, autoimmune markers, myopia, sleep quality. This gradient within a genetically matched population is the strongest available natural experiment.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "POP-4",
        title: "Indigenous communities adopting mobile technology show health deterioration within 5-10 years",
        description: "Longitudinal tracking of communities transitioning from no-phone to smartphone use. Predict: sleep quality↓, myopia↑, metabolic markers↑, fertility intention unchanged but biological fertility markers (hormones, sperm) ↓.",
        discriminating: true,
        critical: false,
        level: "L*",
        verified: false,
      },
    ],
    societalPredictions: [
      {
        id: "SOC-1",
        title: "Male labor force participation continues declining in all high-EMF countries",
        description: "Male labor force participation rate will continue declining in every G20 country through 2030, absent a major policy intervention (e.g. universal basic income, mandatory employment programs). The dual lock predicts that population-wide testosterone decline reduces status motivation while cortisol elevation makes workplace competition aversive — producing progressive 'opting out' behavior.",
        falsification: "Male LFP increases >2 percentage points in any G20 country without major policy change by 2030",
      },
      {
        id: "SOC-2",
        title: "Sexlessness rates correlate with smartphone adoption timing across countries",
        description: "Cross-country analysis will show a significant correlation between smartphone adoption timing (year when penetration exceeded 50%) and the onset of rising sexlessness rates among 18–30 year old males. Countries with earlier smartphone adoption (e.g. South Korea, Japan) should show earlier onset of sexlessness trends than later-adopting countries.",
        falsification: "No correlation between smartphone adoption year and sexlessness trend onset across ≥10 countries",
      },
      {
        id: "SOC-3",
        title: "Low-EMF communities show stable or rising marriage rates",
        description: "Amish and Mennonite communities — which maintain low personal EMF exposure due to restricted technology use — will show stable or rising marriage rates during 2020–2030, while US national marriage rates continue declining. This tests the dual lock's prediction that the behavioral effects (reduced approach behavior, increased avoidance) are biologically mediated, not purely cultural.",
        falsification: "Amish/Mennonite marriage rates decline at a rate comparable to the US national average during 2020–2030",
      },
    ],
    techPredictions: [
      {
        id: "PRIME-1",
        title: "ELF-primed cells show amplified RF calcium response",
        description: "Pre-expose neuronal cultures to 50 Hz ELF for 10 days (priming). Then expose to standardized RF (e.g. 2.4 GHz WiFi). Prediction: primed cells show 2–3× larger Ca²⁺ response to identical RF stimulus compared to unprimed controls. The mechanism: ELF upregulates VGCC expression ([[ref:sun2016_elf_vgcc|PMC4757866]]), making each cell more sensitive to subsequent RF activation. This is the core ELF priming prediction.",
        timeline: "Testable within 3–6 months (in vitro, standard Ca²⁺ imaging)",
        falsification: "No difference in Ca²⁺ response between ELF-primed and unprimed cells under identical RF exposure",
      },
      {
        id: "PRIME-2",
        title: "Amish (no grid priming) show minimal RF bioresponse",
        description: "Compare RF-induced biomarkers (salivary cortisol, melatonin, HRV) between Old Order Amish (no residential ELF priming) and matched modern controls after identical acute RF exposure. Prediction: Amish show significantly attenuated response because their VGCC expression is at baseline (not upregulated by 50 Hz). This explains why Amish maintain TFR ~6.1 despite occasional RF exposure from neighboring infrastructure.",
        timeline: "Testable within 1–2 years (requires Amish community cooperation)",
        falsification: "Amish show equal or greater RF bioresponse than modern controls",
      },
      {
        id: "PRIME-3",
        title: "Residential electricity consumption predicts EMF biomarkers better than mobile phone use",
        description: "In a cohort study with personal EMF dosimetry, residential electricity consumption (kWh/month) will predict chronic EMF biomarkers (melatonin suppression, sperm quality, HRV) more strongly than mobile phone usage hours. The mechanism: electricity measures the ELF priming state, which amplifies ALL subsequent exposures. Mobile phone measures only one RF source. This explains the cross-sectional finding (full-model RMSE 0.522 vs 1.053).",
        timeline: "Testable within 1–2 years (cohort study with dosimetry)",
        falsification: "Mobile phone usage is a stronger predictor of biomarkers than electricity consumption",
      },
      {
        id: "MULTI-1",
        title: "Multi-frequency exposure produces superadditive CaMKII activation",
        description: "Expose cells to: (1) 50 Hz alone, (2) 2.4 GHz alone, (3) 50 kHz IF alone, (4) all three simultaneously. Measure CaMKII autophosphorylation. Prediction: combined exposure produces CaMKII activation greater than the sum of individual exposures, because different frequencies activate different VGCC subtypes but CaMKII integrates total Ca²⁺ regardless of source.",
        timeline: "Testable within 3–6 months (in vitro, standard Western blot)",
        falsification: "Combined exposure produces additive or sub-additive CaMKII activation",
      },
      {
        id: "MULTI-2",
        title: "Recovery window elimination accelerates cumulative damage",
        description: "Expose matched cell groups to identical total EMF dose: (A) continuous multi-band (simulating modern home: 50 Hz + WiFi + LED), (B) same dose but with 8-hour nightly gap (Faraday-shielded sleep period). Prediction: group B shows significantly less cumulative CaMKII activation and less oxidative damage after 30 days, because the recovery window allows Ca²⁺ homeostasis restoration. This tests whether the 24/7 nature of modern exposure — not just the dose — drives the cumulative effect.",
        timeline: "Testable within 2–4 months (in vitro, longitudinal)",
        falsification: "No difference between continuous and gapped exposure at equal total dose",
      },
      {
        id: "MULTI-5",
        title: "WiFi beacon 10 Hz pulse produces ELF-like biological effects independent of carrier",
        description: "WiFi routers emit a 10 Hz beacon pulse even when no data is transmitted (Schmid 2012). The beacon's crest factor is 100:1 — peak power is 100× higher than average (Schmid 2020). Prediction: an isolated 10 Hz pulsed signal at WiFi beacon intensity produces ELF-type biological effects (melatonin suppression, EEG alpha changes) comparable to a continuous 10 Hz sinusoidal field, despite SAR being negligible. This tests whether SAR systematically underestimates WiFi exposure by measuring average instead of peak.",
        timeline: "Testable within 3–6 months (EEG/melatonin study)",
        falsification: "WiFi beacon pulse produces no ELF-type biological effects, or effects scale with SAR not peak",
      },
      {
        id: "TECH-LED",
        title: "EU LED transition countries show steeper sperm decline than late-adopting countries",
        description: "The EU [[ref:eu_regulation_244_2009|Directive 244/2009]] forced incandescent ban between 2009–2012, mandatory LED adoption. Prediction: EU countries show a statistically significant acceleration in sperm quality decline starting 2012–2015 compared to countries that adopted LED lighting later (e.g. some Asian, African countries). This tests whether the IF channel (20–300 kHz LED driver frequencies) contributes independently to reproductive decline beyond the RF channel.",
        timeline: "Testable immediately (existing meta-analysis data)",
        falsification: "No acceleration difference between early and late LED-adopting countries",
      },
      {
        id: "TECH-EV",
        title: "EV drivers show higher IF-band biomarkers than ICE vehicle drivers",
        description: "Electric vehicle inverters produce 5–50 kHz IF fields in the cabin. Compare IF-relevant biomarkers (testicular function, HRV during driving) between matched EV and internal combustion engine (ICE) vehicle drivers with equivalent daily commute times. The Israeli patent US12379429 (active field cancellation for EV cabins) demonstrates that industry recognizes in-cabin fields as problematic. Prediction: EV drivers show measurably higher oxidative stress markers and lower HRV during driving compared to ICE drivers.",
        timeline: "Testable within 1–2 years (cohort study with dosimetry)",
        falsification: "No difference in any biomarker between EV and ICE drivers, or ICE drivers show worse markers",
      },
    ],
    layerPredictions: [
      {
        id: "LAYER-1",
        title: "Countries adopting LED later show later health acceleration",
        description: "EU LED mandate 2009–2012 forced IF channel opening. Countries that resisted or delayed LED adoption should show later IF-specific health effects (metabolic, sleep). Testable with country-level LED market share timelines vs health data acceleration points.",
        falsification: "No temporal correlation between LED adoption timing and health trend inflection points",
      },
      {
        id: "LAYER-2",
        title: "Content restrictions do NOT reduce teen mental health crisis",
        description: "If 2012 inflection is DEVICE (EMF) not CONTENT (social media), then banning social media for teens while allowing smartphone use will not reduce depression/anxiety rates. Australia's social media ban (2024) is the direct test. Norway's age verification is a secondary test.",
        falsification: "Australian social media ban produces >20% reduction in teen depression within 3 years",
        critical: true,
      },
      {
        id: "LAYER-3",
        title: "Developing country epidemics follow electrification timeline, not GDP",
        description: "For 20+ developing countries: T2D/obesity onset year correlates more strongly with electrification date (year electricity access exceeded 50%) than with GDP crossing any threshold. China T2D: 1.3% (1980) → 8.7% (2014) parallels electrification 60%→100%, not GDP per se.",
        falsification: "GDP crossing correlates more strongly than electrification date across 20+ countries",
      },
      {
        id: "LAYER-4",
        title: "EV professional drivers show IF-specific health effects by 2035",
        description: "Taxi/delivery drivers using EVs 8+ hours/day accumulate IF exposure (inverter 5–50 kHz in cabin). Predicted effects: metabolic, reproductive, cardiac — at higher rates than ICE vehicle drivers matched for sedentary time. Israeli patent US12379429 demonstrates industry awareness.",
        falsification: "No difference between EV and ICE professional drivers after 10 years on any metabolic or reproductive metric",
      },
      {
        id: "LAYER-5",
        title: "Starlink coverage eliminates last EMF-free control populations by 2035",
        description: "Tsimane, Hadza, and comparable populations will begin showing RF background exposure from LEO satellite constellations. Their health metrics will begin converging toward industrialized patterns within 10–15 years of exposure onset. IRREVERSIBLE loss of verification capacity.",
        falsification: "Starlink-covered indigenous populations show no health metric changes within 15 years",
      },
      {
        id: "LAYER-6",
        title: "The next major epidemic is IF-specific",
        description: "LED drivers + EV inverters + induction cookers + wireless charging all operate at 20–300 kHz. This is the fastest-growing and least-regulated EMF band. IF-specific health effects (distinct from ELF or RF) will emerge as a recognized category by 2035. TTFields (FDA-approved, 200 kHz) already demonstrates IF bioactivity.",
        falsification: "No IF-specific health effects identified despite increasing IF exposure by 2035",
      },
      {
        id: "LAYER-7",
        title: "COVID lockdown T2D acceleration correlates with EMF-at-home intensity",
        description: "Workers who were remote (high home EMF: WiFi+LED 24h/day, multiple devices, no commute recovery) show greater T2D acceleration than workers who continued commuting (mixed EMF environments with outdoor recovery time). Recovery_deficit is the distinguishing variable, not just sedentary time.",
        falsification: "Remote workers show same or lower T2D acceleration than commuters after controlling for physical activity",
      },
    ],
    investigationPredictions: [
      { id: "SEASON-1", title: "SAD correlates with latitude × EMF, not latitude alone", description: "SAD/depression prevalence should correlate with latitude × EMF density interaction, not with latitude as a standalone predictor. High-latitude, low-EMF communities (Amish in northern US, rural Scandinavia pre-electrification) should show lower SAD than predicted by latitude alone.", falsification: "Latitude alone predicts SAD as well as latitude × EMF interaction term" },
      { id: "SEASON-2", title: "EMF-free bedroom benefit is larger in winter", description: "The health benefit of sleeping in an EMF-free environment (Faraday cage, airplane mode, no WiFi) should be measurably LARGER in winter months at high latitudes, because CRY magnetoreceptor sensitivity is higher when ambient light is reduced.", falsification: "No seasonal variation in EMF-free sleep benefit, or benefit is larger in summer" },
      { id: "GEN-1", title: "CACNA1C A-allele frequency predicts population EMF sensitivity", description: "Populations with higher CACNA1C rs1006737 A-allele frequency show steeper health decline per unit EMF exposure. This predicts population-level variation in EMF sensitivity that is genetic, not cultural.", falsification: "No correlation between A-allele frequency and rate of EMF-associated health changes across populations" },
      { id: "GEN-2", title: "A/A genotype shows stronger EMF response than G/G", description: "In controlled EMF exposure studies, individuals with CACNA1C rs1006737 A/A genotype show larger physiological responses (sleep EEG, HRV, calcium markers) than G/G genotype individuals. Already supported by [[ref:sousouri2025|Sousouri 2025]] (ETH) for 5G sleep response.", falsification: "No genotype-dependent difference in EMF response in multiple independent controlled studies" },
      { id: "WATER-1", title: "Island and coastal populations show higher EMF sensitivity", description: "Water's dielectric constant (~80 vs air ~1) amplifies electric field conduction. Island nations and coastal populations may show higher EMF-associated health effects per unit exposure than inland populations. Japan (island, highest ASD globally) is consistent but not proof.", falsification: "No coastal/inland difference in EMF-associated health metrics after controlling for other variables" },
      { id: "BUILD-1", title: "Wood buildings produce better health outcomes than concrete", description: "Reinforced concrete reflects RF internally, increasing indoor field strength. Wood is RF-transparent. Occupants of wood buildings should show better sleep, lower stress markers, and better cardiovascular metrics than concrete building occupants, beyond what biofiilia theory predicts.", falsification: "No difference after controlling for socioeconomic factors, or concrete outperforms wood" },
      { id: "RECOV-1", title: "EMF-free bedroom increases melatonin within 2 weeks", description: "Removing all EMF sources from the bedroom (WiFi router, phone, LED lights) and sleeping in an EMF-reduced environment should produce measurable melatonin increases within 2 weeks, even without any other lifestyle change.", falsification: "No melatonin change after 4 weeks of EMF-free sleep environment" },
      { id: "RECOV-2", title: "Minimum recovery window: 4–6 hours EMF-free", description: "CaMKII dephosphorylation kinetics predict a minimum EMF-free period of 4–6 hours for meaningful Ca²⁺ homeostasis restoration. Less than 4 hours provides negligible recovery; more than 6 hours shows diminishing returns.", falsification: "No dose-response relationship between EMF-free hours and recovery markers" },
      { id: "PRENATAL-1", title: "First trimester EMF exposure correlates with ASD risk", description: "CACNA1C is critical for synaptogenesis. Prenatal Ca²⁺ disruption during developmental windows → timing errors → ASD/ADHD phenotype. Kaiser Permanente (Li et al. 2017) already showed prenatal EMF → ASD risk. First trimester should show strongest effect.", falsification: "No trimester-specific difference in EMF-ASD association" },
      { id: "MULTI-SEAS", title: "Winter × high EMF produces worst health outcomes", description: "The interaction of winter (high CRY sensitivity) and high EMF exposure should produce the worst health outcomes — worse than either factor alone. Nordic countries in winter should show peak EMF sensitivity.", falsification: "No interaction effect between season and EMF level on health outcomes" },
    ],
    sentinelPredPredictions: [
      { id: "SENT-1", title: "EMF × pesticide interaction is superadditive", description: "Combined EMF + pesticide exposure produces more severe effects than either alone. The interaction is superadditive because pesticides stress cells → Ca²⁺ dysregulation → EMF sensitivity increases. [[ref:lupi2021|Lupi 2021]] already demonstrated this in bee biochemical and behavioral markers.", falsification: "Combined effects are merely additive or sub-additive in multiple species" },
      { id: "SENT-2", title: "Bumblebee decline correlates with WiFi density", description: "Bumblebee population decline should correlate with local WiFi access point density, independent of pesticide use and habitat loss. [[ref:bumble_rf2025|New 2025 study]] already showed RF reduces bumblebee flower visitation.", falsification: "No correlation between WiFi density and bumblebee populations after controlling for pesticides" },
      { id: "SENT-3", title: "LED streetlights cause more insect decline than sodium (IF component)", description: "[[ref:boyes2021|Boyes 2021]] found LED streetlights reduced insect abundance by 52% vs sodium's 41%. The 11% difference is not explained by light spectrum alone — LED's IF emission (from SMPS drivers, 20–300 kHz) adds an EMF exposure channel that sodium lacks.", falsification: "Faraday-shielded LED shows same insect decline as unshielded LED (ruling out IF component)" },
      { id: "SENT-4", title: "Migratory birds decline faster than resident species", description: "Migratory birds depend on CRY-based magnetoreception for navigation. RF disrupts CRY. Therefore migratory species should show steeper population decline than resident species in the same habitat, independent of habitat loss.", falsification: "Resident species decline as fast or faster than migratory species in shared habitats" },
      { id: "SENT-5", title: "Faraday-shielded beehives produce more honey", description: "Bee colonies in Faraday-shielded hives (blocking ambient RF/ELF) should produce measurably more honey, show lower colony loss rates, and demonstrate better navigation (fewer lost foragers) than unshielded hives in the same location.", falsification: "No difference in honey production or colony survival between shielded and unshielded hives" },
      { id: "SENT-6", title: "Frog populations survive near EMF-free areas", description: "Frog populations should persist in areas with minimal power grid infrastructure and low RF background, while declining in electrified areas — even controlling for habitat quality, water contamination, and UV exposure. Frogs' moist skin provides direct environmental Ca²⁺ coupling.", falsification: "Frog decline is equally severe in low-EMF and high-EMF areas after controlling for habitat" },
    ],
    supplementPredictions: [
      { id: "SHIFT-1", title: "Faraday bedroom improves shift worker outcomes", description: "Shift workers who sleep in a Faraday-shielded bedroom (EMF-free) show better melatonin recovery and less metabolic syndrome than shift workers sleeping in conventional bedrooms — with the same total sleep time. The difference isolates the EMF component from the sleep deprivation component.", falsification: "No difference in metabolic or hormonal outcomes between shielded and unshielded bedrooms for shift workers" },
      { id: "SHIFT-2", title: "Shift work health effects worse in winter", description: "Shift work health effects (metabolic syndrome, depression, cardiovascular risk) should be measurably worse during winter months at high latitudes, because CRY magnetoreceptor sensitivity is higher when ambient light is reduced — amplifying EMF disruption during the critical night shift period.", falsification: "No seasonal variation in shift work health outcomes, or effects are worse in summer" },
      { id: "SHIFT-3", title: "Shift work MetS OR exceeds sleep deprivation OR", description: "The metabolic syndrome odds ratio for shift workers (OR 2.17) exceeds what pure sleep deprivation alone would predict. The excess risk is attributable to the EMF component: LED IF exposure during melatonin peak hours and eliminated recovery window.", falsification: "Sleep deprivation alone fully accounts for shift work MetS risk with no residual" },
      { id: "INDOOR-1", title: "Indoor workers have higher MetS than outdoor workers after activity matching", description: "Indoor workers (office, data center) show higher metabolic syndrome prevalence than outdoor workers (farmers, fishermen) even after matching for physical activity level. The difference is attributable to cumulative EMF exposure differential.", falsification: "No MetS difference between physically active indoor and outdoor workers" },
      { id: "INDOOR-2", title: "Indoor workers have lower melatonin than outdoor workers after light matching", description: "Indoor workers show lower nighttime melatonin levels than outdoor workers even after controlling for light exposure patterns. The residual difference reflects EMF exposure from office WiFi, LED lighting IF, and device proximity.", falsification: "No melatonin difference after controlling for light exposure" },
      { id: "POCKET-1", title: "Breast pocket users have better sperm quality than hip pocket users", description: "Men who carry their phone in a breast pocket show better sperm quality than men who carry it in a hip/front pocket — despite the same total usage time. The difference is explained by testes being in the near-field only for hip pocket users.", falsification: "No difference in sperm quality by pocket position with matched usage time" },
      { id: "POCKET-2", title: "Sperm decline acceleration correlates with data usage, not voice calls", description: "The doubling of sperm decline rate (1.16%→2.64%/yr after 2000) correlates with 3G/4G data adoption (phone stays in pocket continuously) rather than 2G voice call adoption (phone held to ear during calls only). This is a behavioral exposure change, not a technology power change.", falsification: "Sperm decline rate correlates with voice call volume rather than data usage patterns" },
      { id: "FREQ-1", title: "50 Hz countries show slightly stronger CRY-dependent effects than 60 Hz countries", description: "50 Hz (Europe) is within 2 Hz of the 8th Schumann resonance harmonic (52.0 Hz), potentially producing stronger CRY interference. European populations may show slightly stronger CRY-dependent cascade effects (melatonin suppression, depression) than American populations at matched total EMF levels.", falsification: "No difference in CRY-dependent endpoints between 50 Hz and 60 Hz countries at matched EMF" },
      { id: "REPL-1", title: "Retrospective moderator analysis predicts positive vs. null EMF studies", description: "A retrospective analysis of 50–100 published EMF bio-assay studies, coding for study month, laboratory latitude, building material, and subject background, will show that these four moderators significantly predict whether a study found a positive or null result. This is testable WITHOUT new data.", falsification: "Moderator variables do not predict study outcomes in logistic regression (p > 0.05)" },
      { id: "REPL-2", title: "Future study controlling all 7 moderators replicates consistently regardless of laboratory", description: "Winter + CACNA1C-genotyped + low lab-ELF + EMF-free sleep + chronic + pulsed + real device = positive result in EVERY lab.", falsification: "Fully controlled study still fails to replicate" },
      { id: "REPL-3", title: "CACNA1C AA-genotype individuals show measurable melatonin suppression from residential WiFi in winter at 60°N", description: "Most specific single prediction combining 3 moderators: genotype + season + exposure.", falsification: "No melatonin difference between AA and GG in winter WiFi exposure" },
      { id: "REPL-4", title: "9-hour EMF-free sleep produces measurable DNA repair vs 0-hour (WiFi on, phone in bed)", description: "Ivancsits showed 9h recovery. Subjects sleeping EMF-free show lower comet tail factor than subjects sleeping with WiFi.", falsification: "No difference in DNA damage markers between EMF-free and WiFi-exposed sleep" },
    ],
    geneticPredictions: [
      { id: "GENE-MTNR1B-1", title: "MTNR1B GG carriers show larger T2D risk increase per unit EMF than AA carriers", description: "rs10830963 G-allele → more MT2 receptors → β-cells hypersensitive to melatonin changes. EMF-induced melatonin suppression differentially affects GG carriers. The gene × EMF interaction is SUPERADDITIVE: EMF 'activates' the genetic risk that would be latent in a normal melatonin environment.", falsification: "No genotype × EMF interaction on T2D incidence in biobank analysis" },
      { id: "GENE-CRY1-1", title: "CRY1Δ11 carriers show worse sleep outcomes under residential EMF than non-carriers", description: "CRY1Δ11 (rs184039278, 0.6% frequency) lengthens the circadian period. EMF disrupts CRY → the effects are ADDITIVE: genetic lengthening + EMF disruption = longer sleep latency, shorter recovery window, and worse metabolic outcomes.", falsification: "No difference in sleep or metabolic outcomes between CRY1Δ11 carriers and non-carriers under matched EMF exposure" },
      { id: "GENE-COMT-1", title: "COMT Val/Val individuals show greater EMF-associated depression risk than Met/Met", description: "Val/Val = fast dopamine clearance = low DA baseline. EMF-induced dopamine synthesis reduction hits harder (smaller buffer). Met/Met has a higher baseline DA buffer → more resilient to EMF-induced DA reduction.", falsification: "No COMT genotype × EMF interaction on depression prevalence" },
      { id: "GENE-CACNA1D-1", title: "CACNA1D GoF carriers show higher tinnitus rates with Bluetooth earphone use", description: "Cav1.3 GoF → inner ear hypersensitivity. Bluetooth earphones activate Cav1.3 in hair cells → Ca²⁺ overload. GoF carriers reach damage threshold at lower exposure levels → tinnitus earlier.", falsification: "No association between CACNA1D genotype and tinnitus in Bluetooth users" },
      { id: "GENE-COMORBID-1", title: "Depression-T2D comorbidity is higher in CACNA1C AA + MTNR1B GG compound carriers", description: "Both conditions arise from the same melatonin suppression pathway acting in different organs (brain vs. pancreas). Compound carriers of CACNA1C rs1006737 AA (more Ca²⁺ influx → more melatonin suppression) and MTNR1B rs10830963 GG (β-cells hypersensitive to melatonin) should show the highest comorbidity rate.", falsification: "Depression-T2D comorbidity does not stratify by CACNA1C × MTNR1B genotype" },
      { id: "GENE-INTERACT-1", title: "CRY1Δ11 + MTNR1B GG compound carriers show specifically elevated morning fasting glucose", description: "CRY1Δ11 delays melatonin offset → morning melatonin still elevated. MTNR1B GG → β-cells hypersensitive to this elevated morning melatonin → insulin suppression specifically in the morning → fasting glucose elevated.", falsification: "No CRY1 × MTNR1B interaction on morning fasting glucose" },
      { id: "GENE-EHS-1", title: "EHS patients have higher CACNA GoF + lower SLC8A1/ATP2B function than matched controls", description: "EHS is a polygenic calcium threshold disorder: high influx (CACNA GoF) + slow extrusion (SLC8A1/ATP2B LoF) = Ca²⁺ accumulates → CaMKII threshold crossed at lower EMF. Genotyping EHS cohorts for these 15 genes will show enrichment of high-influx/slow-extrusion combinations.", falsification: "No calcium channel gene enrichment in EHS cohorts vs. matched controls" },
      { id: "GENE-PRS-1", title: "A 15-gene polygenic risk score predicts EMF sensitivity in controlled exposure studies", description: "Combining CACNA1C, CACNA1H, CACNA1D, CACNA1A, CACNA1B, CACNA2D1, CAMK2A, CAMK2B, SLC8A1, ATP2B1, ATP2B2, CRY1, CRY2, MTNR1B, and COMT into a single PRS should predict the magnitude of biological response to standardized EMF exposure.", falsification: "PRS does not correlate with measured EMF response in controlled exposure" },
      { id: "GXEMF-1", title: "Gene × EMF interactions are superadditive across populations", description: "Genetic risk (MTNR1B GG T2D risk ~1.5×) × EMF risk (~1.3×) produces observed risk ~2.5× (> 1.5 × 1.3 = 1.95×). EMF 'activates' genetic risks that would be latent in EMF-free environments. Testable via biobank stratification by residential EMF exposure.", falsification: "Gene × EMF interaction is purely multiplicative (no superadditivity)" },
      { id: "GXEMF-2", title: "Gabapentinoid users show reduced EMF sensitivity via α2δ-1 blockade", description: "Pregabalin/gabapentin bind α2δ-1 → block VGCC trafficking to synapses → lower synaptic VGCC density → reduced ELF priming effect. Gabapentinoid users should show attenuated biological responses to EMF exposure compared to matched non-users.", falsification: "No difference in EMF response between gabapentinoid users and non-users" },
      { id: "GXEMF-3", title: "CaMKII Thr286 autophosphorylation level in lymphocytes correlates with subjective EMF sensitivity", description: "CaMKII autophosphorylation at Thr286 is measurable in peripheral lymphocytes. Higher baseline autophosphorylation = closer to threshold = more sensitive to EMF. This could be the first OBJECTIVE biomarker for EHS.", falsification: "No correlation between lymphocyte CaMKII autophosphorylation and reported EMF sensitivity" },
      { id: "GENE-A2D-1", title: "α2δ-1 expression level predicts individual ELF priming magnitude", description: "CACNA2D1 encodes α2δ-1, the bottleneck for VGCC trafficking. Individuals with higher baseline α2δ-1 expression should show faster VGCC density increase under ELF exposure (faster priming).", falsification: "No correlation between α2δ-1 expression and VGCC density change under ELF" },
      { id: "GENE-A2D-2", title: "Pregabalin pre-treatment blocks ELF-induced VGCC upregulation in cell culture", description: "If α2δ-1 is the molecular mediator of ELF priming ([[ref:sun2016_elf_vgcc|PMC4757866]]), then pregabalin (which binds α2δ-1) should prevent the VGCC density increase observed after 8-10 days of 50/60 Hz exposure.", falsification: "Pregabalin does not prevent ELF-induced VGCC upregulation" },
      { id: "GENE-CAMK2-1", title: "CAMK2A GoF mutation phenotype matches BERM population-level prediction", description: "CAMK2A GoF mutations that increase Thr286 autophosphorylation produce epilepsy, intellectual disability, and autism ([[ref:kury2017_camk2|Küry 2017]]). BERM predicts EMF increases population-level autophosphorylation → same phenotypes at population level. Genetic validation of the mechanism.", falsification: "CAMK2A GoF phenotypes do not match EMF-predicted population health trends" },
      { id: "GENE-CAMK2-2", title: "Lymphocyte CaMKII autophosphorylation is higher in high-EMF urban residents than rural controls", description: "Urban residents (higher cumulative EMF) should show higher baseline CaMKII Thr286 autophosphorylation in peripheral lymphocytes than rural controls matched for age, diet, and activity.", falsification: "No urban-rural difference in lymphocyte CaMKII autophosphorylation" },
      { id: "GENE-NETWORK-1", title: "Multi-gene calcium channel polymorphism interaction predicts neurodevelopmental outcomes", description: "[[ref:korean2025_cacna|Korean 2025 study]] showed CACNA1A + CACNA1C + CACNA1H polymorphisms interact in pediatric DD/epilepsy. BERM predicts this extends to all 5 influx genes: compound carriers of multiple CACNA risk alleles show disproportionately higher neurodevelopmental risk.", falsification: "No multi-gene interaction effect beyond individual gene effects" },
    ],
  },
  ko: {
    title: "잠긴 예측",
    subtitle: "이 예측들은 BERM v17 스칼라 노출 아키텍처 하에서 잠겼습니다. 반증 가능: 각 예측은 명시된 연도에 관측 데이터와 비교됩니다.",
    tfrTitle: "TFR 예측",
    tfrLead: "국가별 및 전 세계 합계출산율 예측. 한 번에 하나의 파라미터 민감도 엔벨로프(신뢰 구간 아님) 포함.",
    bioTitle: "바이오마커 예측",
    bioLead: "동일한 모델 아키텍처에서 도출된 정자 농도 및 성비 예측.",
    v2Title: "BERM v17 예측 상태",
    v2Status: "국가 수준의 FieldState 보정 예측은 게시되지 않았습니다. 현재 경로에는 일치하는 로컬 FieldState, 등록된 장기 및 부부 엔드포인트, ASFR 모델링 및 외부 시간적 검증이 필요합니다.",
    v2Note: "FieldState 보정 예측이 준비되면 비교를 위해 이러한 스칼라 프록시 예측과 함께 게시됩니다.",
    histTitle: "역사적 / 진화적 예측",
    histLead: "중첩 χ 모델과 Northern Package 가설에서 도출된 예측. 집단 특이적 생물학적 χ 프로파일이 EMF-출산율 관계를 조절하는지 테스트합니다.",
    r43Title: "R43: 프로토콜-엔벨로프 공명",
    r43Text: "[[ref:zandieh2025|Zandieh et al. (2025)]]은 ELF 암세포 실험(0.01-5 Hz; 최대 100 mT)에서 주파수 의존적 미토콘드리아/ROS 관찰을 보고합니다. 네트워크 계층 엔벨로프 변조가 세포 반응을 생성하는지 테스트하기 위한 탐색적 measured-PSD 프로토콜을 지원합니다. RF 네트워크 엔벨로프 효과, eDRX 인과성 또는 생식/TFR 파라미터를 확립하지 않습니다.",
    country: "국가",
    year: "연도",
    metric: "지표",
    prediction: "예측",
    sensitivity: "민감도",
    version: "버전",
    locked: "잠금일",
    statusLabel: "상태",
    history: "버전 이력",
    sentinelTitle: "센티넬 캐스케이드 예측",
    sentinelLead: "CSLI 31개국 꿀벌-TFR 패널에서 도출된 교차종 지연 예측. 센티넬 종의 감소가 잠긴 지연으로 인간의 출산율 감소에 선행하는지 테스트합니다.",
    architectureNote: "아키텍처 참고",
    architectureText: "이 예측들은 스칼라 누적 노출 아키텍처(v17)를 사용합니다. 모바일 보급률은 기술 도입 시기 프록시로 사용됩니다. 민감도 엔벨로프는 한 번에 하나의 파라미터를 변동시킨 것으로, 확률적 신뢰 구간이 아닙니다.",
    ciExceededTitle: "3분기 반증 분석",
    finlandFalsification: "상태: CI 초과 (관측값 ~1.30, 상한 1.24). BERM 프레임워크 내 세 가지 가능한 설명: (a) 모델이 핀란드의 생물학적 효과를 과대 추정 — 지수적 EMF-TFR 관계가 모델링보다 일찍 포화. (b) 외인성 보상: 이민 TFR 기여가 추정보다 큼 — 핀란드의 이민 TFR(~1.8-2.2)이 국가 TFR을 상승. (c) CI가 너무 좁음: 모델의 불확실성 범위가 소규모 인구 TFR의 확률적 변동을 과소 추정. 판별 테스트: 핀란드 통계청에서 출생지 TFR(가용 시)을 예측과 비교. 출생지 TFR ≤ 1.24이면 설명(b)이 확인.",
    southKoreaFalsification: "상태: CI 위험 구역 (관측값 ~0.80, 상한 0.72). 세 가지 가능한 설명: (a) 모델이 한국의 EMF 억제를 과대 추정 — 문화적/정책적 요인이 TFR에 독립적 부정적 영향. (b) 측정 지연: 한국의 출산 장려 정책(현금 지원, 주거 보조)이 TFR을 일시적으로 상승. (c) 모델의 한국 회복 추정이 지나치게 낙관적. 판별 테스트: 한국 TFR이 예측 값으로 계속 하락하는지 현재 수준에서 안정되는지 추적.",
    modulomeTitle: "모듈롬 예측",
    modulomeLead: "8층 EMF 모듈롬과 치료 장치 증거에서 도출된 기전적 예측. 정성적이고 반증 가능 — 각 예측은 구체적인 실험 결과를 지정.",
    modulomeTimeline: "타임라인",
    modulomeFalsification: "반증 기준",
    modulomeLocked: "잠금일: 2026-08-21",
    modulomeStatus: "잠금 — 테스트 대기 중",
    cascadeTitle: "질병 캐스케이드 예측",
    cascadeLead: "4채널 만성 질환 캐스케이드 모델에서 도출된 예측. 7개 질병 캐스케이드가 모듈롬의 생물학적 잠복기 계층과 채널별 노출 패턴을 따르는지 테스트.",
    cascadeValidation: "검증 방법",
    cascadeFalsification: "반증 기준",
    cascadeLocked: "잠금일: 2026-08-22",
    cascadeStatus: "잠금 — 테스트 대기 중",
    cascadeLink: "캐스케이드 시각화 보기",
    nutritionalTitle: "영양 CRY 조절 예측",
    nutritionalLead: "CRY 이중 시스템 모델과 영양 조절인자(FAD/B2, 오메가 지방산, AMPK 단식 역학)에서 도출된 예측. 경로 C의 효과가 영양 중재로 수정 가능한지 테스트.",
    nutritionalTimeline: "타임라인",
    nutritionalFalsification: "반증 기준",
    nutritionalLocked: "잠금일: 2026-08-24",
    nutritionalStatus: "잠금 — 테스트 대기 중",
    metabTitle: "대사증후군 예측",
    metabLead: "6경로 EMF → 대사증후군 모델에서 도출. CaMKII 수렴은 비만, 당뇨, 에너지 대사 장애가 차폐, 약리학, 역학을 통해 테스트 가능한 공통 상류 원인을 공유한다고 예측. 비만은 다인자성 — 이 예측들은 EMF가 기여 요인인지 테스트.",
    metabTimeline: "타임라인",
    metabFalsification: "반증 기준",
    metabLocked: "잠금일: 2026-08-25",
    metabStatus: "잠금 — 테스트 대기 중",
    trpc1Title: "약리학적 경로 분리 예측",
    trpc1Lead: "경로 A(VGCC)와 경로 C의 TRPC1 칼슘 분기의 독립성을 테스트. CRY2-TRPC1 복합체([[ref:yap2025|Yap et al. 2025]])는 EMF 생식 효과가 VGCC 의존성 및 TRPC1 의존성 구성 요소로 약리학적으로 분해 가능하다고 예측.",
    trpc1Timeline: "타임라인",
    trpc1Falsification: "반증 기준",
    trpc1Locked: "잠금일: 2026-08-24",
    trpc1Status: "잠금 — 테스트 대기 중",
    pharmTitle: "약리학적 예측",
    pharmLead: "약리학적 수렴 논증에서 도출된 예측. VGCC 활성화가 주요 EMF 변환 메커니즘이라면, 특정 약물 클래스가 EMF 관련 엔드포인트에서 측정 가능한 차이를 생성해야 합니다. 기존 처방 데이터베이스 활용 — 새로운 약물 노출 불필요.",
    pharmTimeline: "타임라인",
    pharmFalsification: "반증 기준",
    pharmLocked: "잠금일: 2026-08-26",
    pharmStatus: "잠금 — 테스트 대기 중",
    modIntTitle: "모듈롬 통합 예측",
    modIntLead: "모듈롬 통합에서 도출 — 뇌하수체 허브, 미토콘드리아 ROS 증폭, 레독스 완충, 자율신경 HRV, 태반 장벽, 갑상선-EMF 상호작용. 새로 확인된 EMF 표적 조직과 메커니즘이 예측된 하류 효과를 생성하는지 테스트.",
    modIntTimeline: "타임라인",
    modIntFalsification: "반증 기준",
    modIntType: "유형",
    modIntDiscriminating: "판별적",
    modIntLocked: "잠금일: 2026-08-24",
    modIntStatus: "잠금 — 테스트 대기 중",
    sidsTitle: "영아 취약성 및 SIDS 예측",
    sidsLead: "BERM의 칼슘 프레임워크를 영아 심폐 취약성에 적용한 예측. 이온 채널 유전학, 야간 EMF 노출, 일주기 Ca²⁺ 역학이 성인 집단에서 확인된 경로를 통해 SIDS 위험에 기여하는지 테스트.",
    sidsNote: "이 예측들은 민감한 주제를 다룹니다. BERM은 기전 가설을 제공하며, 입증된 설명이 아닙니다. 알려진 보호 조치(앙와위 수면, 흡연 회피, 모유 수유)가 가장 중요한 중재입니다.",
    sidsTimeline: "타임라인",
    sidsFalsification: "반증 기준",
    sidsLocked: "잠금일: 2026-08-26",
    sidsStatus: "잠금 — 테스트 대기 중",
    sidsResTitle: "SIDS 공명 모델 예측",
    sidsResLead: "Q인자 공명 모델에서 도출: 신생아 뇌가 비감쇠 발진기(NKCC1>KCC2로 GABA가 흥분성)이며, SIDS는 신경발달 영향 스펙트럼의 치명적 종점.",
    sidsResNote: "이 예측들은 민감한 주제를 다룹니다. BERM은 기전 가설을 제공하며, 입증된 설명이 아닙니다. 알려진 보호 조치(앙와위 수면, 흡연 회피, 모유 수유)가 가장 중요한 중재입니다.",
    sidsResTimeline: "타임라인",
    sidsResFalsification: "반증 기준",
    sidsResLocked: "잠금일: 2026-08-26",
    sidsResStatus: "잠금 — 테스트 대기 중",
    neuroTitle: "신경학적 스펙트럼 예측",
    neuroLead: "Q인자 스펙트럼 모델에서 도출. 다양한 감쇠의 공통 Ca²⁺ 의존적 진동 메커니즘을 통해 SIDS, 간질, SUDEP, 편두통, 군발 두통을 통합.",
    neuroTimeline: "타임라인",
    neuroFalsification: "반증 기준",
    neuroLocked: "잠금일: 2026-08-26",
    neuroStatus: "잠금 — 테스트 대기 중",
    metalTitle: "중금속 상승효과 및 수렴 예측",
    metalLead: "수렴 검증 과정에서 도출. 중금속 × EMF 상승효과, 송과선 석회화, 광자→집단 체인, 중재 연구 포함.",
    metalTimeline: "타임라인",
    metalFalsification: "반증 기준",
    metalLocked: "잠금일: 2026-08-26",
    metalStatus: "잠금 — 테스트 대기 중",
    mechTitle: "메커니즘 체인 예측",
    mechLead: "새로 검증된 중간층의 예측: 혈액뇌장벽, 갈색지방조직, HPA축, β세포 인슐린 역학, 시상하부 넥서스, 코르티솔-해마, 라이디히 세포, 비만세포 탈과립.",
    mechTimeline: "타임라인",
    mechFalsification: "반증 기준",
    mechLocked: "잠금일: 2026-08-26",
    mechStatus: "잠금 — 테스트 대기 중",
    suppTitle: "보충 층 예측 (VK17-25)",
    suppLead: "새로 검증된 층의 예측: 정자 Ca²⁺/CatSper, 일주기 시계, 도파민 동기, OPC 수초화, NK 세포 면역, HPA-HPG 교차 억제, BDNF 호르메시스, 장-뇌 축, Walker 수면-테스토스테론 연결.",
    suppTimeline: "타임라인",
    suppFalsification: "반증 기준",
    suppLocked: "잠금일: 2026-08-26",
    suppStatus: "잠금 — 테스트 대기 중",
    finalTitle: "최종 층 예측 (VK26-31)",
    finalLead: "최종 수렴 층의 예측: 갑상선 Dio2/Dio3, 후성유전학적 세대간 유전, 텔로미어 노화 나선, 옥시토신 Ca²⁺ 교란, ELF 프라이밍 만성 통증, ASD는 BERM 프로토타입.",
    finalTimeline: "타임라인",
    finalFalsification: "반증 기준",
    finalLocked: "잠금일: 2026-08-26",
    finalStatus: "잠금 — 테스트 대기 중",
    extTitle: "확장 층 예측 (VK41-50)",
    extLead: "확장 수렴 층의 예측: ADHD 두 번째 프로토타입, ALS 칼슘 취약성, 장-뇌 세로토닌, 알레르기 유행, 비타민 D는 천연 채널 차단제, PEMF 호르메시스 역설, 생식 아크 완성.",
    extTimeline: "타임라인",
    extFalsification: "반증 기준",
    extLocked: "잠금일: 2026-08-26",
    extStatus: "잠금 — 테스트 대기 중",
    ultTitle: "최종 통합 예측 (VK51-56)",
    ultLead: "최종 수렴 통합의 예측: CatSper 온도 게이팅, 실로시빈 Ca²⁺ 리셋, 카페인-파킨슨 용량 반응, 리튬 수질 신경보호, 편도체-불안 피드백 루프, 아미쉬 대조군 검증.",
    ultTimeline: "타임라인",
    ultFalsification: "반증 기준",
    ultLocked: "잠금일: 2026-08-26",
    ultStatus: "잠금 — 테스트 대기 중",
    ttypeTitle: "T형 채널 예측",
    ttypeLead: "T형 칼슘 채널 분기 메커니즘에서 도출된 테스트 가능한 예측.",
    ttypeTimeline: "타임라인",
    ttypeFalsification: "반증 기준",
    ttypeLocked: "잠금일: 2026-08-24",
    ttypeStatus: "잠금 — 테스트 대기 중",
    repTitle: "재현성 위기 해결 예측",
    repLead: "5가지 교란 요인 프레임워크에서 도출된 테스트 가능한 예측.",
    repTimeline: "타임라인",
    repFalsification: "반증 기준",
    repLocked: "잠금일: 2026-08-24",
    repStatus: "잠금 — 테스트 대기 중",
    diffTitle: "신경발달 및 분화 예측",
    diffLead: "BERM 프레임워크에서 도출된 신경발달 및 분화 경로에 관한 예측. 확립된 내분비 교란 화학물질(EDC) 연구와 병행.",
    diffNote: "이 예측들은 L* 수준 — BERM 프레임워크에서 도출되었지만 아직 직접 테스트되지 않음. 확립된 EDC 연구와 병행.",
    diffLevel: "수준",
    diffDiscriminating: "판별적",
    diffCritical: "중요 판별 항목",
    diffLocked: "잠금일: 2026-08-24",
    diffStatus: "잠금 — 테스트 대기 중",
    diffVerifiedStatus: "검증됨",
    vgccTitle: "VGCC 유전자 패밀리 예측",
    vgccLead: "6개 유전자 VGCC 패밀리 분석에서 도출된 예측. 각 예측은 특정 칼슘 채널 하위 유형과 관련 질병 메커니즘을 대상.",
    vgccNote: "증거 수준은 예측에 따라 다름: E(실험적 지지), M|C(기전적/상관적), L*(도출/이론적).",
    vgccLevel: "수준",
    vgccDiscriminating: "판별적",
    vgccLocked: "잠금일: 2026-08-24",
    vgccStatus: "잠금 — 테스트 대기 중",
    vgccVerifiedStatus: "검증됨",
    tTfrTitle: "테스토스테론 → TFR 임계값 예측",
    tTfrLead: "테스토스테론 임계값 모델의 국가 수준 예측. 각 예측은 반증 기준과 함께 잠겨 있음. 모델은 핀란드와 한국 데이터로 보정됨; 미국과 이스라엘 예측은 외삽.",
    tTfrNote: "이 예측들은 누적 테스토스테론 감소(연간 ~1%, 연령 비의존적)가 발생 후 ~35년에 생물학적 출산율 제약을 생성한다는 핵심 주장을 테스트.",
    tTfrLocked: "잠금일: 2026-08-25",
    tTfrStatus: "잠금 — 테스트 대기 중",
    tTfrDiscriminating: "판별적",
    tTfrCritical: "중요",
    causalTitle: "인과 구조 예측",
    causalLead: "BMI 매개 인과 분석과 HPG 리셋 증거에서 도출된 예측. BERM이 제안하는 특정 인과 경로를 테스트.",
    causalNote: "이 예측들은 모델의 인과 구조를 테스트 — 크기가 아님. 형식적 매개 분석과 국가간 내분비 데이터로 반증 가능.",
    causalLocked: "잠금일: 2026-08-25",
    causalStatus: "잠금 — 테스트 대기 중",
    popTitle: "집단 비교 예측",
    popLead: "9개 저EMF 집단과 현대 집단의 체계적 비교에서 도출. 관찰된 건강 기울기가 BERM이 예측하는 EMF 노출을 추적하는지 테스트.",
    popLevel: "수준",
    popDiscriminating: "판별적",
    popCritical: "중요 판별 항목",
    popLocked: "잠금일: 2026-08-24",
    popStatus: "잠금 — 테스트 대기 중",
    tPredTitle: "테스토스테론 예측",
    tPredLead: "2단계 모델의 예측: 테스토스테론의 장기 감소가 TFR의 시간적 예측자로서.",
    tPredPredictions: [
      { id: "T-1", title: "조기/급속 전기화 국가는 T 감소 시작이 더 빠름", description: "각국 테스토스테론 장기 감소 시작 시기 비교. 5개국 이상의 조화된 종단적 T 데이터 필요.", falsification: "5개국 이상에서 T 감소 시작과 전기화 시기 사이에 상관관계 없음" },
      { id: "T-2", title: "LH+T 패턴이 모든 EMF 고노출 집단에서 시상하부성", description: "Santi 2025 진단은 EMF 고노출 집단에서 T↓+LH↓을 예측. 3개 이상의 독립 종단 코호트에서 검증.", falsification: "T 감소 중 LH가 안정적이거나 상승하는 집단이 3개 중 2개 이상" },
      { id: "T-3", title: "개의 정자 감소율이 인간 T 감소율과 일치(양쪽 ~1%/년)", description: "개는 인간과 가정 EMF 노출을 공유한다. [[ref:lea2016|Lea et al. 2016]]: 영국 종견에서 26년간 −1.0%/년 정자 감소 — 인간 테스토스테론 장기 감소와 동일 비율. 테스트: 3개국 이상에서 개 정자 감소 시작 시기와 현지 전기화 이력 비교.", falsification: "유사한 EMF 환경의 국가 간 개 정자 감소율이 >0.5%/년 차이" },
      { id: "T-4", title: "CatSper 기능이 정액 샘플에서 누적 EMF 노출에 비례하여 감소", description: "CatSper 의존 수정능 획득은 누적 EMF 노출 증가와 함께 측정 가능한 감소를 보여야 한다. 기존 IVF 클리닉 정액 샘플과 EMF 노출 설문으로 검증 가능.", falsification: "자기 보고 포켓 노출과 CatSper 의존 기능 파라미터 사이에 200 샘플 이상에서 상관관계 없음" },
      { id: "T-5", title: "CatSper 차단제 NNC55-0396가 Ca²⁺ 이동 일치 시 RF 노출과 동일한 정자 표현형 생성", description: "EMF가 주로 CatSper를 통해 정자에 작용한다면, 약리학적 CatSper 차단이 RF 노출 정자의 완전한 표현형을 재현해야 한다. [[ref:pmc6104424_nnc|Rennhack et al. 2018]]이 부분적 표현형 모방을 이미 보여줌.", falsification: "RF 노출이 CatSper 차단으로 재현할 수 없는 정자 결함을 생산" },
    ],
    tPredLocked: "잠금일: 2026-08-31",
    tPredStatus: "잠금 — 테스트 대기 중",
    societalTitle: "사회적 예측",
    societalLead: "이중 잠금 이론에서 도출: 집단 전체 테스토스테론 감소와 코르티솔 상승의 결합이 곱셈적 행동 억제를 생성. 사회적 행동 추세가 BERM이 EMF 노출에서 예측하는 호르몬 변화를 추적하는지 테스트.",
    societalTimeline: "타임라인",
    societalFalsification: "반증 기준",
    societalLocked: "잠금일: 2026-08-25",
    societalStatus: "잠금 — 테스트 대기 중",
    techTitle: "기술별 예측",
    techLead: "ELF 프라이밍 가설, 초가법성 모델, 기술별 노출 분석에서 도출. 다주파수 상호작용이 비가법적 생물학적 효과를 생성하는지, 특정 기술 전환이 관찰된 건강 변곡점을 초래했는지 테스트.",
    techTimeline: "타임라인",
    techFalsification: "반증 기준",
    techLocked: "잠금일: 2026-08-26",
    techStatus: "잠금 — 테스트 대기 중",
    layerTitle: "계층 노출 모델 예측",
    layerLead: "계층 노출 모델에서 도출 — CaMKII 임계값 통합을 통해 초가법적으로 쌓이는 5개 기술 계층. 계층 모델의 역사적 검증이 전향적 예측으로 확장되는지 테스트.",
    layerFalsification: "반증 기준",
    layerLocked: "잠금일: 2026-08-26",
    layerStatus: "잠금 — 테스트 대기 중",
    investigationTitle: "조사 라인 예측",
    investigationLead: "6개 새로운 조사 라인의 예측: 계절 민감도, 유전자형, 수질, 건축 자재, 회복 윈도우, 산전 노출. 각 라인은 BERM 프레임워크에 새로운 조절 변수를 개방.",
    investigationFalsification: "반증 기준",
    investigationLocked: "잠금일: 2026-08-26",
    investigationStatus: "잠금 — 테스트 대기 중",
    sentinelPredTitle: "센티넬 종 예측",
    sentinelPredLead: "센티넬 종 층 분석의 예측. EMF 민감도가 높은 동물(개구리 > 꿀벌 > 곤충 > 조류 > 포유류)은 무작위 환경 요인이 아닌 기술 계층 적층에 대응하는 순서로 감소해야 함.",
    sentinelPredFalsification: "반증 기준",
    sentinelPredLocked: "잠금일: 2026-08-26",
    sentinelPredStatus: "잠금 — 테스트 대기 중",
    supplementTitle: "보충 예측",
    supplementLead: "6개 보충 분석 라인의 예측: 교대 근무, 실내/실외 직업 기울기, 주머니 내 휴대전화 전환, 전력 주파수 지리, 재현성 조절자 분석.",
    supplementFalsification: "반증 기준",
    supplementLocked: "잠금일: 2026-08-26",
    supplementStatus: "잠금 — 테스트 대기 중",
    geneticTitle: "유전적 감수성 예측",
    geneticLead: "15개 유전자 칼슘 감수성 프로파일의 예측. EMF 감수성이 다유전적으로 결정되고 유전자 × EMF 상호작용이 초가법적이라는 가설을 테스트.",
    geneticFalsification: "반증 기준",
    geneticLocked: "잠금일: 2026-08-26",
    geneticStatus: "잠금 — 테스트 대기 중",
    plantCryTitle: "생태계 및 식물 CRY 예측",
    plantCryLead: "영양 단계를 가로지르는 보편적 CRY/RPM 메커니즘에서 도출된 예측. 마스팅 동기화, 식물 생식, 생태계 역학이 크립토크롬을 통해 전자기장 매개변수에 반응하는지 검증한다.",
    plantCryPredictions: [
      {
        id: "MAST-SOLAR-1",
        metric: "마스팅 빈도 vs 태양흑점수(SSN)",
        prediction: "슈퍼 마스트 연도(여러 종이 동시에 마스팅)는 자연 RF가 가장 낮은 태양 극소기와 상관. MASTREE 데이터베이스 + SSN 기록으로 검증 가능.",
        status: "pending",
        locked: "2026-08-31",
      },
      {
        id: "MAST-RF-1",
        metric: "마스팅 동기성 vs 인위적 RF 배경",
        prediction: "기지국/도시 근처 산림에서 마스팅 동기성이 약함. 이미 부분적으로 보고됨(Bogdziewicz 2021) 기후변화로 설명. BERM 대안: RF가 CRY2 교란.",
        status: "pending",
        locked: "2026-08-31",
      },
      {
        id: "PLANT-CRY-RF-1",
        metric: "CRY2 녹아웃 식물 vs 야생형 RF 노출 하",
        prediction: "CRY2 녹아웃 애기장대는 RF에서 개화 시기 변화 없음; 야생형은 변화 있음. Ahmad 2020은 CRY1 효과를 보여줌; CRY2 개화 효과는 녹아웃으로 미검증. 식별 시험.",
        status: "pending",
        locked: "2026-08-31",
      },
      {
        id: "MAST-SOIL-B2-1",
        metric: "마스팅 동기성 vs 토양 미생물 B2 생산",
        prediction: "B2가 풍부한 토양에서 마스팅 동기성이 높음. 토양 미생물이 리보플라빈(B2)을 생산하여 식물 내인성 FAD 보충. 고갈된 토양 → 미생물 B2 감소 → CRY2 불안정 → 동기성 약화. 추측적(L*).",
        status: "pending",
        locked: "2026-08-31",
      },
    ],
    plantCryStatus: "잠금 — 테스트 대기 중",
    plantCryLocked: "잠금일: 2026-08-31",
    criticalLabel: "중요",
    pharmEvidenceLink: "약리학적 증거 →",
    infantEvidenceLink: "영아 취약성 증거 →",
    neuroEvidenceLink: "신경학적 스펙트럼 증거 →",

    // Inline UI strings (former ternaries)
    dashPredictions: "예측",
    dashCategories: "카테고리",
    dashVerified: "검증됨",
    dashAwaiting: "테스트 대기 중",
    dashPredictionStatus: "예측 상태",
    statusBarAria: "상태 바: 검증됨 4건, 대기 중 254건, CI 초과 2건",
    statusVerified: "검증됨",
    statusAwaiting: "테스트 대기 중",
    statusCiExceeded: "CI 초과",
    tfrExplanation: "회색 선은 세계은행이 발표한 TFR 데이터입니다. 파란 웨지는 잠긴 민감도 엔벨로프이며, 신뢰 구간이 아닙니다. 예측 연도의 관측값이 발표되면 다이아뫬드로 표시됩니다: 녹색은 엔벨로프 내, 빨간색은 외부.",
    finland2030Label: "핀란드 2030 — TFR",
    ciExceededBadge: "초과",
    southKorea2030Label: "한국 2030 — TFR",
    ciRiskZone: "위험 구역",
    speciesAria: "체중별 종 민감도",
    sensitivityLabel: "민감도",
    insects: "곤충",
    smallBirds: "소형 조류",
    amphibiansLabel: "양서류",
    smallMammals: "소형 포유류",
    largeMammals: "대형 포유류",
    humansLabel: "인간",
    predMatrixAria: "예측 매트릭스",
    animalLabel: "동물",
    humanLabel: "인간",
    populationLabel: "인구",
    reproductiveLabel: "생식",
    neuralLabel: "신경",
    metabolicLabel: "대사",
    immuneLabel: "면역",
    circadianLabel: "일주기 리듬",
    cascadePathAria: "캐스케이드 경로",
    nutritionalShort: "영양",
    metabolicShort: "대사",
    pharmacologicalShort: "약리학",
    cascadePathSubtitle: "하나의 예측 확인이 다음 예측의 증거가 된다",
    evidenceCascadePath: "증거 캐스케이드 경로",
    evidenceCascadeDesc: "영양, 대사, 약리학 예측 라인은 순차적으로 구축된다. 한 카테고리의 확인이 다음의 증거 기반이 된다.",
    evidenceCascadeAria: "증거 캐스케이드: 영양, 대사, 약리학",
    nutritionalFull: "영양학적",
    metabolicFull: "대사적",
    pharmacologicalFull: "약리학적",
    cascadeConfirmation: "왼쪽의 확인이 오른쪽의 예측을 강화한다",
    sentinelHierarchyTitle: "센티넬 종의 민감도 계층",
    sentinelHierarchyDesc: "EMF 민감도는 체중에 따라 스케일링: M^(-0.25). 소형 종이 더 민감하다.",
    sentinelHierarchyAria: "센티넬 종의 민감도 계층",
    sensitivityTop: "민감도 (최상단이 가장 높음)",
    emfSensitivity: "EMF 민감도",
    nextLabel: "다음",
    sourcesTitle: "출처",

    // Prediction arrays (technical content preserved from en)
    modulomePredictions: [
      {
        id: "M-1",
        title: "Faraday-shielded IVF laboratory",
        description: "An IVF laboratory with Faraday-cage EMF shielding will show significantly higher fertilization, blastocyst, and pregnancy rates compared to standard laboratories.",
        timeline: "Testable within 1–2 years",
        falsification: "No difference in any IVF outcome metric",
      },
      {
        id: "M-2",
        title: "Earbud users: lower vagal tone",
        description: "Long-term earbud users (>4h/day for >2 years) will show significantly lower heart rate variability (HRV) compared to matched non-users, indicating reduced vagal tone.",
        timeline: "Testable immediately (wearable HRV data)",
        falsification: "No HRV difference or higher HRV in earbud users",
      },
      {
        id: "M-3",
        title: "LED vs incandescent: sperm quality in rats",
        description: "Male rats raised under LED lighting will show significantly lower sperm motility and concentration compared to rats raised under incandescent lighting, in a four-arm design separating light spectrum from EMF emission.",
        timeline: "Testable in 3–6 months",
        falsification: "No difference, or EMF-shielded LED = unshielded LED",
      },
      {
        id: "LED-1",
        title: "EU LED ban and TFR acceleration",
        description: "EU countries (mandatory LED transition 2009–2012 via [[ref:eu_regulation_244_2009|Directive 244/2009]]) show faster TFR decline in 2015–2022 compared to countries with later or no incandescent ban, controlling for mobile density, GDP, and urbanization. Central estimate: TFR decline acceleration ≥0.02/year faster in EU vs non-EU controls.",
        timeline: "Testable immediately (existing demographic data)",
        falsification: "No acceleration difference, or non-EU countries show faster decline",
      },
      {
        id: "SLEEP-1",
        title: "Faraday-shielded LED sleep test",
        description: "A Faraday-shielded bedroom (< 0.001 V/m IF) with identical LED lighting produces better sleep quality than an unshielded bedroom, even when blue light spectrum is identical. This isolates the IF emission channel from the optical channel. If true: IF emissions (not blue light) are the primary sleep disruptor from LED lighting. If false: blue light or other factors dominate. Cost estimate: < EUR 5,000.",
        timeline: "Testable within 1–3 months (N=20 crossover)",
        falsification: "No sleep quality difference between shielded and unshielded conditions with identical light spectrum",
      },
      {
        id: "M-5",
        title: "LLLT improves spermatogenesis via CCO activation",
        description: "Low-level laser therapy (620–1100 nm) applied to testes in a controlled animal study will improve spermatogenesis markers (motility, concentration, morphology) via mitochondrial cytochrome c oxidase activation — the same chromophore mechanism as FDA-approved photobiomodulation devices. If LLLT (optical EM) improves fertility via CCO, and RF (lower EM) disrupts fertility via CRY, the chromophore generalization predicts that both optical and RF frequencies modulate reproductive biology through frequency-specific chromophore targets.",
        timeline: "Testable in 3–6 months (animal study)",
        falsification: "No improvement in any spermatogenesis marker, or improvement is thermal in nature",
      },
      {
        id: "NEURO-1",
        title: "CACNA1C carriers show stronger EMF-ASD association",
        description: "In a genotyped birth cohort with documented prenatal EMF exposure: stratify ASD/ADHD diagnosis rates by CACNA1C rs1006737 genotype AND maternal EMF exposure level. Prediction: significant GxE interaction where risk allele + high EMF produces synergistic elevation in ASD/ADHD rates beyond additive effects.",
        timeline: "Requires large genotyped cohort (thousands)",
        falsification: "No GxE interaction at CACNA1C locus",
      },
      {
        id: "NEURO-2",
        title: "Lithium attenuates EMF-induced neuronal oscillation disruption",
        description: "Expose hiPSC-derived neuronal cultures to EMF and measure network oscillation patterns (MEA). Then add lithium. Prediction: lithium restores oscillation regularity because it dampens Ca²⁺ oscillations via IMPA1/inositol pathway — the same mechanism that makes it effective in bipolar disorder.",
        timeline: "Testable in 3–6 months (in vitro)",
        falsification: "Lithium does not restore oscillation regularity after EMF exposure",
      },
      {
        id: "EPI-1",
        title: "EMF-exposed fathers: offspring sperm methylation changes",
        description: "Expose male mice to chronic RF-EMF. Mate with unexposed females. Analyze F1 male offspring sperm for DNA methylation patterns. Prediction: specific DMRs overlap with those in human radar study ([[ref:res-square-2025-radar-methylation|Research Square 2025]]). If DMRs include CACNA1C or other VGCC genes, this closes the epigenetic feedback loop.",
        timeline: "Testable in 6–12 months (animal study)",
        falsification: "No DMR overlap with radar study, or no VGCC-gene DMRs in F1",
      },
      {
        id: "EPI-2",
        title: "Non-monotonic methylation response to EMF",
        description: "Replicate the GC-2 study across a wider intensity range (0.1, 0.5, 1, 2, 3, 5 mT). Prediction: methylation changes show non-monotonic dose-response with at least one sign reversal, paralleling Blackman’s Ca²⁺ window. If confirmed, Lindgren’s window dynamics operate at the epigenetic level.",
        timeline: "Testable in 3–6 months (in vitro)",
        falsification: "Monotonic dose-response with no sign reversal",
      },
      {
        id: "SCHWAN-1",
        title: "GSM produces larger sperm effects than LTE at equivalent SAR",
        description: "Expose matched sperm samples to: (1) GSM-modulated 900 MHz (217 Hz TDMA), (2) LTE-modulated 900 MHz (OFDM), (3) CW 900 MHz, all at identical time-averaged SAR. Measure motility, ROS, DNA fragmentation. Prediction: GSM > LTE > CW because GSM’s hard pulse produces the strongest ELF membrane component. Directly tests Schwan + T-type bifurcation mechanism.",
        timeline: "Testable in 1–3 months (in vitro)",
        falsification: "No difference between modulation types at equal SAR, or CW > modulated",
      },
    ],
    cascadePredictions: [
      {
        id: "P11",
        title: "COVID IF-channel retrodiction",
        description: "During lockdown, IF-sensitive diseases (infertility → improvement) and RF-sensitive diseases (depression → worsening) behave in opposite directions. The COVID lockdown acts as a natural experiment: workplace IF exposure dropped ~70% (offices with LED lighting closed) while home RF exposure rose ~40% (more phone/Wi-Fi usage). This predicts channel-specific, opposite-sign health effects.",
        validation: "GBD 2024 + national health registers",
        falsification: "No differential direction between IF-sensitive and RF-sensitive diseases during lockdown",
      },
      {
        id: "P12",
        title: "LED rollout × sperm quality",
        description: "In countries where the EU LED transition happened earlier, sperm quality decline should accelerate earlier than in countries where it happened later. EU vs non-EU difference-in-differences design, controlling for mobile density, GDP, and urbanization.",
        validation: "[[ref:levine2023_sperm|Levine meta-analysis]] country-specific estimates + EU [[ref:eu_regulation_244_2009|Directive 244/2009]] implementation dates (2009–2016)",
        falsification: "No acceleration difference, or non-EU countries show faster decline",
      },
      {
        id: "P13",
        title: "Cascade order test",
        description: "Seven chronic diseases' acceleration points follow the modulome's biological latency hierarchy: sleep < depression < ADHD < metabolic < autoimmune < infertility < cancer. Each acceleration point should fall 0–10 years after mass adoption of its specific technology generation.",
        validation: "GBD 2024 acceleration point statistical analysis (structural breakpoint detection)",
        falsification: "Acceleration order does not match modulome hierarchy, or acceleration points are not temporally linked to technology rollouts",
      },
      {
        id: "P14",
        title: "EMF × psychedelic response interaction",
        description: "Patients with higher baseline EMF exposure (measured by personal RF dosimetry) will show stronger acute response to psilocybin-assisted therapy, because chronic EMF-driven Ca²⁺ dysregulation creates a larger homeostatic deficit for the psychedelic Ca²⁺ reset to correct. High-EMF patients should show greater pre/post MADRS delta.",
        validation: "Psilocybin clinical trial with RF dosimetry covariate",
        falsification: "No correlation between EMF exposure and treatment response magnitude, or inverse correlation",
      },
      {
        id: "P15",
        title: "CACNA1C genotype × psychedelic response",
        description: "Patients carrying CACNA1C risk variants (associated with bipolar disorder and schizophrenia in GWAS) will show altered psilocybin response, because the psychedelic signal chain terminates at Cav1.2 (CACNA1C). Specifically, rs1006737 A-allele carriers should show either enhanced or paradoxical response to psilocybin, distinct from wild-type responders.",
        validation: "Pharmacogenomic analysis of existing psilocybin trial data with CACNA1C genotyping",
        falsification: "No genotype-response association at CACNA1C locus",
      },
      {
        id: "P16",
        title: "Lithium protects against EMF mood effects",
        description: "Lithium users will show attenuated mood deterioration in response to EMF exposure compared to non-lithium controls, because Li⁺ directly occupies VGSC and normalizes Na⁺/Ca²⁺ balance that EMF perturbs. Ecological test: lithium-treated bipolar patients should show no seasonal RF-correlated mood variation, while unmedicated patients should.",
        validation: "Mood-tracking app data (e.g. Daylio) × personal RF dosimetry, stratified by lithium use",
        falsification: "Lithium users show equal or greater EMF-mood sensitivity compared to controls",
      },
      {
        id: "P17",
        title: "EMF exposure reduces transepithelial potential (TEP)",
        description: "Controlled EMF exposure will measurably reduce skin TEP (baseline 10–60 mV) via Na⁺/K⁺-ATPase disruption. EHS-reporting individuals will show a larger TEP drop than matched controls under the same exposure, because their ion channel sensitivity threshold is lower. Double-blind measurement with Ag/AgCl electrodes on forearm skin.",
        validation: "Double-blind TEP measurement before/during/after controlled RF exposure (1 V/m, 30 min), EHS vs. control cohort",
        falsification: "No TEP change under EMF, or EHS patients show equal or smaller change than controls",
      },
      {
        id: "P18",
        title: "EMF slows wound healing via electrotactic interference",
        description: "Standardized skin wounds (e.g. suction blister) will heal significantly slower in high-EMF environments compared to Faraday-shielded controls, because exogenous EMF superimposes noise on the endogenous wound electric field (100–200 mV/mm) that guides keratinocyte electrotaxis. Effect size should correlate with EMF field strength.",
        validation: "Suction blister wound healing RCT: Faraday-shielded vs. standard room, time to re-epithelialization",
        falsification: "No wound healing difference, or faster healing in high-EMF environment",
      },
      {
        id: "P19",
        title: "LED blue light retinal damage is IF-EMF mediated",
        description: "Retinal damage attributed to LED blue light is partially caused by IF-EMF (65 kHz – 2 MHz) from the LED switching power supply, not blue light alone. An incandescent lamp filtered to identical blue spectrum (no IF-EMF) will produce significantly less retinal oxidative stress than LED blue light at the same intensity and spectrum.",
        validation: "LED vs. incandescent (same blue spectrum) retinal cell viability assay; LED vs. incandescent + IF-EMF source",
        falsification: "Incandescent blue light produces equal retinal damage to LED blue light at matched spectrum and intensity",
      },
      {
        id: "P20",
        title: "IF-EMF alone causes retinal oxidative stress",
        description: "IF-EMF exposure (65 kHz – 2 MHz, levels matching LED driver output) without any light stimulus will produce measurable oxidative stress in retinal cells via Cav1.4 VGCC activation. This would confirm that the IF-EMF component of LED light is independently biologically active on retinal tissue.",
        validation: "Retinal cell culture exposed to IF-EMF only (no light): ROS measurement, Cav1.4 channel activity",
        falsification: "No retinal oxidative stress from IF-EMF alone, or no Cav1.4 involvement",
      },
      {
        id: "P21",
        title: "Night mode does not eliminate IF-EMF melatonin suppression",
        description: "Phone/tablet 'night mode' (warm color filter) removes blue light but not IF-EMF from the display backlight. Melatonin suppression measured with night mode ON will be significantly greater than in a no-screen control, because IF-EMF continues to suppress melatonin via CRY pathway independent of light spectrum. Mechanistic basis: [[ref:chae2019|Chae et al. (2019)]] demonstrated that human magnetoreception requires blue light (400–500 nm), identifying cryptochrome as the transducer. This implies two independent intervention points: (1) blue-light filtering removes CRY activation entirely (no radical pairs to disrupt), and (2) Faraday shielding removes RF disruption while preserving natural CRY function. BERM predicts Faraday shielding is more effective because it corrects the interference while leaving the natural system intact, whereas blue-light filtering removes the disruption by shutting down the entire CRY system.",
        validation: "Salivary melatonin: night-mode screen vs. no screen vs. incandescent reading light, evening exposure protocol",
        falsification: "Night mode restores melatonin to no-screen baseline levels",
      },
      {
        id: "P22",
        title: "Myopia correlates with IF-EMF, not blue light alone",
        description: "The childhood myopia epidemic correlates with cumulative IF-EMF exposure (screen time + LED lighting hours) more strongly than with blue light dose alone. The EU incandescent ban (2009) provides a natural experiment: countries with faster LED adoption should show steeper myopia acceleration, controlling for education hours and outdoor time.",
        validation: "Cross-country DID analysis: LED adoption rate × myopia prevalence, controlling for near-work hours and outdoor time",
        falsification: "Myopia rates correlate equally with blue light and IF-EMF, or LED adoption timing shows no association",
      },
      {
        id: "P23",
        title: "Hospital EMF levels correlate with post-hospital syndrome",
        description: "Hospitals with higher measured EMF levels (especially IF from LED lighting and RF from Wi-Fi density) will have higher post-hospital syndrome (PHS) incidence, controlling for patient acuity, length of stay, and standard care quality metrics. The correlation should be strongest in elderly patients (>75 years) who spend the most time bed-bound.",
        validation: "Multi-hospital EMF survey × 30-day readmission/complication rates, stratified by age and mobility",
        falsification: "No correlation between hospital EMF levels and PHS incidence after controlling for confounders",
      },
      {
        id: "P24",
        title: "Low-EMF patient rooms improve recovery",
        description: "Patients in Faraday-shielded or low-EMF rooms (reduced Wi-Fi, incandescent/DC lighting, minimal monitors) will show faster recovery, shorter stays, lower delirium incidence, and better sleep quality compared to standard rooms, controlling for patient acuity and treatment protocols.",
        validation: "RCT or quasi-experimental: low-EMF ward vs. standard ward, primary endpoints: LOS, delirium, sleep quality (actigraphy)",
        falsification: "No difference in any recovery metric, or worse outcomes in low-EMF rooms",
      },
      {
        id: "P25",
        title: "Home care advantage is partially EMF-mediated",
        description: "The observed advantage of home care over hospitalization for certain elderly patients is partially mediated by lower EMF exposure at home. Patients discharged to high-EMF home environments (multiple Wi-Fi networks, LED-heavy) will show outcomes closer to hospital patients than those in low-EMF homes.",
        validation: "Home EMF survey at discharge × 30-day outcomes, comparing high-EMF vs. low-EMF home environments",
        falsification: "Home EMF levels do not predict post-discharge outcomes after controlling for socioeconomic factors",
      },
      {
        id: "P29",
        title: "AD incidence correlates with cumulative lifetime EMF",
        description: "Alzheimer's disease incidence correlates with cumulative lifetime EMF exposure (urban > suburban > rural), after controlling for education, cardiovascular risk, and ApoE4 status. The mechanism chain: EMF → VGCC → Ca²⁺ ↑ → BACE1 → Aβ oligomers → positive feedback loop. The calcium hypothesis (LaFerla, O'Day) identifies Ca²⁺ dysregulation as the proximal cause; BERM provides the upstream environmental driver.",
        validation: "Longitudinal cohort with RF/IF dosimetry × AD diagnosis, controlling for ApoE4, education, CVD risk",
        falsification: "No dose-response between cumulative EMF and AD incidence after confounders controlled",
      },
      {
        id: "P30",
        title: "CACNA1C rs7304986 modulates AD risk",
        description: "CACNA1C rs7304986 T/C carriers (who show greater EMF sleep sensitivity per [[ref:sousouri2025|Sousouri 2025]]) will have higher AD risk than T/T homozygotes in high-EMF environments but equivalent risk in low-EMF environments. This is the same gene × environment interaction as for EHS: genetically heightened VGCC sensitivity amplifies environmental Ca²⁺ dysregulation.",
        validation: "GWAS × EMF exposure interaction analysis in existing AD biobank cohorts",
        falsification: "No CACNA1C × EMF interaction on AD risk, or T/C carriers show lower AD risk",
      },
      {
        id: "P31",
        title: "AD incidence accelerates 2025–2035 (30-year lag)",
        description: "AD incidence in the 60–70 age group will accelerate beyond demographic aging predictions during 2025–2035, reflecting a ~30-year lag from mass 2G/Wi-Fi adoption (1995–2005). CAUTION: this acceleration could result from other causes (diabetes epidemic, sedentary lifestyle, diagnostic changes). The prediction is confirmable only if EMF-specific biomarkers (Ca²⁺ levels, VGCC expression) co-correlate.",
        validation: "Age-specific AD incidence trends vs. demographic projection, supplemented by Ca²⁺/VGCC biomarker panel",
        falsification: "No above-demographic acceleration, or acceleration without Ca²⁺/VGCC biomarker correlation",
      },
      {
        id: "P32",
        title: "Low-EMF care homes slow AD progression",
        description: "AD patients in low-EMF care environments (Faraday-shielded or reduced Wi-Fi/LED) will show slower cognitive decline (MMSE/MoCA trajectory) than matched controls in standard care facilities. The Arendash paradox (controlled 918 MHz protects in mice) suggests dose/frequency/context matter — chaotic multi-frequency environmental EMF drives damage, while removal allows homeostatic recovery.",
        validation: "Quasi-experimental: low-EMF care unit vs. standard unit, MMSE trajectory over 12 months, controlling for medication and baseline severity",
        falsification: "No difference in cognitive decline rate, or faster decline in low-EMF environment",
      },
      {
        id: "P33",
        title: "CACNA1C genotype × prenatal EMF → ADHD risk",
        description: "CACNA1C rs7304986 T/C-carrying mothers' prenatal EMF exposure will produce higher ADHD risk in offspring than T/T carriers'. This is a gene × environment interaction: genetically heightened VGCC sensitivity amplifies the developmental ion channel calibration error from prenatal EMF. The same CACNA1C variant associates with ADHD, ASD, bipolar, and EMF sleep sensitivity ([[ref:sousouri2025|Sousouri 2025]]).",
        validation: "Kaiser-type cohort with prenatal MF dosimetry + maternal CACNA1C genotyping × offspring ADHD diagnosis",
        falsification: "No CACNA1C × prenatal EMF interaction on offspring ADHD risk",
      },
      {
        id: "P34",
        title: "Guanfacine protects against EMF-worsened ADHD",
        description: "If ADHD is an ion channel calibration error, guanfacine (HCN channel modulator) should protect against EMF's ADHD-symptom-worsening effect better than stimulants (which only compensate by raising signal). In controlled EMF exposure, guanfacine-treated ADHD patients should show less symptom worsening than methylphenidate-treated patients, because guanfacine corrects the threshold while stimulants raise the signal.",
        validation: "Guanfacine vs. methylphenidate during controlled EMF exposure → ADHD symptom change (CPT, Conners)",
        falsification: "Guanfacine shows equal or less protection than methylphenidate against EMF symptom worsening",
      },
      {
        id: "P35",
        title: "ADHD prevalence acceleration follows prenatal EMF with 3–10y lag",
        description: "ADHD prevalence acceleration follows prenatal EMF exposure growth with a 3–10 year lag (exposure → diagnosis age). 2G mass adoption 1991–95 → ADHD acceleration ~1995–2005. Smartphone mass adoption 2007–12 → ADHD acceleration ~2012–2020. 5G mass adoption 2019–24 → ADHD acceleration ~2025–2035 (prediction). CAUTION: ADHD diagnostic practices have changed significantly — prevalence data requires careful correction for diagnostic trends.",
        validation: "Age-specific ADHD incidence trends vs. prenatal EMF proxy (mobile penetration at birth year), controlling for diagnostic practice changes",
        falsification: "No temporal correlation between prenatal EMF proxy and ADHD incidence after diagnostic correction",
      },
      {
        id: "P36",
        title: "EMF exposure × bipolar cycle frequency",
        description: "Bipolar patients in higher-EMF environments should have more frequent mood cycles, because stronger ionic perturbation destabilizes the neural oscillator — amplitude increases and period shortens. Computational models ([[ref:pubmed32278494_bipolar_ionic|PubMed 32278494]]) show bipolar neurons oscillate between hyperexcitability and hypoexcitability due to ion conductance changes; EMF adds external perturbation to this unstable system.",
        validation: "EMF dosimetry + mood diary + cycle length in longitudinal bipolar cohort",
        falsification: "No correlation between environmental EMF and bipolar cycle frequency",
      },
      {
        id: "P37",
        title: "Lithium + EMF shielding synergy in bipolar",
        description: "Lithium-treated bipolar patients will benefit from EMF shielding (Faraday) because Li⁺ dampens the oscillation AND EMF removal eliminates the perturbation — combined effect exceeds either alone. Li⁺ traverses VGSC and accumulates in hyperactive neurons; removing the EMF perturbation source reduces the oscillation that lithium must dampen.",
        validation: "Li⁺ + Faraday-shielded bedroom vs. Li⁺ alone → cycle frequency and amplitude over 6 months",
        falsification: "No additional benefit from EMF shielding beyond lithium alone",
      },
      {
        id: "P38",
        title: "IVF success rates lower in high-EMF clinics",
        description: "IVF laboratories with higher ambient EMF will have lower fertilization rates, blastocyst development, and clinical pregnancy rates. Melatonin in follicular fluid is a critical oocyte protectant ([[ref:tamura2012_follicular_melatonin|Tamura 2012]]); EMF suppresses endogenous melatonin ([[ref:battelle1980_emf_melatonin|Battelle 1980]], circadian pathway), reducing follicular antioxidant defense during the most vulnerable phase. [[ref:tong2017_melatonin_ivf|Tong 2017]] meta-analysis already shows melatonin supplementation improves IVF outcomes — the prediction is that EMF environment is a confound in existing IVF data.",
        validation: "EMF dosimetry of IVF labs (incubator + patient treatment rooms) vs. clinic-level outcomes, controlling for patient demographics",
        falsification: "No correlation between clinic EMF levels and IVF outcomes after standard confound adjustment",
      },
      {
        id: "P39",
        title: "Melatonin supplement × EMF interaction in IVF",
        description: "Melatonin supplementation benefit in IVF will be LARGER for patients in high-EMF environments, because high EMF creates a deeper melatonin deficit that supplementation partially corrects. In low-EMF environments, endogenous melatonin is already near-optimal, so exogenous supplementation adds less. This predicts an interaction term (melatonin × EMF) in IVF outcome regression, not just a melatonin main effect.",
        validation: "IVF RCT with melatonin supplementation, stratified by patient residential/occupational EMF exposure (wearable dosimetry)",
        falsification: "Melatonin benefit is uniform across EMF exposure levels (no interaction)",
      },
      {
        id: "P40",
        title: "Shift workers: lower fertility AND greater melatonin supplement benefit",
        description: "Shift workers have suppressed nocturnal melatonin (circadian disruption + workplace lighting + occupational EMF), predicting lower natural fertility AND a larger absolute benefit from melatonin supplementation compared to day workers. The melatonin bridge connects cascade 1 (sleep/circadian) to cascade 6 (fertility) — shift work is the strongest natural experiment for this connection because it disrupts melatonin through multiple converging pathways simultaneously.",
        validation: "Fertility outcomes (time-to-pregnancy, IVF success) in shift vs. day workers, with and without melatonin supplementation",
        falsification: "Shift workers show equal melatonin supplement benefit as day workers, or shift work fertility deficit not mediated by melatonin levels",
      },
      {
        id: "IF-1",
        title: "LED driver 20–100 kHz disrupts normal cell mitosis",
        description: "LED driver switching frequencies (20–100 kHz) overlap the normal-cell mitotic disruption range identified by TTFields research (Neuhaus et al., Nature 2020: normal cells most affected at ~50 kHz, vs. cancer cells at 150–200 kHz). Prediction: in vitro exposure of normal dividing cells (e.g. spermatogonia, intestinal crypt cells) to 20–100 kHz pulsed fields at LED-driver-representative intensities will produce measurable increases in aneuploidy, mitotic spindle misalignment, or reduced proliferation rate. The Kaiser Permanente series (Li 2002–2020) provides epidemiological support: EMDEX-measured MF exposure associates with miscarriage, sperm quality decline, and childhood conditions across 6 cohorts.",
        validation: "In vitro: normal cell lines exposed to 20–100 kHz pulsed waveform (LED-driver-representative) vs. sham → aneuploidy rate, spindle orientation, proliferation",
        falsification: "No effect on normal cell mitosis at LED-driver-representative frequencies and intensities, or effect only at TTFields-level intensities (>100 V/m)",
      },
    ],
    nutritionalPredictions: [
      {
        id: "NUT-1",
        title: "B2 supplementation improves circadian resilience to nighttime EMF",
        description: "RCT: B2 supplementation (25mg/day x 8 weeks) vs placebo in subjects with poor sleep quality and high nighttime phone use. Primary endpoint: melatonin onset latency. Secondary: sleep efficiency, cortisol awakening response. B2 group should show less circadian disruption because FAD-replete CRY is more stable against EMF perturbation. Mechanistic basis: [[ref:hirano2017|Hirano 2017]] (FAD -> CRY stability), [[ref:yap2025|Yap 2025]] (FAD -> magnetic sensitivity).",
        timeline: "Testable within 3-6 months (RCT, N=60)",
        falsification: "No difference in melatonin onset latency or sleep metrics between B2 and placebo groups",
      },
      {
        id: "NUT-2",
        title: "B2 deficiency x EMF interaction in 54-country regression",
        description: "Add population-level B2 adequacy as a control variable to the 54-country EMF-TFR regression model. Prediction: the interaction term (EMF x B2_deficiency) is significant and negative — countries with BOTH high EMF AND high B2 deficiency show steeper TFR decline than countries with high EMF alone. China (>90% B2 deficiency, highest EMF, lowest TFR) vs. Finland (~15% B2 deficiency, high EMF, higher TFR) is the key contrast. CAUTION: This is ecological evidence — correlation, not causation.",
        timeline: "Testable immediately (existing data + B2 surveys from ~30 countries)",
        falsification: "No significant EMF x B2 interaction term, or interaction is positive",
      },
      {
        id: "NUT-3",
        title: "Fasting duration predicts magnetoreceptive sensitivity (inverted U)",
        description: "Replicate [[ref:chae2019|Chae 2019]] food orientation paradigm with graded fasting durations (4h, 8h, 12h, 16h, 24h). Prediction: inverted U-shaped dose-response — sensitivity peaks at 12-16h (optimal CRY turnover with adequate FAD) and declines at 24h+ (FAD pool depletion begins). Additional arm: B2-supplemented (25mg pre-fast) vs. unsupplemented subjects. B2 supplementation should right-shift the peak (allowing longer fasting before decline). The fasting paradox resolution ([[ref:lamia2009|Lamia 2009]] AMPK-CRY + beta-oxidation FAD) predicts this specific shape.",
        timeline: "Testable within 2-4 months (behavioral, N=40 per duration)",
        falsification: "Monotonic increase (no decline at 24h), or no fasting effect, or B2 does not shift the peak",
      },
    ],
    metabPredictions: [
      {
        id: "METAB-1",
        title: "Faraday-shielded laboratory animals weigh less than unshielded controls",
        description: "Identical diet, identical genetics, identical temperature — only difference is EMF environment. Predicted: shielded animals weigh 5-15% less after 6 months. Based on [[ref:klimentidis2010|Klimentidis paradox]] (24 populations, 8 species ALL gaining weight, p = 1.2×10⁻⁷) and BAT thermogenesis mechanism ([[ref:maalouf2023|Maalouf 2023]], [[ref:5g_bat2025|5G BAT 2025]]). This is the single most discriminating test for the EMF-metabolic hypothesis.",
        timeline: "1-3 years (experimental, requires shielded facility)",
        falsification: "No weight difference after 12 months under identical conditions",
        critical: true,
      },
      {
        id: "METAB-2",
        title: "CaMKII inhibition attenuates EMF-induced weight gain in rodents",
        description: "KN-93 or AIP (CaMKII inhibitors) administered to EMF-exposed rodents should reduce weight gain, BAT dysfunction, and insulin resistance compared to EMF-exposed untreated controls. CaMKII is the convergence molecule connecting EMF sensitivity (Cav3.2 threshold shift), BAT thermogenesis (UCP1 transcription), testosterone (StAR expression), and insulin secretion (β-cell Ca²⁺ dynamics). If CaMKII convergence is real, its inhibition should attenuate multiple metabolic endpoints simultaneously.",
        timeline: "1-2 years (experimental, rodent model)",
        falsification: "CaMKII inhibition has no effect on EMF-induced metabolic changes",
      },
      {
        id: "METAB-3",
        title: "Semaglutide efficacy correlates with ambient EMF level",
        description: "If EMF disrupts the L-type VGCC → Ca²⁺ → ERK pathway that GLP-1/semaglutide amplifies ([[ref:bhatt2012_glp1|Bhatt 2012, PMC3556522]]), then semaglutide should be MORE effective in high-EMF populations (more pathway disruption to correct) but show diminishing returns as EMF increases beyond a threshold (overwhelms correction capacity). This is a SPECULATIVE prediction — mechanistically derived but no clinical data yet. Evidence level: L*.",
        timeline: "3-5 years (clinical data mining from existing RCTs)",
        falsification: "No correlation between EMF environment and semaglutide efficacy",
      },
      {
        id: "METAB-4",
        title: "Obesity prevalence in low-EMF communities remains <10% through 2035",
        description: "Old Order Amish, Tsimane, Hadza, and comparable low-EMF communities will maintain obesity rates below 10% regardless of dietary modernization, as long as EMF exposure remains low. The Tsimane currently show <5% obesity; Kitava ~0%. If EMF is a contributing factor, these populations should remain lean even as processed food access increases — provided their EMF environment doesn't change.",
        timeline: "9 years (longitudinal observation)",
        falsification: "Low-EMF community obesity rises above 15% without significant EMF adoption",
      },
    ],
    trpc1Predictions: [
      {
        id: "TRPC1-1",
        title: "CRY2-TRPC1 calcium entry contributes to EMF reproductive effects independently of VGCCs",
        description: "Expose reproductive cells (e.g. granulosa cells, Sertoli cells) to EMF under four conditions: (1) Control (no blockers); (2) + Nifedipine (blocks VGCCs, pathway A) — isolates C's contribution; (3) + Anti-TRPC1 antibody (blocks TRPC1) — isolates A's contribution; (4) + Both blockers — residual effect = non-Ca²⁺ pathways (B, D). Prediction: nifedipine reduces but does NOT eliminate EMF response. The remaining response is CRY2-TRPC1-mediated (pathway C's calcium branch). Anti-TRPC1 also reduces but does not eliminate the response. Both blockers together produce near-complete abolition of the Ca²⁺ response. This experiment directly quantifies the relative contributions of pathways A (VGCC) and C-calcium (TRPC1) to EMF reproductive effects.",
        timeline: "Testable within 6-12 months (in vitro, cell lines available)",
        falsification: "Nifedipine alone abolishes all EMF-induced calcium effects (no TRPC1-independent component), or anti-TRPC1 has no effect (TRPC1 not involved in reproductive cells)",
      },
    ],
    pharmPredictions: [
      {
        id: "PHARM-1",
        title: "CCB users show attenuated sperm quality decline compared to ARB/ACE inhibitor users",
        description: "Compare sperm parameters (concentration, motility, morphology, DNA fragmentation) between men taking calcium channel blockers vs. men taking ARB or ACE inhibitors for hypertension. Both groups have the same underlying condition; only the drug mechanism differs. CCBs block the same VGCC that BERM identifies as the EMF transduction node. If EMF-induced VGCC activation contributes to sperm decline, CCB users should show relative protection. Data source: existing fertility clinic databases cross-referenced with prescription records.",
        timeline: "1-2 years (retrospective database study)",
        falsification: "No difference in sperm parameters between CCB and ARB/ACE inhibitor users after controlling for age, BMI, and comorbidities",
        critical: true,
      },
      {
        id: "PHARM-2",
        title: "Verapamil shows stronger EMF-protective effect than amlodipine due to use-dependent blockade",
        description: "Among CCB users, verapamil (frequency-dependent VGCC blocker) should show greater attenuation of EMF biomarkers than amlodipine (voltage-dependent blocker). The IFO mechanism predicts high-frequency channel cycling during EMF exposure — verapamil's use-dependent kinetics should provide disproportionate blockade during these bursts. Compare oxidative stress markers, sperm parameters, or melatonin levels between verapamil and amlodipine users.",
        timeline: "2-3 years (retrospective, requires sufficient verapamil sample size)",
        falsification: "No difference between verapamil and amlodipine users on any EMF-relevant biomarker",
      },
      {
        id: "PHARM-3",
        title: "Lithium-treated bipolar patients show less circadian disruption in high-EMF environments",
        description: "Compare circadian markers (melatonin secretion timing, sleep onset latency, dim-light melatonin onset) between bipolar patients on lithium vs. bipolar patients on valproate or lamotrigine in matched EMF environments. Lithium stabilizes CRY proteins via GSK-3β inhibition, directly opposing BERM pathway C. If CRY-mediated melatonin suppression contributes to EMF-associated circadian disruption, lithium users should be partially protected.",
        timeline: "1-3 years (prospective or retrospective with wearable data)",
        falsification: "Lithium users show equal or greater circadian disruption than valproate users in high-EMF environments",
      },
      {
        id: "PHARM-4",
        title: "Nimodipine attenuates EMF-induced cognitive effects while peripheral CCBs do not",
        description: "Nimodipine (BBB-penetrant dihydropyridine CCB) should attenuate EMF-associated cognitive effects, while amlodipine (non-BBB-penetrant) should not. Three moderators differentiate BERM from a simple Ca²⁺-blockade hypothesis: (a) the effect should be LARGER in winter than summer (CRY more sensitive), (b) LARGER in AA-genotype carriers (more Cav1.2), and (c) LARGER in subjects with home Wi-Fi (more primed baseline). ETH Zürich 5G-sleep study is the first opportunity to test these moderators directly.",
        timeline: "2-4 years (prospective cohort or RCT extension study)",
        falsification: "No difference between nimodipine and amlodipine on cognitive endpoints, OR no moderator-dependent variation (season, genotype, home EMF)",
      },
      {
        id: "PHARM-5",
        title: "CoQ10 supplementation reduces EMF-associated oxidative damage in a dose-dependent manner",
        description: "Building on [[ref:bektas2026|Bektas 2026]] (3.5 GHz → testicular ROS; CoQ10 ameliorates): CoQ10 supplementation (100-400 mg/day) should reduce urinary 8-OHdG (oxidative DNA damage marker) in men with high smartphone usage (>4h/day, phone in pocket) in a dose-dependent manner. The dose-response relationship tests whether the antioxidant mechanism scales linearly (simple ROS scavenging) or saturates (enzyme-limited repair).",
        timeline: "6-12 months (RCT feasible with existing supplement)",
        falsification: "No reduction in 8-OHdG at any CoQ10 dose compared to placebo in high-smartphone-usage men",
        critical: true,
      },
    ],
    modIntPredictions: [
      {
        id: "MOD-1",
        title: "Pituitary gonadotroph T-type channels mediate EMF-induced FSH/LH disruption",
        description: "Pituitary gonadotrophs express Cav3 T-type channels for hormone secretion. EMF perturbation of these channels reduces FSH/LH pulsatility independently of hypothalamic GnRH. Test: expose pituitary cell cultures to standardized EMF with and without T-type channel blocker (ethosuximide). Prediction: EMF reduces FSH/LH secretion; ethosuximide abolishes the effect.",
        type: "experimental",
        discriminating: true,
        timeline: "Testable within 6 months (pituitary cell culture)",
        falsification: "No EMF effect on pituitary FSH/LH secretion, or ethosuximide does not block the effect",
      },
      {
        id: "MOD-2",
        title: "Mitochondrial age amplifies EMF-induced ROS in reproductive tissue",
        description: "Aged mitochondria produce more ROS per unit Ca2+ influx than young mitochondria. Test: expose testicular tissue from young (3-month) and old (18-month) rats to identical EMF. Measure mitochondrial ROS production. Prediction: old tissue produces disproportionately more ROS per unit EMF exposure, following the v18_mitochondrial_ros_amplifier() function.",
        type: "experimental",
        discriminating: true,
        timeline: "Testable within 6 months (animal tissue, standard ROS assay)",
        falsification: "Old and young tissue produce equal ROS per unit EMF, or young tissue produces more",
      },
      {
        id: "MOD-3",
        title: "B2 supplementation restores glutathione defense AND reduces CRY sensitivity",
        description: "Riboflavin (B2) is the precursor for FAD, which is required by both glutathione reductase (GR, redox defense) and cryptochrome (CRY, EMF sensor). B2 supplementation should simultaneously: (a) increase effective glutathione buffering capacity (via GR), and (b) stabilize CRY against EMF perturbation (via FAD loading). Test: B2-supplemented vs. unsupplemented cell cultures under EMF. Measure both GSH/GSSG ratio and CRY-dependent circadian gene expression.",
        type: "experimental",
        discriminating: true,
        timeline: "Testable within 3-6 months (cell culture, dual endpoint)",
        falsification: "B2 affects only one endpoint (GR or CRY) but not both, or no effect on either",
      },
      {
        id: "MOD-4",
        title: "HRV is a sensitive early biomarker of chronic EMF exposure",
        description: "Heart rate variability (HRV), specifically the high-frequency (HF) component reflecting vagal tone, decreases with chronic EMF exposure before clinical symptoms appear. The SA node's Cav3.1 T-type channels are the transducer. Test: correlate personal RF dosimetry with 24-hour HRV monitoring in a cohort (N=200). Prediction: inverse dose-response between cumulative EMF and HF-HRV, independent of age, fitness, and stress.",
        type: "observational",
        discriminating: true,
        timeline: "Testable immediately (wearable HRV + RF dosimetry)",
        falsification: "No correlation between personal EMF exposure and HRV after controlling for confounders",
      },
      {
        id: "MOD-5",
        title: "Placental TJ proteins decrease with gestational EMF exposure",
        description: "The placental barrier uses the same tight junction (TJ) proteins as BBB and BTB (occludin, ZO-1, claudins). EMF exposure during pregnancy should decrease placental TJ protein expression in a dose-dependent manner. Test: measure placental TJ protein levels in women with high vs. low EMF exposure during pregnancy (personal dosimetry). Prediction: higher EMF exposure correlates with lower occludin and ZO-1 expression.",
        type: "experimental",
        discriminating: true,
        timeline: "Testable within 12 months (birth cohort with dosimetry)",
        falsification: "No correlation between gestational EMF and placental TJ protein expression",
      },
      {
        id: "MOD-6",
        title: "Thyroid dysfunction prevalence correlates with mobile phone adoption rate nationally",
        description: "Thyroid cells express VGCCs and are sensitive to EMF-induced Ca2+ disruption. National thyroid dysfunction prevalence (hypothyroidism, elevated TSH) should correlate with mobile phone adoption rate, controlling for iodine status, age structure, and diagnostic practices. This is an ecological prediction — correlation, not causation.",
        type: "ecological",
        discriminating: false,
        timeline: "Testable immediately (existing health registry + ITU data)",
        falsification: "No correlation between mobile adoption rate and thyroid dysfunction prevalence after controlling for iodine status and demographics",
      },
    ],
    sidsPredictions: [
      {
        id: "SIDS-1",
        title: "Baby monitor proximity correlates with SIDS risk",
        description: "Retrospective case-control study: compare baby monitor type (DECT vs. WiFi vs. wired vs. none) and placement distance (< 0.5 m, 0.5–1 m, > 1 m) between SIDS cases and age-matched controls. DECT monitors at < 0.5 m produce 2.5–3.5 V/m continuous RF through a 2 mm infant skull. Prediction: DECT or WiFi monitor placement within 0.5 m of the crib is more common in SIDS cases than controls, after controlling for known risk factors.",
        timeline: "Testable retrospectively (parent questionnaire in existing SIDS registries)",
        falsification: "No association between monitor type/distance and SIDS incidence after controlling for prone sleeping, tobacco, overheating, and breastfeeding status",
      },
      {
        id: "SIDS-2",
        title: "CACNA1C rs1006737 AA genotype is overrepresented in SIDS victims",
        description: "Post-mortem genotyping of SIDS victims for CACNA1C rs1006737 (the BERM risk allele). The AA genotype increases Cav1.2 expression and is associated with psychiatric and cardiac risk in adults. In infants with immature Ca²⁺ homeostasis, this gain-of-function variant should increase vulnerability to any Ca²⁺-disrupting stressor. Prediction: AA genotype frequency in SIDS victims exceeds population baseline.",
        timeline: "Testable with existing biobanked SIDS tissue (retrospective genotyping)",
        falsification: "AA genotype frequency in SIDS victims equals or is lower than population frequency",
      },
      {
        id: "SIDS-3",
        title: "Maternal EMF exposure correlates with lower breast milk melatonin",
        description: "Measure melatonin concentration in night breast milk samples from mothers with high vs. low personal EMF exposure (smartphone use, WiFi proximity, LED lighting assessed by questionnaire and dosimetry). Melatonin in night milk is the infant's exogenous Ca²⁺ antagonist. If maternal CRY pathway is disrupted by EMF, milk melatonin should be reduced. Prediction: mothers with higher EMF exposure produce night milk with lower melatonin concentration.",
        timeline: "Testable within 6–12 months (lactation cohort with dosimetry)",
        falsification: "No correlation between maternal EMF exposure metrics and night milk melatonin concentration",
      },
      {
        id: "SIDS-4",
        title: "Night-pumped breast milk offered at night has lower SIDS risk than day-pumped milk offered at night",
        description: "Retrospective cohort: among mothers who pump and bottle-feed, compare SIDS incidence between those who offer time-matched milk (night-pumped at night, day-pumped during day) vs. those who do not label by time. Night milk contains melatonin (Ca²⁺ antagonist) and tryptophan absent from day milk. Prediction: chronomatched milk feeding is associated with lower SIDS risk.",
        timeline: "Testable retrospectively (feeding practice questionnaire in existing cohorts)",
        falsification: "No difference in SIDS incidence between chronomatched and non-matched pumped milk feeding practices",
      },
      {
        id: "SIDS-5",
        title: "EMF-free nursery environment reduces apnea/bradycardia episodes in NICU",
        description: "Interventional study in NICU: compare apnea and bradycardia episode frequency in preterm infants in standard NICU environment vs. EMF-minimized environment (wired monitors, no WiFi, RF-shielded incubator, amber lighting). Prediction: EMF-minimized NICU environment reduces apnea/bradycardia episodes, with larger effect in infants with known ion channel variants.",
        timeline: "Testable within 12–18 months (NICU intervention study)",
        falsification: "No reduction in apnea/bradycardia episodes in EMF-minimized NICU environment compared to standard environment",
      },
      {
        id: "SIDS-6",
        title: "ADORA1/ADORA2A polymorphisms predict both SIDS risk and caffeine response",
        description: "Pharmacogenetic analysis: genotype ADORA1 and ADORA2A receptor polymorphisms in SIDS victims (post-mortem) and in preterm infants receiving caffeine therapy. The same adenosine receptor variants that modulate caffeine response in apnea of prematurity should predict SIDS susceptibility, because both conditions involve adenosine-Ca²⁺ pathway disruption in the respiratory center. Prediction: ADORA variants that predict poor caffeine response are overrepresented in SIDS victims.",
        timeline: "Testable with existing SIDS biobanks and NICU pharmacogenetic databases",
        falsification: "No association between ADORA genotype and SIDS incidence, or ADORA genotypes associated with SIDS do not predict caffeine response",
      },
    ],
    sidsResPredictions: [
      {
        id: "SIDS-RESONANCE-1",
        title: "Q-factor predicts SIDS risk better than age alone",
        description: "If the resonance model is correct, SIDS risk should correlate with Q_neonatal(age) = Q₀/(1+(age/τ_KCC2)²) better than with age alone. The Q-factor declines as KCC2 matures and GABA transitions from excitatory to inhibitory. Test: fit SIDS incidence-by-age curves to Q_neonatal(age) vs. linear/quadratic age models. Prediction: Q-factor model fits SIDS age distribution better (lower AIC) than purely age-based models.",
        timeline: "Testable immediately (existing SIDS age-distribution datasets)",
        falsification: "Q-factor model fits no better than simple age-based models for SIDS incidence distribution",
      },
      {
        id: "SIDS-RESONANCE-2",
        title: "Bumetanide prophylaxis reduces apnea in high-risk neonates",
        description: "Bumetanide blocks NKCC1, restoring inhibitory GABA and introducing damping (reducing Q). If SIDS results from resonance failure in an undamped system, bumetanide should reduce apnea and bradycardia episodes in high-risk neonates (those with ion channel variants or prior apparent life-threatening events). Test: randomized trial of low-dose bumetanide in NICU infants with recurrent apnea. Prediction: bumetanide reduces apnea/bradycardia episode frequency.",
        timeline: "Testable within 12–18 months (NICU pharmacological trial)",
        falsification: "No reduction in apnea/bradycardia episodes with bumetanide in high-risk neonates",
      },
      {
        id: "SIDS-RESONANCE-3",
        title: "Neonatal EEG shows higher coherence at resonant frequencies in SIDS-risk infants",
        description: "An undamped resonator (Q→∞) concentrates energy at its natural frequency. Neonatal EEG in high-risk infants should show narrower spectral peaks and higher inter-channel coherence in delta/theta bands compared to low-risk controls. This spectral signature should diminish as KCC2 matures (3–6 months). Test: serial EEG in SIDS-risk vs. control infants from birth to 6 months. Prediction: high-risk infants show elevated spectral coherence that normalizes on the KCC2 maturation timeline.",
        timeline: "Testable within 12 months (neonatal EEG longitudinal study)",
        falsification: "No difference in EEG spectral coherence between high-risk and control neonates, or coherence does not change on the predicted KCC2 timeline",
      },
      {
        id: "SIDS-RESONANCE-4",
        title: "Co-sleeping cultures have low SIDS despite high ambient EMF",
        description: "The three-protections model predicts that cultures practicing co-sleeping (no monitor), breastfeeding (>90%), and continuous skin contact should maintain low SIDS rates regardless of ambient EMF level. Test: compare SIDS rates across cultures stratified by (1) ambient EMF density and (2) co-sleeping/breastfeeding/skin-contact practices. Prediction: SIDS rate correlates with monitor use and formula feeding, not with ambient EMF density, after controlling for the three protections.",
        timeline: "Testable immediately (ecological analysis of existing cross-national SIDS data)",
        falsification: "SIDS rate correlates with ambient EMF density regardless of co-sleeping/breastfeeding/skin-contact practices",
      },
      {
        id: "SIDS-RESONANCE-5",
        title: "NKCC1/KCC2 ratio at time of death predicts SIDS vs. non-SIDS infant death",
        description: "If the resonance model is correct, SIDS victims should have higher NKCC1/KCC2 ratios (less mature chloride transporter switch → higher Q → more excitatory GABA) compared to age-matched infants who died of non-SIDS causes. Test: immunohistochemistry for NKCC1 and KCC2 in brainstem tissue from SIDS vs. non-SIDS infant post-mortem samples. Prediction: SIDS victims show elevated NKCC1/KCC2 ratio compared to age-matched controls.",
        timeline: "Testable with existing biobanked tissue (retrospective immunohistochemistry)",
        falsification: "NKCC1/KCC2 ratio in SIDS victims equals that in age-matched non-SIDS infant deaths",
      },
      {
        id: "SIDS-SPECTRUM-1",
        title: "Prenatal EMF exposure predicts neurodevelopmental outcomes on a dose-response curve",
        description: "The resonance spectrum model predicts a continuous dose-response relationship between prenatal/neonatal EMF exposure and neurodevelopmental outcomes: highest exposure → SIDS risk, moderate → developmental delay, low → subtle motor/cognitive differences. Test: prospective birth cohort with personal EMF dosimetry (phone use, WiFi proximity, monitor use) followed to 36 months with standardized developmental assessment. Prediction: EMF exposure shows graded dose-response with developmental outcomes, with fine motor (OR ≥ 2.5) and problem-solving (OR ≥ 3.0) most affected, consistent with the prospective cohort finding (OR 2.74 fine motor, OR 3.67 problem-solving).",
        timeline: "Testable within 3 years (prospective birth cohort with dosimetry)",
        falsification: "No dose-response relationship between prenatal/neonatal EMF exposure and developmental outcomes at 36 months",
      },
    ],
    neuroPredictions: [
      {
        id: "NEURO-EMF-1",
        title: "Chronic migraine prevalence correlates with cumulative EMF layer exposure",
        description: "The Q-factor model predicts that chronic migraine prevalence should increase with cumulative EMF exposure (ELF-priming → α2δ-1↑ → CSD threshold↓). Test: correlate chronic migraine prevalence trends (1990→2025) with cumulative EMF technology adoption (mobile, WiFi, LED) across countries. Prediction: countries with earlier and denser EMF adoption show steeper migraine prevalence increase.",
        timeline: "Testable immediately (existing migraine prevalence data + ITU technology adoption data)",
        falsification: "No temporal correlation between EMF technology adoption and chronic migraine prevalence trends across countries",
      },
      {
        id: "NEURO-EMF-2",
        title: "ELF-priming lowers CSD threshold; gabapentin reverses this",
        description: "ELF exposure upregulates α2δ-1 (CACNA2D1), increasing VGCC density at synapses and lowering CSD threshold. Gabapentin blocks α2δ-1 trafficking. Test: expose cortical slices to chronic ELF (50 Hz, 7 days), then measure CSD threshold (KCl concentration needed to trigger CSD). Repeat with gabapentin co-treatment. Prediction: ELF lowers CSD threshold; gabapentin co-treatment normalizes it.",
        timeline: "Testable within 6–12 months (cortical slice electrophysiology)",
        falsification: "ELF exposure does not alter CSD threshold, or gabapentin does not reverse the ELF effect",
      },
      {
        id: "NEURO-EMF-3",
        title: "Cluster headache patients have higher EMF exposure history",
        description: "The cluster headache patient profile (male 3:1, smoker 60–90%, onset ~30 years, attacks 00–03) maps onto a cumulative Ca²⁺-loading profile. EMF exposure history (occupational, residential) should be higher in cluster headache patients than matched controls. Test: case-control study with detailed EMF exposure assessment (occupation, residential proximity to infrastructure, device use). Prediction: cluster headache patients have statistically higher lifetime EMF exposure.",
        timeline: "Testable within 12 months (case-control with EMF questionnaire)",
        falsification: "No difference in EMF exposure history between cluster headache patients and matched controls",
      },
      {
        id: "NEURO-EMF-4",
        title: "SUDEP risk is higher in higher-EMF environments",
        description: "SUDEP shares the same spreading depolarization → brainstem mechanism as SIDS. If EMF contributes to CSD propagation, SUDEP incidence should be higher in high-EMF environments (urban) compared to low-EMF environments (rural), after controlling for seizure frequency and medication compliance. Test: registry study comparing SUDEP incidence in urban vs. rural epilepsy patients. Prediction: urban epilepsy patients have higher SUDEP rate after controlling for seizure frequency.",
        timeline: "Testable immediately (epilepsy registry with residential data)",
        falsification: "No difference in SUDEP incidence between urban and rural epilepsy patients after controlling for seizure frequency and medication compliance",
      },
      {
        id: "NEURO-EMF-5",
        title: "Psilocybin efficacy in cluster headache improves with concurrent EMF reduction",
        description: "Psilocybin resets the tryptamine pathway (5-HT2A → thalamo-cortical reset → SCN circadian reset). If ongoing EMF exposure re-primes α2δ-1 and disrupts the SCN after reset, psilocybin efficacy should be greater when combined with EMF reduction. Test: RCT of psilocybin + EMF reduction protocol vs. psilocybin alone in episodic cluster headache. Prediction: combined intervention produces longer remission than psilocybin alone.",
        timeline: "Testable within 24 months (RCT with EMF reduction protocol)",
        falsification: "No difference in remission duration between psilocybin + EMF reduction and psilocybin alone",
      },
      {
        id: "NEURO-EMF-6",
        title: "EMF triggers seizures in neonatal animal models without pharmacological GABAergic reduction",
        description: "López-Martín showed GSM + picrotoxin (GABA antagonist) = seizures, while neither alone sufficed. The neonatal brain has endogenously excitatory GABA (NKCC1>KCC2), equivalent to pharmacological GABAergic reduction. Test: expose neonatal rodents (P3–P7, before KCC2 switch) to pulsed GSM 900 MHz at mobile-phone intensity without picrotoxin. Prediction: neonatal animals show seizure activity or epileptiform EEG changes without pharmacological pre-treatment, while adult animals do not.",
        timeline: "Testable within 6–12 months (neonatal rodent EMF exposure model)",
        falsification: "No seizure activity or epileptiform EEG changes in neonatal animals exposed to GSM without pharmacological GABAergic reduction",
      },
    ],
    metalPredictions: [
      {
        id: "METAL-EMF-1",
        title: "Chelation therapy + EMF reduction produces superadditive health improvement in EHS patients",
        description: "Heavy metals (Cd²⁺, Pb²⁺) enter cells through EMF-opened VGCCs and mimic Ca²⁺ at calmodulin/CaMKII binding sites. Chelation removes metals; EMF reduction closes the entry pathway. Combined intervention should be superadditive. Test: RCT of chelation + EMF reduction vs. chelation alone vs. EMF reduction alone in EHS patients with elevated heavy metal levels. Prediction: combined group shows >50% improvement vs. <25% for either alone.",
        timeline: "Testable within 18 months (RCT with heavy metal panel + EHS symptom scores)",
        falsification: "No superadditive effect — chelation + EMF reduction equals sum of individual effects",
      },
      {
        id: "METAL-EMF-2",
        title: "PGC grade correlates with cumulative lifetime EMF exposure",
        description: "Pineal gland calcification (PGC) reduces melatonin production (r=0.569 for uncalcified tissue↔melatonin). EMF accelerates PGC via oxidative stress and Ca²⁺ deposition. Test: cross-sectional study correlating PGC volume (CT/MRI) with occupational EMF exposure history. Prediction: high-EMF occupations (electricians, telecom workers) have significantly higher PGC volume than matched low-EMF controls.",
        timeline: "Testable immediately (CT/MRI + occupational exposure questionnaire)",
        falsification: "No correlation between occupational EMF exposure history and PGC grade",
      },
      {
        id: "METAL-EMF-3",
        title: "Cadmium tissue levels are higher in high-EMF environments via Cav3.1 window current",
        description: "Cd²⁺ permeates through Cav3.1 T-type calcium channels (confirmed with radiolabeled ¹⁰⁹Cd²⁺). Cav3.1 has a window current near resting potential — EMF increases open probability → more Cd entry. Test: compare tissue Cd levels in workers with equal dietary/occupational Cd exposure but different EMF exposure. Prediction: high-EMF group has higher tissue Cd accumulation at equivalent external Cd levels.",
        timeline: "Testable within 12 months (occupational cohort with Cd biomonitoring + EMF dosimetry)",
        falsification: "No difference in tissue Cd levels between EMF-matched groups at equivalent external Cd exposure",
      },
      {
        id: "METAL-EMF-4",
        title: "MeHg neurotoxicity threshold is lower in high-EMF environments",
        description: "Methylmercury increases T-type Ca²⁺ currents; EMF independently opens VGCCs. Combined effect: double Ca²⁺ loading. Populations with both high MeHg (fish diet) and high EMF (urban) should show neurotoxicity at lower MeHg levels than high-MeHg + low-EMF populations. Test: compare neurodevelopmental outcomes in Faroe Islands (high MeHg, low EMF) vs. urban Japan (high MeHg, high EMF) at equivalent MeHg exposure. Prediction: urban Japan shows effects at lower MeHg thresholds.",
        timeline: "Testable immediately (existing Faroe Islands and Japanese cohort data)",
        falsification: "No difference in MeHg neurotoxicity threshold between high-EMF and low-EMF populations",
      },
      {
        id: "CHAIN-1",
        title: "Ca²⁺ channel blocker prevents EMF-induced sleep effects (ETH nimodipine-5G)",
        description: "The VGCC hypothesis predicts that blocking the Ca²⁺ channel should prevent ALL downstream EMF effects. [[ref:sousouri2025|Sousouri 2025]] showed CACNA1C genotype determines 5G sleep response. Test: ETH Zürich nimodipine-5G follow-up — administer nimodipine (L-type Ca²⁺ blocker) before 5G exposure and measure sleep EEG. Prediction: nimodipine abolishes the genotype-dependent sleep EEG changes seen in the original study.",
        timeline: "Testable within 12 months (RCT extension of [[ref:sousouri2025|Sousouri 2025]] protocol)",
        falsification: "Nimodipine does NOT prevent EMF-induced sleep EEG changes → VGCC is not the primary target → entire BERM cascade must be reconsidered",
      },
      {
        id: "CHAIN-2",
        title: "Amish communities show different chronic disease trends than mainstream population",
        description: "Amish communities have minimal EMF exposure (no grid electricity, no wireless devices), high co-sleeping, high breastfeeding. If EMF is a significant driver of chronic disease trends, Amish should show divergent trajectories for BERM-predicted conditions. Test: compare age-adjusted incidence trends (1990→2025) for T2D, obesity, autism, ADHD, depression, myopia, SIDS in Amish vs. general US population. Prediction: Amish show stable or declining rates where the general population shows increase.",
        timeline: "Testable immediately (Amish health registries + CDC NHANES comparison)",
        falsification: "Amish communities show the same chronic disease trend increases as the general US population",
      },
      {
        id: "CHAIN-3",
        title: "EMF reduction intervention produces measurable health improvement in a controlled study",
        description: "This is BERM's critical missing piece: interventional verification. All current evidence is observational or mechanistic. Test: RCT of comprehensive EMF reduction (shielded sleeping environment, wired devices, no LED at night) in symptomatic individuals for 3 months. Measure: CaMKII Thr286 phosphorylation in lymphocytes, sleep quality (actigraphy), melatonin (urine 6-sulfatoxymelatonin), blood pressure. Prediction: EMF reduction group shows significant improvement in all four biomarkers.",
        timeline: "Testable within 12 months (RCT with biomarker panel)",
        falsification: "No improvement in any biomarker after comprehensive EMF reduction → EMF exposure has no measurable health impact → model lacks clinical relevance",
      },
      {
        id: "CHAIN-4",
        title: "Walker sleep chain: EMF→melatonin↓→sleep↓→GABA↓→Q↑ measured as complete cascade",
        description: "Feedback loop 4 predicts a cascading cycle: EMF suppresses melatonin → sleep deteriorates → GABA tonic inhibition decreases → Q-factor increases → brain becomes MORE sensitive to EMF → further melatonin suppression. Test: longitudinal study measuring evening EMF exposure, overnight melatonin (saliva), sleep quality (PSG), morning GABA (MRS spectroscopy), and EEG coherence (Q proxy) over 4 weeks. Prediction: initial EMF exposure produces self-amplifying deterioration across all measures.",
        timeline: "Testable within 6 months (longitudinal PSG + MRS + EEG protocol)",
        falsification: "No self-amplifying cascade — EMF effects on sleep/melatonin/GABA remain constant rather than progressively worsening",
      },
    ],
    mechPredictions: [
      {
        id: "BBB-EMF-1",
        title: "EMF increases BBB permeability; melatonin supplementation prevents it",
        description: "RF-EMF (27.12 MHz) increases BBB permeability via eNOS↑ and occludin↓. Melatonin protects tight junction proteins (occludin, claudin-5, ZO-1). Test: measure BBB permeability (gadolinium-enhanced MRI) during RF exposure with and without melatonin pre-treatment. Prediction: melatonin pre-treatment prevents EMF-induced BBB opening.",
        timeline: "Testable within 12 months (MRI + melatonin RCT)",
        falsification: "Melatonin does NOT prevent EMF-induced BBB permeability changes",
      },
      {
        id: "BBB-EMF-2",
        title: "Heavy metal brain accumulation higher in high-EMF populations via BBB opening",
        description: "EMF opens BBB → heavy metals (Pb, Cd, MeHg) enter brain more easily. EMF also suppresses melatonin → BBB protection↓ → DOUBLE vulnerability. Test: compare brain heavy metal accumulation (post-mortem or CSF) between high-EMF occupations and matched low-EMF controls with equivalent peripheral heavy metal levels. Prediction: high-EMF group has higher brain metal levels at equivalent blood levels.",
        timeline: "Testable within 18 months (occupational cohort with CSF/autopsy samples)",
        falsification: "No difference in brain heavy metal accumulation between EMF-exposure groups at equivalent blood levels",
      },
      {
        id: "BAT-EMF-1",
        title: "5G reduces BAT PRDM16 expression and thermogenesis in rodents",
        description: "5G (3.5 GHz) → PRDM16 mRNA↓ + C/EBPβ mRNA↓ in brown adipose tissue. BAT uses Ca²⁺ cycling (SERCA) for energy expenditure. Test: expose rodents to 5G and measure BAT PRDM16 protein, thermogenic capacity (cold challenge), and energy expenditure. Prediction: 5G-exposed animals show reduced cold-induced thermogenesis and weight gain on identical caloric intake.",
        timeline: "Testable within 6 months (rodent model with metabolic cages)",
        falsification: "No change in BAT thermogenesis or weight in 5G-exposed vs control animals on identical diet",
      },
      {
        id: "HPA-EMF-1",
        title: "Chronic EMF elevates hair cortisol in exposed workers",
        description: "EMF sets a new HPA axis setpoint with sensitization rather than adaptation. Chronic exposure → sustained cortisol elevation + adrenal hypertrophy. Test: measure hair cortisol (3-month integrated cortisol) in telecom workers vs matched office workers. Prediction: telecom workers show significantly higher hair cortisol after controlling for perceived stress and lifestyle factors.",
        timeline: "Testable immediately (hair cortisol + occupational exposure questionnaire)",
        falsification: "No difference in hair cortisol between high-EMF and low-EMF occupation groups",
      },
      {
        id: "HPA-EMF-2",
        title: "EMF produces adrenal hypertrophy measurable by imaging",
        description: "Animal studies show EMF → ACTH↑ + corticosterone↑ + adrenal hypertrophy. This anatomical change should be detectable in chronically exposed humans. Test: compare adrenal gland volume (CT/MRI) in workers with >10 years high-EMF exposure vs matched controls. Prediction: high-EMF group has significantly larger adrenal glands.",
        timeline: "Testable immediately (retrospective imaging study)",
        falsification: "No adrenal volume difference between chronic high-EMF and low-EMF occupation groups",
      },
      {
        id: "BETA-EMF-1",
        title: "EMF disrupts glucose-stimulated insulin secretion via Ca²⁺ channel activation",
        description: "Electric fields can induce insulin secretion WITHOUT glucose. ELF-EMF alters glucose-stimulated insulin dynamics. CaVγ4→CaMKII→MafA pathway: CaMKII dysregulation → β-cell maturity loss. Test: measure insulin secretion dynamics (first-phase insulin response) in EMF-exposed vs control subjects during OGTT. Prediction: EMF-exposed group shows blunted first-phase insulin with elevated basal insulin.",
        timeline: "Testable within 12 months (OGTT study with EMF exposure history)",
        falsification: "No difference in insulin secretion dynamics between EMF-exposure groups",
      },
      {
        id: "BETA-EMF-2",
        title: "Verapamil protects β-cells from EMF-induced dysfunction",
        description: "Verapamil (L-type Ca²⁺ blocker) protects β-cells and improves T1D outcomes ([[ref:verap_t1d_jama|JAMA 2023]]). If EMF damages β-cells via Ca²⁺ channels, verapamil should also prevent EMF-induced β-cell dysfunction. Test: expose β-cell cultures to EMF with/without verapamil; measure insulin secretion and MafA expression. Prediction: verapamil prevents EMF-induced insulin secretion changes and MafA↓.",
        timeline: "Testable within 6 months (in vitro β-cell culture)",
        falsification: "Verapamil does NOT prevent EMF-induced β-cell dysfunction → Ca²⁺ channel is not the primary mechanism",
      },
      {
        id: "HYPO-EMF-1",
        title: "Chronic EMF reduces hypothalamic synaptic vesicle density",
        description: "835 MHz (12 weeks) reduces synaptic vesicle number, size, and docking in hypothalamus, plus synapsin I/II↓ and synaptotagmin 1↓. Synaptotagmin 1 is the Ca²⁺ sensor for vesicle release. Its loss means ALL hypothalamic hormone release is impaired. Test: replicate [[ref:kim2019_hypothalamus|Kim 2019]] with additional hormone panel (GnRH, CRH, TRH, GHRH, dopamine). Prediction: multi-hormone deficit pattern matching BERM predictions.",
        timeline: "Testable within 12 months (rodent model with hypothalamic dissection + hormone panel)",
        falsification: "No synaptic vesicle changes and no multi-hormone deficit after chronic RF exposure",
      },
      {
        id: "HYPO-EMF-2",
        title: "EMF produces simultaneous T↓ + cortisol↑ + GH↓ via hypothalamic disruption",
        description: "If EMF disrupts hypothalamic synaptic transmission broadly (VK13), ALL hormone axes should be affected simultaneously. The triple lock (T↓ × cortisol↑ × DA↓) should be accompanied by GH↓ and thyroid changes. Test: measure full hormone panel (T, LH, cortisol, ACTH, GH, IGF-1, TSH, fT4, dopamine) in chronic EMF-exposed vs controls. Prediction: coherent multi-axis disruption pattern.",
        timeline: "Testable immediately (occupational cohort with comprehensive hormone panel)",
        falsification: "EMF-exposed group shows changes in only one hormonal axis rather than coordinated multi-axis disruption",
      },
      {
        id: "MAST-EMF-1",
        title: "EMF triggers mast cell degranulation measurable by serum tryptase",
        description: "Ca²⁺ is the primary trigger for mast cell degranulation. EMF → VGCC → Ca²⁺ → mast cell releases histamine + IL-1β + tryptase. [[ref:johansson2000_mast|Johansson 2000]] showed mast cell changes in skin biopsies after display terminal exposure. Test: measure serum tryptase (specific mast cell degranulation marker) before and after standardized EMF exposure. Prediction: acute EMF exposure produces measurable tryptase elevation.",
        timeline: "Testable within 3 months (blood draw + EMF exposure, simple protocol)",
        falsification: "No tryptase elevation after EMF exposure",
      },
      {
        id: "MAST-EMF-2",
        title: "Mast cell stabilizers prevent EMF-induced skin and systemic reactions",
        description: "If EMF symptoms are partly mediated by mast cell degranulation, mast cell stabilizers (cromolyn sodium, ketotifen) should prevent them. Test: RCT of cromolyn + EMF exposure vs placebo + EMF exposure in EHS patients. Measure: skin reactions, systemic symptoms, serum histamine/tryptase. Prediction: cromolyn group shows significantly fewer symptoms and lower histamine/tryptase.",
        timeline: "Testable within 6 months (RCT with existing approved drugs)",
        falsification: "Mast cell stabilizers do NOT reduce EMF-induced symptoms",
      },
      {
        id: "KCC2-EMF-1",
        title: "Prenatal EMF exposure delays GABA excitatory→inhibitory switch in offspring",
        description: "Environmental disruptions (stress, inflammation) delay KCC2 maturation → GABA stays excitatory longer → Q-factor elevated longer → wider vulnerability window. IL-1β (from mast cells or glia) → KCC2↓. ROS → KCC2↓. EMF → both ROS and IL-1β. Test: expose pregnant rodents to EMF; measure KCC2/NKCC1 ratio in offspring hippocampus at P7, P14, P21. Prediction: EMF-exposed offspring show delayed KCC2 switch.",
        timeline: "Testable within 9 months (rodent prenatal exposure model)",
        falsification: "No difference in KCC2 maturation timeline between EMF-exposed and control offspring",
      },
      {
        id: "TRIPLE-1",
        title: "T↓ × cortisol↑ × DA↓ triple deficit measurable in high-EMF populations",
        description: "The triple lock theory predicts that EMF simultaneously reduces testosterone (HPG), elevates cortisol (HPA), and reduces dopamine (mesolimbic). Each has been verified independently; the prediction is that they co-occur in the SAME individuals proportional to EMF exposure. Test: measure T, cortisol, and urinary HVA (dopamine metabolite) in high vs low EMF occupations. Prediction: triple deficit pattern (T↓ + cortisol↑ + HVA↓) correlates with cumulative EMF exposure.",
        timeline: "Testable immediately (occupational cohort with hormone + neurotransmitter panel)",
        falsification: "The three deficits do not co-occur — they are independent of each other and of EMF exposure",
      },
      {
        id: "HIPPO-1",
        title: "Chronic EMF exposure correlates with hippocampal volume loss",
        description: "EMF → cortisol↑ → hippocampal dendritic retraction + neurogenesis↓ → volume loss. Hippocampus is also the HPA negative feedback center — its damage removes cortisol braking → cortisol↑↑ (feedback loop S9). Test: compare hippocampal volume (MRI volumetry) in workers with >10 years high-EMF exposure vs matched controls, controlling for age, stress, depression. Prediction: high-EMF group shows reduced hippocampal volume.",
        timeline: "Testable immediately (retrospective MRI volumetry study)",
        falsification: "No hippocampal volume difference between chronic high-EMF and low-EMF occupation groups after controlling for confounders",
      },
      {
        id: "KLIM-1",
        title: "EMF reduction reverses BAT suppression measurable by thermal imaging",
        description: "If EMF → PRDM16↓ → BAT↓ → thermogenesis↓ → weight gain, then EMF reduction should restore BAT function. Test: measure supraclavicular BAT activity (infrared thermography after cold challenge) before and after 3-month EMF reduction protocol. Prediction: EMF reduction group shows increased BAT thermogenesis and modest weight loss without dietary change.",
        timeline: "Testable within 6 months (thermal imaging + EMF reduction protocol)",
        falsification: "No change in BAT thermogenesis after EMF reduction",
      },
    ],
    suppPredictions: [
      {
        id: "E-NEW-1",
        title: "Sperm CatSper Ca²⁺ response is EMF-exposure dependent",
        description: "CatSper channels in sperm activate prematurely under RF-EMF, causing energy depletion before reaching the egg (‘premature energy expenditure’). Test: dose-response study of CatSper activation vs SAR level in human sperm samples. Prediction: CatSper activation increases with SAR; sperm exposed to mobile-phone-level RF show premature hyperactivation and reduced fertilization capacity.",
        timeline: "Testable within 6 months (in vitro sperm + RF exposure)",
        falsification: "No dose-dependent relationship between SAR and CatSper activation",
      },
      {
        id: "E-NEW-2",
        title: "GnIH antagonist protects testosterone during EMF exposure",
        description: "Cortisol↑ → GnIH↑ → GnRH↓ → T↓ is a verified cross-suppression pathway. RF9 (GnIH antagonist) restored T in cortisol-treated primates. Test: expose rodents to chronic EMF with/without RF9-type GnIH antagonist. Prediction: GnIH antagonist prevents EMF-induced T decline, confirming HPA-HPG cross-suppression as the mechanism.",
        timeline: "Testable within 12 months (rodent model with pharmacological intervention)",
        falsification: "GnIH antagonist does NOT prevent EMF-induced testosterone decline",
      },
      {
        id: "E-NEW-3",
        title: "Chronic RF alters OPC Cav1.2 expression and myelination timing",
        description: "Cav1.2 is essential for OPC differentiation and myelination. SMF increases Cav1.2 in OPCs. Chronic RF may dysregulate Cav1.2 in developing brain → myelination timing disruption → white matter integrity↓. Test: expose developing rodent brains to chronic RF; measure Cav1.2 expression in OPCs and myelination markers (MBP, PLP) at developmental timepoints. Prediction: RF-exposed animals show altered myelination timing.",
        timeline: "Testable within 12 months (developmental rodent model)",
        falsification: "No change in OPC Cav1.2 expression or myelination timing after chronic RF",
      },
      {
        id: "E-NEW-4",
        title: "200 kHz intermediate frequency INCREASES NK cell activity",
        description: "TTFields (200 kHz) increase NK cytotoxicity while 50 Hz ELF suppresses it — direct validation of BERM’s frequency-dependent pathway hierarchy. Test: compare NK cell cytotoxicity across ELF (50 Hz), RF (900 MHz, 2.4 GHz), and IF (200 kHz) exposures. Prediction: IF range shows NK activation while ELF and RF show suppression — different frequencies, different biological outcomes via the same VGCC mechanism.",
        timeline: "Testable within 6 months (in vitro NK cell assay across frequencies)",
        falsification: "All frequencies produce the same NK cell response direction",
      },
      {
        id: "E-NEW-5",
        title: "Gut Per2 expression correlates with EMF exposure",
        description: "Per2 knockout disrupts gut barrier → LPS enters bloodstream → neuroinflammation → depression. EMF disrupts circadian rhythm → Per2↓. Test: measure Per2 expression in gut epithelial biopsies of shift workers (circadian disruption proxy) vs day workers, correlated with EMF exposure history and serum LPS levels. Prediction: EMF/circadian disruption → Per2↓ → elevated serum LPS.",
        timeline: "Testable within 12 months (occupational cohort with gut biopsies)",
        falsification: "No correlation between EMF exposure and gut Per2 expression or serum LPS",
      },
      {
        id: "E-NEW-6",
        title: "Sleep restriction + EMF produces superadditive testosterone decline",
        description: "5h sleep → T -10-15% ([[ref:leproult2011_testosterone_sleep|JAMA 2011]]). EMF → T↓ via three routes (VK13, VK15, VK22). Combined sleep restriction + EMF should produce GREATER T decline than either alone (superadditive). Test: 2×2 factorial RCT: normal sleep/restricted sleep × low EMF/high EMF. Measure T at baseline and after 1 week. Prediction: interaction term is significant — combined group shows >25% T decline vs ~15% for sleep alone.",
        timeline: "Testable within 3 months (controlled sleep + EMF study)",
        falsification: "No interaction effect — sleep and EMF effects on T are purely additive",
      },
      {
        id: "E-NEW-7",
        title: "RF-exposed children have lower BDNF and dendritic spine density",
        description: "RF 835 MHz (postnatal) reduces BDNF in CA1 and dentate gyrus with dendritic spine loss and memory impairment ([[ref:bdnf_rf_dev_2021|PMC8159076]]). Meanwhile ELF increases BDNF (hormesis). Test: measure serum BDNF in children stratified by personal RF exposure (phone use, WiFi proximity). Prediction: higher RF exposure correlates with lower BDNF and poorer spatial memory scores.",
        timeline: "Testable within 12 months (pediatric cohort with EMF dosimetry)",
        falsification: "No correlation between RF exposure and BDNF levels in children",
      },
      {
        id: "E-NEW-8",
        title: "Gut barrier permeability (LPS marker) correlates with EMF exposure",
        description: "EMF → melatonin↓ → Per2↓ in gut → barrier disruption → LPS enters bloodstream → systemic inflammation. Gut barrier uses the SAME tight junction proteins as BBB (ZO-1, occludin, claudins), and melatonin protects both. Test: measure serum LPS-binding protein and zonulin (gut permeability markers) in high-EMF vs low-EMF occupation workers. Prediction: high-EMF group has elevated gut permeability markers.",
        timeline: "Testable immediately (occupational cohort with blood draw)",
        falsification: "No difference in gut permeability markers between EMF exposure groups",
      },
    ],
    finalPredictions: [
      {
        id: "E-NEW-9",
        title: "Hidden hypothyroid: FT3/FT4 ratio is lower in high-EMF workers",
        description: "EMF reduces hypothalamic Dio2/Dio3 → T4→T3 conversion is inhibited → blood T4 appears 'normal' but tissues don't receive T3. Test: measure FT3/FT4 ratio in high-EMF occupations (telecom, electricians) vs matched low-EMF controls. Prediction: high-EMF group has significantly lower FT3/FT4 ratio despite normal TSH and T4.",
        timeline: "Testable immediately (occupational cohort with blood draw)",
        falsification: "No difference in FT3/FT4 ratio between EMF exposure groups",
      },
      {
        id: "E-NEW-10",
        title: "Transgenerational sperm methylation persists to F3",
        description: "EMF alters sperm epigenome dose-dependently (1 mT: methylation↓, 3 mT: methylation↑). If EMF effects follow the DDT transgenerational model, methylation changes should persist to F3. Test: expose F0 rodents to chronic EMF; analyze sperm methylation profiles in F1, F2, F3. Prediction: F3 sperm methylation retains EMF-signature from F0 exposure. BERM's HIGHEST PRIORITY research proposal.",
        timeline: "Testable within 18-24 months (multigenerational rodent study)",
        falsification: "F3 sperm methylation is indistinguishable from controls",
      },
      {
        id: "E-NEW-11",
        title: "EMF exposure duration correlates with telomere shortening",
        description: "EMF→ROS↑ + melatonin↓→telomerase↓ + SIRT1↓ should accelerate telomere shortening. Test: measure leukocyte telomere length in occupational EMF cohort stratified by exposure years. Control for age, smoking, BMI. Prediction: cumulative EMF exposure correlates with shorter telomeres after controlling for confounders.",
        timeline: "Testable immediately (occupational cohort with blood draw)",
        falsification: "No correlation between EMF exposure duration and telomere length",
      },
      {
        id: "E-NEW-12",
        title: "Melatonin supplementation slows telomere shortening in high-EMF population",
        description: "Melatonin activates telomerase + SIRT1 (anti-aging). EMF→melatonin↓ removes this protection. Test: RCT of melatonin supplementation (3-5 mg/night, 12 months) in high-EMF workers. Measure telomere length at baseline and 12 months. Prediction: melatonin group shows significantly less telomere shortening than placebo.",
        timeline: "Testable within 12 months (supplementation RCT)",
        falsification: "Melatonin supplementation does not affect telomere attrition rate",
      },
      {
        id: "E-NEW-13",
        title: "Oxytocin levels inversely correlate with EMF exposure",
        description: "Oxytocin release is directly VGCC-dependent (N-type + L-type Ca²⁺ channels). EMF disrupts VGCC → OXT release disrupted. Test: measure salivary or plasma oxytocin in controlled EMF exposure study (pre/post acute exposure). Prediction: acute EMF exposure reduces oxytocin response to social stimuli.",
        timeline: "Testable within 6 months (controlled lab study)",
        falsification: "No change in oxytocin levels after EMF exposure",
      },
      {
        id: "E-NEW-14",
        title: "ELF-exposed animals show α2δ-1↑ WITHOUT nerve injury",
        description: "ELF-priming (VK4) upregulates VGCC expression including α2δ-1 subunits. α2δ-1 overexpression alone produces neuropathic pain behavior WITHOUT nerve injury. Test: expose rodents to chronic ELF (50 Hz, 8-10 days); measure α2δ-1 expression in DRG and spinal dorsal horn. Prediction: ELF produces α2δ-1 upregulation and pain-like behavior without nerve damage.",
        timeline: "Testable within 6 months (rodent ELF exposure model)",
        falsification: "No change in α2δ-1 expression after chronic ELF exposure",
      },
      {
        id: "E-NEW-15",
        title: "ASD children's NKCC1/KCC2 ratio correlates with prenatal EMF",
        description: "NKCC1/KCC2 ratio is elevated in ASD (GABA stays excitatory). EMF disrupts KCC2 maturation via IL-1β (S9) and ROS. Test: measure plasma NKCC1/KCC2 ratio in ASD children; correlate with maternal prenatal EMF exposure history (occupation, device use, residential proximity to base stations). Prediction: higher prenatal EMF correlates with higher NKCC1/KCC2 ratio in ASD cases.",
        timeline: "Testable within 12 months (case-control with maternal history)",
        falsification: "No correlation between prenatal EMF exposure and NKCC1/KCC2 ratio",
      },
      {
        id: "E-NEW-16",
        title: "Bumetanide + EMF reduction outperforms either alone for ASD",
        description: "Bumetanide blocks NKCC1 → restores inhibitory GABA. EMF reduction removes the upstream driver of KCC2↓. Together they should be superadditive. Test: 2×2 RCT in ASD children: bumetanide/placebo × EMF reduction/standard. Measure CARS score, SRS, sensory sensitivity. Prediction: combined group shows significantly better improvement than either intervention alone.",
        timeline: "Testable within 12 months (pediatric 2×2 RCT)",
        falsification: "No interaction effect — bumetanide and EMF reduction are purely additive",
      },
    ],
    extPredictions: [
      {
        id: "E-NEW-24",
        title: "ADHD children's PFC myelination correlates with prenatal EMF",
        description: "ADHD shows 5-year PFC maturation delay ([[ref:adhd_pfc_delay|Shaw 2007 PNAS]]). EMF disrupts OPC myelination via Cav1.2 (VK20) and reduces DA in PFC. Test: DTI white matter integrity in PFC of ADHD children correlated with prenatal/neonatal EMF exposure history. Prediction: higher prenatal EMF correlates with delayed PFC myelination markers.",
        timeline: "Testable within 12 months (pediatric cohort with DTI + maternal history)",
        falsification: "No correlation between prenatal EMF exposure and PFC myelination timing",
      },
      {
        id: "E-NEW-25",
        title: "EMF occupational exposure correlates with ALS risk",
        description: "Motor neurons have low Ca²⁺ buffering + Ca²⁺-permeable AMPA receptors making them selectively vulnerable to Ca²⁺ overload. Multiple meta-analyses show OR 1.3-1.7 for electrical workers. Test: pooled analysis of existing occupational cohorts controlling for confounders. Prediction: EMF exposure is an independent ALS risk factor (OR > 1.2).",
        timeline: "Testable immediately (existing meta-analyses support, need pooled re-analysis)",
        falsification: "Pooled analysis controlling for all confounders shows OR < 1.1",
      },
      {
        id: "E-NEW-26",
        title: "Gut microbiome composition changes with EMF exposure",
        description: "90%+ of serotonin is produced in gut enterochromaffin cells. EMF→circadian disruption→Per2↓→gut barrier↓ (S14) should alter microbiome. Test: 16S rRNA sequencing of gut microbiome in EMF-exposed vs controls. Prediction: EMF exposure shifts microbiome composition, specifically reducing 5-HT-producing species (Lactobacillus, Bifidobacterium).",
        timeline: "Testable within 6 months (occupational cohort with stool samples)",
        falsification: "No significant microbiome composition difference between groups",
      },
      {
        id: "E-NEW-27",
        title: "Mast cell degranulation threshold is lower in EMF-exposed individuals",
        description: "Mast cell degranulation is Ca²⁺-dependent. EMF→VGCC→Ca²⁺ should lower the activation threshold. Test: in vitro mast cell degranulation assay comparing cells from EMF-exposed vs control subjects, measuring histamine release threshold. Prediction: mast cells from EMF-exposed individuals degranulate at lower stimulation thresholds.",
        timeline: "Testable within 6 months (in vitro assay with patient-derived mast cells)",
        falsification: "No difference in degranulation threshold between groups",
      },
      {
        id: "E-NEW-28",
        title: "Vitamin D supplementation reduces EMF-induced VGCC upregulation",
        description: "Vitamin D (1,25(OH)₂D₃) downregulates CACNA1C/1D mRNA ([[ref:vdh_lvscc|J Neurosci 2001]]). Vitamin D deficiency → VGCC over-expression = same state as ELF-priming (VK4). Test: measure VGCC expression in PBMCs before/after vitamin D supplementation in deficient individuals. Prediction: vitamin D repletion reduces VGCC protein expression.",
        timeline: "Testable within 6 months (supplementation study with PBMC analysis)",
        falsification: "Vitamin D repletion does not change VGCC expression levels",
      },
      {
        id: "E-NEW-29",
        title: "Vitamin D status modulates individual EMF sensitivity",
        description: "Low vitamin D → VGCC over-expressed → more Ca²⁺ per EMF photon = higher EMF sensitivity. Test: correlate vitamin D status with EMF-induced biomarker changes (CaMKII Thr286, sleep EEG) in controlled exposure study. Prediction: vitamin D-deficient individuals show larger EMF-induced biomarker changes.",
        timeline: "Testable within 12 months (controlled EMF exposure stratified by vitamin D status)",
        falsification: "No correlation between vitamin D status and magnitude of EMF biomarker response",
      },
      {
        id: "E-NEW-30",
        title: "PEMF therapy parameters map to Ca²⁺ hormesis curve",
        description: "PEMF promotes bone growth at specific parameters while chronic EMF causes harm. Both operate through Ca²⁺ channels. Test: measure Ca²⁺ signaling in osteoblasts across PEMF parameter space (frequency, intensity, duration). Prediction: optimal PEMF parameters correspond to the Lindgren χ-parameter hormesis peak; deviation in either direction reduces benefit.",
        timeline: "Testable within 12 months (in vitro osteoblast Ca²⁺ dose-response)",
        falsification: "PEMF effects do not follow a hormesis curve through Ca²⁺ channels",
      },
      {
        id: "E-NEW-31",
        title: "Schizophrenia risk highest with CACNA1C variant + low vitamin D + high EMF",
        description: "Triple hit: CACNA1C risk variant (genetic) + vitamin D deficiency (→VGCC↑) + EMF exposure (→Ca²⁺↑) should produce highest schizophrenia risk. Test: genotype CACNA1C + measure vitamin D + estimate EMF exposure in schizophrenia case-control study. Prediction: three-way interaction is significant — triple-hit individuals have highest odds ratio.",
        timeline: "Testable within 12 months (case-control with genotyping + biomarkers)",
        falsification: "No significant three-way interaction between CACNA1C genotype, vitamin D, and EMF",
      },
    ],
    ultPredictions: [
      {
        id: "E-NEW-32",
        title: "CatSper premature activation threshold correlates with EMF exposure",
        description: "CatSper is temperature-gated (threshold 33.5°C, Q₁₀=5.1). EMF→Ca²⁺ could lower the thermal activation threshold. Test: measure CatSper activation temperature in sperm from men with different occupational EMF exposure levels. Prediction: higher EMF exposure correlates with lower CatSper activation threshold.",
        timeline: "Testable within 6 months (in vitro CatSper electrophysiology)",
        falsification: "No correlation between EMF history and CatSper activation temperature",
      },
      {
        id: "E-NEW-33",
        title: "Psilocybin reverses EMF-induced dendritic atrophy in hippocampus",
        description: "Psilocybin promotes dendritic spine growth via 5-HT2A→Ca²⁺→BDNF→mTOR (VK52). EMF→cortisol→hippocampal dendritic atrophy (VK14). Test: chronic EMF exposure → dendritic loss, then single psilocybin dose → measure dendritic recovery. Prediction: psilocybin reverses EMF-induced hippocampal dendritic loss.",
        timeline: "Testable within 12 months (rodent model: EMF exposure + psilocybin rescue)",
        falsification: "Psilocybin does not restore dendritic density after EMF-induced loss",
      },
      {
        id: "E-NEW-34",
        title: "Caffeine consumption inversely correlates with EMF biomarker response",
        description: "Caffeine blocks A2A receptors → reduces neuroinflammation → Ca²⁺ modulation. Regular caffeine consumers should show attenuated EMF biomarker responses. Test: controlled EMF exposure, stratify by caffeine consumption. Prediction: habitual caffeine consumers show smaller CaMKII Thr286 and sleep EEG changes from EMF.",
        timeline: "Testable within 6 months (add caffeine stratification to existing protocols)",
        falsification: "No difference in EMF biomarkers between caffeine consumers and non-consumers",
      },
      {
        id: "E-NEW-35",
        title: "Drinking water lithium inversely correlates with EMF-associated health outcomes",
        description: "Lithium modulates GSK-3β and CaMKII — key nodes in the BERM Ca²⁺ cascade. Areas with higher natural lithium in drinking water should show attenuated EMF health effects. Test: correlate drinking water lithium with EMF-associated disease incidence (dementia, suicide, depression) at county level. Prediction: interaction term (lithium × EMF) is significant and protective.",
        timeline: "Testable immediately (existing county-level data for lithium, EMF infrastructure, disease rates)",
        falsification: "No interaction between water lithium levels and EMF-associated health outcomes",
      },
      {
        id: "E-NEW-36",
        title: "Amygdala volume increases with chronic EMF exposure",
        description: "EMF→cortisol↑ (VK11) → amygdala BLA hypertrophy (VK55). Chronically elevated cortisol from EMF should produce measurable amygdala enlargement. Test: MRI volumetric analysis in high-EMF occupational workers vs matched controls. Prediction: amygdala volume is significantly larger in high-EMF group.",
        timeline: "Testable within 12 months (occupational cohort with MRI)",
        falsification: "No amygdala volume difference between high-EMF and low-EMF workers",
      },
      {
        id: "E-NEW-37",
        title: "Amish chronic disease gradient follows EMF exposure gradient",
        description: "Old Order Amish (no electricity) → Conservative Amish (some electricity) → Mennonite (modern electricity) → general population. Test: compare chronic disease rates across this cultural gradient. Prediction: disease rates increase monotonically with EMF exposure level, even after controlling for diet, exercise, and lifestyle factors.",
        timeline: "Testable within 12 months (cross-sectional comparison of existing health registries)",
        falsification: "Disease gradient does not follow EMF exposure after controlling for lifestyle confounders",
      },
      {
        id: "E-NEW-38",
        title: "Amish dairy cows have better fertility than modern dairy cows",
        description: "Amish dairy farms have minimal EMF. If EMF affects bovine reproduction through the same Ca²⁺ mechanisms, Amish-farm cows should show better fertility. Test: compare conception rates, services per conception, hormone profiles in Amish vs modern dairy. Prediction: Amish-farm cows have significantly better fertility despite same breeds.",
        timeline: "Testable within 6 months (existing agricultural data + hormone sampling)",
        falsification: "No fertility difference between Amish and modern dairy cows of same breed",
      },
      {
        id: "E-NEW-39",
        title: "Modern water filtration reduces lithium → increased neuropsychiatric disease",
        description: "Modern water treatment removes trace lithium. Areas that switched to advanced filtration should show increased dementia/suicide rates after the switch. Test: before-after analysis of water treatment upgrades and neuropsychiatric outcomes. Prediction: advanced filtration introduction correlates with subsequent increase in dementia and suicide rates.",
        timeline: "Testable immediately (municipal water treatment records + health data)",
        falsification: "No change in neuropsychiatric outcomes after water treatment upgrades that remove lithium",
      },
    ],
    ttypePredictions: [
      {
        id: "TTYPE-1",
        title: "EMF effects on testosterone are mediated primarily by T-type, not L-type channels",
        description: "Expose Leydig cell cultures to standardized EMF (ELF-modulated RF). Measure testosterone under three conditions: (1) Control, (2) + nifedipine (L-type blocker) isolates T-type contribution, (3) + ethosuximide (T-type blocker) isolates L-type contribution. Prediction: ethosuximide abolishes MORE of the EMF effect than nifedipine.",
        timeline: "Testable within 3–6 months (in vitro, Leydig cell culture)",
        falsification: "Nifedipine alone abolishes all EMF-induced testosterone change (no T-type contribution), or ethosuximide blocks less of the EMF effect than nifedipine",
      },
      {
        id: "TTYPE-2",
        title: "Modulated signals produce larger T-type effects than continuous wave at same SAR",
        description: "Expose Leydig cells to: (1) CW at 900 MHz, (2) same carrier amplitude-modulated at 16 Hz (Adey frequency), (3) same carrier modulated at 217 Hz (GSM). Same time-averaged SAR. Prediction: modulated signals produce LARGER effects because the ELF modulation envelope passes through membrane capacitance while the carrier does not.",
        timeline: "Testable within 3–6 months (in vitro, Leydig cell culture)",
        falsification: "CW and modulated signals produce equal testosterone effects at the same time-averaged SAR, or CW produces larger effects",
      },
    ],
    repPredictions: [
      {
        id: "REP-1",
        title: "Controlling all five parameters yields consistent EMF calcium efflux results",
        description: "Replicate Blackman's calcium efflux experiment with ALL five parameters controlled: (1) temperature 36.5±0.3°C stable, (2) blue-rich lighting documented, (3) DC field measured and oriented, (4) Faraday-shielded controls, (5) tissue developmental history documented. Prediction: results are consistent across laboratories when all five parameters match.",
        timeline: "Testable within 6–12 months (cell culture, standard equipment)",
        falsification: "Results remain inconsistent even when all five parameters are controlled and matched across laboratories",
      },
      {
        id: "REP-2",
        title: "EMF effects on insulin secretion are glucose-dependent",
        description: "Expose pancreatic β-cell lines to standardized EMF at three glucose concentrations (2.8 mM basal, 11 mM stimulatory, 25 mM supramaximal). Prediction: EMF effect is LARGEST at 11 mM (VGCCs maximally primed) and SMALLEST at 2.8 mM (VGCCs mostly closed). Tests the glucose-dependent χ prediction.",
        timeline: "Testable within 3–6 months (β-cell lines, standard glucose assay)",
        falsification: "EMF effect is equal across glucose concentrations, or largest at 2.8 mM basal",
      },
      {
        id: "REP-3",
        title: "BTB opening correlates with sperm quality decline in same animals",
        description: "RF-EMF exposure in rats with simultaneous measurement of: (1) BTB permeability (FITC-dextran tracer), (2) sperm concentration and motility, (3) tight junction protein expression (occludin, ZO-1). Time-series: 1, 4, 8, 12 weeks. Prediction: BTB permeability increases BEFORE sperm parameters decline (barrier damage precedes toxicity) and decline ACCELERATES over time (positive feedback).",
        timeline: "Testable within 3–6 months (standard rat model, FITC-dextran protocol)",
        falsification: "BTB permeability and sperm decline are simultaneous, or sperm decline precedes BTB opening",
      },
      {
        id: "REP-4",
        title: "Sentinel species sensitivity scales with metabolic rate",
        description: "Meta-analysis: compile EMF exposure thresholds across species (insects, birds, rodents, primates) and test whether threshold ∝ body_mass^(0.25). If the metabolic χ scaling is correct, smaller species show effects at lower exposure levels following Kleiber’s law.",
        timeline: "Testable immediately (meta-analysis of existing literature)",
        falsification: "No correlation between body mass and EMF effect threshold, or inverse correlation",
      },
    ],
    diffPredictions: [
      {
        id: "DIFF-1",
        title: "Prenatal EMF correlates with shorter AGD in newborn boys",
        description: "Prenatal EMF exposure correlates with shorter anogenital distance (AGD) in newborn boys. Test: measure AGD in birth cohorts with documented maternal EMF exposure. Control for phthalates, BMI, smoking. If negative, prenatal channels 1-3 are weak.",
        discriminating: true,
        critical: true,
        level: "L*",
        verified: false,
      },
      {
        id: "DIFF-2",
        title: "CACNA1C × prenatal EMF → ASD + gender-atypical development",
        description: "CACNA1C risk variant carriers with high prenatal EMF show higher rates of ASD+gender-atypical development than non-carriers with same exposure. GxE interaction test.",
        discriminating: true,
        critical: false,
        level: "L*",
        verified: false,
      },
      {
        id: "DIFF-3",
        title: "Puberty onset inversely correlates with EMF/screen time",
        description: "Puberty onset age inversely correlates with childhood EMF/screen time exposure. VERIFIED: CPP increased 3× in girls, 2× in boys ([[ref:denmark-cpp-3x-increase|Denmark 1998-2017]]). COVID screen time increase → CPP surge.",
        discriminating: false,
        critical: false,
        level: "M|C",
        verified: true,
      },
      {
        id: "DIFF-4",
        title: "Salivary oxytocin inversely correlates with EMF exposure",
        description: "Salivary oxytocin levels in adolescents inversely correlate with personal EMF exposure (phone use hours). Test: biomarker study with dosimetry.",
        discriminating: false,
        critical: false,
        level: "L*",
        verified: false,
      },
      {
        id: "DIFF-5",
        title: "Insular cortex activation differs by EMF exposure level",
        description: "Insular cortex activation patterns during interoceptive tasks differ between high-EMF and low-EMF adolescents. Test: fMRI with heartbeat detection task.",
        discriminating: false,
        critical: false,
        level: "L*",
        verified: false,
      },
      {
        id: "DIFF-6",
        title: "Gender clinic referrals correlate with technology adoption",
        description: "Gender clinic referral rates correlate with technology adoption timeline across countries. VERIFIED: Sweden +19,700%, Australia +12,650%, UK +2,457%. AFAB majority. Temporal correlation with smartphone adoption ~2010.",
        discriminating: false,
        critical: false,
        level: "L*",
        verified: true,
      },
      {
        id: "DIFF-7",
        title: "BDD prevalence increases with screen time",
        description: "Body dysmorphic disorder (BDD) prevalence increases with screen time/device use. VERIFIED: BDD prevalence rising, 'Snapchat dysmorphia' documented.",
        discriminating: false,
        critical: false,
        level: "L*",
        verified: true,
      },
    ],
    vgccPredictions: [
      {
        id: "MYOP-1",
        title: "Outdoor time protection against myopia is partially EMF-reduction mediated",
        description: "Compare myopia progression in children with identical outdoor time but different EMF exposure (Faraday-shielded vs standard outdoor areas). If EMF reduction adds to light's protective effect, it confirms the VGCC/DA channel.",
        level: "L*",
        discriminating: true,
        verified: false,
      },
      {
        id: "IMMUNE-1",
        title: "Chronic EMF exposure elevates baseline NFAT activation in T-cells",
        description: "Measure NFAT nuclear translocation in T-cells from high-EMF vs low-EMF populations matched for other factors.",
        level: "M|C",
        discriminating: false,
        verified: false,
      },
      {
        id: "HEAR-1",
        title: "Bluetooth earphone use duration correlates with subclinical hearing loss in young adults",
        description: "Control for volume level. Prediction: EMF component (Bluetooth RF) adds to acoustic damage via Cav1.3 excitotoxicity.",
        level: "M|C",
        discriminating: false,
        verified: false,
      },
      {
        id: "MIGR-1",
        title: "CACNA1I T-type variant carriers have higher EMF-triggered migraine frequency",
        description: "GxE interaction: T-type variant × EMF exposure → more cortical spreading depression events → more migraines.",
        level: "E",
        discriminating: true,
        verified: false,
      },
      {
        id: "SLEEP-2",
        title: "Sleep spindle density inversely correlates with evening EMF exposure",
        description: "Measure EEG sleep spindles in subjects with/without evening screen use. Prediction: spindle density ↓ in high-EMF group due to Cav3.3 nRt perturbation.",
        level: "M|C",
        discriminating: false,
        verified: false,
      },
      {
        id: "PCOS-1",
        title: "PCOS prevalence correlates with national EMF density controlling for BMI and diet",
        description: "Cross-national analysis. Prediction: positive correlation because 4 Modulome organs (pancreas, theca, granulosa, pituitary) converge on PCOS pathophysiology.",
        level: "M",
        discriminating: false,
        verified: false,
      },
      {
        id: "PAIN-1",
        title: "Cav3.2 blocker attenuates EMF-induced pain sensitization in animal model",
        description: "Expose rats to chronic EMF, measure pain thresholds, then administer selective Cav3.2 blocker. Prediction: blocker reverses EMF-induced hyperalgesia.",
        level: "M|C",
        discriminating: true,
        verified: false,
      },
      {
        id: "QT-1",
        title: "QTc interval positively correlates with cumulative EMF exposure in young adults",
        description: "EKG screening study with EMF dosimetry. Prediction: chronic EMF → Cav1.2 window current ↑ → action potential prolongation → measurable QTc increase.",
        level: "M|C",
        discriminating: false,
        verified: false,
      },
      {
        id: "TDP-1",
        title: "TheraBionic efficacy is abolished by co-administration of T-type Ca²⁺ channel blocker",
        description: "Already confirmed by FDA label (contraindication with CCBs). Further test: specific T-type blocker (ethosuximide) should abolish TheraBionic's anti-HCC effect while L-type blocker (nifedipine) should have less effect.",
        level: "E",
        discriminating: true,
        verified: true,
      },
      {
        id: "UNIFIED-1",
        title: "Same individual shows correlated VGCC-dependent biomarkers across systems",
        description: "In a single cohort, measure: HRV (cardiac Cav3), sleep spindle density (Cav3.3), pain threshold (Cav3.2 DRG), melatonin (CRY/Cav), sperm quality (Cav3 Leydig). Prediction: all should correlate within individuals because all share VGCC/Ca²⁺ as upstream cause.",
        level: "M",
        discriminating: true,
        verified: false,
      },
    ],
    tTfrPredictions: [
      {
        id: "T-TFR-1",
        title: "USA TFR will drop below 1.30 by 2035",
        description: "Based on testosterone threshold model: USA cumulative T loss reaches ~40% around 2030. Prediction: TFR will begin accelerating decline after 2028, dropping below 1.30 by 2035. Falsification: USA TFR remains above 1.40 in 2035.",
        discriminating: true,
        critical: true,
        level: "M|C",
        verified: false,
      },
      {
        id: "T-TFR-2",
        title: "Finland TFR will drop below 1.00 by 2032",
        description: "Finland is already past the biological threshold. Current trajectory: 1.87 (2010) → 1.26 (2024), −4.5%/year. Projection: 1.26 × 0.955^8 ≈ 0.87 by 2032. Falsification: Finland TFR stabilizes above 1.10.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "T-TFR-3",
        title: "Israel TFR will begin declining measurably by 2035",
        description: "Israel's cultural buffer has maintained TFR ~3.0 despite T decline comparable to USA. Prediction: biological threshold (~40% cumulative loss) reached ~2035, at which point even religiously motivated couples will experience subfertility. Falsification: Israel TFR remains above 2.8 in 2040.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "T-TFR-4",
        title: "Korea's $200B pronatalist spending will not raise TFR above 1.0",
        description: "Korea is past the biological threshold (~49% cumulative T loss). Social incentives cannot compensate for biological incapacity. Prediction: TFR stays below 1.0 through 2035 regardless of policy spending. Falsification: Korea TFR rises above 1.0 sustained for 3+ years.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "T-TFR-5",
        title: "T decline rate predicts TFR change better than GDP or education",
        description: "Cross-national regression: T decline rate (age-independent secular trend) predicts TFR change better than GDP, education, or urbanization alone. Testable with existing data from USA, Denmark, Finland, Israel and pending Asian studies. Falsification: GDP or education explain >80% of TFR variance after controlling for T decline.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
    ],
    causalPredictions: [
      {
        id: "CAUS-1",
        title: "BMI mediation accounts for 25–40% of total T decline",
        description: "Formal mediation analysis (Baron & Kenny or SEM) on longitudinal T data with concurrent BMI: indirect effect via BMI = 25–40% of total effect. Based on [[ref:mazur2013|Mazur 2013]] quantification (117/175 ng/dL = 67% direct). Falsification: mediation analysis shows <10% or >60% indirect effect via BMI.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "CAUS-2",
        title: "Faraday-shielded men show neither T decline nor BMI increase",
        description: "If EMF drives both T decline and BMI increase, then men in EMF-shielded environments should show attenuation of BOTH trends. Testable in occupational cohorts (submarine crews, shielded facilities). Falsification: shielded cohort shows same T decline rate as unshielded.",
        discriminating: true,
        critical: true,
        level: "M|C",
        verified: false,
      },
      {
        id: "CAUS-3",
        title: "LH decline rate correlates with EMF-proxy across countries",
        description: "[[ref:santi2025|Santi 2025]] found global LH decline. BERM predicts this is Route C/D mediated. Countries with higher EMF-proxy (residential electricity, broadband penetration) should show steeper LH decline. Testable with country-level LH data + EMF-proxy. Falsification: no correlation between EMF-proxy and LH decline rate.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
    ],
    popPredictions: [
      {
        id: "POP-1",
        title: "Amish TFR correlates inversely with distance to nearest urban area",
        description: "Within CAPED database: Amish communities closer to cities (higher ambient EMF) should have lower TFR than remote Amish communities, controlling for sect strictness and community size.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "POP-2",
        title: "Tsimane newborn AGD is longer than Trinidad (nearest city) newborn AGD",
        description: "AGD measurement in Tsimane Health and Life History Project cohort vs. urban Trinidadian comparison group. Same geographic region, different EMF exposure. If Tsimane AGD > Trinidad AGD, supports prenatal EMF → masculinization↓.",
        discriminating: true,
        critical: true,
        level: "L*",
        verified: false,
      },
      {
        id: "POP-3",
        title: "Mosetén health metrics fall between Tsimane and Western on EVERY measured variable",
        description: "Already partially confirmed (dementia, brain atrophy). Predict the same gradient for: fertility, metabolic syndrome, autoimmune markers, myopia, sleep quality. This gradient within a genetically matched population is the strongest available natural experiment.",
        discriminating: true,
        critical: false,
        level: "M|C",
        verified: false,
      },
      {
        id: "POP-4",
        title: "Indigenous communities adopting mobile technology show health deterioration within 5-10 years",
        description: "Longitudinal tracking of communities transitioning from no-phone to smartphone use. Predict: sleep quality↓, myopia↑, metabolic markers↑, fertility intention unchanged but biological fertility markers (hormones, sperm) ↓.",
        discriminating: true,
        critical: false,
        level: "L*",
        verified: false,
      },
    ],
    societalPredictions: [
      {
        id: "SOC-1",
        title: "Male labor force participation continues declining in all high-EMF countries",
        description: "Male labor force participation rate will continue declining in every G20 country through 2030, absent a major policy intervention (e.g. universal basic income, mandatory employment programs). The dual lock predicts that population-wide testosterone decline reduces status motivation while cortisol elevation makes workplace competition aversive — producing progressive 'opting out' behavior.",
        falsification: "Male LFP increases >2 percentage points in any G20 country without major policy change by 2030",
      },
      {
        id: "SOC-2",
        title: "Sexlessness rates correlate with smartphone adoption timing across countries",
        description: "Cross-country analysis will show a significant correlation between smartphone adoption timing (year when penetration exceeded 50%) and the onset of rising sexlessness rates among 18–30 year old males. Countries with earlier smartphone adoption (e.g. South Korea, Japan) should show earlier onset of sexlessness trends than later-adopting countries.",
        falsification: "No correlation between smartphone adoption year and sexlessness trend onset across ≥10 countries",
      },
      {
        id: "SOC-3",
        title: "Low-EMF communities show stable or rising marriage rates",
        description: "Amish and Mennonite communities — which maintain low personal EMF exposure due to restricted technology use — will show stable or rising marriage rates during 2020–2030, while US national marriage rates continue declining. This tests the dual lock's prediction that the behavioral effects (reduced approach behavior, increased avoidance) are biologically mediated, not purely cultural.",
        falsification: "Amish/Mennonite marriage rates decline at a rate comparable to the US national average during 2020–2030",
      },
    ],
    techPredictions: [
      {
        id: "PRIME-1",
        title: "ELF-primed cells show amplified RF calcium response",
        description: "Pre-expose neuronal cultures to 50 Hz ELF for 10 days (priming). Then expose to standardized RF (e.g. 2.4 GHz WiFi). Prediction: primed cells show 2–3× larger Ca²⁺ response to identical RF stimulus compared to unprimed controls. The mechanism: ELF upregulates VGCC expression ([[ref:sun2016_elf_vgcc|PMC4757866]]), making each cell more sensitive to subsequent RF activation. This is the core ELF priming prediction.",
        timeline: "Testable within 3–6 months (in vitro, standard Ca²⁺ imaging)",
        falsification: "No difference in Ca²⁺ response between ELF-primed and unprimed cells under identical RF exposure",
      },
      {
        id: "PRIME-2",
        title: "Amish (no grid priming) show minimal RF bioresponse",
        description: "Compare RF-induced biomarkers (salivary cortisol, melatonin, HRV) between Old Order Amish (no residential ELF priming) and matched modern controls after identical acute RF exposure. Prediction: Amish show significantly attenuated response because their VGCC expression is at baseline (not upregulated by 50 Hz). This explains why Amish maintain TFR ~6.1 despite occasional RF exposure from neighboring infrastructure.",
        timeline: "Testable within 1–2 years (requires Amish community cooperation)",
        falsification: "Amish show equal or greater RF bioresponse than modern controls",
      },
      {
        id: "PRIME-3",
        title: "Residential electricity consumption predicts EMF biomarkers better than mobile phone use",
        description: "In a cohort study with personal EMF dosimetry, residential electricity consumption (kWh/month) will predict chronic EMF biomarkers (melatonin suppression, sperm quality, HRV) more strongly than mobile phone usage hours. The mechanism: electricity measures the ELF priming state, which amplifies ALL subsequent exposures. Mobile phone measures only one RF source. This explains the cross-sectional finding (full-model RMSE 0.522 vs 1.053).",
        timeline: "Testable within 1–2 years (cohort study with dosimetry)",
        falsification: "Mobile phone usage is a stronger predictor of biomarkers than electricity consumption",
      },
      {
        id: "MULTI-1",
        title: "Multi-frequency exposure produces superadditive CaMKII activation",
        description: "Expose cells to: (1) 50 Hz alone, (2) 2.4 GHz alone, (3) 50 kHz IF alone, (4) all three simultaneously. Measure CaMKII autophosphorylation. Prediction: combined exposure produces CaMKII activation greater than the sum of individual exposures, because different frequencies activate different VGCC subtypes but CaMKII integrates total Ca²⁺ regardless of source.",
        timeline: "Testable within 3–6 months (in vitro, standard Western blot)",
        falsification: "Combined exposure produces additive or sub-additive CaMKII activation",
      },
      {
        id: "MULTI-2",
        title: "Recovery window elimination accelerates cumulative damage",
        description: "Expose matched cell groups to identical total EMF dose: (A) continuous multi-band (simulating modern home: 50 Hz + WiFi + LED), (B) same dose but with 8-hour nightly gap (Faraday-shielded sleep period). Prediction: group B shows significantly less cumulative CaMKII activation and less oxidative damage after 30 days, because the recovery window allows Ca²⁺ homeostasis restoration. This tests whether the 24/7 nature of modern exposure — not just the dose — drives the cumulative effect.",
        timeline: "Testable within 2–4 months (in vitro, longitudinal)",
        falsification: "No difference between continuous and gapped exposure at equal total dose",
      },
      {
        id: "MULTI-5",
        title: "WiFi beacon 10 Hz pulse produces ELF-like biological effects independent of carrier",
        description: "WiFi routers emit a 10 Hz beacon pulse even when no data is transmitted (Schmid 2012). The beacon's crest factor is 100:1 — peak power is 100× higher than average (Schmid 2020). Prediction: an isolated 10 Hz pulsed signal at WiFi beacon intensity produces ELF-type biological effects (melatonin suppression, EEG alpha changes) comparable to a continuous 10 Hz sinusoidal field, despite SAR being negligible. This tests whether SAR systematically underestimates WiFi exposure by measuring average instead of peak.",
        timeline: "Testable within 3–6 months (EEG/melatonin study)",
        falsification: "WiFi beacon pulse produces no ELF-type biological effects, or effects scale with SAR not peak",
      },
      {
        id: "TECH-LED",
        title: "EU LED transition countries show steeper sperm decline than late-adopting countries",
        description: "The EU [[ref:eu_regulation_244_2009|Directive 244/2009]] forced incandescent ban between 2009–2012, mandatory LED adoption. Prediction: EU countries show a statistically significant acceleration in sperm quality decline starting 2012–2015 compared to countries that adopted LED lighting later (e.g. some Asian, African countries). This tests whether the IF channel (20–300 kHz LED driver frequencies) contributes independently to reproductive decline beyond the RF channel.",
        timeline: "Testable immediately (existing meta-analysis data)",
        falsification: "No acceleration difference between early and late LED-adopting countries",
      },
      {
        id: "TECH-EV",
        title: "EV drivers show higher IF-band biomarkers than ICE vehicle drivers",
        description: "Electric vehicle inverters produce 5–50 kHz IF fields in the cabin. Compare IF-relevant biomarkers (testicular function, HRV during driving) between matched EV and internal combustion engine (ICE) vehicle drivers with equivalent daily commute times. The Israeli patent US12379429 (active field cancellation for EV cabins) demonstrates that industry recognizes in-cabin fields as problematic. Prediction: EV drivers show measurably higher oxidative stress markers and lower HRV during driving compared to ICE drivers.",
        timeline: "Testable within 1–2 years (cohort study with dosimetry)",
        falsification: "No difference in any biomarker between EV and ICE drivers, or ICE drivers show worse markers",
      },
    ],
    layerPredictions: [
      {
        id: "LAYER-1",
        title: "Countries adopting LED later show later health acceleration",
        description: "EU LED mandate 2009–2012 forced IF channel opening. Countries that resisted or delayed LED adoption should show later IF-specific health effects (metabolic, sleep). Testable with country-level LED market share timelines vs health data acceleration points.",
        falsification: "No temporal correlation between LED adoption timing and health trend inflection points",
      },
      {
        id: "LAYER-2",
        title: "Content restrictions do NOT reduce teen mental health crisis",
        description: "If 2012 inflection is DEVICE (EMF) not CONTENT (social media), then banning social media for teens while allowing smartphone use will not reduce depression/anxiety rates. Australia's social media ban (2024) is the direct test. Norway's age verification is a secondary test.",
        falsification: "Australian social media ban produces >20% reduction in teen depression within 3 years",
        critical: true,
      },
      {
        id: "LAYER-3",
        title: "Developing country epidemics follow electrification timeline, not GDP",
        description: "For 20+ developing countries: T2D/obesity onset year correlates more strongly with electrification date (year electricity access exceeded 50%) than with GDP crossing any threshold. China T2D: 1.3% (1980) → 8.7% (2014) parallels electrification 60%→100%, not GDP per se.",
        falsification: "GDP crossing correlates more strongly than electrification date across 20+ countries",
      },
      {
        id: "LAYER-4",
        title: "EV professional drivers show IF-specific health effects by 2035",
        description: "Taxi/delivery drivers using EVs 8+ hours/day accumulate IF exposure (inverter 5–50 kHz in cabin). Predicted effects: metabolic, reproductive, cardiac — at higher rates than ICE vehicle drivers matched for sedentary time. Israeli patent US12379429 demonstrates industry awareness.",
        falsification: "No difference between EV and ICE professional drivers after 10 years on any metabolic or reproductive metric",
      },
      {
        id: "LAYER-5",
        title: "Starlink coverage eliminates last EMF-free control populations by 2035",
        description: "Tsimane, Hadza, and comparable populations will begin showing RF background exposure from LEO satellite constellations. Their health metrics will begin converging toward industrialized patterns within 10–15 years of exposure onset. IRREVERSIBLE loss of verification capacity.",
        falsification: "Starlink-covered indigenous populations show no health metric changes within 15 years",
      },
      {
        id: "LAYER-6",
        title: "The next major epidemic is IF-specific",
        description: "LED drivers + EV inverters + induction cookers + wireless charging all operate at 20–300 kHz. This is the fastest-growing and least-regulated EMF band. IF-specific health effects (distinct from ELF or RF) will emerge as a recognized category by 2035. TTFields (FDA-approved, 200 kHz) already demonstrates IF bioactivity.",
        falsification: "No IF-specific health effects identified despite increasing IF exposure by 2035",
      },
      {
        id: "LAYER-7",
        title: "COVID lockdown T2D acceleration correlates with EMF-at-home intensity",
        description: "Workers who were remote (high home EMF: WiFi+LED 24h/day, multiple devices, no commute recovery) show greater T2D acceleration than workers who continued commuting (mixed EMF environments with outdoor recovery time). Recovery_deficit is the distinguishing variable, not just sedentary time.",
        falsification: "Remote workers show same or lower T2D acceleration than commuters after controlling for physical activity",
      },
    ],
    investigationPredictions: [
      { id: "SEASON-1", title: "SAD correlates with latitude × EMF, not latitude alone", description: "SAD/depression prevalence should correlate with latitude × EMF density interaction, not with latitude as a standalone predictor. High-latitude, low-EMF communities (Amish in northern US, rural Scandinavia pre-electrification) should show lower SAD than predicted by latitude alone.", falsification: "Latitude alone predicts SAD as well as latitude × EMF interaction term" },
      { id: "SEASON-2", title: "EMF-free bedroom benefit is larger in winter", description: "The health benefit of sleeping in an EMF-free environment (Faraday cage, airplane mode, no WiFi) should be measurably LARGER in winter months at high latitudes, because CRY magnetoreceptor sensitivity is higher when ambient light is reduced.", falsification: "No seasonal variation in EMF-free sleep benefit, or benefit is larger in summer" },
      { id: "GEN-1", title: "CACNA1C A-allele frequency predicts population EMF sensitivity", description: "Populations with higher CACNA1C rs1006737 A-allele frequency show steeper health decline per unit EMF exposure. This predicts population-level variation in EMF sensitivity that is genetic, not cultural.", falsification: "No correlation between A-allele frequency and rate of EMF-associated health changes across populations" },
      { id: "GEN-2", title: "A/A genotype shows stronger EMF response than G/G", description: "In controlled EMF exposure studies, individuals with CACNA1C rs1006737 A/A genotype show larger physiological responses (sleep EEG, HRV, calcium markers) than G/G genotype individuals. Already supported by [[ref:sousouri2025|Sousouri 2025]] (ETH) for 5G sleep response.", falsification: "No genotype-dependent difference in EMF response in multiple independent controlled studies" },
      { id: "WATER-1", title: "Island and coastal populations show higher EMF sensitivity", description: "Water's dielectric constant (~80 vs air ~1) amplifies electric field conduction. Island nations and coastal populations may show higher EMF-associated health effects per unit exposure than inland populations. Japan (island, highest ASD globally) is consistent but not proof.", falsification: "No coastal/inland difference in EMF-associated health metrics after controlling for other variables" },
      { id: "BUILD-1", title: "Wood buildings produce better health outcomes than concrete", description: "Reinforced concrete reflects RF internally, increasing indoor field strength. Wood is RF-transparent. Occupants of wood buildings should show better sleep, lower stress markers, and better cardiovascular metrics than concrete building occupants, beyond what biofiilia theory predicts.", falsification: "No difference after controlling for socioeconomic factors, or concrete outperforms wood" },
      { id: "RECOV-1", title: "EMF-free bedroom increases melatonin within 2 weeks", description: "Removing all EMF sources from the bedroom (WiFi router, phone, LED lights) and sleeping in an EMF-reduced environment should produce measurable melatonin increases within 2 weeks, even without any other lifestyle change.", falsification: "No melatonin change after 4 weeks of EMF-free sleep environment" },
      { id: "RECOV-2", title: "Minimum recovery window: 4–6 hours EMF-free", description: "CaMKII dephosphorylation kinetics predict a minimum EMF-free period of 4–6 hours for meaningful Ca²⁺ homeostasis restoration. Less than 4 hours provides negligible recovery; more than 6 hours shows diminishing returns.", falsification: "No dose-response relationship between EMF-free hours and recovery markers" },
      { id: "PRENATAL-1", title: "First trimester EMF exposure correlates with ASD risk", description: "CACNA1C is critical for synaptogenesis. Prenatal Ca²⁺ disruption during developmental windows → timing errors → ASD/ADHD phenotype. Kaiser Permanente (Li et al. 2017) already showed prenatal EMF → ASD risk. First trimester should show strongest effect.", falsification: "No trimester-specific difference in EMF-ASD association" },
      { id: "MULTI-SEAS", title: "Winter × high EMF produces worst health outcomes", description: "The interaction of winter (high CRY sensitivity) and high EMF exposure should produce the worst health outcomes — worse than either factor alone. Nordic countries in winter should show peak EMF sensitivity.", falsification: "No interaction effect between season and EMF level on health outcomes" },
    ],
    sentinelPredPredictions: [
      { id: "SENT-1", title: "EMF × pesticide interaction is superadditive", description: "Combined EMF + pesticide exposure produces more severe effects than either alone. The interaction is superadditive because pesticides stress cells → Ca²⁺ dysregulation → EMF sensitivity increases. [[ref:lupi2021|Lupi 2021]] already demonstrated this in bee biochemical and behavioral markers.", falsification: "Combined effects are merely additive or sub-additive in multiple species" },
      { id: "SENT-2", title: "Bumblebee decline correlates with WiFi density", description: "Bumblebee population decline should correlate with local WiFi access point density, independent of pesticide use and habitat loss. [[ref:bumble_rf2025|New 2025 study]] already showed RF reduces bumblebee flower visitation.", falsification: "No correlation between WiFi density and bumblebee populations after controlling for pesticides" },
      { id: "SENT-3", title: "LED streetlights cause more insect decline than sodium (IF component)", description: "[[ref:boyes2021|Boyes 2021]] found LED streetlights reduced insect abundance by 52% vs sodium's 41%. The 11% difference is not explained by light spectrum alone — LED's IF emission (from SMPS drivers, 20–300 kHz) adds an EMF exposure channel that sodium lacks.", falsification: "Faraday-shielded LED shows same insect decline as unshielded LED (ruling out IF component)" },
      { id: "SENT-4", title: "Migratory birds decline faster than resident species", description: "Migratory birds depend on CRY-based magnetoreception for navigation. RF disrupts CRY. Therefore migratory species should show steeper population decline than resident species in the same habitat, independent of habitat loss.", falsification: "Resident species decline as fast or faster than migratory species in shared habitats" },
      { id: "SENT-5", title: "Faraday-shielded beehives produce more honey", description: "Bee colonies in Faraday-shielded hives (blocking ambient RF/ELF) should produce measurably more honey, show lower colony loss rates, and demonstrate better navigation (fewer lost foragers) than unshielded hives in the same location.", falsification: "No difference in honey production or colony survival between shielded and unshielded hives" },
      { id: "SENT-6", title: "Frog populations survive near EMF-free areas", description: "Frog populations should persist in areas with minimal power grid infrastructure and low RF background, while declining in electrified areas — even controlling for habitat quality, water contamination, and UV exposure. Frogs' moist skin provides direct environmental Ca²⁺ coupling.", falsification: "Frog decline is equally severe in low-EMF and high-EMF areas after controlling for habitat" },
    ],
    supplementPredictions: [
      { id: "SHIFT-1", title: "Faraday bedroom improves shift worker outcomes", description: "Shift workers who sleep in a Faraday-shielded bedroom (EMF-free) show better melatonin recovery and less metabolic syndrome than shift workers sleeping in conventional bedrooms — with the same total sleep time. The difference isolates the EMF component from the sleep deprivation component.", falsification: "No difference in metabolic or hormonal outcomes between shielded and unshielded bedrooms for shift workers" },
      { id: "SHIFT-2", title: "Shift work health effects worse in winter", description: "Shift work health effects (metabolic syndrome, depression, cardiovascular risk) should be measurably worse during winter months at high latitudes, because CRY magnetoreceptor sensitivity is higher when ambient light is reduced — amplifying EMF disruption during the critical night shift period.", falsification: "No seasonal variation in shift work health outcomes, or effects are worse in summer" },
      { id: "SHIFT-3", title: "Shift work MetS OR exceeds sleep deprivation OR", description: "The metabolic syndrome odds ratio for shift workers (OR 2.17) exceeds what pure sleep deprivation alone would predict. The excess risk is attributable to the EMF component: LED IF exposure during melatonin peak hours and eliminated recovery window.", falsification: "Sleep deprivation alone fully accounts for shift work MetS risk with no residual" },
      { id: "INDOOR-1", title: "Indoor workers have higher MetS than outdoor workers after activity matching", description: "Indoor workers (office, data center) show higher metabolic syndrome prevalence than outdoor workers (farmers, fishermen) even after matching for physical activity level. The difference is attributable to cumulative EMF exposure differential.", falsification: "No MetS difference between physically active indoor and outdoor workers" },
      { id: "INDOOR-2", title: "Indoor workers have lower melatonin than outdoor workers after light matching", description: "Indoor workers show lower nighttime melatonin levels than outdoor workers even after controlling for light exposure patterns. The residual difference reflects EMF exposure from office WiFi, LED lighting IF, and device proximity.", falsification: "No melatonin difference after controlling for light exposure" },
      { id: "POCKET-1", title: "Breast pocket users have better sperm quality than hip pocket users", description: "Men who carry their phone in a breast pocket show better sperm quality than men who carry it in a hip/front pocket — despite the same total usage time. The difference is explained by testes being in the near-field only for hip pocket users.", falsification: "No difference in sperm quality by pocket position with matched usage time" },
      { id: "POCKET-2", title: "Sperm decline acceleration correlates with data usage, not voice calls", description: "The doubling of sperm decline rate (1.16%→2.64%/yr after 2000) correlates with 3G/4G data adoption (phone stays in pocket continuously) rather than 2G voice call adoption (phone held to ear during calls only). This is a behavioral exposure change, not a technology power change.", falsification: "Sperm decline rate correlates with voice call volume rather than data usage patterns" },
      { id: "FREQ-1", title: "50 Hz countries show slightly stronger CRY-dependent effects than 60 Hz countries", description: "50 Hz (Europe) is within 2 Hz of the 8th Schumann resonance harmonic (52.0 Hz), potentially producing stronger CRY interference. European populations may show slightly stronger CRY-dependent cascade effects (melatonin suppression, depression) than American populations at matched total EMF levels.", falsification: "No difference in CRY-dependent endpoints between 50 Hz and 60 Hz countries at matched EMF" },
      { id: "REPL-1", title: "Retrospective moderator analysis predicts positive vs. null EMF studies", description: "A retrospective analysis of 50–100 published EMF bio-assay studies, coding for study month, laboratory latitude, building material, and subject background, will show that these four moderators significantly predict whether a study found a positive or null result. This is testable WITHOUT new data.", falsification: "Moderator variables do not predict study outcomes in logistic regression (p > 0.05)" },
      { id: "REPL-2", title: "Future study controlling all 7 moderators replicates consistently regardless of laboratory", description: "Winter + CACNA1C-genotyped + low lab-ELF + EMF-free sleep + chronic + pulsed + real device = positive result in EVERY lab.", falsification: "Fully controlled study still fails to replicate" },
      { id: "REPL-3", title: "CACNA1C AA-genotype individuals show measurable melatonin suppression from residential WiFi in winter at 60°N", description: "Most specific single prediction combining 3 moderators: genotype + season + exposure.", falsification: "No melatonin difference between AA and GG in winter WiFi exposure" },
      { id: "REPL-4", title: "9-hour EMF-free sleep produces measurable DNA repair vs 0-hour (WiFi on, phone in bed)", description: "Ivancsits showed 9h recovery. Subjects sleeping EMF-free show lower comet tail factor than subjects sleeping with WiFi.", falsification: "No difference in DNA damage markers between EMF-free and WiFi-exposed sleep" },
    ],
    geneticPredictions: [
      { id: "GENE-MTNR1B-1", title: "MTNR1B GG carriers show larger T2D risk increase per unit EMF than AA carriers", description: "rs10830963 G-allele → more MT2 receptors → β-cells hypersensitive to melatonin changes. EMF-induced melatonin suppression differentially affects GG carriers. The gene × EMF interaction is SUPERADDITIVE: EMF 'activates' the genetic risk that would be latent in a normal melatonin environment.", falsification: "No genotype × EMF interaction on T2D incidence in biobank analysis" },
      { id: "GENE-CRY1-1", title: "CRY1Δ11 carriers show worse sleep outcomes under residential EMF than non-carriers", description: "CRY1Δ11 (rs184039278, 0.6% frequency) lengthens the circadian period. EMF disrupts CRY → the effects are ADDITIVE: genetic lengthening + EMF disruption = longer sleep latency, shorter recovery window, and worse metabolic outcomes.", falsification: "No difference in sleep or metabolic outcomes between CRY1Δ11 carriers and non-carriers under matched EMF exposure" },
      { id: "GENE-COMT-1", title: "COMT Val/Val individuals show greater EMF-associated depression risk than Met/Met", description: "Val/Val = fast dopamine clearance = low DA baseline. EMF-induced dopamine synthesis reduction hits harder (smaller buffer). Met/Met has a higher baseline DA buffer → more resilient to EMF-induced DA reduction.", falsification: "No COMT genotype × EMF interaction on depression prevalence" },
      { id: "GENE-CACNA1D-1", title: "CACNA1D GoF carriers show higher tinnitus rates with Bluetooth earphone use", description: "Cav1.3 GoF → inner ear hypersensitivity. Bluetooth earphones activate Cav1.3 in hair cells → Ca²⁺ overload. GoF carriers reach damage threshold at lower exposure levels → tinnitus earlier.", falsification: "No association between CACNA1D genotype and tinnitus in Bluetooth users" },
      { id: "GENE-COMORBID-1", title: "Depression-T2D comorbidity is higher in CACNA1C AA + MTNR1B GG compound carriers", description: "Both conditions arise from the same melatonin suppression pathway acting in different organs (brain vs. pancreas). Compound carriers of CACNA1C rs1006737 AA (more Ca²⁺ influx → more melatonin suppression) and MTNR1B rs10830963 GG (β-cells hypersensitive to melatonin) should show the highest comorbidity rate.", falsification: "Depression-T2D comorbidity does not stratify by CACNA1C × MTNR1B genotype" },
      { id: "GENE-INTERACT-1", title: "CRY1Δ11 + MTNR1B GG compound carriers show specifically elevated morning fasting glucose", description: "CRY1Δ11 delays melatonin offset → morning melatonin still elevated. MTNR1B GG → β-cells hypersensitive to this elevated morning melatonin → insulin suppression specifically in the morning → fasting glucose elevated.", falsification: "No CRY1 × MTNR1B interaction on morning fasting glucose" },
      { id: "GENE-EHS-1", title: "EHS patients have higher CACNA GoF + lower SLC8A1/ATP2B function than matched controls", description: "EHS is a polygenic calcium threshold disorder: high influx (CACNA GoF) + slow extrusion (SLC8A1/ATP2B LoF) = Ca²⁺ accumulates → CaMKII threshold crossed at lower EMF. Genotyping EHS cohorts for these 15 genes will show enrichment of high-influx/slow-extrusion combinations.", falsification: "No calcium channel gene enrichment in EHS cohorts vs. matched controls" },
      { id: "GENE-PRS-1", title: "A 15-gene polygenic risk score predicts EMF sensitivity in controlled exposure studies", description: "Combining CACNA1C, CACNA1H, CACNA1D, CACNA1A, CACNA1B, CACNA2D1, CAMK2A, CAMK2B, SLC8A1, ATP2B1, ATP2B2, CRY1, CRY2, MTNR1B, and COMT into a single PRS should predict the magnitude of biological response to standardized EMF exposure.", falsification: "PRS does not correlate with measured EMF response in controlled exposure" },
      { id: "GXEMF-1", title: "Gene × EMF interactions are superadditive across populations", description: "Genetic risk (MTNR1B GG T2D risk ~1.5×) × EMF risk (~1.3×) produces observed risk ~2.5× (> 1.5 × 1.3 = 1.95×). EMF 'activates' genetic risks that would be latent in EMF-free environments. Testable via biobank stratification by residential EMF exposure.", falsification: "Gene × EMF interaction is purely multiplicative (no superadditivity)" },
      { id: "GXEMF-2", title: "Gabapentinoid users show reduced EMF sensitivity via α2δ-1 blockade", description: "Pregabalin/gabapentin bind α2δ-1 → block VGCC trafficking to synapses → lower synaptic VGCC density → reduced ELF priming effect. Gabapentinoid users should show attenuated biological responses to EMF exposure compared to matched non-users.", falsification: "No difference in EMF response between gabapentinoid users and non-users" },
      { id: "GXEMF-3", title: "CaMKII Thr286 autophosphorylation level in lymphocytes correlates with subjective EMF sensitivity", description: "CaMKII autophosphorylation at Thr286 is measurable in peripheral lymphocytes. Higher baseline autophosphorylation = closer to threshold = more sensitive to EMF. This could be the first OBJECTIVE biomarker for EHS.", falsification: "No correlation between lymphocyte CaMKII autophosphorylation and reported EMF sensitivity" },
      { id: "GENE-A2D-1", title: "α2δ-1 expression level predicts individual ELF priming magnitude", description: "CACNA2D1 encodes α2δ-1, the bottleneck for VGCC trafficking. Individuals with higher baseline α2δ-1 expression should show faster VGCC density increase under ELF exposure (faster priming).", falsification: "No correlation between α2δ-1 expression and VGCC density change under ELF" },
      { id: "GENE-A2D-2", title: "Pregabalin pre-treatment blocks ELF-induced VGCC upregulation in cell culture", description: "If α2δ-1 is the molecular mediator of ELF priming ([[ref:sun2016_elf_vgcc|PMC4757866]]), then pregabalin (which binds α2δ-1) should prevent the VGCC density increase observed after 8-10 days of 50/60 Hz exposure.", falsification: "Pregabalin does not prevent ELF-induced VGCC upregulation" },
      { id: "GENE-CAMK2-1", title: "CAMK2A GoF mutation phenotype matches BERM population-level prediction", description: "CAMK2A GoF mutations that increase Thr286 autophosphorylation produce epilepsy, intellectual disability, and autism ([[ref:kury2017_camk2|Küry 2017]]). BERM predicts EMF increases population-level autophosphorylation → same phenotypes at population level. Genetic validation of the mechanism.", falsification: "CAMK2A GoF phenotypes do not match EMF-predicted population health trends" },
      { id: "GENE-CAMK2-2", title: "Lymphocyte CaMKII autophosphorylation is higher in high-EMF urban residents than rural controls", description: "Urban residents (higher cumulative EMF) should show higher baseline CaMKII Thr286 autophosphorylation in peripheral lymphocytes than rural controls matched for age, diet, and activity.", falsification: "No urban-rural difference in lymphocyte CaMKII autophosphorylation" },
      { id: "GENE-NETWORK-1", title: "Multi-gene calcium channel polymorphism interaction predicts neurodevelopmental outcomes", description: "[[ref:korean2025_cacna|Korean 2025 study]] showed CACNA1A + CACNA1C + CACNA1H polymorphisms interact in pediatric DD/epilepsy. BERM predicts this extends to all 5 influx genes: compound carriers of multiple CACNA risk alleles show disproportionately higher neurodevelopmental risk.", falsification: "No multi-gene interaction effect beyond individual gene effects" },
    ],
  },
} as const;

const TFR_IDS = LOCKED_PREDICTIONS.filter(
  (p) => p.metric === "TFR" || p.metric === "feedback_TFR"
);
const BIO_IDS = LOCKED_PREDICTIONS.filter(
  (p) => p.metric !== "TFR" && p.metric !== "feedback_TFR" && !p.metric.startsWith("sentinel_cascade")
);
const SENTINEL_IDS = LOCKED_PREDICTIONS.filter(
  (p) => p.metric.startsWith("sentinel_cascade")
);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function PredictionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Target} title={d.title} subtitle={d.subtitle} />

      {/* Prediction Dashboard Summary */}
      <section className="mb-12 max-w-4xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {/* Total predictions */}
          <div className="rounded-xl border border-card-border bg-card-bg p-5 text-center">
            <svg viewBox="0 0 24 24" className="mx-auto mb-2 h-6 w-6 text-accent" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
            </svg>
            <p className="text-3xl font-bold text-accent">260</p>
            <p className="text-xs text-foreground-muted uppercase tracking-wider mt-1">
              {d.dashPredictions}
            </p>
          </div>
          {/* Categories */}
          <div className="rounded-xl border border-card-border bg-card-bg p-5 text-center">
            <svg viewBox="0 0 24 24" className="mx-auto mb-2 h-6 w-6 text-accent" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            <p className="text-3xl font-bold text-accent">33</p>
            <p className="text-xs text-foreground-muted uppercase tracking-wider mt-1">
              {d.dashCategories}
            </p>
          </div>
          {/* Verified */}
          <div className="rounded-xl border border-card-border bg-card-bg p-5 text-center">
            <svg viewBox="0 0 24 24" className="mx-auto mb-2 h-6 w-6" style={{ color: "#22c55e" }} fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <p className="text-3xl font-bold" style={{ color: "#22c55e" }}>4</p>
            <p className="text-xs text-foreground-muted uppercase tracking-wider mt-1">
              {d.dashVerified}
            </p>
          </div>
          {/* Awaiting test */}
          <div className="rounded-xl border border-card-border bg-card-bg p-5 text-center">
            <svg viewBox="0 0 24 24" className="mx-auto mb-2 h-6 w-6" style={{ color: "#f59e0b" }} fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            <p className="text-3xl font-bold" style={{ color: "#f59e0b" }}>256</p>
            <p className="text-xs text-foreground-muted uppercase tracking-wider mt-1">
              {d.dashAwaiting}
            </p>
          </div>
        </div>
        {/* Status bar */}
        <div className="rounded-xl border border-card-border bg-card-bg p-4">
          <p className="text-xs text-foreground-muted uppercase tracking-wider mb-2">
            {d.dashPredictionStatus}
          </p>
          <svg viewBox="0 0 600 28" className="w-full" role="img" aria-label={d.statusBarAria}>
            {/* Green: verified — 4/260 = 1.54% ≈ 9.2px of 600 */}
            <rect x="0" y="0" width="9.2" height="20" rx="4" fill="#22c55e" />
            {/* Amber: pending — 254/260 = 97.7% ≈ 586.2px */}
            <rect x="11.2" y="0" width="580.2" height="20" rx="4" fill="#f59e0b" opacity="0.7" />
            {/* Red: CI exceeded — 2/260 = 0.77% ≈ 4.6px */}
            <rect x="593.4" y="0" width="6.6" height="20" rx="4" fill="#ef4444" />
          </svg>
          <div className="flex flex-wrap gap-4 mt-2 text-xs text-foreground-muted">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "#22c55e" }} />
              {d.statusVerified} (4)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "#f59e0b", opacity: 0.7 }} />
              {d.statusAwaiting} (254)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "#ef4444" }} />
              {d.statusCiExceeded} (2)
            </span>
          </div>
        </div>
      </section>

      {/* Architecture note */}
      <section className="mb-12 max-w-4xl rounded-xl border border-card-border bg-card-bg p-6">
        <h2 className="text-xs uppercase tracking-[0.16em] text-accent font-semibold mb-2">{d.architectureNote}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed">{d.architectureText}</p>
      </section>

      {/* TFR predictions */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.tfrTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.tfrLead}</p>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {TFR_IDS.map((p) => (
            <PredictionTrack key={p.id} prediction={p} locale={locale} />
          ))}
        </div>
        <p className="mb-6 text-xs leading-relaxed text-foreground-muted max-w-4xl">
          {d.tfrExplanation}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-3 pr-4">{d.country}</th>
                <th className="py-3 pr-4">{d.year}</th>
                <th className="py-3 pr-4">{d.metric}</th>
                <th className="py-3 pr-4 text-right">{d.prediction}</th>
                <th className="py-3 pr-4 text-right">{d.sensitivity}</th>
                <th className="py-3 pr-4">{d.statusLabel}</th>
                <th className="py-3 pr-4 text-right">{d.version}</th>
                <th className="py-3 text-right">{d.locked}</th>
              </tr>
            </thead>
            <tbody>
              {TFR_IDS.map((p) => (
                <tr key={p.id} className="border-b border-card-border/50 hover:bg-card-bg/50 transition-colors">
                  <td className="py-3 pr-4 font-medium">{countryLabel(p, locale)}</td>
                  <td className="py-3 pr-4 font-mono-num text-foreground-muted">{p.year}</td>
                  <td className="py-3 pr-4 text-sm text-foreground-muted">{metricLabel(p, locale)}</td>
                  <td className="py-3 pr-4 text-right font-mono-num font-semibold text-accent">{p.central.toFixed(2)}</td>
                  <td className="py-3 pr-4 text-right font-mono-num text-foreground-muted">[{p.ciLow.toFixed(2)} – {p.ciHigh.toFixed(2)}]</td>
                  <td className="py-3 pr-4"><PredictionStatusBadge status={p.status} locale={locale} /></td>
                  <td className="py-3 pr-4 text-right font-mono-num text-xs text-foreground-muted">{p.modelVersion}</td>
                  <td className="py-3 text-right font-mono-num text-xs text-foreground-muted">{p.lockedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CI exceedance falsification analysis */}
        <div className="mt-8 space-y-4 max-w-4xl">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted">{d.ciExceededTitle}</h3>

          {/* Finland */}
          <article className="rounded-xl border-2 border-amber-400/60 bg-amber-50/80 dark:bg-amber-950/20 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <h4 className="font-semibold text-sm">
                {d.finland2030Label}
              </h4>
              <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 uppercase tracking-wider font-semibold">
                CI {d.ciExceededBadge}
              </span>
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.finlandFalsification}</p>
          </article>

          {/* South Korea */}
          <article className="rounded-xl border-2 border-amber-400/60 bg-amber-50/80 dark:bg-amber-950/20 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <h4 className="font-semibold text-sm">
                {d.southKorea2030Label}
              </h4>
              <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 uppercase tracking-wider font-semibold">
                CI {d.ciRiskZone}
              </span>
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.southKoreaFalsification}</p>
          </article>
        </div>
      </section>

      {/* Biomarker predictions */}
      {BIO_IDS.length > 0 && (
        <section className="mb-14 border-t editorial-rule pt-6">
          <h2 className="editorial-section-heading mb-3">{d.bioTitle}</h2>
          <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.bioLead}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                  <th className="py-3 pr-4">{d.country}</th>
                  <th className="py-3 pr-4">{d.year}</th>
                  <th className="py-3 pr-4">{d.metric}</th>
                  <th className="py-3 pr-4 text-right">{d.prediction}</th>
                  <th className="py-3 pr-4 text-right">{d.sensitivity}</th>
                  <th className="py-3 pr-4">{d.statusLabel}</th>
                  <th className="py-3 pr-4 text-right">{d.version}</th>
                  <th className="py-3 text-right">{d.locked}</th>
                </tr>
              </thead>
              <tbody>
                {BIO_IDS.map((p) => (
                  <tr key={p.id} className="border-b border-card-border/50 hover:bg-card-bg/50 transition-colors">
                    <td className="py-3 pr-4 font-medium">{countryLabel(p, locale)}</td>
                    <td className="py-3 pr-4 font-mono-num text-foreground-muted">{p.year}</td>
                    <td className="py-3 pr-4 text-sm text-foreground-muted">{metricLabel(p, locale)}</td>
                    <td className="py-3 pr-4 text-right font-mono-num font-semibold text-accent">{p.central}</td>
                    <td className="py-3 pr-4 text-right font-mono-num text-foreground-muted">[{p.ciLow} – {p.ciHigh}]</td>
                    <td className="py-3 pr-4"><PredictionStatusBadge status={p.status} locale={locale} /></td>
                    <td className="py-3 pr-4 text-right font-mono-num text-xs text-foreground-muted">{p.modelVersion}</td>
                    <td className="py-3 text-right font-mono-num text-xs text-foreground-muted">{p.lockedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="mb-14 border-t editorial-rule pt-6">
        <FeedbackLoop locale={locale} />
      </section>

      {/* Sentinel cascade predictions */}
      {SENTINEL_IDS.length > 0 && (
        <section className="mb-14 border-t editorial-rule pt-6">
          <h2 className="editorial-section-heading mb-3">{d.sentinelTitle}</h2>
          <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.sentinelLead}</p>

          {/* Sentinel species sensitivity hierarchy */}
          <div className="mb-6 max-w-sm">
            <svg viewBox="0 0 360 295" className="w-full" role="img" aria-label={d.speciesAria}>
              {/* Sensitivity arrow */}
              <line x1="28" y1="265" x2="28" y2="22" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
              <polygon points="23 26, 28 14, 33 26" fill="currentColor" opacity="0.2" />
              <text x="28" y="284" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.4">{d.sensitivityLabel}</text>

              {/* Insects - most sensitive */}
              <circle cx="72" cy="28" r="5" fill="#ef4444" opacity="0.85" />
              <text x="100" y="28" dominantBaseline="central" fontSize="12" fill="currentColor">{d.insects}</text>

              {/* Small birds */}
              <circle cx="72" cy="72" r="8" fill="#f97316" opacity="0.85" />
              <text x="100" y="72" dominantBaseline="central" fontSize="12" fill="currentColor">{d.smallBirds}</text>

              {/* Amphibians */}
              <circle cx="72" cy="122" r="11" fill="#eab308" opacity="0.85" />
              <text x="100" y="122" dominantBaseline="central" fontSize="12" fill="currentColor">{d.amphibiansLabel}</text>

              {/* Small mammals */}
              <circle cx="72" cy="175" r="14" fill="#22c55e" opacity="0.85" />
              <text x="100" y="175" dominantBaseline="central" fontSize="12" fill="currentColor">{d.smallMammals}</text>

              {/* Large mammals */}
              <circle cx="72" cy="225" r="17" fill="#3b82f6" opacity="0.85" />
              <text x="100" y="225" dominantBaseline="central" fontSize="12" fill="currentColor">{d.largeMammals}</text>

              {/* Humans - least sensitive */}
              <circle cx="72" cy="265" r="20" fill="#6366f1" opacity="0.85" />
              <text x="100" y="265" dominantBaseline="central" fontSize="12" fill="currentColor">{d.humansLabel}</text>
            </svg>
          </div>

          <div className="grid gap-4 max-w-4xl">
            {SENTINEL_IDS.map((p) => (
              <article key={p.id} className="rounded-xl border border-card-border bg-card-bg p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{countryLabel(p, locale)} {p.year}</h3>
                      <PredictionStatusBadge status={p.status} locale={locale} />
                    </div>
                    <p className="mt-1 text-sm text-foreground-muted">{metricLabel(p, locale)}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono-num font-semibold text-accent">{p.central}</span>
                    <span className="ml-2 font-mono-num text-xs text-foreground-muted">[{p.ciLow} – {p.ciHigh}] {p.unit}</span>
                  </div>
                </div>
                {p.history?.[0]?.changeReason && (
                  <p className="text-xs text-foreground-muted leading-relaxed">{p.history[0].changeReason}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-foreground-muted">
                  <span className="font-mono-num">{d.version}: {p.modelVersion}</span>
                  <span className="font-mono-num">{d.locked}: {p.lockedDate}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Modulome predictions */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.modulomeTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.modulomeLead}</p>

        {/* Modulome prediction matrix */}
        <div className="mb-6 overflow-x-auto">
          <svg viewBox="0 0 420 165" className="w-full max-w-lg" role="img" aria-label={d.predMatrixAria}>
            {/* Column headers */}
            <text x="170" y="20" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.55">In vitro</text>
            <text x="230" y="20" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.55">{d.animalLabel}</text>
            <text x="290" y="20" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.55">{d.humanLabel}</text>
            <text x="360" y="20" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.55">{d.populationLabel}</text>
            {/* Separator */}
            <line x1="130" y1="30" x2="400" y2="30" stroke="currentColor" opacity="0.08" />
            {/* Row labels */}
            <text x="8" y="52" dominantBaseline="central" fontSize="11" fill="currentColor">{d.reproductiveLabel}</text>
            <text x="8" y="76" dominantBaseline="central" fontSize="11" fill="currentColor">{d.neuralLabel}</text>
            <text x="8" y="100" dominantBaseline="central" fontSize="11" fill="currentColor">{d.metabolicLabel}</text>
            <text x="8" y="124" dominantBaseline="central" fontSize="11" fill="currentColor">{d.immuneLabel}</text>
            <text x="8" y="148" dominantBaseline="central" fontSize="11" fill="currentColor">{d.circadianLabel}</text>
            {/* Dots - Row 1: Reproductive */}
            <circle cx="170" cy="52" r="5" fill="currentColor" opacity="0.55" />
            <circle cx="230" cy="52" r="5" fill="currentColor" opacity="0.55" />
            <circle cx="290" cy="52" r="5" fill="currentColor" opacity="0.55" />
            <circle cx="360" cy="52" r="5" fill="currentColor" opacity="0.55" />
            {/* Row 2: Neural */}
            <circle cx="170" cy="76" r="5" fill="currentColor" opacity="0.55" />
            <circle cx="230" cy="76" r="5" fill="currentColor" opacity="0.55" />
            <circle cx="290" cy="76" r="5" fill="currentColor" opacity="0.55" />
            <circle cx="360" cy="76" r="5" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.2" />
            {/* Row 3: Metabolic */}
            <circle cx="170" cy="100" r="5" fill="currentColor" opacity="0.55" />
            <circle cx="230" cy="100" r="5" fill="currentColor" opacity="0.55" />
            <circle cx="290" cy="100" r="5" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.2" />
            <circle cx="360" cy="100" r="5" fill="currentColor" opacity="0.55" />
            {/* Row 4: Immune */}
            <circle cx="170" cy="124" r="5" fill="currentColor" opacity="0.55" />
            <circle cx="230" cy="124" r="5" fill="currentColor" opacity="0.55" />
            <circle cx="290" cy="124" r="5" fill="currentColor" opacity="0.55" />
            <circle cx="360" cy="124" r="5" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.2" />
            {/* Row 5: Circadian */}
            <circle cx="170" cy="148" r="5" fill="currentColor" opacity="0.55" />
            <circle cx="230" cy="148" r="5" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.2" />
            <circle cx="290" cy="148" r="5" fill="currentColor" opacity="0.55" />
            <circle cx="360" cy="148" r="5" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.2" />
          </svg>
        </div>

        <div className="grid gap-4 max-w-4xl">
          {d.modulomePredictions.map((mp) => (
            <article key={mp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{mp.id}</span>
                    <h3 className="font-semibold">{mp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.modulomeStatus}
                    </span>
                  </div>
                </div>
              </div>
<p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={mp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.modulomeTimeline}:</span> <InlineReferenceText text={mp.timeline} locale={locale} /></p>
                <p><span className="font-semibold">{d.modulomeFalsification}:</span> {mp.falsification}</p>
                <p className="font-mono-num">{d.modulomeLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Cascade predictions P11-P40 */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.cascadeTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.cascadeLead}</p>

        {/* Cascade confirmation path */}
        <div className="mb-6 overflow-x-auto">
          <svg viewBox="0 0 520 92" className="w-full max-w-xl" role="img" aria-label={d.cascadePathAria}>
            <defs>
              <marker id="cascade-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="currentColor" opacity="0.35" />
              </marker>
            </defs>
            {/* NUT box */}
            <rect x="15" y="8" width="130" height="42" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
            <text x="80" y="24" textAnchor="middle" fontSize="14" fontWeight="600" fill="currentColor">NUT</text>
            <text x="80" y="40" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.45">{d.nutritionalShort}</text>
            {/* Arrow 1 */}
            <line x1="150" y1="29" x2="192" y2="29" stroke="currentColor" strokeWidth="1.5" opacity="0.3" markerEnd="url(#cascade-arr)" />
            {/* METAB box */}
            <rect x="195" y="8" width="130" height="42" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
            <text x="260" y="24" textAnchor="middle" fontSize="14" fontWeight="600" fill="currentColor">METAB</text>
            <text x="260" y="40" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.45">{d.metabolicShort}</text>
            {/* Arrow 2 */}
            <line x1="330" y1="29" x2="372" y2="29" stroke="currentColor" strokeWidth="1.5" opacity="0.3" markerEnd="url(#cascade-arr)" />
            {/* PHARM box */}
            <rect x="375" y="8" width="130" height="42" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
            <text x="440" y="24" textAnchor="middle" fontSize="14" fontWeight="600" fill="currentColor">PHARM</text>
            <text x="440" y="40" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.45">{d.pharmacologicalShort}</text>
            {/* Subtitle */}
            <text x="260" y="76" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.4">{d.cascadePathSubtitle}</text>
          </svg>
        </div>

        <div className="grid gap-4 max-w-4xl">
          {d.cascadePredictions.map((cp) => (
            <article key={cp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{cp.id}</span>
                    <h3 className="font-semibold">{cp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.cascadeStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={cp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.cascadeValidation}:</span> <InlineReferenceText text={cp.validation} locale={locale} /></p>
                <p><span className="font-semibold">{d.cascadeFalsification}:</span> {cp.falsification}</p>
                <p className="font-mono-num">{d.cascadeLocked}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm">
          <Link href={`/${locale}/evidence`} className="text-accent hover:underline">
            &rarr; {d.cascadeLink}
          </Link>
        </p>
      </section>

      {/* Cascade Path Diagram: NUT → METAB → PHARM evidence flow */}
      <section className="mb-8 max-w-4xl">
        <div className="rounded-xl border border-card-border bg-card-bg p-5 overflow-x-auto">
          <h3 className="text-xs uppercase tracking-[0.16em] text-accent font-semibold mb-3">
            {d.evidenceCascadePath}
          </h3>
          <p className="text-xs text-foreground-muted mb-4">
            {d.evidenceCascadeDesc}
          </p>
          <svg viewBox="0 0 600 90" className="w-full" role="img" aria-label={d.evidenceCascadeAria}>
            {/* Box 1: Nutritional */}
            <rect x="10" y="20" width="160" height="50" rx="8" fill="currentColor" opacity="0.08" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
            <text x="90" y="40" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600">
              {d.nutritionalFull}
            </text>
            <text x="90" y="55" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.5">
              NUT-1 .. NUT-3 (CRY/FAD)
            </text>
            {/* Arrow 1 */}
            <line x1="170" y1="45" x2="210" y2="45" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
            <polygon points="210,40 220,45 210,50" fill="currentColor" opacity="0.4" />
            {/* Box 2: Metabolic */}
            <rect x="220" y="20" width="160" height="50" rx="8" fill="currentColor" opacity="0.08" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
            <text x="300" y="40" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600">
              {d.metabolicFull}
            </text>
            <text x="300" y="55" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.5">
              METAB-1 .. METAB-4 (CaMKII)
            </text>
            {/* Arrow 2 */}
            <line x1="380" y1="45" x2="420" y2="45" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
            <polygon points="420,40 430,45 420,50" fill="currentColor" opacity="0.4" />
            {/* Box 3: Pharmacological */}
            <rect x="430" y="20" width="160" height="50" rx="8" fill="currentColor" opacity="0.08" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
            <text x="510" y="40" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600">
              {d.pharmacologicalFull}
            </text>
            <text x="510" y="55" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.5">
              PHARM-1 .. PHARM-5 (VGCC)
            </text>
            {/* Bottom annotation */}
            <text x="300" y="85" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.35" fontStyle="italic">
              {d.cascadeConfirmation}
            </text>
          </svg>
        </div>
      </section>

      {/* Nutritional CRY modulation predictions NUT-1 to NUT-3 */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.nutritionalTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.nutritionalLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.nutritionalPredictions.map((np) => (
            <article key={np.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{np.id}</span>
                    <h3 className="font-semibold">{np.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.nutritionalStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={np.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.nutritionalTimeline}:</span> <InlineReferenceText text={np.timeline} locale={locale} /></p>
                <p><span className="font-semibold">{d.nutritionalFalsification}:</span> {np.falsification}</p>
                <p className="font-mono-num">{d.nutritionalLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Metabolic syndrome predictions METAB-1 to METAB-4 */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.metabTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.metabLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.metabPredictions.map((mp: { id: string; title: string; description: string; timeline: string; falsification: string; critical?: boolean }) => (
            <article key={mp.id} className={`rounded-xl border bg-card-bg p-5 ${mp.critical ? "border-orange-500/50" : "border-card-border"}`}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{mp.id}</span>
                    <h3 className="font-semibold">{mp.title}</h3>
                    {mp.critical && (
                      <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-500 border border-orange-500/30">
                        CRITICAL
                      </span>
                    )}
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.metabStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={mp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.metabTimeline}:</span> <InlineReferenceText text={mp.timeline} locale={locale} /></p>
                <p><span className="font-semibold">{d.metabFalsification}:</span> {mp.falsification}</p>
                <p className="font-mono-num">{d.metabLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Pharmacological pathway separation predictions TRPC1-1 */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.trpc1Title}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl"><InlineReferenceText text={d.trpc1Lead} locale={locale} /></p>
        <div className="grid gap-4 max-w-4xl">
          {d.trpc1Predictions.map((tp) => (
            <article key={tp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{tp.id}</span>
                    <h3 className="font-semibold">{tp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.trpc1Status}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={tp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.trpc1Timeline}:</span> <InlineReferenceText text={tp.timeline} locale={locale} /></p>
                <p><span className="font-semibold">{d.trpc1Falsification}:</span> {tp.falsification}</p>
                <p className="font-mono-num">{d.trpc1Locked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Pharmacological predictions PHARM-1 through PHARM-5 */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.pharmTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.pharmLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.pharmPredictions.map((pp) => (
            <article key={pp.id} className={`rounded-xl border ${"critical" in pp && pp.critical ? "border-green-500/40 bg-green-500/[0.03]" : "border-card-border bg-card-bg"} p-5`}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{pp.id}</span>
                    <h3 className="font-semibold">{pp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.pharmStatus}
                    </span>
                    {"critical" in pp && pp.critical && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                        {d.criticalLabel}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={pp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.pharmTimeline}:</span> <InlineReferenceText text={pp.timeline} locale={locale} /></p>
                <p><span className="font-semibold">{d.pharmFalsification}:</span> {pp.falsification}</p>
                <p className="font-mono-num">{d.pharmLocked}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm">
          <Link href={`/${locale}/evidence/pharmacology`} className="text-accent hover:underline">
            {d.pharmEvidenceLink}
          </Link>
        </p>
      </section>

      {/* Modulome integration predictions MOD-1 through MOD-6 */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.modIntTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.modIntLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.modIntPredictions.map((mp) => (
            <article key={mp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{mp.id}</span>
                    <h3 className="font-semibold">{mp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.modIntStatus}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">{mp.type}</span>
                    {mp.discriminating && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                        {d.modIntDiscriminating}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={mp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.modIntTimeline}:</span> <InlineReferenceText text={mp.timeline} locale={locale} /></p>
                <p><span className="font-semibold">{d.modIntFalsification}:</span> {mp.falsification}</p>
                <p className="font-mono-num">{d.modIntLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SIDS predictions SIDS-1 through SIDS-6 */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.sidsTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-3 max-w-4xl">{d.sidsLead}</p>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 mb-6 max-w-4xl">
          <p className="text-sm text-foreground-muted leading-relaxed">{d.sidsNote}</p>
        </div>
        <div className="grid gap-4 max-w-4xl">
          {d.sidsPredictions.map((sp) => (
            <article key={sp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{sp.id}</span>
                    <h3 className="font-semibold">{sp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.sidsStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={sp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.sidsTimeline}:</span> <InlineReferenceText text={sp.timeline} locale={locale} /></p>
                <p><span className="font-semibold">{d.sidsFalsification}:</span> {sp.falsification}</p>
                <p className="font-mono-num">{d.sidsLocked}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm">
          <Link href={`/${locale}/evidence/infant-vulnerability`} className="text-accent hover:underline">
            {d.infantEvidenceLink}
          </Link>
        </p>
      </section>

      {/* SIDS resonance model predictions SIDS-RESONANCE-1 through SIDS-SPECTRUM-1 */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.sidsResTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-3 max-w-4xl">{d.sidsResLead}</p>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 mb-6 max-w-4xl">
          <p className="text-sm text-foreground-muted leading-relaxed">{d.sidsResNote}</p>
        </div>
        <div className="grid gap-4 max-w-4xl">
          {d.sidsResPredictions.map((srp) => (
            <article key={srp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{srp.id}</span>
                    <h3 className="font-semibold">{srp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.sidsResStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={srp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.sidsResTimeline}:</span> <InlineReferenceText text={srp.timeline} locale={locale} /></p>
                <p><span className="font-semibold">{d.sidsResFalsification}:</span> {srp.falsification}</p>
                <p className="font-mono-num">{d.sidsResLocked}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm">
          <Link href={`/${locale}/evidence/infant-vulnerability`} className="text-accent hover:underline">
            {d.infantEvidenceLink}
          </Link>
        </p>
      </section>

      {/* Neurological spectrum predictions NEURO-EMF-1 through NEURO-EMF-6 */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.neuroTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.neuroLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.neuroPredictions.map((np) => (
            <article key={np.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{np.id}</span>
                    <h3 className="font-semibold">{np.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.neuroStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={np.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.neuroTimeline}:</span> <InlineReferenceText text={np.timeline} locale={locale} /></p>
                <p><span className="font-semibold">{d.neuroFalsification}:</span> {np.falsification}</p>
                <p className="font-mono-num">{d.neuroLocked}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm">
          <Link href={`/${locale}/evidence/neurological-spectrum`} className="text-accent hover:underline">
            {d.neuroEvidenceLink}
          </Link>
        </p>
      </section>

      {/* Heavy metal synergy & convergence predictions METAL-EMF-1 through CHAIN-4 */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.metalTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.metalLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.metalPredictions.map((mp) => (
            <article key={mp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{mp.id}</span>
                    <h3 className="font-semibold">{mp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.metalStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={mp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.metalTimeline}:</span> <InlineReferenceText text={mp.timeline} locale={locale} /></p>
                <p><span className="font-semibold">{d.metalFalsification}:</span> {mp.falsification}</p>
                <p className="font-mono-num">{d.metalLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Mechanistic chain predictions BBB-EMF-1 through KLIM-1 */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.mechTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.mechLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.mechPredictions.map((mp) => (
            <article key={mp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{mp.id}</span>
                    <h3 className="font-semibold">{mp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.mechStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={mp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.mechTimeline}:</span> <InlineReferenceText text={mp.timeline} locale={locale} /></p>
                <p><span className="font-semibold">{d.mechFalsification}:</span> {mp.falsification}</p>
                <p className="font-mono-num">{d.mechLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Supplementary layer predictions E-NEW-1 through E-NEW-8 */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.suppTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.suppLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.suppPredictions.map((sp) => (
            <article key={sp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{sp.id}</span>
                    <h3 className="font-semibold">{sp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.suppStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={sp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.suppTimeline}:</span> <InlineReferenceText text={sp.timeline} locale={locale} /></p>
                <p><span className="font-semibold">{d.suppFalsification}:</span> {sp.falsification}</p>
                <p className="font-mono-num">{d.suppLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Final layer predictions E-NEW-9 through E-NEW-16 */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.finalTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.finalLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.finalPredictions.map((fp) => (
            <article key={fp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{fp.id}</span>
                    <h3 className="font-semibold">{fp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.finalStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={fp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.finalTimeline}:</span> <InlineReferenceText text={fp.timeline} locale={locale} /></p>
                <p><span className="font-semibold">{d.finalFalsification}:</span> {fp.falsification}</p>
                <p className="font-mono-num">{d.finalLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Extended layer predictions E-NEW-24 through E-NEW-31 */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.extTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.extLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.extPredictions.map((ep) => (
            <article key={ep.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{ep.id}</span>
                    <h3 className="font-semibold">{ep.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.extStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={ep.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.extTimeline}:</span> <InlineReferenceText text={ep.timeline} locale={locale} /></p>
                <p><span className="font-semibold">{d.extFalsification}:</span> {ep.falsification}</p>
                <p className="font-mono-num">{d.extLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Final integration predictions E-NEW-32 through E-NEW-39 */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.ultTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.ultLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.ultPredictions.map((up) => (
            <article key={up.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{up.id}</span>
                    <h3 className="font-semibold">{up.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.ultStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={up.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.ultTimeline}:</span> <InlineReferenceText text={up.timeline} locale={locale} /></p>
                <p><span className="font-semibold">{d.ultFalsification}:</span> {up.falsification}</p>
                <p className="font-mono-num">{d.ultLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* T-Type channel predictions TTYPE-1 through TTYPE-2 */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.ttypeTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.ttypeLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.ttypePredictions.map((ttp) => (
            <article key={ttp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{ttp.id}</span>
                    <h3 className="font-semibold">{ttp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.ttypeStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={ttp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.ttypeTimeline}:</span> <InlineReferenceText text={ttp.timeline} locale={locale} /></p>
                <p><span className="font-semibold">{d.ttypeFalsification}:</span> {ttp.falsification}</p>
                <p className="font-mono-num">{d.ttypeLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Replication crisis resolution predictions REP-1 through REP-4 */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.repTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.repLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.repPredictions.map((rp) => (
            <article key={rp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{rp.id}</span>
                    <h3 className="font-semibold">{rp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.repStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={rp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.repTimeline}:</span> <InlineReferenceText text={rp.timeline} locale={locale} /></p>
                <p><span className="font-semibold">{d.repFalsification}:</span> {rp.falsification}</p>
                <p className="font-mono-num">{d.repLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Neurodevelopment & differentiation predictions DIFF-1 through DIFF-7 */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.diffTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-3 max-w-4xl">{d.diffLead}</p>
        <p className="text-xs text-foreground-muted leading-relaxed mb-6 max-w-4xl italic">{d.diffNote}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.diffPredictions.map((dp) => (
            <article key={dp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{dp.id}</span>
                    <h3 className="font-semibold">{dp.title}</h3>
                    {dp.verified ? (
                      <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 uppercase tracking-wider font-semibold">
                        {d.diffVerifiedStatus}
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                        {d.diffStatus}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">{dp.level}</span>
                    {dp.critical && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-semibold">
                        {d.diffCritical}
                      </span>
                    )}
                    {dp.discriminating && !dp.critical && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                        {d.diffDiscriminating}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={dp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p className="font-mono-num">{d.diffLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* VGCC gene family predictions */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.vgccTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-3 max-w-4xl">{d.vgccLead}</p>
        <p className="text-xs text-foreground-muted leading-relaxed mb-6 max-w-4xl italic">{d.vgccNote}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.vgccPredictions.map((vp) => (
            <article key={vp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{vp.id}</span>
                    <h3 className="font-semibold">{vp.title}</h3>
                    {vp.verified ? (
                      <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 uppercase tracking-wider font-semibold">
                        {d.vgccVerifiedStatus}
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                        {d.vgccStatus}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">{vp.level}</span>
                    {vp.discriminating && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                        {d.vgccDiscriminating}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={vp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p className="font-mono-num">{d.vgccLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* T→TFR threshold predictions */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.tTfrTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-3 max-w-4xl">{d.tTfrLead}</p>
        <p className="text-xs text-foreground-muted leading-relaxed mb-6 max-w-4xl italic">{d.tTfrNote}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.tTfrPredictions.map((tp: { id: string; title: string; description: string; discriminating: boolean; critical: boolean; level: string; verified: boolean }) => (
            <article key={tp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{tp.id}</span>
                    <h3 className="font-semibold">{tp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.tTfrStatus}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">{tp.level}</span>
                    {tp.critical && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-semibold">
                        {d.tTfrCritical}
                      </span>
                    )}
                    {tp.discriminating && !tp.critical && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                        {d.tTfrDiscriminating}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={tp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p className="font-mono-num">{d.tTfrLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Causal structure predictions */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.causalTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-3 max-w-4xl">{d.causalLead}</p>
        <p className="text-xs text-foreground-muted leading-relaxed mb-6 max-w-4xl italic">{d.causalNote}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.causalPredictions.map((cp: { id: string; title: string; description: string; discriminating: boolean; critical: boolean; level: string; verified: boolean }) => (
            <article key={cp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{cp.id}</span>
                    <h3 className="font-semibold">{cp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.causalStatus}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">{cp.level}</span>
                    {cp.critical && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-semibold">
                        {d.tTfrCritical}
                      </span>
                    )}
                    {cp.discriminating && !cp.critical && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                        {d.tTfrDiscriminating}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={cp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p className="font-mono-num">{d.causalLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Population comparison predictions */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.popTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.popLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.popPredictions.map((pp) => (
            <article key={pp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{pp.id}</span>
                    <h3 className="font-semibold">{pp.title}</h3>
                    {pp.verified ? (
                      <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 uppercase tracking-wider font-semibold">
                        {d.popStatus}
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                        {d.popStatus}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">{pp.level}</span>
                    {pp.critical && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-semibold">
                        {d.popCritical}
                      </span>
                    )}
                    {pp.discriminating && !pp.critical && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                        {d.popDiscriminating}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={pp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p className="font-mono-num">{d.popLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Testosterone predictions */}
      {d.tPredPredictions && (
        <section className="mb-14 border-t editorial-rule pt-6">
          <h2 className="editorial-section-heading mb-3">{d.tPredTitle}</h2>
          <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.tPredLead}</p>
          <div className="grid gap-4 max-w-4xl">
            {d.tPredPredictions.map((tp: { id: string; title: string; description: string; falsification: string }) => (
              <article key={tp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="font-mono-num text-xs text-red-500">{tp.id}</span>
                  <h3 className="font-semibold">{tp.title}</h3>
                  <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                    {d.tPredStatus}
                  </span>
                </div>
                <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={tp.description} locale={locale} /></p>
                <p className="text-xs text-red-500/80 mb-3"><span className="font-semibold">Falsification:</span> {tp.falsification}</p>
                <div className="space-y-1 text-xs text-foreground-muted">
                  <p className="font-mono-num">{d.tPredLocked}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Societal predictions */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.societalTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.societalLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.societalPredictions.map((sp) => (
            <article key={sp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{sp.id}</span>
                    <h3 className="font-semibold">{sp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.societalStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={sp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.societalFalsification}:</span> {sp.falsification}</p>
                <p className="font-mono-num">{d.societalLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Technology-specific predictions */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.techTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.techLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.techPredictions.map((tp) => (
            <article key={tp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{tp.id}</span>
                    <h3 className="font-semibold">{tp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.techStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={tp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.techTimeline}:</span> <InlineReferenceText text={tp.timeline} locale={locale} /></p>
                <p><span className="font-semibold">{d.techFalsification}:</span> {tp.falsification}</p>
                <p className="font-mono-num">{d.techLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Layered exposure model predictions */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.layerTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.layerLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.layerPredictions.map((lp) => (
            <article key={lp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{lp.id}</span>
                    <h3 className="font-semibold">{lp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.layerStatus}
                    </span>
                    {"critical" in lp && lp.critical && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-semibold">
                        CRITICAL
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={lp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.layerFalsification}:</span> {lp.falsification}</p>
                <p className="font-mono-num">{d.layerLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Investigation line predictions */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.investigationTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.investigationLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.investigationPredictions.map((ip) => (
            <article key={ip.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{ip.id}</span>
                    <h3 className="font-semibold">{ip.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.investigationStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={ip.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.investigationFalsification}:</span> {ip.falsification}</p>
                <p className="font-mono-num">{d.investigationLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Sentinel species predictions */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.sentinelPredTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.sentinelPredLead}</p>

        {/* Sentinel Species Hierarchy Diagram */}
        <div className="mb-8 max-w-4xl rounded-xl border border-card-border bg-card-bg p-5 overflow-x-auto">
          <h3 className="text-xs uppercase tracking-[0.16em] text-accent font-semibold mb-3">
            {d.sentinelHierarchyTitle}
          </h3>
          <p className="text-xs text-foreground-muted mb-4">
            {d.sentinelHierarchyDesc}
          </p>
          <svg viewBox="0 0 600 260" className="w-full" role="img" aria-label={d.sentinelHierarchyAria}>
            {/* Title */}
            <text x="300" y="18" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600" opacity="0.6">
              {d.sensitivityTop}
            </text>
            {/* Scaling rule */}
            <text x="560" y="18" textAnchor="end" fill="currentColor" fontSize="9" opacity="0.4" fontFamily="monospace">
              M^(-0.25)
            </text>
            {/* Steps - descending staircase from most to least sensitive */}
            {/* Step 1: Insects (highest sensitivity) */}
            <rect x="40" y="30" width="100" height="32" rx="4" fill="currentColor" opacity="0.15" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
            <text x="90" y="50" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600">
              {d.insects}
            </text>
            <rect x="22" y="36" width="12" height="20" rx="2" fill="#ef4444" opacity="0.7" />
            {/* Connector line */}
            <line x1="140" y1="50" x2="155" y2="70" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="3,2" />
            {/* Step 2: Small birds */}
            <rect x="130" y="68" width="100" height="32" rx="4" fill="currentColor" opacity="0.12" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
            <text x="180" y="88" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600">
              {d.smallBirds}
            </text>
            <rect x="112" y="74" width="12" height="20" rx="2" fill="#f97316" opacity="0.7" />
            {/* Connector */}
            <line x1="230" y1="88" x2="245" y2="108" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="3,2" />
            {/* Step 3: Amphibians */}
            <rect x="220" y="106" width="110" height="32" rx="4" fill="currentColor" opacity="0.10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
            <text x="275" y="126" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600">
              {d.amphibiansLabel}
            </text>
            <rect x="202" y="112" width="12" height="20" rx="2" fill="#f59e0b" opacity="0.7" />
            {/* Connector */}
            <line x1="330" y1="126" x2="345" y2="146" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="3,2" />
            {/* Step 4: Small mammals */}
            <rect x="315" y="144" width="120" height="32" rx="4" fill="currentColor" opacity="0.08" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
            <text x="375" y="164" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600">
              {d.smallMammals}
            </text>
            <rect x="297" y="150" width="12" height="20" rx="2" fill="#eab308" opacity="0.6" />
            {/* Connector */}
            <line x1="435" y1="164" x2="445" y2="184" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="3,2" />
            {/* Step 5: Large mammals */}
            <rect x="405" y="182" width="120" height="32" rx="4" fill="currentColor" opacity="0.06" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
            <text x="465" y="202" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600">
              {d.largeMammals}
            </text>
            <rect x="387" y="188" width="12" height="20" rx="2" fill="#84cc16" opacity="0.6" />
            {/* Connector */}
            <line x1="490" y1="210" x2="498" y2="222" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="3,2" />
            {/* Step 6: Humans (lowest sensitivity) */}
            <rect x="460" y="220" width="100" height="32" rx="4" fill="currentColor" opacity="0.04" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" />
            <text x="510" y="240" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600">
              {d.humansLabel}
            </text>
            <rect x="442" y="226" width="12" height="20" rx="2" fill="#22c55e" opacity="0.5" />
            {/* Vertical axis label */}
            <text x="12" y="140" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.4" transform="rotate(-90, 12, 140)">
              {d.emfSensitivity}
            </text>
          </svg>
        </div>

        <div className="grid gap-4 max-w-4xl">
          {d.sentinelPredPredictions.map((sp) => (
            <article key={sp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{sp.id}</span>
                    <h3 className="font-semibold">{sp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.sentinelPredStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={sp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.sentinelPredFalsification}:</span> {sp.falsification}</p>
                <p className="font-mono-num">{d.sentinelPredLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Supplement predictions */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.supplementTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.supplementLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.supplementPredictions.map((sp) => (
            <article key={sp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{sp.id}</span>
                    <h3 className="font-semibold">{sp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.supplementStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={sp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.supplementFalsification}:</span> {sp.falsification}</p>
                <p className="font-mono-num">{d.supplementLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Genetic susceptibility predictions */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.geneticTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.geneticLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.geneticPredictions.map((gp) => (
            <article key={gp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{gp.id}</span>
                    <h3 className="font-semibold">{gp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.geneticStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3"><InlineReferenceText text={gp.description} locale={locale} /></p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.geneticFalsification}:</span> {gp.falsification}</p>
                <p className="font-mono-num">{d.geneticLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Ecosystem & Plant CRY predictions */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.plantCryTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.plantCryLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.plantCryPredictions.map((pc) => (
            <article key={pc.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{pc.id}</span>
                    <h3 className="font-semibold">{pc.metric}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.plantCryStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3">{pc.prediction}</p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p className="font-mono-num">{d.plantCryLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Historical / evolutionary predictions */}
      <section className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-3">{d.histTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6">{d.histLead}</p>
        <div className="space-y-4">
          {EVOLUTION_PREDICTIONS.map((pred) => {
            const color = CHAIN_EPISTEMIC_COLORS[pred.level as EpistemicLevel] ?? "#6B7280";
            return (
              <article key={pred.id} className="rounded-lg border border-card-border bg-card-bg p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-sm">
                    <span className="font-mono-num text-xs text-accent mr-2">{pred.code}</span>
                    {locale === "fi" ? pred.title_fi : locale === "ja" ? pred.title_ja : locale === "fr" ? pred.title_fr : locale === "ko" ? pred.title_ko : pred.title_en}
                  </h3>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-foreground-muted">{pred.timeframe}</span>
                    <span className="rounded-full px-2 py-0.5 text-xs font-semibold" style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}>
                      {pred.level}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {locale === "fi" ? pred.test_fi : locale === "ja" ? pred.test_ja : locale === "fr" ? pred.test_fr : locale === "ko" ? pred.test_ko : pred.test_en}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* v2 status */}
      <section className="mb-14 rounded-xl border border-status-partial/30 bg-status-partial/5 p-6 max-w-4xl">
        <p className="text-xs uppercase tracking-[0.16em] text-status-partial font-semibold mb-2">BERM v17</p>
        <h2 className="text-xl font-semibold mb-2">{d.v2Title}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.v2Status}</p>
        <p className="text-xs text-foreground-muted leading-relaxed italic">{d.v2Note}</p>
      </section>

      {/* R43 */}
      <section className="rounded-xl border border-card-border bg-card-bg p-6 max-w-4xl">
        <h2 className="text-xl font-semibold mb-3">{d.r43Title}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed"><InlineReferenceText text={d.r43Text} locale={locale} /></p>
      </section>

      <NextPageLink
        href={`/${locale}/references`}
        label={d.nextLabel}
        title={d.sourcesTitle}
        icon={BookOpen}
      />
    </div>
  );
}
