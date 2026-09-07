import { DKC_FRAMEWORK } from "@/lib/dkcFramework";

const FI_PREDICTIONS: Record<string, string> = {
  F1: "Etelä-Korean TFR saavuttaa minimin vuosina 2025–2027 ja pysyy vähintään tasolla 0,60.",
  F2: "Intian TFR-lasku kiihtyy vuosina 2025–2030 älypuhelinajoituksen skenaariossa.",
  F3: "Siemennesteen kausivaihtelu pienenee käyttösuhdeproksin kasvaessa.",
  F4: "25–29-vuotiaiden ASFR on 2005 syntyneessä kohortissa alempi kuin 1985 syntyneessä ikävakioinnin jälkeen.",
  F5: "Maaseudun TFR-lasku korreloi negatiivisesti tukiasematiheyden kanssa ennalta rekisteröidyssä vakioidussa analyysissä.",
  F6: "Ennalta rekisteröity monimaatesti valitsee yhtä suuremman Hill-eksponentin.",
  F7: "Matalan teknologiakuorman vertailuyhteisöt pysyvät lähellä omaa korkean hedelmällisyyden lähtötasoaan.",
  F8: "Pysyvästi matalan proksin vanhempien jälkeläisillä ei ole T12:een liitettävää sukupolvittaista siemennestelaskua.",
  F9: "Mieslinjan kumulatiivinen tila ennustaa IVF-elävänä syntymää, kun naisperäiset indikaatiot ositetaan.",
};

const FI_ENDPOINTS: Record<string, [string, string]> = {
  E1: ["Maakohtainen TFR-holdout 2016–2024", "RMSE < 0,15 TFR-yksikköä"],
  E2: ["Etelä-Korean 25–34-vuotiaiden ASFR-kiihtymän ajoitus", "ennuste ±2 vuoden sisällä"],
  E3: ["Suomen TFR ylittää Etelä-Korean TFR:n vuonna 2024", "suunnan järjestys"],
  E4: ["Matalan teknologiakuorman yhteisön TFR vastaa mitattua lähtötasoa", "vaatii yhteisökohtaisen altistushistorian"],
  E5: ["Sama kuormatila kartoittaa siittiöpitoisuuden sarjan 1973–2018", "erillinen päätepistekartoitus"],
  E6: ["Mehiläisen allometrinen vasteajoitus", "lajikohtainen spektrisyöte ja tau_R"],
};

const FI_INTERNAL: Record<string, [string, string]> = {
  S0: ["Maaholdoutin kattavuus", "havaittu TFR kuuluu ennalta rekisteröityyn 95 %:n väliin"],
  S1: ["Ydinten järjestys", "tau_R > tau_B"],
  S2: ["Pitkämuistin hallitsevuusoletus", "alpha < 0,5; beta = 1 − alpha"],
  S3: ["Etelä-Korean nuoren ASFR:n ajoitus", "nopea haara osuu ennalta rekisteröityyn aikaikkunaan"],
  S4: ["Matalan teknologiakuorman kontrasti", "proksi- tai mittaustila on eksplisiittisesti lähellä rekisteröityä verrokkia"],
  S5: ["Päätepisteiden välinen invarianssi", "samat tau_B, tau_R ja alpha säilytetään"],
  S6: ["Ajallinen holdout", "kalibroi vuoteen 2015; arvioi vuodet 2016–2024"],
};

