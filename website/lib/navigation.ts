import {
  House,
  Map,
  GitBranch,
  Layers,
  Leaf,
  Target,
  Info,
  ChartLine,
  Database,
  Globe2,
  Zap,
  ShieldQuestion,
  BookOpen,
  Radio,
  Sigma,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavRoute {
  href: string;
  labelEn: string;
  labelFi: string;
  icon: LucideIcon;
  children?: NavRoute[];
}

export const NAV_ROUTES: NavRoute[] = [
  { href: "", labelEn: "Home", labelFi: "Etusivu", icon: House },
  { href: "/explore", labelEn: "Explore", labelFi: "Tutkija", icon: Map },
  {
    href: "/model",
    labelEn: "Model",
    labelFi: "Malli",
    icon: GitBranch,
    children: [
      { href: "/model", labelEn: "Overview", labelFi: "Yleiskatsaus", icon: GitBranch },
      { href: "/model/fieldstate", labelEn: "FieldState", labelFi: "FieldState", icon: Radio },
      { href: "/model/math", labelEn: "Mathematics", labelFi: "Matematiikka", icon: Sigma },
    ],
  },
  { href: "/evidence", labelEn: "Evidence", labelFi: "Näyttö", icon: Layers },
  { href: "/objections", labelEn: "Criticism", labelFi: "Kritiikki", icon: ShieldQuestion },
  { href: "/sentinel", labelEn: "Sentinel", labelFi: "Lajit", icon: Leaf },
  { href: "/ecology", labelEn: "Ecology", labelFi: "Ekologia", icon: Zap },
  { href: "/predictions", labelEn: "Predictions", labelFi: "Ennusteet", icon: Target },
  { href: "/references", labelEn: "Sources", labelFi: "Lähteet", icon: BookOpen },
  { href: "/about", labelEn: "About", labelFi: "Tietoa", icon: Info },
];

export interface ResolvedNavRoute {
  href: string;
  label: string;
  icon: LucideIcon;
  children?: ResolvedNavRoute[];
}

export function getNavRoutes(locale: string): ResolvedNavRoute[] {
  return NAV_ROUTES.map((route) => ({
    href: route.href,
    label: locale === "fi" ? route.labelFi : route.labelEn,
    icon: route.icon,
    children: route.children?.map((child) => ({
      href: child.href,
      label: locale === "fi" ? child.labelFi : child.labelEn,
      icon: child.icon,
    })),
  }));
}

export interface ExploreTab {
  key: "map" | "country" | "global" | "sentinel" | "data";
  labelEn: string;
  labelFi: string;
  icon: LucideIcon;
}

export const EXPLORE_TABS: ExploreTab[] = [
  { key: "map", labelEn: "Map", labelFi: "Kartta", icon: Map },
  { key: "country", labelEn: "Country", labelFi: "Maa", icon: ChartLine },
  { key: "global", labelEn: "Global", labelFi: "Globaali", icon: Globe2 },
  { key: "sentinel", labelEn: "Sentinel", labelFi: "Indikaattorit", icon: Leaf },
  { key: "data", labelEn: "Data", labelFi: "Data", icon: Database },
];

export function getExploreTabs(locale: string) {
  return EXPLORE_TABS.map((tab) => ({
    key: tab.key,
    label: locale === "fi" ? tab.labelFi : tab.labelEn,
    icon: tab.icon,
  }));
}

export function getRouteIcon(href: string): LucideIcon | undefined {
  return NAV_ROUTES.find((r) => r.href === href)?.icon;
}
