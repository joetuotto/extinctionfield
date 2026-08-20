import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const interFont = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-interface-loaded",
});

const serifFont = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
  variable: "--font-editorial-loaded",
});

export const metadata: Metadata = {
  title: "Extinction Field – FieldState–ASFR research model",
  description:
    "A measurement-aware research model for testing field-state, reproductive-endpoint and age-specific fertility hypotheses.",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`h-full antialiased font-sans ${interFont.variable} ${serifFont.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
