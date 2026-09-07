# Lindgren–DKC: kolmen pakollisen geometrisen elementin ehdollinen johto

**Versio:** 2026-09-04
**Kohde:** vuoden 2025 muotoilu $g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu$
**Tarkoitus:** erottaa toisistaan variaatioperiaate ja GME, Weyl-yhteys sekä homogeeninen Maxwell-identiteetti ennen yhtäkään biologista tulkintaa.

Tämä dokumentti korjaa ja täydentää 777-rivisen tensorijohdon kolme puuttuvaa rakennetta. Se ei oleta, että Lindgrenin geometrinen teoria on fysikaalisesti oikea. Se määrittää, mitä voidaan laskea ehdollisesti annetusta teoriasta, mitä lisäoletuksia lasku tarvitsee ja mitä numeerinen residuaali voi — ja ei voi — osoittaa.

## 1. Episteeminen avain ja johtoketju

- **L0 — PREMISSI:** valittu ansatz, variaatiofunktionaali, Weyl-semimetrisyys tai muu erikseen annettu teorian ehto.
- **L1 — EHDOLLINEN JOHTO:** algebra tai differentiaaligeometrinen seuraus ilmoitetuista L0-ehdoista niiden sallitulla domainilla.
- **L2 — AVOIN SILTA:** geometrisen suureen identifiointi mitattavaksi fysikaaliseksi tai biologiseksi vasteeksi.
- **L3 — TUOTU / EMPIIRINEN:** standardista sähködynamiikasta, materiaalifysiikasta, biologiasta tai datasta tuotu sulkeuma ja parametri.

Episteeminen taso kuuluu jokaiselle väitteelle ja operaattorille erikseen, ei koko
ketjulle yhtenä “heikoimman lenkin” leimana. L1:ssä johdettu determinantti,
suunnattu derivaattatekijä tai geodeesipoikkeama säilyy L1-tuloksena myös silloin,
kun sen jälkeen käytetään L2-tulkintaa tai L3-parametria. Empiirinen väliaskel ei
muuta aiempaa johtoa L3:ksi. Osittainen ketju on siksi matemaattisesti arvokas,
kun sen avoin rajapinta merkitään eikä sen yli hypätä.

Kolme pakollista elementtiä ovat loogisesti erilliset. Erityisesti kaksi
variaatiohaaraa ovat rinnakkaisia L0-valintoja: Einstein–Hilbert-vaikutuksesta
varioitu potentiaaliehto ei johda harmonic-metric/GME-vaikutukseen, eikä
jälkimmäinen johda Einstein–Hilbert-ehtoa.

```text
[L0/EH-haara] Einstein–Hilbert-vaikutus S_EH[g(A)] + EH-reunaehto
  └─> [ehdollinen L1] EULER_LAGRANGE_A: G^{lambda nu} A_nu = 0

[L0/MG-haara] metric-gradient-vaikutus S_MG[g,nabla_hat]
              + variaatiosopimus + reunaehto
  └─> [ehdollinen L1] HARMONIC_METRIC (tai vain jäädytetty pääosa)
        └─> [algebrallinen hajotelma]
             R_H = R_bg + R_outer; R_outer = kappa R_GME

[L0] Weyl-semimetrisyys + torsioimattomuus + yksi-muoto phi
  └─> [L1] Weyl-yhteys = Levi–Civita-yhteys + nonmetricity-korjaus
        └─> [lisäidentifikaatiot] ehdokas geodeesi-/lähdetulkinta

[määritelmä] F = dA
  └─> [L1, kinemaattinen] dF = d²A = 0
        └─> homogeeniset Maxwell-yhtälöt
```

Yksikään nuoli ei saa hypätä suoraan biologiseen vasteeseen. Erityisesti
metriikan $g$ Levi–Civita-yhteyden kontraktoitu gravitaation Bianchi-identiteetti

\[
\nabla^{LC}_\mu G^{\mu\nu}[g]\equiv0
\]

ei yksin tuota Maxwellin lähdeyhtälöä eikä GME:tä. GME-haara tarvitsee
variaatio- ja harmonisuusehdon; homogeeninen Maxwell-haara tarvitsee $F=dA$;
lähteellinen Maxwell-haara tarvitsee erillisen dynamiikan ja lähteen $J$.

## 2. Yhteinen syötesopimus ja metriikan domain

### 2.1 Pakolliset geometriset syötteet

| Syöte | Matemaattinen tyyppi | Pakollinen sopimus |
|---|---|---|
| $\Omega$ | neljän ulottuvuuden alue tai koordinaattilaikku | orientaatio, reuna $\partial\Omega$ ja reunaehdot ilmoitetaan |
| $\eta_{\mu\nu}$ | Minkowski-taustametriikka | signatuuri $(-+++)$; kaavat $\det g=-D$ ja $V=\sqrt D$ käyttävät karteesista normalisointia $\det\eta=-1$ |
| $A_\mu$ | vähintään $C^2$-sileä yksi-muoto | komponentit, yksiköt, gauge-valinta ja provenance ilmoitetaan |
| $\kappa$ | avaruusajassa vakio skalaari | $\kappa A^2$ on dimensioton; arvo ja yksikkö ovat pakollisia harmonic/GME-hajotelmassa sekä Christoffel- ja kumoutumisehdoissa, eikä kerrointa saa hävittää ennen yksikkökarttaa |
| $\varphi_\mu$ | vähintään $C^1$ Weyl-yksi-muoto | tarvitaan vain Weyl-haarassa; yksiköt ja mahdollinen identifikaatio ilmoitetaan |
| $\widehat\nabla$ | vähintään $C^1$, torsioimaton Weyl-kovariantti derivaatta | yhteyskertoimet ja Laplace-/aalto-operaattorin järjestys lukitaan |
| $U^\mu,\rho,J^\mu$ | valinnaiset tulkintasyötteet | tarvitaan vain varaus-, virta- tai geodeesitulkinnan testaamiseen; maailmanviivan parametri ja $g_{\mu\nu}U^\mu U^\nu$ ilmoitetaan |

Kaikki indeksit nostetaan sillä metriikalla, joka on nimetty kyseisessä kaavassa. Taustakontraktio merkitään

\[
A^2:=\eta^{\mu\nu}A_\mu A_\nu,
\qquad
D(A):=1+\kappa A^2.
\]

Ansatz on

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu.
\tag{2.1}
\]

Matriisideterminanttilemma ja Sherman–Morrison antavat ehdollisesti

\[
\det g=(\det\eta)D(A),
\qquad
g^{\mu\nu}=\eta^{\mu\nu}
-\frac{\kappa A^\mu A^\nu}{D(A)}.
\tag{2.2}
\]

Karteesisessa Minkowski-kehyksessä $\det\eta=-1$, joten
$\det g=-D(A)$. Muussa koordinaatistossa taustadeterminantin tiheystekijä on
säilytettävä eikä yhtälöä saa korvata pelkällä luvulla $-D(A)$.

### 2.2 Domain-portti

Jokaisen laskureitin on tarkistettava domain ennen derivointia:

1. **Käänteismetriikka:** $D(A)\neq0$.
2. **Reaalinen Lorentz-tilavuuselementti ja alkuperäiseen signatuuriin jatkuva haara:** $D(A)>0$.
3. **Singulaarinen pinta:** $D(A)=0$; käänteismetriikkaa, Levi–Civita-yhteyttä tai $\sqrt{-g}$:tä ei saa evaluoida.
4. **Timelike $A$ ja $\kappa>0$:** kun $A^2<0$, ehto on $1-\kappa|A^2|>0$. Raja saavutetaan ennen mitään spacelike-kaavan “saturaatiota”; muulla $\kappa$:n merkillä ratkaisee yleinen ehto $D>0$.
5. **Spacelike tai null $A$:** positiivisella $\kappa$:lla $D(A)>0$, mutta tämä ei vielä identifioi $A$:ta fysikaaliseksi tai biologiseksi havaittavaksi.

Jos $D(A)<0$ timelike-haarassa, rank-one-päivitys on ylittänyt
degeneroitumispinnan ja metriikan inertia on vaihtunut; kyse ei enää ole samasta
Lorentz-haarasta. Absoluuttinen arvo $\sqrt{|\det g|}$ voi tuottaa reaalisen
tiheyden, mutta se ei palauta Lorentz-signatuuria.

### 2.3 Gauge- ja yksikköportti

Koska

\[
g(A+d\lambda)-g(A)
=\kappa\bigl(A\otimes d\lambda+d\lambda\otimes A+d\lambda\otimes d\lambda\bigr),
\]

ansatz ei ole sellaisenaan tavallisen $U(1)$-gauge-muunnoksen invariantti. Koodisyötteen on siksi sisällettävä joko

- fysikaaliseksi julistettu gauge-valinta,
- osoitettu geometrinen ekvivalenssi gauge-edustajien välillä, tai
- gauge-invariantti havainto-operaattori.

Lisäksi $A_0$ on potentiaalikomponentti. Suure $V_{\mathrm{mem}}/d$ on
sähkökenttä, ei automaattisesti sama objekti kuin $A_0$. Niitä ei saa syöttää
samaan rajapintaan ilman eksplisiittistä yksikkö- ja siirtokarttaa.

## 3. Elementti I — kaksi rinnakkaista variaatiohaaraa ja GME-hajotelma

### 3.1 L0: Einstein–Hilbert-variaatioperiaate

Ensimmäinen, tunnisteella `EINSTEIN_HILBERT_ACTION` kirjattava L0-premissi on
metriikka-ansatziin sijoitettu Einstein–Hilbert-vaikutus

