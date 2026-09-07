# Sivuston uusimman tiedon integraatioauditointi, 7.9.2026

**Rajaus.** Read-only-auditointi nykyisestä työpuusta; sivustoa ei muokattu. Tarkastin mallin pääsivun ja biologisen koordinaation sivun, FieldState-kuvauksen ja matematiikan, mekanismiehdokkaan toteutuksen, modulooman yleis- ja elinsivut, lisääntymisnavigaation, ennusteet, näyttörekisterin ja valittuja näyttösivuja, vastaväitteet sekä ekologia- ja sivilisaatiopolut. Vertailupohjana ovat erityisesti 54 löydön kooste `berm/docs/berm-new-findings-and-refinements-2026-09-07.md`, 7.9.2026 fysiikka-/biologia-/väestösynteesit, nykyinen `berm/docs/modulome-state-model.md` ja sivuston jo uutta tietoa käyttävä biologisen koordinaation sivu.

**Tulos.** Seuraavat kymmenen kohdetta ovat tiedon käyttämistä selitysketjuissa, testeissä tai siirtosäännöissä koskevia puutteita. Uuden 233-solmuisen atlaksen kattavuutta ei lueta todisteeksi niiden ratkaisemisesta. Useat uusimmat palaset ovat jo sivustolla hyvin esitettyinä; suurin työ on saada niiden mekanismit ohjaamaan myös vanhoja pääväitteitä ja numeeristen esimerkkien tulkintaa.

**Yhteinen lähtökohta.** Lindgren-porttia ei tarvitse avata uudelleen: vuoden 2025 Eq. 5:n premissi `g = η + κAA` sekä täydellinen `δg = κ(A_b a + a A_b + aa)` ovat käytössä. L2:n vastaanottokytkentä ja sen kalibrointi ovat avoimia. Alla ehdotetut biologiset siirtoketjut vahvistavat L3-tason mekanismikuvauksia ja niiden ehdollista aggregointia; tuotu biologia ei validoi L0–L2:ta.

| Prioriteetti | Kohde | Hyödyllisin muutos |
|---|---|---|
| 1 | Teknologiat ja spektrinen kerrostuminen | Teknologianimi ja kaistaluku → mitattu ajuri, vastaanottimen tila ja nimetty päätepiste |
| 1 | Palautuminen ja peruuttamattomuus | Yksi vauriotulkinta → vastaanotin, korjaus, vaurio ja toimintakyky eri aikaskaaloilla |
| 1 | Farmakologia ja kanavien erottelukoe | Lääkkeen teho → EMF-interaktion paikannus ja vastaanottimen/välittäjän erottelu |
| 1 | Lisääntymisestä TFR:ään | Biomarkkerien kertolasku → ehdolliset portit, parijakauma, odotusaika ja seuraava syntymä |
| 2 | Hormonit ja käyttäytyminen | Pitoisuus → paikallinen vastaanottavuus ja pulssien ajallinen yhteensopivuus |
| 2 | Metabolia ja elinten yhteistyö | β-solun vaurio → maksan tuotanto, haiman eritys ja kudoskellojen ajoitus |
| 2 | Kehitys- ja altistushistoria | Monotoninen sukupolviherkistyminen → mitatun historian muuttama vasteikkuna |
| 2 | Ekologia | Yksilövaste/lajiluokitus → kohtaamiset, ravintovirta, lisääntyminen ja loisen oma vaste |
| 2 | Sivilisaatio | Biomarkkerisumma → vuorovaikutusten virta ja uusiutuvat instituutiovarannot |
| 1 | Näytön tulkinta | Yleinen bias-korjaus → päätepistekohtaiset erot, absoluuttiset lähtötasot ja ennalta valitut kontrastit |

## 1. Teknologiaranking ja spektrinen kerrostuminen eivät vielä käytä uusinta ajurilaskentaa

**Nykyinen kohde ja puute.** `website/app/[locale]/evidence/technology/page.tsx:50` kutsuu Wi-Fi-verhokäyrää piilotetuksi ELF-lähteeksi ja esittää huipun yleiseksi biologiseksi määrääjäksi. `:61` antaa GSM-pulssille yleisen CW:tä suuremman bioaktiivisuuden; `:72` yhdistää laitekosketuksen siittiötrendin kaksinkertaistumiseen. Mallisivun `website/app/[locale]/model/page.tsx:640` käyttää `log₂(1 + bands)`-mittaria ja `:641` perustelee biologisen melukapasiteetin kasvua Shannon-muodolla. `:652` sanoo jo oikein, ettei analogiaa ole kokeellisesti validoitu. Puute on tämän varauksen ja edelleen deterministisen pääselityksen välissä.

