"""IVF compensation for biological TFR estimation.

IVF births buffer observed TFR — the biological reproductive capacity
is LOWER than observed TFR suggests because IVF compensates for
subfertility. This module separates the IVF contribution so the model
can calibrate against biological TFR and report both.

Sources: ESHRE, CDC, national ART registries.
"""

from berm.data.countries import IVF_SHARES

IVF_GROWTH_RATE = 0.005  # +0.5pp/year in developed countries
IVF_CAP = 0.25  # biological ceiling — not all births can be IVF


def ivf_share(country: str, year: int) -> float:
    """IVF share of live births, projected from 2023 baseline."""
    base = IVF_SHARES.get(country, 0.02)
    growth = max(0, year - 2023) * IVF_GROWTH_RATE
    return min(IVF_CAP, base + growth)


def biological_tfr(observed_tfr: float, country: str, year: int) -> float:
    """Biological TFR = observed TFR minus IVF-assisted births.

    Bio_TFR = Obs_TFR × (1 - IVF_share)
    """
    share = ivf_share(country, year)
    return observed_tfr * (1 - share)


def observed_from_biological(bio_tfr: float, country: str, year: int) -> float:
    """Reconstruct observed TFR from biological TFR by adding IVF back.

    Obs_TFR = Bio_TFR / (1 - IVF_share)
    """
    share = ivf_share(country, year)
    if share >= 1.0:
        return bio_tfr
    return bio_tfr / (1 - share)


def ivf_buffer(country: str, year: int, observed_tfr: float) -> dict:
    """Diagnostic: how much IVF buffers the observed TFR."""
    share = ivf_share(country, year)
    bio = observed_tfr * (1 - share)
    buffer = observed_tfr - bio
    buffer_pct = (buffer / bio * 100) if bio > 0 else 0

    return {
        "country": country,
        "year": year,
        "observed_tfr": round(observed_tfr, 3),
        "biological_tfr": round(bio, 3),
        "ivf_share": round(share, 4),
        "ivf_buffer": round(buffer, 3),
        "ivf_buffer_pct": round(buffer_pct, 1),
    }
