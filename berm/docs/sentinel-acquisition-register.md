# Sentinelliaineistojen hankintarekisteri

Päivitetty: 2026-08-19  
Tarkoitus: hankinnan ja käyttökelpoisuuden läpinäkyvä rekisteri — **ei
todisterekisteri eikä kausaalinen tulkinta**.

Tässä erotetaan toisistaan (a) paikallisesti hallussa oleva, tarkistussummalla
lukittu aineisto, (b) avoin mutta vain rajattuun tekniseen käyttöön sopiva
aineisto ja (c) lähde, jonka mikroaineisto, lisenssi tai tutkimuslupa on vielä
haettava. Pelkkä artikkeli, verkkosivu tai aggregoitu tilasto ei täytä
sentinellipaneelin vaatimusta.

## Tilamerkinnät

| Merkintä | Täsmällinen merkitys |
| --- | --- |
| `HELD_ISOLATED` | Alkuperäiset tiedostot ovat paikallisesti hallussa ja manifesti lukitsee niiden koon sekä SHA-256:n. Aineisto ei tästä syystä automaattisesti ole sentinelli- tai kausaalianalyysin syöte. |
| `AVAILABLE_LIMITED` | Numeroaineisto on hallussa, mutta sen asetelma ei täytä RF–biologia-paneelin ehtoja. |
| `ACCESS_REQUIRED` | Lähteestä tunnetaan relevantti sisältö, mutta yksilö-/mikroaineisto vaatii hakemuksen, DUA:n, avaimen tai yhteistyösopimuksen. |
| `PUBLIC_REUSE_UNVERIFIED` | Data näkyy julkisesti, mutta koneellisen poiminnan tai tutkimuskäytön lupa, määritelmä tai toimitusmuoto on varmistamatta. |
| `CANDIDATE_NOT_HELD` | Virallinen ja potentiaalisesti mitattu lähde on tunnistettu, mutta sitä ei ole vielä noudettu, lukittu eikä liitetty biologiseen paneeliin. |

## Hallussa olevat erilliset eläinlääketieteelliset/seminologiset lähteet

### Fielding 2025: Goa, vapaana liikkuvien koirien sterilisaatio-RCT

