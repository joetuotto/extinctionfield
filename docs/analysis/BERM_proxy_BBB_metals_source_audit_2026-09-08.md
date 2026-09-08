# RF, veri-aivoeste ja metallit proxy masking -selityksessä

Tarkistettu 8.9.2026. Rajattu alkuperäislähteiden auditointi ja kausaalinen synteesi. Lähtönä nykyinen `website/public/data/references_full.json`, aiempi [raskasmetallimuistio](BERM_proxy_masking_lisat_2026-09-08/heavy_metals.md) ja käyttäjän vaatimus koostaa osatuloksista paras perusteltu mekanismi. Jatko-ohjeen perusteella lähderekisteriin lisättiin neljä primääriä ja korjattiin Cosquer-paikkamerkki. Verkkosivun koodia tai claim-rekisteriä ei muutettu.

## 1. Mitä esimerkki selittää myönteisesti

**Metallipitoisuus ei yksin ole täydellinen selittäjä, koska haittaan vaikuttaa myös se, missä muodossa metalli kulkee, kuinka paljon sitä pääsee kohdekudokseen ja miten kudos reagoi.** BERM:n kenttähaara voi tehdä tämän riippuvuuden näkyväksi: kenttä ja vastaanottava tila voivat osallistua kuljetuksen tai toksisen vasteen säätelyyn. Tällöin metallin ja haitan välinen yhteys voi olla todellinen, vaikka pelkkä metalliselitys jättäisi yhden kausaalisen ehdon nimeämättä.

Koosteella on kolme kokeellista ankkuria: RF:n vaikutus verisuoniendoteeliin/BBB-merkkiaineisiin tietyissä eläinasetelmissa; metallimuotokohtaisen kuljetuksen vaikutus aivoihinottoon; ja kenttä–metalli-yhteisaltistusten vaikutukset toksisiin päätemuuttujiin. Ankkurien välinen yhdistäminen on **biologisesti perusteltu kausaalinen synteesi**. Sen arvo ei riipu siitä, onko koko ketju mitattu yhdessä kokeessa. Sen tarkka muoto kuitenkin riippuu siitä, että yhdistetyt kuljetusreitit, metallimuodot, signaalit ja kudostilat todella vastaavat toisiaan.

Vuoden 2025 Lindgren-premissistä saadaan tensorinen muutos

\[
\delta g=\kappa\left(A_{bio}\otimes a+a\otimes A_{bio}+a\otimes a\right).
\]

BERM:n `δO = Xi[S](δg)` on ehdollinen biologinen liitos. Sen gauge-valinta, fysikaalinen skaala, kudosytimet, etumerkki ja viive ovat avoimia. Alla oleva kuljetuskerroin on tämän liitoksen mahdollinen biologinen kohde; primaarikokeet tuovat komponenttibiologiaa eivätkä validoi Lindgren-geometriaa.

## 2. Vahvistetut komponentit ja niiden tarkka sisältö

