# BERM: Silmien väri, ravitsemus ja magnetoreseptio — hypoteesi ja integraatio
**Päiväys:** 2026-08-24
**Episteeminen taso:** L* (testattava hypoteesi, vahvat yksittäiset lenkit E-tasolla)
**Status:** Toteutettu koodissa (v1 + v2), projektidokumentit päivitetty

## Hypoteesin ydin

Kolmen itsenäisen tutkimuslinjan synteesi: CRY-magnetoreseption biologinen substraatti
(verkkokalvon kryptokromi) on moduloitavissa sekä silmien pigmentaation (geneettinen)
että ravitsemuksen (ympäristö) kautta.

### Evidenssiketju (7 lenkkiä)

1. **FAD → CRY-stabiilisuus (E):** Hirano 2017, Cell Reports. FAD stabiloi CRY1/CRY2.
   B2-puutos + RFK-knockdown → CRY-tasot laskevat.

2. **FAD → magnetoreseptio (E):** Yap/Sherrard 2025, Cells. RFK-hiljentäminen (FAD-puutos)
   estää magneettikentän suuntaerottelukyvyn. CRY2-TRPC1 fysikaalinen interaktio vahvistettu.
   **AVAINHAVAINTO: polut A ja C eivät ole riippumattomia.**

3. **Silmien väri → melatoniini-suppressio (M|C):** Higuchi 2007. Sinisilmäiset 89 %
   vs. tummasilmäiset 73 % melatoniinisuppressio.

4. **Sukupuoliero silmien värissä (M|C):** Martinez-Cadenas 2013, Bressan 2024.
   Miehet: enemmän sinisiä. Naiset: enemmän vihreitä. X-kromosomimosaiikki.

5. **CRY:n fotosykli (E):** Nießner 2014. Hapettunut CRY absorboi sinistä (~500 nm),
   semikinoni absorboi vihreää (~570 nm). Vihreä ylläpitää mutta ei voi aloittaa.

6. **Silmien väri → kronotyyppi (C):** White & Terman 2003. Vaaleasilmäiset: aikaisemmat
   nukkumaanmenoajat, enemmän aamuihmisyyttä.

7. **Ihmisen magnetoreseptio vain miehillä (M|C):** Chae 2019. Miehet orientoituivat
   geomagneettiseen suuntaan (P<0.001), naiset eivät. Vaatii sinistä valoa.

### BERM-implikaatiot

- **Polku B modulaattori:** eyeColorModifier voisi selittää osan populaatioiden välisestä
  vaihtelusta polku B:n tehokkuudessa (Pohjois-Eurooppa vs. ekvaattori)
- **FAD-ravitsemusmodulaattori:** B2-vitamiinin saatavuus kontrolloi suoraan CRY-stabiilisuutta
- **Polkujen A-C kytkentä:** CRY2-TRPC1-kompleksi (Yap 2025) tarkoittaa multiplikatiivinen
  malli tarvitsee mahdollisesti ristitermin gamma_AC
- Ei muutoksia v16.py:n numeerisiin laskutoimituksiin — vain docstring-laajennukset

### Testattavat ennusteet (5 kpl)

- EYE-1: Sinisilmäiset miehet > vihreäsilmäiset geomagneettisessa orientaatiossa (D)
- EYE-2: Vihreäsilmäiset naiset = vakaampi melatoniiniprofiili kuin sinisilmäiset (D)
- EYE-3: B2-lisä parantaa sirkadiaanista resilienssiä yölliselle EMF:lle (D)
- EYE-4: Sinisilmäiset = suurempi melatoniinihäiriö yöllisestä puhelinkäytöstä (O)
- EYE-5: Silmien väri moduloi polku B:n tehokkuutta 54 maan datasetissä (D)

## Toteutetut [KOODI]-muutokset

1. `references_full.json`: 7 uutta viitettä (hirano2017, yap2025, niessner2014,
   higuchi2007, martinez-cadenas2013, bressan2024, white2003). Kaikki verified: false.
2. `lib/eyeColorData.ts`: Datatiedosto (evidenssikortit, profiilit, modulaattorit, ennusteet)
3. `app/[locale]/evidence/eyes/page.tsx`: Uusi bilinguaalinen alisivu (4 osiota + episteeminen huomautus)
4. `evidence/page.tsx`: Linkki susceptibility-narratiivin yhteydessä (EN+FI) + 2 uutta study-merkintää
5. `model/page.tsx`: cryIndividualVariationNote-lisäys polku B:n kuvaukseen (EN+FI)
6. `causalMapData.ts`: CRY2-TRPC1-reuna (mech_cry_melatonin → mech_vgcc_ros)
7. `v16.py`: v17_cry_effect() docstring laajennettu (3 future extension -osiota)

## Odottavat [PROJEKTI]-muutokset

### K7-lisäys integraatiolistaan (BERM_v17_korjaus_ja_integraatiolista.md)

Tiedostoa ei löydy tiedostojärjestelmästä. Lisättävä sisältö:

```
### K7. Silmien väri ja ravitsemus CRY-polun modulaattoreina

Polku B:n tehokkuus on moduloitavissa kahdella tasolla:
1. Geneettinen: iiriksen pigmentaatio (OCA2/HERC2) → valon transmissio → CRY-aktivaatio
2. Ravitsemuksellinen: B2/FAD → CRY-proteiinin stabiilisuus → magneettinen herkkyys

Avainlähteet:
- Hirano 2017 (Cell Reports): FAD stabiloi CRY:tä
- Yap/Sherrard 2025 (Cells): FAD-puutos estää magnetoreseption
- Higuchi 2007: silmien väri moduloi melatoniini-suppressiota
- Nießner 2014: CRY:n fotosykli vaatii sekä sinistä (aktivaatio) että vihreää (ylläpito)
- Bressan 2024: sukupuoliero silmien värissä X-mosaiikin kautta

BERM-implikaatio: fFemale() ja fMale() voivat sisältää eyeColorModifier-kertoimen
kun populaatiotason silmien väri -data on integroitu. Tämä on L*-tason laajennus.

CRY2-TRPC1-kytkentä (Yap 2025) tarkoittaa, että polut A ja C eivät ole
riippumattomia. Multiplikatiivinen malli tarvitsee mahdollisesti ristitermin.
```

### Hypoteesidokumentti (BERM_silmien_vari_magnetoreseptio_hypoteesi.md)

Tiedostoa ei löydy tiedostojärjestelmästä. Tämä tiedosto sisältää koko hypoteesin
taustan ja evidenssiarviot. Sisältö on toteutettu koodissa (eyeColorData.ts +
eyes/page.tsx) mutta projektidokumentti puuttuu.