\[
S_{EH}[A]=\int_\Omega \sqrt{-\det g(A)}\,R[g(A)]\,d^4x,
\qquad
\frac{\delta S_{EH}}{\delta A_\lambda}=0.
\tag{3.1a}
\]

Kun tavallinen Einstein–Hilbert-reunatermi on käsitelty ja
$g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu$, saadaan kovariantin
potentiaalikomponentin variaatiolle

\[
\delta g_{\mu\nu}
=\kappa(A_\mu\delta A_\nu+A_\nu\delta A_\mu),
\qquad
\mathcal R^{EL,\lambda}_{A}
:=\frac{\delta S_{EH}}{\delta A_\lambda}
=-2\kappa\sqrt{-g}\,G^{\lambda\nu}A_\nu=0,
\tag{3.1b}
\]

missä kokonaisnormalisointi ja vastaava yhteinen etumerkkikonventio eivät
muuta nollaehtoa. Residuaalin kanoninen ID on `EULER_LAGRANGE_A`; koodin
`einstein_hilbert_potential_variation_residual` laskee sen. Sitä ei saa korvata Bianchi-identiteetillä,
harmonic-metric-residuaalilla eikä GME:n tulosäännöllä.
$G^{\mu\nu}[g]$ tarkoittaa tässä $g$:n Levi–Civita-yhteydestä laskettua
Einstein-tensoria, jolle $\nabla^{LC}_\mu G^{\mu\nu}[g]\equiv0$; tämä
identiteetti ei tee yhtälöstä (3.1b) automaattisesti totta mielivaltaiselle
$A$:lle.

### 3.2 L0: harmonic-metric/GME-formulaatio

Toinen, tunnisteella `METRIC_GRADIENT_ACTION` kirjattava ja EH-haarasta
riippumaton L0-premissi on vuoden 2025 lähteen harmonic-metric/GME-funktionaali.
Se voidaan kirjoittaa Lorentz-signatuuri huomioiden muodossa

\[
S_{MG}[g,\widehat\nabla]
=\int_\Omega
\bigl(\widehat\nabla^{\sigma}g^{\mu\nu}\bigr)
\bigl(\widehat\nabla_{\sigma}g_{\mu\nu}\bigr)
\sqrt{|\det g|}\,d^4x.
\tag{3.1c}
\]

Tämä on **L0-valinta**, ei metriikka-ansatzin algebraattinen seuraus, ei
$S_{EH}$:n seuraus eikä sama asia kuin (3.1a). Kummankaan haaran
Euler–Lagrange-ehtoa ei saa käyttää toisen haaran johtamiseen ilman uutta,
eksplisiittistä ekvivalenssitodistusta. Variaation laskemiseksi on lukittava
vähintään:

- onko $\widehat\Gamma$ variaatiossa riippumaton vai $(g,\varphi)$-kentistä rakennettu;
- varioidaanko $g_{\mu\nu}$, $g^{\mu\nu}$, $\varphi_\mu$ vai näitä yhdessä;
- miten $\sqrt{|g|}$ varioituu;
- häviääkö $\delta g$ reunalla vai häviääkö integraatiosta syntyvä reunavuo;
- kumpaa ei-metriikkayhteensopivaa aalto-operaattoria käytetään.

Weyl-geometriassa seuraavat operaattorit eivät ole automaattisesti samat:

\[
\widehat\nabla_\sigma\widehat\nabla^\sigma T
\quad\text{ja}\quad
\widehat\nabla^\sigma\widehat\nabla_\sigma T,
\]

koska $\widehat\nabla g\neq0$. Tässä dokumentissa lähteen tuotekehitelmää vastaava divergence-muoto lukitaan määritelmällä

\[
\widehat\Box_{\mathrm{div}}T
:=\widehat\nabla_\sigma
\left(g^{\sigma\rho}\widehat\nabla_\rho T\right).
\tag{3.2}
\]

### 3.3 Ehdollinen harmonic-metric-yhtälö

Lähteen käyttämä pääosavariaatio etenee seuraavasti. Valitaan testivariaatio
$q_{\mu\nu}=\delta g_{\mu\nu}$, jäädytetään tämän askeleen ajaksi yhteys,
kontraktiometriikka ja tilavuustiheys sekä vaaditaan $q|_{\partial\Omega}=0$
tai vastaava nollautuva reunavuo. Tällöin pääosa on kaavamaisesti

\[
\delta S_{MG,\mathrm{prin}}
=2\int_\Omega
\langle\widehat\nabla q,\widehat\nabla g\rangle_g\,dV_g
=-2\int_\Omega
\langle q,\widehat\Box_{\mathrm{div}}g\rangle_g\,dV_g
+\mathcal B_{\partial\Omega}.
\]

Kun $\mathcal B_{\partial\Omega}=0$, variaatioiden mielivaltaisuus antaa
pääosan harmonic-metric-yhtälön. Jos $\widehat\Gamma[g,\varphi]$,
$g^{\mu\nu}$ ja $dV_g$ varioidaan täydellisesti, niiden variaatioista syntyvät
lisätermit on joko johdettava mukaan tai osoitettava kumoutuviksi. Niiden
poisjättäminen on osa L0-variaatiosopimusta, ei L1-tulos.

Kun lisätermejä ei ole johdettu, ajon on kirjattava
`variation_mode=FROZEN_PRINCIPAL_PART` ja
`full_euler_lagrange_verified=false`. Arvon saa vaihtaa todeksi vasta, kun myös
yhteyden, käänteismetriikan ja tilavuustiheyden variaatiot on käsitelty.
Kolmen elementin hyväksyntäportti ei läpäise
`full_euler_lagrange_verified=false`-ajoa.

Näillä ehdoilla lähteen ehdottama stationaarisuusehto on

\[
\mathcal R^{H}_{\mu\nu}
:=\widehat\Box_{\mathrm{div}}g_{\mu\nu}=0.
\tag{3.3}
\]

Tätä on turvallista kutsua **harmonic-metric-residuaaliksi**. Ilman funktionaalin täydellistä Euler–Lagrange-variaatiota sitä ei pidä koodissa nimetä todistetuksi “jos ja vain jos” -stationaarisuusehdoksi.

Levi–Civita-yhteyttä ei voi huomaamatta sijoittaa tähän kohtaan: sen
metriikkayhteensopivuus antaa $\nabla^{LC}_\sigma g_{\mu\nu}=0$, jolloin
(3.1c) ja (3.3)
trivialisoituvat jokaiselle metriikalle. Ei-triviaali variaatiohaara tarvitsee
tässä lähteen Weyl-yhteyden tai muun erikseen määritellyn
ei-metriikkayhteensopivan yhteyden.

### 3.4 Ansatzin sijoitus

Sijoittamalla (2.1) yhtälöön (3.3) määritellään samalla, samalla
$\widehat\Box_{\mathrm{div}}$-operaattorilla

\[
\begin{aligned}
\mathcal R^{bg}_{\mu\nu}
&:=\widehat\Box_{\mathrm{div}}\eta_{\mu\nu},\\
\mathcal R^{outer}_{\mu\nu}
&:=\widehat\Box_{\mathrm{div}}(\kappa A_\mu A_\nu)\\
&=\kappa\Bigl[
(\widehat\nabla_\sigma A_\mu)(\widehat\nabla^\sigma A_\nu)
+(\widehat\nabla_\sigma A_\nu)(\widehat\nabla^\sigma A_\mu)\\
&\hspace{2.8em}
+A_\mu\widehat\Box_{\mathrm{div}}A_\nu
+A_\nu\widehat\Box_{\mathrm{div}}A_\mu
\Bigr].
\end{aligned}
\tag{3.4}
\]

Koska $\kappa$ on avaruusajassa vakio ja sama operaattori vaikuttaa jokaiseen
termiin, eksaktit kirjanpitosuhteet ovat

\[
\boxed{
\mathcal R^{H}_{\mu\nu}
=\mathcal R^{bg}_{\mu\nu}+\mathcal R^{outer}_{\mu\nu},
\qquad
\mathcal R^{outer}_{\mu\nu}
=\kappa\mathcal R^{GME}_{\mu\nu}.}
\tag{3.4a}
\]

Näitä testataan erikseen residuaaleilla
$\mathcal R^{dec}:=\mathcal R^{H}-\mathcal R^{bg}-\mathcal R^{outer}$ ja
$\mathcal R^{scale}:=\mathcal R^{outer}-\kappa\mathcal R^{GME}$.

“$\eta$ on komponenteiltaan vakio” ei riitä poistamaan ensimmäistä termiä
Weyl-kovariantissa derivaatassa. Yksinkertaistettu GME vaatii eksplisiittisen
lisäehdon

\[
\mathcal R^{bg}_{\mu\nu}
=\widehat\Box_{\mathrm{div}}\eta_{\mu\nu}=0
\tag{3.5}
\]

tai toisen, täsmällisesti nimetyn taustaderivaatan, jolle ehto pätee.

GME-residuaali on seuraavan hakasulun **skaalaamaton** tensoriosa:

\[
\boxed{
\begin{aligned}
\mathcal R^{GME}_{\mu\nu}:={}&
(\widehat\nabla_\sigma A_\mu)(\widehat\nabla^\sigma A_\nu)
+(\widehat\nabla_\sigma A_\nu)(\widehat\nabla^\sigma A_\mu)\\
&+A_\mu\widehat\Box_{\mathrm{div}}A_\nu
+A_\nu\widehat\Box_{\mathrm{div}}A_\mu.
\end{aligned}}
\tag{3.6}
\]

