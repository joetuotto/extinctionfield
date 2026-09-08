# BERM:n jatkopäätelmät: sekoitustuotteet, vastaanottimen geometria ja vasteen lukeminen

7.9.2026. Tämä muistio jatkaa saman päivän steelman-synteesiä. Tarkoitus on löytää siitä eteenpäin vietäviä, jo julkaistuihin kokeisiin ankkuroitavia seurauksia. Sivustoa tai mallin toteutusta ei muutettu.

## Lähtökohta ja uusi tehtävä

Lindgrenin vuoden 2025 premissi on tässä normalisoinnissa

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu.
\]

Kun \(A=A_b+a\), saadaan algebrallisesti

\[
\delta g=\kappa(A_b\otimes a+a\otimes A_b+a\otimes a).
\]

Biologinen kytkentä jatketaan eksplisiittisellä, vielä avoimella BERM-sillalla

\[
z_r(t)=\int_0^\infty K_r^{\mu\nu}(\tau;S_r)\delta g_{\mu\nu}(t-\tau)\,d\tau.
\]

Tämän muistion päätelmät seuraavat ehdollisesti tästä sillasta. Primaarikokeet osoittavat alla nimettyjen toteutusten ominaisuuksia; ne eivät yksin identifioi niiden geometriseksi alkuperäksi Lindgrenin premissiä. Näin voidaan samalla tehdä täysi synteesi ja säilyttää sen osien täsmällinen asema.

Aiemmassa raportissa oli jo taajuussekoituksen algebra, suunnallinen vastaanotin ja spin-kemiasta hitaaseen muistiin kulkeva ketju. Tässä lisäarvo on kolmessa täsmällisessä muutosoperaatiossa: kahden lähteen suhde, vastaanottimen orientaatio sekä vastaanottimen sisäinen kemia ja mittausikkuna.

## 1. Kahden lähteen yhteisvaikutus voi määrittää biologisen vaikutuksen sijainnin

Samassa biologisessa tilassa ja samalla lineaarisella \(K_r\):llä

\[
z[a+b]-z[a]-z[b]=\kappa K_r*(a\otimes b+b\otimes a).
\]

Jos \(a=u\cos(\omega_1t+\phi_1)\) ja \(b=v\cos(\omega_2t+\phi_2)\), ristitulossa on sekä summa- että erotaajuus. Erityisesti hitaasti reagoiva \(K_r\) voi lukea erotaajuuden, vaikka se vaimentaa kumpaakin kantajaa. Ajurin paikallinen rakenne riippuu tällöin myös kahden kentän paikallisista suunnista ja amplitudisuhteesta. Tämä on mallin sillasta johdettava rakennetta koskeva ennuste.

