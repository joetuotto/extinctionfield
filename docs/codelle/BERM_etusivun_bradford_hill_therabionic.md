# Etusivun Bradford Hill + TheraBionic -implementaatio

**Versio:** 2026-08-24-HOMEPAGE-BH
**Tunnisteet:** [KOODI]

---

## Yhteenveto

Kaksi uutta etusivukomponenttia: TheraBionic-kliininen validointi ja Bradford Hill -kriteeritaulukko. Molemmat bilingvaaliset (EN/FI), responsiiviset, ja integroitu etusivulle Northern Packagen ja lukittujen ennusteiden valille. Vanha "Therapeutic Device Paradox" -osio (section 6) korvattiin TheraBionic-komponentilla.

## Toteutetut muutokset

| Tiedosto | Muutos |
|---|---|
| `components/TheraBionicProof.tsx` | Uusi komponentti: FDA-hyväksyntä, 3 stat-korttia (Cav3.2, 100-1000x, +34%), selitysteksti, FDA-varoitus, CTA |
| `components/BradfordHillCard.tsx` | Uusi komponentti: 9 kriteeriä, ScoreDots (1-5), 3 sarakkeen vertailu (BERM/Tobacco'65/BPA), click-to-expand, TotalScore |
| `app/[locale]/page.tsx` | Importit + insertointi sections 4c/4d; vanha section 6 (TDP) poistettu; tdp COPY-avaimet siivottu |
| `app/[locale]/evidence/page.tsx` | `id="therabionic"` ja `id="bradford-hill"` -ankkurit TheraBionic-osioon |
| `public/data/references_full.json` | 2 uutta viitetta: bradford-hill-1965, surgeon-general-1964 |

## Etusivun uusi osiojarjestys

1. Hero
2. Sparkline-lukukortit
2b. Matkapuhelinparadoksi
3. Sentinellikaskadi
4. Miten malli toimii (kolmikanava)
4b. Pohjoinen paketti
**4c. TheraBionic-kliininen validointi (UUSI)**
**4d. Bradford Hill -kriteerit (UUSI)**
5. Lukitut ennusteet
~~6. Terapeuttinen laiteparadoksi~~ (POISTETTU)
7. Artikkelit
8. Falsifikaatiotilanne
9. Pikalinkit
10. Episteeminen alatunniste

## Komponenttien yksityiskohdat

### TheraBionicProof
- Kicker + otsikko
- CheckCircle + TheraBionic P1 -laitteen FDA-tiedot
- 3-sarakkeinen grid: Cav3.2, 100-1000x SAR, +34% survival
- Selitysteksti (ei "BERM on todistettu" -kielta)
- FDA-varoituslaatikko (kalsiumkanavansalpaaja-vasta-aihe)
- CTA -> evidence/devices#therapeutic-device-paradox

### BradfordHillCard
- 9 kriteeria: Strength, Consistency, Specificity, Temporality, Gradient, Plausibility, Coherence, Experiment, Analogy
- ScoreDots-visualisaatio (taytetyt/tyhjat pallot, 1-5)
- BERM (35/45) vs Tobacco '65 (32/45) vs BPA (29/45)
- Click-to-expand: vahvin todiste per kriteeri
- Subjektiivisuusdisclaimer
- Tupakkapisteet ovat 1965-arvoja
- CTA -> evidence#bradford-hill

## Varoitukset

1. Bradford Hill -pisteytys on SUBJEKTIIVINEN - disclaimer mukana
2. Tupakkapisteet ovat 1965-pisteet, eivat nykyiset
3. TheraBionic on itsenäinen vahvistus, EI "BERM:n todiste"
4. Ei "BERM on todistettu" -kielta missaan
5. FDA-lainaus on parafraasi, linkki alkuperaiseen
6. Mobiilirenderointiä testattu: 3-sarakkeinen taulukko scrollaa horisontaalisesti overflow-x-auto:lla
