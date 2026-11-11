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
      <main className="mx-auto min-h-[70svh] w-full max-w-4xl px-6 pt-36 pb-24 md:px-10">
        <h1 className="text-4xl font-medium tracking-tight md:text-6xl">{privacy.title}</h1>
        {privacy.body && (
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-white/80 md:text-xl">
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
