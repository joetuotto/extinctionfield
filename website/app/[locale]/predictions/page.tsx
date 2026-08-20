import type { Metadata } from "next";
import { Target, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { NextPageLink } from "@/components/NextPageLink";
import { LOCKED_PREDICTIONS, metricLabel, countryLabel } from "@/lib/predictions";
import { PredictionStatusBadge } from "@/components/PredictionStatusBadge";
import { PredictionTrack } from "@/components/PredictionTrack";
import { FeedbackLoop } from "@/components/FeedbackLoop";

const COPY = {
  en: {
    title: "Locked predictions",
    subtitle: "These predictions were locked under the BERM v18 scalar-exposure architecture. They are falsifiable: each will be compared against observed data at the stated year. FieldState–ASFR v2 does not yet publish its own predictions.",
    tfrTitle: "TFR predictions",
    tfrLead: "Country and global total-fertility-rate predictions with one-at-a-time parameter sensitivity envelopes (not confidence intervals).",
    bioTitle: "Biomarker predictions",
    bioLead: "Sperm concentration and sex-ratio predictions derived from the same model architecture.",
    v2Title: "FieldState–ASFR v2 forecast status",
    v2Status: "No country-level FieldState–ASFR-v2 forecasts are published. The current route requires matched local FieldState, registered organ and couple endpoints, ASFR modelling and external temporal validation before a forecast can be locked.",
    v2Note: "When v2 predictions are ready, they will be published alongside these v18 predictions for comparison. Both versions will remain visible.",
    r43Title: "R43: Protocol-envelope resonance",
    r43Text: "Zandieh et al. (2025) reports frequency-dependent mitochondrial/ROS observations in ELF cancer-cell experiments (0.01–5 Hz; up to 100 mT). This supports an exploratory measured-PSD protocol for testing whether network-layer envelope modulation produces a cellular response. It does not establish RF network-envelope effects, eDRX causality or a reproductive/TFR parameter.",
    country: "Country",
    year: "Year",
    metric: "Metric",
    prediction: "Prediction",
    sensitivity: "Sensitivity",
    version: "Version",
    locked: "Locked",
    statusLabel: "Status",
    history: "Version history",
    sentinelTitle: "Sentinel cascade predictions",
    sentinelLead: "Cross-species lag predictions derived from the CSLI 31-country bee–TFR panel. These test whether sentinel species decline precedes human fertility decline at a locked lag.",
    architectureNote: "Architecture note",
    architectureText: "These predictions use the scalar cumulative-exposure architecture (v17/v18). Mobile penetration enters as a technology-adoption timing proxy. The sensitivity envelope varies one parameter at a time; it is not a probabilistic confidence interval.",
    modulomeTitle: "Modulome predictions",
    modulomeLead: "Mechanistic predictions derived from the seven-layer EMF modulome and therapeutic device evidence. These are qualitative, falsifiable predictions — each specifies a concrete experimental outcome.",
    modulomePredictions: [
      {
        id: "M-1",
        title: "Faraday-shielded IVF laboratory",
        description: "An IVF laboratory with Faraday-cage EMF shielding will show significantly higher fertilization, blastocyst, and pregnancy rates compared to standard laboratories.",
        timeline: "Testable within 1–2 years",
        falsification: "No difference in any IVF outcome metric",
      },
      {
        id: "M-2",
        title: "Earbud users: lower vagal tone",
        description: "Long-term earbud users (>4h/day for >2 years) will show significantly lower heart rate variability (HRV) compared to matched non-users, indicating reduced vagal tone.",
        timeline: "Testable immediately (wearable HRV data)",
        falsification: "No HRV difference or higher HRV in earbud users",
      },
      {
        id: "M-3",
        title: "LED vs incandescent: sperm quality in rats",
        description: "Male rats raised under LED lighting will show significantly lower sperm motility and concentration compared to rats raised under incandescent lighting, in a four-arm design separating light spectrum from EMF emission.",
        timeline: "Testable in 3–6 months",
        falsification: "No difference, or EMF-shielded LED = unshielded LED",
      },
    ],
    modulomeTimeline: "Timeline",
    modulomeFalsification: "Falsification criterion",
    modulomeLocked: "Locked: 2026-08-21",
    modulomeStatus: "LOCKED — awaiting test",
  },
  fi: {
    title: "Lukitut ennusteet",
    subtitle: "Nämä ennusteet lukittiin BERM v18:n skalaarialtistusarkkitehtuurilla. Ne ovat falsifioitavissa: jokainen verrataan havaittuun dataan ilmoitettuna vuonna. FieldState–ASFR v2 ei vielä julkaise omia ennusteita.",
    tfrTitle: "TFR-ennusteet",
    tfrLead: "Maa- ja globaalitason kokonaishedelmällisyysluvun ennusteet yksi-kerrallaan-parametriherkkyysalueella (ei luottamusvälejä).",
    bioTitle: "Biomarkkeriennusteet",
    bioLead: "Siittiökonsentraatio- ja sukupuolisuhde-ennusteet samasta malliarkkitehtuurista.",
    v2Title: "FieldState–ASFR v2 -ennusteen tila",
    v2Status: "FieldState–ASFR-v2 ei julkaise maakohtaisia ennusteita. Nykyinen reitti tarvitsee kohdistetun paikallisen FieldStaten, rekisteröidyt elin- ja paripäätepisteet, ASFR-mallinnuksen ja ulkoisen ajallisen validoinnin ennen ennusteen lukitsemista.",
    v2Note: "Kun v2-ennusteet ovat valmiita, ne julkaistaan rinnakkain näiden v18-ennusteiden kanssa vertailua varten. Molemmat versiot pysyvät näkyvissä.",
    r43Title: "R43: Protokolla-verhokäyräresonanssi",
    r43Text: "Zandieh ym. (2025) raportoi taajuusriippuvaisia mitokondrio-/ROS-havaintoja ELF-syöpäsolukokeissa (0,01–5 Hz; enintään 100 mT). Se tukee eksploratiivista mitattua PSD-protokollaa sen testaamiseksi, tuottaako verkkokerroksen verhokäyrämodulaatio soluvasteen. Se ei osoita RF-verkon verhokäyrävaikutuksia, eDRX-kausaliteettia eikä lisääntymis-/TFR-parametria.",
    country: "Maa",
    year: "Vuosi",
    metric: "Mittari",
    prediction: "Ennuste",
    sensitivity: "Herkkyys",
    version: "Versio",
    locked: "Lukittu",
    statusLabel: "Tila",
    history: "Versiohistoria",
    sentinelTitle: "Sentinellikaskadi-ennusteet",
    sentinelLead: "Lajienväliset viive-ennusteet CSLI:n 31 maan mehiläis–TFR-paneelista. Nämä testaavat, edeltääkö sentinellilajien lasku ihmisen hedelmällisyyden laskua lukitulla viiveellä.",
    architectureNote: "Arkkitehtuurihuomautus",
    architectureText: "Nämä ennusteet käyttävät skalaarin kumulatiivisen altistuksen arkkitehtuuria (v17/v18). Mobiilipenetraatio on teknologian käyttöönoton ajoitusproxy. Herkkyysalue varioi yhtä parametria kerrallaan; se ei ole probabilistinen luottamusväli.",
    modulomeTitle: "Modulooma-ennusteet",
    modulomeLead: "Mekanistiset ennusteet jotka perustuvat seitsemänkerroksiseen EMF-moduloomiin ja terapeuttisten laitteiden evidenssiin. Nämä ovat kvalitatiivisia, falsifioitavia ennusteita — jokainen määrittää konkreettisen kokeellisen tuloksen.",
    modulomePredictions: [
      {
        id: "M-1",
        title: "Faraday-suojattu IVF-laboratorio",
        description: "Faraday-häkillä EMF-suojattu IVF-laboratorio osoittaa merkittävästi korkeampaa fertilisaatio-, blastokystti- ja raskausastetta verrattuna tavallisiin laboratorioihin.",
        timeline: "Testattavissa 1–2 vuodessa",
        falsification: "Ei eroa missään IVF-tulosmittarissa",
      },
      {
        id: "M-2",
        title: "Nappikuulokkeiden käyttäjät: matalampi vagaalinen tonus",
        description: "Nappikuulokkeiden pitkäaikaiskäyttäjillä (>4h/pv yli 2 vuotta) on merkittävästi matalampi sykevälivaihtelu (HRV) verrattuna sovitettuihin ei-käyttäjiin, mikä indikoi alentunutta vagaalista tonusta.",
        timeline: "Testattavissa heti (puettavien laitteiden HRV-data)",
        falsification: "Ei HRV-eroa tai korkeampi HRV kuulokkeiden käyttäjillä",
      },
      {
        id: "M-3",
        title: "LED vs hehkulamppu: siittiölaatu rotilla",
        description: "LED-valaistuksessa kasvatettujen urosrottien siittiöiden liikkuvuus ja konsentraatio on merkittävästi matalampia kuin hehkulamppuvalaistuksessa kasvatettujen, neljän ryhmän koeasetelmassa joka erottelee valospektrin EMF-emissiosta.",
        timeline: "Testattavissa 3–6 kuukaudessa",
        falsification: "Ei eroa, tai EMF-suojattu LED = suojaamaton LED",
      },
    ],
    modulomeTimeline: "Aikajana",
    modulomeFalsification: "Kumoamisehto",
    modulomeLocked: "Lukittu: 2026-08-21",
    modulomeStatus: "LUKITTU — odottaa testiä",
  },
} as const;

const TFR_IDS = LOCKED_PREDICTIONS.filter(
  (p) => p.metric === "TFR" || p.metric === "feedback_TFR"
);
const BIO_IDS = LOCKED_PREDICTIONS.filter(
  (p) => p.metric !== "TFR" && p.metric !== "feedback_TFR" && !p.metric.startsWith("sentinel_cascade")
);
const SENTINEL_IDS = LOCKED_PREDICTIONS.filter(
  (p) => p.metric.startsWith("sentinel_cascade")
);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function PredictionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Target} title={d.title} subtitle={d.subtitle} />

      {/* Architecture note */}
      <section className="mb-12 max-w-4xl rounded-xl border border-card-border bg-card-bg p-6">
        <h2 className="text-xs uppercase tracking-[0.16em] text-accent font-semibold mb-2">{d.architectureNote}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed">{d.architectureText}</p>
      </section>

      {/* TFR predictions */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.tfrTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.tfrLead}</p>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {TFR_IDS.map((p) => (
            <PredictionTrack key={p.id} prediction={p} locale={activeLocale} />
          ))}
        </div>
        <p className="mb-6 text-xs leading-relaxed text-foreground-muted max-w-4xl">
          {activeLocale === "fi"
            ? "Harmaa viiva on Maailmanpankin julkaistu TFR-sarja. Sininen alue on lukittu herkkyysalue, ei luottamusväli. Kun ennustevuoden havainto julkaistaan, se piirtyy timanttina: vihreä alueen sisällä, punainen sen ulkopuolella."
            : "The grey line is the World Bank published TFR series. The blue wedge is the locked sensitivity envelope, not a confidence interval. When the prediction year is observed, it appears as a diamond: green inside the envelope, red outside."}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-3 pr-4">{d.country}</th>
                <th className="py-3 pr-4">{d.year}</th>
                <th className="py-3 pr-4">{d.metric}</th>
                <th className="py-3 pr-4 text-right">{d.prediction}</th>
                <th className="py-3 pr-4 text-right">{d.sensitivity}</th>
                <th className="py-3 pr-4">{d.statusLabel}</th>
                <th className="py-3 pr-4 text-right">{d.version}</th>
                <th className="py-3 text-right">{d.locked}</th>
              </tr>
            </thead>
            <tbody>
              {TFR_IDS.map((p) => (
                <tr key={p.id} className="border-b border-card-border/50 hover:bg-card-bg/50 transition-colors">
                  <td className="py-3 pr-4 font-medium">{countryLabel(p, activeLocale)}</td>
                  <td className="py-3 pr-4 font-mono-num text-foreground-muted">{p.year}</td>
                  <td className="py-3 pr-4 text-sm text-foreground-muted">{metricLabel(p, activeLocale)}</td>
                  <td className="py-3 pr-4 text-right font-mono-num font-semibold text-accent">{p.central.toFixed(2)}</td>
                  <td className="py-3 pr-4 text-right font-mono-num text-foreground-muted">[{p.ciLow.toFixed(2)} – {p.ciHigh.toFixed(2)}]</td>
                  <td className="py-3 pr-4"><PredictionStatusBadge status={p.status} locale={activeLocale} /></td>
                  <td className="py-3 pr-4 text-right font-mono-num text-xs text-foreground-muted">{p.modelVersion}</td>
                  <td className="py-3 text-right font-mono-num text-xs text-foreground-muted">{p.lockedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Biomarker predictions */}
      {BIO_IDS.length > 0 && (
        <section className="mb-14 border-t editorial-rule pt-6">
          <h2 className="editorial-section-heading mb-3">{d.bioTitle}</h2>
          <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.bioLead}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                  <th className="py-3 pr-4">{d.country}</th>
                  <th className="py-3 pr-4">{d.year}</th>
                  <th className="py-3 pr-4">{d.metric}</th>
                  <th className="py-3 pr-4 text-right">{d.prediction}</th>
                  <th className="py-3 pr-4 text-right">{d.sensitivity}</th>
                  <th className="py-3 pr-4">{d.statusLabel}</th>
                  <th className="py-3 pr-4 text-right">{d.version}</th>
                  <th className="py-3 text-right">{d.locked}</th>
                </tr>
              </thead>
              <tbody>
                {BIO_IDS.map((p) => (
                  <tr key={p.id} className="border-b border-card-border/50 hover:bg-card-bg/50 transition-colors">
                    <td className="py-3 pr-4 font-medium">{countryLabel(p, activeLocale)}</td>
                    <td className="py-3 pr-4 font-mono-num text-foreground-muted">{p.year}</td>
                    <td className="py-3 pr-4 text-sm text-foreground-muted">{metricLabel(p, activeLocale)}</td>
                    <td className="py-3 pr-4 text-right font-mono-num font-semibold text-accent">{p.central}</td>
                    <td className="py-3 pr-4 text-right font-mono-num text-foreground-muted">[{p.ciLow} – {p.ciHigh}]</td>
                    <td className="py-3 pr-4"><PredictionStatusBadge status={p.status} locale={activeLocale} /></td>
                    <td className="py-3 pr-4 text-right font-mono-num text-xs text-foreground-muted">{p.modelVersion}</td>
                    <td className="py-3 text-right font-mono-num text-xs text-foreground-muted">{p.lockedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="mb-14 border-t editorial-rule pt-6">
        <FeedbackLoop locale={activeLocale} />
      </section>

      {/* Sentinel cascade predictions */}
      {SENTINEL_IDS.length > 0 && (
        <section className="mb-14 border-t editorial-rule pt-6">
          <h2 className="editorial-section-heading mb-3">{d.sentinelTitle}</h2>
          <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.sentinelLead}</p>
          <div className="grid gap-4 max-w-4xl">
            {SENTINEL_IDS.map((p) => (
              <article key={p.id} className="rounded-xl border border-card-border bg-card-bg p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{countryLabel(p, activeLocale)} {p.year}</h3>
                      <PredictionStatusBadge status={p.status} locale={activeLocale} />
                    </div>
                    <p className="mt-1 text-sm text-foreground-muted">{metricLabel(p, activeLocale)}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono-num font-semibold text-accent">{p.central}</span>
                    <span className="ml-2 font-mono-num text-xs text-foreground-muted">[{p.ciLow} – {p.ciHigh}] {p.unit}</span>
                  </div>
                </div>
                {p.history?.[0]?.changeReason && (
                  <p className="text-xs text-foreground-muted leading-relaxed">{p.history[0].changeReason}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-foreground-muted">
                  <span className="font-mono-num">{d.version}: {p.modelVersion}</span>
                  <span className="font-mono-num">{d.locked}: {p.lockedDate}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Modulome predictions */}
      <section className="mb-14 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">{d.modulomeTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-4xl">{d.modulomeLead}</p>
        <div className="grid gap-4 max-w-4xl">
          {d.modulomePredictions.map((mp) => (
            <article key={mp.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs text-accent">{mp.id}</span>
                    <h3 className="font-semibold">{mp.title}</h3>
                    <span className="text-[10px] font-mono-num px-1.5 py-0.5 rounded bg-status-partial/10 text-status-partial border border-status-partial/30">
                      {d.modulomeStatus}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-3">{mp.description}</p>
              <div className="space-y-1 text-xs text-foreground-muted">
                <p><span className="font-semibold">{d.modulomeTimeline}:</span> {mp.timeline}</p>
                <p><span className="font-semibold">{d.modulomeFalsification}:</span> {mp.falsification}</p>
                <p className="font-mono-num">{d.modulomeLocked}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* v2 status */}
      <section className="mb-14 rounded-xl border border-status-partial/30 bg-status-partial/5 p-6 max-w-4xl">
        <p className="text-xs uppercase tracking-[0.16em] text-status-partial font-semibold mb-2">FIELDSTATE–ASFR v2</p>
        <h2 className="text-xl font-semibold mb-2">{d.v2Title}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-3">{d.v2Status}</p>
        <p className="text-xs text-foreground-muted leading-relaxed italic">{d.v2Note}</p>
      </section>

      {/* R43 */}
      <section className="rounded-xl border border-card-border bg-card-bg p-6 max-w-4xl">
        <h2 className="text-xl font-semibold mb-3">{d.r43Title}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed">{d.r43Text}</p>
      </section>

      <NextPageLink
        href={`/${activeLocale}/references`}
        label={activeLocale === "fi" ? "Seuraavaksi" : "Next"}
        title={activeLocale === "fi" ? "Lähteet" : "Sources"}
        icon={BookOpen}
      />
    </div>
  );
}
