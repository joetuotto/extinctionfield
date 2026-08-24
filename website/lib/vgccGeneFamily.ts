export interface VGCCGene {
  id: string;
  gene: string;
  protein: string;
  type: string;
  primaryTissues: string[];
  diseases: { en: string; fi: string }[];
  evidenceLevel: string;
  emfRelevance: { en: string; fi: string };
  keyRefs: string[];
}

export const VGCC_GENE_FAMILY: VGCCGene[] = [
  {
    id: "cacna1c",
    gene: "CACNA1C",
    protein: "Cav1.2",
    type: "L-type",
    primaryTissues: ["heart", "brain_cortex", "smooth_muscle"],
    diseases: [
      {
        en: "5 psychiatric disorders (ASD, ADHD, bipolar, MDD, schizophrenia)",
        fi: "5 psykiatrista häiriötä (ASD, ADHD, bipolaarihäiriö, MDD, skitsofrenia)",
      },
      {
        en: "Timothy syndrome (GoF → 80% autism + long QT)",
        fi: "Timothyn oireyhtymä (GoF → 80 % autismi + pitkä QT)",
      },
      {
        en: "Long QT syndrome type 8",
        fi: "Pitkä QT -oireyhtymä tyyppi 8",
      },
      {
        en: "Hypertrophic cardiomyopathy",
        fi: "Hypertrofinen kardiomyopatia",
      },
    ],
    evidenceLevel: "E",
    emfRelevance: {
      en: "Genetic χ_channel modulator. Risk variants alter EMF sensitivity.",
      fi: "Geneettinen χ_channel-modulaattori. Riskivariantit muuttavat EMF-herkkyyttä.",
    },
    keyRefs: ["pgc-five-disorders", "timothy-autism-80pct"],
  },
  {
    id: "cacna1d",
    gene: "CACNA1D",
    protein: "Cav1.3",
    type: "L-type",
    primaryTissues: ["inner_hair_cells", "SA_node", "adrenal"],
    diseases: [
      {
        en: "Age-related hearing loss (IL-6 → Cav1.3 ↑ → excitotoxicity)",
        fi: "Ikäkuulo (IL-6 → Cav1.3 ↑ → eksitotoksisuus)",
      },
      {
        en: "Tinnitus (chronic Ca²⁺ overload at IHC synapse)",
        fi: "Tinnitus (krooninen Ca²⁺-ylikuorma IHC-synapsissa)",
      },
      {
        en: "Sinoatrial node dysfunction",
        fi: "Sinussolmun toimintahäiriö",
      },
    ],
    evidenceLevel: "E",
    emfRelevance: {
      en: "Earphone/Bluetooth EMF directly adjacent to cochlea.",
      fi: "Kuuloke/Bluetooth-EMF suoraan sisäkorvan vieressä.",
    },
    keyRefs: ["aging-cell-2024-cav13-hearing"],
  },
  {
    id: "cacna1a",
    gene: "CACNA1A",
    protein: "Cav2.1",
    type: "P/Q-type",
    primaryTissues: ["presynaptic_terminals", "cerebellum", "cortex"],
    diseases: [
      {
        en: "Familial hemiplegic migraine type 1 (GoF → CSD)",
        fi: "Familiaalinen hemipleginen migreeni tyyppi 1 (GoF → CSD)",
      },
      {
        en: "Episodic ataxia type 2 (LoF)",
        fi: "Episodinen ataksia tyyppi 2 (LoF)",
      },
      {
        en: "Spinocerebellar ataxia type 6",
        fi: "Spinoserebellaarinen ataksia tyyppi 6",
      },
      {
        en: "Childhood epilepsy",
        fi: "Lapsuusiän epilepsia",
      },
    ],
    evidenceLevel: "E",
    emfRelevance: {
      en: "GoF → increased glutamate release → cortical spreading depression.",
      fi: "GoF → lisääntynyt glutamaatin vapautuminen → kortikaalinen leviävä depressio.",
    },
    keyRefs: ["nejm-fhm-cacna1a", "cacna1a-epilepsy"],
  },
  {
    id: "cacna1g",
    gene: "CACNA1G",
    protein: "Cav3.1",
    type: "T-type",
    primaryTissues: ["thalamocortical_neurons", "heart"],
    diseases: [
      {
        en: "Sleep instability (Cav3.1 KO → delta waves ↓, awakenings ↑)",
        fi: "Unihäiriö (Cav3.1 KO → delta-aallot ↓, heräämiset ↑)",
      },
      {
        en: "Autism (2 SNPs: rs757415, rs12603112)",
        fi: "Autismi (2 SNP:tä: rs757415, rs12603112)",
      },
    ],
    evidenceLevel: "E",
    emfRelevance: {
      en: "Delta waves and sleep stability. T-type bifurcation target.",
      fi: "Delta-aallot ja unen vakaus. T-tyypin bifurkaatiokohde.",
    },
    keyRefs: ["pnas-2005-cav31-sleep", "cacna1g-asd-snps"],
  },
  {
    id: "cacna1h",
    gene: "CACNA1H",
    protein: "Cav3.2",
    type: "T-type",
    primaryTissues: [
      "DRG_nociceptors",
      "Leydig_cells",
      "adrenal_glomerulosa",
      "hippocampus_DG",
      "HCC_cancer_cells",
    ],
    diseases: [
      {
        en: "Chronic pain (upregulated in inflammatory/neuropathic models)",
        fi: "Krooninen kipu (ylireguloitu tulehdus-/neuropaattisissa malleissa)",
      },
      {
        en: "Male infertility (StAR → testosterone pathway)",
        fi: "Miehen hedelmättömyys (StAR → testosteronireitti)",
      },
      {
        en: "Hypertension (aldosterone pathway)",
        fi: "Hypertensio (aldosteronireitti)",
      },
      {
        en: "Alzheimer's disease (hippocampal Ca²⁺ → amyloid cascade)",
        fi: "Alzheimerin tauti (hippokampaalinen Ca²⁺ → amyloidikaskadi)",
      },
      {
        en: "HCC — TheraBionic TREATMENT target (FDA-approved)",
        fi: "HCC — TheraBionic-HOITOKOHDE (FDA-hyväksytty)",
      },
    ],
    evidenceLevel: "E",
    emfRelevance: {
      en: "PRIMARY EMF TRANSDUCER. Bifurcation at resting potential. TheraBionic FDA approval CONFIRMS non-thermal EMF → Cav3.2 → Ca²⁺ at SAR 100–1000× below mobile phone levels.",
      fi: "PRIMAARINEN EMF-TRANSDUKTORI. Bifurkaatio lepopotentiaalissa. TheraBionic FDA-hyväksyntä VAHVISTAA ei-termisen EMF → Cav3.2 → Ca²⁺ SAR-tasoilla 100–1000× alle matkapuhelimen.",
    },
    keyRefs: [
      "therabionic-ebioMedicine-2019",
      "fda-hde-h220001",
      "xiang-2025-leydig",
      "cav32-chronic-pain-2021",
    ],
  },
  {
    id: "cacna1i",
    gene: "CACNA1I",
    protein: "Cav3.3",
    type: "T-type",
    primaryTissues: ["nRt_thalamus"],
    diseases: [
      {
        en: "Sleep spindle loss (Cav3.3 KO → no spindles in nRt)",
        fi: "Unisukkuloiden menetys (Cav3.3 KO → ei sukkuloita nRt:ssä)",
      },
      {
        en: "Hemiplegic migraine (OR 2.30, P=0.00005)",
        fi: "Hemipleginen migreeni (OR 2.30, P=0.00005)",
      },
      {
        en: "Schizophrenia (spindle density reduced)",
        fi: "Skitsofrenia (sukkulatiheys alentunut)",
      },
    ],
    evidenceLevel: "E",
    emfRelevance: {
      en: "Sleep spindle pacemaker. EMF perturbation → sleep quality ↓.",
      fi: "Unisukkuloiden tahdistin. EMF-perturbaatio → unenlaatu ↓.",
    },
    keyRefs: ["pnas-2011-cav33-spindles", "cacna1i-migraine-2022"],
  },
];