**Sama tieto jo käytössä.** `website/app/[locale]/measurement/fieldstate/math/page.tsx:83` vaatii kalibroidut aaltomuodot, suunnan, vaiheen/koherenssin ja verhokäyräspektrin; näitä ei pidä esittää uutena puuttuvana FieldState-vaatimuksena. `website/app/[locale]/modulome/page.tsx:67` käyttää `R²_j = ∫W(f;s_j,B₀)S_d,j(f)df`-rakennetta ilman teknologiakohtaisia biologisia kertoimia. `website/lib/mechanism.ts:55` jättää päätepisteen lukutavan erikseen lukittavaksi. 54-koosteen `berm/docs/berm-new-findings-and-refinements-2026-09-07.md:76` erottaa kantajan yli häviävät ristiosat säilyvästä neliöllisestä ajurista; `:80` erottaa ristiparien määrän haitasta; `:147` todistaa, ettei sama SAR ja RF-tehospektri määrää hidasta intensiteettispektriä. `:158` antaa CW-vasteen ja GSM-nollan sisältävän vaikean vertailun.

**Puuttuva yhdistys.** Paikallinen vaiheellinen signaali → nimetty vastaanotinoperaattori ja aikakeskiarvoistus → biologisen ajurin spektri → sama ennalta lukittu ikkuna ja mitattu solutila → sama biologinen päätepiste. Teknologian käyttötapa, lähetysteho-ohjaus ja siirtogeometria kuuluvat signaalin tuottamiseen. Kaistojen lukumäärä ei korvaa niitä.

**Miten vahvistuu.** Teknologiasivusta saa konkreettisen vertailuohjelman: milloin sama teknologia antaa eri vasteen ja eri teknologiat saman vasteen? Jo johdettu komponentin poisto–takaisinlisäys ja taustakentän pyyhkäisy antavat kilpailijoita erottavia testejä. Luukkosen ja Belyaevin vaikeat parit ovat hyödyllisiä lukittuja testikohteita, eivät pois selitettäviä poikkeuksia. Pääsivun kaistamittari voidaan säilyttää nimettynä proxy-esimerkkinä ja erottaa varsinaisesta ajurista.

**Mitä ei saa päätellä.** RF-intensiteetin hidas verhokäyrä ei sellaisenaan ole samalla taajuudella mitattu magneettikenttä. GSM–UMTS-julkaisuluokkien ero ei ole biologisen haitan prosenttiero. Ideaalisignaalien järjestys ei vielä ole kokeiden biologisesti validoitu järjestys; koosteen tähänastinen auditointi ei hankkinut tutkimusten raakaa altistussignaalia. Uutta tilariippuvaista ikkunaa ei saa esittää aiemmin lukitun ikkunan onnistuneena testinä.

## 2. Palautumiskertomus ei hyödynnä jo toteutettua vastaanotin–korjaus–vaurio-erottelua

**Nykyinen kohde ja puute.** `website/app/[locale]/model/page.tsx:291` esittää 93 %:n ja 21 %:n korjausluvut akuuttien ja kroonisten tutkimusten selityksenä. `:342` nimeää BBB:n peruuttamattomaksi; `:344` yhdistää estevaurion kasvavaan efektiiviseen kenttään ja uuteen vaurioon. `:388` rinnastaa modernin ympäristön oletetun nollan EMF-vapaan tuntimäärän palautumisen puuttumiseen. `website/app/[locale]/predictions/page.tsx:1662` sitoo CaMKII:n palautumisen 4–6 tuntiin ja alle neljän tunnin vähäiseen palautumiseen. Näiden numeerista siirtoa ei nykyinen s/A/D-malli perusta.

**Sama tieto jo käytössä.** `website/app/[locale]/modulome/page.tsx:41` erottaa vastaanottimen s, korjauksen A ja vaurion D; `:71` kirjoittaa palautesilmukan vakauden `bd < r_x r_y`. `berm/docs/modulome-state-model.md:54` erottaa positiivisen palautteen peruuttamattomuudesta ja nimeää palautumisen hidastumisen mitattavaksi ennusmerkiksi. 54-koosteen `:206`, `:209` ja `:212` paikantavat Sanninon viivästyneen suojan, autofagian ja PARP:n; `:236` erottaa Houstonin vauriomarkkerit säilyneestä mitatusta IVF-toiminnasta; `:243` liittää mukaan kapasiteetin C. Myös nykyinen kivesmodulooma on jo omaksunut vakausrajauksen: sen korjaamista ei pidä ilmoittaa uutena työnä.

**Puuttuva yhdistys.** Altistushistoria → s ja A → vaurion muodostuminen miinus poistuminen → kudoksen toimintakyky C → palautumisen aikasarja. Hidas palaute voi muuttaa nopeutta ilman pysyvää tilamuutosta. Käyttökelpoinen testi mittaa rinnakkain absoluuttisen lähtötilan, uuden lähivasteen, korjausvirran ja toiminnon ennen altistusta, sen aikana ja tauolla.

