# Kalsium–redox–hormonimekanismi BERM:n steelmanissa

Tutkimussynteesi ja integraatiosuunnitelma, 8.9.2026. Tehty alkuperäisessä Extinction Field -työtilassa. Tarkastelun lähtökohta on BERM:n omien premissien mukaisen vahvimman tutkimukseen sidotun selityksen rakentaminen. Tutkimus-, geeni- ja lääkeinterventioita yhdistetään niiden yhteisten mitattujen välivaiheiden kautta.

**Keskeinen johtopäätös:** kalsiumsignalointi, redox-varanto, solukello ja steroidogeneesi kannattaa nostaa BERM:n yhdeksi keskeiseksi biologiseksi toteutusketjuksi. Näiden välinen yhteys on nykyisessä mallissa osittain kuvattu, mutta sen tutkimuksellinen rakenne on huomattavasti täsmällisempi kuin reittinimi ”VGCC → Ca²⁺ → ROS”. Etenkin kolesterolin saatavuus ja StAR-välitteinen mitokondriokuljetus kokoavat eri suunnista tulevaa näyttöä samaan hormonituotannon pullonkaulaan.

Tämän työn tulos on kirjallinen synteesi ja konkreettinen integraatiorakenne. Mallikoodia, sivuston sisältöä tai tuotantojulkaisua ei muutettu. Olemassa olevien avoimien aineistojen saatavuutta tarkistettiin; laajaa transkriptomien tai alkuperäisten kuvadatojen uudelleenanalyysiä ei tässä tehty.

## 1. Raportin osat

- [Kalsium, solukello ja hormonituotanto](KALSIUM_KELLO_HORMONIT.md): Qinin tutkimukset, CaMKI/NUR77/RORα, BMAL1, StAR, substraattiohitukset ja ihmisgenetiikka.
- [Redox-varanto, hormonikapasiteetti ja muisti](REDOX_VARANTO_JA_MUISTI.md): glutationi, RyR/SERCA, CPVT, Darier, autofagia, kolesterolihuolto ja vaurion aikaprofiili.
- [Suorat kenttä–kalsium-osakokeet](KENTTA_KALSIUM_OSAKOKEET.md): nimetyt kanavat, geneettinen paikannus, signaalin ajallinen rakenne ja liitos steroidogeneesiin.
- [Täsmällinen integraatiosuunnitelma](INTEGRAATIOSUUNNITELMA.md): johtaminen, tilamuuttujat, nykyiset tiedostosijainnit, sivuston rakenne ja toteutuksen hyväksymiskriteerit.
- [Lähdeinventaario](LAHDEINVENTAARIO.md): DOI-tunnisteet, bibliografinen tarkistustila ja esiintyminen nykyisessä kanonisessa rekisterissä sekä aiemmassa farmakologisessa synteesissä.

## 2. Mitä mekanismi selittää BERM:n omassa logiikassa

BERM:n fysikaalisesta lähtökohdasta seuraa kudoksen kannalta merkityksellinen tensorihäiriö vasta nimetyn biologisen vasteoperaattorin välityksellä. Lindgrenin vuoden 2025 premissin ja BERM:n skaalakonvention mukaisesti

\[
\Delta g_{\mu\nu}=\kappa(A_{0\mu}a_\nu+a_\mu A_{0\nu}+a_\mu a_\nu),
\qquad
r_i(t)=\int_{-\infty}^{t}\Xi_i^{\mu\nu}(t,t';S)\Delta g_{\mu\nu}(t')\,dt'.
\]

