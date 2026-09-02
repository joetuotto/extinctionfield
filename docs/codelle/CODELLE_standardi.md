# CODELLE — ohjedokumenttien standardi v1.0

> **Mikä tämä on:** Formaattistandardi kaikille CODELLE-ohjedokumenteille.  
> **Miksi:** CODELLE-ohjeita suorittavat useat tekoälytyökalut (Claude Cowork, Cursor, Cline, Windsurf, jne.). Kaikilla ei ole pääsyä Claude-projektin tietokantaan. Tämä standardi varmistaa, ettei yksikään askel jää hiljaisesti tekemättä.  
> **Sijainti:** `docs/codelle/CODELLE_standardi.md` (repo) + `BERM/CODELLE_standardi.md` (Claude-projekti)

---

## 1. ONGELMA

BERM-projektin ohjedokumentit ("CODELLE-ohjeet") sisältävät kahdenlaisia askeleita:

1. **Koodimuutoksia** — tiedostojen muokkaus repossa (`website/`, `berm/`, `data/`). Mikä tahansa työkalu voi suorittaa nämä.
2. **Projektitietokantapäivityksiä** — Claude-projektin knowledge base -dokumenttien (`BERM/*.md`) lukeminen ja kirjoittaminen. Vain Claude (Cowork/claude.ai) voi suorittaa nämä.

Kun muu työkalu (Cursor, Cline, jne.) seuraa CODELLE-ohjetta ja törmää projektitietokantaaskeleeseen, se **ohittaa sen hiljaisesti** — usein viestillä kuten "Projektidokumentteja ei löydy — ohitan kohdat X ja Y." Nämä askeleet jäävät tekemättä eikä kukaan seuraa niitä.

---

## 2. RATKAISU: KOLMIOSAINEN STANDARDI

### 2.1 Askeltunnisteet

Jokainen CODELLE-ohjeen askel merkitään tunnisteella:

| Tunniste | Merkitys | Kuka voi suorittaa |
|----------|----------|--------------------|
| `[KOODI]` | Tiedostojärjestelmämuutos (koodi, data, config) | Kaikki työkalut |
| `[PROJEKTI]` | Claude-projektin tietokantamuutos (luku tai kirjoitus) | Vain Claude |
| `[PROJEKTI→KOODI]` | Projektidokumentti tarvitaan syötteenä koodimuutokselle | Ks. 2.3 |
| `[DATA]` | Ulkoinen aineisto tai tutkimus, jota repossa ei voi tuottaa (RCT, kohortti, maksullinen data) | Ei kukaan työkalu — kirjataan `docs/research/`-kansioon, ei pending-jonoon |

`[DATA]`-tunniste lisätty 2026-09-02: tutkimusehdotukset (esim. `docs/research/convergence-data-proposals.md`) eivät ole odottavia koodiaskeleita, eivätkä ne kuulu `pending/`-jonoon.

**Esimerkki toteutusjärjestyksessä:**

```
1. [KOODI] references.json — lisää chae2019-merkintä
2. [KOODI] Evidence-sivu — Polku B -osion tutkimuskortti (EN + FI)
3. [KOODI] CausalChain.tsx — Polku B -evidenssipopup
4. [KOODI] model/page.tsx — CRY-polun kuvauksen päivitys
5. [KOODI] predictions/page.tsx — SLEEP-1-ennusteen perustelu
6. [KOODI] v16.py — docstring-päivitykset
7. [KOODI] metadata.py — kommenttipäivitys
8. [PROJEKTI] Projektidokumentit (3 kpl) — viittausten lisäys
9. [PROJEKTI] Polku B:n episteemisen tason nosto — päätös ja dokumentointi
```

### 2.2 Fallback-jono: `docs/codelle/pending/`

Kun työkalu ei voi suorittaa `[PROJEKTI]`-askelta, se **ei ohita sitä hiljaisesti** vaan kirjoittaa tiedoston:

```
docs/codelle/pending/YYYY-MM-DD_<ohje-nimi>_<askel>.md
```

**Tiedoston rakenne:**

