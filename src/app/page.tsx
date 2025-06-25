import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { WhyChooseUsSection } from '@/components/sections/why-choose-us-section';
import { OurProcessSection } from '@/components/sections/our-process-section';
import { AiSolutionsSection } from '@/components/sections/ai-solutions-section';
import { TrainingSection } from '@/components/sections/training-section';
import { ServicesSection } from '@/components/sections/services-section';
import { ItSolutionsSection } from '@/components/sections/it-solutions-section';
import { ContactSection } from '@/components/sections/contact-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <AboutSection />
      <WhyChooseUsSection />
      <OurProcessSection />
      <AiSolutionsSection />
      <TrainingSection />
      {/* <ServicesSection /> */}
      <ItSolutionsSection />
      <ContactSection />
    </div>
  );
}