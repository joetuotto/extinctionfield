"""Canonical registry for the Lindgren-DKC candidate route.

The registry describes calculations and tests; it does not turn a national
technology-timing proxy into a measured FieldState.  The F1--F9 statements are
content-addressed and locked for falsification.  The 2025 Lindgren ansatz is
the L0 premise.  Concrete observable identification, frequency weights and
biological mechanisms retain their separate L2/L3 provenance.
"""

from __future__ import annotations

from copy import deepcopy
from dataclasses import dataclass
from hashlib import sha256
import json
from typing import Mapping

from berm.architecture import DKC_CANDIDATE_ROUTE_ID


REFINEMENTS = (
    {
        "id": "T1",
        "name": "country-specific continuous duty cycle",
        "stage": 2,
        "formula": "d(t,c)=0.33+0.67/(1+exp(-k_s(t-t_mid(c))))",
        "freeParameters": 0,
        "epistemicStatus": "L3_IMPORTED",
    },
    {
        "id": "T2",
        "name": "Hill response exponent",
        "stage": 3,
        "formula": "sigma(x)=x^n/(x_half^n+x^n)",
        "freeParameters": 1,
        "parameterBounds": {"n": [1.0, 5.0]},
        "epistemicStatus": "L3_PHENOMENOLOGICAL",
    },
    {
        "id": "T3",
        "name": "birth-cohort vulnerability",
        "stage": 2,
        "formula": "v(a)={5:a<0,4:0<=a<1,3:1<=a<6,2:6<=a<18,1:a>=18}",
        "freeParameters": 0,
        "epistemicStatus": "L3_IMPORTED",
    },
    {
        "id": "T4",
        "name": "Erlang behavioural kernel",
        "stage": 3,
        "formula": "k_B(s)=s^(n_B-1) exp(-s/tau_B)/(tau_B^n_B Gamma(n_B))",
        "freeParameters": 1,
        "parameterBounds": {"n_B": [2, 6]},
        "epistemicStatus": "L3_PHENOMENOLOGICAL",
    },
    {
        "id": "T5",
        "name": "endpoint-specific testicular SAR multiplier",
        "stage": 2,
        "formula": "w_fertility(f)=SAR_testicular(f) coupling(f) modulation(f)",
        "freeParameters": 0,
        "epistemicStatus": "L3_IMPORTED",
    },
    {
        "id": "T6",
        "name": "separate indoor Wi-Fi proxy",
        "stage": 4,
        "formula": "wifi(t)=w_wifi BB(t) D_wifi(t)",
        "freeParameters": "0-1",
        "epistemicStatus": "L3_PHENOMENOLOGICAL",
    },
    {
        "id": "T7",
        "name": "handset power-control correction",
        "stage": 4,
        "formula": "personal_eff=P_tx_max(1-eta ambient_norm)",
        "freeParameters": 1,
        "parameterBounds": {"eta": [0.0, 1.0]},
        "epistemicStatus": "L3_PHENOMENOLOGICAL",
    },
    {
        "id": "T8",
        "name": "network-density saturation",
        "stage": 4,
        "formula": "P_ambient=P_max N/(N_half+N)",
        "freeParameters": 1,
        "epistemicStatus": "L3_PHENOMENOLOGICAL",
    },
    {
        "id": "T9",
        "name": "spectral-complexity multiplier",
        "stage": 4,
        "formula": "H=-sum(p_f log2 p_f); multiplier=1+lambda_H H",
        "freeParameters": 1,
        "parameterBounds": {"lambda_H": [0.0, 1.0]},
        "epistemicStatus": "L3_PHENOMENOLOGICAL",
    },
    {
        "id": "T10",
        "name": "seasonal-variation prediction",
        "stage": 2,
        "formula": "CV_seasonal=CV_0(1-duty_cycle)",
        "freeParameters": 0,
        "epistemicStatus": "L3_PHENOMENOLOGICAL",
    },
    {
        "id": "T11",
        "name": "melatonin-redox synergy",
        "stage": 2,
        "formula": "BL_syn=BL(1+epsilon_syn d_night chi_pineal)",
        "freeParameters": 0,
        "parameterBounds": {"epsilon_syn": [0.10, 0.30]},
        "epistemicStatus": "L3_PHENOMENOLOGICAL",
    },
    {
        "id": "T12",
        "name": "explicit parental epigenetic carry-over",
        "stage": 4,
        "formula": "BL_final=BL_syn+epsilon_epi BL_parent_at_conception",
        "freeParameters": 1,
        "parameterBounds": {"epsilon_epi": [0.05, 0.20]},
        "epistemicStatus": "L3_PHENOMENOLOGICAL",
    },
)


