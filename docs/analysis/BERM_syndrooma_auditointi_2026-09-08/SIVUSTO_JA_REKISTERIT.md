# Syndroomanäytön vaikutus sivustoon ja rekistereihin

Päiväys: 8.9.2026. Tehtävä: nykyisten alkuperäistutkimusten, datan ja tutkimusketjujen synteesi. Tämä on lähdekoodiin ja rekisteritietueisiin perustuva nykytila- ja vaikutusauditointi. Tuotantokoodia, mallia, rekistereitä tai julkaisuja ei muutettu. Uusia laboratorio- tai kenttäkokeita ei ehdoteta tämän työn seuraavaksi vaiheeksi.

## 1. Tulos ja vertailupohja

Suurin hyöty ei tule kymmenen sairauden lisäämisestä kymmeneksi koko mallin todisteeksi. Hyöty tulee jo olemassa olevien BERM-mekanismien erottelusta: kalvon portti, kanavan toiminnallinen suunta, solunsisäinen kalsiumvarasto, palautumisreservi, biologinen vaihe, energiasta riippuva motivaatio ja lisääntymisen peräkkäiset portit. Sivustossa on jo suuri osa mekanismirungosta, mutta nimeämisen, lähdekohtaisten väitteiden ja eri sivujen liitosten kattavuus vaihtelee voimakkaasti.

Käytetyt lyhenteet:

- **P:** julkaistun version worktree `/Users/ottojuote/.berm-navigation-repair-20260908`, HEAD **0840703**. Root vahvisti saman main-commitin etäpalvelusta.
- **W:** alkuperäinen työtila `/Volumes/kovalevy 3/extinctionfield`, HEAD **7a938dd**, jossa on paljon julkaisemattomia ja myöhempien julkaisujen kanssa eri suuntaan kehittyneitä muutoksia. Tarkistushetkellä 77 seurattua tiedostoa oli muuttunut. W ei ole julkaisun ajantasainen peili.
- Taulukoiden tiedostopolut ovat suhteessa yllä oleviin juuriin. `P:polku:rivi` tarkoittaa konkreettista lähdekoodiriviä P-versiossa. Samannimisyys ei tarkoita samansisältöisyyttä.

| Rakenne | P | W | Merkitys |
|---|---:|---:|---|
| Bibliografian lähteet | 1191 | 1156 | Uudessa yhdistämisessä on säilytettävä myös 35 P-version lisälähdettä. |
| Väitteet | 99 | 64 | W:stä julkaiseminen sellaisenaan hukkaisi nykyistä väiterakennetta. |
| Evidenssisuhteet | 186 | 131 | Lähde × väite -liitokset eivät vastaa toisiaan. |
| Episteemiset arviot | 99 | 64 | Arvio on väitekohtainen, ei sairauden tai lähteen yleisleima. |
| Argumentaatioreitit | 5 | 5 | Samat lukumäärät eivät takaa samaa sisältöä. |
| Kanonisen graafin solmut / kaaret | 47 / 96 | 39 / 83 | Julkaistu biologinen–käyttäytymiseen johtava rakenne on laajempi. |
| Atlas: solmujen / kaarien väitesidokset | 68 / 5 | 50 / 5 | Näyttö pitää liittää myös kartan oikeaan kohtaan. |
| Lähdekoodin/atlaksen väiteankkurit | 183 | 102 | Ei sama asia kuin eri väitteiden tai tutkimusten määrä. |
| Ankkuroituja eri väitteitä | 99 | 64 | 100 % nykyisistä väitteistä; EI 100 % sivujen kaikista väitelauseista. |
| Vanha näyttökatalogi | 150 | 150 | Erillinen ylläpidettävä rekisteri. |
| Rajatut `FIELDSTATE_EVIDENCE`-tietueet | 34 | 34 | Erillinen näyttörekisteri; ei uuden biologisen synteesin lähtömalli. |

Rajatussa lähdekoodi-/rekisteriotoksessa tarkastettiin 346 P-tiedostoa ja 333 W-tiedostoa. Näiden unionissa 94 tiedostoa erosi tai puuttui toisesta versiosta. Tämä on sivuston rajattu osaotos; rootin laajempi versioinventaario kattaa 743 tiedostoa (566 samaa, 130 erilaista, 47 vain P:ssä). Lukuja ei pidä esittää kilpailevina koko repon erolukuina. Otos kattaa `website/app`, `components`, `lib`, `data` ja `scripts` -hakemistojen TS/TSX/JSON/MJS-tuotantolähteet; testit ja suuret generoidut viiteindeksit eivät kuulu tähän tiedostomäärään. Bibliografia ja vanha näyttökatalogi luettiin erikseen. Kaikkien erojen luettelo on `site_version_differences.csv`; 44 tärkeimmän sivu-/komponenttikohteen P/W-tilat ja rivit ovat `site_page_impact.csv`.

## 2. Mitä jo on, mitä todella puuttuu

Luokat: **N** = nimetty sairaus/geenitauti jo näkyvissä; **M** = sama mekanismi jo toteutettu ilman kyseisen sairauden käyttöä; **L** = puuttuva linkitys tai lähdekohtainen jäsennys; **U** = uusi tuotu tutkimustulkinta tarvitaan. N ja M eivät ole todisteen vahvuusluokkia.

