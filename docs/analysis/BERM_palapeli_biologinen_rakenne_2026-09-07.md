# BERM:n biologisen palapelin järjestävä rakenne

7.9.2026. Rajattu rakenneanalyysi nykyisestä mallista. Ei uusia lähdelistoja, koodimuutoksia tai julkaisua.

**Pääehdotus:** seuraava suuri edistysaskel on kuvata, miten sama elävä järjestelmä ylläpitää toimintaansa, muuttaa omaa vastaanottoaan ja siirtää vaikutuksia aikaskaaloilta toisille. Mallissa on jo suurin osa tähän tarvittavista osista. Puuttuva työ on niiden yhteisten rajoitteiden, todellisten tilariippuvuuksien ja elintason kokoamisen määrittely.

Lähtökohtana säilyy Lindgrenin 2025 premissi `g = η + κA⊗A` ja sen täsmällinen seuraus `δg = κ(A_b⊗a + a⊗A_b + a⊗a)`. Biologinen lukija `z_r = ∫K_r(S,τ):δg dτ` on avoin L2-silta. Alla olevat periaatteet ovat tämän lisäsillan ehdollista biologista jatkoa; resurssirajoite, tiladynamiikka ja aggregaatio eivät seuraa yksin metriikka-ansatzista.

## Tarkastettu nykytila

Nykyisestä mallista löytyvät jo:

- vastaanotinvalmiuden, korjauskapasiteetin ja vaurion erottelu;
- kalvokoneisto, Ca²⁺-lokerot ja osa vastaanoton ajallisesta palautteesta;
- järjestetty valohistoria ja proteiinialatyyppien erottelu;
- positiivisen palautteen vakausraja ja palautumisen hidastuminen;
- palautuva ja persistentti elinmuisti;
- hormoni–vastaanottavuusvaihe, toiminnallinen redox-ikkuna ja lähteiden paikallinen kompensaatio;
- pari-, odotus- ja lisääntymiskalenterirakenteet.

Siksi järjestäväksi puutteeksi ei pidä nimetä yleisesti ”palautetta”, ”muistia”, ”kompensaatiota” tai ”ei-monotonisuutta”. Niille on jo toimivia rakenteita. Tarkemmat täydennykset ovat seuraavat.

## 1. Kompensaatio tarvitsee kustannuksen ja jäljellä olevan toimintamarginaalin

**Mikä jo toimii:** solumallissa korjaus vähentää jäljelle jäävää vauriota. Implantaatiossa yhden lähteen tuotos voi riittää kompensoimaan toisen puuttumisen ennen toiminnallisen kynnyksen soveltamista. [Solutila](</Volumes/kovalevy 3/extinctionfield/berm/berm/modulome/state.py:172>), [paikallinen kompensaatio](</Volumes/kovalevy 3/extinctionfield/berm/berm/modulome/reproductive_bridge.py:207>).

**Puuttuva järjestävä periaate:** sama normaali toiminnallinen tulos voi olla ylläpidetty eri työmäärällä ja eri jäljellä olevalla kapasiteetilla. Pelkkä ulostulo ei tällöin kuvaa järjestelmän koko tilaa.

Nykyinen korjauskapasiteetti on suhteellinen koordinaatti. Sen rakentaminen ja käyttäminen eivät vielä ole yhteisessä, yksiköllisessä budjetissa kalvon ylläpidon, proteiinivaihdunnan, kasvun ja lisääntymistoiminnan kanssa. Vanhassa mTOR-moduulissa on kasvu–ylläpito-ajatus, mutta ei tällaista jaettua resurssitasetta. Tätä ei korjaa yhden lisäisen stressikertoimen lisääminen.

Ehdollinen runko voisi olla

\[
\dot E=P_{in}-P_{maintenance}-P_{repair}-P_{growth}-P_{reproduction},
\qquad M=P_{available}-P_{committed}.
\]

`E` on nimetty energiavarasto ja `P`:t saman yksikön energiavirtoja. `M` on vapaana oleva toimintamarginaali. Antioksidantti- tai solureserville tarvitaan oma, eri yksikön tase; niitä ei summata ATP:n kanssa yhdeksi luvuksi.

**Tästä seuraava uusi selitys:** toiminta voi näyttää vakaalta samalla, kun häiriön korjaamiseen sidottu osuus kasvaa ja joustovara pienenee. Seuraava haaste voi siksi tuottaa suuren lisävasteen, vaikka edellisen haasteen jälkeinen perustulos oli normaali. Vaihtoehtoisesti lisäresurssit voivat pitää kompensaation kestävänä. Kompensaatio ei siis itsessään todista ehtymistä tai tulevaa romahdusta.

