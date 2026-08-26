import type { Metadata } from "next";
import Link from "next/link";
import { Thermometer } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";

const COPY = {
  en: {
    title: "Hidden Thyroid: The Dio2/Dio3 Disruption",
    subtitle: "EMF reduces hypothalamic Dio2 and Dio3 deiodinase enzymes that convert T4 to active T3. Standard thyroid tests (TSH, T4) appear normal, masking a tissue-level T3 deficiency. The FT3/FT4 ratio is the diagnostic key.",
    backLink: "← Back to Evidence",
    cautionText: "This page connects EMF to thyroid hormone conversion disruption. The Dio2/Dio3 reduction from EMF is experimentally demonstrated in animal models (PMC11507962). The human occupational data (PMID:35963949) showing FT3↓ with FT4↑ is consistent. The clinical prediction (FT3/FT4 ratio as diagnostic) requires direct testing.",

    mechTitle: "The mechanism",
    mechLead: "Thyroid function depends on local conversion of inactive T4 to active T3 by deiodinase enzymes. EMF disrupts this conversion.",
    mechSteps: [
      { step: "1. EMF exposure reduces hypothalamic Dio2 and Dio3", detail: "LTE (4G) EMF in young mice significantly reduces Dio2 and Dio3 deiodinase enzyme expression in the hypothalamus (PMC11507962 2024). These enzymes convert T4 → T3 (Dio2) and inactivate T4/T3 (Dio3). Both are suppressed." },
      { step: "2. T4 → T3 conversion is impaired", detail: "With Dio2↓, less T4 is converted to active T3 in target tissues. Blood T4 remains normal or slightly elevated (nothing is removing it). TSH may remain normal through negative feedback from circulating T4. Standard thyroid panel looks 'fine'." },
      { step: "3. Tissue T3 deficiency despite 'normal' blood tests", detail: "Tissues that depend on local T3 production (brain, muscle, adipose) are T3-deficient. Symptoms of hypothyroidism appear: fatigue, brain fog, weight gain, cold intolerance, depression. But standard tests show normal TSH and T4, so physicians find no thyroid disorder." },
      { step: "4. FT3/FT4 ratio reveals the hidden deficiency", detail: "The ratio of free T3 to free T4 (FT3/FT4) drops. Normal FT3/FT4 is approximately 0.25-0.35. In hidden hypothyroidism: FT3 is low-normal while FT4 is mid-to-high-normal → ratio decreases below 0.20. This ratio is currently NOT part of standard thyroid screening." },
    ],

    occTitle: "Occupational evidence",
    occLead: "Human occupational data supports the mechanism.",
    occPoints: [
      "Long-term ELF-EMF exposure in humans: FT3 decreases slowly while FT4 increases slowly over time (PMID:35963949 2022)",
      "This pattern is EXACTLY what Dio2↓ predicts: less T4→T3 conversion = FT3↓ + FT4 accumulation",
      "Shift work × ELF × noise interaction effect on T4 levels (ScienceDirect 2024) — combined environmental exposures affect thyroid function",
      "The slow temporal change explains why cross-sectional studies may miss the effect: it develops over years of exposure",
    ],

    symptTitle: "Symptom overlap",
    symptLead: "Hidden hypothyroidism symptoms overlap with common modern complaints — often dismissed as 'stress' or 'aging'.",
    symptoms: [
      { symptom: "Fatigue", thyroid: "Classic hypothyroid symptom (T3 drives cellular metabolism)", berm: "Also EMF → melatonin↓ → sleep disruption (VK1-VK3)" },
      { symptom: "Brain fog / cognitive decline", thyroid: "T3 is essential for neuronal function and myelination", berm: "Also EMF → OPC myelination↓ (VK20) and BDNF↓ (VK23)" },
      { symptom: "Weight gain", thyroid: "T3 regulates basal metabolic rate and BAT thermogenesis", berm: "Also EMF → Klimentidis mechanism (BAT→WAT, VK15)" },
      { symptom: "Depression", thyroid: "T3 deficiency is a known cause of treatment-resistant depression", berm: "Also EMF → DA↓ (VK19) and melatonin↓ → serotonin pathway" },
      { symptom: "Cold intolerance", thyroid: "T3 drives thermoregulation", berm: "Also EMF → BAT thermogenesis↓ (VK15)" },
    ],
    symptConclusion: "Every major symptom of hidden hypothyroidism has a SECOND BERM mechanism producing the same complaint. The patient experiences the combined effect; the physician sees 'normal thyroid' on the standard panel.",

    diagTitle: "The diagnostic proposal",
    diagBody: "Add FT3/FT4 ratio to standard thyroid screening, especially for patients with hypothyroid symptoms and normal TSH/T4. A ratio below 0.20 suggests tissue-level T3 deficiency despite normal circulating T4. Occupational medicine should track this ratio longitudinally in high-EMF workers.",

    networkTitle: "Network position",
    networkPoints: [
      { bridge: "VK26 → VK13", detail: "Hypothalamic deiodinase disruption → neuroendocrine axis (HPT sits alongside HPA and HPG in the hypothalamus)" },
      { bridge: "VK26 → VK27", detail: "Thyroid hormone is an epigenetic regulator → Dio2/Dio3↓ alters developmental epigenetic programming" },
      { bridge: "VK26 → VK15", detail: "T3 drives BAT thermogenesis → hidden T3↓ amplifies the Klimentidis obesity mechanism" },
      { bridge: "VK26 → VK19", detail: "T3 modulates dopamine metabolism → hidden T3↓ amplifies DA↓ → depression/anhedonia" },
    ],

    predictionText: "Prediction E-NEW-9: FT3/FT4 ratio is lower in high-EMF workers (telecom, electricians) vs matched low-EMF controls, despite normal TSH and T4. Testable immediately with an occupational cohort study.",
    predictionLink: "See final layer predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Piilevä kilpirauhanen: Dio2/Dio3-häiriö",
    subtitle: "EMF vähentää hypotalamuksen Dio2- ja Dio3-dejodinaasientsyymejä jotka muuntavat T4:n aktiiviseksi T3:ksi. Normaalit kilpirauhaustestit (TSH, T4) näyttävät normaaleilta, peittäen kudostason T3-puutteen. FT3/FT4-suhde on diagnostinen avain.",
    backLink: "← Takaisin Evidenssiin",
    cautionText: "Tämä sivu yhdistää EMF:n kilpirauhashormonin konversiohäiriöön. Dio2/Dio3-väheneminen EMF:stä on kokeellisesti osoitettu eläinmalleissa (PMC11507962). Ihmisten työperäinen data (PMID:35963949) osoittaa FT3↓ ja FT4↑ konsistentisti. Kliininen ennuste (FT3/FT4-suhde diagnostiikkana) vaatii suoraa testausta.",

    mechTitle: "Mekanismi",
    mechLead: "Kilpirauhasen toiminta riippuu inaktiivisen T4:n paikallisesta muuntamisesta aktiiviseksi T3:ksi dejodinaasientsyymien avulla. EMF häiritsee tätä muuntamista.",
    mechSteps: [
      { step: "1. EMF-altistus vähentää hypotalamuksen Dio2:ta ja Dio3:a", detail: "LTE (4G) EMF nuorilla hiirillä vähentää merkittävästi Dio2- ja Dio3-dejodinaasientsyymien ekspressiota hypotalamuksessa (PMC11507962 2024). Nämä entsyymit muuntavat T4 → T3 (Dio2) ja inaktivoivat T4/T3:n (Dio3). Molemmat ovat supressoituja." },
      { step: "2. T4 → T3 -muunnos on häiriintynyt", detail: "Dio2↓:n myötä vähemmän T4:ää muuntuu aktiiviseksi T3:ksi kohdekudoksissa. Veren T4 pysyy normaalina tai hieman kohonneena (mikään ei poista sitä). TSH voi pysyä normaalina kiertävän T4:n negatiivisen palautteen kautta. Normaali kilpirauhastutkimus näyttää 'hyvältä'." },
      { step: "3. Kudosten T3-puute 'normaaleista' verikokeista huolimatta", detail: "Kudokset jotka riippuvat paikallisesta T3-tuotannosta (aivot, lihakset, rasvakudos) ovat T3-puutteisia. Hypotyreoosin oireet ilmaantuvat: väsymys, aivosumu, painonnousu, kylmänarkuus, masennus. Mutta normaalit testit näyttävät normaalia TSH:ta ja T4:ää, joten lääkärit eivät löydä kilpirauhashäiriötä." },
      { step: "4. FT3/FT4-suhde paljastaa piilevän puutteen", detail: "Vapaan T3:n suhde vapaaseen T4:ään (FT3/FT4) laskee. Normaali FT3/FT4 on noin 0,25-0,35. Piilevässä hypotyreoosissa: FT3 on matalalla normaalilla kun FT4 on keskeltä ylänormaalille → suhde laskee alle 0,20. Tämä suhde EI OLE tällä hetkellä osa normaalia kilpirauhasseulontaa." },
    ],

    occTitle: "Työperäinen evidenssi",
    occLead: "Ihmisten työperäinen data tukee mekanismia.",
    occPoints: [
      "Pitkäaikainen ELF-EMF-altistus ihmisillä: FT3 vähenee hitaasti kun FT4 kasvaa hitaasti ajan myötä (PMID:35963949 2022)",
      "Tämä malli on TÄSMÄLLEEN se mitä Dio2↓ ennustaa: vähemmän T4→T3-muuntamista = FT3↓ + T4-kertymä",
      "Vuorotyö × ELF × melu -yhteisvaikutus T4-tasoihin (ScienceDirect 2024) — yhdistetyt ympäristöaltistukset vaikuttavat kilpirauhasen toimintaan",
      "Hidas ajallinen muutos selittää miksi poikkileikkaustutkimukset voivat ohittaa vaikutuksen: se kehittyy vuosien altistuksen aikana",
    ],

    symptTitle: "Oireiden päällekkäisyys",
    symptLead: "Piilevän hypotyreoosin oireet menevät päällekkäin yleisten modernien valitusten kanssa — usein ohitetaan 'stressinä' tai 'ikääntymisenä'.",
    symptoms: [
      { symptom: "Väsymys", thyroid: "Klassinen hypotyreoosin oire (T3 ajaa solujen aineenvaihduntaa)", berm: "Myös EMF → melatoniini↓ → unihäiriö (VK1-VK3)" },
      { symptom: "Aivosumu / kognitiivinen heikentyminen", thyroid: "T3 on välttämätön neuronien toiminnalle ja myelinisaatiolle", berm: "Myös EMF → OPC-myelinisaatio↓ (VK20) ja BDNF↓ (VK23)" },
      { symptom: "Painonnousu", thyroid: "T3 säätelee basaalista aineenvaihduntaa ja BAT-lämmöntuotantoa", berm: "Myös EMF → Klimentidis-mekanismi (BAT→WAT, VK15)" },
      { symptom: "Masennus", thyroid: "T3-puute on tunnettu hoitoresistentin masennuksen syy", berm: "Myös EMF → DA↓ (VK19) ja melatoniini↓ → serotoniinireitti" },
      { symptom: "Kylmänarkuus", thyroid: "T3 ajaa lämmönsäätelyä", berm: "Myös EMF → BAT-lämmöntuotanto↓ (VK15)" },
    ],
    symptConclusion: "Jokaisella piilevän hypotyreoosin pääoireella on TOINEN BERM-mekanismi joka tuottaa saman valituksen. Potilas kokee yhdistetyn vaikutuksen; lääkäri näkee 'normaalin kilpirauhasen' normaalissa tutkimuksessa.",

    diagTitle: "Diagnostinen ehdotus",
    diagBody: "Lisää FT3/FT4-suhde normaaliin kilpirauhasseulontaan, erityisesti potilaille joilla on hypotyreoosin oireita ja normaali TSH/T4. Alle 0,20 suhde viittaa kudostason T3-puutteeseen normaalista kiertävästä T4:stä huolimatta. Työterveyslääketieteen tulisi seurata tätä suhdetta pitkittäisesti korkean EMF:n työntekijöillä.",

    networkTitle: "Verkostoasema",
    networkPoints: [
      { bridge: "VK26 → VK13", detail: "Hypotalamuksen dejodanaasihäiriö → neuroendokriininen akseli (HPT on HPA:n ja HPG:n rinnalla hypotalamuksessa)" },
      { bridge: "VK26 → VK27", detail: "Kilpirauhashormoni on epigeneettinen säätelijä → Dio2/Dio3↓ muuttaa kehityksellistä epigeneettistä ohjelmointia" },
      { bridge: "VK26 → VK15", detail: "T3 ajaa BAT-lämmöntuotantoa → piilevä T3↓ vahvistaa Klimentidis-lihavuusmekanismia" },
      { bridge: "VK26 → VK19", detail: "T3 moduloi dopamiiniaineenvaihduntaa → piilevä T3↓ vahvistaa DA↓ → masennus/anhedonia" },
    ],

    predictionText: "Ennuste E-NEW-9: FT3/FT4-suhde on matalampi korkean EMF:n työntekijöillä (telecom, sähköasentajat) verrattuna vastaaviin matalan EMF:n kontrolleihin, normaaleista TSH:sta ja T4:stä huolimatta. Testattavissa heti työperäisellä kohorttitutkimuksella.",
    predictionLink: "Ks. viimeisten kerrosten ennusteet →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function HiddenThyroidPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Thermometer} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={activeLocale}><p>{d.cautionText}</p></CautionBox></div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.mechTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.mechLead}</p>
        <div className="space-y-3">
          {d.mechSteps.map((s, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold mb-1">{s.step}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.occTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.occLead}</p>
        <div className="space-y-2">
          {d.occPoints.map((p, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-accent shrink-0">→</span><p>{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.symptTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.symptLead}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left py-2 px-3 font-semibold">{activeLocale === "fi" ? "Oire" : "Symptom"}</th>
                <th className="text-left py-2 px-3 font-semibold">{activeLocale === "fi" ? "Kilpirauhasmekanismi" : "Thyroid mechanism"}</th>
                <th className="text-left py-2 px-3 font-semibold">{activeLocale === "fi" ? "BERM-mekanismi" : "BERM mechanism"}</th>
              </tr>
            </thead>
            <tbody>
              {d.symptoms.map((s, i) => (
                <tr key={i} className="border-b border-card-border/50">
                  <td className="py-2 px-3 font-medium">{s.symptom}</td>
                  <td className="py-2 px-3 text-foreground-muted">{s.thyroid}</td>
                  <td className="py-2 px-3 text-foreground-muted">{s.berm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.symptConclusion}</p>
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.diagTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">{d.diagBody}</p>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.networkTitle}</h2>
        <div className="space-y-3">
          {d.networkPoints.map((n, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold font-mono mb-1">{n.bridge}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{n.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <DerivedPrediction>
          <p className="text-sm leading-relaxed mb-3">{d.predictionText}</p>
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">{d.predictionLink}</Link>
        </DerivedPrediction>
      </section>
    </div>
  );
}
