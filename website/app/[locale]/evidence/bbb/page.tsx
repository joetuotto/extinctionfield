import type { Metadata } from "next";
import Link from "next/link";
import { Brain } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { BBBMechanismDiagram } from "@/components/BBBMechanismDiagram";
import { CitationLink } from "@/components/CitationLink";

const COPY = {
  en: {
    title: "Biological Barriers: BBB & BTB",
    subtitle: "Pathway F biological barrier multiplier — BBB and blood-testis barrier share the same tight junction mechanism",
    backLink: "← Back to Evidence",
    narrativeTitle: "BBB tight junction mechanism (Gao 2024, Ulusoy 2025)",
    narrativeParagraphs: [
      "Gao et al. (2024, Bioelectromagnetics, bem.22494) demonstrate that electromagnetic pulse (EMP) caused BBB disruption in rat brains via tight junction protein (occludin, claudin, ZO-1) degradation. Ulusoy et al. (2025, Int J Basic Med Sci) showed that 27.12 MHz RF-EMF opens the BBB via eNOS activation and occludin downregulation — without oxidative stress at 30 min, progressing to structural damage at 360 min. This confirms a non-thermal, progressive mechanism.",
      "BERM extends pathway F from BBB-only to a Biological Barrier Multiplier covering both BBB and BTB. The blood-testis barrier (BTB) uses the same tight junction proteins (occludin, ZO-1, claudins) as the BBB. Yu et al. (2019, Sci Total Environ) demonstrated that long-term 4G exposure (2605 MHz) directly disrupts BTB integrity via the Spock3-MMP2 axis, producing time-dependent reproductive toxicity. BTB disruption has a MORE DIRECT reproductive effect because it compromises the immune-privileged spermatogenic microenvironment. The barrier multiplier operates as positive feedback: EMF opens barrier → protected tissue exposed → more damage → barrier weakens further.",
    ],
    narrativeStudies: [
      { citation: "Gao et al. (Bioelectromagnetics)", year: 2024, note: "EMP → tight junction protein degradation → BBB opening. Mechanistic support for pathway F (EMP, not chronic RF)." },
      { citation: "Salford et al.", year: 2003, note: "BBB opening at GSM frequencies (SAR 0.016 W/kg) — BERM's direct pathway F reference." },
      { citation: "Ulusoy et al. (Int J Basic Med Sci)", year: 2025, note: "27.12 MHz RF → eNOS ↑ → occludin ↓ → BBB opening. Non-thermal at 30 min, structural at 360 min." },
      { citation: "Yu et al. (Sci Total Environ)", year: 2019, note: "4G (2605 MHz) → Spock3-MMP2-BTB axis → direct spermatogenic toxicity. Time-dependent, progressive." },
    ],
    btbBoundary: "BTB data is from a single research group (Yu et al. 2019). The finding is mechanistically strong and time-dependent, but independent replication from another group is pending.",
    seeAlso: "See also",
    evidencePortal: "Evidence register",
  },
  fi: {
    title: "Biologiset esteet: BBB ja BTB",
    subtitle: "Polku F:n biologinen estemultiplikeri — BBB ja veri-kiveseste jakavat saman tight junction -mekanismin",
    backLink: "← Takaisin evidenssiin",
    narrativeTitle: "BBB:n tight junction -mekanismi (Gao 2024, Ulusoy 2025)",
    narrativeParagraphs: [
      "Gao ym. (2024, Bioelectromagnetics, bem.22494) osoittavat, että sähkömagneettinen pulssi (EMP) aiheutti veri-aivoesteen häiriön rottien aivoissa tight junction -proteiinien (okkludiini, klaudiini, ZO-1) degradaation kautta. Ulusoy ym. (2025, Int J Basic Med Sci) osoittivat, että 27,12 MHz RF-EMF avaa BBB:n eNOS-aktivaation ja okkludiinin alaregulaation kautta — ilman oksidatiivista stressiä 30 minuutissa, edeten rakenteelliseen vaurioon 360 minuutissa.",
      "BERM laajentaa polun F pelkästä BBB:stä biologiseksi estemultiplieriksi, joka kattaa sekä BBB:n että BTB:n. Veri-kiveseste (BTB) käyttää samoja tight junction -proteiineja (okkludiini, ZO-1, klaudiinit) kuin BBB. Yu ym. (2019, Sci Total Environ) osoittivat, että pitkäaikainen 4G-altistus (2605 MHz) häiritsee BTB:n eheyttä suoraan Spock3-MMP2-akselin kautta, tuottaen aikariippuvaisen lisääntymistoksisuuden. BTB:n häiriöllä on SUOREMPI lisääntymisvaikutus, koska se vaarantaa immuuniprivilegoidun spermatogeneettisen mikroympäristön. Estemultiplieri toimii positiivisena takaisinkytkentänä: EMF avaa esteen → suojattu kudos altistuu → enemmän vauriota → este heikkenee edelleen.",
    ],
    narrativeStudies: [
      { citation: "Gao ym. (Bioelectromagnetics)", year: 2024, note: "EMP → tight junction -proteiinien degradaatio → BBB-avautuminen. Mekanistinen tuki polulle F (EMP, ei krooninen RF)." },
      { citation: "Salford ym.", year: 2003, note: "BBB-avautuminen GSM-taajuuksilla (SAR 0,016 W/kg) — BERM:n suora polun F viite." },
      { citation: "Ulusoy ym. (Int J Basic Med Sci)", year: 2025, note: "27,12 MHz RF → eNOS ↑ → okkludiini ↓ → BBB-avautuminen. Ei-terminen 30 min, rakenteellinen 360 min." },
      { citation: "Yu ym. (Sci Total Environ)", year: 2019, note: "4G (2605 MHz) → Spock3-MMP2-BTB-akseli → suora spermatogeneettinen toksisuus. Aikariippuvainen, progressiivinen." },
    ],
    btbBoundary: "BTB-data on yhdeltä tutkimusryhmältä (Yu ym. 2019). Löydös on mekanistisesti vahva ja aikariippuvainen, mutta itsenäinen replikaatio toisesta ryhmästä puuttuu.",
    seeAlso: "Katso myös",
    evidencePortal: "Evidenssirekisteri",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function BBBPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link href={`/${locale}/evidence`} className="text-sm text-accent hover:underline mb-6 inline-block">
        {d.backLink}
      </Link>

      <PageHeader icon={Brain} title={d.title} subtitle={d.subtitle} />

      {/* BBB tight junction narrative */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <article id="narrative-bbb-tight-junction" className="scroll-mt-24">
          <h3 className="text-lg font-semibold mb-4">
            <span className="font-mono-num text-xs text-accent mr-2">01</span>
            {d.narrativeTitle}
          </h3>
          {d.narrativeParagraphs.length > 0 && (
            <p className="editorial-rail mb-4 text-[0.95rem] leading-relaxed text-foreground">
              {d.narrativeParagraphs[0]}
            </p>
          )}
          <div className="space-y-3 text-sm text-foreground-muted leading-relaxed mb-5">
            {d.narrativeParagraphs.slice(1).map((p, pi) => (
              <p key={pi}>{p}</p>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                  <th className="py-2 pr-3">{activeLocale === "fi" ? "Viite" : "Citation"}</th>
                  <th className="py-2 pr-3 w-16">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                  <th className="py-2">{activeLocale === "fi" ? "Huomio" : "Note"}</th>
                </tr>
              </thead>
              <tbody>
                {d.narrativeStudies.map((s) => (
                  <tr key={`${s.citation}-${s.year}`} className="border-b border-card-border/40">
                    <td className="py-2 pr-3 font-medium text-foreground"><CitationLink citation={s.citation} year={s.year} /></td>
                    <td className="py-2 pr-3 font-mono-num text-foreground-muted">{s.year}</td>
                    <td className="py-2 text-foreground-muted">{s.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      {/* BTB boundary note */}
      {"btbBoundary" in d && (
        <p className="mt-3 text-xs text-foreground-muted max-w-3xl leading-relaxed italic border-l-2 border-amber-500/30 pl-3 mb-8">
          {(d as typeof COPY.en).btbBoundary}
        </p>
      )}

      {/* BBB/BTB Pathway F: Mechanism, Aging Synergy, and Arendash Paradox */}
      <section id="bbb-pathway-f" className="mb-16 border-t editorial-rule pt-6">
        <span id="bbb" />
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? "Polku F: Biologiset esteet — EMF-multiplikeri" : "Pathway F: Biological Barriers — The EMF Multiplier"}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {activeLocale === "fi"
              ? "EMF avaa veri-aivoesteen (BBB) kolmella rinnakkaisella mekanismilla. Ikääntyminen heikentää SAMOJA tight junction -proteiineja — yhdistelmävaikutus on synergistinen, ei additiivinen. Sairaalaympäristö yhdistää korkeimman EMF-altistuksen, ikääntyneimmät potilaat ja lääkeaineet veressä: tulos on suunnittelematon aivoannoksen kasvu."
              : "EMF opens the blood-brain barrier (BBB) via three parallel mechanisms. Aging degrades the SAME tight junction proteins — the combined effect is synergistic, not additive. The hospital environment combines the highest EMF exposure, the most elderly patients, and circulating drugs: the result is unplanned brain dose escalation."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Gao ym. (2024, Bioelectromagnetics) osoittivat kriittisen löydöksen: sähkömagneettinen pulssi avasi tight junctionit FYYSISESTI (TEM-kuvissa näkyvä aukko) vaikka TJ-proteiinien (ZO-1, klaudiini-5, okludiini) TASOT eivät muuttuneet western blotissa. Proteiinit ovat paikalla, mutta niiden 3D-konformaatio on muuttunut — ne eivät enää tiivistä liitosta. Tämä selittää miksi tutkimukset jotka mittaavat vain proteiiniespressiota (de Gannes, Franke) eivät löydä BBB-vaikutuksia."
              : "Gao et al. (2024, Bioelectromagnetics) demonstrated a critical finding: electromagnetic pulse opened tight junctions PHYSICALLY (visible gap in TEM images) even though TJ protein LEVELS (ZO-1, claudin-5, occludin) did not change on western blot. The proteins are present but their 3D conformation has changed — they no longer seal the junction. This explains why studies measuring only protein expression (de Gannes, Franke) do not find BBB effects."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "IOP Science scoping review (2026, Physics in Medicine and Biology) vahvistaa: evidenssi on ristiriitaista mutta positiiviset tulokset on replikoitu useissa itsenäisissä laboratorioissa (Salford/Lund, Tang/Kiina, Ulusoy/Iran, Gao/Kiina). Negatiiviset tulokset (Finnie, Franke, de Gannes, Kuribayashi) selittyvät osittain mittausmenetelmäerolla (western blot vs. TEM vs. albumiinivuoto), anestesiatyypillä ja altistuksen modulaatiolla."
              : "The IOP Science scoping review (2026, Physics in Medicine and Biology) confirms: evidence is contradictory but positive results have been replicated in multiple independent laboratories (Salford/Lund, Tang/China, Ulusoy/Iran, Gao/China). Negative results (Finnie, Franke, de Gannes, Kuribayashi) are partly explained by measurement method differences (western blot vs. TEM vs. albumin leakage), anesthesia type, and exposure modulation."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Ulusoy ym. (2025, Iranian J Basic Medical Sciences) ehdottavat RF-EMF:ää TERAPEUTTISEKSI TYÖKALUKSI BBB:n avaamiseen lääkeaineiden toimittamiseksi aivoihin: 27.12 MHz → eNOS → NO → okludiini ↓ → TJ auki. Tämä on terapeuttisten laitteiden paradoksin uusi variantti: tutkijat hyödyntävät EMF:n biologista aktiivisuutta samalla kun ICNIRP kieltää sen olemassaolon."
              : "Ulusoy et al. (2025, Iranian J Basic Medical Sciences) propose RF-EMF as a THERAPEUTIC TOOL for opening the BBB to deliver drugs to the brain: 27.12 MHz → eNOS → NO → occludin ↓ → TJ open. This is a new variant of the therapeutic device paradox: researchers exploit EMF's biological activity while ICNIRP denies its existence."}
          </p>
        </div>

        <div className="mt-6">
          <BBBMechanismDiagram locale={activeLocale} />
        </div>

        <div className="mt-6 space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <h3 className="text-sm font-semibold text-foreground">
            {activeLocale === "fi" ? "Kolme rinnakkaista BBB-avausmekanismia" : "Three parallel BBB-opening mechanisms"}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                  <th className="py-2 pr-3">#</th>
                  <th className="py-2 pr-3">{activeLocale === "fi" ? "Reitti" : "Pathway"}</th>
                  <th className="py-2 pr-3">{activeLocale === "fi" ? "Evidenssi" : "Evidence"}</th>
                  <th className="py-2">{activeLocale === "fi" ? "Taajuus" : "Frequency"}</th>
                </tr>
              </thead>
              <tbody className="text-foreground-muted">
                <tr className="border-b border-card-border/40">
                  <td className="py-2 pr-3 font-mono-num">1</td>
                  <td className="py-2 pr-3">{"VGCC → Ca²⁺ → eNOS → NO → occludin/claudin ↓"}</td>
                  <td className="py-2 pr-3">Ulusoy 2025, Pall 2013</td>
                  <td className="py-2">27.12 MHz, RF</td>
                </tr>
                <tr className="border-b border-card-border/40">
                  <td className="py-2 pr-3 font-mono-num">2</td>
                  <td className="py-2 pr-3">{"p38MAPK → hsp27 → stress fibers → TJ"}</td>
                  <td className="py-2 pr-3">Leszczynski 2002</td>
                  <td className="py-2">900 MHz (GSM)</td>
                </tr>
                <tr className="border-b border-card-border/40">
                  <td className="py-2 pr-3 font-mono-num">3</td>
                  <td className="py-2 pr-3">{activeLocale === "fi" ? "miRNA-muutos → pitkäaikainen TJ-dysregulaatio" : "miRNA change → long-term TJ dysregulation"}</td>
                  <td className="py-2 pr-3">Dasdag 2015</td>
                  <td className="py-2">2.4 GHz (Wi-Fi)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <h3 className="text-sm font-semibold text-foreground">
            {activeLocale === "fi" ? "Arendash-paradoksi: BBB-avaus on kaksisuuntainen" : "The Arendash Paradox: BBB opening is bidirectional"}
          </h3>
          <p>
            {activeLocale === "fi"
              ? "Arendash ym. (2010–2019) osoittivat, että 918 MHz EMF-hoito (2h/vrk) SUOJAA Alzheimerin hiiriä ja jopa kääntää kognitiivisen heikkenemisen — hajottamalla Aβ-oligomeerit ja tehostamalla mitokondrioita. Kliininen pilottikoe (8 potilasta, TEMT 2kk) osoitti kognitiivista paranemista. Tämä EI kumoa BBB-avauslöydöksiä — se vahvistaa niitä: BBB:n avautuminen on biologinen prosessi jonka nettovaikutus riippuu kontekstista."
              : "Arendash et al. (2010–2019) demonstrated that 918 MHz EMF treatment (2h/day) PROTECTS Alzheimer's mice and even reverses cognitive decline — by disaggregating Aβ oligomers and enhancing mitochondria. A clinical pilot (8 patients, TEMT 2 months) showed cognitive improvement. This does NOT refute BBB-opening findings — it confirms them: BBB opening is a biological process whose net effect depends on context."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Puhdas veri + BBB auki = Aβ-puhdistus (hyödyllinen). Toksiineja veressä + BBB auki = neurotoksisuus (haitallinen). Arendash-laboratorion puhtailla hiirillä vaikutus oli hyödyllinen. Todellisessa maailmassa vanhuksen veressä on ftalaatteja, raskasmetalleja, lääkejäämiä ja mikromuoveja."
              : "Clean blood + BBB open = Aβ clearance (beneficial). Toxins in blood + BBB open = neurotoxicity (harmful). Arendash's clean laboratory mice benefited. In the real world, an elderly person's blood contains phthalates, heavy metals, drug residues, and microplastics."}
          </p>
        </div>

        <div className="mt-6 space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <h3 className="text-sm font-semibold text-foreground">
            {activeLocale === "fi" ? "Sairaala-BBB iatogeeninen hypoteesi" : "Hospital-BBB iatrogenic hypothesis"}
          </h3>
          <p>
            {activeLocale === "fi"
              ? "Lääkkeiden annostelussa oletetaan normaali BBB. Vanhusten sairaalapotilailla BBB on heikentynyt KAHDESTA syystä: ikääntyminen (okludiini ↓, ZO-1 ↓) JA sairaalan EMF (konformaatiomuutos + eNOS-reitti). Efektiivinen aivoannos on suurempi kuin farmakokineettinen malli ennustaa. Tämä voi selittää osan sairaalahoitojakson aikaisesta deliriumista (esiintyvyys 15–53 % kirurgisilla, jopa 80 % tehohoidossa)."
              : "Drug dosing assumes normal BBB. In elderly hospital patients, BBB is compromised for TWO reasons: aging (occludin ↓, ZO-1 ↓) AND hospital EMF (conformational change + eNOS pathway). Effective brain dose is higher than pharmacokinetic models predict. This may explain part of hospital-acquired delirium (incidence 15–53% surgical, up to 80% ICU)."}
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{activeLocale === "fi" ? "Viite" : "Citation"}</th>
                <th className="py-2 pr-3 w-16">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                <th className="py-2">{activeLocale === "fi" ? "Löydös" : "Finding"}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Gao ym. (Bioelectromagnetics)</td>
                <td className="py-2 pr-3 font-mono-num">2024</td>
                <td className="py-2">{activeLocale === "fi" ? "EMP avaa TJ:t konformaatiomuutoksella — proteiiniekspressio muuttumaton" : "EMP opens TJs via conformational change — protein expression unchanged"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">IOP Science (Phys. Med. Biol.)</td>
                <td className="py-2 pr-3 font-mono-num">2026</td>
                <td className="py-2">{activeLocale === "fi" ? "Scoping review: BBB-evidenssi ristiriitaista mutta positiivinen useissa itsenäisissä laboissa" : "Scoping review: BBB evidence contradictory but positive in multiple independent labs"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Ulusoy ym. (Iranian J Basic Med Sci)</td>
                <td className="py-2 pr-3 font-mono-num">2025</td>
                <td className="py-2">{activeLocale === "fi" ? "RF-EMF BBB-modulaatio ehdotettu terapeuttiseksi työkaluksi; eNOS→NO→okludiini↓" : "RF-EMF BBB modulation proposed as therapeutic tool; eNOS→NO→occludin↓"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Arendash ym.</td>
                <td className="py-2 pr-3 font-mono-num">2010–2019</td>
                <td className="py-2">{activeLocale === "fi" ? "918 MHz TEMT: Aβ-disaggregaatio, kognitiivinen paraneminen AD-hiirissä ja pilottipotilaissa" : "918 MHz TEMT: Aβ disaggregation, cognitive improvement in AD mice and pilot patients"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Immunity & Ageing</td>
                <td className="py-2 pr-3 font-mono-num">2015</td>
                <td className="py-2">{activeLocale === "fi" ? "Ikääntyneiden hiirten BBB: okludiini ↓, ZO-1 ↓, TNF-α ↑, permeabiliteetti ↑" : "Aged mice BBB: occludin ↓, ZO-1 ↓, TNF-α ↑, permeability ↑"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Tang ym.</td>
                <td className="py-2 pr-3 font-mono-num">2015</td>
                <td className="py-2">{activeLocale === "fi" ? "900 MHz 3h/vrk 28vrk → spatiaalisen muistin heikkeneminen + BBB-permeabiliteetti ↑" : "900 MHz 3h/day 28d → spatial memory impairment + BBB permeability ↑"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Dasdag ym.</td>
                <td className="py-2 pr-3 font-mono-num">2015</td>
                <td className="py-2">{activeLocale === "fi" ? "2.4 GHz Wi-Fi → aivojen miRNA-ekspression muutokset alle turvarajan" : "2.4 GHz Wi-Fi → brain miRNA expression changes below safety limits"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Leszczynski ym.</td>
                <td className="py-2 pr-3 font-mono-num">2002</td>
                <td className="py-2">{activeLocale === "fi" ? "900 MHz → hsp27/p38MAPK-stressivaste endoteelisoluissa → BBB-permeabiliteetti ↑" : "900 MHz → hsp27/p38MAPK stress response in endothelial cells → BBB permeability ↑"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl">
          {activeLocale === "fi"
            ? "Episteeminen taso: BBB-avaus konformaatiomekanismi [E] (Gao 2024, TEM). BBB-evidenssi kokonaisuutena [M/C] (IOP 2026 scoping review). Ikääntymis-synergia [C] (samat proteiinit, testaamaton yhdistelmä). Arendash kaksisuuntaisuus [E] (kliininen pilotti). Sairaala-iatogeeninen [C] (hypoteesi, P27–P28)."
            : "Epistemic level: BBB opening conformational mechanism [E] (Gao 2024, TEM). BBB evidence overall [M/C] (IOP 2026 scoping review). Aging synergy [C] (same proteins, untested combination). Arendash bidirectionality [E] (clinical pilot). Hospital-iatrogenic [C] (hypothesis, P27–P28)."}
        </p>
      </section>

      {/* Alzheimer's and the Calcium Upstream */}
      <section id="alzheimer-calcium" className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? "Alzheimer ja kalsiumin ylävirta" : "Alzheimer's and the Calcium Upstream"}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {activeLocale === "fi"
              ? "Alzheimer-tutkimuksen kalsiumhypoteesi (LaFerla, O'Day, Bhatt) toteaa, että solunsisäisen kalsiumin dysregulaatio on VARHAINEN tapahtuma joka EDELTÄÄ amyloidin kertymistä. Anti-amyloidilääkkeet poistavat plakit mutta eivät paranna kognitiota — plakit ovat oire, eivät syy. Mutta kalsiumhypoteesi ei selitä MIKÄ aiheuttaa Ca²⁺-dysregulaation. BERM:n VGCC-mekanismi (Pall 2013) tarjoaa puuttuvan ylävirran syyn: EMF → VGCC → Ca²⁺ ↑."
              : "The calcium hypothesis of Alzheimer's research (LaFerla, O'Day, Bhatt) states that intracellular calcium dysregulation is an EARLY event that PRECEDES amyloid accumulation. Anti-amyloid drugs remove plaques but do not improve cognition — plaques are a symptom, not the cause. But the calcium hypothesis does not explain WHAT causes Ca²⁺ dysregulation. BERM's VGCC mechanism (Pall 2013) provides the missing upstream cause: EMF → VGCC → Ca²⁺ ↑."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Kriittinen löydös (Bhatt ym., PMC3065491): Ca²⁺:n läsnäollessa Aβ(1-40) muodostaa ensisijaisesti TOKSISIA OLIGOMEEREJA, kun taas ilman Ca²⁺:a se aggregoituu HARMITTOMIKSI FIBRILLEIKSI. Kalsiumtaso ei vain lisää amyloidin tuotantoa — se ratkaisee onko amyloidi vaarallista vai ei. Tämä selittää miksi plakkien poistaminen ei auta: oligomeerit (ei plakit) ovat toksinen muoto, ja niiden muodostumista ohjaa Ca²⁺."
              : "Critical finding (Bhatt et al., PMC3065491): in the presence of Ca²⁺, Aβ(1-40) preferentially forms TOXIC OLIGOMERS, whereas in the absence of Ca²⁺ it aggregates into HARMLESS FIBRILS. Calcium level does not just increase amyloid production — it determines whether amyloid is dangerous or not. This explains why removing plaques doesn't help: oligomers (not plaques) are the toxic form, and their formation is directed by Ca²⁺."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Preseniini-konvergenssi: PSEN1/PSEN2-mutaatiot (perinnöllinen AD, ~5% tapauksista) aiheuttavat Ca²⁺-dysregulaation GENEETTISESTI. EMF aiheuttaa saman Ca²⁺-dysregulaation YMPÄRISTÖLLISESTI VGCC-reitin kautta. Sama logiikka kuin CACNA1C × EHS: geeni ja ympäristö konvergoivat samaan kalsiumpolkuun. CACNA1C rs7304986, joka moduloi EMF:n uni-vaikutusta (Sousouri 2025), voi myös moduloida kumulatiivista AD-riskiä."
              : "Presenilin convergence: PSEN1/PSEN2 mutations (familial AD, ~5% of cases) cause Ca²⁺ dysregulation GENETICALLY. EMF causes the same Ca²⁺ dysregulation ENVIRONMENTALLY via the VGCC pathway. Same logic as CACNA1C × EHS: gene and environment converge on the same calcium pathway. CACNA1C rs7304986, which modulates EMF sleep effects (Sousouri 2025), may also modulate cumulative AD risk."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Positiivinen palautesilmukka: Aβ-oligomeerit muodostavat UUSIA kalsiumhuokosia solukalvoon → lisää Ca²⁺-influksia → lisää Aβ-tuotantoa → kiihtyvä kierre. Alkuvaiheessa EMF:n Ca²⁺-vaikutus on palautuva ja kompensoitavissa. Mutta kun oligomeerien omat Ca²⁺-huokoset aktivoituvat, prosessi tulee EMF:stä RIIPPUMATTOMAKSI. Tämä 'point of no return' selittää miksi AD kiihtyy."
              : "Positive feedback loop: Aβ oligomers form NEW calcium pores in the cell membrane → more Ca²⁺ influx → more Aβ production → accelerating cycle. Initially, EMF's Ca²⁺ effect is reversible and compensable. But once oligomer-formed Ca²⁺ pores activate, the process becomes EMF-INDEPENDENT. This 'point of no return' explains why AD accelerates."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Arendash-paradoksi: kontrolloitu EMF (918 MHz, 2h/vrk) SUOJAA AD:ltä hiirimalleissa ja kliinisissä pilottikokeissa (MemorEM/TEMT). Tämä EI kumoa BERM:ää — se VAHVISTAA biologisen aktiivisuuden. Annos, taajuus ja konteksti ratkaisevat: puhdas laboratorioaltistus avaa BBB:n → Aβ-puhdistus; krooninen ympäristö-EMF usean taajuuden sekoituksena → hallitsematon Ca²⁺-häiriö."
              : "Arendash paradox: controlled EMF (918 MHz, 2h/day) PROTECTS against AD in mouse models and clinical pilot trials (MemorEM/TEMT). This does NOT refute BERM — it CONFIRMS biological activity. Dose, frequency, and context determine outcome: clean lab exposure opens BBB → Aβ clearance; chronic environmental multi-frequency EMF → uncontrolled Ca²⁺ disruption."}
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{activeLocale === "fi" ? "Viite" : "Citation"}</th>
                <th className="py-2 pr-3 w-16">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                <th className="py-2">{activeLocale === "fi" ? "Löydös" : "Finding"}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">PMC4909906</td>
                <td className="py-2 pr-3 font-mono-num">2016</td>
                <td className="py-2">{activeLocale === "fi" ? "Ca²⁺-dysregulaatio on AD:n PROKSIMAALINEN SYY" : "Ca²⁺ dysregulation is a PROXIMAL CAUSE of AD dysfunction"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Bhatt ym. (PMC3065491)</td>
                <td className="py-2 pr-3 font-mono-num">2009</td>
                <td className="py-2">{activeLocale === "fi" ? "Ca²⁺ ohjaa Aβ → toksiset oligomeerit (ei fibrillit)" : "Ca²⁺ directs Aβ → toxic oligomers (not fibrils)"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">O'Day (PMC7179355)</td>
                <td className="py-2 pr-3 font-mono-num">2020</td>
                <td className="py-2">{activeLocale === "fi" ? "Ca²⁺-dysregulaatio on VARHAINEN tapahtuma, edeltää neurodegeneraatiota" : "Ca²⁺ dysregulation is an EARLY event, precedes neurodegeneration"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">PMC8125740</td>
                <td className="py-2 pr-3 font-mono-num">2021</td>
                <td className="py-2">{activeLocale === "fi" ? "Ca²⁺-homeostaasi ja neuronaalinen eksitabiliteetti keskeisiä Aβ-neurotoksisuudessa" : "Ca²⁺ homeostasis and neuronal excitability key in Aβ neurotoxicity"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">PMC7037278</td>
                <td className="py-2 pr-3 font-mono-num">2020</td>
                <td className="py-2">{activeLocale === "fi" ? "Preseniini-mutaatiot → Ca²⁺-dysregulaatio (geneettinen konvergenssi)" : "Presenilin mutations → Ca²⁺ dysregulation (genetic convergence)"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">PMC8124842</td>
                <td className="py-2 pr-3 font-mono-num">2021</td>
                <td className="py-2">{activeLocale === "fi" ? "Anti-amyloidilääkkeet EPÄONNISTUNEET → tarvitaan vaihtoehtoisia mekanismeja" : "Anti-amyloid drugs FAILED → need alternative mechanisms"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl">
          {activeLocale === "fi"
            ? "Episteeminen taso: Ca²⁺-dysregulaatio AD:ssä [E] (PMC4909906/PMC7179355). Ca²⁺ → oligomeerit [E] (Bhatt PMC3065491). EMF → VGCC → Ca²⁺ [E] (Pall 2013). EMF → AD-kausaatio [C] (hypoteesi). Arendash-paradoksi [E] (kliininen pilotti). Kalsiumhypoteesi ei ole konsensus — se on yksi kilpailevista hypoteeseista."
            : "Epistemic level: Ca²⁺ dysregulation in AD [E] (PMC4909906/PMC7179355). Ca²⁺ → oligomers [E] (Bhatt PMC3065491). EMF → VGCC → Ca²⁺ [E] (Pall 2013). EMF → AD causation [C] (hypothesis). Arendash paradox [E] (clinical pilot). The calcium hypothesis is not consensus — it is one of several competing hypotheses."}
        </p>
      </section>

      {/* Hospital EMF Hypothesis */}
      <section id="hospital-emf" className="mb-16 border-t editorial-rule pt-6">
        <h2 className="editorial-section-heading mb-3">
          {activeLocale === "fi" ? "Sairaala-EMF-hypoteesi" : "The Hospital EMF Hypothesis"}
        </h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {activeLocale === "fi"
              ? "'Post-hospital syndrome' (Krumholz, NEJM 2013) on todellinen ilmiö: sairaalahoidon jälkeen potilaiden riski kasvaa KAIKILLE diagnooseille, ei vain alkuperäiselle. 30 päivän sisällä kotiutumisesta potilaat ovat kohonneessa riskissä sydäninfarkteille, pneumonialle, kaatumisille ja deliriumille — riippumatta tulosyystä. Konventionaaliset selitykset (unenpuute, vuodelepo, stressi, lääkkeet) eivät sisällä EMF:ää."
              : "'Post-hospital syndrome' (Krumholz, NEJM 2013) is a real phenomenon: after hospital discharge, patient risk rises for ALL diagnoses, not just the original one. Within 30 days of discharge, patients face elevated risk of myocardial infarction, pneumonia, falls, and delirium — regardless of admission diagnosis. Conventional explanations (sleep deprivation, bed rest, stress, medications) do not include EMF."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "BERM-hypoteesi: vanhukset siirtyvät matalan EMF:n kotiympäristöstä korkeimman EMF:n ympäristöön. Sairaalan EMF-lähteitä ovat: 24/7 LED-valaistus (IF-EMF), Wi-Fi-tukiasemat (RF), potilasmonitorit (IF+ELF), sähkösängyt (ELF), ja lukuisat lääkintälaitteet. ICU-ympäristössä on mitattu jopa 40 µT magneettikenttiä laitteiden lähellä (PubMed 10447544). Vanhukset ovat 95% ajasta sängyssä — heillä ei ole mahdollisuutta siirtyä pois altistuksesta."
              : "BERM hypothesis: elderly patients move from a low-EMF home environment to the highest-EMF environment. Hospital EMF sources include: 24/7 LED lighting (IF-EMF), Wi-Fi access points (RF), patient monitors (IF+ELF), electric beds (ELF), and numerous medical devices. ICU environments have measured up to 40 µT magnetic fields near equipment (PubMed 10447544). Elderly patients spend 95% of time in bed — they cannot move away from the exposure."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Modulooman näkökulmasta sairaala-EMF aktivoi KAIKKI kaskadipoluot samanaikaisesti: LED 24/7 → IF → unihäiriö + melatoniini↓; Wi-Fi → RF → CRY-häiriö; monitorit → IF+ELF → sydämen rytmihäiriö (HRV↓); sähkösänky → ELF → 24/7 kehokontakti. 'Yleistynyt riski' = modulooman simultaaninen aktivaatio jo heikentyneessä ionikanavahomeostaasissa."
              : "From the modulome perspective, hospital EMF activates ALL cascade pathways simultaneously: LED 24/7 → IF → sleep disruption + melatonin↓; Wi-Fi → RF → CRY disruption; monitors → IF+ELF → cardiac rhythm disruption (HRV↓); electric bed → ELF → 24/7 body contact. 'Generalized vulnerability' = simultaneous modulome activation in already-compromised ion channel homeostasis."}
          </p>
          <p>
            {activeLocale === "fi"
              ? "Hospital-acquired disability (HAD) meta-analyysi (Age and Ageing 2024): 61× suurempi ADL-vammautumisriski sairaalassa, 68% kotiutuu alle lähtötason. Nämä luvut ovat liian suuria selittää pelkästään vuodelevolla ja stressillä. EMF ei ole ainoa syy — se on YKSI testaamaton lisätekijä monitekijäisessä mallissa."
              : "Hospital-acquired disability (HAD) meta-analysis (Age and Ageing 2024): 61× higher ADL disability risk in hospital, 68% discharge below baseline. These numbers are too large to explain by bed rest and stress alone. EMF is not the sole cause — it is ONE untested additional factor in a multifactorial model."}
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2 pr-3">{activeLocale === "fi" ? "Viite" : "Citation"}</th>
                <th className="py-2 pr-3 w-16">{activeLocale === "fi" ? "Vuosi" : "Year"}</th>
                <th className="py-2">{activeLocale === "fi" ? "Löydös" : "Finding"}</th>
              </tr>
            </thead>
            <tbody className="text-foreground-muted">
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Krumholz (NEJM)</td>
                <td className="py-2 pr-3 font-mono-num">2013</td>
                <td className="py-2">{activeLocale === "fi" ? "Post-hospital syndrome: riski kaikille diagnooseille 30 pv kotiutumisen jälkeen" : "Post-hospital syndrome: risk for all diagnoses within 30 days of discharge"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">PubMed 10447544</td>
                <td className="py-2 pr-3 font-mono-num">1999</td>
                <td className="py-2">{activeLocale === "fi" ? "ICU EMF 40 µT laitteiden lähellä; 'ICU is at risk from electromagnetic pollution'" : "ICU EMF 40 µT near equipment; 'ICU is at risk from electromagnetic pollution'"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">PMC12815752</td>
                <td className="py-2 pr-3 font-mono-num">2025</td>
                <td className="py-2">{activeLocale === "fi" ? "Sairaalan RF-EMF: nykyaikaiset mittaukset kaikilla kanavilla" : "Hospital RF-EMF: modern measurements across all channels"}</td>
              </tr>
              <tr className="border-b border-card-border/40">
                <td className="py-2 pr-3 font-medium text-foreground">Age and Ageing (meta)</td>
                <td className="py-2 pr-3 font-mono-num">2024</td>
                <td className="py-2">{activeLocale === "fi" ? "HAD: 61× ADL-vammautumisriski, 68% kotiutuu alle lähtötason" : "HAD: 61× ADL disability risk, 68% discharge below baseline"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-foreground-muted italic mt-4 max-w-4xl">
          {activeLocale === "fi"
            ? "Episteeminen taso: Post-hospital syndrome [E] (Krumholz NEJM). ICU EMF [E] (PubMed 10447544). EMF → PHS-kausaatio [C] (hypoteesi, ei testattu). Huomio: ICU-tutkimus vuodelta 1999 — nykyaikaiset laitteet voivat olla erilaisia."
            : "Epistemic level: Post-hospital syndrome [E] (Krumholz NEJM). ICU EMF [E] (PubMed 10447544). EMF → PHS causation [C] (hypothesis, untested). Note: ICU study from 1999 — modern equipment may differ."}
        </p>
      </section>

      {/* See also navigation */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">{d.seeAlso}</h3>
        <div className="flex flex-col gap-2">
          <Link href={`/${locale}/evidence`} className="text-sm text-accent hover:underline">
            {d.evidencePortal} &rarr;
          </Link>
          <Link href={`/${locale}/modulome/brain`} className="text-sm text-accent hover:underline">
            {activeLocale === "fi" ? "Aivot — moduloomi" : "Brain — modulome"} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
