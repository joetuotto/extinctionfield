# Päättelyprotokolla — versiohistoria

## Polkukirjainten yhtenäistys — 2026-09-02

Repossa oli kaksi rinnakkaista polkukirjainskeemaa. Koodi ja sivusto käyttivät
kirjainta B RPM/CRY-polulle ja kirjainta C veri-aivoesteelle; protokolla ja
mallin metadata käyttivät kirjainta C RPM-polulle. Ristiriita kirjattiin
2026-08-24 (`docs/codelle/pending/2026-08-24_polkukirjaimet_ristiriita_DONE.md`)
ja auditointiin 2026-08-25 (`docs/audit/SITE_AUDIT_2026-08-25.md`, havainto 6).

Kanoniseksi valittiin koodin ja sivuston skeema
(`website/lib/evidence.ts` → `PATHWAY_LABELS`, `berm/berm/biology/pathways.py`):

| Kirjain | Mekanismi | Paino |
|---------|-----------|-------|
| A | VGIC → Ca²⁺ → ROS → siittiövaurio | 45 % |
| B | RPM/CRY → sirkadiaaninen häiriö | 25 % |
| C | Veri-aivoesteen häiriö | 15 % |
| D | HPA → HPG -ristikkäisinhibitio | 15 % |
| E | Mikrobiomi | — |
| F | Bioelektrinen koodi (Becker DC, Vmem) | — |

Toteutus kolmessa vaiheessa:

- `47bae88` — `PRIMARY_PATHWAY = "C_RPM"` → `"B_RPM"` (`berm/berm/metadata.py`),
  `SESSION_PRIMER.md`:n polkuhierarkia, viiterekisterin kentät
- `64387d9` — yhtenäistys mallikoodissa ja sivustolla kaikilla kielillä
  (`v16.py`, `export.py`, model/mathematics/objections/evidence-sivut)
- 2026-09-02 (tämä pyyhkäisy) — jäljelle jääneet lukijalle näkyvät kohdat ja
  dokumentaatio: `REASONING_PROTOCOL_v1.md` §2.2 -polkutaulukko,
  `DISCRIMINATING_TESTS.md`, `NEGATIVE_FINDINGS_REVIEW.md`,
  `legacyEvidence.json` (4 melatoniinitietuetta), farmakologiasivun fi-lohko,
  `DiseaseCascadeTimeline.tsx`, `causalMapData.ts` (BBB/BTB), model-sivun
  reittikaaviot sekä analyysi- ja CODELLE-dokumentit.

Historialliset tallenteet (`2026-08-24_polkukirjaimet_ristiriita_DONE.md`,
`SITE_AUDIT_2026-08-25.md`) jätettiin ennalleen; niihin lisättiin vain
huomautus, että skeema on sittemmin yhtenäistetty.

Avoimet jäljellä olevat kohteet on lueteltu tämän tiedoston lopussa.

## v1.0 — 2026-08-20

Ensimmäinen versio. Lähde: `BERM_Sovellusohje_v1.md` (elokuu 2026).

Sisältö:

- Kuusi päättelysääntöä (johda ennen testaamista, erottele yhteiset ennusteet,
  symmetrinen evidenssitaakka, kahdeksan liukumavirhettä, kolmiosainen raportointi,
  premissimerkinnät)
- Polkuhierarkia: B (RPM) primäärinen, A (VGCC) sekundaarinen
  (kirjoitettiin alun perin muodossa "C (RPM)"; yhtenäistetty 2026-09-02)
- Erottelevien ja yhteisten ennusteiden taulukko
- Pikatarkistuslista

Liitännäiset:

- `SESSION_PRIMER.md` — lyhennetty versio sessiokontekstiin (< 2000 tokenia)
- `../audit/CLASSIFICATION_TABLE.json` — protokollan soveltaminen 13 havaintoon
- `../audit/DISCRIMINATING_TESTS.md` — kolme erottelevaa testiä (D1–D3)

Laukaiseva havainto: Nike-BBS-analyysi (elokuu 2026), jossa χ(Ā)-ennustetta ei
johdettu ennen testiä, ja monotoninen tulos tulkittiin Lindgrenin falsifikaatioksi.
Luokittelutaulukossa F04, uudelleenluokiteltu `underdetermined`.

### Käännökset

`REASONING_PROTOCOL_v1_en.md` on suunniteltu mutta ei vielä kirjoitettu.

---

## Avoimet polkukirjainkohteet (2026-09-02)

Nämä jäivät 2026-09-02-pyyhkäisyn ulkopuolelle. Ne eivät ole B/C-ristiriitoja
vaan erillinen, kolmas kirjainkäytäntö tai muuten rajauksen ulkopuolella:

1. `website/lib/causalChainData.ts` — solmujen otsikot: `pathway_c` = melatoniini,
   `pathway_e` = BBB, `pathway_f` = Vmem-koodi. Oma kuusiportainen skeema, joka
   näkyy lukijalle kausaaliketjukomponentissa. Kanonisesti: melatoniini = B,
   BBB = C, Vmem = F.
2. `berm/berm/biology/pathways.py:122` `pathway_f()` = "Biological barrier
   pathway (BBB/BTB)" ja `website/app/[locale]/evidence/bbb/page.tsx`
   ("Pathway F: Biological Barriers" / "Polku F: Biologiset esteet").
   Kanonisesti este-polku on C, F on bioelektrinen koodi.
3. `website/public/data/references_full.json` — `battelle1980` ja `reiter2007`
   ovat yhä `"pathway": ["C"]`, vaikka molemmat ovat melatoniinitutkimuksia (B).
4. `website/lib/legacyEvidence.json` — BBB/BTB-tietueet (`salford2003`,
   `yu2019_btb_disruption`, `ulusoy2025_bbb_enos`) on merkitty polulle A ja
   yhdeksän siittiö-/demografiatietuetta polulle B. Kumpikaan ei ole
   B/C-ristiriita, mutta molemmat vaativat erillisen arvion.
