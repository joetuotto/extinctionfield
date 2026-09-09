# Havainnekuvien tuotannollinen viimeistely

9.9.2026. Lähtöversio: main `bddcd9c`. Katselmus koskee edellisessä julkaisussa lisättyjä seitsemää yhteistä havainnekuvakokonaisuutta ja niiden vaihtoehtoisia näkymiä.

## Arvio ja tavoite

Ensimmäinen toteutus oli toimiva, mutta piirrosjälki jäi osin kuvakkeiden tasolle. Pienet selitteet, vaihtelevat viivanvahvuudet, anatomisten rakenteiden pelkistys ja kuvaajien puutteelliset akselimerkinnät heikensivät toimituksellista laatua.

Tavoitteena on huolellisesti toimitettu tieteellinen verkkokuvitus: piirros auttaa paikantamaan kohteen, vertailu säilyttää asteikot ja kuva erottuu havainnosta. Yksityiskohtia lisättiin vain, kun ne auttavat tunnistamaan rakenteen tai reitin. Kaaviomaisuus säilyy näkyvänä; piirros ei esitä mikroskooppikuvaa, täsmällistä molekyylirakennetta tai mittauskarttaa.

Vertailuperusteina käytettiin Naturen [kuvaspesifikaatiota](https://research-figure-guide.nature.com/figures/preparing-figures-our-specifications/) ja [kuvapaneelien tuotanto-ohjetta](https://research-figure-guide.nature.com/figures/building-and-exporting-figure-panels/): muokattavat vektorit ja tekstit, akselit ja yksiköt, selkeät paneelit, luettavat kirjaimet, riittävä kontrasti sekä merkinnät, jotka eivät peitä kohdetta. Verkkonäkymän tekstikoko mitoitetaan näytölle. Lehtilähetyksen lopullinen leveys, fonttikoko ja PDF-/EPS-tiedosto valmistetaan erikseen kohdelehden ohjeen mukaan.

## Toteutetut korjaukset

| Kuvakokonaisuus | Korjaus ja vaikutus |
| --- | --- |
| Lähteet elinympäristössä | Rakennuksen leikkaus, johdotus, laitteet, kasvillisuus ja eliöiden muodot piirrettiin uudelleen. Kevyemmät ääriviivat ja erotellut materiaalipinnat. Kokonaiskuvan rinnalla valittavan lähteen mukaan rajautuva lähikuva. Numeron 2 osoitin seuraa lähteen todellista kuvareittiä. |
| Elin ja kudos | Kapseli, väliseinät ja erilliset tiehytkierteet erotetaan. Suurennos näyttää tukisolujen, sukusolujen, interstitiumin ja verisuonen eri sijainnit. Johdinten päät tarkistettiin. |
| Steroidogeeninen solu | Kalvojen, tuman, solulimakalvoston, lipidipisaroiden, lysosomin ja mitokondrioiden rakenteet tarkennettiin. Selitteet ovat suurempia, osakohteet erottuvat muodoista. Tutkimushaaran valinta säilyy nykyisessä yhteisessä tilassa. |
| Hormonin kompartimentit | Verisuonen seinämä, kantajaproteiinit ja vastaanottava solu tarkennettiin. Epätäydellistä rakennekaavaa muistuttava hormoni korvattiin yksiselitteisellä T-symbolilla; proteiinien kaavamaisuus kerrotaan. Symbolin teksti on tumma, ääriviiva värillinen. |
| Koeasetelmat | Hehku ja taustan liukuväri poistettiin. Käämit, mittapää ja koealusta piirrettiin selkeämmin. HTML-selitteille vähintään 12 px koko ja kohdistusviivat. Kuva pinoutuu riittävän varhain kapeassa sisältöalueessa. |
| Signaalirakenne | Molemmille signaaleille sama kiinteä −5…+5-amplitudiasteikko ja näkyvät tikit. Aikatikit, pulssien aktiiviset ikkunat ja yhtenäiset a/b-paneelit. RMS-laskenta säilyi täsmällisenä. |
| Atlaksen historiaesimerkki | G/U-radoilla yhteinen asteikko; A:n ja B:n kertymällä oma yhteinen, tasavälisillä tikeillä merkitty asteikko. Vuosi, yksiköt ja valitut arvot selkeästi samassa rakenteessa. |
| Kohtaamisen ajoitus | Kasvin ja mehiläisen muoto, siipisuonitus ja raajat tarkennettiin. Yhteistoiminnan ihmiset saivat profiili- ja vaateääriviivat. Aikajanan värit, selitteet ja jatkokuvat yhdenmukaistettiin. |

## Tuotantoperiaatteet

- SVG säilyttää viivat ja muodot terävinä eri näyttökoossa. Rasterikuvien keinotekoista suurentamista ei käytetä.
- Selitteet ovat HTML-tekstiä; vektorin numerot ja T-symbolit ovat tekstiä, eivät kirjainten ääriviivapiirroksia.
- Rajattu sininen–vihreä–okra-paletti yhdistää kuvia. Värin lisäksi kohteet erottaa numerosta, muodosta, viivatyypistä tai omasta paneelista.
- Otsikko, kuvapaneeli, selite ja menetelmähuomautus muodostavat selkeän lukujärjestyksen. Pienennettyä työpöytäkuvaa ei käytetä sellaisenaan mobiilin tekstiasetteluna.
- Kaikki piirrettyjen muotojen yksityiskohdat ovat edelleen havainnollistavia. Annosta, solumääriä, proteiinien stoikiometriaa tai mittakaavaa ei päätellä kuvasta.
- BERM:n laskenta, kalibraatio, havaintoaineistot ja mallin identiteetti säilyivät. FieldState ei saa uutta biologista roolia kuvituksesta.

## Katselmuksessa löytyneet lisäkorjaukset

Antennin lähikuvan yläreunaan lisättiin tilaa, jotta numeromerkki ei leikkaudu mobiilissa. Lähikuvan saavutettava selite kuvaa sen omaa rajausta. Solulimakalvoston osoitin siirrettiin poimun päälle. T-symbolin ja a/b-merkintöjen typografia ja kontrasti yhtenäistettiin. Historiatiedon puuttuminen ja palvelun sulkeminen säilyvät erillisinä tiloina.

## Varmennus

- Lopullinen testiajo: **960/960 testiä, 82 testitiedostoa**.
- Tuotantokoostaminen: TypeScript, tiukka ESLint, viite- ja mallirekisterit sekä 575 tuotantokohdetta valmistuivat. HTML-tarkistus: **567 reittiä, 0 raakaviitetokenia, 0 tyhjää elementtiä, 0 tyhjää linkkiä**. Mallirekisterin 14 aiempaa kalibrointi-/näyttöportin varoitusta säilyivät.
- Seitsemän kuvakokonaisuuden selainkatselmus sisälsi työpöytäkoon 1280 px ja mobiilikoon 390 px. Tarkistettiin anatomian kuvaparit ja solun haara, hormonin mobiiliasettelu ja tumma teema, laboratoriovertailun mittauspaikka, signaalin RMS-arvot 100 % aktiivisella osuudella, ekologisen esimerkin nollapäällekkäisyys, ihmishahmojen mobiiliasettelu ja atlaksen vuosikohdistuksen päivittyminen.
- Ympäristökuvan englanninkielinen lähikuva tarkistettiin erikseen: kaikki numeromerkit pysyvät rajauksen sisällä. Lopullisessa tuotantoesikatselussa varmistettiin sama antennin rajaus ja vaakaylivuodon puuttuminen.
- Tarkistukset koskevat verkkokuvitusta. Niitä ei esitetä nimetyn lehden tekemänä hyväksyntänä tai tieteellisen mallin validointina.
