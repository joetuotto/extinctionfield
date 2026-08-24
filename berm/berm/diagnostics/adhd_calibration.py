"""
ADHD kehityksellisenä ionikanavien kalibraatiovirheenä.

Mallintaa raskausaikaisen EMF-altistuksen → VGCC-aktivaation →
ionikanavien kalibraatiovirheen → ADHD-fenotyypin ketjun.

Perustuu: Li 2020 (JAMA Network Open, 1482 paria),
CACNA1C GWAS-assosiaatiot, guanfasiinin HCN-mekanismi.

DIAGNOSTIC_ONLY: ei vaikuta TFR-ennusteeseen.
Ei kliiniseen käyttöön — parametrit ovat estimaatteja.
"""

from dataclasses import dataclass
import math


@dataclass
class ADHDCalibrationResult:
    prenatal_emf: float
    cacna1c_genotype: str
    calibration_error: float
    snr_deficit: float
    predicted_adhd_risk: float
    optimal_treatment: str


GENOTYPE_SENSITIVITY = {
    "T/T": 1.0,
    "T/C": 1.35,
    "C/C": 1.7,
}


def adhd_calibration_diagnostic(
    prenatal_emf: float,
    cacna1c: str = "T/T",
    postnatal_emf: float = 0.5,
) -> ADHDCalibrationResult:
    """Estimate calibration error magnitude and ADHD risk.

    DIAGNOSTIC_ONLY. Not for clinical use.
    """
    genotype_factor = GENOTYPE_SENSITIVITY.get(cacna1c, 1.0)

    cal_error = prenatal_emf * genotype_factor * 0.8

    snr_deficit = cal_error * 0.6 + postnatal_emf * 0.2

    risk = 0.04 + 0.3 / (1 + math.exp(-(snr_deficit - 0.3) / 0.1))

    if snr_deficit > 0.5:
        treatment = "Guanfasiini (suora HCN-korjaus)"
    elif snr_deficit > 0.3:
        treatment = "Guanfasiini tai metyylif."
    else:
        treatment = "Ei lääkehoitoa (matala riski)"

    return ADHDCalibrationResult(
        prenatal_emf=prenatal_emf,
        cacna1c_genotype=cacna1c,
        calibration_error=round(cal_error, 3),
        snr_deficit=round(snr_deficit, 3),
        predicted_adhd_risk=round(risk, 4),
        optimal_treatment=treatment,
    )


def compare_scenarios() -> dict:
    """Compare ADHD risk across genotypes and EMF environments."""
    scenarios = {
        "low_emf_tt": (0.1, "T/T", 0.2),
        "low_emf_tc": (0.1, "T/C", 0.2),
        "high_emf_tt": (0.8, "T/T", 0.7),
        "high_emf_tc": (0.8, "T/C", 0.7),
    }
    results = {}
    for name, (prenatal, geno, postnatal) in scenarios.items():
        r = adhd_calibration_diagnostic(prenatal, geno, postnatal)
        results[name] = {
            "risk": r.predicted_adhd_risk,
            "cal_error": r.calibration_error,
            "snr_deficit": r.snr_deficit,
            "treatment": r.optimal_treatment,
        }
    return results


def adhd_calibration_summary() -> dict:
    """Return the mechanistic chain and predictions."""
    return {
        "chain": [
            "Prenatal EMF → VGCC activation in fetal neurons",
            "Ca²⁺ influx during critical developmental window",
            "Ion channel calibration to EMF-contaminated baseline",
            "HCN/VGCC/KCNQ threshold shift in PFC pyramidal neurons",
            "Signal-to-noise ratio deficit in prefrontal cortex",
            "ADHD phenotype: inattention, impulsivity, dysregulation",
        ],
        "evidence_lines": {
            "genetic": "CACNA1C variants associate with ADHD, ASD, BD, MDD (GWAS)",
            "epidemiological": "Li 2020 JAMA: prenatal MF → ADHD (1482 pairs, 20y follow-up)",
            "pharmacological": "Guanfacine: α2A → cAMP↓ → HCN closure → Vm stabilized (FDA/EMA)",
        },
        "predictions": {
            "P33": "CACNA1C genotype × prenatal EMF → ADHD risk interaction",
            "P34": "Guanfacine protects against EMF-worsened ADHD better than stimulants",
            "P35": "ADHD prevalence acceleration follows prenatal EMF exposure with 3-10y lag",
        },
        "warnings": [
            "ADHD is MULTIFACTORIAL — genetics (60-90% heritability), chemicals, trauma, nutrition all significant",
            "Li 2020 is ONE cohort — independent replication is critical",
            "Calibration window analogy is THEORETICAL — EMF role not proven in humans",
            "Timothy syndrome is an EXTREME example — extrapolation requires caution",
            "Do NOT claim ADHD is an 'EMF disease' — BERM proposes one risk factor, not delegitimization",
            "Guanfacine argument is INDIRECT — ion channel role in SYMPTOMS ≠ role in CAUSE",
        ],
    }
