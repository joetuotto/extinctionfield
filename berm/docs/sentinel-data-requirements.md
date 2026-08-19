# BERM: sentinellidatan vaatimukset

Versio: 2026-08-19
Liittyy: [`data-lineage-audit.md`](data-lineage-audit.md) (löydökset A-9, A-10) ·
[`data-gap-register.md`](data-gap-register.md) (G-3, G-5, G-6, G-7)

**Tätä työpakettia ei merkitä suoritetuksi kirjallisuusviitteiden perusteella.** Sitaatti
ei ole aineisto. Nykytilassa `berm/csli/` sisältää kuusi falsifikaatiokriteeriä, joista
**nolla on suoritettu**, ja kaksi viidestä sentinellitiedostosta on orpoja: yksikään
koodipolku ei avaa niitä.

---

## 0. Yhteinen minimiehto

Yksikään F1–F6-testi ei ole laskettavissa ennen kuin seuraava paneeli on olemassa:

```
(alue, vuosi, laji, biologinen päätetapahtuma, E_RF, kemialliset kovariaatit)
```

Tällä hetkellä **`E_RF`-sarake puuttuu jokaisesta sentinellitaulusta.** Kaikki RF-viittaukset
`berm/csli/`-hakemistossa ovat merkkijonoja (`"low"`, `"medium (base stations)"`, `"high"`)
tai käsin annettuja järjestyslukuja. `falsification.py:160` toteaa tämän itse:
*"No measured RF dosimetry for any species environment"*.

Kanoninen kohdetaulu on `sentinel_species_region_year`
([`contracts.py`](../berm/data/contracts.py)), jonka lisäsarakkeet ovat `species` ja
`endpoint`. Jokainen rivi kantaa lähteen, yksikön, mittausluokan ja epävarmuuden kuten
mikä tahansa kanoninen havainto.

---

## 1. Mehiläiset

### Nykytila
`data/sentinel/coloss_winter_loss.json`: 216 alue-talvi-havaintoa, 43 aluetta, mukaan
lukien **ainoa alakansallinen aineisto koko repossa** (GBR-ENG/SCT/WLS/NIR). Aineisto on
aito ja siteerattu.

### Rajoitteet, jotka on kirjattava
- **Talvikuolleisuus ei ole spermatesti eikä lisääntymismittari.** Sitä ei saa esittää sellaisena
- Sekamenetelmä: USA on BIP/AIA, EPILOBEE 2012–14 ovat painottamattomia tarhakohtaisia keskiarvoja
- Vain USA kattaa koko jakson; muut rajoittuvat väliin 2012-13…2019-20
- Tiedoston `winters_covered`-kenttä listaa 7 talvea, mutta `data`-lohkossa on 19 — kenttä on vanhentunut
- 4 UK-aluetta pudottavat EMF-liitoksessa, koska proxy on vain kansallisella tasolla

### Vaadittu laajennus
Mehiläinen mallinnetaan **omana ekologisena sentinellinään**, ei ihmisen sijaisena:

```
E_apiary → queen/brood/colony vitality → winter loss
```

| Muuttuja | Miksi | Ehdokaslähde |
|---|---|---|
| `queen_failure` | Suora lisääntymispäätetapahtuma; talvikuolleisuus ei ole | COLOSS-kyselyiden laajennetut kysymykset |
| `brood_area` | Pesueen tuotto | Kansalliset tarhausohjelmat |
| `colony_growth`, `swarming` | Populaation dynamiikka | Sama |
| `varroa_load` | **Vahvin tunnettu sekoittaja**; ilman tätä mikään yhteys ei ole tulkittavissa | COLOSS, kansalliset seurannat |
| `pathogen_markers` | DWV, Nosema | Kansalliset seurannat |
| `pesticide_exposure` | Neonikotinoidit; kilpaileva selitys | EU pesticide use -tilastot |
| `forage_availability`, `land_use` | Maatalouden intensiivisyys | CORINE Land Cover (avoin) |
| `weather` | Talven ankaruus selittää talvikuolleisuutta suoraan | ERA5 (avoin) |
| `ambient_RF_proxy_or_measurement` | **Puuttuu kokonaan** | Kansalliset kenttämittausrekisterit |

