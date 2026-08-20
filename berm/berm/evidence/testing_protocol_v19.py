"""BERM v19 testable predictions and testing protocols.

Each test is designed to be discriminative: it can distinguish the
three-channel model from alternative explanations.

Status: STRUCTURAL_ONLY — test specifications, not results.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class TestableHypothesis:
    """One testable prediction from the BERM v19 three-channel model."""

    key: str
    name: str
    hypothesis: str
    data_source: str
    prediction: str
    controls: str
    discriminative: str
    priority: int  # 1-3 stars


THREE_CHANNEL_TESTS: dict[str, TestableHypothesis] = {

    "occupational_IF": TestableHypothesis(
        key="occupational_IF",
        name="Occupational IF exposure x sperm quality",
        hypothesis=(
            "High IF-exposure occupations (electronics manufacturing, "
            "electrical installation, lab work) have lower sperm quality "
            "than low IF-exposure occupations (outdoor work, agriculture)"
        ),
        data_source="Occupational health data: sperm parameters by occupation",
        prediction="IF-high occupations -> motility down, concentration down",
        controls="Age, BMI, smoking, alcohol, chemical exposure",
        discriminative=(
            "If RF-high occupations (cell tower installers) do NOT show "
            "the same effect -> IF-specific effect"
        ),
        priority=3,
    ),

    "covid_remote_vs_office": TestableHypothesis(
        key="covid_remote_vs_office",
        name="COVID: remote work vs office work x sperm quality",
        hypothesis=(
            "Workers who switched to remote work had greater sperm "
            "quality improvement than those who stayed in office"
        ),
        data_source=(
            "Fertility clinic data 2019-2021, occupation info "
            "(remote vs on-site)"
        ),
        prediction=(
            "Remote work -> sperm improvement; on-site -> no change or decline"
        ),
        controls="Age, BMI, COVID infection status, lifestyle changes",
        discriminative=(
            "If both groups improved equally -> IF is not the mechanism. "
            "If only remote improved -> IF mechanism confirmed."
        ),
        priority=3,
    ),

    "faraday_ivf": TestableHypothesis(
        key="faraday_ivf",
        name="Faraday-shielded vs normal IVF laboratory",
        hypothesis="EMF-shielded IVF lab has better outcomes",
        data_source="Prospective RCT or inter-laboratory comparison",
        prediction="Shielded lab -> fertilization up, blastocyst rate up",
        controls="Patient demographics, protocol, embryologist experience",
        discriminative=(
            "Shielding blocks ALL EMF frequencies. If IF-specific shielding "
            "suffices -> confirms three-channel model."
        ),
        priority=2,
    ),

    "led_vs_incandescent": TestableHypothesis(
        key="led_vs_incandescent",
        name="LED lighting vs incandescent x sperm parameters (animal)",
        hypothesis=(
            "Rats raised under LED lighting have worse sperm quality "
            "than those under incandescent lighting"
        ),
        data_source="Animal study: identical conditions except lighting type",
        prediction=(
            "Groups: A) incandescent (no IF-EMF), B) LED as-is (IF-EMF + blue light), "
            "C) LED EMF-shielded (no IF-EMF, same spectrum as B), "
            "D) LED warm-white EMF-shielded. "
            "B worse than A, C, D. If A~C~D -> EMF is main mechanism, not blue light."
        ),
        controls="Diet, temperature, light intensity, photoperiod",
        discriminative="Separates LED light spectrum from LED EMF effects",
        priority=3,
    ),

    "ttfields_torso_fertility": TestableHypothesis(
        key="ttfields_torso_fertility",
        name="TTFields torso treatment fertility monitoring",
        hypothesis=(
            "TTFields torso treatment patients (pancreatic, lung, ovarian "
            "cancer) show gonadotropin and sperm parameter changes"
        ),
        data_source=(
            "PANOVA-3 and other torso trial safety data. "
            "Request reproductive safety data from Novocure."
        ),
        prediction="FSH up, LH up, testosterone down, sperm parameters down",
        controls="Cancer type, chemotherapy, age",
        discriminative=(
            "Direct RCT-level evidence of IF field reproductive effect. "
            "If no effect -> intensity threshold is above environmental levels."
        ),
        priority=2,
    ),

    "hrv_earbud_users": TestableHypothesis(
        key="hrv_earbud_users",
        name="Earbud users vagal tone (HRV)",
        hypothesis=(
            "Heavy earbud users (>4h/day) have lower HRV (vagal tone) "
            "than non-users"
        ),
        data_source="Wearable device HRV data x earbud usage hours",
        prediction="HRV down, correlated with usage hours",
        controls="Age, BMI, exercise, caffeine, sleep, stress, smoking",
        discriminative=(
            "Compare wired headphone users with wireless earbud users. "
            "If both show equal HRV reduction -> not RF. "
            "If only wireless -> vagus nerve RF mechanism."
        ),
        priority=2,
    ),
}


PARADOX_TESTS: dict[str, TestableHypothesis] = {

    "icnirp_vs_fda": TestableHypothesis(
        key="icnirp_vs_fda",
        name="ICNIRP limits vs FDA therapeutic levels comparison",
        hypothesis=(
            "Document every frequency where FDA acknowledges biological "
            "effect and ICNIRP does not. Calculate intensity difference."
        ),
        data_source="FDA approval documents, ICNIRP 2020 guidelines",
        prediction=(
            "At multiple frequencies, therapeutic level is BELOW ICNIRP "
            "limit -> logical contradiction"
        ),
        controls="N/A (regulatory document analysis)",
        discriminative="Epistemological, not empirical",
        priority=3,
    ),

    "tdcs_vs_ambient": TestableHypothesis(
        key="tdcs_vs_ambient",
        name="tDCS field strength vs urban ambient field",
        hypothesis=(
            "tDCS: 0.3-1.0 V/m in cortex (FDA PMA 2025). "
            "Urban: 0.67-1.51 V/m measured (PMC 2022). "
            "Compare magnitudes."
        ),
        data_source="FDA approval data, published measurements",
        prediction=(
            "Environmental field is SAME order of magnitude as therapeutic "
            "field -> environmental exposure cannot be biologically irrelevant"
        ),
        controls="N/A",
        discriminative="Direct magnitude comparison",
        priority=3,
    ),

    "pemf_adenosine_chronic": TestableHypothesis(
        key="pemf_adenosine_chronic",
        name="PEMF adenosine receptor activation -> chronic exposure",
        hypothesis=(
            "PEMF activates A2A/A3 receptors 6-8 h/day -> therapy. "
            "LED drivers produce similar field 16 h/day. Is chronic "
            "adenosine receptor activation beneficial or harmful? "
            "(Receptor desensitization?)"
        ),
        data_source="Pharmacological literature on adenosine receptor desensitization",
        prediction=(
            "Chronic adenosine receptor activation may lead to "
            "desensitization -> adenosine sleep regulation weakens -> "
            "explains growth of sleep disorders"
        ),
        controls="Caffeine consumption (adenosine antagonist)",
        discriminative=(
            "If adenosine receptor desensitization -> caffeine sensitivity "
            "should decrease with IF exposure (same receptor system)"
        ),
        priority=2,
    ),
}


def all_tests() -> dict[str, TestableHypothesis]:
    """Return all BERM v19 testable hypotheses."""
    return {**THREE_CHANNEL_TESTS, **PARADOX_TESTS}


def high_priority_tests() -> list[TestableHypothesis]:
    """Return only priority-3 tests."""
    return [t for t in all_tests().values() if t.priority == 3]
