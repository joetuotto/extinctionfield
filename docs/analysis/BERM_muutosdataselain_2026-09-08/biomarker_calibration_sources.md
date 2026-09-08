# BERM:n rajattu biomarkkerikalibrointi: lähteet ja käyttökelpoinen protokolla

8.9.2026. Auditointi koskee olemassa olevia testosteronihavaintoja ja yhden vastekertoimen ehdollista sovitusta. Raakoja havaintoja ei muutettu. Protokollat ovat tiedostossa `website/lib/berm-biomarker-calibration-protocols.ts`.

## Johdosta havaintoon

Vuoden 2025 premissi on `g=η+κA⊗A`. Lisättäessä `b` geometrinen muutos on `Δg=κ(A⊗b+b⊗A+b⊗b)`. Ehdollinen BERM-kudosvaste `u_i(t)=∫K_i(τ;S_i(t−τ)):Δg(t−τ)dτ` tarvitsee yhä gauge-valinnan, fyysisen asteikon, kudosytimen ja biologisen tilan. Hormonihavainnot sijaitsevat tämän sillan downstream-päässä; niistä ei tunnisteta geometrian oikeellisuutta.

Nykyinen atlas määrittää valitusta lähdehistoriasta normalisoidun kanavan `X(t)` ja testosteronisulun `T(t)=a exp[−βT X(t)]`. Käyttökelpoinen kalibrointi on **vain yhden βT-kertoimen kuvaileva sovitus**, kun lähteet, määrän→potentiaalin muunnos, amplitudit, suuntakulmat, korrelaatiot, viive, muisti, palautuminen, alkuhistoria ja kanavapainot on ensin lukittu. Kerroin on ehdollinen tälle normalisoinnille ja ryhmälle. Se ei erottele kudosherkkyyttä fyysisestä asteikosta, eikä sen muuttaminen sovita βF:ää tai TFR:ää.

Täsmällisille yksivuotisille lähtö- ja päätemediaaneille yhteisen positiivisen yksilökertoimen oletus antaa

`βT = ln(T0/T1) / [X(t1) − X(t0)]`.

Jos kanavakontrasti on nolla, muuttuvaa havaintoa ei voi sovittaa tällä yhdellä kertoimella. Pieni kontrasti tekee kertoimesta epävakaan; puuttuva kontrasti pysyy puuttuvana. Merkin on saatava vaihtua. Sopimattoman merkin pakottaminen positiiviseksi tai parametrirajan ylittävän ratkaisun hiljainen leikkaaminen muuttaa sovituksen merkitystä.

Jaksojen aritmeettisille keskiarvoille käytetään suoraan mallin **jaksoaggregointia**, ei `exp`-funktiota kanavan keskiarvosta:

`R_pred(βT) = [Σ_(t∈P1) w1,t exp(−βT X(t))] / [Σ_(t∈P0) w0,t exp(−βT X(t))]`.

Painot summautuvat erikseen yhteen. βT ratkaistaan suhteesta `R_pred=T1/T0`. Tasaiset kalenterivuosipainot ovat ilmoitettu korvike puuttuville otosvuosipainoille. Nyanten vakioitu keskiarvo säilyy vakioituna kohde-estimaattina; kalenteripainotus ei toisinna yksilötason vakiointia. Pooled-mediaaniin tämä keskiarvosulku ei päde.

## Neljän nykyisen sarjan protokollat

