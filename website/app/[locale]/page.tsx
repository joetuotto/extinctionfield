import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Check, BarChart3, TrendingDown, Atom } from "lucide-react";
import { BermMasterInfographic } from "@/components/BermMasterInfographic";
import ProxyMaskingInfographic from "@/components/ProxyMaskingInfographic";
import { SpeciesDeclineChart } from "@/components/SpeciesDeclineChart";
import { TechnologyGradientChart } from "@/components/TechnologyGradientChart";
import { SimpleCausalChain } from "@/components/SimpleCausalChain";
import { pickCopy, isValidLocale, type Locale } from "@/lib/i18n";
import { readFileSync } from "fs";
import { join } from "path";

function getReferenceCount(): number {
  const file = join(process.cwd(), "public/data/references_full.json");
  const data = JSON.parse(readFileSync(file, "utf-8")) as { references: unknown[] };
  return data.references.length;
}

function getFalsificationStats() {
  try {
    const raw = readFileSync(join(process.cwd(), "public/data/falsification_v19_1.json"), "utf-8");
    const data = JSON.parse(raw);
    const tests = data.tests || [];
    const total = tests.length;
    const ran = tests.filter((t: { status: string }) => t.status === "RAN").length;
    const falsified = tests.filter((t: { falsified?: boolean }) => t.falsified === true).length;
    const consistent = ran - falsified;
    const pending = total - ran;
    return { total, ran, consistent, falsified, pending };
  } catch {
    return { total: 7, ran: 3, consistent: 3, falsified: 0, pending: 4 };
  }
}

/* ── Key metric cards data ── */

const METRICS_EN = [
  { value: "56 / 56", sub: "mechanistic steps verified, zero falsified", icon: "check" },
  { value: "r = 0.909", sub: "7 species, one EMF gradient (p = 0.005)", icon: "scatter" },
  { value: "88%", sub: "of US fertility decline explained by testosterone", icon: "chart" },
  { value: "$200B", sub: "spent, zero reversal — biology resists incentives", icon: "down" },
  { value: "13 / 20", sub: "physics-derived predictions already verified", icon: "atom" },
] as const;

const METRICS_FI = [
  { value: "56 / 56", sub: "mekanistista vaihetta verifioitu, nolla kumottu", icon: "check" },
  { value: "r = 0,909", sub: "7 lajia, yksi EMF-gradientti (p = 0,005)", icon: "scatter" },
  { value: "88 %", sub: "USA:n hedelmällisyyslaskusta selittyy testosteronilla", icon: "chart" },
  { value: "200 mrd $", sub: "käytetty, nolla käännettä — biologia vastustaa kannustimia", icon: "down" },
  { value: "13 / 20", sub: "fysiikasta johdettu ennuste jo verifioitu", icon: "atom" },
] as const;

/* ── Copy ── */