| Perhe | Nykyinen P-tila ja täsmällinen sijainti | W-tila | Sisällöllinen muutos |
|---|---|---|---|
| Timothy / CACNA1C | **N.** `/fi/evidence/timothy-experiment`, `website/app/[locale]/evidence/timothy-experiment/page.tsx:82`. Kymmenen fenotyyppiriviä, GWAS, sub-Timothy ja neljä ennustetta. Lisäksi `/fi/modulome/brain`, `page.tsx:56`, ja VGCC-geenikartta. | Timothy-sivu identtinen. Brain-sivu eri; säilytettävä P:n muu sisältö. | **L:** jokainen fenotyyppi sidotaan sitä koskevaan koe-/potilasaineistoon. Erotetaan variantin portitus, kehityksellinen vaihe, solutyyppi ja toiminnallinen päätepiste. Sivulla ei nyt ole `ClaimRef`-ankkureita. |
| CACNA1D / PASNA / SANDD | **M**, geeniperhe `website/lib/vgccGeneFamily.ts:61`, mallin geenitaulukko `website/app/[locale]/model/page.tsx:1542`, korva-/sydän-/haimasivut. PASNA ja SANDD puuttuvat nimeltä. Kaksi kohdennettua CACNA1D-lähdettä on jo bibliografiassa mutta ilman sivukäyttöä. | Geeniperhetiedosto eroaa vain CACNA1H:n myöhemmän kuvauksen osalta; CACNA1D-rakenne sama. Elinsivut pääosin samat. | **L/U:** Cav1.3:n lisäävä ja vähentävä toiminnanmuutos omiksi mekanismeiksi; samassa kanavaperheessä voidaan paikantaa hormonaalinen eritys, kuulo ja sydämen tahdistus. Ei koko geenille yhtä kaikissa kudoksissa samaa suuntakerrointa. |
| KATP / KCNJ11 / ABCC8 / DEND | **M.** `/fi/modulome/pancreas`, `page.tsx:31`; `/fi/evidence/cascades`, `page.tsx:70`; mallin β-solutila `model/page.tsx:220`. K_ATP → Vmem → VGCC → eritys on jo kirjoitettu. KCNJ11/ABCC8/DEND eivät ole nimettyä sairausnäyttöä. | Pancreas sama; cascades ja mallisivu eri. | **U:** olemassa oleva geneettinen ja hoitovastetutkimus paikantaa metabolisen tilan lukevan portin; haiman ja hermoston vasteet erotellaan. Johtopäätös on portituksen/ajoituksen muutos, ei automaattisesti liiallinen Ca²⁺ kaikissa kanavataudeissa. |
| STIM1 / ORAI1 / CRAC | **M erittäin vähän.** Timothy-sivun immuunirivi `page.tsx:34` / FI `:99` mainitsee CRAC/Orai1. Ei STIM1/ORAI1-sairausartikkeleita bibliografiassa, ei Stormorkenia eikä tubulaarista aggregaattimyopatiaa. | Sama. | **U:** varastotäytön ohjaama sisäänvirtaus ja immuuni-/lihasfenotyypit omaksi mekanismiperheeksi. Timothy-immuuniriviä ei käytetä STIM1/ORAI1-näytön korvikkeena. |
| Darier / ATP2A2 sekä Wolfram / WFS1 | **M**, ei N. SERCA2b/RyR2 jo BAT-sivulla `website/app/[locale]/modulome/bat/page.tsx:30`; varastokierto selvästi moduloomassa `website/app/[locale]/modulome/page.tsx:147`. Darier/WFS1-lähteitä ei bibliografiassa. Mallisivun Wolfram-osuma tarkoittaa **Wolfram Language -ohjelmistoa**, ei oireyhtymää. | Moduloomasivu ja BAT sama; generoidut mekanismikortit/tilapeili kuitenkin eroavat. | **U:** geenikorjaus/rescue, ER/sytosoli-erottelu ja stressinsietoreservi yhdistetään nykyiseen varastokiertoon. Uutta kalsiumkompartmenttia ei tarvitse keksiä; sen ihmisperäinen mekanisminäyttö on lisäys. |
| RYR2 / CPVT | **M**, RyR2 BAT-sivulla, neurologia/SIDS-sivuilla sekä `/fi/civilization/patopoliteia` (`page.tsx:202`, FI `:383`). Ei CPVT:n kohdennettua potilas-/iPSC-rescue-ketjua. | Relevantit elinsivut samat; infant-sivu eri. | **U/L:** stressistä riippuva varastovuoto ja rytmihäiriökynnys biologiseksi kohdeväitteeksi. Nykyisen `camkii_pancreas_diabetes`-lähteen ainoa indeksöity käyttösivu on makrosivu; molekyylilähteelle tarvitaan luonteva elin-/mekanismiselitys ennen makrokytkentää. |
| CRY / PER2 / RAI1 | **N osin.** CRY1Δ11/DSPD on mallin geneettisessä herkkyyskartassa `model/page.tsx:1559`. PER2:ta käsitellään suoli–aivo- ja kelloyhteydessä; nämä eivät ole PER2:n familiaalisen univaiheen sairausnäyttöä. RAI1/Smith–Magenis ja PER2-FASPS puuttuvat. | CRY1-rivi sama; useat kello- ja pääsivut eri. | **L/U:** määrä, vaihe, kudoskello, hormonin ajallinen vaikuttavuus erotellaan. CRY1:n kliininen fenotyyppi ei sellaisenaan identifioi CRY:n magneettista vastaanottoa. Nykyinen molekyylikello–steroidireseptori-ketju säilytetään. |
| TAC3 / TACR3 | Ei N; ei kohdennettuja lähteitä. **M:** HPA–HPG, hypotalamus ja aivolisäke ovat jo mallissa ja sivuissa. KISS1R/GNRHR eivät myöskään löytyneet tämän nimiperheen haussa. | Sama nimien puute. | **U:** GnRH-pulssin muodostus, siirto ja lisääntymisakselin palautuvuus. Jo olemassa oleva Mills-kisspeptiinitutkimus liittää akselin halun käsittelyyn; TAC3/TACR3 ei korvaa sitä toisena samasta asiasta kertovana lähteenä. |
| LEP / LEPR | Ei N eikä kohdennettuja lähteitä. Leptiiniresistenssi mainitaan `/fi/evidence/klimentidis-explained`, `page.tsx:66` / FI `:133`, sekä `RetrodictionCards.tsx:42`. | Klimentidis-sivu sama, retrodiktiokortit eri. | **U:** perinnöllinen leptiinipuutos ja olemassa olevat korvaushoitohavainnot paikantavat energiasignaalin suhteessa koettuun palkkioon, kylläisyyteen ja lisääntymiskykyyn. Ligandivaje ja reseptorin toimintahäiriö pidetään eri tapauksina. |
| CatSper / PLCZ1 | **N ja lähderekisteri jo toteutettu CatSperille.** `/fi/biology` `page.tsx:67`; `/fi/model/biological-coordination` `page.tsx:93`; `/fi/evidence/reproductive-navigation` `page.tsx:287`; yleinen näyttösivu `page.tsx:480`. PLCZ1 puuttuu. | CatSper jo W:ssä; sivuliitokset ja rekisterisisältö vaihtelevat, reproductive-navigation identtinen. | **L/U:** Young 2024 ei ole uusi löytö. Sen rinnalle erotetaan siittiön pääsy/hyperaktivaatio, munasolun aktivaatio ja implantaatio; PLCZ1 tuo uuden portin. Ionofoorin jälkeisen kalsiumin laskun tärkeys on jo tekstissä, joten se kootaan näkyväksi yhteisperiaatteeksi. |

