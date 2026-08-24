import type { Metadata } from "next";
import Link from "next/link";
import { Target, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { NextPageLink } from "@/components/NextPageLink";
import { LOCKED_PREDICTIONS, metricLabel, countryLabel } from "@/lib/predictions";
import { PredictionStatusBadge } from "@/components/PredictionStatusBadge";
import { PredictionTrack } from "@/components/PredictionTrack";
import { FeedbackLoop } from "@/components/FeedbackLoop";

const COPY = {
  en: {
    title: "Locked predictions",
    subtitle: "These predictions were locked under the BERM v18 scalar-exposure architecture. They are falsifiable: each will be compared against observed data at the stated year. BERM v19 does not yet publish its own predictions.",
    tfrTitle: "TFR predictions",
    tfrLead: "Country and global total-fertility-rate predictions with one-at-a-time parameter sensitivity envelopes (not confidence intervals).",
    bioTitle: "Biomarker predictions",
    bioLead: "Sperm concentration and sex-ratio predictions derived from the same model architecture.",
    v2Title: "BERM v19 forecast status",
    v2Status: "No country-level BERM v19 forecasts are published. The current route requires matched local FieldState, registered organ and couple endpoints, ASFR modelling and external temporal validation before a forecast can be locked.",
    v2Note: "When v19 predictions are ready, they will be published alongside these v18 predictions for comparison. Both versions will remain visible.",
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
    architectureText: "These predictions use the scalar cumulative-exposure architecture (v17/v18). Mobile penetration enters as a technology-adoption timing proxy. The sensitivity envelope varies one parameter at a time; it is not a probabilistic confidence interval.",
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
        id: "M-5",
        title: "LLLT improves spermatogenesis via CCO activation",
        description: "Low-level laser therapy (620–1100 nm) applied to testes in a controlled animal study will improve spermatogenesis markers (motility, concentration, morphology) via mitochondrial cytochrome c oxidase activation — the same chromophore mechanism as FDA-approved photobiomodulation devices. If LLLT (optical EM) improves fertility via CCO, and RF (lower EM) disrupts fertility via CRY, the chromophore generalization predicts that both optical and RF frequencies modulate reproductive biology through frequency-specific chromophore targets.",
        timeline: "Testable in 3–6 months (animal study)",
        falsification: "No improvement in any spermatogenesis marker, or improvement is thermal in nature",
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
    ],
    cascadeValidation: "Validation",
    cascadeFalsification: "Falsification criterion",
    cascadeLocked: "Locked: 2026-08-22",
    cascadeStatus: "LOCKED — awaiting test",
    cascadeLink: "See the cascade visualization",
  },
  fi: {
    title: "Lukitut ennusteet",
    subtitle: "Nämä ennusteet lukittiin BERM v18:n skalaarialtistusarkkitehtuurilla. Ne ovat falsifioitavissa: jokainen verrataan havaittuun dataan ilmoitettuna vuonna. BERM v19 ei vielä julkaise omia ennusteita.",
    tfrTitle: "TFR-ennusteet",
    tfrLead: "Maa- ja globaalitason kokonaishedelmällisyysluvun ennusteet yksi-kerrallaan-parametriherkkyysalueella (ei luottamusvälejä).",
    bioTitle: "Biomarkkeriennusteet",
    bioLead: "Siittiökonsentraatio- ja sukupuolisuhde-ennusteet samasta malliarkkitehtuurista.",
    v2Title: "BERM v19 -ennusteen tila",
    v2Status: "BERM v19 ei julkaise maakohtaisia ennusteita. Nykyinen reitti tarvitsee kohdistetun paikallisen FieldStaten, rekisteröidyt elin- ja paripäätepisteet, ASFR-mallinnuksen ja ulkoisen ajallisen validoinnin ennen ennusteen lukitsemista.",
    v2Note: "Kun v19-ennusteet ovat valmiita, ne julkaistaan rinnakkain näiden v18-ennusteiden kanssa vertailua varten. Molemmat versiot pysyvät näkyvissä.",
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
    architectureText: "Nämä ennusteet käyttävät skalaarin kumulatiivisen altistuksen arkkitehtuuria (v17/v18). Mobiilipenetraatio on teknologian käyttöönoton ajoitusproxy. Herkkyysalue varioi yhtä parametria kerrallaan; se ei ole probabilistinen luottamusväli.",
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
        id: "M-5",
        title: "LLLT parantaa spermatogeneesiä CCO-aktivaation kautta",
        description: "Matalan tason laserterapia (620–1100 nm) kiveksiin kontroloidussa eläinkokeessa parantaa spermatogeneesin merkkiaineita (liikkuvuus, konsentraatio, morfologia) mitokondriaalisen sytokromi c -oksidaasiaktivaation kautta — sama kromoforimekanismi kuin FDA-hyväksytyissä fotobiomodulaatiolaitteissa. Jos LLLT (optinen EM) parantaa hedelmällisyyttä CCO:n kautta ja RF (matalampi EM) heikentää hedelmällisyyttä CRY:n kautta, kromoforien yleistys ennustaa, että sekä optiset että RF-taajuudet moduloivat lisääntymisbiologiaa taajuusspesifisten kromofoorikohteiden kautta.",
        timeline: "Testattavissa 3–6 kuukaudessa (eläinkoe)",
        falsification: "Ei parannusta missään spermatogeneesin mittarissa, tai parannus on luonteeltaan terminen",
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
    ],
    cascadeValidation: "Validointi",
    cascadeFalsification: "Kumoamisehto",
    cascadeLocked: "Lukittu: 2026-08-22",
    cascadeStatus: "LUKITTU — odottaa testiä",
    cascadeLink: "Katso kaskadivisualisointi",
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

      {/* v2 status */}
      <section className="mb-14 rounded-xl border border-status-partial/30 bg-status-partial/5 p-6 max-w-4xl">
        <p className="text-xs uppercase tracking-[0.16em] text-status-partial font-semibold mb-2">BERM v19</p>
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
