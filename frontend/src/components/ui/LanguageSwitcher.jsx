import { useState } from "react";
import { useTranslation } from "react-i18next";

import { fetchTranslations } from "../../api/siteApi";
const LANGS = [
  { code: "en", label: "EN" },
  { code: "ja", label: "JP" },
  { code: "ne", label: "NE" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const current = i18n.language?.slice(0, 2) || "en";
  const countryCode = localStorage.getItem("country") || "JP";
  // -----------------------------------------
  // Switch Language
  // -----------------------------------------
  const switchLanguage = async (lang) => {
    try {
      if (loading || current === lang) return;
      setLoading(true);
      // Fetch DB translations
      const translationData = await fetchTranslations(lang, countryCode);
      const translations = translationData.translations || {};
      // Remove old bundle
      if (i18n.hasResourceBundle(lang, "translation")) {
        i18n.removeResourceBundle(lang, "translation");
      }
      // Add translations
      i18n.addResourceBundle(lang, "translation", translations, true, true);
      // Change language AFTER loading
      await i18n.changeLanguage(lang);
      // Persist
      localStorage.setItem("i18nextLng", lang);
      document.documentElement.lang = lang;
    } catch (error) {
      console.error("Language switch failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-1">
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => switchLanguage(code)}
          disabled={loading}
          className="px-2 py-1 rounded text-xs font-semibold transition-all duration-200 disabled:opacity-50"
          style={{
            background:
              current === code
                ? "var(--color-accent)"
                : "rgba(255,255,255,0.15)",

            color: current === code ? "#fff" : "var(--color-navbar-text)",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
