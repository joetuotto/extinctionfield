# Näyttörekisterit: kolme rekisteriä, yksi liitosavain

**Versio:** 2026-09-03
**Tila:** Nykytilan kuvaus ja migraatiopolku. Ei CODELLE-ohje; luvut ovat kirjoitushetken lukuja.

## 1. Kolme rekisteriä

| # | Tiedosto | Tietueita | Kiinnityskohde | Tarkoitus |
|---|---|---|---|---|
| A | `website/lib/evidence.ts` → `FIELDSTATE_EVIDENCE` | 34 | `causalNodes[]` → `website/data/causal-graph.json` (36 solmua) | Rajatut tutkimus→solmu-tietueet FieldState v2 -mittausmäärittelyn skeemalla. Sivun `/evidence` "bounded records". |
| B | `website/lib/legacyEvidence.json` → `LEGACY_EVIDENCE_CATALOGUE` | 150 | `pathway`-kirjain + `causalNodes[]` (94 tietueella; 56 tyhjää) | Aiempi A–F-polkubibliografia lähdetason tarkistusta varten. Sivun `/evidence` "extended catalogue". |
| C | `website/data/claims.json` → `evidence_relations[]` | 56 | `claimId` → `claims[]` (28 väitettä, kaikki `draft`, kaikki solmukohteita; väite voi kiinnittyä myös kaareen tai reittiin) | Kuratoitu Reference × Claim -liitostaulu. Ainoa rekisteri, jonka `npm run registry:validate` tarkistaa. |

**Liitosavain** kaikissa kolmessa: `referenceId` → `website/public/data/references_full.json` (`references[].id`; `aliases[]` kelpaa A:ssa ja B:ssä, C:ssä vain kanoninen id). `scripts/validate-references.mjs` tarkistaa A:n ja B:n, `scripts/validate-registry.mjs` C:n.

**Päällekkäisyys** `referenceId`-tasolla (kanoniseksi ratkaistuna): A∩B = 3 (`sherrard2018`, `chae2019`, `yu2019_btb`), A∩C = 30 (A:n 34 tietueesta relaatio puuttuu neljältä: `SHERRARD_2018_CRY_ROS`, `ESHRE_2021_CATSPER_RF`, `DE_IULIIS_2009_HUMAN_SPERM`, `CORDELLI_2025_CORRIGENDUM`), B∩C = 4 (`pall2013_v2`, `chae2019`, `adams2014`, `yu2019_btb`), A∩B∩C = 2 (`chae2019`, `yu2019_btb`). C:n relaatiot: `supports` 53, `contextualizes` 3.

### Skeemat

**A — `FieldStateEvidenceRecord`** (`lib/evidence.ts`): `id, referenceId, citation, year, studyType, system, fieldClass, finding, causalNodes[], directness, scope, calibrationRole, limitations[], isTfrCoefficient: false`.
`directness` ∈ PHYSICS_SIGNATURE | MECHANISTIC_INTERMEDIATE | REPRODUCTIVE_ENDPOINT | ECOLOGICAL_ENDPOINT | SYSTEMATIC_REVIEW | POPULATION_DESCRIPTIVE; `calibrationRole` ∈ STRUCTURAL_ONLY | CONTEXT_ONLY.
Lähde: `berm/data/evidence/fieldstate_causal_evidence.json` (`registry_version: fieldstate-evidence-v1`, 33 tietuetta). Sivustoa ei generoida siitä: sivustolla ovat lisäksi `CHAE_2019_HUMAN_BLUE_LIGHT_ORIENTATION` ja `ESHRE_2021_CATSPER_RF`; berm-puolella on `NIKE_BBS_2026_PEAK_FIELD_GRADIENT`, jota sivustolla ei ole.