**Miten vahvistuu.** Sama malli pystyy ennustamaan suojaavaa esikäsittelyä, hetkellistä hyötyä, herkistymistä ja hitaasti heikkenevää kudostoimintaa eri mitatuista alkutiloista. Palautumisennusteet voidaan ankkuroida näkyviin prosesseihin ja ajoituksiin; palautumisen hidastuminen on testattava signaali jo ennen suurta kudosvauriota.

**Mitä ei saa päätellä.** RF:n päättymisestä 20 tuntia myöhemmin havaittu suoja ei ole 20 tunnin molekyyliaikavakio eikä vauriomuistin mittaus. Koe ei vahvista yleistä 4–6 tunnin palautumiskynnystä. BBB-/BTB-häiriöstä ei seuraa sellaisenaan suurempi paikallinen fysikaalinen kenttä; mahdollinen kudossiirron muutos tarvitsee oman mekanismin ja dosimetrian. Hyödyllinen muutos ROS:ssa/Ca²⁺:ssa ei ole automaattisesti vauriota.

## 3. Farmakologiasta voidaan tehdä nykyistä vahvempi mekanismin paikannustesti

**Nykyinen kohde ja puute.** `website/app/[locale]/evidence/pharmacology/page.tsx:21` nimeää VGCC:n primaariseksi EMF-transduktiosolmuksi. `:26` johtaa obstetrisesta lääkkeen tehosta patogeenisen ylikuormitusmekanismin; `:41` ja `:44` esittävät verapamiilin T1D-tuloksen BERM-ennusteen vahvistuksena. `website/app/[locale]/predictions/page.tsx:413` tarjoaa neljä salpausryhmää, mutta ilman jokaisen salpaustilan omaa sham–EMF-kontrastia; jäljelle jäävä vaste nimetään suoraan CRY2–TRPC1-osuudeksi. `website/app/[locale]/objections/page.tsx:291` nostaa reitin B painon 15:stä 25 prosenttiin biologisen tehtäväkentän laajenemisen perusteella.

**Sama tieto jo käytössä.** `website/app/[locale]/modulome/page.tsx:47` paikantaa valmistettujen vesikkelien ja TRPC1-poiston avulla kalvokoneistoa. `:51` kuvaa RyR/SERCA:n roolin myöhemmässä ionivirrassa. `:63` erottaa immuunisignaalin toiminnallisesta päätepisteestä. 54-koosteen `:246` määrittelee täyden neliryhmäkontrastin ja `:251` erottaa vastaanottimen, välittäjän ja vasteen mahdollistajan. `:260` nostaa Bucknerin ja Bertagnan altistekohtaiset interventiot kliinistä indikaatioanalogiaa tarkemmiksi ankkureiksi.

**Puuttuva yhdistys.** Jokaisessa kanava-/geenitilassa sham ja nimetty kenttä → lähivaste → ER-/mitokondrio-/redox-välitys → korjaus → toiminnallinen päätepiste. Lisää intervention palautus tai alavirran ohitus ja intervention ajoitus. Sopivassa RF×kemikaali-asetelmassa `I=(Y_RF+K−Y_RF)−(Y_K−Y_sham)` lasketaan samalla etukäteen valitulla asteikolla, myös geeni-intervention eri tasoilla.

**Miten vahvistuu.** Tästä saa EMF:n osuuden samoissa biologisissa prosesseissa paikantavan koesuunnitelman. Se pystyy esimerkiksi erottamaan CRY-riippuvaisen vastaanoton ATG-riippuvaisesta myöhemmästä suojasta. Reittipainot voidaan myöhemmin johtaa samassa kudoksessa mitatuista kontrasteista; mekanismien lukumäärä ei enää toimi vaikutusosuuden korvikkeena.

**Mitä ei saa päätellä.** Salpauksen poistama vaste ei yksin paikanna primaarista kenttäsensoria. Nifedipiini ei ole kaikkien VGCC-alatyyppien yleissalpaaja; jäännösvaste ei siksi yksin identifioi TRPC1:tä. CRY2/RFK/TRPC1-, ATG-, PARP- ja SPOCK3-tulokset eivät ole valmiiksi yksi sarjaketju. Lääkkeen teho taudissa ei osoita taudin EMF-syytä, eikä mT-PEMF:n myoblastitulos anna gonadaalisen ympäristöaltistuksen prosenttipainoa.

## 4. Lisääntymisnavigaatio tarvitsee saman ehdollisen porttirakenteen kuin uusi koordinaatiosivu

