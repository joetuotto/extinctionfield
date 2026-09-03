# BERM: sentinellidatan vaatimukset

Versio: 2026-08-19
Liittyy: [`data-lineage-audit.md`](data-lineage-audit.md) (löydökset A-9, A-10) ·
[`data-gap-register.md`](data-gap-register.md) (G-3, G-5, G-6, G-7) ·
[`sentinel-acquisition-register.md`](sentinel-acquisition-register.md) (lähteiden hankinta- ja käyttöehtotila) ·
[`sentinel-hindcast-protocol.md`](sentinel-hindcast-protocol.md) (BERM:n ehdollisen mittaus → avoin L2 → sentinelli → ihmisbiologia → ASFR/TFR -ketjun lukitus ja holdout)

**Tämä dokumentti erottaa kaksi tehtävää, joita ei saa sekoittaa.**

1. Kirjallisuus, sentinellihavainnot ja mitatut kenttäkerrokset ovat aktiivista
   evidenssiä BERM:n topologialle, kenttäluokalle, lajikohtaiselle
   siirtotoiminnolle, suunnalle, viiveelle ja herkkyydelle.
2. `berm/csli/`-moduulin kuusi F1–F6-kriteeriä ovat kapeampia,
   ennalta lukittuja **suoran sentinelli→ihmisendpoint-ketjun** testejä.
   Niistä nolla on vielä laskettu. Tämä ei poista ensimmäisen tason
   evidenssiä, mutta lajienvälisiä vaikutusennusteita ei saa nimetä
   FieldState-johdetuiksi ennen kuin endpoint-kohtainen L2-kuvaus on määritelty,
   kalibroitu ja validoitu.

Saatavilla olevat ei-ihmisrivit, eläinlääketieteelliset benchmarkit,
seminologiset aineistot, rekonstruoidut historialliset vertailusarjat ja
kirjallisuudesta johdetut viive-/herkkyyssäännöt säilyvät aktiivisina
discovery-kerroksina. Jos lähteen raakamuoto ei riitä kanoniseen havaintoriviin,
se säilyy konteksti- tai constraint-kerroksena eikä muutu keinotekoiseksi
numeeriseksi dataksi. Niiden arvo kasvaa, kun ne voidaan liittää mitattuun
kenttään samaan mikroympäristöön, liikkuvuuspainotettuun valuma-alueeseen tai
dokumentoituun paikallisalue-estimaattiin.

---

## 0. Suoran F1–F6-kriteerin minimiehto

Alkuperäisessä muodossaan yksikään F1–F6-kriteeri ei ole laskettavissa ennen
kuin seuraava paneeli on olemassa:

```
(alue, vuosi, laji, biologinen päätetapahtuma, E_RF, kemialliset kovariaatit)
```

Tällä hetkellä **`E_RF`-sarake puuttuu jokaisesta kanonisesta
sentinellitaulusta.** Erillinen ANFR:n mitattu `measured_rf_site_time`-kerros
(Ranska, 2020–2024) on silti aktiivinen FieldState-komponentti: sitä voidaan
siirtää ennalta määritellyllä liikkuvuus-/valuma-alue- tai paikallisalue-mallilla
ja käyttää lajikohtaisten vasteiden tutkimiseen. Se ei vielä muodosta
alkuperäisen F1–F6-määritelmän yhtä, kapeasti kohdistettua
`(alue, aika, laji, endpoint, E_RF)`-riviä.

Aiemmat käsin annetut RF-tasot ja järjestysluvut on poistettu varsinaisesta
vaikutuskertoimen sovituksesta. Tilalle ei aseteta nollaoletusta, vaan
evidenssirajoitettu ja useita prioriperheitä vertaileva FieldState-päättely.
Nykyinen `exposure_gradient_test()`-`BLOCKED` tarkoittaa vain, ettei se suorita
vanhaa, suppeaa gradienttikriteeriä ilman dokumentoitua mittausta ja
siirtogeometriaa.

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

`berm.data.sentinel_normalize` lukee tiedoston ja tuottaa siitä 92 kanonista,
provenanssilla varustettua riviä. Tämä ei muuta sarjaa alueelliseksi paneeliksi:
`berm/csli/species_data.py` käsittelee koiraa vain lähdevalmiuden kontekstina, ei
altistus- tai viive-estimaatin syötteenä.

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

## 3. Härät ja karjut

Härkä on suunniteltu **mahdolliseksi negatiiviseksi kontrolliksi**, mutta sitä ei voi
vielä käyttää sellaisena. Nykyinen artefakti on kirjallisuusrekisteri, ei kontrolliaineisto.

### Ensimmäinen: dataa ei ole
`data/sentinel/livestock_negative_control.json` sisältää **nolla numeerista havaintoa** —
kolme sitaattia, laadullisia trendimerkkijonoja (`"improving"`, `"no_systematic_time_trend"`)
ja tutkimusjaksot. Ei aikasarjaa, ei aluetta, ei maata.

Erillinen avoin Fernández-López ym. 2022 -karjuaineisto on hallussa
seminologia-benchmarkina: 221 inseminaatiotapahtumaa, 36 ejakulaattia ja
98 020 CASA-soluriviä yhdeltä Espanjan AI-asemalta maaliskuulta kesäkuuhun
2017. Se ei korvaa puuttuvaa kontrollipaneelia: aikajakso on neljä kuukautta,
asetelma on single-site eikä aineistossa ole RF-dosimetriaa, ympäristö- tai
kemiallisia kovariaatteja. Tarkka rajaus on
[`seminology-benchmark.md`](seminology-benchmark.md)-dokumentissa.

