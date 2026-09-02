# Erottelevat testit — BERM vs. konsensus

Nämä kolme testiä erottelisivat BERM:n primäärihaaran (polku B / RPM)
konsensusmallista. Yksikään 13 aiemmasta havainnosta ei testannut näitä.

## Testi D1: Suuntariippuvuus (solutaso)

**BERM ennustaa**: RPM-vaste riippuu B₀:n ja B_ext:n välisestä kulmasta
(Larmor-resonanssi, anisotrooppinen hyperfine)
**Konsensus ennustaa**: isotrooppinen vaste (tehoriippuvainen, ei suuntariippuvainen)
**Protokolla**: CRY-ekspressoivat solut, kontrolloitu B₀-suunta, 3 kulmaa × 3 kenttätasoa,
päätepiste: ROS tai melatoniinituotanto
**Kustannus**: ~5 000–15 000 €, toteutettavissa yhdellä solubiologian laboratoriolla
**Tulos jos B₀-kulmariippuvuus löytyy**: BERM:n RPM-polku vahvistuu merkittävästi
**Tulos jos ei löydy**: RPM-polun suuntariippuvuusennuste falsifioitu

## Testi D2: Kohorttiporrashypoteesi (demografinen)

**BERM ennustaa**: 4G-kaudella (2012+) syntyneet kohortit näyttävät eri ASFR-profiilin
kuin 2G-kaudella syntyneet, kontrolloituna kulttuurisille muuttujille
**Konsensus ennustaa**: ei kohorttiporrasta teknologiasukupolven mukaan
**Protokolla**: WPP ASFR-data, ikäryhmittäinen analyysi, kohortin syntymävuosi vs.
teknologiasukupolvi, maakohtaiset kiinteät vaikutukset
**Kustannus**: 0 € (julkinen data), ~2 viikkoa työtä
**Aikataulu**: osittain testattavissa nyt (2G-kohortit ovat nyt 25-35v), täysi testi 2030+
**Tulos jos porrashypoteesi pätee**: vahva BERM-tuki
**Tulos jos ei päde**: kohorttivaikutusennuste falsifioitu

## Testi D3: Lajihierarkia (spin-koherenssi × populaatiolasku)

**BERM ennustaa**: CRY-proteiinin spin-koherenssiaika ennustaa lajien välisen
herkkyysjärjestyksen: pidempi koherenssi → suurempi herkkyys → nopeampi populaatiolasku
**Konsensus ennustaa**: ei ennustetta lajien välisestä järjestyksestä
**Protokolla**: kirjallisuussynteesi CRY-koherenssiajoista × populaatiotrendidata
(mehiläinen, muuttolintu, kotivarpunen, koira, ihminen)
**Kustannus**: 0 € (kirjallisuusdata), ~1 viikko
**Tulos jos korrelaatio löytyy**: BERM:n mekanistinen ydin vahvistuu
**Tulos jos ei löydy**: RPM-lajihierarkiaennuste falsifioitu

---

## Suhde luokittelutaulukkoon

`CLASSIFICATION_TABLE.json` merkitsee viidelle havainnolle erottelevan testin
(F01, F02, F04, F10, F11). Ne ovat havaintokohtaisia jatkotestejä: ne
ratkaisisivat, mitä kyseinen aineisto olisi voinut kertoa, jos se olisi
kerätty erottelevasti.

Yllä olevat D1–D3 ovat eri asia. Ne eivät korjaa aiempaa aineistoa vaan
testaavat BERM:n primäärihaaran (polku B / RPM) ennusteita, joita yksikään
13 havainnosta ei koskettanut. Tästä syystä mallin metadatassa
`discriminating_tests_needed = 3` (D1–D3), kun taas luokittelutaulukon
`summary.discriminating_tests_needed = 5` (havaintokohtaiset jatkotestit).

Kummankaan joukon testeistä ei ole suoritettu:
`discriminating_tests_completed = 0`.
