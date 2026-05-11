import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSite } from "../../../context/SiteContext";
import { useContent } from "../../../hooks/useContent";
import { fetchServices } from "../../../api/contentApi";
import { useLang } from "../../../hooks/useLang";
import SectionTitle from "../../../components/ui/SectionTitle";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

export default function ServicesPreview() {
  const { t } = useTranslation();
  const { data: services, loading } = useContent(fetchServices);
  const tl = useLang();

  const featured = services?.filter((s) => s.is_featured).slice(0, 6) || [];

  return (
    <section className="py-16 md:py-20" style={{ background: "#f8f9ff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t("services.section_title", "Our Services")}
          subtitle={t(
            "services.section_subtitle",
            "Comprehensive support for your journey to Japan",
          )}
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100
                          hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "var(--color-primary)" }}
                >
                  <span className="text-white text-xl">✦</span>
                </div>
                <h3
                  className="font-bold text-lg mb-2"
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
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/services"
            className="inline-block px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            style={{ background: "var(--color-primary)", color: "#fff" }}
          >
            {t("services.view_all", "View All Services")}
          </Link>
        </div>
      </div>
    </section>
  );
}