Kun (3.5) pätee ja $\kappa\neq0$, harmonic-metric-ehto ja GME:n nollaehto ovat
yhtäpitäviä, koska $\mathcal R^H=\mathcal R^{outer}=\kappa\mathcal R^{GME}$.
Kun $\kappa=0$, $\mathcal R^{outer}=0$ ei anna tietoa
$\mathcal R^{GME}$:stä. Kenttäehdokas toteuttaa GME:n vain, jos
$\mathcal R^{GME}_{\mu\nu}=0$ valitulla yhteydellä, operaattorijärjestyksellä
ja reunaehdoilla. Tämä on symmetrinen rank-2-PDE-residuaali; se ei ole sama asia
kuin nelikomponenttinen Maxwellin lähdeyhtälö. §7.2 lukitsee
$\mathcal R^{outer}$- ja $\mathcal R^{GME}$-asteikkojen toleranssisuhteen.

### 3.5 Lähteellisen yhtälön erillinen residuaali

Lähteen lineaarisessa erikoistapauksessa ehdotetaan muotoa

\[
\widehat\Box A_\nu=J_\nu.
\tag{3.7}
\]

Sen laskentasopimus on

\[
\mathcal R^{\mathrm{paper\text{-}source}}_\nu
:=\widehat\Box A_\nu-J_\nu.
\tag{3.8}
\]

Yhtälöä (3.7) ei saa nimetä automaattisesti standardiksi lähteelliseksi Maxwell-yhtälöksi. Levi–Civita-geometriassakin

\[
\nabla_\mu F^{\mu\nu}
=\Box A^\nu-\nabla^\nu(\nabla_\mu A^\mu)
-R^\nu{}_{\rho}A^\rho
\tag{3.9}
\]

valitulla kaarevuusmerkkisopimuksella. Weyl-yhteys lisää nonmetricity-termejä.
Siksi muoto $\Box A=J$ tarvitsee gauge-, kaarevuus-, yhteys- ja
linearisointiehdot ennen samaistusta yhtälöön

\[
\nabla_\mu F^{\mu\nu}=J^\nu.
\tag{3.10}
\]

## 4. Elementti II — Weyl-semimetrisyys, yhteys ja identifikaatiot

### 4.1 L0: torsioimaton semimetrisyys

Weyl-haaran lähtöehto on

\[
\widehat\nabla_\sigma g_{\mu\nu}
=2\varphi_\sigma g_{\mu\nu},
\qquad
\widehat T^\lambda{}_{\mu\nu}=0.
\tag{4.1}
\]

Merkitään metriikan $g$ Levi–Civita-yhteyttä aaltosuluilla

\[
\left\{\begin{matrix}\lambda\\\mu\nu\end{matrix}\right\}_g.
\]

Kirjoitetaan yhteyksien erotus tensorina

\[
C^\lambda{}_{\mu\nu}
:=\widehat\Gamma^\lambda{}_{\mu\nu}
-\left\{\begin{matrix}\lambda\\\mu\nu\end{matrix}\right\}_g,
\qquad C^\lambda{}_{\mu\nu}=C^\lambda{}_{\nu\mu}.
\]

Koska $\nabla^{LC}_\sigma g_{\mu\nu}=0$, semimetrisyys antaa lineaarisen ehdon

\[
-C^\rho{}_{\sigma\mu}g_{\rho\nu}
-C^\rho{}_{\sigma\nu}g_{\mu\rho}
=2\varphi_\sigma g_{\mu\nu}.
\]

Kirjoittamalla tämän yhtälön indeksien $(\sigma,\mu,\nu)$ kolmelle sykliselle
permutaatiolle, käyttämällä torsioimattomuuden symmetriaa ja ratkaisemalla
$C$:lle saadaan

\[
C^\lambda{}_{\mu\nu}
=-\delta^\lambda_\mu\varphi_\nu
-\delta^\lambda_\nu\varphi_\mu
+g_{\mu\nu}\varphi^\lambda.
\]

Siten ehdosta (4.1) seuraa valitulla merkkisopimuksella Weyl-yhteys

\[
\boxed{
\widehat\Gamma^\lambda{}_{\mu\nu}
=\left\{\begin{matrix}\lambda\\\mu\nu\end{matrix}\right\}_g
-\delta^\lambda_\mu\varphi_\nu
-\delta^\lambda_\nu\varphi_\mu
+g_{\mu\nu}\varphi^\lambda.}
\tag{4.2}
\]

Tämä antaa kolme erillistä residuaalia, joiden kanoniset ID:t ovat
`WEYL_NONMETRICITY`, `TORSION_FREE` ja `WEYL_CONNECTION`:

\[
\mathcal R^{semi}_{\sigma\mu\nu}
:=\widehat\nabla_\sigma g_{\mu\nu}
-2\varphi_\sigma g_{\mu\nu},
\tag{4.3}
\]

\[
\mathcal R^{conn\,\lambda}{}_{\mu\nu}
:=\widehat\Gamma^\lambda{}_{\mu\nu}
-\left\{\begin{matrix}\lambda\\\mu\nu\end{matrix}\right\}_g
+\delta^\lambda_\mu\varphi_\nu
+\delta^\lambda_\nu\varphi_\mu
-g_{\mu\nu}\varphi^\lambda.
\tag{4.4}
\]

\[
\mathcal R^{tors\,\lambda}{}_{\mu\nu}
:=\widehat T^\lambda{}_{\mu\nu}
=\widehat\Gamma^\lambda{}_{\mu\nu}
-\widehat\Gamma^\lambda{}_{\nu\mu}.
\tag{4.4a}
\]

Kaikkien kolmen on hävittävä samassa merkkisopimuksessa. Yhtälö (4.2) vaatii
$g^{-1}$:n, joten domain-portti $D(A)\neq0$ on pakollinen.

### 4.2 Levi–Civita ei ole Weyl

Ansatzista laskettu tavallinen Christoffel-symboli on vain

\[
\Gamma^{LC\,\lambda}{}_{\mu\nu}
=\frac12g^{\lambda\sigma}
(\partial_\mu g_{\nu\sigma}
+\partial_\nu g_{\mu\sigma}
-\partial_\sigma g_{\mu\nu}).
\tag{4.5}
\]

Ansatzin avulla sama kaava voidaan hajottaa eksaktisti. Määritellään

\[
F_{\mu\nu}:=\partial_\mu A_\nu-\partial_\nu A_\mu,
\qquad
F_{(g)}{}^\lambda{}_{\mu}:=g^{\lambda\alpha}F_{\alpha\mu}.
\]

Tällöin

\[
\boxed{
\Gamma^{LC\,\lambda}{}_{\mu\nu}
=\frac{\kappa}{2}g^{\lambda\alpha}A_\alpha
(\partial_\mu A_\nu+\partial_\nu A_\mu)
-\frac{\kappa}{2}
\left(A_\nu F_{(g)}{}^\lambda{}_{\mu}
+A_\mu F_{(g)}{}^\lambda{}_{\nu}\right).}
\tag{4.5a}
\]

Jokaisessa termissä oleva $\kappa$ on olennainen. Esimerkiksi vain ehdoilla
$\partial_0A_\mu=0$, $A_i=0$, karteesinen $\eta=(-+++)$ ja vakio $\kappa$
saadaan

\[
\Gamma^{LC\,i}{}_{00}
=-\kappa g^{ij}A_0\partial_jA_0.
\tag{4.5b}
\]

Affiinisti proper timella $\tau$ parametrisoidulle hetkellisesti paikallaan
olevalle timelike-radalle $U^i=0$ normalisointi on

\[
g_{\mu\nu}U^\mu U^\nu=-1,
\qquad
U^0=\frac{1}{\sqrt{1-\kappa A_0^2}},
\]

joten geodeesiyhtälön spatiaalinen koordinaattikiihtyvyys on

\[
\frac{d^2x^i}{d\tau^2}
=-\Gamma^{LC\,i}{}_{00}(U^0)^2
=\frac{\kappa g^{ij}A_0\partial_jA_0}
{1-\kappa A_0^2}.
\tag{4.5c}
\]

Pelkkä $-\Gamma^{LC\,i}{}_{00}$ vastaa tässä hetkellistä
koordinaattiaikaesitystä $x^0=t$ (tai erikseen asetettua $U^0=1$:tä), ei
yleistä proper-time-geodeesia. Kovariantti kiihtyvyys itse on LC-geodeesilla
nolla. Tämä tarkistaa staattisen Levi–Civita-rajan; se ei tuota hiukkaslajista
riippuvaa $q/m$:ää eikä validoi Weyl-autoparalleelia.

Se toteuttaa $\nabla^{LC}_\sigma g_{\mu\nu}=0$. Weyl-yhteys (4.2) toteuttaa
$\widehat\nabla g=2\varphi\otimes g$. Ne yhtyvät vain, jos $\varphi=0$. Siksi

- Levi–Civita-kaavan residuaali ei validoi Weyl-haaraa;
- Levi–Civita-geodeesi ei ole automaattisesti vuoden 2025 teorian Weyl-geodeesi;
- $F$-termien esiintyminen Christoffel-kaavan algebrallisessa hajotelmassa ei vielä tee niistä Lorentz-voimaa.

Eksakti $g$-nosto ja taustametriikan $\eta$-nosto liittyvät toisiinsa kaavalla

\[
F_{(\eta)}{}^\lambda{}_{\mu}:=\eta^{\lambda\alpha}F_{\alpha\mu},
\qquad
F_{(g)}{}^\lambda{}_{\mu}
=F_{(\eta)}{}^\lambda{}_{\mu}
-\frac{\kappa}{D}
A_{(\eta)}^\lambda A_{(\eta)}^\alpha F_{\alpha\mu}.
\tag{4.5d}
\]

