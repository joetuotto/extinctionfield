# Lopullisten rekisterien säilymisen riippumaton tarkastus

Tulos: **PASS**. Alkuperäisen työtilan yhdistettyjä rekistereitä verrattiin alkuperäisen ja julkaistun työtilan muuttumattomiin tilannekuviin. Tarkastus ei muokannut tuotantotiedostoja eikä ajanut testisarjoja uudelleen.

- Alkuperäinen tilannekuva: `afe40cecc5fbc600b98e13b53bac8f07f3e272cf`.
- Julkaistun tilannekuva: `644cba650601dc79d8edd2960276a9a8a76d4c9c`.
- Yhteinen perusta: `7a938dd3b528a76008557632fdaf0dca72e13dea`.

| Rekisteri | Alkuperäinen | Julkaistu | Lopullinen | Kadonneita ID:itä | Alkuperäisiä menetettyjä muutoksia |
|---|---:|---:|---:|---:|---:|
| references | 1156 | 1191 | 1191 | 0 | 0 |
| claims | 64 | 99 | 99 | 0 | 0 |
| evidence_relations | 131 | 186 | 186 | 0 | 0 |
| epistemic_assessments | 64 | 99 | 99 | 0 | 0 |
| routes | 5 | 5 | 5 | 0 | 0 |
| graph_nodes | 39 | 47 | 47 | 0 | 0 |
| graph_edges | 83 | 96 | 96 | 0 | 0 |
| legacy_evidence | 150 | 150 | 150 | 0 | 0 |

Kaikki 12 tarkastettua kanonista JSON-kokonaisuutta vastaavat julkaistua tilannekuvaa sisällöllisesti. Pelkän ID-säilymisen lisäksi alkuperäisessä yhteisen perustan jälkeen muuttuneet kentät vertailtiin erikseen: alkuperäisiä muutoksia ei kadonnut. Julkaistun tarkennukset perustaan nähden muuttumattomiin kenttiin säilyvät.

Atlas-sidokset: alkuperäisen 70 ja julkaistun 116 yksilöllistä sidosta säilyvät; lopullisessa 116 sidosta, 68 sidottua solmua ja 5 sidottua kaarta. Kaikki 99 väitettä ovat sidottuja.

Graafin kaikki alkuperäiset päätepisteparit säilyvät. Lopulliset 96 kaarta vastaavat täsmälleen solmujen vanhempi- ja lapsiluetteloita. Kaikki väitteiden kohteet, evidenssisuhteiden lähteet, arviointien perustat ja reittien väite-/evidenssiviittaukset ratkeavat. Kaksois-ID:itä ei löytynyt.

Modulomin, ehdollisten skenaarioiden, interventioprofiilien ja interventioskenaarioiden generoituja peilejä verrattiin myös: kaikki ovat sisällöllisesti samat kanonisen vastineensa kanssa.

Paikallisten ohitettujen tutkimusaineistojen tarkastus on erillisessä päätarkastuksessa: 287 alkuperäiselle työtilalle yksilöllistä tiedostoa / 1,09 Gt arkistoitu; 341 tiedostoa / 1,56 Gt hash-suojattu. Tämä raportti ei väitä suorittaneensa tätä erillistä tarkastusta uudelleen.

Täysi koneellinen jälki: [FINAL_REGISTRY_PRESERVATION.json](FINAL_REGISTRY_PRESERVATION.json).
