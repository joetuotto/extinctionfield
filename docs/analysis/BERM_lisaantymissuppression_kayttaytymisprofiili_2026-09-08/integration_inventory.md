# Lisääntymissuppression käyttäytymisprofiili: nykytilan integraatiokartta

Päiväys: 8.9.2026. Auditointi on tehty alkuperäisessä työtilassa `/Volumes/kovalevy 3/extinctionfield` ja vertaamalla tiedostoja uusimpaan `origin/main`-versioon `9b7dbc600bc8e2cac616e291fb3a72592fd8cef3`. Sama tunniste tarkistettiin etäpalvelimen `refs/heads/main`-viitteestä. Tässä ei muutettu mallia, sivustoa eikä lähderekistereitä. Tämä raportti on ainoa tämän osatehtävän kirjoittama tiedosto. Verkkosivun ajonaikaista tuotantotilaa ei päätellä pelkästä Git-versiosta.

Tarkasteltu liite: `/Users/ottojuote/.codex/attachments/3394ce1e-0076-49bd-b4ca-4d4b852d76d3/pasted-text.txt`. Liitteen tutkimustulkinnat ovat integraatioehdotuksen aineistoa; niiden lähteiden paikkansapitävyyttä ei tässä lähdekoodiauditoinnissa esitetä itsenäisesti varmennettuna. Päätehtävä tekee kirjallisuustarkistuksen. Liitteen sisäiset toteutus- ja koeehdotukset eivät ole toteutusvaltuutus.

## 1. Tärkein tulos

Kokonaisuutta ei tarvitse tuoda BERM:iin uutena rinnakkaisena teoriana. Sivustolla on jo kahdeksan käyttäytymisakselin kehys, biologisen tilan ja motivaation erottelu toimintakyvystä, hoivan omat komponentit, neljä proxy masking -tasoa ja yksilöstä verkostoihin etenevät operaattorit. Uuden aineiston suurin lisäarvo on täyttää **yhteisen biologisen tilan, lisääntymisen käynnistymisen ja hoivan kohdentumisen väliset mekanismisillat** eläinten tilasiirtymäkokeilla ja eriytyneillä hormonien kohdereiteillä.

Selvin rakenteellinen integraatioaukko on esitysten välillä: kanonisen graafin käyttäytymishaara jatkuu vain narratiiviseen ja institutionaaliseen havaittavuusketjuun, vaikka sivuston käyttäytymissivu ja Atlas-laajennus jo liittävät biologiset motivaatiot lisääntymisen yrityksiin ja mahdollisuuksiin. Korjaus ei edellytä kahdeksaa uutta tilaparametria tai uutta TFR-kerrointa.

Hoivan säilyminen tai voimistuminen voi olla mallin kannalta informatiivinen **eriytynyt vasteprofiili**. Se auttaa erottamaan lisääntymisen endokriinisen käynnistymisen, seksuaalisen lähestymisen, hoivakontaktin ja toteutuneen hedelmöittymisen toisistaan saman biologisen järjestelmän ulostuloina. Tämän osoittamiseen kohdereittien kokeet ovat käyttökelpoisempia kuin pelkät väestötrendien samanaikaisuudet.

## 2. Alkuperäisen ja uusimman version säilyvyys

Seuraavat tämän auditoinnin keskeiset tiedostot ovat alkuperäisessä työtilassa ja `origin/main`-versiossa tavutasolla samat:

- `website/app/[locale]/behavior/page.tsx`.
- Sivilisaation etusivu sekä `pathopege`, `patopolis`, `pathopolites`, `patokinesis` ja `epistapege`-sivut.
- `website/app/[locale]/model/biological-coordination/page.tsx`.
- `website/components/ProxyBehaviourEvidence.tsx` ja `ProxyMaskingLevels.tsx`.
- `website/lib/navigation.ts`, `website/data/causal-graph.json`, `causal-atlas-extensions.json` ja `claims.json`.
- `berm/berm/biology/coordination.py`, `causal_registry.py`, `berm/berm/civilization/epistapege.py`, `political_biology.py` ja `berm/berm/prediction/behavioral_factor.py`.

`website/app/[locale]/model/proxy-masking/page.tsx` eroaa vain komponenttijärjestyksessä: alkuperäisessä `RedoxReserveMasking` on `ProxyMeasuredExposureEvidence`- ja `ProxyInfrastructureEvidence`-komponenttien jälkeen; `origin/main`-versiossa ennen niitä. Tässä kohdassa ei ole sisältöeroa tai kadonnutta integraatiota. Muu työtilan keskeneräinen työ jää tämän rajatun vertailun ulkopuolelle.

