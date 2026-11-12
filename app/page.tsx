import { About } from "@/components/sections/About";
import { Audience } from "@/components/sections/Audience";
import { Closing } from "@/components/sections/Closing";
import { Deliverables } from "@/components/sections/Deliverables";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Guests } from "@/components/sections/Guests";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LeadSection, LogosSection } from "@/components/sections/LeadSection";
import { Numbers } from "@/components/sections/Numbers";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyNow } from "@/components/sections/WhyNow";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <LeadSection />
        <Hero />
        <About />
        <Numbers />
        <HowItWorks />
        <Guests />
        <Audience />
        <WhyNow />
        <Deliverables />
        <Testimonials />
        <LogosSection />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
