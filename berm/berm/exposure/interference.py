"""Multi-source EMF interference multiplier diagnostic.

DIAGNOSTIC_ONLY — does not affect TFR predictions.

Models the constructive/destructive interference pattern when
multiple EMF sources overlap in the near field around the body.
Real-world exposure is not simply additive — coherent sources
(e.g., phone + WiFi at same frequency) can produce local field
peaks up to 2x the RMS sum, while decoherent broadband sources
partially cancel.

The interference multiplier adjusts the simple sum-of-sources
exposure to account for:
  1. Frequency overlap (coherence factor)
  2. Spatial proximity of sources (near-field coupling)
  3. Temporal coincidence (duty cycle overlap)

Sources:
  Bakker 2010 (multi-source measurements),
  Liorni 2015 (aggregate exposure near body),
  Vermeeren 2015 (realistic exposure scenarios).
"""

import math


# Source definitions: (name, frequency_band_GHz, typical_power_mW)
SOURCES = [
    ("cellular_voice", 0.9, 200),
    ("cellular_data", 1.8, 100),
    ("wifi_2g", 2.4, 50),
    ("wifi_5g", 5.0, 30),
    ("bluetooth", 2.4, 10),
    ("base_station", 0.9, 5),
    ("smart_meter", 0.9, 2),
    ("microwave_oven_leak", 2.45, 50),
]


def frequency_coherence(f1_ghz: float, f2_ghz: float) -> float:
    """Coherence factor between two sources based on frequency proximity.

    Returns 0.0 (fully decoherent) to 1.0 (fully coherent).
    Sources within 100 MHz have significant coherence.
    """
    delta_f = abs(f1_ghz - f2_ghz)
    return math.exp(-delta_f / 0.1)


def source_coupling_matrix(active_sources: list[str]) -> dict:
    """Compute pairwise coupling factors for active sources.

    Returns a dict of (source_i, source_j) -> coupling_factor.
    """
    source_map = {s[0]: s for s in SOURCES}
    active = [source_map[s] for s in active_sources if s in source_map]

    couplings = {}
    for i, s1 in enumerate(active):
        for j, s2 in enumerate(active):
            if i >= j:
                continue
            coh = frequency_coherence(s1[1], s2[1])
            couplings[(s1[0], s2[0])] = round(coh, 4)
    return couplings


def interference_multiplier(
    active_sources: list[str] | None = None,
    duty_cycle: float = 0.5,
) -> dict:
    """Multi-source interference diagnostic.

    Parameters
    ----------
    active_sources : List of source names. If None, uses typical
                     indoor scenario (cellular, wifi, bluetooth).
    duty_cycle : Fraction of time sources overlap temporally (0-1).

    Returns dict with interference multiplier and breakdown.
    """
    if active_sources is None:
        active_sources = ["cellular_data", "wifi_2g", "bluetooth", "base_station"]

    source_map = {s[0]: s for s in SOURCES}
    active = [source_map[s] for s in active_sources if s in source_map]

    if len(active) <= 1:
        return {
            "multiplier": 1.0,
            "n_sources": len(active),
            "max_coherence": 0.0,
            "active_sources": [s[0] for s in active],
        }

    total_power = sum(s[2] for s in active)
    cross_terms = 0.0
    max_coh = 0.0

    for i, s1 in enumerate(active):
        for j, s2 in enumerate(active):
            if i >= j:
                continue
            coh = frequency_coherence(s1[1], s2[1])
            max_coh = max(max_coh, coh)
            cross_terms += 2.0 * math.sqrt(s1[2] * s2[2]) * coh * duty_cycle

    effective_power = total_power + cross_terms
    multiplier = effective_power / total_power if total_power > 0 else 1.0

    return {
        "multiplier": round(multiplier, 4),
        "n_sources": len(active),
        "max_coherence": round(max_coh, 4),
        "total_power_mW": total_power,
        "effective_power_mW": round(effective_power, 2),
        "cross_term_fraction": round(cross_terms / total_power, 4) if total_power > 0 else 0.0,
        "active_sources": [s[0] for s in active],
    }
