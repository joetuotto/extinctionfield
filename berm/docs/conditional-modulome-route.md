# Ehdollinen moduloomi–elin–ASFR-reitti

Versio `berm-modulome-conditional-asfr-v1`, 7.9.2026.

Uusi reitti koostaa nykyiset kalvo-, Ca²⁺-, solutila- ja hormonien ajoitusmallit nimettyyn toiminnalliseen elinporttiin, parin kapasiteettiin ja ehdolliseen ASFR-laskentaan. Se on ajettava skenaariomalli. Lukittu v17 ja sen numerot säilyvät.

## Käyttö

```bash
# Arkistoitu vertailu: oletus säilyy
PYTHONPATH=berm python3 -m berm.cli predict Finland 2030

# Eksplisiittinen uusi skenaario
PYTHONPATH=berm python3 -m berm.cli scenario my-scenario.json

# Sama reitti ennustekomennon valintana: ID:n ja vuoden on vastattava JSON:ia
PYTHONPATH=berm python3 -m berm.cli predict SYNTHETIC 2026 --route modulome --scenario my-scenario.json

# Havainnollistavien esimerkkien vienti / synkronoinnin tarkistus
PYTHONPATH=berm python3 berm/export_conditional_scenarios.py
PYTHONPATH=berm python3 berm/export_conditional_scenarios.py --check
```

Pythonissa `berm.project_modulome_scenario(payload)` palauttaa saman JSON-yhteensopivan tuloksen. `berm.modulome.scenarios.illustrative_scenarios()` palauttaa neljä täydellistä syötettä. Esimerkin `input` voidaan tallentaa JSON:ksi ja toistaa CLI:llä. Sivuston täydellinen vienti `public/data/conditional-scenarios.json` sisältää syötteet ja tulokset; `data/conditional-scenario-explorer.json` sisältää kevyen näkymän ja yhden ikäryhmän trajektorit. Kevennys tarkistaa, jakavatko muut esimerkki-ikäryhmät saman protokollan.

## Syötteet ja mekanismien järjestys

JSON:n juuritaso sisältää `schema_version: 1`, `scenario_id`, `geography_id`, `year`, `reference_year`, `input_provenance` ja kaikki seitsemän `age_groups`-riviä järjestyksessä 15–19 … 45–49. Jokaisella rivillä on `reference_asfr`, `asfr_source_id`, `reference` ja `target` sekä haluttaessa `waiting` ja `demographic_ratios`. Kentät tarkistetaan; tuntematon teknologia- tai maakerroin ei pääse laskentaan huomaamatta.

Kummankin vertailuhaaran `protocol` sisältää paikallisen **biologisen ajurin**, sen yksiköt ja provenienssin, näytekohtaisen ajon, `dt_s`, `kinetics_interval_s`, alkutilan, kalvokoneiston, alku-Ca²⁺-tilan ja kaksi parametrisarjaa. Nykyinen `StateKinetics` on yhden rekisteröidyn intervallin päivitys; siksi `kinetics_interval_s` ja `dt_s` on annettava samoina. Parametreja ei voi käyttää toisella aika-askeleella sellaisinaan. `state_increment_gain` on erikseen nimetty muunnos ajuri × aika → tilamallin lisäys. Sekään ei ole empiirinen oletuskerroin.

Jokaisen intervallin alussa kalvokompetenssi kerrotaan nykyisellä vastaanotinvalmiudella. Tämä ohjaa Ca²⁺-sisäänvirtausta. ER:n vapautuminen/otto, mitokondrio ja poistuma lasketaan erikseen nykyisellä Ca²⁺-mallilla. Samalla vastaanotinvalmius, korjaus ja vaurio päivitetään seuraavaa intervallia varten. Ca²⁺-laskennan liian suuri aika-askel hylätään ennen toiminnallisen tuloksen laskentaa. Tuloksessa säilyvät ajallinen jono, vastaanotin, korjaus, vaurio, Ca²⁺-huippu, loppupitoisuus, ER-varasto, mitokondrio ja varastokierto.

`endpoint` nimeää biologisen toiminnallisen päätepisteen ja korvattavan elinportin: `sperm_function` tai `oocyte_redox_quality`. Päätepistekoordinaatti ja toiminnallinen ikkuna ovat eksplisiittisiä:

```
x = intercept + Σ coefficient(feature) × feature
factor = exp(-0.5 × ((x − optimum)/width)²)
```

Kertoimet sisältävät piirteen yksiköstä päätepistekoordinaatin yksikköön tarvittavan muunnoksen; `coordinate_units`, `parameter_ids` ja `endpoint_id` ovat pakollisia. Sama muutos voi siirtää järjestelmää kohti tai poispäin optimaalisesta toiminta-alueesta. Muoto on tässä rekisteröity ehdollinen sulkeuma, ei esimerkiksi Zhangin hiirikokeesta estimoitu ihmisen hedelmällisyyskerroin.