| Sarja | Kalibrointiin kelpaavat jaksot tässä rajauksessa | Luvut ja tulkinta | Sovituksen ulkopuoli / testaus |
|---|---|---|---|
| FINRISK 60–69 | 1977 ja 2002; ensimmäinen ankkuri | Mediaanit 21,9 ja 13,8 nmol/l; n=130/23. 5.–95. persentiilit 10,3–40,9 / 7,7–27,8 ovat jakaumaa, eivät mediaanin CI. | Eri syntymäkohortit ja ikäjakaumat, ei BMI-vakioituja mediaaneja. Yksi kontrasti: ei riippumatonta heldoutia. |
| FINRISK 25–29 | Vain 2002, 19,1 nmol/l | Yksi yksivuotinen mediaani voi ankkuroida käyrän, ei tunnistaa βT:tä. | Varhainen 26,4 nmol/l on erottelematon {1972,1977}-solu. Jakson sisävuosia eikä mediaanien keskiarvoa keksitä. Protokollan tila `insufficient-compatible-periods`. |
| Lokeshwar/NHANES 15–39 | **2013–14 ja 2015–16**; ankkuri 2013–14 | Kuvailevat painotetut keskiarvot 431,76 ja 451,22 ng/dl; SE 7,19 ja 10,03; n=1241/1168. Jälkimmäinen keskiarvo on suurempi. | 1999–2000 ja 2003–04 jätetään eri menetelmäkauden vuoksi ulkopuolelle. 2011–12 jätetään ulos, koska julkaistun keskiarvon bridge-korjauksen käyttöä ei varmennettu. Ei riippumatonta heldoutia. |
| Nyante/NHANES ≥20 | 1988–91 ja 1999–2004; ensimmäinen ankkuri | Vakioidut keskiarvot 5,37 ja 5,34 ng/ml; ilmoitetut 95 % CI:t 5,20–5,53 / 5,16–5,52, n=1413/902. Sama Elecsys-menetelmä ja vakiointi. | Pieni ero; ei yhdistetä nuorempaan, vakioimattomaan otokseen. BMI/ympäristötilan rooli pidetään erillisenä mallivalintana. Ei riippumatonta heldoutia. |

