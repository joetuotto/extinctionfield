# Odottava projektipäivitys

- **Lähdeohje:** CODELLE "Tutkimussynteesi-integraatio — mekanismimoduuli ja erottelevat testit" (2026-09-07)
- **Askel:** Lähde `BERM/BERM_tutkimussynteesi_20260907.md` (20 lukua, 24 lähdettä) repoon
- **Tila:** ODOTTAA
- **Suorittava työkalu:** Claude-sessio, jolla on pääsy projektin knowledge baseen
- **Kirjattu:** 2026-09-07

## Mitä pitää tehdä

Kopioi synteesidokumentti `berm/docs/`-hakemistoon. Ohjeen kaikki `[KOODI]`-askeleet
on toteutettu ohjeen sisältämien lainausten (§10, §15, §16, §17, §18, §19) perusteella,
mutta itse synteesiä ei ole repossa, joten:

1. Korjausrekisterin (`website/data/correction_registry.ts`) kymmentä väitettä ei ole
   voitu verrata synteesin §19:n täyteen tekstiin, vain ohjeen lainaukseen.
2. "165 Hz:n aukko" -väitteen kaksi ei-merkitsevää koetulosta on kirjattu avoimeksi
   kysymykseksi ilman lähdeviitettä, koska ohje ei nimeä niitä.
3. Blackmanin R² = 0,85 on sidottu `blackman1985`-viitteeseen; synteesin tarkka lähde
   ("Blackman ym.") voi olla eri julkaisu.

## Toteutuksessa löydetty ristiriita, joka vaatii projektidokumentin päätöksen

Synteesi §15 antaa Kochin 24 Hz:n kokeelle vertailutaajuuden f_c = 25,2 Hz "Ca²⁺-
tulkintana" B₀ = 37 µT:ssa. Paljaan Ca²⁺-ionin syklotronitaajuus 37 µT:ssa on
28,35 Hz; 25,2 Hz vastaa paljaalle ionille B₀ ≈ 32,9 µT (Kochin ilmoittama
staattisen kentän alue on 27–37 µT). Moduuli (`berm/berm/physics/ipr_mechanism.py`,
`website/lib/mechanism.ts`) käyttää synteesin arvoa syötteenä `[KANDIDAATTI]`-
merkinnällä ja raportoi paljaan ionin arvon rinnalla. Synteesin pitäisi kertoa,
kumpi B₀ tai mikä efektiivinen massa 25,2 Hz:n takana on.

## Sivustolle jo tehty (ei odota)

| Askel | Tila |
|---|---|
| 1.1–1.3 rekisterit ja viitteet (8 uutta, kaikki Crossref/PubMed-verifioituja) | tehty |
| 2.1–2.3 mekanismimoduuli Python + TS, yksikkötestit, Gavoçin nollatulos | tehty |
| 3.1 kausaaliketjun solmut `bound-ion-hamiltonian`, `relaxation-candidate` | tehty (kebab-case-tunnisteet tiedoston käytännön mukaan) |
| 3.2–3.4 model-sivun osio, erottelevien testien ja korjausrekisterin taulukot | tehty |
| 3.5 Geometry- ja Chi-solmujen suoja | vitest `causal-chain-separation` pitää voimassa |