Nykyiset rekisterikoot: **47 kanonista solmua, 97 kanonista reunaa; Atlas-laajennuksessa 104 solmua ja 365 reunaa; 111 claimia, 273 evidenssirelaatiota, 111 epistemic assessment -tietuetta ja 5 koostettua reittiä; 1 274 indeksoitua kirjallisuusviitettä.** Atlas-laajennuksen lukumäärät ovat laajennustiedoston tietueita, eivät väite koko käyttöliittymän deduplikoidusta solmumäärästä.

## 3. Sivuston täsmällinen vaikutuskartta

| Nykyinen sijainti | Jo toteutettu kattavuus | Täydennyksen oikea tehtävä |
| --- | --- | --- |
| `/behavior#valuation`; lähde `website/app/[locale]/behavior/page.tsx`, COPY ja renderöinti noin 114–130 | Biologinen tila muuttaa palkkion, vaivan ja uhkan painotuksia myös toimintakyvyn säilyessä. Westbrook 2020, Jurgelis 2022 ja Draper 2018. | Näytä eläinten status-/suppressionmuutokset saman ehdollisen arvottamisen käyttötilanteina; pidä lähestyminen ja kyky eri havaintoina. |
| `/behavior#desire` | Seksuaalinen lähestyminen, vastaanottavuus, kiihottuminen, kiintymys, lapsen haluaminen ja hoiva nimetään erillisiksi ulostuloiksi. Yrityksen toteutuminen ja yrityksen onnistuminen ovat kaksi kytkeytyvää haaraa. Finkelstein 2013 ja Mills 2023. | Pääasiallinen koti lisääntymisen säätelylle ja suppression/vapautumisen komponenttimatriisille. Tähän sopii PRL–kisspeptiini–LH-haaran rinnastus erilliseen PRL–hoivapiiriin, jos lähdetarkistus vahvistaa esitetyt tutkimukset. |
| `/behavior#learning` | `L[t+1] = U(L[t], feedback; S[t])`; biologinen tila painottaa oppimista ja oppiminen voi säilyttää vaikutusta akuutin muutoksen jälkeen. Westbrook 2025, Lim 2026. | Hoivakontaktin ja sosiaalisen tilanteen opittu merkitys; suppression poistumisen jälkeisen käyttäytymisen viive selitetään olemassa olevalla muistikerroksella. |
| `/behavior#reasons` | Valinnan ja myöhemmin ilmaistun perustelun ajallinen erottelu, Johansson 2005 ja Eisenegger 2010. | Linkitä profiilin eri ulostulot koettuihin syihin. Älä lisää toista tulkitsijateoriaa. |
| `/behavior#social` ja `#joint-action` | Sosiaalisen arvottamisen komponentit sekä yhden toimijan tilan vaikutus toiseen. Weisman 2012 ja verkostoaineistot. | Hoivan kohde, hoivakontaktien saatavuus, sosiaalinen palaute, vertaisaltistus ja perheellistymisen ajoitus. |
| `/model/proxy-masking#receiver-state`; `ProxyHumanSensoryEvidence`, `ProxyBehaviourEvidence.tsx:95` | Vastaanottajan tila, vauvan hajun käsittely, kosketus, isä–lapsi-vuorovaikutus; Khallaf 2026:n queen odour -komponentti sekä Marlin 2015/Carcea 2021 hoivaoppiminen sivun tekstissä. | Vertaa vapauttavaa ja estävää sosiaalista vihjettä; sama signaalin heikkeneminen ei määrää samaa ulostulosuuntaa eri kohdereiteissä. |
| `/model/proxy-masking#experienced-reasons`; `ProxyInterpreterEvidence`, komponentti noin 121 | Gazzaniga, valintasokeus, aikeen kokemus, Pew 2024:n täsmällinen otos. | Linkitä motivaation omakohtainen kokemus eläin-/ihmiskomponentteihin ajallisen ketjun kautta. Pew:n 57 % ei muutu hormonimittaukseksi tai biologisen tilan diagnoosiksi. |
| `/model/proxy-masking#syndrome-fragmentation`; `ProxySyndromeEvidence`, komponentti noin 138 | Kaikki kahdeksan akselia ovat jo taulukossa: hoiva, läheisyys/liikkuminen, stressi, seksuaalinen motivaatio, signalointi, sosiaalinen palaute, hormonitila ja vaivannäkö. | Lisää jokaiselle relevantille akselille lähdetarkistettu eläinkomponentti, ihmiskomponentti, yhteinen mitta ja ehdollinen suunta. Taulukon rinnalle yhteismittauksen tila: sama koe, sama aineisto, eri aineistojen synteesi. |
| `/model/proxy-masking#demographic-explanations`; `ProxyDemographicEvidence` | Nykyinen 23 demografisen selityksen koostaminen ja `claim.proxy.demographic-route-composition`. | Käytä profiilia yrityksen, parisuhteen muodostumisen ja ajoituksen biologisen osuuden selittämiseen olemassa olevan dekomposition sisällä. |
| `/model/biological-coordination#receptor-state`, `#cry-endocrine`, `#biological-memory`, `#tissue-timing` | Hormonin määrä, aaltomuoto, vastaanottajan tila, kudosvaihe ja muisti on eroteltu. | PRL:n kahden kohdereitin avulla näkyvä esimerkki siitä, miten yksi signaali voi tuottaa lisääntymisakselin suppression ja hoivakontaktin vahvistumisen. Tämä täydentää nykyistä Ca/redox/kello/HPG-ketjua. |
| `/model/biological-coordination#functional-gates`, `#successful-encounters` | Toiminnalliset portit, parin onnistuminen, odotusajan jakauma ja toimijoiden yhteinen kohtaaminen. | Pidä yrityksen alkaminen, kohtaamisen ajoitus ja biologinen onnistuminen eri kohtina. Hoiva tulee myös onnistuneen kontaktin ja lapsen syntymän jälkeiseen haaraan. |
| `/evidence/convergence#reproductive-motivation`, `#network`, `#shared-state`, `#data` | Seitsemän tutkimusyhteyttä; yhteinen tilavektori, osatutkimukset ja mikro–makro-yhteydet. | Koostettu uusi eläin–ihminen-vertailu kuuluu ensisijaisesti näihin nykyisiin kohtiin; reittien lukumäärää ei tarvitse kasvattaa vain uuden kirjallisuusperheen vuoksi. |
| `/civilization/pathopege`; `page.tsx:1124`, `1275`, `1356`, `1395` | Kaksi häiriötä, miespuolinen Triple Lock, naisten rinnakkaishaara ja palautuminen. | Eläinten sosiaalisen suppression/vapautumisen kokeet ja eriytynyt PRL-vaikutus syventävät tätä mekanismitasoa. Sivulla ei ole näille vakaita nimettyjä osioankkureita: lisää ne myöhemmän integraation yhteydessä. |
| `/civilization/pathopolites`; COPY esim. FI noin 215–217, renderöinti 475 alkaen | Hoivan säilyminen suhteessa muihin kuvattuihin profiileihin on jo mukana. | Korvaa pelkkä rinnastus mitattavalla hoivan kohdentumisen kuvauksella: oma lapsi, toisen lapsi, eläin, muu auttamiskontakti. Hoivan kokonaismäärä ja kohdejakauma ovat eri suureita. Ei nykyistä omaa osioankkuria. |
| `/civilization/epistapege#interpreter`, `#three-level-misclassification`, `#epistapege` | Tulkitsija, biologisen syyn katoaminen mittausmallista, instituutioiden selitysten uudelleenkäyttö. | Kahdeksan ulostulon hajautuminen eri tutkimusluokkiin on valmis esimerkkitapaus. **Todellinen lähdetiedosto on `website/app/[locale]/about/civilization/page.tsx`; epistapege/page.tsx uudelleenvie sen.** |
| `/civilization/patokinesis` | Sosiaaliset signaalit, normien toimeenpano, leviäminen, Calhoun-vertailu, PK-ennusteet. | Sosiaalisen lisääntymissäätelyn eläintutkimukset sekä ihmisten verkostohavainnot kuuluvat palautteen kuvaukseen. Mitattavat sanktiot, kontaktit, status ja yrityksen ajoitus on yhdistettävä ennen yleistä sivilisaatiotulkintaa. Pysyvät osioankkurit puuttuvat. |
| `/civilization/patopolis` | Pariutumissignaalit, neljä lisääntymiskanavaa, ylläpidon/hoivan/oppimisen toistuvat kohtaamiset, biologisen kapasiteetin ja ympäristön takaisinkytkennät. | Tee näkyväksi, että hoiva, pariutuminen ja instituutioiden uusiutuminen voivat reagoida eri tavoin samaan tilaan. `#twelve-predictions` on nykyinen ennusteankkuri, vaikka sisältö on laajentunut; älä riko vanhaa linkkiä. |
| `/civilization`, `/model` | Pathopege–Epistapege–Pathorea–Pathostasis–Patopoliteia-käsitteellinen sarja esiintyy. | Lisää lyhyt synteesi ja linkit varsinaisiin mekanismisivuihin. Älä tulkitse kaikkia nimekkeitä jo toteutetuiksi laskentaoperaattoreiksi. |