Lisänä CACNA1A/FHM1 on jo `/fi/evidence/neurological-spectrum`-sivulla (`page.tsx:641`) ja `VGCC_GENE_FAMILY`-datassa (`vgccGeneFamily.ts:105`). CAMK2A/B on mallisivulla `:1549–1551`, CACNA1H:n aldosteronismi `:1541`. Niitä ei pidä esitellä uutena sivustolta kokonaan puuttuvana genetiikkana. Niiden rooli on vahvistaa eri kohtiin osuvien mekanismikokeiden sarjaa.

## 3. Bibliografia: jo löytyvät palat ja täsmälliset korjattavat liitokset

Bibliografian lähde on `website/public/data/references_full.json`. Seuraavat rivit viittaavat P-tiedostoon; kaikki P- ja W-rivit sekä käyttöreitit löytyvät `site_reference_matrix.csv`-tiedostosta. Lähderekisterin `verified`/`link_status` kuvaa rekisterin nykyistä metatietoa, ei tämän auditin uutta riippumatonta tutkimuksen sisällön varmennusta.

| Kanoninen tunniste | P-rivi | DOI / muu tunniste | Nykyinen käyttö ja päivitystarve |
|---|---:|---|---|
| `splawski2004` | 427 | 10.1016/j.cell.2004.09.011 | Timothy-pääsivu, sydän, vanha katalogi. Otsikko rekisterissä yleisluontoinen “CACNA1C channelopathy study”; ei omaa päärekisterin evidenssisuhdetta. |
| `splawski2005_cardiac_ltype` | 29314 | 10.1073/pnas.0502506102; PMC1149428 | Timothy-sivu. Variantti-/isoformieroille oma lähdekohtainen käyttö. |
| `bader2011_timothy_mouse` | 2374 | 10.1073/pnas.1112667108 | Hiirimalli; ei ihmisen saman aineiston toiseksi replikaatioksi. |
| `bhat2012_cacna1c_psychiatric` | 25340 | 10.1016/j.pneurobio.2012.06.001 | Katsaus. Erotettava alkuperäistutkimuksista. |
| `pmc6894750_timothy` | 12672 | 10.1371/journal.pgen.1008488; PMC6894750 | Buddell ym. 2019, aksonien kohdentuminen/autofagia. Jo useita käyttösivuja. |
| `timothy-syndrome-cacna1c-autism` | 28659 | Ei DOI/PMID/URL | Bhatt 2019 -tietue näyttää kuvaavan samaa kokonaisuutta kuin edellinen. Kuraation tehtävä: ratkaista identiteetti alkuperäisjulkaisusta ja yhdistää alias tarvittaessa, ei laskea lisätodisteeksi. |
| `timothy-cardiac-2023` | 27449 | 10.1016/j.hrcr.2023.05.012 | Bibliografiassa ilman indeksöityä sivukäyttöä. Kudospainotteisen fenotyypin mahdollinen täydennys. |
| `cacna1c_autism` | 19304 | 10.1371/journal.pone.0133247 | **Otsikko CACNA1D de novo mutations in autism spectrum disorders**, mutta finding/tags kuvaavat CACNA1C:tä. Todellinen lisäpala on väärässä tulkintalokerossa. Ei sivukäyttöä. |
| `cacna1d_family2022` | 28047 | PMC9693521 | Cav1.3 R930H, suku/sydän/epilepsia ja isoformikohtaiset vaikutukset. Ei sivukäyttöä eikä evidenssisuhdetta. |
| `nejm-fhm-cacna1a` | 10348 | Otsikko Ducros 2001, tunnisteet puuttuvat | Geeniperhediagrammin viite on jo käytössä; bibliografinen identifiointi täydennettävä. |
| `fhm1_cacna1a` | 17857 | 10.3390/ijms22052688 | Ei indeksöityä sivukäyttöä; FHM1 itse jo proosassa. |
| `kury2017_camk2` | 25686 | 10.1016/j.ajhg.2017.10.003 | Jo mallissa, epistemologiassa ja ennusteissa; ei väitekohtaista genetiikkasuhdetta. |
| `altawashi2018_camk2a` | 18529 | PMC5963920 | Mallissa; vastakkaisten toimintasuuntien erittely. |
| `scholl2015_cacna1h` | 24550 | 10.7554/eLife.06315 | Jo mallissa ja infant-sivulla; endokriininen portti alikäytetty. |
| `patke2017_cry1` | 19700 | 10.1016/j.cell.2017.03.027 | Mallissa; ei päärekisterin evidenssisuhdetta. |
| `cry1_observational2021` | 13565 | PMC8505610 | Bibliografiassa, ei sivukäyttöä. Luonnollinen jatko Patken kliiniselle ketjulle. |
| `catsper2024` | 14396 | 10.1172/JCI173564; PMC10760960 | Young 2024 jo sivuissa, väitteessä, atlasliitoksessa ja reitissä. Alias `catsper_human` sekä `young2024_catsper_hyperactivation` ratkeavat samaan julkaisuun. |
| `scirep2016_ionophore` | 10835 | 10.1038/srep33589 | Ionofoori-/poistumakoe jo reproductive-navigation- ja pharmacology-sivuilla. Ei vielä omaa päärekisterin suhdetta. |
| `camkii_pancreas_diabetes` | 1586 | PMC3596297 | Ainoa indeksöity sivukäyttö `/civilization/patopoliteia`; varaston/toiminnan elintasoinen tulkinta puuttuu. |
| `bertagna2025` | 3625 | 10.1111/nyas.15386 | RyR/SERCA-altistuskoe jo rajatulla väitteellä ja mekanismikortilla. Sairausaineisto täydentää sen biologista rakennetta, ei muuta sitä toiseksi altistuskokeeksi. |
| `sousouri2025` | 1320 | bibliografiassa ja rajatulla EEG-väitteellä | Genotyyppi × altistus -koe erotettava geneettisen sairauden varsinaisesta mekanismikokeesta. |

