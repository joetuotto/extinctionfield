import type { Metadata } from "next";
import Link from "next/link";
import { Activity } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";

const COPY = {
  en: {
    title: "The Allergy Epidemic",
    subtitle: "Mast cell degranulation is Ca²⁺-dependent: Ca²⁺ ionophores trigger degranulation WITHOUT IgE. EMF → VGCC → Ca²⁺ creates a quadruple sensitization cascade: (1) direct mast cell Ca²⁺ activation, (2) environmental estrogens sensitize mast cells, (3) cortisol → immune shift Th1→Th2, (4) gut barrier → LPS → systemic inflammation.",
    backLink: "← Back to Evidence",
    cautionText: "This page explores Ca²⁺-dependent mast cell degranulation as a mechanism for increasing allergy prevalence. While each individual mechanism is well-established, the combined cascade and its link to EMF exposure remains a BERM hypothesis.",

    calciumTitle: "The Ca²⁺ dependency",
    calciumLead: "Ca²⁺ is necessary AND sufficient for mast cell activation. This means ANY source of excess Ca²⁺ — including EMF→VGCC — can trigger allergic responses.",
    calciumSteps: [
      { step: "Ca²⁺ ionophores trigger degranulation WITHOUT IgE crosslinking", detail: "Calcium ionophores such as A23187 and ionomycin directly activate mast cells and trigger full degranulation and histamine release — completely bypassing the classical IgE/FcεRI pathway. This proves that Ca²⁺ influx alone is sufficient." },
      { step: "Ca²⁺ depletion blocks degranulation EVEN WITH IgE crosslinking", detail: "When extracellular Ca²⁺ is chelated or intracellular stores are depleted, mast cells fail to degranulate even when IgE/antigen crosslinking is complete. Ca²⁺ is not merely a cofactor — it is the obligate signal." },
      { step: "Ca²⁺ is necessary AND sufficient for mast cell activation", detail: "These two findings together establish that the Ca²⁺ signal sits at the convergence point of all mast cell activation pathways. Control Ca²⁺, control degranulation." },
      { step: "ANY source of excess Ca²⁺ — including EMF→VGCC — can trigger allergic responses", detail: "EMF activates voltage-gated calcium channels (VGCC), producing sustained intracellular Ca²⁺ elevation. Since Ca²⁺ alone is sufficient for mast cell degranulation, EMF→VGCC activation provides a direct, non-immunological trigger for allergic responses." },
    ],

    cascadeTitle: "Quadruple sensitization cascade",
    cascadeLead: "EMF does not act through a single pathway. Four converging mechanisms create a compounding sensitization cascade.",
    cascadeSteps: [
      { step: "Q1: Direct VGCC activation", detail: "EMF → Ca²⁺↑ in mast cells → lower degranulation threshold. Even sub-threshold allergen exposures that would normally be tolerated can now trigger full degranulation when baseline intracellular Ca²⁺ is already elevated by EMF→VGCC." },
      { step: "Q2: Environmental estrogens", detail: "Xenoestrogens and endocrine disruptors increase mast cell degranulation and IgE-mediated release (PMC1797832). Estrogen receptors on mast cells amplify Ca²⁺-dependent signaling. EMF-disrupted estrogen metabolism (VK6) compounds the effect." },
      { step: "Q3: HPA/immune axis — Th1→Th2 shift", detail: "Cortisol dysregulation from EMF→HPA disruption (VK11) produces a Th1→Th2 immune shift. Th2 dominance increases IgE production and eosinophil activation — the classical allergic predisposition. Chronic cortisol elevation paradoxically promotes allergic sensitization." },
      { step: "Q4: Gut barrier → LPS → systemic inflammation", detail: "Per2↓ from EMF→circadian disruption → gut barrier integrity↓ → LPS translocation↑ → systemic inflammation primes mast cells for hyperreactivity (S14). Leaky gut delivers constant low-grade immune stimulation that lowers the activation threshold across all mast cell populations." },
    ],

    epiTitle: "Epidemiological pattern",
    epiLead: "The allergy epidemic’s temporal and geographic profile matches the EMF proliferation timeline.",
    epiPoints: [
      "Allergy prevalence increased dramatically over 30 years in developed countries — too fast for genetic change, too widespread for any single allergen.",
      "Coincides with EMF proliferation timeline: mobile networks, Wi-Fi, smart devices each correlating with successive waves of increasing prevalence.",
      "Urban > rural gradient: urban environments have both higher EMF exposure density and higher allergy prevalence. This gradient persists after controlling for pollution and hygiene.",
      "Seasonal variation correlates with vitamin D status (immunomodulatory) and seasonal EMF usage patterns (indoor exposure increases in winter months).",
    ],

    pharmaTitle: "Pharmacological validation",
    pharmaLead: "Existing allergy treatments inadvertently validate the Ca²⁺ mechanism.",
    pharmaPoints: [
      { drug: "Antihistamines", mechanism: "Block histamine receptors — treat SYMPTOMS downstream of degranulation, not the Ca²⁺-dependent cause. Patients remain sensitized.", note: "Symptom management only; does not address underlying mast cell hyperreactivity." },
      { drug: "Mast cell stabilizers (cromolyn sodium)", mechanism: "Work by reducing Ca²⁺ signaling in mast cells, preventing degranulation before it occurs. Effective precisely BECAUSE Ca²⁺ is the obligate activation signal.", note: "Mechanism of action directly validates the Ca²⁺ dependency of mast cell activation." },
      { drug: "Omalizumab (anti-IgE)", mechanism: "Blocks IgE binding to mast cells — but patients still respond to Ca²⁺ ionophores. This proves an IgE-INDEPENDENT activation pathway exists and remains active.", note: "Partial efficacy confirms that IgE is only one of multiple activation routes — Ca²⁺ influx bypasses the IgE blockade." },
    ],

    predictionText: "Prediction E-NEW-27: EMF-exposed mast cells show increased degranulation in response to sub-threshold allergen concentrations, mediated by VGCC-dependent Ca²⁺ elevation.",
    predictionLink: "See final layer predictions →",
    predictionHref: "/predictions",
  },
  fi: {
    title: "Allergiaepidemia",
    subtitle: "Syottösolujen degranulaatio on Ca²⁺-riippuvaista: Ca²⁺-ionoforit laukaisevat degranulaation ILMAN IgE:tä. EMF → VGCC → Ca²⁺ luo nelinkertaisen herkistymiskaskadin: (1) suora syottösolujen Ca²⁺-aktivaatio, (2) ympäristöestrogeenit herkistävät syottösoluja, (3) kortisoli → immuunisiirtymä Th1→Th2, (4) suoliston läpäiseväisyys → LPS → systeeminen tulehdus.",
    backLink: "← Takaisin Evidenssiin",
    cautionText: "Tämä sivu tutkii Ca²⁺-riippuvaista syottösolujen degranulaatiota mekanismina allergioiden yleistymiselle. Jokainen yksittäinen mekanismi on hyvin vahvistettu, mutta yhdistetty kaskadi ja sen yhteys EMF-altistukseen on BERM-hypoteesi.",

    calciumTitle: "Ca²⁺-riippuvuus",
    calciumLead: "Ca²⁺ on välttämätön JA riittävä syottösolujen aktivaatiolle. Tämä tarkoittaa, että MIKÄ TAHANSA ylimääräisen Ca²⁺:n lähde — mukaan lukien EMF→VGCC — voi laukaista allergisia vasteita.",
    calciumSteps: [
      { step: "Ca²⁺-ionoforit laukaisevat degranulaation ILMAN IgE-ristisilloitusta", detail: "Kalsiumionoforit kuten A23187 ja ionomysiini aktivoivat suoraan syottösoluja ja laukaisevat täyden degranulaation ja histamiinin vapautumisen — ohittaen täysin klassisen IgE/FcεRI-reitin. Tämä todistaa, että Ca²⁺-sisäänvirtaus yksistään riittää." },
      { step: "Ca²⁺:n poisto estää degranulaation JOPA IgE-ristisilloituksella", detail: "Kun solunulkoinen Ca²⁺ kelatoidaan tai solusisäiset varastot tyhjennetään, syottösolut eivät degranuloidu vaikka IgE/antigeeni-ristisilloitus on täydellinen. Ca²⁺ ei ole pelkkä kofaktori — se on pakollinen signaali." },
      { step: "Ca²⁺ on välttämätön JA riittävä syottösolujen aktivaatiolle", detail: "Nämä kaksi löydöstä yhdessä osoittavat, että Ca²⁺-signaali sijaitsee kaikkien syottösolujen aktivaatioreittien konvergenssipisteessä. Hallitse Ca²⁺:ta, hallitse degranulaatiota." },
      { step: "MIKÄ TAHANSA ylimääräisen Ca²⁺:n lähde — mukaan lukien EMF→VGCC — voi laukaista allergisia vasteita", detail: "EMF aktivoi jänniteohjatuet kalsiumkanavat (VGCC), tuottaen pitkäkestoisen solusisäisen Ca²⁺-nousun. Koska Ca²⁺ yksistään riittää syottösolujen degranulaatioon, EMF→VGCC-aktivaatio tarjoaa suoran, ei-immunologisen laukaisijan allergisille vasteille." },
    ],

    cascadeTitle: "Nelinkertainen herkistymiskaskadi",
    cascadeLead: "EMF ei toimi yksittäisen reitin kautta. Neljä yhtäaikaisesti vaikuttavaa mekanismia luovat kumulatiivisen herkistymiskaskadin.",
    cascadeSteps: [
      { step: "Q1: Suora VGCC-aktivaatio", detail: "EMF → Ca²⁺↑ syottösoluissa → alentunut degranulaatiokynnys. Jopa kynnyksen alittavat allergeenialtistukset, jotka normaalisti siedettäisiin, voivat nyt laukaista täyden degranulaation kun solusisäinen Ca²⁺ on jo koholla EMF→VGCC:n vuoksi." },
      { step: "Q2: Ympäristöestrogeenit", detail: "Ksenoestrogeenit ja hormonaalisia häiriöitä aiheuttavat aineet lisäävät syottösolujen degranulaatiota ja IgE-välitteistä vapautumista (PMC1797832). Syottösolujen estrogeenireseptorit vahvistavat Ca²⁺-riippuvaista signalointia. EMF:n häiritsemä estrogeenimetabolia (VK6) yhdistää vaikutuksen." },
      { step: "Q3: HPA/immuuniakseli — Th1→Th2-siirtymä", detail: "Kortisolin häiriö EMF→HPA-häiriöstä (VK11) tuottaa Th1→Th2-immuunisiirtymän. Th2-dominanssi lisää IgE-tuotantoa ja eosinofiilien aktivaatiota — klassinen allerginen alttius. Krooninen kortisolinousu paradoksaalisesti edistää allergista herkistymistä." },
      { step: "Q4: Suoliston läpäiseväisyys → LPS → systeeminen tulehdus", detail: "Per2↓ EMF→vuorokausirytmihäiriöstä → suoliston suojaestän eheys↓ → LPS-translokaatio↑ → systeeminen tulehdus primaa syottösolut hyperreaktiivisuuteen (S14). Vuotava suoli toimittaa jatkuvan matala-asteisen immuuniaktivaation, joka alentaa aktivaatiokynnystä kaikissa syottösolupopulaatioissa." },
    ],

    epiTitle: "Epidemiologinen kaava",
    epiLead: "Allergiaepidemiaan ajallinen ja maantieteellinen profiili vastaa EMF:n yleistymisen aikajanaa.",
    epiPoints: [
      "Allergioiden esiintyvyys on kasvanut dramaattisesti 30 vuoden aikana kehittyneissä maissa — liian nopeasti geneettiselle muutokselle, liian laajalle yhdelle allergeenille.",
      "Yhteensattuma EMF:n yleistymisaikajanan kanssa: matkapuhelinverkot, Wi-Fi, älylaitteet kukin korreloivat peräkkäisten yleistymisaaltojen kanssa.",
      "Kaupunki > maaseutu -gradientti: kaupunkiympäristöissä on sekä korkeampi EMF-altistustiheys että korkeampi allergiaesiintyvyys. Gradientti säilyy ilmansaasteiden ja hygienian vakioinnin jälkeen.",
      "Kausivaihtelu korreloi D-vitamiinitason (immunomodulatorinen) ja kausittaisten EMF-käyttömallien kanssa (sisätilojen altistus kasvaa talvikuukausina).",
    ],

    pharmaTitle: "Farmakologinen validaatio",
    pharmaLead: "Olemassa olevat allergialääkkeet tahattomasti validoivat Ca²⁺-mekanismin.",
    pharmaPoints: [
      { drug: "Antihistamiinit", mechanism: "Estävät histamiinireseptoreita — hoitavat OIREITA degranulaation jälkeen, eivät Ca²⁺-riippuvaista syytä. Potilaat pysyvät herkistyneinä.", note: "Pelkästään oireiden hallintaa; ei puutu taustalla olevaan syottösolujen hyperreaktiivisuuteen." },
      { drug: "Syottösolujen stabiloijat (kromoglikaatti)", mechanism: "Toimivat vähentämällä Ca²⁺-signalointia syottösoluissa, estäen degranulaation ennen sen tapahtumista. Tehokkaita juuri KOSKA Ca²⁺ on pakollinen aktivaatiosignaali.", note: "Vaikutusmekanismi validoi suoraan syottösolujen aktivaation Ca²⁺-riippuvuuden." },
      { drug: "Omalitsumabi (anti-IgE)", mechanism: "Estää IgE:n sitoutumisen syottösoluihin — mutta potilaat reagoivat edelleen Ca²⁺-ionoforeihin. Tämä todistaa IgE:stä RIIPPUMATTOMAN aktivaatioreitin olemassaolon.", note: "Osittainen teho vahvistaa, että IgE on vain yksi useista aktivaatioreiteistä — Ca²⁺-sisäänvirtaus ohittaa IgE-salpauksen." },
    ],

    predictionText: "Ennuste E-NEW-27: EMF-altistetuissa syottösoluissa havaitaan lisääntynyt degranulaatio vasteena kynnyksen alittaville allergeenikonsentraatioille, VGCC-riippuvaisen Ca²⁺-nousun välittämänä.",
    predictionLink: "Ks. viimeisten kerrosten ennusteet →",
    predictionHref: "/predictions",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function AllergyEpidemicPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <Link href={`${prefix}/evidence`} className="text-sm text-accent hover:underline">{d.backLink}</Link>
      </p>
      <PageHeader icon={Activity} title={d.title} subtitle={d.subtitle} />
      <div className="mt-8"><CautionBox locale={activeLocale}><p>{d.cautionText}</p></CautionBox></div>

      {/* Section 1: The Ca2+ dependency */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.calciumTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.calciumLead}</p>
        <div className="space-y-3">
          {d.calciumSteps.map((s, i) => (
            <div key={i} className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{s.step}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Quadruple sensitization cascade */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.cascadeTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.cascadeLead}</p>
        <div className="space-y-3">
          {d.cascadeSteps.map((s, i) => (
            <div key={i} className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-sm font-semibold mb-1">{s.step}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Epidemiological pattern */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.epiTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.epiLead}</p>
        <div className="space-y-1.5">
          {d.epiPoints.map((point, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-accent shrink-0">{"→"}</span><p>{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Pharmacological validation */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.pharmaTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4 max-w-3xl">{d.pharmaLead}</p>
        <div className="space-y-3">
          {d.pharmaPoints.map((p, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <p className="text-sm font-semibold mb-1">{p.drug}</p>
              <p className="text-sm text-foreground-muted leading-relaxed mb-1">{p.mechanism}</p>
              <p className="text-xs text-foreground-muted italic">{p.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DerivedPrediction */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <DerivedPrediction>
          <p className="text-sm leading-relaxed mb-3">{d.predictionText}</p>
          <Link href={`${prefix}${d.predictionHref}`} className="text-sm text-accent hover:underline">{d.predictionLink}</Link>
        </DerivedPrediction>
      </section>
    </div>
  );
}
