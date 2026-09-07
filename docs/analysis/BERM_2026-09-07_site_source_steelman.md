# BERM: sivuston evidenssin rakentava integraatiokartta

Päiväys 7.9.2026. Rajattu osaraportti kattavaan steelman-analyysiin. Sivustoa tai mallikoodia ei muutettu. Tarkoitus on tunnistaa jo kerätyn evidenssin käyttöaste ja suurimman selityshyödyn tuottavat yhteydet; tämä ei ole vastaväite- tai falsifikaatioraportti.

## Lähtökohta

Lähtökohtana on vuoden 2025 Lindgren-muoto `g = eta + kappa A⊗A`. Jaolla `A=A_bio+a_ext` siitä seuraa `delta g=kappa(A_bio⊗a_ext+a_ext⊗A_bio+a_ext⊗a_ext)`. Biologiseksi vasteeksi ehdotetaan eksplisiittisesti `z_r(t)=∫K_r^{μν}(τ,S_r)delta g_{μν}(t−τ)dτ`. Tämän L2-operaattorin tunnistaminen on avoin; alempana tarkasteltu komponenttievidenssi antaa sen biologiselle toteutukselle argumentteja, välitiloja, aikaskaaloja ja mitattavia ulostuloja. BERM:n oma erityinen vahvuus tässä synteesissä on lähtötilan, ulkoisen kenttärakenteen ja biologisen vastaanottajan yhteisvaikutuksen eksplisiittinen mallintaminen.

Vahvin rakentava tulkinta on, että sivuston laaja aineisto voidaan järjestää **vastaanottajan tilan, signaalin vahvistumisen, verkkoajoituksen ja biologisen muistin** ympärille. Näiden avulla sama pieni alkuhäiriö voi näkyä eri kudoksissa eri päätepisteenä ja eri viiveellä. Tällainen yhteys on informatiivisempi kuin pelkkä uuden sairauden liittäminen samaan luetteloon.

## 1. Mitä aineistossa jo on

Luvut laskettiin suoraan työpuun tiedostoista 7.9.2026. Kanoniset viite-ID:t ratkaistiin `references_full.json`-tiedoston `aliases`-kentistä; TypeScript-evidenssitaulukon `referenceId`-kentät poimittiin vain `FIELDSTATE_EVIDENCE`-taulukosta.

| Kerros | Nykyinen koko | Merkitys integraatiolle |
|---|---:|---|
| Kanoninen bibliografia | 1 074 viitettä | Laaja hakupohja, ei sama kuin malliin jo kytketty evidenssi |
| `verified: true` | 403 | Rekisteriin tallennettu varmennusmerkintä |
| `link_status: verified` | 408 | Ulkoisen linkin tila; eri asia kuin sivukäyttö |
| `referenceUsage` | 676 viitettä, 1 649 viite–sivupaikkaa | Ohjelmallisesti löydetyt esiintymät |
| Käyttöindeksin ulkopuolella | 398 viitettä | Hakukohteita; ei väite täydellisestä käyttämättömyydestä |
| Rajattu evidenssitaulukko A | 34 tietuetta / 34 viitettä | Tutkimus → kausaalisolmu |
| Legacy-katalogi B | 150 tietuetta / 149 kanonista viitettä | Aiempi polkubibliografia |
| Väitteet | 28 | Kaikilla luonnostila |
| Kuratoidut evidenssirelaatiot C | 56 relaatiota / 32 viitettä | Tutkimus → nimetty väite |
| Evidenssillä suoraan kytketyt väitteet | 20 / 28 | Rakenteellinen jatkotyöpohja |
| Rekisteröidyt kokonaisreitit | 3 | Artikkeleiden rikas sisältö on tätä laajempi |
| A∪B∪C | 180 kanonista viitettä | 894 bibliografiaviitettä on näiden kolmen evidenssirekisterin ulkopuolella |

A∩B=3, A∩C=30, B∩C=4 ja A∩B∩C=2. A:n neljä viitettä, joilla ei ole C-relaatiota, ovat `sherrard2018`, `iuliis2009`, `catsper_2021` ja `cordelli2025_corrigendum`. Ensimmäiset kaksi ovat erityisen luontevia lisäankkureita CRY–redox- ja sperman mitoROS-ketjuihin. Relaation lisääminen tarkoittaisi jo käytetyn tutkimuksen kohdentamista täsmälliseen väitteeseen, ei uutta tutkimuslöytöä.

