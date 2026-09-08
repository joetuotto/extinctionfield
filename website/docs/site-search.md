# Sivuston haku

Toteutus ja lähtötilanteen auditointi 8.9.2026.

## Lähtötilanne ja valinta

Sivustolla oli auditoinnin alussa 104 staattista sivureittiä, viisi artikkelia
ja 1 205 lähdetietuetta viidellä kielellä. Lähdetietokanta kasvaa muiden
sisältötöiden yhteydessä. Navigaation osoitteet kattoivat vain 47 erillistä
sivureittiä. Olemassa olevat haut rajasivat yksittäisiä työkaluja, eivät koko
sivustoa. Pitkillä mallin ja ennusteiden sivuilla tarvitaan tekstikatkelmien
lisäksi linkkejä alalukuihin. Yksi staattisista reiteistä oli pelkkä
uudelleenohjaus; hakemistoon tuli 108 varsinaista sivua kieliversiota kohden.

| Ratkaisu | Arvio |
| --- | --- |
| Pagefind + valmiiksi renderöity HTML | Valittu. Indeksoi sivujen ja komponenttien todellisen tekstin sekä käytössä olevat kielifallbackit. |
| MiniSearch + erikseen koottu hakuaineisto | Hyvä rakenteiselle aineistolle, mutta koko sivuston tekstien, katkelmien ja kielikäsittelyn ylläpito jäisi omaksi työksi. |
| Palvelimen haku-API / ulkoinen hakupalvelu | Ei ratkaise sisällön kokoamista yksinään; nykyinen aineisto ei edellytä kyselykohtaista palvelinpalvelua. |

