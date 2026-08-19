import type { Metadata } from "next";
import "./globals.css";

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
    <html suppressHydrationWarning className="h-full antialiased">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
