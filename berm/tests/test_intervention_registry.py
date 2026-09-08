"""Scientific provenance and source-to-website contracts for interventions."""
import copy
import json
from pathlib import Path

import pytest

from berm.modulome.cards import MECHANISM_CARDS
from export_intervention_profiles import OUTPUTS, load_profiles, validate_profiles

ROOT = Path(__file__).resolve().parents[2]


@pytest.fixture(scope='module')
def registry():
    return load_profiles()


def test_download_and_python_registry_are_exact_mirrors(registry):
    for path in OUTPUTS:
        assert json.loads(path.read_text()) == registry


def test_all_requested_mechanisms_are_linked_from_existing_cards(registry):
    ids = {p['id'] for p in registry['profiles']}
    assert ids == {
        'mt2_brake', 'local_ltype_erk', 'channel_selectivity',
        'lipid_ttype_inhibition', 'channel_density_store_history',
        'cry_fad_competition', 'drug_photochemistry', 'coq10_response', 'mcu_receiver_state',
    }
    linked = {p for card in MECHANISM_CARDS for p in card.intervention_profile_ids}
    assert linked == ids


def test_sources_claims_and_atlas_bindings_resolve(registry):
    refs = json.loads((ROOT/'website/public/data/references_full.json').read_text())
    ref_ids = {r['id'] for r in refs['references']}
    data = json.loads((ROOT/'website/data/claims.json').read_text())
    claims = {c['id']:c for c in data['claims']}
    graph = json.loads((ROOT/'website/data/causal-graph.json').read_text())
    bindings = json.loads((ROOT/'website/data/atlas-claim-bindings.json').read_text())
    for p in registry['profiles']:
        assert set(p['referenceIds']) <= ref_ids, p['id']
        assert set(p['claimIds']) <= claims.keys(), p['id']
        bound = {c for n in p['atlasNodeIds'] for c in bindings['nodes'].get(n, [])}
        assert set(p['claimIds']) <= bound, p['id']
        for cid in p['claimIds']:
            assert claims[cid]['target']['nodeId'] in graph['nodes']


def test_predictions_depend_on_bridge_and_components_but_do_not_validate_bridge(registry):
    data = json.loads((ROOT/'website/data/claims.json').read_text())
    claims = {c['id']:c for c in data['claims']}
    assessments = {a['claimId']:a for a in data['epistemic_assessments']}
    for p in registry['profiles']:
        if p['id'] == 'mcu_receiver_state':
            # Measured component plus conditional synthesis, without a new forecast.
            assert p['claimIds'] == ['claim.synergy.state-conditioned-coexposure']
            interpretation = claims[p['claimIds'][0]]
            assert interpretation['kind'] == 'model_derived'
            assert set(interpretation['depends_on']) == {
                'claim.bridge.conditional-response-operator',
                'claim.synthesis.protocol-state-heterogeneity',
            }
            assert assessments[interpretation['id']]['origin'] == 'emergent'
            assert assessments[interpretation['id']]['level'] == 'L*'
            assert p['studies'] == [{
                **p['studies'][0],
                'id': 'study.sun2023_ru360_rf_damage',
                'referenceId': 'sun2023_ru360_rf_damage',
                'fieldTested': True,
                'sourceCoverage': 'abstract',
            }]
            continue
        components = {c for c in p['claimIds'] if claims[c]['kind'] != 'prediction'}
        predictions = [claims[c] for c in p['claimIds'] if claims[c]['kind'] == 'prediction']
        assert len(predictions) == 1
        prediction = predictions[0]
        assert set(prediction['depends_on']) == {'claim.bridge.conditional-response-operator', *components}
        assert assessments[prediction['id']]['origin'] == 'emergent'
        assert assessments[prediction['id']]['level'] == 'L*'
        for cid in components:
            assert assessments[cid]['origin'] == 'imported'
    for relation in data['evidence_relations']:
        if relation['id'].startswith('er.pharmacology.'):
            assert relation['claimId'].startswith('claim.pharmacology.')
            assert relation['calibrationRole'] != 'calibration'
            assert relation['provenance']['status'] == 'partial'
            assert relation['provenance']['datasetFamilyIds'] == []


def test_nonfield_components_are_not_relabelled_as_field_experiments(registry):
    by = {p['id']:p for p in registry['profiles']}
    for id in ('local_ltype_erk', 'cry_fad_competition', 'drug_photochemistry'):
        assert not any(s['fieldTested'] for s in by[id]['studies'])
    mt = by['mt2_brake']['studies']
    assert mt[0]['fieldTested'] and not mt[1]['fieldTested']
    assert {s['referenceId'] for s in by['channel_density_store_history']['studies']} == {
        'grassi2004_channels', 'bertagna2022_serca',
    }
    assert 'GSM' in by['coq10_response']['protocol']['field']['en']
    assert '5G' not in by['coq10_response']['protocol']['field']['en']


@pytest.mark.parametrize('mutation', [
    lambda d: d['profiles'][0]['studies'][0].update(fieldTested=None),
    lambda d: d['profiles'][0]['contrast']['arms'].update(sham=0),
    lambda d: d['profiles'][0].update(referenceIds=['unrelated-source']),
    lambda d: d['profiles'][0].update(modelStatus='CALIBRATED'),
    lambda d: d['derivation'].update(openBridges=[]),
    lambda d: d['profiles'].append(copy.deepcopy(d['profiles'][0])),
])
def test_invalid_provenance_or_invented_quantification_is_rejected(registry, mutation):
    payload = copy.deepcopy(registry)
    mutation(payload)
    with pytest.raises(ValueError):
        validate_profiles(payload)
