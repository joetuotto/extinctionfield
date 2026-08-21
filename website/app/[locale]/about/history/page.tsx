import type { Metadata } from "next";
import { History } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const COPY = {
  en: {
    title: "Research development",
    subtitle: "How BERM developed into a measurement-aware research specification.",
    entries: [
      ["Research question", "The programme asks how documented physical field conditions, biological states and demographic outcomes can be connected without collapsing their separate measurement layers."],
      ["Evidence mapping", "Source checking maps studies by field class, system, frequency, intensity, temperature control and endpoint. Blood–testis barrier, ovarian and circadian findings motivate distinct organ-specific branches."],
      ["Lindgren-derived measurement hypotheses", "Background dependence, vector orientation, local geometry, spectral content and timing became explicit experimental variables. They are retained as testable upstream premises, not as a direct estimate of human reproductive risk or TFR."],
      ["BERM v19", "The active route now keeps FieldState, organ-local transfer, reversible/persistent organ state, couple capacity, ASFR and TFR distinct. It treats mobile subscriptions as a descriptive technology-timing proxy only."],
      ["Cross-species lag signal (2026)", "The first quantitative cross-species lag signal was documented: in 23 countries, bee colony winter loss increase precedes human TFR decline by approximately 2 years (circular-shift p = 0.006, combined r = −0.272). A spatial gradient near Cold War radar sites showed bird population trends declining closer to active sites (Welch p = 0.031). These are correlational discovery results, not causal proof."],
      ["Current research focus", "The next data layer joins measured FieldState, organ/couple endpoints and ASFR on a compatible time axis so the registered mappings can be calibrated and evaluated."],
    ],
    note: "The development record keeps the measurement contract, evidence roles and demographic terms explicit so every link can be tested independently.",
  },
  fi: {
    title: "Tutkimuksen kehityskaari",
    subtitle: "Miten BERM kehittyi mittaustietoiseksi tutkimusmäärittelyksi.",
    entries: [
      ["Tutkimuskysymys", "Ohjelma kysyy, miten dokumentoidut fysikaaliset kenttäolosuhteet, biologiset tilat ja demografiset tulokset voidaan yhdistää tiivistämättä niiden erillisiä mittauskerroksia yhdeksi suureeksi."],
      ["Evidenssin kartoitus", "Lähteet kartoitetaan kenttäluokan, järjestelmän, taajuuden, intensiteetin, lämpökontrollin ja päätepisteen mukaan. Veri–kiveseste-, munasarja- ja vuorokausilöydökset motivoivat erillisiä elinkohtaisia haaroja."],
      ["Lindgrenistä johdetut mittaushypoteesit", "Taustariippuvuus, vektorin orientaatio, paikallinen geometria, spektrisisältö ja ajoitus nostettiin eksplisiittisiksi kokeellisiksi muuttujiksi. Ne säilyvät testattavina upstream-premisseinä, eivät suoraan ihmisen lisääntymisriskin tai TFR:n estimaattina."],
      ["BERM v19", "Aktiivinen reitti pitää FieldStaten, elinkohtaisen siirron, palautuvan/persistentin elintilan, parikapasiteetin, ASFR:n ja TFR:n erillisinä. Mobiililiittymiä käsitellään vain kuvailevana teknologian ajoitusproxyna."],
      ["Lajienvälinen viivesignaali (2026)", "Ensimmäinen kvantitatiivinen lajienvälinen viivesignaali dokumentoitiin: 23 maassa mehiläispesien talvihäviön kasvu edeltää ihmisen TFR-laskua noin 2 vuodella (circular-shift p = 0,006, yhdistetty r = −0,272). Spatiaalinen gradientti kylmän sodan tutka-asemien lähellä osoitti lintupopulaatiotrendien laskevan lähempänä aktiivisia kohteita (Welch p = 0,031). Nämä ovat korrelatiivisia discovery-tuloksia, eivät kausaalitodiste."],
      ["Nykyinen tutkimusfokus", "Seuraava datakerros yhdistää mitatun FieldStaten, elin-/paripäätepisteet ja ASFR:n yhteensopivalle aika-akselille, jotta rekisteröidyt mappingit voidaan kalibroida ja arvioida."],
    ],
    note: "Kehityskertomus pitää mittauskontraktin, evidenssin roolit ja demografiset termit näkyvinä, jotta jokainen lenkki voidaan testata itsenäisesti.",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function HistoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <PageHeader icon={History} title={d.title} subtitle={d.subtitle} />
      <ol className="space-y-5 max-w-3xl">
        {d.entries.map(([title, text], index) => (
          <li key={title} className="flex gap-4">
            <span className="shrink-0 mt-0.5 font-mono-num text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
            <article className="border border-card-border bg-card-bg rounded-xl p-5">
              <h2 className="font-semibold mb-2">{title}</h2>
              <p className="text-sm text-foreground-muted leading-relaxed">{text}</p>
            </article>
          </li>
        ))}
      </ol>
      <p className="mt-8 max-w-3xl rounded-xl border border-status-partial/30 bg-status-partial/5 p-5 text-sm text-foreground-muted leading-relaxed">{d.note}</p>
    </div>
  );
}