Tämä periaate yhdistää mallin suojaavat, terapeuttiset ja haitalliset vastemuodot: niillä voi olla sama alkuvaste mutta eri vaikutus yhteiseen resurssitaseeseen. Se selittää myös, miksi ”korjaus lisääntyi” ja ”kokonaistoiminta parani” tarvitsevat erilliset päätelmät.

## 2. Samalla biologisella tilalla pitää olla yksi yhteinen kausaalinen toteutus

**Mikä jo toimii:** koostetussa solureitissä kalvokompetenssi ja vastaanotinvalmius ohjaavat Ca²⁺-sisäänvirtausta. Solutila päivittyy seuraavaa intervallia varten. Yksittäiset komponentit eivät siis ole täysin irrallisia. [Koostettu reitti](</Volumes/kovalevy 3/extinctionfield/berm/berm/modulome/reproductive_bridge.py:133>).

**Tarkka jäljellä oleva aukko:** nykyinen `s/A/D`-päivitys saa muutoksensa ilmoitetusta ajurista ja omista kertoimistaan; se ei käytä samassa kierroksessa laskettua Ca²⁺-trajektoria korjauksen käynnistymisen biologisena syynä. Hormoniajoitus tulee omana syötteenään. Spektri-ikkuna arvioidaan ilmoitetusta mitatusta alkutilasta eikä simuloidun solun tilaa teeskennellä uudeksi mittaukseksi. Tämä on nykyisen laskennan selkeä raja, jonka päälle yhteinen fysiologinen tilamalli voidaan rakentaa.

**Järjestävä ratkaisu:** määritellään yksi todellinen solutila `X`, jonka eri projektiot ovat kalvotila, CRY-kompleksit, Ca²⁺, proteostaasi ja kellovaihe:

\[
\dot X=F(X,z,N),\qquad
s=h_s(X),\quad A=h_A(X),\quad \phi=h_\phi(X),
\qquad y_k=H_k(X)+\epsilon_k.
\]

`h`:t ovat biologisia koostefunktioita; `H`:t kertovat, mitä laboratorio todella mittaa. Sama CRY-proteiinimäärä ei enää esiintyisi toisistaan riippumattomana syötearvona vastaanoton, kellon ja hormonireseptiivisyyden haaroissa.

**Miksi tämä lisää selitysvoimaa:** korjauskoneiston muutos voisi yhdestä yhteisestä syystä muuttaa sekä myöhempää vastaanottoa että hormonaalista lukemaa. Silloin havaintojen keskinäinen suhde olisi mallin ennuste, eikä kutakin havaintoa selitettäisi uudella vapaalla kertoimella. Malli voi samalla yksinkertaistua: useita erillisiä tilakertoimia korvataan samalla fysikaalisesti nimetyllä muuttujalla.

Yhteinen tilamalli ei tarkoita, että kaikki osat yhdistetään kerralla. Ensimmäinen suljettava fysiologinen osajärjestelmä voisi olla `kalvo → Ca²⁺ → korjaus/proteiinivaihdunta → CRY/kello → myöhempi vastaanotto`, täsmälleen niissä soluissa ja proteiinialatyypeissä joille yhteys on määritelty.

## 3. Muisti on tiedon siirtymistä kantajalta toiselle

**Mikä jo toimii:** mallissa on nopeaa fotokemiaa, palautumiskinetiikkaa, elinten R/P-muisti ja kalenterin tilasiirtymiä. Lineaarinen positiivinen palaute erotetaan myös palautumattomuudesta. [Palautteen vakaus](</Volumes/kovalevy 3/extinctionfield/berm/berm/modulome/feedback.py:92>), [elinmuisti](</Volumes/kovalevy 3/extinctionfield/berm/berm/biology/reproductive_state.py:103>), [kalenteri](</Volumes/kovalevy 3/extinctionfield/berm/berm/outcomes/reproductive_calendar.py:42>).

**Puuttuva järjestävä periaate:** näiden eri muistien välinen siirtymä tarvitsee oman tapahtumasääntönsä. Pitkä muistijälki ei synny siitä, että nopealle molekyylille annetaan pitkä palautumisaika.

Ehdollinen ketju on

`lyhyt vastaanottotapahtuma → aktiivisen kompleksin osuus → proteiinimäärän/vaiheen muutos → kehityssiirtymä → muuttunut solujakauma → menetetty tai syntynyt kalenteritapahtuma`.

Jokainen nuoli vaihtaa muistinkantajaa. Esimerkiksi nopea tila `x(t)` voi muuttaa hitaamman kehityssiirtymän hetkellistä nopeutta `λ(x,t)`. Tällöin siirtymän todennäköisyys ikkunassa `[0,T]` olisi oletetussa hazardimallissa