PREDICTIONS = (
    {
        "id": "F1",
        "statement": (
            "South Korea TFR reaches a minimum in 2025-2027 and remains at or "
            "above 0.60"
        ),
        "test": "KOSIS annual series",
        "timing": "2027",
        "mathematicalForm": "2025 <= argmin_y TFR_KR(y) <= 2027; min_y TFR_KR(y) >= 0.60",
        "numericValue": {
            "minimumWindowYears": [2025, 2027],
            "minimumTfrFloor": 0.60,
        },
        "timeHorizon": {"type": "calendar_year", "endYear": 2027},
        "falsificationCriterion": (
            "Falsified if the KOSIS annual minimum occurs outside 2025-2027 or "
            "any annual South Korea TFR in that locked window is below 0.60."
        ),
    },
    {
        "id": "F2",
        "statement": (
            "India TFR decline accelerates during 2025-2030 under the "
            "smartphone-timing scenario"
        ),
        "test": "SRS/NFHS",
        "timing": "2030",
        "mathematicalForm": "Delta^2 TFR_India(y) < 0 for the registered 2025-2030 acceleration contrast",
        "numericValue": {
            "windowYears": [2025, 2030],
            "secondDifferenceUpperBound": 0.0,
        },
        "timeHorizon": {"type": "calendar_year", "endYear": 2030},
        "falsificationCriterion": (
            "Falsified if the preregistered SRS/NFHS acceleration contrast is "
            "non-negative over 2025-2030."
        ),
    },
    {
        "id": "F3",
        "statement": (
            "Seasonal semen variation contracts as the duty-cycle proxy rises"
        ),
        "test": "CECOS/Cryos longitudinal series",
        "timing": "retrospective",
        "mathematicalForm": "d A_seasonal / d smartphone_penetration < 0",
        "numericValue": {"slopeUpperBound": 0.0},
        "timeHorizon": {"type": "retrospective", "endYear": None},
        "falsificationCriterion": (
            "Falsified if the preregistered penetration slope for seasonal "
            "amplitude is zero or positive."
        ),
    },
    {
        "id": "F4",
        "statement": (
            "ASFR 25-29 is lower for the 2005 birth cohort than the 1985 "
            "cohort after age alignment"
        ),
        "test": "national ASFR",
        "timing": "2034",
        "mathematicalForm": "ASFR_25_29(cohort=2005) - ASFR_25_29(cohort=1985) < 0",
        "numericValue": {
            "birthCohorts": [1985, 2005],
            "ageBandYears": [25, 29],
            "differenceUpperBound": 0.0,
        },
        "timeHorizon": {"type": "calendar_year", "endYear": 2034},
        "falsificationCriterion": (
            "Falsified if the age-aligned 2005-cohort ASFR at ages 25-29 is "
            "greater than or equal to the 1985-cohort value."
        ),
    },
    {
        "id": "F5",
        "statement": (
            "Rural TFR decline correlates negatively with base-station density "
            "in the registered power-control analysis"
        ),
        "test": "geospatial base-station plus municipal TFR panel",
        "timing": "current",
        "mathematicalForm": "partial_corr(Delta TFR_rural, base_station_density | preregistered controls) < 0",
        "numericValue": {"partialCorrelationUpperBound": 0.0},
        "timeHorizon": {"type": "current_dataset", "endYear": 2026},
        "falsificationCriterion": (
            "Falsified if the preregistered adjusted rural association is zero "
            "or positive."
        ),
    },
    {
        "id": "F6",
        "statement": (
            "A Hill exponent above one is selected in a preregistered "
            "multi-country shape test"
        ),
        "test": "20+ country TFR time series, 2000-2024",
        "timing": "current",
        "mathematicalForm": "n_hat > 1",
        "numericValue": {
            "hillExponentLowerBoundExclusive": 1.0,
            "minimumCountryCount": 20,
            "dataWindowYears": [2000, 2024],
        },
        "timeHorizon": {"type": "current_dataset", "endYear": 2024},
        "falsificationCriterion": (
            "Falsified if the preregistered estimate is n <= 1 or fewer than "
            "20 eligible countries remain."
        ),
    },
    {
        "id": "F7",
        "statement": (
            "Low-technology Amish/Haredi comparison communities remain near "
            "their own high-fertility baseline"
        ),
        "test": "community demographic series",
        "timing": "continuous",
        "mathematicalForm": "d TFR_low_technology / dt = 0 under the registered trend test",
        "numericValue": {
            "expectedTrend": 0.0,
            "amishReferenceTfrRange": [6.5, 7.0],
        },
        "timeHorizon": {"type": "continuous", "startYear": 2026, "endYear": None},
        "falsificationCriterion": (
            "Falsified if a preregistered community-specific trend test shows "
            "a sustained departure from zero outside its declared interval."
        ),
    },
    {
        "id": "F8",
        "statement": (
            "Offspring of persistently low-proxy parents show no generational "
            "semen decline attributable to T12"
        ),
        "test": "community health panel",
        "timing": "continuous",
        "mathematicalForm": "d semen_quality_low_proxy / d generation = 0",
        "numericValue": {"expectedGenerationalSlope": 0.0},
        "timeHorizon": {"type": "continuous", "startYear": 2026, "endYear": None},
        "falsificationCriterion": (
            "Falsified if a preregistered low-proxy lineage analysis estimates "
            "a sustained negative generational slope."
        ),
    },
    {
        "id": "F9",
        "statement": (
            "Male-line cumulative state predicts lower IVF live-birth delivery "
            "after female indications are stratified"
        ),
        "test": "IVF registry",
        "timing": "retrospective",
        "mathematicalForm": "beta_male_load in logit(P(live_birth)) < 0 after female-indication stratification",
        "numericValue": {"coefficientUpperBound": 0.0},
        "timeHorizon": {"type": "retrospective", "endYear": None},
        "falsificationCriterion": (
            "Falsified if the preregistered adjusted male-load coefficient is "
            "zero or positive."
        ),
    },
)


