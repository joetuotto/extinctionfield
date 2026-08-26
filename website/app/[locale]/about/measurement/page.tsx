import type { Metadata } from "next";
import { Radio } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";

type ProtocolSection = {
  title: string;
  text: readonly string[];
  steps?: readonly { title: string; text: string }[];
};

type Copy = {
  title: string;
  subtitle: string;
  introduction: readonly string[];
  sections: readonly ProtocolSection[];
  boundaryTitle: string;
  boundaryText: string;
};

const t: Record<string, Copy> = {
  en: {
    title: "FieldState measurement protocol",
    subtitle:
      "A protocol for documenting a physical field state and testing a pre-specified biological endpoint. The protocol tests whether a specific field feature produces a measurable biological response under controlled conditions.",
    introduction: [
      "BERM v17 requires more than a national technology proxy or one broadband level. A useful experiment documents the measured field components, calibration, geometry, timing and provenance that could distinguish competing physical hypotheses.",
      "The purpose of this protocol is to make the physical measurement and the biological experiment independently auditable. A physical signature, if observed, is a prerequisite for a mechanism test — not evidence of harm or a TFR coefficient.",
    ],
    sections: [
      {
        title: "1. Pre-specify the question and endpoint",
        text: [
          "State the field feature, biological system, primary endpoint, exposure contrast, timing, analysis and exclusion rules before collection. Register a null-compatible hypothesis as well as the proposed directional hypothesis.",
          "Choose an endpoint close to the tested link: for example a calibrated physical PSD feature, a cellular redox readout, a tight-junction protein, a sperm-function measure or a reproductive hormone. Do not use national TFR as the direct endpoint of a laboratory exposure experiment.",
        ],
      },
      {
        title: "2. Acquire a documented physical FieldState",
        text: [
          "Record calibrated instruments, antenna or probe response, band selection, dynamic range, sampling chain, location, orientation, device posture, time zone, clock synchronisation and raw-data checksums. Measure the local static magnetic background B₀ vector where it is relevant to the hypothesis.",
          "Keep ambient and personal-source conditions distinct. If the physical question concerns an organ, describe the transfer model or phantom/position measurement; a room measurement is not automatically an organ field estimate.",
        ],
        steps: [
          { title: "Field components", text: "Capture the relevant electric/magnetic components and source band(s); retain calibration and uncertainty, not just a single summary level." },
          { title: "Time structure", text: "Create a time-stamped band-power or field-amplitude series, then estimate envelope/beat PSD after the carrier or band has been validly acquired." },
          { title: "Context", text: "Record vector orientation, phase/coherence where measurable, circadian time, source configuration and environmental conditions that can alter the apparatus." },
        ],
      },
      {
        title: "3. Treat eDRX and R42 correctly",
        text: [
          "eDRX is a user-equipment discontinuous-reception/paging scheduling mechanism. It is not, by itself, a known cellular downlink RF waveform or an ambient-field signature. An eDRX timer may be logged as network/device metadata, but it must not be substituted for a measured downlink envelope PSD.",
          "Zandieh et al. (2025) reported frequency-dependent mitochondrial/ROS behaviour in cancer-cell experiments under ELF magnetic-field conditions (0.01–5 Hz; up to 100 mT, including 0.02 and 0.04 Hz conditions). That result motivates an exploratory PSD test; it does not establish RF network modulation, eDRX spectral lines or reproductive effects.",
        ],
      },
      {
        title: "4. Run a controlled biological arm",
        text: [
          "Use blinded allocation where possible, a sham condition and a thermal/airflow/handling control that is matched to the active apparatus. Instrument the exposure chamber during every run rather than assuming that its setpoint describes the delivered condition.",
          "Vary one pre-specified FieldState feature at a time when feasible: vector angle, static background, field amplitude, timing/PSD feature or circadian phase. Include positive controls only when their biological interpretation is appropriate; do not treat a rescue as proof of an upstream field mechanism.",
        ],
      },
      {
        title: "5. Analyse and report",
        text: [
          "Publish raw or access-controlled raw field data, processing code, calibration files, biological data, exclusions, adverse events and null results. Report effect estimates with uncertainty and compare the active and sham FieldStates, not only nominal device settings.",
          "Classify the result by data readiness: a technology-timing proxy for national series, partial FieldState data when inputs are missing, and measurement-ready FieldState when calibration, B₀, transfer, PSD, circadian context, phase/coherence and provenance are documented. Measurement-ready data still require an endpoint-specific test.",
        ],
      },
    ],
    boundaryTitle: "Interpretation boundary",
    boundaryText:
      "This protocol can test a physical-to-biological link. It cannot by itself identify a population effect, separate all environmental causes or justify a personal health recommendation. Any later ASFR/TFR analysis must join measured FieldState and endpoint data with demographic demand, tempo and ART terms.",
  },
  fi: {
    title: "FieldState-mittausprotokolla",
    subtitle:
      "Protokolla fysikaalisen kenttätilan dokumentoimiseen ja ennalta määritellyn biologisen päätepisteen testaamiseen. Protokolla testaa, tuottaako tietty kenttäpiirre mitattavan biologisen vasteen kontrolloiduissa olosuhteissa.",
    introduction: [
      "BERM v17 vaatii enemmän kuin kansallisen teknologiaproxyn tai yhden laajakaistatason. Hyödyllinen koe dokumentoi mitatut kenttäkomponentit, kalibroinnin, geometrian, ajoituksen ja provenienssin, joilla kilpailevia fysikaalisia hypoteeseja voidaan erottaa.",
      "Protokollan tarkoitus on tehdä fysikaalisesta mittauksesta ja biologisesta kokeesta erikseen auditoitavia. Havaittu fysikaalinen allekirjoitus on mekanismitestin ennakkoehto — ei todiste haitasta eikä TFR-kerroin.",
    ],
    sections: [
      {
        title: "1. Määrittele kysymys ja päätepiste ennakolta",
        text: [
          "Kirjaa ennen aineistonkeruuta kenttäpiirre, biologinen järjestelmä, ensisijainen päätepiste, altistuskontrasti, ajoitus, analyysi ja poissulkusäännöt. Rekisteröi myös nollatuloksen salliva hypoteesi ehdotetun suuntahypoteesin rinnalle.",
          "Valitse testattavan lenkin lähellä oleva päätepiste: esimerkiksi kalibroitu PSD-piirre, solun redox-lukema, tight-junction-proteiini, siittiötoiminnon mitta tai lisääntymishormoni. Kansallista TFR:ää ei käytetä laboratorioaltistuskokeen suorana päätepisteenä.",
        ],
      },
      {
        title: "2. Kerää dokumentoitu fysikaalinen FieldState",
        text: [
          "Tallenna kalibroidut mittalaitteet, antennin tai anturin vaste, kaistavalinta, dynaaminen alue, näytteenottoketju, sijainti, orientaatio, laitteen asento, aikavyöhyke, kellosynkronointi ja raakadatan tarkistussummat. Mittaa paikallinen staattisen magneettikentän B₀-vektori, kun se on hypoteesin kannalta relevantti.",
          "Pidä ambient- ja henkilökohtaisen lähteen olosuhteet erillään. Jos fysikaalinen kysymys koskee elintä, kuvaa siirtomalli tai phantom-/asentomittaus; huonemittaus ei automaattisesti ole elinkenttäarvio.",
        ],
        steps: [
          { title: "Kenttäkomponentit", text: "Tallenna relevantit sähkö-/magneettikomponentit ja lähdekaistat; säilytä kalibrointi ja epävarmuus, ei vain yhtä yhteenvetotasoa." },
          { title: "Aikarakenne", text: "Muodosta aikaleimattu kaistateho- tai kenttäamplitudisarja ja estimoi sitten verhokäyrä-/beat-PSD vasta sen jälkeen, kun kantoaalto tai kaista on kerätty pätevästi." },
          { title: "Konteksti", text: "Kirjaa vektorin orientaatio, mitattavissa oleva vaihe/koherenssi, vuorokaudenaika, lähdekonfiguraatio ja ympäristöolosuhteet, jotka voivat muuttaa laitteistoa." },
        ],
      },
      {
        title: "3. Käsittele eDRX ja R42 oikein",
        text: [
          "eDRX on käyttäjälaitteen katkonaisen vastaanoton ja hakutoiminnon ajoitusmekanismi. Se ei yksinään ole tunnettu solukkoverkon downlink-RF-aaltomuoto eikä ambient-kentän allekirjoitus. eDRX-ajastin voidaan kirjata verkko-/laitemetadatana, mutta sitä ei saa korvata mitatulla downlink-verhokäyrän PSD:llä.",
          "Zandieh ym. (2025) raportoi taajuusriippuvaista mitokondrio-/ROS-käyttäytymistä syöpäsolukokeissa ELF-magneettikenttäolosuhteissa (0,01–5 Hz; enintään 100 mT, mukana 0,02 ja 0,04 Hz -olosuhteet). Tulos motivoi alustavaa PSD-testiä; se ei osoita RF-verkon modulaatiota, eDRX-spektriviivoja eikä lisääntymisvaikutuksia.",
        ],
      },
      {
        title: "4. Toteuta kontrolloitu biologinen haara",
        text: [
          "Käytä mahdollisuuksien mukaan sokkoutettua allokaatiota, sham-ehtoa sekä aktiivista laitteistoa vastaavaa lämpö-/ilmavirta-/käsittelykontrollia. Instrumentoi altistuskammio jokaisessa ajossa sen sijaan, että oletat asetusarvon kuvaavan toimitettua olosuhdetta.",
          "Vaihda yhtä ennalta määriteltyä FieldState-piirrettä kerrallaan, kun se on mahdollista: vektorikulmaa, staattista taustaa, kentän amplitudia, ajoitus-/PSD-piirrettä tai vuorokausivaihetta. Käytä positiivisia kontrolleja vain, jos niiden biologinen tulkinta on asianmukainen; rescue ei yksin todista upstream-kenttämekanismia.",
        ],
      },
      {
        title: "5. Analysoi ja raportoi",
        text: [
          "Julkaise raaka- tai pääsykontrolloitu raaka kenttädata, käsittelykoodi, kalibrointitiedostot, biologinen data, poissulut, haittatapahtumat ja nollatulokset. Raportoi vaikutusarviot epävarmuuksineen ja vertaile aktiivista ja sham-FieldStatea, ei vain nimellisiä laiteasetuksia.",
          "Luokittele tulos datavalmiuden mukaan: kansallisille sarjoille teknologian ajoitusproxy, puuttuville syötteille osittainen FieldState-data ja mittausvalmis FieldState vasta, kun kalibrointi, B₀, siirto, PSD, vuorokausikonteksti, vaihe/koherenssi ja provenienssi on dokumentoitu. Mittausvalmis data vaatii silti päätepistekohtaisen testin.",
        ],
      },
    ],
    boundaryTitle: "Tulkintaraja",
    boundaryText:
      "Tällä protokollalla voidaan testata fysikaalinen → biologinen lenkki. Se ei yksin tunnista väestövaikutusta, erottele kaikkia ympäristösyitä eikä oikeuta henkilökohtaista terveyssuositusta. Myöhemmän ASFR/TFR-analyysin on yhdistettävä mitattu FieldState ja päätepistedata demografisiin kysyntä-, tempo- ja ART-termeihin.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = t[locale === "fi" ? "fi" : "en"];
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function MeasurementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = t[locale === "fi" ? "fi" : "en"];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Radio} title={d.title} subtitle={d.subtitle} />

      <div className="max-w-3xl space-y-10">
        <div className="space-y-3 text-foreground-muted leading-relaxed">
          {d.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        {d.sections.map((section, index) => (
          <section key={section.title} className="rounded-xl border border-card-border bg-card-bg p-5">
            <p className="font-mono-num text-xs text-accent">0{index + 1}</p>
            <h2 className="mt-2 text-lg font-semibold">{section.title}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground-muted">
              {section.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {section.steps && (
              <div className="mt-5 space-y-3 border-t border-card-border pt-4">
                {section.steps.map((step) => (
                  <div key={step.title} className="border-l-2 border-accent/30 pl-4">
                    <h3 className="text-sm font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{step.text}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        <section className="rounded-xl border border-status-partial/35 bg-status-partial/5 p-5">
          <h2 className="text-lg font-semibold">{d.boundaryTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.boundaryText}</p>
        </section>
      </div>
    </div>
  );
}