\[
P_{transition}=1-\exp\left[-\int_0^T\lambda(x(t),t)\,dt\right].
\]

Kun kehityssiirtymä on tapahtunut, `x`:n palautuminen ei yksin siirrä solua takaisin. Vastaavasti elintoiminnan palautuminen ei muuta jo kulunutta kalenteria. Pysyvä tulos ei näin edellytä pysyvää molekyylivauriota.

**Toinen seuraus:** saman kokonaismäärän kaksi ärsykehistoriaa voivat erota siksi, että vain toinen kohtaa siirtymäikkunan. Tärkeää ei ole vain ärsykkeen toistovälin suhde yhteen `τ`:hun, vaan useiden aikojen järjestys: alkutilan palautuminen, korjauksen käynnistyminen, kellon uudelleenajoitus ja solun kehityksellinen kelpoisuusikkuna.

Tämä tarjoaa yhteisen järjestyksen nykyisille muistimoduuleille. Se ei nimeä kaikkea palautumatonta yhdeksi `P`-kuormaksi, vaan selittää, mikä rakenne säilyttää jäljen kullakin tasolla.

## 4. Elin on tehtävää suorittava solujen järjestelmä

**Mikä jo toimii:** mallissa erotetaan solun signaali ja nimetty toiminnallinen päätepiste. Kudosympäristö sisältää solutiheyden ja nestevälitteisen siirron. Paikalliset hormonilähteet summataan ennen toiminnallista vaatimusta. Parijakauma ja ekologinen verkko tunnistavat jo ylemmillä tasoilla heterogeenisuuden. [Kudosympäristö](</Volumes/kovalevy 3/extinctionfield/berm/berm/modulome/tissue.py:50>), [toiminnallinen päätepiste](</Volumes/kovalevy 3/extinctionfield/berm/berm/modulome/reproductive_bridge.py:84>).

**Puuttuva elintason järjestävä periaate:** yhden edustavan solun vaste ei vielä kerro, pystyykö elin suorittamaan tehtävänsä. Lopputuloksen pitäisi riippua ainakin solutyyppien osuuksista, sijainnista, tuesta ja keskinäisestä kytkennästä:

\[
Y_o=\mathcal O_o(\{X_i\},\{W_{ij}\},N,\text{tehtävä ja aikaikkuna}).
\]

Tämä ei ole yksi uusi universaali funktio. Tuotantosolujen rinnakkaiset lähteet voivat korvata toisiaan; peräkkäisen tapahtumaketjun välttämätön vaihe ei korvaudu toisen vaiheen ylituotannolla. Nestevälitteinen viesti voi levittää vaikutusta, ja suojabarrierin tulos voi riippua paikallisesta järjestyksestä. Kullekin elimelle on määriteltävä sen oma minimaalinen järjestys.

**Seuraus palapelille:** suuri muutos joissakin soluissa voi jäädä elintoiminnassa pieneksi, jos korvaavia lähteitä on. Pienempi muutos välttämättömässä soluryhmässä tai ajoitusrajapinnassa voi puolestaan vaikuttaa voimakkaasti. Näin vaikutuksen suuruutta määrää myös se, missä solutyypissä ja missä prosessin kohdassa muutos tapahtuu.

Tämän kautta herkkyyden järjestystä voidaan johtaa elinten rakenteesta. Kaikkea ei tarvitse palauttaa väitteeseen, että jokin laji tai kudos on kokonaisuutena ”herkempi”. Sama paikallinen vastaanottoperiaate voi johtaa eri tuloksiin erilaisten biologisten tehtävien vuoksi.

## Yhteinen selitysrakenne

Nämä neljä periaatetta tuovat palapeliin yhteisen suunnan:

1. **Jaettu tila:** mikä muuttui todella, ja mitkä mittarit lukevat samaa muutosta?
2. **Kompensaation marginaali:** millä työmäärällä toiminta pysyy käynnissä?
3. **Muistinsiirto:** mihin seuraavaan biologiseen rakenteeseen muutos ehtii siirtyä?
4. **Elimen järjestys:** miten paikallinen tila muuttuu onnistuneeksi tai menetetyksi tehtäväksi?

Vahvin seuraava kokonaisväite on, että **sama biologinen säätelyjärjestelmä voi pitää hetkellisen toiminnan vakaana samalla, kun se muuttaa vastaanottoaan, voimavarojensa käyttöä ja myöhempien tapahtumien mahdollisuuksia**. Jo kootut palat antavat tälle rakenteelle perustan. Ehdotettujen yhteyksien sulkeminen tuottaisi uusia keskinäisiä ennusteita; niiden vaikutuskoot eivät vielä synny rakenteellisesta synteesistä.