**Nykyinen kohde ja puute.** `website/app/[locale]/evidence/reproductive-navigation/page.tsx:35` ja `:40` nimeävät kaikki yhdeksän askelta EMF-haavoittuviksi. `:55` sekä `:137` kuvaavat ennenaikaisen CatSper-aktivaation ja energiavarastojen ehtymisen suorana puhelinmekanismina, vaikka `:56` sisältää myöhemmän Ca²⁺- ja liikkuvuuslaskun. `website/app/[locale]/civilization/patopolis/page.tsx:44` kertoo siittiö-, munasolu-, ajoitus- ja motivaatiotekijät; `:46` käyttää pitoisuustrendiä siittiötekijänä ja `:52` siirtyy neljän 30 %:n esimerkkivajeesta TFR:n ja politiikan vaikutusten selitykseen.

**Sama tieto jo käytössä.** `website/app/[locale]/model/biological-coordination/page.tsx:42` käyttää Youngin CatSper-häiriötä ja Liun ovulaatiosta erotettua implantaatiota ehdollisina portteina, yhteinen mekanismi kerran laskien. `:44` yhdistää odotusaikajakauman perhekokoon. `docs/analysis/BERM_2026-09-07_biology_macro_steelman.md:33` yhdistää CatSperin, PMCA4-poistuman ja erillisen PLCζ/munasolun signaalin; `:102` kehittää parijakauman ja syntymäjärjestyksen. 54-koosteen `:233`, `:236` ja `:239` erottavat kanavapuutoksen, mitatun IVF-toiminnan säilymisen ja hitaasti muuttuvan kudosesteen.

**Puuttuva yhdistys.** Paikallinen pH/Vm/CatSper/PMCA4/ATP → oikea-aikainen hyperaktivaatio → saapuminen ja läpäisy → fuusio → PLCζ:n käynnistämä munasolun Ca²⁺-kuvio → implantaatio → elävänä syntymä. Näistä muodostetaan ehdollinen parikohtainen onnistumistodennäköisyys, joka etenee yritysaikaan, ikään ja seuraavan lapsen mahdollisuuteen. Samat hormoni- tai kellohäiriöt voivat vaikuttaa useisiin portteihin; riippuvuus on säilytettävä.

**Miten vahvistuu.** Mekanismi ennustaa hedelmällisyyshäiriötä myös normaalin siittiömäärän yhteydessä ja biomarkkerimuutoksia ilman vielä mitattua toiminnan pettämistä. Vahvin väestösilta on pitkän odotushännän ja myöhempien syntymien kautta, ei pitoisuuden suora prosenttimuunnos. Tästä saa uusia päätepisteitä jo olemassa oleviin kokeisiin ja pariaineistoihin.

**Mitä ei saa päätellä.** CatSperin geneettinen välttämättömyys ei osoita ympäristö-EMF:n sitä häiritsevän. Myöhempi matala Ca²⁺ ei mittaa sitä edeltänyttä ylimääräistä Ca²⁺-pulssia tai ATP:n ehtymistä. `0.7⁴` on rakenne-esimerkki vain aidosti erillisille ehdollisille muutoksille. TFR:n ympäristökerroin vaatii altistusjakaumat ja kapasiteetti→ASFR-siirron; 54-koosteen `:68` Cordelli-herkkyys ei tarjoa tätä kerrointa. Samassa yhteydessä periodi-TFR:n kuvaus syntyminä elinaikana (`patopolis:52`) kannattaa täsmentää.

## 5. Hormonipitoisuuteen perustuva käyttäytymisselitys ei vielä käytä vastaanoton ja ajoituksen näyttöä

**Nykyinen kohde ja puute.** `website/app/[locale]/articles/[slug]/DualLockArticleContent.tsx:20`–`:22` esittää T–kortisoli-vaikutuksen tasojen kautta; `:28`–`:30` muuntaa pitoisuusindeksit noin 47 %:n käyttäytymislaskuksi. Komponentti tuo jo biologisen koordinaation kontekstin (`:1`), mutta tekstin oma lasku ei käytä reseptoritilaa eikä pulssien ajoitusta. `website/app/[locale]/civilization/pathopege/page.tsx:59` käsittelee kortisolihaaran kroonisena kohoamisena; `:61` kortisolin T-vaikutuksia estävänä porttina. `:164` johtaa testosteronin väestömuutoksesta seitsemän käyttäytymisen samanaikaisen heikentymisen ja nimeää kolmen välittäjän lukon riippumattomiksi solmuiksi. GnRH-pulssien merkitys on jo aivolisäkesivulla; puute ei siis ole hormonien ajallisuuden täydellinen puuttuminen, vaan sen jääminen pois tästä makroargumentista.

**Sama tieto jo käytössä.** `website/app/[locale]/model/biological-coordination/page.tsx:27` käyttää Lamian CRY–glukokortikoidireseptoriyhteyttä. `:34` liittää redoxin SCN:n sähköiseen tilaan; `:36` käyttää hormonirytmin ja kohdegeenien ajoituksen eroa sekä pulssidekoodausta. `docs/analysis/BERM_2026-09-07_biology_macro_steelman.md:59` tuo saman hydrokortisoniannoksen erilaiset annostelurytmit; `:80` erottaa seerumin ja elinkohtaisen hormonitilan.

