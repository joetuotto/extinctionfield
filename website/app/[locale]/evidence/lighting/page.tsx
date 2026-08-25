import type { Metadata } from "next";
import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { LightingTransitionTimeline } from "@/components/LightingTransitionTimeline";
import { CitationLink } from "@/components/CitationLink";

const COPY = {
  en: {
    title: "The IF Channel: Lighting & Display Transition",
    subtitle:
      "How the replacement of incandescent bulbs and CRT screens introduced intermediate-frequency EMF into every home — and why the regulatory gap matters.",
    backLink: "← Back to Evidence",
    narratives: [
      {
        id: "lighting",
        title: "Lighting transition: the invisible EMF shift",
        paragraphs: [
          "The replacement of incandescent bulbs with LED lighting (EU ban 2009–2012, similar elsewhere) transformed every lamp socket from a passive resistor producing zero EMF above 50 Hz into an active kHz-frequency EMF source. A typical home has 15–30 LED bulbs, each containing a switch-mode power supply operating at 20–200 kHz with harmonic overtones extending higher.",
          "Studies attributing LED health effects to ‘blue light’ (Tosini 2016) did not control for the EMF component. LED bulbs produce both blue light and kHz-EMF; incandescent bulbs produce neither. When a study compares LED to incandescent and finds melatonin suppression, it cannot determine whether the cause was spectral (blue light via retina → SCN) or electromagnetic (kHz fields via pineal or VGCC). No separation experiment has been conducted.",
          "The biological activity of intermediate-frequency fields (kHz range) is confirmed by Tumor Treating Fields (TTFields), an FDA-approved cancer therapy using 100–300 kHz alternating fields to disrupt cell division. If these frequencies are therapeutically active in cancer cells, they cannot be biologically inert in normal tissue.",
          "LED street lighting compounds the effect: Boyes et al. 2021 (Science Advances) found 47% reduction in moth caterpillar abundance under LED streetlights vs unlit sites, with worse effects from LEDs than sodium lamps. Pawson & Bader 2014 found LED traps captured 48% more insects than sodium. The Science editorial note on Lindecke 2026 explicitly identifies LED lights as a source of biological RF noise.",
          "The EU incandescent ban (Directive 244/2009) provides a testable natural experiment. The ban was phased: >100W in September 2009, >75W in 2010, >60W in 2011, all remaining in 2012, halogens in 2018. This was an administratively mandated, non-self-selected, population-wide switch from zero IF-EMF sources to continuous IF-EMF sources affecting ~450 million people. Zeghoudi et al. 2025 (Optics & Laser Technology) directly measured LED driver near-field emissions, confirming measurable E-field components at centimeter distances.",
          "BERM predicts that EU countries — where the lighting transition was mandated and simultaneous — will show accelerated TFR decline in 2015–2022 (5–10 year lag from cumulative spermatogenic damage) compared to countries where the ban occurred later or not at all (USA effective 2023, many developing countries still no ban). This is testable with existing demographic data using difference-in-differences regression with LED ban timing as the treatment variable.",
        ],
        studies: [
          { citation: "Boyes et al. (Science Advances)", year: 2021, note: "LED streetlights: −47% moth caterpillars vs unlit" },
          { citation: "Pawson & Bader (Ecological Applications)", year: 2014, note: "LED traps: +48% insect capture vs sodium" },
          { citation: "Tuszynski et al. — TTFields (PMC5129338)", year: 2016, note: "100–300 kHz fields disrupt cell division (FDA-approved)" },
          { citation: "LED power quality study (PMC9920439)", year: 2023, note: "LED bulbs exceed harmonic distortion limits" },
          { citation: "Havas — dirty electricity (ICEMS)", year: 2006, note: "kHz filtering improved diabetes/MS symptoms" },
          { citation: "Aerts et al. (Environment International)", year: 2019, note: "IF fields (300 Hz–1 MHz) poorly studied" },
          { citation: "IJRB systematic review", year: 2022, note: "IF-EMF (300 Hz–10 MHz) animal studies: minimal health research vs ELF/RF" },
          { citation: "Zeghoudi et al. (Optics & Laser Technology)", year: 2025, note: "LED driver near-field E-field emission measured" },
          { citation: "EU Directive 244/2009", year: 2009, note: "Phased incandescent ban 2009–2012, no EMF assessment" },
        ],
      },
      {
        id: "display",
        title: "Display transition: CRT → LCD/LED",
        paragraphs: [
          "The transition from CRT to flat-panel LCD/LED televisions (2005–2015) was not simply a display technology change — it was a multiplicative EMF transformation. Screen count per household increased from ~1 to ~3–4. Average screen size grew from 27\" to 60\" (~5× surface area). Bedroom TV penetration rose from 15% to 70%. Built-in Wi-Fi added continuous 2.4/5 GHz RF emission. Viewing distance decreased. Viewing hours increased with streaming culture.",
          "CRT televisions were not EMF-silent — their deflection coils produced strong VLF fields (15.6 kHz) and ELF fields (50 Hz). But these were from a single device at 3–4 m distance. The replacement by multiple Wi-Fi-connected LCD screens in every room, including bedrooms at 1.5–2 m from the pineal gland during evening hours, represents a qualitative change in the circadian EMF exposure profile.",
          "The bedroom television is particularly relevant to BERM’s circadian pathway (Pathway C): a large LED-backlit, Wi-Fi-connected screen at head height, operating from evening through the melatonin production window, producing both blue light and EMF simultaneously. The multiplicative effect (count × size × bedroom × Wi-Fi × hours × proximity) is far larger than any single-factor analysis would suggest.",
        ],
        studies: [
          { citation: "Display market penetration data (Statista/GWI)", year: "2005–24", note: "Screen count 1 → 3.5, bedroom penetration 15% → 70%" },
          { citation: "Streaming culture and screen time increase", year: "2012–24", note: "Average viewing hours +2.5h with streaming adoption" },
        ],
      },
    ],
    seeAlsoTitle: "See also",
    evidenceLink: "← Evidence portal",
  },
  fi: {
    title: "IF-kanava: valaistus- ja näyttösiirtymä",
    subtitle:
      "Kuinka hehkulamppujen ja CRT-näyttöjen korvaaminen toi välitaajuisen EMF:n jokaiseen kotiin — ja miksi säätelyaukko on merkittävä.",
    backLink: "← Takaisin evidenssiin",
    narratives: [
      {
        id: "lighting",
        title: "Valaistussiirtymä: näkymätön EMF-muutos",
        paragraphs: [
          "Hehkulamppujen korvaaminen LED-valaistuksella (EU-kielto 2009–2012, vastaavat muualla) muutti jokaisen lampunkannan passiivisesta resistanssista, joka ei tuota EMF:ää yli 50 Hz:n, aktiiviseksi kilohertsitaajuiseksi EMF-lähteeksi. Tyypillisessä kodissa on 15–30 LED-lamppua, joista jokaisessa on hakkuriteholähde, joka toimii 20–200 kHz:n taajuudella ja tuottaa korkeampia harmonisia.",
          "Tutkimukset, jotka attribuoivat LED:n terveysvaikutukset ‘siniselle valolle’ (Tosini 2016), eivät kontrolloineet EMF-komponenttia. LED-lamput tuottavat sekä sinistä valoa että kHz-EMF:ää; hehkulamput eivät kumpaakaan. Kun tutkimus vertaa LED:ää hehkulamppuun ja havaitsee melatoniinin suppression, se ei pysty erottamaan, oliko syy spektraalinen (sininen valo verkkokalvon kautta → SCN) vai sähkömagneettinen (kHz-kentät pineaalirauhasen tai VGCC:n kautta). Erottelututkimusta ei ole tehty.",
          "Välitaajuisten kenttien (kHz-alue) biologinen aktiivisuus on vahvistettu Tumor Treating Fields (TTFields) -hoidolla, FDA:n hyväksymällä syöpähoidolla, joka käyttää 100–300 kHz:n vaihtokenttiä solunjakautumisen häiritsemiseen. Jos nämä taajuudet ovat terapeuttisesti aktiivisia syöpäsoluissa, ne eivät voi olla biologisesti inerttejä normaalissa kudoksessa.",
          "LED-katuvalaistus vahvistaa vaikutusta: Boyes ym. 2021 (Science Advances) havaitsivat 47 %:n vähenemisen yöperhosten toukkamäärissä LED-katuvalojen alla verrattuna valaisemattomiin kohteisiin. Pawson & Bader 2014 havaitsivat LED-loukkujen pyydystäneen 48 % enemmän hyönteisiä kuin natriumlamppu. Sciencen toimituksellinen huomautus Lindecke 2026 -tutkimuksessa tunnistaa nimenomaisesti LED-valot biologisen RF-kohinan lähteeksi.",
          "EU:n hehkulamppukielto (direktiivi 244/2009) tarjoaa testattavan luonnollisen kokeen. Kielto vaiheistettiin: >100 W syyskuussa 2009, >75 W 2010, >60 W 2011, kaikki loput 2012, halogeenit 2018. Tämä oli hallinnollisesti pakotettu, ei-itsevalittu, väestönlaajuinen siirtymä nollasta IF-EMF-lähteestä jatkuviin IF-EMF-lähteisiin, joka koski ~450 miljoonaa ihmistä. Zeghoudi ym. 2025 (Optics & Laser Technology) mittasi suoraan LED-ajurin lähikenttäemission ja vahvisti mitattavat sähkökentän komponentit senttimetrien etäisyydellä.",
          "BERM ennustaa, että EU-maat — joissa valaistussiirtymä oli pakollinen ja samanaikainen — osoittavat kiihtyvää TFR-laskua 2015–2022 (5–10 vuoden viive kumulatiivisesta spermatogeneesivauriosta) verrattuna maihin, joissa kielto tuli voimaan myöhemmin tai ei lainkaan (USA vasta 2023, monet kehitysmaat yhä ilman kieltoa). Tämä on testattavissa olemassa olevalla demografisella datalla käyttäen erotus-erotuksissa-regressiota LED-kiellon ajoituksella käsittelymuuttujana.",
        ],
        studies: [
          { citation: "Boyes ym. (Science Advances)", year: 2021, note: "LED-katuvalot: −47 % yöperhosten toukkia vs valaisemattomat" },
          { citation: "Pawson & Bader (Ecological Applications)", year: 2014, note: "LED-loukut: +48 % hyönteispyydystys vs natrium" },
          { citation: "Tuszynski ym. — TTFields (PMC5129338)", year: 2016, note: "100–300 kHz kentät häiritsevät solunjakautumista (FDA-hyväksytty)" },
          { citation: "LED-sähkönlaatututkimus (PMC9920439)", year: 2023, note: "LED-lamput ylittävät harmonisen särön rajat" },
          { citation: "Havas — dirty electricity (ICEMS)", year: 2006, note: "kHz-suodatus paransi diabetes-/MS-oireita" },
          { citation: "Aerts ym. (Environment International)", year: 2019, note: "IF-kentät (300 Hz–1 MHz) heikosti tutkittuja" },
          { citation: "Zeghoudi ym. (Optics & Laser Technology)", year: 2025, note: "LED-ajurin lähikenttäemissio mitattu" },
          { citation: "EU-direktiivi 244/2009", year: 2009, note: "Hehkulamppujen asteittainen kielto 2009–2012, ei EMF-arviointia" },
          { citation: "IJRB systemaattinen katsaus", year: 2022, note: "IF-EMF (300 Hz–10 MHz) eläintutkimukset: minimaalinen terveystutkimus vs ELF/RF" },
        ],
      },
      {
        id: "display",
        title: "Näyttöteknologiasiirtymä: CRT → LCD/LED",
        paragraphs: [
          "Siirtymä CRT-kuvaputkinäytöistä LCD/LED-litteänäyttöihin (2005–2015) ei ollut pelkkä näyttöteknologian muutos — se oli moninkertaistava EMF-muutos. Näyttöjen lukumäärä kotitaloutta kohti kasvoi ~1:stä ~3–4:ään. Keskimääräinen ruutukoko kasvoi 27\":stä 60\":iin (~5-kertainen pinta-ala). Makuuhuoneen TV-penetraatio nousi 15 %:sta 70 %:iin. Sisäänrakennettu Wi-Fi lisäsi jatkuvan 2,4/5 GHz RF-emission. Katselyetäisyys lyheni. Katseluaika kasvoi suoratoistokulttuurin myötä.",
          "CRT-televisiot eivät olleet EMF-hiljaisia — niiden poikkeutuskäämit tuottivat voimakkaita VLF-kenttiä (15,6 kHz) ja ELF-kenttiä (50 Hz). Mutta nämä olivat yhdestä laitteesta 3–4 m:n etäisyydellä. Korvaaminen useilla Wi-Fi-yhdistetyillä LCD-näytöillä jokaisessa huoneessa, mukaan lukien makuuhuoneessa 1,5–2 m:n päässä pineaalirauhasesta ilta-aikaan, edustaa laadullista muutosta sirkadiaanisessa EMF-altistusprofiilissa.",
          "Makuuhuoneen televisio on erityisen relevantti BERM:n sirkadiaaniselle reitille (Polku C): suuri LED-taustavalaistu, Wi-Fi-yhdistetty näyttö pään korkeudella, toimii illasta melatoniinin tuotantoikkunan läpi, tuottaen sekä sinistä valoa että EMF:ää samanaikaisesti. Moninkertaisuusvaikutus (lukumäärä × koko × makuuhuone × Wi-Fi × tunnit × läheisyys) on paljon suurempi kuin mikään yksittäisen tekijän analyysi antaisi ymmärtää.",
        ],
        studies: [
          { citation: "Näyttömarkkinapenetraatiodata (Statista/GWI)", year: "2005–24", note: "Näyttömäärä 1 → 3,5, makuuhuonepenetraatio 15 % → 70 %" },
          { citation: "Suoratoistokulttuuri ja ruutuajan kasvu", year: "2012–24", note: "Keskimääräinen katseluaika +2,5h suoratoiston myötä" },
        ],
      },
    ],
    seeAlsoTitle: "Katso myös",
    evidenceLink: "← Evidenssiportaali",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function LightingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href={`/${locale}/evidence`} className="text-sm text-accent hover:underline mb-6 inline-block">
        {d.backLink}
      </Link>

      <PageHeader icon={Lightbulb} title={d.title} subtitle={d.subtitle} />

      {/* Thematic narratives */}
      <section className="mb-16">
        <div className="space-y-12 max-w-4xl">
          {d.narratives.map((narrative, ni) => (
            <article key={narrative.id} id={`narrative-${narrative.id}`} className="scroll-mt-24">
              <h3 className="text-lg font-semibold mb-4">
                <span className="font-mono-num text-xs text-accent mr-2">0{ni + 1}</span>
                {narrative.title}
              </h3>
              {narrative.paragraphs.length > 0 && (
                <p className="editorial-rail mb-4 text-[0.95rem] leading-relaxed text-foreground">
                  {narrative.paragraphs[0]}
                </p>
              )}
              <div className="space-y-3 text-sm text-foreground-muted leading-relaxed mb-5">
                {narrative.paragraphs.slice(1).map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                      <th className="py-2 pr-3">{activeLocale === "fi" ? "Viite" : "Citation"}</th>
                      <th className="py-2 pr-3 w-16">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                      <th className="py-2">{activeLocale === "fi" ? "Huomio" : "Note"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {narrative.studies.map((s) => (
                      <tr key={`${s.citation}-${s.year}`} className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-medium text-foreground"><CitationLink citation={s.citation} year={s.year} /></td>
                        <td className="py-2 pr-3 font-mono-num text-foreground-muted">{s.year}</td>
                        <td className="py-2 text-foreground-muted">{s.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {narrative.id === "lighting" && (
                <div className="mt-8">
                  <LightingTransitionTimeline locale={activeLocale} />
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* The Lighting Transition -- IF-EMF from LED drivers */}
      <section id="lighting-transition" className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? "Valaistussiirtymä: termisestä valosta elektroniseen" : "The Lighting Transition: From Thermal to Electronic Light"}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {/* Paragraph 1: What happened */}
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {activeLocale === "fi"
              ? "Vuosina 2009–2019 Euroopan unioni luopui asteittain hehkulampuista ja korvasi ne LED-valaistuksella. Ilmoitettu syy oli energiatehokkuus. Sähkömagneettinen seuraus jäi mainitsematta: jokainen LED-lamppu sisältää hakkuriteholähteen (SMPS), joka muuntaa 230 V AC:n DC:ksi kytkentätaajuudella 20–300 kHz. Tämä toi uuden sähkömagneettisen kanavan — välitaajuuden (IF) — jokaiseen kotiin, toimistoon, kouluun ja sairaalaan, jota ei ollut hehkulamppuaikakaudella. Hehkulamppu on vastus: se tuottaa 50/60 Hz magneettikentän (ELF) suhteessa virtaansa, eikä mitään muuta. LED-lamppu on kytkentäpiiri: se tuottaa ELF:ää (verkkovirrasta), IF:ää (ajurista, 20–300 kHz) ja optista välkyntää (epätäydellisestä DC-tasoituksesta)."
              : "Between 2009 and 2019, the European Union phased out incandescent light bulbs and replaced them with LED lighting. The stated reason was energy efficiency. The electromagnetic consequence was unstated: every LED lamp contains a switched-mode power supply (SMPS) that converts 230V AC to DC at switching frequencies of 20–300 kHz. This introduced a new electromagnetic channel — intermediate frequency (IF) — into every home, office, school, and hospital that did not exist in the incandescent era. An incandescent bulb is a resistor: it produces 50/60 Hz magnetic field (ELF) proportional to its current draw, and nothing else. An LED lamp is a switching circuit: it produces ELF (from the mains), IF (from the driver, 20–300 kHz), and optical flicker (from incomplete DC smoothing)."}
          </p>
          {/* Paragraph 2: Regulatory gap */}
          <p>
            {activeLocale === "fi"
              ? "IF-alue (300 Hz – 10 MHz) sijaitsee säätelyaukossa. ELF (alle 300 Hz) on säädelty ICNIRP:n 2010 ohjeilla. RF (yli 100 kHz) on säädelty ICNIRP:n 1998/2020 ohjeilla. IF-alue jää näiden väliin, päällekkäisin mutta epäjohdonmukaisin rajoin. Vuoden 2022 systemaattinen katsaus International Journal of Radiation Biology -lehdessä totesi: ‘verrattuna ELF- tai RF-EMF-kaistoihin, IF-EMF:n terveysvaikutuksia EI ole tutkittu monipuolisemmista näkökulmista.’ IF-kanavaa ei ole tutkittu siksi, ettei kukaan tutkinut sitä — ei siksi, että se todettiin turvalliseksi."
              : "The IF range (300 Hz – 10 MHz) sits in a regulatory gap. ELF (below 300 Hz) is regulated by ICNIRP’s 2010 guidelines. RF (above 100 kHz) is regulated by ICNIRP’s 1998/2020 guidelines. The IF range falls between the two, with overlapping but inconsistent limits. A 2022 systematic review in the International Journal of Radiation Biology found that ‘compared to ELF or RF EMF bands, studies on health effects with more diverse perspectives of IF-EMF have NOT been conducted.’ The IF channel is unstudied because no one studied it — not because it was found safe. This is the regulatory gap that BERM identifies as the third exposure channel."}
          </p>
          {/* Paragraph 3: Mechanistic evidence */}
          <p>
            {activeLocale === "fi"
              ? "Kolme riippumatonta todistuslinjaa yhdistää IF-taajuudet biologisiin vaikutuksiin. Ensinnäkin Kim ym. (Cell, 2026) osoitti, että 60 Hz pulssi-EMF aktivoi geeniekspression Cyb5b-välitteisten kalsiumoskillaatioiden kautta; heidän geenikytkin käytti 4 kHz taajuutta, joka on suoraan LED-ajureiden tuottamalla IF-alueella. Toiseksi vuoden 2022 tutkimus (Heliyon, PMC9952889) altisti rottia 150 kHz IF-EMR:lle 8 viikon ajan ja havaitsi merkitseviä muutoksia kivesten massassa (p=0.03), interstitiaalisten solujen määrässä (p=0.01) ja FSH-tasoissa (p=0.01). Kolmanneksi Novocuren TTFields — FDA:n hyväksymä syöpähoito — toimii taajuudella 200 kHz tuhoten syöpäsoluja mitoottisen karan häiriön kautta. Jos 200 kHz kentät voivat häiritä solunjakautumista tarkoituksellisesti, ympäristön 200 kHz kentät LED-ajureista voivat häiritä sitä tahattomasti."
              : "Three independent lines of evidence connect IF-frequency EMF to biological effects. First, Kim et al. (Cell, 2026) demonstrated that 60 Hz pulsed EMF activates gene expression via Cyb5b-mediated calcium oscillations; their gene switch used 4 kHz, squarely in the IF range produced by LED drivers. Second, a 2022 study (Heliyon, PMC9952889) exposed rats to 150 kHz IF-EMF for 8 weeks and found significant changes in testicular mass (p=0.03), interstitial cell count (p=0.01), and FSH levels (p=0.01). Third, Novocure’s TTFields — FDA-approved for glioblastoma treatment — operates at 200 kHz, destroying cancer cells through disruption of the mitotic spindle. If 200 kHz fields can disrupt cell division intentionally, environmental 200 kHz fields from LED drivers may disrupt cell division unintentionally."}
          </p>
          {/* Paragraph 4: Blue light insufficient */}
          <p>
            {activeLocale === "fi"
              ? "Konventionaalinen selitys kohdistaa LED:n terveysvaikutukset siniseen valoon, joka suppressoi melatoniinia. BERM ei kiistä tätä mekanismia mutta väittää sen olevan riittämätön. Duraccio ym. (2019) havaitsi, että sinisen valon suodatuslasit EIVÄT merkitsevästi parantaneet nuorten unenlaatua — mikä viittaa siihen, että ei-optinen komponentti (IF-emissiot) saattaa olla tärkeämpi vaikutuspolku. BERM:n ennuste: Faraday-suojattu LED-lamppu (estää IF-emissiot mutta säilyttää identtisen valospektrin) tuottaisi vähemmän biologista häiriötä kuin suojaamaton lamppu identtisellä spektrillä."
              : "The conventional explanation attributes LED’s health effects to blue light suppression of melatonin. BERM does not deny this mechanism but argues it is insufficient. Duraccio et al. (2019) found that blue-light-filtering glasses did NOT significantly improve adolescent sleep quality — suggesting that the non-optical component (IF emissions) may be the more important pathway. BERM’s prediction: a Faraday-shielded LED lamp (blocking IF emissions while preserving identical light output) would produce less biological disruption than an unshielded lamp with identical spectrum. Blue-light filtering addresses the wrong channel."}
          </p>
          {/* Paragraph 5: Natural experiment T1 */}
          <p>
            {activeLocale === "fi"
              ? "EU:n valaistussiirtymä (2009–2019) loi luonnollisen kokeen. Maat jotka ottivat LED-valaistuksen käyttöön aikaisemmin kokivat IF-altistuksen kasvun aikaisemmin. Jos IF vaikuttaa biologisiin päätepisteisiin, TFR-laskun pitäisi kiihtyä enemmän aikaisin omaksuneissa maissa RF-kasvun kontrolloinnin jälkeen. Falsifikaatiotesti T1: vertaa TFR-kiihtyvyyttä ennen ja jälkeen LED-siirtymän alkamisen, kontrolloiden matkapuhelin-/laajakaistakehitystä. Jos kiihtyvyyttä ei ole → IF-kanava ei tuettu. Jos kiihtyvyys korreloi LED-omaksumisajankohtaan → yhteensopiva IF-hypoteesin kanssa."
              : "The EU’s lighting transition (2009–2019) created a natural experiment. Countries that adopted LED lighting earlier experienced IF exposure increases earlier. If IF contributes to biological effects, TFR decline should accelerate more in early-adopting countries after controlling for RF growth. Falsification test T1: Compare TFR acceleration before and after LED transition onset, controlling for mobile/broadband growth. If no acceleration → IF channel not supported. If acceleration correlates with LED adoption timing → consistent with IF hypothesis."}
          </p>
        </div>
        <p className="text-xs text-foreground-muted italic mt-2 max-w-4xl">
          {activeLocale === "fi"
            ? "Episteeminen taso: IF-säätelyaukko [E] (IJRB 2022). Cyb5b-mekanismi [E] (Kim 2026 Cell). 150 kHz hedelmällisyys [E] (Heliyon 2022). TTFields [E] (FDA). Sinisen valon riittämättömyys [C] (Duraccio 2019). LED-DID populaatiotesti [C] (testaamaton)."
            : "Epistemic level: IF regulatory gap [E] (IJRB 2022). Cyb5b mechanism [E] (Kim 2026 Cell). 150 kHz fertility [E] (Heliyon 2022). TTFields [E] (FDA). Blue light insufficiency [C] (Duraccio 2019). LED-DID population test [C] (untested)."}
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{activeLocale === "fi" ? "Viite" : "Citation"}</th>
                <th className="py-2 pr-3 w-16">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                <th className="py-2">{activeLocale === "fi" ? "Löydös" : "Finding"}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">IJRB (Ohkubo & Okano)</td>
                <td className="py-2 pr-3 font-mono-num">2022</td>
                <td className="py-2">{activeLocale === "fi" ? "IF-EMF (300 Hz – 10 MHz) systemaattisesti alitutkittu; säätelyaukko dokumentoitu" : "IF-EMF (300 Hz – 10 MHz) systematically under-researched; regulatory gap documented"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Kim et al. (Cell)</td>
                <td className="py-2 pr-3 font-mono-num">2026</td>
                <td className="py-2">{activeLocale === "fi" ? "Cyb5b EMF-sensori: 60 Hz → Ca²⁺-oskillaatiot → geeniekspressio in vivo (CRISPR-validoitu)" : "Cyb5b EMF sensor: 60 Hz → Ca²⁺ oscillations → gene expression in vivo (CRISPR-validated)"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Heliyon (PMC9952889)</td>
                <td className="py-2 pr-3 font-mono-num">2022</td>
                <td className="py-2">{activeLocale === "fi" ? "150 kHz IF-EMR 8 vk: kivesten massa ↓, interstitiaalisolut ↓, FSH ↑ rotilla" : "150 kHz IF-EMR 8 wk: testicular mass ↓, interstitial cells ↓, FSH ↑ in rats"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">TTFields / Novocure (FDA)</td>
                <td className="py-2 pr-3 font-mono-num">2011</td>
                <td className="py-2">{activeLocale === "fi" ? "200 kHz tuhoaa syöpäsoluja mitoottisen karan häiriöllä (FDA-hyväksytty)" : "200 kHz destroys cancer cells via mitotic spindle disruption (FDA-approved)"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Duraccio et al.</td>
                <td className="py-2 pr-3 font-mono-num">2019</td>
                <td className="py-2">{activeLocale === "fi" ? "Sinisen valon suodatuslasit EIVÄT parantaneet nuorten unta merkitsevästi" : "Blue-light-filtering glasses did NOT significantly improve adolescent sleep"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Milham & Stetzer</td>
                <td className="py-2 pr-3 font-mono-num">2013</td>
                <td className="py-2">{activeLocale === "fi" ? "kHz-transienttien vähentäminen muutti virtsan dopamiinia ja PEA:ta (N=7 pilotti)" : "Reducing kHz transients changed urinary dopamine and PEA (N=7 pilot)"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">CISPR / LISUN</td>
                <td className="py-2 pr-3 font-mono-num">2020</td>
                <td className="py-2">{activeLocale === "fi" ? "LED-ajurit generoivat IF-EMF-kohinaa 65 kHz – 2 MHz" : "LED drivers generate IF-EMF noise at 65 kHz – 2 MHz"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">PMC4896623</td>
                <td className="py-2 pr-3 font-mono-num">2016</td>
                <td className="py-2">{activeLocale === "fi" ? "Cav1.4 (VGCC) edistää verkkokalvon degeneraatiota" : "Cav1.4 (VGCC) promotes retinal degeneration"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">PMC7830240</td>
                <td className="py-2 pr-3 font-mono-num">2021</td>
                <td className="py-2">{activeLocale === "fi" ? "Sinivalon vaara-arviointi: A2E-fotosensitisaatio todellinen, mutta mekanismi päällekkäinen" : "Blue-light hazard assessment: A2E photosensitization real, but mechanism overlapping"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">ScienceDirect</td>
                <td className="py-2 pr-3 font-mono-num">2024</td>
                <td className="py-2">{activeLocale === "fi" ? "Hehkulamput ‘eivät osoittaneet haitallisia vaikutuksia näköön’" : "Incandescent lamps ‘did not demonstrate adverse effects on vision’"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* The Spermatogenesis Connection */}
      <section id="spermatogenesis-connection" className="mb-16 border-t editorial-rule pt-6">
        <span id="sperm" /><span id="pathway-A-mitotic" /><span id="ttfields" />
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? "Spermatogeneesiyhteys" : "The Spermatogenesis Connection"}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {activeLocale === "fi"
              ? "Spermatogeneesi — kypsien siittiöiden tuottaminen kantasoluista — on MITOOTTINEN prosessi. Kantasolut jakautuvat klonaalisten mitoottisten kierrosten kautta ennen erilaistumista siittiöiksi. Tämä tekee spermatogeneesistä luonnostaan haavoittuvan mille tahansa tekijälle joka häiritsee mitoosia."
              : "Spermatogenesis — the production of mature sperm from germ cells — is a MITOTIC process. Germ cells divide clonally through multiple rounds of mitosis before differentiating into spermatozoa. This makes spermatogenesis inherently vulnerable to any agent that disrupts mitosis."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "TTFields, FDA-hyväksytty syöpähoito taajuudella 100–300 kHz, tuhoaa syöpäsoluja juuri häiritsemällä mitoosia. Valmistajan oma tutkimus osoittaa, että NORMAALIEN solujen mitoosi häiriintyy noin 50 kHz:n taajuudella — taajuudella jonka käyttöä syöpähoidossa VÄLTETÄÄN haittavaikutusten minimoimiseksi terveeseen kudokseen (Nature 2020)."
              : "TTFields, the FDA-approved cancer therapy operating at 100–300 kHz, destroys cancer cells precisely by disrupting mitosis. The manufacturer’s own research shows that NORMAL cell mitosis is disrupted at approximately 50 kHz — a frequency chosen to be AVOIDED in cancer treatment to minimize side effects on healthy tissue (Nature 2020)."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "LED-hakkurien kytkentätaajuudet (20–100 kHz) osuvat juuri tälle alueelle. Ympäristön IF-altistus LED-valaistuksesta operoi taajuudella jonka TTFields-tutkimus tunnisti normaalin solunjakautumisen kannalta haitallisimmaksi."
              : "LED driver switching frequencies (20–100 kHz) fall squarely in this range. The environmental IF exposure from LED lighting operates at the frequency that TTFields research identified as most disruptive to normal cell division."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "UWI Trinidadin tutkimusryhmä teki tämän yhteyden eksplisiittiseksi: ‘Koska nisäkkäiden kivesten itusolut lisääntyvät klonaalisesti mitoottisten kierrosten kautta ennen erilaistumista kypsiksi siittiöiksi, IF:n vaikutus lisääntymisriskeihin tässä TTFields-taajuusalueella (100–300 kHz) on tutkittava.’ Heidän 150 kHz tutkimuksensa havaitsi merkitsevän kivesmassan vähenemisen (p=0.03), interstitiaalisten solujen lukumäärän laskun (p=0.01) ja muuttuneet FSH-tasot (p=0.01) (Sundaram 2022)."
              : "The UWI Trinidad research group made this connection explicit: ‘Since mammalian testicular germ cells proliferate clonally via mitotic rounds before differentiating into mature spermatozoa, the effect of IF on reproductive risks in this TTFields frequency range needs to be investigated.’ Their 150 kHz study found significant reductions in testicular mass (p=0.03), interstitial cell count (p=0.01), and altered FSH levels (p=0.01) (Sundaram 2022)."}
          </p>
          <p className="text-xs text-foreground-muted/70 italic">
            {activeLocale === "fi"
              ? "Episteeminen taso: TTFields-mekanismi [E] (FDA-hyväksytty). UWI Trinidad 150 kHz [M|C] (eläinkoe, yksi ryhmä). Ympäristörelevanssi [L] (kenttävoimakkuusero)."
              : "Epistemic level: TTFields mechanism [E] (FDA-approved). UWI Trinidad 150 kHz [M|C] (animal study, single group). Environmental relevance [L] (field strength gap)."}
          </p>
        </div>
      </section>

      {/* VDT Precedent */}
      <section id="vdt-precedent" className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? "VDT-ennakkotapaus: IF-kentät ja lisääntyminen 1980-luvulla" : "The VDT Precedent: IF Fields and Reproduction in the 1980s"}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {activeLocale === "fi"
              ? "1980-luvulla VDT-työntekijöiden (video display terminal) keskuudessa havaittiin keskenmenoklustereita. CRT-monitorien vaakapoikkeutuskäämi tuotti 15–30 kHz IF-kenttiä — sama taajuusalue kuin nykyisten LED-hakkurien. Tapaus ratkesi teknologian vaihdolla (LCD), ei tieteellä."
              : "In the 1980s, clusters of miscarriages were reported among VDT (video display terminal) workers. CRT monitors’ horizontal deflection coils produced 15–30 kHz IF fields — the same frequency range as modern LED drivers. The issue was resolved by technology change (LCD), not by science."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Epidemiologinen näyttö oli ristiriitainen: jotkut tutkimukset osoittivat kohonnutta riskiä (McDonald 1986, Goldhaber 1988), toiset eivät (Schnorr/NIOSH 1991). NIOSH:n tutkimusta pidettiin lopullisena, mutta se käytti VLF-kenttämittauksia (15 kHz) vain karkeana proksi-altistuksena — se ei erottanut pulssimuotoisia kenttiä jatkuvista, eikä mitattu yksittäisten monitorien hetkellistä emissiovaihtelua. Kun LCD-näytöt korvasivat CRT:t 2000-luvulla, IF-altistus VDT-työntekijöiltä hävisi — ja samalla hävisi motiivi tutkia asiaa."
              : "Epidemiological evidence was mixed: some studies showed elevated risk (McDonald 1986, Goldhaber 1988), others did not (Schnorr/NIOSH 1991). The NIOSH study was treated as definitive, but it used VLF field measurements (15 kHz) only as a crude proxy — it did not distinguish pulsed from continuous fields, nor measure individual monitor emission variability. When LCD screens replaced CRTs in the 2000s, IF exposure from VDT workers disappeared — and with it, the motivation to investigate."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "BERM-konteksti: VDT-tapaus on IF-kanavan historiallinen ennakkotapaus. CRT:n 15–30 kHz -kentät ovat samaa taajuusaluetta kuin LED-hakkurien 20–100 kHz -emissiot. VDT-ongelma ‘ratkesi’ korvaamalla CRT:t LCD:illä — mutta LCD:t sisältävät LED-taustavalot, joiden hakkurit tuottavat saman taajuusalueen kenttiä. IF-altistus ei hävinnyt; se siirtyi VDT-työntekijöiltä koko väestöön."
              : "BERM context: The VDT case is a historical precedent for the IF channel. CRT 15–30 kHz fields occupy the same frequency range as LED driver 20–100 kHz emissions. The VDT problem was ‘solved’ by replacing CRTs with LCDs — but LCDs contain LED backlights whose drivers produce fields in the same frequency range. IF exposure did not disappear; it shifted from VDT workers to the entire population."}
          </p>
          <p className="text-xs text-foreground-muted/70 italic">
            {activeLocale === "fi"
              ? "Episteeminen taso: [C] (historiallinen ennakkotapaus). VDT-epidemiologia ei ole todiste IF:n vaarallisuudesta — se on todiste siitä, että IF-kenttien lisääntymisvaikutukset on havaittu aiemmin ja jätetty ratkaisematta."
              : "Epistemic level: [C] (historical precedent). VDT epidemiology is not proof of IF harm — it is evidence that IF field reproductive effects were observed before and left unresolved."}
          </p>
        </div>
      </section>

      {/* See also */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">{d.seeAlsoTitle}</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/${locale}/evidence`}
            className="rounded-lg border border-accent/20 bg-card-bg px-4 py-3 text-accent hover:underline font-semibold text-sm"
          >
            {d.evidenceLink}
          </Link>
        </div>
      </section>
    </div>
  );
}
