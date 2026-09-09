import Link from "next/link";
import { pickCopy } from "@/lib/i18n";
import { ClaimRef } from "@/components/ClaimRef";
import { StudyCitation } from "@/components/StudyCitation";
import { TranslationNotice } from "@/components/TranslationNotice";
import { TemporalTtoTFR } from "@/components/TemporalTtoTFR";
import { MathBlock } from "@/components/MathBlock";

const COPY = {
  en: {
    updated: "Research update · 9 September 2026",
    title: "Testosterone decline precedes later fertility declines in three documented cases",
    lead: "Finnish population samples, the regional US MMAS cohort and Israeli clinical data document lower testosterone before a later national TFR decline episode. This supports temporal precedence in these cases. The effect size, exact lag and cause remain separate calibration questions.",
    summary: "Timing evidence supports precedence in Finland, the United States and Israel. Hormone trials and fertility studies constrain separate parts of the cascade. A population-wide testosterone-to-TFR coefficient has not yet been estimated.",
    link: "See the measurements, cascade and sources",
    diversity: "The wider assessment retains differences: Denmark’s total-T result weakens after BMI adjustment; South Africa’s included follow-up shows no preceding total-T decline. These three cases concern later decline episodes, not the beginning of every country’s historical fertility transition.",
    cascadeTitle: "From hormone change to births: calibrate each transition",
    cascadeLead: "The new collection contains 71 published component estimates and summaries, not 71 independent studies. NHANES adds individual hormone and behavior records. Overlapping publications remain grouped by study family.",
    cards: [
      { title: "Population range · NHANES 2011–2016", result: "6,638 measured T · 4,040 linked to sexual frequency", detail: "Men aged 18–69 in three repeated cross-sectional surveys. In our exploratory weighted analysis at ages 20–49 (n = 2,982), the odds ratio for at least weekly vaginal or anal sex was 0.99 per +100 ng/dL (95% CI 0.93–1.07), adjusted for age, BMI, survey cycle and examination time. No clear uniform slope; this endpoint is not fertile-window intercourse.", referenceIds: ["nhanes2013_2014_hormones_data", "nhanes2013_2014_sexual_behavior"] },
      { title: "Low-T intervention · TRAVERSE", result: "+0.47 sexual-activity events/day at 12 months", detail: "Randomized treatment versus placebo in 1,161 men aged 45–80 with low T, low libido and cardiovascular disease or risk increased the composite activity measure (95% CI 0.11–0.83). Events include more than intercourse. Finkelstein’s experiments also separate testosterone and estradiol contributions. Neither result supplies a natural population T slope.", referenceIds: ["pencina2024_traverse_sexual_function", "finkelstein2013_gonadal_steroids"] },
      { title: "Sperm production · a separate hormone compartment", result: "Weeks to months in suppression/recovery studies", detail: "Serum T and intratesticular T are different states: testosterone treatment can suppress gonadotropins and intratesticular T. In a pooled recovery analysis of 1,549 men, the median time to recover 20 million sperm/mL was 3.4 months (95% CI 3.2–3.5). These experiments do not support a fixed 10–15-year tissue-response lag.", referenceIds: ["coviello2005_intratesticular_testosterone", "liu2006_spermatogenesis_recovery"] },
      { title: "Severe deficiency · treatment sequence", result: "First sperm: 7 months · pregnancy: 21 months", detail: "Medians in a retrospective gonadotropin-treatment cohort of 35 men with hypogonadotropic hypogonadism and azoospermia (IQRs 5–13 and 18–30 months). Sperm production and time to pregnancy are distinct transitions. This is not a universal delay for healthy populations.", referenceIds: ["huijben2026_hh_fertility"] },
      { title: "Live births · AMIGOS", result: "18.8% versus 27.5%; adjusted OR 0.65", detail: "In an observational male-T analysis within a fertility-treatment trial, live births occurred in 21/112 low-T and 184/669 other couples. The adjusted 95% CI was 0.38–1.12. The direction is compatible with the proposed link, but uncertain; male testosterone was not randomized.", referenceIds: ["amigos2019_testosterone_live_birth"] },
      { title: "Feedback · the Cebu cohort", result: "Baseline T predicts fatherhood; T then falls", detail: "Among 624 men followed for 4.5 years, higher baseline waking T predicted subsequent partnered fatherhood; new fathers then showed lower T. Prospective baseline measurements must be separated from hormonal changes after parenthood.", referenceIds: ["gettler2011_fatherhood_testosterone"] },
    ],
    formulaTitle: "BERM’s conditional cascade",
    formulaLead: "Hormones can affect behavior and gamete production through different responses and delays. The probability of conception per cycle conditions each transition on earlier stages:",
    variables: "A: an at-risk cycle; P: partner contact; X: sperm exposure in the fertile window; H: hormone history; Z: relationship context, intentions and contraception; Q: semen quality; F: female reproductive state.",
    formulaNote: "Births follow conceptions through gestational survival and delay. TFR is aggregated from age-specific live-birth rates. Correlated hormone, behavior and semen effects must be integrated jointly; four assumed 20% reductions can count shared effects repeatedly.",
    response: "Candidate response shapes include a regularized spline, a saturating curve, and a nearly flat population-range response with a stronger deficiency effect. Fit their shape and state-dependent delays, then compare predictions on countries or periods excluded from fitting.",
    boundary: "Model boundary: Lindgren-derived geometry remains the physical premise. These studies supply empirical downstream biology; BERM proposes their conditional composition. The L2 operator’s gauge, physical scale, tissue kernels and sign, and the human hormone-to-TFR transfer remain open. This update does not calibrate an EMF cause. FieldState may supply physical observations only.",
    downloads: "Inspect the underlying evidence", estimates: "71 published component records", associations: "NHANES exploratory estimates", methods: "Methods and source catalog",
    thresholdTitle: "Response shape and thresholds remain calibration questions",
    thresholdText: "The data do not establish a universal 40% testosterone-loss threshold or a serum-T cutoff that determines national TFR. Low-T treatment response, population-range associations, sperm recovery and demographic timing constrain different parts of BERM. Candidate curves must be tested against these separate observations.",
  },
  fi: {
    updated: "Tutkimuspäivitys · 9.9.2026",
    title: "Testosteronin lasku edeltää myöhempää syntyvyyden laskua kolmessa dokumentoidussa tapauksessa",
    lead: "Suomalaisissa väestönäytteissä, Yhdysvaltain alueellisessa MMAS-kohortissa ja Israelin kliinisessä aineistossa alempi testosteronitaso on dokumentoitavissa ennen myöhempää kansallista TFR-laskuvaihetta. Tämä tukee ajallista edeltämistä näissä tapauksissa. Vaikutuksen suuruus, täsmällinen viive ja syy ovat erillisiä kalibrointikysymyksiä.",
    summary: "Ajoitusnäyttö tukee edeltämistä Suomessa, Yhdysvalloissa ja Israelissa. Hormoni- ja hedelmällisyystutkimukset tarkentavat kaskadin eri osia. Koko väestölle yhteistä testosteroni–TFR-kerrointa ei ole vielä estimoitu.",
    link: "Katso mittaukset, kaskadi ja lähteet",
    diversity: "Laajempi arvio säilyttää myös erot: Tanskan kokonais-T-tulos heikkenee BMI-vakioinnissa; Etelä-Afrikan mukana olevassa seurannassa ei havaita edeltävää kokonais-T-laskua. Kolme päätapausta koskevat myöhempiä laskuvaiheita, eivät jokaisen maan historiallisen syntyvyyssiirtymän alkua.",
    cascadeTitle: "Hormonimuutoksesta syntymiin: kalibroi jokainen siirtymä",
    cascadeLead: "Uusi kokoelma sisältää 71 julkaistua osavaikutusten estimaattia ja yhteenvetoa, ei 71 riippumatonta tutkimusta. NHANES tuo mukaan yksilötason hormoni- ja käyttäytymishavaintoja. Päällekkäiset julkaisut säilyvät samassa tutkimusperheessä.",
    cards: [
      { title: "Väestön pitoisuusalue · NHANES 2011–2016", result: "6 638 mitattua T-arvoa · 4 040 yhdistyy seksitiheyteen", detail: "18–69-vuotiaita miehiä kolmessa toistetussa poikkileikkaustutkimuksessa. Omassa alustavassa painotetussa 20–49-vuotiaiden analyysissämme (n = 2 982) vähintään viikoittaisen vaginaali- tai anaaliseksin vetosuhde oli 0,99 / +100 ng/dL (95 %:n luottamusväli 0,93–1,07), kun ikä, BMI, tutkimusjakso ja näytteenottoaika huomioitiin. Selvää yhteistä kulmakerrointa ei löytynyt; mittari ei kuvaa hedelmällisen ikkunan yhdyntöjä.", referenceIds: ["nhanes2013_2014_hormones_data", "nhanes2013_2014_sexual_behavior"] },
      { title: "Matalan T:n hoitokoe · TRAVERSE", result: "+0,47 seksuaalista tapahtumaa/päivä 12 kuukaudessa", detail: "Satunnaistetussa vertailussa oli 1 161 iältään 45–80-vuotiasta miestä, joilla oli matala T ja libido sekä sydän- ja verisuonisairaus tai sen riski. Hoito kasvatti aktiivisuuden yhdistelmämittaria lumeeseen verrattuna (95 %:n luottamusväli 0,11–0,83). Tapahtumat eivät tarkoita vain yhdyntöjä. Finkelsteinin kokeet erottavat lisäksi testosteronin ja estradiolin osuuksia. Kumpikaan tulos ei sellaisenaan anna luonnollisen väestövaihtelun T-kerrointa.", referenceIds: ["pencina2024_traverse_sexual_function", "finkelstein2013_gonadal_steroids"] },
      { title: "Siittiötuotanto · erillinen hormonitila", result: "Vaimennus- ja palautumiskokeissa viikkoja–kuukausia", detail: "Seerumin ja kiveksen sisäinen T ovat eri tiloja: testosteronihoito voi vaimentaa gonadotropiineja ja kiveksen sisäistä T:tä. 1 549 miehen yhdistetyssä palautumisanalyysissä mediaaniaika tasolle 20 miljoonaa siittiötä/ml oli 3,4 kuukautta (95 %:n luottamusväli 3,2–3,5). Kokeet eivät tue kiinteää 10–15 vuoden kudosvasteviivettä.", referenceIds: ["coviello2005_intratesticular_testosterone", "liu2006_spermatogenesis_recovery"] },
      { title: "Vaikea hormonivaje · hoidon vaiheistus", result: "Ensimmäiset siittiöt: 7 kk · raskaus: 21 kk", detail: "Mediaanit 35 miehen takautuvassa gonadotropiinihoidon seurannassa; lähtötilana hypogonadotrooppinen hypogonadismi ja atsoospermia (kvartiilivälit 5–13 ja 18–30 kk). Siittiötuotannon palautuminen ja raskauden alku ovat eri siirtymiä. Tulos ei ole terveen väestön yleinen viive.", referenceIds: ["huijben2026_hh_fertility"] },
      { title: "Elävänä syntymät · AMIGOS", result: "18,8 % vastaan 27,5 %; vakioitu vetosuhde 0,65", detail: "Hedelmöityshoitotutkimuksen havainnoivassa mies-T-analyysissä elävänä syntymä toteutui 21/112 matalan T:n ja 184/669 muun parin kohdalla. Vakioitu 95 %:n luottamusväli oli 0,38–1,12. Suunta sopii ehdotettuun yhteyteen, mutta on epävarma; miehen testosteronia ei satunnaistettu.", referenceIds: ["amigos2019_testosterone_live_birth"] },
      { title: "Takaisinkytkentä · Cebun kohortti", result: "Lähtö-T ennustaa isyyttä; T laskee sen jälkeen", detail: "624 miehen 4,5 vuoden seurannassa korkeampi aamun lähtö-T ennusti myöhempää parisuhteessa toteutuvaa isyyttä; uusilla isillä T laski tämän jälkeen. Ennen vanhemmuutta mitattu hormonitaso erotetaan vanhemmuuden jälkeisistä hormonimuutoksista.", referenceIds: ["gettler2011_fatherhood_testosterone"] },
    ],
    formulaTitle: "BERM:n ehdollinen kaskadi",
    formulaLead: "Hormonit voivat vaikuttaa käyttäytymiseen ja sukusolutuotantoon eri vasteilla ja viiveillä. Kierron hedelmöittymistodennäköisyydessä jokainen siirtymä ehdollistetaan aiemmille vaiheille:",
    variables: "A: raskausmahdollisuuden sisältävä kierto; P: kumppanikontakti; X: siittiöaltistus hedelmällisessä ikkunassa; H: hormonihistoria; Z: parisuhdetilanne, aikomukset ja ehkäisy; Q: siemennesteen laatu; F: naisen lisääntymisfysiologinen tila.",
    formulaNote: "Syntymät seuraavat hedelmöittymisiä raskauden säilymisen ja keston kautta. TFR kootaan ikäkohtaisista elävänä syntymien luvuista. Korreloivat hormoni-, käyttäytymis- ja siemennestevaikutukset käsitellään yhdessä; neljä oletettua 20 prosentin heikennystä voivat laskea yhteisiä vaikutuksia toistuvasti.",
    response: "Vastekäyrien ehdokkaita ovat säännöllistetty splini, kyllästyvä käyrä sekä suurella osalla väestöaluetta lähes tasainen vaste ja voimakkaampi vajetilan vaikutus. Muoto ja lähtötilasta riippuvat viiveet sovitetaan, minkä jälkeen ennusteita verrataan sovituksesta pois jätetyissä maissa tai jaksoissa.",
    boundary: "Malliraja: Lindgrenistä johdettu geometria säilyy fysikaalisena premissinä. Tutkimukset tuovat empiiristä alavirran biologiaa; BERM ehdottaa sen ehdollista yhdistämistä. L2-operaattorin gauge, fysikaalinen mittakaava, kudosytimet ja etumerkki sekä ihmisen hormoni–TFR-siirto ovat avoimia. Päivitys ei kalibroi EMF-syytä. FieldState voi tuottaa vain fysikaalisia havaintoja.",
    downloads: "Tarkastele tausta-aineistoa", estimates: "71 julkaistua osavaikutustietuetta", associations: "NHANESin alustavat estimaatit", methods: "Menetelmät ja lähdeluettelo",
    thresholdTitle: "Vasteen muoto ja kynnykset ovat kalibrointikysymyksiä",
    thresholdText: "Aineisto ei määritä yleistä 40 prosentin testosteronimenetyksen kynnystä tai kansallisen TFR:n ratkaisevaa seerumin T-rajaa. Matalan T:n hoitovaste, väestöalueen yhteydet, siittiötuotannon palautuminen ja väestötason ajoitus rajaavat BERM:n eri osia. Ehdotettuja vastekäyriä verrataan näihin erillisiin havaintoihin.",
  },
};

