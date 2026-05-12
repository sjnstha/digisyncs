import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchSiteData, fetchStats } from "../api/siteApi";

const SiteContext = createContext(null);

const DEFAULT_COUNTRY = "JP";

export function SiteProvider({ children }) {
  const { i18n } = useTranslation();
  const [countryCode, setCountryCode] = useState(
    () => localStorage.getItem("country") || DEFAULT_COUNTRY,
  );
  const [siteData, setSiteData] = useState(null); // { country, config, nav }
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchSiteData(countryCode), fetchStats(countryCode)])
      .then(([site, statsData]) => {
        setSiteData(site);
        setStats(statsData);
        applyTheme(site.config);
        // Sync language with country default if no user preference saved
        if (!localStorage.getItem("i18nextLng")) {
          i18n.changeLanguage(site.country.default_language);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [countryCode]);

  const switchCountry = (code) => {
    localStorage.setItem("country", code);
    setCountryCode(code);
  };

  return (
    <SiteContext.Provider
      value={{
        countryCode,
        switchCountry,
        siteData,
        stats,
        loading,
        error,
        config: siteData?.config || null,
        nav: siteData?.nav || [],
        country: siteData?.country || null,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}

// Inject CSS variables from DB config so Tailwind custom colors work
function applyTheme(config) {
  if (!config) return;
  const root = document.documentElement;
  root.style.setProperty("--color-primary", config.color_primary || "#2d3eb0");
  root.style.setProperty(
    "--color-secondary",
    config.color_secondary || "#64748b",
  );
  root.style.setProperty("--color-accent", config.color_accent || "#e8960a");
  root.style.setProperty("--color-bg", config.color_bg || "#ffffff");
  root.style.setProperty("--color-text", config.color_text || "#0f1940");
  root.style.setProperty(
    "--color-navbar-bg",
    config.color_navbar_bg || "#1e2d7d",
  );
  root.style.setProperty(
    "--color-navbar-text",
    config.color_navbar_text || "#ffffff",
  );
  root.style.setProperty("--font-site", `'${config.font_primary}', sans-serif`);

  // Inject Google Font dynamically
  if (config.font_primary) {
    const fontUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(config.font_primary)}&display=swap`;
    if (!document.querySelector(`link[href="${fontUrl}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = fontUrl;
      document.head.appendChild(link);
    }
  }

  // Update page title
  if (config.site_name) document.title = config.site_name;
}
