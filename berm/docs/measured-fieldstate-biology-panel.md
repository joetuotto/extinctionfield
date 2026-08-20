# Lukittu mitattu FieldState–biologia-paneeli

Tämä on BERM v2 -reitin ensimmäinen laskettava kausaalinen aineistoraja:

```text
mitattu paikallinen FieldState
  -> nimetty elin-/reseptorisiirto
  -> mitattu sentinel- tai ihmisbiologinen päätepiste
  -> ennen demografista tulosavausta lukittu päätepistekalibrointi
```

Sopimus ei arvioi TFR:ää eikä sovita EMF-kerrointa. Sen tehtävä on varmistaa,
että myöhempi vaste-estimaatti voidaan jäljittää samaan paikkaan, aikaan,
mittausgeometriaan ja muuttumattomaan lähdeartefaktiin. Näin BERM:n Lindgren-
kerros säilyy fysikaalisena lähtökohtana eikä muutu maakohtaiseksi
teknologia- tai hedelmällisyysproxyksi.

## Ulkoinen sopimus

Kieliriippumaton manifesti on
[`measured_fieldstate_biology_panel.schema.json`](../data/schemas/measured_fieldstate_biology_panel.schema.json).
Pythonin auktoritatiivinen tarkastus on
[`measured_fieldstate_biology.py`](../berm/data/measured_fieldstate_biology.py).

Manifestissa vaaditaan:

- vähintään yksi mittausvalmis FieldState-havainto sekä sen lähteet;
- vähintään yksi **SENTINEL**- ja yksi **HUMAN**-biologinen havainto;
- `fieldstate_measurement_bindings`-sivutaulu: yhden FieldState-havainnon
  tarkka `site_id`, `geography_id`, biologinen kohde, ikkuna,
  mittausgeometria, kattavuus sekä fyysisen artefaktin ja lähdemanifestin
  SHA-256-tunnisteet;
- ennalta nimetty FieldState–biologia-pari ja sen häiriötekijäaineistot;
- päätepistekohtainen `EndpointExposureRule`: altistuksen kertymä- ja
  viiveikkuna on biologinen sääntö, ei TFR-sovituksesta valittu viive;
- vähintään yksi `SentinelHumanLeadLagLink`, joka lukitsee positiivisen
  sentinelli → ihmisbiologia -viiveen ennen demografisten tulosten avaamista;
- ennen tulosavausta lukittu päätepistekalibrointi sekä ajallinen ja
  maantieteellinen pidäke.

Sidecar on tarkoituksellinen: pelkkä maan, lähimmän mittapisteen tai
vuosikeskiarvon yhteensopivuus ei riitä. Pairi on kelvollinen vain, kun
FieldState-havainto, sitoumus, biologinen havainto ja parin säännöt ovat
saman paikan, kohteen, mittausgeometrian ja aikaikkunan mukaisia.

## Demografinen raja

Paneelin `upstream_lock_status` on aina
`LOCKED_BEFORE_DEMOGRAPHIC_UNBLINDING`. Skeema ei hyväksy ASFR-, TFR-, kysyntä-,
tempo-, pariteetti-, migraatio- tai ART-kenttiä eikä niiden kanonisia
aineistotunnuksia ylävirran kalibrointitunnisteina. Nämä kuuluvat vasta erilliseen
[`sentinel-hindcast-protocol.md`](sentinel-hindcast-protocol.md)-vaiheeseen,
kun FieldState–biologia-parametrit, asteikko ja viivesääntö ovat lukittuja.

## Nykyinen tila: aktiivinen rakenne-evidenssi, numeerinen kalibrointi odottaa

BERM:n aktiivinen evidenssirekisteri, eläin- ja ihmispäätepisteet,
mekanistiset rescue-/genetiikkatulokset sekä sentinellihavainnot ovat jo
**aktiivista rakenne-evidenssiä**. Ne rajaavat mallin kausaalisia solmuja,
odotettua suuntaa, elin- ja elinvaihekohtaista herkkyyttä sekä palautuvan ja
persistentin muistin/viiveen perheitä. Ne eivät katoa tai muutu kielteisiksi
siksi, ettei yhtä paikallista mittauspaneelia vielä ole.

ANFR on arvokas mitattu ambient-RF-kerros, mutta se ei vielä täytä tätä
sopimusta: se ei ole organismi-/elinpaikallinen FieldState eikä sille ole
hallussa saman kohdealueen ja aikaikkunan biologista paneelia. Siksi sopimus
on tällä hetkellä **`PENDING_MATCHED_CALIBRATION`**: uutta paikallista
FieldState→endpoint-kerrointa ei vielä saa estimoida. Tämä ei ole kielteinen
biologinen tulos, ei BERM:n rakenteellisen näytön hylkäys eikä arvioitu
TFR-ennuste. Se määrittää täsmällisesti seuraavan hankittavan paneelin.
