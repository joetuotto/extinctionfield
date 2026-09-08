# Havainnekuvien ensimmäinen toteutuskokonaisuus

8.9.2026. Toteutuksen lähtökohta: main `9b7dbc6`. Kuvitusauditointi on saman hakemiston README-tiedostossa; sen havainnot koskevat auditoinnin omaa lähtöversiota.

Toteutus lisää seitsemän yhteistä kuvakomponenttia ja niiden vaihtoehtoiset näkymät 14 sivulle. Kuvat täydentävät nykyisiä tutkimuksia, kuvaajia ja valintoja. Ne eivät muodosta erillistä ennustemallia.

## Mitä lukija voi tehdä

| Kuvakokonaisuus | Sijainti | Toiminta ja tarkoitus |
| --- | --- | --- |
| Lähteet elinympäristössä | `/evidence/technology`, `/explore`-atlaksen kenttänäkymä | Valitse lähdeperhe, maa ja vuosi. Piirros paikantaa johdon, lähettimen tai sisätilan laitteen, reitin ja organismin. Atlaksessa kuva seuraa yhteistä maa- ja vuosivalintaa. |
| Elimestä kudokseen | `/modulome/testes` | Kiveksen leikkaus ja siementiehyen suurennos paikantavat Sertoli-solut, sukusolut, Leydig-solut ja verisuonen. |
| Solun anatomia | `/biology`, `/biology/calcium-redox-steroidogenesis` | Solukalvo, solulimakalvosto, tuma, lipidipisarat, mitokondrio ja lysosomi. Mekanismisivulla kuvan valinta ja nykyisen tutkimusselaimen haara käyttävät samaa tilaa. |
| Veren hormoni ja kudosvaste | `/evidence/testosterone` | Vapaan, SHBG:hen sitoutuneen ja albumiiniin sitoutuneen testosteronin kuvat sekä vastaanottava solu. Mittaustaulukko erottaa pitoisuuden ja toiminnallisen vasteen. |
| Kahden koeasetelman vertailu | `/evidence/replication`, `/evidence/response-conditions`, `/about/measurement` | Vaihda suuntaa, valohistoriaa, lämpötilaa, aiempaa käsittelyä tai mittapään paikkaa. Valinta korostaa kyseisen eron piirroksessa ja kertoo kirjattavat olosuhteet. |
| Signaalin aikarakenne | `/physics`, `/measurement/fieldstate` | Muuta pulssin aktiivista osuutta. Jatkuvan ja pulssitetun siniaallon RMS pysyy samana, mutta huippu ja tauot muuttuvat. |
| Atlaksen lukeminen ja historia | `/explore`, kun ennuste on käytössä | Yhteinen selite havainnoille, sovitukselle ja ennusteelle. Avattava G/U/C-esimerkki näyttää kahden eri aloitusvuoden säilyvän historian samalla vuosikohdistimella. |
| Kohtaamisen ajoitus | `/evidence/ecology`, `/behavior`, `/civilization` | Kukka ja mehiläinen tai kaksi henkilöä: yhden aikaikkunan siirto muuttaa laskettua yhteistä aikaa. Kuvitettu jatkoketju erottaa mahdollisuuden, mitattavan tapahtuman ja seurattavan tuloksen. |

## Yhtenäinen rakenne

- Jokaisella kuvalla on oma kysymys ja paikallinen tehtävä. Laaja selitys ja laskentaoletukset avataan tarvittaessa.
- Tekstit ovat HTML:ää ja piirrokset skaalautuvaa SVG:tä. Kuvien sisältö säilyy luettavana ilman kuvan sisään poltettuja pitkiä tekstejä.
- Kokonaisuus käyttää hillittyä sinistä, vihreää ja okraa. Korostus kertoo valinnan tai anatomisen osan; se ei esitä vaikutuksen vakavuutta.
- Kuvat on kirjoitettu suomeksi ja englanniksi. Muissa kieliversioissa nämä uudet osat käyttävät englantia.
- Vuosi- ja muut säätimet toimivat näppäimistöllä. Asetelmien erot ilmaistaan myös tekstissä ja ajoituksen tulos päivittyy tekstimuotoisena.
- Kapea näkymä pinoaa paneelit ja selitteet. Muuttuvan tutkimushaaran anatomia käyttää samaa valintaa kuin tutkimukset.

## Aineisto ja laskennan rajat

**Ympäristökuva** käyttää nykyisen kenttärekonstruktion 13 lähdeperhettä, viittä maata ja vuosia 1880–2024. Laajemman teknologiaselaimen 45 perhettä ovat yhä sen omassa luettelossa; niitä ei esitetä kaikkia rekonstruoituina aikasarjoina. Piirros on esimerkkipaikka, ei maan todellinen asutus- tai kenttäkartta. Historian puuttuva vaihe näkyy avoimena, rajatun palvelun sulkeminen erikseen. Vaiheen perustelu, ankkurilähteet, kenttämuoto ja tietopuute ovat avattavissa.

**Biologinen kuvitus** paikantaa nykyisiin lähteisiin liitetyt rakenteet. Hormonimolekyylien määrä piirroksessa ei esitä veripitoisuutta tai sitoutuneiden muotojen prosenttiosuuksia. Malli ei saa kuvituksesta uutta kudoskerrointa.

**Laboratoriokuva** ei toisinna nimettyä alkuperäiskoetta. Valohistoria ja koehetken valo ovat erillisiä; anturin siirtäminen ei liikuta näytettä. Kuva auttaa vertaamaan kirjattuja ehtoja ja jättää varsinaisen biologisen tuloksen tutkimuksen aineistoon.

