# Lähdekohtaisesta historiallisesta profiilista BERM:n ehdolliseen ASFR-skenaarioon

8.9.2026. Toteutus: `website/lib/berm-atlas-scenario.ts`. Tämä muutos täydentää skenaariolaskennan rajapintaa; se ei muuta alkuperäisiä havaintoja tai lähderekistereitä. Käyttöliittymä valitsee lähteet, yhteismitallisen normalisoinnin ja näkyvät herkkyysvaihtoehdot.

## 1. Lindgren-premissi, tensorinen seuraus ja avoin silta

Valittu lähtökohta on Lindgrenin, Kovacsin ja Liukkosen vuoden 2025 muotoilu, BERM:n mittakaavakerroin näkyvänä:

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu,
\qquad A=A_0+\sum_j a_j.
\]

Taustaan verrattu täsmällinen erotus on

\[
\Delta g_{\mu\nu}=\kappa\left(
A_{0\mu}\sum_j a_{j\nu}+\sum_j a_{j\mu}A_{0\nu}
+\sum_{j,k}a_{j\mu}a_{k\nu}\right).
\]

Tämä on **[JOHDETTU]** ulkotulon avaus. Sen jälkeen biologinen vaste vaatii erillisen sillan. BERM:n ehdollinen **[TUOTU]** L2-muoto on

\[
u_i(t)=\int_0^\infty K_i^{\mu\nu}(\tau;S_i(t-\tau))
\Delta g_{\mu\nu}(t-\tau)\,d\tau.
\]

