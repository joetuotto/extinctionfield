import type { Metadata } from "next";
import { ExplorerDashboard } from "@/components/ExplorerDashboard";
import { WorldMap } from "@/components/WorldMap";
import { pickCopy } from "@/lib/i18n";

const t = {
  en: {
    title: "Country series explorer",
    subtitle:
      "Published TFR series and technology-adoption timing can be compared across countries with their source scope kept visible.",
    method: "How to read this page",
    a: "A published TFR series is a period demographic measure. It cannot by itself identify a biological mechanism.",
    b: "Mobile subscription density is a composite proxy for the overall electromagnetic environment — it tracks the deployment of base stations, Wi-Fi, IoT and indoor electronics, not RF exposure alone.",
    c: "A v2 country estimate requires measured FieldState inputs, organ/couple endpoints, and ASFR calibration. Those inputs are not yet available as a national panel.",
    metaDesc: "Published TFR series, technology-adoption timing and source interpretation scope.",
  },
  fi: {
    title: "Maasarjojen tutkija",
    subtitle:
      "Julkaistuja TFR-sarjoja ja teknologiakäyttöönoton ajoitusta voi vertailla maittain siten, että lähteiden tulkintarajat säilyvät näkyvissä.",
    method: "Näin sivua luetaan",
    a: "Julkaistu TFR-sarja on periodinen demografinen mittari. Se ei yksinään tunnista biologista mekanismia.",
    b: "Mobiililiittymätiheys on yhdistelmäproksi koko sähkömagneettiselle ympäristölle — se seuraa tukiasemien, Wi-Fin, IoT:n ja sisätilaelektroniikan käyttöönottoa, ei pelkkää RF-altistusta.",
    c: "V2-maa-arvio vaatii mitatut FieldState-syötteet, elin-/paritason päätepisteet ja ASFR-kalibroinnin. Näitä syötteitä ei vielä ole kansallisena paneelina.",
    metaDesc: "Julkaistut TFR-sarjat, teknologiakäyttöönoton ajoitus ja lähteiden tulkintarajat.",
  },
  ja: {
    title: "国別系列エクスプローラー",
    subtitle:
      "公表されたTFR系列と技術普及のタイミングを、ソースの解釈範囲を表示したまま国間で比較できます。",
    method: "このページの読み方",
    a: "公表されたTFR系列は期間人口統計指標です。それだけでは生物学的メカニズムを特定できません。",
    b: "携帯電話契約密度は、電磁環境全体の複合プロキシです。基地局、Wi-Fi、IoT、屋内電子機器の展開を追跡するもので、RF曝露だけではありません。",
    c: "v2国推定値には、測定されたFieldState入力、臓器/カップルのエンドポイント、ASFR較正が必要です。これらの入力はまだ国家パネルとして利用できません。",
    metaDesc: "公表されたTFR系列、技術普及のタイミング、ソースの解釈範囲。",
  },
  fr: {
    title: "Explorateur de séries nationales",
    subtitle:
      "Les séries TFR publiées et le calendrier d'adoption technologique peuvent être comparés entre pays, avec la portée d'interprétation des sources maintenue visible.",
    method: "Comment lire cette page",
    a: "Une série TFR publiée est une mesure démographique de période. Elle ne peut pas, à elle seule, identifier un mécanisme biologique.",
    b: "La densité d'abonnements mobiles est un proxy composite de l'environnement électromagnétique global — elle suit le déploiement des stations de base, du Wi-Fi, de l'IoT et de l'électronique intérieure, pas seulement l'exposition RF.",
    c: "Une estimation nationale v2 nécessite des entrées FieldState mesurées, des endpoints organe/couple et un calibrage ASFR. Ces entrées ne sont pas encore disponibles sous forme de panel national.",
    metaDesc: "Séries TFR publiées, calendrier d'adoption technologique et portée d'interprétation des sources.",
  },
  ko: {
    title: "국가 시계열 탐색기",
    subtitle:
      "공표된 TFR 시계열과 기술 도입 시기를 출처의 해석 범위를 유지하며 국가 간 비교할 수 있습니다.",
    method: "이 페이지 읽는 방법",
    a: "공표된 TFR 시계열은 기간 인구통계 지표입니다. 그것만으로는 생물학적 메커니즘을 식별할 수 없습니다.",
    b: "이동통신 가입 밀도는 전체 전자기 환경의 복합 프록시입니다. 기지국, Wi-Fi, IoT 및 실내 전자기기의 배치를 추적하며, RF 노출만을 나타내지 않습니다.",
    c: "v2 국가 추정치에는 측정된 FieldState 입력, 장기/커플 엔드포인트 및 ASFR 보정이 필요합니다. 이러한 입력은 아직 국가 패널로 이용할 수 없습니다.",
    metaDesc: "공표된 TFR 시계열, 기술 도입 시기 및 출처 해석 범위.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = pickCopy(t, locale);
  return {
    title: `${d.title} - Extinction Field`,
    description: d.metaDesc,
  };
}

export default async function ExplorerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(t, locale);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">{d.title}</h1>
      <p className="mb-8 max-w-4xl leading-relaxed text-foreground-muted">{d.subtitle}</p>

      <ExplorerDashboard locale={locale} />

      <section className="mt-10 rounded-xl border border-card-border bg-card-bg p-4 sm:p-6">
        <WorldMap locale={locale} />
      </section>

      <div className="mt-12 rounded-lg border border-card-border bg-card-bg p-4 text-sm text-foreground-muted">
        <p className="mb-2 font-semibold text-foreground">{d.method}</p>
        <ul className="space-y-2 leading-relaxed">
          <li>{d.a}</li>
          <li>{d.b}</li>
          <li>{d.c}</li>
        </ul>
      </div>
    </main>
  );
}
