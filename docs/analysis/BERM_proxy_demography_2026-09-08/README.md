# Väestötieteen selitysten integraatio proxy masking -sivulle

8.9.2026. Toteutus työpuussa `/tmp/extinctionfield-proxy-demography-20260908`. Osio **”Väestötieteen selitykset samassa ketjussa”** lisättiin `/model/proxy-masking`-sivulle kokemusta ja fragmentaatiota käsittelevien osioiden jälkeen, ennen parsimoniaa. Ankkuri on `#demographic-explanations`; aikaisempi proksiosio linkittää siihen.

## Lähdedokumentit

- Käyttäjän liite: `9dc10194-89fd-4ed6-846b-b2b509112cce/pasted-text.txt`, *Väestötieteen selitysmallit BERM-premissien valossa*, 23 kohtaa.
- [history_sources.md](history_sources.md): teoriat, ehkäisy, historiallisen ajoituksen ja politiikkavaikutusten lähdeauditointi.
- [demography_sources.md](demography_sources.md): matalan syntyvyyden loukku, SDT, sosiaalinen vertailu, odotukset, ajoitus ja ART; Morgan–Rackin-kuvan täsmällinen mittausasetelma.
- [presentation.md](presentation.md): toteutuksen lukupolku, kaikkien 23 kohdan sijoittelu ja kuvien tehtävät.
- [published_reference_ids.json](published_reference_ids.json): integraation **14 uutta kanonista lähde-ID:tä**. Tarkistetut ehdotustietueet ovat [history_references.json](history_references.json), [demography_references.json](demography_references.json) ja [additional_references.json](additional_references.json). Uutuus tarkoittaa tähän integraatioon lisättyjä rekisteriviitteitä, ei 14 uutta tutkimusta.

## Toteutettu 23 / 4 / 2 -rakenne

**23 selitystä** on sijoitettu **neljään ryhmään**: ympäristö ja kehityskulku (6), aikeet ja toteuttamisen ehdot (7), biologinen kapasiteetti (5), yhteisön palaute (5). Becker kuuluu ympäristöryhmään, älypuhelimet palautteeseen ja lapsiperhetuet toteuttamisen ehtoihin. Kerrallaan näkyy yksi ryhmä ja enintään yksi avoin selitys. Jokainen erottaa havainnon, BERM:n johtopäätöksen ja tutkimusnäytön.

**Kaksi kuvaa** täydentää olemassa olevia kuvia: lapsitoiveen toteutumisen prosessikuva ja empiirinen odotus–toteutuma-vertailu. Prosessin neljä valitsinta korostavat ajoitusta, edellytyksiä, kapasiteettia ja hoitoa; ne eivät simuloi lukuarvoja. Vastaanottotila liittyy BERM:n ehdollisessa mallissa sekä motivaatioon että kapasiteettiin. Resurssit, politiikka ja ehkäisy säilyvät todellisina vaikuttavina reitteinä.

Sivun neljä peittymistasoa säilyvät. Liitteen tutkimus- ja attribuutioepäsymmetria kuuluu episteemiseen peittymiseen; sensorinen peittyminen on edelleen toinen taso. Teoriaryhmät ovat erillinen lukemisen aihejako. Integraatio ei lisää ennusteita, politiikkasimulaatioita tai tutkimusohjelmaa.

## Mallin johtamisraja

