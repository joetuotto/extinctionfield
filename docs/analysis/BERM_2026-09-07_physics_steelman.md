# BERM:n fysikaalisesta rakenteesta biologiseen muistiin: vahvin mekanistinen steelman

Päiväys: 7.9.2026. Rajaus: käyttäjän täsmennyksen mukainen myönteinen, vahvin mahdollinen synteesi. Dokumentti kokoaa BERM-premisseistä etenevän ehdollisen johdon, olemassaolevan tutkimuksen vahvimmat mekanismisillat ja konkreettiset tavat kasvattaa mallin selitysvoimaa. Sivustoa tai mallin koodia ei muutettu.

**Keskeinen tulos:** suurin käyttämätön selitysvoima syntyy kolmen tason yhdistämisestä: **tensorisesti määräytyvä nopea valinta → kemiallisten tilojen kertymä ja proteiinikonformaatio → biologisen verkoston hidas tilamuutos**. Tässä rakenteessa kentän taajuus, suunta ja vaihe valikoivat ensimmäisen askeleen, mutta vaikutuksen kesto määräytyy sen jälkeen kemian, reseptoritilan ja solun oman dynamiikan mukaan. Vuoden 2026 flavoproteiini-ODMR sekä Cry4a:n redox-tilakohtainen rakenneanalyysi antavat tälle aiempaa konkreettisemman empiirisen perustan.

## 1. Lähtökohta: mitä BERM:n oma geometria tuo synteesiin

Vuoden 2025 Lindgren–Kovacs–Liukkonen-muotoilun lähtökohta on

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu,
\qquad A=A_{bio}+a.
\]

