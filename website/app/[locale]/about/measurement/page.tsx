import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

const t = {
  en: {
    title: "SDR Measurement Protocol",
    subtitle:
      "How to independently measure RF envelope spectral content in the R42 biological window using software-defined radio.",
    intro:
      "BERM's R43 prediction claims that the pulsed structure of cellular RF — specifically the eDRX duty cycle — places spectral energy inside the 20–40 mHz biological response window (R42). This claim is verifiable by anyone with an SDR receiver. This page describes the measurement protocol.",
    sections: [
      {
        heading: "What is being measured",
        paragraphs: [
          "Modern cellular devices do not transmit continuously. They follow standardized sleep/wake cycles defined by 3GPP specifications. In eDRX (extended Discontinuous Reception) mode, a device sleeps for a defined period T, then briefly wakes to check for paging messages. This creates a pulsed RF envelope with fundamental frequency f₁ = 1/T.",
          "The R42 window (20–40 mHz, centered at 30 mHz) corresponds to the frequency range where Zandieh (2025) observed mitochondrial ROS responses. If the eDRX duty cycle places spectral energy inside this window, the biological pathway A + C → B from BERM's R43 prediction is physically present in the ambient RF environment.",
          "The measurement does not prove biological effect — it confirms the physical precondition. The spectral content is either there or it isn't. This is a binary, reproducible measurement.",
        ],
      },
      {
        heading: "Equipment required",
        paragraphs: [
          "Any SDR receiver capable of capturing I/Q data at a cellular band: RTL-SDR (~$30, sufficient for envelope analysis), HackRF One ($300, wider bandwidth), or USRP ($1000+, research-grade). The critical requirement is continuous capture duration ≥ 2 hours at ≥ 1 kHz sample rate — the R42 window is at millihertz frequencies, so long captures are essential for spectral resolution.",
          "Software: GNU Radio, SDR# (Windows), or GQRX (Linux/Mac) for I/Q capture. Python with NumPy + SciPy for analysis. BERM provides the analysis pipeline as envelope_psd.py (open source, no dependencies beyond scipy).",
        ],
      },
      {
        heading: "Measurement procedure",
        content: [
          {
            step: "1. Frequency selection",
            detail:
              "Tune to a cellular downlink band (e.g., LTE Band 3: 1805–1880 MHz, or Band 7: 2620–2690 MHz). The exact carrier frequency matters less than capturing any active cell — all cells in the same band share the same eDRX timing structure.",
          },
          {
            step: "2. I/Q capture",
            detail:
              "Record raw I/Q samples to disk. Minimum duration: 2 hours (for 0.14 mHz frequency resolution at the R42 band). Recommended: 4–8 hours for robust spectral estimation. Sample rate: 1 kHz is sufficient (we only need the envelope, not the carrier). If your SDR requires higher rates, the analysis pipeline downsamples automatically.",
          },
          {
            step: "3. Envelope extraction",
            detail:
              "Compute instantaneous power P(t) = |x(t)|² from the complex I/Q signal. This removes the carrier and leaves only the amplitude modulation — the on/off pattern of device transmissions.",
          },
          {
            step: "4. Downsampling",
            detail:
              "Anti-alias lowpass filter (cutoff 0.5 Hz), then decimate to 1 Hz. The R42 window is at 20–40 mHz; 1 Hz sampling gives 500× oversampling.",
          },
          {
            step: "5. Welch PSD estimation",
            detail:
              "Compute the power spectral density using Welch's method with segment length ≥ 600 seconds (for ≤ 1.7 mHz bin width). Use Hann window, 50% overlap. This yields the spectral power distribution of the RF envelope from 1 mHz to 0.5 Hz.",
          },
          {
            step: "6. R42 spectral integration",
            detail:
              "Integrate the PSD weighted by the R42 Gaussian window (center 30 mHz, σ = 5 mHz) to compute Ξ_R42. This is the spectral exposure index — the amount of envelope spectral energy inside the biological response window. Compare Ξ_R42 across different eDRX timer settings to test R43's prediction of band-pass response.",
          },
        ],
      },
      {
        heading: "Expected results",
        paragraphs: [
          "For eDRX T = 40.96 s: the fundamental frequency f₁ = 1/40.96 = 24.414 mHz falls inside R42. The PSD should show a clear peak at this frequency. Ξ_R42 should be the highest among all standard eDRX timer values — this is R43's core prediction.",
          "For eDRX T = 10.24 s: f₁ = 97.66 mHz, outside R42. No significant R42 spectral content expected. This serves as a negative control.",
          "For continuous wave (CW, no pulsing): no discrete spectral lines in the envelope. Ξ_R42 should be near zero. If CW produces the highest biological response in the R43 experiment, the envelope theory is falsified.",
        ],
      },
      {
        heading: "Analysis pipeline",
        paragraphs: [
          "BERM provides a complete analysis pipeline in Python (berm/physics/envelope_psd.py). The pipeline accepts raw I/Q files (complex float32) or can generate synthetic eDRX signals for testing. Key functions: generate_synthetic_edrx_signal() for test data, load_iq_file() for real captures, analyze_envelope() for the full pipeline, and plot_envelope_psd() for visualization.",
          "To run with synthetic data (no SDR required): python -m berm.physics.envelope_psd. This generates a 2-hour synthetic eDRX signal at T = 40.96 s, processes it through the full pipeline, and outputs the Ξ_R42 value and spectral plot.",
        ],
      },
      {
        heading: "Reproducibility requirements",
        paragraphs: [
          "For a measurement to contribute to R43 validation, the following must be documented: SDR hardware model and firmware version, antenna type and placement, cellular band and center frequency, capture duration and sample rate, geographic location (city-level, for cell density context), date and time of capture, and the raw I/Q file (or a checksum thereof).",
          "The analysis code is open source and deterministic — given the same I/Q input, the same Ξ_R42 value must result. Reproducibility is verified by comparing against the synthetic test signal output.",
        ],
      },
      {
        heading: "Limitations",
        paragraphs: [
          "This protocol measures aggregate RF envelope content in a cellular band. It does not isolate a single device's eDRX cycle — it captures the superposition of all devices in range. In dense urban environments, multiple overlapping eDRX cycles may produce a more complex spectral structure than a single-device model predicts.",
          "The measurement confirms physical spectral content, not biological effect. Even if Ξ_R42 is high at T = 40.96 s, this does not prove that the spectral content causes biological harm. That is the question the R43 experiment addresses.",
          "SDR measurements at cellular frequencies may be subject to local regulations. Check your jurisdiction's laws regarding RF signal reception before conducting measurements.",
        ],
      },
    ],
  },
  fi: {
    title: "SDR-mittausprotokolla",
    subtitle:
      "Kuinka itsenäisesti mitata RF-verhokäyrän spektrisisältö R42-biologisessa ikkunassa ohjelmistoradiolla.",
    intro:
      "BERM:n R43-ennuste väittää, että solukkoverkon RF:n pulssitettu rakenne — erityisesti eDRX-käyttösykli — sijoittaa spektrienergiaa 20–40 mHz biologisen vasteen ikkunaan (R42). Tämä väite on todennettavissa kenen tahansa SDR-vastaanottimella. Tämä sivu kuvaa mittausprotokollan.",
    sections: [
      {
        heading: "Mitä mitataan",
        paragraphs: [
          "Nykyaikaiset solukkolaitteet eivät lähetä jatkuvasti. Ne noudattavat 3GPP-standardien määrittelemiä uni/herätyssyklejä. eDRX-tilassa (extended Discontinuous Reception) laite nukkuu määritellyn ajan T ja herää sitten lyhyesti tarkistamaan sivutusviestit. Tämä luo pulssimaisen RF-verhokäyrän perustaajuudella f₁ = 1/T.",
          "R42-ikkuna (20–40 mHz, keskitetty 30 mHz) vastaa taajuusaluetta, jossa Zandieh (2025) havaitsi mitokondriaalisia ROS-vasteita. Jos eDRX-käyttösykli sijoittaa spektrienergiaa tähän ikkunaan, BERM:n R43-ennusteen biologinen polku A + C → B on fyysisesti läsnä ympäristön RF-kentässä.",
          "Mittaus ei todista biologista vaikutusta — se vahvistaa fyysisen ennakkoehdon. Spektrisisältö joko on tai ei ole. Tämä on binäärinen, toistettava mittaus.",
        ],
      },
      {
        heading: "Tarvittavat laitteet",
        paragraphs: [
          "Mikä tahansa SDR-vastaanotin, joka pystyy tallentamaan I/Q-dataa solukkokaistalla: RTL-SDR (~30 $, riittävä verhokäyräanalyysiin), HackRF One (300 $, laajempi kaistanleveys) tai USRP (1000 $+, tutkimustaso). Kriittinen vaatimus on vähintään 2 tunnin jatkuva tallennus ≥ 1 kHz näytteenottotaajuudella — R42-ikkuna on millihertsitaajuuksilla, joten pitkät tallennukset ovat välttämättömiä spektriresoluutiolle.",
          "Ohjelmistot: GNU Radio, SDR# (Windows) tai GQRX (Linux/Mac) I/Q-tallennukseen. Python NumPy:n ja SciPy:n kanssa analysointiin. BERM tarjoaa analyysipipelinen envelope_psd.py:nä (avoin lähdekoodi, ei riippuvuuksia scipy:n lisäksi).",
        ],
      },
      {
        heading: "Mittausmenettely",
        content: [
          {
            step: "1. Taajuuden valinta",
            detail:
              "Viritä solukkoverkkon downlink-kaistalle (esim. LTE Band 3: 1805–1880 MHz tai Band 7: 2620–2690 MHz). Tarkka kantoaallon taajuus on vähemmän tärkeä kuin aktiivisen solun tallennus — kaikki saman kaistan solut jakavat saman eDRX-ajoitusrakenteen.",
          },
          {
            step: "2. I/Q-tallennus",
            detail:
              "Tallenna raakamuotoiset I/Q-näytteet levylle. Vähimmäiskesto: 2 tuntia (0,14 mHz taajuusresoluutio R42-kaistalla). Suositeltu: 4–8 tuntia luotettavalle spektriestimoinnille. Näytteenottotaajuus: 1 kHz riittää (tarvitsemme vain verhokäyrän, ei kantoaaltoa).",
          },
          {
            step: "3. Verhokäyrän erotus",
            detail:
              "Laske hetkellinen teho P(t) = |x(t)|² kompleksisesta I/Q-signaalista. Tämä poistaa kantoaallon ja jättää vain amplitudimodulaation — laitteiden lähetysviestien on/off-kuvion.",
          },
          {
            step: "4. Alaspäin näytteistys",
            detail:
              "Alipäästösuodatus (rajataajuus 0,5 Hz), sitten desimointi 1 Hz:iin. R42-ikkuna on 20–40 mHz; 1 Hz näytteistys antaa 500-kertaisen ylinäytteistyksen.",
          },
          {
            step: "5. Welch PSD -estimointi",
            detail:
              "Laske tehospektritiheys Welchin menetelmällä, segmentin pituus ≥ 600 sekuntia (≤ 1,7 mHz lokeronleveys). Käytä Hann-ikkunaa, 50 % limittäisyys.",
          },
          {
            step: "6. R42-spektri-integrointi",
            detail:
              "Integroi PSD painotettuna R42-Gaussin ikkunalla (keskipiste 30 mHz, σ = 5 mHz) laskettavaksi Ξ_R42. Tämä on spektrialtistusindeksi. Vertaa Ξ_R42:ta eri eDRX-ajastinarvojen välillä testataksesi R43:n ennustetta kaistanpäästövasteesta.",
          },
        ],
      },
      {
        heading: "Odotetut tulokset",
        paragraphs: [
          "eDRX T = 40,96 s: perustaajuus f₁ = 1/40,96 = 24,414 mHz osuu R42:n sisään. PSD:ssä pitäisi näkyä selvä piikki tällä taajuudella. Ξ_R42 pitäisi olla korkein kaikkien standardien eDRX-ajastinarvojen joukossa — tämä on R43:n ydinennuste.",
          "eDRX T = 10,24 s: f₁ = 97,66 mHz, R42:n ulkopuolella. Merkittävää R42-spektrisisältöä ei odoteta. Tämä toimii negatiivisena kontrollina.",
          "Jatkuva aalto (CW, ei pulssia): ei diskreettejä spektriviivoja verhokäyrässä. Ξ_R42 pitäisi olla lähellä nollaa. Jos CW tuottaa korkeimman biologisen vasteen R43-kokeessa, verhokäyräteoria on falsifioitu.",
        ],
      },
      {
        heading: "Analyysipipeline",
        paragraphs: [
          "BERM tarjoaa täydellisen Python-analyysipipelinen (berm/physics/envelope_psd.py). Pipeline hyväksyy raakoja I/Q-tiedostoja (complex float32) tai voi generoida synteettisiä eDRX-signaaleja testausta varten. Avainfunktiot: generate_synthetic_edrx_signal() testidatalle, load_iq_file() oikeille tallennuksille, analyze_envelope() koko pipelinelle ja plot_envelope_psd() visualisoinnille.",
          "Ajaminen synteettisellä datalla (ei SDR:ää tarvita): python -m berm.physics.envelope_psd. Tämä generoi 2 tunnin synteettisen eDRX-signaalin T = 40,96 s, prosessoi sen koko pipelinen läpi ja tulostaa Ξ_R42-arvon ja spektrikuvaajan.",
        ],
      },
      {
        heading: "Toistettavuusvaatimukset",
        paragraphs: [
          "Mittauksen on dokumentoitava: SDR-laitteiston malli ja firmware-versio, antennityyppi ja sijoitus, solukkokaista ja keskitaajuus, tallennuksen kesto ja näytteenottotaajuus, maantieteellinen sijainti (kaupunkitaso, soluntiheyskontekstille), päivämäärä ja kellonaika sekä raaka I/Q-tiedosto (tai sen tarkistussumma).",
          "Analyysikoodi on avointa lähdekoodia ja deterministinen — samalla I/Q-syötteellä saman Ξ_R42-arvon on tultava. Toistettavuus varmennetaan vertaamalla synteettisen testisignaalin tulokseen.",
        ],
      },
      {
        heading: "Rajoitukset",
        paragraphs: [
          "Tämä protokolla mittaa kokonais-RF-verhokäyrän sisältöä solukkokaistalla. Se ei eristä yksittäisen laitteen eDRX-sykliä — se tallentaa kaikkien kantaman sisällä olevien laitteiden superpositio. Tiheissä kaupunkiympäristöissä useat päällekkäiset eDRX-syklit voivat tuottaa monimutkaisemman spektrirakenteen kuin yhden laitteen malli ennustaa.",
          "Mittaus vahvistaa fyysisen spektrisisällön, ei biologista vaikutusta. Vaikka Ξ_R42 olisi korkea T = 40,96 s:lla, tämä ei todista, että spektrisisältö aiheuttaa biologista haittaa. Se on kysymys, johon R43-koe vastaa.",
          "SDR-mittaukset solukkoradiotaajuuksilla voivat olla paikallisten säädösten alaisia. Tarkista oman lainkäyttöalueesi lait RF-signaalien vastaanotosta ennen mittausten suorittamista.",
        ],
      },
    ],
  },
} as const;