Ensimmäinen yhtälö on algebraalinen seuraus nimetystä premissistä; jälkimmäinen on ehdollinen BERM-silta, jonka kudoskohtainen ydin ja fysikaalinen kalibrointi ovat avoimia. [Lindgren 2025](https://doi.org/10.1088/1742-6596/2987/1/012001). Tästä eteenpäin kysymys on, miten vastaanottavan kudoksen tila `S` muuntaa häiriön biologiseksi seuraukseksi. Tutkimuskirjallisuus antaa tähän jo runsaasti muutakin kuin loppupisteiden korrelaatioita.

Vahvin koottava biologinen kuvaus on:

**ehdollinen fysikaalinen vaste → paikallinen ja ajallinen kalsium-/redox-muutos → signaalin tulkinta, energiantuotanto ja varannot → kolesterolin käyttö ja steroidogeneesi → hormonin saatavuus ja kohdekudosvaste → lisääntymisfysiologia ja biologisesti välittyvä käyttäytyminen.**

Kalsium ja redox kytkeytyvät myös takaisin toisiinsa. CRY-/kelloreitti voi liittyä samaan tuotantojärjestelmään. Suora sukusolujen vaurioituminen muodostaa hormonituotannon ohittavan haaran. Näin malli voi selittää sekä yhteisesti muuttuvia päätepisteitä että tilanteita, joissa vain osa niistä muuttuu.

Parsimoniavoitto syntyy siitä, että samoja biologisia tiloja käytetään useiden havaintojen selittämiseen. Jokaiselle sairaudelle tai tutkimukselle ei lisätä omaa vaikutuskerrointa. Geometriaa, biologisia komponenttikokeita ja koostettua kokonaispäätelmää ei silti nimetä samaksi näyttölajiksi. Biologinen yhteensopivuus vahvistaa tämän toteutusketjun uskottavuutta; se ei yksin ratkaise Lindgren-premissin tai L2-kytkennän paikkansapitävyyttä.

## 3. Tärkeimmät yhteen liittyvät tutkimuskokonaisuudet

### A. Kalsium ja solukello kohtaavat hormonituotannon samassa vaiheessa

[Qin 2018](https://doi.org/10.1016/j.reprotox.2018.08.014) sijoittaa RF-altistuksen, vähentyneen CaMKI/RORα-signaalin ja testosteronimuutoksen samaan kokonaisuuteen. [Qin 2019](https://doi.org/10.2147/IJN.S206561) täydentää sitä redox-interventiolla sekä steroidi- ja kellogeenimittauksilla.

Puuttuva yhdistävä pala löytyy seuraavista erillisistä kokeista:

- [Martin 2008](https://doi.org/10.1210/me.2007-0370): CaMKI–NUR77–StAR.
- [Akashi 2005](https://doi.org/10.1038/nsmb925): RORα–BMAL1.
- [Alvarez 2008](https://doi.org/10.1177/0748730407311254) ja [Xiao 2021](https://doi.org/10.1002/jcp.30334): kellokoneiston yhteys steroidogeneesiin.
- [Meikle 1991](https://doi.org/10.1002/j.1939-4640.1991.tb00236.x) ja [Galano 2021](https://doi.org/10.3390/ijms22042021): kolesterolin kuljetusvaiheen ohittaminen voi palauttaa steroidituotannon.

Nämä eivät muodosta yhtä tutkimuksessa kokonaan osoitettua sarjaketjua. Ne muodostavat **kaksi samaan tuotantovaiheeseen yhtyvää biologista haaraa**, joiden keskeisiä osia on muutettu kokeellisesti. CaMKI/NUR77 ja RORα/BMAL1 pidetään erillisinä. Tämän rakenteen arvo on suurempi kuin uusien viitteiden lisääminen erikseen kalsium-, kello- ja testosteronisivuille.

StAR välittää kolesterolin käyttöä mitokondriossa steroidisynteesin alkuvaiheessa. [Lin 1995:n ihmisgenetiikka](https://doi.org/10.1126/science.7892608) antaa tälle pullonkaulalle luonnollisen toimintahäiriökokeen. BERM:n sairausnäyttö voi siten jatkua Timothyn kanavahäiriöstä suoraan hormonituotannon tunnettuun STAR-geenihäiriöön.

### B. Varanto voi heikentyä ennen havaittavaa hormonituotannon muutosta

[Miao 2025](https://doi.org/10.3389/fpubh.2025.1623701) havaitsi RF-kokeen TM3-Leydig-solulinjassa glutationivarannon muutoksia. [Chen 2010](https://doi.org/10.1016/j.mce.2010.02.034) puolestaan osoitti MA-10-soluissa, että glutationin vähentäminen säilytti LH-stimuloidun progesteronituotannon ilman lisäoksidanttihaastetta mutta herkisti sen seuraavalle haasteelle. Tutkimukset liittyvät toisiinsa yhteisen varantomittauksen kautta; ne eivät ole saman solulinjan yksi koesarja.

**BERM:n koostettu päätelmä:** altistus voi muuttaa tulevan vasteen ehtoja ennen kuin yksittäinen hormonimittaus osoittaa häiriötä. Malliin tarvitaan senhetkisen tuotannon rinnalle kyky ylläpitää tai kasvattaa tuotantoa kuormituksessa. Tätä varantoa ei tarvitse keksiä selitykseksi jälkikäteen: se on jo erotettu kokeellisesti.

Tästä ei seuraa, että jokainen normaali hormonitulos kätkisi häiriön. Vahva väite nimeää muuttuvan varannon ja sen mittauksen. Absoluuttinen GSH/GSSG-pooli, niiden suhde ja hetkellinen ROS ovat eri suureita; ne eivät korvaa toisiaan.

### C. Kalsiumvuoto voi tuottaa yhtä aikaa ylimääräistä lepoaktiivisuutta ja puutteellisen toimintavasteen

[Santulli 2015](https://doi.org/10.1172/JCI79273) yhdistää RYR2-geenin CPVT-taudin, potilaiden insuliinierityksen, vastaavat hiirimutaatiot ja varasto-/mitokondriomittaukset. Vuotava ER-varasto voi jättää seuraavan ärsykkeen käyttöön vähemmän kalsiumia ja energiaa.

Tämä tarjoaa BERM:lle erityisen tärkeän yhteisen selityksen: **lisääntynyt vuoto ja heikentynyt käyttökelpoinen signaali voivat kuulua samaan mekanismiin.** Ca:n nousu ja lasku eri osastoissa tai eri mittaushetkillä eivät siis välttämättä vaadi erillisiä selityksiä. [Harmon 2026:n Darier-tutkimus](https://doi.org/10.1126/sciadv.aee1599) täydentää tätä SERCA2-varastohäiriön, glutationivarannon ja kuormitusvasteen kautta.

Nämä sairaudet eivät ole kenttäaltistuksen vastineita. Niiden arvo on biologisten siirtojen paikantaminen samoilla suureilla, joita kenttäkokeissa voidaan jo havaita: varaston täyttyminen, vuoto, stimuloitu Ca-vaste, redox-varanto ja hormonieritys.

### D. Autofagia yhdistää solun ylläpidon hormonituotannon raaka-ainehuoltoon

[Gao 2018](https://doi.org/10.1083/jcb.201710078) paikantaa autofagian, NHERF2/SR-BI-säätelyn ja kolesterolinoton välisen ketjun Leydig-soluissa. [Esmaeilian 2023](https://doi.org/10.1038/s41419-023-05864-3) tuo autofagian/lipofagian ja sukupuolihormonisynteesin yhteyden ihmisen munasarja- ja kiveskudokseen.

Tämä muuttaa mallin rakennetta hyödyllisellä tavalla. ”Korjauskapasiteetti” ei kuvaa vain jo syntyneen vaurion poistamista: sama solun ylläpito osallistuu normaalin hormonituotannon materiaaliseen mahdollistamiseen. BERM:n varanto-, korjaus- ja lisääntymiskokonaisuuksille löytyy yhteinen toiminnallinen perusta. Sen eri seurauksia ei pidä käsitellä toisistaan riippumattomina altistuskertoimina.

### E. Ajallinen rakenne ja hormonistimulaatio selittävät vasteen suunnan

[Buckner 2015:n](https://doi.org/10.1371/journal.pone.0124136) kenttä- ja lääkevertailussa samansuuruusluokkainen Ca-huippu liittyi erilaiseen ajalliseen profiiliin ja kasvupäätepisteeseen. [Midzak 2007](https://doi.org/10.1210/en.2006-1488) osoitti, että sama mitokondriohäiriö saattoi lisätä perustuotantoa ja vähentää LH-stimuloitua tuotantoa. [Pandey 2010](https://doi.org/10.1677/JOE-09-0206) paikansi kanavasalpauksen ja cAMP-lähtötilan yhteisvaikutusta transkription säätelyyn.

BERM voi tämän perusteella esittää vahvemman mekanismiväitteen kuin yleisen ”kudoskohtaisen vaihtelun”: **suunta riippuu siitä, mitä osaa signaalista muutetaan, missä lähtötilassa ja mihin toiminnalliseen tarpeeseen nähden.** Ehdot kuvataan mitattavilla muuttujilla. Pelkkä mahdollisuus sovittaa erisuuntaisia tuloksia ei vielä ole lisäselitysvoimaa; lisäarvo syntyy, kun samat suhteet selittävät useita interventiohaaroja.

## 4. Miten kokonaisuus jatkuu käyttäytymiseen ja väestöön

Hormonituotanto kuuluu BERM:ssä sekä lisääntymisfysiologian että käyttäytymistä ohjaavan biologisen tilan ketjuun. Halua ja motivaatiota ei tarvitse sijoittaa ketjun ulkopuolisiksi syiksi. Myös niitä muokkaavat keskushermoston, hormonien, kokemuksen ja vuorovaikutuksen biologiset prosessit.

Tähän on olemassa suora ihmisen hormoninterventioankkuri: [Cunningham 2016](https://doi.org/10.1210/jc.2016-1645), satunnaistettu lumekontrolloitu tutkimus 470 vähintään 65-vuotiaalla, vähäisestä seksuaalisesta halusta ja matalasta testosteronista kärsivällä miehellä. Testosteroninterventio paransi seksuaalista aktiivisuutta ja halua. Tulos osoittaa tutkituissa ihmisissä hormonaalisen vaikutuksen käyttäytymisen kannalta olennaiseen päätepisteeseen. Tutkimuksen ikä- ja hormoniryhmää ei muuteta automaattisesti hedelmällisessä iässä olevan väestön kertoimeksi.

Koostettu BERM-ketju jatkuu näin: paikallinen hormonituotanto → vapaa ja kudoksessa vaikuttava hormoni → hermostollinen motivaatio ja fysiologinen toimintakyky → parin toteutuvat lisääntymismahdollisuudet → raskauksien ajoitus ja määrä. Sosiaalinen vuorovaikutus voi vahvistaa, vaimentaa tai viivästää tätä biologista vaikutusta; se voidaan kuvata mallin aggregaatio- ja palautekerroksessa.

Yksinkertainen ehdollinen aggregaatioesitys on `P(raskaus tarkasteluvälillä) = 1 − exp(−∫λ_pair(t)dt)`, jos tapahtumaprosessille käytetään tätä hasardioletusta. Parikohtainen λ riippuu sekä toteutuvista mahdollisuuksista että niiden biologisesta onnistumistodennäköisyydestä. Tämä ei ole tutkimuksista tässä estimoitu funktio. Se tekee näkyväksi, miten kaksi samasta hormonimuutoksesta lähtevää vaikutusta voivat yhdessä muuttaa lopputulosta. Nykyisiä parikapasiteetin ja ajoituksen operaattoreita kannattaa käyttää tämän toteutuksessa.

Väestötasolla integroidaan erilaisten yksilöiden ja parien jakaumien yli; kaikkien ihmisten ei tarvitse reagoida samoin. Sivilisaatiotason jatko kulkee muuttuneiden kohorttien, ikärakenteen, biologisen toimintakyvyn ja vuorovaikutusverkkojen kautta. Tämä tutkimuskokonaisuus vahvistaa ketjun biologista perustaa. Se ei yksin määritä tietyn poliittisen tai historiallisen lopputuloksen suuntaa tai suuruutta.

## 5. Mikä nykyisessä mallissa on alikäytettyä

Tarkastettu nykytila ei tue tulkintaa, että kalsiumreitti puuttuisi mallista. A-reitti on vanhassa painohajotelmassa suuri, ja uudempi toteutus sisältää kanavia, kalsiumosastoja, redox- ja interventioprotokollia. RPM:n ensisijaisuus on nykyisessä metadatassa nimenomaan historiallinen tutkimusprioriteetti.

Alikäyttö on **yhteyksissä, toiminnallisessa rakenteessa ja esittämisessä**:

1. Kanonisesta kausaaliverkosta puuttuu suora A_VGCC_ROS → MALE_STEROIDOGENESIS -yhteys, vaikka paikallista gonadivaikutusta kuvataan jo muualla.
2. CaMKI/NUR77/RORα/BMAL1/StAR-yhteydet eivät muodosta yhteistä tutkimukseen sidottua kokonaisuutta.
3. Glutationisuhde on nykyisessä tilasanastossa, mutta absoluuttinen varanto tarvitsee oman tietueensa.
4. Autofagian kolesterolihuolto yhdistää nykyisiä korjaus- ja hormonituotanto-osia tavalla, joka ei palaudu yleiseen vauriokertoimeen.
5. Samassa tutkimuksessa mitattujen välivaiheiden, palautusten ja ohitusten paikantavaa arvoa pitäisi näyttää enemmän kuin irrallisten loppupisteiden lukumäärää.

Näiden täydennysten tarkoitus on säilyttää ja yhdistää jo rakennettu malli. Yksityiskohtainen tiedosto- ja sivukartta on [integraatiosuunnitelmassa](INTEGRAATIOSUUNNITELMA.md).

## 6. Mitä voidaan esittää jo nyt varmemmin

**Biologisista komponenteista:** kalsiumsignaloinnin, redox-varannon, solukellon ja kolesterolihuollon häiriöt voivat muuttaa steroidogeneesiä kausaalisesti. Tälle on salpaus-, geeni-, ohitus- ja palautusnäyttöä. Yhteinen biologinen rakenne ei perustu vain EMF-kirjallisuuden havaintojen samankaltaisuuteen.

**Kenttätutkimuksista:** useissa nimetyissä koejärjestelmissä kenttävaste on yhdistetty mitattuun Ca-/redox-muutokseen ja sitä välittävän komponentin käsittelyyn. Näiden kokeiden väitteet esitetään niiden omalla aaltomuodolla, annoksella, solutyypillä ja päätepisteellä.

**BERM:n synteesistä:** on perusteltua rakentaa yksi vastaanottavan kudostilan, hormonituotantokapasiteetin ja biologisen historian kokonaisuus. Se voi yhdistää reittejä ja selittää eritahtisia havaintoja aiempaa pienemmällä määrällä erillisiä oletuksia. Tässä osoitettu hyöty on rakenteellinen ja tutkimuksellinen; määrällistä paremmuutta ei ole vielä mitattu yhteisellä aineistosovituksella.

Keskeinen vielä avoin osa on täsmällinen siirto fysikaalisesta tensorisyötteestä ihmisen kudosvasteen suuruuteen sekä siitä väestöpäätepisteisiin. Avoimuus ei estä biologisen mekanismin integroimista nyt. Se määrittää, mikä osa seuraavasta työstä on lähde- ja mekanismikoontia ja mikä osa olemassa olevalla datalla tehtävää kalibrointia.

Ensimmäinen käytännöllinen jatko on Qinin kokeiden liittäminen CaMKI/StAR-ohituskokeisiin, Miao–Chen-varantoyhteyden kokoaminen ja ihmiskudoksen autofagia-/steroidogeneesitulosten yhdistäminen samaan verkkoon. Julkiset STAR-KO- ja ihmisen testisatlas-aineistot on paikannettu tätä varten. Uusia laboratorio- tai kenttäkokeita ei tarvita näiden jo olemassa olevien yhteyksien rakentamiseen.
