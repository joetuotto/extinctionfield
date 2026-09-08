/** @reference-token-renderer components/ProxyDemographicTheories.tsx */
export type DemographicGroupId = "infrastructure" | "agency" | "capacity" | "feedback";

type TheoryCopy = { title: string; observation: string; derivation: string; evidence: string };
export type DemographicTheory = {
  id: string;
  group: DemographicGroupId;
  anchor: string;
  en: TheoryCopy;
  fi: TheoryCopy;
};

export const DEMOGRAPHIC_GROUPS = [
  { id: "infrastructure", en: { title: "Environment and development", question: "What changes together?" }, fi: { title: "Ympäristö ja kehityskulku", question: "Mikä muuttuu yhdessä?" } },
  { id: "agency", en: { title: "Intentions and practical conditions", question: "How does a wish become action?" }, fi: { title: "Aikeet ja toteuttamisen ehdot", question: "Miten toive muuttuu toiminnaksi?" } },
  { id: "capacity", en: { title: "Biological capacity", question: "What can the organism achieve?" }, fi: { title: "Biologinen kapasiteetti", question: "Mihin elimistö pystyy?" } },
  { id: "feedback", en: { title: "Social feedback", question: "What maintains the change?" }, fi: { title: "Yhteisön palaute", question: "Mikä ylläpitää muutosta?" } },
] as const;