### Proxy masking -järjestys on jo nelitasoinen

`website/components/ProxyMaskingLevels.tsx` esittää tilastollisen, sensorisen, fenomenologisen ja episteemisen tason. Viimeiseen on jo liitetty käyttäytymisprofiilin pirstoutuminen. Liitteen ehdotus "neljännen tason" lisäämisestä kuvaa siis nykyisin jo tehtyä työtä. Integraatio syventää nykyistä neljättä tasoa; sitä ei numeroida uudelleen eikä tehdä viidettä tasoa samalla sisällöllä.

### Pathorea, Pathostasis ja neopedomorphosis

Pathorea ja Pathostasis löytyvät käsitteellisestä lukujärjestyksestä (`berm/berm/civilization/epistapege.py:37–38`, mallisivu noin 4731/4747, sivilisaatio noin 298/304, about/civilization noin 145/285 sekä `berm/docs/cognitive-narrative-integration.md:62`). Niille ei löytynyt omia reittejä tai toteutettuja funktioita. Neopedomorphosis-/neopaedomorphosis-/pedomorph- tai neoteny-nimistä toteutusta ei löytynyt tarkastetusta mallin/sivuston lähdekoodista. Niiden operatiivinen määrittely on siis uusi työ. Viivästynyt itsenäistyminen voidaan ensin sijoittaa jo olemassa oleviin vaivannäön, uhkan, riippuvuuden, oppimisen ja ajoituksen havaintoihin ilman uutta universaalia latentin kypsyyden kerrointa.