Siksi $F_{(g)}\mapsto F_{(\eta)}$ on eksakti täsmälleen silloin, kun kaavan
(4.5d) korjaustermi häviää, esimerkiksi $\kappa=0$:ssa tai lisäehdolla
$A_{(\eta)}^\alpha F_{\alpha\mu}=0$. Muussa tapauksessa se on eksplisiittinen
approksimaatio, jonka pois jätetty termi on kirjattava kaavan (4.5d) mukaisesti.
Paljaiden $F_{(g)}{}^\lambda{}_{\mu}$-termien etumerkki kaavassa (4.5b) on
miinus. Plusmerkki on mahdollinen vain, jos symbolilla tarkoitetaan
epästandardisti $g^{\lambda\alpha}F_{\mu\alpha}=-F_{(g)}{}^\lambda{}_{\mu}$.
Nostometriikka ja antisymmetrisen indeksijärjestyksen konventio ovat siksi
pakollista syötemetadataa, eivät kosmeettisia valintoja.

### 4.3 Lähteen tarvitsemat lisäidentifikaatiot

Weyl-yhteys ei yksin tuota varausta, virtaa tai yksittäisen ionin liikeyhtälöä. Vuoden 2025 ehdokasjohto käyttää lisäksi seuraavia identifikaatioita tai rajoitteita:

| Tunniste | Ehto | Status ennen riippumatonta johtoa |
|---|---|---|
| `WEYL_ONE_FORM_MAP` | $\varphi^\mu=U^\mu$, tai yksiköiden vuoksi $\varphi^\mu=c_\varphi U^\mu$ | L0-lisäidentifikaatio |
| `CHARGE_MAP` | $\rho=-A_\mu U^\mu$ | ehdollinen teoriaidentifikaatio |
| `CURRENT_MAP` | $J^\mu=\rho U^\mu$ | standardimainen sulkeuma annetulle virtaukselle |
| `SYMMETRIC_CANCELLATION` | symmetrinen $\partial A$ -osa kumoaa Weyl-korjauksen | erillinen ratkaistava rajoite |
| `PARTICLE_COUPLING` | johdetun kertoimen samaistus fysikaaliseen $q/m$:ään | avoin yksittäiselle varatulle hiukkaselle |

Yksi maailmanviiva ei vielä määritä Weyl-yksi-muotoa koko alueella. Jos
$\varphi$ samaistetaan nopeuteen, syötteen on oltava vähintään sileä
nopeuskongruenssi $U^\mu(x)$, sen normalisointi on ilmoitettava ja yksikkökerroin
$c_\varphi$ on perusteltava.

Kirjoitetaan Weyl-korjaus

\[
C^\lambda{}_{\mu\nu}
:=-\delta^\lambda_\mu\varphi_\nu
-\delta^\lambda_\nu\varphi_\mu
+g_{\mu\nu}\varphi^\lambda.
\tag{4.6}
\]

Lähteen geodeesireduktiossa käytetty kumoutumisehto voidaan tallentaa residuaalina

\[
\mathcal R^{cancel\,\lambda}{}_{\mu\nu}
:=\frac{\kappa}{2} g^{\lambda\alpha}A_\alpha
(\partial_\mu A_\nu+\partial_\nu A_\mu)
+C^\lambda{}_{\mu\nu}.
\tag{4.7}
\]

Ehto $\mathcal R^{cancel}=0$ ei seuraa pelkästä ansatzista tai mielivaltaisen
gaugen olemassaolosta. On osoitettava, että sama gauge, $A$, $g$, $\kappa$,
$\varphi$ ja reunaehdot toteuttavat ehdon globaalisti tai ilmoitetulla
paikallisella alueella.

Muut identifikaatioresiduaalit ovat

\[
\mathcal R^{\varphi\text{-}U\,\mu}
:=\varphi^\mu-c_\varphi U^\mu,
\tag{4.8}
\]

\[
\mathcal R^{\rho}:=\rho+A_\mu U^\mu,
\qquad
\mathcal R^{J\,\mu}:=J^\mu-\rho U^\mu.
\tag{4.9}
\]

### 4.4 Geodeesi ja puuttuva $q/m$

Weyl-autoparalleeli on

\[
\frac{d^2x^\mu}{d\tau^2}
+\widehat\Gamma^\mu{}_{\nu\lambda}U^\nu U^\lambda=0.
\tag{4.10}
\]

Standardin varatun hiukkasen liikeyhtälö on sen sijaan

\[
U^\nu\nabla^{LC}_\nu U^\mu
=\frac qm F_{(g)}{}^\mu{}_{\nu}U^\nu.
\tag{4.11}
\]

Jotta (4.10) voidaan samaistaa (4.11):een, johdon on tuotettava

- hiukkaslajista riippuva $q/m$,
- vastakkaiset kiihtyvyyssuunnat vastakkaisille varauksille,
- nollakytkentä neutraalille hiukkaselle,
- gauge-riippumaton havaittava liikeyhtälö.

Pelkkä universaali metriikka ei tee tätä: geodeesi on lajista riippumaton. Jos
$q/m$ sijoitetaan $\kappa$:an tai yhteyteen, kyse on uudesta aineen
kytkentäpremissistä ja se on merkittävä sellaiseksi. Ennen tätä porttia
turvallinen status on

```text
GEODESIC_TO_CHARGED_PARTICLE_MAP = L2_OPEN
PARTICLE_Q_OVER_M_IDENTIFIED = false
```

## 5. Geodeesipoikkeamaketju ja χ: L0 → L1 → L2

Tämä osio täsmentää 777-rivisen lähtödokumentin kohtien 5.2–5.3 suunnatun
derivaatan ja §6:n geodeesiperturbaation. Tässä “geodeesipoikkeamaketju”
tarkoittaa metriikan perturboinnin aiheuttamaa saman geodeesin variaatiota; se
ei ole kahden taustageodeesin välistä Jacobi-yhtälöä. Lähdedokumentin
geodeesipoikkeamaketjussa abstrakti kaava
$\chi(x)=x/\sqrt{1+x^2}$ säilyy geometrisena L1-tekijänä, ja
tilavuustiheyden suunnattu Lorentz-variaatio on erillinen L1-tulos. Niiden
välinen samaistus ei kuitenkaan ole automaattinen: havaitsijan, positiivisen
spatiaalisen projektion, euklidisen normin, kollineaarisuuden ja
dimensiottoman kartan valinta, jolla suunnatusta tuloksesta muodostetaan
$x\propto|\bar A|_{\mathrm{sp}}$ ja siten
$\chi(|\bar A|_{\mathrm{sp}})$, on L2-silta. Toinen L2-askel
tarvitaan, jos tämä geometrinen suure samaistetaan nimettyyn biologiseen
havaittavaan. Nämä myöhemmät sillat eivät muuta abstraktin $\chi$-kaavan
L1-statusta.

### 5.1 Ensimmäisen kertaluvun geodeesipoikkeama

Kirjoitetaan

\[
A_\mu=\bar A_\mu+\epsilon a_\mu,
\qquad
\bar g_{\mu\nu}=\eta_{\mu\nu}+\kappa\bar A_\mu\bar A_\nu.
\]

Metriikan ensimmäinen variaatio on

\[
h_{\mu\nu}
:=\left.\frac{d g_{\mu\nu}}{d\epsilon}\right|_{\epsilon=0}
=\kappa(\bar A_\mu a_\nu+a_\mu\bar A_\nu).
\tag{5.1}
\]

Levi–Civita-osan yhteysvariaatio voidaan kirjoittaa taustan kovariantilla
derivaatalla muodossa

\[
\delta\Gamma^{LC\,\lambda}{}_{\mu\nu}
=\frac12\bar g^{\lambda\sigma}
\left(
\bar\nabla_\mu h_{\nu\sigma}
+\bar\nabla_\nu h_{\mu\sigma}
-\bar\nabla_\sigma h_{\mu\nu}
\right).
\tag{5.2}
\]

Tämä kaava sisältää käänteismetriikan variaation oikein, kun se esitetään
taustan kovariantilla derivaatalla. Jos lasku tehdään osittaisderivaatoilla,
termi $\delta g^{-1}$ on säilytettävä eksplisiittisesti. Weyl-geodeesissä on
lisäksi varioitava yhtälön (4.6) korjaus $C^\lambda{}_{\mu\nu}$.

Kiinnitetyllä taustaradalla ja nelinopeudella ensimmäisen kertaluvun
kiihtyvyysmuutos on

\[
\delta a^\lambda
=-\delta\widehat\Gamma^\lambda{}_{\mu\nu}U^\mu U^\nu,
\tag{5.3}
\]

sekä tarvittaessa erilliset rata- ja nopeusvariaatiot. Ketju

\[
g\longrightarrow h\longrightarrow\delta\widehat\Gamma
\longrightarrow\delta a
\]

on **L1 [JOHDETTU]** L0-ansatzista, valitusta yhteydestä ja ilmoitetuista
linearisointiehdoista. Se ei vielä nimeä ionikanavaa tai terveydellistä vastetta.

### 5.2 Lorentz-signatuurin suunnattu tekijä

Lorentz-haarassa $D(\bar A)>0$ tilavuustiheys on

\[
V(\bar A):=\sqrt{-\det\bar g}
=\sqrt{1+\kappa\bar A^2}.
\]

Sen Fréchetin suunnattu derivaata suuntaan $u_\mu$ on täsmälleen

