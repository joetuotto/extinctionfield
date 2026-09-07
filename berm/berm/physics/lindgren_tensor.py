"""Conditional tensor algebra for the 2025 Lindgren metric ansatz.

Epistemic scope
----------------
``g_mn = eta_mn + kappa A_m A_n`` is treated as the L0 premise.  The inverse,
determinant, exact perturbation and directional volume derivative below are L1
linear algebra *conditional on that premise and on the stated domain*.

This module does not infer a biological observable.  The Lorentzian result is
the directed derivative ``kappa (A dot u) / sqrt(1 + kappa A^2)``.  Its
``A/sqrt(1+A^2)`` form follows only after an explicit spatial/scalar reduction.
The algebraic chi formula remains L1; selecting a positive-definite spatial
slice and identifying its scalar coordinate is an L2 bridge.  Identifying that
coordinate with a concrete membrane, ambient or observable quantity remains
open and is not an algebra error.

Empirical inputs later in the chain do not relabel or erase an L1 result.  A
composite calculation must retain component-wise provenance (L1 derived, L2
identification, L3 empirical) instead of collapsing everything to L3.  The
published 2025 theory also uses an action principle and a Weyl connection; the
metric ansatz plus the contracted Bianchi identity alone is not encoded here
as a derivation of Maxwell's source equations.
"""

from __future__ import annotations

import hashlib
import json
import math
from collections.abc import Sequence
from dataclasses import dataclass
from numbers import Real
from typing import Literal, TypeAlias


Vector4: TypeAlias = tuple[float, float, float, float]
Tensor4: TypeAlias = tuple[Vector4, Vector4, Vector4, Vector4]
Connection4: TypeAlias = tuple[Tensor4, Tensor4, Tensor4, Tensor4]
Rank3Tensor4: TypeAlias = tuple[Tensor4, Tensor4, Tensor4, Tensor4]
Rank4Tensor4: TypeAlias = tuple[
    Rank3Tensor4,
    Rank3Tensor4,
    Rank3Tensor4,
    Rank3Tensor4,
]
VariationBranch: TypeAlias = Literal[
    "EINSTEIN_HILBERT",
    "METRIC_GRADIENT_GME",
]

EINSTEIN_HILBERT_BRANCH: VariationBranch = "EINSTEIN_HILBERT"
METRIC_GRADIENT_GME_BRANCH: VariationBranch = "METRIC_GRADIENT_GME"

_INPUT_BUNDLE_DIGEST_SCHEMA = "berm.lindgren-three-element-input-bundle.v2"

MINKOWSKI_METRIC: Tensor4 = (
    (-1.0, 0.0, 0.0, 0.0),
    (0.0, 1.0, 0.0, 0.0),
    (0.0, 0.0, 1.0, 0.0),
    (0.0, 0.0, 0.0, 1.0),
)


def _finite(name: str, value: Real) -> float:
    if isinstance(value, bool) or not isinstance(value, Real):
        raise ValueError(f"{name} must be a real number")
    resolved = float(value)
    if not math.isfinite(resolved):
        raise ValueError(f"{name} must be finite")
    return resolved


def _positive(name: str, value: Real) -> float:
    resolved = _finite(name, value)
    if resolved <= 0.0:
        raise ValueError(f"{name} must be positive")
    return resolved


def _nonnegative(name: str, value: Real) -> float:
    resolved = _finite(name, value)
    if resolved < 0.0:
        raise ValueError(f"{name} must be non-negative")
    return resolved