Tehtävän alussa tarkistettiin Lindgrenin vuoden 2025 formulointi (DOI [10.1088/1742-6596/2987/1/012001](https://doi.org/10.1088/1742-6596/2987/1/012001); tekijän [esipainos, yhtälö 5](https://www.preprints.org/manuscript/202503.2321)). Muodosta `gμν = ημν + AμAν`, BERM:n eksplisiittisestä skaalauskertoimesta κ ja jaosta `A = A₀ + a` seuraa tensorimuotoinen erotus `Δgμν = κ(A₀μaν + aμA₀ν + aμaν)`. Tämä geometrinen erotus ei yksin määritä biologista vastetta.

Biologinen liitos `rᵢ = Ξᵢ[S](Δg)` on BERM:n ehdollinen L2-oletus: gauge-valinta, fysikaalinen skaala, kudosytimet, merkki, viive ja ihmisen päätemuuttujien kalibrointi pysyvät avoimina. Tämän liitoksen ehdolla tarkasteltava jatko on vastaanottotila → motivaatio ja kapasiteetti → mahdollisuudet ja ajoitus → yritys tai hoito → raskaus ja syntymä; väestötulos muodostuu yksilöiden, ikien ja ajan yli. FieldState pysyy mahdollisena syötteen mittaus- tai estimointihaarana. Väestötieteelliset ja biologiset osahavainnot rajaavat omia yhteyksiään, eivät vahvista geometriaa takautuvasti.

## Empiirisen kuvan luvut

Morgan & Rackin 2010, taulukko 2A, DOI [10.1111/j.1728-4457.2010.00319.x](https://doi.org/10.1111/j.1728-4457.2010.00319.x), ID `morgan2010_intentions_realization`. Samojen NLSY79-henkilöiden odotettu kokonaislapsiluku noin 24-vuotiaana verrataan lapsilukuun 41–50-vuotiaana vuonna 2006. Syntymäkohortit ovat 1957–1964, ja osuudet on painotettu vuoden 2006 otospainoilla. [Lähdeauditointi](demography_sources.md).

| Ryhmä | Otos | Odotusta vähemmän | Yhtä monta | Odotusta enemmän |
|---|---:|---:|---:|---:|
| Naiset | 3 783 | 34,9 % | 43,4 % | 21,7 % |
| Miehet | 3 584 | 42,8 % | 34,2 % | 23,0 % |

Odotus sisältää jo syntyneet lapset ja odotetut lisälapset. Kuva vertaa henkilöiden odotuksia ja toteumia; se ei ole periodi-TFR:n vertailu, eikä miesten lisääntymiskauden oleteta päättyneen. Eroja ei luokitella mitatuiksi biologisiksi tai kenttäperäisiksi vaikutuksiksi.

## Toteutus ja tarkistusten tila

Sisältö on tiedostoissa `website/lib/proxyDemographyData.ts`, `website/components/ProxyDemographicTheories.tsx`, `website/components/ProxyDemographicEvidence.tsx` ja `website/components/ProxyDemographicProcess.tsx`. FI/EN on toteutettu; muissa kielissä käytetään englanninkielistä `pickCopy`-varasisältöä. Prosessikuva ja palkit on erotettu nimetyiksi vienneiksi, ja molemmilla on oma ankkuri.

Kuuden kohdennetun testitiedoston kaikki **62 testiä** läpäistiin yhdistetyllä versiolla. Ne kattavat uudet kuvat ja kaikki 23 avattavaa selitystä, aikaisemmat proksivalitsimet sekä väite- ja mallirakenteen. Tuotantokäännös, tyyppitarkistus ja tiukka lint-tarkistus läpäistiin. Rakennettujen sivujen tarkistus kävi läpi 557 reittiä ilman raakaviitteitä, tyhjiä elementtejä tai tyhjiä ankkureita. Proxy masking -sivun viidestä kieliversiosta tarkistettiin lisäksi 13 pääosiota, yksilölliset tunnisteet ja kaikkien sisäisten ankkurilinkkien kohteet.

Selaimessa tarkistettiin prosessin korostus, ryhmänvaihto, avattava selitys, näkyvät lähteet sekä prosessikuvan ja palkkien ulkoasu. Tarkistetun kapean näkymän leveys oli 721 CSS-pikseliä, sivun sisältöleveys 706 pikseliä; vaakaylivuotoa tai selaimen virheilmoituksia ei havaittu. Tätä ei kirjata erilliseksi 320/375 pikselin laitetestiksi. Julkaiseminen ja julkisen sivun tarkistus tehdään tämän jälkeen.
