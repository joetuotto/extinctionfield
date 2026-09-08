# Rekisterien ja atlaksen integraatio — 7.9.2026

Tarkistus koskee integraatiopuuta `/Users/ottojuote/.berm-integration-wt-20260907`: merge-commit `f971a29` ja julkaistun työpuun snapshot `0dc5188`, yhteispohjana `7a938dd`. Elävää työpuuta ei muutettu. Ratkaisu perustuu tunnisteisiin ja kenttäkohtaisiin muutoksiin, ei committien ikään tai kokonaismäärän vertailuun.

## Säilytysmatriisi

| Kokonaisuus | Julkaistu snapshot | f971a29 | Integraatio / tarkistus |
|---|---:|---:|---|
| Väitteet | 55 | 56 | 73: tarkka ID-unioni, nolla kummankaan puolen kadonnutta ID:tä |
| Evidenssisuhteet | 115 | 136 | 158: tarkka ID-unioni, nolla kadonnutta ID:tä |
| Näyttöarviot | 55 | 56 | 73: tarkka ID-unioni, nolla kadonnutta ID:tä |
| Reitit | 4 | 4 | Kaikki neljä säilyvät; provenienssi ja riippumattomuusauditointi mukana |
| Bibliografia | 1 137 | 1 161 | 1 164: tarkka ID-unioni, ei uusia tunnisteiden poistoja tai aliasyhdistämisiä |
| Atlas | 234 / 578 | 76 / 133 | 242 solmua / 591 yhteyttä; kaikki snapshotin 234 ID:tä ja 578 suunnattua yhteyttä säilyvät |
| Kanoninen graafi | 39 / 83 | 47 / 96 | Kaikki 47 solmua ja 96 yhteyttä mukana atlas-kartoituksessa |
| Aliatlakset | 6 + kaikki | Vanha käyttöliittymä | Kuusi yhteistä aliatlasta ja kaikki-näkymä säilyvät |
| Atlasväiteliitokset | 50 solmua / 5 yhteyttä | Ei uutta liitosrekisteriä | 58 solmua / 5 yhteyttä; kaikkien 73 väitteen esitys samasta rekisteristä |
| Sisältöankkurit | 92 / 55 väitettä | 57 / 39 väitettä | 145 / kaikki 73 väitettä; 88 dynaamista atlasankkuria |

Väitteiden, relaatioiden, arvioiden ja lähteiden ID-joukot verrattiin suoraan kummankin Git-objektin JSON-tietoihin. Atlaksen vertailu suoritti snapshotin TypeScript-moduulit Git-objekteista muistissa ja vertasi integraation solmu-ID:itä sekä suunnattuja `(from,to)`-pareja. Generoituja tiedostoja ei käytetty käsin yhdistettyinä totuuslähteinä.

## Rekisteriratkaisut

Snapshotin 17 uutta komponenttiväitettä ja 22 relaatiota säilyvät, samoin f971a29:n 18 uutta väitettä ja 43 relaatiota. Yhteisten relaatioiden kuratoitu sisältö säilyy. Kaikilla 158 relaatiolla on eksplisiittinen provenienssitila; f971a29:n 43 lisärelaatiolle annettiin `partial` ja tyhjät selvittämättömät tutkimus-, aineistoperhe- ja premissilistat. Puuttuvasta tarkastuksesta ei muodostu riippumattomuusväitettä.

Kahdessa aidossa tekstiristiriidassa (VGCC-väitteen ja sen reitin kuvaus) säilytettiin julkaistu rajaus: mittaustietue ei ole biologinen syy eikä komponenttikoe kalibroi koko reittiä. F971a29:n muut lisäykset säilyvät kenttäkohtaisesti. Siittiö- ja pariväitteen falsifikaatiotekstit käyttävät sen tarkempaa erottelua BERM:n vastearvion ja FieldState-yhteensopivien fysikaalisten mittausten välillä.

