# Sivuston rinnakkaisversioiden yhdistämisarvio 2026-09-08

Lukuarvio; tuotantotiedostoja ei muokattu.

- Alkuperäinen snapshot: afe40cecc5fbc600b98e13b53bac8f07f3e272cf (työmuutokset mukana; yhteinen pohja 7a938dd).
- Julkaistu snapshot: 644cba650601dc79d8edd2960276a9a8a76d4c9c (julkaistu lähdekoodi 0840703 sekä auditointimerkinnät).

## Päätös

Sivuston 125 eroavassa, versionhallinnan tai ei-ohitettujen työtiedostojen piirissä olevassa tiedostossa julkaistu sisältö on turvallinen yhdistämisratkaisu. Alkuperäisestä ei löytynyt erillistä arvokasta tuotantolisäystä, joka pitäisi liittää julkaistun päälle. Muut tutkimusmuistiinpanot ja työtila-aineistot säilytetään erikseen juuritehtävän toimesta.

Kolmen version tekstivertailu tuotti 65vain julkaistussa muuttunutta tiedostoa, 18tiedostoa joissa julkaistu sisältää alkuperäisen työmuutokset, 4julkaistua uutta tiedostoa, 37tekstiristiriitaa ja yhden puhtaasti yhdistyvän mutta sisällöllisesti kaksinkertaisen lisäyksen. Ei alkuperäisen puolen yksinomaista sivustotiedostoa tässä rajauksessa.

Tärkeä poikkeama automaattisesta yhdistämisestä: epistemology/page.tsx:n alkuperäinen ResearchReadingGuide-lisäys on julkaistussa jo olemassa. Automaattinen kolmen version yhdistelmä loisi kaksi peräkkäistä samaa komponenttia. Julkaistu versio säilyttää sen kerran ja sisältää lisäksi Epistapege-linkityksen.

## Käyttöliittymäkokonaisuus

Säilytä yhtenä kokonaisuutena julkaistut navigation.tsx,lib/navigation.ts,globals.css,ExplanationHub.tsx,AtlasDetail.tsx ja matematiikan sivupalkin korkeussiirtymä.

- Home on näkyvä linkki, sen rinnalla kaikki 7pääryhmää. Pääotsikot eivät siirry hampurilaiseen.
- Kapealla näytöllä valikko rivittyy, ja mitattu --site-header-height ohjaa ankkurien sekä sivupalkkien sijoitusta.
- Alavalikko toimii samalla näppäimistölogiikalla kaikilla leveyksillä. Escape, ulkopuolinen klikkaus, reitin vaihtuminen ja layout-rajan ylitys sulkevat tarpeelliset avautumat.
- Uuden fragmentin korjaus on kertaluonteinen; myöhempi käyttäjän vieritys tai sivun koon muutos ei hypäytä takaisin.
- AtlasDetail jää headerin alapuolelle ja sen z-indeksi 40 headerin 50alapuolelle.
- Kaikki alkuperäisen lib/navigation.ts:n reittikohteet löytyvät julkaistusta. Uusia kohteita ovat /civilization/epistapege ja /evidence/response-conditions.
- CausalAtlas:n history.replaceState(null,...) on tarkoituksellinen muutos. Julkaistu testaa Nextin oman historiatilan sisältävän lähtötilanteen; alkuperäisen window.history.state-arvon palauttaminen kumoaisi tämän korjauksen.

## Sisällön säilyminen

TypeScriptin syntaksipuuhun perustuva sivujen kopioavainten tarkistus ei löytänyt poistuneita scalar property-polkuja. Matematiikan sivun näennäiset 1447poistumaa ovat sisällön siirto MathematicsSections.tsx-komponenttiin: normalisoidussa vertailussa kaikki 1443kopioavainta säilyvät. Menetelmä on rakenteellinen säilymistarkistus, ei väite jokaisen sanan identtisyydestä; taulukoiden toistuvia avaimia ei käytetä itsenäiseksi todistukseksi niiden kaikkien rivien säilymisestä.

