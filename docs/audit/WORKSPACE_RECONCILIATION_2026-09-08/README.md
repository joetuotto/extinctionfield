# Alkuperäisen työtilan ja julkaistun version yhdistäminen

8.9.2026 · Toteutettu suoraan alkuperäisessä työtilassa `/Volumes/kovalevy 3/extinctionfield`.

## Lopputulos

**Alkuperäinen työtila sisältää nyt julkaistun mallin ja sivuston kaikki tarkastetut parannukset sekä alkuperäisen työtilan omat tutkimusmuistiot ja paikallisen datan.** Yhdistäminen tehtiin yhteiseen lähtöversioon perustuvana sisältövertailuna. Julkaistu versio osoittautui alkuperäisten työmuutosten jatkokehitykseksi.

Mallin alkuperäisistä 41 työmuutostiedostosta 33 vastasi julkaistua täsmälleen. Kahdeksan muuta olivat julkaistun version aiempia muotoja. Kaikki niiden alkuperäinen toteutettu toiminnallisuus säilyy julkaistussa, ja rinnalle tulee muun muassa ehdollinen vasteoperaattori, androgeenireitti, interventioprotokollat ja tutkimusten koostamisen laajennuksia. Yhtään alkuperäistä toteutusfunktiota tai luokkaa ei poistunut. V16:n alkuperäiset laskentakaavat ja kertoimet säilyvät.

Sivuston 125 eroavaa tiedostoa tarkastettiin samalla periaatteella. Alkuperäisestä ei löytynyt erillistä tuotantolisäystä, joka puuttuisi julkaistun sisällöstä. Matematiikan näennäiset poistot olivat sisällön siirto omaan komponenttiin. Alkuperäiset navigaatiokohteet säilyvät; Etusivu ja kaikki seitsemän pääryhmää ovat näkyvissä. Automaattinen yhdistäminen olisi lisännyt epistemologiasivulle saman lukuoppaan kahdesti; tämä vältettiin valitsemalla tarkastettu julkaistu toteutus.

Tässä työssä yhdenmukaistettiin jo toteutetut versiot. Edeltävän syndrooma-auditoinnin ehdottamat uudet tieteelliset sisältömuutokset säilyvät erillisenä seuraavana työnä. Julkisen sivuston mallisisältö oli jo tämä edistyneempi kokonaisuus, joten sen muuttaminen tai uusi julkaisu ei ollut tarpeen työtilan synkronoimiseksi.

## Vertailun lähtötilat ja menetelmä

| Kohde | Tarkka tunniste |
|---|---|
| Yhteinen lähtöversio / alkuperäisen haaran aiempi HEAD | `7a938dd3b528a76008557632fdaf0dca72e13dea` |
| Julkisen sivuston lähdeversio, tarkistettu main | `0840703960d8c044d4224c0fd6e1d963f5ac5a3a` |
| Alkuperäisen työtilan muuttumaton varmistustilannekuva | `afe40cecc5fbc600b98e13b53bac8f07f3e272cf` |
| Julkaisutyötilan muuttumaton varmistustilannekuva, myös sen auditointimerkinnät | `644cba650601dc79d8edd2960276a9a8a76d4c9c` |
| Alkuperäisessä työtilassa tehty tarkistuspiste ennen yhdistämistä | `5911e06c7c81db20f40f7a1a097d4eb32f193a63` |
| Työskentelyhaara alkuperäisessä hakemistossa | `codex/reconcile-workspace-20260908` |

Molemmista työtiloista otettiin ensin Git-tilannekuva sekä erillinen arkisto muuttuneista ja uusista tiedostoista. Yhteiseen lähtöversioon verrattu 1 048 tiedoston unioni jakautui seuraavasti:

- 807 tiedostoa oli molemmissa tilannekuvissa sama.
- 154 tiedostossa muutos oli vain julkaistun puolella.
- 64 tiedostossa molemmat poikkesivat lähtöversiosta ja toisistaan.
- 23 tiedostoa oli vain alkuperäisen puolen uutta tutkimusauditointia; nämä säilyivät täsmälleen.

Mallin, sivuston ja rekisterien eroja tarkastettiin rinnakkain kolmessa erillisessä arvioinnissa. Kaikki 64 eriytynyttä tiedostoa ratkaistiin näiden sisältöperustelujen mukaisesti. Git-historiaan säilyvät sekä alkuperäisen työtilan tarkistuspiste että julkaistun version kehityshistoria. Pelkkä uudempi päivämäärä tai suurempi rivimäärä ei ollut valintaperuste.

## Säilytetyt edistyneemmät kokonaisuudet

