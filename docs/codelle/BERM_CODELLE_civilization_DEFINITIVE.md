# Civilization-sivu — DEFINITIVE-ohje

**Versio:** 2026-08-26
**Tunnisteet käytössä:** [KOODI]
**Tiedosto:** `website/app/[locale]/civilization/page.tsx`

---

## MIKSI TÄMÄ ON MERKITTÄVÄ

Civilization-sivu on BERM:n kolmas taso (L3): biologisista mekanismeista (Model) ja evidenssistä (Evidence) kohti yhteiskunnallisia seurauksia. Se yhdistää hormonaalisen substraatin muutokset käyttäytymisen, kulttuurin ja demografian muutoksiin.

---

## SIVUN ASEMOINTI

- **Taso 3:** Seuraukset (Model = L1, Evidence = L2)
- **Ydinargumentti:** EMF → VGCC → hormonaalinen häiriö → käyttäytymismuutokset → demografiset seuraukset
- **Lähtökohta:** Hormonaalinen substraatti — kulttuuri ja arvot eivät muutu tyhjiössä, vaan hormonipohjan muuttuessa

---

## SIVUN RAKENNE

### Komponentit (tuodut)
- `Link` (next/link)
- `Image` (next/image)
- Ikonit: ArrowRight, AlertTriangle, Baby, Building2, Users, Brain, Heart, Shield, TrendingDown, Zap, Target

### Osio 1: Johdanto
- Otsikko: "Civilization"
- Alaotsikko: Hormonaalisen substraatin kysymys
- heroLead + heroTrail: EMF → VGCC → hormoni → eteneminen
- levelNote: Kolmannen tason positiointi

### Osio 2: Kaksi rinnakkaista häiriöprofiilia

#### Miehen häiriöprofiili (maleTitle)
| Hormoni | Mekanismi | Käyttäytyminen | Evidenssi | Suuruusluokka |
|---------|-----------|----------------|-----------|---------------|
| Testosteroni | VGCC → Leydig-solut | Motivaation lasku, riskienotto ↓ | Travison 2007, Santi 2025 | −1.2%/v |
| Dopamiini | Ca²⁺ → TH-entsyymi | Palkitsemisjärjestelmän muutos | Eläinkokeet | — |
| Kortisoli | HPA-akseli → VGCC | Stressivaste, unettomuus | Ihmistutkimukset | — |

#### Naisen häiriöprofiili (femaleTitle)
| Hormoni | Mekanismi | Käyttäytyminen | Evidenssi | Suuruusluokka |
|---------|-----------|----------------|-----------|---------------|
| Estrogeeni/Progesteroni | Follikkelien Ca²⁺-signalointi | Hedelmällisyys ↓ | IVF-tilastot | — |
| Kortisoli (amplifioitu) | HPA + estrogeenivahvistus | Ahdistuneisuus ↑ | Epidemiologiset | — |
| Oksitosiini | Neuropeptidi + Ca²⁺ | Sosiaalinen sitoutuminen ↓ | Alustava | — |

### Lisääntymisen vaikutus
- `maleReproductive`: Siittiölasku, testosteronilasku, hedelmättömyys
- `femaleReproductive`: Endometrioosi, PCOS, ennenaikainen vaihdevuosi

### Seurausten vertailu
- `maleConsequences[]`: Rakenteelliset miehen käyttäytymismuutokset
- `femaleConsequences[]`: Rakenteelliset naisen käyttäytymismuutokset

---

## TULOSSA (EI TOTEUTETTU)

### Kyberneettinen malli
- Takaisinkytkentäsilmukat: hormoni → käyttäytyminen → altistus → hormoni
- Positiiviset silmukat: smartphone-käyttö ↑ → melatoniini ↓ → uni ↓ → altistus ↑
- Negatiiviset silmukat: väsymys → inaktiivisuus → liikunta ↓ → lisää sisätiloissa

### Aikapreferenssimalli
- Hyperbolic discounting + hormonaalinen perusta
- Testosteronilasku → aikapreferenssin muutos → hedelmällisyyspäätösten lykkäys
- Yhteys: dopamiini → palkitsemisen aikahorisontti

---

## RISTIVIITTAUKSET

| Kohde | Yhteys |
|-------|--------|
| Model-sivu | L1 biologinen kapasiteetti |
| Evidence-sivu | Travison, Santi, Levine |
| Predictions-sivu | TFR-ennusteet ovat civilization-vaikutusten kvantitatiivinen mittari |
| Modulome-sivut | Organ-tason häiriöt (sydän, haima, silmä, kilpirauhanen) |
| Etusivu | Kriisi luvuissa -osio, Mazur-lainaus |

---

## EPISTEEMINEN HUOMAUTUS

Civilization-sivu on BERM:n spekulatiivisin osa. Hormonaaliset mekanismit (L1) ovat kokeellisesti tuettuja. Yhteiskunnallisten seurausten johtaminen hormonaalisista muutoksista on päätelmä, ei suora havainto. Sivulla käytetään varovaisempaa kieltä kuin Model- tai Evidence-sivuilla.

**Episteeminen taso:** Pääosin M|C (mekanistinen/koherenssi), ei E (kokeellinen).