## 4. Mallikoodin integraatiopaikat ja päällekkäisyyksien välttäminen

| Tiedosto / toteutus | Mitä se jo tekee | Käyttö uudessa integraatiossa |
| --- | --- | --- |
| `berm/berm/biology/coordination.py`: `HormoneReceptivityState` 78, `RedoxFunctionalState` 123, `ReproductiveCoordinationState` 152 | Ajallinen vastaanottavuus, toiminnallinen redox-ikkuna ja olemassa olevan lisääntymisportin korvaava koordinaatiorakenne. | Älä kerro vanhaa porttia uudella samasta fysiologiasta johdetulla suppressionkertoimella. Kohdereitit voivat käyttää jo nimettyä hormoni-/reseptori-/ajoitustilaa. |
| Sama: `recovery_retention` 218, `advance_chemical_memory` 227, `steady_pulse_memory` 242, `conditional_gate_success` 255 | Palautumis- ja muistirakenne, ehdollinen portti. | Suppression vapautumisen viiveille on jo muodollinen koti. Lajin tai koejärjestelyn aikavakio ei ole valmis ihmisen EMF-palautumisaika. |
| `berm/berm/biology/reproductive_state.py`: `MaleReproductiveState` 380, `FemaleReproductiveState` 431, `CoupleReproductiveState` 512 | Sukupuoli- ja parikohtaisen lisääntymistoiminnan biologinen ketju. | Kapasiteetin haara pysyy erillisenä yrityksen todennäköisyydestä. |
| `berm/berm/outcomes/reproductive_waiting.py`: `CoupleWaitingState` 44, `summarize_waiting_cohort` 98; `reproductive_calendar.py`: `CalendarPeriod` 19, `simulate_reproductive_calendar` 42 | Odotusajan ja kalenterin ehdollinen koostaminen. | Uusi käyttäytymisprofiili selittää yrityksen/altistuvan kohtaamisen alkamista ja ajoitusta, ei korvaa hedelmöittymisen todennäköisyyttä. |
| `berm/berm/civilization/epistapege.py`: `BehaviouralStratum` 54, `aggregate_behaviour_probability` 79 | Etusuuntainen `sum_s P(Y|z_s,x_s) w_s / sum_s w_s`; eri tilanteiden vaikutussuunnat voivat olla vastakkaisia. | Yhteisestä tilasta useaan ulostuloon etenevä ehdollinen profiili sopii suoraan tähän. Populaation tulosta ei tarvitse kääntää yksilön biotilan diagnoosiksi. |
| Sama: `institutional_memory_update` 98 | `I[t+1] = rho I[t] + (1-rho) P[t]`; säilyvyys ilmaistaan avoimena parametrina. | Selittää institutionaalisen käytännön tai tulkinnan säilymistä; uutta samansisältöistä muistikerrosta ei tarvita. |
| `berm/berm/interactions/social.py`: `SocialNetwork` 16, `advance_social_state` 82, `InstitutionParameters` 111, `advance_institution_stock` 147 | `delta_b[t+1] = u[t] + beta W delta_b[t]`, verkoston stabiilius ja instituutiovarannon päivitys eksplisiittisine proveniensseineen. | Verkostojen syntyvyys-, hoiva- ja auttamisaineistot voivat rajata jo olemassa olevia operaattoreita. Yhteyden havaitseminen verkostossa ei yksin määritä beta-kerrointa. |
| `berm/berm/civilization/political_biology.py`: `reproductive_suppression_index` 1589 | Neljä nykyistä haaraa: miehen aloite, naisen kiintymys, pariside, vanhemmuuspanos; niiden geometrinen yhdistelmä. T, OXT, BDNF, CORT ja kiinteät diagnostiset kertoimet. | Hoiva↑ / lisääntymisakseli↓ -koe auttaa erottamaan nykyisen aggregaatin sisäisiä haaroja. Sitä ei soviteta lisäämällä uusi koko indeksiä laskeva kerroin. Nykyinen indeksi on scenariorakenne, ei uuden PRL-kirjallisuuden kalibroima estimaatti. |
| Sama: `rk_parental_investment` 1055, `rk_sexual_timing` 1070, `pathopolites_profile` 1939, `pair_signal_compound` 2215 | Hoivaan, ajoitukseen, yhteistoimintaan ja signaaleihin liittyvät nykyiset diagnostiset operaattorit. | Nämä ovat välilliset vaikutuskohdat. Lähdekohtainen signaali ja mitattu ulostulo liitetään oikeaan haaraan, ei koko profiilin kaikkien tunnuslukujen tueksi. |
| Sama: `reproductive_behavior_spectrum` 3028, `effective_fertility_index` 3078, `sacculina_hijacking_index` 3190 | Käyttäytymisspektri ja sen TFR-painotus sekä jo olemassa oleva hoivan uudelleenkohdistumisen Sacculina-analogia. | Uusi eläin–ihminen-kooste ei saa näyttää siltä, että nämä skenaariokertoimet olisi mitattu uusista tutkimuksista. Hoivan todellinen kohdejakauma kannattaa esittää omana havaintona; eläinanalogia ei kalibroi ihmisten identiteettien tai ideologioiden jakaumaa. |
| `berm/berm/prediction/behavioral_factor.py`: `behavioral_factor_v21` 25, `annual_behavioral_series` 71 | Testosteronikehityksestä johdettu historiallinen TFR-muunnos suhteessa vertailuvuoteen. | Ei uutta suppressionprofiilin kerrointa tämän päälle ennen yhteistä tunnistettavuutta. Rakenteellinen integraatio voi olla valmis, vaikka uusia ennustekertoimia ei lisätä. |