def _nonempty(name: str, value: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{name} must be a non-empty string")
    return value.strip()


def _sha256_hex(name: str, value: str) -> str:
    digest = _nonempty(name, value).lower()
    if len(digest) != 64 or any(
        character not in "0123456789abcdef" for character in digest
    ):
        raise ValueError(f"{name} must be a 64-character SHA-256 hex digest")
    return digest


def _vector4(name: str, vector: Sequence[Real]) -> Vector4:
    if isinstance(vector, (str, bytes)) or len(vector) != 4:
        raise ValueError(f"{name} must contain exactly four components")
    values = tuple(
        _finite(f"{name}[{index}]", value) for index, value in enumerate(vector)
    )
    return values  # type: ignore[return-value]


def _tensor4(name: str, tensor: Sequence[Sequence[Real]]) -> Tensor4:
    if isinstance(tensor, (str, bytes)) or len(tensor) != 4:
        raise ValueError(f"{name} must contain exactly four rows")
    rows = tuple(_vector4(f"{name}[{index}]", row) for index, row in enumerate(tensor))
    return rows  # type: ignore[return-value]


def _rank3_tensor4(
    name: str,
    tensor: Sequence[Sequence[Sequence[Real]]],
) -> Rank3Tensor4:
    if isinstance(tensor, (str, bytes)) or len(tensor) != 4:
        raise ValueError(f"{name} must contain exactly four outer-index blocks")
    blocks = tuple(
        _tensor4(f"{name}[{index}]", block) for index, block in enumerate(tensor)
    )
    return blocks  # type: ignore[return-value]


def _rank4_tensor4(
    name: str,
    tensor: Sequence[Sequence[Sequence[Sequence[Real]]]],
) -> Rank4Tensor4:
    if isinstance(tensor, (str, bytes)) or len(tensor) != 4:
        raise ValueError(f"{name} must contain exactly four upper-index blocks")
    blocks = tuple(
        _rank3_tensor4(f"{name}[{index}]", block) for index, block in enumerate(tensor)
    )
    return blocks  # type: ignore[return-value]


def _variation_branch(name: str, value: str) -> VariationBranch:
    if value not in (EINSTEIN_HILBERT_BRANCH, METRIC_GRADIENT_GME_BRANCH):
        raise ValueError(
            f"{name} must be {EINSTEIN_HILBERT_BRANCH!r} or "
            f"{METRIC_GRADIENT_GME_BRANCH!r}"
        )
    return value  # type: ignore[return-value]


def _digest_float(value: float) -> str:
    """Return one canonical finite binary64 representation for digesting."""

    # Positive and negative zero are equal numerical inputs for every operation
    # in this module, so canonicalize both to the same digest representation.
    return (0.0 if value == 0.0 else value).hex()


def _digest_vector(vector: Vector4) -> list[str]:
    return [_digest_float(value) for value in vector]


def _digest_tensor(tensor: Tensor4) -> list[list[str]]:
    return [_digest_vector(row) for row in tensor]


def _digest_rank3(tensor: Rank3Tensor4) -> list[list[list[str]]]:
    return [_digest_tensor(block) for block in tensor]


def three_element_input_bundle_digest(
    *,
    potential: Sequence[Real],
    einstein_tensor_contravariant: Sequence[Sequence[Real]],
    full_action_derivative: Sequence[Real],
    required_variation_branch: str,
    partial_potential: Sequence[Sequence[Real]],
    covariant_laplacian_potential: Sequence[Real],
    covariant_laplacian_metric: Sequence[Sequence[Real]],
    covariant_laplacian_background_metric: Sequence[Sequence[Real]],
    covariant_laplacian_potential_outer: Sequence[Sequence[Real]],
    connection: Sequence[Sequence[Sequence[Real]]],
    one_form: Sequence[Real],
    field_tensor: Sequence[Sequence[Real]],
    partial_field_tensor: Sequence[Sequence[Sequence[Real]]],
    levi_civita_covariant_divergence_einstein: Sequence[Real],
    kappa: Real = 1.0,
) -> str:
    """Return a deterministic SHA-256 digest of every numerical gate input.

    The digest binds an attestation to the exact numerical input bundle supplied
    to :func:`evaluate_three_element_derivation`.  It is an integrity/provenance
    link only: matching content does not prove a mathematical derivation, make an
    attestation independently trustworthy or establish empirical validity.
    """

    a_cov = _vector4("potential", potential)
    einstein = _tensor4(
        "einstein_tensor_contravariant",
        einstein_tensor_contravariant,
    )
    action_derivative = _vector4(
        "full_action_derivative",
        full_action_derivative,
    )
    variation_branch = _variation_branch(
        "required_variation_branch",
        required_variation_branch,
    )
    partial_a = _tensor4("partial_potential", partial_potential)
    laplacian_a = _vector4(
        "covariant_laplacian_potential",
        covariant_laplacian_potential,
    )
    laplacian_g = _tensor4(
        "covariant_laplacian_metric",
        covariant_laplacian_metric,
    )
    laplacian_eta = _tensor4(
        "covariant_laplacian_background_metric",
        covariant_laplacian_background_metric,
    )
    laplacian_outer = _tensor4(
        "covariant_laplacian_potential_outer",
        covariant_laplacian_potential_outer,
    )
    gamma = _rank3_tensor4("connection", connection)
    phi = _vector4("one_form", one_form)
    f_cov = _tensor4("field_tensor", field_tensor)
    partial_f = _rank3_tensor4("partial_field_tensor", partial_field_tensor)
    lc_divergence = _vector4(
        "levi_civita_covariant_divergence_einstein",
        levi_civita_covariant_divergence_einstein,
    )
    coupling = _finite("kappa", kappa)

    payload = {
        "connection": _digest_rank3(gamma),
        "covariant_laplacian_background_metric": _digest_tensor(laplacian_eta),
        "covariant_laplacian_metric": _digest_tensor(laplacian_g),
        "covariant_laplacian_potential_outer": _digest_tensor(laplacian_outer),
        "covariant_laplacian_potential": _digest_vector(laplacian_a),
        "einstein_tensor_contravariant": _digest_tensor(einstein),
        "field_tensor": _digest_tensor(f_cov),
        "full_action_derivative": _digest_vector(action_derivative),
        "kappa": _digest_float(coupling),
        "levi_civita_covariant_divergence_einstein": _digest_vector(lc_divergence),
        "one_form": _digest_vector(phi),
        "partial_field_tensor": _digest_rank3(partial_f),
        "partial_potential": _digest_tensor(partial_a),
        "potential": _digest_vector(a_cov),
        "required_variation_branch": variation_branch,
        "schema": _INPUT_BUNDLE_DIGEST_SCHEMA,
    }
    encoded = json.dumps(
        payload,
        ensure_ascii=True,
        separators=(",", ":"),
        sort_keys=True,
    ).encode("ascii")
    return hashlib.sha256(encoded).hexdigest()


def minkowski_dot(left: Sequence[Real], right: Sequence[Real]) -> float:
    """Return ``eta^(mn) left_m right_n`` for signature ``(-,+,+,+)``."""

    a = _vector4("left", left)
    b = _vector4("right", right)
    return -a[0] * b[0] + math.fsum(a[index] * b[index] for index in range(1, 4))


def raise_minkowski(vector: Sequence[Real]) -> Vector4:
    """Raise a covector with the fixed Minkowski background metric."""

    value = _vector4("vector", vector)
    return (-value[0], value[1], value[2], value[3])


def lindgren_metric(potential: Sequence[Real], *, kappa: Real = 1.0) -> Tensor4:
    """L0: construct ``eta_mn + kappa A_m A_n``."""

    a = _vector4("potential", potential)
    coupling = _finite("kappa", kappa)
    return tuple(
        tuple(MINKOWSKI_METRIC[mu][nu] + coupling * a[mu] * a[nu] for nu in range(4))
        for mu in range(4)
    )  # type: ignore[return-value]


def metric_denominator(potential: Sequence[Real], *, kappa: Real = 1.0) -> float:
    """Return the Sherman--Morrison denominator ``1 + kappa A^2``."""

    coupling = _finite("kappa", kappa)
    return 1.0 + coupling * minkowski_dot(potential, potential)


def lindgren_inverse_metric(
    potential: Sequence[Real],
    *,
    kappa: Real = 1.0,
) -> Tensor4:
    """L1: inverse metric on the non-singular ``1 + kappa A^2 != 0`` domain."""

    a_cov = _vector4("potential", potential)
    coupling = _finite("kappa", kappa)
    denominator = metric_denominator(a_cov, kappa=coupling)
    if denominator == 0.0:
        raise ValueError("metric is singular because 1 + kappa A^2 is zero")
    a_up = raise_minkowski(a_cov)
    return tuple(
        tuple(
            MINKOWSKI_METRIC[mu][nu] - coupling * a_up[mu] * a_up[nu] / denominator
            for nu in range(4)
        )
        for mu in range(4)
    )  # type: ignore[return-value]


def lindgren_metric_determinant(
    potential: Sequence[Real],
    *,
    kappa: Real = 1.0,
) -> float:
    """L1: ``det(g) = -(1 + kappa A^2)`` for the chosen signature."""

    return -metric_denominator(potential, kappa=kappa)


def lindgren_volume_element(
    potential: Sequence[Real],
    *,
    kappa: Real = 1.0,
) -> float:
    """L1: return real ``sqrt(-det(g))`` on the Lorentzian branch.

    The branch requires ``1 + kappa A^2 > 0``.  This condition matters for a
    timelike potential and cannot be removed by writing an unsigned Euclidean
    magnitude.
    """

    return volume_element_from_norm_squared(
        minkowski_dot(potential, potential),
        kappa=kappa,
    )


def volume_element_from_norm_squared(
    potential_norm_squared: Real,
    *,
    kappa: Real = 1.0,
) -> float:
    """L1: √(-det g) = √(1+κA²). Determinantin lemma."""

    norm_squared = _finite("potential_norm_squared", potential_norm_squared)
    coupling = _finite("kappa", kappa)
    denominator = 1.0 + coupling * norm_squared
    if denominator <= 0.0:
        raise ValueError("real Lorentzian volume requires 1 + kappa A^2 > 0")
    return math.sqrt(denominator)


def einstein_hilbert_action_density(
    potential: Sequence[Real],
    scalar_curvature: Real,
    *,
    kappa: Real = 1.0,
) -> float:
    """L0 variational premise density ``sqrt(-g) R``.

    The spacetime integration, boundary term and normalization are deliberately
    left to the caller.  This function records the local integrand of
    ``S=integral sqrt(-g) R d^4x`` without pretending to solve its variation.
    """

    curvature = _finite("scalar_curvature", scalar_curvature)
    return lindgren_volume_element(potential, kappa=kappa) * curvature


def einstein_hilbert_potential_variation_residual(
    potential: Sequence[Real],
    einstein_tensor_contravariant: Sequence[Sequence[Real]],
    *,
    kappa: Real = 1.0,
) -> Vector4:
    """L1: Euler--Lagrange residual ``delta S_EH / delta A_lambda``.

    For ``S_EH = integral sqrt(-g) R d^4x`` and
    ``g_mu_nu = eta_mu_nu + kappa A_mu A_nu``, variation with respect to the
    covariant potential gives, up to the conventional overall gravitational
    normalization and boundary term,

    ``-2 kappa sqrt(-g) G^(lambda nu) A_nu``.

    The sign and non-zero overall normalization do not affect the stationarity
    equation. This helper keeps the Einstein--Hilbert variation explicit; it
    is not replaced by a Bianchi check or by the harmonic/GME residual.
    """

    a_cov = _vector4("potential", potential)
    einstein = _tensor4(
        "einstein_tensor_contravariant",
        einstein_tensor_contravariant,
    )
    for mu in range(4):
        for nu in range(mu + 1, 4):
            if not math.isclose(
                einstein[mu][nu],
                einstein[nu][mu],
                rel_tol=1e-12,
                abs_tol=1e-12,
            ):
                raise ValueError("einstein_tensor_contravariant must be symmetric")
    coupling = _finite("kappa", kappa)
    volume = lindgren_volume_element(a_cov, kappa=coupling)
    return tuple(
        -2.0
        * coupling
        * volume
        * math.fsum(einstein[lam][nu] * a_cov[nu] for nu in range(4))
        for lam in range(4)
    )  # type: ignore[return-value]


def volume_directional_derivative(
    background: Sequence[Real],
    direction: Sequence[Real],
    *,
    kappa: Real = 1.0,
) -> float:
    """L1: derivative of ``sqrt(-det g(A + eps*u))`` at ``eps=0``.

    The exact result is ``kappa (A dot u) / sqrt(1 + kappa A^2)``.  ``u`` is
    deliberately explicit: a Lorentzian vector space has no universal
    Euclidean ``cos(theta)`` or unsigned ``|A|`` reduction.
    """

    a = _vector4("background", background)
    u = _vector4("direction", direction)
    coupling = _finite("kappa", kappa)
    denominator = lindgren_volume_element(a, kappa=coupling)
    return coupling * minkowski_dot(a, u) / denominator


def scalar_spacelike_volume_sensitivity(
    background: Real,
    *,
    kappa: Real = 1.0,
) -> float:
    """Evaluate ``kappa*A/sqrt(1+kappa*A^2)`` on a supplied scalar slice.

    The chi formula is L1 algebra.  Choosing this dimensionless, collinear
    spacelike scalar reduction from a Lorentz tensor is an explicit L2 bridge.
    Identifying a membrane field or measured ambient magnitude with the scalar
    coordinate remains open and requires a dimensional normalization.
    """

    value = _finite("background", background)
    coupling = _finite("kappa", kappa)
    denominator = 1.0 + coupling * value * value
    if denominator <= 0.0:
        raise ValueError("real spacelike volume response requires 1 + kappa A^2 > 0")
    return coupling * value / math.sqrt(denominator)


def dimensionless_spacelike_coordinate(
    spatial_amplitude: Real,
    *,
    kappa: Real = 1.0,
) -> float:
    """L2 bridge: return ``x=sqrt(kappa)*s`` for a chosen spatial slice.

    General tensor algebra permits any finite ``kappa`` on its stated metric
    domain.  This particular change of variable is deliberately narrower:
    a real ``sqrt(kappa)`` coordinate requires ``kappa > 0``.
    """

    amplitude = _finite("spatial_amplitude", spatial_amplitude)
    coupling = _positive("kappa", kappa)
    return math.sqrt(coupling) * amplitude


def geodesic_deviation_selection_rule(
    background: Real,
) -> float:
    """L1: χ(Ā) = Ā/√(1+Ā²). Johdettu tilavuuselementin linearisaatiosta."""

    dimensionless_coordinate = _finite("background", background)
    return dimensionless_coordinate / math.sqrt(
        1.0 + dimensionless_coordinate * dimensionless_coordinate
    )


def first_order_metric_perturbation(
    biological_potential: Sequence[Real],
    external_potential: Sequence[Real],
    *,
    kappa: Real = 1.0,
) -> Tensor4:
    """L1: cross term ``kappa(A_bio tensor a + a tensor A_bio)``."""

    background = _vector4("biological_potential", biological_potential)
    external = _vector4("external_potential", external_potential)
    coupling = _finite("kappa", kappa)
    return tuple(
        tuple(
            coupling * (background[mu] * external[nu] + external[mu] * background[nu])
            for nu in range(4)
        )
        for mu in range(4)
    )  # type: ignore[return-value]


def metric_perturbation(
    biological_potential: Sequence[Real],
    external_potential: Sequence[Real],
    *,
    kappa: Real = 1.0,
) -> Tensor4:
    """L1: exact ``g(A_bio+a)-g(A_bio)``, including ``a tensor a``."""

    background = _vector4("biological_potential", biological_potential)
    external = _vector4("external_potential", external_potential)
    coupling = _finite("kappa", kappa)
    return tuple(
        tuple(
            coupling
            * (
                background[mu] * external[nu]
                + external[mu] * background[nu]
                + external[mu] * external[nu]
            )
            for nu in range(4)
        )
        for mu in range(4)
    )  # type: ignore[return-value]


def metric_tensor_norm_squared(
    covariant_tensor: Sequence[Sequence[Real]],
    inverse_metric: Sequence[Sequence[Real]],
) -> float:
    """Contract ``T_mn T_ab g^(ma) g^(nb)`` with explicit index order."""

    tensor = _tensor4("covariant_tensor", covariant_tensor)
    inverse = _tensor4("inverse_metric", inverse_metric)
    return math.fsum(
        tensor[mu][nu] * tensor[alpha][beta] * inverse[mu][alpha] * inverse[nu][beta]
        for mu in range(4)
        for nu in range(4)
        for alpha in range(4)
        for beta in range(4)
    )


def spacelike_first_order_h_norm(
    background_amplitude: Real,
    perturbation_amplitude: Real,
    *,
    kappa: Real = 1.0,
) -> float:
    """L2 bridge check: norm collinear spacelike ``h_mn`` on a chosen slice.

    The reduction embeds ``A=(0,s,0,0)`` and ``a=(0,q,0,0)`` and computes
    ``h=kappa(A tensor a+a tensor A)`` without replacing the tensor by a dot
    product.  It is defined for every finite ``kappa`` with
    ``1+kappa*s^2 != 0``; no ``sqrt(kappa)`` coordinate is used here.
    """

    spatial = _finite("background_amplitude", background_amplitude)
    perturbation = _finite("perturbation_amplitude", perturbation_amplitude)
    coupling = _finite("kappa", kappa)
    background: Vector4 = (0.0, spatial, 0.0, 0.0)
    direction: Vector4 = (0.0, perturbation, 0.0, 0.0)
    inverse = lindgren_inverse_metric(background, kappa=coupling)
    h_cov = first_order_metric_perturbation(
        background,
        direction,
        kappa=coupling,
    )
    norm_squared = metric_tensor_norm_squared(h_cov, inverse)
    if norm_squared < 0.0 and not math.isclose(norm_squared, 0.0, abs_tol=1e-15):
        raise ValueError("the requested reduction does not have a spacelike h norm")
    return math.sqrt(max(0.0, norm_squared))


def spacelike_h_norm_reduction_residual(
    background_amplitude: Real,
    perturbation_amplitude: Real,
    *,
    kappa: Real = 1.0,
) -> float:
    """Check the exact collinear reduction ``||h||=2|kappa*s*q/D|``.

    A zero result verifies the tensor contraction against the analytic scalar
    formula.  The chi formula remains L1; selecting this Euclidean/spatial
    scalar slice is L2 and is not an observable or biological normalization.
    """

    spatial = _finite("background_amplitude", background_amplitude)
    perturbation = _finite("perturbation_amplitude", perturbation_amplitude)
    coupling = _finite("kappa", kappa)
    denominator = 1.0 + coupling * spatial * spatial
    if denominator == 0.0:
        raise ValueError("metric is singular because 1 + kappa A^2 is zero")
    tensor_norm = spacelike_first_order_h_norm(
        spatial,
        perturbation,
        kappa=coupling,
    )
    analytic_norm = 2.0 * abs(coupling * spatial * perturbation / denominator)
    return tensor_norm - analytic_norm


def contract_tensor(
    response_tensor: Sequence[Sequence[Real]],
    perturbation: Sequence[Sequence[Real]],
) -> float:
    """Contract a caller-supplied contravariant response tensor with ``delta g``."""

    response = _tensor4("response_tensor", response_tensor)
    delta_g = _tensor4("perturbation", perturbation)
    return math.fsum(
        response[mu][nu] * delta_g[mu][nu] for mu in range(4) for nu in range(4)
    )


def contract_metric_perturbation(
    response_tensor: Sequence[Sequence[Real]],
    biological_potential: Sequence[Real],
    external_potential: Sequence[Real],
    *,
    kappa: Real = 1.0,
) -> float:
    """Expand the exact perturbation and apply an explicit candidate L2 tensor."""

    return contract_tensor(
        response_tensor,
        metric_perturbation(
            biological_potential,
            external_potential,
            kappa=kappa,
        ),
    )


def levi_civita_connection(
    potential: Sequence[Real],
    partial_potential: Sequence[Sequence[Real]],
    *,
    kappa: Real = 1.0,
) -> Connection4:
    """L1: Levi-Civita connection of ``eta + kappa A tensor A``.

    ``partial_potential[mu][nu]`` is ``partial_mu A_nu``.  This is only the
    Levi-Civita part.  It must not be confused with the Weyl connection used
    by the 2025 paper, which contains an additional one-form.
    """

    a = _vector4("potential", potential)
    partial = _tensor4("partial_potential", partial_potential)
    coupling = _finite("kappa", kappa)
    inverse = lindgren_inverse_metric(a, kappa=coupling)

    def partial_metric(derivative: int, left: int, right: int) -> float:
        return coupling * (
            partial[derivative][left] * a[right] + a[left] * partial[derivative][right]
        )

    return tuple(
        tuple(
            tuple(
                0.5
                * math.fsum(
                    inverse[upper][sigma]
                    * (
                        partial_metric(mu, nu, sigma)
                        + partial_metric(nu, mu, sigma)
                        - partial_metric(sigma, mu, nu)
                    )
                    for sigma in range(4)
                )
                for nu in range(4)
            )
            for mu in range(4)
        )
        for upper in range(4)
    )  # type: ignore[return-value]


def lindgren_connection_field_decomposition(
    potential: Sequence[Real],
    partial_potential: Sequence[Sequence[Real]],
    *,
    kappa: Real = 1.0,
) -> Connection4:
    """L1: exact Christoffel decomposition into ``S`` and ``F`` terms.

    With ``S_mu_nu=partial_mu A_nu+partial_nu A_mu`` and
    ``F_mu_nu=partial_mu A_nu-partial_nu A_mu``, this evaluates

    ``Gamma^l_mu_nu = kappa/2 g^l_sigma
       (S_mu_nu A_sigma + F_mu_sigma A_nu + F_nu_sigma A_mu)``.

    It is algebraically identical to :func:`levi_civita_connection`; keeping
    both implementations makes the appearance of the electromagnetic
    two-form in the metric connection directly testable.  The distinct Weyl
    correction is still added only by :func:`weyl_connection`.
    """

    a = _vector4("potential", potential)
    partial = _tensor4("partial_potential", partial_potential)
    coupling = _finite("kappa", kappa)
    inverse = lindgren_inverse_metric(a, kappa=coupling)

    return tuple(
        tuple(
            tuple(
                0.5
                * coupling
                * math.fsum(
                    inverse[upper][sigma]
                    * (
                        (partial[mu][nu] + partial[nu][mu]) * a[sigma]
                        + (partial[mu][sigma] - partial[sigma][mu]) * a[nu]
                        + (partial[nu][sigma] - partial[sigma][nu]) * a[mu]
                    )
                    for sigma in range(4)
                )
                for nu in range(4)
            )
            for mu in range(4)
        )
        for upper in range(4)
    )  # type: ignore[return-value]


def geodesic_acceleration(
    connection: Sequence[Sequence[Sequence[Real]]],
    velocity: Sequence[Real],
) -> Vector4:
    """L1: evaluate ``-Gamma^lambda_mu_nu u^mu u^nu``.

    This is the acceleration side of the affine geodesic equation.  The caller
    chooses explicitly whether ``connection`` is Levi--Civita or Weyl; the two
    are never silently identified.
    """

    gamma = _rank3_tensor4("connection", connection)
    u = _vector4("velocity", velocity)
    return tuple(
        -math.fsum(
            gamma[upper][mu][nu] * u[mu] * u[nu] for mu in range(4) for nu in range(4)
        )
        for upper in range(4)
    )  # type: ignore[return-value]


def affine_tangent_norm_squared(
    metric: Sequence[Sequence[Real]],
    tangent: Sequence[Real],
) -> float:
    """Return ``g_mu_nu u^mu u^nu`` for an explicitly affine tangent."""

    g_cov = _tensor4("metric", metric)
    u = _vector4("tangent", tangent)
    return math.fsum(
        g_cov[mu][nu] * u[mu] * u[nu] for mu in range(4) for nu in range(4)
    )


def proper_time_normalized_tangent(
    metric: Sequence[Sequence[Real]],
    tangent: Sequence[Real],
) -> Vector4:
    """Normalize a timelike affine tangent to ``g(u,u)=-1``.

    The positive normalization factor preserves the supplied time orientation.
    Null and spacelike tangents have no massive-particle proper-time
    normalization and are rejected explicitly.
    """

    u = _vector4("tangent", tangent)
    norm_squared = affine_tangent_norm_squared(metric, u)
    if norm_squared >= 0.0:
        raise ValueError("proper-time normalization requires a timelike tangent")
    scale = math.sqrt(-norm_squared)
    return tuple(component / scale for component in u)  # type: ignore[return-value]


def proper_time_normalization_residual(
    metric: Sequence[Sequence[Real]],
    velocity: Sequence[Real],
) -> float:
    """Return ``g_mu_nu U^mu U^nu + 1`` for a timelike four-velocity."""

    return affine_tangent_norm_squared(metric, velocity) + 1.0


def jacobi_geodesic_deviation_operator(
    riemann_mixed: Sequence[Sequence[Sequence[Sequence[Real]]]],
    affine_velocity: Sequence[Real],
    separation: Sequence[Real],
) -> Vector4:
    """Return the Jacobi acceleration for one explicit curvature convention.

    The required index order is
    ``riemann_mixed[lambda][mu][nu][rho] = R^lambda{}_{mu nu rho}``,
    where ``mu`` and ``rho`` contract with the affine velocity and ``nu``
    contracts with the separation vector.  With the convention fixed here,

    ``D^2 xi^lambda/ds^2 = -R^lambda{}_{mu nu rho} u^mu xi^nu u^rho``.

    This helper is the Jacobi operator for separation of neighbouring
    geodesics.  It is intentionally distinct from varying the connection of a
    single geodesic under a metric perturbation.
    """

    curvature = _rank4_tensor4("riemann_mixed", riemann_mixed)
    velocity = _vector4("affine_velocity", affine_velocity)
    xi = _vector4("separation", separation)
    return tuple(
        -math.fsum(
            curvature[upper][mu][nu][rho] * velocity[mu] * xi[nu] * velocity[rho]
            for mu in range(4)
            for nu in range(4)
            for rho in range(4)
        )
        for upper in range(4)
    )  # type: ignore[return-value]


def weyl_connection(
    levi_civita: Sequence[Sequence[Sequence[Real]]],
    metric: Sequence[Sequence[Real]],
    inverse_metric: Sequence[Sequence[Real]],
    one_form: Sequence[Real],
) -> Connection4:
    """Add the 2025 paper's Weyl one-form terms to a Levi-Civita connection.

    ``Gamma^l_mn = {l_mn} - delta^l_m phi_n - delta^l_n phi_m
    + g_mn phi^l``.  The physical identification of ``phi`` is an additional
    theory assumption, not inferred by this algebra helper.
    """

    if isinstance(levi_civita, (str, bytes)) or len(levi_civita) != 4:
        raise ValueError("levi_civita must contain exactly four upper-index blocks")
    lc = tuple(
        _tensor4(f"levi_civita[{index}]", block)
        for index, block in enumerate(levi_civita)
    )
    g_cov = _tensor4("metric", metric)
    g_up = _tensor4("inverse_metric", inverse_metric)
    phi_cov = _vector4("one_form", one_form)
    phi_up = tuple(
        math.fsum(g_up[upper][sigma] * phi_cov[sigma] for sigma in range(4))
        for upper in range(4)
    )
    return tuple(
        tuple(
            tuple(
                lc[upper][mu][nu]
                - (1.0 if upper == mu else 0.0) * phi_cov[nu]
                - (1.0 if upper == nu else 0.0) * phi_cov[mu]
                + g_cov[mu][nu] * phi_up[upper]
                for nu in range(4)
            )
            for mu in range(4)
        )
        for upper in range(4)
    )  # type: ignore[return-value]


def partial_lindgren_metric(
    potential: Sequence[Real],
    partial_potential: Sequence[Sequence[Real]],
    *,
    kappa: Real = 1.0,
) -> Rank3Tensor4:
    """L1: return ``partial_sigma g_mu_nu`` for the metric ansatz."""

    a = _vector4("potential", potential)
    partial = _tensor4("partial_potential", partial_potential)
    coupling = _finite("kappa", kappa)
    return tuple(
        tuple(
            tuple(
                coupling * (partial[sigma][mu] * a[nu] + a[mu] * partial[sigma][nu])
                for nu in range(4)
            )
            for mu in range(4)
        )
        for sigma in range(4)
    )  # type: ignore[return-value]


def covariant_metric_derivative(
    partial_metric: Sequence[Sequence[Sequence[Real]]],
    connection: Sequence[Sequence[Sequence[Real]]],
    metric: Sequence[Sequence[Real]],
) -> Rank3Tensor4:
    """Return ``nabla_sigma g_mu_nu`` for an explicit affine connection."""

    partial = _rank3_tensor4("partial_metric", partial_metric)
    gamma = _rank3_tensor4("connection", connection)
    g_cov = _tensor4("metric", metric)
    return tuple(
        tuple(
            tuple(
                partial[sigma][mu][nu]
                - math.fsum(
                    gamma[upper][sigma][mu] * g_cov[upper][nu]
                    + gamma[upper][sigma][nu] * g_cov[mu][upper]
                    for upper in range(4)
                )
                for nu in range(4)
            )
            for mu in range(4)
        )
        for sigma in range(4)
    )  # type: ignore[return-value]


def levi_civita_metric_compatibility_residual(
    partial_metric: Sequence[Sequence[Sequence[Real]]],
    levi_civita: Sequence[Sequence[Sequence[Real]]],
    metric: Sequence[Sequence[Real]],
) -> Rank3Tensor4:
    """Return the separate Levi--Civita residual ``nabla^LC g``.

    This checks metric compatibility of the Levi--Civita connection before the
    Weyl correction is added.  It is deliberately distinct from the paper's
    semimetricity condition ``nabla_hat g = 2 phi tensor g``.
    """

    return covariant_metric_derivative(partial_metric, levi_civita, metric)


def covariant_potential_derivative(
    potential: Sequence[Real],
    partial_potential: Sequence[Sequence[Real]],
    connection: Sequence[Sequence[Sequence[Real]]],
) -> Tensor4:
    """Return ``nabla_sigma A_mu`` using one explicit connection.

    The array order is ``[derivative_index][covector_index]``.  Constructing
    this quantity inside the three-element gate ties the GME gradient to the
    same potential, partial derivative and Weyl connection checked by element 2.
    """

    a_cov = _vector4("potential", potential)
    partial = _tensor4("partial_potential", partial_potential)
    gamma = _rank3_tensor4("connection", connection)
    return tuple(
        tuple(
            partial[sigma][mu]
            - math.fsum(gamma[upper][sigma][mu] * a_cov[upper] for upper in range(4))
            for mu in range(4)
        )
        for sigma in range(4)
    )  # type: ignore[return-value]


def weyl_nonmetricity_residual(
    partial_metric: Sequence[Sequence[Sequence[Real]]],
    connection: Sequence[Sequence[Sequence[Real]]],
    metric: Sequence[Sequence[Real]],
    one_form: Sequence[Real],
) -> Rank3Tensor4:
    """Element 2: residual of ``nabla_sigma g_mu_nu = 2 phi_sigma g_mu_nu``."""

    g_cov = _tensor4("metric", metric)
    phi = _vector4("one_form", one_form)
    derivative = covariant_metric_derivative(partial_metric, connection, g_cov)
    return tuple(
        tuple(
            tuple(
                derivative[sigma][mu][nu] - 2.0 * phi[sigma] * g_cov[mu][nu]
                for nu in range(4)
            )
            for mu in range(4)
        )
        for sigma in range(4)
    )  # type: ignore[return-value]


def torsion_residual(
    connection: Sequence[Sequence[Sequence[Real]]],
) -> Connection4:
    """Return ``Gamma^lambda_mu_nu - Gamma^lambda_nu_mu``.

    Vanishing is required before semimetricity uniquely selects the
    torsion-free Weyl connection used by the 2025 formulation.
    """

    gamma = _rank3_tensor4("connection", connection)
    return tuple(
        tuple(
            tuple(gamma[upper][mu][nu] - gamma[upper][nu][mu] for nu in range(4))
            for mu in range(4)
        )
        for upper in range(4)
    )  # type: ignore[return-value]


def weyl_connection_residual(
    potential: Sequence[Real],
    partial_potential: Sequence[Sequence[Real]],
    connection: Sequence[Sequence[Sequence[Real]]],
    one_form: Sequence[Real],
    *,
    kappa: Real = 1.0,
) -> Connection4:
    """Return supplied connection minus the torsion-free Weyl construction.

    The expected connection uses the fixed ``(-,+,+,+)`` background, the
    Levi--Civita connection of ``eta + kappa A tensor A`` and the sign
    convention ``nabla_hat g = +2 phi tensor g``.
    """

    a_cov = _vector4("potential", potential)
    partial = _tensor4("partial_potential", partial_potential)
    supplied = _rank3_tensor4("connection", connection)
    metric = lindgren_metric(a_cov, kappa=kappa)
    inverse = lindgren_inverse_metric(a_cov, kappa=kappa)
    levi_civita = levi_civita_connection(a_cov, partial, kappa=kappa)
    expected = weyl_connection(levi_civita, metric, inverse, one_form)
    return tuple(
        tuple(
            tuple(supplied[upper][mu][nu] - expected[upper][mu][nu] for nu in range(4))
            for mu in range(4)
        )
        for upper in range(4)
    )  # type: ignore[return-value]


def metric_variation_action_density(
    potential: Sequence[Real],
    covariant_gradient_metric: Sequence[Sequence[Sequence[Real]]],
    *,
    kappa: Real = 1.0,
) -> float:
    """Element 1: local density of the metric-gradient action.

    This evaluates ``(nabla^sigma g^mu nu)(nabla_sigma g_mu nu)
    sqrt(-g)``.  It does not perform a spacetime integration or claim that a
    numerical discretisation is stationary.  The Euler--Lagrange candidate
    used by the 2025 source is represented separately by
    :func:`harmonic_metric_residual`.
    """

    gradient = _rank3_tensor4(
        "covariant_gradient_metric",
        covariant_gradient_metric,
    )
    inverse = lindgren_inverse_metric(potential, kappa=kappa)
    volume = lindgren_volume_element(potential, kappa=kappa)
    contraction_terms: list[float] = []
    for sigma in range(4):
        for mu in range(4):
            for nu in range(4):
                raised_inverse_gradient = -math.fsum(
                    inverse[sigma][tau]
                    * inverse[mu][alpha]
                    * inverse[nu][beta]
                    * gradient[tau][alpha][beta]
                    for tau in range(4)
                    for alpha in range(4)
                    for beta in range(4)
                )
                contraction_terms.append(
                    raised_inverse_gradient * gradient[sigma][mu][nu]
                )
    return volume * math.fsum(contraction_terms)


def variational_field_equation_residual(
    action_derivative: Sequence[Real],
) -> Vector4:
    """Element 1 / L1 contract for ``delta S / delta A_mu = 0``.

    A caller supplies the four Euler--Lagrange components obtained from the
    declared action, boundary conditions and connection.  Keeping this
    residual explicit prevents a harmonic-metric or product-rule check from
    being relabelled as the complete variation by itself.
    """

    return _vector4("action_derivative", action_derivative)


def full_action_euler_lagrange_residual(
    full_action_derivative: Sequence[Real],
) -> Vector4:
    """Return a caller-computed full-action ``delta S/delta A_mu`` residual.

    Unlike a boolean attestation, this numerical residual must independently
    satisfy its unit-bearing tolerance in the selected variational branch.
    Supplying zero components does not by itself prove the symbolic variation:
    the declared action, boundary treatment and differentiation provenance
    remain part of :class:`FullEulerLagrangeAttestation`.
    """

    return _vector4("full_action_derivative", full_action_derivative)


def harmonic_metric_residual(
    covariant_laplacian_metric: Sequence[Sequence[Real]],
) -> Tensor4:
    """Element 1: Euler--Lagrange candidate residual ``Delta g_mu_nu``."""

    return _tensor4("covariant_laplacian_metric", covariant_laplacian_metric)


def potential_gme_product_rule(
    potential: Sequence[Real],
    covariant_gradient_potential: Sequence[Sequence[Real]],
    covariant_laplacian_potential: Sequence[Real],
    inverse_metric: Sequence[Sequence[Real]],
) -> Tensor4:
    """Return the unscaled GME product-rule tensor for ``A_mu A_nu``.

    The returned tensor is

    ``(nabla A_nu)·(nabla A_mu) + A_nu Delta A_mu
      + (nabla A_mu)·(nabla A_nu) + A_mu Delta A_nu``.

    This is ``R_GME`` rather than ``R_outer=kappa R_GME``.  It is not required
    to vanish merely because the product-rule and harmonic decompositions are
    being audited.
    """

    a = _vector4("potential", potential)
    gradient = _tensor4(
        "covariant_gradient_potential",
        covariant_gradient_potential,
    )
    laplacian = _vector4(
        "covariant_laplacian_potential",
        covariant_laplacian_potential,
    )
    inverse = _tensor4("inverse_metric", inverse_metric)

    def gradient_inner(left_component: int, right_component: int) -> float:
        return math.fsum(
            inverse[sigma][tau]
            * gradient[sigma][left_component]
            * gradient[tau][right_component]
            for sigma in range(4)
            for tau in range(4)
        )

    return tuple(
        tuple(
            (
                gradient_inner(nu, mu)
                + a[nu] * laplacian[mu]
                + gradient_inner(mu, nu)
                + a[mu] * laplacian[nu]
            )
            for nu in range(4)
        )
        for mu in range(4)
    )  # type: ignore[return-value]


def potential_outer_gme_residual(
    potential: Sequence[Real],
    covariant_gradient_potential: Sequence[Sequence[Real]],
    covariant_laplacian_potential: Sequence[Real],
    inverse_metric: Sequence[Sequence[Real]],
    *,
    kappa: Real = 1.0,
) -> Tensor4:
    """Return the calculated outer term ``kappa R_GME``.

    The historical function name is retained for compatibility.  The returned
    tensor is not a zero-condition on its own.  Use
    :func:`gme_outer_scaling_residual` to compare it with an independently
    supplied ``Box(kappa A tensor A)`` term.
    """

    coupling = _finite("kappa", kappa)
    gme = potential_gme_product_rule(
        potential,
        covariant_gradient_potential,
        covariant_laplacian_potential,
        inverse_metric,
    )
    return tuple(tuple(coupling * gme[mu][nu] for nu in range(4)) for mu in range(4))  # type: ignore[return-value]


def gme_outer_scaling_residual(
    potential_outer: Sequence[Sequence[Real]],
    gme_product_rule: Sequence[Sequence[Real]],
    *,
    kappa: Real = 1.0,
) -> Tensor4:
    """Return ``R_outer - kappa R_GME`` as a separate residual."""

    outer = _tensor4("potential_outer", potential_outer)
    gme = _tensor4("gme_product_rule", gme_product_rule)
    coupling = _finite("kappa", kappa)
    return tuple(
        tuple(outer[mu][nu] - coupling * gme[mu][nu] for nu in range(4))
        for mu in range(4)
    )  # type: ignore[return-value]


def harmonic_metric_decomposition_residual(
    harmonic_metric: Sequence[Sequence[Real]],
    background_harmonic: Sequence[Sequence[Real]],
    potential_outer: Sequence[Sequence[Real]],
) -> Tensor4:
    """Return ``R_harmonic - R_background - R_outer``."""

    harmonic = _tensor4("harmonic_metric", harmonic_metric)
    background = _tensor4("background_harmonic", background_harmonic)
    outer = _tensor4("potential_outer", potential_outer)
    return tuple(
        tuple(harmonic[mu][nu] - background[mu][nu] - outer[mu][nu] for nu in range(4))
        for mu in range(4)
    )  # type: ignore[return-value]


def electromagnetic_field_tensor(
    partial_potential: Sequence[Sequence[Real]],
) -> Tensor4:
    """Return ``F_mu_nu = partial_mu A_nu - partial_nu A_mu``."""

    partial = _tensor4("partial_potential", partial_potential)
    return tuple(
        tuple(partial[mu][nu] - partial[nu][mu] for nu in range(4)) for mu in range(4)
    )  # type: ignore[return-value]


def electromagnetic_field_definition_residual(
    field_tensor: Sequence[Sequence[Real]],
    partial_potential: Sequence[Sequence[Real]],
) -> Tensor4:
    """Return ``F_mu_nu - (partial_mu A_nu - partial_nu A_mu)``.

    This keeps the definition ``F=dA`` separate from the subsequent ``dF=0``
    cyclic-derivative check.  Both must refer to the same provenance record in
    the three-element gate.
    """

    supplied = _tensor4("field_tensor", field_tensor)
    expected = electromagnetic_field_tensor(partial_potential)
    return tuple(
        tuple(supplied[mu][nu] - expected[mu][nu] for nu in range(4)) for mu in range(4)
    )  # type: ignore[return-value]


def bianchi_cyclic_residual(
    partial_field_tensor: Sequence[Sequence[Sequence[Real]]],
) -> Rank3Tensor4:
    """Element 3: exterior/Bianchi residual ``partial_[l F_mn]``.

    ``partial_field_tensor[lam][mu][nu]`` means ``partial_lam F_mu_nu``.
    Vanishing of the cyclic sum is the homogeneous Maxwell identity for
    ``F=dA``.  It is not the sourced equation ``nabla_mu F^mu nu = J^nu``.
    """

    derivative = _rank3_tensor4("partial_field_tensor", partial_field_tensor)
    for lam in range(4):
        for mu in range(4):
            for nu in range(4):
                if not math.isclose(
                    derivative[lam][mu][nu],
                    -derivative[lam][nu][mu],
                    rel_tol=1e-12,
                    abs_tol=1e-12,
                ):
                    raise ValueError(
                        "partial_field_tensor must be antisymmetric in its last two indices"
                    )
    return tuple(
        tuple(
            tuple(
                derivative[lam][mu][nu]
                + derivative[mu][nu][lam]
                + derivative[nu][lam][mu]
                for nu in range(4)
            )
            for mu in range(4)
        )
        for lam in range(4)
    )  # type: ignore[return-value]


def levi_civita_contracted_bianchi_residual(
    covariant_divergence_einstein: Sequence[Real],
) -> Vector4:
    """Element 3 / L1 residual for ``nabla^LC_mu G^mu nu = 0``.

    The connection provenance is explicitly Levi--Civita.  This contracted
    geometric identity is kept distinct from
    :func:`bianchi_cyclic_residual`, which checks ``dF=0``.  Neither one alone
    is accepted as the sourced Maxwell derivation.
    """

    return _vector4(
        "levi_civita_covariant_divergence_einstein",
        covariant_divergence_einstein,
    )


def contracted_bianchi_residual(
    covariant_divergence_einstein: Sequence[Real],
) -> Vector4:
    """Compatibility alias for the explicitly LC-contracted Bianchi residual."""

    return levi_civita_contracted_bianchi_residual(
        covariant_divergence_einstein,
    )


def maxwell_derivation_check(
    variational_check: bool,
    weyl_check: bool,
    bianchi_check: bool,
) -> bool:
    """L1: kaikki kolme elementtiä vaaditaan. Ei oikotietä."""

    values = (variational_check, weyl_check, bianchi_check)
    if any(not isinstance(value, bool) for value in values):
        raise ValueError("derivation checks must be booleans")
    return variational_check and weyl_check and bianchi_check


def _max_abs_tensor2(tensor: Tensor4) -> float:
    return max(abs(value) for row in tensor for value in row)


def _max_abs_tensor3(tensor: Rank3Tensor4) -> float:
    return max(abs(value) for block in tensor for row in block for value in row)


@dataclass(frozen=True)
class ResidualTolerance:
    """Unit-bearing residual acceptance contract.

    ``reference_scale`` must have the same units as its residual.  A value is
    accepted only when ``max_abs <= absolute + relative * reference_scale``.
    Separate instances prevent unlike EL, connection and Bianchi tensors from
    being compared to one dimensionless global tolerance.
    """

    absolute: float
    relative: float
    reference_scale: float
    unit: str
    reference_scale_provenance: str

    def __post_init__(self) -> None:
        absolute = _nonnegative("absolute", self.absolute)
        relative = _nonnegative("relative", self.relative)
        reference_scale = _positive("reference_scale", self.reference_scale)
        if absolute == 0.0 and relative == 0.0:
            raise ValueError("absolute and relative tolerances cannot both be zero")
        object.__setattr__(self, "absolute", absolute)
        object.__setattr__(self, "relative", relative)
        object.__setattr__(self, "reference_scale", reference_scale)
        object.__setattr__(self, "unit", _nonempty("unit", self.unit))
        object.__setattr__(
            self,
            "reference_scale_provenance",
            _nonempty(
                "reference_scale_provenance",
                self.reference_scale_provenance,
            ),
        )

    @property
    def threshold(self) -> float:
        return self.absolute + self.relative * self.reference_scale

    def accepts(self, max_abs: Real) -> bool:
        return _nonnegative("max_abs", max_abs) <= self.threshold


@dataclass(frozen=True)
class ThreeElementResidualTolerances:
    """Residual-specific numerical contracts for the three-element gate."""

    eh_variation: ResidualTolerance
    full_action_derivative: ResidualTolerance
    harmonic_metric: ResidualTolerance
    background_harmonic: ResidualTolerance
    harmonic_decomposition: ResidualTolerance
    gme_outer_scaling: ResidualTolerance
    levi_civita_metric_compatibility: ResidualTolerance
    weyl_nonmetricity: ResidualTolerance
    weyl_connection: ResidualTolerance
    torsion: ResidualTolerance
    field_definition: ResidualTolerance
    levi_civita_contracted_bianchi: ResidualTolerance
    homogeneous_bianchi: ResidualTolerance

    def __post_init__(self) -> None:
        for name, contract in self.__dict__.items():
            if not isinstance(contract, ResidualTolerance):
                raise ValueError(f"{name} must be a ResidualTolerance")


@dataclass(frozen=True)
class FullEulerLagrangeAttestation:
    """Provenance for a full, rather than frozen-principal, EL derivation.

    ``input_bundle_digest`` binds this caller attestation to the exact numerical
    gate inputs.  The digest prevents silent reuse after an input change; it is
    not itself evidence that the asserted derivation is mathematically correct.
    """

    verified: bool
    input_bundle_digest: str
    variation_branch: VariationBranch
    action_id: str
    derivation_id: str
    boundary_condition_id: str
    connection_treatment: str
    wave_operator_id: str
    provenance: str

    def __post_init__(self) -> None:
        if not isinstance(self.verified, bool):
            raise ValueError("verified must be a boolean")
        object.__setattr__(
            self,
            "input_bundle_digest",
            _sha256_hex("input_bundle_digest", self.input_bundle_digest),
        )
        object.__setattr__(
            self,
            "variation_branch",
            _variation_branch("variation_branch", self.variation_branch),
        )
        for name in (
            "action_id",
            "derivation_id",
            "boundary_condition_id",
            "connection_treatment",
            "wave_operator_id",
            "provenance",
        ):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))