Uusille sairauksille ei luoda tunnisteita ennen DOI/PMID/PMCID/alias-tarkastusta. Tässä aiemmassa rajatussa kirjallisuushaussa vahvistetut mutta nykybibliografiasta puuttuvat varastoperheen lisäykset ovat Maxwell 2020 (WFS1, 10.1126/scitranslmed.aax9106), Lu 2014 (10.1073/pnas.1421055111), Hunt 2024 (Darier, 10.1038/s44321-024-00104-3) ja Harmon 2026 (10.1126/sciadv.aee1599). Niiden tutkimussisällön synteesi kuuluu tutkimusauditin toiseen osaan; tässä on varmennettu puuttuminen nykyisestä sivustobibliografiasta.

## 4. Päärekisterin rakenne: mihin näyttö kuuluu

`website/data/claims.json` on kuratoitujen väitteiden, evidenssisuhteiden, arvioiden ja reittien lähde. `website/lib/claims/types.ts:35` määrittelee kohteen solmuksi/kaareksi/reitiksi; `:75` määrittelee suhteen ja `:102` episteemisen arvion. Bibliografian tutkimus ei itsessään ole väite eikä mekanismin geneettinen todiste itsessään vahvista EMF-altistuksen samaa vaikutusta.

| Nykyinen P-väite | P-rivi | Kohde / taso | Syndroomasynteesin vaikutus |
|---|---:|---|---|
| `claim.vgcc.ros-ca2-coupling` | 6 | A_VGCC_ROS / M | Yleinen mekanismirajapinta. Geenikohtaiset toimintakokeet omiksi väitteiksi tai tarkaksi alaväitteeksi, eivät nipuksi samaan väitelauseeseen. |
| `claim.modulome.calcium-compartment-cycle` | 1853 | A_VGCC_ROS / M | Nykyinen lause koskee altistettuja hippokampusneuroneja ja Bertagna-koetta. Darier/WFS1 eivät suoraan tue tämän täsmällisen altistuslauseen tulosta; niitä varten tarvitaan erillinen biologinen varastoväite ja yhteinen synteesiväite. |
| `claim.modulome.genotype-exposure-interaction` | 2077 | A_VGCC_ROS / M\|C | Rajattu ihmisen CACNA1C×RF-unisukkulakoe. Timothy/PASNA eivät ole uusia evidenssisuhteita samalle mitatulle interaktiolle. |
| `claim.receptor.state-dependent-response` | 1568 | RECEPTOR_STATE_MEMORY / M | Darierin stressireservi voi täydentää vastaanottavan solun tilan synteesiä; geneettistä varianttia ei muuteta yhdeksi yleiseksi EMF-herkkyysluvuksi. |
| `claim.coordination.redox-clock` | 1599 | CIRCADIAN_COORDINATION / M | Redox/palautuminen ja kellon keskinäinen biologinen riippuvuus; varasto- ja kellosairauksien täsmällinen erottelu. |
| `claim.cry.endocrine-gating` | 1506 | HORMONE_TARGET_RESPONSE / M | CRY1/DSPD, PER2/RAI1 ja nykyinen CRY-reseptoritutkimus tuovat eri osia, eivät samaa toiminnallista näyttöä. |
| `claim.coordination.cry-steroid-feedback` | 2959 | HORMONE_TARGET_RESPONSE / M | P:n uudempi reseptori–kello-piiri säilytettävä, vaikka W ei kata kaikkia lähteitä. |
| `claim.coordination.hormone-waveform` | 2990 | HORMONE_TARGET_RESPONSE / M | TAC3/TACR3 ja ajoitusgeenit tarkentavat pulssin/funktion merkitystä. |
| `claim.reproduction.local-clock-gates` | 1694 | **IMPLANTATION** / M | Tämän alle on nyt yhdistetty Young/CatSper sekä munasarjan kello/implantaatio. Spermatoiminnon näyttö tarvitsee oman MALE_SPERM-väitteen, PLCZ1 munasolun aktivaatioportin ja implantaatio oman väitteensä. Nykyinen synteesireitti ja lähdeprovenienssi säilytetään. |
| `claim.couple.waiting-time-distribution` | 1725 | COUPLE_FECUNDABILITY / L* | Toiminnalliset portit ja niiden ajoitus koostetaan ehdollisina siirtyminä. Diagnoosien tai oireiden lukumäärää ei kerrota suoraan fecundability-kertoimeksi. |
| `claim.behavior.state-dependent-valuation` | 3021 | route.biological-state-to-action / M | LEP:n energiasignaalitutkimus liittyy tähän uutena kohdennettuna biologisena osana. Nykyiset dopamiini/uni/tulehdustutkimukset säilyvät. |
| `claim.behavior.sexual-motivation` | 3052 | sama reitti / M | TAC3/TACR3/LEP:n kapasiteetti- ja ajoitusnäyttö erotetaan nykyisistä Finkelsteinin/Millsin motivaatiopäätepisteistä. |
| `claim.behavior.biological-state-to-action` | 3207 | sama reitti / L* | Uusi kooste täsmentää biologisesti muodostuvan motivaation väliaskelia. |
| `claim.tfr.multi-input-decomposition` | 387 | TFR / C | Ei suoria lähdesuhteita. Uusi genetiikka ei muutu TFR-kalibraatioksi ilman erillistä jo olemassa olevan väestödatan yhdistämistä. |