Valinnainen `hormone_timing` käyttää nykyistä hormonin ja vastaanottavuuden harmonista päällekkäisyyttä; se korvaa ovulaation kellotekijän. Hormonin ja solun aikaskaalat ovat erillisiä. Paikallinen `implantation` summaa eri lähteiden hormonituotannon ennen vastaanottavuuden ja ilmoitetun toimintavaatimuksen soveltamista. Yksi toimiva lähde voi siksi kompensoida menetetyn lähteen. Tämä on Liu/BMAL1-tulosten ehdollinen rakenne, ei knockout-vaikutuksen siirto kenttäkertoimeksi.

Korvattavan manuaalisen elintekijän on oltava 1. Samaa redox-, siittiö-, ajoitus- tai implantaatioporttia ei kerrota toista kertaa. Muut parin tekijät pysyvät erillisinä. `waiting` korvaa parikapasiteettisuhteen ensin lasketulla odotusjakaumasuhteella. Erilliset kysyntä-, tempo- ja ART-suhteet säilyvät eksplisiittisinä.

## Spektri ja B₀

Valinnainen `spectral` sisältää biologisen ajurin PSD-binnejä, B₀:n tesloina, `StateDependentWindow`-parametrit ja erikseen tunnistetun `amplitude_gain`-muunnoksen. Lukittu 25,2 Hz:n ikkuna ja ehdollinen ikkuna lasketaan samasta spektristä. `amplitude_gain × sqrt(candidate_response_power)` skaalaa protokollan ajallista profiilia. Profiili on tässä dimensionless-suhteellinen ajallinen kerroin; gain määrittää tulon `driver_units`-yksiköt.

Ikkuna arvioidaan **syötettyä mitattua alkutilaa** vasten. Soludynamiikan laskemaa piilotilaa ei esitetä uutena mitattuna kalvojärjestyksenä. Jos halutaan muuttuva mittausikkuna, ajanjaksot tulee ajaa asianmukaisilla uusilla mittauksilla ja parametrien rekisteröinnillä. Teknologian nimi ei määritä ikkunaa. PSD ei yksin rekonstruoi RF-vaiheita: biologinen ajuri ja sen vaihe-/aikarakenteen käsittely on ilmoitettava ylävirran provenienssissa.

## Ehdollinen vaste ja androgeenin saatavuus

Valinnainen vertailuhaaran `retarded_response` yhdistää formaalin viiveellisen
vasteen samaan solutilareittiin. Silloin `protocol.driver` ja `spectral` jätetään
pois: syötteitä ei korvata tai kerrota huomaamatta. Pakolliset kentät ovat
`kernel_histories`, `delta_metric_histories`, `lag_weights`, `lag_weight_units`,
`kernel_provenance`, `kernel_parameter_ids` ja `transfer`; `kernel_evidence_ids`
on valinnainen. Kummankin histories-taulukon ulompi akseli on
solun aika-askel; sisempi akseli sisältää kyseisen askeleen vasteytimen viiveet
ja niiden tensorit. Jokaiselle askeleelle lasketaan nykyisellä
`contract_retarded_response`-operaattorilla sama eksplisiittinen kontraktio.
Viiveintegraalin painot ja solutilan `dt_s` ovat eri syötteitä.

`transfer` sisältää `transfer_id`, `response_units`, `driver_units`, `provenance`,
`baseline`, `gain`, `parameter_ids` ja haluttaessa `evidence_ids`. Muunnos on
`driver = baseline + gain × signed_response`. Gain voi olla kumman tahansa
merkkinen, ja sen yksikkö on driver_units/response_units. Muunnoksen koko
ajurijonon on oltava epänegatiivinen nykyiselle solumallille; negatiivinen arvo
hylätään. Absoluuttista arvoa tai nollaan leikkausta ei tehdä. Tuloksen
`retarded_response`-lohko säilyttää alkuperäisen merkkisen vasteen,
viivekontribuutiot, painot ja siirtoparametrien alkuperän. Formaali operaattori
on ehdollinen; sen fyysinen skaala ja kudosydin eivät kalibroidu tällä ajolla.

