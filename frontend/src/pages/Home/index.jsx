import { useTranslation } from "react-i18next";
import Hero from "./sections/Hero";
import StatsBar from "./sections/StatsBar";
import ServicesPreview from "./sections/ServicesPreview";
import CoursesPreview from "./sections/CoursesPreview";
import WhyUs from "./sections/WhyUs";
import TeamPreview from "./sections/TeamPreview";
import TestimonialsSection from "./sections/TestimonialsSection";
import ContactSection from "./sections/ContactSection";
import SEO from "../../components/seo/SEO";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title={t("nav.home", "Home")}
        description="Trusted Japan study abroad consultancy in Nepal. Free consultation, visa assistance, JLPT prep & scholarship guidance."
      />
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