Gauge, fysikaalinen mittakaava, kudosytimet, vasteen merkki, viive ja päätepistekalibrointi ovat **[AVOIN]**. Teknologian myynti, käyttöönotto tai sähköenergian kulutus ei yksin identifioi näitä. Historiallisten ajureiden liittäminen tähän siltaan on eksplisiittinen BERM-skenaario. FieldState voi tuoda fysikaalisia havaintoja syöterajalle, mutta se ei määrittele biologista operaattoria tai tuota tämän laskelman ennustetta. [Vuoden 2025 alkuperäisjulkaisu](https://doi.org/10.1088/1742-6596/2987/1/012001).

## 2. Mitä uusi profiili korjaa

Pelkästä ensikäyttövuodesta alkava yhteinen kahdeksan vuoden ramppi muuttuu pian vakioksi. Jos lähde tuli käyttöön ennen vuotta 1950, tällainen funktio voi olla vakio koko tarkasteluajan, vaikka sähköntuotanto, laitekanta tai kuormitus kasvaisi edelleen voimakkaasti. Baseline-erotus hävittää silloin juuri tämän myöhemmän kasvun.

Uusi `profile` käyttää lähteen omia vuosia ja arvoja. Jos esimerkiksi normalisoitu lähdearvo kasvaa vuoden 1950 arvosta 0,2 vuoden 2023 arvoon 1, lineaarisella amplitudisillalla lähteen oma neliötermi kasvaa 0,04:stä yhteen, vaikka dokumentoitu käyttöönotto olisi jo vuonna 1880. Kasvua ei korvata varhaisesta ensikäytöstä alkavalla rampilla.

Alkuperäisen lähderekisterin piste pysyy julkaistuna lukuna. Sen välivuosiarvo kuuluu erilliseen skenaarion historiallista profiilia muodostavaan vaiheeseen. **[TUOTU]** tilastollinen historia ja **[EMERGENTTI]** kenttä-/vastelaskelma säilyvät erillisinä.

## 3. Lähdeprofiilin rajapinta ja peitto

```ts
interface ScenarioSource {
  id: string;
  startYear: number;
  endYear: number;
  amplitude: number;
  angleDegrees: number;
  enabled: boolean;
  windows?: { startYear: number; endYear: number }[];
  profile?: { year: number; value: number }[];
  profileMode?: "linear" | "step";
  profileStep?: "previous" | "next";
  profileTransform?: "linear" | "sqrt";
  profileOutside?: "unknown" | "hold";
  profileWindows?: { startYear: number; endYear: number }[];
}
```

`profile` korvaa yhteisen `rampYears`-parametrin kokonaan kyseiselle lähteelle. Arvojen pitää olla äärellisiä ja epänegatiivisia sekä vuosien aidosti kasvavassa järjestyksessä. Arvon ei tarvitse olla enintään yksi: käytetty vertailusuure voi myös ylittyä. Tyhjä profiili on tuntematon, ei nollahistoria.

`windows` nimeää skenaarion toimintaikkunat. Niiden ulkopuolella valittu lähdekomponentti ei ole mukana. Tämä säilyttää aiemman API:n esimerkiksi dokumentoidun sulkemisen tai käyttökatkon käsittelyn; se ei väitä koko ympäristön fysikaalista kenttää nollaksi. `profileWindows` nimeää erikseen profiilin datapeiton. Sen sisäisten aukkojen yli ei interpoloida eikä pidetä lähintä päätearvoa. Ilman erillisiä peittoikkunoita profiilin peräkkäiset pisteet määrittelevät interpoloitavat välit.

Jos toimintaikkunoita on useita, profiilin tukipisteet rajataan kulloiseenkin toimintaikkunaan. Sulkemista edeltävästä pisteestä ei interpoloida uudelleenkäynnistyksen jälkeiseen pisteeseen. Käyttöön palanneen jakson ensimmäistä puuttuvaa vuotta voi käsitellä vain saman jakson päätearvon eksplisiittisellä pidolla. Jos koko uusi jakso on vailla pisteitä, myös pito jättää sen tuntemattomaksi.

Oletus `profileOutside: "unknown"` jättää profiilin päiden ulkopuolen tuntemattomaksi. Yksittäinen piste tuntee tällöin vain oman vuotensa. Erikseen valittu `"hold"` jatkaa lähintä päätearvoa vakiona toimintaikkunan sisällä. Tätä voidaan käyttää reuna-oletuksen herkkyystarkasteluna, esimerkiksi silloin kun mittariasennukset alkoivat ennen ensimmäistä saatavilla olevaa kattavuuslukua. Pidetty arvo merkitään `assumed-hold`-arvioksi; sitä ei siirretä havaintorekisteriin. Tunnettua toimintaikkunan ulkopuolista sulkemista pidolla ei kumota.

`evaluateScenarioSource(source, year, rampYears)` palauttaa `{value, basis}`. Tuntemattoman arvon `value` on `null`. `basis` erottaa alkuperäisen profiilipisteen (`profile-point`), lineaarisen välivuoden (`profile-linear`), askeltulkinnan (`profile-step`), pidetyn päätearvon (`assumed-hold`), puuttuvan profiilin (`profile-missing`), vanhan rampin, poiskytketyn lähteen ja toimintaikkunan ulkopuolen.

Vanhat lähteet ilman `profile`-kenttää käyttävät edelleen aiempaa ramppia. Niitä varten säilytetään nimetty vertailutila. Numerotonta teknologiaperhettä ei tarvitse eikä pidä muuttaa uudessa datapohjaisessa tilassa automaattisesti samansuuruiseksi potentiaalimoodiksi.

## 4. Välivuoden ajoitusvaihtoehdot

Olkoon lähteen kaksi peräkkäistä arvoa \((t_a,d_a)\) ja \((t_b,d_b)\), kun \(t_a<t<t_b\). Vaihtoehdot ovat

\[
d_{\rm linear}(t)=d_a+(d_b-d_a)\frac{t-t_a}{t_b-t_a},
\qquad d_{\rm previous}(t)=d_a,
\qquad d_{\rm next}(t)=d_b.
\]

Lineaarinen profiili on ajallinen keskivaihtoehto. `step/previous` siirtää muutoksen välin loppuun ja `step/next` alkuun. Myös laskevan sarjan kohdalla nämä nimet tarkoittavat ajoitusta; ne eivät ole yleisiä vaikutuksen ala- ja ylärajoja. Lähdepisteen täsmällisessä vuodessa kaikissa vaihtoehdoissa käytetään alkuperäistä arvoa.

Näitä kolmea käyrää ei kutsuta luottamusväliksi. Ne kattavat ilmoitetut ajoitusoletukset, eivät tuntematonta koko historiaa, lähteen mittausepävarmuutta tai biologista epävarmuutta. Muisti, baseline-erotus, suunnat ja ristiter­mit voivat myös muuttaa vaikutuskäyrien keskinäistä järjestystä.

## 5. Määrästä tai kuormituksesta potentiaalimoodiksi

Kutsuja muodostaa normalisoidun lähdesuureen esimerkiksi

\[
d_j(t)=\frac{D_j(t)}{D_{j,\rm ref}}.
\]

Vertailusuure, sen yksikkö, alue ja valintaperuste on säilytettävä metadatassa. Vertailumittakaava ei saa vaihtua huomaamatta näkymän alkuvuoden, maan tai zoomauksen mukana. Laitekanta, vuotuinen myynti ja energiavirta ovat eri suureita; niiden muunnokset perustellaan aineistokohtaisesti ennen tämän rajapinnan käyttöä.

Käyttäjä valitsee potentiaalimoodin amplitudisillan

\[
h(d)=d\quad\text{tai}\quad h(d)=\sqrt d,
\qquad p_j(t)=b_j h(d_j(t))\cos\theta_j.
\]

`profileTransform` valitsee nämä kaksi tapausta. Välivuoden lähdesuure interpoloidaan ensin, ja muunnos tehdään sen jälkeen. Esimerkiksi arvojen 1 ja 9 puolivälissä neliöjuurisilta antaa \(\sqrt5\), ei juurten aritmeettista keskiarvoa 2.

Lineaarinen vaihtoehto olettaa amplitudin seuraavan valittua lähdesuuretta. Neliöjuurivaihtoehto voi kuvata tapausta, jossa lähdesuure seuraa tehoa, varianssia tai toisistaan riippumattomien samanlaisten osalähteiden lukumäärää. Kumpikaan ei seuraa pelkästä teknologian nimestä. Vasta lähteen geometria, kuormitus, lähteiden väliset suhteet ja mittaukset voisivat identifioida muunnoksen paikalliseksi potentiaaliksi. Tässä \(b_j\) ja \(\theta_j\) ovat käyttäjän eksplisiittisiä skenaarioparametreja.

## 6. Täsmällinen projektio valittujen momenttioletusten sisällä

Skenaario käyttää normalisointia \(\kappa=1\), projektiota \(e=(0,1,0,0)\) ja taustaa \(A_0=(0,B,0,0)\). Lähteen keskiarvo-osuus on \(r\). Tehollisten moodien kovarianssiksi valitaan positiivisesti semidefiniitti perhe

\[
\operatorname{Cov}(a_j,a_k)
=(1-r^2)b_jh(d_j)b_kh(d_k)
[(1-c)\delta_{jk}+c]\,n_j\otimes n_k,
\qquad 0\le c\le1.
\]

Tällöin tensorisen erotuksen projektio on

\[
Q(t)=\mathbb E[e^\mu e^\nu\Delta g_{\mu\nu}]
=2Br\sum_jp_j+\sum_jp_j^2
+[r^2+(1-r^2)c]\sum_{j\ne k}p_jp_k.
\]

Ensimmäinen termi on taustan ristiter­mi, toinen lähteiden omat termit ja kolmas eri lähteiden ristiter­mit. Tämä tulos on täsmällinen **valittujen momentti-, mittakaava- ja projektio-oletusten sisällä**. Päällekkäisyys ei yksin merkitse keskimääräisten ristiter­mien syntymistä: kun \(r=c=0\), ne häviävät, mutta omat neliötermit säilyvät. \(c\) ei ole vuosittaisista laitetilastoista mitattu eri kantotaajuuksien vaihekoherenssi.

## 7. Muisti, baseline ja puuttuvan historian politiikka

Äärellinen tasapainoinen viiveydin on skenaariossa

\[
R(t)=\frac1{m+1}\sum_{\tau=\ell}^{\ell+m}Q(t-\tau),
\quad \Delta R(t)=R(t)-R(t_0),
\quad M(t)=e^{-\beta\Delta R(t)}.
\]

Myös näkyvää alkuvuotta edeltävä muisti-ikkuna lasketaan samoista lähdeprofiileista. Tuntematonta esihistoriaa ei peitetä automaattisella nollatäytöllä. Positiivinen \(\beta\) antaa positiiviselle \(\Delta R\):lle pienenevän kertoimen; negatiivinen \(\beta\) vastakkaisen vasteen. Baseline-kerroin on aina täsmälleen yksi. Ylivuotoa, alivuodosta syntyvää täsmällistä nollakerrointa tai ei-äärellistä prosenttia ei julkaista tuloksena.

```ts
const result = runBermAtlasScenarioDetailed(
  sources, parameters, from, to, baseline,
  { missingProfile: "error" },
);
```

Oletuspolitiikka `error` pysäyttää laskennan, jos aktiivisella lähteellä on puuttuva profiilivuosi tarvittavassa aikajaksossa. Käyttäjän erikseen valitsema `omit` laskee vain saatavilla olevan valitun osajoukon skenaarion. Puuttuva lähde ei silloin vaikuta laskelman summaan, mutta sen todellista amplitudia ei väitetä nollaksi. Muistiydintä ei renormalisoida puuttuvien vuosien perusteella.

Palautteen `coverage` sisältää politiikan, profiloitujen ja vanhaa ramppia käyttävien lähteiden tunnukset sekä vuosittaiset `availableProfileIds`, `missingProfileIds`, `interpolatedProfileIds` ja `assumedProfileIds`. `complete` on epätosi, jos tarvittava profiilituki puuttuu tai perustuu päätearvon pitoon. Tämä ei kuitenkaan ole biologisen tai fysikaalisen kattavuuden mitta; interpoloidut välivuodet ja vanhat ramppioletukset ovat erikseen näkyvissä.

Vanha `runBermAtlasScenario(...)` palauttaa edelleen pelkän numeerisen pistetaulukon ja hyväksyy saman vapaaehtoisen kuudennen argumentin. Uuden käyttöliittymän tulee säilyttää yksityiskohtaisen funktion peittometadata tulosten kanssa.

## 8. ASFR-ikäryhmistä skenaarion TFR:ään

Erillinen `applyBermScenarioToAsfr(asfrSeries, scenarioPoints, baselineYear, requiredAgeGroups?)` käyttää lähteestä tarkalleen baseline-vuodelta poimittuja ikäkohtaisia lukuja. Oletusikäryhmät ovat 15–19,…,45–49 ja yksikkö syntymää / 1 000 naista. Kertoimen oletetaan vaikuttavan samalla tavalla jokaiseen ikäryhmään, samalla kun lisääntymisen muu tila pidetään vakiona:

\[
\mathrm{ASFR}^{scen}_a(t)=\mathrm{ASFR}_a(t_0)M(t),
\qquad
\mathrm{TFR}^{scen}(t)=\sum_a\frac{w_a}{1000}\mathrm{ASFR}^{scen}_a(t).
\]

\(w_a\) on ikäryhmän vuosileveys. Koska sama \(M\) kerrotaan kaikille mukana oleville ikäryhmille, se voidaan viedä summan ulkopuolelle. Tätä vakioidun muun tilan sulkua ei soviteta myöhempiin havaittuihin TFR- tai ASFR-lukuihin. Sukupuolihormonien, reseptorien, parinmuodostuksen, käyttäytymisen ja lisääntymisen ajoituksen erillisiä siirtymiä se ei väitä mitatuiksi.

Puuttuva baseline-vuotinen ikäryhmä tuottaa kyseiselle ASFR:lle `null`-arvon ja koko TFR-summalle `null`-arvon. Muiden ikäryhmien tulokset säilyvät nähtävillä. Todellinen nolla säilyy nollana; puuttuvia ikiä ei skaalata muiden perusteella. Eri vuosia tai päällekkäisiä ikäryhmiä ei yhdistetä huomaamatta.

WPP:n erillinen julkaistu TFR-sarja säilyy omana lähdesuureenaan. Seitsemän 15–49-vuotiaiden ryhmän summa voi poiketa siitä lähteen ikätuen tai määritelmän vuoksi. Skenaarion vertailukelpoinen suhde muodostetaan saman ilmoitetun ikätuen sisällä.

## Tarkistukset

```sh
cd website
npm test -- lib/__tests__/berm-atlas-scenario.test.ts
npx eslint lib/berm-atlas-scenario.ts lib/__tests__/berm-atlas-scenario.test.ts
npm run typecheck
```

Testit kattavat tensoriprojektion omat ja ristiter­mit, etumerkit, viiveen ja muistin, ennen vuotta 1950 alkaneen lähteen myöhemmän kasvun, epäsäännölliset profiilipisteet, varhaisen ja myöhäisen askeltulkinnan, datakatkon ja toimintakatkon eron, tyhjän profiilin, yksittäisen ankkurin, eksplisiittisen päätearvon pidon, muistia edeltävän peiton, baseline-identiteetin sekä ASFR-summan yksiköt ja puuttuvuuden. Kenttäannosta tai todellista biologista vaikutuskerrointa nämä ohjelmistotestit eivät identifioi.
