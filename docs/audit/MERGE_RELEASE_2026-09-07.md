# Huolellinen yhdistäminen 7.9.2026

Yhdistelmä säilyttää aiemmin julkaistun työpuun kehityksen sekä `f971a29`:n uudet malliosat. Työ tehtiin erillisessä `/Users/ottojuote/.berm-integration-wt-20260907`-työkopiossa. Alkuperäistä `feat/mechanism-candidate`-työpuuta tai sen muutoksia ei korvattu yhdistelmällä.

## Palautuspisteet

Ennen yhdistämistä tallennettiin alkuperäinen indeksi, muutospatchit, kaikkien 902 tiedoston tarkistussummat ja tarkistettu täydellisen Git-historian bundle hakemistoon `/Users/ottojuote/.berm-merge-backups/20260907-210324`.

- Julkaistun työpuun lähtö-HEAD: `7a938dd3b528a76008557632fdaf0dca72e13dea`.
- Muutokset sisältävä snapshot: `0dc5188b0983955d9a2ed4e8b24bf45819985cdf`, haara `codex/merge-snapshot-20260907-210324`.
- Aiempi merge / main: `f971a29ebddb6df1a01376861a2421ef2c488753`.
- Säilytetty stash: `942aac480506d5998cc4c08a9956c41af84a1ad0`; ei popattu tai pudotettu.
- Erilliset backup-refit mainille, elävän puun HEADille ja stashille: `refs/backup/merge-20260907-210324/`.

Kaikki snapshotin 902 ja f971a29:n 835 tiedostopolkua ovat yhdistelmässä. Lisäksi alkuperäisen työpuun 902 tiedostoa, HEAD, indeksi ja stash verrattiin talteen otettuun tilaan: ei muutoksia.

## Säilytetty sisältö ja ratkaisut

| Kokonaisuus | Yhdistetty tulos |
|---|---|
| Atlas | 242 solmua ja 591 yhteyttä. Kaikki julkaistut 234 solmua ja 578 yhteyttä sekä uuden kanonisen graafin lisäykset mukana. Kuusi aliatlasta käyttää samaa tietoa. |
| Rekisterit | Molempien versioiden tarkat unionit: 73 väitettä, 158 evidenssisuhdetta, 73 arviota ja 1 164 lähdetunnistetta. Kaikilla suhteilla on provenienssitila. |
| Löydettävyys | 145 sisältöankkuria kattavat kaikki 73 väitettä; solmu- ja yhteyskohtaiset kuratoidut tiedot säilyvät. |
| Lähdekorjaukset | CatSper-rottakokeen rajaus, Kim/Cordelli-korjausperheet, Cry4a-/opsiinilähteet, Majewska-kohdistus ja väitteiden riippumattomuusauditointi säilyvät. |
| Matematiikka | Palautetut determinantti-, inverssi-, EH-, Weyl-, Bianchi-, Lorentz-, Jacobi-, SAR/Schwan- ja DKC-erottelut sekä uudet §2a-vaste- ja §4b-androgeeniosiot mukana. |
| Mallin laskenta | Moduloomi, kalenteri, vuorovaikutukset, odotusjakaumat, CLI ja demot säilyvät. Seitsemän vanhan ydinmoduulin suoritettava AST vastaa julkaistua snapshotia; v17:n lukitut numerot säilyvät. |
| Uudet rajapinnat | Valinnainen androgeeniliitos laskee oman porttinsa kerran. Etumerkillinen fysikaalinen vaste tarvitsee nimetyn, yksiköllisen siirron solun ajuriksi. Negatiivista ajuria ei peitetä itseisarvolla tai leikkauksella. |
| Tulkinta | L1-johto, ehdollinen formaali L2-operaattori, avoin fysikaalinen identifiointi, kudosydin ja päätepistekalibrointi ovat erillisiä. Komponenttinäyttö ei ratkaise viimeisiä automaattisesti. |

