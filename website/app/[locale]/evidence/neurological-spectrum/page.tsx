import type { Metadata } from "next";
import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";

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

    predictionLink: "See neurological spectrum predictions (NEURO-EMF-1 through NEURO-EMF-6)",
    predictionHref: "/predictions",
  },

  fi: {
    title: "Neurologinen spektri: Epilepsia, migreeni, klusteripäänsärky",
    subtitle:
      "Yksi Q-tekijämekanismi, neljä neurologista sairautta. SIDS, epilepsia, migreeni ja klusteripäänsärky jakavat saman spreading depolarization -kaskadin — ainoa ero on vaimennuskerroin γ. Tämä on olemassa olevaa näyttöä integroiva hypoteesi — ei todistettu selitys.",
    backLink: "← Takaisin Evidenssiin",

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
        mechanism: "Kypsä KCC2-dominanssi → GABA inhibitorinen → oskillaatiot vaimenevat 2–3 syklin sisällä.",
        outcome: "Ei patologista oskillaatiota",
      },
    ],
    spectrumHeaders: {
      condition: "Tila",
      q: "Q-tekijä",
      gamma: "Vaimennus (γ)",
      mechanism: "Mekanismi",
      outcome: "Kliininen lopputulema",
    },

    lopezTitle: "Kokeellinen validaatio: López-Martín",
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
        mechanism: "Salpaa T-tyypin Ca²⁺-kanavat talamokortikaalisissa neuroneissa → eliminoi 3 Hz piikki-aalto-oskillaation. Suorin Q-tekijäinterventio: poistaa resonanssipiirin elementin.",
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
        mechanism: "Sitoutuu SV2A:han (synaptinen vesikkeliglykoproteiini 2A) → moduloi Ca²⁺-riippuvaista hermoainevälittäjän vapautumista → vähentää eksitatorista ohjaustta. Myös inhiboi N-tyypin Ca²⁺-kanavia suoraan.",
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
        point: "Serotoniiinipuutos",
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
      point: "Verifiointipiste",
      sids: "SIDS",
      sudep: "SUDEP",
    },
    sudepConclusion: "L-tyypin VGCC-antagonisti estää kohtauksen aiheuttaman kuoleman SUDEP-hiirimallissa (Cardiovascular Research 2025). Tämä on suora evidenssi siitä, että Ca²⁺-kanavasalpaus estää terminaalisen CSD-kaskadin — sama mekanismi jota ehdotetaan SIDS:lle.",

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
      desc: "Jokainen tehokkaan migreenin estolääkkeen luokka vähentää CSD-herkkyyttä: beetasalpaajat (vähentävät neuronaalista eksitabiliteettia), valproaatti (GABA↑ + T-tyypin salpaus), topiramaatti (monikohteinen), amitriptyliini (Na⁺ + Ca²⁺), CGRP-vasta-aineet (salpaavat alavirtaefektorin). Tämä konvergenssi CSD:hen — Ca²⁺-riippuvaiseen prosessiin — on Q-tekijämallin ennustama.",
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
          mechanism: "Endogeeninen Ca²⁺-antagonisti. Resetoi SCN:n sirkadiaanioskillaation. EMF suppressoi melatoniinia CRY-reitin kautta → lisäravinteet palauttaa suojan.",
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
        desc: "Jos tryptamiinireitti moduloi α2δ-1-ekspressiota (CACNA2D1 → VGCC-tiheys synapseissa), psilosybiini voi resetoida ELF-priming-tilan. Tämä selittäisi miksi psilosybiini osoittaa tehoa myös migreenissä — molemmat jakavat α2δ-1-välitteisen CSD-herkkyyden.",
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

    predictionLink: "Ks. neurologisen spektrin ennusteet (NEURO-EMF-1 – NEURO-EMF-6)",
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

export default async function NeurologicalSpectrumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
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
        <CautionBox locale={activeLocale}>
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
                    {activeLocale === "fi" ? "Kohde" : "Target"}
                  </p>
                  <p className="text-sm leading-relaxed font-mono-num">{card.target}</p>
                </div>

                <div className="mb-3">
                  <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-1">
                    {activeLocale === "fi" ? "BERM-reitti" : "BERM pathway"}
                  </p>
                  <p className="text-sm leading-relaxed">{card.bermPath}</p>
                </div>

                <div className="mb-3">
                  <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-1">
                    {activeLocale === "fi" ? "Tilat" : "Conditions"}
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
                    {activeLocale === "fi" ? "Mekanismi" : "Mechanism"}
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
                const fatal = row.outcome === "Fatal" || row.outcome === "Fataali";
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
            {activeLocale === "fi"
              ? "Q-tekijä-spektrimalli tuottaa kuusi testattavaa ennustetta jotka kattavat migreenin prevalenssin, CSD-kynnyksen, klusteripäänsäryn EMF-altistuksen, SUDEP-riskin, psilosybiinin tehon ja neonataalikoemallin."
              : "The Q-factor spectrum model generates six testable predictions covering migraine prevalence, CSD threshold, cluster headache EMF exposure, SUDEP risk, psilocybin efficacy, and a neonatal animal model."}
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