**Puuttuva yhdistys.** Biologinen tila/CRY/redox → reseptorin toimintavalmius ja kudoksen vaihe; hormonin määrä ja pulssit → ajallinen yhteensopivuus vastaanoton kanssa → paikallinen toiminto → yksilön käyttäytyminen tilanteessa. Esimerkiksi `S_H=∫W(φ(t))r(t)H_free,organ(t)dt` erottaa nämä komponentit.

**Miten vahvistuu.** Malli saa selitysvoimaa silloin, kun keskimääräinen hormonitaso on ennallaan mutta toiminnallinen vaste muuttuu. Sekä pitoisuuden että vastaanottavuuden mittaaminen tarjoaa paremman kokeen kuin pelkkä seerumitaso. Samalla kolminkertaisen lukon yhteiset takaisinkytkennät voidaan kirjoittaa auki, jolloin väitettyjen vaikutusten päällekkäisyys ei paisuta makrovaikutusta.

**Mitä ei saa päätellä.** CRY:n hormonisäätelytehtävä ei yksin osoita sen magneettista säätelyä kyseisessä ihmiskudoksessa. Kortisolipulssikoe ei ole EMF-koe. Keskiarvon prosenttimuutos ei määrää yksilön käyttäytymistä tai yhteiskunnan tilaa, eikä kolme biologista nimeä merkitse kolmea tilastollisesti riippumatonta syytä.

## 6. Metaboliassa alikäytetty silta on maksa–haima–kello, ei uusi luettelo Ca²⁺-reittejä

**Nykyinen kohde ja puute.** `website/app/[locale]/evidence/klimentidis-explained/page.tsx:38` käsittelee kolmea riippumatonta painonnousureittiä; `:54` ja `:56` vievät kentästä haiman insuliinieritykseen ja identiteettikatoon. `:64` sulkee adaptaation pois HPA-kertomuksesta. `website/app/[locale]/modulome/pancreas/page.tsx:31` kuvaa GSIS:n, `:39` ateriatilan ja `:47` erityshäiriöstä kuormitukseen ja uupumiseen etenevän ketjun. `:40`–`:41` erottavat χ_beta:n jo oikein geometrisesta χ:stä; sitä ei pidä ilmoittaa puuttuvaksi korjaukseksi.

**Sama tieto jo käytössä.** `website/app/[locale]/model/biological-coordination/page.tsx:27` tuo maksan CRY:n glukagoni–G-proteiini–cAMP-reitin. `:39` käyttää ateria-ajan aiheuttamia eroja kudoskellojen välillä sekä päiväsyömisen glukoosivastetta. Nykyinen ravintosivu käsittelee jo FAD-/CRY-/AMPK-tilaa. 54-koosteen `:243` tarjoaa vastaanoton, kuorman ja toiminnon erottelun.

**Puuttuva yhdistys.** Ravinnon koostumus ja ajoitus + kudoksen CRY/redox-tila → maksan glukagonivaste ja glukoosin tuotanto → veren glukoosi → β-solun K_ATP/VGCC/insuliinivaste → kudosten glukoosinotto → palautuminen maksaan ja haimaan. Erilliset kellovaiheet voivat muuttaa silmukkaa ilman kalorimäärän muutosta.

**Miten vahvistuu.** Hyperinsulinemia, heikentynyt eritys, lisääntynyt maksan tuotanto ja insuliiniresistenssi muuttuvat erotettaviksi selityksiksi. Ateria-aika tarjoaa konkreettisen ajallisen kokeen; glukoosin virta ja insuliinin pulssit toiminnallisia päätepisteitä. Klimentidis-haara saa yhteisen fysiologisen operaattorin sen sijaan, että laajasti esiintyvä VGCC yksin todistaisi kaikkien lajien saman vaikutuksen.

**Mitä ei saa päätellä.** Maksa–CRY- ja ateria-aikatulokset eivät tunnista EMF:ää aineenvaihduntatrendin syyksi. Taajuusnimike ei varmista altistusaaltomuotoa. Samassa takaisinkytkentäverkossa olevien reittien vaikutusosuuksia ei saa laskea toisistaan riippumattomina; T1D:n lääketulos ei anna T2D:n tai PCOS:n EMF-kerrointa.

## 7. Kehityshistoriasta voi saada erottelevan kokeen monotonisen herkistymiskertomuksen sijaan