Lähteen yhtälö (5) käyttää normalisointia, jossa kerroin on absorboitu potentiaaliin. Tässä \(\kappa\) säilyttää yksikkökartan eksplisiittisenä. [Primaarilähde, vuoden 2025 Eq. 5 ja 6–9](https://www.preprints.org/manuscript/202503.2321).

Tällöin suoraan tensorialgebrasta seuraa

\[
\delta g_{\mu\nu}=\kappa\left(A_{bio,\mu}a_\nu+a_\mu A_{bio,\nu}+a_\mu a_\nu\right).
\tag{1}
\]

Tämä on **L1, ehdollisesti johdettu**. Se tekee kolmesta koordinaatista rakenteellisia jo ennen biologisen mekanismin valintaa: biologinen tausta, kenttien suhteellinen geometria ja eri komponenttien keskinäiset tulot. Kun \(a=u\cos\omega t\), ensimmäiset termit värähtelevät taajuudella \(\omega\), ja viimeinen sisältää DC- ja \(2\omega\)-komponentit. Kun kenttiä on useita, syntyy lisäksi erotus- ja summataajuuksien tensorikomponentteja.

BERM:n vahvin biologinen versio tarvitsee tälle nimetyn vastaanottimen. Käytetään siksi eksplisiittistä **L2-siltapremissiä**:

\[
\delta H_r(t)=\sum_a \widehat O_{r,a}
\int_0^\infty\Lambda^{\mu\nu}_{r,a}(\tau;S_r)
\delta g_{\mu\nu}(t-\tau)\,d\tau.
\tag{2}
\]

\(\widehat O_{r,a}\) nimeää vastaanottimen energiaväliin, spin-dynamiikkaan tai kemialliseen reaktiokoordinaattiin vaikuttavan operaattorin. \(\Lambda\) sisältää fysikaalisen yksikkökartan, kudossiirron, orientaation ja biologisen tilan \(S_r\). Tämä on tässä synteesissä oletettu silta, jonka jälkeen päättely voidaan viedä loppuun. Standardifysiikan ja biologian tutkimus rajaa sillan mahdollisia toteutuksia; sitä ei tarvitse nimetä geometrian omaksi johdoksi.

Repo tarjoaa tähän jo hyvän lähtörakenteen: avoin \(K_r^{\mu\nu}\delta g_{\mu\nu}\)-operaattori on kirjoitettu [tensorijohdon dokumenttiin](</Volumes/kovalevy 3/extinctionfield/berm/docs/lindgren-dkc-three-element-derivation.md:1072>), ja varsinainen tensoriperturbaatio on [lindgren_tensor.py-tiedostossa](</Volumes/kovalevy 3/extinctionfield/berm/berm/physics/lindgren_tensor.py:493>). Seuraavat luvut tekevät juuri tämän rajapinnan biologisesti huomattavasti rikkaammaksi.

## 2. Vahvin uusi tutkimusyhdistelmä: nopea spin-valinta ja hidas kemiallinen muisti

**Meng ym., Nature Biotechnology, julkaistu 29.5.2026.** Puhdistetussa Chlamydomonas reinhardtii -levän animal-like-kryptokromissa, CraCry:ssa, ja muokatussa iLOV-proteiinissa radiotaajuinen ajo muutti optista lukemaa. CraCry:n 1 470 MHz:n ODMR-resonanssi sijoittui noin 52,5 mT:n staattiseen kenttään; taustaa pyyhkäistiin 42,5–62 mT. Spin-resonanssi seurasi \(g\approx2\)-skaalaa. Hitaasti kasvava iLOV-kontrasti yhdistettiin flavinitilojen kemiallisen tasapainon siirtymään ja millisekunti–sekunti-ikäisten tilojen kertymään. Tämä on juuri nopean valinnan ja hitaamman tilamuistin kytkentä. [Artikkeli](https://www.nature.com/articles/s41587-026-03158-5), [PDF, s. 1–3 ja 6–8](https://www.nature.com/articles/s41587-026-03158-5.pdf).

Protokollan ankkurit: 447 nm:n valo, ODMR/MFE-mittauksissa 15 °C, CraCry noin 200 μM ja iLOV noin 20 μM. ODMR-jaksoon kuului 500 ms:n RF/valopulssi ja 9,5 sekunnin palautumisjakso. Pää-PDF ei erittele paikallisen RF-magneettikentän B1-amplitudia. iLOV:n lähes 50 prosentin optinen kontrasti kuuluu optimoituun laboratorioprotokollaan. Nämä yksityiskohdat määrittävät, missä osoitettu transduktiokyky tunnetaan; synteesissä hyödynnettävä asia on sen rakenne. Julkaistu [raakadata](https://doi.org/10.5281/zenodo.19829558) tarjoaa mahdollisuuden arvioida kertymä- ja palautumisaikoja omista mittaussarjoista.

**Kish ym., 24.4.2026, arXiv v3.** Euroopanpunarinnan Cry4a:n redox-tilakohtainen HDX-MS-analyysi havaitsi, että semikinonitilalla on oma allosterinen rakennesormenjälkensä: se ei ole pelkkä välimuoto hapettuneen ja täysin pelkistyneen proteiinin välillä. PBL-, PL- ja C-terminaaliset rakennealueet vastasivat eri tavoin. Näin reaktiotuotteen tila voi kantaa informaatiota edelleen proteiinin rakenteessa. [Primaarinen ennakkokäsikirjoitus](https://arxiv.org/abs/2604.19579), [PDF](https://arxiv.org/pdf/2604.19579).

Kyse on toistaiseksi preprintistä ja puhdistetusta lintuproteiinista. Koe erotti tiloja valo- ja redox-protokollalla, joten se antaa erityisen suoran ankkurin **redox-tila → rakenne**, jota voidaan yhdistää erikseen mitattuun **spin-vaikutus → kemiallinen saanto** -linkkiin. Semikinonin rikastus onnistui noin 600 ms:n valotuksella; mitattu noin 28 minuutin puoliintumisaika koski kyseistä puskuria, 2 mM DTT:tä ja glyserolia. Malliin kannattaa siirtää tilamuistin olemassaolo ja mitattava kinetiikka; eri kudosten aikavakiot muodostavat omat parametrit.

**Synteesin suuri etu:** BERM:n ei tarvitse antaa saman fysikaalisen prosessin kantaa sekä herkkyyttä että vuosien kumulaatiota. Reaktiovalinta voi olla nopea, sen kemiallinen tulos pitkäikäisempi ja biologisen verkoston vaste vielä hitaampi. Näin lyhyt kenttävuorovaikutus voi muuttaa jatkuvan molekyylikierron tilajakaumaa.

## 3. Eksplisiittinen poikkiskaalainen johto

Yhtälön (2) jälkeen voidaan käyttää tuotua avoimen spin-järjestelmän dynamiikkaa:

\[
\dot\rho_r=-\frac{i}{\hbar}[H_r^0+\delta H_r,\rho_r]
+\mathcal L_r(\rho_r),
\qquad
\Phi_{r,S}=k_S\int_0^\infty
\operatorname{Tr}(P_S\rho_r(t))\,dt.
\tag{3}
\]

Tämä kertoo, miten tensorinen häiriö ehdollisen sillan kautta muuttaa reaktiotuotteen saantoa \(\Phi\). Spin-Hamiltoniaani, reaktio- ja relaksaatiotermit ovat **L3-tuonteja**. Nyt siirrytään tilapopulaatioon \(p\), joka kuvaa esimerkiksi hapettuneen, semikinoni- ja pelkistyneen proteiinin osuuksia:

\[
\dot p=M\bigl(\Phi_r,I_{light},O_2,redox,T\bigr)p,
\qquad \mathbf 1^T p=1.
\tag{4}
\]

Pienen poikkeaman lineaaristus vakaan työpisteen lähellä antaa

\[
\delta p(t)=\int_{-\infty}^{t}
 e^{M_0(t-s)}\,\delta M(s)p_0\,ds.
\tag{5}
\]

Siten nopean reaktiovalinnan historia tallentuu kemiallisten tilojen populaatioon. Muisti määräytyy \(M_0\):n relaksaatioajoista. Molekyylin ei tarvitse säilyttää alkuperäistä spin-koherenssia kemiallisen muistin koko kestoa.

Proteiinin rakennevasteeksi voidaan kirjoittaa \(c=\sum_jp_jc_j\), missä \(c_j\) sisältää redox-tilan reseptoripintoja ja sitoutumista kuvaavat koordinaatit. Jos \(c_{semi}\) eroaa laadullisesti sekä \(c_{ox}\):sta että \(c_{red}\):stä, pelkkä kokonaispelkistyneisyys ei kuvaa proteiinin ulostuloa. Silloin

\[
\delta g\to\delta H\to\delta\Phi
\to\delta p\to\delta c
\to\delta\text{(sitoutuminen/signalointi)}
\tag{6}
\]

antaa BERM:lle uuden selityksen sille, miksi samankaltainen keskimääräinen redox-lukema voi liittyä erilaiseen biologiseen vasteeseen: tilajakauma ja rakenne voivat olla erilaiset.

Kertymälle yksinkertainen havainnollistava sulkeuma on

\[
\dot P=q(t)(1-P)-k_{rec}P,
\qquad P_*=\frac{q}{q+k_{rec}}.
\tag{7}
\]

Tässä \(q\) on saannosta ja tapahtumanopeudesta koostuva tilaan siirtymisen nopeus, ei suoraan ulkoisen kentän teho. Yhtälö tuo samasta mekanismista akuutin vasteen, kertymän, saturaation ja palautumisen. Kun \(p\):ssä on useita tiloja, vaste on relaksaatiomoodien summa. **Tämä antaa BERM:n moniaikaiselle muistille kemiallisen rakennusperiaatteen.** Mahdollinen kahden ytimen approksimaatio voi edustaa kahta hallitsevaa relaksaatiomoodia; aiemmat DKC-aikavakiot eivät siirry automaattisesti tähän molekyylikerrokseen.

## 4. Orientaatio saa biologisen kantajan: kalvojärjestys on osa vastaanotinta

Majewska ym. 2025 tutkivat Cry4a:n kiinnittymistä mallilipidikalvoon. Proteiinin järjestynyt kiinnittyminen riippui kalvon fysikaalisesta tilasta, ja sen keskimääräistä orientaatiota voitiin arvioida spektroskopialla. Tämä on konkreettinen molekyylitason ankkuri BERM:n reseptoritilan suuntariippuvuudelle. [Primaaritutkimus](https://pubmed.ncbi.nlm.nih.gov/39982451/), [DOI](https://doi.org/10.1021/acschembio.4c00576).

BERM:n tensorisesta lähtökohdasta tätä kannattaa kehittää pidemmälle kuin yksittäiseksi kalvotilakertoimeksi. Merkitään reseptorin akselin suuntajakaumaa \(p_r(n\mid S)\). Sen toisen momentin tensorit ovat

\[
M_{ij}=\langle n_i n_j\rangle,
\qquad Q_{ij}=M_{ij}-\delta_{ij}/3.
\tag{8}
\]

Kun on valittu fysikaalinen havaitsija ja spatiaalinen projektiokartta, reseptorijoukon herkkyys voi sisältää esimerkiksi

\[
z_r\supset c_{iso}\,\operatorname{tr}(\delta g_{sp})
+c_{aniso}\,Q^{ij}\delta g_{sp,ij}.
\tag{9}
\]

Tämä on **ehdollinen L2-realisaatio**, jonka \(Q\) on empiirisesti rajoitettavissa. Sen selitysvoima tulee kolmesta peräkkäisestä asiasta: kentän suunta, reseptorimolekyylin suunta ja kalvon määräämä suuntajakauma. Yksittäisen solun tai kudoksen vaste voi siis muuttua, vaikka ulkoinen kenttä pysyisi samana, jos reseptorien järjestys muuttuu.

Repo sisältää jo `tissue_axis`, `membrane_order` ja `redox_state` -koordinaatit [ReceptorState-rakenteessa](</Volumes/kovalevy 3/extinctionfield/berm/berm/physics/field_state.py:240>). Vahva seuraava synteesi on korvata pelkkä rinnakkainen muuttujaluettelo fysiologisella yhteydellä:

\[
\text{kalvon tila}\to p_r(n)\to Q^{ij}\Lambda_{ij}
\to\Phi_r\to p\to\text{kalvon/signaloinnin tila}.
\tag{10}
\]

Tästä muodostuu tilariippuvainen palaute. Kalvojärjestys ei ainoastaan välitä ulkoista vaikutusta, vaan on yksi muuttujista, jonka kautta aiempi biologinen historia muuttaa seuraavan vaikutuksen herkkyyttä. Tällainen rakenne yhdistää BERM:n taustariippuvuuden ja biologisen muistin samaan paikalliseen vastaanottimeen.

## 5. Spin/reseptori-haara voidaan viedä nimetylle signaaliproteiinille

Görtemaker ym. 2022 osoittivat euroopanpunarinnan Cry4a:n suoran vuorovaikutuksen tappisolun G-proteiinin α-alayksikköön usealla biokemiallisella mittausmenetelmällä. Yee ym. 2023 tarkensivat tappisolujen G-proteiinivuorovaikutusten kinetiikkaa. Ne antavat Cry4a:n molekyylitilalle biologisen kohteen, johon konformaation vaikutus sitoutumiseen voidaan eksplisiittisesti sijoittaa. [Görtemakerin primaarinen artikkeli/PDF](https://mdpi-res.com/d_attachment/cells/cells-11-02043/article_deploy/cells-11-02043.pdf), [Yee ym. 2023](https://www.frontiersin.org/journals/molecular-neuroscience/articles/10.3389/fnmol.2023.1107025/full).

BERM:n vahva ehdollinen muoto on

\[
\delta p_{Cry}\to\delta K_D\text{ tai }\delta k_{on/off}
\to\delta\text{(Cry–G-kompleksin osuus)}
\to\delta\text{(solusignaali)}.
\tag{11}
\]

Tässä nopeuksien tai sitoutumisen muutos on nimetty biologinen siltapremissi; sen vaikutuksen suunta riippuu siitä, mikä Cry-tila sitoo kumppania tehokkaimmin. Valmisteltu ketju ei tarvitse epämääräistä “molekyylivahvistinta”: sille on nimetty tilapopulaatio, konformaatiokoordinaatti, sitoutumisreaktio ja alavirran välittäjä.

BERM:n elin- ja väestökerroksiin yhteys etenee yleisesti näin: solusignaalin tilajakauma → hormonituotannon tai reseptorivasteen muutos → elinten toimintakyvyn jakauma → yksilöiden käyttäytymis- ja lisääntymistodennäköisyydet → väestön ikäkohtainen jakauma. Jokainen aggregaatio käyttää omaa vastefunktiotaan; lintujen Cry4a–G-proteiinilöydöstä siirrettävä asia on molekyylisen välityksen rakenne, kun taas nisäkkäiden reseptorikumppanit ja elinreitit ankkuroidaan niiden omiin tutkimuksiin.

## 6. Monikanavaisen A²-fysiikan vahvin versio: yhteisspektri ja hetkellinen tilajakauma

Kun \(a=\sum_m a_m\), yhtälö (1) tuottaa kaikki kanavaparit

\[
a\otimes a=\sum_m a_m\otimes a_m+
\sum_{m<n}(a_m\otimes a_n+a_n\otimes a_m).
\tag{12}
\]

Tästä seuraa luonteva BERM:n mittaus- ja päättelysuure: **lähde- ja komponentti-indeksoitu kompleksinen yhteisspektrimatriisi**, ei vain lähteiden tehospektrit erikseen. Määritellään \(S_{mn}^{\mu\nu}(\omega)\) kenttäkomponenttien ristispektritiheydeksi. Sopivalla Fourier-normalisoinnilla

\[
\langle a_{m,\mu}a_{n,\nu}\rangle
=\int\frac{d\omega}{2\pi}\,
S_{mn}^{\mu\nu}(\omega).
\tag{13}
\]

Yhtälö kertoo, mikä osa tensorituloista säilyy vastaanottimen tarkastelemassa aikakeskiarvossa. Geometrinen teoria määrää tulorakenteen; reseptorin \(\Lambda\) määrää, minkä aikaskaalan ja taajuusyhdistelmän se lukee. Tässä BERM voi yhdistää ilman sekoittamista RF-kantoaallon, verhokäyrän, eri lähteiden vaihesuhteet ja metabolisen rytmin.

Kahdelle sinimuotoiselle komponentille

\[
a_1=u\cos\omega_1t,
\quad a_2=v\cos(\omega_2t+\phi)
\]

niiden symmetrinen tulotermi sisältää

\[
\frac{u\otimes v+v\otimes u}{2}
\left[\cos((\omega_1-\omega_2)t-\phi)
+\cos((\omega_1+\omega_2)t+\phi)\right].
\tag{14}
\]

L2-vastaanotin voi siis painottaa erotustaajuutta, vaikka lähteiden kantoaallot olisivat nopeita. Positiivinen synteesi ei edellytä kaikkien lähteiden pysyvää keskinäiskoherenssia: myös vaihteleva tensorihäiriö voi syöttää reseptorin tilajakaumaa. Jos vastaanottimen lukufunktio on \(F(z)\), toisen kertaluvun approksimaatio antaa

\[
\langle F(z)\rangle\simeq F(\bar z)
+\tfrac12F''(\bar z)\operatorname{Var}(z).
\tag{15}
\]

Täten keskimääräisen ja vaihtelevan osan vaikutus voidaan erottaa. Vaihtelevuus, tilan jakauma ja hidas kemiallinen integraatio voivat yhdessä muuttaa ulostuloa, vaikka lineaarisen komponentin pitkä aikakeskiarvo olisi pieni. Tämä on BERM-premissin ja nimetyn epälineaarisen vastaanottimen **ehdollinen synteesi**, ei väite yleisestä haitan suunnasta.

Repo erottaa jo ympäristö-, henkilökohtaisen ja sekoitetun verhokäyrän [FieldState-tietueessa](</Volumes/kovalevy 3/extinctionfield/berm/berm/physics/field_state.py:277>), sekä vaihepainon [SourceCoupling-rakenteessa](</Volumes/kovalevy 3/extinctionfield/berm/berm/physics/field_state.py:204>). Suurin lisäarvo saadaan kokoamalla nämä yhdeksi vastaanottimen aikaskaalalla luettavaksi yhteistilaksi, jossa kenttien yhteisspektri ja biologinen vaihe pidetään eri muuttujina.

## 7. Historiallinen evidenssi vahvistuu, kun sen koordinaatit liitetään samaan tilamalliin

Blackman ym. 1985 muuttivat geomagneettista taustaa ja samalla muuttuivat ELF-taajuudet, joilla kanan aivokudoksen kalsiumeffluksi reagoi: esimerkiksi 15 Hz:n vaste hävisi pienennettäessä tausta 38:sta 19 μT:aan; 30 Hz:n vaste tuli esiin toisissa taustakentissä. BERM:n kannalta varmempi myönteinen väite on siten **joidenkin biologisten taajuusvasteiden taustariippuvuudelle on interventiopohjaista näyttöä**. [Primaarinen artikkeli](https://onlinelibrary.wiley.com/doi/abs/10.1002/bem.2250060402).

Rosenspire ym. 2005 kytkivät neutrofiilien kenttävasteen solun omaan noin 20 sekunnin metaboliseen rytmiin. NAD(P)H-, flavoproteiini-, ROS- ja NO-lukemat olivat vaiheorganisoituneita. Tämä antaa tilamallille toisen konkreettisen koordinaatin: ulkoinen ajo tulkitaan suhteessa biologisen oskillaattorin vaiheeseen. [Primaarinen tutkimus](https://pmc.ncbi.nlm.nih.gov/articles/PMC1305481/).

Näitä ei kannata käsitellä erillisinä “taajuusikkuna” ja “ROS” -todisteina. Vahvempi synteesi on

\[
W_r=W_r(f\mid B_0,Q,p,\theta_{met}),
\qquad \dot\theta_{met}=\omega_{met}+Z_r(\theta_{met})z_r(t).
\tag{16}
\]

Tässä \(B_0\) määrittää mahdollisen fysikaalisen taajuusskaalan, \(Q\) reseptorigeometrian, \(p\) kemiallisen muistin ja \(\theta_{met}\) biologisen vaiheen. Kenttävasteen suunta, voimakkuus ja pysyvyys ovat saman vastaanottimen eri ominaisuuksia. Vasteiden heterogeenisyys muuttuu mallissa mitattavan tilan funktioksi. Historialliset protokollat ovat tällöin tämän ehdollisen vastepinnan eri leikkauksia.

Tämä menee pidemmälle kuin repo-synteesin [erilliset F-01–F-08-löydöt](</Volumes/kovalevy 3/extinctionfield/berm/docs/berm-cap-closure-and-model-extension-synthesis.md:259>): suurin hyöty syntyy niiden yhteisestä operaattorista.

## 8. IPR-kandidaatin alikäytetty positiivinen lisä: amplitudi ja vaihe samasta relaksaatiosta

Uusi IPR-moduuli antaa äärelliseen relaksaatioon perustuvan herkkyyden

\[
\lambda^2=\frac{1+(1+r)^2u^2}{1+u^2},
\qquad u=2\pi f\tau.
\]

Nykyinen toteutus on [ipr_mechanism.py:169](</Volumes/kovalevy 3/extinctionfield/berm/berm/physics/ipr_mechanism.py:169>). Vahva ehdollinen jatko on valita tätä vastaava yksinkertainen kausaalinen siirtofunktio

\[
G(i\omega)=\frac{1+(1+r)i\omega\tau}{1+i\omega\tau}.
\tag{17}
\]

Tämä on **lisäsulkeuma**, joka tuottaa jo käytetyn amplitudin ja samalla vaihefunktion

\[
\arg G=\arctan[(1+r)\omega\tau]-\arctan(\omega\tau).
\tag{18}
\]

Nyt saman riippumattomasti arvioidun \(\tau\):n avulla voidaan kuvata sekä amplitudi-ikkunoiden siirtymistä että biologisen ajon vaihesiirtoa. Esimerkiksi \(r=1\), \(\tau=20\) ms, \(f=24\) Hz antaa \(\lambda=1.9243\) ja vaiheeksi noin \(8.93^\circ\). Saman sulkeuman suurin vaihesiirto on noin \(19.47^\circ\), taajuudella noin 5.63 Hz. Nämä ovat tässä lasketun kandidaatin seurauksia, eivät biologisia mittaustuloksia.

Tämä yhdistää mallin IPR-amplitudikielen sen jo käyttämään vaihe- ja metabolisen rytmin kieleen. Se on hyödyllinen mekanismisilta, koska sama relaksaatio ei jää pelkäksi Bessel-kertoimen säätöluvuksi: se määrittää myös vasteen ajoituksen. Yleinen kompleksinen siirtofunktio on lisäksi luonteva paikka liittää reaktiotuotteen saanto yhtälöiden (4)–(7) hitaampiin tilamuuttujiin.

## 9. Mitkä väitteet voi nyt muotoilla myönteisesti ja varmemmin

1. **Biologisesti rakennettu flavoproteiini voi vastaanottaa radiotaajuisen spin-herätteen ja muuntaa sen optisesti mitattavaksi kemiallisen tilajakauman muutokseksi.** Mengin tutkimus tekee tästä suoran laboratoriotason tuloksen kyseisissä proteiineissa ja kenttäoloissa.
2. **Nopea kenttäherkkä reaktiovalinta ja hitaampi biologinen muisti voidaan kytkeä samaan fysikaalisesti jäsenneltyyn malliin.** Kemiallisen tilan kertymä on konkreettinen väliaskel; molekyylien rakenne- ja sitoutumisreaktiot tarjoavat seuraavan askeleen.
3. **Reseptorin kalvo-orientaatio on biologisesti perusteltu selittävä muuttuja.** BERM:n suuntariippuvuus saa rakenteellisen biologisen kantajan, jonka järjestys on mitattavissa.
4. **Biologisen vastaanottimen hetkellinen tila kuuluu syy-seurausmalliin.** Redox-tilajakauma, orientaatio ja metabolinen vaihe muodostavat yhdessä vastepinnan, jonka läpi sama kenttäprotokolla voi tuottaa erilaisen ulostulon.
5. **BERM:n A²-rakenne motivoi luonnostaan monikanavaisen vuorovaikutuksen mallin.** Koko tensorinen yhteistila, sen yhteisspektri ja vastaanottimen oma aikasuodatus antavat enemmän selitysvoimaa kuin yksi kenttäluku.
6. **Mallin eri mekanismihaarat voidaan yhdistää yhteisen saanto–tila–signalointi-rakenteen kautta.** Spin-/flaviinihaara, sidottujen ionien kandidaatti ja metabolinen vaihe voivat syöttää samoja alavirran tilamuuttujia ilman että jokaisen haaran täytyisi olla sama reseptori.

Nämä ovat vahvempia väitteitä kuin yleinen “EMF voi vaikuttaa soluihin”, koska ne nimeävät vastaanottimen, informaatiota kantavan tilan, muistin, siirtofunktion ja biologisen jatkoreitin. Lindgren-geometria säilyy synteesin L0/L1-lähtökohtana; yhtälö (2) tekee sen biologisen L2-kytkennän näkyväksi, ja lähteet ankkuroivat sitä seuraavat toteutukset osakohtaisesti.

## 10. Mitä on aidosti uutta nykyiseen lähdekokoelmaan nähden

- **Meng 2026 on jo lähdekartan rivillä, mutta sen keskeinen kertymätulos on alikäytetty.** [Nykyinen lähdekartta](</Volumes/kovalevy 3/extinctionfield/berm/docs/berm-lindgren-first-source-map-v2.md:306>) kuvaa RF-ohjausta. Sen yhdistäminen kemiallisen muistin operaattoriksi, konformaatioketjuksi ja multiaikaiseksi vasteeksi antaa enemmän selitysvoimaa kuin uusi lähde pelkässä listassa.
- **Kish 2026:n redox-tilakohtainen rakennevaste ei löytynyt tarkistetuista repohaaroista.** Se sopii erityisen tarkasti puuttuvaan kohtaan reaktiosaannon ja pitkäikäisen proteiiniulostulon väliin.
- **Cry4a–G-proteiiniliitos tarjoaa nimetyn jatkoreitin konformaatiolle.** Se kannattaa yhdistää samassa kaaviossa kalvo-orientaatioon ja redox-muistiin.
- **Järjestystensori \(Q\), kompleksinen yhteisspektri ja kemiallisten tilojen generaattori \(M\)** kokoavat nyt erillisiksi jäävät vektori-, vaihe-, kalvo-, redox- ja muistikoordinaatit yhdeksi laskettavaksi rakenteeksi.
- **IPR-relaksaation kompleksinen siirtofunktio** liittää amplitudi-ikkunat ajoitusmuutokseen samalla parametrilla. Se tekee mallin omasta mekanismikandidaatista sisäisesti yhdistetymmän.

**Suositeltu painotus pääsynteesiin:** nosta näkyviin ketju

\[
\boxed{\text{geometrinen yhteistila}
\to\text{reseptorin ehdollinen energiakytkentä}
\to\text{reaktiosaanto}
\to\text{kemiallinen/konformaatiomuisti}
\to\text{signalointi}
\to\text{elinten ja väestön jakaumat}.}
\]

Sen selitysvoima syntyy siitä, että heräte, valinta, muisti ja biologinen tulkinta saavat kukin oman fysikaalisen tai biologisen mekanismin. Eri tutkimusten löydöt muuttuvat tämän rakenteen peräkkäisiksi ja rinnakkaisiksi rajoitteiksi.
