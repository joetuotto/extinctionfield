#!/usr/bin/env python3
"""Publish DKC only after V1--V10 and the evidence-protocol audit pass."""

from __future__ import annotations

import argparse
from collections.abc import Mapping, Sequence
import json
from pathlib import Path

from berm.dkc_registry import (
    dkc_framework_registry,
    require_verification_gate_for_publication,
)
from berm.evidence_protocol import AuditedEvaluationBundle, validate_evaluation_bundle


ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = (
    ROOT / "website" / "data" / "dkc-framework.json",
    ROOT / "website" / "public" / "data" / "dkc-framework.json",
)


def load_evaluation_bundle(path: Path) -> AuditedEvaluationBundle:
    """Load and validate a protocol-locked evidence evaluation bundle."""

    raw = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(raw, Mapping):
        raise ValueError("evaluation bundle must be a JSON object")
    return validate_evaluation_bundle(raw)


def export_registry_for_publication(
    evaluation_bundle: AuditedEvaluationBundle,
    *,
    outputs: Sequence[Path] = OUTPUTS,
) -> tuple[Path, ...]:
    """Write only after the critical results and method audit both pass."""

    if not isinstance(evaluation_bundle, AuditedEvaluationBundle):
        raise ValueError("evaluation_bundle must be an AuditedEvaluationBundle")
    gate_result = require_verification_gate_for_publication(
        evaluation_bundle.outcomes,
        protocol_audit=evaluation_bundle.protocol_audit,
    )
    registry = dkc_framework_registry()
    registry["verificationGate"]["releaseEvaluation"] = gate_result
    registry["verificationGate"]["evaluationBundleSummary"] = dict(
        evaluation_bundle.summary
    )
    registry["verificationGate"]["releaseAuthorized"] = True
    payload = json.dumps(registry, ensure_ascii=False, indent=2, sort_keys=False) + "\n"
    written: list[Path] = []
    for path in outputs:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(payload, encoding="utf-8")
        written.append(path)
    return tuple(written)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--evaluation-bundle",
        required=True,
        type=Path,
        help="protocol-locked search, screening, bias and V1--V25 evaluation JSON",
    )
    args = parser.parse_args()
    evaluation_bundle = load_evaluation_bundle(args.evaluation_bundle)
    for path in export_registry_for_publication(evaluation_bundle):
        print(path.relative_to(ROOT))


if __name__ == "__main__":
    main()
