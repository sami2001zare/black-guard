import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import ServicesGrid from "@/components/home/ServicesGrid";
import Philosophy from "@/components/home/Philosophy";
import EmergencyCTA from "@/components/home/EmergencyCTA";
import MobileActionBar from "@/components/home/MobileActionBar";

export default function Page() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <Philosophy />
      <EmergencyCTA />
      <MobileActionBar />
    </>
  );
}