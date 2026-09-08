# E-pillerit × EMF: alkuperäislähteiden auditointi ja ehdollinen komponenttisynteesi

8.9.2026. Valmis rajattu lähdepaketti ja strategisen haun loki. Kanonisia rekisterejä tai sivustokoodia ei muutettu.

## Johdon lähtökohta

Nykytehtävän Lindgren-gate ja sen tensorijohdanto on luettu tiedostosta DERIVATION.md. Geometrinen ristiosa ei määrää biologisen yhteisvaikutuksen merkkiä. `r_i = Xi_i[S_i(history)](delta_g)` on ehdollinen BERM L2; lääke muuttaa vastaanottajan tilaa, ei ole kentän kanssa samassa yksikössä summattava syöte. Alla oleva L3/L4-näyttö tukee omia biologisia liitoksiaan eikä siirry geometrisen oletuksen validoinniksi.

## Heti toteutuksessa käytettävät korjaukset

- **PNAS2008 on Sarkar, ei Bhargava.** Tutkimus käyttää 17β-estradiolia ja osoittaa kanavapotentiaatiota myös 10 pM:ssa. Se ei ole etinyyliestradioli- tai COC-koe eikä osoita pillerien pitoisuuksia haitallisen korkean alueen pitoisuuksiksi. ID `sarkar2008_estrogen_channels`.
- **GnRH-tutkimus on Sun, Chu & Moenter 2010, ei Bhatt2009.** Aiempi hormonitausta ja vuorokaudenaika sekä nopea kylpyannos ovat erilliset käsittelyt. ID `sun2010_gnrh_calcium`.
- **Ru3602023:n suunta on käännetty liitteessä.** MCU-estäjä lisäsi RF:n yhteydessä DNA-vauriota. Tämä on vahva suora farmakologinen vastaanottotila × kenttä -ankkuri; ei salpaajan osoittama RF-suoja. ID `sun2023_ru360_rf_damage`.
- **De Groote2009 ≠ Pincemail2007.** Nuorten EE+drospirenoni-vertailu on De Groote ym. ID `degroote2009_contraceptive_redox`; kyse on käyttäjien ja verrokkien poikkileikkausvertailusta.
- **Panzer2006 koskee seksuaalioireista valikoitunutta klinikkaotosta.** SHBG laski käytön loputtua mutta pysyi never-user-ryhmää korkeampana noin 196 päivän myöhäisvertailussa. Pysyvä yleinen vaurio tai koko väestön palautumattomuus ei ole tutkimustulos. ID `panzer2006_shbg`.
- **Palautumiseen on suuri prospektiivinen aineisto.** Yland2020: 17 954 osallistujaa, pillereiden jälkeen lyhyt alkuviive mutta ei pitkäaikaisen käytön pysyvää hedelmällisyyshaittaa. Mallin jatkuvan ympäristötaustan mahdollisuus ja havaittu palautuminen on esitettävä yhtä aikaa. ID `yland2020_return_fertility`.
- **Liitteen PMC4985520 on väärä julkaisu.** Se on Wenderleinin rintasyövän hoitoa koskeva kirje, ei Molecular Neurobiology -kalsiumkatsaus. https://pmc.ncbi.nlm.nih.gov/articles/PMC4985520/ . Tämän viitteen COC-suprafysiologinen haittapäätelmä poistetaan.

## Vahvin yhdistävä argumentti

Hormoni muuttaa kalsiumkanavan toimintaa ja HPG-järjestelmän ajallista vastaanottoa; erillisessä suorassa RF×MCU-kokeessa saman fysikaalisen protokollan vaste muuttuu mitokondrion Ca-käsittelyä muuttamalla. Nämä paikantavat yhteisen vastaanottotilan ehdollisen mallin: kenttävasteen ei tarvitse olla lääke- ja hormonitaustasta riippumaton. EE+drospirenonin redox- ja COC:n SHBG-havainnot antavat mitattavia tilamuuttujia tämän mallin biologiseen osaan. Juuri näiden COC-tilojen RF-vasteen merkki ja suuruus ovat koottu ehdollinen päätelmä, eivät osatutkimusten suora yhteistulos.