## 5. Kanonisen graafin ja Atlaksen todellinen ero

`berm/berm/biology/causal_registry.py:537–633` sisältää ketjun:

```
HPA_HPG / MELATONIN_REDOX / ANDROGEN_RECEPTOR_SIGNAL
  → INDIVIDUAL_BEHAVIORAL_RESPONSE
  → BIOBEHAVIORAL_WEIGHTING
  → NARRATIVE_ATTRIBUTION
  → EPISTAPEGE_OBSERVABILITY_LOSS
  → INSTITUTIONAL_MODEL_REUSE

DEMAND_OPPORTUNITY → ASFR → TFR
COUPLE_FECUNDABILITY → ASFR
```

`DEMAND_OPPORTUNITY` on tällä hetkellä parentiton ja sen provenance on `explicit_nonbiological_input`. Tämä on kapeampi esitys kuin `/behavior#desire`-sivun biologisesti muodostuva motivaatio. `INSTITUTIONAL_MODEL_REUSE` on päätesolmu. Sen päätösluonne on tarkoituksellinen: `berm/tests/test_epistapege.py::test_epistapege_ends_at_institutional_reuse_without_entering_tfr` suojaa nykyistä kvalitatiivista haaraa.

Atlas-laajennuksessa on jo eri haara:

- `civil_pairing_signals → DEMAND_OPPORTUNITY`.
- `civil_strategy_distribution → DEMAND_OPPORTUNITY`.
- `civil_collective_institutions → DEMAND_OPPORTUNITY`.
- `civil_environment_feedback → DEMAND_OPPORTUNITY` (feedback).
- Ympäristöpalaute kulkee myös `TECHNOLOGY_TIMING_PROXY`, `mod_recovery_window` ja `mod_built_environment`-kohteisiin.
- `civil_social_transmission → civil_collective_institutions` on feedback-reuna.

Täsmälliset lähteet ovat `website/data/causal-atlas-extensions.json` (DEMAND-reunat noin 3712, 3744, 3784, 3843) sekä lähdeviittaukset `political_biology.py`, `biocap.py` ja sivilisaatiosivuihin. Käyttäytymisen Atlas-solmuja ovat `civil_neural_behavior`, `civil_pairing_signals`, `civil_strategy_distribution`, `civil_collective_institutions`, `civil_social_transmission`, `civil_environment_feedback`, `civil_cultural_capacity` ja `civil_phase_migration`.

