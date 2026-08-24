# Pohjoinen paketti, sisäkkäinen χ ja historiallinen selitysvoima

**Versio:** 2026-08-24-HIST
**Tunnisteet:** [KOODI], [PROJEKTI]
**Edellyttää:** v1 (silmien väri), v2 (CRY-kaksoissysteemi), v3 (Lindgren-silmä), polkupaino-korjaus

---

## Yhteenveto

Tämä Codelle-kokonaisuus laajensi BERM:n kattamaan evoluution ja historian tason. Keskeinen lisäys on **sisäkkäinen χ** (nested chi) — valintasääntöfunktio, joka toimii viidessä skaalassa (molekulaarinen, optinen, solu-, ympäristö- ja populaatiotaso) ja selittää miksi Pohjois-Eurooppa laski ensimmäisenä korvaavuustason hedelmällisyyden alle.

## Toteutetut muutokset

### Viikko 1: Evidence/evolution-alisivu

| Tiedosto | Muutos |
|---|---|
| `lib/evolutionData.ts` | Uusi datatiedosto: CHI_SCALES (5), NORTHERN_TRAITS (3), HISTORICAL_PHASES (4), POPULATION_PROFILES (6), EVOLUTION_PREDICTIONS (5) |
| `app/[locale]/evidence/evolution/page.tsx` | Uusi alisivu: 5 pääosiota, bilingvaalinen COPY, PageHeader + Dna-ikoni |
| `app/[locale]/evidence/page.tsx` | Lisätty evolution-linkki SUB_PAGES-taulukkoon |

### Viikko 2: Model, math, kausaalikartta, Python

| Tiedosto | Muutos |
|---|---|
| `app/[locale]/model/page.tsx` | "χ at Five Scales" CollapsibleSection chi-coupling-osion jälkeen |
| `app/[locale]/mathematics/page.tsx` | §13 Nested χ: 4 Derivation-lohkoa (R_A, R_C, R, TFR) |
| `lib/causalMapData.ts` | `northern_package`-solmu (taso 0, M\|C) + 2 reunaa |
| `lib/causalAtlasData.ts` | `northern_package` lisätty NODE_ORDER.sources-taulukkoon |
| `v16.py` | POPULATION_CHI_PROFILES-sanakirja (6 populaatiota), DIAGNOSTIC_ONLY |

### Viikko 3: Muu sivusto

| Tiedosto | Muutos |
|---|---|
| `components/ExplorerDashboard.tsx` | χ-profiilikortti EN/FI |
| `app/[locale]/predictions/page.tsx` | HIST-1–HIST-5 ennusteosio (5 korttia) |
| `app/[locale]/page.tsx` | Pohjoinen paketti -tiivistelmäkappale + Dna-ikoni + CTA |
| `app/[locale]/about/page.tsx` | Deep History -osio (3 kappaletta + L*-huomautus) |

### Viikko 4: Projektidokumentaatio

| Tiedosto | Muutos |
|---|---|
| `docs/codelle/BERM_pohjoinen_paketti_historiallinen_selitysvoima.md` | Tämä tiedosto |

## Episteemiset tasot

| Väite | Taso | Perustelu |
|---|---|---|
| OCA2 + LCT koselektio | E | Vakiintunut populaatiogenetiikka |
| CRY tarvitsee FAD + sinistä valoa | E | Hirano 2017, Bartölke 2025, Yap 2025 |
| Pohjoinen paketti optimoi CRY:n | L* | Uusi tulkinta, ei suoraa testiä |
| Populaatio-χ-profiilit | M\|C | Karkeat arviot, mekanistinen perustelu |
| HIST-1–HIST-5 ennusteet | C–L* | Falsifioitavia, aikaikkunat 5–20 v |

## Varoitukset

1. Pohjoinen paketti on L*-tason hypoteesi. CRY-tulkinta on uusi, testattava laajennus.
2. Populaatio-χ-arvot ovat karkeita arvioita, eivät kalibroituja mittauksia.
3. Historiallinen narratiivi on selittävä, ei ennustava.
4. CRY/χ esitetään D-vitamiinihypoteesin laajennuksena, ei vaihtoehtona.
5. COVID-baby-bump on korrelaatio, ei kausaatio.
6. Afrikan ennuste on 10–20 vuoden aikaikkunalla.

## v17-integraatiolista K11

Pohjoinen paketti lisää BERM v17 -malliin seuraavat komponentit:

| K11 | Komponentti | Tyyppi | Episteeminen taso |
|---|---|---|---|
| K11.1 | Sisäkkäinen χ-funktio (5 skaalaa) | Mekanismi | E–M\|C |
| K11.2 | Pohjoinen paketti (OCA2+LCT+karjankasvatus) | Historiallinen selitys | L* |
| K11.3 | Populaatio-χ-profiilit (6 populaatiota) | Diagnostiikka | M\|C |
| K11.4 | TFR(pop)-kaava | Matemaattinen malli | M\|C |
| K11.5 | HIST-1–HIST-5 ennusteet | Falsifikaatio | C–L* |
| K11.6 | Northern_package kausaalisolmu | Kausaalikartta | M\|C |