Kaikki taulukon nykyväitteet ovat `draft`-tilassa. Tätä elinkaaritilaa ei muuteta automaattisesti lähteiden lukumäärän kasvaessa. Mekanistinen päätelmä voidaan esittää aiempaa vahvemmin sen täsmällisen rajauksen sisällä samalla, kun koko ketjun laskennallinen koostaminen säilyy omana BERM-väitteenään.

### Young/CatSper: konkreettinen nykyinen ketju

`catsper2024` → `er.coordination.catsper2024` (`claims.json:6097`) → `claim.reproduction.local-clock-gates` (`:1694`) → arvio (`:8553`) → `route.biological-coordination` (`routeEvidence` sisältää relaation, `:9405`) → atlasbinding (`atlas-claim-bindings.json:79` ja `:290`) → koordinaatiosivun `ClaimRef` (`page.tsx:169`). Lähde on siis jo liitetty kaikkiin keskeisiin rakenteisiin. Työ on porttien hienojakoistamista ja PLCZ1:n lisäämistä, ei uuden CatSper-näytön ilmoittamista.

### Riippumattomuus

P:n viisi reittiä ovat `route.vgcc-sperm-fecundability`, `route.rpm-melatonin-clock`, `route.tfr-decomposition`, `route.biological-coordination` ja `route.biological-state-to-action`. Kaikkien `independenceVerified` on **false**. `website/lib/claims/independence.ts:31` kerää transitiiviset riippuvuudet; `:80` vertaa lähteitä, tutkimuksia, aineistoperheitä, premissejä, väitteitä ja evidenssisuhteita. `sourceReferenceId()` (`website/lib/referenceIndex.ts:31`) yhdistää aliakset ja korjausjulkaisut alkuperäiseen tutkimukseen.

Sairausperhe on järjestämisen yksikkö. Riippumattomuuden yksikkö on tutkimusasetelma/aineisto ja se mekanismin kohta, johon tulos kohdistuu. Geenikorjaus ja lääkerescue voivat antaa toisistaan poikkeavat rajoitteet samalle mekanismille; sama potilaskohortti tai saman tutkimuksen kuvantamis- ja eritystulos eivät ole uusia riippumattomia populaatiotoistoja. Pelkkä uusi otsikko tai erillinen näyttösivu ei kasvata riippumattomien reittien määrää.

## 5. Sivuston lukujärjestys ja elin–motivaatio–lisääntyminen–makro

**Fysiikka:** `/fi/physics`, `/fi/model/tensor-derivation` ja `/fi/model` säilyttävät Lindgrenin vuoden 2025 lähdeyhtälön `g = η + A⊗A`. BERM:n erikseen nimetyllä κ-skaalakonventiolla tästä käytetään muotoa `g = η + κ A⊗A`, jolloin `Δg = κ(A_b⊗a + a⊗A_b + a⊗a)`. Syndroomanäyttö ei muuta näitä lähdeyhtälöitä. Ehdollinen retardoitunut L2-vastetensori Ξ välittää fysikaalisen syötteen biologisiin parametreihin; sairaustutkimukset rajaavat biologista F/H/θ-osaa.