SHBG-tuotantoa ja gonadista testosteronituottoa ei käsitellä samaa yksikköä olevina vaikutuksina. Sitoutumistasapaino riippuu kokonais-T:stä, SHBG:stä, albumiinista ja affiniteeteista; vapaa pitoisuus ei ole hormonin tuotantonopeus. Liitteen 40 ng/dl on naisvapaan testosteronin esimerkin virheellinen mittakaava ja −20 % EMF-oletus kalibroimaton. Parempi on symbolinen saatavuusoperaattori ilman keksittyä kliinistä numerokorttia.

## Ensimmäinen lähdetaulukko

Yksityiskohtaiset metadata-, löydös- ja scope-kentät: pharma_references.json. Sarkar ja Sun2010 tarkistettu alkuperäiskokoteksteistä; De Groote ja Panzer alkuperäisjulkaisun abstraktista (De Grootesta myös yliopistokopio); Yland alkuperäiskokotekstistä. Sun2023:n SAR ja Ru360-pitoisuus eivät näy varmennetussa alkuperäisabstraktissa, eikä niitä täytetä toissijaisesta muistista.

## Täydentävä auditointi: lähteiden oikeat identiteetit

| Liitteen nimike | Varmennettu julkaisu ja käyttö |
|---|---|
| Bhargava2008, PNAS | **Sarkar2008**, `sarkar2008_estrogen_channels`, [10.1073/pnas.0802379105](https://doi.org/10.1073/pnas.0802379105). Kanavapotentiaatio on suora tulos; koko COC-formulaation herkistävä vaikutus on erillinen päätelmä. |
| Bhatt2009, GnRH | **Sun, Chu & Moenter2010**, `sun2010_gnrh_calcium`, [10.1523/JNEUROSCI.6256-09.2010](https://doi.org/10.1523/JNEUROSCI.6256-09.2010). Estradiolitausta vähensi HVA-virtaa aamulla ja lisäsi iltapäivällä; nopea kylpyannos lisäsi virtaa. Tämä on erityisen vahva biologisen historian ja ajoituksen ankkuri. |
| Sun, prolonged EE | **Bowling1997**, `bowling1997_ethinyl_calcium`, [alkuperäisabstrakti](https://pubmed.ncbi.nlm.nih.gov/9103500/). EE 0,1 mg/kg/vrk 35 päivää; kanavasitoutumispaikkojen lisääntyminen ei lisännyt tutkittuja hemodynaamisia agonistivasteita. |
| Pincemail2007, 18–35-vuotiaat, EE+drospirenoni | **De Groote2009**, yllä. Todellinen **Pincemail2007** on [10.1093/humrep/dem146](https://doi.org/10.1093/humrep/dem146): ELAN-otoksen 209 iältään 40–48-vuotiasta naista, 49 OC-, 119 ei-ehkäisy- ja 41 IUD-käyttäjää. OC-ryhmän lipidiperoksidit olivat korkeammat; kaikki antioksidantit tai hapettunut LDL eivät muuttuneet. Näitä ei yhdistetä yhdeksi otokseksi. |
| Chen2017, JOCMR9(11):945 | **Chen & Kotani2018**, julkaistu verkossa joulukuussa2017, 10(2):146–153; `chen2018_contraceptive_redox`, [10.14740/jocmr3307w](https://doi.org/10.14740/jocmr3307w). Hoitovaihtoseuranta tuo ajallista tietoa, mutta ei ole satunnaistettu koe. |
| Yakubu2021, RF+ROS, SAR0,174–0,638 | Sitaatti jäljittyy **Schuermann & Mevissen2021 -katsaukseen**, [10.3390/ijms22073772](https://doi.org/10.3390/ijms22073772). Siinä yhteisaltistusviitteet ovat Luukkonen2009 ja Kang2014. SAR-väli kuuluu erilliseen Alkis2019-rotan kuuden kuukauden RF-tutkimukseen ([10.1080/15368378.2019.1567526](https://doi.org/10.1080/15368378.2019.1567526)), ei näihin kemikaali×RF-kokeisiin. Yakubu-nimistä väitettyä primääriä ei tässä haussa tunnistettu. |
| Ru3602023, J Cell Biochem, estäävaurion | **Sun2023**, `sun2023_ru360_rf_damage`, [10.1016/j.ecoenv.2023.115472](https://doi.org/10.1016/j.ecoenv.2023.115472). Oikea lehti on Ecotoxicology and Environmental Safety; vaurion suunta on lisäys MCU-eston yhteydessä. |
| PMC2025, käytön kesto ja mikrobiomi | **Paul, York & Alcazar2025**, `paul2025_coc_duration_preprint`, [10.1101/2025.09.09.675238](https://doi.org/10.1101/2025.09.09.675238). Auditoitu PMC-versio on bioRxiv-esijulkaisu ja Terrazas2025:n aineiston uusinta-analyysi. PMC-tallennus ei tarkoita vertaisarviointia. |

### ROS-yhteisaltistuksen tarkka käyttö

[Luukkonen2009](https://pubmed.ncbi.nlm.nih.gov/19135463/) mittasi ihmisen SH-SY5Y-solujen ROS:ia ja comet-vauriota: 872 MHz, 5 W/kg, yksi tunti, CW tai GSM sekä menadionihaaste. CW+menadioni lisäsi vauriota suhteessa pelkkään menadioniin; ROS oli suurempi 30 ja60 minuutin kohdalla. GSM-haara ei antanut samaa tulosta. Tämä tukee **nimettyä kemiallinen tila × RF-protokolla -yhteisvaikutusta**.

[Kang2014](https://pmc.ncbi.nlm.nih.gov/articles/PMC3951078/) testasi 837 MHz CDMA +1950 MHz WCDMA, kumpikin2 W/kg, kahden tunnin altistuksella ja kuudella riippumattomalla koetoistolla. H2O2-haasteessa 100µM ja menadionissa100µM PC12-/200µM SH-SY5Y-soluille ei tullut johdonmukaista tai jatkuvaa ROS-lisää. Yksittäiset lyhyet erot eivät vastaa artikkelin yleistä synergialöydöstä. Lähin nollaehto rajaa mallin signaali-, solu- ja aikariippuvuutta; se ei kumoa eri protokollassa mitattua yhteisvaikutusta.

Sun2023 paikantaa eri ehdon: MCU-estolla muutettu vastaanottotila lisäsi 15 minuutin1800MHz-altistuksen DNA-/apoptoosivastetta. **“Puskurin vähentäminen kasvattaa vauriota” on biologinen tulkinta interventiosta; MCU:n Ca-käsittely ja energiantuotanto voivat molemmat osallistua, eikä Ru360 yksin erottele niitä täydellisesti.** SAR, Ru360-pitoisuus ja tarkka aaltomuoto jäivät tässä alkuperäismenetelmien saatavuuden vuoksi varmentamatta. Julkiseen numerokorttiin sopivat taajuus ja aika, eivät keksitty annos tai EC50.

“Synergia” tarvitsee nimetyn vasteasteikon: yhdistelmäryhmän suurempi tulos kuin yhden altisteen ryhmä ei yksin arvioi koko additiivista kontrastia `Y11−Y10−Y01+Y00`. Näiden kokeiden vahvin yhteinen sanamuoto on **kenttävaste riippui vastaanottajan kemiallisesta tai farmakologisesta tilasta**. Kaikille yhdistelmille positiivista kerrointa ei johdu.

### COC-redox: formulaatio, ajallinen muutos ja kudos

[Chen & Kotani](https://pmc.ncbi.nlm.nih.gov/articles/PMC5755654/) vertasivat primaarisen dysmenorrean hoitoja: EE35µg +noretisteroni0,5/1mg,21/28 päivää, versus dydrogesteroni10mg/vrk. 17OC-käyttäjän d-ROMs321→512CarrU kolmessa kuukaudessa; seitsemän lääkettä vaihtaneen508→372 myöhemmässä15kk-pisteessä. Antioksidanttipotentiaalin BAP-mittari ei muuttunut merkitsevästi. **Lisääntynyt hapetusmarkkeri ei siis tässä yksin osoita antioksidanttivarannon loppumista.** Dydrogesteroni oli oirehoidon vertailu, ei yhtä tehokkaaksi ehkäisyksi osoitettu vaihtoehto.

[Fuller2022](https://doi.org/10.1113/JP283733) tuo suoremman mitokondriolinkin: COC-interventio nosti maksan H2O2-tuottoa rasvaruokitussa naarashiirimallissa, mutta lihaksessa ei samaa nousua. Rasvakudos ja maksan triglyseridit myös vähenivät. Näin vastaanottotilan mekanistinen kuvaus saa kudospaikan ja aidot erisuuntaiset päätepisteet; kaikkia muutoksia ei kirjata haitaksi. Sen12-/20-viikon kohortit ovat sama tutkimusperhe kuin seuraava mikrobiomityö.

### Vuoden2025 mikrobiomi: kolme eri evidenssiroolia

1. **Interventio hiirellä:** [Clapp Organski2025](https://doi.org/10.3390/nu17162591), 45% rasvaenergiaa sisältävä ruoka,2mg EE+200mg levonorgestreeliä/kg **rehua**,12/20viikkoa. Paksusuolen estradioli nousi molemmissa aikaryhmissä; yhteisömuutokset painottuivat umpisuoleen ja kooloniin20viikossa. Lactococcus↓12viikossa ei tarkoita Lactobacillus- tai L.reuteri-katoa. OT:tä, vagusta tai kiintymystä ei mitattu. Vaikutusmallin vahvin lisä on **paikka × kesto × hormonitila**.
2. **Ihmisaineiston alkuperäistutkimus:** [Terrazas2025](https://doi.org/10.1099/jmm.0.001987),18–25-vuotiaat, monophasiset20/30/35µg estrogeenivalmisteet,1–5vuoden käyttö. Yleinen yhteisökoostumus ei eronnut; lajimäärässä oli kiertopäivän ja ryhmän yhteys ja nimetyissä taksoneissa eroja. Clostridium sp. oli käyttäjävertailussa suhteellisesti suurempi. Tämä ei tue kaikkien Clostridia-bakteerien yhtenäistä vähenemistä.
3. **Saman datan kestomalli:** [Paul2025-esijulkaisu](https://doi.org/10.1101/2025.09.09.675238) löytää32 käyttövuosiin liittyvää ASV:tä, joista28vähenevää, mukaanlukien16Clostridia-ASV:tä. Tämä on eri vertailu kuin nykykäyttäjä vsverrokki. Uusinta-analyysin väite, että se vahvistaisi alkuperäisen yleisen Clostridium-laskun, ei vastaa alkuperäisen tuloksen edellä kuvattua suuntaa. Myös päivä21:n näytemäärä eroaa julkaisujen kuvauksissa (31 vs56); julkiseen sisältöön ei yhdistetä niitä yhtenä tarkkana N:nä. Toistuvat näytteet eivät ole uusia osallistujia.

Tästä voidaan koostaa COC→suoliston paikallinen hormoni-/mikrobitila→mahdollinen hermostollinen välitys, mutta **L.reuteri↓→OT↓→lastenhankintamotivaatio↓** on tässä aineistossa edelleen erikseen liitettävä BERM-mekanismi. Haitallinen suunta ei seuraa pelkästä mikrobiomierosta eikä korrelaatio nimeä välittävää bakteeria. Cureus-katsaus ei lisää tähän erillistä interventiota.

### Hormonihistoria ja palautuminen

[Panzer2006](https://doi.org/10.1111/j.1743-6109.2005.00198.x) antaa biologisen historian ankkurin valikoituneessa oireklinikassa. Lääkehistoriaa ei voi korvata pelkällä tämän päivän kyllä/ei-muuttujalla. “Koholla lopettamisen jälkeen” ja “pysyvästi koholla kaikilla käyttäjillä” ovat eri väitteitä.

[Landersoe2020](https://doi.org/10.1016/j.rbmo.2019.10.004) seurasi68naista, keskimäärin8vuotta COC-käyttöä: AMH:n arvioitu nousu53% ja antraalifollikkeliluvun41%, tasanne noin2kk kohdalla. Tämä on suora esimerkki siitä, miten lääkkeellä muutettu tila **peittää myös biomarkkerin tulkintaa**. Nousu ei tarkoita uuden munasoluvarannon syntymistä. [Yland2020](https://doi.org/10.1136/bmj.m3966) tuo varsinaisen raskautumispäätteen: lyhyt alkuviive, mutta kokonaisaineistossa pitkä käyttö ei liittynyt pysyvään heikompaan fekundabiliteettiin. Näitä kahta ei sulauteta samaksi palautumismittariksi.

Miesten [Travison2007](https://doi.org/10.1210/jc.2006-1375), jo kanoninen `travison2007_v2`, ja [Santi2025](https://doi.org/10.1007/s40618-025-02671-9), jo kanoninen `santi2025`, koskevat testosteronin ajallista muutosta. Santi kokoaa1256julkaisua,1504ryhmää ja1 064 891miestä. Tämä ei ole naisten COC-koe, eikä väestötrendin ajallinen kerroin ole EMF:n annoskerroin. Niitä voi käyttää erillisen hormonaalisen taustamuutoksen kontekstina; ei “EMF vähentää naisen T-tuotantoa20%” kalibrointina. Vanha `santi-2025-meta-analysis`-placeholder ei korvaa oikeaa DOI-lähdettä.

## Löydöksistä ohjautunut hakuloki

| Laukaisin | Hakukysymys ja täsmälliset termit | Löydös → muuttunut liitos |
|---|---|---|
| Bhargava/Bhatt-nimien epävarmuus | `"Estrogens directly potentiate neuronal L-type"`; `"Diurnal In Vivo and Rapid In Vitro Effects"` | Sarkar2008 jaSun2010. Tarkentui aineen, kudoksen ja ajoituksen portiksi, ei COC:n yleiseksi toksiseksi vahvistukseksi. |
| Liitteen väite EE:n kanavatiheydestä | `"Effects of prolonged ethinyl estradiol" calcium channel binding` | Bowling1997: kanavataso muuttuu, tutkittu elinvaste säilyy. Lisättiin tasojen erottelu. |
| Väitetty Ru360-rescue | `"Ru360" "1800"`; otsikkohaku jaPubMed37716072 | Sun2023, suunta päinvastainen: heikennetty Ca-käsittely herkistää. Vahvisti vastaanottotilan argumenttia oikeassa suunnassa. |
| Yakubu-sitaatin puuttuva bibliografia | `"ROS-triggering substance" electromagnetic`; katsauksen alkuperäisviitteet99/102/29 | Schuermann–Mevissen→Luukkonen/Kang, annosväli→Alkis. Yksi hypoteettinen “vahvistava tutkimus” purkautui eri protokolliksi ja erisuuntaisiksi tuloksiksi. |
| Pincemail/DeGroote-ristiriita | `"oral contraception" "De Groote" 2009`; `"Pincemail" "2007" oral` | Eri ikäryhmät jaformulaatiot, erilliset aineistot. |
| Tarve ajalliselle COC-redox-tiedolle | `"Different Effects" "Dydrogesterone"`; PMC5755654:nmenetelmät | Chen: ennen/jälkeen ja lääkkeenvaihto; pieni ei-satunnaistettu oirekohortti. BAP-nolla täsmentää varantoa. |
| Mikrobiomiviitteiden2025populaatio/suunta | Tittelihakujen jälkeenNutrients jaPMC:n alkuperäisXML, Paul→Terrazas | Hiiri-interventio vsihmishavainto vssaman ihmisaineiston esijulkaisu. Samasta koeperheestä nousi Fuller2022 mitokondriosilta. |
| Pysyvyyspäätelmä lopettamisen jälkeen | `"Pregravid contraceptive use and fecundability"`; `"Ovarian reserve markers after discontinuing long-term use"` | Yland+Landersoe: raskautumisen ja biomarkkerien palautuminen ovat mitattuja ja toisistaan erillisiä ehtoja. |
| Suora COC×RF mahdollisesti olemassa | `"contraceptive" "radiofrequency" "ethinyl"`; `"oral contraceptives" "electromagnetic" intervention` | Rajatussa haussa ei tunnistettu suoraa COC-formulaation×RF:n faktorikoetta. Tämä ei ole väite, ettei sellaista missään ole. Koostaminen jatkuu varmennetuilla komponenteilla. |

## Toteutukseen sopiva myönteinen synteesi

**FI:** Lääkitys voi muuttaa sitä, millaiseen biologiseen tilaan kenttä saapuu. Estradioli muuttaa kalsiumkanavien toimintaa, ja GnRH-neuroneissa aiempi hormonitausta muuttaa vasteen suuntaa vuorokaudenajan mukaan. Erillisessä RF-yhteiskokeessa mitokondrion kalsiuminoton salpaus lisäsi DNA-vauriota: vastaanottajan tila muutti saman kenttäprotokollan vaikutusta. Yhdistelmäehkäisystä on puolestaan mitattu redox-, SHBG- ja suolistomuutoksia sekä lopettamisen jälkeistä palautumista. Näistä BERM kokoaa ehdollisen yhteisvaikutuksen: lääke voi muuttaa kenttävasteen vastaanottoa ja palautumista samalla kun sillä on oma suora vaikutuksensa. Juuri COC:n ja RF:n yhdistelmän suuntaa tai kerrointa nämä tutkimukset eivät mittaa. Siksi lääkkeen, kentän, kudoksen ja historian vaikutukset pidetään näkyvissä saman mekanismin osina.

**EN:** Medication can change the biological state receiving a field. Estradiol alters calcium-channel function, while prior hormonal state changes the direction of GnRH-neuron responses with time of day. In a separate RF coexposure experiment, blocking mitochondrial calcium uptake increased DNA damage: the receiving state changed the effect of the same field protocol. Combined contraception also produces measurable redox, SHBG and gut changes, with recovery documented after discontinuation. BERM composes these components into a conditional interaction: medication may alter field responsiveness and recovery while retaining its own direct effects. These studies do not measure the direction or magnitude of the particular COC–RF combination. Drug, field, tissue and history therefore remain explicit parts of the shared mechanism.

## Toimitustila ja varmennus

Valmis lähdepaketti: **15 tietuetta**: 14 ehdotettua uutta ja 1 olemassa oleva Luukkonen; 14 vertaisarvioitua alkuperäistyötä ja 1 alkuperäinen esijulkaisu-uusinta-analyysi. Julkaisumäärä ei ole riippumattomien aineistojen määrä: Fuller/Clapp Organski sekä Terrazas/Paul ovat kaksi eksplisiittistä tutkimusperhettä. Pincemail, Schuermann–Mevissen, Alkis ja testosteronitrendit toimivat auditin lähdeidentiteetin/kontekstin viitteinä, eivät uutena neljänä synergialöydöksenä.

Metadata ja vaikutussuunta tarkistettiin alkuperäisteksteistä tai alkuperäisistä indeksoiduista abstrakteista; tarkka taso on JSONin verification-kentässä. Chen, Clapp Organski, Terrazas, Paul ja Kang tarkistettiin lisäksi EuropePMC:n kustantajatekstin XML:stä. Sun2023:n puuttuvat menetelmäluvut on jätetty näkyvästi avoimiksi. Rekisteristä tehtiin nimien, otsikoiden ja DOI:den duplikaattihaku. Yhteisiä rekisterejä tai sivukoodia ei muutettu.
