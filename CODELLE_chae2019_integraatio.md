# Chae et al. 2019 — BERM-integraatioohje

**Versio:** 2026-08-24  
**Artikkeli:** Chae K-S, Oh I-T, Lee S-H, Kim S-C. "Blue light-dependent human magnetoreception in geomagnetic food orientation." PLOS ONE 14(2): e0211826 (2019).  
**DOI:** 10.1371/journal.pone.0211826  
**Korjaus:** PLOS ONE 14(10): e0223635 (lokakuu 2019) — korjausilmoituksen sisältö tarkistettava ennen integrointia.

---

## MIKSI TÄMÄ ON MERKITTÄVÄ

### Artikkelin ydinlöydös

Nälkiintyneet miehet (n=20) orientoituivat tilastollisesti merkitsevästi kohti moduloitua magneettista pohjoista (α=350.0°, r=0.51, P=0.00043) ja itää (α=83.2°, r=0.34, P=0.015) kun suunta oli yhdistetty ruokaan. Vaikutus hävisi:
- silmäsiteellä (α=292.5°, r=0.13, P=0.52)
- aallonpituuksilla >500 nm (α=64.7°, r=0.06, P=0.44)
- antiparalleelivirroilla (kontrollikoe)

Pystykomponentin kääntäminen käänsi orientaation etelään (α=178.4°, r=0.50, P=0.00062) → inklinaatiokompassi.

Naiset (n=21) eivät osoittaneet merkitsevää orientaatiota missään olosuhteissa.

### Merkitys BERM:n premisseille

BERM:n ensisijainen polku on `PRIMARY_PATHWAY = "C_RPM"` (kryptokromin radikaaliparimekanismi). Koko CRY-kanava — `v17_cry_effect()`, `v17_cry_annual_response()`, yöaltistusreitti `v17_night_fraction()` — nojaa oletukseen, että **ihmisillä on toimiva CRY/RPM-pohjainen magnetoreseptio jota RF-kentät voivat häiritä**.

Chae 2019 on ensimmäinen käyttäytymistason näyttö siitä, että ihmisen magnetoreseptio:

1. **on toiminnallinen** (orientaatio > satunnainen, P < 0.001)
2. **käyttää nimenomaan RPM-mekanismia** (sinisen valon riippuvuus 400–500 nm = FAD-kromoforin absorptioalue kryptokromissa; vaikutus häviää >500 nm)
3. **käyttää inklinaatiokompassia** (pystykomponentin kääntö kääntää suunnan) — kuten RPM ennustaa

Aiempi evidenssi RPM:stä oli Drosophilasta (Yoshii 2009, Sherrard 2018), linnuista (Ritz 2004, Engels 2014) ja planarioista (PNAS Nexus 2026). Chae 2019 osoittaa, että substraatti on **olemassa ja toiminnallinen ihmisessä**.

### Yhteys kolmeen BERM-rakenteeseen

**1. Yöaltistusreitti:** BERM mallintaa `v17_night_fraction()`-funktiolla tilannetta jossa älypuhelin makuuhuoneessa tuottaa sekä sinistä valoa (aktivoi CRY:n radikaaliparit) että RF-kenttiä (häiritsee niitä). Chae 2019 osoittaa, että ihmisen CRY tarvitsee sinistä valoa toimiakseen. Yöllinen puhelimen käyttö luo juuri ne olosuhteet joissa CRY on aktiivinen ja haavoittuvainen RF-häiriölle samanaikaisesti.

**2. SLEEP-1-ennuste:** predictions.ts:n `sleep-1-faraday-vs-bluefilter` ennustaa Faraday-suojan vaikutussuhteen sinivalofilteriin nähden olevan 2:1. Mekanistinen selitys Chae 2019:n valossa:
- Sinivalofilteri poistaa CRY:n aktivaation kokonaan → radikaalipareja ei muodostu → RF ei voi häiritä niitä → uni paranee
- Faraday-suoja poistaa RF-häiriön → CRY toimii normaalisti → melatoniini-sirkadiaanireitti normalisoituu → uni paranee
- Molemmat toimivat, mutta Faraday on tehokkaampi koska se korjaa häiriön jättäen luonnollisen CRY-toiminnan ennalleen, kun taas sinivalofilteri poistaa häiriön poistamalla koko järjestelmän

