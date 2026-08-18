import type { Metadata } from "next";
import { EPISTEMIC_LEVELS, PATHWAYS, EVIDENCE } from "@/lib/evidence";
import type { EpistemicLevel } from "@/lib/types";

const t = {
  en: {
    title: "Evidence Compilation",
    subtitle:
      "Studies and data supporting and challenging the BERM model, organized by biological pathway. Each entry is rated on the epistemic evidence scale described below.",
    epistemicTitle: "Epistemic level system",
    epistemicDesc:
      "Not all evidence is created equal. Each study is assigned an epistemic level reflecting the strength and type of evidence it provides. This is not a judgment of study quality per se, but of what kind of inference the study supports. A single RCT may be excellent science and still rate L* if it has not been replicated.",
    year: "Year",
    study: "Study",
    finding: "Finding",
    level: "Level",
    footNote:
      "This compilation is maintained as part of the BERM model documentation. Inclusion does not imply endorsement; studies are listed to show what each pathway rests on and where the gaps are. If you know of a study that should be added or believe a rating is incorrect, contributions are welcome via the project repository.",
    attrBiasTitle: "Attribution Bias in Decline Research",
    attrBiasDesc:
      "EMF is structurally invisible in most ecological and reproductive research — not because it was tested and rejected, but because it was never considered. This section documents how conventional attributions (climate change, chemicals, habitat loss) become the default explanation for declines that may have an electromagnetic component.",
    attrBiasP1Title: "Attribution bias",
    attrBiasP1:
      "When a decline is observed, researchers search for explanations among familiar factors. Climate change is well-funded and politically supported. Chemical pollution is regulated and measurable. EMF is unfamiliar to most biologists, unfunded by most agencies, and actively lobbied against by the telecommunications industry. A 2024 analysis of 92 potential drivers of insect decline in Germany did not include electromagnetic fields among the candidates — not because EMF was tested and rejected, but because it was never considered.",
    attrBiasP2Title: "Evidence asymmetry",
    attrBiasP2:
      "There are hundreds of studies on climate change and insect decline. There are fewer than twenty on EMF and insect decline. This disparity does not reflect the relative importance of the two factors — it reflects the structure of research funding. The volume of evidence for a hypothesis tracks the volume of funding, not the strength of the causal relationship.",
    attrBiasP3Title: "Causal masking",
    attrBiasP3:
      "Climate change and EMF infrastructure are temporally correlated: both grew between 1970 and 2024. An OLS regression cannot distinguish between them without an exogenous instrument. When a researcher controls for 'temperature,' they may inadvertently remove the EMF signal — because the two trends move together. The residual appears small, and the researcher concludes climate explains the decline. This is not a flaw in the researcher's analysis — it is a structural limitation of observational data.",
    attrBiasLink: "See the full proxy masking analysis on the Sentinel Species page",
    attrBiasNote:
      "This is not an accusation of negligence. It is a structural observation about how research funding, conceptual vocabulary, and temporal confounding combine to make a specific signal invisible. The test that would resolve it — Faraday-shielded replication — is concrete and feasible.",
  },
  fi: {
    title: "Näyttökokoelma",
    subtitle:
      "Tutkimuksia ja dataa, jotka tukevat ja haastavat BERM-mallia, järjestettynä biologisen reitin mukaan. Jokainen merkintä on arvioitu alla kuvatulla episteemisellä näyttöasteikolla.",
    epistemicTitle: "Episteeminen tasojärjestelmä",
    epistemicDesc:
      "Kaikki näyttö ei ole samanarvoista. Jokaiselle tutkimukselle on annettu episteeminen taso, joka heijastaa sen tarjoaman näytön vahvuutta ja tyyppiä. Tämä ei ole arvio tutkimuksen laadusta sinänsä, vaan siitä, millaista päättelyä tutkimus tukee. Yksittäinen RCT voi olla erinomaista tiedettä ja silti saada L*-arvion, jos sitä ei ole replikoitu.",
    year: "Vuosi",
    study: "Tutkimus",
    finding: "Löydös",
    level: "Taso",
    footNote:
      "Tämä kokoelma ylläpidetään osana BERM-mallin dokumentaatiota. Sisällyttäminen ei tarkoita hyväksyntää; tutkimukset on listattu osoittamaan, mihin kukin reitti nojaa ja missä aukot ovat. Jos tiedät tutkimuksen, joka tulisi lisätä, tai uskot arvion olevan virheellinen, osallistuminen on tervetullutta projektin repositoryn kautta.",
    attrBiasTitle: "Attribuutiovinouma vähenemätutkimuksessa",
    attrBiasDesc:
      "EMF on rakenteellisesti näkymätön useimmissa ekologisissa ja lisääntymistutkimuksissa — ei siksi, että se testattiin ja hylättiin, vaan siksi, ettei sitä koskaan harkittu. Tämä osio dokumentoi, miten perinteiset attribuutiot (ilmastonmuutos, kemikaalit, elinympäristön menetys) muodostuvat oletusselityksiksi vähenemille, joilla voi olla sähkömagneettinen komponentti.",
    attrBiasP1Title: "Attribuutiovinouma",
    attrBiasP1:
      "Kun vähenemä havaitaan, tutkijat etsivät selityksiä tuttujen tekijöiden joukosta. Ilmastonmuutos on hyvin rahoitettu ja poliittisesti tuettu. Kemikaalipäästöt ovat säädeltyjä ja mitattavia. EMF on useimmille biologeille vieras, useimpien rahoituslaitosten rahoittama ja televiestintäteollisuuden aktiivisesti lobbaama. Vuoden 2024 analyysi 92 mahdollisesta hyönteisvähenemän ajurista Saksassa ei sisältänyt sähkömagneettisia kenttiä kandidaattien joukossa — ei siksi, että EMF testattiin ja hylättiin, vaan siksi, ettei sitä koskaan harkittu.",
    attrBiasP2Title: "Näytön epäsymmetria",
    attrBiasP2:
      "On satoja tutkimuksia ilmastonmuutoksesta ja hyönteisten vähenemästä. EMF:stä ja hyönteisten vähenemästä on alle kaksikymmentä. Tämä epäsuhta ei heijasta kahden tekijän suhteellista merkitystä — se heijastaa tutkimusrahoituksen rakennetta. Näytön määrä hypoteesille seuraa rahoituksen määrää, ei kausaalisen suhteen vahvuutta.",
    attrBiasP3Title: "Kausaalinen peittäminen",
    attrBiasP3:
      "Ilmastonmuutos ja EMF-infrastruktuuri ovat ajallisesti korreloituneet: molemmat kasvoivat 1970–2024. OLS-regressio ei voi erottaa niitä ilman eksogeenista instrumenttia. Kun tutkija kontrolloi 'lämpötilaa', hän saattaa vahingossa poistaa EMF-signaalin — koska kaksi trendiä liikkuvat yhdessä. Residuaali näyttää pieneltä, ja tutkija päättelee, että ilmasto selittää vähenemän. Tämä ei ole tutkijan analyysin virhe — se on havainnointidatan rakenteellinen rajoitus.",
    attrBiasLink: "Katso koko proxy masking -analyysi Indikaattorilajit-sivulla",
    attrBiasNote:
      "Tämä ei ole syytös huolimattomuudesta. Se on rakenteellinen havainto siitä, miten tutkimusrahoitus, käsitteellinen sanasto ja ajallinen sekoittuminen yhdistyvät tehden tietyn signaalin näkymättömäksi. Testi, joka ratkaisisi asian — Faraday-suojattu replikaatio — on konkreettinen ja toteutettavissa.",
  },
} as const;

