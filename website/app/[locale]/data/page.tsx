import type { Metadata } from "next";
import { FieldStateStatus } from "@/components/FieldStateStatus";

const READINESS_TIERS = {
  en: [
    {
      tier: "Technology timing proxy",
      color: "text-status-confirmed",
      borderColor: "border-status-confirmed/30",
      bgColor: "bg-status-confirmed/5",
      status: "163 countries",
      description: "Country-level mobile-subscription and internet-penetration series are available as technology-adoption timing proxies. They support descriptive cohort analysis but are not physical FieldState, local RF dose or organ-exposure inputs.",
      sources: "World Bank WDI, ITU, GSMA Intelligence",
    },
    {
      tier: "Partial FieldState",
      color: "text-status-partial",
      borderColor: "border-status-partial/30",
      bgColor: "bg-status-partial/5",
      status: "Protocol defined, data limited",
      description: "Spatial RF measurement data exists (e.g. ANFR in France, Ofcom in the UK) but has not been joined to the organ-transfer model. Documented units, calibration, spectrum/PSD, B₀ context and circadian timing are required before these observations can enter a FieldState panel.",
      sources: "ANFR (France), Ofcom (UK), national regulators",
    },
    {
      tier: "Measurement-ready FieldState",
      color: "text-status-pending",
      borderColor: "border-status-pending/30",
      bgColor: "bg-status-pending/5",
      status: "No countries yet",
      description: "A measurement-ready FieldState requires documented local field vectors (B₀, ambient RF spectrum/PSD, personal device geometry), organ-specific transfer with posture and circadian context, registered biological endpoints and couple panels. No country currently has all components assembled.",
      sources: "Requires purpose-built measurement campaign",
    },
  ],
  fi: [
    {
      tier: "Teknologian ajoitusproxy",
      color: "text-status-confirmed",
      borderColor: "border-status-confirmed/30",
      bgColor: "bg-status-confirmed/5",
      status: "163 maata",
      description: "Maatason mobiililiittymä- ja internetpenetraatiosarjat ovat saatavilla teknologian käyttöönoton ajoitusproxyna. Ne tukevat kuvailevaa kohorttianalyysiä, mutta eivät ole fysikaalinen FieldState, paikallinen RF-annos tai elinkohtainen altistussyöte.",
      sources: "Maailmanpankki WDI, ITU, GSMA Intelligence",
    },
    {
      tier: "Osittainen FieldState",
      color: "text-status-partial",
      borderColor: "border-status-partial/30",
      bgColor: "bg-status-partial/5",
      status: "Protokolla määritelty, data rajallista",
      description: "Alueellisia RF-mittaustietoja on olemassa (esim. ANFR Ranskassa, Ofcom UK:ssa), mutta niitä ei ole yhdistetty elinsiirtomalliin. Dokumentoidut yksiköt, kalibrointi, spektri/PSD, B₀-konteksti ja vuorokausiajoitus vaaditaan ennen FieldState-paneeliin liittämistä.",
      sources: "ANFR (Ranska), Ofcom (UK), kansalliset sääntelyviranomaiset",
    },
    {
      tier: "Mittaamisvalmis FieldState",
      color: "text-status-pending",
      borderColor: "border-status-pending/30",
      bgColor: "bg-status-pending/5",
      status: "Ei yhtään maata vielä",
      description: "Mittaamisvalmis FieldState vaatii dokumentoidut paikalliset kenttävektorit (B₀, ambientin RF-spektri/PSD, henkilökohtaisen laitteen geometria), elinkohtaisen siirron asennolla ja vuorokausikontekstilla, rekisteröidyt biologiset päätepisteet ja paripaneelit. Missään maassa ei ole kaikkia komponentteja koottuna.",
      sources: "Vaatii tarkoitukseen rakennetun mittauskampanjan",
    },
  ],
} as const;

