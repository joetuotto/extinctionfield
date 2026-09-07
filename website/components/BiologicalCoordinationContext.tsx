import Link from "next/link";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { TranslationNotice } from "@/components/TranslationNotice";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    link: "Follow the biological coordination model →",
    model: {
      title: "Biological coordination: the receiving state matters",
      paragraphs: [
        "BERM now makes the receiving tissue explicit: its orientation, cofactors, redox state, hormone responsiveness, biological phase and recovery history shape the response to a physical input. Starting from Lindgren’s 2025 tensor ansatz, a named, state-dependent biological coupling connects the geometric perturbation to receptor activity. FieldState supplies observations used to estimate that physical state.",
        "The downstream chain follows chemical memory → redox and clock function → hormone–tissue timing → functional reproductive gates → successful encounters and population distributions. Component experiments anchor these transitions; composing them into a common BERM route is the model synthesis. The coordination explorer shows how timing, recovery and individual differences change outcomes under explicitly illustrative assumptions.",
      ],
    },
    nutrition: {
      title: "From the nutritional CRY gate to hormone responsiveness",
      paragraphs: [
        "BERM connects the nutritional receiver mechanisms described here to known CRY endocrine pathways. CRY1 and CRY2 interact with the glucocorticoid receptor and regulate its transcriptional response; hepatic cryptochromes also inhibit glucagon-linked G-protein/cAMP signalling. These are direct molecular links between clock state, stress-hormone response and metabolism. [[ref:lamia2011_cry_glucocorticoid|Lamia 2011]]; [[ref:zhang2010_cry_camp|Zhang 2010]].",
        "Meal timing supplies a second nutritional input. Delaying meals shifted glucose and adipose PER2 rhythms by different amounts while melatonin and cortisol retained their timing. BERM therefore carries nutritional state into both receptor readiness and tissue phase. Their combined effect on a field response is a conditional extension of the model. [[ref:wehrens2017_meal_timing|Wehrens 2017]].",
      ],
    },
    circadian: {
      title: "The clock signal and the receiving network",
      paragraphs: [
        "Redox state can change suprachiasmatic neuronal excitability through potassium-channel modulation. In a defined tNMR protocol in mouse fibroblasts, time of application and glucocorticoid pretreatment changed different features of the clock response. Together these findings anchor a feedback model in which biological state changes reception and subsequent clock activity changes that state again. The molecular mediator of the tNMR result is left specific to that experiment. [[ref:wang2012_redox_scn|Wang 2012]]; [[ref:thoeni2024_tnmr_clock|Thoeni 2024]].",
        "In humans, mistimed sleep altered the temporal organisation of glucocorticoid-signalling transcripts while the circulating cortisol rhythm persisted. The 2014 study and 2022 reanalysis belong to the same dataset family. BERM consequently represents coordination through the appropriate phase differences between tissues, with hormone concentration, receptor readiness and timing evaluated together. [[ref:archer2014_transcriptome|Archer 2014]]; [[ref:archer2022_glucocorticoid_timing|Archer 2022]].",
      ],
    },
    reproduction: {
      title: "Local gates, waiting time and realised family size",
      paragraphs: [
        "A clock-gene deletion in steroidogenic mouse cells preserved ovulation while sharply impairing implantation; progesterone treatment and ovarian transplantation located a functional ovarian gate. BERM represents such stages as conditional successes, so the same defect is counted once along a reproductive route. [[ref:liu2014|Liu 2014]].",
        "Individual differences then matter at the couple level. A distribution of per-cycle probabilities can produce a longer waiting-time tail than a uniform population with the same mean probability. European cohort analyses link waiting at least a year with smaller realised family size. This provides an empirical anchor for the transition from prolonged waiting to parity progression; a field-related shift in the underlying distribution remains the BERM synthesis. [[ref:joffe2009_ttp_family_size|Joffe 2009]].",
      ],
    },
    dualLock: {
      title: "Extending the two locks through tissue timing",
      paragraphs: [
        "The endocrine gates in this article can be specified by hormone availability, receptor readiness and their temporal overlap. CRY proteins regulate glucocorticoid-receptor transcriptional activity, providing a direct connection between clock state and hormonal gain. [[ref:lamia2011_cry_glucocorticoid|Lamia 2011]].",
        "Human sleep-misalignment data further show that a circulating cortisol rhythm may remain intact while its target gene network changes timing. The extended Dual Lock hypothesis therefore follows functional tissue response through the day: a similar blood hormone profile can meet a differently timed receiving network. The illustrative timing model makes that interaction explicit without assigning an environmental field effect size. [[ref:archer2022_glucocorticoid_timing|Archer 2022]].",
      ],
    },
    civilization: {
      title: "From biological state to accumulated cooperation",
      paragraphs: [
        "The biological-to-institutional route can be resolved into repeated encounters: the availability of a partner, the probability of successful interaction and the overlap of their active windows. Biological changes in sleep, attention, motivation or reproductive function enter these components before they aggregate into relationships, care and cooperation.",
        "BERM treats institutions as capacities maintained and accumulated through these interactions: skills are transmitted, care is delivered and infrastructure is maintained. Network feedback and the slow loss or replenishment of stored capacity provide the bridge from individual physiology to a longer civilizational timescale. Sleep-loss and cooperation experiments anchor changes in interaction and their propagation to subsequent partners. The coordination synthesis specifies this aggregation, while leaving network coefficients specific to the population studied. [[ref:bensimon2018_sleep_social|Ben Simon & Walker 2018]]; [[ref:fowler2010_cooperation_cascades|Fowler & Christakis 2010]].",
      ],
    },
  },
  fi: {
    link: "Tutustu biologisen koordinaation malliin →",
    model: {
      title: "Biologinen koordinaatio: vastaanottavan kudoksen tila ratkaisee",
      paragraphs: [
        "BERM kuvaa vastaanottavan kudoksen orientaation, kofaktorit, redox-tilan, hormonivasteen, biologisen vaiheen ja palautumishistorian osana fysikaalisen syötteen vastetta. Lähtökohtana on Lindgrenin vuoden 2025 tensorimuotoilu. Nimetty tilariippuvainen biologinen kytkentä yhdistää geometrisen muutoksen reseptoritoimintaan. FieldState tuottaa havaintoja tämän fysikaalisen tilan arviointiin.",
        "Ketju jatkuu kemiallisesta muistista redox- ja kellotoimintaan, hormonin ja kudoksen ajoitukseen, lisääntymisen toiminnallisiin portteihin sekä onnistuneisiin kohtaamisiin ja populaatiojakaumiin. Osakokeet ankkuroivat siirtymiä; niiden yhdistäminen yhteiseksi BERM-reitiksi on mallisynteesi. Koordinaation tarkastelussa näkyy, miten ajoitus, palautuminen ja yksilöerot muuttavat tulosta havainnollistavilla oletuksilla.",
      ],
    },
    nutrition: {
      title: "Ravitsemuksellisesta CRY-portista hormonivasteeseen",
      paragraphs: [
        "BERM yhdistää tässä kuvatut ravitsemukselliset vastaanotinmekanismit CRY:n tunnettuihin hormonireitteihin. CRY1 ja CRY2 vuorovaikuttavat glukokortikoidireseptorin kanssa ja säätelevät sen geenivastetta; maksan kryptokromit puolestaan vaimentavat glukagonin G-proteiini–cAMP-signalointia. Näin kellotila, stressihormonin vaikutus ja aineenvaihdunta liittyvät toisiinsa suorin molekyyliyhteyksin. [[ref:lamia2011_cry_glucocorticoid|Lamia 2011]]; [[ref:zhang2010_cry_camp|Zhang 2010]].",
        "Ateria-aika on toinen ravitsemuksellinen sisääntulo. Aterioiden viivästys siirsi glukoosin ja rasvakudoksen PER2:n rytmejä eri verran samalla, kun melatoniinin ja kortisolin ajoitus säilyi. BERM kuljettaa ravitsemustilan sekä reseptorivalmiuteen että kudoksen vaiheeseen. Niiden yhteisvaikutus kenttävasteeseen on mallin ehdollinen jatko. [[ref:wehrens2017_meal_timing|Wehrens 2017]].",
      ],
    },
    circadian: {
      title: "Kellosignaali ja sitä vastaanottava verkosto",
      paragraphs: [
        "Redox-tila voi muuttaa keskuskellon hermosolujen sähköistä herkkyyttä kaliumkanavien kautta. Hiiren fibroblastien määritellyssä tNMR-protokollassa käsittelyn ajoitus ja glukokortikoidiesikäsittely muuttivat kellovasteen eri ominaisuuksia. Havainnot ankkuroivat palautemallia, jossa biologinen tila muuttaa vastaanottoa ja myöhempi kellotoiminta muuttaa tilaa uudelleen. tNMR-tuloksen molekyylivälittäjä säilyy kyseisen kokeen omana kysymyksenä. [[ref:wang2012_redox_scn|Wang 2012]]; [[ref:thoeni2024_tnmr_clock|Thoeni 2024]].",
        "Ihmisellä väärään biologiseen vaiheeseen ajoitettu uni muutti glukokortikoidisignaloinnin geenien ajallista toimintaa veren kortisolirytmin säilyessä. Vuoden 2014 tutkimus ja vuoden 2022 uudelleenanalyysi kuuluvat samaan aineistoperheeseen. BERM esittää koordinaation kudosten tarkoituksenmukaisina vaihe-eroina ja tarkastelee yhdessä hormonipitoisuutta, vastaanottovalmiutta ja ajoitusta. [[ref:archer2014_transcriptome|Archer 2014]]; [[ref:archer2022_glucocorticoid_timing|Archer 2022]].",
      ],
    },
    reproduction: {
      title: "Paikalliset portit, raskausodotus ja toteutunut lapsiluku",
      paragraphs: [
        "Kellogeenin poisto hiiren steroidogeenisistä soluista säilytti ovulaation mutta heikensi voimakkaasti implantaatiota. Progesteronikäsittely ja munasarjasiirrot paikansivat munasarjan toiminnallisen portin. BERM kuvaa tällaiset vaiheet ehdollisina onnistumisina ja laskee saman puutteen vain kerran lisääntymisreitin varrella. [[ref:liu2014|Liu 2014]].",
        "Yksilöerot vaikuttavat edelleen paritasolla. Kiertokohtaisten todennäköisyyksien jakauma voi tuottaa pidemmän odotusajan hännän kuin tasainen populaatio, jolla on sama keskitodennäköisyys. Eurooppalaisissa kohorttianalyyseissä vähintään vuoden odotus liittyi pienempään toteutuneeseen perhekokoon. Se ankkuroi pitkän odotuksen ja seuraavaan lapsilukuun siirtymisen yhteyttä; kenttään liittyvä jakaumamuutos on BERM:n synteesi. [[ref:joffe2009_ttp_family_size|Joffe 2009]].",
      ],
    },
    dualLock: {
      title: "Kahden lukon laajennus kudosten ajoitukseen",
      paragraphs: [
        "Artikkelin hormonitoiminnan portit voidaan täsmentää hormonin saatavuudeksi, reseptorivalmiudeksi ja niiden ajalliseksi yhteensopivuudeksi. CRY-proteiinit säätelevät glukokortikoidireseptorin geenivastetta ja yhdistävät kellotilan suoraan hormonivaikutuksen voimakkuuteen. [[ref:lamia2011_cry_glucocorticoid|Lamia 2011]].",
        "Ihmisten unirytmiaineisto osoittaa lisäksi, että veren kortisolirytmi voi säilyä samalla, kun sen kohdegeeniverkoston ajoitus muuttuu. Laajennettu Dual Lock -hypoteesi seuraa siksi kudoksen toiminnallista vastetta läpi vuorokauden: samankaltainen veren hormonikäyrä voi kohdata eri tavoin ajoittuneen vastaanottajaverkoston. Havainnollistava ajoitusmalli tekee tämän yhteisvaikutuksen näkyväksi ilman ympäristökentän vaikutuskoon oletusta. [[ref:archer2022_glucocorticoid_timing|Archer 2022]].",
      ],
    },
    civilization: {
      title: "Biologisesta tilasta kertyvään yhteistyöhön",
      paragraphs: [
        "Biologiasta instituutioihin kulkeva reitti voidaan purkaa toistuviin kohtaamisiin: kumppanin saatavuuteen, vuorovaikutuksen onnistumistodennäköisyyteen ja osapuolten aktiivisten jaksojen päällekkäisyyteen. Unen, tarkkaavaisuuden, motivaation tai lisääntymistoiminnan biologiset muutokset vaikuttavat näihin osiin ennen kertautumista ihmissuhteiksi, hoivaksi ja yhteistyöksi.",
        "BERM käsittelee instituutioita näissä vuorovaikutuksissa ylläpidettävinä ja kertyvinä kykyinä: osaaminen siirtyy, hoiva toteutuu ja infrastruktuuria ylläpidetään. Verkoston palaute sekä varastoituneen kapasiteetin hidas menetys tai uusiutuminen yhdistävät yksilöfysiologian pidempään sivilisaation aikaskaalaan. Univaje- ja yhteistyökokeet ankkuroivat vuorovaikutuksen muutoksia ja niiden välittymistä myöhemmille kumppaneille. Koordinaatiosynteesi täsmentää aggregoinnin; verkostokertoimet määräytyvät tutkittavan populaation mukaan. [[ref:bensimon2018_sleep_social|Ben Simon ja Walker 2018]]; [[ref:fowler2010_cooperation_cascades|Fowler ja Christakis 2010]].",
      ],
    },
  },
  ja: {}, fr: {}, ko: {},
} as const;

type Context = "model" | "nutrition" | "circadian" | "reproduction" | "dualLock" | "civilization";

export function BiologicalCoordinationContext({ locale, context }: { locale: string; context: Context }) {
  const d = pickCopy(COPY, locale) as typeof COPY.en;
  const content = d[context];
  return (
    <section id="biological-coordination" className="my-12 scroll-mt-24 border-y border-accent/25 py-7">
      <TranslationNotice copy={COPY} locale={locale} />
      <h2 className="editorial-section-heading mb-4">{content.title}</h2>
      <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-foreground-muted">
        {content.paragraphs.map((paragraph, index) => (
          <p key={index}><InlineReferenceText text={paragraph} locale={locale} /></p>
        ))}
      </div>
      <Link href={`/${locale}/model/biological-coordination`} className="mt-5 inline-block text-sm font-medium text-accent hover:underline">
        {d.link}
      </Link>
    </section>
  );
}
