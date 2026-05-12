import { useTranslation } from "react-i18next";
import { useContent } from "../../hooks/useContent";
import { fetchServices } from "../../api/contentApi";
import { useLang } from "../../hooks/useLang";
import SectionTitle from "../../components/ui/SectionTitle";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import PageHero from "../../components/ui/PageHero";

export default function ServicesPage() {
  const { t } = useTranslation();
  const { data: services, loading } = useContent(fetchServices);
  const tl = useLang();

  return (
    <div style={{ fontFamily: "var(--font-site)" }}>
      {/* <section className="py-14" style={{ background: "var(--color-primary)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            {t("services.page_title", "Our Services")}
          </h1>
          <p className="text-blue-100">
            {t("services.page_subtitle", "Everything you need for your Japan journey")}
          </p>
        </div>
      </section> */}
      <PageHero
        title={t("about.title", "Our Services")}
        subtitle={t(
          "about.subtitle",
          "Everything you need for your Japan journey",
        )}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services?.map((service, i) => (
                <div
                  key={service.id}
                  className="rounded-xl p-7 border hover:shadow-lg transition-all hover:-translate-y-1"
                  style={{
                    borderTopWidth: "4px",
                    borderColor:
                      i % 2 === 0
                        ? "var(--color-primary)"
                        : "var(--color-accent)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5"
                    style={{
                      background:
                        i % 2 === 0
                          ? "var(--color-primary)"
                          : "var(--color-accent)",
                    }}
                  >
                    <span className="text-white">✦</span>
                  </div>
                  {service.is_featured && (
                    <span
                      className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-3"
                      style={{ background: "#fff4d6", color: "#854f0b" }}
                    >
                      Featured
                    </span>
                  )}
                  <h2
                    className="font-bold text-xl mb-3"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {tl(service, "title")}
                  </h2>
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
        </div>
      </section>
    </div>
  );
}