Sisältökonfliktit ratkaistiin väite- ja kenttäkohtaisesti. Stashin 25 tiedostoa käytiin läpi erikseen: jo mukana olevia korjauksia ei sovellettu uudelleen eikä vanhentuneita lukuja tai vahvempia kausaaliväitteitä palautettu. Kaikki viisi reittikuvausta säilyvät mallisivulla, mutta niiden erillisyys ei enää väitä todistettua tilastollista riippumattomuutta tai yksittäisen reitin riittävyyttä TFR-laskuun.

Tarkat osaraportit: [malli](MERGE_MODEL_2026-09-07.md), [rekisterit ja atlas](MERGE_REGISTRY_2026-09-07.md), [sivut](MERGE_SITE_2026-09-07.md) ja [komponentit sekä stash](MERGE_COMPONENTS_2026-09-07.md).

## Varmennus

- Pythonin koko sarja: **2 056 läpi**, molemmat hitaat testit mukana. Sen jälkeen riippumaton katselmointi löysi tyhjän tensoriakselin ja erittäin suurten androgeenipainojen ylivuodon. Nämä korjattiin julkisiin laskentaytimiin; lopullisen muutoksen **72 kohdetestiä läpäisty**. Täyden sarjan luku ei sisällä viimeksi lisättyjä regressiotapauksia.
- Puuttuvien syötteiden vanhat 27 epäonnistumista testattiin oikeilla hankituilla aineistoilla. Integraatiopuuhun kopioitiin 69 tiedostoa, 475 MB; kaikkien SHA-256 tarkistettiin. [Aineistomanifesti](../../berm/docs/merge-2026-09-07-data-manifest.json).
- Sivuston lopullinen sarja: **290 testiä / 27 tiedostoa läpi**. Aiempi livepuun 323/30-luku sisälsi myös erillisen sisäkkäisen agenttityöpuun kolme testitiedostoa. Testihaku rajaa nyt `.claude`- ja `.agents`-työkopiot pois; varsinaiset testit säilyvät.
- Matematiikan **138 kaavaa** renderöitiin KaTeXin tiukalla virhetilalla. Viiden kielen johtoehtoja tarkistetaan erikseen, joten englanninkielinen teksti ei peitä puuttuvaa paikallista ehtoa.
- Tiukka käännösavainten tarkistus: 85 COPY-sivua, ei tyhjiä englanninkielisiä avaimia. Raportti kuvaa myös muiden kielten ennestään osittaista kattavuutta; tämä ei ole täydellisen viisikielisyyden väite.
- Selaimessa: kaikki kuusi aliatlasta, 242/591-kokonaisnäkymä, androgeenihaku, uuden AR/ZIP9-solmun väite ja lähderajaukset, solmun avaus toisessa aliatlaksessa, C-suodatin/iiriskortti ja matematiikan avattava johtopaneeli toimivat. Suomen neljän skenaarion tulokset säilyvät (2,128 / 1,803 / 3,874 / 3,189), englannin korjauskapasiteettivertailu toimii ja seitsemän ASFR-riviä avautuu. Mobiilissa sisältö pysyy 383 px:n levyisessä näkymässä.

Lopullinen tuotantokäännös läpäisi tyyppi-, tiukan lint-, viite-, rekisteri- ja ankkuritarkistuksen. Kaikkien 522 esirenderöidyn sivun jälkitarkistus läpi: ei raakaviitetunnisteita, tyhjiä elementtejä tai tyhjiä linkkejä. Rekisterissä säilyvät 14 aiempaa DKC-julkaisuportin varoitusta; DKC on yhä kalibroimaton kandidaatti. [Koneellinen säilytystarkistus](MERGE_PRESERVATION_2026-09-07.json). Tuotannon jälkitarkistukset kirjataan tämän raportin jatkoksi. Julkaisun lähdekopio rajataan sivuston versionoituihin tiedostoihin ja olemassa olevaan julkaisukonfiguraatioon; paikalliset agenttityökopiot ja salaiset ympäristötiedostot eivät kuulu siihen.
