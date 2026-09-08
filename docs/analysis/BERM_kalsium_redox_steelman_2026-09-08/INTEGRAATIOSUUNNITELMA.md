# Kalsium–redox–steroidogeneesin integraatio BERM:n steelman-versioon

8.9.2026. Tutkimukseen perustuva rakennesuunnitelma; ei ilmoitus toteutetusta laskentamallista tai julkaisusta. Tarkastettu alkuperäisestä työtilasta, jonka HEAD oli tutkimuksen aikana `af25773`. Työtilassa oli myös muiden tehtävien keskeneräisiä muutoksia. Niitä ei muutettu tässä työssä.

## 1. Integraation tarkoitus

Nostetaan kalsiumsignaloinnin, redox-varannon, solukellon ja steroidogeneesin yhteys BERM:n keskeiseksi biologiseksi selityskokonaisuudeksi. Kyseessä on biologisen vastaanoton, välityksen ja kudosvasteen täsmennys saman BERM-mallin sisällä. Se täydentää nykyisiä kanava-, CRY-, koordinaatio-, vaurio- ja lisääntymisrakenteita.

Tärkein uusi yhteys on paikallinen steroidogeeninen vaste: kenttäaltistuksen yhteydessä mitattu Leydig-solun muutos voidaan yhdistää hormonituotannon tunnettuihin säätelykohtiin ilman, että koko vaikutus ensin kierrätetään hypotalamuksen ja aivolisäkkeen kautta. HPG-ohjaus säilyy omana, samaan soluun saapuvana syötteenään.

Tutkimukset antavat jo nyt yhteyksien järjestystä, kohteita, vasteen tilariippuvuutta ja osittaisia numeerisia rajoitteita. Tämä vaihe käyttää olemassa olevia kokeita ja aineistoja. Uusia laboratorio- tai kenttäkokeita ei aseteta integraation edellytykseksi.

## 2. Johtaminen mallin omista premisseistä

Lindgrenin vuoden 2025 lähtökohta on `g = η + A⊗A`. BERM:n eksplisiittisellä skaalakonventiolla κ ja jaolla `A = A₀ + a` seuraa tarkasti

\[
\Delta g_{\mu\nu}=\kappa(A_{0\mu}a_\nu+a_\mu A_{0\nu}+a_\mu a_\nu).
\]