PREDICTION_LOCK_REVISION = "2026-09-04"


VERIFICATION_POINTS = (
    (
        "V1",
        1,
        "VGCC blockers prevent the reported EMF response in the Pall 2013 evidence set",
        "source-level replication and blocker specificity review",
    ),
    (
        "V2",
        1,
        "Schwan membrane-voltage coupling is quantitatively applicable",
        "protocol-specific membrane-voltage calculation",
    ),
    (
        "V3",
        1,
        "Amish TFR remains near 6.5-7.0 under the registered low-technology contrast",
        "community-specific exposure and demographic comparison",
    ),
    (
        "V4",
        2,
        "Pulsed GSM protocols produce more DNA damage than matched continuous-wave protocols",
        "matched waveform experiment",
    ),
    (
        "V5",
        2,
        "The TFR series lacks the proposed decline in the 1950-1985 FM period and accelerates in the GSM period",
        "pre-specified segmented time-series test",
    ),
    (
        "V6",
        2,
        "Countries in the proposed 3G transition show slower TFR acceleration than in 2G",
        "country-panel technology-generation contrast",
    ),
    (
        "V7",
        2,
        "Measured spectral exposure distributions distinguish the registered frequency bands",
        "personal spectral dosimetry comparison",
    ),
    (
        "V8",
        3,
        "Birth cohorts show the registered secular testosterone decline",
        "age-adjusted cohort analysis",
    ),
    (
        "V9",
        3,
        "South Korean ASFR ages 25-34 accelerates near the registered 2015 window",
        "official ASFR breakpoint analysis",
    ),
    (
        "V10",
        3,
        "The sperm-count decline accelerates in the registered later period",
        "piecewise meta-regression replication",
    ),
    (
        "V11",
        3,
        "Pronatalist programmes do not reverse the registered slow-load trajectory",
        "policy interruption panel with matched controls",
    ),
    (
        "V12",
        3,
        "TFR continues declining after smartphone penetration saturation",
        "post-saturation slope test",
    ),
    (
        "V13",
        4,
        "The registered endpoints converge temporally during 2007-2015",
        "multivariate breakpoint comparison",
    ),
    (
        "V14",
        4,
        "Country ordering of biological load co-varies with myopia and TFR as registered",
        "out-of-sample country-rank test",
    ),
    (
        "V15",
        4,
        "The Yakymenko 2016 evidence set retains its reported ROS direction under audit",
        "study-level extraction and bias-sensitive meta-analysis",
    ),
    (
        "V16",
        5,
        "The registered Wi-Fi-to-CCD timing is reproduced for honeybees",
        "species-specific spectral and lag analysis",
    ),
    (
        "V17",
        5,
        "The registered GSM-to-frog-decline resonance/timing relation is reproduced",
        "species-specific resonance and breakpoint analysis",
    ),
    (
        "V18",
        5,
        "House-sparrow abundance varies with base-station exposure in the registered direction",
        "geospatial replication with habitat controls",
    ),
    (
        "V19",
        5,
        "Insect biomass decline displays the registered post-saturation pattern",
        "independent longitudinal biomass analysis",
    ),
    (
        "V20",
        5,
        "Five ecological crises share the registered 2006-2012 convergence window",
        "pre-specified multi-series convergence test",
    ),
    (
        "V21",
        6,
        "Pulsed-GSM studies report effects more often than matched continuous-wave studies",
        "protocol-coded systematic review",
    ),
    (
        "V22",
        6,
        "Laboratory background differences predict control-versus-exposed contrast compression",
        "measured-background multicentre replication",
    ),
    (
        "V23",
        7,
        "Haredi and secular Israeli TFR retain the registered low-technology contrast",
        "within-country community comparison",
    ),
    (
        "V24",
        7,
        "Urbanization-TFR association is mediated by measured ambient exposure under the registered model",
        "measured-exposure mediation analysis",
    ),
    (
        "V25",
        7,
        "Russia's 2007-2015 TFR rise is temporary under the registered 3G-transition timing",
        "locked post-period trajectory test",
    ),
)


