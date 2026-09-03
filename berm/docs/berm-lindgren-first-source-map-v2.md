# BERM: Lindgren-lähtöinen tutkimus- ja lähdekartta

**Versio:** 2.1
**Päiväys:** 3.9.2026
**Korvaa:** version 1.0  
**Kysymys:** mitä jo julkaistua tutkimusta voidaan käyttää BERM:n nykyisten todistusketjujen täydentämiseen, kun tarkastelu aloitetaan Lindgrenin omista premisseistä eikä vakiintuneista biologisista EMF-mekanismeista?

## 1. Käyttötarkoitus ja todistuskynnys

Tämä ei ole luettelo tutkimuksista, joissa sähkö- tai magneettikentällä on raportoitu jokin biologinen vaikutus. Sellainen luettelo olisi standardimallista aloitettu vaikutuskatalogi. Tässä lähteet järjestetään sen mukaan, mitä täsmällistä kohtaa Lindgrenin geometriasta alkavassa todistusketjussa ne voivat valaista.

Todistusketjun tasot ovat:

- **L0 — Lindgrenin premissi:** Lindgrenin julkaisun yhtälö, määritelmä tai eksplisiittinen väite.
- **L1 — matemaattinen seuraus ja teoriarajoite:** premissistä johdettava tulos tai riippumaton tutkimus, jonka avulla ansatzin rakennetta, konsistenssia ja suhdetta muuhun fysiikkaan voidaan arvioida.
- **L2 — geometria–havaittava-silta:** määrittely tai vasteoperaattori, joka vie geometrisen perturbaation mitattavaan fysikaaliseen tai biologiseen suureeseen.
- **L3 — tuotu biologinen realisaatio:** tunnettu biologinen vastaanotin tai mekanismi, johon geometrinen suure voitaisiin liittää vasta erikseen johdetun L2-sillan kautta.
- **L4 — alavirran havainto:** solu-, kudos-, eliö-, lisääntymis- tai populaatiotulos, joka voi olla ketjun kanssa yhteensopiva mutta ei yksilöi sen alkupään mekanismia.

Episteemiset merkinnät:

- **[JOHDETTU]** — seuraa näkyvästi ilmoitetuista premisseistä.
- **[EMERGENTTI]** — syntyy mallin rakenteesta, mutta vaatii vielä tulkinnan tai reunaehdon.
- **[TUOTU]** — peräisin mallin ulkopuolisesta teoriasta tai havainnosta.
- **[AVOIN]** — tarvittavaa johtoa, operaattoria, määrittelyä tai näyttöä ei ole.

Lisäksi jokaisesta lähderyhmästä kysytään:

1. Mitä täsmällistä ketjun kohtaa lähde tukee?
2. Mitä se ei tue?
3. Edellyttääkö sen BERM-tulkinta puuttuvaa L2-siltaa?
4. Erotteleeko tulos Lindgrenin mallin tavallisesta sähkömagnetismista?

Jos BERM- ja Lindgren-termit voidaan poistaa selityksestä ilman, että tutkimuksen varsinainen mekanistinen sisältö muuttuu, lähde on enintään **[TUOTU, L3/L4]**. Se ei ole Lindgren-spesifinen vahvistus.

## 2. Lindgrenin premissit ennen lähteitä

### 2.1 Vuoden 2021 muotoilu

Lindgrenin ja Liukkosen vuoden 2021 ansatz on

\[
g_{\mu\nu}=A_\mu A_\nu.
\]

Neljässä ulottuvuudessa ulkotulo \(A\otimes A\) on enintään rank-1. Siksi sillä ei ole tavallisen metriikan käänteismatriisia eikä siitä voida sellaisenaan muodostaa standardia Levi–Civita-yhteyttä. Tämä singularisuus on ansatzin suora algebrallinen ominaisuus **[JOHDETTU]**. Jos teoria käyttää degeneroitunutta geometriaa, sen yhteys-, kaarevuus- ja variaatioperiaate on määriteltävä erikseen **[AVOIN]**.

Vuoden 2021 artikkelissa virralle esitetään

\[
J^\nu=\nabla^\nu\nabla_\mu A^\mu,
\]

ja varauksen yhteyttä potentiaalin divergenssiin käsitellään konjektuurina. Tätä ei pidä kirjoittaa myöhemmässä BERM-tekstissä empiirisesti vahvistetuksi tulokseksi.

### 2.2 Vuoden 2025 muotoilu

Vuoden 2025 ansatz on eri:

\[
g_{\mu\nu}=\eta_{\mu\nu}+A_\mu A_\nu.
\]

Artikkelin yleistetty Maxwell-yhtälö saadaan ehdosta \(\Delta g_{\mu\nu}=0\):

\[
\nabla_\sigma A_\nu\nabla^\sigma A_\mu
+A_\nu\Delta A_\mu
+\nabla_\sigma A_\mu\nabla^\sigma A_\nu
+A_\mu\Delta A_\nu=0.
\]

Vuoden 2021 ja 2025 metriikkoja ei saa yhdistää yhdeksi jatkuvaksi yhtälöksi ilman erillistä siirtymäjohtoa.

### 2.3 BERM:n ristiperturbaatio

Kun

\[
A_\mu=A_{\mathrm{bio},\mu}+a_{\mathrm{ext},\mu},
\]

niin

\[
\delta g_{\mu\nu}=
A_{\mathrm{bio},\mu}a_{\mathrm{ext},\nu}
+a_{\mathrm{ext},\mu}A_{\mathrm{bio},\nu}
+a_{\mathrm{ext},\mu}a_{\mathrm{ext},\nu}.
\]

Tämä rank-2-tensorin identiteetti on **[JOHDETTU]**, jos jako biologiseen ja ulkoiseen potentiaaliin hyväksytään. Skalaarimuoto \(2A_{\mathrm{bio}}\!\cdot a_{\mathrm{ext}}\) syntyy vasta, jos ilmoitetaan kontraktio, metriikka, havainto-operaattori, rata tai mittausgeometria. Sen biologinen käyttö ilman näitä on **[AVOIN]**.

### 2.4 Välittömät matemaattiset rajoitteet

Vuoden 2025 metriikalle matriisideterminanttilemma antaa

\[
\det(g)=\det(\eta)\bigl(1+A^2\bigr),
\qquad A^2=\eta^{\mu\nu}A_\mu A_\nu,
\]

ja, kun \(1+A^2\neq0\),

\[
g^{\mu\nu}=\eta^{\mu\nu}-\frac{A^\mu A^\nu}{1+A^2}.
\]

Metriikka degeneroituu pinnalla \(1+A^2=0\) **[JOHDETTU]**. Teorian on määritettävä sallittu kenttäalue ja singulariteetin fysikaalinen merkitys **[AVOIN]**.

Gauge-muunnoksessa \(A\mapsto A+\mathrm d\lambda\)

\[
g'_{\mu\nu}-g_{\mu\nu}
=A_\mu\partial_\nu\lambda
+\partial_\mu\lambda A_\nu
+\partial_\mu\lambda\partial_\nu\lambda.
\]

Siten \(g=\eta+A\otimes A\) ei ole sellaisenaan U(1)-gauge-invariantti **[JOHDETTU]**. Mallin on joko annettava gauge-valinnalle fysikaalinen asema, osoitettava vastaava geometrinen ekvivalenssi tai rakennettava havaittava gauge-invariantista funktionaalista **[AVOIN]**.

Lisäksi tarvitaan:

- dimensioasteikko tai kytkentävakio, jos fysikaalisten yksiköiden \(A_\mu\) sijoitetaan dimensiottomaan metriikkaan **[AVOIN]**;
- aineen minimaalinen metriikkakytkentä voidaan asettaa eksplisiittiseksi BERM-ehdoksi ja yleinen vasteoperaattori johtaa sen alla **[JOHDETTU EHDOLLISESTI]**; kudosydin ja sen kerroin ovat **[AVOIN]**;
- GME:n alkuarvo-, hyperbolisuus-, vapausaste- ja energiarakenteen analyysi **[AVOIN]**;
- virran säilymisen ja varauksen operationalisoinnin osoitus **[AVOIN]**;
- ennuste, joka eroaa Maxwellin, QED:n tai tavallisen väliainevasteen ennusteesta **[AVOIN]**.

## 3. L0 — Lindgrenin ensisijainen korpus

