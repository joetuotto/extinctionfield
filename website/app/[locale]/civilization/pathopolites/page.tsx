import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, UserX, Shield, Brain, Heart, Users, Scale } from "lucide-react";
import { pickCopy } from "@/lib/i18n";
import { TranslationNotice } from "@/components/TranslationNotice";
import { InlineReferenceText } from "@/components/InlineReferenceText";

const COPY = {
  en: {
    title: "Pathopolites",
    subtitle: "The citizen whose identity is built around pathology",
    heroLead:
      'Greek: pathos (suffering, disease) + polites (citizen). The pathological citizen. Not a person who happens to be ill, but one whose civic identity, moral authority, and social standing derive from vulnerability, trauma, or biological incapacity. When a population\'s endocrine substrates degrade far enough, victimhood becomes the most available basis for social recognition — because the hormonal infrastructure for competence-based recognition has been destroyed.',
    heroTrail:
      "This page maps six measurable dimensions of the pathopolites phenotype to their endocrine substrates. Each dimension is independently quantifiable from biomarker data. Together they describe a civic archetype that emerges not from ideology or culture, but from the biological consequences of electromagnetic exposure.",
    mechanismNote:
      "The root hormonal mechanism is described in Pathopege. The city-level compound effects are in Patopolis. The political-biological substrate is in Patokratia.",
    civilizationLink: "Back to Civilization",
    patopolisLink: "Patopolis",
    patokratiaLink: "Patokratia",
    patokinesisLink: "Patokinesis",

    sixDimTitle: "Six dimensions of the pathological citizen",
    sixDimLead:
      "The pathopolites is not a stereotype — it is a measurable phenotype. Each dimension maps to specific hormonal substrates, follows the EMF exposure gradient monotonically, and can be independently verified from biomarker data. The composite index is the geometric mean of all six dimensions: it reaches 0.089 in the Amish baseline and 0.581 in the urban office environment — a 6.5× increase that tracks electromagnetic infrastructure density.",
    sixDimScale:
      "Each dimension is normalized to [0, 1] where 0 represents no deviation from the pre-industrial endocrine baseline (estimated from Amish biomarker data and historical reference populations) and 1 represents maximum measurable degradation in any observed environment. The dimension score is computed from its listed substrate biomarkers using the formula specified in political_biology.py: multiplicative substrates (e.g. OXT × T for anomic distress) produce sharper gradients than additive substrates because degradation in either component collapses the product. The composite index uses the geometric mean rather than arithmetic mean because it penalizes imbalance — a population scoring 0.9 on one dimension and 0.1 on another is not equivalent to 0.5 on both.",

    dim1Title: "Victimhood identity",
    dim1Substrate: "T↓, DA↓, BDNF↓, CORT↑",
    dim1Desc:
      "Competence-based identity requires the biological capacity for competence: testosterone provides competitive drive and status-seeking, dopamine provides initiative and goal pursuit, BDNF provides cognitive flexibility and learning capacity. When all three decline simultaneously while cortisol rises, the individual loses the neurological machinery for building identity through achievement. Victimhood identity is not chosen — it is the default that remains when competence-based identity becomes biologically unavailable. The index measures the gap between the endocrine capacity for competence and the pre-industrial baseline.",
    dim1Amish: "0.164",
    dim1Urban: "0.674",
    dim1Ratio: "4.1×",

    dim2Title: "Safety-seeking",
    dim2Substrate: "CORT↑ × T↓",
    dim2Desc:
      "The demand for safety is proportional to the biological experience of threat — not the actual level of external danger. Cortisol elevation produces chronic threat activation: the amygdala interprets ambiguous stimuli as dangerous, the HPA axis sustains vigilance even in objectively safe environments. Simultaneously, testosterone decline removes the capacity for threat confrontation. The result is a population that perceives more danger, feels it more acutely, and has less biological capacity to respond directly. The political expression is demand for external threat management — expanded safety regulations, speech codes, trigger warnings, institutional protection from discomfort. These are not cultural preferences. They are the political outputs of a population whose threat-response system is chronically activated while its confrontation system is chronically suppressed.",
    dim2Amish: "0.042",
    dim2Urban: "0.539",
    dim2Ratio: "12.8×",

    dim3Title: "External locus of control",
    dim3Substrate: "DA↓, T↓, CORT↑",
    dim3Desc:
      "Internal locus — the sense that one can affect outcomes through one's own actions — requires dopaminergic drive (the expectation that effort produces reward) and testosterone (the impulse to act on that expectation). When dopamine declines, effort feels less connected to outcome. When testosterone declines, the impulse to initiate action weakens. When cortisol rises, the perceived cost of action increases. The shift toward external locus is not a philosophical conclusion about determinism — it is the subjective experience of having reduced neurological capacity for agency. A population with degraded dopaminergic and androgenic function will attribute outcomes to systems, structures, and external forces — because the biological substrate for experiencing personal agency has been suppressed.",
    dim3Amish: "0.202",
    dim3Urban: "0.672",
    dim3Ratio: "3.3×",

    dim4Title: "Cognitive fragility",
    dim4Substrate: "BDNF↓, T↓, MEL↓",
    dim4Desc:
      "Antifragility — the capacity to strengthen under stress — requires BDNF (synaptic plasticity and stress-adaptive neurogenesis), testosterone (challenge-seeking behavior), and melatonin (restorative sleep that consolidates stress adaptation). When all three decline, cognitive systems become fragile rather than antifragile: stress degrades function instead of building capacity. The experience is genuine — challenging ideas, uncomfortable information, and social friction are genuinely more aversive when the neurological machinery for processing them has been degraded. This is not weakness of character. It is reduced synaptic plasticity. The demand for intellectual protection (content warnings, safe spaces, reduced academic rigor) follows directly from reduced biological capacity to benefit from intellectual challenge.",
    dim4Amish: "0.039",
    dim4Urban: "0.480",
    dim4Ratio: "12.3×",

    dim5Title: "Anomic distress",
    dim5Substrate: "OXT↓ × T↓, CORT↑",
    dim5Desc:
      "Belonging requires oxytocin (trust and social bonding) potentiated by testosterone (the capacity for reciprocal commitment and group defense). When the OXT×T interaction collapses, the individual experiences chronic exclusion regardless of actual social inclusion. This is not loneliness in the ordinary sense — it is the biological incapacity to convert social contact into felt belonging. Cortisol elevation adds threat-valence to social interaction itself. The result is anomie in Durkheim's precise sense: the disintegration of social norms and bonds at the individual level. Anomic distress is the highest-scoring dimension across the gradient (0.842 at urban office) because it depends on a multiplicative interaction — both components must be present for belonging, and degradation in either one destroys the product.",
    dim5Amish: "0.104",
    dim5Urban: "0.842",
    dim5Ratio: "8.1×",

    dim6Title: "Moral compensation",
    dim6Substrate: "Care without binding foundations",
    dim6Desc:
      "When the binding moral foundations (Loyalty, Authority, Sanctity) collapse — because their testosterone and multiplicative substrates are the most EMF-sensitive — Care remains as the last functional moral foundation. The pathopolites then expresses all moral energy through the one channel that remains operational. This produces the characteristic pattern: intense moral concern expressed exclusively as care for identified victims, without the structural foundations (loyalty to specific groups, respect for authority, sense of the sacred) that channel moral energy into institution-building. The moral impulse is genuine — it is the moral architecture that has been amputated. The index measures the imbalance between care and binding foundations and the overall structural deficit in moral foundations.",
    dim6Amish: "0.091",
    dim6Urban: "0.390",
    dim6Ratio: "4.3×",

    gradientTitle: "Pathopolites gradient",
    gradientLead:
      "Every dimension intensifies monotonically from the Amish baseline to the urban office environment. The composite pathopolites index shows a 6.5× increase — the same genome, separated by electromagnetic environment, produces radically different civic phenotypes. The EMF column is a relative multiplier where 1.00× = median suburban power density (~0.1–1.0 V/m aggregate from infrastructure, devices, and ambient sources). Amish environments at 0.05× approximate pre-electrification background. Urban office at 1.80× reflects dense infrastructure, WiFi, fluorescent lighting, and device proximity.",
    gradientEnv: "Environment",
    gradientEMF: "EMF",
    gradientIndex: "Index",
    gradientVictim: "Victim",
    gradientSafety: "Safety",
    gradientExternal: "External",
    gradientFragility: "Fragility",
    gradientAnomie: "Anomie",
    gradientMoral: "Moral",

    emergenceTitle: "How the pathopolites emerges",
    emergenceLead:
      "The pathopolites is not a character flaw or a cultural product. It is the predictable phenotypic output of an endocrine environment. The sequence is:",
    emergenceSteps: [
      "EMF environment degrades VGCC-dependent hormones (T, OXT, DA, BDNF, MEL) while elevating cortisol through chronic HPA activation.",
      "Competence substrates collapse first (T + DA are the most EMF-sensitive), removing the biological basis for achievement-based identity.",
      "Threat perception intensifies (CORT↑) while confrontation capacity declines (T↓), producing chronic vulnerability without the tools to resolve it.",
      "Social bonding substrate collapses (OXT×T interaction), producing anomie — the inability to convert social contact into felt belonging.",
      "Binding moral foundations collapse (Loyalty, Authority, Sanctity depend on the most fragile substrates), leaving only Care as an operational moral channel.",
      "The individual constructs civic identity from the only materials biologically available: vulnerability, moral sensitivity to suffering, and demand for external protection.",
    ],
    emergenceConclusion:
      "This is not a choice, a strategy, or a cultural position. It is what remains when the endocrine substrates for the alternatives have been destroyed. The pathopolites does not decide to build identity around victimhood any more than a person with a severed leg decides not to run. The substrate is missing.",

    feedbackTitle: "The pathopolites feedback loop",
    feedbackLead:
      "The pathopolites phenotype is self-reinforcing through three mechanisms:",
    feedbackLoops: [
      {
        title: "Environmental selection",
        detail:
          "The safety-seeking dimension drives migration toward protected environments (cities, institutions, online spaces) — which are precisely the highest-EMF environments. The demand for safety produces more of the condition that produces the demand.",
      },
      {
        title: "Institutional capture",
        detail:
          "Pathopolites concentrate in meaning-making institutions (media, academia, HR, policy) because these institutions reward verbal-moral sensitivity over physical-competitive capacity. Once concentrated, they reshape institutional norms to match their endocrine phenotype — expanding harm definitions, lowering confrontation thresholds, and institutionalizing external locus of control.",
      },
      {
        title: "Intergenerational amplification",
        detail:
          "Children raised by pathopolites parents inherit both the epigenetic damage (CaMKII-mediated methylation) and the social environment (high EMF, low physical challenge, expanded threat definitions). Each generation starts from a lower baseline and experiences a social environment calibrated to an even lower one.",
      },
    ],

    moralDistressTitle: "Moral distress index",
    moralDistressLead:
      "The pathopolites experiences genuine moral suffering — not performative, not strategic. The moral distress index measures the gap between moral sensitivity (which remains intact or increases via Care foundation) and moral capacity (which collapses as binding foundations degrade). At 0.577 in the urban office environment, this represents a population where moral feeling exceeds moral structure by a factor that produces chronic unresolvable distress.",
    moralDistressExplain:
      "This is the mechanism behind the observed phenomenon of intense moral outrage combined with ineffective moral action. The outrage is biologically real — the capacity to channel it into structural solutions has been endocrine-amputated. The pathopolites is not faking distress. The distress is the authentic output of a moral system where input exceeds processing capacity.",

    predictionsTitle: "Predictions",
    pred1:
      "Pathopolites index correlates with individual hormonal profiles (T, OXT, DA, CORT, BDNF, MEL) after controlling for demographics, personality, and stated political orientation.",
    pred2:
      "Low-EMF communities (Amish, rural) produce fewer pathopolites phenotypes than demographically matched urban populations, independent of cultural factors.",
    pred3:
      "Institutional concentration: pathopolites phenotype is overrepresented in meaning-making institutions (media, academia, HR, NGOs) relative to production institutions (agriculture, construction, manufacturing), and this overrepresentation correlates with the EMF density differential between these workplace types.",
    pred4:
      "Intergenerational amplification: second-generation urban-raised individuals show higher pathopolites index than first-generation rural-to-urban migrants at the same age, even after controlling for socioeconomic status.",

    litTitle: "Literature",
    lit: [
      "[[ref:campbell_manning2018_victimhood|Campbell & Manning (2018)]]: The Rise of Victimhood Culture. Documents the shift from dignity culture to victimhood culture — BERM provides the biological mechanism.",
      "[[ref:lukianoff_haidt2018_coddling|Lukianoff & Haidt (2018)]]: The Coddling of the American Mind. Describes cognitive fragility and safety-seeking in university populations. The endocrine substrate for antifragility is absent.",
      "[[ref:durkheim1897_suicide|Durkheim (1897)]]: Suicide. Anomie as the breakdown of social norms. The OXT×T interaction provides the biological substrate for belonging that Durkheim described sociologically.",
      "[[ref:baumeister2012_need_to_belong|Baumeister (2012)]]: Need-to-belong theory. Social belonging requires neurological capacity — not just social opportunity. OXT×T interaction is that capacity.",
      "[[ref:twenge2017_igen|Twenge (2017)]]: iGen. Generational shift toward safety-seeking, fragility, external locus. BERM identifies the EMF substrate beneath the smartphone-correlation.",
      "[[ref:haidt2012_righteous_mind|Haidt (2012)]]: The Righteous Mind. Moral foundation asymmetry between liberals and conservatives maps to differential biomarker degradation of binding vs individualizing substrates.",
    ],

    modelDerived: "Model-derived values from BioCap integral, not directly measured.",
    modelDerivedLink: "mathematical specification",
  },
  fi: {
    title: "Pathopolites",
    subtitle: "Kansalainen, jonka identiteetti rakentuu patologian ympärille",
    heroLead:
      'Kreikka: pathos (kärsimys, sairaus) + polites (kansalainen). Patologinen kansalainen. Ei henkilö, joka sattuu olemaan sairas, vaan sellainen, jonka kansalaisidentiteetti, moraalinen auktoriteetti ja sosiaalinen asema perustuvat haavoittuvuuteen, traumaan tai biologiseen kyvyttömyyteen. Kun väestön endokriiniset substraatit rapautuvat riittävästi, uhriudesta tulee saavutettavin perusta sosiaaliselle tunnustukselle — koska kompetenssipohjaisen tunnustuksen hormonaalinen infrastruktuuri on tuhoutunut.',
    heroTrail:
      "Tämä sivu kartoittaa kuusi mitattavaa pathopolites-fenotyypin ulottuvuutta niiden endokriinisiin substraatteihin. Jokainen ulottuvuus on itsenäisesti kvantifioitavissa biomarkkeridatasta. Yhdessä ne kuvaavat kansalaisarkkityyppiä, joka syntyy biologisista seurauksista — ei ideologiasta tai kulttuurista.",
    mechanismNote:
      "Juurihormonaalinen mekanismi kuvataan Pathopege-sivulla. Kaupunkitason yhdistelmävaikutukset ovat Patopoliksessa. Poliittis-biologinen substraatti on Patokratiassa.",
    civilizationLink: "Takaisin Sivilisaatioon",
    patopolisLink: "Patopolis",
    patokratiaLink: "Patokratia",
    patokinesisLink: "Patokinesis",

    sixDimTitle: "Patologisen kansalaisen kuusi ulottuvuutta",
    sixDimLead:
      "Pathopolites ei ole stereotypia — se on mitattava fenotyyppi. Jokainen ulottuvuus kartoittuu spesifisiin hormonaalisiin substraatteihin, seuraa EMF-altistusgradientia monotonisesti ja on itsenäisesti verifioitavissa biomarkkeridatasta. Komposiitti-indeksi on kaikkien kuuden ulottuvuuden geometrinen keskiarvo: se saavuttaa 0,089 amish-perustasolla ja 0,581 urbaanissa toimistoympäristössä — 6,5-kertainen kasvu, joka seuraa sähkömagneettisen infrastruktuurin tiheyttä.",
    sixDimScale:
      "Jokainen ulottuvuus on normalisoitu välille [0, 1], jossa 0 tarkoittaa nollapoikkeamaa esiteollisesta endokriinisesta perustasosta (estimoitu amish-biomarkkeridatasta ja historiallisista referenssipopulaatioista) ja 1 maksimaalista mitattua degradaatiota missä tahansa havaitussa ympäristössä. Ulottuvuuspiste lasketaan listatuista substraattibiomarkkereista political_biology.py:ssä spesifioidulla kaavalla: multiplikatiiviset substraatit (esim. OXT × T anomiselle distressille) tuottavat jyrkemmät gradientit kuin additiiviset koska minkä tahansa komponentin degradaatio romanduttaa tulon. Komposiitti-indeksi käyttää geometrista keskiarvoa aritmeettisen sijaan koska se rankaisee epätasapainosta — populaatio jolla yhdessä ulottuvuudessa 0,9 ja toisessa 0,1 ei ole ekvivalentti 0,5:n kanssa molemmissa.",

    dim1Title: "Uhri-identiteetti",
    dim1Substrate: "T↓, DA↓, BDNF↓, CORT↑",
    dim1Desc:
      "Kompetenssipohjainen identiteetti vaatii biologista kompetenssikykyä: testosteroni tuottaa kilpailuvietin ja statuksen tavoittelun, dopamiini tuottaa aloitekyvyn ja tavoitteen ajon, BDNF tuottaa kognitiivisen joustavuuden ja oppimiskyvyn. Kun kaikki kolme laskevat samanaikaisesti kortisolin noustessa, yksilö menettää neurologisen koneiston identiteetin rakentamiseen saavutusten kautta. Uhri-identiteetti ei ole valinta — se on oletusarvo, joka jää jäljelle kun kompetenssipohjainen identiteetti muuttuu biologisesti saavuttamattomaksi.",
    dim1Amish: "0,164",
    dim1Urban: "0,674",
    dim1Ratio: "4,1×",

    dim2Title: "Turvallisuushakuisuus",
    dim2Substrate: "CORT↑ × T↓",
    dim2Desc:
      "Turvallisuuden vaatimus on suhteessa biologiseen uhkakokemukseen — ei todelliseen ulkoisen vaaran tasoon. Kortisolinousu tuottaa kroonisen uhka-aktivaation: amygdala tulkitsee monitulkintaiset ärsykkeet vaarallisiksi, HPA-akseli ylläpitää valppautta objektiivisesti turvallisissa ympäristöissä. Samanaikaisesti testosteronin lasku poistaa kyvyn uhkan kohtaamiseen. Tuloksena väestö, joka havaitsee enemmän vaaraa, kokee sen voimakkaammin ja jolla on vähemmän biologista kykyä reagoida suoraan. Poliittinen ilmaus on vaatimus ulkoisesta uhkahallinnasta — laajennetut turvallisuussäännökset, puhekoodit, sisältövaroitukset, institutionaalinen suoja epämukavuudelta.",
    dim2Amish: "0,042",
    dim2Urban: "0,539",
    dim2Ratio: "12,8×",

    dim3Title: "Ulkoinen hallintakäsitys",
    dim3Substrate: "DA↓, T↓, CORT↑",
    dim3Desc:
      "Sisäinen hallintakäsitys — tunne siitä, että omilla toimilla voi vaikuttaa lopputuloksiin — vaatii dopaminergistä viettiä (odotus siitä, että ponnistelu tuottaa palkkion) ja testosteronia (impulssikyvyn toimia odotuksen pohjalta). Kun dopamiini laskee, ponnistelu tuntuu vähemmän yhteydessä lopputulokseen. Kun testosteroni laskee, aloitekyky heikkenee. Kun kortisoli nousee, toiminnan koettu kustannus kasvaa. Siirtymä ulkoiseen hallintakäsitykseen ei ole filosofinen johtopäätös determinismistä — se on subjektiivinen kokemus vähentyneestä neurologisesta toimijuuskyvystä.",
    dim3Amish: "0,202",
    dim3Urban: "0,672",
    dim3Ratio: "3,3×",

    dim4Title: "Kognitiivinen hauraus",
    dim4Substrate: "BDNF↓, T↓, MEL↓",
    dim4Desc:
      "Antifragiilius — kyky vahvistua stressin alla — vaatii BDNF:ää (synaptinen plastisuus ja stressiadaptiivinen neurogeneesi), testosteronia (haastehakuinen käyttäytyminen) ja melatoniinia (palauttava uni, joka konsolidoi stressiadaptaation). Kun kaikki kolme laskevat, kognitiiviset järjestelmät muuttuvat hauraaksi antifragiilin sijaan: stressi heikentää toimintaa kapasiteetin rakentamisen sijaan. Kokemus on aito — haastavat ajatukset, epämukava tieto ja sosiaalinen kitka ovat aidosti vastenmielisempiä kun neurologinen koneisto niiden käsittelemiseen on rappeutunut.",
    dim4Amish: "0,039",
    dim4Urban: "0,480",
    dim4Ratio: "12,3×",

    dim5Title: "Anominen ahdistus",
    dim5Substrate: "OXT↓ × T↓, CORT↑",
    dim5Desc:
      "Kuuluminen vaatii oksitosiinia (luottamus ja sosiaalinen kiintymys) testosteronin vahvistamana (kyky vastavuoroiseen sitoutumiseen ja ryhmäpuolustukseen). Kun OXT×T-vuorovaikutus romahtaa, yksilö kokee kroonista ulossulkemista todellisesta sosiaalisesta osallisuudesta riippumatta. Tämä ei ole yksinäisyyttä tavanomaisessa mielessä — se on biologinen kyvyttömyys muuntaa sosiaalista kontaktia koetuksi kuulumiseksi. Anominen ahdistus on korkeimmin pisteytetty ulottuvuus koko gradientilla (0,842 urbaanissa toimistossa) koska se riippuu multiplikatiivisesta vuorovaikutuksesta — molempien komponenttien on oltava läsnä kuulumiselle.",
    dim5Amish: "0,104",
    dim5Urban: "0,842",
    dim5Ratio: "8,1×",

    dim6Title: "Moraalinen kompensointi",
    dim6Substrate: "Hoiva ilman sitovia perusteita",
    dim6Desc:
      "Kun sitovat moraaliperusteet (Lojaalisuus, Auktoriteetti, Pyhyys) romahtavat — koska niiden testosteroni- ja multiplikatiiviset substraatit ovat EMF-herkimpiä — Hoiva jää viimeiseksi toimivaksi moraaliseksi perusteeksi. Pathopolites ilmaisee tällöin kaiken moraalisen energian yhden jäljelle jäävän toimivan kanavan kautta. Tämä tuottaa luonteenomaisen kaavan: intensiivinen moraalinen huoli ilmaistaan yksinomaan identifioitujen uhrien hoivana, ilman rakenteellisia perusteita jotka kanavoisivat moraalista energiaa instituutioiden rakentamiseen. Moraalinen impulssi on aito — amputoiduksi on tullut moraalinen arkkitehtuuri.",
    dim6Amish: "0,091",
    dim6Urban: "0,390",
    dim6Ratio: "4,3×",

    gradientTitle: "Pathopolites-gradientti",
    gradientLead:
      "Jokainen ulottuvuus voimistuu monotonisesti amish-perustasolta urbaaniin toimistoympäristöön. Komposiitti-pathopolites-indeksi osoittaa 6,5-kertaisen kasvun — sama genomi, erotettuna sähkömagneettisen ympäristön mukaan, tuottaa radikaalisti erilaisia kansalaisfenotyyppejä. EMF-sarake on suhteellinen kerroin jossa 1,00× = esikaupunkialueen mediaani tehontiheys (~0,1–1,0 V/m aggregaatti infrastruktuurista, laitteista ja taustalähetyksistä). Amish-ympäristöt 0,05×:llä vastaavat esisähköistämisen taustaa. Urbaani toimisto 1,80×:llä heijastaa tiheää infrastruktuuria, WiFi-verkkoja, loisteputkivalaistusta ja laitteiden läheisyyttä.",
    gradientEnv: "Ympäristö",
    gradientEMF: "EMF",
    gradientIndex: "Indeksi",
    gradientVictim: "Uhri",
    gradientSafety: "Turvallisuus",
    gradientExternal: "Ulkoinen",
    gradientFragility: "Hauraus",
    gradientAnomie: "Anomia",
    gradientMoral: "Moraali",

    emergenceTitle: "Miten pathopolites syntyy",
    emergenceLead:
      "Pathopolites ei ole luonteenvika tai kulttuurituote. Se on ennustettava fenotyyppinen tuotos endokriinisestä ympäristöstä. Vaiheittain:",
    emergenceSteps: [
      "EMF-ympäristö rappeuttaa VGCC-riippuvaiset hormonit (T, OXT, DA, BDNF, MEL) samalla nostaen kortisolia kroonisen HPA-aktivaation kautta.",
      "Kompetenssisubstraatit romahtavat ensin (T + DA ovat EMF-herkimpiä), poistaen biologisen perustan saavutuspohjaiselle identiteetille.",
      "Uhkahavainto voimistuu (CORT↑) samalla kun kohtaamiskyky laskee (T↓), tuottaen kroonisen haavoittuvuuden ilman työkaluja sen ratkaisemiseen.",
      "Sosiaalisen kiintymyksen substraatti romahtaa (OXT×T-vuorovaikutus), tuottaen anomian — kyvyttömyyden muuntaa sosiaalista kontaktia koetuksi kuulumiseksi.",
      "Sitovat moraaliperusteet romahtavat (Lojaalisuus, Auktoriteetti, Pyhyys riippuvat hauraimmista substraateista), jättäen vain Hoivan toimivaksi moraaliseksi kanavaksi.",
      "Yksilö rakentaa kansalaisidentiteetin ainoista biologisesti saatavilla olevista materiaaleista: haavoittuvuudesta, moraalisesta herkkyydestä kärsimykselle ja ulkoisen suojelun vaatimuksesta.",
    ],
    emergenceConclusion:
      "Tämä ei ole valinta, strategia tai kulttuurinen positio. Se on se, mikä jää jäljelle kun vaihtoehtojen endokriiniset substraatit on tuhottu. Pathopolites ei päätä rakentaa identiteettiä uhriuden ympärille sen enempää kuin jalkansa menettänyt päättää olla juoksematta. Substraatti puuttuu.",

    feedbackTitle: "Pathopolites-takaisinkytkentäsilmukka",
    feedbackLead:
      "Pathopolites-fenotyyppi vahvistaa itseään kolmen mekanismin kautta:",
    feedbackLoops: [
      {
        title: "Ympäristövalinta",
        detail:
          "Turvallisuushakuisuus ohjaa muuttoa suojeltuihin ympäristöihin (kaupungit, instituutiot, verkkotilat) — jotka ovat juuri korkeimman EMF-altistuksen ympäristöjä. Turvallisuuden vaatimus tuottaa lisää olosuhteita, jotka tuottavat turvallisuuden vaatimusta.",
      },
      {
        title: "Institutionaalinen kaappaus",
        detail:
          "Pathopolites-fenotyypit keskittyvät merkityksentuotannon instituutioihin (media, akatemia, HR, politiikka) koska nämä instituutiot palkitsevat verbaal-moraalista herkkyyttä fyysis-kilpailullisen kyvyn sijaan. Keskityttyään ne muokkaavat institutionaalisia normeja vastaamaan endokriinistä fenotyyppiään.",
      },
      {
        title: "Ylisukupolvinen vahvistuminen",
        detail:
          "Pathopolites-vanhempien lapset perivät sekä epigeneettisen vaurion (CaMKII-välitteinen metylaatio) että sosiaalisen ympäristön (korkea EMF, vähän fyysistä haastetta, laajennetut uhkamääritelmät). Jokainen sukupolvi lähtee alemmalta perustasolta.",
      },
    ],

    moralDistressTitle: "Moraalisen ahdistuksen indeksi",
    moralDistressLead:
      "Pathopolites kokee aitoa moraalista kärsimystä — ei esitettyä, ei strategista. Moraalisen ahdistuksen indeksi mittaa kuilua moraalisen herkkyyden (joka säilyy tai kasvaa Hoiva-perustan kautta) ja moraalisen kapasiteetin (joka romahtaa sitovien perusteiden rappeutuessa) välillä. Arvolla 0,577 urbaanissa toimistoympäristössä tämä edustaa väestöä, jossa moraalinen tunne ylittää moraalisen rakenteen kertoimella, joka tuottaa kroonista ratkaisematonta ahdistusta.",
    moralDistressExplain:
      "Tämä on mekanismi intensiivisen moraalisen raivon ja tehottoman moraalisen toiminnan yhdistelmän takana. Raivo on biologisesti aito — kyky kanavoida se rakenteellisiin ratkaisuihin on endokriinisesti amputoitu.",

    predictionsTitle: "Ennusteet",
    pred1:
      "Pathopolites-indeksi korreloi yksilöllisten hormoniprofiilien (T, OXT, DA, CORT, BDNF, MEL) kanssa demografisten, persoonallisuus- ja poliittisten kontrollien jälkeen.",
    pred2:
      "Matalan EMF:n yhteisöt (amish, maaseutu) tuottavat vähemmän pathopolites-fenotyyppejä kuin demografisesti vastaavat urbaanit väestöt, kulttuurisista tekijöistä riippumatta.",
    pred3:
      "Institutionaalinen keskittyminen: pathopolites-fenotyyppi on yliedustettu merkityksentuotannon instituutioissa (media, akatemia, HR, kansalaisjärjestöt) suhteessa tuotantoinstituutioihin (maatalous, rakentaminen, valmistus), ja tämä yliedustus korreloi työpaikkatyyppien EMF-tiheyseron kanssa.",
    pred4:
      "Ylisukupolvinen vahvistuminen: toisen sukupolven urbaanissa kasvaneet osoittavat korkeampaa pathopolites-indeksiä kuin ensimmäisen sukupolven maaseudulta muuttaneet samassa iässä, sosioekonomisen aseman kontrolloimisen jälkeen.",

    litTitle: "Kirjallisuus",
    lit: [
      "[[ref:campbell_manning2018_victimhood|Campbell & Manning (2018)]]: The Rise of Victimhood Culture. Dokumentoi siirtymän arvokkuuskulttuurista uhrikulttuuriin — BERM tarjoaa biologisen mekanismin.",
      "[[ref:lukianoff_haidt2018_coddling|Lukianoff & Haidt (2018)]]: The Coddling of the American Mind. Kuvaa kognitiivista haurautta ja turvallisuushakuisuutta yliopistoväestöissä. Antifragiiliuden endokriininen substraatti puuttuu.",
      "[[ref:durkheim1897_suicide|Durkheim (1897)]]: Suicide. Anomia sosiaalisten normien ja siteiden hajoamisena. OXT×T-vuorovaikutus tarjoaa biologisen substraatin kuulumiselle, jonka Durkheim kuvasi sosiologisesti.",
      "[[ref:baumeister2012_need_to_belong|Baumeister (2012)]]: Kuulumistarve-teoria. Sosiaalinen kuuluminen vaatii neurologista kykyä — ei pelkkää sosiaalista mahdollisuutta.",
      "[[ref:twenge2017_igen|Twenge (2017)]]: iGen. Sukupolvisiirtymä turvallisuushakuisuuteen, haurauteen, ulkoiseen hallintakäsitykseen. BERM tunnistaa EMF-substraatin älypuhelinkorrelaation takana.",
      "[[ref:haidt2012_righteous_mind|Haidt (2012)]]: The Righteous Mind. Moraaliperusteiden epäsymmetria liberaalien ja konservatiivien välillä kartoittuu sitovien vs. yksilöllistävien substraattien eriytyneeseen rappeutumiseen.",
    ],

    modelDerived: "Mallin tuottamia arvoja BioCap-integraalista, ei suoraan mitattuja.",
    modelDerivedLink: "matemaattinen spesifikaatio",
  },
  ja: {
    title: "パトポリテース",
    subtitle: "病理を中心にアイデンティティを構築する市民",
    heroLead: "ギリシャ語: pathos（苦痛、病気）+ polites（市民）。病理的市民。",
    heroTrail: "このページでは、パトポリテース表現型の6つの測定可能な次元を内分泌基質にマッピングします。",
    mechanismNote: "根本的なホルモンメカニズムはPathopegeで説明されています。",
    civilizationLink: "文明に戻る",
    patopolisLink: "パトポリス",
    patokratiaLink: "パトクラティア",
    patokinesisLink: "パトキネシス",
    sixDimTitle: "病理的市民の6つの次元",
    sixDimLead: "パトポリテースはステレオタイプではなく、測定可能な表現型です。",
    sixDimScale: "",
    dim1Title: "被害者アイデンティティ", dim1Substrate: "T↓, DA↓, BDNF↓, CORT↑",
    dim1Desc: "能力に基づくアイデンティティには、能力のための生物学的基盤が必要です。", dim1Amish: "0.164", dim1Urban: "0.674", dim1Ratio: "4.1×",
    dim2Title: "安全追求", dim2Substrate: "CORT↑ × T↓",
    dim2Desc: "安全への要求は、実際の外的危険のレベルではなく、脅威の生物学的経験に比例します。", dim2Amish: "0.042", dim2Urban: "0.539", dim2Ratio: "12.8×",
    dim3Title: "外的統制", dim3Substrate: "DA↓, T↓, CORT↑",
    dim3Desc: "内的統制には、ドーパミン駆動力とテストステロンが必要です。", dim3Amish: "0.202", dim3Urban: "0.672", dim3Ratio: "3.3×",
    dim4Title: "認知的脆弱性", dim4Substrate: "BDNF↓, T↓, MEL↓",
    dim4Desc: "抗脆弱性にはBDNF、テストステロン、メラトニンが必要です。", dim4Amish: "0.039", dim4Urban: "0.480", dim4Ratio: "12.3×",
    dim5Title: "アノミー的苦痛", dim5Substrate: "OXT↓ × T↓, CORT↑",
    dim5Desc: "帰属にはオキシトシンとテストステロンの相互作用が必要です。", dim5Amish: "0.104", dim5Urban: "0.842", dim5Ratio: "8.1×",
    dim6Title: "道徳的補償", dim6Substrate: "拘束的基盤なしのケア",
    dim6Desc: "拘束的道徳基盤が崩壊すると、ケアが最後の機能的道徳チャネルとして残ります。", dim6Amish: "0.091", dim6Urban: "0.390", dim6Ratio: "4.3×",
    gradientTitle: "パトポリテース勾配", gradientLead: "すべての次元がアーミッシュの基準線から都市オフィス環境まで単調に増加します。",
    gradientEnv: "環境", gradientEMF: "EMF", gradientIndex: "指数", gradientVictim: "被害者", gradientSafety: "安全", gradientExternal: "外的", gradientFragility: "脆弱性", gradientAnomie: "アノミー", gradientMoral: "道徳",
    emergenceTitle: "パトポリテースの出現過程", emergenceLead: "パトポリテースは性格の欠陥でも文化的産物でもありません。", emergenceSteps: [], emergenceConclusion: "",
    feedbackTitle: "フィードバックループ", feedbackLead: "パトポリテース表現型は自己強化的です。", feedbackLoops: [],
    moralDistressTitle: "道徳的苦痛指数", moralDistressLead: "パトポリテースは本物の道徳的苦痛を経験します。", moralDistressExplain: "",
    predictionsTitle: "予測", pred1: "", pred2: "", pred3: "", pred4: "",
    litTitle: "文献", lit: [],
    modelDerived: "",
    modelDerivedLink: "",
  },
  fr: {
    title: "Pathopolites",
    subtitle: "Le citoyen dont l'identite est construite autour de la pathologie",
    heroLead: "Grec: pathos (souffrance, maladie) + polites (citoyen). Le citoyen pathologique.",
    heroTrail: "Cette page cartographie six dimensions mesurables du phenotype pathopolites a leurs substrats endocriniens.",
    mechanismNote: "Le mecanisme hormonal racine est decrit dans Pathopege.",
    civilizationLink: "Retour a Civilisation",
    patopolisLink: "Patopolis",
    patokratiaLink: "Patokratia",
    patokinesisLink: "Patokinesis",
    sixDimTitle: "Six dimensions du citoyen pathologique",
    sixDimLead: "Le pathopolites n'est pas un stereotype — c'est un phenotype mesurable.",
    sixDimScale: "",
    dim1Title: "Identite victimaire", dim1Substrate: "T↓, DA↓, BDNF↓, CORT↑",
    dim1Desc: "L'identite basee sur la competence necessite la capacite biologique pour la competence.", dim1Amish: "0.164", dim1Urban: "0.674", dim1Ratio: "4.1×",
    dim2Title: "Recherche de securite", dim2Substrate: "CORT↑ × T↓",
    dim2Desc: "La demande de securite est proportionnelle a l'experience biologique de la menace.", dim2Amish: "0.042", dim2Urban: "0.539", dim2Ratio: "12.8×",
    dim3Title: "Locus de controle externe", dim3Substrate: "DA↓, T↓, CORT↑",
    dim3Desc: "Le locus interne necessite la pulsion dopaminergique et la testosterone.", dim3Amish: "0.202", dim3Urban: "0.672", dim3Ratio: "3.3×",
    dim4Title: "Fragilite cognitive", dim4Substrate: "BDNF↓, T↓, MEL↓",
    dim4Desc: "L'antifragilite necessite BDNF, testosterone et melatonine.", dim4Amish: "0.039", dim4Urban: "0.480", dim4Ratio: "12.3×",
    dim5Title: "Detresse anomique", dim5Substrate: "OXT↓ × T↓, CORT↑",
    dim5Desc: "L'appartenance necessite l'interaction ocytocine×testosterone.", dim5Amish: "0.104", dim5Urban: "0.842", dim5Ratio: "8.1×",
    dim6Title: "Compensation morale", dim6Substrate: "Soin sans fondations liantes",
    dim6Desc: "Quand les fondations morales liantes s'effondrent, le Soin reste comme dernier canal moral fonctionnel.", dim6Amish: "0.091", dim6Urban: "0.390", dim6Ratio: "4.3×",
    gradientTitle: "Gradient pathopolites", gradientLead: "Toutes les dimensions s'intensifient de facon monotone.",
    gradientEnv: "Environnement", gradientEMF: "EMF", gradientIndex: "Indice", gradientVictim: "Victime", gradientSafety: "Securite", gradientExternal: "Externe", gradientFragility: "Fragilite", gradientAnomie: "Anomie", gradientMoral: "Morale",
    emergenceTitle: "Emergence du pathopolites", emergenceLead: "Le pathopolites n'est pas un defaut de caractere.", emergenceSteps: [], emergenceConclusion: "",
    feedbackTitle: "Boucle de retroaction", feedbackLead: "Le phenotype pathopolites est auto-renforcant.", feedbackLoops: [],
    moralDistressTitle: "Indice de detresse morale", moralDistressLead: "Le pathopolites eprouve une veritable souffrance morale.", moralDistressExplain: "",
    predictionsTitle: "Predictions", pred1: "", pred2: "", pred3: "", pred4: "",
    litTitle: "Litterature", lit: [],
    modelDerived: "",
    modelDerivedLink: "",
  },
  ko: {
    title: "파토폴리테스",
    subtitle: "병리를 중심으로 정체성을 구축하는 시민",
    heroLead: "그리스어: pathos (고통, 질병) + polites (시민). 병리적 시민.",
    heroTrail: "이 페이지는 파토폴리테스 표현형의 6가지 측정 가능한 차원을 내분비 기질에 매핑합니다.",
    mechanismNote: "근본 호르몬 메커니즘은 Pathopege에 설명되어 있습니다.",
    civilizationLink: "문명으로 돌아가기",
    patopolisLink: "파토폴리스",
    patokratiaLink: "파토크라티아",
    patokinesisLink: "파토키네시스",
    sixDimTitle: "병리적 시민의 6가지 차원",
    sixDimLead: "파토폴리테스는 고정관념이 아니라 측정 가능한 표현형입니다.",
    sixDimScale: "",
    dim1Title: "피해자 정체성", dim1Substrate: "T↓, DA↓, BDNF↓, CORT↑",
    dim1Desc: "역량 기반 정체성에는 역량을 위한 생물학적 기반이 필요합니다.", dim1Amish: "0.164", dim1Urban: "0.674", dim1Ratio: "4.1×",
    dim2Title: "안전 추구", dim2Substrate: "CORT↑ × T↓",
    dim2Desc: "안전에 대한 요구는 실제 외부 위험 수준이 아닌 위협의 생물학적 경험에 비례합니다.", dim2Amish: "0.042", dim2Urban: "0.539", dim2Ratio: "12.8×",
    dim3Title: "외적 통제 소재", dim3Substrate: "DA↓, T↓, CORT↑",
    dim3Desc: "내적 통제 소재에는 도파민 추진력과 테스토스테론이 필요합니다.", dim3Amish: "0.202", dim3Urban: "0.672", dim3Ratio: "3.3×",
    dim4Title: "인지적 취약성", dim4Substrate: "BDNF↓, T↓, MEL↓",
    dim4Desc: "항취약성에는 BDNF, 테스토스테론, 멜라토닌이 필요합니다.", dim4Amish: "0.039", dim4Urban: "0.480", dim4Ratio: "12.3×",
    dim5Title: "아노미적 고통", dim5Substrate: "OXT↓ × T↓, CORT↑",
    dim5Desc: "소속감에는 옥시토신과 테스토스테론의 상호작용이 필요합니다.", dim5Amish: "0.104", dim5Urban: "0.842", dim5Ratio: "8.1×",
    dim6Title: "도덕적 보상", dim6Substrate: "결합 기반 없는 돌봄",
    dim6Desc: "결합 도덕 기반이 붕괴되면 돌봄이 마지막 기능적 도덕 채널로 남습니다.", dim6Amish: "0.091", dim6Urban: "0.390", dim6Ratio: "4.3×",
    gradientTitle: "파토폴리테스 기울기", gradientLead: "모든 차원이 아미쉬 기준선에서 도시 사무실 환경까지 단조롭게 증가합니다.",
    gradientEnv: "환경", gradientEMF: "EMF", gradientIndex: "지수", gradientVictim: "피해자", gradientSafety: "안전", gradientExternal: "외적", gradientFragility: "취약성", gradientAnomie: "아노미", gradientMoral: "도덕",
    emergenceTitle: "파토폴리테스의 출현", emergenceLead: "파토폴리테스는 성격 결함이 아닙니다.", emergenceSteps: [], emergenceConclusion: "",
    feedbackTitle: "피드백 루프", feedbackLead: "파토폴리테스 표현형은 자기 강화적입니다.", feedbackLoops: [],
    moralDistressTitle: "도덕적 고통 지수", moralDistressLead: "파토폴리테스는 진정한 도덕적 고통을 경험합니다.", moralDistressExplain: "",
    predictionsTitle: "예측", pred1: "", pred2: "", pred3: "", pred4: "",
    litTitle: "문헌", lit: [],
    modelDerived: "",
    modelDerivedLink: "",
  },
};