export function DkcValidationRegistry({ locale }: { locale: string }) {
  const fi = locale === "fi";

  return (
    <section className="mb-14 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 sm:p-7">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-600">
          Lindgren-DKC
        </p>
        <span className="rounded-full border border-amber-500/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
          {fi ? "Lukittu falsifikaatiota varten" : "Locked for falsification"}
        </span>
      </div>
      <h2 className="text-xl font-semibold">
        {fi ? "Ennuste- ja falsifikaatiorekisteri" : "Prediction and falsification registry"}
      </h2>
      <p className="mt-2 max-w-4xl text-sm leading-relaxed text-foreground-muted">
        {fi
          ? "F1–F9 on lukittu sisällön tiivisteillä falsifikaatiota varten. DKC:n FieldState-kalibrointiputki on toteutettu ja tuottaa arvoja. Puhdas laskin hyväksyy silti eksplisiittisesti kalibroimattomia herkkyyssyötteitä; L2-identifikaatio pysyy avoimena eikä kansallinen teknologia-aikaproksi ole mitattu annos."
          : "F1–F9 are content-addressed and locked for falsification. The DKC FieldState calibration pipeline is implemented and produces values. The pure evaluator still accepts explicitly uncalibrated sensitivity inputs; the L2 identification remains open, and the national technology-timing proxy is not a measured dose."}
      </p>

      <h3 className="mt-7 text-sm font-semibold uppercase tracking-wide">
        {fi ? "F1–F9: lukitut ennusteet" : "F1–F9: locked predictions"}
      </h3>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {DKC_FRAMEWORK.predictions.map((prediction) => (
          <article key={prediction.id} className="min-w-0 rounded-xl border border-card-border bg-card-bg p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="font-mono-num text-xs font-semibold text-accent">{prediction.id}</span>
              <span className="text-[10px] uppercase tracking-wide text-foreground-muted">{prediction.timing}</span>
            </div>
            <p className="text-sm leading-relaxed">{fi ? FI_PREDICTIONS[prediction.id] : prediction.statement}</p>
            <p className="mt-2 text-xs leading-relaxed text-foreground-muted">
              {fi ? "Testi" : "Test"}: {prediction.test}
            </p>
            <dl className="mt-3 space-y-2 border-t border-card-border pt-3 text-xs">
              <RegistryField
                label={fi ? "Matemaattinen muoto" : "Mathematical form"}
                value={prediction.mathematicalForm}
                mono
              />
              <RegistryField
                label={fi ? "Numeerinen arvo" : "Numeric value"}
                value={formatRegistryValue(prediction.numericValue)}
                mono
              />
              <RegistryField
                label={fi ? "Aikahorisontti" : "Time horizon"}
                value={formatRegistryValue(prediction.timeHorizon)}
                mono
              />
              <RegistryField
                label={fi ? "Falsifikaatiokriteeri" : "Falsification criterion"}
                value={prediction.falsificationCriterion}
              />
            </dl>
            <p className="mt-2 font-mono text-[10px] text-foreground-muted">
              SHA-256: {prediction.lockDigestSha256.slice(0, 16)}…
            </p>
          </article>
        ))}
      </div>

      <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide">
        {fi ? "V1–V25: verifikaatiopisteet" : "V1–V25: verification points"}
      </h3>
      <p className="mt-2 max-w-4xl text-xs leading-relaxed text-foreground-muted">
        {fi
          ? "Jokainen piste on rekisteröity erillistä kriittistä arviointia varten; pisteen rekisteröinti ei merkitse automaattista läpäisyä. Julkaisu vaatii V1–V10:n lisäksi ennen hakua sisältötiivisteellä lukitun protokollan, täydet hakulokit, riippumattoman kaksoisseulonnan, symmetrisen mallivertailun ja tuloskohtaisen risk-of-bias-arvion."
          : "Each point is registered for a separate critical evaluation; registration does not automatically mean that the point has passed. Publication requires V1–V10 plus a content-digested protocol locked before search, complete search logs, independent dual screening, symmetric model comparison and result-level risk-of-bias assessment."}
      </p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {DKC_FRAMEWORK.verificationPoints.map((point) => (
          <article key={point.id} className="min-w-0 rounded-xl border border-card-border bg-card-bg p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="font-mono-num text-xs font-semibold text-accent">{point.id}</span>
              <span className="text-[10px] uppercase tracking-wide text-foreground-muted">
                {fi ? `Taso ${point.level}` : `Level ${point.level}`}
              </span>
            </div>
            <p className="text-sm leading-relaxed">{point.claim}</p>
            <p className="mt-2 text-xs leading-relaxed text-foreground-muted">
              {fi ? "Arviointi" : "Evaluation"}: {point.test}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <ValidationList
          title={fi ? "E1–E6: päätepistetestit" : "E1–E6: endpoint tests"}
          rows={DKC_FRAMEWORK.endpointTests.map((row) => {
            const translated = FI_ENDPOINTS[row.id];
            return {
              id: row.id,
              test: fi && translated ? translated[0] : row.test,
              criterion: fi && translated ? translated[1] : row.criterion,
            };
          })}
          criterionLabel={fi ? "Kriteeri" : "Criterion"}
        />
        <ValidationList
          title={fi ? "S0–S6: sisäiset testit" : "S0–S6: internal tests"}
          rows={DKC_FRAMEWORK.internalTests.map((row) => {
            const translated = FI_INTERNAL[row.id];
            return {
              id: row.id,
              test: fi && translated ? translated[0] : row.test,
              criterion: fi && translated ? translated[1] : row.criterion,
            };
          })}
          criterionLabel={fi ? "Kriteeri" : "Criterion"}
        />
      </div>
    </section>
  );
}

function formatRegistryValue(value: Record<string, unknown>): string {
  return JSON.stringify(value);
}

function RegistryField({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="font-semibold text-foreground-muted">{label}</dt>
      <dd className={`mt-0.5 leading-relaxed ${mono ? "break-all font-mono" : "break-words"}`}>
        {value}
      </dd>
    </div>
  );
}

function ValidationList({
  title,
  rows,
  criterionLabel,
}: {
  title: string;
  rows: Array<{ id: string; test: string; criterion: string }>;
  criterionLabel: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide">{title}</h3>
      <div className="mt-3 space-y-3">
        {rows.map((row) => (
          <article key={row.id} className="min-w-0 rounded-lg border border-card-border bg-card-bg p-4">
            <p className="text-sm font-medium">
              <span className="mr-2 font-mono-num text-xs text-accent">{row.id}</span>
              {row.test}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-foreground-muted">
              {criterionLabel}: {row.criterion}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