**Nykyinen kohde ja puute.** `website/app/[locale]/model/page.tsx:385` ja `:387` käyttävät sähköistymisvuosia priming-tekijänä ja päättelevät vanhemman sähköistymishistorian lisäävän kaikkien lähteiden herkkyyttä. `website/app/[locale]/civilization/patopolis/page.tsx:73` esittää jokaisen sukupolven heikomman lähtötason, suuremman herkkyyden ja CaMKII:n pysyvän solumuistin. `website/app/[locale]/predictions/page.tsx:1199` merkitsee DIFF-3:n vahvistetuksi puberteettitrendin ja näyttöajan yhteydessä; `:1203` on `verified: true`.

**Sama tieto jo käytössä.** `website/app/[locale]/modulome/page.tsx:43` korvaa julkaisuvuoden passage-, erilaistumis-, kasvatus- ja esialtistushistorialla. `:67` sallii mitatun tilan muuttaa vasteikkunaa. 54-koosteen `:227` Blackmanin kehityskoe muuttaa myöhempää taajuusvalikoivuutta; `:230` käsittelee passage-riippuvuutta; `:254` erottaa vauriokyllästymisen, adaptaation, herkistymisen ja valikoitumisen. `:62` raportoi, ettei yleistä historiallista vaimenemista löytynyt genotoksisuuskartasta.

**Puuttuva yhdistys.** Kehityksen aikainen nimetty altistus ja muut kasvatusolot → mitattu solutila/kanavakoneisto/korjaus → myöhemmän vasteikkunan muoto ja taajuusvalikoivuus → kehityksen toiminnallinen päätepiste. Koekontrasti: sama akuutti kenttä eri tunnetuilla historioilla, ja jokaisessa historiassa sama taajuuspyyhkäisy sekä sham-lähtötaso.

**Miten vahvistuu.** Historiahypoteesi saa sekä herkistymistä että vasteen siirtymistä erottelevia ennusteita. Taajuuden vaihtuminen historian mukana on usein paljon tarkempi mekanismitesti kuin yleinen havainto suuremmasta tai pienemmästä vasteesta. Sivusto voi pitää kehityskaskadin vahvana ehdokkaana ja erottaa mitatun trendin, yksilötason assosiaation ja mekanistisen testin statuskenttiin.

**Mitä ei saa päätellä.** Blackmanin saman sukupolven kehityskoe ei osoita F3-periytymistä. CaMKII-autofosforylaatio ei sellaisenaan osoita pysyvää metylaatiomuutosta. Kliininen puberteettitrendi ei varmista EMF-dose–responsea. Julkaisuvuosi tai valtion sähköistymisikä ei mittaa nykyisen solun altistushistoriaa, eikä kummastakaan voi päätellä tiettyä geometrista herkistymistä.

## 8. Ekologia hyötyy kohtaamis- ja ravintovirtamallista enemmän kuin yleisestä herkkyysluokasta

**Nykyinen kohde ja puute.** `website/app/[locale]/evidence/ecology/page.tsx:22` tuo Mallinsonin laskeutumistuloksen; `:23` yleistää sen jokaiseen uuteen voimajohtoon, muuntajaan ja sähkölaitteeseen. `:63` yhdistää kasvien ja eläinten kriisit yhteen CRY-molekyyliin. `website/app/[locale]/articles/[slug]/BeeArticleContent.tsx:37` päättelee Varroan kuoren ja koon suojaavan sitä, `:39` sen toimintakyvyn säilyvän jokaisessa EMF-lisäyksessä. `website/components/EcoStaticInterface.tsx:334`–`:335` pitää samaa epäsymmetriaa yleisen valintakertomuksen pohjana.

**Sama tieto jo käytössä.** EcoStatic-käyttöliittymän `:329`–`:330` vaatii jo kelpoisuuslinkin ennen valintapäätelmää; sitä ei pidä korjata uutena puutteena. `website/app/[locale]/model/biological-coordination/page.tsx:47` tuo Brosin pölyttäjäverkon ja siementuotannon. `docs/analysis/BERM_2026-09-07_biology_macro_steelman.md:155` liittää Mallinsonin polariteetin ja ajallisen muutoksen Knopin yövalaistus–vierailut–hedelmätuotto-ketjuun. Rajattu näyttörekisteri sisältää myös loisten sähköisiä kohtaamisia sekä fysiologista RF-vastetta (`website/lib/evidence.ts:528`, `:576`, `:592`); se ei tue loisten yleistä immuuniutta. 54-koosteen `:257` nimeää yhteisen solubiologian ilman universaalia lajivaikutusta.

**Puuttuva yhdistys.** Paikallinen kenttä ja eliön tila → havainto, suuntautuminen, laskeutuminen → kukinta-/aktiivisuusikkunoiden päällekkäisyys → ravinnon palautus ja tehokas pölytys → siemenet, kuningattaren tuotanto ja yhdyskunnan uusiutuminen. Loisen puolella tarvitaan erikseen kohtaaminen, tarttuminen, ruokailu, lisääntyminen ja isännän puolustus. Niiden erotus voi tuottaa epäsymmetrian; sitä ei oleteta lajin nimellä.

