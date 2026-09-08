# Fysiikan, mallin ja mittausten kuvitustarpeet

Tarkastettu julkaistu snapshot **8fd36d03e0cf2aab4700613a8151cb1bdec9b255**, hakemisto `/Volumes/kovalevy 3/berm-release-worktrees/atlas-calibration-20260908`. Read-only-lähdekoodiauditointi; selaimen ulkoasua ei arvioitu eikä yhteistä browser-runtimea käytetty. Sivustoon ei tehty muutoksia.

## Esityksen perusta ja jo olemassa olevat kuvat

Nykyisen vuoden 2025 premissin `g = η + κ A⊗A` ja jaon `A = A_b + a` mukaan `Δg = κ(A_b⊗a + a⊗A_b + a⊗a)`. Tämä on kuvien geometrinen lähtökohta. Sitä seuraava kudoksen havaittava vaatii BERM:n ehdollisen vasteoperaattorin `δ<O_i> = ∫Ξ_i δg`. Geometrinen seuraus, BERM:n ehdollinen L2, tuodut biologiset toteutukset sekä avoimet gauge-, mittakaava- ja kudoskalibroinnit on erotettava myös kuvan sisällä. Kuvituksen ei tarvitse tehdä uutta teoriavalintaa.

- `/physics` on johdonmukainen viiden osan teksti- ja kaavasivu, jossa ei tällä hetkellä ole varsinaista selittävää kuvaa. Section-ID:t ovat `premise`, `cross-terms`, `receiver`, `structure` ja `measurement`. Toteutus: `website/app/[locale]/physics/page.tsx:84–89`.
- `/model#causal-diagram` sisältää **uuden BermCausalDiagramin**: solmukohtaiset dialogit, yhteyksien korostuksen, tasoryhmät, kaikkien yhteyksien luettelon ja steroidogeneesihaaran valinnan. Sitä ei pidä korvata toisella koko mallin ketjukuvalla. Toteutus: `website/components/BermCausalDiagram.tsx:94–174`, sijoitus `website/app/[locale]/model/page.tsx:5296–5320`.
- `/measurement/fieldstate#causal-diagram` käyttää edelleen eri komponenttia **CausalChainDiagram** ja `getFieldStateCausalGraph`-aineistoa, ei uutta BermCausalDiagramia. Se tarjoaa jo yksityiskohtaisen mittaushaaran solmukartan. Toteutus: `website/app/[locale]/measurement/fieldstate/page.tsx:323–330`, `website/components/CausalChainDiagram.tsx:292–326`.
- `/model#two-susceptibility-functions` sisältää **TwoSusceptibilities**-SVG:n: vasemmalla laskettu χ_geo-käyrä, oikealla käsin määritelty Gaussin muotoinen spin-esimerkki. Koordinaatin rajoitukset on sanoitettu, mutta oikean käyrän muoto ei ole tutkimuksesta estimoitu kudosydin. Nykyinen kuva käyttää 7,5–10 px SVG-tekstejä ja 560 px vähimmäisleveyttä. Toteutus: `website/components/TwoSusceptibilities.tsx:98–165` ja akselit `:188–244`.
- `/model#signal-structure` sisältää **FieldSignalStructure**-komponentin: tuloskortteja, kaavoja, ikkunapisteiden taulukon ja sanamuotorekisterin, ei aikataso–spektri-havainnekuvaa. Toteutus `website/components/FieldSignalStructure.tsx:96–130`, sijoitus `website/app/[locale]/model/page.tsx:5059`.
- `/model/frequency-weights` sisältää jo **FrequencyWeightsExplorerin** (kolmen ehdokastekijän liukusäätimet ja tulopalkit), `/model/q-factor` **QFactorSpectrumin**, `/model/dual-kernel` **DkcExplorerin**. Näihin ei tarvita rinnakkaista yleistä paino- tai palautumiskuvaajaa.
- **SourceGeometry-nimistä komponenttia tai vastaavaa nimeä ei löytynyt** snapshotin `website`-koodista. NaturalEMVisualization kuvaa luonnonympäristön kerroksia mutta ei paikallista lähde–mittapää–kudosgeometriaa.

