import Hero from '@/components/home/Hero';
import TrustStrip from '@/components/home/TrustStrip';
import ServicesGrid from '@/components/home/ServicesGrid';
import CeremonialServices from '@/components/home/CeremonialServices';
import TrainingSection from '@/components/home/TrainingSection';
import Testimonials from '@/components/home/Testimonials';
import TeamSection from '@/components/home/TeamSection';
import ContactForm from '@/components/home/ContactForm';
import LicensesSection from '@/components/home/LicensesSection';
import HomeGallery from '@/components/home/HomeGallery';

export default function Home() {
    return (
        <>
            <Hero />
            <TrustStrip />
            <ServicesGrid />
            <CeremonialServices />
            <TrainingSection />
            <Testimonials />
            <TeamSection />
            {/* <ClientsSection /> */}
            <HomeGallery />
            <LicensesSection />
            <ContactForm />
        </>
    );
}
