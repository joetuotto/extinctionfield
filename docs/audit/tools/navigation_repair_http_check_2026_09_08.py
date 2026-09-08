#!/usr/bin/env python3
"""Read-only, repeatable BERM final HTTP/HTML audit. No requests in --preflight-only.

python3 /tmp/berm-functional-final-check.py --workspace WORKTREE --base-url URL \
  --report WORKTREE/docs/audit/FUNCTIONAL_REPAIR_LOCAL_CHECKS_2026-09-08.json
"""
from pathlib import Path
from html.parser import HTMLParser
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import urljoin, urlsplit, unquote, quote
from collections import Counter
import argparse, datetime, hashlib, json, re, subprocess, tempfile, time

LOCALES = ['en', 'fi', 'ja', 'fr', 'ko']
HUBS = ['/physics', '/biology', '/behavior', '/evidence/convergence']
SECTIONS = ['/model', '/physics', '/biology', '/behavior', '/civilization', '/evidence/convergence', '/about']
ABOUT_LABELS = {'en': 'About this project', 'fi': 'Tietoa projektista', 'ja': 'プロジェクトについて', 'fr': 'À propos du projet', 'ko': '프로젝트 소개'}
PRIMARY_NAV_LABELS = {'Main navigation', 'Päävalikko', 'メインナビゲーション', 'Navigation principale', '메인 내비게이션'}
TOC_LABELS = {'en': 'Model contents', 'fi': 'Mallin sisällysluettelo', 'ja': 'モデルの目次', 'fr': 'Sommaire du modèle', 'ko': '모델 목차'}
REPAIRED_TOC = {
    'fieldstate-input': '/measurement/fieldstate#fieldstate-input',
    'static-interface': '/measurement/fieldstate#static-interface',
    'organ-states': '/measurement/fieldstate#organ-states',
    'asfr-tfr': '/measurement/fieldstate#asfr-tfr',
    'premise': '/model/math#lindgren',
    'evo-calibration': '/model/math#evo-calibration',
    'three-channel-derivation': '/model/math#three-channel-derivation',
    'fieldstate': '/measurement/fieldstate/math#field-record',
    'static-interface-math': '/measurement/fieldstate/math#static-interface',
    'organ-state': '/model#modulome',
    'cohort': '/model#dual-kernel',
    'gme': '/model/math#lindgren',
    'validation': '/measurement/fieldstate/math#boundary',
}

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set(); self.hrefs = set(); self.body_hrefs = set(); self.primary_nav_hrefs = set(); self.claims = set(); self.references = {}
        self.text = []; self.skip = 0; self.navs = []; self.about = []; self.toc = []
        self.sections = []; self.active_sections = []; self.h1 = []; self.in_h1 = False
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ('script', 'style'): self.skip += 1
        if tag == 'h1': self.in_h1 = True
        if 'id' in attrs: self.ids.add(attrs['id'])
        if tag == 'nav': self.navs.append(attrs.get('aria-label', ''))
        if tag == 'a' and 'href' in attrs:
            self.hrefs.add(attrs['href'])
            if self.navs and self.navs[-1] in PRIMARY_NAV_LABELS: self.primary_nav_hrefs.add(attrs['href'])
            else: self.body_hrefs.add(attrs['href'])
            if self.navs and self.navs[-1] in ABOUT_LABELS.values(): self.about.append(attrs)
            if self.navs and self.navs[-1] in TOC_LABELS.values(): self.toc.append(attrs)
        if 'data-claim-id' in attrs: self.claims.add(attrs['data-claim-id'])
        if 'data-reference-id' in attrs: self.references[attrs['data-reference-id']] = attrs.get('data-reference-status')
        if 'data-nav-section' in attrs:
            self.sections.append(attrs['data-nav-section'])
            if attrs.get('data-active') == 'true': self.active_sections.append(attrs['data-nav-section'])
    def handle_endtag(self, tag):
        if tag in ('script', 'style'): self.skip = max(0, self.skip - 1)
        if tag == 'nav' and self.navs: self.navs.pop()
        if tag == 'h1': self.in_h1 = False
    def handle_data(self, data):
        if not self.skip: self.text.append(data)
        if self.in_h1: self.h1.append(data)

