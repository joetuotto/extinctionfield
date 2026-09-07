"""Ion parametric resonance (IPR) mechanism candidate — receptor layer only.

This module is Layer 2 of the four-layer mechanism architecture:

    Layer 1  geometric operator      Lindgren metric -> delta g_mu_nu -> Q^mu_nu
    Layer 2  receptor module         bound ion -> phase modulation -> Bessel -> amplitude
    Layer 3  tissue transfer         local response -> biological endpoint      [NOT HERE]
    Layer 4  population aggregation  ASFR -> TFR                                 [NOT HERE]

It produces a local receptor-level response candidate and its provenance.
It does not, and must not, produce a TFR figure: the Layer 3 and Layer 4
transfer coefficients have not been estimated, so there is no transfer model
to multiply through. ``mechanism_response`` therefore returns no field that
could be read as a population effect.

Epistemic tags used in this module
----------------------------------
[L1]          algebraic consequence of the declared ansatz
[L1 + cond.]  conditional derivation: holds if the listed conditions hold
[KANDIDAATTI] additional assumption of the candidate, not derived from Lindgren
[HAVAINTO]    measured value under stated experimental conditions
[NUMEERINEN]  numerical compatibility between two numbers, not a measurement
[AVOIN]       open question

The calculation order is fixed: u -> lambda -> s -> z -> J_n -> readout.
"""

from __future__ import annotations

import math
from enum import Enum
from typing import Callable, NamedTuple

from scipy.special import jv

__all__ = [
    "ELEMENTARY_CHARGE",
    "ATOMIC_MASS_UNIT",
    "J1_FIRST_MAXIMUM",
    "J1_FIRST_NULL",
    "ION_TABLE",
    "Ion",
    "Readout",
    "MechanismInputs",
    "MechanismResponse",
    "ValidationRecord",
    "cyclotron_frequency",
    "charge_to_mass",
    "resonance_index",
    "relaxation_sensitivity",
    "bessel_argument",
    "argument_scale",
    "first_j1_maximum_amplitude",
    "first_j1_null_amplitude",
    "inverse_tau_for_argument_scale",
    "readout_value",
    "mechanism_response",
    "KOCH_2003_EXAMPLE",
    "koch_2003_worked_example",
    "GAVOCI_2013_NULL",
    "gavoci_2013_null_check",
]


# === Physical constants [HAVAINTO, CODATA 2018] ===

ELEMENTARY_CHARGE = 1.602176634e-19  # C
ATOMIC_MASS_UNIT = 1.66053906660e-27  # kg

# First maximum and first null of J1 [L1: Bessel function zeros]
J1_FIRST_MAXIMUM = 1.84118378
J1_FIRST_NULL = 3.83170597


class Ion(NamedTuple):
    """Ion identity for the charge-to-mass reference frequency."""

    symbol: str
    charge_number: int
    mass_amu: float  # isotope-averaged atomic mass [HAVAINTO]


#: Isotope-averaged masses. An isotope exchange changes `mass_amu` only,
#: which is what discriminating test `isotope_exchange` varies.
ION_TABLE: dict[str, Ion] = {
    "H+": Ion("H+", 1, 1.00794),
    "Li+": Ion("Li+", 1, 6.941),
    "Na+": Ion("Na+", 1, 22.98977),
    "Mg2+": Ion("Mg2+", 2, 24.3050),
    "K+": Ion("K+", 1, 39.0983),
    "Ca2+": Ion("Ca2+", 2, 40.078),
    "Mn2+": Ion("Mn2+", 2, 54.938044),
    "Zn2+": Ion("Zn2+", 2, 65.38),
}


class Readout(str, Enum):
    """Readout functions. The readout is NOT determined by the mechanism;
    it must be fixed separately for each biological endpoint [AVOIN].

    AMPLITUDE     J_n(z)                       signed sideband amplitude
    RATE          J_n(z)^2                     weak-transition rate, W ∝ |v_eff|^2
    INTERFERENCE  |a_ref + a_1 J_n(z)|^2       interference readout, can be
                                               negative, positive or null
                                               relative to a_ref^2
    """

    AMPLITUDE = "amplitude"
    RATE = "rate"
    INTERFERENCE = "interference"