\[
\boxed{
D_uV(\bar A)
=\left.\frac{d}{d\epsilon}
\sqrt{1+\kappa(\bar A+\epsilon u)^2}
\right|_{\epsilon=0}
=\frac{\kappa\,\bar A\!\cdot u}
{\sqrt{1+\kappa\bar A^2}}.}
\tag{5.4}
\]

Tämä on suunnattu, etumerkillinen L1-suure. Suunta $u$, kontraktiometriikka,
$\kappa$, gauge ja domain ovat osa syötesopimusta. Lorentz-avaruudessa ei ole
yleistä positiivista $|A|$:ta eikä kaikille kausaalityypeille yhteistä tavallista
$\cos\theta$-esitystä.

Yhtälöt (5.1)–(5.4) muodostavat lähdedokumentin geodeesipoikkeamaketjun kaksi
erikseen tarkistettavaa L1-osaa: $(h,\delta\widehat\Gamma,\delta a)$ kuvaa
geodeesin variaatiota ja $D_uV$ kuvaa saman metriikkaperturbaation suunnattua
tilavuusvastetta. Seuraavan kohdan projektio ja normalisointi eivät seuraa
Lorentz-rakenteesta yksin, vaan muodostavat L2-sillan suunnatusta suureesta
$|\bar A|_{\mathrm{sp}}$:n kautta abstraktiin L1-kaavaan $\chi(x)$. Väite,
että jokin tietty
fysikaalinen geodeesihavaittava on täsmälleen verrannollinen tähän tekijään,
vaatii lisäksi havainto- tai integraatio-operaattorin; biologinen samaistus on
toinen L2-askel.

### 5.3 Eksplisiittinen spatiaalinen/skalaari-reduktio ja L2-raja

Tehdään eksplisiittinen L2-siltavalinta: valitaan havaitsijan
positiividefiniittinen spatiaalinen leikkaus ja sen yksikkösuunta $e_\mu$,
jolle $e^2=+1$, sekä $\kappa>0$. Oletetaan tämän erikoistapauksen ajan

\[
\bar A_\mu=s e_\mu,
\qquad
u_\mu=e_\mu,
\qquad
s:=|\bar A|_{\mathrm{sp}}\ge0.
\]

Tällöin (5.4) redusoituu muotoon

\[
D_eV(s)=\frac{\kappa s}{\sqrt{1+\kappa s^2}}.
\tag{5.5}
\]

Dimensiottomalla koordinaatilla $x=\sqrt\kappa\,s$ saadaan tämän L2-sillan
ehdoilla täsmällisesti

\[
\boxed{
\chi(x):=\frac{x}{\sqrt{1+x^2}}
=\frac{1}{\sqrt\kappa}D_eV(s).}
\tag{5.6}
\]

Kun $\kappa=1$ ja $s$ on jo dimensioton, tämän L2-siltavalinnan tulos on

\[
\chi(s)=\frac{s}{\sqrt{1+s^2}}.
\]

Abstraktin skalaarikaavan $\chi(x)=x/\sqrt{1+x^2}$ status on L1. Sen tulkinta
suunnatun Lorentz-derivaatan spacelike-, kollineaariseksi, euklidiseksi ja
dimensiottomaksi reduktioksi on yllä eksplisiittisesti nimetty L2-silta.
Timelike taustalle $\bar A=Tt$, $t^2=-1$, saadaan sen sijaan nimittäjä
$\sqrt{1-\kappa T^2}$; singulariteettia lähestyttäessä tekijä divergoi eikä
saturoi. Null-suuntaa ei voi normalisoida samalla tavalla.

Sama L2-projektioraja koskee lähtödokumentin $h$-“normia”. Lorentz-kontraktio
$\bar g^{\mu\rho}\bar g^{\nu\sigma}h_{\mu\nu}h_{\rho\sigma}$ on
indefiniitti: se voi olla negatiivinen, nolla tai positiivinen ilman, että $h$
on nolla. Kaava $\|h\|=\sqrt2\,\chi\,\|a\|$ on normikaava vain L2-sillan
jälkeen, kun havaitsija, positiividefiniittinen spatiaalinen projektio ja
tarvittava ortogonaalisuus on annettu. Ilman niitä turvallinen toteutus on
komponenttikohtainen residuaali, ei Lorentz-kontraktion neliöjuuri.

Episteeminen siirtymä on siis

```text
L0: g = eta + kappa A⊗A ja valittu Weyl-/LC-yhteys
  -> L1: h, delta-Gamma, delta-a ja suunnattu D_u sqrt(-g)
  -> L1: abstrakti kaava chi(x) = x/sqrt(1+x^2)
  -> L2: havaitsija + spatiaalinen/euklidinen projektio + x ∝ |A|_sp
  -> L2: chi-tekijän kytkentä nimettyyn kudos-, reseptori- tai elinoperaattoriin
  -> L3: mitatut biologiset parametrit ja endpoint-mallinnukset
```

L2- tai L3-jatko ei muuta $h$:ta, $\delta\Gamma$:a, $\delta a$:ta tai
abstraktia $\chi$-kaavaa jälkikäteen L3:ksi. Avoimia kohtia ovat sekä
Lorentz→spatiaalinen/skalaari-identifikaatio että operaattori, joka kertoo,
mitä biologinen järjestelmä näistä geometrisista suureista mittaa.

## 6. Elementti III — Bianchi $dF=0$ ja homogeeninen Maxwell

### 6.1 Faraday-kaksimuodon määritelmä

Määritellään sähkömagneettinen kaksimuoto

\[
F:=dA,
\qquad
F_{\mu\nu}=2\partial_{[\mu}A_{\nu]},
\qquad
F_{(g)}{}^{\mu\nu}:=g^{\mu\alpha}g^{\nu\beta}F_{\alpha\beta}.
\tag{6.1}
\]

Tämä määritelmä tarvitsee $A$:n ja ulkoderivaatan, ei metriikka-ansatzia,
variaatiofunktionaalia eikä Christoffel-symbolia. Sen erillinen kanoninen
residuaali-ID on `F_DEFINITION`.

### 6.2 Differentiaalinen Bianchi-identiteetti

Ulkoderivaatan nilpotenssista seuraa

\[
\boxed{dF=d(dA)=0.}
\tag{6.2}
\]

Komponenteissa

\[
\mathcal R^{hom}_{\lambda\mu\nu}
:=3\partial_{[\lambda}F_{\mu\nu]}
=\partial_\lambda F_{\mu\nu}
+\partial_\mu F_{\nu\lambda}
+\partial_\nu F_{\lambda\mu}=0.
\tag{6.3}
\]

Torsioimattomalla yhteydellä osittaisderivaatat voidaan korvata
antisymmetroiduilla kovarianteilla derivaatoilla. Turvallisin ja yhteydestä
riippumaton toteutus on silti $dF$.

Kun orientaatio, Lorentz-metriikka ja Hodge-tähti on ilmoitettu, (6.2) vastaa paikallisesti homogeenisia Maxwell-yhtälöitä

\[
\nabla^{LC}_\mu({}^{\star}F)^{\mu\nu}=0,
\tag{6.4}
\]

eli $\nabla\cdot\mathbf B=0$ ja Faradayn induktiolakia. Weyl-nonmetricityn
yhteydessä Hodge-tähden ja divergenssin yhteensopivuus on määriteltävä erikseen;
ulkomuotoyhtälö (6.2) on ensisijainen sopimus.

### 6.3 Mitä Bianchi ei anna

Yhtälö (6.2) ei anna lähteellistä yhtälöä

\[
\nabla^{LC}_\mu F_{(g)}{}^{\mu\nu}=J^\nu.
\tag{6.5}
\]

Se ei myöskään seuraa kontraktoidusta gravitaation Bianchi-identiteetistä. Sen
täsmällinen LC-residuaali on

\[
\boxed{
\mathcal R^{CB,\nu}_{LC}
:=\nabla^{LC}_\mu G^{\mu\nu}[g]\equiv0.}
\tag{6.5a}
\]

Tämä identiteetti pätee jokaiselle riittävän sileälle metriikalle $g$, eikä
siksi rajoita mielivaltaista $A$-kenttää Maxwellin lähdeyhtälön ratkaisuksi.
$\widehat\nabla_\mu G^{\mu\nu}=0$ ei seuraa tästä Weyl-yhteydelle ilman
nonmetricitystä kompensoivia lisätermejä. Kanoninen ID
`CONTRACTED_BIANCHI_LC` tarkoittaa aina juuri kaavan (6.5a) LC-identiteettiä.

Homogeeninen ja lähteellinen haara on tallennettava erikseen:

| Haara | Residuaali | Mitä nollatulos tarkistaa |
|---|---|---|
| Määritelmä | $\mathcal R^{def}_{\mu\nu}:=F_{\mu\nu}-2\partial_{[\mu}A_{\nu]}$ | käytetty $F$ vastaa samaa $A$:ta |
| Homogeeninen | $\mathcal R^{hom}:=dF$ | differentiaalinen sulkeutuneisuus / diskreettiderivaattojen konsistenssi |
| Standardi lähteellinen | $\mathcal R^{src\,\nu}:=\nabla^{LC}_\mu F_{(g)}{}^{\mu\nu}-J^\nu$ | valitun Maxwell–aine-mallin toteutuminen |
| Paperin lineaarinen erikoistapaus | $\mathcal R^{paper\text{-}source}_\nu:=\widehat\Box A_\nu-J_\nu$ | paperin oman lisäehdollisen PDE:n toteutuminen |

