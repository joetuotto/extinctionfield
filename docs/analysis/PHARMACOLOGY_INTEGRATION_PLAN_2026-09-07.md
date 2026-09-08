# Farmakologisen näytön integraatio BERM-malliin ja sivustoon

Arvioitu 7.9.2026 tuotantoon yhdistetystä versiosta `6d79066887b178d40e43af5ba8868fed69594a85` ja käyttäjän toimittamasta kahdeksankohtaisesta synteesistä. Tämä dokumentti säilyttää alkuperäisen toteutussuunnitelman. Käyttäjän myöhemmän toteutuspyynnön perusteella integraatio on toteutettu; toteutuksen, varmennuksen ja julkaisun tila kirjataan [toteutusraporttiin](../audit/PHARMACOLOGY_INTEGRATION_RELEASE_2026-09-07.md).

**Keskeinen arvio.** Synteesi on merkittävä mallin rakenteelle: se antaa kokeellisia rajoitteita sille, miten kanavatyyppi, signaalin sijainti ja kesto, lähtötila sekä palaute määräävät vasteen. Tutkimukset eivät muodosta yhtä yhteistä koesarjaa. Niiden arvo on mahdollisuus rakentaa koejärjestelmittäin ennusteita, jotka erottelevat mekanismeja. Pelkkä uusi lääke- tai kalsiumkerroin kadottaisi tämän tiedon.

**1. Paikka mallin päättelyketjussa**

Nykyisen Lindgren-lähtökohdan `g = η + κ A⊗A` ja jaon `A = A₀ + a` tarkka seuraus on

\[
\Delta g_{\mu\nu}=\kappa(A_{0\mu}a_\nu+a_\mu A_{0\nu}+a_\mu a_\nu).
\]

Biologiseen kokeeseen päästään vasta eksplisiittisen kytkentäoletuksen, tensorikontraktion ja ehdollisen kausaalisen vasteoperaattorin kautta. Mittavalinta, fysikaalinen skaala, kudoskohtainen vasteydin, etumerkki, viive ja ihmisen päätepistekalibrointi ovat avoimia. Farmakologia rajaa tämän jälkeen biologisia välitysvaiheita. Se ei yksin tunnista ensimmäistä fysikaalista vastaanotinta tai ratkaise avointa kytkentää. FieldState säilyy valinnaisena mittaushaarana.

Ehdotettu ketju on: fysikaalinen syöte → ehdollinen kudosvaste → nimetty kanava-, lipidi- tai varastoportti → paikallinen ja koko solun tila → mitattu solutoiminto → erikseen perusteltu kudos- ja lisääntymisvaikutus. Myöhempi siirtymä käyttäytymiseen tarvitsee edelleen havainnon, muistin, ennakoinnin, toimintamahdollisuudet ja toisen osapuolen toiminnan; solukoe ei kalibroi niitä.

**2. Kahdeksan löydöksen sijoitus ja rajaus**

| Löydös | Integraatio | Säilytettävä ero |
|---|---|---|
| Melatoniini / MT2 | Depolarisaatiosta riippuva varastovapautus ja natriumvirtavastetta hillitsevä palaute. | Lepo-Ca, evokoitu Ca ja Na-virta ovat eri havaintosuureita. |
| GLP-1 / L-kanava | Kanavan lähialueen Ca ja erillinen varhainen/pitkäkestoinen ERK-vaste. | Paikallinen signalointi voi muuttua ilman havaittavaa koko solun Ca-nousua. |
| T-/L-kanavat ja CaV3.2 | Kanavakohtaiset virtareitit ja geenikohtaiset poistot. | Välttämätön välitysvaihe ei vielä ole ensimmäinen kenttäsensori. |
| AA / LTE4 | Lipidivälittäjän tuotanto, poistuma ja tietyn kanavavirran inhibitio. | Vasteen suunta perustellaan nimetystä reitistä. |
| Kanavamäärä / SERCA | Hidas kanavapopulaation muutos erilleen portittumisesta; esikäsittely muuttaa varaston alkutilaa. | Korkea lähtötaso, pieni lisävaste ja pysyvä historia eivät ole sama asia. |
| KL001 / CRY / FAD | Proteiinin määrä, sitoutumistila ja reaktiotila erikseen; lyhyt ja pitkä esikäsittely. | Kellovaste ja ehdotettu kenttäherkkyys ovat eri päätepisteitä. |
| Lääkkeen valoherkkyys | Lääkkeen aktiivinen pitoisuus osaksi ajastettua koeprotokollaa. | Valo voi vaikuttaa sekä soluun että koettimeen. |
| CoQ10 | Vertaillaan alkuvälityksen, mitokondrio-/redox-kuorman ja korjauksen vaihtoehtoja. | Suojaava lopputulos ei yksin paikanna vaikutuskohtaa. |