type CopyEN = (typeof COPY)["en"];

const GRADIENT_DATA = [
  { env: "Amish", emf: "0.05×", index: "0.089", victim: "0.164", safety: "0.042", external: "0.202", fragility: "0.039", anomie: "0.104", moral: "0.091" },
  { env: "Rural", emf: "0.40×", index: "0.344", victim: "0.440", safety: "0.247", external: "0.456", fragility: "0.251", anomie: "0.563", moral: "0.238" },
  { env: "Suburban", emf: "1.00×", index: "0.458", victim: "0.553", safety: "0.374", external: "0.557", fragility: "0.357", anomie: "0.716", moral: "0.314" },
  { env: "Urban Res.", emf: "1.40×", index: "0.531", victim: "0.624", safety: "0.470", external: "0.623", fragility: "0.427", anomie: "0.795", moral: "0.359" },
  { env: "Urban Office", emf: "1.80×", index: "0.581", victim: "0.674", safety: "0.539", external: "0.672", fragility: "0.480", anomie: "0.842", moral: "0.390" },
];

const DIMS = [
  { key: "dim1", icon: UserX, color: "red" },
  { key: "dim2", icon: Shield, color: "amber" },
  { key: "dim3", icon: Scale, color: "blue" },
  { key: "dim4", icon: Brain, color: "purple" },
  { key: "dim5", icon: Users, color: "orange" },
  { key: "dim6", icon: Heart, color: "pink" },
] as const;

