// @reference-token-renderer components/ProxyExplanationsExplorer.tsx
export type ProxyExplanationCopy = {
  label: string;
  role: string;
  correlation: string;
  masking: string;
  contribution: string;
  evidence: string;
};

export const PROXY_EXPLANATIONS: readonly {
  id: string;
  en: ProxyExplanationCopy;
  fi: ProxyExplanationCopy;
}[] = [
  {
    id: "gdp-prosperity",
    en: {
      label: "GDP and prosperity",
      role: "A broad measure of resources and living conditions.",
      correlation: "Electrical networks and devices support production and everyday consumption. Their spread can change both economic indicators and the field environment.",
      masking: "A GDP–outcome correlation does not identify the field input. Attributing the whole association to prosperity leaves the physical pathway unnamed.",
      contribution: "BERM derives a path from local physical input through receiving biology to the outcome. Resources retain their own effects, but an income measure does not identify this field-dependent part of the chain.",
      evidence: "Electricity access was associated with fertility in regional data; EMF dose was not measured. [[ref:belmin2022_nature_sustainability|Belmin 2022]].",
    },
    fi: {
      label: "BKT ja vauraus",
      role: "Resurssien ja elinolojen laaja koontimittari.",
      correlation: "Sähköverkot ja laitteet ovat osa tuotantoa ja arjen kulutusta. Niiden yleistyminen voi muuttaa sekä talousmittareita että kenttäympäristöä.",
      masking: "BKT:n ja seurauksen korrelaatio ei nimeä kenttäsyötettä. Koko yhteyden selittäminen vauraudella jättää fysikaalisen reitin nimeämättä.",
      contribution: "BERM johtaa paikallisesta fysikaalisesta syötteestä vastaanottobiologian kautta seuraukseen kulkevan reitin. Resursseilla säilyvät omat vaikutuksensa, mutta tulomittari ei yksilöi ketjun kentästä riippuvaa osuutta.",
      evidence: "Sähkön saatavuus oli yhteydessä syntyvyyteen alueaineistossa; EMF-annosta ei mitattu. [[ref:belmin2022_nature_sustainability|Belmin 2022]].",
    },
  },
  {
    id: "urbanisation",
    en: {
      label: "Urbanisation",
      role: "A bundle of environments with several causal pathways.",
      correlation: "Dense settlement can bring lighting, electrical infrastructure and wireless sources together.",
      masking: "An urban–rural label groups local exposure, housing and daily routines together. A difference between these groups does not identify which pathway produced it.",
      contribution: "BERM resolves the urban category into physical inputs, receiving states and downstream responses. Noise, pollution and social conditions remain contributing causes; the group label alone does not separate their effects from the field pathway.",
      evidence: "This is BERM’s interpretation of a broad environmental category.",
    },
    fi: {
      label: "Kaupungistuminen",
      role: "Useita kausaalisia reittejä sisältävä ympäristöjen koontiluokka.",
      correlation: "Tiheä asutus voi koota valaistuksen, sähköverkon ja langattomat lähteet samoihin paikkoihin.",
      masking: "Kaupunki–maaseutu-luokittelu kokoaa paikallisen altistuksen, asumisen ja päivärytmin yhteen. Näiden ryhmien ero ei yksilöi sitä tuottanutta reittiä.",
      contribution: "BERM avaa kaupunkiluokan fysikaalisiksi syötteiksi, vastaanottotiloiksi ja niitä seuraaviksi vasteiksi. Melu, saasteet ja sosiaaliset olot säilyvät osasyinä; ryhmän nimi ei erottele niiden vaikutuksia kenttähaaran vaikutuksesta.",
      evidence: "Tämä on BERM:n tapa avata ympäristön koontiluokan sisältöä.",
    },
  },
  {
    id: "screen-time",
    en: {
      label: "Screen time and social media",
      role: "Behaviour that also changes exposure and social experience.",
      correlation: "Device use combines displayed light, connectivity, content and changes in activity.",
      masking: "Hours of use do not separate light, field conditions, content and displaced activity. Naming screen time as the explanation leaves these mechanisms and the user’s prior state unresolved.",
      contribution: "BERM derives the response from device-related physical inputs and the user’s receiving state alongside the effects of content. In this chain, a duration of use does not specify the biological input or explain why the same duration produces different responses.",
      evidence: "RF dose was modelled from device use; evening eReader use altered circadian timing in a separate experiment. [[ref:birks2021_modeled_rf_dose|Birks 2021]]; [[ref:chang2015_ipad_melatonin|Chang 2015]].",
    },
    fi: {
      label: "Ruutuaika ja sosiaalinen media",
      role: "Käyttäytymistä, joka muuttaa myös altistuksia ja sosiaalista kokemusta.",
      correlation: "Laitteen käyttö yhdistää näyttövalon, yhteydet, sisällöt ja liikkumisen muutokset.",
      masking: "Käyttötunnit eivät erottele valoa, kenttäolosuhteita, sisältöjä ja syrjäytyvää toimintaa. Ruutuajan nimeäminen selitykseksi jättää nämä mekanismit ja käyttäjän aiemman tilan avaamatta.",
      contribution: "BERM johtaa vasteen laitteeseen liittyvistä fysikaalisista syötteistä ja käyttäjän vastaanottotilasta sisältöjen vaikutusten rinnalla. Tässä ketjussa käyttöaika ei määritä biologista syötettä eikä selitä, miksi sama kesto tuottaa erilaisen vasteen.",
      evidence: "RF-annosta mallinnettiin laitekäytöstä; erillisessä kokeessa iltalukeminen valoa tuottavalta laitteelta muutti vuorokausiajoitusta. [[ref:birks2021_modeled_rf_dose|Birks 2021]]; [[ref:chang2015_ipad_melatonin|Chang 2015]].",
    },
  },
  {
    id: "night-light",
    en: {
      label: "Light at night and shift work",
      role: "Direct optical exposure and a modifier of biological timing.",
      correlation: "Night work and illuminated environments can accompany intensive electrical infrastructure.",
      masking: "A schedule label does not specify light spectrum, timing or exposure history. Treating the schedule as the whole explanation leaves both the optical input and its effects on later reception unresolved.",
      contribution: "BERM assigns light two causal roles: a direct optical input and a modifier of receiving state. The model therefore connects the current response to prior illumination as well as to the current physical conditions.",
      evidence: "Coral spawning dates were associated with artificial night lighting. [[ref:davies2023_coral_light|Davies 2023]].",
    },
    fi: {
      label: "Yövalo ja vuorotyö",
      role: "Suora optinen altistus ja biologisen ajoituksen muokkaaja.",
      correlation: "Yötyö ja valaistut ympäristöt voivat liittyä laajaan sähköiseen infrastruktuuriin.",
      masking: "Työvuoron nimi ei määritä valon spektriä, ajoitusta tai altistushistoriaa. Työvuoron käyttäminen koko selityksenä jättää optisen syötteen ja sen myöhempää vastaanottoa muokkaavat vaikutukset avaamatta.",
      contribution: "BERM antaa valolle kaksi kausaalista roolia: suora optinen syöte ja vastaanottotilan muokkaaja. Malli yhdistää nykyisen vasteen aiempaan valaistukseen sekä nykyisiin fysikaalisiin olosuhteisiin.",
      evidence: "Korallien kutuajankohdat olivat yhteydessä keinotekoiseen yövaloon. [[ref:davies2023_coral_light|Davies 2023]].",
    },
  },
  {
    id: "diet-calories",
    en: {
      label: "Diet and calories",
      role: "Direct metabolic inputs and possible intermediate steps.",
      correlation: "Food environments can change alongside electrification, lighting and daily routines.",
      masking: "Calories describe the energy flow. Greater intake explains an input to weight gain, but does not explain what changed the regulation of eating.",
      contribution: "BERM derives a chain from physical input through receiving state and appetite regulation to eating and energy balance. Calories remain a causal input; they do not explain the upstream change in regulation.",
      evidence: "Weight increased across several animal populations; intake was not fully controlled. [[ref:klimentidis2010|Klimentidis 2010]].",
    },
    fi: {
      label: "Ruokavalio ja kalorit",
      role: "Suoria aineenvaihdunnan syötteitä ja mahdollisia välivaiheita.",
      correlation: "Ruokaympäristö voi muuttua sähköistymisen, valaistuksen ja päivärytmin mukana.",
      masking: "Kalorit kuvaavat energiavirtaa. Lisääntynyt energiansaanti selittää painonnousun syötettä, mutta ei sitä, mikä muutti syömisen säätelyä.",
      contribution: "BERM johtaa fysikaalisesta syötteestä vastaanottotilan ja ruokahalun säätelyn kautta syömiseen sekä energiatasapainoon kulkevan ketjun. Kalorit säilyvät kausaalisena syötteenä; ne eivät selitä niitä edeltävää säätelyn muutosta.",
      evidence: "Paino nousi useissa eläinpopulaatioissa; syötyä määrää ei täysin vakioitu. [[ref:klimentidis2010|Klimentidis 2010]].",
    },
  },
  {
    id: "physical-activity",
    en: {
      label: "Physical activity",
      role: "A direct physiological input and a possible behavioural response.",
      correlation: "Mechanisation and device use can change movement and the electromagnetic environment together.",
      masking: "An exercise question measures the activity it asks about, not all everyday movement. Even a complete movement measure does not by itself explain a change in the motivation or capacity to move.",
      contribution: "BERM places receiving state, energy and motivation before movement in the causal chain. Movement retains its physiological effects, while an activity measure alone does not identify the regulation that changed it.",
      evidence: "Reported exercise for health and step counts ranked Amish and non-Amish men differently. [[ref:katz2012_amish_activity|Katz 2012]].",
    },
    fi: {
      label: "Liikkuminen",
      role: "Suora fysiologinen syöte ja mahdollinen käyttäytymisvaste.",
      correlation: "Koneellistuminen ja laitteiden käyttö voivat muuttaa liikkumista sekä sähkömagneettista ympäristöä yhdessä.",
      masking: "Liikuntakysymys mittaa kysyttyä toimintaa, ei kaikkea arkiliikettä. Täydellinenkään liikkumisen mittaus ei itsessään selitä liikkumismotivaation tai toimintakyvyn muutosta.",
      contribution: "BERM sijoittaa vastaanottotilan, jaksamisen ja motivaation liikkumista edeltäviksi ketjun osiksi. Liikkeen fysiologiset vaikutukset säilyvät, mutta aktiivisuusmittari ei yksin tunnista sitä muuttanutta säätelyä.",
      evidence: "Terveysliikunta ja askelmäärät järjestivät Amish- ja vertailumiehet eri tavoin. [[ref:katz2012_amish_activity|Katz 2012]].",
    },
  },
  {
    id: "chemicals-pollution",
    en: {
      label: "Chemicals and pollution",
      role: "Direct exposures and possible conditions of other effects.",
      correlation: "Industrial sources can combine chemical releases with changing electrical conditions.",
      masking: "External concentration does not specify cellular uptake or receiving state. In BERM, the chemical effect depends on field and receiving conditions, so the chemical alone does not identify the whole effect.",
      contribution: "BERM derives the chemical response from external concentration, internal dose and field-dependent receiving state together. The chemical retains its toxicity and causal role; the interaction assigns part of the resulting effect to the conditions under which it acts.",
      evidence: "Channel interventions changed cadmium uptake in an experiment without field exposure; a separate experiment combined ELF exposure with lead. [[ref:hinkle1987_cadmium_uptake|Hinkle 1987]]; [[ref:liu2002_elf_lead|Liu 2002]].",
    },
    fi: {
      label: "Kemikaalit ja saasteet",
      role: "Suoria altisteita ja mahdollisia muiden vaikutusten ehtoja.",
      correlation: "Teolliset lähteet voivat yhdistää kemikaalipäästöjä muuttuviin sähköisiin olosuhteisiin.",
      masking: "Ulkoinen pitoisuus ei määritä soluunottoa tai vastaanottotilaa. BERM:ssä kemikaalin vaikutus riippuu kenttä- ja vastaanotto-olosuhteista, joten kemikaali ei yksin yksilöi koko vaikutusta.",
      contribution: "BERM johtaa kemiallisen vasteen ulkoisen pitoisuuden, sisäisen annoksen ja kentästä riippuvan vastaanottotilan yhteisvaikutuksesta. Kemikaalin toksisuus ja kausaalinen rooli säilyvät; vuorovaikutus kohdistaa osan syntyvästä vaikutuksesta olosuhteisiin, joissa kemikaali vaikuttaa.",
      evidence: "Kanavainterventiot muuttivat kadmiumin soluunottoa kokeessa, jossa ei ollut kenttäaltistusta; erillisessä kokeessa yhdistettiin ELF-altistus ja lyijy. [[ref:hinkle1987_cadmium_uptake|Hinkle 1987]]; [[ref:liu2002_elf_lead|Liu 2002]].",
    },
  },
  {
    id: "reproductive-timing",
    en: {
      label: "Contraception, education and timing",
      role: "Reproductive control, opportunities and decisions about timing.",
      correlation: "Access to education and contraception can expand alongside electrification and urban services.",
      masking: "Birth timing combines intentions, constraints, partnership and biological capacity. Education or contraceptive access alone does not distinguish practical decisions from changes in motivation or reproductive capacity.",
      contribution: "BERM separates deliberate reproductive control and practical opportunities from receiving state, motivation and reproductive physiology. These are distinct causal parts of the same outcome; naming one does not explain the others.",
      evidence: "This entry describes the structure of BERM’s integration. Contraceptive action and practical constraints are included as causes, alongside the model’s biological pathway.",
    },
    fi: {
      label: "Ehkäisy, koulutus ja ajoitus",
      role: "Lisääntymisen säätelyä, toimintamahdollisuuksia ja ajoitusta koskevia päätöksiä.",
      correlation: "Koulutuksen ja ehkäisyn saatavuus voi kasvaa sähköistymisen sekä kaupunkipalveluiden mukana.",
      masking: "Syntymien ajoitus kokoaa aikomukset, rajoitteet, parisuhteet ja biologisen kapasiteetin. Koulutus tai ehkäisyn saatavuus ei yksin erottele käytännön päätöksiä motivaation tai lisääntymiskyvyn muutoksista.",
      contribution: "BERM erottaa tietoisen lisääntymisen säätelyn ja käytännön mahdollisuudet vastaanottotilasta, motivaatiosta ja lisääntymisfysiologiasta. Ne ovat saman lopputuloksen erillisiä kausaalisia osia; yhden nimeäminen ei selitä muita.",
      evidence: "Tässä kuvataan BERM:n kokoamisen rakennetta. Ehkäisyn vaikutus ja käytännön rajoitteet sisältyvät syihin mallin biologisen reitin rinnalla.",
    },
  },
  {
    id: "climate-habitat",
    en: {
      label: "Climate and habitat",
      role: "Direct environmental causes acting across species.",
      correlation: "Land use and infrastructure can change habitats, lighting and local field conditions together.",
      masking: "A broad habitat measure groups temperature, food, sensory cues and other exposures. A habitat–outcome association does not separate changes in the available cues from changes in the organism’s reception of them.",
      contribution: "BERM derives the response from environmental inputs and receiving state together. Climate, food and habitat structure retain direct effects; the field-dependent receiving pathway explains a different part of how those conditions become a biological response.",
      evidence: "This entry describes BERM’s integration of environmental pathways. Climate and habitat act across species and enter the same explanation as the model’s field and receiving conditions.",
    },
    fi: {
      label: "Ilmasto ja elinympäristö",
      role: "Suoria ympäristösyitä, jotka vaikuttavat yli lajirajojen.",
      correlation: "Maankäyttö ja infrastruktuuri voivat muuttaa elinympäristöä, valaistusta sekä paikallisia kenttäolosuhteita yhdessä.",
      masking: "Elinympäristön koontimittari kokoaa lämpötilan, ravinnon, aistivihjeet ja muut altistukset. Elinympäristön ja seurauksen yhteys ei erottele saatavilla olevien vihjeiden muutosta eliön vastaanoton muutoksesta.",
      contribution: "BERM johtaa vasteen ympäristön syötteiden ja vastaanottotilan yhteisvaikutuksesta. Ilmaston, ravinnon ja elinympäristön rakenteen suorat vaikutukset säilyvät; kentästä riippuva vastaanottoreitti selittää eri osan siitä, miten olosuhteista syntyy biologinen vaste.",
      evidence: "Tässä kuvataan ympäristöreittien yhdistämistä BERM:ssä. Ilmasto ja elinympäristö vaikuttavat yli lajirajojen ja kuuluvat samaan selitykseen mallin kenttä- ja vastaanotto-olosuhteiden kanssa.",
    },
  },
  {
    id: "diagnosis-recording",
    en: {
      label: "Diagnosis and recording",
      role: "Detection and classification of outcomes.",
      correlation: "Technology adoption can accompany screening, diagnostic access and more extensive records.",
      masking: "A diagnostic system explains detection, classification and recording. It does not itself explain a physiological change; a change in recorded prevalence does not separate these two processes.",
      contribution: "BERM derives separate stages for the biological response and its observation. A field-dependent physiological change belongs to the first stage, and diagnosis affects the second; explaining registration does not explain the origin of the physiological response.",
      evidence: "This entry states the distinction between the biological and observation processes in BERM. Screening and classification change how outcomes enter the record.",
    },
    fi: {
      label: "Diagnostiikka ja tilastointi",
      role: "Lopputulosten havaitsemista ja luokittelua.",
      correlation: "Teknologian yleistyminen voi kulkea seulonnan, diagnostiikan saatavuuden ja kattavamman kirjaamisen mukana.",
      masking: "Diagnoosijärjestelmä selittää havaitsemista, luokittelua ja kirjaamista. Se ei itsessään selitä fysiologista muutosta; kirjatun esiintyvyyden muutos ei erottele näitä kahta prosessia.",
      contribution: "BERM johtaa biologiselle vasteelle ja sen havainnoinnille erilliset vaiheet. Kentästä riippuva fysiologinen muutos kuuluu ensimmäiseen, diagnoosi vaikuttaa jälkimmäiseen; rekisteröinnin selittäminen ei selitä fysiologisen vasteen alkuperää.",
      evidence: "Tässä esitetään BERM:n biologisen prosessin ja havaintoprosessin erottelu. Seulonta ja luokittelu muuttavat sitä, miten lopputulokset päätyvät rekisteriin.",
    },
  },
];