**Suositus:** ensimmäisessä sisältöintegraatiossa kuvaa olemassa olevan käyttäytymissolmun ulostulojen biologinen jako ja näytä linkki jo toteutettuun Atlas-haaraan. Seuraavassa erillisessä rekisteri-integraatiossa täsmennä `DEMAND_OPPORTUNITY` biologisen motivaation ja ulkoisten mahdollisuuksien rajapinnaksi tai nimeä niiden erottelu. Ehdollinen käyttäytyminen→yritys-haara lisätään silloin suoraan lisääntymisen puolelle. Epistapegeä ei muuteta TFR:n pakolliseksi välittäjäksi. Pelkän uuden tutkimuskirjallisuuden lisääminen ei edellytä nykyisen 47/97-topologian muuttamista.

Kausaalikaavion esitys: `website/components/BermCausalDiagram.tsx` ja `website/lib/causalGraphView.ts`. Laaja Atlas käyttää `website/data/causal-atlas-extensions.json`-aineistoa ja `website/components/CausalAtlas.tsx`-komponenttia. Muutosten tulee näkyä molemmissa esityksissä niiden nykyisellä tarkkuustasolla; ne eivät ole sama tietolähde.

## 6. Claim-, viite- ja aineistoperheiden uudelleenkäyttö

Nykyinen `claim.proxy.behavioural-profile-integration` (`website/data/claims.json:3451`) kohdistuu `INDIVIDUAL_BEHAVIORAL_RESPONSE`-solmuun. Sen neljä evidenssisuhdetta ovat Weisman 2012, Mills 2023, Gettler 2011 ja Westbrook 2020. Claim kuvaa kahdeksaa vertailuakselia, ei mitattua kahdeksan muuttujan diagnostista oireyhtymää. **Varsinainen aukko on eläinten suppression/vapautumisen primaarikoematriisi ja sen kytkentä profiilin osiin**, ei kahdeksan akselin puuttuminen.

`claim.proxy.sensory-receiver-state` sisältää jo `khallaf2026_queen_odour`, `marlin2015_oxytocin_auditory` ja `carcea2021_maternal_learning`. Khallaf on kenttäaltistuskokeesta erillinen sosiaalisen signaalin komponenttikoe. Marlin ja Carcea on jo ryhmitelty yhteiseen `dataset.froemke.maternal-sensory-line`-aineistoperheeseen.

`route.biological-state-to-action` (`claims.json:12378`) kokoaa hormonisignaalin, arvottamisen, seksuaalisen motivaation, oppimisen, ilmaistut syyt, sosiaalisen arvottamisen ja dyadisen etenemisen. Uusi biologinen regulaatio kannattaa aluksi liittää tähän reittiin sekä profiiliclaimiin. Mahdollisen uuden alaclaimin tulee kuvata täsmällistä mekanismia, esimerkiksi kohdereitistä riippuvaa lisääntymis- ja hoivavastetta, eikä pelkkää uutta kattotermiä.

**Havaittu provenienssiepäyhtenäisyys:** Westbrook 2020:n sama `referenceId` ja `studyId` kuuluu `claim.behavior.state-dependent-valuation`-relaation alla perheeseen `dataset.radboud-da`, mutta profiiliclaimin alla perheeseen `dataset.westbrook2020_dopamine_effort` (rivit noin 7905 ja 8867). Westbrook 2025 kuuluu RADBOUD-DA-perheeseen. Tutkimusmäärien tai konvergenssin laskennassa perhealias tulee yhtenäistää; sama julkaisu ei ole kaksi itsenäistä ankkuria. Tässä auditoinnissa tietoja ei muutettu.

Päätehtävän nimeämien täydentävien lähteiden nykytila tarkistettiin sekä nimistä että DOI-osista:

| Lähde | Nykyrekisteri/claims | Ehdotettu integraatiorooli lähdetarkistuksen jälkeen |
| --- | --- | --- |
| Sonigo 2012, JCI 63937 | Puuttuu | PRL–kisspeptiini–ovulaatio-komponentti. |
| Hoskova 2022, `10.1210/clinem/dgac166` | Puuttuu | Ihmisen hyperprolaktinemian kisspeptiini/LH-vasteen kohdennettu silta. |
| Clarkson 2026, `10.1126/sciadv.ady6498` | Puuttuu | PRL-herkkä hoivakontakti/palkkioreitti; mahdollistaa eri ulostulosuunnat eri kohdereiteissä. |
| Kohl 2018, `10.1038/s41586-018-0027-0` | Puuttuu | Hoivan piirikohtainen komponentti. |
| Ammari 2023, `10.1126/science.adi0576` | Puuttuu | Elämäntilan/hormonitilan mukainen hoivapiirin muutos. |
| Balbo–Barban 2014, `10.1177/0003122414531596` | Puuttuu | Perheellistymisen ajallinen verkostoyhteys havaintoaineistossa. |
| Pink 2014, `10.1016/j.alcr.2013.12.001` | Puuttuu | Työpaikkaverkoston lisääntymiskäyttäytymisen havaintoyhteys. |
| Ben Simon 2022, `10.1371/journal.pbio.3001733` | `bensimon2022_sleep_helping`; jo `claim.encounter.network-propagation` | Hyödynnä samaa monitasoista tutkimusta käyttäytymis- ja instituutiokohdissa. |
| Ben Simon 2023 -korjaus, `10.1371/journal.pbio.3002394` | `bensimon2023_sleep_helping_correction` | Korjaus kuuluu alkuperäisen tutkimuksen lähdeversioon, ei uudeksi riippumattomaksi kokeeksi. |