class MechanismInputs(NamedTuple):
    """Receptor-layer inputs. Every field carries its provenance class."""

    q_m: float  # C/kg, from ION_TABLE or an explicit override     [HAVAINTO]
    B0: float  # T, static field                                    [HAVAINTO/site]
    b: float  # T, peak alternating amplitude                       [HAVAINTO/site]
    f: float  # Hz, drive frequency                                 [HAVAINTO/site]
    tau: float  # s, relaxation time                                [HAVAINTO or fit]
    c_gamma: float = 1.0  # dynamic-coupling ratio c/gamma          [KANDIDAATTI]
    readout: Readout = Readout.AMPLITUDE  # readout choice          [AVOIN]
    a_ref: float = 1.0  # reference amplitude for INTERFERENCE       [AVOIN]
    a_1: float = 1.0  # sideband weight for INTERFERENCE             [AVOIN]


class MechanismResponse(NamedTuple):
    """Local receptor response candidate. No population field by design."""

    f_c: float  # Hz    [L1: |q|B0/(2 pi m)]
    n: int  # resonance index round(f_c/f)                          [L1]
    u: float  # 2 pi f tau                                          [L1]
    lambda_: float  # relaxation sensitivity                        [KANDIDAATTI]
    s: float  # argument scale lambda * f_c/f                       [KANDIDAATTI]
    z: float  # Bessel argument s * b/B0                            [L1 + cond.]
    j_n_z: float  # J_n(z)                                          [L1 + cond.]
    response: float  # readout output                               [AVOIN readout]
    b_max: float  # T, first J1 maximum amplitude                   [L1 + cond.]
    b_null: float  # T, first J1 null amplitude                     [L1 + cond.]
    epistemic: tuple[str, ...]


# === Layer-2 formulas ===


def charge_to_mass(ion: Ion) -> float:
    """|q|/m in C/kg from the ion table [HAVAINTO]."""
    return abs(ion.charge_number) * ELEMENTARY_CHARGE / (ion.mass_amu * ATOMIC_MASS_UNIT)


def cyclotron_frequency(q_m: float, B0: float) -> float:
    """Ion reference frequency f_c = |q| B0 / (2 pi m) [L1].

    This is the bound-mode q/m separation in the isotropic harmonic binding
    model; it is conditional on isotropic binding.
    """
    if B0 <= 0:
        raise ValueError("B0 must be positive")
    return abs(q_m) * B0 / (2.0 * math.pi)


def resonance_index(f_c: float, f: float) -> int:
    """Nearest-integer resonance index n = round(f_c / f) [L1]."""
    if f <= 0:
        raise ValueError("f must be positive")
    return int(round(f_c / f))


def relaxation_sensitivity(f: float, tau: float, c_gamma: float = 1.0) -> float:
    """Frequency-dependent sensitivity lambda(f, tau) [KANDIDAATTI].

    General case:  |G|^2 = (1 + (1 + r_c)^2 u^2) / (1 + u^2),  u = 2 pi f tau
    With r_c = c/gamma = 1 this reduces to sqrt((1 + 4u^2) / (1 + u^2)), which
    runs from 1 at u -> 0 to 2 at u -> inf.

    The value c/gamma = 1 is the candidate's own assumption, chosen so that the
    high-frequency limit equals the IPR argument coefficient 2. It is not a
    constant fixed by Lindgren's ansatz and must not be presented as one.
    """
    if tau < 0:
        raise ValueError("tau must be non-negative")
    u = 2.0 * math.pi * f * tau
    g_squared = (1.0 + (1.0 + c_gamma) ** 2 * u * u) / (1.0 + u * u)
    return math.sqrt(g_squared)


def argument_scale(lambda_: float, f_c: float, f: float) -> float:
    """s = lambda * f_c / f — the coefficient multiplying b/B0 in z."""
    return lambda_ * f_c / f


def bessel_argument(lambda_: float, f_c: float, f: float, b: float, B0: float) -> float:
    """z = lambda * (f_c / f) * (b / B0) [L1 + conditional].

    Conditional on: the bound states exist, they mix, phase memory is long
    enough for the Jacobi-Anger expansion to apply, and a readout exists.
    """
    return argument_scale(lambda_, f_c, f) * b / B0


