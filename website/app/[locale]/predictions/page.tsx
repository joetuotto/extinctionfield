import type { Metadata } from "next";
import Link from "next/link";
import { Target, BookOpen, FlaskConical } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { NextPageLink } from "@/components/NextPageLink";
import { LOCKED_PREDICTIONS, metricLabel, countryLabel } from "@/lib/predictions";
import { PredictionStatusBadge } from "@/components/PredictionStatusBadge";
import { PredictionTrack } from "@/components/PredictionTrack";
import { FeedbackLoop } from "@/components/FeedbackLoop";
import { EVOLUTION_PREDICTIONS } from "@/lib/evolutionData";
import { CHAIN_EPISTEMIC_COLORS } from "@/lib/epistemicConstants";
import type { EpistemicLevel } from "@/lib/types";

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
    r43Text: "Zandieh et al. (2025) reports frequency-dependent mitochondrial/ROS observations in ELF cancer-cell experiments (0.01–5 Hz; up to 100 mT). This supports an exploratory measured-PSD protocol for testing whether network-layer envelope modulation produces a cellular response. It does not establish RF network-envelope effects, eDRX causality or a reproductive/TFR parameter.",
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
        description: "EU countries (mandatory LED transition 2009–2012 via Directive 244/2009) show faster TFR decline in 2015–2022 compared to countries with later or no incandescent ban, controlling for mobile density, GDP, and urbanization. Central estimate: TFR decline acceleration ≥0.02/year faster in EU vs non-EU controls.",
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
        description: "Expose male mice to chronic RF-EMF. Mate with unexposed females. Analyze F1 male offspring sperm for DNA methylation patterns. Prediction: specific DMRs overlap with those in human radar study (Research Square 2025). If DMRs include CACNA1C or other VGCC genes, this closes the epigenetic feedback loop.",
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
        validation: "Levine meta-analysis country-specific estimates + EU Directive 244/2009 implementation dates (2009–2016)",
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
        description: "Phone/tablet 'night mode' (warm color filter) removes blue light but not IF-EMF from the display backlight. Melatonin suppression measured with night mode ON will be significantly greater than in a no-screen control, because IF-EMF continues to suppress melatonin via CRY pathway independent of light spectrum. Mechanistic basis: Chae et al. (2019) demonstrated that human magnetoreception requires blue light (400–500 nm), identifying cryptochrome as the transducer. This implies two independent intervention points: (1) blue-light filtering removes CRY activation entirely (no radical pairs to disrupt), and (2) Faraday shielding removes RF disruption while preserving natural CRY function. BERM predicts Faraday shielding is more effective because it corrects the interference while leaving the natural system intact, whereas blue-light filtering removes the disruption by shutting down the entire CRY system.",
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
        description: "CACNA1C rs7304986 T/C carriers (who show greater EMF sleep sensitivity per Sousouri 2025) will have higher AD risk than T/T homozygotes in high-EMF environments but equivalent risk in low-EMF environments. This is the same gene × environment interaction as for EHS: genetically heightened VGCC sensitivity amplifies environmental Ca²⁺ dysregulation.",
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
        description: "CACNA1C rs7304986 T/C-carrying mothers' prenatal EMF exposure will produce higher ADHD risk in offspring than T/T carriers'. This is a gene × environment interaction: genetically heightened VGCC sensitivity amplifies the developmental ion channel calibration error from prenatal EMF. The same CACNA1C variant associates with ADHD, ASD, bipolar, and EMF sleep sensitivity (Sousouri 2025).",
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
        description: "Bipolar patients in higher-EMF environments should have more frequent mood cycles, because stronger ionic perturbation destabilizes the neural oscillator — amplitude increases and period shortens. Computational models (PubMed 32278494) show bipolar neurons oscillate between hyperexcitability and hypoexcitability due to ion conductance changes; EMF adds external perturbation to this unstable system.",
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
        description: "IVF laboratories with higher ambient EMF will have lower fertilization rates, blastocyst development, and clinical pregnancy rates. Melatonin in follicular fluid is a critical oocyte protectant (Tamura 2012); EMF suppresses endogenous melatonin (Battelle 1980, circadian pathway), reducing follicular antioxidant defense during the most vulnerable phase. Tong 2017 meta-analysis already shows melatonin supplementation improves IVF outcomes — the prediction is that EMF environment is a confound in existing IVF data.",
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
        description: "RCT: B2 supplementation (25mg/day x 8 weeks) vs placebo in subjects with poor sleep quality and high nighttime phone use. Primary endpoint: melatonin onset latency. Secondary: sleep efficiency, cortisol awakening response. B2 group should show less circadian disruption because FAD-replete CRY is more stable against EMF perturbation. Mechanistic basis: Hirano 2017 (FAD -> CRY stability), Yap 2025 (FAD -> magnetic sensitivity).",
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
        description: "Replicate Chae 2019 food orientation paradigm with graded fasting durations (4h, 8h, 12h, 16h, 24h). Prediction: inverted U-shaped dose-response — sensitivity peaks at 12-16h (optimal CRY turnover with adequate FAD) and declines at 24h+ (FAD pool depletion begins). Additional arm: B2-supplemented (25mg pre-fast) vs. unsupplemented subjects. B2 supplementation should right-shift the peak (allowing longer fasting before decline). The fasting paradox resolution (Lamia 2009 AMPK-CRY + beta-oxidation FAD) predicts this specific shape.",
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
        description: "Identical diet, identical genetics, identical temperature — only difference is EMF environment. Predicted: shielded animals weigh 5-15% less after 6 months. Based on Klimentidis paradox (24 populations, 8 species ALL gaining weight, p = 1.2×10⁻⁷) and BAT thermogenesis mechanism (Maalouf 2023, 5G BAT 2025). This is the single most discriminating test for the EMF-metabolic hypothesis.",
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
        description: "If EMF disrupts the L-type VGCC → Ca²⁺ → ERK pathway that GLP-1/semaglutide amplifies (Bhatt 2012, PMC3556522), then semaglutide should be MORE effective in high-EMF populations (more pathway disruption to correct) but show diminishing returns as EMF increases beyond a threshold (overwhelms correction capacity). This is a SPECULATIVE prediction — mechanistically derived but no clinical data yet. Evidence level: L*.",
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
    trpc1Lead: "Predictions testing the independence of pathway A (VGCC) and pathway C's TRPC1 calcium branch. The CRY2-TRPC1 complex (Yap et al. 2025) predicts that EMF reproductive effects can be pharmacologically decomposed into VGCC-dependent and TRPC1-dependent components.",
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
        description: "Nimodipine (BBB-penetrant dihydropyridine CCB) should attenuate EMF-associated cognitive effects, while amlodipine (non-BBB-penetrant) should not. This tests whether VGCC activation in CNS neurons contributes to cognitive endpoints independently of peripheral effects. If both CCBs attenuate cognitive effects equally, the mechanism is peripheral (vascular); if only nimodipine attenuates, the mechanism is central (neuronal VGCC).",
        timeline: "2-4 years (prospective cohort or RCT extension study)",
        falsification: "No difference between nimodipine and amlodipine on cognitive endpoints in high-EMF environments",
      },
      {
        id: "PHARM-5",
        title: "CoQ10 supplementation reduces EMF-associated oxidative damage in a dose-dependent manner",
        description: "Building on Bektas 2026 (3.5 GHz → testicular ROS; CoQ10 ameliorates): CoQ10 supplementation (100-400 mg/day) should reduce urinary 8-OHdG (oxidative DNA damage marker) in men with high smartphone usage (>4h/day, phone in pocket) in a dose-dependent manner. The dose-response relationship tests whether the antioxidant mechanism scales linearly (simple ROS scavenging) or saturates (enzyme-limited repair).",
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
        description: "Puberty onset age inversely correlates with childhood EMF/screen time exposure. VERIFIED: CPP increased 3× in girls, 2× in boys (Denmark 1998-2017). COVID screen time increase → CPP surge.",
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
        description: "Formal mediation analysis (Baron & Kenny or SEM) on longitudinal T data with concurrent BMI: indirect effect via BMI = 25–40% of total effect. Based on Mazur 2013 quantification (117/175 ng/dL = 67% direct). Falsification: mediation analysis shows <10% or >60% indirect effect via BMI.",
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
        description: "Santi 2025 found global LH decline. BERM predicts this is Route C/D mediated. Countries with higher EMF-proxy (residential electricity, broadband penetration) should show steeper LH decline. Testable with country-level LH data + EMF-proxy. Falsification: no correlation between EMF-proxy and LH decline rate.",
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
    r43Text: "Zandieh ym. (2025) raportoi taajuusriippuvaisia mitokondrio-/ROS-havaintoja ELF-syöpäsolukokeissa (0,01–5 Hz; enintään 100 mT). Se tukee eksploratiivista mitattua PSD-protokollaa sen testaamiseksi, tuottaako verkkokerroksen verhokäyrämodulaatio soluvasteen. Se ei osoita RF-verkon verhokäyrävaikutuksia, eDRX-kausaliteettia eikä lisääntymis-/TFR-parametria.",
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
        description: "EU-maat (pakollinen LED-siirtymä 2009–2012, direktiivi 244/2009) osoittavat nopeampaa TFR-laskua 2015–2022 verrattuna maihin joissa hehkulamppukielto tuli myöhemmin tai ei lainkaan, kontrolloiden matkapuhelintiheyttä, BKT:ta ja kaupungistumista. Keskiarvio: TFR-laskun kiihtyminen ≥0,02/vuosi nopeampi EU:ssa vs ei-EU-kontrollit.",
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
        description: "Matalan tason laserterapia (620–1100 nm) kiveksiin kontroloidussa eläinkokeessa parantaa spermatogeneesin merkkiaineita (liikkuvuus, konsentraatio, morfologia) mitokondriaalisen sytokromi c -oksidaasiaktivaation kautta — sama kromoforimekanismi kuin FDA-hyväksytyissä fotobiomodulaatiolaitteissa. Jos LLLT (optinen EM) parantaa hedelmällisyyttä CCO:n kautta ja RF (matalampi EM) heikentää hedelmällisyyttä CRY:n kautta, kromoforien yleistys ennustaa, että sekä optiset että RF-taajuudet moduloivat lisääntymisbiologiaa taajuusspesifisten kromofoorikohteiden kautta.",
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
        description: "Altista uroshhiiret krooniselle RF-EMF:lle. Parrita altistamattomien naaraiden kanssa. Analysoi F1-urospojukaisten siittiöiden DNA-metylaatiomallit. Ennuste: spesifiset DMR:t ovat päällekkäisiä ihmisten tutka-tutkimuksen kanssa (Research Square 2025). Jos DMR:t sisältävät CACNA1C:n tai muita VGCC-geenejä, tämä sulkee epigeneettisen takaisinkytkentäsilmukan.",
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
        validation: "Levine-meta-analyysin maakohtaiset estimaatit + EU:n direktiivin 244/2009 implementointiajankohdat (2009–2016)",
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
        description: "LED-sinivalolle attribuoitu verkkokalvovaurio johtuu osittain LED:n hakkuriteholähteen IF-EMF:stä (65 kHz – 2 MHz), ei pelkästä sinivalosta. Hehkulamppu joka on suodatettu identtiseen sinispektriin (ei IF-EMF:ää) tuottaa merkittävästi vähemmän verkkokalvon oksidatiivista stressiä kuin LED-sinivalo samalla intensiteetillä ja spektrillä.",
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
        description: "Puhelimen/tabletin 'yötila' (lämmin värisuodatin) poistaa sinivalon mutta EI IF-EMF:ää näytön taustavalosta. Melatoniinisuppressio yötilan ollessa PÄÄLLÄ on merkittävästi suurempi kuin ilman näyttöä, koska IF-EMF jatkaa melatoniinin suppressiota CRY-reitin kautta riippumatta valospektristä. Mekanistinen perusta: Chae ym. (2019) osoittivat, että ihmisen magnetoreseptio vaatii sinistä valoa (400–500 nm), mikä tunnistaa kryptokromin transduseriksi. Tämä tarkoittaa kahta riippumatonta interventiopistettä: (1) sinivalosuodatus poistaa CRY-aktivaation kokonaan (ei radikaaliparia häirittäväksi), ja (2) Faraday-suojaus poistaa RF-häiriön säilyttäen luonnollisen CRY-toiminnan. BERM ennustaa Faraday-suojauksen olevan tehokkaampi, koska se korjaa häiriön jättäen luonnollisen järjestelmän ehjäksi, kun taas sinivalosuodatus poistaa häiriön sammuttamalla koko CRY-järjestelmän.",
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
        description: "CACNA1C rs7304986 T/C-kantajilla (jotka osoittavat suurempaa EMF-uniherkkyyttä Sousouri 2025:n mukaan) on korkeampi AD-riski kuin T/T-homotsygooteilla korkean EMF:n ympäristöissä, mutta yhtäläinen riski matalan EMF:n ympäristöissä. Sama geeni × ympäristö -interaktio kuin EHS:ssä: geneettisesti kohonnut VGCC-herkkyys vahvistaa ympäristöllistä Ca²⁺-dysregulaatiota.",
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
        description: "CACNA1C rs7304986 T/C-kantajien äitien raskausaikainen EMF-altistus tuottaa korkeamman ADHD-riskin lapsille kuin T/T-kantajien. Geeni × ympäristö -interaktio: geneettisesti kohonnut VGCC-herkkyys vahvistaa raskausaikaisen EMF:n ionikanavien kalibraatiovirhettä. Sama CACNA1C-variantti assosioituu ADHD:hen, ASD:hen, bipolaarihäiriöön ja EMF-uniherkkyyteen (Sousouri 2025).",
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
        description: "Korkeammassa EMF-ympäristössä bipolaaripotilaiden mielialasyklien tulisi olla tiheämpiä, koska voimakkaampi ioninen perturbatio destabilisoi neuraalisen oskillaattorin — amplitudi kasvaa ja jaksonaika lyhenee. Laskennalliset mallit (PubMed 32278494) osoittavat bipolaaristen neuronien heilahtelevan hyper- ja hypoeksitaabelisuuden välillä ionikanavien konduktanssimuutosten vuoksi; EMF lisää ulkoisen perturbation tähän epästabiiliin järjestelmään.",
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
        description: "Korkeamman EMF-tason IVF-laboratorioissa on matalammat fertilisaatio-, blastokystti- ja kliiniset raskausasteet. Melatoniini follikkuli­nesteessä on kriittinen munasolun suojaaja (Tamura 2012); EMF suppressoi endogeenistä melatoniinia (Battelle 1980, sirkadiaaninen polku), vähentäen follikulaarista antioksidanttipuolustusta haavoittuvimmassa vaiheessa. Tongin 2017 meta-analyysi osoittaa jo melatoniinilisän parantavan IVF-tuloksia — ennuste on, että EMF-ympäristö on sekoittava tekijä nykyisessä IVF-datassa.",
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
        description: "RCT: B2-lisä (25 mg/vrk x 8 viikkoa) vs. plasebo koehenkilöillä joilla on huono unenlaatu ja runsas yöllinen puhelinkäyttö. Ensisijainen päätetapahtuma: melatoniinin alkamisviive. Toissijaiset: unitehokkuus, kortisolin herätysvaste. B2-ryhmän tulisi osoittaa vähemmän sirkadiaanista häiriötä koska FAD-kylläinen CRY on stabiilimpi EMF-perturbaatiota vastaan. Mekanistinen perusta: Hirano 2017 (FAD → CRY-stabiilisuus), Yap 2025 (FAD → magneettinen herkkyys).",
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
        description: "Toista Chae 2019:n ruokasuuntautumisparadigma asteitetuilla paaston kestoilla (4h, 8h, 12h, 16h, 24h). Ennuste: käänteinen U-muotoinen annosvaste — herkkyys huipentuu 12-16h kohdalla (optimaalinen CRY-vaihtuvuus riittävällä FAD:lla) ja laskee 24h+ (FAD-poolin ehtyminen alkaa). Lisähaara: B2-lisätty (25 mg ennen paastoa) vs. lisäämätön. B2-lisän tulisi siirtää huippua oikealle (sallien pidemmän paaston ennen laskua). Paastoparadoksin ratkaisu (Lamia 2009 AMPK-CRY + beta-oksidaatio-FAD) ennustaa tämän spesifisen muodon.",
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
        description: "Identtinen dieetti, identtinen genetiikka, identtinen lämpötila — ainoa ero on EMF-ympäristö. Ennuste: suojatut eläimet painavat 5-15 % vähemmän 6 kuukauden jälkeen. Perustuu Klimentidisin paradoksiin (24 populaatiota, 8 lajia KAIKKI lihovat, p = 1,2×10⁻⁷) ja BAT-termogeneesimekanismiin (Maalouf 2023, 5G BAT 2025). Tämä on yksittäisesti erottelevin koe EMF-metaboliahypoteesille.",
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
        description: "Jos EMF häiritsee L-tyypin VGCC → Ca²⁺ → ERK -reittiä jota GLP-1/semaglutidi vahvistaa (Bhatt 2012, PMC3556522), semaglutidin tulisi olla TEHOKKAAMPI korkean EMF:n populaatioissa (enemmän reittihaäiriötä korjattavaksi) mutta näyttää laskevia tuottoja EMF:n ylittäessä kynnyksen. Tämä on SPEKULATIIVINEN ennuste — mekanistisesti johdettu mutta kliinistä dataa ei vielä ole. Evidenssitaso: L*.",
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
    trpc1Lead: "Ennusteet jotka testaavat polku A:n (VGCC) ja polku C:n TRPC1-kalsiumhaaran riippumattomuutta. CRY2-TRPC1-kompleksi (Yap ym. 2025) ennustaa, että EMF:n reproduktiovaikutukset voidaan farmakologisesti jakaa VGCC-riippuvaisiin ja TRPC1-riippuvaisiin komponentteihin.",
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
        description: "Nimodipiinin (BBB:n läpäisevä dihydropyridiini-CCB) pitäisi vaimentaa EMF-assosioituja kognitiivisia vaikutuksia, kun amlodipiinin (ei-BBB-penetrantti) ei pitäisi. Tämä testaa osallistuuko VGCC-aktivaatio CNS-neuroneissa kognitiivisiin päätepisteisiin riippumatta perifeerisistä vaikutuksista.",
        timeline: "2–4 vuotta (prospektiivinen kohortti tai RCT-laajennustutkimus)",
        falsification: "Ei eroa nimodipiinin ja amlodipiinin välillä kognitiivisissa päätepisteissä korkean EMF:n ympäristöissä",
      },
      {
        id: "PHARM-5",
        title: "CoQ10-supplementaatio vähentää EMF-assosioitua oksidatiivista vauriota annosriippuvaisesti",
        description: "Perustuen Bektas 2026:een (3,5 GHz → kivesten ROS; CoQ10 lievittää): CoQ10-supplementaation (100–400 mg/pv) pitäisi vähentää virtsan 8-OHdG:tä (oksidatiivinen DNA-vauriomarkkeri) miehillä joilla on korkea älypuhelinkäyttö (>4h/pv, puhelin taskussa) annosriippuvaisesti.",
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
        description: "Puberteetin alkamisikä korreloi käänteisesti lapsuuden EMF-/ruutuaika-altistuksen kanssa. VAHVISTETTU: CPP kasvoi 3× tytöillä, 2× pojilla (Tanska 1998-2017). COVID-ruutuajan kasvu → CPP-piikki.",
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
        description: "EKG-seulontatutkimus EMF-dosimetrialla. Ennuste: krooninen EMF → Cav1.2-ikkunavirta ↑ → aktiopotetiaalin pidentyminen → mitattava QTc-nousu.",
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
    tTfrTitle: "Testosteroni → TFR -kynnösennusteet",
    tTfrLead: "Maakohtaiset ennusteet testosteronikynnösmallista. Jokainen on lukittu kumoamisehdolla. Malli on kalibroitu Suomen ja Korean datalla; USA:n ja Israelin ennusteet ovat ekstrapolointeja.",
    tTfrNote: "Nämä ennusteet testaavat ydinväitettä, jonka mukaan kumulatiivinen testosteronilasku (~1 %/vuosi, ikäriippumaton) luo biologisen hedelmällisyysrajoitteen, joka ilmenee ~35 vuotta alkamisen jälkeen.",
    tTfrLocked: "Lukittu: 2026-08-25",
    tTfrStatus: "LUKITTU — odottaa testiä",
    tTfrDiscriminating: "Erotteleva",
    tTfrCritical: "Kriittinen",
    tTfrPredictions: [
      {
        id: "T-TFR-1",
        title: "USA:n TFR laskee alle 1,30:n vuoteen 2035 mennessä",
        description: "Testosteronikynnösmalliin perustuen: USA:n kumulatiivinen T-menetys saavuttaa ~40 % noin 2030. Ennuste: TFR alkaa kiihtyvään laskuun 2028 jälkeen ja laskee alle 1,30:n vuoteen 2035 mennessä. Kumoaminen: USA:n TFR pysyy yli 1,40 vuonna 2035.",
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
        description: "Formaali mediaatioanalyysi (Baron & Kenny tai SEM) pitkittäis-T-datalla samanaikaisilla BMI-mittauksilla: epäsuora vaikutus BMI:n kautta = 25–40 % kokonaisvaikutuksesta. Perustuu Mazur 2013 kvantifiointiin (117/175 ng/dL = 67 % suora). Falsifikaatio: mediaatioanalyysi osoittaa <10 % tai >60 % epäsuora vaikutus BMI:n kautta.",
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
        description: "Santi 2025 löysi globaalin LH-laskun. BERM ennustaa tämän olevan reitti C/D -välitteistä. Maissa joissa korkeampi EMF-proxy (asuinrakennusten sähköistys, laajakaistapenetraatio) tulisi olla jyrkempi LH-lasku. Testattavissa maatason LH-datalla + EMF-proxylla. Falsifikaatio: ei korrelaatiota EMF-proxyn ja LH:n laskutahdin välillä.",
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
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function PredictionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Target} title={d.title} subtitle={d.subtitle} />

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
            <PredictionTrack key={p.id} prediction={p} locale={activeLocale} />
          ))}
        </div>
        <p className="mb-6 text-xs leading-relaxed text-foreground-muted max-w-4xl">
          {activeLocale === "fi"
            ? "Harmaa viiva on Maailmanpankin julkaistu TFR-sarja. Sininen alue on lukittu herkkyysalue, ei luottamusväli. Kun ennustevuoden havainto julkaistaan, se piirtyy timanttina: vihreä alueen sisällä, punainen sen ulkopuolella."
            : "The grey line is the World Bank published TFR series. The blue wedge is the locked sensitivity envelope, not a confidence interval. When the prediction year is observed, it appears as a diamond: green inside the envelope, red outside."}
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
                  <td className="py-3 pr-4 font-medium">{countryLabel(p, activeLocale)}</td>
                  <td className="py-3 pr-4 font-mono-num text-foreground-muted">{p.year}</td>
                  <td className="py-3 pr-4 text-sm text-foreground-muted">{metricLabel(p, activeLocale)}</td>
                  <td className="py-3 pr-4 text-right font-mono-num font-semibold text-accent">{p.central.toFixed(2)}</td>
                  <td className="py-3 pr-4 text-right font-mono-num text-foreground-muted">[{p.ciLow.toFixed(2)} – {p.ciHigh.toFixed(2)}]</td>
                  <td className="py-3 pr-4"><PredictionStatusBadge status={p.status} locale={activeLocale} /></td>
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
                {activeLocale === "fi" ? "Suomi 2030 — TFR" : "Finland 2030 — TFR"}
              </h4>
              <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 uppercase tracking-wider font-semibold">
                CI {activeLocale === "fi" ? "ylittynyt" : "exceeded"}
              </span>
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.finlandFalsification}</p>
          </article>

          {/* South Korea */}
          <article className="rounded-xl border-2 border-amber-400/60 bg-amber-50/80 dark:bg-amber-950/20 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <h4 className="font-semibold text-sm">
                {activeLocale === "fi" ? "Etelä-Korea 2030 — TFR" : "South Korea 2030 — TFR"}
              </h4>
              <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 uppercase tracking-wider font-semibold">
                CI {activeLocale === "fi" ? "riskialue" : "risk zone"}
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
                    <td className="py-3 pr-4 font-medium">{countryLabel(p, activeLocale)}</td>
                    <td className="py-3 pr-4 font-mono-num text-foreground-muted">{p.year}</td>
                    <td className="py-3 pr-4 text-sm text-foreground-muted">{metricLabel(p, activeLocale)}</td>
                    <td className="py-3 pr-4 text-right font-mono-num font-semibold text-accent">{p.central}</td>
                    <td className="py-3 pr-4 text-right font-mono-num text-foreground-muted">[{p.ciLow} – {p.ciHigh}]</td>
                    <td className="py-3 pr-4"><PredictionStatusBadge status={p.status} locale={activeLocale} /></td>
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
        <FeedbackLoop locale={activeLocale} />
      </section>

      {/* Sentinel cascade predictions */}
      {SENTINEL_IDS.length > 0 && (
        <section className="mb-14 border-t editorial-rule pt-6">
          <h2 className="editorial-section-heading mb-3">{d.sentinelTitle}</h2>
          <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.sentinelLead}</p>
          <div className="grid gap-4 max-w-4xl">
            {SENTINEL_IDS.map((p) => (
              <article key={p.id} className="rounded-xl border border-card-border bg-card-bg p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{countryLabel(p, activeLocale)} {p.year}</h3>
                      <PredictionStatusBadge status={p.status} locale={activeLocale} />
                    </div>
                    <p className="mt-1 text-sm text-foreground-muted">{metricLabel(p, activeLocale)}</p>
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
              <p className="text-sm text-foreground-muted leading-relaxed mb-3">{mp.description}</p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.modulomeTimeline}:</span> {mp.timeline}</p>
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
              <p className="text-sm text-foreground-muted leading-relaxed mb-3">{cp.description}</p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.cascadeValidation}:</span> {cp.validation}</p>
                <p><span className="font-semibold">{d.cascadeFalsification}:</span> {cp.falsification}</p>
                <p className="font-mono-num">{d.cascadeLocked}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm">
          <Link href={`/${activeLocale}/evidence`} className="text-accent hover:underline">
            &rarr; {d.cascadeLink}
          </Link>
        </p>
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
              <p className="text-sm text-foreground-muted leading-relaxed mb-3">{np.description}</p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.nutritionalTimeline}:</span> {np.timeline}</p>
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
              <p className="text-sm text-foreground-muted leading-relaxed mb-3">{mp.description}</p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.metabTimeline}:</span> {mp.timeline}</p>
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
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.trpc1Lead}</p>
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
              <p className="text-sm text-foreground-muted leading-relaxed mb-3">{tp.description}</p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.trpc1Timeline}:</span> {tp.timeline}</p>
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
            <article key={pp.id} className={`rounded-xl border ${pp.critical ? "border-green-500/40 bg-green-500/[0.03]" : "border-card-border bg-card-bg"} p-5`}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{pp.id}</span>
                    <h3 className="font-semibold">{pp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.pharmStatus}
                    </span>
                    {pp.critical && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                        {locale === "fi" ? "Kriittinen" : "Critical"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3">{pp.description}</p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.pharmTimeline}:</span> {pp.timeline}</p>
                <p><span className="font-semibold">{d.pharmFalsification}:</span> {pp.falsification}</p>
                <p className="font-mono-num">{d.pharmLocked}</p>
              </div>
            </article>
          ))}
        </div>
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
              <p className="text-sm text-foreground-muted leading-relaxed mb-3">{mp.description}</p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.modIntTimeline}:</span> {mp.timeline}</p>
                <p><span className="font-semibold">{d.modIntFalsification}:</span> {mp.falsification}</p>
                <p className="font-mono-num">{d.modIntLocked}</p>
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
              <p className="text-sm text-foreground-muted leading-relaxed mb-3">{ttp.description}</p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.ttypeTimeline}:</span> {ttp.timeline}</p>
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
              <p className="text-sm text-foreground-muted leading-relaxed mb-3">{rp.description}</p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.repTimeline}:</span> {rp.timeline}</p>
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
              <p className="text-sm text-foreground-muted leading-relaxed mb-3">{dp.description}</p>
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
              <p className="text-sm text-foreground-muted leading-relaxed mb-3">{vp.description}</p>
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
              <p className="text-sm text-foreground-muted leading-relaxed mb-3">{tp.description}</p>
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
              <p className="text-sm text-foreground-muted leading-relaxed mb-3">{cp.description}</p>
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
              <p className="text-sm text-foreground-muted leading-relaxed mb-3">{pp.description}</p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p className="font-mono-num">{d.popLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

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
              <p className="text-sm text-foreground-muted leading-relaxed mb-3">{sp.description}</p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.societalFalsification}:</span> {sp.falsification}</p>
                <p className="font-mono-num">{d.societalLocked}</p>
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
                    {activeLocale === "fi" ? pred.title_fi : pred.title_en}
                  </h3>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-foreground-muted">{pred.timeframe}</span>
                    <span className="rounded-full px-2 py-0.5 text-xs font-semibold" style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}>
                      {pred.level}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {activeLocale === "fi" ? pred.test_fi : pred.test_en}
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
        <p className="text-sm text-foreground-muted leading-relaxed">{d.r43Text}</p>
      </section>

      <NextPageLink
        href={`/${activeLocale}/references`}
        label={activeLocale === "fi" ? "Seuraavaksi" : "Next"}
        title={activeLocale === "fi" ? "Lähteet" : "Sources"}
        icon={BookOpen}
      />
    </div>
  );
}