const t = {
  en: {
    title: "Data Sources",
    subtitle:
      "Data inventory for BERM v19. Sources are separated by what they actually measure; availability is not treated as evidence of a biological or demographic effect.",
    readinessTitle: "Measurement readiness by country tier",
    readinessLead: "BERM v19 classifies every country by what input data is actually available. This makes the gap between a timing proxy and a measurement-ready FieldState explicit rather than hidden.",
    readinessNote: "Measurement-ready means that all named physical inputs are documented. It does not mean a biological effect, a causal estimate or an outcome coefficient has been established.",
    primaryTitle: "Technology-timing proxies",
    primaryDesc:
      "Country-level uptake and connectivity series can support descriptive technology timing and cohort analysis. They are not physical FieldState, local RF dose or organ exposure inputs.",
    rfTitle: "RF measurement data",
    rfDesc:
      "Regulatory and spatial RF records are candidate components of a FieldState panel. They require documented units, calibration, spectrum/PSD, location, B₀ context and organ-transfer assumptions before endpoint analysis.",
    infraTitle: "Infrastructure data",
    infraDesc:
      "Tower and antenna registrations provide source-location context. They do not by themselves establish a geographic organ-exposure gradient.",
    outcomeTitle: "Demographic outcome data (ASFR → TFR)",
    outcomeDesc:
      "WPP age-specific fertility rates (ASFR) are the primary demographic endpoint; TFR is derived after ASFR. Vital statistics help assess timing, parity and registration differences.",
    biomarkerTitle: "Biomarker reference data",
    biomarkerDesc:
      "Reference standards and research syntheses for registered organ endpoints. They inform endpoint selection and protocol design; they do not supply a national bioCap or TFR coefficient.",
    pipelineTitle: "Data pipeline",
    pipelineFlow: "Raw datasets flow through a standardized pipeline before entering the model:",
    pipelineNote:
      "The repository documents source provenance and normalisation separately. A country-year technology series supports descriptive timing until it is joined to a documented local FieldState and a registered endpoint; no implicit conversion to dose or TFR effect is made.",
    licensingTitle: "Licensing",
    licData: "All datasets used are either open-access or cited with permission under their respective licenses.",
    licCode: "MIT License -- free to use, modify, and distribute with attribution.",
    licDocs: "CC BY-4.0 -- share and adapt with appropriate credit.",
    dataNote:
      "Availability note: Some sources require registration. Open demographic and technology-timing series reproduce the descriptive cohort analysis, not a BERM v19 effect estimate or country forecast.",
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
      "BERM v19:n dataluettelo. Lähteet erotellaan sen mukaan, mitä ne todella mittaavat; saatavuutta ei käsitellä biologisen tai demografisen vaikutuksen evidenssinä.",
    readinessTitle: "Mittaamisvalmius maatasoittain",
    readinessLead: "BERM v19 luokittelee jokaisen maan sen mukaan, mitä syötedataa on todella saatavilla. Tämä tekee eron ajoitusproxyn ja mittaamisvalmiin FieldStaten välillä näkyväksi piilossa pitämisen sijaan.",
    readinessNote: "Mittaamisvalmis tarkoittaa, että kaikki nimetyt fysikaaliset syötteet on dokumentoitu. Se ei tarkoita, että biologinen vaikutus, kausaaliarvio tai tuloskerroin olisi osoitettu.",
    primaryTitle: "Teknologian ajoitusproksit",
    primaryDesc:
      "Maatason käyttöönotto- ja yhteyssarjat tukevat kuvailevaa teknologia-ajoitus- ja kohorttianalyysiä. Ne eivät ole fysikaalinen FieldState, paikallinen RF-annos tai elinkohtainen altistussyöte.",
    rfTitle: "RF-mittausdata",
    rfDesc:
      "Sääntely- ja spatiaalisen RF-datan tietueet ovat FieldState-paneelin mahdollisia osia. Ne tarvitsevat dokumentoidut yksiköt, kalibroinnin, spektrin/PSD:n, sijainnin, B₀-kontekstin ja elinsiirto-oletukset ennen endpoint-analyysiä.",
    infraTitle: "Infrastruktuuridata",
    infraDesc:
      "Masto- ja antennirekisterit antavat lähdesijainnin kontekstia. Ne eivät yksin osoita maantieteellistä elinkohtaista altistusgradienttia.",
    outcomeTitle: "Demografinen tulosdata (ASFR → TFR)",
    outcomeDesc:
      "WPP:n ikäryhmäkohtainen hedelmällisyys (ASFR) on ensisijainen demografinen päätepiste; TFR johdetaan ASFR:n jälkeen. Vitaalitilastot auttavat arvioimaan ajoitus-, pariteetti- ja rekisteröintieroja.",
    biomarkerTitle: "Biomarkkereiden referenssidata",
    biomarkerDesc:
      "Referenssistandardit ja tutkimussynteesit rekisteröidyille elinpäätepisteille. Ne ohjaavat päätepistevalintaa ja protokollaa, eivät anna kansallista bioCap- tai TFR-kerrointa.",
    pipelineTitle: "Dataputki",
    pipelineFlow: "Raakadatasetit kulkevat standardoidun putken läpi ennen malliin syöttämistä:",
    pipelineNote:
      "Repo dokumentoi lähdeprovenienssin ja normalisoinnin erikseen. Maa–vuosi-teknologiasarja tukee kuvailevaa ajoitusta, kunnes se yhdistetään dokumentoituun paikalliseen FieldStateen ja rekisteröityyn päätepisteeseen; implisiittistä muunnosta annokseksi tai TFR-vaikutukseksi ei tehdä.",
    licensingTitle: "Lisensointi",
    licData: "Kaikki käytetyt datasetit ovat joko avoimesti saatavilla tai viitattu luvalla niiden omilla lisensseillä.",
    licCode: "MIT-lisenssi -- vapaasti käytettävissä, muokattavissa ja jaettavissa lähdeviitteellä.",
    licDocs: "CC BY-4.0 -- jaa ja muokkaa asianmukaisella lähdeviitteellä.",
    dataNote:
      "Saatavuushuomautus: Jotkin lähteet vaativat rekisteröitymisen. Avoimet demografia- ja teknologia-ajoitussarjat toistavat kuvailevan kohorttianalyysin, eivät BERM v19-vaikutusarviota tai maaennustetta.",
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locale === "fi"
    ? {
        title: "Datalähteet - Extinction Field",
        description:
          "BERM BERM v19:n teknologiakehityksen ajoitusproksit, ehdokas-RF-mittaustietueet, demografiset sarjat ja päätepistereferenssit.",
      }
    : {
        title: "Data Sources - Extinction Field",
        description:
          "BERM BERM v19 technology-timing proxies, candidate RF measurement records, demographic series and endpoint references.",
      };
}

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-card-border bg-card-bg rounded-lg p-6 ${className}`}
    >
      {children}
    </div>
  );
}

function ProviderBadge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap"
      style={{
        backgroundColor: `${color}18`,
        color,
        border: `1px solid ${color}40`,
      }}
    >
      {label}
    </span>
  );
}

function DataSourceCard({
  id,
  name,
  provider,
  providerColor,
  description,
  coverage,
  frequency,
  url,
  urlNote,
  coverageLabel,
  frequencyLabel,
}: {
  id?: string;
  name: string;
  provider: string;
  providerColor: string;
  description: string;
  coverage: string;
  frequency: string;
  url?: string;
  urlNote?: string;
  coverageLabel: string;
  frequencyLabel: string;
}) {
  return (
    <SectionCard>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          {id && (
            <p className="text-xs font-mono-num text-foreground-muted mb-1">
              {id}
            </p>
          )}
          <h3 className="text-base font-semibold leading-snug">{name}</h3>
        </div>
        <ProviderBadge label={provider} color={providerColor} />
      </div>
      <p className="text-sm text-foreground-muted leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-foreground-muted mb-4">
        <span>
          <strong className="text-foreground">{coverageLabel}:</strong>{" "}
          {coverage}
        </span>
        <span>
          <strong className="text-foreground">{frequencyLabel}:</strong>{" "}
          {frequency}
        </span>
      </div>
      {url && (
        <a
          href={url.startsWith("http") ? url : `https://${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted text-xs font-medium rounded-md transition-colors"
        >
          {url.replace(/^https?:\/\//, "")}
          {urlNote && (
            <span className="text-foreground-muted ml-1">({urlNote})</span>
          )}
          <svg
            className="w-3 h-3 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
            />
          </svg>
        </a>
      )}
    </SectionCard>
  );
}

