import { InlineReferenceText } from "@/components/InlineReferenceText";
import { StudyCitation } from "@/components/StudyCitation";

const COPY = {
  en: {
    refsTitle: "References",
    sections: [
      {
        heading: null,
        paragraphs: [
          "In 2024, the average testosterone level in a 25-year-old American man was approximately what a 40-year-old had in 1985. This is not aging. It is a population-wide biological shift, documented across every industrialized country that has measured it.",
          "The standard response treats low testosterone as a medical curiosity — something for endocrinologists to manage in individual patients. But testosterone is not only a reproductive hormone. It is one of the brain's primary regulators of motivation, risk-taking, status-seeking, and approach behavior. When it declines across an entire population, the effects extend far beyond the clinic.",
          "At the same time, cortisol — the stress hormone — has been rising. These two shifts are not independent. BERM predicts that EMF exposure drives both: testosterone down through the HPG axis (pathways A, B, D) and cortisol up through HPA activation (pathway D). The result is what we call the dual lock.",
        ],
      },
      {
        heading: "The dual-hormone hypothesis",
        paragraphs: [
          "The interaction between testosterone and cortisol in regulating dominant behavior was formalized by [[ref:mehta2010_dual_hormone|Mehta and Josephs in 2010]]. Their dual-hormone hypothesis proposes that testosterone's effect on status-seeking behavior is not fixed — it depends on cortisol. When cortisol is low, testosterone drives approach behavior, competition, and status pursuit. When cortisol is high, testosterone's effect is attenuated.",
          "A meta-analysis of 8,538 participants confirmed this: the relationship is multiplicative, not additive. High testosterone with low cortisol produces strong status-seeking behavior. High testosterone with high cortisol produces moderate behavior. Low testosterone with high cortisol — the pattern BERM predicts EMF produces — results in behavioral suppression greater than either hormone shift alone.",
          "This is the dual lock. One lock removes the drive (testosterone down: less motivation, less risk-taking, less competitive impulse). The other lock adds the brake (cortisol up: more anxiety, more avoidance, more withdrawal). Together, they suppress approach behavior more effectively than either mechanism independently.",
        ],
      },
      {
        heading: "A rough quantitative estimate",
        paragraphs: [
          "Consider a simplified model. In 1980, average testosterone was approximately 500 ng/dL and cortisol was at baseline. If we index status-seeking behavior to these values as 1.0, then the 2024 population — with testosterone approximately 320 ng/dL (−36%) and cortisol approximately +20% — produces a multiplicative effect: 0.64 × 0.83 ≈ 0.53.",
          "This suggests a roughly 47% decline in hormonally-driven status-seeking behavior. Testosterone alone accounts for −36%. Cortisol alone accounts for −17%. The combination, because it is multiplicative, accounts for −47%. The dual lock is substantially worse than the sum of its parts.",
          "This estimate is illustrative, not precise. The real dose-response curves are nonlinear and poorly characterized. But the direction and the multiplicative interaction are established.",
        ],
      },
      {
        heading: "Eight observable trends",
        paragraphs: [
          "If the dual lock is real, it should produce observable population-level behavioral changes. BERM identifies eight trends that are consistent with population-wide testosterone decline combined with cortisol elevation. All eight have accelerated since the 2010s — coinciding with smartphone mass adoption.",
        ],
      },
      {
        heading: "1. The sexlessness epidemic",
        paragraphs: [
          "The share of young men (18–30) without a sexual partner has risen steadily across industrialized countries. In Japan, 43% of men aged 18–34 reported being virgins in 2015. In the United States, the share of men under 30 reporting no sexual partners in the past year doubled between 2008 and 2018.",
          "The dual lock prediction: testosterone decline reduces sexual desire directly (endocrinological consensus), while cortisol elevation increases fear of rejection. The combination suppresses approach behavior — the willingness to initiate contact — more than either alone. [[ref:goetz2024|Goetz et al. (2024, RCT)]] demonstrated that exogenous testosterone increases the tendency to interpret ambiguous social signals as sexual interest. Population-wide testosterone decline reverses this: fewer signals are read as interest, fewer approaches are made.",
        ],
      },
      {
        heading: "2. Male labor force exit",
        paragraphs: [
          "In April 2026, 33% of American men were neither working nor looking for work — the lowest labor force participation rate since record-keeping began in the 1940s. The decline from 87% (post-war peak) to 67% (2026) has accelerated since 2010.",
          "The dual lock prediction: testosterone decline reduces status motivation ([[ref:dreher2016|Dreher et al. 2016, PNAS, RCT]]: exogenous testosterone causally increases status-seeking behavior). Cortisol elevation makes workplace competition aversive rather than stimulating. The combination makes opting out easier than competing.",
        ],
      },
      {
        heading: "3. Failure to launch",
        paragraphs: [
          "In 2020, more than 50% of Americans aged 18–29 lived with their parents — the highest rate since the 1930s. This is typically attributed to housing costs and student debt, but the trend predates the worst of both.",
          "The dual lock prediction: testosterone decline in young men has been steeper than in older men. [[ref:lokeshwar2021|Lokeshwar et al. (2021)]] documented a −1.82%/year decline in adolescents and young adults. A 25-year-old in 2024 has the hormonal profile of a 40-year-old from the 1980s. The drive to establish independent status — one of testosterone's core behavioral effects — is biologically diminished.",
        ],
      },
      {
        heading: "4. Declining risk-taking and entrepreneurship",
        paragraphs: [
          "Testosterone correlates with financial risk tolerance, entrepreneurial behavior, and competitive decision-making. New business formation rates per capita have declined across most OECD countries. Young people increasingly prefer stable employment over entrepreneurship.",
          "The dual lock prediction: testosterone decline reduces risk appetite directly. Cortisol elevation further shifts the risk-reward calculation toward safety-seeking. The population becomes more cautious, more risk-averse, more inclined toward security over ambition.",
        ],
      },
      {
        heading: "5. The depression epidemic",
        paragraphs: [
          "Depression diagnoses have increased dramatically since the 2010s. SSRI prescriptions have risen approximately 400% over 20 years. The increase is especially sharp in young people and in men.",
          "BERM offers a multi-pathway explanation: testosterone decline produces anhedonia (loss of pleasure and motivation). Melatonin disruption degrades sleep, a primary depression risk factor. Cortisol elevation creates chronic stress physiology. Dopamine desensitization reduces reward sensitivity. These are four independent biological routes to depression operating simultaneously — and all four are predicted by BERM's EMF exposure model.",
        ],
      },
      {
        heading: "6. The pairing crisis",
        paragraphs: [
          "Marriage rates have declined across all industrialized countries. Dating app usage has risen while in-person meeting has declined. The average age of first marriage has increased by 5–7 years since 1980.",
          "The dual lock prediction: testosterone decline reduces sexual overperception bias ([[ref:goetz2024|Goetz 2024, RCT]]), meaning fewer social signals are interpreted as romantic interest. Cortisol elevation increases the perceived cost of rejection. Dating apps thrive precisely because they offer a low-risk environment — a setting where the dual lock's inhibition of face-to-face approach behavior matters less.",
        ],
      },
      {
        heading: "7. Declining empathy",
        paragraphs: [
          "[[ref:konrath2011|Konrath et al. (2011)]] documented a 40% decline in dispositional empathy among college students between 1979 and 2009. The decline accelerated after 2000.",
          "The dual lock prediction: testosterone and oxytocin together form the biological substrate of social cohesion. EMF-driven testosterone decline reduces competitive social behavior (the status-seeking that creates social hierarchies), while potential oxytocin disruption reduces trust and empathy. The result is withdrawal on both axes — less competitive engagement and less cooperative engagement.",
        ],
      },
      {
        heading: "8. Body composition shift",
        paragraphs: [
          "Grip strength in young men has declined approximately 20% between 1985 and 2016 (JAMA). This decline is not fully explained by reduced physical activity — it persists after controlling for exercise habits.",
          "The dual lock prediction: testosterone decline directly reduces lean muscle mass and increases visceral fat storage. The CaMKII convergence molecule — which BERM identifies as the junction point for four cascades (EMF sensitivity, BAT thermogenesis, testosterone, insulin signaling) — provides a mechanistic link between EMF exposure and body composition changes that are independent of lifestyle.",
        ],
      },
      {
        heading: "What this is not",
        paragraphs: [
          "These trends have multiple causes. Economic factors, social media, cultural shifts, and policy changes all contribute. BERM does not claim that EMF is the sole driver of any of them.",
          "What BERM proposes is that the biological substrate — the hormonal shift that the dual lock describes — makes populations more susceptible to these social and economic factors. A population with healthy testosterone and cortisol levels may absorb economic stress without mass labor force exit. A population already under hormonal suppression breaks more easily.",
          "The dual lock is a vulnerability amplifier, not a monocausal explanation. It does not replace sociology — it adds a biological layer underneath it.",
          "The quantitative estimate (47% decline in hormonally-driven status-seeking) is illustrative. The real number depends on nonlinear dose-response curves that have not been characterized. The correlational evidence for each of the eight trends is strong; the causal attribution to EMF is the BERM-specific hypothesis that remains to be tested directly.",
          "The predictions on this site's predictions page (SOC-1, SOC-2, SOC-3) are designed to test the societal implications of the dual lock in a falsifiable way.",
        ],
      },
    ],
    references: [
      { referenceId: "mehta2010_dual_hormone", label: "Mehta PH, Josephs RA (2010). Testosterone and cortisol jointly regulate dominance: Evidence for a dual-hormone hypothesis. Hormones and Behavior, 58(5), 898–906." },
      { referenceId: "dekkers2019_dual_hormone", label: "Dekkers TJ et al. (2019). A meta-analytical evaluation of the dual-hormone hypothesis. Neuroscience & Biobehavioral Reviews, 96, 250–271. n = 8,538." },
      { referenceId: "dreher2016", label: "Dreher JC et al. (2016). Testosterone causes both prosocial and antisocial status-enhancing behaviors in human males. PNAS, 113(41), 11633–11638." },
      { referenceId: "goetz2024", label: "Goetz SMM, Lucas T, Carré JM (2024). Under the influence: exogenous testosterone influences men's cross-sex perceptions of sexual interest. Frontiers in Psychology, 15, 1425389." },
      { referenceId: "lokeshwar2021", label: "Lokeshwar SD et al. (2021). Decline in serum testosterone levels among adolescent and young adult men in the USA. European Urology Focus, 7(4), 886–889." },
      { referenceId: "konrath2011", label: "Konrath SH, O'Brien EH, Hsing C (2011). Changes in dispositional empathy in American college students over time. Personality and Social Psychology Review, 15(2), 180–198." },
      { referenceId: "twenge2017_sexual_frequency", label: "Twenge JM et al. (2017). Declines in sexual frequency among American adults, 1989–2014. Archives of Sexual Behavior, 46(8), 2389–2401." },
      { referenceId: "us_lfp_2026", label: "US Bureau of Labor Statistics (2026). Male labor force participation rate, April 2026: 67%." },
      { referenceId: "trumble2012", label: "Trumble BC et al. (2012). Age-independent increasing testosterone in Tsimane males. American Journal of Human Biology." },
    ],
  },
  fi: {
    refsTitle: "Lähdeluettelo",
    sections: [
      {
        heading: null,
        paragraphs: [
          "Vuonna 2024 keskimääräisen 25-vuotiaan amerikkalaisen miehen testosteronitaso vastasi suunnilleen sitä, mikä 40-vuotiaalla oli vuonna 1985. Tämä ei ole ikääntymistä. Se on väestötason biologinen muutos, joka on dokumentoitu jokaisessa teollistuneessa maassa joka on sitä mitannut.",
          "Tyypillinen vastaus käsittelee matalaa testosteronia lääketieteellisenä kuriositeettina — asiana, jota endokrinologit hoitavat yksittäisillä potilailla. Mutta testosteroni ei ole pelkkä lisääntymishormoni. Se on yksi aivojen ensisijaisista motivaation, riskinoton, statushakuisuuden ja lähestymiskäyttäytymisen säätelymekanismeista. Kun se laskee koko populaation tasolla, vaikutukset ulottuvat kauas klinikan ulkopuolelle.",
          "Samanaikaisesti kortisoli — stressihormoni — on noussut. Nämä kaksi muutosta eivät ole toisistaan riippumattomia. BERM ennustaa, että EMF-altistus ajaa molempia: testosteronia alas HPG-akselin kautta (polut A, B, D) ja kortisolia ylös HPA-aktivaation kautta (polku D). Tulosta kutsumme kaksoisluoksi.",
        ],
      },
      {
        heading: "Kaksoishormonihypoteesi",
        paragraphs: [
          "Testosteronin ja kortisolin vuorovaikutuksen dominanttikäyttäytymisen säätelyssä formalisoivat [[ref:mehta2010_dual_hormone|Mehta ja Josephs vuonna 2010]]. Heidän kaksoishormonihypoteesinsa esittää, että testosteronin vaikutus statushakuiseen käyttäytymiseen ei ole kiinteä — se riippuu kortisolista. Kun kortisoli on matala, testosteroni ajaa lähestymiskäyttäytymistä, kilpailua ja statuksen tavoittelua. Kun kortisoli on korkea, testosteronin vaikutus vaimenee.",
          "Meta-analyysi 8 538 osallistujasta vahvisti tämän: suhde on multiplikatiivinen, ei additiivinen. Korkea testosteroni ja matala kortisoli tuottavat voimakasta statushakuista käyttäytymistä. Korkea testosteroni ja korkea kortisoli tuottavat kohtalaista käyttäytymistä. Matala testosteroni ja korkea kortisoli — malli jonka BERM ennustaa EMF:n tuottavan — johtaa käyttäytymisen vaimentumiseen, joka on suurempi kuin kummankaan hormonimuutoksen yksinään.",
          "Tämä on kaksoislukon mekanismi. Ensimmäinen lukko poistaa halun (testosteroni alas: vähemmän motivaatiota, vähemmän riskinottoa, vähemmän kilpailuimpulssia). Toinen lukko lisää jarrun (kortisoli ylös: enemmän ahdistuneisuutta, enemmän välttämistä, enemmän vetäytymistä). Yhdessä ne tukahduttavat lähestymiskäyttäytymistä tehokkaammin kuin kumpikaan mekanismi itsenäisesti.",
        ],
      },
      {
        heading: "Karkea kvantitatiivinen arvio",
        paragraphs: [
          "Tarkastellaan yksinkertaistettua mallia. Vuonna 1980 keskimääräinen testosteroni oli noin 500 ng/dL ja kortisoli perustasolla. Jos indeksoimme statushakuisen käyttäytymisen näillä arvoilla arvoksi 1,0, niin vuoden 2024 populaatio — testosteroni noin 320 ng/dL (−36 %) ja kortisoli noin +20 % — tuottaa multiplikatiivisen vaikutuksen: 0,64 × 0,83 ≈ 0,53.",
          "Tämä viittaa noin 47 %:n laskuun hormonaalisesti ohjautuneessa statushakuisessa käyttäytymisessä. Testosteroni yksin selittää −36 %. Kortisoli yksin selittää −17 %. Yhdistelmä, koska se on multiplikatiivinen, selittää −47 %. Kaksoislukon vaikutus on olennaisesti suurempi kuin osiensa summa.",
          "Tämä arvio on havainnollistava, ei tarkka. Todelliset annos-vastekäyrät ovat epälineaarisia ja huonosti luonnehdittuja. Mutta suunta ja multiplikatiivinen vuorovaikutus ovat vahvistettuja.",
        ],
      },
      {
        heading: "Kahdeksan havaittavaa trendiä",
        paragraphs: [
          "Jos kaksoislukkoteoria pitää paikkansa, sen pitäisi tuottaa havaittavia väestötason käyttäytymismuutoksia. BERM tunnistaa kahdeksan trendiä jotka ovat yhdenmukaisia populaatiotason testosteronin laskun ja kortisolin nousun kanssa. Kaikki kahdeksan ovat kiihtyneet 2010-luvulta lähtien — samaan aikaan älypuhelinten massaomaksumisen kanssa.",
        ],
      },
      {
        heading: "1. Seksittömyyden epidemia",
        paragraphs: [
          "Nuorten miesten (18–30 v) osuus ilman seksipartneria on kasvanut tasaisesti teollistuneissa maissa. Japanissa 43 % 18–34-vuotiaista miehistä ilmoitti olevansa neitsyitä vuonna 2015. Yhdysvalloissa alle 30-vuotiaiden miesten osuus jotka eivät olleet harrastaneet seksiä viimeisen vuoden aikana kaksinkertaistui vuosien 2008 ja 2018 välillä.",
          "Kaksoislukon ennuste: testosteronin lasku vähentää seksuaalista halua suoraan (endokrinologinen konsensus), kun taas kortisolin nousu lisää hylkäyksen pelkoa. Yhdistelmä vaimentaa lähestymiskäyttäytymistä — halukkuutta ottaa kontaktia — enemmän kuin kumpikaan yksin. [[ref:goetz2024|Goetz ym. (2024, RCT)]] osoittivat, että eksogeeninen testosteroni lisää taipumusta tulkita moniselitteisiä sosiaalisia signaaleja seksuaalisena kiinnostuksena. Populaatiotason testosteronin lasku kääntää tämän: harvempia signaaleja tulkitaan kiinnostuksena, harvempia lähestymisiä tehdään.",
        ],
      },
      {
        heading: "2. Miesten työvoimakatoa",
        paragraphs: [
          "Huhtikuussa 2026 33 % amerikkalaisista miehistä ei ollut työssä eikä hakenut työtä — alin työvoimaosuus sitten 1940-luvun tilastoinnin aloittamisen. Lasku 87 %:sta (sodanjälkeinen huippu) 67 %:iin (2026) on kiihtynyt vuoden 2010 jälkeen.",
          "Kaksoislukon ennuste: testosteronin lasku vähentää statusmotivaatiota ([[ref:dreher2016|Dreher ym. 2016, PNAS, RCT]]: eksogeeninen testosteroni lisää kausaalisesti statushakuista käyttäytymistä). Kortisolin nousu tekee työpaikkakilpailusta ahdistavaa stimuloivan sijaan. Yhdistelmä tekee kilpailusta luopumisesta helpompaa kuin kilpailemisesta.",
        ],
      },
      {
        heading: "3. Epäonnistunut itsenäistyminen",
        paragraphs: [
          "Vuonna 2020 yli 50 % 18–29-vuotiaista amerikkalaisista asui vanhempiensa luona — korkein osuus sitten 1930-luvun. Tämä selitetään tyypillisesti asumiskustannuksilla ja opintolainoilla, mutta trendi edeltää molempien pahimpia vaiheita.",
          "Kaksoislukon ennuste: testosteronin lasku nuorilla miehillä on ollut jyrkempi kuin vanhemmilla miehillä. [[ref:lokeshwar2021|Lokeshwar ym. (2021)]] dokumentoivat −1,82 %/vuosi laskun nuorilla ja nuorilla aikuisilla. Vuoden 2024 25-vuotiaalla on 1980-luvun 40-vuotiaan hormonaalinen profiili. Halu perustaa itsenäinen asema — yksi testosteronin keskeisistä käyttäytymisvaikutuksista — on biologisesti heikentynyt.",
        ],
      },
      {
        heading: "4. Riskinoton ja yrittäjyyden lasku",
        paragraphs: [
          "Testosteroni korreloi taloudellisen riskinsietokyvyn, yrittäjyyskäyttäytymisen ja kilpailullisen päätöksenteon kanssa. Uusien yritysten perustamisluvut asukasta kohden ovat laskeneet useimmissa OECD-maissa. Nuoret suosivat yhä enemmän vakaata työtä yrittäjyyden sijaan.",
          "Kaksoislukon ennuste: testosteronin lasku vähentää riskihalua suoraan. Kortisolin nousu siirtää riski-palkkiolaskelmaa edelleen turvallisuushakuisuuden suuntaan. Populaatio muuttuu varovaisemmaksi, riskiä kaihtavammaksi ja turvallisuusorientoituneemmaksi.",
        ],
      },
      {
        heading: "5. Masennusepidemia",
        paragraphs: [
          "Masennusdiagnoosit ovat kasvaneet dramaattisesti 2010-luvulta. SSRI-määräykset ovat nousseet noin 400 % 20 vuodessa. Kasvu on erityisen jyrkkää nuorilla ja miehillä.",
          "BERM tarjoaa monipolkuselityksen: testosteronin lasku tuottaa anhedoniaa (mielihyvän ja motivaation menetystä). Melatoniinin häiriö heikentää unta, joka on ensisijainen masennusriskitekijä. Kortisolin nousu luo kroonisen stressifysiologian. Dopamiinin desensitisaatio vähentää palkkioherkkyyttä. Nämä ovat neljä toisistaan riippumatonta biologista reittiä masennukseen, jotka toimivat samanaikaisesti — ja kaikki neljä ovat BERM:n EMF-altistusmallin ennustamia.",
        ],
      },
      {
        heading: "6. Parinmuodostuksen kriisi",
        paragraphs: [
          "Avioliittoluvut ovat laskeneet kaikissa teollistuneissa maissa. Treffisovellusten käyttö on kasvanut samalla kun kasvotusten tapahtuva kohtaaminen on vähentynyt. Ensimmäisen avioliiton keski-ikä on noussut 5–7 vuotta vuodesta 1980.",
          "Kaksoislukon ennuste: testosteronin lasku vähentää seksuaalisen ylihahmottamisen vinoumaa ([[ref:goetz2024|Goetz 2024, RCT]]), mikä tarkoittaa, että harvempia sosiaalisia signaaleja tulkitaan romanttisena kiinnostuksena. Kortisolin nousu kasvattaa hylkäyksen koettua kustannusta. Treffisovellukset kukoistavat juuri siksi, että ne tarjoavat matalan riskin ympäristön — asetelman jossa kaksoislukon lähestymiskäyttäytymisen estovaikutus on vähäisempi.",
        ],
      },
      {
        heading: "7. Empatian väheneminen",
        paragraphs: [
          "[[ref:konrath2011|Konrath ym. (2011)]] dokumentoivat 40 %:n laskun dispositionaalisessa empatiassa amerikkalaisilla yliopisto-opiskelijoilla vuosien 1979 ja 2009 välillä. Lasku kiihtyi vuoden 2000 jälkeen.",
          "Kaksoislukon ennuste: testosteroni ja oksitosiini yhdessä muodostavat sosiaalisen koheesion biologisen perustan. EMF-ajoitteinen testosteronin lasku vähentää kilpailullista sosiaalista käyttäytymistä (statushakuisuus joka luo sosiaalisia hierarkioita), kun taas mahdollinen oksitosiinin häiriö vähentää luottamusta ja empatiaa. Tulos on vetäytyminen molemmilla akseleilla — vähemmän kilpailullista osallistumista ja vähemmän yhteistoiminnallista osallistumista.",
        ],
      },
      {
        heading: "8. Kehonkoostumuksen muutos",
        paragraphs: [
          "Puristusvoima nuorilla miehillä on laskenut noin 20 % vuosien 1985 ja 2016 välillä (JAMA). Lasku ei selity täysin vähentyneellä liikunnalla — se säilyy liikuntatapojen kontrolloinnin jälkeen.",
          "Kaksoislukon ennuste: testosteronin lasku vähentää suoraan lihasmassaa ja lisää viskeraalisen rasvan varastoitumista. CaMKII-yhdentymismolekyyli — jonka BERM tunnistaa neljän kaskadin (EMF-herkkyys, BAT-termogeneesi, testosteroni, insuliinisignalointi) risteyspisteeksi — tarjoaa mekanistisen yhteyden EMF-altistuksen ja elämäntavasta riippumattomien kehonkoostumusmuutosten välillä.",
        ],
      },
      {
        heading: "Mitä tämä ei ole",
        paragraphs: [
          "Näillä trendeillä on monia syitä. Taloudelliset tekijät, sosiaalinen media, kulttuuriset muutokset ja poliittiset päätökset kaikki myötävaikuttavat. BERM ei väitä, että EMF olisi yhdenkään niistä ainoa ajuri.",
          "BERM:n väite on, että biologinen perusta — hormonaalinen muutos, jota kaksoislukkoteoria kuvaa — tekee populaatioista alttiimpia näille sosiaalisille ja taloudellisille tekijöille. Populaatio jolla on terve testosteroni- ja kortisolitaso voi absorboida taloudellisen stressin ilman massiivista työvoimasta vetäytymistä. Populaatio, joka on jo hormonaalisen vaimentumisen alaisena, murtuu helpommin.",
          "Kaksoislukkoteoria on haavoittuvuusvahvistin, ei monokausaalinen selitys. Se ei korvaa sosiologiaa — se lisää biologisen kerroksen sen alle.",
          "Kvantitatiivinen arvio (47 %:n lasku hormonaalisesti ohjautuneessa statushakuisuudessa) on havainnollistava. Todellinen luku riippuu epälineaarisista annos-vastekäyristä, joita ei ole luonnehdittu. Korrelaationäyttö jokaiselle kahdeksasta trendistä on vahva; kausaalinen attribuutio EMF:lle on BERM-tarkka hypoteesi, jota on vielä testattava suoraan.",
          "Tämän sivuston ennustesivulla olevat ennusteet (SOC-1, SOC-2, SOC-3) on suunniteltu testaamaan kaksoislukkoteorian yhteiskunnallisia seurauksia falsifioitavalla tavalla.",
        ],
      },
    ],
    references: [
      { referenceId: "mehta2010_dual_hormone", label: "Mehta PH, Josephs RA (2010). Testosterone and cortisol jointly regulate dominance: Evidence for a dual-hormone hypothesis. Hormones and Behavior, 58(5), 898–906." },
      { referenceId: "dekkers2019_dual_hormone", label: "Dekkers TJ ym. (2019). A meta-analytical evaluation of the dual-hormone hypothesis. Neuroscience & Biobehavioral Reviews, 96, 250–271. n = 8 538." },
      { referenceId: "dreher2016", label: "Dreher JC ym. (2016). Testosterone causes both prosocial and antisocial status-enhancing behaviors in human males. PNAS, 113(41), 11633–11638." },
      { referenceId: "goetz2024", label: "Goetz SMM, Lucas T, Carré JM (2024). Under the influence: exogenous testosterone influences men's cross-sex perceptions of sexual interest. Frontiers in Psychology, 15, 1425389." },
      { referenceId: "lokeshwar2021", label: "Lokeshwar SD ym. (2021). Decline in serum testosterone levels among adolescent and young adult men in the USA. European Urology Focus, 7(4), 886–889." },
      { referenceId: "konrath2011", label: "Konrath SH, O'Brien EH, Hsing C (2011). Changes in dispositional empathy in American college students over time. Personality and Social Psychology Review, 15(2), 180–198." },
      { referenceId: "twenge2017_sexual_frequency", label: "Twenge JM ym. (2017). Declines in sexual frequency among American adults, 1989–2014. Archives of Sexual Behavior, 46(8), 2389–2401." },
      { referenceId: "us_lfp_2026", label: "US Bureau of Labor Statistics (2026). Miesten työvoimaosuus, huhtikuu 2026: 67 %." },
      { referenceId: "trumble2012", label: "Trumble BC ym. (2012). Age-independent increasing testosterone in Tsimane males. American Journal of Human Biology." },
    ],
  },
} as const;

export function DualLockArticleContent({ locale }: { locale: string }) {
  const c = locale in COPY ? COPY[locale as keyof typeof COPY] : COPY.en;

  return (
    <div className="prose-article">
      {c.sections.map((section, si) => (
        <section key={si} className="mb-10">
          {section.heading && (
            <h2 className="font-serif text-xl sm:text-2xl tracking-[-0.02em] mb-4 mt-12 first:mt-0">
              {section.heading}
            </h2>
          )}
          {section.paragraphs.map((para, pi) => (
            <p
              key={pi}
              className="text-base sm:text-[1.0625rem] leading-[1.8] text-foreground-muted mb-5 last:mb-0"
            >
              <InlineReferenceText text={para} locale={locale} />
            </p>
          ))}
        </section>
      ))}

      <footer className="mt-14 pt-8 border-t border-card-border">
        <h2 className="font-serif text-lg font-semibold mb-4">
          {c.refsTitle}
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          {c.references.map((ref, i) => (
            <li
              key={i}
              className="text-sm text-foreground-muted leading-relaxed"
            >
              <StudyCitation referenceId={ref.referenceId} locale={locale} label={ref.label} />
            </li>
          ))}
        </ol>
      </footer>
    </div>
  );
}
