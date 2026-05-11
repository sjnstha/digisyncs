import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSite } from "../../../context/SiteContext";

export default function Hero() {
  const { config } = useSite();
  const { t } = useTranslation();

  return (
    <section
      className="relative overflow-hidden py-20 md:py-32"
      style={{ background: "linear-gradient(135deg, #1e2d7d 0%, #2d3eb0 60%, #4a5bcf 100%)" }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10"
        style={{ background: "var(--color-accent)" }} />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full opacity-10"
        style={{ background: "var(--color-accent)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Tag line badge */}
        <span
          className="inline-block text-xs font-semibold px-4 py-1 rounded-full mb-6 tracking-wide"
          style={{ background: "var(--color-accent)", color: "#fff" }}
        >
          {t("home.hero.badge", "We Connect You to the World.")}
        </span>

        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: "var(--font-site)" }}
        >
          {config?.site_name || t("home.hero.title")}
        </h1>

        {config?.tagline && (
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            {config.tagline}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition-transform hover:scale-105"
            style={{ background: "var(--color-accent)" }}
          >
            {t("home.hero.cta_primary", "Get Free Consultation")}
          </Link>
          <Link
            to="/services"
            className="inline-block px-8 py-3 rounded-lg font-semibold transition-transform hover:scale-105"
            style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}
          >
            {t("home.hero.cta_secondary", "Our Services")}
          </Link>
        </div>
      </div>
    </section>
  );
}