| Komponentti | Primaarikoe ja tarkistettu altistus | Mitattu tulos | Mitä tulos lisää koosteeseen |
|---|---|---|---|
| RF → endoteelin kuljetustoiminta | Neubauer ym. 1990: urosrotat, 2,45 GHz; 10 µs:n pulssit, 100 pulssia/s; 10 mW/cm², SAR noin 2 W/kg, 30–120 min. | Rhodamiini–ferritiinimerkkiaineen otto aivokuoren kapillaarien endoteelisoluihin lisääntyi. Kolkisiini ennen kenttää esti oton lähes kokonaan. | Interventio paikantaa vaikutusta mikrotubuluksista riippuvaan, pinosytoosin kaltaiseen ottoon. Endoteeliottoa ei pidä muuttaa väitteeksi koko aineen siirtymisestä aivoparenkyymiin. Ei Wi-Fi eikä metallikoe. |
| RF → BBB:n merkkiainevuoto | Nittby ym. 2009: 48 rottaa; GSM-900, 2 h TEM-altistus; SAR 0/0,12/1,2/12/120 mW/kg; arvio 7 päivää myöhemmin. | Albumiiniekstravasaatiota enemmän yhteistesteissä; annoskohtainen ero 12 mW/kg:ssa (p=0,007), pieni SAR-korrelaatio (rs=0,33). | Suora BBB-havainto omassa GSM-protokollassa. Kaikki annokset eivät olleet merkitseviä. Albumiini osoittaa makromolekyylin läpäisyä, ei tietyn metallimuodon vuota. |
| Metallimuoto ja kuljetus → aivoannos | Kerper, Ballatori ja Clarkson 1992: nukutettu rotta, nopea kaulavaltimoinfuusio, Me²⁰³Hg–L-kysteiini ja kuljetuksen kilpailijat. | Radioleimatun elohopean aivoihinotto oli osin saturoituvaa (näennäinen Km 0,39 mM, Vmax 33 nmol/min/g). Metioniini/BCH estivät ottoa; toisen aminohappojärjestelmän substraatti ei. | Suora metallin aivoihinoton mittaus ja reittiin kohdistuva interventio. Metalliannos riippuu kemiallisesta muodosta ja L-aminohappokuljetuksesta. Ei kenttäinterventiota eikä osoitusta siitä, että sama reitti vastaisi RF:n aiheuttamaa albumiinivuotoa. |
| ELF × Pb → toksinen päätemuuttuja | Liu ym. 2002: hiiret; 50 Hz sinimuoto, 0,2/6 mT, kaksi viikkoa; yhdistelmäryhmissä Pb 50 mg/kg. | Yhdistelmässä enemmän MDA:ta ja pienempi kalvofluiditeetti kuin 6 mT:n kentässä yksin. Myös GSH/T-AOC kasvoivat suhteessa kenttään yksin. | Suora yhteisaltistus aivojen ja maksan päätemuuttujiin. Tekijät nimeävät lipidiperoksidaation synergistiseksi; täydellinen additiivinen interaktiokontrasti ei ilmene abstraktista. Ei BBB:n tai aivojen Pb-pitoisuuden mittausta tarkistetussa aineistossa. |
| RF × Cr(VI) → DNA-vaurio | Zhu ym. 2026: hiiren alkion fibroblastit; kemikaaliesikäsittely 12 h → 1800 MHz, SAR 4 W/kg, 15 min. | Cr(VI):n kanssa lisääntynyt DNA-vaurio; Cd²⁺, H₂O₂ ja 4NQO eivät antaneet samaa lisäystä. RF yksin ei tuottanut havaittavaa vauriota. | Suora RF–metalli-yhteisaltistus osoittaa kemiallisesta tilasta riippuvaa päätevastetta. Ei aivokudos, BBB tai metallikuljetuksen koe. Tarkkoja kemikaalipitoisuuksia ei varmennettu. |

