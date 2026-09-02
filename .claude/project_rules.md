# BERM — projektisäännöt agenteille

## Ennen BERM-analyysiä

Lue `docs/protocol/SESSION_PRIMER.md` (myös `.claude/session_primer.md`).
Se sisältää kuusi päättelysääntöä, polkuhierarkian ja erottelevat ennusteet.
Täysi protokolla: `docs/protocol/REASONING_PROTOCOL_v1.md`.

Tämä koskee jokaista tehtävää, jossa arvioidaan mitä BERM ennustaa, mitä
jokin aineisto kertoo BERM:stä, tai mitä jokin tulos falsifioi. Se ei koske
puhtaasti teknisiä tehtäviä (buildit, tyylit, refaktoroinnit).

## Kaksi tyypillisintä virhettä

1. **Konsensusmalli BERM-etiketillä.** "BERM ennustaa, että lähempänä lähdettä
   vaikutus on suurempi" on konsensusennuste. BERM:n erotteleva ennuste on
   vasteen *muoto* (χ-kyllästyminen, ikkunat, suuntariippuvuus), ei suunta.
2. **Proxy = annos.** Mobiililiittymät per capita on teknologian ajoitusproxy.
   Se ei ole FieldState eikä EMF-annos.

## Havaintojen luokittelu

`docs/audit/CLASSIFICATION_TABLE.json` on kanoninen lähde sille, mitä kukin
13 negatiivisesta havainnosta koskee. Sivusto (`/[locale]/objections`,
`/[locale]/evidence`) ja mallin metadata lukevat samaa taulukkoa — jos muutat
luokittelua, muuta se taulukossa, älä sivun tekstissä.

## Mitä ei saa tehdä

- Älä muuta v17-mallin numeerisia laskuja tai Wolfram-notebookia
  dokumentaatiotyön yhteydessä.
- Älä käytä termejä "todistaa" tai "vahvistaa" kumpaankaan suuntaan.
- Älä poista dokumentoitua negatiivista havaintoa. Uudelleenluokittelu on
  sallittua vain perusteltuna ja taulukkoon kirjattuna.

## Versionumerot

Koodissa on viisi itsenäistä versiointijärjestelmää. Älä sekoita niitä:

| Tunniste | Konteksti | Kuvaus |
|---|---|---|
| **v17** / v17.1 | Sivuston julkinen malli | BERM-mallin spesifikaatioversio |
| **v18.0-asfr** | `export_asfr.py` | ASFR-kohorttien vientiversio |
| **v19** / 0.19.0 | Python-paketti (`berm/__init__.py`, ainoa lähde — `pyproject.toml` lukee sen dynaamisesti) | Paketin julkaisuversio |
| **v19.1** | `model/page.tsx`, `mathematics/page.tsx`, `berm/validation/falsification_v19_1.py` | Diagnostinen kaava (54 maata) — ei ennustemalli; ennusteet ovat v17 |
| **v20 / v21** | `model/page.tsx` (kerrostumakaava), `mathematics/page.tsx` (linja v17 → v19.1 → v20 → v21) | Kaavasukupolvet sivuston mallikuvauksessa |
| **v2** | FieldState measurement spec | Mittausprotokollan versio (bounded records) |
| **CSLI-1 / SLEEP-1** | `predictions.ts` | Testikohtaiset versiot (sentinel cascade, sleep) |

Nämä eivät ole saman asian eri versioita. Ne seuraavat eri julkaisurytmejä.
Sivustolla ei ole yhtä versiovakiota — "BERM v17" on kovakoodattu ~145 kertaa
viidellä kielellä. Jos julkinen versio muuttuu, hae `grep -rn "BERM v17" app components lib`.
