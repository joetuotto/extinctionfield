"""Read-only source comparison and model impact inventory for the 2026-09-08 audit.

Writes only audit outputs next to this file. A keyword hit is a candidate for
manual review, never a curated evidence relation or proof of implementation.
"""
from pathlib import Path
import ast
import csv
import hashlib
import json
import re
import subprocess
from datetime import datetime, timezone

OUT = Path(__file__).resolve().parent
ROOTS = {
    "working": Path('/Volumes/kovalevy 3/extinctionfield'),
    "published_source": Path('/Users/ottojuote/.berm-navigation-repair-20260908'),
}
SCOPES = ('berm/berm', 'berm/docs', 'berm/tests', 'berm/data/evidence',
          'website/app', 'website/components', 'website/lib', 'website/data',
          'website/public/data', 'website/scripts')
SUFFIXES = {'.py', '.md', '.json', '.ts', '.tsx', '.mjs', '.css'}
PATTERNS = {
    'timothy_cacna1': r'Timothy|CACNA1[ACDH]|CaV1\.[23]|PASNA|SANDD',
    'katp': r'KCNJ11|ABCC8|KATP|K_ATP|hyperinsulin|DEND',
    'soce': r'STIM1|ORAI1|Stormorken|SOCE|store.operated',
    'er_reserve': r'ATP2A2|SERCA|Darier|WFS1|Wolfram|glutathione|glutation|repair_capacity|er_store|er_calcium',
    'ryr': r'RYR[12]?\b|ryanod|CPVT|cicr|release_rate',
    'clock': r'CRY[12]|PER2|RAI1|Smith.Magenis|phase_coordination|circadian|HormoneReceptivity',
    'gnrh': r'TAC3|TACR3|GnRH|gonadotrop|FSH/LH|LH/FSH',
    'leptin_motivation': r'\bLEP\b|leptin|leptiini|motivation|motivaat|valuation|arvotta|behavioral_factor',
    'fertilization': r'CatSper|CATSPER|PLCZ1|PLC.?zeta|hyperactiv|oocyte.activation|fertilization',
    'downstream': r'waiting|calendar|asfr|tfr|social_network|institution|couple',
}
COMPILED = {key: re.compile(pattern, re.I) for key, pattern in PATTERNS.items()}

def run(root, *args):
    return subprocess.check_output(args, cwd=root, text=True).strip()

def files(root):
    found = set()
    for scope in SCOPES:
        for path in (root / scope).rglob('*'):
            if path.is_file() and path.suffix in SUFFIXES and not any(
                p in {'__pycache__', 'node_modules', '.next', '.git'} for p in path.parts
            ):
                found.add(path.relative_to(root).as_posix())
    for path in root.glob('berm/export*.py'):
        found.add(path.relative_to(root).as_posix())
    return found

inventories = {name: files(root) for name, root in ROOTS.items()}
rows = []
for relative in sorted(set.union(*inventories.values())):
    row = {'path': relative}
    for name, root in ROOTS.items():
        path = root / relative
        row[name + '_sha256'] = hashlib.sha256(path.read_bytes()).hexdigest() if path.is_file() else None
    row['comparison'] = (
        'same' if row['working_sha256'] == row['published_source_sha256']
        else 'published_only' if row['working_sha256'] is None
        else 'working_only' if row['published_source_sha256'] is None
        else 'different'
    )
    rows.append(row)

hits, symbols = [], []
for name, root in ROOTS.items():
    for relative in sorted(inventories[name]):
        if not (relative.startswith('berm/berm/') or relative.startswith('berm/docs/')
                or relative.startswith('berm/tests/') or re.match(r'berm/export.*\.py$', relative)):
            continue
        content = (root / relative).read_text(encoding='utf-8')
        matched_families = set()
        for line, value in enumerate(content.splitlines(), 1):
            families = [key for key, pattern in COMPILED.items() if pattern.search(value)]
            if families:
                matched_families.update(families)
                hits.append({'version': name, 'path': relative, 'line': line,
                             'families': families, 'text': value.strip()[:550]})
        if relative.endswith('.py') and matched_families:
            tree = ast.parse(content, filename=relative)
            for node in tree.body:
                if isinstance(node, (ast.ClassDef, ast.FunctionDef, ast.AsyncFunctionDef)):
                    symbols.append({'version': name, 'path': relative, 'line': node.lineno,
                                    'symbol': node.name, 'kind': type(node).__name__,
                                    'file_families': sorted(matched_families)})

summary = {
    'created_utc': datetime.now(timezone.utc).isoformat(),
    'scope': list(SCOPES),
    'keyword_hits_are_not_evidence_relations': True,
    'versions': {
        name: {'root': str(root), 'head': run(root, 'git', 'rev-parse', 'HEAD'),
               'branch': run(root, 'git', 'branch', '--show-current'),
               'scoped_file_count': len(inventories[name])}
        for name, root in ROOTS.items()
    },
    'comparison_counts': {status: sum(row['comparison'] == status for row in rows)
                          for status in ('same', 'different', 'working_only', 'published_only')},
    'model_hit_files': {name: len({h['path'] for h in hits if h['version'] == name})
                        for name in ROOTS},
    'model_family_files': {
        name: {family: len({h['path'] for h in hits if h['version'] == name and family in h['families']})
               for family in PATTERNS} for name in ROOTS
    },
}
for filename, value in (('VERSION_VERTAILU.json', rows), ('MALLI_OSUMAT.json', hits),
                        ('MALLI_SYMBOLIT.json', symbols), ('INVENTAARIN_YHTEENVETO.json', summary)):
    (OUT / filename).write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')
with (OUT / 'VERSION_EROT.csv').open('w', newline='', encoding='utf-8') as stream:
    writer = csv.DictWriter(stream, fieldnames=list(rows[0]))
    writer.writeheader()
    writer.writerows(row for row in rows if row['comparison'] != 'same')
print(json.dumps(summary, ensure_ascii=False, indent=2))
