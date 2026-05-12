import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSite } from "../../../context/SiteContext";

export default function Hero() {
  const { config } = useSite();
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background cover image */}
      {config?.hero_bg_image_url && (
        <img
          src={config.hero_bg_image_url}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      )}

      {/* Dark blue overlay on top of image */}
      <div
        className="absolute inset-0"
        style={{
          background:
            // "linear-gradient(135deg, rgba(30,45,125,0.92) 0%, rgba(45,62,176,0.85) 60%, rgba(74,91,207,0.7) 100%)",
            "linear-gradient(135deg, rgba(18, 28, 85, 0.68) 0%, rgba(32, 48, 140, 0.52) 45%, rgba(74, 91, 207, 0.32) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <span
            className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-widest border"
            style={{
              color: "var(--color-accent)",
              borderColor: "var(--color-accent)",
              background: "rgba(232,150,10,0.1)",
            }}
          >
            {t("hero.badge", "GLOBAL ACADEMIC PARTNERS")}
          </span>

          {/* Heading */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-site)" }}
          >
            {t("hero.title_line1", "Your Professional")}
            <br />
            {t("hero.title_line2", "Bridge to")}{" "}
            <span style={{ color: "var(--color-accent)" }}>
              {t("hero.title_highlight", "Japan")}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-blue-100 mb-10 leading-relaxed max-w-xl">
            {config?.tagline ||
              t(
                "hero.subtitle",
                '"We Connect You to the World." Expert consultancy for students and professionals.',
              )}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-bold text-white transition-all hover:scale-105 hover:brightness-110"
              style={{ background: "var(--color-accent)" }}
            >
              {t("hero.cta_primary", "Apply Now")} →
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-white transition-all hover:scale-105"
              style={{
                border: "1.5px solid rgba(255,255,255,0.5)",
                background: "rgba(255,255,255,0.08)",
              }}
            >
              {t("hero.cta_secondary", "View Programs")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