Viisi artikkelia muodostavat suuren päättelyvarannon. Eksplisiittisiä uniikkeja viite-ID:itä on Bee-artikkelissa 15, Implausibility-artikkelissa 12, Spectrum-artikkelissa 9 ja Dual Lock -artikkelissa 9. Thirteen Phenomena sisältää 35 lähdelistan kohtaa, mutta ei eksplisiittisiä `[[ref:...]]`-tunnuksia. Yhdessäkään viidestä artikkelista ei ole `ClaimRef`-ankkuria. Tämä tekee artikkelien ketjujen siirtämisestä yhteiseen claim–source–route-rakenteeseen suuren käytännön voimavaran.

**Laskentarajaus:** käyttöindeksi on lähdekoodia ja tuonteja seuraava hakemisto. Sen rakentaja käsittelee `app`, `components`, `lib` ja erikseen legacy-JSONin; se ei ole täydellinen luonnollisen kielen mainintojen indeksi eikä kaikkien datahakemistojen semanttinen inventaario. Thirteen Phenomena ei myöskään kuulu skriptin kiinteään artikkelireittikarttaan. Siksi tässä erotetaan *rekisterissä*, *mainittu*, *jo syntetisoitu* ja *nimetyksi mallireitiksi koottu*.

Paikalliset lähteet: `website/public/data/references_full.json:1`, `website/lib/referenceUsage.json:1`, `website/lib/evidence.ts:70`, `website/data/claims.json:4`, `website/scripts/build-reference-index.mjs:68`, `docs/evidence-registries.md:5`. Artikkelit: `website/app/[locale]/articles/[slug]/*Content.tsx`.

## 2. Kuuden ehdotetun lähteen todellinen uutuus

