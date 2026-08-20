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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavRoute {
  href: string;
  labelEn: string;
  labelFi: string;
  icon: LucideIcon;
}

export const NAV_ROUTES: NavRoute[] = [
  { href: "", labelEn: "Home", labelFi: "Etusivu", icon: House },
  { href: "/explore", labelEn: "Explore", labelFi: "Tutkija", icon: Map },
  { href: "/model", labelEn: "Model", labelFi: "Malli", icon: GitBranch },
  { href: "/evidence", labelEn: "Evidence", labelFi: "Näyttö", icon: Layers },
  { href: "/objections", labelEn: "Criticism", labelFi: "Kritiikki", icon: ShieldQuestion },
  { href: "/sentinel", labelEn: "Sentinel", labelFi: "Lajit", icon: Leaf },
  { href: "/ecology", labelEn: "Ecology", labelFi: "Ekologia", icon: Zap },
  { href: "/predictions", labelEn: "Predictions", labelFi: "Ennusteet", icon: Target },
  { href: "/about", labelEn: "About", labelFi: "Tietoa", icon: Info },
];

export function getNavRoutes(locale: string) {
  return NAV_ROUTES.map((route) => ({
    href: route.href,
    label: locale === "fi" ? route.labelFi : route.labelEn,
    icon: route.icon,
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
