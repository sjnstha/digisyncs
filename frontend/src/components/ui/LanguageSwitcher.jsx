import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "ja", label: "JP" },
  { code: "ne", label: "NE" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language?.slice(0, 2) || "en";

  return (
    <div className="flex gap-1">
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => i18n.changeLanguage(code)}
          className="px-2 py-1 rounded text-xs font-semibold transition-all"
          style={{
            background: current === code ? "var(--color-accent)" : "rgba(255,255,255,0.15)",
            color: current === code ? "#fff" : "var(--color-navbar-text)",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
