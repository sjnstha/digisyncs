import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import SectionTitle from "../../../components/ui/SectionTitle";

const FEATURES = [
  {
    icon: "🏆",
    key: "expert",
    titleEn: "Expert Consultants",
    descEn: "10+ years of experience helping students reach Japan.",
  },
  {
    icon: "📋",
    key: "visa",
    titleEn: "98% Visa Success",
    descEn: "Meticulous documentation with industry-leading approval rate.",
  },
  {
    icon: "🎓",
    key: "school",
    titleEn: "50+ Partner Schools",
    descEn: "Trusted network of Japanese language schools and universities.",
  },
  {
    icon: "🌍",
    key: "global",
    titleEn: "Global Network",
    descEn: "Connections across Japan, Nepal, Vietnam and beyond.",
  },
  {
    icon: "💬",
    key: "lang",
    titleEn: "Multilingual Support",
    descEn: "Consultations in English, Japanese, and Nepali.",
  },
  {
    icon: "❤️",
    key: "care",
    titleEn: "Post-Arrival Support",
    descEn: "We stay with you even after you land in Japan.",
  },
];

export default function WhyUs() {
  const { t } = useTranslation();
  const titleRef = useScrollAnimation();
  const gridRef = useScrollAnimation();

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1e2d7d 0%, #2d3eb0 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(circle, #e8960a, transparent 70%)",
          transform: "translate(30%,-30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(circle, #e8960a, transparent 70%)",
          transform: "translate(-30%,30%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="scroll-fade">
          {/* Override SectionTitle colors inline for dark bg */}
          <div className="mb-10 text-center">
            <h2
              className="text-3xl font-bold mb-3 text-white"
              style={{ fontFamily: "var(--font-site)" }}
            >
              {t("whyus.title", "Why Choose Us?")}
            </h2>
            <p className="text-base text-blue-200 max-w-2xl mx-auto">
              {t("whyus.subtitle", "We Connect You to the World")}
            </p>
            <div className="mt-3 flex justify-center gap-1">
              <span className="inline-block h-1 w-12 rounded-full bg-white" />
              <span
                className="inline-block h-1 w-4 rounded-full"
                style={{ background: "var(--color-accent)" }}
              />
            </div>
          </div>
        </div>

        <div
          ref={gridRef}
          className="scroll-fade-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FEATURES.map((f) => (
            <div
              key={f.key}
              className="group flex gap-4 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                {f.icon}
              </span>
              <div>
                <h3 className="font-bold text-white mb-1">
                  {t(`whyus.${f.key}.title`, f.titleEn)}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.72)" }}
                >
                  {t(`whyus.${f.key}.desc`, f.descEn)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
