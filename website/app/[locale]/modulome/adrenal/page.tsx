import type { Metadata } from "next";
import Link from "next/link";
import { Activity } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CitationLink } from "@/components/CitationLink";

const COPY = {
  en: {
    title: "Adrenal",
    subtitle:
      "Cav3.2 in zona glomerulosa — aldosterone synthesis drives EMF-linked hypertension",
    backLink: "← Back to Modulome",

    s1SectionTitle: "Adrenal Cortex and Cav3.2",

    channelProfile: "Channel Profile",
    channel: "Channel",
    gene: "Gene",
    cellType: "Cell type",
    function: "Function",
    level: "Evidence level",
    channelVal: "Cav3.2 (T-type)",
    geneVal: "CACNA1H",
    cellTypeVal: "Zona glomerulosa cell → Aldosterone",
    functionVal: "Aldosterone synthesis → sodium retention → blood pressure regulation",
    levelVal: "M|C",

    s2Title: "Aldosterone Synthesis Mechanism",
    s2p1:
      "The zona glomerulosa is the outermost layer of the adrenal cortex. Its cells produce aldosterone — the primary mineralocorticoid hormone that regulates sodium retention, potassium excretion, and ultimately blood pressure. Aldosterone synthesis in glomerulosa cells is critically dependent on Cav3.2 (CACNA1H) T-type voltage-gated calcium channels.",
    s2p2:
      "Cav3.2 channels in glomerulosa cells have a distinctive biophysical property: they operate at resting membrane potential through a phenomenon called window current. At the intersection of activation and inactivation voltage curves, a small but continuous Ca²⁺ influx occurs without any depolarizing stimulus. This means Cav3.2 channels are tonically active — and therefore continuously sensitive to EMF perturbation.",
    s2p3:
      "EMF → Cav3.2 perturbation → aldosterone dysregulation → sodium/potassium imbalance. Because the channel operates at resting potential, even small EMF-induced voltage shifts produce measurable changes in aldosterone output. The adrenal glands sit outside the blood-brain barrier, meaning they are directly exposed to circulating electromagnetic fields.",

    s2SectionTitle: "Hypertension Mechanism",

    s3Title: "Aldosterone–Blood Pressure Pathway",
    s3Chain:
      "EMF → Cav3.2 ↑ → Aldosterone ↑ → Na⁺ retention → H₂O retention → Blood volume ↑ → Blood pressure ↑",
    s3Text:
      "Chronic Cav3.2 perturbation leads to sustained aldosterone elevation. Elevated aldosterone drives sodium retention in the kidneys, which obligatorily draws water into the vasculature, expanding blood volume. Increased blood volume raises blood pressure. This is not a transient effect — chronic EMF exposure produces chronic aldosterone elevation, resulting in sustained hypertension that persists as long as the exposure continues.",

    s4Title: "Dual Hypertension Pathways",
    s4p1:
      "The BERM framework identifies two parallel, independent EMF → hypertension pathways. The cardiac pathway operates through Cav3.1 T-type channels in the SA node, where EMF perturbation alters heart rate and cardiac output. The adrenal pathway operates through Cav3.2 in the zona glomerulosa, where EMF perturbation elevates aldosterone and blood volume.",
    s4p2:
      "These are mechanistically independent: one controls cardiac rate (output), the other controls vascular volume (preload). Both converge on elevated blood pressure. This dual-pathway architecture means EMF-induced hypertension is more robust and harder to treat than single-mechanism hypertension — blocking one pathway leaves the other intact.",

    s3SectionTitle: "Cortisol and HPA Axis",

    s5Title: "Cortisol Dysregulation",
    s5p1:
      "The zona fasciculata, the middle layer of the adrenal cortex, produces cortisol — the primary glucocorticoid and stress hormone. Cortisol secretion is stimulated by ACTH from the pituitary, and voltage-gated calcium channels participate in ACTH-stimulated cortisol release. Chronic EMF exposure may dysregulate this process, contributing to chronic stress physiology.",
    s5p2:
      "Cortisol directly suppresses GnRH pulsatility at the hypothalamus, reducing LH and FSH secretion from the pituitary. This connects adrenal cortisol dysregulation to the BERM reproductive pathway: chronic EMF → cortisol elevation → GnRH suppression → reduced gonadotropin release → impaired fertility. Stress-related infertility is a well-documented clinical phenomenon — the BERM framework provides a specific EMF-mediated mechanism.",

    s4SectionTitle: "Evidence and Predictions",

    s6Title: "Epidemiological Context",
    s6Stats: [
      "Cav3.2 in zona glomerulosa cells is well-established in endocrinology literature as the primary calcium channel driving aldosterone synthesis",
      "Blood pressure elevation has been documented in EMF-exposed animals — cell phone EMF for 4-8 weeks significantly increased systolic blood pressure in all exposed rats",
      "Hypertension is rising globally, with increasing prevalence in younger populations where it was historically rare",
      "Aldosterone antagonists (spironolactone, eplerenone) are standard antihypertensive treatment — confirming the aldosterone-mediated mechanism is clinically recognized",
    ],

    s7Title: "BERM Predictions",
    s7Text:
      "The BERM framework generates two specific, testable predictions for the adrenal modulome:",
    s7Predictions: [
      {
        id: "ADRENAL-1",
        text: "EMF exposure at mobile phone frequencies elevates serum aldosterone in controlled human or animal studies, with the effect persisting for the duration of exposure and reversing upon cessation. The elevation is blocked by T-type calcium channel antagonists (e.g., mibefradil, TTA-P2).",
        discriminating: true,
      },
      {
        id: "ADRENAL-2",
        text: "Hypertension prevalence in young adults (18–35) correlates with national EMF density (cell tower density × average mobile phone use) after controlling for salt intake, obesity, physical activity, and genetic predisposition. The correlation is specific to volume-mediated (aldosterone-driven) hypertension rather than vascular resistance hypertension.",
        discriminating: true,
      },
    ],

    references: "Key References",
    refs: [
      {
        id: "glomerulosa-cav32-aldosterone",
        citation: "Journal of Molecular Endocrinology — Cav3.2 and Aldosterone",
        finding:
          "T-type Cav3.2 calcium channels in zona glomerulosa cells provide window current at resting potential, driving tonic aldosterone synthesis. Channel blockade or knockout abolishes aldosterone production.",
      },
      {
        id: "mohamed-emf-blood-pressure",
        citation: "Mohamed et al. — EMF and Blood Pressure",
        finding:
          "Cell phone EMF exposure for 4–8 weeks significantly increased systolic blood pressure in all exposed rats. Plasma renin activity increased dose-dependently, consistent with renin-angiotensin-aldosterone system activation.",
      },
    ],

    seeAlso: "See also",
    heartModulome: "Heart modulome",
    predictionsPage: "Predictions — ADRENAL-1/2",
    evidencePage: "Evidence register",
  },
  fi: {
    title: "Lisämunuainen",
    subtitle:
      "Cav3.2 zona glomerulosassa — aldosteronisynteesi ajaa EMF-yhdistettyä verenpainetautia",
    backLink: "← Takaisin moduloomiin",

    s1SectionTitle: "Lisämunuaiskuori ja Cav3.2",

    channelProfile: "Kanavaprofiili",
    channel: "Kanava",
    gene: "Geeni",
    cellType: "Solutyyppi",
    function: "Toiminto",
    level: "Evidenssitaso",
    channelVal: "Cav3.2 (T-tyyppi)",
    geneVal: "CACNA1H",
    cellTypeVal: "Glomerulosasolu → Aldosteroni",
    functionVal: "Aldosteronisynteesi → natriumretentio → verenpaineen säätely",
    levelVal: "M|C",

    s2Title: "Aldosteronisynteesin mekanismi",
    s2p1:
      "Zona glomerulosa on lisämunuaiskuoren uloin kerros. Sen solut tuottavat aldosteronia — ensisijaista mineralokortikoidihormonia joka säätelee natriumretentiota, kaliumin eritystä ja viime kädessä verenpainetta. Aldosteronisynteesi glomerulosasoluissa on kriittisesti riippuvainen Cav3.2 (CACNA1H) T-tyypin jänniteohjatuista kalsiumkanavista.",
    s2p2:
      "Cav3.2-kanavilla glomerulosasoluissa on erottuva biofysikaalinen ominaisuus: ne toimivat lepokalvopotentiaalissa ilmiön nimeltä ikkunavirta kautta. Aktivaatio- ja inaktivaatiojännitekäyrien leikkauspisteessä tapahtuu pieni mutta jatkuva Ca²⁺-sisäänvirtaus ilman depolarisoivaa ärsykettä. Tämä tarkoittaa että Cav3.2-kanavat ovat tonisesti aktiivisia — ja siten jatkuvasti herkkiä EMF-häiriöille.",
    s2p3:
      "EMF → Cav3.2-häiriö → aldosteronin säätelyn häiriö → natrium/kalium-epätasapaino. Koska kanava toimii lepopotentiaalissa, pienetkin EMF:n aiheuttamat jännitemuutokset tuottavat mitattavia muutoksia aldosteronierityksessä. Lisämunuaiset sijaitsevat veri-aivoesteen ulkopuolella, mikä tarkoittaa niiden altistuvan suoraan kiertäville sähkömagneettisille kentille.",

    s2SectionTitle: "Verenpainemekanismi",

    s3Title: "Aldosteroni–verenpainereitti",
    s3Chain:
      "EMF → Cav3.2 ↑ → Aldosteroni ↑ → Na⁺-retentio → H₂O-retentio → Veritilavuus ↑ → Verenpaine ↑",
    s3Text:
      "Krooninen Cav3.2-häiriö johtaa jatkuvaan aldosteronin kohoamiseen. Kohonnut aldosteroni ajaa natriumretentiota munuaisissa, mikä väistämättä vetää vettä verisuonistoon laajentaen veritilavuutta. Kasvanut veritilavuus nostaa verenpainetta. Kyseessä ei ole ohimenevä vaikutus — krooninen EMF-altistus tuottaa kroonisen aldosteronikohoamisen, johtaen jatkuvaan verenpainetautiin niin kauan kuin altistus jatkuu.",

    s4Title: "Kaksi rinnakkaista verenpainereittiä",
    s4p1:
      "BERM-kehys tunnistaa kaksi rinnakkaista, toisistaan riippumatonta EMF → verenpainetautireittia. Sydänreitti toimii SA-solmukkeen Cav3.1-tyypin T-kanavien kautta, joissa EMF-häiriö muuttaa sykettä ja sydämen minuuttitilavuutta. Lisämunuaisreitti toimii zona glomerulosan Cav3.2:n kautta, jossa EMF-häiriö nostaa aldosteronia ja veritilavuutta.",
    s4p2:
      "Nämä ovat mekanistisesti riippumattomia: toinen kontrolloi sydämen sykettä (minuuttitilavuus), toinen verisuoniston tilavuutta (esikuorma). Molemmat konvergoituvat kohonneeseen verenpaineeseen. Tämä kaksoisreittiarkkitehtuuri tarkoittaa että EMF-indusoitu verenpainetauti on vahvempi ja vaikeammin hoidettava kuin yhden mekanismin verenpainetauti — yhden reitin estäminen jättää toisen ennalleen.",

    s3SectionTitle: "Kortisoli ja HPA-akseli",

    s5Title: "Kortisolin säätelyn häiriö",
    s5p1:
      "Zona fasciculata, lisämunuaiskuoren keskikerros, tuottaa kortisolia — ensisijaista glukokortikoidia ja stressihormonia. Kortisolin eritystä stimuloi aivolisäkkeen ACTH, ja jänniteohjatut kalsiumkanavat osallistuvat ACTH-stimuloituun kortisolivapautukseen. Krooninen EMF-altistus voi häiritä tätä prosessia, edistäen kroonista stressifysiologiaa.",
    s5p2:
      "Kortisoli suoraan vaimentaa GnRH-pulsatiliteettia hypotalamuksessa, vähentäen LH:n ja FSH:n eritystä aivolisäkkeestä. Tämä yhdistää lisämunuaisen kortisolin säätelyn häiriön BERM:n lisääntymisreittiin: krooninen EMF → kortisolin kohoaminen → GnRH:n vaimentuminen → gonadotropiinierityksen väheneminen → hedelmällisyyden heikkeneminen. Stressiin liittyvä hedelmättömyys on hyvin dokumentoitu kliininen ilmiö — BERM-kehys tarjoaa spesifisen EMF-välitteisen mekanismin.",

    s4SectionTitle: "Evidenssi ja ennusteet",

    s6Title: "Epidemiologinen konteksti",
    s6Stats: [
      "Cav3.2 zona glomerulosan soluissa on vakiintunut endokrinologian kirjallisuudessa ensisijaisena aldosteronisynteesiä ohjaavana kalsiumkanavana",
      "Verenpaineen kohoaminen on dokumentoitu EMF-altistuneilla eläimillä — matkapuhelimen EMF 4-8 viikkoa nosti merkittävästi systolista verenpainetta kaikilla altistuneilla rotilla",
      "Verenpainetauti yleistyy maailmanlaajuisesti, esiintyvyys kasvaa nuoremmissa ikäryhmissä joissa se oli historiallisesti harvinaista",
      "Aldosteroniantagonistit (spironolaktoni, eplerenoni) ovat vakioverenpainelääkitystä — vahvistaen aldosteronivälitteisen mekanismin kliinisen tunnustamisen",
    ],

    s7Title: "BERM-ennusteet",
    s7Text:
      "BERM-kehys tuottaa kaksi spesifistä, testattavaa ennustetta lisämunuaisen moduloomille:",
    s7Predictions: [
      {
        id: "ADRENAL-1",
        text: "EMF-altistus matkapuhelintaajuuksilla nostaa seerumin aldosteronia kontrolloiduissa ihmis- tai eläintutkimuksissa. Vaikutus säilyy altistuksen ajan ja palautuu lopettamisen jälkeen. Kohoamisen estää T-tyypin kalsiumkanava-antagonistit (esim. mibefradiili, TTA-P2).",
        discriminating: true,
      },
      {
        id: "ADRENAL-2",
        text: "Verenpainetaudin esiintyvyys nuorilla aikuisilla (18–35) korreloi kansallisen EMF-tiheyden kanssa (tukiasematiheys × keskimääräinen matkapuhelinkäyttö) suolan, lihavuuden, fyysisen aktiivisuuden ja geneettisen alttiuden kontrolloinnin jälkeen. Korrelaatio on spesifinen tilavuusvälitteiselle (aldosteroniajateiselle) verenpainetaudille eikä vaskulaarisen resistenssin verenpainetaudille.",
        discriminating: true,
      },
    ],

    references: "Keskeiset viitteet",
    refs: [
      {
        id: "glomerulosa-cav32-aldosterone",
        citation: "Journal of Molecular Endocrinology — Cav3.2 ja aldosteroni",
        finding:
          "T-tyypin Cav3.2-kalsiumkanavat zona glomerulosan soluissa tarjoavat ikkunavirran lepopotentiaalissa, ajaen tonista aldosteronisynteesiä. Kanavan esto tai poistogeenisuus eliminoi aldosteronituotannon.",
      },
      {
        id: "mohamed-emf-blood-pressure",
        citation: "Mohamed ym. — EMF ja verenpaine",
        finding:
          "Matkapuhelimen EMF-altistus 4–8 viikkoa nosti merkittävästi systolista verenpainetta kaikilla altistuneilla rotilla. Plasman reniiniaktiivisuus nousi annosriippuvaisesti, yhteensopivasti reniini-angiotensiini-aldosteronijärjestelmän aktivaation kanssa.",
      },
    ],

    seeAlso: "Katso myös",
    heartModulome: "Sydämen moduloomi",
    predictionsPage: "Ennusteet — ADRENAL-1/2",
    evidencePage: "Evidenssirekisteri",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return {
    title: `${d.title} – Modulome – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function AdrenalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link
        href={`/${locale}/modulome`}
        className="text-sm text-accent hover:underline mb-6 inline-block"
      >
        {d.backLink}
      </Link>

      <PageHeader icon={Activity} title={d.title} subtitle={d.subtitle} />

      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s1SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">01</span>
          {d.channelProfile}
        </h3>
        <div className="bg-card rounded-lg border border-card-border p-5 space-y-3">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <span className="text-foreground-muted">{d.channel}</span>
            <span className="text-foreground font-medium">{d.channelVal}</span>
            <span className="text-foreground-muted">{d.gene}</span>
            <span className="text-foreground font-medium font-mono text-xs">
              {d.geneVal}
            </span>
            <span className="text-foreground-muted">{d.cellType}</span>
            <span className="text-foreground font-medium">{d.cellTypeVal}</span>
            <span className="text-foreground-muted">{d.function}</span>
            <span className="text-foreground font-medium">{d.functionVal}</span>
            <span className="text-foreground-muted">{d.level}</span>
            <span className="text-foreground font-medium">
              <span className="text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                {d.levelVal}
              </span>
            </span>
          </div>
        </div>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">02</span>
          {d.s2Title}
        </h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s2p1}
          </p>
          <p>{d.s2p2}</p>
          <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s2p3}
            </p>
          </div>
        </div>
      </section>

      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s2SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.s3Title}
        </h3>

        <div className="bg-card rounded-lg border border-card-border p-5 mb-6">
          <p className="font-mono text-sm text-accent leading-relaxed text-center">
            {d.s3Chain}
          </p>
        </div>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s3Text}
        </p>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">04</span>
          {d.s4Title}
        </h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s4p1}
          </p>
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-5">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s4p2}
            </p>
          </div>
        </div>
      </section>

      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s3SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">05</span>
          {d.s5Title}
        </h3>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          <p className="editorial-rail text-[0.95rem] text-foreground">
            {d.s5p1}
          </p>
          <p>{d.s5p2}</p>
        </div>
      </section>

      <div className="mb-4 mt-12">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {d.s4SectionTitle}
        </h2>
        <div className="h-px bg-accent/30 mt-2" />
      </div>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">06</span>
          {d.s6Title}
        </h3>
        <ul className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s6Stats.map((stat, i) => (
            <li key={i} className="pl-1 flex gap-2">
              <span className="text-accent shrink-0">*</span>
              <span>{stat}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">07</span>
          {d.s7Title}
        </h3>

        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s7Text}
        </p>

        <div className="space-y-4">
          {d.s7Predictions.map((pred) => (
            <div
              key={pred.id}
              className="border-l-4 border-green-500 rounded-r-lg bg-card p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-mono-num text-xs font-bold text-accent">
                  {pred.id}
                </span>
                {pred.discriminating && (
                  <span className="shrink-0 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                    {activeLocale === "fi" ? "Erotteleva" : "Discriminating"}
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {pred.text}
              </p>
            </div>
          ))}
          <Link
            href={`/${locale}/predictions`}
            className="text-xs text-accent hover:underline mt-2 inline-block"
          >
            {activeLocale === "fi" ? "Kaikki ennusteet →" : "All predictions →"}
          </Link>
        </div>
      </section>

      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          {d.references}
        </h3>
        <div className="space-y-3">
          {d.refs.map((ref) => (
            <div
              key={ref.id}
              className="bg-card rounded-lg border border-card-border p-4"
            >
              <p className="text-xs font-semibold text-accent mb-1">
                <CitationLink citation={ref.citation} />
              </p>
              <p className="text-xs text-foreground-muted leading-relaxed">
                {ref.finding}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6 flex-wrap">
          <Link
            href={`/${locale}/modulome/heart`}
            className="text-sm text-accent hover:underline"
          >
            {d.heartModulome} &rarr;
          </Link>
          <Link
            href={`/${locale}/predictions`}
            className="text-sm text-accent hover:underline"
          >
            {d.predictionsPage} &rarr;
          </Link>
          <Link
            href={`/${locale}/evidence`}
            className="text-sm text-accent hover:underline"
          >
            {d.evidencePage} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