**B — `LegacyEvidenceRecord`**: `id, referenceId, citation, year, pathway, level, tags[], causalNodes[], evidenceRole, status, translationScope, n, note?`.
- `level` ∈ `EPISTEMIC_LEVELS` = L, L\*, M, C, M|C, E — sama sanasto kuin C:n `epistemic_assessments[].level`. Jakauma: E 53, M 39, M|C 32, C 17, L\* 9.
- `status` ∈ MIGRATION_CANDIDATE 57, CONTEXT_ONLY 38, OUTSIDE_ACTIVE_GRAPH 33, UNVERIFIED_CITATION 10, HISTORICAL_CONTEXT 9, VERIFIED 1, RETRACTED_2024 1, PREDICTION 1. Merkitykset: `berm/data/evidence/legacy_reference_migration_v1.json` → `status_definitions`. Lisäksi `STATUS_LABELS` tuntee arvon SUPERSEDED_BY_ACTIVE_RECORD (berm-manifestin sanasto) siirretyn tietueen lopputilaksi; sitä ei vielä käytetä B:ssä.
- `lib/evidence.ts` heittää moduulin latauksessa, jos `level` on sanaston ulkopuolella tai `status` ilman `STATUS_LABELS`-merkintää; `lib/__tests__/evidence-registry.test.ts` tarkistaa lisäksi `causalNodes`-id:t graafia vasten.
- `pathway`-kirjain on provenienssimerkintä, ei solmu-id (v2-dokumentin sääntö `legacy_pathway_label_rule`). Kirjain `M` (`orthogonal_layer_convergence`) puuttuu `PATHWAY_ORDER`ista (`lib/channelGroups.ts`), joten tietue ei renderöidy sivulla.
- Alkuperä: `legacy_reference_migration_v1.json` (134 tietuetta = jäädytetty 129 tietueen arkisto + 5 lisäystä). Sivuston 150 tietueesta 19 on lisätty vain sivustolla (mm. BERM-argumentit #200–#206, `yap2025_cry2_trpc1`, T-tyyppi/CACNA1C-tietueet); berm-manifestin kolme tietuetta (`ritz2004`, `zandieh2025`, `deiuliis2009`) ovat sivustolla A-tietueita. Synkronointiskriptiä ei ole kumpaankaan suuntaan; `berm/normalize_reference_registry.py` vain lukee B:stä bibliografiset kentät viiterekisteriin.
- Viisi B-tietuetta (`led_emf_component`, `weather_radar_insect_temporal`, `display_multiplication`, `satellite_predictive_test`, `orthogonal_layer_convergence`) on BERM:n omia argumentteja (`citation: "BERM argument #…"`), ei kirjallisuutta.

**C — `EvidenceRelation`** (`lib/claims/types.ts`): `id ("er.<domain>.<viite>"), referenceId, claimId, relation, directness, studyDesign, applicability, calibrationRole, limitations[], curatorId, curatedAt, curatorNote`.
`relation` ∈ supports | challenges | contextualizes | method; `calibrationRole` ∈ structural_only | context_only | calibration. Episteeminen taso ei ole relaatiossa vaan väitteen `epistemic_assessments[]`-tietueessa (`basis: ["er.…"]`).

## 2. Versionumerot

- **v17** = sivuston julkinen mallimäärittely ja lukittujen maakohtaisten ennusteiden lähde: `berm/berm/config.py` `LOCKED_PREDICTIONS` (`model_version` v17.0/v17.1, lukittu 2026-08-18). Skalaarimalli: kansallinen altistusskalaari → polkupainot → TFR.
- **v2** = `fieldstate-asfr-v2`, FieldState-mittausmäärittely ja tulkintakerros (`berm/docs/fieldstate-asfr-v2.md`). Rekisteri A on tämän määrittelyn näyttörekisteri. v2 ei tuota maakohtaisia ennusteita ilman ulkoisia syötteitä (`berm/berm/model_fieldstate_asfr.py`).
- Python-paketti on 0.20.x. Versiot ovat itsenäisiä julkaisusyklejä (`berm/berm/__init__.py`), eivät eri malleja. 0.20 lisää ehdollisen Lindgren–BERM-vasteoperaattorin ja androgeenien efektiivisen kapasiteetin hajotelman muuttamatta lukittuja v17-maaprediktioita.

## 3. Migraatiopolku B → C

Jokainen siirto on kuratoitu käsin (`website/AGENTS.md`: "relation is always curated — never inferred"). Tietuetta kohti:

1. **Väite.** Etsi tai lisää `claims[]`-väite (`claim.<domain>.<slug>`, lifecycle `draft`, statement en+fi, `falsification_condition`), jonka `target` on tietueen `causalNodes`-solmu tai sen kaari/reitti. Ilman väitettä ei ole relaatiota. 56 B-tietueella `causalNodes` on tyhjä → ei kohdetta → ei siirry.
2. **Viite.** `referenceId` sellaisenaan; jos B käyttää aliasta, vaihda kanoniseen id:hen (`references_full.json`).
3. **Relaatio** B:n `status`- ja `evidenceRole`-kentän mukaan:

| B `status` | C `relation` | C `calibrationRole` | Huomio |
|---|---|---|---|
| MIGRATION_CANDIDATE | `supports`, tai `challenges` jos löydös on negatiivinen | `structural_only` | Lähdetason protokollatarkistus ennen siirtoa. `evidenceRole: METHODOLOGICAL` → `method`. |
| VERIFIED | `supports` | `structural_only` | Lähde todennettu; väite puuttuu. |
| CONTEXT_ONLY | `contextualizes` | `context_only` | Päätepiste-, kovariaatti- tai ekologinen konteksti. |
| HISTORICAL_CONTEXT | `contextualizes` | `context_only` | Kohdeväitteen `kind: historical`. |
| UNVERIFIED_CITATION | ei siirry | — | Vasta kun viitteellä on `verified: true` ja ratkeava linkki (`link_status: verified`). |
| OUTSIDE_ACTIVE_GRAPH | ei siirry | — | Ei kohdesolmua; jää katalogiin tai väitteeksi `kind: orphaned_finding`. |
| RETRACTED_2024 | ei siirry | — | Vain provenienssi. |
| PREDICTION | ei relaatio | — | Ennuste on väite (`kind: prediction`), ei näyttö. |

BERM:n omat argumentit (viisi `BERM argument #…`-tietuetta) ovat väitteitä (`kind: interpretation`, `methodological` tai `prediction`), eivät näyttörelaatioita.

4. **Taso.** B:n `level` ei kopioidu relaatioon; se on syöte kohdeväitteen `epistemic_assessments[]`-arvioon.
5. **Rajaukset.** `translationScope` → relaation `limitations[]` tai `curatorNote`; `curatorId`, `curatedAt` täytetään.
6. **B-tietueen lopputila.** Kun relaatio on lisätty, B-tietueen `status` vaihdetaan arvoon `SUPERSEDED_BY_ACTIVE_RECORD` ja `note`-kenttään kirjataan relaation id (`er.…`), jotta sama lähde ei näy sekä kandidaattina että relaationa. Odottaa tätä vaihtoa: `pall2013`, `chae2019`, `adams2014`, `yu2019_btb_disruption` (relaatio on, status yhä MIGRATION_CANDIDATE).
7. `npm run registry:validate` ja `npm run references:validate`.

A → C: sama polku. A:n `directness` → C:n `directness`, `calibrationRole` pienin kirjaimin, `scope` + `limitations` → `limitations[]`. Tehty 30/34 tietueelle 2026-09-02; A-tietue säilyy sivun "bounded records" -näkymän lähteenä myös relaation jälkeen.

## 4. Mikä estää täyden yhdistämisen

1. C:n 28 väitettä ovat kaikki `draft`-tilassa ja 20:llä on relaatioita; 53 MIGRATION_CANDIDATE-tietuetta (57 − 4) ja 4 A-tietuetta odottaa kohdeväitettä ja relaatiota.
2. 56 B-tietueella ei ole solmua ja 33 on OUTSIDE_ACTIVE_GRAPH; 36 solmun graafi ei kata niitä.
3. A on TypeScript-literaali, ei JSON: `validate-registry.mjs` ei näe sitä, ja berm-rekisteri (33) ja sivusto (34) eroavat ilman synkronointia.
4. Kuraattorikentät edellyttävät ihmisen päätöksen; automaattinen siirto rikkoo protokollaa.
5. Polkukirjaimet eivät vastaa solmuja 1:1 (RPM on koodissa ja sivustolla B, `docs/protocol/REASONING_PROTOCOL_v1.md`:ssä C), joten `pathway` ei kelpaa väitteen kohteeksi.
6. 10 UNVERIFIED_CITATION-tietuetta: 8:lla `verified: true` mutta `link_status: missing`, 2:lla `verified: false`.
7. `sherrard2018` on B:ssä `status: VERIFIED` mutta `evidenceRole: SOURCE_QUALIFICATION_PENDING`; ristiriita ratkaistaan kuratoinnissa ennen siirtoa.

## 5. Tehdyt korjaukset 2026-09-02

- `led_emf_component`, `display_multiplication`: `CIRCADIAN_DISRUPTION` → `MELATONIN_REDOX`; `orthogonal_layer_convergence`: `FIELDSTATE` → `TECHNOLOGY_TIMING_PROXY`; `yap2025_cry2_trpc1`: `B_CRY_MELATONIN` → `B_RPM_CRY`. Alkuperäinen id tietueen `note`-kentässä.
- `becker1985` level `H` → `L*`, `satellite_predictive_test` level `P` → `L*`; alkuperäinen kirjain `note`-kentässä.
- `STATUS_LABELS`: VERIFIED ja PREDICTION lisätty (en/fi).
- `LEGACY_EVIDENCE_MIGRATION` poistettu `lib/evidence.ts`:stä (ei tuojia; luvut 129/35 olivat vanhentuneet).
- `CAUSAL_NODE_LABELS` kattaa kaikki 36 graafin solmua.
- `/evidence`-, `/measurement/fieldstate`- ja `/measurement/fieldstate/math`-sivut erottavat v2:n (mittausmäärittely) ja v17:n (ennusteet tuottava malli); vanhat `/model/fieldstate*`-osoitteet ohjataan pysyvästi uusiin osoitteisiin.
