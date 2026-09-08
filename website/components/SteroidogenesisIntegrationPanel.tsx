import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StudyCitation } from "@/components/StudyCitation";
import { pickCopy } from "@/lib/i18n";

export type SteroidogenesisFocus = "overview" | "hormones" | "clock" | "reserve" | "interventions" | "behavior";

const COPY = {
  en: {
    label: "Calcium · redox · hormone production",
    link: "Explore the shared mechanism and its studies",
    reserveLink: "How a reserve change can remain hidden in a proxy",
    overview: { title: "One receiving state, several routes to hormone production", text: "Calcium signalling, redox reserve and cellular maintenance meet at cholesterol supply and StAR-mediated mitochondrial transport. BERM connects field experiments and component interventions through these measured biological stages. Local hormone production then joins the existing hormone-availability and tissue-response pathway.", note: "The direct CaMKI–NUR77–StAR branch and the RORα–BMAL1 clock branch converge on steroidogenesis while retaining their own evidence." },
    hormones: { title: "Locate the hormone-production bottleneck", text: "Qin’s Leydig-cell field experiments connect calcium-related signalling, redox and testosterone. Component studies locate the next steps: CaMKI cooperates with NUR77 to regulate StAR, and a cholesterol analogue can bypass a transport defect. Autophagy also supplies the cholesterol needed for normal steroid production.", note: "Hormone production, blood concentration, receptor response and reproductive success remain distinct observations along this route." },
    clock: { title: "Calcium and the local clock converge on steroidogenesis", text: "CaMKI–NUR77 regulates StAR transcription. A separate connection runs through RORα–BMAL1 and steroidogenic gene regulation. These branches join the same production system, allowing calcium and clock state to influence local hormone capacity.", note: "CaMKI and CaMKII are different kinases. A single clock-gene expression measurement describes expression; a rhythm requires measurements across time." },
    reserve: { title: "Present output and reserve are different measurements", text: "A Leydig-cell experiment measured reduced glutathione pools under continuous RF exposure. In a separate Leydig-cell system, LH-stimulated progesterone production was preserved after experimental glutathione depletion until an additional oxidative challenge exposed reduced capacity. BERM joins these findings through the measured reserve, with each cell system retained.", note: "Absolute GSH and GSSG, their ratio, current ROS and accumulated damage describe different parts of the state. An unchanged hormone measurement alone does not identify the reserve." },
    interventions: { title: "Genes and bypasses locate the same biological stages", text: "STAR mutations locate mitochondrial cholesterol transport in human steroidogenesis. RYR2-related CPVT experiments connect calcium-store leak to impaired stimulated calcium, energy and insulin responses. Darier disease connects SERCA2 dysfunction to glutathione reserve and stress adaptation.", note: "These component interventions constrain shared biological transitions. Their disease effects retain their own experimental scope when connected to field studies." },
    behavior: { title: "Production capacity continues into motivation and action", text: "Autophagy links cellular maintenance to cholesterol availability and steroid production, including in human ovarian and testicular tissue. A randomized testosterone trial in older men with low testosterone and low desire connects hormone intervention to sexual activity and desire.", note: "BERM carries hormone production through tissue response, motivation, opportunities and reproductive function. The trial’s age and hormone context stay attached to its finding." },
  },
  fi: {
    label: "Kalsium · redox · hormonituotanto",
    link: "Tutki yhteistä mekanismia ja sen tutkimuksia",
    reserveLink: "Miten varannon muutos voi jäädä proksin taakse",
    overview: { title: "Yksi vastaanottava tila, useita reittejä hormonituotantoon", text: "Kalsiumsignalointi, redox-varanto ja solun ylläpito kohtaavat kolesterolihuollossa ja StAR:n välittämässä mitokondriokuljetuksessa. BERM yhdistää kenttäkokeet ja komponentti-interventiot näiden mitattujen biologisten vaiheiden kautta. Paikallinen hormonituotanto liittyy edelleen nykyiseen hormonin saatavuuden ja kudosvasteen ketjuun.", note: "Suora CaMKI–NUR77–StAR-haara ja RORα–BMAL1-kellohaara yhtyvät steroidogeneesiin kumpikin oman näyttönsä kautta." },
    hormones: { title: "Paikanna hormonituotannon pullonkaula", text: "Qinin Leydig-solujen kenttäkokeet yhdistävät kalsiumiin liittyvän signaloinnin, redox-tilan ja testosteronin. Komponenttikokeet paikantavat seuraavat vaiheet: CaMKI säätelee StAR:ia yhteistyössä NUR77:n kanssa, ja kolesterolianalogi voi ohittaa kuljetuspuutteen. Autofagia osallistuu myös normaalin steroidituotannon kolesterolihuoltoon.", note: "Hormonituotanto, veren pitoisuus, reseptorivaste ja lisääntymisen onnistuminen ovat tämän reitin erillisiä havaintoja." },
    clock: { title: "Kalsium ja paikallinen kello yhtyvät steroidogeneesiin", text: "CaMKI–NUR77 säätelee StAR-transkriptiota. Erillinen yhteys kulkee RORα–BMAL1:n ja steroidigeenien säätelyn kautta. Haarat liittyvät samaan tuotantojärjestelmään, jolloin kalsium ja kellotila voivat vaikuttaa paikalliseen hormonikapasiteettiin.", note: "CaMKI ja CaMKII ovat eri kinaaseja. Yksittäinen kellogeenin mittaus kuvaa ilmentymistä; rytmi tarvitsee mittauksia ajan yli." },
    reserve: { title: "Nykyinen tuotanto ja varanto ovat eri mittauksia", text: "Leydig-solujen kokeessa mitattiin pienentyneitä glutationipooleja jatkuvassa RF-altistuksessa. Toisessa Leydig-solujärjestelmässä LH-stimuloitu progesteronituotanto säilyi kokeellisen glutationivajeen jälkeen, kunnes lisäoksidanttihaaste paljasti heikentyneen kapasiteetin. BERM yhdistää havainnot mitatun varannon kautta ja säilyttää kummankin solujärjestelmän.", note: "Absoluuttiset GSH ja GSSG, niiden suhde, hetkellinen ROS ja kertynyt vaurio kuvaavat tilan eri osia. Säilynyt hormonimittaus yksin ei määritä varantoa." },
    interventions: { title: "Geenit ja ohitukset paikantavat samat biologiset vaiheet", text: "STAR-mutaatiot paikantavat mitokondrion kolesterolikuljetuksen ihmisen steroidogeneesiin. RYR2:een liittyvät CPVT-kokeet yhdistävät kalsiumvaraston vuodon heikentyneeseen stimuloituun kalsium-, energia- ja insuliinivasteeseen. Darierin tauti yhdistää SERCA2-häiriön glutationivarannon ja stressiin sopeutumisen muutoksiin.", note: "Komponentti-interventiot rajaavat yhteisiä biologisia siirtymiä. Sairausvaikutukset säilyttävät oman koealansa, kun niitä yhdistetään kenttätutkimuksiin." },
    behavior: { title: "Tuotantokapasiteetti jatkuu motivaatioon ja toimintaan", text: "Autofagia yhdistää solun ylläpidon kolesterolin saatavuuteen ja steroidituotantoon myös ihmisen munasarja- ja kiveskudoksessa. Satunnaistettu testosteronikoe iäkkäillä miehillä, joilla oli matala testosteroni ja vähäinen halu, yhdistää hormonintervention seksuaaliseen aktiivisuuteen ja haluun.", note: "BERM kuljettaa hormonituotannon kudosvasteen, motivaation, mahdollisuuksien ja lisääntymistoiminnan kautta. Kokeen ikä- ja hormonitilanne säilyvät tuloksen yhteydessä." },
  },
  ja: {
    label: "カルシウム · 酸化還元 · ホルモン産生", link: "共通機構と研究を調べる", reserveLink: "予備能の変化が代理指標に隠れる仕組み",
    overview: { title: "一つの受容状態からホルモン産生へ至る複数の経路", text: "カルシウム信号、酸化還元予備能、細胞維持は、コレステロール供給とStARを介するミトコンドリア輸送で合流します。BERMは測定された生物学的段階を通じて、電磁場実験と構成要素への介入を結びます。局所的な産生はホルモン利用可能性と組織応答につながります。", note: "CaMKI–NUR77–StAR経路とRORα–BMAL1時計経路は、それぞれの証拠を保ちながらステロイド産生へ合流します。" },
    hormones: { title: "ホルモン産生の律速段階を特定する", text: "Qinのライディッヒ細胞実験は電磁場条件下のカルシウム関連信号、酸化還元、テストステロンを結びます。構成要素実験はCaMKIとNUR77によるStAR制御、コレステロール類似体による輸送障害の迂回、オートファジーによる基質供給を特定します。", note: "産生量、血中濃度、受容体応答、生殖の成功は異なる観測です。" },
    clock: { title: "カルシウムと局所時計がステロイド産生で合流する", text: "CaMKI–NUR77はStAR転写を制御します。別の経路はRORα–BMAL1とステロイド産生遺伝子の制御を通ります。両経路は同じ産生系につながり、カルシウムと時計状態が局所的なホルモン産生能力に影響し得ます。", note: "CaMKIとCaMKIIは別のキナーゼです。単一時点の遺伝子測定は発現を示し、リズムの確認には時系列が必要です。" },
    reserve: { title: "現在の産生と予備能は別の測定", text: "ライディッヒ細胞の実験は連続RF曝露下でグルタチオン量の減少を測定しました。別の細胞系では、グルタチオンを減らしてもLH刺激によるプロゲステロン産生は維持され、追加の酸化負荷で能力低下が現れました。BERMは各細胞系の条件を保ち、測定された予備能を通じて両者を結びます。", note: "GSHとGSSGの絶対量、その比、現在のROS、蓄積損傷は異なる状態です。ホルモン値の維持だけでは予備能を特定できません。" },
    interventions: { title: "遺伝子と迂回実験が共通段階を特定する", text: "STAR変異はヒトのステロイド産生におけるミトコンドリアへのコレステロール輸送を特定します。RYR2関連CPVT研究はカルシウム貯蔵の漏出と刺激時のカルシウム、エネルギー、インスリン応答を結びます。Darier病はSERCA2障害とグルタチオン予備能、ストレス適応を結びます。", note: "これらは生物学的構成要素を調べる介入です。電磁場研究と結ぶ際も疾患研究固有の範囲を保ちます。" },
    behavior: { title: "産生能力から動機と行動へ", text: "オートファジーはヒトの卵巣・精巣組織でも細胞維持とコレステロール供給、ステロイド産生を結びます。低テストステロンと低い性欲を持つ高齢男性の無作為化試験は、ホルモン介入と性的活動・欲求を結びます。", note: "BERMは産生から組織応答、動機、機会、生殖機能へ進みます。年齢とホルモン状態は試験結果の条件として保たれます。" },
  },
  fr: {
    label: "Calcium · redox · production hormonale", link: "Explorer le mécanisme commun et les études", reserveLink: "Comment une réserve modifiée peut rester masquée par un proxy",
    overview: { title: "Un état récepteur, plusieurs voies vers la production hormonale", text: "La signalisation calcique, la réserve redox et l’entretien cellulaire convergent vers l’approvisionnement en cholestérol et son transport mitochondrial par StAR. BERM relie les expériences de champ aux interventions sur les composants par ces étapes mesurées. La production locale rejoint ensuite la disponibilité hormonale et la réponse tissulaire.", note: "La branche CaMKI–NUR77–StAR et la branche d’horloge RORα–BMAL1 convergent vers la stéroïdogenèse en conservant leurs preuves respectives." },
    hormones: { title: "Localiser le goulot de la production hormonale", text: "Les expériences de Qin sur cellules de Leydig relient protocole RF, signalisation calcique, redox et testostérone. Les interventions localisent les étapes suivantes : coopération de CaMKI et NUR77 dans la régulation de StAR, contournement du transport par un analogue du cholestérol et approvisionnement assuré par l’autophagie.", note: "Production hormonale, concentration sanguine, réponse du récepteur et réussite reproductive restent des observations distinctes." },
    clock: { title: "Le calcium et l’horloge locale convergent vers la stéroïdogenèse", text: "CaMKI–NUR77 régule la transcription de StAR. Une autre connexion passe par RORα–BMAL1 et les gènes stéroïdogènes. Ces branches rejoignent le même système de production, reliant calcium et état de l’horloge à la capacité hormonale locale.", note: "CaMKI et CaMKII sont deux kinases distinctes. Une mesure ponctuelle renseigne sur l’expression ; un rythme nécessite une série temporelle." },
    reserve: { title: "Production actuelle et réserve sont deux mesures", text: "Une expérience sur cellules de Leydig a mesuré des pools de glutathion réduits sous exposition RF continue. Dans un autre système, la production de progestérone stimulée par la LH restait préservée après déplétion expérimentale du glutathion, jusqu’à ce qu’une charge oxydante supplémentaire révèle une capacité réduite. BERM relie ces résultats par la réserve mesurée, en conservant chaque système cellulaire.", note: "GSH et GSSG absolus, leur rapport, les ROS actuels et les lésions accumulées décrivent différents états. Une mesure hormonale inchangée ne suffit pas à identifier la réserve." },
    interventions: { title: "Gènes et contournements localisent les mêmes étapes", text: "Les mutations STAR identifient le transport mitochondrial du cholestérol dans la stéroïdogenèse humaine. Les études de CPVT liées à RYR2 relient fuite calcique et réponses stimulées du calcium, de l’énergie et de l’insuline. La maladie de Darier relie SERCA2, réserve de glutathion et adaptation au stress.", note: "Ces interventions contraignent des transitions biologiques communes. Leur portée propre est conservée lorsqu’elles sont reliées aux études de champ." },
    behavior: { title: "La capacité de production se prolonge dans la motivation et l’action", text: "L’autophagie relie entretien cellulaire, disponibilité du cholestérol et stéroïdogenèse, y compris dans les tissus ovariens et testiculaires humains. Un essai randomisé chez des hommes âgés ayant une testostérone et un désir faibles relie l’intervention hormonale à l’activité sexuelle et au désir.", note: "BERM suit la production à travers la réponse tissulaire, la motivation, les possibilités et la fonction reproductive. L’âge et l’état hormonal restent attachés au résultat de l’essai." },
  },
  ko: {
    label: "칼슘 · 산화환원 · 호르몬 생산", link: "공통 기전과 연구 살펴보기", reserveLink: "예비능 변화가 대리 지표에 가려지는 방식",
    overview: { title: "하나의 수용 상태에서 호르몬 생산으로 이어지는 여러 경로", text: "칼슘 신호, 산화환원 예비능, 세포 유지는 콜레스테롤 공급과 StAR 매개 미토콘드리아 수송에서 만납니다. BERM은 측정된 생물학적 단계를 통해 전자기장 실험과 구성 요소 개입을 연결합니다. 국소 호르몬 생산은 호르몬 가용성과 조직 반응으로 이어집니다.", note: "CaMKI–NUR77–StAR 경로와 RORα–BMAL1 시계 경로는 각각의 증거를 유지하며 스테로이드 생성에 합류합니다." },
    hormones: { title: "호르몬 생산의 병목을 찾기", text: "Qin의 라이디히 세포 실험은 RF 조건에서 칼슘 관련 신호, 산화환원, 테스토스테론을 연결합니다. 구성 요소 실험은 CaMKI와 NUR77의 StAR 조절, 콜레스테롤 유사체를 통한 수송 장애 우회, 자가포식에 의한 기질 공급을 밝힙니다.", note: "호르몬 생산, 혈중 농도, 수용체 반응, 생식 성공은 서로 다른 관측입니다." },
    clock: { title: "칼슘과 국소 시계가 스테로이드 생성에서 합류", text: "CaMKI–NUR77은 StAR 전사를 조절합니다. 별도 연결은 RORα–BMAL1과 스테로이드 생성 유전자 조절을 통과합니다. 두 경로는 같은 생산 체계에 연결되어 칼슘과 시계 상태가 국소 호르몬 생산 능력에 영향을 줄 수 있게 합니다.", note: "CaMKI와 CaMKII는 다른 효소입니다. 한 시점의 유전자 측정은 발현을 나타내며, 리듬 확인에는 시계열이 필요합니다." },
    reserve: { title: "현재 생산과 예비능은 서로 다른 측정", text: "라이디히 세포 실험은 연속 RF 노출에서 감소한 글루타티온 풀을 측정했습니다. 다른 세포계에서는 실험적 글루타티온 고갈 후에도 LH 자극 프로게스테론 생산이 유지되다가 추가 산화 부하에서 능력 저하가 드러났습니다. BERM은 각 세포계의 조건을 보존하며 측정된 예비능을 통해 결과를 연결합니다.", note: "GSH와 GSSG의 절대량, 그 비율, 현재 ROS, 축적 손상은 다른 상태입니다. 변하지 않은 호르몬 값만으로 예비능을 식별할 수 없습니다." },
    interventions: { title: "유전자와 우회 실험으로 공통 단계 찾기", text: "STAR 변이는 인간 스테로이드 생성에서 미토콘드리아 콜레스테롤 수송을 확인합니다. RYR2 관련 CPVT 연구는 칼슘 저장고 누출과 자극 시 칼슘·에너지·인슐린 반응 저하를 연결합니다. 다리에병은 SERCA2 기능 이상을 글루타티온 예비능 및 스트레스 적응과 연결합니다.", note: "이 개입들은 공통 생물학적 전이를 제한합니다. 전자기장 연구와 연결할 때도 질환 연구 고유의 범위를 유지합니다." },
    behavior: { title: "생산 능력에서 동기와 행동으로", text: "자가포식은 인간 난소와 고환 조직에서도 세포 유지, 콜레스테롤 가용성, 스테로이드 생성을 연결합니다. 테스토스테론과 성욕이 낮은 고령 남성의 무작위 시험은 호르몬 개입을 성적 활동 및 욕구와 연결합니다.", note: "BERM은 생산에서 조직 반응, 동기, 기회, 생식 기능으로 이어집니다. 나이와 호르몬 상태는 시험 결과의 조건으로 유지됩니다." },
  },
} as const;

