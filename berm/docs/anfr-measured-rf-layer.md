# ANFR: mitattu ambientti-RF-kerros

Tila: valmis, erillinen mittauskerros  
Versio: 2026-08-19  
Putki: `anfr_autonomous_probes@v1.0.0`

Tämä kerros jäädyttää Ranskan Agence nationale des fréquencesin (ANFR)
autonomisten, kiinteiden anturien julkaistut kenttävoimakkuusmittaukset.
Se on **mitattu ambientti-RF**, ei vielä henkilökohtainen, eläin- tai
elinannos. Kerros on BERM:n aktiivinen fyysinen FieldState-komponentti:
sitä voidaan käyttää lajikohtaisten vastehypoteesien, paikallisten
liikkuvuus-/valuma-alue-estimaattien ja posterior-prediktiivisten signaalien
muodostamiseen. Se ei yksin määritä biologista vaikutuskerrointa, CSLI:tä tai
F1–F6:n kapeaa, suoraa endpoint-estimaattia.

Lähde: [ANFR — Mesures sondes autonomes](https://data.anfr.fr/visualisation?id=mesures-sondes-autonomes),
Licence Ouverte v2.0 (Etalab).

## Hallussa oleva julkaisuerä

| Ominaisuus | Arvo |
| --- | --- |
| Raakahavaintoja | 1 474 010 |
| Kiinteitä mittauspaikkoja | 158 |
| Ajallinen kattavuus | 2020–2024 |
| Mitattu suure | `e_volt_par_metre` / V/m |
| Julkaistut sijaintikentät | kaupunki, postinumero, osoite, anturitunnus, lat/lon |
| Raakamuoto | yksi CKAN-metadatavastaus ja 15 täsmällistä Data4Citizen API -vastaussivua |
| Raakajulkaisun lukitus | [`anfr_autonomous_probes_2026-08-19.manifest.json`](../data/raw/manifests/anfr_autonomous_probes_2026-08-19.manifest.json) |

Raakabittejä ei muotoilla uudelleen: ne ovat Gitissä sivuutetussa
`data/raw/rf/anfr_autonomous_probes_2026-08-19/`-hakemistossa, ja manifesti
lukitsee jokaisen 16 tiedoston koon sekä SHA-256-tarkistussumman.

## Normalisoitu tuote

`berm.data.anfr_rf` kirjoittaa Gitissä sivuutetun
`data/processed/anfr_autonomous_probes_site_time.csv`-tuotteen. Sen avain on
`(geography_id, observation_datetime)`, yksikkö `V_per_m` ja mittausluokka
`OBSERVED`. Jokainen rivi sisältää lähteen anturitunnuksen, julkisen
sijaintitiedon, lähteen aikaleiman, mittausgeometrialipun ja
`NOT_JOINED_TO_BIOLOGY`-tilan.

Tuotteen tarkistettu SHA-256 on
`59cc17bf1ba8caf5572797859f3384885f58d5ab1a4bf2ab01a2a695c8edbc90`.
Konekielinen yhteenveto on
`data/processed/anfr_autonomous_probes_summary.json`.

### Aikaleimat

1 464 129 riviä käyttää lähteen `DD/MM/YYYY HH:MM`-muotoa. 9 881 riviä on
julkaistu Excelin 1900-päiväjärjestelmän sarjapäivänä (esim. `45253,04593`).
Ne eivät jää pois aineistosta: alkuperäinen arvo säilyy
`source_local_datetime`-kentässä ja normalisoitu rivi saa tilan
`EXCEL_1900_SERIAL_CONVERTED_FROM_PUBLISHED_VALUE`. Koska lähde ei ilmoita
aikavyöhykettä, mitään UTC-oletusta ei tehdä.

## Mitä kerros kertoo — ja mitä se ei vielä yksin ratkaise

- Kiinteän anturin ambienttikenttä ei ole automaattisesti elimen, eläimen tai
  henkilön annos; muunnos tehdään organisaatio-/lajikohtaisella
  siirtotoiminnolla ja liikkuvuusgeometrialla.
- Kerros ei sisällä valmista eläinlääketieteellistä, seminologista, mehiläis-
  tai ihmisbiologista päätetapahtumaa. Se voi silti yhdistyä niihin
  liikkuvuuspainotetun valuma-alueen tai paikallisalue-estimaatin kautta,
  kun kyseinen ristiintaulukko ja sen epävarmuus dokumentoidaan.
- Putki ei tee piilointerpolointia, maakeskiarvoa, viivevalintaa tai
  väestöllisen vaikutuskertoimen sovitusta. Nämä ovat erillisiä,
  näkyviä mallivalintoja, joita arvioidaan useilla leveillä prioriperheillä.
- Nykyinen 2020–2024 kattavuus ei yksin ole historiallinen RF-vastin
  COLOSSin 2012–2020 talvikuolleisuuksille, mutta se antaa mitatun
  paikallisen mittakaavan, jonka avulla myöhemmät ekologia- ja
  biologiapaneelit voidaan ankkuroida.

F1–F6:n nykyinen `BLOCKED`-merkintä tarkoittaa vain, että niiden alkuperäinen
**suora, ennalta lukittu sentinelli→ihmisendpoint-kriteeri** ei ole vielä
arvioitavissa. Se ei ole ANFR-kerroksen, muun biologisen evidenssin tai
lajikohtaisten FieldState-ennusteiden kielto. Seuraava korkean informaation
vaihe on biologinen paneeli joko samoilla paikoilla tai ennalta määritellyllä,
liikkuvuuspainotetulla paikallisalueella; silloin kenttä-, organismi- ja
päätetapahtumaepävarmuus voidaan kaventaa ilman että jo olemassa oleva
signaali hylätään.

## Toistaminen

```text
cd berm
python -m berm.data.anfr_rf acquire --release-id anfr_autonomous_probes_YYYY-MM-DD
python -m berm.data.anfr_rf normalize
```

Uusi lataus tarvitsee uuden julkaisuerätunnuksen. Normaali muunnos kieltäytyy
ylikirjoittamasta tavultaan muuttunutta johdetta ilman erillistä `--replace`-
lippua.
