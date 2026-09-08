# BERM:n ehdollinen vasteoperaattori ja androgeeninkäyttökapasiteetti

**Versio:** 1.0  
**Päiväys:** 3.9.2026  
**Tila:** kanoninen BERM-mallisopimus  
**FieldState-raja:** FieldState on vain valinnainen mittaus-, havainto- ja estimointihaara. Alla olevat johdot kuuluvat BERM:lle.

Tilariippuvaisen ja viiveellisen kudosytimen primäärilähderajat sekä eksplisiittinen yksilö→populaatio→instituutio-sulkeuma on määritelty jatkodokumentissa [berm-state-conditioned-multiscale-closure.md](berm-state-conditioned-multiscale-closure.md).

## 1. Mitä nyt voidaan johtaa

### 1.1 Lindgrenin metriikkahäiriö — [JOHDETTU]

Vuoden 2025 lähtökohta kirjoitetaan dimensioasteikko näkyvänä:

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu.
\]

Kun (A=\bar A+a), taustaan nähden tarkka muutos on

\[
\delta g_{\mu\nu}
=\kappa\left(\bar A_\mu a_\nu+a_\mu\bar A_\nu+a_\mu a_\nu\right).
\]

Tämä on tensorinen identiteetti. Muotoa (2\bar A\!\cdot a) ei käytetä ennen kuin kontraktio, normi, rata tai mittausoperaattori on nimetty.

### 1.2 Rajattu geometrinen koordinaatti — [JOHDETTU RAJATUSTI]

Rank-one-päivityksen käänteismetriikka on

\[
g^{-1}=\eta^{-1}
-\frac{\kappa A^\sharp\!\otimes A^\sharp}{1+\kappa A^2}.
\]

Kun valitaan positiivinorminen moodi ja määritellään eksplisiittisesti dimensioton (\rho^2=\kappa A^2\ge0), käänteismetriikan rank-one-korjauksen kerroin on

\[
\frac{\rho^2}{1+\rho^2}=\chi_{\rm geo}^2,
\qquad
\chi_{\rm geo}(\rho)=\frac{\rho}{\sqrt{1+\rho^2}}.
\]

Siten v17:n (\chi)-funktion **muoto** voidaan tunnistaa johdetuksi geometriseksi koordinaatiksi ilmoitetuilla ehdoilla. Sen käyttö kansallisen teknologia-ajoitusproxyn painona ei silti ole johdettu kudosvaste eikä FieldState-mittaus.

### 1.3 RF-verhokäyrä ja beat-termit — [JOHDETTU]

Neliöllinen termi (a\otimes a) sekoittaa taajuuksia. Kun

\[
a(t)=a_0[1+m\cos(\Omega t)]\cos(\omega t),
\]

ja kantoaaltotaajuiset termit poistetaan ideaalisella alipäästöllä, jää

\[
\mathrm{LP}\{\kappa a^2\}
=\frac{\kappa a_0^2}{2}
\left[1+2m\cos\Omega t+\frac{m^2}{2}(1+\cos2\Omega t)\right].
\]

Kahdelle kantoaallolle (a_1\cos\omega_1t+a_2\cos\omega_2t) erotustaajuuden amplitudi on (\kappa a_1a_2). Tämä johtaa matalataajuisen **metriikka-ajurin rakenteen**, ei sen biologista havaittavuutta tai vaikutuskokoa.

## 2. Ehdollinen geometria–havaittava-operaattori

### 2.1 Materiakytkentä — [TUOTU EHTO]

Oletetaan standardi minimaalinen materiakytkentä (S_m[\psi,g]). Tällöin

\[
\delta S_m
=\frac12\int d^4x\,\sqrt{-g}\,T^{\mu\nu}\delta g_{\mu\nu}.
\]

Tämä määrittelee sen, mihin metriikkahäiriö aineessa kytkeytyy. Oletus ei ole Lindgrenin biologinen tulos, vaan BERM:n ilmoitettu ehdollinen premissi.

