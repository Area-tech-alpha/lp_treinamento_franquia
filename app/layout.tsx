import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { seo } from "@/content/abs";
import { siteUrl } from "@/lib/site-url";
import { META_EVENT_ORIGIN } from "@/lib/meta-event-origin";
import { META_PIXEL_ID } from "@/lib/meta-pixels";
import { AttributionCapture } from "@/components/AttributionCapture";
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
        {children}
        <AttributionCapture />
        <Script
          id="meta-pixel"
          // afterInteractive (não lazyOnload): lazyOnload só carrega em idle time e
          // pode atrasar o fbq além do tempo de preencher e enviar o formulário.
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView', {origem: '${META_EVENT_ORIGIN}', canal: 'navegador', pagina: location.pathname});
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            alt=""
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      </body>
    </html>
  );
}
