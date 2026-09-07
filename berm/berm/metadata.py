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

#: Historical research priority retained for consumers of v16/v17 metadata.
#: The 2025 metric perturbation does not select a biological receptor family.
#: RPM/CRY and membrane/channel implementations require their own conditional
#: geometry-to-observable operators; that L2 bridge remains open.
PRIMARY_PATHWAY = "B_RPM"

#: D1-D3 in docs/audit/DISCRIMINATING_TESTS.md. These test the primary branch
#: itself, which none of the 13 reviewed findings did.
#: Chae 2019 does not move this counter: its component result does not test
#: environmental RF disruption or identify a Lindgren coupling operator.
#:
#: Level 3→4 support (causal chain edge): Koivisto 2000, Eliyahu 2006,
#: Luria 2009 — acute neural/EEG endpoints. Those endpoints alone do not
#: distinguish VGIC from other transduction mechanisms and do not advance
#: the discriminating-test count.
#:
#: Level 4 (VGIC mechanism): Panagopoulos 2025 IFO-VGIC review
#: (131 studies) proposes an irregular-forced-oscillation interpretation.
#: A review is not an independent intervention identifying the first sensor
#: and does not test the RPM discriminating predictions or the open L2 bridge.
#:
#: Level 4 (VGIC) multi-pathway Ca2+ mechanism supported by:
#:   Panagopoulos 2025: IFO-VGIC, 131 studies, 95% oxidative (direct S4)
#:   Bertagna 2025: RyR/SERCA intracellular Ca2+ stores (Ann NY Acad Sci)
#: Level 5A->6 (ROS -> testis) 5G-frequency data:
#:   Bektas 2026: 3.5 GHz -> testis ROS + damage; CoQ10 rescue (bem.70043)
#:   Tissue-specific: Meyer 2026 + Haidar 2025 null in skin cells
#: Level 5C (melatonin) systematic evidence:
#:   Tbahriti 2026: PRISMA 55 studies, 88% melatonin suppression 20-50%
#: Level 5E (BBB) mechanistic support:
#:   Gao 2024: EMP -> tight junction degradation (bem.22494)
#: Discriminating tests D1-D3 remain at 0/3.
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
        "primary_pathway_basis": "historical_research_priority_not_geometric_derivation",
        "pathway_hierarchy_derived_from_geometry": False,
        "l2_bridge_status": "OPEN",
        "biological_evidence_validates_l0_l2": False,
        "primary_pathway_empirical_status": "untested_by_discriminating_test",
    }


MODEL_METADATA: dict[str, Any] = model_metadata()