const dataSources = {
  en: {
    d1: {
      name: "Mobile Cellular Subscriptions",
      description:
        "Mobile cellular subscriptions per 100 inhabitants. A technology-adoption timing proxy for descriptive cohort analysis; not a physical RF or FieldState measure.",
      coverage: "200+ countries, 1990 -- present",
      frequency: "Annual",
    },
    d2: {
      name: "Mobile Connectivity Index",
      description:
        "Composite index measuring infrastructure deployment, affordability, consumer readiness, and content availability. Useful context for technology diffusion, not an exposure-weighting coefficient.",
      coverage: "170 countries",
      frequency: "Annual",
    },
    d3: {
      name: "National RF Field Strength Surveys",
      description:
        "Measured ambient RF levels reported by national spectrum authorities. These observations need protocol-, spectrum-, location- and calibration metadata before they can contribute to a FieldState panel.",
      coverage: "Varies by country",
      frequency: "Periodic",
    },
    d4: {
      name: "Connected Nations Reports",
      description:
        "100-metre grid coverage and signal-strength data for mobile networks. It supports spatial context; it is not by itself a ground-truth organ exposure or endpoint calibration.",
      coverage: "United Kingdom",
      frequency: "Annual",
    },
    o4: {
      name: "Antenna Structure Registration",
      description:
        "Registered antenna structures including tower locations, heights, and types. Candidate source-location context for a future measured FieldState protocol; not an active U.S. organ-exposure model.",
      coverage: "United States",
      frequency: "Continuously updated",
    },
    wpp: {
      name: "World Population Prospects",
      description:
        "Demographic estimates including age-specific fertility rates and TFR. WPP ASFR is the primary demographic reference for the active route.",
      coverage: "All countries",
      frequency: "Periodic revisions",
    },
    wbFert: {
      name: "Fertility Rate (World Bank)",
      description:
        "World Bank total fertility rate indicator, drawing on UN Population Division and national-statistical sources. Used as a cross-check against WPP estimates.",
      coverage: "200+ countries",
      frequency: "Annual",
    },
    nso: {
      name: "National Statistics Offices",
      description:
        "Country-specific vital statistics from agencies like Statistics Finland (Tilastokeskus), KOSIS (South Korea), and ONS (UK). Used for high-frequency sub-annual fertility tracking.",
      coverage: "Country-specific",
      frequency: "Quarterly to annual",
    },
    levine: {
      name: "Sperm Concentration Trends Meta-analysis",
      description:
        "A historical research synthesis on sperm-concentration trends. It provides context for endpoint selection, not a biological-capacity decline curve or national parameter.",
      coverage: "42,935 men, 185 studies",
      frequency: "Published 2017",
    },
    who: {
      name: "WHO Semen Analysis Reference Values",
      description:
        "Clinical reference ranges for semen parameters (concentration, motility, morphology). 6th edition published 2021. A reference for endpoint selection and future protocol design, not an active BERM calibration boundary.",
      coverage: "Global clinical standard",
      frequency: "Published 2021",
    },
  },
  fi: {
    d1: {
      name: "Matkapuhelinliittymät",
      description:
        "Matkapuhelinliittymät 100 asukasta kohti. Teknologian käyttöönoton ajoitusproksi kuvailevaan kohorttianalyysiin; ei fysikaalinen RF- tai FieldState-mittaus.",
      coverage: "200+ maata, 1990 -- nykyhetki",
      frequency: "Vuosittainen",
    },
    d2: {
      name: "Mobiiliyhteyksien indeksi",
      description:
        "Komposiitti-indeksi infrastruktuurin käyttöönotosta, edullisuudesta, kuluttajavalmiudesta ja sisällön saatavuudesta. Käyttökelpoinen teknologian diffuusion kontekstina, ei altistuspainona.",
      coverage: "170 maata",
      frequency: "Vuosittainen",
    },
    d3: {
      name: "Kansalliset RF-kenttävoimakkuustutkimukset",
      description:
        "Kansallisten taajuusviranomaisten raportoimat ympäristön RF-tasot. Havainnot tarvitsevat protokolla-, spektri-, sijainti- ja kalibrointimetatiedot ennen FieldState-paneeliin liittämistä.",
      coverage: "Vaihtelee maittain",
      frequency: "Jaksottainen",
    },
    d4: {
      name: "Connected Nations -raportit",
      description:
        "100 metrin ruudukon kattavuus- ja signaalivoimakkuusdata mobiiliverkoille. Tukee spatiaalista kontekstia; ei yksin ole todellinen elinkohtainen altistus tai endpoint-kalibrointi.",
      coverage: "Yhdistynyt kuningaskunta",
      frequency: "Vuosittainen",
    },
    o4: {
      name: "Antennirakenteiden rekisteri",
      description:
        "Rekisteröidyt antennirakenteet sisältäen mastojen sijainnit, korkeudet ja tyypit. Mahdollinen lähdesijainnin konteksti tulevalle mitatulle FieldState-protokollalle; ei aktiivinen Yhdysvaltain elinkohtainen altistusmalli.",
      coverage: "Yhdysvallat",
      frequency: "Jatkuvasti päivitetty",
    },
    wpp: {
      name: "World Population Prospects",
      description:
        "Väestöarviot, mukaan lukien ikäryhmäkohtainen hedelmällisyys ja TFR. WPP:n ASFR on aktiivisen reitin ensisijainen demografinen referenssi.",
      coverage: "Kaikki maat",
      frequency: "Julkaisukierroksittain",
    },
    wbFert: {
      name: "Hedelmällisyysluku (Maailmanpankki)",
      description:
        "Maailmanpankin kokonaishedelmällisyysindikaattori, joka pohjaa YK:n väestöosaston ja kansallisten tilastojen lähteisiin. Käytetään ristiintarkistuksena WPP-arvioita vasten.",
      coverage: "200+ maata",
      frequency: "Vuosittainen",
    },
    nso: {
      name: "Kansalliset tilastovirastot",
      description:
        "Maakohtaiset vitaalitilastot virastoilta kuten Tilastokeskus (Suomi), KOSIS (Etelä-Korea) ja ONS (UK). Käytetään korkeataajuiseen alle vuoden syntyvyysseurantaan.",
      coverage: "Maakohtainen",
      frequency: "Neljännesvuosittain - vuosittain",
    },
    levine: {
      name: "Siittiöpitoisuustrendien meta-analyysi",
      description:
        "Historiallinen tutkimussynteesi siittiöpitoisuuden trendeistä. Se antaa kontekstia päätepistevalinnalle, ei biologisen kapasiteetin laskukäyrää tai kansallista parametria.",
      coverage: "42 935 miestä, 185 tutkimusta",
      frequency: "Julkaistu 2017",
    },
    who: {
      name: "WHO:n siemennesteanalyysin referenssiarvot",
      description:
        "Kliiniset viitearvot siemennesteen parametreille (pitoisuus, liikkuvuus, morfologia). 6. painos julkaistu 2021. Referenssi päätepistevalinnalle ja tulevalle protokollasuunnittelulle, ei aktiivinen BERM-kalibrointiraja.",
      coverage: "Globaali kliininen standardi",
      frequency: "Julkaistu 2021",
    },
  },
} as const;

