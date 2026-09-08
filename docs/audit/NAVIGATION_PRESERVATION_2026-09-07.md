# Navigaation ja selitystasojen säilyvyysauditointi

**7.9.2026 — hyväksytty.** Vertailu tehtiin ennen muutoksia tallennettuun 356 tiedoston snapshotiin. Kaikki snapshot-tiedostot vastaavat tallennettuja SHA-256-tiivisteitään. Yhtään aiempaa tiedostoa, tarkastettua sivuankkuria, sivun lähde- tai väitetunnistetta tai rekisteritunnistetta ei kadonnut.

| Tarkastettava kokonaisuus | Ennen | Nyt | Kadonneet |
|---|---:|---:|---:|
| Snapshotin tiedostot edelleen olemassa | 356 | 356 | 0 |
| Vanhat sivut edelleen olemassa | 97 | 97 | 0 |
| Vanhojen sivujen kirjaimelliset `id`-ankkurit | 215 | 215 | 0 |
| Vanhojen sivujen dataobjektien `id`-ehdokkaat | 486 | 486 | 0 |
| Dynaamiset ankkurilausekkeet | 9 | 9 | 0 |
| Vanhojen sivujen eksplisiittiset lähdetunnisteet | 775 | 775 | 0 |
| Vanhojen sivujen eksplisiittiset väitetunnisteet | 21 | 21 | 0 |
| Dynaamiset lähdetunnistelausekkeet | 40 | 40 | 0 |
| Lähderekisterin tunnisteet | 1137 | 1156 | 0 |
| Väiterekisterin tunnisteet | 55 | 64 | 0 |
| Näyttösuhteiden tunnisteet | 115 | 131 | 0 |
| Mallin rekisteröityjen reittien tunnisteet | 4 | 5 | 0 |
| Päävalikon ja alavalikkojen eri kohteet | 38 | 53 | 0 |
| Tietoa-välilehtien eri kohteet | 5 | 6 | 0 |

Sivukohtaiset luvut ovat kunkin tiedoston erilaisten tunnisteiden summia. Sama tunniste eri tiedostoissa lasketaan erikseen. Luvut eivät tarkoita koko sivuston ainutkertaisten DOM-tunnisteiden määrää.

Vanhoista 97 sivusta viittä laajennettiin tai järjestettiin uudelleen: Malli, Näyttö, Tietoa, Epistemologia ja Sivilisaatio. Niiden aiemmat tarkastetut ankkurit ja viitteet säilyvät. Neljä uutta koontisivua lisättiin fysiikalle, biologialle, käyttäytymiselle ja näytön konvergenssille.

Vanhojen 55 väitteen, 115 näyttösuhteen ja neljän reitin tietueet säilyivät kokonaan muuttumattomina. Vanhoista lähdetietueista ainoastaan `bensimon2022_sleep_helping` sai uuden `corrections`-kentän, joka viittaa vuoden 2023 korjaukseen. Senkään aiempia kenttiä ei muutettu tai poistettu.

Etusivun vanha kohde säilyy lokalisoidussa logolinkissä. Epistemologian osoite pysyy `/epistemology`; Mittauksen, Ennusteiden, Artikkelien ja mallivertailun osoitteet säilyvät Näyttö-valikossa. Kaikki viisi aiempaa Tietoa-välilehteä ovat käytettävissä myös Epistemologian lisäämisen jälkeen.

## Menetelmä ja rajaus

Tiedostojen olemassaolo tarkistettiin koko manifestista. Jokainen vanha sivu verrattiin erikseen osajoukkoperiaatteella. Sivulähteet jäsennettiin asennetulla TypeScript-jäsentimellä: JSX:n `id`-, `referenceId`- ja `claimId`-attribuutit, vastaavat kirjaimelliset dataobjektien kentät, eksplisiittiset `[[ref:…]]`-viitteet sekä suorat lähdetietosivujen osoitteet. Dynaamisten attribuuttien lausekkeiden säilyminen tarkistettiin lähdetasolla.

Nykyiset valikkokohteet luettiin suorittamalla nykyinen navigaatiomoduuli; vanhan metatietoluettelon säilyminen tiedostossa ei siten yksin voinut saada vertailua läpi. Lisäksi navigaation 52 kohdistettua testiä kattavat vanhat kohteet, viisi kieltä, omistajuuden, Tietoa-välilehdet sekä desktop- ja mobiilitoiminnot.

Tämä auditointi osoittaa lähderakenteen ja tunnisteiden säilymisen. Dataobjektin `id` voi olla dynaamisen ankkurin lähtöarvo, joten sitä ei oleteta automaattisesti renderöidyksi DOM-ankkuriksi. Sisällön merkityksen, lopullisen renderöinnin ja selaintoiminnan tarkistukset täydentävät tätä auditointia erikseen.

Tarkat tiedostokohtaiset tulokset, tiivisteet ja rekisterilisäykset: [koneellisesti luettava auditointi](NAVIGATION_PRESERVATION_2026-09-07.json).
