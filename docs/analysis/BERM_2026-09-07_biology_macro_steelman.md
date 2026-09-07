# BERM: biologian ja makrotason vahvin rakentava synteesi

Päiväys 7.9.2026. Rajaus käyttäjän tarkennuksen mukaan: steelman — vahvimmat nykyiseen näyttöön perustuvat yhdistelmät, mallin selitysvoiman laajennus ja nykyistä vahvemmin perusteltavat väitteet. Sivustoa tai laskentamallia ei tässä muuteta. Tutkimuksissa osoitetut osaketjut ja tässä ehdotettu kokonaiskytkentä erotetaan toisistaan.

## Lähtökohta ja yhteinen siirto-operaattori

Tarkastelu alkaa BERM:n käyttämästä vuoden 2025 muodosta

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu,
\quad A=A_{bio}+a_{ext},
\]

josta seuraa algebrallisesti

\[
\delta g_{\mu\nu}=\kappa(A_{bio,\mu}a_{ext,\nu}+a_{ext,\mu}A_{bio,\nu}+a_{ext,\mu}a_{ext,\nu}).
\]

Biologisen vaikutuksen ehdollinen L2-silta kirjoitetaan

\[
u_r(t)=\int K_r^{\mu\nu}(t,\tau;s_r)\delta g_{\mu\nu}(\tau)d\tau,
\qquad \dot x_r=F_r(x_r,u_r),
\]

missä (s_r) sisältää kudoksen tilan, reseptorikonformaation, redox-tilan, vaiheen ja altistushistorian. (K_r) on BERM:n eksplisiittinen biologinen kytkentähypoteesi; sen lukuarvoa ei tässä johdeta Lindgrenin yhtälöistä. Alla olevat primaaritutkimukset rajoittavat (F_r):n ja siitä alaspäin johtavien aggregaatioiden muotoa. Näin niiden vahva näyttö tulee kokonaismallin käyttöön oikeassa kohdassa.

Tämä laajentaa nykyisen synteesin jo esittämää operaattoriketjua: [berm-cap-closure-and-model-extension-synthesis.md:1280](</Volumes/kovalevy 3/extinctionfield/berm/docs/berm-cap-closure-and-model-extension-synthesis.md:1280>).

**Keskeinen uusi yhdistelmä:** pieni molekyylitason tilamuutos voi ensimmäiseksi muuttaa oikea-aikaisten, onnistuvien kohtaamisten määrää. Se voi heikentää hedelmöitystä, pariutumista, yhteistyötä tai pölytystä jo ennen näkyvää solukatoa, kliinistä sairautta tai lajien runsauksien muutosta. Ajoitus, kohtausfrekvenssi, osapuolten yhteensopivuus ja palautumisaika yhdistävät mallin tasot.

## 1. CatSper, Ca²⁺-pulssi ja PLCζ: hedelmöitys on ajallisesti järjestetty toiminto

**Mikä on jo sivustolla:** lisääntymisnavigaation sivu sisältää CatSperin, Ca²⁺-poistuman ja PLCζ:n, mutta biologian laskennallinen kaskadi käsittelee vielä kuutta vaihetta yhdellä CatSper-kehyksellä. Tarkempi integraatio olisi käyttää sivuston jo tuntemaa solmuerottelua myös mallissa: [reproductive-navigation/page.tsx:82](</Volumes/kovalevy 3/extinctionfield/website/app/[locale]/evidence/reproductive-navigation/page.tsx:82>), [sama:118](</Volumes/kovalevy 3/extinctionfield/website/app/[locale]/evidence/reproductive-navigation/page.tsx:118>), [fertilization_cascade.py:5](</Volumes/kovalevy 3/extinctionfield/berm/berm/biology/fertilization_cascade.py:5>).

