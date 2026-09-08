import { pickCopy } from "@/lib/i18n";
import { hasSteroidogenesisTranslationFallback } from "@/lib/steroidogenesis";

const COPY = {
  en: { studies: "Study descriptions awaiting translation appear in English. The interface is translated.", dataResources: "Data resource descriptions awaiting translation appear in English." },
  fi: { studies: "Käännöstä odottavat tutkimuskohtaiset kuvaukset näkyvät toistaiseksi englanniksi. Käyttöliittymä on suomennettu.", dataResources: "Käännöstä odottavat aineistokuvaukset näkyvät toistaiseksi englanniksi." },
  ja: { studies: "研究ごとの説明など、未翻訳の研究内容は現在英語で表示されます。操作画面は日本語に翻訳されています。", dataResources: "未翻訳のデータ資料の説明は現在英語で表示されます。" },
  fr: { studies: "Les descriptions d’études en attente de traduction sont affichées en anglais. L’interface est traduite en français.", dataResources: "Les descriptions des ressources en attente de traduction sont affichées en anglais." },
  ko: { studies: "아직 번역되지 않은 연구별 설명은 현재 영어로 표시됩니다. 인터페이스는 한국어로 번역되어 있습니다.", dataResources: "아직 번역되지 않은 데이터 자료 설명은 현재 영어로 표시됩니다." },
} as const;

export function SteroidogenesisTranslationNotice({ locale, section = "studies" }: { locale: string; section?: "studies" | "dataResources" }) {
  if (!hasSteroidogenesisTranslationFallback(locale, section)) return null;
  const d = pickCopy(COPY, locale);
  return <p role="note" className="border-l-2 border-amber-500/50 pl-3 text-sm leading-6 text-foreground-muted">{d[section]}</p>;
}
