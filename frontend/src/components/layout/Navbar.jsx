import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSite } from "../../context/SiteContext";
import { useLang } from "../../hooks/useLang";
import LanguageSwitcher from "../ui/LanguageSwitcher";

export default function Navbar() {
  const { config, nav, loading } = useSite();
  const tl = useLang();
  const { t, i18n } = useTranslation();
  const location = useLocation(); // ✅ hook-based, reactive
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lang =
    i18n.language?.slice(0, 2) || localStorage.getItem("i18nextLng") || "en";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu whenever route changes
  useEffect(() => setMenuOpen(false), [location.pathname]);

  const getLabel = (item) => item[`label_${lang}`] || item.label_en;

  // ✅ uses location.pathname from hook (was window.location.pathname — broken)
  const isActive = (url) =>
    url === "/" ? location.pathname === "/" : location.pathname.startsWith(url);

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        // ✅ Dark navy — logo is blue so white/glass bg was hiding it
        // background: scrolled
        //   ? "rgba(10, 18, 55, 0.98)"
        //   : "rgba(14, 22, 68, 0.90)",
        background: scrolled
          ? `
            linear-gradient(
              to right,
              rgba(255,255,255,0.96),
              rgba(255,255,255,0.92)
            )
          `
          : `
            linear-gradient(
              to right,
              rgba(255,255,255,0.88),
              rgba(255,255,255,0.84)
            )
          `,
        borderColor: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        // boxShadow: scrolled
        //   ? "0 8px 32px rgba(0,0,0,0.28)"
        //   : "0 2px 16px rgba(0,0,0,0.14)",
        boxShadow: scrolled
          ? "0 8px 30px rgba(0,0,0,0.08)"
          : "0 4px 20px rgba(0,0,0,0.04)",
        // borderBottom: "1px solid rgba(255,255,255,0.07)",
        color: "var(--color-navbar-text)",
        fontFamily: "var(--font-site)",
      }}
    >
      {/* Orange accent line */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-accent), transparent)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
        <div
          className="flex items-center justify-between transition-all duration-300"
          style={{ height: scrolled ? "68px" : "76px" }}
        >
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            {config?.logo_url ? (
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "var(--color-accent)" }}
                />
                <img
                  src={config.logo_url}
                  alt={tl(config, "site_name") || "Logo"}
                  className="relative object-contain transition-all duration-300 group-hover:scale-105"
                  style={{ height: scrolled ? "46px" : "54px" }}
                />
              </div>
            ) : (
              <span className="text-2xl font-extrabold tracking-tight text-white">
                {tl(config, "site_name") || "3 Star"}
              </span>
            )}

            {/* Site name beside logo — desktop only */}
            {config?.site_name && (
              <div className="hidden lg:block">
                <p className="text-lg font-bold leading-tight">
                  {tl(config, "site_name")}
                </p>
                {config?.tagline && (
                  <p className="text-xs text-slate-500 leading-tight">
                    {tl(config, "tagline")}
                  </p>
                )}
              </div>
            )}
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden md:flex items-center gap-0.5">
            {!loading &&
              nav.map((item) => {
                const active = isActive(item.url);
                return (
                  <Link
                    key={item.id}
                    to={item.url}
                    target={item.open_in_new_tab ? "_blank" : undefined}
                    className="relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group"
                    style={{
                      color: active
                        ? "var(--color-accent)"
                        : "var(--color-navbar-text)",
                      background: active
                        ? "rgba(255,255,255,0.07)"
                        : "transparent",
                    }}
                  >
                    {/* Hover fill */}
                    <span
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    />

                    <span className="relative">{getLabel(item)}</span>

                    {/* Active underline */}
                    <span
                      className="absolute left-3 right-3 bottom-1 h-[2px] rounded-full"
                      style={{
                        background: active
                          ? "var(--color-accent)"
                          : "transparent",
                        transition: "transform 0.3s",
                        transform: active ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "left",
                      }}
                    />
                  </Link>
                );
              })}
          </div>

          {/* ── Right side ── */}
          <div className="flex items-center gap-3">
            {/* Language switcher pill */}
            <div
              className="hidden sm:flex items-center rounded-xl px-2 py-1.5"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <LanguageSwitcher />
            </div>

            {/* Consult CTA — desktop */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-105 hover:brightness-110"
              style={{
                background: "var(--color-accent)",
                boxShadow: "0 4px 18px rgba(232,150,10,0.42)",
              }}
            >
              {t("nav.free.consultation")}
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className="md:hidden p-2.5 rounded-xl transition-colors"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {menuOpen && (
          <div
            className="md:hidden pb-5 pt-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex flex-col gap-1">
              {nav.map((item) => {
                const active = isActive(item.url);
                return (
                  <Link
                    key={item.id}
                    to={item.url}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
                    style={{
                      color: active
                        ? "var(--color-accent)"
                        : "rgba(255,255,255,0.87)",
                      background: active
                        ? "rgba(255,255,255,0.07)"
                        : "transparent",
                    }}
                  >
                    {active && (
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "var(--color-accent)" }}
                      />
                    )}
                    {getLabel(item)}
                  </Link>
                );
              })}

              {/* Language switcher on mobile */}
              <div className="sm:hidden mt-2 px-2">
                <div
                  className="rounded-xl p-2"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  <LanguageSwitcher />
                </div>
              </div>

              {/* CTA on mobile */}
              <div className="px-2 mt-3">
                <Link
                  to="/contact"
                  className="block text-center py-3 rounded-xl font-bold text-sm text-white"
                  style={{ background: "var(--color-accent)" }}
                >
                  Free Consultation
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
