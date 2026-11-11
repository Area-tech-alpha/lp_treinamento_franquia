import type { Metadata } from "next";
import { thanks } from "@/content/abs";
import { AbsSymbol } from "@/components/ui/Brand";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/primitives";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { LeadEvent } from "@/components/tracking/LeadEvent";

export const metadata: Metadata = {
  title: "Recebemos! | Alpha Business School",
  robots: { index: false, follow: false },
  alternates: { canonical: "/obrigado" },
};

export default function ObrigadoPage() {
  return (
    <>
      <Header />
      <main className="glow-sides flex min-h-[100svh] items-center px-6 pt-28 pb-20 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center">
            <AbsSymbol className="size-28 md:size-36" />
          </div>
          <h1 className="mt-12 text-4xl leading-tight font-medium tracking-tight text-balance md:text-6xl">
            {thanks.title}
          </h1>
          <Button href={thanks.cta.href} className="mt-10">
            <Icon name="whatsapp" className="size-6" />
            {thanks.cta.label}
          </Button>
        </div>
      </main>
      <Footer />
      <LeadEvent />
    </>
  );
}