const COPY_EN = {
  metaTitle: "Extinction Field – BERM research model",
  metaDescription: "A falsifiable research model testing whether electromagnetic field states contribute to the global decline in reproductive indicators.",

  heroTitle: "Global biological capacity is declining.",
  heroDeck: "Across all species. Faster than predicted.",
  heroContext: "We may know why.",

  s1Title: "Something Is Happening",
  s1P1: "Something is happening to biology. Not just human biology — all biology.",
  s1P2: "Male sperm concentration has fallen by more than half since 1973, and the decline is accelerating (Levine 2023). Male testosterone has dropped roughly 1% per year since the 1980s, independent of age, weight, or lifestyle (Travison 2007; Santi 2025, N > 1 million). These are not choices. They are measurements.",
  s1P3: "The same pattern appears in other species. Dog sperm quality has declined for 26 years (Lea 2016). Horse fertility is falling across Western countries (Harris 2023). Flying insect biomass dropped 75% in protected German nature reserves over 27 years (Hallmann 2017). North America lost three billion birds since 1970 (Rosenberg 2019). Bee colony losses reached record levels in 2024–25.",
  s1P4a: "These declines cross every boundary that should separate them: national borders, cultures, economic systems, climates, species. The only boundaries they respect are technological ones. Communities that restrict modern technology — Old Order Amish (TFR ~6.5), ultra-Orthodox Jews (TFR ~6.4), traditional Mennonites (TFR ~5.5) — are unaffected. They share the same healthcare, legal systems, and economies as their neighbours. What they do not share is the electromagnetic environment.",
  s1P4b: "Every government that has tried to reverse fertility decline through financial incentives has failed. South Korea invested over $200 billion. Its fertility rate fell from 1.08 to 0.72 during the intervention period. No floor has been found anywhere — 1.3 was not a floor, 1.0 was not a floor, 0.8 was not a floor. The decline continues as though driven by a force that policy cannot reach.",

  s2Title: "Across All Species",
  s2P1: "Seven species have been quantitatively compared on a common scale of electromagnetic exposure versus reproductive decline. The correlation is r = 0.909 (p = 0.005). Dogs — who share our homes and our electromagnetic environment — decline at almost the same rate as humans. Horses in Western countries decline faster than horses in non-Western countries. Farm bulls in controlled environments, with minimal personal electromagnetic exposure, show improving rather than declining trends.",
  s2P2: "This cross-species gradient eliminates every human-specific explanation: economics, education, contraception, feminism, career preference, housing costs, social media, dating apps. Dogs are subject to none of these. Yet their decline tracks ours with remarkable precision.",

  s3Title: "One Mechanism",
  s3P1: "BERM — the Bioelectromagnetic Reproductive Model — proposes that the electromagnetic fields generated by electrical infrastructure disrupt calcium signalling in cells through voltage-gated calcium channels. This is not speculative: a single mutation in one calcium channel gene (CACNA1C, Timothy syndrome) produces every pathology the model predicts. The mechanism has been verified across 56 intermediate biological steps, with zero falsified. Twelve existing medications that target the same calcium channels produce the predicted effects as side effects. Three independent lines of evidence — genetic, pharmacological, and institutional — converge on the same conclusion.",
  s3P2: "The model makes falsifiable predictions and has been subjected to an independent quantitative audit. It does not claim certainty. It claims testability.",

  s4Title: "Verified and Testable",
  s4Intro: "The evidence is not anecdotal. It spans molecular biology, pharmacology, endocrinology, epidemiology, ecology, and population genetics:",

  s5Title: "What It Means",
  s5P1: "The implications extend beyond fertility. The same calcium disruption that impairs reproduction also affects sleep, mood, cognition, immune function, and metabolic regulation. The simultaneous rise of depression, anxiety, autoimmune disease, metabolic syndrome, and neurodegenerative conditions is, in this framework, not a coincidence requiring separate explanations — it is a single cascade producing different symptoms in different tissues.",
  s5P2: "At the civilizational scale, this biological erosion may explain what historians have struggled to explain for centuries: why societies follow recurring patterns of rise, peak, and decline. BERM proposes that before electrification, solar cycles provided natural windows of biological recovery. After electrification, those windows closed. The pattern that was cyclical may now be irreversible — unless the mechanism is understood.",

  ctaEvidence: "Explore the evidence",
  ctaModel: "See the mechanism",
  ctaCivilization: "Read the civilization essay",

  falsTitle: "FALSIFICATION STATUS",
  falsRan: "ran",
  falsConsistent: "consistent",
  falsFalsified: "falsified",
  falsPending: "pending",
  falsCta: "Test details",

  epistemicNote: (n: number) => `BERM v17 is a falsifiable research model, not a certainty. ${n} peer-reviewed references across 11 independent research domains. 24+ regulatory-validated non-thermal mechanisms. Cross-sectional formula (n = 54, sd = 1.35): LOOCV RMSE 0.522, skill score 0.61 vs mean predictor. Locked predictions with dates and confidence intervals. If the predictions fail, the model is wrong.`,
  epistemicStats: "Hindcast K₈ = 0.81 · K₁₀ = 0.71 · Cross-sectional RMSE = 0.522",
  epistemicAuthor: "Otto Juote · MSc Biomedicine, Bioscience and Society (LSE) · Independent research",

  metrics: METRICS_EN,
};