Liun solukokeessa melatoniini hillitsi kenttään liittyvää natriumvirtamuutosta samalla kun depolarisaation Ca-vaste suureni; lepo-Ca ei noussut. MT2 ja varastovapautus liittyivät mekanismiin. Tämä perustelee koekohtaisen palautehaaran. Ihmisen iltavalon melatoniinivaikutuksen yhdistäminen siihen on uusi ehdollinen ennuste: fysiologisen melatoniinin ja solukokeen annosten välinen silta on vielä määritettävä. Verkkokalvon kautta välittyvä vuorokausireitti pidetään erillään paikallisesta CRY–FAD-fotokemiasta. [Liu 2014](https://pmc.ncbi.nlm.nih.gov/articles/PMC4508145/), [Cajochen 2005](https://www.chronobiology.ch/wp-content/uploads/publications/2005_04.pdf).

Selwayn MIN6-kokeessa nopea BAPTA esti paikallista ERK-signalointia tehokkaammin kuin hidas EGTA. GLP-1:n varhaisessa, viiden minuutin vasteessa myös EGTA vähensi ERK-aktivaatiota osittain; 30 minuutin vaste säilyi. Paikallisuus on puskurikinetiikasta pääteltyä. Tutkimus ei sisältänyt kenttäaltistusta: siitä johdettava kenttä–mikroalue-ennuste merkitään BERM:n ehdotukseksi. [Selway 2012](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0033004).

Bucknerin tutkimuksen kanava- ja aikaprofiilit sekä Jimenezin CaV3.2-geenivaimennus perustelevat kanavakohtaiset testit. Sama Ca-huipun suuruus ei Bucknerilla riittänyt tuottamaan samaa kasvuvastetta. Eri kenttäprotokollia ja solutyyppejä ei yhdistetä yhdeksi annoskäyräksi; lääkkeiden kohdevalikoivuus kirjataan ja geneettinen näyttö erotetaan salpausnäytöstä. [Buckner 2015](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0124136), [Jimenez 2019](https://pmc.ncbi.nlm.nih.gov/articles/PMC6604666/).

Cuin AA/LTE4-välitteinen T-kanavan inhibitio tukee erillistä lipidireittiä. Sen käyttäminen eri solujen vasteiden suunnan ennustamiseen on jatkohypoteesi, joka tarvitsee lipiditilan mittauksen ja intervention. [Cui 2014](https://doi.org/10.1016/j.ceca.2013.11.002).

Grassin pitkittyneen altistuksen kokonaisvirta mitattiin Ba²⁺-virrantiheytenä; kanavaproteiinimittaukset tukivat määrän lisääntymistä ilman havaittua yksittäiskanavien portittumismuutosta. Bertagnan thapsigargin oli mukana jo ennen lähtömittausta: kohonnut lähtösignaali ja kadonnut kenttä–sham-ero on mallinnettava esikäsittelyn seurauksena. Varastotila ja mittauksen dynaaminen alue ovat erotettavia selityksiä. Kumpikaan koe ei osoita ylisukupolvista altistushistoriaa; Bertagnan puutteellisesti määritelty RF-protokolla ei kalibroi solujen annosta. [Grassi 2004](https://doi.org/10.1016/j.ceca.2003.09.001), [Bertagna 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC9069166/).

KL001:n sitoutuminen CRY:n FAD-taskuun ja biokemiallinen FAD-kilpailu tukevat määrän ja sitoutumisen erottamista. Endogeenisen FAD:n syrjäytymistä soluissa tai kenttäherkkyyden heikkenemistä ei näissä kokeissa mitattu. Hirotalla rytmin jakso piteni ja reporterin amplitudi pieneni: ilmausta ”kellovaikutus voimistuu” ei käytetä. CRY-alatyypit ja vapaat flaviinit säilyvät erillisinä. [Hirota 2012](https://pmc.ncbi.nlm.nih.gov/articles/PMC3589997/), [Nangle 2013](https://doi.org/10.1038/cr.2013.136).

Sanguinetti–Kassin valoherkkä lääkesalpaus perustelee soluttoman lääkeliuoksen esivalaistuksen kontrollin sekä eri tavalla valoherkkien, toiminnaltaan sovitettujen koettimien vertailun. Vaihtoehtoisten estäjien valo-ominaisuuksia ei yleistetä kaikkiin valaistusprotokolliin. [Sanguinetti & Kass 1984](https://pubmed.ncbi.nlm.nih.gov/6329345/).

Bektasin eläinkoe käsittelee GSM-moduloitua 3,5 GHz:n signaalia. CoQ10 lievensi osaa lopputuloksista, mutta kokeessa ei eroteltu varhaista Ca-vastetta eikä mitattu korjauksen aikavakiota. Tulosta ei merkitä 5G NR -näytöksi tai jo syntyneen vaurion täydelliseksi palautumiseksi. [Bektas 2026](https://doi.org/10.1002/bem.70043).

**3. Nykyisen laskennan hyödyntäminen**

Nykyinen `berm/berm/modulome/calcium.py` sisältää sytosolin, ER:n, SERCA:n ja mitokondrion dynamiikkaa. Rivillä 220 kenttäajuri kuitenkin syöttää yhtä kalvon sisäänvirtausta, ja myöhäinen virtasuure on aina negatiivinen varastokierron funktio. `membrane.py` sisältää kanavatunnukset, mutta kanavapoisto voi nollata koko koneiston. Näitä laajennetaan uudessa koekohtaisessa protokollaversiossa; nykyiset v1- ja v17-ajot säilytetään vertailuina.

Ensimmäiseen laskentavaiheeseen tarvitaan:

- L- ja T-kanavan itsenäiset reitit, paikalliset Ca-tilat sekä nykyiset yhteiset varastot. Mikroalueilla on tilavuudet tai aineen määrään perustuvat virtayksiköt.
- Ajastetut kenttä-, depolarisaatio-, lääke-, valo- ja pesutapahtumat. Esikäsittely ajetaan ennen vertailtavaa altistusta.
- Hidas kanavamäärä erillään nopeasta portittumisesta. Kanava- ja varastokohtaiset vasteportit sallivat kasvun ja vähenemisen sham-tasosta, säilyttäen pitoisuuksien ja virtausten fysikaaliset rajat.
- Havaintomallit paikalliselle ja koko solun Ca:lle, lepoarvolle, ER-sisällölle, Na-/Ca-virroille ja ERK:lle. Mittauksen havaitsemisraja ja mahdollinen kyllästyminen ovat erillään biologisesta tilasta.

Seuraavassa vaiheessa lisätään MT2, AA/LTE4, CRY:n määrä ja lääkeaineen aktiivinen osuus profiilien tarvitsemilta osin. Kaikkia reittejä ei pakoteta joka solutyyppiin. Vapaiden parametrien määrä pidetään pienenä; reittiä ei saa pelastaa säätämällä joka koehaaran vaikutuskerrointa erikseen.

Kaksi päällekkäisen laskennan riskiä on ratkaistava eksplisiittisesti. `photostate.py:329` sisältää jo FAD-sitoutumisasteen fototuotossa, joten CRY-määrä voidaan kertoa nykyisellä tuotolla ilman uutta samaa sitoutumiskerrointa. Toiseksi `reproductive_bridge.py` antaa nykyisin saman ajurin rinnakkain Ca- ja vauriomallille; `state.py:258` tuottaa vauriota suoraan ajurista. Jos uusi profiili johtaa vaurion mitokondrio-/ROS-kuormasta, tämä reitti korvaa kyseisen suoran tuotantotermin. Sen lisääminen vanhan rinnalle voisi laskea saman vaikutuksen kahdesti.

**4. Yhteinen rekisteri ja sivuston korjaukset**

Ehdotan yhtä kanonista `intervention_profiles_v1.json`-rekisteriä. Profiili sisältää tutkimuksen ja aineistoperheen tunnisteet, lajin ja solujärjestelmän, todellisen aaltomuodon, annoksen yksiköineen, valo- ja lääkeajoituksen, kohteet ja valikoivuuden, lähtötilan, mitatut koehaarat, havaintosuureet ja mittausajat sekä lähde-, claim-, prediction- ja atlas-tunnisteet. Puuttuva tieto on eksplisiittisesti tuntematon. Ehdotettu koejärjestely erotetaan raportoidusta kokeesta.

Nykyiset `MechanismCard`-kortit viittaavat profiili-ID:hen. `berm/export_modulome.py` tuottaa sivuston tarvitsemat tiedot, joita samat atlas-, evidenssi-, ennuste- ja koordinaationäkymät käyttävät. `DrugDiseaseCrossMap.tsx`:n irrallinen lääkelista korvataan tämän rekisterin näkymällä. Sama tutkimus ei muutu useaksi riippumattomaksi näytöksi eri sivuilla.

Ensimmäisen sisältömuutoksen tarkistuslista:

- `evidence/pharmacology/page.tsx:66,331`: GLP-1:n kanavan ohittava tulkinta korjataan. Ennusteen METAB-3 suora päätelmä lääkkeen kasvavasta hyödystä arvioidaan uudelleen.
- `DrugDiseaseCrossMap.tsx:21`: yleinen ”MT1/MT2 → Ca²⁺↓” korvataan kohde- ja vastekohtaisella kuvauksella; vastaavat ennuste- ja imeväishaavoittuvuussivujen tekstit tarkistetaan.
- Bektasin aaltomuoto, vaikutusten osittaisuus ja avoin vaikutuspaikka korjataan viiterekisteriin sekä farmakologia-, epidemiologia-, malli-, vuorokausi- ja atlasnäkymiin. Atlaksen `tissue_sperm` käyttää vanhaa kuvausta `causalMapData.ts:714`.
- Vanha `damage_rate × t_emf × (1 − exp(−t_free / τ_repair))` farmakologia- ja vuorokausisivuilla kasvaa palautumisajan kasvaessa vastoin proosaa. Esitys johdetaan yhteisestä vaurio-/korjausoperaattorista ja tarkistetaan, mitä suuretta kaava tarkoittaa. CoQ10:lle ei aseteta kokeesta johtamatonta korjausaikavakiota.
- Viite `bhatt2012_glp1` on Selwayn tutkimus väärällä tekijällä; korjataan tekijät ja DOI sekä säilytetään vanhan ID:n linkkitoimivuus. Nykyinen `liu2014` viittaa toiseen tutkimukseen: MT2-tutkimus saa oman yksilöllisen tunnisteen. Bertagna 2022 ja nykyinen Bertagna 2025 pidetään erillään.
- Farmakologian väite siitä, ettei mikään muu altistushypoteesi ennustaisi samojen lääkeryhmien merkitystä, korvataan testattavalla mekanismivertailulla. Lääkkeen kliininen teho ei yksin tunnista sairauden ympäristösyytä.

Jokainen kortti erottaa mitatun löydöksen, tutkimuksen mekanismitulkinnan, BERM:n ehdollisen ennusteen ja avoimen kalibroinnin. Sisältökorjaukset tehdään kaikille viidelle kielelle samasta rakenteisesta tiedosta.

**5. Atlas ja ymmärrettävä käyttöliittymä**

Säilytetään kuusi nykyistä aliatlasta ja yhteiset solmu- ja yhteystunnisteet. Lisätään niiden yli toimiva ”Farmakologiset kokeet” -näkymä: käyttäjä valitsee mekanismin, intervention tai havaintosuureen ja näkee sen lähimmät syy-yhteydet. Yhteyden etumerkki ja näyttötaso sidotaan koeprofiiliin. Erillistä irrallista seitsemättä tietoaineistoa ei tarvita.

Selittävässä näkymässä on kolme aloitusesimerkkiä: (1) suurempi Ca-vaste ja pienempi Na-virtamuutos, (2) muuttunut paikallinen signalointi ilman havaittavaa koko solun nousua, (3) muuttunut lähtötila ja puuttuva kentän lisävaste. Esimerkin päätepiste näkyy aina. Kuvitteelliset laskentakäyrät merkitään havainnollistuksiksi; julkaistun tutkimuksen mitatut pisteet ja epävarmuudet esitetään vain, jos ne on poimittu ja tarkistettu.

**6. Mallin ja integraation hyväksymiskriteerit**

Ensisijainen interaktiosuure saman koeprofiilin sisällä on

\[
I_D=[Y(F,D)-Y(sham,D)]-[Y(F,0)-Y(sham,0)].
\]

Käytetään samaa havaintosuuretta, yksikköä ja mittausaikaa; eri lähtötasoihin normalisoituja prosentteja ei vähennetä suoraan. Jos jokin neljästä haarasta puuttuu, rekisteri ilmoittaa kontrastin puuttuvaksi. Valon ja esikäsittelyajan interaktiot ovat seuraava vertailu. Nykyinen `interaction_contrasts` tarjoaa jo tarvittavan aritmetiikan.

Hyväksyntä vaatii reittien toiminnan ja aidon ennustetestin:

1. CaV3.2-poisto säästää riippumattoman L-kanavareitin. Mikroalueen muutos voi jäädä koko solun mittauksessa havaitsematta. Nopea ja hidas puskuri eroavat kinetiikan kautta.
2. SERCA-esikäsittely muuttaa sekä sham-alkutilaa että varastoa. Varastosta riippuvan vasteen katoaminen ei automaattisesti nollaa riippumatonta kalvovirtaa.
3. MT2-profiilissa erotetaan lepo-Ca, evokoitu Ca ja Na-virta. Sama parametrisaatio ennustaa agonisti- ja antagonistihaaroja.
4. Lääkeliuoksen soluton esivalaistus muuttaa koettimen tilaa ilman solun CRY-tilan muuttamista. FAD-sitoutuminen ja vauriotuotanto lasketaan kerran.
5. Parametrit estimoidaan rajatusta aineistosta ja testataan sivuun jätetyillä interventioilla, ajoituksilla tai aaltomuodoilla. Uusi rakenne vertautuu yksinkertaisempaan malliin; joustavuuden lisääminen yksin ei ole vahvistus.
6. Viitteet, profiili–claim–atlas-yhteydet, kieliversiot ja suorat linkit tarkistetaan. Kaikki vanhat solmut ja relevantit yhteydet säilyvät tai saavat dokumentoidun korvaavuuden. Nykyiset oletus-ASFR/TFR-ajot eivät muutu pelkän rekisterilisäyksen vuoksi.
7. Kun toteutus on valmis, suoritetaan kohdennetut laskentatestit, sivuston tarkistukset ja tuotantokoonti sekä selaimessa atlasvalinta, suodatus, takaisinpaluu ja linkitetyt koesivut. Julkaisun jälkeen samat keskeiset polut varmennetaan tuotannossa.

Suositeltu toteutusjärjestys: ensin lähde- ja sisältökorjaukset sekä yhteinen koerekisteri; sitten kanava-/mikroalue-/varastoprotokolla ja havaintomallit; tämän jälkeen MT2-, lipidi- sekä CRY–lääke–valo-laajennukset ja atlasnäkymät. Ihmisen toimintakykyyn ja lisääntymiseen ulottuva kalibrointi tehdään vasta nimettyjen välivaiheiden kautta. Näin farmakologia lisää mallin erottelukykyä ja testattavuutta.
