import Link from "next/link";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  fi: {
    title: "Kalsium, redox ja hormonituotanto",
    description: "Tutkimusluettelo yhdistää mitatut tilat, koeolosuhteet ja tutkimusperheet. Kenttäkokeet, komponenttikokeet ja BERM:n synteesi on erotettu. Aineisto kuvaa mekanismien rakennetta ja vaikutussuuntia; numeerinen siirto väestöennusteisiin edellyttää erillistä kalibrointia.",
    explore: "Tutki mekanismia ja näyttöä",
    download: "Tutkimusluettelo ja mallirakenne (JSON)",
  },
  en: {
    title: "Calcium, redox and hormone production",
    description: "The research catalogue connects measured states, experimental conditions and research families. Field experiments, component experiments and BERM synthesis are distinguished. The data describe mechanism structure and response directions; numerical transfer to population forecasts requires separate calibration.",
    explore: "Explore the mechanism and evidence",
    download: "Research catalogue and model structure (JSON)",
  },
  ja: {
    title: "カルシウム、酸化還元とホルモン産生",
    description: "研究カタログは測定状態、実験条件、研究グループを結び付けます。電磁場曝露実験、機構の要素実験、BERMの統合推論を区別しています。データは機構の構造と応答方向を記述し、人口予測への数値的な適用には別途校正が必要です。",
    explore: "機構と証拠を調べる",
    download: "研究カタログとモデル構造（JSON）",
  },
  fr: {
    title: "Calcium, état redox et production hormonale",
    description: "Le catalogue relie les états mesurés, les conditions expérimentales et les familles de recherche. Il distingue les expériences d’exposition aux champs, les expériences sur les composants et la synthèse BERM. Les données décrivent la structure des mécanismes et le sens des réponses ; leur transfert numérique aux prévisions démographiques exige une calibration distincte.",
    explore: "Explorer le mécanisme et les preuves",
    download: "Catalogue des études et structure du modèle (JSON)",
  },
  ko: {
    title: "칼슘, 산화환원과 호르몬 생산",
    description: "연구 목록은 측정된 상태, 실험 조건 및 연구 계열을 연결합니다. 전자기장 노출 실험, 기전 구성요소 실험 및 BERM 종합 추론을 구분합니다. 데이터는 기전의 구조와 반응 방향을 설명하며, 인구 예측에 수치적으로 적용하려면 별도의 보정이 필요합니다.",
    explore: "기전과 증거 살펴보기",
    download: "연구 목록과 모델 구조 (JSON)",
  },
} as const;

export function SteroidogenesisDataAccess({ locale }: { locale: string }) {
  const c = pickCopy(COPY, locale);
  return (
    <section id="steroidogenesis-data" className="mt-10 space-y-3 rounded-xl border border-card-border p-5 sm:p-6">
      <h2 className="font-serif text-xl">{c.title}</h2>
      <p className="text-sm leading-7 text-foreground-muted">{c.description}</p>
      <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-accent">
        <Link href={`/${locale}/biology/calcium-redox-steroidogenesis`} className="hover:underline">{c.explore} →</Link>
        <a href="/data/steroidogenesis.json" download className="hover:underline">{c.download} ↓</a>
      </div>
    </section>
  );
}