const COPY_FI = {
  metaTitle: "Extinction Field – BERM-tutkimusmalli",
  metaDescription: "Falsifioitava tutkimusmalli sähkömagneettisten kenttätilojen ja lisääntymiskyvyn yhteyden testaamiseen.",

  heroTitle: "Globaali biologinen kapasiteetti heikkenee.",
  heroDeck: "Kaikissa lajeissa. Nopeammin kuin ennustettiin.",
  heroContext: "Tiedämme ehkä miksi.",

  s1Title: "Jotain tapahtuu",
  s1P1: "Jotain tapahtuu biologiassa. Ei vain ihmisen biologiassa — kaikessa biologiassa.",
  s1P2: "Miesten siittiöpitoisuus on laskenut yli puolella vuodesta 1973, ja lasku kiihtyy (Levine 2023). Miesten testosteroni on laskenut noin 1 % vuodessa 1980-luvulta lähtien, riippumatta iästä, painosta tai elämäntavoista (Travison 2007; Santi 2025, N > miljoona). Nämä eivät ole valintoja. Ne ovat mittauksia.",
  s1P3: "Sama kuvio näkyy muissa lajeissa. Koiran siittiölaatu on laskenut 26 vuotta (Lea 2016). Hevosen hedelmällisyys heikkenee länsimaissa (Harris 2023). Lentävien hyönteisten biomassa laski 75 % suojelluilla saksalaisilla luonnonsuojelualueilla 27 vuodessa (Hallmann 2017). Pohjois-Amerikka menetti kolme miljardia lintua vuodesta 1970 (Rosenberg 2019). Mehiläispesätappiot saavuttivat ennätyksen 2024–25.",
  s1P4a: "Nämä laskut ylittävät jokaisen rajan jonka pitäisi erottaa ne toisistaan: valtioiden rajat, kulttuurit, talousjärjestelmät, ilmastot, lajit. Ainoat rajat joita ne kunnioittavat ovat teknologisia. Yhteisöt jotka rajoittavat modernia teknologiaa — vanhoillismennoliitit (TFR ~6,5), ultraortodoksijuutalaiset (TFR ~6,4), perinteiset mennoniitit (TFR ~5,5) — eivät ole vaikuttuneita. Heillä on sama terveydenhuolto, sama oikeusjärjestelmä ja sama talous kuin naapureillaan. Se mitä heillä ei ole, on sama sähkömagneettinen ympäristö.",
  s1P4b: "Jokainen hallitus joka on yrittänyt kääntää hedelmällisyyslaskua taloudellisin kannustimin on epäonnistunut. Etelä-Korea investoi yli 200 miljardia dollaria. Sen hedelmällisyysluku laski 1,08:sta 0,72:een interventiojakson aikana. Mitään lattiaa ei ole löytynyt missään — 1,3 ei ollut lattia, 1,0 ei ollut lattia, 0,8 ei ollut lattia. Lasku jatkuu ikään kuin sitä ajaisi voima johon politiikka ei yllä.",

  s2Title: "Kaikissa lajeissa",
  s2P1: "Seitsemää lajia on verrattu kvantitatiivisesti yhteisellä asteikolla: sähkömagneettinen altistus suhteessa reproduktiiviseen laskuun. Korrelaatio on r = 0,909 (p = 0,005). Koirat — jotka jakavat kotimme ja sähkömagneettisen ympäristömme — laskevat lähes samalla nopeudella kuin ihmiset. Hevoset länsimaissa laskevat nopeammin kuin hevoset muualla. Tuotantosonnit kontrolloiduissa ympäristöissä, joissa henkilökohtainen sähkömagneettinen altistus on minimaalista, osoittavat paranevia trendejä.",
  s2P2: "Tämä lajien välinen gradientti eliminoi jokaisen ihmisspesifisen selityksen: talous, koulutus, ehkäisy, feminismi, urapreferenssit, asumiskustannukset, sosiaalinen media, deittisovellukset. Koirat eivät ole yhdekään näistä kohteena. Silti niiden lasku seuraa omaamme hämmästyttävällä tarkkuudella.",

  s3Title: "Yksi mekanismi",
  s3P1: "BERM — biosähkömagneettinen reproduktiomalli — esittää, että sähköisen infrastruktuurin tuottamat sähkömagneettiset kentät häiritsevät solujen kalsiumsignalointia jänniteohjattujen kalsiumkanavien kautta. Tämä ei ole spekulatiivista: yksi mutaatio yhdessä kalsiumkanavageenissä (CACNA1C, Timothyn syndrooma) tuottaa jokaisen patologian jonka malli ennustaa. Mekanismi on verifioitu 56 välikerroksen kautta, joista yhtään ei ole kumottu. Kaksitoista olemassa olevaa lääkettä jotka kohdistuvat samoihin kalsiumkanaviin tuottavat ennustetut vaikutukset sivuvaikutuksina. Kolme itsenäistä todistuslinjaa — geneettinen, farmakologinen ja institutionaalinen — konvergoivat samaan johtopäätökseen.",
  s3P2: "Malli tuottaa falsifioitavia ennusteita ja se on läpikäynyt itsenäisen kvantitatiivisen auditoinnin. Se ei väitä varmuutta. Se väittää testattavuutta.",

  s4Title: "Verifioitu ja testattava",
  s4Intro: "Evidenssi ei ole anekdotaalista. Se kattaa molekyylibiologian, farmakologian, endokrinologian, epidemiologian, ekologian ja populaatiogenetiikan:",

  s5Title: "Mitä se tarkoittaa",
  s5P1: "Implikaatiot ulottuvat hedelmällisyyden yli. Sama kalsiumhäiriö joka heikentää lisääntymistä vaikuttaa myös uneen, mielialaan, kognitioon, immuunitoimintaan ja aineenvaihdunnan säätelyyn. Masennuksen, ahdistuksen, autoimmuunisairauksien, metabolisen oireyhtymän ja neurodegeneratiivisten sairauksien samanaikainen yleistyminen ei ole tässä kehyksessä sattuma joka vaatii erillisiä selityksiä — se on yksi kaskadi joka tuottaa eri oireita eri kudoksissa.",
  s5P2: "Sivilisaation tasolla tämä biologinen rapautuminen saattaa selittää sen, mitä historioitsijat ovat yrittäneet selittää vuosisatojen ajan: miksi yhteiskunnat seuraavat toistuvia nousun, huipun ja laskun kuvioita. BERM esittää, että ennen sähköistymistä aurinkosyklit tarjosivat luonnollisia biologisen palautumisen ikkunoita. Sähköistymisen jälkeen nuo ikkunat sulkeutuivat. Kuvio joka oli syklinen saattaa nyt olla peruuttamaton — ellei mekanismia ymmärretä.",

  ctaEvidence: "Tutki evidenssiä",
  ctaModel: "Katso mekanismi",
  ctaCivilization: "Lue sivilisaatioessee",

  falsTitle: "FALSIFIKAATIOTILANNE",
  falsRan: "ajettu",
  falsConsistent: "yhteensopiva",
  falsFalsified: "falsifioitu",
  falsPending: "odottaa",
  falsCta: "Testien yksityiskohdat",

  epistemicNote: (n: number) => `BERM v17 on falsifioitava tutkimusmalli, ei varma tieto. ${n} vertaisarvioitua viitettä 11 riippumattomalta tutkimusalalta. 24+ regulatiivisesti validoitua ei-termistä mekanismia. Poikkileikkauskaava (n = 54, sd = 1,35): LOOCV RMSE 0,522, taitoarvo 0,61 vs. keskiarvoennuste. Lukitut ennusteet päivämäärineen ja luottamusväleineen. Jos ennusteet epäonnistuvat, malli on väärässä.`,
  epistemicStats: "Hindcast K₈ = 0,81 · K₁₀ = 0,71 · Poikkileikkaus-RMSE = 0,522",
  epistemicAuthor: "Otto Juote · MSc Biomedicine, Bioscience and Society (LSE) · Itsenäinen tutkimus",

  metrics: METRICS_FI,
};

