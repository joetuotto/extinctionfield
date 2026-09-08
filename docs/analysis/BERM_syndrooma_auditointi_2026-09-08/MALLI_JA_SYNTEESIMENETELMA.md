# BERM: mallin vaikutusauditointi ja olemassa olevan näytön koostaminen

Päiväys: 8.9.2026. Tehtävä on nykytilan auditointi ja vahvimman perustellun mekanismisynteesin rakentaminen. Uusien laboratorio- tai kenttäkokeiden tekeminen ei kuulu tähän vaiheeseen. Tuotantomallia tai sivustoa ei muuteta tässä auditissa.

## 1. Tarkastettu versio ja tarkastuksen laajuus

Pääasiallinen toteutuksen lähde on `/Users/ottojuote/.berm-navigation-repair-20260908`, commit `0840703960d8c044d4224c0fd6e1d963f5ac5a3a`. GitHubin main-viite tarkistettiin ja se vastasi tätä committia. Työkansio `/Volumes/kovalevy 3/extinctionfield` on commitissa `7a938dd3b528a76008557632fdaf0dca72e13dea` ja sisältää paljon keskeneräisiä muutoksia. Sen HEAD ei kuvaa julkaistun toteutuksen tarkkaa sisältöä.

Automaattinen vertailu kattoi mallikoodin, mallidokumentit ja testit, evidenssitiedostot, sivuston sivut, komponentit, kirjastot, datan, julkiset datapeilit ja generaattorit. Julkaisulähteessä oli 743 tiedostoa; työversiossa 696. Tiedostoista 566 oli samoja, 130 erosi ja 47 oli vain julkaisulähteessä. Nämä ovat määritellyn lähdekoodiotoksen lukuja, eivät koko levyn tiedostomääriä. Täydellinen tarkistesummavertailu: `VERSION_VERTAILU.json`; erot: `VERSION_EROT.csv`.

Mallin hakukorpus kattoi kaikki Python-moduulit, mallidokumentit, testit ja vientiskriptit. Hakusanat ja laskentatapa ovat `audit_inventory.py`:ssä. Osumia löytyi julkaistun version 229 tiedostosta, mukaan lukien laajat jatkovaikutushakusanat kuten ASFR ja kalenteri. Osuma on tarkastusehdokas, ei osoitus siitä, että lähde tai mekanismi on kuratoitu malliin. Keskeiset toteutukset luettiin erikseen alla olevan taulukon mukaisesti.

## 2. Fysikaalinen lähtö ja biologisen synteesin paikka

