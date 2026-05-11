import { useTranslation } from "react-i18next";
import SectionTitle from "../../../components/ui/SectionTitle";

const FEATURES = [
  {
    icon: "🏆",
    key: "expert",
    titleEn: "Expert Consultants",
    descEn:
      "Our team has 10+ years of experience in Japan education consulting.",
  },
  {
    icon: "📋",
    key: "visa",
    titleEn: "98% Visa Success",
    descEn:
      "Industry-leading visa approval rate through meticulous documentation.",
  },
  {
    icon: "🎓",
    key: "school",
    titleEn: "50+ Partner Schools",
    descEn:
      "Wide network of trusted Japanese language schools and universities.",
  },
  {
    icon: "🌍",
    key: "global",
    titleEn: "Global Network",
    descEn: "Connections across Japan, Nepal, Vietnam, and beyond.",
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

  return (
    <section
      className="py-16 md:py-20"
      style={{ background: "var(--color-primary)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t("whyus.title", "Why Choose Us?")}
          subtitle={t("whyus.subtitle", "We Connect You to the World")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {FEATURES.map((f) => (
            <div
              key={f.key}
              className="rounded-xl p-6 flex gap-4"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <span className="text-3xl flex-shrink-0">{f.icon}</span>
              <div>
                <h3 className="font-bold text-white mb-1">
                  {t(`whyus.${f.key}.title`, f.titleEn)}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.75)" }}
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