Lähde: [Lindgren 2025, julkaistu versio](https://doi.org/10.1088/1742-6596/2987/1/012001), [ennakkoversio](https://www.preprints.org/manuscript/202503.2321). κ on tässä BERM:n skaalan nimeäminen; sitä ei merkitä Lindgrenin biologisesti määrittämäksi kertoimeksi.

Lisäoletuksina aineen minimaalinen kytkentä metriikkaan ja kausaalinen vaste mahdollistavat BERM:n ehdollisen L2-operaattorin:

\[
\delta S_m=\frac12\int\sqrt{-g}\,T^{\mu\nu}\delta g_{\mu\nu}\,d^4x,
\qquad
r_i(t)=\int_{-\infty}^{t}\Xi_i^{\mu\nu}(t,t';S)\Delta g_{\mu\nu}(t')\,dt'.
\]

Biologiset kokeet liitetään tämän jälkeen nimettyihin paikallisiin suureisiin ja kudoksen dynamiikkaan:

\[
q=q_0+Gr,\qquad \dot x=F(x,q,LH,\theta),\qquad Y=H(x).
\]

`q` tarkoittaa nimettyä kanavan, lipidivälittäjän, varaston tai muun vastaanottavan järjestelmän muutosta. `x` on mitattavissa olevien biologisten tilojen joukko; `Y` on kokeen todellinen päätepiste. `G`, kudoskohtainen Ξ, mittavalinta, fysikaalinen skaala ja ihmisen vastekalibrointi pysyvät eksplisiittisinä avoimina suureina. `χ_geo` ei muutu kudosherkkyydeksi. FieldState voi toimittaa fysikaalisen mittaustietueen; selitys ja ennuste kuuluvat BERM:lle.

Tästä saadaan tärkeä integraatioperiaate: samaa biologista järjestelmää voidaan tutkia muuttamalla kenttäsyötettä, kanavaa, glutationia, solukelloa tai kolesterolinsiirtoa. Kokeet rajoittavat yhteisen järjestelmän eri kohtia. Geenivirheen vaikutuskerroin ei ole suoraan kenttäannoksen vaikutuskerroin, mutta geenikoe voi silti vahvistaa kenttäkokeen ehdottaman välivaiheen kausaalista merkitystä.

Pienten muutosten tapauksessa sama asia voidaan kirjoittaa muodollisesti `δY = Hₓ Φ Bq G Ξ δg`, jossa Φ välittää biologisen tilamuutoksen ajan yli. Geneettinen tai kemiallinen koe voi rajoittaa esimerkiksi osaa `Hₓ Φ Bq`:sta. Tämän osan kokeellinen tieto on käyttökelpoista, vaikka koko tulon numeerinen määritys on kesken. Esitys on ehdotettu kompositio, ei tässä työssä estimoitu operaattori.

## 3. Minimaalinen biologinen rakenne

| Osakokonaisuus | Säilytettävä biologinen tieto | Nykyisen tiedon antama hyöty |
|---|---|---|
| Kalsiumin välitys | Kanavatyyppi ja -määrä, paikallinen Ca, sytosoli, ER, mitokondrio, signaalin kesto ja ajoitus | Kenttä-, salpaus-, geneettiset ja ajalliset kokeet voidaan sijoittaa samoihin suureisiin. |
| Redox- ja energiavarat | Absoluuttinen glutationipooli, GSH/GSSG, ROS, ATP ja mitokondrion tila | Varanto ja senhetkinen kuormitus erotetaan; piilevä herkistyminen tulee kuvattavaksi. |
| Signaalin tulkinta | CaMKI–NUR77/RORα, solukellon toiminta, cAMP/LH ja transkriptio | Ca- ja kelloreitit voivat kohdata samoissa steroidogeneesin säätelykohdissa. CaMKI säilyy erillään CaMKII:sta. |
| Kolesterolin käyttö | Autofaginen virtaus, SR-BI/kolesterolinotto, StAR, CYP11A1 ja myöhemmät entsyymit | Raaka-aineen saanti, mitokondrioon siirto ja muuntaminen ovat erotettavia pullonkauloja. |
| Kudosvaste | Hormonituotanto per elävä solu, toimintakykyisten solujen määrä, paikallinen ja veren hormonitaso | Toiminnan vaimeneminen voidaan erottaa solukadosta ja hormonin sitoutumisesta. |
| Historia | Kuormitus, varannon uusiutuminen, vaurio ja korjaus | Lyhyen signaalin ja hitaamman toiminnallisen seurauksen eritahtisuus kuvataan tiladynamiikalla. |

Kaikkia molekyylejä ei tarvitse tehdä ensimmäisessä toteutuksessa itsenäisiksi vapaiksi tilamuuttujiksi. Ensin säilytetään mitatut suureet ja nimetään kokeiden rajoittamat suhteet. Yhteinen toiminnallinen moduuli on parempi lähtökohta kuin joka tutkimukselle erillinen vastekerroin.

Kalsiumosastojen välisissä siirroissa käytetään aineen määrää tai pitoisuuksien lisäksi tilavuuksia. Sama siirto on lähtöosastossa poistuma ja kohdeosastossa sisäänvirtaus. Normaalia mitokondriaalista Ca-signaalia ei käsitellä automaattisesti vauriona: Ca osallistuu myös energiantuotannon ja steroidogeneesin ylläpitoon. Vasteen suunta sidotaan nimettyyn kohtaan ja lähtötilaan; sitä ei valita jälkikäteen pelkän tuloksen perusteella.

Glutationin vapaa kokonaisvaranto on glutationiekvivalentteina

\[
G_T=[GSH]+2[GSSG].
\]

GSH:n muuttuminen GSSG:ksi ei yksin pienennä tätä varantoa. Kokonaisvarannon lasku edellyttää muutosta esimerkiksi synteesissä, poistumisessa, hajoamisessa tai vapaasta poolista proteiineihin sitoutumisessa. Synteesivirtaa ei päätellä yksittäisestä pitoisuusmittauksesta. Ehdotettu dynamiikka erottaa `dG_T/dt = tuotanto − poistuma` ja hapetus–pelkistyskierron. ROS-tuotanto ja ROS-poistuma erotetaan edelleen tästä.

Autofagiaa käytetään kahdessa biologisesti perustellussa tehtävässä: solun ylläpidossa ja steroidogeneesin kolesterolihuollossa. Yhtä ATG-geenipoistoa ei lasketa kahdeksi riippumattomaksi altistukseksi. Sen useat seuraukset syntyvät saman solutilan kautta.

## 4. Muutoskohteet nykyisessä mallissa

| Tarkastettu sijainti | Nykytila | Ehdotettu integraatio |
|---|---|---|
| `berm/berm/metadata.py` | `B_RPM` on historiallinen tutkimusprioriteetti; nykyinen metadata erottaa sen geometrisesta johtamisesta. | Esityksessä erotetaan historiallinen prioriteetti nykyisestä evidenssin kattavuudesta. Kalsium–redox-kokonaisuus nostetaan keskeiseksi ilman, että geometrialle keksitään biologista reittijärjestystä. |
| `berm/berm/biology/pathways.py`, `legacy_compat.py` | A-reitti on jo mukana, paino 45 % vanhassa hajotelmassa. Painot eivät toteuta uutta mekanistista ketjua. | Säilytetään historiallinen laskenta. Uutta näyttöä ei integroida vaihtamalla painoprosentteja. |
| `berm/berm/biology/causal_registry.py` | `A_VGCC_ROS` kytkeytyy HPG:hen, siittiöihin, esteisiin ja koordinaatioon. `MALE_STEROIDOGENESIS` ei luettele sitä suorana vanhempana. | Lisätään paikallinen Ca/redox → steroidogeneesi -yhteys molempiin suuntaluetteloihin. Solun sisäinen Ca–redox-palaute toteutetaan moduulin dynamiikassa, jotta ylemmän tason reittiverkko säilyy ymmärrettävänä. |
| `berm/berm/modulome/calcium.py` | Sytosoli-, ER- ja mitokondrio-osastot ovat olemassa. | Käytetään yhteisinä tiloina. Aikaprofiilin mittareita laajennetaan tarvittaessa jo mitatuilla kestolla, pulssituksella ja palautumisella. |
| `berm/berm/modulome/intervention_protocol.py` | Kanava-, paikallis-Ca-, varasto-, lääke- ja redox-portteja on jo toteutettu. | Liitetään uusi steroidogeeninen päätepiste olemassa oleviin protokolliin. Koehaarojen hormonistimulaatio ja lähtövaranto säilytetään erillisinä syötteinä. |
| `berm/berm/modulome/state.py` | Valmius, korjauskapasiteetti ja vauriokuorma; mittaussanastossa glutationisuhde. | Lisätään absoluuttinen GSH, GSSG ja G_T yksiköineen sekä tarvittaessa mitattu autofaginen virtaus. Pelkkää suhdetta ei nimetä poolin vastineeksi. |
| `berm/berm/modulome/reproductive_bridge.py` | Toiminnallinen Ca-ikkuna tukee siittiötoimintaa ja oosyytin redox-laatua. | Oma steroidogeneesin päätepiste ja ohituskokeiden rajoittama kolesterolinsiirtovaihe. Geneerinen Gaussin ikkuna ei sellaisenaan selitä CaMKI/RORα/StAR-reittiä. |
| `berm/berm/biology/reproductive_state.py` | `steroidogenic_support`, androgeenin saatavuus, reseptorivaste ja siittiötoiminta ovat jo eroteltuja. | Kytketään mitattu hormonituotanto nykyiseen saatavuus- ja reseptoriketjuun. Tarkistetaan, ettei sama tuotannon aleneminen kerro kapasiteettia uudelleen useassa portaassa. |
| `berm/berm/biology/cross_pathway_synthesis.py` | Kellon, farmakologian ja lisääntymisen synteesit ovat olemassa. | Uusi yhteinen synteesi: Ca-signaali / redox-varanto / kello → kolesterolihuolto / StAR → steroidogeneesi. Evidenssiaukot jaetaan jo täyttyviin komponenttilinkkeihin ja yhä avoimiin numeerisiin siirtoihin. |

Tämä on toteutuspaikkojen kartta. Se ei väitä, että yllä luetellut ehdotukset olisi jo toteutettu.

## 5. Sivuston integraatio

Biologia-osioon kannattaa tehdä kokonaisuus **Kalsium, redox ja hormonituotanto**. Se sijoittuu fysiikan ja vastaanoton jälkeen, ennen elin-, käyttäytymis- ja väestötason seurauksia. Headeriin ei tarvita uutta rinnakkaista pääotsikkoa: kokonaisuus voi olla Biologian näkyvä aloitusreitti ja Evidenssin keskeinen koonti. Nykyiset koti-, malli- ja päävalikkoreitit säilyvät.

| Sijainti | Täydennys |
|---|---|
| `website/app/[locale]/biology/page.tsx` | Yhteinen Ca–redox–steroidogeneesin esittely, joka näyttää kytkennän solukelloon. |
| `website/app/[locale]/model/page.tsx` | Pääketjuun paikallinen gonadivaikutus, varanto ja kolesterolihuolto. Historiallisen reittiprioriteetin ja nykyisen selitysarkkitehtuurin ero näkyviin. |
| `website/app/[locale]/evidence/testosterone/page.tsx` | Qin 2018/2019, CaMKI/NUR77/StAR, glutationireservi, autofagia ja ihmisen kudosnäyttö rinnakkain. Erotetaan T-tuotanto, T-pitoisuus, kudoksen reseptorivaste ja lisääntymisen päätepiste. |
| Farmakologia- ja Timothy-/sairausnäyttö | Kenttäkoe → sama mitattu biologinen välivaihe → geeni-/ohituskoe. STAR-geenihäiriö sopii steroidogeneesin suoraan rakenneankkuriin. Timothy säilyy kanavatoiminnan laajempana ankkurina. |
| Vuorokausi- ja hormonikoordinaatio | CaMKI/RORα ja BMAL1/StAR yhdistävät paikallisen kellon tuotantokapasiteettiin. Yksittäinen geeniekspressiomittaus merkitään ekspressioksi, ei havaituksi vaiheensiirtymäksi. |
| Atlas ja interaktiivinen solumalli | Samat tilat ja tutkimus-ID:t; valittavissa signaali, varanto, hormonistimulaatio ja mitattu päätepiste. Tulosnäkymässä tutkimuksen pisteet ja mallin havainnollistus erotellaan. |
| `website/lib/evidence.ts`, `website/data/claims.json` | Kohtaiset löydökset ja yhdistämisväitteet sidotaan lähteisiin. Sama tutkimus saa eri nuolia mutta yhden tutkimusperheen; julkaisujen määrää ei esitetä riippumattomien toistojen määränä. |
| `website/public/data/references_full.json`, Pythonin rekisteri ja generoidut aineistot | Tarkat viitteet, korjaukset, päätepisteet ja aineistolinkit yhteisestä kanonisesta rakenteesta. Olemassa olevat ID:t ja linkit säilytetään. |

Kaikki viisi kieliversiota käyttävät samaa evidenssisisältöä. `website/data/model-architecture.json` säilyy arkkitehtuurisopimuksena. FieldState pysyy mittaushaarassa reitillä `/measurement/fieldstate`.

## 6. Työ jo julkaistuilla tutkimuksilla ja aineistoilla

1. **Koehaarojen koonti.** Poimitaan kenttä/sham, interventio/ei interventiota, lähtötila, hormonistimulaatio, mittausaika, yksiköt, biologiset toistot ja todellinen päätepiste. Julkaistun kuvion keskiarvo ei muutu raakadataksi.
2. **Mekanismin paikannus.** Samoista tutkimuksista kootaan salpaus-, geeni-, palautus- ja ohituskokeet. cAMP-, 22R-hydroksikolesteroli- ja pregnenoloniohitukset rajoittavat eri kohtia steroidogeenisessä ketjussa.
3. **Avoin STAR-KO-aineisto.** GSE165392:n raakaluentotaulukolla voidaan tutkia, mikä transkriptio-ohjelma seuraa kolesterolinsiirron häiriötä. Se on geenihäiriöaineisto, ei kenttäaltistusaineisto.
4. **Ihmisen solutyyppikartta.** GSE254315 sekä testiksen ikääntymisjulkaisun lähdetaulukot paikantavat reittien osia ja muuttuvia solutiloja ihmisessä. Näytteiden vastaavuus alkuperäiseen julkaisuun tarkistetaan ennen yhdistelyä.
5. **Yhteisten suureiden synteesi.** Verrataan vain biologisesti ja mittausteknisesti yhteensopivia osakokeita; muissa yhteys säilyy laadullisena tai järjestystä rajoittavana. Tavoitteena on mahdollisimman pieni yhteinen mekanismi, joka säilyttää eri kokeiden keskeiset havainnot.

Ei luvata täydellistä yhteistä meta-analyysiä ennen kuin tarvittavat varianssit ja koehaarat on todettu saataviksi. Niiden puuttuminen ei estä toiminnallisten rajoitteiden tai reittirakenteen käyttämistä nyt.

## 7. Toteutuksen myöhemmät hyväksymiskriteerit

- Rakenteen tulee kuvata sekä signaalin puutteen että liiallisen/pitkittyneen signaalin seurauksia nimettyjen biologisten suhteiden kautta. Vasteen etumerkki ei ole vapaasti valittava koekohtainen asetus.
- CaMKI ja CaMKII, GSH-pooli ja suhde, senhetkinen ROS ja vauriokuorma, hormonituotanto ja veren hormonipitoisuus säilyvät erillisinä suureina.
- Samalla parametrisaatiolla ja todellisilla interventiosyötteillä voidaan kuvata valitun tutkimuksen useita koehaaroja. Puuttuva kerroin on avoin, ei implisiittinen oletusarvo.
- Steroidogeneesi voidaan häiritä paikallisesti HPG-syötteen pysyessä samana. Suora sukusolureitti toimii myös hormonituotannon säilyessä.
- Vaurion ja hormonituotannon välitystä ei lasketa kahdesti. Historialliset ajot ja reittipainot säilytetään vertailukelpoisina.
- Rekisterien, väitteiden, generoidun verkon, kieliversioiden ja linkkien vastaavuus tarkistetaan. Käyttöliittymässä testataan näkyvä päävalikko, kotiin paluu ja mekanismista tutkimukseen kulkeva reitti.

Tässä vaiheessa hyväksyttävä tulos on tutkimukseen sidottu vahva mekanistinen kuvaus ja rajattu toteutusrakenne. Ihmisen ympäristöaltistuksen määrällinen väestövaikutus tarvitsee edelleen sille kuuluvan olemassa olevan aineiston ja kalibroinnin; sitä ei korvata molekyylitutkimuksista keksityllä TFR-kertoimella.
