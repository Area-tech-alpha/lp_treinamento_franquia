import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { seo } from "@/content/abs";
import { siteUrl } from "@/lib/site-url";
import { RouteChangeTracker } from "@/components/tracking/RouteChangeTracker";
import { GtmNoScript, TrackingScripts } from "@/components/tracking/TrackingScripts";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seo.title,
  description: seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    locale: "pt_BR",
    siteName: "Alpha Business School",
    title: seo.title,
    description: seo.description,
    // imagem: app/opengraph-image.jpg (foto do time + símbolo ABS em glow)
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${inter.variable} antialiased`}>
      <body className="min-h-full font-sans">
        <GtmNoScript />
        {children}
        <TrackingScripts />
        <RouteChangeTracker />
      </body>
    </html>
  );
}
