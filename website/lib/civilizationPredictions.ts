export interface CivPrediction {
  id: string;
  group: "PK" | "CIV" | "PP" | "L" | "BEH" | "IQS";
  title_en: string;
  title_fi: string;
  test_en: string;
  test_fi: string;
  level: "M|C" | "C" | "L*";
}

export const CIVILIZATION_PREDICTIONS: CivPrediction[] = [
  // PK-1..PK-12: Patokinesis predictions (moving pathology)
  {
    id: "PK-1",
    group: "PK",
    title_en: "Mobile infrastructure → TFR decline",
    title_fi: "Mobiili-infrastruktuuri → TFR-lasku",
    test_en:
      "Countries with earlier mobile infrastructure deployment will show faster TFR decline, controlling for GDP and education",
    test_fi:
      "Maat joissa mobiili-infrastruktuuri otettiin käyttöön aikaisemmin näyttävät nopeampaa TFR-laskua, kontrolloituna BKT:lla ja koulutuksella",
    level: "M|C",
  },
  {
    id: "PK-2",
    group: "PK",
    title_en: "Urban-rural divergence tracks mobile deployment",
    title_fi: "Kaupunki-maaseutu-divergenssi seuraa mobiiliverkkoa",
    test_en:
      "Within-country urban-rural political divergence onset will correlate with mobile network deployment date, not with economic divergence",
    test_fi:
      "Maan sisäisen kaupunki-maaseutu poliittisen divergenssin alkamisajankohta korreloi mobiiliverkon käyttöönottoajankohdan, ei taloudellisen divergenssin kanssa",
    level: "M|C",
  },
  {
    id: "PK-3",
    group: "PK",
    title_en: "Body positivity tracks pathopolites index",
    title_fi: "Body positivity seuraa pathopolites-indeksiä",
    test_en:
      "Body positivity movement growth rate will track Pathopolites index at the city level, not obesity rate alone",
    test_fi:
      "Body positivity -liikkeen kasvuvauhti seuraa Pathopolites-indeksiä kaupunkitasolla, ei pelkkää lihavuusastetta",
    level: "C",
  },
  {
    id: "PK-4",
    group: "PK",
    title_en: "Puberty blocker rates track institutional capture",
    title_fi: "Puberteetin estolääkkeet seuraavat institutionaalista kaappausta",
    test_en:
      "Puberty blocker prescription rates will correlate with institutional capture index, not with gender dysphoria prevalence",
    test_fi:
      "Puberteetin estolääkkeiden reseptimäärät korreloivat institutionaalisen kaappausindeksin, eivät sukupuolidysforian esiintyvyyden kanssa",
    level: "C",
  },
  {
    id: "PK-5",
    group: "PK",
    title_en: "Pronatalist policy spending shows zero TFR correlation",
    title_fi: "Pronatalistinen politiikkakulutus ei korreloi TFR:n kanssa",
    test_en:
      "Pronatalist policy spending per capita will show zero correlation with TFR 10 years post-implementation",
    test_fi:
      "Pronatalistinen politiikkakulutus/capita ei korreloi TFR:n kanssa 10 vuotta toteutuksen jälkeen",
    level: "M|C",
  },
  {
    id: "PK-6",
    group: "PK",
    title_en: "Conservative-attractiveness correlation weakens",
    title_fi: "Konservatiivin viehättävyys -korrelaatio heikkenee",
    test_en:
      "Conservative-attractiveness correlation will weaken decade-over-decade as population T-variance narrows",
    test_fi:
      "Konservatiivin viehättävyys -korrelaatio heikkenee vuosikymmen vuosikymmeneltä kun populaation T-varianssi kapenee",
    level: "C",
  },
  {
    id: "PK-7",
    group: "PK",
    title_en: "Net behavioral immunity crosses zero by 2030",
    title_fi: "Nettokäyttäytymisimmuniteetti ylittää nollan 2030 mennessä",
    test_en:
      "Net behavioral immunity will cross zero in additional Western urban environments by 2030 as institutional capture accelerates, measurable via FIRE-type surveys",
    test_fi:
      "Nettokäyttäytymisimmuniteetti ylittää nollan lisää länsimaisten kaupunkiympäristöjen kohdalla 2030 mennessä institutionaalisen kaappauksen kiihtyessä, mitattavissa FIRE-tyyppisillä kyselyillä",
    level: "M|C",
  },
  {
    id: "PK-8",
    group: "PK",
    title_en: "Social contagion tracks platform penetration",
    title_fi: "Sosiaalinen tartunta seuraa alustan penetraatiota",
    test_en:
      "Social contagion index will track TikTok/social media penetration more closely than traditional media exposure — testable via platform adoption dates cross-referenced with diagnostic epidemic onset",
    test_fi:
      "Sosiaalisen tartunnan indeksi seuraa TikTok/sosiaalisen median penetraatiota tarkemmin kuin perinteistä media-altistumista — testattavissa alustan käyttöönottopäivien ja diagnostisen epidemian alkamisen ristiinvertailulla",
    level: "M|C",
  },
  {
    id: "PK-9",
    group: "PK",
    title_en: "Japan hikikomori count rises despite cultural moderation",
    title_fi: "Japanin hikikomori-luku kasvaa kulttuurisesta lieventymisestä huolimatta",
    test_en:
      "Japan's hikikomori count will continue rising even as cultural tightness theoretically moderates — the autoimmune BIS persists independently of the original enforcement mechanism",
    test_fi:
      "Japanin hikikomori-luku jatkaa kasvuaan vaikka kulttuurinen tiukkuus teoreettisesti lieventyisi — autoimmuuni-BIS, kerran aktivoituna, jatkuu itsenäisesti alkuperäisestä toimeenpanomekanismista",
    level: "M|C",
  },
  {
    id: "PK-10",
    group: "PK",
    title_en: "Destigmatization Category C: behavior-identity gap >50%",
    title_fi: "Destigmatisaation kategoria C: käyttäytymis-identiteettikuilu >50%",
    test_en:
      "Destigmatization Category C domains (sustained increase, no plateau) will show behavior-identity gaps exceeding 50% — more people identify than exhibit the behavior",
    test_fi:
      "Destigmatisaation kategorian C domainit (jatkuva kasvu ilman tasaantumista) osoittavat käyttäytymis-identiteettikuiluja yli 50% — useampi identifioituu kuin harjoittaa käyttäytymistä",
    level: "C",
  },
  {
    id: "PK-11",
    group: "PK",
    title_en: "Recovery sabotage highest in victimhood cultures",
    title_fi: "Toipumisen sabotointi korkeinta uhrikulttuuriympäristöissä",
    test_en:
      "Recovery sabotage will be the highest-weighted transmission channel in environments with strong victimhood identity culture, measurable via tall poppy syndrome instruments correlated with relapse data",
    test_fi:
      "Toipumisen sabotointi on painokkain transmissiokanava ympäristöissä joissa uhri-identiteettikulttuuri on vahva, mitattavissa tall poppy -syndroomakyselyillä korreloituna relapsidataan",
    level: "C",
  },
  {
    id: "PK-12",
    group: "PK",
    title_en: "Dependency transmission has largest intergenerational effect",
    title_fi: "Riippuvuuden transmissio suurin ylisukupolvinen efekti",
    test_en:
      "Dependency transmission will show the largest intergenerational effect size of all channels — ACE OR>10 and attachment d=1.06 dwarf peer contagion beta=0.15 — making it the primary intervention target",
    test_fi:
      "Riippuvuuden transmissio osoittaa suurimman ylisukupolvisen efektikoon kaikista kanavista — ACE OR>10 ja kiintymys d=1.06 kääpiöivät vertaistartunnan beta=0.15 — tehden siitä ensisijaisen interventiotavoitteen",
    level: "M|C",
  },

  // CIV-1..CIV-14: Patopolis civilization-level predictions
  {
    id: "CIV-1",
    group: "CIV",
    title_en: "T decline continues regardless of lifestyle",
    title_fi: "T-lasku jatkuu elämäntavoista riippumatta",
    test_en:
      "Population-level testosterone decline continues in all high-EMF nations regardless of obesity intervention, exercise promotion, or dietary improvement",
    test_fi:
      "Väestötason testosteronilasku jatkuu kaikissa korkean EMF:n maissa lihavuusinterventiosta, liikuntakampanjoista tai ravitsemusparannuksista riippumatta",
    level: "M|C",
  },
  {
    id: "CIV-2",
    group: "CIV",
    title_en: "Low-EMF communities maintain higher T",
    title_fi: "Matalan EMF:n yhteisöt ylläpitävät korkeampaa T:tä",
    test_en:
      "Technology-restricting communities (Amish, rural off-grid) maintain testosterone levels 20–40% higher than age-matched urban populations",
    test_fi:
      "Teknologiaa rajoittavat yhteisöt (amish, maaseudun off-grid) ylläpitävät 20–40% korkeampia testosteronitasoja kuin ikäverrokit kaupunkiväestöissä",
    level: "M|C",
  },
  {
    id: "CIV-3",
    group: "CIV",
    title_en: "CCB users show attenuated behavioral decline",
    title_fi: "CCB-käyttäjät osoittavat vaimeampaa käyttäytymislaskua",
    test_en:
      "Calcium channel blocker users show measurably attenuated behavioral decline on BERM-predicted dimensions compared to non-users, controlling for the conditions prompting CCB use",
    test_fi:
      "Kalsiumkanavan salpaajien käyttäjät osoittavat mitattavasti vaimeampaa käyttäytymislaskua BERM-ennustetuilla ulottuvuuksilla verrattuna ei-käyttäjiin, kontrolloituna CCB-käytön aiheuttaneilla olosuhteilla",
    level: "M|C",
  },
  {
    id: "CIV-4",
    group: "CIV",
    title_en: "TFR correlates with EMF density, not GDP alone",
    title_fi: "TFR korreloi EMF-tiheyden, ei pelkän BKT:n kanssa",
    test_en:
      "Total fertility rate shows stronger correlation with EMF infrastructure density than with GDP per capita, female education, or urbanization rate after partial regression controls",
    test_fi:
      "Kokonaishedelmällisyysluku osoittaa vahvemman korrelaation EMF-infrastruktuurin tiheyden kuin BKT:n/capita, naisten koulutuksen tai kaupungistumisasteen kanssa osittaisten regressiokontrollien jälkeen",
    level: "M|C",
  },
  {
    id: "CIV-5",
    group: "CIV",
    title_en: "Behavioral suppression reverses with EMF reduction",
    title_fi: "Käyttäytymisen suppressio palautuu EMF-vähennyksellä",
    test_en:
      "Individuals who substantially reduce personal EMF exposure for 6+ months show measurable recovery in testosterone, cortisol rhythm, and behavioral activation scores",
    test_fi:
      "Yksilöt jotka vähentävät merkittävästi henkilökohtaista EMF-altistumista 6+ kuukautta osoittavat mitattavaa palautumista testosteronissa, kortisolin rytmissä ja käyttäytymisaktivointipisteissä",
    level: "M|C",
  },
  {
    id: "CIV-6",
    group: "CIV",
    title_en: "Pairing probability declines multiplicatively",
    title_fi: "Parinmuodostuksen todennäköisyys laskee multiplikatiivisesti",
    test_en:
      "The probability of successful pair formation declines as the product of male and female hormonal suppression, not additively — producing a sharper collapse than either sex's decline alone predicts",
    test_fi:
      "Onnistuneen parinmuodostuksen todennäköisyys laskee miesten ja naisten hormonaalisen suppression tulona, ei summana — tuottaen jyrkemmän romahduksen kuin kummankaan sukupuolen lasku yksin ennustaa",
    level: "C",
  },
  {
    id: "CIV-7",
    group: "CIV",
    title_en: "Teen girl mental health crisis correlates with hardware",
    title_fi: "Tyttöjen mielenterveyskriisi korreloi laitteiston kanssa",
    test_en:
      "The teen girl mental health crisis onset correlates with smartphone hardware adoption timing, not with specific content or platform features — because the EMF exposure is the mechanism, not the content",
    test_fi:
      "Tyttöjen mielenterveyskriisin alkamisajankohta korreloi älypuhelinlaitteiston käyttöönoton ajoituksen, ei tietyn sisällön tai alustaominaisuuksien kanssa — koska EMF-altistuminen on mekanismi, ei sisältö",
    level: "M|C",
  },
  {
    id: "CIV-8",
    group: "CIV",
    title_en: "Intergenerational hormonal decline accelerates",
    title_fi: "Ylisukupolvinen hormonaalinen lasku kiihtyy",
    test_en:
      "Each generation shows faster hormonal decline than the previous, even without increased EMF exposure, due to epigenetic transmission via sperm methylome and oocyte CaMKII sensitization",
    test_fi:
      "Jokainen sukupolvi osoittaa nopeampaa hormonaalista laskua kuin edellinen, ilman lisääntynyttä EMF-altistumistakin, johtuen epigeneettisestä transmissiosta sperman metylomin ja munasolun CaMKII-sensitisaation kautta",
    level: "M|C",
  },
  {
    id: "CIV-9",
    group: "CIV",
    title_en: "OT-dependent behaviors decline with EMF environment",
    title_fi: "OT-riippuvaiset käyttäytymiset laskevat EMF-ympäristön myötä",
    test_en:
      "Oxytocin-dependent social behaviors (trust, pair bonding, group cooperation, parental investment) decline in proportion to population EMF exposure density, independent of cultural or economic factors",
    test_fi:
      "Oksitosiiniriippuvaiset sosiaaliset käyttäytymiset (luottamus, parisidonnaisuus, ryhmäyhteistyö, vanhemmuusinvestointi) laskevat suhteessa väestön EMF-altistumistiheyteen, kulttuurisista tai taloudellisista tekijöistä riippumatta",
    level: "M|C",
  },
  {
    id: "CIV-10",
    group: "CIV",
    title_en: "IVF becomes demographic infrastructure by 2040",
    title_fi: "IVF muuttuu demografiseksi infrastruktuuriksi 2040 mennessä",
    test_en:
      "Assisted reproduction (IVF/ICSI) will account for >10% of births in multiple developed nations by 2040, functioning as demographic infrastructure rather than medical intervention",
    test_fi:
      "Avustettu lisääntyminen (IVF/ICSI) kattaa >10% synnytyksistä useissa kehittyneissä maissa 2040 mennessä, toimien demografisena infrastruktuurina lääketieteellisen intervention sijaan",
    level: "M|C",
  },
  {
    id: "CIV-11",
    group: "CIV",
    title_en: "Online-offline behavior gap tracks population T",
    title_fi: "Online-offline-käyttäytymiskuilu seuraa väestön T:tä",
    test_en:
      "The gap between online aggression and offline passivity correlates with population testosterone level: lower T populations show larger online-offline behavioral divergence",
    test_fi:
      "Kuilu verkkoaggressiivisuuden ja offline-passiivisuuden välillä korreloi väestön testosteronitason kanssa: matalan T:n väestöt osoittavat suurempaa online-offline-käyttäytymisdivergenssiä",
    level: "C",
  },
  {
    id: "CIV-12",
    group: "CIV",
    title_en: "Concept creep tracks cortisol trends",
    title_fi: "Konseptikreepit seuraavat kortisolitrendejä",
    test_en:
      "Concept creep rate (expansion of harm/trauma/violence definitions) correlates with population cortisol trends across countries — higher chronic cortisol, more concept creep",
    test_fi:
      "Konseptikreepin vauhti (haitan/trauman/väkivallan määritelmien laajeneminen) korreloi väestön kortisolitrendien kanssa maiden välillä — korkeampi krooninen kortisoli, enemmän konseptikreeppiä",
    level: "C",
  },
  {
    id: "CIV-13",
    group: "CIV",
    title_en: "Intergenerational tension weakest in low-EMF communities",
    title_fi: "Sukupolvijännite heikointa matalan EMF:n yhteisöissä",
    test_en:
      "Intergenerational conflict and resentment is weakest in low-EMF communities where hormonal profiles remain more similar across generations",
    test_fi:
      "Sukupolvien välinen konflikti ja katkeruus on heikointa matalan EMF:n yhteisöissä joissa hormoniprofilit pysyvät yhteneväisempinä sukupolvien välillä",
    level: "C",
  },
  {
    id: "CIV-14",
    group: "CIV",
    title_en: "Political attitudes correlate with individual T",
    title_fi: "Poliittiset asenteet korreloivat yksilöllisen T:n kanssa",
    test_en:
      "Political attitudes on risk tolerance and authority deference correlate with individual testosterone level after demographic controls (age, sex, income, education)",
    test_fi:
      "Poliittiset asenteet riskinsietokyvystä ja auktoriteettiuskosta korreloivat yksilöllisen testosteronitason kanssa demografisten kontrollien (ikä, sukupuoli, tulot, koulutus) jälkeen",
    level: "M|C",
  },

  // PP-1..PP-4: Pathopolites predictions
  {
    id: "PP-1",
    group: "PP",
    title_en: "Pathopolites index correlates with hormonal profiles",
    title_fi: "Pathopolites-indeksi korreloi hormoniprofiilien kanssa",
    test_en:
      "Pathopolites index correlates with individual hormonal profiles (T, OXT, DA, CORT, BDNF, MEL) after controlling for demographics, personality, and stated political orientation.",
    test_fi:
      "Pathopolites-indeksi korreloi yksilöllisten hormoniprofiilien (T, OXT, DA, CORT, BDNF, MEL) kanssa demografisten, persoonallisuus- ja poliittisten kontrollien jälkeen.",
    level: "M|C",
  },
  {
    id: "PP-2",
    group: "PP",
    title_en: "Low-EMF communities produce fewer pathopolites",
    title_fi: "Matalan EMF:n yhteisöt tuottavat vähemmän pathopolites-fenotyyppejä",
    test_en:
      "Low-EMF communities (Amish, rural) produce fewer pathopolites phenotypes than demographically matched urban populations, independent of cultural factors.",
    test_fi:
      "Matalan EMF:n yhteisöt (amish, maaseutu) tuottavat vähemmän pathopolites-fenotyyppejä kuin demografisesti vastaavat urbaanit väestöt, kulttuurisista tekijöistä riippumatta.",
    level: "M|C",
  },
  {
    id: "PP-3",
    group: "PP",
    title_en: "Institutional concentration of pathopolites phenotype",
    title_fi: "Pathopolites-fenotyypin institutionaalinen keskittyminen",
    test_en:
      "Institutional concentration: pathopolites phenotype is overrepresented in meaning-making institutions (media, academia, HR, NGOs) relative to production institutions (agriculture, construction, manufacturing), and this overrepresentation correlates with the EMF density differential between these workplace types.",
    test_fi:
      "Institutionaalinen keskittyminen: pathopolites-fenotyyppi on yliedustettu merkityksentuotannon instituutioissa (media, akatemia, HR, kansalaisjärjestöt) suhteessa tuotantoinstituutioihin (maatalous, rakentaminen, valmistus), ja tämä yliedustus korreloi työpaikkatyyppien EMF-tiheyseron kanssa.",
    level: "C",
  },
  {
    id: "PP-4",
    group: "PP",
    title_en: "Intergenerational amplification of pathopolites index",
    title_fi: "Pathopolites-indeksin ylisukupolvinen vahvistuminen",
    test_en:
      "Intergenerational amplification: second-generation urban-raised individuals show higher pathopolites index than first-generation rural-to-urban migrants at the same age, even after controlling for socioeconomic status.",
    test_fi:
      "Ylisukupolvinen vahvistuminen: toisen sukupolven urbaanissa kasvaneet osoittavat korkeampaa pathopolites-indeksiä kuin ensimmäisen sukupolven maaseudulta muuttaneet samassa iässä, sosioekonomisen aseman kontrolloimisen jälkeen.",
    level: "M|C",
  },

  // L1..L3: Patopoliteia (historical law) predictions
  {
    id: "L1",
    group: "L",
    title_en: "Civilizational birth requires a low-χ zone",
    title_fi: "Sivilisaation synty edellyttää matalan χ:n aluetta",
    test_en:
      "All independent civilizational origins (Mesopotamia, Indus, Yellow River, Mesoamerica, Egypt, Caral) occur in the 25–35°N latitude band where χ is lowest, maximizing biological activation",
    test_fi:
      "Kaikki itsenäiset sivilisaation synnyt (Mesopotamia, Indus, Keltainenjoki, Mesoamerikka, Egypti, Caral) tapahtuvat 25–35°N leveysastekaistalla jossa χ on matalin, maksimoiden biologisen aktivaation",
    level: "L*",
  },
  {
    id: "L2",
    group: "L",
    title_en: "Creative renaissances cluster during grand solar minima",
    title_fi: "Luovat renessanssit klusteroituvat suurten aurinkominimiein aikana",
    test_en:
      "Creative renaissances cluster during grand solar minima at high-χ latitudes (45–60°N): Italian Renaissance/Spörer, Scientific Revolution/Maunder, Romanticism/Dalton — because reduced solar wind allows geomagnetic recovery",
    test_fi:
      "Luovat renessanssit klusteroituvat suurten aurinkominimiein aikana korkeilla χ-leveysasteilla (45–60°N): Italian renessanssi/Spörer, tieteellinen vallankumous/Maunder, romantiikka/Dalton — koska vähentynyt aurinkotuuli mahdollistaa geomagneettisen palautumisen",
    level: "L*",
  },
  {
    id: "L3",
    group: "L",
    title_en: "Empire rises begin during low solar activity",
    title_fi: "Imperiumien nousut alkavat matalan aurinkoaktiivisuuden aikana",
    test_en:
      "Major empire formation and expansion phases correlate with periods of low solar activity when the biological activation threshold is more easily exceeded",
    test_fi:
      "Suurten imperiumien muodostumis- ja laajentumisvaiheet korreloivat matalan aurinkoaktiivisuuden jaksojen kanssa jolloin biologisen aktivaation kynnys ylitetään helpommin",
    level: "L*",
  },

  // BEH-1..BEH-12: Behavioral predictions (patopolis)
  {
    id: "BEH-1",
    group: "BEH",
    title_en: "Male status-seeking declines",
    title_fi: "Miesten statusmotivaatio laskee",
    test_en:
      "T → status motivation (Dreher 2016, n=121). Observed: declining entrepreneurship, quiet quitting, reduced career ambition.",
    test_fi:
      "T → statusmotivaatio (Dreher 2016, n=121). Havaittu: laskeva yrittäjyys, hiljainen irtisanoutuminen, vähentynyt urakunnianhimo.",
    level: "M|C",
  },
  {
    id: "BEH-2",
    group: "BEH",
    title_en: "Male risk-taking declines",
    title_fi: "Miesten riskinotto laskee",
    test_en:
      "T → competitive risk (Competition 2024, n=220). Observed: declining business formation, reduced physical risk activities.",
    test_fi:
      "T → kilpailullinen riski (Competition 2024, n=220). Havaittu: laskeva yritysperustaminen, vähentyneet fyysiset riskit.",
    level: "M|C",
  },
  {
    id: "BEH-3",
    group: "BEH",
    title_en: "Male sexual approach declines",
    title_fi: "Miesten seksuaalinen lähestyminen laskee",
    test_en:
      "T → sexual motivation (Goetz 2024, n=139). Observed: rising sexlessness, declining relationship initiation, Japan 43% virginal at 18–34.",
    test_fi:
      "T → seksuaalinen motivaatio (Goetz 2024, n=139). Havaittu: kasvava seksuaalinen inaktiivisuus, laskeva suhteiden aloittaminen, Japani 43% neitsyitä 18–34-vuotiaista.",
    level: "M|C",
  },
  {
    id: "BEH-4",
    group: "BEH",
    title_en: "Male authenticity declines",
    title_fi: "Miesten autenttisuus laskee",
    test_en:
      "T → authentic self-presentation (Audience 2020, n=166). Observed: rising social anxiety, increased impression management, performative identity.",
    test_fi:
      "T → autenttinen itseilmaisu (Audience 2020, n=166). Havaittu: kasvava sosiaalinen ahdistus, lisääntynyt vaikutelmanhallinta, performatiivinen identiteetti.",
    level: "M|C",
  },
  {
    id: "BEH-5",
    group: "BEH",
    title_en: "Male group loyalty declines",
    title_fi: "Miesten ryhmälojaalisuus laskee",
    test_en:
      "T → in-group favoritism (Parochial 2015, n=100). Observed: declining civic participation, falling union/party membership.",
    test_fi:
      "T → sisäryhmäsuosiminen (Parochial 2015, n=100). Havaittu: laskeva kansalaisosallistuminen, laskeva ammattiliitto/puoluejäsenyys.",
    level: "M|C",
  },
  {
    id: "BEH-6",
    group: "BEH",
    title_en: "Male provocation response declines",
    title_fi: "Miesten provokaatiovaste laskee",
    test_en:
      "T → reactive aggression (Carré 2017, n=308). Observed: declining violent crime rates, reduced confrontation willingness.",
    test_fi:
      "T → reaktiivinen aggressio (Carré 2017, n=308). Havaittu: laskevat väkivaltarikoluvut, vähentynyt konfrontaatiohalukkuus.",
    level: "M|C",
  },
  {
    id: "BEH-7",
    group: "BEH",
    title_en: "Male cognitive style shifts toward deliberation",
    title_fi: "Miesten kognitiivinen tyyli siirtyy harkintaan",
    test_en:
      "T → gut-feel over deliberation (Nave 2018, n=243). Observed: increased decision paralysis, analysis paralysis, reduced spontaneous action.",
    test_fi:
      "T → vaistonvarainen vs. harkitseva (Nave 2018, n=243). Havaittu: lisääntynyt päätöshalvaus, analysoinnin paralyysi, vähentynyt spontaani toiminta.",
    level: "M|C",
  },
  {
    id: "BEH-8",
    group: "BEH",
    title_en: "Male motivation/reward sensitivity declines",
    title_fi: "Miesten motivaatio/palkkioherkkyys laskee",
    test_en:
      "T↓ → DA↓ → anhedonia (Soares-Cunha 2016). Observed: rising depression, failure-to-launch, NEET rates, gaming as reward substitution.",
    test_fi:
      "T↓ → DA↓ → anhedonia (Soares-Cunha 2016). Havaittu: kasvava masennus, epäonnistuminen itsenäistymisessä, NEET-luvut, pelaaminen palkkiokorvauksena.",
    level: "M|C",
  },
  {
    id: "BEH-9",
    group: "BEH",
    title_en: "Female anxiety/depression gender gap widens",
    title_fi: "Naisten ahdistuksen/masennuksen sukupuolikuilu laajenee",
    test_en:
      "Estrogen amplifies HPA reactivity. EMF → cortisol↑ hits women harder. Observed: women 2× anxiety/depression rate, gap widening since 2010.",
    test_fi:
      "Estrogeeni vahvistaa HPA-reaktiivisuutta. EMF → kortisoli↑ osuu naisiin kovemmin. Havaittu: naisilla 2× ahdistus/masennusluku, kuilu levenee 2010 jälkeen.",
    level: "M|C",
  },
  {
    id: "BEH-10",
    group: "BEH",
    title_en: "Institutional trust declines globally",
    title_fi: "Institutionaalinen luottamus laskee globaalisti",
    test_en:
      "OT → trust (Kosfeld 2005, Nature). EMF → vagal tone↓ → OT↓. Observed: Edelman 2025 trust at historic lows, loneliness epidemic.",
    test_fi:
      "OT → luottamus (Kosfeld 2005, Nature). EMF → vagaalinen tonus↓ → OT↓. Havaittu: Edelman 2025 luottamus historiallisen matalalla, yksinäisyysepidemia.",
    level: "M|C",
  },
  {
    id: "BEH-11",
    group: "BEH",
    title_en: "PCOS prevalence rises with EMF adoption",
    title_fi: "PCOS-esiintyvyys nousee EMF-käyttöönoton myötä",
    test_en:
      "PCOS = 4-organ VGCC convergence (pancreas + ovary + pituitary + adrenal). Observed: prevalence 5–20% and rising, most common cause of female infertility.",
    test_fi:
      "PCOS = 4-elimen VGCC-konvergenssi (haima + munasarja + aivolisäke + lisämunuainen). Havaittu: esiintyvyys 5–20% ja nousee, naisten hedelmättömyyden yleisin syy.",
    level: "M|C",
  },
  {
    id: "BEH-12",
    group: "BEH",
    title_en: "Each generation more sensitive than previous",
    title_fi: "Jokainen sukupolvi herkempi kuin edellinen",
    test_en:
      "CaMKII → Cav3.2 threshold↓ (PMC9913649). Epigenetic transmission (sperm methylome). Observed: mental health crisis onset earlier in each cohort, ASD/ADHD prevalence rising.",
    test_fi:
      "CaMKII → Cav3.2-kynnys↓ (PMC9913649). Epigeneettinen transmissio (sperman metylomi). Havaittu: mielenterveyskriisi alkaa aiemmin joka kohortissa, ASD/ADHD-esiintyvyys nousee.",
    level: "M|C",
  },

  // IQS-1..IQS-3: IQ Shredder predictions (patopolis)
  {
    id: "IQS-1",
    group: "IQS",
    title_en: "Singapore fertility tracks EMF density, not economics",
    title_fi: "Singaporen hedelmällisyys seuraa EMF-tiheyttä, ei taloutta",
    test_en:
      "Singapore's fertility decline correlates with EMF infrastructure density, not just economic development — controlling for GDP per capita, the EMF-dense city-states will show lower TFR than economically comparable but less EMF-dense nations.",
    test_fi:
      "Singaporen hedelmällisyyden lasku korreloi EMF-infrastruktuurin tiheyden, ei pelkän taloudellisen kehityksen kanssa — BKT:tä henkeä kohti vakioiden EMF-tiiviit kaupunkivaltiot osoittavat matalamman TFR:n kuin ekonomisesti vertailukelpoiset mutta vähemmän EMF-tiiviit maat.",
    level: "M|C",
  },
  {
    id: "IQS-2",
    group: "IQS",
    title_en: "Shredder velocity predictable from BioCap",
    title_fi: "Silppurin nopeus ennustettavissa BioCap-mallista",
    test_en:
      "Shredder velocity is predictable from BioCap: cities with lower BioCap (higher EMF density) will reach demographic crisis earlier, regardless of pro-natalist policy spending.",
    test_fi:
      "Shredderin nopeus on ennustettavissa BioCap-mallista: kaupungit, joissa BioCap on matalampi (korkeampi EMF-tiheys), saavuttavat demografisen kriisin aiemmin riippumatta pronatalisen politiikan rahoituksesta.",
    level: "M|C",
  },
  {
    id: "IQS-3",
    group: "IQS",
    title_en: "Epigenetic shredder damage persists in offspring",
    title_fi: "Epigeneettinen silppurivaurio jatkuu jälkeläisissä",
    test_en:
      "Epigenetic transmission means the shredder damages even the children who are born — second-generation city-dwellers will show lower fertility than first-generation immigrants at the same economic level, even after controlling for cultural assimilation.",
    test_fi:
      "Epigeneettinen transmissio tarkoittaa, että silppuri vahingoittaa myös syntyviä lapsia — toisen sukupolven kaupunkilaiset osoittavat matalampaa hedelmällisyyttä kuin ensimmäisen sukupolven maahanmuuttajat samalla ekonomisella tasolla, kulttuurisen assimilaation vakioinnin jälkeenkin.",
    level: "M|C",
  },
];

export const CIV_PRED_GROUPS = {
  PK: {
    label_en: "Patokinesis — Moving Pathology",
    label_fi: "Patokinesis — Liikkuva patologia",
  },
  CIV: {
    label_en: "Patopolis — Civilization-Level",
    label_fi: "Patopolis — Sivilisaatiotaso",
  },
  PP: {
    label_en: "Pathopolites — Endocrine Phenotype",
    label_fi: "Pathopolites — Endokriininen fenotyyppi",
  },
  L: {
    label_en: "Patopoliteia — Historical Laws",
    label_fi: "Patopoliteia — Historialliset lait",
  },
  BEH: {
    label_en: "Behavioral Predictions",
    label_fi: "Käyttäytymisennusteet",
  },
  IQS: {
    label_en: "IQ Shredder Predictions",
    label_fi: "IQ-silppuriennusteet",
  },
} as const;
