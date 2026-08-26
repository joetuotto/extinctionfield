import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";

const MECHANISM_COLORS: Record<string, string> = {
  amber: "border-l-4 border-amber-500",
  blue: "border-l-4 border-blue-500",
  red: "border-l-4 border-red-500",
};

const COPY = {
  en: {
    title: "Klimentidis Paradox Explained",
    subtitle:
      "Eight species gaining weight simultaneously, including lab animals on controlled diets. BERM identifies three EMF-mediated Ca²⁺ mechanisms that explain the cross-species obesity trend.",
    backLink: "← Back to Evidence",

    cautionText:
      "This page presents the mechanistic explanation for the Klimentidis cross-species obesity paradox. Each mechanism has been independently verified in peer-reviewed literature. The convergence hypothesis — that all three mechanisms are Ca²⁺-mediated and VGCC-dependent — generates specific testable predictions.",

    paradoxTitle: "The Paradox",
    paradoxLead:
      "In 2011, Klimentidis et al. documented that 8 species — including laboratory animals on strictly controlled diets — are all gaining weight over time (p=10⁻⁷). This eliminates diet and exercise as sole explanations. Something environmental is driving weight gain across ALL species with shared biology.",
    paradoxPoints: [
      "Laboratory primates (controlled diet, controlled exercise)",
      "Feral rats (different environment, no human food)",
      "Domestic cats and dogs (varied diets, varied activity)",
      "Each species analyzed independently — the trend is universal",
    ],

    mechanismsTitle: "Three Ca²⁺-mediated mechanisms",
    mechanismsLead:
      "BERM identifies three EMF-mediated pathways through the Ca²⁺ cascade that each independently promote weight gain. Together, they explain why the trend is cross-species: ALL species with VGCCs are affected.",
    mechanisms: [
      {
        name: "Brown Adipose Tissue (BAT) Suppression",
        id: "MECH-1",
        color: "amber",
        mechanism: "5G (3.5 GHz) → PRDM16 mRNA↓ + C/EBPβ mRNA↓ in brown adipose tissue",
        consequence:
          "BAT uses Ca²⁺ cycling (SERCA) for thermogenesis. Reduced PRDM16 → less BAT → reduced energy expenditure → weight gain on identical caloric intake",
        evidence: "PMC11942954 (2025): Direct measurement of PRDM16 reduction from 5G exposure",
        status: "Experimentally confirmed",
      },
      {
        name: "β-Cell Insulin Dynamics Disruption",
        id: "MECH-2",
        color: "blue",
        mechanism: "Electric field → Ca²⁺ channels open in β-cells → insulin secretion WITHOUT glucose",
        consequence:
          "CaVγ4→CaMKII→MafA pathway: CaMKII dysregulation → β-cell identity loss → basal hyperinsulinemia → insulin resistance → weight gain",
        evidence: "PMID:32323041 + PMC9030882: E-field insulin secretion + CaMKII→MafA pathway",
        status: "Experimentally confirmed",
      },
      {
        name: "HPA Axis Cortisol Elevation",
        id: "MECH-3",
        color: "red",
        mechanism: "EMF → HPA sensitization (NOT adaptation) → chronic cortisol elevation",
        consequence:
          "Cortisol → visceral fat deposition, insulin resistance, leptin resistance → metabolic syndrome → weight gain",
        evidence: "Klimek 2023 + Frontiers 2026: HPA sensitization + corticosterone elevation",
        status: "Experimentally confirmed",
      },
    ],

    resolutionTitle: "The Resolution",
    resolutionContent:
      "All three mechanisms are mediated through voltage-gated calcium channels (VGCCs). VGCCs are evolutionarily ancient — present in ALL vertebrates and most invertebrates. Any environmental factor that opens VGCCs would affect ALL species with these channels. This is exactly the Klimentidis pattern: cross-species weight gain driven by a ubiquitous environmental change (EMF exposure) acting on a conserved molecular target (VGCC).",
    resolutionKey:
      "The Klimentidis paradox is not paradoxical under BERM — it is predicted. Cross-species effects are the expected outcome of disrupting an evolutionarily conserved mechanism.",

    predictionLink: "See mechanistic chain predictions (KLIM-1, BAT-EMF-1, BETA-EMF-1–2)",
    predictionHref: "/predictions",
  },

  fi: {
    title: "Klimentidiksen paradoksi selitettynä",
    subtitle:
      "Kahdeksan lajia lihoo samanaikaisesti, mukaan lukien laboratorio-eläimet kontrolloiduilla dieeteillä. BERM tunnistaa kolme EMF-välitteistä Ca²⁺-mekanismia jotka selittävät lajienvälisen lihavuustrendin.",
    backLink: "← Takaisin Evidenssiin",

    cautionText:
      "Tämä sivu esittää mekanistisen selityksen Klimentidiksen lajienväliselle lihavuusparadoksille. Jokainen mekanismi on verifioitu itsenäisesti vertaisarvioidussa kirjallisuudessa. Konvergenssihypoteesi — että kaikki kolme mekanismia ovat Ca²⁺-välitteisiä ja VGCC-riippuvaisia — generoi spesifisiä testattavia ennusteita.",

    paradoxTitle: "Paradoksi",
    paradoxLead:
      "Vuonna 2011 Klimentidis ym. dokumentoivat, että 8 lajia — mukaan lukien laboratorio-eläimet tiukasti kontrolloiduilla dieeteillä — lihovat kaikki ajan myötä (p=10⁻⁷). Tämä eliminoi dieetin ja liikunnan ainoina selityksiinä. Jokin ympäristötekijä ajaa painonnousua KAIKISSA lajeissa joilla on yhteistä biologiaa.",
    paradoxPoints: [
      "Laboratorioapinat (kontrolloitu dieetti, kontrolloitu liikunta)",
      "Villit rotat (eri ympäristö, ei ihmisruokaa)",
      "Kotikissat ja -koirat (vaihtelevat dieetit, vaihteleva aktiivisuus)",
      "Jokainen laji analysoitu itsenäisesti — trendi on universaali",
    ],

    mechanismsTitle: "Kolme Ca²⁺-välitteistä mekanismia",
    mechanismsLead:
      "BERM tunnistaa kolme EMF-välitteistä reittiä Ca²⁺-kaskadin kautta, jotka kukin itsenäisesti edistävät painonnousua. Yhdessä ne selittävät miksi trendi on lajienvälinen: KAIKKI lajit joilla on VGCC:t ovat alttiita.",
    mechanisms: [
      {
        name: "Ruskean rasvakudoksen (BAT) suppressio",
        id: "MECH-1",
        color: "amber",
        mechanism: "5G (3,5 GHz) → PRDM16 mRNA↓ + C/EBPβ mRNA↓ ruskeassa rasvakudoksessa",
        consequence:
          "BAT käyttää Ca²⁺-syklausta (SERCA) termogeneesiin. Vähentynyt PRDM16 → vähemmän BAT:ia → alentunut energiankulutus → painonnousu identtisellä kalorimäärällä",
        evidence: "PMC11942954 (2025): PRDM16-vähenemisen suora mittaus 5G-altistuksesta",
        status: "Kokeellisesti vahvistettu",
      },
      {
        name: "β-solun insuliinidynamiikan häiriö",
        id: "MECH-2",
        color: "blue",
        mechanism: "Sähkökenttä → Ca²⁺-kanavat avautuvat β-soluissa → insuliinin eritys ILMAN glukoosia",
        consequence:
          "CaVγ4→CaMKII→MafA-reitti: CaMKII:n dysregulaatio → β-solun identiteetin menetys → basaalinen hyperinsulinemia → insuliiniresistenssi → painonnousu",
        evidence: "PMID:32323041 + PMC9030882: Sähkökenttä-insuliinieritys + CaMKII→MafA-reitti",
        status: "Kokeellisesti vahvistettu",
      },
      {
        name: "HPA-akselin kortisolinkohonnus",
        id: "MECH-3",
        color: "red",
        mechanism: "EMF → HPA-sensitisaatio (EI adaptaatio) → krooninen kortisolin kohonnus",
        consequence:
          "Kortisoli → viskeraalisen rasvan kertyminen, insuliiniresistenssi, leptiiniresistenssi → metabolinen oireyhtymä → painonnousu",
        evidence: "Klimek 2023 + Frontiers 2026: HPA-sensitisaatio + kortikosteronin kohonnus",
        status: "Kokeellisesti vahvistettu",
      },
    ],

    resolutionTitle: "Ratkaisu",
    resolutionContent:
      "Kaikki kolme mekanismia välittyvät jänniteohjattujen kalsiumkanavien (VGCC) kautta. VGCC:t ovat evoluutionaalisesti muinaisia — läsnä KAIKISSA selkärankaisissa ja useimmissa selkärangattomissa. Mikä tahansa ympäristötekijä joka avaa VGCC:t vaikuttaisi KAIKKIIN lajeihin joilla on nämä kanavat. Tämä on täsmälleen Klimentidiksen kuvio: lajienvälinen painonnousu jonka ajaa kaikkiallinen ympäristömuutos (EMF-altistus) joka vaikuttaa konservoituneeseen molekyylitason kohteeseen (VGCC).",
    resolutionKey:
      "Klimentidiksen paradoksi ei ole paradoksaalinen BERM:n alla — se on ennustettu. Lajienväliset vaikutukset ovat odotettavissa oleva tulos evoluutionaalisesti konservoituneen mekanismin häiriöstä.",

    predictionLink: "Ks. mekanistisen ketjun ennusteet (KLIM-1, BAT-EMF-1, BETA-EMF-1–2)",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function KlimentidisExplainedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">
          {d.backLink}
        </Link>
      </p>

      <PageHeader icon={FlaskConical} title={d.title} subtitle={d.subtitle} />

      <div className="mt-8">
        <CautionBox locale={activeLocale}>
          <p>{d.cautionText}</p>
        </CautionBox>
      </div>

      {/* The Paradox */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.paradoxTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.paradoxLead}</p>
        <div className="space-y-2">
          {d.paradoxPoints.map((point, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-accent shrink-0 mt-0.5">{"→"}</span>
              <p>{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Three Ca2+-mediated mechanisms */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.mechanismsTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.mechanismsLead}</p>
        <div className="space-y-4">
          {d.mechanisms.map((mech) => (
            <div key={mech.id} className={`rounded-xl border border-card-border bg-card-bg p-5 ${MECHANISM_COLORS[mech.color]}`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono-num text-xs text-accent">{mech.id}</span>
                    <h3 className="font-semibold text-sm">{mech.name}</h3>
                  </div>
                  <p className="text-xs text-foreground-muted">{mech.mechanism}</p>
                </div>
                <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold border bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30">
                  {mech.status}
                </span>
              </div>
              <div className="rounded border border-card-border/60 bg-background p-3 mb-3">
                <p className="text-xs font-semibold text-foreground-muted mb-1">
                  {activeLocale === "fi" ? "Seuraus" : "Consequence"}
                </p>
                <p className="text-sm text-foreground-muted leading-relaxed">{mech.consequence}</p>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-1">{mech.evidence}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Resolution */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.resolutionTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.resolutionContent}</p>
        <div className="rounded-lg border-2 border-accent/40 bg-accent/5 p-4">
          <p className="text-sm text-foreground leading-relaxed italic">{d.resolutionKey}</p>
        </div>
      </section>

      {/* Predictions link */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <DerivedPrediction>
          <p className="text-sm leading-relaxed mb-3">
            {activeLocale === "fi"
              ? "Klimentidiksen paradoksin mekanistinen selitys tuottaa testattavia ennusteita BAT-suppressiosta, β-solun insuliinidynamiikasta ja HPA-akselin sensitisaatiosta."
              : "The mechanistic explanation of the Klimentidis paradox generates testable predictions covering BAT suppression, β-cell insulin dynamics, and HPA axis sensitization."}
          </p>
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">
            {d.predictionLink} {"→"}
          </Link>
        </DerivedPrediction>
      </section>
    </div>
  );
}
