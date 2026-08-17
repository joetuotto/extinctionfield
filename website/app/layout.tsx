import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "./navigation";

export const metadata: Metadata = {
  title: "Extinction Field - BERM Model",
  description:
    "A falsifiable model linking electromagnetic field exposure to global fertility decline. Locked predictions, open data, epistemic humility.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navigation />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border py-8 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-sm text-foreground-muted leading-relaxed">
              BERM is a falsifiable model. It makes specific, locked predictions
              that will either come true or not. The model contains explicit
              refutation conditions.
            </p>
            <p className="text-xs text-foreground-muted mt-4">
              Code: MIT License. Documentation: CC BY-4.0.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
