import { useTranslation } from "react-i18next";
import { useContent } from "../../hooks/useContent";
import { fetchServices } from "../../api/contentApi";
import { useLang } from "../../hooks/useLang";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import PageHero from "../../components/ui/PageHero";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const SERVICE_ICONS = ["✈️", "📄", "📚", "🏆", "🏠", "💼"];

export default function ServicesPage() {
  const { t } = useTranslation();
  const { data: services, loading } = useContent(fetchServices);
  const tl = useLang();
  const gridRef = useScrollAnimation();

  return (
    <div style={{ fontFamily: "var(--font-site)" }}>
      <PageHero
        badge="WHAT WE OFFER"
        title={t("services.page_title", "Our Services")}
        subtitle={t(
          "services.page_subtitle",
          "Everything you need for a successful journey to Japan — under one roof",
        )}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div
              ref={gridRef}
              className="scroll-fade-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {services?.map((service, i) => (
                <div
                  key={service.id}
                  className="group rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
                  style={{
                    borderTopWidth: "4px",
                    borderColor:
                      i % 2 === 0
                        ? "var(--color-primary)"
                        : "var(--color-accent)",
                    background: "#fff",
                  }}
                >
                  {/* Hover bg fill */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background:
                        i % 2 === 0
                          ? "rgba(45,62,176,0.02)"
                          : "rgba(232,150,10,0.02)",
                    }}
                  />

                  <div className="relative z-10">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background:
                          i % 2 === 0
                            ? "var(--color-primary)"
                            : "var(--color-accent)",
                      }}
                    >
                      {SERVICE_ICONS[i % SERVICE_ICONS.length]}
                    </div>

                    {service.is_featured && (
                      <span
                        className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mb-3"
                        style={{ background: "#fff4d6", color: "#92400e" }}
                      >
                        ⭐ Featured
                      </span>
                    )}

                    <h2
                      className="font-extrabold text-xl mb-3 transition-colors duration-200"
                      style={{
                        color: "var(--color-primary)",
                        letterSpacing: "-0.3px",
                      }}
                    >
                      {tl(service, "title")}
                    </h2>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--color-secondary)" }}
                    >
                      {tl(service, "description")}
                    </p>

                    {/* Animated bottom line */}
                    <div
                      className="mt-6 h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-500"
                      style={{
                        background:
                          i % 2 === 0
                            ? "var(--color-primary)"
                            : "var(--color-accent)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
