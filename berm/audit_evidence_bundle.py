#!/usr/bin/env python3
"""Digest a locked protocol or validate a completed evidence bundle."""

from __future__ import annotations

import argparse
from collections.abc import Mapping
import json
from pathlib import Path

from berm.evidence_protocol import protocol_digest_sha256, validate_evaluation_bundle


def _load_object(path: Path) -> Mapping[str, object]:
    raw = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(raw, Mapping):
        raise ValueError(f"{path}: JSON root must be an object")
    return raw


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)

    digest_parser = subparsers.add_parser(
        "digest",
        help="print the canonical SHA-256 for a protocol object",
    )
    digest_parser.add_argument("path", type=Path)

    validate_parser = subparsers.add_parser(
        "validate",
        help="validate a completed search and evaluation bundle",
    )
    validate_parser.add_argument("path", type=Path)

    args = parser.parse_args()
    raw = _load_object(args.path)
    if args.command == "digest":
        protocol = raw.get("protocol", raw)
        if not isinstance(protocol, Mapping):
            raise ValueError("protocol must be a JSON object")
        print(protocol_digest_sha256(protocol))
        return

    audited = validate_evaluation_bundle(raw)
    print(json.dumps(audited.summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
