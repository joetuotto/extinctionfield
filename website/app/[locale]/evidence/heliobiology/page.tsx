import type { Metadata } from "next";
import Link from "next/link";
import { Sun } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { StudyCitation } from "@/components/StudyCitation";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Heliobiology: A Century of Evidence",
    subtitle:
      "From Chizhevsky's 1936 observations to modern epidemiology, heliobiology has documented solar-biological correlations for a century. BERM proposes CRY/RPM as the causal mechanism.",
    backLink: "← Back to Evidence",

    cautionText:
      "Heliobiology has accumulated a century of correlational evidence. BERM proposes CRY/RPM as the causal mechanism — this is testable but not yet confirmed.",

    chiKicker: "CHIZHEVSKY AND THE ORIGINS",
    chiTitle: "The terrestrial echo of solar storms (1936)",
    chiParagraphs: [
      "Alexander Chizhevsky’s “The Terrestrial Echo of Solar Storms” (1936) first systematically documented correlations between solar activity and epidemics, mortality, and social upheaval. Working with data spanning centuries, Chizhevsky identified an 11-year periodicity in disease outbreaks, mortality peaks, and social unrest that tracked the solar cycle.",
      "Despite initial dismissal — Chizhevsky was imprisoned under Stalin partly for these ideas — the field has accumulated substantial evidence over the subsequent nine decades. Modern studies with improved methodology, larger datasets, and better statistical controls confirm many of his core observations: solar activity does correlate with biological and health outcomes.",
      "The question was never whether the correlations exist. The question was always: what is the mechanism? How can solar activity, 150 million kilometres away, affect human biology?",
    ],

    solarKicker: "SOLAR CYCLE AND HEALTH",
    solarTitle: "The 11-year biological rhythm",
    solarLead:
      "The solar cycle’s approximately 11-year periodicity appears consistently in health outcome data across multiple domains and geographies.",
    solarParagraphs: [
      "Cardiovascular mortality shows statistically significant correlation with the solar cycle, with peaks during years of high geomagnetic activity. Psychiatric hospital admissions, particularly for mood disorders, follow a similar pattern. Immune function markers — including lymphocyte counts and inflammatory cytokine levels — show solar-cycle-dependent variation.",
      "The correlation is strongest at high magnetic latitudes. Scandinavian and Canadian populations show larger effect sizes than equatorial populations. This latitude dependence constitutes a dose-response relationship: regions with greater geomagnetic field variation experience stronger biological effects.",
      "Geomagnetic storms produce health effects with a characteristic 3–5 day delay, corresponding to the storm recovery phase when Pc1 micropulsation activity increases. This temporal signature is consistent across cardiovascular, neurological, and psychiatric outcomes — suggesting a shared underlying mechanism rather than multiple independent pathways.",
    ],

    mechanismKicker: "THE MISSING MECHANISM",
    mechanismTitle: "A century without a causal explanation",
    mechanismLead:
      "Heliobiology’s central weakness was always mechanistic: no plausible biophysical pathway connected solar activity to cellular biology.",
    mechanismParagraphs: [
      "For decades, critics rightly pointed out that thermal effects of natural geomagnetic field variations are far too weak to affect biology. The energy delivered by field fluctuations in the 25–65 µT range is orders of magnitude below thermal noise (kT). Without a mechanism that could amplify or transduce these weak signals, heliobiology remained correlational.",
      "BERM proposes the answer: the CRY/RPM (cryptochrome radical pair mechanism) pathway. Cryptochrome proteins are both circadian clock regulators and demonstrated magnetoreceptors. The radical pair within CRY is sensitive to magnetic fields in exactly the 25–65 µT range of the natural geomagnetic field — not through thermal effects, but through quantum spin chemistry.",
      "The radical pair mechanism operates via singlet-triplet interconversion, where the magnetic field modulates the relative spin states of two unpaired electrons. This is a quantum effect that does not require thermal-scale energy. The interconversion timescale of the FAD-tryptophan radical pair in cryptochrome matches the frequency range of Pc1 micropulsations (0.2–5 Hz), providing a direct biophysical coupling between geomagnetic pulsations and cellular chemistry.",
    ],

    frequencyKicker: "FREQUENCY MATCHING",
    frequencyTitle: "Evolutionary tuning to geomagnetic frequencies",
    frequencyParagraphs: [
      "The Schumann resonance at 7.83 Hz falls within the alpha brainwave range (8–13 Hz) and serves as a circadian timing reference. Wever’s bunker experiments demonstrated that removing this signal disrupts human circadian rhythms, and reintroducing a 7.83 Hz field restores them.",
      "Pc1 micropulsations at 0.2–5 Hz overlap with the human resting heart rate range (0.8–1.3 Hz). Multiple studies document synchronization between heart rate variability and geomagnetic Pc1 activity, with the effect being latitude-dependent.",
      "From BERM’s perspective, these frequency matches are not coincidences. They are evolutionary adaptations: biological oscillators that evolved in the presence of these geomagnetic frequencies became entrained to them. Cryptochrome, present in virtually all eukaryotes and with a conserved radical pair mechanism, is the molecular substrate for this entrainment.",
    ],

    bermKicker: "BERM INTERPRETATION",
    bermTitle: "The causal chain from Sun to biology",
    bermParagraphs: [
      "Heliobiology’s century of correlation data is the expected output of CRY/RPM sensitivity to the geomagnetic environment. The causal chain is: Sun → magnetosphere → CRY → biology.",
      "Solar activity (sunspots, CMEs, solar wind) modulates the geomagnetic environment through magnetospheric coupling. The geomagnetic environment — including static field strength, Schumann resonance, and Pc1 micropulsations — modulates cryptochrome spin chemistry via the radical pair mechanism.",
      "CRY spin chemistry modulates melatonin production (CRY represses AANAT transcription), circadian timing (CRY is a core clock protein), and reproductive function (melatonin gates GnRH pulsatility). This single molecular pathway connects solar activity to the full range of heliobiological observations: cardiovascular, psychiatric, immune, circadian, and reproductive effects.",
      "The latitude dependence, the storm-recovery-phase timing, the frequency specificity — all features of the heliobiological literature that were previously unexplained — emerge naturally from the biophysics of the radical pair mechanism in a geomagnetically varying environment.",
    ],

    falsificationTitle: "Falsification criterion",
    falsificationText:
      "If CRY/RPM is the mechanism linking solar activity to biology, then individuals with CRY loss-of-function variants should show reduced heliobiological sensitivity. A controlled Wever-replication study with modern CRY genotyping would be definitive: CRY-variant carriers isolated from natural EM fields should show smaller circadian disruptions than wild-type controls.",

    navPredictions: "Predictions →",
    navModel: "Model Specification →",
    navEvidence: "Evidence overview →",
  },

  fi: {
    title: "Heliobiologia: Vuosisata todisteita",
    subtitle:
      "Tshizhevskin vuoden 1936 havainnoista moderniin epidemiologiaan — heliobiologia on dokumentoinut aurinko-biologisia korrelaatioita vuosisadan ajan. BERM ehdottaa CRY/RPM:aa kausaalimekanismiksi.",
    backLink: "← Takaisin todisteisiin",

    cautionText:
      "Heliobiologia on kerryttanyt vuosisadan korrelaationayttöa. BERM ehdottaa CRY/RPM:aa kausaalimekanismiksi — tama on testattavissa mutta ei viela vahvistettu.",

    chiKicker: "TSHIZHEVSKI JA ALKUPERAISET",
    chiTitle: "Aurinkomyrskyjen maanpaallinen kaiku (1936)",
    chiParagraphs: [
      "Aleksander Tshizhevskin „The Terrestrial Echo of Solar Storms” (1936) dokumentoi ensimmäisenä systemaattisesti korrelaatiot auringon aktiivisuuden ja epidemioiden, kuolleisuuden ja yhteiskunnallisten mullistusten välillä. Vuosisatoja kattavalla datalla työskennellen Tshizhevski tunnisti 11 vuoden jaksollisuuden tautipurkauksissa, kuolleisuushuipuissa ja yhteiskunnallisessa levottomuudessa, joka seurasi auringon sykliä.",
      "Alkuperäisestä hylkäyksestä huolimatta — Tshizhevski vangittiin Stalinin aikana osittain näiden ideoiden vuoksi — tieteenala on kerryttanyt merkittävää näyttöä seuraavien yhdeksän vuosikymmenen aikana. Nykyaikaiset tutkimukset parannetulla metodologialla, suuremmilla aineistoilla ja paremmilla tilastollisilla kontrolleilla vahvistavat monet hänen ydinhavainnoistaan: auringon aktiivisuus korreloi biologisten ja terveystulosten kanssa.",
      "Kysymys ei koskaan ollut korrelaatioiden olemassaolosta. Kysymys oli aina: mikä on mekanismi? Kuinka auringon aktiivisuus, 150 miljoonan kilometrin päässä, voi vaikuttaa ihmisen biologiaan?",
    ],

    solarKicker: "AURINKOSYKLI JA TERVEYS",
    solarTitle: "11 vuoden biologinen rytmi",
    solarLead:
      "Aurinkosyklin noin 11 vuoden jaksollisuus näkyy johdonmukaisesti terveysdatassa useilla aloilla ja maantieteellisillä alueilla.",
    solarParagraphs: [
      "Kardiovaskulaarinen kuolleisuus osoittaa tilastollisesti merkitsevää korrelaatiota aurinkosyklin kanssa, huiput korkean geomagneettisen aktiivisuuden vuosina. Psykiatriset sairaalasisäänotot, erityisesti mielialahairioissa, noudattavat samankaltaista kaavaa. Immuunitoiminnan markkereissa — mukaan lukien lymfosyyttimäärät ja tulehdussytokiinitasot — havaitaan aurinkosyklista riippuvaa vaihtelua.",
      "Korrelaatio on voimakkain korkeilla magneettisilla leveysasteilla. Skandinaavisilla ja kanadalaisilla väestöillä näkyy suurempia vaikutuskokoja kuin päiväntasaajan väestöillä. Tämä leveysasteriippuvuus muodostaa annos-vastesuhteen: alueet, joilla geomagneettisen kentän vaihtelu on suurempaa, kokevat voimakkaampia biologisia vaikutuksia.",
      "Geomagneettiset myrskyt tuottavat terveysvaikutuksia ominaisella 3–5 päivän viiveellä, joka vastaa myrskyn palautumisvaihetta, kun Pc1-mikropulsaatioaktiivisuus kasvaa. Tämä ajallinen tunnusmerkki on johdonmukainen kardiovaskulaarisissa, neurologisissa ja psykiatrisissa tuloksissa — mikä viittaa jaettuun taustamekanismiin useiden itsenäisten reittien sijaan.",
    ],

    mechanismKicker: "PUUTTUVA MEKANISMI",
    mechanismTitle: "Vuosisata ilman kausaalista selitystä",
    mechanismLead:
      "Heliobiologian keskeinen heikkous on aina ollut mekanistinen: uskottavaa biofysikaalista reittia auringon aktiivisuuden ja solubiologian valille ei ollut.",
    mechanismParagraphs: [
      "Vuosikymmeniä kriitikot huomauttivat oikeutetusti, että luonnollisten geomagneettisen kentän vaihtelujen lämpövaikutukset ovat aivan liian heikkoja vaikuttaakseen biologiaan. Kenttavaihtelujen tuottama energia 25–65 µT:n alueella on kertaluokkia lämpökohinan (kT) alapuolella. Ilman mekanismia, joka voisi vahvistaa tai muuntaa näitä heikkoja signaaleja, heliobiologia pysyi korrelaatiotasolla.",
      "BERM ehdottaa vastausta: CRY/RPM (kryptokromin radikaalipari -mekanismi) -reitti. Kryptokromiproteiinit ovat sekä sirkadiaanisen kellon säätelijöitä että osoitettuja magnetoreseptoreita. CRY:n radikaalipari on herkka magneettikentille juuri luonnollisen geomagneettisen kentän 25–65 µT:n alueella — ei lämpövaikutusten kautta, vaan kvanttispinkemian kautta.",
      "Radikaaliparimekanismi toimii singletti-tripletti-interkonversion kautta, jossa magneettikenttä moduloi kahden parittoman elektronin suhteellisia spintiloja. Tämä on kvanttivaikutus, joka ei vaadi lämpötason energiaa. FAD-tryptofaani-radikaaliparin interkonversion aikaskaala kryptokromissa vastaa Pc1-mikropulsaatioiden taajuusaluetta (0,2–5 Hz), tarjoten suoran biofysikaalisen kytkennän geomagneettisten pulsaatioiden ja solukemian välille.",
    ],

    frequencyKicker: "TAAJUUSVASTAAVUUS",
    frequencyTitle: "Evolutiivinen viritys geomagneettisiin taajuuksiin",
    frequencyParagraphs: [
      "Schumannin resonanssi 7,83 Hz:llä osuu alfa-aivoaaltojen alueelle (8–13 Hz) ja toimii sirkadiaanisen ajoituksen referenssinä. Weverin bunkkerikokeet osoittivat, että tämän signaalin poistaminen hairitsee ihmisen sirkadiaanisia rytmejä, ja 7,83 Hz:n kentän palauttaminen vakauttaa ne.",
      "Pc1-mikropulsaatiot 0,2–5 Hz:llä kattavat ihmisen leposykkeen alueen (0,8–1,3 Hz). Useat tutkimukset dokumentoivat synkronoinnin sykevariaation ja geomagneettisen Pc1-aktiivisuuden välillä, vaikutuksen ollessa leveysasteriippuvainen.",
      "BERM:n näkökulmasta nämä taajuusvastaavuudet eivät ole sattumia. Ne ovat evolutiivisia sopeutumia: biologiset oskillaattorit, jotka kehittyivät näiden geomagneettisten taajuuksien läsnäollessa, mukautuivat niihin. Kryptokromi, jota esiintyy käytännössä kaikissa aitotumallisissa ja jolla on konservoitunut radikaaliparimekanismi, on tämän mukautumisen molekulaarinen substraatti.",
    ],

    bermKicker: "BERM-TULKINTA",
    bermTitle: "Kausaaliketju auringosta biologiaan",
    bermParagraphs: [
      "Heliobiologian vuosisadan korrelaatiodata on CRY/RPM:n geomagneettiselle ymparistölle herkkyyden odotettu tuotos. Kausaaliketju on: Aurinko → magnetosfaari → CRY → biologia.",
      "Auringon aktiivisuus (auringonpilkut, CME:t, aurinkotuuli) moduloi geomagneettista ymparistoa magnetosfaarisen kytkennän kautta. Geomagneettinen ymparisto — mukaan lukien staattisen kentän voimakkuus, Schumannin resonanssi ja Pc1-mikropulsaatiot — moduloi kryptokromin spinkemiaa radikaaliparimekanismin kautta.",
      "CRY:n spinkemia moduloi melatoniinituotantoa (CRY vaimentaa AANAT-transkriptiota), sirkadiaanista ajoitusta (CRY on ydinkellon proteiini) ja lisääntymistoimintaa (melatoniini säätelee GnRH-pulsatiliteettia). Tämä yksittäinen molekulaarinen reitti yhdistää auringon aktiivisuuden heliobiologisten havaintojen koko kirjoon: kardiovaskulaarisiin, psykiatrisiin, immuuni-, sirkadiaanisiin ja lisääntymisvaikutuksiin.",
      "Leveysasteriippuvuus, myrskyn palautumisvaiheen ajoitus, taajuusspesifisyys — kaikki heliobiologisen kirjallisuuden piirteet, jotka olivat aiemmin selittämättömiä — syntyvat luonnollisesti radikaaliparimekanismin biofysiikasta geomagneettisesti vaihtelevassa ymparistossa.",
    ],

    falsificationTitle: "Falsifikaatiokriteeri",
    falsificationText:
      "Jos CRY/RPM on mekanismi, joka yhdistaa auringon aktiivisuuden biologiaan, niin yksilöiden, joilla on CRY:n toimintaa heikentäviä variantteja, tulisi osoittaa vähentynyttä heliobiologista herkkyytä. Kontrolloitu Wever-replikaatiotutkimus modernilla CRY-genotyypityksellä olisi ratkaiseva: CRY-varianttien kantajien, jotka on eristetty luonnollisista EM-kentistä, tulisi osoittaa pienempiä sirkadiaanisia häiriöitä kuin villityyppikontrollien.",

    navPredictions: "Ennusteet →",
    navModel: "Mallispesifikaatio →",
    navEvidence: "Näytön yleiskatsaus →",
  },

  ja: {
    title: "太陽生物学：1世紀の証拠",
    subtitle:
      "From Chizhevsky’s 1936 observations to modern epidemiology, heliobiology has documented solar-biological correlations for a century. BERM proposes CRY/RPM as the causal mechanism.",
    backLink: "← 証拠に戻る",

    cautionText:
      "Heliobiology has accumulated a century of correlational evidence. BERM proposes CRY/RPM as the causal mechanism — this is testable but not yet confirmed.",

    chiKicker: "チジェフスキーと起源",
    chiTitle: "太陽嵐の地上の反響（1936）",
    chiParagraphs: [
      "Alexander Chizhevsky’s “The Terrestrial Echo of Solar Storms” (1936) first systematically documented correlations between solar activity and epidemics, mortality, and social upheaval. Working with data spanning centuries, Chizhevsky identified an 11-year periodicity in disease outbreaks, mortality peaks, and social unrest that tracked the solar cycle.",
      "Despite initial dismissal — Chizhevsky was imprisoned under Stalin partly for these ideas — the field has accumulated substantial evidence over the subsequent nine decades. Modern studies with improved methodology, larger datasets, and better statistical controls confirm many of his core observations: solar activity does correlate with biological and health outcomes.",
      "The question was never whether the correlations exist. The question was always: what is the mechanism? How can solar activity, 150 million kilometres away, affect human biology?",
    ],

    solarKicker: "太陽周期と健康",
    solarTitle: "11年の生物学的リズム",
    solarLead:
      "The solar cycle’s approximately 11-year periodicity appears consistently in health outcome data across multiple domains and geographies.",
    solarParagraphs: [
      "Cardiovascular mortality shows statistically significant correlation with the solar cycle, with peaks during years of high geomagnetic activity. Psychiatric hospital admissions, particularly for mood disorders, follow a similar pattern. Immune function markers — including lymphocyte counts and inflammatory cytokine levels — show solar-cycle-dependent variation.",
      "The correlation is strongest at high magnetic latitudes. Scandinavian and Canadian populations show larger effect sizes than equatorial populations. This latitude dependence constitutes a dose-response relationship: regions with greater geomagnetic field variation experience stronger biological effects.",
      "Geomagnetic storms produce health effects with a characteristic 3–5 day delay, corresponding to the storm recovery phase when Pc1 micropulsation activity increases. This temporal signature is consistent across cardiovascular, neurological, and psychiatric outcomes — suggesting a shared underlying mechanism rather than multiple independent pathways.",
    ],

    mechanismKicker: "欠落したメカニズム",
    mechanismTitle: "因果的説明のない1世紀",
    mechanismLead:
      "Heliobiology’s central weakness was always mechanistic: no plausible biophysical pathway connected solar activity to cellular biology.",
    mechanismParagraphs: [
      "For decades, critics rightly pointed out that thermal effects of natural geomagnetic field variations are far too weak to affect biology. The energy delivered by field fluctuations in the 25–65 µT range is orders of magnitude below thermal noise (kT). Without a mechanism that could amplify or transduce these weak signals, heliobiology remained correlational.",
      "BERM proposes the answer: the CRY/RPM (cryptochrome radical pair mechanism) pathway. Cryptochrome proteins are both circadian clock regulators and demonstrated magnetoreceptors. The radical pair within CRY is sensitive to magnetic fields in exactly the 25–65 µT range of the natural geomagnetic field — not through thermal effects, but through quantum spin chemistry.",
      "The radical pair mechanism operates via singlet-triplet interconversion, where the magnetic field modulates the relative spin states of two unpaired electrons. This is a quantum effect that does not require thermal-scale energy. The interconversion timescale of the FAD-tryptophan radical pair in cryptochrome matches the frequency range of Pc1 micropulsations (0.2–5 Hz), providing a direct biophysical coupling between geomagnetic pulsations and cellular chemistry.",
    ],

    frequencyKicker: "周波数一致",
    frequencyTitle: "地磁気周波数への進化的同調",
    frequencyParagraphs: [
      "The Schumann resonance at 7.83 Hz falls within the alpha brainwave range (8–13 Hz) and serves as a circadian timing reference. Wever’s bunker experiments demonstrated that removing this signal disrupts human circadian rhythms, and reintroducing a 7.83 Hz field restores them.",
      "Pc1 micropulsations at 0.2–5 Hz overlap with the human resting heart rate range (0.8–1.3 Hz). Multiple studies document synchronization between heart rate variability and geomagnetic Pc1 activity, with the effect being latitude-dependent.",
      "From BERM’s perspective, these frequency matches are not coincidences. They are evolutionary adaptations: biological oscillators that evolved in the presence of these geomagnetic frequencies became entrained to them. Cryptochrome, present in virtually all eukaryotes and with a conserved radical pair mechanism, is the molecular substrate for this entrainment.",
    ],

    bermKicker: "BERM解釈",
    bermTitle: "太陽から生物学への因果連鎖",
    bermParagraphs: [
      "Heliobiology’s century of correlation data is the expected output of CRY/RPM sensitivity to the geomagnetic environment. The causal chain is: Sun → magnetosphere → CRY → biology.",
      "Solar activity (sunspots, CMEs, solar wind) modulates the geomagnetic environment through magnetospheric coupling. The geomagnetic environment — including static field strength, Schumann resonance, and Pc1 micropulsations — modulates cryptochrome spin chemistry via the radical pair mechanism.",
      "CRY spin chemistry modulates melatonin production (CRY represses AANAT transcription), circadian timing (CRY is a core clock protein), and reproductive function (melatonin gates GnRH pulsatility). This single molecular pathway connects solar activity to the full range of heliobiological observations: cardiovascular, psychiatric, immune, circadian, and reproductive effects.",
      "The latitude dependence, the storm-recovery-phase timing, the frequency specificity — all features of the heliobiological literature that were previously unexplained — emerge naturally from the biophysics of the radical pair mechanism in a geomagnetically varying environment.",
    ],

    falsificationTitle: "反証基準",
    falsificationText:
      "If CRY/RPM is the mechanism linking solar activity to biology, then individuals with CRY loss-of-function variants should show reduced heliobiological sensitivity. A controlled Wever-replication study with modern CRY genotyping would be definitive: CRY-variant carriers isolated from natural EM fields should show smaller circadian disruptions than wild-type controls.",

    navPredictions: "Predictions →",
    navModel: "Model Specification →",
    navEvidence: "Evidence overview →",
  },

  fr: {
    title: "Héliobiologie : Un siècle de preuves",
    subtitle:
      "From Chizhevsky’s 1936 observations to modern epidemiology, heliobiology has documented solar-biological correlations for a century. BERM proposes CRY/RPM as the causal mechanism.",
    backLink: "← Retour aux preuves",

    cautionText:
      "Heliobiology has accumulated a century of correlational evidence. BERM proposes CRY/RPM as the causal mechanism — this is testable but not yet confirmed.",

    chiKicker: "CHIZHEVSKY ET LES ORIGINES",
    chiTitle: "L’écho terrestre des tempêtes solaires (1936)",
    chiParagraphs: [
      "Alexander Chizhevsky’s “The Terrestrial Echo of Solar Storms” (1936) first systematically documented correlations between solar activity and epidemics, mortality, and social upheaval. Working with data spanning centuries, Chizhevsky identified an 11-year periodicity in disease outbreaks, mortality peaks, and social unrest that tracked the solar cycle.",
      "Despite initial dismissal — Chizhevsky was imprisoned under Stalin partly for these ideas — the field has accumulated substantial evidence over the subsequent nine decades. Modern studies with improved methodology, larger datasets, and better statistical controls confirm many of his core observations: solar activity does correlate with biological and health outcomes.",
      "The question was never whether the correlations exist. The question was always: what is the mechanism? How can solar activity, 150 million kilometres away, affect human biology?",
    ],

    solarKicker: "CYCLE SOLAIRE ET SANTÉ",
    solarTitle: "Le rythme biologique de 11 ans",
    solarLead:
      "The solar cycle’s approximately 11-year periodicity appears consistently in health outcome data across multiple domains and geographies.",
    solarParagraphs: [
      "Cardiovascular mortality shows statistically significant correlation with the solar cycle, with peaks during years of high geomagnetic activity. Psychiatric hospital admissions, particularly for mood disorders, follow a similar pattern. Immune function markers — including lymphocyte counts and inflammatory cytokine levels — show solar-cycle-dependent variation.",
      "The correlation is strongest at high magnetic latitudes. Scandinavian and Canadian populations show larger effect sizes than equatorial populations. This latitude dependence constitutes a dose-response relationship: regions with greater geomagnetic field variation experience stronger biological effects.",
      "Geomagnetic storms produce health effects with a characteristic 3–5 day delay, corresponding to the storm recovery phase when Pc1 micropulsation activity increases. This temporal signature is consistent across cardiovascular, neurological, and psychiatric outcomes — suggesting a shared underlying mechanism rather than multiple independent pathways.",
    ],

    mechanismKicker: "LE MÉCANISME MANQUANT",
    mechanismTitle: "Un siècle sans explication causale",
    mechanismLead:
      "Heliobiology’s central weakness was always mechanistic: no plausible biophysical pathway connected solar activity to cellular biology.",
    mechanismParagraphs: [
      "For decades, critics rightly pointed out that thermal effects of natural geomagnetic field variations are far too weak to affect biology. The energy delivered by field fluctuations in the 25–65 µT range is orders of magnitude below thermal noise (kT). Without a mechanism that could amplify or transduce these weak signals, heliobiology remained correlational.",
      "BERM proposes the answer: the CRY/RPM (cryptochrome radical pair mechanism) pathway. Cryptochrome proteins are both circadian clock regulators and demonstrated magnetoreceptors. The radical pair within CRY is sensitive to magnetic fields in exactly the 25–65 µT range of the natural geomagnetic field — not through thermal effects, but through quantum spin chemistry.",
      "The radical pair mechanism operates via singlet-triplet interconversion, where the magnetic field modulates the relative spin states of two unpaired electrons. This is a quantum effect that does not require thermal-scale energy. The interconversion timescale of the FAD-tryptophan radical pair in cryptochrome matches the frequency range of Pc1 micropulsations (0.2–5 Hz), providing a direct biophysical coupling between geomagnetic pulsations and cellular chemistry.",
    ],

    frequencyKicker: "CORRESPONDANCE FRÉQUENTIELLE",
    frequencyTitle: "Accord évolutif aux fréquences géomagnétiques",
    frequencyParagraphs: [
      "The Schumann resonance at 7.83 Hz falls within the alpha brainwave range (8–13 Hz) and serves as a circadian timing reference. Wever’s bunker experiments demonstrated that removing this signal disrupts human circadian rhythms, and reintroducing a 7.83 Hz field restores them.",
      "Pc1 micropulsations at 0.2–5 Hz overlap with the human resting heart rate range (0.8–1.3 Hz). Multiple studies document synchronization between heart rate variability and geomagnetic Pc1 activity, with the effect being latitude-dependent.",
      "From BERM’s perspective, these frequency matches are not coincidences. They are evolutionary adaptations: biological oscillators that evolved in the presence of these geomagnetic frequencies became entrained to them. Cryptochrome, present in virtually all eukaryotes and with a conserved radical pair mechanism, is the molecular substrate for this entrainment.",
    ],

    bermKicker: "INTERPRÉTATION BERM",
    bermTitle: "La chaîne causale du Soleil à la biologie",
    bermParagraphs: [
      "Heliobiology’s century of correlation data is the expected output of CRY/RPM sensitivity to the geomagnetic environment. The causal chain is: Sun → magnetosphere → CRY → biology.",
      "Solar activity (sunspots, CMEs, solar wind) modulates the geomagnetic environment through magnetospheric coupling. The geomagnetic environment — including static field strength, Schumann resonance, and Pc1 micropulsations — modulates cryptochrome spin chemistry via the radical pair mechanism.",
      "CRY spin chemistry modulates melatonin production (CRY represses AANAT transcription), circadian timing (CRY is a core clock protein), and reproductive function (melatonin gates GnRH pulsatility). This single molecular pathway connects solar activity to the full range of heliobiological observations: cardiovascular, psychiatric, immune, circadian, and reproductive effects.",
      "The latitude dependence, the storm-recovery-phase timing, the frequency specificity — all features of the heliobiological literature that were previously unexplained — emerge naturally from the biophysics of the radical pair mechanism in a geomagnetically varying environment.",
    ],

    falsificationTitle: "Critère de falsification",
    falsificationText:
      "If CRY/RPM is the mechanism linking solar activity to biology, then individuals with CRY loss-of-function variants should show reduced heliobiological sensitivity. A controlled Wever-replication study with modern CRY genotyping would be definitive: CRY-variant carriers isolated from natural EM fields should show smaller circadian disruptions than wild-type controls.",

    navPredictions: "Predictions →",
    navModel: "Model Specification →",
    navEvidence: "Evidence overview →",
  },

  ko: {
    title: "태양생물학: 한 세기의 증거",
    subtitle:
      "From Chizhevsky’s 1936 observations to modern epidemiology, heliobiology has documented solar-biological correlations for a century. BERM proposes CRY/RPM as the causal mechanism.",
    backLink: "← 증거로 돌아가기",

    cautionText:
      "Heliobiology has accumulated a century of correlational evidence. BERM proposes CRY/RPM as the causal mechanism — this is testable but not yet confirmed.",

    chiKicker: "치제프스키와 기원",
    chiTitle: "태양 폭풍의 지상의 메아리 (1936)",
    chiParagraphs: [
      "Alexander Chizhevsky’s “The Terrestrial Echo of Solar Storms” (1936) first systematically documented correlations between solar activity and epidemics, mortality, and social upheaval. Working with data spanning centuries, Chizhevsky identified an 11-year periodicity in disease outbreaks, mortality peaks, and social unrest that tracked the solar cycle.",
      "Despite initial dismissal — Chizhevsky was imprisoned under Stalin partly for these ideas — the field has accumulated substantial evidence over the subsequent nine decades. Modern studies with improved methodology, larger datasets, and better statistical controls confirm many of his core observations: solar activity does correlate with biological and health outcomes.",
      "The question was never whether the correlations exist. The question was always: what is the mechanism? How can solar activity, 150 million kilometres away, affect human biology?",
    ],

    solarKicker: "태양 주기와 건강",
    solarTitle: "11년의 생물학적 리듬",
    solarLead:
      "The solar cycle’s approximately 11-year periodicity appears consistently in health outcome data across multiple domains and geographies.",
    solarParagraphs: [
      "Cardiovascular mortality shows statistically significant correlation with the solar cycle, with peaks during years of high geomagnetic activity. Psychiatric hospital admissions, particularly for mood disorders, follow a similar pattern. Immune function markers — including lymphocyte counts and inflammatory cytokine levels — show solar-cycle-dependent variation.",
      "The correlation is strongest at high magnetic latitudes. Scandinavian and Canadian populations show larger effect sizes than equatorial populations. This latitude dependence constitutes a dose-response relationship: regions with greater geomagnetic field variation experience stronger biological effects.",
      "Geomagnetic storms produce health effects with a characteristic 3–5 day delay, corresponding to the storm recovery phase when Pc1 micropulsation activity increases. This temporal signature is consistent across cardiovascular, neurological, and psychiatric outcomes — suggesting a shared underlying mechanism rather than multiple independent pathways.",
    ],

    mechanismKicker: "누락된 메커니즘",
    mechanismTitle: "인과적 설명 없는 1세기",
    mechanismLead:
      "Heliobiology’s central weakness was always mechanistic: no plausible biophysical pathway connected solar activity to cellular biology.",
    mechanismParagraphs: [
      "For decades, critics rightly pointed out that thermal effects of natural geomagnetic field variations are far too weak to affect biology. The energy delivered by field fluctuations in the 25–65 µT range is orders of magnitude below thermal noise (kT). Without a mechanism that could amplify or transduce these weak signals, heliobiology remained correlational.",
      "BERM proposes the answer: the CRY/RPM (cryptochrome radical pair mechanism) pathway. Cryptochrome proteins are both circadian clock regulators and demonstrated magnetoreceptors. The radical pair within CRY is sensitive to magnetic fields in exactly the 25–65 µT range of the natural geomagnetic field — not through thermal effects, but through quantum spin chemistry.",
      "The radical pair mechanism operates via singlet-triplet interconversion, where the magnetic field modulates the relative spin states of two unpaired electrons. This is a quantum effect that does not require thermal-scale energy. The interconversion timescale of the FAD-tryptophan radical pair in cryptochrome matches the frequency range of Pc1 micropulsations (0.2–5 Hz), providing a direct biophysical coupling between geomagnetic pulsations and cellular chemistry.",
    ],

    frequencyKicker: "주파수 일치",
    frequencyTitle: "지자기 주파수에 대한 진화적 동조",
    frequencyParagraphs: [
      "The Schumann resonance at 7.83 Hz falls within the alpha brainwave range (8–13 Hz) and serves as a circadian timing reference. Wever’s bunker experiments demonstrated that removing this signal disrupts human circadian rhythms, and reintroducing a 7.83 Hz field restores them.",
      "Pc1 micropulsations at 0.2–5 Hz overlap with the human resting heart rate range (0.8–1.3 Hz). Multiple studies document synchronization between heart rate variability and geomagnetic Pc1 activity, with the effect being latitude-dependent.",
      "From BERM’s perspective, these frequency matches are not coincidences. They are evolutionary adaptations: biological oscillators that evolved in the presence of these geomagnetic frequencies became entrained to them. Cryptochrome, present in virtually all eukaryotes and with a conserved radical pair mechanism, is the molecular substrate for this entrainment.",
    ],

    bermKicker: "BERM 해석",
    bermTitle: "태양에서 생물학으로의 인과 연쇄",
    bermParagraphs: [
      "Heliobiology’s century of correlation data is the expected output of CRY/RPM sensitivity to the geomagnetic environment. The causal chain is: Sun → magnetosphere → CRY → biology.",
      "Solar activity (sunspots, CMEs, solar wind) modulates the geomagnetic environment through magnetospheric coupling. The geomagnetic environment — including static field strength, Schumann resonance, and Pc1 micropulsations — modulates cryptochrome spin chemistry via the radical pair mechanism.",
      "CRY spin chemistry modulates melatonin production (CRY represses AANAT transcription), circadian timing (CRY is a core clock protein), and reproductive function (melatonin gates GnRH pulsatility). This single molecular pathway connects solar activity to the full range of heliobiological observations: cardiovascular, psychiatric, immune, circadian, and reproductive effects.",
      "The latitude dependence, the storm-recovery-phase timing, the frequency specificity — all features of the heliobiological literature that were previously unexplained — emerge naturally from the biophysics of the radical pair mechanism in a geomagnetically varying environment.",
    ],

    falsificationTitle: "반증 기준",
    falsificationText:
      "If CRY/RPM is the mechanism linking solar activity to biology, then individuals with CRY loss-of-function variants should show reduced heliobiological sensitivity. A controlled Wever-replication study with modern CRY genotyping would be definitive: CRY-variant carriers isolated from natural EM fields should show smaller circadian disruptions than wild-type controls.",

    navPredictions: "Predictions →",
    navModel: "Model Specification →",
    navEvidence: "Evidence overview →",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function HeliobiologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      {/* Back link */}
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">
          {d.backLink}
        </Link>
      </p>

      {/* Header */}
      <PageHeader icon={Sun} title={d.title} subtitle={d.subtitle} />

      {/* Epistemic banner */}
      <CautionBox locale={locale}>
        <p>{d.cautionText}</p>
      </CautionBox>

      {/* Section A: Chizhevsky and the Origins */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <p className="text-xs font-semibold tracking-widest text-accent mb-1">
          {d.chiKicker}
        </p>
        <h2 className="text-lg font-semibold mb-2">{d.chiTitle}</h2>
        {d.chiParagraphs.map((p, i) => (
          <p
            key={i}
            className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl"
          >
            {p}
          </p>
        ))}
      </section>

      {/* Section B: Solar Cycle and Health Outcomes */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <p className="text-xs font-semibold tracking-widest text-accent mb-1">
          {d.solarKicker}
        </p>
        <h2 className="text-lg font-semibold mb-2">{d.solarTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl font-medium">
          {d.solarLead}
        </p>
        {d.solarParagraphs.map((p, i) => (
          <p
            key={i}
            className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl"
          >
            {p}
          </p>
        ))}
        <div className="mt-4 space-y-1">
          <p className="text-xs text-foreground-muted/60">
            <StudyCitation
              referenceId="solarhealth2026_heliobiology"
              locale={locale}
              label="Vencloviene et al. (2026) Heliobiology and Cardiovascular Health"
            />
          </p>
        </div>
      </section>

      {/* Section C: The Missing Mechanism */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <p className="text-xs font-semibold tracking-widest text-accent mb-1">
          {d.mechanismKicker}
        </p>
        <h2 className="text-lg font-semibold mb-2">{d.mechanismTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl font-medium">
          {d.mechanismLead}
        </p>
        {d.mechanismParagraphs.map((p, i) => (
          <p
            key={i}
            className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl"
          >
            {p}
          </p>
        ))}
      </section>

      {/* Section D: Frequency Matching */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <p className="text-xs font-semibold tracking-widest text-accent mb-1">
          {d.frequencyKicker}
        </p>
        <h2 className="text-lg font-semibold mb-2">{d.frequencyTitle}</h2>
        {d.frequencyParagraphs.map((p, i) => (
          <p
            key={i}
            className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl"
          >
            {p}
          </p>
        ))}
      </section>

      {/* Section E: BERM Interpretation */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <p className="text-xs font-semibold tracking-widest text-accent mb-1">
          {d.bermKicker}
        </p>
        <h2 className="text-lg font-semibold mb-2">{d.bermTitle}</h2>
        {d.bermParagraphs.map((p, i) => (
          <p
            key={i}
            className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl"
          >
            {p}
          </p>
        ))}
      </section>

      {/* Section F: Falsification criterion */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.falsificationTitle}</h2>
        <div className="rounded-lg border-2 border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.falsificationText}
          </p>
        </div>
      </section>

      {/* Navigation links */}
      <nav className="mt-14 border-t editorial-rule pt-6 flex flex-wrap gap-4">
        <Link
          href={`${prefix}/predictions`}
          className="text-sm text-accent hover:underline"
        >
          {d.navPredictions}
        </Link>
        <Link
          href={`${prefix}/model`}
          className="text-sm text-accent hover:underline"
        >
          {d.navModel}
        </Link>
        <Link
          href={`${prefix}/evidence`}
          className="text-sm text-accent hover:underline"
        >
          {d.navEvidence}
        </Link>
      </nav>
    </div>
  );
}
