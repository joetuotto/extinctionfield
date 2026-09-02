# Odottava projektipäivitys

> **Historiallinen tallenne — skeema on sittemmin yhtenäistetty: B = RPM/CRY, C = veri-aivoeste (ks. `docs/protocol/CHANGELOG.md`, 2026-09-02).**

- **Lähdeohje:** ei mistään CODELLE-ohjeesta — löydös Chae 2019 -integraation yhteydessä
- **Askel:** — (uusi havainto)
- **Päivämäärä:** 2026-08-24
- **Kirjoittanut:** Claude Code -sessio
- **Tila:** ODOTTAA
- **Käyttäjän päätös 2026-08-24:** kirjataan odotusjonoon, ei korjata nyt

## Ongelma

Repossa on kaksi keskenään ristiriitaista polkukirjainjärjestelmää. Molempia
luetaan aktiivisesti, ja ne antavat kirjaimelle B ja kirjaimelle C eri
merkityksen.

### Järjestelmä 1 — koodi ja sivusto

| Kirjain | Mekanismi | Lähde |
|---------|-----------|-------|
| A | VGIC → Ca²⁺ → ROS → siittiövaurio (45 %) | `berm/berm/biology/pathways.py:27` |
| **B** | **RPM → CRY → sirkadiaaninen häiriö (25 %)** | `berm/berm/biology/pathways.py:32` |
| C | BBB-häiriö HPA:n kautta (15 %) | `berm/berm/biology/pathways.py:37` |
| D | HPA → HPG -ristikkäisinhibitio (15 %) | `berm/berm/biology/pathways.py:42` |

Samaa järjestelmää käyttävät:
- `website/lib/evidence.ts` — `PATHWAY_LABELS.B = "RPM → CRY → circadian disruption"`,
  `PATHWAY_LABELS.C = "Blood–brain barrier disruption"`
- `website/public/data/references_full.json` — chae2019, ritz2004, engels2014,
  sherrard2018, yoshii2009 kaikki `"pathway": ["B"]`
- `website/lib/legacyEvidence.json` — sama
- `website/lib/causalChainData.ts:300` — `pathway_b`, label "Polku B: CRY"

### Järjestelmä 2 — protokolla ja mallin metadata

| Kirjain | Mekanismi | Lähde |
|---------|-----------|-------|
| **C (RPM)** | **CRY → melatoniini → HPG — PRIMÄÄRINEN, 4/5 termiä johdettu** | `docs/protocol/SESSION_PRIMER.md:18` |
| A (VGCC) | δV_m → Ca²⁺ → ROS — SEKUNDAARINEN, vaatii vahvistimia | `docs/protocol/SESSION_PRIMER.md:19` |
| **B–E** | **DC, dopaminerginen, mikrobiomi — EI JOHDETTU geometriasta** | `docs/protocol/SESSION_PRIMER.md:20` |

Samaa järjestelmää käyttävät:
- `berm/berm/metadata.py:24-27` — `PRIMARY_PATHWAY = "C_RPM"`, kommentti
  "Pathway C (radical-pair / cryptochrome) is primary … pathway A (VGCC) needs
  biological amplifiers"

## Miksi tämä on ongelma

1. **Suora ristiriita.** Järjestelmässä 1 C = veri-aivoeste. Järjestelmässä 2
   C = RPM/kryptokromi ja on primääripolku. Järjestelmässä 1 B = RPM.
   Järjestelmässä 2 B on nimenomaan se ryhmä jota EI ole johdettu geometriasta.

2. **CODELLE_chae2019_integraatio.md sekoittaa molemmat samassa dokumentissa.**
   Se avaa lainaamalla `PRIMARY_PATHWAY = "C_RPM"` (järjestelmä 2) ja puhuu
   sitten koko loppudokumentin ajan "polku B:stä" (järjestelmä 1). Myös
   pending-tiedostot ovat epäjohdonmukaisia: `kohta9` sanoo "polku C:n
   biologinen substraatti", `kohta10` sanoo "Polku B:n episteeminen taso".
   Molemmat tarkoittavat samaa RPM-polkua.

3. **Askel 10 oli kaksiselitteinen.** "Nosta polku B tasolle E" tarkoittaa
   järjestelmässä 1 RPM-polkua (johdonmukaista) ja järjestelmässä 2
   DC/dopaminergista/mikrobiomipolkua, jolla ei ole mitään tekemistä
   Chae 2019:n kanssa. Päätös tehtiin järjestelmän 1 tulkinnalla.

4. **Riski jatkossa.** Kuka tahansa agentti joka lukee SESSION_PRIMER.md:n
   (jota projektisäännöt vaativat lukemaan ennen BERM-analyysiä) ja sitten
   koskee polkukirjaimiin, tekee virheen jompaan kumpaan suuntaan.

## Ehdotettu ratkaisu

Ei ratkaistu tässä sessiossa — muutos koskisi mallin metadataa ja kymmeniä
tiedostoja, mikä on selvästi laajempi kuin Chae-integraatio.

Vaihtoehdot:

- **A. Sivusto/koodi kanoniseksi (A/B/C/D kuten pathways.py).** Vähiten
  tiedostomuutoksia: korjattava `SESSION_PRIMER.md:16-20` ja
  `metadata.py:24-27` (`PRIMARY_PATHWAY = "C_RPM"` → `"B_RPM"`). Riski:
  `PRIMARY_PATHWAY`-merkkijono voi esiintyä exporteissa ja testeissä.
- **B. Protokolla kanoniseksi.** Vaatii kaikkien viitteiden `pathway`-kenttien,
  `PATHWAY_LABELS`:n, `causalChainData.ts`:n ja `pathways.py`:n uudelleen-
  nimeämisen. Selvästi laajempi.
- **C. Nimetään polut kirjainten sijaan.** Esim. `RPM_CRY`, `VGIC_CA_ROS`.
  Poistaa ongelman pysyvästi, suurin kertatyö.

Suositus: **A**, ja samalla tarkistus että `B_RPM_CRY`-solmutunnisteet
(`evidence_constraints.py:276`, `causal_registry.py`) ovat linjassa —
ne käyttävät jo B:tä RPM:lle eli järjestelmää 1.

## Tarkistettava ennen korjausta

```bash
grep -rn "PRIMARY_PATHWAY\|C_RPM" --include="*.py" --include="*.ts" --include="*.json" .
```

`metadata.py:56` vie `PRIMARY_PATHWAY`-arvon ulos `primary_pathway`-kentässä,
joten arvon muuttaminen näkyy mallin metadata-exportissa ja mahdollisesti
sivuston sisällössä. Ei muutettava dokumentaatiotyön ohessa
(projektisääntö: "Älä muuta v17-mallin numeerisia laskuja tai Wolfram-
notebookia dokumentaatiotyön yhteydessä").
