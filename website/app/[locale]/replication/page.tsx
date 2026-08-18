import type { Metadata } from "next";

const t = {
  en: {
    title: "Laboratory Baseline Bias",
    heroSubtitle: "The Replication Crisis as a BERM Prediction",
    intro: `The replication crisis — the finding that a large fraction of published biological and biomedical results cannot be reproduced — is typically attributed to statistical malpractice, publication bias, or poor methodology. These explanations are partially correct but incomplete. BERM offers a structural, mechanistic explanation: if ambient electromagnetic fields affect biological processes through the χ(Ā) selection rule, then rising laboratory EMF backgrounds systematically contaminate control groups, compressing observed effect sizes toward zero.`,
    introSecond: `This is not a separate claim bolted onto the fertility model. It is a mathematical consequence of the same χ function that drives the TFR predictions. If χ governs biological sensitivity to EMF, and laboratory environments are saturated with EMF, then every control group in every EMF-sensitive biological assay conducted in the last two decades has been chronically exposed.`,
    mechanismsTitle: "Three mechanisms",
    mech1Title: "1. Control group contamination",
    mech1: `The χ function saturates: χ(Ā) = Ā/√(1+Ā²) approaches 1.0 rapidly. A laboratory with 15 V/m broadband ambient EMF (typical of a modern university building) has χ ≈ 0.998. The control group's biology is not at baseline — it is already at 99.8% of maximum EMF effect. Any experimental treatment that acts through an EMF-sensitive pathway will show a compressed effect size because the control is not unexposed.`,
    mech2Title: "2. Equipment evolution",
    mech2: `Laboratory equipment itself has changed. A 1985 incubator had a simple thermostat. A 2020 incubator has digital controllers, LED displays, WiFi-connected monitoring, and sits next to computers, routers, and other electronics. The electromagnetic environment inside the incubator — where cells grow for days or weeks — has fundamentally changed, but this variable is never controlled or reported.`,
    mech3Title: "3. Chronic animal exposure",
    mech3: `Laboratory animals are housed in facilities with increasing ambient EMF. A rat born and raised in a 2020 vivarium has been chronically exposed its entire life. Its baseline physiology — Ca²⁺ signaling, oxidative stress, circadian regulation — is not the same as a rat from a 1985 vivarium. This affects every experiment that uses these animals as "controls."`,
    quantTitle: "Quantitative analysis",
    quantIntro: "The BERM diagnostic module computes the bias at each decade:",
    colDecade: "Decade",
    colLabEmf: "Lab EMF (V/m)",
    colChi: "χ (control)",
    colBias: "Effect hidden (%)",
    colObservable: "Observable fraction",
    quantExplain: `By the 1990s, over 96% of the true effect is hidden because the control group's χ is already near saturation. This means a genuine biological effect of EMF exposure that would have been easily detectable in a 1960s laboratory is nearly invisible in a 2020s laboratory — not because the effect disappeared, but because the control caught up.`,
    replicationTitle: "Replication prediction",
    replicationText: `Consider a calcium signaling experiment originally published in 1985. The lab ambient was approximately 1.7 V/m (χ ≈ 0.86). The experiment found a significant effect of RF exposure on intracellular Ca²⁺. When replicated in 2015, the lab ambient was approximately 12 V/m (χ ≈ 0.997). The BERM model predicts the replication would observe only 2.4% of the original effect size — far below statistical significance at any reasonable sample size. The replication "fails" not because the original was wrong, but because the baseline shifted.`,
    faradayTitle: "The discriminative test",
    faradayText: `BERM makes a specific, falsifiable prediction: a biological assay run in parallel inside a Faraday-shielded incubator (< 0.01 V/m) and a standard laboratory incubator (~15 V/m) should show dramatically different effect sizes for EMF-sensitive endpoints. The model predicts the shielded assay would show approximately 684× larger effect size.`,
    faradayProposal: `This is the simplest possible test of the laboratory baseline hypothesis. It requires one Faraday cage, one standard incubator, and a standard Ca²⁺ assay protocol. If the shielded assay shows no improvement, the laboratory baseline hypothesis is falsified. If it shows the predicted improvement, every unshielded biological experiment is suspect.`,
    implicationsTitle: "Implications",
    impl1: `If this analysis is correct, the replication crisis is not primarily a statistical or methodological problem — it is an environmental problem. The laboratory itself has changed in a way that systematically destroys the detectability of EMF-sensitive biological effects.`,
    impl2: `This does not mean all failed replications are explained by EMF. Many are genuine statistical artifacts. But for the subset of biology that involves Ca²⁺ signaling, ROS production, circadian rhythms, or any pathway modulated by voltage-gated ion channels, the laboratory baseline shift provides a specific, quantifiable, and testable explanation.`,
    impl3: `The practical solution is straightforward: EMF-sensitive experiments should be conducted in electromagnetically shielded environments, and laboratory ambient EMF should be measured and reported as a standard methodological variable.`,
    noteTitle: "Note",
    noteText: `This page describes a structural consequence of the BERM model. It is not part of the core fertility prediction (which does not depend on laboratory bias). It is presented because it is the model's broadest and most testable implication — and because scientific integrity requires stating consequences that extend beyond the original domain of the model.`,
  },
  fi: {
    title: "Laboratorion perustason harha",
    heroSubtitle: "Replikaatiokriisi BERM:n ennusteena",
    intro: `Replikaatiokriisi — havainto, että suuri osa julkaistuista biologisista ja biolääketieteellisistä tuloksista ei ole toistettavissa — selitetään tyypillisesti tilastollisilla virheillä, julkaisuharhalla tai heikolla metodologialla. Nämä selitykset ovat osittain oikeita mutta puutteellisia. BERM tarjoaa rakenteellisen, mekanistisen selityksen: jos ympäristön sähkömagneettiset kentät vaikuttavat biologisiin prosesseihin χ(Ā)-valintasäännön kautta, nousevat laboratorion EMF-taustat kontaminoivat systemaattisesti kontrolliryhmät, puristaen havaitut efektikoot kohti nollaa.`,
    introSecond: `Tämä ei ole erillinen väite, joka on liitetty hedelmällisyysmalliin. Se on matemaattinen seuraus samasta χ-funktiosta, joka ohjaa TFR-ennusteita. Jos χ hallitsee biologista herkkyyttä EMF:lle ja laboratorioympäristöt ovat kyllästetyt EMF:llä, jokainen kontrolliryhmä jokaisessa EMF-herkässä biologisessa kokeessa viimeisten kahden vuosikymmenen aikana on ollut kroonisesti altistunut.`,
    mechanismsTitle: "Kolme mekanismia",
    mech1Title: "1. Kontrolliryhmän kontaminaatio",
    mech1: `χ-funktio kyllästyy: χ(Ā) = Ā/√(1+Ā²) lähestyy 1.0:aa nopeasti. Laboratorio, jossa on 15 V/m laajakaista-EMF (tyypillinen moderni yliopistorakennus), χ ≈ 0.998. Kontrolliryhmän biologia ei ole perustasolla — se on jo 99.8% maksimi-EMF-vaikutuksessa. Mikä tahansa kokeellinen käsittely, joka vaikuttaa EMF-herkän reitin kautta, näyttää puristuneen efektikoon, koska kontrolli ei ole altistamaton.`,
    mech2Title: "2. Laitteiden muutos",
    mech2: `Laboratoriolaitteet ovat muuttuneet. Vuoden 1985 inkubaattorissa oli yksinkertainen termostaatti. Vuoden 2020 inkubaattorissa on digitaaliset ohjaimet, LED-näytöt, WiFi-yhdistetty monitorointi, ja se sijaitsee tietokoneiden, reitittimien ja muun elektroniikan vieressä. Sähkömagneettinen ympäristö inkubaattorin sisällä — missä solut kasvavat päiviä tai viikkoja — on perustavanlaatuisesti muuttunut, mutta tätä muuttujaa ei koskaan kontrolloida tai raportoida.`,
    mech3Title: "3. Eläinten krooninen altistus",
    mech3: `Laboratorioanimaalia pidetään tiloissa, joissa EMF-tausta kasvaa. Rotta, joka on syntynyt ja kasvanut vuoden 2020 eläintilassa, on ollut kroonisesti altistunut koko elinikänsä. Sen perustason fysiologia — Ca²⁺-signalointi, oksidatiivinen stressi, sirkadiaaninen säätely — ei ole sama kuin vuoden 1985 eläintilassa kasvaneen rotan. Tämä vaikuttaa jokaiseen kokeeseen, joka käyttää näitä eläimiä "kontrollina."`,
    quantTitle: "Kvantitatiivinen analyysi",
    quantIntro: "BERM:n diagnostiikkamoduuli laskee harhan jokaiselle vuosikymmenelle:",
    colDecade: "Vuosikymmen",
    colLabEmf: "Lab EMF (V/m)",
    colChi: "χ (kontrolli)",
    colBias: "Piilossa (%)",
    colObservable: "Havaittava osuus",
    quantExplain: `1990-luvulle mennessä yli 96% todellisesta efektistä on piilossa, koska kontrolliryhmän χ on jo lähellä kyllästymistä. Tämä tarkoittaa, että aito biologinen EMF-altistuksen vaikutus, joka olisi ollut helposti havaittavissa 1960-luvun laboratoriossa, on lähes näkymätön 2020-luvun laboratoriossa — ei siksi, että vaikutus katosi, vaan koska kontrolli saavutti sen.`,
    replicationTitle: "Replikaatioennuste",
    replicationText: `Harkitse kalsiumsignalointikoetta, joka julkaistiin alun perin vuonna 1985. Laboratorion tausta oli noin 1.7 V/m (χ ≈ 0.86). Koe löysi merkittävän RF-altistuksen vaikutuksen solunsisäiseen Ca²⁺:iin. Kun se replikoitiin vuonna 2015, laboratorion tausta oli noin 12 V/m (χ ≈ 0.997). BERM-malli ennustaa, että replikaatio havaitsisi vain 2.4% alkuperäisestä efektikoosta — kaukana tilastollisesta merkitsevyydestä millä tahansa järkevällä otoskoolla. Replikaatio "epäonnistuu" ei siksi, että alkuperäinen oli väärä, vaan koska perustaso siirtyi.`,
    faradayTitle: "Diskriminoiva testi",
    faradayText: `BERM tekee spesifin, falsifioitavan ennusteen: biologinen koe, joka suoritetaan rinnakkain Faraday-suojatussa inkubaattorissa (< 0.01 V/m) ja tavallisessa laboratorio-inkubaattorissa (~15 V/m), näyttäisi dramaattisesti eri efektikoot EMF-herkille päätepisteille. Malli ennustaa, että suojattu koe näyttäisi noin 684× suuremman efektikoon.`,
    faradayProposal: `Tämä on yksinkertaisin mahdollinen testi laboratorion perustaso-hypoteesille. Se vaatii yhden Faraday-häkin, yhden tavallisen inkubaattorin ja standardin Ca²⁺-koeprotokollan. Jos suojattu koe ei näytä parannusta, laboratorion perustaso-hypoteesi on falsifioitu. Jos se näyttää ennustetun parannuksen, jokainen suojaamaton biologinen koe on epäilyksenalainen.`,
    implicationsTitle: "Seuraukset",
    impl1: `Jos tämä analyysi on oikea, replikaatiokriisi ei ole ensisijaisesti tilastollinen tai metodologinen ongelma — se on ympäristöongelma. Itse laboratorio on muuttunut tavalla, joka systemaattisesti tuhoaa EMF-herkkien biologisten efektien havaittavuuden.`,
    impl2: `Tämä ei tarkoita, että kaikki epäonnistuneet replikaatiot selittyvät EMF:llä. Monet ovat aitoja tilastollisia artefakteja. Mutta sille biologian osajoukolle, joka liittyy Ca²⁺-signalointiin, ROS-tuotantoon, sirkadiaanisiin rytmeihin tai mihin tahansa jänniteohjattujen ionikanavien moduloimaan reittiin, laboratorion perustason siirtymä tarjoaa spesifin, kvantifioitavan ja testattavan selityksen.`,
    impl3: `Käytännön ratkaisu on suoraviivainen: EMF-herkät kokeet tulisi suorittaa sähkömagneettisesti suojatuissa ympäristöissä, ja laboratorion EMF-tausta tulisi mitata ja raportoida standardina metodologisena muuttujana.`,
    noteTitle: "Huomautus",
    noteText: `Tämä sivu kuvaa BERM-mallin rakenteellista seurausta. Se ei ole osa ydinhedelmällisyysennustetta (joka ei riipu laboratorion harhasta). Se esitetään, koska se on mallin laajin ja testattavin implikaatio — ja koska tieteellinen integriteetti edellyttää sellaisten seurausten toteamista, jotka ulottuvat mallin alkuperäisen alueen ulkopuolelle.`,
  },
} as const;