**Biologian yhteenveto:** `/fi/biology` (`page.tsx:53–70`) on luonteva lyhyt tiivistys kolmelle yhteiselle löydökselle: (1) saman kanava-/säätelykoneiston häiriö tuottaa kudoskohtaisia päätepisteitä; (2) toiminta riippuu varastosta, palautumisesta ja ajasta; (3) rutiinimittari voi ohittaa toiminnallisen portin. Sivulla on jo `ResearchConnection`-esitys, jota voidaan käyttää uuden rinnakkaisen sivurakenteen sijasta.

**Mekanismin täsmennys:** `/fi/modulome` (`page.tsx:147`, `:167`) sisältää jo ER–sytosoli–mitokondrio-erottelun ja palautumisnopeudet. `/fi/model/biological-coordination` sisältää valmiit kohdat `#receptor-state`, `#biological-memory`, `#tissue-timing`, `#functional-gates` ja `#existing-data` (`page.tsx:142–181`). Varasto- ja kellosyndroomien synteesi sijoittuu suoraan näihin, ilman että kaikki palautetaan CACNA1C:n yliaktivaatioon.

**Mitä halutaan ja mitä tehdään:** `/fi/behavior` on jo biologisen motivaation selityssivu; se on P/W-versioissa identtinen. Kohdat `#valuation` ja `#desire` (`page.tsx:61–73`) sisältävät dopamiini-, uni-, tulehdus-, sukupuolihormoni- ja kisspeptiinitutkimuksia. LEP ja TAC3/TACR3 täydentävät tätä energiasta/aksiaalista portitusta koskevilla luonnollisilla kokeilla. Halun biologista syntyä ei siirretä erilliseksi ei-biologiseksi välipalasiksi. Samalla hormonaalinen kyvykkyys, ärsykkeen arvo, halukkuus aloittaa ja onnistuva lisääntymistapahtuma pysyvät eri ulostuloina.

**Lisääntyminen:** `/fi/evidence/reproductive-navigation` (`page.tsx:279–287`) jo erottaa ihmisen CatSper-portin, ionofoorirescuen ja rottien altistuspäätepisteet. PLCZ1 jatkaa hedelmöityksen jälkeiseen munasolun aktivaatioon; `/fi/evidence/reproductive-arc` ja hypotalamus/aivolisäke/kives/haima-sivut kuvaavat niiden edellytyksiä. Tarkennus on luonnollisten kokeiden järjestäminen peräkkäisiksi funktionaalisiksi vaiheiksi. Sama heikentynyt signaali ei saa tulla uudestaan kerrotuksi jokaisessa saman polun kohdassa.

**Makro:** `/fi/civilization`, `CivilizationReadingPath.tsx:79` ja koordinaatiosivun onnistuvat kohtaamiset ovat jo toteutettu yhdistämisrakenne. Uusi ihmisbiologinen näyttö vahvistaa sitä, että jaetut biologiset tilat voivat osallistua kyvyn, halun, aloitteiden ja vasteiden muodostumiseen. Eteneminen populaatioon tapahtuu nykyisten ehdollisten siirtymien ja havaittujen jakaumien kautta; harvinaisen sairauden penetranssi ei ole sivilisaation vaikutuskerroin. P:n uudemmat saatavuus/AR/ZIP9/yksilöjakauma/narratiivi-solmut on säilytettävä. `patopoliteia/page.tsx:383` käyttää jo RyR2-haimalähdettä, joten tämä yhteys tarvitsee elintasoisen lähdeankkurin ennen uuden makroproosan lisäämistä.

**Näytön lukujärjestys:** `/fi/evidence/convergence` voi koostaa geenivirheen, kohdekorjauksen, korvaus/rescue-intervention ja funktionaalisen ulostulon rinnakkain. Timothy-sivu säilytetään omassa osoitteessaan ja sen nykyiset kymmenen fenotyyppiä säilytetään löydettävinä. Luonnollisten mekanismikokeiden yhteisnäkymä voidaan sijoittaa Näyttö-ryhmään; tämä ei edellytä kahdeksatta pääotsikkoa tai päävalikon piilottamista. Nykyinen navigaatio `website/lib/navigation.ts:692` tuo Timothy-sivun Näyttö-ryhmään; geeniperhesyvälinkki on `:114`. Kaikki nykyiset reitit ja aina näkyvä header säilytetään.

## 6. Atlas ja rekisterien ketju

Atlas on kooste, ei yksi JSON-tiedosto. Vaikutusketju:

