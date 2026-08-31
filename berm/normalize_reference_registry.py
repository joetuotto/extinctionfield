"""Normalize the canonical website reference registry without guessing sources.

The script is deliberately mechanical.  It deduplicates IDs, moves identifiers
that were previously embedded in free-text fields into their canonical fields,
normalizes array/null shapes, and recomputes registry metadata.  It never
invents a DOI or URL; bibliographic discovery belongs to
``resolve_reference_links.py``.

Usage:
    python3 berm/normalize_reference_registry.py          # report only
    python3 berm/normalize_reference_registry.py --apply  # write registry
"""

from __future__ import annotations

import argparse
import json
import re
import unicodedata
from datetime import date
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
REGISTRY = ROOT / "website" / "public" / "data" / "references_full.json"
LEGACY_EVIDENCE = ROOT / "website" / "lib" / "legacyEvidence.json"
LEGACY_EVIDENCE_IDS = {
    str(record.get("id") or "").strip()
    for record in (json.loads(LEGACY_EVIDENCE.read_text()) if LEGACY_EVIDENCE.exists() else [])
    if str(record.get("id") or "").strip()
}

# Hand-verified identifiers already used by the website's explicit citation
# override table.  Keeping them here also resolves historic duplicate records
# into one canonical ID per paper.
CURATED_OFFICIAL_LINK = {
    "link_status": "verified",
    "link_source": "curated_official_metadata",
    "link_checked_at": "2026-08-28",
}

# These records carried identifiers that resolve to a different work than the
# authored bibliography.  Keep their authored scientific fields intact, but
# suppress every external identifier until the intended source is identified.
CURATED_IDENTIFIER_MISMATCH_IDS = {
    "tang2024",
    "ma2026_spermatogenesis_cav",
    "pmc3885580_retinal_vgcc",
    "pmc4858974_trpv4_itch",
    "mohandas2022_piezo1_keratinocyte",
    "jacc_ev2025",
    "gut_mel_trp",
    "klimek2023_hpa",
    "thyroid_shift_2024",
    "epigen_endo_2024",
    "chinese_lockdown_cohort_41036143",
}

