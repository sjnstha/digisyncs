import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContent } from "../../../hooks/useContent";
import { fetchServices } from "../../../api/contentApi";
import { useLang } from "../../../hooks/useLang";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import SectionTitle from "../../../components/ui/SectionTitle";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

const SERVICE_ICONS = ["✈️", "📄", "📚", "🏆", "🏠", "💼"];

export default function ServicesPreview() {
  const { t } = useTranslation();
  const { data: services, loading } = useContent(fetchServices);
  const tl = useLang();
  const titleRef = useScrollAnimation();
  const gridRef = useScrollAnimation();
  const featured = services?.filter((s) => s.is_featured).slice(0, 6) || [];

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "#f8f9ff" }}
    >
      {/* Decorative background circle */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "var(--color-primary)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="scroll-fade">
          <SectionTitle
            title={t("services.section_title", "Our Services")}
            subtitle={t(
              "services.section_subtitle",
              "Comprehensive support for every step of your Japan journey",
            )}
          />
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div
            ref={gridRef}
            className="scroll-fade-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2"
          >
            {featured.map((service, i) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl p-7 shadow-sm border border-gray-100
                           hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-default"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5
                                transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background:
                      i % 2 === 0
                        ? "var(--color-primary)"
                        : "var(--color-accent)",
                  }}
                >
                  {SERVICE_ICONS[i] || "✦"}
                </div>

                {service.is_featured && (
                  <span
                    className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mb-3"
                    style={{ background: "#fff4d6", color: "#92400e" }}
                  >
                    Featured
                  </span>
                )}

                <h3
                  className="font-bold text-lg mb-2 transition-colors duration-200 group-hover:text-[var(--color-accent)]"
                  style={{
                    color: "var(--color-primary)",
                    fontFamily: "var(--font-site)",
                  }}
                >
                  {tl(service, "title")}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-secondary)" }}
                >
                  {tl(service, "description")}
                </p>

                {/* Bottom accent line on hover */}
                <div
                  className="mt-5 h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-500"
                  style={{ background: "var(--color-accent)" }}
                />
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105"
            style={{
              background: "var(--color-primary)",
              boxShadow: "0 6px 20px rgba(45,62,176,0.3)",
            }}
          >
            {t("services.view_all", "View All Services")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
