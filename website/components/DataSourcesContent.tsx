import type { Locale } from "@/lib/i18n";

const t = {
  en: {
    title: "Data Sources",
    subtitle:
      "Every dataset used in the BERM model is either open-access or publicly cited. This page documents each source, its provider, coverage, and update cadence so that any researcher can reproduce our results from scratch.",
    primaryTitle: "Primary exposure data",
    primaryDesc:
      "Country-level indices of mobile infrastructure and connectivity used as the main EMF exposure proxy in the model.",
    rfTitle: "RF measurement data",
    rfDesc:
      "Directly measured ambient radiofrequency field strengths from national regulators. Used for model validation and calibration against the subscription-based proxy.",
    infraTitle: "Infrastructure data",
    infraDesc:
      "Tower and antenna registrations used to model geographic exposure gradients within countries.",
    outcomeTitle: "Outcome data (TFR)",
    outcomeDesc:
      "Total fertility rate and vital statistics used as the dependent variable in BERM calibration and prediction evaluation.",
    biomarkerTitle: "Biomarker reference data",
    biomarkerDesc:
      "Meta-analyses and reference standards for human reproductive biomarkers. Used to calibrate the biological capacity layer of the model.",
    pipelineTitle: "Data pipeline",
    pipelineFlow:
      "Raw datasets flow through a standardized pipeline before entering the model:",
    pipelineNote:
      "Python loaders in berm/berm/data/ handle fetching, caching, and normalization. The ITU/World Bank loader is already implemented: it fetches from the World Bank API with local caching and rate-limit handling. Each loader produces a consistent country-year panel format that the model consumes directly.",
    licensingTitle: "Licensing",
    licData:
      "All datasets used are either open-access or cited with permission under their respective licenses.",
    licCode:
      "MIT License -- free to use, modify, and distribute with attribution.",
    licDocs: "CC BY-4.0 -- share and adapt with appropriate credit.",
    dataNote:
      "Data availability note: Some sources (particularly GSMA MCI) require registration. Where data access is restricted, we document the source and methodology so that researchers with access can reproduce the analysis. All model outputs can be reproduced using only the open-access sources (D1, TFR).",
    coverage: "Coverage",
    frequency: "Frequency",
    dataLabel: "Data",
    modelCode: "Model code",
    documentation: "Documentation",
    rawData: "Raw data",
    standardized: "Standardized format",
    modelInput: "Model input",
  },
  fi: {
    title: "Datalähteet",
    subtitle:
      "Jokainen BERM-mallissa käytetty datasetti on joko avoimesti saatavilla tai julkisesti viitattu. Tämä sivu dokumentoi kunkin lähteen, sen tarjoajan, kattavuuden ja päivitystahdin, jotta kuka tahansa tutkija voi toistaa tuloksemme alusta asti.",
    primaryTitle: "Ensisijainen altistusdata",
    primaryDesc:
      "Maatason mobiili-infrastruktuurin ja yhteyksien indeksit, joita käytetään mallin pääasiallisena EMF-altistuksen proksimuuttujana.",
    rfTitle: "RF-mittausdata",
    rfDesc:
      "Kansallisten sääntelyviranomaisten suoraan mittaamat ympäristön radiotaajuuskenttävoimakkuudet. Käytetään mallin validointiin ja kalibrointiin tilauspohjaiseen proksiin nähden.",
    infraTitle: "Infrastruktuuridata",
    infraDesc:
      "Masto- ja antennirekisterit, joita käytetään maantieteellisten altistuserojen mallintamiseen maiden sisällä.",
    outcomeTitle: "Tulosdata (TFR)",
    outcomeDesc:
      "Kokonaishedelmällisyysluku ja vitaalitilastot, joita käytetään riippuvana muuttujana BERM:n kalibroinnissa ja ennusteiden arvioinnissa.",
    biomarkerTitle: "Biomarkkereiden referenssidata",
    biomarkerDesc:
      "Meta-analyysit ja referenssistandardit ihmisen lisääntymisbiomarkkereille. Käytetään mallin biologisen kapasiteettikerroksen kalibrointiin.",
    pipelineTitle: "Dataputki",
    pipelineFlow:
      "Raakadatasetit kulkevat standardoidun putken läpi ennen malliin syöttämistä:",
    pipelineNote:
      "Python-lataajat berm/berm/data/-hakemistossa hoitavat haun, välimuistin ja normalisoinnin. ITU/Maailmanpankki-lataaja on jo toteutettu: se hakee Maailmanpankin API:sta paikallisella välimuistilla ja nopeusrajoitusten käsittelyllä. Jokainen lataaja tuottaa yhdenmukaisen maa-vuosi-paneeliformaatin, jonka malli kuluttaa suoraan.",
    licensingTitle: "Lisensointi",
    licData:
      "Kaikki käytetyt datasetit ovat joko avoimesti saatavilla tai viitattu luvalla niiden omilla lisensseillä.",
    licCode:
      "MIT-lisenssi -- vapaasti käytettävissä, muokattavissa ja jaettavissa lähdeviitteellä.",
    licDocs: "CC BY-4.0 -- jaa ja muokkaa asianmukaisella lähdeviitteellä.",
    dataNote:
      "Huomautus datan saatavuudesta: Jotkut lähteet (erityisesti GSMA MCI) vaativat rekisteröitymisen. Kun datan saatavuus on rajoitettu, dokumentoimme lähteen ja menetelmän, jotta tutkijat joilla on pääsy voivat toistaa analyysin. Kaikki mallin tulosteet voidaan toistaa pelkästään avoimilla lähteillä (D1, TFR).",
    coverage: "Kattavuus",
    frequency: "Päivitystahti",
    dataLabel: "Data",
    modelCode: "Mallikoodi",
    documentation: "Dokumentaatio",
    rawData: "Raakadata",
    standardized: "Standardoitu formaatti",
    modelInput: "Mallin syöte",
  },
} as const;