Jos $F$ rakennetaan samasta sileästä $A$:sta täsmällisellä ulkoderivaatalla,
$dF=0$ on identiteetti. Diskreetissä laskennassa poikkeama nollasta mittaa
ensisijaisesti derivaattaoperaattorin, hilaverkon, reunaehtojen ja numeerisen
tarkkuuden konsistenssia. Jos $F$ annetaan riippumattomana mittauskenttänä,
$dF=0$ testaa paikallista potentiaaliesitystä; globaali $F=dA$ voi lisäksi
riippua alueen topologiasta.

## 7. Residuaalien yhteinen laskentasopimus

### 7.1 Pakollinen provenance jokaiselle ajolle

Jokaisen residuaaliraportin on sisällettävä vähintään:

```text
formulation_id: 2025_WEYL_GME
residual_id: <yksi §7.3:n kanoninen ID>
l0_branch_id: EINSTEIN_HILBERT | METRIC_GRADIENT_GME | WEYL_GEOMETRY | DIFFERENTIAL_FORM_MAXWELL
action_id: EINSTEIN_HILBERT_ACTION | METRIC_GRADIENT_ACTION | NONE
metric_ansatz: eta_plus_kappa_A_outer_A
signature: -+++
coordinate_chart: <nimi; det_eta=-1 vain karteesisessa normalisoinnissa>
kappa: <arvo ja yksikkö>
kappa_is_spacetime_constant: true | false
domain_min_D: min(1 + kappa*A_squared)
field_causal_type: TIMELIKE | SPACELIKE | NULL | MIXED
connection_kind: WEYL | LEVI_CIVITA | BACKGROUND
weyl_sign_convention: nabla_hat_g_equals_plus_2_phi_tensor_g
wave_operator: divergence_form | rough_laplacian
variation_mode: EH_A_VARIATION | FROZEN_MG_PRINCIPAL_PART | FULL_METRIC_GRADIENT_EULER_LAGRANGE | NOT_APPLICABLE
full_euler_lagrange_verified: true | false
index_raising_metric: G_EXACT | ETA_APPROXIMATION
eta_raising_condition_or_remainder: <A^alpha F_alpha_mu=0 tai kaavan (4.5d) pois jätetty termi>
gauge_id: <eksplisiittinen>
observer_or_spatial_projector_id: <pakollinen spatiaalireduktiossa>
worldline_parameter: PROPER_TIME | COORDINATE_TIME | OTHER_AFFINE | NOT_APPLICABLE
four_velocity_normalization: <esimerkiksi g(U,U)=-1>
boundary_condition_id: <eksplisiittinen>
derivative_scheme: <analyyttinen tai diskreetti menetelmä>
tolerance_basis: <sen residuaalin ID, jonka skaalaa käytetään>
residual_scale: <s_ref, arvo ja residuaalin yksikkö>
absolute_tolerance: <arvo samassa yksikössä kuin residuaali>
relative_tolerance: <arvo>
input_provenance: <lähde tai generaattori>
input_status: MEASURED | PROXY | SCENARIO | SYNTHETIC
```

Yksi tietue nimeää yhden L0-haaran ja yhden residuaalin. EH- ja
metric-gradient-vaikutuksia ei yhdistetä `PLUS`-tunnisteeksi; samasta kentästä
ajetut rinnakkaiset haarat saavat erilliset tietueet ja yhteisen
riippuvuusgraafin. Jos jokin kenttä on mitattu, sen yksiköt ja epävarmuus
kuuluvat samaan tietueeseen. Jos se on skenaario tai proxy, sitä ei saa merkitä
mittaukseksi.

### 7.2 Positiivinen residuaalimitta

Lorentz-kontraktio $\mathcal R_{\mu\nu}\mathcal R^{\mu\nu}$ ei ole
positiividefiniitti eikä siksi yksin kelpaa numeeriseksi normiksi. Käytä joko

- eksplisiittistä komponenttimaksimia $r_\infty=\max|\mathcal R_{\cdots}|$, tai
- nimetyn havaitsijan indusoimaa positiividefiniittistä spatiaalista normia.

Suhteellinen residuaali voidaan määritellä

\[
r_{rel}=\frac{r_\infty}{s_{ref}+\epsilon},
\tag{7.1}
\]

missä $s_{ref}$ on etukäteen määritelty saman yksikön skaala ja $\epsilon$ vain
nollajaon numeerinen suoja. Hyväksyntäehto on

\[
r_\infty\le atol+rtol\,s_{ref}.
\tag{7.2}
\]

Kaavan (3.4a) skaalaus on säilytettävä myös numeerisessa hyväksynnässä. Kun
$\kappa$ on vakio,

\[
r_\infty(\mathcal R^{outer})
=|\kappa|r_\infty(\mathcal R^{GME}),
\quad
s_{ref}^{outer}=|\kappa|s_{ref}^{GME},
\quad
atol_{outer}=|\kappa|atol_{GME}.
\tag{7.3}
\]

Samaa dimensionless $rtol$-arvoa saa käyttää vain, kun myös vertailuskaala
muunnetaan näin. Jos $\kappa$:lla on yksikkö, outer- ja GME-residuaaleilla on
eri yksiköt, joten sama paljas numeerinen `absolute_tolerance` olisi
virheellinen. `HARMONIC_DECOMPOSITION`- ja `GME_OUTER_SCALING`-residuaalit
saavat omat, summattavien termien yksiköihin ja suuruusluokkaan perustuvat
ennalta määritetyt skaalansa. Toleranssia tai skaalaa ei saa valita tuloksen
näkemisen jälkeen. Tapauksessa $\kappa=0$ outer-residuaalin nollasta ei saa
päätellä GME-residuaalin nollaa.

### 7.3 Residuaalirekisteri

| ID | Kaava | Pakolliset syötteet | Turvallinen status |
|---|---|---|---|
| `METRIC_DOMAIN` | $D=1+\kappa A^2$ | $A,\eta,\kappa$ | L1-domain-portti |
| `EINSTEIN_HILBERT_BOUNDARY` | EH-reunatermin käsittely §3.1 | $g$, reuna, normaali, valittu EH-reunatermi tai kiinnitetyt reuna-arvot | EH-haaran L0-hyväksyntäportti |
| `EULER_LAGRANGE_A` | yhtälö (3.1b) | $A,g,G[g],\kappa$, EH-reunasopimus | ehdollinen L1 vain EH-haarassa |
| `METRIC_GRADIENT_BOUNDARY` | $\mathcal B_{\partial\Omega}$ §3.3 | $q,g,\widehat\Gamma$, normaali, reuna-arvot | MG-haaran L0-hyväksyntäportti |
| `HARMONIC_METRIC` | $\mathcal R^H=\widehat\Box_{div}g$ | $g,g^{-1},\widehat\Gamma,\partial g,\partial^2g$ ja MG-variaatiosopimus | ehdollinen L1; jäädytetty pääosa ei ole täysi EL |
| `BACKGROUND_HARMONIC` | $\mathcal R^{bg}$, yhtälö (3.5) | $\eta,g^{-1},\widehat\Gamma,\partial\widehat\Gamma$ | GME-reduktion erillinen L0-lisäehto |
| `HARMONIC_DECOMPOSITION` | $\mathcal R^{dec}=\mathcal R^H-\mathcal R^{bg}-\mathcal R^{outer}$ | $A,\eta,g^{-1},\widehat\Gamma,\kappa$ ja derivaatat | L1 algebra-/diskretointikonsistenssi |
| `GME_OUTER_SCALING` | $\mathcal R^{scale}=\mathcal R^{outer}-\kappa\mathcal R^{GME}$ | $A,g^{-1},\widehat\Gamma,\kappa$ ja derivaatat | L1, kun $\partial\kappa=0$; skaalaus §7.2 |
| `GME` | yhtälö (3.6) | $A,g^{-1},\widehat\Gamma,\partial A,\partial^2A$ | ehdollinen L1 lähteen MG-haaran L0-ehdoilla |
| `WEYL_NONMETRICITY` | $\mathcal R^{semi}=\widehat\nabla g-2\varphi g$ | $g,\widehat\Gamma,\varphi$ | L1 |
| `TORSION_FREE` | yhtälö (4.4a) | $\widehat\Gamma$ | Weyl-yhteysjohdon L0-portin tarkistus |
| `WEYL_CONNECTION` | yhtälö (4.4) | $g,g^{-1},\partial g,\varphi$ | L1 |
| `LEVI_CIVITA_CONNECTION` | yhtälö (4.5) | $g,g^{-1},\partial g$ | L1; ei Weyl-yhteys |
| `CHRISTOFFEL_DECOMPOSITION` | yhtälöt (4.5a) ja (4.5d) | $A,\eta,g^{-1},F,\partial A,\kappa,D$ sekä nostokonventio | L1; $\eta$-nosto vain ehdolla tai kirjattuna approksimaationa |
| `SYMMETRIC_CANCELLATION` | yhtälö (4.7) | $A,g^{-1},\partial A,\varphi,\kappa$ | lisärajoite, ei ansatzin seuraus |
| `PHI_VELOCITY` | yhtälö (4.8) | $\varphi,U,c_\varphi$ | teoriaidentifikaatio |
| `CHARGE_CURRENT` | yhtälö (4.9) | $A,U,\rho,J$ | teoriaidentifikaatio |
| `WORLDLINE_NORMALIZATION` | $g(U,U)=-1$ tai muu nimetty normalisointi | $g,U$, parametrityyppi | L1 tarkistus annetulle maailmanviivalle |
| `GEODESIC_VARIATION` | yhtälöt (5.1)–(5.3) | tausta, perturbointi, yhteys, rata | ehdollinen L1 |
| `CHI_DIRECTIONAL` | yhtälö (5.4) | $\bar A,u,\eta,\kappa$ | L1; suunnattu Lorentz-suure |
| `CHI_SPATIAL_REDUCTION` | yhtälöt (5.5)–(5.6) | havaitsija, spatiaalinen suunta, euklidinen normi, kollineaarisuus, yksikkökartta | `L2_BRIDGE`; ei seuraa suunnatusta Lorentz-tuloksesta ilman näitä valintoja |
| `H_NORM_SPATIAL` | §5.3:n positiivinen projektio | $h$, havaitsija, projektori, ortogonaalisuusehdot | `L2_BRIDGE`; ei yleinen Lorentz-normi |
| `CHI_TO_BIOLOGICAL_OBSERVABLE` | erillinen vasteoperaattori | L1-geometria sekä kudos-/reseptorikartta | `L2_OPEN` |
| `F_DEFINITION` | $F-dA$ | $A,F,\partial A$ | L1-määritelmätesti |
| `HOMOGENEOUS_MAXWELL` | $dF$ | $F,\partial F$ | L1-kinematiikka |
| `CONTRACTED_BIANCHI_LC` | yhtälö (6.5a) | $g,g^{-1},\partial g,\partial^2g,\Gamma^{LC}$ | L1-geometrinen identiteetti; ei sourced Maxwell |
| `SOURCED_MAXWELL` | $\nabla^{LC}\!\cdot F_{(g)}-J$ | $F,J,g,g^{-1},\Gamma^{LC}$ | erillinen dynamiikka |
| `PAPER_SOURCE_WAVE` | yhtälö (3.8) | $A,J,\widehat\Gamma$ sekä gauge-/linearisointiehdot | paperin ehdollinen erikoistapaus |
| `BIOLOGICAL_RESPONSE` | ei määritelty näillä kolmella elementillä | vasteoperaattori puuttuu | L2_OPEN |