def first_j1_maximum_amplitude(lambda_: float, f_c: float, f: float, B0: float) -> float:
    """b at the first J1 maximum: 1.84118378 * B0 / (lambda f_c / f)."""
    return J1_FIRST_MAXIMUM * B0 / argument_scale(lambda_, f_c, f)


def first_j1_null_amplitude(lambda_: float, f_c: float, f: float, B0: float) -> float:
    """b at the first J1 null: 3.83170597 * B0 / (lambda f_c / f)."""
    return J1_FIRST_NULL * B0 / argument_scale(lambda_, f_c, f)


def inverse_tau_for_argument_scale(f: float, f_c: float, target_s: float = 2.0,
                                   c_gamma: float = 1.0) -> float:
    """Relaxation time that makes lambda * f_c / f equal `target_s` exactly.

    [NUMEERINEN] This is a reverse calculation from a demanded coefficient.
    It is not an independent measurement and not a blind prediction. Its
    closeness to a measured value is a numerical compatibility, nothing more.

    Solving |G|^2 = L^2 for u with L = target_s * f / f_c:
        u^2 = (L^2 - 1) / ((1 + r_c)^2 - L^2)
    """
    lam = target_s * f / f_c
    top = lam * lam - 1.0
    bottom = (1.0 + c_gamma) ** 2 - lam * lam
    if top < 0 or bottom <= 0:
        raise ValueError(
            f"lambda = {lam:.4f} is outside the reachable range [1, {1 + c_gamma}]"
        )
    return math.sqrt(top / bottom) / (2.0 * math.pi * f)


def readout_value(readout: Readout, n: int, z: float, a_ref: float = 1.0, a_1: float = 1.0) -> float:
    """Apply the chosen readout to J_n(z) [AVOIN: readout is not derived]."""
    j = float(jv(n, z))
    if readout is Readout.AMPLITUDE:
        return j
    if readout is Readout.RATE:
        return j * j
    if readout is Readout.INTERFERENCE:
        return (a_ref + a_1 * j) ** 2
    raise ValueError(f"unknown readout {readout!r}")


def mechanism_response(inputs: MechanismInputs) -> MechanismResponse:
    """Run the receptor layer in the fixed order u -> lambda -> s -> z -> J -> readout.

    Returns the local response candidate only. There is deliberately no
    population or fertility field on the result.
    """
    f_c = cyclotron_frequency(inputs.q_m, inputs.B0)
    n = resonance_index(f_c, inputs.f)
    u = 2.0 * math.pi * inputs.f * inputs.tau
    lam = relaxation_sensitivity(inputs.f, inputs.tau, inputs.c_gamma)
    s = argument_scale(lam, f_c, inputs.f)
    z = s * inputs.b / inputs.B0
    j = float(jv(n, z))
    resp = readout_value(inputs.readout, n, z, inputs.a_ref, inputs.a_1)
    return MechanismResponse(
        f_c=f_c,
        n=n,
        u=u,
        lambda_=lam,
        s=s,
        z=z,
        j_n_z=j,
        response=resp,
        b_max=J1_FIRST_MAXIMUM * inputs.B0 / s,
        b_null=J1_FIRST_NULL * inputs.B0 / s,
        epistemic=(
            "f_c: L1 (isotropic harmonic binding)",
            "n: L1",
            "lambda: KANDIDAATTI (c/gamma assumed)",
            "z, J_n: L1 + conditional (states exist, mix, phase memory, readout)",
            "readout: AVOIN (not derived; must predict null, positive and negative)",
            "population transfer: NOT COMPUTED (Layer 3-4 coefficients unestimated)",
        ),
    )


# === Worked example: Bauréus Koch et al. 2003, 24 Hz drive at 37 µT ===


class WorkedExample(NamedTuple):
    f: float
    f_c: float
    tau: float
    B0: float
    c_gamma: float
    f_c_source: str
    tau_source: str