CRITICAL_VERIFICATION_POINT_IDS = tuple(f"V{number}" for number in range(1, 11))

PROTOCOL_AUDIT_REQUIREMENTS = (
    "protocolLockedBeforeSearch",
    "completeSearchLog",
    "eligibilityPrespecified",
    "independentDualScreening",
    "symmetricModelComparison",
    "nullAndContradictoryEvidenceSearched",
    "riskOfBiasComplete",
    "exclusionsReasoned",
    "protocolDeviationsDisclosed",
)


@dataclass(frozen=True)
class VerificationOutcome:
    """One externally evaluated V-point result supplied to the release gate.

    A reason is mandatory for both PASS and FAIL so the registry never emits a
    bare boolean that cannot be audited.  Missing V-points are converted to an
    explicit FAIL with reason ``MISSING_EVALUATION`` by the gate.
    """

    passed: bool
    reason: str

    def __post_init__(self) -> None:
        if type(self.passed) is not bool:
            raise ValueError("passed must be boolean")
        if not isinstance(self.reason, str) or not self.reason.strip():
            raise ValueError("reason must be a non-empty string")
        object.__setattr__(self, "reason", self.reason.strip())


@dataclass(frozen=True)
class VerificationProtocolAudit:
    """Content-bound audit of the search, screening and analysis protocol.

    The booleans are produced by :mod:`berm.evidence_protocol` after validating
    the complete evaluation bundle.  They are deliberately separate from the
    V-point outcomes: a favourable result cannot certify its own search method.
    """

    protocol_id: str
    protocol_digest_sha256: str
    evaluated_point_ids: tuple[str, ...]
    protocolLockedBeforeSearch: bool
    completeSearchLog: bool
    eligibilityPrespecified: bool
    independentDualScreening: bool
    symmetricModelComparison: bool
    nullAndContradictoryEvidenceSearched: bool
    riskOfBiasComplete: bool
    exclusionsReasoned: bool
    protocolDeviationsDisclosed: bool

    def __post_init__(self) -> None:
        if not isinstance(self.protocol_id, str) or not self.protocol_id.strip():
            raise ValueError("protocol_id must be a non-empty string")
        object.__setattr__(self, "protocol_id", self.protocol_id.strip())
        digest = self.protocol_digest_sha256.lower()
        if len(digest) != 64 or any(
            character not in "0123456789abcdef" for character in digest
        ):
            raise ValueError("protocol_digest_sha256 must be a SHA-256 hex digest")
        object.__setattr__(self, "protocol_digest_sha256", digest)
        known_ids = {row[0] for row in VERIFICATION_POINTS}
        if not self.evaluated_point_ids:
            raise ValueError("evaluated_point_ids must not be empty")
        if len(set(self.evaluated_point_ids)) != len(self.evaluated_point_ids):
            raise ValueError("evaluated_point_ids must be unique")
        unknown_ids = sorted(set(self.evaluated_point_ids) - known_ids)
        if unknown_ids:
            raise ValueError(
                "unknown evaluated verification point(s): " + ", ".join(unknown_ids)
            )
        for requirement in PROTOCOL_AUDIT_REQUIREMENTS:
            if type(getattr(self, requirement)) is not bool:
                raise ValueError(f"{requirement} must be boolean")

    @property
    def passed(self) -> bool:
        return all(
            getattr(self, requirement) for requirement in PROTOCOL_AUDIT_REQUIREMENTS
        )

    def as_dict(self) -> dict:
        return {
            "passed": self.passed,
            "protocolId": self.protocol_id,
            "protocolDigestSha256": self.protocol_digest_sha256,
            "evaluatedPointIds": list(self.evaluated_point_ids),
            **{
                requirement: getattr(self, requirement)
                for requirement in PROTOCOL_AUDIT_REQUIREMENTS
            },
        }


class VerificationGateFailure(RuntimeError):
    """Raised when critical V-points or the method audit block publication."""

    def __init__(self, result: Mapping[str, object]) -> None:
        blockers = result.get("publicationBlockers", result.get("criticalFailures", []))
        super().__init__(
            "publication blocked by verification requirement(s): "
            + ", ".join(str(identifier) for identifier in blockers)
        )
        self.result = deepcopy(dict(result))