Valinnainen `androgen` sisältää `binding`-olion (`HormoneBindingState`),
`pathways`-listan (`ReceptorPathway`), eksplisiittiset `pathway_weights`,
`concentration_units`, `provenance`, `parameter_ids` ja haluttaessa `evidence_ids`.
Kokonaistestosteroni, sitoutumispaikat ja kaikkien sitoutumis-/reseptorivaiheiden
Kd-arvot ilmoitetaan samassa pitoisuusyksikössä. Painoja ei päätellä tutkimuksesta.
Nykyinen massavaikutuslaskenta ratkaisee vapaan testosteronin ja reseptorisignaalit;
tulos korvaa miehen `androgen_effective_capacity`-portin kerran. Koska tämä
kokonaisuus sisältää jo testosteronin tarjonnan, sekä manuaalisen
`steroidogenic_support`- että `androgen_effective_capacity`-portin on oltava 1.
Tulos säilyttää vapaan pitoisuuden, sitoutumisosuuden, reseptorikomponentit,
yksiköt, parametrit ja evidenssiviitteet. Molempien vertailuhaarojen oletukset
on annettava samalla normalisoinnilla. `waiting` saa tämän päivitetyn paritilan
ennen odotussuhteen laskentaa; kapasiteettia ei lisätä toiseksi kertoimeksi.

Ilman kumpaakaan valinnaista syötettä aiemmat v1-skenaariot ja niiden tulokset
säilyvät samoina. Uudet adapterit eivät muuta v17:n laskentaa. Molemmille
rajapinnoille vaaditaan oman parametrisaation alkuperä; esimerkkitesti ei ole
ihmispäätepisteen kalibrointi.

## Odotus ja kalenteriaika

`project_wpp_conditional_asfr(..., waiting_comparisons={age_group: comparison})` välittää nyt odotusvertailut myös WPP-apureitin läpi. Vain valitut standardi-ikäryhmät voivat käyttää odotusvertailua; muissa vanha kapasiteettisuhde säilyy.

Uusi `berm.outcomes.reproductive_calendar.simulate_reproductive_calendar` toteuttaa rajatun kalenteri-/pariteettimallin. Kutsuja antaa joka intervallille ja pariteetille `CoupleWaitingState`-tilan sekä erillisen raskaustuen vertailutodennäköisyyden. Malli käyttää yhden kelpoisen yrityskierron intervallia kohti, nimeää raskausajan, menetyksen jälkeisen palautumisajan ja synnytyksen jälkeisen tauon. Ikä etenee intervallien mukana; biologisten todennäköisyyksien ikäriippuvuus tulee kutsujan aikataulusta, ei sisäisestä oletuksesta.

Hedelmöittyminen sijoitetaan intervallin alkuun. N intervallin raskaus päättyy N:nnen intervallin lopussa, hedelmöittymisintervalli mukaan lukien. Menetyksen jälkeinen viive lasketaan vastaavasti. Synnytyksen jälkeinen tauko alkaa vasta synnytyksestä. Raskauden tuki määrää onnistumis-/menetyshaaran hedelmöittymishetkellä; tämä ei ole raskauden vaiheittaisten hazardien malli. Tulos on odotettu yksittäisten elävänä syntymien määrä annetussa horisontissa ja lopullinen pariteettijakauma, ei TFR eikä valmistunut elinikäinen lapsiluku. Erillistä tempo-kerrointa ei lisätä, koska kalenteri on jo laskettu.

## Rajaukset ja testit

Kaikki uuden koostetun ketjun tulokset ovat `STRUCTURAL_ONLY`, `forecast_calibrated: false`, `l2_bridge_status: OPEN`. Vaikka yksittäinen komponentti olisi päätepistekalibroitu, tämä uusi siirtoketju ei peri sen kalibrointia. Provenienssi kulkee tulokseen ja mukana oleva näyttö koskee nimettyjä komponentteja. Syötteestä ei päätellä ympäristö-RF-annosta, syyvaikutusta väestössä tai L0–L2:n empiiristä vahvistusta.

Esimerkkien kertoimet ovat nimettyjä muotohavainnollistuksia. Kaikkien ikäryhmien vertailu-ASFR 100/1000 ja siitä saatava TFR 3,5 on laskuesimerkin aritmetiikkaa, ei WPP-estimaatti. Havainnollistuksen `evidence_ids` ovat tyhjiä silloin, kun parametrisaatiolle ei ole sovitettua tutkimusta. Mekanismien lähteet ja niiden siirtorajat ovat 7.9.2026 integraatioauditoinnissa ja moduloomikorteissa.

Testit kattavat saman energian eri ajoituksen, hormonien samat keskiarvot eri vaiheissa, korjauksen ja vastaanoton eron, kanavaintervention, sekä suojan että haitan saman funktion eri työpisteissä, paikallisen kompensaation, B₀-ikkunan kytkennän, odotusliitoksen kaksoislaskennan eston, kalenterin ajoituksen ja massan/pariteetin säilymisen, JSON-uusinnan sekä lukitun Finland 2030 v17-tuloksen säilymisen. Vuorovaikutusoperaattorit dokumentoidaan erikseen `interaction-operators.md`-tiedostossa.