| Kokonaisuus | Yhdistetty sisältö |
|---|---|
| Fysiikka ja mallin identiteetti | Lindgrenin tensorihäiriö, ehdollinen viiveellinen vaste, tilakonteksti ja BERM/FieldState-roolien yhtenäinen määrittely. |
| Elinkohtainen dynamiikka | Alkuperäiset kalsium-, kalvo-, palautumis-, valo- ja kudostilat sekä laajemmat interventioprotokollat ja niiden profiilit. |
| Hormonit ja lisääntyminen | Androgeenin saatavuus, sitoutuminen ja reseptorivaste; eksplisiittiset sovittimet nykyiseen lisääntymisreittiin; samojen vaikutusten kaksinkertaisen laskennan estot. |
| Tutkimusten koostaminen | Nykyiset synteesiklusterit, lähteiden ja väitteiden suhteet sekä niiden kytkentä mallin rakenteeseen. |
| Yksilöstä sivilisaatioon | Biologinen tila, motivaatio, vuorovaikutus ja instituutiot; uusi normalisoitu institutionaalinen muisti säilyy alkuperäisen yksiköllisen sosiaalisten varantojen mallin rinnalla. |
| Sivusto | Koko selityspolku, ajantasainen navigaatio, matematiikan sisältö, atlas ja farmakologisten koeprofiilien näkymät kaikissa olemassa olevissa kieliversioissa. |
| Tutkimusvaranto | Molempien työtilojen muistiot, alkuperäisen uusin syndrooma-auditointi ja paikalliset tutkimusaineistot. |

## Rekisterien säilyminen

Riippumaton lopputarkastus vertasi tietueiden tunnisteet ja alkuperäisessä muutetut tietokentät molempiin muuttumattomiin tilannekuviin. Alkuperäisiä lisäyksiä tai muutoksia ei kadonnut. Kaikki 12 tarkastettua kanonista JSON-kokonaisuutta vastaavat julkaistua sisältöä.

| Rakenne | Alkuperäinen työtila ennen | Yhdistetty työtila |
|---|---:|---:|
| Lähteet | 1 156 | 1 191 |
| Väitteet | 64 | 99 |
| Evidenssisuhteet | 131 | 186 |
| Episteemiset arviot | 64 | 99 |
| Argumentaatioreitit | 5 | 5 |
| Kanonisen graafin solmut / kaaret | 39 / 83 | 47 / 96 |
| Atlaksen yksilölliset väitesidokset | 70 | 116 |

Kaikki 99 väitettä ovat sidottuja atlakseen. Kaikki alkuperäiset graafin päätepisteparit säilyvät. Graafin vanhempi-/lapsiluettelot vastaavat sen 96 kaarta, ja rekisterien viittaukset ratkeavat.

Uudelleen muodostettujen mallipeilien sisältö vastasi julkaistua. Sivuston ankkuri-indeksissä päivittyi ainoastaan muodostusajankohta; sen ankkurit ja niiden sijainnit ovat samat.

## Paikallinen data ja palautettavuus

Erillinen varmistushakemisto on:

`/Volumes/kovalevy 3/berm-workspace-backups/20260908T081638Z/`

Se sisältää:

- `manifest.json`: molempien lähtötilojen commitit, puut, varmistushaarat ja tiedostojen tarkisteet.
- `original-working-changes.tar.gz`: alkuperäisen 224 muuttunutta/uudeksi lisättyä tiedostoa.
- `published-working-changes.tar.gz`: julkaisutyötilan kahdeksan auditointimuutosta.
- `original-only-local-data.tar.gz`: 287 alkuperäisessä olevaa paikallista tiedostoa, joita julkaisutyötilassa ei ollut; pakkaamaton koko noin 1,09 Gt.
- Lähtötilojen indeksit ja muutoskuvaukset sekä kolmen version tiedostoinventaario.

Kaikkien kolmen arkiston tiedostosisällöt luettiin ja tarkistettiin SHA-256-tunnisteilla. Yhteensä 341 paikallisen tutkimus-/asetustiedoston, noin 1,56 Gt, tarkisteet verrattiin uudelleen yhdistämisen ja testien jälkeen: **yksikään ei muuttunut tai kadonnut**. Arkistojen tiedostoja ei tarvitse siirtää normaalin työn jatkamiseksi; alkuperäiset aineistot ovat edelleen paikoillaan.

Git-varmistushaarat ovat `codex/backup-original-20260908t081638z` ja `codex/backup-published-20260908t081638z`. Ne sisältävät nimetyt lähtötilannekuvat. Niiden avulla voidaan myöhemmin tarkastaa alkuperäiset lähdetiedostot täsmälleen. Versionhallinnan ulkopuolisen paikallisen datan palautuslähde on erillinen data-arkisto. Varmistukset ja aiemmat työtilat jätettiin talteen.

## Valmiin yhdistelmän testaus

Kaikki alla olevat suoritukset tehtiin alkuperäisessä työtilassa yhdistämisen jälkeen.