def evaluate_verification_gate(
    outcomes: Mapping[str, VerificationOutcome],
    *,
    protocol_audit: VerificationProtocolAudit | None = None,
) -> dict:
    """Evaluate all V1--V25 points and enforce the V1--V10 release gate.

    Every registered point is returned as PASS or FAIL with a reason.  A point
    absent from ``outcomes`` fails explicitly rather than being silently
    skipped.  Publication is allowed exactly when all critical V1--V10 points
    pass; V11--V25 remain reported and contribute to ``allPointsPassed``.
    Publication additionally requires a content-bound protocol audit covering
    all critical points.  Raw PASS booleans therefore cannot authorize release.
    """

    if not isinstance(outcomes, Mapping):
        raise ValueError("outcomes must be a mapping")
    if protocol_audit is not None and not isinstance(
        protocol_audit, VerificationProtocolAudit
    ):
        raise ValueError("protocol_audit must be a VerificationProtocolAudit")
    known_ids = {row[0] for row in VERIFICATION_POINTS}
    unknown_ids = sorted(set(outcomes) - known_ids)
    if unknown_ids:
        raise ValueError(f"unknown verification point(s): {', '.join(unknown_ids)}")

    point_results: list[dict] = []
    for identifier, _level, _claim, _test in VERIFICATION_POINTS:
        supplied = outcomes.get(identifier)
        if supplied is None:
            passed = False
            reason = "MISSING_EVALUATION"
            evidenceSupplied = False
        else:
            if not isinstance(supplied, VerificationOutcome):
                raise ValueError(
                    f"outcomes[{identifier!r}] must be a VerificationOutcome"
                )
            passed = supplied.passed
            reason = supplied.reason
            evidenceSupplied = True
        point_results.append(
            {
                "id": identifier,
                "result": "PASS" if passed else "FAIL",
                "reason": reason,
                "evidenceSupplied": evidenceSupplied,
                "criticalForPublication": (
                    identifier in CRITICAL_VERIFICATION_POINT_IDS
                ),
            }
        )

    critical_failures = [
        item["id"]
        for item in point_results
        if item["criticalForPublication"] and item["result"] == "FAIL"
    ]
    missing_evaluations = [
        item["id"] for item in point_results if not item["evidenceSupplied"]
    ]
    if protocol_audit is None:
        protocol_result = {
            "passed": False,
            "reason": "MISSING_PROTOCOL_AUDIT",
            "criticalPointCoverage": False,
        }
    else:
        protocol_result = protocol_audit.as_dict()
        critical_point_coverage = set(CRITICAL_VERIFICATION_POINT_IDS).issubset(
            protocol_audit.evaluated_point_ids
        )
        protocol_result["criticalPointCoverage"] = critical_point_coverage
        if not critical_point_coverage:
            protocol_result["passed"] = False
            protocol_result["reason"] = "MISSING_CRITICAL_POINT_COVERAGE"
        elif not protocol_audit.passed:
            protocol_result["reason"] = "PROTOCOL_AUDIT_FAILED"
        else:
            protocol_result["reason"] = "PROTOCOL_AUDIT_PASSED"
    protocol_passed = protocol_result["passed"] is True
    publication_blockers = list(critical_failures)
    if not protocol_passed:
        publication_blockers.append("PROTOCOL_AUDIT")
    return {
        "publicationAllowed": not publication_blockers,
        "allPointsPassed": all(item["result"] == "PASS" for item in point_results),
        "criticalFailures": critical_failures,
        "missingEvaluations": missing_evaluations,
        "publicationBlockers": publication_blockers,
        "protocolAudit": protocol_result,
        "points": point_results,
    }


def require_verification_gate_for_publication(
    outcomes: Mapping[str, VerificationOutcome],
    *,
    protocol_audit: VerificationProtocolAudit | None = None,
) -> dict:
    """Return the complete gate report or block publication with an exception."""

    result = evaluate_verification_gate(outcomes, protocol_audit=protocol_audit)
    if not result["publicationAllowed"]:
        raise VerificationGateFailure(result)
    return result


ENDPOINT_TESTS = (
    ("E1", "2016-2024 country TFR holdout", "RMSE < 0.15 TFR units"),
    ("E2", "South Korea ASFR 25-34 acceleration timing", "predicted within +/-2 years"),
    ("E3", "Finland TFR exceeds South Korea TFR in 2024", "directional ordering"),
    (
        "E4",
        "low-technology community TFR approximates its measured baseline",
        "requires community-specific exposure history",
    ),
    (
        "E5",
        "same load state maps to the 1973-2018 sperm-concentration series",
        "separate endpoint mapping",
    ),
    (
        "E6",
        "allometric honeybee response timing",
        "species-specific spectral input and tau_R",
    ),
)


