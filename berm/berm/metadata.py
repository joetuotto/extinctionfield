"""Model-level metadata: reasoning protocol and negative-findings review.

These fields describe the model's epistemic state, not its numerics. They are
derived from `docs/audit/CLASSIFICATION_TABLE.json` where a count exists there,
so the package, the site and the audit table cannot disagree.
"""

from __future__ import annotations

import json
from functools import lru_cache
from pathlib import Path
from typing import Any

CLASSIFICATION_TABLE_PATH = (
    Path(__file__).resolve().parent.parent.parent
    / "docs"
    / "audit"
    / "CLASSIFICATION_TABLE.json"
)

REASONING_PROTOCOL_VERSION = "1.0"

#: Pathway C (radical-pair / cryptochrome) is primary after the Lindgren
#: geometry analysis; pathway A (VGCC) needs biological amplifiers the
#: geometry does not supply.
PRIMARY_PATHWAY = "C_RPM"

#: D1-D3 in docs/audit/DISCRIMINATING_TESTS.md. These test the primary branch
#: itself, which none of the 13 reviewed findings did.
DISCRIMINATING_TESTS_NEEDED = 3
DISCRIMINATING_TESTS_COMPLETED = 0


@lru_cache(maxsize=1)
def _classification_summary() -> dict[str, int]:
    raw = json.loads(CLASSIFICATION_TABLE_PATH.read_text(encoding="utf-8"))
    return dict(raw["summary"])


def model_metadata() -> dict[str, Any]:
    """Return the epistemic metadata block, counts read from the audit table."""
    summary = _classification_summary()
    return {
        "reasoning_protocol_version": REASONING_PROTOCOL_VERSION,
        "negative_findings_reviewed": summary["total"],
        "findings_reclassified": summary["reclassified"],
        "findings_remain_negative": summary["remains_negative"],
        "findings_internal_refinement": summary["internal_refinement"],
        "findings_affecting_current_model": summary["affects_current_berm"],
        "follow_up_discriminating_tests_identified": summary[
            "discriminating_tests_needed"
        ],
        "discriminating_tests_needed": DISCRIMINATING_TESTS_NEEDED,
        "discriminating_tests_completed": DISCRIMINATING_TESTS_COMPLETED,
        "primary_pathway": PRIMARY_PATHWAY,
        "primary_pathway_empirical_status": "untested_by_discriminating_test",
    }


MODEL_METADATA: dict[str, Any] = model_metadata()