**3. Sukupuolispesifisyys:** BERM:ssä on erilliset `v17_f_male()` ja `v17_f_female()` funktiot. Chae 2019 löytää sukupuolieron magnetoreseptiossa (vain miehet). Tämä on yhdensuuntainen, mutta varovaisesti — tutkimuksen sukupuoliero voi liittyä nälkä/glukoosi-motivaatioon eikä välttämättä CRY-herkkyyteen sinänsä.

### Mitä tämä EI osoita

- Ei testaa RF-kenttien vaikutusta magnetoreseptioon ihmisessä (sen tekee vasta diskriminoiva testi D1/D2)
- Ei mittaa suoraan CRY-proteiinin aktiivisuutta verkkokalvon gangliosoluissa
- Pieni otoskoko (20+21)
- Korjausilmoitus 10/2019 — sisältö tarkistettava
- Osoittaa substraatin olemassaolon (necessary condition), ei RF-häiriötä (sufficient condition)

---

## TOTEUTETTAVAT MUUTOKSET

### 1. Viiterekisteri: references.json ja references_full.json

**Lisää molempiin tiedostoihin:**

```json
{
  "id": "chae2019",
  "authors": "Chae K-S, Oh I-T, Lee S-H, Kim S-C",
  "year": 2019,
  "title": "Blue light-dependent human magnetoreception in geomagnetic food orientation",
  "journal": "PLOS ONE",
  "doi": "10.1371/journal.pone.0211826",
  "pmid": null,
  "n": 41,
  "type": "experimental",
  "level": "M|C",
  "pathway": ["B"],
  "finding": "Starved men orient toward geomagnetic food-associated directions (P<0.001). Requires blue light (<500 nm), confirming radical pair mechanism via cryptochrome. Inclination compass confirmed. First behavioral evidence of functional CRY/RPM magnetoreception in humans.",
  "tags": [
    "cry",
    "rpm",
    "human",
    "magnetoreception",
    "blue_light",
    "inclination_compass",
    "sex_difference",
    "glucose"
  ],
  "verified": true,
  "category": "reproduction_hormones",
  "pdf_section": null,
  "pdf_number": null
}
```

**Sijainti references.json:ssa:** Lisää pathway B -tutkimusten joukkoon, hore2016:n ja sherrard2018:n jälkeen.

**Evidenssitaso M|C (Mechanistic + Correlational):** Mekanistinen koska blue-light cutoff on RPM:n diagnostinen sormenjälki. Korrelatiivinen koska se on käyttäytymistason mittaus ihmisessä, ei suora CRY-proteiinimittaus. EI E-tasoa koska: pieni otoskoko, korjausilmoitus, ei replikoitu.

### 2. Evidence-sivu: Polku B (RPM → CRY → Circadian)

**Tiedosto:** `app/[locale]/evidence/page.tsx` (219,126 tavua)

**Lisäys Polku B -osioon:**

Lisää tutkimuskortti seuraavilla tiedoilla:

```
Chae et al. 2019 | PLOS ONE | n=41 | M|C
"Blue light-dependent human magnetoreception in geomagnetic food orientation"

Starved men orient toward geomagnetic food-associated directions (P<0.001).
Effect requires blue light (<500 nm) — the diagnostic signature of the
cryptochrome radical pair mechanism. Inclination compass confirmed by
vertical field inversion. First behavioral evidence that CRY/RPM
magnetoreception is functional in humans.

BERM relevance: Establishes that the biological substrate of BERM's
primary pathway (C_RPM) exists and is functional in humans.
Prior CRY/RPM evidence was from Drosophila, birds, and planarians.

Caveats: Small sample (n=41). Correction notice Oct 2019 (content to be
verified). Does not test RF disruption of magnetoreception — that is
discriminating test D1/D2.
```

