# BERM-sivuston ja Python-mallin synkronointiohje

**Versio:** 2026-08-24 (päivitetty: versioristiriitojen korjaukset)  
**Konteksti:** Python `v16.py` sisältää sekä v16- (altistus) että v17- (biologinen kapasiteetti + kohortti) -funktiot. Aktiivinen ennustemalli on käytännössä **v17** (v17-funktiot kutsuvat v16-altistusfunktioita). Website `lib/model/` on ~2 versiota jäljessä. Tämä ohje kuvaa kaikki muutokset joilla sivusto saatetaan samalle tasolle.

---

## KRIITTINEN: Versionumeroinnin korjaukset

### Ongelma

Sivusto viittaa versioihin "v18" ja "v19" jotka eivät ole Python-koodin aktiivisen pipelinen versioita:

1. **"v18" ei ole olemassa missään.** Ei Python-koodissa, ei lukituissa ennusteissa. Se on pelkkä tekstivirhe.
2. **"v19" viittaa diagnostiseen three_channel.py-moduuliin** (`THREE_CHANNEL_VERSION = "v19-diagnostic"`), joka on eksplisiittisesti merkitty `DIAGNOSTIC_ONLY` eikä ole osa v16.py:n aktiivista ennustepipelineä.
3. **Lukitut ennusteet (predictions.ts) käyttävät oikein versiota "v17.0" tai "v17.1"** — ne ovat ajan tasalla.

### Python-koodin versiorakenne

| Versio | Sijainti | Funktioprefiksit | Tila |
|--------|----------|------------------|------|
| v16 | `berm/v16.py` | `v16_ambient_annual()`, `v16_personal_annual()`, `v16_two_channel_cum_exposure()` | AKTIIVINEN — altistusfunktiot |
| v17 | `berm/v16.py` | `v17_layer_retention()`, `v17_cohort_adjustment()`, `v17_night_fraction()`, `v17_cry_effect()`, `v17_melatonin_suppression()`, `v17_ovulation_vgic()`, `v17_male_bio_cap()`, `v17_f_couple()`, `v17_predicted_sex_ratio()` | AKTIIVINEN — biologinen kapasiteetti + kohorttikorjaus |
| v19 | `berm/exposure/three_channel.py` | kolmikanavainen dekompositio (ELF/IF/RF) | DIAGNOSTIC_ONLY — ei kutsuta v16.py:stä |

**Huom:** Tiedoston nimi `v16.py` on harhaanjohtava. Tiedosto sisältää molemmat v16- ja v17-funktiot. Aktiivinen malli on v17 (v17-funktiot kutsuvat v16-altistusfunktioita). Lukitut ennusteet identifioivat itsensä oikein v17.0/v17.1-versioiksi.

### Korjattavat tiedostot (TARKKA SIJAINTI)

#### 1. `components/CountryDetailPanel.tsx` — rivit 273–274

**Nykytila (VIRHEELLINEN):**
```
"Ennuste on lukittu BERM v18:lla; hakasulkeet ovat parametriherkkyysalue, eivät luottamusväli."
"The prediction is locked under BERM v18; brackets are a parameter sensitivity envelope, not a confidence interval."
```

**Korjaus:**
```
"Ennuste on lukittu BERM v17:llä; hakasulkeet ovat parametriherkkyysalue, eivät luottamusväli."
"The prediction is locked under BERM v17; brackets are a parameter sensitivity envelope, not a confidence interval."
```

#### 2. `app/[locale]/model/page.tsx` — rivi 165

**Nykytila:** Episteeminen huomautus viittaa "BERM v19".
**Korjaus:** Muuta "BERM v17" tai selitä diagnostinen status.

#### 3. `components/ExplorerDashboard.tsx` — rivit 13 ja 23

**Nykytila:** Viittaa "v19.1" ennusteeseen.
**Korjaus:** Muuta "v17.1".

### Yleinen sääntö versionumeroinnille sivustolla

- **Ennusteisiin liittyvät versiot:** Käytä predictions.ts:n modelVersion-kenttää (v17.0 tai v17.1).
- **Mallitekniikkaan viittaava teksti:** "BERM v17" tai "BERM v17.1".
- **Three-channel / 12 layers:** Aina merkittävä diagnostiseksi/tutkimuskäyttöön.

---

Täysi 9-vaiheinen synkronointiohje ks. projektin BERM/CODELLE_sivusto_malli_synkronointi.md
