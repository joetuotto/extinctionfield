# Kalsium, redox-varanto, hormonikapasiteetti ja biologinen muisti

Tutkimussynteesi 8.9.2026. Rajaus: BERM:n vahvin tasapuolinen tulkinta olemassa olevista alkuperäiskokeista ja avoimista aineistoista. Tämä dokumentti ehdottaa integrointia; se ei muuta mallikoodia, lähderekistereitä tai julkaistua sivustoa. Alkuperäinen työtila tarkistettu suoraan. Kirjallisuushaku eteni mitattavista välittäjistä: glutationivaranto → oksidanttihaaste → kalsiumvarastot/mitokondrio → steroidogeneesi → toiminnallinen päätepiste. Katsauksia käytettiin korkeintaan alkuperäislähteiden paikantamiseen.

## 1. Keskeinen tulos

Kokonaisuus kannattaa integroida BERMiin **yhtenä kudoksen toimintatilaa ja sen historiaa kuvaavana säätelyjärjestelmänä**. Sen informaatio ei tyhjene ketjuun ”kalsium kasvaa → ROS kasvaa → vaurio kasvaa”. Alkuperäistutkimuksista löytyy jo kokeellista tukea neljälle paljon tarkemmalle yhteydelle:

1. Antioksidanttivaranto voi pienentyä ennen havaittavaa hormonituotannon häiriötä. Se muuttaa seuraavan kuormituksen vasteen suuruutta.
2. Kalsiumin vapautuminen ja takaisinotto riippuvat redox-tilasta; redox-tila on samalla tämän kierron seuraus. Sama biologinen komponentti yhdistää reitit.
3. Hormonituotanto edellyttää mitokondrion energiaa, kolesterolin saatavuutta sekä toimivaa autofagiaa. Korjausjärjestelmä osallistuu myös normaaliin tuotantoon.
4. Hetkellinen ROS-mittaus, absoluuttinen varanto, hormonin eritysvaste ja aiemmin syntynyt vaurio palautuvat eri aikatauluissa. Niitä ei pidä korvata toisillaan.

Näistä syntyy parsimoninen selitys sille, miksi altistuksen biologinen vaikutus voi riippua kudoksesta, hormonitilasta, ravitsemuksesta, aiemmasta kuormasta ja havaintoajasta. Jokaisen vaihtelun selittämiseen ei tarvita erillistä uutta reittiä. Vaihtelu sidotaan samoihin mitattaviin tilamuuttujiin.

## 2. Paikka BERM:n premisseissä

