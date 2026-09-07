# BERM: vastaanottimen, korjaustilan ja biologisen muistin täydentävä evidenssi

7.9.2026. Tutkimusmuistio, ei mallin tai sivuston toteutusmuutos. Tarkastettu paikallinen versio: `7a938dd`. Tarkoitus on rakentaa vahvin perusteltu synteesi mallin omista premisseistä lähtien.

## Lähtökohta ja tarkastettu nykytila

Lindgrenin vuoden 2025 premissi on

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu,
\qquad A=A_b+a.
\]

Tästä seuraa algebrallisesti [JOHDETTU]

\[
\delta g_{\mu\nu}=\kappa
(A_{b\mu}a_\nu+a_\mu A_{b\nu}+a_\mu a_\nu).
\]

Biologinen lukema tarvitsee erillisen operaattorin, esimerkiksi

\[
z_r(t)=\int_0^\infty K_r^{\mu\nu}(\tau;S(t))
\delta g_{\mu\nu}(t-\tau)\,d\tau.
\]

Tämän `K`:n johtaminen ja kalibrointi pysyy [AVOIN]-kohdassa. Seuraava päättely on [EMERGENTTI] ehdollisesti sille, että jokin tällainen silta toimii: biologinen tila `S` vaikuttaa vastaanottoon, ja vastaanoton synnyttämä signalointi voi muuttaa tulevaa `S`:ää. Siksi vastaanotin ei ole pysyvä kerroin vaan oman historiansa muuttama järjestelmä. Alla olevat lähteet ovat biologian [TUOTU] L3–L4-komponenttinäyttöä. Niitä ei siirretä Lindgrenin geometrian tai avoimen L2-sillan todisteiksi.

Nykyinen `biological-coordination.md` ja Python-malli sisältävät jo eksplisiittiset palautumisajat, tilapäivityksen, redox-ikkunan sekä hormoni–vastaanottavuusajoituksen. Meng 2026, Kish 2026, Lamia 2009/2011 ja Sannino 2022/2024 ovat lähderekisterissä. Tuorein rekisteri sisältää myös `goertemaker2022_cry4a_gtalpha` ja `yee2023_opsin_gtalpha`: näiden puuttuvuus aiemmassa integraatioauditoinnissa on vanhentunut. Olennaiset aukot koskevat nyt välivaiheiden yhdistämistä ja parametreja.

Alla esitetyt Toledo 2018, Juste 2021, Hawley 2005, Høyer-Hansen 2007, Kim 2011, Park 2023, Müller 2014, Engelhard 2014 ja Just 2026 eivät löytyneet nykyisen bibliografian DOI-, tekijä- tai otsikkohaulla.

## 1. Korjauskoneisto muuttaa myös kelloa ja hormonaalisen syötteen tulkintaa

**Päättely ennen lähteitä.** Jos vastaanotin tuottaa kemiallisen tilamuutoksen ja adaptiivisen korjausvasteen, mutta korjaus poistaa myös vastaanottoa tai hormonaalista lukemaa sääteleviä proteiineja, korjausvaste muuttaa myöhemmän ärsykkeen vastefunktiota. Mallista pitäisi tällöin löytyä takaisinvaikutus `korjaus → CRY/kello → reseptiivisyys`, ei pelkästään `korjaus → vähemmän vauriota`.

