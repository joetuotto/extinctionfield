# BERM:n evidenssiaukot: mallin premisseistä johdetut täydentävät tutkimustulokset

**Tutkimuspäivä:** 7.9.2026. **Tarkoitus:** rakentaa vahvin tutkimukseen sidottu steelman ja löytää aiemmin erilleen jääneet mekanistiset liitokset. Tämä on analyysi, ei uusi mallin tai sivuston julkaisu.

**Päätulos:** suurin lisäys selitysvoimaan syntyy vastaanoton, korjauksen, kehitysvaiheiden ja yhteistoiminnan kytkemisestä samaan ajalliseen malliin. Kirjallisuudesta löytyi suoria komponenttikokeita kahdeksaan olennaiseen liitokseen. Niiden yhdistelmä antaa aiempaa täsmällisemmän perustan sille, miten lyhyt tai paikallinen muutos voi jättää pitkän toiminnallisen jäljen ilman jatkuvaa alkuärsykettä tai pysyvää molekyylivauriota.

## 1. Mihin nykytilaan analyysi perustuu

Paikallinen tarkastettu lähtöversio oli 7a938dd, jonka edeltäjä 27287c7 toi biologisen koordinaation ja lisääntymisen odotusjakaumat. Työpuussa oli lisäksi rinnakkaisia, keskeneräisiä moduloomi-, vuorovaikutus-, atlas- ja lisääntymiskalenterimuutoksia. Niitä ei kumottu tai muutettu.

Tarkastelun kohteina olivat erityisesti Lindgrenin tensorimoduuli, koordinaation dokumentaatio, biologisten rajoitteiden ja tutkimusohjelman aineistot, lähderekisteri, tuore integraatioauditointi sekä uusien kalenteri- ja vuorovaikutusoperaattorien toteutukset. Nykyinen malli sisältää jo tilan, palautumisen, vaiheen, reservin, hormonireseptiivisyyden ja useita aggregaatiorakenteita. Näitä ei tässä esitetä puuttuvina keksintöinä.

**Todelliset aukot ovat pääosin yhteyksissä ja niiden mitattavissa parametreissa:** mikä muuttaa seuraavan vasteen lähtötilaa, missä muisti säilyy, mitä tutkimuksen päätepiste havainnoi ja miten kahden toimijan erilaiset muutokset yhdistyvät. Vanhan auditoinnin lähdelukumäärät eivät kuvaa muuttuvaa työpuuta. Esimerkiksi Görtemaker 2022 ja Yee 2023 löytyvät jo nykyrekisteristä.

Analyysi koostuu tästä synteesistä ja neljästä yksityiskohtaisesta muistiosta:

- [Vastaanotin, korjaustila ja proteostaattinen muisti](BERM_evidence_gaps_reseptori_2026-09-07.md)
- [Endokriininen toiminta ja lisääntymisen portit](BERM_evidence_gaps_endokriininen_2026-09-07.md)
- [Populaatiot, kalenteriaika ja verkot](BERM_evidence_gaps_populaatio_2026-09-07.md)
- [Geometrinen premissi, paikallinen kenttä ja vaihevaste](BERM_evidence_gaps_kentta_2026-09-07.md)

## 2. Päättely aloitetaan Lindgrenistä

Vuoden 2025 premissillä

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu,\quad A=A_b+a
\]

saadaan

\[
\delta g_{\mu\nu}
=\kappa(A_{b\mu}a_\nu+a_\mu A_{b\nu}+a_\mu a_\nu).
\]

