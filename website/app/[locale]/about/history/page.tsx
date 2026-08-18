import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

const t = {
  en: {
    title: "Historical context",
    subtitle:
      "The historical background of bioelectromagnetic research: Becker, Frey, and the US Navy.",
    wip: "English translation is in progress. Please switch to Finnish for the full article.",
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

  if (lang === "en") {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-2">{t.en.title}</h1>
        <p className="text-foreground-muted mb-8">{t.en.subtitle}</p>
        <div className="border border-card-border rounded-lg p-8 text-center text-foreground-muted">
          {t.en.wip}
        </div>
      </main>
    );
  }

  const d = t.fi;

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold tracking-tight mb-2">{d.title}</h1>
      <p className="text-foreground-muted mb-4">{d.subtitle}</p>

      <h2 className="text-xl font-semibold mt-10 mb-4">
        Biosähkömagneettisen tutkimuksen tukahdutettu historia
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
