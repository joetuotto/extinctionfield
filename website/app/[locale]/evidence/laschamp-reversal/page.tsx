import type { Metadata } from "next";
import Link from "next/link";
import { Compass } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { StudyCitation } from "@/components/StudyCitation";
import { pickCopy } from "@/lib/i18n";

type CopyShape = typeof COPY.en;

const COPY = {
  en: {
    title: "The Laschamp Excursion",
    subtitle:
      "When Earth's magnetic field collapsed 42,000 years ago, the biological consequences validate BERM's magnetic susceptibility prediction.",
    backLink: "← Back to Evidence",

    epistemicTitle: "Paleomagnetic correlation, not proven causation",
    epistemicText:
      "The Laschamp excursion is well-dated in the paleomagnetic record. The ecological consequences — megafauna extinctions, Neanderthal disappearance — are temporally correlated. BERM's interpretation via CRY/RPM is a hypothesis; the paleontological record cannot distinguish between competing extinction drivers.",

    whatKicker: "THE EVENT",
    whatTitle: "When the magnetic shield collapsed",
    whatParagraphs: [
      "Approximately 42,000 years ago, Earth's magnetic field strength dropped to less than 6% of its current value during the Laschamp geomagnetic excursion. The event lasted roughly 800 years, with the minimum field persisting for approximately 250 years.",
      "Cooper et al. (2021) dated this event precisely using radiocarbon calibration from New Zealand kauri trees (Agathis australis), some of the longest-lived trees on Earth. Their analysis revealed that the field minimum coincided with a cascade of environmental and ecological changes worldwide.",
      "The authors named this period the 'Adams Transitional Geomagnetic Event' — a nod to Douglas Adams, since 42 is 'the answer to the ultimate question of life, the universe, and everything.'",
    ],

    ecoKicker: "ECOLOGICAL CONSEQUENCES",
    ecoTitle: "A cascade of extinctions and upheaval",
    ecoParagraphs: [
      "The Laschamp field minimum shows temporal coincidence with multiple major ecological events: the final extinction of Australian megafauna, the disappearance of Neanderthals from mainland Europe, dramatic vegetation shifts in Australia and globally, and a significant expansion of cave art — possibly driven by UV-induced shelter-seeking behavior.",
      "The ozone layer was significantly depleted during the field minimum. With the magnetic shield at 6% strength, cosmic radiation and solar particle flux reached the surface largely unimpeded, driving increased UV-B exposure that would have stressed surface-dwelling organisms.",
      "These consequences have conventionally been attributed to increased radiation exposure alone. BERM proposes an additional, complementary mechanism.",
    ],

    bermKicker: "BERM INTERPRETATION",
    bermTitle: "Two simultaneous disruptions",
    bermParagraphs: [
      "From BERM's perspective, the Laschamp excursion is a natural experiment in what happens when B_geo → 0 for an extended period. The spin susceptibility function χ_B is peaked at B_ext/B_geo ≈ 1 — when the reference field vanishes, cryptochrome's radical pair mechanism loses its calibration.",
      "When B_geo collapses, two things happen simultaneously. First, the natural EM shield weakens, allowing increased cosmic and UV radiation — this is the conventional explanation. Second, the CRY/RPM radical pair mechanism loses its reference field, disrupting cryptochrome function across all organisms that depend on it.",
      "The second effect is BERM-specific: sustained disruption of circadian timing, melatonin synthesis, and reproductive regulation across all CRY-dependent organisms. This predicts that CRY-dependent species should be disproportionately affected compared to CRY-independent ones.",
      "Strikingly, modern ISS astronaut data shows the same physiological signature at the individual level — circadian delay, melatonin decline, immune suppression — confirming that hypomagnetic conditions produce exactly the CRY/RPM disruption BERM predicts.",
    ],

    reproKicker: "REPRODUCTIVE CONNECTION",
    reproTitle: "Multi-generational magnetic stress",
    reproParagraphs: [
      "Extended B_geo collapse means sustained CRY/RPM disruption, which means chronic melatonin suppression. Melatonin is both a master antioxidant and a key reproductive regulator — its chronic absence would compound UV-driven oxidative damage with hormonal dysregulation.",
      "Multi-generational exposure to near-zero geomagnetic field represents cumulative reproductive stress across species. This offers a complementary explanation to UV and cosmic ray damage for the observed extinction clustering — not just acute radiation harm, but sustained reproductive impairment through the magnetic sense pathway.",
    ],

    falsTitle: "Falsification criteria",
    falsParagraphs: [
      "If BERM's interpretation is correct, organisms with CRY-independent circadian systems should show less Laschamp-coincident stress in the fossil record. Paleogenomic analysis of Laschamp-era specimens should reveal selection signatures on CRY and clock genes.",
      "The pattern should repeat at other geomagnetic excursions — the Mono Lake event (~34 ka), the Blake event (~120 ka), and the Brunhes-Matuyama reversal (~780 ka). Each should show ecological disruption correlated with field strength, not merely with radiation proxies.",
    ],

    refLabel: "Cooper A et al. (2021) A global environmental crisis 42,000 years ago. Science 371:811–818",
  },
  fi: {
    title: "Laschamp-eksursio",
    subtitle:
      "Kun Maan magneettikenttä romahti 42 000 vuotta sitten, biologiset seuraukset validoivat BERM:n magneettisen suskeptibiliteetin ennusteen.",
    backLink: "← Takaisin todisteisiin",

    epistemicTitle: "Paleomag­neettinen korrelaatio, ei todistettu kausaliteetti",
    epistemicText:
      "Laschamp-eksursio on hyvin ajoitettu paleomagneettisessa aineistossa. Ekologiset seuraukset — megafaunan sukupuutot, neandertalien katoaminen — ovat ajallisesti korreloituja. BERM:n tulkinta CRY/RPM-reitin kautta on hypoteesi; paleontologinen aineisto ei voi erottaa kilpailevia sukupuuttomekanismeja.",

    whatKicker: "TAPAHTUMA",
    whatTitle: "Kun magneettinen suoja romahti",
    whatParagraphs: [
      "Noin 42 000 vuotta sitten Maan magneettikentän voimakkuus laski alle 6 prosenttiin nykyisestä tasosta Laschamp-geomagneettisen eksursion aikana. Tapahtuma kesti noin 800 vuotta, ja kenttäminimi säilyi noin 250 vuotta.",
      "Cooper ym. (2021) ajoittivat tapahtuman tarkasti käyttäen radiohiilikalibointia Uuden-Seelannin kauripuista (Agathis australis), jotka ovat maailman pitkäikäisimpiä puita. Heidän analyysinsä paljasti, että kenttäminimi osui samanaikaisesti ympäristö- ja ekologisten muutosten ketjuun maailmanlaajuisesti.",
      "Kirjoittajat nimesivät tämän ajanjakson 'Adamsin siirtymävaiheen geomagneettiseksi tapahtumaksi' — viitaten Douglas Adamsiin, koska 42 on 'vastaus perimmäiseen kysymykseen elämästä, maailmankaikkeudesta ja kaikesta'.",
    ],

    ecoKicker: "EKOLOGISET SEURAUKSET",
    ecoTitle: "Sukupuuttojen ja mullistusten ketju",
    ecoParagraphs: [
      "Laschamp-kenttäminimi osuu ajallisesti yhteen useiden merkittävien ekologisten tapahtumien kanssa: Australian megafaunan lopullinen sukupuutto, neandertalien katoaminen Manner-Euroopasta, dramaattiset kasvillisuusmuutokset Australiassa ja globaalisti sekä luolamaalausten merkittävä lisääntyminen — mahdollisesti UV-säteilyn aiheuttaman suojanhaun seurauksena.",
      "Otsonikerros heikkeni merkittävästi kenttäminimin aikana. Magneettisen suojan ollessa 6 prosentin tasolla kosminen säteily ja aurinkopartikkelivuo pääsivät maanpinnalle lähes esteettä, lisäten UV-B-altistusta, joka stressasi maanpinnalla eläviä organismeja.",
      "Nämä seuraukset on perinteisesti selitetty pelkästään lisääntyneellä säteilyaltistuksella. BERM ehdottaa lisäksi täydentävää mekanismia.",
    ],

    bermKicker: "BERM-TULKINTA",
    bermTitle: "Kaksi samanaikaista häiriötä",
    bermParagraphs: [
      "BERM:n näkökulmasta Laschamp-eksursio on luonnollinen koe siitä, mitä tapahtuu kun B_geo → 0 pitkäksi ajaksi. Spin-suskeptibiliteettifunktio χ_B on huipussaan kun B_ext/B_geo ≈ 1 — kun viitekenttä katoaa, kryptokromin radikaalipari-mekanismi menettää kalibrointinsa.",
      "Kun B_geo romahtaa, kaksi asiaa tapahtuu samanaikaisesti. Ensinnäkin luonnollinen EM-suoja heikkenee, päästäen lisääntyneen kosmisen ja UV-säteilyn läpi — tämä on perinteinen selitys. Toiseksi CRY/RPM-radikaalipari-mekanismi menettää viitekenttänsä, häiriten kryptokromin toimintaa kaikissa siitä riippuvaisissa organismeissa.",
      "Jälkimmäinen vaikutus on BERM-spesifinen: sirkadiaanisen ajoituksen, melatoniinin synteesin ja lisääntymissäätelyn jatkuva häiriö kaikissa CRY-riippuvaisissa organismeissa. Tämä ennustaa, että CRY-riippuvaisten lajien pitäisi kärsiä suhteettomasti verrattuna CRY-riippumattomiin.",
      "Silmiinpistävästi modernit ISS-astronauttitiedot osoittavat saman fysiologisen jäljen yksilötasolla — sirkadiaaninen viive, melatoniinin lasku, immuunisuppressio — vahvistaen, että hypomagneettinen ympäristö tuottaa juuri sen CRY/RPM-häiriön, jonka BERM ennustaa.",
    ],

    reproKicker: "LISÄÄNTYMISYHTEYS",
    reproTitle: "Monisukupolvinen magneettinen stressi",
    reproParagraphs: [
      "Pitkittynyt B_geo-romahdus tarkoittaa jatkuvaa CRY/RPM-häiriötä, mikä tarkoittaa kroonista melatoniinin puutetta. Melatoniini on sekä pääantioksidantti että keskeinen lisääntymissäätelijä — sen krooninen puuttuminen yhdistäisi UV-peräisen oksidatiivisen vaurion hormonaaliseen säätelyhäiriöön.",
      "Monisukupolvinen altistuminen lähes nollatason geomagneettiselle kentälle merkitsee kumulatiivista lisääntymisstressiä lajien tasolla. Tämä tarjoaa täydentävän selityksen UV- ja kosmisen säteilyn vaurioille havaittuun sukupuuttokeskittymään — ei pelkästään akuutti säteilyvaurio, vaan jatkuva lisääntymiskyvyn heikkeneminen magneettisen aistireitin kautta.",
    ],

    falsTitle: "Falsifikaatiokriteerit",
    falsParagraphs: [
      "Jos BERM:n tulkinta on oikea, organismien, joilla on CRY-riippumaton sirkadiaaninen järjestelmä, pitäisi osoittaa vähemmän Laschamp-samanaikaista stressiä fossiilikertumassa. Laschamp-aikakauden näytteiden paleogenomisen analyysin pitäisi paljastaa selektiosignaatuureja CRY- ja kellogeeneissä.",
      "Mallin pitäisi toistua muissa geomagneettisissa eksursioissa — Mono Lake -tapahtuma (~34 ka), Blake-tapahtuma (~120 ka) ja Brunhes-Matuyaman reverssaali (~780 ka). Jokaisen pitäisi osoittaa ekologista häiriötä korreloituna kenttävoimakkuuteen, ei pelkästään säteilyproksi-indikaattoreihin.",
    ],

    refLabel: "Cooper A et al. (2021) A global environmental crisis 42,000 years ago. Science 371:811–818",
  },
  ja: {
    title: "ラシャンプ地磁気逆転",
    subtitle:
      "42,000年前に地球の磁場が崩壊したとき、生物学的影響がBERMの磁気感受性予測を検証する。",
    backLink: "← Back to Evidence",
    epistemicTitle: "Paleomagnetic correlation",
    epistemicText:
      "The Laschamp excursion is well-dated in the paleomagnetic record. The ecological consequences are temporally correlated. BERM's interpretation via CRY/RPM is a hypothesis.",
    whatKicker: "THE EVENT", whatTitle: "When the magnetic shield collapsed",
    whatParagraphs: [
      "Approximately 42,000 years ago, Earth's magnetic field strength dropped to less than 6% of its current value during the Laschamp geomagnetic excursion. The event lasted roughly 800 years, with the minimum field persisting for approximately 250 years.",
      "Cooper et al. (2021) dated this event precisely using radiocarbon calibration from New Zealand kauri trees (Agathis australis).",
      "The authors named this period the 'Adams Transitional Geomagnetic Event' — a nod to Douglas Adams, since 42 is 'the answer to the ultimate question.'",
    ],
    ecoKicker: "ECOLOGICAL CONSEQUENCES", ecoTitle: "A cascade of extinctions",
    ecoParagraphs: [
      "The Laschamp field minimum coincides with the final extinction of Australian megafauna, the disappearance of Neanderthals from Europe, dramatic vegetation shifts, and expansion of cave art.",
      "The ozone layer was significantly depleted during the field minimum due to increased cosmic radiation.",
      "These consequences have conventionally been attributed to increased radiation. BERM proposes a complementary mechanism.",
    ],
    bermKicker: "BERM INTERPRETATION", bermTitle: "Two simultaneous disruptions",
    bermParagraphs: [
      "From BERM's perspective, the Laschamp excursion is a natural experiment in what happens when B_geo → 0.",
      "When B_geo collapses, the natural EM shield weakens AND the CRY/RPM radical pair mechanism loses its reference field.",
      "The second effect is BERM-specific: sustained disruption of circadian timing, melatonin synthesis, and reproductive regulation.",
      "Modern ISS astronaut data shows the same physiological signature — confirming hypomagnetic CRY/RPM disruption.",
    ],
    reproKicker: "REPRODUCTIVE CONNECTION", reproTitle: "Multi-generational magnetic stress",
    reproParagraphs: [
      "Extended B_geo collapse means sustained CRY/RPM disruption and chronic melatonin suppression.",
      "Multi-generational exposure to near-zero geomagnetic field represents cumulative reproductive stress across species.",
    ],
    falsTitle: "Falsification criteria",
    falsParagraphs: [
      "CRY-independent organisms should show less Laschamp-coincident stress. Paleogenomic analysis should reveal CRY gene selection signatures.",
      "The pattern should repeat at other geomagnetic excursions (Mono Lake, Blake, Brunhes-Matuyama).",
    ],
    refLabel: "Cooper A et al. (2021) Science 371:811–818",
  },
  fr: {
    title: "L'excursion de Laschamp",
    subtitle:
      "Quand le champ magnétique terrestre s'est effondré il y a 42 000 ans, les conséquences biologiques valident la prédiction de susceptibilité magnétique de BERM.",
    backLink: "← Back to Evidence",
    epistemicTitle: "Corrélation paléomagnétique",
    epistemicText:
      "The Laschamp excursion is well-dated in the paleomagnetic record. The ecological consequences are temporally correlated. BERM's interpretation via CRY/RPM is a hypothesis.",
    whatKicker: "THE EVENT", whatTitle: "When the magnetic shield collapsed",
    whatParagraphs: [
      "Approximately 42,000 years ago, Earth's magnetic field strength dropped to less than 6% of its current value during the Laschamp geomagnetic excursion.",
      "Cooper et al. (2021) dated this event precisely using radiocarbon calibration from New Zealand kauri trees.",
      "The authors named this period the 'Adams Transitional Geomagnetic Event.'",
    ],
    ecoKicker: "ECOLOGICAL CONSEQUENCES", ecoTitle: "A cascade of extinctions",
    ecoParagraphs: [
      "The Laschamp field minimum coincides with megafauna extinctions, Neanderthal disappearance, vegetation shifts, and expansion of cave art.",
      "The ozone layer was significantly depleted during the field minimum.",
      "BERM proposes a complementary mechanism beyond radiation.",
    ],
    bermKicker: "BERM INTERPRETATION", bermTitle: "Two simultaneous disruptions",
    bermParagraphs: [
      "From BERM's perspective, the Laschamp excursion tests what happens when B_geo → 0.",
      "When B_geo collapses, the EM shield weakens AND CRY/RPM loses its reference field.",
      "The second effect disrupts circadian timing, melatonin, and reproduction across CRY-dependent organisms.",
      "ISS astronaut data confirms the same physiological signature.",
    ],
    reproKicker: "REPRODUCTIVE CONNECTION", reproTitle: "Multi-generational magnetic stress",
    reproParagraphs: [
      "Extended B_geo collapse means sustained CRY/RPM disruption and chronic melatonin suppression.",
      "Multi-generational near-zero field represents cumulative reproductive stress across species.",
    ],
    falsTitle: "Falsification criteria",
    falsParagraphs: [
      "CRY-independent organisms should show less Laschamp-coincident stress.",
      "The pattern should repeat at other geomagnetic excursions.",
    ],
    refLabel: "Cooper A et al. (2021) Science 371:811–818",
  },
  ko: {
    title: "라샹프 지자기 역전",
    subtitle:
      "42,000년 전 지구 자기장이 붕괴했을 때, 생물학적 결과가 BERM의 자기 감수성 예측을 검증한다.",
    backLink: "← Back to Evidence",
    epistemicTitle: "Paleomagnetic correlation",
    epistemicText:
      "The Laschamp excursion is well-dated. The ecological consequences are temporally correlated. BERM's CRY/RPM interpretation is a hypothesis.",
    whatKicker: "THE EVENT", whatTitle: "When the magnetic shield collapsed",
    whatParagraphs: [
      "Approximately 42,000 years ago, Earth's magnetic field dropped to less than 6% of its current value.",
      "Cooper et al. (2021) dated this using New Zealand kauri trees.",
      "They named this the 'Adams Transitional Geomagnetic Event.'",
    ],
    ecoKicker: "ECOLOGICAL CONSEQUENCES", ecoTitle: "A cascade of extinctions",
    ecoParagraphs: [
      "The field minimum coincides with megafauna extinctions, Neanderthal disappearance, and vegetation shifts.",
      "The ozone layer was significantly depleted.",
      "BERM proposes a complementary mechanism.",
    ],
    bermKicker: "BERM INTERPRETATION", bermTitle: "Two simultaneous disruptions",
    bermParagraphs: [
      "The Laschamp excursion tests what happens when B_geo → 0.",
      "Both the EM shield and CRY/RPM reference field collapse simultaneously.",
      "Sustained circadian, melatonin, and reproductive disruption across CRY-dependent organisms.",
      "ISS astronaut data confirms the same signature.",
    ],
    reproKicker: "REPRODUCTIVE CONNECTION", reproTitle: "Multi-generational stress",
    reproParagraphs: [
      "Extended B_geo collapse means sustained CRY/RPM disruption.",
      "Multi-generational near-zero field is cumulative reproductive stress.",
    ],
    falsTitle: "Falsification criteria",
    falsParagraphs: [
      "CRY-independent organisms should show less Laschamp stress.",
      "The pattern should repeat at other excursions.",
    ],
    refLabel: "Cooper A et al. (2021) Science 371:811–818",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function LaschampReversalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale) as CopyShape;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href={`/${locale}/evidence`}
        className="text-sm text-accent hover:underline inline-block mb-8"
      >
        {d.backLink}
      </Link>

      <PageHeader icon={Compass} title={d.title} subtitle={d.subtitle} />

      {/* Epistemic caution */}
      <CautionBox locale={locale}>
        <p className="font-semibold text-foreground mb-1">{d.epistemicTitle}</p>
        <p>{d.epistemicText}</p>
      </CautionBox>

      {/* The Event */}
      <section className="mb-12 border-t editorial-rule pt-6">
        <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-2">
          {d.whatKicker}
        </p>
        <h2 className="editorial-section-heading mb-3">{d.whatTitle}</h2>
        <div className="space-y-4 text-foreground-muted leading-relaxed">
          {d.whatParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-4">
          <StudyCitation referenceId="cooper2021_laschamp" label={d.refLabel} locale={locale} />
        </div>
      </section>

      {/* Ecological Consequences */}
      <section className="mb-12 border-t editorial-rule pt-6">
        <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-2">
          {d.ecoKicker}
        </p>
        <h2 className="editorial-section-heading mb-3">{d.ecoTitle}</h2>
        <div className="space-y-4 text-foreground-muted leading-relaxed">
          {d.ecoParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* BERM Interpretation */}
      <section className="mb-12 border-t editorial-rule pt-6">
        <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-2">
          {d.bermKicker}
        </p>
        <h2 className="editorial-section-heading mb-3">{d.bermTitle}</h2>
        <div className="space-y-4 text-foreground-muted leading-relaxed">
          {d.bermParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Reproductive Connection */}
      <section className="mb-12 border-t editorial-rule pt-6">
        <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-2">
          {d.reproKicker}
        </p>
        <h2 className="editorial-section-heading mb-3">{d.reproTitle}</h2>
        <div className="space-y-4 text-foreground-muted leading-relaxed">
          {d.reproParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Falsification */}
      <section className="mb-12 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.falsTitle}</h2>
        <div className="space-y-4 text-foreground-muted leading-relaxed">
          {d.falsParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