Hensel et al. (2026; verkossa 25.12.2025) -artikkelin PubMed-abstrakti vahvistaa
julkaisutason yhteenvetona 47 757 härkäejakulaattia (1997–2019) ja 619 368
karjuejakulaattia (2005–2023) sekä raportoidun nousun pitoisuudessa ja liikkuvuudessa.
Se **ei** toimita paikallista vuosittaista paneelia, aseman metadataa tai RF-mittausta.
Aiempien artefaktien ristiriita on siis korjattu: luvut ovat sallittuja vain
kirjallisuusyhteenvetona, eivät havaintoriveinä tai negatiivisen kontrollin tuloksena.

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

## 4. F1–F6: mitä kukin suora vertailu vaatii

Julkisessa valmiusartefaktissa kaikkien tila on `BLOCKED`. Tila tarkoittaa
**DIRECT_SENTINEL_CHAIN_PENDING**: alla kuvattua tarkkaa vertailua ei ole vielä
laskettu. Se ei ole evidenssipisteytys, biologinen nollatulos eikä kielto käyttää
sentinellejä yhdessä FieldState-, mekanismi- ja lajikohtaisen
siirtotoimintaevidenssin kanssa.

| Testi | Väite | Puuttuva data | Este |
|---|---|---|---|
| **F1** | `DogSperm_{r,t} → HumanSperm_{r,t+Δ}`, Δ > 0 ja johdonmukainen alueiden yli | Alueellinen koira- **ja** ihmisspermasarja | G-5, G-7, G-8 |
| **F2** | `R²(koira→ihminen) > R²(BKT/koulutus→ihminen)` | Sama + sosioekonomiset kovariaatit samalla tasolla | G-5, G-7 |
| **F3** | Härkäsperma **ei** ennusta ihmisspermaa | Pitkä, alueellisesti kohdistettava härkä-/karjuaikasarja — ei ole olemassa | G-6 |
| **F4** | `\|ΔDogSperm\| > \|ΔBullSperm\|` **ja** `E_dog > E_bull` mitattuna | RF-dosimetria molemmille ympäristöille | G-3, G-6 |
| **F5** | `CV(Δ_r) < 0.3` maiden yli | Monimaainen koira-aineisto | G-5 |
| **F6** | EMF-vaikutus säilyy PFAS/PCB/ftalaatti-kontrollin jälkeen | Kemialliset kovariaatit alue-vuosi-tasolla | uusi |

**F4 on huomionarvoinen:** se on ainoa testi, joka vaatii *mitattua* altistuseroa lajien
välillä. Aiempi käsin annetuista järjestysluvuista laskettu monotonisuusesitys on vedetty
pois. Nykyinen `exposure_gradient_test()` palauttaa `BLOCKED` eikä tuota altistusjärjestystä,
monotonisuutta tai “directionally consistent” -arviota.

---

## 5. Hankintajärjestys

1. **Ennalta kohdistettu RF-kenttämittaus ja biologinen paneeli** (G-3). ANFR:n kiinteiden
   antureiden mitattu kerros on hallussa, mutta ilman samaan paikkaan ja aikaan sidottua
   biologista päätetapahtumaa mikään F-testi ei ole laskettavissa, olipa kumpikin erillinen
   aineisto kuinka hyvä tahansa.
2. **Hanki härkä-/karjupaneeli** (G-6). Julkaisuabstraktien metadata ja yksi lyhyt benchmark on tarkistettu,
   mutta F3/F4 tarvitsevat yhä rivi- tai ainakin vuosi×asema-tason tulokset ja kovariaatit
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

Kunnes yllä oleva minimiehto täyttyy, seuraavat **nimenomaiset suoran
sentinelli→ihmisendpoint-ketjun väitteet** eivät ole vielä laskennallisesti
vahvistettuja eikä niitä saa esittää valmiina tuloksina:

- että mehiläisten talvikuolleisuus mittaa lisääntymiskykyä
- että koirasperman lasku ennakoi ihmisspermaa
- että paraneva härkäsiemendata on todiste RF-vaikutuksesta tai sen puutteesta
- että lajien välinen altistusgradientti on mitattu
- että mikä tahansa F1–F6-kriteeri on läpäisty tai hylätty

Tämä ei muuta sitä, että lähdekohtainen mekanismi-, eläin-, ekologia- ja
ihmisendpoint-evidenssi on aktiivinen ja voi tuottaa laajoja, eksplisiittisen
epävarmuuden sisältäviä posterioriprediktiivisiä ennusteitä. Koneellisesti
luettava auktoriteetti suorille F1–F6-kriteereille on
[`website/public/data/sentinel_readiness.json`](../../website/public/data/sentinel_readiness.json):
sen F1–F6-merkinnät ovat kaikki `BLOCKED`, ja se kertoo täsmälliset estekoodit
sekä seuraavat vaatimukset. Ne ovat suoran vertailun tilat, eivät BERM:n koko
evidenssin tai FieldState-signaalin tilat.

Kun paneeli on saatavilla, F1–F6:n jälkeen käytetään
[`sentinel-hindcast-protocol.md`](sentinel-hindcast-protocol.md)-protokollaa: se lukitsee
FieldState-, sentinelli-, elinmuisti- ja viiveparametrit ennen kuin ASFR/TFR-holdout
avataan. Näin sentinelli testaa BERM:n ennakkoindikaattoriketjua eikä valitse parametreja
jälkikäteen demografisen käyrän sopivuuden perusteella.