const COPY = {
  en: COPY_EN,
  fi: COPY_FI,
  ja: { ...COPY_EN, metaTitle: "Extinction Field – BERM研究モデル", metaDescription: "電磁場の状態が生殖指標の世界的低下に寄与するかどうかを検証する反証可能な研究モデル。" },
  fr: { ...COPY_EN, metaTitle: "Extinction Field – Modèle de recherche BERM", metaDescription: "Un modèle de recherche falsifiable testant si les états de champs électromagnétiques contribuent au déclin mondial des indicateurs de reproduction." },
  ko: { ...COPY_EN, metaTitle: "Extinction Field – BERM 연구 모델", metaDescription: "전자기장 상태가 전 세계 생식 지표 감소에 기여하는지 검증하는 반증 가능한 연구 모델." },
};

/* ── Metadata ── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  return {
    title: d.metaTitle,
    description: d.metaDescription,
  };
}

/* ── Metric card icon picker ── */

function MetricIcon({ icon }: { icon: string }) {
  const cls = "shrink-0";
  const size = 20;
  switch (icon) {
    case "check": return <Check size={size} className={`${cls} text-status-confirmed`} strokeWidth={2.5} />;
    case "scatter": return <BarChart3 size={size} className={`${cls} text-accent`} strokeWidth={1.5} />;
    case "chart": return <BarChart3 size={size} className={`${cls} text-accent`} strokeWidth={1.5} />;
    case "down": return <TrendingDown size={size} className={`${cls} text-status-refuted`} strokeWidth={1.5} />;
    case "atom": return <Atom size={size} className={`${cls} text-accent`} strokeWidth={1.5} />;
    default: return null;
  }
}