const epistemicLabelsFi: Record<
  EpistemicLevel,
  { label: string; description: string }
> = {
  E: {
    label: "Vakiintunut",
    description: "Sateenvarjokatsaus tai useat riippumattomat RCT:t vahvistavat",
  },
  "M|C": {
    label: "Mekanistinen + korrelaatio",
    description:
      "Selkeä mekanismi + epidemiologinen korrelaatio, ei ihmis-RCT:tä",
  },
  M: {
    label: "Vain mekanistinen",
    description: "In vitro/eläinmekanismi, rajallinen ihmisdata",
  },
  C: {
    label: "Vain korrelaatio",
    description: "Epidemiologinen yhteys, mekanismi epäselvä",
  },
  "L*": {
    label: "Kirjallisuus (rajattu)",
    description: "Yksittäinen tutkimus tai pieni otos, vaatii replikaation",
  },
  L: {
    label: "Kirjallisuus (rajaamaton)",
    description: "Viitattu mutta ei itsenäisesti varmennettu",
  },
};

const pathwaysFi: Record<string, { label: string; description: string }> = {
  A: {
    label: "VGIC → Ca²⁺ → ROS → Siittiövaurio",
    description:
      "EMF aktivoi jänniteohjattuja ionikanavia, nostaen solunsisäistä kalsiumia, mikä laukaisee reaktiivisten happilajien tuotannon. ROS vaurioittaa siittiöiden DNA:ta ja vähentää liikkuvuutta ja pitoisuutta.",
  },
  B: {
    label: "RPM → CRY → Vuorokausirytmin häiriö",
    description:
      "Kryptokromiproteiinien radikaalipari-mekanismi on herkkä heikoille magneettikentille, mikä voi häiritä vuorokausirytmin signalointia ja sen alaisia lisääntymishormonirytmejä.",
  },
  C: {
    label: "Veri-aivoesteen häiriö",
    description:
      "Radiotaajuusaltistus voi lisätä veri-aivoesteen läpäisevyyttä, mahdollistaen neurotoksisten yhdisteiden pääsyn HPG-akselia sääteleviin aivoalueisiin.",
  },
  D: {
    label: "HPA → HPG ristiin-inhibitio",
    description:
      "Krooninen EMF-altistus voi nostaa kortisolia HPA-akselin aktivoinnin kautta, mikä ristiin-inhiboi hypotalamus-aivolisäke-gonadakselia, vähentäen testosteronia ja heikentäen spermatogeneesiä.",
  },
  E: {
    label: "Mikrobiomi",
    description:
      "EMF-altistus voi muuttaa suoliston ja siemennesteen mikrobiomin koostumusta, vaikuttaen lisääntymishormonien aineenvaihduntaan ja siittiöiden laatuun.",
  },
  F: {
    label: "Sempou-reitti (VGCC → mTOR → hedelmällisyys/ikääntyminen)",
    description:
      "Kalvopotentiaali säätelee spermatogonioiden erilaistumista VGCC → Ca²⁺ → mTOR -signaloinnin kautta. EMF:n aiheuttama Vmem-häiriö rikkoo tämän reitin, yhdistäen lisääntymisen heikkenemisen ikääntymiseen jaetun mTOR-yliaktivaation kautta.",
  },
  T_BE: {
    label: "Biosähköinen koodi",
    description:
      "Endogeeniset biosähköiset signaalit ohjaavat morfogeneesiä ja solujen koordinaatiota. Eksogeeninen EMF voi häiritä näitä biosähköisiä kuvioita, vaikka tämä reitti on vähiten vakiintunut.",
  },
  PV: {
    label: "Farmakologinen validointi",
    description:
      "Tunnetut lääkkeet, jotka kohdistuvat spesifeihin BERM-reitin komponentteihin, tarjoavat riippumattomia kalibrointiankkureita. Jos EMF vaikuttaa VGCC:n, mTOR:n tai HPA:n kautta, samoja mekanismeja kohdentavien lääkkeiden tulisi tuottaa kvantitatiivisesti yhdenmukaisia vaikutuksia.",
  },
  NE: {
    label: "Luonnolliset kokeet",
    description:
      "Maat, joissa mobiiliteknologian käyttöönotto muuttui äkillisesti, tarjoavat kvasikokeellisia testejä. Jos EMF ohjaa TFR:n laskua, äkillisen käyttöönoton tulisi kiihdyttää laskua. Tulokset ovat ristiriitaisia: 1/3 BERM-yhdenmukaisia, raportoitu avoimesti.",
  },
  TG: {
    label: "Teknologiasukupolven askeleet",
    description:
      "Jos EMF-altistus ohjaa hedelmällisyyden laskua, siirtymän 2G:stä (tukiasemat) 3G:n (mobiilidata) kautta 4G/älypuhelimiin (henkilökohtainen RF-piikki) tulisi tuottaa monotonisesti kasvavia TFR-laskuasteita. Tulokset tukevat osittain: 6/8 maassa 4G-aikakauden kiihtyminen 2G:hen nähden, mutta vain 3/8 näyttää tiukan monotonisen kasvun.",
  },
  CA: {
    label: "Kalibrointiankkurit",
    description:
      "Riippumattomat empiiriset mittaukset Travisonilta (testosteronin lasku), Leproultilta (uni-testosteronireitti), Volkowilta (akuutti hermovaste) ja Beckeriltä (biosähköisten kenttien suhteet) tarkistavat tuottavatko BERM:n sisäiset parametrit fysiologisesti yhdenmukaisia suuruusluokkia.",
  },
  NR: {
    label: "Negatiiviset tulokset ja vastanäyttö",
    description:
      "Tutkimuksia ja havaintoja, jotka ovat ristiriidassa BERM:n ennusteiden kanssa, joita malli ei pysty selittämään tai jotka rajoittavat kausaaliväitteiden vahvuutta. Tieteellinen rehellisyys vaatii sen dokumentointia, mikä epäonnistuu, ei vain sen mikä sopii.",
  },
  LB: {
    label: "Laboratorion perustason harha",
    description:
      "Kasvava tausta-EMF laboratorioissa kontaminoi kontrolliryhmät, puristaen havaittuja vaikutuskokoja kohti nollaa. Jos χ(Ā) ohjaa biologista herkkyyttä ja laboratorion EMF on noussut ~0,1 V/m:stä (1950-luku) ~15 V/m:iin (2020-luku), kontrollit ovat jo χ ≈ 1,0 — tehden EMF-herkistä vaikutuksista lähes havaitsemattomia. Tämä ennustaa biologisen replikaatiokriisin BERM:n rakenteellisena seurauksena.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locale === "fi"
    ? {
        title: "Näyttö - Extinction Field",
        description:
          "Koottu näyttö BERM-mallia tukevista ja haastavista tutkimuksista, järjestettynä reitin mukaan episteemisillä arvioilla.",
      }
    : {
        title: "Evidence - Extinction Field",
        description:
          "Compiled evidence supporting and challenging the BERM model, organized by pathway with epistemic ratings.",
      };
}

function EpistemicBadge({
  level,
  locale,
}: {
  level: EpistemicLevel;
  locale: string;
}) {
  const info = EPISTEMIC_LEVELS[level];
  const fiInfo = locale === "fi" ? epistemicLabelsFi[level] : null;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap"
      style={{
        backgroundColor: `${info.color}18`,
        color: info.color,
        border: `1px solid ${info.color}40`,
      }}
      title={fiInfo?.description ?? info.description}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: info.color }}
      />
      {fiInfo?.label ?? info.label}
    </span>
  );
}