Proxyväitteen revisio 3 yhdistää molemmat perustelut: v17:n kaksikanavainen ajoitusproxy ja normalisoidun rank-one-koordinaatin muotovastaavuus sekä snapshotin eksplisiittinen projektio ja `q=N(z_proxy)`-identifiointirajaus. Proxy ei muutu paikalliseksi annokseksi tai kudosvasteen kalibroinniksi.

Riippumattomuus seuraa lähdealiaksia, alkuperäis-/korjausjulkaisun identiteettiä, tutkimuksia, aineistoperheitä, premissejä ja rekursiivisia väiteriippuvuuksia. Neljän nykyisen reitin kuudesta parista **4 on riippuvaisia, 2 selvittämättömiä ja 0 vahvistetusti riippumattomia**. Kaikkien reittien `independenceVerified` pysyy arvossa `false`. Tätä jakaumaa ja selvittämättömän tilan käsittelyä tarkistetaan testeissä.

## Lähteiden rajaukset ja korjaukset

- Meng/Kish säilyvät saman kemiallisen muistin väitteen yhteydessä.
- Majewska-suhde kohdistuu `claim.receptor.membrane-orientation`-väitteeseen. Sitä ei palauteta sovelletun kenttävektorin vasteen tueksi.
- Görtemakerin Cry4a–Gtα- ja Yeen opsiini–Gtα-sitoutumiskokeilla on omat lähteet ja väitteet. Koostettu kilpailuhaara säilyy ehdollisena.
- Kim 2026:n korjausjulkaisu ja alkuperäinen säilyttävät vastavuoroiset `correctionOf`/`corrections`-linkit. Korjaus on taustoittava suhde, ei uusi riippumaton tukikoe. S1J-interpolaation rajoitus säilyy.
- Cordellin korjausjulkaisun identiteettilinkki säilyy.
- CatSper 2021 säilyy Ayas/Kocaman-rottakokeena: 2100 MHz, 1 h/päivä, 28 päivää; motiliteetti-/Ca²⁺-löydös, ei merkitsevää parittelu-/elävänä syntymän eroa, keskeneräinen CatSper-geenianalyysi ja epäspesifinen amlodipiinivertailu. Myös bibliografian aiemmin korjaamaton `finding`-teksti täsmennettiin tämän mukaiseksi.
- Snapshotin legacy-migraatiostatukset säilyvät. F971a29:n aktiivisiin väitesuhteisiin jo kuratoidut Yoshii 2009 ja Sempou 2022 siirrettiin lisäksi `MIGRATION_CANDIDATE`-tilasta tilaan `SUPERSEDED_BY_ACTIVE_RECORD`, alkuperäinen historia ja aktiiviset relaatiot säilyttäen.

Bibliografian laskurit laskettiin uudelleen: 1 164 tietuetta, 487 `verified`-merkintää, 494 varmennettua julkaistavaa linkkiä ja 46 aliasta. Näitä eri määritelmiä ei sekoiteta tutkimusten tai riippumattomien kokeiden määrään.

## Atlas ja teorialinja

Kanoniseen atlas-kartoitukseen lisättiin kahdeksan solmua: `LINDGREN_METRIC_DRIVE`, `ANDROGEN_BINDING_AVAILABILITY`, `ANDROGEN_RECEPTOR_SIGNAL`, `INDIVIDUAL_BEHAVIORAL_RESPONSE`, `BIOBEHAVIORAL_WEIGHTING`, `NARRATIVE_ATTRIBUTION`, `EPISTAPEGE_OBSERVABILITY_LOSS` ja `INSTITUTIONAL_MODEL_REUSE`. Niillä on kaksikieliset kuvaukset, lähdepolut ja väiteliitokset. Androgeenihaarat kuuluvat myös lisääntymisaliatlakseen.

Graafin `inference_input`, `derived_geometry` ja `conditional_response` kuvataan vastaavasti mittauspäättelynä, premissien alaisena johtona ja ehdollisena L2-vasteena. Jokaisen kanonisen yhteyden rooli tarkistetaan. Vanhasta atlasversiosta ei palauteta virheellistä `ch_if → epi_kaiser_series`-kausaalinuolta; julkaistu mittaushavaintoon liittyvä assosiaatio säilyy.