Alkuperäisen model/page.tsx:n kaikki muuttuneet englanninkieliset scalar-copy-arvot ovat julkaistussa samoina. Published-vs-original-laaja tekstiero ei siten tarkoita alkuperäisen tämän kehitysvaiheen mallitekstin katoamista: merkittävä osa on julkaistun erillisiä jatkokehityksiä yhteisestä pohjasta.

Niissä muissa sivuissa, joissa alkuperäisen muuttama englannin/suomen copy-arvo poikkeaa julkaistusta, julkaistu jatkaa samaa sisältöä:

- biology.incoming,convergence.gate,physics.receiver/bridge,map.boundary: nimetty vastaanotto-operaattori täsmentyy materia–metriikkakytkennän ja vastefunktioteorian ehdolliseksi muodoksi sekä erillisiksi kalibrointisuureiksi.
- evidence.catsperP1: alkuperäinen toiminnallisen portin kuvaus säilyy kokonaan, perässä protokollakohtainen täsmennys.
- pharmacology.subtitle: kalsium-,varasto-,palaute- ja korjausprosessien erottelu täsmentyy kanava-/koeprofiileihin.
- unbroken-chain.chainSummary: komponentit,koostettu konvergenssi ja nimetyt operaattorit säilyvät; julkaistussa yksilöidään aiemmat siirtorajaukset.

Behavior,ModelReadingPath,ModelScopeIntro ja ResearchReadingGuide ovat versioissa identtiset. CivilizationReadingPath säilyttää biologian→motivaation→yhteistoiminnan→instituutioiden→ajallisen kertymisen rakenteen ja lisää Epistapegen havainto-/selityshaaran seitsemänneksi esseeksi. Seerumipitoisuus tarkentuu julkaistussa biologisen kapasiteetin eri osiin; kyse on mallin jo toteutetusta jatkosta.

Modulome/layers.ts säilyttää alkuperäisen valmistettujen kalvovesikkelien siirtokokeen koko kuvauksen kaikilla kielillä ja lisää kudosesteen feedback-johdannon. MechanismCards sekä stateModel-tyyppi lisäävät interventionProfileIds-liitännän; mitään alkuperäistä korttikenttää ei poisteta. Atlas lisää samalla samaan graafiin kohdistuvan interventiosuodattimen,profiilien vaikutussuunnat ja vastakkaissuuntaiset lähdelinkit.

## Testien säilyttäminen

Säilytä julkaistut Navigation,atlas-evidence,atlas-coverage,claim-independence ja CausalAtlas-testit. Navigation-komponenttitestien nimet kasvavat 10:stä 16:een; vanhan ulomman mobiilivalikon testit on korvattu aina näkyvien ryhmien testeillä. Navigation-kirjaston 9aiempaa testiä säilyvät ja 2 uutta tarkistaa julkaistun sivuston kohteiden säilymisen. Atlas-testit täydentyvät profiilisuodatuksella,profiilin nollauksella opastusta aloitettaessa ja Next-historian käsittelyllä.

Juuritehtävän tulee ajaa yhdistetylle alkuperäiselle työtilalle soveltuvat mallin ja sivuston testit,rakennetarkistukset sekä build. Tässä osatehtävässä ei ajettu testisarjoja uudelleen eikä muutettu tieteellisen auditoinnin sisältöä.

Koneelliset tarkistukset:
- /tmp/berm_site_threeway_filtered.json — 125tiedoston kolmen version luokittelu.
- /tmp/berm_site_scalar_keys.json —kopioavaimet ja alkuperäisestä muuttuneiden arvojen poikkeamat; matematiikan siirto huomioitu.
- /tmp/berm_site_component_diff.patch —luettu alkuperäinen→julkaistu sivu-/komponenttidiffi, 4631riviä.
