#!/usr/bin/env python3
"""Validate and mirror the curated intervention registry without inferring evidence.

The canonical editorial source is website/data/intervention-profiles.json.
Python and downloadable copies must remain byte-equivalent after JSON parsing.
No missing experimental value is replaced with a model result.
"""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'website/data/intervention-profiles.json'
OUTPUTS = (
    ROOT / 'berm/data/evidence/intervention_profiles_v1.json',
    ROOT / 'website/public/data/intervention-profiles.json',
)


def validate_profiles(data: dict[str, Any]) -> None:
    if data.get('schemaVersion') != 'berm-intervention-profiles-v1':
        raise ValueError('Unknown intervention profile schema')
    derivation = data.get('derivation', {})
    if derivation.get('status') != 'CONDITIONAL_FORMAL_OPERATOR':
        raise ValueError('The tissue-response bridge must remain explicitly conditional')
    for key in ('theoryVersion', 'premise', 'metricPerturbation', 'conditionalResponse', 'portMapping'):
        if not isinstance(derivation.get(key), str) or not derivation[key].strip():
            raise ValueError(f'Missing derivation step: {key}')
    if not derivation.get('assumptions') or not derivation.get('openBridges'):
        raise ValueError('Imported assumptions and open identification are required')
    profiles = data.get('profiles')
    if not isinstance(profiles, list) or not profiles:
        raise ValueError('Profiles must be a non-empty list')
    ids = [p['id'] for p in profiles]
    if len(set(ids)) != len(ids):
        raise ValueError('Duplicate intervention profile IDs')
    for p in profiles:
        if p.get('modelStatus') != 'STRUCTURAL_ONLY':
            raise ValueError('These profiles contain no fitted model calibration')
        for key in ('title', 'mechanism', 'observed', 'prediction'):
            for lang in ('en', 'fi'):
                if not p.get(key, {}).get(lang, '').strip():
                    raise ValueError(f'{p["id"]}: missing {lang} {key}')
        for key in ('system', 'field', 'light', 'drugTiming', 'measurement'):
            for lang in ('en', 'fi'):
                if not p.get('protocol', {}).get(key, {}).get(lang, '').strip():
                    raise ValueError(f'{p["id"]}: missing protocol {key}/{lang}')
        studies = p.get('studies', [])
        if not studies or any(type(s.get('fieldTested')) is not bool for s in studies):
            raise ValueError(f'{p["id"]}: every study must declare whether a field was tested')
        if set(p.get('referenceIds', [])) != {s['referenceId'] for s in studies}:
            raise ValueError(f'{p["id"]}: study/reference identity mismatch')
        if set(p.get('studyIds', [])) != {s['id'] for s in studies}:
            raise ValueError(f'{p["id"]}: study provenance mismatch')
        if any(s.get('sourceCoverage') not in ('full_text', 'abstract') for s in studies):
            raise ValueError(f'{p["id"]}: source coverage must be explicit')
        if not p.get('claimIds') or not p.get('atlasNodeIds') or not p.get('limitations'):
            raise ValueError(f'{p["id"]}: missing claim, atlas or scope linkage')
        contrast = p.get('contrast', {})
        if (contrast.get('status') != 'not_calculable_from_curated_data'
                or contrast.get('arms') != dict.fromkeys(('sham', 'field', 'drug', 'fieldDrug'))):
            raise ValueError(f'{p["id"]}: quantitative arm data require a separately reviewed schema')


def load_profiles() -> dict[str, Any]:
    data = json.loads(SOURCE.read_text(encoding='utf-8'))
    validate_profiles(data)
    return data


def main() -> None:
    data = load_profiles()
    content = json.dumps(data, ensure_ascii=False, indent=2) + '\n'
    for path in OUTPUTS:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding='utf-8')
    print(f'Validated and exported {len(data["profiles"])} intervention profiles')


if __name__ == '__main__':
    main()