## 1. Tensorin ristiosat näkyviksi

**P1 · `/fi/physics#cross-terms` — ”Tausta ja ulkoinen syöte”.** Kaavan jälkeinen paikka; sama kuvatoteutus voidaan linkittää tensorijohdon kohtaan ”Perturbaatio ja tilavuusherkkyys” (`model/tensor-derivation/page.tsx:86–104`, tällä osalla ei ole omaa ID:tä).

**Nykytila:** täsmällinen tensorikaava ja sitä selittävä kappale; myöhemmässä `#structure`-osassa kaksi suunnanvaihtoidentiteettiä. Lukijan pitää itse kuvitella ulkotulo, ristiosat ja skalaariprojektio.

**Selitettävä suhde:** sama uusi komponentti tuottaa eri tensorimuutoksen eri taustassa; kahden ristiosan merkki vaihtuu `a→−a`, mutta `a⊗a` säilyy. Tämä ei vielä ole kudosvasteen merkki.

**Kuvan elementit:** kaksi normalisoitua 2D-spatiaalista nuolta `A_b` ja `a`; vieressä kolme erikseen nimettyä pientä matriisia `A_b⊗a`, `a⊗A_b`, `a⊗a` sekä niiden summa. Suunnanvaihtopainike ja rajattu kulmasäädin. Valinnainen yksittäinen projektioakseli `e`, jolloin näytetään vasta erillisessä rivissä `G=eᵀΔg e`. Sama väri seuraa termiä kaavasta matriisiin.

**Muoto:** vuorovaikutteinen SVG/HTML, mobiilissa nuolikuva → matriisit → projektio. Perustila toimii myös staattisena. Kuvan sisäinen merkintä ”valittu dimensioton spatiaaliprojektio”; ei yleiseksi Lorentzin neligeometriaksi tulkittavaa 2D-kuvaa, ei µT/V/m-asteikkoa eikä biologista tehomittaria. Ensisijainen kuva fysiikkasivulle.

## 2. Mitä vastaanotto-operaattori tekee ajassa

**P1 · `/fi/physics#receiver` — ”Vastaanotto-operaattori”.** Kaavan ja ”Eksplisiittinen kytkentäpremissi” -laatikon väliin. Tarkempi uudelleenkäyttö `/fi/model/math#l2-response` (`MathematicsSections.tsx:2348–2415`).

**Nykytila:** integraalikaava, sanallinen vastaanottajantila ja pitkä formaali johto. Atlas näyttää jo G/U/C-aikasarjat; se ei näytä yleisen kudosytimen toimintaa paikallisen syötteen suodattimena.

**Selitettävä suhde:** saman häiriön vaikutus riippuu valitusta havaittavasta, menneestä syötteestä sekä vastaanottimen tilasta. Lyhyt pulssi, viivästynyt vaste ja palautuminen ovat eri asioita.

**Kuvan elementit:** kolme yhteisellä aika-akselilla olevaa rataa: valittu skalaariprojektio syötteestä, nimetty esimerkkikernel `K(τ;S)`, konvoluution tulos. Kaksi rinnakkaista vastaanotintilaa käyttää samaa syötettä ja eri selvästi oletettuja kerneleitä; varjostettu historiaikkuna näyttää mitä vuosikohdistin/hetkikohdistin lukee. Mukaan viive ja palautumisaika, ei keksittyä biologista annoskynnystä.

**Muoto:** pieni interaktiivinen kaavio, jossa ”esimerkkikernel A/B” ja ”pysäytä” toimivat natiiveina ohjaimina. Ei automaattisesti liikkuvaa soluanimaatiota. ”BERM:n ehdollinen L2” näkyy suodattimen yläpuolella; komponenttikokeet voidaan linkittää vastaanotintilan selitteeseen L3-tukena, ei kerneliarvojen kalibrointina.

