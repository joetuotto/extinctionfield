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
      masking: "An association attributed to income can include unmeasured contributions from the electrical environment.",
      contribution: "BERM adds local physical inputs and receiving states to the explanation of how living conditions affect biology.",
      evidence: "Electricity access was associated with fertility in regional data; EMF dose was not measured. [[ref:belmin2022_nature_sustainability|Belmin 2022]].",
    },
    fi: {
      label: "BKT ja vauraus",
      role: "Resurssien ja elinolojen laaja koontimittari.",
      correlation: "Sähköverkot ja laitteet ovat osa tuotantoa ja arjen kulutusta. Niiden yleistyminen voi muuttaa sekä talousmittareita että kenttäympäristöä.",
      masking: "Tuloille kirjautuva yhteys voi sisältää sähköisen elinympäristön vaikutuksia ilman, että niitä mitataan erikseen.",
      contribution: "BERM lisää paikallisen fysikaalisen syötteen ja vastaanottotilan siihen, miten elinolot vaikuttavat biologiaan.",
      evidence: "Sähkön saatavuus oli yhteydessä syntyvyyteen alueaineistossa; EMF-annosta ei mitattu. [[ref:belmin2022_nature_sustainability|Belmin 2022]].",
    },
  },
  {
    id: "urbanisation",
    en: {
      label: "Urbanisation",
      role: "A bundle of environments with several causal pathways.",
      correlation: "Dense settlement can bring lighting, electrical infrastructure and wireless sources together.",
      masking: "An urban–rural label leaves local exposure, housing and daily routines unresolved.",
      contribution: "BERM separates physical input from the organism’s state while retaining noise, pollution and social conditions as contributing causes.",
      evidence: "This is BERM’s interpretation of a broad environmental category.",
    },
    fi: {
      label: "Kaupungistuminen",
      role: "Useita kausaalisia reittejä sisältävä ympäristöjen koontiluokka.",
      correlation: "Tiheä asutus voi koota valaistuksen, sähköverkon ja langattomat lähteet samoihin paikkoihin.",
      masking: "Kaupunki–maaseutu-luokittelu jättää paikallisen altistuksen, asumisen ja päivärytmin avaamatta.",
      contribution: "BERM erottaa fysikaalisen syötteen eliön tilasta ja säilyttää melun, saasteet sekä sosiaaliset olot vaikuttavina syinä.",
      evidence: "Tämä on BERM:n tapa avata ympäristön koontiluokan sisältöä.",
    },
  },
  {
    id: "screen-time",
    en: {
      label: "Screen time and social media",
      role: "Behaviour that also changes exposure and social experience.",
      correlation: "Device use combines displayed light, connectivity, content and changes in activity.",
      masking: "Hours of use do not separate these pathways or the user’s prior state.",
      contribution: "BERM connects device conditions and receiving biology with attention, sleep and interaction, alongside effects of content.",
      evidence: "RF dose was modelled from device use; evening eReader use altered circadian timing in a separate experiment. [[ref:birks2021_modeled_rf_dose|Birks 2021]]; [[ref:chang2015_ipad_melatonin|Chang 2015]].",
    },
    fi: {
      label: "Ruutuaika ja sosiaalinen media",
      role: "Käyttäytymistä, joka muuttaa myös altistuksia ja sosiaalista kokemusta.",
      correlation: "Laitteen käyttö yhdistää näyttövalon, yhteydet, sisällöt ja liikkumisen muutokset.",
      masking: "Käyttötunnit eivät erottele näitä reittejä tai käyttäjän aiempaa tilaa.",
      contribution: "BERM yhdistää laitteen olosuhteet ja vastaanottobiologian tarkkaavuuteen, uneen ja vuorovaikutukseen sisältöjen vaikutusten rinnalla.",
      evidence: "RF-annosta mallinnettiin laitekäytöstä; erillisessä kokeessa iltalukeminen valoa tuottavalta laitteelta muutti vuorokausiajoitusta. [[ref:birks2021_modeled_rf_dose|Birks 2021]]; [[ref:chang2015_ipad_melatonin|Chang 2015]].",
    },
  },
  {
    id: "night-light",
    en: {
      label: "Light at night and shift work",
      role: "Direct optical exposure and a modifier of biological timing.",
      correlation: "Night work and illuminated environments can accompany intensive electrical infrastructure.",
      masking: "A schedule label can conceal light spectrum, timing and exposure history.",
      contribution: "BERM treats light as optical EMF and as a condition shaping subsequent reception.",
      evidence: "Coral spawning dates were associated with artificial night lighting. [[ref:davies2023_coral_light|Davies 2023]].",
    },
    fi: {
      label: "Yövalo ja vuorotyö",
      role: "Suora optinen altistus ja biologisen ajoituksen muokkaaja.",
      correlation: "Yötyö ja valaistut ympäristöt voivat liittyä laajaan sähköiseen infrastruktuuriin.",
      masking: "Työvuoron nimi voi peittää valon spektrin, ajoituksen ja altistushistorian.",
      contribution: "BERM käsittelee valoa optisena EMF:nä sekä myöhempää vastaanottoa muovaavana ehtona.",
      evidence: "Korallien kutuajankohdat olivat yhteydessä keinotekoiseen yövaloon. [[ref:davies2023_coral_light|Davies 2023]].",
    },
  },
  {
    id: "diet-calories",
    en: {
      label: "Diet and calories",
      role: "Direct metabolic inputs and possible intermediate steps.",
      correlation: "Food environments can change alongside electrification, lighting and daily routines.",
      masking: "Greater intake can explain weight gain while leaving the change in appetite unexplained.",
      contribution: "BERM adds receiving state and appetite regulation before intake, while retaining calories as a cause.",
      evidence: "Weight increased across several animal populations; intake was not fully controlled. [[ref:klimentidis2010|Klimentidis 2010]].",
    },
    fi: {
      label: "Ruokavalio ja kalorit",
      role: "Suoria aineenvaihdunnan syötteitä ja mahdollisia välivaiheita.",
      correlation: "Ruokaympäristö voi muuttua sähköistymisen, valaistuksen ja päivärytmin mukana.",
      masking: "Lisääntynyt syöminen voi selittää painonnousun ja jättää ruokahalun muutoksen selittämättä.",
      contribution: "BERM lisää vastaanottotilan ja ruokahalun säätelyn syömisen edelle säilyttäen kalorien kausaalisen vaikutuksen.",
      evidence: "Paino nousi useissa eläinpopulaatioissa; syötyä määrää ei täysin vakioitu. [[ref:klimentidis2010|Klimentidis 2010]].",
    },
  },
  {
    id: "physical-activity",
    en: {
      label: "Physical activity",
      role: "A direct physiological input and a possible behavioural response.",
      correlation: "Mechanisation and device use can change movement and the electromagnetic environment together.",
      masking: "Reported exercise can miss everyday movement; measured inactivity can leave its origin unexplained.",
      contribution: "BERM connects receiving state, energy and motivation with movement and its consequences.",
      evidence: "Reported exercise for health and step counts ranked Amish and non-Amish men differently. [[ref:katz2012_amish_activity|Katz 2012]].",
    },
    fi: {
      label: "Liikkuminen",
      role: "Suora fysiologinen syöte ja mahdollinen käyttäytymisvaste.",
      correlation: "Koneellistuminen ja laitteiden käyttö voivat muuttaa liikkumista sekä sähkömagneettista ympäristöä yhdessä.",
      masking: "Liikuntakysely voi ohittaa arkiliikkeen; mitattu vähäinen liike jättää alkuperänsä avoimeksi.",
      contribution: "BERM yhdistää vastaanottotilan, jaksamisen ja motivaation liikkumiseen sekä sen seurauksiin.",
      evidence: "Terveysliikunta ja askelmäärät järjestivät Amish- ja vertailumiehet eri tavoin. [[ref:katz2012_amish_activity|Katz 2012]].",
    },
  },
  {
    id: "chemicals-pollution",
    en: {
      label: "Chemicals and pollution",
      role: "Direct exposures and possible conditions of other effects.",
      correlation: "Industrial sources can combine chemical releases with changing electrical conditions.",
      masking: "External concentration leaves cellular uptake and response conditions unresolved.",
      contribution: "BERM connects field conditions with internal dose and receiving state while preserving chemical toxicity, including across species.",
      evidence: "Channel interventions changed cadmium uptake; another experiment combined ELF exposure with lead. [[ref:hinkle1987_cadmium_uptake|Hinkle 1987]]; [[ref:liu2002_elf_lead|Liu 2002]].",
    },
    fi: {
      label: "Kemikaalit ja saasteet",
      role: "Suoria altisteita ja mahdollisia muiden vaikutusten ehtoja.",
      correlation: "Teolliset lähteet voivat yhdistää kemikaalipäästöjä muuttuviin sähköisiin olosuhteisiin.",
      masking: "Ulkoinen pitoisuus jättää soluunoton ja vasteen ehdot avaamatta.",
      contribution: "BERM yhdistää kenttäolosuhteet sisäiseen annokseen ja vastaanottotilaan säilyttäen kemikaalien toksisuuden myös eri lajeissa.",
      evidence: "Kanavainterventiot muuttivat kadmiumin soluunottoa; toisessa kokeessa yhdistettiin ELF-altistus ja lyijy. [[ref:hinkle1987_cadmium_uptake|Hinkle 1987]]; [[ref:liu2002_elf_lead|Liu 2002]].",
    },
  },
  {
    id: "reproductive-timing",
    en: {
      label: "Contraception, education and timing",
      role: "Reproductive control, opportunities and decisions about timing.",
      correlation: "Access to education and contraception can expand alongside electrification and urban services.",
      masking: "Birth timing combines intentions, constraints, partnership and biological capacity.",
      contribution: "BERM adds receiving state, motivation and reproductive physiology to these distinct pathways.",
      evidence: "This is BERM’s proposed integration; contraceptive effects and practical constraints retain their causal roles.",
    },
    fi: {
      label: "Ehkäisy, koulutus ja ajoitus",
      role: "Lisääntymisen säätelyä, toimintamahdollisuuksia ja ajoitusta koskevia päätöksiä.",
      correlation: "Koulutuksen ja ehkäisyn saatavuus voi kasvaa sähköistymisen sekä kaupunkipalveluiden mukana.",
      masking: "Syntymien ajoitus kokoaa aikomukset, rajoitteet, parisuhteet ja biologisen kapasiteetin.",
      contribution: "BERM lisää vastaanottotilan, motivaation ja lisääntymisfysiologian näihin erillisiin reitteihin.",
      evidence: "Kyse on BERM:n ehdottamasta yhdistämisestä; ehkäisyn vaikutukset ja käytännön rajoitteet säilyvät kausaalisina tekijöinä.",
    },
  },
  {
    id: "climate-habitat",
    en: {
      label: "Climate and habitat",
      role: "Direct environmental causes acting across species.",
      correlation: "Land use and infrastructure can change habitats, lighting and local field conditions together.",
      masking: "A broad habitat measure can combine temperature, food, cues and other exposures.",
      contribution: "BERM adds physical inputs and receiving states to these interacting environmental pathways.",
      evidence: "BERM’s synthesis retains climate and habitat effects; species comparisons do not exclude them.",
    },
    fi: {
      label: "Ilmasto ja elinympäristö",
      role: "Suoria ympäristösyitä, jotka vaikuttavat yli lajirajojen.",
      correlation: "Maankäyttö ja infrastruktuuri voivat muuttaa elinympäristöä, valaistusta sekä paikallisia kenttäolosuhteita yhdessä.",
      masking: "Elinympäristön koontimittari voi yhdistää lämpötilan, ravinnon, vihjeet ja muut altistukset.",
      contribution: "BERM lisää fysikaalisen syötteen ja vastaanottotilan näihin toisiinsa vaikuttaviin ympäristöreitteihin.",
      evidence: "BERM:n synteesissä ilmasto ja elinympäristö säilyvät vaikuttavina tekijöinä; lajivertailu ei poissulje niitä.",
    },
  },
  {
    id: "diagnosis-recording",
    en: {
      label: "Diagnosis and recording",
      role: "Detection and classification of outcomes.",
      correlation: "Technology adoption can accompany screening, diagnostic access and more extensive records.",
      masking: "Recorded prevalence can change through biology, detection or both.",
      contribution: "BERM separates the biological response from its observation, clarifying how a proposed field contribution would appear in statistics.",
      evidence: "This is a distinction in BERM’s observation model; recording itself is not a biological cause.",
    },
    fi: {
      label: "Diagnostiikka ja tilastointi",
      role: "Lopputulosten havaitsemista ja luokittelua.",
      correlation: "Teknologian yleistyminen voi kulkea seulonnan, diagnostiikan saatavuuden ja kattavamman kirjaamisen mukana.",
      masking: "Kirjattu esiintyvyys voi muuttua biologian, havaitsemisen tai molempien kautta.",
      contribution: "BERM erottaa biologisen vasteen sen havainnoinnista ja täsmentää, miten ehdotettu kentän osuus näkyisi tilastoissa.",
      evidence: "Tämä on BERM:n havaintomallin erottelu; kirjaaminen itsessään ei ole biologinen syy.",
    },
  },
];