@dataclass(frozen=True)
class FieldTensorDerivativeAttestation:
    """Provenance tying supplied ``partial F`` to the checked field tensor.

    The digest is a content-integrity binding, not proof that the derivative
    scheme or the supplied derivative is mathematically valid.
    """

    verified_from_same_field_tensor: bool
    input_bundle_digest: str
    field_tensor_id: str
    derivative_scheme: str
    provenance: str

    def __post_init__(self) -> None:
        if not isinstance(self.verified_from_same_field_tensor, bool):
            raise ValueError("verified_from_same_field_tensor must be a boolean")
        object.__setattr__(
            self,
            "input_bundle_digest",
            _sha256_hex("input_bundle_digest", self.input_bundle_digest),
        )
        for name in ("field_tensor_id", "derivative_scheme", "provenance"):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))


@dataclass(frozen=True)
class LeviCivitaBianchiAttestation:
    """Provenance tying ``nabla G`` to the LC connection of the same metric.

    The digest prevents carrying that assertion to a different numerical input
    bundle.  It does not turn the caller attestation into an independent proof.
    """

    verified_with_levi_civita_connection: bool
    input_bundle_digest: str
    metric_id: str
    derivative_scheme: str
    provenance: str

    def __post_init__(self) -> None:
        if not isinstance(self.verified_with_levi_civita_connection, bool):
            raise ValueError("verified_with_levi_civita_connection must be a boolean")
        object.__setattr__(
            self,
            "input_bundle_digest",
            _sha256_hex("input_bundle_digest", self.input_bundle_digest),
        )
        for name in ("metric_id", "derivative_scheme", "provenance"):
            object.__setattr__(self, name, _nonempty(name, getattr(self, name)))