1. `website/data/causal-graph.json` (47/96) on Pythonin kanonisen semanttisen graafin peili. Semanttinen uusi biologinen solmu lisätään ensiksi Python-lähteeseen; pelkkä sairauden lisääminen ei yleensä vaadi uutta syyverkon solmua.
2. `website/lib/causalAtlasRegistry.ts:40` sisältää `MODEL_NODE_MAP`-liitoksen. `:162–179` muodostaa mekanismikortti-, kerros- ja elinsolmut. `:208` liittää väitteet ja hakualiasnimet.
3. `website/data/causal-atlas-extensions.json` sisältää 103 lisäsolmua, 359 kaarta, 56 hakualiasnimeä ja erilliset sivusto-/mallikattavuusinventaariot. Syndrooman nimi kannattaa aluksi liittää olemassa olevaan kohdesolmuun hakualiaana; diagnoosista ei tehdä EMF:n ja solumekanismin väliin uutta biologista välittäjää.
4. `website/data/atlas-claim-bindings.json` ja `website/lib/atlasEvidence.ts:5–21` yhdistävät tarkat väitteet solmuihin/kaariin. Varastoväite, spermatoiminto, munasolun aktivaatio ja pulssin muodostus tarvitsevat omat tarkoituksenmukaiset kohteensa.
5. `website/lib/causalAtlasData.ts:49` määrittelee alaskaalat ja `:85` ohjatut reitit. Uusi näyttö on löydyttävä solu-, terveys- ja lisääntymisnäkymistä, tarvittaessa yhteiskuntanäkymän biologisista esiehdoista. Jos uusi PLCZ1-portti muuttaa semanttista reittiä, peräkkäiset kaaret on tarkistettava.
6. `website/components/atlas/AtlasClaims.tsx:43`, `AtlasDetail.tsx` ja `/fi/map` esittävät lähteet/arviot. `CausalAtlas.tsx:141–143` ilmoittaa jo, etteivät väite-/suhdemäärät ole riippumattomien kokeiden määriä. Tämä esityssääntö säilytetään.

Sivulla oleva `InlineReferenceText` tekee lähdelinkin, mutta ei kuratoi väitettä. `ClaimRef` paikantaa väitteen, mutta ei lisää sille lähdettä. `atlas-claim-bindings` tuo väitteen karttaan, mutta ei luo evidenssisuhdetta. Kaikki kolme osaa tarvitaan vahvan mekanismikuvauksen jäljitettävyyteen.

Kolmen näyttörekisterin ero on dokumentoitu `docs/evidence-registries.md:1`. Dokumentin syyskuun alun lukumäärät ovat vanhentuneita; ne eivät vastaa tämän auditin P-lukuja. `FIELDSTATE_EVIDENCE` ja `legacyEvidence.json` eivät synkronoidu automaattisesti päärekisterin kanssa. Timothyn vanhat tietueet ovat `legacyEvidence.json:3107` ja `:3132`. Siirrettävä tutkimus ei saa jäädä katalogissa samanaikaisesti uudeksi migraatiokandidaatiksi ja päärekisterissä uudeksi riippumattomaksi todisteeksi. Kanoninen `referenceId` ja tutkimusidentiteetti säilytetään.

## 7. Generaattorit, peilit ja tarkistukset, joihin myöhempi päivitys vaikuttaa

| Lähde / generaattori | Tuotos / kuluttaja | Olennainen tarkistus |
|---|---|---|
| `website/public/data/references_full.json` → `website/scripts/build-reference-index.mjs:155–194` | `website/lib/referenceIndex.json`, `referenceUsage.json`, `/references/[referenceId]` | Kanoninen ID, aliakset, DOI/PMID, korjausjulkaisun alkuperä, todelliset käyttösivut. |
| `website/data/claims.json` → `scripts/validate-registry.mjs` | väitteet, suhteet, arviot, reitit | Target, depends_on, basis, en/fi, scope, lifecycle, provenance. Nykyistä komponenttilausetta ei laajenneta hiljaa tukemaan aivan eri asetelmaa. |
| `ClaimRef` + atlasbinding → `scripts/build-anchor-index.mjs:18–21,110–140` | `website/data/anchor-index.json` | Tunnetut väite-ID:t, lähdekoodin tarkat rivit ja dynaamiset atlasankkurit. Generoitu tiedosto päivitetään, ei käsin. |
| `berm/berm/biology/causal_registry.py` → `berm/export_causal_graph.py` | `website/data/causal-graph.json` | Kanoniset solmut ja kaaret; uusi diagnoosinimi ei itsessään ole syyverkon muutos. |
| `berm/berm/modulome/*` → `berm/export_modulome.py:47–48` | `website/data/modulome-state.json` ja `website/public/data/modulome-state.json` | Molemmat peilit, korttien lähteet/väitteet ja havainnollisten lukujen parametri-identiteetti. |
| `website/lib/modulome/stateModel.ts:4–8,197–206` | `MechanismCards`, `CalciumCycle`, `StateTriad`, `FeedbackStability` | Ei uusia numeerisia vaikutuskertoimia pelkän sairausfenotyypin perusteella; kuvien rakenne voidaan ankkuroida nykyisiin julkaistuihin tuloksiin. |
| `website/lib/vgccGeneFamily.ts` | `VGCCGeneFamilyDiagram` ja mallisivu `:6351` | Sairauden variantti/toimintasuunta/lähde; nykyinen L/T/PQ-jaottelu säilyy. |
| `website/lib/navigation.ts`, `ModelTableOfContents` | header, mallin syvälinkit | Kaikki nykyiset pääryhmät ja Etusivu näkyvillä; uusi sisällöllinen jäsennys ei saa palauttaa aiempaa header-ongelmaa. |

Myöhemmässä toteutuksessa olennaiset valmiit testit ovat `website/lib/__tests__/claim-registry.test.ts`, `claim-independence.test.ts`, `component-claims.test.ts`, `atlas-evidence.test.ts`, `atlas-anchor-index.test.ts`, `atlas-coverage.test.ts`, `atlas-data.test.ts`, `causal-chain-separation.test.ts`, `model-architecture.test.ts`, `modulome-state.test.ts`, `evidence-registry.test.ts`, `navigation.test.ts` sekä `website/components/__tests__/Navigation.test.tsx`. Erityisesti `component-claims.test.ts:12–19` tarkistaa mekanismikorttien väitelinkit, ja `atlas-coverage.test.ts` tarkistaa kanoniset solmut, kaaret, aliaslöydettävyyden ja opastettujen reittien todelliset siirtymät. Tarkkoihin odotettuihin lähdelistoihin lisäystä ei tehdä vain testin läpäisyksi: ensin ratkaistaan, onko uusi tutkimus saman väitteen vai uuden väitteen näyttö.

