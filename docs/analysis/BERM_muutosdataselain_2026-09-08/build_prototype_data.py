"""Reproduce the small source-preserving data selection used by the UI study."""
from pathlib import Path
import csv
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[3]
OUT = Path(__file__).resolve().parent
VIS = Path('/Users/ottojuote/.codex/visualizations/2026/09/08/01a0802a-1adc-7781-a49e-86910846fadc/berm-muutosatlas.html')
rows = list(csv.DictReader((ROOT / 'website/public/data/global_panel.csv').open()))
sources = {
    'tfr': {'title': 'UN World Population Prospects 2024', 'url': 'https://population.un.org/wpp/', 'type': 'UN:n väestöestimaatti', 'unit': 'lasta / nainen', 'scope': 'Periodi-TFR; UN WPP 2024, ESTIMATE-vuodet. Ei kohortin lopullinen lapsiluku.'},
    'mobile': {'title': 'ITU / World Bank, IT.CEL.SETS.P2', 'url': 'https://data.worldbank.org/indicator/IT.CEL.SETS.P2', 'type': 'Teknologian levinneisyys', 'unit': 'liittymää / 100 as.', 'scope': 'Liittymien määrä suhteessa väestöön. Teknologian ajoitusmittari; ei käyttäjämäärä tai paikallinen kenttämittaus.'},
}
countries = {}
for iso, name in [('USA', 'Yhdysvallat'), ('FIN', 'Suomi'), ('GBR', 'Yhdistynyt kuningaskunta')]:
    selected = [r for r in rows if r['country_iso3'] == iso and 1980 <= int(r['year']) <= 2023]
    assert len(selected) == 44
    assert all(r['tfr_source'] == 'UN_WPP_2024_TFR' and r['tfr_series_status'] == 'ESTIMATE' for r in selected)
    countries[iso] = {'name': name, 'series': []}
    for field, sid, label in [('mobile_per_100', 'mobile', 'Mobiililiittymät'), ('tfr', 'tfr', 'Kokonaishedelmällisyys')]:
        points = [{'year': int(r['year']), 'value': float(r[field]), 'period': r['year']} for r in selected if r[field]]
        countries[iso]['series'].append({'id': sid, 'label': label, 'source': sources[sid], 'points': points, 'kind': 'annual', 'role': 'Teknologinen ympäristö' if sid == 'mobile' else 'Väestötason päätepiste'})

diabetes = json.loads((OUT / 'verified_us_diabetes_series.json').read_text())
d = diabetes['series'][0]
countries['USA']['series'].insert(1, {
    'id': 'diabetes', 'label': 'Diabeteksen yleisyys', 'kind': 'period', 'role': 'Metabolinen terveys',
    'source': {'title': 'CDC / NCHS, Data Brief 516, taulukko 5', 'url': diabetes['sources'][0]['url']+'#table5', 'type': 'Otantatutkimuksen estimaatti · 95 % LV', 'unit': '% aikuisista', 'scope': d['population']['fi']+'. '+d['standardization']['fi']+' Alkuperäiset tutkimusjaksot; janat ovat julkaistuja 95 prosentin luottamusvälejä.'},
    'points': [{**p, 'year': (p['startYear']+p['endYear'])/2} for p in d['points']],
})
butterflies = json.loads((OUT / 'ukbms_butterflies_1976_2024.json').read_text())
for i, s in enumerate(butterflies['series']):
    countries['GBR']['series'].insert(1+i, {
        'id': s['id'], 'label': s['speciesFinnish'].capitalize(), 'role': 'Sentinellilajin runsaus', 'kind': 'annual',
        'source': {'title': 'UKBMS / EIDC, collated indices 2024', 'url': butterflies['source']['url'], 'type': 'Seurantaan perustuva runsausestimaatti', 'unit': 'indeksi, 1976 = 100', 'scope': 'UK:n valtakunnallinen lajikohtainen seuranta. Indeksi = 100 × 10^(log10-arvo − vuoden 1976 log10-arvo). Epävarmuusvälejä ei annettu lähteessä. '+butterflies['source']['attribution']},
        'points': [{'year': p['year'], 'period': str(p['year']), 'value': p['relativeIndex1976'], 'nSites': p['nSites'], 'sourceCsvRow': p['sourceCsvRow']} for p in s['points'] if 1980 <= p['year'] <= 2023],
    })

hist = json.loads((ROOT / 'website/data/technology-history.json').read_text())
event_ids = {
    'USA': ['fcc-uwb-2002', 'loran-us-closure-2010', 'lighting-policy-us-2023'],
    'FIN': ['finland-2g-1991', 'finland-amr-2009-2013', 'finland-3g-closure'],
    'GBR': [],
}
titles = {'fcc-uwb-2002': 'UWB-laitteiden sääntely', 'loran-us-closure-2010': 'LORAN-C suljetaan', 'lighting-policy-us-2023': 'Lamppujen vaatimukset', 'finland-2g-1991': '2G-palvelu alkaa', 'finland-amr-2009-2013': 'AMR-asennusaalto', 'finland-3g-closure': '3G-verkkoja suljetaan'}
for iso in countries:
    countries[iso]['events'] = []
    for e in hist['events']:
        if e['id'] in event_ids[iso]:
            source = next(s for s in hist['sources'] if s['id'] == e['sourceIds'][0])
            countries[iso]['events'].append({'id': e['id'], 'year': e['startYear'], 'endYear': e.get('endYear'), 'label': titles[e['id']], 'title': e['title']['fi'], 'detail': e['description']['fi'], 'url': source['url']})

files = ['website/public/data/global_panel.csv', 'website/data/technology-history.json']
data = {'edition': '2026-09-08', 'countries': countries, 'lineage': [{'path': f, 'sha256': hashlib.sha256((ROOT/f).read_bytes()).hexdigest()} for f in files]}
encoded = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
(OUT / 'prototype_data.json').write_text(json.dumps(data, ensure_ascii=False, indent=2)+'\n')
if VIS.exists():
    text = VIS.read_text()
    pattern = r'(<script type="application/json" id="berm-atlas-data">)[\s\S]*?(</script>)'
    assert len(re.findall(pattern, text)) == 1
    text = re.sub(pattern, lambda m: m[1]+encoded.replace('<', '\\u003c')+m[2], text)
    VIS.write_text(text)
print(f"Verified prototype: {len(countries)} regions, {sum(len(c['series']) for c in countries.values())} series, {sum(len(s['points']) for c in countries.values() for s in c['series'])} source points")