@dataclass(frozen=True)
class ThreeElementDerivationResult:
    """Audit result requiring one selected L0 action, Weyl and Bianchi.

    Einstein--Hilbert and metric-gradient/GME remain parallel L0 branches.
    Their numerical formula checks and required/not-required statuses are
    reported separately; neither is inferred from the other's action ID.
    """

    tolerances: ThreeElementResidualTolerances
    required_variation_branch: VariationBranch
    full_euler_lagrange_attestation: FullEulerLagrangeAttestation
    field_tensor_derivative_attestation: FieldTensorDerivativeAttestation
    levi_civita_bianchi_attestation: LeviCivitaBianchiAttestation
    input_bundle_digest: str
    full_euler_lagrange_input_bundle_matched: bool
    full_euler_lagrange_variation_branch_matched: bool
    field_tensor_derivative_input_bundle_matched: bool
    levi_civita_bianchi_input_bundle_matched: bool
    eh_variation_max_abs: float
    full_action_derivative_max_abs: float
    harmonic_metric_max_abs: float
    background_harmonic_max_abs: float
    harmonic_decomposition_max_abs: float
    potential_gme_product_rule_max_abs: float
    potential_outer_max_abs: float
    gme_outer_scaling_max_abs: float
    levi_civita_metric_compatibility_max_abs: float
    weyl_nonmetricity_max_abs: float
    weyl_connection_max_abs: float
    torsion_max_abs: float
    field_definition_max_abs: float
    levi_civita_contracted_bianchi_max_abs: float
    homogeneous_bianchi_max_abs: float
    eh_variation_satisfied: bool
    full_action_derivative_satisfied: bool
    harmonic_metric_satisfied: bool
    background_harmonic_satisfied: bool
    harmonic_decomposition_satisfied: bool
    gme_outer_scaling_satisfied: bool
    einstein_hilbert_formula_satisfied: bool
    metric_gradient_gme_formula_satisfied: bool
    einstein_hilbert_branch_satisfied: bool
    metric_gradient_gme_branch_satisfied: bool
    einstein_hilbert_branch_status: str
    metric_gradient_gme_branch_status: str
    variational_principle_satisfied: bool
    levi_civita_metric_compatibility_satisfied: bool
    weyl_nonmetricity_satisfied: bool
    weyl_connection_satisfied: bool
    torsion_free_satisfied: bool
    weyl_condition_satisfied: bool
    field_definition_satisfied: bool
    field_derivative_provenance_satisfied: bool
    levi_civita_contracted_bianchi_identity_satisfied: bool
    homogeneous_bianchi_identity_satisfied: bool
    bianchi_identity_satisfied: bool
    all_three_satisfied: bool
    status: str
    epistemic_status: str
    formula_epistemic_status: str = "L1_CONDITIONAL_FORMULAS"
    chi_formula_epistemic_status: str = "L1_DERIVED_FORMULA"
    spatial_lorentz_to_euclidean_reduction_status: str = "L2_BRIDGE"
    contracted_bianchi_connection_kind: str = "LEVI_CIVITA"
    l2_bridge_status: str = "OPEN"
    physical_validation_claimed: bool = False

    @property
    def full_euler_lagrange_verified(self) -> bool:
        return (
            self.full_euler_lagrange_attestation.verified
            and self.full_euler_lagrange_input_bundle_matched
            and self.full_euler_lagrange_variation_branch_matched
            and self.full_action_derivative_satisfied
        )