Liitteen perinteisiä eläinsuppression viitteitä ei löytynyt nykyisestä kompaktista viiteindeksistä Abbott-, Clutton-Brock-, Saltzman-, Maruska-, Grosenick-, Lutermann-, Jarcho- tai Ratnieks-nimillä. Tämä on rekisterikattavuushavainto, ei todiste siitä ettei niitä voisi olla tekstissä tunnistamattomina yleisviittauksina. Tarkan DOI-/PMID-identiteetin ja oikean koetuloksen tarkistus kuuluu ennen rekisteriin lisäämistä.

Bibliografian ainoa lähde on `website/public/data/references_full.json`; `website/lib/referenceIndex.json` ja `referenceUsage.json` ovat johdettuja. Indeksointi tehdään `website/scripts/build-reference-index.mjs`-polun kautta. Claimit, evidenssirelaatiot, epistemic assessments ja routes ovat `website/data/claims.json`-tiedostossa; Atlas-kohdistukset `website/data/atlas-claim-bindings.json`-tiedostossa. Sama tutkimus tulee rekisteröidä kerran ja linkittää kaikkiin sopiviin vaikutuskohtiin.

## 7. Vähäparametrinen integraatiorakenne

Suositeltu ensimmäinen kuvaus on **ehdollinen monen ulostulon profiili**, ei uusi diagnostiikkaindeksi:

```
BERM:n fysikaalinen premissi → eksplisiittinen L2 → nykyinen biologinen tila S[t]
Y[t] = (lähestyminen, seksuaalinen motivaatio, hoivan kohdentuminen,
        uhkavaste, vaivannäkö/liikkuminen, kontaktit ja signalointi)
P(Y[t] | S[t], sosiaalinen tilanne X[t], opittu historia L[t])

Sama S[t] → lisääntymisen biologinen kapasiteetti
Sama S[t] → yrityksen/kohtaamisen todennäköisyys
Sama S[t] → hoivan palkitsevuus ja kohdejakauma
```

Hormoni- ja genomitila ovat tässä selittävän tilan mittauksia, muut akselit sen ulostuloja tai sosiaalista palautetta. Niitä ei tule laskea kahdeksaksi keskenään vaihdettavaksi sairausoireeksi. Laji, sukupuoli, lisääntymisvaihe ja sosiaalinen järjestelmä ovat tutkimuksen ehtoja; tämä sallii mallille myös samasta biologisesta signaalista eri suuntiin kulkevat kohdevasteet.

Käyttäytymissivun olemassa olevaa biologisesti muodostuvan arvon esitystä voidaan käyttää sellaisenaan. Uutta yleistä hormonaalista painovektoria ei tarvitse sovittaa. Lisääntymisen määrä muodostuu nykyisen ajattelun mukaisesti yrityksistä, ehdollisesta onnistumisesta, raskauden jatkumisesta ja ajallisesta jakaumasta; myös ei-suunnitellut raskaudet säilytetään. Hoivan siirtymistä toiselle kohteelle arvioidaan toteutuneista kontakteista, ei oleteta suoraan lemmikkiomistuksesta.

Yksilöstä väestöön eteneminen käyttää `aggregate_behaviour_probability`-rakennetta ja verkostokerros `advance_social_state`-operaattoria. Pitkittyminen voi käyttää nykyistä oppimishistoriaa, hormonivastaanottavuutta ja instituutiovarantoa. Näin sama alkutila voi selittää yhteisesiintyvyyttä, viiveitä ja kontekstieroja ilman kahdeksaa lisäkerrointa.

FieldState säilyy mitatun/estimoidun fysikaalisen syötteen haarana (`/measurement/fieldstate`). Se ei tuota tätä profiilia, biologisia tiloja tai TFR:ää. Lindgrenistä johdettu geometria, tuotu komponenttibiologia, BERM:n ehdollinen synteesi ja avoimet L2-/ihmispäätepisteen kalibroinnit erotellaan nykyisen identiteettisopimuksen mukaisesti.

## 8. Olemassa olevan datan hyödyntäminen ja etenemisjärjestys

