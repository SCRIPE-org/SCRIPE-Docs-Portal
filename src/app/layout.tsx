import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/engine/providers/ThemeProvider";
import { DocsI18nProvider } from "@/engine/presentation/providers/DocsI18nProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | SCRIPE Docs Portal",
    default:
      "SCRIPE Docs Portal — Technical Architecture & Commercial Operations",
  },
  description:
    "Comprehensive technical and commercial documentation for the SCRIPE Sports Operations OS (Venue, Academy, Football Intelligence).",
  icons: {
    icon: "/brand/favicon.ico",
    shortcut: "/brand/favicon.ico",
    apple: "/brand/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#050506",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased transition-colors duration-200 selection:bg-primary/20 selection:text-foreground">
        <ThemeProvider>
          <DocsI18nProvider scope="technical">{children}</DocsI18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
