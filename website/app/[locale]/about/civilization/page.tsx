import type { Metadata } from "next";
import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import { ClaimRef } from "@/components/ClaimRef";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { PageHeader } from "@/components/PageHeader";
import { TranslationNotice } from "@/components/TranslationNotice";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Epistapege: structural non-detection in the BERM civilization model",
    subtitle:
      "A mechanistic account of how a latent biological state can be recorded as a cultural explanation, and how that classification can persist in aggregate analysis.",
    statusTitle: "Status of the derivation",
    statusRows: [
      {
        level: "[E]",
        title: "Observed component",
        text: "Experimental and clinical research shows that people can produce coherent explanations while lacking access to an action's full causal antecedents.",
      },
      {
        level: "[L*]",
        title: "BERM composition",
        text: "If a neuroendocrine state shifts motivation and the state is not introspectively available, the reported reason can be a downstream measurement of that shift rather than an independent initiating cause.",
      },
      {
        level: "[L*]",
        title: "Open extension",
        text: "The proposed institutional persistence of this misclassification, called Epistapege, remains a testable model extension rather than an established historical law.",
      },
    ],
    interpreterTitle: "1. The interpreter and causal attribution",
    interpreterSub: "What the experiments establish, and what BERM adds",
    interpreterParagraphs: [
      "Delgado reported that stimulation of the rostral internal capsule repeatedly produced head and body turning. When asked about the movement, the subject gave situational explanations, including that she was looking for her slippers. Delgado explicitly left open whether stimulation first produced movement followed by justification, or an experience followed by movement. The observation therefore establishes dissociation between the external intervention and the subject's verbal account; it does not by itself decide the internal sequence ([[ref:delgado1969|Delgado 1969]]). [E]",
      "Split-brain research provides the more general interpreter result. Gazzaniga describes a left-hemisphere system that constructs explanations from the information available to it, including when the initiating information was delivered to the other hemisphere ([[ref:gazzaniga2000|Gazzaniga 2000]]; [[ref:gazzaniga2011|Gazzaniga 2011]]). Research on verbal reports independently concludes that people often report plausible causal accounts without direct access to the relevant mental processes ([[ref:nisbett_wilson1977|Nisbett & Wilson 1977]]). [E]",
      "The BERM bridge is compositional: endocrine and neural states can alter motivation, threat appraisal, social behaviour and effort; a survey item directly records the stated reason, not those upstream states. Consequently, a coherent answer can be sincere and causally incomplete. A survey cannot, by itself, distinguish a Level 2 biological-behavioural pathway from a Level 3 cultural preference. Joint longitudinal biomarkers, behaviour and reports are required. [L*]",
      "The biological-to-behavioural part of this composition has independent component support. SHBG and albumin regulate free-testosterone availability at a given total concentration ([[ref:narinx2022_free_testosterone|Narinx et al. 2022]]); experimental activation of nucleus-accumbens D2-receptor neurons increased motivation ([[ref:soares_cunha2016_d2_motivation|Soares-Cunha et al. 2016]]); and measured physiological threat sensitivity was associated with political attitudes in a small human study ([[ref:oxley2008_physiological_traits|Oxley et al. 2008]]). These findings establish plausible biological control points, not the complete EMF → narrative → aggregate-politics route. [M + E]",
    ],
    interpreterHeaders: ["Candidate latent state", "Behavioural consequence", "Available narrative", "Recorded survey category"],
    interpreterRows: [
      ["Lower androgen-effective capacity", "Lower sexual motivation", "I am not interested in a relationship", "Values or preferences changed"],
      ["Higher HPA-axis load", "Greater threat weighting", "The future is economically unsafe", "Economic reasons"],
      ["Circadian disruption", "Lower mood and future orientation", "This is not a good world for children", "Social or climate concern"],
      ["Altered dopaminergic effort allocation", "Attention moves to immediate rewards", "My lifestyle has other priorities", "Lifestyle choice"],
    ],
    tableNote:
      "These rows are BERM candidate mappings, not diagnoses. The discriminating test is whether measured biological state improves prediction of later behaviour and later reported reasons after prior reports and socioeconomic variables are controlled. [L*]",
    immunityTitle: "2. Cognitive immunology and evidence thresholds",
    immunitySub: "A composed explanation for asymmetric model evaluation",
    immunityParagraphs: [
      "Zapffe's isolation, anchoring, distraction and sublimation are a philosophical taxonomy of how human beings maintain workable meaning structures; they are not an experimental theory of scientific review ([[ref:zapffe1933|Zapffe 1933]]). Kunda's review of motivated reasoning supplies the empirical bridge: desired conclusions can alter which beliefs and inferential strategies are accessed, although justification remains constrained by what can be made to appear reasonable ([[ref:kunda1990|Kunda 1990]]). [E + L*]",
      "BERM therefore predicts a specific asymmetry. Explanations that preserve conscious agency and institutional tractability should, on average, receive a lower evidential threshold than explanations that place part of behaviour upstream of awareness in physiology. This is not inferred from Zapffe alone; it is a composition of anchoring as a functional hypothesis, motivated-reasoning evidence and the interpreter literature. [L*]",
      "The claim is testable with matched abstracts. The same data can be presented with a cultural, economic or biological causal label while methods and effect sizes are held constant. Reviewer confidence, demanded sample size, replication requirements and perceived ethical risk become measured outcomes. Absence of a framing-dependent difference would reject the proposed asymmetry. [L*]",
    ],
    lowerThreshold: "Agency-preserving frame",
    lowerThresholdText: "Preference, incentive, norm or institution is treated as the initiating variable.",
    higherThreshold: "Biological-constraint frame",
    higherThresholdText: "A latent physiological variable is allowed to precede motivation and the reported reason.",
    symmetryRule:
      "Symmetry rule: compare the two explanations under identical requirements for temporal order, measurement error, confounding, out-of-sample prediction and intervention response.",
    theoriesTitle: "3. Seven frameworks and the omitted-variable question",
    theoriesSub: "Each framework explains a real layer; the test is whether it mistakes a downstream report for an upstream cause",
    theoriesHistory: "Tooby and Cosmides formulated one influential criticism of the Standard Social Science Model: a theory of culture requires an explicit account of the psychological architecture that produces and transmits culture ([[ref:tooby1992|Tooby & Cosmides 1992]]). BERM extends this boundary from psychological architecture to measured biological state. The chapter establishes the theoretical dispute, not the correctness of BERM or a universal exclusion of biology. [L*]",
    theoryLabels: ["Primary contribution", "BERM boundary", "Misclassification risk"],
    theories: [
      {
        name: "Social constructionism",
        contribution: "Explains how language, institutions and power shape categories and public meaning.",
        boundary: "It does not measure whether physiological variables also constrain the distribution from which those categories are produced.",
        risk: "A narrated category may be treated as causally complete because its social production is well described.",
      },
      {
        name: "Classical liberalism",
        contribution: "Models choice, preference formation and exchange under individual agency.",
        boundary: "Preference is often an input, while BERM asks which biological states partly generate its time-varying distribution.",
        risk: "A downstream preference report enters the model as an exogenous cause.",
      },
      {
        name: "Marxian political economy",
        contribution: "Models production, class, ownership and material bargaining power.",
        boundary: "It need not measure neuroendocrine constraints on status seeking, effort, bonding or reproductive behaviour.",
        risk: "Material position can absorb variance generated by a correlated biological exposure pathway.",
      },
      {
        name: "Traditionalism",
        contribution: "Models the stabilising effects of norms, duty, kinship and inherited institutions.",
        boundary: "It can describe normative regulation without identifying biological capacity or the physiological cost of maintaining it.",
        risk: "Behavioural change is coded as adherence or decline even when capacity has shifted upstream.",
      },
      {
        name: "Demographic transition theory",
        contribution: "Explains major fertility variation through mortality, education, urbanisation, opportunity cost, contraception and family-size preference.",
        boundary: "Reported preference and economic reason are usually not paired with endocrine, gamete, sleep or exposure measurements.",
        risk: "The proximate account is complete descriptively but may leave a correlated biological component in the residual or inside the preference variable.",
      },
      {
        name: "Criminology",
        contribution: "Models deprivation, social learning, institutions, opportunity and network effects on offending.",
        boundary: "These variables do not exhaust neurodevelopmental, toxicological or endocrine contributions to impulse control and threat response.",
        risk: "A social correlate may be treated as sufficient when it is also a mediator or co-exposure marker.",
      },
      {
        name: "Institutional economics",
        contribution: "Explains durable differences through rules, enforcement, incentives and organisational capacity.",
        boundary: "It normally treats the population implementing institutions as biologically interchangeable across time and place.",
        risk: "Institutional change is modelled without testing whether the distribution of biological capacities required to sustain it has changed.",
      },
    ],
    theoryNote:
      "The BERM claim is not that these frameworks are false. It is that their explanatory variables can be downstream, mediating or correlated with an unmeasured biological state. Competing causal graphs must therefore be compared rather than selecting a level in advance. [L*]",
    levelsTitle: "4. The three-level misclassification",
    levelsSub: "How a Level 2 state can enter a dataset as a Level 3 explanation",
    flow: [
      "Physical input and biological response",
      "Neuroendocrine state and autonomous behavioural weighting",
      "Interpreter constructs an accessible causal account",
      "Survey records the account as preference, value or constraint",
      "Aggregate model treats the recorded category as an independent cause",
    ],
    levelsText:
      "The critical measurement error occurs between the second and fourth boxes. A stated reason is real as a report and can itself affect later behaviour, but it does not reveal whether the report initiated the behaviour. In BERM, Level 2 and Level 3 can also interact recursively: physiology influences narrative, narrative influences institutions, and institutions alter later exposure and physiology. The direction cannot be identified from one cross-sectional survey. [L*]",
    modelLink: "Open the BERM three-level architecture",
    blindnessTitle: "5. Epistapege: structural non-detection",
    blindnessSub: "A proposed BERM mechanism for delayed correction",
    blindnessLevels: [
      {
        title: "Cognitive layer",
        text: "Causal explanation is generated from accessible information. Upstream biological variables can remain unavailable to introspection. [E]",
      },
      {
        title: "Measurement layer",
        text: "The report is observed repeatedly while the latent state is not measured. Repetition increases precision around the report distribution but does not identify its upstream cause. [L*]",
      },
      {
        title: "Institutional layer",
        text: "Policies and theories are selected using the same downstream variables. If interventions target only those variables, repeated weak effects need not update the omitted causal graph. [L*]",
      },
    ],
    epistapegeDefinition:
      "Epistapege is BERM's name for this proposed loss of causal observability: biological change produces behavioural change; behaviour is translated into a coherent narrative; the narrative becomes the measured explanatory variable; and correction is delayed because the upstream state is absent from the data model. No coordinated action is required. Ordinary cognition, measurement practice and model selection are sufficient. [L*]",
    sequence: "Pathopege → Epistapege → Pathorea → Pathostasis → Patopoliteia",
    falsificationTitle: "Discriminating evidence",
    falsificationText:
      "The extension gains support only if biological measurements add temporally ordered, out-of-sample information beyond prior narratives and socioeconomic variables, and if interventions on the proposed upstream state alter both behaviour and later explanation. If reports retain the same predictive and interventional role after those measurements, the BERM misclassification hypothesis is weakened or rejected.",
    noteTitle: "Epistemic boundary",
    noteText:
      "The interpreter and limited-introspection findings are empirical [E]. Their use as a bridge from BERM Level 2 to reported fertility reasons is a composed, testable inference [L*]. Cognitive immunology, theory-level selection and Epistapege are likewise testable extensions [L*]. FieldState may supply physical measurements to a future test, but it does not derive or explain any of these biological or cognitive mechanisms.",
  },
  fi: {
    title: "Epistapege: rakenteellinen havaitsemattomuus BERM:n sivilisaatiomallissa",
    subtitle:
      "Mekanistinen kuvaus siitä, miten latentti biologinen tila voi rekisteröityä kulttuurisena selityksenä ja miten tämä luokittelu voi säilyä aggregaattianalyysissä.",
    statusTitle: "Johdon asema",
    statusRows: [
      {
        level: "[E]",
        title: "Havaittu osa",
        text: "Kokeellinen ja kliininen tutkimus osoittaa, että ihminen voi tuottaa koherentin selityksen ilman pääsyä toiminnan kaikkiin kausaalisiin edeltäjiin.",
      },
      {
        level: "[L*]",
        title: "BERM-kompositio",
        text: "Jos neuroendokriininen tila siirtää motivaatiota eikä tila ole introspektiivisesti saavutettavissa, ilmoitettu syy voi olla muutoksen alavirran mittaus eikä itsenäinen alkusyy.",
      },
      {
        level: "[L*]",
        title: "Avoin laajennus",
        text: "Väärinluokittelun institutionaalinen pysyvyys eli Epistapege on testattava mallilaajennus, ei vakiintunut historiallinen laki.",
      },
    ],
    interpreterTitle: "1. Tulkki ja kausaaliattribuutio",
    interpreterSub: "Mitä kokeet osoittavat ja mitä BERM lisää",
    interpreterParagraphs: [
      "Delgado raportoi, että rostraalisen sisäkapselin stimulointi tuotti toistuvasti pään ja vartalon kääntymisen. Kun tutkittavalta kysyttiin liikkeestä, hän antoi tilanteeseen sopivia selityksiä, muun muassa etsivänsä tohveleitaan. Delgado jätti avoimeksi, tuottiko stimulaatio ensin liikkeen ja sitten oikeutuksen vai kokemuksen ja sen jälkeen liikkeen. Havainto osoittaa siten eron ulkoisen intervention ja sanallisen selonteon välillä, mutta ei yksin ratkaise sisäistä järjestystä ([[ref:delgado1969|Delgado 1969]]). [E]",
      "Split-brain-tutkimus antaa tulkki-ilmiölle yleisemmän perustan. Gazzaniga kuvaa vasemman hemisfäärin järjestelmän, joka muodostaa selityksiä käytettävissä olevasta informaatiosta myös silloin, kun toiminnan käynnistänyt informaatio annettiin toiselle hemisfäärille ([[ref:gazzaniga2000|Gazzaniga 2000]]; [[ref:gazzaniga2011|Gazzaniga 2011]]). Sanallisia raportteja koskeva tutkimus päätyy itsenäisesti siihen, että ihmiset tuottavat usein uskottavia kausaaliselityksiä ilman suoraa pääsyä asianomaisiin mentaalisiin prosesseihin ([[ref:nisbett_wilson1977|Nisbett & Wilson 1977]]). [E]",
      "BERM-silta on kompositionaalinen: endokriiniset ja neuraaliset tilat voivat muuttaa motivaatiota, uhka-arviointia, sosiaalista käyttäytymistä ja ponnistelua; kyselykohta mittaa suoraan ilmoitetun syyn, ei näitä edeltäviä tiloja. Koherentti vastaus voi siksi olla vilpitön ja kausaalisesti vajaa. Kysely ei yksin erota Tason 2 biologis-behavioraalista reittiä Tason 3 kulttuuripreferenssistä. Erottaminen vaatii pitkittäiset biomarkkerit, käyttäytymisen ja raportit. [L*]",
      "Komposition biologis-behavioraalisella osalla on itsenäistä komponenttitukea. SHBG ja albumiini säätelevät vapaan testosteronin saatavuutta samalla kokonaispitoisuudella ([[ref:narinx2022_free_testosterone|Narinx ym. 2022]]); nucleus accumbensin D2-reseptorineuronien kokeellinen aktivointi lisäsi motivaatiota ([[ref:soares_cunha2016_d2_motivation|Soares-Cunha ym. 2016]]); ja mitattu fysiologinen uhkaherkkyys liittyi poliittisiin asenteisiin pienessä ihmistutkimuksessa ([[ref:oxley2008_physiological_traits|Oxley ym. 2008]]). Löydökset osoittavat uskottavia biologisia säätöpisteitä, eivät koko EMF → narratiivi → aggregaattipolitiikka -reittiä. [M + E]",
    ],
    interpreterHeaders: ["Latentin tilan kandidaatti", "Behavioraalinen seuraus", "Saavutettava narratiivi", "Kyselyyn kirjautuva luokka"],
    interpreterRows: [
      ["Alempi androgeenivaikutuksen kapasiteetti", "Alempi seksuaalinen motivaatio", "Parisuhde ei kiinnosta", "Arvot tai preferenssit muuttuivat"],
      ["Korkeampi HPA-akselin kuorma", "Uhille annetaan suurempi paino", "Tulevaisuus on taloudellisesti turvaton", "Taloudelliset syyt"],
      ["Vuorokausirytmin häiriö", "Alempi mieliala ja tulevaisuusorientaatio", "Maailma ei ole hyvä lapsille", "Yhteiskunnallinen tai ilmastohuoli"],
      ["Dopaminergisen ponnistelun allokaation muutos", "Huomio siirtyy välittömiin palkkioihin", "Elämäntyylissä on muita prioriteetteja", "Elämäntyylivalinta"],
    ],
    tableNote:
      "Rivit ovat BERM:n kandidaattikuvauksia, eivät diagnooseja. Erottava testi on, parantaako mitattu biologinen tila myöhemmän käyttäytymisen ja ilmoitetun syyn ennustetta, kun aiemmat raportit ja sosioekonomiset muuttujat on kontrolloitu. [L*]",
    immunityTitle: "2. Kognitiivinen immunologia ja evidenssikynnykset",
    immunitySub: "Koostettu selitys mallien asymmetriselle arvioinnille",
    immunityParagraphs: [
      "Zapffen eristäminen, ankkurointi, häiriö ja sublimaatio ovat filosofinen luokittelu siitä, miten ihminen ylläpitää toimintakykyisiä merkitysrakenteita; ne eivät ole tieteellisen arvioinnin kokeellinen teoria ([[ref:zapffe1933|Zapffe 1933]]). Kundan motivoitunutta päättelyä koskeva katsaus antaa empiirisen sillan: toivottu johtopäätös voi muuttaa käytettyjä uskomuksia ja päättelystrategioita, vaikka perustelua rajoittaa se, mikä voidaan esittää uskottavana ([[ref:kunda1990|Kunda 1990]]). [E + L*]",
      "BERM ennustaa siksi täsmällisen asymmetrian. Tietoista toimijuutta ja institutionaalista ohjattavuutta säilyttävien selitysten evidenssikynnys on keskimäärin alempi kuin selitysten, jotka sijoittavat osan käyttäytymisen syystä tietoisuutta edeltävään fysiologiaan. Tätä ei johdeta yksin Zapffesta, vaan ankkuroinnin toimintahypoteesista, motivoituneen päättelyn näytöstä ja tulkkikirjallisuudesta. [L*]",
      "Väite voidaan testata yhteensovitetuilla abstrakteilla. Sama aineisto esitetään kulttuurisella, taloudellisella tai biologisella kausaalileimalla menetelmät ja efektikoot vakioiden. Tuloksiksi mitataan arvioijan luottamus, vaadittu otoskoko, replikaatiovaatimus ja koettu eettinen riski. Kehystyksestä riippumattomat arviot hylkäisivät ehdotetun asymmetrian. [L*]",
    ],
    lowerThreshold: "Toimijuuden säilyttävä kehys",
    lowerThresholdText: "Preferenssi, kannustin, normi tai instituutio käsitellään alkavana muuttujana.",
    higherThreshold: "Biologisen rajoitteen kehys",
    higherThresholdText: "Latentin fysiologisen muuttujan sallitaan edeltää motivaatiota ja ilmoitettua syytä.",
    symmetryRule:
      "Symmetriasääntö: vertaa selityksiä samoilla ajallisen järjestyksen, mittausvirheen, sekoittumisen, otoksen ulkopuolisen ennusteen ja interventiovasteen vaatimuksilla.",
    theoriesTitle: "3. Seitsemän kehystä ja puuttuvan muuttujan kysymys",
    theoriesSub: "Kukin kehys selittää todellisen tason; testi koskee sitä, muuttuuko alavirran raportti alkusyyksi",
    theoriesHistory: "Tooby ja Cosmides esittivät yhden vaikutusvaltaisen Standard Social Science Model -kritiikin: kulttuuriteoria tarvitsee eksplisiittisen kuvauksen kulttuuria tuottavasta ja välittävästä psykologisesta arkkitehtuurista ([[ref:tooby1992|Tooby & Cosmides 1992]]). BERM laajentaa tämän rajan psykologisesta arkkitehtuurista mitattuun biologiseen tilaan. Luku osoittaa teoriakiistan olemassaolon, ei BERM:n oikeellisuutta eikä biologian yleistä poissulkemista. [L*]",
    theoryLabels: ["Keskeinen selitysalue", "BERM-raja", "Väärinluokittelun riski"],
    theories: [
      {
        name: "Sosiaalinen konstruktionismi",
        contribution: "Selittää, miten kieli, instituutiot ja valta muovaavat luokkia ja julkisia merkityksiä.",
        boundary: "Se ei mittaa, rajoittavatko fysiologiset muuttujat myös jakaumaa, josta nämä luokat tuotetaan.",
        risk: "Narratiivisesti muodostettu luokka voidaan käsitellä kausaalisesti täydellisenä, koska sen sosiaalinen synty on kuvattu hyvin.",
      },
      {
        name: "Klassinen liberalismi",
        contribution: "Mallintaa valintaa, preferenssejä ja vaihtoa yksilöllisen toimijuuden alla.",
        boundary: "Preferenssi on usein syöte, kun BERM kysyy, mitkä biologiset tilat tuottavat osan sen ajassa muuttuvasta jakaumasta.",
        risk: "Alavirran preferenssiraportti päätyy malliin eksogeenisena syynä.",
      },
      {
        name: "Marxilainen poliittinen talous",
        contribution: "Mallintaa tuotantoa, luokkaa, omistusta ja materiaalista neuvotteluvoimaa.",
        boundary: "Se ei välttämättä mittaa neuroendokriinisiä rajoitteita statuksen tavoittelulle, ponnistelulle, kiintymykselle tai lisääntymiskäyttäytymiselle.",
        risk: "Materiaalinen asema voi absorboida korreloivasta biologisesta altistusreitistä syntyvää vaihtelua.",
      },
      {
        name: "Traditionalismi",
        contribution: "Mallintaa normien, velvollisuuden, sukulaisuuden ja perittyjen instituutioiden vakauttavia vaikutuksia.",
        boundary: "Se voi kuvata normiohjausta tunnistamatta biologista kapasiteettia tai sen ylläpidon fysiologista kustannusta.",
        risk: "Käyttäytymismuutos koodataan sitoutumiseksi tai rappioksi, vaikka kapasiteetti olisi muuttunut edeltävästi.",
      },
      {
        name: "Demografinen transitioteoria",
        contribution: "Selittää suurta osaa hedelmällisyysvaihtelusta kuolleisuudella, koulutuksella, urbanisaatiolla, vaihtoehtoiskustannuksella, ehkäisyllä ja perhekokopreferenssillä.",
        boundary: "Ilmoitettua preferenssiä ja taloudellista syytä ei tavallisesti yhdistetä endokriinisiin, sukusolu-, uni- tai altistusmittauksiin.",
        risk: "Lähiselitys on deskriptiivisesti täydellinen, mutta korreloiva biologinen komponentti voi jäädä residuaaliin tai preferenssimuuttujan sisään.",
      },
      {
        name: "Kriminologia",
        contribution: "Mallintaa deprivaation, sosiaalisen oppimisen, instituutioiden, tilaisuuden ja verkostojen vaikutuksia rikollisuuteen.",
        boundary: "Nämä muuttujat eivät tyhjennä impulssikontrollin ja uhkavasteen neurokehityksellisiä, toksikologisia tai endokriinisiä osia.",
        risk: "Sosiaalinen korrelaatti voidaan tulkita riittäväksi, vaikka se olisi myös mediaattori tai rinnakkaisaltistuksen merkki.",
      },
      {
        name: "Institutionaalinen taloustiede",
        contribution: "Selittää pysyviä eroja säännöillä, toimeenpanolla, kannustimilla ja organisaatiokapasiteetilla.",
        boundary: "Se käsittelee instituutioita toteuttavaa populaatiota tavallisesti biologisesti vaihtokelpoisena ajassa ja paikassa.",
        risk: "Instituutiomuutosta mallinnetaan testaamatta, onko sen ylläpitämiseen tarvittavien biologisten kapasiteettien jakauma muuttunut.",
      },
    ],
    theoryNote:
      "BERM-väite ei ole, että nämä kehykset ovat vääriä. Väite on, että niiden selittävät muuttujat voivat olla alavirran muuttujia, mediaattoreita tai korreloida mittaamattoman biologisen tilan kanssa. Kilpailevia kausaaligraafeja on siksi verrattava ilman tason ennakkovalintaa. [L*]",
    levelsTitle: "4. Kolmitasoinen väärinluokittelu",
    levelsSub: "Miten Tason 2 tila voi päätyä aineistoon Tason 3 selityksenä",
    flow: [
      "Fysikaalinen syöte ja biologinen vaste",
      "Neuroendokriininen tila ja autonominen käyttäytymisen painotus",
      "Tulkki muodostaa saavutettavan kausaaliselityksen",
      "Kysely kirjaa selityksen preferenssiksi, arvoksi tai rajoitteeksi",
      "Aggregaattimalli käsittelee kirjattua luokkaa itsenäisenä syynä",
    ],
    levelsText:
      "Keskeinen mittausvirhe tapahtuu toisen ja neljännen laatikon välillä. Ilmoitettu syy on todellinen raporttina ja voi itse vaikuttaa myöhempään käyttäytymiseen, mutta se ei paljasta, käynnistikö raportin sisältö käyttäytymisen. BERM:ssä Tasot 2 ja 3 voivat myös vaikuttaa toisiinsa rekursiivisesti: fysiologia vaikuttaa narratiiviin, narratiivi instituutioihin ja instituutiot myöhempään altistukseen ja fysiologiaan. Suuntaa ei voida tunnistaa yhdestä poikkileikkauskyselystä. [L*]",
    modelLink: "Avaa BERM:n kolmitasoinen arkkitehtuuri",
    blindnessTitle: "5. Epistapege: rakenteellinen havaitsemattomuus",
    blindnessSub: "BERM:n ehdottama mekanismi korjauksen viivästymiselle",
    blindnessLevels: [
      {
        title: "Kognitiivinen taso",
        text: "Kausaaliselitys muodostetaan saavutettavasta informaatiosta. Edeltävät biologiset muuttujat voivat jäädä introspektion ulkopuolelle. [E]",
      },
      {
        title: "Mittaustaso",
        text: "Raportti havaitaan toistuvasti, mutta latenttia tilaa ei mitata. Toisto lisää raporttijakauman tarkkuutta, ei tunnista sen edeltävää syytä. [L*]",
      },
      {
        title: "Institutionaalinen taso",
        text: "Politiikat ja teoriat valitaan samojen alavirran muuttujien avulla. Jos interventiot kohdistuvat vain niihin, toistuvasti heikko vaikutus ei välttämättä päivitä pois jätettyä kausaaligraafia. [L*]",
      },
    ],
    epistapegeDefinition:
      "Epistapege on BERM:n nimi ehdotetulle kausaalisen havaittavuuden menetykselle: biologinen muutos tuottaa käyttäytymismuutoksen, käyttäytyminen käännetään koherentiksi narratiiviksi, narratiivista tulee mitattu selittävä muuttuja ja korjaus viivästyy, koska edeltävä tila puuttuu datamallista. Koordinoitua toimintaa ei tarvita. Tavallinen kognitio, mittauskäytäntö ja mallinvalinta riittävät. [L*]",
    sequence: "Pathopege → Epistapege → Pathorea → Pathostasis → Patopoliteia",
    falsificationTitle: "Erottava näyttö",
    falsificationText:
      "Laajennus saa tukea vain, jos biologiset mittaukset lisäävät ajallisesti järjestynyttä, otoksen ulkopuolista informaatiota aiempien narratiivien ja sosioekonomisten muuttujien lisäksi ja jos ehdotettuun edeltävään tilaan kohdistuva interventio muuttaa sekä käyttäytymistä että myöhempää selitystä. Jos raportit säilyttävät saman ennuste- ja interventioroolin näiden mittausten jälkeen, BERM:n väärinluokitteluhypoteesi heikkenee tai hylätään.",
    noteTitle: "Episteeminen raja",
    noteText:
      "Tulkki- ja rajallisen introspektion löydökset ovat empiirisiä [E]. Niiden käyttö siltana BERM:n Tasolta 2 ilmoitettuihin hedelmällisyyssyihin on koostettu, testattava päätelmä [L*]. Kognitiivinen immunologia, teoriatason valinta ja Epistapege ovat samoin testattavia laajennuksia [L*]. FieldState voi toimittaa fysikaalisia mittauksia tulevaan testiin, mutta se ei johda eikä selitä näitä biologisia tai kognitiivisia mekanismeja.",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
    alternates: { canonical: `/${locale}/civilization/epistapege` },
  };
}

