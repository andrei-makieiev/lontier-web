import { Chrome } from "@/components/Chrome";
import { CookieConsent } from "@/components/CookieConsent";
import { Enquiry } from "@/components/Enquiry";
import { EnquiryProvider } from "@/components/EnquiryContext";
import { Motion } from "@/components/Motion";
import { Services } from "@/components/Services";
import { BeyondBorders, Footer, Hero, House, HowItWorks, Philosophy, Founder, Quote, WhyUs } from "@/components/Sections";

export default function Home() {
  return (
    <EnquiryProvider>
      <main>
        <Hero />
        <Founder />
        <Philosophy />
        <Services />
        <HowItWorks />
        <BeyondBorders />
        <WhyUs />
        <House />
        <Quote />
        <Enquiry />
      </main>
      <Footer />
      <Chrome />
      <CookieConsent />
      <Motion />
    </EnquiryProvider>
  );
}