**Kieliversiot:** Käännä sekä englanniksi (EN) että suomeksi (FI) kuten muut evidence-sivun tutkimukset.

FI-versio:
```
Nälkiintyneet miehet orientoituvat kohti geomagneettisia ruokaan yhdistettyjä
suuntia (P<0,001). Vaikutus vaatii sinistä valoa (<500 nm) — kryptokromin
radikaaliparimekanismin diagnostinen sormenjälki. Inklinaatiokompassi
vahvistettu pystykomponentin kääntämisellä. Ensimmäinen käyttäytymistason
näyttö siitä, että CRY/RPM-magnetoreseptio on toiminnallinen ihmisessä.

BERM-merkitys: Osoittaa, että BERM:n ensisijaisen polun (C_RPM) biologinen
substraatti on olemassa ja toiminnallinen ihmisessä. Aiempi CRY/RPM-näyttö
oli Drosophilasta, linnuista ja planarioista.
```

### 3. Kausaaliketju: CausalChain.tsx ja kausaaliketju-ohjeet

**Tiedosto:** `components/CausalChain.tsx` (interaktiivinen kaavio)

**Muutos Polku B -nuolessa:**

Lisää Chae 2019 polku B:n evidenssilistaan. Kun käyttäjä klikkaa RPM/CRY-nuolta, evidenssipopupissa näkyy nyt:

```
Evidenssi:
- Ritz et al. 2004 (Nature): RF Larmor-taajuudella häiritsee lintujen kompassia [E]
- Engels et al. 2014 (Nature): Antropogeeninen EM-kohina häiritsee orientaatiota [E]
- Hore & Mouritsen 2016 (Annu Rev Biophys): RPM-katsaus [E]
- Sherrard et al. 2018 (PNAS): EMF aktivoi CRY-riippuvaisen polun Drosophilassa [M|C]
- Yoshii et al. 2009 (Nature): CRY-mutantit eivät reagoi → CRY on transduseri [M]
- Nat Comms 2024: FAD-superoksidi-radikaalipari [M|C]
- PNAS Nexus 2026: Ei-monotoniset RPM-ennusteet planarioissa [M|C]
→ UUSI: Chae et al. 2019 (PLOS ONE): Ihmisen CRY/RPM-magnetoreseptio toiminnallinen [M|C]
```

**Päivitä myös:** `BERM/EXTINCTIONFIELD_kausaaliketju_ohjeet.md` -projektidokumentti, Polku B -osio. Lisää Chae 2019 evidenssiluetteloon ja mainitse, että se vahvistaa substraatin olemassaolon ihmisessä.

### 4. Polku B:n episteeminen taso: harkittava nosto M|C → E

**BERM/BERM_recovery_RPM_excitable_integraatio.md** ehdottaa jo, että polku B:n episteeminen kokonaistaso nostettaisiin M|C → E perustuen Ritz 2004 + Engels 2014 yhdessä. Chae 2019 vahvistaa tätä nostoa lisäämällä ihmisdatan ketjuun:

Evidenssiketju on nyt:
1. Ritz 2004: RF häiritsee RPM:ää linnuissa → E
2. Engels 2014: Antropogeeninen EM-kohina häiritsee → E
3. Sherrard 2018: EMF aktivoi CRY-polun Drosophilassa → M|C
4. Nat Comms 2024: FAD-superoksidi-mekanismi → M|C
5. PNAS Nexus 2026: Ei-monotoniset ennusteet vahvistettu → M|C
6. **Chae 2019: Ihmisen CRY/RPM toiminnallinen → M|C**

Ketju kattaa nyt: mekanismi (RPM-teoria) → kokeellinen häiriö eläimissä → mekanistinen vahvistus → **ihmisen substraatti toiminnallinen**.

**Päätös:** Polku B kokonaisuutena voidaan perustella E-tasolle. Chae 2019 yksinään on M|C mutta se on "viimeinen pala" joka osoittaa, että koko ketju ulottuu ihmiseen.

