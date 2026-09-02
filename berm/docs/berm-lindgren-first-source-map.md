# BERM: Lindgren-lähtöinen lähdekartta

> **Arkistoitu versio 1.0.** Ajantasainen, uudelleen rakennettu ja laajennettu lähdekartta on [versio 2.0](./berm-lindgren-first-source-map-v2.md). Tätä tiedostoa ei pidä käyttää ensisijaisena lähdekarttana.

**Versio:** 1.0  
**Päiväys:** 1.9.2026  
**Tarkoitus:** kartoittaa jo olemassa oleva tutkimus sen mukaan, mitä osaa Lindgrenin geometriasta alkavasta BERM-todistusketjusta se tosiasiallisesti tukee.

## 1. Rajaus ja arviointiperiaate

Tämä lähdekartta ei aloita tarkastelua biologisista RF-EMF-mekanismeista eikä etsi niille jälkikäteen Lindgren-yhteensopivaa sanastoa. Lähtökohtana ovat Lindgrenin julkaistut geometriset premissit ja niiden täsmällinen matemaattinen sisältö. Vasta tämän jälkeen tarkastellaan tutkimusta, joka voi täydentää ketjun seuraavia osia.

Lähde kuuluu aineistoon vain, jos sen asema ketjussa voidaan ilmaista seuraavilla tasoilla:

- **L0 — Lindgrenin premissi:** Lindgrenin oman teorian määritelmä, yhtälö tai eksplisiittinen väite.
- **L1 — geometrinen seuraus tai rakennevertailu:** tulos, joka seuraa premissistä, tai riippumaton tutkimusperinne, joka auttaa arvioimaan rakenteen matemaattista asemaa.
- **L2 — geometria–havaittava-silta:** tutkimus, jonka avulla voidaan määritellä, millä operaattorilla geometrinen perturbaatio voisi muuttua fysikaalisesti tai biologisesti havaittavaksi suureeksi.
- **L3 — tuotu biologinen realisaatio:** tunnettu biologinen mekanismi, johon geometrinen suure voitaisiin yhdistää, jos L2-silta johdetaan erikseen.
- **L4 — alavirran havainto:** biologinen, lisääntymisterveydellinen tai populaatiotason tulos, joka voi olla yhteensopiva ketjun kanssa mutta ei yksin osoita sen alkupään mekanismia.

Episteemiset merkinnät:

- **[JOHDETTU]** — tulos on johdettu näkyvästi ilmoitetuista premisseistä.
- **[EMERGENTTI]** — tulos syntyy mallin rakenteesta, mutta sen soveltaminen edellyttää vielä täsmennettyä tulkintaa tai reunaehtoa.
- **[TUOTU]** — mekanismi tai tulos on peräisin mallin ulkopuolisesta tutkimuksesta.
- **[AVOIN]** — tarvittavaa johtoa, operaattoria, määrittelyä tai riippumatonta näyttöä ei ole tunnistettu.

L3- ja L4-tason yhteensopivuus ei vahvista L0–L2-tasoja. Lähde voi siten olla biologisesti vahva ja silti Lindgren-spesifisen todistelun kannalta heikko.

## 2. Lindgrenin fysikaalinen ydin

### 2.1 Vuoden 2021 singularinen metriikka

Lindgrenin ja Liukkosen vuoden 2021 artikkeli käyttää ansatzia

\[
g_{\mu\nu}=A_\mu A_\nu.
\]

Artikkelissa Einstein–Hilbert-toiminnosta ja Ricci-tasaisuudesta johdetaan sähkömagneettiseen potentiaaliin liittyviä kenttäyhtälöitä. Sähkövirralle esitetään muoto

\[
J^\nu=\nabla^\nu\nabla_\mu A^\mu,
\]

ja varauksen yhteys potentiaalin divergenssiin esitetään teorian keskeisenä konjektuurina. Tämä julkaisu on BERM-ketjun ensisijainen L0-lähde, ei itsenäisesti vahvistettu empiirinen tulos.

### 2.2 Vuoden 2025 Weyl/GME-muotoilu

Lindgrenin, Kovacsin ja Liukkosen vuoden 2025 artikkelissa lähtökohta on Weylin semimetrisyys

\[
\nabla_\sigma g_{\mu\nu}=2\phi_\sigma g_{\mu\nu}
\]

ja harmonisen metriikan toimintoperiaate. Metriikka on nyt

\[
g_{\mu\nu}=\eta_{\mu\nu}+A_\mu A_\nu,
\]

ei vuoden 2021 singularinen metriikka. Ehdosta \(\Delta g_{\mu\nu}=0\) saadaan artikkelissa yleistetty Maxwellin yhtälö

\[
\nabla_\sigma A_\nu\nabla^\sigma A_\mu
+A_\nu\Delta A_\mu
+\nabla_\sigma A_\mu\nabla^\sigma A_\nu
+A_\mu\Delta A_\nu=0.
\]

Kun potentiaali jaetaan biologiseen taustaan ja ulkoiseen perturbaatioon,

\[
A_\mu=A_{\mathrm{bio},\mu}+a_{\mathrm{ext},\mu},
\]

metriikan muutos on

\[
\delta g_{\mu\nu}
=A_{\mathrm{bio},\mu}a_{\mathrm{ext},\nu}
+a_{\mathrm{ext},\mu}A_{\mathrm{bio},\nu}
+a_{\mathrm{ext},\mu}a_{\mathrm{ext},\nu}.
\]

Tämä on rank-2-tensori. Sitä ei voida korvata skalaarilla \(2A_{\mathrm{bio}}\!\cdot a_{\mathrm{ext}}\) ilman erikseen määriteltyä kontraktiota, havainto-operaattoria ja mittausgeometriaa. Lineaarisen termin olemassaolo on **[JOHDETTU]**; sen biologinen merkitys on **[AVOIN]**.