**Miten vahvistuu.** Pölytystoiminnan lasku voi tulla näkyviin ennen yksilömäärän muutosta. Päivä- ja yöpölyttäjien osittainen kompensaatio, oppiminen/adaptaatio ja ruokahuolto ovat mitattavia välivaiheita. Mekanismi mahdollistaa varhaiset kenttämittarit ja lajien väliset ennusteet saman paikallisen altisteen perusteella.

**Mitä ei saa päätellä.** Yhden kokeen 71 %:n laskeutumismuutos ei ole kaikkien laitteiden tai kaikkien pölytysverkkojen vaikutuskoko. Optinen valo, staattinen sähkö, ELF ja RF säilyvät eri vastaanottoreitteinä. Niveljalkaisen pieni koko tai kova kuori ei osoita EMF-suojaa. Tarttuminen ei yksin ole lisääntymiskelpoisuus, eikä biologinen kenttävaste todista maailmanlaajuisen trendin syytä.

## 9. Sivilisaation biologinen perusta vahvistuu uusintamisen dynamiikalla

**Nykyinen kohde ja puute.** `website/app/[locale]/civilization/patopolis/page.tsx:79`–`:83` kertoo rakentamisesta, ylläpidosta ja rapautumisesta, mutta ei kuvaa toistuvien vuorovaikutusten tuotosta. `website/app/[locale]/civilization/patopoliteia/page.tsx:107` käyttää kiinteitä BioCap-kynnyksiä historiallisiin luokkiin; `:115` antaa biomarkkeripalautusten osuudet ja `:126` tekee EMF-vähennyksestä ainoan kaikkiin vaikuttavan intervention. Nykyiset mallilähtöiset luvut on jo merkitty malliluvuiksi: puute ei ole laskentakoodin ja sivun synkronointi vaan biologisten välivaiheiden käyttö.

**Sama tieto jo käytössä.** `website/app/[locale]/model/biological-coordination/page.tsx:47` käyttää univajeen sosiaalisia kokeita sekä yhteistyön verkostosiirtymää; `:48` kuvaa osaamisen ja infrastruktuurin varantoja. `docs/analysis/BERM_2026-09-07_biology_macro_steelman.md:131` muodostaa yksilön tilasta kontaktitodennäköisyyden; `:178` yhdistää onnistuvat kohtaamiset osaamisen ja ylläpidon uusiutumiseksi.

**Puuttuva yhdistys.** Vastaanotin/kello/uni → aloitteen, vastaanoton ja avun todennäköisyys kummallakin osapuolella → onnistuvien sosiaalisten tapahtumien virta → hoiva, oppiminen, korjaus ja yhteistyö → uusiutuvat instituutiovarannot. Esimerkiksi `dK/dt=αE_social−δK`, `dM/dt=βQ_care,repair−γM` tekevät ylläpidon ja kulumisen suhteen eksplisiittiseksi.

**Miten vahvistuu.** Pieni jatkuva muutos voi ensin peittyä aiemmin kertyneeseen osaamiseen ja infrastruktuuriin, sitten näkyä viiveellä. Malli saa konkreettisen biologisen aggregointimekanismin, jonka välivaiheita voi testata ilman sivilisaatioluokituksen hyväksymistä. Se auttaa myös erottamaan vuorovaikutuksen muutoksen yksilön mieltymysten muutoksesta.

**Mitä ei saa päätellä.** Unikoe ja yhteistyökoe eivät määritä EMF:n kausaaliosuutta tai BioCap-painoja. Verkoston vahvistus ei ole kaikissa yhteisöissä sama. Hormonien palautus mallissa ei ole kliinisen intervention ennuste. Historialliset kynnykset ja vuosiluvut eivät muutu empiirisesti kalibroiduiksi sillä, että niiden eteen lisätään uusi mekanismikaavio.

## 10. Rajattu näyttörekisteri on edellä yleistä tulkintataulukkoa ja vastaväitteitä

**Nykyinen kohde ja puute.** `website/app/[locale]/evidence/page.tsx:146` selittää nollatuloksen verrokkikontaminaatiolla ja `:166` positiivisen vaikutuksen aliarvioiduksi. `:156` mahdollistaa varmuuden yleisen noston oletettujen vaimentavien vinoumien perusteella. `website/app/[locale]/objections/page.tsx:305`–`:310` vetoaa vanhaan 517:n genotoksisuusmäärään, yleiseen moderatorivahvistukseen ja positiivisiin alaryhmiin. Taulukko ei vielä käytä uusimman projektianalyysin päätepiste-, laatu-, annos- ja asetelmarajauksia.