const dataSources = {
  en: {
    d1: { name: "Mobile Cellular Subscriptions", description: "Mobile cellular subscriptions per 100 inhabitants. The primary proxy for population-level RF exposure intensity in BERM.", coverage: "200+ countries, 1990 -- present", frequency: "Annual" },
    d2: { name: "Mobile Connectivity Index", description: "Composite index measuring infrastructure deployment, affordability, consumer readiness, and content availability. Used to weight exposure estimates across markets.", coverage: "170 countries", frequency: "Annual" },
    d3: { name: "National RF Field Strength Surveys", description: "Measured ambient RF levels in V/m from national spectrum authorities including ARPANSA (Australia), SSM (Sweden), and BfS (Germany).", coverage: "Varies by country", frequency: "Periodic" },
    d4: { name: "Connected Nations Reports", description: "100-metre grid resolution coverage and signal strength data for mobile networks. Provides ground-truth RF exposure levels for UK calibration.", coverage: "United Kingdom", frequency: "Annual" },
    o4: { name: "Antenna Structure Registration", description: "Registered antenna structures including tower locations, heights, and types. Used for spatial exposure modelling in the United States.", coverage: "United States", frequency: "Continuously updated" },
    wpp: { name: "World Population Prospects", description: "Comprehensive demographic estimates and projections including total fertility rate by country. The primary TFR reference dataset for BERM.", coverage: "All countries", frequency: "Biennial" },
    wbFert: { name: "Fertility Rate (World Bank)", description: "Crude birth rate and total fertility rate sourced from UN Population Division and national statistics. Used as a cross-check against WPP estimates.", coverage: "200+ countries", frequency: "Annual" },
    nso: { name: "National Statistics Offices", description: "Country-specific vital statistics from agencies like Statistics Finland (Tilastokeskus), KOSIS (South Korea), and ONS (UK). Used for high-frequency sub-annual fertility tracking.", coverage: "Country-specific", frequency: "Quarterly to annual" },
    levine: { name: "Sperm Concentration Trends Meta-analysis", description: "Systematic review and meta-regression of sperm concentration trends from 1973 to 2011. Covers 42,935 men across 185 studies. Foundational dataset for the biological capacity decline curve.", coverage: "42,935 men, 185 studies", frequency: "Published 2017" },
    who: { name: "WHO Semen Analysis Reference Values", description: "Clinical reference ranges for semen parameters (concentration, motility, morphology). 6th edition published 2021. Used to define the normal-range boundaries in BERM.", coverage: "Global clinical standard", frequency: "Published 2021" },
  },
  fi: {
    d1: { name: "Matkapuhelinliittymät", description: "Matkapuhelinliittymät 100 asukasta kohti. Ensisijainen proksimuuttuja väestötason RF-altistuksen intensiteetille BERM:ssä.", coverage: "200+ maata, 1990 -- nykyhetki", frequency: "Vuosittainen" },
    d2: { name: "Mobiiliyhteyksien indeksi", description: "Komposiitti-indeksi, joka mittaa infrastruktuurin käyttöönottoa, edullisuutta, kuluttajavalmiutta ja sisällön saatavuutta. Käytetään altistusarvioiden painottamiseen markkinoiden välillä.", coverage: "170 maata", frequency: "Vuosittainen" },
    d3: { name: "Kansalliset RF-kenttävoimakkuustutkimukset", description: "Kansallisten taajuusviranomaisten mittaamat ympäristön RF-tasot V/m:ssä, mukaan lukien ARPANSA (Australia), SSM (Ruotsi) ja BfS (Saksa).", coverage: "Vaihtelee maittain", frequency: "Jaksottainen" },
    d4: { name: "Connected Nations -raportit", description: "100 metrin ruudukko-resoluution kattavuus- ja signaalivoimakkuusdata mobiiliverkoille. Tarjoaa todellisen RF-altistustason UK:n kalibrointiin.", coverage: "Yhdistynyt kuningaskunta", frequency: "Vuosittainen" },
    o4: { name: "Antennirakenteiden rekisteri", description: "Rekisteröidyt antennirakenteet sisältäen mastojen sijainnit, korkeudet ja tyypit. Käytetään spatiaalisen altistuksen mallintamiseen Yhdysvalloissa.", coverage: "Yhdysvallat", frequency: "Jatkuvasti päivitetty" },
    wpp: { name: "World Population Prospects", description: "Kattavat väestöarviot ja -ennusteet sisältäen kokonaishedelmällisyysluvun maittain. BERM:n ensisijainen TFR-referenssidatasetti.", coverage: "Kaikki maat", frequency: "Kahden vuoden välein" },
    wbFert: { name: "Hedelmällisyysluku (Maailmanpankki)", description: "Karkea syntyvyysluku ja kokonaishedelmällisyysluku YK:n väestöosastolta ja kansallisista tilastoista. Käytetään ristiintarkistuksena WPP-arvioita vasten.", coverage: "200+ maata", frequency: "Vuosittainen" },
    nso: { name: "Kansalliset tilastovirastot", description: "Maakohtaiset vitaalitilastot virastoilta kuten Tilastokeskus (Suomi), KOSIS (Etelä-Korea) ja ONS (UK). Käytetään korkeataajuiseen alle vuoden syntyvyysseurantaan.", coverage: "Maakohtainen", frequency: "Neljännesvuosittain - vuosittain" },
    levine: { name: "Siittiöpitoisuustrendien meta-analyysi", description: "Systemaattinen katsaus ja meta-regressio siittiöpitoisuustrendeistä 1973--2011. Kattaa 42 935 miestä 185 tutkimuksesta. Perusdatasetti biologisen kapasiteetin laskukäyrälle.", coverage: "42 935 miestä, 185 tutkimusta", frequency: "Julkaistu 2017" },
    who: { name: "WHO:n siemennesteanalyysin referenssiarvot", description: "Kliiniset viitearvot siemennesteen parametreille (pitoisuus, liikkuvuus, morfologia). 6. painos julkaistu 2021. Käytetään BERM:n normaalivaihtelun rajojen määrittämiseen.", coverage: "Globaali kliininen standardi", frequency: "Julkaistu 2021" },
  },
} as const;

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`border border-card-border bg-card-bg rounded-lg p-6 ${className}`}>{children}</div>;
}