| Lähde | Käyttötila ennen tätä analyysiä | Täsmällinen lisäarvo |
|---|---|---|
| Lamia ym. 2011, [10.1038/nature10700](https://doi.org/10.1038/nature10700) | DOI:lle tai otsikkokäsitteelle ei löytynyt osumaa `berm`, `docs` ja `website` -tekstikorpuksesta; ei kanonisessa bibliografiassa | CRY:n ja glukokortikoidireseptorin suora yhteys; siirtää painoa hormonipitoisuudesta vastaanottajan herkkyyteen |
| Zhang ym. 2010, [10.1038/nm.2214](https://doi.org/10.1038/nm.2214) | Sama: uusi lähde tähän tarkistettuun korpukseen | CRY→Gsα/GPCR→cAMP→CREB/CRTC2→glukoosintuotto, eli suora reitti kellosta metaboliaan |
| Wang ym. 2012, [10.1126/science.1222826](https://doi.org/10.1126/science.1222826) | Sama: uusi lähde tähän tarkistettuun korpukseen | Redox-rytmin suora yhteys SCN-neuronin sähköiseen tilaan ja kellonaikaan sidottuun herkkyyteen |
| Kattnig ym. 2016, [10.1038/nchem.2447](https://doi.org/10.1038/nchem.2447) | Sama: uusi lähde tähän tarkistettuun korpukseen. Muita Kattnigin spin-relaksaatiotutkimuksia on jo taustadokumenteissa | Magneettisen primäärivasteen kemiallinen vahvistuminen ja nopean spinvaiheen erottaminen hitaasta kemiallisesta integraatiosta |
| Anastassiou ym. 2011, [10.1038/nn.2727](https://doi.org/10.1038/nn.2727) | **Jo lähdekartassa**: `berm/docs/berm-lindgren-first-source-map-v2.md:290`. Puuttuu sivustobibliografiasta | Ephaptisen solujen välisen kytkennän tuominen sivuston verkkoajoituksen selitykseen |
| Durant ym. 2017, [10.1016/j.bpj.2017.04.011](https://doi.org/10.1016/j.bpj.2017.04.011) | **Jo lähdekartoissa**: `berm/docs/berm-lindgren-first-source-map-v2.md:277` ja vanha source-map `:219`. Puuttuu sivustobibliografiasta | Bioelektrisen tilan pitkäkestoisen vaikutuksen liittäminen aktiivisesti kehitysmuistin malliin |

Uutuus tarkoittaa tässä tarkistettua projektikorpusta. Se ei tarkoita tieteellistä uutuusväitettä. Tarkistuksessa käytettiin DOI-, otsikko-, tekijä- ja ydinkäsitteiden hakuja. Kuudesta lähteestä siis neljä on uusia bibliografisia lisäyksiä korpukseen, kaksi on jo löydettyä mutta sivustossa alikäytettyä aineistoa.

## 3. Kahdeksan vahvinta yhdistämiskohtaa

### 3.1 CRY → glukokortikoidireseptorin herkkyys → hormonien yhteisvaikutus

**Tila:** uusi tarkka molekyyliyhteys, olemassa oleva HPA/HPG- ja Dual Lock -kehys.

Lamia ym. 2011 tunnistaa kryptokromien roolin glukokortikoidireseptorin rytmisessä repressiossa. Sivustolla CRY on ennen kaikkea magnetoreseptio–kello–melatoniini-solmu; Dual Lock painottaa testosteronin ja kortisolin pitoisuuksia. Niiden välille voi nyt lisätä vastaanottajakohtaisen operaattorin:

`CRY-tila ja vuorokausivaihe → GR:n transkriptiovaste → kudoksen glukokortikoidivaikutus`.

BERM-synteesissä toimiva muuttuja olisi `glukokortikoidivaikutus = f(vapaa hormoni, GR-tila, CRY-tila, vaihe)`. Tämä antaa mallille mahdollisuuden selittää eri kudosvasteita saman kortisoliarvon vallitessa ja yhdistää aiemmin erillisinä esiintyneitä kello-, stressi- ja aineenvaihduntareittejä. L2-ehdotuksen jälkeen CRY-tilaan kohdistuva häiriö voi vaikuttaa hormonin tuotantoon ja vastaanottoon samanaikaisesti.

**Varmemmin sanottava komponenttiväite:** kryptokromi osallistuu suoraan glukokortikoidireseptorin toiminnan vuorokausisäätelyyn. **Sivukohteet:** `/articles/dual-lock`, `/evidence/circadian`, `/evidence/walker-chain`, `/modulome`. Nykyankkurit: `DualLockArticleContent.tsx:13`, `causalMapData.ts:373`, `causal-graph.json:254`.

### 3.2 CRY → GPCR/cAMP → maksan glukoosintuotto

**Tila:** uusi spesifinen reitti; CRY:n ravintoriippuvuus on jo pitkälle syntetisoitu.

Zhang ym. 2010 osoitti CRY:n estävän GPCR-välitteistä cAMP-vastetta ja yhdisti tämän maksan glukoosintuottoon. CRY1:n yliekspressio paransi insuliiniherkkyyttä db/db-hiirissä. Sivuston ravitsemussivu yhdistää jo FAD:n, AMPK:n, CRY:n ja kalvo-orientaation (`nutrition/page.tsx:33`). Klimentidis-sivu puolestaan yhdistää BAT:n, insuliinidynamiikan ja HPA-akselin (`klimentidis-explained/page.tsx:36`). Näiden väliin sopii nyt paljon lyhyempi yhteys:

`ravinto/AMPK/FAD → CRY-tila → GPCR:n vastekerroin → cAMP/CREB → maksan glukoosintuotto → insuliinitarve ja metabolinen tila`.

**Varmemmin sanottava komponenttiväite:** CRY osallistuu suoraan hormonivasteen ja maksan glukoosintuoton säätelyyn. Näin BERM:n metabolinen haara ei riipu yksinomaan melatoniinin kautta kulkevasta pitkästä ketjusta. Solmu `GPCR_ADENOSINE` on jo olemassa (`causal-graph.json:586`), mutta CRY–Gsα-mekanismi kannattaa kirjata omaksi GPCR-toteutuksekseen.

### 3.3 Redox → SCN:n sähköinen tila → ajallinen koordinointi

**Tila:** uusi tarkka lähde ja yhdistävä pala; redox, vuorokausi ja kentän vaihe ovat jo erikseen mallissa.

Wang ym. 2012 yhdistää SCN:n redox-rytmin neuronien eksitabiliteettiin. Kemiallinen hapetus ja pelkistys muuttivat kalvopotentiaalia vastakkaisiin suuntiin; vaste riippui vuorokausivaiheesta. Tämän avulla sivuston `ROS/redox` ja `clock` eivät ole vain saman ylävirran kaksi päätepistettä, vaan ne voidaan yhdistää palautuvaksi säätösilmukaksi.

`L2-vaste → redox-välitila → SCN:n kalvopotentiaali ja ajoitus → hormonaalinen rytmi → redox- ja metabolinen tila`.

Tämä antaa konkreettisen biologisen tulkinnan jo ehdotetulle `K(τ,S)`-ytimen vaiheargumentille. Se yhdistää Cao 2015:n kellonaikaan sidotun RF/redox-tietueen (`evidence.ts:168`), Rosenspiren metaboliset vaihevasteet ja nukkumisen alavirran vaikutukset. **Varmemmin sanottava väite:** redox-tila voi suoraan muuttaa keskuskellon neuronien sähköistä toimintaa; redox on siten myös ajoitussignaali. **Sivukohteet:** `/evidence/circadian`, `/evidence/walker-chain`, `/evidence/replication`.

### 3.4 Nopea spinvaikutus → hidas kemiallinen vahvistus → solun vaste

**Tila:** uusi vahvistumista koskeva lähde; CRY/RPM- ja koherenssiaikasynteesi on jo olemassa.

Kattnig ym. 2016 osoitti, että jatkuvassa valoärsykkeessä hitaat radikaalien terminaatioreaktiot voivat vahvistaa flavinin primääristä magneettivastetta. Tutkituissa järjestelmissä vahvistus oli enimmillään 5,6-kertainen alle 1 mT:n kentissä. [Primäärijulkaisu](https://pubmed.ncbi.nlm.nih.gov/27001735/).

Integraation arvo on aikaskaalojen erottaminen: `spinvalinta → kemiallinen tuottojakauma → hidas tuotteiden kertyminen → redox/ionikanava-ulostulo`. Mikrosekuntiluokan spindynamiikan rinnalle saadaan kokeellisesti perusteltu hitaampi havaintoikkuna. Samalla ravitsemus ja redoxreservi voivat vaikuttaa sekä reseptorin tilaan että tuotetun signaalin vahvistukseen. Tämä täydentää 3.9. synteesin koherenssi- ja vaiheargumentteja, eikä korvaa niitä.

**Varmemmin sanottava komponenttiväite:** pieni primäärinen magneettinen reaktiovaikutus voi vahvistua kemiallisen reaktioverkon kautta. **Sivukohteet:** `/articles/implausibility`, `/evidence/magnetoreception`, `/evidence/nutrition`. Malliin sopivat erilliset `spin_lifetime`, `chemical_integration_time` ja `readout_gain`.

### 3.5 Yksittäissolun pieni muutos → yhteinen verkkoajoitus

**Tila:** lähde jo löydetty; verkon vahvistus jo ehdotettu 3.9. synteesissä. Nyt alikäytetty sivustointegraatio.

Anastassiou 2011:n ephaptinen kytkentä, Fröhlich–McCormick 2010:n endogeeniset kentät ja Reato 2010:n heikon kentän verkkoajoitus voidaan tuoda yhdeksi mekanistiseksi kokonaisuudeksi. Reato on jo synteesin F-18 (`berm-cap-closure-and-model-extension-synthesis.md:517`), jossa ehdotetaan `network_gain(state)`.

Rakentava jatko on määritellä yhteisön ajallinen järjestys esimerkiksi `R=|N⁻¹Σexp(iφ_j)|`. BERM:n geometrinen ristitermi kytketään L2-ehdotuksessa solun vasteeseen, ja L3-verkkotaso kertoo, miten pieni solumuutos vaikuttaa vaiheiden keskittymiseen. Näin keskimääräinen hormonipitoisuus tai solun amplitudi voi pysyä lähellä ennallaan samalla kun ajallinen yhteensopivuus muuttuu.

**Varmemmin sanottava komponenttiväite:** endogeeniset sähkökentät ja verkon tila voivat osallistua neuronipopulaation ajoitukseen. **Sivukohteet:** `/evidence/circadian`, `/evidence/neurological-spectrum`, `/articles/implausibility`. Uusi työ on biologisten ajoitusasteiden eksplisiittinen yhdistäminen, ei ephaptisen tutkimuksen uudelleenlöytäminen.

### 3.6 Bioelektrinen tila → pitkäkestoinen kehitysmuisti

**Tila:** Durant 2017 on jo lähdekartassa; kehitysmuisti on jo mallisolmu. Niiden välinen näyttöketju on alikäytetty.

Durantin tutkimus antaa kokeellisen ankkurin sille, että bioelektristen gradienttien muuttaminen voi vaikuttaa regeneratiivisen anatomian myöhempään tilaan. Sempou 2022 antaa lisääntymisbiologiaan läheisemmän Vmem→mTOR→spermatogonisen erilaistumisen komponentin (`berm-scientific-evidence-source-atlas.md:95`). Prenataali- ja neonataalivaiheen munasarjatietueet taas ovat jo rajatussa rekisterissä (`evidence.ts:408`).

Yhdistävä rakenne on `h_r(t+1)=F(h_r(t),z_r(t),kehitysvaihe)`, missä `h_r` kuvaa säilyvää kudostilaa; aikuisvaste riippuu nykyisestä ärsykkeestä ja tästä historiasta. BERM voi tällöin kuvata **nopean toiminnallisen muutoksen, hitaasti palautuvan reservimuutoksen ja säilyvän kehityksellisen uudelleenjärjestymisen** erillisinä prosesseina. Tämä tekee viiveistä biologisia muuttujia.

**Varmemmin sanottava komponenttiväite:** bioelektrinen tila voi ohjata pitkäkestoisia kehitys- ja kudosratkaisuja. **Sivukohteet:** `/evidence/reproductive-arc`, `/evidence/epigenetic-legacy`, `/evidence/infant-vulnerability`; olemassa olevat solmut `VMEM_MTOR` ja `BIOELECTRIC_DEVELOPMENT` (`causal-graph.json:209`, `:233`).

### 3.7 Lisääntymisen ketju voidaan koota interventioankkureista

**Tila:** vahvat komponentit jo rekisteröity; lisäarvo on reittitason kokoamisessa.

Liu 2014:n solukohtainen Bmal1-muutos kiinnittyy jo munasarjan steroidogeneesiin ja implantaatioon; He 2016:n melatoniini/redox-manipulaatio munasolun mitokondrioihin; Meena 2014:n melatoniinihaara RF-protokollan lisääntymismittareihin; Yu 2020:n Spock3-pelastus BTB-reittiin. Niitä ei tarvitse esitellä uusina löydöksinä. Ne ovat `evidence.ts:231`, `:247`, `:311`, `:327`, ja useat jo `claims.json`-relaatioina.

Niiden yhteinen vahvuus on **mekanistinen paikannus**: pelkkien loppupistemuutosten sijaan nähdään, että biologisen ketjun tunnistettuja välivaiheita muokkaamalla voidaan muuttaa seuraavaa päätepistettä. Reittikortti voi esittää rinnakkain `kello→progesteroni→implantaatio`, `redox→mitokondrio→gameetin toiminta` ja `BTB→spermatogeneesin ylläpito`.

**Varmemmin sanottava väite:** useat BERM:n nimeämät lisääntymisen biologiset välivaiheet ovat kokeellisesti muokattavia syytekijöitä omissa järjestelmissään. Tämä on jo olemassa olevan evidenssin vahvinta ainesta. **Sivukohteet:** `/evidence/reproductive-arc`, `/evidence/unbroken-chain`, `/evidence/pharmacology`; nimettyjen reittien kasvattaminen kolmesta nykyistä aineistoa vastaavaksi tekee hyödyn näkyväksi.

### 3.8 Ekologinen mekanismi: kohtaaminen × ravinto × puolustus × populaatiokasvu

**Tila:** idea on jo Bee-artikkelissa ja synteesin F-40–F-42:ssa. Alikäytetty mahdollisuus on yhteisen populaatio-operaattorin rakentaminen.

Sivustolla on jo erillisiä komponentteja staattisen sähkön vaikutuksesta loisen kohtaamiseen, kukkien sähköisestä aistimisesta, kukille laskeutumisesta, käyttäytymisestä ja lisääntymisestä. Malliin voi kirjoittaa `λ_colony = tuotanto(ravinto,kuningatar,hoito) − menetykset(loiskuorma,virukset,ikäjakauma)` ja `dP/dt = kohtaamisnopeus × tarttuminen × lisääntyminen − poistuma(grooming,hygienia)`. Sama fysikaalinen muutos voi vaikuttaa useampaan näistä kertoimista.

Tällainen rakenne selittää, miksi toiminnalliset muutokset voivat ennakoida kuolleisuutta ja miksi pieni muutos useassa prosessissa voi tuottaa suuren pesätason seurauksen. Se on BERM:n yhteisvaikutuslogiikan vahva sovellus. Yhden eläimen mittari ja kokonaisen pesän kehitys yhdistyvät eksplisiittisesti.

**Varmemmin sanottava komponenttiväite:** sähköinen ympäristö osallistuu jo mitattuihin ekologisiin kohtaamis- ja käyttäytymisprosesseihin. **Sivukohteet:** `/articles/bees`, `/evidence/ecology`, `/evidence/reproductive-navigation`. Ankkurit: `evidence.ts:519`, `:551`, `:599`; `BeeArticleContent.tsx:20`, `:31`; 3.9. synteesi `:798`.

## 4. Mitä ei pidä myydä uutena

3.9. synteesi sisältää jo tausta×taajuus-, kulma-, pulssimuoto-, koherenssi-, metabolinen vaihe-, vuorokausivaihe-, agonisti-, metalli-, valo×magneettikenttä-, TheraBionic- ja TTFields-akselit (`berm-cap-closure-and-model-extension-synthesis.md:960`). Nutrition-sivulla on jo FAD–CRY–AMPK–kalvo-orientaatio-synteesi. Walker-sivu kokoaa jo unesta hormonitoimintaan johtavan ketjun. Bioelektrisyys, kehitysmuisti ja lisääntymisen multiplikatiivinen rakenne ovat jo mallin osia.

Tämän analyysin uusia lisäarvoja ovat ennen kaikkea **CRY:n suorat GR- ja GPCR-yhteydet, redoxin ja keskuskellon sähköisen toiminnan suora kytkentä sekä kemiallisen vahvistuksen aikaskaala**. Aiemmin löydetystä aineistosta saatava lisäarvo syntyy verkkoajoituksen, pysyvän kudostilan, interventioiden ja ekologisen populaatiodynamiikan paremmasta yhdistämisestä.

Pääanalyysin rinnakkaistarkistus täsmentää lisäksi vuoden 2026 lähteitä: Meng 2026 (`10.1038/s41587-026-03158-5`) on jo `source-map-v2.md:306`; Kim 2026 on jo kanonisella ID:llä `kim2026_cell_gene_switch` sekä laitesivulla ja kausaalikartassa. Niiden mahdollinen uusi käyttötapa on rytmisen Ca²⁺-dynamiikan liittäminen ajalliseen dekoodaukseen ja geenien ulostuloon, esimerkiksi GnRH/GR-pulssisignaalien rinnalle. Niitä ei lasketa tässä uusiksi bibliografisiksi löydöiksi.

## 5. Konkreettinen integraatiojärjestys

1. Kootaan CRY:stä yksi vastaanottajatilaa kuvaava sivu: `FAD/AMPK/kalvot → CRY → GR + GPCR/cAMP + kello/redox`. Tämä yhdistää nutrition-, circadian-, Dual Lock- ja Klimentidis-aineiston lyhyillä, lähteistetyillä molekyylireiteillä.
2. Jaetaan vasteen aikaskaalat näkyvästi: spin/kanava → kemiallinen integraatio → verkon vaihe → hormonirytmi → reservi/muisti → populaatio. Kattnig, Wang, Reato/Anastassiou ja Durant toimivat eri asteiden ankkureina.
3. Rakennetaan lisääntymisen reittikortit olemassa olevista geneettisistä ja pelastusinterventioista. Jokainen kuvaa oman välivaiheensa ja sen seuraavan ulostulon.
4. Muutetaan artikkelien 13 ilmiötä yhteisten välitilojen taulukoksi: mitä sama CRY/GR/cAMP/redox/verkkoajoitus-muutos voisi tuottaa eri kudoksissa ja mikä jo käytetty primaaritutkimus tukee kutakin väliaskelta.
5. Tuodaan jo lähdekartassa olevat Anastassiou ja Durant kanoniseen bibliografiaan; lisätään neljä uutta lähdettä; liitetään artikkelien reitit samoihin väite-ID:ihin.

Tuotannon edustava tarkistus tehtiin 7.9.2026 sivuille [Thirteen Phenomena](https://www.extinctionfield.com/en/articles/thirteen-phenomena), [Replication](https://www.extinctionfield.com/en/evidence/replication) ja [Counter-Evidence](https://www.extinctionfield.com/en/evidence/counter-evidence). Thirteen Phenomena esittää yhä 13 ilmiön synteesin, joten edellä ehdotettu yhteisten välitilojen rakenne kohdistuu myös julkisesti näkyvään aineistoon. Tämä oli edustava tarkistus, ei kaikkien sivujen renderöintiauditointi.