## 3. Mittauksen ja syyn suunta

**P1 · `/fi/physics#measurement` — ”Kentästä havaintoon”.** Lyhyt johdantokuva; FieldState-sivulla samaan kuvaan voidaan linkittää ennen nykyistä laajaa `#causal-diagram`-kaaviota.

**Nykytila:** ero selitetään fysiikkasivun yhdessä kappaleessa. FieldState-sivulla on jo suuri solmukartta, mutta mittauksesta estimointiin kulkeva nuoli ja fysikaalisen syyn nuoli on helppo sekoittaa.

**Selitettävä suhde:** fysikaalinen tila tuottaa mittaustietueen ja ehdollisen biologisen vasteen; mittaustietueesta päätellään fysikaalista tilaa. Mittari tai havaintotiedosto ei synnytä biologista vaikutusta.

**Kuvan elementit:** ylhäällä ”paikallinen fysikaalinen tila”; siitä erilliset alasnuolet ”mittalaite → tietue + epävarmuus” ja ”BERM:n L2 + vastaanottajantila → havaittava”. Mittaustietueesta fysikaaliseen tilaan palaava erinäköinen katkoviiva nimellä ”estimointi”. Teknologian käyttöönottotieto sivuun omaksi aikarajaus/proxy-syötteeksi. Toimintojen nimet nuoliin, ei vain värejä.

**Muoto:** kompakti staattinen SVG tai HTML-kaavio. Yksi selkeä symboli mittalaitteelle riittää. Ei uutta kokonaista biologia–käyttäytyminen–TFR-ketjua; nykyiset kausaalikaaviot hoitavat jatkon. Tämä antaa lukijalle tulkinta-avaimen kaikkiin aineistonäkymiin.

## 4. Sama RMS, eri pulssi ja verhokäyrä

**P1 · `/fi/measurement/fieldstate#pulse-structure` — ”Pulssirakenne on biologisesti relevantti”.** Nykyisten kappaleiden väliin (`measurement/fieldstate/page.tsx:304–309`). Toissijainen käyttö `/fi/about/measurement`, osio ”2. Kerää dokumentoitu fysikaalinen FieldState”; siellä ei nyt ole osion ID:tä (`about/measurement/page.tsx:93–103,321–337`).

**Nykytila:** huippu, pulssikesto, toistotaajuus ja käyttösuhde ovat tekstissä. FieldSignalStructure tarjoaa tulokset taulukkomuodossa; FrequencyWeightsExplorer säätää ehdokaskertoimia, ei näytä signaalia.

**Selitettävä suhde:** yksi RMS-luku ei määritä aikarakennetta, verhokäyräspektriä eikä kudosvastetta. Verhokäyrän hidas taajuus ei myöskään tee RF-signaalista suoraan matalataajuisella mittarilla havaittavaa.

**Kuvan elementit:** kaksi yhtä pitkää idealisoitua signaalijaksoa samalla RMS-arvolla: jatkuva ja pulssitettu. Merkitään RMS, huippu, pulssikesto ja duty cycle. Aikakuvan alla erotetaan kantoaaltokaista ja siitä pätevästi määritetty verhokäyrä; molemmilla omat vaaka-akselit. Vaihtoehtoiset vastaanottoikkunat vain oletuksina, ei nimetyn reseptorin todettuina ikkunoina. Pulssisäätö päivittää huipun samassa RMS-normalisoinnissa.

**Muoto:** interaktiivinen signaalikuvaaja ja staattinen lähtönäkymä. Lukijalle ”havainnollistava synteettinen signaali”; yksiköttömät esimerkkiarvot. Mittauskaista ennen hidasta näytteistystä näkyviin, jottei kuva opeta RF-alinäytteistystä tai PLC:n mittaamista väärällä RF-anturilla.

## 5. Lähde, mittapää ja kudos ovat eri paikoissa

