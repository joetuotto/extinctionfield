# Moduloomi tilamallina

**Versio:** modulome-state-v1 · **Päivitetty:** 2026-09-07
**Koodi:** `berm/berm/modulome/` · **Vienti:** `berm/export_modulome.py`
**Testit:** `berm/tests/test_modulome.py`, `berm/tests/test_modulome_site_sync.py`,
`website/lib/__tests__/modulome-state.test.ts`

## Mitä laajennus tekee

Moduloomi täsmennetään malliksi siitä, **miten mitattava solutila määrää kenttävasteen
voimakkuuden, suunnan ja ajallisen kehityksen**. Lindgrenin fysikaalinen premissi
säilyy koskemattomana: laajennus koskee biologista vastaanotinta ja sen toimintaa,
ei χ_geon johtoa. Kerrosten välille määritellään mitattavat siirtomekanismit ja
palautteet.

Yksikään moduuli ei kanna oletuskerrointa. Jokainen kvantitatiivinen kuvaus
saapuu `parameter_ids`- ja `evidence_ids`-tunnisteineen, ja tuloksen
`calibration_status` on `STRUCTURAL_ONLY`, kunnes koko sen tuottanut ketju on
päätepistekalibroitu — sama sääntö kuin `berm.biology.reproductive_state`-moduulissa.

## Moduulit

| Moduuli | Mitä se lisää | Rajaava interventio |
|---|---|---|
| `state` | Kolme erikseen mitattavaa suuretta: vastaanottimen tila `s`, korjauskapasiteetti `A`, vauriokuorma `D` | `attribute_reduced_response` nimeää, mikä kolmesta selittää pienentyneen vasteen |
| `membrane` | Vastaanotin kalvokoneistona: koostumus, kompleksit, sijainti — ei kanavamäärä | `without_channel` poistaa kanavan; `TransferMode` erottaa valmistetun vesikkelin luonnollisesta siirtymästä |
| `calcium` | Kanavat ↔ solulima ↔ ER ↔ mitokondriot; kolme erikseen ennustettua vaihetta | `without_ryr_release`, `without_serca_uptake`, `without_mcu_uptake` |
| `photostate` | Flaviinin tila ja järjestetty valohistoria; kahden fotonin peräkkäinen askel | `require_subtype_parameters` kieltäytyy rekisteröimättömästä alatyypistä |
| `polarity` | Suunta omana päätepisteenään: elossa, liikkuva, väärään suuntaan | `silenced("kcnj15" \| "polyamines" \| "pi3k_gamma" \| "pten")` |
| `tissue` | Kudosympäristö, nestevälitteinen viesti, immuunitila | `functional_endpoint` on pakollinen; kanavan esto nollaa sekä signaalin että toiminnon |
| `window` | R²_j = ∫ W(f; s_j, B₀) S_d,j(f) df | Kerroin saa riippua vain rekisteröidystä solutilan mittauksesta |
| `feedback` | ẋ = au + by − r_x x, ẏ = cu + dx − r_y y | Vakaus `bd < r_x r_y`; `irreversibility_requirements` |
| `cards` | Kahdeksankenttäinen mekanismikortti | Kortti ilman interventiotulosta ei rajaa mekanismiaan |

## Kaksi rakenteellista kieltoa, jotka on koodattu tyyppeihin

1. **Teknologian nimi ei ole biologinen säätökerroin.** `StateDependentWindow`
   hyväksyy vain avaimia, jotka ovat `STATE_MEASUREMENT_VOCABULARY`-sanastossa.
   Yritys antaa kerroin avaimella `"5g_nr"` nostaa `ValueError`-poikkeuksen.
2. **Signaali ei ole päätepiste.** `tissue.immune_functional_response` ja
   `tissue.bystander_transfer` vaativat epätyhjän `functional_endpoint`-kentän,
   joten "kalsiumsignaali nousi" ei voi esiintyä tuloksena ilman nimettyä toimintoa.

## Vasteikkuna: lukittu ja tilariippuvainen rinnakkain

`LOCKED_COMPARISON_WINDOW` on aiempi lukittu ehdokas (keskitaajuus 25,2 Hz,
synteesin §15 arvo, jota `berm.physics.ipr_mechanism` jo käyttää). Se säilyy
muuttumattomana. `StateDependentWindow` on **uusi, erikseen testattava versio**:
sen parametrit on määrättävä riippumattomista mittauksista, eikä nykyinen
laskenta ole biologisesti validoitu kokeiden järjestysennuste. `compare_windows`
ajaa molemmat samaa `BiologicalDriver`-spektriä vastaan, jolloin ero on
kokonaan mitatun tilan tuottama.

## Palautesilmukka ja peruuttamattomuus

Positiivinen palaute **ei** yksin määrää peruuttamattomuutta. Vakaa lineaarinen
silmukka, jolla on positiivinen keskinäinen vahvistus, palaa lähtötasolle ajon
loputtua. `irreversibility_requirements` listaa, mitä lisäksi tarvittaisiin:
nimetty epälineaarisuus, mitattu kynnys tai tilamuuttuja, jota ei voi palauttaa.
Lähellä rajaa `slowest_recovery_time` kasvaa rajatta — hidastuminen on se
signaali, jota olemassa olevista aikasarjoista kannattaa etsiä ennen suurta
toiminnallista muutosta.

## Sivustolle vienti

`python3 berm/export_modulome.py` kirjoittaa `website/data/modulome-state.json`
ja `website/public/data/modulome-state.json`. Sivuston kuvaajat lukevat luvut
tästä tiedostosta (`website/lib/modulome/stateModel.ts`), joten kuvaaja ei voi
olla eri mieltä sen mallin kanssa, joka sen tuotti.
`berm/tests/test_modulome_site_sync.py` kaatuu, jos tiedosto on ajautunut erilleen.

Kuvaajien muotoa havainnollistavat parametrisarjat on nimetty erikseen
(`modulome.*.illustrative-shape-v1`) ja merkitty `STRUCTURAL_ONLY`, jotta muodon
havainnollistusta ei voi lukea aineistosta estimoiduksi.
