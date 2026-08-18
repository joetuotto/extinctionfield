import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { Info } from "lucide-react";

const t = {
  en: {
    title: "About",
    subtitle:
      "What the Bio-Electromagnetic Reproductive Model is, how it works, and how to engage with it.",
    whatTitle: "What is BERM?",
    whatDesc:
      "The Bio-Electromagnetic Reproductive Model (BERM) is a quantitative model that attempts to explain the worldwide decline in fertility rates and reproductive health metrics through the lens of increasing electromagnetic field (EMF) exposure. It integrates data from reproductive biology, environmental exposure assessments, and demographic statistics to produce testable, time-bound predictions.",
    principlesTitle: "Principles",
    principles: [
      {
        num: "01",
        bold: "Falsifiability.",
        text: "Every prediction includes explicit refutation conditions. If observed data falls outside the predicted confidence interval, the model is refuted on that prediction.",
      },
      {
        num: "02",
        bold: "Open data.",
        text: "All input data, processing scripts, and model code are publicly available. Reproduction of results requires no proprietary tools or data.",
      },
      {
        num: "03",
        bold: "Epistemic humility.",
        text: "The model may be wrong. The confidence intervals reflect genuine uncertainty, not precision theater. Where evidence is weak, the model says so.",
      },
      {
        num: "04",
        bold: "Locked predictions.",
        text: "Predictions are timestamped and immutable once published. They cannot be retroactively adjusted. This prevents post-hoc rationalization.",
      },
      {
        num: "05",
        bold: "Non-apocalyptic tone.",
        text: "BERM describes a quantifiable trend, not an extinction event. The model's name reflects the subject matter, not a certainty about outcomes.",
      },
    ],
    licensingTitle: "Licensing",
    codeLabel: "Code:",
    codeText: "MIT License. You can use, modify, and distribute the model code freely.",
    docsLabel: "Documentation:",
    docsText: "CC BY-4.0. You can share and adapt the documentation with attribution.",
    dataLabel: "Data:",
    dataText: "See individual data source licenses. BERM does not claim ownership of third-party datasets.",
    contribTitle: "Contributing",
    contribText:
      "The project is hosted on GitHub. Contributions are welcome: bug reports, data corrections, methodology critique, and code improvements. See the repository for contribution guidelines.",
    contactTitle: "Contact",
    contactText:
      "For questions about the model, data, or methodology, open an issue on the GitHub repository or reach out via the contact methods listed there.",
  },
  fi: {
    title: "Tietoa",
    subtitle:
      "Mitä bio-sähkömagneettinen lisääntymismalli on, miten se toimii ja miten siihen voi osallistua.",
    whatTitle: "Mikä on BERM?",
    whatDesc:
      "Bio-sähkömagneettinen lisääntymismalli (BERM) on kvantitatiivinen malli, joka pyrkii selittämään maailmanlaajuisen syntyvyyden ja lisääntymisterveyden mittareiden laskun kasvavan sähkömagneettisen kenttäaltistuksen (EMF) kautta. Se yhdistää lisääntymisbiologian, ympäristöaltistusarvioiden ja väestötilastojen dataa tuottaakseen testattavia, aikaan sidottuja ennusteita.",
    principlesTitle: "Periaatteet",
    principles: [
      {
        num: "01",
        bold: "Falsifioitavuus.",
        text: "Jokainen ennuste sisältää eksplisiittiset kumoamisehdot. Jos havaittu data jää ennustetun luottamusvälin ulkopuolelle, malli kumotaan kyseisen ennusteen osalta.",
      },
      {
        num: "02",
        bold: "Avoin data.",
        text: "Kaikki syötedata, käsittelyskriptit ja mallikoodi ovat julkisesti saatavilla. Tulosten toistaminen ei vaadi patentoituja työkaluja tai dataa.",
      },
      {
        num: "03",
        bold: "Episteeminen nöyryys.",
        text: "Malli voi olla väärässä. Luottamusvälit heijastavat aitoa epävarmuutta, eivät tarkkuusteatteria. Missä näyttö on heikkoa, malli sanoo sen.",
      },
      {
        num: "04",
        bold: "Lukitut ennusteet.",
        text: "Ennusteet ovat aikaleimattuja ja muuttumattomia julkaisun jälkeen. Niitä ei voi muuttaa takautuvasti. Tämä estää jälkikäteisrationalisoinnin.",
      },
      {
        num: "05",
        bold: "Ei-apokalyptinen sävy.",
        text: "BERM kuvaa kvantifioitavaa trendiä, ei sukupuuttotapahtumaa. Mallin nimi heijastaa aihetta, ei varmuutta lopputuloksista.",
      },
    ],
    licensingTitle: "Lisensointi",
    codeLabel: "Koodi:",
    codeText: "MIT-lisenssi. Mallikoodia voi käyttää, muokata ja jakaa vapaasti.",
    docsLabel: "Dokumentaatio:",
    docsText: "CC BY-4.0. Dokumentaatiota voi jakaa ja muokata lähdeviitteellä.",
    dataLabel: "Data:",
    dataText: "Katso yksittäisten datalähteiden lisenssit. BERM ei väitä omistavansa kolmannen osapuolen datasettejä.",
    contribTitle: "Osallistuminen",
    contribText:
      "Projekti on GitHubissa. Osallistuminen on tervetullutta: virheraportit, datakorjaukset, menetelmäkritiikki ja koodiparannukset. Katso repositoryn osallistumisohjeet.",
    contactTitle: "Yhteystiedot",
    contactText:
      "Mallia, dataa tai menetelmiä koskevissa kysymyksissä avaa issue GitHub-repositoryssa tai ota yhteyttä siellä listattujen yhteystietojen kautta.",
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
        title: "Tietoa - Extinction Field",
        description:
          "Tietoa BERM-mallista: periaatteet, lisensointi ja osallistumisohjeet.",
      }
    : {
        title: "About - Extinction Field",
        description:
          "About the BERM model: principles, licensing, and contribution guidelines.",
      };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = t[(locale as Locale) in t ? (locale as Locale) : "en"];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Info} title={d.title} subtitle={d.subtitle} />

      <div className="max-w-3xl space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-3">{d.whatTitle}</h2>
          <p className="text-foreground-muted leading-relaxed">{d.whatDesc}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">{d.principlesTitle}</h2>
          <ul className="space-y-3 text-foreground-muted leading-relaxed">
            {d.principles.map((p) => (
              <li key={p.num} className="flex gap-3">
                <span className="text-accent font-mono-num text-sm mt-0.5 shrink-0">
                  {p.num}
                </span>
                <div>
                  <strong className="text-foreground">{p.bold}</strong> {p.text}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">{d.licensingTitle}</h2>
          <div className="space-y-2 text-foreground-muted leading-relaxed">
            <p>
              <strong className="text-foreground">{d.codeLabel}</strong>{" "}
              {d.codeText}
            </p>
            <p>
              <strong className="text-foreground">{d.docsLabel}</strong>{" "}
              {d.docsText}
            </p>
            <p>
              <strong className="text-foreground">{d.dataLabel}</strong>{" "}
              {d.dataText}
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">{d.contribTitle}</h2>
          <p className="text-foreground-muted leading-relaxed">
            {d.contribText}
          </p>
          <p className="text-foreground-muted leading-relaxed mt-3">
            <a
              href="https://github.com/extinctionfield"
              className="text-accent hover:text-accent-hover transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/extinctionfield
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">{d.contactTitle}</h2>
          <p className="text-foreground-muted leading-relaxed">
            {d.contactText}
          </p>
        </section>
      </div>
    </div>
  );
}