| ID | Lähde | Tukee | Ei tue / asema |
|---|---|---|---|
| L0-1 | Lindgren, J. & Liukkonen, J. (2021). *Maxwell's equations from spacetime geometry and the role of Weyl curvature.* **Journal of Physics: Conference Series** 1956, 012017. [DOI](https://doi.org/10.1088/1742-6596/1956/1/012017) | Singularisen \(g=A\otimes A\) -ansatzin, artikkelin Maxwell-johdon ja virta-/varauskonjektuurin alkuperäislähde. | Ei biologista potentiaalia, vastetta tai lisääntymismekanismia. **[L0]** |
| L0-2 | Lindgren, J., Kovacs, L. & Liukkonen, J. (2025). *Electromagnetism as a purely geometric theory.* **Journal of Physics: Conference Series** 2987, 012001. [DOI](https://doi.org/10.1088/1742-6596/2987/1/012001); [ennakkoversio](https://doi.org/10.20944/preprints202503.2321.v1) | \(g=\eta+A\otimes A\), Weyl-semimetrisyyden, harmonisen metriikan, GME:n ja artikkelin geodeesi-/Aharonov–Bohm-tulkintojen alkuperäislähde. | Ei biologista \(A_{bio}\):a eikä gauge-invarianttia biologista operaattoria. **[L0]** |
| L0-3 | Lindgren, J. & Liukkonen, J. (2019). *Quantum mechanics can be understood through stochastic optimization on spacetimes.* **Scientific Reports** 9, 19984. [DOI](https://doi.org/10.1038/s41598-019-56357-3) | Tekijöiden stokastis-geometrisen ohjelman taustan. | Ei ole geometrisen elektrodynamiikan artikkeli eikä validoi vuosien 2021/2025 ansatzeja. **[L0-tausta]** |
| L0-4 | Lindgren, J. & Liukkonen, J. (2020). *The Heisenberg uncertainty principle as an endogenous equilibrium property of stochastic optimal control systems in quantum mechanics.* **Symmetry** 12, 1533. [DOI](https://doi.org/10.3390/sym12091533) | Stokastisen optimoinnin rinnakkaisen tutkimuslinjan. | Ei BERM:n metristä tai biologista johtoa. **[L0-tausta]** |
| L0-5 | Lindgren, J. ym. (2025). *Why Sabine Hossenfelder is Wrong about Geometric Electromagnetism: A Technical Response.* [Tekninen muistio](https://physicsdetective.com/wp-content/uploads/Technical-Note-Lindgren.pdf) | Tekijöiden oman vastauksen esitettyyn kritiikkiin. | Ei vertaisarvioitu riippumaton replikaatio. **[L0-kommentaari]** |

**Kirjallisuustilanne 3.9.2026:** riippumatonta vertaisarvioitua työtä, joka reprodukoisi Lindgrenin täsmällisen johdon tai testaisi ansatzia \(g=\eta+\kappa A\otimes A\) sitä erottelevalla kokeella, ei tunnistettu. BERM johtaa nyt yleisen metriikka–havaittava-operaattorin **ehdollisesti** standardista minimaalisesta materiakytkennästä ja vasteformalismista. Tämä ei ole Lindgrenin biologinen tulos: \(\kappa\), gauge-resepti, kudosydin ja ihmispäätepistekalibraatio ovat yhä **[AVOIN]**.

## 4. L1 — geometrinen tutkimusperinne ja konsistenssirajoitteet

### 4.1 Sähkömagnetismin geometrisointi

| ID | Lähde | Merkitys Lindgren-lähtöisessä tarkastelussa |
|---|---|---|
| L1-1 | Weyl, H. (1918). *Gravitation und Elektrizität.* **Sitzungsberichte der Königlich Preussischen Akademie der Wissenschaften**, 465–480. | Weyl-geometrian historiallinen lähtökohta; ei Lindgrenin ansatzin johto. **[TUOTU]** |
| L1-2 | Kaluza, T. (1921). *Zum Unitätsproblem der Physik.* **Sitzungsberichte der Preussischen Akademie der Wissenschaften**, 966–972. [Englanninkielinen uusintajulkaisu](https://doi.org/10.1142/S0218271818700017) | Sähkömagnetismin geometrisointi lisäulottuvuudella; rakenteellisesti eri teoria. **[TUOTU]** |
| L1-3 | Rainich, G. Y. (1925). *Electrodynamics in the general relativity theory.* **Transactions of the AMS** 27, 106–136. [DOI](https://doi.org/10.1090/S0002-9947-1925-1501302-6) | Kentän geometrisen karakterisoinnin klassinen vertailukohta. **[TUOTU]** |
| L1-4 | Misner, C. W. & Wheeler, J. A. (1957). *Classical physics as geometry.* **Annals of Physics** 2, 525–603. [DOI](https://doi.org/10.1016/0003-4916(57)90049-0) | Geometrodynamiikan systemaattinen ohjelma; ei Lindgren-spesifinen tuki. **[TUOTU]** |
| L1-5 | Gordon, W. (1923). *Zur Lichtfortpflanzung nach der Relativitätstheorie.* **Annalen der Physik** 377, 421–456. [DOI](https://doi.org/10.1002/andp.19233772202) | Efektiivinen optinen metriikka väliaineessa; erottaa perustavan metriikan materiaalin efektiivisestä metriikasta. **[TUOTU]** |
| L1-6 | Plebanski, J. (1960). *Electromagnetic waves in gravitational fields.* **Physical Review** 118, 1396–1408. [DOI](https://doi.org/10.1103/PhysRev.118.1396) | Geometrian ja efektiivisten materiaaliominaisuuksien välinen yhteys. **[TUOTU]** |

### 4.2 Rank-one-, disformaali- ja vektorimetrirakenteet

| ID | Lähde | Merkitys |
|---|---|---|
| L1-7 | Randers, G. (1941). *On an asymmetrical metric in the four-space of general relativity.* **Physical Review** 59, 195–199. [DOI](https://doi.org/10.1103/PhysRev.59.195) | Yksi-muodon geometrinen rooli Finsler-rakenteessa. Ei tuota Lindgrenin metriikkaa. **[TUOTU]** |
| L1-8 | Kerr, R. P. & Schild, A. (1965). *Some algebraically degenerate solutions of Einstein's gravitational field equations.* **Proc. Symposia in Applied Mathematics** 17, 199–209. [DOI](https://doi.org/10.1090/psapm/017/0216846) | Rakenteellinen vertailu rank-one-metriperturbaatioon \(\eta+Hk\otimes k\). Kerr–Schildin nollavektori- ja kenttäyhtälöehdot eivät siirry automaattisesti Lindgreniin. **[TUOTU]** |
| L1-9 | Bekenstein, J. D. (1993). *The relation between physical and gravitational geometry.* **Physical Review D** 48, 3641–3647. [DOI](https://doi.org/10.1103/PhysRevD.48.3641) | Disformaalisten metriikkasuhteiden yleinen vertailukehys; tekee näkyväksi skaalan, kausaalirakenteen ja käännettävyyden ehdot. **[TUOTU]** |
| L1-10 | Jacobson, T. & Mattingly, D. (2001). *Gravity with a dynamical preferred frame.* **Physical Review D** 64, 024028. [DOI](https://doi.org/10.1103/PhysRevD.64.024028) | Dynaamisen vektorikentän gravitaatioteorian vertailu vapausasteiden, rajoitteiden ja stabiliteetin analyysiin. Ei Lindgrenin validointi. **[TUOTU]** |
| L1-11 | Heisenberg, L. (2014). *Generalization of the Proca action.* **JCAP** 05, 015. [DOI](https://doi.org/10.1088/1475-7516/2014/05/015) | Esimerkki siitä, miten vektoriteorian vuorovaikutukset rakennetaan välttäen ylimääräisiä haitallisia vapausasteita. **[TUOTU]** |

### 4.3 Epälineaarinen elektrodynamiikka ja testattu epälineaarisuus

| ID | Lähde | Merkitys |
|---|---|---|
| L1-12 | Born, M. & Infeld, L. (1934). *Foundations of the new field theory.* **Proceedings of the Royal Society A** 144, 425–451. [DOI](https://doi.org/10.1098/rspa.1934.0059) | Klassisen epälineaarisen elektrodynamiikan vertailuteoria. **[TUOTU]** |
| L1-13 | Heisenberg, W. & Euler, H. (1936). *Folgerungen aus der Diracschen Theorie des Positrons.* **Zeitschrift für Physik** 98, 714–732. [DOI](https://doi.org/10.1007/BF01343663) | QED:n epälineaarisen efektiivisen toiminnon perusta. **[TUOTU]** |
| L1-14 | ATLAS Collaboration (2019). *Observation of light-by-light scattering in ultraperipheral Pb+Pb collisions with the ATLAS detector.* **Physical Review Letters** 123, 052001. [DOI](https://doi.org/10.1103/PhysRevLett.123.052001) | Osoittaa sähkömagneettisen vuorovaikutuksen QED-epälineaarisuuden; ei testaa Lindgrenin GME:tä. **[TUOTU]** |

### 4.4 Premetrinen elektrodynamiikka ja konstitutiivinen laki

| ID | Lähde | Merkitys |
|---|---|---|
| L1-15 | Hehl, F. W. & Obukhov, Y. N. (2003). *Foundations of Classical Electrodynamics: Charge, Flux, and Metric.* Birkhäuser. [Luku/DOI](https://doi.org/10.1007/3-540-40988-2_25) | Erottaa Maxwellin topologiset osat metriikasta riippuvasta konstitutiivisesta suhteesta. Keskeinen rajoite väitteelle, että metriikka yksin tuottaa koko sähkömagnetismin. **[TUOTU]** |
| L1-16 | Hehl, F. W. & Obukhov, Y. N. (2005). *Dimensions and units in electrodynamics.* **General Relativity and Gravitation** 37, 733–750. [DOI](https://doi.org/10.1007/s10714-005-0059-2) | Yksikkö- ja dimensioanalyysin lähde. Nostaa näkyviin \(A\otimes A\):n puuttuvan normalisointiasteikon. **[TUOTU]** |
| L1-17 | Lämmerzahl, C. & Hehl, F. W. (2004). *Riemannian light cone from vanishing birefringence in premetric vacuum electrodynamics.* **Physical Review D** 70, 105022. [DOI](https://doi.org/10.1103/PhysRevD.70.105022) | Osoittaa, millaisin ehdoin konstitutiivinen rakenne tuottaa metriikan valokartion. **[TUOTU]** |
| L1-18 | Rubilar, G. F., Obukhov, Y. N. & Hehl, F. W. (2002). *Generally covariant Fresnel equation and the emergence of the light cone structure in linear pre-metric electrodynamics.* **International Journal of Modern Physics D** 11, 1227–1242. [DOI](https://doi.org/10.1142/S0218271802002190) | Tarjoaa vertailun sille, miten havaittava etenemisrakenne johdetaan konstitutiivisesta tensorista. **[TUOTU]** |
| L1-19 | Obukhov, Y. N., Hehl, F. W. & Rubilar, G. F. (2000). *Spacetime metric from linear electrodynamics: a new axiomatic approach.* **Physical Review D** 62, 044050. [DOI](https://doi.org/10.1103/PhysRevD.62.044050) | Riippumaton reitti metriikan rekonstruointiin elektrodynamiikasta; vertailukohta Lindgrenin vastakkaissuuntaiselle johdolle. **[TUOTU]** |

**L1-johtopäätös:** kirjallisuus osoittaa, että geometrisointi, rank-one-metrimuutokset, dynaamiset vektorit ja epälineaarinen elektrodynamiikka ovat vakavasti tutkittuja rakenteita. Se ei osoita, että Lindgrenin erityinen ansatz tai GME olisi oikea. L1-lähteiden päätehtävä on määrittää ansatzille testattavat konsistenssiehdot.

## 5. L2 — ehdollinen geometria–havaittava-operaattori

Kun standardi minimaalinen materiakytkentä asetetaan näkyväksi BERM-premissiksi,

\[
\delta S_m=\frac12\int d^4x\,\sqrt{-g}\,T^{\mu\nu}\delta g_{\mu\nu},
\]

ja Kubon vasteformalismilla havaittavan ensimmäisen kertaluvun muutos voidaan kirjoittaa

\[
\delta\langle O_i(x)\rangle
=\int d^4x'\,\Xi^{\mu\nu}_{i,R}(x,x';\mathcal S_i)\,\delta g_{\mu\nu}(x')
+O(\delta g^2).
\]

Operaattorin muoto on näin **[JOHDETTU EHDOLLISESTI]**, ei enää kokonaan nimeämätön aukko. Lindgrenin julkaisuista ei kuitenkaan saada minimaalista biologista materiakytkentää, kudosydintä \(\Xi_i\), gauge-reseptiä tai numeerista endpoint-kerrointa. Alla olevat lähteet rajaavat näitä avoimia komponentteja. Kanoninen johto ja androgeenikapasiteetin biologinen jatko ovat asiakirjassa berm-conditional-response-and-androgen-capacity.md.

### 5.1 Gauge, holonomia ja potentiaalin havaittavuus

| ID | Lähde | Mitä se antaa sillalle | Mitä se ei anna |
|---|---|---|---|
| L2-1 | Aharonov, Y. & Bohm, D. (1959). *Significance of electromagnetic potentials in the quantum theory.* **Physical Review** 115, 485–491. [DOI](https://doi.org/10.1103/PhysRev.115.485) | Gauge-invariantin silmukkavaiheen \(\oint A_\mu dx^\mu\). **[TUOTU]** | Ei paikallisen \(A_\mu A_\nu\):n havaittavuutta biologisessa aineessa. |
| L2-2 | Chambers, R. G. (1960). *Shift of an electron interference pattern by enclosed magnetic flux.* **Physical Review Letters** 5, 3–5. [DOI](https://doi.org/10.1103/PhysRevLett.5.3) | AB-vaiheen varhaisen kokeellisen havainnon. **[TUOTU]** | Ei Lindgren-spesifistä metriikkatestiä. |
| L2-3 | Tonomura, A. ym. (1982). *Observation of Aharonov–Bohm effect by electron holography.* **Physical Review Letters** 48, 1443–1446. [DOI](https://doi.org/10.1103/PhysRevLett.48.1443) | Potentiaalin silmukkavaiheen elektroniholografiassa. **[TUOTU]** | Ei biologista kontraktiota. |
| L2-4 | Tonomura, A. ym. (1986). *Evidence for Aharonov–Bohm effect with magnetic field completely shielded from electron wave.* **Physical Review Letters** 56, 792–795. [DOI](https://doi.org/10.1103/PhysRevLett.56.792) | Vahvan holonomisen koetuloksen. **[TUOTU]** | Ei oikeuta käsittelemään gauge-riippuvaista paikallista potentiaalia suoraan havaittavana. |
| L2-5 | Wu, T. T. & Yang, C. N. (1975). *Concept of nonintegrable phase factors and global formulation of gauge fields.* **Physical Review D** 12, 3845–3857. [DOI](https://doi.org/10.1103/PhysRevD.12.3845) | Gauge-kentän globaalin ja geometrisen muotoilun. **[TUOTU]** | Ei Lindgrenin metriikan gauge-ekvivalenssiä. |
| L2-6 | Yang, C. N. & Mills, R. L. (1954). *Conservation of isotopic spin and isotopic gauge invariance.* **Physical Review** 96, 191–195. [DOI](https://doi.org/10.1103/PhysRev.96.191) | Gauge-rakenteen yleisen kenttäteoreettisen perustan. **[TUOTU]** | Ei ratkaise U(1)-gauge-muunnoksen vaikutusta \(A\otimes A\):han. |
| L2-7 | Wilson, K. G. (1974). *Confinement of quarks.* **Physical Review D** 10, 2445–2459. [DOI](https://doi.org/10.1103/PhysRevD.10.2445) | Gauge-invariantin silmukkaobservaabelin yleisen mallin. **[TUOTU]** | Ei biologista Wilson-silmukkaa eikä BERM-operaattoria. |
| L2-8 | Deaver, B. S. & Fairbank, W. M. (1961). *Experimental evidence for quantized flux in superconducting cylinders.* **Physical Review Letters** 7, 43–46. [DOI](https://doi.org/10.1103/PhysRevLett.7.43) | Vuo- ja vaihefunktionaalin makroskooppisen havaittavuuden. **[TUOTU]** | Suprajohteen koherenssia ei voi olettaa biologiseen järjestelmään. |
| L2-9 | Josephson, B. D. (1962). *Possible new effects in superconductive tunnelling.* **Physics Letters** 1, 251–253. [DOI](https://doi.org/10.1016/0031-9163(62)91369-0) | Vaihe-eron ja mitattavan virran eksplisiittisen kytkennän. **[TUOTU]** | Ei osoita biologista Josephson-vastetta. |

### 5.2 Lineaarinen ja epälineaarinen vasteoperaattori

| ID | Lähde | Merkitys |
|---|---|---|
| L2-10 | Kubo, R. (1957). *Statistical-mechanical theory of irreversible processes. I.* **Journal of the Physical Society of Japan** 12, 570–586. [DOI](https://doi.org/10.1143/JPSJ.12.570) | Antaa yleisen, tilasta riippuvan lineaarisen vasteen formalismin. BERM käyttää sitä ehdollisen operaattorimuodon rakennuspalikkana; Kubo ei anna Lindgren-spesifistä kudosydintä. **[TUOTU EHTO → JOHDETTU EHDOLLISESTI]** |
| L2-11 | Franken, P. A. ym. (1961). *Generation of optical harmonics.* **Physical Review Letters** 7, 118–119. [DOI](https://doi.org/10.1103/PhysRevLett.7.118) | Osoittaa, että aineen epälineaarinen suskeptibiliteetti tuottaa kenttien sekoitus- ja harmonisia termejä. **[TUOTU]** |
| L2-12 | Schwan, H. P. (1957). *Electrical properties of tissue and cell suspensions.* **Advances in Biological and Medical Physics** 5, 147–209. | Historiallinen kudoksen dispersio- ja polarisaatiokehys. **[TUOTU]** |
| L2-13 | Marszalek, P. ym. (1990). *Schwan equation and transmembrane potential induced by alternating electric fields.* **Biophysical Journal**. [DOI](https://doi.org/10.1016/S0006-3495(90)82447-4) | Ulkoisen kentän, solugeometrian ja kalvopotentiaalin välisen mitattavan siirron esimerkki. **[TUOTU]** |

**Rajoite:** tavallisen väliainevasteen epälineaarisuus voi jo tuottaa risti-, vaihe- ja suuntariippuvuutta. BERM-väitteen on osoitettava, mitä \(\delta g_{\mu\nu}\) ennustaa tämän lisäksi.

### 5.3 Kudosvälitys, dielektriset ominaisuudet ja dosimetria

| ID | Lähde | Merkitys |
|---|---|---|
| L2-14 | Gabriel, S., Lau, R. W. & Gabriel, C. (1996). *The dielectric properties of biological tissues: I. Literature survey.* **Physics in Medicine & Biology** 41. [DOI](https://doi.org/10.1088/0031-9155/41/11/001) | Kudosten dielektrisen aineiston lähtökorpus. **[TUOTU]** |
| L2-15 | Gabriel, S., Lau, R. W. & Gabriel, C. (1996). *The dielectric properties of biological tissues: II. Measurements in the frequency range 10 Hz to 20 GHz.* [DOI](https://doi.org/10.1088/0031-9155/41/11/002) | Taajuusriippuvaisen kudosmittauksen. **[TUOTU]** |
| L2-16 | Gabriel, S., Lau, R. W. & Gabriel, C. (1996). *The dielectric properties of biological tissues: III. Parametric models for the dielectric spectrum of tissues.* [DOI](https://doi.org/10.1088/0031-9155/41/11/003) | Parametrisen siirtomallin kudokselle. **[TUOTU]** |
| L2-17 | Thielens, A. ym. (2018). *Exposure of insects to radio-frequency electromagnetic fields from 2 to 120 GHz.* **Scientific Reports** 8. [DOI](https://doi.org/10.1038/s41598-018-22271-3) | Osoittaa morfologian, taajuuden ja koon määräävän absorptiota. **[TUOTU]** |
| L2-18 | Thielens, A. ym. (2020). *Radio-frequency electromagnetic field exposure of western honey bees.* **Scientific Reports** 10. [DOI](https://doi.org/10.1038/s41598-019-56948-0) | Lajikohtaisen RF-dosimetrian. **[TUOTU]** |
| L2-19 | Petri, A. K. ym. (2017). *Static electric fields: systematic review and exposure assessment.* **Environmental Health** 16. [DOI](https://doi.org/10.1186/s12940-017-0248-y) | Staattisen sähkökentän mittaus- ja altistuskäsitteiden rajauksen. **[TUOTU]** |

**Rajoite:** nämä lähteet määrittävät ulkoisen kentän ja kudoksen tavallisen sähkömagneettisen siirron. Ne eivät määritä \(A_{bio}\):a Lindgrenin metriikassa. Niitä tarvitaan kuitenkin estämään se, että geometriseksi väitetty vaste olisi tosiasiassa selittämätön dosimetrinen artefakti.

### 5.4 Endogeeninen bioelektrinen tila

| ID | Lähde | Mitä se tukee | Mitä se ei tue |
|---|---|---|---|
| L2-20 | Hodgkin, A. L. & Huxley, A. F. (1952). *A quantitative description of membrane current and its application to conduction and excitation in nerve.* **Journal of Physiology** 117, 500–544. [DOI](https://doi.org/10.1113/jphysiol.1952.sp004764) | Endogeenisten virtojen ja jännitteiden kvantitatiivisen dynamiikan. **[TUOTU]** | Ei biologista nelipotentiaalia Lindgrenin merkityksessä. |
| L2-21 | Borgens, R. B., Vanable, J. W. Jr. & Jaffe, L. F. (1977). *Bioelectricity and regeneration: large currents leave the stumps of regenerating newt limbs.* **PNAS** 74, 4528–4532. [DOI](https://doi.org/10.1073/pnas.74.10.4528) | Kausaalisesti relevantin endogeenisen virran regeneraatiossa. **[TUOTU]** | Ei \(A_{bio}\):n gaugea tai metriikkakytkentää. |
| L2-22 | Borgens, R. B., Vanable, J. W. Jr. & Jaffe, L. F. (1977). *Small artificial currents enhance Xenopus limb regeneration.* **Journal of Experimental Zoology** 200, 403–416. [DOI](https://doi.org/10.1002/jez.1402000310) | Ulkoisen virran kausaalisen vaikutuksen morfogeneettiseen prosessiin. **[TUOTU]** | Ei osoita geometrista mekanismia. |
| L2-23 | Zhao, M. ym. (2006). *Electrical signals control wound healing through PI3K-γ and PTEN.* **Nature** 442, 457–460. [DOI](https://doi.org/10.1038/nature04925) | Sähkökentän, solumigraation ja signalointireitin välisen kausaaliketjun. **[TUOTU]** | Ketju toimii ilman Lindgreniä. |
| L2-24 | Beane, W. S. ym. (2011). *A chemical genetics approach reveals H,K-ATPase-mediated membrane voltage is required for planarian head regeneration.* **Chemistry & Biology** 18, 77–89. [DOI](https://doi.org/10.1016/j.chembiol.2010.11.012) | Lepopotentiaalin morfogeneettisen välttämättömyyden. **[TUOTU]** | Ei metriikkadetektoria. |
| L2-25 | Beane, W. S. ym. (2013). *A molecular mechanism for normal and regenerative head patterning in planarians.* **Development** 140, 313–322. [DOI](https://doi.org/10.1242/dev.086900) | Bioelektrisen tilan ja anatomisen kuvioinnin mekanistisen yhteyden. **[TUOTU]** | Ei ulkoisen potentiaalin geometrista kytkentää. |
| L2-26 | Vandenberg, L. N. ym. (2011). *V-ATPase-dependent ectodermal voltage and pH regionalization are required for craniofacial morphogenesis.* **Developmental Dynamics** 240, 1889–1904. [DOI](https://doi.org/10.1002/dvdy.22685) | Spatiaalisen jännitejakauman kehitysbiologisen roolin. **[TUOTU]** | Ei nelipotentiaalin operationalisointia. |
| L2-27 | Pai, V. P. ym. (2012). *Transmembrane voltage potential controls embryonic eye patterning in Xenopus laevis.* **Development** 139, 313–323. [DOI](https://doi.org/10.1242/dev.073759) | Kalvopotentiaalin kausaalisen kuviointivaikutuksen. **[TUOTU]** | Ei Lindgren-spesifisyyttä. |
| L2-28 | Durant, F. ym. (2017). *Long-term, stochastic editing of regenerative anatomy via targeting endogenous bioelectric gradients.* **Biophysical Journal** 112, 2231–2243. [DOI](https://doi.org/10.1016/j.bpj.2017.04.011) | Bioelektrisen tilan pitkäkestoisen anatomisen vaikutuksen. **[TUOTU]** | Ei perustele FieldState-siirtofunktiota tai \(\chi\)-funktiota. |
| L2-29 | Levin, M. (2021). *Bioelectric signaling: reprogrammable circuits underlying embryogenesis, regeneration, and cancer.* **Cell** 184. [DOI](https://doi.org/10.1016/j.cell.2021.02.034) | Synteesin bioelektrisestä ohjauksesta. **[TUOTU]** | Katsaus ei muuta bioelektristä tilaa Lindgrenin metriikaksi. |
| L2-30 | Whited, J. L. & Levin, M. (2019). *Dynamic bioelectricity in developmental patterning and regeneration.* **Current Opinion in Genetics & Development** 57, 7–14. [DOI](https://doi.org/10.1016/j.gde.2019.06.014) | Dynaamisen bioelektrisen tilan katsauksen. **[TUOTU]** | Ei geometrista vasteoperaattoria. |

### 5.5 Endogeeniset magneettikentät ja kenttäkytkentä kudoksessa

| ID | Lähde | Merkitys |
|---|---|---|
| L2-31 | Baule, G. M. & McFee, R. (1963). *Detection of the magnetic field of the heart.* **American Heart Journal** 66, 95–96. [DOI](https://doi.org/10.1016/0002-8703(63)90075-9) | Endogeenisen sydänmagneettikentän mittaus. **[TUOTU]** |
| L2-32 | Cohen, D. (1968). *Magnetoencephalography: evidence of magnetic fields produced by alpha-rhythm currents.* **Science** 161, 784–786. [DOI](https://doi.org/10.1126/science.161.3843.784) | Endogeenisen aivomagneettikentän mittaus. **[TUOTU]** |
| L2-33 | Wikswo, J. P. Jr., Barach, J. P. & Freeman, J. A. (1980). *Magnetic field of a nerve impulse: first measurements.* **Science** 208, 53–55. [DOI](https://doi.org/10.1126/science.7361105) | Yksittäiseen hermoimpulssiin liittyvän kentän mittaus. **[TUOTU]** |
| L2-34 | Barry, J. F. ym. (2016). *Optical magnetic detection of single-neuron action potentials using quantum defects in diamond.* **PNAS** 113, 14133–14138. [DOI](https://doi.org/10.1073/pnas.1601513113) | Nykyisen herkän biomagneettisen mittauksen. **[TUOTU]** |
| L2-35 | Fröhlich, F. & McCormick, D. A. (2010). *Endogenous electric fields may guide neocortical network activity.* **Neuron** 67, 129–143. [DOI](https://doi.org/10.1016/j.neuron.2010.06.005) | Endogeenisen kentän ephaptisen vaikutuksen hermoverkkoon. **[TUOTU]** |
| L2-36 | Anastassiou, C. A. ym. (2011). *Ephaptic coupling of cortical neurons.* **Nature Neuroscience** 14, 217–223. [DOI](https://doi.org/10.1038/nn.2727) | Kudoksen sisäisen kenttäkytkennän kokeellisen ja laskennallisen näytön. **[TUOTU]** |

**L2-johtopäätös:** biologinen järjestelmä sisältää mitattavia kenttiä, jännitteitä, virtoja ja kentälle herkkiä tiloja. Tämä tekee biologisen taustatilan fysikaalisesti mielekkääksi tutkimuskohteeksi, mutta ei vielä määritä Lindgrenin \(A_{bio,\mu}\):a. Puuttuva askel on gauge-, yksikkö-, mittakaava- ja järjestelmäkohtainen kartoitus biologisista muuttujista metriikan vektoripotentiaaliin sekä tästä havaittavaan vasteeseen **[AVOIN]**.

## 6. L3 — tuodut biologiset realisaatiot

### 6.1 Radikaaliparimekanismin fysikaalinen ja kemiallinen perusta

| ID | Lähde | Mitä se osoittaa | BERM-raja |
|---|---|---|---|
| L3-1 | Ritz, T., Adem, S. & Schulten, K. (2000). *A model for photoreceptor-based magnetoreception in birds.* **Biophysical Journal** 78, 707–718. [DOI](https://doi.org/10.1016/S0006-3495(00)76629-X) | Radikaaliparikompassin teoreettisen mallin. **[TUOTU]** | Hamiltoniaania ei ole johdettu \(\delta g_{\mu\nu}\):sta. |
| L3-2 | Ritz, T. ym. (2004). *Resonance effects indicate a radical-pair mechanism for avian magnetic compass.* **Nature** 429, 177–180. [DOI](https://doi.org/10.1038/nature02534) | RF-taajuus- ja orientaatioriippuvan käyttäytymishäiriön. **[TUOTU]** | Yhteensopiva RPM:n kanssa; ei Lindgren-spesifinen. |
| L3-3 | Maeda, K. ym. (2008). *Chemical compass model of avian magnetoreception.* **Nature** 453, 387–390. [DOI](https://doi.org/10.1038/nature06834) | Heikon magneettikentän vaikutuksen malliradikaaliparin reaktiokinetiikkaan. **[TUOTU]** | Ei biologista reseptoria eikä geometriaa. |
| L3-4 | Hore, P. J. & Mouritsen, H. (2016). *The radical-pair mechanism of magnetoreception.* **Annual Review of Biophysics** 45, 299–344. [DOI](https://doi.org/10.1146/annurev-biophys-032116-094545) | Alan fysikaalisen ja biologisen evidenssin kriittisen synteesin. **[TUOTU]** | Katsaus ei tee RPM:stä BERM:n johdettua ydintä. |
| L3-5 | Usselman, R. J. ym. (2014). *Spin biochemistry modulates reactive oxygen species production by radio frequency magnetic fields.* **PLoS ONE** 9, e93065. [DOI](https://doi.org/10.1371/journal.pone.0093065) | RF-kentän ja spin-kemiallisen ROS-tuoton yhteyden kokeellisessa järjestelmässä. **[TUOTU]** | Ei Lindgrenin metristä eikä lisääntymispäätepistettä. |
| L3-6 | Usselman, R. J. ym. (2016). *The quantum biology of reactive oxygen species partitioning impacts cellular bioenergetics.* **Scientific Reports** 6, 38543. [DOI](https://doi.org/10.1038/srep38543) | Kenttäorientaation, ROS:n ja bioenergetiikan yhteyden solujärjestelmässä. **[TUOTU]** | Tavallinen spin-kemiallinen selitys säilyy ilman Lindgreniä. |
| L3-7 | Meng, K. ym. (2026). *Optically detected and radio wave-controlled spin chemistry in flavoproteins.* **Nature Biotechnology**. [DOI](https://doi.org/10.1038/s41587-026-03158-5) | Fotogeneroitujen spin-korreloitujen radikaaliparien optisen havaitsemisen ja RF-ohjauksen flavoproteiineissa. **[TUOTU]** | Vahvistaa RF–flavoproteiini-spin-kemian toteutettavuutta, ei geometrista alkuperää. |

### 6.2 Kryptokromi molekyylinä ja soluvälittäjänä

| ID | Lähde | Mitä se osoittaa | BERM-raja |
|---|---|---|---|
| L3-8 | Gegear, R. J. ym. (2008). *Cryptochrome mediates light-dependent magnetosensitivity in Drosophila.* **Nature** 454, 1014–1018. [DOI](https://doi.org/10.1038/nature07183) | Geneettisen CRY-riippuvuuden Drosophila-käyttäytymisessä. **[TUOTU]** | Käyttäytymistulos on myöhemmin asetettu vakavasti kyseenalaiseksi; ks. L3-18. |
| L3-9 | Gegear, R. J. ym. (2010). *Animal cryptochromes mediate magnetoreception by an unconventional photochemical mechanism.* **Nature** 463, 804–807. [DOI](https://doi.org/10.1038/nature08719) | Eläinkryptokromien toiminnallisen magnetosensitiivisyyden Drosophila-mallissa. **[TUOTU]** | Ei Lindgren-spesifinen eikä replikaatiokysymyksestä riippumaton. |
| L3-10 | Foley, L. E., Gegear, R. J. & Reppert, S. M. (2011). *Human cryptochrome exhibits light-dependent magnetosensitivity.* **Nature Communications** 2, 356. [DOI](https://doi.org/10.1038/ncomms1364) | Ihmisen CRY2:n kyvyn palauttaa Drosophila-assayn vasteen. **[TUOTU]** | Ei osoita ihmisessä toimivaa reseptoria; riippuu kiistanalaisesta Drosophila-assaysta. |
| L3-11 | Yoshii, T. ym. (2009). *Cryptochrome mediates light-dependent magnetosensitivity of the circadian clock.* **PLoS Biology** 7, e1000086. [DOI](https://doi.org/10.1371/journal.pbio.1000086) | CRY-, valo- ja kenttäriippuvan kellofenotyypin Drosophilassa. **[TUOTU]** | Ei nisäkäslisääntymistä eikä geometrista siltaa. |
| L3-12 | Fedele, G. ym. (2014). *Genetic analysis of a magnetic-field-induced clock phenotype in Drosophila.* **PLoS Genetics** 10, e1004804. [DOI](https://doi.org/10.1371/journal.pgen.1004804) | Genotyypistä riippuvan kellovasteen. **[TUOTU]** | Ei osoita yleistä tai replikoitua lajienvälistä vaikutusta. |
| L3-13 | Wan, G. J. ym. (2021). *CRY1 is necessary for light-dependent magnetoreception in monarch butterflies.* **Nature Communications** 12. [DOI](https://doi.org/10.1038/s41467-021-21002-z) | CRY1:n välttämättömyyden perhosen valoriippuvassa magnetoreseptiossa. **[TUOTU]** | Ei ihmisreseptoria eikä \(\delta g\)-kytkentää. |
| L3-14 | Xu, J. ym. (2021). *Magnetic sensitivity of cryptochrome 4 from a migratory songbird.* **Nature** 594, 535–540. [DOI](https://doi.org/10.1038/s41586-021-03618-9) | Puhdistetun lintujen CRY4:n magneettikenttäherkän fotokemian. **[TUOTU]** | Ei osoita, että ihmisen CRY tai lisääntymiskudos käyttäisi samaa reittiä. |
| L3-15 | Sherrard, R. M. ym. (2018). *Low-intensity electromagnetic fields induce human cryptochrome to modulate intracellular reactive oxygen species.* **PLoS Biology** 16, e2006229. [DOI](https://doi.org/10.1371/journal.pbio.2006229) | CRY-riippuvan soluvasteen ja ROS-muutoksen PEMF-asetelmassa. **[TUOTU]** | Ei kuluttaja-RF:tä, gonadia eikä Lindgren-spesifistä vastetta. |
| L3-16 | Bradlaugh, A. A. ym. (2023). *Essential elements of radical pair magnetosensitivity in Drosophila.* **Nature** 615, 111–116. [DOI](https://doi.org/10.1038/s41586-023-05735-z) | Neuroni- ja käyttäytymisnäyttöä, jonka mukaan vapaa FAD ja ei-kanoniset radikaaliparit voivat riittää; erottaa aistimisen ja transduktion. **[TUOTU]** | Heikentää yksinkertaista “CRY:n kanoninen Trp-ketju on ainoa sensori” -mallia; ei geometrista johtoa. |
| L3-17 | Majewska, M. ym. (2025). *European Robin Cryptochrome-4a Associates with Lipid Bilayers in an Ordered Manner.* **ACS Chemical Biology**. [DOI](https://doi.org/10.1021/acschembio.4c00576) | CRY4a:n järjestyneen kalvokytkennän, joka voi määrittää molekyylin orientaation. **[TUOTU]** | Ei osoita BERM:n tensorikontraktiota, vaikka orientaatio olisi sille relevantti. |

### 6.3 Replikaatio-, raja- ja vastanäyttö

| ID | Lähde | Tulos | Merkitys BERM:lle |
|---|---|---|---|
| L3-18 | Bassetto, M. ym. (2023). *No evidence for magnetic field effects on the behaviour of Drosophila.* **Nature** 620, 595–599. [DOI](https://doi.org/10.1038/s41586-023-06397-7) | Ei kenttävaikutusta 97 658 kärpäsen sokkelissa eikä 10 960 kärpäsen geotaksissa; alkuperäistuloksia arvioitiin mahdollisiksi vääriksi positiivisiksi. | Vahva rajoite Drosophila-käyttäytymisen käytölle BERM-tukena. Ei kumoa kaikkea spin-kemiaa, mutta estää valikoivan lähdekäytön. **[TUOTU, vastanäyttö]** |
| L3-19 | Hiscock, H. G. ym. (2017). *Disruption of magnetic compass orientation in migratory birds by radiofrequency electromagnetic fields.* **Biophysical Journal** 113. [DOI](https://doi.org/10.1016/j.bpj.2017.07.031) | Osoittaa, ettei tarkasteltu tavanomainen radikaaliparimalli ilman vahvistusta selittänyt raportoituja heikkojen RF-kenttien käyttäytymisvaikutuksia. | Mekanistinen aukko RPM:n sisällä; BERM ei saa täyttää sitä pelkällä nimeämisellä. **[TUOTU, rajoite]** |
| L3-20 | Landler, L. & Keays, D. A. (2018). *Cryptochrome: the magnetosensor with a sinister side?* **PLoS Biology** 16, e3000018. [DOI](https://doi.org/10.1371/journal.pbio.3000018) | Kriittisen arvion kryptokromin ja ROS-tulosten tulkinnasta. | Auttaa erottamaan sensorin, välittäjän ja alavirran vasteen. **[TUOTU, arvio]** |
| L3-21 | Zadeh-Haghighi, H. & Simon, C. (2022). *Magnetic field effects in biology from the perspective of the radical pair mechanism.* **Journal of the Royal Society Interface** 19, 20220325. [DOI](https://doi.org/10.1098/rsif.2022.0325) | Laajan RPM-yhteensopivien biologisten ilmiöiden synteesin. | Yhteensopivuuskatsaus, ei Lindgren-validointi eikä jokaisen ilmiön replikaatio. **[TUOTU]** |
| L3-22 | Leberecht, B. ym. (2022). *Broadband 75–85 MHz radiofrequency fields disrupt magnetic compass orientation in night-migratory songbirds.* **Journal of Comparative Physiology A**. [DOI](https://doi.org/10.1007/s00359-021-01537-8) | Taajuusalueen ja lintukompassin häiriön. **[TUOTU]** | Lajikohtainen käyttäytymistulos; ei yleinen RF-herkkyys. |
| L3-23 | Leberecht, B. ym. (2023). *Upper bound for broadband radiofrequency field disruption of magnetic compass orientation in night-migratory songbirds.* **PNAS** 120, e2301153120. [DOI](https://doi.org/10.1073/pnas.2301153120) | RF-häiriön ylemmän taajuusrajan. **[TUOTU]** | Rajaa spin-dynamiikkaa, muttei määritä Lindgrenin geometrista kytkentää. |
| L3-24 | Engels, S. ym. (2014). *Anthropogenic electromagnetic noise disrupts magnetic compass orientation in a migratory bird.* **Nature** 509, 353–356. [DOI](https://doi.org/10.1038/nature13290) | Suojaus-/maadoitusriippuvan orientaatiohäiriön. **[TUOTU]** | Tavallinen RPM-selitys on mahdollinen; ei BERM-erottelua. |

### 6.4 Muut biologiset mekanismit: vain vaihtoehtoisina realisaatioina

| ID | Lähde | Asema |
|---|---|---|
| L3-25 | Blackman, C. F. ym. (1985). *A role for the magnetic field in the radiation-induced efflux of calcium ions from brain tissue in vitro.* **Bioelectromagnetics** 6, 327–337. [DOI](https://doi.org/10.1002/bem.2250060402) | Tausta- ja taajuusriippuvan kalsiumvasteen historiallinen tulos. **[TUOTU]**; ei johda VGCC:tä tai BERM-geometriaa. |
| L3-26 | Pall, M. L. (2013). *Electromagnetic fields act via activation of voltage-gated calcium channels to produce beneficial or adverse effects.* **Journal of Cellular and Molecular Medicine** 17. [DOI](https://doi.org/10.1111/jcmm.12088) | VGCC-hypoteesin narratiivinen synteesi. **[TUOTU]**; ei primaarimekanismi ilman erottavaa näyttöä. |
| L3-27 | Yakymenko, I. ym. (2016). *Oxidative mechanisms of biological activity of low-intensity radiofrequency radiation.* **Electromagnetic Biology and Medicine** 35. [DOI](https://doi.org/10.3109/15368378.2015.1043557) | ROS-kirjallisuuden narratiivinen synteesi. **[TUOTU]**; ROS on epäspesifi alavirran päätepiste. |
| L3-28 | Lai, H. & Singh, N. P. (2004). *Magnetic-field-induced DNA strand breaks in brain cells of the rat.* **Environmental Health Perspectives** 112. [DOI](https://doi.org/10.1289/ehp.6355) | Eläinkudoksen DNA-vaurion tulos. **[TUOTU]**; ei lisääntymis- eikä geometrinen mekanismi. |
| L3-29 | Sempou, E. ym. (2022). *Membrane potential drives spermatogonial stem cell differentiation via mTOR.* **Nature Communications** 13. [DOI](https://doi.org/10.1038/s41467-022-34363-w) | Kalvopotentiaalin kausaalisen roolin spermatogonisten kantasolujen erilaistumisessa. **[TUOTU]**; upstream ei ole EMF eikä Lindgren. |
| L3-30 | Chakraborty, P. ym. (2020). *Excess iodine impairs spermatogenesis by inducing oxidative stress and perturbing blood-testis barrier.* **Reproductive Toxicology** 96. [DOI](https://doi.org/10.1016/j.reprotox.2020.06.012) | ROS–veri-kiveseste–spermatogeneesi-sillan. **[TUOTU]**; altiste on jodi, ei EMF. |

### 6.5 Vuorokausikello ja lisääntyminen

| ID | Lähde | Mitä se osoittaa | BERM-raja |
|---|---|---|---|
| L3-31 | van der Horst, G. T. J. ym. (1999). *Mammalian Cry1 and Cry2 are essential for maintenance of circadian rhythms.* **Nature** 398, 627–630. [DOI](https://doi.org/10.1038/19323) | Nisäkäskryptokromien kelloroolin. **[TUOTU]** | Kellorooli ei osoita magnetoreseptoriroolia. |
| L3-32 | Thresher, R. J. ym. (1998). *Role of mouse cryptochrome blue-light photoreceptor in circadian photoresponses.* **Science** 282, 1490–1494. [DOI](https://doi.org/10.1126/science.282.5393.1490) | CRY:n yhteyden nisäkäskelloon. **[TUOTU]** | Ei geometrista tai lisääntymiseen johtavaa kenttäkytkentää. |
| L3-33 | Miller, B. H. ym. (2004). *Circadian clock mutation disrupts estrous cyclicity and maintenance of pregnancy.* **Current Biology** 14, 1367–1373. [DOI](https://doi.org/10.1016/j.cub.2004.07.055) | Kellomutaation kausaalisen lisääntymisfenotyypin. **[TUOTU]** | Ei EMF-altistusta. |
| L3-34 | Alvarez, J. D. ym. (2008). *The circadian clock protein BMAL1 is necessary for fertility and proper testosterone production in mice.* **Journal of Biological Rhythms** 23, 26–36. [DOI](https://doi.org/10.1177/0748730407311254) | BMAL1:n välttämättömyyden hiiren hedelmällisyydelle ja testosteronille. **[TUOTU]** | Ei osoita kenttä→BMAL1-reittiä. |
| L3-35 | Liu, Y. ym. (2014). *Loss of BMAL1 in ovarian steroidogenic cells results in implantation failure in female mice.* **PNAS** 111, 14295–14300. [DOI](https://doi.org/10.1073/pnas.1209249111) | Munasarjan BMAL1:n ja progesteroni-/implantaatiofunktion yhteyden. **[TUOTU]** | Ei EMF- eikä kryptokromialtistuskoe. |
| L3-36 | He, C. ym. (2016). *Melatonin synthesis in the mitochondria of murine oocytes and its role in protecting oocytes from oxidative damage.* **International Journal of Molecular Sciences** 17, 939. [DOI](https://doi.org/10.3390/ijms17060939) | Oosyytin melatoniini–redox-suojan. **[TUOTU]** | Ei Lindgrenistä johdettu eikä kenttäaltistustutkimus. |
| L3-37 | Cao, H. ym. (2015). *Circadian Rhythmicity of Antioxidant Markers in Rats Exposed to 1.8 GHz Radiofrequency Fields.* **IJERPH** 12, 2071–2087. [DOI](https://doi.org/10.3390/ijerph120202071) | Yhden rotta-RF-protokollan vuorokausi- ja redox-riippuvuuden. **[TUOTU]** | Ei yleinen kello- tai hedelmällisyysvaikutus eikä Lindgren-spesifinen. |

**L3-johtopäätös:** radikaalipari, kryptokromi, bioelektrinen signalointi, VGCC/ROS ja vuorokausikello ovat mahdollisia biologisia realisaatioita. Mikään niistä ei ole tällä hetkellä johdettu Lindgrenin metriikasta. BERM ei saa asettaa RPM:ää, VGCC:tä, ROS:ää tai kelloa ensisijaiseksi vain siksi, että niiden kirjallisuus on runsasta.

## 7. L4 — lisääntymisbiologinen näyttö

### 7.1 Ihmisen siittiöt ex vivo ja laboratorioympäristössä

| ID | Lähde | Tulosluokka | Rajaus |
|---|---|---|---|
| L4-1 | De Iuliis, G. N. ym. (2009). *Mobile phone radiation induces reactive oxygen species production and DNA damage in human spermatozoa in vitro.* **PLoS ONE** 4, e6446. [DOI](https://doi.org/10.1371/journal.pone.0006446) | ROS, DNA-vaurio ja motiliteetti 1,8 GHz:n in vitro -altistuksessa. **[TUOTU]** | Korkea/paikallinen SAR, ei elimistön dosimetriaa eikä Lindgren-mekanismia. |
| L4-2 | Agarwal, A. ym. (2009). *Effects of radiofrequency electromagnetic waves from cellular phones on human ejaculated semen: an in vitro pilot study.* **Fertility and Sterility** 92, 1318–1325. [DOI](https://doi.org/10.1016/j.fertnstert.2008.08.022) | Paritettu siemennesteen altistus; motiliteetti-, vitaalisuus- ja ROS-päätepisteet. **[TUOTU]** | Pilotti, ex vivo, laitegeometria ja lämpö kontrolloitava. |
| L4-3 | Avendaño, C. ym. (2012). *Use of laptop computers connected to internet through Wi-Fi decreases human sperm motility and increases sperm DNA fragmentation.* **Fertility and Sterility** 97, 39–45.e2. [DOI](https://doi.org/10.1016/j.fertnstert.2011.10.012) | Motiliteetti ja DNA-fragmentaatio paritetussa asetelmassa. **[TUOTU]** | Ei henkilöaltistus; lämpö ja laitteen paikallinen kenttä sekoittavat. |
| L4-4 | Baldini, G. M. ym. (2025). *Does Electromagnetic Pollution in the ART Laboratory Affect Sperm Quality?* **Toxics** 13, 510. [DOI](https://doi.org/10.3390/toxics13060510) | ART-laboratorion paikallisympäristön ja siittiölaadun tarkastelu. **[TUOTU]** | Yksi ympäristö, lyhyt altistus; ei yleinen kausaliteetti. |

### 7.2 Mieslisääntyminen eläimissä ja ihmisissä

| ID | Lähde | Tulosluokka | Rajaus |
|---|---|---|---|
| L4-5 | Yu, G. ym. (2020). *Long-term exposure to 4G smartphone radiofrequency electromagnetic radiation diminished male reproductive potential by directly disrupting Spock3–MMP2-BTB axis.* **Science of the Total Environment** 698, 133860. [DOI](https://doi.org/10.1016/j.scitotenv.2019.133860) | Rotan veri-kiveseste, spermatogeneesi ja Spock3–MMP2-akseli. **[TUOTU]** | Protokollasidonnainen eläintulos; ei ihmisannosta eikä Lindgren-siltaa. |
| L4-6 | Meena, R. ym. (2014). *Therapeutic approaches of melatonin in microwave radiations-induced oxidative stress-mediated toxicity on male fertility pattern of Wistar rats.* **Electromagnetic Biology and Medicine** 33, 81–91. [DOI](https://doi.org/10.3109/15368378.2013.781035) | Melatoniini-/redox-välitteinen rottatulos. **[TUOTU]** | Ei ratkaise lämpöä, dosimetriaa tai geometrista alkuperää. |
| L4-7 | Møllerløkken, O. J. & Moen, B. E. (2008). *Is fertility reduced among men exposed to radiofrequency fields in the Norwegian Navy?* **Bioelectromagnetics** 29. [DOI](https://doi.org/10.1002/bem.20400) | Ammattialtistuksen kuvailevan ihmisvihjeen. **[TUOTU]** | Karkea altistusluokitus ja sekoittuminen; ei mekanismia. |
| L4-8 | Shafik, A. ym. (1992). *Effect of different types of textile fabric on spermatogenesis. I. Electrostatic potentials generated on surface of human scrotum.* **Andrologia** 24. [DOI](https://doi.org/10.1111/j.1439-0272.1992.tb02628.x) | Tekstiili–iho-rajapinnan sähköstaattisen mittauksen. **[TUOTU]** | Historiallinen ja mittausgeometrialtaan rajallinen; ei RF eikä Lindgren. |
| L4-9 | Shafik, A. (1992). *Contraceptive efficacy of polyester-induced azoospermia in normal men.* **Contraception** 45. [DOI](https://doi.org/10.1016/0010-7824(92)90157-O) | Pienen ihmisintervention lisääntymispäätepisteen. **[TUOTU]** | Kontrolloimaton; lämpö, paine, materiaali ja varaus eivät erotu. |

### 7.3 Naaraslisääntyminen, raskaus ja kehitys

| ID | Lähde | Tulosluokka | Rajaus |
|---|---|---|---|
| L4-10 | Ahmadi, S. S. ym. (2016). *Effect of non-ionizing electromagnetic field on the alteration of ovarian follicles in rats.* **Electronic Physician** 8, 2168–2174. [DOI](https://doi.org/10.19082/2168) | Rotan munasarjafollikkelien histologia. **[TUOTU]** | Yksi eläinprotokolla; ei ihmisen munasarjareserviä. |
| L4-11 | Calis, P. ym. (2021). *Does exposure of smart phones during pregnancy affect the offspring's ovarian reserve? A rat model study.* **Fetal and Pediatric Pathology** 40, 142–152. [DOI](https://doi.org/10.1080/15513815.2019.1692112) | Jälkeläisten munasarjareservin rottamalli. **[TUOTU]** | Ei ihmisnäyttöä eikä Lindgren-spesifisyyttä. |
| L4-12 | Yousefi, B. ym. (2025). *Impairment of Oogenesis and Folliculogenesis in Neonatal Rats after Maternal Exposure to Mobile Phones.* **Reproductive Sciences** 32, 2259–2269. [DOI](https://doi.org/10.1007/s43032-025-01880-0) | Neonataalisen oogeneesin/follikulogeneesin eläintulos. **[TUOTU]** | Protokollasidonnainen; ei väestökausaliteettia. |

### 7.4 Systemaattiset katsaukset: korkein käytännöllinen paino alavirran arvioinnissa

| ID | Lähde | Keskeinen tulos | BERM-tulkinta |
|---|---|---|---|
| L4-13 | Adams, J. A. ym. (2014). *Effect of mobile telephones on sperm quality: a systematic review and meta-analysis.* **Environment International** 70, 106–112. [DOI](https://doi.org/10.1016/j.envint.2014.04.015) | Varhainen meta-analyysi siittiöiden motiliteetista ja vitaalisuudesta. | Historiallinen synteesi; ei korvaa uudempaa risk-of-bias/GRADE-arviota. **[TUOTU]** |
| L4-14 | Houston, B. J. ym. (2016). *The effects of radiofrequency electromagnetic radiation on sperm function.* **Reproduction** 152. [DOI](https://doi.org/10.1530/REP-16-0126) | Mekanistinen katsaus RF:n ja siittiölaadun kirjallisuuteen. | Narratiivinen, ei riippumaton vaikutuskoko. **[TUOTU]** |
| L4-15 | La Vignera, S. ym. (2012). *Effects of the exposure to mobile phones on male reproduction: a review of the literature.* **Journal of Andrology** 33. [DOI](https://doi.org/10.2164/jandrol.111.014373) | Varhaisen ihmis-/eläinkirjallisuuden synteesi. | Altistusmittaus ja tutkimuslaatu heterogeenisiä. **[TUOTU]** |
| L4-16 | Pacchierotti, F. ym. (2021). *Effects of Radiofrequency Electromagnetic Field (RF-EMF) exposure on male fertility and pregnancy and birth outcomes: Protocols for a systematic review of experimental studies in non-human mammals and in human sperm exposed in vitro.* **Environment International** 157, 106806. [DOI](https://doi.org/10.1016/j.envint.2021.106806) | WHO-arvioinnin ennalta määritellyn menetelmän. | Protokolla, ei vaikutustulos. **[TUOTU]** |
| L4-17 | Cordelli, E. ym. (2024). *Effects of RF-EMF exposure on male fertility: systematic review of experimental studies on non-human mammals and human sperm in vitro.* **Environment International** 185, 108509. [DOI](https://doi.org/10.1016/j.envint.2024.108509); [korjaus](https://doi.org/10.1016/j.envint.2025.109449) | 117 eläin- ja 10 ihmisen in vitro -julkaisua; kohtalainen varmuus alentuneesta raskausasteesta, matala siittiömäärästä, useimmat muut tulokset hyvin epävarmoja; ei johdonmukaista annos–vastetta. | Tärkein alavirran synteesi. Tukee rajattuja haittasignaaleja, ei mekanismia eikä Lindgren-spesifisyyttä. **[TUOTU]** |
| L4-18 | Kenny, R. P. W. ym. (2024). *The effects of radiofrequency exposure on male fertility: a systematic review of human observational studies with dose-response meta-analysis.* **Environment International** 190, 108817. [DOI](https://doi.org/10.1016/j.envint.2024.108817) | Ihmishavaintotutkimusten kokonaisnäyttö arvioitiin hyvin epävarmaksi. | Estää vahvan ihmiskausaliteetin johtamisen eläin- tai in vitro -näytöstä. **[TUOTU]** |
| L4-19 | Johnson, E. E. ym. (2024). *The effects of radiofrequency exposure on adverse female reproductive outcomes: A systematic review of human observational studies with dose-response meta-analysis.* **Environment International** 190, 108816. [DOI](https://doi.org/10.1016/j.envint.2024.108816) | Ihmisen naislisääntymisen havaintonäytön systemaattinen arvio; varmuus pääosin hyvin matala. | Ei vahvaa ihmiskausaliteettia eikä mekanistista erottelua. **[TUOTU]** |
| L4-20 | Cordelli, E. ym. (2023). *Effects of radiofrequency electromagnetic field exposure on pregnancy and birth outcomes: systematic review of experimental studies in non-human mammals.* **Environment International** 180, 108178. [DOI](https://doi.org/10.1016/j.envint.2023.108178); [korjaus](https://doi.org/10.1016/j.envint.2025.109273) | Korkea varmuus siitä, ettei poikuekokoon havaittu vaikutusta; kohtalainen näyttö pienestä sikiöpainon haitasta; muut päätepisteet matalan/erittäin matalan varmuuden tasolla. | Sekä rajaava että haittaan viittaava näyttö on säilytettävä. **[TUOTU]** |
| L4-21 | Naderi, N. ym. (2026). *Influence of radiofrequency electromagnetic radiation on spermatogenesis and sperm function in rodent models: a systematic review.* **Reproductive Toxicology** 144, 109300. [DOI](https://doi.org/10.1016/j.reprotox.2026.109300) | Vuoteen 2026 ulottuva jyrsijöiden spermatogeneesi- ja siittiöfunktioiden synteesi. | Heterogeeninen eläinkorpus; ei ihmisannosta eikä Lindgren-erottelua. **[TUOTU]** |

### 7.5 Populaatiotrendi ei ole altisteattribuutio

| ID | Lähde | Käyttö |
|---|---|---|
| L4-22 | Levine, H. ym. (2023). *Temporal trends in sperm count: a systematic review and meta-regression analysis of samples collected globally in the 20th and 21st centuries.* **Human Reproduction Update** 29, 157–176. [DOI](https://doi.org/10.1093/humupd/dmac035) | Tukee siittiömäärän ajallisen trendin kuvausta. Ei tunnista RF-EMF:ää, BERM:iä tai Lindgreniä syyksi. **[TUOTU, konteksti]** |

## 8. L4 — ekologinen ja lajienvälinen aineisto

Ekologinen aineisto voi osoittaa, että sähköiset tai magneettiset ympäristömuuttujat ovat biologisesti havaittavia ja joskus käyttäytymiseen vaikuttavia. Se ei sellaisenaan osoita sivilisaatiotason kapasiteetin heikkenemistä eikä Lindgrenin geometrista mekanismia.

### 8.1 Luonnollinen elektroreseptio

| ID | Lähde | Näyttö | Raja |
|---|---|---|---|
| E-1 | England, S. J. & Robert, D. (2022). *The ecology of electricity and electroreception.* **Biological Reviews**. [DOI](https://doi.org/10.1111/brv.12804) | Laaja sähköekologian synteesi. **[TUOTU]** | Ei antropogeeninen haittavaikutus eikä Lindgren-testi. |
| E-2 | Clarke, D. ym. (2013). *Detection and learning of floral electric fields by bumblebees.* **Science**. [DOI](https://doi.org/10.1126/science.1230883) | Kimalaisen kukkien sähkökentän havaitseminen ja oppiminen. **[TUOTU]** | Luonnollinen signaali; ei RF. |
| E-3 | Greggers, U. ym. (2013). *Reception and learning of electric fields in bees.* **Proceedings of the Royal Society B**. [DOI](https://doi.org/10.1098/rspb.2013.0528) | Mehiläisen sähköaistin fysiologinen/käyttäytymiseen liittyvä näyttö. **[TUOTU]** | Ei geometrista mekanismia. |
| E-4 | Sutton, G. P. ym. (2016). *Bumblebee hairs as electric-field sensors.* **PNAS**. [DOI](https://doi.org/10.1073/pnas.1601624113) | Mekanistinen reseptori: karvojen liike sähkökentässä. **[TUOTU]** | Tavallinen sähkömekaniikka riittää. |
| E-5 | Morley, E. L. & Robert, D. (2018). *Electric fields elicit ballooning in spiders.* **Current Biology**. [DOI](https://doi.org/10.1016/j.cub.2018.05.057) | Ilmakehän sähkökentän käyttäytymisvaikutus. **[TUOTU]** | Ei populaatio- tai lisääntymisvaikutusta. |
| E-6 | England, S. J. & Robert, D. (2024). *Caterpillars detect the electric fields of predatory wasps.* **PNAS**. [DOI](https://doi.org/10.1073/pnas.2322674121) | Peto–saalis-suhteen sähköinen aistiulottuvuus. **[TUOTU]** | Ei antropogeeninen altistus. |
| E-7 | England, S. J. ym. (2023). *Static electricity passively attracts ticks onto hosts.* **Current Biology**. [DOI](https://doi.org/10.1016/j.cub.2023.06.021) | Staattisen sähkön kausaalinen rooli punkin isäntäkontaktissa. **[TUOTU]** | Ei RF eikä Lindgren. |
| E-8 | García-Robledo, C. ym. (2025). *Electroreception and electrostatic transport in flower mites.* **PNAS**. [DOI](https://doi.org/10.1073/pnas.2419214122) | Sähköaistin ja kuljetuksen toisessa taksonissa. **[TUOTU]** | Ei yleinen ekosysteemivaikutus. |
| E-9 | Ran, X. ym. (2025). *Parasitic jumping nematodes use electrical host attachment.* **PNAS**. [DOI](https://doi.org/10.1073/pnas.2503555122) | Sähköisen isäntäkontaktin sukkulamadoilla. **[TUOTU]** | Ei antropogeeninen kenttäkoe. |

### 8.2 Luonnollinen magnetoreseptio ja antropogeeninen häiriö

| ID | Lähde | Näyttö | Raja |
|---|---|---|---|
| E-10 | Lefèvre, C. T. & Bazylinski, D. A. (2013). *Ecology, diversity, and evolution of magnetotactic bacteria.* **MMBR** 77. [DOI](https://doi.org/10.1128/MMBR.00021-13) | Magnetotaksiksen vakiintunut biologinen esimerkki. **[TUOTU]** | Eri mekanismi ja mittakaava kuin BERM. |
| E-11 | Engels, S. ym. (2014). *Anthropogenic electromagnetic noise disrupts magnetic compass orientation in a migratory bird.* **Nature** 509. [DOI](https://doi.org/10.1038/nature13290) | Antropogeenisen kohinan käyttäytymisvaikutus kontrolloidussa suojausasetelmassa. **[TUOTU]** | Orientaatio ei ole lisääntymis- tai populaatiovaikutus. |
| E-12 | Leberecht, B. ym. (2022, 2023), L3-22–L3-23. | RF-toimintaspektrin rajoja lintukompassille. **[TUOTU]** | Ei universaali lajienvälinen herkkyys. |

### 8.3 Antropogeeniset kentät ja ekologiset päätepisteet

| ID | Lähde | Näyttö | Raja |
|---|---|---|---|
| E-13 | Shepherd, S. ym. (2018). *Extremely low frequency electromagnetic fields impair the cognitive and motor abilities of honey bees.* **Scientific Reports**. [DOI](https://doi.org/10.1038/s41598-018-26185-y) | 50 Hz ELF:n vaikutuksia oppimiseen, lentoon ja ruokailuun. **[TUOTU]** | Ei RF eikä populaatiotason vaikutus. |
| E-14 | Mallinson, V. J. ym. (2025). *Weak anthropogenic electric fields affect honeybee foraging.* **iScience** 28, 112550. [DOI](https://doi.org/10.1016/j.isci.2025.112550) | AC/DC- ja polariteettispesifinen kukkalaskeutumisvaste. **[TUOTU]** | Yksi laji ja päätepiste; ei Lindgren-spesifinen. |
| E-15 | Molina-Montenegro, M. A. ym. (2023). *Electromagnetic fields associated with power infrastructure affect plants and pollination.* **Science Advances**. [DOI](https://doi.org/10.1126/sciadv.adh1455) | Kasvi–pölyttäjäverkon kenttätulos infrastruktuuriympäristössä. **[TUOTU]** | Paikka- ja infrastruktuurisekoittuminen arvioitava. |
| E-16 | Treder, M. ym. (2025). *RF exposure and differential flower visits by Bombus and Apis.* **Environmental Pollution**. [DOI](https://doi.org/10.1016/j.envpol.2025.126836) | Taksonikohtaisesti erilaiset kukkavierailut 2,45/5,805 GHz:n asetelmassa. **[TUOTU]** | Yksi koe; ei populaatiokerrointa. |
| E-17 | Treder, M. ym. (2023). *Defined exposure of honey bee colonies to simulated RF-EMF: negative effects on homing ability, but not on brood development or longevity.* **Science of the Total Environment**. [DOI](https://doi.org/10.1016/j.scitotenv.2023.165211) | Samassa kokeessa sekä haittasignaali että nollatuloksia eri päätepisteissä. **[TUOTU]** | Estää “yksi kenttä–yksi yleishaitta” -tulkinnan. |
| E-18 | Lázaro, A. ym. (2016). *Electromagnetic radiation of mobile telecommunication antennas affects abundance and composition of wild pollinators.* **Journal of Insect Conservation**. [DOI](https://doi.org/10.1007/s10841-016-9868-8) | Havainnoiva yhteisögradientti. **[TUOTU]** | Altistus- ja paikkasekoittumisen riski suuri; ei kausaalinen koe. |
| E-19 | Hutchison, Z. L. ym. (2020). *Anthropogenic electromagnetic fields influence the behaviour of bottom-dwelling marine species.* **Scientific Reports**. [DOI](https://doi.org/10.1038/s41598-020-60793-x) | Merikaapeleihin liittyvien kenttien käyttäytymisvasteita. **[TUOTU]** | Ei yleinen yhteisöhaitta. |
| E-20 | Donázar-Aramendía, I. ym. (2025). *In situ assessment of HVAC-submarine-cable magnetic fields and macrobenthic communities.* **Environmental Research**. [DOI](https://doi.org/10.1016/j.envres.2024.120573) | Rajaava/negatiivinen in situ -tulos. **[TUOTU]** | Ei universaali nollatulos, mutta pakollinen vastapaino. |
| E-21 | Panagopoulos, D. J. ym. (2004). *Effect of GSM 900-MHz mobile phone radiation on the reproductive capacity of Drosophila melanogaster.* **Electromagnetic Biology and Medicine**. [DOI](https://doi.org/10.1081/JBC-120039350) | Drosophilan lisääntymispäätepisteen. **[TUOTU]** | Läheiskenttä, hyönteinen, protokollasidonnainen; ei ihmiskerroin. |
| E-22 | Manta, A. K. ym. (2014). Drosophilan munasarjan ROS-vaste RF-altistuksen jälkeen. **Electromagnetic Biology and Medicine**. [DOI](https://doi.org/10.3109/15368378.2013.791991) | Palautuvan redox-vasteen aikakulun. **[TUOTU]** | Ei pysyvä lisääntymis- tai populaatiovaikutus. |
| E-23 | Karipidis, K. ym. (2023). *Systematic map of radiofrequency electromagnetic-field effects on animals and plants.* **Environmental Evidence** 12. [DOI](https://doi.org/10.1186/s13750-023-00304-3) | Koko eläin-/kasvikirjallisuuden systemaattisen kartan ja tutkimusaukot. **[TUOTU]** | Kartta ei ole yksi yhdistetty vaikutusarvio. |
| E-24 | Thill, C. ym. (2024). *Electromagnetic fields and insects: a systematic review and meta-analysis.* **Reviews on Environmental Health**. [DOI](https://doi.org/10.1515/reveh-2023-0072) | Hyönteistutkimusten systemaattisen synteesin. **[TUOTU]** | Heterogeenisuus ja tutkimuslaatu rajoittavat yleistä kausaliteettia. |

## 9. Lähteiden todistusarvo BERM:lle

| Luokka | Mitä kirjallisuus tällä hetkellä antaa | Lindgren-spesifinen arvo |
|---|---|---|
| Lindgrenin alkuperäisjulkaisut | Teorian määritelmät ja sisäiset johdot | Välttämätön L0, mutta ei riippumaton validointi |
| Matemaattiset rakennevertailut | Vertailukielen metriikalle, vektoreille, konstitutiivisille laeille ja epälineaarisuudelle | Rajaa teoriaa; ei vahvista ansatzia |
| Gauge/holonomia | Todistaa potentiaalin gauge-invarianttien funktionaalien havaittavuuden | Osoittaa, millainen L2-silta voisi olla; samalla paljastaa paikallisen \(A\otimes A\):n gauge-ongelman |
| Bioelektrisyys/biomagnetismi | Osoittaa endogeeniset kentät ja niiden kausaalisia biologisia vaikutuksia | Tekee \(A_{bio}\)-kysymyksestä mielekkään; ei määritä sitä |
| Kudosvaste/dosimetria | Antaa tavallisen kenttä→kudos-siirron | Pakollinen kontrolli ja vaihtoehtoinen selitys |
| RPM/kryptokromi | Antaa fysikaalisesti toteutuvan kenttäherkän spin-kemiallisen järjestelmän | Mahdollinen L3-realisaatio vasta sillan jälkeen |
| Kello/lisääntyminen | Antaa kausaalista näyttöä kellon ja lisääntymisen yhteydestä | Alavirran ketju; ei kenttä→kello-siltaa |
| RF ja lisääntymispäätepisteet | Rajattuja haittasignaaleja, paljon heterogeenisuutta ja matalaa evidenssivarmuutta | Yhteensopivuus, ei BERM-identifikaatio |
| Ekologia | Luonnollisia sähkö-/magneettiaisteja ja eräitä antropogeenisia vaikutuksia | Osoittaa biologisen kenttärelevanssin, ei sivilisaatiotason kausaliteettia |

## 10. Täsmällinen aukkokartta

| Todistusaskel | Nykyinen tuki | Tila |
|---|---|---|
| \(g=A\otimes A\) (2021) | Lindgren & Liukkonen 2021 | **L0-premissi; rank-1-singularisuus [JOHDETTU]** |
| \(g=\eta+A\otimes A\) (2025) | Lindgren ym. 2025 | **L0-premissi** |
| GME tekijöiden valitsemasta toiminnosta/ehtojoukosta | Lindgren ym. 2025 | **[JOHDETTU] mallin sisällä** |
| Käännettävyysalue \(1+A^2\neq0\) | Matriisideterminanttilemma | **[JOHDETTU]** |
| Gauge-ekvivalenssi tai fysikaalinen gauge | Ei tunnistettua ratkaisua | **[AVOIN]** |
| Dimensioasteikko \(g=\eta+\kappa A\otimes A\) tai vastaava | Ei eksplisiittisesti operationalisoitu biologista käyttöä varten | **[AVOIN]** |
| Biologisen \(A_{bio,\mu}\):n määritelmä | Bioelektrinen kirjallisuus osoittaa kenttiä ja jännitteitä | **[AVOIN]** |
| \(A=A_{bio}+a_{ext}\) -jaon gauge- ja reunaehtoriippumattomuus | Ei tunnistettua johtoa | **[AVOIN]** |
| Tensorinen ristiperturbaatio | Ansatzin algebra | **[JOHDETTU] ehdollisesti** |
| \(\delta g_{\mu\nu}\rightarrow\mathcal O_{bio}\) | Holonomia, vaste- ja bioelektrisyyskirjallisuus antaa rakennusosia | **[AVOIN]** |
| \(\mathcal O_{bio}\rightarrow\Delta H\) tai \(\Delta k\) | RPM tarjoaa mahdollisen tuodun Hamiltoniaanin | **[AVOIN]** |
| Geometria → RPM/CRY | Ei tunnistettua julkaistua johtoa | **[AVOIN]** |
| CRY/RPM → biologinen vaste | Molekyyli-, solu- ja eliönäyttöä; replikaatioristiriitoja | **[TUOTU, L3]** |
| Kello → lisääntymistoiminto | Geneettistä eläinnäyttöä | **[TUOTU, L3]** |
| RF → lisääntymispäätepisteet | Systemaattisesti arvioitua mutta pääosin epävarmaa näyttöä | **[TUOTU, L4]** |
| BERM:iä Maxwell/RPM/VGCC/ROS-malleista erotteleva julkaistu tulos | Ei tunnistettu | **[AVOIN]** |
| Lindgren-johdon riippumaton replikaatio | Ei tunnistettu 1.9.2026 mennessä | **[AVOIN]** |

## 11. Tutkimusohjelman kannalta ensisijainen lukujärjestys

1. **L0-1 ja L0-2:** pidä vuoden 2021 ja 2025 teoriat erillään.
2. **Tämän asiakirjan kohdat 2.3–2.4:** tarkista tensorilaajennus, rank, determinantti, käänteismetriikka, gauge ja dimensiot ennen biologisia väitteitä.
3. **L1-15–L1-19:** määritä, mikä osa elektrodynamiikasta on topologista, mikä metristä ja mikä konstitutiivista.
4. **L2-1–L2-10:** rakenna gauge-invariantin havaittavan ja vasteoperaattorin ehdot.
5. **L2-14–L2-36:** operationalisoi biologinen taustatila ja erottele se tavallisesta kudosvälityksestä.
6. **L3-1–L3-24:** arvioi spin-kemia mahdollisena realisaationa, mukaan lukien vastanäyttö ja epäonnistunut replikaatio.
7. **L3-31–L3-37 ja L4:** käytä kello- ja lisääntymistutkimusta vasta alavirran koherenssin arviointiin.
8. **E-1–E-24:** käytä ekologista aineistoa lajikohtaisen kenttärelevanssin osoittamiseen, ei yleisen sivilisaatiokadon attribuutioon.

## 12. Lähteet ja väitteet, joita ei saa käyttää aktiivisena tukena

1. Friedman, J. ym. (2007). *Mechanism of short-term ERK activation by electromagnetic fields at mobile phone frequencies.* [DOI](https://doi.org/10.1042/BJ20061653). **Vedetty takaisin vuonna 2024; provenance-only.**
2. Diem, E. ym. (2005). *Non-thermal DNA breakage by mobile-phone radiation in human fibroblasts.* [DOI](https://doi.org/10.1016/j.mrgentox.2005.03.006). **Vakavasti kiistetty data- ja provenance-kysymysten vuoksi; ei aktiivista painoa puolesta eikä vastaan ilman erillistä arviointia.**
3. Lindgrenin tekijöiden tekninen vastine. **Ei riippumaton replikaatio.**
4. Yksittäiset populaatiotrendit, lajikadon aikasarjat tai syntyvyysmuutokset. **Ei EMF- eikä Lindgren-attribuutiota ilman altistus-, ajallisuus- ja sekoittaja-analyysia.**
5. Narratiiviset VGCC-, ROS- tai “wireless threat” -katsaukset. **Mekanismiehdokkaita, eivät BERM:n alkupään todisteita.**

Seuraavia väitteitä ei ole nykykirjallisuuden perusteella johdettu:

- \(\delta g=2A_{bio}\cdot a_{ext}\) ilman ilmoitettua kontraktiota;
- \(\chi(a)=a/\sqrt{1+a^2}\) Lindgrenin teoriasta johdettuna havaittavana;
- erityinen FieldState-siirtofunktio Lindgrenin yhtälöiden seurauksena;
- radikaaliparimekanismin ensisijaisuus;
- tietty neli- tai viisiradikaalinen Hamiltoniaani geometriasta johdettuna;
- geometria → kryptokromi → kello → lisääntyminen valmiina kausaaliketjuna;
- RF-EMF-tulos, ekologinen trendi tai siittiömäärän lasku Lindgrenin teorian vahvistuksena.

## 13. Kokonaisarvio

Jo olemassa oleva tutkimus täydentää BERM:n todistelua aidosti kolmessa kohdassa:

1. **Lindgrenin ansatz voidaan sijoittaa täsmälliseen geometrisen ja epälineaarisen elektrodynamiikan vertailukehykseen.** Tämä tuottaa konkreettiset gauge-, käännettävyys-, dimensio-, vapausaste- ja konstitutiiviset tarkistukset.
2. **Biologisella järjestelmällä on mitattava endogeeninen sähkömagneettinen tila ja kenttäherkkiä fysikaalisia realisaatioita.** Tämä tekee biologisen taustan käsitteestä tutkimuskelpoisen, mutta ei vielä samasta sitä Lindgrenin \(A_{bio}\):ksi.
3. **Alavirrassa on sekä mekanistisia rakennusosia että vaikutussignaaleja.** Spin-kemia, kryptokromi, bioelektrinen ohjaus, vuorokausikello ja lisääntymispäätepisteet muodostavat mahdollisia osaketjuja, mutta niiden näyttö on epätasaista ja osin ristiriitaista.

Ratkaisematta oleva BERM:n ydin ei siis ole lähteiden puute alavirrassa. Se on tämän eksplisiittisen johdon puute:

\[
\boxed{
\delta g_{\mu\nu}
\longrightarrow
\mathcal O_{\mathrm{bio}}^{\mathrm{gauge\text{-}inv.}}
\longrightarrow
\Delta H\ \text{tai}\ \Delta k
\longrightarrow
\text{toistettava biologinen päätepiste}
}
\]

Nykyisen lähdekorpuksen täsmällinen johtopäätös on siksi:

> Lindgrenin geometrinen premissi on julkaistu, ja sen ympärille voidaan koota laaja joukko matemaattisia rajoitteita, gauge-havaittavuuden tutkimusta, bioelektrisiä taustatiloja, kenttäherkkiä biologisia realisaatioita sekä lisääntymis- ja ekologisia päätepisteitä. Mikään tunnistettu riippumaton tutkimus ei kuitenkaan vielä yhdistä näitä Lindgren-spesifiseksi, gauge-invariantiksi ja empiirisesti erottelevaksi kausaaliketjuksi.
