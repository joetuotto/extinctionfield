# Farmakologisten kokeiden ehdollinen johto BERM:n premisseistä

Tämä integraatio käyttää vuoden 2025 muotoilua. Vuoden 2021 singularinen
`g = A⊗A` ei ole sama premissi. Biologisia tuloksia ei käytetä valitsemaan
fysikaalista teoriaa jälkikäteen.

**P1 — geometrinen premissi ja sen tarkka seuraus.**

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu,\qquad A=A_0+a,
\]
\[
\Delta g_{\mu\nu}=\kappa(A_{0\mu}a_\nu+a_\mu A_{0\nu}+a_\mu a_\nu).
\]

Ensimmäinen yhtälö on Lindgrenin vuoden 2025 ansatz skaalalla κ
([alkuperäistekstin yhtälö 5](https://www.preprints.org/manuscript/202503.2321);
[julkaistu versio](https://doi.org/10.1088/1742-6596/2987/1/012001)). Toinen on
sen algebrallinen seuraus. Useille ulkoisille syötteille `a = Σ a_i` myös
eri syötteiden ristitulot säilyvät. Ennen nimettyä kontraktiota kyseessä on
tensori, ei kalsiumannos tai biologinen herkkyys.

**P2 — eksplisiittinen BERM-kytkentäoletus.**

Kun oletetaan minimaalinen aine–metriikka-kytkentä

\[
\delta S_m=\tfrac12\int\sqrt{-g}\,T^{\mu\nu}\delta g_{\mu\nu}\,d^4x,
\]

ensimmäisen kertaluvun vaste voidaan kirjoittaa kausaalisella vasteytimellä

\[
r_j(t)=\int_{-\infty}^{t}\Xi^{\mu\nu}_{j,R}(t,t';x)\,
\Delta g_{\mu\nu}(t')\,dt'.
\]

Tämä on ehdollinen formaali johto. Aine–metriikka-kytkentä, biologisen
vasteytimen muoto sekä sen gauge-resepti, yksiköt ja skaala eivät seuraa
Lindgrenin metriikka-ansatzista. Koodi käyttää olemassa olevia
`metric_perturbation`- ja `contract_retarded_response`-operaattoreita;
eksplisiittinen kernel, viivepainot ja nimetty porttimuunnos kuuluvat syötteisiin.

**P3 — nimetty biologinen toteutuma.**

Kokeen tilavektori sisältää valitut paikalliset Ca-tilat, sytosolin, ER:n,
mitokondrion, kanavapopulaatiot sekä kyseisessä profiilissa tarvittavat
palautteen ja lääkkeen tilat. Kenttävaste kohdistetaan nimettyyn porttiin:

\[
q_j(t)=q_{j,0}+G_jr_j(t),\qquad
\dot x=F_p(x,q,D_{\rm active},v,L,t;\theta_p).
\]

`p` nimeää koejärjestelmän ja reitin, `v` fysiologisen ärsykkeen kuten
depolarisaation, `L` valoprotokollan ja `D_active` aktiivisen koettimen.
Porttien yksiköt, baseline ja etumerkillinen siirtokerroin ovat eksplisiittisiä.
Negatiivista muutosta sham-tasosta ei muuteta itseisarvoksi; absoluuttisten
pitoisuuksien, kanavapopulaatioiden ja siirtovirtojen sallitut alueet säilyvät.

`F_p` on tuotu biologinen toteutuma tai nimetty BERM-sulkeuma. Tutkimukset
rajaavat sen rakennetta. Jokaisessa koehaarassa käytetään samaa θ_p:tä;
interventio muuttaa nimettyä tilaa, parametria tai protokollatapahtumaa.
Kerrointa ei soviteta erikseen haluttuun koehaarakohtaiseen päätepisteeseen.

**P4 — havaintomalli ja vasteen suunta.**

\[
Y_k(t)=H_{k,p}(x(t);\psi_p).
\]

Esimerkiksi pienen mikroalueen Ca voi vaikuttaa lähellä olevaan efektoriin
voimakkaasti mutta koko solun tilavuuspainotettuun mittaukseen vähän. ERK,
Na-virta, Ca-virta ja proliferaatio ovat eri H-operaattoreita. Havaitsimen
kyllästyminen tai havaitsemisraja ei ole sama kuin biologisen tilan saturaatio.

Pienen kenttäperturbaation aikana, annetun lääke- ja esikäsittelyhaaran D
ympärillä, biologisen poikkeaman variatioyhtälö on

\[
\delta\dot x_D=J_D(t)\delta x_D+B_D(t)G r_D(t),\qquad
\delta Y_D=H_{x,D}(t)\delta x_D,
\]
\[
\delta Y_D(t)=H_{x,D}(t)\int_{t_0}^{t}
\Phi_D(t,s)B_D(s)G r_D(s)\,ds.
\]

`J_D = ∂F/∂x`, `B_D = ∂F/∂q` ja Φ_D on tiladynamiikan siirto-operaattori.
Tämä selittää rakenteellisesti, miksi sama fysikaalinen syöte ei määrää
kaikkien päätepisteiden etumerkkiä. Palaute, paikallinen geometria,
reitin aikavakiot ja havaintomalli vaikuttavat tuloon. Farmakologia voi
muuttaa myös tilasta riippuvaa L2-vastaanottoa; sen pysyminen samana on
vertailussa ilmoitettava oletus, ei kokeesta automaattisesti seuraava fakta.

**Kahdeksan tulkintaa tämän ketjun sisällä.**

1. **MT2:** biologinen palaute muuttaa F:n yhteyksiä: depolarisaatioon liittyvä
   suurempi varastovapautus voi pienentää Na-virtavastetta. Suojaava
   Ca-nousu ei edellytä fysikaalisen syötteen etumerkin muuttamista.
2. **Mikroalue:** paikallinen Ca ja koko solun mittaus ovat eri tiloja ja
   H-operaattoreita. Nopean ja hitaan puskurin ero kohdistuu F:n sitoutumis-
   ja kulkeutumisnopeuksiin. Varhainen ja pitkäkestoinen ERK pidetään erillisinä.
3. **Kanavatyyppi:** L- ja T-kanavien virrat ovat erillisiä F:n osia.
   CaV3.2-vaimennus ei nollaa L-kanavaa; huipun vastaavuus ei takaa integraalin,
   tilapaikan tai toiminnallisen vasteen vastaavuutta.
4. **AA/LTE4:** q voi kohdistua lipidituotantoon, joka inhiboi tiettyä
   T-kanavavirtaa. Etumerkki seuraa nimetystä välitysreitistä ehdollisesti,
   eikä sitä aseteta kaikkien kenttävasteiden yleiseksi ominaisuudeksi.
5. **Historia:** hidas kanavamäärä muuttaa F:n kapasiteettia. SERCA-esikäsittely
   muuttaa x(t₀):aa jo ennen kenttävertailua. Varastosta riippuva komponentti
   voi kadota ilman riippumattoman kalvovirran katoamista.
6. **CRY/FAD:** ehdollinen vastaanottokapasiteetti voi sisältää proteiinin
   määrän ja reaktiokykyisen miehitysosuuden. KL001 voi vaikuttaa niihin eri
   aikaskaaloissa. Nykyisen fototuoton sisältämä FAD-osuus lasketaan kerran.
   Kenttävasteen suuntaa ei päätellä pelkästä CRY-määrän tai kellojakson muutoksesta.
7. **Koettimen valo:** valo voi muuttaa D_active-tilaa. Soluton lääkevalaistus
   erottaa tämän solun x-tilan tai vastaanoton valovaikutuksesta. Verkkokalvon
   vuorokausisignaali, paikallinen fotokemia ja koettimen muutos eivät ole
   yksi vaihdettava valokerroin.
8. **CoQ10:** pienempi vauriopäätepiste voi syntyä B_D:n, mitokondrio/redox-
   tuotannon tai korjauksen muutoksesta. Varhaisen Ca:n, vauriotuotannon ja
   palautumisen yhteismittaus erottaa vaihtoehtoja. Jos D:n tuotanto lasketaan
   mitokondrio-/ROS-kuormasta, sama vanha suora ajuritermi ei jää rinnalle.

**Interventiokontrastin johto.**

\[
I_D=[Y(F,D)-Y(sham,D)]-[Y(F,0)-Y(sham,0)].
\]

Kontrasti vertaa kentän vaikutuksia kahdessa biologisessa protokollassa;
se poistaa additiivisen lääkkeen päävaikutuksen. Se ei yksin erottele,
muuttuiko L2-vastaanotto, biologinen välitys vai mittausoperaattori.
Puuttuvista koehaaroista ei muodosteta numeerista kontrastia. Sama yksikkö,
mittausaika ja lähtötasokäsittely ovat vertailun ehtoja.

**Jatko toiminnallisiin ja väestöpäätepisteisiin.**

Solukokeen H tuottaa ensin nimetyn toiminnallisen suureen. Mahdollinen
elinportti, parin lisääntymiskapasiteetti ja odotusaika sekä ikä-/pariteetti-
kohtainen syntymäprosessi tarvitsevat tämän jälkeen omat mitatut siirtonsa.
Käyttäytymisen reitillä kehotila yhdistetään havaintoon, muistiin,
ennakointiin, opittuun toimintaan, toisen osapuolen toimintaan ja todellisiin
mahdollisuuksiin ennen toteutunutta tekoa. Tämä integraatio ei lisää
solukokeesta keksittyä kerrointa lukittuihin ASFR/TFR-ennusteisiin.

**Mitä toteutuksen testit osoittavat.**

Testit tarkistavat yllä olevan koostamisen, säilymisen ja reittierottelut
eksplisiittisillä havainnollistavilla parametreilla. Ne eivät ole empiirinen
sovitus tai ulkoinen validointiaineisto. Farmakologiset komponenttitulokset
ovat L3/L4-näyttöä; ehdollisen ketjun Lindgren-spesifinen tuki edellyttää
ennalta ilmoitettua, kilpailijoista eroavaa signaaliennustetta samoilla
biologisilla parametreilla. Tämän eron on säilyttävä koodin viennissä,
rekistereissä ja sivuston näkyvässä tulkinnassa.

Lähteet ja koekohtaiset rajaukset ovat yhteisessä
`website/data/intervention-profiles.json`-rekisterissä. Toteutussuunnitelma:
`docs/analysis/PHARMACOLOGY_INTEGRATION_PLAN_2026-09-07.md`.