export default async function DataPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = locale === "fi" ? t.fi : t.en;
  const ds = locale === "fi" ? dataSources.fi : dataSources.en;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-3">{d.title}</h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          {d.subtitle}
        </p>
      </header>

      <section className="mb-14">
        <FieldStateStatus locale={locale === "fi" ? "fi" : "en"} />
      </section>

      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.readinessTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-8 max-w-4xl">{d.readinessLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {READINESS_TIERS[locale === "fi" ? "fi" : "en"].map((tier) => (
            <div key={tier.tier} className={`border ${tier.borderColor} ${tier.bgColor} rounded-lg p-5`}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
                <h3 className={`text-base font-semibold ${tier.color}`}>{tier.tier}</h3>
                <span className="text-xs font-mono-num text-foreground-muted">{tier.status}</span>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-2">{tier.description}</p>
              <p className="text-xs text-foreground-muted">{locale === "fi" ? "Lähteet" : "Sources"}: {tier.sources}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-foreground-muted leading-relaxed max-w-4xl italic">{d.readinessNote}</p>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2">{d.primaryTitle}</h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          {d.primaryDesc}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataSourceCard
            id="D1"
            name={ds.d1.name}
            provider="ITU / World Bank"
            providerColor="#3b82f6"
            description={ds.d1.description}
            coverage={ds.d1.coverage}
            frequency={ds.d1.frequency}
            url="https://data.worldbank.org"
            coverageLabel={d.coverage}
            frequencyLabel={d.frequency}
          />
          <DataSourceCard
            id="D2"
            name={ds.d2.name}
            provider="GSMA Intelligence"
            providerColor="#8b5cf6"
            description={ds.d2.description}
            coverage={ds.d2.coverage}
            frequency={ds.d2.frequency}
            url="https://gsma.com/mobilefordevelopment/mci"
            urlNote={locale === "fi" ? "vaatii rekisteröitymisen" : "requires registration"}
            coverageLabel={d.coverage}
            frequencyLabel={d.frequency}
          />
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2">{d.rfTitle}</h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          {d.rfDesc}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataSourceCard
            id="D3"
            name={ds.d3.name}
            provider={locale === "fi" ? "Eri sääntelyviranomaiset" : "Various regulators"}
            providerColor="#f59e0b"
            description={ds.d3.description}
            coverage={ds.d3.coverage}
            frequency={ds.d3.frequency}
            coverageLabel={d.coverage}
            frequencyLabel={d.frequency}
          />
          <DataSourceCard
            id="D4"
            name={ds.d4.name}
            provider="Ofcom"
            providerColor="#10b981"
            description={ds.d4.description}
            coverage={ds.d4.coverage}
            frequency={ds.d4.frequency}
            url="https://ofcom.org.uk"
            coverageLabel={d.coverage}
            frequencyLabel={d.frequency}
          />
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2">{d.infraTitle}</h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          {d.infraDesc}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataSourceCard
            id="O4"
            name={ds.o4.name}
            provider="US FCC"
            providerColor="#ef4444"
            description={ds.o4.description}
            coverage={ds.o4.coverage}
            frequency={ds.o4.frequency}
            url="https://fcc.gov/asr"
            coverageLabel={d.coverage}
            frequencyLabel={d.frequency}
          />
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2">{d.outcomeTitle}</h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          {d.outcomeDesc}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataSourceCard
            name={ds.wpp.name}
            provider="UN DESA"
            providerColor="#3b82f6"
            description={ds.wpp.description}
            coverage={ds.wpp.coverage}
            frequency={ds.wpp.frequency}
            url="https://population.un.org"
            coverageLabel={d.coverage}
            frequencyLabel={d.frequency}
          />
          <DataSourceCard
            name={ds.wbFert.name}
            provider={locale === "fi" ? "Maailmanpankki" : "World Bank"}
            providerColor="#3b82f6"
            description={ds.wbFert.description}
            coverage={ds.wbFert.coverage}
            frequency={ds.wbFert.frequency}
            url="https://data.worldbank.org"
            coverageLabel={d.coverage}
            frequencyLabel={d.frequency}
          />
          <DataSourceCard
            name={ds.nso.name}
            provider={locale === "fi" ? "Useita" : "Various"}
            providerColor="#f59e0b"
            description={ds.nso.description}
            coverage={ds.nso.coverage}
            frequency={ds.nso.frequency}
            coverageLabel={d.coverage}
            frequencyLabel={d.frequency}
          />
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-2">{d.biomarkerTitle}</h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          {d.biomarkerDesc}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataSourceCard
            name={ds.levine.name}
            provider="Levine et al. 2017"
            providerColor="#8b5cf6"
            description={ds.levine.description}
            coverage={ds.levine.coverage}
            frequency={ds.levine.frequency}
            coverageLabel={d.coverage}
            frequencyLabel={d.frequency}
          />
          <DataSourceCard
            name={ds.who.name}
            provider="WHO (6th ed.)"
            providerColor="#10b981"
            description={ds.who.description}
            coverage={ds.who.coverage}
            frequency={ds.who.frequency}
            coverageLabel={d.coverage}
            frequencyLabel={d.frequency}
          />
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4">{d.pipelineTitle}</h2>
        <SectionCard>
          <p className="text-sm text-foreground-muted leading-relaxed mb-4">
            {d.pipelineFlow}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-sm mb-4">
            <span className="px-3 py-1.5 bg-background-secondary rounded-md font-medium">
              {d.rawData}
            </span>
            <span className="text-foreground-muted">&rarr;</span>
            <span className="px-3 py-1.5 bg-background-secondary rounded-md font-mono-num text-xs">
              berm/berm/data/
            </span>
            <span className="text-foreground-muted">&rarr;</span>
            <span className="px-3 py-1.5 bg-background-secondary rounded-md font-medium">
              {d.standardized}
            </span>
            <span className="text-foreground-muted">&rarr;</span>
            <span className="px-3 py-1.5 bg-background-secondary rounded-md font-medium">
              {d.modelInput}
            </span>
          </div>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.pipelineNote}
          </p>
        </SectionCard>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{d.licensingTitle}</h2>
        <SectionCard>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium mb-1">{d.dataLabel}</p>
              <p className="text-foreground-muted leading-relaxed">
                {d.licData}
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">{d.modelCode}</p>
              <p className="text-foreground-muted leading-relaxed">
                {d.licCode}
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">{d.documentation}</p>
              <p className="text-foreground-muted leading-relaxed">
                {d.licDocs}
              </p>
            </div>
          </div>
        </SectionCard>
      </section>

      <section className="mt-8">
        <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
          {d.dataNote}
        </p>
      </section>
    </div>
  );
}
