import type { Metadata } from "next";
import { ShieldQuestion } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";

type Objection = { question: string; response: readonly string[]; boundary: string };
type Copy = {
  title: string;
  subtitle: string;
  introduction: string;
  objections: readonly Objection[];
  closingTitle: string;
  closingText: string;
};

const t: Record<Locale, Copy> = {
  en: {
    title: "Research questions and evidence boundaries",
    subtitle:
      "The questions BERM must answer before a field-to-population interpretation can be regarded as a calibrated result.",
    introduction:
      "This page does not turn open questions into rhetoric. It separates what the current FieldState–ASFR-v2 structure is designed to test from what remains unknown, competing or outside the model.",
    objections: [
      {
        question: "Could demographic and social causes explain period TFR change?",
        response: [
          "Yes. Education, contraception, housing, labour markets, partnership formation, migration, policy, desired family size, tempo and ART all affect observed fertility. A period TFR is a five-year-age-group sum, not a direct assay of gametes or conception.",
          "V2 therefore models ASFR before TFR and keeps demand/opportunity, tempo and ART/live-birth delivery explicit. It does not assign their residual variation to a biological field pathway.",
        ],
        boundary: "A country trend alone cannot identify a biological cause. Population inference requires a matched FieldState, endpoint, couple and ASFR panel with credible competing models.",
      },
      {
        question: "Does Lindgren physics establish a human reproductive mechanism?",
        response: [
          "No. In v2, the Lindgren-derived formulation is a theory-level premise that motivates a background-, vector-, geometry- and spectrum-aware measurement design. It supplies neither a human receptor identity nor an EMF-to-TFR coefficient.",
          "The relevant tests are discriminating physical and biological experiments: for example a pre-specified angle, background or PSD dependence with calibrated fields and appropriate sham/thermal controls.",
        ],
        boundary: "A theoretical premise is not elevated to an empirical endpoint. Each additional link needs its own measured evidence.",
      },
      {
        question: "What do the reproductive and barrier studies actually show?",
        response: [
          "The registry includes bounded findings such as in-vitro human sperm endpoints, animal blood–testis-barrier and ovarian studies, and mechanistic redox/tight-junction work. These can motivate organ-specific states rather than a single generic biological-capacity curve.",
          "Their systems, frequencies, amplitudes, durations and endpoints differ. Animal and cell results cannot simply be converted into a population dose, fertility probability or country forecast.",
        ],
        boundary: "A study-to-node record supports the registered part of the route only. None is a direct TFR slope or a substitute for a human endpoint panel.",
      },
      {
        question: "Can mobile subscriptions or eDRX show a physical exposure pathway?",
        response: [
          "No. Mobile subscriptions can time digital-technology diffusion but are not a local field measurement, organ transfer or biological dose. The current N = 163 cohort result is reported as a descriptive technology-timing analysis.",
          "Likewise, eDRX is device reception/paging scheduling metadata, not by itself a known downlink RF field signature. Any envelope or beat feature must be measured in the actual field before it is tested biologically.",
        ],
        boundary: "Proxy timing and physical dosimetry answer different questions and must remain labelled differently.",
      },
      {
        question: "What about mixed EMF research and systematic reviews?",
        response: [
          "The evidence base is heterogeneous. Study quality, exposure characterisation, thermal control, endpoint selection and replication vary substantially. Reviews can establish that findings exist across systems, but their certainty assessments and sensitivity analyses need to be reported rather than replaced with a single headline.",
          "For example, the WHO-commissioned reproductive review reported adverse findings in several analyses while rating much of the certainty low or very low and requiring sensitivity to high-SAR studies. V2 treats that as context, not a settled population effect.",
        ],
        boundary: "The right response to uncertainty is better measurement and transparent study weighting, not a stronger narrative claim.",
      },
      {
        question: "Could chemicals, climate, disease, lifestyle or other exposures be involved?",
        response: [
          "Yes. These exposures may affect reproductive biology and may co-vary with technology, urbanisation and socioeconomic change. They are competing explanations and potential interactions, not nuisance variables that can be dismissed by a simple correlation.",
          "A useful test measures or designs around plausible co-exposures, compares alternative causal models and reports which inference changes when they are included.",
        ],
        boundary: "No single cross-country pattern establishes dominance of one environmental cause. V2 must earn any attribution through discriminating data.",
      },
      {
        question: "What would move the model from structure to a result?",
        response: [
          "A measurement-ready FieldState needs documented calibration, B₀ vector, organ transfer, PSD, circadian context, phase/coherence and provenance. It must then be joined to a pre-specified organ or couple endpoint with evidence- and parameter-linked mappings.",
          "Calibration should use a training period only, followed by an independent laboratory replication and a held-out ASFR/TFR period. Both null and non-null results should update the causal registry.",
        ],
        boundary: "Until those joins exist, v2 is a research specification and causal map, not a calibrated country forecast model.",
      },
    ],
    closingTitle: "Constructive ways to test the programme",
    closingText:
      "The most useful critiques provide a competing measurement model, a source correction, an independently replicated experiment, or a better demographic design. The project should be judged by whether its registered links survive those tests and how they compare with alternative explanations.",
  },
  fi: {
    title: "Tutkimuskysymykset ja evidenssirajat",
    subtitle:
      "Kysymykset, joihin BERM:n on vastattava ennen kuin kentästä väestöön ulottuvaa tulkintaa voidaan pitää kalibroituna tuloksena.",
    introduction:
      "Tämä sivu ei muuta avoimia kysymyksiä retoriikaksi. Se erottaa, mitä nykyinen FieldState–ASFR-v2-rakenne on suunniteltu testaamaan, siitä mikä on vielä tuntematonta, kilpailevaa tai mallin ulkopuolella.",
    objections: [
      {
        question: "Voivatko demografiset ja sosiaaliset syyt selittää periodin TFR-muutoksen?",
        response: [
          "Kyllä. Koulutus, ehkäisy, asuminen, työmarkkinat, parinmuodostus, muuttoliike, politiikka, toivottu perhekoko, tempo ja ART vaikuttavat havaittuun hedelmällisyyteen. Periodin TFR on viisivuotisikäryhmien summa, ei suora gametti- tai conception-testi.",
          "V2 mallintaa siksi ASFR:n ennen TFR:ää ja pitää kysynnän/mahdollisuuden, tempon sekä ART/live-birth-deliveryn eksplisiittisinä. Se ei kohdista niiden residuaalivaihtelua biologiseen kenttäreittiin.",
        ],
        boundary: "Maakohtainen trendi ei yksin tunnista biologista syytä. Väestöpäättely vaatii kohdistetun FieldState-, päätepiste-, pari- ja ASFR-paneelin sekä uskottavat kilpailevat mallit.",
      },
      {
        question: "Osoittaako Lindgren-fysiikka ihmisen lisääntymismekanismin?",
        response: [
          "Ei. V2:ssa Lindgrenistä johdettu muotoilu on teoriatason premissi, joka motivoi tausta-, vektori-, geometria- ja spektritietoista mittaussuunnitelmaa. Se ei anna ihmisen reseptori-identiteettiä eikä EMF → TFR -kerrointa.",
          "Relevantit testit ovat erottavia fysikaalisia ja biologisia kokeita: esimerkiksi ennalta määritelty kulma-, tausta- tai PSD-riippuvuus kalibroiduilla kentillä sekä asianmukaisilla sham-/lämpökontrolleilla.",
        ],
        boundary: "Teoreettista premissiä ei ylennetä empiiriseksi päätepisteeksi. Jokainen lisälenkki tarvitsee oman mitatun evidenssinsä.",
      },
      {
        question: "Mitä lisääntymis- ja estetutkimukset todella osoittavat?",
        response: [
          "Rekisterissä on rajattuja löydöksiä, kuten in-vitro-ihmisen siittiöpäätepisteitä, eläinmallien veri–kiveseste- ja munasarjatutkimuksia sekä mekanistista redox-/tight-junction-työtä. Ne voivat motivoida elinkohtaisia tiloja yhden geneerisen biologisen kapasiteettikäyrän sijasta.",
          "Järjestelmät, taajuudet, amplitudit, kestot ja päätepisteet eroavat. Eläin- ja solutuloksia ei voi suoraan muuntaa väestöannokseksi, hedelmällisyystodennäköisyydeksi tai maakohtaiseksi ennusteeksi.",
        ],
        boundary: "Tutkimus–solmu-tietue tukee vain rekisteröityä reitin osaa. Mikään niistä ei ole suora TFR-kulmakerroin eikä ihmisen päätepistepaneelin korvike.",
      },
      {
        question: "Voivatko mobiililiittymät tai eDRX osoittaa fysikaalisen altistusreitin?",
        response: [
          "Eivät. Mobiililiittymät voivat ajoittaa digitaaliteknologian leviämistä, mutta ne eivät ole paikallinen kenttämittaus, elinsiirto eivätkä biologinen annos. Nykyinen N = 163 -kohorttitulosta raportoidaan kuvailevana teknologia-ajoitusanalyysinä.",
          "Samoin eDRX on laitteen vastaanoton/sivutuksen ajoitusmetadataa, ei yksin tunnettu downlink-RF-kenttäallekirjoitus. Mahdollinen verhokäyrä- tai beat-piirre on mitattava todellisessa kentässä ennen biologista testiä.",
        ],
        boundary: "Proxyn ajoitus ja fysikaalinen dosimetria vastaavat eri kysymyksiin, ja ne on merkittävä eri tavoin.",
      },
      {
        question: "Entä vaihteleva EMF-kirjallisuus ja systemaattiset katsaukset?",
        response: [
          "Evidenssipohja on heterogeeninen. Tutkimuslaatu, altistuskarakterisointi, lämpökontrolli, päätepistevalinta ja replikaatio vaihtelevat huomattavasti. Katsaukset voivat osoittaa, että eri järjestelmistä on löydöksiä, mutta niiden varmuusarviot ja herkkyysanalyysit on raportoitava yhden otsikkolauseen sijaan.",
          "Esimerkiksi WHO:n tilaama lisääntymiskatsaus raportoi haitallisia löydöksiä useissa analyyseissä, mutta arvioi suuren osan varmuudesta matalaksi tai hyvin matalaksi ja edellytti herkkyyttä korkean SAR:n tutkimuksille. V2 käsittelee tätä kontekstina, ei vakiintuneena väestövaikutuksena.",
        ],
        boundary: "Oikea vastaus epävarmuuteen on parempi mittaus ja läpinäkyvä tutkimuspainotus, ei vahvempi narratiiviväite.",
      },
      {
        question: "Voivatko kemikaalit, ilmasto, sairaudet, elämäntapa tai muut altisteet olla mukana?",
        response: [
          "Kyllä. Nämä altisteet voivat vaikuttaa lisääntymisbiologiaan ja yhteisvaihdella teknologian, kaupungistumisen ja sosioekonomisen muutoksen kanssa. Ne ovat kilpailevia selityksiä ja mahdollisia yhteisvaikutuksia, eivät häiriötekijöitä, jotka voidaan sivuuttaa yksinkertaisella korrelaatiolla.",
          "Hyödyllinen testi mittaa tai suunnittelee uskottavien yhteisaltisteiden ympärille, vertailee vaihtoehtoisia kausaalimalleja ja raportoi, miten päätelmä muuttuu, kun ne sisällytetään.",
        ],
        boundary: "Yksittäinen maidenvälinen kuvio ei osoita yhden ympäristösyyn hallitsevuutta. V2:n on ansaittava attribuutio erottavalla datalla.",
      },
      {
        question: "Mikä siirtäisi mallin rakenteesta tulokseksi?",
        response: [
          "Mittausvalmis FieldState tarvitsee dokumentoidun kalibroinnin, B₀-vektorin, elinsiirron, PSD:n, vuorokausikontekstin, vaiheen/koherenssin ja provenienssin. Se on sen jälkeen yhdistettävä ennalta määriteltyyn elin- tai paripäätepisteeseen evidenssi- ja parametri-ID:hin kiinnittyvillä mappingeilla.",
          "Kalibrointi tehdään vain opetusjaksolla, jota seuraavat riippumaton laboratorioreplikaatio ja sovituksen ulkopuolelle jätetty ASFR/TFR-jakso. Sekä nolla- että ei-nollatulosten tulee päivittää kausaalirekisteriä.",
        ],
        boundary: "Kunnes nämä joinit ovat olemassa, v2 on tutkimusmäärittely ja kausaalikartta, ei kalibroitu maakohtainen ennustemalli.",
      },
    ],
    closingTitle: "Rakentavia tapoja testata tutkimusohjelmaa",
    closingText:
      "Hyödyllisimmät kritiikit tarjoavat kilpailevan mittausmallin, lähdekorjauksen, riippumattomasti replikoidun kokeen tai paremman demografisen asetelman. Projektia tulee arvioida sen mukaan, kestävätkö rekisteröidyt lenkit nämä testit ja miten ne vertautuvat vaihtoehtoisiin selityksiin.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = t[locale === "fi" ? "fi" : "en"];
  return { title: `${d.title} – Extinction Field`, description: d.subtitle };
}

export default async function ObjectionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = t[locale === "fi" ? "fi" : "en"];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={ShieldQuestion} title={d.title} subtitle={d.subtitle} />
      <div className="max-w-3xl space-y-8">
        <p className="text-foreground-muted leading-relaxed">{d.introduction}</p>

        {d.objections.map((objection, index) => (
          <section key={objection.question} className="rounded-xl border border-card-border bg-card-bg p-5">
            <p className="font-mono-num text-xs text-accent">0{index + 1}</p>
            <h2 className="mt-2 text-lg font-semibold">{objection.question}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground-muted">
              {objection.response.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <p className="mt-4 rounded-lg border border-status-partial/35 bg-status-partial/5 p-3 text-xs leading-relaxed text-foreground-muted">{objection.boundary}</p>
          </section>
        ))}

        <section className="rounded-xl border border-accent/25 bg-accent/5 p-5">
          <h2 className="text-lg font-semibold">{d.closingTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{d.closingText}</p>
        </section>
      </div>
    </div>
  );
}