```markdown
# Odottava projektipäivitys

- **Lähdeohje:** CODELLE_chae2019_integraatio.md
- **Askel:** 9 — Projektidokumentit (3 kpl)
- **Tila:** ODOTTAA
- **Suorittava työkalu:** (mikä tahansa Claude-sessio)

## Mitä pitää tehdä

### a) BERM/BERM_recovery_RPM_excitable_integraatio.md
Lisää Chae 2019 RPM-evidenssitaulukkoon riville 10:
| 10 | Chae ym. 2019 | Ihmisen CRY/RPM-magnetoreseptio ... | M|C |

### b) BERM/EXTINCTIONFIELD_kausaaliketju_ohjeet.md
Polku B -osioon lisätään Chae 2019 maininta ...

### c) BERM/LBERM_v16_mekanismien_mallinnus.md
Yöaltistusreitin osioon lisätään viittaus ...
```

**Säännöt:**

- Työkalu PITÄÄ kirjoittaa tämä tiedosto — pelkkä "ohitan"-viesti ei riitä.
- Claude tarkistaa `docs/codelle/pending/`-kansion jokaisen session alussa.
- Suoritettuaan odottavan päivityksen Claude merkitsee tiedoston valmiiksi
  nimeämällä sen `_DONE.md`-päätteiseksi (käytäntö vakiintui 2026-08-24;
  poistamisen sijaan) ja committaa muutoksen. `_DONE`-tiedostot ovat
  toteutuslokeja, eivät odottavia askeleita.
- `docs/codelle/pending/` on ainoa jono. Aiemmat rinnakkaiset jonot
  (`website/docs/codelle/pending/`, `berm/docs/codelle/pending/`) yhdistettiin
  tänne 2026-09-02.

### 2.3 Kontekstisilta: `[PROJEKTI→KOODI]`-askeleet

Joskus koodimuutos **tarvitsee projektidokumentin sisältöä syötteenä** — esim. evidence-sivun päivitys vaatii oikean episteemisen tason lukemista projektidokumentista.

**Ratkaisu:** CODELLE-ohjeen kirjoittaja upottaa tarvittavan kontekstin suoraan ohjeeseen `<konteksti>`-lohkossa:

```markdown
### 4. [PROJEKTI→KOODI] CRY-polun episteeminen taso model-sivulle

<konteksti src="BERM/BERM_recovery_RPM_excitable_integraatio.md">
Polku B:n nykyinen episteeminen kokonaistaso: M|C
RPM-evidenssiketju: Ritz 2004 [E], Engels 2014 [E], Sherrard 2018 [M|C],
Nat Comms 2024 [M|C], PNAS Nexus 2026 [M|C], Chae 2019 [M|C]
→ Polku kokonaisuutena: E (perustelu: 2× kokeellinen häiriö + 4× mekanistinen)
</konteksti>

**Muutos:** `app/[locale]/model/page.tsx`, CRY-polun kuvaus:
...
```

Tämä varmistaa, että koodimuutoksen suorittaja saa kontekstin **vaikka sillä ei olisi projektipääsyä**.

---

## 3. CODELLE-OHJEDOKUMENTIN RUNKO

Uusi CODELLE-ohje noudattaa seuraavaa rakennetta:

```markdown
# <Otsikko> — BERM-integraatioohje

**Versio:** YYYY-MM-DD
**Tunnisteet käytössä:** [KOODI], [PROJEKTI], [PROJEKTI→KOODI]

---

## MIKSI TÄMÄ ON MERKITTÄVÄ
(Konteksti: mikä tutkimus/muutos ja miksi se vaikuttaa BERM:iin)

## TOTEUTETTAVAT MUUTOKSET

### 1. [KOODI] Viiterekisteri: references.json
...

### 2. [KOODI] Evidence-sivu: ...
...

### N. [PROJEKTI] Projektidokumentit: ...
...

---

## TOTEUTUSJÄRJESTYS

```
1. [KOODI] ...
2. [KOODI] ...
...
N. [PROJEKTI] ... → jos ei pääsyä: kirjoita docs/codelle/pending/
```

## VAROITUKSET
...
```

---

## 4. OLEMASSA OLEVIEN OHJEIDEN SIJAINTI

### Repossa: `docs/codelle/`

Kaikki CODELLE-ohjedokumentit siirretään repossa kansioon `docs/codelle/`:

```
docs/codelle/
  CODELLE_standardi.md          ← tämä dokumentti
  pending/                      ← fallback-jono (gitignore:a EI laiteta)
  CODELLE_chae2019_integraatio.md
  CODELLE_evidence_paivityssuunnitelma_v2.md
  CODELLE_sivusto_malli_synkronointi.md
  ...
```

### Claude-projektissa: `BERM/CODELLE_*.md`

Sama sisältö synkronoidaan Claude-projektin tietokantaan `BERM/`-polun alle.
Kanoninen versio on **repossa** — Claude-projekti on kopio.

---

## 5. AGENTIN TOIMINTAOHJE

### Jos olet Claude (Cowork / claude.ai):

1. Tarkista `docs/codelle/pending/` jokaisen session alussa
2. Suorita odottavat projektipäivitykset (`project_read` → muokkaa → `project_write`)
3. Poista suoritetut pending-tiedostot ja committaa
4. Suorita CODELLE-ohjeet normaalisti — sekä `[KOODI]` että `[PROJEKTI]`

### Jos olet muu työkalu (Cursor, Cline, Windsurf, jne.):

1. Suorita kaikki `[KOODI]`-askeleet normaalisti
2. `[PROJEKTI→KOODI]`-askeleissa: lue konteksti `<konteksti>`-lohkosta, suorita koodimuutos
3. `[PROJEKTI]`-askeleissa: **ÄLÄ ohita hiljaisesti.** Kirjoita tiedosto `docs/codelle/pending/`-kansioon (ks. osio 2.2)
4. Committaa pending-tiedostot koodimuutosten mukana
5. Ilmoita käyttäjälle: "X projektipäivitystä kirjoitettu odotusjonoon — suorita Claude-sessiossa"

### Ei koskaan:

- Älä ohita `[PROJEKTI]`-askeleita ilman pending-tiedostoa
- Älä yritä arvata projektidokumenttien sisältöä
- Älä muuta tämän standardin rakennetta ilman käyttäjän lupaa

### 5.1 Episteeminen johdonmukaisuustarkistus

Jokainen evidenssiä käsittelevä CODELLE-ohje sisältää osion:
"BERM-tulkinta vs. standardimallin tulkinta". Tämä osio kertoo
kumman kehyksen mukaan evidenssi on luokiteltu ja miksi.

Jos luokitus noudattaa standardimallin logiikkaa (esim. WHO:n
certainty-tasot sellaisenaan), se perustellaan eksplisiittisesti:
"Tämä luokitus on standardimallin mukainen koska [syy]. BERM:n
oman logiikan mukainen luokitus olisi [X] koska [peruste]."

---

## 6. PENDING-TIEDOSTON TARKKA MUOTO

```markdown
# Odottava projektipäivitys

- **Lähdeohje:** <tiedostonimi>.md
- **Askel:** <numero> — <kuvaus>
- **Päivämäärä:** YYYY-MM-DD
- **Kirjoittanut:** <työkalu> (esim. Cursor, Cline)
- **Tila:** ODOTTAA

## Kohde: <BERM/dokumentin_nimi.md>

### Muutos
<tarkka kuvaus mitä lisätään/muutetaan>

### Konteksti
<miksi tämä muutos tehdään — viittaus CODELLE-ohjeen osioon>
```

**Tiedostonimen muoto:**
```
YYYY-MM-DD_<ohje>_kohta<N>.md
```

Esimerkki: `2026-08-24_chae2019_kohta9.md`

---

## 7. TARKISTUSLISTA OHJEKIRJOITTAJALLE

Kun kirjoitat uutta CODELLE-ohjetta:

- [ ] Jokainen askel on merkitty `[KOODI]`, `[PROJEKTI]` tai `[PROJEKTI→KOODI]`
- [ ] `[PROJEKTI→KOODI]`-askeleissa on `<konteksti>`-lohko tarvittavalla datalla
- [ ] Toteutusjärjestys listaa tunnisteet
- [ ] `[KOODI]`-askeleet ovat ennen `[PROJEKTI]`-askeleita (mahdollisuuksien mukaan)
- [ ] Ohjeen otsikossa on `Tunnisteet käytössä:` -rivi
