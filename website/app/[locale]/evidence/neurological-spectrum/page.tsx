import type { Metadata } from "next";
import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { pickCopy } from "@/lib/i18n";

const LEVEL_COLORS: Record<string, { bg: string; text: string }> = {
  E: { bg: "bg-green-500/10", text: "text-green-600 dark:text-green-400" },
  "E|M": { bg: "bg-green-500/10", text: "text-green-600 dark:text-green-400" },
  M: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400" },
  "M|C": { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400" },
  C: { bg: "bg-teal-500/10", text: "text-teal-600 dark:text-teal-400" },
  O: { bg: "bg-purple-500/10", text: "text-purple-600 dark:text-purple-400" },
};

const COPY = {
  en: {
    title: "Neurological Spectrum: Epilepsy, Migraine, Cluster Headache",
    subtitle:
      "One Q-factor mechanism, four neurological disorders. SIDS, epilepsy, migraine, and cluster headache share the same spreading depolarization cascade — the only difference is the damping coefficient γ. This is a hypothesis integrating existing evidence — not a proven explanation.",
    backLink: "← Back to Evidence",

    cautionText:
      "This section unifies four neurological conditions under a common calcium-dependent oscillation mechanism. This is a theoretical framework integrating published experimental and clinical evidence — not established medical guidance. Current standard treatments for epilepsy, migraine, and cluster headache remain appropriate.",

    spectrumTitle: "The Q-factor spectrum",
    spectrumLead:
      "All four conditions map onto a single damped oscillator model: Q = ω₀ / (2γ), where γ is the net GABAergic damping. When γ decreases, Q increases, and the system becomes more susceptible to resonance-driven spreading depolarization (CSD).",
    spectrumRows: [
      {
        condition: "Neonatal brain (SIDS range)",
        q: "Q → ∞",
        gamma: "γ < 0",
        mechanism: "GABA excitatory (NKCC1 > KCC2). No damping — any resonant input amplifies without limit.",
        outcome: "Fatal CSD → brainstem → cardiorespiratory arrest",
      },
      {
        condition: "Neonatal seizures (KCNQ2/CACNA1H)",
        q: "Q ~ 50–100",
        gamma: "γ ≈ 0",
        mechanism: "Channel mutation + immature GABA = near-zero damping. Seizures remit as KCC2 matures (3–6 mo).",
        outcome: "Non-fatal seizures, spontaneous remission",
      },
      {
        condition: "Childhood absence epilepsy",
        q: "Q ~ 20–50",
        gamma: "γ low",
        mechanism: "Thalamic Cav3.2 (T-type) sleep spindle circuits. Ethosuximide blocks T-type → seizures stop.",
        outcome: "3 Hz spike-wave, brief loss of consciousness",
      },
      {
        condition: "SUDEP",
        q: "Q ~ 30–80",
        gamma: "γ ≈ 0 (ictal)",
        mechanism: "Seizure → transient γ collapse → CSD propagates to brainstem. Same mechanism as SIDS in an older brain.",
        outcome: "Fatal CSD → brainstem → cardiorespiratory arrest",
      },
      {
        condition: "Migraine with aura",
        q: "Q ~ 5–15",
        gamma: "γ moderate",
        mechanism: "CSD propagates across cortex at 3–5 mm/min. Stops at sulci (partial damping). CACNA1A (FHM1) GoF lowers threshold.",
        outcome: "Visual aura, headache via trigeminal-CGRP activation",
      },
      {
        condition: "Cluster headache",
        q: "Q ~ 10–20",
        gamma: "γ circadian-dependent",
        mechanism: "Hypothalamic Ca²⁺ oscillation phase-locked to circadian cycle. SCN → Cav1.2 → CGRP release. Verapamil (L-type blocker) is first-line.",
        outcome: "Unilateral trigeminal-autonomic activation, 00–03 h",
      },
      {
        condition: "Normal adult brain",
        q: "Q ~ 1–5",
        gamma: "γ > 0 (robust)",
        mechanism: "Mature KCC2 dominance → GABA inhibitory → oscillations damped within 2–3 cycles.",
        outcome: "No pathological oscillation",
      },
    ],
    spectrumHeaders: {
      condition: "Condition",
      q: "Q-factor",
      gamma: "Damping (γ)",
      mechanism: "Mechanism",
      outcome: "Clinical outcome",
    },

    lopezTitle: "Experimental validation: López-Martín",
    lopezLead:
      "The most direct experimental evidence for the Q-factor model comes from the Universidad de Santiago de Compostela group (López-Martín, Carballo-Quintás et al., 2006–2011).",
    lopezExperiment: {
      title: "The key experiment",
      setup: "Adult rats received subconvulsive doses of picrotoxin (GABA-A antagonist, reduces γ) followed by GSM 900 MHz exposure at mobile-phone SAR levels.",
      results: [
        "GSM alone → no seizures (γ sufficient in adult brain)",
        "Picrotoxin alone (at this dose) → no seizures (no resonant input)",
        "GSM + picrotoxin → seizures + c-Fos expression in neocortex, hippocampus, thalamus",
        "Pulse-modulated GSM more effective than continuous wave (217 Hz pulsation matches biological resonance)",
      ],
    },
    lopezInterpretation: {
      title: "Q-factor interpretation",
      points: [
        "Picrotoxin reduces γ → Q increases → the system enters resonance-susceptible range",
        "GSM provides the resonant input (ω₀) → CSD threshold exceeded",
        "Neither alone is sufficient — you need both reduced damping AND resonant input",
        "Neonatal prediction: the neonatal brain has endogenously reduced γ (NKCC1 > KCC2), so EMF alone should be sufficient without pharmacological GABA reduction",
      ],
    },
    lopezPulse: "The pulse-modulation finding is critical: biological effect depends on the specific pulsation pattern, not just time-averaged SAR. This explains why ICNIRP SAR limits (based on thermal averaging) fail to predict biological effects.",

    pharmTitle: "Antiepileptic drug calcium map",
    pharmLead:
      "Every major class of antiepileptic drug acts on a BERM pathway component. This is not a coincidence — it is the expected result if epilepsy operates through the Q-factor mechanism.",
    pharmCards: [
      {
        id: "ETHOSUXIMIDE",
        drug: "Ethosuximide",
        drugSub: "First-line for absence epilepsy",
        target: "Cav3.x (T-type) block",
        bermPath: "Direct T-type VGCC blockade",
        conditions: ["Absence epilepsy"],
        mechanism: "Blocks T-type Ca²⁺ channels in thalamocortical neurons → eliminates 3 Hz spike-wave oscillation. The most direct Q-factor intervention: removes the resonant circuit element.",
        level: "E",
      },
      {
        id: "GABAPENTIN",
        drug: "Gabapentin / Pregabalin",
        drugSub: "Epilepsy, neuropathic pain, migraine prophylaxis",
        target: "α2δ-1 (CACNA2D1) block",
        bermPath: "VGCC auxiliary subunit → synaptogenesis control",
        conditions: ["Epilepsy", "Migraine", "Neuropathic pain"],
        mechanism: "Blocks α2δ-1 subunit → reduces VGCC trafficking to synapses → fewer excitatory synapses → Q decreases. This is the ELF-priming reversal: if ELF upregulates α2δ-1, gabapentin reverses it.",
        level: "E",
      },
      {
        id: "VALPROATE",
        drug: "Valproate (valproic acid)",
        drugSub: "Broad-spectrum antiepileptic, migraine prophylaxis",
        target: "Multiple: GABA↑, Na⁺ block, T-type Ca²⁺ block, HDAC inhibition",
        bermPath: "Multi-target γ increase + Q decrease",
        conditions: ["Epilepsy (all types)", "Migraine", "Bipolar disorder"],
        mechanism: "Enhances GABAergic inhibition (increases γ) AND blocks T-type Ca²⁺ channels (reduces resonant circuit). Dual action on the Q-factor equation from both sides.",
        level: "E",
      },
      {
        id: "LAMOTRIGINE",
        drug: "Lamotrigine",
        drugSub: "Broad-spectrum, bipolar maintenance",
        target: "Na⁺ channel block → glutamate release↓ → Ca²⁺ influx↓",
        bermPath: "Presynaptic glutamate → postsynaptic VGCC cascade",
        conditions: ["Epilepsy", "Bipolar disorder"],
        mechanism: "Blocks voltage-gated Na⁺ channels → reduces glutamate release → reduces postsynaptic Ca²⁺ entry via NMDA and VGCC. Indirect Q reduction via excitatory input reduction.",
        level: "E",
      },
      {
        id: "PHENOBARBITAL",
        drug: "Phenobarbital",
        drugSub: "First-line neonatal anticonvulsant",
        target: "GABA-A positive allosteric modulator",
        bermPath: "Direct γ increase",
        conditions: ["Neonatal seizures"],
        mechanism: "Enhances GABA-A receptor function → increases Cl⁻ conductance → increases γ → Q decreases. In neonates, effectiveness is limited because GABA is excitatory (NKCC1 > KCC2) — phenobarbital may paradoxically increase excitation.",
        level: "E",
      },
      {
        id: "BUMETANIDE",
        drug: "Bumetanide",
        drugSub: "NKCC1 blocker — targets the chloride switch",
        target: "NKCC1 (SLC12A2) block → restores inhibitory GABA",
        bermPath: "Converts γ from negative to positive",
        conditions: ["Neonatal seizures"],
        mechanism: "Blocks NKCC1 → lowers intracellular Cl⁻ → GABA becomes inhibitory → γ switches from negative to positive → Q drops from ∞ to finite. The most direct Q-factor intervention for neonatal conditions.",
        level: "E",
      },
      {
        id: "LEVETIRACETAM",
        drug: "Levetiracetam",
        drugSub: "Broad-spectrum, SV2A mechanism",
        target: "SV2A → vesicle release modulation → Ca²⁺-dependent neurotransmission↓",
        bermPath: "Presynaptic Ca²⁺-dependent vesicle release",
        conditions: ["Epilepsy (focal and generalized)"],
        mechanism: "Binds SV2A (synaptic vesicle glycoprotein 2A) → modulates Ca²⁺-dependent neurotransmitter release → reduces excitatory drive. Also inhibits N-type Ca²⁺ channels directly.",
        level: "E",
      },
      {
        id: "TOPIRAMATE",
        drug: "Topiramate",
        drugSub: "Epilepsy, migraine, cluster headache prophylaxis",
        target: "Multiple: GABA↑, glutamate↓, Ca²⁺ current↓, carbonic anhydrase",
        bermPath: "Multi-target γ increase + resonant input decrease",
        conditions: ["Epilepsy", "Migraine", "Cluster headache"],
        mechanism: "Enhances GABA-A (γ↑), blocks AMPA/kainate glutamate receptors (excitatory input↓), inhibits L-type Ca²⁺ channels, and inhibits carbonic anhydrase (pH → Ca²⁺ dynamics). Multi-pathway Q reduction.",
        level: "E",
      },
    ],

    sudepTitle: "SUDEP is adult SIDS",
    sudepLead:
      "Sudden Unexpected Death in Epilepsy (SUDEP) and Sudden Infant Death Syndrome (SIDS) share the same terminal mechanism: spreading depolarization propagating to the brainstem, causing cardiorespiratory arrest. The only difference is the trigger — an epileptic seizure vs. the neonatal Q → ∞ condition.",
    sudepVerifications: [
      {
        point: "Terminal mechanism",
        sids: "CSD → brainstem → apnea → cardiac arrest",
        sudep: "Seizure → CSD → brainstem → apnea → cardiac arrest",
        match: true,
      },
      {
        point: "Serotonin deficiency",
        sids: "Brainstem 5-HT neurons reduced (Kinney 2009)",
        sudep: "5-HT system defects, CO₂ chemoreception failure",
        match: true,
      },
      {
        point: "Arousal failure",
        sids: "Failed arousal response to hypoxia/hypercapnia",
        sudep: "Failed arousal during postictal generalized EEG suppression (PGES)",
        match: true,
      },
      {
        point: "Timing",
        sids: "Sleep (nighttime, peak 2–6 AM)",
        sudep: "Sleep (nocturnal seizures highest SUDEP risk)",
        match: true,
      },
      {
        point: "Position",
        sids: "Prone position = highest risk",
        sudep: "Prone position found in majority of SUDEP cases",
        match: true,
      },
      {
        point: "Ca²⁺ channel involvement",
        sids: "CACNA1C, CACNA1H, RYR2 variants",
        sudep: "CACNA1A mutations (FHM1/EA2), L-type VGCC antagonist prevents death",
        match: true,
      },
      {
        point: "Age distribution",
        sids: "Peak 2–4 months (Q → ∞ period)",
        sudep: "Peak in young adults with uncontrolled seizures (highest seizure frequency = most frequent γ → 0 events)",
        match: true,
      },
    ],
    sudepHeaders: {
      point: "Verification point",
      sids: "SIDS",
      sudep: "SUDEP",
    },
    sudepConclusion: "L-type VGCC antagonist prevents seizure-induced death in SUDEP mouse models (Cardiovascular Research 2025). This is direct evidence that Ca²⁺ channel blockade prevents the terminal CSD cascade — the same mechanism proposed for SIDS.",

    migraineTitle: "Migraine: CSD as the mechanism",
    migraineLead:
      "Cortical spreading depression (CSD) — a wave of neuronal depolarization followed by suppression — is the established mechanism of migraine aura and a key driver of migraine headache via trigeminal activation. CSD is fundamentally a Ca²⁺-dependent process.",
    migraineMechanism: {
      title: "The CSD → migraine cascade",
      steps: [
        "Trigger (stress, sleep deprivation, hormonal change, or EMF) → local cortical excitability increase",
        "Massive intracellular Ca²⁺ rise → neuronal depolarization wave at 3–5 mm/min",
        "CSD activates meningeal trigeminal afferents → CGRP release",
        "CGRP → vasodilation + neurogenic inflammation → headache pain",
        "Repeated CSD episodes → peripheral and central sensitization → chronic migraine",
      ],
    },
    migraineGenetic: {
      title: "Genetic proof: FHM1 (CACNA1A)",
      desc: "Familial Hemiplegic Migraine type 1 is caused by CACNA1A gain-of-function mutations — P/Q-type Ca²⁺ channel enhanced function → increased glutamate release → glia Ca²⁺ wave propagation → lowered CSD threshold. FHM1 proves that increased Ca²⁺ channel function directly causes migraine.",
    },
    migraineProphylaxis: {
      title: "All migraine preventives reduce CSD",
      desc: "Every class of effective migraine prophylactic drug reduces CSD susceptibility: beta-blockers (reduce neuronal excitability), valproate (GABA↑ + T-type block), topiramate (multi-target), amitriptyline (Na⁺ + Ca²⁺), CGRP antibodies (block the downstream effector). This convergence on CSD — a Ca²⁺-dependent process — is predicted by the Q-factor model.",
    },
    migraineEmf: "ELF-priming hypothesis: chronic ELF exposure upregulates α2δ-1 (CACNA2D1) → more VGCCs at synapses → lower CSD threshold → increased migraine susceptibility. Gabapentin (α2δ-1 blocker) is an effective migraine preventive — it directly reverses the proposed ELF-priming mechanism.",

    clusterTitle: "Cluster headache: circadian Ca²⁺ oscillation",
    clusterLead:
      "Cluster headache is the most precisely timed neurological disorder — attacks occur at the same clock time daily, with seasonal periodicity. This circadian precision points directly to the suprachiasmatic nucleus (SCN) and its Ca²⁺-dependent oscillation.",
    clusterProfile: {
      title: "Patient profile = cumulative Ca²⁺ loading",
      rows: [
        { feature: "Male 3:1", bermLink: "Higher baseline Ca²⁺ load (muscle mass, testosterone → Ca²⁺↑)" },
        { feature: "Smoker 60–90%", bermLink: "Nicotine → nAChR → Ca²⁺ influx. Chronic smoking = chronic Ca²⁺ loading" },
        { feature: "Onset ~30 years", bermLink: "Cumulative Ca²⁺ threshold reached after ~30 years of loading" },
        { feature: "Attacks 00–03 h", bermLink: "SCN Ca²⁺ oscillation nadir → Cav1.2 window → trigeminal activation" },
        { feature: "Seasonal (spring/autumn)", bermLink: "Photoperiod change → CRY sensitivity shift → SCN Ca²⁺ oscillation phase disruption" },
        { feature: "Alcohol trigger", bermLink: "Ethanol → direct Ca²⁺ channel modulation + vasodilation + histamine" },
        { feature: "RLS comorbidity", bermLink: "Restless legs syndrome shares Ca²⁺/iron/dopamine pathway. Gabapentin treats both." },
      ],
    },
    clusterTreatment: {
      title: "Treatment response map",
      headers: { drug: "Drug", bermTarget: "BERM target", efficacy: "Efficacy", mechanism: "Why it works" },
      rows: [
        {
          drug: "Verapamil",
          bermTarget: "L-type Ca²⁺ channel (Cav1.2) block",
          efficacy: "First-line preventive (240–960 mg/day)",
          mechanism: "Blocks L-type VGCC → prevents presynaptic CGRP release → shortens circadian period (Per2 clock gene). Direct Ca²⁺ channel intervention.",
        },
        {
          drug: "Melatonin",
          bermTarget: "MT1/MT2 → Gi → cAMP↓ → Ca²⁺↓",
          efficacy: "Effective (10–25 mg)",
          mechanism: "Endogenous Ca²⁺ antagonist. Resets SCN circadian oscillation. EMF suppresses melatonin via CRY pathway → supplementation restores protection.",
        },
        {
          drug: "Lithium",
          bermTarget: "GSK3β inhibition → circadian clock stabilization",
          efficacy: "Second-line preventive",
          mechanism: "Stabilizes circadian clock genes (Per2, Bmal1) downstream of Ca²⁺ oscillation. Lengthens circadian period → counteracts EMF-induced phase shift.",
        },
        {
          drug: "Gabapentin",
          bermTarget: "α2δ-1 (CACNA2D1) block",
          efficacy: "Possibly effective",
          mechanism: "Blocks VGCC auxiliary subunit → reduces excitatory synaptogenesis. Reverses ELF-priming (α2δ-1 upregulation).",
        },
        {
          drug: "Sumatriptan",
          bermTarget: "5-HT1B/1D → presynaptic Ca²⁺↓ → CGRP↓",
          efficacy: "Acute abortive (SC injection)",
          mechanism: "Activates presynaptic 5-HT1B/1D → reduces Ca²⁺ entry → blocks CGRP release. Acute symptom relief, not preventive.",
        },
        {
          drug: "Oxygen (100%)",
          bermTarget: "Vasoconstriction + free radical quench",
          efficacy: "Acute abortive (15 L/min)",
          mechanism: "High-flow O₂ → cerebral vasoconstriction → reduced trigeminal activation. Also quenches radical pair mechanism (CRY pathway).",
        },
        {
          drug: "Psilocybin",
          bermTarget: "5-HT2A → tryptamine pathway reset",
          efficacy: "Sub-psychedelic doses prevent cycles",
          mechanism: "Master tryptamine reset: 5-HT2A agonism → thalamocortical network reset → SCN circadian reset → breaks the Ca²⁺ oscillation cycle. See tryptamine reset section below.",
        },
      ],
    },

    psilocybinTitle: "The tryptamine reset: psilocybin",
    psilocybinLead:
      "Psilocybin (psilocin / 4-OH-DMT) is a 5-HT2A receptor agonist that produces a \"master reset\" of the tryptamine pathway. Sub-psychedelic doses prevent cluster headache cycles — and the non-psychedelic analogue 2-bromo-LSD (BOL) also works, proving this is a receptor-level mechanism, not a psychedelic experience effect.",
    psilocybinMechanisms: [
      {
        step: "5-HT2A receptor agonism",
        desc: "Psilocin binds 5-HT2A at cortical layer V pyramidal neurons → triggers a distinct signaling cascade from serotonin itself (biased agonism). This resets the receptor's downstream coupling.",
      },
      {
        step: "Thalamocortical network reset",
        desc: "5-HT2A activation in cortex and thalamus disrupts the default mode network → allows thalamocortical circuits to reorganize. In cluster headache, this breaks the pathological oscillation pattern.",
      },
      {
        step: "SCN circadian reset",
        desc: "Serotonergic input to the SCN is a major non-photic zeitgeber. 5-HT2A activation recalibrates SCN Ca²⁺ oscillation phase — the same oscillation that drives cluster headache timing.",
      },
      {
        step: "5-HT2A downregulation",
        desc: "After acute agonism, 5-HT2A receptors internalize and downregulate. This is why sub-psychedelic doses work and why effects persist long after the drug is cleared — the receptor state is reset.",
      },
      {
        step: "α2δ-1 expression reset (proposed)",
        desc: "If the tryptamine pathway modulates α2δ-1 expression (CACNA2D1 → VGCC density at synapses), psilocybin may reset the ELF-priming state. This would explain why psilocybin also shows efficacy in migraine — both share α2δ-1-mediated CSD susceptibility.",
      },
    ],
    psilocybinBol: {
      title: "BOL-148: the non-psychedelic proof",
      desc: "2-bromo-LSD (BOL-148) has identical 5-HT2A binding affinity to LSD but is non-psychedelic (no hallucinogenic effect). It also aborts cluster headache cycles. This proves the therapeutic mechanism operates at the receptor level — through 5-HT2A → tryptamine pathway → circadian reset — not through the psychedelic experience itself.",
    },

    csdTitle: "Cortical spreading depolarization: the unifying mechanism",
    csdLead:
      "CSD is the common terminal pathway for all four conditions. The Q-factor determines whether CSD is triggered, how far it propagates, and whether it reaches the brainstem.",
    csdTable: [
      { condition: "SIDS", trigger: "EMF + Q→∞ (neonatal)", propagation: "Full brainstem", outcome: "Fatal", prevented: "Bumetanide (γ restoration), EMF reduction" },
      { condition: "SUDEP", trigger: "Seizure → transient Q spike", propagation: "Full brainstem", outcome: "Fatal", prevented: "L-type VGCC antagonist, seizure control" },
      { condition: "Epilepsy", trigger: "Low γ + focal excitability", propagation: "Cortical (limited)", outcome: "Seizure", prevented: "Ethosuximide, valproate, bumetanide" },
      { condition: "Migraine", trigger: "CSD threshold exceeded", propagation: "Cortical (stops at sulci)", outcome: "Aura + headache", prevented: "Gabapentin, valproate, topiramate" },
      { condition: "Cluster HA", trigger: "SCN Ca²⁺ oscillation → trigeminal", propagation: "Hypothalamic → trigeminal", outcome: "Unilateral pain", prevented: "Verapamil, psilocybin, melatonin" },
    ],
    csdHeaders: { condition: "Condition", trigger: "CSD trigger", propagation: "Propagation", outcome: "Outcome", prevented: "Prevented by" },

    pharmTargetLabel: "Target",
    pharmBermPathLabel: "BERM pathway",
    pharmConditionsLabel: "Conditions",
    pharmMechanismLabel: "Mechanism",
    predictionDesc: "The Q-factor spectrum model generates six testable predictions covering migraine prevalence, CSD threshold, cluster headache EMF exposure, SUDEP risk, psilocybin efficacy, and a neonatal animal model.",
    predictionLink: "See neurological spectrum predictions (NEURO-EMF-1 through NEURO-EMF-6)",
    predictionHref: "/predictions",
  },

  fi: {
    title: "Neurologinen spektri: Epilepsia, migreeni, klusteripäänsärky",
    subtitle:
      "Yksi Q-tekijämekanismi, neljä neurologista sairautta. SIDS, epilepsia, migreeni ja klusteripäänsärky jakavat saman spreading depolarization -kaskadin — ainoa ero on vaimennuskerroin γ. Tämä on olemassa olevaa näyttöä integroiva hypoteesi — ei todistettu selitys.",
    backLink: "← Takaisin näyttöön",

    cautionText:
      "Tämä osio yhdistää neljä neurologista tilaa yhteiseksi kalsiumriippuvaiseksi oskillaatiomekanismiksi. Tämä on teoreettinen viitekehys joka integroi julkaistua kokeellista ja kliinistä näyttöä — ei vakiintunutta lääketieteellistä ohjausta. Nykyiset standardihoidot epilepsialle, migreenille ja klusteripäänsärylle ovat edelleen asianmukaisia.",

    spectrumTitle: "Q-tekijäspektri",
    spectrumLead:
      "Kaikki neljä tilaa kartoittuvat yhdelle vaimennetun oskillaattorin mallille: Q = ω₀ / (2γ), missä γ on netto-GABAerginen vaimennus. Kun γ pienenee, Q kasvaa ja järjestelmä tulee alttiimmaksi resonanssiohjautulle spreading depolarizationille (CSD).",
    spectrumRows: [
      {
        condition: "Neonataaliaivot (SIDS-alue)",
        q: "Q → ∞",
        gamma: "γ < 0",
        mechanism: "GABA eksitatorinen (NKCC1 > KCC2). Ei vaimennusta — mikä tahansa resonanssisyöte vahvistuu ilman rajaa.",
        outcome: "Fataali CSD → aivorunko → sydänhengityspysähdys",
      },
      {
        condition: "Neonataalit kohtaukset (KCNQ2/CACNA1H)",
        q: "Q ~ 50–100",
        gamma: "γ ≈ 0",
        mechanism: "Kanavamutaatio + kypsymätön GABA = lähes nollavaimennus. Kohtaukset remittoituvat KCC2:n kypsyessä (3–6 kk).",
        outcome: "Ei-fataalit kohtaukset, spontaani remissio",
      },
      {
        condition: "Lapsuuden poissaoloepilepsia",
        q: "Q ~ 20–50",
        gamma: "γ matala",
        mechanism: "Talamuksen Cav3.2 (T-tyypin) unikäämipiirit. Etosuksimidi salpaa T-tyypin → kohtaukset loppuvat.",
        outcome: "3 Hz piikki-aaltokuvio, lyhyt tajunnanmenetys",
      },
      {
        condition: "SUDEP",
        q: "Q ~ 30–80",
        gamma: "γ ≈ 0 (iktaali)",
        mechanism: "Kohtaus → ohimenevä γ-romahdus → CSD leviää aivorunkoon. Sama mekanismi kuin SIDS vanhemmissa aivoissa.",
        outcome: "Fataali CSD → aivorunko → sydänhengityspysähdys",
      },
      {
        condition: "Migreeni auralla",
        q: "Q ~ 5–15",
        gamma: "γ kohtalainen",
        mechanism: "CSD leviää aivokuorella 3–5 mm/min. Pysähtyy uurteisiin (osittainen vaimennus). CACNA1A (FHM1) GoF alentaa kynnystä.",
        outcome: "Visuaalinen aura, päänsärky trigeminaalisen CGRP-aktivaation kautta",
      },
      {
        condition: "Klusteripäänsärky",
        q: "Q ~ 10–20",
        gamma: "γ sirkadiaaniriippuvainen",
        mechanism: "Hypotalamuksen Ca²⁺-oskillaatio vaihelukittu vuorokausirytmiin. SCN → Cav1.2 → CGRP-vapautuminen. Verapamiili (L-tyypin salpaaja) on ensisijaislääke.",
        outcome: "Yksipuolinen trigeminaalis-autonominen aktivaatio, 00–03 h",
      },
      {
        condition: "Normaalit aikuisaivot",
        q: "Q ~ 1–5",
        gamma: "γ > 0 (robusti)",
        mechanism: "Kypsä KCC2-dominanssi → GABA inhibitorinen → vaihtelut vaimenevat 2–3 syklin sisällä.",
        outcome: "Ei patologista vaihtelua",
      },
    ],
    spectrumHeaders: {
      condition: "Tila",
      q: "Q-tekijä",
      gamma: "Vaimennus (γ)",
      mechanism: "Mekanismi",
      outcome: "Kliininen lopputulema",
    },

    lopezTitle: "Kokeellinen todentaminen: López-Martín",
    lopezLead:
      "Suorin kokeellinen näyttö Q-tekijämallille tulee Universidad de Santiago de Compostelan ryhmältä (López-Martín, Carballo-Quintás ym., 2006–2011).",
    lopezExperiment: {
      title: "Avainkokeilu",
      setup: "Aikuiset rotat saivat subkonvulsiivisen annoksen pikrotoksiinia (GABA-A-antagonisti, vähentää γ:tä), minkä jälkeen altistus GSM 900 MHz:lle matkapuhelimen SAR-tasoilla.",
      results: [
        "GSM yksin → ei kohtauksia (γ riittävä aikuisaivoissa)",
        "Pikrotoksiini yksin (tällä annoksella) → ei kohtauksia (ei resonanssisyötettä)",
        "GSM + pikrotoksiini → kohtaukset + c-Fos-ekspressio neokorteksissa, hippokampuksessa, talamuksessa",
        "Pulssimoduloitu GSM tehokkaampi kuin jatkuva aalto (217 Hz pulsaatio vastaa biologista resonanssia)",
      ],
    },
    lopezInterpretation: {
      title: "Q-tekijätulkinta",
      points: [
        "Pikrotoksiini vähentää γ:tä → Q kasvaa → järjestelmä siirtyy resonanssiherkälle alueelle",
        "GSM tarjoaa resonanssisyötteen (ω₀) → CSD-kynnys ylittyy",
        "Kumpikaan yksin ei riitä — tarvitaan sekä alentunut vaimennus ETTÄ resonanssisyöte",
        "Neonataalijohtopäätös: neonataaliaivoissa on endogeenisesti alentunut γ (NKCC1 > KCC2), joten EMF:n yksin pitäisi riittää ilman farmakologista GABA-vähennystä",
      ],
    },
    lopezPulse: "Pulssimodulaatiohavainto on kriittinen: biologinen vaikutus riippuu nimenomaisesta pulsaatiokuviosta, ei pelkästään aikakeskiarvotetusta SAR:sta. Tämä selittää miksi ICNIRP:n SAR-rajat (perustuvat termiseen keskiarvoistukseen) eivät ennusta biologisia vaikutuksia.",

    pharmTitle: "Epilepsialääkkeiden kalsiumkartta",
    pharmLead:
      "Jokainen merkittävä epilepsialääkeluokka vaikuttaa BERM-reitin komponenttiin. Tämä ei ole sattuma — se on odotettavissa oleva tulos, jos epilepsia toimii Q-tekijämekanismin kautta.",
    pharmCards: [
      {
        id: "ETHOSUXIMIDE",
        drug: "Etosuksimidi",
        drugSub: "Ensisijaislääke poissaoloepilepsiaan",
        target: "Cav3.x (T-tyypin) salpaus",
        bermPath: "Suora T-tyypin VGCC-salpaus",
        conditions: ["Poissaoloepilepsia"],
        mechanism: "Salpaa T-tyypin Ca²⁺-kanavat talamokortikaalisissa neuroneissa → poistaa 3 Hz piikki-aalto-oskillaation. Suorin Q-tekijäinterventio: poistaa resonanssipiirin elementin.",
        level: "E",
      },
      {
        id: "GABAPENTIN",
        drug: "Gabapentiini / Pregabaliini",
        drugSub: "Epilepsia, neuropaattinen kipu, migreeniprofylaksi",
        target: "α2δ-1 (CACNA2D1) -salpaus",
        bermPath: "VGCC:n apualayksiö → synaptogeneesikontrolli",
        conditions: ["Epilepsia", "Migreeni", "Neuropaattinen kipu"],
        mechanism: "Salpaa α2δ-1-alayksikön → vähentää VGCC:n kuljetusta synapseihin → vähemmän eksitatorisia synapseja → Q pienenee. Tämä on ELF-priming-käänne: jos ELF säätelee α2δ-1:tä ylös, gabapentiini kumoaa sen.",
        level: "E",
      },
      {
        id: "VALPROATE",
        drug: "Valproaatti (valproiinihappo)",
        drugSub: "Laajaspektrinen epilepsialääke, migreeniprofylaksi",
        target: "Monikohtainen: GABA↑, Na⁺-salpaus, T-tyypin Ca²⁺-salpaus, HDAC-inhibitio",
        bermPath: "Monikohteinen γ:n kasvu + Q:n lasku",
        conditions: ["Epilepsia (kaikki tyypit)", "Migreeni", "Kaksisuuntainen mielialahäiriö"],
        mechanism: "Tehostaa GABAergista inhibitiota (kasvattaa γ:tä) JA salpaa T-tyypin Ca²⁺-kanavat (vähentää resonanssipiiriä). Kaksoisvaikutus Q-tekijäyhtälöön molemmilta puolilta.",
        level: "E",
      },
      {
        id: "LAMOTRIGINE",
        drug: "Lamotrigiini",
        drugSub: "Laajaspektrinen, kaksisuuntaisen mielialahäiriön ylläpitohoito",
        target: "Na⁺-kanavasalpaus → glutamaatin vapautuminen↓ → Ca²⁺-sisäänvirtaus↓",
        bermPath: "Presynaptinen glutamaatti → postsynaptinen VGCC-kaskadi",
        conditions: ["Epilepsia", "Kaksisuuntainen mielialahäiriö"],
        mechanism: "Salpaa jänniteohjatut Na⁺-kanavat → vähentää glutamaatin vapautumista → vähentää postsynaptista Ca²⁺-sisäänvirtausta NMDA:n ja VGCC:n kautta. Epäsuora Q:n vähennys eksitatorisen syötteen vähennyksen kautta.",
        level: "E",
      },
      {
        id: "PHENOBARBITAL",
        drug: "Fenobarbitaali",
        drugSub: "Ensisijainen neonataalinen antikonvulsantti",
        target: "GABA-A:n positiivinen allosteerinen modulaattori",
        bermPath: "Suora γ:n kasvu",
        conditions: ["Neonataalit kohtaukset"],
        mechanism: "Tehostaa GABA-A-reseptorin toimintaa → lisää Cl⁻-konduktanssia → kasvattaa γ:tä → Q pienenee. Vastasyntyneillä teho on rajallinen, koska GABA on eksitatorinen (NKCC1 > KCC2) — fenobarbitaali voi paradoksaalisesti lisätä eksitaatiota.",
        level: "E",
      },
      {
        id: "BUMETANIDE",
        drug: "Bumetanidi",
        drugSub: "NKCC1-salpaaja — kohdistuu kloridikytkimeen",
        target: "NKCC1 (SLC12A2) -salpaus → palauttaa inhibitorisen GABAn",
        bermPath: "Muuntaa γ:n negatiivisesta positiiviseksi",
        conditions: ["Neonataalit kohtaukset"],
        mechanism: "Salpaa NKCC1:n → alentaa solunsisäistä Cl⁻:a → GABA muuttuu inhibitoriseksi → γ kytkeytyy negatiivisesta positiiviseksi → Q putoaa ∞:stä äärelliseksi. Suorin Q-tekijäinterventio neonataalitiloihin.",
        level: "E",
      },
      {
        id: "LEVETIRACETAM",
        drug: "Levetirasetaami",
        drugSub: "Laajaspektrinen, SV2A-mekanismi",
        target: "SV2A → vesikulivapautuksen modulaatio → Ca²⁺-riippuvainen hermoaineen välitys↓",
        bermPath: "Presynaptinen Ca²⁺-riippuvainen vesikulivapautus",
        conditions: ["Epilepsia (fokaalinen ja yleistynyt)"],
        mechanism: "Sitoutuu SV2A:han (synaptinen vesikkeliglykoproteiini 2A) → säätelee Ca²⁺-riippuvaista hermoainevälittäjän vapautumista → vähentää eksitatorista ohjaustta. Myös inhiboi N-tyypin Ca²⁺-kanavia suoraan.",
        level: "E",
      },
      {
        id: "TOPIRAMATE",
        drug: "Topiramaatti",
        drugSub: "Epilepsia, migreeni, klusteripäänsärkyprofylaksi",
        target: "Monikohtainen: GABA↑, glutamaatti↓, Ca²⁺-virta↓, karboanyhydraasi",
        bermPath: "Monikohteinen γ:n kasvu + resonanssisyötteen lasku",
        conditions: ["Epilepsia", "Migreeni", "Klusteripäänsärky"],
        mechanism: "Tehostaa GABA-A:ta (γ↑), salpaa AMPA/kainaatti-glutamaattireseptoreita (eksitatorinen syöte↓), inhiboi L-tyypin Ca²⁺-kanavia ja inhiboi karboanyhydraasia (pH → Ca²⁺-dynamiikka). Monireitti-Q-vähennys.",
        level: "E",
      },
    ],

    sudepTitle: "SUDEP on aikuisten SIDS",
    sudepLead:
      "Sudden Unexpected Death in Epilepsy (SUDEP) ja Sudden Infant Death Syndrome (SIDS) jakavat saman terminaalisen mekanismin: spreading depolarization joka leviää aivorunkoon aiheuttaen sydänhengityspysähdyksen. Ainoa ero on laukaisija — epileptinen kohtaus vs. neonataali Q → ∞ -tila.",
    sudepVerifications: [
      {
        point: "Terminaalimekanismi",
        sids: "CSD → aivorunko → apnea → sydänpysähdys",
        sudep: "Kohtaus → CSD → aivorunko → apnea → sydänpysähdys",
        match: true,
      },
      {
        point: "Serotoniinipuutos",
        sids: "Aivorungon 5-HT-neuronit vähentyneet (Kinney 2009)",
        sudep: "5-HT-järjestelmän viat, CO₂-kemoreseptiovirhe",
        match: true,
      },
      {
        point: "Heräämisvirhe",
        sids: "Epäonnistunut heräämisreaktio hypoksiaan/hyperkapniaan",
        sudep: "Epäonnistunut herääminen postiktaalisen yleistyneen EEG-suppressio (PGES) aikana",
        match: true,
      },
      {
        point: "Ajoitus",
        sids: "Uni (yöllä, huippu 2–6 AM)",
        sudep: "Uni (yölliset kohtaukset korkein SUDEP-riski)",
        match: true,
      },
      {
        point: "Asento",
        sids: "Vatsamakuu = korkein riski",
        sudep: "Vatsamakuu löytyy suurimmassa osassa SUDEP-tapauksia",
        match: true,
      },
      {
        point: "Ca²⁺-kanavat",
        sids: "CACNA1C, CACNA1H, RYR2-variantit",
        sudep: "CACNA1A-mutaatiot (FHM1/EA2), L-tyypin VGCC-antagonisti estää kuoleman",
        match: true,
      },
      {
        point: "Ikäjakauma",
        sids: "Huippu 2–4 kuukautta (Q → ∞ -kausi)",
        sudep: "Huippu nuorilla aikuisilla joilla kontrolloimattomat kohtaukset (suurin kohtaustiheys = useimmat γ → 0 -tapahtumat)",
        match: true,
      },
    ],
    sudepHeaders: {
      point: "Todentamispiste",
      sids: "SIDS",
      sudep: "SUDEP",
    },
    sudepConclusion: "L-tyypin VGCC-antagonisti estää kohtauksen aiheuttaman kuoleman SUDEP-hiirimallissa (Cardiovascular Research 2025). Tämä on suora näyttö siitä, että Ca²⁺-kanavasalpaus estää terminaalisen CSD-kaskadin — sama mekanismi jota ehdotetaan SIDS:lle.",

    migraineTitle: "Migreeni: CSD mekanismina",
    migraineLead:
      "Kortikaalinen spreading depression (CSD) — neuronaalisen depolarisaation aalto jota seuraa suppressio — on migreenin auran vakiintunut mekanismi ja päänsäryn keskeinen ajuri trigeminaalisen aktivaation kautta. CSD on perustavanlaatuisesti Ca²⁺-riippuvainen prosessi.",
    migraineMechanism: {
      title: "CSD → migreeni -kaskadi",
      steps: [
        "Laukaisija (stressi, unideprivaatio, hormonaalimuutos tai EMF) → paikallinen kortikaalisen eksitabiliteetin kasvu",
        "Massiivinen solunsisäinen Ca²⁺-nousu → neuronaalinen depolarisaatioaalto 3–5 mm/min",
        "CSD aktivoi meningeaaliset trigeminaaliafferentit → CGRP-vapautuminen",
        "CGRP → vasodilataatio + neurogeeninen inflammaatio → päänsärkykipu",
        "Toistuvat CSD-episodit → perifeerinen ja sentraalinen sensitisaatio → krooninen migreeni",
      ],
    },
    migraineGenetic: {
      title: "Geneettinen todiste: FHM1 (CACNA1A)",
      desc: "Familiaalinen hemipleginen migreeni tyyppi 1 aiheutuu CACNA1A gain-of-function -mutaatioista — P/Q-tyypin Ca²⁺-kanavan tehostunut toiminta → lisääntynyt glutamaatin vapautuminen → glian Ca²⁺-aallon eteneminen → alentunut CSD-kynnys. FHM1 todistaa, että Ca²⁺-kanavan tehostunut toiminta aiheuttaa suoraan migreenin.",
    },
    migraineProphylaxis: {
      title: "Kaikki migreenin estolääkkeet vähentävät CSD:tä",
      desc: "Jokainen tehokkaan migreenin estolääkkeen luokka vähentää CSD-herkkyyttä: beetasalpaajat (vähentävät neuronaalista eksitabiliteettia), valproaatti (GABA↑ + T-tyypin salpaus), topiramaatti (monikohteinen), amitriptyliini (Na⁺ + Ca²⁺), CGRP-vasta-aineet (salpaavat alavirtaefektorin). Tämä yhdentyminen CSD:hen — Ca²⁺-riippuvaiseen prosessiin — on Q-tekijämallin ennustama.",
    },
    migraineEmf: "ELF-priming-hypoteesi: krooninen ELF-altistus säätelee α2δ-1:tä (CACNA2D1) ylöspäin → enemmän VGCC:itä synapseissa → alempi CSD-kynnys → lisääntynyt migreeniherkkyys. Gabapentiini (α2δ-1-salpaaja) on tehokas migreenin estolääke — se suoraan kumoaa ehdotetun ELF-priming-mekanismin.",

    clusterTitle: "Klusteripäänsärky: sirkadiaaninen Ca²⁺-oskillaatio",
    clusterLead:
      "Klusteripäänsärky on täsmällisimmin ajoitettu neurologinen häiriö — kohtaukset esiintyvät samaan kellonaikaan päivittäin, kausivaihtelulla. Tämä sirkadiaaninen tarkkuus osoittaa suoraan suprakiasmaattiseen tumakkeeseen (SCN) ja sen Ca²⁺-riippuvaiseen oskillaatioon.",
    clusterProfile: {
      title: "Potilasprofiili = kumulatiivinen Ca²⁺-kuormitus",
      rows: [
        { feature: "Mies 3:1", bermLink: "Korkeampi perus Ca²⁺-kuorma (lihasmassa, testosteroni → Ca²⁺↑)" },
        { feature: "Tupakoija 60–90 %", bermLink: "Nikotiini → nAChR → Ca²⁺-sisäänvirtaus. Krooninen tupakointi = krooninen Ca²⁺-kuormitus" },
        { feature: "Alkamisikä ~30 v", bermLink: "Kumulatiivinen Ca²⁺-kynnys saavutetaan ~30 vuoden kuormituksen jälkeen" },
        { feature: "Kohtaukset 00–03 h", bermLink: "SCN:n Ca²⁺-oskillaation minimipiste → Cav1.2-ikkuna → trigeminaalinen aktivaatio" },
        { feature: "Kausittainen (kevät/syksy)", bermLink: "Valojakson muutos → CRY-herkkyyden siirtymä → SCN:n Ca²⁺-oskillaation vaihehäiriö" },
        { feature: "Alkoholi laukaisijana", bermLink: "Etanoli → suora Ca²⁺-kanavamodulaatio + vasodilataatio + histamiini" },
        { feature: "RLS-komorbiditeetti", bermLink: "Levottomat jalat -oireyhtymä jakaa Ca²⁺/rauta/dopamiini-reitin. Gabapentiini hoitaa molempia." },
      ],
    },
    clusterTreatment: {
      title: "Hoitovasteen kartta",
      headers: { drug: "Lääke", bermTarget: "BERM-kohde", efficacy: "Teho", mechanism: "Miksi se toimii" },
      rows: [
        {
          drug: "Verapamiili",
          bermTarget: "L-tyypin Ca²⁺-kanava (Cav1.2) -salpaus",
          efficacy: "Ensisijainen estolääke (240–960 mg/vrk)",
          mechanism: "Salpaa L-tyypin VGCC:n → estää presynaptisen CGRP-vapautumisen → lyhentää sirkadiaanijaksoa (Per2-kellgeeni). Suora Ca²⁺-kanavainterventio.",
        },
        {
          drug: "Melatoniini",
          bermTarget: "MT1/MT2 → Gi → cAMP↓ → Ca²⁺↓",
          efficacy: "Tehokas (10–25 mg)",
          mechanism: "Endogeeninen Ca²⁺-antagonisti. Resetoi SCN:n sirkadiaanioskillaation. EMF vaimentaa melatoniinia CRY-reitin kautta → lisäravinteet palauttaa suojan.",
        },
        {
          drug: "Litium",
          bermTarget: "GSK3β-inhibitio → sirkadiaanisen kellon stabilointi",
          efficacy: "Toisen linjan estolääke",
          mechanism: "Stabiloi sirkadiaanisia kellgeenejä (Per2, Bmal1) Ca²⁺-oskillaation alavirrassa. Pidentää sirkadiaanijaksoa → vastustaa EMF:n aiheuttamaa vaihesiirtymää.",
        },
        {
          drug: "Gabapentiini",
          bermTarget: "α2δ-1 (CACNA2D1) -salpaus",
          efficacy: "Mahdollisesti tehokas",
          mechanism: "Salpaa VGCC:n apualayksikön → vähentää eksitatorista synaptogeneesiä. Kumoaa ELF-primingin (α2δ-1:n ylössäätelyn).",
        },
        {
          drug: "Sumatriptaani",
          bermTarget: "5-HT1B/1D → presynaptinen Ca²⁺↓ → CGRP↓",
          efficacy: "Akuutti katkaisuhoito (s.c.-injektio)",
          mechanism: "Aktivoi presynaptisen 5-HT1B/1D:n → vähentää Ca²⁺-sisäänvirtausta → estää CGRP-vapautumisen. Akuutti oirelievitys, ei estolääke.",
        },
        {
          drug: "Happi (100 %)",
          bermTarget: "Vasokonstriktio + vapaan radikaalin sammutus",
          efficacy: "Akuutti katkaisuhoito (15 L/min)",
          mechanism: "Suurivirtauksinen O₂ → aivoverisuonten vasokonstriktio → vähentynyt trigeminaalinen aktivaatio. Myös sammuttaa radikaalipari-mekanismin (CRY-reitti).",
        },
        {
          drug: "Psilosybiini",
          bermTarget: "5-HT2A → tryptamiinireitin resetti",
          efficacy: "Subpsykedeelisillä annoksilla estää syklit",
          mechanism: "Tryptamiini-masterresetti: 5-HT2A-agonismi → talamo-kortikaalisen verkoston resetti → SCN:n sirkadiaaniresetti → katkaisee Ca²⁺-oskillaatiosyklin. Ks. tryptamiiniresetti-osio alla.",
        },
      ],
    },

    psilocybinTitle: "Tryptamiiniresetti: psilosybiini",
    psilocybinLead:
      "Psilosybiini (psilosiini / 4-OH-DMT) on 5-HT2A-reseptoriagonisti joka tuottaa tryptamiinireitin \"master-resetin\". Subpsykedeelisillä annoksilla se estää klusteripäänsärkysyklejä — ja ei-psykedeelinen analogi 2-bromo-LSD (BOL) toimii myös, todistaen tämän olevan reseptoritason mekanismi, ei psykedeelisen kokemuksen vaikutus.",
    psilocybinMechanisms: [
      {
        step: "5-HT2A-reseptoriagonismi",
        desc: "Psilosiini sitoutuu 5-HT2A:han korteksin kerroksen V pyramidineuroneissa → laukaisee erillisen signalointikaskadin kuin serotoniini itse (vinoutunut agonismi). Tämä resetoi reseptorin alavirran kytkennän.",
      },
      {
        step: "Talamo-kortikaalinen verkon resetti",
        desc: "5-HT2A-aktivaatio korteksissa ja talamuksessa hajottaa oletustilan verkoston → mahdollistaa talamokortikaalisten piirien uudelleenjärjestäytymisen. Klusteripäänsäryssä tämä katkaisee patologisen oskillaatiokuvion.",
      },
      {
        step: "SCN:n sirkadiaaniresetti",
        desc: "Serotonerginen syöte SCN:ään on merkittävä ei-valollinen aikamerkki. 5-HT2A-aktivaatio kalibroi SCN:n Ca²⁺-oskillaatiovaiheen uudelleen — sama oskillaatio joka ohjaa klusteripäänsäryn ajoitusta.",
      },
      {
        step: "5-HT2A-alassäätely",
        desc: "Akuutin agonismin jälkeen 5-HT2A-reseptorit internalisoituvat ja alassäätyvät. Siksi subpsykedeelisillä annoksilla tehoaa ja vaikutukset kestävät pitkään lääkkeen puhdistumisen jälkeen — reseptorin tila on resetoitunut.",
      },
      {
        step: "α2δ-1-ekspression resetti (ehdotettu)",
        desc: "Jos tryptamiinireitti säätelee α2δ-1-ekspressiota (CACNA2D1 → VGCC-tiheys synapseissa), psilosybiini voi resetoida ELF-priming-tilan. Tämä selittäisi miksi psilosybiini osoittaa tehoa myös migreenissä — molemmat jakavat α2δ-1-välitteisen CSD-herkkyyden.",
      },
    ],
    psilocybinBol: {
      title: "BOL-148: ei-psykedeelinen todiste",
      desc: "2-bromo-LSD (BOL-148):lla on identtinen 5-HT2A-sitoutumisaffiniteetti kuin LSD:llä mutta se on ei-psykedeelinen (ei hallusinogeenista vaikutusta). Se myös katkaisee klusteripäänsärkysyklejä. Tämä todistaa, että terapeuttinen mekanismi toimii reseptoritasolla — 5-HT2A:n → tryptamiinireitin → sirkadiaaniresetin kautta — ei psykedeelisen kokemuksen itsensä kautta.",
    },

    csdTitle: "Kortikaalinen spreading depolarization: yhdistävä mekanismi",
    csdLead:
      "CSD on kaikkien neljän tilan yhteinen terminaalireitti. Q-tekijä määrittää laukaistaanko CSD, kuinka pitkälle se leviää ja saavuttaako se aivorungon.",
    csdTable: [
      { condition: "SIDS", trigger: "EMF + Q→∞ (neonataalinen)", propagation: "Koko aivorunko", outcome: "Fataali", prevented: "Bumetanidi (γ:n palautus), EMF-vähennys" },
      { condition: "SUDEP", trigger: "Kohtaus → ohimenevä Q-piikki", propagation: "Koko aivorunko", outcome: "Fataali", prevented: "L-tyypin VGCC-antagonisti, kohtauskontrolli" },
      { condition: "Epilepsia", trigger: "Matala γ + fokaalinen eksitabiliteetti", propagation: "Kortikaalinen (rajattu)", outcome: "Kohtaus", prevented: "Etosuksimidi, valproaatti, bumetanidi" },
      { condition: "Migreeni", trigger: "CSD-kynnys ylitetty", propagation: "Kortikaalinen (pysähtyy uurteisiin)", outcome: "Aura + päänsärky", prevented: "Gabapentiini, valproaatti, topiramaatti" },
      { condition: "Klusteripäänsärky", trigger: "SCN Ca²⁺-oskillaatio → trigeminaali", propagation: "Hypotalamuksen → trigeminaali", outcome: "Yksipuolinen kipu", prevented: "Verapamiili, psilosybiini, melatoniini" },
    ],
    csdHeaders: { condition: "Tila", trigger: "CSD-laukaisija", propagation: "Leviäminen", outcome: "Lopputulema", prevented: "Estetään lääkkeellä" },

    pharmTargetLabel: "Kohde",
    pharmBermPathLabel: "BERM-reitti",
    pharmConditionsLabel: "Tilat",
    pharmMechanismLabel: "Mekanismi",
    predictionDesc: "Q-tekijä-spektrimalli tuottaa kuusi testattavaa ennustetta jotka kattavat migreenin esiintyvyyden, CSD-kynnyksen, klusteripäänsäryn EMF-altistuksen, SUDEP-riskin, psilosybiinin tehon ja neonataalikoemallin.",
    predictionLink: "Ks. neurologisen spektrin ennusteet (NEURO-EMF-1 – NEURO-EMF-6)",
    predictionHref: "/predictions",
  },

  ja: {
    title: "神経学的スペクトラム：てんかん、片頭痛、群発頭痛",
    subtitle:
      "一つのQ因子メカニズム、四つの神経疾患。SIDS、てんかん、片頭痛、群発頭痛は同じ拡延性脱分極カスケードを共有する――唯一の違いは減衰係数γである。これは既存のエビデンスを統合する仮説であり、証明された説明ではない。",
    backLink: "← エビデンスに戻る",

    cautionText:
      "このセクションでは、四つの神経疾患を共通のカルシウム依存性振動メカニズムのもとに統合する。これは公表された実験的・臨床的エビデンスを統合する理論的枠組みであり、確立された医療指針ではない。てんかん、片頭痛、群発頭痛に対する現行の標準治療は引き続き適切である。",

    spectrumTitle: "Q因子スペクトラム",
    spectrumLead:
      "四つの疾患すべてが一つの減衰振動子モデルに写像される：Q = ω₀ / (2γ)、ここでγは正味のGABA作動性減衰である。γが減少するとQが増大し、システムは共鳴駆動の拡延性脱分極（CSD）に対してより感受性が高くなる。",
    spectrumRows: [
      {
        condition: "新生児脳（SIDS範囲）",
        q: "Q → ∞",
        gamma: "γ < 0",
        mechanism: "GABAが興奮性（NKCC1 > KCC2）。減衰なし――いかなる共鳴入力も無制限に増幅される。",
        outcome: "致死性CSD → 脳幹 → 心肺停止",
      },
      {
        condition: "新生児けいれん（KCNQ2/CACNA1H）",
        q: "Q ~ 50–100",
        gamma: "γ ≈ 0",
        mechanism: "チャネル変異＋未成熟GABA＝ほぼゼロ減衰。KCC2の成熟（3〜6ヶ月）に伴いけいれんは寛解する。",
        outcome: "非致死性けいれん、自然寛解",
      },
      {
        condition: "小児欠神てんかん",
        q: "Q ~ 20–50",
        gamma: "γ 低い",
        mechanism: "視床Cav3.2（T型）睡眠紡錘波回路。エトスクシミドがT型を遮断 → けいれん停止。",
        outcome: "3 Hz棘徐波、短時間の意識消失",
      },
      {
        condition: "SUDEP",
        q: "Q ~ 30–80",
        gamma: "γ ≈ 0（発作時）",
        mechanism: "発作 → 一過性γ崩壊 → CSDが脳幹に伝播。成熟脳におけるSIDSと同じメカニズム。",
        outcome: "致死性CSD → 脳幹 → 心肺停止",
      },
      {
        condition: "前兆を伴う片頭痛",
        q: "Q ~ 5–15",
        gamma: "γ 中等度",
        mechanism: "CSDが皮質を3〜5 mm/minで伝播。脳溝で停止（部分的減衰）。CACNA1A（FHM1）GoFが閾値を低下させる。",
        outcome: "視覚性前兆、三叉神経CGRP活性化による頭痛",
      },
      {
        condition: "群発頭痛",
        q: "Q ~ 10–20",
        gamma: "γ 概日リズム依存",
        mechanism: "視床下部Ca²⁺振動が概日リズムに位相同期。SCN → Cav1.2 → CGRP放出。ベラパミル（L型遮断薬）が第一選択薬。",
        outcome: "片側性三叉神経自律神経性活性化、00〜03時",
      },
      {
        condition: "正常成人脳",
        q: "Q ~ 1–5",
        gamma: "γ > 0（頑健）",
        mechanism: "成熟KCC2優位 → GABA抑制性 → 振動は2〜3サイクル以内に減衰。",
        outcome: "病的振動なし",
      },
    ],
    spectrumHeaders: {
      condition: "疾患",
      q: "Q因子",
      gamma: "減衰（γ）",
      mechanism: "メカニズム",
      outcome: "臨床転帰",
    },

    lopezTitle: "実験的検証：López-Martín",
    lopezLead:
      "Q因子モデルの最も直接的な実験的エビデンスは、サンティアゴ・デ・コンポステーラ大学グループ（López-Martín、Carballo-Quintásら、2006〜2011年）による。",
    lopezExperiment: {
      title: "重要な実験",
      setup: "成体ラットにピクロトキシン（GABA-A拮抗薬、γを低下させる）の痙攣閾下用量を投与した後、携帯電話SAR水準のGSM 900 MHz曝露を行った。",
      results: [
        "GSM単独 → けいれんなし（成体脳ではγが十分）",
        "ピクロトキシン単独（この用量では） → けいれんなし（共鳴入力なし）",
        "GSM＋ピクロトキシン → けいれん＋c-Fos発現が新皮質、海馬、視床で確認",
        "パルス変調GSMが連続波より効果的（217 Hzパルスが生物学的共鳴に一致）",
      ],
    },
    lopezInterpretation: {
      title: "Q因子解釈",
      points: [
        "ピクロトキシンがγを低下 → Qが増大 → システムが共鳴感受性範囲に入る",
        "GSMが共鳴入力（ω₀）を供給 → CSD閾値を超過",
        "どちらか一方だけでは不十分――減衰低下と共鳴入力の両方が必要",
        "新生児への予測：新生児脳は内因性にγが低下している（NKCC1 > KCC2）ため、薬理学的GABA低下なしにEMF単独で十分なはずである",
      ],
    },
    lopezPulse: "パルス変調の発見は極めて重要である：生物学的効果は時間平均SARではなく、特定のパルスパターンに依存する。これが、ICNIRP SAR基準値（熱平均に基づく）が生物学的効果を予測できない理由を説明する。",

    pharmTitle: "抗てんかん薬カルシウムマップ",
    pharmLead:
      "すべての主要な抗てんかん薬クラスがBERM経路の構成要素に作用する。これは偶然ではない――てんかんがQ因子メカニズムを通じて作動する場合に予想される結果である。",
    pharmCards: [
      {
        id: "ETHOSUXIMIDE",
        drug: "エトスクシミド",
        drugSub: "欠神てんかんの第一選択薬",
        target: "Cav3.x（T型）遮断",
        bermPath: "直接的T型VGCC遮断",
        conditions: ["欠神てんかん"],
        mechanism: "視床皮質ニューロンのT型Ca²⁺チャネルを遮断 → 3 Hz棘徐波振動を消失させる。最も直接的なQ因子介入：共鳴回路要素を除去する。",
        level: "E",
      },
      {
        id: "GABAPENTIN",
        drug: "ガバペンチン / プレガバリン",
        drugSub: "てんかん、神経障害性疼痛、片頭痛予防",
        target: "α2δ-1（CACNA2D1）遮断",
        bermPath: "VGCC補助サブユニット → シナプス形成制御",
        conditions: ["てんかん", "片頭痛", "神経障害性疼痛"],
        mechanism: "α2δ-1サブユニットを遮断 → シナプスへのVGCC輸送を減少 → 興奮性シナプスが減少 → Qが低下。これがELFプライミングの逆転：ELFがα2δ-1を上方制御する場合、ガバペンチンがそれを逆転させる。",
        level: "E",
      },
      {
        id: "VALPROATE",
        drug: "バルプロ酸（バルプロ酸ナトリウム）",
        drugSub: "広域スペクトル抗てんかん薬、片頭痛予防",
        target: "複数標的：GABA↑、Na⁺遮断、T型Ca²⁺遮断、HDAC阻害",
        bermPath: "多標的γ増大＋Q低下",
        conditions: ["てんかん（全型）", "片頭痛", "双極性障害"],
        mechanism: "GABA作動性抑制を強化（γを増大）かつT型Ca²⁺チャネルを遮断（共鳴回路を減少）。Q因子方程式の両側からの二重作用。",
        level: "E",
      },
      {
        id: "LAMOTRIGINE",
        drug: "ラモトリギン",
        drugSub: "広域スペクトル、双極性障害の維持療法",
        target: "Na⁺チャネル遮断 → グルタミン酸放出↓ → Ca²⁺流入↓",
        bermPath: "シナプス前グルタミン酸 → シナプス後VGCCカスケード",
        conditions: ["てんかん", "双極性障害"],
        mechanism: "電位依存性Na⁺チャネルを遮断 → グルタミン酸放出を減少 → NMDAおよびVGCCを介したシナプス後Ca²⁺流入を減少。興奮性入力減少による間接的Q低下。",
        level: "E",
      },
      {
        id: "PHENOBARBITAL",
        drug: "フェノバルビタール",
        drugSub: "新生児抗けいれん薬の第一選択",
        target: "GABA-A正のアロステリックモジュレーター",
        bermPath: "直接的γ増大",
        conditions: ["新生児けいれん"],
        mechanism: "GABA-A受容体機能を強化 → Cl⁻コンダクタンスを増大 → γを増大 → Qが低下。新生児ではGABAが興奮性（NKCC1 > KCC2）であるため効果が限定的――フェノバルビタールは逆説的に興奮を増大させる可能性がある。",
        level: "E",
      },
      {
        id: "BUMETANIDE",
        drug: "ブメタニド",
        drugSub: "NKCC1遮断薬――塩素スイッチを標的とする",
        target: "NKCC1（SLC12A2）遮断 → 抑制性GABAの回復",
        bermPath: "γを負から正に変換",
        conditions: ["新生児けいれん"],
        mechanism: "NKCC1を遮断 → 細胞内Cl⁻を低下 → GABAが抑制性になる → γが負から正に切り替わる → Qが∞から有限に低下。新生児疾患に対する最も直接的なQ因子介入。",
        level: "E",
      },
      {
        id: "LEVETIRACETAM",
        drug: "レベチラセタム",
        drugSub: "広域スペクトル、SV2Aメカニズム",
        target: "SV2A → 小胞放出調節 → Ca²⁺依存性神経伝達↓",
        bermPath: "シナプス前Ca²⁺依存性小胞放出",
        conditions: ["てんかん（焦点性および全般性）"],
        mechanism: "SV2A（シナプス小胞糖タンパク質2A）に結合 → Ca²⁺依存性神経伝達物質放出を調節 → 興奮性駆動を減少。またN型Ca²⁺チャネルを直接阻害する。",
        level: "E",
      },
      {
        id: "TOPIRAMATE",
        drug: "トピラマート",
        drugSub: "てんかん、片頭痛、群発頭痛予防",
        target: "複数標的：GABA↑、グルタミン酸↓、Ca²⁺電流↓、炭酸脱水酵素",
        bermPath: "多標的γ増大＋共鳴入力減少",
        conditions: ["てんかん", "片頭痛", "群発頭痛"],
        mechanism: "GABA-Aを強化（γ↑）、AMPA/カイニン酸グルタミン酸受容体を遮断（興奮性入力↓）、L型Ca²⁺チャネルを阻害し、炭酸脱水酵素を阻害（pH → Ca²⁺動態）。多経路Q低下。",
        level: "E",
      },
    ],

    sudepTitle: "SUDEPは成人のSIDS",
    sudepLead:
      "てんかんにおける突然予期せぬ死亡（SUDEP）と乳幼児突然死症候群（SIDS）は同じ終末メカニズムを共有する：拡延性脱分極が脳幹に伝播し、心肺停止を引き起こす。唯一の違いはトリガー――てんかん発作 vs. 新生児のQ → ∞状態。",
    sudepVerifications: [
      {
        point: "終末メカニズム",
        sids: "CSD → 脳幹 → 無呼吸 → 心停止",
        sudep: "発作 → CSD → 脳幹 → 無呼吸 → 心停止",
        match: true,
      },
      {
        point: "セロトニン欠乏",
        sids: "脳幹5-HTニューロンの減少（Kinney 2009）",
        sudep: "5-HTシステムの欠陥、CO₂化学受容の障害",
        match: true,
      },
      {
        point: "覚醒障害",
        sids: "低酸素/高炭酸ガスに対する覚醒応答の障害",
        sudep: "発作後全般性EEG抑制（PGES）中の覚醒障害",
        match: true,
      },
      {
        point: "タイミング",
        sids: "睡眠（夜間、ピーク2〜6時）",
        sudep: "睡眠（夜間発作がSUDEPリスク最大）",
        match: true,
      },
      {
        point: "体位",
        sids: "うつ伏せ＝最高リスク",
        sudep: "SUDEP症例の大多数でうつ伏せが発見される",
        match: true,
      },
      {
        point: "Ca²⁺チャネル関与",
        sids: "CACNA1C、CACNA1H、RYR2バリアント",
        sudep: "CACNA1A変異（FHM1/EA2）、L型VGCC拮抗薬が死亡を予防",
        match: true,
      },
      {
        point: "年齢分布",
        sids: "ピーク2〜4ヶ月（Q → ∞期間）",
        sudep: "コントロールされていないけいれんを持つ若年成人にピーク（最高けいれん頻度＝最も頻繁なγ → 0イベント）",
        match: true,
      },
    ],
    sudepHeaders: {
      point: "検証項目",
      sids: "SIDS",
      sudep: "SUDEP",
    },
    sudepConclusion: "L型VGCC拮抗薬がSUDEPマウスモデルにおいてけいれん誘発性死亡を予防する（Cardiovascular Research 2025）。これはCa²⁺チャネル遮断が終末CSDカスケードを予防するという直接的エビデンスである――SIDSに提唱されたのと同じメカニズム。",

    migraineTitle: "片頭痛：メカニズムとしてのCSD",
    migraineLead:
      "皮質拡延性抑制（CSD）――神経細胞の脱分極の波とそれに続く抑制――は片頭痛前兆の確立されたメカニズムであり、三叉神経活性化を介した片頭痛頭痛の主要な駆動因子である。CSDは本質的にCa²⁺依存性プロセスである。",
    migraineMechanism: {
      title: "CSD → 片頭痛カスケード",
      steps: [
        "トリガー（ストレス、睡眠不足、ホルモン変化、またはEMF） → 局所的皮質興奮性の増大",
        "大量の細胞内Ca²⁺上昇 → 3〜5 mm/minの神経細胞脱分極波",
        "CSDが髄膜三叉神経求心線維を活性化 → CGRP放出",
        "CGRP → 血管拡張＋神経原性炎症 → 頭痛",
        "反復CSDエピソード → 末梢および中枢性感作 → 慢性片頭痛",
      ],
    },
    migraineGenetic: {
      title: "遺伝学的証拠：FHM1（CACNA1A）",
      desc: "家族性片麻痺性片頭痛1型はCACNA1A機能獲得変異によって引き起こされる――P/Q型Ca²⁺チャネル機能の亢進 → グルタミン酸放出の増加 → グリアCa²⁺波の伝播 → CSD閾値の低下。FHM1はCa²⁺チャネル機能の亢進が直接片頭痛を引き起こすことを証明する。",
    },
    migraineProphylaxis: {
      title: "すべての片頭痛予防薬はCSDを低減する",
      desc: "効果的な片頭痛予防薬のすべてのクラスがCSD感受性を低減する：β遮断薬（神経細胞興奮性を低下）、バルプロ酸（GABA↑＋T型遮断）、トピラマート（多標的）、アミトリプチリン（Na⁺＋Ca²⁺）、CGRP抗体（下流エフェクターを遮断）。CSD――Ca²⁺依存性プロセス――へのこの収束は、Q因子モデルによって予測される。",
    },
    migraineEmf: "ELFプライミング仮説：慢性ELF曝露がα2δ-1（CACNA2D1）を上方制御 → シナプスのVGCCが増加 → CSD閾値が低下 → 片頭痛感受性が増大。ガバペンチン（α2δ-1遮断薬）は効果的な片頭痛予防薬である――提唱されたELFプライミングメカニズムを直接逆転させる。",

    clusterTitle: "群発頭痛：概日Ca²⁺振動",
    clusterLead:
      "群発頭痛は最も正確にタイミングが定められた神経疾患である――発作は毎日同じ時刻に季節的周期性をもって起こる。この概日性の精密さは視交叉上核（SCN）とそのCa²⁺依存性振動を直接指し示す。",
    clusterProfile: {
      title: "患者プロファイル＝累積Ca²⁺負荷",
      rows: [
        { feature: "男性 3:1", bermLink: "ベースラインCa²⁺負荷が高い（筋肉量、テストステロン → Ca²⁺↑）" },
        { feature: "喫煙者 60〜90%", bermLink: "ニコチン → nAChR → Ca²⁺流入。慢性喫煙＝慢性Ca²⁺負荷" },
        { feature: "発症年齢 ~30歳", bermLink: "約30年間の負荷後に累積Ca²⁺閾値に到達" },
        { feature: "発作 00〜03時", bermLink: "SCN Ca²⁺振動の最低点 → Cav1.2ウィンドウ → 三叉神経活性化" },
        { feature: "季節性（春/秋）", bermLink: "光周期の変化 → CRY感受性のシフト → SCN Ca²⁺振動の位相攪乱" },
        { feature: "アルコールがトリガー", bermLink: "エタノール → 直接的Ca²⁺チャネル調節＋血管拡張＋ヒスタミン" },
        { feature: "RLS合併", bermLink: "レストレスレッグス症候群はCa²⁺/鉄/ドーパミン経路を共有。ガバペンチンが両方を治療する。" },
      ],
    },
    clusterTreatment: {
      title: "治療応答マップ",
      headers: { drug: "薬剤", bermTarget: "BERM標的", efficacy: "有効性", mechanism: "なぜ効くのか" },
      rows: [
        {
          drug: "ベラパミル",
          bermTarget: "L型Ca²⁺チャネル（Cav1.2）遮断",
          efficacy: "第一選択予防薬（240〜960 mg/日）",
          mechanism: "L型VGCCを遮断 → シナプス前CGRP放出を防止 → 概日周期を短縮（Per2時計遺伝子）。直接的Ca²⁺チャネル介入。",
        },
        {
          drug: "メラトニン",
          bermTarget: "MT1/MT2 → Gi → cAMP↓ → Ca²⁺↓",
          efficacy: "有効（10〜25 mg）",
          mechanism: "内因性Ca²⁺拮抗薬。SCN概日振動をリセットする。EMFがCRY経路を介してメラトニンを抑制 → 補充が保護を回復する。",
        },
        {
          drug: "リチウム",
          bermTarget: "GSK3β阻害 → 概日時計の安定化",
          efficacy: "第二選択予防薬",
          mechanism: "Ca²⁺振動下流の概日時計遺伝子（Per2、Bmal1）を安定化。概日周期を延長 → EMF誘発性位相シフトに対抗。",
        },
        {
          drug: "ガバペンチン",
          bermTarget: "α2δ-1（CACNA2D1）遮断",
          efficacy: "有効の可能性あり",
          mechanism: "VGCC補助サブユニットを遮断 → 興奮性シナプス形成を減少。ELFプライミング（α2δ-1の上方制御）を逆転させる。",
        },
        {
          drug: "スマトリプタン",
          bermTarget: "5-HT1B/1D → シナプス前Ca²⁺↓ → CGRP↓",
          efficacy: "急性頓挫療法（皮下注射）",
          mechanism: "シナプス前5-HT1B/1Dを活性化 → Ca²⁺流入を減少 → CGRP放出を遮断。急性症状緩和であり、予防薬ではない。",
        },
        {
          drug: "酸素（100%）",
          bermTarget: "血管収縮＋フリーラジカル消去",
          efficacy: "急性頓挫療法（15 L/min）",
          mechanism: "高流量O₂ → 脳血管収縮 → 三叉神経活性化の減少。またラジカルペアメカニズム（CRY経路）を消去する。",
        },
        {
          drug: "シロシビン",
          bermTarget: "5-HT2A → トリプタミン経路リセット",
          efficacy: "サイケデリック閾下用量で周期を予防",
          mechanism: "トリプタミンマスターリセット：5-HT2Aアゴニズム → 視床皮質ネットワークリセット → SCN概日リセット → Ca²⁺振動周期を断つ。下記トリプタミンリセットセクションを参照。",
        },
      ],
    },

    psilocybinTitle: "トリプタミンリセット：シロシビン",
    psilocybinLead:
      "シロシビン（シロシン / 4-OH-DMT）は5-HT2A受容体アゴニストであり、トリプタミン経路の「マスターリセット」を生じさせる。サイケデリック閾下用量で群発頭痛の周期を予防する――そして非サイケデリックアナログの2-ブロモ-LSD（BOL）も有効であり、これがサイケデリック体験の効果ではなく受容体レベルのメカニズムであることを証明する。",
    psilocybinMechanisms: [
      {
        step: "5-HT2A受容体アゴニズム",
        desc: "シロシンが皮質V層錐体ニューロンの5-HT2Aに結合 → セロトニン自体とは異なるシグナルカスケードを起動（偏向アゴニズム）。これが受容体の下流連結をリセットする。",
      },
      {
        step: "視床皮質ネットワークリセット",
        desc: "皮質と視床における5-HT2A活性化がデフォルトモードネットワークを攪乱 → 視床皮質回路の再編成を可能にする。群発頭痛では、病的振動パターンを断つ。",
      },
      {
        step: "SCN概日リセット",
        desc: "SCNへのセロトニン作動性入力は主要な非光性同調因子である。5-HT2A活性化がSCN Ca²⁺振動位相を再較正する――群発頭痛のタイミングを駆動する同じ振動。",
      },
      {
        step: "5-HT2Aダウンレギュレーション",
        desc: "急性アゴニズム後、5-HT2A受容体は内在化しダウンレギュレートされる。これがサイケデリック閾下用量で効果がある理由であり、薬物クリアランス後も効果が持続する理由である――受容体状態がリセットされる。",
      },
      {
        step: "α2δ-1発現リセット（提唱）",
        desc: "トリプタミン経路がα2δ-1発現（CACNA2D1 → シナプスのVGCC密度）を調節する場合、シロシビンがELFプライミング状態をリセットする可能性がある。これがシロシビンが片頭痛にも有効性を示す理由を説明する――両方ともα2δ-1媒介CSD感受性を共有する。",
      },
    ],
    psilocybinBol: {
      title: "BOL-148：非サイケデリックの証拠",
      desc: "2-ブロモ-LSD（BOL-148）はLSDと同一の5-HT2A結合親和性を持つが非サイケデリック（幻覚作用なし）である。これも群発頭痛の周期を頓挫させる。これは治療メカニズムが受容体レベル――5-HT2A → トリプタミン経路 → 概日リセットを介して――作動し、サイケデリック体験自体を介さないことを証明する。",
    },

    csdTitle: "皮質拡延性脱分極：統合メカニズム",
    csdLead:
      "CSDは四つの疾患すべてに共通する終末経路である。Q因子がCSDが誘発されるか、どこまで伝播するか、脳幹に到達するかを決定する。",
    csdTable: [
      { condition: "SIDS", trigger: "EMF＋Q→∞（新生児）", propagation: "脳幹全体", outcome: "致死性", prevented: "ブメタニド（γ回復）、EMF低減" },
      { condition: "SUDEP", trigger: "発作 → 一過性Qスパイク", propagation: "脳幹全体", outcome: "致死性", prevented: "L型VGCC拮抗薬、けいれん管理" },
      { condition: "てんかん", trigger: "低γ＋焦点性興奮性", propagation: "皮質性（限局）", outcome: "けいれん", prevented: "エトスクシミド、バルプロ酸、ブメタニド" },
      { condition: "片頭痛", trigger: "CSD閾値超過", propagation: "皮質性（脳溝で停止）", outcome: "前兆＋頭痛", prevented: "ガバペンチン、バルプロ酸、トピラマート" },
      { condition: "群発頭痛", trigger: "SCN Ca²⁺振動 → 三叉神経", propagation: "視床下部 → 三叉神経", outcome: "片側性疼痛", prevented: "ベラパミル、シロシビン、メラトニン" },
    ],
    csdHeaders: { condition: "疾患", trigger: "CSDトリガー", propagation: "伝播", outcome: "転帰", prevented: "予防薬" },

    pharmTargetLabel: "標的",
    pharmBermPathLabel: "BERM経路",
    pharmConditionsLabel: "適応症",
    pharmMechanismLabel: "メカニズム",
    predictionDesc: "Q因子スペクトラムモデルは、片頭痛の有病率、CSD閾値、群発頭痛のEMF曝露、SUDEPリスク、シロシビンの有効性、および新生児動物モデルをカバーする6つの検証可能な予測を生成する。",
    predictionLink: "神経学的スペクトラム予測を参照（NEURO-EMF-1 〜 NEURO-EMF-6）",
    predictionHref: "/predictions",
  },

  fr: {
    title: "Spectre neurologique : Epilepsie, migraine, algie vasculaire de la face",
    subtitle:
      "Un seul mecanisme de facteur Q, quatre troubles neurologiques. Le SMIN, l'epilepsie, la migraine et l'algie vasculaire de la face partagent la meme cascade de depolarisation propagee — la seule difference est le coefficient d'amortissement γ. Ceci est une hypothese integrant les preuves existantes — pas une explication prouvee.",
    backLink: "← Retour aux preuves",

    cautionText:
      "Cette section unifie quatre affections neurologiques sous un mecanisme commun d'oscillation dependant du calcium. Il s'agit d'un cadre theorique integrant des preuves experimentales et cliniques publiees — pas de directives medicales etablies. Les traitements standard actuels pour l'epilepsie, la migraine et l'algie vasculaire de la face restent appropries.",

    spectrumTitle: "Le spectre du facteur Q",
    spectrumLead:
      "Les quatre affections se cartographient sur un seul modele d'oscillateur amorti : Q = ω₀ / (2γ), ou γ est l'amortissement GABAergique net. Lorsque γ diminue, Q augmente, et le systeme devient plus susceptible a la depolarisation propagee induite par resonance (CSD).",
    spectrumRows: [
      {
        condition: "Cerveau neonatal (plage SMIN)",
        q: "Q → ∞",
        gamma: "γ < 0",
        mechanism: "GABA excitateur (NKCC1 > KCC2). Pas d'amortissement — toute entree resonante s'amplifie sans limite.",
        outcome: "CSD fatale → tronc cerebral → arret cardiorespiratoire",
      },
      {
        condition: "Convulsions neonatales (KCNQ2/CACNA1H)",
        q: "Q ~ 50–100",
        gamma: "γ ≈ 0",
        mechanism: "Mutation de canal + GABA immature = amortissement quasi nul. Les convulsions remettent a mesure que KCC2 mature (3–6 mois).",
        outcome: "Convulsions non fatales, remission spontanee",
      },
      {
        condition: "Epilepsie-absence de l'enfance",
        q: "Q ~ 20–50",
        gamma: "γ bas",
        mechanism: "Circuits de fuseaux de sommeil Cav3.2 (type T) thalamiques. L'ethosuximide bloque le type T → arret des crises.",
        outcome: "Pointe-onde 3 Hz, breve perte de conscience",
      },
      {
        condition: "SUDEP",
        q: "Q ~ 30–80",
        gamma: "γ ≈ 0 (ictal)",
        mechanism: "Crise → effondrement transitoire de γ → la CSD se propage au tronc cerebral. Meme mecanisme que le SMIN dans un cerveau plus age.",
        outcome: "CSD fatale → tronc cerebral → arret cardiorespiratoire",
      },
      {
        condition: "Migraine avec aura",
        q: "Q ~ 5–15",
        gamma: "γ modere",
        mechanism: "La CSD se propage a travers le cortex a 3–5 mm/min. S'arrete aux sillons (amortissement partiel). CACNA1A (FHM1) GoF abaisse le seuil.",
        outcome: "Aura visuelle, cephalee par activation trigeminale-CGRP",
      },
      {
        condition: "Algie vasculaire de la face",
        q: "Q ~ 10–20",
        gamma: "γ dependant du rythme circadien",
        mechanism: "Oscillation Ca²⁺ hypothalamique verrouilee en phase sur le cycle circadien. SCN → Cav1.2 → liberation de CGRP. Le verapamil (bloqueur de type L) est le traitement de premiere intention.",
        outcome: "Activation trigeminale-autonome unilaterale, 00–03 h",
      },
      {
        condition: "Cerveau adulte normal",
        q: "Q ~ 1–5",
        gamma: "γ > 0 (robuste)",
        mechanism: "Dominance mature de KCC2 → GABA inhibiteur → oscillations amorties en 2–3 cycles.",
        outcome: "Pas d'oscillation pathologique",
      },
    ],
    spectrumHeaders: {
      condition: "Affection",
      q: "Facteur Q",
      gamma: "Amortissement (γ)",
      mechanism: "Mecanisme",
      outcome: "Issue clinique",
    },

    lopezTitle: "Validation experimentale : Lopez-Martin",
    lopezLead:
      "La preuve experimentale la plus directe du modele du facteur Q provient du groupe de l'Universite de Santiago de Compostela (Lopez-Martin, Carballo-Quintas et al., 2006–2011).",
    lopezExperiment: {
      title: "L'experience cle",
      setup: "Des rats adultes ont recu des doses subconvulsives de picrotoxine (antagoniste GABA-A, reduit γ) suivies d'une exposition GSM 900 MHz aux niveaux DAS des telephones portables.",
      results: [
        "GSM seul → pas de convulsions (γ suffisant dans le cerveau adulte)",
        "Picrotoxine seule (a cette dose) → pas de convulsions (pas d'entree resonante)",
        "GSM + picrotoxine → convulsions + expression de c-Fos dans le neocortex, l'hippocampe, le thalamus",
        "Le GSM module en impulsions est plus efficace que l'onde continue (la pulsation de 217 Hz correspond a la resonance biologique)",
      ],
    },
    lopezInterpretation: {
      title: "Interpretation par le facteur Q",
      points: [
        "La picrotoxine reduit γ → Q augmente → le systeme entre dans la zone de susceptibilite a la resonance",
        "Le GSM fournit l'entree resonante (ω₀) → le seuil de CSD est depasse",
        "Aucun des deux seul n'est suffisant — il faut a la fois un amortissement reduit ET une entree resonante",
        "Prediction neonatale : le cerveau neonatal a un γ endogenement reduit (NKCC1 > KCC2), donc l'EMF seul devrait suffire sans reduction pharmacologique du GABA",
      ],
    },
    lopezPulse: "La decouverte de la modulation par impulsions est critique : l'effet biologique depend du patron de pulsation specifique, pas seulement du DAS moyen dans le temps. Cela explique pourquoi les limites DAS de l'ICNIRP (basees sur la moyenne thermique) ne predisent pas les effets biologiques.",

    pharmTitle: "Carte calcique des antiepileptiques",
    pharmLead:
      "Chaque grande classe d'antiepileptique agit sur un composant de la voie BERM. Ce n'est pas une coincidence — c'est le resultat attendu si l'epilepsie fonctionne par le mecanisme du facteur Q.",
    pharmCards: [
      {
        id: "ETHOSUXIMIDE",
        drug: "Ethosuximide",
        drugSub: "Premiere intention pour l'epilepsie-absence",
        target: "Blocage Cav3.x (type T)",
        bermPath: "Blocage direct des VGCC de type T",
        conditions: ["Epilepsie-absence"],
        mechanism: "Bloque les canaux Ca²⁺ de type T dans les neurones thalamocorticaux → elimine l'oscillation pointe-onde 3 Hz. L'intervention la plus directe sur le facteur Q : supprime l'element du circuit resonant.",
        level: "E",
      },
      {
        id: "GABAPENTIN",
        drug: "Gabapentine / Pregabaline",
        drugSub: "Epilepsie, douleur neuropathique, prophylaxie migraineuse",
        target: "Blocage α2δ-1 (CACNA2D1)",
        bermPath: "Sous-unite auxiliaire VGCC → controle de la synaptogenese",
        conditions: ["Epilepsie", "Migraine", "Douleur neuropathique"],
        mechanism: "Bloque la sous-unite α2δ-1 → reduit le trafic des VGCC vers les synapses → moins de synapses excitatrices → Q diminue. C'est l'inversion de l'amorcage ELF : si l'ELF regule α2δ-1 a la hausse, la gabapentine l'inverse.",
        level: "E",
      },
      {
        id: "VALPROATE",
        drug: "Valproate (acide valproique)",
        drugSub: "Antiepileptique a large spectre, prophylaxie migraineuse",
        target: "Cibles multiples : GABA↑, blocage Na⁺, blocage Ca²⁺ type T, inhibition HDAC",
        bermPath: "Augmentation multi-cibles de γ + diminution de Q",
        conditions: ["Epilepsie (tous types)", "Migraine", "Trouble bipolaire"],
        mechanism: "Renforce l'inhibition GABAergique (augmente γ) ET bloque les canaux Ca²⁺ de type T (reduit le circuit resonant). Double action sur l'equation du facteur Q des deux cotes.",
        level: "E",
      },
      {
        id: "LAMOTRIGINE",
        drug: "Lamotrigine",
        drugSub: "Large spectre, traitement d'entretien bipolaire",
        target: "Blocage des canaux Na⁺ → liberation de glutamate↓ → influx de Ca²⁺↓",
        bermPath: "Glutamate presynaptique → cascade VGCC postsynaptique",
        conditions: ["Epilepsie", "Trouble bipolaire"],
        mechanism: "Bloque les canaux Na⁺ voltage-dependants → reduit la liberation de glutamate → reduit l'entree postsynaptique de Ca²⁺ via NMDA et VGCC. Reduction indirecte de Q par reduction de l'entree excitatrice.",
        level: "E",
      },
      {
        id: "PHENOBARBITAL",
        drug: "Phenobarbital",
        drugSub: "Anticonvulsivant neonatal de premiere intention",
        target: "Modulateur allosterique positif GABA-A",
        bermPath: "Augmentation directe de γ",
        conditions: ["Convulsions neonatales"],
        mechanism: "Renforce la fonction du recepteur GABA-A → augmente la conductance Cl⁻ → augmente γ → Q diminue. Chez les nouveau-nes, l'efficacite est limitee car le GABA est excitateur (NKCC1 > KCC2) — le phenobarbital peut paradoxalement augmenter l'excitation.",
        level: "E",
      },
      {
        id: "BUMETANIDE",
        drug: "Bumetanide",
        drugSub: "Bloqueur NKCC1 — cible le commutateur chlorure",
        target: "Blocage NKCC1 (SLC12A2) → restaure le GABA inhibiteur",
        bermPath: "Convertit γ de negatif a positif",
        conditions: ["Convulsions neonatales"],
        mechanism: "Bloque NKCC1 → abaisse le Cl⁻ intracellulaire → le GABA devient inhibiteur → γ passe de negatif a positif → Q chute de ∞ a fini. L'intervention la plus directe sur le facteur Q pour les affections neonatales.",
        level: "E",
      },
      {
        id: "LEVETIRACETAM",
        drug: "Levetiracetam",
        drugSub: "Large spectre, mecanisme SV2A",
        target: "SV2A → modulation de la liberation vesiculaire → neurotransmission Ca²⁺-dependante↓",
        bermPath: "Liberation vesiculaire presynaptique Ca²⁺-dependante",
        conditions: ["Epilepsie (focale et generalisee)"],
        mechanism: "Se lie a SV2A (glycoproteine vesiculaire synaptique 2A) → module la liberation de neurotransmetteurs Ca²⁺-dependante → reduit la commande excitatrice. Inhibe aussi directement les canaux Ca²⁺ de type N.",
        level: "E",
      },
      {
        id: "TOPIRAMATE",
        drug: "Topiramate",
        drugSub: "Epilepsie, migraine, prophylaxie de l'algie vasculaire de la face",
        target: "Cibles multiples : GABA↑, glutamate↓, courant Ca²⁺↓, anhydrase carbonique",
        bermPath: "Augmentation multi-cibles de γ + diminution de l'entree resonante",
        conditions: ["Epilepsie", "Migraine", "Algie vasculaire de la face"],
        mechanism: "Renforce GABA-A (γ↑), bloque les recepteurs glutamate AMPA/kainate (entree excitatrice↓), inhibe les canaux Ca²⁺ de type L, et inhibe l'anhydrase carbonique (pH → dynamique Ca²⁺). Reduction de Q multi-voies.",
        level: "E",
      },
    ],

    sudepTitle: "La SUDEP est le SMIN de l'adulte",
    sudepLead:
      "La mort subite inattendue en epilepsie (SUDEP) et le syndrome de mort inattendue du nourrisson (SMIN) partagent le meme mecanisme terminal : la depolarisation propagee se propageant au tronc cerebral, causant un arret cardiorespiratoire. La seule difference est le declencheur — une crise epileptique vs. l'etat neonatal Q → ∞.",
    sudepVerifications: [
      {
        point: "Mecanisme terminal",
        sids: "CSD → tronc cerebral → apnee → arret cardiaque",
        sudep: "Crise → CSD → tronc cerebral → apnee → arret cardiaque",
        match: true,
      },
      {
        point: "Deficit en serotonine",
        sids: "Neurones 5-HT du tronc cerebral reduits (Kinney 2009)",
        sudep: "Defauts du systeme 5-HT, echec de la chemoreception au CO₂",
        match: true,
      },
      {
        point: "Echec de l'eveil",
        sids: "Reponse d'eveil echouee a l'hypoxie/hypercapnie",
        sudep: "Eveil echoue pendant la suppression EEG generalisee post-ictale (PGES)",
        match: true,
      },
      {
        point: "Chronologie",
        sids: "Sommeil (nocturne, pic 2–6 h)",
        sudep: "Sommeil (crises nocturnes = risque SUDEP maximal)",
        match: true,
      },
      {
        point: "Position",
        sids: "Decubitus ventral = risque maximal",
        sudep: "Decubitus ventral trouve dans la majorite des cas de SUDEP",
        match: true,
      },
      {
        point: "Implication des canaux Ca²⁺",
        sids: "Variants CACNA1C, CACNA1H, RYR2",
        sudep: "Mutations CACNA1A (FHM1/EA2), l'antagoniste des VGCC de type L previent le deces",
        match: true,
      },
      {
        point: "Distribution par age",
        sids: "Pic a 2–4 mois (periode Q → ∞)",
        sudep: "Pic chez les jeunes adultes avec crises non controlees (frequence de crises maximale = evenements γ → 0 les plus frequents)",
        match: true,
      },
    ],
    sudepHeaders: {
      point: "Point de verification",
      sids: "SMIN",
      sudep: "SUDEP",
    },
    sudepConclusion: "L'antagoniste des VGCC de type L previent la mort induite par les crises dans les modeles murins de SUDEP (Cardiovascular Research 2025). C'est une preuve directe que le blocage des canaux Ca²⁺ previent la cascade CSD terminale — le meme mecanisme propose pour le SMIN.",

    migraineTitle: "Migraine : la CSD comme mecanisme",
    migraineLead:
      "La depression corticale propagee (CSD) — une vague de depolarisation neuronale suivie d'une suppression — est le mecanisme etabli de l'aura migraineuse et un moteur cle de la cephalee migraineuse par activation trigeminale. La CSD est fondamentalement un processus Ca²⁺-dependant.",
    migraineMechanism: {
      title: "La cascade CSD → migraine",
      steps: [
        "Declencheur (stress, privation de sommeil, changement hormonal ou EMF) → augmentation locale de l'excitabilite corticale",
        "Elevation massive du Ca²⁺ intracellulaire → onde de depolarisation neuronale a 3–5 mm/min",
        "La CSD active les afferences trigeminales meningees → liberation de CGRP",
        "CGRP → vasodilatation + inflammation neurogenique → douleur cephaleique",
        "Episodes de CSD repetes → sensibilisation peripherique et centrale → migraine chronique",
      ],
    },
    migraineGenetic: {
      title: "Preuve genetique : FHM1 (CACNA1A)",
      desc: "La migraine hemiplegique familiale de type 1 est causee par des mutations gain-de-fonction de CACNA1A — fonction accrue du canal Ca²⁺ de type P/Q → liberation accrue de glutamate → propagation de l'onde Ca²⁺ gliale → seuil de CSD abaisse. FHM1 prouve que l'augmentation de la fonction des canaux Ca²⁺ cause directement la migraine.",
    },
    migraineProphylaxis: {
      title: "Tous les preventifs de la migraine reduisent la CSD",
      desc: "Chaque classe de prophylactique migraineux efficace reduit la susceptibilite a la CSD : beta-bloquants (reduisent l'excitabilite neuronale), valproate (GABA↑ + blocage type T), topiramate (multi-cibles), amitriptyline (Na⁺ + Ca²⁺), anticorps anti-CGRP (bloquent l'effecteur en aval). Cette convergence sur la CSD — un processus Ca²⁺-dependant — est predite par le modele du facteur Q.",
    },
    migraineEmf: "Hypothese d'amorcage ELF : l'exposition chronique aux ELF regule α2δ-1 (CACNA2D1) a la hausse → plus de VGCC aux synapses → seuil de CSD abaisse → susceptibilite migraineuse accrue. La gabapentine (bloqueur α2δ-1) est un preventif migraineux efficace — elle inverse directement le mecanisme d'amorcage ELF propose.",

    clusterTitle: "Algie vasculaire de la face : oscillation Ca²⁺ circadienne",
    clusterLead:
      "L'algie vasculaire de la face est le trouble neurologique le plus precisement synchronise — les crises surviennent a la meme heure chaque jour, avec une periodicite saisonniere. Cette precision circadienne pointe directement vers le noyau suprachiasmatique (SCN) et son oscillation Ca²⁺-dependante.",
    clusterProfile: {
      title: "Profil du patient = charge Ca²⁺ cumulative",
      rows: [
        { feature: "Homme 3:1", bermLink: "Charge Ca²⁺ basale plus elevee (masse musculaire, testosterone → Ca²⁺↑)" },
        { feature: "Fumeur 60–90 %", bermLink: "Nicotine → nAChR → influx Ca²⁺. Tabagisme chronique = charge Ca²⁺ chronique" },
        { feature: "Debut ~30 ans", bermLink: "Seuil Ca²⁺ cumulatif atteint apres ~30 ans de charge" },
        { feature: "Crises 00–03 h", bermLink: "Nadir de l'oscillation Ca²⁺ du SCN → fenetre Cav1.2 → activation trigeminale" },
        { feature: "Saisonniere (printemps/automne)", bermLink: "Changement de photoperiode → decalage de la sensibilite CRY → perturbation de phase de l'oscillation Ca²⁺ du SCN" },
        { feature: "Alcool declencheur", bermLink: "Ethanol → modulation directe des canaux Ca²⁺ + vasodilatation + histamine" },
        { feature: "Comorbidite SJSR", bermLink: "Le syndrome des jambes sans repos partage la voie Ca²⁺/fer/dopamine. La gabapentine traite les deux." },
      ],
    },
    clusterTreatment: {
      title: "Carte de reponse therapeutique",
      headers: { drug: "Medicament", bermTarget: "Cible BERM", efficacy: "Efficacite", mechanism: "Pourquoi ca fonctionne" },
      rows: [
        {
          drug: "Verapamil",
          bermTarget: "Blocage canal Ca²⁺ type L (Cav1.2)",
          efficacy: "Preventif de premiere intention (240–960 mg/jour)",
          mechanism: "Bloque les VGCC de type L → empeche la liberation presynaptique de CGRP → raccourcit la periode circadienne (gene horloge Per2). Intervention directe sur les canaux Ca²⁺.",
        },
        {
          drug: "Melatonine",
          bermTarget: "MT1/MT2 → Gi → AMPc↓ → Ca²⁺↓",
          efficacy: "Efficace (10–25 mg)",
          mechanism: "Antagoniste Ca²⁺ endogene. Reinitialise l'oscillation circadienne du SCN. L'EMF supprime la melatonine via la voie CRY → la supplementation restaure la protection.",
        },
        {
          drug: "Lithium",
          bermTarget: "Inhibition de GSK3β → stabilisation de l'horloge circadienne",
          efficacy: "Preventif de deuxieme intention",
          mechanism: "Stabilise les genes de l'horloge circadienne (Per2, Bmal1) en aval de l'oscillation Ca²⁺. Allonge la periode circadienne → contrecarre le dephasage induit par l'EMF.",
        },
        {
          drug: "Gabapentine",
          bermTarget: "Blocage α2δ-1 (CACNA2D1)",
          efficacy: "Possiblement efficace",
          mechanism: "Bloque la sous-unite auxiliaire des VGCC → reduit la synaptogenese excitatrice. Inverse l'amorcage ELF (regulation a la hausse de α2δ-1).",
        },
        {
          drug: "Sumatriptan",
          bermTarget: "5-HT1B/1D → Ca²⁺ presynaptique↓ → CGRP↓",
          efficacy: "Traitement abortif aigu (injection SC)",
          mechanism: "Active les 5-HT1B/1D presynaptiques → reduit l'entree de Ca²⁺ → bloque la liberation de CGRP. Soulagement aigu des symptomes, pas preventif.",
        },
        {
          drug: "Oxygene (100 %)",
          bermTarget: "Vasoconstriction + extinction des radicaux libres",
          efficacy: "Traitement abortif aigu (15 L/min)",
          mechanism: "O₂ haut debit → vasoconstriction cerebrale → reduction de l'activation trigeminale. Eteint aussi le mecanisme de paire radicalaire (voie CRY).",
        },
        {
          drug: "Psilocybine",
          bermTarget: "5-HT2A → reinitialisation de la voie tryptamine",
          efficacy: "Doses sub-psychedeliques previennent les cycles",
          mechanism: "Reinitialisation maitre tryptamine : agonisme 5-HT2A → reinitialisation du reseau thalamocortical → reinitialisation circadienne du SCN → rompt le cycle d'oscillation Ca²⁺. Voir section reinitialisation tryptamine ci-dessous.",
        },
      ],
    },

    psilocybinTitle: "La reinitialisation tryptamine : psilocybine",
    psilocybinLead:
      "La psilocybine (psilocine / 4-OH-DMT) est un agoniste du recepteur 5-HT2A qui produit une « reinitialisation maitre » de la voie tryptamine. Des doses sub-psychedeliques previennent les cycles d'algie vasculaire de la face — et l'analogue non psychedelique 2-bromo-LSD (BOL) fonctionne aussi, prouvant qu'il s'agit d'un mecanisme au niveau des recepteurs, pas d'un effet de l'experience psychedelique.",
    psilocybinMechanisms: [
      {
        step: "Agonisme du recepteur 5-HT2A",
        desc: "La psilocine se lie au 5-HT2A sur les neurones pyramidaux de la couche V corticale → declenche une cascade de signalisation distincte de la serotonine elle-meme (agonisme biaise). Cela reinitialise le couplage en aval du recepteur.",
      },
      {
        step: "Reinitialisation du reseau thalamocortical",
        desc: "L'activation 5-HT2A dans le cortex et le thalamus perturbe le reseau du mode par defaut → permet la reorganisation des circuits thalamocorticaux. Dans l'algie vasculaire de la face, cela rompt le patron d'oscillation pathologique.",
      },
      {
        step: "Reinitialisation circadienne du SCN",
        desc: "L'entree serotoninergique au SCN est un synchroniseur non photique majeur. L'activation 5-HT2A recalibre la phase d'oscillation Ca²⁺ du SCN — la meme oscillation qui gouverne la chronologie de l'algie vasculaire de la face.",
      },
      {
        step: "Regulation a la baisse du 5-HT2A",
        desc: "Apres l'agonisme aigu, les recepteurs 5-HT2A s'internalisent et se regulen a la baisse. C'est pourquoi les doses sub-psychedeliques fonctionnent et pourquoi les effets persistent longtemps apres l'elimination du medicament — l'etat du recepteur est reinitialise.",
      },
      {
        step: "Reinitialisation de l'expression de α2δ-1 (proposee)",
        desc: "Si la voie tryptamine module l'expression de α2δ-1 (CACNA2D1 → densite VGCC aux synapses), la psilocybine pourrait reinitialiser l'etat d'amorcage ELF. Cela expliquerait pourquoi la psilocybine montre aussi une efficacite dans la migraine — les deux partagent la susceptibilite a la CSD mediee par α2δ-1.",
      },
    ],
    psilocybinBol: {
      title: "BOL-148 : la preuve non psychedelique",
      desc: "Le 2-bromo-LSD (BOL-148) a une affinite de liaison au 5-HT2A identique a celle du LSD mais est non psychedelique (pas d'effet hallucinogene). Il met aussi fin aux cycles d'algie vasculaire de la face. Cela prouve que le mecanisme therapeutique opere au niveau des recepteurs — via 5-HT2A → voie tryptamine → reinitialisation circadienne — pas par l'experience psychedelique elle-meme.",
    },

    csdTitle: "Depolarisation corticale propagee : le mecanisme unificateur",
    csdLead:
      "La CSD est la voie terminale commune aux quatre affections. Le facteur Q determine si la CSD est declenchee, jusqu'ou elle se propage, et si elle atteint le tronc cerebral.",
    csdTable: [
      { condition: "SMIN", trigger: "EMF + Q→∞ (neonatal)", propagation: "Tronc cerebral complet", outcome: "Fatal", prevented: "Bumetanide (restauration de γ), reduction EMF" },
      { condition: "SUDEP", trigger: "Crise → pic transitoire de Q", propagation: "Tronc cerebral complet", outcome: "Fatal", prevented: "Antagoniste VGCC type L, controle des crises" },
      { condition: "Epilepsie", trigger: "γ bas + excitabilite focale", propagation: "Corticale (limitee)", outcome: "Crise", prevented: "Ethosuximide, valproate, bumetanide" },
      { condition: "Migraine", trigger: "Seuil CSD depasse", propagation: "Corticale (s'arrete aux sillons)", outcome: "Aura + cephalee", prevented: "Gabapentine, valproate, topiramate" },
      { condition: "Algie vasculaire", trigger: "Oscillation Ca²⁺ SCN → trigeminale", propagation: "Hypothalamique → trigeminale", outcome: "Douleur unilaterale", prevented: "Verapamil, psilocybine, melatonine" },
    ],
    csdHeaders: { condition: "Affection", trigger: "Declencheur CSD", propagation: "Propagation", outcome: "Issue", prevented: "Prevenue par" },

    pharmTargetLabel: "Cible",
    pharmBermPathLabel: "Voie BERM",
    pharmConditionsLabel: "Indications",
    pharmMechanismLabel: "Mecanisme",
    predictionDesc: "Le modele du spectre du facteur Q genere six predictions testables couvrant la prevalence de la migraine, le seuil de CSD, l'exposition EMF de l'algie vasculaire de la face, le risque de SUDEP, l'efficacite de la psilocybine et un modele animal neonatal.",
    predictionLink: "Voir les predictions du spectre neurologique (NEURO-EMF-1 a NEURO-EMF-6)",
    predictionHref: "/predictions",
  },

  ko: {
    title: "신경학적 스펙트럼: 간질, 편두통, 군발두통",
    subtitle:
      "하나의 Q인자 메커니즘, 네 가지 신경 질환. SIDS, 간질, 편두통, 군발두통은 동일한 확산성 탈분극 캐스케이드를 공유한다 — 유일한 차이는 감쇠 계수 γ이다. 이것은 기존 근거를 통합하는 가설이며, 입증된 설명이 아니다.",
    backLink: "← 증거로 돌아가기",

    cautionText:
      "이 섹션은 네 가지 신경 질환을 공통의 칼슘 의존성 진동 메커니즘 아래 통합한다. 이것은 발표된 실험적 및 임상적 근거를 통합하는 이론적 프레임워크이며, 확립된 의학적 지침이 아니다. 간질, 편두통, 군발두통에 대한 현행 표준 치료는 여전히 적절하다.",

    spectrumTitle: "Q인자 스펙트럼",
    spectrumLead:
      "네 가지 질환 모두 단일 감쇠 진동자 모델에 매핑된다: Q = ω₀ / (2γ), 여기서 γ는 순 GABA성 감쇠이다. γ가 감소하면 Q가 증가하고, 시스템은 공명 구동 확산성 탈분극(CSD)에 더 취약해진다.",
    spectrumRows: [
      {
        condition: "신생아 뇌(SIDS 범위)",
        q: "Q → ∞",
        gamma: "γ < 0",
        mechanism: "GABA가 흥분성(NKCC1 > KCC2). 감쇠 없음 — 모든 공명 입력이 무제한 증폭된다.",
        outcome: "치명적 CSD → 뇌간 → 심폐정지",
      },
      {
        condition: "신생아 경련(KCNQ2/CACNA1H)",
        q: "Q ~ 50–100",
        gamma: "γ ≈ 0",
        mechanism: "채널 변이 + 미성숙 GABA = 거의 제로 감쇠. KCC2 성숙(3~6개월)과 함께 경련이 관해된다.",
        outcome: "비치명적 경련, 자발적 관해",
      },
      {
        condition: "소아 결석 간질",
        q: "Q ~ 20–50",
        gamma: "γ 낮음",
        mechanism: "시상 Cav3.2(T형) 수면 방추 회로. 에토숙시미드가 T형을 차단 → 발작 중단.",
        outcome: "3 Hz 극서파, 짧은 의식소실",
      },
      {
        condition: "SUDEP",
        q: "Q ~ 30–80",
        gamma: "γ ≈ 0(발작 시)",
        mechanism: "발작 → 일시적 γ 붕괴 → CSD가 뇌간으로 전파. 성숙 뇌에서의 SIDS와 동일한 메커니즘.",
        outcome: "치명적 CSD → 뇌간 → 심폐정지",
      },
      {
        condition: "전조가 있는 편두통",
        q: "Q ~ 5–15",
        gamma: "γ 중등도",
        mechanism: "CSD가 피질을 3~5 mm/min로 전파. 뇌고랑에서 정지(부분 감쇠). CACNA1A(FHM1) GoF가 역치를 낮춘다.",
        outcome: "시각 전조, 삼차신경-CGRP 활성화에 의한 두통",
      },
      {
        condition: "군발두통",
        q: "Q ~ 10–20",
        gamma: "γ 일주기 의존",
        mechanism: "시상하부 Ca²⁺ 진동이 일주기 주기에 위상 동기. SCN → Cav1.2 → CGRP 방출. 베라파밀(L형 차단제)이 1차 치료제.",
        outcome: "편측 삼차신경-자율신경 활성화, 00~03시",
      },
      {
        condition: "정상 성인 뇌",
        q: "Q ~ 1–5",
        gamma: "γ > 0(견고)",
        mechanism: "성숙 KCC2 우세 → GABA 억제성 → 진동이 2~3주기 내에 감쇠.",
        outcome: "병적 진동 없음",
      },
    ],
    spectrumHeaders: {
      condition: "질환",
      q: "Q인자",
      gamma: "감쇠(γ)",
      mechanism: "메커니즘",
      outcome: "임상 결과",
    },

    lopezTitle: "실험적 검증: Lopez-Martin",
    lopezLead:
      "Q인자 모델에 대한 가장 직접적인 실험적 근거는 산티아고 데 콤포스텔라 대학 그룹(Lopez-Martin, Carballo-Quintas 등, 2006~2011)에서 나왔다.",
    lopezExperiment: {
      title: "핵심 실험",
      setup: "성체 쥐에 경련역하 용량의 피크로톡신(GABA-A 길항제, γ를 감소시킴)을 투여한 후 휴대전화 SAR 수준의 GSM 900 MHz에 노출했다.",
      results: [
        "GSM 단독 → 경련 없음(성체 뇌에서 γ가 충분)",
        "피크로톡신 단독(이 용량에서) → 경련 없음(공명 입력 없음)",
        "GSM + 피크로톡신 → 경련 + 신피질, 해마, 시상에서 c-Fos 발현",
        "펄스 변조 GSM이 연속파보다 효과적(217 Hz 펄스가 생물학적 공명에 일치)",
      ],
    },
    lopezInterpretation: {
      title: "Q인자 해석",
      points: [
        "피크로톡신이 γ를 감소 → Q가 증가 → 시스템이 공명 취약 범위에 진입",
        "GSM이 공명 입력(ω₀)을 제공 → CSD 역치 초과",
        "어느 하나만으로는 불충분 — 감소된 감쇠와 공명 입력 모두 필요",
        "신생아 예측: 신생아 뇌는 내인성으로 γ가 감소되어 있으므로(NKCC1 > KCC2), 약리학적 GABA 감소 없이 EMF만으로도 충분해야 한다",
      ],
    },
    lopezPulse: "펄스 변조 발견은 매우 중요하다: 생물학적 효과는 시간평균 SAR이 아니라 특정 펄스 패턴에 의존한다. 이것이 ICNIRP SAR 한도(열 평균에 기반)가 생물학적 효과를 예측하지 못하는 이유를 설명한다.",

    pharmTitle: "항간질약 칼슘 맵",
    pharmLead:
      "모든 주요 항간질약 클래스가 BERM 경로 구성요소에 작용한다. 이것은 우연이 아니다 — 간질이 Q인자 메커니즘을 통해 작동할 경우 예상되는 결과이다.",
    pharmCards: [
      {
        id: "ETHOSUXIMIDE",
        drug: "에토숙시미드",
        drugSub: "결석 간질 1차 치료제",
        target: "Cav3.x(T형) 차단",
        bermPath: "직접적 T형 VGCC 차단",
        conditions: ["결석 간질"],
        mechanism: "시상피질 뉴런의 T형 Ca²⁺ 채널을 차단 → 3 Hz 극서파 진동을 소멸시킨다. 가장 직접적인 Q인자 개입: 공명 회로 요소를 제거한다.",
        level: "E",
      },
      {
        id: "GABAPENTIN",
        drug: "가바펜틴 / 프레가발린",
        drugSub: "간질, 신경병성 통증, 편두통 예방",
        target: "α2δ-1(CACNA2D1) 차단",
        bermPath: "VGCC 보조 서브유닛 → 시냅스 형성 조절",
        conditions: ["간질", "편두통", "신경병성 통증"],
        mechanism: "α2δ-1 서브유닛을 차단 → 시냅스로의 VGCC 수송 감소 → 흥분성 시냅스 감소 → Q가 감소. 이것이 ELF 프라이밍의 역전: ELF가 α2δ-1을 상향 조절하면, 가바펜틴이 이를 역전시킨다.",
        level: "E",
      },
      {
        id: "VALPROATE",
        drug: "발프로산(발프로산나트륨)",
        drugSub: "광범위 항간질약, 편두통 예방",
        target: "다중 표적: GABA↑, Na⁺ 차단, T형 Ca²⁺ 차단, HDAC 억제",
        bermPath: "다중 표적 γ 증가 + Q 감소",
        conditions: ["간질(모든 유형)", "편두통", "양극성 장애"],
        mechanism: "GABA성 억제를 강화(γ 증가)하고 T형 Ca²⁺ 채널을 차단(공명 회로 감소). Q인자 방정식 양쪽에 대한 이중 작용.",
        level: "E",
      },
      {
        id: "LAMOTRIGINE",
        drug: "라모트리진",
        drugSub: "광범위, 양극성 장애 유지 치료",
        target: "Na⁺ 채널 차단 → 글루타메이트 방출↓ → Ca²⁺ 유입↓",
        bermPath: "시냅스전 글루타메이트 → 시냅스후 VGCC 캐스케이드",
        conditions: ["간질", "양극성 장애"],
        mechanism: "전압 의존성 Na⁺ 채널을 차단 → 글루타메이트 방출 감소 → NMDA 및 VGCC를 통한 시냅스후 Ca²⁺ 유입 감소. 흥분성 입력 감소를 통한 간접적 Q 감소.",
        level: "E",
      },
      {
        id: "PHENOBARBITAL",
        drug: "페노바르비탈",
        drugSub: "신생아 항경련제 1차 치료",
        target: "GABA-A 양성 알로스테릭 조절제",
        bermPath: "직접적 γ 증가",
        conditions: ["신생아 경련"],
        mechanism: "GABA-A 수용체 기능을 강화 → Cl⁻ 전도도 증가 → γ 증가 → Q 감소. 신생아에서는 GABA가 흥분성(NKCC1 > KCC2)이므로 효과가 제한적 — 페노바르비탈이 역설적으로 흥분을 증가시킬 수 있다.",
        level: "E",
      },
      {
        id: "BUMETANIDE",
        drug: "부메타나이드",
        drugSub: "NKCC1 차단제 — 염소 스위치를 표적으로 함",
        target: "NKCC1(SLC12A2) 차단 → 억제성 GABA 회복",
        bermPath: "γ를 음에서 양으로 전환",
        conditions: ["신생아 경련"],
        mechanism: "NKCC1을 차단 → 세포내 Cl⁻ 감소 → GABA가 억제성으로 전환 → γ가 음에서 양으로 전환 → Q가 ∞에서 유한으로 감소. 신생아 질환에 대한 가장 직접적인 Q인자 개입.",
        level: "E",
      },
      {
        id: "LEVETIRACETAM",
        drug: "레베티라세탐",
        drugSub: "광범위, SV2A 메커니즘",
        target: "SV2A → 소포 방출 조절 → Ca²⁺ 의존성 신경전달↓",
        bermPath: "시냅스전 Ca²⁺ 의존성 소포 방출",
        conditions: ["간질(국소 및 전신)"],
        mechanism: "SV2A(시냅스 소포 당단백질 2A)에 결합 → Ca²⁺ 의존성 신경전달물질 방출 조절 → 흥분성 구동 감소. 또한 N형 Ca²⁺ 채널을 직접 억제한다.",
        level: "E",
      },
      {
        id: "TOPIRAMATE",
        drug: "토피라메이트",
        drugSub: "간질, 편두통, 군발두통 예방",
        target: "다중 표적: GABA↑, 글루타메이트↓, Ca²⁺ 전류↓, 탄산탈수효소",
        bermPath: "다중 표적 γ 증가 + 공명 입력 감소",
        conditions: ["간질", "편두통", "군발두통"],
        mechanism: "GABA-A를 강화(γ↑), AMPA/카이네이트 글루타메이트 수용체를 차단(흥분성 입력↓), L형 Ca²⁺ 채널을 억제하고, 탄산탈수효소를 억제(pH → Ca²⁺ 동역학). 다경로 Q 감소.",
        level: "E",
      },
    ],

    sudepTitle: "SUDEP은 성인의 SIDS이다",
    sudepLead:
      "간질에서의 돌연 예기치 않은 사망(SUDEP)과 영아돌연사증후군(SIDS)은 동일한 종말 메커니즘을 공유한다: 확산성 탈분극이 뇌간으로 전파되어 심폐정지를 유발한다. 유일한 차이는 트리거 — 간질 발작 vs. 신생아 Q → ∞ 상태.",
    sudepVerifications: [
      {
        point: "종말 메커니즘",
        sids: "CSD → 뇌간 → 무호흡 → 심정지",
        sudep: "발작 → CSD → 뇌간 → 무호흡 → 심정지",
        match: true,
      },
      {
        point: "세로토닌 결핍",
        sids: "뇌간 5-HT 뉴런 감소(Kinney 2009)",
        sudep: "5-HT 시스템 결함, CO₂ 화학수용 실패",
        match: true,
      },
      {
        point: "각성 실패",
        sids: "저산소증/과탄산혈증에 대한 각성 반응 실패",
        sudep: "발작후 전반적 EEG 억제(PGES) 중 각성 실패",
        match: true,
      },
      {
        point: "타이밍",
        sids: "수면(야간, 피크 2~6시)",
        sudep: "수면(야간 발작이 SUDEP 위험 최대)",
        match: true,
      },
      {
        point: "체위",
        sids: "엎드린 자세 = 최고 위험",
        sudep: "SUDEP 사례의 대다수에서 엎드린 자세 발견",
        match: true,
      },
      {
        point: "Ca²⁺ 채널 관여",
        sids: "CACNA1C, CACNA1H, RYR2 변이",
        sudep: "CACNA1A 변이(FHM1/EA2), L형 VGCC 길항제가 사망을 예방",
        match: true,
      },
      {
        point: "연령 분포",
        sids: "피크 2~4개월(Q → ∞ 기간)",
        sudep: "조절되지 않는 경련이 있는 청년에서 피크(최대 발작 빈도 = 가장 빈번한 γ → 0 이벤트)",
        match: true,
      },
    ],
    sudepHeaders: {
      point: "검증 항목",
      sids: "SIDS",
      sudep: "SUDEP",
    },
    sudepConclusion: "L형 VGCC 길항제가 SUDEP 마우스 모델에서 발작 유발 사망을 예방한다(Cardiovascular Research 2025). 이것은 Ca²⁺ 채널 차단이 종말 CSD 캐스케이드를 예방한다는 직접적 근거이다 — SIDS에 제안된 것과 동일한 메커니즘.",

    migraineTitle: "편두통: 메커니즘으로서의 CSD",
    migraineLead:
      "피질 확산성 억제(CSD) — 신경세포 탈분극의 파동과 뒤따르는 억제 — 는 편두통 전조의 확립된 메커니즘이며, 삼차신경 활성화를 통한 편두통 두통의 핵심 구동 인자이다. CSD는 근본적으로 Ca²⁺ 의존성 과정이다.",
    migraineMechanism: {
      title: "CSD → 편두통 캐스케이드",
      steps: [
        "트리거(스트레스, 수면 부족, 호르몬 변화 또는 EMF) → 국소 피질 흥분성 증가",
        "대량의 세포내 Ca²⁺ 상승 → 3~5 mm/min의 신경세포 탈분극 파동",
        "CSD가 수막 삼차신경 구심성 섬유를 활성화 → CGRP 방출",
        "CGRP → 혈관 확장 + 신경원성 염증 → 두통",
        "반복적 CSD 에피소드 → 말초 및 중추 감작 → 만성 편두통",
      ],
    },
    migraineGenetic: {
      title: "유전적 증거: FHM1(CACNA1A)",
      desc: "가족성 편마비성 편두통 1형은 CACNA1A 기능획득 변이에 의해 유발된다 — P/Q형 Ca²⁺ 채널 기능 항진 → 글루타메이트 방출 증가 → 글리아 Ca²⁺ 파동 전파 → CSD 역치 저하. FHM1은 Ca²⁺ 채널 기능 증가가 직접 편두통을 유발한다는 것을 증명한다.",
    },
    migraineProphylaxis: {
      title: "모든 편두통 예방약이 CSD를 감소시킨다",
      desc: "효과적인 편두통 예방약의 모든 클래스가 CSD 감수성을 감소시킨다: 베타 차단제(신경 흥분성 감소), 발프로산(GABA↑ + T형 차단), 토피라메이트(다중 표적), 아미트립틸린(Na⁺ + Ca²⁺), CGRP 항체(하류 이펙터 차단). CSD — Ca²⁺ 의존성 과정 — 로의 이러한 수렴은 Q인자 모델에 의해 예측된다.",
    },
    migraineEmf: "ELF 프라이밍 가설: 만성 ELF 노출이 α2δ-1(CACNA2D1)을 상향 조절 → 시냅스의 VGCC 증가 → CSD 역치 저하 → 편두통 감수성 증가. 가바펜틴(α2δ-1 차단제)은 효과적인 편두통 예방약이다 — 제안된 ELF 프라이밍 메커니즘을 직접 역전시킨다.",

    clusterTitle: "군발두통: 일주기 Ca²⁺ 진동",
    clusterLead:
      "군발두통은 가장 정밀하게 시간이 정해지는 신경 질환이다 — 발작이 매일 같은 시각에 계절적 주기성을 가지고 발생한다. 이 일주기적 정밀성은 시교차상핵(SCN)과 그 Ca²⁺ 의존성 진동을 직접 가리킨다.",
    clusterProfile: {
      title: "환자 프로파일 = 누적 Ca²⁺ 부하",
      rows: [
        { feature: "남성 3:1", bermLink: "더 높은 기저 Ca²⁺ 부하(근육량, 테스토스테론 → Ca²⁺↑)" },
        { feature: "흡연자 60~90%", bermLink: "니코틴 → nAChR → Ca²⁺ 유입. 만성 흡연 = 만성 Ca²⁺ 부하" },
        { feature: "발병 ~30세", bermLink: "약 30년간의 부하 후 누적 Ca²⁺ 역치에 도달" },
        { feature: "발작 00~03시", bermLink: "SCN Ca²⁺ 진동 최저점 → Cav1.2 윈도우 → 삼차신경 활성화" },
        { feature: "계절성(봄/가을)", bermLink: "광주기 변화 → CRY 감수성 이동 → SCN Ca²⁺ 진동 위상 교란" },
        { feature: "알코올 트리거", bermLink: "에탄올 → 직접적 Ca²⁺ 채널 조절 + 혈관 확장 + 히스타민" },
        { feature: "RLS 동반질환", bermLink: "하지불안증후군은 Ca²⁺/철/도파민 경로를 공유한다. 가바펜틴이 둘 다 치료한다." },
      ],
    },
    clusterTreatment: {
      title: "치료 반응 맵",
      headers: { drug: "약물", bermTarget: "BERM 표적", efficacy: "유효성", mechanism: "작용 이유" },
      rows: [
        {
          drug: "베라파밀",
          bermTarget: "L형 Ca²⁺ 채널(Cav1.2) 차단",
          efficacy: "1차 예방약(240~960 mg/일)",
          mechanism: "L형 VGCC를 차단 → 시냅스전 CGRP 방출 방지 → 일주기 주기 단축(Per2 시계 유전자). 직접적 Ca²⁺ 채널 개입.",
        },
        {
          drug: "멜라토닌",
          bermTarget: "MT1/MT2 → Gi → cAMP↓ → Ca²⁺↓",
          efficacy: "유효(10~25 mg)",
          mechanism: "내인성 Ca²⁺ 길항제. SCN 일주기 진동을 리셋한다. EMF가 CRY 경로를 통해 멜라토닌을 억제 → 보충이 보호를 회복한다.",
        },
        {
          drug: "리튬",
          bermTarget: "GSK3β 억제 → 일주기 시계 안정화",
          efficacy: "2차 예방약",
          mechanism: "Ca²⁺ 진동 하류의 일주기 시계 유전자(Per2, Bmal1)를 안정화. 일주기 주기 연장 → EMF 유발 위상 이동에 대항.",
        },
        {
          drug: "가바펜틴",
          bermTarget: "α2δ-1(CACNA2D1) 차단",
          efficacy: "유효 가능성",
          mechanism: "VGCC 보조 서브유닛 차단 → 흥분성 시냅스 형성 감소. ELF 프라이밍(α2δ-1 상향 조절)을 역전시킨다.",
        },
        {
          drug: "수마트립탄",
          bermTarget: "5-HT1B/1D → 시냅스전 Ca²⁺↓ → CGRP↓",
          efficacy: "급성 중단 치료(피하 주사)",
          mechanism: "시냅스전 5-HT1B/1D를 활성화 → Ca²⁺ 유입 감소 → CGRP 방출 차단. 급성 증상 완화이며 예방약이 아니다.",
        },
        {
          drug: "산소(100%)",
          bermTarget: "혈관 수축 + 자유 라디칼 소거",
          efficacy: "급성 중단 치료(15 L/min)",
          mechanism: "고유량 O₂ → 뇌혈관 수축 → 삼차신경 활성화 감소. 또한 라디칼 쌍 메커니즘(CRY 경로)을 소거한다.",
        },
        {
          drug: "실로시빈",
          bermTarget: "5-HT2A → 트립타민 경로 리셋",
          efficacy: "사이키델릭 역치 이하 용량으로 주기 예방",
          mechanism: "트립타민 마스터 리셋: 5-HT2A 작용 → 시상피질 네트워크 리셋 → SCN 일주기 리셋 → Ca²⁺ 진동 주기를 끊는다. 아래 트립타민 리셋 섹션 참조.",
        },
      ],
    },

    psilocybinTitle: "트립타민 리셋: 실로시빈",
    psilocybinLead:
      "실로시빈(실로신 / 4-OH-DMT)은 트립타민 경로의 \"마스터 리셋\"을 생성하는 5-HT2A 수용체 작용제이다. 사이키델릭 역치 이하 용량으로 군발두통 주기를 예방한다 — 그리고 비사이키델릭 유사체 2-브로모-LSD(BOL)도 효과가 있어, 이것이 사이키델릭 체험 효과가 아니라 수용체 수준의 메커니즘임을 증명한다.",
    psilocybinMechanisms: [
      {
        step: "5-HT2A 수용체 작용",
        desc: "실로신이 피질 V층 추체 뉴런의 5-HT2A에 결합 → 세로토닌 자체와는 다른 신호 캐스케이드를 유발(편향 작용). 이것이 수용체의 하류 연결을 리셋한다.",
      },
      {
        step: "시상피질 네트워크 리셋",
        desc: "피질과 시상에서의 5-HT2A 활성화가 기본모드 네트워크를 교란 → 시상피질 회로의 재편성을 가능하게 한다. 군발두통에서는 병적 진동 패턴을 끊는다.",
      },
      {
        step: "SCN 일주기 리셋",
        desc: "SCN으로의 세로토닌성 입력은 주요 비광성 동조 인자이다. 5-HT2A 활성화가 SCN Ca²⁺ 진동 위상을 재보정한다 — 군발두통 타이밍을 구동하는 동일한 진동.",
      },
      {
        step: "5-HT2A 하향 조절",
        desc: "급성 작용 후 5-HT2A 수용체가 내재화되고 하향 조절된다. 이것이 사이키델릭 역치 이하 용량이 효과적인 이유이며, 약물 제거 후에도 효과가 지속되는 이유이다 — 수용체 상태가 리셋된다.",
      },
      {
        step: "α2δ-1 발현 리셋(제안)",
        desc: "트립타민 경로가 α2δ-1 발현(CACNA2D1 → 시냅스의 VGCC 밀도)을 조절하는 경우, 실로시빈이 ELF 프라이밍 상태를 리셋할 수 있다. 이것이 실로시빈이 편두통에도 효과를 보이는 이유를 설명한다 — 둘 다 α2δ-1 매개 CSD 감수성을 공유한다.",
      },
    ],
    psilocybinBol: {
      title: "BOL-148: 비사이키델릭 증거",
      desc: "2-브로모-LSD(BOL-148)는 LSD와 동일한 5-HT2A 결합 친화성을 가지지만 비사이키델릭(환각 효과 없음)이다. 이것도 군발두통 주기를 중단시킨다. 이는 치료 메커니즘이 수용체 수준에서 — 5-HT2A → 트립타민 경로 → 일주기 리셋을 통해 — 작동하며, 사이키델릭 체험 자체를 통하지 않는다는 것을 증명한다.",
    },

    csdTitle: "피질 확산성 탈분극: 통합 메커니즘",
    csdLead:
      "CSD는 네 가지 질환 모두에 공통된 종말 경로이다. Q인자가 CSD의 유발 여부, 전파 범위, 뇌간 도달 여부를 결정한다.",
    csdTable: [
      { condition: "SIDS", trigger: "EMF + Q→∞(신생아)", propagation: "뇌간 전체", outcome: "치명적", prevented: "부메타나이드(γ 회복), EMF 감소" },
      { condition: "SUDEP", trigger: "발작 → 일시적 Q 스파이크", propagation: "뇌간 전체", outcome: "치명적", prevented: "L형 VGCC 길항제, 발작 관리" },
      { condition: "간질", trigger: "낮은 γ + 국소 흥분성", propagation: "피질(제한적)", outcome: "발작", prevented: "에토숙시미드, 발프로산, 부메타나이드" },
      { condition: "편두통", trigger: "CSD 역치 초과", propagation: "피질(뇌고랑에서 정지)", outcome: "전조 + 두통", prevented: "가바펜틴, 발프로산, 토피라메이트" },
      { condition: "군발두통", trigger: "SCN Ca²⁺ 진동 → 삼차신경", propagation: "시상하부 → 삼차신경", outcome: "편측 통증", prevented: "베라파밀, 실로시빈, 멜라토닌" },
    ],
    csdHeaders: { condition: "질환", trigger: "CSD 트리거", propagation: "전파", outcome: "결과", prevented: "예방약" },

    pharmTargetLabel: "표적",
    pharmBermPathLabel: "BERM 경로",
    pharmConditionsLabel: "적응증",
    pharmMechanismLabel: "메커니즘",
    predictionDesc: "Q인자 스펙트럼 모델은 편두통 유병률, CSD 역치, 군발두통 EMF 노출, SUDEP 위험, 실로시빈 유효성 및 신생아 동물 모델을 포함하는 6가지 검증 가능한 예측을 생성한다.",
    predictionLink: "신경학적 스펙트럼 예측 참조(NEURO-EMF-1 ~ NEURO-EMF-6)",
    predictionHref: "/predictions",
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

export default async function NeurologicalSpectrumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link
          href={`${prefix}/evidence`}
          className="text-sm text-accent hover:underline"
        >
          {d.backLink}
        </Link>
      </p>

      <PageHeader icon={BrainCircuit} title={d.title} subtitle={d.subtitle} />

      <div className="mt-8">
        <CautionBox locale={locale}>
          <p>{d.cautionText}</p>
        </CautionBox>
      </div>

      {/* Q-factor spectrum table */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.spectrumTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">
          {d.spectrumLead}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border">
                {Object.values(d.spectrumHeaders).map((h) => (
                  <th key={h} className="text-left py-2 pr-4 font-medium text-foreground-muted text-xs uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.spectrumRows.map((row, i) => {
                const rowColors: Record<number, string> = {
                  0: "bg-red-500/5",
                  3: "bg-red-500/5",
                  1: "bg-amber-500/5",
                  2: "bg-amber-500/5",
                  4: "bg-yellow-500/5",
                  5: "bg-yellow-500/5",
                };
                return (
                  <tr key={i} className={`border-b border-card-border/50 last:border-0 ${rowColors[i] ?? ""}`}>
                    <td className="py-2.5 pr-4 font-medium text-sm">{row.condition}</td>
                    <td className="py-2.5 pr-4 font-mono-num text-foreground-muted">{row.q}</td>
                    <td className="py-2.5 pr-4 font-mono-num text-foreground-muted">{row.gamma}</td>
                    <td className="py-2.5 pr-4 text-foreground-muted text-xs">{row.mechanism}</td>
                    <td className="py-2.5 text-foreground-muted text-xs">{row.outcome}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* López-Martín experimental validation */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.lopezTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">
          {d.lopezLead}
        </p>

        <div className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6 mb-6">
          <h3 className="font-semibold text-sm mb-3">{d.lopezExperiment.title}</h3>
          <p className="text-sm text-foreground-muted leading-relaxed mb-4">{d.lopezExperiment.setup}</p>
          <div className="space-y-2">
            {d.lopezExperiment.results.map((r, i) => (
              <div key={i} className="flex gap-2 text-sm leading-relaxed">
                <span className={`shrink-0 mt-0.5 ${i === 2 ? "text-red-500 font-bold" : i === 3 ? "text-amber-500" : "text-green-500"}`}>
                  {i === 2 ? "⚡" : i === 3 ? "◆" : "→"}
                </span>
                <p className={`text-foreground-muted ${i === 2 ? "font-medium text-foreground" : ""}`}>{r}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-accent/20 bg-accent/5 p-5 sm:p-6 mb-6">
          <h3 className="font-semibold text-sm mb-3">{d.lopezInterpretation.title}</h3>
          <div className="space-y-2">
            {d.lopezInterpretation.points.map((p, i) => (
              <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
                <span className="text-accent shrink-0 mt-0.5 font-mono-num text-xs">{i + 1}.</span>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-sm text-foreground-muted leading-relaxed italic">{d.lopezPulse}</p>
        </div>
      </section>

      {/* Antiepileptic drug calcium map */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.pharmTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-8 max-w-3xl">
          {d.pharmLead}
        </p>
        <div className="space-y-6">
          {d.pharmCards.map((card) => {
            const lc = LEVEL_COLORS[card.level] ?? LEVEL_COLORS["E"];
            return (
              <div
                key={card.id}
                className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-sm">{card.drug}</h3>
                    <p className="text-xs text-foreground-muted mt-0.5">{card.drugSub}</p>
                  </div>
                  <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${lc.bg} ${lc.text}`}>
                    {card.level}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-1">
                    {d.pharmTargetLabel}
                  </p>
                  <p className="text-sm leading-relaxed font-mono-num">{card.target}</p>
                </div>

                <div className="mb-3">
                  <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-1">
                    {d.pharmBermPathLabel}
                  </p>
                  <p className="text-sm leading-relaxed">{card.bermPath}</p>
                </div>

                <div className="mb-3">
                  <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-1">
                    {d.pharmConditionsLabel}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {card.conditions.map((c) => (
                      <span key={c} className="px-2 py-0.5 rounded text-xs bg-card-border/30 text-foreground-muted">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-1">
                    {d.pharmMechanismLabel}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground-muted">{card.mechanism}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SUDEP = Adult SIDS */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.sudepTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">
          {d.sudepLead}
        </p>
        <div className="space-y-3">
          {d.sudepVerifications.map((v, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-green-500 text-sm">✓</span>
                <p className="text-sm font-semibold">{v.point}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded border border-card-border/60 bg-background p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">SIDS</p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{v.sids}</p>
                </div>
                <div className="rounded border border-card-border/60 bg-background p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">SUDEP</p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{v.sudep}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-green-500/20 bg-green-500/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.sudepConclusion}</p>
        </div>
      </section>

      {/* Migraine & CSD */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.migraineTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">
          {d.migraineLead}
        </p>

        <div className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6 mb-6">
          <h3 className="font-semibold text-sm mb-3">{d.migraineMechanism.title}</h3>
          <div className="space-y-2">
            {d.migraineMechanism.steps.map((s, i) => (
              <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
                <span className="text-accent shrink-0 mt-0.5 font-mono-num text-xs">{i + 1}.</span>
                <p>{s}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
            <h3 className="font-semibold text-sm mb-2">{d.migraineGenetic.title}</h3>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.migraineGenetic.desc}</p>
          </div>
          <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
            <h3 className="font-semibold text-sm mb-2">{d.migraineProphylaxis.title}</h3>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.migraineProphylaxis.desc}</p>
          </div>
        </div>

        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-sm text-foreground-muted leading-relaxed italic">{d.migraineEmf}</p>
        </div>
      </section>

      {/* Cluster headache */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.clusterTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">
          {d.clusterLead}
        </p>

        <h3 className="text-sm font-semibold mb-3">{d.clusterProfile.title}</h3>
        <div className="space-y-2 mb-8">
          {d.clusterProfile.rows.map((row, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-3 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
              <span className="text-sm font-semibold shrink-0 min-w-[180px]">{row.feature}</span>
              <span className="text-sm text-foreground-muted leading-relaxed">{row.bermLink}</span>
            </div>
          ))}
        </div>

        <h3 className="text-sm font-semibold mb-3">{d.clusterTreatment.title}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border">
                {Object.values(d.clusterTreatment.headers).map((h) => (
                  <th key={h} className="text-left py-2 pr-4 font-medium text-foreground-muted text-xs uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.clusterTreatment.rows.map((row, i) => (
                <tr key={i} className="border-b border-card-border/50 last:border-0">
                  <td className="py-2.5 pr-4 font-medium">{row.drug}</td>
                  <td className="py-2.5 pr-4 text-foreground-muted font-mono-num text-xs">{row.bermTarget}</td>
                  <td className="py-2.5 pr-4 text-foreground-muted">{row.efficacy}</td>
                  <td className="py-2.5 text-foreground-muted text-xs">{row.mechanism}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Psilocybin tryptamine reset */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.psilocybinTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">
          {d.psilocybinLead}
        </p>

        <div className="space-y-4 mb-6">
          {d.psilocybinMechanisms.map((m, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold mb-1">
                <span className="font-mono-num text-xs text-accent mr-2">{i + 1}</span>
                {m.step}
              </p>
              <p className="text-sm text-foreground-muted leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
          <h3 className="font-semibold text-sm mb-2">{d.psilocybinBol.title}</h3>
          <p className="text-sm text-foreground-muted leading-relaxed">{d.psilocybinBol.desc}</p>
        </div>
      </section>

      {/* CSD unifying table */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.csdTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">
          {d.csdLead}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border">
                {Object.values(d.csdHeaders).map((h) => (
                  <th key={h} className="text-left py-2 pr-4 font-medium text-foreground-muted text-xs uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.csdTable.map((row, i) => {
                const fatal = ["Fatal", "Fataali", "致死性", "치명적"].includes(row.outcome);
                return (
                  <tr key={i} className={`border-b border-card-border/50 last:border-0 ${fatal ? "bg-red-500/5" : ""}`}>
                    <td className="py-2.5 pr-4 font-medium">{row.condition}</td>
                    <td className="py-2.5 pr-4 text-foreground-muted text-xs">{row.trigger}</td>
                    <td className="py-2.5 pr-4 text-foreground-muted">{row.propagation}</td>
                    <td className={`py-2.5 pr-4 font-medium ${fatal ? "text-red-600 dark:text-red-400" : ""}`}>{row.outcome}</td>
                    <td className="py-2.5 text-foreground-muted text-xs">{row.prevented}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Predictions link */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <DerivedPrediction>
          <p className="text-sm leading-relaxed mb-3">
            {d.predictionDesc}
          </p>
          <Link
            href={`${prefix}${d.predictionHref}`}
            className="text-sm text-accent hover:underline"
          >
            {d.predictionLink} →
          </Link>
        </DerivedPrediction>
      </section>
    </div>
  );
}
