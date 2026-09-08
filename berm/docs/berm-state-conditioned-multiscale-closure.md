# BERM:n tilariippuvainen vaste ja yksilöstä sivilisaatioon johtava sulkeuma

**Versio:** 1.0

**Päiväys:** 3.9.2026

**Tila:** kanoninen rakenteellinen BERM-laajennus; kudos- ja populaatiokertoimet avoimia

**FieldState-raja:** FieldState voi mitata fysikaalisia syötteitä. Se ei määritä alla olevaa vasteydintä, biologiaa tai aggregaatiota.

## 1. Lindgren-lähtö — [JOHDETTU]

Vuoden 2025 ansatz on

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu.
\]

Kun \(A_\mu=\bar A_\mu+a_\mu\), taustaan nähden tarkka häiriö on

\[
\delta g_{\mu\nu}=\kappa(\bar A_\mu a_\nu+a_\mu\bar A_\nu+a_\mu a_\nu).
\]

Tämä säilyttää tensorisen suunnan ja neliöllisen sekoituksen. Se ei vielä anna biologista päätepistettä eikä oikeuta korvaamaan tensorihäiriötä kentänvoimakkuusskalaarilla.

## 2. Ehdollinen L2-operaattori — [EMERGENTTI]

Minimaalisen materia–metriikka-kytkennän ja kausaalisen vasteformalismiin tuodun ehdon alla BERM kirjoittaa kudosajon muodossa

\[
u_i(t)=\int_0^\infty K_i^{\mu\nu}
(\tau;\mathcal S_i(t-\tau))\,
\delta g_{\mu\nu}(t-\tau)\,d\tau
+O(\delta g^2).
\]

Primääritutkimusten yhteinen käyttö BERM:ssä on rajata tilajoukon \(\mathcal S_i\) rakennetta. Rekisteröidyt ehdot ovat:

\[
\mathcal S_i=\{\theta,\phi,C,W,T(t),z_{circ},z_{met},z_{dev},
z_{receptor/agonist},z_{redox},G_i,H_i\},
\]

missä \(\theta\) on orientaatio, \(\phi\) vaihe, \(C\) koherenssi, \(W\) aaltomuoto, \(T(t)\) lämpötilahistoria, \(G_i\) elinsiirto ja \(H_i\) altistus- ja tilahistoria.

Litovitz rajaa koherenssia, Rosenspire endogeenista vaihetta, Ubeda pulssimuotoa ja kehitysikkunaa, Blackman orientaatiota ja lämpötilahistoriaa sekä Lymangrover agonistitilaa ja intensiteetti-ikkunaa. Bermanin monilaboratoriovuorovaikutus osoittaa, ettei protokollan ja laboratorioympäristön heterogeenisyyttä pidä keskiarvoistaa pois. Møllerløkkenin akuutti MRI-nollatulos rekisteröi yhden ihmisen seerumihormonien nolla-alueen.

Nämä tulokset eivät osoita, että \(\delta g\) aiheutti havaitut vasteet. Ne rajaavat kandidaattioperaattorin argumentteja, mahdollisia etumerkkejä, viiveitä ja nolla-alueita. \(\kappa\), gauge-resepti, luonnollinen fysikaalinen kytkentä sekä ihmisen kudoskohtaiset \(K_i\)-kertoimet ovat edelleen [AVOIN].

## 3. Rinnakkaiset biologiset toteutumat — [TUOTU]

Kudosajo voi BERM:n kandidaattirakenteessa toteutua usean rinnakkaisen biologisen reitin kautta:

\[
u_i\rightarrow
\{\mathrm{CRY/RPM},\ \mathrm{Ca^{2+}/VGCC},\ \mathrm{redox},\
\mathrm{bioelectricity},\ \mathrm{clock/melatonin},\ \mathrm{HPA/HPG}\}.
\]

Nämä mekanismit tulevat fysiikan, kemian ja biologian kirjallisuudesta. Niiden evidenssi ei liiku ylävirtaan Lindgren-premissin tai avoimen L2-kytkennän validaatioksi.

