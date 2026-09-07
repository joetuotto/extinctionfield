# BERM: geometrisesta premissistä vaiheeseen, verkkoon ja muistiin

7.9.2026. Täydentävä tutkimusmuistio. Paikallinen lähtöversio oli 7a938dd; myös keskeneräiset moduulit tarkastettiin. Tämä työ lisää analyysitiedostoja, ei mallin tai sivuston toteutusmuutoksia. Tavoite on vahvin lähteisiin sidottu steelman.

## 1. Premissi rajaa etsittävän liitoksen

Lindgrenin vuoden 2025 lähtömuodolla

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu,\qquad A=A_b+a
\]

saadaan täsmällisesti

\[
\delta g_{\mu\nu}=\kappa(A_{b\mu}a_\nu+a_\mu A_{b\nu}+a_\mu a_\nu).
\]

Tämä on ehdollinen algebrallinen tulos. Biologiseksi lukemaksi tarvitaan esimerkiksi

\[
z_r(t)=\int_0^\infty K_r^{\mu\nu}(\tau;S_r(t))\,
\delta g_{\mu\nu}(t-\tau)\,d\tau.
\]

K on tässä avoin L2-siltapremissi: ansatz ei yksin anna sen yksiköitä, voimakkuutta, muistia tai biologista vastetta. Tämän jälkeen voidaan nimetä mitattava lukema, kuten reaktiotuotto, kalvojännite, aktiivisten kompleksien osuus tai vaihe. [Lindgrenin 2025 julkaisu](https://doi.org/10.1088/1742-6596/2987/1/012001).

**Tästä johdettu hakutehtävä:** etsi kokeita, joissa pieni paikallinen fysikaalinen syöte muuttaa aktiivisen järjestelmän ajoitusta; ajoituksen muutos erotetaan toiminnan keskiarvosta; jälkivaikutus erotetaan altistuksen aikaisesta vaikutuksesta. Näin löydetty näyttö rajaa biologista lukijaa ja myöhempiä operaattoreita. Se ei määritä avoimen geometrisen kytkennän arvoa.

## 2. Ajoitus voi muuttua toiminnan keskiarvon säilyessä

**Krause ym. 2019** tutkivat kahden valveilla olevan makakin 197 hermosolua. Pään ulkopuolelta annettu 5, 10, 20 tai 40 Hz:n vaihtovirtastimulaatio tuotti mitattuihin aivoalueisiin keskimäärin 0,23 ± 0,01 ja 0,19 ± 0,02 V/m:n kentät; paikalliset huiput olivat 0,28 ja 0,35 V/m. Vaihelukittuminen muuttui merkitsevästi 86/197 solussa, joista 77:ssä se vahvistui. Keskimääräinen laukaisutaajuus ei muuttunut johdonmukaisesti. Lähekkäistenkin solujen vasteet erosivat. Eläinten määrä on kaksi; 197 solua ei tarkoita 197 riippumatonta eläinkoetta. [PNAS, DOI 10.1073/pnas.1815958116](https://doi.org/10.1073/pnas.1815958116), [tekijöiden kokoteksti](https://packlab.mcgill.ca/Krause%20et%20al%202019.pdf).

**Reato ym. 2010** yhdistivät rotan hippokampusleikkeet ja verkkomallin ja osoittivat, että heikot kentät voivat vaikuttaa verkon ajoitukseen ja populaatiotoimintaan. Tutkimuksessa kuvattiin vaiheeseen tahdistumista myös 0,2 V/m:n tasolla sopivassa oskilloivassa koejärjestelmässä. Tätä ei käytetä yleisenä kaikkien kudosten vaikutuskynnyksenä. [J Neurosci, DOI 10.1523/JNEUROSCI.2059-10.2010](https://pmc.ncbi.nlm.nih.gov/articles/PMC3500391/).

**Mitä tästä voi sanoa varmemmin:** biologisen sähköisen vasteen olemassaolo ei edellytä johdonmukaista muutosta keskimääräisessä laukaisumäärässä. Olemassa olevan toiminnan ajoitus on oma vasteensa. Tämä antaa BERM:n koordinaatio-osalle suoran kokeellisen ankkurin.

Tulos on paikallista matalataajuista sähköstimulaatiota. Ulkoisen RF-kentän V/m-arvo ei ole suoraan sama biologinen syöte: taajuus, kudoksen siirtofunktio, paikallinen kenttä ja vastekanava on määriteltävä. Tutkimukset eivät mittaa CRY-reittiä, Lindgrenin geometriaa tai ympäristöaltistuksen vaikutuskokoa. Niiden käyttö on osoitetun paikallinen syöte → ajoitus -liitoksen lisääminen.

## 3. Jälkivaikutus on erillinen, tilasta riippuva operaattori

**Reato ym. 2015** antoivat karbakolilla aktivoiduille rotan hippokampusleikkeille 10 minuutin tasavirtastimulaation. Ryhmät olivat −20, −10, 0, +10 ja +20 V/m; gammatehon analyysissä oli 87 leikettä ja moniyksikköaktiivisuuden analyysissä 39. Gamma-aktiivisuuden teho ja moniyksikköaktiivisuus muuttuivat polariteetin mukaan, ja yhdistetty aineisto osoitti vaikutuksen jatkuvan vähintään seuraavan 10 minuutin ajan. Pysyvä synaptisen tehokkuuden muutos oli laskennallinen selitysehdotus, ei suoraan mitattu mekanismi. [J Neurophysiol, DOI 10.1152/jn.00208.2014](https://doi.org/10.1152/jn.00208.2014), [avoin teksti](https://pmc.ncbi.nlm.nih.gov/articles/PMC4346723/).

Tässä jälkivaikutuksessa käytettiin selvästi suurempia kenttiä kuin Krausen akuutissa vaihevaikutuksessa. Niitä ei yhdistetä väitteeksi, että noin 0,2 V/m olisi osoitetusti tuottanut saman jälkivaikutuksen. Ne rajaavat kahta eri tehtävää: akuutti vaiheen muutos ja altistuksen jälkeinen tilan säilyminen.

BERM:lle perusteltu rakenne on

\[
\dot\phi_i=\omega_i+Z_i(\phi_i,S_i)z_i+
\sum_j J_{ij}H_{ij}(\phi_j-\phi_i),
\qquad
\dot S_i=F_i(S_i,z_i,\phi_i).
\]

Vaihevaste Z, vuorovaikutus JH ja hidas tilanmuutos F erotetaan. Kaava on tuotu dynaamisen järjestelmän ehdotus, ei näiden tutkimusten yhteinen sovitettu malli. Vaihekuvaus edellyttää oskilloivaa tilaa, jossa vaihe voidaan määritellä; rytmin amplitudin kadotessa tarvitaan amplitudin sisältävä tilamalli.

**Uusi liitos:** fysikaalisen syötteen ei tarvitse ylläpitää jokaista myöhempää tapahtumaa. Riittää, että se muuttaa järjestelmän tilaa; tämän jälkeen omat palaute-, korjaus- tai kehitysprosessit voivat ylläpitää eroa. Aktiivisen kudoksen energia tulee edelleen sen omasta metaboliasta. Tämä ei itsessään takaa vahvistumista tai pysyvyyttä: niiden etumerkki ja aikaskaala kuuluvat mitattavaan tiladynamiikkaan.

## 4. Keskiarvo voi säilyä samalla kun toiminnallinen yhteensopivuus muuttuu

Tarkastellaan havainnollistavia ei-negatiivisia signaaleja

\[
x(t)=1+a\cos(\omega t),\qquad
y(t)=1+b\cos(\omega t-\Delta\phi),\qquad 0\le a,b\le1.
\]

Kokonaisen jakson keskiarvot ovat kummassakin tapauksessa yksi. Yhteistoimintaa kuvaava keskimääräinen tulo on kuitenkin

\[
\langle xy\rangle=1+\frac{ab}{2}\cos(\Delta\phi).
\]

Tämä on algebrallinen esimerkki, ei mitattu hormonien tai pölytyksen annosvaste. Se osoittaa, miksi erilliset keskiarvot eivät määritä yhteistoimintaa. Sama periaate toteutuu jo mallin hormoni–reseptiivisyys-operaattorissa ja soveltuu ehdollisesti myös siittiö–oosyytti- ja kasvi–pölyttäjä-ikkunoihin.

Tästä seuraa kaksi käyttökelpoista päätelmää:

1. Toiminnallinen ero voi näkyä vaiheessa, hajonnassa tai yhteisvaihtelussa ennen kuin se näkyy kummankaan osapuolen määrässä.
2. Kokonaisen jakson yli laskettuun sisäiseen yhteensopivuuteen vaikuttaa suhteellinen vaihe. Molempien samanlainen siirtymä voi säilyttää yhteensopivuuden. Ulkoiseen määräaikaan, vuodenaikaan tai toiseen järjestelmään nähden yhteinenkin siirtymä voi silti olla merkityksellinen.

Tämä antaa täsmällisemmän vahvistavan ennusteen kuin yleinen “rytmihäiriö heikentää toimintaa”: seuraus riippuu siitä, minkä kahden tai useamman prosessin vaihe-ero muuttuu.

## 5. Geometrisen premissin pariton ja parillinen osa

Samassa esityksessä, saman taustan A_b ympärillä, saadaan

\[
\delta g_{\rm odd}(a)
=\frac{\delta g(a)-\delta g(-a)}2
=\kappa(A_b\otimes a+a\otimes A_b),
\]
\[
\delta g_{\rm even}(a)
=\frac{\delta g(a)+\delta g(-a)}2
=\kappa a\otimes a.
\]

Siksi pelkkä skalaarinen voimakkuus hukkaa premissin sisältämän taustan ja häiriön yhteisrakenteen. Tämä on tarkka L1-seuraus. Biologisen vasteen vastaava hajotelma tarvitsee lisäksi samassa lähtötilassa lineaarisen tai erikseen tunnetun K:n. Tilahistoria ja epälineaarinen vaste voivat tuoda omia parillisia ja parittomia termejä.

a→−a tarkoittaa tässä valitun nelipotentiaalihäiriön merkinvaihtoa samassa fysikaalisessa esityksessä. Se ei automaattisesti tarkoita laboratorion magneettikentän kääntämistä. Lähteet, reunaehdot, potentiaalin identifikaatio ja mitattava kenttä tarvitaan ennen kokeellista tulkintaa. Reaton polariteettitulos ei tästä syystä ole tämän geometriatunnusmerkin mittaus.

Tämän laskun arvo steelmanille on täsmällinen: se säilyttää mallin oman premissin myöhemmässä biologisessa tutkimusohjelmassa ja kertoo, mitä tietoa skalaariin pelkistäminen kadottaa. Biologiset tutkimukset puolestaan auttavat valitsemaan havaittavan vasteen.

## 6. Käyttö nykyiseen malliin

Nykyinen koordinaatio-, palautumis- ja moduloomityö sisältää jo vaihe- ja tilamuuttujia. Puute ei ole näiden käsitteiden puuttuminen vaan empiirisen operaattorin kohdistaminen:

| Liitos | Näytön tehtävä | Mallissa tarvittava kohdistus |
|---|---|---|
| Paikallinen heikko kenttä → ajoitus | Krause 2019, Reato 2010 | Mitattu paikallinen syöte; PLV/vaihe-erot; taajuus ja lähtötila |
| Altistus → jälkivaikutus | Reato 2015 | Oma protokolla, erillinen palautumisaika ja muistin mekanismi |
| Ajoitus → yhteinen toiminta | Tässä johdettu identiteetti, kudoskohtaiset kokeet muissa muistioissa | Suhteellinen vaihe ja yhteisvaihtelu keskiarvojen lisäksi |
| Geometria → biologinen syöte | Ehdotettu K(S) | Yhä avoin L2; biologista lähdettä ei käytetä sen numeerisena kertoimena |

Kolmea nimettyä Reato/Krause-julkaisua ei löytynyt tarkistetusta pääbibliografiasta DOI- ja tekijähaulla. Tämä on ajankohdan tilanne; rinnakkaiset muutokset voivat täydentää rekisteriä. Uusia datan sovituksia ei tehty. Tarkistettiin alkuperäisjulkaisut, kokotekstien menetelmät mahdollisuuksien mukaan ja kokeellisten suureiden vastaavuus.