export default async function EvidencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = locale === "fi" ? t.fi : t.en;
  const pathwayKeys = Object.keys(PATHWAYS);

  const getPathway = (key: string) => {
    if (locale === "fi" && pathwaysFi[key]) return pathwaysFi[key];
    return PATHWAYS[key];
  };

  const getEpistemicLevels = () => {
    if (locale === "fi") {
      return Object.entries(EPISTEMIC_LEVELS).map(([key, info]) => ({
        key: key as EpistemicLevel,
        label: epistemicLabelsFi[key as EpistemicLevel]?.label ?? info.label,
        description:
          epistemicLabelsFi[key as EpistemicLevel]?.description ??
          info.description,
        color: info.color,
      }));
    }
    return Object.entries(EPISTEMIC_LEVELS).map(([key, info]) => ({
      key: key as EpistemicLevel,
      label: info.label,
      description: info.description,
      color: info.color,
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">{d.title}</h1>
        <p className="text-foreground-muted max-w-2xl leading-relaxed">
          {d.subtitle}
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">{d.epistemicTitle}</h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          {d.epistemicDesc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {getEpistemicLevels().map((info) => (
            <div
              key={info.key}
              className="border border-card-border bg-card-bg rounded-lg p-4 flex items-start gap-3"
            >
              <span
                className="mt-0.5 w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: info.color }}
              />
              <div>
                <p className="text-sm font-medium">
                  {info.key} &mdash; {info.label}
                </p>
                <p className="text-xs text-foreground-muted mt-1">
                  {info.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {pathwayKeys.map((pKey) => {
        const pathway = getPathway(pKey);
        const items = EVIDENCE.filter((e) => e.pathway === pKey);
        if (items.length === 0) return null;

        return (
          <section key={pKey} className="mb-14">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-1">
                {pKey === "PV" ||
                pKey === "NE" ||
                pKey === "TG" ||
                pKey === "CA" ||
                pKey === "NR" ||
                pKey === "LB" ||
                pKey === "OT"
                  ? ""
                  : `${locale === "fi" ? "Reitti" : "Pathway"} ${pKey === "T_BE" ? "T" : pKey}: `}
                {pathway.label}
              </h2>
              <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">
                {pathway.description}
              </p>
              {pKey === "LB" && (
                <p className="text-sm mt-2">
                  <a
                    href={`/${locale}/replication`}
                    className="text-blue-500 hover:underline"
                  >
                    {locale === "fi"
                      ? "BERM ennustaa lisäseurauksen: laboratorion replikaatiokriisin itsessään."
                      : "BERM predicts a further consequence: the laboratory replication crisis itself."}
                  </a>
                  {" →"}
                </p>
              )}
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-foreground-muted">
                    <th className="py-2 pr-4 font-medium">{d.year}</th>
                    <th className="py-2 pr-4 font-medium">{d.study}</th>
                    <th className="py-2 pr-4 font-medium">{d.finding}</th>
                    <th className="py-2 pr-4 font-medium">{d.level}</th>
                    <th className="py-2 font-medium text-right">n</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr
                      key={i}
                      className="border-b border-card-border last:border-0"
                    >
                      <td className="py-3 pr-4 font-mono-num whitespace-nowrap align-top">
                        {item.year}
                      </td>
                      <td className="py-3 pr-4 align-top max-w-[220px]">
                        {item.study}
                      </td>
                      <td className="py-3 pr-4 text-foreground-muted align-top">
                        {item.finding}
                      </td>
                      <td className="py-3 pr-4 align-top">
                        <EpistemicBadge level={item.level} locale={locale} />
                      </td>
                      <td className="py-3 text-right font-mono-num align-top text-foreground-muted">
                        {item.n ? item.n.toLocaleString() : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-3">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="border border-card-border bg-card-bg rounded-lg p-4"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono-num text-sm">{item.year}</span>
                    <EpistemicBadge level={item.level} locale={locale} />
                  </div>
                  <p className="text-sm font-medium mb-1">{item.study}</p>
                  <p className="text-sm text-foreground-muted">
                    {item.finding}
                  </p>
                  {item.n && (
                    <p className="text-xs text-foreground-muted mt-2 font-mono-num">
                      n = {item.n.toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <section id="attribution-bias" className="mb-14">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-1">{d.attrBiasTitle}</h2>
          <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">
            {d.attrBiasDesc}
          </p>
        </div>

        <div className="space-y-6 max-w-3xl">
          <div className="border border-status-partial/40 bg-status-partial/5 rounded-lg p-5">
            <h3 className="text-xs font-semibold text-status-partial uppercase tracking-wide mb-2">
              {d.attrBiasP1Title}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.attrBiasP1}
            </p>
          </div>

          <div className="border border-status-partial/40 bg-status-partial/5 rounded-lg p-5">
            <h3 className="text-xs font-semibold text-status-partial uppercase tracking-wide mb-2">
              {d.attrBiasP2Title}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.attrBiasP2}
            </p>
          </div>

          <div className="border border-status-partial/40 bg-status-partial/5 rounded-lg p-5">
            <h3 className="text-xs font-semibold text-status-partial uppercase tracking-wide mb-2">
              {d.attrBiasP3Title}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.attrBiasP3}
            </p>
          </div>
        </div>

        <p className="text-sm mt-4">
          <a
            href={`/${locale}/sentinel#proxy-masking`}
            className="text-accent hover:underline"
          >
            {d.attrBiasLink}
          </a>
          {" →"}
        </p>

        <div className="mt-4 p-4 rounded-lg bg-background border border-border max-w-3xl">
          <p className="text-xs text-foreground-muted leading-relaxed">
            {d.attrBiasNote}
          </p>
        </div>
      </section>

      <section className="border-t border-border pt-8 mt-8">
        <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
          {d.footNote}
        </p>
      </section>
    </div>
  );
}