**Signaaliesimerkki** pitää RMS-arvon yhdessä normalisoidussa yksikössä. Sallitut aktiiviset osuudet ovat 10–100 % kymmenen prosenttiyksikön askelin. Jokainen aktiivinen jakso sisältää kokonaisia siniaaltojaksoja, jolloin huippu √(2/d) toteuttaa RMS-normalisoinnin täsmällisesti. Esimerkillä ei ole biologista vastekerrointa.

**Muistiesimerkki** käyttää BERM:n nykyistä G → U → C -laskentaa. Yksi normalisoitu lähde alkaa joko 1950 tai 2000. Geometrinen projektio on sama vuodesta 2000, viiveellinen vuosikomponentti vuodesta 2008, ja aiempi historia säilyy kertymässä. Näkyvän aikarajauksen vaihtaminen ei nollaa historiaa. Oletukset, mukaan lukien alkuarvo ja 20 vuoden puoliintumisaika, näkyvät esimerkissä erikseen. Tämä ei muuta valitun maan syötteitä tai kalibrointia.

**Kohtaamisesimerkki** laskee kahden vakiopituisen aikaikkunan leikkauksen. Se ei tuota lisääntymisprosenttia, hormonivastetta tai EMF-annoksesta johdettua aikaeroa. Pölytyksen ja yhteisen tehtävän jatkoketjut säilyvät omissa ympäristöissään.

BERM säilyy selitys- ja ennustemallina. FieldState pysyy mittauksen ja estimaattien haarana syöterajalla. Kuvitus erottaa geometrisen lähtökohdan, empiirisen biologian, ehdollisen mallisillan ja avoimen kalibroinnin.

## Samalla korjatut käyttöliittymän ongelmat

- Reactin SVG-otsikko tuotetaan yhtenä tekstinä, jotta palvelimen ja selaimen rakenne vastaa toisiaan.
- Kalibroitu atlas saa hydraation jälkeisen laskentarajan. Palvelimen HTML sisältää alkuperäiset havainnot; selaimen ennustelaskenta ja sen metadata valmistuvat samassa laskentaympäristössä. Näin JavaScript-moottorien pienet liukulukuerot eivät riko latausta. Laskenta- ja vientiarvoja ei pyöristetä tämän vuoksi.
- Koeasetelman kaksi selitettä erotettiin toisistaan kapealla näytöllä.
- Hormonisivun kaavakorteille sallittiin kutistuminen mobiilissa; pitkä kaava vierii oman alueensa sisällä.
- Atlaksen teknologiapaneeli ja kenttähistorian kuva käyttävät yhteistä lähdeperhevalintaa. Valinta säilyy osoitteessa ja päivittyy molempiin suuntiin. Kaikkien perheiden tai mobiilin kokonaissarjan kohdalla kuva kertoo erikseen, minkä yksittäisen perheen esimerkkiä se näyttää.
- Puuttuvan tai virheellisen lähdevalinnan yhteinen oletus on sähköverkko. Oletus ei vaihdu eri paneeleissa sen perusteella, mille perheelle rajauksessa sattuu olemaan määrällisiä havaintoja. Tietopuute näkyy edelleen tietopuutteena.

## Myöhemmät laajennukset

Ensimmäinen toteutus kattaa yhteiset kuvapohjat, atlaksen opastuksen ja ajoituksen. Auditoinnin kaikki myöhemmät ehdotukset eivät ole tässä julkaisukokonaisuudessa: esimerkiksi koko elimistön säätelyakseli, dokumentoituun paikkatietoon perustuva todellinen kenttäkartta, lajikohtaiset elinkiertokuvat ja geometrian uudet kolmiulotteiset leikkaukset vaativat omat aineistonsa ja suunnittelunsa.

## Tarkistukset

Lopullinen koko sivuston testiajo: **923/923 testiä, 79 testitiedostoa**. Testit ajettiin viimeisen lähdevalintakorjauksen jälkeen.

Uudet testit kattavat historian tuntemattoman vaiheen ja palvelun rajatun sulkemisen, anatomian ja tutkimushaaran yhteisvalinnan, koeasetelman viisi muutosta, RMS-normalisoinnin, kertymän muistiyhtälön, aikarajauksen riippumattomuuden ja aikaikkunoiden todellisen leikkauksen. Palvelimen ja selaimen erilaista liukulukutulosta simuloiva testi tarkistaa kalibrointipaneelin latausrajan.

Tuotantokoostamisen tarkistuksiin kuuluvat TypeScript, tiukka ESLint, viite- ja mallirekisterit, esirenderöity HTML sekä viiden kielen hakuindeksit. Mallirekisterin validointi raportoi 0 virhettä ja 14 jo olemassa olevaa mallin kalibrointi- ja näyttöportteja koskevaa varoitusta; kuvitus ei muuta niiden tilaa.

Selainkatselmus sisältää vaalean ja tumman teeman, työpöydän sekä 390 pikselin mobiiliesikatselun. Ympäristön maa/vuosi, anatomian haara, laboratoriovertailu, signaalin säätö, yhteinen vuosikohdistin ja ajoitusesimerkin nollapäällekkäisyys kokeiltiin sivuilla. Hormonisivun kaavakorttien leveyskorjaus varmistettiin tuotantoversiossa. Sivuston kaikkia vanhoja taulukoita ei uudistettu tässä työssä; esimerkiksi testes-sivulla on edelleen kuvapaneelin ulkopuolinen leveä viitetaulukko.

Tämä on erillisen toteutushaaran paikallinen esikatselu. Sivuston julkista versiota tai main-haaraa ei päivitetty tämän toteutuksen yhteydessä.