Pagefindin [Node API](https://pagefind.app/docs/node-api/) ottaa vastaan HTML:ää
ja rakenteisia lisätietueita. [Kielituki](https://pagefind.app/docs/multilingual/)
sisältää suomen sanavartalokäsittelyn sekä japanin ja korean segmentoinnin.
Vertailukohtana käytettiin [MiniSearchin dokumentaatiota](https://lucaong.github.io/minisearch/).

## Käyttäjälle näkyvä toiminta

- Yläpalkissa on hakulinkki kaikilla sivuilla. Ctrl/⌘ K avaa haun tai kohdistaa
  hakukenttään; tekstikenttien omia näppäinkomentoja ei kaapata.
- `/{locale}/search?q=…&type=…&page=…` on jaettava osoite. Haku toimii
  kirjoitettaessa, ja tuloksia voi rajata sivuihin, artikkeleihin tai lähteisiin.
- Tulos näyttää otsikon, sisältötyypin ja osuman kontekstin. Alalukuosumat
  johtavat olemassa oleviin fragmentteihin, enintään kaksi sivua kohden.
- Kaikki sisällöt -rajauksessa sivut ja artikkelit näytetään ennen lähteitä,
  jotta suuri lähdetietokanta ei peitä sivuston selittäviä sisältöjä. Kummankin
  ryhmän sisällä järjestys perustuu hakumoottorin osuvuuteen.
- Sivutus lataa vain kymmenen tuloksen katkelmat kerrallaan. Sivunvaihto
  kohdistaa fokuksen tulosyhteenvetoon. Tulostila ilmoitetaan ruudunlukijalle.
- Kielenvaihto säilyttää hakusanan ja rajauksen sekä nollaa sivunumeron.
- Virhe hakemiston latauksessa erotetaan aidosta nollaosumasta; mukana on
  uudelleenyritys. Tyhjä haku näyttää esimerkkiaiheita.

## Indeksointi ja ylläpito

`npm run build` suorittaa entiset tarkistukset ja `next build` -vaiheen.
Sen `postbuild` tarkistaa renderöidyn HTML:n ja ajaa `npm run search:index`.
Jälkimmäinen lukee `.next/server/app/**/*.html` ja kirjoittaa
`public/pagefind/{en,fi,ja,fr,ko}/`-hakemistot. Julkaisun on käytettävä
`npm run build` -komentoa, kuten nykyinen Vercel-asetus; pelkkä `next build`
ei suorita npm:n postbuild-vaihetta.

Hakemisto syntyy väliaikaiseen hakemistoon ja korvaa edellisen vasta kun
kaikki kielet on kirjoitettu onnistuneesti. Virhe indeksoinnissa kaataa buildin.
Generoidut tiedostot on rajattu versionhallinnan ja lintin ulkopuolelle.
`public/pagefind/manifest.json` kertoo todelliset kielikohtaiset sivu- ja
lähdetietuemäärät. Päivitys ei tarvitse ulkoista palvelua tai tunnuksia.

Sisältöraja on yhteinen `main-content`. Valikot, footer, koristegrafiikat,
Reactin siirtodata ja tavalliset käyttöliittymäpainikkeet jätetään pois.
Indeksointikopio saa reitin mukaisen kielen: alkuperäinen root layout merkitsee
kaiken palvelimella englanniksi ja korjaa kielen vasta selaimessa.
Kielikohtaiset hakumoottorit ladataan vasta ensimmäisen haun yhteydessä.

Alalukuotsikko saa indeksointikopiossa lähimmän olemassa olevan sisältöankkurin,
jos sillä ei ole omaa tunnusta. Käyttäjälle tarjottavaa HTML:ää ja Reactin
siirtodataa ei kirjoiteta uudelleen. Mallisivun `CollapsibleSection` säilyttää
sisällön HTML:ssä piilotettuna; fragmenttilinkki avaa kohteena olevan osion.
Vanhat FieldState-mallireitit, historialliset reitit, hakusivu ja Nextin
uudelleenohjausartefaktit jätetään pois hakemistosta.

Lähdetietokannan kaikki kanoniset tietueet lisätään erikseen, koska lähdesivuja
ei esirenderöidä tietuekohtaisesti. Aliakset, DOI-, PMID- ja PMCID-tunnisteet
ovat haettavaa metadataa; vain bibliografiaa käytetään katkelmaan.
Pagefind 1.5.2 [hakee myös metadatasta](https://pagefind.app/docs/metadata/).
Varmentamattomat ja puutteelliset tietueet merkitään hakutuloksessa.
Osuma johtaa aina sivuston omaan kanoniseen tietueeseen, ei varmentamattomaan
ulkoiseen lähdelinkkiin. `finding`-tulkintoja ei siirretä hakutuloskatkelmiin.

## Rajat

Haku kattaa renderöidyn sisällön, avattavat malliosiot ja lähteiden bibliografian.
Se ei käännä hakusanoja, tuota vastauksia, päättele tutkimusnäytön vahvuutta tai
lue ulkoisten tutkimusten koko tekstejä. Vuorovaikutteisten työkalujen kaikki
vaihtoehtoiset tilat ja ladattavien tiedostojen koko sisältö eivät sisälly
automaattisesti HTML-indeksiin. Työkalujen omat tarkemmat haut säilyvät käytössä.
Suomen taivutusmuotojen käsittely on osittaista: esimerkiksi
hedelmällisyys/hedelmallisyys palautti saman osumajoukon, mutta
hedelmällisyyden palautti suppeamman joukon. Nollaosuman ohje neuvoo
kokeilemaan toista kirjoitusasua tai lyhyempää hakua.

Kehityspalvelin ei rakenna indeksiä jokaisesta tallennuksesta. Tuoreessa
checkoutissa aja ensin `npm run build`, sitten `npm run dev`; päivitä indeksi
uudella buildilla sisältömuutosten jälkeen. Pelkkä `search:index` käyttää
viimeisen onnistuneen Next-buildin HTML:ää.

## Varmennus

Kohdennetut testit kattavat indeksointirajat, kanoniset reitit, alias- ja
DOI-metadatan, kielitekstit, suljettujen osioiden ankkurit, jaettavan URL-tilan,
kielenvaihdon, sivutuksen fokuksen, vanhentuneiden hakuvastausten torjunnan,
virheestä palautumisen ja yhteisen navigaation.

Varsinaiset Pagefind-haut pitää tarkistaa myös generoidusta indeksistä;
komponenttitestien hakumoottorimock ei yksin todista indeksoinnin kattavuutta.
Nykyiset arkkitehtuuri-, rekisteri-, tyyppi-, lint- ja HTML-tarkistukset ovat
edelleen käytössä. BERM/FieldState-identiteettisopimusta tai sisältöjen
episteemistä luokitusta ei muuteta.

Suoritetuissa tarkistuksissa yhteisen työhakemiston 595 testiä läpäisivät
testiajon. Lopullisen tulosryhmittelyn kohdennetut testit läpäisivät myös
uusinta-ajon. Oikealla JS/WASM-hakumoottorilla tarkistettiin kaikki viisi
kieltä, DOI/alias-haku sekä sisällön ja lähteiden erilliset rajaukset.
Erillisen tarkistuskopion aineistosta tehtiin 18 hakua: 125 alalukuosumalinkkiä
johti olemassa olevaan ankkuriin, eikä tarkistetuissa tuloksissa ollut
väärän kielen osoitteita. Tämä on ohjelmallinen moottori- ja komponenttivarmennus,
ei selaimella tehty visuaalinen tai Worker-käyttötilan testi.

Yhteiseen työhakemistoon tuli samanaikaisesti muiden tehtävien keskeneräisiä
muutoksia. Hakumuutosten erillinen julkaisuketjun tarkistuskopio perustuu
HEAD-versioon ja vain tämän tehtävän muutoksiin. Muun muassa ChangeAtlasin
keskeneräiset tyyppi- ja lint-virheet sekä hetkellisesti puuttunut
ProxyBarrierEvidence-komponentti estivät yhteisen työhakemiston buildin
tarkistushetkellä; niitä ei muokattu tämän hakutehtävän yhteydessä.

Lopullisen hakukoodin `npm run build` läpäisi erillisessä tarkistuskopiossa
kaikki vaiheet: lähde- ja rekisteritarkistukset, TypeScript, tiukka lint,
Nextin tuotantokäännös, 552 renderöidyn HTML-reitin tarkistus ja viiden
hakemiston muodostus (108 sisältösivua + 1 205 lähdetietuetta / kieli).
Tuotantosivustolle ei tehty julkaisua.

Mainiin vientiä varten haku tarkistettiin uudelleen ajantasaista main-versiota vasten. Kaikki 500 tämän kokonaisuuden testiä ja koko `npm run build` läpäisivät tarkistukset. Hakemistoon tuli 108 sisältösivua ja 1 209 lähdetietuetta kieliversiota kohden. Julkaisuun valittiin vain tämän hakutoiminnon 20 tiedostoa.