Ensimmäinen toimitettava tutkimusaineisto kannattaa tehdä lähteistettynä matriisina: laji / lisääntymistila / manipulaatio tai luonnollinen siirtymä / kohdereitti / hormonimitta / käyttäytymisulostulo / lisääntymiskapasiteetti / vasteen aikajärjestys / hoivan kohde / mittausten yhteisyys / tutkimus- ja aineistoperhe. Matriisi auttaa löytämään valmiit yhteismittaukset. Se ei edellytä tässä vaiheessa uutta kenttä- tai laboratoriokoetta.

Nykyinen `/model/biological-coordination#existing-data` tarjoaa GSE48113:n, Meng 2026:n Zenodo 19829558 -aineiston ja NeuroVault 11908:n. Nämä ovat komponenttien ajoitus-, kemia- ja kuvantamisaineistoja. Ne eivät jo sisällä kahdeksan käyttäytymisakselin yhteismittausta; niitä käytetään vastaavien mitattujen biologisten liittymien rajaamiseen.

Toteutusjärjestys myöhempää päätöstä varten:

1. Varmista eläinkokeiden ja kohdereittien alkuperäislähteet; erottele sama koe, sama aineisto, saman laboratorion tutkimuslinja ja eri aineistojen synteesi. Tallenna rekisteriin yhteiset biologiset mittasuureet.
2. Täydennä nykyinen profiiliclaim ja `/behavior#desire`; rikasta `ProxySyndromeEvidence`-taulukkoa. Lisää rajattu alaclaim hoivan ja lisääntymisakselin eriytyville kohdereiteille, jos lähteet tukevat sitä.
3. Syvennä biologisen koordinaation hormonikohdereitit ja linkitä olemassa olevaan konvergenssireittiin. Älä laske samoja tutkimuksia itsenäisiksi uusiksi reiteiksi.
4. Täydennä Pathopege, Pathopolites, Patokinesis ja Patopolis omalla selitystasollaan; lisää puuttuvat vakaat ankkurit. Epistapege saa linkin monen ulostulon pirstoutumiseen.
5. Korjaa kanonisen käyttäytymis→lisääntymisyritys-haaran ja Atlas-laajennuksen semanttinen ero erillisenä tarkasti rajattuna rakennepäätöksenä. Ensimmäinen sisältöintegraatio ei muuta ennusteita.
6. Päivitä johdetut hakemistot ja testaa sivu-/mallisynkronointi vasta toteutuksessa. Kalibroidut määrät tulevat viimeiseksi, jos valmiit aineistot tunnistavat ne.

Headerissa ei tarvita uutta pääotsikkoa. Nykyinen Käyttäytyminen-ryhmä (`website/lib/navigation.ts:645–681`) etenee arvottamiseen, haluun, oppimiseen, syihin, sosiaaliseen arvottamiseen ja yhteiseen toimintaan. Syventävä profiililinkki kuuluu tähän ryhmään. Ensimmäinen vaihe voi käyttää nykyistä `#desire`-ankkuria; mahdollinen oma `/behavior/reproductive-regulation` on uusi reittiehdotus, ei nykyinen sivu. Fysiikka→Biologia→Käyttäytyminen→Sivilisaatio -lukujärjestys säilyy.

## 9. Myöhemmän toteutuksen säilyvyys- ja testikohdat

Raporttivaiheessa ei ajettu testisarjoja, koska sivustoa tai mallia ei muutettu. Myöhempään toteutukseen soveltuvat jo olemassa olevat tarkistukset:

- Identiteetti ja kausaalinen rakenne: `berm/tests/test_model_architecture_contract.py`, `test_epistapege.py`, `test_legacy_compat.py`; `website/lib/__tests__/causal-graph-view.test.ts` ja `causal-chain-separation.test.ts`.
- Koordinaatioparametrien ja ennustepäällekkäisyyden hallinta: `test_biological_coordination.py`, `test_coordination_site_sync.py`, `test_reproductive_waiting.py`, `test_interaction_operators.py`, `test_behavioral_factor.py`.
- Lähteet/claimit/Atlas: `website/lib/__tests__/component-claims.test.ts`, `atlas-evidence.test.ts`, `atlas-coverage.test.ts`, `atlas-data.test.ts`; reference-/registry-validaattorit.
- Uudet linkit ja vakaat ankkurit: `navigation.test.ts`, `atlas-anchor-index.test.ts`, `atlas-redirects.test.ts`. Säilytä vanhat linkit myös osioiden otsikoita muuttaessa.
- Selaimessa FI/EN, kapea ja leveä näkymä, jatkuvasti näkyvä header, täydelliset tutkimusviitteet, selitysluokkien luettavuus ja molempien kausaaliesitysten yhteydet.

Säilytettävä ydin: kahdeksan akselin nykyinen sisältö, motivaation/kapasiteetin/hoivan erottelu, neljä masking-tasoa, tutkimusperheiden yhteydet, alkuperäisen työtilan muu työ sekä BERM:n koko fysikaalinen ja biologinen perusketju.
