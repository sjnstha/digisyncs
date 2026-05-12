import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSite } from "../../../context/SiteContext";

/* Floating decorative blob */
function Blob({ style }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        filter: "blur(80px)",
        opacity: 0.18,
        background: "radial-gradient(circle, #e8960a, transparent 70%)",
        ...style,
      }}
    />
  );
}

export default function Hero() {
  const { config } = useSite();
  const { t } = useTranslation();
  const imgRef = useRef(null);

  /* Subtle Ken Burns zoom on the background image */
  useEffect(() => {
    if (!imgRef.current) return;
    imgRef.current.style.transform = "scale(1)";
    const timer = setTimeout(() => {
      if (imgRef.current) {
        imgRef.current.style.transition = "transform 8s ease-out";
        imgRef.current.style.transform = "scale(1.06)";
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [config?.hero_bg_image_url]);

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "88vh", display: "flex", alignItems: "center" }}
    >
      {/* ── Background image with Ken Burns ── */}
      {config?.hero_bg_image_url ? (
        <img
          ref={imgRef}
          src={config.hero_bg_image_url}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ transform: "scale(1)", willChange: "transform" }}
        />
      ) : (
        /* Fallback gradient when no image uploaded */
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg,#0f1940 0%,#1e2d7d 50%,#2d3eb0 100%)",
          }}
        />
      )}

      {/* ── Overlay — lighter so image breathes ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(14,22,90,0.82) 0%, rgba(20,30,120,0.55) 55%, rgba(30,45,130,0.25) 100%)",
        }}
      />

      {/* ── Floating accent blobs for depth ── */}
      <Blob style={{ width: 420, height: 420, top: "-80px", right: "8%" }} />
      <Blob style={{ width: 280, height: 280, bottom: "5%", left: "2%" }} />

      {/* ── Bottom fade to white ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.06))",
        }}
      />

      {/* ── Main content — LEFT aligned ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
        <div
          className="hero-content max-w-[560px]"
          style={{
            animation: "heroFadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both",
          }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-8 border"
            style={{
              color: "var(--color-accent)",
              borderColor: "rgba(232,150,10,0.5)",
              background: "rgba(232,150,10,0.1)",
              backdropFilter: "blur(6px)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--color-accent)" }}
            />
            {t("hero.badge", "GLOBAL ACADEMIC PARTNERS")}
          </div>

          {/* Headline */}
          <h1
            className="text-white font-extrabold mb-6 leading-none"
            style={{
              fontSize: "clamp(42px, 5.5vw, 76px)",
              letterSpacing: "-1.5px",
              lineHeight: 1.05,
              fontFamily: "var(--font-site)",
            }}
          >
            {t("hero.title_line1", "Your Professional")}
            <br />
            {t("hero.title_line2", "Bridge to")}{" "}
            <span
              style={{
                color: "var(--color-accent)",
                textShadow: "0 0 40px rgba(232,150,10,0.4)",
              }}
            >
              {t("hero.title_highlight", "Japan")}
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            className="text-blue-100 mb-10 leading-relaxed"
            style={{
              fontSize: "clamp(15px, 1.6vw, 18px)",
              maxWidth: "480px",
              opacity: 0.9,
            }}
          >
            {config?.tagline ||
              t(
                "hero.subtitle",
                '"We Connect You to the World." Expert consultancy for students and professionals looking to build a career in the land of the rising sun.',
              )}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 font-bold text-white transition-all duration-200 hover:scale-105 hover:brightness-110"
              style={{
                padding: "16px 34px",
                borderRadius: "14px",
                fontSize: "15px",
                background: "var(--color-accent)",
                boxShadow: "0 8px 28px rgba(232,150,10,0.5)",
              }}
            >
              {t("hero.cta_primary", "Apply Now")}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{
                padding: "16px 34px",
                borderRadius: "14px",
                fontSize: "15px",
                border: "1.5px solid rgba(255,255,255,0.35)",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
              }}
            >
              {t("hero.cta_secondary", "View Programs")}
            </Link>
          </div>

          {/* Social proof strip */}
          <div className="mt-10 flex items-center gap-3">
            {/* Avatar stack */}
            <div className="flex -space-x-2">
              {["S", "R", "A", "M"].map((l, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                  style={{
                    background: i % 2 === 0 ? "#2d3eb0" : "#e8960a",
                    zIndex: 4 - i,
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
            <div className="text-xs text-blue-100">
              <span className="font-bold text-white">500+</span> students placed
              in Japan this year
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
