import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import "./globals.css";

/* Self-hosted fonts (no request to Google at build or run time). */
const marcellus = localFont({
  src: "./fonts/marcellus-latin-400-normal.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-marcellus",
  display: "swap",
});
const jost = localFont({
  src: [
    { path: "./fonts/jost-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "./fonts/jost-latin-400-normal.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-jost",
  display: "swap",
});
const cormorant = localFont({
  src: "./fonts/cormorant-garamond-latin-400-italic.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.descriptor}`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: "/images/position.jpg", width: 1024, height: 1280, alt: site.name }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#151b24", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${marcellus.variable} ${jost.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <head>
        {/* Reveal animations only hide content when JavaScript is running. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