### 2.2 Kudosvaste — [JOHDETTU EHDOLLISESTI]

Kubon vasteformalismia käyttäen kudoksen havaittavan (O_i) muutos voidaan kirjoittaa

\[
\delta\langle O_i(x)\rangle
=\int d^4x'\,\Xi^{\mu\nu}_{i,R}(x,x';\mathcal S_i)\,
\delta g_{\mu\nu}(x')
+\frac12\iint\Xi^{(2)}_i\,\delta g\,\delta g+\cdots .
\]

(\mathcal S_i) sisältää kudoksen tilan, reseptorit, lämpötilan, vuorokausivaiheen ja muut reunaehdot. Operaattorin **muoto** on siis johdettu ehtojen alla. Seuraavat osat ovat edelleen [AVOIN]:

- (\kappa):n fysikaalinen arvo ja yksiköt;
- Lindgren-metriikan gauge-resepti tai gauge-invariantti observaabeli;
- kunkin kudoksen kausaalinen vasteydin (\Xi_i) ja korkeammat ytimet;
- annos–vaste, merkki, viive ja ihmisen päätepistekerroin;
- Lindgren-spesifinen ennuste, joka erottaa tämän tavallisesta väliainevasteesta.

Täsmällinen status on siksi **ehdollinen formaali operaattori, avoin kalibraatio** — ei enää “mitään operaattoria ei ole”, mutta ei myöskään “biologinen ketju on johdettu Lindgrenistä”.

## 3. Hormonitasosta hormoninkäyttöön

### 3.1 Sitoutuminen ja vapaa testosteroni — [TUOTU]

Yhden ligandin ja kahden sitoutumisaltaan massavaikutusmalli on

\[
T_{tot}=T_f
+B_{SHBG}\frac{T_f}{K_{SHBG}+T_f}
+B_{Alb}\frac{T_f}{K_{Alb}+T_f}.
\]

Sama (T_{tot}) voi siten vastata eri (T_f):ää, jos SHBG, albumiini tai affiniteetit eroavat. Intratestikulaarinen testosteroni käsitellään erillisenä kompartimenttina. Tämä tekee kokonais-testosteronista vain yhden tilamuuttujan.

### 3.2 Reseptori ja reseptorin jälkeinen välitys — [TUOTU]

Reseptorireitin (r) normalisoitu signaali on

\[
S_r
=R_r\frac{T_f}{K_{d,r}+T_f}G_r,
\]

missä (R_r) on reseptorin määrä/toiminnallinen saatavuus ja (G_r) reseptorin jälkeinen välityskyky. BERM pitää klassisen androgeenireseptorin ja kudoskohtaisen ZIP9-reitin erillisinä:

\[
\mathrm{AEC}
=\frac{\sum_r w_rS_r}{\sum_r w_r}.
\]

De Gendt ym. osoittavat Sertoli-solun AR:n kausaalisen välttämättömyyden täydelle spermatogeneesille. Yu ym. liittävät yhdessä 2605 MHz:n rotta-/Sertoli-protokollassa ZIP9:n testosteronivälitteiseen stressinsietoon: lyhytaikainen altistus nosti testikulaarista testosteronia ja ZIP9:ää, mutta ei heikentänyt lyhyen aikavälin siittiöpäätepisteitä; pidemmässä altistuksessa ZIP9 laski. Tämä tukee nimenomaan sitä, ettei seerumin hormonisuunta yksin määrää kudosvastetta.

### 3.3 BERM-ketju — [EMERGENTTI]

Päivitetty miesreitti on

\[
\text{androgeenituotanto}
\rightarrow
\text{SHBG/albumiini + vapaa/intratestikulaarinen saatavuus}
\rightarrow
\text{AR/ZIP9-miehitys}
\rightarrow
\text{reseptorin jälkeinen välitys}
\rightarrow
\mathrm{AEC}
\rightarrow
\text{BTB + spermatogeneesi + siittiötoiminta}.
\]