INTERNAL_TESTS = (
    (
        "S0",
        "country holdout coverage",
        "observed TFR is inside the preregistered 95% interval",
    ),
    ("S1", "kernel ordering", "tau_R > tau_B"),
    ("S2", "long-memory dominance assumption", "alpha < 0.5; beta=1-alpha"),
    (
        "S3",
        "South Korea young-ASFR timing",
        "fast arm matches the preregistered timing window",
    ),
    (
        "S4",
        "low-technology contrast",
        "proxy/measurement state is explicitly near the registered reference",
    ),
    ("S5", "multi-endpoint invariance", "same tau_B, tau_R and alpha are retained"),
    ("S6", "temporal holdout", "calibrate through 2015; evaluate 2016-2024"),
)


MODEL_FAMILIES = (
    {
        "id": "M0",
        "name": "null",
        "parameters": 0,
        "description": "constant TFR comparator",
    },
    {
        "id": "M1",
        "name": "cumulative proxy",
        "parameters": 1,
        "description": "legacy cumulative technology proxy",
    },
    {
        "id": "M2",
        "name": "single exponential",
        "parameters": 2,
        "description": "one normalized lag kernel",
    },
    {
        "id": "M3",
        "name": "base DKC",
        "parameters": 4,
        "description": "two normalized kernels plus bounded Hill mapping",
    },
    {
        "id": "M4",
        "name": "refined DKC",
        "parameters": "8-10",
        "description": "T1-T12 candidate calculation",
    },
)


TENSOR_TESTS = (
    {
        "id": "F_T1",
        "name": "zero-background prohibition for the candidate ion-channel response",
        "formula": "chi(0)=0; delta F_ion=C_bridge chi(0) DeltaV_mem=0",
        "status": "L1_CHI_CONTRACT_WITH_EXPLICIT_L2_RESPONSE_PRODUCT",
        "implemented": True,
        "testPath": "tests/test_exposure.py::test_f_t1_zero_background_forbids_personal_response",
    },
    {
        "id": "F_T2",
        "name": "geodesic selection after scalar spacelike reduction",
        "formula": "x=sqrt(kappa)s; chi(x)=x/sqrt(1+x^2)=kappa^(-1/2)dV/ds approaches 1",
        "status": "L1_CHI_FORMULA_AFTER_EXPLICIT_L2_SPATIAL_REDUCTION",
        "implemented": True,
        "testPath": "tests/test_exposure.py::test_f_t2_chi_saturates_at_one",
    },
    {
        "id": "F_T3",
        "name": "directional volume derivative",
        "formula": "D_u sqrt(-det g)=kappa(A·u)/sqrt(1+kappa A^2); on the L2 spatial slice delta F_ion is proportional to cos(theta)",
        "status": "L1_DERIVED_DIRECTIONAL_L2_IDENTIFICATION_OPEN",
        "implemented": True,
        "testPath": "tests/test_lindgren_tensor.py::test_f_t3_spatial_directional_response_is_proportional_to_cos_theta",
    },
    {
        "id": "F_T4",
        "name": "frequency-dependent SAR and body resonance",
        "formula": "SAR=sigma|E_internal|^2/rho; f_res=c/(4L)=44.1 MHz for L=1.7 m, acceptance band +/-20%",
        "status": "L1_DERIVED_STRUCTURE_WITH_L3_EMPIRICAL_PARAMETERS",
        "implemented": True,
        "testPath": "tests/test_schwan.py::test_f_t4_sar_and_human_body_resonance",
    },
    {
        "id": "F_T5",
        "name": "Schwan membrane filter",
        "formula": "Delta V=1.5 r E/sqrt(1+(2 pi f tau_m)^2)",
        "status": "L1_DERIVED_STRUCTURE_WITH_L3_EMPIRICAL_PARAMETERS",
        "implemented": True,
        "testPath": "tests/test_schwan.py::test_f_t5_schwan_low_pass_with_one_microsecond_tau",
    },
)