Lindgrenin vuoden 2025 alkuperäisjulkaisun yhtälö (5) on `g = eta + A ⊗ A`. BERM:n käyttämä κ on erikseen nimetty skaalakonventio. Vuoden 2021 singularinen muoto ei korvaa tätä lähtökohtaa. [Ensisijainen teksti](https://www.preprints.org/manuscript/202503.2321), [julkaistu versio](https://doi.org/10.1088/1742-6596/2987/1/012001).

Kun `A = A_b + a`, seuraa täsmällisesti

\[
\Delta g_{\mu\nu}=\kappa(A_{b\mu}a_\nu+a_\mu A_{b\nu}+a_\mu a_\nu).
\]

Kyse on tensorista. Vasta nimetty vasteoperaattori määrittää kontraktion. Nykyinen BERM tuo eksplisiittiseksi lisäoletukseksi aine–metriikka-kytkennän ja kausaalisen biologisen vasteen:

\[
\delta S_m=\tfrac12\int\sqrt{-g}\,T^{\mu\nu}\delta g_{\mu\nu}\,d^4x,
\qquad r_j(t)=\int_{-\infty}^t\Xi_{j,R}^{\mu\nu}(t,t';S)\Delta g_{\mu\nu}(t')dt'.
\]

\[
q_j=q_{j,0}+G_jr_j,\qquad \dot x=F_p(x,q,v,t;\theta_p),\qquad Y_k=H_{k,p}(x).
\]

Metriikan tunnistus on L0-premissi, tensorilaajennus L1-seuraus, nimetty vasteydin L2-silta ja biologinen dynamiikka F sekä havainto H ovat tuotuja toteutumia. Xi:n gauge-resepti, yksiköt ja fysikaalinen skaala eivät määräydy sairaustutkimuksista. Tämä raja ei estä biologisen ketjun koostamista tai havaittujen vasteiden käyttämistä ehdollisen kokonaisoperaattorin rajoitteina.

Geneettinen muutos voidaan paikantaa muutokseen `Δθ`, kenttäprotokollan vaikutus muutokseen `Δq`. Paikallisesti

\[
\delta\dot x=J\delta x+B_q\delta q+B_\theta\delta\theta,\qquad \delta Y=H_x\delta x.
\]

Sairaus- ja altistuskokeet kohtaavat mitatussa fysiologisessa tilassa tai sen aikakulussa. Niiden ei tarvitse käyttää samaa geneettistä muutosta eikä tapahtua samassa kokeessa. Vertailun on kuitenkin säilytettävä välittäjän identiteetti, mittausoperaattori ja siirtoehdot. Esimerkiksi sähkövirta, kalsiumin kokonaismäärä, ER-varaston pitoisuus ja solulimasta mitattu fluoresenssi eivät ole yksi vaihtokelpoinen muuttuja.

## 3. Mitä on jo toteutettu ja mihin löydöt vaikuttavat

Alla olevat polut ovat suhteessa julkaisulähteen juureen. Rivinumerot viittaavat auditin lähdeversioon. Tarkka symboliluettelo on `MALLI_SYMBOLIT.json`.

| Kokonaisuus ja sijainti | Nykyinen toteutus | Löytöjen vaikutus ja tarvittava täydennys |
|---|---|---|
| `berm/berm/physics/lindgren_tensor.py`; `physics/lindgren_response.py:52,86,244` | Tensorihäiriö, monisyötesekoittuminen, viiveellinen kontraktio | Säilytetään lähtö. Sairausdata rajoittaa downstream-vastetta; sitä ei vaihdeta κ:n tai Xi:n mittaukseksi. |
| `berm/docs/pharmacology-conditional-derivation.md:1–88` | Eksplisiittinen L0→L2→portti→F→H-johto ja variatioyhtälö | Geneettinen parametri-interventio voidaan lisätä saman johdon rinnalle. Uutta fysikaalista perusmallia ei tarvita. |
| `berm/berm/modulome/intervention_protocol.py:29–65,137,345,540` | Paikalliset L- ja T-kanava-alueet, bulk/ER/mitokondrio, kanavamäärä, signed ports, lääke- ja esikäsittelyhaarat, havaintosuureet | CACNA1D, RyR2, Darier ja Wolfram täydentävät nimettyjä protokollaprofiileja ja parametrirajoitteita. Geneettinen muutos kuuluu parametriin/kanavaan; ei erilliseen lopputuloksen kertoimeen. |
| `berm/data/evidence/intervention_profiles_v1.json`; `berm/export_intervention_profiles.py`; `berm/export_interventions.py` | Protokollien evidenssikuvaukset ja generaattorit | Lisää julkaistujen kokeiden kohde, tausta, välittäjä, vaste, korjaus/ohitus ja aineistoperhe. Esimerkkisimulaatio ja empiirisesti sovitettu profiili erotetaan. |
| `berm/berm/modulome/calcium.py:49,63,153,184` | Sytosoli–ER–mitokondrio, RyR/SERCA/MCU, varastokierron ja myöhemmän virtamuutoksen erottelu | Darier ja CPVT antavat rakenne- ja suuntarajoitteita jo olemassa olevaan dynamiikkaan. Tarkka ajan rakenne, huippujen välit ja palautumiskäyrä ovat lisättävissä havaintopiirteisiin. |
| `berm/berm/modulome/state.py:66,90,187` | Vastaanottovalmius, korjauskapasiteetti, vauriokuorma; myös glutathione_ratio ja challenge_tolerance | Darier 2026 ankkuroi eron perustilan ja toimintareservin välillä. GSH-pitoisuus ja GSH/GSSG-suhde eivät ole sama mittari: sanastoa laajennetaan lähteen mittauksen mukaan. SERCA-vajaus ei suoraan kalibroi yhtä yleistä A-arvoa. |
| `berm/berm/modulome/feedback.py:101`; `modulome/window.py` | Palaute suhteessa palautumisnopeuteen; eksplisiittinen toimintaikkuna | Darier/WFS1 täydentävät palautteen biologista sisältöä. Solukuolema ja elinkelpoisen solumassan menetys tarvitsevat oman tilan, jos niitä käytetään; pelkkä stabiilin lineaarisen palautteen vahvistuminen ei tee muutoksesta pysyvää. |
| `berm/berm/modulome/membrane.py`; `modulome/cards.py:189,273,494` | Kalvon tila sekä jo julkaistut RyR/SERCA-, CRY- ja CACNA1C-kortit | KATP-ketju tarvitsee ATP/ADP–kaliumjohtavuus–kalvojännite-kytkennän. STIM1/ORAI1 tarvitsee varastovajeen ohjaaman Ca-sisäänvirtauksen; sitä ei saa nimetä L-tyypin VGCC-kanavaksi. |
| `berm/berm/biology/individual_susceptibility.py:25,38,107` | Vanha DIAGNOSTIC_ONLY-genotyyppi/GST/anatomia-kerroin | Uusi sairausnäyttö auttaa korvaamaan geneerisen herkkyyskuvauksen kohdekohtaisilla parametreilla. Nykyiset AA=1.4 ja AG=1.15 eivät muutu sairaustutkimuksilla mitatuiksi kenttäkertoimiksi. Todellinen genotyyppi×RF-EEG-tutkimus arvioidaan omana protokollanaan. |
| `berm/berm/modulome/photostate.py`; `biology/cry.py` | Laji/CRY-alatyyppi, flaviinitila ja valohistoria | CRY1-Δ11 ja CRY2-A260T rajaavat kelloproteiinin palaute- ja hajoamisdynamiikkaa. Sama proteiinin nimi ei yksin yhdistä kellovirhettä mitatuksi magneettiseksi vastaanottoviaksi. |
| `berm/berm/biology/coordination.py:42,78,123,152,218,255` | Vaihe-erot, harmoninen hormonisignaali×vastaanottavuus, redox-ikkuna, palautuminen, ehdolliset portit | Smith–Magenis täydentää eri ulostulojen vaihe-erottelua. TAC3/TACR3 tuo erillisen pulssitaajuuden ja aivolisäkkeen dekoodauksen. Nykyinen samantaajuisten siniaaltojen keskituote ei vielä ole GnRH/LH-pulssimalli. |
| `berm/berm/biology/androgen_capacity.py`; `diagnostics/lh_t_diagnostic.py`; `diagnostics/melatonin_fertility_bridge.py` | Sitoutuminen, vapaa hormoni, reseptori ja sen jälkeinen välitys; keskushermosto-/sukurauhaspaikannus | Leptiini- ja TAC3-kokeet täydentävät upstream-säätelyä. Yhden hormonin pitoisuus erotetaan pulssituksesta ja kohdevasteesta. |
| `berm/berm/biology/fertilization_cascade.py:1,36,49,83` | Arkistoitu kuusivaiheinen skenaario; CatSper2021-abstraktin tarkka rajaus | Young2024 on jo tiedossa. PLCZ1 erottaa munasolun aktivaation siittiön hyperaktivaatiosta ja kuoren läpäisystä. Vanhan skenaarion kuutta kerrointa ei päivitetä CatSperin yhdellä efektillä. |
| `berm/berm/biology/reproductive_state.py:380,431,512`; `modulome/reproductive_bridge.py:22,85,252` | Miehen/naisen/parin kapasiteetti; paikallisen solutilan nimetty funktionaalinen siirto | Katkaiseva portti, sen toiminnallinen ohitus ja myöhempi implantaatio tarvitsevat erilliset päätepisteet. Nykyinen piirrelista sisältää huipun/lopputilan, muttei kaikkia pulssiajoituksen suureita. |
| `berm/berm/outcomes/reproductive_waiting.py`; `outcomes/reproductive_calendar.py:19,42`; `model_modulome_asfr.py` | Heterogeeniset odotusajat, parity/kalenteri, raskaus- ja toipumisajat | Uusi tieto muuttaa fysiologisen kapasiteettisyötteen rakennetta ja jakaumaa. Odotus-/kalenterioperaattorit ovat jo olemassa; niitä ei rakenneta uudestaan eikä samaa porttia kerrota toiseen kertaan. |
| `berm/berm/biology/cross_pathway_synthesis.py:56,94` | Nimetyt monilähdesynteesit, järjestetty polku, relaatiot ja synteesin lisäarvo | Tämä on uusien mekanismikokonaisuuksien ensisijainen koti. Täydennä nykyisiä klustereita; vältä rinnakkaista oireyhtymärekisteriä, joka laskisi samat lähteet uudestaan. |
| `berm/berm/evidence_constraints.py:49,102,121,161`; `berm/data/evidence/fieldstate_evidence_constraints_v1.json` | Rakenteelliset, protokollakohtaiset ja synteesiä tukevat prioriperheet; siirtosignatuuri | Jo toteutettu väylä käyttää osatutkimuksia myönteisesti ennen kokonaiskerrointa. Lisää tutkimuskohtaisia suunta-, vaste-, viive- ja vastaanotintilarajoitteita. |
| `berm/berm/prediction/behavioral_factor.py:25`; `prediction/two_level_model.py` | Historiallinen testosteronisarjaan perustuva ajallinen käyttäytymiskerroin | Leptiinin ja kisspeptiinin kokeet tarkentavat halun/arvottamisen mekanismia. Niistä ei sellaisenaan saada historiallista TFR-aikakerrointa; jatko käyttää nimettyä käyttäytymispäätepistettä ja aineistoa. |
| `berm/berm/civilization/epistapege.py:59,85,104`; `interactions/social.py:82,147` | Yksilötilan ehdollinen käyttäytymisjakauma, populaatiosekoitus, verkostovälitys, institutionaalinen muisti | Hormonikokeet vahvistavat biologinen tila→käyttäytymisen painotus -siirtymää. Raportit, pariutuminen, normit ja instituutiot liittyvät sen jatkoksi olemassa olevin erillisillä aggregaatioilla ja empiirisillä aineistoilla. |
| `berm/docs/cognitive-narrative-integration.md`; `berm/docs/berm-state-conditioned-multiscale-closure.md` | Biologisesta tilasta motivaatioon, narratiiviin ja instituutioihin koostettu selitys | Muotoile nykyvaiheen tehtävä olemassa olevan longitudinal-/interventiodatan uudelleenkäytöksi. Yhden uuden koko ketjun kokeen odottaminen ei ole rakenteellisen synteesin ehto. |
| `berm/berm/biology/causal_registry.py`; `berm/export_causal_graph.py` | Semanttinen solmutopologia, joka tuottaa sivuston graafin | Yleinen kalsiumkierto, erityssignaali ja peräkkäiset hedelmöitysportit tarvitsevat täsmälliset kohteet. Kunkin sairauden ei tarvitse saada omaa top-level-solmua. |
| `berm/data/registry/parameter_registry.csv`; `data/schemas/parameter_registry.schema.json` | Parametrien arvo, yksikkö, lähde, soveltamisala, status | Lisää vain lähteestä poimittu tai avoimesti koostettu parametri nimetyllä kohteella ja epävarmuudella. Nykyiset skenaarioarvot eivät saa periä tutkimuksen statusluokkaa pelkän aiheyhteyden kautta. |

### Toteutuksen tärkeät erot

- **Wolfram/Darierin tarkka laajennusraja:** `intervention_protocol.py:455–461` tuottaa nykyisen vauriokuorman mitokondriostressistä. Erillistä ER-stressin/UPR:n, kalpaiinin tai elinkelpoisen solumassan tilaa ei ole. Pelkkä uusi parametriprofiili riittää vain nykyisen kalsiumdynamiikan kuvaamiseen; UPR/solukuoleman sisällyttäminen tarvitsee nimetyn biologisen reitin laajennuksen.
- **KATP/SOCE-puutteen tarkka luonne:** KATP→Vmem→VGCC on jo haimasivun tekstissä ja CRAC/Orai1 Timothy-sivulla. Puuttuva osa on näiden täsmällinen laskennallinen dynamiikka ja sairauskohtainen näyttösidos, ei käsitteen täydellinen puuttuminen sivustolta.
- **Jo toteutettu:** kalsiumin erilliset tilat, vastaanottovalmius/korjaus/kuorma, viiveellinen vaste, yksilöllinen heterogeenisyys, hormonin ja kudosvasteen ajoitus, odotus- ja kalenterioperaattorit sekä monilähdesynteesin tietorakenne.
- **Täydennettävä:** näiden tilojen sairaus- ja interventiokohtaiset evidenssisidokset, signaalin aaltomuodon lisäpiirteet, KATP- ja SOCE-dynamiikan eksplisiittinen paikka, pulssidekoodaus ja porttien erittely.
- **Säilytettävä ero:** yksinkertainen `simulate_calcium` käyttää ei-negatiivista ehdollista biologista ajuria; laajempi `intervention_protocol` tukee etumerkillisiä kenttäportteja. Tätä ei pidä auditoida ikään kuin mallissa olisi vain yksi kalsiumsimulaattori.
- **Säilytettävä ero:** vastaanottovalmius on normalisoitu tila. Kanavan gain-of-function ei automaattisesti tarkoita `receptor_readiness > 1`; kohdekohtainen johtavuus, inaktivaatio, kynnys tai kanavamäärä voi olla oikea parametri.

## 4. Olemassa olevan näytön koostamisen täsmällinen menetelmä

### 4.1 Haetaan puuttuvaa yhteyttä kolmessa suunnassa

1. **Altistuksesta eteenpäin:** mitä fysiologista suuretta kenttäprotokolla jo muutti? Esimerkiksi kalvovirta, piikkitaajuus, ER-varasto, geenin ilmentyminen, hormonipulssi tai käyttäytymisvaste.
2. **Sairaudesta taaksepäin:** mikä täsmällinen muutos synnytti seurauksen ja mikä korjaus tai ohitus palautti toimintaa?
3. **Yhteisestä suureesta sivusuuntiin:** löytyykö riippumaton normaali-/potilassolu-, lääke-, geneettinen tai hormonaalinen koe, joka mittaa saman suureen suhteen seuraavaan päätepisteeseen?

Lopputulos luokitellaan: samaan kokeeseen sisältyvä ketju; useasta kokeesta koostettu mekanismisynteesi; protokollan tai kudoksen siirtoon ehdollinen yhteys; vielä paikantamaton yhteys. Viimeinen luokka sisältää hakulokin ja lähimmät mitatut suureet. Se ei tarkoita automaattisesti uuden kokeen tilausta.

### 4.2 Liitosavain on mitattu suure ja sen konteksti

Jokaisesta tutkimushaarasta tarvitaan vähintään:

| Kenttä | Esimerkki tai tarkoitus |
|---|---|
| `reference_id`, DOI, `dataset_family_id` | Artikkeli ja myöhempi uudelleenanalyysi erotetaan; saman aineiston kaksinkertainen evidenssipaino estetään. |
| Laji, kudos, solutyyppi, kehitysvaihe, genotyyppi/isoformi | Määrittää biologisen siirron ehdot. |
| Altistusluokka ja mitattu protokolla | DC, ELF, PEMF, RF, optinen valo ja lääke/hormoni pysyvät erillisinä. |
| Tausta, kenttäsuunta/aaltomuoto, voimakkuus, kesto ja mittaushetki | Ei oleteta SI-yksikköjen tai protokollan yhteensopivuutta pelkästä EMF-sanasta. |
| Välittäjä, solunsisäinen paikka, yksikkö, havaintomenetelmä | Esim. ER-Ca ja sytosoli-Ca erikseen; GSH ja GSH/GSSG erikseen. |
| Kontrasti, vaikutus ja epävarmuus | Absoluuttinen/relatiivinen muutos, parittainen/ryhmien välinen, puuttuva vs nolla. |
| Aikapiirteet | Viive, huippu, pulssiväli, decay, palautuminen, ennen altistusta vallinnut tila. |
| Interventio ja sen kohde | Palautus, estäminen, geneettinen korjaus tai toiminnon ohitus ovat eri kokeita. |
| Saatavilla oleva aineisto | Yksilödata, source-data-taulukko, kuva-aikasarja, supplementin yhteenvedot tai artikkelin kuviot. |
| Mallikohde ja siirtooletus | Mikä F:n, H:n, θ:n tai ehdollisen kenttävasteen osa rajoittuu? |

Taulukko on poimintamäärittely, ei jo olemassa oleva uusi tuotantoskeema. Ensin kannattaa hyödyntää `EvidenceSynthesisCluster`, `EvidenceSourceProfile`, nykyinen parametrirekisteri ja väite–lähdesuhteet.

### 4.3 Mitä voidaan päätellä määrällisesti ilman uutta koetta

Saman tutkimuksen kontrolli-/interventiohaaroista voidaan poimia etumerkkejä, kynnyksiä, puoliaktivoitumisjännitteitä, kalsiumaikavakioita, normalisoituja vasteita ja funktionaalisen ohituksen tuloksia. Samasta julkaistusta aineistosta voidaan laskea uusi piirre, kuten pulssitaajuus tai palautumisaika. Tällöin kyse on uudelleenanalyysistä, ei uudesta riippumattomasta replikaatiosta.

Tutkimusten yhdistämisen muoto voi olla

\[
E[Y\mid F,C]=\int m(z,C)\,p(z\mid F,C)\,dz,
\]

missä z on yhteinen mitattu fysiologinen tila tai aikakulun piirrevektori ja C säilyttää biologiset/protokollakohtaiset ehdot. Altistustutkimus rajoittaa jakaumaa `p`, geneettinen tai intervention sisältävä jatkotutkimus funktiota `m`. Synteesi tarvitsee eksplisiittisen oletuksen siitä, millä alueella jatkofunktio on siirrettävissä. Geneettinen ääripää ei yksin määritä m:n paikallista kulmakerrointa normaalialueella.

Pienelle poikkeamalle nykyisen BERM:n johdosta seuraa efektiivinen havainto-operaattori `H_x Φ B_q G Xi`. Julkaistu kenttäkoe voi rajoittaa tätä kokonaisuutta; kohdennetut sairaus-/korjauskokeet erottelevat sen biologisia osia. Xi:n itsenäinen tunnistaminen on eri kysymys kuin kokonaisketjun biologisen selitysvoiman lisääntyminen.

Jos määrällinen siirto ei identifioidu, käyttökelpoinen tulos voi silti olla: tietyn välittäjän välttämättömyys tutkitulle vasteelle, etumerkki annetussa tilassa, vasteikkuna, järjestetty viive, paikan rajaus tai tietyn yleisen monotonisen kuvauksen korvaaminen tilasta riippuvalla vasteperheellä. Näitä käytetään aktiivisina rakenteellisina rajoitteina.

## 5. Nykyvaiheen työjärjestystä koskeva löydös

`biology/cross_pathway_synthesis.py` sanoo jo alussa, ettei jokaisen siirtymän tarvitse olla mitattu samassa kokeessa. Sen `discriminator`-kentät kuitenkin painottavat tulevia koko ketjun kokeita. `civilization/epistapege.py:7–9` sanoo lisäksi, että koko reitti pysyy avoimena kunnes se testataan yhdessä pitkittäisasetelmassa. Tämä voi käyttäjälle näyttää ehdolta, joka estää nykyisen synteesin etenemisen.

Nykyvaiheessa täsmällisempi dokumentointitapa on erottaa:

- **nyt koottava selitys:** olemassa olevat osatutkimukset, niiden yhteiset välittäjät ja koostettu päätelmä;
- **nyt tehtävä laskenta:** julkaistujen aineistojen poiminta, harmonisointi, uudelleenanalyysi ja herkkyys-/rajatarkastelu;
- **jäljelle jäävä oletus:** nimetty ja perusteltu siirto, jonka varassa synteesi etenee;
- **myöhempi tutkimusohjelma:** mahdollinen suora koko ketjun koe, jota ei aseteta tämän vaiheen työlistan ensimmäiseksi tehtäväksi.

Tämä täsmentää juuri käyttäjän korjaamaa kohtaa. Nykyinen lähdehaku ei saa päättyä siihen, että saman välittäjän sisältävää uutta kenttäkoetta ehdotetaan ennen olemassa olevien aineistojen läpikäyntiä.

## 6. Toteutusjärjestys auditin jälkeen

1. Käytä julkaistua sisältöä oikeana lähtöversiona; huomioi erilliset työversion muutokset menettämättä niitä.
2. Ratkaise kanoniset lähdeidentiteetit, aliasvirheet ja tutkimusperheet.
3. Kirjaa jokaiselle ketjulle yhteiset mitatut suureet ja saatavilla olevat aineistot.
4. Täydennä nykyisiä synteesiklustereita, lähderajoitteita ja väitteitä; muuta graafia vain, jos semanttinen portti puuttuu.
5. Poimi julkaistuista tuloksista määriteltävissä olevat parametrit/rajoitteet. Merkitse luvun luonne: mitattu, uudelleen laskettu, kirjallisuudesta koostettu tai havainnollistava.
6. Muuta mallikoodia vain niiltä osin kuin uusi mitattu mekanismi ei mahdu nykyiseen tilaan/porttiin. Erityisiä ehdokkaita ovat SOCE, KATP, GnRH-pulssidekoodaus ja PLCZ1-aktivaatio.
7. Vie sama kokonaisuus evidenssisivuille, elinsivuille, mallin biologiseen koordinaatioon, käyttäytymiseen ja aggregaatioihin. Luo yksi kanoninen mekanismikokonaisuus ja useita siihen viittaavia esityksiä.
8. Tarkista generaattorit, peilien yhtäpitävyys, ankkurit, kieliversiot ja mekanismisidosten testit. Testien läpäisy tarkoittaa toteutuksen eheyttä, ei empiiristä todistamista.

## 7. Tarkistukset

Auditin yhteydessä ajetut nykyisten mallisopimusten ja rekisterien tarkistukset kirjataan erillisiin `MALLI_TARKISTUKSET.json` ja `SIVUSTO_TARKISTUKSET.json` -tiedostoihin. Auditissa ei muuteta ennustelukuja, tuotannon lähderekistereitä tai verkkosivustoa. Uusi tuotantoa koskeva toteutus on tämän sijainti- ja evidenssikartan perusteella erikseen tehtävä työ.