**Toledo ym. 2018:** hiirimaksassa ATG7-riippuvainen makroautofagia hajotti selektiivisesti CRY1:tä. Hajotus keskittyi kokeen kellonaikoihin 15–23 ja oli suurimmillaan klo 19. Maksaspesifinen AAV-Cre/Atg7-poisto kasvatti CRY1-proteiinia, mutta ei CRY2:ta; vuorokausiaikasarjassa oli 5–7 hiirtä ryhmää/aikapistettä kohden ja kuusi aikapistettä. CRY1:n LC3-sitoutumisalueiden LIR1/LIR4-mutaatiot vaikeuttivat sen hajotusta. CRY1:n vähentäminen Atg7-puutteisessa maksassa palautti glukoosivastetta osittain ja ajallisesti rajatusti. Siten sama tutkimus yhdistää hajotusreitin, nimettyjen sitoutumiskohtien intervention, kelloproteiinin ja aineenvaihduntatoiminnon. [Artikkeli ja kuvat](https://pmc.ncbi.nlm.nih.gov/articles/PMC6082686/), [DOI](https://doi.org/10.1016/j.cmet.2018.05.023).

**Juste ym. 2021:** erillinen lysosomaalinen reitti, kaitsijaproteiinivälitteinen autofagia eli CMA, säätelee kelloproteiinien ajallista poistamista; kello säätelee puolestaan CMA:ta. LAMP2A-poisto sekä BMAL1:n kohdistusmotiivien mutaatiot paikantavat syysuhteen. Hiirten aktiivisuuskokeissa jatkuvassa pimeydessä oli 9+9 ja jatkuvassa valossa 9+8 eläintä; kudoskokeissa otoskoko oli useissa aikasarjoissa 3/aikapiste. Maksa, munuainen ja sydän erosivat CMA:n vuorokausivaiheessa. Julkaisu tarjoaa myös numeeriset lähdedatat ja proteomiikan. CMA on oma reittinsä, joten sitä ei merkitä Sanninon ATG5/7-makroautofagian identtiseksi mekanismiksi. [Artikkeli](https://doi.org/10.1038/s41556-021-00800-z), [avoin teksti](https://pmc.ncbi.nlm.nih.gov/articles/PMC8688252/), [PXD019704](https://proteomecentral.proteomexchange.org/cgi/GetDataset?ID=PXD019704).

**Mitä tämä vahvistaa.** Nykyisen mallin korjaus- ja ajoitustilat voidaan kytkeä biologisesti perusteltuun palautesilmukkaan. Lamian ja Zhangin jo käytetyt CRY1→glukokortikoidireseptori/cAMP-tulokset antavat tälle myös hormonaalisen ulostulon. Vastehistoria voi siten muuttaa hormonin vaikutusta, vaikka hormonin määrä olisi ennallaan. Tämä on synteesi useista koejärjestelmistä, ei yhdessä altistuskokeessa osoitettu koko ketju.

Yksi eksplisiittinen malliehdotus on

\[
\dot C=q_C(\phi)-[d_{\rm prot}(A)+d_{\rm auto}(R,\phi)]C,
\qquad Y_H=H(t)\,s(C,\phi).
\]

`C` on nimetyn kelloproteiinin määrä, `R` korjaus-/hajotusreitin tila, `A` AMPK:n tila ja `φ` kudoksen vaihe. Proteasomi ja autofagia säilyvät erillisinä poistumistermeinä. Funktiomuodot ja kertoimet ovat mallioletuksia.

**Jäljelle jäävä liitos:** osoitetaanko nimetyn fysikaalisen protokollan jäljiltä samassa solussa autofagian muutos, CRY1:n puoliintumisajan muutos ja hormonaalisen vasteen muutos? Nykyiset tutkimukset tuovat kaksi jälkimmäistä huomattavasti lähemmäksi mitattavaa yhtenäistä reittiä.

## 2. Kalsiumsignaali voi käynnistää tilanvaihdon ennen mitattavaa energiavauriota

**Päättely ennen lähteitä.** Jos `K(S)`-välitteinen alkusignaali rekrytoi ionisignalointia, korjausreitin käynnistyminen ei välttämättä edellytä suuren vaurion syntymistä. Kalsiumlukema ja solun energiatasapaino voivat olla rinnakkaisia reitin valitsimia.

**Hawley ym. 2005** paikansi Ca²⁺→CaMKKβ→AMPK-yhteyden sekä CaMKKβ-siRNA:lla että STO-609-estolla. Rotan aivokuorileikkeiden K⁺-depolarisaatio aktivoi AMPK:ta solun adeniininukleotiditasojen muuttumatta. Tämä on suoraa tukea sille, ettei AMPK-aktivaatio yksin todista energiavajetta. Tässä haussa tarkistettiin primaarijulkaisun abstrakti; tarkkaa otoskokoa ei vahvistettu eikä sille anneta arvoa. [PubMed](https://pubmed.ncbi.nlm.nih.gov/16054095/), [DOI](https://doi.org/10.1016/j.cmet.2005.05.009).

**Høyer-Hansen ym. 2007** osoitti Ca²⁺:ta mobilisoivien käsittelyjen käynnistämän CaMKKβ/AMPK-välitteisen makroautofagian. Mukana olivat Beclin1/ATG7-riippuvuus ja ER:ään paikannetun Bcl-2:n estävä vaikutus kalsiumvarastojen kautta. Tämä täyttää tarvittavaa ionisignaloinnin ja korjauskoneiston välistä aukkoa. Se ei identifioi fysikaalista vastaanotinta. [Primaarijulkaisu](https://doi.org/10.1016/j.molcel.2006.12.009).

**Kim ym. 2011** antaa AMPK→ULK1-välivaiheelle fosforylaatiokohdat ja ajallisia rajoja: hiiren Ulk1:n Ser317/Ser777-fosforylaatiot ilmaantuivat glukoosivajeessa noin 30 minuutissa, olivat voimakkaimmillaan 60–120 minuutissa ja palautuivat glukoosin palauttamisen jälkeen. Ihmiseen ei kopioida Ser777-kohtaa, joka ei ole vastaavasti säilynyt. [Primaarijulkaisu](https://doi.org/10.1038/ncb2152), [avoin teksti](https://pmc.ncbi.nlm.nih.gov/articles/PMC3987946/).

**Park ym. 2023** tekee tästä mallista tarkemman: AMPK saattoi energiavajeessa estää ULK1:n ja autofagian akuuttia käynnistymistä, samalla suojaten koneistoa kaspaasihajotukselta myöhempää palautumista varten. Näyttöön kuuluvat AMPK-puutteet, takaisinlisäykset ja ULK1:n Ser556/Thr660-mutaatiot. Osa estävistä muutoksista ilmeni jo noin 10 minuutissa. HCT116-soluissa käytettiin esimerkiksi 30 minuutin AMPK-aktivointia ja 1–2 tunnin ravinnemanipulaatiota. Lähdedata sisältää kvantifioinnit ja alkuperäiset immunoblotit. [Artikkeli ja lähdedata](https://www.nature.com/articles/s41467-023-38401-z), [avoin teksti](https://pmc.ncbi.nlm.nih.gov/articles/PMC10209092/).

**Vahvin yhteenväite:** Ca²⁺/AMPK-järjestelmä yhdistää ionisignaalin, energiavarannon, autofagian käynnistymisen ja korjauskyvyn säilyttämisen. Etumerkki kuuluu tilariippuvaiseen porttiin:

\[
\dot A=f_{\rm CaMKK}([Ca^{2+}])+f_{\rm energy}(AMP/ATP)-d_A A,
\qquad \dot R=f_R(A,mTOR,ATP,\phi)-d_RR.
\]

Tästä seuraa käyttökelpoinen jatkopäätelmä: sama alkuärsyke voi yhdessä lähtötilassa parantaa myöhemmän haasteen sietoa ja toisessa jättää korjauksen odottamaan energiatilan palautumista. Pelkkä pAMPK tai LC3-pisteiden määrä ei yksin parametrisoisi koko `R`:ää; tarvitaan ULK1:n toiminta ja läpivirtausta mittaava autofagialukema. Tämä tarkennus kasvattaa selitysvoimaa lisäämättä uutta tuntematonta alkusensoria.

## 3. Vastaanottimen gain ja muistiaika voivat muuttua ATP:n ja kumppanisidonnan kautta

**Päättely ennen lähteitä.** Geometrinen syöte voi olla sama kahdella hetkellä, vaikka `K(S)` ei ole. Jos kemiallinen alkutapahtuma muuttaa proteiinin kokoonpanoa ja tämän purkua säätelevät metaboliitit sekä kumppanit, vastaanottimen vasteen voimakkuus ja kesto ovat eri parametreja. Niitä ei tarvitse kuvata yhdellä pysyvällä herkkyyskertoimella.

**Just ym. 2026, vertaisarvioitu:** AtCRY1:n puhdistettu PHR-osa muodosti valossa monomeereistä dimeerejä ja tetramerejä. Dimeerit olivat suurimmillaan noin 3 sekunnissa, tetrameritasanne saavutettiin noin 120 sekunnissa. Kolmen riippumattoman mittauksen kineettinen sovitus osoitti 100 µM ATP:n nopeuttavan dimerisaatiota noin 2× ja tetramerisaatiota 4× sekä hidastavan purkua. BIC1:n `K_D` muuttui pimeän noin 1,2 µM:sta valon noin 0,13 µM:iin. BIC1 purki oligomeerejä estämättä FAD:n fotoreduktiota. TEM-haarassa valoa annettiin 450–465 nm, 115 µmol m⁻² s⁻¹, 20 minuuttia. Parametriarvot ja lisämenetelmät ovat julkaisussa; raakadata ilmoitetaan saatavaksi tekijöiltä pyynnöstä, ei avoimena tietokantana. Kyseessä on kasviproteiini ja optinen koe, ei ihmisen CRY1:n tai RF:n koe. [Artikkeli](https://doi.org/10.1002/anie.202525792), [avoin teksti](https://pmc.ncbi.nlm.nih.gov/articles/PMC13182210/).

**Müller ym. 2014** mittasi AtCRY1:n fotokemiaa eri pH- ja ATP-oloissa. Ilman ATP:tä saanto oli voimakkaasti pH-riippuvainen; ATP muutti reaktioreittiä ja välituotteiden suhteita. 45 µM proteiinin transienttimittauksissa käytettiin 355 nm:n laserpulssia ja 1–2 °C:n lämpötilaa. Metastabiilien flaviiniradikaalien noin 14 %:n kvanttisaanto saavutettiin ATP:n ja Trp-radikaalia pelkistävän reitin tukemana, ei yleiseksi kenttävasteen vahvistuskertoimeksi. [Primaarijulkaisu](https://www.nature.com/articles/srep05175).

**Engelhard ym. 2014** täydensi kuvaa kasvin CRY2:ssa: ATP ja muut adeniinia sisältävät metaboliitit saattoivat tehostaa vaihtoehtoisia elektroninsiirtoreittejä. EPR-haarassa verrattiin muun muassa 10 mM ATP:tä ja ATP:n puuttumista; Tyr399-mutaatiot pienensivät metaboliittivahvistusta ATP-sidonnan säilyessä. Se tukee metaboliittien vaikutusta vastaanottimen reaktioreittiin, ei pelkästään ravinnon ja yleisen terveyden väliseen yhteyteen. [Artikkeli](https://doi.org/10.1105/tpc.114.129809), [avoin teksti](https://pmc.ncbi.nlm.nih.gov/articles/PMC4277212/).

**Merkittävin liitos:** kemiallisen syötteen lukeminen ja biologisen ulostulon välittäminen voivat irtautua toisistaan. Vastaanotin voi edelleen tehdä alkureaktion, vaikka aktiivinen kompleksi puretaan tehokkaammin. Näin heikompi lisävaste ei aina tarkoita heikompaa fysikaalista kytkentää.

Havainnollinen, tuotu massavaikutusmalli on

\[
2M\rightleftarrows D,\qquad 2D\rightleftarrows T,
\quad D=K_1M^2,\quad T=K_2K_1^2M^4,
\quad M+2D+4T=C_{\rm total}.
\]

Neljäs potenssi näyttää, miksi oligomeerin osuus voi muuttua voimakkaasti aktiivisten monomeerien saatavuuden mukana. Säilymislaki rajoittaa kasvua; tämä ei ole ääretön vahvistin eikä mitattu BERM-annosvaste. ATP voi muuttaa `K₁`/`K₂`:ta ja purkua eri suuntiin. ATP:n sitoutuminen näissä Cry-kokeissa on kofaktorivaikutus: niissä ei osoiteta, että ATP-hydrolyysi maksaa vahvistuksen energian. Solun energiavirta ja vastaanottimen ATP-sidos on pidettävä erillisinä muuttujina.

## 4. Cry4a:n ulostulon aukko tarkentuu kudoskohtaiseksi sitoutumis- ja aktivaatio-ongelmaksi

**Päättely ennen lähteitä.** Konformaation muutos vaikuttaa soluun vain, jos oikea kumppani on samassa solussa, oikeassa osastossa ja käytettävissä. Siksi `K(S)`-ajattelu tarvitsee myös paikallisen stoikiometrian: sitoutumiskumppanien määrä voi rajata ulostuloa jo ennen ionikanavaa tai hormonireittiä.

Nykyrekisterin **Görtemaker 2022** osoittaa Cry4a–Gtα-vuorovaikutuksen SPR:llä, pull-downilla ja solujen FRET:llä. Myristoyloidun Gtα/Giα-kimeeran näennäinen `K_D` oli 0,29 ± 0,08 µM, n=3; kokeen kaksivaiheinen sitoutumismalli on `A+B↔AB↔AB*`. Funktionaalisen G-proteiinivalmisteen kontrolli ei ole sama asia kuin Cry4a:n käynnistämä G-proteiiniaktivaatio. [Artikkeli](https://doi.org/10.3390/cells11132043), [avoin teksti](https://pmc.ncbi.nlm.nih.gov/articles/PMC9265643/).

Nykyrekisterin **Yee 2023** kuuluu LWO-opsiini–Gtα-haaraan. Molempien käyttäminen samassa synteesissä perustelee kilpailullisen saatavuusoperaattorin, mutta ei tarkoita, että Cry4a→Gtα→ionivaste olisi mitattu. [Artikkeli](https://doi.org/10.3389/fnmol.2023.1107025).

Uusi **kesäkuun 2026 esijulkaisu** kartoittaa punarinnan verkkokalvon transduksiinialayksiköitä yksisolutranskriptomiikalla, immunohistokemialla ja vuorovaikutuskokeilla. GNGT2 oli keskeinen tappisolujen γ-isoformi ja GNG11 liittyi sauvasoluihin; aiemmin ehdotettua GNG10:tä ei havaittu kummassakaan valoreseptorityypissä. In vitro mahdollinen sitoutuminen ja oikeassa kudoksessa mahdollinen signaalireitti ovat siten eri rajauksia. Tuloksesta saa täsmällisemmän ehdokasketjun valitsemalla todella yhteisilmentyvät alayksiköt. Säilytä esijulkaisustatus; tässä tarkistuksessa ei vahvistettu raakadatatalletusta tai lopullista vertaisarvioitua versiota. [Esijulkaisu: Expression patterns and interaction profiles of heterotrimeric transducin subunits in the retina of the European robin](https://www.biorxiv.org/content/10.64898/2026.06.29.735184v1.full).

Käyttökelpoinen ehdollinen tilayhtälö olisi

\[
\dot B_C=k_{on,C}(redox,conf)C_{free}G_{free}-k_{off,C}B_C,
\quad G_{total}=G_{free}+B_C+B_{opsin}+\cdots.
\]

Tämä auttaa yhdistämään Kishin redox-/konformaatiotilan sitoutumiskokeisiin ja opsiinikilpailuun. **Avoimiksi jäävät juuri Cry4a:n redox-tilakohtaiset sitoutumisnopeudet, GDP/GTP-vaihdon käynnistyminen sekä magneettisen manipulaation muuttama solun sähköinen vaste.** Niitä ei täytetä kasvien BIC1-parametreilla. Kasvitulos osoittaa mahdollisen vastaanotinperiaatteen; linnut tarvitsevat oman mitatun realisaationsa.

## Mitä nykyisestä evidenssistä voi päätellä varmemmin

1. **Biologinen muisti ei tarvitse pitkäikäistä spin-koherenssia.** Lyhyt valintavaihe voi päätyä hitaasti purkautuvaan kemialliseen populaatioon, kompleksiin tai proteiinimäärän muutokseen. Malliin tarvitaan erilliset ajat alkureaktiolle, aktiiviselle kompleksille ja proteostaattiselle palautumiselle.
2. **Korjaus ja hormonivaste voivat muuttua samaan aikaan eri suuntiin.** Ehdollisessa yhdistelmässä pienempi DNA-vaurio voi esiintyä samanaikaisesti muuttuneen CRY1-välitteisen hormonaalisen lukeman kanssa. Yhden vauriomittarin palautuminen ei parametrisoisi koko biologista tilaa.
3. **Sama fysiologinen lopputulos voi syntyä eri kohdassa reittiä.** Heikko ulostulo voi johtua pienestä alkusaannosta, nopeasta kompleksin purusta, kilpailevasta sidonnasta tai vahvasta korjauskapasiteetista. Nykyinen tilamalli voi erottaa nämä ilman uutta yleistä vahinkokerrointa.
4. **Ravinto-/metaboliittitila kuuluu myös vastaanotto-operaattoriin.** ATP:n, FAD:n ja proteiinikumppanien merkitys ei rajaudu vaurioiden korjaamiseen jälkikäteen. Alatyyppi ja koeolosuhde määräävät, mitä tästä saa siirtää toiseen kudokseen.
5. **Toistoväli ja vuorokausivaihe ovat mekanistisia yhteismuuttujia.** Jos proteiinin poistumisnopeus on vuorokausivaiheesta riippuva, sama pulssisarja voi tuottaa erilaisen tilakertymän eri vaiheessa. Tämä seuraa nykyisestä palautumismallista, kun vakio-`τ` korvataan nimetyllä `τ(S,φ)`:llä; sen numeerinen soveltaminen tiettyyn fysikaaliseen protokollaan vaatii kalibroinnin.

## Ensisijainen olemassa olevan datan jatkokäyttö

| Aineisto | Mitä voi estimoida ilman uutta altistuskoetta | Mitä siitä ei saa päätellä |
|---|---|---|
| Just 2026, kuvat 1–4 ja lisämenetelmät | Kaksivaiheisen kompleksimallin rakenne, ATP-tilojen suhteelliset nopeudet, kumppanin affiniteetti ja purku | Ihmisen CRY:n RF-herkkyys tai avoimen L2-operaattorin vahvuus |
| Juste 2021, julkaisun source data ja PXD019704 | Kudoskohtaiset hajotuksen vaiheet, kello–proteostaasisilmukan viiveet ja amplitudit | Sanninon makroautofagian parametrien korvaaminen CMA-parametreilla |
| Toledo 2018, kuvat ja lisäaineisto | CRY1:n selektiivisen hajotusportin ajallinen ikkuna ja yhteys hormonaaliseen/metaboliseen lukemaan | 13 päivän geenipoistointervention tulkitseminen 13 päivän altistusmuistiksi |
| Park 2023, source data | AMPK/ULK1:n vasteen suunta eri energia- ja ravinneoloissa; koneiston säilymisen erottaminen aktiivisesta virtauksesta | Yhden yleisen positiivisen AMPK→autofagia-kertoimen sopivuus kaikkiin oloihin |
| Görtemaker 2022 ja uudet kudosilmentymät | Kimeerisen G-proteiinivalmisteen sitoutumisrajat sekä kandidaatin kudoskohtainen saatavuus | Sitoutumisen nimeäminen osoitetuksi Cry4a:n laukaisemaksi G-proteiiniaktivaatioksi |

Painavin lisäys mallin selitysvoimaan olisi siten nimetä ja yhdistää **vastaanoton kemia → kompleksin elinaika → korjaus/proteostaasi → kelloproteiinit → seuraavan ärsykkeen reseptiivisyys**. Komponenttien olemassaolosta on paljon vahvempaa näyttöä kuin nykyinen sivuston yhteinen esitystapa tuo esiin. Koko ketjun fysikaalinen alku, alatyyppien väliset siirrot ja tiettyjen ympäristöprotokollien vaikutussuuruudet säilyvät täsmällisinä avoimina liitoksina. Nämä biologiset tutkimukset sopivat myös standardifysiikan ja -biologian selityksiin; ne vahvistavat BERM:n ehdollisen biologisen toteutuksen osia, eivät yksin erottele Lindgrenin geometriaa muista fysikaalisista lähtökohdista.
