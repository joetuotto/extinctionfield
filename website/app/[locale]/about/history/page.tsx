import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

const t = {
  en: {
    title: "Historical context",
    subtitle:
      "The historical background of bioelectromagnetic research: Becker, Frey, and the US Navy.",
    intro:
      "The biological effects of electromagnetic fields are not a new discovery. They have been known, studied, and documented for over six decades — first in military research laboratories, then in universities, and ultimately marginalized institutionally in a way that is itself a history worth examining.",
    sections: [
      {
        heading: "1896–1950: Early observations",
        paragraphs: [
          "The biological effects of electromagnetic fields were observed as early as the late 19th century. French physicist Jacques-Arsène d'Arsonval described the magnetophosphene phenomenon in 1896: alternating magnetic fields produced visible light flashes in the visual field of test subjects. This demonstrated that neural tissue responds to electromagnetic fields non-thermally — the effect was not caused by tissue heating but by direct interaction with the nervous system's ion channels.",
          "During World War II, the rapid development of radar technology brought the first observations of biological effects from high-power microwave radiation. Radar operators reported sensations of warmth, headaches, and visual disturbances. These observations led to research programs in both the United States and the Soviet Union, the results of which were largely classified.",
        ],
      },
      {
        heading: "1950–1965: The Cold War and the explosive growth of radar systems",
        paragraphs: [
          "During the Cold War, an unprecedented network of air surveillance radars was built across North America and Europe. The Pinetree Line (33 stations, 1951), Mid-Canada Line (90+ stations, 1957), and DEW Line (63 stations, 1957) formed an arctic radar wall from Alaska to Greenland. In 1961, the BMEWS system (Ballistic Missile Early Warning System) introduced three mega-stations whose AN/FPS-27 radars produced 15 megawatts of peak power in the S-band (2.3–2.7 GHz) — precisely the same frequency range used by modern Wi-Fi routers.",
          "Simultaneously, Nike Ajax and Nike Hercules anti-aircraft battery stations (over 200 stations, 1954–1974) were placed in the suburban areas of major American cities. Their LOPAR search radars produced over a megawatt of peak power. Tens of millions of people lived near these stations for two decades.",
          "In NATO countries, the NADGE system (NATO Air Defence Ground Environment) covered hundreds of radar stations from Norway to Turkey. Tropospheric scatter communication systems — White Alice (80 stations in Alaska, 900 MHz / 2 GHz, 10–75 kW) and ACE High (49 stations in NATO countries) — radiated high-power RF energy in rural and mountainous areas, precisely the habitats where sentinel species (frogs, birds, insects) lived.",
          'The Soviet Union built equivalent systems. In 1976, the Duga radar ("Russian Woodpecker") began operations in Chernobyl: a 10-megawatt over-the-horizon radar that disrupted HF radio traffic globally and whose signal was heard on radios worldwide as a steady tapping sound.',
          "By 1965, the Earth was encircled by a belt of radar radiation that had not existed 15 years earlier. The temporal coincidence between this period and the onset of sentinel species population decline is one of the BERM model's central observations.",
        ],
      },
      {
        heading: "1961: Frey's auditory effect",
        paragraphs: [
          'Allan Frey published a study in 1961 demonstrating that humans could "hear" pulsed microwave radiation — clicks and buzzing, without hearing aids or any obvious mechanism. This was the first peer-reviewed demonstration that RF electromagnetic fields produce a direct neurological response at non-thermal intensity. Frey\'s work also showed that the blood-brain barrier (BBB) opened transiently during RF exposure — a finding confirmed by Salford in 2003 with GSM-900 signals.',
          "Frey's research attracted interest from both the scientific community and intelligence agencies. The US Department of Defense (DoD) funded follow-up studies, some of which were classified.",
        ],
      },
      {
        heading: "1960–1972: Becker's bioelectric revolution",
        paragraphs: [
          "Robert O. Becker, an orthopedic surgeon and researcher at the Veterans Administration hospital in Syracuse, made a series of breakthroughs in the field of bioelectricity during the 1960s. He demonstrated that salamander limb regeneration is directed by nanoampere-level direct currents (DC): a negative current at the neuroepidermal junction triggers dedifferentiation and regeneration. The current had a precise threshold — slightly more did not work. This was the first demonstration of the existence of a bioelectric code in mammalian tissues.",
          "Becker connected his observations to electromagnetic field research and proposed that external EMF fields can disrupt the body's internal bioelectric signals. He documented several cases, the most notable being the Fort Rucker case: 17 clubfoot births in 16 months at a military hospital maternity ward (expected value approximately 4), in a high-radar-power military base. When Becker requested radiation maps of the radar stations to study the effect, the Army refused citing military classification.",
          "Becker's research funding was cut in the 1970s. His laboratory was closed. He published his findings in two books — The Body Electric (1985) and Cross Currents (1990) — which remained outside the scientific mainstream but documented extensive experimental evidence.",
        ],
      },
      {
        heading: "1972: The Moscow signal",
        paragraphs: [
          "From 1953 onwards — possibly earlier — the Soviet Union directed a low-intensity microwave signal at the US Embassy in Moscow at frequencies of 0.5–18 GHz, at an intensity of 5–15 µW/cm² (well below current safety limits). When the exposure was revealed in the 1970s, embassy personnel were found to have elevated cancer rates, leukemia incidence, and neurological symptoms. The US State Department did not publish all research results.",
          "The case is significant for two reasons. It demonstrated that state-level actors took the biological effects of RF seriously — more seriously than was publicly acknowledged. And it showed that long-term, low-dose exposure can produce health effects, even when instantaneous exposure is below the safety limit.",
        ],
      },
      {
        heading: "1975–1981: Adey's calcium efflux",
        paragraphs: [
          'W. Ross Adey demonstrated in the 1970s–1980s that weak electromagnetic fields at certain frequencies and intensities cause calcium efflux from brain tissue — calcium ions flow out of cells. The effect was a "window phenomenon": it occurred only at certain frequencies and intensities, not all. This was the first clear demonstration of a nonlinear, non-thermal biological response to electromagnetic fields.',
          "Adey's results were replicated in several independent laboratories — and they form the foundation for the current VGCC mechanism (voltage-gated calcium channels). Nevertheless, Adey was marginalized in the academic community in the 1990s, and his research line withered due to lack of funding.",
        ],
      },
      {
        heading: "1984: US Air Force chronic exposure study",
        paragraphs: [
          "Arthur Guy conducted one of the longest controlled animal experiments on RF exposure, commissioned by the US Air Force. 200 rats were exposed to 2.45 GHz radiation (0.5 mW/cm²) for 25 months. Result: exposed rats developed 18 tumors compared to 5 in the control group (3.6-fold risk), particularly in endocrine organs (pituitary, thyroid, adrenal glands). Plasma cortisol levels rose initially and then fell — precisely the dynamics predicted by Hans Selye's General Adaptation Syndrome (GAS).",
        ],
      },
      {
        heading: "1990s: Safety standards and industry lobbying",
        paragraphs: [
          "ICNIRP (International Commission on Non-Ionizing Radiation Protection) established safety limits in the 1990s based solely on thermal effects — i.e., tissue heating. All non-thermal biological effects (calcium efflux, oxidative stress, BBB opening, hormonal changes) were excluded from the safety limits because they were not considered \"sufficiently proven.\"",
          "Simultaneously, the mobile phone industry grew into one of the world's largest sectors. The structure of research funding changed: a significant portion of EMF safety research was funded directly or indirectly through industry. Several studies reporting non-thermal effects were severely criticized or marginalized, while industry-funded studies — which systematically reported \"no effect\" — received less scrutiny.",
        ],
      },
      {
        heading: "2013–2025: Pall's VGCC hypothesis and Panagopoulos umbrella review",
        paragraphs: [
          "Martin Pall published a comprehensive review in 2013 linking the biological effects of electromagnetic fields to voltage-gated calcium channels (VGCC). 23 studies demonstrated that calcium channel blockers prevent EMF biological effects — confirming VGCC as the primary mechanism. Pall's analysis expanded this to 28 studies by 2018.",
          "In 2025, Dimitris Panagopoulos published an umbrella review covering 39 systematic reviews on the effects of EMF on reproductive health. The review confirmed biological effects across multiple parameters.",
        ],
      },
      {
        heading: "2021–2026: Lindgren's geometric electromagnetism and BERM",
        paragraphs: [
          "Jouni Lindgren, Jukka Kovacs and Tapio Liukkonen published a theoretical framework in 2025 in which the electromagnetic potential is part of spacetime geometry: the metric tensor absorbs the EM quadri-potential and Maxwell's equations follow as Bianchi identities of the geometry.",
          "BERM (Bio-Electromagnetic Reproductive Model) applies this geometry to a biological context and produces quantitative, locked predictions that will either come true or not. The model does not claim to be proven — it claims to be falsifiable.",
        ],
      },
    ],
    coda: {
      heading: "Why this history matters",
      paragraphs: [
        "The biological effects of electromagnetic fields are not a new claim. They have been documented over six decades, starting from military research laboratories. The marginalization of these claims was not based on the effects being investigated and rejected — but on the research line being shut down due to funding structures and institutional pressures.",
        'BERM does not claim this is a conspiracy. It claims this is a structural blind spot: research funding is directed toward questions that already have an answer ("is there a thermal effect?") rather than questions that have never been properly asked ("what happens at the VGCC level during chronic, non-thermal exposure?").',
        "The sources of this site — Becker, Frey, Adey, Guy, Pall, Panagopoulos, Zandieh — form a 60-year research line that is coherent but institutionally broken. BERM seeks to reconnect these threads.",
      ],
    },
  },
  fi: {
    title: "Historiallinen konteksti",
    subtitle:
      "Biosähkömagneettisen tutkimuksen historiallinen tausta: Becker, Frey ja US Navy.",
    intro:
      "Sähkömagneettisten kenttien biologiset vaikutukset eivät ole uusi löydös. Ne on tunnettu, tutkittu ja dokumentoitu yli kuuden vuosikymmenen ajan — ensin armeijan tutkimuslaboratorioissa, sitten yliopistoissa, ja lopulta marginalisoitu institutionaalisesti tavalla, joka on itsessään tutkimisen arvoinen historia.",
    sections: [
      {
        heading: "1896–1950: Varhaiset havainnot",
        paragraphs: [
          "Sähkömagneettisten kenttien biologiset vaikutukset havaittiin jo 1800-luvun lopulla. Ranskalainen fyysikko Jacques-Arsène d'Arsonval kuvasi vuonna 1896 magnetofosfeni-ilmiön: vaihtuvat magneettikentät tuottivat havaittavia valovälähdyksiä koehenkilöiden näkökentässä. Tämä osoitti, että hermokudos reagoi sähkömagneettisiin kenttiin ei-termisesti — vaikutus ei johtunut kudoksen lämpenemisestä vaan suorasta vuorovaikutuksesta hermoston ionikanavien kanssa.",
          "Toisen maailmansodan aikana tutkatekniikan nopea kehitys toi mukanaan ensimmäiset havainnot korkeatehoisen mikroaaltosäteilyn biologisista vaikutuksista. Tutkaoperaattorit raportoivat lämpötuntemuksia, päänsärkyä ja näköhäiriöitä. Nämä havainnot johtivat sekä Yhdysvalloissa että Neuvostoliitossa tutkimusohjelmiin, joiden tulokset luokiteltiin suurelta osin salaisiksi.",
        ],
      },
      {
        heading:
          "1950–1965: Kylmä sota ja tutkajärjestelmien räjähdysmäinen kasvu",
        paragraphs: [
          "Kylmän sodan aikana Pohjois-Amerikkaan ja Eurooppaan rakennettiin ennennäkemätön ilmavalvontatutkien verkosto. Pinetree Line (33 asemaa, 1951), Mid-Canada Line (90+ asemaa, 1957) ja DEW Line (63 asemaa, 1957) muodostivat arktisen tutkamuurin Alaskasta Grönlantiin. Vuonna 1961 BMEWS-järjestelmä (Ballistic Missile Early Warning System) toi käyttöön kolme mega-asemaa joiden AN/FPS-27-tutkat tuottivat 15 megawatin huipputehoa S-kaistalla (2,3–2,7 GHz) — täsmälleen samalla taajuusalueella jota nykyiset Wi-Fi-reitittimet käyttävät.",
          "Samanaikaisesti Nike Ajax- ja Nike Hercules -ilmatorjuntapatteri-asemat (yli 200 asemaa, 1954–1974) sijoitettiin amerikkalaisten suurkaupunkien esikaupunkialueille. Niiden LOPAR-etsintätutkat tuottivat yli megawatin huipputehon. Kymmenet miljoonat ihmiset asuivat näiden asemien läheisyydessä kahden vuosikymmenen ajan.",
          'NATO-maissa NADGE-järjestelmä (NATO Air Defence Ground Environment) kattoi Norjasta Turkkiin satoja tutka-asemia. Troposfäärisen hajonnan viestintäjärjestelmät — White Alice (80 asemaa Alaskassa, 900 MHz / 2 GHz, 10–75 kW) ja ACE High (49 asemaa NATO-maissa) — säteilivät korkeatehoista RF-energiaa maaseudulla ja vuoristoalueilla, täsmälleen niillä elinympäristöillä joissa sentinellilajit (sammakot, linnut, hyönteiset) elivät.',
          'Neuvostoliitto rakensi vastaavat järjestelmät. Vuonna 1976 Duga-tutka ("Russian Woodpecker") aloitti toimintansa Tšernobylissä: 10 megawatin ylihorisonttitutka, joka häiritsi HF-radioliikennettä globaalisti ja jonka signaali kuultiin radiossa ympäri maailmaa tasaisena naksutuksena.',
          "Vuoteen 1965 mennessä maapalloa kiersi tutkasäteilyn vyöhyke jota ei ollut olemassa 15 vuotta aiemmin. Tämän ajankohdan ja sentinellilajien populaatiolaskun alkamisen yhteys on yksi BERM-mallin keskeisistä havainnoista.",
        ],
      },
      {
        heading: "1961: Freyn auditorinen efekti",
        paragraphs: [
          'Allan Frey julkaisi vuonna 1961 tutkimuksen, joka osoitti ihmisten "kuulevan" pulsatun mikroaaltosäteilyn — napsahduksia ja surinaa, ilman kuulolaitteita tai mitään ilmeistä mekanismia. Tämä oli ensimmäinen vertaisarvioitu osoitus siitä, että RF-sähkömagneettinen kenttä tuottaa suoran hermostollisen vasteen ei-termisellä intensiteetillä. Freyn työ osoitti myös, että aivoverieste (BBB) avautui hetkellisesti RF-altistuksen aikana — havainto, jonka Salford vahvisti vuonna 2003 GSM-900-signaaleilla.',
          "Freyn tutkimus herätti kiinnostusta sekä tieteellisessä yhteisössä että tiedustelupalveluissa. Yhdysvaltojen puolustusministeriö (DoD) rahoitti jatkotutkimuksia, joista osa luokiteltiin salaiseksi.",
        ],
      },
      {
        heading: "1960–1972: Beckerin bioelektrinen vallankumous",
        paragraphs: [
          "Robert O. Becker, ortopeedi ja tutkija Veterans Administration -sairaalassa Syracusessa, teki 1960-luvulla sarjan läpimurtoja bioelektrisyyden alalla. Hän osoitti, että salamanterin raajan regeneraatio ohjautuu nanoampeeritason tasavirtojen (DC) avulla: negatiivinen virta neuroepidermaalisessa liittymässä käynnistää dediferentiaation ja regeneraation. Virta-arvolla oli tarkka kynnys — hieman enemmän ei toiminut. Tämä oli ensimmäinen osoitus bioelektrisen koodin olemassaolosta nisäkkäiden kudoksissa.",
          "Becker yhdisti havaintonsa sähkömagneettisten kenttien tutkimukseen ja ehdotti, että ulkoiset EMF-kentät voivat häiritä elimistön sisäisiä bioelektrisiä signaaleja. Hän dokumentoi useita tapauksia, joista merkittävin on Fort Ruckerin tapaus: 17 kampurajalkaa 16 kuukauden aikana sotilassairaalan synnytysosastolla (odotusarvo noin 4), korkean tutkatehon sotilastukikohdassa. Kun Becker pyysi tutka-asemien säteilykarttoja vaikutuksen tutkimiseksi, armeija kieltäytyi vetoamalla sotilaalliseen salassapitoon.",
          "Beckerin tutkimusrahoitus katkaistiin 1970-luvulla. Hänen laboratorionsa suljettiin. Hän julkaisi löydöksensä kahdessa kirjassa — The Body Electric (1985) ja Cross Currents (1990) — jotka jäivät tieteellisen valtavirran ulkopuolelle mutta dokumentoivat laajan kokeellisen näytön.",
        ],
      },
      {
        heading: "1972: Moskovan signaali",
        paragraphs: [
          "Vuodesta 1953 lähtien — mahdollisesti jo aiemmin — Neuvostoliitto suuntasi Yhdysvaltain Moskovan-suurlähetystöön matalan intensiteetin mikroaaltosignaalia taajuuksilla 0,5–18 GHz, intensiteetillä 5–15 µW/cm² (reilusti alle nykyisten turvarajojen). Kun altistus paljastui 1970-luvulla, suurlähetystön henkilökunnalla havaittiin kohonneita syöpälukuja, leukemia-esiintymiä ja neurologisia oireita. Yhdysvaltain ulkoministeriö ei julkistanut kaikkia tutkimustuloksia.",
          "Tapaus on merkittävä kahdesta syystä. Se osoitti, että valtiotason toimijat ottivat RF:n biologiset vaikutukset vakavasti — vakavammin kuin julkisesti myönnettiin. Ja se osoitti, että pitkäaikainen, matala-annoksinen altistus voi tuottaa terveysvaikutuksia, vaikka hetkellinen altistus on turvarajan alapuolella.",
        ],
      },
      {
        heading: "1975–1981: Adeyn kalsiumeffluksi",
        paragraphs: [
          'W. Ross Adey osoitti 1970–1980-luvuilla, että heikot sähkömagneettiset kentät tietyillä taajuuksilla ja intensiteeteillä aiheuttavat kalsiumin effluksin aivokudoksesta — kalsiumionit virtaavat ulos soluista. Efekti oli "ikkunailmiö": se tapahtui vain tietyillä taajuuksilla ja voimakkuuksilla, ei kaikilla. Tämä oli ensimmäinen selkeä osoitus ei-lineaarisesta, ei-termisestä biologisesta vasteesta sähkömagneettisiin kenttiin.',
          "Adeyn tulokset replikoitiin useissa riippumattomissa laboratorioissa — ja ne muodostavat perustan nykyiselle VGCC-mekanismille (jänniteohjatut kalsiumkanavat). Siitä huolimatta Adey marginalisoitiin akateemisessa yhteisössä 1990-luvulla, ja hänen tutkimuslinjansa kuihtui rahoituksen puutteeseen.",
        ],
      },
      {
        heading: "1984: US Air Forcen kroonisen altistuksen tutkimus",
        paragraphs: [
          "Arthur Guy suoritti Yhdysvaltain ilmavoimien tilauksesta yhden kaikkien aikojen pitkäkestoisimmista kontrolloiduista eläinkokeista RF-altistuksesta. 200 rottaa altistettiin 2,45 GHz:n säteilylle (0,5 mW/cm²) 25 kuukauden ajan. Tulos: altistuneilla rotilla todettiin 18 kasvainta 5:een verrattuna kontrolliryhmässä (3,6-kertainen riski), erityisesti endokriinisissä elimissä (aivolisäke, kilpirauhanen, lisämunuainen). Plasman kortisolitaso nousi ensin ja laski sitten — täsmälleen Hans Selyen yleisen adaptaatio-oireyhtymän (GAS) ennustama dynamiikka.",
        ],
      },
      {
        heading: "1990-luvut: Turvarajojen asettaminen ja teollisuuden lobbaus",
        paragraphs: [
          'ICNIRP (International Commission on Non-Ionizing Radiation Protection) vakiinnutti 1990-luvulla turvarajat, jotka perustuivat yksinomaan termisiin vaikutuksiin — eli kudoksen lämpenemiseen. Kaikki ei-termiset biologiset vaikutukset (kalsiumeffluksi, oksidatiivinen stressi, BBB-avautuminen, hormonaaliset muutokset) jätettiin turvarajojen ulkopuolelle, koska niitä ei pidetty "riittävästi todistettuina".',
          'Samanaikaisesti matkapuhelinteollisuus kasvoi yhdeksi maailman suurimmista toimialoista. Tutkimusrahoituksen rakenne muuttui: merkittävä osa EMF-turvallisuustutkimuksesta rahoitettiin suoraan tai epäsuorasti teollisuuden kautta. Useita tutkimuksia, jotka raportoivat ei-termisiä vaikutuksia, kritisoitiin ankarasti tai marginalisoitiin, kun taas teollisuuden rahoittamat tutkimukset — jotka systemaattisesti raportoivat "ei vaikutusta" — saivat vähemmän kritiikkiä.',
        ],
      },
      {
        heading:
          "2013–2025: Pallin VGCC-hypoteesi ja Panagopouloksen umbrella review",
        paragraphs: [
          "Martin Pall julkaisi vuonna 2013 kattavan katsauksen, joka yhdisti sähkömagneettisten kenttien biologiset vaikutukset jänniteohjatuihin kalsiumkanaviin (VGCC). 23 tutkimusta osoitti, että kalsiumkanavasalpaajat estävät EMF:n biologiset vaikutukset — mikä vahvisti VGCC:n primäärimekanismiksi. Pallin analyysi laajensi tämän 28 tutkimukseen vuoteen 2018 mennessä.",
          "Vuonna 2025 Dimitris Panagopoulos julkaisi umbrella review'n, joka kattoi 39 systemaattista katsausta EMF:n vaikutuksista lisääntymisterveyteen. Katsaus vahvisti biologiset vaikutukset useilla parametreilla.",
        ],
      },
      {
        heading:
          "2021–2026: Lindgrenin geometrinen elektromagnetismi ja BERM",
        paragraphs: [
          "Jouni Lindgren, Jukka Kovacs ja Tapio Liukkonen julkaisivat vuonna 2025 teoreettisen kehyksen, jossa sähkömagneettinen potentiaali on osa aika-avaruuden geometriaa: metriikkatensori absorboi EM-nelipoteneiaalin ja Maxwellin yhtälöt seuraavat geometrian Bianchi-identiteetteinä.",
          "BERM (Bio-Electromagnetic Reproductive Model) soveltaa tätä geometriaa biologiseen kontekstiin ja tuottaa kvantitatiivisia, lukittuja ennusteita, jotka toteutuvat tai eivät. Malli ei väitä olevansa todistettu — se väittää olevansa falsifioitavissa.",
        ],
      },
    ],
    coda: {
      heading: "Miksi tämä historia on tärkeä",
      paragraphs: [
        "Sähkömagneettisten kenttien biologiset vaikutukset eivät ole uusi väite. Ne on dokumentoitu kuuden vuosikymmenen ajan, alkaen armeijan tutkimuslaboratorioista. Väitteiden marginalisointi ei perustunut siihen, että vaikutuksia olisi tutkittu ja hylätty — vaan siihen, että tutkimuslinja suljettiin rahoitusrakenteiden ja institutionaalisten paineiden vuoksi.",
        'BERM ei väitä, että tämä olisi salaliitto. Se väittää, että kyseessä on rakenteellinen sokea piste: tutkimusrahoitus ohjautuu kysymyksiin joihin on jo vastaus ("onko lämpövaikutusta?") eikä kysymyksiin joita ei ole koskaan kunnolla kysytty ("mitä tapahtuu VGCC-tasolla kroonisessa, ei-termisessä altistuksessa?").',
        "Tämän sivuston lähteet — Becker, Frey, Adey, Guy, Pall, Panagopoulos, Zandieh — muodostavat 60 vuoden tutkimuslinjan, joka on yhtenäinen mutta institutionaalisesti katkennut. BERM pyrkii yhdistämään nämä langat.",
      ],
    },
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locale === "fi"
    ? {
        title: "Historiallinen konteksti — Extinction Field",
        description:
          "Biosähkömagneettisen tutkimuksen tukahdutettu historia: Becker, Frey, Adey ja US Navy.",
      }
    : {
        title: "Historical context — Extinction Field",
        description:
          "The historical background of bioelectromagnetic research: Becker, Frey, and the US Navy.",
      };
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale as Locale) in t ? (locale as Locale) : "en";

  const d = t[lang];

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold tracking-tight mb-2">{d.title}</h1>
      <p className="text-foreground-muted mb-4">{d.subtitle}</p>

      <h2 className="text-xl font-semibold mt-10 mb-4">
        {lang === "fi"
          ? "Biosähkömagneettisen tutkimuksen tukahdutettu historia"
          : "The suppressed history of bioelectromagnetic research"}
      </h2>
      <p className="text-foreground-muted leading-relaxed mb-6">{d.intro}</p>

      {d.sections.map((section, i) => (
        <section key={i}>
          <hr className="border-border my-10" />
          <h2 className="text-xl font-semibold mb-4">{section.heading}</h2>
          {section.paragraphs.map((p, j) => (
            <p
              key={j}
              className="text-foreground-muted leading-relaxed mb-4 last:mb-0"
            >
              {p}
            </p>
          ))}
        </section>
      ))}

      <hr className="border-border my-10" />

      <section className="rounded-lg border border-accent/20 bg-accent/5 p-6 mt-10">
        <h2 className="text-xl font-semibold mb-4">{d.coda.heading}</h2>
        {d.coda.paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-foreground-muted leading-relaxed mb-4 last:mb-0"
          >
            {p}
          </p>
        ))}
      </section>
    </main>
  );
}