function ProviderBadge({ label, color }: { label: string; color: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap" style={{ backgroundColor: `${color}18`, color, border: `1px solid ${color}40` }}>
      {label}
    </span>
  );
}

function DataSourceCard({ id, name, provider, providerColor, description, coverage, frequency, url, urlNote, coverageLabel, frequencyLabel }: {
  id?: string; name: string; provider: string; providerColor: string; description: string; coverage: string; frequency: string; url?: string; urlNote?: string; coverageLabel: string; frequencyLabel: string;
}) {
  return (
    <SectionCard>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          {id && <p className="text-xs font-mono-num text-foreground-muted mb-1">{id}</p>}
          <h3 className="text-base font-semibold leading-snug">{name}</h3>
        </div>
        <ProviderBadge label={provider} color={providerColor} />
      </div>
      <p className="text-sm text-foreground-muted leading-relaxed mb-4">{description}</p>
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-foreground-muted mb-4">
        <span><strong className="text-foreground">{coverageLabel}:</strong> {coverage}</span>
        <span><strong className="text-foreground">{frequencyLabel}:</strong> {frequency}</span>
      </div>
      {url && (
        <a href={url.startsWith("http") ? url : `https://${url}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted text-xs font-medium rounded-md transition-colors">
          {url.replace(/^https?:\/\//, "")}
          {urlNote && <span className="text-foreground-muted ml-1">({urlNote})</span>}
          <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
        </a>
      )}
    </SectionCard>
  );
}

export function DataSourcesContent({ locale }: { locale: string }) {
  const d = locale === "fi" ? t.fi : t.en;
  const ds = locale === "fi" ? dataSources.fi : dataSources.en;

  return (
    <div>
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2">{d.primaryTitle}</h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">{d.primaryDesc}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataSourceCard id="D1" name={ds.d1.name} provider="ITU / World Bank" providerColor="#3b82f6" description={ds.d1.description} coverage={ds.d1.coverage} frequency={ds.d1.frequency} url="https://data.worldbank.org" coverageLabel={d.coverage} frequencyLabel={d.frequency} />
          <DataSourceCard id="D2" name={ds.d2.name} provider="GSMA Intelligence" providerColor="#8b5cf6" description={ds.d2.description} coverage={ds.d2.coverage} frequency={ds.d2.frequency} url="https://gsma.com/mobilefordevelopment/mci" urlNote={locale === "fi" ? "vaatii rekisteröitymisen" : "requires registration"} coverageLabel={d.coverage} frequencyLabel={d.frequency} />
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2">{d.rfTitle}</h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">{d.rfDesc}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataSourceCard id="D3" name={ds.d3.name} provider={locale === "fi" ? "Eri sääntelyviranomaiset" : "Various regulators"} providerColor="#f59e0b" description={ds.d3.description} coverage={ds.d3.coverage} frequency={ds.d3.frequency} coverageLabel={d.coverage} frequencyLabel={d.frequency} />
          <DataSourceCard id="D4" name={ds.d4.name} provider="Ofcom" providerColor="#10b981" description={ds.d4.description} coverage={ds.d4.coverage} frequency={ds.d4.frequency} url="https://ofcom.org.uk" coverageLabel={d.coverage} frequencyLabel={d.frequency} />
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2">{d.infraTitle}</h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">{d.infraDesc}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataSourceCard id="O4" name={ds.o4.name} provider="US FCC" providerColor="#ef4444" description={ds.o4.description} coverage={ds.o4.coverage} frequency={ds.o4.frequency} url="https://fcc.gov/asr" coverageLabel={d.coverage} frequencyLabel={d.frequency} />
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2">{d.outcomeTitle}</h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">{d.outcomeDesc}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataSourceCard name={ds.wpp.name} provider="UN DESA" providerColor="#3b82f6" description={ds.wpp.description} coverage={ds.wpp.coverage} frequency={ds.wpp.frequency} url="https://population.un.org" coverageLabel={d.coverage} frequencyLabel={d.frequency} />
          <DataSourceCard name={ds.wbFert.name} provider={locale === "fi" ? "Maailmanpankki" : "World Bank"} providerColor="#3b82f6" description={ds.wbFert.description} coverage={ds.wbFert.coverage} frequency={ds.wbFert.frequency} url="https://data.worldbank.org" coverageLabel={d.coverage} frequencyLabel={d.frequency} />
          <DataSourceCard name={ds.nso.name} provider={locale === "fi" ? "Useita" : "Various"} providerColor="#f59e0b" description={ds.nso.description} coverage={ds.nso.coverage} frequency={ds.nso.frequency} coverageLabel={d.coverage} frequencyLabel={d.frequency} />
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2">{d.biomarkerTitle}</h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">{d.biomarkerDesc}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataSourceCard name={ds.levine.name} provider="Levine et al. 2017" providerColor="#8b5cf6" description={ds.levine.description} coverage={ds.levine.coverage} frequency={ds.levine.frequency} coverageLabel={d.coverage} frequencyLabel={d.frequency} />
          <DataSourceCard name={ds.who.name} provider="WHO (6th ed.)" providerColor="#10b981" description={ds.who.description} coverage={ds.who.coverage} frequency={ds.who.frequency} coverageLabel={d.coverage} frequencyLabel={d.frequency} />
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4">{d.pipelineTitle}</h2>
        <SectionCard>
          <p className="text-sm text-foreground-muted leading-relaxed mb-4">{d.pipelineFlow}</p>
          <div className="flex flex-wrap items-center gap-2 text-sm mb-4">
            <span className="px-3 py-1.5 bg-background-secondary rounded-md font-medium">{d.rawData}</span>
            <span className="text-foreground-muted">&rarr;</span>
            <span className="px-3 py-1.5 bg-background-secondary rounded-md font-mono-num text-xs">berm/berm/data/</span>
            <span className="text-foreground-muted">&rarr;</span>
            <span className="px-3 py-1.5 bg-background-secondary rounded-md font-medium">{d.standardized}</span>
            <span className="text-foreground-muted">&rarr;</span>
            <span className="px-3 py-1.5 bg-background-secondary rounded-md font-medium">{d.modelInput}</span>
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed">{d.pipelineNote}</p>
        </SectionCard>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{d.licensingTitle}</h2>
        <SectionCard>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div><p className="font-medium mb-1">{d.dataLabel}</p><p className="text-foreground-muted leading-relaxed">{d.licData}</p></div>
            <div><p className="font-medium mb-1">{d.modelCode}</p><p className="text-foreground-muted leading-relaxed">{d.licCode}</p></div>
            <div><p className="font-medium mb-1">{d.documentation}</p><p className="text-foreground-muted leading-relaxed">{d.licDocs}</p></div>
          </div>
        </SectionCard>
      </section>

      <section className="mt-8">
        <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">{d.dataNote}</p>
      </section>
    </div>
  );
}