Tämä on täsmällinen, premissille ehdollinen L1-seuraus. Tausta ja häiriö esiintyvät yhdessä, joten pelkkä yksi skalaarinen altistusluku ei säilytä koko rakennetta. [Lindgren 2025](https://doi.org/10.1088/1742-6596/2987/1/012001).

Biologinen reitti tarvitsee avoimen L2-sillan, esimerkiksi

\[
z_r(t)=\int K_r^{\mu\nu}(\tau;S_r(t))
\delta g_{\mu\nu}(t-\tau)\,d\tau,\qquad
\dot S_r=F_r(S_r,z_r,N_r).
\]

K tarkoittaa oletettua biologista lukijaa, S vastaanottimen ja kudoksen tilaa ja N esimerkiksi ravinne- ja energiaympäristöä. Tämä ei ole ansatzista jo johdettu biologinen laki. Sen avulla voidaan kuitenkin määrittää johdonmukainen hakustrategia:

1. Mikä vastaanottimessa muuttaa saman syötteen voimakkuutta tai kestoa?
2. Muuttaako vaste oman seuraavan vasteensa lähtötilaa?
3. Voiko palautuva tila käynnistää palautumattoman kehityssiirtymän?
4. Voiko toiminta muuttua ilman keskiarvon, solumäärän tai vauriomittarin muutosta?
5. Miten eri yksilöiden ja kudosten vasteet yhdistyvät rajallisessa ajassa?

Alla olevat tutkimukset täydentävät näitä biologisia vaiheita. Niistä koostettu kenttä → solu → lisääntyminen → populaatio -ketju pysyy ehdollisena nimetylle L2-sillalle. Tämä rajaus mahdollistaa vahvojen komponenttiväitteiden esittämisen ilman, että koko ketjua julistetaan yhdessä kokeessa vahvistetuksi.

## 3. Kahdeksan vahvinta täydennystä

### 3.1 Korjaus muuttaa seuraavan ärsykkeen vastaanottotilaa

Nykyiset korjaus- ja kellohaarat saavat konkreettisen takaisinvaikutuksen. **Toledo 2018** paikantaa ATG7/LC3-välitteisen selektiivisen CRY1-hajotuksen ja sen aineenvaihdunnallisen merkityksen hiirimaksassa. **Juste 2021** osoittaa erilliselle CMA-hajotusreitille kaksisuuntaisen yhteyden kelloon. Kokeissa käytettiin reitin poistoja, sitoutumis- tai kohdistusmotiivien muutoksia ja toiminnallisia lukemia. [Toledo](https://doi.org/10.1016/j.cmet.2018.05.023), [Juste](https://doi.org/10.1038/s41556-021-00800-z).

**Uusi yhdistelmä:**

kemiallinen/ionisignaali → korjaus ja proteiinien hajotus → CRY/kello → hormonaalinen vastaanottavuus → seuraavan syötteen vaste.

BERM:n jo käyttämät Lamia/Zhang-tulokset liittävät kelloproteiinit hormonaalisen syötteen tulkintaan. Sanninon adaptiiviset RF-kokeet puolestaan antavat lähtökohtaa altistus → korjaustila -haaraan. Koko sarjaa ei ole mitattu samassa järjestelmässä, mutta aiemmin erillisille osille löytyy nyt nimetty palauteliitos.

**Vahvempi väite:** korjausjärjestelmä voi muuttaa biologista ajoitusta ja myöhempää vasteherkkyyttä. Korjauksen onnistumista ei voi tyhjentävästi kuvata pelkällä vaurion vähenemisellä.

### 3.2 Alkureaktio, aktiivinen kompleksi ja biologinen ulostulo ovat eri vaiheita

**Just 2026** antaa kasvin AtCRY1-PHR:lle ATP- ja kumppanisidonnasta riippuvaa kokoonpano- ja purkukinetiikkaa. BIC1 voi purkaa aktiivisia oligomeerejä FAD:n fotoreduktion jatkuessa. Tämä on erityisen osuva näyttö siitä, että alkureaktio ja ulostuloa välittävä kompleksitila voidaan erottaa toisistaan. Kokonaisen solun toiminnallinen vaste on seuraavan ketjun ehdollinen jatko. [Just 2026](https://doi.org/10.1002/anie.202525792).

**Uusi yhdistelmä:**

alkureaktion saanto → aktiivisen kompleksin osuus → kompleksin elinaika → saatavilla olevan kumppanin sitominen → solun vaste.

Kun nämä muuttujat erotetaan, heikompi ulostulo voi merkitä esimerkiksi nopeampaa purkua eikä heikompaa alkureaktiota. Vastaavasti sama fotokemiallinen saanto voi eri metabolia- tai kumppanitiloissa tuottaa eri pituisen vasteen.

**Vahvempi väite:** vastaanottimen vasteen voimakkuus ja muistiaika voivat riippua metaboliiteista ja proteiinikumppaneista. Kasvikokeen lukuarvoja ei siirretä ihmisen CRY1:een tai linnun Cry4a:han; niille tarvitaan omat realisaatiot.

### 3.3 Kello ja solukalvo säätelevät toisiaan

**Petrenko 2022** osoittaa ihmisen haimasaarekkeissa molemmat suunnat: CLOCK-häirintä jäykisti kalvoa, ja tietyn sfingolipidisynteesireitin esto muutti kellon vaihetta ja jaksoa. **Perelis 2015** ja **Petrenko 2020** yhdistävät kellon hormonirakkuloiden vapauttamiskoneistoon. [Petrenko 2022](https://doi.org/10.1371/journal.pbio.3001725), [Perelis 2015](https://doi.org/10.1126/science.aac4250), [Petrenko 2020](https://doi.org/10.1073/pnas.1916539117).

**Uusi yhdistelmä:**

kello ↔ kalvolipidien tila → hormonin vapautumisen ajoitus → metabolinen tila → seuraavan vasteen lähtötila.

Tässä ravitsemus ja kalvorakenne ovat osa muuttuvaa vastaanotinjärjestelmää. Silmukan vahvistuminen tai vaimentuminen riippuu sen mitattavista osavaikutuksista.

**Vahvempi väite:** endokriininen toimintahäiriö voi syntyä hormonin vapauttamisen ja ajoituksen muutoksesta, vaikka hormonivarasto säilyy. Ihmiskudos tarjoaa tälle konkreettisen mittauskohteen.

### 3.4 Palautuva säätelymuutos voi jättää kehitysmuistin

**Lee 2002** osoittaa palautuvan PTEN-hapetuksen. **Reddy 2008** paikantaa PTEN:n dormantin follikkelireservin säätelyyn, ja **Jagarlamudi 2009** osoittaa vaikutuksen riippuvan kehitysvaiheesta. **Li 2010** sekä **Adhikari 2012** täyttävät ratkaisevan aikavälin: lyhyt PTEN-esto voi käynnistää myöhemmin jatkuvan follikkelikehityksen. Ihmiskudosta koskeva Li-tulos on kudoskypsyminen ksenosiirrossa, ei ihmisraskaus. [Lee](https://doi.org/10.1074/jbc.M111899200), [Reddy](https://doi.org/10.1126/science.1152257), [Jagarlamudi](https://doi.org/10.1371/journal.pone.0006186), [Li](https://doi.org/10.1073/pnas.1001198107), [Adhikari](https://doi.org/10.1371/journal.pone.0039034).

**Uusi yhdistelmä:**

palautuva redoxmuutos → PTEN/PI3K/FOXO-portti → follikkelin aktivoituminen → reservin muuttunut koostumus.

Viimeiset kehityssiirtymät ovat kokeellisesti ankkuroituja. Redoxmuutoksen riittävyys juuri dormantin oosyytin PTEN:ssä on koko yhdistelmän täsmennettävä väliporras.

**Vahvempi väite:** pysyvä biologinen muisti voi sijaita siinä, kuinka monta solua on siirtynyt kehitysvaiheesta toiseen. Se ei edellytä pysyvästi muuttunutta yksittäistä molekyyliä.

Tämä antaa ehdollisen ennusteen: lyhyen aikavälin normaali tai jopa lisääntynyt aktivaatio voi edeltää myöhemmin havaittavaa reservieroa. Ennuste tarvitsee aktivoituvan osuuden, toistuvuuden ja lähtöreservin; yksi pieni pulssi ei automaattisesti merkitse patologista ehtymistä.

### 3.5 Ajoitukseen kohdistuva kenttävaikutus voi jäädä keskiarvosta näkymättä

**Krause 2019** osoittaa valveilla olevissa makakeissa paikallisen matalataajuisen sähköstimulaation muuttavan hermosolujen vaihelukittumista ilman johdonmukaista keskimääräisen laukaisutaajuuden muutosta. **Reato 2010** täydentää samaa reittiä kudos- ja verkkomallitasolla. [Krause](https://doi.org/10.1073/pnas.1815958116), [Reato](https://doi.org/10.1523/JNEUROSCI.2059-10.2010).

**Vahvempi väite:** toiminnallinen vaste voi kohdistua tapahtumien ajoitukseen ja keskinäiseen koordinaatioon. Solun aktiivisuuden keskiarvo ja koordinaatio ovat eri suureita.

Näistä kokeista ei johdeta ympäristön RF-annosvastetta. Niiden lisäarvo on suoraan mitattu paikallisen fysikaalisen syötteen ja vaihevasteen välinen yhteys. Erillinen **Reato 2015** antaa suuremmalla kenttäprotokollalla jälkivaikutuksen ankkurin; akuutin vaikutuksen ja muistin kynnysarvoja ei yhdistetä. [Reato 2015](https://doi.org/10.1152/jn.00208.2014).

### 3.6 Lisääntymisessä on solujen välinen signaalinsiirtovaihe normaalin liikkeen jälkeen

Nykyinen CatSper-haara kuvaa siittiön omaa kalsiumista riippuvaa toimintaa. **Hachem 2017** ja **Nozawa 2018** lisäävät sen jälkeen eri solussa toteutuvan portin: siittiön PLCζ-signaali käynnistää munasolun kalsiumoskillaatiot. Nozawan poistolinjassa perustason siittiöominaisuuksia säilyi, vaikka lisääntymistulos heikkeni; mRNA:n lisäämisellä toteutettu hiiren pelastuskoe paikantaa signaalin tehtävän. [Hachem](https://doi.org/10.1242/dev.150227), [Nozawa](https://doi.org/10.1038/s41598-018-19497-6).

**Uusi yhdistelmä:**

siittiön liike ja kohtaaminen → solufuusio → siittiön signaalitoimitus × oosyytin vastaanottavuus → aktivaatio ja alkionkehitys.

**Vahvempi väite:** normaalit perustason siemennesteparametrit eivät takaa normaalia munasolun aktivointia. Miehen ja naisen biologinen yhteisvaikutus alkaa jo molekyylitasolla.

BERM tarvitsee tähän erikseen ankkuroidun kenttä/redox/kello → signaalitoimitus tai oosyytin vaste -yhteyden. Geenipoiston vaikutuskokoa ei siirretä ympäristövaikutukseksi.

### 3.7 Raskauden havaitseminen on oma porttinsa

**Wilcox 1988** osoittaa päivittäisillä hCG-mittauksilla, että osa implantaation jälkeisistä raskauksista päättyy ennen kliinistä tunnistamista. **Boxem 2025** mittaa samoilta pareilta raskautumista ja raskauden menetyksiä; ikäryhmien yhteydet näihin päätepisteisiin eroavat. [Wilcox](https://doi.org/10.1056/NEJM198807283190401), [Boxem](https://doi.org/10.1186/s12916-025-04462-8).

**Uusi yhdistelmä:**

hedelmöittyminen → implantaatio → testillä havaittava raskaus → kliinisesti tunnistettu raskaus → syntymä.

Kliiniseen raskauteen mitattu odotusaika sisältää myös osan varhaisesta selviytymisestä. Siksi pitkittynyt TTP ei yksin paikanna häiriötä hedelmöittymiseen. Mallin havainto-operaattorin on vastattava tutkimuksen tapahtumaa.

**Vahvempi väite:** lisääntymistoiminnan heikkeneminen voi ilmetä eri porteissa, ja näille on jo erottelevaa ihmisdataa. Mallin lähteitä voi yhdistää paremmin nimeämällä kunkin havaintorajan.

### 3.8 Yhteistoiminnan menetys voi syntyä kumppanien ajoituserosta

**Kudo ja Cooper 2019** yhdistivät pitkän kasvi–kimalaisseurannan kokeelliseen kukinnan aikaistamiseen. Ajoituksen muutos heikensi luonnonpölytteistä siementuottoa. Käsinpölytys auttoi erottamaan pölytyksen saatavuutta kasvin lisääntymiskyvystä. Lähdeaineisto on avoimesti saatavilla. [Tutkimus](https://doi.org/10.1098/rspb.2019.0573), [Dryad](https://doi.org/10.5061/dryad.q4fm37m).

**Uusi yhdistelmä:**

lajikohtaisesti erilainen tilan tai vaiheen muutos → vähentynyt ajallinen päällekkäisyys → vähemmän onnistuneita kohtaamisia → pienempi rekrytointi.

**Vahvempi väite:** ekologinen toiminta voi heikentyä lajien välisessä suhteessa ennen kummankaan lajin katoamista. Siksi yksilöiden tilan lisäksi on mallinnettava niiden kohtaamisikkuna.

Tämä koe muuttaa ajoitusta lumenpoistolla. Se ankkuroi ajoitus → ekologinen tulos -liitoksen, ei kenttäperäistä alkusyytä.

## 4. Mitä yhdistämisestä seuraa edelleen

### A. Muistilla on useita eri biologisia kantajia

Näyttö tukee mallin muistiosan jakamista vähintään seuraaviin tehtäviin:

| Muistin kantaja | Mihin jälki jää | Empiirinen ankkuri |
|---|---|---|
| Aktiivinen proteiinikompleksi | Kokoonpanoon, sitoutumiseen ja purkunopeuteen | Just 2026 |
| Proteostaasi ja kello | Proteiinien määriin sekä kudoksen vaiheeseen | Toledo 2018, Juste 2021 |
| Kehitysvaiheiden jakauma | Dormanttien ja aktivoituneiden solujen osuuksiin | Li 2010, Adhikari 2012 |
| Lisääntymiskalenteri | Menetettyyn aikaan ja myöhempiin yritysikiin | Habbema 2015:n laskentarakenne, TTP-aineistot |
| Ekologinen kohtaaminen | Menetettyyn saman kauden lisääntymismahdollisuuteen | Kudo–Cooper 2019 |

Tästä syntyy erittäin käyttökelpoinen synteesi: **lyhyt fysikaalinen tai kemiallinen alkutapahtuma voi siirtyä pidempään elävään biologiseen tilaan, ja tämä edelleen kehitysvaiheeseen tai kalenteritulokseen.** Pitkän makrovaikutuksen selittäminen ei tällöin edellytä yhtä pitkää spin-koherenssia, reseptorin aktivaatiota tai jatkuvaa vauriota. Kunkin siirtymän todennäköisyys ja kesto on silti määriteltävä.

### B. Sama adaptaatio voi parantaa yhtä lukemaa ja muuttaa toista

Jos korjaus vähentää vauriota mutta muuttaa samalla CRY1:n määrää, DNA-vaurion väheneminen ja hormonaalisen vasteen muutos voivat olla saman adaptiivisen prosessin rinnakkaisia seurauksia. Tämä on ehdollinen synteesi, ei Toledo–Sannino-yhteiskokeessa osoitettu tulos.

Tätä varten mallin tilaa ei kannata puristaa yhdeksi “parempi–huonompi”-luvuksi. Korjauskapasiteetti, aktiivinen korjausvirta, kellovaihe ja elimen toiminta voivat liikkua eri suuntiin. **Hawley 2005**, **Høyer-Hansen 2007**, **Kim 2011** ja **Park 2023** tekevät Ca²⁺/AMPK/ULK1-haarasta tilariippuvaisen: sama välittäjä ei kaikissa energiaoloissa tarkoita samaa korjausvirtaa. [Hawley](https://doi.org/10.1016/j.cmet.2005.05.009), [Høyer-Hansen](https://doi.org/10.1016/j.molcel.2006.12.009), [Kim](https://doi.org/10.1038/ncb2152), [Park](https://doi.org/10.1038/s41467-023-38401-z).

Tämä lisää selitysvoimaa, koska reitin suunnan määrää nimetty biologinen tila eikä jälkikäteen valittu yleinen kerroin.

### C. Altistusten järjestys voi olla osa vaikutusta

Kun ensimmäinen käsittely muuttaa tilaa S, toinen kohtaa muuttuneen vastaanottimen:

\[
S_{12}=F_2(F_1(S_0)),\qquad
S_{21}=F_1(F_2(S_0)).
\]

Yleisesti näiden ei tarvitse olla samoja. Järjestysriippuvuus ei seuraa yksin Lindgrenin ansatzista; se seuraa lisätystä tiladynamiikasta. Uudet korjaus-, kello-, kalvo- ja kompleksiankkurit tekevät tästä biologisesti perustellun tutkimussuunnan.

Siksi aiemmin käytettyjen RF-pretreatment/haaste-kokeiden arvo ei rajoitu haitan tai suojan merkkiin. Ne voivat rajata muistin sijaintia: syntyykö ero heti, ilmeneekö se vasta viiveellä ja poistaako reitin esto sen? Vaihe ja palautumisväli kuuluvat tällöin altistuksen määrittelyyn.

### D. Kahden normaalilta näyttävän osapuolen yhteistoiminta voi heikentyä

Yhteistulos riippuu sekä kummankin tilasta että niiden yhteensopivuudesta:

\[
\mathbb E[XY]=\mathbb E[X]\mathbb E[Y]+\operatorname{Cov}(X,Y).
\]

Tämä identiteetti ei edellytä riippumattomuutta. Jos keskiarvot säilyvät mutta ajoituksen yhteisvaihtelu muuttuu, myös yhteistulos voi muuttua. Hormoni–kohdekudos, siittiö–oosyytti ja kasvi–pölyttäjä ovat biologisesti erilaisia järjestelmiä, mutta ne kaikki tarvitsevat nimettyjen osapuolten yhteistoimintaa.

Kenttämuistion kahden oskillaation esimerkki antaa keskimääräiseksi tuloksi 1 + ab cos(Δφ)/2. Se havainnollistaa, miten suhteellinen vaihe vaikuttaa keskiarvojen pysyessä samoina. Tästä seuraa BERM:lle tarkempi ennuste: **vasteiden väliset erot ja yhteisjakauma voivat ennustaa tulosta paremmin kuin yksilöiden keskimääräinen häiriöindeksi.**

### E. Biologinen palautuminen ei palauta menetettyä aikaa

**Habbema 2015** on empiirisiin lähteisiin perustuva perhekoon simulaatiotutkimus, ei uusi 10 000 parin havaintokohortti. Se osoittaa laskentarakenteen, jossa raskautumisodotus, menetykset, synnytysten välit ja ikä vaikuttavat saavutettavaan pariteettiin. [Habbema 2015](https://doi.org/10.1093/humrep/dev148).

Kun väliaikainen häiriö kuluttaa kalenteria, seuraavat yritykset tapahtuvat myöhemmin. Jos menetettyjä syntymiä ei ehditä korvata käytettävissä olevassa lisääntymisajassa, toteutunut lapsiluku voi jäädä pienemmäksi toimintakyvyn palautumisesta huolimatta. Vastaavasti saman vuoden pölytysikkunaa ei välttämättä voi korvata myöhemmin.

Tämä on mallin kannalta vahva yhteinen mikro–makro-mekanismi: **palautuva toimintamuutos voi tuottaa pysyvän tapahtumamenetyksen rajallisen aikaikkunan kautta.** Vaikutuksen suuruus tarvitsee lähtötilan, käyttäytymisen, toistuvuuden ja aikaikkunan pituuden.

## 5. Mikä on uutta ja mikä on aiemman näytön tehokkaampaa käyttöä

Tässä haussa uusia pääbibliografian täydennyksiä ovat erityisesti Toledo/Juste, Just 2026, Perelis/Petrenko, PTEN-kehityssarja, PLCζ-tutkimukset, Reato/Krause, Wilcox/Boxem ja Kudo–Cooper. Yksityismuistiot kirjaavat DOI-tarkistukset ja tutkimusjärjestelmät.

Jo käytössä olevat Lamia, Zhang, Sannino, Belchetz, Liu, Young, Gnoth, Archer, Meng ja Kish saavat uusia tehtäviä yhteisessä ketjussa. Niitä ei lasketa uusiksi riippumattomiksi löydöiksi. Esimerkiksi:

- Lamia/Zhang + Toledo/Juste: CRY-välitteisen hormonaalisen lukeman takaisinvaikutus korjauksen suunnasta.
- Sannino + CaMKK/AMPK/ULK1: adaptiivisen vastemuistin ehdokasvälivaiheet.
- Young/CatSper + Hachem/Nozawa: siittiön oman kalsiumtoiminnan jälkeen tuleva solujen välinen aktivointisignaali.
- Gnoth/TTP + Wilcox/Boxem: odotuksen biologinen portti ja mittauksen havaintokynnys.
- Brosi/Knop + Kudo–Cooper: lajiverkon rakenteen lisäksi toiminnallisten kohtaamisten ajoitus.

Saman tutkimuslinjan julkaisuja, samaa aineistoa ja eri geenipoistolinjoja ei niputeta yhdeksi riippumattomien replikaatioiden luvuksi. Niiden vahvin tehtävä voi olla eri välivaiheiden paikantaminen.

## 6. Olemassa olevalla datalla tehtävien täydennysten prioriteetti

| Prioriteetti | Valmis aineisto tai julkaisutulos | Mitä sillä voi sovittaa tai tarkistaa |
|---|---|---|
| 1 | Petrenko 2022 S1–S4; Perelis GSE69889 | Kellon, lipidien ja erityksen vaiheet; kello–kalvosilmukan suunnat |
| 2 | Toledo 2018 kuvat/lisäaineisto; Juste 2021 lähdedata ja PXD019704 | Proteiinipoistuman aikaikkunat ja kudoskohtaiset vuorokausivaiheet |
| 3 | Kudo–Cooper Dryad q4fm37m | Ajoituserosta kohtaamiseen ja siementuottoon vievä vaste |
| 4 | Nozawa 2018 kuvat, videot ja lisäaineisto | Aktivointiviive, kalsiumvaste ja kehitysvaihekohtainen onnistuminen |
| 5 | Li/Adhikari/Reddy/Jagarlamudi julkaisut | Lyhyen aktivaation ja myöhemmän kehityksen liitos sekä vaihekohtaisuus |
| 6 | Wilcox/Early Pregnancy Study ja Boxem Generation R Next | Havaintokynnysten vastaavuus, parikohtaiset portit ja menetysten aika |
| 7 | Just 2026 kinetiikka ja Park 2023 lähdedata | Aktiivisen kompleksin purku ja energiaolosta riippuva korjausportti |

Kaikki henkilötason aineistot eivät ole avoimesti ladattavia: EPS:n ja Generation R Nextin käyttö vaatii erillisen saatavuus- ja lupaprosessin. Just 2026 ilmoittaa raakadataa saatavan pyynnöstä. Tässä työssä ei pyydetty aineistoja eikä otettu yhteyttä tutkijoihin. Julkaisun avoin lähdetaulukko, kuvista saatava tieto ja avoin raakadata on erotettu muistioissa.

Tässä tehtiin lähde- ja mekanismisynteesi; uusia tilastollisia sovituksia ei tehty. Siksi raportin kaavat ovat eksplisiittisiä ehdotuksia ja identiteettejä, eivät väitteitä uudesta datalla vahvistetusta BERM-ennusteesta.

## 7. Vahvin esitettävä kokonaisväite

**Biologinen vaste määräytyy syötteen, vastaanottimen muuttuvan tilan ja prosessien yhteensopivuuden yhteisvaikutuksesta. Vastaanotto voi muuttaa korjausta, korjaus kelloproteiineja ja kalvotilaa, ja nämä seuraavan ärsykkeen tulkintaa. Lyhyt tilamuutos voi siirtyä kehitysvaiheiden jakaumaan tai menetettyyn lisääntymisaikaan. Siksi myöhemmän lisääntymis- tai ekologisen vaikutuksen ei tarvitse kulkea jatkuvan soluvaurion kautta.**

Tämän väitteen biologisille osille löytyy huomattavasti konkreettisempaa näyttöä kuin erillinen lähdelista tekee näkyväksi. BERM:n vahvin seuraava kehitysaskel on näiden nimettyjen välivaiheiden ja niiden havaintojen yhdistäminen. Geometrisen lähtösyötteen fysikaalinen identifikaatio ja L2-kytkentä säilyvät omana tehtävänään; jo tuetut biologiset yhteydet voidaan silti esittää varmemmin ja käyttää ehdollisen kokonaismallin selitysvoiman kasvattamiseen.