Suomen vuosikohdistuksen päättely, alkuperäiset taulukkosolut ja lukukopiot on dokumentoitu [testosterone_trends/README.md](testosterone_trends/README.md). [Perheentupa 2013](https://doi.org/10.1530/EJE-12-0288) mittaa riippumattomia poikkileikkausotoksia. Valittujen ikä-/kohorttirajojen ja tutkimusvuosien leikkaus antaa FIN60-parille yksikäsitteisesti 1977 ja 2002; tämä ei tee ikäjakaumista identtisiä. Myöhemmän solun n=23 rajoittaa tarkkuutta.

[Lokeshwar 2021, verkossa 2020](https://doi.org/10.1016/j.euf.2020.02.006) on sama tutkimus kuin raakarekisterissä. [Nyante 2012](https://pmc.ncbi.nlm.nih.gov/articles/PMC4137971/) on erillinen kohde-estimaatti: ikä, etnisyys, BMI, vyötärö, tupakointi ja alkoholi on vakioitu. Molempien alkuperäiset numeropoiminnat ovat repossa. Koko ikäryhmän vakioimaton trendi ja vakioitu tilakontrasti vastaavat eri kysymyksiin; kummankaan sovituksen kerrointa ei siirretä toiseen automaattisesti.

**Uusi assay-rajauksen varmistus:** [CDC TST_H:n analyysiohje](https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2013/DataFiles/TST_H.htm) kuvaa 139 näytteen rinnakkaismittauksen. Uusi T+estradioli-menetelmä antoi keskimäärin 3,9 % suurempia T-arvoja; r=0,997. CDC ilmoittaa forward-sillan `Y=1,021X+0,182` ja nimeää sen yksiköksi ng/ml. Se ei ole suoraan ng/dl-yhtälö; mahdollinen myöhempi käyttö vaatii täsmällisen yksikkötarkistuksen. TST_H:n vanhalla menetelmällä mitatut näytteet on **jo korjattu** uuteen asteikkoon. [TST_I 2015–16](https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2015/DataFiles/TST_I.htm) raportoi menetelmän, laitteen ja laboratorion pysyneen samoina. Tässä protokollassa ei sovelleta siltaa lainkaan: 2011–12:n julkaistun keskiarvon korjaustila ei varmistunut, joten vältetään sekä väärä yksikkö että kaksinkertainen korjaus. Alkuperäinen viiden pisteen kuvaileva havaintosarja säilyy kokonaan näkyvissä.

Nykyisten oletussyötteiden laskennallinen esimerkki 8.9.2026: FIN, `cellular-total` ja `electric-grid` mukana, molempien amplitudi 0,25, neliöjuurimuunnos, lineaariset välivuodet, hold-reunat; viive 3 v, muisti 5 v, puoliintumisaika 20 v, vuosipaino 1, kertymäpaino 0,05/v ja oletettu nollakertymä ennen vuotta 1880. Tällöin `X_combined(1977)=0,02596966349` ja `X_combined(2002)=0,10515321005`. Havaittu log-kontrasti on 0,46181804466, joten yhden kontrastin ehdollinen βT on **5,83225**. Vuosikanavalle samalla asetuksella tulos on 8,72786 ja kertymäkanavalle 17,57936. Nämä ovat vaihtoehtoisten normalisointien kuvailevia sovitteita, eivät kolme riippumatonta biologista mittausta. Nykyinen käsin säädettävä ±1-raja ei kata näitä ratkaisuja; sovitusnäkymän tulee näyttää rajaan osuminen tai erillinen sovite, ei leikattua arvoa optimaalisena.

## Mitä muuta voidaan oikeasti rajoittaa

**Sitoutumispaneeli ennen reseptoriolettamuksia.** Repon `berm/berm/biology/androgen_capacity.py` toteuttaa tuodun massavaikutussulun T→SHBG/albumiini→vapaa T→reseptorimiehitys→jälkivaste. SHBG ja albumiini rajoittavat vapaata saatavuutta; ne eivät mittaa AR-/ZIP9-määrää tai jälkivasteen vahvistusta. Laskennallinen vapaa T on nimettävä johdetuksi ja sen sitoutumisvakiot/menetelmä säilytettävä. Vuotuista kansallista vapaa-T/LH-sarjaa ei tässä auditoinnissa löytynyt käyttövalmiina repossa.

**Todellinen avoimen NHANES-paneelin peitto:** TST_H (2013–14) ja TST_I (2015–16) sisältävät T:n, SHBG:n ja estradiolin. [SSTST_J 2017–18](https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2017/DataFiles/SSTST_J.htm) ilmoittaa nimenomaisesti, että LBXTST poistettiin. [P_TST 2017–maaliskuu 2020](https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2017/DataFiles/P_TST.htm) tarjoaa SHBG/LH/FSH- ja muita steroidimuuttujia, **ei kokonaistestosteronia**. Tämä tarkentaa aiemman human_data_audit-muistion liian laajaa TST-peittokuvausta. [TST_K_R 2019–maaliskuu 2020](https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2019/DataFiles/TST_K_R.htm) sisältää T:n, mutta aineisto on RDC-rajoitettu keskeneräisen kierroksen näyte; siitä ei saa kansallista väestöestimaattia. Julkista T-käyrää ei täytetä vuosille 2017–20.

[TST_L 2021–23](https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2021/DataFiles/TST_L.htm) sisältää taas T:n sekä SHBG:n, LH:n ja FSH:n. T-yksikkö on ng/dl (SI-muunnos ×0,0347), SHBG nmol/l ja LH/FSH mIU/ml. Se tarjoaa parhaan seuraavan mitatun tilapaneelin. Yhdistä `SEQN`:llä ikä, sukupuoli, BMI, vyötärö, albumiini, lääkitys, näytteenottohetki ja paasto; käytä verinäytteiden `WTPH2YR`-painoa sekä PSU/strata-rakennetta. LLOD/√2-korvausarvot erotetaan mittausrajan alittavien havaintojen lipuista. Saman tutkittavan T+LH+SHBG voi rajata tuotanto-/säätely-/sitoutumistilaa, mutta hetkellinen LH ei mittaa pulssitaajuutta. Luotettavaa aikasarjajatkoa varten tarvitaan lisäksi sama ikä-/otosrajauksen toisto ja laboratorioiden vertailu; tämän tehtävän aikana mikroaineistoa ei aggregoitu.

**Riippumaton komponenttirajoite:** [Leproult & Van Cauter 2011](https://stacks.cdc.gov/view/cdc/212252/cdc_212252_DS1.pdf), n=10 tervettä nuorta miestä, vertasi samojen miesten 10 tunnin ja kahdeksan 5 tunnin vuodeaikayön jaksoja vakioidussa laboratoriossa. Päiväajan T oli 18,4±3,8 vs 16,5±2,8 nmol/l (SD), p=0,049; tiheät 24 tunnin näytteet, Immulite. Tämä rajaa lyhyen aikavälin uni-/näytteenotto-tilan vaikutuksen mahdollista suuruusluokkaa, **ei EMF→T-kerrointa** tai vuosittaista palautumista. [Schmid 2012](https://pubmed.ncbi.nlm.nih.gov/22568763/) osoittaa, että unen ajoitus voi muuttaa tulosta: myöhäisemmän yöpuoliskon säilyttävä 4 h uni ei muuttanut LH/T-profiilia, kun varhaiseen yöpuoliskoon rajattu uni alensi aamuarvoja. Siksi pelkkä tuntimäärä ei ole yleinen vakiointikerroin.

[Møllerløkken 2012](https://doi.org/10.1016/j.reprotox.2012.04.003), 24 miehen satunnaistettu risteytyskoe, ei havainnut muutosta reproduktiohormoneissa 20 minuutin 1,5 T:n MRI-päänkuvausprotokollan jälkeen. Tämä rajoittaa kyseisen akuutin protokollan yleistä seerumihormonisulkua, mutta ilman vaikutuksen luottamusrajaa sitä ei muuteta βT=0:ksi. Voimakkaan hetkellisen MRI-protokollan ja kroonisen teknologiamääräindeksin βT:t eivät ole sama suure.

Repon `parameter_registry.csv` nimeää vanhat `gamma_melatonin=0,015`, `gamma_cry=0,02`, hedelmällisyyskäyrän kaltevuuden ja useat palautumiskertoimet tunnistamattomiksi/skenaarioiksi. `alpha_therapeutic_calibration.py`:n kiinteät 0,30/0,50/0,15-luvut eivät sisällä hormonaalista fit-recordia; vaikutuksen kesto toisessa kudoksessa ei yksin tunnista testosteronin puoliintumisaikaa. Niitä ei käytetä tämän sovituksen kvantitatiivisina prioreina. World Population Review -maakooste ja legacy `usa_t_timeseries.csv` sisältävät heterogeenista tai ekstrapoloitua tietoa, joten niitä ei käytetä havaintojen määrän kasvattamiseen.

## Käyttöliittymän konkreettinen toiminta

1. Valitaan yksi havaintosarja ja sen yllä määritetty lähdeprotokolla. Raakahavainnot jäävät näkyviin; sovitukseen hyväksytyt ja pois jätetyt jaksot merkitään erikseen syineen.
2. Lukitaan laskennan lähdeprofiilit ja kaikki tilan/historian oletukset. Sovitetaan vain βT valitun kanavan jaksoaggregointiin. Näytetään lähtöarvo, yksi havaittu kontrasti, laskettu kontrasti, kerroin ja sovituksen mahdollinen rajaan osuminen.
3. Pisteiden SE/persentiili/CI näytetään niiden oikeilla nimillä. Tuntemattomasta yhteismitallisuudesta, SE:stä tai jakauman persentiileistä ei valmisteta mallin luottamusväliä.
4. Kaikissa nyt kelpaavissa protokollissa on kaksi pistettä ja yksi kontrasti. Teksti on **“kuvaileva kalibrointi, ei riippumatonta testijoukkoa”**. Pois jätetty eri assay-jakso tai toinen ikäryhmä ei muutu heldout-testiksi nimeämällä.
5. Seuraava aidosti hyödyllinen laajennus on ennalta lukittu NHANES 2013–16 -määrittely ja samaan määrittelyyn tuotettu 2021–23 T+SHBG/LH-paneeli testijoukoksi. Jos protokollaa tai lähdeasteikkoa muutetaan testiarvojen nähtyä, tulos on retrospektiivinen uudelleensovitus. Sovitteita ei siirretä maasta tai ikäryhmästä toiseen ilman erillistä siirrettävyysoletusta.

Rajapinta: `BERM_BIOMARKER_CALIBRATION_PROTOCOLS` ja `getBermBiomarkerCalibrationProtocol(seriesId)`. Päivärajat ovat lähdejaksot (`startYear`, `endYear`); oletusarvo `defaultThroughYear` on viimeisen kelpaavan jakson loppu. Moduuli ei muuta havaintoja eikä sisällä riippuvuutta laskentaytimeen tai UI:hin.