def evaluate_three_element_derivation(
    *,
    potential: Sequence[Real],
    einstein_tensor_contravariant: Sequence[Sequence[Real]],
    full_action_derivative: Sequence[Real],
    required_variation_branch: str,
    full_euler_lagrange_attestation: FullEulerLagrangeAttestation,
    partial_potential: Sequence[Sequence[Real]],
    covariant_laplacian_potential: Sequence[Real],
    covariant_laplacian_metric: Sequence[Sequence[Real]],
    covariant_laplacian_background_metric: Sequence[Sequence[Real]],
    covariant_laplacian_potential_outer: Sequence[Sequence[Real]],
    connection: Sequence[Sequence[Sequence[Real]]],
    one_form: Sequence[Real],
    field_tensor: Sequence[Sequence[Real]],
    partial_field_tensor: Sequence[Sequence[Sequence[Real]]],
    field_tensor_derivative_attestation: FieldTensorDerivativeAttestation,
    levi_civita_covariant_divergence_einstein: Sequence[Real],
    levi_civita_bianchi_attestation: LeviCivitaBianchiAttestation,
    tolerances: ThreeElementResidualTolerances,
    kappa: Real = 1.0,
) -> ThreeElementDerivationResult:
    """Evaluate the three mandatory formal input contracts together.

    Element 1 keeps Einstein--Hilbert and metric-gradient/GME as parallel L0
    branches and requires the caller to select exactly one.  The selected
    branch must have a structured, content-bound attestation *and* a numerical
    full-action derivative within its own tolerance.  EH checks its explicit
    chain-rule residual.  GME checks the harmonic equation, the background plus
    outer decomposition, and ``R_outer=kappa R_GME`` without requiring the
    outer term itself to vanish.
    Element 2 checks ``nabla^LC g=0`` before separately checking Weyl
    semimetricity, the explicit torsion-free Weyl connection and torsion.
    Element 3 checks ``F=dA``, provenance of ``partial F``, the LC-contracted
    gravitational Bianchi identity and the independent homogeneous ``dF=0``
    identity. Passing remains a conditional input-contract result, not
    empirical validation or closure of the L2 biological operator.
    Each attestation must carry the digest of this exact numerical input bundle;
    that binding detects stale provenance but is not a symbolic proof.  A zero
    numerical full-action derivative likewise checks only the supplied
    discretisation and declared conventions.
    """

    if not isinstance(full_euler_lagrange_attestation, FullEulerLagrangeAttestation):
        raise ValueError(
            "full_euler_lagrange_attestation must be a FullEulerLagrangeAttestation"
        )
    if not isinstance(
        field_tensor_derivative_attestation,
        FieldTensorDerivativeAttestation,
    ):
        raise ValueError(
            "field_tensor_derivative_attestation must be a "
            "FieldTensorDerivativeAttestation"
        )
    if not isinstance(levi_civita_bianchi_attestation, LeviCivitaBianchiAttestation):
        raise ValueError(
            "levi_civita_bianchi_attestation must be a LeviCivitaBianchiAttestation"
        )
    if not isinstance(tolerances, ThreeElementResidualTolerances):
        raise ValueError("tolerances must be a ThreeElementResidualTolerances")
    selected_branch = _variation_branch(
        "required_variation_branch",
        required_variation_branch,
    )

    input_bundle_digest = three_element_input_bundle_digest(
        potential=potential,
        einstein_tensor_contravariant=einstein_tensor_contravariant,
        full_action_derivative=full_action_derivative,
        required_variation_branch=selected_branch,
        partial_potential=partial_potential,
        covariant_laplacian_potential=covariant_laplacian_potential,
        covariant_laplacian_metric=covariant_laplacian_metric,
        covariant_laplacian_background_metric=covariant_laplacian_background_metric,
        covariant_laplacian_potential_outer=covariant_laplacian_potential_outer,
        connection=connection,
        one_form=one_form,
        field_tensor=field_tensor,
        partial_field_tensor=partial_field_tensor,
        levi_civita_covariant_divergence_einstein=(
            levi_civita_covariant_divergence_einstein
        ),
        kappa=kappa,
    )
    full_el_digest_matches = (
        full_euler_lagrange_attestation.input_bundle_digest == input_bundle_digest
    )
    full_el_branch_matches = (
        full_euler_lagrange_attestation.variation_branch == selected_branch
    )
    field_derivative_digest_matches = (
        field_tensor_derivative_attestation.input_bundle_digest == input_bundle_digest
    )
    lc_bianchi_digest_matches = (
        levi_civita_bianchi_attestation.input_bundle_digest == input_bundle_digest
    )

    a_cov = _vector4("potential", potential)
    partial_a = _tensor4("partial_potential", partial_potential)
    gamma = _rank3_tensor4("connection", connection)
    coupling = _finite("kappa", kappa)
    metric = lindgren_metric(a_cov, kappa=coupling)
    inverse = lindgren_inverse_metric(a_cov, kappa=coupling)
    full_action_residual = full_action_euler_lagrange_residual(full_action_derivative)
    eh_variation = einstein_hilbert_potential_variation_residual(
        a_cov,
        einstein_tensor_contravariant,
        kappa=coupling,
    )
    harmonic = harmonic_metric_residual(covariant_laplacian_metric)
    background_harmonic = harmonic_metric_residual(
        covariant_laplacian_background_metric
    )
    potential_outer = _tensor4(
        "covariant_laplacian_potential_outer",
        covariant_laplacian_potential_outer,
    )
    covariant_gradient = covariant_potential_derivative(
        a_cov,
        partial_a,
        gamma,
    )
    potential_gme = potential_gme_product_rule(
        a_cov,
        covariant_gradient,
        covariant_laplacian_potential,
        inverse,
    )
    outer_scaling = gme_outer_scaling_residual(
        potential_outer,
        potential_gme,
        kappa=coupling,
    )
    harmonic_decomposition = harmonic_metric_decomposition_residual(
        harmonic,
        background_harmonic,
        potential_outer,
    )
    partial_metric = partial_lindgren_metric(a_cov, partial_a, kappa=coupling)
    levi_civita = levi_civita_connection(a_cov, partial_a, kappa=coupling)
    lc_metric_compatibility = levi_civita_metric_compatibility_residual(
        partial_metric,
        levi_civita,
        metric,
    )
    weyl_nonmetricity = weyl_nonmetricity_residual(
        partial_metric,
        gamma,
        metric,
        one_form,
    )
    connection_difference = weyl_connection_residual(
        a_cov,
        partial_a,
        gamma,
        one_form,
        kappa=coupling,
    )
    torsion = torsion_residual(gamma)
    field_definition = electromagnetic_field_definition_residual(
        field_tensor,
        partial_a,
    )
    homogeneous_bianchi = bianchi_cyclic_residual(partial_field_tensor)
    lc_contracted_bianchi = levi_civita_contracted_bianchi_residual(
        levi_civita_covariant_divergence_einstein,
    )

    eh_variation_max = max(abs(value) for value in eh_variation)
    full_action_derivative_max = max(abs(value) for value in full_action_residual)
    harmonic_max = _max_abs_tensor2(harmonic)
    background_harmonic_max = _max_abs_tensor2(background_harmonic)
    harmonic_decomposition_max = _max_abs_tensor2(harmonic_decomposition)
    potential_gme_max = _max_abs_tensor2(potential_gme)
    potential_outer_max = _max_abs_tensor2(potential_outer)
    outer_scaling_max = _max_abs_tensor2(outer_scaling)
    lc_metric_compatibility_max = _max_abs_tensor3(lc_metric_compatibility)
    weyl_nonmetricity_max = _max_abs_tensor3(weyl_nonmetricity)
    weyl_connection_max = _max_abs_tensor3(connection_difference)
    torsion_max = _max_abs_tensor3(torsion)
    field_definition_max = _max_abs_tensor2(field_definition)
    homogeneous_bianchi_max = _max_abs_tensor3(homogeneous_bianchi)
    lc_contracted_bianchi_max = max(abs(value) for value in lc_contracted_bianchi)

    eh_variation_ok = tolerances.eh_variation.accepts(eh_variation_max)
    full_action_derivative_ok = tolerances.full_action_derivative.accepts(
        full_action_derivative_max
    )
    harmonic_ok = tolerances.harmonic_metric.accepts(harmonic_max)
    background_harmonic_ok = tolerances.background_harmonic.accepts(
        background_harmonic_max
    )
    harmonic_decomposition_ok = tolerances.harmonic_decomposition.accepts(
        harmonic_decomposition_max
    )
    outer_scaling_ok = tolerances.gme_outer_scaling.accepts(outer_scaling_max)
    eh_formula_ok = eh_variation_ok
    gme_formula_ok = harmonic_ok and harmonic_decomposition_ok and outer_scaling_ok
    selected_formula_ok = (
        eh_formula_ok if selected_branch == EINSTEIN_HILBERT_BRANCH else gme_formula_ok
    )
    selected_variation_ok = (
        full_euler_lagrange_attestation.verified
        and full_el_digest_matches
        and full_el_branch_matches
        and full_action_derivative_ok
        and selected_formula_ok
    )
    eh_branch_ok = (
        selected_variation_ok if selected_branch == EINSTEIN_HILBERT_BRANCH else False
    )
    gme_branch_ok = (
        selected_variation_ok
        if selected_branch == METRIC_GRADIENT_GME_BRANCH
        else False
    )
    eh_branch_status = (
        "REQUIRED_BRANCH_SATISFIED"
        if eh_branch_ok
        else (
            "REQUIRED_BRANCH_FAILED"
            if selected_branch == EINSTEIN_HILBERT_BRANCH
            else "PARALLEL_L0_BRANCH_NOT_REQUIRED"
        )
    )
    gme_branch_status = (
        "REQUIRED_BRANCH_SATISFIED"
        if gme_branch_ok
        else (
            "REQUIRED_BRANCH_FAILED"
            if selected_branch == METRIC_GRADIENT_GME_BRANCH
            else "PARALLEL_L0_BRANCH_NOT_REQUIRED"
        )
    )
    lc_metric_compatibility_ok = tolerances.levi_civita_metric_compatibility.accepts(
        lc_metric_compatibility_max
    )
    weyl_nonmetricity_ok = tolerances.weyl_nonmetricity.accepts(weyl_nonmetricity_max)
    weyl_connection_ok = tolerances.weyl_connection.accepts(weyl_connection_max)
    torsion_ok = tolerances.torsion.accepts(torsion_max)
    weyl_ok = (
        lc_metric_compatibility_ok
        and weyl_nonmetricity_ok
        and weyl_connection_ok
        and torsion_ok
    )
    field_definition_ok = tolerances.field_definition.accepts(field_definition_max)
    lc_contracted_bianchi_ok = tolerances.levi_civita_contracted_bianchi.accepts(
        lc_contracted_bianchi_max
    )
    homogeneous_bianchi_ok = tolerances.homogeneous_bianchi.accepts(
        homogeneous_bianchi_max
    )
    bianchi_ok = (
        field_definition_ok
        and field_tensor_derivative_attestation.verified_from_same_field_tensor
        and field_derivative_digest_matches
        and levi_civita_bianchi_attestation.verified_with_levi_civita_connection
        and lc_bianchi_digest_matches
        and lc_contracted_bianchi_ok
        and homogeneous_bianchi_ok
    )
    all_ok = maxwell_derivation_check(selected_variation_ok, weyl_ok, bianchi_ok)
    return ThreeElementDerivationResult(
        tolerances=tolerances,
        required_variation_branch=selected_branch,
        full_euler_lagrange_attestation=full_euler_lagrange_attestation,
        field_tensor_derivative_attestation=field_tensor_derivative_attestation,
        levi_civita_bianchi_attestation=levi_civita_bianchi_attestation,
        input_bundle_digest=input_bundle_digest,
        full_euler_lagrange_input_bundle_matched=full_el_digest_matches,
        full_euler_lagrange_variation_branch_matched=full_el_branch_matches,
        field_tensor_derivative_input_bundle_matched=field_derivative_digest_matches,
        levi_civita_bianchi_input_bundle_matched=lc_bianchi_digest_matches,
        eh_variation_max_abs=eh_variation_max,
        full_action_derivative_max_abs=full_action_derivative_max,
        harmonic_metric_max_abs=harmonic_max,
        background_harmonic_max_abs=background_harmonic_max,
        harmonic_decomposition_max_abs=harmonic_decomposition_max,
        potential_gme_product_rule_max_abs=potential_gme_max,
        potential_outer_max_abs=potential_outer_max,
        gme_outer_scaling_max_abs=outer_scaling_max,
        levi_civita_metric_compatibility_max_abs=lc_metric_compatibility_max,
        weyl_nonmetricity_max_abs=weyl_nonmetricity_max,
        weyl_connection_max_abs=weyl_connection_max,
        torsion_max_abs=torsion_max,
        field_definition_max_abs=field_definition_max,
        levi_civita_contracted_bianchi_max_abs=lc_contracted_bianchi_max,
        homogeneous_bianchi_max_abs=homogeneous_bianchi_max,
        eh_variation_satisfied=eh_variation_ok,
        full_action_derivative_satisfied=full_action_derivative_ok,
        harmonic_metric_satisfied=harmonic_ok,
        background_harmonic_satisfied=background_harmonic_ok,
        harmonic_decomposition_satisfied=harmonic_decomposition_ok,
        gme_outer_scaling_satisfied=outer_scaling_ok,
        einstein_hilbert_formula_satisfied=eh_formula_ok,
        metric_gradient_gme_formula_satisfied=gme_formula_ok,
        einstein_hilbert_branch_satisfied=eh_branch_ok,
        metric_gradient_gme_branch_satisfied=gme_branch_ok,
        einstein_hilbert_branch_status=eh_branch_status,
        metric_gradient_gme_branch_status=gme_branch_status,
        variational_principle_satisfied=selected_variation_ok,
        levi_civita_metric_compatibility_satisfied=(lc_metric_compatibility_ok),
        weyl_nonmetricity_satisfied=weyl_nonmetricity_ok,
        weyl_connection_satisfied=weyl_connection_ok,
        torsion_free_satisfied=torsion_ok,
        weyl_condition_satisfied=weyl_ok,
        field_definition_satisfied=field_definition_ok,
        field_derivative_provenance_satisfied=(
            field_tensor_derivative_attestation.verified_from_same_field_tensor
            and field_derivative_digest_matches
        ),
        levi_civita_contracted_bianchi_identity_satisfied=(
            lc_contracted_bianchi_ok
            and levi_civita_bianchi_attestation.verified_with_levi_civita_connection
            and lc_bianchi_digest_matches
        ),
        homogeneous_bianchi_identity_satisfied=homogeneous_bianchi_ok,
        bianchi_identity_satisfied=bianchi_ok,
        all_three_satisfied=all_ok,
        status=(
            "FORMAL_THREE_ELEMENT_INPUT_CONTRACT_SATISFIED"
            if all_ok
            else "FORMAL_THREE_ELEMENT_INPUT_CONTRACT_FAILED"
        ),
        epistemic_status=(
            "L1_CONDITIONAL_INPUT_CONTRACT_SATISFIED"
            if all_ok
            else "L1_FORMULAS_INPUT_CONTRACT_NOT_SATISFIED"
        ),
    )


