import type { Metadata } from "next";
import { FlaskConical } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";

type Section = { title: string; text: readonly string[]; items?: readonly string[] };
type Copy = {
  title: string;
  subtitle: string;
  introduction: readonly string[];
  sections: readonly Section[];
  outcomeTitle: string;
  outcomeText: string;
};

const t: Record<Locale, Copy> = {
  en: {
    title: "Laboratory FieldState replication protocol",
    subtitle:
      "A preregistered way to test whether measured laboratory field conditions moderate a defined biological experiment — without assuming that they explain the wider replication literature.",
    introduction: [
      "This protocol treats laboratory FieldState as a measurable potential moderator that requires a direct, blinded comparison.",
      "Its goal is modest and discriminating: establish whether a documented difference in physical FieldState changes a pre-specified endpoint under otherwise matched experimental conditions.",
    ],
    sections: [
      {
        title: "1. Design a matched comparison",
        text: [
          "Use at least two independently characterised environments or exposure chambers: a reference/sham condition and an active condition. Randomise samples or animals across runs and blind endpoint assessment wherever practical.",
          "Do not describe either arm as “EMF-free”. The comparison must report what is measured in each arm, including residual fields and uncertainty.",
        ],
      },
      {
        title: "2. Measure the full experimental environment",
        text: [
          "Record calibrated field measurements before, during and after each biological run: relevant bands, low-frequency components, B₀ vector where relevant, orientation, time series/PSD, source configuration, temperature, humidity, vibration, light and airflow.",
          "If shielding is used, characterise its side effects. Shielding can alter temperature stability, ventilation, acoustic environment, static fields and handling; those changes need matched controls rather than being attributed to a field difference by default.",
        ],
      },
      {
        title: "3. Pre-specify a close endpoint",
        text: [
          "Choose an endpoint that corresponds to a registered link: for example calcium/ROS dynamics, a barrier tight-junction measure, sperm function, oocyte redox or a circadian marker. Define collection time, transformations, exclusions and the primary contrast before unblinding.",
          "A rescue or blocker arm can test mediation but cannot substitute for a sham-controlled physical contrast. A national fertility series is not a laboratory endpoint.",
        ],
      },
      {
        title: "4. Analyse the FieldState contrast, not an assumed scalar",
        text: [
          "Report the observed differences in the named FieldState features and their uncertainty. Test the primary endpoint against the preregistered contrast; treat secondary spectral, orientation and timing analyses as exploratory unless they were prespecified.",
          "Repeat the protocol in an independent laboratory and, where possible, with a second instrument chain. The protocol does not predict a fixed fold-change: the magnitude is an empirical question.",
        ],
      },
      {
        title: "5. Release an auditable package",
        text: [
          "Publish the preregistration, raw or access-controlled raw field recordings, calibration certificates, chamber logs, biological data, analysis code, randomisation/blinding record, deviations and null results.",
          "Classify input quality as partial or measurement-ready FieldState data. Measurement-ready data still require replication and an independently interpretable endpoint before they can inform an organ-state mapping.",
        ],
      },
    ],
    outcomeTitle: "What either result would mean",
    outcomeText:
      "A reproducible null result under a well-characterised FieldState contrast would constrain the proposed link for that system and protocol. A reproducible difference would motivate mechanism and dose/geometry work; it would not by itself establish a human reproductive or population-TFR effect. Both outcomes are informative and should be published.",
  },
  fi: {
    title: "Laboratorion FieldState-replikaatioprotokolla",
    subtitle:
      "Ennakkorekisteröity tapa testata, moderovatko mitatut laboratorio-olosuhteet määriteltyä biologista koetta — olettamatta, että ne selittäisivät laajemman replikaatiokirjallisuuden.",
    introduction: [
      "Protokolla käsittelee laboratorion FieldStatea mitattavana mahdollisena moderaattorina, joka vaatii suoran, sokkoutetun vertailun.",
      "Tavoite on rajattu ja erottava: selvitetään, muuttaako dokumentoitu fysikaalinen FieldState-ero ennalta määriteltyä päätepistettä muilta osin vastaavissa koeolosuhteissa.",
    ],
    sections: [
      {
        title: "1. Suunnittele yhteensovitettu vertailu",
        text: [
          "Käytä vähintään kahta toisistaan riippumattomasti karakterisoitua ympäristöä tai altistuskammiota: referenssi-/sham-ehtoa ja aktiivista ehtoa. Satunnaista näytteet tai eläimet ajoihin ja sokkouta päätepisteen arviointi aina kun käytännöllistä.",
          "Älä kuvaa kumpaakaan haaraa “EMF-vapaaksi”. Vertailun on raportoitava kummassakin haarassa mitattu tilanne, mukaan lukien jäännöskentät ja epävarmuus.",
        ],
      },
      {
        title: "2. Mittaa koko koe-ympäristö",
        text: [
          "Tallenna kalibroidut kenttämittaukset ennen jokaista biologista ajoa, sen aikana ja sen jälkeen: relevantit kaistat, matalataajuiset komponentit, tarvittaessa B₀-vektori, orientaatio, aikasarja/PSD, lähdekonfiguraatio, lämpötila, kosteus, värähtely, valo ja ilmavirta.",
          "Jos käytetään suojausta, karakterisoi sen sivuvaikutukset. Suojaus voi muuttaa lämpövakautta, ilmanvaihtoa, ääniympäristöä, staattisia kenttiä ja käsittelyä; muutokset tarvitsevat sovitetut kontrollit, eikä niitä oleteta kenttäeron seuraukseksi.",
        ],
      },
      {
        title: "3. Määrittele lähellä oleva päätepiste ennakolta",
        text: [
          "Valitse rekisteröityä lenkkiä vastaava päätepiste: esimerkiksi kalsium-/ROS-dynamiikka, esteen tight-junction-mittari, siittiötoiminto, oosyytin redox tai vuorokausimarkkeri. Määrittele keräysaika, muunnokset, poissulut ja ensisijainen kontrasti ennen sokkoutuksen purkua.",
          "Rescue- tai salpaajahaara voi testata mediaatiota, mutta se ei korvaa sham-kontrolloitua fysikaalista kontrastia. Kansallinen hedelmällisyyssarja ei ole laboratorion päätepiste.",
        ],
      },
      {
        title: "4. Analysoi FieldState-kontrasti, ei oletettua skalaaria",
        text: [
          "Raportoi nimettyjen FieldState-piirteiden havaitut erot ja niiden epävarmuus. Testaa ensisijainen päätepiste ennakkorekisteröityä kontrastia vasten; käsittele toissijaisia spektri-, orientaatio- ja ajoitusanalyysejä alustavina, ellei niitä rekisteröity ennakolta.",
          "Toista protokolla riippumattomassa laboratoriossa ja mahdollisuuksien mukaan toisella instrumenttiketjulla. Protokolla ei ennusta kiinteää kertavaikutusta: vaikutuksen koko on empiirinen kysymys.",
        ],
      },
      {
        title: "5. Julkaise auditoitava paketti",
        text: [
          "Julkaise ennakkorekisteröinti, raaka- tai pääsykontrolloidut raakakenttätallenteet, kalibrointisertifikaatit, kammiolokit, biologinen data, analyysikoodi, satunnaistus-/sokkoutustieto, poikkeamat ja nollatulokset.",
          "Luokittele syötteen laatu osittaiseksi tai mittausvalmiiksi FieldState-dataksi. Mittausvalmis data vaatii silti replikaation ja itsenäisesti tulkittavan päätepisteen ennen kuin se voi tukea elintilan kartoitusta.",
        ],
      },
    ],
    outcomeTitle: "Mitä kumpikin tulos tarkoittaisi",
    outcomeText:
      "Toistettava nollatulos hyvin karakterisoidussa FieldState-kontrastissa rajoittaisi ehdotettua lenkkiä kyseisessä järjestelmässä ja protokollassa. Toistettava ero motivoisi mekanismi- ja annos/geometriatyötä; se ei yksin osoittaisi ihmisen lisääntymis- tai väestö-TFR-vaikutusta. Molemmat tulokset ovat informatiivisia ja ne tulee julkaista.",
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

export default async function ReplicationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = t[locale === "fi" ? "fi" : "en"];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={FlaskConical} title={d.title} subtitle={d.subtitle} />
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
          </section>
        ))}

        <section className="rounded-xl border border-status-partial/35 bg-status-partial/5 p-5">
          <h2 className="text-lg font-semibold">{d.outcomeTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.outcomeText}</p>
        </section>
      </div>
    </div>
  );
}