**P2 · `/fi/measurement/fieldstate#fieldstate-input` — ”FieldState mittaa BERM:n valinnaista syötettä”.** Heti kenttätietueen kuvauksen jälkeen (`measurement/fieldstate/page.tsx:297–303`); matemaattinen vastinpari `/fi/measurement/fieldstate/math#field-record`.

**Nykytila:** lähde-, ambient- ja henkilökohtaiset komponentit sekä asento-/geometriakohtainen elinsiirto on lueteltu. Matematiikkasivulla on `Â_o,k=T_o,k A_k` (`measurement/fieldstate/math/page.tsx:33–36`). Paikallista geometriaa esittävää kuvaa ei ole.

**Selitettävä suhde:** lähteen laiteluokka, mittapään paikallinen havainto ja elimen paikallinen fysikaalinen syöte ovat eri havaintotasoja. Mittapään sijainti/asento ja taajuusriippuvainen siirto estävät niiden suoran samaistamisen.

**Kuvan elementit:** yksinkertainen huoneen/leikkaustilan piirros: yksi lähde, etäisyys, mittapää mittaussuuntineen ja vartalosiluetti kahdessa asennossa. Yksi paikallinen kohdealue kehossa. Mittapään kohdalla E/B-havaintotietue, kohdealueelle menevä nuoli `T_o(f; asento, geometria)` ja erillinen ”mitattu / laskennallisesti estimoitu” tunniste. RF- ja ELF-esimerkit vaihtoehtoisina, eivät yhteisenä säteilyhalona. Potentiaalin normalisointi/gauge jää erilliseen liitoskohtaan.

**Muoto:** selittävä vektoripiirros; korkeintaan kahden asennon vaihto. Ei värillistä kudosannoskarttaa ilman oikeaa dosimetria-aineistoa. Voidaan myöhemmin tehdä yhteiseksi SourceGeometry-komponentiksi, mutta snapshotissa sellaista ei ole.

## 6. χ_geo: mitä rajattu koordinaatti näyttää

**P2 · `/fi/model/math#chi` — ”Normalisoitu käänteisen metriikan koordinaatti χ_geo(ρ)”.** Johdon lopun erottelukaavan yhteyteen (`MathematicsSections.tsx:2295–2344`). Samalla nykyisen `/fi/model#two-susceptibility-functions`-kuvan tarkennus; uutta toistavaa käyräparia ei tarvita.

**Nykytila:** algebra johtaa χ_geo²:n rank-one-korjauksen kertoimeksi; erillinen TwoSusceptibilities näyttää χ_geo-käyrän ja käsin valitun biologisen esimerkkikäyrän rinnakkain. Pelkkä samantapainen kuvaesitystapa voi näyttää ne yhtä valmiilta määrällisiltä vastelailta.

**Selitettävä suhde:** rajoitetun positiivinormisen, dimensiottoman spatiaalikoordinaatin kaava on geometrinen tulos. Mitatun E/B:n liittäminen koordinaattiin ja koordinaatin yhdistäminen kudosvasteeseen ovat eri, avoimia identifikaatioita. Käyrän tasaantuminen ei osoita kudoksen kyllästymistä.

**Kuvan elementit:** olemassa oleva χ_geo(ρ)-käyrä säilyy, ja sen vieressä korostetaan rank-one-korjauksen suunnattua osaa sekä kerrointa χ_geo². Sen alapuolella kaksi erillistä rajakohtaa: mittaustietue → normalisointi/projektio → ρ; geometria → ehdollinen Ξ_i → havaittava. Biologinen toteutusehdokas omana laatikkonaan. Mahdollinen nykyinen spin-käyrä on nimettävä esimerkkimuodoksi; siitä ei tehdä empiiristä kontrollikäyrää.

**Muoto:** nykyisen kuvan selittävä uudelleenasettelu ja yksi ρ-säädin, ei kosmista avaruusruudukkoa tai fotorealistista soluvaikutusta. Tekstit vähintään noin 12 px, paneelit allekkain puhelimessa. L1-kaavan ja L2-koordinaattivalinnan merkinnät erilleen.