export function TestosteroneCalibrationSummary({ locale, threshold = false }: { locale: string; threshold?: boolean }) {
  const d = pickCopy(COPY, locale);
  return (
    <aside className="my-6 rounded-xl border border-accent/25 bg-accent/5 p-5" lang={locale === "fi" ? "fi" : "en"}>
      <p className="text-xs font-medium text-accent">{d.updated}</p>
      <h3 className="mt-2 font-semibold">{threshold ? d.thresholdTitle : d.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{threshold ? d.thresholdText : d.summary}</p>
      <Link className="mt-3 inline-block text-sm text-accent underline underline-offset-4" href={`/${locale}/evidence/testosterone#${threshold ? "hormone-cascade" : "temporal-precedence"}`}>{d.link} →</Link>
    </aside>
  );
}

export function TestosteroneCalibrationUpdate({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);
  return (
    <div lang={locale === "fi" ? "fi" : "en"}>
      <TranslationNotice copy={COPY} locale={locale} />
      <section id="temporal-precedence" className="mt-10 scroll-mt-44 sm:scroll-mt-24">
        <p className="mb-3 text-xs font-medium text-accent">{d.updated}</p>
        <h2 className="mb-4 text-2xl font-semibold leading-snug">{d.title}</h2>
        <p className="mb-6 leading-relaxed text-foreground-muted"><ClaimRef claimId="claim.testosterone.temporal-precedence">{d.lead}</ClaimRef></p>
        <TemporalTtoTFR locale={locale} />
        <p className="mt-5 text-sm leading-relaxed text-foreground-muted">{d.diversity}</p>
      </section>
      <section id="hormone-cascade" className="mt-14 scroll-mt-44 sm:scroll-mt-24 border-t editorial-rule pt-6">
        <h2 className="mb-4 text-2xl font-semibold">{d.cascadeTitle}</h2>
        <p className="mb-6 leading-relaxed text-foreground-muted">{d.cascadeLead}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {d.cards.map(card => (
            <article key={card.title} className="min-w-0 rounded-xl border border-card-border bg-card-bg p-5">
              <h3 className="text-sm font-medium text-foreground-muted">{card.title}</h3>
              <p className="mt-3 text-lg font-semibold leading-snug">{card.result}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{card.detail}</p>
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-xs">{card.referenceIds.map(id => <StudyCitation key={id} referenceId={id} locale={locale} />)}</div>
            </article>
          ))}
        </div>
        <div className="mt-6 rounded-xl border border-accent/25 bg-accent/5 p-5 sm:p-6">
          <h3 className="text-lg font-semibold">{d.formulaTitle}</h3>
          <p className="mt-3 text-sm leading-relaxed"><ClaimRef claimId="claim.testosterone.conditional-cascade">{d.formulaLead}</ClaimRef></p>
          <MathBlock tex={String.raw`p_C=p_A\,p_{P\mid A}\,p_{X\mid A,P,H,Z}\,p_{C\mid A,P,X,Q,F}`} />
          <p className="mt-3 text-xs leading-relaxed text-foreground-muted">{d.variables}</p>
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted">{d.formulaNote}</p>
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted">{d.response}</p>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-foreground-muted">{d.boundary}</p>
        <nav className="mt-6" aria-label={d.downloads}>
          <h3 className="mb-3 font-medium">{d.downloads}</h3>
          <ul className="space-y-2 text-sm text-accent underline underline-offset-4">
            <li><a download href="/data/testosterone-calibration/cascade_component_constraints.csv">{d.estimates}</a></li>
            <li><a download href="/data/testosterone-calibration/exploratory_hormone_behavior_associations.csv">{d.associations}</a></li>
            <li><a download href="/data/testosterone-calibration/README.md">{d.methods}</a></li>
          </ul>
        </nav>
      </section>
    </div>
  );
}
