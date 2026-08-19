# `data/registry/` — lähde- ja parametrirekisteri

Kaksi CSV-tiedostoa, jotka vastaavat kysymykseen *mistä tämä luku tulee?*

| Tiedosto | Sisältö | Validoi |
|---|---|---|
| `source_registry.csv` | Jokainen aineisto: sitaatti, lisenssi, tarkistussumma, kattavuus, rajoitteet | `berm.data.registry.validate_source_registry` |
| `parameter_registry.csv` | Jokainen ennustetta muuttava vakio: arvo, yksikkö, väli, näyttöluokka | `berm.data.registry.validate_parameter_registry` |

Skeemat: [`../schemas/source_registry.schema.json`](../schemas/source_registry.schema.json),
[`../schemas/parameter_registry.schema.json`](../schemas/parameter_registry.schema.json).

## Miksi CSV eikä Parquet

Provenanssin muutos on juuri se muutos, joka pitää nähdä pull requestin diffissä.
Kun `proxy_flag` kääntyy `True`→`False` tai `evidence_grade` nousee `SCENARIO`→`MEASURED`,
katselmoijan on nähtävä se rivinä eikä binäärimuutoksena. Täysi perustelu:
[`../../docs/data-integration-plan.md`](../../docs/data-integration-plan.md), luku 0.

## Näyttöluokat

| Luokka | Tarkoitus |
|---|---|
| `MEASURED` | Otettu siteeratusta *tämän suureen* mittauksesta |
| `ESTIMATED` | Sovitettu tai johdettu datasta |
| `SCENARIO` | Mallintajan valitsema oletus |
| `UNIDENTIFIED` | Koodissa ilman kirjattua alkuperää |

Lähteen `measurement_class` käyttää sopimuksen luokkia (`OBSERVED`, `PROXY`,
`SCENARIO_PARAMETER`, `DERIVED`) sekä arvoa `NOT_ACQUIRED`: aineistoa, jota ei ole
levyllä, ei voi vielä luokitella havainnoksi.

## Ristiinsäännöt, jotka testit pakottavat

- `MEASURED`-parametri ei saa osoittaa skenaariolähteeseen
- `SCENARIO`- tai `UNIDENTIFIED`-parametri ei saa osoittaa `OBSERVED`- tai `PROXY`-lähteeseen
- `UNIDENTIFIED`-parametrilla on oltava perustelu `notes`-kentässä
- `OPEN`-lähteellä, joka nimeää tiedoston, on oltava sha256 ja hakupäivä
- `ACCESS_REQUIRED`-lähteen on dokumentoitava tarkasti, mitä on hankittava
- Yksikään latauskoodi ei saa viitata `ACCESS_REQUIRED`-lähteeseen
- Jokaisen parametrin `defined_in` on osoitettava olemassa olevaan tiedostoon ja rivinumeroon

Testit: [`../../tests/test_provenance.py`](../../tests/test_provenance.py).

## Nykytila (2026-08-19)

- **15 lähdettä:** 9 `OPEN`, 4 `ACCESS_REQUIRED`, 2 `NOT_YET_ACQUIRED`
- **70 parametria:** 37 `SCENARIO`, 22 `UNIDENTIFIED`, 10 `ESTIMATED`, 1 `MEASURED`

**59/70 (84 %) mallia ajavista parametreista on oletuksia.** Tämä luku on tarkoitettu
laskemaan työn edetessä, ja se on rehellisin yhden luvun yhteenveto mallin nykytilasta.

## Rivin lisääminen

1. Lisää rivi oikeaan CSV:hen. Sarakejärjestys on osa sopimusta; validaattori hylkää
   uudelleenjärjestetyn otsikon
2. `known_limitations` ei saa olla tyhjä. Lähde, jolla ei ole todettua rajoitetta, ei ole
   luettu riittävän tarkasti käytettäväksi
3. `prior_or_range` ei saa olla tyhjä. Parametria ilman väliä ei voi vaihdella
   herkkyysanalyysissä eikä siten falsifioida
4. Aja `pytest tests/test_provenance.py`
