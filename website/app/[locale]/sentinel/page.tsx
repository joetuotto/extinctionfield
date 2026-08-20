import type { Metadata } from "next";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SentinelReadiness } from "@/components/SentinelReadiness";
import { SentinelCascade } from "@/components/SentinelCascade";

const COPY = {
  en: {
    title: "Sentinel species: data readiness",
    subtitle: "Cross-species observations can motivate a registered test, but they cannot substitute for measured exposure, compatible endpoints and competing-cause data.",

    csliTitle: "Cross-Species Lag Signal: Empirical Results",
    csliP1: "In a source-verified 23-country COLOSS panel, bee colony winter loss increases precede TFR declines by approximately 2 years: 20/23 countries show the BERM-direction pattern (pooled within-country r = −0.272, circular-shift p = 0.006, 8-lag Bonferroni p = 0.046). The signal replicates across two independent TFR products (World Bank and WPP 2024).",
    csliP2: "The lag structure follows biological scaling. Aphids and honeybees show the shortest response (~2 years), consistent with short lifecycles. Breeding birds follow at 2–3 years. Moths at 3–4 years. Dogs predict human sperm concentration at ~3 years (r = 0.505, p = 0.012). Common toads show the longest lag at ~6 years, consistent with their longer lifecycle and population dynamics.",
    csliP3: "Year-change analysis (Δbee → ΔTFR) confirms temporal co-variation beyond co-trending. Americas (4/4) and Asia–Pacific (6/6) are uniformly BERM-direction; Europe is weaker (13/21). The 8 anti-direction European countries are informative: they identify conditions where beekeeping practice, pesticide policy, or immigration buffering modifies the sentinel chain.",
    csliStats: "20/23 BERM-direction · circular-shift p = 0.006 · pooled r = −0.272 · Bonferroni p = 0.046",
    csliNote: "All results are correlational [C] from BERM internal analyses. They are not peer-reviewed. A common confounder (e.g. agricultural chemicals, climate change) could produce the same pattern without EMF. Lag values are discovery-scan peaks, not pre-locked constants.",

    nikeTitle: "Spatial gradient: Cold War radar sites and bird populations",
    nikeText: "Spatial analysis of 1,381 Breeding Bird Survey routes near 268 Cold War Nike radar/fire control sites (median start 1956) reveals a BERM-direction gradient: routes within 50 km of active sites showed −0.526%/year population trends versus +0.096%/year for routes >100 km away (difference 0.622 percentage points, Welch p = 0.031). Continuous distance correlation: Spearman ρ = +0.088, p = 0.001 — farther from radar, better bird trends. Species richness signal persists in within-state permutation (p = 0.006).",
    nikeCounterText: "However, site closure did not predict bird recovery, and active site count correlated with higher bird abundance (possible infrastructure-habitat or siting bias). This constrains interpretation: proximity gradient exists but simple 'more sites = more damage' does not hold.",

    covidTitle: "COVID lockdown: an informative counter-result",
    covidText: "Source-verified COLOSS data does not show bee colony improvement during COVID lockdowns: winter loss increased by 2.27 percentage points (24/35 countries worsened, p = 0.043). BBS birds also declined 2.8–3.0% in 2020–22. This is an informative negative result: it shows that the simple 'lockdown → ambient EMF ↓ → sentinels improve' prediction does not hold, likely because household RF traffic increased while outdoor activity decreased.",
    covidLabel: "Counter-result",

    contextTitle: "What the current records can say",
    context: [
      ["Dogs", "A published single-site breeding-programme series reports changes in some semen endpoints over time. It lacks measured RF, household-device and regional endpoint data, so it is contextual rather than an exposure-gradient test."],
      ["Livestock", "Published artificial-insemination-centre summaries can be useful comparators, but breeding selection, station management, nutrition, housing and protocol changes must be observed. No low-RF control status is inferred without dosimetry."],
      ["Cross-species comparison", "Species differ in generation time, selection, reproductive physiology and data systems. A common temporal pattern does not identify a common field mechanism without matched place–time FieldState and endpoint data."],
    ],
    nextTitle: "What a usable sentinel study needs",
    next: ["Measured FieldState with provenance at the relevant environment and time resolution.", "Endpoint definitions and collection protocols comparable across locations or explicitly modelled.", "Pre-specified chemical, climate, husbandry, selection and disease covariates.", "A registered test that compares the field model with competing causal explanations."],
    link: "Read the FieldState measurement protocol",
  },
  fi: {
    title: "Indikaattorilajit: aineiston valmius",
    subtitle: "Lajienväliset havainnot voivat motivoida rekisteröidyn testin, mutta ne eivät korvaa mitattua altistusta, yhteensopivia päätepisteitä ja kilpailevien syiden dataa.",

    csliTitle: "Lajienvälinen viivesignaali: empiiriset tulokset",
    csliP1: "Lähdevarmennetussa 23 maan COLOSS-paneelissa mehiläispesien talvihäviön kasvu edeltää TFR:n laskua noin 2 vuodella: 20/23 maata osoittaa BERM-suuntaisen kuvion (yhdistetty maansisäinen r = −0,272, circular-shift p = 0,006, 8-viiveen Bonferroni p = 0,046). Signaali replikoituu kahdessa itsenäisessä TFR-tuotteessa (Maailmanpankki ja WPP 2024).",
    csliP2: "Viiverakenne seuraa biologista skaalautumista. Kirvat ja mehiläiset näyttävät lyhimmän vasteen (~2 vuotta), mikä on yhteensopivaa lyhyen elinkaaren kanssa. Pesimälinnut seuraavat 2–3 vuodessa. Yöperhoset 3–4 vuodessa. Koirat ennustavat ihmisen siittiökonsentraatiota ~3 vuodella (r = 0,505, p = 0,012). Rupikonnat näyttävät pisimmän viiveen ~6 vuodessa, mikä on yhteensopivaa pidemmän elinkaarensa ja populaatiodynamiikkansa kanssa.",
    csliP3: "Vuosimuutosanalyysi (Δmehiläinen → ΔTFR) vahvistaa ajallisen yhteisvaihtelun pelkän co-trendin sijaan. Amerikat (4/4) ja Aasia–Tyynimeri (6/6) ovat yhdenmukaisesti BERM-suuntaisia; Eurooppa on heikompi (13/21). 8 anti-suuntaista Euroopan maata ovat informatiivisia: ne tunnistavat olosuhteet, joissa pesänhoitokäytäntö, torjunta-ainepolitiikka tai maahanmuuttopuskuri muokkaa sentinelliketjua.",
    csliStats: "20/23 BERM-suuntaisia · circular-shift p = 0,006 · yhdistetty r = −0,272 · Bonferroni p = 0,046",
    csliNote: "Kaikki tulokset ovat korrelatiivisia [C] BERM:n sisäisistä analyyseistä. Niitä ei ole vertaisarvioitu. Yhteinen sekoittaja (esim. maatalouskemikaalit, ilmastonmuutos) voisi tuottaa saman kuvion ilman EMF:ää. Viivearvot ovat discovery-haun huippuja, eivät ennalta lukittuja vakioita.",

    nikeTitle: "Spatiaalinen gradientti: kylmän sodan tutka-asemat ja lintupopulaatiot",
    nikeText: "1 381 Breeding Bird Survey -reitin spatiaalinen analyysi 268 kylmän sodan Nike-tutka/tulenjohtokohteen lähellä (mediaani aloitusvuosi 1956) paljastaa BERM-suuntaisen gradientin: reitit alle 50 km:n päässä aktiivisista kohteista osoittivat −0,526 %/vuosi populaatiotrendejä verrattuna +0,096 %/vuosi yli 100 km:n päässä (ero 0,622 prosenttiyksikköä, Welch p = 0,031). Jatkuva etäisyyskorrelaatio: Spearman ρ = +0,088, p = 0,001 — kauempana tutkasta, paremmat lintutrendit. Lajirikkaussignaali säilyy osavaltion sisäisessä permutaatiossa (p = 0,006).",
    nikeCounterText: "Kohteiden sulkeutuminen ei kuitenkaan ennustanut lintujen elpymistä, ja aktiivisten kohteiden lukumäärä korreloi korkeamman linturunsauden kanssa (mahdollinen infrastruktuuri-habitaatti- tai sijoitusharha). Tämä rajoittaa tulkintaa: läheisyysgradientti on olemassa, mutta yksinkertainen 'enemmän kohteita = enemmän vahinkoa' ei päde.",

    covidTitle: "COVID-lockdown: informatiivinen vastatulos",
    covidText: "Lähdevarmennettu COLOSS-data ei näytä mehiläispesien paranemista COVID-lockdownien aikana: talvihäviö kasvoi 2,27 prosenttiyksikköä (24/35 maata paheni, p = 0,043). BBS-linnut myös laskivat 2,8–3,0 % vuosina 2020–22. Tämä on informatiivinen negatiivinen tulos: se osoittaa, että yksinkertainen 'lockdown → ambientin EMF ↓ → sentinellit paranevat' -ennuste ei päde, todennäköisesti koska kotitalouksien RF-liikenne kasvoi samalla kun ulkona liikkuminen väheni.",
    covidLabel: "Vastatulos",

    contextTitle: "Mitä nykyiset tietueet voivat sanoa",
    context: [
      ["Koirat", "Julkaistu yhden jalostusohjelman aikasarja raportoi joidenkin siemennestepäätepisteiden muutoksia. Siitä puuttuu mitattu RF, kotilaitetieto ja alueellinen päätepistedata, joten se on kontekstia eikä altistusgradienttitesti."],
      ["Tuotantoeläimet", "Julkaistut keinosiemennyskeskusten yhteenvedot voivat olla hyödyllisiä vertailuja, mutta jalostusvalinta, aseman hallinta, ravinto, asuminen ja protokollamuutokset on havaittava. Matalan RF:n kontrolliasemaa ei päätellä ilman dosimetriaa."],
      ["Lajienvälinen vertailu", "Lajit eroavat sukupolviajassa, valinnassa, lisääntymisfysiologiassa ja datajärjestelmissä. Yhteinen ajallinen kuvio ei tunnista yhteistä kenttämekanismia ilman kohdistettua paikka–aika-FieldStatea ja päätepistedataa."],
    ],
    nextTitle: "Mitä käyttökelpoinen sentinellitutkimus tarvitsee",
    next: ["Mitattu FieldState proveniensseineen relevantissa ympäristössä ja aikatasossa.", "Päätepistemääritelmät ja keruuprotokollat, jotka ovat vertailukelpoisia paikkojen välillä tai eksplisiittisesti mallinnettuja.", "Ennalta määritellyt kemikaali-, ilmasto-, kasvatus-, valinta- ja tautikovariaatit.", "Rekisteröity testi, joka vertaa kenttämallia kilpaileviin kausaalisiin selityksiin."],
    link: "Lue FieldState-mittausprotokolla",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function SentinelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Leaf} title={d.title} subtitle={d.subtitle} />
      <section className="mb-14"><SentinelReadiness locale={activeLocale} /></section>

      {/* CSLI empirical results */}
      <section className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-4">{d.csliTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed mb-6">
          <p>{d.csliP1}</p>
          <p>{d.csliP2}</p>
          <p>{d.csliP3}</p>
        </div>
        <p className="text-xs font-mono-num text-foreground-muted mb-6">{d.csliStats}</p>

        <div className="mb-6">
          <SentinelCascade locale={activeLocale} />
        </div>

        <div className="rounded-lg border border-status-partial/30 bg-status-partial/5 p-4">
          <p className="text-xs text-foreground-muted leading-relaxed">{d.csliNote}</p>
        </div>
      </section>

      {/* Nike radar spatial gradient */}
      <section className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <h2 className="editorial-section-heading mb-4">{d.nikeTitle}</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
          <p>{d.nikeText}</p>
          <div className="rounded-lg border border-status-partial/30 bg-status-partial/5 p-4">
            <p className="text-xs text-foreground-muted leading-relaxed">{d.nikeCounterText}</p>
          </div>
        </div>
      </section>

      {/* COVID counter-result */}
      <section className="mb-14 border-t editorial-rule pt-6 max-w-4xl">
        <p className="text-xs uppercase tracking-[0.16em] text-status-confirmed font-semibold mb-2">{d.covidLabel}</p>
        <h2 className="editorial-section-heading mb-4">{d.covidTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed">{d.covidText}</p>
      </section>

      {/* What current records can say */}
      <section className="mb-14 max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">{d.contextTitle}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {d.context.map(([title, text]) => (
            <article key={title} className="rounded-xl border border-card-border bg-card-bg p-5">
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* What a usable sentinel study needs */}
      <section className="max-w-4xl rounded-xl border border-card-border bg-card-bg p-6">
        <h2 className="text-xl font-semibold mb-3">{d.nextTitle}</h2>
        <ol className="space-y-3 text-sm text-foreground-muted leading-relaxed">
          {d.next.map((item, index) => (
            <li key={item} className="flex gap-3">
              <span className="font-mono-num text-accent">{index + 1}.</span>{item}
            </li>
          ))}
        </ol>
        <Link href={`/${activeLocale}/about/measurement`} className="inline-block mt-5 text-sm text-accent hover:underline">{d.link} →</Link>
      </section>
    </div>
  );
}