Ilman varroaa, patogeenejä, torjunta-aineita ja säätä mikä tahansa RF-korrelaatio
talvikuolleisuuteen on tulkinnaltaan sekoittunut neljällä tunnetulla mekanismilla.

---

## 2. Koirat

### Nykytila
`data/sentinel/lea2016_dog_sperm.json`: **yksi jalostuspopulaatio, yksi laitos, yksi maa**
(Guide Dogs for the Blind Association, UK), 1988–2014, 24 validia vuotta.

Arvot on **digitoitu kuvaajista** (Kuva 1 ja 2a), lukutarkkuus ±2–3 yksikköä, ja ne ovat
monitasomallien estimoituja keskiarvoja, eivät raakahavaintoja.

**Yksikään moduuli ei avaa tätä tiedostoa.** `berm/csli/species_data.py:92` toistaa trendit
käsin kirjoitettuina merkkijonoina (`"declining"`, `"not measured in Lea"`).

### Vaadittu laajennus
Tavoite on toteuttaa:

```
DogSperm_{r,t} → HumanSperm_{r,t+Δ}
```

Tämä vaatii **samalta alueelta ja samalta ajalta myös ihmisen biomarkkerisarjan** — eikä
sellaista ole (G-7: ihmissarja on rekonstruoitu, 24 maata, ei alakansallista tasoa).

| Muuttuja | Nykytila |
|---|---|
| `dog_region_year` | **Puuttuu** — aineisto on yksi laitos, ilman `iso3`-avainta |
| `breed`, `age` | Julkaisussa mallinnettu, ei JSONissa |
| `semen_motility` | On (digitoitu) |
| `morphology` | On (digitoitu) |
| `concentration` | Osin (`total_output_millions`) |
| `DNA_fragmentation` | **Puuttuu** |
| `cryptorchidism` | On, 1995–2014 |
| `kennel_environment`, `diet`, `disease` | **Puuttuvat** |
| `RF_dosimetry_or_validated_proxy` | **Puuttuu** |

### Vaikutus falsifikaatiotesteihin
- **F1** (koira→ihminen-viive): ei laskettavissa. Vaatii alueellisen paneelin molemmista lajeista
- **F2** (koira vs. sosioekonominen R²): ei laskettavissa
- **F5** (spatiaalinen johdonmukaisuus, `CV(Δ_r) < 0.3`): ei laskettavissa yhdellä alueella. Rekisteri myöntää tämän itse: *"Multi-country dog sperm data (not yet available)"*

---

## 3. Härät

Härkä on tarkoitettu **negatiiviseksi kontrolliksi**. Sillä on kaksi ongelmaa.

### Ensimmäinen: dataa ei ole
`data/sentinel/livestock_negative_control.json` sisältää **nolla numeerista havaintoa** —
kolme sitaattia, laadullisia trendimerkkijonoja (`"improving"`, `"no_systematic_time_trend"`)
ja tutkimusjaksot. Ei aikasarjaa, ei aluetta, ei maata.

Kaikki kolme lähdettä ovat `ACCESS_REQUIRED`. Hensel 2025 on merkitty
`"data_available": false` ja *"Full text not accessible at extraction time"*.

### Toinen: ratkaisematon ristiriita
`berm/csli/species_data.py:149` liittää `n_ejaculates = 47 757`, jakso 1997–2019, viitteeseen
Hensel 2025 — samaan viitteeseen, jonka JSON merkitsee saavuttamattomaksi ja ilman dataa.
Sama JSON antaa naudan jaksoksi 1965–2007.

**Tämä ristiriita on ratkaistava ennen kuin viitettä käytetään missään.** Toinen artefakteista
on väärässä.

### Kolmas: sekoittajat ovat poikkeuksellisen vahvat
Tuotantoeläinten jalostus ja keinosiemennysasemien kehitys ovat 1965–2020 muuttuneet
radikaalisti. Geneettinen valinta on nimenomaisesti valinnut siemennesteen tuotto-ominaisuuksia.

**Paranevaa härkäsiemendataa ei saa tulkita RF-todisteeksi.** Sen tehtävä on testata, onko
väitetty koira–ihminen-kontrasti yhä olemassa, kun jalostus, hallinta ja *mitattu* altistus
otetaan huomioon.

