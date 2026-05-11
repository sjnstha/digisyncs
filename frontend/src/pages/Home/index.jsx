import Hero from "./sections/Hero";
import StatsBar from "./sections/StatsBar";
import ServicesPreview from "./sections/ServicesPreview";
import CoursesPreview from "./sections/CoursesPreview";
import WhyUs from "./sections/WhyUs";
import TeamPreview from "./sections/TeamPreview";
import TestimonialsSection from "./sections/TestimonialsSection";
import ContactSection from "./sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesPreview />
      <CoursesPreview />
      <WhyUs />
      <TeamPreview />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