CURATED: dict[str, dict[str, object]] = {
    "sousouri2025": {
        "authors": "Sousouri D, et al.",
        "title": "CACNA1C genotype determines sleep EEG response to 5G exposure in double-blind study",
        "journal": "NeuroImage",
        "doi": "10.1016/j.neuroimage.2025.121340",
        "link_status": "verified",
        "link_source": "curated_override",
    },
    "colin1992_varroa_electrostatic": {"doi": "10.1016/0022-1910(92)90039-g", "link_status": "registered", "link_source": "repository_identifier"},
    "cordelli2024": {"doi": "10.1016/j.envint.2024.108509", "link_status": "registered", "link_source": "repository_identifier"},
    "yu2019_btb": {"doi": "10.1016/j.scitotenv.2019.133860", "link_status": "registered", "link_source": "repository_identifier"},
    "thielens2018": {"doi": "10.1038/s41598-018-22271-3", "link_status": "registered", "link_source": "repository_identifier"},
    "zandieh2025": {"doi": "10.1038/s41598-025-87235-w", "link_status": "registered", "link_source": "repository_identifier"},
    "panagopoulos2025": {"doi": "10.3389/fpubh.2025.1585441", "link_status": "registered", "link_source": "repository_identifier"},
    "nations2024": {"url": "https://population.un.org/wpp/", "type": "dataset", "link_status": "verified", "link_source": "official_url"},
    "world_bank_wdi_2024": {"url": "https://api.worldbank.org/v2/country/all/indicator/SP.DYN.TFRT.IN", "link_status": "verified", "link_source": "official_url"},
    "wu2008_emas_hpt_axis": {
        "authors": "Wu FCW et al.",
        "year": 2008,
        "title": "Hypothalamic-pituitary-testicular axis disruptions in older men are differentially linked to age and modifiable risk factors: the European Male Aging Study",
        "journal": "The Journal of Clinical Endocrinology & Metabolism",
        "doi": "10.1210/jc.2007-1972",
        "pmid": "18270261",
        "link_status": "verified",
        "link_source": "ncbi_pubmed_metadata",
    },
    "eu_regulation_244_2009": {"url": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32009R0244", "link_status": "verified", "link_source": "official_url"},
    "fda-hde-h220001": {
        "authors": "U.S. Food and Drug Administration",
        "year": 2023,
        "title": "TheraBionic P1 – H220001",
        "journal": "FDA Recently Approved Devices",
        "url": "https://www.fda.gov/medical-devices/recently-approved-devices/therabionic-p1-h220001",
        "type": "regulatory",
        "link_status": "verified",
        "link_source": "official_url",
    },
    "sun2016_elf_vgcc": {
        "authors": "Sun ZC et al.",
        "year": 2016,
        "title": "Extremely Low Frequency Electromagnetic Fields Facilitate Vesicle Endocytosis by Increasing Presynaptic Calcium Channel Expression at a Central Synapse",
        "journal": "Scientific Reports",
        "doi": "10.1038/srep21774",
        "pmid": "26887777",
        "pmcid": "PMC4757866",
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    "alshammari2022": {
        "authors": "Wardzinski W et al.",
        "year": 2022,
        "title": "Mobile Phone Radiation Deflects Brain Energy Homeostasis and Prompts Human Food Ingestion",
        "journal": "Nutrients",
        "doi": "10.3390/nu14020339",
        "pmid": "35057520",
        "pmcid": "PMC8777647",
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    "maalouf2023": {
        "authors": "Maalouf J et al.",
        "year": 2023,
        "title": "Dose- and Time-Dependent Effects of Radiofrequency Electromagnetic Field on Adipose Tissue: Implications of Thermoregulation and Mitochondrial Signaling",
        "journal": "International Journal of Molecular Sciences",
        "doi": "10.3390/ijms241310628",
        "pmid": "37445806",
        "pmcid": "PMC10342026",
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    "camkii-cav32-threshold-2023": {
        "authors": "Sharma S et al.",
        "year": 2023,
        "title": "Voltage-Gated T-Type Calcium Channel Modulation by Kinases and Phosphatases: The Old Ones, the New Ones, and the Missing Ones",
        "journal": "Cells",
        "doi": "10.3390/cells12030461",
        "pmid": "36766802",
        "pmcid": "PMC9913649",
        "type": "review",
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    "lai1995_dna_breaks": {"pmid": "7473001", "link_status": "registered", "link_source": "repository_identifier"},
    "cacna1c_amygdala": {"pmcid": "PMC3577650", "link_status": "registered", "link_source": "repository_identifier"},
    "cacna1c_functional": {
        "authors": "Eckart N, Song Q, Yang R, Wang R, Zhu H, McCallion AS, Avramopoulos D",
        "year": 2016,
        "title": "Functional Characterization of Schizophrenia-Associated Variation in CACNA1C",
        "journal": "PLOS ONE",
        "doi": "10.1371/journal.pone.0157086",
        "pmid": "27276213",
        "pmcid": "PMC4898738",
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    "usselman2016": {
        "authors": "Usselman RJ et al.",
        "year": 2016,
        "title": "The Quantum Biology of Reactive Oxygen Species Partitioning Impacts Cellular Bioenergetics",
        "journal": "Scientific Reports",
        "doi": "10.1038/srep38543",
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    "sparrow_emr2021": {
        "authors": "Balmori A",
        "year": 2021,
        "title": "Electromagnetic Pollution as a Possible Explanation for the Decline of House Sparrows in Interaction with Other Factors",
        "journal": "Birds",
        "doi": "10.3390/birds2030024",
        "type": "review",
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    "heliyon_150khz_fertility_2022": {
        "authors": "Sundaram V, Mohammed S, Zyuzikov N",
        "year": 2022,
        "title": "Effects of 150 kHz intermediate frequency electromagnetic radiation on fertility indicators in male rats",
        "journal": "Heliyon",
        "doi": "10.1016/j.heliyon.2022.e12228",
        "pmid": "36578412",
        "pmcid": "PMC9791864",
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    "heliyon2022_150khz_fertility": {
        "id": "heliyon_150khz_fertility_2022",
        "aliases": ["heliyon2022_150khz_fertility"],
        "authors": "Sundaram V, Mohammed S, Zyuzikov N",
        "year": 2022,
        "title": "Effects of 150 kHz intermediate frequency electromagnetic radiation on fertility indicators in male rats",
        "journal": "Heliyon",
        "doi": "10.1016/j.heliyon.2022.e12228",
        "pmid": "36578412",
        "pmcid": "PMC9791864",
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    "mallinson2025_electric_pollution": {
        "authors": "Mallinson VJ, Woodburn FA, O'Reilly LJ",
        "year": 2025,
        "title": "Weak anthropogenic electric fields affect honeybee foraging",
        "journal": "iScience",
        "doi": "10.1016/j.isci.2025.112550",
        "pmid": "40612901",
        "pmcid": "PMC12225925",
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    "schlegel6134": {
        "id": "schlegel1987",
        "aliases": ["schlegel6134"],
        "authors": "Schlegel W et al.",
        "year": 1987,
        "title": "Oscillations of cytosolic calcium in pituitary cells due to action potentials",
        "journal": "Nature 329, 719–721",
        "type": "journal",
    },
}

# Official Crossref, PubMed/PMC and publisher metadata verified on 2026-08-28.
# Only bibliographic/link fields are overridden here. The normalizer restores
# the site's authored category, pathway, level, finding and tags afterwards.
CURATED.update(
    {
        "andersson-2007-denmark": {
            "authors": "Andersson AM, Jensen TK, Juul A, Petersen JH, Jørgensen T, Skakkebaek NE",
            "year": 2007,
            "title": "Secular decline in male testosterone and sex hormone binding globulin serum levels in Danish population surveys",
            "journal": "The Journal of Clinical Endocrinology & Metabolism",
            "doi": "10.1210/jc.2006-2633",
            "pmid": "17895324",
            **CURATED_OFFICIAL_LINK,
        },
        "nyante2012_nhanes": {
            "authors": "Nyante SJ, Graubard BI, Li Y, McQuillan GM, Platz EA, Rohrmann S, Bradwin G, McGlynn KA",
            "year": 2012,
            "title": "Trends in sex hormone concentrations in US males: 1988–1991 to 1999–2004",
            "journal": "International Journal of Andrology",
            "doi": "10.1111/j.1365-2605.2011.01230.x",
            "pmid": "22150314",
            "pmcid": "PMC4137971",
            **CURATED_OFFICIAL_LINK,
        },
        "panagopoulos2025_ifo": {
            "authors": "Panagopoulos DJ, Karabarbounis A, Yakymenko I, Chrousos GP",
            "year": 2021,
            "title": "Human-made electromagnetic fields: Ion forced-oscillation and voltage-gated ion channel dysfunction, oxidative stress and DNA damage (Review)",
            "journal": "International Journal of Oncology",
            "doi": "10.3892/ijo.2021.5272",
            "pmid": "34617575",
            "pmcid": "PMC8562392",
            "aliases": ["panagopoulos2021"],
            **CURATED_OFFICIAL_LINK,
        },
        "insulin_oxt": {
            "authors": "Zhang B, Nakata M, Nakae J, Ogawa W, Yada T",
            "year": 2018,
            "title": "Central insulin action induces activation of paraventricular oxytocin neurons to release oxytocin into circulation",
            "journal": "Scientific Reports",
            "doi": "10.1038/s41598-018-28816-w",
            "pmid": "29991705",
            "pmcid": "PMC6039480",
            **CURATED_OFFICIAL_LINK,
        },
        "panagopoulos2025": {
            "authors": "Panagopoulos DJ, Yakymenko I, De Iuliis GN, Chrousos GP",
            "year": 2025,
            "title": "A comprehensive mechanism of biological and health effects of anthropogenic extremely low frequency and wireless communication electromagnetic fields",
            "journal": "Frontiers in Public Health",
            "doi": "10.3389/fpubh.2025.1585441",
            "pmid": "40547468",
            "pmcid": "PMC12179773",
            **CURATED_OFFICIAL_LINK,
        },
        "xiang2025_clc2_ttype": {
            "authors": "Fu SJ, Syu MS, Tang CY, Huang CY, Jeng CJ, Tang CY, Hu MC",
            "year": 2025,
            "title": "Regulation of testosterone synthesis in Leydig cells by ClC-2 chloride channel",
            "journal": "Reproduction",
            "doi": "10.1530/REP-24-0432",
            "pmid": "40683311",
            "pmcid": "PMC12278444",
            **CURATED_OFFICIAL_LINK,
        },
        "therabionic-ebioMedicine-2019": {
            "authors": "Jimenez H, Wang M, et al.",
            "year": 2019,
            "title": "Tumour-specific amplitude-modulated radiofrequency electromagnetic fields induce differentiation of hepatocellular carcinoma via targeting Cav3.2 T-type voltage-gated calcium channels and Ca2+ influx",
            "journal": "eBioMedicine",
            "doi": "10.1016/j.ebiom.2019.05.034",
            "pmid": "31160272",
            "pmcid": "PMC6604666",
            **CURATED_OFFICIAL_LINK,
        },
        "yu2019_btb": {
            "authors": "Yu G, et al.",
            "year": 2020,
            "title": "Long-term exposure to 4G smartphone radiofrequency electromagnetic radiation diminished male reproductive potential by directly disrupting Spock3–MMP2-BTB axis in the testes of adult rats",
            "journal": "Science of the Total Environment",
            "doi": "10.1016/j.scitotenv.2019.133860",
            **CURATED_OFFICIAL_LINK,
        },
        "ijrb2022_if_review": {
            "authors": "Lee HJ, Jin H, Ahn YH, Kim N, Pack JK, Choi HD, Lee YS",
            "year": 2023,
            "title": "Effects of intermediate frequency electromagnetic fields: a review of animal studies",
            "journal": "International Journal of Radiation Biology",
            "doi": "10.1080/09553002.2022.2094016",
            "pmid": "35758938",
            **CURATED_OFFICIAL_LINK,
        },
        "yoshii2009": {
            "authors": "Yoshii T, Ahmad M, Helfrich-Förster C",
            "year": 2009,
            "title": "Cryptochrome mediates light-dependent magnetosensitivity of Drosophila's circadian clock",
            "journal": "PLOS Biology",
            "doi": "10.1371/journal.pbio.1000086",
            "pmid": "19355790",
            "pmcid": "PMC2667543",
            **CURATED_OFFICIAL_LINK,
        },
        "belpomme2022": {
            "authors": "Belpomme D, Irigaray P",
            "year": 2022,
            "title": "Why electrohypersensitivity and related symptoms are caused by non-ionizing man-made electromagnetic fields: An overview and medical assessment",
            "journal": "Environmental Research",
            "doi": "10.1016/j.envres.2022.113374",
            "pmid": "35537497",
            **CURATED_OFFICIAL_LINK,
        },
        "zeghoudi2025_led_driver_emf": {
            "authors": "Zeghoudi A, Bendaoud A, Benhamida F, Tilmatine A, Canale L, Zissis G",
            "year": 2025,
            "title": "Experimental measurement of the near electric emission from LED driver as function of power variation and lighting mode",
            "journal": "Optik",
            "doi": "10.1016/j.ijleo.2025.172347",
            **CURATED_OFFICIAL_LINK,
        },
        "pmc6894750_timothy": {
            "authors": "Buddell T, Friedman V, Drozd CJ, Quinn CC",
            "year": 2019,
            "title": "An autism-causing calcium channel variant functions with selective autophagy to alter axon targeting and behavior",
            "journal": "PLOS Genetics",
            "doi": "10.1371/journal.pgen.1008488",
            "pmid": "31805042",
            "pmcid": "PMC6894750",
            **CURATED_OFFICIAL_LINK,
        },
        "diem2005": {
            "authors": "Diem E, Schwarz C, Adlkofer F, Jahn O, Rüdiger H",
            "year": 2005,
            "title": "Non-thermal DNA breakage by mobile-phone radiation (1800 MHz) in human fibroblasts and in transformed GFSH-R17 rat granulosa cells in vitro",
            "journal": "Mutation Research/Genetic Toxicology and Environmental Mutagenesis",
            "doi": "10.1016/j.mrgentox.2005.03.006",
            **CURATED_OFFICIAL_LINK,
        },
        "cordelli2024": {
            "authors": "Cordelli E, et al.",
            "year": 2024,
            "title": "Effects of radiofrequency electromagnetic field (RF-EMF) exposure on male fertility: A systematic review of experimental studies on non-human mammals and human sperm in vitro",
            "journal": "Environment International",
            "doi": "10.1016/j.envint.2024.108509",
            "pmid": "38492496",
            **CURATED_OFFICIAL_LINK,
        },
        "cordelli2025_corrigendum": {
            "authors": "Cordelli E, et al.",
            "year": 2025,
            "title": "Corrigendum to “Effects of radiofrequency electromagnetic field (RF-EMF) exposure on male fertility: A systematic review of experimental studies on non-human mammals and human sperm in vitro” [Environment International 185 (2024) 108509]",
            "journal": "Environment International",
            "doi": "10.1016/j.envint.2025.109449",
            "pmid": "40268655",
            **CURATED_OFFICIAL_LINK,
        },
        "gut_per2_2026": {
            "authors": "Zhang, et al.",
            "year": 2025,
            "title": "A Peripheral Mechanism of Depression: Disturbed Intestinal Epithelial Per2 Gene Expression Causes Depressive Behaviors in Mice with Circadian Rhythm Disruption via Gut Barrier Damage and Microbiota Dysbiosis",
            "journal": "Advanced Science",
            "doi": "10.1002/advs.202501818",
            "pmid": "40847793",
            "pmcid": "PMC12631932",
            **CURATED_OFFICIAL_LINK,
        },
        "screen_child_behav_2024": {
            "authors": "Abdoli N, et al.",
            "year": 2024,
            "title": "Screen Time and Child Behavioral Disorders During COVID-19 Pandemic: A Systematic Review",
            "journal": "International Journal of Preventive Medicine",
            "doi": "10.4103/ijpvm.IJPVM_78_23",
            "pmcid": "PMC10982732",
            **CURATED_OFFICIAL_LINK,
        },
        "post_lockdown_mh_2025": {
            "authors": "Mongeau, et al.",
            "year": 2025,
            "title": "One-year post lockdown trajectories of mental health and impact of COVID-19 lockdown-related factors",
            "journal": "Frontiers in Public Health",
            "doi": "10.3389/fpubh.2025.1457895",
            "pmcid": "PMC11936785",
            **CURATED_OFFICIAL_LINK,
        },
        "swiss_screen_mh_2022": {
            "authors": "Marciano, et al.",
            "year": 2022,
            "title": "Screen time and adolescents' mental health before and after the COVID-19 lockdown in Switzerland: A natural experiment",
            "journal": "Frontiers in Psychiatry",
            "doi": "10.3389/fpsyt.2022.981881",
            "pmcid": "PMC9709147",
            **CURATED_OFFICIAL_LINK,
        },
        "aging-cell-2024-cav13-hearing": {
            "authors": "Lu M, et al.",
            "year": 2024,
            "title": "Upregulation of the Cav1.3 channel in inner hair cells by interleukin 6-dependent inflammaging contributes to age-related hearing loss",
            "journal": "Aging Cell",
            "doi": "10.1111/acel.14305",
            **CURATED_OFFICIAL_LINK,
        },
        "covid_sperm_2025": {
            "authors": "Kim, et al.",
            "year": 2025,
            "title": "Ambient climatic conditions and semen quality: a comparative analysis across the periods before, during, and after the COVID-19 pandemic",
            "journal": "Frontiers in Endocrinology",
            "doi": "10.3389/fendo.2025.1660662",
            "pmid": "41036143",
            **CURATED_OFFICIAL_LINK,
        },
        "bat_5g_prdm16": {
            "authors": "Seewooruttun, et al.",
            "year": 2025,
            "title": "5G Radiofrequency Exposure Reduces PRDM16 and C/EBP β mRNA Expression, Two Key Biomarkers for Brown Adipogenesis",
            "journal": "International Journal of Molecular Sciences",
            "doi": "10.3390/ijms26062792",
            "pmid": "40141434",
            "pmcid": "PMC11942954",
            **CURATED_OFFICIAL_LINK,
        },
        "cavg4_camkii_mafa": {
            "authors": "Wu, et al.",
            "year": 2022,
            "title": "The Calcium Channel Subunit Gamma-4 as a Novel Regulator of MafA in Pancreatic Beta-Cell Controls Glucose Homeostasis",
            "journal": "Biomedicines",
            "doi": "10.3390/biomedicines10040770",
            "pmid": "35453520",
            "pmcid": "PMC9030882",
            **CURATED_OFFICIAL_LINK,
        },
        "kim2019_hypothalamus": {
            "authors": "Kim, et al.",
            "year": 2019,
            "title": "Trafficking of synaptic vesicles is changed at the hypothalamus by exposure to an 835 MHz radiofrequency electromagnetic field",
            "journal": "General Physiology and Biophysics",
            "doi": "10.4149/gpb_2019020",
            "pmid": "31411574",
            **CURATED_OFFICIAL_LINK,
        },
        "rf9_cortisol_2021": {
            "authors": "Ullah, et al.",
            "year": 2021,
            "title": "RF9 Rescues Cortisol-Induced Repression of Testosterone Levels in Adult Male Macaques",
            "journal": "Frontiers in Physiology",
            "doi": "10.3389/fphys.2021.630796",
            "pmid": "33716777",
            "pmcid": "PMC7946976",
            **CURATED_OFFICIAL_LINK,
        },
        "vdh_lvscc": {
            "authors": "Brewer, et al.",
            "year": 2001,
            "title": "Vitamin D hormone confers neuroprotection in parallel with downregulation of L-type calcium channel expression in hippocampal neurons",
            "journal": "The Journal of Neuroscience",
            "doi": "10.1523/JNEUROSCI.21-01-00098.2001",
            "pmid": "11150325",
            "pmcid": "PMC6762438",
            **CURATED_OFFICIAL_LINK,
        },
        "verap_t1d_jama": {
            "authors": "Forlenza, et al.",
            "year": 2023,
            "title": "Effect of Verapamil on Pancreatic Beta Cell Function in Newly Diagnosed Pediatric Type 1 Diabetes",
            "journal": "JAMA",
            "doi": "10.1001/jama.2023.2064",
            **CURATED_OFFICIAL_LINK,
        },
        "pmc4643966_cacna1a_asd": {
            "authors": "Li, et al.",
            "year": 2015,
            "title": "Genetic Evidence for Possible Involvement of the Calcium Channel Gene CACNA1A in Autism Pathogenesis in Chinese Han Population",
            "journal": "PLOS ONE",
            "doi": "10.1371/journal.pone.0142887",
            "pmid": "26566276",
            "pmcid": "PMC4643966",
            **CURATED_OFFICIAL_LINK,
        },
        "meloni2013_glp1_review": {
            "authors": "Meloni AR, DeYoung MB, Lowe C, Parkes DG",
            "year": 2013,
            "title": "GLP-1 receptor activated insulin secretion from pancreatic β-cells: mechanism and glucose dependence",
            "journal": "Diabetes, Obesity and Metabolism",
            "doi": "10.1111/j.1463-1326.2012.01663.x",
            "pmid": "22776039",
            "pmcid": "PMC3556522",
            **CURATED_OFFICIAL_LINK,
        },
        "zarate2006_ketamine": {
            "authors": "Zarate CA Jr, Singh JB, Carlson PJ, et al.",
            "year": 2006,
            "title": "A Randomized Trial of an N-methyl-D-aspartate Antagonist in Treatment-Resistant Major Depression",
            "journal": "Archives of General Psychiatry",
            "doi": "10.1001/archpsyc.63.8.856",
            **CURATED_OFFICIAL_LINK,
        },
        "korean2025_cacna": {
            "authors": "Han, et al.",
            "year": 2025,
            "title": "Polymorphisms in CACNA1A, CACNA1C, and CACNA1H Genes in Korean Pediatric Patients with Developmental Delay and Intellectual Disability: A Focus on Epilepsy Comorbidity",
            "journal": "Genes",
            "doi": "10.3390/genes16070767",
            "pmid": "40725423",
            "pmcid": "PMC12294729",
            **CURATED_OFFICIAL_LINK,
        },
        "sci-rep-2019-sperm-ros": {
            "authors": "Houston BJ, et al.",
            "year": 2019,
            "title": "Whole-body exposures to radiofrequency-electromagnetic energy can cause DNA damage in mouse spermatozoa via an oxidative mechanism",
            "journal": "Scientific Reports",
            "doi": "10.1038/s41598-019-53983-9",
            "pmid": "31767903",
            **CURATED_OFFICIAL_LINK,
        },
        "pall2022-ad": {
            "authors": "Pall ML",
            "year": 2022,
            "title": "Low Intensity Electromagnetic Fields Act via Voltage-Gated Calcium Channel (VGCC) Activation to Cause Very Early Onset Alzheimer's Disease: 18 Distinct Types of Evidence",
            "journal": "Current Alzheimer Research",
            "doi": "10.2174/1567205019666220202114510",
            "pmid": "35114921",
            **CURATED_OFFICIAL_LINK,
        },
        "martinez-cadenas2013": {
            "authors": "Martinez-Cadenas C, et al.",
            "year": 2013,
            "title": "Gender is a major factor explaining discrepancies in eye colour prediction based on HERC2/OCA2 genotype and the IrisPlex model",
            "journal": "Forensic Science International: Genetics",
            "doi": "10.1016/j.fsigen.2013.03.007",
            "pmid": "23601698",
            **CURATED_OFFICIAL_LINK,
        },
        "a2d1_pain": {
            "authors": "Li, et al.",
            "year": 2006,
            "title": "Calcium channel alpha2delta1 subunit mediates spinal hyperexcitability in pain modulation",
            "journal": "Pain",
            "doi": "10.1016/j.pain.2006.04.022",
            "pmid": "16764990",
            "pmcid": "PMC1635965",
            **CURATED_OFFICIAL_LINK,
        },
        "amygdala_cort": {
            "authors": "Mitra, et al.",
            "year": 2008,
            "title": "Acute corticosterone treatment is sufficient to induce anxiety and amygdaloid dendritic hypertrophy",
            "journal": "Proceedings of the National Academy of Sciences",
            "doi": "10.1073/pnas.0705615105",
            **CURATED_OFFICIAL_LINK,
        },
        "bbb_emf_2026": {
            "authors": "Ulusoy, et al.",
            "year": 2025,
            "title": "Acute exposure to 27.12 MHz radiofrequency electromagnetic field disrupts blood-brain barrier integrity via eNOS activation and occludin down-regulation",
            "journal": "Iranian Journal of Basic Medical Sciences",
            "doi": "10.22038/ijbms.2025.86952.18784",
            "pmid": "41586187",
            "pmcid": "PMC12829706",
            **CURATED_OFFICIAL_LINK,
        },
        "bdnf_rf_2023": {
            "authors": "Zheng, et al.",
            "year": 2023,
            "title": "Biological effects of exposure to 2650 MHz electromagnetic radiation on the behavior, learning, and memory of mice",
            "journal": "Brain and Behavior",
            "doi": "10.1002/brb3.3004",
            "pmid": "37118929",
            "pmcid": "PMC10275548",
            **CURATED_OFFICIAL_LINK,
        },
        "bdnf_rf_dev_2021": {
            "authors": "Kim, et al.",
            "year": 2021,
            "title": "Exposure to RF-EMF Alters Postsynaptic Structure and Hinders Neurite Outgrowth in Developing Hippocampal Neurons of Early Postnatal Mice",
            "journal": "International Journal of Molecular Sciences",
            "doi": "10.3390/ijms22105340",
            "pmid": "34069478",
            "pmcid": "PMC8159076",
            **CURATED_OFFICIAL_LINK,
        },
        "betacell_efield": {
            "authors": "Liebman, et al.",
            "year": 2021,
            "title": "Altered β-Cell Calcium Dynamics via Electric Field Exposure",
            "journal": "Annals of Biomedical Engineering",
            "doi": "10.1007/s10439-020-02517-w",
            "pmid": "32323041",
            **CURATED_OFFICIAL_LINK,
        },
        "elf_thyroid_2022": {
            "authors": "Fang, et al.",
            "year": 2022,
            "title": "Effect of Occupational Extremely Low-Frequency Electromagnetic Field Exposure on the Thyroid Gland of Workers: A Prospective Study",
            "journal": "Current Medical Science",
            "doi": "10.1007/s11596-022-2610-8",
            "pmid": "35963949",
            **CURATED_OFFICIAL_LINK,
        },
        "env_estrogen_mast": {
            "authors": "Narita S, et al.",
            "year": 2007,
            "title": "Environmental estrogens induce mast cell degranulation and enhance IgE-mediated release of allergic mediators",
            "journal": "Environmental Health Perspectives",
            "doi": "10.1289/ehp.9378",
            "pmid": "17366818",
            "pmcid": "PMC1797832",
            **CURATED_OFFICIAL_LINK,
        },
        "gc2_methylation": {
            "authors": "Liu Y, et al.",
            "year": 2015,
            "title": "Effect of 50 Hz Extremely Low-Frequency Electromagnetic Fields on the DNA Methylation and DNA Methyltransferases in Mouse Spermatocyte-Derived Cell Line GC-2",
            "journal": "BioMed Research International",
            "doi": "10.1155/2015/237183",
            "pmid": "26339596",
            "pmcid": "PMC4538330",
            **CURATED_OFFICIAL_LINK,
        },
        "gut_circadian_2018": {
            "authors": "Deaver JA, Eum SY, Toborek M",
            "year": 2018,
            "title": "Circadian Disruption Changes Gut Microbiome Taxa and Functional Gene Composition",
            "journal": "Frontiers in Microbiology",
            "doi": "10.3389/fmicb.2018.00737",
            "pmid": "29706947",
            "pmcid": "PMC5909328",
            **CURATED_OFFICIAL_LINK,
        },
        "lte_thyroid_2024": {
            "authors": "Kim HY, et al.",
            "year": 2024,
            "title": "Effects of 4G Long-Term Evolution Electromagnetic Fields on Thyroid Hormone Dysfunction and Behavioral Changes in Adolescent Male Mice",
            "journal": "International Journal of Molecular Sciences",
            "doi": "10.3390/ijms252010875",
            "pmid": "39456657",
            "pmcid": "PMC11507962",
            **CURATED_OFFICIAL_LINK,
        },
        "nifed_tocolytic": {
            "authors": "Flenady, et al.",
            "year": 2014,
            "title": "Calcium channel blockers for inhibiting preterm labour and birth",
            "journal": "Cochrane Database of Systematic Reviews",
            "doi": "10.1002/14651858.CD002255.pub2",
            **CURATED_OFFICIAL_LINK,
        },
        "oxt_vgcc": {
            "authors": "Tobin VA, Douglas AJ, Leng G, Ludwig M",
            "year": 2011,
            "title": "The involvement of voltage-operated calcium channels in somato-dendritic oxytocin release",
            "journal": "PLOS ONE",
            "doi": "10.1371/journal.pone.0025366",
            "pmid": "22028774",
            "pmcid": "PMC3197583",
            **CURATED_OFFICIAL_LINK,
        },
        "sleep_t_meta_2021": {
            "authors": "Su L, Zhang SZ, Zhu J, Wu J, Jiao YZ",
            "year": 2021,
            "title": "Effect of partial and total sleep deprivation on serum testosterone in healthy males: a systematic review and meta-analysis",
            "journal": "Sleep Medicine",
            "doi": "10.1016/j.sleep.2021.10.031",
            "pmid": "34801825",
            **CURATED_OFFICIAL_LINK,
        },
        "verap_t1d_natmed": {
            "authors": "Ovalle, et al.",
            "year": 2018,
            "title": "Verapamil and beta cell function in adults with recent-onset type 1 diabetes",
            "journal": "Nature Medicine",
            "doi": "10.1038/s41591-018-0089-4",
            **CURATED_OFFICIAL_LINK,
        },
        "pmc3065491_bhatt_ca_oligomers": {
            "authors": "Itkin A, Dupres V, Dufrêne YF, Bechinger B, Ruysschaert JM, Raussens V",
            "year": 2011,
            "title": "Calcium Ions Promote Formation of Amyloid β-Peptide (1–40) Oligomers Causally Implicated in Neuronal Toxicity of Alzheimer's Disease",
            "journal": "PLOS ONE",
            "doi": "10.1371/journal.pone.0018250",
            "pmid": "21464905",
            "pmcid": "PMC3065491",
            **CURATED_OFFICIAL_LINK,
        },
        "pmc4909906_calcium_ad": {
            "authors": "Magi S, Castaldo P, Macrì ML, et al.",
            "year": 2016,
            "title": "Intracellular Calcium Dysregulation: Implications for Alzheimer's Disease",
            "journal": "BioMed Research International",
            "doi": "10.1155/2016/6701324",
            "pmid": "27340665",
            "pmcid": "PMC4909906",
            **CURATED_OFFICIAL_LINK,
        },
        "pmc6101623_cacna1c_gwas": {
            "authors": "Moon AL, Haan N, Wilkinson LS, Thomas KL, Hall J",
            "year": 2018,
            "title": "CACNA1C: Association With Psychiatric Disorders, Behavior, and Neurogenesis",
            "journal": "Schizophrenia Bulletin",
            "doi": "10.1093/schbul/sby096",
            "pmid": "29982775",
            "pmcid": "PMC6101623",
            **CURATED_OFFICIAL_LINK,
        },
        "pmc7179355_oday_calcium": {
            "authors": "O'Day DH",
            "year": 2019,
            "title": "Alzheimer's Disease: A short introduction to the calmodulin hypothesis",
            "journal": "AIMS Neuroscience",
            "doi": "10.3934/Neuroscience.2019.4.231",
            "pmid": "32341979",
            "pmcid": "PMC7179355",
            **CURATED_OFFICIAL_LINK,
        },
    }
)

for _reference_id in CURATED_IDENTIFIER_MISMATCH_IDS:
    CURATED.setdefault(_reference_id, {}).update(
        {
            "doi": None,
            "pmid": None,
            "pmcid": None,
            "url": None,
            "link_status": "missing",
            "link_source": "curated_identifier_mismatch",
            "link_checked_at": "2026-08-28",
        }
    )

CURATED_NEW: list[dict[str, object]] = [
    {
        "id": "england2022_electric_ecology",
        "authors": "England SJ, Robert D",
        "year": 2022,
        "title": "The ecology of electricity and electroreception",
        "journal": "Biological Reviews",
        "doi": "10.1111/brv.12804",
        "type": "review",
        "verified": True,
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    {
        "id": "wan2021_cryptochrome_monarch",
        "authors": "Wan G, Hayden AN, Iiams SE, Merlin C",
        "year": 2021,
        "title": "Cryptochrome 1 mediates light-dependent inclination magnetosensing in monarch butterflies",
        "journal": "Nature Communications",
        "doi": "10.1038/s41467-021-21002-z",
        "type": "experimental",
        "verified": True,
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    {
        "id": "leberecht2023_rf_compass_upper_bound",
        "authors": "Leberecht B, Wong SY, Satish B, et al.",
        "year": 2023,
        "title": "Upper bound for broadband radiofrequency field disruption of magnetic compass orientation in night-migratory songbirds",
        "journal": "Proceedings of the National Academy of Sciences",
        "doi": "10.1073/pnas.2301153120",
        "type": "experimental",
        "verified": True,
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    {
        "id": "kolbabova2015_melatonin_seasonal",
        "authors": "Kolbabová T, Malkemper EP, Bartoš L, et al.",
        "year": 2015,
        "title": "Effect of exposure to extremely low frequency magnetic fields on melatonin levels in calves is seasonally dependent",
        "journal": "Scientific Reports",
        "doi": "10.1038/srep14206",
        "pmid": "26381579",
        "pmcid": "PMC4585560",
        "type": "animal",
        "verified": True,
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    {
        "id": "meloni2013_glp1_review",
        "authors": "Meloni AR, DeYoung MB, Lowe C, Parkes DG",
        "year": 2013,
        "title": "GLP-1 receptor activated insulin secretion from pancreatic beta-cells: mechanism and glucose dependence",
        "journal": "Diabetes, Obesity and Metabolism",
        "doi": "10.1111/j.1463-1326.2012.01663.x",
        "pmid": "22776039",
        "pmcid": "PMC3556522",
        "type": "review",
        "verified": True,
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    {
        "id": "jacob2018_piezo_biomaterials",
        "authors": "Jacob J, More N, Kalia K, Kapusetti G",
        "year": 2018,
        "title": "Piezoelectric smart biomaterials for bone and cartilage tissue engineering",
        "journal": "Inflammation and Regeneration",
        "doi": "10.1186/s41232-018-0059-8",
        "pmid": "29497465",
        "pmcid": "PMC5828134",
        "type": "review",
        "verified": True,
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    {
        "id": "splawski2005_cardiac_ltype",
        "authors": "Splawski I, Timothy KW, Decher N, et al.",
        "year": 2005,
        "title": "Severe arrhythmia disorder caused by cardiac L-type calcium channel mutations",
        "journal": "Proceedings of the National Academy of Sciences",
        "doi": "10.1073/pnas.0502506102",
        "pmid": "15863612",
        "pmcid": "PMC1149428",
        "type": "journal",
        "verified": True,
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    {
        "id": "burashnikov2010_cacna1c_jwave",
        "authors": "Burashnikov E, Pfeiffer R, Barajas-Martinez H, et al.",
        "year": 2010,
        "title": "Mutations in the cardiac L-type calcium channel associated with inherited J-wave syndromes and sudden cardiac death",
        "journal": "Heart Rhythm",
        "doi": "10.1016/j.hrthm.2010.08.026",
        "pmid": "20817017",
        "pmcid": "PMC2999985",
        "type": "journal",
        "verified": True,
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    {
        "id": "boczek2013_cacna1c_lqts",
        "authors": "Boczek NJ, Best JM, Tester DJ, et al.",
        "year": 2013,
        "title": "Exome sequencing and systems biology converge to identify novel mutations in the L-type calcium channel, CACNA1C, linked to autosomal dominant long QT syndrome",
        "journal": "Circulation: Cardiovascular Genetics",
        "doi": "10.1161/circgenetics.113.000138",
        "pmid": "23677916",
        "pmcid": "PMC3760222",
        "type": "journal",
        "verified": True,
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    {
        "id": "assefa2024_testes_review",
        "authors": "Assefa EM, Abdu SM",
        "year": 2024,
        "title": "Histopathologic effects of mobile phone radiation exposure on the testes and sperm parameters: a systematic literature review of animal studies",
        "journal": "Frontiers in Reproductive Health",
        "doi": "10.3389/frph.2024.1515166",
        "pmid": "39896841",
        "pmcid": "PMC11782230",
        "type": "review",
        "verified": True,
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    {
        "id": "marano2026_female_neuroinflammation",
        "authors": "Marano G, d'Abate C, Traversi G, et al.",
        "year": 2026,
        "title": "Neuroinflammation and the Female Brain: Sex-Specific Mechanisms Underlying Mood Disorders and Stress Vulnerability",
        "journal": "Life",
        "doi": "10.3390/life16010139",
        "pmid": "41598293",
        "pmcid": "PMC12843241",
        "type": "review",
        "verified": True,
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    {
        "id": "sundaram2023_150khz_female_organs",
        "authors": "Sundaram V, Mohammed S, Cockburn BN, et al.",
        "year": 2023,
        "title": "Effects of Intermediate Frequency (150 kHz) Electromagnetic Radiation on the Vital Organs of Female Sprague Dawley Rats",
        "journal": "Biology",
        "doi": "10.3390/biology12020310",
        "pmid": "36829585",
        "pmcid": "PMC9952889",
        "type": "animal",
        "verified": True,
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    {
        "id": "turedi2016_ovarian_reserve",
        "authors": "Türedi S, Hancı H, Çolakoğlu S, Kaya H, Odacı E",
        "year": 2016,
        "title": "Disruption of the ovarian follicle reservoir of prepubertal rats following prenatal exposure to a continuous 900-MHz electromagnetic field",
        "journal": "International Journal of Radiation Biology",
        "doi": "10.3109/09553002.2016.1152415",
        "pmid": "27007703",
        "type": "animal",
        "verified": True,
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    {
        "id": "shafik1992",
        "authors": "Shafik A, Ibrahim IH, El-Sayed EM",
        "year": 1992,
        "title": "Human textile-interface electrostatic measurements",
        "journal": "Andrologia",
        "doi": "10.1111/j.1439-0272.1992.tb02628.x",
        "type": "journal",
        "verified": True,
        "link_status": "registered",
        "link_source": "repository_identifier",
    },
    {
        "id": "lllt_fda_2007_alopecia",
        "authors": "U.S. Food and Drug Administration",
        "year": 2007,
        "title": "Low-level light therapy clearance for alopecia",
        "journal": None,
        "type": "regulatory",
        "verified": False,
    },
    {
        "id": "hamblin2013_photomedicine",
        "authors": "Hamblin MR",
        "year": 2013,
        "title": "Photomedicine and photobiomodulation review",
        "journal": None,
        "type": "review",
        "verified": False,
    },
    {
        "id": "sakurai2008",
        "authors": "Sakurai et al.",
        "year": 2008,
        "title": "ELF electromagnetic fields and insulin secretion in pancreatic islet cells",
        "journal": None,
        "type": "experimental",
        "verified": False,
    },
    {
        "id": "cacna1g-asd-snps",
        "authors": "Various",
        "year": 0,
        "title": "CACNA1G variants and autism spectrum disorder",
        "journal": None,
        "type": "journal",
        "verified": False,
    },
    {"id": "blackman1985_calcium_windows", "authors": "Blackman CF et al.", "year": 1985, "title": "Bioelectromagnetics calcium-efflux window study", "journal": "Bioelectromagnetics", "doi": "10.1002/bem.2250060402", "type": "journal", "verified": False, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "meyer2026", "authors": "Meyer et al.", "year": 2026, "title": "Bioelectromagnetics study", "journal": "Bioelectromagnetics", "doi": "10.1002/bem.70046", "type": "journal", "verified": False, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "yousefi2025", "authors": "Yousefi B et al.", "year": 2025, "title": "Reproductive Sciences study", "journal": "Reproductive Sciences", "doi": "10.1007/s43032-025-01880-0", "type": "journal", "verified": False, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "shafik1992_sling", "authors": "Shafik A", "year": 1992, "title": "Polyester scrotal sling experiment", "journal": "Contraception", "doi": "10.1016/0010-7824(92)90157-o", "type": "journal", "verified": True, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "splawski2004", "authors": "Splawski et al.", "year": 2004, "title": "CACNA1C channelopathy study", "journal": "Cell", "doi": "10.1016/j.cell.2004.09.011", "type": "journal", "verified": False, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "cordelli2025_corrigendum", "authors": "Cordelli E et al.", "year": 2025, "title": "Corrigendum to the RF-EMF animal fertility systematic review", "journal": "Environment International", "doi": "10.1016/j.envint.2025.109449", "type": "corrigendum", "verified": False, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "chakraborty2020", "authors": "Chakraborty P et al.", "year": 2020, "title": "Reproductive Toxicology study", "journal": "Reproductive Toxicology", "doi": "10.1016/j.reprotox.2020.06.012", "type": "journal", "verified": False, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "naderi2026", "authors": "Naderi N et al.", "year": 2026, "title": "Reproductive Toxicology study", "journal": "Reproductive Toxicology", "doi": "10.1016/j.reprotox.2026.109300", "type": "journal", "verified": False, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "lochhead2010", "authors": "Lochhead JJ et al.", "year": 2010, "title": "Blood-brain barrier permeability study", "journal": "Journal of Cerebral Blood Flow & Metabolism", "doi": "10.1038/jcbfm.2010.29", "type": "journal", "verified": False, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "usselman2016", "authors": "Usselman RJ et al.", "year": 2016, "title": "Radical-pair magnetosensitivity study", "journal": "Scientific Reports", "doi": "10.1038/srep38543", "type": "journal", "verified": False, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "liu2014", "authors": "Liu Y et al.", "year": 2014, "title": "Proceedings of the National Academy of Sciences study", "journal": "PNAS", "doi": "10.1073/pnas.1209249111", "type": "journal", "verified": False, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "garcia_robledo2025", "authors": "García-Robledo, Dierick & Manser", "year": 2025, "title": "PNAS study", "journal": "PNAS", "doi": "10.1073/pnas.2419214122", "type": "journal", "verified": False, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "calis2021", "authors": "Calis P et al.", "year": 2021, "title": "Fetal and Pediatric Pathology study", "journal": "Fetal and Pediatric Pathology", "doi": "10.1080/15513815.2019.1692112", "type": "journal", "verified": False, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "dincmen2016", "authors": "Dincmen, Hauser & Gursoy", "year": 2016, "title": "Polyester and nylon electrostatic charge generation and decay", "journal": "AATCC Journal of Research", "doi": "10.14504/ajr.3.4.4", "type": "journal", "verified": True, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "iolchiev2019", "authors": "Iolchiev BS et al.", "year": 2019, "title": "Agricultural Biology study", "journal": "Agricultural Biology", "doi": "10.15389/agrobiology.2019.6.1196eng", "type": "journal", "verified": False, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "ahmadi2016", "authors": "Ahmadi SS et al.", "year": 2016, "title": "Electronic Physician study", "journal": "Electronic Physician", "doi": "10.19082/2168", "type": "journal", "verified": False, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "meena2014", "authors": "Meena R et al.", "year": 2014, "title": "Electromagnetic Biology and Medicine study", "journal": "Electromagnetic Biology and Medicine", "doi": "10.3109/15368378.2013.781035", "type": "journal", "verified": False, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "cao2015", "authors": "Cao H et al.", "year": 2015, "title": "Environmental health study", "journal": "International Journal of Environmental Research and Public Health", "doi": "10.3390/ijerph120202071", "type": "journal", "verified": False, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "he2016", "authors": "He C et al.", "year": 2016, "title": "Molecular mechanisms study", "journal": "International Journal of Molecular Sciences", "doi": "10.3390/ijms17060939", "type": "journal", "verified": False, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "sofrankova2023", "authors": "Šofranková et al.", "year": 2023, "title": "Pathogens study", "journal": "Pathogens", "doi": "10.3390/pathogens12121398", "type": "journal", "verified": False, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "baldini2025", "authors": "Baldini GM et al.", "year": 2025, "title": "Toxics study", "journal": "Toxics", "doi": "10.3390/toxics13060510", "type": "journal", "verified": False, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "chinese_lockdown_cohort_41036143", "authors": "Chinese lockdown cohort", "year": 2024, "title": "Lockdown cohort study", "journal": None, "pmid": "41036143", "type": "journal", "verified": False, "link_status": "registered", "link_source": "repository_identifier"},
    {"id": "pituitary_elf_18week_2024", "authors": "Various", "year": 2024, "title": "Eighteen-week ELF exposure study of pituitary and reproductive endpoints", "type": "experimental", "verified": False},
    {"id": "vgcc_blocker_studies_collection", "authors": "Multiple study groups", "year": 0, "title": "Collection of VGCC-blocker studies", "type": "collection", "verified": False},
    {"id": "zhang2025_post_lockdown_semen", "authors": "Zhang et al.", "year": 2025, "title": "Post-lockdown semen-quality follow-up", "type": "journal", "verified": False},
    {"id": "coloss_winter_loss_panel_2020_2022", "authors": "COLOSS", "year": 2022, "title": "European honey-bee colony winter-loss panel, 2020–2022", "type": "dataset", "verified": True},
    {"id": "world_bank_wdi_2024", "authors": "World Bank", "year": 2024, "title": "World Development Indicators", "url": "https://api.worldbank.org/v2/country/all/indicator/SP.DYN.TFRT.IN", "type": "dataset", "verified": True, "link_status": "verified", "link_source": "official_url"},
    {"id": "wu2008_emas_hpt_axis", "authors": "Wu FCW et al.", "year": 2008, "title": "Hypothalamic-pituitary-testicular axis disruptions in older men are differentially linked to age and modifiable risk factors: the European Male Aging Study", "journal": "The Journal of Clinical Endocrinology & Metabolism", "doi": "10.1210/jc.2007-1972", "pmid": "18270261", "type": "journal", "verified": True, "link_status": "verified", "link_source": "ncbi_pubmed_metadata"},
    {"id": "kuryshev2014_calcium_channel_selectivity", "authors": "Kuryshev YA, Brown AM, Duzic E & Kirsch GE", "year": 2014, "title": "Evaluating State Dependence and Subtype Selectivity of Calcium Channel Modulators in Automated Electrophysiology Assays", "journal": "Assay and Drug Development Technologies", "doi": "10.1089/adt.2013.552", "pmid": "24579774", "pmcid": "PMC4657039", "type": "journal", "verified": True, "link_status": "verified", "link_source": "ncbi_pubmed_metadata"},
    {"id": "haidar2025_5g_skin_null", "authors": "Haidar et al.", "year": 2025, "title": "5G-modulated 3.5 GHz exposure in fibroblasts and keratinocytes", "journal": "Scientific Reports", "type": "journal", "verified": False},
    {"id": "talbi2025_quantum_magnetoreception", "authors": "Talbi, Zadeh-Haghighi & Simon", "year": 2025, "title": "Quantum-science perspective on magnetoreception", "journal": "Frontiers in Quantum Science and Technology", "type": "journal", "verified": False},
    {"id": "cacna1c_genotyping_2024", "authors": "Various", "year": 2024, "title": "CACNA1C genotyping and differential electromagnetic sensitivity", "type": "journal", "verified": False},
    {"id": "hrv_wifi_2023", "authors": "Various", "year": 2023, "title": "Heart-rate variability during controlled Wi-Fi exposure", "type": "journal", "verified": False},
    {"id": "eu_regulation_244_2009", "authors": "European Commission", "year": 2009, "title": "Commission Regulation (EC) No 244/2009", "url": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32009R0244", "type": "regulatory", "verified": True, "link_status": "verified", "link_source": "official_url"},
    {"id": "display_market_penetration_2005_2024", "authors": "Statista / GWI", "year": 2024, "title": "Display market penetration data, 2005–2024", "type": "collection", "verified": False},
    {"id": "streaming_screen_time_2012_2024", "authors": "Multiple market datasets", "year": 2024, "title": "Streaming adoption and screen-time series, 2012–2024", "type": "collection", "verified": False},
    {"id": "uk_weather_radar_insects_2025", "authors": "UK weather-radar study group", "year": 2025, "title": "Weather radar observations of insect movement in the United Kingdom", "type": "dataset", "verified": False},
    {"id": "nexrad_insect_density_2025", "authors": "NEXRAD study group", "year": 2025, "title": "NEXRAD observations of insect density in the United States", "type": "dataset", "verified": False},
    {"id": "berm_recovery_window_2026", "authors": "BERM", "year": 2026, "title": "Recovery-window model", "type": "internal-analysis", "verified": True},
    {"id": "microbiome_emf_collection_2019_2024", "authors": "Multiple study groups", "year": 2024, "title": "Collection of microbiome and electromagnetic-field animal studies, 2019–2024", "type": "collection", "verified": False},
    {"id": "rf49_scientific_reports_2024", "authors": "Various", "year": 2024, "title": "4.9 GHz radiofrequency experimental study", "journal": "Scientific Reports", "type": "journal", "verified": False},
    {"id": "wang2019_eneuro", "authors": "Wang et al.", "year": 2019, "title": "Calcium-channel and neuroendocrine signaling study", "journal": "eNeuro", "type": "journal", "verified": False},
    {"id": "glomerulosa_cav32_aldosterone", "authors": "Various", "year": 0, "title": "Cav3.2 channels and aldosterone secretion in adrenal glomerulosa cells", "journal": "Journal of Molecular Endocrinology", "type": "review", "verified": False},
    {"id": "wyszkowska_bee_collection_2023_2025", "authors": "Wyszkowska J et al.", "year": 2025, "title": "Collection of honey-bee stress-expression and behavior studies under electromagnetic exposure", "type": "collection", "verified": False},
    {"id": "york2026_kim_commentary", "authors": "York A", "year": 2026, "title": "Commentary on the Kim et al. electromagnetic-field sensor study", "journal": "New Scientist", "type": "commentary", "verified": False},
    {"id": "lindgren2026_susceptibility", "authors": "Lindgren O", "year": 2026, "title": "Geometric susceptibility function for membrane ion-channel sensitivity", "type": "internal-analysis", "verified": False},
    {"id": "campisi2010", "authors": "Campisi A et al.", "year": 2010, "title": "Reactive oxygen species levels and DNA fragmentation in astrocytes after low-intensity microwave exposure", "journal": "Neuroscience Letters", "type": "journal", "verified": False},
    {"id": "twenge2017_sexual_frequency", "authors": "Twenge JM et al.", "year": 2017, "title": "Declines in sexual frequency among American adults, 1989–2014", "journal": "Archives of Sexual Behavior", "type": "journal", "verified": False},
    {
        "id": "nyante2012_nhanes",
        "authors": "Nyante SJ et al.",
        "year": 2012,
        "title": "Trends in sex hormone concentrations in U.S. males: 1988–1991 to 1999–2004",
        "journal": "International Journal of Andrology",
        "type": "observational",
        "verified": False,
        "link_status": "missing",
    },
    {
        "id": "bhat2012_cacna1c_psychiatric",
        "authors": "Bhat S, Dao DT, Terrillion CE, et al.",
        "year": 2012,
        "title": "CACNA1C (Cav1.2) in the pathophysiology of psychiatric disease",
        "journal": "Progress in Neurobiology",
        "doi": "10.1016/j.pneurobio.2012.06.001",
        "pmid": "22705413",
        "pmcid": "PMC3459072",
        "type": "review",
        "verified": True,
        "link_status": "verified",
        "link_source": "ncbi_pubmed_metadata",
    },
    {
        "id": "bader2011_timothy_mouse",
        "authors": "Bader PL, Faizi M, Kim LH, et al.",
        "year": 2011,
        "title": "Mouse model of Timothy syndrome recapitulates triad of autistic traits",
        "journal": "Proceedings of the National Academy of Sciences",
        "doi": "10.1073/pnas.1112667108",
        "pmid": "21878566",
        "pmcid": "PMC3174658",
        "type": "journal",
        "verified": True,
        "link_status": "verified",
        "link_source": "ncbi_pubmed_metadata",
    },
]

# Records introduced solely to give an existing page citation a stable ID and
# an external source link must stay bibliographic. Do not manufacture findings,
# categories, pathway roles, evidence levels or tags for them.
LINK_ONLY_REFERENCE_IDS = {str(record["id"]) for record in CURATED_NEW}

DOI_RE = re.compile(r"(?<![A-Za-z0-9])10\.\d{4,9}/[-._;()/:A-Z0-9]+", re.I)
PMCID_RE = re.compile(r"\bPMC\s*:?\s*(\d{6,9})\b", re.I)
PMID_RE = re.compile(r"\b(?:PMID|PubMed)\s*:?\s*(\d{7,9})\b", re.I)

def clean_doi(value: object) -> str | None:
    text = str(value or "").strip()
    if not text:
        return None
    text = re.sub(r"^https?://(?:dx\.)?doi\.org/", "", text, flags=re.I)
    match = DOI_RE.search(text)
    return match.group(0).rstrip(".,;:)]}").lower() if match else None


def clean_pmcid(value: object) -> str | None:
    match = PMCID_RE.search(str(value or ""))
    return f"PMC{match.group(1)}" if match else None


def clean_pmid(value: object) -> str | None:
    text = str(value or "").strip()
    if re.fullmatch(r"\d{7,9}", text):
        return text
    match = PMID_RE.search(text)
    return match.group(1) if match else None


def clean_url(value: object) -> str | None:
    text = str(value or "").strip()
    if not text:
        return None
    parsed = urlparse(text)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        return None
    if parsed.scheme == "http":
        text = "https://" + text[len("http://") :]
    return text


def as_list(value: object) -> list[str]:
    if value is None:
        return []
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]
    text = str(value).strip()
    return [text] if text else []


def normalized_type(value: object) -> str | None:
    text = str(value or "").strip().lower().replace("_", "-")
    aliases = {
        "meta analysis": "meta-analysis",
        "government data": "government-data",
        "book chapter": "book-chapter",
    }
    return aliases.get(text, text) or None


def parse_legacy_citation(citation: str) -> tuple[str, str, str]:
    """Split the frozen legacy display citation into bibliographic fields.

    This is a mechanical migration only.  It never resolves or invents an
    identifier; DOI values present in the legacy catalogue remain pending
    until the strict external metadata verifier accepts them.
    """
    match = re.match(r"^(.*?)\s*\((\d{4})\)\.\s*(.*)$", citation.strip())
    if not match:
        return "", citation.strip(), ""
    authors = match.group(1).strip(" .,;")
    remainder = match.group(3).strip()
    parts = re.split(r"\.\s+(?=[A-Z0-9])", remainder, maxsplit=1)
    title = parts[0].strip(" .")
    journal = parts[1].strip(" .") if len(parts) > 1 else ""
    return authors, title, journal


def legacy_reference_records(existing: list[dict]) -> list[dict]:
    """Import legacy bibliography into the canonical registry.

    Claim-level fields (scope, causal nodes, limitations and migration status)
    deliberately stay in ``legacyEvidence.json``. Only bibliographic fields
    and an unverified identifier are imported.
    When a DOI already belongs to a canonical record, the legacy ID is kept as
    an alias instead of creating a second work.
    """
    if not LEGACY_EVIDENCE.exists():
        return []

    identity_to_id: dict[str, str] = {}
    existing_ids = {str(raw.get("id") or "").strip() for raw in existing}
    alias_to_id = {
        alias: str(raw.get("id") or "").strip()
        for raw in existing
        for alias in as_list(raw.get("aliases"))
        if str(raw.get("id") or "").strip()
    }
    for raw in existing:
        doi = clean_doi(raw.get("doi")) or clean_doi(raw.get("url"))
        pmcid = clean_pmcid(raw.get("pmcid"))
        pmid = clean_pmid(raw.get("pmid"))
        identity = f"doi:{doi}" if doi else f"pmcid:{pmcid}" if pmcid else f"pmid:{pmid}" if pmid else None
        if identity and str(raw.get("id") or "").strip():
            identity_to_id.setdefault(identity, str(raw["id"]).strip())

    imported: list[dict] = []
    for legacy in json.loads(LEGACY_EVIDENCE.read_text()):
        legacy_id = str(legacy.get("id") or "").strip()
        if not legacy_id:
            continue
        year = int(legacy.get("year") or 0)
        authors, title, journal = parse_legacy_citation(str(legacy.get("citation") or ""))
        doi = clean_doi(legacy.get("url"))
        identity = f"doi:{doi}" if doi else None
        declared_reference_id = str(legacy.get("referenceId") or "").strip()
        if declared_reference_id in existing_ids:
            canonical_id = declared_reference_id
        elif declared_reference_id in alias_to_id:
            canonical_id = alias_to_id[declared_reference_id]
        elif identity:
            canonical_id = identity_to_id.get(identity, legacy_id)
        else:
            canonical_id = legacy_id
        imported.append(
            {
                "id": canonical_id,
                "aliases": [legacy_id] if canonical_id != legacy_id else [],
                "authors": authors,
                "year": year,
                "title": title,
                "journal": journal or None,
                "doi": doi,
                "category": None,
                "pathway": [],
                "level": None,
                "type": None,
                "tags": [],
                "verified": False,
                "link_status": "pending" if doi else "missing",
                "link_source": "legacy_unverified_identifier" if doi else None,
            }
        )
    return imported


def completeness(record: dict) -> tuple[int, int, int]:
    bibliographic = sum(bool(record.get(key)) for key in ("authors", "title", "journal", "doi", "pmid", "pmcid", "url"))
    annotations = sum(bool(record.get(key)) for key in ("finding", "pathway", "tags", "category", "level", "type"))
    return bibliographic, annotations, int(bool(record.get("verified")))


def normalize_record(raw: dict) -> tuple[dict, int]:
    record = dict(raw)
    previously_verified_link = str(record.get("link_status") or "").strip() == "verified"
    previous_link_source = record.get("link_source")
    previous_link_checked_at = record.get("link_checked_at")
    record.update(CURATED.get(str(record.get("id") or ""), {}))
    # A later normalisation pass must not undo an authoritative metadata match
    # merely because the curated seed originally declared the identifier as
    # locally registered. Curated overrides may upgrade a record to verified,
    # but never downgrade an already verified link.
    if previously_verified_link:
        record["link_status"] = "verified"
        record["link_source"] = previous_link_source
        if previous_link_checked_at:
            record["link_checked_at"] = previous_link_checked_at
    changes = 0

    # Historic imports put identifiers in DOI, journal, title, or source.
    identifier_text = " ".join(
        str(record.get(key) or "") for key in ("doi", "pmid", "pmcid", "journal", "source")
    )
    reference_id = str(record.get("id") or "").strip()
    link_only = reference_id in LINK_ONLY_REFERENCE_IDS
    id_pmcid_match = re.match(r"^pmc(\d{6,9})(?:_|$)", reference_id, re.I)
    id_pmid_match = re.match(r"^pubmed(\d{7,9})(?:_|$)", reference_id, re.I)
    dedicated_doi = clean_doi(record.get("doi"))
    dedicated_pmcid = clean_pmcid(record.get("pmcid"))
    dedicated_pmid = clean_pmid(record.get("pmid"))
    doi = dedicated_doi or clean_doi(identifier_text)
    pmcid = dedicated_pmcid or clean_pmcid(identifier_text) or (
        f"PMC{id_pmcid_match.group(1)}" if id_pmcid_match else None
    )
    pmid = dedicated_pmid or clean_pmid(identifier_text) or (
        id_pmid_match.group(1) if id_pmid_match else None
    )
    url = clean_url(record.get("url"))

    if reference_id in CURATED_IDENTIFIER_MISMATCH_IDS:
        doi = None
        pmcid = None
        pmid = None
        url = None

    embedded_text = " ".join(str(record.get(key) or "") for key in ("id", "journal", "source"))
    extracted_only = bool(
        (doi and not dedicated_doi and clean_doi(embedded_text))
        or (pmcid and not dedicated_pmcid and clean_pmcid(embedded_text))
        or (pmid and not dedicated_pmid and clean_pmid(embedded_text))
        or (pmcid and not dedicated_pmcid and id_pmcid_match)
        or (pmid and not dedicated_pmid and id_pmid_match)
    )
    prior_status = str(record.get("link_status") or "").strip()
    if prior_status in {"verified", "registered", "pending", "missing"}:
        link_status = prior_status
    elif extracted_only:
        link_status = "pending"
    elif any((doi, pmid, pmcid, url)):
        link_status = "registered"
    else:
        link_status = "missing"

    if link_status == "verified" and record.get("link_source") in {"doi", "pmc", "pubmed"}:
        link_status = "registered"

    # v3.0 briefly marked extracted identifiers as verified.  Downgrade them
    # until NCBI/Crossref has resolved the identifier against article metadata.
    embedded_matches = bool(
        (doi and clean_doi(embedded_text) == doi)
        or (pmcid and clean_pmcid(embedded_text) == pmcid)
        or (pmid and clean_pmid(embedded_text) == pmid)
        or (pmcid and id_pmcid_match and pmcid == f"PMC{id_pmcid_match.group(1)}")
        or (pmid and id_pmid_match and pmid == id_pmid_match.group(1))
    )
    if embedded_matches and record.get("link_source") in {"doi", "pmc", "pubmed"}:
        link_status = "pending"

    category = str(record.get("category") or "").strip() or None

    authors = str(record.get("authors") or "").strip()
    title = str(record.get("title") or "").strip()
    if reference_id in LEGACY_EVIDENCE_IDS and not title and authors:
        # Non-bibliographic legacy claims do not follow "Author (year). Title"
        # syntax. Preserve the frozen description as a title instead of
        # misrepresenting the entire claim as an author name.
        title, authors = authors, ""

    canonical = {
        "id": reference_id,
        "authors": authors,
        "year": int(record.get("year") or 0),
        "title": title,
        "journal": str(record.get("journal") or "").strip() or None,
        "doi": doi,
        "pmid": pmid,
        "pmcid": pmcid,
        "url": url,
        "category": None if link_only else category,
        "pathway": [] if link_only else as_list(record.get("pathway")),
        "level": None if link_only else str(record.get("level") or "").strip() or None,
        "type": normalized_type(record.get("type")),
        "finding": None if link_only else str(record.get("finding") or "").strip() or None,
        "tags": [] if link_only else as_list(record.get("tags")),
        "pdf_section": str(record.get("pdf_section") or "").strip() or None,
        "pdf_number": record.get("pdf_number") if isinstance(record.get("pdf_number"), int) else None,
        "verified": bool(record.get("verified")),
        "link_status": link_status,
        "link_source": str(record.get("link_source") or "").strip() or (
            "doi" if doi else "pmc" if pmcid else "pubmed" if pmid else "official_url" if url else None
        ),
        "aliases": as_list(record.get("aliases")),
    }

    # Preserve non-core provenance fields, but deliberately exclude interpretive
    # annotations. This registry is the bibliographic/link source of truth; the
    # site's original scientific claims remain in their authored source files.
    known = set(canonical) | {"annotations"}
    for key, value in record.items():
        if reference_id in CURATED_IDENTIFIER_MISMATCH_IDS and key == "source":
            continue
        if key not in known and value is not None:
            canonical[key] = value

    for key, value in canonical.items():
        if record.get(key) != value:
            changes += 1
    return canonical, changes


def canonical_identity(record: dict) -> str | None:
    if record.get("doi"):
        return "doi:" + str(record["doi"]).lower()
    if record.get("pmcid"):
        return "pmcid:" + str(record["pmcid"]).upper()
    if record.get("pmid"):
        return "pmid:" + str(record["pmid"])
    return None


def bibliographic_fingerprint(record: dict) -> str | None:
    """Return a conservative exact-work key for records without a shared ID.

    Title punctuation, accents and whitespace are ignored, but the publication
    year must match.  Conflicting external identifiers are handled separately
    and prevent an automatic merge.
    """
    title = str(record.get("title") or "").strip()
    year = int(record.get("year") or 0)
    if not title or year <= 0:
        return None
    ascii_title = unicodedata.normalize("NFKD", title)
    ascii_title = "".join(char for char in ascii_title if not unicodedata.combining(char))
    normalized_title = re.sub(r"[^a-z0-9]+", " ", ascii_title.lower()).strip()
    return f"{year}:{normalized_title}" if normalized_title else None


def has_identifier_conflict(records: list[dict]) -> bool:
    """Refuse title/year merging when records name different identifiers."""
    for key, transform in (
        ("doi", lambda value: str(value).lower()),
        ("pmcid", lambda value: str(value).upper()),
        ("pmid", str),
    ):
        values = {transform(record[key]) for record in records if record.get(key)}
        if len(values) > 1:
            return True
    return False


def merge_records(records: list[dict]) -> dict:
    records.sort(key=completeness, reverse=True)
    canonical = dict(records[0])
    aliases = set(as_list(canonical.get("aliases")))
    pathways = set(as_list(canonical.get("pathway")))
    tags = set(as_list(canonical.get("tags")))
    status_rank = {"missing": 0, "pending": 1, "registered": 2, "verified": 3}

    for other in records[1:]:
        aliases.add(other["id"])
        aliases.update(as_list(other.get("aliases")))
        pathways.update(as_list(other.get("pathway")))
        tags.update(as_list(other.get("tags")))
        for key in ("authors", "year", "title", "journal", "doi", "pmid", "pmcid", "url", "category", "level", "type"):
            if not canonical.get(key) and other.get(key):
                canonical[key] = other[key]
        if status_rank.get(str(other.get("link_status")), 0) > status_rank.get(str(canonical.get("link_status")), 0):
            canonical["link_status"] = other.get("link_status")
            canonical["link_source"] = other.get("link_source")
        canonical["verified"] = bool(canonical.get("verified") or other.get("verified"))

    aliases.discard(canonical["id"])
    canonical["aliases"] = sorted(aliases)
    canonical["pathway"] = sorted(pathways)
    canonical["tags"] = sorted(tags)
    return canonical


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()

    data = json.loads(REGISTRY.read_text())
    # Preserve the site's existing authored scientific semantics. Identifier
    # discovery may enrich bibliography and links, but it must never rewrite
    # categories, pathways, evidence levels, findings, or tags. The first
    # record wins for the one historic duplicate ID, matching registry order.
    authored_semantics: dict[str, dict[str, object]] = {}
    for record in data.get("references", []):
        reference_id = str(record.get("id") or "").strip()
        if not reference_id or reference_id in LINK_ONLY_REFERENCE_IDS or reference_id in authored_semantics:
            continue
        authored_semantics[reference_id] = {
            "category": record.get("category"),
            "pathway": as_list(record.get("pathway")),
            "level": str(record.get("level") or "").strip() or None,
            "type": normalized_type(record.get("type")),
            "finding": str(record.get("finding") or "").strip() or None,
            "tags": as_list(record.get("tags")),
            "verified": bool(record.get("verified")),
            "pdf_section": str(record.get("pdf_section") or "").strip() or None,
            "pdf_number": record.get("pdf_number") if isinstance(record.get("pdf_number"), int) else None,
        }
    existing_ids = {str(record.get("id") or "") for record in data.get("references", [])}
    data["references"].extend(record for record in CURATED_NEW if str(record["id"]) not in existing_ids)
    data["references"].extend(legacy_reference_records(data["references"]))
    normalized: list[dict] = []
    changes = 0
    duplicates: dict[str, list[dict]] = {}

    for raw in data.get("references", []):
        record, count = normalize_record(raw)
        changes += count
        duplicates.setdefault(record["id"], []).append(record)

    removed = 0
    for reference_id, records in duplicates.items():
        if not reference_id:
            raise SystemExit("Reference without id; refusing to normalize")
        normalized.append(merge_records(records))
        removed += len(records) - 1

    # A DOI/PMCID/PMID identifies one bibliographic work even when historic
    # imports assigned multiple IDs. Keep one canonical record and preserve
    # every retired ID as an alias so existing structured citations remain
    # resolvable during migration.
    by_identity: dict[str, list[dict]] = {}
    without_identity: list[dict] = []
    for record in normalized:
        identity = canonical_identity(record)
        if identity:
            by_identity.setdefault(identity, []).append(record)
        else:
            without_identity.append(record)

    identity_removed = 0
    normalized = without_identity
    for records in by_identity.values():
        normalized.append(merge_records(records))
        identity_removed += len(records) - 1
    removed += identity_removed

    # Historic imports can describe the same work without carrying the same
    # DOI/PMID. Merge only exact normalized title+year matches, and only when
    # their declared identifiers do not conflict. This safely collapses
    # duplicate books and incomplete shadows while leaving suspicious records
    # (same title but different DOI) visible for manual review.
    by_bibliography: dict[str, list[dict]] = {}
    without_fingerprint: list[dict] = []
    for record in normalized:
        fingerprint = bibliographic_fingerprint(record)
        if fingerprint:
            by_bibliography.setdefault(fingerprint, []).append(record)
        else:
            without_fingerprint.append(record)

    bibliography_removed = 0
    normalized = without_fingerprint
    for records in by_bibliography.values():
        if len(records) > 1 and not has_identifier_conflict(records):
            normalized.append(merge_records(records))
            bibliography_removed += len(records) - 1
        else:
            normalized.extend(records)
    removed += bibliography_removed

    # Resolve alias/canonical collisions as the same work.  This occurs when a
    # frozen legacy ID already exists as an incomplete record while its DOI is
    # owned by a richer canonical record.  Treating the two as a connected
    # component keeps the richer record and preserves the retired ID as an
    # alias, rather than emitting an ambiguous route.
    ids_after_identity = {record["id"] for record in normalized}
    parents = {reference_id: reference_id for reference_id in ids_after_identity}

    def find(reference_id: str) -> str:
        while parents[reference_id] != reference_id:
            parents[reference_id] = parents[parents[reference_id]]
            reference_id = parents[reference_id]
        return reference_id

    def union(left: str, right: str) -> None:
        left_root, right_root = find(left), find(right)
        if left_root != right_root:
            parents[right_root] = left_root

    for record in normalized:
        for alias in as_list(record.get("aliases")):
            if alias in ids_after_identity:
                union(record["id"], alias)

    alias_groups: dict[str, list[dict]] = {}
    for record in normalized:
        alias_groups.setdefault(find(record["id"]), []).append(record)
    alias_removed = sum(len(records) - 1 for records in alias_groups.values())
    normalized = [merge_records(records) for records in alias_groups.values()]
    removed += alias_removed

    for record in normalized:
        semantics = authored_semantics.get(record["id"])
        if semantics:
            record.update(semantics)

    normalized.sort(key=lambda record: (str(record.get("category") or ""), int(record.get("year") or 0), record["id"]))
    verified = sum(bool(record.get("verified")) for record in normalized)
    # Only metadata-matched identifiers and curated official URLs are public
    # links. A locally registered identifier remains visible for review but is
    # not counted or emitted until the external metadata check verifies it.
    linked = sum(record.get("link_status") == "verified" for record in normalized)

    metadata = dict(data.get("metadata") or {})
    metadata.update(
        {
            "version": "3.0",
            "total_references": len(normalized),
            "verified_count": verified,
            "linked_count": linked,
            "unlinked_count": len(normalized) - linked,
            "alias_count": sum(len(record.get("aliases") or []) for record in normalized),
            "generated": date.today().isoformat(),
            "schema": "canonical-reference-registry-v1",
        }
    )
    data["metadata"] = metadata
    data["references"] = normalized

    print(
        f"records={len(normalized)} duplicates_removed={removed} "
        f"field_changes={changes} verified={verified} linked={linked}"
    )
    if not args.apply:
        print("(dry run — pass --apply to write the registry)")
        return 0

    REGISTRY.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
    print(f"written: {REGISTRY.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
