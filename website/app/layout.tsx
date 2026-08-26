import type { Metadata } from "next";
import { Inter, Source_Serif_4, Noto_Sans_JP, Noto_Sans_KR } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const interFont = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-interface-loaded",
});

const serifFont = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "600", "700"],
  variable: "--font-editorial-loaded",
});

const notoJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-cjk-ja",
});

const notoKR = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-cjk-ko",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://extinctionfield.com"),
  title: "Extinction Field – BERM v17 research model",
  description:
    "A measurement-aware research model for testing field-state, reproductive-endpoint and age-specific fertility hypotheses.",
  openGraph: {
    type: "website",
    siteName: "BERM — Bio-Electromagnetic Response Model",
    locale: "en_US",
    alternateLocale: ["fi_FI", "ja_JP", "fr_FR", "ko_KR"],
  },
  twitter: {
    card: "summary",
  },
};

const initScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t)}}catch(e){};var p=location.pathname.split('/')[1];var m={'fi':'fi','ja':'ja','fr':'fr','ko':'ko'};document.documentElement.lang=m[p]||'en'})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`h-full antialiased font-sans ${interFont.variable} ${serifFont.variable} ${notoJP.variable} ${notoKR.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