| Tarkistus | Tulos |
|---|---|
| Koko Python-mallin testisarja | **2 122 / 2 122 läpäisi**, noin 167 sekuntia. |
| Sivuston testit | **470 / 470 läpäisi**, 36 testitiedostoa. |
| Mallin arkkitehtuuri-, graafi-, modulooma- ja interventioprofiiliviennit | Onnistuivat; mallin ja sivuston peilit vastaavat toisiaan. |
| Interventio- ja ehdollisten skenaarioiden ajantasaisuustarkistus | Läpäisi. |
| Lähde- ja väiterekisterit | Lähdetarkistus läpäisi; väiterekisterissä 0 virhettä. |
| TypeScript ja tiukka ESLint | Läpäisivät osana julkaisukäännöstä. |
| Täysi Next.js-julkaisukäännös | Läpäisi, noin 86 sekuntia. |
| Muodostetun HTML:n tarkistus | 542 reittiä; 0 raakaviitemerkintää, 0 tyhjää sisältöelementtiä, 0 tyhjää linkkiä. |
| Kielikattavuuden rakennetarkistus | 89 COPY-sivua, 0 tyhjää englanninkielistä avainta. Olemassa oleva käännösten varakielikäytäntö säilyy. |
| Paikallinen selaintarkistus | Etusivu, kaikki kahdeksan päävalikkokohtaa, Näyttö-valikko, Escape, vieritys, Timothy-reitti ja atlas toimivat. |
| Atlaksen interventiosuodatin | Koko atlas 251 kanavaa / 611 yhteyttä; kahdeksan koeprofiilin suodatin 21 kanavaa / 30 yhteyttä. |

Selaintarkistus tehtiin tämän työtilan uudesta tuotantokäännöksestä erillisessä paikallisessa palvelussa 1280 × 720 -näkymässä. Kaikki pääotsikot olivat näkyvissä, vaakaylivuotoa ei ollut, ja header pysyi kohdassa y=0 myös 700 pikselin vierityksen jälkeen. Näyttö-valikon 18 linkkiä mahtuivat näkymään. Uutta mobiilikoon selaintarkistusta ei tehty tässä yhdistämisessä; julkaistun navigaation toteutus säilyi ja sen automaattiset testit läpäisivät. Testipalvelu ja väliaikainen selainvälilehti suljettiin; käyttäjän julkinen mallisivu säilyi.

Rekisteri raportoi edelleen 14 ennestään olevaa DKC:n erillisen täysvalidoinnin porttiin liittyvää varoitusta. Ne eivät ole yhdistämisessä syntyneitä virheitä. Ohjelmistotestien läpäisy todentaa toteutuksen toimintaa ja yhtenäisyyttä, ei uutta empiiristä vahvistusta mallin tieteellisille väitteille.

## Työskentely jatkossa

Jatkotyö tehdään tässä alkuperäisessä hakemistossa. Työskentelyhaara seuraa `origin/main`-haaraa, ja julkaistu lähdeversio sisältyy sen historiaan. Sivuston ja mallin seuraavat muutokset tehdään samaan kokonaisuuteen ja niiden muodostetut peilit tuotetaan tästä lähteestä. Näin aiempi tilanne, jossa julkaisut etenivät toisessa työtilassa alkuperäisen jäädessä vanhaan lähtöversioon, ei jatku tämän työn pohjana.

Yhdistäminen tallennettiin paikalliseen versionhallintaan. Tämän synkronoinnin vuoksi ei tehty uutta julkaisua tai muutettu etäpalvelun main-haaraa: varsinainen tuotantosisältö vastaa jo siellä julkaistua versiota. Alkuperäisen työtilan uudet auditointiliitteet ja yhdistämisen tarkistustulokset ovat mukana paikallisessa yhdistelmässä.

## Tarkastusjäljet

- [Mallin kahdeksan eriytyneen tiedoston perustelut](berm-reconcile-model-review.md)
- [Sivuston sisältö- ja navigaatiovertailu](BERM_SITE_RECONCILIATION_REVIEW_20260908.md)
- [Rekisterien kolmikantavertailu](berm_registry_reconciliation_review.md)
- [Rekisterien riippumaton lopputarkastus](FINAL_REGISTRY_PRESERVATION.md)
- [Kaikkien tiedostojen kolmikantainventaario](three_way_inventory.json)
- [Ratkaisupäätökset](resolution.json)
- [Sisällön ja paikallisen datan lopputarkastus](final_content_preservation.json)
- [Varmistusarkistojen tarkastus](backup_verification.json)
- [Mallin testit](model-tests.json), [sivuston testit](website-tests.json), [julkaisukäännös](website-build.json), [kielikattavuus](translations.json)
- [Selaintarkistuksen mitatut tulokset](browser_checks.json)