def dkc_framework_registry() -> dict:
    """Return a detached machine-readable DKC framework registry."""

    def prediction_record(row: Mapping[str, object]) -> dict:
        locked_payload = {
            "id": row["id"],
            "statement": row["statement"],
            "test": row["test"],
            "timing": row["timing"],
            "mathematicalForm": row["mathematicalForm"],
            "numericValue": row["numericValue"],
            "timeHorizon": row["timeHorizon"],
            "falsificationCriterion": row["falsificationCriterion"],
            "lockRevision": PREDICTION_LOCK_REVISION,
        }
        lock_payload = json.dumps(
            locked_payload,
            ensure_ascii=False,
            sort_keys=True,
            separators=(",", ":"),
        )
        return {
            **row,
            "status": "LOCKED_FALSIFIABLE_FORECAST",
            "locked": True,
            "lockRevision": PREDICTION_LOCK_REVISION,
            "lockDigestSha256": sha256(lock_payload.encode("utf-8")).hexdigest(),
        }

    default_verification_evaluation = evaluate_verification_gate({})

    return deepcopy(
        {
            "schemaVersion": 3,
            "routeId": DKC_CANDIDATE_ROUTE_ID,
            "status": {
                "role": "candidate_scenario_and_validation",
                "calculationEnabled": True,
                "candidateOutputsEnabled": True,
                "lindgrenFormulation": "2025-weyl-gme",
                "l2Bridge": "OPEN",
                "l2BridgeFormalization": "OPEN_IDENTIFICATION; ROUTE FLAG KEPT SEPARATE FROM PROXY AND M4 FIT",
                "fieldStateCalibrated": True,
                "fieldStateCalibrationScope": "CALIBRATION_PIPELINE_IMPLEMENTED_AND_PRODUCES_VALUES",
                "refinedM4CurrentDataStatus": "NOT_IDENTIFIABLE_WITH_CURRENT_DATA",
                "supportsUncalibratedExecution": True,
                "publishesLockedForecasts": True,
                "nationalInputClass": "TECHNOLOGY_TIMING_PROXY",
                "epistemicStatusPolicy": "COMPONENTWISE_NO_WEAKEST_LINK_COLLAPSE",
                "derivedStatusPreserved": True,
            },
            "derivation": {
                "L0": "g_mu_nu = eta_mu_nu + kappa A_mu A_nu",
                "L1": "exact delta_g plus inverse, determinant, directional volume derivative and parameter-free chi formula on their stated domains",
                "L1Conditions": "1+kappa A^2>0 for a real Lorentzian volume; D_u sqrt(-det g)=kappa(A dot u)/sqrt(1+kappa A^2) remains directional; chi itself is always L1",
                "L2": "EXPLICIT BRIDGE: the Lorentz-to-spatial scalar reduction maps the directed derivative through |A_bar| to chi(|A_bar|); concrete observable and delta_V_VGCC identifications still require a response operator and units",
                "selectionRule": "chi(A_bar)=A_bar/sqrt(1+A_bar^2) is always L1 in the geodesic-deviation chain; the Lorentz-to-spatial |A_bar| reduction and concrete observable mapping are explicit L2 steps",
                "spatialScalarReduction": {
                    "conditions": "dimensionless, collinear and spacelike",
                    "reductionStatus": "L2_EXPLICIT_BRIDGE",
                    "directedDerivativeToMagnitude": "D_u volume -> |A_bar| -> chi(|A_bar|)",
                    "observableIdentificationStatus": "L2_OPEN",
                    "derivedCoefficientStatus": "L1_ALWAYS",
                },
                "imported": "SAR parameters, receptor coupling, modulation, DKC biology and endpoint mappings retain their own L3 provenance without relabelling L1-derived structures",
                "provenancePolicy": "componentwise_no_weakest_link_collapse",
                "maxwellCaveat": "the 2025 source uses a variational harmonic-metric equation and Weyl connection; contracted Bianchi alone is not the source equation",
                "formalThreeElementChain": {
                    "implemented": True,
                    "requiresAll": True,
                    "epistemicStatus": "L1_DERIVED_FORMULAS",
                    "gateStatus": "CONDITIONAL_INPUT_CONTRACT",
                    "derivedStatusPreserved": True,
                    "actionPremise": "S=integral sqrt(-det g) R d^4x",
                    "parallelActionPremises": [
                        "EINSTEIN_HILBERT_WITH_LEVI_CIVITA_CURVATURE",
                        "WEYL_METRIC_GRADIENT_HARMONIC_GME",
                    ],
                    "variationalEquation": "delta S/delta A_mu=0",
                    "variationalResidual": "branch-selected numerical full-action delta S/delta A_mu; EH also checks -2 kappa sqrt(-det g) G^(mu nu) A_nu; GME also checks the harmonic decomposition and R_outer=kappa R_GME",
                    "fullEulerLagrangeRequired": True,
                    "fullEulerLagrangeEvidence": (
                        "CONTENT_BOUND_NUMERICAL_RESIDUAL_AND_STRUCTURED_ATTESTATION_REQUIRED"
                    ),
                    "inputProvenanceBinding": "NUMERIC_INPUT_BUNDLE_SHA256",
                    "ehResidualComputation": (
                        "FROM_SUPPLIED_POTENTIAL_AND_SUPPLIED_SYMMETRIC_EINSTEIN_TENSOR"
                    ),
                    "weylCondition": "nabla^LC_sigma g_mu_nu=0; the Weyl branch separately requires tilde_nabla_sigma g_mu_nu=2 phi_sigma g_mu_nu",
                    "metricCompatibilityCondition": "nabla^LC_sigma g_mu_nu=0",
                    "weylSemimetricityCondition": "tilde_nabla_sigma g_mu_nu=2 phi_sigma g_mu_nu",
                    "weylChecks": [
                        "levi_civita_metric_compatibility",
                        "semimetricity",
                        "connection_reconstruction",
                        "torsion_free",
                    ],
                    "bianchiCondition": "F=dA and homogeneous dF=0",
                    "contractedBianchiCheck": "nabla^LC_mu G_LC^(mu nu)=0 is audited separately and is not a sourced-Maxwell equation",
                    "bianchiChecks": [
                        "levi_civita_contracted_identity",
                        "field_definition_F_equals_dA",
                        "same_field_derivative_attestation",
                        "homogeneous_dF",
                    ],
                    "acceptanceAssertion": "variational_check AND weyl_check AND bianchi_check",
                    "residualAcceptance": (
                        "PER_RESIDUAL_ATOL_PLUS_RTOL_TIMES_REFERENCE_SCALE"
                    ),
                    "elements": [
                        "variational_harmonic_metric_gme",
                        "weyl_semimetricity_and_connection",
                        "bianchi_contracted_identity_and_homogeneous_df",
                    ],
                    "unitTests": {
                        "variational": "tests/test_lindgren_tensor.py::test_variational_field_residual_and_three_way_gate_are_explicit",
                        "weyl": "tests/test_lindgren_tensor.py::test_weyl_semimetricity_uses_the_full_weyl_connection",
                        "leviCivitaMetricCompatibility": "tests/test_lindgren_tensor.py::test_weyl_connection_and_torsion_residuals_use_same_nontrivial_metric",
                        "bianchi": "tests/test_lindgren_tensor.py::test_bianchi_is_the_homogeneous_cyclic_identity_not_the_source_equation",
                    },
                    "passMeaning": "conditional_input_contract_not_independent_proof_or_physical_confirmation",
                },
            },
            "refinements": list(REFINEMENTS),
            "predictions": [prediction_record(row) for row in PREDICTIONS],
            "verificationPoints": [
                {
                    "id": identifier,
                    "level": level,
                    "claim": claim,
                    "test": test,
                    "status": "REGISTERED_FOR_CRITICAL_EVALUATION",
                    "gateImplemented": True,
                    "criticalForPublication": (
                        identifier in CRITICAL_VERIFICATION_POINT_IDS
                    ),
                    "defaultResult": "FAIL",
                    "defaultReason": "MISSING_EVALUATION",
                }
                for identifier, level, claim, test in VERIFICATION_POINTS
            ],
            "verificationGate": {
                "implemented": True,
                "enforcementFunction": "require_verification_gate_for_publication",
                "pointIds": [row[0] for row in VERIFICATION_POINTS],
                "criticalPointIds": list(CRITICAL_VERIFICATION_POINT_IDS),
                "publicationRule": "all(V1..V10 == PASS) AND protocolAudit.passed",
                "missingEvaluationPolicy": "FAIL",
                "unstructuredPassPolicy": "REJECT",
                "protocolAuditRequirements": list(PROTOCOL_AUDIT_REQUIREMENTS),
                "defaultEvaluation": default_verification_evaluation,
            },
            "endpointTests": [
                {
                    "id": identifier,
                    "test": test,
                    "criterion": criterion,
                    "status": "NOT_RUN_ON_MEASURED_FIELDSTATE",
                }
                for identifier, test, criterion in ENDPOINT_TESTS
            ],
            "internalTests": [
                {"id": identifier, "test": test, "criterion": criterion}
                for identifier, test, criterion in INTERNAL_TESTS
            ],
            "modelFamilies": list(MODEL_FAMILIES),
            "tensorTests": list(TENSOR_TESTS),
            "parameterBudget": {
                "baseFreeParameters": 4,
                "refinedFreeParameters": "8-10",
                "normalization": "beta=1-alpha",
            },
        }
    )


__all__ = [
    "CRITICAL_VERIFICATION_POINT_IDS",
    "ENDPOINT_TESTS",
    "INTERNAL_TESTS",
    "MODEL_FAMILIES",
    "PREDICTIONS",
    "PREDICTION_LOCK_REVISION",
    "PROTOCOL_AUDIT_REQUIREMENTS",
    "REFINEMENTS",
    "TENSOR_TESTS",
    "VERIFICATION_POINTS",
    "VerificationGateFailure",
    "VerificationOutcome",
    "VerificationProtocolAudit",
    "dkc_framework_registry",
    "evaluate_verification_gate",
    "require_verification_gate_for_publication",
]