def read_json(path): return json.loads(path.read_text())
def sha(data): return hashlib.sha256(data).hexdigest()
def normalized(text): return re.sub(r'\s+', ' ', text).strip()
def now(): return datetime.datetime.now(datetime.timezone.utc).isoformat()
def git(workspace, *args):
    return subprocess.check_output(['git', '-C', str(workspace), *args], text=True)
def localized(locale, route): return '/' + locale + (route if route != '/' else '')

def load_nav(site):
    # Execute the existing TypeScript data module with its compiler. No source writes.
    js = r'''
const fs = require('fs'), path = require('path'), Module = require('module');
const site = process.argv[1], file = path.join(site, 'lib/navigation.ts');
const ts = require(path.join(site, 'node_modules/typescript'));
const m = new Module(file); m.paths = Module._nodeModulePaths(path.dirname(file));
m.require = function(id) {
  if (id === './referenceIndex') return {REFERENCE_TOTAL: JSON.parse(fs.readFileSync(path.join(site, 'public/data/references_full.json'))).references.length};
  return Module.prototype.require.call(this, id);
};
m._compile(ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,file);
process.stdout.write(JSON.stringify({sections:m.exports.NAV_ROUTES,about:m.exports.ABOUT_ROUTES}));
'''
    return json.loads(subprocess.check_output(['node', '-e', js, str(site)], text=True))

def route_from_source(filename):
    prefix = 'website/app/[locale]'
    if not filename.startswith(prefix + '/') or not filename.endswith('/page.tsx'): return None
    route = filename[len(prefix):-len('/page.tsx')]
    return route if '[' not in route and '(' not in route else None