**Tila: `HELD_ISOLATED`.** Lähde on Fieldingin Goa-aineisto
([DataShare DOI](https://doi.org/10.7488/ds/7919)), CC BY 4.0. Kolme
alkuperäistä komponenttia ovat paikallisesti hakemistossa
`berm/data/raw/veterinary/fielding_2025_goa_rct/`; niiden identiteetti on
lukittu manifestiin
[`fielding_goa_2026-08-19.manifest.json`](../data/raw/manifests/fielding_goa_2026-08-19.manifest.json).

| Varmistettu asia | Arvo |
| --- | --- |
| Raakataulut | `SummedSiteCountsByAge_R2_14.csv` ja `SummedSiteCountsLact_R2_14.csv`, kummassakin 939 havaintoriviä; lisäksi lähteen README |
| Tarkistussummat | Ikätaulu `610e…6a7d`, imetystaulu `399b…221a`, README `40fe…f50` — täydet SHA-256:t ovat manifestissa |
| Johdettu, erillinen tuote | 1 878 site×survey-time×endpoint-riviä: 939 `puppy_count`- ja 939 `lactating_female_count`-havaintoa |
| Asetelma | Goa, 10 anonymisoitua tutkimuspaikkaa viidessä interventio/kontrolli-parissa; 2020-07-11…2023-01-19 |
| Lähteen kovariaatit | esimerkiksi reittikilometrit, sade, monsuuni, koiratiheys, paikka-/parityyppi ja päivät interventiosta |

Tämä on käyttökelpoinen, toistettava eläinlääketieteellinen **havaintokerros**,
mutta ei koirasperma- eikä hedelmällisyyspaneeli. Paikkakoordinaatit ovat
anonymisoituja, sterilisaatiointerventio muuttaa suoraan
lisääntymispopulaatiota, eikä aineistossa ole RF-dosimetriaa, kemiallisia
kovariaatteja tai ihmispaneelia. Se ei siksi syötä CSLI:tä, aktiivista
ennustetta eikä F1–F6-testiä. Tekniset yksityiskohdat ovat
[`veterinary-sentinel-data.md`](veterinary-sentinel-data.md)-dokumentissa.

### Fernández-López ym. 2022: karjun siemennesteen CASA–hedelmällisyysbenchmark

**Tila: `HELD_ISOLATED` (benchmark-polku, ei sentinelli).** Mendeley Data v5
([DOI](https://doi.org/10.17632/jd38jhxpg6.5), CC BY 4.0) on paikallisesti
hallussa hakemistossa
`berm/data/raw/veterinary/fernandez_lopez_2022_sperm_move_v5/`. Kaksi
alkuperäistä CSV:tä on lukittu manifestiin
[`fernandez_lopez_2022_sperm_move_v5_2026-08-19.manifest.json`](../data/raw/manifests/fernandez_lopez_2022_sperm_move_v5_2026-08-19.manifest.json):
`fertility_data.csv` (16 023 tavua, SHA-256 `2fab…b348`) ja `sperm_data.csv`
(5 045 129 tavua, SHA-256 `68c3…fd38`). Täydet tarkistussummat ovat
manifestissa.

| Varmistettu asia | Arvo |
| --- | --- |
| Raakahavainnot | 221 inseminaatiotapahtumaa ja 98 020 yksittäisen siittiön CASA-riviä |
| Asetelma | 17 nuorta Pietrain-karjua, 36 ejakulaattia, yksi kaupallinen keinosiemennysasema Riudarenesissa (Girona, Espanja), 2017-03…2017-06 |
| Säilyvät vasteet | lähteen `Success`-binaari sekä kokonais-, elävänä- ja kuolleena syntyneet porsaat |
| Erillinen muunnos | `seminology_benchmark@v1.0.0` tuottaa 221 tapahtumariviä ja 36 ejakulaattiyhteenvetoa vain uudelleenrakennettavina benchmark-tuotteina |

Lähteen `Success`-määritelmä on itse aineistossa ja siihen liittyvässä
artikkelissa ristiriitainen (raskaaksi tulo vs. farrowing rate); muunnos
säilyttää epävarmuuden eikä ratkaise sitä oletuksella. Aineisto on
single-site, neljän kuukauden mittainen ja valikoitu minimitason
siemennesteen laadun mukaan. Siitä puuttuvat RF/EMF-dosimetria, ympäristö- ja
kemialliset kovariaatit sekä pitkä viive- tai monipaikkapaneeli. Sen tila on
siis `BENCHMARK_ONLY_NOT_SENTINEL` ja F1–F6-kelpoisuus `NOT_ELIGIBLE`, vaikka
raakadata ja toistettava erillinen muunnos ovat hallussa. Tarkka
aineistokuvaus on [`seminology-benchmark.md`](seminology-benchmark.md)-dokumentissa.
Pidemmät, monipaikkaiset ja käyttöluvan vaativat seminologiaehdokkaat on
koottu erikseen [`seminology-candidate-ledger.md`](seminology-candidate-ledger.md)-lokiin;
niitä ei merkitä hallussa oleviksi ennen raakamuodon, käyttöehdon ja
paikka–aika-avainkenttien tarkistamista.

### DEFRA FAnGR ja IFCE/SIRE: pitkät jalostusaktiivisuuden benchmarkit

**Tila: `HELD_ISOLATED`, `BENCHMARK_ONLY_NOT_SENTINEL`.** Kaksi uutta,
manifest-lukittua julkista rekisterikerrosta täydentää eläinlääketieteellistä
karttaa, mutta kumpikaan ei mittaa RF-annosta eikä suoraa hedelmällisyyttä:

| Lähde | Hallussa oleva sisältö | Miksi ei ole sentinelli- tai RF–biologia-paneeli |
| --- | --- | --- |
| [DEFRA FAnGR](fangr-breeding-structure-benchmark.md) | 38 458 UK:n vuosittaista rotu-/jalostusrakenneriviä, 204 rotua, 2000–2026 | `dams`, `sires`, `females`, `males`, `fempop`, `effpop` ja `flocks` ovat populaatio-/jalostusrakennetta, eivät sperma-, tiineys- tai syntymävasteita; ei paikka- tai RF-paneelia. |
| [IFCE/SIRE](ifce-sire-equine-breeding-benchmark.md) | 114 226 Ranskan département×vuosi×rotu×tyyppi-riviä, 2008–2024: peitetyt tammat, syntymät ja aktiiviset orit | Kolmella mittarilla on eri aluemerkitys; niitä ei yhdistetä `births / mares`-luvuksi. Ei yksilö-/kohorttilinkkiä, RF:tä, seminaatiota tai tiineysvastetta. |

Molemmat tuotteet ovat erillisiä, toistettavia benchmarkeja. Ne pysyvät
`NOT_ELIGIBLE`-tilassa F1–F6-testien suhteen, eivätkä ne syötä sentinelliä,
CSLI:tä, readinessiä tai aktiivista ennustetta.

## Nykyiset, rajalliset vertailukerrokset

Nämä lähteet säilyvät kontekstina, mutta eivät muutu paremmiksi
sentinellipaneeleiksi vain siksi, että uusia lähteitä lisätään.

| Lähde | Hallussa oleva sisältö | Miksi ei täytä RF–biologia-paneelia |
| --- | --- | --- |
| `COLOSS_WINTER_LOSS` | 216 alue–talvi-havaintoa 43 alueelta | Talvikuolleisuus ei ole lisääntymis- tai spermapäätepiste; puuttuvat RF, varroa-, patogeeni-, torjunta-aine- ja sääpaneeli. |
| `LEA_2016_DOG_SEMEN` | 92 kuvaajista digitoitua päätepisteriviä yhdestä UK:n jalostusohjelmasta, 1988–2014 | Yksi laitos, mallinnettuja kuvaaja-arvoja, ei yksilöraakatietoa eikä RF-dosimetriaa. |
| `PECBMS_BIRD_INDEX` | 172 lintujen runsausindeksihavaintoa 17 maasta sekä EUR-aggregaatista | Runsausindeksi ei ole lisääntymispäätepiste; epäsäännöllinen aikajakso eikä kohdistettua RF-mittausta. |

Näiden lähdetunnisteiden täydet provenanssit ja rajoitteet ovat
[`source_registry.csv`](../data/registry/source_registry.csv)-rekisterissä;
F1–F6-esteet ovat
[`sentinel-data-requirements.md`](sentinel-data-requirements.md)-dokumentissa.

### MUST-B: hallussa oleva paikkakonteksti, ei biologinen sentinelli

**Tila: `HELD_ISOLATED`.** EU Pollinator Hubin MUST-B-arkisto on hallussa
muuttumattomana ZIP-tiedostona (2 676 001 tavua, SHA-256
`e1af5754bea1e5dcbc0d93f7b5a5ce73a62c6cf3276e70d0444419aecbda364f`;
manifesti
[`mustb_2026-08-19.manifest.json`](../data/raw/manifests/mustb_2026-08-19.manifest.json)).
Pidetty osuus sisältää seitsemän Tanskan/Portugalin tarhapaikan koordinaatit
ja 453 kasvikartoituspolygonin keskipistettä. Arkistossa ei ole
pesä-, hoito-, tarkastus-, laboratorio-, torjunta-aine-, resurssi- tai
havaintopäiväaineistoa eikä RF-mittausta. Se on siis vain myöhemmän
paikkatietojen kohdistamisen mahdollinen konteksti, ei mehiläisterveys- tai
lisääntymispaneeli. Rajaus on dokumentoitu
[`mustb-biological-covariate-layer.md`](mustb-biological-covariate-layer.md)-tiedostossa.

## Korkean arvon koira- ja eläinlääkintäkandidaatit

Alla olevaan taulukkoon ei merkitä aineistoa hankituksi. Se kertoo täsmälleen,
mikä ulkoinen toimi on tehtävä ennen kuin rivi voidaan edes arvioida
normalisointiin.

| Lähde | Tila | Potentiaalinen sisältö | Ennen mahdollista ingestointia |
| --- | --- | --- | --- |
| [Golden Retriever Lifetime Study – reproductive history](https://datacommons.morrisanimalfoundation.org/artisanal_dataset/131) | `ACCESS_REQUIRED` | juoksu-, tiineys-, pentue-, elävä/kuollut/vieroitettu-pentue- ja uroksen siemenneste-/hedelmällisyyshuoli; koira×tutkimusvuosi | Hae tunnukset ja DUA; tarkista paikka-, aika-, altistus- ja tiedonluovutusehdot. [Data Commons FAQ](https://www.morrisanimalfoundation.org/data-commons-faqs). |
| [Dog Aging Project – reproductive data](https://data.dogagingproject.org/HlesDogDemographics?year=2025) | `ACCESS_REQUIRED` | Julkinen demografinen yhteenveto kattaa 52 599 koiraa; kuratoitu yksilöaineisto voi sisältää lisääntymiskenttiä | Hae aineisto [virallisen hakuprosessin](https://dogagingproject.zendesk.com/hc/en-us/articles/4421111559191-How-do-I-access-Dog-Aging-Project-Curated-Data) kautta; yhteenveto ei korvaa mikroaineistoa. |
| [FCI:n kansallisten järjestöjen vuosittaiset pentue- ja pentutilastot](https://www.fci.be/EN/statistics/ByYear.aspx?year=2025) | `PUBLIC_REUSE_UNVERIFIED` | maa/NCO×vuosi: rekisteröidyt pentueet ja pennut | Pyydä kirjallinen uudelleenkäyttölupa ja varmista, mittaako sarja syntymiä vai rekisteröintejä. [Legal notice](https://www.fci.be/en/Legal-notice-97.html). |
| [Suomen Kennelliiton jalostustietojärjestelmä](https://jalostus.kennelliitto.fi/frmEtusivu.aspx) | `ACCESS_REQUIRED` | rotu×vuosi vuodesta 1988: rekisteröinnit, pentuekoko, vanhempien ikä ja terveystietoja | Pyydä nimenomainen tutkimus-/uudelleenkäyttölupa; selainnäkyvyys ei ole massapoiminnan lupa. [Käyttökuvaus](https://www.kennelliitto.fi/en/breeding-and-health/breeding-database). |
| [SKK Avelsdata](https://www.skk.se/en/uppfodning/avel-inom-skk/avelsdata/) | `PUBLIC_REUSE_UNVERIFIED` | mahdollinen rotu-/aluekohtainen jalostus- ja pentuehistoria | Selvitettävä tutkimuslisenssi sekä saatava virallinen rotu×alue×aika-ote. |
| [Korean Racing Authority equine breeding API](https://www.data.go.kr/en/data/15063956/openapi.do) | `ACCESS_REQUIRED` | astutus-, varsomis- ja siitostammailmoituksia | API-avain ja tuotantokäyttöhyväksyntä; määritä ensin datan kattavuus ja kentät. |
| [Clydesdale pregnancy 2024](https://doi.org/10.17632/kjmc7dg5ny.4) | `OPEN_NONCOMMERCIAL_ONLY` | 441 tiineyttä, 135 tammaa, 12 tilaa | CC BY-NC 3.0 ja yhden tutkimuksen lyhyt asetelma: käyttöehdot tarkistettava; ei pitkä paneeli eikä RF-mittausta. |
| [VetCompass](https://www.rvc.ac.uk/vetcompass/papers-and-data/open-access-data) | `ACCESS_REQUIRED` | mahdollisesti suuren mittakaavan kliiniset lisääntymispäätepisteet | Haettava hallittu eettinen tutkimuspääsy; avoimet julkaisut eivät tarkoita, että tapausdata olisi avoin. |
| [DogsLife Labrador cohort](https://datashare.ed.ac.uk/handle/10283/3352) | `ACCESS_REQUIRED_FOR_REPRODUCTION` | avoin aineisto on pituus/paino; kohortilla voi olla lisääntymistietoja | Pyydä erillinen lisääntymisote. Avoimia mittaustietoja ei saa esittää lisääntymispaneelina. |
| [International Working Dog Registry](https://www.iwdr.org/) | `PARTNERSHIP_REQUIRED` | potentiaalinen työkoirien terveys- ja jalostusaineisto | Organisaatio-/token-yhteistyö, [API-dokumentaatio](https://api-docs.iwdr.org/); ei noutoa ilman lupaa. |
| [Dog cryptorchidism case–control, Dryad](https://doi.org/10.5061/dryad.vhhmgqnwk) | `OPEN_NON_PANEL` | 3 736 tapaus–verrokkikoiraa | Avoin, mutta ilman käyttökelpoista aika- ja paikkapaneelia; ei ratkaise viive- tai altistuskysymystä. |

## Suorat RF-mittauslähteet

Seuraavat lähteet ovat virallisia ja niissä on todellisia mittaustuloksia.
ANFR:n kokonainen julkaisuerä on nyt hallussa erillisenä mitatun ambientti-RF:n
kerroksena; sitä **ei** silti pidetä RF–biologia-paneelina. Muut lähteet ovat
edelleen hankintakandidaatteja. Yksikään niistä ei saa ohittaa biologisen
aineiston yhteensopivaa paikka–aika-avainta, mittausgeometriaa tai sekoittajia.

| Lähde | Tila | Varmistettu saatavuus | Avoin työ |
| --- | --- | --- | --- |
| [ANFR:n autonomiset kiinteät anturit](https://data.anfr.fr/visualisation?id=mesures-sondes-autonomes) | `HELD_ISOLATED` | Täydellinen API-julkaisuerä: 1 474 010 havaintoa, 158 mittauspaikkaa, 2020–2024; mitattu V/m, lähteen paikallinen aikaleima sekä lat/lon. 15 täsmällistä API-sivua ja metadata on lukittu manifestiin. | Kiinteän anturin ambienttikenttä ei ole henkilö-/eläinannos. 9 881 lähdeaikaleimaa on Excel-sarjapäiviä ja ne säilyvät näkyvällä muunnoslipulla; aikavyöhykettä ei ole ilmoitettu. Sarja ei kata COLOSSin historiallista ikkunaa eikä sitä ole liitetty biologiseen aineistoon. |
| [ANFR Cartoradio](https://www.anfr.fr/maitriser/information-du-public/cartoradio/presentation-cartoradio) | `CANDIDATE_NOT_HELD` | Paikallisissa akkreditoiduissa mittausraporteissa on paikka, päivämäärä ja V/m-tulos. | Historiallinen massaulosvienti edellyttää tiliä ja aluerajausta; sitä ei ole noudettu eikä muunnossääntöä ole vielä määritetty. |
| [Ofcomin mobile-signal-strength-mittaukset](https://www.ofcom.org.uk/phones-and-broadband/coverage-and-speeds/mobile-signal-strength-measurement-data) | `CANDIDATE_NOT_HELD` | Tievalikoiman mittaukset kattavat 2020–2025 ja rautatiemittaukset 2018–2019; mukana on koordinaatti- ja kuukausitietoa. | Voimakkain signaali on mitattu ajoneuvon kattoantennilla. Se ei ole kokonaisambientti EMF eikä organismin annos, joten sitä voidaan käyttää korkeintaan tarkoin määriteltynä signaali-/peittovertailuna, ei RF-dosimetriana. |
| [Ofcomin tukiasemaläheisyydessä tehdyt EMF-raportit](https://www.ofcom.org.uk/spectrum/electromagnetic-fields) | `CANDIDATE_NOT_HELD` | Ofcom julkaisee vuosittaisia tukiasemien lähellä tehtyjä EMF-mittausraportteja, yhden testiraportin kutakin käyntipaikkaa kohti. | Raporttikohtainen koneellinen poiminta, lisenssi, mittausprotokollan vertailukelpoisuus ja biologinen paikka–aika-avain ovat vielä arvioimatta. Ei korvaa kennel-, koti- tai AI-asemadosimetriaa. |

## Näyttövalmis sisäänottoportti

Lähde on vasta **analyysikelpoinen**, ei vielä kausaalisesti todistava, kun
samassa ennalta määritellyssä paneelissa on vähintään:

```text
(riippumaton paikka/alue, aikaleima, laji, biologinen päätepiste,
 mitattu E_RF, tärkeimmät mitatut sekoittajat, selkeä provenanssi)
```

`E_RF` tarkoittaa biologisesti relevantissa ympäristössä mitattua
kenttäsuuretta — ei liittymä-, tukiasema- tai internetkäyttöproxyä.
Paneelissa on oltava riittävästi toisistaan riippumattomia paikkoja ja
toistuvia ajankohtia, jotta ennalta lukittu viive- ja kontrastimalli voidaan
estimoida ilman yhden laitoksen, yhden intervention tai yhden
poikkileikkaushetken varaan jäämistä. Lopullinen havaintomäärä määritetään
ennen analyysiä vaikutuskoko- ja voimalaskelmalla; sitä ei saa korvata
jälkikäteen valitulla korrelaatiolla.

Tärkeimpiä sekoittajia ovat lajista riippuen ikä/rotu ja jalostusvalinta,
keräys- tai hoitoprotokolla, sää ja kausi, tauti/terveys, ravinto ja
elinympäristö sekä relevantit kemialliset altisteet. Tällainen paneeli tekee
F1–F6-tyyppisestä falsifikaatiosta mahdollisen. Se ei yksin ratkaise
kausaalisuutta, mutta ilman sitä väite ei ole empiirisesti testattavissa
tällä tasolla.

## Hankintajärjestys

1. **Valmis:** ANFR:n kokonainen mittausjulkaisuerä on lukittu raakamuodossa
   manifestiin ja normalisoitu erilliseen mitatun ambientti-RF:n kerrokseen.
   Seuraava työ ei ole jälkikäteinen yhdistäminen, vaan ennalta määritellyn,
   samaan paikkaan ja aikaan kohdistuvan biologisen rinnakkaispaneelin hankinta.
2. Lähetä DUA-/tutkimuspääsyhakemukset GRLS:lle, Dog Aging Projectille,
   VetCompassille ja tarvittaessa kansallisille kennelklubeille.
3. Pyydä AI-asemilta tai seminologiaverkostoilta monivuotinen,
   paikka- ja aikaan sidottu karju-/härkä-/koirasiemenaineisto sekä
   jalostus-, keräys- ja husbandry-kovariaatit.
4. Tee vasta luvallisesti saaduista aineistoista raakalähdemanifesti,
   säilytä puuttuvat arvot näkyvinä ja aja sopimusvalidointi ennen kuin
   mitään riviä tarjotaan sentinel- tai testirajapinnalle.

Kun jokin näistä vaiheista valmistuu, tilamerkintä muutetaan vasta sen jälkeen,
kun alkuperäistiedosto, käyttöehto ja koneellisesti tarkistettava provenance
ovat todella hallussa.