__all__ = [
    "Connection4",
    "EINSTEIN_HILBERT_BRANCH",
    "FieldTensorDerivativeAttestation",
    "FullEulerLagrangeAttestation",
    "LeviCivitaBianchiAttestation",
    "METRIC_GRADIENT_GME_BRANCH",
    "MINKOWSKI_METRIC",
    "Rank3Tensor4",
    "Rank4Tensor4",
    "ResidualTolerance",
    "Tensor4",
    "ThreeElementDerivationResult",
    "ThreeElementResidualTolerances",
    "Vector4",
    "VariationBranch",
    "affine_tangent_norm_squared",
    "bianchi_cyclic_residual",
    "contracted_bianchi_residual",
    "contract_metric_perturbation",
    "contract_tensor",
    "covariant_metric_derivative",
    "covariant_potential_derivative",
    "dimensionless_spacelike_coordinate",
    "electromagnetic_field_tensor",
    "electromagnetic_field_definition_residual",
    "einstein_hilbert_action_density",
    "einstein_hilbert_potential_variation_residual",
    "evaluate_three_element_derivation",
    "first_order_metric_perturbation",
    "full_action_euler_lagrange_residual",
    "geodesic_acceleration",
    "geodesic_deviation_selection_rule",
    "gme_outer_scaling_residual",
    "harmonic_metric_decomposition_residual",
    "harmonic_metric_residual",
    "jacobi_geodesic_deviation_operator",
    "levi_civita_connection",
    "levi_civita_contracted_bianchi_residual",
    "levi_civita_metric_compatibility_residual",
    "lindgren_connection_field_decomposition",
    "lindgren_inverse_metric",
    "lindgren_metric",
    "lindgren_metric_determinant",
    "lindgren_volume_element",
    "maxwell_derivation_check",
    "metric_denominator",
    "metric_perturbation",
    "metric_tensor_norm_squared",
    "metric_variation_action_density",
    "minkowski_dot",
    "partial_lindgren_metric",
    "potential_gme_product_rule",
    "potential_outer_gme_residual",
    "proper_time_normalization_residual",
    "proper_time_normalized_tangent",
    "raise_minkowski",
    "scalar_spacelike_volume_sensitivity",
    "spacelike_first_order_h_norm",
    "spacelike_h_norm_reduction_residual",
    "three_element_input_bundle_digest",
    "torsion_residual",
    "variational_field_equation_residual",
    "volume_directional_derivative",
    "volume_element_from_norm_squared",
    "weyl_connection",
    "weyl_connection_residual",
    "weyl_nonmetricity_residual",
]