### Vaadittu aineisto
```
bull_station_year · bull_id · breed · age · genetic_selection_index
semen_concentration · motility · morphology · DNA_fragmentation_if_available
collection_protocol · freezing_protocol · nutrition · temperature · disease · housing
RF_dosimetry_or_validated_proxy
```

`genetic_selection_index` ja `collection_protocol` eivät ole valinnaisia. Ilman niitä
mikä tahansa härkätrendi on tulkinnaltaan sekoittunut jalostukseen.

---

## 4. F1–F6: mitä kukin vaatii

Kaikkien tila on `untested`. Yksikään ei ole toteutettuna funktiona.

| Testi | Väite | Puuttuva data | Este |
|---|---|---|---|
| **F1** | `DogSperm_{r,t} → HumanSperm_{r,t+Δ}`, Δ > 0 ja johdonmukainen alueiden yli | Alueellinen koira- **ja** ihmisspermasarja | G-5, G-7, G-8 |
| **F2** | `R²(koira→ihminen) > R²(BKT/koulutus→ihminen)` | Sama + sosioekonomiset kovariaatit samalla tasolla | G-5, G-7 |
| **F3** | Härkäsperma **ei** ennusta ihmisspermaa | Härän aikasarja — ei ole olemassa | G-6 |
| **F4** | `\|ΔDogSperm\| > \|ΔBullSperm\|` **ja** `E_dog > E_bull` mitattuna | RF-dosimetria molemmille ympäristöille | G-3, G-6 |
| **F5** | `CV(Δ_r) < 0.3` maiden yli | Monimaainen koira-aineisto | G-5 |
| **F6** | EMF-vaikutus säilyy PFAS/PCB/ftalaatti-kontrollin jälkeen | Kemialliset kovariaatit alue-vuosi-tasolla | uusi |

**F4 on huomionarvoinen:** se on ainoa testi, joka vaatii *mitattua* altistuseroa lajien
välillä. Nykyinen `exposure_gradient_test` tarkistaa monotonisuutta käsin annetuista
järjestysluvuista (`rank` 1–4 merkkijonojen `"low"`…`"highest"` yli). Se ei ole F4, eikä
sitä pidä raportoida F4:nä.

---

## 5. Hankintajärjestys

1. **RF-kenttämittaukset** (G-3). Ilman `E_RF`-saraketta mikään F-testi ei ole laskettavissa,
   olipa biologinen data kuinka hyvää tahansa. Ofcom, BNetzA, ANFR ja Traficom julkaisevat
   paikkatietoisia mittauksia avoimesti
2. **Ratkaise härkäristiriita** (G-6). Ei vaadi uutta dataa, vain sen toteamista, kumpi
   artefakti on väärässä
3. **Alueellinen ihmisbiomarkkerisarja** (G-7). Levine 2023:n tutkimustason liitetaulukko,
   `ACCESS_REQUIRED`
4. **Monimaainen koira-aineisto** (G-5). Vaatii todennäköisesti uutta yhteistyötä
   eläinlääkäriverkostojen kanssa; ei ole olemassa julkisena aineistona
5. **Mehiläiskovariaatit** (G-20). Suurin osa on avointa (ERA5, CORINE, COLOSS-laajennukset)
6. **Härkäjulkaisut** (Wahl, Karoui, Hensel). Kaikki `ACCESS_REQUIRED`

Kohdat 1, 2 ja 5 ovat tehtävissä ilman julkaisijalupaa. Kohdat 3, 4 ja 6 vaativat joko
institutionaalisen pääsyn tai uuden aineistonkeruun.

---

## 6. Merkintäsääntö

Kunnes yllä oleva minimiehto täyttyy, seuraavat väitteet **eivät ole tuettuja** eikä niitä
saa esittää dokumentaatiossa, käyttöliittymässä eikä mallin ulostulossa:

- että mehiläisten talvikuolleisuus mittaa lisääntymiskykyä
- että koirasperman lasku ennakoi ihmisspermaa
- että paraneva härkäsiemendata on todiste RF-vaikutuksesta tai sen puutteesta
- että lajien välinen altistusgradientti on mitattu
- että mikä tahansa F1–F6-kriteeri on läpäisty tai hylätty

`berm/csli/falsification.py` tulostaa nykyisin rehellisesti *"Status: 0/6 tests executed"*
ja *"All tests require regional data not yet available."* Tämä on oikea muotoilu ja se on
säilytettävä.
