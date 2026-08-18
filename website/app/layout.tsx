import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Extinction Field - BERM Model",
  description:
    "A falsifiable model linking electromagnetic field exposure to global fertility decline. Locked predictions, open data, epistemic humility.",
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
