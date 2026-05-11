import { useTranslation } from "react-i18next";
import HealthCheck from "./components/HealthCheck";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "ne", label: "नेपाली" },
];

export default function App() {
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Temp dev header — replaced by dynamic Navbar in Phase 3 */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-gray-800">DigiSync</span>

        {/* Language switcher */}
        <div className="flex gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                i18n.language === lang.code
                  ? "bg-sky-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Phase 1 — Environment check
        </h1>
        <p className="text-gray-500 mb-6 text-sm">
          {t("nav.home")} · {t("nav.about")} · {t("nav.contact")}
        </p>

        <HealthCheck />
      </main>
    </div>
  );
}
