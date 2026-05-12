import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ja from "./locales/ja.json";
import ne from "./locales/ne.json";

// Read saved language — ONLY if user explicitly chose one via the switcher
const savedLang = localStorage.getItem("i18nextLng");
const validLangs = ["en", "ja", "ne"];
const initialLang = validLangs.includes(savedLang) ? savedLang : "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ja: { translation: ja },
    ne: { translation: ne },
  },
  lng: initialLang, // always start with saved or "en"
  fallbackLng: "en",
  supportedLngs: ["en", "ja", "ne"],
  interpolation: {
    escapeValue: false,
  },
});

// Persist language whenever it changes
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("i18nextLng", lng);
  // Update <html lang=""> attribute for accessibility + SEO
  document.documentElement.lang = lng;
});

export default i18n;
