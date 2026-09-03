"""BERM-Eco differential susceptibility diagnostic.

DIAGNOSTIC ONLY — does not modify the TFR pipeline.

Calculates relative fitness advantage of parasites over hosts in the
changed physical field environment, based on BERM's species-specific candidate
modulome profiles.  FieldState is only the optional measurement representation.
"""

SPECIES_MODULOME_PROFILES = {
    "honeybee": {
        "em_sensitivity": 0.95,
        "primary_mechanisms": [
            "CRY_RPM",
            "electrostatic_sense",
            "olfactory_hygienic",
        ],
        "body_size_mm": 15,
        "ghz_resonance": True,
        "exoskeleton_shielding": 0.1,
    },
    "varroa": {
        "em_sensitivity": 0.05,
        "primary_mechanisms": [
            "chemical_hostfinding",
            "salivary_chitinase",
        ],
        "body_size_mm": 1.6,
        "ghz_resonance": False,
        "exoskeleton_shielding": 0.8,
    },
    "human": {
        "em_sensitivity": 0.60,
        "primary_mechanisms": [
            "VGCC",
            "CRY_circadian",
            "VNS_vagal",
            "spermatogenesis",
        ],
        "body_size_mm": 1750,
        "ghz_resonance": False,
        "exoskeleton_shielding": 0.0,
    },
    "ixodes_tick": {
        "em_sensitivity": 0.08,
        "primary_mechanisms": [
            "electrostatic_hostcontact",
            "chemical_aggregation",
        ],
        "body_size_mm": 3.5,
        "ghz_resonance": False,
        "exoskeleton_shielding": 0.7,
    },
    "migratory_bird": {
        "em_sensitivity": 0.90,
        "primary_mechanisms": [
            "CRY_RPM_compass",
            "magnetite",
        ],
        "body_size_mm": 150,
        "ghz_resonance": False,
        "exoskeleton_shielding": 0.0,
    },
    "bat": {
        "em_sensitivity": 0.80,
        "primary_mechanisms": [
            "magnetic_compass",
            "echolocation",
        ],
        "body_size_mm": 50,
        "ghz_resonance": False,
        "exoskeleton_shielding": 0.0,
    },
}


def differential_susceptibility(host: str, parasite: str) -> dict:
    """Calculate a BERM scenario for a changed physical field environment."""
    h = SPECIES_MODULOME_PROFILES[host]
    p = SPECIES_MODULOME_PROFILES[parasite]

    host_weakening = h["em_sensitivity"] * (1 - h["exoskeleton_shielding"])
    parasite_robustness = 1 - p["em_sensitivity"] * (1 - p["exoskeleton_shielding"])
    differential = host_weakening * parasite_robustness

    return {
        "host": host,
        "parasite": parasite,
        "host_weakening": round(host_weakening, 3),
        "parasite_robustness": round(parasite_robustness, 3),
        "differential_advantage": round(differential, 3),
        "interpretation": (
            f"FieldState change weakens {host} by factor "
            f"{host_weakening:.2f} while {parasite} retains "
            f"{parasite_robustness:.2f} of baseline fitness. "
            f"Net shift: {differential:.2f} in parasite's favor."
        ),
    }


if __name__ == "__main__":
    for host, parasite in [("honeybee", "varroa"), ("human", "ixodes_tick")]:
        result = differential_susceptibility(host, parasite)
        print(f"\n{host} vs {parasite}:")
        for k, v in result.items():
            print(f"  {k}: {v}")
