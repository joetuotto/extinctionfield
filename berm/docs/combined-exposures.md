# BERM: ehdollinen yhteisaltistusrakenne

`berm.biology.combined_exposures` kokoaa lääketilan, materiaalirajapinnan ja
RF-laitteen protokollan samaan nimettyyn kontekstiin. Julkinen liittymä on
`from berm.biology import combined_exposures_structure, CombinedExposureContext,
matched_interaction_contrast`. Rakenne-export on JSON-yhteensopiva. Se ei aja
ennusteita eikä muuta nykyisiä ennustekertoimia.

## Johtoperusta ja neljä tietoluokkaa

Nykytehtävän johtomuistio on
`docs/analysis/BERM_combined_exposures_2026-09-08/DERIVATION.md` repositoryn
juuressa. Lindgren–Kovacs–Liukkonen 2025:n lähtökohta on
`g = eta + A ⊗ A`. BERM:n eksplisiittisellä mittakaavalla ja hajotelmalla
`A = A0 + a` seuraa
`delta_g = kappa(A0 ⊗ a + a ⊗ A0 + a ⊗ a)`.
Usean fyysisen syötteen `a = sum(a_p)` ristitermeille on ilmoitettava
aikakeskiarvoistus. Niistä ei seuraa suoraan biologisen yhdysvaikutuksen merkkiä.

Export erottaa Lindgrenistä johdetun geometrian, tuodut biologiset osamekanismit,
BERM:n ehdollisen `Xi_i[S_i(history)](delta_g)`-liitoksen ja avoimet kalibroinnit.
Gauge-valinta, fyysinen mittakaava, kudosydin, vasteen merkki ja viive sekä
ihmispäätetapahtuman siirtokertoimet ovat `None`. FieldState saa toimittaa
ainoastaan valinnaisia fyysisiä mittaushavaintoja.

## Kolme tekijää ja erilliset mittasuureet

1. `contraceptive_state`: nimetty `MedicationContext`. `MedicationAgent`
   tallentaa aineen, lääkeaineluokan, annoksen ja yksikön sekä antoreitin.
   Konteksti ilmoittaa käytön tilan, antoaikataulun ja ajan suhteessa nimettyyn
   tapahtumaan. Tuntematon annos on `None`; aiempi käyttö voidaan sijoittaa
   ennen RF-altistusta. Luokkien, annosten tai käytön totuusarvosta ei muodosteta
   vastaanottavuuskerrointa. Tietue toimii myös muille nimetyille lääkekonteksteille;
   tekijän nykyinen sovellusnimi pysyy ehkäisytilana.
2. `material_interface`: nykyinen `InterfaceConditions` ja mahdollinen
   `StaticTriboelectricInterface`. Pelkkä materiaalin nimi ei aseta kenttää.
   Mahdollisen mittaustietueen on koskettava samoja rajapintaolosuhteita.
3. `rf_device_protocol`: nimetty `RFDeviceProtocol`, joka säilyttää
   spektrin, modulaation, ajan sekä erilliset kenttä- ja SAR-mittaukset.

Materiaalin ja RF:n yhdysvaikutus on kahden tekijän riippuvuus, ei neljäs tekijä.
Potentiaaliero (V), sähkökenttä (V/m), SAR (W/kg), kemiallinen läpäisykerroin
(m/s) ja kemiallisen läpäisyn suhde (1) ovat eri suureita. Niitä ei summata
eikä muunnetta automaattisesti toisikseen. Kemiallinen suhdeluku vaatii nimetyn
aineen, vertailun, kudoksen/paikan, menetelmän, ajan ja lähteen. Sen käyttö
RF-mittauksena hylätään.

## Vastaanottotila ja hormoniketju

`CombinedExposureContext` liittyy suoraan olemassa oleviin
`CellStateVector`-, `SteroidogenesisObservation`- ja `HormoneBindingState`-
tietueisiin. Vastaanottotila ja steroidituotannon mahdollinen solutila eivät
saa olla ristiriidassa. Sama kalsium/redox-tila ei muutu useaksi itsenäiseksi
kertoimeksi mekanismien eri nimien perusteella.

Tuotanto säilyy elävien solujen määrään suhteutettuna havaintona nimetyssä
stimulaatio- ja redox-kontekstissa. Sitoutuminen käyttää nykyistä
massavaikutusratkaisua syötetyistä yhdenmukaisista pitoisuuksista ja vakioista;
liittymä vaatii yhteisen molaarisen pitoisuusyksikön. Tämä laskennallinen
tasapainomäärä ei mittaa lääkkeen tai kentän vaikutusta. Puhdistuma säilyy
erillisenä `HormoneClearanceObservation`-havaintona (tilavuus/aika).
Pitoisuus ei siten korvaa tuotantoa tai puhdistumaa.

Exportin `hormoneStages.capacityPolicy` otetaan suoraan nykyisestä
`steroidogenesis_structure()`-liittymästä. Jos androgeenikapasiteetti sisältää
jo testosteronin tarjonnan, `steroidogenic_support` pysyy neutraalina.
Uutta steroidogeneesiporttia tai automaattista kapasiteettikerrointa ei lisätä.

## Mitatun yhdysvaikutuksen kuvaileva vertailu

`FactorialEndpointObservation` sisältää ryhmäkeskiarvon ja kaikkien kolmen
tekijän protokollatasot. Vertailuun annetaan neljä erillistä havaintoa
järjestyksessä `Y00`, `Y10`, `Y01`, `Y11` sekä kahden vaihdeltavan tekijän nimet.
Kolmannen tekijän on pysyttävä samana. Myös päätetapahtuman, yksikön,
kompartmentin, havaintoajan, yhteisen menetelmäkontekstin ja evidenssilajin on
oltava samat. Menetelmäkontekstin tunnisteen tulee kattaa koejärjestelmä,
ryhmäjako, muut käsittelyt ja mittaus; sen aineistosisällön oikeellisuus jää
lähteillä tarkistettavaksi. Ohjelma ei päättele tätä pelkästä tunnisteesta.

Hyväksytylle vertailulle käytetään nykyisen `cross_pathway_synthesis`-moduulin
funktiota: `Delta = Y11 - Y10 - Y01 + Y00`. Tulos säilyttää päätetapahtuman
yksikön, lähteet, neljä keskiarvoa ja ajan. Positiivinen, nolla ja negatiivinen
erotus ovat kaikki sallittuja. Puuttuva keskiarvo jättää erotuksen `None`ksi.
Erotus on kuvaileva, ilmoitetun asteikon yhdysvaikutus; `synergyStatus` ja
`statisticalSignificance` jäävät `None`ksi. Otosvaihtelua tai kliinistä
merkittävyyttä ei päätellä neljästä keskiarvosta. Myöskään havaintoaineiston
vertailukelpoiset keskiarvot eivät itsessään tunnista kausaalista yhteisvaikutusta.

Merkitykselliset testit tarkistavat faktorikonfoundoinnin hylkäyksen,
yksiköiden/ajan/evidenssilajin rajat, merkin vapaan vaihtelun,
asteikkomuunnoksen, puuttuvat havainnot, nykyisten osamekanismien liittymisen
ja muuttumattoman kapasiteettipolitiikan. Lukuesimerkit ovat yksinomaan
ohjelmistotestien havainnollistavia syötteitä. Moduuli ei lisää uusia
empiirisiä estimaatteja, ennusteita tai tutkimusohjelmaa.