def main():
    arg = argparse.ArgumentParser(description=__doc__)
    arg.add_argument('--workspace', type=Path, required=True)
    arg.add_argument('--base-url', default='http://localhost:3004')
    arg.add_argument('--report', type=Path)
    arg.add_argument('--deployment-id')
    arg.add_argument('--expected-references', type=int, default=1191)
    arg.add_argument('--concurrency', type=int, choices=range(1, 7), default=6)
    arg.add_argument('--preflight-only', action='store_true')
    args = arg.parse_args()
    workspace = args.workspace.resolve(); site = workspace / 'website'; origin = args.base_url.rstrip('/')
    if urlsplit(origin).scheme not in ('http', 'https') or urlsplit(origin).path:
        arg.error('--base-url must be an HTTP(S) origin without a path')
    if not args.preflight_only and not args.report: arg.error('--report is required for an HTTP audit')
    if args.report and args.report.name == 'FUNCTIONAL_PRODUCTION_CHECKS_2026-09-08.json':
        arg.error('The initial production FAIL audit is immutable; choose a repair report filename')
    if args.report and args.report.exists(): arg.error('Refusing to overwrite an earlier report; choose a fresh filename')
    start = time.monotonic(); started_at = now(); failures = []; cache = {}; failure_counts = Counter()
    def fail(kind, **fields):
        issue = {'kind': kind, **fields}; failures.append(issue); failure_counts[kind] += 1
        if failure_counts[kind] <= 5: print('FAIL', json.dumps(issue, ensure_ascii=False), flush=True)

    nav = load_nav(site); nav_targets = {''}
    for section in nav['sections']:
        nav_targets.update(route['href'] for route in [section, *section.get('children', [])])
    fixtures = {}
    for filename in ['navigation-before-levels.json', 'navigation-main-2026-09-08.json']:
        fixture = read_json(site / 'lib/__tests__/fixtures' / filename)
        missing = sorted(set(fixture['hrefs']) - nav_targets)
        fixtures[filename] = {'count': len(fixture['hrefs']), 'hrefs': fixture['hrefs'], 'missingDestinations': missing, 'revision': fixture.get('revision')}
        if missing: fail('lost_navigation_destination', fixture=filename, values=missing)
    if [section['href'] for section in nav['sections']] != SECTIONS: fail('source_navigation_order')
    main_revision = fixtures['navigation-main-2026-09-08.json']['revision']
    main_navigation_sha = sha(git(workspace, 'show', main_revision + ':website/lib/navigation.ts').encode())
    expected_main_navigation_sha = read_json(site / 'lib/__tests__/fixtures/navigation-main-2026-09-08.json')['navigationSourceSha256']
    if main_navigation_sha != expected_main_navigation_sha: fail('historical_navigation_fixture_revision', expected=expected_main_navigation_sha, actual=main_navigation_sha)
    main_files = [f for f in git(workspace, 'ls-tree', '-r', '--name-only', main_revision, 'website/app').splitlines() if f.endswith('/page.tsx')]
    missing_files = [f for f in main_files if not (workspace / f).exists()]
    if missing_files: fail('lost_main_page_source', files=missing_files)
    main_routes = sorted({route for file in main_files if (route := route_from_source(file)) is not None})
    current_files = [str(file.relative_to(workspace)) for file in (site / 'app').rglob('page.tsx')]
    current_routes = sorted({route for file in current_files if (route := route_from_source(file)) is not None})
    reference_data = read_json(site / 'public/data/references_full.json'); reference_list = reference_data['references']
    references = {ref['id']: ref for ref in reference_list}; reference_ids = set(references)
    ref_index = read_json(site / 'lib/referenceIndex.json'); alias_map = ref_index.get('aliases', {})
    aliases = set(alias_map); allowed_refs = reference_ids | aliases
    if len(reference_list) != len(reference_ids): fail('duplicate_reference_ids')
    if len(reference_ids) != args.expected_references: fail('reference_count', expected=args.expected_references, actual=len(reference_ids))
    index_ids = set(ref_index['references'])
    if reference_ids != index_ids: fail('reference_index_mismatch', missing=sorted(reference_ids-index_ids), extra=sorted(index_ids-reference_ids))
    claims = {claim['id'] for claim in read_json(site / 'data/claims.json')['claims']}
    prior_refs = {ref['id'] for ref in json.loads(git(workspace, 'show', main_revision + ':website/public/data/references_full.json'))['references']}
    prior_claims = {claim['id'] for claim in json.loads(git(workspace, 'show', main_revision + ':website/data/claims.json'))['claims']}
    if prior_refs - reference_ids: fail('lost_main_reference_ids', values=sorted(prior_refs-reference_ids))
    if prior_claims - claims: fail('lost_main_claim_ids', values=sorted(prior_claims-claims))
    public_files = sorted(set((site / 'public/data').rglob('*.json')) | set((site / 'public/data').glob('*.csv')))
    downloads = {'/' + str(file.relative_to(site / 'public')): {'localFile': str(file), 'bytes': file.stat().st_size, 'sha256': sha(file.read_bytes())} for file in public_files}
    preflight = {'gitHead': git(workspace, 'rev-parse', 'HEAD').strip(), 'workspace': str(workspace), 'currentNavigationTargets': sorted(nav_targets), 'navigationFixtures': fixtures,
        'preservedMainRevision': main_revision, 'preservedMainNavigationSourceSha256': main_navigation_sha, 'preservedMainPageSourceCount': len(main_files), 'missingMainPageSources': missing_files, 'preservedStaticMainRoutes': main_routes,
        'currentPageSourceCount': len(current_files), 'currentStaticRoutes': current_routes, 'referenceCount': len(reference_ids), 'referenceIndexCount': len(index_ids),
        'priorMainReferenceCount': len(prior_refs), 'missingMainReferenceIds': sorted(prior_refs-reference_ids), 'claimCount': len(claims), 'priorMainClaimCount': len(prior_claims),
        'missingMainClaimIds': sorted(prior_claims-claims), 'publicDownloads': downloads}
    if args.preflight_only:
        print(json.dumps({'result': 'pass' if not failures else 'fail', 'preflight': preflight, 'failures': failures}, ensure_ascii=False, indent=2)); return int(bool(failures))
    build_root = site / '.next/server/app'
    if not (site / '.next/BUILD_ID').exists(): arg.error('A completed production build is required before the HTTP audit')
    build_id = (site / '.next/BUILD_ID').read_text().strip(); build_pages = {}
    for file in sorted(build_root.rglob('*.html')):
        route = '/' + str(file.relative_to(build_root))[:-len('.html')]
        if not re.match(r'^/(en|fi|ja|fr|ko)(?:/|$)', route): continue
        page = Page(); page.feed(file.read_text(errors='replace')); build_pages[route] = page
    source_hub_anchors = {}
    for route in HUBS:
        source = (site / 'app/[locale]' / route.lstrip('/') / 'page.tsx').read_text()
        source_hub_anchors[route] = set(re.findall(r'\bid:\s*"([^"]+)"', source)) | set(re.findall(r'\bid="([^"]+)"', source))
    hub_paths = [localized(locale, route) for locale in LOCALES for route in HUBS]
    for route in hub_paths:
        if route not in build_pages: fail('hub_not_in_local_build', path=route)
    static_paths = [localized(locale, route) for locale in LOCALES for route in current_routes]
    fixture_targets = [localized(locale, href) for locale in LOCALES for href in nav_targets]
    reference_paths = ['/fi/references/' + quote(ref_id, safe='') for ref_id in sorted(reference_ids)]
    initial_paths = set(static_paths) | set(build_pages) | set(reference_paths) | set(downloads) | {urlsplit(path).path for path in fixture_targets}

    def internal(href, source):
        if not href or href.startswith(('mailto:', 'tel:', 'javascript:', 'data:')): return None
        url = urlsplit(urljoin(origin + source, href))
        if url.hostname not in (urlsplit(origin).hostname, 'extinctionfield.com', 'www.extinctionfield.com'): return None
        return (url.path or '/') + ('?' + url.query if url.query else ''), unquote(url.fragment)
    def owner(path):
        path = re.sub(r'^/(en|fi|ja|fr|ko)(?=/|$)', '', urlsplit(path).path).rstrip('/') or '/'
        best = None; longest = -1
        for section in nav['sections']:
            for route in [section, *section.get('children', [])]:
                candidate = route['href'].rstrip('/') or '/'
                if '#' in candidate or '?' in candidate: continue
                if (path == candidate or path.startswith(candidate + '/')) and len(candidate) > longest:
                    best = section['href']; longest = len(candidate)
        return [] if best is None else [best]
    def fetch(path):
        since = time.monotonic()
        with tempfile.TemporaryDirectory(prefix='berm-final-http-') as directory:
            body_file = Path(directory) / 'body'; header_file = Path(directory) / 'headers'
            process = subprocess.run(['curl', '--silent', '--show-error', '--compressed', '--location', '--max-time', '75', '--header', 'Cache-Control: no-cache', '--dump-header', str(header_file), '--output', str(body_file), '--write-out', '%{http_code}\n%{url_effective}\n%{content_type}\n', origin + path], capture_output=True, text=True)
            fields = process.stdout.strip().splitlines(); body = body_file.read_bytes() if body_file.exists() else b''
            headers = header_file.read_text(errors='replace') if header_file.exists() else ''
            record = {'status': int(fields[0]) if fields and fields[0].isdigit() else None, 'finalUrl': fields[1] if len(fields) > 1 else None,
                'contentType': fields[2] if len(fields) > 2 else None, 'bytes': len(body), 'seconds': round(time.monotonic()-since, 3), 'curlExit': process.returncode,
                'redirectStatusChain': re.findall(r'(?m)^HTTP/\S+ (\d+)', headers),
                'cacheHeaders': {k.lower(): v for k,v in re.findall(r'(?im)^(x-vercel-(?:cache|id)|x-nextjs-cache|content-encoding):\s*([^\r\n]+)', headers)}}
            if process.stderr.strip(): record['stderr'] = process.stderr.strip()
            page = None
            if record['contentType'] and 'html' in record['contentType']:
                page = Page(); page.feed(body.decode('utf-8', errors='replace'))
            if path in downloads:
                expected = downloads[path]
                record.update({'expectedSha256': expected['sha256'], 'actualSha256': sha(body), 'sha256Matches': expected['sha256'] == sha(body), 'localFile': expected['localFile'], 'localBytes': expected['bytes']})
                if path.endswith('.json'):
                    try:
                        parsed = json.loads(body); record['validJson'] = True
                        if path == '/data/references_full.json':
                            served_ids = [ref['id'] for ref in parsed['references']]
                            record.update({'referenceCount': len(served_ids), 'uniqueReferenceCount': len(set(served_ids)), 'referenceIdsMatch': set(served_ids) == reference_ids})
                    except (ValueError, KeyError, TypeError): record['validJson'] = False
            return path, record, page
    def batch(paths, label):
        todo = sorted(set(paths)-set(cache)); done = 0
        with ThreadPoolExecutor(max_workers=args.concurrency) as pool:
            for future in as_completed([pool.submit(fetch, path) for path in todo]):
                path, record, page = future.result(); cache[path] = (record, page); done += 1
                if record['status'] != 200 or record['curlExit'] != 0: fail('http', path=path, **record)
                if path in downloads:
                    if not record['sha256Matches']: fail('download_sha256', path=path, **record)
                    if record.get('validJson') is False: fail('download_invalid_json', path=path)
                    if record.get('referenceIdsMatch') is False: fail('served_reference_registry_ids', path=path)
                if done % 50 == 0: print('PROGRESS', label, done, '/', len(todo), 'total', len(cache), 'seconds', round(time.monotonic()-start, 1), 'issues', len(failures), flush=True)
        print('BATCH', label, len(todo), 'new requests; total', len(cache), 'seconds', round(time.monotonic()-start, 1), flush=True)
    batch(initial_paths, 'all_current_pages_and_FI_references')
    links = []; skipped_reference_links = 0
    # All hub links. On other pages, all routes/anchors and FI references; translated
    # reference detail pages are requested when a hub links to them. This covers all
    # 1191 unique records without requesting five equivalent detail translations.
    for source, (record, page) in sorted(cache.items()):
        if page is None: continue
        for href in sorted(page.hrefs if source in hub_paths else page.body_hrefs):
            target = internal(href, source)
            if target is None: continue
            if re.match(r'^/(en|ja|fr|ko)/references/[^/]+$', urlsplit(target[0]).path) and source not in hub_paths and not target[1]:
                skipped_reference_links += 1; continue
            links.append({'source': source, 'href': href, 'targetPath': target[0], 'fragment': target[1]})
    for href in fixture_targets:
        url = urlsplit(href); links.append({'source': 'current-and-preserved-navigation', 'href': href, 'targetPath': url.path, 'fragment': unquote(url.fragment)})
    batch([link['targetPath'] for link in links], 'internal_links')
    # Include usage/backlinks exposed by newly encountered translated hub reference pages.
    extra_links = []
    for source, (_, page) in sorted(cache.items()):
        if page is None or source in initial_paths: continue
        for href in sorted(page.hrefs if source in hub_paths else page.body_hrefs):
            target = internal(href, source)
            if target is None: continue
            if re.match(r'^/(en|ja|fr|ko)/references/[^/]+$', urlsplit(target[0]).path) and not target[1]: continue
            extra_links.append({'source': source, 'href': href, 'targetPath': target[0], 'fragment': target[1]})
    links.extend(extra_links)
    batch([link['targetPath'] for link in extra_links], 'encountered_reference_backlinks')
    for link in links:
        record, page = cache[link['targetPath']]
        if record['status'] == 200 and record['curlExit'] == 0 and link['fragment'] and (page is None or link['fragment'] not in page.ids):
            fail('missing_anchor', **link, finalUrl=record['finalUrl'])
    page_checks = []; hub_checks = []; about_checks = []; toc_checks = []; reference_checks = []
    for path, (record, page) in sorted(cache.items()):
        if page is None: continue
        visible = normalized(' '.join(page.text)); final_path = urlsplit(record['finalUrl'] or path).path.rstrip('/')
        check = {'path': path, 'status': record['status'], 'h1': normalized(' '.join(page.h1)), 'navSections': page.sections, 'activeNavSections': page.active_sections,
            'claimIds': sorted(page.claims), 'referenceIds': sorted(page.references), 'unknownClaimIds': sorted(page.claims-claims),
            'unknownReferenceIds': sorted(set(page.references)-allowed_refs), 'unknownReferenceStatuses': {k:v for k,v in page.references.items() if v == 'unknown'},
            'rawReferenceTokens': sorted(set(re.findall(r'\[\[ref:[^\]]*\]\]', visible)))}
        page_checks.append(check)
        if page.sections != SECTIONS: fail('nav_sections', path=path, expected=SECTIONS, actual=page.sections)
        locale_match = re.match(r'^/(en|fi|ja|fr|ko)(?:/|$)', final_path)
        if locale_match:
            missing_nav_links = {localized(locale_match.group(1), href) for href in nav_targets} - page.primary_nav_hrefs
            if missing_nav_links: fail('missing_primary_nav_links', path=path, values=sorted(missing_nav_links))
        expected_owner = owner(final_path)
        if page.active_sections != expected_owner: fail('active_nav_section', path=path, finalPath=final_path, expected=expected_owner, actual=page.active_sections)
        for key in ('unknownClaimIds', 'unknownReferenceIds', 'unknownReferenceStatuses', 'rawReferenceTokens'):
            if check[key]: fail(key, path=path, values=check[key])
        if path in hub_paths:
            locale = path.split('/')[1]; route = path[len(locale)+1:]; expected = build_pages.get(path)
            entry = {'path': path, 'expectedAnchorIds': sorted(source_hub_anchors[route]), 'missingAnchorIds': sorted(source_hub_anchors[route]-page.ids),
                'missingBuiltClaimIds': sorted(expected.claims-page.claims) if expected else [], 'missingBuiltReferenceIds': sorted(set(expected.references)-set(page.references)) if expected else [],
                'h1MatchesBuild': expected is not None and normalized(' '.join(expected.h1)) == check['h1'], 'internalLinks': sum(link['source'] == path for link in links)}
            hub_checks.append(entry)
            for key in ('missingAnchorIds', 'missingBuiltClaimIds', 'missingBuiltReferenceIds'):
                if entry[key]: fail(key, path=path, values=entry[key])
            if not entry['h1MatchesBuild']: fail('hub_title_mismatch', path=path)
        if re.match(r'^/(en|fi|ja|fr|ko)/(about(?:/(?:history|replication|measurement|objections))?|epistemology)$', final_path):
            locale = final_path.split('/')[1]
            actual_tabs = [a.get('href') for a in page.about]; expected_tabs = [localized(locale, r['href']) for r in nav['about']]
            current = [a.get('href') for a in page.about if a.get('aria-current') == 'page']
            entry = {'path': path, 'finalPath': final_path, 'tabDestinations': actual_tabs, 'currentTabs': current, 'passed': actual_tabs == expected_tabs and current == [final_path]}
            about_checks.append(entry)
            if not entry['passed']: fail('about_tabs', **entry)
        if re.match(r'^/(en|fi|ja|fr|ko)/model$', path):
            locale = path.split('/')[1]; toc_hrefs = [a['href'] for a in page.toc]
            for topic, route in REPAIRED_TOC.items():
                expected = localized(locale, route); target_path, fragment = internal(expected, path); target_page = cache[target_path][1]
                entry = {'path': path, 'topic': topic, 'destination': expected, 'presentInToc': expected in toc_hrefs, 'targetAnchorPresent': target_page is not None and fragment in target_page.ids}
                toc_checks.append(entry)
                if not entry['presentInToc'] or not entry['targetAnchorPresent']: fail('repaired_model_toc', **entry)
        match = re.match(r'^/(en|fi|ja|fr|ko)/references/([^/]+)$', final_path)
        if match:
            ref_id = unquote(match.group(2)); ref = references.get(ref_id)
            entry = {'path': path, 'canonicalId': ref_id, 'registered': ref is not None, 'identifierVisible': ref_id in visible,
                'titleMatches': ref is not None and check['h1'] == normalized(ref.get('title') or ref_id)}
            reference_checks.append(entry)
            if not all(entry[k] for k in ('registered', 'identifierVisible', 'titleMatches')): fail('reference_detail_integrity', **entry)
    redirect_checks = []
    for locale in LOCALES:
        path = localized(locale, '/mathematics'); record, page = cache[path]; expected = localized(locale, '/model/math')
        entry = {'requestedPath': path, 'expectedFinalPath': expected, 'actualFinalPath': urlsplit(record['finalUrl']).path,
            'redirectStatusChain': record['redirectStatusChain'], 'falsificationAnchorPresent': page is not None and 'falsification' in page.ids}
        redirect_checks.append(entry)
        if entry['actualFinalPath'] != expected or '308' not in record['redirectStatusChain'] or not entry['falsificationAnchorPresent']: fail('mathematics_redirect', **entry)
    result = 'pass' if not failures else 'attention_required'
    summary = {'hubPages': len(hub_checks), 'preservedMainSourcePages': len(main_files), 'currentStaticRoutesAcrossLocales': len(static_paths), 'builtHtmlRoutes': len(build_pages),
        'legacyNavigationTargets': len(fixtures['navigation-before-levels.json']['hrefs']), 'mainNavigationTargets': len(fixtures['navigation-main-2026-09-08.json']['hrefs']),
        'currentNavigationTargets': len(nav_targets), 'localizedNavigationChecks': len(fixture_targets), 'uniqueHttpTargets': len(cache), 'htmlPages': len(page_checks),
        'internalLinkChecks': len(links), 'fragmentChecks': sum(bool(link['fragment']) for link in links), 'aboutPageChecks': len(about_checks), 'repairedTocChecks': len(toc_checks),
        'referenceDetailChecks': len(reference_checks), 'uniqueReferenceRecords': len({entry['canonicalId'] for entry in reference_checks}), 'referenceRegistryCount': len(reference_ids),
        'publicDownloadChecks': len(downloads), 'mathematicsRedirectChecks': len(redirect_checks), 'failuresByKind': dict(failure_counts), 'elapsedSeconds': round(time.monotonic()-start, 2)}
    report = {'title': 'Fresh BERM repair functional HTTP/HTML audit', 'date': started_at[:10], 'startedAt': started_at, 'completedAt': now(), 'origin': origin, 'deploymentId': args.deployment_id,
        'localBuildId': build_id, 'auditScriptSha256': sha(Path(__file__).read_bytes()), 'archivedAuditScript': 'docs/audit/tools/navigation_repair_http_check_2026_09_08.py', 'result': result, 'summary': summary, 'failures': failures, 'preflight': preflight,
        'method': {'freshRequests': True, 'sourceOfExpectations': 'Current repair worktree, current completed production HTML build, and independent historical navigation fixtures. No earlier pass/fail results are reused.',
            'client': 'curl --compressed --location, normal TLS validation, Cache-Control: no-cache, Python HTMLParser', 'parallelRequests': args.concurrency, 'timeoutSeconds': 75,
            'scope': 'All current static page routes in five locales, every built localized HTML route, 20 explanation hubs and all their internal links, all 1191 canonical FI reference detail pages and translated reference pages linked by hubs, internal page links and fragments, old and newer main navigation preservation, seven groups/ownership, AboutTabs, 13 repaired model topics in five locales, mathematics redirects, all public JSON and CSV hashes.',
            'limits': 'Read-only HTTP and server-rendered HTML checks; interactive browser QA is separate. External research URLs are not fetched. Reference detail localization is exhaustively checked for FI and for other locales reached through hubs; equivalent non-FI links outside hubs are counted but omitted to bound requests.',
            'omittedEquivalentNonFiReferenceLinks': skipped_reference_links, 'repeatedHeaderLinks': 'The complete current navigation target set is verified on each HTML page. Link destinations are requested once per URL; repeated header copies outside hubs are covered by this invariant and the localized navigation target checks.'},
        'hubChecks': hub_checks, 'aboutChecks': about_checks, 'tocChecks': toc_checks, 'referenceDetailChecks': reference_checks, 'mathematicsRedirectChecks': redirect_checks,
        'pageChecks': page_checks, 'testedRoutes': [{'path': path, **record} for path, (record, _) in sorted(cache.items())], 'testedLinks': links}
    output = args.report.resolve(); output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    md = output.with_suffix('.md')
    md.write_text(f"# BERMin korjatun sivuston toimintavarmennus {started_at[:10]}\n\nTulos: **{result}**. Kohde: {origin}. Tarkistus alkoi {started_at}; päättyi {report['completedAt']}.\n\n"
        + f"Tarkistettu {summary['uniqueHttpTargets']} HTTP-kohdetta, {summary['hubPages']} uutta hubia, {summary['htmlPages']} HTML-sivua, {summary['fragmentChecks']} ankkurilinkkiä ja {summary['repairedTocChecks']} korjattua sisällysluettelokohdetta. "
        + f"Lähderekisterissä on {len(reference_ids)} yksilöllistä tunnistetta; {summary['referenceDetailChecks']} lähdetietosivua kattaa {summary['uniqueReferenceRecords']} yksilöllistä lähdettä. {len(downloads)} julkisen JSON/CSV-tiedoston SHA-256 on verrattu nykyiseen korjaustyöpuuhun.\n\n"
        + f"Molemmat navigaatiohistoriat ({len(fixtures['navigation-before-levels.json']['hrefs'])} vanhaa ja {len(fixtures['navigation-main-2026-09-08.json']['hrefs'])} nyky-mainin kohdetta) sekä {len(main_files)} mainin sivutiedostoa tarkistettiin säilyviksi. Seitsemän pääryhmää, aktiivinen ryhmä ja Tietoa-välilehdet tarkistettiin palvellusta HTML:stä.\n\n"
        + (f"Poikkeamat: {json.dumps(dict(failure_counts), ensure_ascii=False)}. Tarkat havainnot ovat JSON-raportissa.\n\n" if failures else "HTTP-, ankkuri-, navigaatio-, lähde- tai tiedostohajautusvirheitä ei havaittu.\n\n")
        + "Tämä on uusi tarkistusajo. Alkuperäistä 8.9. epäonnistuneen julkaisun auditointia ei muutettu. Palvelimen HTML-tarkistus täydentää erillistä selaintestausta; ulkoisia tutkimusjulkaisujen osoitteita ei haettu.\n\n"
        + "Toistettava tarkistus: [arkistoitu tarkistusskripti](tools/navigation_repair_http_check_2026_09_08.py). Aja komento arkiston juuresta valmiin tuotantobuildin ja käynnistetyn palvelimen päällä. Valitse uusi raporttitiedosto: aiempien raporttien ylikirjoitus on estetty. Pelkkä --preflight-only tekee lähdevertailun ilman HTTP-pyyntöjä.\n\n"
        + "```bash\npython3 docs/audit/tools/navigation_repair_http_check_2026_09_08.py \\\n  --workspace /polku/korjaustyopuuhun \\\n  --base-url " + origin + " \\\n  --report /polku/uuteen-tarkistusraporttiin.json\n```\n")
    print(json.dumps({'result': result, 'report': str(output), 'summary': summary}, ensure_ascii=False, indent=2), flush=True)
    return int(bool(failures))

if __name__ == '__main__': raise SystemExit(main())