// Each entry names a theory's main position, not an exclusive causal category.
export const DEMOGRAPHIC_THEORIES: DemographicTheory[] = [
  {
    id: "demographic-transition", group: "infrastructure", anchor: "causal-chain",
    fi: {
      title: "Demografinen transitio",
      observation: "Kuolleisuuden ja syntyvyyden muutokset jäsentyvät yhteiskuntien kehityskuluiksi. Transitio kuvaa muutoksen järjestystä; sen nimi ei yksilöi kaikkia vaikutusreittejä.",
      derivation: "BERM avaa modernisaation materiaalisiksi syötteiksi. Sähköistyminen muuttaa kenttäympäristöä samalla kun elinolot muuttuvat. Mallin biologinen haara kulkee vastaanottotilan kautta kapasiteettiin ja motivaatioon.",
      evidence: "Belminin aluepaneelissa sähkön saatavuuden yhteys säilyi useiden kehitysmuuttujien rinnalla. Se paikantaa lisäselitystä vaativan yhteyden; saatavuus ei vielä mittaa kenttää. [[ref:belmin2022_nature_sustainability|Belmin 2022]].",
    },
    en: {
      title: "Demographic transition",
      observation: "Mortality and fertility changes form recognisable development trajectories. A transition describes their sequence; its name does not identify every causal pathway.",
      derivation: "BERM resolves modernisation into material inputs. Electrification changes the field environment alongside living conditions. The model’s biological branch reaches capacity and motivation through receiving state.",
      evidence: "In Belmin’s regional panel, electricity access remained associated with fertility alongside several development variables. This locates an association needing explanation; access does not itself measure the field. [[ref:belmin2022_nature_sustainability|Belmin 2022]].",
    },
  },
  {
    id: "education", group: "infrastructure", anchor: "proxy-explanations",
    fi: {
      title: "Koulutus",
      observation: "Koulutus liittyy perheen perustamisen ajankohtaan, resursseihin, tietoon ja työmahdollisuuksiin. Koulutusvuosi kokoaa nämä eri reitit yhdeksi mittariksi.",
      derivation: "BERM erottaa koulutuksen omat vaikutukset sen kanssa muuttuvasta ympäristöstä. Pelkkä tutkintomuuttuja ei tunnista paikallista kenttää, valohistoriaa tai biologista vastaanottoa. Koulutuskerroin ei siksi jaa yhteyden mekanismeja loppuun.",
      evidence: "Belmin huomioi naisten koulutuksen sähköistymisen rinnalla. Sivun aiempi regressiotaulukko näyttää toistettavat arviot; koulutuksesta ei tehdä mitattua EMF-annosta. [[ref:belmin2022_nature_sustainability|Belmin 2022]].",
    },
    en: {
      title: "Education",
      observation: "Education relates to family timing, resources, knowledge and employment opportunities. Years of schooling combine these different pathways into one measure.",
      derivation: "BERM separates education’s own effects from its changing environment. A qualification variable does not identify the local field, light history or biological reception. Its coefficient therefore does not finish allocating the mechanisms behind an association.",
      evidence: "Belmin considered women’s education alongside electrification. The earlier regression table shows reproducible estimates; education is not assigned a measured EMF dose. [[ref:belmin2022_nature_sustainability|Belmin 2022]].",
    },
  },
  {
    id: "contraception", group: "agency", anchor: "demographic-process",
    fi: {
      title: "Ehkäisy ja lisääntymisen säätely",
      observation: "Ehkäisy muuttaa suoraan raskauden todennäköisyyttä. Bongaartsin kehys erottaa lisääntymistä välittävät tekijät niiden taustalla olevista syistä.",
      derivation: "BERM kysyy lisäksi, mikä tuottaa lastenhankinnan ajoitusta ja ehkäisyn käyttöä ohjaavan tilan. Välineen kausaalinen teho ja sen käytön alkuperä ovat kaksi eri selitystehtävää. Yhdistelmäehkäisy muuttaa lisäksi farmakologista vastaanottotilaa: esimerkiksi SHBG:n muutos kuuluu hormonin saatavuuteen ja muiden syötteiden vaikutusehtoihin. [[ref:panzer2006_shbg|Panzer 2006]].",
      evidence: "Japanin perhesuunnittelukyselyissä kondomi ja muut menetelmät näkyvät jo 1950-luvulla. Tietyn välineen saatavuus ja koko lisääntymisen säätely on siksi erotettava toisistaan. [[ref:bongaarts1978_proximate_determinants|Bongaarts 1978]]; [[ref:bongaarts2015_proximate_update|Bongaarts 2015]]; [[ref:japan_ipss2006_contraceptive_methods|IPSS, taulukko 4–25]].",
    },
    en: {
      title: "Contraception and reproductive control",
      observation: "Contraception directly changes pregnancy probability. Bongaarts’s framework distinguishes the proximate determinants of reproduction from their background causes.",
      derivation: "BERM additionally asks what produces the state guiding timing and contraceptive use. A method’s causal efficacy and the origin of its use are different explanatory tasks. Combined contraception also changes pharmacological receiving state: an SHBG change enters hormone availability and the conditions under which other inputs act. [[ref:panzer2006_shbg|Panzer 2006]].",
      evidence: "Japan’s family-planning surveys document condoms and other methods in the 1950s. Availability of one particular method must therefore be distinguished from reproductive control as a whole. [[ref:bongaarts1978_proximate_determinants|Bongaarts 1978]]; [[ref:bongaarts2015_proximate_update|Bongaarts 2015]]; [[ref:japan_ipss2006_contraceptive_methods|IPSS, Table 4–25]].",
    },
  },
  {
    id: "urbanisation", group: "infrastructure", anchor: "proxy-explanations",
    fi: {
      title: "Kaupungistuminen",
      observation: "Kaupunkiympäristö yhdistää asumisen, palvelut, kontaktit ja infrastruktuurin. Kaupunkiluokka ei erottele näiden vaikutuksia.",
      derivation: "BERM purkaa luokan vastaanottajalle saapuviksi syötteiksi ja toiminnan ehdoiksi. Asunnon hinta vaikuttaa toteuttamisen mahdollisuuteen; kenttähaara vaikuttaa mallissa vastaanottobiologiaan. Sama luokkamuuttuja voi peittää molemmat.",
      evidence: "Paikallinen RF-altistus riippuu lähteistä ja käyttötavoista. Pelkkä kaupunki–maaseutu-jako ei aseta kaikille yhteistä annoskerrointa. [[ref:frei2010_exposure_proxies|Frei 2010]].",
    },
    en: {
      title: "Urbanisation",
      observation: "An urban environment combines housing, services, contacts and infrastructure. An urban category does not separate their effects.",
      derivation: "BERM resolves the category into inputs reaching the receiver and conditions for action. Housing cost affects practical opportunity; the model’s field branch affects receiving biology. One category can conceal both.",
      evidence: "Local RF exposure depends on sources and use patterns. An urban–rural distinction does not assign everyone a common dose multiplier. [[ref:frei2010_exposure_proxies|Frei 2010]].",
    },
  },
  {
    id: "empowerment", group: "agency", anchor: "experienced-reasons",
    fi: {
      title: "Naisten autonomia ja työmahdollisuudet",
      observation: "Autonomia muuttaa sitä, miten ihminen voi toteuttaa omia tavoitteitaan. Työ, hoivan järjestäminen ja lapsitoive eivät ole sama muuttuja.",
      derivation: "BERM pitää toimijuuden todellisena ja johtaa motivaation osaksi biologista, opittua ja sosiaalista historiaa. Vapaus tehdä päätös ei yksin selitä päätöksen kaikkia lähtöehtoja eikä todista sen biologista heikkenemistä.",
      evidence: "Toisen transition teoria käsittelee myös autonomiaa ja arvoja. Niiden tilariippuvan muodostumisen selittäminen on BERM:n lisätehtävä. [[ref:lesthaeghe2010_second_transition|Lesthaeghe 2010]].",
    },
    en: {
      title: "Women’s autonomy and employment opportunities",
      observation: "Autonomy changes how people can pursue their goals. Employment, childcare arrangements and desire for children are distinct variables.",
      derivation: "BERM retains real agency and places motivation within biological, learned and social history. Freedom to decide does not alone explain all initial conditions of a decision or establish biological impairment.",
      evidence: "Second-transition theory also addresses autonomy and values. Explaining their state-dependent formation is BERM’s additional task. [[ref:lesthaeghe2010_second_transition|Lesthaeghe 2010]].",
    },
  },
  {
    id: "second-transition", group: "agency", anchor: "experienced-reasons",
    fi: {
      title: "Toinen demografinen transitio ja arvomuutos",
      observation: "SDT yhdistää perhemuotojen muutoksia autonomiaan, arvoihin ja instituutioihin. Arvot vaikuttavat toimintaan ja muuttuvat kokemusten mukana.",
      derivation: "BERM jatkaa selitystä koetun arvon taakse: vastaanottotila, muistot ja sosiaalinen palaute muokkaavat sitä, mikä tuntuu palkitsevalta. Arvon nimeäminen ei yksin selitä sen muodostumista.",
      evidence: "Lesthaeghen SDT-synteesi ja sivun aiemmat tulkkikokeet koskevat eri selitystasoja. Yksittäisestä arvosta ei päätellä henkilön hormoni- tai kenttätilaa. [[ref:lesthaeghe2010_second_transition|Lesthaeghe 2010]]; [[ref:johansson2005_choice_blindness|Johansson 2005]].",
    },
    en: {
      title: "Second demographic transition and value change",
      observation: "SDT connects changing family forms with autonomy, values and institutions. Values affect action and change with experience.",
      derivation: "BERM extends the explanation behind an experienced value: receiving state, memories and social feedback shape what feels rewarding. Naming a value does not alone explain its formation.",
      evidence: "Lesthaeghe’s SDT synthesis and the earlier interpreter experiments concern different explanatory levels. A person’s hormonal or field state cannot be inferred from one expressed value. [[ref:lesthaeghe2010_second_transition|Lesthaeghe 2010]]; [[ref:johansson2005_choice_blindness|Johansson 2005]].",
    },
  },
  {
    id: "becker", group: "infrastructure", anchor: "demographic-process",
    fi: {
      title: "Becker: tulot, kustannukset ja lapsiin panostaminen",
      observation: "Taloudellinen malli kuvaa resurssien, kustannusten ja perhettä koskevien preferenssien yhteyttä. Sen alkuperäinen muotoilu sallii myös ei-taloudelliset preferenssierot.",
      derivation: "BERM selittää osan mallin lähtötiedoista: mistä koettu palkitsevuus ja toimintaan käytettävissä oleva kapasiteetti syntyvät. Budjettirajoite säilyy todellisena; sen muuttaminen ei määrää kaikkia muita ketjun ehtoja.",
      evidence: "Taloudellista mallia ei tarvitse tulkita väitteeksi, että mikä tahansa riittävän suuri rahasumma poistaisi kaikki lisääntymisen esteet. [[ref:becker1960_fertility|Becker 1960]].",
    },
    en: {
      title: "Becker: income, costs and investment in children",
      observation: "The economic model relates resources, costs and family preferences. Its original formulation also allows non-economic differences in preferences.",
      derivation: "BERM explains some of the model’s inputs: the origins of experienced reward and available capacity for action. The budget constraint remains real; changing it does not determine every other condition in the chain.",
      evidence: "The economic model need not imply that any sufficiently large payment eliminates every reproductive constraint. [[ref:becker1960_fertility|Becker 1960]].",
    },
  },
  {
    id: "low-fertility-trap", group: "feedback", anchor: "receiver-state",
    fi: {
      title: "Matalan syntyvyyden loukku",
      observation: "Loukkumalli yhdistää väestörakenteen, perheihanteet ja taloudelliset odotukset palautteeksi. Syntyvyyden lasku muuttaa seuraavan sukupolven ympäristöä.",
      derivation: "BERM liittää palautteeseen vastaanottajan ja kohdattujen vihjeiden historian. Syntyvyyden väheneminen ei itsessään poista kenttäsyötettä. Jos myös hoivakontaktit muuttuvat, ne vaikuttavat mallissa seuraavaan vastaanottotilaan ja käyttäytymiseen.",
      evidence: "Lutzin, Skirbekkin ja Testan loukkumalli antaa demografisen palauterakenteen. Vauvakontaktin, oksitosiinin ja ihmisten syntyvyyden koko silmukka on BERM:n koostama yhteys. [[ref:lutz2006_low_fertility_trap|Lutz, Skirbekk & Testa 2006]].",
    },
    en: {
      title: "The low-fertility trap",
      observation: "The trap hypothesis connects population structure, family ideals and economic expectations through feedback. Declining fertility changes the next generation’s environment.",
      derivation: "BERM adds the history of the receiver and encountered cues. Fewer births do not themselves remove the field input. If caregiving contacts also change, the model connects them to later receiving state and behaviour.",
      evidence: "Lutz, Skirbekk and Testa provide the demographic feedback structure. The complete infant-contact–oxytocin–human-fertility loop is a BERM composition. [[ref:lutz2006_low_fertility_trap|Lutz, Skirbekk & Testa 2006]].",
    },
  },
  {
    id: "social-comparison", group: "feedback", anchor: "syndrome-fragmentation",
    fi: {
      title: "Sosiaalinen vertailu ja intensiivinen vanhemmuus",
      observation: "Vertailu muiden perheiden panostuksiin voi muuttaa koettuja kustannuksia ja vanhemmuuden vaatimuksia.",
      derivation: "BERM liittää vertailun oppimisen ja palkitsevuuden palautteeseen. Sama vastaanottotila osallistuu siihen, miten vaatimukset koetaan ja mihin hoivaa suunnataan. Vertailumekanismi selittää tämän vaiheen, ei koko fyysistä ja biologista lähtötilaa.",
      evidence: "Mahlerin, Tertiltin ja Yumin työ tarkastelee maiden eroja ja sosiaalisen vertailun mekanismia. Sen EMF-haara on BERM:n lisäys. [[ref:mahler2025_social_comparisons|Mahler, Tertilt & Yum 2025]].",
    },
    en: {
      title: "Social comparison and intensive parenting",
      observation: "Comparison with other families’ investments can change perceived costs and the demands of parenting.",
      derivation: "BERM connects comparison to learning and reward feedback. The receiving state participates in how demands feel and where care is directed. Comparison explains this stage, not the whole physical and biological starting state.",
      evidence: "Mahler, Tertilt and Yum examine cross-country differences and social comparison. The EMF branch is BERM’s addition. [[ref:mahler2025_social_comparisons|Mahler, Tertilt & Yum 2025]].",
    },
  },
  {
    id: "semen-trends", group: "capacity", anchor: "sentinel-species",
    fi: {
      title: "Siemennesteen muutokset",
      observation: "Siemennestetutkimukset mittaavat biologista toimintaa erillään kyselyllä ilmaistusta lapsitoiveesta. Pitoisuus, kokonaismäärä ja liikkuvuus ovat eri päätemuuttujia.",
      derivation: "BERM kytkee nämä kapasiteettihaaraan: toive ja yrittäminen voivat säilyä samalla kun hedelmöittymisen ehdot muuttuvat. Lajivertailu laajentaa selityksen ihmisinstituutioiden ulkopuolelle.",
      evidence: "Ihmis-, koira- ja hevostrendit ovat edellä omissa yksiköissään. Ne eivät sisällä samanaikaista paikallisen EMF-annoksen mittausta. [[ref:levine2023_sperm|Levine 2023]]; [[ref:lea2016|Lea 2016]]; [[ref:harris2023|Harris 2023]].",
    },
    en: {
      title: "Changes in semen parameters",
      observation: "Semen studies measure biological function separately from a reported wish for children. Concentration, total count and motility are distinct endpoints.",
      derivation: "BERM places them in the capacity branch: desire and attempts can remain while the conditions for fertilisation change. Cross-species comparison extends explanation beyond human institutions.",
      evidence: "Human, dog and horse trends appear above in their own units. They do not include simultaneous measurements of local EMF dose. [[ref:levine2023_sperm|Levine 2023]]; [[ref:lea2016|Lea 2016]]; [[ref:harris2023|Harris 2023]].",
    },
  },
  {
    id: "endocrine-disruptors", group: "capacity", anchor: "joint-exposures",
    fi: {
      title: "Endokriiniset häiritsijät ja kemikaalit",
      observation: "Kemikaali voi muuttaa lisääntymisbiologiaa. Ulkoinen pitoisuus, kudokseen päätyvä annos ja kudoksen vaste ovat ketjun eri osia.",
      derivation: "BERM sijoittaa kentän ja kemikaalin samaan tilariippuvaan vastaanottoon. Kemikaalikertoimeen voi tällöin sisältyä yhteisvaikutus. Yhden vanhan saasteen väheneminen ei määrää kaikkien seosten tai sisäisten annosten kehitystä.",
      evidence: "Ihmisen ja koiran siittiöillä on tutkittu samoja kemikaaleja; koiraa ei käsitellä kemikaaleista vapaana vertailuna. Kenttä–metalli-kokeet ovat omassa yhteisaltistusosiossaan. [[ref:sumner2019_human_dog_sperm|Sumner 2019]].",
    },
    en: {
      title: "Endocrine disruptors and chemicals",
      observation: "A chemical can change reproductive biology. External concentration, tissue dose and tissue response are separate parts of the chain.",
      derivation: "BERM places fields and chemicals within the same state-dependent reception. A chemical coefficient can then include an interaction. Decline in one legacy pollutant does not determine the history of every mixture or internal dose.",
      evidence: "The same chemicals have been studied in human and dog sperm; dogs are not treated as chemical-free controls. Field–metal experiments appear in the joint-exposure section. [[ref:sumner2019_human_dog_sperm|Sumner 2019]].",
    },
  },
  {
    id: "smartphones", group: "feedback", anchor: "proxy-explanations",
    fi: {
      title: "Älypuhelimet ja digitaalinen käyttäytyminen",
      observation: "Puhelin välittää sisältöä, muuttaa kontakteja ja tuottaa optista sekä käyttötilasta riippuvaa RF-altistusta. Käyttöminuutti ei erottele näitä.",
      derivation: "BERM seuraa erikseen sisältöä, vastaanottotilaa ja fysikaalista syötettä. Sama laite voi yhdistää sosiaalisen palautteen biologiseen haaraan; koko yhteyden kirjaaminen ruutuajalle jättää tämän koostumuksen auki.",
      evidence: "Rahbanin käyttöryhmät ja Frein altistusvertailut ovat jo sivulla. Sisältö ei määrää samaa lähetystehoa: verkkoyhteys, sijainti ja käyttötapa vaikuttavat altistukseen. [[ref:rahban2023_phone_semen|Rahban 2023]]; [[ref:frei2010_exposure_proxies|Frei 2010]].",
    },
    en: {
      title: "Smartphones and digital behaviour",
      observation: "A phone delivers content, changes contacts and produces optical and use-dependent RF exposure. A minute of use does not separate these inputs.",
      derivation: "BERM follows content, receiving state and physical input separately. One device can connect social feedback to the biological branch; attributing the whole association to screen time leaves this composition unresolved.",
      evidence: "Rahban’s use groups and Frei’s exposure comparisons appear earlier. Content does not determine equal transmission power: network connection, location and use pattern affect exposure. [[ref:rahban2023_phone_semen|Rahban 2023]]; [[ref:frei2010_exposure_proxies|Frei 2010]].",
    },
  },
  {
    id: "postponement", group: "agency", anchor: "demographic-process",
    fi: {
      title: "Lykkääminen: ajoitus ja lopullinen lapsiluku",
      observation: "Synnytysten siirtyminen myöhemmäksi voi alentaa tietyn vuoden TFR:ää ilman yhtä suurta muutosta sukupolven lopullisessa lapsiluvussa. Myöhempi yrittäminen kohtaa myös iän biologiset vaikutukset.",
      derivation: "BERM seuraa samalla ikää, vastaanottajan historiaa ja yrityksille jäävää aikaa. Lykkääminen voi olla aiemman muutoksen välivaihe ja myöhemmän kapasiteettirajoitteen vahvistaja. Siksi sen vakiointi muuttaa tarkasteltavaa vaikutusreittiä.",
      evidence: "Tempo- ja määrällinen vaikutus on erotettava ennen syntyvyysluvun tulkintaa. Ikää ei muuteta laskennallisesti EMF-vuosiksi ilman altistushistoriaa. [[ref:bongaarts1998_tempo_quantum|Bongaarts & Feeney 1998]].",
    },
    en: {
      title: "Postponement: timing and completed family size",
      observation: "Later births can reduce a particular year’s TFR without an equally large change in a cohort’s completed fertility. Later attempts also encounter biological ageing.",
      derivation: "BERM follows age, receiver history and remaining time for attempts together. Postponement can mediate an earlier change and amplify a later capacity constraint. Adjusting for it therefore changes the pathway being assessed.",
      evidence: "Tempo and quantum must be separated before interpreting fertility rates. Age is not converted into EMF-years without exposure histories. [[ref:bongaarts1998_tempo_quantum|Bongaarts & Feeney 1998]].",
    },
  },
  {
    id: "intention-gap", group: "agency", anchor: "demographic-intention-outcomes",
    fi: {
      title: "Lapsitoiveen ja toteutuman ero",
      observation: "Sama ihminen voi saada vähemmän, yhtä monta tai enemmän lapsia kuin aiemmin odotti. Näiden ryhmien erot voivat kumota toisiaan keskiarvossa.",
      derivation: "BERM jakaa toteutumisen vastaanottotilaan, motivaatioon, mahdollisuuksiin, ajoitukseen ja kapasiteettiin. Toiveen säilyminen ei takaa kaikkien myöhempien ehtojen täyttymistä; toteutunut lapsiluku ei yksin paljasta, mikä ehto muuttui.",
      evidence: "Seurantakuva vertaa samojen ihmisten odotuksia ja myöhempää lapsilukua. Alitus ei yksin diagnosoi biologista vauriota tai EMF-vaikutusta. [[ref:morgan2010_intentions_realization|Morgan & Rackin 2010]].",
    },
    en: {
      title: "The gap between expected and realised fertility",
      observation: "The same person may have fewer, the same number or more children than previously expected. These differences can offset one another in an average.",
      derivation: "BERM separates receiving state, motivation, opportunity, timing and capacity. A continuing wish does not guarantee every later condition; later family size does not alone reveal which condition changed.",
      evidence: "The longitudinal figure compares the same people’s expectations and later fertility. Undershooting alone does not diagnose biological damage or an EMF effect. [[ref:morgan2010_intentions_realization|Morgan & Rackin 2010]].",
    },
  },
  {
    id: "assisted-reproduction", group: "capacity", anchor: "compensation",
    fi: {
      title: "Hedelmöityshoidot ja kompensaatio",
      observation: "Hoito voi mahdollistaa syntymän tilanteessa, jossa ilman hoitoa raskaus ei toteudu. Syntymien määrä ja hoitamattoman lisääntymistoiminnan tila ovat eri mittareita.",
      derivation: "BERM sijoittaa hoidon kompensoivaksi reitiksi. Sama lopputulos voidaan saavuttaa muuttuneella biologisella kapasiteetilla ja kasvavalla avun tarpeella. Lopputuloksen säilyminen ei siis yksin osoita koko ketjun säilymistä.",
      evidence: "Smithin rekisteritutkimus seuraa toistuvien IVF-hoitokertojen ja elävänä syntymien yhteyttä. Hoidon käyttö riippuu myös saatavuudesta ja iästä, joten sen yleistyminen ei yksin mittaa ympäristöstä syntynyttä vauriota. [[ref:smith2015_repeat_ivf_livebirth|Smith 2015]].",
    },
    en: {
      title: "Assisted reproduction and compensation",
      observation: "Treatment can enable a birth when pregnancy would not otherwise occur. Birth numbers and unassisted reproductive function are different measures.",
      derivation: "BERM places treatment in a compensatory pathway. The same endpoint can be reached with changed biological capacity and greater need for assistance. A preserved endpoint does not alone establish an unchanged chain.",
      evidence: "Smith’s registry study follows repeated IVF treatment cycles and live births. Uptake also depends on access and age, so an increase does not itself measure environmentally caused damage. [[ref:smith2015_repeat_ivf_livebirth|Smith 2015]].",
    },
  },
  {
    id: "climate-concern", group: "agency", anchor: "experienced-reasons",
    fi: {
      title: "Tulevaisuushuoli ja ilmastoahdistus",
      observation: "Huoli voi olla aito päätökseen vaikuttava syy. Ilmaistu perustelu kertoo koetusta merkityksestä; se ei mittaa kaikkia kokemusta muodostavia prosesseja.",
      derivation: "BERM johtaa huolen kokemisen informaation, oppimisen ja vastaanottotilan yhteisestä historiasta. Koetun syyn tunnistaminen jättää sen muodostumisen selitettäväksi. Malli ei tarvitse oletusta, että moraalinen perustelu olisi epärehellinen.",
      evidence: "Tulkkikokeet osoittavat rajatuissa tehtävissä, ettei oman selityksen vakuuttavuus takaa pääsyä päätöksen syntyprosessiin. Ne eivät osoita ilmastohuolta tietyn hormonimuutoksen tuotteeksi. [[ref:johansson2005_choice_blindness|Johansson 2005]].",
    },
    en: {
      title: "Concern about the future and climate anxiety",
      observation: "Concern can be a real reason affecting a decision. A reported reason describes experienced meaning; it does not measure every process producing that experience.",
      derivation: "BERM derives experienced concern from the joint history of information, learning and receiving state. Identifying a felt reason leaves its formation to explain. The model does not require a moral explanation to be insincere.",
      evidence: "Interpreter experiments show in bounded tasks that a convincing explanation does not guarantee access to how a decision arose. They do not establish climate concern as the product of a particular hormonal change. [[ref:johansson2005_choice_blindness|Johansson 2005]].",
    },
  },
  {
    id: "testicular-cancer", group: "capacity", anchor: "sentinel-species",
    fi: {
      title: "Lisääntymissairaudet ja vauraus",
      observation: "Lisääntymisterveyden mittarit, kuten siemennesteen muutokset ja kivessyövän ilmaantuvuus, voivat liittyä samoihin elinympäristöihin. Ne ovat silti eri sairauksia ja päätemuuttujia.",
      derivation: "BERM etsii yhteisestä ympäristöstä vastaanottobiologiaan johtavia reittejä. Vaurausluokka ei ole kudosmekanismi; myöskään oksidatiivisen stressin nimeäminen ei yksin johda tiettyyn syöpään.",
      evidence: "Aitken kokoaa lisääntymisterveyden ympäristötekijöitä ja käsittelee myös sähkömagneettista säteilyä. Katsaus ei anna puhelimen taskusäilytykselle kivessyöpää osoittavaa koeasetelmaa. [[ref:aitken2024_fertility_drivers|Aitken 2024]].",
    },
    en: {
      title: "Reproductive disorders and prosperity",
      observation: "Reproductive-health measures, including semen changes and testicular-cancer incidence, can relate to shared environments. They remain distinct disorders and endpoints.",
      derivation: "BERM seeks pathways from a shared environment to receiving biology. Prosperity is not a tissue mechanism; naming oxidative stress also does not by itself derive a particular cancer.",
      evidence: "Aitken assembles environmental factors in reproductive health and explicitly includes electromagnetic radiation. The review does not supply an experiment establishing pocket-phone exposure as a cause of testicular cancer. [[ref:aitken2024_fertility_drivers|Aitken 2024]].",
    },
  },
  {
    id: "epigenetic-history", group: "capacity", anchor: "receiver-state",
    fi: {
      title: "Epigeneettinen ja sukupolvinen historia",
      observation: "Aiempi altistus voi jättää biologiseen tilaan pitkäkestoisia muutoksia. Yksilön muisti, suoraan altistuneet sukupolvet ja altistumattomaan sukupolveen periytyminen ovat eri väitteitä.",
      derivation: "BERM pitää historian eksplisiittisenä osana vastaanottotilaa. Tämän avulla nykyinen vaste voi riippua aiemmista ehdoista. Periytyvää EMF-vaikutusta varten tarvitaan lisäksi oma, sukupolvet yhdistävä mekanismi.",
      evidence: "Nykyisen vastaanottotilan historiariippuvuus ei yksin osoita jälkeläisvaikutusta. Sivun valo–kenttä-kokeet rajaavat tilamuistia omissa järjestelmissään. [[ref:hammad2020_dark_cryptochrome|Hammad 2020]].",
    },
    en: {
      title: "Epigenetic and intergenerational history",
      observation: "Previous exposure can leave lasting biological changes. Individual memory, directly exposed generations and inheritance into an unexposed generation are different claims.",
      derivation: "BERM explicitly includes history in receiving state, allowing the present response to depend on earlier conditions. An inherited EMF effect additionally requires a mechanism connecting generations.",
      evidence: "History dependence in a current receiver does not alone establish an offspring effect. The earlier light–field experiments constrain state memory in their own systems. [[ref:hammad2020_dark_cryptochrome|Hammad 2020]].",
    },
  },
  {
    id: "two-pathways", group: "infrastructure", anchor: "explanatory-parsimony",
    fi: {
      title: "Kaksi väestöllistä polkua",
      observation: "Itaon analyysi löytää kaksi säännönmukaisuutta syntyneisyyden ja elinajanodotteen välille. Pääanalyysin λ on syntyneitä tuhatta henkilövuotta kohti, ei TFR.",
      derivation: "BERM käsittelee säännönmukaisuutta kokoavan selityksen kohteena. Elinajanodote ja kenttäympäristö kuuluvat laajempaan kehityskulkuun, mutta niiden välille ei synny biologista siirtofunktiota pelkän samankaltaisen käyrämuodon perusteella.",
      evidence: "Julkaistu vuoden 2026 analyysi kattaa 237 maata ja aluetta vuosilta 1800–2020. Sen kahden polun rakenne ei itsessään määritä EMF-kynnystä. [[ref:itao2026_two_pathways|Itao 2026]].",
    },
    en: {
      title: "Two demographic pathways",
      observation: "Itao’s analysis finds two regularities linking birth rates and life expectancy. Its main λ measure is births per thousand person-years, not TFR.",
      derivation: "BERM treats the regularity as something a unifying explanation must account for. Longevity and the field environment belong to broader development, but similar curve shapes do not supply a biological transfer function between them.",
      evidence: "The published 2026 analysis covers 237 countries and territories during 1800–2020. Its two-pathway structure does not itself define an EMF threshold. [[ref:itao2026_two_pathways|Itao 2026]].",
    },
  },
  {
    id: "incomplete-convergence", group: "infrastructure", anchor: "community-proxies",
    fi: {
      title: "Maiden epätäydellinen lähentyminen",
      observation: "Samankaltainen vauraus ei tuota kaikkialla samaa syntyvyyttä. Maiden erot haastavat yhden koontimuuttujan yleispätevyyden.",
      derivation: "BERM käyttää yhteistä vastaanottorakennetta mutta säilyttää syötteiden, biologisen tilan, historian ja toteuttamisen ehtojen erot. Parsimonia tarkoittaa saman mekanismin käyttöä eri olosuhteissa, ei samaa kerrointa jokaiselle maalle.",
      evidence: "Maiden heterogeenisuus on myös Mahlerin ja kollegoiden analyysin lähtökohta. Yhteisön teknologiarajoitus tai korkea syntyvyys ei yksin mittaa sen kenttäaltistusta. [[ref:mahler2025_social_comparisons|Mahler, Tertilt & Yum 2025]].",
    },
    en: {
      title: "Incomplete convergence across countries",
      observation: "Similar prosperity does not produce equal fertility everywhere. Country differences challenge a single aggregate variable’s universality.",
      derivation: "BERM uses a shared receiving structure while retaining differences in inputs, biological state, history and practical conditions. Parsimony means reusing a mechanism across conditions, not assigning every country the same coefficient.",
      evidence: "Cross-country heterogeneity also motivates Mahler and colleagues’ analysis. A community’s technology restrictions or high fertility do not alone measure its field exposure. [[ref:mahler2025_social_comparisons|Mahler, Tertilt & Yum 2025]].",
    },
  },
  {
    id: "china-policy", group: "feedback", anchor: "demographic-process",
    fi: {
      title: "Kiinan politiikan jälkivaikutus",
      observation: "Lapsilukurajoituksen lieventäminen muuttaa lupaa toteuttaa toive. Aiempi politiikka on jo vaikuttanut ikärakenteeseen, perheisiin ja ajoitukseen.",
      derivation: "BERM:n premisseillä kiellon poistaminen ei nollaa vastaanottajan historiaa, biologista kapasiteettia tai ympäristösyötettä. Siksi välitön vaste ja pysyvä palautuminen ovat eri seurauksia, joita on selitettävä erikseen.",
      evidence: "Kiinan vuoden 2016 kahden lapsen politiikkaan liittyi tutkimuksessa lyhyen aikavälin lisäsyntymiä. Esimerkki tukee eri aikatasojen erottelua; se ei yksin tunnista jatkuvan matalan syntyvyyden EMF-osuutta. [[ref:li2019_two_child_policy|Li 2019]].",
    },
    en: {
      title: "China’s policy legacy",
      observation: "Relaxing a birth limit changes permission to realise a wish. Earlier policy has already affected age structure, families and timing.",
      derivation: "Under BERM’s premises, removing a prohibition does not reset receiver history, biological capacity or environmental input. An immediate response and sustained recovery are therefore distinct outcomes needing separate explanations.",
      evidence: "A study associated China’s 2016 two-child policy with additional births in the short term. The example supports separating timescales; it does not alone identify the EMF contribution to persistently low fertility. [[ref:li2019_two_child_policy|Li 2019]].",
    },
  },
  {
    id: "pronatal-policy", group: "agency", anchor: "demographic-process",
    fi: {
      title: "Lapsiperhetuet ja palautumisen rajat",
      observation: "Rahallinen tuki muuttaa kustannuksia, mutta sen vaikutusta pitää arvioida suhteessa siihen, mitä ilman tukea olisi tapahtunut. Laskeva kansallinen trendi ei yksin osoita tuen tehottomuutta.",
      derivation: "BERM johtaa tästä ketjurajoitteen: taloudellisen esteen poistaminen ei itsessään korjaa biologista kapasiteettia, motivaatiota tai menetettyä aikaa. Tuki voi vaikuttaa ja kokonaistrendin taustaehto silti jatkua.",
      evidence: "Quebecin syntymätukiohjelmasta on myönteinen vaikutusarvio. Se sopii samaan reittikarttaan: taloudellinen haara on kausaalinen, mutta ei kata koko toteutumisprosessia. [[ref:milligan2005_birth_subsidy|Milligan 2005]].",
    },
    en: {
      title: "Family support and limits to recovery",
      observation: "Financial support changes costs, but its effect must be judged against what would have happened without it. A falling national trend alone does not establish ineffectiveness.",
      derivation: "BERM derives a chain constraint: removing a financial barrier does not itself restore biological capacity, motivation or lost time. Support can have an effect while the broader trend’s background condition persists.",
      evidence: "Quebec’s birth-subsidy programme has a positive effect estimate. It fits the same pathway map: the economic branch is causal but does not cover the entire process. [[ref:milligan2005_birth_subsidy|Milligan 2005]].",
    },
  },
  {
    id: "family-ideals", group: "feedback", anchor: "receiver-state",
    fi: {
      title: "Ihanteellisen perhekoon muuttuminen",
      observation: "Perheihanne muodostuu kokemuksista, normeista ja mahdollisina pidetyistä tulevaisuuksista. Sen muutos voi olla sekä myöhemmän toiminnan syy että aiempien kokemusten seuraus.",
      derivation: "BERM sulkee palautteen ajassa: kohdatut perheet ja hoivakontaktit muokkaavat myöhempää vastaanottotilaa, ja toistuvat päätökset muuttavat seuraavia kontakteja. Tällöin normi on myös biologisesti toteutuvan palautteen muistia.",
      evidence: "Loukkumalli käsittelee perheihanteiden palautetta. Seuranta puolestaan erottaa aiemman odotuksen myöhemmästä lapsiluvusta. Näistä ei seuraa yksilön ihanteelle määrätty hormoniprofiili. [[ref:lutz2006_low_fertility_trap|Lutz, Skirbekk & Testa 2006]]; [[ref:morgan2010_intentions_realization|Morgan & Rackin 2010]].",
    },
    en: {
      title: "Changing family-size ideals",
      observation: "Family ideals arise from experiences, norms and perceived possible futures. A changing ideal can cause later action and result from earlier experience.",
      derivation: "BERM closes the feedback through time: encountered families and caregiving contacts shape later receiving state, while repeated decisions change subsequent contacts. A norm then also stores biologically realised feedback.",
      evidence: "The trap hypothesis addresses feedback in family ideals; longitudinal observation separates earlier expectations from later family size. Neither assigns a fixed hormonal profile to an individual ideal. [[ref:lutz2006_low_fertility_trap|Lutz, Skirbekk & Testa 2006]]; [[ref:morgan2010_intentions_realization|Morgan & Rackin 2010]].",
    },
  },
];