**Primaariankkuri.** Violante ym. käyttivät ihmisen hippokampuksen stimulaatioon 2,000 ja 2,005 kHz:n virtoja: erotus oli 5 Hz. Virtojen suhde 1:1 tai 1:3 muutti verhokäyrän kohdistumista hippokampuksen osiin. Tutkimuksessa oli 20 henkilön kuvantamisaineisto ja erillinen 21 henkilön muistiaineisto. Hippokampuksen mallinnettu verhokäyräamplitudi oli noin 0,5 V/m. Kuvantamisessa vaikutus painottui hippokampukseen; pidemmässä käyttäytymiskokeessa oikeiden muistivastausten osuus kasvoi (kohdevastausten vertailu p = 0,007). [Violante ym. 2023](https://www.nature.com/articles/s41593-023-01456-8).

Hiiren elävässä aivossa Grossman ym. olivat jo osoittaneet erotaajuuden seuraamista, hippokampuksen aktivoimista ja motorisen vasteen suuntaamista kiinteiden elektrodien virtasuhdetta muuttamalla. [Grossman ym. 2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5520675/).

**Mitä voidaan päätellä edelleen?** BERM:n monilähdeympäristön selitys kannattaa muotoilla paikalliseksi yhteisvaikutuskartaksi. Sama lähteiden joukko voi muodostaa kudoksissa erilaisia hitaasti luettavia ajureita. Kokonaisvirta tai yksittäisten kantajien voimakkuus ei yksin määrää tällaisen vasteen anatomista sijaintia. Temporal interference tarjoaa tälle tutkimukseen perustuvan toteutusesimerkin.

Tässä ei ole laskettu TI-kenttien sähköpotentiaalista Lindgrenin \(\delta g\):tä eikä tunnistettu \(\kappa K_r\):ää. Erityisesti kHz:n elektrodikenttää ei saa muuttaa vektoripotentiaaliksi RF-tasoaallon \(A\sim E/\omega\)-säännöllä. Näiden tutkimusten uusi tehtävä on ankkuroitava sekoitus-, suunta- ja kohdistumisrakenne.

**Jo saatavilla oleva data:** [NeuroVault 11908](https://neurovault.org/collections/11908/) sisältää kuusi ryhmätason fMRI-karttaa. Rajapinnasta tarkistettiin niiden olevan koodaus- ja palautusvaiheiden kartat kolmelle tilanteelle: sham, TI 1:1 ja TI 1:3; mukana n = 20. Näin sijaintia ja tehtävävaihetta koskeva vertailu voidaan aloittaa olemassa olevista kartoista. Julkaisu osoittaa muun datan ja keskeiset skriptit [tutkimuksen GitLabiin](https://gitlab.eps.surrey.ac.uk/nemo/ti-paper); sen tiedostoja ei tässä saatu avattua. Ryhmäkartat ovat tilastokarttoja, joten niiden erotusta ei käsitellä uutena yksilötason vaikutuskokoestimaattina.

## 2. Vastaanottimen suuntautuminen ja sisäinen kemia ovat eri selittäviä muuttujia

Kun geometrinen ajuri projisoidaan nimettyyn suunnalliseen vastaanottimeen, yksinkertainen avaruudellinen vaste voi sisältää termin

\[
z\propto a_i C^{ij}(S)a_j.
\]

Tässä \(C\) on L2-sillan vastaanotintensori. Jos vastaanotin kiertyy jäykästi \(R\), sen tensorin tulisi muuttua muodossa \(C\mapsto RCR^{\mathsf T}\). Kenttäsuuntaan mitatun vastekuvion tulee vastaavasti kiertyä. Vastaanottimen sisäisten parametrien muutos puolestaan voi muuttaa \(C\):n ominaisarvoja ja taajuus-/taustakenttäikkunaa ilman samanlaista jäykkää kiertoa. Näin kaksi eri selitystä erotetaan jo mallin rakenteessa.

**Primaariaineisto.** Kerpal ym. tutkivat CPF-molekyylitriadeja 120 K:n lasimaisessa liuottimessa. Optisesti valitun molekyylijoukon 45°:n orientaatiomuutos siirsi magneettista vastekuviota 45°. Kuvio oli invariantti kentän 180°:n käännölle. Tutkimuksessa oli 100 ja 200 µT:n kulmapyyhkäisyjä sekä 50 µT:n lisäaineisto. Osittainen deuterointi muutti kenttävasteen muotoa ja siirsi matalan kentän vaikutusta pienempiin kenttiin, vaikka nollakentän kinetiikka säilyi mittausvirheen rajoissa samana. Samassa tutkimuksessa 100 µT:n kenttä kasvatti radikaalipopulaatiota ennen noin 220 ns:ää ja pienensi sitä myöhemmin. [Kerpal ym. 2019](https://www.nature.com/articles/s41467-019-11655-2).

**Jatkopäätelmä:** biologisen vastaanottajan tilaa kannattaa jakaa vähintään kahteen osaan: rakenteellinen orientaatio ja molekyylin sisäinen dynamiikka. Näiden muuttuminen voi tuottaa hyvin erilaiset vaikutukset samassa ulkoisessa kentässä. Kyse on yllä nimetyssä kemiallisessa järjestelmässä jo mitattavista ominaisuuksista. BERM voi sitoa nämä ominaisuudet \(K_r(S)\):n eri parametreihin, jolloin “yksilöllinen herkkyys” saa konkreettisen kemiallisen ja rakenteellisen sisällön.

Ritzin jo projektissa oleva lintukoe antaa samalle suuntarakenteelle käyttäytymistason ankkurin: 7 MHz:n ja 0,47 µT:n kenttä häiritsi orientaatiota 24°:n ja 48°:n kulmissa suhteessa geomagneettiseen kenttään, mutta samansuuntaisessa asetelmassa suuntautuminen säilyi. [Ritz ym. 2004, alkuperäisartikkeli](https://www.physics.uci.edu/~tritz/Publications/RITZ2004.pdf). Tässä uutta on kemiallisen orientaation muutosoperaation liittäminen samaan vastaanotintensoriin; Ritz-lähde itsessään oli jo käytössä.

**Data:** Kerpalin julkaisun ja lisäaineiston käyrät ovat saatavilla. Julkaisu ilmoittaa myös ORA-tallennuksen, mutta löydetyssä [ORA-tietueessa](https://ora.ox.ac.uk/objects/uuid%3A77f1e229-7343-493e-a978-e2315b1f0c30) näkyi vain artikkelitiedosto. Erillistä numeerista raakadatapakettia ei tässä tunnistettu. Kuvaajista voidaan silti arvioida kulmakuvion vaihetta, symmetriaa ja signaalin suunnan vaihtumista; ne eivät tarvitse uutta biologista koetta.

## 3. Vastaanottimen jatkoreaktio määrää, kumman ajallisen osan kenttävasteesta eliö lukee

L2-silta antaa ajallisen vasteen. Seuraavan biologisen portin havaittava tulos tarvitsee lisäksi lukuoperaattorin:

\[
Y=\int_0^\infty w(t)\,\delta p(t)\,dt,
\]

missä \(\delta p\) on muuttuneen kemiallisen tilan populaatio ja \(w\) seuraavan reaktion tai biologisen vastaanottimen herkkyys ajassa. Jos \(\delta p\):ssä on varhainen positiivinen ja myöhempi negatiivinen osa, eri \(w\):t voivat antaa eri etumerkin samalle alkuperäiselle kenttätapahtumalle.

Kerpalin yllä kuvattu signaalin suunnan vaihtuminen on tätä varten käyttökelpoinen mitattu impulssivasteen kaltainen aineisto. BERM:n seuraava tarkennus olisi erottaa **kentän synnyttämä tilajakauma** ja **se osa jakaumasta, joka ehtii seuraavaan biologiseen reaktioon**. Tämä jatkaa aikaisempaa spin–muisti-yhteyttä uudella tavalla: kyse on myös reitti- ja ajankohtavalinnasta. Biologisen portin nopeus voi muuttaa lopputuloksen suuntaa.

Tästä saa jo nyt ehdollisen, määrällisesti tarkennettavan päätelmän: jos kemiallisesti tai geneettisesti muutetaan vain jatkoreaktion aikavakiota, vaikutuksen huipun ja mahdollisen suunnanvaihdon tulee siirtyä ennustettavasti. Julkaistun aikakäyrän eri aikaintegraalit antavat tälle ensimmäiset rajat. Samaa ajatusta voidaan käyttää CRY:n sitoutumiskumppaneiden ja redox-jatkoreittien yhdistämiseen ilman oletusta, että jokainen mitattu radikaalipopulaation lisäys tarkoittaisi samaa fysiologista lopputulosta.

## Mitä tämä lisää mallin vahvimpaan versioon

Kolme operaatiota muodostavat yhteisen vastaanotinmallin:

\[
\text{lähteiden keskinäinen rakenne}
\longrightarrow\delta g
\xrightarrow{K_r(\mathrm{orientaatio},\mathrm{kemia},S)}
\delta p(t)
\xrightarrow{w_r(t)}Y.
\]

Sen osille on nyt nimetty julkaistut kokeet ja osin avoimet aineistot. Selitysvoima kasvaa, koska vaikutuksen paikka, suunta, voimakkuus ja viive voivat syntyä saman rakenteen eri parametreista. Näin monilähteisyys, kudosgeometria, molekyylierot ja biologinen ajoitus voidaan yhdistää yhteen laskettavaan ketjuun.

**Uutuustarkistus:** Violante/Grossman-TI-työt ja Kerpalin 2019 triadikoe eivät löytyneet tämän työn repohausta nimellä tai DOI:lla. Ritz 2004 oli jo lähdekartoissa ja Xu 2021 jo tunnettu. Aiemman raportin taajuussekoitusta tai suunnallisuuden yleisperiaatetta ei tässä esitetä uutena löytönä. Uusi sisältö on näiden periaatteiden yhdistäminen täsmällisiin, jo toteutettuihin muutoskokeisiin ja niiden dataan.