Mieskapasiteetissa steroidogeneesi ja AEC ovat erillisiä kertovia tekijöitä. Näin malli voi esittää sekä tuotannon laskun että tilanteen, jossa mitattu kokonais-testosteroni säilyy mutta kudoksen käyttökapasiteetti heikkenee.

## 4. Mitä tutkimus nyt vahvistaa — ja mitä ei

| Ketjulinkki | Status | Perusta | Avoin testi |
|---|---|---|---|
| (A\to\delta g) | [JOHDETTU] | Lindgren 2025 + tarkka hajotelma | ansatzin fysikaalinen validiteetti |
| (\delta g\to\delta\langle O_i\rangle) | [JOHDETTU EHDOLLISESTI] | minimaalinen materiakytkentä + vasteformalismi | (\kappa), gauge ja kudosydin |
| (T_{tot}\to T_f) | [TUOTU] | SHBG-/albumiinifysiologia | yksilön tasapainodialyysi tai validoitu laskenta |
| (T_f\to\) AR/ZIP9-signaali | [TUOTU] | reseptorimiehitys, AR-knockout, ZIP9-kokeet | ihmisen kudoskohtainen vaste |
| EMF (\to\) SHBG/AR/ZIP9 | [AVOIN / OSITTAINEN] | yksi suora ZIP9-rottareitti; akuutti MRI-hormonikoe nolla | pitkäkestoinen matched human panel |
| AEC (\to\) parikapasiteetti (\to\) ASFR/TFR | [EMERGENTTI] | BERM:n reduktionistinen kapasiteettiketju | pari- ja ikäkohtainen kalibraatio |

Mallin ensisijainen hormonaalinen testi ei siksi ole enää vain “laskeeko kokonais-T”, vaan rinnakkainen paneeli:

\[
T_{tot},\ SHBG,\ albumiini,\ T_f,\ T_{intratesticular},\ AR,\ ZIP9,
\text{reseptorin jälkeiset fosfoproteiinit},\ BTB,\ siittiöpäätepisteet.
\]

Akuutti 24 miehen MRI-risteytyskoe ei havainnut muutosta testosteronissa tai SHBG:ssä. Se on suoraa vastanäyttöä yleiselle välittömälle seerumihormoniväitteelle, mutta ei mittaa AR:ää, ZIP9:ää tai kroonista kudoskapasiteettia. Tämä rajaus on säilytettävä jokaisessa BERM-tulkinnassa.

## 5. Laskennallinen toteutus

- `berm.physics.lindgren_response`: tarkka (\delta g), (\chi_{geo}), vastekontraktio sekä AM-/beat-kertoimet.
- `berm.biology.androgen_capacity`: SHBG-/albumiinitasapaino, reseptorimiehitys, AR-/ZIP9-signaalit ja AEC.
- `berm.biology.reproductive_state.MaleReproductiveState`: erottaa `steroidogenic_support`- ja `androgen_effective_capacity`-tekijät.
- `berm.biology.causal_registry`: erottaa Lindgren-ajurin, ehdollisen L2-operaattorin, sitoutumissaatavuuden ja reseptorikapasiteetin omiksi solmuikseen.

Mitään oletuskerrointa EMF:stä AEC:hen tai TFR:ään ei aktivoida. Numeerinen vaikutus syntyy vasta nimetyllä, jäljitettävällä kudosytimellä ja päätepistekalibraatiolla.

## 6. Keskeiset lähteet

- Lindgren, Kovacs & Liukkonen (2025), DOI `10.1088/1742-6596/2987/1/012001`.
- Kubo (1957), DOI `10.1143/JPSJ.12.570`.
- Narinx ym. (2022), DOI `10.1007/s00018-022-04562-1`.
- Laurent ym. (2016), DOI `10.1038/srep35539`.
- De Gendt ym. (2004), DOI `10.1073/pnas.0308114100`.
- Yu ym. (2023), DOI `10.1016/j.ecoenv.2023.114733`.
- Møllerløkken ym. (2012), DOI `10.1016/j.reprotox.2012.04.003`.
