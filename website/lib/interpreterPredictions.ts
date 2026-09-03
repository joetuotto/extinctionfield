export type InterpreterPrediction = {
  id: `INTERP-${number}`;
  title_en: string;
  title_fi: string;
  derivation_en: string;
  derivation_fi: string;
  registered_test_en: string;
  registered_test_fi: string;
  falsification_en: string;
  falsification_fi: string;
  level: "L*";
  status: "OPEN";
  registeredDate: string;
  modelVersion: string;
};

/**
 * Qualitative, preregistration-ready predictions from BERM's interpreter
 * extension. These are not part of the locked scalar country forecast table.
 * FieldState can supply physical measurements to tests 2–4 but is not the
 * model or the source of their biological/cognitive mechanisms.
 */
export const INTERPRETER_PREDICTIONS: readonly InterpreterPrediction[] = [
  {
    id: "INTERP-1",
    title_en: "Biological state precedes the stated fertility reason",
    title_fi: "Biologinen tila edeltää ilmoitettua hedelmällisyyssyytä",
    derivation_en:
      "If a reported reason is partly an interpreter output, an upstream androgen-effective, HPA-axis or circadian state should predict a later change in the report beyond the person's prior answer and measured economic conditions.",
    derivation_fi:
      "Jos ilmoitettu syy on osittain tulkin tuotos, edeltävän androgeenivaikutuksen, HPA-akselin tai vuorokausijärjestelmän tilan pitäisi ennustaa myöhempää raportin muutosta henkilön aiemman vastauksen ja mitattujen talousolojen lisäksi.",
    registered_test_en:
      "Longitudinal individual-level panel; assay total and free testosterone, SHBG, cortisol timing and melatonin/circadian markers with fertility intention, partnership behaviour and stated reasons. Primary estimand: biological state at t → report at t+1 after prior report, age, BMI, relationship status, income, employment and parenthood are controlled.",
    registered_test_fi:
      "Yksilötason pitkittäispaneeli; mittaa kokonais- ja vapaa testosteroni, SHBG, kortisolin ajoitus sekä melatoniini-/vuorokausimarkkerit yhdessä hedelmällisyysaikomuksen, parisuhdekäyttäytymisen ja ilmoitettujen syiden kanssa. Pääestimaatti: biologinen tila hetkellä t → raportti hetkellä t+1, kun aiempi raportti, ikä, BMI, parisuhdetila, tulot, työllisyys ja vanhemmuus on kontrolloitu.",
    falsification_en:
      "Rejected if preregistered biological variables add no out-of-sample prediction of later reports or behaviour and the reverse temporal path is at least as strong in independent replication.",
    falsification_fi:
      "Hylätään, jos ennakkorekisteröidyt biologiset muuttujat eivät lisää myöhempien raporttien tai käyttäytymisen otoksen ulkopuolista ennustetta ja käänteinen ajallinen reitti on vähintään yhtä vahva riippumattomassa replikaatiossa.",
    level: "L*",
    status: "OPEN",
    registeredDate: "2026-09-03",
    modelVersion: "BERM-CAND-2026-09-03",
  },
  {
    id: "INTERP-2",
    title_en: "Pronatalist policy response is modified by measured exposure",
    title_fi: "Mitattu altistus muuntaa pronatalistisen politiikan vastetta",
    derivation_en:
      "If policy acts mainly on Level 3 while Level 1 or Level 2 is binding, the same incentive should produce a smaller ASFR response under a larger measured physical exposure burden and adverse biological state distribution.",
    derivation_fi:
      "Jos politiikka vaikuttaa pääasiassa Tasoon 3 Tason 1 tai 2 ollessa sitova, saman kannustimen pitäisi tuottaa pienempi ASFR-vaste suuremman mitatun fysikaalisen altistuskuorman ja epäedullisemman biologisen tilajakauman alla.",
    registered_test_en:
      "Event-study or synthetic-control analysis of policy introductions. Register the policy × measured-exposure interaction before outcome access; model ASFR by age and parity, and include policy intensity, housing, income, childcare, migration and pre-trends. Technology proxies and measured FieldState inputs must be reported separately.",
    registered_test_fi:
      "Politiikan käyttöönottojen event study- tai synteettisen kontrollin analyysi. Rekisteröi politiikka × mitattu altistus -interaktio ennen tulosaineiston avaamista; mallinna ASFR iän ja pariteetin mukaan ja sisällytä politiikan voimakkuus, asuminen, tulot, päivähoito, muuttoliike ja ennakkotrendit. Teknologiaproxyt ja mitatut FieldState-syötteet raportoidaan erikseen.",
    falsification_en:
      "Rejected if the interaction is absent or opposite in held-out countries with adequate exposure contrast and biological measurements, while the policy main effect replicates.",
    falsification_fi:
      "Hylätään, jos interaktio puuttuu tai on vastakkaissuuntainen pidätetyissä maissa, joissa altistuskontrasti ja biologiset mittaukset ovat riittäviä, samalla kun politiikan päävaikutus replikoituu.",
    level: "L*",
    status: "OPEN",
    registeredDate: "2026-09-03",
    modelVersion: "BERM-CAND-2026-09-03",
  },
  {
    id: "INTERP-3",
    title_en: "Shielding changes biology, behaviour and the later explanation",
    title_fi: "Suojaus muuttaa biologiaa, käyttäytymistä ja myöhempää selitystä",
    derivation_en:
      "If the Level 2 pathway is upstream of the narrative, a blinded reduction of the target field should change a biological mediator first, then behaviour, and finally the distribution of stated reasons.",
    derivation_fi:
      "Jos Tason 2 reitti on narratiivia edeltävä, kohdekentän sokkoutetun vähennyksen pitäisi muuttaa ensin biologista mediaattoria, sitten käyttäytymistä ja lopuksi ilmoitettujen syiden jakaumaa.",
    registered_test_en:
      "Randomized shielded-versus-sham crossover with measured field spectra and identical light, sound, temperature, sleep opportunity and expectancy. Register temporal mediation from biological endpoint to behaviour to report; analyse carry-over and washout explicitly.",
    registered_test_fi:
      "Satunnaistettu suojattu–lumekontrolloitu vaihtovuorokoe, jossa kenttäspektrit mitataan ja valo, ääni, lämpötila, unimahdollisuus sekä odotukset vakioidaan. Rekisteröi ajallinen mediaatio biologisesta päätepisteestä käyttäytymiseen ja raporttiin; analysoi siirtymä- ja palautumisvaikutukset erikseen.",
    falsification_en:
      "Rejected for the tested field and endpoint if adequate exposure contrast produces neither the registered biological change nor the ordered behavioural/report pathway in a powered independent replication.",
    falsification_fi:
      "Hylätään testatun kentän ja päätepisteen osalta, jos riittävä altistuskontrasti ei tuota rekisteröityä biologista muutosta eikä järjestettyä käyttäytymis-/raporttireittiä voimallisessa riippumattomassa replikaatiossa.",
    level: "L*",
    status: "OPEN",
    registeredDate: "2026-09-03",
    modelVersion: "BERM-CAND-2026-09-03",
  },
  {
    id: "INTERP-4",
    title_en: "Measured field reduction during network interruption predicts within-person change",
    title_fi: "Verkkokatkon aikainen mitattu kentän väheneminen ennustaa yksilönsisäistä muutosta",
    derivation_en:
      "A network-service interruption is informative only where it produces a measured change in the relevant physical field. BERM predicts that the magnitude of that change, not the administrative interruption itself, orders the biological and behavioural response.",
    derivation_fi:
      "Verkkopalvelun katko on informatiivinen vain siellä, missä se tuottaa mitatun muutoksen asianomaisessa fysikaalisessa kentässä. BERM ennustaa, että biologisen ja behavioraalisen vasteen järjestää tämän muutoksen suuruus, ei hallinnollinen katko itsessään.",
    registered_test_en:
      "Prospective natural-experiment panel with personal and fixed-site field measurements before, during and after interruption; matched unaffected regions; within-person biomarkers, sleep, mood, motivation and reasons. Control mobility, work, information access, stress, power supply and enforcement changes.",
    registered_test_fi:
      "Prospektiivinen luonnollisen kokeen paneeli henkilökohtaisilla ja kiinteiden pisteiden kenttämittauksilla ennen katkoa, sen aikana ja jälkeen; yhteensovitetut muuttumattomat alueet; yksilönsisäiset biomarkkerit, uni, mieliala, motivaatio ja syyt. Kontrolloi liikkuminen, työ, tiedonsaanti, stressi, sähkönsyöttö ja valvontamuutokset.",
    falsification_en:
      "Rejected if measured field change has no dose-ordered association with the preregistered biological or behavioural endpoints after interruption-specific pathways are controlled and the null replicates across events.",
    falsification_fi:
      "Hylätään, jos mitatulla kenttämuutoksella ei ole annosjärjestynyttä yhteyttä ennakkorekisteröityihin biologisiin tai behavioraalisiin päätepisteisiin katkokohtaisten reittien kontrolloinnin jälkeen ja nollatulos replikoituu eri tapahtumissa.",
    level: "L*",
    status: "OPEN",
    registeredDate: "2026-09-03",
    modelVersion: "BERM-CAND-2026-09-03",
  },
] as const;
