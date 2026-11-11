import { Audience } from "@/components/sections/Audience";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Events } from "@/components/sections/Events";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Method } from "@/components/sections/Method";
import { Numbers } from "@/components/sections/Numbers";
import { Partners } from "@/components/sections/Partners";
import { Showcase } from "@/components/sections/Showcase";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ecosystem />
        <Numbers />
        <Method />
        <Events />
        <Showcase />
        <Audience />
        <Testimonials />
        <Partners />
        <FinalCta />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
