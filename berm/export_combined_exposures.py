#!/usr/bin/env python3
"""Export BERM's combined-exposure structure without fitting a response."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from berm.biology import combined_exposures_structure

ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = (ROOT / "website/data/combined-exposures.json",
           ROOT / "website/public/data/combined-exposures.json")


def serialized_export() -> str:
    return json.dumps(combined_exposures_structure(), ensure_ascii=False,
                      indent=2, allow_nan=False) + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    content = serialized_export()
    for path in OUTPUTS:
        if args.check:
            if not path.exists() or path.read_text(encoding="utf-8") != content:
                raise SystemExit(f"Stale combined-exposure structure: {path}")
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content, encoding="utf-8")
            print(f"Wrote {path}")


if __name__ == "__main__":
    main()
