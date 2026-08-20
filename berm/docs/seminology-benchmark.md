# Fernández-López 2022: boar-seminologian benchmark

Tila: valmis, erillinen benchmark-polku  
Versio: 2026-08-19  
Putki: seminology_benchmark@v1.0.0

Tämä on avoimen Fernández-López ym. -aineiston toistettava muunnos
seminologian analyysiä varten. Se ei ole suora FieldState-altistus- tai
CSLI-kerroinaineisto eikä yksin BERM:n ennustepolun syöte. Sen havaittu
CASA→inseminaatio-/porsimistulos on kuitenkin aktiivinen
siittiötoiminto→hedelmällisyys-siirtosuhteen ja mittausmallin evidenssi, joka
voidaan yhdistää myöhemmin FieldState-haaraan ilman että neljän kuukauden
single-site-aineistoa esitetään RF-vasteena.

Lähde on [Mendeley Data v5](https://doi.org/10.17632/jd38jhxpg6.5),
CC-BY-4.0. Siihen liittyvä julkaisu on
[Communications Biology 2022](https://doi.org/10.1038/s42003-022-03954-0).
Artikkelin menetelmä kuvaa aineiston Batallé S.A.:n kaupalliseksi
keinosiemennysasemaksi Riudarenesissa, Gironassa, Espanjassa.

## Mitä aineistossa oikeasti on

| Taso | Raakarivit | Normalisoitu tuote | Havaintoyksikkö |
|---|---:|---:|---|
| Hedelmöitys | 221 | 221 | yksi lähteen inseminaatiotapahtuma |
| CASA | 98 020 | 36 | yksi boari × ejakulaatti -yhteenveto |

17 nuorta Pietrain-karjua ja 36 ejakulaattia kattavat ainoastaan
maaliskuun ja kesäkuun 2017 välisen jakson. CASA-riveillä on pään pinta-ala
sekä VCL, VSL, VAP, LIN, STR, WOB, ALH ja BCF. Muunnos ei hävitä
nonmotile-rivejä: 69 170 solua on täydellisen kinemaattisen vektorin
perusteella motiileja ja 28 850 lähteen NA-vektorin perusteella nonmotileja.

Hedelmöitysosassa säilyvät karju-, emakko- ja ejakulaattitunnisteet,
siemennys- ja keräyspäivä, pariteetti sekä kokonais-, kuolleena- ja
elävänä syntyneiden määrä. Lähteen Success-sarake tallennetaan nimellä
success_binary_as_deposited. Mendeleyn metatieto kutsuu sitä raskaudeksi,
kun taas artikkelissa vasteesta puhutaan farrowing rate -terminä. Muunnos ei
päätä kumpi tulkinta on oikea, vaan merkitsee jokaisen rivin
UNRESOLVED_METADATA_PREGNANCY_VS_ARTICLE_FARROWING_RATE-tilaan.

Kaksi CASA-ejakulaattia ei vastaa yhtäkään julkaistun fertility_data.csv:n
tapahtumaa. Ne jäävät yhteenvetoon näkyviin NO_MATCHING_FERTILITY_EVENTS-
lipulla, eivätkä muutu nolliksi tai imputoiduiksi havainnoiksi.

## Raakadatan lukitus

Raakatiedostot ovat gitin ulkopuolella hakemistossa
berm/data/raw/veterinary/fernandez_lopez_2022_sperm_move_v5/. Niitä ei
muokata eikä formatioida. Versionoitu manifesti on
berm/data/raw/manifests/fernandez_lopez_2022_sperm_move_v5_2026-08-19.manifest.json.

| Tiedosto | Tavua | SHA-256 |
|---|---:|---|
| fertility_data.csv | 16 023 | 2fab5d6a49e15aba781598f80a4b39817683fa1b6f369336d935777d7a70b348 |
| sperm_data.csv | 5 045 129 | 68c3bd13659f521b9e02c1f26639826d21a5e3c93d564aaf910095261660fd38 |

Lähde on rekisterissä tunnuksella FERNANDEZ_LOPEZ_2022_BOAR_BENCHMARK.
Registry-rivin ensisijainen tarkistussumma on sperm_data.csv; molempien
tiedostojen tarkistussummat ovat manifestissa.

## Tuotteet ja skeema

Muunnos kirjoittaa vain uudelleenrakennettavat, gitissä sivuutetut tiedostot:

| Tiedosto | Rivejä | Avain |
|---|---:|---|
| seminology_boar_insemination_events.csv | 221 | event_id |
| seminology_boar_ejaculate_summary.csv | 36 | ejaculate_key |
| seminology_boar_benchmark_summary.json | 1 | skeema- ja rivimääräyhteenveto |

Konekielinen skeema on
berm/data/schemas/seminology_boar_benchmark.schema.json. Se lukitsee
raakarivimäärät, tarvittavat provenance-kentät ja sen, että status on
BENCHMARK_ONLY_NOT_SENTINEL sekä F1--F6-tila NOT_ELIGIBLE. Nämä ovat suoran
FieldState→endpoint-kalibroinnin rajoja, eivät CASA- ja fertiiliyspäätetapahtuman
merkityksen hylkäys.

Rakennus komentoriviltä:

    cd berm
    python -m berm.data.seminology_benchmark

Kirjoittaja sallii olemassa olevan, tavultaan identtisen tuotteen. Jos
raakatiedosto tai manifesti on aidosti vaihtunut, muuttunutta tuotetta ei
ylikirjoiteta ilman erikseen annettua --replace-lippua.

## Miksi tämä ei ole F1--F6-testi

| Vaatimus | Täyttääkö tämä aineisto? | Syy |
|---|---|---|
| Pitkä viivepaneeli | Ei | ajallinen ikkuna on neljä kuukautta |
| Paikka- tai aluekontrasti | Ei | yksi tunnistettu kaupallinen asema |
| RF/EMF-annos tai validoitu kenttäproxy | Ei | ei dosimetriaa eikä altistusmittausta |
| Ympäristö- tai tuotantokovariaatit | Ei | ei sää-, kemikaali-, rehu-, eläintauti- tai husbandry-paneelia |
| Lajivertailu ihmisen kanssa | Ei | ei kohdistettavaa ihmis- tai toisen lajin paneelia |

Siksi benchmarkin oikea käyttö on tarkistaa, että myöhempi
semen-feature-to-fertility-malli on teknisesti reprodusoitava, että
solutasolta ejakulaattitasolle tehty aggregointi on eksplisiittinen ja että
raakalähteen outcome-määritelmän epävarmuus säilyy näkyvänä. Se voi päivittää
eläinlajin endpoint-siirtoa ja mittausmallia, mutta sen käyttäminen yksinään
EMF-vaikutuskertoimen tai alueellisen sentinelliviiveen näyttönä olisi
asetelman ylitulkintaa.

## Seuraava hankinta

Seuraava relevantti askel ei ole lisää pieniä laboratorioaineistoja vaan
vähintään viiden vuoden tai usean aseman numeerinen paneeli, jossa on
ejakulaatti- tai hedelmällisyysvaste, paikka, päivämäärä sekä
tuotanto-/ympäristökonteksti. Kootut ACCESS_REQUIRED-kandidaatit ovat
[seminology-candidate-ledger.md](seminology-candidate-ledger.md)-tiedostossa.