Taulukon primaarilähteet: [Neubauer 1990](https://doi.org/10.1002/bem.2250110402), [Nittby 2009](https://doi.org/10.1016/j.pathophys.2009.01.001), [Kerper 1992](https://doi.org/10.1152/ajpregu.1992.262.5.R761), [Liu 2002](https://pubmed.ncbi.nlm.nih.gov/14694649/), [Zhu 2026](https://doi.org/10.1016/j.bbrc.2026.153360). Primaaritietueiden abstraktit tarkistettiin PubMedistä/Europe PMC:stä; Neubauerin, Nittbyn ja Liun koko menetelmäaineisto ei ollut tämän auditoinnin käytössä.

Lisäksi nykyinen `hinkle1987_cadmium_uptake` antaa erityisen vahvan **ulkoinen annos → solunsisäinen annos → haitta** -komponentin. Rotan GH4C1-solulinjassa 100 nM nimodipiini vähensi 24 h:n Cd-kertymää 63 % ja siirsi CdCl₂:n LD50:n 15:stä 45 µM:iin. Tämä on kanavaan kohdistuva interventio, joka yhdistää kuljetuksen ja toksisuuden samassa järjestelmässä. Se ei mittaa BBB:tä eikä kenttää. [Hinkle ym. 1987](https://doi.org/10.1016/S0021-9258(18)49259-9)

## 3. Koostettu nuoli ja peittymisen deduktio

Erotetaan metallin ulkoinen annos `M_ext`, veren biologisesti kuljetettava muoto `C_blood,j`, aivoannos `M_brain,j`, vastaanottava tila `S` ja todellinen kenttäprotokolla `E`. Metallimuodon `j` kulku voidaan esittää paikallisena likiarvona:

\[
\dot M_{brain,j}=b_j(E,S)C_{blood,j}-k_{out,j}(E,S)M_{brain,j},
\qquad Y=H(M_{brain,j},E,S).
\]

`b_j` kuvaa nimettyä kuljetusta ja tarvittaessa läpäisyä, ei kaikkien aineiden yhteistä avointa porttia. Kyllästyvä kuljetus vaatii lineaaritermin tilalle esimerkiksi Michaelis–Menten-muodon. Veren kokonaismetalli, vapaa kuljetettava muoto ja aivojen kokonaiskertymä eivät myöskään ole sama suure.

**Tutkimustulosta:** kenttäinterventio voi tietyissä protokollissa muuttaa BBB:hen liittyvää ottoa/läpäisyä; kuljetusreittiin puuttuminen voi muuttaa metallin aivoihinottoa; kanavatilan muuttaminen voi muuttaa Cd:n solukertymää ja toksisuutta; metalli–kenttä-yhteisaltistus voi muuttaa toksista vastetta.

**Koostettu liitos:** kyseinen kenttävaikutus muuttaa juuri tarkasteltavan metallimuodon `b_j`:tä, poistumaa tai kudosvastetta. Tätä liitosta ei identifioida albumiinimerkistä yksin. Pinosytoosi, aminohappokuljetus, kanavaotto ja tiiviiden liitosten läpäisy ovat eri reittejä; mallin etu on niiden nimeäminen eikä yhdistäminen yhdeksi epämääräiseksi läpäisevyydeksi.

**Deduktio:** jos `b_j` kasvaa eikä poistuma kompensoi muutosta, sama veren kuljetettava pitoisuus tuottaa suuremman aivoannoksen. Jos haitta kasvaa kyseisellä annosalueella, haittakin kasvaa. Lähes vakaan kenttäympäristön aineistossa `Y ≈ α b_j(E,S) C_blood,j` voi näyttää metallin vaikutukselta, vaikka havaittu kulmakerroin sisältää kentästä riippuvan kertoimen. Metallin rooli on edelleen kausaalinen. Mittaamatta jäänyt kenttäehto voi silti peittyä sen alle. Tämä rakenne ei edellytä, että kenttä olisi synnyttänyt alkuperäisen metallipäästön tai että metalli ja kenttä korreloisivat jokaisessa aineistossa.

Mekanismiin kohdistuva interventio tuo enemmän paikannustietoa kuin pelkkä BKT:n ja päätemuuttujan korrelaatio: se muuttaa nimetyn prosessin toimintaa, testaa ajallista järjestystä ja mittaa läheisen seurauksen. BKT voi yhteisvaihdella monen altisteen ja käyttäytymisen kanssa ilman, että se yksilöi niistä yhdenkään. Tämä perustelee mekanistisen selityksen lisäarvon. Se ei yksin todista BERM:n koko selitystä paremmaksi kuin jokin täsmällinen vaihtoehtoinen mekanismi, jolla voi olla omaa interventiotukea.

## 4. Olennaiset rajaavat tulokset ja Wi-Fi-luokitus

- **Cosquer ym. 2005:** rottien 2,45 GHz:n pulssialtistus, 2 µs/500 pulssia/s, 45 min, koko kehon SAR 2 W/kg ja aivojen keskimääräinen SAR 3 W/kg. Ei Evans blue -vuotoa eikä huonosti BBB:n läpäisevän skopolamiini-metyylibromidin lisääntynyttä muistivaikutusta. Tämä rajaa kyseistä kuljetusmekanismia näissä oloissa; signaali ei ollut Wi-Fi. [Alkuperäistutkimus](https://doi.org/10.1016/j.bbr.2005.02.025)
- **McQuade ym. 2009:** rotat, 915 MHz, jatkuva aalto tai 16/217 Hz:n modulaatio; 30 min; koko kehon SAR 0,0018–20 W/kg. Ei albumiiniekstravasaation lisääntymistä. Varmistuskoe kohdistui Lundin havaintoihin, mutta kesto/näytteenotto eivät vastaa kaikkia positiivisia protokollia. [Alkuperäistutkimus](https://doi.org/10.1667/RR1507.1)
- **Poulletier de Gannes ym. 2017:** GSM-1800/UMTS-1950, aivo-SAR 0,026–13 W/kg, kerta- ja toistoaltistus. Enimmäkseen ei vaikutusta, mutta ohimenevä UMTS-tulos 0,26 W/kg:ssa ja viivästynyt albumiinivuoto molemmilla signaaleilla toistuvan 13 W/kg:n altistuksen jälkeen. Tätä ei saa esittää puhtaana nollatuloksena. [Alkuperäistutkimus](https://doi.org/10.1038/s41598-017-15690-1)
- **Maaroufi ym. 2014:** 900 MHz:n ja rautalisän yhdistelmä ei tuottanut kenttää yksin suurempia käyttäytymis-/neurokemiallisia häiriöitä eikä yleistä oksidatiivista stressiä. Nykykokeessa ei ollut rauta-yksin-haaraa, vaan tekijät viittasivat aiempaan saman ryhmän kokeeseen. Julkaisun abstrakti sanoo Long–Evans, menetelmäkatkelma Wistar: kantatietoa ei harmonisoitu arvaamalla. Saatavilla olleessa aineistossa ei varmennettu BBB:tä tai kentän kasvattamaa aivojen rautapitoisuutta. Tämä on lähellä tarkasteltua RF–metalliketjua oleva rajaus, ei sen kaikkien muotojen ratkaisu. [Alkuperäistutkimus](https://doi.org/10.1016/j.bbr.2013.10.016)
- **Amara ym. 2011:** staattinen 128 mT:n kenttä, 1 h/vrk 30 vrk, sekä CdCl₂ 40 mg/l suun kautta lisäsivät eräitä aivokuoren oksidatiivisia vaurioita verrattuna Cd:hen yksin. DNA:n 8-oxodGuo ei lisääntynyt edelleen. Tämä on aivojen metalli–kenttä-yhteisaltistus, mutta ei RF/Wi-Fi eikä tarkistetussa abstraktissa metallikuljetuksen/BBB:n koe. [Alkuperäistutkimus](https://doi.org/10.1177/0748233710381887)

**Wi-Fi on RF-altistuksen luokka, mutta 2,45 GHz ei yksin määritä Wi-Fi-signaalia.** Kaistan lisäksi tarvitaan modulaatio, liikenne-/pulssirakenne, käyttöaste, annos ja ajoitus. Tässä rajatussa haussa ei varmennettu aitoa Wi-Fi/802.11-koetta, jossa BBB-läpäisy olisi suoraan mitattu; tämä on haun tulos, ei väite kaikkien mahdollisten tutkimusten puuttumisesta. RF-komponenttien soveltaminen Wi-Fi:hin on siten altistusluokkien välinen synteettinen siirto. Sen ehtoja ei pidä piilottaa nimeämällä GSM- tai laboratoriopulssikoetta Wi-Fi-kokeeksi.

**Dasdag ym. 2015 on Wi-Fi-laitteiston koe, jonka päätepiste on miRNA.** 16 urosrottaa, 2,4 GHz, 24 h/vrk 12 kuukautta: kaksi viidestä mitatusta miRNA:sta muuttui ja kolme ei. Se antaa aivokudoksen molekyylivasteen komponentin, ei BBB-läpäisyn tai metallien aivokertymän mittausta. Nykyisen rekisterin otsikko on tiivistelmä, ei oikea artikkelin nimi; oikea lehti on *International Journal of Radiation Biology*. [Alkuperäistutkimus](https://doi.org/10.3109/09553002.2015.1028599)

Eläin- ja solukokeet eivät tässä identifioi ihmisen kuljetuskerrointa tai arki-Wi-Fi:n vaikutuskokoa. Tämä ei estä mekanismin koostamista; se määrittää, mitä osia ei vielä voi esittää kvantifioituina ihmistuloksina. Yksikään yllä tarkistettu koe ei yhdistänyt samassa asetelmassa aitoa Wi-Fi-signaalia, muuttunutta BBB:tä ja mitattua aivojen metallikertymää.

## 5. Valmis esimerkkiteksti sivulle

### FI (noin 130 sanaa)

Raskasmetallin mitattu määrä ei yksin määrää aivojen altistusta: myös veren ja kudoksen välinen kuljetus ratkaisee. RF-eläinkokeissa on havaittu albumiinin läpäisyn tai endoteelin merkkiaineoton muutoksia; yhdessä kokeessa kolkisiini esti lisääntyneen oton lähes kokonaan. Erikseen metyylielohopean aivoihinottoa on muutettu estämällä sen aminohappokuljetusreittiä, ja metalli–kenttä-yhteisaltistuksissa on havaittu muuttuneita toksisia vasteita. BERM kokoaa nämä tulokset mekanismiksi: jos kentän ja kudostilan muutos kasvattaa tietyn metallimuodon siirtokerrointa, sama ulkoinen metalliannos voi tuottaa suuremman sisäisen annoksen ja haitan. Tällöin metalli selittää seurauksen aidosti, mutta sen tilastollinen kerroin voi sisältää myös mittaamatta jääneen kenttäehdon. Kuljetukseen kohdistuvat interventiot paikantavat tätä selitystä tarkemmin kuin pelkkä BKT-korrelaatio. Koostettu mekanismi on biologisesti ankkuroitu kausaalinen synteesi; sen siirtäminen Wi-Fi-altistukseen edellyttää signaali- ja annosehtojen vastaavuutta. Nollatulokset rajaavat ehtoja: vaikutus ei ole jokaisen RF-signaalin tai metallin yleisominaisuus.

### EN (noin 140 sanaa)

Measured metal exposure does not fully determine brain dose: transport between blood and tissue also matters. Animal RF experiments have reported altered albumin leakage or endothelial tracer uptake; colchicine almost abolished the increased uptake in one experiment. Separately, blocking an amino-acid transport pathway reduced methylmercury entry into the brain, and metal–field co-exposures have altered toxic endpoints. BERM combines these components: if field and tissue state increase transport of a particular metal species, the same external metal exposure can produce a larger internal dose and greater harm. The metal remains a real cause, while its statistical association can absorb an unmeasured field-dependent condition. Transport interventions provide causal detail beyond a GDP correlation. This is an experimentally anchored causal synthesis; applying it to Wi-Fi requires compatible signal and dose conditions. Null results define its boundaries: the effect is not a universal property of every RF signal or metal.

Ensimmäisten kolmen virkkeen viitteet: [Neubauer](https://doi.org/10.1002/bem.2250110402), [Nittby](https://doi.org/10.1016/j.pathophys.2009.01.001), [Kerper](https://doi.org/10.1152/ajpregu.1992.262.5.R761), [Liu](https://pubmed.ncbi.nlm.nih.gov/14694649/) tai RF-painotukseen [Zhu](https://doi.org/10.1016/j.bbrc.2026.153360). Viimeisen virkkeen yhteyteen [Cosquer](https://doi.org/10.1016/j.bbr.2005.02.025) ja/tai [McQuade](https://doi.org/10.1667/RR1507.1). Keskiosan ehtolause on BERM-synteesiä, ei yhdenkään tutkimuksen raportoima koko ketju.

## 6. Suositeltu rajattu lähderekisterikartta

Seuraavat kolme uutta ID:tä ja yksi aiemmin ollut ID kattavat tekstin ydinkomponentit. Kolme uutta ID:tä lisättiin jatko-ohjeen perusteella; lisäksi lisättiin Zhu2026 ja korjattiin nykyinen Cosquer2005. DOI-, PMID-, otsikko- ja aliasduplikaatit tarkistettiin ennen lisäystä.

| ID | Tila | Tarkka primaariviite |
|---|---|---|
| `neubauer1990_rf_endothelial_uptake` | Lisätty canonical ID | Neubauer C, Phelan AM, Kues H, Lange DG. 1990. *Microwave irradiation of rats at 2.45 GHz activates pinocytotic-like uptake of tracer by capillary endothelial cells of cerebral cortex.* Bioelectromagnetics 11(4):261–268. DOI 10.1002/bem.2250110402; PMID 2285411. |
| `nittby2009_gsm_bbb` | Lisätty canonical ID | Nittby H, Brun A, Eberhardt J, Malmgren L, Persson BR, Salford LG. 2009. *Increased blood-brain barrier permeability in mammalian brain 7 days after exposure to the radiation from a GSM-900 mobile phone.* Pathophysiology 16(2–3):103–112. DOI 10.1016/j.pathophys.2009.01.001; PMID 19345073. |
| `kerper1992_methylmercury_bbb` | Lisätty canonical ID | Kerper LE, Ballatori N, Clarkson TW. 1992. *Methylmercury transport across the blood-brain barrier by an amino acid carrier.* American Journal of Physiology 262(5 Pt 2):R761–R765. DOI 10.1152/ajpregu.1992.262.5.R761; PMID 1590471. |
| `liu2002_elf_lead` | Nykyinen canonical ID | Liu Y, Weng E, Zhang Y, Hong R. 2002. *Effects of extremely low frequency electromagnetic field and its combination with lead on the antioxidant system in mouse.* Zhonghua Lao Dong Wei Sheng Zhi Ye Bing Za Zhi 20(4):263–265. PMID 14694649; ei varmennettua DOI:ta. |

Tarvittaessa nykyinen `hinkle1987_cadmium_uptake` tuo samassa kokeessa mitatun sisäisen annoksen ja toksisuuden yhteyden. RF-yhteisaltistuksen lisätty lähde on `zhu2026_rf_chromium_dna`: Zhu Y, Zhu L, Lan Y, Sun C, Chen G. *Exposure to hexavalent chromium and 1800 MHz electromagnetic radiation can synergistically induce intracellular DNA damage in mouse embryonic fibroblasts*. Biochemical and Biophysical Research Communications 804:153360, 2026. DOI 10.1016/j.bbrc.2026.153360; PMID 41619510.

Nykyinen **`cosquer2005` oli virheellinen paikkamerkki** (otsikko “Junior (2014)”, ei DOI:ta). Sille ei löytynyt sivu- tai claim-käyttöä; se korjattiin samalla ID:llä. Oikea viite: Cosquer B, Vasconcelos AP, Fröhlich J, Cassel JC. 2005. *Blood-brain barrier and electromagnetic fields: effects of scopolamine methylbromide on working memory after whole-body exposure to 2.45 GHz microwaves in rats.* Behavioural Brain Research 161(2):229–237. DOI 10.1016/j.bbr.2005.02.025; PMID 15922049. McQuaden vastapari on *Radiofrequency-radiation exposure does not induce detectable leakage of albumin across the blood-brain barrier*, Radiation Research 2009, s.615–621, DOI 10.1667/RR1507.1; PMID 19580497. McQuadea ei lisätty tässä rajatussa bibliografiapäivityksessä.

## 7. Haun kattavuus

Nykyisten canonical-tietueiden tarkistusta seurasi täsmähaku Wi-Fi/802.11 + BBB, 2,45 GHz + tracer/permeability, RF/ELF + metalli + brain/barrier sekä primaariviitteiden varmennus. Europe PMC:n otsikko-/abstraktihaku erotti varsinaiset yhteisaltistukset katsauksissa vain mainituista tutkimuksista. Viimeisessä vaiheessa ei tehty uutta yleisetsintää: kuljetusliitos täsmennettiin Kerperin primääristä ja päätelmä rakennettiin jo vahvistetuista osista. Tämä on kohdennettu auditointi eikä tyhjentävä systemaattinen katsaus.