**Vahva primaarinäyttö.** Young ym. 2024 tutkivat lähes 2 300 miehen CatSper-toimintaa. Geneettisesti puutteellinen CatSper esti hyperaktivaation ja munasolun kuoren läpäisyn myös osalla miehistä, joiden tavanomainen siemennesteanalyysi oli normaali. Yhden dokumentoidun potilaan rinnakkaisessa käsittelyssä IVF hedelmöitti 0/5 munasolua, ICSI 9/15. Näin ihmisaineisto paikantaa toiminnallisen portin ja sen ohituksen erittäin konkreettisesti. 2,3 % on tutkijoiden arvio CatSperiin liittyvästä miesperäisestä syystä selittämättömästä lapsettomuudesta kärsivien parien joukossa, ei väestöesiintyvyys. [Young ym., JCI 2024](https://www.jci.org/articles/view/173564).

Navarrete ym. 2016 palauttivat lyhyellä Ca²⁺-ionoforipulssilla IVF-kyvyn kolmen erilaisen hiiren knockout-mallin siittiöihin: CatSper1, Adcy10 ja Slo3. Ca²⁺-poistopumpun PMCA4 puutosta sama pulssi ei ohittanut. **Toiminnallinen viesti sisältää sekä sisäänvirtauksen että sitä seuraavan poistuman.** [Navarrete ym., Scientific Reports 2016](https://www.nature.com/articles/srep33589).

Saunders ym. 2002 osoittivat erillisen seuraavan signaalin: siittiön PLCζ tuotti munasolussa hedelmöityksen kaltaiset Ca²⁺-oskillaatiot ja tuki kehitystä blastokystiksi. [Saunders ym., Development 2002](https://pubmed.ncbi.nlm.nih.gov/12117804/).

**Ehdotettu integraatio:**

\[
u_{sperm}\to\{pH,V_m,CatSper,PMCA4\}\to C_s(t)
\to P(\text{hyperaktivaatio oikeassa paikassa}),
\]
\[
P(\text{hedelmöitys})=P(\text{saapuminen ja kuoren läpäisy})
\,P(\text{fuusio}\mid\text{läpäisy})
\,P(\text{aktivaatio}\mid PLC\zeta,C_o(t)).
\]

Ca²⁺-dynamiikan hyödyllinen alustava tilakuvaus on (\dot C_s=J_{CatSper}(u,pH,V_m)-J_{PMCA4}(C_s,ATP)). Päätepisteelle tarvitaan sisäänvirtauksen amplitudin lisäksi palautumisnopeus ja aktivaatiohetken suhde sijaintiin lisääntymiskanavassa.

**Mitä voi sanoa vahvemmin:** normaali siittiömäärä ja ulkonäkö eivät takaa lisääntymiskykyä; ajoitettu ionisignaali voi olla ratkaiseva itsenäinen toiminnallinen portti. BERM voi sen vuoksi selittää ehdollisesti hedelmällisyyshäiriötä, joka ei näy siittiömäärän trendissä. Tässä vahvistuu nimenomaan solutason toimintakyvyn ja toteutuvan lisääntymisen välinen yhteys.

## 2. Sama hormonimäärä voi merkitä eri biologista viestiä

**Alikäytetty ulottuvuus:** Dual Lock -artikkeli kuvaa testosteronia ja kortisolia pääosin tasoina, ja sivilisaation BioCap käyttää niiden painotettua yhdistelmää. Molekyylitason muistia, reseptorien palautumista ja hormonipulssien ajoitusta voi käyttää näiden tilojen sisäisenä mekanismina: [DualLockArticleContent.tsx:19](</Volumes/kovalevy 3/extinctionfield/website/app/[locale]/articles/[slug]/DualLockArticleContent.tsx:19>), [cultural_energy.py:25](</Volumes/kovalevy 3/extinctionfield/berm/berm/civilization/cultural_energy.py:25>).

**Primaarinäyttö.** Belchetz ym. 1978 palauttivat hypotalamusvaurioituneiden rhesusapinoiden aivolisäkkeen gonadotropiinierityksen kerran tunnissa annetulla GnRH:lla. Jatkuva annostelu ei ylläpitänyt samaa toimintaa; tutkimuksen mukaan ero aiheutui annostelun ajallisesta muodosta, ei hormonimäärästä. [Belchetz ym., Science 1978](https://pubmed.ncbi.nlm.nih.gov/100883/).

Kalafatakis ym. tutkivat 15 terveen miehen satunnaistetussa kolmen käsittelyn vaihtovuoroasetelmassa kortisolirytmiä. Endogeeninen eritys vaimennettiin, ja hydrokortisonia annettiin 20 mg/vrk eri rytmeillä. Ultradiaaninen annostelu muutti emotionaalista ja kognitiivista prosessointia. Vuoden 2021 verkostotutkimus täydentää saman tutkimusohjelman tuloksia. [PNAS 2018](https://pmc.ncbi.nlm.nih.gov/articles/PMC5924881/), [Psychoneuroendocrinology 2021](https://pmc.ncbi.nlm.nih.gov/articles/PMC7895801/).

**Ehdotettu reseptori–muisti–pulssioperaattori:**

\[
\dot r=k_{rec}(1-r)-k_{des}H(t)r,
\quad S_H=\int W(\phi(t))\,r(t)\,H(t)\,dt.
\]

(r) on reseptorin tai sitä seuraavan signalointiketjun toimintavalmius. Samansuuruinen (\int Hdt) voi tuottaa eri (S_H):n, jos pulssien väliset tauot sallivat eri määrän palautumista. Molekyylitason konformaatiomuisti antaa tässä mahdollisen fysikaalis-biologisen toteutuksen sille, miksi palautumistauko on aktiivinen muuttuja.

**Uusi yhdistelmä BERM:lle:** geometriaan kytketty ajoitusmuutos → reseptorin palautumisaika → HPG- ja HPA-pulssien dekoodaus → lisääntymisen sekä käyttäytymisen samanaikainen muutos. CRY–glukokortikoidireseptori- ja CRY–cAMP-tulokset voidaan liittää samaan operaattoriin, jolloin kellobiologia vaikuttaa sekä hormonin tuotantoon että sen vastaanottoon.

**Mitä voi sanoa vahvemmin:** hormonipitoisuus yksin ei kuvaa hormonaalista toimintaa. BERM:n hormonaalisesta tilasta kannattaa puhua määrän, ajallisen muodon ja reseptorivalmiuden yhteistuloksena. Tämä antaa mallille selitysvoimaa myös silloin, kun keskimääräinen hormonitaso muuttuu vain vähän.

## 3. Veren hormonitaso, elinkohtainen tila ja vaikutus ovat eri mittakaavoja

Nykyisessä mallissa on jo käyttökelpoinen rakenne erillisille elintiloille, steroidogeeniselle tuelle ja veri–kivesesteelle: [reproductive_state.py:97](</Volumes/kovalevy 3/extinctionfield/berm/berm/biology/reproductive_state.py:97>), [sama:361](</Volumes/kovalevy 3/extinctionfield/berm/berm/biology/reproductive_state.py:361>). Sen tueksi voi tuoda vahvan ihmisen interventionaalisen ankkurin.

**Primaarinäyttö.** Coviello ym. 2005 satunnaistivat 29 tervettä miestä testosteroniannosteluun sekä eri hCG-annoksiin. Lähtötilanteen seerumin testosteroni oli 1,2 % kiveksensisäisestä pitoisuudesta. Gonadotropiinierityksen suppressiossa kiveksensisäinen testosteroni väheni lumeryhmässä 94 %. hCG ylläpiti paikallista pitoisuutta annosriippuvaisesti, vaikka tutkimusasetelma sisälsi eksogeenista testosteronia. [Coviello ym., JCEM 2005](https://pubmed.ncbi.nlm.nih.gov/15713727/).

**Ehdotettu siirtofunktio:**

\[
\dot T_{testis}=v_{Leydig}(LH(t),redox,R,P)-k_{out}T_{testis},
\]
\[
S_{androgen,organ}=\int R_{AR}(t)\,
\frac{T_{free,organ}(t)}{K_d+T_{free,organ}(t)}dt.
\]

Seerumiarvo toimii yhtenä mittaushavaintona, paikallinen tuotanto, vapaa osuus, esteet ja reseptorivaste kuvaavat elinvaikutusta. Siemennesteeseen vaikutus siirtyy lisäksi tuotanto- ja kypsymisviiveen kautta.

**Selitysvoiman lisäys:** sama biologinen ympäristömuutos voi näkyä eri elimissä eri tavoin ja eri aikaan. Lisääntymiskyvyn, libidon, veren hormonitason ja siittiömäärän ei tarvitse muuttua samassa suhteessa. Tämä on täsmällinen tapa käyttää BERM:n taustatila- ja kudosriippuvuutta.

**Vahvempi väite:** lisääntymisjärjestelmän toiminta on elinkohtainen säätelyverkko, jonka paikallinen tila voi muuttua enemmän kuin verinäyte näyttää. Nykyinen elintilamoduuli on tämän ajatuksen hyvä alusta.

## 4. Parijakauma ja toistuvat yritykset muuttavat pienen kapasiteettimuutoksen pitkän hännän ilmiöksi

**Nykyinen valmius:** pari lasketaan jo ennen väestökeskiarvoa: [reproductive_state.py:437](</Volumes/kovalevy 3/extinctionfield/berm/berm/biology/reproductive_state.py:437>), [sama:500](</Volumes/kovalevy 3/extinctionfield/berm/berm/biology/reproductive_state.py:500>). ASFR-reitti erottaa biologisen kapasiteetin, ajoituksen, mahdollisuudet ja ART:n: [fieldstate_asfr.py:12](</Volumes/kovalevy 3/extinctionfield/berm/berm/outcomes/fieldstate_asfr.py:12>). Seuraava suuri parannus on viedä parijakauma kuukausittaisten onnistumisten kautta synnytysten järjestyslukuihin.

**Empiiriset kiinnitykset.** Bonde ym. seurasivat 430 ensimmäistä raskautta yrittävää paria kuuden kierron ajan. Raskauden todennäköisyys kasvoi siittiöpitoisuuden mukana noin 40 miljoonaan/ml asti, minkä jälkeen lisäpitoisuus ei tuonut havaittavaa lisähyötyä. Morfologia sisälsi lisäinformaatiota. Tämä antaa epälineaarisen muodon biologinen mittari → parin fekundabiliteetti -sillalle. [Bonde ym., Lancet 1998](https://pubmed.ncbi.nlm.nih.gov/9777833/).

LIFE-tutkimuksen 501 parin ennen raskautta alkanut seuranta tarjoaa mallin miehen ja naisen ominaisuuksien, siemennesteen ja raskaaksi tulemisen viiveen yhteiselle estimoinnille. [Buck Louis ym., Fertility and Sterility 2014](https://pmc.ncbi.nlm.nih.gov/articles/PMC3946620/). PRESTO-tutkimuksen 2 962 paria antaa ikään ja aiempaan raskaushistoriaan kerrostettavan rinnakkaisen ankkurin. [Wesselink ym., AJOG 2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5712257/).

**Oma laskennallinen synteesi:** parin kuukausittaiselle onnistumistodennäköisyydelle (p_i)

\[
P_i(\text{raskaus }n\text{ kierrossa})=1-(1-p_i)^n.
\]

Jos (p=0{,}25\to0{,}20), odotettu yritysaika kasvaa 4 kierrosta 5:een. Kuuden kierron onnistuminen laskee 82,2 %:sta 73,8 %:iin, vuoden onnistuminen 96,8 %:sta 93,1 %:iin. Tämä havainnollistaa, että lievä kapasiteettimuutos näkyy ensin odotusajassa ja vasta myöhemmin pysyvässä lapsiluvussa.

Jakauman häntä voi olla vielä merkittävämpi. Kahden yhtä suuren ryhmän (p=0{,}10) ja (p=0{,}30) keskiarvo on 0,20, mutta vuoden onnistuminen on keskimäärin noin 85,2 %, kun tasaisella (p=0{,}20) se on 93,1 %. Ero seuraa funktion koveruudesta; luvut ovat esimerkkilasku, eivät BERM:n kalibroituja ennusteita.

Järjestysluvulle (j) ja iälle (a) tarvitaan siirtymä

\[
\lambda_{j\to j+1}(a,t)=O_j(a,t)\,
P(\text{onnistunut elävänä syntymä}\mid x_m,x_f,\text{ajoitus},a,j).
\]

Lisääntyneen yritysajan jälkeen seuraava lapsi alkaa myöhemmin, jolloin ikäsidonnainen kapasiteetti vaikuttaa uudestaan. Näin biologinen viive voi muuttua tempoilmiöksi ja toistuvien siirtymien kautta toteutumattomaksi toiseksi tai kolmanneksi lapseksi. Haluttu lapsiluku voi säilyä samana koko ketjun ajan.

**Mitä voi sanoa vahvemmin:** hedelmällisyyden biologinen heikentyminen voi ilmetä ensin yritysajan ja epäonnistumisten jakaumassa, vaikka väestön keskimääräiset biomarkkerit muuttuisivat vähän. Tämä on BERM:lle erittäin hyödyllinen silta yksilöllisestä herkkyydestä aggregaattiin.

## 5. Unen kautta biologinen tila siirtyy toisten ihmisten käyttäytymiseen

**Nykyinen käyttö:** kolmentoista ilmiön artikkeli sisältää uni–yksinäisyys–käyttäytyminen-ketjun, mutta lyhyen biologisen muutoksen kokeellinen välittyminen myös vuorovaikutuksen toiseen osapuoleen kannattaa nostaa selittäväksi ytimeksi: [ThirteenPhenomenaContent.tsx:491](</Volumes/kovalevy 3/extinctionfield/website/app/[locale]/articles/[slug]/ThirteenPhenomenaContent.tsx:491>). Tarkistetusta lähderekisteristä eivät löytyneet seuraavien kahden tutkimuksen tekijä- tai DOI-tunnisteet.

**Primaarinäyttö.** Ben Simon ja Walker 2018 osoittivat 18 henkilön vaihtovuoroasetelmassa, että yhden yön univaje lisäsi sosiaalista etäisyyttä. Julkaisun kuvan keskimääräiset erot olivat 13,2 % ja 17,7 % kahdessa tehtävässä. Riippumattomat arvioijat kokivat univajeiset osallistujat vähemmän houkutteleviksi vuorovaikutuskumppaneiksi ja raportoivat myös omaa yksinäisyyttä videon katsomisen jälkeen. [Nature Communications 2018](https://www.nature.com/articles/s41467-018-05377-0).

Ben Simon ym. 2022 laajensivat samaa biologian ja yhteistyön siltaa. 24 henkilön vaihtovuorokokeessa univaje vähensi auttamishalua; analyysissä 23 osallistujaa ja laskua 78 %:lla. Mukana olivat myös 136 henkilön arkiseuranta ja yli kolmen miljoonan lahjoituksen aineisto kesäaikasiirtymästä. Kokeellinen ja havainnoiva osa täydentävät toisiaan eri aggregaatiotasoilla. [PLOS Biology 2022](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.3001733).

**Uusi verkostosiirto:**

\[
u_i\to\text{kello/uni}_i\to a_i\to
p_{ij}^{contact}=\sigma(b_{ij}+\beta a_i+\gamma a_j),
\]
\[
E_{social}(t)=\sum_{i<j}p_{ij}^{contact}(t)\,q_{ij}^{cooperation}(t).
\]

Henkilön (i) tila muuttaa sekä hänen omaa aloitevalmiuttaan että toisen henkilön vastetta. Siksi biologinen vaikutus voi levitä myös ihmisiin, joilla alkuperäistä fyysistä tilamuutosta ei ole. Verkoston oppiminen, odotukset ja yhteyksien katoaminen voivat jatkaa vaikutusta alkuperäistä univajetta pidempään.

**Lisäselitysvoima:** pariutumisen, ystävyyssuhteiden ja yhteistyön väheneminen voidaan johtaa konkreettisista vuorovaikutustapahtumista. Ei tarvita oletusta, että jokaisen yksilön kaikki preferenssit muuttuvat; riittää keskimääräinen muutos kontaktin aloittamisessa, vastaanottamisessa ja ylläpitämisessä. Tämä antaa sivilisaatiomallille mitattavan väliportaan biologisten markkereiden ja instituutioiden väliin.

**Vahvempi väite:** unella on kokeellisesti osoitettu kausaalinen vaikutus sosiaaliseen toimintaan, ja vaikutus voi välittyä vuorovaikutuksen toiselle osapuolelle. BERM:n ehdollinen unihaara saa näin suoran biologisen perustan yhteisötason vahvistumiselle.

## 6. Ekologinen toimintakyky voi heikentyä kohtaamisten kautta ennen yksilömäärää

**Nykyinen käyttö:** mehiläisartikkeli liittää ravinnonhankinnan, hygienian ja Varroa-paineen toisiinsa: [BeeArticleContent.tsx:96](</Volumes/kovalevy 3/extinctionfield/website/app/[locale]/articles/[slug]/BeeArticleContent.tsx:96>). Mallin seuraava hyödyllinen askel on nostaa kasvi–pölyttäjä-kohtaamisten mitattu frekvenssi erilliseksi biologiseksi päätepisteeksi.

**Primaarinäyttö.** Mallinson ym. 2025 havaitsivat kenttäkokeessa, että paikallinen vaihtosähkökenttä vähensi mehiläisten kukille laskeutumisia 71 % ja positiivinen DC-kenttä 53 %. Negatiivisen DC:n vaikutus ei ollut tilastollisesti merkitsevä. Kokeen kentät olivat noin 10–60 V/m 70 mm:n päässä elektrodista. AC-vaste myös muuttui kokeen aikana: ensimmäisen kymmenen minuutin laskeutumistaso oli 5,9 % pariverrokista ja seuraavan kymmenen minuutin 58,8 %. Tämä antaa mallille amplitudin lisäksi polariteetin ja adaptoitumisen aikaskaalan. [Mallinson ym., iScience 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC12225925/).

Knop ym. 2017 yhdistivät toisen sähkömagneettisen ympäristömuuttujan, yövalaistuksen, suoraan pölytysverkoston toimintaan ja kasvin lisääntymiseen. Yölliset kukkavierailut vähenivät 62 %, ja tutkitun kasvin hedelmätuotto 13 % päiväpölytyksestä huolimatta. Yö- ja päiväpölyttäjien verkostot olivat kytkeytyneet. [Knop ym., Nature 2017](https://www.nature.com/articles/nature23288).

**Yhdistävä operaattori:**

\[
V_{bp}=N_b\,\lambda_b\,p_{detect}(s_{bio},u)\,
p_{land}(\text{polariteetti},\text{vaihe},h)\,
O_{bloom,activity},
\]
\[
Fruit_p=Fruit_{max,p}\bigl(1-e^{-k_p V_{bp}^{effective}}\bigr),
\]

missä (h) kuvaa adaptoitumis- ja oppimishistoriaa sekä (O) kukinnan ja eläimen aktiivisuuden ajallista päällekkäisyyttä. Väestövaikutus jatkuu ravinnon, siementuotannon ja seuraavan sukupolven kautta. Optisen valon ja 50 Hz/DC-kentän vastaanottoreitit kuvataan erillisinä; yhteinen osa on niiden vaikutus kohtaamisten ja lisääntymisen aggregaatioon.

**Mitä voi sanoa vahvemmin:** sähkömagneettisen ympäristön muutoksilla on jo mitattuja reittejä ekologiseen toimintaan, jotka eivät edellytä ensimmäisenä myrkyllisyyttä tai yksilökuolemaa. BERM voi hyödyntää toiminnallisia verkostomittareita varhaisina vasteina: vierailut, laskeutuminen, ravinnon palautus ja onnistunut pölytys.

## 7. Yksi rakenne yhdistää hedelmöityksen, pariutumisen, pölytyksen ja yhteiskunnan ylläpidon

Edellisten osien vahvin uusi teoreettinen yhdistelmä on **onnistuvan ja oikea-aikaisen vuorovaikutuksen kapasiteetti**. Se ei väitä kaikkien järjestelmien reseptorien olevan samoja. Se sanoo, että niiden biologiset vaikutukset yhdistetään samoilla eksplisiittisillä aggregointiperiaatteilla:

\[
Output=\sum_{i,j}N_iN_j\,\lambda_{ij}\,
P(\text{tunnistus})P(\text{vastaanotto}\mid\text{tunnistus})
P(\text{onnistuminen}\mid\text{vastaanotto})\,O_{ij}.
\]

Tässä summan normalisointi riippuu järjestelmästä: aidosti mahdolliset parit, alue, aika ja verkoston rakenne on määriteltävä. Riippumattomien vaiheiden erikoistapauksessa pienet suhteelliset toimintavajeet kertautuvat. Esimerkiksi kolmen erillisen portin 10 % suhteellinen lasku antaa (0{,}9^3=0{,}729), eli 27,1 % pienemmän läpäisyn. Tämä on rakenne-esimerkki, ei tutkimuksista saatu BERM-efektikoko.

Ajalliselle yhteensopivuudelle voidaan käyttää päällekkäisyysintegraalia

\[
O_{ij}=\int w_i(t)w_j(t)dt.
\]

Jos kaksi yhtä leveää, normalisoitua gaussista toimintaikkunaa siirtyy suhteessa toisiinsa (\Delta\):n verran, niiden päällekkäisyys suhteessa lähtötilaan on (e^{-\Delta^2/(4\sigma^2)}). Kummankaan ikkunan oma kokonaisaktiivisuus ei vähene, mutta yhdessä onnistuva toiminta vähenee. Tämä formaloi BERM:n ajoitusajatuksen selvästi myös ilman väitettä kaikkien hormonimäärien yleisestä laskusta.

**Biologiasta sivilisaatioon:** solujen ja yksilöiden toimintakyky → onnistuneet sosiaaliset tapahtumat → verkoston ylläpito ja osaamisen siirto → tuotanto sekä instituutioiden uusintaminen. Yhteiskunta säilyttää aiempaa biologista työtä osaamisessa, infrastruktuurissa ja käytännöissä. Ehdotettu dynaaminen jatko nykyiseen (E_c=N\,BioCap\,\eta)-muotoon on

\[
\dot K(t)=\alpha E_{social}(t)-\delta K(t),
\quad \dot M(t)=\beta Q_{care,repair}(t)-\gamma M(t),
\]

missä (K) on uusiutuva osaamisvaranto ja (M) ylläpidetty infrastruktuuri. Kun vuorovaikutuksen tuottama uusintaminen jää kulumisen alle, näkyvä makromuutos tulee viiveellä. Malli saa näin materiaalisen perustan sille, miksi pienet pitkäkestoiset biologiset muutokset voivat ensin jäädä instituutioiden puskuroimiksi ja myöhemmin näkyä nopeasti.

Nykyinen liittymäkohta: [cultural_energy.py:77](</Volumes/kovalevy 3/extinctionfield/berm/berm/civilization/cultural_energy.py:77>) ja [phase_transitions.py:45](</Volumes/kovalevy 3/extinctionfield/berm/berm/civilization/phase_transitions.py:45>). Tässä esitetyt varanto- ja verkostoyhtälöt ovat uusi mallisynteesi, eivät jo sovitettu sivilisaatioennuste.

**Vahvempi BERM-muotoilu:** biologisen toimintakyvyn yhteiskunnallinen vaikutus ei rajoitu yksilön terveydentilaan tai hänen saamiensa lasten määrään. Toimintakyky määrää myös sen, kuinka usein organismit löytävät toisensa, tunnistavat oikeat signaalit, vastaavat niihin oikeaan aikaan ja uusintavat yhteisiä rakenteita. Tällä tasolla lisääntymis-, ekologinen ja sivilisaatiohaara saavat yhteisen, laskettavan logiikan.

## Käytännöllinen prioriteettijärjestys

1. **Ajoituksen käyttö vahvaksi ydinkäsitteeksi:** GnRH, kortisolipulssit, Ca²⁺-sisäänvirtaus ja poistuma sekä kahden osapuolen toimintaikkuna. Tämä on aineiston vahvin poikkitasoinen yhdistelmä.
2. **Parin kuukausittainen onnistuminen ja jakauman häntä:** nykyisen elintilamoduulin luonteva jatko, josta saadaan sekä raskaaksi tulemisen viive että synnytysten järjestysluku.
3. **Sosiaalinen verkostosiirto:** univajeen kokeelliset kontaktivaikutukset biologian ja yhteiskunnan väliseksi eksplisiittiseksi sillaksi.
4. **Ekologiset kohtaamiset ennen runsauksia:** olemassa olevan Mallinson-lähteen polariteetti ja vasteen aikakehitys sekä uusi Knop-ankkuri lisääntymistulokseen.
5. **Instituutioiden varanto- ja ylläpitodynamiikka:** yksilöiden biologiset muutokset muutetaan uusiutumisnopeuden ja kulumisen eroksi.

Lähteiden käyttöstatus tarkistettiin lähderekisteristä, käyttöindeksistä, artikkeliteksteistä ja yllä mainituista mallimoduuleista. Uusina tähän synteesiin nousivat erityisesti Belchetz 1978, Coviello 2005, Bonde 1998, LIFE, PRESTO, Ben Simon 2018/2022 sekä Knop 2017. CatSper-, Ca²⁺-rescue- ja Mallinson-näyttöä sivustolla jo on; niiden suurin lisäarvo syntyy nyt yhteisen dynaamisen ja aggregoivan rakenteen muodostamisesta.
