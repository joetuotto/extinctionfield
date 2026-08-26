import type { Metadata } from "next";
import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";

const COPY = {
  en: {
    title: "ADHD: The Second Prototype",
    subtitle: "ADHD unites three BERM mechanisms — dopamine deficit in PFC, myelination delay via Cav1.2, and E/I shift via KCC2 — into a neurodevelopmental phenotype. ASD and ADHD share 30-50% comorbidity because they represent different points on the same Q-factor spectrum.",
    backLink: "← Back to Evidence",
    cautionText: "This page proposes ADHD as a second BERM prototype. While PFC maturation delay, dopamine disruption, and myelination timing are established ADHD mechanisms, linking them to EMF exposure is a BERM hypothesis requiring direct testing.",

    mechTitle: "Three converging mechanisms",
    mechLead: "ADHD emerges when three BERM pathways converge on prefrontal cortex function: dopamine deficit, myelination delay, and E/I shift. Each mechanism is independently documented; their convergence on PFC explains the clinical phenotype.",
    mechanisms: [
      { id: "M1", name: "DA↓ in PFC (VK19: striatum -25%)", path: "EMF → Ca²⁺↑ → CaMKII disruption → DA synthesis↓ → PFC DA deficit → attention↓, inhibition↓", detail: "PFC requires OPTIMAL dopamine (Goldilocks principle): too low → ADHD; too high → psychosis. VK19 demonstrates striatal dopamine reduction of 25% under EMF exposure. DA synthesis requires CaMKII, which depends on precise Ca²⁺ signaling — EMF disrupts CaMKII → DA↓. The inverted-U dose-response of DA in PFC means even moderate depletion collapses executive function.", color: "green" },
      { id: "M2", name: "Myelination delay (VK20: Cav1.2→OPC)", path: "EMF → Cav1.2 disruption → OPC maturation↓ → PFC myelination delayed → PFC matures 5 YEARS later", detail: "PFC is the LAST brain region to myelinate, completing only in the mid-20s. Shaw 2007 (PNAS) showed ADHD cortex reaches peak thickness 5 years later than controls. VK20 identifies the mechanism: Cav1.2 channels regulate oligodendrocyte precursor cell (OPC) maturation. EMF-induced Cav1.2 disruption delays OPC differentiation → myelination delay → PFC is the most vulnerable region because it myelinates last.", color: "green" },
      { id: "M3", name: "E/I shift (VK6: KCC2↓ + VK4: α2δ-1↑)", path: "EMF → KCC2 maturation↓ + α2δ-1↑ → E/I↑ → impulse control↓", detail: "The same E/I imbalance mechanism as ASD but at a LOWER Q value: fewer seizures (epilepsy 5-10% vs. 38% in ASD), less sensory hypersensitivity, but impaired impulse control and sustained attention. KCC2 delay keeps GABA excitatory in PFC circuits responsible for behavioral inhibition. α2δ-1 upregulation adds excitatory drive.", color: "green" },
    ],

    spectrumTitle: "ASD-ADHD spectrum",
    spectrumLead: "ASD and ADHD are not separate disorders but different positions on the same E/I spectrum, modulated by Q-factor value and regional vulnerability.",
    spectrumPoints: [
      "ASD + ADHD comorbidity: 30-50% — far too high for coincidence, expected if both share the same mechanistic root",
      "Same mechanism (E/I↑), different Q values: ASD = high Q (epilepsy 38%), ADHD = moderate Q (epilepsy 5-10%)",
      "CACNA1C variants modulate position on spectrum: gain-of-function → ASD features; partial disruption → ADHD features",
      "Both respond to treatments targeting the same pathways: bumetanide (GABA polarity), atomoxetine (noradrenergic PFC rescue), behavioral therapies targeting executive function",
    ],

    prevTitle: "Prevalence increase explained",
    prevLead: "ADHD prevalence has risen sharply since the 1990s. BERM identifies a convergence of EMF-driven and EMF-adjacent factors that compound the dopamine deficit.",
    prevPoints: [
      { factor: "EMF → DA↓", detail: "Direct dopamine synthesis reduction via CaMKII disruption (VK19). Increasing ambient EMF exposure correlates with the prevalence timeline." },
      { factor: "Myelination delay", detail: "EMF → Cav1.2 → OPC maturation↓ → PFC development delayed. Earlier and more intense EMF exposure during development shifts the myelination curve." },
      { factor: "GABA switch delay", detail: "EMF → KCC2↓ → GABA stays excitatory longer in PFC circuits → impulse control fails to develop on schedule." },
      { factor: "LED screen time (compound)", detail: "Screen time is not just behavioral — LED screens emit intermediate-frequency EMF + blue light suppresses melatonin + low DA makes screens MORE rewarding (hyperbolic discounting). The EMF-driven DA deficit creates a vicious cycle: DA↓ → screens more rewarding → more screen time → more IF exposure → DA↓↓." },
    ],

    pharmaTitle: "Pharmacological validation",
    pharmaLead: "ADHD medications correct the exact disruptions that BERM predicts EMF produces. This is convergent validation: if the mechanism is wrong, the drugs should not work the way they do.",
    pharmaPoints: [
      "Methylphenidate/amphetamine: increase DA in PFC → symptoms improve. These drugs directly compensate for the VK19 dopamine deficit.",
      "Same Ca²⁺ cascade: DA synthesis requires CaMKII; EMF disrupts CaMKII → DA↓. Stimulants bypass the synthesis bottleneck by blocking reuptake/promoting release.",
      "Atomoxetine: norepinephrine reuptake inhibitor → also improves PFC function. PFC uses both DA and NE; atomoxetine rescues the catecholamine deficit via a parallel pathway.",
      "Guanfacine (α2A agonist): strengthens PFC network connectivity. Effective in ADHD because PFC networks are weakened by the same myelination delay VK20 identifies.",
    ],

    predictionText: "Prediction E-NEW-24 (EMF reduction during PFC-critical developmental window reduces ADHD symptom severity in genetically susceptible children) is directly testable in a prospective cohort design.",
    predictionLink: "See predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "ADHD: Toinen prototyyppi",
    subtitle: "ADHD yhdistää kolme BERM-mekanismia — dopamiinivajeen PFC:ssä, myelinaation viiveen Cav1.2:n kautta ja E/I-siirtymän KCC2:n kautta — neurokehitykselliseksi fenotyypiksi. ASD:n ja ADHD:n 30-50 %:n komorbiditeetti selittyy sillä, että ne edustavat eri pisteitä samalla Q-tekijäspektrillä.",
    backLink: "← Takaisin Evidenssiin",
    cautionText: "Tämä sivu ehdottaa ADHD:tä toisena BERM-prototyyppinä. Vaikka PFC:n kypsymisviive, dopamiinihäiriö ja myelinaation ajoitus ovat vakiintuneita ADHD-mekanismeja, niiden yhdistäminen EMF-altistukseen on BERM-hypoteesi joka vaatii suoraa testausta.",

    mechTitle: "Kolme konvergoivaa mekanismia",
    mechLead: "ADHD syntyy kun kolme BERM-reittiä konvergoivat prefrontaalisen aivokuoren toimintaan: dopamiinivaje, myelinaation viive ja E/I-siirtymä. Jokainen mekanismi on itsenäisesti dokumentoitu; niiden konvergenssi PFC:hen selittää kliinisen fenotyypin.",
    mechanisms: [
      { id: "M1", name: "DA↓ PFC:ssä (VK19: striatumi -25 %)", path: "EMF → Ca²⁺↑ → CaMKII-häiriö → DA-synteesi↓ → PFC:n DA-vaje → tarkkaavaisuus↓, inhibitio↓", detail: "PFC vaatii OPTIMAALISEN dopamiinin (Kultakutri-periaate): liian vähän → ADHD; liian paljon → psykoosi. VK19 osoittaa striataalisen dopamiinin 25 %:n vähenemisen EMF-altistuksessa. DA-synteesi vaatii CaMKII:n, joka riippuu tarkasta Ca²⁺-signaloinnista — EMF häiritsee CaMKII:ta → DA↓. DA:n käänteis-U-annos-vaste PFC:ssä tarkoittaa, että jo kohtalainen vähennys romahduttaa toiminnanohjauksen.", color: "green" },
      { id: "M2", name: "Myelinaation viive (VK20: Cav1.2→OPC)", path: "EMF → Cav1.2-häiriö → OPC-kypsyminen↓ → PFC:n myelinaatio viivästyy → PFC kypsyy 5 VUOTTA myöhemmin", detail: "PFC on aivojen VIIMEINEN myelinoituva alue, valmistuen vasta 25-vuotiaana. Shaw 2007 (PNAS) osoitti ADHD-aivokuoren saavuttavan huippupaksuuden 5 vuotta kontrolleja myöhemmin. VK20 tunnistaa mekanismin: Cav1.2-kanavat säätelevät oligodendrosyyttien esiastesolujen (OPC) kypsymistä. EMF-indusoitu Cav1.2-häiriö viivästyttää OPC-erilaistumista → myelinaation viive → PFC on haavoittuvin alue koska se myelinoituu viimeisenä.", color: "green" },
      { id: "M3", name: "E/I-siirtymä (VK6: KCC2↓ + VK4: α2δ-1↑)", path: "EMF → KCC2-kypsyminen↓ + α2δ-1↑ → E/I↑ → impulssikontrolli↓", detail: "Sama E/I-epätasapainomekanismi kuin ASD:ssä mutta MATALAMMALLA Q-arvolla: vähemmän kohtauksia (epilepsia 5-10 % vs. 38 % ASD:ssä), vähemmän sensorista yliherkkyyttä, mutta heikentynyt impulssikontrolli ja jatkuva tarkkaavaisuus. KCC2-viive pitää GABAn eksitatorisena PFC-piireissä jotka vastaavat käyttäytymisen inhibitiosta. α2δ-1-ylössäätely lisää eksitatorista ajuria.", color: "green" },
    ],

    spectrumTitle: "ASD-ADHD-spektri",
    spectrumLead: "ASD ja ADHD eivät ole erillisiä häiriöitä vaan eri sijainteja samalla E/I-spektrillä, joita Q-tekijän arvo ja alueellinen haavoittuvuus moduloivat.",
    spectrumPoints: [
      "ASD + ADHD komorbiditeetti: 30-50 % — aivan liian korkea sattumaksi, odotettavissa jos molemmat jakavat saman mekanistisen juurisyyn",
      "Sama mekanismi (E/I↑), eri Q-arvot: ASD = korkea Q (epilepsia 38 %), ADHD = kohtalainen Q (epilepsia 5-10 %)",
      "CACNA1C-variantit moduloivat sijaintia spektrillä: gain-of-function → ASD-piirteet; osittainen häiriö → ADHD-piirteet",
      "Molemmat vastaavat hoitoihin jotka kohdistuvat samoihin reitteihin: bumetanidi (GABA-polariteetti), atomoksetiini (noradrenerginen PFC-pelastus), käyttäytymisterapiat jotka kohdistuvat toiminnanohjaukseen",
    ],

    prevTitle: "Prevalenssin kasvu selitettynä",
    prevLead: "ADHD:n esiintyvyys on noussut jyrkästi 1990-luvulta lähtien. BERM tunnistaa EMF-peräisten ja EMF-liitännäisten tekijöiden konvergenssin joka voimistaa dopamiinivajetta.",
    prevPoints: [
      { factor: "EMF → DA↓", detail: "Suora dopamiinisynteesin väheneminen CaMKII-häiriön kautta (VK19). Kasvava ympäristön EMF-altistus korreloi prevalenssin aikajanan kanssa." },
      { factor: "Myelinaation viive", detail: "EMF → Cav1.2 → OPC-kypsyminen↓ → PFC:n kehitys viivästyy. Aikaisempi ja intensiivisempi EMF-altistus kehityksen aikana siirtää myelinaatiokäyrää." },
      { factor: "GABA-vaihdon viive", detail: "EMF → KCC2↓ → GABA pysyy eksitatorisena pidempään PFC-piireissä → impulssikontrolli ei kehity aikataulussa." },
      { factor: "LED-ruutuaika (yhdiste)", detail: "Ruutuaika ei ole vain käyttäytymiskysymys — LED-näytöt emittoivat keskitaajuista EMF:ää + sininen valo tukahduttaa melatoniinia + matala DA tekee näytöistä PALKITSEVAMPIA (hyperbolinen diskonttaus). EMF-peräinen DA-vaje luo noidankehän: DA↓ → näytöt palkitsevampia → enemmän ruutuaikaa → enemmän IF-altistusta → DA↓↓." },
    ],

    pharmaTitle: "Farmakologinen validaatio",
    pharmaLead: "ADHD-lääkkeet korjaavat täsmälleen ne häiriöt joita BERM ennustaa EMF:n tuottavan. Tämä on konvergentti validaatio: jos mekanismi on väärä, lääkkeiden ei pitäisi toimia niin kuin ne toimivat.",
    pharmaPoints: [
      "Metyylifenidaatti/amfetamiini: lisäävät DA:ta PFC:ssä → oireet paranevat. Nämä lääkkeet kompensoivat suoraan VK19:n dopamiinivajetta.",
      "Sama Ca²⁺-kaskadi: DA-synteesi vaatii CaMKII:n; EMF häiritsee CaMKII:ta → DA↓. Stimulantit ohittavat synteesipullonkaulan estämällä takaisinoton/edistämällä vapautumista.",
      "Atomoksetiini: noradrenaliinin takaisinoton estäjä → parantaa myös PFC:n toimintaa. PFC käyttää sekä DA:ta että NE:tä; atomoksetiini pelastaa katekoliamiinivajeen rinnakkaisen reitin kautta.",
      "Guanfasiini (α2A-agonisti): vahvistaa PFC-verkoston yhteyksiä. Tehokas ADHD:ssä koska PFC-verkostot ovat heikentyneet saman myelinaatioviiveen vuoksi jonka VK20 tunnistaa.",
    ],

    predictionText: "Ennuste E-NEW-24 (EMF-vähennys PFC:n kriittisen kehitysikkunan aikana vähentää ADHD-oireiden vakavuutta geneettisesti alttiilla lapsilla) on suoraan testattavissa prospektiivisella kohorttiasetelmalla.",
    predictionLink: "Ks. ennusteet →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function AdhdPrototypePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${locale}`;

  const mechColors: Record<string, string> = { green: "border-green-500/30 bg-green-500/5" };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={BrainCircuit} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={activeLocale}><p>{d.cautionText}</p></CautionBox></div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.mechTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.mechLead}</p>
        <div className="space-y-4">
          {d.mechanisms.map((m) => (
            <div key={m.id} className={`rounded-xl border p-5 ${mechColors[m.color]}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono-num text-xs text-accent">{m.id}</span>
                <h3 className="font-semibold text-sm">{m.name}</h3>
              </div>
              <p className="text-xs font-mono text-foreground-muted mb-2">{m.path}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{m.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.spectrumTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.spectrumLead}</p>
        <div className="space-y-2">
          {d.spectrumPoints.map((p, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-accent shrink-0">{"→"}</span><p>{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.prevTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.prevLead}</p>
        <div className="space-y-3">
          {d.prevPoints.map((pp, i) => (
            <div key={i} className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-sm font-semibold mb-1 font-mono">{pp.factor}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{pp.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.pharmaTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.pharmaLead}</p>
        <div className="space-y-2">
          {d.pharmaPoints.map((p, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-green-500 shrink-0">{"✓"}</span><p>{p}</p>
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