## 4. Hormonaalinen kapasiteetti — [TUOTU + EMERGENTTI]

Kokonais-testosteroni ei ole vaikutuksen lopputulos. BERM:n kudoskohtainen androgeenikapasiteetti on

\[
A_{i,eff}=\frac{\sum_r w_r R_{ir}
\frac{T_f}{K_{d,r}+T_f}G_{ir}}{\sum_r w_r},
\]

missä \(T_f\) seuraa SHBG-/albumiinisitoutumisesta, \(R_{ir}\) on AR-/ZIP9-saatavuus ja \(G_{ir}\) reseptorin jälkeinen välitys. Näin kokonais-T:n nollatulos ei yksin sulje pois kudosvasteen muutosta. BERM ei kuitenkaan aktivoi EMF→SHBG-, EMF→AR- tai EMF→ZIP9-kerrointa ilman nimettyä päätepistekalibraatiota.

## 5. Yksilön tilasta populaatiojakaumaan — [EMERGENTTI]

Yksilöllinen käyttäytymisvaste esitetään ehdollisena todennäköisyytenä

\[
P(Y_i=p\mid z_i,x_i),
\]

missä \(z_i\) sisältää mitatut endokriiniset, reseptori-, vuorokausi- ja neuraaliset tilat ja \(x_i\) sosiaalisen kontekstin. Populaatioon siirrytään eteenpäin suuntautuvalla sekoitusoperaattorilla

\[
P_t(Y=p)=\int P(Y=p\mid z,x)f_t(z,x)\,dz\,dx.
\]

Tämä sallii ositekohtaiset ja vastakkaissuuntaiset vaikutukset. Alogailyn interventio rajaa yhden testosteroni × puoluesitoutuminen -vuorovaikutuksen; Bakkerin replikaatio-ohjelma rajaa pois Oxleyn alkuperäisen uhkafysiologia-assosiaation käsittelyn yleisenä ideologialakina.

Operaattori ei salli käänteistä päätelmää yksilön tilasta agregaattituloksen perusteella.

## 6. Institutionaalinen muisti ja Epistapege — [EMERGENTTI]

Yksinkertaisin eksplisiittinen muistirakenne on

\[
I_{t+1}=\rho I_t+(1-\rho)P_t,
\qquad 0\le\rho\le1.
\]

Kun yksilöllinen tilamuutos vaikuttaa raporttiin, populaatiojakauma muuttuu ja instituutio käyttää raporttia myöhemmän mallin syötteenä, Epistapege-ketju on

\[
z_i\rightarrow P(Y_i\mid z_i,x_i)
\rightarrow P_t(Y)
\rightarrow \text{narratiiviattribuutio}
\rightarrow I_{t+1}.
\]

Kerroin \(\rho\) ei ole historiallisesti kalibroitu. Rakenteen tehtävä on tehdä näkyväksi, millä operaattorilla yksilövaikutus aggregoituu ja millä oletuksella institutionaalinen tulos voi säilyä alkuperäistä biologista perturbaatiota pidempään.

## 7. Erottava testi

BERM-spesifiä erottelukykyä ei tuota geneerinen havainto “kenttä muuttaa päätepistettä”. Vahvempi testi vertaa ennalta rekisteröityä tensorista ja tilariippuvaista mallia scalar dose -malliin. BERM-sulkeuma heikkenee, jos orientaatio, koherenssi, vaihe, aaltomuoto, lämpötilahistoria, kudostila ja viive eivät yhdessä paranna otoksen ulkopuolista ennustetta.

Sivilisaatiohaara heikkenee, jos biologinen tila ei paranna myöhemmän käyttäytymisen ja raportin ennustetta aiempien raporttien ja sosioekonomisten muuttujien yli tai jos interventio biologiseen tilaan ei muuta ennustettua ositekohtaista käyttäytymisjakaumaa.