**Varoitus:** Nosto E-tasolle on perusteltavissa POLUN KOKONAISUUDELLE, ei yksittäiselle tutkimukselle. Chae 2019 itsessään pysyy M|C-tasolla (pieni n, korjausilmoitus, ei replikoitu).

### 5. Model-sivu: CRY-polun kuvaus

**Tiedosto:** `app/[locale]/model/page.tsx`

**Nykytila:** Sivulla on CRY-polun kuvaus joka viittaa Drosophilaan ja lintuihin mutta ei ihmisdataan.

**Muutos:** Lisää CRY-polun kuvaukseen maininta ihmisdatasta:

EN:
```
The CRY/RPM pathway has supporting evidence across species: disruption of
magnetic compass in birds (Ritz 2004, Engels 2014), CRY-dependent signaling
in Drosophila (Yoshii 2009, Sherrard 2018), and — critically — functional
blue-light-dependent magnetoreception in humans (Chae et al. 2019, PLOS ONE),
confirming that the biological substrate exists in the species BERM models.
```

FI:
```
CRY/RPM-polulla on tukea useasta lajista: magneettikompassin häiriintyminen
linnuissa (Ritz 2004, Engels 2014), CRY-riippuvainen signalointi Drosophilassa
(Yoshii 2009, Sherrard 2018) ja — kriittisesti — toiminnallinen sinivalosta
riippuva magnetoreseptio ihmisessä (Chae ym. 2019, PLOS ONE), mikä vahvistaa
biologisen substraatin olemassaolon lajissa jota BERM mallintaa.
```

### 6. Predictions-sivu: SLEEP-1-ennusteen perustelu

**Tiedosto:** `app/[locale]/predictions/page.tsx`

**Muutos:** SLEEP-1 (`sleep-1-faraday-vs-bluefilter`) ennusteen perusteluosioon lisätään Chae 2019 mekanistisena tukena:

```
Mechanistic basis: Chae et al. (2019) demonstrated that human
magnetoreception requires blue light (400–500 nm), confirming cryptochrome
as the transducer. This implies two independent intervention points:
(1) blue-light filtering removes CRY activation (no radical pairs to
disrupt), and (2) Faraday shielding removes RF disruption (radical pairs
function normally). BERM predicts Faraday shielding is more effective
because it preserves natural CRY function while removing the disruptor,
whereas blue-light filtering removes the disruption by shutting down
the entire system.
```

### 7. Python-malli: dokumentaatiokommentti

**Tiedosto:** `berm/berm/v16.py`

**Lisäys:** `v17_cry_effect()` ja/tai `v17_cry_annual_response()` -funktioiden docstringiin:

```python
def v17_cry_effect(...):
    """CRY-mediated effect on biological capacity.

    The CRY/RPM pathway assumes functional cryptochrome magnetoreception
    in humans. This assumption is supported by Chae et al. 2019 (PLOS ONE
    14(2): e0211826), which demonstrated blue-light-dependent (400–500 nm)
    geomagnetic orientation in humans — the diagnostic signature of the
    radical pair mechanism in cryptochrome.

    Note: Chae 2019 establishes the substrate, not the disruption. RF
    disruption of human CRY is extrapolated from avian data (Ritz 2004,
    Engels 2014) and awaits discriminating tests D1–D3.

    DIAGNOSTIC_ONLY: ...
    """
```

### 8. Yöaltistusreitin dokumentaatio

**Tiedosto:** `berm/berm/v16.py`, funktio `v17_night_fraction()`

**Lisäys docstringiin:**

```python
def v17_night_fraction(country, year):
    """Night exposure fraction: smartphone_in_bedroom × (1 + WiFi × 0.3).

    Night exposure is critical because smartphone screens emit blue light
    (activating CRY radical pairs per Chae 2019) while simultaneously
    emitting RF fields (potentially disrupting those pairs per Ritz 2004
    and Engels 2014). This creates the specific conditions under which
    CRY is both active and vulnerable to RF interference.
    """
```

### 9. Diskriminoivien testien kontekstipäivitys

**Tiedosto:** `berm/berm/metadata.py`

