# ANFR → FieldState -ominaisuussilta

Tila: mitattu ambientti-RF säilytetty, **aktiivinen FieldState-komponentti; osittainen elin-/yksilötasoisen annoksen kuvaus**  
Versio: `anfr_fieldstate_bridge@v1.0.0`

Tämä silta käyttää ANFR:n manifestilukittua, normalisoitua
`anfr_autonomous_probes_site_time.csv`-aineistoa. Se tuottaa yhden rivin
jokaiselle kiinteälle anturille ja lähteen julkaisemalle kalenteripäivälle:

```text
kiinteä ANFR-anturi × julkaistu paikallinen päivä
  → V/m: keskiarvo, RMS, hajonta, minimi, maksimi
  → provenance: raaka-manifesti + lähdeyhteenveto + input-CSV:n SHA-256
```

Sillan lähtökohta on BERM:n FieldState-logiikka: mitattu suure pidetään
erillään niistä suureista, joita sitä ei ole mitattu kuvaamaan. ANFR:n
`V/m` ei siksi yksinään **määrää** normeerattua vektoria, henkilö-/eliöannosta,
elinsiirtoa tai biologista vaikutuskerrointa. Se on silti aktiivinen fyysinen
havainto: se voi päivittää paikallista ambientti-RF-komponenttia,
liikkuvuus- tai valuma-aluepainotettua FieldState-arviota sekä niistä
johdettavia lajikohtaisia vaste-ennusteitä.

## Lukitus ja rajat

Ennen parsintaa putki varmistaa:

- normalisoidun ANFR-CSV:n SHA-256 vastaa sen lähdeyhteenvetoa;
- lähdeyhteenveto on edelleen `MEASURED_AMBIENT_RF_LAYER_NOT_JOINED_TO_BIOLOGY`;
- raakaerän manifesti on edelleen `MEASURED_AMBIENT_RF_NOT_JOINED_TO_BIOLOGY`;
- jokainen lähderivi on kiinteä, havaittu `V_per_m`-mittaus eikä siinä väitetä
  henkilöannosta tai biologista liittymää.

Tulosteen `fieldstate_status` on aina `PARTIAL_FIELD_STATE` ja
`measurement_ready` aina `false`. Tämä on tietoinen rajaus: rivi ei esitä
valmiiksi kalibroitua elinannosta eikä anna yksin numeerista
FieldState→biologinen-päätetapahtuma -kerrointa. Se ei kuitenkaan tee
mittauksesta passiivista. Rivi on kelvollinen mitattu komponentti
evidenssirajoitettuun FieldState-päättelyyn, paikalliseen
liikkuvuuspainotettuun altistusarvioon ja lajikohtaisten, ennalta määriteltyjen
vaste-ennusteiden testaamiseen.

Puuttuvia ovat vähintään kentän normeerauksen kalibrointi, vektorin suunta ja
polarisaatio, taustavektori, henkilökanava, reseptori/elinsiirto, spektri,
vaihe/koherenssi, biologisesti tulkittava vuorokausikonteksti ja ennalta
määritelty biologinen päätetapahtuma samassa paikassa ja ajassa.

Päivä on lähteen julkaisema paikallinen kalenteripäivä. Koska ANFR ei ilmoita
aikavyöhykettä, se ei ole sellaisenaan henkilön altistus- eikä biologinen
vuorokausijakso. Putki ei tee piilo-oletuksia: mahdollinen alue-,
liikkuvuus- tai elinympäristösiirto on kirjattava erillisenä
ristiintaulukkona/kerneliarviona epävarmuuksineen. Putki ei itse valitse
viivettä, sovi väestöllistä TFR-käyrää eikä tee kansallista annosväitettä.

## Käyttö

```text
cd berm
python -m berm.data.anfr_fieldstate
```

Oletustuotteet ovat Gitissä sivuutetut:

- `data/processed/anfr_fieldstate_feature_day.csv`
- `data/processed/anfr_fieldstate_feature_day.manifest.json`

Rivisopimus on
[`anfr_fieldstate_feature_day.schema.json`](../data/schemas/anfr_fieldstate_feature_day.schema.json).
Tuotteen voi käyttää välittömästi fyysisenä ambientti-RF-ominaisuutena
FieldState-hypoteeseissa. Kapeaa, endpoint-kohtaista vaikutusväliä varten
tarvitaan myöhemmin ennalta määritelty paikka-/aika-/mittausgeometria- ja
biologinen päätetapahtumaristiintaulukko. Ristiintaulukko voi olla
samapaikkainen, liikkuvuuspainotettu tai paikallisalue-estimaatti; valittu
siirtogeometria ja epävarmuus on aina dokumentoitava.
