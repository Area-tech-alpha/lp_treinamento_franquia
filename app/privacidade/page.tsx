import type { Metadata } from "next";
import { privacy } from "@/content/abs";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";

export const metadata: Metadata = {
  title: "Política de privacidade | Alpha Business School",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <>
      <Header />
      <main className="mx-auto min-h-[70svh] w-full max-w-4xl px-5 pt-32 pb-20 md:px-8">
        <h1 className="text-3xl font-medium tracking-tight md:text-5xl">{privacy.title}</h1>
        {privacy.body && (
          <div className="mt-8 space-y-5 text-base leading-relaxed text-white/80 md:text-lg">
            {privacy.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