F971a29:n teorialinja säilyy: BERM:n formaali L2-operaattori on ehdollinen minimaaliselle materia–metriikkakytkennälle ja vasteteorialle. Gauge, fysikaalinen mittakaava, havaitsijavalinta, kudosydin ja päätepistekalibrointi ovat erikseen avoimia. Atlaksen aiempi yleinen ”L2-operaattori avoin” -sanamuoto täsmennettiin tähän erotteluun. Komponenttitutkimuksia ei nimetty näiden avoimien kohtien validoinniksi.

Uusi käyttöliittymä, hakualiaset, suodattimet, listanäkymä, syvälinkit, näppäimistö-/hiiriavaus, väitekohtaiset näyttöarviot ja lähderajaukset säilyvät. Iiriskortti on C ja genotyyppikortti M|C myös suodatuksessa.

## Stash 942aac4

Stashia ei popattu eikä sovellettu kokonaisuutena.

| Stashin osa | Ratkaisu |
|---|---|
| Bibliografian 63 `pathway`-muutosta | Sovellettu tunniste- ja kenttäkohtaisesti. Nykyinen kenttä vastasi jokaisessa tapauksessa stashin pohjaa tai sen tavoitetta; nolla ristiriitaa. Korjausmetadata säilyi. |
| `metadata.pathway_scheme` | Säilytetty selittämään vanhoja A–F-luokkia ja niiden uudelleenluokitusta. |
| Map-otsikon 63→76 solmua / 8→7 vaihetta | Korvautuu uudella rekisteriin perustuvalla atlaksella; vanhoja kovakoodattuja lukuja ei palauteta. |
| Layers: RPM-ensisijaisuus, yleinen CRY/FAD-sääntö, Kiinan TFR-selitys | Ei palauteta laajoja yleistyksiä. Nykyiset alatyyppi-, protokolla- ja päätepisterajaukset toteuttavat asianmukaisen rajatun tulkinnan. |
| Layers: 8→12 elintä yhdessä kielessä | Ei palauteta erikielistä kovakoodattua lukua. Elimet tulevat omasta lähdeinventaaristaan. |
| Layersin todellinen merge-konflikti | Säilytetty sekä f971a29:n este-feedbackin suunnan/vahvistuksen kalibrointirajaus että snapshotin valmistettujen vesikkelien kalvonsiirtokoe ja luonnollisen kudossiirron erillinen hypoteesistatus kaikilla viidellä kielellä. |
| Evolution-metadatan stash | Ei tämän osion omistuksessa; koontiagentti käsittelee erikseen. |

## Kohdennettu varmennus

- 115/115 testiä, 9 tiedostoa: atlasdata, atlaspeitto, atlasväitteet, dynaamiset ankkurit, riippumattomuus, väiterekisteri, komponenttilähteet sekä atlas- ja väitekomponenttien toiminta.
- Täyden sarjan löytämä aliatlas-kuvauksen täsmennys: kudosytimen avoimuus nimetään erikseen päätepistekalibroinnin rinnalla. `causal-chain-separation.test.ts`: 3/3 testiä läpi tämän muutoksen jälkeen.
- Omistettujen TypeScript-/React-tiedostojen ja validaattorien ESLint: nolla virhettä tai varoitusta.
- Koko sivuston `tsc --noEmit`: läpi.
- Viitevalidointi: läpi, 1 164 kanonista tunnistetta / 46 aliasta / 743 rakenteellista lähdekäyttöä / 494 julkaistavaa linkkiä.
- Rekisterivalidointi: 0 virhettä, 14 aiempaa DKC-julkaisuportin varoitusta; 47 solmua / 96 yhteyttä / 73 väitettä / 158 relaatiota / 73 arviota.
- Sisältöankkurit generoitu lähteistä; kaikki 73 väitettä löytyvät.

Täysi yhdistelmän testisarja, tuotantokäännös ja selainvarmennus kuuluvat koontiagentin lopulliseen tarkistukseen. Tämä osatehtävä ei tee committia, pushia eikä julkaisua.