`website/package.json` kytkee ennen rakennusta viiteindeksin, viite-/rekisteritarkistuksen, ankkuri-indeksin, tyyppitarkistuksen ja tiukan lintin. Jälkitarkistus `scripts/check-rendered-html.mjs` etsii tyhjät otsikot/linkit ja renderöimättömät viitetokenit. `scripts/check-copy-coverage.mjs` tarkistaa englannin täydellisyyden ja viiden kielen kattavuuden. Sairaussynteesiä ei voi päivittää vain suomenkieliseen irralliseen tekstiin niin, että lähdekytkennät tai muiden kielten näkyvä sisältö katoavat.

Tämän osatehtävän aikana ei ajettu sovelluksen rakennusta eikä testipaketteja, koska tuotantokoodia ei muutettu. Root tarkisti erikseen julkaistun version viite- ja väiterekisterit: 1191 lähdettä, 47 aliasta, rekisteritarkistus 0 virhettä / 14 olemassa olevaa varoitusta. Varoitukset koskevat DKC:n V1–V10-täysvalidoinnin porttia; ne eivät ole tämän auditin este tai koko sivuston julkaisukielto. Tarkistukset ovat tiedostojen, tietueiden, alias-/käyttöindeksien, määrien, kohteiden ja versioerojen staattinen auditointi. P:n aiemman julkaisun testituloksia ei ilmoiteta tämän auditin uusina testisuorituksina.

## 8. Päivitysjärjestys nykyisten tutkimusten pohjalta

1. **P:n ja W:n erot säilyttäen lähtöpohja P:hen.** W:n lisäaineisto poimitaan tarkasti. Ei kokonaistiedostojen kopioimista W:stä P:n 35 uuden väitteen, 55 evidenssisuhteen, uudemman graafin ja headerin päälle.
2. **Lähdeidentiteetit ja alikäytetyt nykyartikkelit ensin.** Korjataan CACNA1D-artikkelin tulkintalokerointi, ratkaistaan Timothy/Buddell-duplikaatti, lisätään puuttuvat bibliografiset tunnisteet ja kootaan käytössä olevien Young/Patke/CAMK2A/B-artikkelien tutkimusketjut. Uusille perheille käytetään jo julkaistuja koe- ja hoitovastetutkimuksia.
3. **Mekanismiväitteet ennen laajaa proosaa.** Taulukko: geneettinen muutos → mitattu kohteen toiminta → solutila → funktionaalinen päätepiste → olemassa oleva rescue. Omiksi väitteiksi erotetaan mm. CatSper/PLCZ1/implantaatio sekä ER-varasto/solun stressinsieto. Näyttö ei kiinnity virheellisesti nykyiseen tarkasti rajattuun altistusväitteeseen.
4. **Tutkimusketjujen synteesi.** Muodostetaan nykyiseen F/H/θ-rakenteeseen yhteiset tulkinnat: portituksen suunta, kompartmentti, reservi, pulssi/vaihe, energiasta riippuva halu ja sarjaportti. Kirjataan tutkimus- ja aineistoperheiden yhteisyys. Geenitutkimuksesta ei tehdä koko fysikaalisen ketjun uutta riippumatonta reittiä.
5. **Sivuston ymmärrettävä kuvaus.** Biologia-/modulooma-/koordinaatiosivujen yhteisperiaate, elinsivujen täsmennys, käyttäytymisen energiasignaali/halu, lisääntymisportit. Timothy-reitti ja fenotyyppitaulukko säilyvät löydettävinä. Näyttö-konvergenssisivu kokoaa koko tutkimussarjan.
6. **Atlas ja hakusanat.** Liitetään väitteet oikeisiin solmuihin, sairaudet hakualiaiksi, lähteet lähdetietueiksi. Mahdollinen uusi aktivaatioportti kulkee kanonisen mallin viennin kautta. Pelkkä artikkeliosio ei lisää biologisia syysolmuja.
7. **Peilit, rekisteri- ja sisältötarkistukset.** Generointi vasta lähdetietojen jälkeen. Varmistetaan aliasidentiteetti, kaaret, näkyvät lähdelinkit, kieliversiot, nykyisten reittien säilyminen ja header. Julkaisu kuuluu myöhempään toteutusvaiheeseen.

Tämän auditin konkreettinen kattavuus on kymmenen pyydettyä mekanismiperhettä, 44 tärkeintä sivusto-/komponenttikohdetta, 33 keskeisen lähteen P/W-käyttö- ja rekisterimatriisi, kolme näyttörekisteriä, viisi argumentaatioreittiä, kanoninen graafi ja atlasliitokset sekä generaattori- ja testiriippuvuudet. Puute on ennen kaikkea tutkimusten ja väitteiden rakeisuudessa ja keskinäisissä linkeissä: osin vahva näyttö on jo näkyvissä mutta rekisterin ulkopuolella, osin se on bibliografiassa ilman käyttöä, ja osin oireyhtymän ihmisperäinen tutkimus puuttuu kokonaan, vaikka sen biologinen mekanismi on jo mallissa.