### 7.4 Mitä läpäisy tarkoittaa

Residuaalin läpäisy tarkoittaa vain:

> Annettu diskretointi tai analyyttinen kenttä toteuttaa ilmoitetun yhtälön ilmoitetulla toleranssilla, yhteydellä, gauge-valinnalla, domainilla ja reunaehdoilla.

Se **ei** tarkoita, että

- variaatiofunktionaali kuvaa luontoa;
- ansatz on oikea fysikaalinen metriikka;
- Weyl-yksi-muodon identifikaatio on empiirisesti validi;
- Maxwellin lähdeyhtälö on johdettu pelkästä ansatzista;
- geodeesi kuvaa varattua ionia;
- geometria aiheuttaa biologisen tai terveydellisen vasteen.

## 8. L2- ja L3-raja Lindgren–DKC-ketjussa

Kolmen elementin jälkeen seuraavat kohdat ovat edelleen avoimia tai tuotuja.

### 8.1 L2 — avoin geometria–havaittava-silta

Tarvitaan vähintään eksplisiittinen operaattori, esimerkiksi

\[
z_r(t)=\int_0^\infty
K_r^{\mu\nu}(\tau,S_r)
\,\delta g_{\mu\nu}(t-\tau)\,d\tau,
\tag{8.1}
\]

missä $K_r^{\mu\nu}$ sisältää mittausgeometrian, kudos-/elintransferin,
orientaation, vaiheen, taajuuden, koherenssin ja tilan $S_r$. Kolme yllä
johdettua elementtiä eivät määritä $K_r$:ää.

Erityisesti:

- $A=A_{bio}+a_{ext}$ on fysikaalinen ja gauge-riippuvainen jako, joka vaatii operationalisoinnin;
- abstrakti skalaari $\chi(x)=x/\sqrt{1+x^2}$ säilyy L1-kaavana kaikissa myöhemmissä yhdistelmissä;
- sen argumentin samaistaminen muotoon $x\propto|\bar A|_{\mathrm{sp}}$ dimensiottoman, kollineaarisen spacelike-/euklidisen projektion kautta on L2-silta;
- $\chi$-tekijän kytkeminen nimettyyn biologiseen vasteoperaattoriin on erillinen L2-askel;
- geodeesi $\rightarrow$ ionikanava tarvitsee aineen kytkennän ja $q/m$:n;
- $\delta g\rightarrow$ paikallinen fysikaalinen kenttähavaittava, reseptori- tai elinvaste on avoin.

### 8.2 L3-tuonnit ja empiiriset rakenteet

Seuraavien mallien tuonti Lindgren–DKC-ketjuun, niiden empiiriset parametrit tai
niiden valinta vasteeksi ovat L3:a, vaikka Maxwellin homogeeninen identiteetti
tai GME-residuaali toteutuisi. Tuodun standardimallin sisäinen algebra voi silti
olla ehdollinen L1-tulos omista ilmoitetuista premisseistään. Vastaavasti sitä
edeltävät Lindgren-johdon L1-osat säilyvät L1:nä; ketjun provenance on
komponenteittainen:

- SAR-/Schwan-standardimallien tuonti sekä materiaalin ja geometrian empiiriset parametrit;
- VGCC-, RPM/CRY-, redox-, melatoniini- ja muut biologiset mekanismit;
- taajuus- ja modulaatiopainot;
- DKC:n kaksi ydintä, aikavakiot ja sekoituspaino;
- Hill-sulkeuma ja terveys-/lisääntymispäätepisteen kartoitus;
- kansalliset teknologia-ajoitusproxyt.

Teknologia-ajoitusproxy ei ole paikallinen fysikaalinen annos eikä mitattu FieldState.

## 9. Korjattu minimistatus

| Väite | Turvallinen episteeminen status |
|---|---|
| $g=\eta+\kappa A\otimes A$ | L0-premissi |
| käänteinen metriikka, determinantti ja domain $D$ | ehdollinen L1 |
| Einstein–Hilbert-vaikutus $S_{EH}[g(A)]$ | EH-haaran L0-lisäpremissi; ei johda metric-gradient-vaikutusta |
| metric-gradient-vaikutus $S_{MG}[g,\widehat\nabla]$ | MG-haaran erillinen L0-lisäpremissi; ei seuraa $S_{EH}$:sta |
| harmonic metric $\widehat\Box_{div}g=0$ | MG-haaran ehdollinen stationaarisuusehto; täysi variaatiosopimus dokumentoitava |
| $\mathcal R^H=\mathcal R^{bg}+\mathcal R^{outer}$ ja $\mathcal R^{outer}=\kappa\mathcal R^{GME}$ | ehdollinen L1 samalla operaattorilla ja avaruusajassa vakiolla $\kappa$:lla |
| GME (3.6) | ehdollinen L1 vasta MG-, harmonic-, yhteys- ja taustaderivaattaehtojen jälkeen; $\kappa=0$ ei anna käänteistä päätelmää |
| Weyl-yhteys (4.2) | L1 semimetrisyydestä ja torsioimattomuudesta |
| $F=dA\Rightarrow dF=0$ | L1-kinemaattinen identiteetti |
| $\nabla^{LC}_\mu G^{\mu\nu}[g]\equiv0$ | L1-geometrinen LC-identiteetti; ei sourced Maxwell |
| $\nabla^{LC}_\mu F_{(g)}{}^{\mu\nu}=J^\nu$ | erillinen lähteellinen dynamiikka, ei kontraktoidun Bianchin seuraus |
| $\varphi=U,\rho=-A\cdot U,J=\rho U$ | teoriaidentifikaatiot; yksiköt ja globaalit ehdot avoimia |
| Weyl-geodeesi = ionin Lorentz-liike | `L2_OPEN`, kunnes $q/m$ ja aineen kytkentä on identifioitu |
| suunnattu $D_u\sqrt{-g}$ ja abstrakti $\chi(x)$-kaava | ehdolliset L1-tulokset; niiden samaistamista ei oleteta |
| Lorentz→spatiaalinen/euklidinen $x\propto|\bar A|_{\mathrm{sp}}$ -reduktio | L2-silta; havaitsija, projektio, kollineaarisuus ja yksikkökartta ilmoitettava |
| $\chi$-tekijä $\rightarrow$ biologinen havaittava | L2-identifikaatio; vasteoperaattori avoin |
| DKC ja biologiset endpointit | L3 / empiirinen fenomenologia |

Näillä merkinnöillä dokumentti on toistettava laskentasopimus, ei “täydellinen todistus” geometriasta terveysvaikutukseen.

## 10. Normatiivisen lähtödokumentin §1–§14-jäljitettävyys

Alla jokainen 777-rivisen lähtödokumentin pääkohta on mukana. “Normatiivinen”
tarkoittaa tässä, ettei vaatimusta saa ohittaa: se on yhdistettävä kaavaan,
toteutus-/testisopimukseen tai eksplisiittiseen avoimeen porttiin. Se ei muuta
matemaattisesti pätemätöntä implikaatiota L1-tulokseksi. Taulukon residuaali-ID:t
ovat tämän dokumentin rajapintasopimuksia; ne eivät yksin väitä, että vastaava
koodifunktio tai testi olisi jo toteutettu.

