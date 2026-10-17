import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/engine/providers/ThemeProvider";
import { DocsI18nProvider } from "@/engine/presentation/providers/DocsI18nProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | SCRIPE Docs Portal",
    default: "SCRIPE Docs Portal — Technical Architecture & Commercial Operations",
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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#050506] text-[#f7f8f5] font-sans antialiased selection:bg-[#c6ff00]/30 selection:text-white">
        <ThemeProvider>
          <DocsI18nProvider scope="technical">
            {children}
          </DocsI18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