**Ei muuteta arvoja** — `DISCRIMINATING_TESTS_COMPLETED` pysyy 0:ssa koska Chae 2019 ei testaa RF-häiriötä.

**Lisäys kommenttiin:**

```python
#: D1-D3 in docs/audit/DISCRIMINATING_TESTS.md. These test the primary branch
#: itself, which none of the 13 reviewed findings did.
#: Note: Chae et al. 2019 establishes that the CRY/RPM substrate is functional
#: in humans (necessary condition), but does not test RF disruption of that
#: substrate (sufficient condition). D1–D3 remain at 0/3.
DISCRIMINATING_TESTS_NEEDED = 3
DISCRIMINATING_TESTS_COMPLETED = 0
```

### 10. Projektidokumentaation päivitys

**Päivitä seuraavat projektidokumentit:**

**a) `BERM/BERM_recovery_RPM_excitable_integraatio.md`:**
Lisää Chae 2019 RPM-evidenssitaulukkoon riville 10:

```
| 10 | Chae ym. 2019 | Ihmisen CRY/RPM-magnetoreseptio toiminnallinen. Sinivaloriippuvainen (400–500 nm), inklinaatiokompassi. Ensimmäinen ihmisdata. | M|C |
```

**b) `BERM/EXTINCTIONFIELD_kausaaliketju_ohjeet.md`:**
Polku B -osioon lisätään Chae 2019 maininta ja sen merkitys substraatin vahvistamiselle.

**c) `BERM/LBERM_v16_mekanismien_mallinnus.md`:**
Yöaltistusreitin osioon lisätään viittaus Chae 2019:ään: sininen valo aktivoi CRY:n, mikä tekee yöaikaisesta puhelimen käytöstä erityisen merkityksellisen CRY-häiriön kannalta.

---

## TOTEUTUSJÄRJESTYS

```
1. Tarkista korjausilmoitus (PLOS ONE 14(10): e0223635, lokakuu 2019)
   → Jos korjaus koskee olennaista metodologista virhettä, arvioi uudelleen
   → Jos se on tekninen korjaus (kuva, taulukko, kirjoitusvirhe), jatka

2. references.json + references_full.json — lisää chae2019-merkintä

3. Evidence-sivu — Polku B -osion tutkimuskortti (EN + FI)

4. CausalChain.tsx — Polku B -evidenssipopup

5. model/page.tsx — CRY-polun kuvauksen päivitys (EN + FI)

6. predictions/page.tsx — SLEEP-1-ennusteen mekanistinen perustelu

7. v16.py — docstring-päivitykset (cry_effect, night_fraction)

8. metadata.py — kommenttipäivitys (ei arvomuutoksia)

9. Projektidokumentit (3 kpl) — viittausten lisäys

10. Harkitse Polku B:n episteemisen kokonaistason nostoa M|C → E
    → Tämä on kokonaisarvio, ei automaattinen seuraus yhdestä tutkimuksesta
    → Dokumentoi päätös ja perustelu
```

---

## VAROITUKSET

1. **Älä nosta yksittäisen tutkimuksen tasoa E:ksi.** Chae 2019 on M|C. Polun kokonaistaso voi olla E, mutta jokainen yksittäinen viite säilyttää oman tasonsa.

2. **Korjausilmoitus on tarkistettava.** Jos se koskee tilastollista menetelmää tai tulosten uudelleentulkintaa, evidenssitasoa voidaan joutua laskemaan M:ksi.

3. **Älä väitä, että tämä osoittaa RF-häiriön.** Se osoittaa substraatin. RF-häiriö ihmisessä on ekstrapolaatio linnuista (Ritz/Engels) joka odottaa diskriminoivia testejä.

4. **Sukupuolierosta varovaisesti.** Tutkimuksen sukupuoliero voi johtua glukoosivasteesta tai motivaatiosta, ei välttämättä CRY-herkkyydestä. Älä käytä tätä suorana tukena BERM:n sukupuolispesifisille kertoimille ilman lisäperustelua.

5. **Otoskoko on pieni (n=41).** Tämä on tunnustettava jokaisessa kontekstissa jossa tutkimukseen viitataan.
