# Negatiivisten havaintojen uudelleenarviointi

Versio 1.0 · 2026-08-20

Tämä dokumentti soveltaa BERM-päättelyprotokollaa (v1.0) kolmeentoista aiemmin
negatiivisiksi luokiteltuun havaintoon. Uudelleenluokittelu ei tarkoita, että
havainto tukisi BERM:ää — se tarkoittaa, ettei alkuperäinen testi ollut
erotteleva tai kohdistui oikeaan kohteeseen.

Koneluettava versio: `CLASSIFICATION_TABLE.json`
Erottelevat testit: `DISCRIMINATING_TESTS.md`

## Yhteenveto

| Luokka | Lkm |
|--------|-----|
| Pysyy negatiivisena | 6 |
| Uudelleenluokiteltu (ei erottele malleja / olkiukko / väärä testi / alimääräytynyt) | 5 |
| Sisäinen tarkennus | 2 |
| **Yhteensä** | **13** |
| Koskee nykyistä empiiristä BERM:ää | 0 |
| Koskee vain L-BERM:ää | 5 |
| Koskee vain vanhoja versioita (v6–v9) | 4 |
| Havaintokohtaisia erottelevia jatkotestejä tunnistettu | 5 |

## Uudelleenluokitellut havainnot (5)

### F01: Nokia-era Finland fertility rise
- **Alkuperäinen**: falsifikaatio
- **Uusi**: ei erottele malleja (non_discriminating)
- **Perustelu**: BERM:n kumulatiivinen viivemalli ennustaa viivästyneen vaikutuksen; Suomen TFR-lasku alkoi 2010
- **Koskee**: demografisia väitteitä
- **Erotteleva testi**: In utero -kohorttiseuranta (2G-syntyneet vs. 4G-syntyneet ASFR)

### F02: Israel high TFR
- **Alkuperäinen**: falsifikaatio
- **Uusi**: ei erottele malleja (non_discriminating)
- **Perustelu**: D-termi (kulttuurinen kysyntä) on eksplisiittinen arkkitehtuurissa; sisäinen gradientti tukee BERM:ää
- **Koskee**: demografisia väitteitä
- **Erotteleva testi**: Siittiölaadun vertailu: sekulaari israelilainen vs. amish (sama haluttu hedelmällisyys, eri EMF)

### F03: Pre-mobile demographic transition
- **Alkuperäinen**: falsifikaatio
- **Uusi**: olkiukko (straw_man)
- **Perustelu**: BERM v6+ erottaa D-vetoisen laskun Φ-vetoisesta; väittää vain post-2000-kiihtymistä
- **Koskee**: ei mitään nykymallissa

### F04: Nike-BBS monotonic dose-response
- **Alkuperäinen**: Lindgrenin χ falsifioitu
- **Uusi**: alimääräytynyt (underdetermined)
- **Perustelu**: χ-ennustetta ei johdettu ennen testiä; R²<1 % riittämätön voima; yhteensopiva molempien mallien kanssa
- **Koskee**: L-BERM:n χ-muotoa
- **Erotteleva testi**: Johda eksplisiittinen χ(Ā)-ennuste tutkageometrialle, testaa suuremman voiman aineistolla

### F10: Cross-sectional r = −0.46
- **Alkuperäinen**: heikko selitysvoima
- **Uusi**: väärä testi (wrong_test)
- **Perustelu**: proxy ≠ annos; vaimennusharha puristaa r:ää; yhteisödata (D-kontrolloitu) tuottaa R²=0,999
- **Koskee**: demografisia väitteitä
- **Erotteleva testi**: FieldState-mitattu paneeli vaimennuskorjauksella

## Sisäiset tarkennukset (2)

### F05: δV_m ≈ 10⁻²¹ V geometric coupling
- **Alkuperäinen**: mekanismin epäonnistuminen
- **Uusi**: sisäinen tarkennus (internal_refinement)
- **Perustelu**: koskee vain polkua A; polku C (RPM) toimii oikealla skaalalla; johti hierarkiainversioon
- **Koskee**: polun A geometriaa (L-BERM)

### F11: Finland density model failure
- **Alkuperäinen**: katastrofaalinen epäonnistuminen
- **Uusi**: sisäinen tarkennus (internal_refinement)
- **Perustelu**: paljasti puuttuvan henkilökohtaisen EMF-komponentin; johti kaksikomponenttiarkkitehtuurin korjaukseen
- **Koskee**: pelkkää tiheysmallia (vanhentunut)
- **Erotteleva testi**: Kaksikomponenttimallin (ambientin + henkilökohtainen) validointi

## Pysyvät negatiiviset havainnot (6)

### F06: Lorentzian ghost obstruction
- **Luokittelu**: solitonikerros falsifioitu (pysyy)
- **Perustelu**: matemaattisesti todistettu: π₂=0 aikatyyppiselle A:lle, haamuenergia avaruustyyppiselle A:lle
- **Koskee**: L-BERM:n solitonikerrosta

### F07: VGCC resonance 94–183 GHz
- **Luokittelu**: mekanismi mahdoton (pysyy)
- **Perustelu**: 5 kertaluokkaa liian nopea proteiinin konformaatiodynamiikalle; oikein hylätty
- **Koskee**: BERM v6–v9 -resonanssiväitettä

### F08: Water resonance physics error
- **Luokittelu**: fysiikkavirhe (pysyy)
- **Perustelu**: 2,45 GHz:n vesiabsorptio on rotaatiovaimennus, ei vahvistava resonanssi
- **Koskee**: BERM v6–v9 -dokumentteja

### F09: Eight fabricated DOIs
- **Luokittelu**: dokumentaation eheys (pysyy)
- **Perustelu**: tekoälyn tuottamia viitehallusinaatioita varhaisissa dokumenteissa; ei vaikuta fysiikkaan tai dataan
- **Koskee**: BERM v6–v9 -dokumentteja

### F12: Lindgren 16 premises vs standard 6
- **Luokittelu**: parsimonia-ongelma (pysyy)
- **Perustelu**: pätevä epistemologinen huoli L-BERM:n geometriakerrokselle; ei falsifikaatio
- **Koskee**: L-BERM:n teoriakerrosta

### F13: κ coupling and gauge non-invariance
- **Luokittelu**: konsistenssiongelma (pysyy)
- **Perustelu**: avoimia teoreettisia ongelmia Lindgrenin viitekehyksessä; heikentää L-BERM:n johdantoja
- **Koskee**: L-BERM:n teoriakerrosta

## Havaintojen kohdentuminen

Yksikään 13 havainnosta ei kohdistui BERM:n primäärihaaraan (polku C / RPM / kohorttivaikutus).
Tämä haara on edelleen empiirisesti testaamaton erottelevilla testeillä D1–D3
(ks. `DISCRIMINATING_TESTS.md`).

| Kohde | Lkm | Havainnot |
|-------|------|-----------|
| L-BERM:n teoriakehys | 5 | F04, F05, F06, F12, F13 |
| Vanhat versiot (v6–v9) | 4 | F07, F08, F09, F11 |
| Demografiset väitteet (eivät erottele) | 3 | F01, F02, F10 |
| Ei mitään nykymallissa | 1 | F03 |
| Nykyinen empiirinen BERM | 0 | — |
