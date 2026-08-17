"""Sperm biomarker cascade: EMF -> ROS -> SDF -> Motility/Concentration.

Source: Panagopoulos 2025 (umbrella review), Houston 2019 (recovery).
Epistemic level: [E] for ROS pathway, [M|C] for cascade coupling.
"""

import numpy as np
from dataclasses import dataclass

@dataclass
class SpermState:
    """Sperm biomarker state vector."""
    ros_index: float
    sdf_index: float
    motility_index: float
    concentration: float
    total_count: float
    volume: float

GAMMA_ROS = 0.012
ALPHA_SDF = 0.20
GAMMA_SDF = 0.08
BETA_MOT = 0.15
GAMMA_MOT = 0.10
GAMMA_CONC = 0.008
BASELINE_CONC = 73.6
BASELINE_VOL = 3.7
BASELINE_MOT = 0.58

def ros_index(emf_instant: float) -> float:
    """ROS index from instantaneous EMF. Reversible (alpha~0.8).

    Mechanism: IFO-VGIC -> Ca2+ influx -> mitochondrial ROS
    Source: Panagopoulos 2025, Houston 2019
    Epistemic level: [E]
    """
    return 1.0 - np.exp(-GAMMA_ROS * emf_instant)

def sdf_index(ros_history: np.ndarray) -> float:
    """Sperm DNA fragmentation from ROS history. Partially irreversible.

    Source: Agarwal 2009 (ROS-SDF correlation r=0.87)
    Epistemic level: [M|C]
    """
    sdf = 0.0
    for ros in ros_history:
        sdf = sdf * (1 - ALPHA_SDF) + GAMMA_SDF * ros
    return float(np.clip(sdf, 0, 1))

def motility_index(ros: float, sdf: float) -> float:
    """Progressive motility from ROS and SDF.

    Source: Yildirim 2015 (phone users 49.3% vs 55.4%)
    Epistemic level: [L*]
    """
    return float(np.clip(
        BASELINE_MOT * (1 - BETA_MOT * ros) * (1 - GAMMA_MOT * sdf),
        0.05, BASELINE_MOT
    ))

def concentration(cum_emf: float) -> float:
    """Sperm concentration from cumulative EMF (Leydig cell damage).

    Source: Levine 2017 baseline 73.6M/ml (1973)
    Epistemic level: [M|C]
    """
    return BASELINE_CONC * np.exp(-GAMMA_CONC * cum_emf)

def compute_sperm_state(
    emf_instant: float,
    cum_emf: float,
    ros_history: np.ndarray | None = None,
) -> SpermState:
    """Full sperm biomarker state."""
    if ros_history is None:
        ros_history = np.array([ros_index(emf_instant)])
    ros = ros_index(emf_instant)
    sdf = sdf_index(ros_history)
    mot = motility_index(ros, sdf)
    conc = concentration(cum_emf)
    vol = BASELINE_VOL * (1 - 0.05 * sdf)
    total = conc * vol
    return SpermState(
        ros_index=ros, sdf_index=sdf, motility_index=mot,
        concentration=conc, total_count=total, volume=vol,
    )