| Lähtödokumentin vaatimus | Jälki tässä dokumentissa | API-/testisopimus tai avoin portti | Komponenttikohtainen status |
|---|---|---|---|
| **§1 Lindgrenin metriikka** | ansatz (2.1), inverse ja determinantti (2.2), domain §2.2 | `METRIC_DOMAIN`; tarkista $D$, $g^{-1}g=I$ ja $\det g=(\det\eta)D$ sekä hylkää $D=0$ | ansatz L0; inverse, determinantti ja domain ehdollista L1:tä |
| **§2 Maxwell geometriasta; SAR; Schwan** | rinnakkaiset EH- ja MG/GME-haarat §3, Weyl-ehto §4 sekä LC-Bianchi ja $F=dA\Rightarrow dF=0$ §6 | EH: `EINSTEIN_HILBERT_BOUNDARY`, `EULER_LAGRANGE_A`; MG: `METRIC_GRADIENT_BOUNDARY`, `HARMONIC_METRIC`, `BACKGROUND_HARMONIC`, `HARMONIC_DECOMPOSITION`, `GME_OUTER_SCALING`, `GME`; Weyl: `WEYL_NONMETRICITY`, `TORSION_FREE`, `WEYL_CONNECTION`; muodot: `F_DEFINITION`, `HOMOGENEOUS_MAXWELL`; gravitaatioidentiteetti: `CONTRACTED_BIANCHI_LC`; lähteelliselle haaralle erillinen `SOURCED_MAXWELL`; SAR/Schwan ovat erillisiä tuontiportteja | kunkin valitun L0-haaran pätevä johto säilyy komponenttikohtaisena L1:nä, mutta EH ja MG eivät implikoi toisiaan; SAR/Schwan-rakenne voi olla omilla premisseillään L1, kun mallin tuonti, vasteidentifikaatio ja materiaaliparametrit ovat L3-komponentteja |
| **§3 Christoffelin symbolit** | Levi–Civita-kaava (4.5), eksakti hajotelma (4.5a), $g$-nosto ja $\eta$-vertailu (4.5d) sekä Weyl-korjaus (4.2) | `LEVI_CIVITA_CONNECTION`, `CHRISTOFFEL_DECOMPOSITION`, `WEYL_CONNECTION`; testaa $\nabla^{LC}_\sigma g_{\mu\nu}=0$, säilytä $\kappa$, ja käytä $F_{(g)}$:tä tai kirjaa $\eta$-noston ehto/jäännöstermi | LC- ja Weyl-yhteydet erikseen ehdollista L1:tä; $F$-termin tulkinta voimaksi ei seuraa tästä |
| **§4 geodeesi ja ionien liike** | staattinen LC-esimerkki (4.5b)–(4.5c) sekä Weyl-autoparalleeli (4.10) vasten Lorentz-liikettä (4.11) | `WORLDLINE_NORMALIZATION` erottaa proper timen ja koordinaattiajan; `GEODESIC_TO_CHARGED_PARTICLE_MAP=L2_OPEN`; vaadi $q/m$, varauksen etumerkki, neutraalin raja ja aineen kytkentä | geodeesiyhtälö ja oikealla parametrilla laskettu koordinaattikiihtyvyys ovat L1 valitulle yhteydelle; ionin Lorentz-liike L2-portin takana |
| **§5 valintasääntö $\chi$** | metriikkavariaatio (5.1), suunnattu Lorentz-derivaatta (5.4), L2-reduktio (5.5)–(5.6) | `CHI_DIRECTIONAL` ja `CHI_SPATIAL_REDUCTION`; testaa suunta, etumerkki, $\kappa$, kausaalityyppi ja $D>0$ | suunnattu tekijä ja abstrakti $\chi$-kaava L1; Lorentz→spatiaalinen/euklidinen reduktio sekä biologinen vasteoperaattori L2 |
| **§6 geodeesipoikkeama** | geodeesivariaatio (5.1)–(5.3) ja indefiniitin $h$-kontraktion varoitus §5.3 | `GEODESIC_VARIATION`; äärellisen erotuksen vertailu $\delta\widehat\Gamma$:lle; `H_NORM_SPATIAL` vain nimetylle positiiviselle projektiolle L2-siltana | geometrinen variaatio L1; positiivinen $h$-normi ja $\delta F_{ion}\propto\chi\nabla a$ tarvitsevat projektion tai aine-/havainto-operaattorin eivätkä ole ilman niitä valmiita L1-voimalakeja |
| **§7 geodeesipoikkeama → ionikanava** | avoin vasteoperaattori (8.1) ja $q/m$-portti §4.4 | `CHI_TO_BIOLOGICAL_OBSERVABLE=L2_OPEN`; syötä kanava-, kudos-, orientaatio- ja kynnysmalli erikseen | geometriset osat säilyvät L1:nä; kanavasamaistus on L2; biologiset mekanismit ja kynnykset L3 |
| **§8 taajuuspainot $w_L(f)$** | L3-raja §8.2; geometria ei määritä painotuloa | `FREQUENCY_WEIGHT_MODEL=OPEN_GATE`; jokaiselle tekijälle oma provenance, yksikkö ja epävarmuus | erikseen johdettu lineaarisen standardimallin rakenne voi säilyä ehdollisena L1:nä; $\chi$-kanavasilta L2; materiaali-, modulaatio- ja sovitusosat L3; niiden tuloa ei leimata kokonaan johdetuksi |
| **§9 FieldState, DKC, polut ja Hill** | L2/L3-raja §8 ja minimistatus §9 | vain paikallinen mitattu fysikaalinen kenttä saa käyttää kenttäsuureen nimeä; kansallinen ajoitussarja on `TECHNOLOGY_TIMING_PROXY`, ei FieldState eikä annos; DKC/Hill kalibroidaan erillään | lineaarisen summan algebra voi olla L1 annetussa lineaarimallissa; painot ja data L3; DKC, polut ja Hill L3; tuloprovenance säilyttää kaikki osatasot |
| **§10 kokonaisketju** | erilliset kolme haaraa §1 sekä L0→L1→L2→L3-raja §5.3 | tallenna riippuvuusgraafi väitekohtaisesti; älä korvaa komponenttitasoja yhdellä “heikoin lenkki” -leimalla | jokainen L1-solmu säilyy L1:nä; myöhempi L2/L3-solmu ei muuta sen statusta |
| **§11 mitä johto antaa / ei anna** | residuaalin merkitys §7.4 ja avoimet sillat §8 | väiterekisterissä jokaisella tuloksella `premises`, `domain`, `residual`, `provenance` ja `epistemic_level` | algebraattinen/geometrinen L1 erotetaan fysikaalisesta L2-identifikaatiosta ja empiirisestä L3-komponentista |
| **§12 falsifioitavat ennusteet** | spacelike/timelike-erottelu §5.2–§5.3 ja lähdejaottelu §6.3 | $\chi(0)$, abstraktin kaavan saturaatio ja suunnattu derivaatta voidaan yksikkötestata L1-kaavoina; spatiaalinen tulkinta testaa L2-siltaa ja biologiset nolla-, saturaatio- ja suuntaennusteet L2/L3-ketjua; SAR/Schwan testataan omia ulkoisia mallejaan vasten | abstraktin kaavan ominaisuus L1 omalla domainillaan; spatiaalinen/fysikaalinen tulkinta L2; biologinen ennuste L2/L3; timelike-haaralle ei väitetä saturaatiota |
| **§13 toteutusohjeet** | provenance-skeema §7.1, positiivinen residuaali §7.2 ja rekisteri §7.3 | jokainen API palauttaa tason, premissit, domain-tuloksen ja residuaalin; testit kattavat singulaarisuuden, suunnan, yhteystyypin ja virheellisen samaistuksen; proxy-nimeämissääntö on pakollinen | status on kenttä-/operaattorikohtainen; L1 ei romahda L3:ksi yhdistelmässä |
| **§14 matemaattinen yhteenveto** | korjattu minimistatus §9 | yhteenvetotesti tarkistaa EH/MG-haarojen erillisyyden, $\mathcal R^{outer}=\kappa\mathcal R^{GME}$ -skaalan ja sen toleranssit sekä sen, ettei `Bianchi => sourced Maxwell`, Lorentz-“normi”, $q/m$:tön ioniliike tai rajoittamaton $\chi$ pääse hyväksytyksi | pätevät determinantti-, inverse-, kummankin valitun variaatiohaaran, Weyl- ja $dF$-tulokset säilyvät L1:nä; nimetyt avoimet portit säilyvät L2/L3:na |

Taulukko toteuttaa koko §1–§14-jäljitettävyyden ilman episteemistä
ylikirjoitusta: esimerkiksi L3-aikavakion käyttäminen L1-geometriatuloksen
jälkeen ei muuta geometriatulosta L3:ksi, mutta yhdistelmäennusteen on kannettava
molemmat provenancet.

## 11. Lähteet ja rajaus

- J. Lindgren, A. Kovacs & J. Liukkonen, *Electromagnetism as a Purely Geometric Theory*, Journal of Physics: Conference Series 2987 (2025) 012001, [DOI](https://doi.org/10.1088/1742-6596/2987/1/012001); avoin [ennakkoversio](https://doi.org/10.20944/preprints202503.2321.v1).
- Projektin lähde- ja aukkokartta: [berm-lindgren-first-source-map-v2.md](./berm-lindgren-first-source-map-v2.md).
- Projektin ehdollinen tensorialgebra: `berm.physics.lindgren_tensor`. Sen inverse-, determinantti- ja suunnattu derivaattakerros on L1 vain ilmoitetulla domainilla; biologinen tulkinta jää L2:een.

Vuoden 2021 singularista ansatzia $g=A\otimes A$ ei yhdistetä tässä vuoden 2025
ei-singulaariseen ansatziin. Singularista rank-one-osaa ei koskaan käännetä
metriikkana. Kaikki $g^{-1}$:ää käyttävät kaavat viittaavat täydelliseen
metriikkaan (2.1) ja läpäisevät ensin domain-portin.