export default async function CivilizationAboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);

  return (
    <>
      <TranslationNotice copy={COPY} locale={locale} />
      <div className="max-w-5xl mx-auto px-6 py-16">
        <PageHeader icon={BrainCircuit} title={d.title} subtitle={d.subtitle} />

        <section className="mb-14 border-t editorial-rule pt-6">
          <h2 className="editorial-section-heading mb-5">{d.statusTitle}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {d.statusRows.map((row) => (
              <article key={row.title} className="rounded-xl border border-card-border bg-card-bg p-5">
                <p className="font-mono-num text-xs font-semibold text-accent">{row.level}</p>
                <h3 className="mt-2 font-semibold">{row.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{row.text}</p>
              </article>
            ))}
          </div>
        </section>

        <CollapsibleSection id="interpreter" title={d.interpreterTitle} subtitle={d.interpreterSub} defaultOpen>
          <div className="max-w-4xl space-y-4 text-sm leading-relaxed text-foreground-muted">
            {d.interpreterParagraphs.map((paragraph, index) => (
              <p key={paragraph}>
                {index === 2 ? (
                  <ClaimRef claimId="claim.cognition.reported-reason-downstream">
                    <InlineReferenceText text={paragraph} locale={locale} />
                  </ClaimRef>
                ) : index === 3 ? (
                  <ClaimRef claimId="claim.cognition.biological-behavioural-weighting">
                    <InlineReferenceText text={paragraph} locale={locale} />
                  </ClaimRef>
                ) : (
                  <InlineReferenceText text={paragraph} locale={locale} />
                )}
              </p>
            ))}
          </div>
          <div className="mt-7 overflow-x-auto rounded-xl border border-card-border">
            <table className="min-w-[760px] w-full border-collapse text-sm">
              <thead className="bg-card-bg text-left text-xs uppercase tracking-wider text-foreground-muted">
                <tr>{d.interpreterHeaders.map((header) => <th key={header} className="p-3">{header}</th>)}</tr>
              </thead>
              <tbody>
                {d.interpreterRows.map((row) => (
                  <tr key={row[0]} className="border-t border-card-border align-top">
                    {row.map((cell) => <td key={cell} className="p-3 leading-relaxed text-foreground-muted">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-4xl border-l-2 border-status-partial/60 pl-3 text-xs leading-relaxed text-foreground-muted">{d.tableNote}</p>
        </CollapsibleSection>

        <CollapsibleSection id="cognitive-immunology" title={d.immunityTitle} subtitle={d.immunitySub} defaultOpen>
          <div className="max-w-4xl space-y-4 text-sm leading-relaxed text-foreground-muted">
            {d.immunityParagraphs.map((paragraph, index) => (
              <p key={paragraph}>
                {index === 1 ? (
                  <ClaimRef claimId="claim.civilization.asymmetric-evidence-threshold">
                    <InlineReferenceText text={paragraph} locale={locale} />
                  </ClaimRef>
                ) : (
                  <InlineReferenceText text={paragraph} locale={locale} />
                )}
              </p>
            ))}
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <article className="rounded-xl border border-card-border bg-card-bg p-5">
              <h3 className="font-semibold">{d.lowerThreshold}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.lowerThresholdText}</p>
            </article>
            <article className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <h3 className="font-semibold">{d.higherThreshold}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.higherThresholdText}</p>
            </article>
          </div>
          <p className="mt-4 max-w-4xl rounded-lg border border-card-border bg-card-bg p-4 text-sm leading-relaxed text-foreground-muted">{d.symmetryRule}</p>
        </CollapsibleSection>

        <CollapsibleSection id="frameworks" title={d.theoriesTitle} subtitle={d.theoriesSub}>
          <p className="mb-5 max-w-4xl text-sm leading-relaxed text-foreground-muted">
            <InlineReferenceText text={d.theoriesHistory} locale={locale} />
          </p>
          <div className="max-w-4xl space-y-3">
            {d.theories.map((theory) => (
              <details key={theory.name} className="group rounded-xl border border-card-border bg-card-bg p-5">
                <summary className="cursor-pointer list-none font-semibold">{theory.name}</summary>
                <dl className="mt-4 grid gap-4 text-sm md:grid-cols-3">
                  {[theory.contribution, theory.boundary, theory.risk].map((value, index) => (
                    <div key={d.theoryLabels[index]}>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-accent">{d.theoryLabels[index]}</dt>
                      <dd className="mt-1 leading-relaxed text-foreground-muted">{value}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            ))}
          </div>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-foreground-muted">{d.theoryNote}</p>
        </CollapsibleSection>

        <CollapsibleSection id="three-level-misclassification" title={d.levelsTitle} subtitle={d.levelsSub} defaultOpen>
          <ol className="max-w-3xl space-y-2">
            {d.flow.map((item, index) => (
              <li key={item} className="flex items-center gap-3 rounded-lg border border-card-border bg-card-bg p-4 text-sm">
                <span className="font-mono-num text-xs text-accent">0{index + 1}</span>
                <span>{item}</span>
                {index < d.flow.length - 1 && <span className="ml-auto text-foreground-muted" aria-hidden>↓</span>}
              </li>
            ))}
          </ol>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-foreground-muted">{d.levelsText}</p>
          <Link href={`/${locale}/model#architecture`} className="mt-4 inline-flex text-sm font-medium text-accent hover:underline">
            {d.modelLink} →
          </Link>
        </CollapsibleSection>

        <CollapsibleSection id="epistapege" title={d.blindnessTitle} subtitle={d.blindnessSub} defaultOpen>
          <div className="grid gap-4 md:grid-cols-3">
            {d.blindnessLevels.map((item) => (
              <article key={item.title} className="rounded-xl border border-card-border bg-card-bg p-5">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{item.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-4xl text-sm leading-relaxed text-foreground-muted">
            <ClaimRef claimId="claim.civilization.epistapege-observability-loss">
              {d.epistapegeDefinition}
            </ClaimRef>
          </p>
          <p className="mt-5 overflow-x-auto rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-mono-num text-sm font-semibold tracking-wide">
            {d.sequence}
          </p>
          <div className="mt-6 max-w-4xl rounded-xl border border-card-border bg-card-bg p-5">
            <h3 className="font-semibold">{d.falsificationTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.falsificationText}</p>
          </div>
        </CollapsibleSection>

        <section className="rounded-xl border border-status-partial/35 bg-status-partial/5 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-status-partial">{d.noteTitle}</h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-foreground-muted">{d.noteText}</p>
        </section>
      </div>
    </>
  );
}
