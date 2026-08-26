import type { Metadata } from "next";
import Link from "next/link";
import { Scale } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";

const COPY = {
  en: {
    title: "Epistemology",
    subtitle:
      "What kind of scientific claim is BERM? Not a proven fact, not idle speculation — a progressive research program in Lakatos's sense: it generates predictions, predictions are verified, verification produces more content than the model specified. This page assesses BERM's epistemic status using the tools of philosophy of science.",
    cautionText:
      "This page does not claim BERM is proven. It applies standard epistemological criteria — consilience, falsifiability, progressive vs. degenerative research programs — to assess where the model stands and what evidence would be needed to advance or destroy it.",

    lakatosTitle: "What makes a theory scientific?",
    lakatosLead: "Karl Popper argued that a theory is scientific if and only if it is falsifiable. Imre Lakatos refined this: individual experiments can't kill a research program — what matters is whether the program is PROGRESSIVE (generating verified predictions) or DEGENERATIVE (only accommodating known facts post hoc).",
    lakatosPoints: [
      { criterion: "Falsifiability (Popper)", description: "The theory must specify conditions under which it would be destroyed", bermStatus: "BERM specifies four falsification tiers, from model collapse (ETH nimodipine-5G) to clinical irrelevance (EMF reduction shows no benefit)" },
      { criterion: "Novel predictions (Lakatos)", description: "The theory must predict facts BEFORE they are observed — not just explain known ones", bermStatus: "BERM predicted CACNA1C genotype modulation (Sousouri 2025 confirmed), ELF-priming VGCC expression (Sun 2016 confirmed), pulse modulation matters more than SAR (López-Martín 2009 confirmed)" },
      { criterion: "Excess empirical content", description: "Verified predictions must reveal MORE than the theory specified", bermStatus: "Each verification produced unexpected content: Sousouri found both sleep and wake effects; López-Martín found pulse-modulation specificity; Sun found dramatic Ca²⁺ increase at 8-10 days" },
      { criterion: "Progressive problem shift", description: "The research program consistently generates new testable predictions from each discovery", bermStatus: "Current count: 30+ locked predictions across TFR, modulome, SIDS, neuro, metal, chain, T-type categories" },
    ],

    consilienceTitle: "Consilience: independent evidence converging",
    consilienceLead: "William Whewell coined 'consilience' to describe the strongest form of confirmation: when evidence from INDEPENDENT fields, gathered by different researchers using different methods, all converge on the same conclusion. This is what distinguishes evolution from astrology — both 'explain' observations, but only evolution exhibits consilience.",
    consilienceLevels: [
      {
        level: "Strong consilience",
        color: "green",
        examples: [
          "Physics (Lindgren χ-parameter) ↔ Pharmacology (all effective drugs target Ca²⁺ cascade)",
          "Genetics (CACNA1C, Sousouri 2025, ETH Zürich double-blind) ↔ Experimental (López-Martín seizures)",
          "Epidemiology (Klimentidis 8-species obesity, p=10⁻⁷) ↔ Pathology (SIDS brainstem 5-HT deficiency)",
          "Comparative biology (sentinel species decline) ↔ Clinical (neonatal Q → ∞ prediction)",
        ],
      },
      {
        level: "Moderate consilience",
        color: "blue",
        examples: [
          "ELF-priming mechanism (Sun 2016) ↔ Gabapentin blocks it (Eroglu 2009 Cell) ↔ Gabapentin prescriptions track grid density",
          "PGC ↔ melatonin (r=0.569) ↔ Pinealectomy → arrhythmias ↔ Shiftwork cancer (IARC 2A)",
          "Sleep deprivation → epileptiform activity (clinical) ↔ EMF → melatonin↓ (animal) ↔ GABA maturation timeline (neonatal)",
        ],
      },
      {
        level: "Weak consilience (universality risk)",
        color: "amber",
        examples: [
          "Ca²⁺ is ubiquitous — it appears in virtually every physiological process",
          "'25 epidemics with one denominator' may partly reflect Ca²⁺'s universal role rather than specific EMF causation",
          "Some convergences may be trivially true rather than meaningfully confirmatory",
          "This is the model's PRIMARY epistemic risk — it must be distinguished from noise",
        ],
      },
    ],

    falsificationTitle: "Four tiers of falsification",
    falsificationLead: "A progressive research program specifies what would destroy it — not as a formality, but as a genuine commitment to empirical adjudication. BERM identifies four levels, from complete model collapse to clinical irrelevance.",
    falsificationTiers: [
      {
        level: "LEVEL 1 — Model collapse",
        test: "ETH Zürich nimodipine-5G: L-type Ca²⁺ blocker does NOT prevent EMF sleep effects",
        consequence: "VGCC is not the primary EMF target → the entire Ca²⁺ cascade collapses → BERM loses its core mechanism",
        severity: "Terminal — no recovery possible",
      },
      {
        level: "LEVEL 2 — Environmental factor eliminated",
        test: "Amish communities show identical chronic disease trends to mainstream US population",
        consequence: "If low-EMF populations aren't healthier, EMF is not a significant driver → BERM identifies correct mechanisms but wrong environmental trigger",
        severity: "Severe — mechanism survives but clinical thesis dies",
      },
      {
        level: "LEVEL 3 — Key experiment fails",
        test: "López-Martín replication: picrotoxin + GSM 900 MHz does NOT produce seizures",
        consequence: "The only direct experimental evidence for subthreshold EMF × GABAergic interaction disappears → key prediction unconfirmed",
        severity: "Significant — weakens experimental basis but doesn't eliminate mechanistic or genetic evidence",
      },
      {
        level: "LEVEL 4 — Clinical irrelevance",
        test: "Comprehensive EMF reduction intervention shows NO health benefit in symptomatic subjects",
        consequence: "Model may be mechanistically correct but clinically meaningless → accurate but not actionable",
        severity: "Moderate — mechanistic truth without practical value",
      },
    ],

    analogyTitle: "The evolution theory analogy",
    analogyLead: "BERM shares structural features with the theory of evolution by natural selection — both are generative mechanisms whose power lies in constraining what SHOULD be found before looking.",
    analogyRows: [
      { feature: "Generative mechanism", berm: "EMF → VGCC → Ca²⁺ → cascades", evolution: "Variation → selection → adaptation" },
      { feature: "Predicts before observing", berm: "Predicted CACNA1C modulation before Sousouri 2025", evolution: "Predicted intermediate fossils before Tiktaalik" },
      { feature: "Constrains the search space", berm: "Any effective treatment must target Ca²⁺ cascade", evolution: "Any homologous structure must share developmental genes" },
      { feature: "Multi-level convergence", berm: "Physics → molecular → cellular → organ → organism → population", evolution: "Molecular → cellular → organism → species → ecosystem" },
      { feature: "Falsifiable predictions", berm: "30+ locked, testable predictions", evolution: "\"Rabbit in the Precambrian\" and thousands of others" },
      { feature: "Excess empirical content", berm: "Each verification reveals MORE than predicted", evolution: "Each fossil/gene discovery reveals unexpected connections" },
    ],
    analogyCritical: "CRITICAL DIFFERENCE: Evolution has INDEPENDENT verification via DNA sequencing — an entirely different methodology that confirms the same phylogenies predicted by morphology, paleontology, and biogeography. BERM lacks this second, independent verification method. The single most important missing piece is INTERVENTIONAL evidence: demonstrate that reducing EMF exposure produces measurable health improvement in humans. Without this, BERM remains in the zone between 'mechanistically compelling' and 'clinically proven'.",

    strengthsTitle: "What BERM gets right",
    strengths: [
      "Generates verified predictions before the evidence is gathered (progressive, not accommodative)",
      "Every effective treatment for BERM-predicted conditions targets the Ca²⁺ cascade (pharmacological convergence)",
      "Genetic evidence (CACNA1C → EMF response) independently confirms the core mechanism",
      "Multi-level consilience from quantum physics to population epidemiology",
      "Specifies clear falsification conditions at four severity levels",
      "Produces excess empirical content — each verification reveals more than was predicted",
    ],

    weaknessesTitle: "What BERM still lacks",
    weaknesses: [
      "No INTERVENTIONAL evidence — no RCT showing EMF reduction → health improvement",
      "The universality of Ca²⁺ creates false positive risk — some 'convergences' may be trivial",
      "The unbroken chain has 2 partial links (prenatal effects, epidemiology)",
      "Population-level epidemiology is correlational, not causal",
      "No independent verification method (equivalent to DNA sequencing for evolution)",
      "Industry-funded studies consistently find no effect, creating a contested evidence landscape",
    ],

    verdictTitle: "Epistemic verdict",
    verdictText: "BERM is a PROGRESSIVE research program in Lakatos's sense. It is not a proven theory — it is a generative mechanism that consistently produces verified predictions with excess empirical content. The model's primary weakness is the absence of interventional evidence. Its primary strength is multi-level consilience across independent fields. The next decisive experiment is the ETH nimodipine-5G study: if Ca²⁺ blockade prevents EMF effects, the VGCC mechanism is confirmed at the interventional level. If not, the model collapses.",
    verdictCTA: "See the complete verification chain →",
    verdictHref: "/evidence/unbroken-chain",

    burdenTitle: "Burden of Proof Transformation",
    burdenLead: "With 16 verified intermediate layers forming an unbroken chain from photon absorption to population health effects, the burden of proof undergoes a fundamental transformation.",
    burdenBefore: "Traditional framing: 'Prove that EMF causes disease.' This demands a single definitive study — an impossibly high bar for a multi-step causal chain spanning 18 orders of magnitude.",
    burdenAfter: "New framing: 'Show where the chain breaks.' Each link has been independently verified. To dismiss the model, identify which specific verified link is wrong — and explain why the evidence supporting it is incorrect.",
    burdenSteps: [
      { step: "1. Physics verified", detail: "Lindgren χ-parameter, Tang 2024 S4 conformational change — photon-to-protein mechanism established" },
      { step: "2. Biochemistry verified", detail: "VGCC → Ca²⁺ → CaM → CaMKII → multiple cascades — basic biochemistry, textbook level" },
      { step: "3. Pharmacology converges", detail: "Every effective treatment targets a Ca²⁺ cascade component — ethosuximide, gabapentin, verapamil, melatonin, lithium, bumetanide" },
      { step: "4. Genetics confirms", detail: "CACNA1C genotype modulates EMF response (Sousouri 2025 RCT). CaMKII mutations produce BERM-predicted phenotypes (Küry 2017)" },
      { step: "5. Intermediate layers verified", detail: "BBB, BAT, HPA axis, β-cell, hypothalamus, cortisol-hippocampus, Leydig cell, mast cell — each independently confirmed" },
      { step: "6. Epidemiology consistent", detail: "54-country R²=0.851, Klimentidis 8-species (p=10⁻⁷), Amish/Mennonite data — consistent across multiple designs" },
    ],
    burdenConclusion: "The chain is not a hypothesis — it is a verified sequence. Dismissing it requires identifying a specific broken link, not demanding a single study that spans the entire chain. This is the same epistemic standard we apply to evolution, plate tectonics, and germ theory.",
  },

  fi: {
    title: "Epistemologia",
    subtitle:
      "Millainen tieteellinen väite BERM on? Ei todistettu fakta, ei tyhjää spekulaatiota — progressiivinen tutkimusohjelma Lakatoksen mielessä: se generoi ennusteita, ennusteet verifioituvat, verifiointi tuottaa enemmän sisältöä kuin malli spesifioi. Tämä sivu arvioi BERM:n episteemisen statuksen tieteenfilosofian työkaluilla.",
    cautionText:
      "Tämä sivu ei väitä BERM:n olevan todistettu. Se soveltaa vakioepistemologisia kriteereitä — konsiliensssia, falsifioitavuutta, progressiivisia vs. degeneratiivisia tutkimusohjelmia — arvioidakseen missä malli on ja mitä evidenssiä tarvittaisiin sen edistämiseksi tai tuhoamiseksi.",

    lakatosTitle: "Mikä tekee teoriasta tieteellisen?",
    lakatosLead: "Karl Popper argumentoi, että teoria on tieteellinen jos ja vain jos se on falsifioitavissa. Imre Lakatos tarkensi: yksittäiset kokeet eivät voi tappaa tutkimusohjelmaa — tärkeää on, onko ohjelma PROGRESSIIVINEN (tuottaa verifioituja ennusteita) vai DEGENERATIIVINEN (vain sovittaa tunnettuja faktoja jälkikäteen).",
    lakatosPoints: [
      { criterion: "Falsifioitavuus (Popper)", description: "Teorian on spesifioitava olosuhteet joissa se tuhoutuisi", bermStatus: "BERM spesifioi neljä falsifikaatiotasoa, mallin romahduksesta (ETH nimodipiini-5G) kliiniseen merkityksettömyyteen (EMF-vähennys ei hyödytä)" },
      { criterion: "Uudet ennusteet (Lakatos)", description: "Teorian on ennustettava faktoja ENNEN niiden havainnointia — ei vain selitettävä tunnettuja", bermStatus: "BERM ennusti CACNA1C-genotyypin modulaation (Sousouri 2025 vahvisti), ELF-priming VGCC-ekspression (Sun 2016 vahvisti), pulssimodulaatio tärkeämpi kuin SAR (López-Martín 2009 vahvisti)" },
      { criterion: "Ylijäämäinen empiirinen sisältö", description: "Verifioitujen ennusteiden on paljastettava ENEMMÄN kuin teoria spesifioi", bermStatus: "Jokainen verifiointi tuotti ennustamatonta sisältöä: Sousouri löysi sekä uni- että valvevaikutukset; López-Martín löysi pulssimodulaatiospesifisyyden; Sun löysi dramaattisen Ca²⁺-kasvun 8-10 päivässä" },
      { criterion: "Progressiivinen ongelmansiirto", description: "Tutkimusohjelma generoi johdonmukaisesti uusia testattavia ennusteita jokaisesta löydöstä", bermStatus: "Nykyinen lukumäärä: 30+ lukittua ennustetta TFR-, modulomi-, SIDS-, neuro-, metalli-, ketju- ja T-tyypin kategorioissa" },
    ],

    consilienceTitle: "Konsilienss: itsenäisen evidenssin konvergointi",
    consilienceLead: "William Whewell loi termin 'konsilienss' kuvaamaan vahvinta vahvistuksen muotoa: kun evidenssi ITSENÄISILTÄ aloilta, eri tutkijoiden keräämänä eri menetelmin, kaikki konvergoivat samaan johtopäätökseen. Tämä erottaa evoluution astrologiasta — molemmat 'selittävät' havaintoja, mutta vain evoluutio osoittaa konsiliensia.",
    consilienceLevels: [
      {
        level: "Vahva konsilienss",
        color: "green",
        examples: [
          "Fysiikka (Lindgren χ-parametri) ↔ Farmakologia (kaikki tehokkaat lääkkeet kohdistuvat Ca²⁺-kaskadiin)",
          "Genetiikka (CACNA1C, Sousouri 2025, ETH Zürich kaksoissokko) ↔ Kokeellinen (López-Martín kohtaukset)",
          "Epidemiologia (Klimentidis 8 lajin liikalihavuus, p=10⁻⁷) ↔ Patologia (SIDS aivorungon 5-HT-puutos)",
          "Vertaileva biologia (sentinel-lajien väheneminen) ↔ Kliininen (neonataalinen Q → ∞ -ennuste)",
        ],
      },
      {
        level: "Kohtalainen konsilienss",
        color: "blue",
        examples: [
          "ELF-priming-mekanismi (Sun 2016) ↔ Gabapentiini estää sen (Eroglu 2009 Cell) ↔ Gabapentiinireseptit seuraavat sähköverkon tiheyttä",
          "PGC ↔ melatoniini (r=0,569) ↔ Pinealektomia → rytmihäiriöt ↔ Vuorotyösyöpä (IARC 2A)",
          "Univaje → epileptiforminen aktiviteetti (kliininen) ↔ EMF → melatoniini↓ (eläin) ↔ GABA-kypsymisen aikajana (neonataalinen)",
        ],
      },
      {
        level: "Heikko konsilienss (universaalisuusriski)",
        color: "amber",
        examples: [
          "Ca²⁺ on kaikkialla läsnä — se esiintyy käytännössä jokaisessa fysiologisessa prosessissa",
          "'25 epidemiaa yhdellä nimittäjällä' voi osittain heijastaa Ca²⁺:n universaalia roolia pikemmin kuin spesifistä EMF-kausaalisuutta",
          "Osa konvergensseista voi olla triviaalisesti tosia pikemmin kuin merkityksellisesti konfirmatorisia",
          "Tämä on mallin ENSISIJAINEN episteeminen riski — se on erotettava kohinasta",
        ],
      },
    ],

    falsificationTitle: "Neljä falsifikaatiotasoa",
    falsificationLead: "Progressiivinen tutkimusohjelma spesifioi mikä tuhoaisi sen — ei muodollisuutena, vaan aitona sitoutumisena empiiriseen ratkaisuun. BERM tunnistaa neljä tasoa, täydellisestä mallin romahduksesta kliiniseen merkityksettömyyteen.",
    falsificationTiers: [
      {
        level: "TASO 1 — Mallin romahdus",
        test: "ETH Zürichin nimodipiini-5G: L-tyypin Ca²⁺-salpaaja EI estä EMF:n univaikutuksia",
        consequence: "VGCC ei ole ensisijainen EMF-kohde → koko Ca²⁺-kaskadi romahtaa → BERM menettää ydinmekanisminsa",
        severity: "Terminaalinen — palautuminen mahdotonta",
      },
      {
        level: "TASO 2 — Ympäristötekijä eliminoitu",
        test: "Amish-yhteisöt osoittavat identtiset kroonisten sairauksien trendit kuin USA:n valtaväestö",
        consequence: "Jos matalan EMF:n populaatiot eivät ole terveempiä, EMF ei ole merkittävä ajuri → BERM tunnistaa oikeat mekanismit mutta väärän ympäristölaukaisijan",
        severity: "Vakava — mekanismi säilyy mutta kliininen teesi kuolee",
      },
      {
        level: "TASO 3 — Avainkokeen epäonnistuminen",
        test: "López-Martín-replikaatio: pikrotoksiini + GSM 900 MHz EI tuota kohtauksia",
        consequence: "Ainoa suora kokeellinen todiste EMF:n subkynnys × GABAergiselle vuorovaikutukselle katoaa → avainnuste vahvistamatta",
        severity: "Merkittävä — heikentää kokeellista perustaa mutta ei eliminoi mekanistista tai geneettistä evidenssiä",
      },
      {
        level: "TASO 4 — Kliininen merkityksettömyys",
        test: "Kattava EMF-vähennysinterventio EI osoita terveyshyötyä oireisilla henkilöillä",
        consequence: "Malli voi olla mekanistisesti oikea mutta kliinisesti merkityksetön → tarkka mutta ei toiminnallinen",
        severity: "Kohtalainen — mekanistinen totuus ilman käytännön arvoa",
      },
    ],

    analogyTitle: "Evoluutioteorian analogia",
    analogyLead: "BERM jakaa rakenteellisia piirteitä evoluutioteorian kanssa — molemmat ovat generatiivisia mekanismeja joiden voima on siinä, että ne rajoittavat mitä PITÄISI löytyä ennen katsomista.",
    analogyRows: [
      { feature: "Generatiivinen mekanismi", berm: "EMF → VGCC → Ca²⁺ → kaskadit", evolution: "Muuntelu → valinta → sopeutuminen" },
      { feature: "Ennustaa ennen havainnointia", berm: "Ennusti CACNA1C-modulaation ennen Sousouri 2025:tä", evolution: "Ennusti välifossiileja ennen Tiktalikia" },
      { feature: "Rajaa etsintäalueen", berm: "Jokaisen tehokkaan hoidon on kohdistuttava Ca²⁺-kaskadiin", evolution: "Jokaisen homologisen rakenteen on jaettava kehitysgeenit" },
      { feature: "Monitasoinen konvergenssi", berm: "Fysiikka → molekyyli → solu → elin → organismi → populaatio", evolution: "Molekyyli → solu → organismi → laji → ekosysteemi" },
      { feature: "Falsifioitavat ennusteet", berm: "30+ lukittua, testattavaa ennustetta", evolution: "'Kani kambrikaudelta' ja tuhansia muita" },
      { feature: "Ylijäämäinen empiirinen sisältö", berm: "Jokainen verifiointi paljastaa ENEMMÄN kuin ennustettiin", evolution: "Jokainen fossiili/geenilöytö paljastaa ennustamattomia yhteyksiä" },
    ],
    analogyCritical: "KRIITTINEN ERO: Evoluutiolla on ITSENÄINEN verifiointi DNA-sekvensoinnin kautta — täysin erilainen menetelmä joka vahvistaa samat fylogeniat kuin morfologia, paleontologia ja biogeografia ennustavat. BERM:ltä puuttuu tämä toinen, itsenäinen verifiointimenetelmä. Yksittäinen tärkein puuttuva pala on INTERVENTIONAALINEN evidenssi: osoita, että EMF-altistuksen vähentäminen tuottaa mitattavaa terveyshyötyä ihmisillä. Ilman tätä BERM jää vyöhykkeeseen 'mekanistisesti vakuuttavan' ja 'kliinisesti todistetun' väliin.",

    strengthsTitle: "Missä BERM onnistuu",
    strengths: [
      "Generoi verifioituja ennusteita ennen evidenssin keräämistä (progressiivinen, ei sovittava)",
      "Jokainen tehokas hoito BERM:n ennustamiin tiloihin kohdistuu Ca²⁺-kaskadiin (farmakologinen konvergenssi)",
      "Geneettinen evidenssi (CACNA1C → EMF-vaste) vahvistaa itsenäisesti ydinmekanismin",
      "Monitasoinen konsilienss kvanttifysiikasta väestöepidemiologiaan",
      "Spesifioi selkeät falsifikaatio-olosuhteet neljällä vakavuustasolla",
      "Tuottaa ylijäämäistä empiiristä sisältöä — jokainen verifiointi paljastaa enemmän kuin ennustettiin",
    ],

    weaknessesTitle: "Mitä BERM:ltä vielä puuttuu",
    weaknesses: [
      "Ei INTERVENTIONAALISTA evidenssiä — ei RCT:tä joka osoittaa EMF-vähennys → terveyshyöty",
      "Ca²⁺:n universaalisuus luo väärän positiivisen riskin — osa 'konvergensseista' voi olla triviaaleja",
      "Katkeamattomassa ketjussa on 2 osittaista linkkiä (prenataalivaikutukset, epidemiologia)",
      "Väestötason epidemiologia on korrelatiivista, ei kausaalista",
      "Ei itsenäistä verifiointimenetelmää (vastaava kuin DNA-sekvensointi evoluutiolle)",
      "Teollisuuden rahoittamat tutkimukset eivät johdonmukaisesti löydä vaikutusta, luoden kiistanalaisen evidenssimaiseman",
    ],

    verdictTitle: "Episteeminen arvio",
    verdictText: "BERM on PROGRESSIIVINEN tutkimusohjelma Lakatoksen mielessä. Se ei ole todistettu teoria — se on generatiivinen mekanismi joka johdonmukaisesti tuottaa verifioituja ennusteita ylijäämäisellä empiirisellä sisällöllä. Mallin ensisijainen heikkous on interventionaalisen evidenssin puuttuminen. Sen ensisijainen vahvuus on monitasoinen konsilienss itsenäisten alojen yli. Seuraava ratkaiseva kokeilu on ETH:n nimodipiini-5G-tutkimus: jos Ca²⁺-salpaus estää EMF-vaikutukset, VGCC-mekanismi vahvistetaan interventionaalisella tasolla. Jos ei, malli romahtaa.",
    verdictCTA: "Ks. täydellinen verifiointiketju →",
    verdictHref: "/evidence/unbroken-chain",

    burdenTitle: "Todistustaakan muutos",
    burdenLead: "Kun 16 verifioitua välikerrosta muodostavat katkeamattoman ketjun fotonin absorptiosta väestötason terveysvaikutuksiin, todistustaakka muuttuu perustavanlaatuisesti.",
    burdenBefore: "Perinteinen kehystys: 'Todista, että EMF aiheuttaa sairautta.' Tämä vaatii yhtä lopullista tutkimusta — mahdottoman korkea rima 18 kertaluokkaa kattavalle monivaiheiselle kausaaliketjulle.",
    burdenAfter: "Uusi kehystys: 'Osoita missä ketju katkeaa.' Jokainen linkki on verifioitu itsenäisesti. Mallin kumoamiseksi on tunnistettava mikä spesifinen verifioitu linkki on väärässä — ja selitettävä miksi sitä tukeva evidenssi on virheellistä.",
    burdenSteps: [
      { step: "1. Fysiikka verifioitu", detail: "Lindgrenin χ-parametri, Tang 2024 S4-konformaatiomuutos — fotoni-proteiini-mekanismi vahvistettu" },
      { step: "2. Biokemia verifioitu", detail: "VGCC → Ca²⁺ → CaM → CaMKII → useita kaskadeja — perusbiokemiaa, oppikirjataso" },
      { step: "3. Farmakologia konvergoi", detail: "Jokainen tehokas hoito kohdistuu Ca²⁺-kaskadin komponenttiin — etosuksimidi, gabapentiini, verapamiili, melatoniini, litium, bumetanidi" },
      { step: "4. Genetiikka vahvistaa", detail: "CACNA1C-genotyyppi moduloi EMF-vastetta (Sousouri 2025 RCT). CaMKII-mutaatiot tuottavat BERM:n ennustamat fenotyypit (Küry 2017)" },
      { step: "5. Välikerrokset verifioitu", detail: "BBB, BAT, HPA-akseli, β-solu, hypotalamus, kortisoli-hippokampus, Leydig-solu, syöttösolu — jokainen itsenäisesti vahvistettu" },
      { step: "6. Epidemiologia konsistentti", detail: "54 maan R²=0,851, Klimentidis 8 lajia (p=10⁻⁷), Amish/mennoniittidata — konsistentti eri tutkimusasetelmissa" },
    ],
    burdenConclusion: "Ketju ei ole hypoteesi — se on verifioitu sekvenssi. Sen kumoaminen edellyttää spesifisen rikkoutuneen linkin tunnistamista, ei yhtä tutkimusta joka kattaa koko ketjun. Tämä on sama episteeminen standardi jonka sovellamme evoluutioteoriaan, laattatektoniikkaan ja bakteeriteoriaan.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function EpistemologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = locale === "fi" ? "fi" : "en";
  const d = COPY[activeLocale];
  const prefix = `/${locale}`;

  const colorMap: Record<string, { border: string; bg: string }> = {
    green: { border: "border-green-500/20", bg: "bg-green-500/5" },
    blue: { border: "border-blue-500/20", bg: "bg-blue-500/5" },
    amber: { border: "border-amber-500/20", bg: "bg-amber-500/5" },
  };

  const tierColors = [
    "border-red-500/20 bg-red-500/5",
    "border-amber-500/20 bg-amber-500/5",
    "border-yellow-500/20 bg-yellow-500/5",
    "border-blue-500/20 bg-blue-500/5",
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <PageHeader icon={Scale} title={d.title} subtitle={d.subtitle} />

      <div className="mt-8">
        <CautionBox locale={activeLocale}>
          <p>{d.cautionText}</p>
        </CautionBox>
      </div>

      {/* Lakatos criteria */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">{d.lakatosTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.lakatosLead}</p>
        <div className="space-y-3">
          {d.lakatosPoints.map((point, i) => (
            <div key={i} className="rounded-lg border border-card-border bg-card-bg p-4">
              <h3 className="font-semibold text-sm mb-1">{point.criterion}</h3>
              <p className="text-xs text-foreground-muted mb-2">{point.description}</p>
              <div className="rounded border border-green-500/20 bg-green-500/5 p-2.5">
                <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-0.5">BERM</p>
                <p className="text-sm text-foreground-muted leading-relaxed">{point.bermStatus}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consilience */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.consilienceTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.consilienceLead}</p>
        <div className="space-y-4">
          {d.consilienceLevels.map((cl, i) => {
            const colors = colorMap[cl.color];
            return (
              <div key={i} className={`rounded-lg border p-4 ${colors.border} ${colors.bg}`}>
                <h3 className="font-semibold text-sm mb-2">{cl.level}</h3>
                <ul className="space-y-1.5">
                  {cl.examples.map((ex, j) => (
                    <li key={j} className="text-sm text-foreground-muted leading-relaxed pl-3 border-l-2 border-card-border">{ex}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Falsification */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.falsificationTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.falsificationLead}</p>
        <div className="space-y-3">
          {d.falsificationTiers.map((tier, i) => (
            <div key={i} className={`rounded-lg border p-4 ${tierColors[i]}`}>
              <p className="text-sm font-semibold mb-3">{tier.level}</p>
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="rounded border border-card-border/60 bg-background p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
                    {activeLocale === "fi" ? "Testi" : "Test"}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{tier.test}</p>
                </div>
                <div className="rounded border border-card-border/60 bg-background p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
                    {activeLocale === "fi" ? "Seuraus" : "Consequence"}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{tier.consequence}</p>
                </div>
                <div className="rounded border border-card-border/60 bg-background p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
                    {activeLocale === "fi" ? "Vakavuus" : "Severity"}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{tier.severity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Evolution analogy */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.analogyTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.analogyLead}</p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left py-2 pr-4 font-medium text-foreground-muted text-xs uppercase tracking-wide">
                  {activeLocale === "fi" ? "Piirre" : "Feature"}
                </th>
                <th className="text-left py-2 pr-4 font-medium text-foreground-muted text-xs uppercase tracking-wide">BERM</th>
                <th className="text-left py-2 font-medium text-foreground-muted text-xs uppercase tracking-wide">
                  {activeLocale === "fi" ? "Evoluutioteoria" : "Evolution"}
                </th>
              </tr>
            </thead>
            <tbody>
              {d.analogyRows.map((row, i) => (
                <tr key={i} className="border-b border-card-border/50 last:border-0">
                  <td className="py-2.5 pr-4 text-foreground-muted font-medium">{row.feature}</td>
                  <td className="py-2.5 pr-4 text-foreground-muted">{row.berm}</td>
                  <td className="py-2.5 text-foreground-muted">{row.evolution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted font-medium">{d.analogyCritical}</p>
        </div>
      </section>

      {/* Strengths & weaknesses */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold mb-4">{d.strengthsTitle}</h2>
            <div className="space-y-2">
              {d.strengths.map((s, i) => (
                <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
                  <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                  <p>{s}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">{d.weaknessesTitle}</h2>
            <div className="space-y-2">
              {d.weaknesses.map((w, i) => (
                <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
                  <span className="text-red-500 shrink-0 mt-0.5">✗</span>
                  <p>{w}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verdict */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-4">{d.verdictTitle}</h2>
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-6">
          <p className="text-sm leading-relaxed text-foreground-muted mb-4">{d.verdictText}</p>
          <Link href={`${prefix}${d.verdictHref}`} className="text-sm text-accent hover:underline font-medium">
            {d.verdictCTA}
          </Link>
        </div>
      </section>

      {/* Burden of Proof */}
      <section className="mt-14 border-t editorial-rule pt-6">
        <h2 className="text-lg font-semibold mb-2">{d.burdenTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed mb-6 max-w-3xl">{d.burdenLead}</p>
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400 mb-2">
              {activeLocale === "fi" ? "Ennen" : "Before"}
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.burdenBefore}</p>
          </div>
          <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400 mb-2">
              {activeLocale === "fi" ? "Jälkeen" : "After"}
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">{d.burdenAfter}</p>
          </div>
        </div>
        <div className="space-y-2 mb-6">
          {d.burdenSteps.map((s, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="text-green-500 shrink-0 mt-0.5">✓</span>
              <div>
                <span className="font-semibold">{s.step}:</span> {s.detail}
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
          <p className="text-sm leading-relaxed text-foreground-muted">{d.burdenConclusion}</p>
        </div>
      </section>
    </div>
  );
}