const DIM_COLORS: Record<string, { border: string; bg: string; text: string }> = {
  red: { border: "border-red-500/30", bg: "bg-red-500/5", text: "text-red-500" },
  amber: { border: "border-amber-500/30", bg: "bg-amber-500/5", text: "text-amber-500" },
  blue: { border: "border-blue-500/30", bg: "bg-blue-500/5", text: "text-blue-500" },
  purple: { border: "border-purple-500/30", bg: "bg-purple-500/5", text: "text-purple-500" },
  orange: { border: "border-orange-500/30", bg: "bg-orange-500/5", text: "text-orange-500" },
  pink: { border: "border-pink-500/30", bg: "bg-pink-500/5", text: "text-pink-500" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta: Record<string, { title: string; description: string }> = {
    en: {
      title: "Pathopolites — The Pathological Citizen | BERM",
      description: "Six measurable dimensions of the pathological citizen phenotype: victimhood identity, safety-seeking, external locus, cognitive fragility, anomic distress, and moral compensation — mapped to endocrine substrates across the EMF gradient.",
    },
    fi: {
      title: "Pathopolites — Patologinen kansalainen | BERM",
      description: "Patologisen kansalaisen fenotyypin kuusi mitattavaa ulottuvuutta: uhri-identiteetti, turvallisuushakuisuus, ulkoinen hallintakäsitys, kognitiivinen hauraus, anominen ahdistus ja moraalinen kompensointi — kartoitettuna endokriinisiin substraatteihin EMF-gradientin yli.",
    },
    ja: {
      title: "パトポリテース — 病理的市民 | BERM",
      description: "病理的市民表現型の6つの測定可能な次元：被害者アイデンティティ、安全追求、外的統制、認知的脆弱性、アノミー的苦痛、道徳的補償 — EMF勾配にわたって内分泌基質にマッピング。",
    },
    fr: {
      title: "Pathopolites — Le Citoyen Pathologique | BERM",
      description: "Six dimensions mesurables du phenotype du citoyen pathologique : identite victimaire, recherche de securite, locus de controle externe, fragilite cognitive, detresse anomique et compensation morale.",
    },
    ko: {
      title: "파토폴리테스 — 병리적 시민 | BERM",
      description: "병리적 시민 표현형의 6가지 측정 가능한 차원: 피해자 정체성, 안전 추구, 외적 통제 소재, 인지적 취약성, 아노미적 고통, 도덕적 보상 — EMF 기울기에 걸쳐 내분비 기질에 매핑.",
    },
  };
  const m = meta[locale] || meta.en;
  return {
    title: m.title,
    description: m.description,
    openGraph: { title: m.title, description: m.description },
  };
}

export default async function PathopolitesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale) as CopyEN;

  return (
    <main id="main-content">
      <TranslationNotice copy={COPY} locale={locale} />
      <div className="max-w-5xl mx-auto px-6">

      {/* Hero */}
      <header className="mt-8 sm:mt-14 mb-14">
        <div className="flex items-center gap-2 mb-4">
          <UserX className="w-5 h-5 text-red-500/80" />
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">BERM / Civilization</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold tracking-[-0.02em] leading-[1.12] mb-6">
          {d.title}
        </h1>
        <p className="text-xl sm:text-2xl text-foreground/70 leading-relaxed mb-6 max-w-3xl">
          {d.subtitle}
        </p>
        <p className="text-base leading-relaxed text-foreground/80 max-w-3xl mb-4 first-letter:text-3xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-none">
          {d.heroLead}
        </p>
        <p className="text-sm leading-relaxed text-foreground-muted max-w-3xl">
          {d.heroTrail}
        </p>
      </header>

      {/* Cross-reference note */}
      <div className="mb-14 rounded-xl border border-foreground/10 bg-foreground/5 p-4 max-w-3xl">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <Link href={`/${locale}/civilization/pathopege`} className="underline hover:text-foreground transition-colors">Pathopege</Link>
          {" / "}
          <Link href={`/${locale}/civilization/patopolis`} className="underline hover:text-foreground transition-colors">Patopolis</Link>
          {" / "}
          <Link href={`/${locale}/civilization/patokratia`} className="underline hover:text-foreground transition-colors">Patokratia</Link>
          : {d.mechanismNote}
        </p>
      </div>

      {/* Six Dimensions */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">{d.sixDimTitle}</h2>
        <p className="text-muted-foreground mb-4 max-w-3xl">{d.sixDimLead}</p>
        {d.sixDimScale && (
          <div className="mb-10 rounded-lg border border-muted bg-muted/30 p-4 max-w-3xl">
            <p className="text-xs text-muted-foreground leading-relaxed">{d.sixDimScale}</p>
          </div>
        )}

        <div className="space-y-8">
          {DIMS.map(({ key, icon: Icon, color }, i) => {
            const c = DIM_COLORS[color];
            const title = d[`${key}Title` as keyof CopyEN] as string;
            const substrate = d[`${key}Substrate` as keyof CopyEN] as string;
            const desc = d[`${key}Desc` as keyof CopyEN] as string;
            const amish = d[`${key}Amish` as keyof CopyEN] as string;
            const urban = d[`${key}Urban` as keyof CopyEN] as string;
            const ratio = d[`${key}Ratio` as keyof CopyEN] as string;
            return (
              <div key={key} className={`rounded-xl border ${c.border} ${c.bg} p-6`}>
                <div className="flex items-start gap-3 mb-4">
                  <span className={`text-xs font-mono ${c.text} opacity-60 mt-1`}>{i + 1}</span>
                  <Icon className={`w-5 h-5 ${c.text} mt-0.5 shrink-0`} />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{substrate}</p>
                  </div>
                  <div className="text-right text-xs font-mono text-muted-foreground shrink-0 hidden sm:block">
                    <div>Amish: {amish}</div>
                    <div>Urban: {urban}</div>
                    <div className={`${c.text} font-semibold`}>{ratio}</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80">{desc}</p>
                <div className="sm:hidden mt-3 flex gap-4 text-xs font-mono text-muted-foreground">
                  <span>Amish: {amish}</span>
                  <span>Urban: {urban}</span>
                  <span className={`${c.text} font-semibold`}>{ratio}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Gradient Table */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">{d.gradientTitle}</h2>
        <p className="text-muted-foreground mb-6 max-w-3xl">{d.gradientLead}</p>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-3 font-semibold">{d.gradientEnv}</th>
                <th className="text-right p-3 font-semibold">{d.gradientEMF}</th>
                <th className="text-right p-3 font-semibold text-red-400">{d.gradientIndex}</th>
                <th className="text-right p-3 font-semibold">{d.gradientVictim}</th>
                <th className="text-right p-3 font-semibold">{d.gradientSafety}</th>
                <th className="text-right p-3 font-semibold">{d.gradientExternal}</th>
                <th className="text-right p-3 font-semibold">{d.gradientFragility}</th>
                <th className="text-right p-3 font-semibold">{d.gradientAnomie}</th>
                <th className="text-right p-3 font-semibold">{d.gradientMoral}</th>
              </tr>
            </thead>
            <tbody>
              {GRADIENT_DATA.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-transparent" : "bg-muted/10"}>
                  <td className="p-3 font-semibold">{row.env}</td>
                  <td className="text-right p-3 text-muted-foreground">{row.emf}</td>
                  <td className="text-right p-3 text-red-400 font-semibold">{row.index}</td>
                  <td className="text-right p-3">{row.victim}</td>
                  <td className="text-right p-3">{row.safety}</td>
                  <td className="text-right p-3">{row.external}</td>
                  <td className="text-right p-3">{row.fragility}</td>
                  <td className="text-right p-3">{row.anomie}</td>
                  <td className="text-right p-3">{row.moral}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          <p className="text-xs text-muted-foreground mt-2 italic">
            {d.modelDerived}{" "}
            <Link href={`/${locale}/model/math`} className="underline underline-offset-2">{d.modelDerivedLink}</Link>.
          </p>
      </section>

      {/* Emergence */}
      {d.emergenceSteps?.length > 0 && (
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">{d.emergenceTitle}</h2>
        <p className="text-muted-foreground mb-6 max-w-3xl">{d.emergenceLead}</p>

        <div className="space-y-3 mb-8 max-w-3xl">
          {d.emergenceSteps.map((step, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-xs font-mono text-red-400/60 mt-0.5 shrink-0">{i + 1}</span>
              <p className="text-sm leading-relaxed text-foreground/80">{step}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5 max-w-3xl">
          <p className="text-sm leading-relaxed font-medium">{d.emergenceConclusion}</p>
        </div>
      </section>
      )}

      {/* Feedback Loop */}
      {d.feedbackLoops?.length > 0 && (
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">{d.feedbackTitle}</h2>
        <p className="text-muted-foreground mb-6 max-w-3xl">{d.feedbackLead}</p>

        <div className="grid gap-4 sm:grid-cols-3 max-w-4xl">
          {d.feedbackLoops.map((loop, i) => (
            <div key={i} className="rounded-xl border border-foreground/10 p-5">
              <h3 className="text-sm font-semibold mb-2">{loop.title}</h3>
              <p className="text-xs leading-relaxed text-foreground/70">{loop.detail}</p>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* Moral Distress */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">{d.moralDistressTitle}</h2>
        <p className="text-muted-foreground mb-4 max-w-3xl">{d.moralDistressLead}</p>
        {d.moralDistressExplain && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 max-w-3xl">
            <p className="text-sm leading-relaxed">{d.moralDistressExplain}</p>
          </div>
        )}
          <p className="text-xs text-muted-foreground mt-2 italic">
            {d.modelDerived}{" "}
            <Link href={`/${locale}/model/math`} className="underline underline-offset-2">{d.modelDerivedLink}</Link>.
          </p>
      </section>

      {/* Predictions */}
      {d.pred1 && (
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">{d.predictionsTitle}</h2>
        <div className="space-y-4 max-w-3xl">
          {[d.pred1, d.pred2, d.pred3, d.pred4].filter(Boolean).map((pred, i) => (
            <div key={i} className="rounded-xl border p-5">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono px-2 py-0.5">
                  PP-{i + 1}
                </span>
                <p className="text-sm leading-relaxed">{pred}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* Literature */}
      {d.lit?.length > 0 && (
      <section className="mb-16">
        <h3 className="text-lg font-semibold mb-4">{d.litTitle}</h3>
        <ul className="space-y-2">
          {d.lit.map((ref, i) => (
            <li key={i} className="text-xs text-muted-foreground leading-relaxed">
              <InlineReferenceText text={ref} locale={locale} />
            </li>
          ))}
        </ul>
      </section>
      )}

      {/* Navigation */}
      <nav className="mt-20 mb-16 flex flex-col sm:flex-row flex-wrap gap-4">
        <Link
          href={`/${locale}/civilization`}
          className="flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium hover:bg-muted/50 transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          {d.civilizationLink}
        </Link>
        <Link
          href={`/${locale}/civilization/patopolis`}
          className="flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium hover:bg-muted/50 transition-colors"
        >
          {d.patopolisLink}
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href={`/${locale}/civilization/patokratia`}
          className="flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium hover:bg-muted/50 transition-colors"
        >
          {d.patokratiaLink}
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href={`/${locale}/civilization/patokinesis`}
          className="flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium hover:bg-muted/50 transition-colors"
        >
          {d.patokinesisLink}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </nav>

      </div>
    </main>
  );
}
