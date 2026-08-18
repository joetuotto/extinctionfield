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
                pKey === "NR"
                  ? ""
                  : `${locale === "fi" ? "Reitti" : "Pathway"} ${pKey === "T_BE" ? "T" : pKey}: `}
                {pathway.label}
              </h2>
              <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">
                {pathway.description}
              </p>
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

      <section className="border-t border-border pt-8 mt-8">
        <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
          {d.footNote}
        </p>
      </section>
    </div>
  );
}