const DECADE_DATA = [
  { decade: "1950s", labEmf: 0.11, chi: 0.1142, biasPct: 11.4, observable: 0.886 },
  { decade: "1960s", labEmf: 0.28, chi: 0.2652, biasPct: 26.5, observable: 0.735 },
  { decade: "1970s", labEmf: 0.65, chi: 0.5450, biasPct: 54.5, observable: 0.455 },
  { decade: "1980s", labEmf: 1.70, chi: 0.8619, biasPct: 86.2, observable: 0.138 },
  { decade: "1990s", labEmf: 3.75, chi: 0.9662, biasPct: 96.6, observable: 0.034 },
  { decade: "2000s", labEmf: 8.00, chi: 0.9923, biasPct: 99.2, observable: 0.008 },
  { decade: "2010s", labEmf: 12.0, chi: 0.9965, biasPct: 99.7, observable: 0.003 },
  { decade: "2020s", labEmf: 18.0, chi: 0.9985, biasPct: 99.9, observable: 0.001 },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locale === "fi"
    ? {
        title: "Laboratorion perustason harha - Extinction Field",
        description:
          "Replikaatiokriisi BERM-mallin rakenteellisena ennusteena: laboratorion EMF-taustan nousu kontaminoi kontrolliryhmät.",
      }
    : {
        title: "Laboratory Baseline Bias - Extinction Field",
        description:
          "The replication crisis as a structural prediction of the BERM model: rising laboratory EMF backgrounds contaminate control groups.",
      };
}

