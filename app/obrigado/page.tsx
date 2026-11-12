import type { Metadata } from "next";
import { thanks } from "@/content/abs";
import { AbsSymbol } from "@/components/ui/Brand";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/primitives";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { MetaLeadEvent } from "@/components/analytics/MetaLeadEvent";

export const metadata: Metadata = {
  title: "Recebemos! | Alpha Business School",
  robots: { index: false, follow: false },
  alternates: { canonical: "/obrigado" },
};

export default function ObrigadoPage() {
  return (
    <>
      <Header />
      <main className="glow-sides flex min-h-[100svh] items-center px-5 pt-24 pb-16 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center">
            <AbsSymbol className="size-24 md:size-28" />
          </div>
          <h1 className="mt-10 text-3xl leading-tight font-medium tracking-tight text-balance md:text-5xl">
            {thanks.title}
          </h1>
          {/* Só aparece se NEXT_PUBLIC_WHATSAPP_URL existir */}
          {thanks.cta && (
            <Button href={thanks.cta.href} className="mt-10">
              <Icon name="whatsapp" className="size-5" />
              {thanks.cta.label}
            </Button>
          )}
        </div>
      </main>
      <Footer />
      {/* Lead do pixel: só aqui, uma vez, com o mesmo eventID da CAPI */}
      <MetaLeadEvent />
    </>
  );
}