const REFERENCES: Record<SteroidogenesisFocus, string[]> = {
  overview: ["qin2018_camki_rora", "martin2008_camki_nur77", "gao2018_autophagy"],
  hormones: ["qin2019_ceo2_leydig", "martin2008_camki_nur77", "esmaeilian2023_autophagy"],
  clock: ["martin2008_camki_nur77", "akashi2005_rora_bmal1"],
  reserve: ["miao2025_rf_metabolomics", "chen2010_glutathione"],
  interventions: ["lin1995_star", "santulli2015_ryr2", "harmon2026_darier"],
  behavior: ["esmaeilian2023_autophagy", "cunningham2016_testosterone_sexual_function"],
};

const ANCHORS: Record<SteroidogenesisFocus, string> = { overview: "convergence", hormones: "convergence", clock: "convergence", reserve: "redox-reserve", interventions: "study-explorer", behavior: "organism-output" };

export function SteroidogenesisIntegrationPanel({ locale, focus = "overview" }: { locale: string; focus?: SteroidogenesisFocus }) {
  const d = pickCopy(COPY, locale);
  const c = d[focus];
  return <section id={`steroidogenesis-${focus}`} className="my-8 min-w-0 scroll-mt-28 rounded-xl border border-accent/25 bg-accent/5 p-5 sm:p-7">
    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">{d.label}</p>
    <h3 className="mb-4 font-serif text-xl leading-snug sm:text-2xl">{c.title}</h3>
    <p className="text-base leading-7">{c.text}</p>
    <p className="mt-3 text-sm leading-6 text-foreground-muted">{c.note}</p>
    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">{REFERENCES[focus].map(referenceId => <StudyCitation key={referenceId} referenceId={referenceId} locale={locale} />)}</div>
    <Link href={`/${locale}/biology/calcium-redox-steroidogenesis#${ANCHORS[focus]}`} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent hover:underline">{d.link}<ArrowRight size={15} aria-hidden="true" /></Link>
    {focus === "reserve" && <Link href={`/${locale}/model/proxy-masking#redox-reserve-masking`} className="mt-2 block text-sm text-accent hover:underline">{d.reserveLink} →</Link>}
  </section>;
}