type SectionType = (typeof t.en.sections)[number];

function hasContent(
  section: SectionType,
): section is SectionType & { content: Array<{ step: string; detail: string }> } {
  return "content" in section;
}

function hasParagraphs(
  section: SectionType,
): section is SectionType & { paragraphs: string[] } {
  return "paragraphs" in section;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = t[locale as Locale] ?? t.en;
  return {
    title: `${d.title} - Extinction Field`,
    description: d.subtitle,
  };
}

export default async function MeasurementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = t[locale as Locale] ?? t.en;

  return (
    <div className="max-w-3xl mx-auto px-4 pb-16">
      <h1 className="text-2xl font-bold mb-2">{d.title}</h1>
      <p className="text-foreground-muted text-sm mb-6">{d.subtitle}</p>

      <p className="text-sm leading-relaxed mb-8">{d.intro}</p>

      {d.sections.map((section, i) => (
        <section key={i} className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-accent">
            {section.heading}
          </h2>

          {hasParagraphs(section) &&
            section.paragraphs.map((p, j) => (
              <p key={j} className="text-sm leading-relaxed mb-3 text-foreground/90">
                {p}
              </p>
            ))}

          {hasContent(section) && (
            <div className="space-y-4">
              {section.content.map((item, j) => (
                <div key={j} className="border-l-2 border-accent/30 pl-4">
                  <p className="text-sm font-semibold mb-1">{item.step}</p>
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      <div className="border border-border rounded-lg p-4 mt-8 bg-background-alt/30">
        <p className="text-xs text-foreground-muted font-mono">
          {locale === "fi"
            ? "Analyysikoodi: berm/physics/envelope_psd.py (avoin lähdekoodi)"
            : "Analysis code: berm/physics/envelope_psd.py (open source)"}
        </p>
        <p className="text-xs text-foreground-muted font-mono mt-1">
          {locale === "fi"
            ? "Aja synteettisellä datalla: python -m berm.physics.envelope_psd"
            : "Run with synthetic data: python -m berm.physics.envelope_psd"}
        </p>
      </div>
    </div>
  );
}