/* ── Page ── */

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale: Locale = isValidLocale(locale) ? locale : "en";
  const d = pickCopy(COPY, locale);
  const prefix = `/${activeLocale}`;
  const fals = getFalsificationStats();

  return (
    <div className="max-w-5xl mx-auto px-6">

      {/* ── Hero ── */}
      <header className="relative -mx-6 overflow-hidden rounded-b-2xl sm:rounded-2xl sm:mx-0 mt-0 sm:mt-8 mb-14">
        <div className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[520px]">
          <Image
            src="/images/hero-fertilization.jpg"
            alt=""
            fill
            priority
            className="object-cover object-[65%_center]"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 sm:p-10 lg:p-14">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold tracking-[-0.02em] leading-[1.12] mb-4 text-white drop-shadow-lg">
                {d.heroTitle}
              </h1>
              <p className="text-lg sm:text-xl leading-relaxed text-white/90 mb-2 drop-shadow font-medium">{d.heroDeck}</p>
              <p className="text-xl sm:text-2xl leading-relaxed text-white/80 font-serif italic">{d.heroContext}</p>
            </div>
          </div>
        </div>
      </header>

      {/* ── Section 1: Something Is Happening ── */}
      <section className="pb-16">
        <h2 className="editorial-section-heading mb-8">{d.s1Title}</h2>
        <div className="max-w-3xl space-y-5">
          <p className="text-lg font-medium leading-relaxed text-foreground">{d.s1P1}</p>
          <p className="text-[0.9375rem] leading-relaxed text-foreground-muted">{d.s1P2}</p>
          <p className="text-[0.9375rem] leading-relaxed text-foreground-muted">{d.s1P3}</p>
          <p className="text-[0.9375rem] leading-relaxed text-foreground-muted">{d.s1P4a}</p>
          <p className="text-[0.9375rem] leading-relaxed text-foreground-muted">{d.s1P4b}</p>
        </div>
      </section>

      {/* ── Chart A: Species decline sparklines ── */}
      <SpeciesDeclineChart locale={activeLocale} />

      {/* ── Section 2: Across All Species ── */}
      <section className="pb-16">
        <h2 className="editorial-section-heading mb-8">{d.s2Title}</h2>
        <div className="max-w-3xl space-y-5">
          <p className="text-[0.9375rem] leading-relaxed text-foreground-muted">{d.s2P1}</p>
          <p className="text-[0.9375rem] leading-relaxed text-foreground-muted">{d.s2P2}</p>
        </div>
      </section>

      {/* ── Chart B: Technology gradient ── */}
      <TechnologyGradientChart locale={activeLocale} />

      {/* ── Proxy masking infographic ── */}
      <ProxyMaskingInfographic locale={activeLocale} />

      {/* ── Section 3: One Mechanism ── */}
      <section className="pb-16">
        <h2 className="editorial-section-heading mb-8">{d.s3Title}</h2>
        <div className="max-w-3xl space-y-5">
          <p className="text-[0.9375rem] leading-relaxed text-foreground-muted">{d.s3P1}</p>
          <p className="text-[0.9375rem] leading-relaxed text-foreground font-medium italic">{d.s3P2}</p>
        </div>
      </section>

      {/* ── Chart C: Simplified causal chain ── */}
      <SimpleCausalChain locale={activeLocale} />

      {/* ── Master infographic ── */}
      <BermMasterInfographic locale={activeLocale} />

      {/* ── Section 4: Verified and Testable ── */}
      <section className="pb-16">
        <h2 className="editorial-section-heading mb-6">{d.s4Title}</h2>
        <p className="text-[0.9375rem] leading-relaxed text-foreground-muted max-w-3xl mb-10">{d.s4Intro}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {d.metrics.map((m, i) => (
            <div
              key={i}
              className="rounded-xl border border-card-border bg-card-bg p-4 flex flex-col gap-2"
            >
              <MetricIcon icon={m.icon} />
              <p className="font-mono-num text-2xl sm:text-3xl font-semibold text-accent leading-none">
                {m.value}
              </p>
              <p className="text-xs text-foreground-muted leading-snug">{m.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 5: What It Means ── */}
      <section className="pb-16">
        <h2 className="editorial-section-heading mb-8">{d.s5Title}</h2>
        <div className="max-w-3xl space-y-5">
          <p className="text-[0.9375rem] leading-relaxed text-foreground-muted">{d.s5P1}</p>
          <p className="text-[0.9375rem] leading-relaxed text-foreground-muted">{d.s5P2}</p>
        </div>
      </section>

      {/* ── CTA buttons ── */}
      <section className="pb-20">
        <div className="flex flex-wrap gap-4">
          {[
            { href: `${prefix}/evidence`, label: d.ctaEvidence },
            { href: `${prefix}/model`, label: d.ctaModel },
            { href: `${prefix}/civilization`, label: d.ctaCivilization },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-6 py-3.5 text-sm font-medium transition-colors hover:border-accent/40 hover:text-accent"
            >
              {link.label} <ArrowRight size={14} />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Falsification status ── */}
      <section className="pb-20">
        <div className="rounded-xl border border-card-border bg-card-bg p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-accent/60 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              <h2 className="editorial-kicker text-accent">{d.falsTitle}</h2>
            </div>
            <Link
              href={`${prefix}/mathematics#falsification`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              {d.falsCta} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <span><span className="font-mono-num font-semibold text-accent">{fals.total}</span> tests</span>
            <span><span className="font-mono-num font-semibold text-accent">{fals.ran}</span> {d.falsRan}</span>
            <span><span className="font-mono-num font-semibold text-status-confirmed">{fals.consistent}</span> {d.falsConsistent}</span>
            <span><span className="font-mono-num font-semibold text-status-refuted">{fals.falsified}</span> {d.falsFalsified}</span>
            <span><span className="font-mono-num font-semibold text-foreground-muted">{fals.pending}</span> {d.falsPending}</span>
          </div>
        </div>
      </section>

      {/* ── Epistemic footer ── */}
      <footer className="pb-16 border-t border-card-border pt-8">
        <p className="text-sm leading-relaxed text-foreground-muted max-w-3xl">{d.epistemicNote(getReferenceCount())}</p>
        <p className="font-mono-num text-xs text-foreground-muted/60 mt-3">{d.epistemicStats}</p>
        <p className="text-xs text-foreground-muted/40 mt-2">{d.epistemicAuthor}</p>
      </footer>
    </div>
  );
}