## 3. L0: ensisijainen Lindgren-korpus

### L0.1 Lindgren & Liukkonen (2021)

Lindgren, J. & Liukkonen, J. **Maxwell's equations from spacetime geometry and the role of Weyl curvature.** *Journal of Physics: Conference Series* 1956, 012017. [DOI 10.1088/1742-6596/1956/1/012017](https://doi.org/10.1088/1742-6596/1956/1/012017). [Aalto-yliopiston julkaisuarkisto](https://aaltodoc.aalto.fi/items/02ff4963-d1dc-4de0-9766-0cccae530291).

- **Tukee:** vuoden 2021 singularisen ansatzin, geometrisen Maxwell-johdon sekä Weyl-kaarevuutta, potentiaalin divergenssiä ja virtaa koskevat alkuperäiset väitteet.
- **Ei tue:** biologista potentiaalia, ulkoisen kentän ja biologisen järjestelmän kytkentää, RPM:ää, vuorokausikelloa tai lisääntymisvaikutuksia.
- **Asema:** L0; teorian alkuperäislähde. Artikkelin oma konjektuuri ei muutu johdetuksi biologiseksi mekanismiksi myöhemmällä yhteensopivuudella.

### L0.2 Lindgren, Kovacs & Liukkonen (2025)

Lindgren, J., Kovacs, L. & Liukkonen, J. **Electromagnetism as a purely geometric theory.** *Journal of Physics: Conference Series* 2987, 012001. [DOI 10.1088/1742-6596/2987/1/012001](https://doi.org/10.1088/1742-6596/2987/1/012001). [Virallinen julkaisutietue](https://www.julkari.fi/items/6b3f9542-196c-4816-9088-daa9bf8bbb66). [Avoin ennakkoversio](https://www.preprints.org/manuscript/202503.2321).

- **Tukee:** Weyl-semimetrisyyteen, harmoniseen metriikkaan, metriikkaan \(\eta+A\otimes A\) ja GME-yhtälöön perustuvan vuoden 2025 muotoilun.
- **Ei tue:** biologisen nelipotentiaalin operationalisointia, tensorisen perturbaation biologista lukemista tai mitään erityistä reseptori- tai lisääntymismekanismia.
- **Asema:** L0; BERM-ketjun ajantasaisin varsinainen fysikaalinen premissi.

### L0.3 Lindgren & Liukkonen (2019)

Lindgren, J. & Liukkonen, J. **Quantum mechanics can be understood through stochastic optimization on spacetimes.** *Scientific Reports* 9, 19984. [DOI 10.1038/s41598-019-56357-3](https://doi.org/10.1038/s41598-019-56357-3).

- **Tukee:** tekijöiden laajempaa stokastis-geometrista tutkimusohjelmaa.
- **Ei tue:** vuoden 2021 tai 2025 metristä ansatzia eikä BERM:n biologista kytkentää.
- **Asema:** rinnakkainen L0-taustalähde; ei pidä esittää Lindgrenin geometrisen sähkömagnetismin validointina.

### L0.4 Lindgren & Liukkonen (2020)

Lindgren, J. & Liukkonen, J. **The Heisenberg uncertainty principle as an endogenous equilibrium property of stochastic optimal control systems in quantum mechanics.** *Symmetry* 12, 1533. [DOI 10.3390/sym12091533](https://doi.org/10.3390/sym12091533).

- **Tukee:** stokastisen optimoinnin tutkimusohjelman toista osaa.
- **Ei tue:** BERM:n metristä perturbaatiota tai biologista todistusketjua.
- **Asema:** taustakorpus, ei itsenäinen tukipilari.

### L0.5 Tekijöiden tekninen vastine (2025)

Lindgren, J. ym. **Why Sabine Hossenfelder is Wrong about Geometric Electromagnetism: A Technical Response.** [Tekninen muistio](https://physicsdetective.com/wp-content/uploads/Technical-Note-Lindgren.pdf).

- **Tukee:** tekijöiden omaa täsmennystä teorian kritiikkiin.
- **Ei tue:** riippumatonta replikaatiota, vertaisarvioitua validointia tai biologista sovellusta.
- **Asema:** L0-kommentaari; ei riippumaton lähde.

**Hakutulos 1.9.2026:** riippumatonta vertaisarvioitua tutkimusta, joka reprodukoisi Lindgrenin johdon, testaisi erityisesti ansatzia \(g=\eta+A\otimes A\) tai johtaisi siitä biologisen havainto-operaattorin, ei tunnistettu. Tämä kohta on **[AVOIN]**.

## 4. L1: geometriset rakennevertailut

Seuraavat tutkimuslinjat osoittavat, että sähkömagnetismin geometrisointi, potentiaalista muodostetut metriikkarakenteet ja epälineaarinen elektrodynamiikka ovat legitiimejä fysikaalisia tutkimuskohteita. Ne eivät kuitenkaan johda Lindgrenin täsmällistä ansatzia tai GME:tä eivätkä siten validoi niitä.

1. Weyl, H. (1918). **Gravitation und Elektrizität.** *Sitzungsberichte der Königlich Preussischen Akademie der Wissenschaften zu Berlin*, 465–480.  
   **Merkitys:** Weyl-geometrian historiallinen perusta. **[TUOTU, L1]**

2. Kaluza, T. (1921). **Zum Unitätsproblem der Physik.** *Sitzungsberichte der Preussischen Akademie der Wissenschaften*, 966–972. [Englanninkielisen uusintajulkaisun DOI](https://doi.org/10.1142/S0218271818700017).  
   **Merkitys:** sähkömagnetismin geometrisointi lisäulottuvuuden avulla; eri teoria kuin Lindgrenin nelidimensioinen ansatz. **[TUOTU, L1]**

3. Rainich, G. Y. (1925). **Electrodynamics in the general relativity theory.** *Transactions of the American Mathematical Society* 27, 106–136. [DOI 10.1090/S0002-9947-1925-1501302-6](https://doi.org/10.1090/S0002-9947-1925-1501302-6).  
   **Merkitys:** sähkömagneettisen kentän geometrinen karakterisointi ilman eksplisiittistä kenttätensoria. **[TUOTU, L1]**

4. Misner, C. W. & Wheeler, J. A. (1957). **Classical physics as geometry.** *Annals of Physics* 2, 525–603. [DOI 10.1016/0003-4916(57)90049-0](https://doi.org/10.1016/0003-4916(57)90049-0).  
   **Merkitys:** geometrodynamiikan systemaattinen ohjelma; historiallinen rakennevertailu. **[TUOTU, L1]**

5. Gordon, W. (1923). **Zur Lichtfortpflanzung nach der Relativitätstheorie.** *Annalen der Physik* 377, 421–456. [DOI 10.1002/andp.19233772202](https://doi.org/10.1002/andp.19233772202).  
   **Merkitys:** efektiivinen optinen metriikka väliaineessa; osoittaa metriikan ja sähkömagneettisen etenemisen välisen rakenteellisen yhteyden. **[TUOTU, L1]**

6. Randers, G. (1941). **On an asymmetrical metric in the four-space of general relativity.** *Physical Review* 59, 195–199. [DOI 10.1103/PhysRev.59.195](https://doi.org/10.1103/PhysRev.59.195).  
   **Merkitys:** potentiaalin kaltainen yksi-muoto osana Finsler-geometriaa. **[TUOTU, L1]**

7. Kerr, R. P. & Schild, A. (1965). **Some algebraically degenerate solutions of Einstein's gravitational field equations.** *Proceedings of Symposia in Applied Mathematics* 17, 199–209. [DOI 10.1090/psapm/017/0216846](https://doi.org/10.1090/psapm/017/0216846).  
   **Merkitys:** rank-one-metriperturbaation \(\eta+Hk\otimes k\) rakennevertailu; ei Lindgren-johdon lähde. **[TUOTU, L1]**

8. Bekenstein, J. D. (1993). **The relation between physical and gravitational geometry.** *Physical Review D* 48, 3641–3647. [DOI 10.1103/PhysRevD.48.3641](https://doi.org/10.1103/PhysRevD.48.3641).  
   **Merkitys:** disformaaliset metriikkasuhteet; hyödyllinen arvioitaessa, mitä lisärakenteita rank-one-metrimuutos vaatii. **[TUOTU, L1]**

9. Plebanski, J. (1960). **Electromagnetic waves in gravitational fields.** *Physical Review* 118, 1396–1408. [DOI 10.1103/PhysRev.118.1396](https://doi.org/10.1103/PhysRev.118.1396).  
   **Merkitys:** avaruusajan geometrian esittäminen efektiivisinä sähkömagneettisina materiaaliominaisuuksina. **[TUOTU, L1]**

10. Born, M. & Infeld, L. (1934). **Foundations of the new field theory.** *Proceedings of the Royal Society A* 144, 425–451. [DOI 10.1098/rspa.1934.0059](https://doi.org/10.1098/rspa.1934.0059).  
    **Merkitys:** klassinen epälineaarinen elektrodynamiikka. Se osoittaa epälineaaristen kenttäyhtälöiden tutkimuskelpoisuuden mutta ei Lindgrenin GME:n oikeellisuutta. **[TUOTU, L1]**

11. Heisenberg, W. & Euler, H. (1936). **Folgerungen aus der Diracschen Theorie des Positrons.** *Zeitschrift für Physik* 98, 714–732. [DOI 10.1007/BF01343663](https://doi.org/10.1007/BF01343663).  
    **Merkitys:** kvanttielektrodynamiikan epälineaarinen efektiivinen toiminto. **[TUOTU, L1]**

12. ATLAS Collaboration (2019). **Observation of light-by-light scattering in ultraperipheral Pb+Pb collisions with the ATLAS detector.** *Physical Review Letters* 123, 052001. [DOI 10.1103/PhysRevLett.123.052001](https://doi.org/10.1103/PhysRevLett.123.052001).  
    **Merkitys:** empiirinen näyttö sähkömagneettisen vuorovaikutuksen epälineaarisuudesta QED:n ennustamassa järjestelmässä. Ei testaa Lindgrenin geometriaa. **[TUOTU, L1]**

## 5. L2: geometrisen suureen ja havaittavan ilmiön väliset siltalähteet

L2 on nykyisen todistusketjun ratkaiseva osa. Tarvittava yleinen muoto on

\[
\mathcal O_{\mathrm{bio}}=\mathcal M^{\mu\nu}[\text{järjestelmä, reunaehdot, mittaus}]\,\delta g_{\mu\nu}
\]

tai muu eksplisiittisesti määritelty gauge-invariantti funktionaali. Operaattoria \(\mathcal M^{\mu\nu}\) ei ole johdettu Lindgrenin julkaisuissa eikä tunnistetussa biologisessa tutkimuksessa. Seuraavat lähteet rajaavat mahdollisia siltoja, mutta eivät yksin muodosta sellaista.

### 5.1 Potentiaalin holonomia ja vaihe havaittavina suureina

1. Aharonov, Y. & Bohm, D. (1959). **Significance of electromagnetic potentials in the quantum theory.** *Physical Review* 115, 485–491. [DOI 10.1103/PhysRev.115.485](https://doi.org/10.1103/PhysRev.115.485).  
2. Chambers, R. G. (1960). **Shift of an electron interference pattern by enclosed magnetic flux.** *Physical Review Letters* 5, 3–5. [DOI 10.1103/PhysRevLett.5.3](https://doi.org/10.1103/PhysRevLett.5.3).  
3. Tonomura, A. ym. (1982). **Observation of Aharonov–Bohm effect by electron holography.** *Physical Review Letters* 48, 1443–1446. [DOI 10.1103/PhysRevLett.48.1443](https://doi.org/10.1103/PhysRevLett.48.1443).  
4. Tonomura, A. ym. (1986). **Evidence for Aharonov–Bohm effect with magnetic field completely shielded from electron wave.** *Physical Review Letters* 56, 792–795. [DOI 10.1103/PhysRevLett.56.792](https://doi.org/10.1103/PhysRevLett.56.792).  
5. Wu, T. T. & Yang, C. N. (1975). **Concept of nonintegrable phase factors and global formulation of gauge fields.** *Physical Review D* 12, 3845–3857. [DOI 10.1103/PhysRevD.12.3845](https://doi.org/10.1103/PhysRevD.12.3845).  
6. Deaver, B. S. & Fairbank, W. M. (1961). **Experimental evidence for quantized flux in superconducting cylinders.** *Physical Review Letters* 7, 43–46. [DOI 10.1103/PhysRevLett.7.43](https://doi.org/10.1103/PhysRevLett.7.43).  
7. Josephson, B. D. (1962). **Possible new effects in superconductive tunnelling.** *Physics Letters* 1, 251–253. [DOI 10.1016/0031-9163(62)91369-0](https://doi.org/10.1016/0031-9163(62)91369-0).

**Mitä kokonaisuus tukee:** sähkömagneettinen potentiaali voi osallistua gauge-invarianttiin ja mitattavaan silmukka-, vuo- tai vaihefunktionaaliin. **[TUOTU, L2]**

**Mitä se ei tue:** paikallinen \(A_\mu A_\nu\) ei muutu näiden tulosten perusteella sellaisenaan gauge-invariantiksi biologiseksi havaittavaksi. Päinvastoin aineisto osoittaa, että BERM tarvitsee eksplisiittisen holonomian, reunaehdon tai muun gauge-käsittelyn. **[AVOIN]**

### 5.2 Epälineaariset ja bilineaariset havainto-operaattorit

1. Franken, P. A., Hill, A. E., Peters, C. W. & Weinreich, G. (1961). **Generation of optical harmonics.** *Physical Review Letters* 7, 118–119. [DOI 10.1103/PhysRevLett.7.118](https://doi.org/10.1103/PhysRevLett.7.118).  
2. Josephson (1962), edellä.  
3. ATLAS Collaboration (2019), edellä.

**Mitä kokonaisuus tukee:** fysikaaliset mittalaitteet ja materiaalit voivat tuottaa vaihe-, suunta- ja amplitudiriippuvaisia epälineaarisia vasteita sekä sekoitustermejä. **[TUOTU, L2]**

**Mitä se ei tue:** näiden järjestelmien epälineaarisuus ei osoita, että biologinen järjestelmä mittaisi juuri tensorin \(\delta g_{\mu\nu}\), eikä se määritä tarvittavaa kontraktiota. Analogia ei ole johto. **[AVOIN]**

### 5.3 Endogeeninen bioelektrinen ja biomagneettinen tila

1. Borgens, R. B., Vanable, J. W. Jr. & Jaffe, L. F. (1977). **Bioelectricity and regeneration: large currents leave the stumps of regenerating newt limbs.** *Proceedings of the National Academy of Sciences* 74, 4528–4532. [DOI 10.1073/pnas.74.10.4528](https://doi.org/10.1073/pnas.74.10.4528).  
2. Borgens, R. B., Vanable, J. W. Jr. & Jaffe, L. F. (1977). **Small artificial currents enhance Xenopus limb regeneration.** *Journal of Experimental Zoology* 200, 403–416. [DOI 10.1002/jez.1402000310](https://doi.org/10.1002/jez.1402000310).  
3. Zhao, M. ym. (2006). **Electrical signals control wound healing through phosphatidylinositol-3-OH kinase-γ and PTEN.** *Nature* 442, 457–460. [DOI 10.1038/nature04925](https://doi.org/10.1038/nature04925).  
4. Beane, W. S., Morokuma, J., Adams, D. S. & Levin, M. (2011). **A chemical genetics approach reveals H,K-ATPase-mediated membrane voltage is required for planarian head regeneration.** *Chemistry & Biology* 18, 77–89. [DOI 10.1016/j.chembiol.2010.11.012](https://doi.org/10.1016/j.chembiol.2010.11.012).  
5. Beane, W. S. ym. (2013). **A molecular mechanism for normal and regenerative head patterning in planarians.** *Development* 140, 313–322. [DOI 10.1242/dev.086900](https://doi.org/10.1242/dev.086900).  
6. Durant, F. ym. (2017). **Long-term, stochastic editing of regenerative anatomy via targeting endogenous bioelectric gradients.** *Biophysical Journal* 112, 2231–2243. [DOI 10.1016/j.bpj.2017.04.011](https://doi.org/10.1016/j.bpj.2017.04.011).  
7. Vandenberg, L. N., Morrie, R. D. & Adams, D. S. (2011). **V-ATPase-dependent ectodermal voltage and pH regionalization are required for craniofacial morphogenesis.** *Developmental Dynamics* 240, 1889–1904. [DOI 10.1002/dvdy.22685](https://doi.org/10.1002/dvdy.22685).  
8. Pai, V. P., Aw, S., Shomrat, T., Lemire, J. M. & Levin, M. (2012). **Transmembrane voltage potential controls embryonic eye patterning in Xenopus laevis.** *Development* 139, 313–323. [DOI 10.1242/dev.073759](https://doi.org/10.1242/dev.073759).  
9. Baule, G. M. & McFee, R. (1963). **Detection of the magnetic field of the heart.** *American Heart Journal* 66, 95–96. [DOI 10.1016/0002-8703(63)90075-9](https://doi.org/10.1016/0002-8703(63)90075-9).  
10. Cohen, D. (1968). **Magnetoencephalography: evidence of magnetic fields produced by alpha-rhythm currents.** *Science* 161, 784–786. [DOI 10.1126/science.161.3843.784](https://doi.org/10.1126/science.161.3843.784).  
11. Wikswo, J. P. Jr., Barach, J. P. & Freeman, J. A. (1980). **Magnetic field of a nerve impulse: first measurements.** *Science* 208, 53–55. [DOI 10.1126/science.7361105](https://doi.org/10.1126/science.7361105).  
12. Barry, J. F. ym. (2016). **Optical magnetic detection of single-neuron action potentials using quantum defects in diamond.** *Proceedings of the National Academy of Sciences* 113, 14133–14138. [DOI 10.1073/pnas.1601513113](https://doi.org/10.1073/pnas.1601513113).

**Mitä kokonaisuus tukee:** biologisilla järjestelmillä on mitattavia endogeenisia virtoja, jännite-eroja ja magneettikenttiä, ja osa bioelektrisistä tiloista on kausaalisesti osallinen morfogeneesiin ja regeneraatioon. **[TUOTU, L2]**

**Mitä se ei tue:** aineisto ei määritä biologista nelipotentiaalia \(A_{\mathrm{bio},\mu}\), sen gauge-valintaa, koherenssialuetta eikä tapaa, jolla se toimisi Lindgrenin metriikan taustakomponenttina. Kentän olemassaolo ei vielä osoita geometrista detektoria. **[AVOIN]**

### 5.4 Suunta-, tausta-, spektri- ja vaihekontekstille herkät biologiset järjestelmät

1. Blackman, C. F., Benane, S. G., House, D. E. & Joines, W. T. (1985). **A role for the magnetic field in the radiation-induced efflux of calcium ions from brain tissue in vitro.** *Bioelectromagnetics* 6, 327–337. [DOI 10.1002/bem.2250060402](https://doi.org/10.1002/bem.2250060402).  
2. Ritz, T. ym. (2004). **Resonance effects indicate a radical-pair mechanism for avian magnetic compass.** *Nature* 429, 177–180. [DOI 10.1038/nature02534](https://doi.org/10.1038/nature02534).  
3. Engels, S. ym. (2014). **Anthropogenic electromagnetic noise disrupts magnetic compass orientation in a migratory bird.** *Nature* 509, 353–356. [DOI 10.1038/nature13290](https://doi.org/10.1038/nature13290).  
4. Schwarze, S. ym. (2016). **Weak broadband electromagnetic fields are more disruptive to magnetic compass orientation in a night-migratory songbird than strong narrow-band fields.** *Frontiers in Behavioral Neuroscience* 10, 55. [DOI 10.3389/fnbeh.2016.00055](https://doi.org/10.3389/fnbeh.2016.00055).  
5. Fedele, G. ym. (2014). **Genetic analysis of circadian responses to low frequency electromagnetic fields in Drosophila melanogaster.** *PLoS Genetics* 10, e1004804. [DOI 10.1371/journal.pgen.1004804](https://doi.org/10.1371/journal.pgen.1004804).  
6. Usselman, R. J. ym. (2014). **Spin biochemistry modulates reactive oxygen species production by radio frequency magnetic fields.** *PLoS ONE* 9, e93065. [DOI 10.1371/journal.pone.0093065](https://doi.org/10.1371/journal.pone.0093065).  
7. Usselman, R. J. ym. (2016). **The quantum biology of reactive oxygen species partitioning impacts cellular bioenergetics.** *Scientific Reports* 6, 38543. [DOI 10.1038/srep38543](https://doi.org/10.1038/srep38543).

**Mitä kokonaisuus tukee:** biologinen vaste voi riippua kentän suunnasta, taustakentästä, spektristä, resonanssirakenteesta tai spin-kemiasta eikä vain skalaarisesta tehotiheydestä. **[TUOTU, L2/L3]**

**Mitä se ei tue:** samat tulokset ovat selitettävissä ilman Lindgrenin metriikkaa. Ne eivät erottele geometrista mallia radikaalipari-, resonanssi- tai muista standardimekanismeista. **Lindgren-spesifisyys: [AVOIN].**

## 6. L3: tuodut biologiset realisaatiot

### 6.1 Radikaaliparit ja kryptokromi

1. Ritz, T., Adem, S. & Schulten, K. (2000). **A model for photoreceptor-based magnetoreception in birds.** *Biophysical Journal* 78, 707–718. [DOI 10.1016/S0006-3495(00)76629-X](https://doi.org/10.1016/S0006-3495(00)76629-X).  
2. Ritz ym. (2004), edellä.  
3. Maeda, K. ym. (2008). **Chemical compass model of avian magnetoreception.** *Nature* 453, 387–390. [DOI 10.1038/nature06834](https://doi.org/10.1038/nature06834).  
4. Gegear, R. J. ym. (2008). **Cryptochrome mediates light-dependent magnetosensitivity in Drosophila.** *Nature* 454, 1014–1018. [DOI 10.1038/nature07183](https://doi.org/10.1038/nature07183).  
5. Gegear, R. J., Foley, L. E., Casselman, A. & Reppert, S. M. (2010). **Animal cryptochromes mediate magnetoreception by an unconventional photochemical mechanism.** *Nature* 463, 804–807. [DOI 10.1038/nature08719](https://doi.org/10.1038/nature08719).  
6. Engels ym. (2014), edellä.  
7. Schwarze ym. (2016), edellä.  
8. Sherrard, R. M. ym. (2018). **Low-intensity electromagnetic fields induce human cryptochrome to modulate intracellular reactive oxygen species.** *PLoS Biology* 16, e2006229. [DOI 10.1371/journal.pbio.2006229](https://doi.org/10.1371/journal.pbio.2006229).  
9. Landler, L. & Keays, D. A. (2018). **Cryptochrome: the magnetosensor with a sinister side?** *PLoS Biology* 16, e3000018. [DOI 10.1371/journal.pbio.3000018](https://doi.org/10.1371/journal.pbio.3000018).  
10. Xu, J. ym. (2021). **Magnetic sensitivity of cryptochrome 4 from a migratory songbird.** *Nature* 594, 535–540. [DOI 10.1038/s41586-021-03618-9](https://doi.org/10.1038/s41586-021-03618-9).  
11. Leberecht, B. ym. (2023). **Upper bound for broadband radiofrequency field disruption of magnetic compass orientation in night-migratory songbirds.** *Proceedings of the National Academy of Sciences* 120, e2301153120. [DOI 10.1073/pnas.2301153120](https://doi.org/10.1073/pnas.2301153120).  
12. Wang, C. X. ym. (2019). **Transduction of the geomagnetic field as evidenced from alpha-band activity in the human brain.** *eNeuro* 6, ENEURO.0483-18.2019. [DOI 10.1523/ENEURO.0483-18.2019](https://doi.org/10.1523/ENEURO.0483-18.2019).  
13. Chae, K. S. ym. (2019). **Blue light-dependent human magnetoreception in geomagnetic food orientation.** *PLoS ONE* 14, e0223635. [DOI 10.1371/journal.pone.0223635](https://doi.org/10.1371/journal.pone.0223635).

**Asema BERM-ketjussa:** radikaalipari- ja kryptokromitutkimus muodostaa valmiin biologisen spin-kemiallisen realisaation, mutta se on **[TUOTU, L3]**. Se muuttuu Lindgren-ketjun osaksi vasta, jos \(\delta g_{\mu\nu}\):sta johdetaan spin-Hamiltoniaanin, reaktionopeuden tai tuotossaannon muutos. Tällaista johtoa ei ole tunnistettu. Siksi RPM:n ensisijaisuus BERM:ssä ei ole **[JOHDETTU]** vaan **[AVOIN]**.

### 6.2 Kryptokromi, vuorokausikello ja lisääntymisbiologia

1. van der Horst, G. T. J. ym. (1999). **Mammalian Cry1 and Cry2 are essential for maintenance of circadian rhythms.** *Nature* 398, 627–630. [DOI 10.1038/19323](https://doi.org/10.1038/19323).  
2. Thresher, R. J. ym. (1998). **Role of mouse cryptochrome blue-light photoreceptor in circadian photoresponses.** *Science* 282, 1490–1494. [DOI 10.1126/science.282.5393.1490](https://doi.org/10.1126/science.282.5393.1490).  
3. Miller, B. H. ym. (2004). **Circadian clock mutation disrupts estrous cyclicity and maintenance of pregnancy.** *Current Biology* 14, 1367–1373. [DOI 10.1016/j.cub.2004.07.055](https://doi.org/10.1016/j.cub.2004.07.055).  
4. Alvarez, J. D. ym. (2008). **The circadian clock protein BMAL1 is necessary for fertility and proper testosterone production in mice.** *Journal of Biological Rhythms* 23, 26–36. [DOI 10.1177/0748730407311254](https://doi.org/10.1177/0748730407311254).  
5. Liu, Y. ym. (2014). **The circadian clock gene Bmal1 regulates testosterone production and testicular function.** *Proceedings of the National Academy of Sciences* 111, 10968–10973. [DOI 10.1073/pnas.1209249111](https://doi.org/10.1073/pnas.1209249111).  
6. Cao, M. ym. (2015). **Circadian rhythm disruption and male reproductive function.** *International Journal of Environmental Research and Public Health* 12, 2071–2088. [DOI 10.3390/ijerph120202071](https://doi.org/10.3390/ijerph120202071).

**Asema BERM-ketjussa:** aineisto tukee vuorokausikellon ja lisääntymistoimintojen välistä biologista yhteyttä. **[TUOTU, L3]** Se ei osoita reittiä Lindgrenin metriikasta kryptokromiin tai kellogeeneihin. Ketju geometria → kello → lisääntyminen on ensimmäisen nuolen osalta **[AVOIN]**.

## 7. L4: lisääntymisbiologinen ja populaatiotason aineisto

### 7.1 Siittiöt, oksidatiivinen stressi ja RF-altistus

1. De Iuliis, G. N. ym. (2009). **Mobile phone radiation induces reactive oxygen species production and DNA damage in human spermatozoa in vitro.** *PLoS ONE* 4, e6446. [DOI 10.1371/journal.pone.0006446](https://doi.org/10.1371/journal.pone.0006446).  
2. Agarwal, A. ym. (2009). **Effects of radiofrequency electromagnetic waves from cellular phones on human ejaculated semen: an in vitro pilot study.** *Fertility and Sterility* 92, 1318–1325. [DOI 10.1016/j.fertnstert.2008.08.022](https://doi.org/10.1016/j.fertnstert.2008.08.022).  
3. Avendaño, C. ym. (2012). **Use of laptop computers connected to internet through Wi-Fi decreases human sperm motility and increases sperm DNA fragmentation.** *Fertility and Sterility* 97, 39–45.e2. [DOI 10.1016/j.fertnstert.2011.10.012](https://doi.org/10.1016/j.fertnstert.2011.10.012).  
4. Adams, J. A. ym. (2014). **Effect of mobile telephones on sperm quality: a systematic review and meta-analysis.** *Environment International* 70, 106–112. [DOI 10.1016/j.envint.2014.04.015](https://doi.org/10.1016/j.envint.2014.04.015).  
5. Cordelli, E. ym. (2024). **Effects of radiofrequency electromagnetic field (RF-EMF) exposure on male fertility: a systematic review of experimental studies on non-human mammals and human sperm in vitro.** *Environment International* 185, 108509. [DOI 10.1016/j.envint.2024.108509](https://doi.org/10.1016/j.envint.2024.108509). Korjaus: [DOI 10.1016/j.envint.2025.109449](https://doi.org/10.1016/j.envint.2025.109449).

### 7.2 Veri–kiveseste, kivekset ja munasarjat eläinmalleissa

1. Yu, G. ym. (2020). **The effect of long-term exposure to a 1.8 GHz electromagnetic field on the blood-testis barrier and spermatogenesis in rats.** *Science of the Total Environment* 710, 133860. [DOI 10.1016/j.scitotenv.2019.133860](https://doi.org/10.1016/j.scitotenv.2019.133860).  
2. Meena, R. ym. (2014). **Therapeutic approaches of melatonin in microwave radiations-induced oxidative stress-mediated toxicity on male fertility pattern of Wistar rats.** *Electromagnetic Biology and Medicine* 33, 81–91. [DOI 10.3109/15368378.2013.781035](https://doi.org/10.3109/15368378.2013.781035).  
3. Ahmadi, S. S. ym. (2016). **Effect of non-ionizing electromagnetic field on the alteration of ovarian follicles in rats.** *Electronic Physician* 8, 2168–2174. [DOI 10.19082/2168](https://doi.org/10.19082/2168).  
4. Calis, P. ym. (2021). **Does exposure of smart phones during pregnancy affect the offspring's ovarian reserve? A rat model study.** *Fetal and Pediatric Pathology* 40, 142–152. [DOI 10.1080/15513815.2019.1692112](https://doi.org/10.1080/15513815.2019.1692112).  
5. Yousefi, B. ym. (2025). **Impairment of oogenesis and folliculogenesis in neonatal rats after maternal exposure to mobile phones.** *Reproductive Sciences* 32, 2259–2269. [DOI 10.1007/s43032-025-01880-0](https://doi.org/10.1007/s43032-025-01880-0).

### 7.3 Populaatiotason konteksti

Levine, H. ym. (2023). **Temporal trends in sperm count: a systematic review and meta-regression analysis of samples collected globally in the 20th and 21st centuries.** *Human Reproduction Update* 29, 157–176. [DOI 10.1093/humupd/dmac035](https://doi.org/10.1093/humupd/dmac035).

**Asema BERM-ketjussa:** nämä lähteet voivat tukea väitteitä havaituista altistusvasteista, biologisista päätepisteistä tai siittiömäärän ajallisesta kehityksestä. Ne ovat **[TUOTU, L4]**. Ne eivät tunnista Lindgrenin geometriaa syyksi, ratkaise gauge- ja mittausongelmaa tai erottele BERM:iä standardisista lämpö-, ROS-, kalvo-, endokriini- tai muista mekanismeista. Populaatiotrendiä ei saa käyttää RF-EMF-kausaliteetin eikä Lindgren-ketjun todisteena ilman erillistä attribuutioanalyysia.

## 8. Todistusketjun nykytila

| Ketjun kohta | Nykyinen tuki | Tila |
|---|---|---|
| \(g=A\otimes A\) (2021) ja \(g=\eta+A\otimes A\) (2025) | Lindgrenin alkuperäisjulkaisut | **L0, premissi** |
| GME-yhtälön johto vuoden 2025 toiminnosta | Lindgren ym. 2025 | **[JOHDETTU] mallin sisällä** |
| Ulkoisen ja biologisen potentiaalin tensorinen ristiperturbaatio | Ansatzin algebrallinen laajennus | **[JOHDETTU] ehdollisesti**, jos \(A_{bio}\) hyväksytään |
| Biologisen \(A_{bio}\):n määritelmä ja gauge | Bioelektrinen ja biomagneettinen tutkimus osoittaa kenttiä, ei tarvittavaa nelipotentiaalia | **[AVOIN]** |
| Gauge-invariantti geometria–havaittava-operaattori | Holonomia- ja vaihefysiikka tarjoavat rakenne-ehdokkaita | **[AVOIN]** |
| \(\delta g_{\mu\nu}\) → molekulaarinen Hamiltoniaani tai reaktionopeus | Ei tunnistettua johtoa | **[AVOIN]** |
| Radikaalipari/kryptokromi biologisena realisaationa | Laaja riippumaton tutkimusperinne | **[TUOTU, L3]** |
| Kryptokromi/kello → lisääntymistoiminto | Osittain vahva geneettinen ja fysiologinen tutkimus | **[TUOTU, L3]** |
| RF-altistus → lisääntymispäätepisteet | In vitro-, eläin- ja katsausnäyttöä; heterogeeninen altistus- ja laatuympäristö | **[TUOTU, L4]** |
| Lindgren-spesifinen erotteleva ennuste | Ei tunnistettua julkaistua testiä | **[AVOIN]** |
| Lindgrenin johdon riippumaton replikaatio | Ei tunnistettu 1.9.2026 mennessä | **[AVOIN]** |

## 9. Mitä nykyinen tutkimus todella täydentää

Nykyinen tutkimuskorpus täydentää BERM:n todistelua neljällä rajatulla tavalla:

1. **Geometrinen konteksti:** sähkömagnetismin geometrisointi ja rank-one-metriikkarakenteet eivät ole käsitteellisesti vailla edeltäjiä. Tämä lisää rakenteellista vertailtavuutta mutta ei todista Lindgrenin yhtälöitä.
2. **Havaittavan potentiaalin ehto:** Aharonov–Bohm-, vuokvantitus- ja Josephson-tutkimus osoittavat, että potentiaali voidaan kytkeä mitattavaan vaiheeseen tai holonomiaan. Samalla ne tekevät näkyväksi BERM:n puuttuvan gauge-invariantin operaattorin.
3. **Biologinen taustatila:** bioelektrinen ja biomagneettinen tutkimus osoittaa, että eliö ei ole elektromagneettisesti tyhjä väliaine. Se ei kuitenkaan vielä määritä Lindgrenin tarkoittamaa \(A_{bio}\):a.
4. **Mahdolliset biologiset vastaanottimet ja päätepisteet:** kryptokromi-, kellogeeni- ja lisääntymistutkimus tarjoaa mahdollisia alavirran järjestelmiä. Ne ovat tuotuja realisaatioita, eivät geometriasta johdettuja seurauksia.

Näin ollen lähteet tukevat ketjun rakennusosia, mutta eivät vielä sulje niitä yhdeksi mekanistiseksi todistukseksi. Keskeisin puuttuva osa ei ole uusi RF-EMF-vaikutustutkimus vaan matemaattisesti eksplisiittinen, gauge-invariantti johto

\[
\delta g_{\mu\nu}
\longrightarrow
\mathcal O_{\mathrm{bio}}
\longrightarrow
\Delta H\ \text{tai}\ \Delta k
\longrightarrow
\text{biologinen päätepiste}.
\]

## 10. Ensisijainen lukujärjestys

Jos tarkoitus on vahvistaa mallin omaa todistelua eikä rakentaa standardimallista analogiaa, lähteet tulee lukea tässä järjestyksessä:

1. Lindgren & Liukkonen (2021): alkuperäinen singularinen metriikka ja varaus/divergenssi-konjektuuri.
2. Lindgren, Kovacs & Liukkonen (2025): ajantasainen \(\eta+A\otimes A\) -metriikka ja GME.
3. Weyl (1918), Rainich (1925), Misner & Wheeler (1957), Bekenstein (1993): geometrisen ohjelman vertailukehys.
4. Aharonov & Bohm (1959), Wu & Yang (1975), Tonomura ym. (1986): gauge-invariantin havaittavuuden vaatimukset.
5. Borgens ym. (1977), Zhao ym. (2006), Beane ym. (2011, 2013): endogeenisen bioelektrisen tilan kausaalinen biologinen merkitys.
6. Ritz ym. (2000, 2004), Maeda ym. (2008), Xu ym. (2021): mahdollinen spin-kemiallinen realisaatio vasta sillan jälkeen.
7. Kellogeeni- ja lisääntymistutkimus sekä RF-altistustutkimukset: alavirran koherenssin arviointi, ei alkupään validointi.

## 11. Poissuljetut tai korjattavat väitteet

Seuraavia väitteitä ei pidä esittää nykyisen lähdeaineiston perusteella johdettuina:

- \(\delta g=2A_{bio}\cdot a_{ext}\) ilman määriteltyä kontraktiota.
- \(\chi(a)=a/\sqrt{1+a^2}\) Lindgrenin teoriasta johdettuna havaittavana suureena.
- FieldState-siirtofunktion erityinen muoto Lindgrenin yhtälöiden seurauksena.
- radikaaliparimekanismin ensisijaisuus tai tietty spin-Hamiltoniaani geometriasta johdettuna.
- geometria → kryptokromi → vuorokausikello → lisääntyminen yhtenä valmiiksi osoitettuna kausaaliketjuna.
- yksittäinen RF-EMF-tulos tai siittiömäärän populaatiotrendi Lindgrenin teorian vahvistuksena.
- tekijöiden vastine tai nimeämätön verkkosivuväite riippumattomana replikaationa.

## 12. Johtopäätös

Lindgren-lähtöisestä näkökulmasta olemassa oleva tutkimus tarjoaa huomattavan määrän **rakenteellisesti yhteensopivaa** aineistoa, mutta vain Lindgrenin omat julkaisut määrittävät mallin varsinaisen L0-ytimen. Vahvin ulkopuolinen aineisto ei tällä hetkellä vahvista suoraan ansatzia tai GME:tä, vaan rajaa kolmea välttämätöntä seuraavaa ongelmaa: gauge-invariantin havaittavan määrittelyä, biologisen taustapotentiaalin operationalisointia ja tensorisen perturbaation kytkemistä molekulaariseen dynamiikkaan.

BERM:n nykyisen todistelun täsmällinen tila on siksi seuraava:

> Lindgrenin geometrinen premissi on julkaistu; biologisesti relevantteja sähkömagneettisia tiloja, suuntaherkkiä vasteita ja lisääntymispäätepisteitä koskevaa tutkimusta on olemassa; mutta näiden välinen Lindgren-spesifinen, gauge-invariantti mekanistinen johto on edelleen avoin.