**Sama tieto jo käytössä.** `website/lib/evidence.ts:351` ja `:367` erottavat Cordellin päätepisteet, korjauksen ja suuren SAR:n herkkyyden. `website/app/[locale]/modulome/page.tsx:43` kertoo, miksi pieni lisävaste ei yksilöi kyllästymistä. 54-koosteen `:50` määrittelee 530 yksilöllistä julkaisua, 460 pääanalyysin kokeellista julkaisua ja 130 laatuseulan täyttävää; `:53`–`:57` erottavat DNA-tulosluokan ja muun biologisen vasteen; `:65` erottaa puuttuvan taustaraportoinnin todetusta kontaminaatiosta; `:68` antaa hedelmällisyyden annosherkkyyden; `:254`–`:255` antaa mitattavat vaihtoehdot pienelle vasteelle.

**Puuttuva yhdistys.** Tutkimuksen mitattu ajuri + kohde/tila + absoluuttinen sham-lähtötaso + päätepiste ja vaikutussuunta → etukäteen valittu mekanismikontrasti → laadun ja annoksen herkkyys → erillisessä aineistossa testattu ennuste. Julkaisun kyllä/ei-tulos voi auttaa löytämään testin, mutta ei korvaa vaikutuskokoa tai vastaanottimen tilaa.

**Miten vahvistuu.** Korvaa yleiset ”BERM-korjatut” selitykset vaihtoehdoilla, jotka tuottavat eri havaintoja: kyllästymisessä huonompi lähtötaso ja pienempi lisävaste; suojassa parempi haastetoleranssi; herkistymisessä suurempi lisävaste; valikoitumisessa jakauman koostumus muuttuu. Käytä vaikeita ja nollatuloksia näiden erottamiseen. Päätepistekohtainen rekisteri voi syöttää samaa testikorttia teknologiasivulle, vastaväitteisiin ja ennusteisiin.

**Mitä ei saa päätellä.** 530 julkaisua ei ole 530 hedelmällisyyskoetta eikä 530 uutta kokotekstilukua. 10 %:n taustaraportointi ei merkitse 90 %:n todettua kontaminaatiota. GSM–UMTS-julkaisuluokan OR ei mittaa vaurion määrää. Korkean SAR:n poistossa muuttuva tiinehtymisarvio ei anna pienen ympäristöaltistuksen kerrointa. Tuloksen jälkeen löytynyt alaryhmä ei yksin validoi etukäteen ennustettua vastaanotintilaa.

## Jo integroidut asiat, joita ei pidä raportoida uusina puutteina

- FieldState säilyttää jo suunnan, vaiheen/koherenssin, aaltomuodon ja provenance-tiedon; se erottaa mittausprotokollan v17-maakohtaisista proxy-ennusteista (`measurement/fieldstate/page.tsx:42`, `:48`).
- Biologisen koordinaation sivu sisältää jo CRY–GR-/cAMP-sillat, hormoni–kudosvaiheen, ehdolliset lisääntymisportit, odotusaikajakauman ja vuorovaikutusverkot. Löydökset koskevat niiden siirtämistä niitä tarvitseviin vanhoihin argumentteihin.
- Modulooman tilamalli, kalvovesikkelit, ER-kalsium, valojärjestys, suuntautuminen, kudosvälitteinen viesti, mitatun tilan vasteikkuna ja palautteen vakaus on jo toteutettu rakenteellisina malleina. `STRUCTURAL_ONLY`-asema ja vaaditut parametri-/evidenssitunnisteet ovat dokumentoituja; niitä ei pidä väittää kalibroiduksi ennustemoottoriksi.
- Haima erottaa jo biologisen χ_beta:n geometrisesta χ:stä. IPR-toteutus erottaa jo paikallisen vastaanotinehdokkaan kudos- ja väestösiirrosta (`website/lib/mechanism.ts:4`).
- Rajattu evidenssirekisteri sisältää jo Cordellin korjauksen ja annosherkkyyden. EkoStaattinen käyttöliittymä sisältää jo lajikohtaisen siirtorajan ja kelpoisuuslinkin vaatimuksen; vanha valintamaiseman proosa on silti sen kanssa ristiriidassa.

**Suositeltu työjärjestys.** Ensin yhteiset ajuri-/tila-/päätepiste- ja interventiokortit, sitten vanhojen teknologia-, palautumis- ja farmakologiaväitteiden sovitus niihin. Seuraavaksi lisääntymisen ehdolliset portit ja parijakauma. Hormonien vastaanotto, metabolinen silmukka, ekologiset ja sosiaaliset kohtaamiset voidaan sen jälkeen toteuttaa samalla ajallisten siirtymien rakenteella. Jokaisessa kohdassa tuotos on nimetty mekanismiketju ja sitä erotteleva mittaus; lähdelistan kasvattaminen yksin ei ratkaise puutetta.