Pääanalyysissa tarkistettu lähtökohta on [Lindgrenin vuoden 2025 muoto](https://www.preprints.org/manuscript/202503.2321) `g = η + A⊗A`; BERM:n `κ` on erikseen ilmoitettava skaalakonventio. Kun `A = A₀ + a`, tensorimuotoinen seuraus on

\[
\Delta g_{\mu\nu}=\kappa(A_{0\mu}a_\nu+a_\mu A_{0\nu}+a_\mu a_\nu).
\]

Kudoksen mitattava vaste tarvitsee BERM:n ehdollisen sillan, esimerkiksi

\[
r_j(t)=\int \Xi_j^{\mu\nu}(t,t';S)\Delta g_{\mu\nu}(t')\,dt'.
\]

Tässä `S` on kudoksen vastaanottava tila. **Geometria on L0–L1; vasteoperaattori on BERM:n L2-ehdotus; alla olevat kokeet rajoittavat L3–L4-biologiaa ja sen siirtofunktioita.** Niistä ei siirretä näyttöä takautuvasti geometrian tai fysikaalisen kytkennän varmistukseksi. Gauge, fysikaalinen skaala, kudosytimet ja ihmisen päätepistekalibrointi jäävät erillisiksi avoimiksi kysymyksiksi. Tämä erottelu sallii biologisen ketjun täysimittaisen rakentamisen jo nyt. FieldState pysyy valinnaisena mittaushaarana, eikä siitä tehdä biologista syytä.

BERM:n kannalta oleellinen ehdollinen päätelmä: jos L2 muuttaa jonkin vastaanottavan komponentin toimintaa, vaste etenee **kulloisenkin biologisen tilan läpi**. Seuraava synteesi kertoo, mitä tästä tilasta pitää säilyttää ja mitä olemassa olevat kokeet jo sanovat sen vaikutuksesta.

## 3. Täydentävät alkuperäistutkimukset

Alla ”kenttäkoe” tarkoittaa tutkimuksessa todella tehtyä altistusta. Komponenttikokeet osoittavat yhteisen välivaiheen toimintaa; ne eivät yksin osoita sen käynnistymistä kentästä.

| Alkuperäistutkimus | Mitattu koe ja päätulos | Täsmällinen tehtävä BERM-synteesissä |
|---|---|---|
| **Miao ym. 2025**, [10.3389/fpubh.2025.1623701](https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2025.1623701/full) | Hiiren TM3-Leydig- ja GC-1-solut; 1950 MHz, ilmoitettu SAR 3 W/kg, 24 h jatkuvasti tai 1 h päällä/1 h pois. TM3:n jatkuvassa altistuksessa GSH, GSSG ja useat esiasteet vähenivät; erillinen GSH-mittaus tuki löydöstä. Jaksottaisen ryhmän ja GC-1:n GSH ei muuttunut merkitsevästi. | Kenttä → metabolinen varanto on suoraan havaittu tässä asetelmassa. Kahdessa protokollassa on myös eri kokonaisaltistusaika, joten tulos ei eristä pelkkää tauotuksen vaikutusta. Konsentraation lasku ei yksin mittaa synteesivirtaa. Testosteronia tai Ca-välitystä ei tässä kokeessa osoitettu. Raakadata tekijöiltä pyynnöstä. |
| **Chen ym. 2010**, [10.1016/j.mce.2010.02.034](https://pmc.ncbi.nlm.nih.gov/articles/PMC2875365/) | MA-10-hiiren Leydig-kasvainsolut. BSO 100 µM/24 h vähensi GSH:ta yli 80 %; DEM 100 µM/30 min noin 70 %. Varannon vähennys yksin ei heikentänyt LH-stimuloitua progesteronituotantoa (LH 100 ng/ml, 2 h). Seuraava t-BuOOH-haaste heikensi tätä tuotantoa varantovajeessa, mutta ei samalla tavalla kontrollissa. GSH-esteri, NAC, D3T ja p38-estäminen tukivat paikannusta; cAMP-, 22-HC- ja pregnenoloniohitukset erottivat tuotantovaiheita. | Suora varanto × kuormitus → hormonikapasiteetti -vuorovaikutus. Ohituskokeet paikantavat häiriötä cAMP-/StAR-/mitokondriovaiheisiin; pregnenolonista progesteroniksi muunto säilyi. Toiminnallinen vaje esiintyi ilman vastaavaa MTT-elinkelpoisuuden laskua. Tämä on vahva perustelu piilevälle varannolle, ei pelkkä antioksidantin yleinen suojakoe. Avoimet kuvat, ei varmennettua raakadata-arkistoa. |
| **Hales ym. 2005**, [10.1196/annals.1336.014](https://pubmed.ncbi.nlm.nih.gov/16469751/) | Leydig-solujen mitokondriotoiminnan farmakologinen erottelu: kalvopotentiaali, ATP-synteesi, pH-gradientti ja mitokondrion Ca-otto. Ru360 vähensi StAR-proteiinia; oligomysiini vähensi ATP:tä, progesteronia ja StAR:ia ilman samaa kalvopotentiaalin muutosta. | Mitochondrion Ca, energia ja steroidogeneesi liittyvät jo kokeellisesti yhteen. StAR-määrä, mRNA ja hormonituotto on säilytettävä eri päätepisteinä. Tässä tarkistettiin alkuperäinen abstrakti; tarkat pitoisuudet ja raakadata vaativat kokotekstipoiminnan. |
| **Midzak ym. 2007**, [10.1210/en.2006-1488](https://pubmed.ncbi.nlm.nih.gov/17332065/) | Brown Norway -rottien primaariset Leydig-solut. Kompleksi III:n estäjä myksotiatsoli vähensi LH-stimuloitua testosteronisynteesiä ja useita tuotantoketjun toimintoja. Ilman LH:ta se lisäsi perustuotantoa. BAPTA-AM esti tämän lisääntymisen, mutta ei hydroksikolesterolin aikaansaamaa tuotantoa. | Sama mitokondriohäiriö voi tuottaa vastakkaisen hormonisuunnan **mitatusti eri stimulaatiotilassa**. Lisääntynyt perustuotanto ei ole sama kuin säilynyt hormonivastekapasiteetti. Tulos tukee erillisiä basal- ja stimulated-havainto-operaattoreita. Alkuperäinen abstrakti varmennettu; täydellinen annosmatriisi poimittava kokotekstistä. |
| **Llanos ym. 2015**, [10.1371/journal.pone.0129238](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0129238) | Urosrotan saarekkeet ja β-solut. Glukoosi lisäsi ROS:ia ja RyR2:n S-glutationylaatiota. Ryanodiini tai NAC vähensi glukoosin stimuloimaa insuliinieritystä; glukoosi–karbakolireitti säilyi. H₂O₂ lisäsi perusglukoosissa insuliinia noin 2× ja sytosolista Ca:ta 4,5×; RyR-esto pienensi/poisti vasteita. | Redox osallistuu fysiologiseen hormonisignaaliin ja muuttaa kalsiumin vapautumista. Antioksidantti voi heikentää normaalia eritystä, jos se katkaisee hyödyllisen signaalin. Tämä on komponenttikoe, ei kenttäkoe. Data artikkelissa/lisäaineistossa. Vuoden 2015 korjaus koski rahoitustietoa. |
| **Santulli ym. 2015**, [10.1172/JCI79273](https://www.jci.org/articles/view/79273) | 27 RYR2-CPVT-potilasta ja 27 verrokkia: glukoosivaste ja insuliinieritys heikentyneet. Kaksi vastaavaa hiirimutaatiota: ER-vuoto, varastovaje, mitokondrion glukoosivasteen Ca-oton ja ATP:n heikkeneminen. S107 50 mg/kg/vrk, 4 viikkoa paransi useita välivaiheita ja eritystä; akuutti 10 µM/4 h palautti varastoa. | Yhteinen kalsiumvarasto–mitokondrio–hormoni-ketju sisältää geenihäiriön, mitatut välivaiheet ja pelastuksen. Lepo-Ca:n nousu voi esiintyä **heikomman stimuloidun mitokondrio-Ca-vasteen** kanssa. Solumassa ja kokonaisinsuliini säilyivät: toimintakapasiteetti erottui solukadosta. Ihmissaarekkeiden S107-haarassa mitattiin kanavakompleksia, ei potilaiden paranemista. Avoimet lisätaulukot; korjaus koski affiliaatioita. |
| **Adachi ym. 2004**, [10.1038/nm1119](https://pubmed.ncbi.nlm.nih.gov/15489859/) | Puhdistettu SERCA, rekonstituoidut lipidivesikkelit ja verisuonivalmisteet: ONOO⁻ lisäsi GSH-riippuvaista Ca-ottoa S-glutationylaation kautta. Cys674→Ser-mutaatio poisti vaikutuksen. Ateroskleroottisessa kudoksessa kysteiinin palautumaton hapettuminen esti tämän säätelyn. | Fysiologisesti palautuva muokkaus ja vaurioitunut proteiinitila ovat eri muuttujia. NO/ONOO⁻ ei kuulu mallissa yksinomaan haittalaatikkoon; muokkauskohde, pitoisuus ja tila ratkaisevat toiminnallisen suunnan. Verisuonen tulosta ei muuteta suoraan Leydig- tai ihmisen kenttäannokseksi. |
| **Harmon ym. 2026**, [10.1126/sciadv.aee1599](https://pmc.ncbi.nlm.nih.gov/articles/PMC13440392/) | Neljän Darier-potilaan keratinosyytti-isolaatit sekä SERCA2-geenimuokattu vertailu. GSH-varanto noin 40 % pienempi, vaikka lepo-ROS:ssa ei eroa. Menadionihaasteessa antioksidanttivaste ja solujen kiinnittyminen heikkenivät. SERCA-aktivaattorit ja NAC paransivat valittuja vasteita. Ca-vaihto 0,07→1,2 mM; adheesiokokeissa menadioni 10 µM, CellRox-kokeessa 20 µM. | Geneettinen varastohäiriö yhdistyy mitattuun varantovajeeseen ja stressikynnykseen. SERCA2:n palautuva glutationylaatio tulkitaan ensin suojaksi; sitä ei merkitä automaattisesti haitaksi. Glutationin siirtyminen proteiineille auttaa erottamaan vapaan varannon ja kokonaiskemiallisen määrän. Metabolomi- ja kuvadata artikkelissa/lisäaineistoissa; tässä tarkistettiin kokoteksti, ei koko raaka-aineistoa. |
| **Gao ym. 2018**, [10.1083/jcb.201710078](https://pmc.ncbi.nlm.nih.gov/articles/PMC5987723/) | Atg5/Atg7-poistot steroidogeenisista soluista: NHERF2 kertyi, SR-BI väheni ja kolesterolinotto heikkeni; testosteroni väheni ja uroshiirten seksuaalikäyttäytyminen muuttui. Nherf2-vaimennus palautti kolesterolinottoa osittain. Ihmisen biopsioissa verrattiin 20 vähäisen ja 12 normaalin testosteronin potilasta; molemmat ryhmät tulivat atsoo-/oligospermiapotilaista. | Autofagia säätelee hormonin raaka-aineen saatavuutta eikä toimi pelkästään vaurion poistona. Ihmisen osa on kudosassosiaatio; hiiren osa sisältää geneettisen mekanismin. Seerumin tai koko kiveksen kolesteroliarvo ei korvannut Leydig-solun paikallista varantoa. Avoin supplementti sisältää potilastaulukot ja mekanismikuvia. |
| **Esmaeilian ym. 2023**, [10.1038/s41419-023-05864-3](https://www.nature.com/articles/s41419-023-05864-3) | Ihmisen munasarja- ja kiveseksplantit, primaariset ja immortalisoidut granuloosasolut: farmakologinen esto sekä ATG5/Beclin1-vaimennukset vähensivät E₂-, P₄- ja T-tuotantoa. Lipidipisaroiden lysosomiyhteys vapautti kolesterolia. Luteaalitoiminnan vajeeseen liittyivät heikko lipofagia ja progesteronivaste. hCG-haaroissa mm. 10 IU/ml/24 h; potilassolujen kuvissa biologisia toistoja 10–13. | Suora ihmiskudosankkuri yhteiselle tuotanto-/ylläpitomekanismille molemmissa sukupuolissa. Käytettiin leikkausnäytteitä, ei terveiden vapaaehtoisten kenttäkoetta. Liitteet sisältävät menetelmät, kuvat, videoita ja alkuperäiskuvadataa; tässä tarkistettiin kokoteksti ja tiedostoluettelo, ei videoiden uudelleenanalyysiä. |
| **Lv ym. 2024**, [10.1016/j.jlr.2024.100639](https://pmc.ncbi.nlm.nih.gov/articles/PMC11467671/) | Hiirillä runsasrasvainen ravinto 10 viikkoa; TM3-soluissa palmitiinihappo 400 µM/24 h. M1-fuusiopromoottori paransi mitokondrioverkkoa, mitofagian mittareita, ATP:tä ja StAR/P450scc/3β-HSD-proteiineja; Mfn2-vaimennus pahensi useita vasteita. | Riippumaton kuormitus liittyy samaan mitokondrio–redox–steroidogeeniseen verkkoon. Kokeen keskeinen hormonipään näyttö on tuotantoproteiinien muutos, eikä sitä nimetä automaattisesti palautuneeksi testosteronivirraksi. Ylläpito ja fuusio/fissio muuttavat kapasiteettia. Avoimet kuvat; erillistä raakadata-arkistoa ei vahvistettu. |
| **Houston ym. 2019**, [10.1038/s41598-019-53983-9](https://pmc.ncbi.nlm.nih.gov/articles/PMC6877509/) | Uroshiiret, 905 MHz, 12 h/vrk, 1/3/5 viikkoa. Abstraktin SAR 2,2 W/kg; menetelmissä myös pyöristetty 2 W/kg. Siittiöiden MitoSOX noin 2× viikoilla 1/3, perustasolla viikolla 5; DNA-hapettumis-/fragmentaatiomittarit ja motiliteettivaje säilyivät. IVF ja varhainen alkionkehitys eivät heikentyneet. | Nykyinen ROS ja vaurion jälki erkaantuvat. **Viisi viikkoa on jatkuvan altistuksen kesto, ei altistuksen jälkeinen palautumisaika.** Eri lopetusryhmät eivät ole saman solun pitkittäisseurantaa. Tulos tukee havaintokerrosten erottelua ja säilyvää lisääntymisreserviä tässä IVF-asetelmassa; ei yleistä palautumattomuutta. Taulukko 1 tarkistettiin koneellisesti. |

Täydentävä tarkka mittauslähde on Miró-Vinyals ym. 2025: soluelinkohtaiset glutationsensorit osoittivat Golgin poikkeavan redox-ympäristön, `E_GSH ≈ −157 mV` ja GSH-pitoisuuden 1–5 mM. Tämä ei ole hormonien kenttätutkimus. Sen arvo on osoittaa, miksi koko solun yhdestä redox-luvusta ei voi päätellä jokaisen osaston tilaa. [10.1016/j.redox.2025.103560](https://pubmed.ncbi.nlm.nih.gov/39986117/).

## 4. Varanto, suhde ja potentiaali pitää erottaa matemaattisesti

Merkitään vapaata pelkistynyttä glutationia `g=[GSH]` ja disulfidia `o=[GSSG]`. Tällöin

\[
G_T=g+2o,\qquad \rho=g/o,
\qquad E_{GSH}=E^{0'}+\frac{RT}{2F}\ln\frac{o}{g^2}.
\]

`G_T` on vapaiden glutationiekvivalenttien määrä, `ρ` muotojen suhde ja `E_GSH` redoxpotentiaali määritellyssä pH:ssa ja osastossa. Kemiallisen aktiivisuuden approksimointi konsentraatiolla pitää ilmoittaa. **Vakio suhde ei takaa samaa potentiaalia, jos molemmat pitoisuudet skaalautuvat.** Pelkkä hapettuminen `2 GSH → GSSG` puolestaan ei vähennä ekvivalenttivarantoa. Tämä stoikiometria on tärkeä, jotta ”ROS kuluttaa varannon” ei muutu virheelliseksi massataseeksi. Plasma-aineistossa GSH/GSSG-pitoisuuksien ja potentiaalin erottelu on tehty suoraan: [Jones ym. 2000](https://doi.org/10.1016/S0891-5849(99)00275-0).

BERM:lle ehdotettava biologinen sulkeuma, ei Lindgrenistä johdettu yhtälö:

\[
\dot g=J_{syn}+2J_{red}-2J_{ox}-J_{export,g}-J_{conj}+J_{deglut},
\]
\[
\dot o=J_{ox}-J_{red}-J_{export,o},
\]
\[
\dot G_T=J_{syn}-J_{export,g}-2J_{export,o}-J_{conj}+J_{deglut}.
\]

Oksidaation ja reduktion termit kumoutuvat varantoyhtälössä. Proteiineihin sitoutunut glutationi voidaan ottaa omaksi varannokseen; se ei ole tässä vapaan poolin osa. `J_syn` riippuu esimerkiksi esiasteiden ja energian saatavuudesta; `J_red` NADPH:n saatavuudesta. Näin kaksi aineistoa voidaan yhdistää yhteisen tilan kautta väittämättä, että GSH:n lasku aina johtuisi samasta synteesientsyymistä.

Tämä on hyödyllisempi integrointi kuin uuden ”oksidatiivisen stressin painon” lisääminen. Näytteen GSH/GSSG, kokonais-GSH ja proteiiniglutationylaatio liittyvät toisiinsa, mutta eivät ole vaihtokelpoisia havaintoja.

## 5. Vahvin yhteinen biologinen rakenne

Ehdotettava minimaalinen tilajako:

- **Nopea signaali:** sytosolinen, ER:n ja mitokondrion Ca sekä paikallinen ROS/RNS-signaali.
- **Saatavilla oleva varanto:** vapaa glutationi, pelkistyskyky ja hormonituotannon kolesterolisubstraatti.
- **Palautuva säätely:** kanavien/pumppujen proteiinimuokkaukset, StAR-vaste ja toimiva autofagia-/mitofagiavirta.
- **Hitaasti muuttuva kapasiteetti ja vaurio:** mitokondrioiden toimintakyky, jäljellä oleva toimiva solumassa, DNA-/proteiinivaurio ja niiden korjaus.

Kalsiumkierron olemassa olevat virrat säilytetään, mutta niiden riippuvuuksia täsmennetään:

\[
J_{SERCA}=F_{SERCA}(Ca_{cyt},ATP,\sigma_{rev},\sigma_{irr}),
\quad J_{RyR}=F_{RyR}(Ca_{ER},Ca_{cyt},redox,\sigma_{channel}),
\]
\[
J_{steroid}=N_{viable}\,F(LH/cAMP,StAR,C_{accessible},ATP,Ca_{mito},D).
\]

`σ_rev` ja `σ_irr` ovat palautuva ja pysyvämpi proteiinitila. Yhtälöt ovat rakenteellisia ehdotuksia: niiden suuntia ja paikallisia riippuvuuksia voidaan rajoittaa yllä olevilla kokeilla, mutta universaaleja kertoimia ei ole tunnistettu.

Tuotannon vaste pitäisi mitata erikseen perustilassa ja standardoidun ärsykkeen jälkeen. Solun kyky lisätä hormonituotantoa voidaan kirjoittaa `ΔJ_steroid = J_steroid(LH₁) − J_steroid(LH₀)`; perustuotannon kasvu ei edellytä tämän erotuksen kasvua. Samoin ER:n lepovuoto voi pienentää seuraavaa hyödyllistä varastovastetta. Nämä ovat biologisesti eri ilmiöitä kuin väite ”kalsium lisää hormoneja” tai ”kalsium vähentää hormoneja”.

Hitaampi vauriotila voidaan pitää nykyisessä muodossa `dD/dt = production − clearance`, kunhan tuotanto ja poistuma sidotaan oikeisiin mittauksiin. Hetkellisen redox-signaalin normalisoitumista ei aseteta automaattisesti ehdoksi `D=0`. Toisaalta pysyvämpää vauriota ei oleteta jokaisen heikentyneen lisävasteen syyksi: jäljellä oleva varanto, stimulaatiotila ja suoraan mitattu kapasiteetti ratkaisevat tämän.

## 6. Mitä tästä voidaan päätellä jo nyt

**Piilevän varannon väite voidaan esittää varmemmin biologisena komponenttina.** Se ei ole ainoastaan selitys, jonka voisi keksiä ristiriitaisille kenttätuloksille. Varannon vähennys, seuraava haaste ja mitattu tuotantovaje on jo erotettu kokeellisesti. Kenttäaineisto voi nyt liittyä tähän mekanismiin saman varantomittauksen kautta. Siirto TM3:sta MA-10:een tai keratinosyytistä Leydig-soluun merkitään erikseen; kudosten kynnysarvojen ei oleteta olevan samoja.

**Korjaus ja hormonituotanto ovat osittain samaa materiaalista infrastruktuuria.** Autofagiavirta vaikuttaa saatavilla olevaan kolesteroliin, ja mitokondriodynamiikka vaikuttaa energiaan sekä tuotantokomponentteihin. Tämän vuoksi mallin ”korjaus”- ja ”lisääntymis”-osat eivät ole toisistaan riippumattomia kertolaskutekijöitä. Sama mitattu pullonkaula käytetään kerran ja sen seuraukset viedään eri havaintoihin.

**Vaikutussuunnan vaihtelu voi olla täsmällinen ennuste.** Kun vastaanottotila tai stimulaatio vaihtuu, samaan mekanismiin voi liittyä erilainen mitattu hormonisuunta. Steelman vahvistuu, kun mallissa esitetään etukäteen nämä mitattavat ehdot. Selitystä ei vahvisteta nimeämällä jokaista erisuuntaista tulosta jälkikäteen kompensaatioksi.

**Parsimoniavoitto tulee yhteisistä tiloista, ei kaikkien ensisensorien yhdenmukaistamisesta.** Fyysisesti eri protokollat voivat päätyä samaan kalsium–energia–redox-verkkotilaan. L2-sillan eri vaihtoehdot voidaan säilyttää rinnalla, samalla kun yhteiset biologiset siirtofunktiot rakennetaan samoista kokeista. Tämä nostaa mekanismin keskeiseksi, vaikka ensimmäinen kudoskohtainen kytkentä ei vielä olisi yksikäsitteinen.

## 7. Jo käytettävissä oleva data ja tässä todella tehty tarkistus

Houstonin julkaisun alkuperäinen XML ja **taulukko 1** luettiin. Se sisältää päätemuuttujakohtaiset otoskoot, joita ei pidä korvata yhdellä tutkimuksen kokonais-n:llä. Esimerkiksi MitoSOX-ryhmissä n vaihteli 5–12:n välillä, kun comet-mittauksissa oli kolme biologista toistoa kussakin ryhmässä; IVF:n viiden viikon sham-/altistusryhmissä n oli 3/5. Tämä mahdollistaa jo kuviopoiminnan oikein painotetun suunnittelun. [Alkuperäinen avoin XML](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC6877509/fullTextXML).

Harmonin alkuperäinen XML tarkistettiin ja lisäaineistot tunnistettiin: `sciadv.aee1599_sm.pdf` sekä `sciadv.aee1599_data_s1_and_s2.zip`. Europe PMC:n yhteisarkiston lataus jäi aikarajaan eikä ollut ehjä; sitä **ei** tulkittu analysoiduksi metabolomi-/raakadataksi. [Julkaisu ja lisäaineistot](https://pmc.ncbi.nlm.nih.gov/articles/PMC13440392/).

Esmaeilianin XML:stä tarkistettiin hCG-protokollat, biologisten toistojen ilmoitukset sekä supplementtien rakenne. Niihin kuuluu erillinen `Original Data File`, mutta sitä ei tässä nimetty uudelleen analysoiduksi yksilötason hormonitaulukoksi. Miao ilmoittaa raakadatansa saataville tekijöiltä; aineiston pyytämistä tai viestien lähettämistä ei tehty.

Seuraava työ voidaan tehdä olemassa olevilla julkaisuilla ilman uutta koetta:

1. Poimia Chenin varanto × haaste -annoshaarat ja ohitusinterventiot yhteiseksi vastekontrastiksi. Estimaatti tuotetaan koe-/viljelmätasolla, ei kuvapisteitä itsenäisiksi biologisiksi toistoiksi laskien.
2. Poimia Miao-kuvista GSH/GSSG/esiasteiden suunnat ja mittausasteikot. Jatkuva/jaksottainen-protokollien ajallinen rakenne ja kokonaisaltistusaika pidetään erillisinä selittäjinä.
3. Koota Santullin ER-varasto, lepo-Ca, stimuloitu mito-Ca, ATP ja eritys samoiksi mitatuiksi siirtymiksi. Eri mittaukset tukevat ketjun paikannusta; niitä ei lasketa viideksi riippumattomaksi replikaatioksi.
4. Kytkeä autophagia- ja lipofagiakokeiden substraattimittaukset samaan steroidogeeniseen kapasiteettiin. Ihmiskudos- ja eläinkokeiden tulokset merkitään eri yleistystasoiksi.
5. Koota Houstonin kolme havaintoaikaa ja päätemuuttujat aikamatriisiksi. Sen avulla verrataan vasteiden järjestystä; siitä ei soviteta altistuksen lopettamisen jälkeistä palautumisvakioa.

## 8. Integrointi nykyiseen malliin ja sivustoon

Tämän työtilan tarkastuksessa valmis perusrakenne on jo käyttökelpoinen:

| Nykyinen kohta | Säilytettävä rakenne | Ehdotettu täydennys |
|---|---|---|
| `berm/berm/modulome/state.py` | `receptor_readiness`, `repair_capacity`, `damage_load` ja erilliset mittaustietueet | Mittaussanastoon absoluuttiset `reduced_glutathione`, `oxidized_glutathione`, `glutathione_equivalent_pool` ja tarvittaessa osastot. Nykyinen `glutathione_ratio` ei yksin saa toimia varannon tai korjausnopeuden arvona. |
| `berm/berm/modulome/calcium.py` | Sytosoli–ER–mitokondrio ja nimetty SERCA/RyR/MCU-kinetiikka | ATP- ja redox-riippuvuudet sekä lepo-/stimuloidun vuon erottelu. Komponenttitason varastopalautus- ja vuotokokeet rajoitteiksi. |
| `berm/berm/modulome/intervention_protocol.py` | Mitattu aikajana, vaihtoehtoiset interventiokohdat, vaurion muodostus/poistuma | Varantopohjainen redox-kuvaus ja molemminpuoliset Ca-riippuvuudet. Nykyistä yhtä mitokondrioperäistä vauriotermiä ei pidä kahdentaa uudella nimellä. Muiden vauriolähteiden lisääminen vaatii oman mitatun ankkurin. |
| `berm/berm/biology/reproductive_state.py` | `steroidogenic_support`, androgeenin saatavuuden/käytön erottelu ja erillinen DNA-integriteetti | Tuotantotukeen nimetty fysiologinen alirakenne: substraatti, energia, StAR/entsyymikapasiteetti, stimulaatiotila ja toimiva solumassa. Tämä ei ole uusi riippumaton ”redox-hedelmällisyyskerroin”. |
| `berm/berm/biology/causal_registry.py` | `MALE_STEROIDOGENESIS`, hormonivaste ja lisääntymisportit | Kalsium–mitokondrio–redox-tilasta suora biologinen yhteys steroidogeneesiin. Autofagia/substraattisaatavuus saman tilan sisään; palautekytkentä state-malliin, jotta DAG ei muutu virheellisesti sykliseksi. |
| Mallisivu ja biologian mekanismikuvaus | Olemassa olevat kalsium-, redox-, kello- ja hormonihaarat | Yhteinen näkyvä säätelykokonaisuus ja linkki samoihin lähteisiin. Esitetään sekä normaali signaalin vahvistus että mitattu kapasiteetin heikkeneminen. |
| Timothy-/syndroomaevidenssi, haima, gonadit, lisääntymisen sivut | Sairauksien täsmälliset molekyyliankkurit | CPVT:n haima-/mitokondriohaara, Darierin varanto × haaste -silta sekä ihmiskudoksen autofagia-/lipofagianäyttö. Diagnoosia ei käytetä kentän annosmittarina. |
| Evidenssirekisterit ja atlas | Väitekohtainen kohdistus, alkuperäistutkimusten tunnisteet | Jokaiselle tutkimukselle yksi identiteetti ja aineistoperhe; erikseen kenttä → tilamuutos, tilamuutos → hormonivaste ja näiden synteesi. |

Chen–Midzak–Hales-kokonaisuudessa osa tekijä-/laboratorioverkostosta on yhteistä: menetelmällinen konvergenssi ei ole sama kuin täysin riippumattomien laboratorioiden toisto. Gao- ja sen SIRT1-jatkotyöt muodostavat myös tunnistettavan jatkumon. Esmaeilianin ihmiskudostyö, Miao, Houston, Darier-tutkimus ja rottien RyR/insuliinityöt tuovat erilaisia aineistoperheitä ja päätemuuttujia.

**Suositeltava steelman-muotoilu:** BERM esittää, että fysikaalisen häiriön biologinen vaikutus välittyy kudoksen vastaanottavan kalsium–energia–redox-tilan kautta. Hormonituotanto ja lisääntymistoiminnot riippuvat tämän järjestelmän signaalista, varannoista, ylläpidosta ja historiasta. Nämä biologiset riippuvuudet ovat useilta keskeisiltä osin kokeellisesti osoitettuja; BERM yhdistää ne ehdolliseen fysikaaliseen vasteeseen ja edelleen organismi- ja populaatiotason seurauksiin. Yhdistetyn ketjun näyttö esitetään koostettuna päätelmänä, jonka komponentit ja avoimet kalibroinnit voi jäljittää.