#: The synthesis (§15) takes f_c = 25.2 Hz as the Ca2+ interpretation of the
#: 24 Hz Koch condition. Note: the bare Ca2+ cyclotron frequency at 37 µT is
#: 28.35 Hz (see `koch_2003_worked_example`); 25.2 Hz corresponds to
#: B0 ≈ 32.9 µT for bare Ca2+, inside Koch's reported 27–37 µT range.
KOCH_2003_EXAMPLE = WorkedExample(
    f=24.0,
    f_c=25.2,
    tau=0.020,
    B0=37e-6,
    c_gamma=1.0,
    f_c_source="synthesis §15, Ca2+ interpretation [KANDIDAATTI input]",
    tau_source="Park et al. 2008, calmodulin N-terminal conformational change ~20 ms "
    "under chemical Ca2+ step, not a magnetic-field response [HAVAINTO]",
)


def koch_2003_worked_example() -> dict[str, float | str]:
    """Reproduce the synthesis §15 numbers and label each one.

    The ~1% figure is a comparison of ARGUMENT COEFFICIENTS (s against the
    IPR coefficient 2), not a goodness of fit to raw data.
    """
    ex = KOCH_2003_EXAMPLE
    u = 2.0 * math.pi * ex.f * ex.tau
    lam = relaxation_sensitivity(ex.f, ex.tau, ex.c_gamma)
    s = argument_scale(lam, ex.f_c, ex.f)
    bare_ca = cyclotron_frequency(charge_to_mass(ION_TABLE["Ca2+"]), ex.B0)
    return {
        "u": u,
        "lambda": lam,
        "s": s,
        "coefficient_mismatch_vs_2": abs(s - 2.0) / 2.0,
        "b_max_T": J1_FIRST_MAXIMUM * ex.B0 / s,
        "b_null_T": J1_FIRST_NULL * ex.B0 / s,
        "tau_for_s_equal_2_s": inverse_tau_for_argument_scale(ex.f, ex.f_c, 2.0, ex.c_gamma),
        "bare_Ca2+_f_c_at_B0_Hz": bare_ca,
        "B0_for_bare_Ca2+_at_25.2Hz_T": 25.2 * 2.0 * math.pi / charge_to_mass(ION_TABLE["Ca2+"]),
        "status": "NUMEERINEN YHTEENSOPIVUUS: argument-coefficient comparison, "
        "not a raw-data fit and not a blind prediction",
    }


# === Null result: Gavoçi et al. 2013, K+ IPR conditions ===


class ValidationRecord(NamedTuple):
    """A published result the module must be able to represent, including nulls."""

    reference_id: str
    ion: str
    system: str
    endpoint: str
    observed: str
    status: str
    constraint: str


GAVOCI_2013_NULL = ValidationRecord(
    reference_id="gavoci2013_ipr_k_null",
    ion="K+",
    system="human neuroblastoma BE(2)C, whole-cell patch clamp",
    endpoint="TEA-sensitive voltage-dependent outward K+ current density",
    observed="no significant change before, during or after exposure at K+ IPR conditions",
    status="HAVAINTO: null result",
    constraint=(
        "A tissue-specific coupling invoked to absorb this null needs its own "
        "independent measurement. A free coefficient set to zero separately for "
        "each exception removes the model's predictive content."
    ),
)


def gavoci_2013_null_check(b_over_B0: float = 1.8, tau: float = 0.0) -> dict[str, float | str]:
    """What the receptor layer says at the K+ IPR condition Gavoçi tested.

    With tau = 0 the candidate reduces to the fixed IPR argument (lambda = 1),
    i.e. the same prediction the experiment was designed against. Whatever the
    readout, the module predicts a non-null J_1 response at b/B0 ≈ 1.8; the
    observation was null. The null is kept in the validation set as a
    constraint, not explained away.
    """
    ion = ION_TABLE["K+"]
    B0 = 45e-6  # representative geomagnetic-scale static field [assumption for the check]
    f_c = cyclotron_frequency(charge_to_mass(ion), B0)
    lam = relaxation_sensitivity(f_c, tau)  # drive at n = 1 → f = f_c
    z = lam * 1.0 * b_over_B0  # n = 1 tuned: f_c/f = 1
    return {
        "ion": ion.symbol,
        "f_c_at_45uT_Hz": f_c,
        "z": z,
        "J1_z": float(jv(1, z)),
        "predicted_non_null": float(abs(jv(1, z)) > 0.05),
        "observed": GAVOCI_2013_NULL.observed,
        "status": GAVOCI_2013_NULL.status,
        "constraint": GAVOCI_2013_NULL.constraint,
    }