## 7. Staattinen rajapinta ja purkautuminen

**P2 · `/fi/measurement/fieldstate#static-interface` — ”Staattinen triboelektrinen rajapinta: natiivi paikallisfysiikan haara”.** Tekstin jälkeen (`measurement/fieldstate/page.tsx:311–321`), uudelleenkäyttö `/fi/measurement/fieldstate/math#static-interface`.

**Nykytila:** materiaali–iho-/eliörajapinta, ilmarako, kosteus, maareferenssi sekä `Q,V,E,∇E²,dE/dt,τ` ovat teksti- ja kaavamuodossa. Tälle fysiikalle ei ole omaa kuvaa.

**Selitettävä suhde:** potentiaaliero tarvitsee nimetyn referenssin; sama jännitelukema ei yksin määrää varausta tai paikalliskenttää. Kontakti/liike tuottaa varausta ja vuotoreitti muuttaa purkautumista. Tämä ei ole RF-kantoaalto eikä automaattinen kudos-/populaatiovaste.

**Kuvan elementit:** poikkileikkaus materiaalista, ilmarako, iho/eliöpinta, +/−-varaussymbolit, mittapää sekä nimetty keho-/maareferenssi. Vuotoreitti ja kapasitanssi erotetaan fyysisistä kohteista pienessä vastinpiirissä. Vieressä Q(t)- tai V(t)-purkautumiskäyrä: mitattu käyrä vasta oikealla aineistolla; toistaiseksi erikseen merkitty `τ≈RC`-vertailuesimerkki. ”Kuiva / kostea” voi vaihtaa vuotoreittiä laadullisesti, ei keksiä biologisia vaikutuskertoimia.

**Muoto:** staattinen leikkauspiirros + pieni purkautumiskaavio. Ainoa tämän ryhmän kuva, jossa aineellisen rajapinnan huolellinen kuvitus auttaa enemmän kuin matriisikuva. Yhteys ekologiseen kontaktihaaraan linkkinä; samoja mittayksiköitä ei venytetä eläinkannan vaikutusarvioiksi.

## Toteutusjärjestys ja vältettävä päällekkäisyys

Aloita 1, 3 ja 4: ne selventävät tensorirakennetta, päättelyn suuntaa ja kenttätietueen olennaista informaatiota ilman uutta biologista oletusta. Seuraavaksi 2, sitten 5–7. Yksi komponentti yhdelle selitettävälle suhteelle; fysiikan lyhyt johdanto ja mallin pitkä formaali esitys voivat käyttää samaa kuvaa eri tarkkuudella.

Näille seitsemälle tarpeelle oikea muoto on laskettava tai käsin määritelty SVG/HTML, ei geneerinen AI-taustakuva. Kuvan väri kertoo tietolajin, ei vaaran astetta. Avoimia kalibrointeja kuvaavat nimetyt rajat ja katkoviivat, ei yleinen epätietoisuuden sumu. Lukuarvoja tuodaan vain laskettuun geometriseen esimerkkiin tai oikein lähteistettyyn mittausesimerkkiin. Kausaalikaavion uutta kokoversiota, toista χ-käyräparia, toista teknologiahistoriakarttaa tai koristeellista ”sähkömagneettisesti hohtavaa ihmistä” ei tarvita.

Ennen uudelleenkäyttöä `/evidence/superposition`-sivulla tarvitaan erillinen tekstirajaus: sen nykyiset lauseet lähteiden lukumäärään skaalautuvasta vuorovaikutuksesta ja universaalisti suuremmasta yhdistelmävasteesta eivät seuraa edellä kuvattavasta tensorialgebrasta. Näitä lauseita ei pidä muuttaa kuvan visuaalisiksi oletuksiksi. Tämä havainto rajaa kuvitusta; se ei ole tässä tehtävässä tehty sisältömuutos tai uusi kirjallisuusarvio.
