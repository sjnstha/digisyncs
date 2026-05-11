import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSite } from "../../context/SiteContext";
import LanguageSwitcher from "../ui/LanguageSwitcher";

export default function Navbar() {
  const { config, nav, loading } = useSite();
  const { i18n } = useTranslation();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const lang = i18n.language?.slice(0, 2) || "en";

  const getLabel = (item) =>
    item[`label_${lang}`] || item.label_en;

  const isActive = (url) =>
    url === "/" ? location.pathname === "/" : location.pathname.startsWith(url);

  return (
    <nav
      style={{
        backgroundColor: "var(--color-navbar-bg)",
        color: "var(--color-navbar-text)",
        fontFamily: "var(--font-site)",
      }}
      className="sticky top-0 z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo + Site name */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            {config?.logo_url ? (
              <img
                src={config.logo_url}
                alt={config.site_name}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <span
                className="font-bold text-xl tracking-tight"
                style={{ color: "var(--color-navbar-text)" }}
              >
                {config?.site_name || "DigiSync"}
              </span>
            )}
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {!loading && nav.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                target={item.open_in_new_tab ? "_blank" : undefined}
                className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
                style={{
                  color: isActive(item.url)
                    ? "var(--color-accent)"
                    : "var(--color-navbar-text)",
                  borderBottom: isActive(item.url)
                    ? "2px solid var(--color-accent)"
                    : "2px solid transparent",
                }}
              >
                {getLabel(item)}
              </Link>
            ))}
          </div>

          {/* Right side: Language switcher + hamburger */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden p-2 rounded-md"
              style={{ color: "var(--color-navbar-text)" }}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-3 pt-1 border-t border-white/20">
            {nav.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-sm font-medium"
                style={{ color: "var(--color-navbar-text)" }}
              >
                {getLabel(item)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