export default async function ReplicationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = locale === "fi" ? t.fi : t.en;

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-1">{d.title}</h1>
      <p className="text-lg text-accent font-medium mb-6">{d.heroSubtitle}</p>

      <div className="space-y-4 text-foreground-muted leading-relaxed mb-10">
        <p>{d.intro}</p>
        <p>{d.introSecond}</p>
      </div>

      {/* Three mechanisms */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">{d.mechanismsTitle}</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-semibold mb-1">{d.mech1Title}</h3>
            <p className="text-foreground-muted leading-relaxed text-sm">
              {d.mech1}
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold mb-1">{d.mech2Title}</h3>
            <p className="text-foreground-muted leading-relaxed text-sm">
              {d.mech2}
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold mb-1">{d.mech3Title}</h3>
            <p className="text-foreground-muted leading-relaxed text-sm">
              {d.mech3}
            </p>
          </div>
        </div>
      </section>

      {/* Quantitative analysis */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">{d.quantTitle}</h2>
        <p className="text-foreground-muted text-sm mb-4">{d.quantIntro}</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-4 font-medium">{d.colDecade}</th>
                <th className="py-2 pr-4 font-medium font-mono-num">
                  {d.colLabEmf}
                </th>
                <th className="py-2 pr-4 font-medium font-mono-num">
                  {d.colChi}
                </th>
                <th className="py-2 pr-4 font-medium font-mono-num">
                  {d.colBias}
                </th>
                <th className="py-2 font-medium font-mono-num">
                  {d.colObservable}
                </th>
              </tr>
            </thead>
            <tbody>
              {DECADE_DATA.map((row) => (
                <tr
                  key={row.decade}
                  className="border-b border-border/50 text-foreground-muted"
                >
                  <td className="py-1.5 pr-4">{row.decade}</td>
                  <td className="py-1.5 pr-4 font-mono-num">
                    {row.labEmf.toFixed(2)}
                  </td>
                  <td className="py-1.5 pr-4 font-mono-num">
                    {row.chi.toFixed(4)}
                  </td>
                  <td className="py-1.5 pr-4 font-mono-num">
                    {row.biasPct.toFixed(1)}%
                  </td>
                  <td className="py-1.5 font-mono-num">
                    {row.observable.toFixed(3)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-foreground-muted text-sm mt-4 leading-relaxed">
          {d.quantExplain}
        </p>
      </section>

      {/* Replication prediction */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">{d.replicationTitle}</h2>
        <p className="text-foreground-muted text-sm leading-relaxed">
          {d.replicationText}
        </p>

        <div className="mt-4 bg-card-bg border border-card-border rounded-lg p-4 text-sm font-mono-num text-foreground-muted space-y-1">
          <p>
            1985: lab EMF ≈ 1.7 V/m → χ<sub>control</sub> ≈ 0.862
          </p>
          <p>
            2015: lab EMF ≈ 12 V/m → χ<sub>control</sub> ≈ 0.997
          </p>
          <p>
            effect<sub>2015</sub> / effect<sub>1985</sub> ={" "}
            <span className="text-accent font-semibold">0.024 (2.4%)</span>
          </p>
        </div>
      </section>

      {/* Faraday test */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">{d.faradayTitle}</h2>
        <p className="text-foreground-muted text-sm leading-relaxed mb-4">
          {d.faradayText}
        </p>

        <div className="bg-card-bg border border-accent/30 rounded-lg p-4 text-sm space-y-2">
          <div className="font-mono-num text-foreground-muted space-y-1">
            <p>
              Faraday-shielded: EMF &lt; 0.01 V/m → χ ≈ 0.01
            </p>
            <p>
              Standard lab: EMF ≈ 17 V/m → χ ≈ 0.998
            </p>
            <p>
              Predicted effect ratio:{" "}
              <span className="text-accent font-bold text-base">~684×</span>
            </p>
          </div>
        </div>

        <p className="text-foreground-muted text-sm leading-relaxed mt-4">
          {d.faradayProposal}
        </p>
      </section>

      {/* Implications */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">{d.implicationsTitle}</h2>
        <div className="space-y-3 text-foreground-muted text-sm leading-relaxed">
          <p>{d.impl1}</p>
          <p>{d.impl2}</p>
          <p>{d.impl3}</p>
        </div>
      </section>

      {/* Note */}
      <div className="border-t border-border pt-6 mt-12">
        <p className="text-xs text-foreground-muted leading-relaxed">
          <span className="font-semibold">{d.noteTitle}: </span>
          {d.noteText}
        </p>
      </div>
    </main>
  );
}
